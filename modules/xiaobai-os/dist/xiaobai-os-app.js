/* eslint-disable */
// @__NO_SIDE_EFFECTS__
function In(e) {
  const t = /* @__PURE__ */ Object.create(null);
  for (const a of e.split(",")) t[a] = 1;
  return (a) => a in t;
}
var Se = {}, fa = [], St = () => {
}, Zi = () => !1, Pn = (e) => e.charCodeAt(0) === 111 && e.charCodeAt(1) === 110 && (e.charCodeAt(2) > 122 || e.charCodeAt(2) < 97), On = (e) => e.startsWith("onUpdate:"), Ee = Object.assign, _s = (e, t) => {
  const a = e.indexOf(t);
  a > -1 && e.splice(a, 1);
}, Or = Object.prototype.hasOwnProperty, ye = (e, t) => Or.call(e, t), ne = Array.isArray, va = (e) => tn(e) === "[object Map]", xa = (e) => tn(e) === "[object Set]", Qs = (e) => tn(e) === "[object Date]", le = (e) => typeof e == "function", Me = (e) => typeof e == "string", pt = (e) => typeof e == "symbol", ke = (e) => e !== null && typeof e == "object", el = (e) => (ke(e) || le(e)) && le(e.then) && le(e.catch), tl = Object.prototype.toString, tn = (e) => tl.call(e), Lr = (e) => tn(e).slice(8, -1), al = (e) => tn(e) === "[object Object]", $s = (e) => Me(e) && e !== "NaN" && e[0] !== "-" && "" + parseInt(e, 10) === e, Na = /* @__PURE__ */ In(",key,ref,ref_for,ref_key,onVnodeBeforeMount,onVnodeMounted,onVnodeBeforeUpdate,onVnodeUpdated,onVnodeBeforeUnmount,onVnodeUnmounted"), Ln = (e) => {
  const t = /* @__PURE__ */ Object.create(null);
  return ((a) => t[a] || (t[a] = e(a)));
}, Rr = /-\w/g, Ye = Ln((e) => e.replace(Rr, (t) => t.slice(1).toUpperCase())), Dr = /\B([A-Z])/g, Wt = Ln((e) => e.replace(Dr, "-$1").toLowerCase()), Rn = Ln((e) => e.charAt(0).toUpperCase() + e.slice(1)), zn = Ln((e) => e ? `on${Rn(e)}` : ""), xt = (e, t) => !Object.is(e, t), mn = (e, ...t) => {
  for (let a = 0; a < e.length; a++) e[a](...t);
}, nl = (e, t, a, n = !1) => {
  Object.defineProperty(e, t, {
    configurable: !0,
    enumerable: !1,
    writable: n,
    value: a
  });
}, Dn = (e) => {
  const t = parseFloat(e);
  return isNaN(t) ? e : t;
}, Br = (e) => {
  const t = Me(e) ? Number(e) : NaN;
  return isNaN(t) ? e : t;
}, Zs, Bn = () => Zs || (Zs = typeof globalThis < "u" ? globalThis : typeof self < "u" ? self : typeof window < "u" ? window : typeof globalThis < "u" ? globalThis : {});
function _t(e) {
  if (ne(e)) {
    const t = {};
    for (let a = 0; a < e.length; a++) {
      const n = e[a], s = Me(n) ? Fr(n) : _t(n);
      if (s) for (const l in s) t[l] = s[l];
    }
    return t;
  } else if (Me(e) || ke(e)) return e;
}
var Nr = /;(?![^(]*\))/g, qr = /:([^]+)/, Ur = /\/\*[^]*?\*\//g;
function Fr(e) {
  const t = {};
  return e.replace(Ur, "").split(Nr).forEach((a) => {
    if (a) {
      const n = a.split(qr);
      n.length > 1 && (t[n[0].trim()] = n[1].trim());
    }
  }), t;
}
function ae(e) {
  let t = "";
  if (Me(e)) t = e;
  else if (ne(e)) for (let a = 0; a < e.length; a++) {
    const n = ae(e[a]);
    n && (t += n + " ");
  }
  else if (ke(e))
    for (const a in e) e[a] && (t += a + " ");
  return t.trim();
}
var sl = "itemscope,allowfullscreen,formnovalidate,ismap,nomodule,novalidate,readonly", jr = /* @__PURE__ */ In(sl), P0 = /* @__PURE__ */ In(sl + ",async,autofocus,autoplay,controls,default,defer,disabled,hidden,inert,loop,open,required,reversed,scoped,seamless,checked,muted,multiple,selected");
function il(e) {
  return !!e || e === "";
}
function Hr(e, t) {
  if (e.length !== t.length) return !1;
  let a = !0;
  for (let n = 0; a && n < e.length; n++) a = Sa(e[n], t[n]);
  return a;
}
function Sa(e, t) {
  if (e === t) return !0;
  let a = Qs(e), n = Qs(t);
  if (a || n) return a && n ? e.getTime() === t.getTime() : !1;
  if (a = pt(e), n = pt(t), a || n) return e === t;
  if (a = ne(e), n = ne(t), a || n) return a && n ? Hr(e, t) : !1;
  if (a = ke(e), n = ke(t), a || n) {
    if (!a || !n || Object.keys(e).length !== Object.keys(t).length) return !1;
    for (const s in e) {
      const l = e.hasOwnProperty(s), o = t.hasOwnProperty(s);
      if (l && !o || !l && o || !Sa(e[s], t[s])) return !1;
    }
  }
  return String(e) === String(t);
}
function Cs(e, t) {
  return e.findIndex((a) => Sa(a, t));
}
var ll = (e) => !!(e && e.__v_isRef === !0), h = (e) => Me(e) ? e : e == null ? "" : ne(e) || ke(e) && (e.toString === tl || !le(e.toString)) ? ll(e) ? h(e.value) : JSON.stringify(e, rl, 2) : String(e), rl = (e, t) => ll(t) ? rl(e, t.value) : va(t) ? { [`Map(${t.size})`]: [...t.entries()].reduce((a, [n, s], l) => (a[Vn(n, l) + " =>"] = s, a), {}) } : xa(t) ? { [`Set(${t.size})`]: [...t.values()].map((a) => Vn(a)) } : pt(t) ? Vn(t) : ke(t) && !ne(t) && !al(t) ? String(t) : t, Vn = (e, t = "") => {
  var a;
  return pt(e) ? `Symbol(${(a = e.description) != null ? a : t})` : e;
}, De, Kr = class {
  constructor(e = !1) {
    this.detached = e, this._active = !0, this._on = 0, this.effects = [], this.cleanups = [], this._isPaused = !1, this._warnOnRun = !0, this.__v_skip = !0, !e && De && (De.active ? (this.parent = De, this.index = (De.scopes || (De.scopes = [])).push(this) - 1) : (this._active = !1, this._warnOnRun = !1));
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
      const t = De;
      try {
        return De = this, e();
      } finally {
        De = t;
      }
    }
  }
  on() {
    ++this._on === 1 && (this.prevScope = De, De = this);
  }
  off() {
    if (this._on > 0 && --this._on === 0) {
      if (De === this) De = this.prevScope;
      else {
        let e = De;
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
function Gr() {
  return De;
}
var _e, Wn = /* @__PURE__ */ new WeakSet(), ol = class {
  constructor(e) {
    this.fn = e, this.deps = void 0, this.depsTail = void 0, this.flags = 5, this.next = void 0, this.cleanup = void 0, this.scheduler = void 0, De && (De.active ? De.effects.push(this) : this.flags &= -2);
  }
  pause() {
    this.flags |= 64;
  }
  resume() {
    this.flags & 64 && (this.flags &= -65, Wn.has(this) && (Wn.delete(this), this.trigger()));
  }
  notify() {
    this.flags & 2 && !(this.flags & 32) || this.flags & 8 || dl(this);
  }
  run() {
    if (!(this.flags & 1)) return this.fn();
    this.flags |= 2, ei(this), cl(this);
    const e = _e, t = vt;
    _e = this, vt = !0;
    try {
      return this.fn();
    } finally {
      fl(this), _e = e, vt = t, this.flags &= -3;
    }
  }
  stop() {
    if (this.flags & 1) {
      for (let e = this.deps; e; e = e.nextDep) Ts(e);
      this.deps = this.depsTail = void 0, ei(this), this.onStop && this.onStop(), this.flags &= -2;
    }
  }
  trigger() {
    this.flags & 64 ? Wn.add(this) : this.scheduler ? this.scheduler() : this.runIfDirty();
  }
  runIfDirty() {
    us(this) && this.run();
  }
  get dirty() {
    return us(this);
  }
}, ul = 0, qa, Ua;
function dl(e, t = !1) {
  if (e.flags |= 8, t) {
    e.next = Ua, Ua = e;
    return;
  }
  e.next = qa, qa = e;
}
function As() {
  ul++;
}
function Ms() {
  if (--ul > 0) return;
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
function cl(e) {
  for (let t = e.deps; t; t = t.nextDep)
    t.version = -1, t.prevActiveLink = t.dep.activeLink, t.dep.activeLink = t;
}
function fl(e) {
  let t, a = e.depsTail, n = a;
  for (; n; ) {
    const s = n.prevDep;
    n.version === -1 ? (n === a && (a = s), Ts(n), zr(n)) : t = n, n.dep.activeLink = n.prevActiveLink, n.prevActiveLink = void 0, n = s;
  }
  e.deps = t, e.depsTail = a;
}
function us(e) {
  for (let t = e.deps; t; t = t.nextDep) if (t.dep.version !== t.version || t.dep.computed && (vl(t.dep.computed) || t.dep.version !== t.version)) return !0;
  return !!e._dirty;
}
function vl(e) {
  if (e.flags & 4 && !(e.flags & 16) || (e.flags &= -17, e.globalVersion === Ka) || (e.globalVersion = Ka, !e.isSSR && e.flags & 128 && (!e.deps && !e._dirty || !us(e)))) return;
  e.flags |= 2;
  const t = e.dep, a = _e, n = vt;
  _e = e, vt = !0;
  try {
    cl(e);
    const s = e.fn(e._value);
    (t.version === 0 || xt(s, e._value)) && (e.flags |= 128, e._value = s, t.version++);
  } catch (s) {
    throw t.version++, s;
  } finally {
    _e = a, vt = n, fl(e), e.flags &= -3;
  }
}
function Ts(e, t = !1) {
  const { dep: a, prevSub: n, nextSub: s } = e;
  if (n && (n.nextSub = s, e.prevSub = void 0), s && (s.prevSub = n, e.nextSub = void 0), a.subs === e && (a.subs = n, !n && a.computed)) {
    a.computed.flags &= -5;
    for (let l = a.computed.deps; l; l = l.nextDep) Ts(l, !0);
  }
  !t && !--a.sc && a.map && a.map.delete(a.key);
}
function zr(e) {
  const { prevDep: t, nextDep: a } = e;
  t && (t.nextDep = a, e.prevDep = void 0), a && (a.prevDep = t, e.nextDep = void 0);
}
var vt = !0, pl = [];
function Lt() {
  pl.push(vt), vt = !1;
}
function Rt() {
  const e = pl.pop();
  vt = e === void 0 ? !0 : e;
}
function ei(e) {
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
var Ka = 0, Vr = class {
  constructor(e, t) {
    this.sub = e, this.dep = t, this.version = t.version, this.nextDep = this.prevDep = this.nextSub = this.prevSub = this.prevActiveLink = void 0;
  }
}, Es = class {
  constructor(e) {
    this.computed = e, this.version = 0, this.activeLink = void 0, this.subs = void 0, this.map = void 0, this.key = void 0, this.sc = 0, this.__v_skip = !0;
  }
  track(e) {
    if (!_e || !vt || _e === this.computed) return;
    let t = this.activeLink;
    if (t === void 0 || t.sub !== _e)
      t = this.activeLink = new Vr(_e, this), _e.deps ? (t.prevDep = _e.depsTail, _e.depsTail.nextDep = t, _e.depsTail = t) : _e.deps = _e.depsTail = t, gl(t);
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
function gl(e) {
  if (e.dep.sc++, e.sub.flags & 4) {
    const t = e.dep.computed;
    if (t && !e.dep.subs) {
      t.flags |= 20;
      for (let n = t.deps; n; n = n.nextDep) gl(n);
    }
    const a = e.dep.subs;
    a !== e && (e.prevSub = a, a && (a.nextSub = e)), e.dep.subs = e;
  }
}
var ds = /* @__PURE__ */ new WeakMap(), na = /* @__PURE__ */ Symbol(""), cs = /* @__PURE__ */ Symbol(""), Ga = /* @__PURE__ */ Symbol("");
function je(e, t, a) {
  if (vt && _e) {
    let n = ds.get(e);
    n || ds.set(e, n = /* @__PURE__ */ new Map());
    let s = n.get(a);
    s || (n.set(a, s = new Es()), s.map = n, s.key = a), s.track();
  }
}
function It(e, t, a, n, s, l) {
  const o = ds.get(e);
  if (!o) {
    Ka++;
    return;
  }
  const r = (u) => {
    u && u.trigger();
  };
  if (As(), t === "clear") o.forEach(r);
  else {
    const u = ne(e), c = u && $s(a);
    if (u && a === "length") {
      const d = Number(n);
      o.forEach((y, w) => {
        (w === "length" || w === Ga || !pt(w) && w >= d) && r(y);
      });
    } else
      switch ((a !== void 0 || o.has(void 0)) && r(o.get(a)), c && r(o.get(Ga)), t) {
        case "add":
          u ? c && r(o.get("length")) : (r(o.get(na)), va(e) && r(o.get(cs)));
          break;
        case "delete":
          u || (r(o.get(na)), va(e) && r(o.get(cs)));
          break;
        case "set":
          va(e) && r(o.get(na));
          break;
      }
  }
  Ms();
}
function ra(e) {
  const t = /* @__PURE__ */ ie(e);
  return t === e ? t : (je(t, "iterate", Ga), /* @__PURE__ */ ot(e) ? t : t.map(gt));
}
function Nn(e) {
  return je(e = /* @__PURE__ */ ie(e), "iterate", Ga), e;
}
function kt(e, t) {
  return /* @__PURE__ */ Bt(e) ? ba(/* @__PURE__ */ sa(e) ? gt(t) : t) : gt(t);
}
var Wr = {
  __proto__: null,
  [Symbol.iterator]() {
    return Yn(this, Symbol.iterator, (e) => kt(this, e));
  },
  concat(...e) {
    return ra(this).concat(...e.map((t) => ne(t) ? ra(t) : t));
  },
  entries() {
    return Yn(this, "entries", (e) => (e[1] = kt(this, e[1]), e));
  },
  every(e, t) {
    return Ct(this, "every", e, t, void 0, arguments);
  },
  filter(e, t) {
    return Ct(this, "filter", e, t, (a) => a.map((n) => kt(this, n)), arguments);
  },
  find(e, t) {
    return Ct(this, "find", e, t, (a) => kt(this, a), arguments);
  },
  findIndex(e, t) {
    return Ct(this, "findIndex", e, t, void 0, arguments);
  },
  findLast(e, t) {
    return Ct(this, "findLast", e, t, (a) => kt(this, a), arguments);
  },
  findLastIndex(e, t) {
    return Ct(this, "findLastIndex", e, t, void 0, arguments);
  },
  forEach(e, t) {
    return Ct(this, "forEach", e, t, void 0, arguments);
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
    return Ct(this, "map", e, t, void 0, arguments);
  },
  pop() {
    return Ma(this, "pop");
  },
  push(...e) {
    return Ma(this, "push", e);
  },
  reduce(e, ...t) {
    return ti(this, "reduce", e, t);
  },
  reduceRight(e, ...t) {
    return ti(this, "reduceRight", e, t);
  },
  shift() {
    return Ma(this, "shift");
  },
  some(e, t) {
    return Ct(this, "some", e, t, void 0, arguments);
  },
  splice(...e) {
    return Ma(this, "splice", e);
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
    return Ma(this, "unshift", e);
  },
  values() {
    return Yn(this, "values", (e) => kt(this, e));
  }
};
function Yn(e, t, a) {
  const n = Nn(e), s = n[t]();
  return n !== e && !/* @__PURE__ */ ot(e) && (s._next = s.next, s.next = () => {
    const l = s._next();
    return l.done || (l.value = a(l.value)), l;
  }), s;
}
var Yr = Array.prototype;
function Ct(e, t, a, n, s, l) {
  const o = Nn(e), r = o !== e && !/* @__PURE__ */ ot(e), u = o[t];
  if (u !== Yr[t]) {
    const y = u.apply(e, l);
    return r ? gt(y) : y;
  }
  let c = a;
  o !== e && (r ? c = function(y, w) {
    return a.call(this, kt(e, y), w, e);
  } : a.length > 2 && (c = function(y, w) {
    return a.call(this, y, w, e);
  }));
  const d = u.call(o, c, n);
  return r && s ? s(d) : d;
}
function ti(e, t, a, n) {
  const s = Nn(e), l = s !== e && !/* @__PURE__ */ ot(e);
  let o = a, r = !1;
  s !== e && (l ? (r = n.length === 0, o = function(c, d, y) {
    return r && (r = !1, c = kt(e, c)), a.call(this, c, kt(e, d), y, e);
  }) : a.length > 3 && (o = function(c, d, y) {
    return a.call(this, c, d, y, e);
  }));
  const u = s[t](o, ...n);
  return r ? kt(e, u) : u;
}
function Xn(e, t, a) {
  const n = /* @__PURE__ */ ie(e);
  je(n, "iterate", Ga);
  const s = n[t](...a);
  return (s === -1 || s === !1) && /* @__PURE__ */ Os(a[0]) ? (a[0] = /* @__PURE__ */ ie(a[0]), n[t](...a)) : s;
}
function Ma(e, t, a = []) {
  Lt(), As();
  const n = (/* @__PURE__ */ ie(e))[t].apply(e, a);
  return Ms(), Rt(), n;
}
var Xr = /* @__PURE__ */ In("__proto__,__v_isRef,__isVue"), ml = new Set(/* @__PURE__ */ Object.getOwnPropertyNames(Symbol).filter((e) => e !== "arguments" && e !== "caller").map((e) => Symbol[e]).filter(pt));
function Jr(e) {
  pt(e) || (e = String(e));
  const t = /* @__PURE__ */ ie(this);
  return je(t, "has", e), t.hasOwnProperty(e);
}
var bl = class {
  constructor(e = !1, t = !1) {
    this._isReadonly = e, this._isShallow = t;
  }
  get(e, t, a) {
    if (t === "__v_skip") return e.__v_skip;
    const n = this._isReadonly, s = this._isShallow;
    if (t === "__v_isReactive") return !n;
    if (t === "__v_isReadonly") return n;
    if (t === "__v_isShallow") return s;
    if (t === "__v_raw")
      return a === (n ? s ? ro : wl : s ? kl : yl).get(e) || Object.getPrototypeOf(e) === Object.getPrototypeOf(a) ? e : void 0;
    const l = ne(e);
    if (!n) {
      let r;
      if (l && (r = Wr[t])) return r;
      if (t === "hasOwnProperty") return Jr;
    }
    const o = Reflect.get(e, t, /* @__PURE__ */ Ge(e) ? e : a);
    if ((pt(t) ? ml.has(t) : Xr(t)) || (n || je(e, "get", t), s)) return o;
    if (/* @__PURE__ */ Ge(o)) {
      const r = l && $s(t) ? o : o.value;
      return n && ke(r) ? /* @__PURE__ */ vs(r) : r;
    }
    return ke(o) ? n ? /* @__PURE__ */ vs(o) : /* @__PURE__ */ Dt(o) : o;
  }
}, hl = class extends bl {
  constructor(e = !1) {
    super(!1, e);
  }
  set(e, t, a, n) {
    let s = e[t];
    const l = ne(e) && $s(t);
    if (!this._isShallow) {
      const u = /* @__PURE__ */ Bt(s);
      if (!/* @__PURE__ */ ot(a) && !/* @__PURE__ */ Bt(a) && (s = /* @__PURE__ */ ie(s), a = /* @__PURE__ */ ie(a)), !l && /* @__PURE__ */ Ge(s) && !/* @__PURE__ */ Ge(a)) return u || (s.value = a), !0;
    }
    const o = l ? Number(t) < e.length : ye(e, t), r = Reflect.set(e, t, a, /* @__PURE__ */ Ge(e) ? e : n);
    return e === /* @__PURE__ */ ie(n) && (o ? xt(a, s) && It(e, "set", t, a, s) : It(e, "add", t, a)), r;
  }
  deleteProperty(e, t) {
    const a = ye(e, t), n = e[t], s = Reflect.deleteProperty(e, t);
    return s && a && It(e, "delete", t, void 0, n), s;
  }
  has(e, t) {
    const a = Reflect.has(e, t);
    return (!pt(t) || !ml.has(t)) && je(e, "has", t), a;
  }
  ownKeys(e) {
    return je(e, "iterate", ne(e) ? "length" : na), Reflect.ownKeys(e);
  }
}, Qr = class extends bl {
  constructor(e = !1) {
    super(!0, e);
  }
  set(e, t) {
    return !0;
  }
  deleteProperty(e, t) {
    return !0;
  }
}, Zr = /* @__PURE__ */ new hl(), eo = /* @__PURE__ */ new Qr(), to = /* @__PURE__ */ new hl(!0), fs = (e) => e, on = (e) => Reflect.getPrototypeOf(e);
function ao(e, t, a) {
  return function(...n) {
    const s = this.__v_raw, l = /* @__PURE__ */ ie(s), o = va(l), r = e === "entries" || e === Symbol.iterator && o, u = e === "keys" && o, c = s[e](...n), d = a ? fs : t ? ba : gt;
    return !t && je(l, "iterate", u ? cs : na), Ee(Object.create(c), { next() {
      const { value: y, done: w } = c.next();
      return w ? {
        value: y,
        done: w
      } : {
        value: r ? [d(y[0]), d(y[1])] : d(y),
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
function no(e, t) {
  const a = {
    get(n) {
      const s = this.__v_raw, l = /* @__PURE__ */ ie(s), o = /* @__PURE__ */ ie(n);
      e || (xt(n, o) && je(l, "get", n), je(l, "get", o));
      const { has: r } = on(l), u = t ? fs : e ? ba : gt;
      if (r.call(l, n)) return u(s.get(n));
      if (r.call(l, o)) return u(s.get(o));
      s !== l && s.get(n);
    },
    get size() {
      const n = this.__v_raw;
      return !e && je(/* @__PURE__ */ ie(n), "iterate", na), n.size;
    },
    has(n) {
      const s = this.__v_raw, l = /* @__PURE__ */ ie(s), o = /* @__PURE__ */ ie(n);
      return e || (xt(n, o) && je(l, "has", n), je(l, "has", o)), n === o ? s.has(n) : s.has(n) || s.has(o);
    },
    forEach(n, s) {
      const l = this, o = l.__v_raw, r = /* @__PURE__ */ ie(o), u = t ? fs : e ? ba : gt;
      return !e && je(r, "iterate", na), o.forEach((c, d) => n.call(s, u(c), u(d), l));
    }
  };
  return Ee(a, e ? {
    add: un("add"),
    set: un("set"),
    delete: un("delete"),
    clear: un("clear")
  } : {
    add(n) {
      const s = /* @__PURE__ */ ie(this), l = on(s), o = /* @__PURE__ */ ie(n), r = !t && !/* @__PURE__ */ ot(n) && !/* @__PURE__ */ Bt(n) ? o : n;
      return l.has.call(s, r) || xt(n, r) && l.has.call(s, n) || xt(o, r) && l.has.call(s, o) || (s.add(r), It(s, "add", r, r)), this;
    },
    set(n, s) {
      !t && !/* @__PURE__ */ ot(s) && !/* @__PURE__ */ Bt(s) && (s = /* @__PURE__ */ ie(s));
      const l = /* @__PURE__ */ ie(this), { has: o, get: r } = on(l);
      let u = o.call(l, n);
      u || (n = /* @__PURE__ */ ie(n), u = o.call(l, n));
      const c = r.call(l, n);
      return l.set(n, s), u ? xt(s, c) && It(l, "set", n, s, c) : It(l, "add", n, s), this;
    },
    delete(n) {
      const s = /* @__PURE__ */ ie(this), { has: l, get: o } = on(s);
      let r = l.call(s, n);
      r || (n = /* @__PURE__ */ ie(n), r = l.call(s, n));
      const u = o ? o.call(s, n) : void 0, c = s.delete(n);
      return r && It(s, "delete", n, void 0, u), c;
    },
    clear() {
      const n = /* @__PURE__ */ ie(this), s = n.size !== 0, l = void 0, o = n.clear();
      return s && It(n, "clear", void 0, void 0, l), o;
    }
  }), [
    "keys",
    "values",
    "entries",
    Symbol.iterator
  ].forEach((n) => {
    a[n] = ao(n, e, t);
  }), a;
}
function Is(e, t) {
  const a = no(e, t);
  return (n, s, l) => s === "__v_isReactive" ? !e : s === "__v_isReadonly" ? e : s === "__v_raw" ? n : Reflect.get(ye(a, s) && s in n ? a : n, s, l);
}
var so = { get: /* @__PURE__ */ Is(!1, !1) }, io = { get: /* @__PURE__ */ Is(!1, !0) }, lo = { get: /* @__PURE__ */ Is(!0, !1) }, yl = /* @__PURE__ */ new WeakMap(), kl = /* @__PURE__ */ new WeakMap(), wl = /* @__PURE__ */ new WeakMap(), ro = /* @__PURE__ */ new WeakMap();
function oo(e) {
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
function Dt(e) {
  return /* @__PURE__ */ Bt(e) ? e : Ps(e, !1, Zr, so, yl);
}
// @__NO_SIDE_EFFECTS__
function uo(e) {
  return Ps(e, !1, to, io, kl);
}
// @__NO_SIDE_EFFECTS__
function vs(e) {
  return Ps(e, !0, eo, lo, wl);
}
function Ps(e, t, a, n, s) {
  if (!ke(e) || e.__v_raw && !(t && e.__v_isReactive) || e.__v_skip || !Object.isExtensible(e)) return e;
  const l = s.get(e);
  if (l) return l;
  const o = oo(Lr(e));
  if (o === 0) return e;
  const r = new Proxy(e, o === 2 ? n : a);
  return s.set(e, r), r;
}
// @__NO_SIDE_EFFECTS__
function sa(e) {
  return /* @__PURE__ */ Bt(e) ? /* @__PURE__ */ sa(e.__v_raw) : !!(e && e.__v_isReactive);
}
// @__NO_SIDE_EFFECTS__
function Bt(e) {
  return !!(e && e.__v_isReadonly);
}
// @__NO_SIDE_EFFECTS__
function ot(e) {
  return !!(e && e.__v_isShallow);
}
// @__NO_SIDE_EFFECTS__
function Os(e) {
  return e ? !!e.__v_raw : !1;
}
// @__NO_SIDE_EFFECTS__
function ie(e) {
  const t = e && e.__v_raw;
  return t ? /* @__PURE__ */ ie(t) : e;
}
function co(e) {
  return !ye(e, "__v_skip") && Object.isExtensible(e) && nl(e, "__v_skip", !0), e;
}
var gt = (e) => ke(e) ? /* @__PURE__ */ Dt(e) : e, ba = (e) => ke(e) ? /* @__PURE__ */ vs(e) : e;
// @__NO_SIDE_EFFECTS__
function Ge(e) {
  return e ? e.__v_isRef === !0 : !1;
}
// @__NO_SIDE_EFFECTS__
function W(e) {
  return fo(e, !1);
}
function fo(e, t) {
  return /* @__PURE__ */ Ge(e) ? e : new vo(e, t);
}
var vo = class {
  constructor(e, t) {
    this.dep = new Es(), this.__v_isRef = !0, this.__v_isShallow = !1, this._rawValue = t ? e : /* @__PURE__ */ ie(e), this._value = t ? e : gt(e), this.__v_isShallow = t;
  }
  get value() {
    return this.dep.track(), this._value;
  }
  set value(e) {
    const t = this._rawValue, a = this.__v_isShallow || /* @__PURE__ */ ot(e) || /* @__PURE__ */ Bt(e);
    e = a ? e : /* @__PURE__ */ ie(e), xt(e, t) && (this._rawValue = e, this._value = a ? e : gt(e), this.dep.trigger());
  }
};
function fe(e) {
  return /* @__PURE__ */ Ge(e) ? e.value : e;
}
var po = {
  get: (e, t, a) => t === "__v_raw" ? e : fe(Reflect.get(e, t, a)),
  set: (e, t, a, n) => {
    const s = e[t];
    return /* @__PURE__ */ Ge(s) && !/* @__PURE__ */ Ge(a) ? (s.value = a, !0) : Reflect.set(e, t, a, n);
  }
};
function xl(e) {
  return /* @__PURE__ */ sa(e) ? e : new Proxy(e, po);
}
var go = class {
  constructor(e, t, a) {
    this.fn = e, this.setter = t, this._value = void 0, this.dep = new Es(this), this.__v_isRef = !0, this.deps = void 0, this.depsTail = void 0, this.flags = 16, this.globalVersion = Ka - 1, this.next = void 0, this.effect = this, this.__v_isReadonly = !t, this.isSSR = a;
  }
  notify() {
    if (this.flags |= 16, !(this.flags & 8) && _e !== this)
      return dl(this, !0), !0;
  }
  get value() {
    const e = this.dep.track();
    return vl(this), e && (e.version = this.dep.version), this._value;
  }
  set value(e) {
    this.setter && this.setter(e);
  }
};
// @__NO_SIDE_EFFECTS__
function mo(e, t, a = !1) {
  let n, s;
  return le(e) ? n = e : (n = e.get, s = e.set), new go(n, s, a);
}
var dn = {}, wn = /* @__PURE__ */ new WeakMap(), ta = void 0;
function bo(e, t = !1, a = ta) {
  if (a) {
    let n = wn.get(a);
    n || wn.set(a, n = []), n.push(e);
  }
}
function ho(e, t, a = Se) {
  const { immediate: n, deep: s, once: l, scheduler: o, augmentJob: r, call: u } = a, c = (M) => s ? M : /* @__PURE__ */ ot(M) || s === !1 || s === 0 ? Pt(M, 1) : Pt(M);
  let d, y, w, m, A = !1, P = !1;
  if (/* @__PURE__ */ Ge(e) ? (y = () => e.value, A = /* @__PURE__ */ ot(e)) : /* @__PURE__ */ sa(e) ? (y = () => c(e), A = !0) : ne(e) ? (P = !0, A = e.some((M) => /* @__PURE__ */ sa(M) || /* @__PURE__ */ ot(M)), y = () => e.map((M) => {
    if (/* @__PURE__ */ Ge(M)) return M.value;
    if (/* @__PURE__ */ sa(M)) return c(M);
    if (le(M)) return u ? u(M, 2) : M();
  })) : le(e) ? t ? y = u ? () => u(e, 2) : e : y = () => {
    if (w) {
      Lt();
      try {
        w();
      } finally {
        Rt();
      }
    }
    const M = ta;
    ta = d;
    try {
      return u ? u(e, 3, [m]) : e(m);
    } finally {
      ta = M;
    }
  } : y = St, t && s) {
    const M = y, _ = s === !0 ? 1 / 0 : s;
    y = () => Pt(M(), _);
  }
  const R = Gr(), q = () => {
    d.stop(), R && R.active && _s(R.effects, d);
  };
  if (l && t) {
    const M = t;
    t = (..._) => {
      M(..._), q();
    };
  }
  let U = P ? new Array(e.length).fill(dn) : dn;
  const L = (M) => {
    if (!(!(d.flags & 1) || !d.dirty && !M))
      if (t) {
        const _ = d.run();
        if (s || A || (P ? _.some((T, S) => xt(T, U[S])) : xt(_, U))) {
          w && w();
          const T = ta;
          ta = d;
          try {
            const S = [
              _,
              U === dn ? void 0 : P && U[0] === dn ? [] : U,
              m
            ];
            U = _, u ? u(t, 3, S) : t(...S);
          } finally {
            ta = T;
          }
        }
      } else d.run();
  };
  return r && r(L), d = new ol(y), d.scheduler = o ? () => o(L, !1) : L, m = (M) => bo(M, !1, d), w = d.onStop = () => {
    const M = wn.get(d);
    if (M) {
      if (u) u(M, 4);
      else for (const _ of M) _();
      wn.delete(d);
    }
  }, t ? n ? L(!0) : U = d.run() : o ? o(L.bind(null, !0), !0) : d.run(), q.pause = d.pause.bind(d), q.resume = d.resume.bind(d), q.stop = q, q;
}
function Pt(e, t = 1 / 0, a) {
  if (t <= 0 || !ke(e) || e.__v_skip || (a = a || /* @__PURE__ */ new Map(), (a.get(e) || 0) >= t)) return e;
  if (a.set(e, t), t--, /* @__PURE__ */ Ge(e)) Pt(e.value, t, a);
  else if (ne(e)) for (let n = 0; n < e.length; n++) Pt(e[n], t, a);
  else if (xa(e) || va(e)) e.forEach((n) => {
    Pt(n, t, a);
  });
  else if (al(e)) {
    for (const n in e) Pt(e[n], t, a);
    for (const n of Object.getOwnPropertySymbols(e)) Object.prototype.propertyIsEnumerable.call(e, n) && Pt(e[n], t, a);
  }
  return e;
}
function an(e, t, a, n) {
  try {
    return n ? e(...n) : e();
  } catch (s) {
    qn(s, t, a);
  }
}
function dt(e, t, a, n) {
  if (le(e)) {
    const s = an(e, t, a, n);
    return s && el(s) && s.catch((l) => {
      qn(l, t, a);
    }), s;
  }
  if (ne(e)) {
    const s = [];
    for (let l = 0; l < e.length; l++) s.push(dt(e[l], t, a, n));
    return s;
  }
}
function qn(e, t, a, n = !0) {
  const s = t ? t.vnode : null, { errorHandler: l, throwUnhandledErrorInProduction: o } = t && t.appContext.config || Se;
  if (t) {
    let r = t.parent;
    const u = t.proxy, c = `https://vuejs.org/error-reference/#runtime-${a}`;
    for (; r; ) {
      const d = r.ec;
      if (d) {
        for (let y = 0; y < d.length; y++) if (d[y](e, u, c) === !1) return;
      }
      r = r.parent;
    }
    if (l) {
      Lt(), an(l, null, 10, [
        e,
        u,
        c
      ]), Rt();
      return;
    }
  }
  yo(e, a, s, n, o);
}
function yo(e, t, a, n = !0, s = !1) {
  if (s) throw e;
  console.error(e);
}
var We = [], ht = -1, pa = [], Kt = null, ua = 0, Sl = /* @__PURE__ */ Promise.resolve(), xn = null;
function nn(e) {
  const t = xn || Sl;
  return e ? t.then(this ? e.bind(this) : e) : t;
}
function ko(e) {
  let t = ht + 1, a = We.length;
  for (; t < a; ) {
    const n = t + a >>> 1, s = We[n], l = za(s);
    l < e || l === e && s.flags & 2 ? t = n + 1 : a = n;
  }
  return t;
}
function Ls(e) {
  if (!(e.flags & 1)) {
    const t = za(e), a = We[We.length - 1];
    !a || !(e.flags & 2) && t >= za(a) ? We.push(e) : We.splice(ko(t), 0, e), e.flags |= 1, _l();
  }
}
function _l() {
  xn || (xn = Sl.then(Cl));
}
function wo(e) {
  ne(e) ? pa.push(...e) : Kt && e.id === -1 ? Kt.splice(ua + 1, 0, e) : e.flags & 1 || (pa.push(e), e.flags |= 1), _l();
}
function ai(e, t, a = ht + 1) {
  for (; a < We.length; a++) {
    const n = We[a];
    if (n && n.flags & 2) {
      if (e && n.id !== e.uid) continue;
      We.splice(a, 1), a--, n.flags & 4 && (n.flags &= -2), n(), n.flags & 4 || (n.flags &= -2);
    }
  }
}
function $l(e) {
  if (pa.length) {
    const t = [...new Set(pa)].sort((a, n) => za(a) - za(n));
    if (pa.length = 0, Kt) {
      Kt.push(...t);
      return;
    }
    for (Kt = t, ua = 0; ua < Kt.length; ua++) {
      const a = Kt[ua];
      a.flags & 4 && (a.flags &= -2), a.flags & 8 || a(), a.flags &= -2;
    }
    Kt = null, ua = 0;
  }
}
var za = (e) => e.id == null ? e.flags & 2 ? -1 : 1 / 0 : e.id;
function Cl(e) {
  try {
    for (ht = 0; ht < We.length; ht++) {
      const t = We[ht];
      t && !(t.flags & 8) && (t.flags & 4 && (t.flags &= -2), an(t, t.i, t.i ? 15 : 14), t.flags & 4 || (t.flags &= -2));
    }
  } finally {
    for (; ht < We.length; ht++) {
      const t = We[ht];
      t && (t.flags &= -2);
    }
    ht = -1, We.length = 0, $l(e), xn = null, (We.length || pa.length) && Cl(e);
  }
}
var Be = null, Al = null;
function Sn(e) {
  const t = Be;
  return Be = e, Al = e && e.type.__scopeId || null, t;
}
function ia(e, t = Be, a) {
  if (!t || e._n) return e;
  const n = (...s) => {
    n._d && An(-1);
    const l = Sn(t);
    let o;
    try {
      o = e(...s);
    } finally {
      Sn(l), n._d && An(1);
    }
    return o;
  };
  return n._n = !0, n._c = !0, n._d = !0, n;
}
function Pe(e, t) {
  if (Be === null) return e;
  const a = Kn(Be), n = e.dirs || (e.dirs = []);
  for (let s = 0; s < t.length; s++) {
    let [l, o, r, u = Se] = t[s];
    l && (le(l) && (l = {
      mounted: l,
      updated: l
    }), l.deep && Pt(o), n.push({
      dir: l,
      instance: a,
      value: o,
      oldValue: void 0,
      arg: r,
      modifiers: u
    }));
  }
  return e;
}
function Jt(e, t, a, n) {
  const s = e.dirs, l = t && t.dirs;
  for (let o = 0; o < s.length; o++) {
    const r = s[o];
    l && (r.oldValue = l[o].value);
    let u = r.dir[n];
    u && (Lt(), dt(u, a, 8, [
      e.el,
      r,
      e,
      t
    ]), Rt());
  }
}
function xo(e, t) {
  if (Ke) {
    let a = Ke.provides;
    const n = Ke.parent && Ke.parent.provides;
    n === a && (a = Ke.provides = Object.create(n)), a[e] = t;
  }
}
function bn(e, t, a = !1) {
  const n = ir();
  if (n || ma) {
    let s = ma ? ma._context.provides : n ? n.parent == null || n.ce ? n.vnode.appContext && n.vnode.appContext.provides : n.parent.provides : void 0;
    if (s && e in s) return s[e];
    if (arguments.length > 1) return a && le(t) ? t.call(n && n.proxy) : t;
  }
}
var So = /* @__PURE__ */ Symbol.for("v-scx"), _o = () => {
  {
    const e = bn(So);
    return e;
  }
};
function at(e, t, a) {
  return Ml(e, t, a);
}
function Ml(e, t, a = Se) {
  const { immediate: n, deep: s, flush: l, once: o } = a, r = Ee({}, a), u = t && n || !t && l !== "post";
  let c;
  if (Xa) {
    if (l === "sync") {
      const m = _o();
      c = m.__watcherHandles || (m.__watcherHandles = []);
    } else if (!u) {
      const m = () => {
      };
      return m.stop = St, m.resume = St, m.pause = St, m;
    }
  }
  const d = Ke;
  r.call = (m, A, P) => dt(m, d, A, P);
  let y = !1;
  l === "post" ? r.scheduler = (m) => {
    Xe(m, d && d.suspense);
  } : l !== "sync" && (y = !0, r.scheduler = (m, A) => {
    A ? m() : Ls(m);
  }), r.augmentJob = (m) => {
    t && (m.flags |= 4), y && (m.flags |= 2, d && (m.id = d.uid, m.i = d));
  };
  const w = ho(e, t, r);
  return Xa && (c ? c.push(w) : u && w()), w;
}
function $o(e, t, a) {
  const n = this.proxy, s = Me(e) ? e.includes(".") ? Tl(n, e) : () => n[e] : e.bind(n, n);
  let l;
  le(t) ? l = t : (l = t.handler, a = t);
  const o = sn(this), r = Ml(s, l.bind(n), a);
  return o(), r;
}
function Tl(e, t) {
  const a = t.split(".");
  return () => {
    let n = e;
    for (let s = 0; s < a.length && n; s++) n = n[a[s]];
    return n;
  };
}
var Co = /* @__PURE__ */ Symbol("_vte"), El = (e) => e.__isTeleport, rt = /* @__PURE__ */ Symbol("_leaveCb"), Ta = /* @__PURE__ */ Symbol("_enterCb");
function Ao() {
  const e = {
    isMounted: !1,
    isLeaving: !1,
    isUnmounting: !1,
    leavingVNodes: /* @__PURE__ */ new Map()
  };
  return nt(() => {
    e.isMounted = !0;
  }), ct(() => {
    e.isUnmounting = !0;
  }), e;
}
var it = [Function, Array], Il = {
  mode: String,
  appear: Boolean,
  persisted: Boolean,
  onBeforeEnter: it,
  onEnter: it,
  onAfterEnter: it,
  onEnterCancelled: it,
  onBeforeLeave: it,
  onLeave: it,
  onAfterLeave: it,
  onLeaveCancelled: it,
  onBeforeAppear: it,
  onAppear: it,
  onAfterAppear: it,
  onAppearCancelled: it
}, Pl = (e) => {
  const t = e.subTree;
  return t.component ? Pl(t.component) : t;
}, Mo = {
  name: "BaseTransition",
  props: Il,
  setup(e, { slots: t }) {
    const a = ir(), n = Ao();
    return () => {
      const s = t.default && Rl(t.default(), !0), l = s && s.length ? Ol(s) : a.subTree ? H() : void 0;
      if (!l) return;
      const o = /* @__PURE__ */ ie(e), { mode: r } = o;
      if (n.isLeaving) return Jn(l);
      const u = ni(l);
      if (!u) return Jn(l);
      let c = ps(u, o, n, a, (y) => c = y);
      u.type !== He && Va(u, c);
      let d = a.subTree && ni(a.subTree);
      if (d && d.type !== He && !aa(d, u) && Pl(a).type !== He) {
        let y = ps(d, o, n, a);
        if (Va(d, y), r === "out-in" && u.type !== He)
          return n.isLeaving = !0, y.afterLeave = () => {
            n.isLeaving = !1, a.job.flags & 8 || a.update(), delete y.afterLeave, d = void 0;
          }, Jn(l);
        r === "in-out" && u.type !== He ? y.delayLeave = (w, m, A) => {
          const P = Ll(n, d);
          P[String(d.key)] = d, w[rt] = () => {
            m(), w[rt] = void 0, delete c.delayedLeave, d = void 0;
          }, c.delayedLeave = () => {
            A(), delete c.delayedLeave, d = void 0;
          };
        } : d = void 0;
      } else d && (d = void 0);
      return l;
    };
  }
};
function Ol(e) {
  let t = e[0];
  if (e.length > 1) {
    for (const a of e) if (a.type !== He) {
      t = a;
      break;
    }
  }
  return t;
}
var To = Mo;
function Ll(e, t) {
  const { leavingVNodes: a } = e;
  let n = a.get(t.type);
  return n || (n = /* @__PURE__ */ Object.create(null), a.set(t.type, n)), n;
}
function ps(e, t, a, n, s) {
  const { appear: l, mode: o, persisted: r = !1, onBeforeEnter: u, onEnter: c, onAfterEnter: d, onEnterCancelled: y, onBeforeLeave: w, onLeave: m, onAfterLeave: A, onLeaveCancelled: P, onBeforeAppear: R, onAppear: q, onAfterAppear: U, onAppearCancelled: L } = t, M = String(e.key), _ = Ll(a, e), T = (C, G) => {
    C && dt(C, n, 9, G);
  }, S = (C, G) => {
    const Z = G[1];
    T(C, G), ne(C) ? C.every((X) => X.length <= 1) && Z() : C.length <= 1 && Z();
  }, $ = {
    mode: o,
    persisted: r,
    beforeEnter(C) {
      let G = u;
      if (!a.isMounted) if (l) G = R || u;
      else return;
      C[rt] && C[rt](!0);
      const Z = _[M];
      Z && aa(e, Z) && Z.el[rt] && Z.el[rt](), T(G, [C]);
    },
    enter(C) {
      if (_[M] === e) return;
      let G = c, Z = d, X = y;
      if (!a.isMounted) if (l)
        G = q || c, Z = U || d, X = L || y;
      else return;
      let J = !1;
      C[Ta] = (ue) => {
        J || (J = !0, ue ? T(X, [C]) : T(Z, [C]), $.delayedLeave && $.delayedLeave(), C[Ta] = void 0);
      };
      const j = C[Ta].bind(null, !1);
      G ? S(G, [C, j]) : j();
    },
    leave(C, G) {
      const Z = String(e.key);
      if (C[Ta] && C[Ta](!0), a.isUnmounting) return G();
      T(w, [C]);
      let X = !1;
      C[rt] = (j) => {
        X || (X = !0, G(), j ? T(P, [C]) : T(A, [C]), C[rt] = void 0, _[Z] === e && delete _[Z]);
      };
      const J = C[rt].bind(null, !1);
      _[Z] = e, m ? S(m, [C, J]) : J();
    },
    clone(C) {
      const G = ps(C, t, a, n, s);
      return s && s(G), G;
    }
  };
  return $;
}
function Jn(e) {
  if (Un(e))
    return e = Vt(e), e.children = null, e;
}
function ni(e) {
  if (!Un(e))
    return El(e.type) && e.children ? Ol(e.children) : e;
  if (e.component) return e.component.subTree;
  const { shapeFlag: t, children: a } = e;
  if (a) {
    if (t & 16) return a[0];
    if (t & 32 && le(a.default)) return a.default();
  }
}
function Va(e, t) {
  e.shapeFlag & 6 && e.component ? (e.transition = t, Va(e.component.subTree, t)) : e.shapeFlag & 128 ? (e.ssContent.transition = t.clone(e.ssContent), e.ssFallback.transition = t.clone(e.ssFallback)) : e.transition = t;
}
function Rl(e, t = !1, a) {
  let n = [], s = 0;
  for (let l = 0; l < e.length; l++) {
    let o = e[l];
    const r = a == null ? o.key : String(a) + String(o.key != null ? o.key : l);
    o.type === te ? (o.patchFlag & 128 && s++, n = n.concat(Rl(o.children, t, r))) : (t || o.type !== He) && n.push(r != null ? Vt(o, { key: r }) : o);
  }
  if (s > 1) for (let l = 0; l < n.length; l++) n[l].patchFlag = -2;
  return n;
}
// @__NO_SIDE_EFFECTS__
function re(e, t) {
  return le(e) ? Ee({ name: e.name }, t, { setup: e }) : e;
}
function Dl(e) {
  e.ids = [
    e.ids[0] + e.ids[2]++ + "-",
    0,
    0
  ];
}
function si(e, t) {
  let a;
  return !!((a = Object.getOwnPropertyDescriptor(e, t)) && !a.configurable);
}
var _n = /* @__PURE__ */ new WeakMap();
function Fa(e, t, a, n, s = !1) {
  if (ne(e)) {
    e.forEach((P, R) => Fa(P, t && (ne(t) ? t[R] : t), a, n, s));
    return;
  }
  if (ga(n) && !s) {
    n.shapeFlag & 512 && n.type.__asyncResolved && n.component.subTree.component && Fa(e, t, a, n.component.subTree);
    return;
  }
  const l = n.shapeFlag & 4 ? Kn(n.component) : n.el, o = s ? null : l, { i: r, r: u } = e, c = t && t.r, d = r.refs === Se ? r.refs = {} : r.refs, y = r.setupState, w = /* @__PURE__ */ ie(y), m = y === Se ? Zi : (P) => si(d, P) ? !1 : ye(w, P), A = (P, R) => !(R && si(d, R));
  if (c != null && c !== u) {
    if (ii(t), Me(c))
      d[c] = null, m(c) && (y[c] = null);
    else if (/* @__PURE__ */ Ge(c)) {
      const P = t;
      A(c, P.k) && (c.value = null), P.k && (d[P.k] = null);
    }
  }
  if (le(u)) an(u, r, 12, [o, d]);
  else {
    const P = Me(u), R = /* @__PURE__ */ Ge(u);
    if (P || R) {
      const q = () => {
        if (e.f) {
          const U = P ? m(u) ? y[u] : d[u] : A(u) || !e.k ? u.value : d[e.k];
          if (s) ne(U) && _s(U, l);
          else if (ne(U)) U.includes(l) || U.push(l);
          else if (P)
            d[u] = [l], m(u) && (y[u] = d[u]);
          else {
            const L = [l];
            A(u, e.k) && (u.value = L), e.k && (d[e.k] = L);
          }
        } else P ? (d[u] = o, m(u) && (y[u] = o)) : R && (A(u, e.k) && (u.value = o), e.k && (d[e.k] = o));
      };
      if (o) {
        const U = () => {
          q(), _n.delete(e);
        };
        U.id = -1, _n.set(e, U), Xe(U, a);
      } else
        ii(e), q();
    }
  }
}
function ii(e) {
  const t = _n.get(e);
  t && (t.flags |= 8, _n.delete(e));
}
var O0 = Bn().requestIdleCallback || ((e) => setTimeout(e, 1)), L0 = Bn().cancelIdleCallback || ((e) => clearTimeout(e)), ga = (e) => !!e.type.__asyncLoader, Un = (e) => e.type.__isKeepAlive;
function Eo(e, t) {
  Bl(e, "a", t);
}
function Io(e, t) {
  Bl(e, "da", t);
}
function Bl(e, t, a = Ke) {
  const n = e.__wdc || (e.__wdc = () => {
    let s = a;
    for (; s; ) {
      if (s.isDeactivated) return;
      s = s.parent;
    }
    return e();
  });
  if (Fn(t, n, a), a) {
    let s = a.parent;
    for (; s && s.parent; )
      Un(s.parent.vnode) && Po(n, t, a, s), s = s.parent;
  }
}
function Po(e, t, a, n) {
  const s = Fn(t, e, n, !0);
  _a(() => {
    _s(n[t], s);
  }, a);
}
function Fn(e, t, a = Ke, n = !1) {
  if (a) {
    const s = a[e] || (a[e] = []), l = t.__weh || (t.__weh = (...o) => {
      Lt();
      const r = sn(a), u = dt(t, a, e, o);
      return r(), Rt(), u;
    });
    return n ? s.unshift(l) : s.push(l), l;
  }
}
var Nt = (e) => (t, a = Ke) => {
  (!Xa || e === "sp") && Fn(e, (...n) => t(...n), a);
}, Oo = Nt("bm"), nt = Nt("m"), Lo = Nt("bu"), Ro = Nt("u"), ct = Nt("bum"), _a = Nt("um"), Do = Nt("sp"), Bo = Nt("rtg"), No = Nt("rtc");
function qo(e, t = Ke) {
  Fn("ec", e, t);
}
var Nl = "components", ql = /* @__PURE__ */ Symbol.for("v-ndc");
function Uo(e) {
  return Me(e) ? Fo(Nl, e, !1) || e : e || ql;
}
function Fo(e, t, a = !0, n = !1) {
  const s = Be || Ke;
  if (s) {
    const l = s.type;
    if (e === Nl) {
      const r = Cu(l, !1);
      if (r && (r === t || r === Ye(t) || r === Rn(Ye(t)))) return l;
    }
    const o = li(s[e] || l[e], t) || li(s.appContext[e], t);
    return !o && n ? l : o;
  }
}
function li(e, t) {
  return e && (e[t] || e[Ye(t)] || e[Rn(Ye(t))]);
}
function ce(e, t, a, n) {
  let s;
  const l = a && a[n], o = ne(e);
  if (o || Me(e)) {
    const r = o && /* @__PURE__ */ sa(e);
    let u = !1, c = !1;
    r && (u = !/* @__PURE__ */ ot(e), c = /* @__PURE__ */ Bt(e), e = Nn(e)), s = new Array(e.length);
    for (let d = 0, y = e.length; d < y; d++) s[d] = t(u ? c ? ba(gt(e[d])) : gt(e[d]) : e[d], d, void 0, l && l[d]);
  } else if (typeof e == "number") {
    s = new Array(e);
    for (let r = 0; r < e; r++) s[r] = t(r + 1, r, void 0, l && l[r]);
  } else if (ke(e)) if (e[Symbol.iterator]) s = Array.from(e, (r, u) => t(r, u, void 0, l && l[u]));
  else {
    const r = Object.keys(e);
    s = new Array(r.length);
    for (let u = 0, c = r.length; u < c; u++) {
      const d = r[u];
      s[u] = t(e[d], d, u, l && l[u]);
    }
  }
  else s = [];
  return a && (a[n] = s), s;
}
function $n(e, t, a = {}, n, s) {
  if (Be.ce || Be.parent && ga(Be.parent) && Be.parent.ce) {
    const c = Object.keys(a).length > 0;
    return t !== "default" && (a.name = t), p(), be(te, null, [Ce("slot", a, n && n())], c ? -2 : 64);
  }
  let l = e[t];
  l && l._c && (l._d = !1), p();
  const o = l && Ul(l(a)), r = a.key || o && o.key, u = be(te, { key: (r && !pt(r) ? r : `_${t}`) + (!o && n ? "_fb" : "") }, o || (n ? n() : []), o && e._ === 1 ? 64 : -2);
  return !s && u.scopeId && (u.slotScopeIds = [u.scopeId + "-s"]), l && l._c && (l._d = !0), u;
}
function Ul(e) {
  return e.some((t) => Ya(t) ? !(t.type === He || t.type === te && !Ul(t.children)) : !0) ? e : null;
}
var gs = (e) => e ? lr(e) ? Kn(e) : gs(e.parent) : null, ja = /* @__PURE__ */ Ee(/* @__PURE__ */ Object.create(null), {
  $: (e) => e,
  $el: (e) => e.vnode.el,
  $data: (e) => e.data,
  $props: (e) => e.props,
  $attrs: (e) => e.attrs,
  $slots: (e) => e.slots,
  $refs: (e) => e.refs,
  $parent: (e) => gs(e.parent),
  $root: (e) => gs(e.root),
  $host: (e) => e.ce,
  $emit: (e) => e.emit,
  $options: (e) => Rs(e),
  $forceUpdate: (e) => e.f || (e.f = () => {
    Ls(e.update);
  }),
  $nextTick: (e) => e.n || (e.n = nn.bind(e.proxy)),
  $watch: (e) => $o.bind(e)
}), Qn = (e, t) => e !== Se && !e.__isScriptSetup && ye(e, t), jo = {
  get({ _: e }, t) {
    if (t === "__v_skip") return !0;
    const { ctx: a, setupState: n, data: s, props: l, accessCache: o, type: r, appContext: u } = e;
    if (t[0] !== "$") {
      const w = o[t];
      if (w !== void 0) switch (w) {
        case 1:
          return n[t];
        case 2:
          return s[t];
        case 4:
          return a[t];
        case 3:
          return l[t];
      }
      else {
        if (Qn(n, t))
          return o[t] = 1, n[t];
        if (s !== Se && ye(s, t))
          return o[t] = 2, s[t];
        if (ye(l, t))
          return o[t] = 3, l[t];
        if (a !== Se && ye(a, t))
          return o[t] = 4, a[t];
        ms && (o[t] = 0);
      }
    }
    const c = ja[t];
    let d, y;
    if (c)
      return t === "$attrs" && je(e.attrs, "get", ""), c(e);
    if ((d = r.__cssModules) && (d = d[t])) return d;
    if (a !== Se && ye(a, t))
      return o[t] = 4, a[t];
    if (y = u.config.globalProperties, ye(y, t)) return y[t];
  },
  set({ _: e }, t, a) {
    const { data: n, setupState: s, ctx: l } = e;
    return Qn(s, t) ? (s[t] = a, !0) : n !== Se && ye(n, t) ? (n[t] = a, !0) : ye(e.props, t) || t[0] === "$" && t.slice(1) in e ? !1 : (l[t] = a, !0);
  },
  has({ _: { data: e, setupState: t, accessCache: a, ctx: n, appContext: s, props: l, type: o } }, r) {
    let u;
    return !!(a[r] || e !== Se && r[0] !== "$" && ye(e, r) || Qn(t, r) || ye(l, r) || ye(n, r) || ye(ja, r) || ye(s.config.globalProperties, r) || (u = o.__cssModules) && u[r]);
  },
  defineProperty(e, t, a) {
    return a.get != null ? e._.accessCache[t] = 0 : ye(a, "value") && this.set(e, t, a.value, null), Reflect.defineProperty(e, t, a);
  }
};
function ri(e) {
  return ne(e) ? e.reduce((t, a) => (t[a] = null, t), {}) : e;
}
var ms = !0;
function Ho(e) {
  const t = Rs(e), a = e.proxy, n = e.ctx;
  ms = !1, t.beforeCreate && oi(t.beforeCreate, e, "bc");
  const { data: s, computed: l, methods: o, watch: r, provide: u, inject: c, created: d, beforeMount: y, mounted: w, beforeUpdate: m, updated: A, activated: P, deactivated: R, beforeDestroy: q, beforeUnmount: U, destroyed: L, unmounted: M, render: _, renderTracked: T, renderTriggered: S, errorCaptured: $, serverPrefetch: C, expose: G, inheritAttrs: Z, components: X, directives: J, filters: j } = t;
  if (c && Ko(c, n, null), o) for (const de in o) {
    const pe = o[de];
    le(pe) && (n[de] = pe.bind(a));
  }
  if (s) {
    const de = s.call(a, a);
    ke(de) && (e.data = /* @__PURE__ */ Dt(de));
  }
  if (ms = !0, l) for (const de in l) {
    const pe = l[de], Ae = z({
      get: le(pe) ? pe.bind(a, a) : le(pe.get) ? pe.get.bind(a, a) : St,
      set: !le(pe) && le(pe.set) ? pe.set.bind(a) : St
    });
    Object.defineProperty(n, de, {
      enumerable: !0,
      configurable: !0,
      get: () => Ae.value,
      set: (Oe) => Ae.value = Oe
    });
  }
  if (r) for (const de in r) Fl(r[de], n, a, de);
  if (u) {
    const de = le(u) ? u.call(a) : u;
    Reflect.ownKeys(de).forEach((pe) => {
      xo(pe, de[pe]);
    });
  }
  d && oi(d, e, "c");
  function he(de, pe) {
    ne(pe) ? pe.forEach((Ae) => de(Ae.bind(a))) : pe && de(pe.bind(a));
  }
  if (he(Oo, y), he(nt, w), he(Lo, m), he(Ro, A), he(Eo, P), he(Io, R), he(qo, $), he(No, T), he(Bo, S), he(ct, U), he(_a, M), he(Do, C), ne(G))
    if (G.length) {
      const de = e.exposed || (e.exposed = {});
      G.forEach((pe) => {
        Object.defineProperty(de, pe, {
          get: () => a[pe],
          set: (Ae) => a[pe] = Ae,
          enumerable: !0
        });
      });
    } else e.exposed || (e.exposed = {});
  _ && e.render === St && (e.render = _), Z != null && (e.inheritAttrs = Z), X && (e.components = X), J && (e.directives = J), C && Dl(e);
}
function Ko(e, t, a = St) {
  ne(e) && (e = bs(e));
  for (const n in e) {
    const s = e[n];
    let l;
    ke(s) ? "default" in s ? l = bn(s.from || n, s.default, !0) : l = bn(s.from || n) : l = bn(s), /* @__PURE__ */ Ge(l) ? Object.defineProperty(t, n, {
      enumerable: !0,
      configurable: !0,
      get: () => l.value,
      set: (o) => l.value = o
    }) : t[n] = l;
  }
}
function oi(e, t, a) {
  dt(ne(e) ? e.map((n) => n.bind(t.proxy)) : e.bind(t.proxy), t, a);
}
function Fl(e, t, a, n) {
  let s = n.includes(".") ? Tl(a, n) : () => a[n];
  if (Me(e)) {
    const l = t[e];
    le(l) && at(s, l);
  } else if (le(e)) at(s, e.bind(a));
  else if (ke(e)) if (ne(e)) e.forEach((l) => Fl(l, t, a, n));
  else {
    const l = le(e.handler) ? e.handler.bind(a) : t[e.handler];
    le(l) && at(s, l, e);
  }
}
function Rs(e) {
  const t = e.type, { mixins: a, extends: n } = t, { mixins: s, optionsCache: l, config: { optionMergeStrategies: o } } = e.appContext, r = l.get(t);
  let u;
  return r ? u = r : !s.length && !a && !n ? u = t : (u = {}, s.length && s.forEach((c) => Cn(u, c, o, !0)), Cn(u, t, o)), ke(t) && l.set(t, u), u;
}
function Cn(e, t, a, n = !1) {
  const { mixins: s, extends: l } = t;
  l && Cn(e, l, a, !0), s && s.forEach((o) => Cn(e, o, a, !0));
  for (const o in t) if (!(n && o === "expose")) {
    const r = Go[o] || a && a[o];
    e[o] = r ? r(e[o], t[o]) : t[o];
  }
  return e;
}
var Go = {
  data: ui,
  props: di,
  emits: di,
  methods: Ra,
  computed: Ra,
  beforeCreate: Ve,
  created: Ve,
  beforeMount: Ve,
  mounted: Ve,
  beforeUpdate: Ve,
  updated: Ve,
  beforeDestroy: Ve,
  beforeUnmount: Ve,
  destroyed: Ve,
  unmounted: Ve,
  activated: Ve,
  deactivated: Ve,
  errorCaptured: Ve,
  serverPrefetch: Ve,
  components: Ra,
  directives: Ra,
  watch: Vo,
  provide: ui,
  inject: zo
};
function ui(e, t) {
  return t ? e ? function() {
    return Ee(le(e) ? e.call(this, this) : e, le(t) ? t.call(this, this) : t);
  } : t : e;
}
function zo(e, t) {
  return Ra(bs(e), bs(t));
}
function bs(e) {
  if (ne(e)) {
    const t = {};
    for (let a = 0; a < e.length; a++) t[e[a]] = e[a];
    return t;
  }
  return e;
}
function Ve(e, t) {
  return e ? [...new Set([].concat(e, t))] : t;
}
function Ra(e, t) {
  return e ? Ee(/* @__PURE__ */ Object.create(null), e, t) : t;
}
function di(e, t) {
  return e ? ne(e) && ne(t) ? [.../* @__PURE__ */ new Set([...e, ...t])] : Ee(/* @__PURE__ */ Object.create(null), ri(e), ri(t ?? {})) : t;
}
function Vo(e, t) {
  if (!e) return t;
  if (!t) return e;
  const a = Ee(/* @__PURE__ */ Object.create(null), e);
  for (const n in t) a[n] = Ve(e[n], t[n]);
  return a;
}
function jl() {
  return {
    app: null,
    config: {
      isNativeTag: Zi,
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
  return function(n, s = null) {
    le(n) || (n = Ee({}, n)), s != null && !ke(s) && (s = null);
    const l = jl(), o = /* @__PURE__ */ new WeakSet(), r = [];
    let u = !1;
    const c = l.app = {
      _uid: Wo++,
      _component: n,
      _props: s,
      _container: null,
      _context: l,
      _instance: null,
      version: Tu,
      get config() {
        return l.config;
      },
      set config(d) {
      },
      use(d, ...y) {
        return o.has(d) || (d && le(d.install) ? (o.add(d), d.install(c, ...y)) : le(d) && (o.add(d), d(c, ...y))), c;
      },
      mixin(d) {
        return l.mixins.includes(d) || l.mixins.push(d), c;
      },
      component(d, y) {
        return y ? (l.components[d] = y, c) : l.components[d];
      },
      directive(d, y) {
        return y ? (l.directives[d] = y, c) : l.directives[d];
      },
      mount(d, y, w) {
        if (!u) {
          const m = c._ceVNode || Ce(n, s);
          return m.appContext = l, w === !0 ? w = "svg" : w === !1 && (w = void 0), y && t ? t(m, d) : e(m, d, w), u = !0, c._container = d, d.__vue_app__ = c, Kn(m.component);
        }
      },
      onUnmount(d) {
        r.push(d);
      },
      unmount() {
        u && (dt(r, c._instance, 16), e(null, c._container), delete c._container.__vue_app__);
      },
      provide(d, y) {
        return l.provides[d] = y, c;
      },
      runWithContext(d) {
        const y = ma;
        ma = c;
        try {
          return d();
        } finally {
          ma = y;
        }
      }
    };
    return c;
  };
}
var ma = null, Xo = (e, t) => t === "modelValue" || t === "model-value" ? e.modelModifiers : e[`${t}Modifiers`] || e[`${Ye(t)}Modifiers`] || e[`${Wt(t)}Modifiers`];
function Jo(e, t, ...a) {
  if (e.isUnmounted) return;
  const n = e.vnode.props || Se;
  let s = a;
  const l = t.startsWith("update:"), o = l && Xo(n, t.slice(7));
  o && (o.trim && (s = a.map((d) => Me(d) ? d.trim() : d)), o.number && (s = a.map(Dn)));
  let r, u = n[r = zn(t)] || n[r = zn(Ye(t))];
  !u && l && (u = n[r = zn(Wt(t))]), u && dt(u, e, 6, s);
  const c = n[r + "Once"];
  if (c) {
    if (!e.emitted) e.emitted = {};
    else if (e.emitted[r]) return;
    e.emitted[r] = !0, dt(c, e, 6, s);
  }
}
var Qo = /* @__PURE__ */ new WeakMap();
function Hl(e, t, a = !1) {
  const n = a ? Qo : t.emitsCache, s = n.get(e);
  if (s !== void 0) return s;
  const l = e.emits;
  let o = {}, r = !1;
  if (!le(e)) {
    const u = (c) => {
      const d = Hl(c, t, !0);
      d && (r = !0, Ee(o, d));
    };
    !a && t.mixins.length && t.mixins.forEach(u), e.extends && u(e.extends), e.mixins && e.mixins.forEach(u);
  }
  return !l && !r ? (ke(e) && n.set(e, null), null) : (ne(l) ? l.forEach((u) => o[u] = null) : Ee(o, l), ke(e) && n.set(e, o), o);
}
function jn(e, t) {
  return !e || !Pn(t) ? !1 : (t = t.slice(2).replace(/Once$/, ""), ye(e, t[0].toLowerCase() + t.slice(1)) || ye(e, Wt(t)) || ye(e, t));
}
function Zn(e) {
  const { type: t, vnode: a, proxy: n, withProxy: s, propsOptions: [l], slots: o, attrs: r, emit: u, render: c, renderCache: d, props: y, data: w, setupState: m, ctx: A, inheritAttrs: P } = e, R = Sn(e);
  let q, U;
  try {
    if (a.shapeFlag & 4) {
      const M = s || n, _ = M;
      q = wt(c.call(_, M, d, y, m, w, A)), U = r;
    } else {
      const M = t;
      q = wt(M.length > 1 ? M(y, {
        attrs: r,
        slots: o,
        emit: u
      }) : M(y, null)), U = t.props ? r : Zo(r);
    }
  } catch (M) {
    Ha.length = 0, qn(M, e, 1), q = Ce(He);
  }
  let L = q;
  if (U && P !== !1) {
    const M = Object.keys(U), { shapeFlag: _ } = L;
    M.length && _ & 7 && (l && M.some(On) && (U = eu(U, l)), L = Vt(L, U, !1, !0));
  }
  return a.dirs && (L = Vt(L, null, !1, !0), L.dirs = L.dirs ? L.dirs.concat(a.dirs) : a.dirs), a.transition && Va(L, a.transition), q = L, Sn(R), q;
}
var Zo = (e) => {
  let t;
  for (const a in e) (a === "class" || a === "style" || Pn(a)) && ((t || (t = {}))[a] = e[a]);
  return t;
}, eu = (e, t) => {
  const a = {};
  for (const n in e) (!On(n) || !(n.slice(9) in t)) && (a[n] = e[n]);
  return a;
};
function tu(e, t, a) {
  const { props: n, children: s, component: l } = e, { props: o, children: r, patchFlag: u } = t, c = l.emitsOptions;
  if (t.dirs || t.transition) return !0;
  if (a && u >= 0) {
    if (u & 1024) return !0;
    if (u & 16)
      return n ? ci(n, o, c) : !!o;
    if (u & 8) {
      const d = t.dynamicProps;
      for (let y = 0; y < d.length; y++) {
        const w = d[y];
        if (Kl(o, n, w) && !jn(c, w)) return !0;
      }
    }
  } else
    return (s || r) && (!r || !r.$stable) ? !0 : n === o ? !1 : n ? o ? ci(n, o, c) : !0 : !!o;
  return !1;
}
function ci(e, t, a) {
  const n = Object.keys(t);
  if (n.length !== Object.keys(e).length) return !0;
  for (let s = 0; s < n.length; s++) {
    const l = n[s];
    if (Kl(t, e, l) && !jn(a, l)) return !0;
  }
  return !1;
}
function Kl(e, t, a) {
  const n = e[a], s = t[a];
  return a === "style" && ke(n) && ke(s) ? !Sa(n, s) : n !== s;
}
function au({ vnode: e, parent: t, suspense: a }, n) {
  for (; t; ) {
    const s = t.subTree;
    if (s.suspense && s.suspense.activeBranch === e && (s.suspense.vnode.el = s.el = n, e = s), s === e)
      (e = t.vnode).el = n, t = t.parent;
    else break;
  }
  a && a.activeBranch === e && (a.vnode.el = n);
}
var Gl = {}, zl = () => Object.create(Gl), Vl = (e) => Object.getPrototypeOf(e) === Gl;
function nu(e, t, a, n = !1) {
  const s = {}, l = zl();
  e.propsDefaults = /* @__PURE__ */ Object.create(null), Wl(e, t, s, l);
  for (const o in e.propsOptions[0]) o in s || (s[o] = void 0);
  a ? e.props = n ? s : /* @__PURE__ */ uo(s) : e.type.props ? e.props = s : e.props = l, e.attrs = l;
}
function su(e, t, a, n) {
  const { props: s, attrs: l, vnode: { patchFlag: o } } = e, r = /* @__PURE__ */ ie(s), [u] = e.propsOptions;
  let c = !1;
  if ((n || o > 0) && !(o & 16)) {
    if (o & 8) {
      const d = e.vnode.dynamicProps;
      for (let y = 0; y < d.length; y++) {
        let w = d[y];
        if (jn(e.emitsOptions, w)) continue;
        const m = t[w];
        if (u) if (ye(l, w))
          m !== l[w] && (l[w] = m, c = !0);
        else {
          const A = Ye(w);
          s[A] = hs(u, r, A, m, e, !1);
        }
        else m !== l[w] && (l[w] = m, c = !0);
      }
    }
  } else {
    Wl(e, t, s, l) && (c = !0);
    let d;
    for (const y in r) (!t || !ye(t, y) && ((d = Wt(y)) === y || !ye(t, d))) && (u ? a && (a[y] !== void 0 || a[d] !== void 0) && (s[y] = hs(u, r, y, void 0, e, !0)) : delete s[y]);
    if (l !== r)
      for (const y in l) (!t || !ye(t, y)) && (delete l[y], c = !0);
  }
  c && It(e.attrs, "set", "");
}
function Wl(e, t, a, n) {
  const [s, l] = e.propsOptions;
  let o = !1, r;
  if (t) for (let u in t) {
    if (Na(u)) continue;
    const c = t[u];
    let d;
    s && ye(s, d = Ye(u)) ? !l || !l.includes(d) ? a[d] = c : (r || (r = {}))[d] = c : jn(e.emitsOptions, u) || (!(u in n) || c !== n[u]) && (n[u] = c, o = !0);
  }
  if (l) {
    const u = /* @__PURE__ */ ie(a), c = r || Se;
    for (let d = 0; d < l.length; d++) {
      const y = l[d];
      a[y] = hs(s, u, y, c[y], e, !ye(c, y));
    }
  }
  return o;
}
function hs(e, t, a, n, s, l) {
  const o = e[a];
  if (o != null) {
    const r = ye(o, "default");
    if (r && n === void 0) {
      const u = o.default;
      if (o.type !== Function && !o.skipFactory && le(u)) {
        const { propsDefaults: c } = s;
        if (a in c) n = c[a];
        else {
          const d = sn(s);
          n = c[a] = u.call(null, t), d();
        }
      } else n = u;
      s.ce && s.ce._setProp(a, n);
    }
    o[0] && (l && !r ? n = !1 : o[1] && (n === "" || n === Wt(a)) && (n = !0));
  }
  return n;
}
var iu = /* @__PURE__ */ new WeakMap();
function Yl(e, t, a = !1) {
  const n = a ? iu : t.propsCache, s = n.get(e);
  if (s) return s;
  const l = e.props, o = {}, r = [];
  let u = !1;
  if (!le(e)) {
    const d = (y) => {
      u = !0;
      const [w, m] = Yl(y, t, !0);
      Ee(o, w), m && r.push(...m);
    };
    !a && t.mixins.length && t.mixins.forEach(d), e.extends && d(e.extends), e.mixins && e.mixins.forEach(d);
  }
  if (!l && !u)
    return ke(e) && n.set(e, fa), fa;
  if (ne(l)) for (let d = 0; d < l.length; d++) {
    const y = Ye(l[d]);
    fi(y) && (o[y] = Se);
  }
  else if (l) for (const d in l) {
    const y = Ye(d);
    if (fi(y)) {
      const w = l[d], m = o[y] = ne(w) || le(w) ? { type: w } : Ee({}, w), A = m.type;
      let P = !1, R = !0;
      if (ne(A)) for (let q = 0; q < A.length; ++q) {
        const U = A[q], L = le(U) && U.name;
        if (L === "Boolean") {
          P = !0;
          break;
        } else L === "String" && (R = !1);
      }
      else P = le(A) && A.name === "Boolean";
      m[0] = P, m[1] = R, (P || ye(m, "default")) && r.push(y);
    }
  }
  const c = [o, r];
  return ke(e) && n.set(e, c), c;
}
function fi(e) {
  return e[0] !== "$" && !Na(e);
}
var Ds = (e) => e === "_" || e === "_ctx" || e === "$stable", Bs = (e) => ne(e) ? e.map(wt) : [wt(e)], lu = (e, t, a) => {
  if (t._n) return t;
  const n = ia((...s) => Bs(t(...s)), a);
  return n._c = !1, n;
}, Xl = (e, t, a) => {
  const n = e._ctx;
  for (const s in e) {
    if (Ds(s)) continue;
    const l = e[s];
    if (le(l)) t[s] = lu(s, l, n);
    else if (l != null) {
      const o = Bs(l);
      t[s] = () => o;
    }
  }
}, Jl = (e, t) => {
  const a = Bs(t);
  e.slots.default = () => a;
}, Ql = (e, t, a) => {
  for (const n in t) (a || !Ds(n)) && (e[n] = t[n]);
}, ru = (e, t, a) => {
  const n = e.slots = zl();
  if (e.vnode.shapeFlag & 32) {
    const s = t._;
    s ? (Ql(n, t, a), a && nl(n, "_", s, !0)) : Xl(t, n);
  } else t && Jl(e, t);
}, ou = (e, t, a) => {
  const { vnode: n, slots: s } = e;
  let l = !0, o = Se;
  if (n.shapeFlag & 32) {
    const r = t._;
    r ? a && r === 1 ? l = !1 : Ql(s, t, a) : (l = !t.$stable, Xl(t, s)), o = t;
  } else t && (Jl(e, t), o = { default: 1 });
  if (l)
    for (const r in s) !Ds(r) && o[r] == null && delete s[r];
}, Xe = vu;
function uu(e) {
  return du(e);
}
function du(e, t) {
  const a = Bn();
  a.__VUE__ = !0;
  const { insert: n, remove: s, patchProp: l, createElement: o, createText: r, createComment: u, setText: c, setElementText: d, parentNode: y, nextSibling: w, setScopeId: m = St, insertStaticContent: A } = e, P = (f, v, x, I = null, B = null, D = null, E = void 0, k = null, O = !!v.dynamicChildren) => {
    if (f === v) return;
    f && !aa(f, v) && (I = F(f), Le(f, B, D, !0), f = null), v.patchFlag === -2 && (O = !1, v.dynamicChildren = null);
    const { type: N, ref: Y, shapeFlag: K } = v;
    switch (N) {
      case Hn:
        R(f, v, x, I);
        break;
      case He:
        q(f, v, x, I);
        break;
      case hn:
        f == null && U(v, x, I, E);
        break;
      case te:
        X(f, v, x, I, B, D, E, k, O);
        break;
      default:
        K & 1 ? _(f, v, x, I, B, D, E, k, O) : K & 6 ? J(f, v, x, I, B, D, E, k, O) : (K & 64 || K & 128) && N.process(f, v, x, I, B, D, E, k, O, st);
    }
    Y != null && B ? Fa(Y, f && f.ref, D, v || f, !v) : Y == null && f && f.ref != null && Fa(f.ref, null, D, f, !0);
  }, R = (f, v, x, I) => {
    if (f == null) n(v.el = r(v.children), x, I);
    else {
      const B = v.el = f.el;
      v.children !== f.children && c(B, v.children);
    }
  }, q = (f, v, x, I) => {
    f == null ? n(v.el = u(v.children || ""), x, I) : v.el = f.el;
  }, U = (f, v, x, I) => {
    [f.el, f.anchor] = A(f.children, v, x, I, f.el, f.anchor);
  }, L = ({ el: f, anchor: v }, x, I) => {
    let B;
    for (; f && f !== v; )
      B = w(f), n(f, x, I), f = B;
    n(v, x, I);
  }, M = ({ el: f, anchor: v }) => {
    let x;
    for (; f && f !== v; )
      x = w(f), s(f), f = x;
    s(v);
  }, _ = (f, v, x, I, B, D, E, k, O) => {
    if (v.type === "svg" ? E = "svg" : v.type === "math" && (E = "mathml"), f == null) T(v, x, I, B, D, E, k, O);
    else {
      const N = f.el && f.el._isVueCE ? f.el : null;
      try {
        N && N._beginPatch(), C(f, v, B, D, E, k, O);
      } finally {
        N && N._endPatch();
      }
    }
  }, T = (f, v, x, I, B, D, E, k) => {
    let O, N;
    const { props: Y, shapeFlag: K, transition: Q, dirs: ee } = f;
    if (O = f.el = o(f.type, D, Y && Y.is, Y), K & 8 ? d(O, f.children) : K & 16 && $(f.children, O, null, I, B, es(f, D), E, k), ee && Jt(f, null, I, "created"), S(O, f, f.scopeId, E, I), Y) {
      for (const ge in Y) ge !== "value" && !Na(ge) && l(O, ge, null, Y[ge], D, I);
      "value" in Y && l(O, "value", null, Y.value, D), (N = Y.onVnodeBeforeMount) && mt(N, I, f);
    }
    ee && Jt(f, null, I, "beforeMount");
    const oe = cu(B, Q);
    oe && Q.beforeEnter(O), n(O, v, x), ((N = Y && Y.onVnodeMounted) || oe || ee) && Xe(() => {
      N && mt(N, I, f), oe && Q.enter(O), ee && Jt(f, null, I, "mounted");
    }, B);
  }, S = (f, v, x, I, B) => {
    if (x && m(f, x), I) for (let D = 0; D < I.length; D++) m(f, I[D]);
    if (B) {
      let D = B.subTree;
      if (v === D || ar(D.type) && (D.ssContent === v || D.ssFallback === v)) {
        const E = B.vnode;
        S(f, E, E.scopeId, E.slotScopeIds, B.parent);
      }
    }
  }, $ = (f, v, x, I, B, D, E, k, O = 0) => {
    for (let N = O; N < f.length; N++) P(null, f[N] = k ? Et(f[N]) : wt(f[N]), v, x, I, B, D, E, k);
  }, C = (f, v, x, I, B, D, E) => {
    const k = v.el = f.el;
    let { patchFlag: O, dynamicChildren: N, dirs: Y } = v;
    O |= f.patchFlag & 16;
    const K = f.props || Se, Q = v.props || Se;
    let ee;
    if (x && Qt(x, !1), (ee = Q.onVnodeBeforeUpdate) && mt(ee, x, v, f), Y && Jt(v, f, x, "beforeUpdate"), x && Qt(x, !0), (K.innerHTML && Q.innerHTML == null || K.textContent && Q.textContent == null) && d(k, ""), N ? G(f.dynamicChildren, N, k, x, I, es(v, B), D) : E || pe(f, v, k, null, x, I, es(v, B), D, !1), O > 0) {
      if (O & 16) Z(k, K, Q, x, B);
      else if (O & 2 && K.class !== Q.class && l(k, "class", null, Q.class, B), O & 4 && l(k, "style", K.style, Q.style, B), O & 8) {
        const oe = v.dynamicProps;
        for (let ge = 0; ge < oe.length; ge++) {
          const me = oe[ge], we = K[me], xe = Q[me];
          (xe !== we || me === "value") && l(k, me, we, xe, B, x);
        }
      }
      O & 1 && f.children !== v.children && d(k, v.children);
    } else !E && N == null && Z(k, K, Q, x, B);
    ((ee = Q.onVnodeUpdated) || Y) && Xe(() => {
      ee && mt(ee, x, v, f), Y && Jt(v, f, x, "updated");
    }, I);
  }, G = (f, v, x, I, B, D, E) => {
    for (let k = 0; k < v.length; k++) {
      const O = f[k], N = v[k];
      P(O, N, O.el && (O.type === te || !aa(O, N) || O.shapeFlag & 198) ? y(O.el) : x, null, I, B, D, E, !0);
    }
  }, Z = (f, v, x, I, B) => {
    if (v !== x) {
      if (v !== Se)
        for (const D in v) !Na(D) && !(D in x) && l(f, D, v[D], null, B, I);
      for (const D in x) {
        if (Na(D)) continue;
        const E = x[D], k = v[D];
        E !== k && D !== "value" && l(f, D, k, E, B, I);
      }
      "value" in x && l(f, "value", v.value, x.value, B);
    }
  }, X = (f, v, x, I, B, D, E, k, O) => {
    const N = v.el = f ? f.el : r(""), Y = v.anchor = f ? f.anchor : r("");
    let { patchFlag: K, dynamicChildren: Q, slotScopeIds: ee } = v;
    ee && (k = k ? k.concat(ee) : ee), f == null ? (n(N, x, I), n(Y, x, I), $(v.children || [], x, Y, B, D, E, k, O)) : K > 0 && K & 64 && Q && f.dynamicChildren && f.dynamicChildren.length === Q.length ? (G(f.dynamicChildren, Q, x, B, D, E, k), (v.key != null || B && v === B.subTree) && Zl(f, v, !0)) : pe(f, v, x, Y, B, D, E, k, O);
  }, J = (f, v, x, I, B, D, E, k, O) => {
    v.slotScopeIds = k, f == null ? v.shapeFlag & 512 ? B.ctx.activate(v, x, I, E, O) : j(v, x, I, B, D, E, O) : ue(f, v, O);
  }, j = (f, v, x, I, B, D, E) => {
    const k = f.component = wu(f, I, B);
    if (Un(f) && (k.ctx.renderer = st), xu(k, !1, E), k.asyncDep) {
      if (B && B.registerDep(k, he, E), !f.el) {
        const O = k.subTree = Ce(He);
        q(null, O, v, x), f.placeholder = O.el;
      }
    } else he(k, f, v, x, B, D, E);
  }, ue = (f, v, x) => {
    const I = v.component = f.component;
    if (tu(f, v, x)) if (I.asyncDep && !I.asyncResolved) {
      de(I, v, x);
      return;
    } else
      I.next = v, I.update();
    else
      v.el = f.el, I.vnode = v;
  }, he = (f, v, x, I, B, D, E) => {
    const k = () => {
      if (f.isMounted) {
        let { next: K, bu: Q, u: ee, parent: oe, vnode: ge } = f;
        {
          const Ne = er(f);
          if (Ne) {
            K && (K.el = ge.el, de(f, K, E)), Ne.asyncDep.then(() => {
              Xe(() => {
                f.isUnmounted || N();
              }, B);
            });
            return;
          }
        }
        let me = K, we;
        Qt(f, !1), K ? (K.el = ge.el, de(f, K, E)) : K = ge, Q && mn(Q), (we = K.props && K.props.onVnodeBeforeUpdate) && mt(we, oe, K, ge), Qt(f, !0);
        const xe = Zn(f), ze = f.subTree;
        f.subTree = xe, P(ze, xe, y(ze.el), F(ze), f, B, D), K.el = xe.el, me === null && au(f, xe.el), ee && Xe(ee, B), (we = K.props && K.props.onVnodeUpdated) && Xe(() => mt(we, oe, K, ge), B);
      } else {
        let K;
        const { el: Q, props: ee } = v, { bm: oe, m: ge, parent: me, root: we, type: xe } = f, ze = ga(v);
        if (Qt(f, !1), oe && mn(oe), !ze && (K = ee && ee.onVnodeBeforeMount) && mt(K, me, v), Qt(f, !0), Q && g) {
          const Ne = () => {
            f.subTree = Zn(f), g(Q, f.subTree, f, B, null);
          };
          ze && xe.__asyncHydrate ? xe.__asyncHydrate(Q, f, Ne) : Ne();
        } else {
          we.ce && we.ce._hasShadowRoot() && we.ce._injectChildStyle(xe, f.parent ? f.parent.type : void 0);
          const Ne = f.subTree = Zn(f);
          P(null, Ne, x, I, f, B, D), v.el = Ne.el;
        }
        if (ge && Xe(ge, B), !ze && (K = ee && ee.onVnodeMounted)) {
          const Ne = v;
          Xe(() => mt(K, me, Ne), B);
        }
        (v.shapeFlag & 256 || me && ga(me.vnode) && me.vnode.shapeFlag & 256) && f.a && Xe(f.a, B), f.isMounted = !0, v = x = I = null;
      }
    };
    f.scope.on();
    const O = f.effect = new ol(k);
    f.scope.off();
    const N = f.update = O.run.bind(O), Y = f.job = O.runIfDirty.bind(O);
    Y.i = f, Y.id = f.uid, O.scheduler = () => Ls(Y), Qt(f, !0), N();
  }, de = (f, v, x) => {
    v.component = f;
    const I = f.vnode.props;
    f.vnode = v, f.next = null, su(f, v.props, I, x), ou(f, v.children, x), Lt(), ai(f), Rt();
  }, pe = (f, v, x, I, B, D, E, k, O = !1) => {
    const N = f && f.children, Y = f ? f.shapeFlag : 0, K = v.children, { patchFlag: Q, shapeFlag: ee } = v;
    if (Q > 0) {
      if (Q & 128) {
        Oe(N, K, x, I, B, D, E, k, O);
        return;
      } else if (Q & 256) {
        Ae(N, K, x, I, B, D, E, k, O);
        return;
      }
    }
    ee & 8 ? (Y & 16 && V(N, B, D), K !== N && d(x, K)) : Y & 16 ? ee & 16 ? Oe(N, K, x, I, B, D, E, k, O) : V(N, B, D, !0) : (Y & 8 && d(x, ""), ee & 16 && $(K, x, I, B, D, E, k, O));
  }, Ae = (f, v, x, I, B, D, E, k, O) => {
    f = f || fa, v = v || fa;
    const N = f.length, Y = v.length, K = Math.min(N, Y);
    let Q;
    for (Q = 0; Q < K; Q++) {
      const ee = v[Q] = O ? Et(v[Q]) : wt(v[Q]);
      P(f[Q], ee, x, null, B, D, E, k, O);
    }
    N > Y ? V(f, B, D, !0, !1, K) : $(v, x, I, B, D, E, k, O, K);
  }, Oe = (f, v, x, I, B, D, E, k, O) => {
    let N = 0;
    const Y = v.length;
    let K = f.length - 1, Q = Y - 1;
    for (; N <= K && N <= Q; ) {
      const ee = f[N], oe = v[N] = O ? Et(v[N]) : wt(v[N]);
      if (aa(ee, oe)) P(ee, oe, x, null, B, D, E, k, O);
      else break;
      N++;
    }
    for (; N <= K && N <= Q; ) {
      const ee = f[K], oe = v[Q] = O ? Et(v[Q]) : wt(v[Q]);
      if (aa(ee, oe)) P(ee, oe, x, null, B, D, E, k, O);
      else break;
      K--, Q--;
    }
    if (N > K) {
      if (N <= Q) {
        const ee = Q + 1, oe = ee < Y ? v[ee].el : I;
        for (; N <= Q; )
          P(null, v[N] = O ? Et(v[N]) : wt(v[N]), x, oe, B, D, E, k, O), N++;
      }
    } else if (N > Q) for (; N <= K; )
      Le(f[N], B, D, !0), N++;
    else {
      const ee = N, oe = N, ge = /* @__PURE__ */ new Map();
      for (N = oe; N <= Q; N++) {
        const qe = v[N] = O ? Et(v[N]) : wt(v[N]);
        qe.key != null && ge.set(qe.key, N);
      }
      let me, we = 0;
      const xe = Q - oe + 1;
      let ze = !1, Ne = 0;
      const Ut = new Array(xe);
      for (N = 0; N < xe; N++) Ut[N] = 0;
      for (N = ee; N <= K; N++) {
        const qe = f[N];
        if (we >= xe) {
          Le(qe, B, D, !0);
          continue;
        }
        let Je;
        if (qe.key != null) Je = ge.get(qe.key);
        else for (me = oe; me <= Q; me++) if (Ut[me - oe] === 0 && aa(qe, v[me])) {
          Je = me;
          break;
        }
        Je === void 0 ? Le(qe, B, D, !0) : (Ut[Je - oe] = N + 1, Je >= Ne ? Ne = Je : ze = !0, P(qe, v[Je], x, null, B, D, E, k, O), we++);
      }
      const Ca = ze ? fu(Ut) : fa;
      for (me = Ca.length - 1, N = xe - 1; N >= 0; N--) {
        const qe = oe + N, Je = v[qe], la = v[qe + 1], Aa = qe + 1 < Y ? la.el || tr(la) : I;
        Ut[N] === 0 ? P(null, Je, x, Aa, B, D, E, k, O) : ze && (me < 0 || N !== Ca[me] ? ft(Je, x, Aa, 2) : me--);
      }
    }
  }, ft = (f, v, x, I, B = null) => {
    const { el: D, type: E, transition: k, children: O, shapeFlag: N } = f;
    if (N & 6) {
      ft(f.component.subTree, v, x, I);
      return;
    }
    if (N & 128) {
      f.suspense.move(v, x, I);
      return;
    }
    if (N & 64) {
      E.move(f, v, x, st);
      return;
    }
    if (E === te) {
      n(D, v, x);
      for (let Y = 0; Y < O.length; Y++) ft(O[Y], v, x, I);
      n(f.anchor, v, x);
      return;
    }
    if (E === hn) {
      L(f, v, x);
      return;
    }
    if (I !== 2 && N & 1 && k) if (I === 0) k.persisted && !D[rt] ? n(D, v, x) : (k.beforeEnter(D), n(D, v, x), Xe(() => k.enter(D), B));
    else {
      const { leave: Y, delayLeave: K, afterLeave: Q } = k, ee = () => {
        f.ctx.isUnmounted ? s(D) : n(D, v, x);
      }, oe = () => {
        const ge = D._isLeaving || !!D[rt];
        D._isLeaving && D[rt](!0), k.persisted && !ge ? ee() : Y(D, () => {
          ee(), Q && Q();
        });
      };
      K ? K(D, ee, oe) : oe();
    }
    else n(D, v, x);
  }, Le = (f, v, x, I = !1, B = !1) => {
    const { type: D, props: E, ref: k, children: O, dynamicChildren: N, shapeFlag: Y, patchFlag: K, dirs: Q, cacheIndex: ee, memo: oe } = f;
    if (K === -2 && (B = !1), k != null && (Lt(), Fa(k, null, x, f, !0), Rt()), ee != null && (v.renderCache[ee] = void 0), Y & 256) {
      v.ctx.deactivate(f);
      return;
    }
    const ge = Y & 1 && Q, me = !ga(f);
    let we;
    if (me && (we = E && E.onVnodeBeforeUnmount) && mt(we, v, f), Y & 6) qt(f.component, x, I);
    else {
      if (Y & 128) {
        f.suspense.unmount(x, I);
        return;
      }
      ge && Jt(f, null, v, "beforeUnmount"), Y & 64 ? f.type.remove(f, v, x, st, I) : N && !N.hasOnce && (D !== te || K > 0 && K & 64) ? V(N, v, x, !1, !0) : (D === te && K & 384 || !B && Y & 16) && V(O, v, x), I && Re(f);
    }
    const xe = oe != null && ee == null;
    (me && (we = E && E.onVnodeUnmounted) || ge || xe) && Xe(() => {
      we && mt(we, v, f), ge && Jt(f, null, v, "unmounted"), xe && (f.el = null);
    }, x);
  }, Re = (f) => {
    const { type: v, el: x, anchor: I, transition: B } = f;
    if (v === te) {
      Yt(x, I);
      return;
    }
    if (v === hn) {
      M(f);
      return;
    }
    const D = () => {
      s(x), B && !B.persisted && B.afterLeave && B.afterLeave();
    };
    if (f.shapeFlag & 1 && B && !B.persisted) {
      const { leave: E, delayLeave: k } = B, O = () => E(x, D);
      k ? k(f.el, D, O) : O();
    } else D();
  }, Yt = (f, v) => {
    let x;
    for (; f !== v; )
      x = w(f), s(f), f = x;
    s(v);
  }, qt = (f, v, x) => {
    const { bum: I, scope: B, job: D, subTree: E, um: k, m: O, a: N } = f;
    vi(O), vi(N), I && mn(I), B.stop(), D && (D.flags |= 8, Le(E, f, v, x)), k && Xe(k, v), Xe(() => {
      f.isUnmounted = !0;
    }, v);
  }, V = (f, v, x, I = !1, B = !1, D = 0) => {
    for (let E = D; E < f.length; E++) Le(f[E], v, x, I, B);
  }, F = (f) => {
    if (f.shapeFlag & 6) return F(f.component.subTree);
    if (f.shapeFlag & 128) return f.suspense.next();
    const v = w(f.anchor || f.el), x = v && v[Co];
    return x ? w(x) : v;
  };
  let se = !1;
  const Te = (f, v, x) => {
    let I;
    f == null ? v._vnode && (Le(v._vnode, null, null, !0), I = v._vnode.component) : P(v._vnode || null, f, v, null, null, null, x), v._vnode = f, se || (se = !0, ai(I), $l(), se = !1);
  }, st = {
    p: P,
    um: Le,
    m: ft,
    r: Re,
    mt: j,
    mc: $,
    pc: pe,
    pbc: G,
    n: F,
    o: e
  };
  let Xt, g;
  return t && ([Xt, g] = t(st)), {
    render: Te,
    hydrate: Xt,
    createApp: Yo(Te, Xt)
  };
}
function es({ type: e, props: t }, a) {
  return a === "svg" && e === "foreignObject" || a === "mathml" && e === "annotation-xml" && t && t.encoding && t.encoding.includes("html") ? void 0 : a;
}
function Qt({ effect: e, job: t }, a) {
  a ? (e.flags |= 32, t.flags |= 4) : (e.flags &= -33, t.flags &= -5);
}
function cu(e, t) {
  return (!e || e && !e.pendingBranch) && t && !t.persisted;
}
function Zl(e, t, a = !1) {
  const n = e.children, s = t.children;
  if (ne(n) && ne(s)) for (let l = 0; l < n.length; l++) {
    const o = n[l];
    let r = s[l];
    r.shapeFlag & 1 && !r.dynamicChildren && ((r.patchFlag <= 0 || r.patchFlag === 32) && (r = s[l] = Et(s[l]), r.el = o.el), !a && r.patchFlag !== -2 && Zl(o, r)), r.type === Hn && (r.patchFlag === -1 && (r = s[l] = Et(r)), r.el = o.el), r.type === He && !r.el && (r.el = o.el);
  }
}
function fu(e) {
  const t = e.slice(), a = [0];
  let n, s, l, o, r;
  const u = e.length;
  for (n = 0; n < u; n++) {
    const c = e[n];
    if (c !== 0) {
      if (s = a[a.length - 1], e[s] < c) {
        t[n] = s, a.push(n);
        continue;
      }
      for (l = 0, o = a.length - 1; l < o; )
        r = l + o >> 1, e[a[r]] < c ? l = r + 1 : o = r;
      c < e[a[l]] && (l > 0 && (t[n] = a[l - 1]), a[l] = n);
    }
  }
  for (l = a.length, o = a[l - 1]; l-- > 0; )
    a[l] = o, o = t[o];
  return a;
}
function er(e) {
  const t = e.subTree.component;
  if (t) return t.asyncDep && !t.asyncResolved ? t : er(t);
}
function vi(e) {
  if (e) for (let t = 0; t < e.length; t++) e[t].flags |= 8;
}
function tr(e) {
  if (e.placeholder) return e.placeholder;
  const t = e.component;
  return t ? tr(t.subTree) : null;
}
var ar = (e) => e.__isSuspense;
function vu(e, t) {
  t && t.pendingBranch ? ne(e) ? t.effects.push(...e) : t.effects.push(e) : wo(e);
}
var te = /* @__PURE__ */ Symbol.for("v-fgt"), Hn = /* @__PURE__ */ Symbol.for("v-txt"), He = /* @__PURE__ */ Symbol.for("v-cmt"), hn = /* @__PURE__ */ Symbol.for("v-stc"), Ha = [], et = null;
function p(e = !1) {
  Ha.push(et = e ? null : []);
}
function pu() {
  Ha.pop(), et = Ha[Ha.length - 1] || null;
}
var Wa = 1;
function An(e, t = !1) {
  Wa += e, e < 0 && et && t && (et.hasOnce = !0);
}
function nr(e) {
  return e.dynamicChildren = Wa > 0 ? et || fa : null, pu(), Wa > 0 && et && et.push(e), e;
}
function b(e, t, a, n, s, l) {
  return nr(i(e, t, a, n, s, l, !0));
}
function be(e, t, a, n, s) {
  return nr(Ce(e, t, a, n, s, !0));
}
function Ya(e) {
  return e ? e.__v_isVNode === !0 : !1;
}
function aa(e, t) {
  return e.type === t.type && e.key === t.key;
}
var sr = ({ key: e }) => e ?? null, yn = ({ ref: e, ref_key: t, ref_for: a }) => (typeof e == "number" && (e = "" + e), e != null ? Me(e) || /* @__PURE__ */ Ge(e) || le(e) ? {
  i: Be,
  r: e,
  k: t,
  f: !!a
} : e : null);
function i(e, t = null, a = null, n = 0, s = null, l = e === te ? 0 : 1, o = !1, r = !1) {
  const u = {
    __v_isVNode: !0,
    __v_skip: !0,
    type: e,
    props: t,
    key: t && sr(t),
    ref: t && yn(t),
    scopeId: Al,
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
    shapeFlag: l,
    patchFlag: n,
    dynamicProps: s,
    dynamicChildren: null,
    appContext: null,
    ctx: Be
  };
  return r ? (Ns(u, a), l & 128 && e.normalize(u)) : a && (u.shapeFlag |= Me(a) ? 8 : 16), Wa > 0 && !o && et && (u.patchFlag > 0 || l & 6) && u.patchFlag !== 32 && et.push(u), u;
}
var Ce = gu;
function gu(e, t = null, a = null, n = 0, s = null, l = !1) {
  if ((!e || e === ql) && (e = He), Ya(e)) {
    const r = Vt(e, t, !0);
    return a && Ns(r, a), Wa > 0 && !l && et && (r.shapeFlag & 6 ? et[et.indexOf(e)] = r : et.push(r)), r.patchFlag = -2, r;
  }
  if (Au(e) && (e = e.__vccOpts), t) {
    t = mu(t);
    let { class: r, style: u } = t;
    r && !Me(r) && (t.class = ae(r)), ke(u) && (/* @__PURE__ */ Os(u) && !ne(u) && (u = Ee({}, u)), t.style = _t(u));
  }
  const o = Me(e) ? 1 : ar(e) ? 128 : El(e) ? 64 : ke(e) ? 4 : le(e) ? 2 : 0;
  return i(e, t, a, n, s, o, l, !0);
}
function mu(e) {
  return e ? /* @__PURE__ */ Os(e) || Vl(e) ? Ee({}, e) : e : null;
}
function Vt(e, t, a = !1, n = !1) {
  const { props: s, ref: l, patchFlag: o, children: r, transition: u } = e, c = t ? hu(s || {}, t) : s, d = {
    __v_isVNode: !0,
    __v_skip: !0,
    type: e.type,
    props: c,
    key: c && sr(c),
    ref: t && t.ref ? a && l ? ne(l) ? l.concat(yn(t)) : [l, yn(t)] : yn(t) : l,
    scopeId: e.scopeId,
    slotScopeIds: e.slotScopeIds,
    children: r,
    target: e.target,
    targetStart: e.targetStart,
    targetAnchor: e.targetAnchor,
    staticCount: e.staticCount,
    shapeFlag: e.shapeFlag,
    patchFlag: t && e.type !== te ? o === -1 ? 16 : o | 16 : o,
    dynamicProps: e.dynamicProps,
    dynamicChildren: e.dynamicChildren,
    appContext: e.appContext,
    dirs: e.dirs,
    transition: u,
    component: e.component,
    suspense: e.suspense,
    ssContent: e.ssContent && Vt(e.ssContent),
    ssFallback: e.ssFallback && Vt(e.ssFallback),
    placeholder: e.placeholder,
    el: e.el,
    anchor: e.anchor,
    ctx: e.ctx,
    ce: e.ce
  };
  return u && n && Va(d, u.clone(d)), d;
}
function ve(e = " ", t = 0) {
  return Ce(Hn, null, e, t);
}
function bu(e, t) {
  const a = Ce(hn, null, e);
  return a.staticCount = t, a;
}
function H(e = "", t = !1) {
  return t ? (p(), be(He, null, e)) : Ce(He, null, e);
}
function wt(e) {
  return e == null || typeof e == "boolean" ? Ce(He) : ne(e) ? Ce(te, null, e.slice()) : Ya(e) ? Et(e) : Ce(Hn, null, String(e));
}
function Et(e) {
  return e.el === null && e.patchFlag !== -1 || e.memo ? e : Vt(e);
}
function Ns(e, t) {
  let a = 0;
  const { shapeFlag: n } = e;
  if (t == null) t = null;
  else if (ne(t)) a = 16;
  else if (typeof t == "object") if (n & 65) {
    const s = t.default;
    s && (s._c && (s._d = !1), Ns(e, s()), s._c && (s._d = !0));
    return;
  } else {
    a = 32;
    const s = t._;
    !s && !Vl(t) ? t._ctx = Be : s === 3 && Be && (Be.slots._ === 1 ? t._ = 1 : (t._ = 2, e.patchFlag |= 1024));
  }
  else le(t) ? (t = {
    default: t,
    _ctx: Be
  }, a = 32) : (t = String(t), n & 64 ? (a = 16, t = [ve(t)]) : a = 8);
  e.children = t, e.shapeFlag |= a;
}
function hu(...e) {
  const t = {};
  for (let a = 0; a < e.length; a++) {
    const n = e[a];
    for (const s in n) if (s === "class")
      t.class !== n.class && (t.class = ae([t.class, n.class]));
    else if (s === "style") t.style = _t([t.style, n.style]);
    else if (Pn(s)) {
      const l = t[s], o = n[s];
      o && l !== o && !(ne(l) && l.includes(o)) ? t[s] = l ? [].concat(l, o) : o : o == null && l == null && !On(s) && (t[s] = o);
    } else s !== "" && (t[s] = n[s]);
  }
  return t;
}
function mt(e, t, a, n = null) {
  dt(e, t, 7, [a, n]);
}
var yu = jl(), ku = 0;
function wu(e, t, a) {
  const n = e.type, s = (t ? t.appContext : e.appContext) || yu, l = {
    uid: ku++,
    vnode: e,
    type: n,
    parent: t,
    appContext: s,
    root: null,
    next: null,
    subTree: null,
    effect: null,
    update: null,
    job: null,
    scope: new Kr(!0),
    render: null,
    proxy: null,
    exposed: null,
    exposeProxy: null,
    withProxy: null,
    provides: t ? t.provides : Object.create(s.provides),
    ids: t ? t.ids : [
      "",
      0,
      0
    ],
    accessCache: null,
    renderCache: [],
    components: null,
    directives: null,
    propsOptions: Yl(n, s),
    emitsOptions: Hl(n, s),
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
  return l.ctx = { _: l }, l.root = t ? t.root : l, l.emit = Jo.bind(null, l), e.ce && e.ce(l), l;
}
var Ke = null, ir = () => Ke || Be, Mn, ys;
{
  const e = Bn(), t = (a, n) => {
    let s;
    return (s = e[a]) || (s = e[a] = []), s.push(n), (l) => {
      s.length > 1 ? s.forEach((o) => o(l)) : s[0](l);
    };
  };
  Mn = t("__VUE_INSTANCE_SETTERS__", (a) => Ke = a), ys = t("__VUE_SSR_SETTERS__", (a) => Xa = a);
}
var sn = (e) => {
  const t = Ke;
  return Mn(e), e.scope.on(), () => {
    e.scope.off(), Mn(t);
  };
}, pi = () => {
  Ke && Ke.scope.off(), Mn(null);
};
function lr(e) {
  return e.vnode.shapeFlag & 4;
}
var Xa = !1;
function xu(e, t = !1, a = !1) {
  t && ys(t);
  const { props: n, children: s } = e.vnode, l = lr(e);
  nu(e, n, l, t), ru(e, s, a || t);
  const o = l ? Su(e, t) : void 0;
  return t && ys(!1), o;
}
function Su(e, t) {
  const a = e.type;
  e.accessCache = /* @__PURE__ */ Object.create(null), e.proxy = new Proxy(e.ctx, jo);
  const { setup: n } = a;
  if (n) {
    Lt();
    const s = e.setupContext = n.length > 1 ? $u(e) : null, l = sn(e), o = an(n, e, 0, [e.props, s]), r = el(o);
    if (Rt(), l(), (r || e.sp) && !ga(e) && Dl(e), r) {
      if (o.then(pi, pi), t) return o.then((u) => {
        gi(e, u, t);
      }).catch((u) => {
        qn(u, e, 0);
      });
      e.asyncDep = o;
    } else gi(e, o, t);
  } else rr(e, t);
}
function gi(e, t, a) {
  le(t) ? e.type.__ssrInlineRender ? e.ssrRender = t : e.render = t : ke(t) && (e.setupState = xl(t)), rr(e, a);
}
var mi, bi;
function rr(e, t, a) {
  const n = e.type;
  if (!e.render) {
    if (!t && mi && !n.render) {
      const s = n.template || Rs(e).template;
      if (s) {
        const { isCustomElement: l, compilerOptions: o } = e.appContext.config, { delimiters: r, compilerOptions: u } = n, c = Ee(Ee({
          isCustomElement: l,
          delimiters: r
        }, o), u);
        n.render = mi(s, c);
      }
    }
    e.render = n.render || St, bi && bi(e);
  }
  {
    const s = sn(e);
    Lt();
    try {
      Ho(e);
    } finally {
      Rt(), s();
    }
  }
}
var _u = { get(e, t) {
  return je(e, "get", ""), e[t];
} };
function $u(e) {
  const t = (a) => {
    e.exposed = a || {};
  };
  return {
    attrs: new Proxy(e.attrs, _u),
    slots: e.slots,
    emit: e.emit,
    expose: t
  };
}
function Kn(e) {
  return e.exposed ? e.exposeProxy || (e.exposeProxy = new Proxy(xl(co(e.exposed)), {
    get(t, a) {
      if (a in t) return t[a];
      if (a in ja) return ja[a](e);
    },
    has(t, a) {
      return a in t || a in ja;
    }
  })) : e.proxy;
}
function Cu(e, t = !0) {
  return le(e) ? e.displayName || e.name : e.name || t && e.__name;
}
function Au(e) {
  return le(e) && "__vccOpts" in e;
}
var z = (e, t) => /* @__PURE__ */ mo(e, t, Xa);
function Mu(e, t, a) {
  try {
    An(-1);
    const n = arguments.length;
    return n === 2 ? ke(t) && !ne(t) ? Ya(t) ? Ce(e, null, [t]) : Ce(e, t) : Ce(e, null, t) : (n > 3 ? a = Array.prototype.slice.call(arguments, 2) : n === 3 && Ya(a) && (a = [a]), Ce(e, t, a));
  } finally {
    An(1);
  }
}
var Tu = "3.5.35", ks = void 0, hi = typeof window < "u" && window.trustedTypes;
if (hi) try {
  ks = /* @__PURE__ */ hi.createPolicy("vue", { createHTML: (e) => e });
} catch {
}
var or = ks ? (e) => ks.createHTML(e) : (e) => e, Eu = "http://www.w3.org/2000/svg", Iu = "http://www.w3.org/1998/Math/MathML", Mt = typeof document < "u" ? document : null, yi = Mt && /* @__PURE__ */ Mt.createElement("template"), Pu = {
  insert: (e, t, a) => {
    t.insertBefore(e, a || null);
  },
  remove: (e) => {
    const t = e.parentNode;
    t && t.removeChild(e);
  },
  createElement: (e, t, a, n) => {
    const s = t === "svg" ? Mt.createElementNS(Eu, e) : t === "mathml" ? Mt.createElementNS(Iu, e) : a ? Mt.createElement(e, { is: a }) : Mt.createElement(e);
    return e === "select" && n && n.multiple != null && s.setAttribute("multiple", n.multiple), s;
  },
  createText: (e) => Mt.createTextNode(e),
  createComment: (e) => Mt.createComment(e),
  setText: (e, t) => {
    e.nodeValue = t;
  },
  setElementText: (e, t) => {
    e.textContent = t;
  },
  parentNode: (e) => e.parentNode,
  nextSibling: (e) => e.nextSibling,
  querySelector: (e) => Mt.querySelector(e),
  setScopeId(e, t) {
    e.setAttribute(t, "");
  },
  insertStaticContent(e, t, a, n, s, l) {
    const o = a ? a.previousSibling : t.lastChild;
    if (s && (s === l || s.nextSibling)) for (; t.insertBefore(s.cloneNode(!0), a), !(s === l || !(s = s.nextSibling)); )
      ;
    else {
      yi.innerHTML = or(n === "svg" ? `<svg>${e}</svg>` : n === "mathml" ? `<math>${e}</math>` : e);
      const r = yi.content;
      if (n === "svg" || n === "mathml") {
        const u = r.firstChild;
        for (; u.firstChild; ) r.appendChild(u.firstChild);
        r.removeChild(u);
      }
      t.insertBefore(r, a);
    }
    return [o ? o.nextSibling : t.firstChild, a ? a.previousSibling : t.lastChild];
  }
}, jt = "transition", Ea = "animation", Ja = /* @__PURE__ */ Symbol("_vtc"), ur = {
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
}, Ou = /* @__PURE__ */ Ee({}, Il, ur), Lu = (e) => (e.displayName = "Transition", e.props = Ou, e), dr = /* @__PURE__ */ Lu((e, { slots: t }) => Mu(To, Ru(e), t)), Zt = (e, t = []) => {
  ne(e) ? e.forEach((a) => a(...t)) : e && e(...t);
}, ki = (e) => e ? ne(e) ? e.some((t) => t.length > 1) : e.length > 1 : !1;
function Ru(e) {
  const t = {};
  for (const X in e) X in ur || (t[X] = e[X]);
  if (e.css === !1) return t;
  const { name: a = "v", type: n, duration: s, enterFromClass: l = `${a}-enter-from`, enterActiveClass: o = `${a}-enter-active`, enterToClass: r = `${a}-enter-to`, appearFromClass: u = l, appearActiveClass: c = o, appearToClass: d = r, leaveFromClass: y = `${a}-leave-from`, leaveActiveClass: w = `${a}-leave-active`, leaveToClass: m = `${a}-leave-to` } = e, A = Du(s), P = A && A[0], R = A && A[1], { onBeforeEnter: q, onEnter: U, onEnterCancelled: L, onLeave: M, onLeaveCancelled: _, onBeforeAppear: T = q, onAppear: S = U, onAppearCancelled: $ = L } = t, C = (X, J, j, ue) => {
    X._enterCancelled = ue, ea(X, J ? d : r), ea(X, J ? c : o), j && j();
  }, G = (X, J) => {
    X._isLeaving = !1, ea(X, y), ea(X, m), ea(X, w), J && J();
  }, Z = (X) => (J, j) => {
    const ue = X ? S : U, he = () => C(J, X, j);
    Zt(ue, [J, he]), wi(() => {
      ea(J, X ? u : l), At(J, X ? d : r), ki(ue) || xi(J, n, P, he);
    });
  };
  return Ee(t, {
    onBeforeEnter(X) {
      Zt(q, [X]), At(X, l), At(X, o);
    },
    onBeforeAppear(X) {
      Zt(T, [X]), At(X, u), At(X, c);
    },
    onEnter: Z(!1),
    onAppear: Z(!0),
    onLeave(X, J) {
      X._isLeaving = !0;
      const j = () => G(X, J);
      At(X, y), X._enterCancelled ? (At(X, w), $i(X)) : ($i(X), At(X, w)), wi(() => {
        X._isLeaving && (ea(X, y), At(X, m), ki(M) || xi(X, n, R, j));
      }), Zt(M, [X, j]);
    },
    onEnterCancelled(X) {
      C(X, !1, void 0, !0), Zt(L, [X]);
    },
    onAppearCancelled(X) {
      C(X, !0, void 0, !0), Zt($, [X]);
    },
    onLeaveCancelled(X) {
      G(X), Zt(_, [X]);
    }
  });
}
function Du(e) {
  if (e == null) return null;
  if (ke(e)) return [ts(e.enter), ts(e.leave)];
  {
    const t = ts(e);
    return [t, t];
  }
}
function ts(e) {
  return Br(e);
}
function At(e, t) {
  t.split(/\s+/).forEach((a) => a && e.classList.add(a)), (e[Ja] || (e[Ja] = /* @__PURE__ */ new Set())).add(t);
}
function ea(e, t) {
  t.split(/\s+/).forEach((n) => n && e.classList.remove(n));
  const a = e[Ja];
  a && (a.delete(t), a.size || (e[Ja] = void 0));
}
function wi(e) {
  requestAnimationFrame(() => {
    requestAnimationFrame(e);
  });
}
var Bu = 0;
function xi(e, t, a, n) {
  const s = e._endId = ++Bu, l = () => {
    s === e._endId && n();
  };
  if (a != null) return setTimeout(l, a);
  const { type: o, timeout: r, propCount: u } = Nu(e, t);
  if (!o) return n();
  const c = o + "end";
  let d = 0;
  const y = () => {
    e.removeEventListener(c, w), l();
  }, w = (m) => {
    m.target === e && ++d >= u && y();
  };
  setTimeout(() => {
    d < u && y();
  }, r + 1), e.addEventListener(c, w);
}
function Nu(e, t) {
  const a = window.getComputedStyle(e), n = (A) => (a[A] || "").split(", "), s = n(`${jt}Delay`), l = n(`${jt}Duration`), o = Si(s, l), r = n(`${Ea}Delay`), u = n(`${Ea}Duration`), c = Si(r, u);
  let d = null, y = 0, w = 0;
  t === jt ? o > 0 && (d = jt, y = o, w = l.length) : t === Ea ? c > 0 && (d = Ea, y = c, w = u.length) : (y = Math.max(o, c), d = y > 0 ? o > c ? jt : Ea : null, w = d ? d === jt ? l.length : u.length : 0);
  const m = d === jt && /\b(?:transform|all)(?:,|$)/.test(n(`${jt}Property`).toString());
  return {
    type: d,
    timeout: y,
    propCount: w,
    hasTransform: m
  };
}
function Si(e, t) {
  for (; e.length < t.length; ) e = e.concat(e);
  return Math.max(...t.map((a, n) => _i(a) + _i(e[n])));
}
function _i(e) {
  return e === "auto" ? 0 : Number(e.slice(0, -1).replace(",", ".")) * 1e3;
}
function $i(e) {
  return (e ? e.ownerDocument : document).body.offsetHeight;
}
function qu(e, t, a) {
  const n = e[Ja];
  n && (t = (t ? [t, ...n] : [...n]).join(" ")), t == null ? e.removeAttribute("class") : a ? e.setAttribute("class", t) : e.className = t;
}
var Tn = /* @__PURE__ */ Symbol("_vod"), cr = /* @__PURE__ */ Symbol("_vsh"), Uu = {
  name: "show",
  beforeMount(e, { value: t }, { transition: a }) {
    e[Tn] = e.style.display === "none" ? "" : e.style.display, a && t ? a.beforeEnter(e) : Ia(e, t);
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
  e.style.display = t ? e[Tn] : "none", e[cr] = !t;
}
var Fu = /* @__PURE__ */ Symbol(""), ju = /(?:^|;)\s*display\s*:/;
function Hu(e, t, a) {
  const n = e.style, s = Me(a);
  let l = !1;
  if (a && !s) {
    if (t) if (Me(t))
      for (const o of t.split(";")) {
        const r = o.slice(0, o.indexOf(":")).trim();
        a[r] == null && Da(n, r, "");
      }
    else for (const o in t) a[o] == null && Da(n, o, "");
    for (const o in a) {
      o === "display" && (l = !0);
      const r = a[o];
      r != null ? Gu(e, o, !Me(t) && t ? t[o] : void 0, r) || Da(n, o, r) : Da(n, o, "");
    }
  } else if (s) {
    if (t !== a) {
      const o = n[Fu];
      o && (a += ";" + o), n.cssText = a, l = ju.test(a);
    }
  } else t && e.removeAttribute("style");
  Tn in e && (e[Tn] = l ? n.display : "", e[cr] && (n.display = "none"));
}
var Ci = /\s*!important$/;
function Da(e, t, a) {
  if (ne(a)) a.forEach((n) => Da(e, t, n));
  else if (a == null && (a = ""), t.startsWith("--")) e.setProperty(t, a);
  else {
    const n = Ku(e, t);
    Ci.test(a) ? e.setProperty(Wt(n), a.replace(Ci, ""), "important") : e[n] = a;
  }
}
var Ai = [
  "Webkit",
  "Moz",
  "ms"
], as = {};
function Ku(e, t) {
  const a = as[t];
  if (a) return a;
  let n = Ye(t);
  if (n !== "filter" && n in e) return as[t] = n;
  n = Rn(n);
  for (let s = 0; s < Ai.length; s++) {
    const l = Ai[s] + n;
    if (l in e) return as[t] = l;
  }
  return t;
}
function Gu(e, t, a, n) {
  return e.tagName === "TEXTAREA" && (t === "width" || t === "height") && Me(n) && a === n;
}
var Mi = "http://www.w3.org/1999/xlink";
function Ti(e, t, a, n, s, l = jr(t)) {
  n && t.startsWith("xlink:") ? a == null ? e.removeAttributeNS(Mi, t.slice(6, t.length)) : e.setAttributeNS(Mi, t, a) : a == null || l && !il(a) ? e.removeAttribute(t) : e.setAttribute(t, l ? "" : pt(a) ? String(a) : a);
}
function Ei(e, t, a, n, s) {
  if (t === "innerHTML" || t === "textContent") {
    a != null && (e[t] = t === "innerHTML" ? or(a) : a);
    return;
  }
  const l = e.tagName;
  if (t === "value" && l !== "PROGRESS" && !l.includes("-")) {
    const r = l === "OPTION" ? e.getAttribute("value") || "" : e.value, u = a == null ? e.type === "checkbox" ? "on" : "" : String(a);
    (r !== u || !("_value" in e)) && (e.value = u), a == null && e.removeAttribute(t), e._value = a;
    return;
  }
  let o = !1;
  if (a === "" || a == null) {
    const r = typeof e[t];
    r === "boolean" ? a = il(a) : a == null && r === "string" ? (a = "", o = !0) : r === "number" && (a = 0, o = !0);
  }
  try {
    e[t] = a;
  } catch {
  }
  o && e.removeAttribute(s || t);
}
function Gt(e, t, a, n) {
  e.addEventListener(t, a, n);
}
function zu(e, t, a, n) {
  e.removeEventListener(t, a, n);
}
var Ii = /* @__PURE__ */ Symbol("_vei");
function Vu(e, t, a, n, s = null) {
  const l = e[Ii] || (e[Ii] = {}), o = l[t];
  if (n && o) o.value = n;
  else {
    const [r, u] = Wu(t);
    n ? Gt(e, r, l[t] = Ju(n, s), u) : o && (zu(e, r, o, u), l[t] = void 0);
  }
}
var Pi = /(?:Once|Passive|Capture)$/;
function Wu(e) {
  let t;
  if (Pi.test(e)) {
    t = {};
    let a;
    for (; a = e.match(Pi); )
      e = e.slice(0, e.length - a[0].length), t[a[0].toLowerCase()] = !0;
  }
  return [e[2] === ":" ? e.slice(3) : Wt(e.slice(2)), t];
}
var ns = 0, Yu = /* @__PURE__ */ Promise.resolve(), Xu = () => ns || (Yu.then(() => ns = 0), ns = Date.now());
function Ju(e, t) {
  const a = (n) => {
    if (!n._vts) n._vts = Date.now();
    else if (n._vts <= a.attached) return;
    const s = a.value;
    if (ne(s)) {
      const l = n.stopImmediatePropagation;
      n.stopImmediatePropagation = () => {
        l.call(n), n._stopped = !0;
      };
      const o = s.slice(), r = [n];
      for (let u = 0; u < o.length && !n._stopped; u++) {
        const c = o[u];
        c && dt(c, t, 5, r);
      }
    } else dt(s, t, 5, [n]);
  };
  return a.value = e, a.attached = Xu(), a;
}
var Oi = (e) => e.charCodeAt(0) === 111 && e.charCodeAt(1) === 110 && e.charCodeAt(2) > 96 && e.charCodeAt(2) < 123, Qu = (e, t, a, n, s, l) => {
  const o = s === "svg";
  t === "class" ? qu(e, n, o) : t === "style" ? Hu(e, a, n) : Pn(t) ? On(t) || Vu(e, t, a, n, l) : (t[0] === "." ? (t = t.slice(1), !0) : t[0] === "^" ? (t = t.slice(1), !1) : Zu(e, t, n, o)) ? (Ei(e, t, n), !e.tagName.includes("-") && (t === "value" || t === "checked" || t === "selected") && Ti(e, t, n, o, l, t !== "value")) : e._isVueCE && (ed(e, t) || e._def.__asyncLoader && (/[A-Z]/.test(t) || !Me(n))) ? Ei(e, Ye(t), n, l, t) : (t === "true-value" ? e._trueValue = n : t === "false-value" && (e._falseValue = n), Ti(e, t, n, o));
};
function Zu(e, t, a, n) {
  if (n)
    return !!(t === "innerHTML" || t === "textContent" || t in e && Oi(t) && le(a));
  if (t === "spellcheck" || t === "draggable" || t === "translate" || t === "autocorrect" || t === "sandbox" && e.tagName === "IFRAME" || t === "form" || t === "list" && e.tagName === "INPUT" || t === "type" && e.tagName === "TEXTAREA") return !1;
  if (t === "width" || t === "height") {
    const s = e.tagName;
    if (s === "IMG" || s === "VIDEO" || s === "CANVAS" || s === "SOURCE") return !1;
  }
  return Oi(t) && Me(a) ? !1 : t in e;
}
function ed(e, t) {
  const a = e._def.props;
  if (!a) return !1;
  const n = Ye(t);
  return Array.isArray(a) ? a.some((s) => Ye(s) === n) : Object.keys(a).some((s) => Ye(s) === n);
}
var ha = (e) => {
  const t = e.props["onUpdate:modelValue"] || !1;
  return ne(t) ? (a) => mn(t, a) : t;
};
function td(e) {
  e.target.composing = !0;
}
function Li(e) {
  const t = e.target;
  t.composing && (t.composing = !1, t.dispatchEvent(new Event("input")));
}
var Ot = /* @__PURE__ */ Symbol("_assign");
function Ri(e, t, a) {
  return t && (e = e.trim()), a && (e = Dn(e)), e;
}
var tt = {
  created(e, { modifiers: { lazy: t, trim: a, number: n } }, s) {
    e[Ot] = ha(s);
    const l = n || s.props && s.props.type === "number";
    Gt(e, t ? "change" : "input", (o) => {
      o.target.composing || e[Ot](Ri(e.value, a, l));
    }), (a || l) && Gt(e, "change", () => {
      e.value = Ri(e.value, a, l);
    }), t || (Gt(e, "compositionstart", td), Gt(e, "compositionend", Li), Gt(e, "change", Li));
  },
  mounted(e, { value: t }) {
    e.value = t ?? "";
  },
  beforeUpdate(e, { value: t, oldValue: a, modifiers: { lazy: n, trim: s, number: l } }, o) {
    if (e[Ot] = ha(o), e.composing) return;
    const r = (l || e.type === "number") && !/^0\d/.test(e.value) ? Dn(e.value) : e.value, u = t ?? "";
    if (r === u) return;
    const c = e.getRootNode();
    (c instanceof Document || c instanceof ShadowRoot) && c.activeElement === e && e.type !== "range" && (n && t === a || s && e.value.trim() === u) || (e.value = u);
  }
}, Pa = {
  deep: !0,
  created(e, t, a) {
    e[Ot] = ha(a), Gt(e, "change", () => {
      const n = e._modelValue, s = Qa(e), l = e.checked, o = e[Ot];
      if (ne(n)) {
        const r = Cs(n, s), u = r !== -1;
        if (l && !u) o(n.concat(s));
        else if (!l && u) {
          const c = [...n];
          c.splice(r, 1), o(c);
        }
      } else if (xa(n)) {
        const r = new Set(n);
        l ? r.add(s) : r.delete(s), o(r);
      } else o(fr(e, l));
    });
  },
  mounted: Di,
  beforeUpdate(e, t, a) {
    e[Ot] = ha(a), Di(e, t, a);
  }
};
function Di(e, { value: t, oldValue: a }, n) {
  e._modelValue = t;
  let s;
  if (ne(t)) s = Cs(t, n.props.value) > -1;
  else if (xa(t)) s = t.has(n.props.value);
  else {
    if (t === a) return;
    s = Sa(t, fr(e, !0));
  }
  e.checked !== s && (e.checked = s);
}
var ad = {
  deep: !0,
  created(e, { value: t, modifiers: { number: a } }, n) {
    const s = xa(t);
    Gt(e, "change", () => {
      const l = Array.prototype.filter.call(e.options, (o) => o.selected).map((o) => a ? Dn(Qa(o)) : Qa(o));
      e[Ot](e.multiple ? s ? new Set(l) : l : l[0]), e._assigning = !0, nn(() => {
        e._assigning = !1;
      });
    }), e[Ot] = ha(n);
  },
  mounted(e, { value: t }) {
    Bi(e, t);
  },
  beforeUpdate(e, t, a) {
    e[Ot] = ha(a);
  },
  updated(e, { value: t }) {
    e._assigning || Bi(e, t);
  }
};
function Bi(e, t) {
  const a = e.multiple, n = ne(t);
  if (!(a && !n && !xa(t))) {
    for (let s = 0, l = e.options.length; s < l; s++) {
      const o = e.options[s], r = Qa(o);
      if (a) if (n) {
        const u = typeof r;
        u === "string" || u === "number" ? o.selected = t.some((c) => String(c) === String(r)) : o.selected = Cs(t, r) > -1;
      } else o.selected = t.has(r);
      else if (Sa(Qa(o), t)) {
        e.selectedIndex !== s && (e.selectedIndex = s);
        return;
      }
    }
    !a && e.selectedIndex !== -1 && (e.selectedIndex = -1);
  }
}
function Qa(e) {
  return "_value" in e ? e._value : e.value;
}
function fr(e, t) {
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
}, ut = (e, t) => {
  if (!e) return e;
  const a = e._withMods || (e._withMods = {}), n = t.join(".");
  return a[n] || (a[n] = ((s, ...l) => {
    for (let o = 0; o < t.length; o++) {
      const r = sd[t[o]];
      if (r && r(s, t)) return;
    }
    return e(s, ...l);
  }));
}, id = {
  esc: "escape",
  space: " ",
  up: "arrow-up",
  left: "arrow-left",
  right: "arrow-right",
  down: "arrow-down",
  delete: "backspace"
}, vr = (e, t) => {
  const a = e._withKeys || (e._withKeys = {}), n = t.join(".");
  return a[n] || (a[n] = ((s) => {
    if (!("key" in s)) return;
    const l = Wt(s.key);
    if (t.some((o) => o === l || id[o] === l)) return e(s);
  }));
}, ld = /* @__PURE__ */ Ee({ patchProp: Qu }, Pu), Ni;
function rd() {
  return Ni || (Ni = uu(ld));
}
var od = ((...e) => {
  const t = rd().createApp(...e), { mount: a } = t;
  return t.mount = (n) => {
    const s = dd(n);
    if (!s) return;
    const l = t._component;
    !le(l) && !l.render && !l.template && (l.template = s.innerHTML), s.nodeType === 1 && (s.textContent = "");
    const o = a(s, !1, ud(s));
    return s instanceof Element && (s.removeAttribute("v-cloak"), s.setAttribute("data-v-app", "")), o;
  }, t;
});
function ud(e) {
  if (e instanceof SVGElement) return "svg";
  if (typeof MathMLElement == "function" && e instanceof MathMLElement) return "mathml";
}
function dd(e) {
  return Me(e) ? document.querySelector(e) : e;
}
var cd = Object.freeze({
  id: "agent-api",
  name: "Agent API",
  accent: "#63d8c6"
}), fd = "https://api.tavily.com";
function vd(e = "") {
  return String(e || "").trim();
}
function yt(e = "") {
  return String(e || "").trim().replace(/\/+$/, "") || "https://api.tavily.com";
}
var R0 = Object.freeze([
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
function gd(e) {
  return String(e ?? "").trim().toLowerCase() || void 0;
}
function md(e) {
  if (e == null || e === "") return;
  const t = Number(e);
  return Number.isFinite(t) ? Math.floor(t) : void 0;
}
function ya(e = {}) {
  const t = e && typeof e == "object" ? e : {}, a = gd(t.effort), n = md(t.budgetTokens);
  return {
    mode: pd(t.mode),
    ...a ? { effort: a } : {},
    ...n !== void 0 ? { budgetTokens: n } : {}
  };
}
var pr = "openai-compatible", qs = "默认", gr = "default", bd = "deny", Tt = 32e3, hd = Object.freeze([{
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
}]), ws = {
  "openai-responses": {
    baseUrl: "https://api.openai.com/v1",
    model: "gpt-4.1-mini",
    apiKey: "",
    temperature: 1,
    maxTokens: Tt,
    sendTemperature: !0
  },
  "openai-compatible": {
    baseUrl: "https://api.openai.com/v1",
    model: "gpt-4o-mini",
    apiKey: "",
    temperature: 1,
    maxTokens: Tt,
    sendTemperature: !0,
    toolMode: "native"
  },
  "sillytavern-openai-compatible": {
    baseUrl: "",
    model: "gpt-4o-mini",
    apiKey: "",
    temperature: 1,
    maxTokens: Tt,
    sendTemperature: !0,
    toolMode: "native"
  },
  "sillytavern-claude": {
    baseUrl: "",
    model: "claude-sonnet-4-0",
    apiKey: "",
    temperature: 1,
    maxTokens: Tt,
    sendTemperature: !0
  },
  "sillytavern-google": {
    baseUrl: "",
    model: "gemini-2.5-pro",
    apiKey: "",
    temperature: 1,
    maxTokens: Tt,
    sendTemperature: !0
  },
  anthropic: {
    baseUrl: "https://api.anthropic.com",
    model: "claude-sonnet-4-0",
    apiKey: "",
    temperature: 1,
    maxTokens: Tt,
    sendTemperature: !0
  },
  google: {
    baseUrl: "https://generativelanguage.googleapis.com/v1beta",
    model: "gemini-2.5-pro",
    apiKey: "",
    temperature: 1,
    maxTokens: Tt,
    sendTemperature: !0
  }
};
function mr() {
  return JSON.parse(JSON.stringify(ws));
}
function Ze() {
  return {
    provider: pr,
    modelConfigs: mr(),
    permissionMode: gr
  };
}
function br(e = Ze()) {
  const t = e && typeof e == "object" ? e : Ze();
  return {
    provider: Us(t.provider),
    modelConfigs: Qe(t.modelConfigs || {})
  };
}
function ca(e) {
  return e === "full" ? "full" : gr;
}
function Ht(e) {
  return e === "allow" ? "allow" : bd;
}
function Fe(e, t = Tt) {
  const a = Number(e);
  if (!Number.isFinite(a) || a <= 0) {
    const n = Number(t);
    return Number.isFinite(n) && n > 0 ? Math.floor(n) : Tt;
  }
  return Math.min(Number.MAX_SAFE_INTEGER, Math.floor(a));
}
function Ie(e) {
  return String(e || "").trim() || "默认";
}
function Qe(e = {}) {
  const t = mr();
  return Object.keys(ws).forEach((a) => {
    const n = e && typeof e[a] == "object" ? e[a] : {}, s = ws[a];
    t[a] = {
      baseUrl: String(n.baseUrl ?? s.baseUrl ?? ""),
      model: String(n.model ?? s.model ?? ""),
      apiKey: String(n.apiKey ?? s.apiKey ?? ""),
      temperature: n.temperature ?? s.temperature,
      maxTokens: Fe(n.maxTokens, s.maxTokens),
      sendTemperature: typeof n.sendTemperature == "boolean" ? n.sendTemperature : s.sendTemperature,
      ..."toolMode" in s ? { toolMode: String(n.toolMode || s.toolMode || "native") } : {},
      reasoning: ya(n.reasoning)
    };
  }), t;
}
function Us(e) {
  return typeof e == "string" && e.trim() ? e : pr;
}
function Fs(e = {}, t) {
  return e && typeof e.presets == "object" && e.presets ? e.presets : e?.modelConfigs ? { [t]: {
    provider: e.provider || "openai-compatible",
    modelConfigs: e.modelConfigs,
    permissionMode: e.permissionMode
  } } : {};
}
function kd(e = {}, t) {
  const a = {}, n = Fs(e, t);
  return Object.entries(n).forEach(([s, l]) => {
    if (!l || typeof l != "object") return;
    const o = Ie(s);
    a[o] = {
      provider: Us(l.provider),
      modelConfigs: Qe(l.modelConfigs || {}),
      permissionMode: ca(l.permissionMode)
    };
  }), Object.keys(a).length || (a[qs] = Ze()), a;
}
function wd(e, t) {
  const a = Ie(t);
  return e[a] ? a : Object.keys(e)[0];
}
function xd(e, t, a) {
  const n = Ie(t || a);
  return e[n] ? n : e[a] ? a : Object.keys(e)[0];
}
function hr(e = {}, t = Ze()) {
  const a = br(t), n = e && typeof e == "object" ? e : {};
  return {
    provider: Us(n.provider || a.provider),
    modelConfigs: Qe(n.modelConfigs || a.modelConfigs)
  };
}
function Sd(e = {}, t = {}, a = qs, n = a) {
  if (e?.delegateConfigured === !1) return !1;
  if (n !== a) return !0;
  const s = e?.delegateConfig;
  if (!s || typeof s != "object" || Array.isArray(s) || !(typeof s.provider == "string" && s.provider.trim() || s.modelConfigs && typeof s.modelConfigs == "object" && Object.keys(s.modelConfigs).length)) return !1;
  if (e?.delegateConfigured === !0) return !0;
  const l = t[a] || Ze(), o = br(l), r = hr(s, l);
  return JSON.stringify(r) !== JSON.stringify(o);
}
function _d(e = {}, t, a, n, s) {
  const l = s(e?.[n]);
  if (l) return l;
  const o = Fs(e, t), r = [
    a,
    t,
    e?.currentPresetName,
    e?.delegatePresetName,
    ...Object.keys(o || {})
  ].map(Ie), u = /* @__PURE__ */ new Set();
  for (const c of r) {
    if (u.has(c)) continue;
    u.add(c);
    const d = s(o?.[c]?.[n]);
    if (d) return d;
  }
  return s(e?.delegateConfig?.[n]);
}
function $d(e = {}, t, a) {
  const n = (r) => String(r || "").trim();
  if (n(e?.tavilyBaseUrl)) return yt(e.tavilyBaseUrl);
  const s = Fs(e, t), l = [
    a,
    t,
    e?.currentPresetName,
    e?.delegatePresetName,
    ...Object.keys(s || {})
  ].map(Ie), o = /* @__PURE__ */ new Set();
  for (const r of l) {
    if (o.has(r)) continue;
    o.add(r);
    const u = s?.[r]?.tavilyBaseUrl;
    if (n(u)) return yt(u);
  }
  return n(e?.delegateConfig?.tavilyBaseUrl) ? yt(e.delegateConfig.tavilyBaseUrl) : fd;
}
function Cd(e = {}, t, a) {
  return {
    tavilyApiKey: _d(e, t, a, "tavilyApiKey", vd),
    tavilyBaseUrl: $d(e, t, a)
  };
}
function En(e = {}) {
  const t = Ie(e.currentPresetName || e.presetDraftName || "默认"), a = kd(e, t), n = wd(a, e.currentPresetName), s = xd(a, e.delegatePresetName, n), l = a[n] || Ze(), o = a[s] || l, r = hr(e.delegateConfig, o), u = Sd(e, a, n, s), c = Cd(e, t, n);
  return {
    workspaceFileName: String(e.workspaceFileName || ""),
    updatedAt: Number(e.updatedAt) || 0,
    jsApiPermission: Ht(e.jsApiPermission),
    currentPresetName: n,
    delegatePresetName: s,
    delegateConfig: r,
    delegateConfigured: u,
    presetDraftName: Ie(e.presetDraftName || n),
    presetNames: Object.keys(a),
    presets: a,
    provider: l.provider,
    modelConfigs: l.modelConfigs,
    permissionMode: ca(l.permissionMode),
    tavilyApiKey: c.tavilyApiKey,
    tavilyBaseUrl: c.tavilyBaseUrl
  };
}
async function Ad(e, t) {
  const a = e.body?.getReader?.();
  if (!a) throw new Error("host_chat_completions_stream_missing_body");
  const n = new TextDecoder();
  let s = "";
  const l = /\r?\n\r?\n/, o = (u) => {
    const c = u.split(/\r?\n/).filter((d) => d.startsWith("data:")).map((d) => d.slice(5).trimStart()).join(`
`).trim();
    !c || c === "[DONE]" || t(JSON.parse(c));
  };
  for (; ; ) {
    const { done: u, value: c } = await a.read();
    if (u) break;
    for (s += n.decode(c, { stream: !0 }); ; ) {
      const d = s.match(l);
      if (!d || typeof d.index != "number") break;
      const y = s.slice(0, d.index);
      s = s.slice(d.index + d[0].length), o(y);
    }
  }
  const r = s.trim();
  r && o(r);
}
function Md(e = "") {
  return String(e || "").trim().toLowerCase();
}
function Td(e = "") {
  const t = Md(e);
  return t.includes("deepseek") ? "deepseek" : t.includes("kimi") || t.includes("moonshot") ? "kimi" : t.includes("gemini") ? "gemini" : t.includes("claude") ? "claude" : /(?:^|[/_.-])gpt(?:\d|[/_.-]|$)/.test(t) || /(?:^|[/_.-])o\d+(?:[/_.-]|$)/.test(t) ? "openai" : "";
}
var $a = "openai", yr = "claude", kr = "makersuite", Ed = "/api/backends/chat-completions/status", Id = "/api/backends/chat-completions/generate", wr = Object.freeze({
  [yr]: "https://api.anthropic.com/v1",
  [kr]: "https://generativelanguage.googleapis.com"
}), ln = null;
function Pd(e) {
  return String(e || "").trim().replace(/\/+$/, "");
}
function Od(e, t) {
  const a = Pd(e);
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
async function js(e = {}, t = !1, a = ln) {
  const n = await xr(a), s = {
    url: Id,
    method: "POST",
    headers: Ld(n),
    body: {
      ...e,
      stream: !!t
    }
  };
  return Object.defineProperty(s, "rawHeaders", {
    value: n,
    enumerable: !1
  }), s;
}
async function Rd(e = {}, t = !1) {
  return await js(e, t);
}
function Dd(e = "") {
  return /^\s*(?:<!DOCTYPE\s+html\b|<html\b)/i.test(String(e || ""));
}
function Bd(e = "") {
  return /invalid csrf token/i.test(String(e || ""));
}
function Nd() {
  return "酒馆当前页面的 CSRF token 已失效，请按 F5 刷新并重新进入酒馆后再试。";
}
function qi(e = "", t = 10) {
  const a = Number.parseInt(String(e || ""), t);
  return Number.isInteger(a) && a >= 0 && a <= 1114111 ? String.fromCodePoint(a) : "";
}
function Ui(e = "") {
  return String(e || "").replace(/&nbsp;|&#160;/gi, " ").replace(/&amp;/gi, "&").replace(/&lt;/gi, "<").replace(/&gt;/gi, ">").replace(/&quot;/gi, '"').replace(/&#39;|&apos;/gi, "'").replace(/&#x([0-9a-f]+);?/gi, (t, a) => qi(a, 16)).replace(/&#([0-9]+);?/g, (t, a) => qi(a));
}
function qd(e = "") {
  const t = String(e || ""), a = Ui((t.match(/<title\b[^>]*>([\s\S]*?)<\/title>/i) || [])[1] || "").replace(/\s+/g, " ").trim(), n = Ui(t.replace(/<script\b[\s\S]*?<\/script>/gi, " ").replace(/<style\b[\s\S]*?<\/style>/gi, " ").replace(/<[^>]+>/g, " ")).replace(/\s+/g, " ").trim(), s = a || n;
  return s.length > 240 ? `${s.slice(0, 237)}...` : s;
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
function jd(e = "") {
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
  if (Bd(e)) return Nd();
  const n = Ud(a);
  if (Dd(e) || /\btext\/html\b/i.test(n.contentType)) {
    const s = Fd(n), l = qd(e);
    return [
      "酒馆后端返回了非 JSON 的 HTML 页面",
      s ? `（${s}）` : "",
      l ? `：${l}` : ""
    ].join("");
  }
  return jd(e) || String(e || t || "").trim();
}
function Hd(e = {}, t = $a) {
  const a = Od(e.baseUrl, t), n = String(e.apiKey || "").trim(), s = wr[t] || "", l = a || (n ? s : ""), o = { chat_completion_source: t || "openai" };
  return l && (o.reverse_proxy = l), n && (o.proxy_password = n), o;
}
function Kd(e = {}, t = $a) {
  return Hd(e, t);
}
function Hs(e) {
  const t = e || globalThis.fetch;
  if (typeof t != "function") throw new Error("当前运行环境没有可用的 fetch，无法调用酒馆后端。");
  return t;
}
async function Gd(e = {}, t = $a, a = {}, n = {}) {
  const s = await Hs(n.fetch)(Ed, {
    method: "POST",
    headers: await xr(n.requestHeadersProvider),
    body: JSON.stringify(Kd(e, t)),
    signal: a.signal
  }), l = await s.text();
  let o = null;
  try {
    o = l ? JSON.parse(l) : {};
  } catch (u) {
    throw new Error(`酒馆后端模型列表拉取失败：${ka(l, String(u?.message || u), s)}`);
  }
  if (!s.ok || o?.error) {
    const u = ka(o?.message || o?.error?.message || l, `HTTP ${s.status}`, s);
    throw new Error(`酒馆后端模型列表拉取失败：${u}`);
  }
  const r = Array.isArray(o?.data) ? o.data.map((u) => String(u?.id || u?.name || "").trim()).filter(Boolean) : [];
  return [...new Set(r)];
}
async function Ks(e = {}, t = $a, a = {}) {
  return await Gd(e, t, a, { requestHeadersProvider: ln });
}
async function zd(e = {}, t = {}) {
  return await Ks(e, $a, t);
}
async function Vd(e = {}, t = {}, a = {}) {
  const n = await js(e, !1, a.requestHeadersProvider);
  typeof t.onRequest == "function" && t.onRequest(n);
  const s = await Hs(a.fetch)(n.url, {
    method: n.method,
    headers: n.rawHeaders || n.headers,
    body: JSON.stringify(n.body),
    signal: t.signal
  }), l = await s.text();
  let o = null;
  try {
    o = l ? JSON.parse(l) : {};
  } catch (r) {
    const u = /* @__PURE__ */ new Error(`酒馆后端生成失败：${ka(l, String(r?.message || r), s)}`);
    throw u.status = s.status, u.body = l, u;
  }
  if (!s.ok || o?.error) {
    const r = ka(o?.error?.message || o?.message || l, `HTTP ${s.status}`, s), u = /* @__PURE__ */ new Error(`酒馆后端生成失败：${r}`);
    throw u.status = s.status, u.error = o?.error, u;
  }
  return o;
}
async function Wd(e = {}, t = {}) {
  return await Vd(e, t, { requestHeadersProvider: ln });
}
async function Yd(e = {}, t, a = {}, n = {}) {
  const s = await js(e, !0, n.requestHeadersProvider);
  typeof a.onRequest == "function" && a.onRequest(s);
  const l = await Hs(n.fetch)(s.url, {
    method: s.method,
    headers: s.rawHeaders || s.headers,
    body: JSON.stringify(s.body),
    signal: a.signal
  });
  if (!l.ok) {
    const o = await l.text().catch(() => ""), r = new Error(ka(o, `酒馆后端流式生成失败：HTTP ${l.status}`, l));
    throw r.status = l.status, r.body = o, r;
  }
  typeof a.onResponseAccepted == "function" && a.onResponseAccepted(), await Ad(l, (o) => {
    if (o?.error) {
      const r = ka(o.error?.message || o.message || JSON.stringify(o.error), "酒馆后端流式生成失败");
      throw new Error(r);
    }
    t(o);
  });
}
async function Xd(e = {}, t, a = {}) {
  return await Yd(e, t, a, { requestHeadersProvider: ln });
}
var D0 = Object.freeze([
  "buildHostChatCompletionGenerateRequest",
  "createHostChatCompletion",
  "streamHostChatCompletion"
]), B0 = Object.freeze({
  buildHostChatCompletionGenerateRequest: Rd,
  fetchHostChatCompletionsModels: Ks,
  fetchHostOpenAICompatibleModels: zd,
  createHostChatCompletion: Wd,
  streamHostChatCompletion: Xd
}), Jd = Object.freeze({
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
function $t(e, t, a, n, s = {}) {
  return Sr({
    profileId: e,
    modes: t,
    intensity: {
      kind: "effort",
      values: a,
      defaultValue: n
    },
    outputModes: s.outputModes,
    temperatureOmitModes: s.temperatureOmitModes
  });
}
var Gs = Sr({
  profileId: "unsupported",
  modes: ["inherit"],
  outputModes: ["hide"],
  intensity: { kind: "none" },
  unsupportedReason: "当前 Provider、传输方式与模型组合没有已验证的 Reasoning 控制协议。"
}), rn = Object.freeze(["on"]), zs = Object.freeze([
  "inherit",
  "on",
  "off"
]), _r = $t("openai-gpt-5.6", [
  "inherit",
  "on",
  "off"
], [
  "low",
  "medium",
  "high",
  "xhigh",
  "max"
], "medium", { temperatureOmitModes: zs }), Qd = $t("kimi-k3", [
  "inherit",
  "on",
  "off"
], [
  "low",
  "high",
  "max"
], "max", { temperatureOmitModes: rn }), Zd = $t("deepseek-thinking", [
  "inherit",
  "on",
  "off"
], [
  "low",
  "high",
  "max"
], "high", { temperatureOmitModes: rn }), ec = $t("openai-compatible-gemini-latest", [
  "inherit",
  "on",
  "off"
], [
  "minimal",
  "low",
  "medium",
  "high"
], "high", { temperatureOmitModes: rn }), tc = $t("openai-compatible-claude-latest", [
  "inherit",
  "on",
  "off"
], [
  "low",
  "medium",
  "high",
  "xhigh",
  "max"
], "high", { temperatureOmitModes: rn }), ac = $t("openai-compatible-default", [
  "inherit",
  "on",
  "off"
], [
  "low",
  "medium",
  "high"
], "medium", { temperatureOmitModes: rn }), nc = $t("anthropic-adaptive", [
  "inherit",
  "on",
  "off"
], [
  "low",
  "medium",
  "high",
  "xhigh",
  "max"
], "high", { temperatureOmitModes: zs }), sc = $t("sillytavern-claude-adaptive", [
  "inherit",
  "on",
  "off"
], [
  "low",
  "medium",
  "high",
  "max"
], "high", { temperatureOmitModes: zs }), ic = $t("google-gemini-3-flash", ["inherit", "on"], [
  "minimal",
  "low",
  "medium",
  "high"
], "high"), lc = $t("sillytavern-google-3-flash", ["inherit", "on"], [
  "min",
  "low",
  "medium",
  "high"
], "high");
function rc(e = "") {
  switch (Td(e)) {
    case "deepseek":
      return Zd;
    case "kimi":
      return Qd;
    case "gemini":
      return ec;
    case "claude":
      return tc;
    case "openai":
      return _r;
    default:
      return ac;
  }
}
function Vs(e = {}) {
  const t = String(e.provider || "").trim(), a = String(e.model || "").trim().toLowerCase();
  switch (t) {
    case "openai-responses":
      return _r;
    case "openai-compatible":
    case "sillytavern-openai-compatible":
      return rc(a);
    case "anthropic":
      return nc;
    case "sillytavern-claude":
      return sc;
    case "google":
      return ic;
    case "sillytavern-google":
      return lc;
    default:
      return Gs;
  }
}
function oc(e = Gs) {
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
function uc(e = Gs) {
  return e.intensity?.kind !== "effort" ? [] : e.intensity.values.map((t) => ({
    value: t,
    label: Jd[t] || t
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
function dc(e, t) {
  const a = { ...e };
  return delete a.effort, delete a.budgetTokens, t.intensity?.kind === "effort" ? {
    ...a,
    ...e.effort ? { effort: e.effort } : {}
  } : a;
}
function cn(e = {}, t = {}) {
  const a = Vs(e), n = ya(t), s = t?.output === "show" || t?.output === "hide" ? t.output : null, l = dc({
    ...n,
    output: n.mode === "off" ? "hide" : s || (a.outputModes.includes("show") ? "show" : "hide")
  }, a);
  if (!a.outputModes.includes(l.output)) return ss(l, a, "当前任务要求返回 Reasoning 内容，但所选模型不支持。");
  if (!a.modes.includes(l.mode)) return ss(l, a, l.mode === "off" ? "当前模型不支持显式关闭 Reasoning。请选择“跟随模型默认”。" : a.unsupportedReason || "当前模型不支持显式开启 Reasoning。");
  if (l.mode !== "on") return {
    ...l,
    profileId: a.profileId,
    valid: !0
  };
  if (a.intensity.kind === "effort") {
    const o = l.effort || a.intensity.defaultValue;
    return a.intensity.values.includes(o) ? {
      ...l,
      effort: o,
      profileId: a.profileId,
      valid: !0
    } : ss(l, a, `当前模型不支持 Reasoning 强度“${o}”。`, "REASONING_CONFIG_INVALID");
  }
  return {
    ...l,
    profileId: a.profileId,
    valid: !0
  };
}
var Fi = 900 * 1e3, ji = Object.freeze([{
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
function lt(e, t = 1) {
  const a = typeof e == "string" && !e.trim() ? t : e, n = Number(a);
  return Number.isFinite(n) ? Math.max(0, Math.min(2, n)) : lt(t, 1);
}
function is(e = {}) {
  return e.sendTemperature !== !1;
}
function Hi(e = "", t = {}) {
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
function bt(e, t, a = "") {
  if (e.replaceChildren(), a) {
    const n = document.createElement("option");
    n.value = "", n.textContent = a, e.appendChild(n);
  }
  t.forEach((n) => {
    const s = document.createElement("option");
    s.value = n.value, s.textContent = n.label, s.disabled = n.disabled === !0, e.appendChild(s);
  });
}
function fn(e = "", t = {}) {
  const a = ya(t.reasoning), n = Vs({
    provider: e,
    baseUrl: t.baseUrl,
    model: t.model
  }), s = {
    reasoningMode: a.mode,
    reasoningEffort: "",
    reasoningBudgetTokens: void 0
  };
  if (n.intensity.kind === "effort") s.reasoningEffort = n.intensity.values.includes(a.effort) ? a.effort : n.intensity.defaultValue;
  else if (n.intensity.kind === "budget") {
    const l = a.budgetTokens, o = n.intensity.allowAuto && l === -1, r = Number.isInteger(l) && l >= n.intensity.min && l <= n.intensity.max;
    s.reasoningBudgetTokens = o || r ? l : n.intensity.defaultValue;
  }
  return s;
}
function Ki(e = {}) {
  return ya(e);
}
function Za(e = []) {
  const t = [...new Set(e.filter(Boolean).map((s) => String(s).trim()).filter(Boolean))], a = fc.chat, n = t.filter((s) => {
    const l = s.toLowerCase();
    return !a.exclude.some((o) => l.includes(o));
  });
  return n.length ? n : t;
}
function vn(e = "") {
  return e === "delegate" ? "delegate" : "main";
}
function wa(e) {
  return String(e || "").trim().replace(/\/+$/, "");
}
function pc(e = "") {
  return e === "sillytavern-openai-compatible" || e === "sillytavern-claude" || e === "sillytavern-google";
}
function oa(e = "") {
  return e === "openai-compatible" || e === "sillytavern-openai-compatible";
}
function gc(e = "") {
  return e === "anthropic" || e === "sillytavern-claude";
}
function mc(e = "") {
  return e === "sillytavern-claude" ? yr : e === "sillytavern-google" ? kr : $a;
}
function en(e = []) {
  return [...new Set(e.filter(Boolean).map((t) => String(t).trim()).filter(Boolean))];
}
function bc(e) {
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
function $r(e) {
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
function hc(e, t) {
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
  let s = null, l = null;
  try {
    s = n ? JSON.parse(n) : {};
  } catch (o) {
    l = o;
  }
  return {
    ok: a.ok,
    status: a.status,
    url: e,
    data: s,
    rawText: n,
    parseError: l,
    errorSnippet: yc(s, n)
  };
}
function wc(e) {
  return Za((e?.data || []).map((t) => String(t?.id || "").trim()).filter(Boolean));
}
function Cr(e) {
  return Za((e?.data || []).map((t) => String(t?.id || "").trim()).filter(Boolean));
}
function xc(e) {
  return Za((e?.models || e?.data || []).map((t) => String(t?.id || t?.name || "")).map((t) => t.split("/").pop() || "").filter(Boolean));
}
async function kn({ urls: e, requestOptionsList: t, extractModels: a, providerLabel: n }) {
  let s = null;
  for (const l of e) for (const o of t) {
    const r = await kc(l, o);
    if (!r.ok) {
      s = r;
      continue;
    }
    if (r.parseError) {
      s = {
        ...r,
        errorSnippet: "返回的不是 JSON"
      };
      continue;
    }
    const u = a(r.data);
    if (u.length) return u;
    s = {
      ...r,
      errorSnippet: "返回成功，但模型列表为空"
    };
  }
  if (s) {
    const l = s.url ? ` (${s.url})` : "", o = s.errorSnippet ? `：${s.errorSnippet}` : "";
    throw new Error(`${n} 拉取模型失败：${s.status || "unknown"}${o}${l}`);
  }
  throw new Error(`${n} 拉取模型失败：未获取到模型列表。`);
}
async function Sc(e, t = {}) {
  const a = String(e.apiKey || "").trim(), n = wa(e.baseUrl || ""), s = wa(n || wr.claude);
  if (a && s) try {
    return await kn({
      urls: $r(s),
      requestOptionsList: [{
        headers: {
          "x-api-key": a,
          "anthropic-version": "2023-06-01",
          Accept: "application/json"
        },
        signal: t.signal
      }],
      extractModels: Cr,
      providerLabel: "Anthropic"
    });
  } catch (l) {
    if (n) throw l;
  }
  return [...vc];
}
async function _c(e, t = {}) {
  const a = e.provider, n = wa(e.baseUrl || ""), s = String(e.apiKey || "").trim();
  if (a === "sillytavern-claude") return Za(await Sc(e, t));
  if (pc(a)) return Za(await Ks(e, mc(a), { signal: t.signal }));
  if (!s) throw new Error("请先填写 API Key。");
  if (!n) throw new Error("请先填写 Base URL。");
  return a === "google" ? await kn({
    urls: hc(n, s),
    requestOptionsList: [
      {
        headers: {
          Accept: "application/json",
          "x-goog-api-key": s
        },
        signal: t.signal
      },
      {
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${s}`
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
  }) : gc(a) ? await kn({
    urls: $r(n),
    requestOptionsList: [{
      headers: {
        "x-api-key": s,
        "anthropic-version": "2023-06-01",
        Accept: "application/json"
      },
      signal: t.signal
    }],
    extractModels: Cr,
    providerLabel: "Anthropic"
  }) : await kn({
    urls: bc(n),
    requestOptionsList: [{
      headers: {
        Authorization: `Bearer ${s}`,
        Accept: "application/json"
      },
      signal: t.signal
    }],
    extractModels: wc,
    providerLabel: a === "openai-responses" ? "OpenAI Responses" : "OpenAI-Compatible"
  });
}
function $c(e) {
  return e instanceof Error ? e.message : String(e || "unknown_error");
}
function Cc(e = {}) {
  const { state: t, render: a, showToast: n, createRequestId: s = (g = "req") => `${g}-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`, saveConfig: l, reloadConfig: o, pullModels: r = _c, describeError: u = $c, getRuntimeSummaryText: c } = e;
  function d() {
    t.configFormSyncPending = !0;
  }
  function y(g, f = "main") {
    const v = String(g || "").trim() || "openai-compatible";
    return f === "delegate" ? `delegate:${v}` : v;
  }
  function w(g, f = "main") {
    return t.pullStateByProvider?.[y(g, f)] || {
      status: "idle",
      message: ""
    };
  }
  function m(g, f, v = "main") {
    t.pullStateByProvider = {
      ...t.pullStateByProvider || {},
      [y(g, v)]: f
    };
  }
  function A(g, f, v = "main") {
    t.modelOptionsByProvider = {
      ...t.modelOptionsByProvider || {},
      [y(g, v)]: Array.isArray(f) ? f : []
    };
  }
  function P(g, f = "main") {
    const v = y(g, f);
    return Array.isArray(t.modelOptionsByProvider?.[v]) ? t.modelOptionsByProvider[v] : [];
  }
  function R(g, f) {
    const v = t.config?.presets || {}, x = Ie(g || f || "默认");
    return v[x] ? x : f && v[f] ? f : Object.keys(v)[0] || "默认";
  }
  function q(g, f) {
    const v = R(g, qs), x = f && typeof f == "object" ? f : Ze(), I = x.provider || "openai-compatible", B = Qe(x.modelConfigs || {}), D = B[I] || {}, E = fn(I, D);
    return {
      delegatePresetName: v,
      delegateProvider: I,
      delegateModelConfigs: B,
      delegateBaseUrl: String(D.baseUrl || ""),
      delegateModel: String(D.model || ""),
      delegateApiKey: String(D.apiKey || ""),
      delegateTemperature: lt(D.temperature, 1),
      delegateMaxTokens: Fe(D.maxTokens),
      delegateSendTemperature: is(D),
      delegateReasoningMode: E.reasoningMode,
      delegateReasoningEffort: E.reasoningEffort,
      delegateReasoningBudgetTokens: E.reasoningBudgetTokens,
      delegateToolMode: D.toolMode || "native"
    };
  }
  function U(g = "openai-compatible", f = {}) {
    const v = Qe(f || {})[g] || {}, x = fn(g, v);
    return {
      baseUrl: String(v.baseUrl || ""),
      model: String(v.model || ""),
      apiKey: String(v.apiKey || ""),
      temperature: lt(v.temperature, 1),
      maxTokens: Fe(v.maxTokens),
      sendTemperature: is(v),
      ...x,
      toolMode: v.toolMode || "native"
    };
  }
  function L(g = "openai-compatible", f = {}) {
    const v = Qe(f || {})[g] || {}, x = fn(g, v);
    return {
      delegateBaseUrl: String(v.baseUrl || ""),
      delegateModel: String(v.model || ""),
      delegateApiKey: String(v.apiKey || ""),
      delegateTemperature: lt(v.temperature, 1),
      delegateMaxTokens: Fe(v.maxTokens),
      delegateSendTemperature: is(v),
      delegateReasoningMode: x.reasoningMode,
      delegateReasoningEffort: x.reasoningEffort,
      delegateReasoningBudgetTokens: x.reasoningBudgetTokens,
      delegateToolMode: v.toolMode || "native"
    };
  }
  function M(g, f, v = t.config) {
    const x = Ie(g || "默认"), I = f && typeof f == "object" ? f : Ze(), B = I.provider || "openai-compatible", D = Qe(I.modelConfigs || {}), E = U(B, D), k = R(v?.delegatePresetName, x), O = q(k, v?.delegateConfig && typeof v.delegateConfig == "object" ? v.delegateConfig : (v?.presets || {})[k] || I);
    return {
      currentPresetName: x,
      presetDraftName: x,
      provider: B,
      modelConfigs: D,
      ...E,
      tavilyApiKey: String(v?.tavilyApiKey || ""),
      tavilyBaseUrl: yt(v?.tavilyBaseUrl || "https://api.tavily.com"),
      permissionMode: ca(I.permissionMode),
      jsApiPermission: Ht(v?.jsApiPermission),
      ...O
    };
  }
  function _() {
    if (t.configDraft) return t.configDraft;
    const g = Ie(t.config?.currentPresetName || "默认");
    return t.configDraft = M(g, (t.config?.presets || {})[g] || Ze()), t.configDraft;
  }
  function T(g, f = {}) {
    const v = _(), x = f.provider || g.querySelector("#xb-assistant-provider")?.value || v.provider || "openai-compatible", I = f.delegateProvider || g.querySelector("#xb-assistant-delegate-provider")?.value || v.delegateProvider || "openai-compatible", B = g.querySelector("#xb-assistant-base-url")?.value.trim() || "", D = g.querySelector("#xb-assistant-model")?.value.trim() || "", E = g.querySelector("#xb-assistant-delegate-base-url")?.value.trim() ?? v.delegateBaseUrl ?? "", k = g.querySelector("#xb-assistant-delegate-model")?.value.trim() ?? v.delegateModel ?? "", O = Ki({
      mode: g.querySelector("#xb-assistant-reasoning-mode")?.value || v.reasoningMode,
      effort: g.querySelector("#xb-assistant-reasoning-effort")?.value || v.reasoningEffort,
      budgetTokens: g.querySelector("#xb-assistant-reasoning-budget")?.value ?? v.reasoningBudgetTokens
    }), N = Ki({
      mode: g.querySelector("#xb-assistant-delegate-reasoning-mode")?.value || v.delegateReasoningMode,
      effort: g.querySelector("#xb-assistant-delegate-reasoning-effort")?.value || v.delegateReasoningEffort,
      budgetTokens: g.querySelector("#xb-assistant-delegate-reasoning-budget")?.value ?? v.delegateReasoningBudgetTokens
    }), Y = {
      baseUrl: B,
      model: D,
      apiKey: g.querySelector("#xb-assistant-api-key")?.value.trim() || "",
      temperature: lt(g.querySelector("#xb-assistant-temperature")?.value, v.temperature ?? 1),
      maxTokens: Fe(g.querySelector("#xb-assistant-max-tokens")?.value, v.maxTokens),
      sendTemperature: g.querySelector("#xb-assistant-send-temperature")?.checked ?? !!(v.sendTemperature ?? !0),
      reasoning: O,
      toolMode: oa(x) ? g.querySelector("#xb-assistant-tool-mode")?.value || v.toolMode || "native" : void 0
    }, K = {
      baseUrl: E,
      model: k,
      apiKey: g.querySelector("#xb-assistant-delegate-api-key")?.value.trim() ?? v.delegateApiKey ?? "",
      temperature: lt(g.querySelector("#xb-assistant-delegate-temperature")?.value, v.delegateTemperature ?? 1),
      maxTokens: Fe(g.querySelector("#xb-assistant-delegate-max-tokens")?.value, v.delegateMaxTokens),
      sendTemperature: g.querySelector("#xb-assistant-delegate-send-temperature")?.checked ?? !!(v.delegateSendTemperature ?? !0),
      reasoning: N,
      toolMode: oa(I) ? g.querySelector("#xb-assistant-delegate-tool-mode")?.value || v.delegateToolMode || "native" : void 0
    }, Q = {
      ...Qe(v.modelConfigs || {}),
      [x]: {
        ...Qe(v.modelConfigs || {})[x] || {},
        ...Y
      }
    }, ee = {
      ...Qe(v.delegateModelConfigs || {}),
      [I]: {
        ...Qe(v.delegateModelConfigs || {})[I] || {},
        ...K
      }
    };
    return {
      ...v,
      currentPresetName: v.currentPresetName,
      presetDraftName: Ie(g.querySelector("#xb-assistant-preset-name")?.value),
      provider: x,
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
      toolMode: Y.toolMode || v.toolMode || "native",
      tavilyApiKey: g.querySelector("#xb-assistant-tavily-api-key")?.value.trim() ?? v.tavilyApiKey ?? "",
      tavilyBaseUrl: yt(v.tavilyBaseUrl || "https://api.tavily.com"),
      permissionMode: ca(g.querySelector("#xb-assistant-permission-mode")?.value || v.permissionMode),
      jsApiPermission: Ht(g.querySelector("#xb-assistant-jsapi-permission")?.value || v.jsApiPermission),
      delegatePresetName: R(g.querySelector("#xb-assistant-delegate-preset-select")?.value || v.delegatePresetName, v.currentPresetName),
      delegateProvider: I,
      delegateModelConfigs: ee,
      delegateBaseUrl: K.baseUrl,
      delegateModel: K.model,
      delegateApiKey: K.apiKey,
      delegateTemperature: K.temperature,
      delegateMaxTokens: K.maxTokens,
      delegateSendTemperature: K.sendTemperature,
      delegateReasoningMode: K.reasoning.mode,
      delegateReasoningEffort: K.reasoning.effort || "",
      delegateReasoningBudgetTokens: K.reasoning.budgetTokens,
      delegateToolMode: K.toolMode || v.delegateToolMode || "native"
    };
  }
  function S(g, f = {}) {
    return t.configDraft = T(g, f), t.configDirty = !0, t.configDraft;
  }
  function $(g = _()) {
    return {
      baseUrl: String(g.baseUrl || ""),
      model: String(g.model || ""),
      apiKey: String(g.apiKey || ""),
      temperature: lt(g.temperature, 1),
      maxTokens: Fe(g.maxTokens),
      sendTemperature: !!(g.sendTemperature ?? !0),
      reasoning: ya({
        mode: g.reasoningMode,
        effort: g.reasoningEffort,
        budgetTokens: g.reasoningBudgetTokens
      }),
      toolMode: oa(g.provider) ? g.toolMode || "native" : void 0
    };
  }
  function C(g = _()) {
    return {
      baseUrl: String(g.delegateBaseUrl || ""),
      model: String(g.delegateModel || ""),
      apiKey: String(g.delegateApiKey || ""),
      temperature: lt(g.delegateTemperature, 1),
      maxTokens: Fe(g.delegateMaxTokens),
      sendTemperature: !!(g.delegateSendTemperature ?? !0),
      reasoning: ya({
        mode: g.delegateReasoningMode,
        effort: g.delegateReasoningEffort,
        budgetTokens: g.delegateReasoningBudgetTokens
      }),
      toolMode: oa(g.delegateProvider) ? g.delegateToolMode || "native" : void 0
    };
  }
  function G(g = _()) {
    const f = g.delegateProvider || "openai-compatible", v = Qe(g.delegateModelConfigs || {});
    return {
      provider: f,
      modelConfigs: {
        ...v,
        [f]: {
          ...v[f] || {},
          ...C(g)
        }
      }
    };
  }
  function Z(g = _()) {
    return {
      provider: g.provider || "openai-compatible",
      baseUrl: g.baseUrl || "",
      model: g.model || "",
      apiKey: g.apiKey || "",
      tavilyApiKey: g.tavilyApiKey || "",
      tavilyBaseUrl: yt(g.tavilyBaseUrl || "https://api.tavily.com"),
      temperature: g.sendTemperature === !1 ? void 0 : lt(g.temperature, 1),
      sendTemperature: !!(g.sendTemperature ?? !0),
      maxTokens: Fe(g.maxTokens),
      timeoutMs: Fi,
      toolMode: g.toolMode || "native",
      reasoning: cn({
        provider: g.provider,
        baseUrl: g.baseUrl,
        model: g.model,
        maxTokens: Fe(g.maxTokens)
      }, {
        mode: g.reasoningMode,
        effort: g.reasoningEffort,
        budgetTokens: g.reasoningBudgetTokens
      })
    };
  }
  function X(g = _()) {
    return {
      provider: g.delegateProvider || "openai-compatible",
      baseUrl: g.delegateBaseUrl || "",
      model: g.delegateModel || "",
      apiKey: g.delegateApiKey || "",
      tavilyApiKey: g.tavilyApiKey || "",
      tavilyBaseUrl: yt(g.tavilyBaseUrl || "https://api.tavily.com"),
      temperature: g.delegateSendTemperature === !1 ? void 0 : lt(g.delegateTemperature, 1),
      sendTemperature: !!(g.delegateSendTemperature ?? !0),
      maxTokens: Fe(g.delegateMaxTokens),
      timeoutMs: Fi,
      toolMode: g.delegateToolMode || "native",
      reasoning: cn({
        provider: g.delegateProvider,
        baseUrl: g.delegateBaseUrl,
        model: g.delegateModel,
        maxTokens: Fe(g.delegateMaxTokens)
      }, {
        mode: g.delegateReasoningMode,
        effort: g.delegateReasoningEffort,
        budgetTokens: g.delegateReasoningBudgetTokens
      })
    };
  }
  function J(g = {}) {
    const f = [];
    Object.entries(g.presets || {}).forEach(([B, D]) => {
      const E = D?.provider || "openai-compatible", k = D?.modelConfigs?.[E] || {}, O = cn({
        provider: E,
        baseUrl: k.baseUrl,
        model: k.model,
        maxTokens: Fe(k.maxTokens)
      }, k.reasoning);
      O.valid === !1 && f.push(`预设“${B}”：${O.error}`);
    });
    const v = g.delegateConfig?.provider || "openai-compatible", x = g.delegateConfig?.modelConfigs?.[v] || {}, I = cn({
      provider: v,
      baseUrl: x.baseUrl,
      model: x.model,
      maxTokens: Fe(x.maxTokens)
    }, x.reasoning);
    return I.valid === !1 && f.push(`分身模型：${I.error}`), f;
  }
  function j(g = {}) {
    const f = (g.role === "delegate", _());
    return g.role === "delegate" ? X(f) : Z(f);
  }
  function ue(g) {
    _(), t.configDraft = {
      ...t.configDraft,
      presetDraftName: Ie(g.querySelector("#xb-assistant-preset-name")?.value)
    };
  }
  function he(g = _(), f = g.provider || "openai-compatible", v = "main") {
    const x = w(f, v);
    return typeof c == "function" ? c({
      state: t,
      draft: g,
      provider: f,
      pullState: x,
      providerLabel: Hi(f)
    }) : `预设「${g.currentPresetName || "默认"}」 · ${Hi(f)}`;
  }
  function de(g, f, v) {
    const x = g?.querySelector?.(f);
    if (!x) return;
    const I = String(v?.status || "idle"), B = String(v?.message || "").trim();
    x.textContent = B, x.hidden = !B, x.classList.toggle("is-loading", I === "loading"), x.classList.toggle("is-success", I === "success"), x.classList.toggle("is-error", I === "error");
  }
  function pe(g) {
    if (!g) return;
    const f = vn(t.configPage);
    t.configPage = f, g.querySelectorAll("[data-config-page]").forEach((v) => {
      const x = vn(v?.dataset?.configPage) === f;
      v.classList.toggle("is-active", x), v.setAttribute("aria-selected", x ? "true" : "false");
    }), g.querySelectorAll("[data-config-page-panel]").forEach((v) => {
      const x = vn(v?.dataset?.configPagePanel) === f;
      v.toggleAttribute("hidden", !x);
    }), g.querySelector("#xb-assistant-delete-preset")?.toggleAttribute("hidden", f === "delegate");
  }
  function Ae(g, f = "main") {
    const v = _(), x = f === "delegate", I = x ? "#xb-assistant-delegate-reasoning" : "#xb-assistant-reasoning", B = x ? v.delegateProvider : v.provider, D = x ? v.delegateBaseUrl : v.baseUrl, E = x ? v.delegateModel : v.model, k = {
      mode: x ? v.delegateReasoningMode : v.reasoningMode,
      effort: x ? v.delegateReasoningEffort : v.reasoningEffort,
      budgetTokens: x ? v.delegateReasoningBudgetTokens : v.reasoningBudgetTokens
    }, O = Vs({
      provider: B,
      baseUrl: D,
      model: E
    }), N = fn(B, {
      baseUrl: D,
      model: E,
      reasoning: k
    }), Y = N.reasoningMode, K = N.reasoningEffort, Q = N.reasoningBudgetTokens, ee = g.querySelector(`${I}-mode`), oe = g.querySelector(`${I}-capability`), ge = g.querySelector(`${I}-effort-wrap`), me = g.querySelector(`${I}-effort`), we = g.querySelector(`${I}-budget-wrap`), xe = g.querySelector(`${I}-budget`);
    ee && (bt(ee, oc(O)), ee.value = Y), oe && (oe.textContent = O.unsupportedReason || `能力配置：${O.profileId}`), me && (bt(me, uc(O)), me.value = K), ge && (ge.style.display = Y === "on" && O.intensity.kind === "effort" ? "" : "none"), xe && O.intensity.kind === "budget" && (xe.min = O.intensity.allowAuto ? "-1" : String(O.intensity.min), xe.max = String(O.intensity.max), xe.value = String(Q)), we && (we.style.display = Y === "on" && O.intensity.kind === "budget" ? "" : "none");
  }
  function Oe(g) {
    const f = g.querySelector("#xb-assistant-runtime");
    if (!f) return;
    const v = _(), x = t.configPage === "delegate", I = x ? v.delegateProvider : v.provider;
    f.textContent = he(x ? {
      ...v,
      currentPresetName: "分身",
      provider: I
    } : v, I || "openai-compatible", x ? "delegate" : "main");
  }
  function ft(g) {
    if (!t.config) return;
    pe(g);
    const f = _(), v = f.provider || "openai-compatible", x = P(v), I = f.delegateProvider || "openai-compatible", B = P(I, "delegate"), D = g.querySelector("#xb-assistant-provider"), E = g.querySelector("#xb-assistant-base-url"), k = g.querySelector("#xb-assistant-model"), O = g.querySelector("#xb-assistant-api-key"), N = g.querySelector("#xb-assistant-temperature"), Y = g.querySelector("#xb-assistant-send-temperature"), K = g.querySelector("#xb-assistant-tool-mode-wrap"), Q = g.querySelector("#xb-assistant-tool-mode"), ee = g.querySelector("#xb-assistant-permission-mode"), oe = g.querySelector("#xb-assistant-jsapi-permission"), ge = g.querySelector("#xb-assistant-model-pulled"), me = g.querySelector("#xb-assistant-max-tokens"), we = g.querySelector("#xb-assistant-preset-select"), xe = g.querySelector("#xb-assistant-preset-name"), ze = g.querySelector("#xb-assistant-delegate-preset-select"), Ne = g.querySelector("#xb-assistant-delegate-provider"), Ut = g.querySelector("#xb-assistant-delegate-base-url"), Ca = g.querySelector("#xb-assistant-delegate-model"), qe = g.querySelector("#xb-assistant-delegate-api-key"), Je = g.querySelector("#xb-assistant-tavily-api-key"), la = g.querySelector("#xb-assistant-delegate-model-pulled"), Aa = g.querySelector("#xb-assistant-delegate-max-tokens"), Ws = g.querySelector("#xb-assistant-delegate-tool-mode-wrap"), Gn = g.querySelector("#xb-assistant-delegate-tool-mode");
    if (!we || !xe) return;
    const Ys = (t.config.presetNames || []).map((Ft) => ({
      value: Ft,
      label: Ft
    }));
    bt(we, Ys), we.value = f.currentPresetName || t.config.currentPresetName || "默认", ze && (bt(ze, Ys), ze.value = R(f.delegatePresetName, f.currentPresetName)), xe.value = f.presetDraftName || f.currentPresetName || "默认", D && (D.value = v), E && (E.value = f.baseUrl || ""), k && (k.value = f.model || ""), O && (O.value = f.apiKey || ""), me && (me.value = String(Fe(f.maxTokens))), N && (N.value = String(lt(f.temperature, 1))), Y && (Y.checked = !!(f.sendTemperature ?? !0)), Je && (Je.value = f.tavilyApiKey || ""), K && (K.style.display = oa(v) ? "" : "none"), Q && (bt(Q, ji), Q.value = f.toolMode || "native"), ee && (bt(ee, hd), ee.value = ca(f.permissionMode)), oe && (bt(oe, yd), oe.value = Ht(f.jsApiPermission)), Ae(g), ge && (bt(ge, x.map((Ft) => ({
      value: Ft,
      label: Ft
    })), "手动填写"), ge.value = x.includes(f.model) ? f.model : ""), Ne && (Ne.value = I), Ut && (Ut.value = f.delegateBaseUrl || ""), Ca && (Ca.value = f.delegateModel || ""), qe && (qe.value = f.delegateApiKey || "");
    const Xs = g.querySelector("#xb-assistant-delegate-temperature"), Js = g.querySelector("#xb-assistant-delegate-send-temperature");
    Aa && (Aa.value = String(Fe(f.delegateMaxTokens))), Xs && (Xs.value = String(lt(f.delegateTemperature, 1))), Js && (Js.checked = !!(f.delegateSendTemperature ?? !0)), Ws && (Ws.style.display = oa(I) ? "" : "none"), Gn && (bt(Gn, ji), Gn.value = f.delegateToolMode || "native"), Ae(g, "delegate"), la && (bt(la, B.map((Ft) => ({
      value: Ft,
      label: Ft
    })), "手动填写"), la.value = B.includes(f.delegateModel) ? f.delegateModel : ""), de(g, "#xb-assistant-model-pull-status", w(v)), de(g, "#xb-assistant-delegate-model-pull-status", w(I, "delegate")), Oe(g);
  }
  function Le(g) {
    if (typeof l != "function") return;
    const f = l(g);
    f && typeof f.catch == "function" && f.catch((v) => {
      n?.(u(v));
    });
  }
  function Re(g, f, v) {
    g.querySelector(f)?.addEventListener("click", () => {
      const x = g.querySelector(v);
      x && (x.type = x.type === "password" ? "text" : "password");
    });
  }
  function Yt(g) {
    return {
      expectedUpdatedAt: Number(g?.updatedAt) || 0,
      workspaceFileName: g?.workspaceFileName || "",
      jsApiPermission: Ht(g?.jsApiPermission),
      tavilyApiKey: String(g?.tavilyApiKey || ""),
      tavilyBaseUrl: yt(g?.tavilyBaseUrl || "https://api.tavily.com"),
      currentPresetName: g?.currentPresetName || "默认",
      delegatePresetName: g?.delegatePresetName || g?.currentPresetName || "默认",
      delegateConfig: g?.delegateConfig || {},
      delegateConfigured: g?.delegateConfigured === !0,
      presets: g?.presets || {}
    };
  }
  function qt(g, f = {}) {
    const v = En(g), x = J(v);
    if (x.length)
      return n?.(x[0]), !1;
    t.config = v;
    const I = Ie(f.presetName || v.currentPresetName || "默认");
    return t.configDraft = M(I, v.presets?.[I] || Ze(), v), d(), Le({
      requestId: s(f.requestPrefix || "save-config"),
      config: v,
      payload: Yt(v)
    }), !0;
  }
  function V(g, f = {}) {
    const v = S(g), x = Ie(f.presetName || v.presetDraftName), I = Ie(v.currentPresetName || t.config?.currentPresetName || "默认"), B = (t.config?.presets || {})[I] || Ze(), D = Qe(v.modelConfigs || B.modelConfigs || {}), E = {
      ...B,
      provider: v.provider,
      permissionMode: ca(v.permissionMode),
      modelConfigs: {
        ...D,
        [v.provider]: {
          ...D[v.provider] || {},
          ...$(v)
        }
      }
    }, k = { ...t.config?.presets || {} };
    f.renameCurrentPreset && x !== I && delete k[I], k[x] = E, qt({
      ...t.config,
      jsApiPermission: Ht(v.jsApiPermission),
      tavilyApiKey: String(v.tavilyApiKey || ""),
      tavilyBaseUrl: yt(v.tavilyBaseUrl || "https://api.tavily.com"),
      currentPresetName: x,
      delegatePresetName: R(v.delegatePresetName, x),
      delegateConfig: G(v),
      delegateConfigured: f.configureDelegate === !0 || t.config?.delegateConfigured === !0,
      presets: k
    }, {
      presetName: x,
      requestPrefix: f.requestPrefix
    });
  }
  function F(g, f = "") {
    const v = Ie(f || "默认"), x = typeof window < "u" && typeof window.prompt == "function" ? window.prompt(g, v) : v;
    return x === null ? "" : Ie(x);
  }
  function se(g) {
    const f = F("输入新预设名称：", `${S(g).currentPresetName || "默认"} 副本`);
    if (!f) {
      n?.("预设名称不能为空");
      return;
    }
    const v = g.querySelector("#xb-assistant-preset-name");
    v && (v.value = f, V(g, {
      presetName: f,
      requestPrefix: "create-preset"
    }));
  }
  function Te(g) {
    const f = S(g), v = Ie(f.currentPresetName || t.config?.currentPresetName || "默认"), x = F("输入预设名称：", f.presetDraftName || v);
    if (!x) {
      n?.("预设名称不能为空");
      return;
    }
    if (x === v) return;
    const I = g.querySelector("#xb-assistant-preset-name");
    I && (I.value = x, V(g, {
      presetName: x,
      renameCurrentPreset: !0,
      requestPrefix: "rename-preset"
    }));
  }
  function st(g) {
    if (Object.keys(t.config?.presets || {}).length <= 1) {
      n?.("至少要保留一套预设");
      return;
    }
    const f = S(g), v = Ie(t.configDraft?.currentPresetName || t.config?.currentPresetName || "默认"), x = { ...t.config?.presets || {} };
    delete x[v];
    const I = Object.keys(x)[0] || "默认";
    qt({
      ...t.config,
      jsApiPermission: Ht(f.jsApiPermission),
      tavilyApiKey: String(f.tavilyApiKey || t.config?.tavilyApiKey || ""),
      tavilyBaseUrl: yt(f.tavilyBaseUrl || t.config?.tavilyBaseUrl || "https://api.tavily.com"),
      currentPresetName: I,
      delegatePresetName: R(f.delegatePresetName, I),
      delegateConfig: G(f),
      presets: x
    }, {
      presetName: I,
      requestPrefix: "delete-preset"
    }) && a?.();
  }
  function Xt(g) {
    g?.querySelector?.("[data-xb-agent-config-retry]")?.addEventListener("click", () => {
      o?.();
    }), g?.querySelector?.("[data-xb-agent-config-reload]")?.addEventListener("click", () => {
      t.configDraft = null, t.configDirty = !1, t.configExternalChangePending = !1, d(), o?.();
    }), g?.querySelector?.("#xb-assistant-provider") && (g.querySelector("#xb-assistant-provider")?.addEventListener("change", (f) => {
      const v = f.currentTarget.value, x = _().provider, I = S(g, { provider: x });
      t.configDraft = {
        ...I,
        provider: v,
        ...U(v, I.modelConfigs)
      }, d(), a?.();
    }), g.querySelector("#xb-assistant-preset-select")?.addEventListener("change", (f) => {
      const v = Ie(f.currentTarget.value), x = (t.config?.presets || {})[v] || Ze(), I = S(g);
      t.config = En({
        ...t.config,
        jsApiPermission: Ht(I.jsApiPermission),
        currentPresetName: v,
        delegatePresetName: R(I.delegatePresetName, v),
        delegateConfig: G(I)
      }), t.configDraft = M(v, x, t.config), d(), a?.();
    }), g.querySelector("#xb-assistant-preset-name")?.addEventListener("input", () => {
      ue(g);
    }), g.querySelector("#xb-assistant-base-url")?.addEventListener("input", () => {
      S(g), Ae(g), Oe(g);
    }), g.querySelector("#xb-assistant-model")?.addEventListener("input", () => {
      S(g), Ae(g), Oe(g);
    }), g.querySelector("#xb-assistant-api-key")?.addEventListener("input", () => {
      S(g);
    }), g.querySelector("#xb-assistant-max-tokens")?.addEventListener("input", () => {
      S(g);
    }), g.querySelector("#xb-assistant-temperature")?.addEventListener("input", () => {
      S(g);
    }), g.querySelector("#xb-assistant-send-temperature")?.addEventListener("change", () => {
      S(g);
    }), g.querySelector("#xb-assistant-tavily-api-key")?.addEventListener("input", () => {
      S(g);
    }), g.querySelector("#xb-assistant-model-pulled")?.addEventListener("change", (f) => {
      const v = f.currentTarget.value;
      if (!v) return;
      const x = g.querySelector("#xb-assistant-model");
      x && (x.value = v), S(g), Ae(g), Oe(g);
    }), Re(g, "#xb-assistant-toggle-key", "#xb-assistant-api-key"), Re(g, "#xb-assistant-toggle-tavily-key", "#xb-assistant-tavily-api-key"), g.querySelector("#xb-assistant-delegate-provider")?.addEventListener("change", (f) => {
      const v = f.currentTarget.value, x = _().delegateProvider, I = S(g, { delegateProvider: x });
      t.configDraft = {
        ...I,
        delegateProvider: v,
        ...L(v, I.delegateModelConfigs)
      }, d(), a?.();
    }), g.querySelector("#xb-assistant-delegate-base-url")?.addEventListener("input", () => {
      S(g), Ae(g, "delegate"), Oe(g);
    }), g.querySelector("#xb-assistant-delegate-model")?.addEventListener("input", () => {
      S(g), Ae(g, "delegate"), Oe(g);
    }), g.querySelector("#xb-assistant-delegate-api-key")?.addEventListener("input", () => {
      S(g);
    }), g.querySelector("#xb-assistant-delegate-max-tokens")?.addEventListener("input", () => {
      S(g);
    }), g.querySelector("#xb-assistant-delegate-temperature")?.addEventListener("input", () => {
      S(g);
    }), g.querySelector("#xb-assistant-delegate-send-temperature")?.addEventListener("change", () => {
      S(g);
    }), g.querySelector("#xb-assistant-delegate-model-pulled")?.addEventListener("change", (f) => {
      const v = f.currentTarget.value;
      if (!v) return;
      const x = g.querySelector("#xb-assistant-delegate-model");
      x && (x.value = v), S(g), Ae(g, "delegate"), Oe(g);
    }), Re(g, "#xb-assistant-delegate-toggle-key", "#xb-assistant-delegate-api-key"), g.querySelector("#xb-assistant-reasoning-mode")?.addEventListener("change", () => {
      S(g), Ae(g), Oe(g);
    }), g.querySelector("#xb-assistant-reasoning-effort")?.addEventListener("change", () => {
      S(g);
    }), g.querySelector("#xb-assistant-reasoning-budget")?.addEventListener("input", () => {
      S(g);
    }), g.querySelector("#xb-assistant-tool-mode")?.addEventListener("change", () => {
      S(g);
    }), g.querySelector("#xb-assistant-delegate-reasoning-mode")?.addEventListener("change", () => {
      S(g), Ae(g, "delegate"), Oe(g);
    }), g.querySelector("#xb-assistant-delegate-reasoning-effort")?.addEventListener("change", () => {
      S(g);
    }), g.querySelector("#xb-assistant-delegate-reasoning-budget")?.addEventListener("input", () => {
      S(g);
    }), g.querySelector("#xb-assistant-delegate-tool-mode")?.addEventListener("change", () => {
      S(g);
    }), g.querySelector("#xb-assistant-permission-mode")?.addEventListener("change", () => {
      S(g);
    }), g.querySelector("#xb-assistant-jsapi-permission")?.addEventListener("change", () => {
      S(g);
    }), g.querySelector("#xb-assistant-delegate-preset-select")?.addEventListener("change", (f) => {
      const v = R(f.currentTarget?.value, t.configDraft?.currentPresetName || t.config?.currentPresetName || "默认"), x = (t.config?.presets || {})[v] || Ze();
      t.configDraft = {
        ...S(g),
        ...q(v, x)
      }, d(), a?.();
    }), g.querySelectorAll("[data-config-page]").forEach((f) => {
      f.addEventListener("click", (v) => {
        S(g), t.configPage = vn(v.currentTarget?.dataset?.configPage), pe(g), ft(g);
      });
    }), g.querySelector("#xb-assistant-pull-models")?.addEventListener("click", async () => {
      S(g), d();
      const f = j();
      m(f.provider, {
        status: "loading",
        message: "正在拉取模型列表…"
      }), a?.();
      try {
        const v = await r(f);
        A(f.provider, v), m(f.provider, {
          status: "success",
          message: `已拉取 ${v.length} 个模型`
        });
      } catch (v) {
        A(f.provider, []), m(f.provider, {
          status: "error",
          message: u(v)
        });
      }
      d(), a?.();
    }), g.querySelector("#xb-assistant-delegate-pull-models")?.addEventListener("click", async () => {
      S(g), d();
      const f = j({ role: "delegate" });
      m(f.provider, {
        status: "loading",
        message: "正在拉取模型列表…"
      }, "delegate"), a?.();
      try {
        const v = await r(f);
        A(f.provider, v, "delegate"), m(f.provider, {
          status: "success",
          message: `已拉取 ${v.length} 个模型`
        }, "delegate");
      } catch (v) {
        A(f.provider, [], "delegate"), m(f.provider, {
          status: "error",
          message: u(v)
        }, "delegate");
      }
      d(), a?.();
    }), g.querySelector("#xb-assistant-new-preset")?.addEventListener("click", () => {
      se(g);
    }), g.querySelector("#xb-assistant-rename-preset")?.addEventListener("click", () => {
      Te(g);
    }), g.querySelector("#xb-assistant-save")?.addEventListener("click", () => {
      V(g);
    }), g.querySelector("#xb-assistant-delegate-save")?.addEventListener("click", () => {
      V(g, {
        requestPrefix: "save-delegate-config",
        configureDelegate: !0
      });
    }), g.querySelector("#xb-assistant-delete-preset")?.addEventListener("click", () => {
      st(g);
    }));
  }
  return {
    getActiveProviderConfig: j,
    getActiveProviderConfigFromForm(g, f = {}) {
      return t.configDraft = T(g), j(f);
    },
    syncConfigToForm: ft,
    bindSettingsPanelEvents: Xt
  };
}
function Ba(e = "") {
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
    title: Ba(e?.error || "保存失败")
  } : {
    className: "xb-assistant-save-button",
    title: "保存配置"
  };
}
function Tc(e = {}) {
  const { configSave: t = {}, runtimeText: a = "", inlineToastText: n = "", showInlineToast: s = !0, showAssistantPermissions: l = !0, showDelegateSettings: o = !0, showTavilySettings: r = !0, activePage: u = "main", delegatePresetHint: c = "DelegateRun 分身会使用这里的独立 API 配置；可以和主助手使用不同 Provider、Base URL、模型和 Tool 调用格式。", isBusy: d = !1, canDeletePreset: y = !0, configLoadError: w = "", configExternalChangePending: m = !1 } = e, A = String(w || "").trim(), P = Mc(t), R = Ac(t), q = d || A || String(t?.status || "") === "saving" ? "disabled" : "", U = d || !y ? "disabled" : "", L = u === "delegate" ? "delegate" : "main", M = L === "main", _ = L === "delegate", T = l ? `
            <label>
                <span>斜杠命令权限</span>
                <select id="xb-assistant-permission-mode"></select>
            </label>
            <label>
                <span>JavaScript API 权限</span>
                <select id="xb-assistant-jsapi-permission"></select>
            </label>` : "", S = o ? `
            <div class="xb-assistant-config-tabs" role="tablist" aria-label="API 配置分页">
                <button id="xb-assistant-config-tab-main" type="button" class="xb-assistant-config-tab ${M ? "is-active" : ""}" data-config-page="main" role="tab" aria-selected="${M ? "true" : "false"}">主助手 API</button>
                <button id="xb-assistant-config-tab-delegate" type="button" class="xb-assistant-config-tab ${_ ? "is-active" : ""}" data-config-page="delegate" role="tab" aria-selected="${_ ? "true" : "false"}">分身 API</button>
            </div>` : "", $ = o ? `
            <div class="xb-assistant-config-page" data-config-page-panel="delegate" ${_ ? "" : "hidden"}>
                <p class="xb-assistant-config-note">${Ba(c)}</p>
                <div class="xb-assistant-preset-row">
                    <select id="xb-assistant-delegate-preset-select" class="xb-assistant-preset-field" aria-label="已存预设"></select>
                    <div class="xb-assistant-preset-tools is-single" aria-label="分身 API 预设操作">
                        <button id="xb-assistant-delegate-save" type="button" class="xb-assistant-icon-button ${P.className}" title="${P.title}" aria-label="${P.title}" ${q}>${Oa(R)}</button>
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
            <div class="xb-assistant-config-alert is-error" data-xb-agent-config-load-error ${A ? "" : "hidden"}>
                <span data-xb-agent-config-load-error-message>${Ba(A)}</span>
                <button type="button" data-xb-agent-config-retry>重新读取</button>
            </div>
            <div class="xb-assistant-config-alert is-conflict" data-xb-agent-config-conflict ${A || !m ? "hidden" : ""}>
                <span>共享配置已在其他页面更新。当前未保存编辑仍保留；重新载入会放弃这些编辑。</span>
                <button type="button" data-xb-agent-config-reload>重新载入</button>
            </div>
            <fieldset class="xb-assistant-config-fields" data-xb-agent-config-fields ${A ? "disabled" : ""}>
            ${S}
            <div class="xb-assistant-config-page" data-config-page-panel="main" ${M ? "" : "hidden"}>
            <div class="xb-assistant-preset-row">
                <select id="xb-assistant-preset-select" class="xb-assistant-preset-field" aria-label="已存预设"></select>
                <input id="xb-assistant-preset-name" type="hidden" />
                <div class="xb-assistant-preset-tools" aria-label="API 预设操作">
                    <button id="xb-assistant-new-preset" type="button" class="xb-assistant-icon-button" title="新增预设" aria-label="新增预设" ${d ? "disabled" : ""}>${Oa("add")}</button>
                    <button id="xb-assistant-rename-preset" type="button" class="xb-assistant-icon-button" title="重命名预设" aria-label="重命名预设" ${d ? "disabled" : ""}>${Oa("rename")}</button>
                    <button id="xb-assistant-save" type="button" class="xb-assistant-icon-button ${P.className}" title="${P.title}" aria-label="${P.title}" ${q}>${Oa(R)}</button>
                    <button id="xb-assistant-delete-preset" type="button" class="xb-assistant-icon-button" title="删除预设" aria-label="删除预设" ${U}>${Oa("delete")}</button>
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
            ${r ? `<label>
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
            ${T}
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
            ${$}
            <div class="xb-assistant-runtime" id="xb-assistant-runtime">${Ba(a)}</div>
            </fieldset>
            ${s ? `<div class="xb-assistant-toast xb-assistant-toast-inline" id="xb-assistant-toast" aria-live="polite">${Ba(n)}</div>` : ""}
        </section>
    `;
}
var Ec = { class: "agent-api-app" }, Ic = { class: "agent-api-scroll" }, Pc = { "aria-live": "polite" }, Oc = ["disabled"], Lc = {
  key: 0,
  class: "agent-api-state",
  "aria-live": "polite"
}, Rc = {
  key: 1,
  class: "agent-api-state is-error",
  role: "alert"
}, Dc = {
  class: "agent-api-panel",
  "aria-label": "共享 Agent API 配置"
}, Gi = 13e4, Bc = /* @__PURE__ */ re({
  __name: "AgentApiApp",
  props: {
    bridge: {},
    initialState: {}
  },
  setup(e) {
    const t = e, a = structuredClone(/* @__PURE__ */ ie(t.initialState)), n = /* @__PURE__ */ W(a), s = /* @__PURE__ */ W(null), l = /* @__PURE__ */ W("idle"), o = /* @__PURE__ */ W("尚未测试。打开页面和保存配置都不会自动连接供应商。");
    let r = () => {
    }, u = null, c = 0;
    const d = /* @__PURE__ */ Dt({
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
    }), y = z(() => n.value.status === "ready" && d.config !== null), w = z(() => Object.keys(d.config?.presets || {}).length), m = z(() => l.value === "testing");
    function A(S) {
      const $ = S instanceof Error ? S.message : String(S || "unknown_error");
      return $ === "host_request_timeout" ? "请求等待超时，请检查网络后重试。" : $ === "app_inactive" ? "页面已经关闭。" : $;
    }
    function P() {
      u && clearTimeout(u), u = setTimeout(() => {
        d.configSave = {
          status: "idle",
          requestId: "",
          error: ""
        }, d.inlineToastText = "", M();
      }, 1800);
    }
    async function R(S) {
      const $ = S.payload || {};
      d.configSave = {
        status: "saving",
        requestId: "",
        error: ""
      }, d.inlineToastText = "正在保存共享配置…", M();
      try {
        const C = (await t.bridge.request("agent-api/save", { patch: $ }, 35e3)).result;
        if (C.ok !== !0 || !C.config)
          throw C.conflict && (d.configExternalChangePending = !0), new Error(C.error || "共享 Agent API 配置保存失败");
        d.config = En(C.config), d.configDraft = null, d.configDirty = !1, d.configExternalChangePending = !1, d.configFormSyncPending = !0, d.configSave = {
          status: "success",
          requestId: "",
          error: ""
        }, d.inlineToastText = "已保存；小白酒馆、画图、Ebook 与 OS 将读取同一份配置。";
      } catch (C) {
        const G = A(C);
        d.configSave = {
          status: "error",
          requestId: "",
          error: G
        }, d.inlineToastText = G;
      }
      M(), P();
    }
    async function q(S = !1) {
      const $ = ++c;
      try {
        const C = await t.bridge.request("agent-api/reload", {}, 35e3);
        if ($ !== c) return;
        if (S && d.configDirty) {
          d.configExternalChangePending = !0, M();
          return;
        }
        _(C.result);
      } catch (C) {
        if ($ !== c) return;
        n.value = {
          status: "error",
          config: null,
          message: A(C)
        }, M();
      }
    }
    async function U(S) {
      return (await t.bridge.request("agent-api/pull-models", { providerConfig: S }, Gi)).result.models;
    }
    const L = Cc({
      state: d,
      render: M,
      saveConfig: R,
      reloadConfig: q,
      pullModels: U,
      describeError: A
    });
    function M() {
      const S = s.value;
      !S || !d.config || (S.innerHTML = Tc({
        configSave: d.configSave,
        inlineToastText: d.inlineToastText,
        showAssistantPermissions: !1,
        showDelegateSettings: !1,
        showTavilySettings: !1,
        canDeletePreset: w.value > 1,
        configLoadError: n.value.status === "error" ? n.value.message : "",
        configExternalChangePending: d.configExternalChangePending
      }), L.syncConfigToForm(S), L.bindSettingsPanelEvents(S));
    }
    function _(S) {
      n.value = structuredClone(S), S.status === "ready" && S.config && (d.config = En(S.config), d.configDraft = null, d.configDirty = !1, d.configExternalChangePending = !1, d.configFormSyncPending = !0), nn(M);
    }
    async function T() {
      const S = s.value;
      if (!S || !y.value || m.value) return;
      const $ = L.getActiveProviderConfigFromForm(S);
      l.value = "testing", o.value = "正在测试当前表单中的连接…";
      try {
        const C = (await t.bridge.request("agent-api/test-connection", { providerConfig: structuredClone(/* @__PURE__ */ ie($)) }, Gi)).result;
        l.value = "success", o.value = `${C.provider || "Provider"} · ${C.model || "当前模型"} · ${C.latencyMs} ms`;
      } catch (C) {
        l.value = "error", o.value = A(C);
      }
    }
    return nt(() => {
      r = t.bridge.subscribe((S) => {
        if (S.type === "agent-api/state") {
          _(S.payload.state);
          return;
        }
        S.type === "agent-api/config-changed" && (d.configDirty ? (d.configExternalChangePending = !0, M()) : q(!0));
      }), _(a);
    }), ct(() => {
      c += 1, r(), u && clearTimeout(u);
    }), (S, $) => (p(), b("main", Ec, [$[5] || ($[5] = i("header", { class: "agent-api-header" }, [i("div", null, [
      i("span", null, "System service"),
      i("h1", null, "Agent API"),
      i("p", null, "一份配置，供小白酒馆、画图、Ebook 与 OS 共同使用。")
    ]), i("i", { "aria-hidden": "true" }, [i("b"), ve(" API")])], -1)), i("div", Ic, [
      i("section", {
        class: ae(["agent-api-connection", `is-${l.value}`]),
        "aria-labelledby": "agent-api-connection-title"
      }, [i("div", null, [
        $[1] || ($[1] = i("small", null, "CONNECTION CHECK", -1)),
        $[2] || ($[2] = i("h2", { id: "agent-api-connection-title" }, "当前连接", -1)),
        i("p", Pc, h(o.value), 1)
      ]), i("button", {
        type: "button",
        disabled: !y.value || m.value,
        onClick: T
      }, h(m.value ? "测试中…" : "测试当前连接"), 9, Oc)], 2),
      n.value.status === "loading" ? (p(), b("section", Lc, [...$[3] || ($[3] = [i("i", { "aria-hidden": "true" }, null, -1), i("div", null, [i("strong", null, "正在读取共享配置"), i("span", null, "页面打开不会连接模型供应商。")], -1)])])) : n.value.status === "error" ? (p(), b("section", Rc, [i("div", null, [$[4] || ($[4] = i("strong", null, "配置暂时无法读取", -1)), i("span", null, h(n.value.message), 1)]), i("button", {
        type: "button",
        onClick: $[0] || ($[0] = (C) => q())
      }, "重新读取")])) : H("", !0),
      Pe(i("section", Dc, [i("div", {
        ref_key: "panelRoot",
        ref: s
      }, null, 512)], 512), [[Uu, y.value]])
    ])]));
  }
}), Nc = Bc, qc = Object.freeze({
  id: "bank",
  name: "银行",
  accent: "#b89a58"
}), Uc = ["aria-labelledby"], Fc = ["id"], jc = { class: "bank-dialog-subject" }, Hc = { key: 0 }, Kc = { key: 1 }, Gc = {
  key: 0,
  class: "bank-dialog-field"
}, zc = { id: "bank-amount-help" }, Vc = {
  key: 1,
  class: "bank-dialog-validation"
}, Wc = {
  key: 2,
  class: "bank-dialog-summary"
}, Yc = {
  key: 3,
  class: "bank-dialog-warning"
}, Xc = {
  key: 4,
  class: "bank-dialog-warning is-loss"
}, Jc = {
  key: 5,
  class: "bank-dialog-error",
  role: "alert"
}, Qc = { class: "bank-dialog-actions" }, Zc = ["disabled"], ef = ["disabled"], tf = /* @__PURE__ */ re({
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
    const a = e, n = t, s = /* @__PURE__ */ W(a.product ? String(a.product.minAmount) : ""), l = z(() => a.mode === "deposit-open" ? "开立定期存单" : a.mode === "fund-open" ? "申购浮动理财" : "确认提前支取"), o = z(() => /^\d+$/.test(s.value.trim()) ? Number(s.value) : 0), r = z(() => a.mode === "withdraw" ? "" : !a.product || !Number.isSafeInteger(o.value) || o.value <= 0 ? "请输入正整数金额" : o.value < a.product.minAmount || o.value > a.product.maxAmount ? `金额须在 ${a.product.minAmount} 至 ${a.product.maxAmount} 之间` : o.value > a.balance ? "可用余额不足" : ""), u = z(() => a.mode === "deposit-open" ? a.product : null), c = z(() => u.value ? Math.floor(o.value * (1e4 + u.value.interestBps) / 1e4) : 0), d = z(() => !a.busy && (a.mode === "withdraw" || !r.value));
    function y() {
      if (d.value) {
        if (a.mode === "withdraw") {
          n("confirm");
          return;
        }
        n("confirm", o.value);
      }
    }
    return (w, m) => (p(), b("dialog", {
      open: "",
      class: "bank-dialog",
      "aria-labelledby": `bank-dialog-${e.mode}`,
      onClick: m[2] || (m[2] = ut((A) => !e.busy && w.$emit("cancel"), ["self"])),
      onKeydown: m[3] || (m[3] = vr(ut((A) => !e.busy && w.$emit("cancel"), ["stop", "prevent"]), ["esc"]))
    }, [i("form", {
      method: "dialog",
      class: "bank-dialog-card",
      onSubmit: ut(y, ["prevent"])
    }, [
      m[9] || (m[9] = i("span", { class: "bank-dialog-kicker" }, "VAULT AUTHORIZATION", -1)),
      i("h2", { id: `bank-dialog-${e.mode}` }, h(l.value), 9, Fc),
      i("div", jc, [i("span", null, h(e.mode === "withdraw" ? "取" : e.mode === "deposit-open" ? "定" : "理"), 1), i("div", null, [i("strong", null, h(e.position?.name || e.product?.name), 1), e.product ? (p(), b("small", Hc, h(e.product.lockLabel), 1)) : (p(), b("small", Kc, "当前本金 ¤ " + h(e.position?.principal.toLocaleString("zh-CN")), 1))])]),
      e.mode !== "withdraw" ? (p(), b("label", Gc, [
        m[5] || (m[5] = i("span", null, "开户金额", -1)),
        i("div", null, [m[4] || (m[4] = i("i", null, "¤", -1)), Pe(i("input", {
          "onUpdate:modelValue": m[0] || (m[0] = (A) => s.value = A),
          type: "text",
          inputmode: "numeric",
          autocomplete: "off",
          "aria-describedby": "bank-amount-help"
        }, null, 512), [[tt, s.value]])]),
        i("small", zc, "可用 " + h(e.balance.toLocaleString("zh-CN")) + " · 范围 " + h(e.product?.minAmount) + " - " + h(e.product?.maxAmount), 1)
      ])) : H("", !0),
      r.value ? (p(), b("p", Vc, h(r.value), 1)) : H("", !0),
      e.mode === "deposit-open" && u.value && !r.value ? (p(), b("dl", Wc, [i("div", null, [m[6] || (m[6] = i("dt", null, "锁定期限", -1)), i("dd", null, h(u.value.lockLabel), 1)]), i("div", null, [m[7] || (m[7] = i("dt", null, "到期兑付", -1)), i("dd", null, "¤ " + h(c.value.toLocaleString("zh-CN")), 1)])])) : H("", !0),
      e.mode === "fund-open" ? (p(), b("p", Yc, " 实际收益将在开户时封存，锁定期间不可退出，到期后才会揭晓并可领取。 ")) : H("", !0),
      e.mode === "withdraw" && e.position ? (p(), b("p", Xc, [
        m[8] || (m[8] = ve(" 将立即收回 ", -1)),
        i("strong", null, h(e.position.earlyWithdrawalAmount.toLocaleString("zh-CN")) + " 小白币", 1),
        ve("，相较本金损失 " + h((e.position.principal - e.position.earlyWithdrawalAmount).toLocaleString("zh-CN")) + " 小白币。此操作不可撤销。 ", 1)
      ])) : H("", !0),
      e.error ? (p(), b("p", Jc, h(e.error), 1)) : H("", !0),
      i("div", Qc, [i("button", {
        type: "button",
        disabled: e.busy,
        onClick: m[1] || (m[1] = (A) => w.$emit("cancel"))
      }, "取消", 8, Zc), i("button", {
        type: "submit",
        class: "is-primary",
        disabled: !d.value
      }, h(e.busy ? "正在封存…" : e.mode === "withdraw" ? `确认收回 ${e.position?.earlyWithdrawalAmount || 0}` : "确认开户"), 9, ef)])
    ], 32)], 40, Uc));
  }
}), af = tf, nf = { "aria-labelledby": "bank-deposits-title" }, sf = { class: "bank-product-grid" }, lf = { class: "bank-product-index" }, rf = { class: "bank-rate-block" }, of = { class: "bank-product-terms" }, uf = [
  "disabled",
  "title",
  "onClick"
], df = /* @__PURE__ */ re({
  __name: "BankDeposits",
  props: {
    products: {},
    balance: {},
    writeDisabledReason: {}
  },
  emits: ["open"],
  setup(e) {
    return (t, a) => (p(), b("section", nf, [
      a[6] || (a[6] = i("header", { class: "bank-section-heading" }, [i("div", null, [i("span", null, "FIXED CERTIFICATES"), i("h2", { id: "bank-deposits-title" }, "定期存单")]), i("small", null, "到期收益确定")], -1)),
      a[7] || (a[7] = i("p", { class: "bank-section-intro" }, "本金锁定至约定回合。到期前可提前支取，最终到账额会在确认时明确列出。", -1)),
      i("div", sf, [(p(!0), b(te, null, ce(e.products, (n, s) => (p(), b("article", {
        key: n.id,
        class: "bank-product-card bank-deposit-card"
      }, [
        i("header", null, [
          i("span", lf, "0" + h(s + 1), 1),
          i("div", null, [i("small", null, h(n.lockLabel), 1), i("h3", null, h(n.name), 1)]),
          a[0] || (a[0] = i("span", { class: "bank-product-seal" }, "定", -1))
        ]),
        i("div", rf, [
          a[1] || (a[1] = i("span", null, "到期收益率", -1)),
          i("strong", null, h(n.interestLabel), 1),
          a[2] || (a[2] = i("small", null, "固定收益", -1))
        ]),
        i("dl", of, [i("div", null, [a[3] || (a[3] = i("dt", null, "开户范围", -1)), i("dd", null, h(n.amountLabel), 1)]), i("div", null, [a[4] || (a[4] = i("dt", null, "提前支取", -1)), i("dd", null, h(n.earlyPenaltyLabel), 1)])]),
        i("button", {
          type: "button",
          disabled: !!e.writeDisabledReason || e.balance < n.minAmount,
          title: e.writeDisabledReason || (e.balance < n.minAmount ? "可用余额不足最低开户额" : ""),
          onClick: (l) => t.$emit("open", n)
        }, [...a[5] || (a[5] = [ve(" 开立存单", -1), i("span", null, "›", -1)])], 8, uf)
      ]))), 128))])
    ]));
  }
}), cf = df, ff = { "aria-labelledby": "bank-funds-title" }, vf = { class: "bank-product-grid" }, pf = { class: "bank-product-index" }, gf = { class: "bank-rate-block" }, mf = { class: "bank-product-terms" }, bf = [
  "disabled",
  "title",
  "onClick"
], hf = /* @__PURE__ */ re({
  __name: "BankFunds",
  props: {
    products: {},
    balance: {},
    writeDisabledReason: {}
  },
  emits: ["open"],
  setup(e) {
    return (t, a) => (p(), b("section", ff, [
      a[4] || (a[4] = i("header", { class: "bank-section-heading" }, [i("div", null, [i("span", null, "MANAGED FUNDS"), i("h2", { id: "bank-funds-title" }, "浮动理财")]), i("small", null, "到期前不揭晓结果")], -1)),
      a[5] || (a[5] = i("p", { class: "bank-section-intro" }, "收益在开户时封存，到期后才会公开。理财锁定期间不可提前退出。", -1)),
      i("div", vf, [(p(!0), b(te, null, ce(e.products, (n, s) => (p(), b("article", {
        key: n.id,
        class: "bank-product-card bank-fund-card"
      }, [
        i("header", null, [
          i("span", pf, "F" + h(s + 1), 1),
          i("div", null, [i("small", null, h(n.lockLabel), 1), i("h3", null, h(n.name), 1)]),
          i("span", { class: ae(["bank-risk-badge", `is-${n.riskLevel}`]) }, h(n.riskLabel), 3)
        ]),
        i("p", null, h(n.description), 1),
        i("div", gf, [
          a[0] || (a[0] = i("span", null, "合同收益区间", -1)),
          i("strong", null, h(n.returnLabel), 1),
          a[1] || (a[1] = i("small", null, "实际结果到期可见", -1))
        ]),
        i("dl", mf, [i("div", null, [a[2] || (a[2] = i("dt", null, "开户范围", -1)), i("dd", null, h(n.amountLabel), 1)])]),
        i("button", {
          type: "button",
          disabled: !!e.writeDisabledReason || e.balance < n.minAmount,
          title: e.writeDisabledReason || (e.balance < n.minAmount ? "可用余额不足最低开户额" : ""),
          onClick: (l) => t.$emit("open", n)
        }, [...a[3] || (a[3] = [ve(" 申购理财", -1), i("span", null, "›", -1)])], 8, bf)
      ]))), 128))])
    ]));
  }
}), yf = hf, kf = { "aria-labelledby": "bank-positions-title" }, wf = { class: "bank-section-heading" }, xf = ["disabled"], Sf = {
  key: 0,
  class: "bank-empty-state"
}, _f = {
  key: 1,
  class: "bank-position-group"
}, $f = { class: "bank-position-top" }, Cf = { key: 0 }, Af = { class: "is-loss" }, Mf = [
  "disabled",
  "title",
  "onClick"
], Tf = {
  key: 1,
  class: "bank-due-note"
}, Ef = {
  key: 2,
  class: "bank-position-group"
}, If = { class: "bank-position-top" }, Pf = {
  key: 0,
  class: "bank-fund-result"
}, Of = {
  key: 1,
  class: "bank-sealed-copy"
}, Lf = /* @__PURE__ */ re({
  __name: "BankPositions",
  props: {
    deposits: {},
    investments: {},
    claimableCount: {},
    writeDisabledReason: {}
  },
  emits: ["withdraw", "settle"],
  setup(e) {
    return (t, a) => (p(), b("section", kf, [
      i("header", wf, [a[1] || (a[1] = i("div", null, [i("span", null, "SEALED POSITIONS"), i("h2", { id: "bank-positions-title" }, "我的头寸")], -1)), e.claimableCount ? (p(), b("button", {
        key: 0,
        type: "button",
        class: "bank-small-claim",
        disabled: !!e.writeDisabledReason,
        onClick: a[0] || (a[0] = (n) => t.$emit("settle"))
      }, " 领取全部 " + h(e.claimableCount) + " 笔 ", 9, xf)) : H("", !0)]),
      !e.deposits.length && !e.investments.length ? (p(), b("div", Sf, [...a[2] || (a[2] = [
        i("span", null, "◇", -1),
        i("strong", null, "金库尚无头寸", -1),
        i("p", null, "从定期或理财页面选择一份产品开始配置资产。", -1)
      ])])) : H("", !0),
      e.deposits.length ? (p(), b("div", _f, [i("header", null, [a[3] || (a[3] = i("h3", null, "定期存单", -1)), i("span", null, h(e.deposits.length), 1)]), (p(!0), b(te, null, ce(e.deposits, (n) => (p(), b("article", {
        key: n.id,
        class: "bank-position-card"
      }, [
        i("div", $f, [
          a[4] || (a[4] = i("span", { class: "bank-position-mark" }, "定", -1)),
          i("div", null, [i("h4", null, h(n.name), 1), i("small", null, "本金 ¤ " + h(n.principal.toLocaleString("zh-CN")), 1)]),
          i("span", { class: ae(["bank-position-status", { "is-due": n.claimable }]) }, h(n.statusLabel), 3)
        ]),
        i("dl", null, [i("div", null, [a[5] || (a[5] = i("dt", null, "到期兑付", -1)), i("dd", null, "¤ " + h(n.maturityAmount.toLocaleString("zh-CN")), 1)]), n.claimable ? H("", !0) : (p(), b("div", Cf, [a[6] || (a[6] = i("dt", null, "现在支取", -1)), i("dd", Af, "¤ " + h(n.earlyWithdrawalAmount.toLocaleString("zh-CN")), 1)]))]),
        n.claimable ? (p(), b("span", Tf, "将在“领取全部”时统一兑付")) : (p(), b("button", {
          key: 0,
          type: "button",
          class: "bank-withdraw-button",
          disabled: !!e.writeDisabledReason,
          title: e.writeDisabledReason,
          onClick: (s) => t.$emit("withdraw", n)
        }, " 提前支取 ", 8, Mf))
      ]))), 128))])) : H("", !0),
      e.investments.length ? (p(), b("div", Ef, [i("header", null, [a[7] || (a[7] = i("h3", null, "浮动理财", -1)), i("span", null, h(e.investments.length), 1)]), (p(!0), b(te, null, ce(e.investments, (n) => (p(), b("article", {
        key: n.id,
        class: "bank-position-card"
      }, [i("div", If, [
        a[8] || (a[8] = i("span", { class: "bank-position-mark" }, "理", -1)),
        i("div", null, [i("h4", null, h(n.name), 1), i("small", null, h(n.riskLabel) + " · 本金 ¤ " + h(n.principal.toLocaleString("zh-CN")), 1)]),
        i("span", { class: ae(["bank-position-status", { "is-due": n.claimable }]) }, h(n.statusLabel), 3)
      ]), n.claimable ? (p(), b("div", Pf, [
        a[9] || (a[9] = i("span", null, "封存结果已揭晓", -1)),
        i("strong", { class: ae({ "is-negative": n.resolvedReturnBps < 0 }) }, h(n.returnLabel), 3),
        i("small", null, "可兑付 ¤ " + h(n.settlementAmount.toLocaleString("zh-CN")), 1)
      ])) : (p(), b("p", Of, "收益结果仍在金库中封存，到期前不会公开。"))]))), 128))])) : H("", !0)
    ]));
  }
}), Rf = Lf, Df = { "aria-labelledby": "bank-records-title" }, Bf = { class: "bank-section-heading" }, Nf = {
  key: 0,
  class: "bank-empty-state"
}, qf = {
  key: 1,
  class: "bank-record-list"
}, Uf = { class: "bank-record-mark" }, Ff = { class: "bank-record-main" }, jf = {
  key: 0,
  class: "bank-inline-error",
  role: "alert"
}, Hf = ["disabled"], Kf = {
  key: 2,
  class: "bank-record-end"
}, Gf = /* @__PURE__ */ re({
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
    return (a, n) => (p(), b("section", Df, [i("header", Bf, [n[1] || (n[1] = i("div", null, [i("span", null, "SETTLEMENT ARCHIVE"), i("h2", { id: "bank-records-title" }, "金融记录")], -1)), i("small", null, h(e.total) + " 笔", 1)]), e.activities.length ? (p(), b("div", qf, [
      (p(!0), b(te, null, ce(e.activities, (s) => (p(), b("article", {
        key: s.id,
        class: "bank-record-row"
      }, [
        i("span", Uf, h(s.kind === "deposit" ? "定" : "理"), 1),
        i("div", Ff, [
          i("header", null, [i("strong", null, h(s.productName), 1), i("span", null, h(s.resultLabel), 1)]),
          i("dl", null, [i("div", null, [n[3] || (n[3] = i("dt", null, "投入", -1)), i("dd", null, "¤ " + h(s.amountIn.toLocaleString("zh-CN")), 1)]), i("div", null, [n[4] || (n[4] = i("dt", null, "兑付", -1)), i("dd", null, "¤ " + h(s.payout.toLocaleString("zh-CN")), 1)])]),
          i("small", null, h(s.turnLabel) + " · " + h(fe(t).format(s.createdAt)), 1)
        ]),
        i("strong", { class: ae(["bank-record-net", {
          "is-negative": s.net < 0,
          "is-flat": s.net === 0
        }]) }, [ve(h(s.net > 0 ? "+" : "") + h(s.net) + " ", 1), i("small", null, h(s.netLabel), 1)], 2)
      ]))), 128)),
      e.error ? (p(), b("p", jf, h(e.error), 1)) : H("", !0),
      e.hasMore ? (p(), b("button", {
        key: 1,
        type: "button",
        class: "bank-load-more",
        disabled: e.loadingMore,
        onClick: n[0] || (n[0] = (s) => a.$emit("loadMore"))
      }, h(e.loadingMore ? "正在开启下一册…" : "载入更多记录"), 9, Hf)) : (p(), b("p", Kf, "金库档案已全部展开"))
    ])) : (p(), b("div", Nf, [...n[2] || (n[2] = [
      i("span", null, "簿", -1),
      i("strong", null, "尚无兑付记录", -1),
      i("p", null, "头寸到期领取或提前支取后，结果会归档在这里。", -1)
    ])]))]));
  }
}), zf = Gf, Vf = {
  class: "bank-vault",
  "aria-labelledby": "bank-vault-title"
}, Wf = { class: "bank-section-heading bank-vault-heading" }, Yf = { class: "bank-balance-panel" }, Xf = { class: "bank-vault-metrics" }, Jf = ["disabled", "title"], Qf = { class: "bank-vault-portals" }, Zf = /* @__PURE__ */ re({
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
    return (t, a) => (p(), b("section", Vf, [
      a[18] || (a[18] = i("div", {
        class: "bank-vault-door",
        "aria-hidden": "true"
      }, [i("div", { class: "bank-vault-ring" }, [
        i("span", null, "III"),
        i("i"),
        i("span", null, "VI"),
        i("i"),
        i("span", null, "IX")
      ])], -1)),
      i("header", Wf, [a[4] || (a[4] = i("div", null, [i("span", null, "PRIVATE RESERVE"), i("h2", { id: "bank-vault-title" }, "金库总览")], -1)), i("small", null, "第 " + h(e.currentTurn) + " 回合", 1)]),
      i("div", Yf, [
        a[6] || (a[6] = i("span", null, "可用资产", -1)),
        i("strong", null, [a[5] || (a[5] = i("small", null, "¤", -1)), ve(h(e.balance.toLocaleString("zh-CN")), 1)]),
        a[7] || (a[7] = i("div", null, [i("span", null, "小白币活期余额"), i("i", null, "AVAILABLE")], -1))
      ]),
      i("div", Xf, [i("article", null, [
        a[8] || (a[8] = i("span", null, "锁定本金", -1)),
        i("strong", null, "¤ " + h(e.lockedAmount.toLocaleString("zh-CN")), 1),
        i("small", null, h(e.depositCount + e.fundCount) + " 笔持仓", 1)
      ]), i("article", { class: ae({ "is-claimable": e.claimableCount > 0 }) }, [
        a[9] || (a[9] = i("span", null, "待领取", -1)),
        i("strong", null, h(e.claimableCount), 1),
        i("small", null, h(e.claimableCount ? "已到期，可统一兑付" : "暂无到期头寸"), 1)
      ], 2)]),
      e.claimableCount ? (p(), b("button", {
        key: 0,
        type: "button",
        class: "bank-claim-button",
        disabled: !!e.writeDisabledReason,
        title: e.writeDisabledReason,
        onClick: a[0] || (a[0] = (n) => t.$emit("settle"))
      }, [a[10] || (a[10] = i("span", null, "领取全部到期资产", -1)), i("small", null, h(e.claimableCount) + " 笔一并结算", 1)], 8, Jf)) : H("", !0),
      i("div", Qf, [
        i("button", {
          type: "button",
          onClick: a[1] || (a[1] = (n) => t.$emit("navigate", "deposits"))
        }, [
          a[11] || (a[11] = i("span", { class: "bank-portal-mark" }, "定", -1)),
          a[12] || (a[12] = i("strong", null, "定期存单", -1)),
          i("small", null, h(e.depositCount) + " 笔持有", 1),
          a[13] || (a[13] = i("i", null, "›", -1))
        ]),
        i("button", {
          type: "button",
          onClick: a[2] || (a[2] = (n) => t.$emit("navigate", "funds"))
        }, [
          a[14] || (a[14] = i("span", { class: "bank-portal-mark" }, "理", -1)),
          a[15] || (a[15] = i("strong", null, "浮动理财", -1)),
          i("small", null, h(e.fundCount) + " 笔持有", 1),
          a[16] || (a[16] = i("i", null, "›", -1))
        ]),
        i("button", {
          type: "button",
          onClick: a[3] || (a[3] = (n) => t.$emit("navigate", "records"))
        }, [...a[17] || (a[17] = [
          i("span", { class: "bank-portal-mark" }, "簿", -1),
          i("strong", null, "金融记录", -1),
          i("small", null, "查阅历史兑付", -1),
          i("i", null, "›", -1)
        ])])
      ])
    ]));
  }
}), ev = Zf, tv = { class: "bank-app" }, av = { class: "bank-header" }, nv = { class: "bank-header-balance" }, sv = ["disabled"], iv = {
  class: "bank-navigation",
  "aria-label": "银行页面"
}, lv = { key: 0 }, rv = ["disabled"], ov = ["disabled"], uv = { class: "bank-scroll" }, La = 35e3, dv = /* @__PURE__ */ re({
  __name: "BankApp",
  props: {
    bridge: {},
    initialState: {}
  },
  setup(e) {
    const t = e, a = /* @__PURE__ */ W(structuredClone(/* @__PURE__ */ ie(t.initialState))), n = /* @__PURE__ */ W("vault"), s = /* @__PURE__ */ W(null), l = /* @__PURE__ */ W(!1), o = /* @__PURE__ */ W(!1), r = /* @__PURE__ */ W(!1), u = /* @__PURE__ */ W(""), c = /* @__PURE__ */ W(""), d = /* @__PURE__ */ W("");
    let y = null, w = () => {
    }, m = 0;
    const A = z(() => a.value.status === "unconfirmed"), P = z(() => o.value ? "正在处理上一项银行操作" : l.value ? "正在刷新金库状态" : a.value.status !== "ready" ? a.value.message || "金库暂时不可写入" : a.value.generationActive ? "主剧情正在生成，请等待回复完成" : ""), R = z(() => l.value || o.value || A.value);
    function q() {
      return typeof globalThis.crypto?.randomUUID == "function" ? `bank-ui:${globalThis.crypto.randomUUID()}` : `bank-ui:${Date.now()}:${Math.random().toString(36).slice(2, 10)}`;
    }
    function U() {
      return { chatIdentity: a.value.chatIdentity };
    }
    function L(J) {
      a.value = structuredClone(J), l.value = !1, r.value = !1, u.value = "", d.value = "", J.claimableCount === 0 && (y = null);
    }
    function M(J) {
      const j = J instanceof Error ? J.message : String(J);
      return j.includes("economy_insufficient_funds") || j.includes("cannot be overdrawn") ? "可用小白币不足，开户未完成。" : j.includes("bank_amount_out_of_range") ? "开户金额不在该产品允许范围内。" : j.includes("bank_amount_invalid") ? "开户金额必须是正整数。" : j.includes("bank_revision_conflict") || j.includes("bank_event_id_conflict") ? "金库状态已变化，请关闭确认框并刷新后重试。" : j.includes("bank_position_missing") || j.includes("bank_position_state_changed") ? "该头寸状态已经变化，请刷新金库。" : j.includes("bank_no_due_positions") ? "当前没有可领取的到期头寸。" : j === "host_request_timeout" ? "等待保存结果超时，请保留当前页面并重试。" : "银行操作未完成，请稍后重试。";
    }
    async function _() {
      if (R.value) return;
      const J = ++m;
      l.value = !0, u.value = "";
      try {
        const j = await t.bridge.request("bank/refresh", U(), La);
        J === m && L(j.result);
      } catch (j) {
        J === m && (u.value = M(j));
      } finally {
        J === m && (l.value = !1);
      }
    }
    async function T() {
      if (l.value || o.value) return;
      const J = ++m;
      l.value = !0, u.value = "";
      try {
        const j = await t.bridge.request("bank/confirm-save", U(), La);
        J === m && L(j.result.state);
      } catch (j) {
        J === m && (u.value = M(j));
      } finally {
        J === m && (l.value = !1);
      }
    }
    function S(J, j) {
      P.value || (c.value = "", s.value = {
        mode: j,
        product: J,
        actionId: q()
      });
    }
    function $(J) {
      P.value || (c.value = "", s.value = {
        mode: "withdraw",
        position: J,
        actionId: q()
      });
    }
    function C() {
      o.value || (s.value = null, c.value = "");
    }
    async function G(J) {
      const j = s.value;
      if (!j || o.value) return;
      const ue = m;
      o.value = !0, c.value = "";
      const he = j.mode === "deposit-open" ? "bank/deposit/open" : j.mode === "fund-open" ? "bank/fund/open" : "bank/deposit/withdraw";
      try {
        const de = await t.bridge.request(he, {
          ...U(),
          expectedRevision: a.value.revision,
          expectedEventId: a.value.eventId,
          actionId: j.actionId,
          ...j.product ? {
            productId: j.product.id,
            amount: J
          } : {},
          ...j.position ? { positionId: j.position.id } : {}
        }, La);
        if (ue !== m || s.value !== j) return;
        L(de.result), s.value = null;
      } catch (de) {
        ue === m && s.value === j && (c.value = M(de));
      } finally {
        ue === m && (o.value = !1);
      }
    }
    async function Z() {
      if (P.value || a.value.claimableCount === 0) return;
      const J = m;
      y ||= q();
      const j = y;
      o.value = !0, u.value = "";
      try {
        const ue = await t.bridge.request("bank/settle-due", {
          ...U(),
          expectedRevision: a.value.revision,
          expectedEventId: a.value.eventId,
          actionId: j
        }, La);
        if (J !== m) return;
        y = null, L(ue.result);
      } catch (ue) {
        J === m && (u.value = M(ue));
      } finally {
        J === m && (o.value = !1);
      }
    }
    async function X() {
      if (!a.value.activityPage.hasMore || r.value || o.value) return;
      const J = m, j = a.value.activities.length;
      r.value = !0, d.value = "";
      try {
        const ue = await t.bridge.request("bank/records/load-more", {
          ...U(),
          offset: j
        }, La);
        if (J !== m) return;
        const he = new Set(a.value.activities.map((de) => de.id));
        a.value.activities.push(...ue.result.activities.filter((de) => !he.has(de.id))), a.value.activityPage = ue.result.activityPage;
      } catch (ue) {
        J === m && (d.value = M(ue));
      } finally {
        J === m && (r.value = !1);
      }
    }
    return nt(() => {
      w = t.bridge.subscribe((J) => {
        J.type === "bank/state" && (o.value || (m += 1), L(J.payload.state)), J.type === "bank/error" && (u.value = M(J.payload?.message || ""));
      });
    }), ct(() => {
      m += 1, w(), s.value = null, y = null;
    }), (J, j) => (p(), b("main", tv, [
      i("header", av, [
        j[10] || (j[10] = i("div", null, [i("span", { class: "bank-header-kicker" }, "JADE RESERVE · 01"), i("h1", null, "白银金库")], -1)),
        i("div", nv, [j[8] || (j[8] = i("small", null, "可用余额", -1)), i("strong", null, "¤ " + h(a.value.balance.toLocaleString("zh-CN")), 1)]),
        i("button", {
          type: "button",
          class: "bank-refresh",
          disabled: R.value,
          title: "重新读取金库",
          onClick: _
        }, [...j[9] || (j[9] = [i("svg", {
          viewBox: "0 0 24 24",
          "aria-hidden": "true"
        }, [i("path", { d: "M20 7v5h-5M4 17v-5h5M18.2 9A7 7 0 0 0 6.1 6.7L4 9m16 6-2.1 2.3A7 7 0 0 1 5.8 15" })], -1), i("span", { class: "bank-sr-only" }, "重新读取金库", -1)])], 8, sv)
      ]),
      i("nav", iv, [
        i("button", {
          type: "button",
          class: ae({ "is-active": n.value === "vault" }),
          onClick: j[0] || (j[0] = (ue) => n.value = "vault")
        }, [...j[11] || (j[11] = [i("span", null, "总览", -1)])], 2),
        i("button", {
          type: "button",
          class: ae({ "is-active": n.value === "deposits" }),
          onClick: j[1] || (j[1] = (ue) => n.value = "deposits")
        }, [...j[12] || (j[12] = [i("span", null, "定期", -1)])], 2),
        i("button", {
          type: "button",
          class: ae({ "is-active": n.value === "funds" }),
          onClick: j[2] || (j[2] = (ue) => n.value = "funds")
        }, [...j[13] || (j[13] = [i("span", null, "理财", -1)])], 2),
        i("button", {
          type: "button",
          class: ae({ "is-active": n.value === "positions" }),
          onClick: j[3] || (j[3] = (ue) => n.value = "positions")
        }, [j[14] || (j[14] = i("span", null, "头寸", -1)), a.value.claimableCount ? (p(), b("i", lv, h(a.value.claimableCount), 1)) : H("", !0)], 2),
        i("button", {
          type: "button",
          class: ae({ "is-active": n.value === "records" }),
          onClick: j[4] || (j[4] = (ue) => n.value = "records")
        }, [...j[15] || (j[15] = [i("span", null, "记录", -1)])], 2)
      ]),
      a.value.message || u.value ? (p(), b("aside", {
        key: 0,
        class: ae(["bank-notice", `is-${a.value.status}`]),
        role: "status"
      }, [j[16] || (j[16] = i("span", { "aria-hidden": "true" }, "鉴", -1)), i("div", null, [
        i("strong", null, h(u.value && a.value.status === "ready" ? "操作未完成" : a.value.statusLabel), 1),
        i("p", null, h(u.value || a.value.message), 1),
        A.value ? (p(), b("button", {
          key: 0,
          type: "button",
          disabled: l.value,
          onClick: T
        }, h(l.value ? "正在核实…" : "核实保存结果"), 9, rv)) : a.value.status === "blocked" || a.value.status === "conflict" ? (p(), b("button", {
          key: 1,
          type: "button",
          disabled: l.value,
          onClick: _
        }, h(l.value ? "正在读取…" : "重新读取金库"), 9, ov)) : H("", !0)
      ])], 2)) : H("", !0),
      i("div", uv, [n.value === "vault" ? (p(), be(ev, {
        key: 0,
        balance: a.value.balance,
        "locked-amount": a.value.lockedAmount,
        "current-turn": a.value.currentTurn,
        "deposit-count": a.value.deposits.length,
        "fund-count": a.value.investments.length,
        "claimable-count": a.value.claimableCount,
        "write-disabled-reason": P.value,
        onNavigate: j[5] || (j[5] = (ue) => n.value = ue),
        onSettle: Z
      }, null, 8, [
        "balance",
        "locked-amount",
        "current-turn",
        "deposit-count",
        "fund-count",
        "claimable-count",
        "write-disabled-reason"
      ])) : n.value === "deposits" ? (p(), be(cf, {
        key: 1,
        products: a.value.products.deposits,
        balance: a.value.balance,
        "write-disabled-reason": P.value,
        onOpen: j[6] || (j[6] = (ue) => S(ue, "deposit-open"))
      }, null, 8, [
        "products",
        "balance",
        "write-disabled-reason"
      ])) : n.value === "funds" ? (p(), be(yf, {
        key: 2,
        products: a.value.products.funds,
        balance: a.value.balance,
        "write-disabled-reason": P.value,
        onOpen: j[7] || (j[7] = (ue) => S(ue, "fund-open"))
      }, null, 8, [
        "products",
        "balance",
        "write-disabled-reason"
      ])) : n.value === "positions" ? (p(), be(Rf, {
        key: 3,
        deposits: a.value.deposits,
        investments: a.value.investments,
        "claimable-count": a.value.claimableCount,
        "write-disabled-reason": P.value,
        onWithdraw: $,
        onSettle: Z
      }, null, 8, [
        "deposits",
        "investments",
        "claimable-count",
        "write-disabled-reason"
      ])) : (p(), be(zf, {
        key: 4,
        activities: a.value.activities,
        total: a.value.activityPage.total,
        "has-more": a.value.activityPage.hasMore,
        "loading-more": r.value,
        error: d.value,
        onLoadMore: X
      }, null, 8, [
        "activities",
        "total",
        "has-more",
        "loading-more",
        "error"
      ]))]),
      s.value ? (p(), be(af, {
        key: 1,
        mode: s.value.mode,
        product: s.value.product,
        position: s.value.position,
        balance: a.value.balance,
        busy: o.value,
        error: c.value,
        onCancel: C,
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
}), cv = dv, fv = Object.freeze({
  id: "game",
  name: "游戏",
  accent: "#c8a35a"
}), vv = { class: "game-dialog-card" }, pv = {
  key: 0,
  class: "game-inline-error",
  role: "status"
}, gv = { class: "game-dialog-actions" }, mv = ["disabled"], bv = ["disabled"], hv = /* @__PURE__ */ re({
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
    return (t, a) => (p(), b("dialog", {
      open: "",
      class: "game-dialog",
      onCancel: a[2] || (a[2] = ut((n) => t.$emit("cancel"), ["prevent"]))
    }, [i("section", vv, [
      a[3] || (a[3] = i("span", { class: "game-eyebrow" }, "FINAL CALL", -1)),
      i("h2", null, h(e.heading), 1),
      i("p", null, h(e.summary), 1),
      e.error ? (p(), b("p", pv, h(e.error), 1)) : H("", !0),
      i("div", gv, [i("button", {
        type: "button",
        disabled: e.busy,
        onClick: a[0] || (a[0] = (n) => t.$emit("cancel"))
      }, "再想想", 8, mv), i("button", {
        type: "button",
        class: ae(["is-primary", { "is-danger": e.danger }]),
        disabled: e.busy,
        onClick: a[1] || (a[1] = (n) => t.$emit("confirm"))
      }, h(e.busy ? "正在落账…" : e.confirmLabel), 11, bv)])
    ])], 32));
  }
}), yv = hv, Ar = {
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
}, kv = ["aria-label"], wv = { class: "game-die-stage" }, xv = { class: "game-die-pips" }, Sv = "rotateX(-17deg) rotateY(26deg)", zi = 1100, _v = /* @__PURE__ */ re({
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
    function s(w, m) {
      return `${Sv} rotateX(${w}deg) rotateY(${m}deg)`;
    }
    function l() {
      return typeof window < "u" && typeof window.matchMedia == "function" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    }
    const o = /* @__PURE__ */ W(null), r = /* @__PURE__ */ W(null);
    let u = null, c = null;
    function d() {
      const [w, m] = n[t.value];
      o.value && (o.value.style.transform = s(w, m));
    }
    function y() {
      const w = o.value;
      if (!w) return;
      if (u?.cancel(), c?.cancel(), u = null, c = null, l() || typeof w.animate != "function") {
        d();
        return;
      }
      const [m, A] = n[t.value], P = 360 * (2 + Math.floor(Math.random() * 2)) + 146, R = 360 * (1 + Math.floor(Math.random() * 2)) + 101;
      u = w.animate([
        {
          transform: s(m - P, A - R),
          easing: "cubic-bezier(.11,.58,.32,1)"
        },
        {
          transform: s(m + 13, A + 9),
          offset: 0.84,
          easing: "cubic-bezier(.36,0,.4,1)"
        },
        { transform: s(m, A) }
      ], {
        duration: zi,
        delay: t.delay,
        fill: "both"
      }), c = r.value?.animate([
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
        duration: zi,
        delay: t.delay,
        fill: "both"
      }) ?? null;
    }
    return nt(y), _a(() => {
      u?.cancel(), c?.cancel();
    }), at(() => t.value, y), (w, m) => (p(), b("div", {
      ref_key: "shell",
      ref: r,
      class: ae(["game-die", { "is-hit": e.highlight }]),
      role: "img",
      "aria-label": `骰子 ${e.value} 点`
    }, [i("div", wv, [i("div", {
      ref_key: "cube",
      ref: o,
      class: "game-die-cube"
    }, [(p(), b(te, null, ce(a, (A) => i("div", {
      key: A.side,
      class: ae(["game-die-face", A.side])
    }, [i("div", xv, [(p(!0), b(te, null, ce(fe(Ar)[A.face], ([P, R], q) => (p(), b("i", {
      key: q,
      class: "game-die-pip",
      style: _t({ gridArea: `${P} / ${R}` })
    }, null, 4))), 128))])], 2)), 64))], 512)])], 10, kv));
  }
}), xs = _v, $v = {
  class: "game-table game-dice-table",
  "aria-labelledby": "game-dice-title"
}, Cv = { class: "game-table-heading" }, Av = { class: "game-dice-cloth" }, Mv = { class: "game-dealer-position" }, Tv = {
  key: 0,
  class: "game-current-bid"
}, Ev = {
  key: 1,
  class: "game-current-bid is-empty"
}, Iv = { class: "game-player-hand" }, Pv = { class: "game-dice-row" }, Ov = {
  key: 0,
  class: "game-bid-builder"
}, Lv = {
  class: "game-bid-count",
  role: "group",
  "aria-label": "叫牌数量"
}, Rv = ["disabled"], Dv = ["disabled"], Bv = {
  class: "game-bid-faces",
  role: "group",
  "aria-label": "叫牌点数"
}, Nv = [
  "disabled",
  "aria-pressed",
  "aria-label",
  "onClick"
], qv = { class: "game-face-pips" }, Uv = { class: "game-dice-controls" }, Fv = ["disabled", "title"], jv = ["disabled", "title"], Hv = ["disabled", "title"], Kv = {
  key: 1,
  class: "game-bid-history",
  "aria-label": "公开叫牌记录"
}, Gv = /* @__PURE__ */ re({
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
    const a = e, n = t, s = [
      2,
      3,
      4,
      5,
      6
    ], l = a.game.legalBids[0] || {
      count: 1,
      face: 2
    }, o = /* @__PURE__ */ W(l.count), r = /* @__PURE__ */ W(l.face), u = z(() => a.game.bids.at(-1) || null), c = z(() => a.game.legalBids[0] || null), d = z(() => {
      const R = a.game.legalBids.map((q) => q.count);
      return R.length === 0 ? {
        min: 1,
        max: 10
      } : {
        min: Math.min(...R),
        max: Math.max(...R)
      };
    }), y = z(() => a.game.legalBids.find((R) => R.count === o.value && R.face === r.value) || null);
    function w(R) {
      return a.game.legalBids.some((q) => q.face === R);
    }
    function m(R) {
      const q = o.value + R, { min: U, max: L } = d.value;
      q >= U && q <= L && (o.value = q);
    }
    at(() => d.value.min, (R) => {
      o.value < R && (o.value = R);
    });
    function A() {
      y.value && !a.writeDisabledReason && n("bid", {
        count: y.value.count,
        face: y.value.face
      });
    }
    function P() {
      const R = c.value;
      R && !a.writeDisabledReason && (o.value = R.count, r.value = R.face, n("bid", {
        count: R.count,
        face: R.face
      }));
    }
    return (R, q) => (p(), b("section", $v, [
      i("header", Cv, [
        i("button", {
          type: "button",
          class: "game-back",
          onClick: q[0] || (q[0] = (U) => n("lobby"))
        }, "返回大厅"),
        q[4] || (q[4] = i("div", null, [i("span", null, "LIAR'S DICE"), i("h2", { id: "game-dice-title" }, "秘骰对决")], -1)),
        i("strong", null, "托管 ¤ " + h(e.game.bet), 1)
      ]),
      i("div", Av, [
        i("div", Mv, [q[5] || (q[5] = i("span", {
          class: "game-dealer-chip",
          "aria-hidden": "true"
        }, "庄", -1)), i("p", null, h(u.value?.by === "dealer" ? "庄家已经加叫，轮到你决断。" : "庄家静候你的第一口价。"), 1)]),
        u.value ? (p(), b("div", Tv, [
          q[6] || (q[6] = i("small", null, "桌面叫数", -1)),
          i("strong", null, h(u.value.count), 1),
          i("span", null, "枚 " + h(u.value.face) + " 点", 1),
          i("em", null, h(u.value.by === "dealer" ? "庄家" : "你") + "叫牌", 1)
        ])) : (p(), b("div", Ev, [...q[7] || (q[7] = [i("span", null, "等待首轮叫牌", -1)])])),
        i("div", Iv, [
          q[8] || (q[8] = i("span", null, "你的骰子", -1)),
          i("div", Pv, [(p(!0), b(te, null, ce(e.game.playerDice, (U, L) => (p(), be(xs, {
            key: L,
            value: U,
            delay: L * 85
          }, null, 8, ["value", "delay"]))), 128))]),
          q[9] || (q[9] = i("small", null, "一点可代替任意叫面", -1))
        ])
      ]),
      e.game.legalActions.includes("bid") ? (p(), b("div", Ov, [i("div", Lv, [
        i("button", {
          type: "button",
          disabled: !!e.writeDisabledReason || o.value <= d.value.min,
          "aria-label": "减少数量",
          onClick: q[1] || (q[1] = (U) => m(-1))
        }, " − ", 8, Rv),
        i("strong", null, h(o.value), 1),
        i("button", {
          type: "button",
          disabled: !!e.writeDisabledReason || o.value >= d.value.max,
          "aria-label": "增加数量",
          onClick: q[2] || (q[2] = (U) => m(1))
        }, " + ", 8, Dv),
        q[10] || (q[10] = i("small", null, "枚", -1))
      ]), i("div", Bv, [(p(), b(te, null, ce(s, (U) => i("button", {
        key: U,
        type: "button",
        class: ae(["game-face-chip", { "is-active": U === r.value }]),
        disabled: !!e.writeDisabledReason || !w(U),
        "aria-pressed": U === r.value,
        "aria-label": `${U} 点`,
        onClick: (L) => r.value = U
      }, [i("span", qv, [(p(!0), b(te, null, ce(fe(Ar)[U], ([L, M], _) => (p(), b("i", {
        key: _,
        style: _t({ gridArea: `${L} / ${M}` })
      }, null, 4))), 128))])], 10, Nv)), 64))])])) : H("", !0),
      i("div", Uv, [
        e.game.legalActions.includes("bid") && c.value ? (p(), b("button", {
          key: 0,
          type: "button",
          class: "game-table-button game-min-raise",
          disabled: !!e.writeDisabledReason,
          title: e.writeDisabledReason,
          onClick: P
        }, " 最小加叫 " + h(c.value.count) + " × " + h(c.value.face), 9, Fv)) : H("", !0),
        e.game.legalActions.includes("bid") ? (p(), b("button", {
          key: 1,
          type: "button",
          class: "game-primary-action",
          disabled: !!e.writeDisabledReason || !y.value,
          title: y.value ? e.writeDisabledReason : "这口叫数不高于桌面叫数",
          onClick: A
        }, " 加叫 " + h(o.value) + " × " + h(r.value), 9, jv)) : H("", !0),
        e.game.legalActions.includes("challenge") ? (p(), b("button", {
          key: 2,
          type: "button",
          class: "game-danger-action",
          disabled: !!e.writeDisabledReason,
          title: e.writeDisabledReason,
          onClick: q[3] || (q[3] = (U) => n("challenge"))
        }, " 质疑 ", 8, Hv)) : H("", !0)
      ]),
      e.game.bids.length ? (p(), b("ol", Kv, [(p(!0), b(te, null, ce(e.game.bids, (U, L) => (p(), b("li", { key: `${L}:${U.count}:${U.face}` }, [i("span", null, h(U.by === "player" ? "你" : "庄家"), 1), i("strong", null, h(U.count) + " × " + h(U.face) + " 点", 1)]))), 128))])) : H("", !0)
    ]));
  }
}), zv = Gv, Vv = {
  class: "game-table game-dice-reveal",
  "aria-labelledby": "game-reveal-title"
}, Wv = { class: "game-table-heading" }, Yv = { class: "game-reveal-side" }, Xv = { class: "game-dice-row" }, Jv = { class: "game-reveal-side" }, Qv = { class: "game-dice-row" }, Zv = {
  key: 0,
  class: "game-reveal-tally"
}, ep = {
  key: 1,
  class: "game-reveal-hint"
}, ls = 85, tp = 1500, Vi = 700, ap = 620, np = /* @__PURE__ */ re({
  __name: "GameDiceReveal",
  props: {
    record: {},
    detail: {}
  },
  emits: ["done"],
  setup(e, { emit: t }) {
    const a = e, n = t, s = [
      "rolling",
      "counting",
      "verdict",
      "settled"
    ], l = /* @__PURE__ */ W("rolling"), o = [];
    function r(P) {
      return s.indexOf(l.value) >= s.indexOf(P);
    }
    function u() {
      for (; o.length > 0; ) {
        const P = o.pop();
        P !== void 0 && window.clearTimeout(P);
      }
    }
    function c() {
      u(), l.value = "settled";
    }
    function d(P) {
      return P === 1 || P === a.detail.finalBid.face;
    }
    const y = z(() => a.detail.dealerDice.length * ls), w = z(() => a.detail.matchingDiceCount >= a.detail.finalBid.count), m = z(() => a.detail.challenger === "player" ? "你" : "庄家"), A = z(() => a.detail.finalBid.by === "player" ? "你" : "庄家");
    return nt(() => {
      if (typeof window > "u") {
        l.value = "settled";
        return;
      }
      const P = y.value + tp;
      o.push(window.setTimeout(() => {
        l.value = "counting";
      }, P)), o.push(window.setTimeout(() => {
        l.value = "verdict";
      }, P + Vi)), o.push(window.setTimeout(() => {
        l.value = "settled";
      }, P + Vi + ap));
    }), _a(u), (P, R) => (p(), b("section", Vv, [
      i("header", Wv, [
        R[2] || (R[2] = i("span", { class: "game-reveal-eyebrow" }, "SHOWDOWN", -1)),
        i("div", null, [i("span", null, h(m.value) + "提出质疑", 1), R[1] || (R[1] = i("h2", { id: "game-reveal-title" }, "摊牌", -1))]),
        i("strong", null, h(A.value) + "叫 " + h(e.detail.finalBid.count) + " × " + h(e.detail.finalBid.face) + " 点", 1)
      ]),
      i("div", {
        class: "game-reveal-cloth",
        onClick: c
      }, [
        i("div", Yv, [R[3] || (R[3] = i("span", null, "庄家", -1)), i("div", Xv, [(p(!0), b(te, null, ce(e.detail.dealerDice, (q, U) => (p(), be(xs, {
          key: `dealer:${U}`,
          value: q,
          delay: U * ls,
          highlight: r("counting") && d(q)
        }, null, 8, [
          "value",
          "delay",
          "highlight"
        ]))), 128))])]),
        i("div", Jv, [R[4] || (R[4] = i("span", null, "你", -1)), i("div", Qv, [(p(!0), b(te, null, ce(e.detail.playerDice, (q, U) => (p(), be(xs, {
          key: `player:${U}`,
          value: q,
          delay: U * ls,
          highlight: r("counting") && d(q)
        }, null, 8, [
          "value",
          "delay",
          "highlight"
        ]))), 128))])]),
        r("counting") ? (p(), b("p", Zv, [
          i("span", null, h(e.detail.finalBid.face) + " 点合计（1 点通配）", 1),
          i("strong", null, h(e.detail.matchingDiceCount), 1),
          R[5] || (R[5] = i("span", null, "枚", -1))
        ])) : H("", !0),
        r("verdict") ? (p(), b("p", {
          key: 1,
          class: ae(["game-reveal-verdict", w.value ? "is-holds" : "is-broken"])
        }, [ve(" 实际 " + h(e.detail.matchingDiceCount) + " 枚 " + h(w.value ? "≥" : "<") + " 叫数 " + h(e.detail.finalBid.count) + " 枚 ", 1), i("strong", null, h(w.value ? "叫牌成立，质疑失败" : "叫牌不成立，质疑得手"), 1)], 2)) : H("", !0)
      ]),
      r("settled") ? (p(), b("div", {
        key: 0,
        class: ae(["game-reveal-outcome", `is-${e.record.outcomeTone}`])
      }, [
        i("strong", null, h(e.record.outcomeLabel), 1),
        i("em", null, h(e.record.net > 0 ? "+" : "") + h(e.record.net) + " 小白币", 1),
        i("button", {
          type: "button",
          class: "game-primary-action",
          onClick: R[0] || (R[0] = (q) => n("done"))
        }, "回到大厅")
      ], 2)) : (p(), b("p", ep, "点击牌桌跳过"))
    ]));
  }
}), sp = np, ip = {
  class: "game-table game-ladder-table",
  "aria-labelledby": "game-ladder-title"
}, lp = { class: "game-table-heading" }, rp = { class: "game-ladder-stage" }, op = {
  class: "game-ladder-track",
  "aria-label": "五层挑战进度"
}, up = { key: 0 }, dp = { key: 1 }, cp = { class: "game-ladder-purse" }, fp = {
  key: 1,
  class: "game-ladder-settling",
  role: "status"
}, vp = {
  key: 0,
  class: "game-ladder-choices"
}, pp = [
  "disabled",
  "title",
  "onClick"
], gp = ["disabled", "title"], mp = 720, bp = 620, hp = /* @__PURE__ */ re({
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
    const a = e, n = t, s = Object.freeze({
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
    }), l = /* @__PURE__ */ W(a.game.completedFloors), o = /* @__PURE__ */ W(a.game.cashoutAmount), r = /* @__PURE__ */ W(a.game.canCashOut), u = /* @__PURE__ */ W(0), c = /* @__PURE__ */ W(null), d = [];
    function y() {
      return typeof window < "u" && typeof window.matchMedia == "function" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    }
    function w() {
      for (; d.length > 0; ) {
        const L = d.pop();
        L !== void 0 && window.clearTimeout(L);
      }
    }
    function m(L, M) {
      if (w(), u.value = l.value + 1, c.value = null, y() || typeof window > "u") {
        c.value = L, M();
        return;
      }
      d.push(window.setTimeout(() => {
        c.value = L, M(), L === "rise" && !a.ending && d.push(window.setTimeout(() => {
          u.value = 0, c.value = null;
        }, bp));
      }, mp));
    }
    at(() => a.game.completedFloors, (L, M) => {
      if (L > M) {
        m("rise", () => {
          l.value = L, o.value = a.game.cashoutAmount, r.value = a.game.canCashOut;
        });
        return;
      }
      l.value = L, o.value = a.game.cashoutAmount, r.value = a.game.canCashOut;
    }), at(() => a.ending, (L) => {
      if (!L || L.detail.kind !== "ladder") return;
      const M = L.detail.steps.at(-1);
      M && m(M.success ? "rise" : "fall", () => {
        M.success && (l.value = M.floor, o.value = M.amountAfterStep);
      });
    }, { immediate: !0 });
    const A = z(() => u.value > 0 && c.value === null), P = z(() => !!a.ending && (c.value !== null || u.value === 0)), R = z(() => !!a.writeDisabledReason || !!a.ending || u.value > 0);
    function q(L) {
      return {
        "is-complete": L <= l.value,
        "is-next": L === l.value + 1 && u.value === 0,
        "is-judging": L === u.value && c.value === null,
        "is-risen": L === u.value && c.value === "rise",
        "is-fallen": L === u.value && c.value === "fall"
      };
    }
    function U(L) {
      return `${L / 100}%`;
    }
    return _a(w), (L, M) => (p(), b("section", ip, [
      i("header", lp, [
        i("button", {
          type: "button",
          class: "game-back",
          onClick: M[0] || (M[0] = (_) => n("lobby"))
        }, "返回大厅"),
        M[3] || (M[3] = i("div", null, [i("span", null, "THE GILDED ASCENT"), i("h2", { id: "game-ladder-title" }, "鎏金阶梯")], -1)),
        i("strong", null, "托管 ¤ " + h(e.game.bet), 1)
      ]),
      i("div", rp, [i("div", op, [(p(), b(te, null, ce(5, (_) => i("div", {
        key: _,
        class: ae(["game-ladder-floor", q(_)])
      }, [i("span", null, h(_), 1), e.game.steps[_ - 1] && _ <= l.value ? (p(), b("small", up, " ¤ " + h(e.game.steps[_ - 1]?.amountAfterSuccess), 1)) : (p(), b("small", dp, "第 " + h(_) + " 层", 1))], 2)), 64))]), i("div", cp, [
        i("span", null, h(r.value ? "当前可收手" : "风险起点"), 1),
        i("strong", null, "¤ " + h(o.value), 1),
        i("small", null, "已完成 " + h(l.value) + " / 5 层", 1)
      ])]),
      P.value && e.ending ? (p(), b("div", {
        key: 0,
        class: ae(["game-reveal-outcome", `is-${e.ending.outcomeTone}`])
      }, [
        i("strong", null, h(e.ending.outcomeLabel), 1),
        i("em", null, h(e.ending.net > 0 ? "+" : "") + h(e.ending.net) + " 小白币", 1),
        i("button", {
          type: "button",
          class: "game-primary-action",
          onClick: M[1] || (M[1] = (_) => n("finished"))
        }, "回到大厅")
      ], 2)) : A.value ? (p(), b("p", fp, "正在判定第 " + h(u.value) + " 层…", 1)) : e.ending ? H("", !0) : (p(), b(te, { key: 2 }, [e.game.legalActions.includes("step") ? (p(), b("div", vp, [(p(!0), b(te, null, ce(e.game.nextChoices, (_) => (p(), b("button", {
        key: _.choice,
        type: "button",
        class: ae(`is-${_.choice}`),
        disabled: R.value,
        title: e.writeDisabledReason,
        onClick: (T) => n("step", _.choice)
      }, [
        i("span", null, h(fe(s)[_.choice].name), 1),
        i("small", null, h(fe(s)[_.choice].note), 1),
        i("strong", null, h(U(_.successProbabilityBps)), 1),
        i("em", null, "成功得 ¤ " + h(_.successAmount), 1)
      ], 10, pp))), 128))])) : H("", !0), e.game.legalActions.includes("cash-out") ? (p(), b("button", {
        key: 1,
        type: "button",
        class: "game-ladder-cashout",
        disabled: R.value,
        title: e.writeDisabledReason,
        onClick: M[2] || (M[2] = (_) => n("cashOut"))
      }, " 收手并领取 ¤ " + h(o.value), 9, gp)) : H("", !0)], 64))
    ]));
  }
}), yp = hp, kp = {
  class: "game-lobby",
  "aria-labelledby": "game-lobby-title"
}, wp = {
  key: 0,
  class: "game-continue-card"
}, xp = {
  key: 1,
  class: "game-grid"
}, Sp = { class: "game-card is-dice" }, _p = { class: "game-bet-field" }, $p = ["disabled", "title"], Cp = {
  key: 0,
  class: "game-card-reason"
}, Ap = { class: "game-card is-push" }, Mp = ["disabled", "title"], Tp = {
  key: 0,
  class: "game-card-reason"
}, Ep = { class: "game-card is-ladder" }, Ip = { class: "game-bet-field" }, Pp = ["disabled", "title"], Op = {
  key: 0,
  class: "game-card-reason"
}, Lp = /* @__PURE__ */ re({
  __name: "GameLobby",
  props: {
    activeGame: {},
    balance: {},
    lockedAmount: {},
    writeDisabledReason: {}
  },
  emits: ["start", "continue"],
  setup(e, { emit: t }) {
    const a = e, n = t, s = /* @__PURE__ */ W(50), l = /* @__PURE__ */ W(30), o = z(() => a.activeGame?.kind === "dice" ? "秘骰对决" : a.activeGame?.kind === "push" ? "翻倍或收手" : a.activeGame?.kind === "ladder" ? "鎏金阶梯" : "");
    function r() {
      return a.writeDisabledReason ? a.writeDisabledReason : !Number.isSafeInteger(s.value) || s.value < 50 || s.value > 500 || s.value % 10 !== 0 ? "下注须为 50 至 500，且为 10 的倍数" : a.balance < s.value ? "余额不足" : "";
    }
    function u() {
      return a.writeDisabledReason ? a.writeDisabledReason : a.balance < 50 ? "余额不足" : "";
    }
    function c() {
      return a.writeDisabledReason ? a.writeDisabledReason : !Number.isSafeInteger(l.value) || l.value < 30 || l.value > 800 || l.value % 10 !== 0 ? "下注须为 30 至 800，且为 10 的倍数" : a.balance < l.value ? "余额不足" : "";
    }
    return (d, y) => (p(), b("section", kp, [y[17] || (y[17] = i("div", { class: "game-lobby-hero" }, [
      i("span", { class: "game-eyebrow" }, "THE GILDED PARLOUR"),
      i("h2", { id: "game-lobby-title" }, "今夜，押注你的判断"),
      i("p", null, "三张独立牌桌，只认明确选择。每一步都会先落账，再揭晓。")
    ], -1)), e.activeGame ? (p(), b("article", wp, [
      y[7] || (y[7] = i("div", {
        class: "game-continue-seal",
        "aria-hidden": "true"
      }, "续", -1)),
      i("div", null, [
        y[6] || (y[6] = i("span", null, "牌桌仍在等候", -1)),
        i("h3", null, h(o.value), 1),
        i("p", null, "已有 ¤ " + h(e.lockedAmount) + " 托管在本局，离开页面不会结束赌局。", 1)
      ]),
      i("button", {
        type: "button",
        onClick: y[0] || (y[0] = (w) => n("continue", e.activeGame.kind))
      }, "继续本局")
    ])) : (p(), b("div", xp, [
      i("article", Sp, [
        y[9] || (y[9] = i("div", {
          class: "game-glyph",
          "aria-hidden": "true"
        }, [i("span", null, "⚄"), i("span", null, "⚂")], -1)),
        y[10] || (y[10] = i("div", { class: "game-copy" }, [
          i("span", { class: "game-card-index" }, "TABLE 01"),
          i("h3", null, "秘骰对决"),
          i("p", null, "五骰藏锋，一点为百搭。抬高叫数，或当场质疑庄家。"),
          i("ul", null, [i("li", null, "下注 50–500"), i("li", null, "胜出返还 1.9 倍")])
        ], -1)),
        i("label", _p, [y[8] || (y[8] = i("span", null, "下注", -1)), Pe(i("input", {
          "onUpdate:modelValue": y[1] || (y[1] = (w) => s.value = w),
          type: "number",
          min: "50",
          max: "500",
          step: "10"
        }, null, 512), [[
          tt,
          s.value,
          void 0,
          { number: !0 }
        ]])]),
        i("button", {
          type: "button",
          class: "game-table-button",
          disabled: !!r(),
          title: r(),
          onClick: y[2] || (y[2] = (w) => n("start", "dice", s.value))
        }, " 入席 ", 8, $p),
        r() ? (p(), b("small", Cp, h(r()), 1)) : H("", !0)
      ]),
      i("article", Ap, [
        y[11] || (y[11] = i("div", {
          class: "game-glyph is-coin",
          "aria-hidden": "true"
        }, "¤", -1)),
        y[12] || (y[12] = i("div", { class: "game-copy" }, [
          i("span", { class: "game-card-index" }, "TABLE 02"),
          i("h3", null, "翻倍或收手"),
          i("p", null, "十张暗牌藏着七枚金币与三枚炸弹。每次翻牌都更接近答案。"),
          i("ul", null, [i("li", null, "固定下注 50"), i("li", null, "每枚金币价值 50")])
        ], -1)),
        y[13] || (y[13] = i("div", { class: "game-fixed-bet" }, [i("span", null, "入场"), i("strong", null, "¤ 50")], -1)),
        i("button", {
          type: "button",
          class: "game-table-button",
          disabled: !!u(),
          title: u(),
          onClick: y[3] || (y[3] = (w) => n("start", "push", 50))
        }, " 揭牌 ", 8, Mp),
        u() ? (p(), b("small", Tp, h(u()), 1)) : H("", !0)
      ]),
      i("article", Ep, [
        y[15] || (y[15] = i("div", {
          class: "game-glyph is-ladder-mark",
          "aria-hidden": "true"
        }, "Ⅴ", -1)),
        y[16] || (y[16] = i("div", { class: "game-copy" }, [
          i("span", { class: "game-card-index" }, "TABLE 03"),
          i("h3", null, "鎏金阶梯"),
          i("p", null, "五层风险逐级累积。每层选择稳、中、险，成功后可随时收手。"),
          i("ul", null, [i("li", null, "下注 30–800"), i("li", null, "最高返还 50,000")])
        ], -1)),
        i("label", Ip, [y[14] || (y[14] = i("span", null, "下注", -1)), Pe(i("input", {
          "onUpdate:modelValue": y[4] || (y[4] = (w) => l.value = w),
          type: "number",
          min: "30",
          max: "800",
          step: "10"
        }, null, 512), [[
          tt,
          l.value,
          void 0,
          { number: !0 }
        ]])]),
        i("button", {
          type: "button",
          class: "game-table-button",
          disabled: !!c(),
          title: c(),
          onClick: y[5] || (y[5] = (w) => n("start", "ladder", l.value))
        }, " 登阶 ", 8, Pp),
        c() ? (p(), b("small", Op, h(c()), 1)) : H("", !0)
      ])
    ]))]));
  }
}), Rp = Lp, Dp = {
  class: "game-table game-push-table",
  "aria-labelledby": "game-push-title"
}, Bp = { class: "game-table-heading" }, Np = { class: "game-push-stage" }, qp = { class: "game-flip-card" }, Up = {
  class: "game-coin-stack",
  "aria-label": "已翻出的金币"
}, Fp = {
  key: 0,
  class: "game-empty-stack"
}, jp = {
  class: "game-card-fan",
  "aria-hidden": "true"
}, Hp = { class: "game-push-metrics" }, Kp = {
  key: 1,
  class: "game-actions"
}, Gp = ["disabled", "title"], zp = ["disabled", "title"], Vp = 660, Wp = /* @__PURE__ */ re({
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
    const a = e, n = t, s = /* @__PURE__ */ W(a.game.revealedCoins), l = /* @__PURE__ */ W({
      cashoutAmount: a.game.cashoutAmount,
      remainingCards: a.game.remainingCards,
      remainingBombs: a.game.remainingBombs,
      nextBombProbabilityBps: a.game.nextBombProbabilityBps
    }), o = /* @__PURE__ */ W(null), r = /* @__PURE__ */ W(!1), u = /* @__PURE__ */ W(!1);
    let c = 0;
    function d() {
      l.value = {
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
      c !== 0 && (window.clearTimeout(c), c = 0);
    }
    function m(U, L) {
      if (w(), o.value = U, u.value = !1, y() || typeof window > "u") {
        r.value = !0, u.value = !0, L();
        return;
      }
      r.value = !1, window.requestAnimationFrame(() => {
        window.requestAnimationFrame(() => {
          r.value = !0;
        });
      }), c = window.setTimeout(() => {
        u.value = !0, L();
      }, Vp);
    }
    at(() => a.game.revealedCoins, (U, L) => {
      if (U > L) {
        m("coin", () => {
          s.value = U, d();
        });
        return;
      }
      s.value = U, d();
    }), at(() => a.ending, (U) => {
      U?.outcome === "busted" && m("bomb", () => {
      });
    }, { immediate: !0 });
    const A = z(() => a.ending?.outcome === "busted"), P = z(() => !!a.ending && (!A.value || u.value)), R = z(() => !!a.writeDisabledReason || !!a.ending);
    function q(U) {
      return `${(U / 100).toFixed(U % 100 === 0 ? 0 : 2)}%`;
    }
    return _a(w), (U, L) => (p(), b("section", Dp, [
      i("header", Bp, [
        i("button", {
          type: "button",
          class: "game-back",
          onClick: L[0] || (L[0] = (M) => n("lobby"))
        }, "返回大厅"),
        L[4] || (L[4] = i("div", null, [i("span", null, "DOUBLE OR HOLD"), i("h2", { id: "game-push-title" }, "翻倍或收手")], -1)),
        i("strong", null, "托管 ¤ " + h(e.game.bet), 1)
      ]),
      i("div", Np, [
        o.value ? (p(), b("div", {
          key: 0,
          class: ae(["game-flip-slot", { "is-flipped": r.value }])
        }, [i("div", qp, [L[5] || (L[5] = i("span", {
          class: "game-flip-back",
          "aria-hidden": "true"
        }, null, -1)), i("span", { class: ae(["game-flip-front", `is-${o.value}`]) }, h(o.value === "bomb" ? "✸" : "¤"), 3)])], 2)) : H("", !0),
        i("div", Up, [s.value === 0 && !o.value ? (p(), b("span", Fp, "尚未揭牌")) : H("", !0), (p(!0), b(te, null, ce(s.value, (M) => (p(), b("b", {
          key: M,
          class: "game-revealed-coin"
        }, "¤"))), 128))]),
        i("div", jp, [(p(!0), b(te, null, ce(l.value.remainingCards, (M) => (p(), b("i", {
          key: M,
          style: _t({ "--card": M })
        }, null, 4))), 128))])
      ]),
      i("div", Hp, [
        i("div", null, [L[6] || (L[6] = i("span", null, "可收手", -1)), i("strong", null, "¤ " + h(l.value.cashoutAmount), 1)]),
        i("div", null, [L[7] || (L[7] = i("span", null, "余牌", -1)), i("strong", null, h(l.value.remainingCards), 1)]),
        i("div", null, [L[8] || (L[8] = i("span", null, "余雷", -1)), i("strong", null, h(l.value.remainingBombs), 1)]),
        i("div", null, [L[9] || (L[9] = i("span", null, "下一张风险", -1)), i("strong", null, h(q(l.value.nextBombProbabilityBps)), 1)])
      ]),
      L[10] || (L[10] = i("p", { class: "game-rule-note" }, "每枚金币增加 ¤ 50；翻到炸弹立即以零返还结束。", -1)),
      P.value && e.ending ? (p(), b("div", {
        key: 0,
        class: ae(["game-reveal-outcome", `is-${e.ending.outcomeTone}`])
      }, [
        i("strong", null, h(e.ending.outcomeLabel), 1),
        i("em", null, h(e.ending.net > 0 ? "+" : "") + h(e.ending.net) + " 小白币", 1),
        i("button", {
          type: "button",
          class: "game-primary-action",
          onClick: L[1] || (L[1] = (M) => n("finished"))
        }, "回到大厅")
      ], 2)) : e.ending ? H("", !0) : (p(), b("div", Kp, [e.game.legalActions.includes("draw") ? (p(), b("button", {
        key: 0,
        type: "button",
        class: "game-primary-action",
        disabled: R.value,
        title: e.writeDisabledReason,
        onClick: L[2] || (L[2] = (M) => n("draw"))
      }, " 再翻一张 ", 8, Gp)) : H("", !0), e.game.legalActions.includes("cash-out") ? (p(), b("button", {
        key: 1,
        type: "button",
        class: "game-secondary-action",
        disabled: R.value,
        title: e.writeDisabledReason,
        onClick: L[3] || (L[3] = (M) => n("cashOut"))
      }, " 收手入账 ", 8, zp)) : H("", !0)]))
    ]));
  }
}), Yp = Wp, Xp = {
  class: "game-records",
  "aria-labelledby": "game-records-title"
}, Jp = { class: "game-section-heading" }, Qp = {
  key: 0,
  class: "game-record-list"
}, Zp = {
  class: "game-record-mark",
  "aria-hidden": "true"
}, eg = { class: "game-record-main" }, tg = ["datetime"], ag = { class: "game-record-money" }, ng = {
  key: 0,
  class: "game-record-detail"
}, sg = {
  key: 1,
  class: "game-record-detail"
}, ig = {
  key: 2,
  class: "game-record-steps"
}, lg = {
  key: 1,
  class: "game-record-empty"
}, rg = {
  key: 2,
  class: "game-inline-error",
  role: "status"
}, og = ["disabled"], ug = /* @__PURE__ */ re({
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
    return (n, s) => (p(), b("section", Xp, [
      i("header", Jp, [s[1] || (s[1] = i("div", null, [i("span", null, "HOUSE LEDGER"), i("h2", { id: "game-records-title" }, "牌桌记录")], -1)), i("small", null, h(e.total) + " 局", 1)]),
      e.records.length ? (p(), b("div", Qp, [(p(!0), b(te, null, ce(e.records, (l) => (p(), b("article", {
        key: l.id,
        class: ae(["game-record", `is-${l.outcomeTone}`])
      }, [i("div", Zp, h(l.game === "dice" ? "骰" : l.game === "push" ? "翻" : "阶"), 1), i("div", eg, [
        i("header", null, [i("div", null, [i("span", null, h(l.gameLabel), 1), i("strong", null, h(l.outcomeLabel), 1)]), i("time", { datetime: new Date(l.createdAt).toISOString() }, h(a(l.createdAt)), 9, tg)]),
        i("div", ag, [
          i("span", null, "下注 ¤ " + h(l.amountIn), 1),
          i("span", null, "返还 ¤ " + h(l.payout), 1),
          i("strong", null, h(l.net > 0 ? "+" : "") + h(l.net), 1)
        ]),
        i("details", null, [s[2] || (s[2] = i("summary", null, "查看公开牌局", -1)), l.detail.kind === "dice" ? (p(), b("div", ng, [
          i("p", null, "终局叫数：" + h(l.detail.finalBid.count) + " 枚 " + h(l.detail.finalBid.face) + " 点", 1),
          i("p", null, "实际匹配：" + h(l.detail.matchingDiceCount) + " 枚 · " + h(l.detail.challenger === "player" ? "玩家" : "庄家") + "质疑", 1),
          i("p", null, "你的骰子：" + h(l.detail.playerDice.join(" · ")), 1)
        ])) : l.detail.kind === "push" ? (p(), b("div", sg, [i("p", null, "共翻出 " + h(l.detail.revealedCoins) + " 枚金币", 1)])) : (p(), b("ol", ig, [(p(!0), b(te, null, ce(l.detail.steps, (o) => (p(), b("li", { key: o.floor }, " 第 " + h(o.floor) + " 层 · " + h(fe(t)[o.choice]) + " · " + h(o.success ? `成功至 ¤ ${o.amountAfterStep}` : "挑战失败"), 1))), 128))]))])
      ])], 2))), 128))])) : (p(), b("div", lg, [...s[3] || (s[3] = [i("span", { "aria-hidden": "true" }, "◇", -1), i("p", null, "尚无结算记录", -1)])])),
      e.error ? (p(), b("p", rg, h(e.error), 1)) : H("", !0),
      e.hasMore ? (p(), b("button", {
        key: 3,
        type: "button",
        class: "game-load-more",
        disabled: e.loadingMore,
        onClick: s[0] || (s[0] = (l) => n.$emit("loadMore"))
      }, h(e.loadingMore ? "正在翻阅…" : "继续翻阅记录"), 9, og)) : H("", !0)
    ]));
  }
}), dg = ug, cg = { class: "game-app" }, fg = { class: "game-header" }, vg = { class: "game-funds" }, pg = ["disabled"], gg = {
  class: "game-nav",
  "aria-label": "游戏页面"
}, mg = ["disabled"], bg = ["disabled"], hg = {
  key: 1,
  class: "game-action-error",
  role: "status"
}, yg = ["disabled"], kg = { class: "game-scroll" }, pn = 35e3, wg = /* @__PURE__ */ re({
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
    ]), a = e, n = /* @__PURE__ */ W(structuredClone(/* @__PURE__ */ ie(a.initialState))), s = /* @__PURE__ */ W(n.value.activeGame?.kind || "lobby"), l = /* @__PURE__ */ W(!1), o = /* @__PURE__ */ W(!1), r = /* @__PURE__ */ W(!1), u = /* @__PURE__ */ W(""), c = /* @__PURE__ */ W(""), d = /* @__PURE__ */ W(""), y = /* @__PURE__ */ W(null), w = /* @__PURE__ */ W(null), m = /* @__PURE__ */ W(""), A = /* @__PURE__ */ W(null);
    let P = () => {
    }, R = 0, q = 0;
    const U = z(() => n.value.status === "unconfirmed"), L = z(() => o.value ? "正在处理上一项操作" : l.value ? "正在刷新游戏状态" : n.value.status !== "ready" ? n.value.message || "游戏暂时不可写入" : n.value.generationActive ? "主剧情正在生成，请等待回复完成" : ""), M = z(() => l.value || o.value || U.value || n.value.status === "conflict"), _ = z(() => n.value.records.find((V) => V.id === m.value) || null), T = z(() => A.value?.kind === "push" ? A.value.game : n.value.activeGame?.kind === "push" ? n.value.activeGame : null), S = z(() => A.value?.kind === "ladder" ? A.value.game : n.value.activeGame?.kind === "ladder" ? n.value.activeGame : null);
    function $() {
      return typeof globalThis.crypto?.randomUUID == "function" ? `game-ui:${globalThis.crypto.randomUUID()}` : (q += 1, `game-ui:${Date.now()}:${q}`);
    }
    function C() {
      return { chatIdentity: n.value.chatIdentity };
    }
    function G(V) {
      const F = V instanceof Error ? V.message : String(V);
      return F.includes("cannot be overdrawn") || F.includes("economy_insufficient_funds") ? "小白币余额不足，未能入局。" : F.includes("game_revision_conflict") || F.includes("game_event_id_conflict") ? "牌局已经变化，请重新读取后再操作。" : F.includes("game_dice_bid_not_higher") ? "叫数必须高于桌面当前叫数。" : F.includes("game_action_invalid") ? "当前牌局不接受这项操作。" : F.includes("game_main_generation_active") ? "主剧情正在生成，请等待回复完成。" : F.includes("game_push_cashout_invalid") || F.includes("game_ladder_cashout_invalid") ? "当前还不能收手。" : F.includes("聊天已切换") ? "聊天已切换，请重新打开游戏。" : F === "host_request_timeout" ? "等待落账结果超时；可用同一操作标识安全重试。" : "游戏操作未完成，请稍后重试。";
    }
    function Z(V, F) {
      return !t.has(F.outcome) && F.detail.kind !== "dice" ? null : V.kind === "dice" && F.detail.kind === "dice" ? {
        kind: "dice",
        record: F,
        detail: F.detail
      } : V.kind === "push" && F.detail.kind === "push" ? {
        kind: "push",
        record: F,
        game: V
      } : V.kind === "ladder" && F.detail.kind === "ladder" ? {
        kind: "ladder",
        record: F,
        game: V
      } : null;
    }
    function X() {
      A.value = null;
    }
    function J(V) {
      X(), s.value = V;
    }
    function j(V) {
      const F = n.value.activeGame;
      if (n.value = structuredClone(V), l.value = !1, r.value = !1, u.value = "", d.value = "", F && !V.activeGame) {
        const se = V.records.find((st) => st.gameId === F.id), Te = se ? Z(F, se) : null;
        Te ? (A.value = Te, m.value = "", s.value = Te.kind) : (m.value = se?.id || "", s.value = "lobby");
      } else V.activeGame && s.value !== "records" && s.value !== "lobby" ? s.value = V.activeGame.kind : !V.activeGame && s.value !== "records" && !A.value && (s.value = "lobby");
    }
    function ue(V, F) {
      const se = {
        ...C(),
        expectedRevision: n.value.revision,
        expectedEventId: n.value.eventId,
        actionId: F
      };
      return V.endpoint === "game/dice/start" || V.endpoint === "game/ladder/start" ? {
        ...se,
        bet: V.bet
      } : V.endpoint === "game/push/start" ? se : V.endpoint === "game/dice/bid" ? {
        ...se,
        gameId: V.gameId,
        bid: {
          count: V.bid.count,
          face: V.bid.face
        }
      } : V.endpoint === "game/ladder/step" ? {
        ...se,
        gameId: V.gameId,
        choice: V.choice
      } : {
        ...se,
        gameId: V.gameId
      };
    }
    async function he(V, F = $()) {
      if (L.value) return !1;
      const se = R;
      o.value = !0, c.value = "", w.value = null;
      try {
        const Te = await a.bridge.request(V.endpoint, ue(V, F), pn);
        return se !== R ? !1 : (j(Te.result), Te.result.activeGame && (s.value = Te.result.activeGame.kind), y.value = null, !0);
      } catch (Te) {
        return se === R && (c.value = G(Te), n.value.status === "unconfirmed" ? (y.value = null, w.value = null) : w.value = {
          request: V,
          actionId: F
        }), !1;
      } finally {
        se === R && (o.value = !1);
      }
    }
    function de(V, F) {
      if (L.value || n.value.activeGame) return;
      const se = V === "dice" ? {
        heading: "确认入席秘骰对决",
        summary: `托管 ¤ ${F}，胜出返还下注的 1.9 倍。`,
        confirmLabel: "确认入席"
      } : V === "push" ? {
        heading: "确认揭开第一张牌",
        summary: "托管 ¤ 50。金币可以累积，炸弹会立即结束本局。",
        confirmLabel: "确认揭牌"
      } : {
        heading: "确认踏上鎏金阶梯",
        summary: `托管 ¤ ${F}，首层成功后才可收手。`,
        confirmLabel: "确认登阶"
      };
      y.value = {
        request: V === "dice" ? {
          endpoint: "game/dice/start",
          bet: F
        } : V === "push" ? { endpoint: "game/push/start" } : {
          endpoint: "game/ladder/start",
          bet: F
        },
        actionId: $(),
        ...se
      }, c.value = "";
    }
    function pe() {
      const V = n.value.activeGame;
      V?.kind !== "dice" || !V.legalActions.includes("challenge") || (y.value = {
        request: {
          endpoint: "game/dice/challenge",
          gameId: V.id
        },
        actionId: $(),
        heading: "确定质疑庄家？",
        summary: "双方骰子将立即核验，本局随结果结算。",
        confirmLabel: "提出质疑",
        danger: !0
      }, c.value = "");
    }
    function Ae(V) {
      const F = n.value.activeGame;
      if (!F || F.kind !== V || !F.legalActions.includes("cash-out")) return;
      const se = F.cashoutAmount;
      y.value = {
        request: V === "push" ? {
          endpoint: "game/push/cash-out",
          gameId: F.id
        } : {
          endpoint: "game/ladder/cash-out",
          gameId: F.id
        },
        actionId: $(),
        heading: "现在收手？",
        summary: `本局将结束，并返还 ¤ ${se}。`,
        confirmLabel: "收手入账"
      }, c.value = "";
    }
    async function Oe() {
      const V = y.value;
      V && await he(V.request, V.actionId);
    }
    function ft() {
      o.value || (y.value = null, c.value = "");
    }
    async function Le() {
      if (M.value) return;
      const V = ++R;
      l.value = !0, u.value = "";
      try {
        const F = await a.bridge.request("game/refresh", C(), pn);
        V === R && j(F.result);
      } catch (F) {
        V === R && (u.value = G(F));
      } finally {
        V === R && (l.value = !1);
      }
    }
    async function Re() {
      if (l.value || o.value) return;
      const V = ++R;
      l.value = !0, u.value = "";
      try {
        const F = await a.bridge.request("game/confirm-save", C(), pn);
        V === R && j(F.result.state);
      } catch (F) {
        V === R && (u.value = G(F));
      } finally {
        V === R && (l.value = !1);
      }
    }
    async function Yt() {
      if (!n.value.hasMore || r.value || o.value) return;
      const V = R;
      r.value = !0, d.value = "";
      try {
        const F = await a.bridge.request("game/records/load-more", {
          ...C(),
          offset: n.value.records.length
        }, pn);
        if (V !== R) return;
        const se = new Set(n.value.records.map((Te) => Te.id));
        n.value.records.push(...F.result.records.filter((Te) => !se.has(Te.id))), n.value.total = F.result.total, n.value.hasMore = F.result.hasMore;
      } catch (F) {
        V === R && (d.value = G(F));
      } finally {
        V === R && (r.value = !1);
      }
    }
    function qt() {
      const V = w.value;
      V && he(V.request, V.actionId);
    }
    return nt(() => {
      P = a.bridge.subscribe((V) => {
        V.type === "game/state" && (o.value || (R += 1), c.value = "", w.value = null, j(V.payload.state)), V.type === "game/error" && (u.value = "游戏状态暂时无法读取，请重新打开。");
      });
    }), ct(() => {
      R += 1, P(), y.value = null, w.value = null;
    }), (V, F) => (p(), b("main", cg, [
      i("header", fg, [
        F[19] || (F[19] = i("div", { class: "game-brand" }, [i("span", null, "GAME CENTER"), i("h1", null, "游戏")], -1)),
        i("div", vg, [i("span", null, [F[16] || (F[16] = i("small", null, "可用", -1)), i("strong", null, "¤ " + h(n.value.balance), 1)]), i("span", null, [F[17] || (F[17] = i("small", null, "托管", -1)), i("strong", null, "¤ " + h(n.value.lockedAmount), 1)])]),
        i("button", {
          type: "button",
          class: "game-refresh",
          disabled: M.value,
          title: "重新读取游戏",
          onClick: Le
        }, [...F[18] || (F[18] = [i("svg", {
          viewBox: "0 0 24 24",
          "aria-hidden": "true"
        }, [i("path", { d: "M20 7v5h-5M4 17v-5h5M18.2 9A7 7 0 0 0 6.1 6.7L4 9m16 6-2.1 2.3A7 7 0 0 1 5.8 15" })], -1), i("span", { class: "game-sr-only" }, "重新读取游戏", -1)])], 8, pg)
      ]),
      i("nav", gg, [
        i("button", {
          type: "button",
          class: ae({ "is-active": s.value === "lobby" }),
          onClick: F[0] || (F[0] = (se) => J("lobby"))
        }, "大厅", 2),
        n.value.activeGame ? (p(), b("button", {
          key: 0,
          type: "button",
          class: ae({ "is-active": s.value === n.value.activeGame.kind }),
          onClick: F[1] || (F[1] = (se) => s.value = n.value.activeGame?.kind || "lobby")
        }, [...F[20] || (F[20] = [ve(" 当前牌桌", -1), i("i", null, null, -1)])], 2)) : H("", !0),
        i("button", {
          type: "button",
          class: ae({ "is-active": s.value === "records" }),
          onClick: F[2] || (F[2] = (se) => J("records"))
        }, "记录", 2)
      ]),
      n.value.message || u.value ? (p(), b("aside", {
        key: 0,
        class: ae(["game-notice", `is-${n.value.status}`]),
        role: "status"
      }, [F[21] || (F[21] = i("span", { "aria-hidden": "true" }, "!", -1)), i("div", null, [
        i("strong", null, h(n.value.status === "unconfirmed" ? "落账待核实" : n.value.status === "conflict" ? "牌局状态冲突" : "游戏状态"), 1),
        i("p", null, h(u.value || n.value.message), 1),
        U.value ? (p(), b("button", {
          key: 0,
          type: "button",
          disabled: l.value,
          onClick: Re
        }, h(l.value ? "正在核实…" : "核实保存结果"), 9, mg)) : n.value.status === "blocked" ? (p(), b("button", {
          key: 1,
          type: "button",
          disabled: l.value,
          onClick: Le
        }, h(l.value ? "正在读取…" : "重新读取"), 9, bg)) : H("", !0)
      ])], 2)) : H("", !0),
      c.value && !y.value ? (p(), b("aside", hg, [i("span", null, h(c.value), 1), w.value && n.value.status === "ready" ? (p(), b("button", {
        key: 0,
        type: "button",
        disabled: o.value,
        onClick: qt
      }, "重试同一操作", 8, yg)) : H("", !0)])) : H("", !0),
      i("div", kg, [_.value && s.value === "lobby" ? (p(), b("div", {
        key: 0,
        class: ae(["game-result-banner", `is-${_.value.outcomeTone}`]),
        role: "status"
      }, [
        i("span", null, h(_.value.gameLabel), 1),
        i("strong", null, h(_.value.outcomeLabel), 1),
        i("em", null, h(_.value.net > 0 ? "+" : "") + h(_.value.net) + " 小白币", 1),
        i("button", {
          type: "button",
          onClick: F[3] || (F[3] = (se) => m.value = "")
        }, "关闭")
      ], 2)) : H("", !0), s.value === "lobby" ? (p(), be(Rp, {
        key: 1,
        "active-game": n.value.activeGame,
        balance: n.value.balance,
        "locked-amount": n.value.lockedAmount,
        "write-disabled-reason": L.value,
        onStart: de,
        onContinue: F[4] || (F[4] = (se) => s.value = se)
      }, null, 8, [
        "active-game",
        "balance",
        "locked-amount",
        "write-disabled-reason"
      ])) : s.value === "dice" && n.value.activeGame?.kind === "dice" ? (p(), be(zv, {
        key: 2,
        game: n.value.activeGame,
        "write-disabled-reason": L.value,
        onBid: F[5] || (F[5] = (se) => he({
          endpoint: "game/dice/bid",
          gameId: n.value.activeGame?.id || "",
          bid: se
        })),
        onChallenge: pe,
        onLobby: F[6] || (F[6] = (se) => J("lobby"))
      }, null, 8, ["game", "write-disabled-reason"])) : s.value === "dice" && A.value?.kind === "dice" ? (p(), be(sp, {
        key: 3,
        record: A.value.record,
        detail: A.value.detail,
        onDone: F[7] || (F[7] = (se) => J("lobby"))
      }, null, 8, ["record", "detail"])) : s.value === "push" && T.value ? (p(), be(Yp, {
        key: 4,
        game: T.value,
        "write-disabled-reason": L.value,
        ending: A.value?.kind === "push" ? A.value.record : null,
        onDraw: F[8] || (F[8] = (se) => he({
          endpoint: "game/push/draw",
          gameId: n.value.activeGame?.id || ""
        })),
        onCashOut: F[9] || (F[9] = (se) => Ae("push")),
        onLobby: F[10] || (F[10] = (se) => J("lobby")),
        onFinished: F[11] || (F[11] = (se) => J("lobby"))
      }, null, 8, [
        "game",
        "write-disabled-reason",
        "ending"
      ])) : s.value === "ladder" && S.value ? (p(), be(yp, {
        key: 5,
        game: S.value,
        "write-disabled-reason": L.value,
        ending: A.value?.kind === "ladder" ? A.value.record : null,
        onStep: F[12] || (F[12] = (se) => he({
          endpoint: "game/ladder/step",
          gameId: n.value.activeGame?.id || "",
          choice: se
        })),
        onCashOut: F[13] || (F[13] = (se) => Ae("ladder")),
        onLobby: F[14] || (F[14] = (se) => J("lobby")),
        onFinished: F[15] || (F[15] = (se) => J("lobby"))
      }, null, 8, [
        "game",
        "write-disabled-reason",
        "ending"
      ])) : s.value === "records" ? (p(), be(dg, {
        key: 6,
        records: n.value.records,
        total: n.value.total,
        "has-more": n.value.hasMore,
        "loading-more": r.value,
        error: d.value,
        onLoadMore: Yt
      }, null, 8, [
        "records",
        "total",
        "has-more",
        "loading-more",
        "error"
      ])) : H("", !0)]),
      y.value ? (p(), be(yv, {
        key: 2,
        heading: y.value.heading,
        summary: y.value.summary,
        "confirm-label": y.value.confirmLabel,
        busy: o.value,
        error: c.value,
        danger: y.value.danger,
        onCancel: ft,
        onConfirm: Oe
      }, null, 8, [
        "heading",
        "summary",
        "confirm-label",
        "busy",
        "error",
        "danger"
      ])) : H("", !0)
    ]));
  }
}), xg = wg, Sg = Object.freeze({
  id: "map",
  name: "地图",
  accent: "#3aa9ff"
}), _g = { class: "map-viewport" }, $g = ["viewBox", "aria-label"], Cg = {
  class: "map-viewport-controls",
  "aria-label": "地图缩放控制"
}, Ag = /* @__PURE__ */ re({
  __name: "MapViewport",
  props: {
    viewBox: {},
    resetKey: { default: "" },
    label: {}
  },
  setup(e) {
    const t = e, a = /* @__PURE__ */ W(null), n = /* @__PURE__ */ W([...t.viewBox]);
    let s = null, l = [0, 0], o = [0, 0], r = null, u = !1, c = !1, d = null;
    const y = z(() => n.value.join(" "));
    function w() {
      const [_, T, S, $] = t.viewBox;
      n.value = [
        _,
        T,
        Math.max(1, S),
        Math.max(1, $)
      ];
    }
    function m() {
      const _ = a.value?.getBoundingClientRect();
      return !_?.width || !_.height ? 1 : Math.max(n.value[2] / _.width, n.value[3] / _.height);
    }
    function A(_, T) {
      const S = a.value?.getBoundingClientRect();
      if (!S?.width || !S.height) return [n.value[0] + n.value[2] / 2, n.value[1] + n.value[3] / 2];
      const $ = m(), C = n.value[2] / $, G = n.value[3] / $, Z = (S.width - C) / 2, X = (S.height - G) / 2;
      return [n.value[0] + (_ - S.left - Z) * $, n.value[1] + (T - S.top - X) * $];
    }
    function P(_, T) {
      const S = Math.max(1, t.viewBox[2]), $ = Math.min(S * 5, Math.max(S * 0.24, n.value[2] * _)), C = $ / n.value[2], G = n.value[3] * C, Z = T || [n.value[0] + n.value[2] / 2, n.value[1] + n.value[3] / 2], X = (Z[0] - n.value[0]) / n.value[2], J = (Z[1] - n.value[1]) / n.value[3];
      n.value = [
        Z[0] - $ * X,
        Z[1] - G * J,
        $,
        G
      ];
    }
    function R(_) {
      P(_.deltaY < 0 ? 0.84 : 1.19, A(_.clientX, _.clientY));
    }
    function q(_) {
      _.button !== 0 || s !== null || (s = _.pointerId, l = [_.clientX, _.clientY], o = [n.value[0], n.value[1]], u = !1, r = _.target instanceof Element ? _.target : a.value, r?.setPointerCapture(_.pointerId));
    }
    function U(_) {
      if (_.pointerId !== s) return;
      const T = _.clientX - l[0], S = _.clientY - l[1];
      Math.abs(T) + Math.abs(S) > 4 && (u = !0);
      const $ = m();
      n.value = [
        o[0] - T * $,
        o[1] - S * $,
        n.value[2],
        n.value[3]
      ];
    }
    function L(_) {
      _.pointerId === s && (r?.hasPointerCapture(_.pointerId) && r.releasePointerCapture(_.pointerId), r = null, s = null, u && (c = !0, d && clearTimeout(d), d = setTimeout(() => {
        c = !1;
      }, 0)));
    }
    function M(_) {
      c && (_.preventDefault(), _.stopPropagation());
    }
    return at(() => [
      t.viewBox[0],
      t.viewBox[1],
      t.viewBox[2],
      t.viewBox[3],
      t.resetKey
    ], w, { immediate: !0 }), ct(() => {
      d && clearTimeout(d);
    }), (_, T) => (p(), b("div", _g, [(p(), b("svg", {
      ref_key: "svg",
      ref: a,
      class: "map-viewport-svg",
      viewBox: y.value,
      preserveAspectRatio: "xMidYMid meet",
      role: "img",
      "aria-label": e.label,
      onWheel: ut(R, ["prevent"]),
      onPointerdown: q,
      onPointermove: U,
      onPointerup: L,
      onPointercancel: L,
      onClickCapture: M
    }, [$n(_.$slots, "default")], 40, $g)), i("div", Cg, [
      i("button", {
        type: "button",
        title: "放大",
        "aria-label": "放大",
        onClick: T[0] || (T[0] = (S) => P(0.8))
      }, "+"),
      i("button", {
        type: "button",
        title: "缩小",
        "aria-label": "缩小",
        onClick: T[1] || (T[1] = (S) => P(1.25))
      }, "-"),
      i("button", {
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
}), Tg = Object.freeze({
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
}), Eg = Object.freeze({
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
}), Ig = Object.freeze({
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
}), Pg = Object.freeze({
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
}), Tr = Object.freeze({
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
}), Er = Object.freeze({
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
}), Og = Object.freeze({
  city: "location_city",
  district: "apartment",
  building: "home_work",
  floor: "stairs",
  room: "meeting_room",
  outdoor: "park"
}), Wi = Object.freeze({
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
}), Rg = /* @__PURE__ */ new Set([
  "water",
  "terrain",
  "furniture",
  "decoration",
  "danger",
  "magic",
  "secret",
  "light"
]);
function zt(e, t) {
  return e < t ? -1 : e > t ? 1 : 0;
}
function $e(e) {
  return Number(e.toFixed(3)).toString();
}
function Ir(e) {
  const t = e.geometry;
  return Array.isArray(t.points) ? t.points : [];
}
function Pr(e) {
  return e.shape === "rect" || e.shape === "circle" ? !0 : Ir(e).length >= 3 && (e.closed === !0 || Rg.has(e.category));
}
function Dg(e) {
  const t = Ir(e);
  if (t.length < 2) return "";
  const a = Pr(e) ? " Z" : "";
  if (e.shape === "path") return `M ${t.map(([s, l]) => `${$e(s)} ${$e(l)}`).join(" L ")}${a}`;
  const n = [`M ${$e(t[0][0])} ${$e(t[0][1])}`];
  for (let s = 0; s < t.length - 1; s += 1) {
    const l = t[s - 1] || t[s], o = t[s], r = t[s + 1], u = t[s + 2] || r, c = o[0] + (r[0] - l[0]) / 6, d = o[1] + (r[1] - l[1]) / 6, y = r[0] - (u[0] - o[0]) / 6, w = r[1] - (u[1] - o[1]) / 6;
    n.push(`C ${$e(c)} ${$e(d)}, ${$e(y)} ${$e(w)}, ${$e(r[0])} ${$e(r[1])}`);
  }
  return n.join(" ") + a;
}
function Yi(e) {
  const t = e.geometry;
  if (typeof t.x == "number" && typeof t.y == "number")
    return e.shape === "rect" ? [t.x + (t.width || 0) / 2, t.y + (t.height || 0) / 2] : e.shape === "circle" ? [t.x, t.y - (t.radius || 0) - 8] : [t.x, t.y + (e.shape === "icon" ? 18 : 0)];
  const a = t.points || [];
  if (!a.length) return [0, 0];
  const [n, s] = a.reduce((l, o) => [l[0] + o[0], l[1] + o[1]], [0, 0]);
  return [n / a.length, s / a.length];
}
function Ue(e, t) {
  const a = Mg[e.category], n = Pr(e), s = n && e.material ? `url(#${t}-material-${e.material})` : "", l = e.certainty === "inferred" ? "8 6" : e.certainty === "unknown" ? "3 7" : a.dash;
  return {
    ...a,
    fill: n ? s || a.fill || Tr[e.material] : "none",
    opacity: e.certainty === "unknown" ? 0.48 : e.certainty === "inferred" ? 0.72 : 1,
    dash: l,
    icon: e.icon ? Ig[e.icon] : e.kind ? Tg[e.kind] : Pg[e.category],
    fallback: e.kind ? Eg[e.kind] : da[e.category].slice(0, 1),
    z: Ss[e.category]
  };
}
function Bg(e) {
  return [...e].sort((t, a) => Ss[t.category] - Ss[a.category] || zt(t.id, a.id));
}
var gn = 156, Ng = 66, Xi = 34, qg = 70;
function rs(e) {
  return [...e].sort((t, a) => zt(t.parent || "", a.parent || "") || zt(t.name, a.name) || zt(t.key, a.key));
}
function Ug(e) {
  const t = /* @__PURE__ */ new Set();
  return e.forEach((a) => {
    const n = [], s = /* @__PURE__ */ new Map();
    let l = a;
    for (; l?.parent; ) {
      const o = s.get(l.key);
      if (o !== void 0) {
        n.slice(o).forEach((r) => t.add(r));
        break;
      }
      s.set(l.key, n.length), n.push(l.key), l = e.get(l.parent);
    }
  }), t;
}
function Fg(e) {
  return [
    Math.min(...e.map((t) => t[0])),
    Math.min(...e.map((t) => t[1])),
    Math.max(...e.map((t) => t[0])),
    Math.max(...e.map((t) => t[1]))
  ];
}
function jg(e, t, a, n) {
  const s = [t.x + t.width / 2, t.y + t.height / 2], l = [a.x + a.width / 2, a.y + a.height / 2], o = l[0] - s[0], r = l[1] - s[1], u = Math.abs(o) >= Math.abs(r), c = u ? [o >= 0 ? t.x + t.width : t.x, s[1]] : [s[0], r >= 0 ? t.y + t.height : t.y], d = u ? [o >= 0 ? a.x : a.x + a.width, l[1]] : [l[0], r >= 0 ? a.y : a.y + a.height], y = (c[0] + d[0]) / 2, w = (c[1] + d[1]) / 2 + n, m = u ? [[y, c[1] + n], [y, d[1] + n]] : [[c[0] + n, w], [d[0] + n, w]];
  return {
    id: e.id,
    from: e.from,
    to: e.to,
    path: `M ${$e(c[0])} ${$e(c[1])} C ${$e(m[0][0])} ${$e(m[0][1])}, ${$e(m[1][0])} ${$e(m[1][1])}, ${$e(d[0])} ${$e(d[1])}`,
    labelX: y,
    labelY: w - 7,
    bounds: Fg([
      c,
      d,
      m[0],
      m[1],
      [y, w - 7]
    ])
  };
}
function Hg(e) {
  const t = rs(e.locations), a = new Map(t.map((M) => [M.key, M])), n = Ug(a), s = /* @__PURE__ */ new Map(), l = [];
  t.forEach((M) => {
    const _ = M.parent || "";
    if (_ && a.has(_) && !n.has(_) && !n.has(M.key)) {
      const T = s.get(_) || [];
      T.push(M), s.set(_, T);
    } else l.push(M);
  }), s.forEach((M, _) => s.set(_, rs(M)));
  const o = /* @__PURE__ */ new Map(), r = (M) => {
    const _ = o.get(M.key);
    if (_ !== void 0) return _;
    const T = s.get(M.key) || [], S = T.length ? Math.max(gn, T.reduce(($, C, G) => $ + r(C) + (G ? Xi : 0), 0)) : gn;
    return o.set(M.key, S), S;
  }, u = [], c = (M, _, T) => {
    const S = r(M);
    u.push({
      key: M.key,
      x: _ + (S - gn) / 2,
      y: T * 158,
      width: gn,
      height: Ng,
      depth: T
    });
    let $ = _;
    (s.get(M.key) || []).forEach((C) => {
      c(C, $, T + 1), $ += r(C) + Xi;
    });
  };
  let d = 0;
  rs(l).forEach((M) => {
    c(M, d, 0), d += r(M) + qg;
  });
  const y = new Map(u.map((M) => [M.key, M])), w = t.flatMap((M) => {
    const _ = y.get(M.key), T = M.parent ? y.get(M.parent) : void 0;
    if (!_ || !T) return [];
    const S = T.x + T.width / 2, $ = T.y + T.height, C = _.x + _.width / 2, G = _.y, Z = ($ + G) / 2;
    return [{
      id: `${T.key}:${_.key}`,
      path: `M ${$e(S)} ${$e($)} C ${$e(S)} ${$e(Z)}, ${$e(C)} ${$e(Z)}, ${$e(C)} ${$e(G)}`
    }];
  }), m = /* @__PURE__ */ new Map(), A = [...e.links].sort((M, _) => zt(M.id, _.id)).flatMap((M) => {
    const _ = y.get(M.from), T = y.get(M.to);
    if (!_ || !T) return [];
    const S = [M.from, M.to].sort(zt).join(":"), $ = m.get(S) || 0;
    return m.set(S, $ + 1), [jg(M, _, T, $ === 0 ? 0 : ($ % 2 ? 1 : -1) * Math.ceil($ / 2) * 24)];
  });
  if (!u.length) return {
    nodes: u,
    hierarchy: w,
    routes: A,
    viewBox: [
      0,
      0,
      640,
      420
    ]
  };
  const P = A.flatMap((M) => [M.bounds]), R = Math.min(...u.map((M) => M.x), ...P.map((M) => M[0])) - 60, q = Math.min(...u.map((M) => M.y), ...P.map((M) => M[1])) - 60, U = Math.max(...u.map((M) => M.x + M.width), ...P.map((M) => M[2])) + 60, L = Math.max(...u.map((M) => M.y + M.height), ...P.map((M) => M[3])) + 60;
  return {
    nodes: u,
    hierarchy: w,
    routes: A,
    viewBox: [
      R,
      q,
      Math.max(420, U - R),
      Math.max(300, L - q)
    ]
  };
}
function Kg(e, t) {
  return e.filter((a) => a.locationKey === t).sort((a, n) => zt(a.displayName, n.displayName) || zt(a.actorKey, n.actorKey));
}
var Gg = [
  "x",
  "y",
  "width",
  "height"
], zg = [
  "x",
  "y",
  "width",
  "height"
], Vg = {
  class: "map-atlas-hierarchy",
  "aria-hidden": "true"
}, Wg = ["d"], Yg = { class: "map-atlas-routes" }, Xg = ["d", "marker-start"], Jg = ["x", "y"], Qg = [
  "role",
  "tabindex",
  "aria-label",
  "onClick",
  "onKeydown"
], Zg = [
  "x",
  "y",
  "width",
  "height"
], em = ["d"], tm = ["cx", "cy"], am = ["x", "y"], nm = ["x", "y"], sm = ["x", "y"], im = ["x", "y"], lm = {
  key: 2,
  class: "map-atlas-actors"
}, rm = ["transform"], om = {
  key: 0,
  class: "map-material-symbol"
}, um = {
  key: 1,
  class: "map-symbol-fallback"
}, dm = ["x", "y"], cm = ["transform"], fm = /* @__PURE__ */ re({
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
    const a = e, n = t, s = z(() => Hg(a.atlas)), l = z(() => new Map(a.atlas.locations.map((w) => [w.key, w]))), o = z(() => new Map(a.atlas.links.map((w) => [w.id, w])));
    function r(w) {
      return l.value.get(w.key);
    }
    function u(w) {
      return o.value.get(w);
    }
    function c(w) {
      return Kg(a.atlas.actors, w);
    }
    function d(w) {
      w.sceneKey && n("viewScene", w.key);
    }
    function y(w, m) {
      !m.sceneKey || w.key !== "Enter" && w.key !== " " || (w.preventDefault(), d(m));
    }
    return (w, m) => (p(), be(Mr, {
      class: "map-atlas-viewport",
      "view-box": s.value.viewBox,
      "reset-key": String(e.revision),
      label: "世界地点关系图"
    }, {
      default: ia(() => [
        m[2] || (m[2] = i("defs", null, [
          i("pattern", {
            id: "map-atlas-grid",
            width: "28",
            height: "28",
            patternUnits: "userSpaceOnUse"
          }, [i("path", {
            d: "M28 0H0V28",
            fill: "none",
            stroke: "rgba(92, 176, 228, .08)",
            "stroke-width": "1"
          })]),
          i("marker", {
            id: "map-atlas-arrow",
            viewBox: "0 0 10 10",
            refX: "8",
            refY: "5",
            markerWidth: "7",
            markerHeight: "7",
            orient: "auto-start-reverse"
          }, [i("path", {
            d: "M1 1l8 4-8 4z",
            fill: "#58bce9"
          })]),
          i("filter", {
            id: "map-atlas-current-glow",
            x: "-80%",
            y: "-80%",
            width: "260%",
            height: "260%"
          }, [i("feGaussianBlur", {
            stdDeviation: "3",
            result: "blur"
          }), i("feMerge", null, [i("feMergeNode", { in: "blur" }), i("feMergeNode", { in: "SourceGraphic" })])])
        ], -1)),
        i("rect", {
          x: s.value.viewBox[0],
          y: s.value.viewBox[1],
          width: s.value.viewBox[2],
          height: s.value.viewBox[3],
          class: "map-atlas-background"
        }, null, 8, Gg),
        i("rect", {
          x: s.value.viewBox[0],
          y: s.value.viewBox[1],
          width: s.value.viewBox[2],
          height: s.value.viewBox[3],
          fill: "url(#map-atlas-grid)"
        }, null, 8, zg),
        i("g", Vg, [(p(!0), b(te, null, ce(s.value.hierarchy, (A) => (p(), b("path", {
          key: A.id,
          d: A.path,
          "vector-effect": "non-scaling-stroke"
        }, null, 8, Wg))), 128))]),
        i("g", Yg, [(p(!0), b(te, null, ce(s.value.routes, (A) => (p(), b("g", { key: A.id }, [i("path", {
          d: A.path,
          "marker-start": u(A.id).bidirectional ? "url(#map-atlas-arrow)" : void 0,
          "marker-end": "url(#map-atlas-arrow)",
          "vector-effect": "non-scaling-stroke"
        }, null, 8, Xg), i("text", {
          x: A.labelX,
          y: A.labelY
        }, h(u(A.id).label || fe(Lg)[u(A.id).kind]), 9, Jg)]))), 128))]),
        (p(!0), b(te, null, ce(s.value.nodes, (A) => (p(), b("g", {
          key: A.key,
          class: ae(["map-atlas-node", {
            "is-current": A.key === e.currentLocationKey,
            "is-selected": A.key === e.selectedLocationKey,
            "is-visited": r(A).status === "visited",
            "is-clickable": !!r(A).sceneKey
          }]),
          role: r(A).sceneKey ? "button" : void 0,
          tabindex: r(A).sceneKey ? 0 : void 0,
          "aria-label": r(A).sceneKey ? `查看 ${r(A).name} 场景` : r(A).name,
          onClick: ut((P) => d(r(A)), ["stop"]),
          onKeydown: (P) => y(P, r(A))
        }, [
          i("rect", {
            x: A.x,
            y: A.y,
            width: A.width,
            height: A.height,
            rx: "9"
          }, null, 8, Zg),
          i("path", {
            class: "map-atlas-node-cut",
            d: `M ${A.x + A.width - 24} ${A.y} L ${A.x + A.width} ${A.y + 24}`
          }, null, 8, em),
          i("circle", {
            cx: A.x + 24,
            cy: A.y + 24,
            r: "13",
            class: "map-atlas-node-icon-ring"
          }, null, 8, tm),
          e.symbolsReady ? (p(), b("text", {
            key: 0,
            x: A.x + 24,
            y: A.y + 24,
            class: "map-material-symbol"
          }, h(fe(Og)[r(A).scale]), 9, am)) : (p(), b("text", {
            key: 1,
            x: A.x + 24,
            y: A.y + 24,
            class: "map-symbol-fallback"
          }, h(fe(Wi)[r(A).scale].slice(0, 1)), 9, nm)),
          i("text", {
            x: A.x + 45,
            y: A.y + 23,
            class: "map-atlas-node-name"
          }, h(r(A).name), 9, sm),
          i("text", {
            x: A.x + 45,
            y: A.y + 42,
            class: "map-atlas-node-meta"
          }, h(fe(Wi)[r(A).scale]) + " · " + h(r(A).status === "visited" ? "已到访" : "仅提及"), 9, im),
          c(A.key).length ? (p(), b("g", lm, [(p(!0), b(te, null, ce(c(A.key).slice(0, 4), (P, R) => (p(), b("g", {
            key: P.actorKey,
            transform: `translate(${A.x + 19 + R * 18} ${A.y + A.height - 2})`,
            class: ae({ "is-player": P.actorKey === "player" })
          }, [
            m[0] || (m[0] = i("circle", { r: "7" }, null, -1)),
            e.symbolsReady ? (p(), b("text", om, h(P.actorKey === "player" ? "person_pin_circle" : "person"), 1)) : (p(), b("text", um, h(P.actorKey === "player" ? "P" : "N"), 1)),
            i("title", null, h(P.displayName), 1)
          ], 10, rm))), 128)), c(A.key).length > 4 ? (p(), b("text", {
            key: 0,
            x: A.x + 88,
            y: A.y + A.height + 2,
            class: "map-atlas-actor-overflow"
          }, " +" + h(c(A.key).length - 4), 9, dm)) : H("", !0)])) : H("", !0),
          A.key === e.currentLocationKey ? (p(), b("g", {
            key: 3,
            class: "map-atlas-current-pin",
            transform: `translate(${A.x + A.width - 13} ${A.y + 13})`
          }, [...m[1] || (m[1] = [i("circle", { r: "7" }, null, -1), i("path", { d: "M-3 0l2 2 4-5" }, null, -1)])], 8, cm)) : H("", !0),
          i("title", null, h(r(A).brief || r(A).name), 1)
        ], 42, Qg))), 128))
      ]),
      _: 1
    }, 8, ["view-box", "reset-key"]));
  }
}), vm = fm, N0 = Object.freeze([
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
]), q0 = Object.freeze([
  "rect",
  "circle",
  "path",
  "curve",
  "icon",
  "label"
]), U0 = Object.freeze([
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
]), pm = Object.freeze([
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
]), F0 = Object.freeze([
  "confirmed",
  "inferred",
  "unknown"
]), j0 = Object.freeze([
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
]), H0 = Object.freeze(/* @__PURE__ */ new Set([
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
])), gm = ["id"], mm = ["fill"], bm = {
  key: 0,
  d: "M0 6H24M0 18H24M7 0V6M17 6V18M10 18V24"
}, hm = {
  key: 1,
  d: "M0 8L7 3l8 3 9-4M2 19l8-5 10 4 4-3"
}, ym = {
  key: 2,
  d: "M0 8H24M0 16H24M8 0v24m8-24v24"
}, km = {
  key: 3,
  d: "M-4 6q6-5 12 0t12 0t12 0M-4 17q6-5 12 0t12 0t12 0"
}, wm = {
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
}, _m = {
  key: 7,
  cx: "18",
  cy: "16",
  r: "1"
}, $m = {
  key: 8,
  d: "M12 3v18M4 7l16 10M20 7L4 17"
}, Cm = {
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
}, Tm = {
  key: 12,
  d: "M0 4q6 4 12 0t12 0M0 16q6 4 12 0t12 0"
}, Em = {
  key: 13,
  d: "M0 6l7 5 5-8 5 13 7-5M0 22l8-5 6 4 10-8"
}, Im = {
  key: 14,
  d: "M12 2l4 7 6 3-6 4-4 6-4-6-6-4 6-3zM8 9l8 7m0-7l-8 7"
}, Pm = {
  key: 15,
  d: "M12 2v20M2 12h20M5 5l14 14M19 5L5 19"
}, Om = [
  "x",
  "y",
  "width",
  "height"
], Lm = [
  "x",
  "y",
  "width",
  "height"
], Rm = [
  "cx",
  "cy",
  "rx",
  "ry"
], Dm = ["opacity"], Bm = [
  "x",
  "y",
  "width",
  "height",
  "fill",
  "stroke",
  "stroke-width",
  "stroke-dasharray"
], Nm = [
  "cx",
  "cy",
  "r",
  "fill",
  "stroke",
  "stroke-width",
  "stroke-dasharray"
], qm = [
  "d",
  "fill",
  "stroke",
  "stroke-width",
  "stroke-dasharray"
], Um = ["transform"], Fm = ["stroke"], jm = {
  key: 0,
  class: "map-material-symbol",
  "aria-hidden": "true"
}, Hm = {
  key: 1,
  class: "map-symbol-fallback",
  "aria-hidden": "true"
}, Km = ["x", "y"], Gm = ["x", "y"], zm = /* @__PURE__ */ re({
  __name: "MapScene",
  props: {
    scene: {},
    symbolsReady: { type: Boolean }
  },
  setup(e) {
    let t = 0;
    const a = e, n = `xiaobai-map-scene-${t += 1}`, s = pm, l = z(() => Bg(a.scene.elements)), o = z(() => Er[a.scene.mood || "neutral"]), r = z(() => ({
      "--map-canvas-bg": o.value.background,
      "--map-canvas-glow": o.value.glow,
      "--map-canvas-accent": o.value.accent
    }));
    function u(y) {
      return y.geometry;
    }
    function c(y) {
      return y.geometry;
    }
    function d(y) {
      return y.geometry;
    }
    return (y, w) => (p(), be(Mr, {
      class: "map-scene-viewport",
      style: _t(r.value),
      "view-box": e.scene.viewBox,
      "reset-key": e.scene.key,
      label: `${e.scene.name} 场景地图`
    }, {
      default: ia(() => [
        i("defs", null, [
          w[0] || (w[0] = i("pattern", {
            id: "map-scene-minor-grid",
            width: "20",
            height: "20",
            patternUnits: "userSpaceOnUse"
          }, [i("path", {
            d: "M20 0H0V20",
            fill: "none",
            stroke: "rgba(102, 181, 231, .08)",
            "stroke-width": "1"
          })], -1)),
          w[1] || (w[1] = i("pattern", {
            id: "map-scene-major-grid",
            width: "100",
            height: "100",
            patternUnits: "userSpaceOnUse"
          }, [i("rect", {
            width: "100",
            height: "100",
            fill: "url(#map-scene-minor-grid)"
          }), i("path", {
            d: "M100 0H0V100",
            fill: "none",
            stroke: "rgba(102, 181, 231, .15)",
            "stroke-width": "1.4"
          })], -1)),
          (p(!0), b(te, null, ce(fe(s), (m) => (p(), b("pattern", {
            id: `${n}-material-${m}`,
            key: m,
            width: "24",
            height: "24",
            patternUnits: "userSpaceOnUse",
            class: ae(`map-material-pattern is-${m}`)
          }, [
            i("rect", {
              width: "24",
              height: "24",
              fill: fe(Tr)[m]
            }, null, 8, mm),
            m === "wood" ? (p(), b("path", bm)) : m === "stone" ? (p(), b("path", hm)) : m === "tile" || m === "marble" ? (p(), b("path", ym)) : m === "water" ? (p(), b("path", km)) : m === "grass" ? (p(), b("path", wm)) : m === "dirt" ? (p(), b("path", xm)) : m === "sand" ? (p(), b("circle", Sm)) : H("", !0),
            m === "sand" ? (p(), b("circle", _m)) : m === "snow" ? (p(), b("path", $m)) : m === "metal" ? (p(), b("path", Cm)) : H("", !0),
            m === "metal" ? (p(), b("circle", Am)) : H("", !0),
            m === "metal" ? (p(), b("circle", Mm)) : m === "fabric" || m === "carpet" || m === "bed-sheet" || m === "tatami" ? (p(), b("path", Tm)) : m === "blood" ? (p(), b("path", Em)) : m === "rune" ? (p(), b("path", Im)) : m === "warm-light" || m === "cold-light" || m === "shadow" ? (p(), b("path", Pm)) : H("", !0)
          ], 10, gm))), 128)),
          w[2] || (w[2] = i("filter", {
            id: "map-scene-icon-glow",
            x: "-80%",
            y: "-80%",
            width: "260%",
            height: "260%"
          }, [i("feGaussianBlur", {
            stdDeviation: "2.5",
            result: "blur"
          }), i("feMerge", null, [i("feMergeNode", { in: "blur" }), i("feMergeNode", { in: "SourceGraphic" })])], -1))
        ]),
        i("rect", {
          x: e.scene.viewBox[0],
          y: e.scene.viewBox[1],
          width: e.scene.viewBox[2],
          height: e.scene.viewBox[3],
          fill: "var(--map-canvas-bg)"
        }, null, 8, Om),
        i("rect", {
          x: e.scene.viewBox[0],
          y: e.scene.viewBox[1],
          width: e.scene.viewBox[2],
          height: e.scene.viewBox[3],
          fill: "url(#map-scene-major-grid)"
        }, null, 8, Lm),
        i("ellipse", {
          cx: e.scene.viewBox[0] + e.scene.viewBox[2] / 2,
          cy: e.scene.viewBox[1] + e.scene.viewBox[3] / 2,
          rx: e.scene.viewBox[2] * 0.42,
          ry: e.scene.viewBox[3] * 0.42,
          fill: "var(--map-canvas-glow)"
        }, null, 8, Rm),
        (p(!0), b(te, null, ce(l.value, (m) => (p(), b("g", {
          key: m.id,
          class: ae(["map-scene-element", [`is-${m.category}`, `is-${m.certainty || "confirmed"}`]]),
          opacity: fe(Ue)(m, n).opacity
        }, [m.shape === "rect" ? (p(), b("rect", {
          key: 0,
          x: u(m).x,
          y: u(m).y,
          width: u(m).width,
          height: u(m).height,
          fill: fe(Ue)(m, n).fill,
          stroke: fe(Ue)(m, n).stroke,
          "stroke-width": fe(Ue)(m, n).width,
          "stroke-dasharray": fe(Ue)(m, n).dash,
          "vector-effect": "non-scaling-stroke"
        }, null, 8, Bm)) : m.shape === "circle" ? (p(), b("circle", {
          key: 1,
          cx: c(m).x,
          cy: c(m).y,
          r: c(m).radius,
          fill: fe(Ue)(m, n).fill,
          stroke: fe(Ue)(m, n).stroke,
          "stroke-width": fe(Ue)(m, n).width,
          "stroke-dasharray": fe(Ue)(m, n).dash,
          "vector-effect": "non-scaling-stroke"
        }, null, 8, Nm)) : m.shape === "path" || m.shape === "curve" ? (p(), b("path", {
          key: 2,
          d: fe(Dg)(m),
          fill: fe(Ue)(m, n).fill,
          stroke: fe(Ue)(m, n).stroke,
          "stroke-width": fe(Ue)(m, n).width,
          "stroke-dasharray": fe(Ue)(m, n).dash,
          "stroke-linecap": "round",
          "stroke-linejoin": "round",
          "fill-rule": "evenodd",
          "vector-effect": "non-scaling-stroke"
        }, null, 8, qm)) : m.shape === "icon" ? (p(), b("g", {
          key: 3,
          class: "map-scene-icon",
          transform: `translate(${d(m).x} ${d(m).y})`
        }, [i("circle", {
          r: "11",
          stroke: fe(Ue)(m, n).stroke
        }, null, 8, Fm), e.symbolsReady ? (p(), b("text", jm, h(fe(Ue)(m, n).icon), 1)) : (p(), b("text", Hm, h(fe(Ue)(m, n).fallback), 1))], 8, Um)) : m.shape === "label" ? (p(), b("text", {
          key: 4,
          class: "map-scene-label is-primary",
          x: d(m).x,
          y: d(m).y
        }, h(m.label || ""), 9, Km)) : H("", !0), m.label && m.shape !== "label" ? (p(), b("text", {
          key: 5,
          class: "map-scene-label",
          x: fe(Yi)(m)[0],
          y: fe(Yi)(m)[1]
        }, h(m.label), 9, Gm)) : H("", !0)], 10, Dm))), 128))
      ]),
      _: 1
    }, 8, [
      "style",
      "view-box",
      "reset-key",
      "label"
    ]));
  }
}), Vm = zm, Wm = {
  class: "map-settings",
  "aria-labelledby": "map-settings-title"
}, Ym = { class: "map-settings-body" }, Xm = { class: "map-settings-card" }, Jm = { class: "map-setting-row" }, Qm = [
  "aria-checked",
  "aria-label",
  "disabled"
], Zm = { class: "map-settings-card" }, eb = ["disabled", "title"], tb = { class: "map-settings-card is-danger-zone" }, ab = { class: "map-settings-action-copy" }, nb = ["disabled", "title"], sb = {
  key: 0,
  class: "map-disabled-reason",
  role: "status"
}, ib = {
  key: 1,
  class: "map-maintenance-message",
  role: "status"
}, lb = /* @__PURE__ */ re({
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
    return (t, a) => (p(), b("aside", Wm, [i("header", null, [a[4] || (a[4] = i("div", null, [i("span", null, "MAP SYSTEM / CONFIG"), i("h2", { id: "map-settings-title" }, "地图设置")], -1)), i("button", {
      type: "button",
      class: "map-icon-button",
      "aria-label": "关闭地图设置",
      onClick: a[0] || (a[0] = (n) => t.$emit("close"))
    }, "×")]), i("div", Ym, [
      i("section", Xm, [i("div", Jm, [a[6] || (a[6] = i("div", null, [i("h3", null, "所有普通聊天自动维护"), i("p", null, "每次发送新的 User 消息后，让地图维护刚被接受的上一轮空间事实。")], -1)), i("button", {
        type: "button",
        class: "map-switch",
        role: "switch",
        "aria-checked": e.autoMaintenance,
        "aria-label": e.autoMaintenance ? "关闭所有普通聊天自动维护" : "开启所有普通聊天自动维护",
        disabled: e.autoToggleBusy,
        onClick: a[1] || (a[1] = (n) => t.$emit("setAutoMaintenance", !e.autoMaintenance))
      }, [...a[5] || (a[5] = [i("span", null, null, -1)])], 8, Qm)]), a[7] || (a[7] = i("div", { class: "map-cost-note" }, [i("strong", null, "API 成本说明"), i("p", null, "自动维护和下方两个手动操作都会调用已配置的 AI 模型，消耗 token / API 额度。切换此开关本身只保存设置，不会立即调用 AI。")], -1))]),
      i("section", Zm, [a[8] || (a[8] = i("div", { class: "map-settings-action-copy" }, [i("h3", null, "增量维护"), i("p", null, "读取聊天尾部最新完整的 User 与 Assistant 对话，补充地点、路线、人物位置和场景细节。")], -1)), i("button", {
        type: "button",
        class: "map-action-button",
        disabled: e.busy || !!e.disabledReason || !e.hasMap,
        title: e.hasMap ? e.disabledReason : "请先从当前聊天建立地图",
        onClick: a[2] || (a[2] = (n) => t.$emit("maintainOnce"))
      }, h(e.maintenanceStatus === "maintaining" ? "正在维护…" : "维护一次"), 9, eb)]),
      i("section", tb, [i("div", ab, [i("h3", null, h(e.hasMap ? "重建地图" : "建立地图"), 1), a[9] || (a[9] = i("p", null, "重新读取当前聊天并生成完整地图。已有地图会在保存成功后被新结果替换。", -1))]), i("button", {
        type: "button",
        class: "map-action-button is-strong",
        disabled: e.busy || !!e.disabledReason,
        title: e.disabledReason,
        onClick: a[3] || (a[3] = (n) => t.$emit("requestRebuild"))
      }, h(e.maintenanceStatus === "rebuilding" ? "正在重建…" : "从当前聊天建立/重建地图"), 9, nb)]),
      e.disabledReason ? (p(), b("p", sb, h(e.disabledReason), 1)) : H("", !0),
      e.maintenanceMessage ? (p(), b("p", ib, h(e.maintenanceMessage), 1)) : H("", !0)
    ])]));
  }
}), rb = lb, ob = { class: "map-app" }, ub = { class: "map-header" }, db = { class: "map-header-actions" }, cb = ["disabled"], fb = { class: "map-command-bar" }, vb = {
  class: "map-tabs",
  "aria-label": "地图视图"
}, pb = {
  key: 0,
  class: "map-location-select"
}, gb = ["disabled"], mb = {
  key: 0,
  value: ""
}, bb = ["value"], hb = {
  key: 1,
  class: "map-atlas-summary",
  "aria-label": "世界地图统计"
}, yb = { class: "map-notice-code" }, kb = { key: 0 }, wb = ["disabled"], xb = ["disabled"], Sb = ["disabled"], _b = {
  key: 0,
  class: "map-empty-state"
}, $b = ["disabled"], Cb = {
  key: 1,
  class: "map-empty-state"
}, Ab = ["disabled"], Mb = {
  key: 2,
  class: "map-empty-state"
}, Tb = ["disabled"], Eb = { class: "map-canvas-heading" }, Ib = {
  class: "map-legend is-scene",
  "aria-label": "场景地图图例"
}, Pb = {
  key: 0,
  class: "map-location-brief"
}, Ob = {
  key: 0,
  class: "map-empty-state"
}, Lb = ["disabled"], Rb = { class: "map-canvas-heading is-atlas" }, Db = { key: 0 }, Bb = {
  key: 2,
  class: "map-loading-scrim",
  role: "status"
}, Nb = {
  class: "map-dialog",
  role: "alertdialog",
  "aria-modal": "true",
  "aria-labelledby": "map-rebuild-title"
}, qb = { id: "map-rebuild-title" }, Ub = {
  key: 0,
  class: "map-dialog-error",
  role: "alert"
}, Fb = ["disabled"], jb = ["disabled", "title"], Ji = 35e3, Hb = 18e4, Kb = 24e4, Gb = "Xiaobai Map Symbols", zb = /* @__PURE__ */ re({
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
        t = new FontFace(Gb, `url("${k}")`, {
          display: "block",
          style: "normal",
          weight: "400"
        }).load().catch((O) => {
          throw t = null, O;
        });
      }
      return t;
    }
    function s() {
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
    function l(E) {
      return !E || typeof E != "object" ? s() : structuredClone(/* @__PURE__ */ ie(E));
    }
    function o(E) {
      const k = E.map;
      if (!k) return "";
      const O = new Map(k.atlas.locations.map((K) => [K.key, K]));
      let N = O.get(k.atlas.actors.find((K) => K.actorKey === "player")?.locationKey || "");
      const Y = /* @__PURE__ */ new Set();
      for (; N && !Y.has(N.key); ) {
        if (Y.add(N.key), N.sceneKey && k.scenes[N.sceneKey]) return N.key;
        N = N.parent ? O.get(N.parent) : void 0;
      }
      return k.atlas.locations.find((K) => K.sceneKey && k.scenes[K.sceneKey])?.key || "";
    }
    const r = /* @__PURE__ */ W(l(a.initialState)), u = /* @__PURE__ */ W("scene"), c = /* @__PURE__ */ W(o(r.value)), d = /* @__PURE__ */ W(!1), y = /* @__PURE__ */ W(!1), w = /* @__PURE__ */ W(null), m = /* @__PURE__ */ W(""), A = /* @__PURE__ */ W(""), P = /* @__PURE__ */ W(!1);
    let R = () => {
    }, q = 0, U = 0, L = !1;
    const M = z(() => {
      const E = r.value.map;
      return E ? E.atlas.locations.filter((k) => k.sceneKey && E.scenes[k.sceneKey]) : [];
    }), _ = z(() => r.value.map?.atlas.actors.find((E) => E.actorKey === "player") || null), T = z(() => r.value.map?.atlas.locations.find((E) => E.key === _.value?.locationKey) || null), S = z(() => r.value.map?.atlas.locations.find((E) => E.key === c.value) || null), $ = z(() => {
      const E = S.value?.sceneKey;
      return E && r.value.map?.scenes[E] || null;
    }), C = z(() => {
      const E = r.value.map;
      let k = S.value;
      if (!E || !k) return "";
      const O = new Map(E.atlas.locations.map((K) => [K.key, K])), N = [], Y = /* @__PURE__ */ new Set();
      for (; k && !Y.has(k.key); )
        Y.add(k.key), N.unshift(k.name), k = k.parent && O.get(k.parent) || null;
      return N.join(" / ");
    }), G = z(() => r.value.status === "loading" || r.value.status === "saving" || r.value.maintenanceStatus === "maintaining" || r.value.maintenanceStatus === "rebuilding"), Z = z(() => w.value !== null || G.value), X = z(() => r.value.status === "unconfirmed" || r.value.writeState === "unconfirmed"), J = z(() => Z.value || X.value), j = z(() => w.value ? "正在处理上一项地图操作" : r.value.maintenanceStatus === "maintaining" ? "地图正在维护，请等待本次维护完成" : r.value.maintenanceStatus === "rebuilding" ? "地图正在重建，请等待本次重建完成" : r.value.status === "loading" ? "地图状态正在载入" : r.value.status === "saving" ? "地图正在保存" : X.value ? "请先核实上一次保存结果" : r.value.status === "conflict" ? "地图版本发生冲突，请先采用服务端数据" : r.value.status === "blocked" ? r.value.message || "当前地图不可维护" : r.value.status === "error" ? r.value.message || "地图状态异常，请先重新读取" : r.value.chatIdentity ? "" : "当前聊天不可用"), ue = Object.freeze({
      ready: "地图就绪",
      loading: "正在载入",
      saving: "正在保存",
      unconfirmed: "保存待核实",
      conflict: "版本冲突",
      blocked: "暂时不可用",
      error: "状态异常"
    }), he = z(() => r.value.maintenanceStatus === "maintaining" ? "正在维护地图" : r.value.maintenanceStatus === "rebuilding" ? "正在重建地图" : w.value === "refresh" ? "正在重新读取" : w.value === "settings" ? "正在保存设置" : w.value === "confirm" ? "正在核实保存" : w.value === "adopt" ? "正在采用服务端数据" : w.value === "maintain" ? "正在维护地图" : w.value === "rebuild" ? "正在重建地图" : ue[r.value.status]), de = z(() => !!(m.value || r.value.message || r.value.maintenanceMessage || A.value) || Z.value || r.value.status !== "ready" || r.value.maintenanceStatus === "error"), pe = z(() => m.value || [
      "error",
      "blocked",
      "conflict"
    ].includes(r.value.status) || r.value.maintenanceStatus === "error" ? "danger" : X.value ? "warning" : Z.value ? "busy" : "info"), Ae = z(() => X.value ? "保存结果尚未确认" : r.value.status === "conflict" ? "地图版本发生冲突" : r.value.maintenanceStatus === "error" ? "地图维护未完成" : m.value || r.value.status === "error" ? "地图操作未完成" : r.value.status === "blocked" ? "地图暂时不可用" : he.value), Oe = z(() => m.value || r.value.maintenanceMessage || r.value.message || A.value), ft = z(() => Er[$.value?.mood || "neutral"]), Le = z(() => ({
      locations: r.value.map?.atlas.locations.length || 0,
      routes: r.value.map?.atlas.links.length || 0,
      actors: r.value.map?.atlas.actors.length || 0
    }));
    function Re(E) {
      return E !== null && typeof E == "object" && !Array.isArray(E);
    }
    function Yt(E) {
      if (!Re(E)) return null;
      const k = E.result, O = Re(k) && Re(k.state) ? k.state : k;
      return Re(O) && typeof O.chatIdentity == "string" && typeof O.status == "string" ? O : null;
    }
    function qt(E, k) {
      const O = E.map;
      if (O) {
        const N = O.atlas.locations.find((Y) => Y.key === k);
        if (N?.sceneKey && O.scenes[N.sceneKey]) return k;
      }
      return o(E);
    }
    function V(E) {
      const k = structuredClone(E);
      c.value = qt(k, k.chatIdentity === r.value.chatIdentity ? c.value : ""), r.value = k, m.value = "", A.value = "";
    }
    function F(E, k) {
      const O = E instanceof Error ? E.message : String(E);
      return O.includes("聊天已切换") ? "聊天已切换，请重新打开地图。" : O.includes("map_revision_conflict") ? "地图已被另一项操作更新，请重新读取后再试。" : O.includes("无法确认小白 OS 设置已经保存") ? "自动维护已按当前选择运行，但服务端保存结果未确认。" : O === "host_request_timeout" ? k === "maintain" || k === "rebuild" ? "等待 AI 处理超时；后台结果仍可能稍后送达，请勿立即重复操作。" : "等待地图服务响应超时，请稍后重试。" : O.includes("已有") && O.includes("维护") ? "已有地图维护正在进行，请等待完成。" : k === "settings" ? "自动维护设置未能保存，请重试。" : k === "refresh" ? "地图状态未能重新读取，请稍后重试。" : k === "confirm" ? "保存结果仍无法确认，请稍后再次核实。" : k === "adopt" ? "暂时无法采用服务端数据，冲突仍保持冻结。" : k === "rebuild" ? "地图建立/重建未完成，请检查模型配置后重试。" : "地图维护未完成，请检查模型配置后重试。";
    }
    async function se(E, k, O = Ji, N = {}) {
      if (w.value) return null;
      const Y = ++q, K = U, Q = r.value.chatIdentity;
      w.value = k, m.value = "", A.value = "";
      try {
        const ee = await a.bridge.request(E, {
          chatIdentity: Q,
          ...N
        }, O);
        if (!L || Y !== q || r.value.chatIdentity !== Q) return null;
        const oe = U !== K, ge = Yt(ee);
        let me = !1;
        return !oe && ge?.chatIdentity === Q && (V(ge), me = !0), {
          response: ee,
          stateApplied: me,
          newerStateReceived: oe
        };
      } catch (ee) {
        return L && Y === q && (m.value = F(ee, k)), null;
      } finally {
        L && Y === q && (w.value = null);
      }
    }
    async function Te() {
      J.value || await se("map/refresh", "refresh") && (A.value = "已读取当前聊天的最新地图状态。");
    }
    async function st() {
      Z.value || await se("map/confirm-save", "confirm") && (A.value = "保存结果已重新核实。");
    }
    async function Xt() {
      if (Z.value) return;
      const E = await se("map/adopt-server-state", "adopt");
      if (!E) return;
      const k = Re(E.response) ? E.response.result : null;
      A.value = (Re(k) ? k.adoption : "") === "adopted" ? "已采用服务端数据，可以继续维护地图。" : "服务端数据仍无法采用，地图继续保持冻结。";
    }
    function g(E) {
      const k = Re(E.response) ? E.response.result : null;
      return Re(k) && typeof k.message == "string" ? k.message : "地图操作已结束。";
    }
    async function f(E) {
      if (w.value) return;
      const k = await se("map/set-auto-maintenance", "settings", Ji, { enabled: E });
      k && (!k.stateApplied && !k.newerStateReceived && (r.value = {
        ...r.value,
        autoMaintenance: E
      }), A.value = E ? "普通聊天自动维护已开启。" : "普通聊天自动维护已关闭。");
    }
    async function v() {
      if (j.value || !r.value.map) return;
      const E = await se("map/maintain-once", "maintain", Hb);
      E && (A.value = g(E));
    }
    function x() {
      j.value || (y.value = !0);
    }
    async function I() {
      if (j.value) return;
      const E = await se("map/rebuild", "rebuild", Kb);
      E && (y.value = !1, A.value = g(E));
    }
    function B(E) {
      const k = r.value.map?.atlas.locations.find((O) => O.key === E);
      !k?.sceneKey || !r.value.map?.scenes[k.sceneKey] || (c.value = E, u.value = "scene");
    }
    function D(E) {
      return E.key === T.value?.key ? `${E.name}（当前位置）` : E.name;
    }
    return nt(() => {
      L = !0, R = a.bridge.subscribe((E) => {
        if (E.type === "map/state") {
          const k = E.payload?.state;
          k && (U += 1, V(k));
        }
        E.type === "map/error" && (U += 1, A.value = "", m.value = E.payload?.message || "地图服务报告了一个错误，请重新读取。");
      }), typeof FontFace == "function" && document.fonts?.add && n().then((E) => {
        document.fonts.add(E), L && (P.value = !0);
      }).catch(() => {
        P.value = !1;
      });
    }), ct(() => {
      L = !1, q += 1, R(), y.value = !1;
    }), (E, k) => (p(), b("main", ob, [
      i("header", ub, [k[12] || (k[12] = i("div", { class: "map-brand" }, [i("span", {
        class: "map-brand-mark",
        "aria-hidden": "true"
      }, [
        i("i"),
        i("i"),
        i("i")
      ]), i("div", null, [i("small", null, "XIAOBAI CARTOGRAPHY / 01"), i("h1", null, "地图")])], -1)), i("div", db, [
        i("span", { class: ae(["map-status-chip", `is-${pe.value}`]) }, [k[9] || (k[9] = i("i", null, null, -1)), ve(h(he.value), 1)], 2),
        i("button", {
          type: "button",
          class: "map-icon-button",
          disabled: J.value,
          title: "重新读取地图",
          "aria-label": "重新读取地图",
          onClick: Te
        }, [...k[10] || (k[10] = [i("svg", {
          viewBox: "0 0 24 24",
          "aria-hidden": "true"
        }, [i("path", { d: "M20 7v5h-5M4 17v-5h5M18.2 9A7 7 0 0 0 6.1 6.7L4 9m16 6-2.1 2.3A7 7 0 0 1 5.8 15" })], -1)])], 8, cb),
        i("button", {
          type: "button",
          class: ae(["map-icon-button", { "is-active": d.value }]),
          title: "地图设置",
          "aria-label": "地图设置",
          onClick: k[0] || (k[0] = (O) => d.value = !d.value)
        }, [...k[11] || (k[11] = [i("svg", {
          viewBox: "0 0 24 24",
          "aria-hidden": "true"
        }, [i("path", { d: "M12 8.5a3.5 3.5 0 1 0 0 7 3.5 3.5 0 0 0 0-7zM19 13.5l2-1.5-2-1.5-.5-1.3.4-2.5-2.5-.4L15 4l-2 1h-2L9 4 7.6 6.3l-2.5.4.4 2.5L5 10.5 3 12l2 1.5.5 1.3-.4 2.5 2.5.4L9 20l2-1h2l2 1 1.4-2.3 2.5-.4-.4-2.5z" })], -1)])], 2)
      ])]),
      i("div", fb, [i("nav", vb, [i("button", {
        type: "button",
        class: ae({ "is-active": u.value === "scene" }),
        onClick: k[1] || (k[1] = (O) => u.value = "scene")
      }, "场景", 2), i("button", {
        type: "button",
        class: ae({ "is-active": u.value === "atlas" }),
        onClick: k[2] || (k[2] = (O) => u.value = "atlas")
      }, "世界", 2)]), u.value === "scene" ? (p(), b("label", pb, [k[13] || (k[13] = i("span", null, "观察地点", -1)), Pe(i("select", {
        "onUpdate:modelValue": k[3] || (k[3] = (O) => c.value = O),
        disabled: M.value.length === 0
      }, [M.value.length === 0 ? (p(), b("option", mb, "暂无可查看场景")) : H("", !0), (p(!0), b(te, null, ce(M.value, (O) => (p(), b("option", {
        key: O.key,
        value: O.key
      }, h(D(O)), 9, bb))), 128))], 8, gb), [[ad, c.value]])])) : (p(), b("div", hb, [
        i("span", null, h(Le.value.locations) + " 地点", 1),
        k[14] || (k[14] = i("i", null, null, -1)),
        i("span", null, h(Le.value.routes) + " 路线", 1),
        k[15] || (k[15] = i("i", null, null, -1)),
        i("span", null, h(Le.value.actors) + " 人物", 1)
      ]))]),
      de.value ? (p(), b("aside", {
        key: 0,
        class: ae(["map-notice", `is-${pe.value}`]),
        role: "status"
      }, [
        i("span", yb, h(pe.value === "danger" ? "!" : pe.value === "warning" ? "?" : "i"), 1),
        i("div", null, [i("strong", null, h(Ae.value), 1), Oe.value ? (p(), b("p", kb, h(Oe.value), 1)) : H("", !0)]),
        X.value ? (p(), b("button", {
          key: 0,
          type: "button",
          disabled: Z.value,
          onClick: st
        }, h(w.value === "confirm" ? "正在核实…" : "确认保存结果"), 9, wb)) : r.value.status === "conflict" ? (p(), b("button", {
          key: 1,
          type: "button",
          disabled: Z.value,
          onClick: Xt
        }, h(w.value === "adopt" ? "正在采用…" : "采用服务端数据"), 9, xb)) : r.value.status === "blocked" || r.value.status === "error" || m.value ? (p(), b("button", {
          key: 2,
          type: "button",
          disabled: J.value,
          onClick: Te
        }, h(w.value === "refresh" ? "正在读取…" : "重新读取"), 9, Sb)) : H("", !0)
      ], 2)) : H("", !0),
      i("section", { class: ae(["map-workspace", { "has-notice": de.value }]) }, [u.value === "scene" ? (p(), b(te, { key: 0 }, [r.value.map ? $.value ? $.value.status === "uninitialized" ? (p(), b("div", Mb, [
        k[24] || (k[24] = i("span", {
          class: "map-empty-radar",
          "aria-hidden": "true"
        }, [i("i")], -1)),
        k[25] || (k[25] = i("small", null, "SCENE PENDING", -1)),
        i("h2", null, h($.value.name) + " 尚未绘制", 1),
        k[26] || (k[26] = i("p", null, "地点已记录，场景几何仍待地图维护补全。", -1)),
        i("button", {
          type: "button",
          disabled: !!j.value,
          onClick: k[5] || (k[5] = (O) => d.value = !0)
        }, "打开维护设置", 8, Tb)
      ])) : (p(), b(te, { key: 3 }, [
        Ce(Vm, {
          scene: $.value,
          "symbols-ready": P.value
        }, null, 8, ["scene", "symbols-ready"]),
        i("div", Eb, [
          i("small", null, h(C.value || $.value.name), 1),
          i("h2", null, h($.value.name), 1),
          i("span", null, [i("i", { style: _t({ background: ft.value.accent }) }, null, 4), ve(h($.value.mood || "neutral"), 1)])
        ]),
        i("aside", Ib, [
          k[32] || (k[32] = i("strong", null, "图例", -1)),
          i("span", null, [k[27] || (k[27] = i("i", { class: "is-wall" }, null, -1)), ve(h(fe(da).wall), 1)]),
          i("span", null, [k[28] || (k[28] = i("i", { class: "is-road" }, null, -1)), ve(h(fe(da).road), 1)]),
          i("span", null, [k[29] || (k[29] = i("i", { class: "is-water" }, null, -1)), ve(h(fe(da).water), 1)]),
          i("span", null, [k[30] || (k[30] = i("i", { class: "is-danger" }, null, -1)), ve(h(fe(da).danger), 1)]),
          i("span", null, [k[31] || (k[31] = i("i", { class: "is-actor" }, null, -1)), ve(h(fe(da).actor), 1)]),
          k[33] || (k[33] = i("span", null, [i("i", { class: "is-inferred" }), ve("推断")], -1))
        ]),
        S.value?.brief ? (p(), b("div", Pb, h(S.value.brief), 1)) : H("", !0)
      ], 64)) : (p(), b("div", Cb, [
        k[20] || (k[20] = i("span", {
          class: "map-empty-radar",
          "aria-hidden": "true"
        }, [i("i")], -1)),
        k[21] || (k[21] = i("small", null, "SCENE NOT AVAILABLE", -1)),
        k[22] || (k[22] = i("h2", null, "暂无可绘制的场景", -1)),
        k[23] || (k[23] = i("p", null, "世界地点已经存在，但还没有地点具备场景图。可维护一次地图来补充。", -1)),
        i("button", {
          type: "button",
          disabled: !!j.value,
          onClick: k[4] || (k[4] = (O) => d.value = !0)
        }, "打开维护设置", 8, Ab)
      ])) : (p(), b("div", _b, [
        k[16] || (k[16] = i("span", {
          class: "map-empty-radar",
          "aria-hidden": "true"
        }, [i("i")], -1)),
        k[17] || (k[17] = i("small", null, "NO CARTOGRAPHIC DATA", -1)),
        k[18] || (k[18] = i("h2", null, "当前聊天还没有地图", -1)),
        k[19] || (k[19] = i("p", null, "从当前聊天中识别地点、路线与场景。只有确认后才会开始调用 AI。", -1)),
        i("button", {
          type: "button",
          disabled: !!j.value,
          onClick: x
        }, "从当前聊天建立地图", 8, $b)
      ]))], 64)) : (p(), b(te, { key: 1 }, [!r.value.map || r.value.map.atlas.locations.length === 0 ? (p(), b("div", Ob, [
        k[34] || (k[34] = i("span", {
          class: "map-empty-radar",
          "aria-hidden": "true"
        }, [i("i")], -1)),
        k[35] || (k[35] = i("small", null, "ATLAS IS EMPTY", -1)),
        k[36] || (k[36] = i("h2", null, "世界地图尚未建立", -1)),
        k[37] || (k[37] = i("p", null, "建立地图后，这里会显示地点层级、通行路线和人物所在位置。", -1)),
        i("button", {
          type: "button",
          disabled: !!j.value,
          onClick: x
        }, "从当前聊天建立地图", 8, Lb)
      ])) : (p(), b(te, { key: 1 }, [
        Ce(vm, {
          atlas: r.value.map.atlas,
          revision: r.value.map.revision,
          "current-location-key": T.value?.key || "",
          "selected-location-key": c.value,
          "symbols-ready": P.value,
          onViewScene: B
        }, null, 8, [
          "atlas",
          "revision",
          "current-location-key",
          "selected-location-key",
          "symbols-ready"
        ]),
        i("div", Rb, [
          k[39] || (k[39] = i("small", null, "DETERMINISTIC WORLD GRAPH", -1)),
          k[40] || (k[40] = i("h2", null, "地点网络", -1)),
          T.value ? (p(), b("span", Db, [k[38] || (k[38] = i("i", null, null, -1)), ve("当前位置 · " + h(T.value.name), 1)])) : H("", !0)
        ]),
        k[41] || (k[41] = bu('<aside class="map-legend is-atlas" aria-label="世界地图图例"><strong>图例</strong><span><i class="is-current"></i>当前位置</span><span><i class="is-visited"></i>已到访</span><span><i class="is-route"></i>通行路线</span><span><i class="is-hierarchy"></i>隶属层级</span><small>点击有场景的地点可查看</small></aside>', 1))
      ], 64))], 64)), r.value.status === "loading" ? (p(), b("div", Bb, [...k[42] || (k[42] = [i("span", null, null, -1), i("p", null, "正在校准地图坐标", -1)])])) : H("", !0)], 2),
      Ce(dr, { name: "map-panel" }, {
        default: ia(() => [d.value ? (p(), be(rb, {
          key: 0,
          "auto-maintenance": r.value.autoMaintenance,
          busy: Z.value,
          "auto-toggle-busy": w.value !== null,
          "disabled-reason": j.value,
          "has-map": !!r.value.map,
          "maintenance-status": r.value.maintenanceStatus || "idle",
          "maintenance-message": r.value.maintenanceMessage || "",
          onClose: k[6] || (k[6] = (O) => d.value = !1),
          onSetAutoMaintenance: f,
          onMaintainOnce: v,
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
      y.value ? (p(), b("div", {
        key: 1,
        class: "map-dialog-backdrop",
        onClick: k[8] || (k[8] = ut((O) => !Z.value && (y.value = !1), ["self"]))
      }, [i("section", Nb, [
        k[43] || (k[43] = i("small", null, "AI CARTOGRAPHY REQUEST", -1)),
        i("h2", qb, h(r.value.map ? "从当前聊天重建地图？" : "从当前聊天建立地图？"), 1),
        i("p", null, "此操作会调用已配置的 AI 模型并消耗 token / API 额度。" + h(r.value.map ? "现有地图将在新地图成功保存后被替换。" : "模型会读取当前聊天并生成第一版地图。"), 1),
        m.value ? (p(), b("p", Ub, h(m.value), 1)) : H("", !0),
        i("div", null, [i("button", {
          type: "button",
          disabled: Z.value,
          onClick: k[7] || (k[7] = (O) => y.value = !1)
        }, "取消", 8, Fb), i("button", {
          type: "button",
          class: "is-confirm",
          disabled: Z.value || !!j.value,
          title: j.value,
          onClick: I
        }, h(w.value === "rebuild" || r.value.maintenanceStatus === "rebuilding" ? "正在建立地图…" : "确认并开始"), 9, jb)])
      ])])) : H("", !0)
    ]));
  }
}), Vb = zb, Wb = Object.freeze({
  id: "fourth-wall",
  name: "四次元壁",
  accent: "#7567d8"
}), Yb = ["src"], Xb = {
  key: 1,
  class: "fourth-wall-avatar is-placeholder",
  "aria-hidden": "true"
}, Jb = { class: "fourth-wall-message-stack" }, Qb = {
  key: 0,
  class: "fourth-wall-thinking"
}, Zb = { class: "fourth-wall-bubble" }, eh = {
  key: 0,
  class: "fourth-wall-message-text"
}, th = {
  key: 1,
  class: "fourth-wall-image-card"
}, ah = ["src", "alt"], nh = ["onClick"], sh = { key: 2 }, ih = { key: 3 }, lh = ["onClick"], rh = { "aria-hidden": "true" }, oh = { key: 0 }, uh = { class: "fourth-wall-message-actions" }, dh = { key: 1 }, ch = /* @__PURE__ */ re({
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
    const a = e, n = t, s = /* @__PURE__ */ W(!1), l = /* @__PURE__ */ W(""), o = /* @__PURE__ */ Dt({}), r = /* @__PURE__ */ new Set();
    let u = () => {
    };
    function c(_) {
      const T = /\[(?:img|图片)\s*:\s*([^\]]+)\]|\[(?:voice|语音)\s*:([^:\]]*):([^\]]+)\]|\[(?:voice|语音)\s*:\s*([^\]]+)\]/gi, S = [];
      let $ = 0, C;
      for (; (C = T.exec(_)) !== null; )
        C.index > $ && S.push({
          kind: "text",
          raw: _.slice($, C.index),
          value: _.slice($, C.index)
        }), C[1] !== void 0 ? S.push({
          kind: "image",
          raw: C[0],
          value: C[1].trim()
        }) : S.push({
          kind: "voice",
          raw: C[0],
          value: String(C[3] ?? C[4] ?? "").trim(),
          emotion: String(C[2] || "").trim().toLowerCase()
        }), $ = T.lastIndex;
      return $ < _.length && S.push({
        kind: "text",
        raw: _.slice($),
        value: _.slice($)
      }), S.length ? S : [{
        kind: "text",
        raw: _,
        value: _
      }];
    }
    const d = z(() => c(a.message.content)), y = z(() => a.message.ts ? new Intl.DateTimeFormat("zh-CN", {
      hour: "2-digit",
      minute: "2-digit"
    }).format(a.message.ts) : "");
    function w(_, T) {
      return `fw-${_}-${Date.now()}-${a.messageIndex}-${T}-${Math.random().toString(36).slice(2, 7)}`;
    }
    function m(_) {
      return _.result;
    }
    function A(_, T) {
      return r.has(T) && o[_]?.requestId === T;
    }
    async function P(_, T) {
      if (o[T]?.status === "loading" || o[T]?.status === "ready") return;
      if (!a.imageAvailable) {
        o[T] = {
          status: "unavailable",
          message: "画图能力未启用"
        };
        return;
      }
      const S = w("image", T);
      r.add(S), o[T] = {
        status: "loading",
        message: "查询图片缓存",
        requestId: S
      };
      const $ = {
        chatIdentity: a.chatIdentity,
        sessionId: a.sessionId
      };
      try {
        const C = m(await a.bridge.request("fourth-wall/image-check", {
          ...$,
          tags: _.value,
          mediaRequestId: S
        }, 3e4));
        if (!A(T, S)) return;
        if (!C.available) {
          o[T] = {
            status: "unavailable",
            message: "画图能力未启用",
            requestId: S
          };
          return;
        }
        let G = C.cached || "";
        if (!G) {
          o[T] = {
            status: "loading",
            message: "正在生成图片",
            requestId: S
          };
          const Z = m(await a.bridge.request("fourth-wall/image-generate", {
            ...$,
            tags: _.value,
            mediaRequestId: S
          }, 18e4));
          if (!A(T, S)) return;
          G = Z.base64;
        }
        o[T] = {
          status: "ready",
          source: /^(?:data:|blob:|https?:)/i.test(G) ? G : `data:image/png;base64,${G}`
        };
      } catch (C) {
        A(T, S) && (o[T] = {
          status: "error",
          message: C instanceof Error ? C.message : String(C),
          requestId: S
        });
      } finally {
        r.delete(S);
      }
    }
    async function R(_, T) {
      if (!a.voiceAvailable) {
        o[T] = {
          status: "unavailable",
          message: "TTS 能力未启用"
        };
        return;
      }
      const S = o[T];
      if (S?.status === "loading") return;
      if (S?.status === "playing" && S.requestId) {
        a.bridge.post("fourth-wall/voice-stop", {
          chatIdentity: a.chatIdentity,
          mediaRequestId: S.requestId
        }), o[T] = { status: "idle" };
        return;
      }
      const $ = w("voice", T);
      r.add($), o[T] = {
        status: "loading",
        message: "正在准备语音",
        requestId: $
      };
      try {
        await a.bridge.request("fourth-wall/voice-play", {
          chatIdentity: a.chatIdentity,
          sessionId: a.sessionId,
          mediaRequestId: $,
          text: _.value,
          emotion: _.emotion
        });
      } catch (C) {
        A(T, $) && (o[T] = {
          status: "error",
          message: C instanceof Error ? C.message : String(C),
          requestId: $
        }), r.delete($);
      }
    }
    function q() {
      l.value = a.message.content, s.value = !0;
    }
    function U() {
      const _ = l.value.trim();
      _ && (n("edit", a.messageIndex, _), s.value = !1);
    }
    function L() {
      r.forEach((_) => {
        a.bridge.post("fourth-wall/image-cancel", {
          chatIdentity: a.chatIdentity,
          mediaRequestId: _
        }), a.bridge.post("fourth-wall/voice-stop", {
          chatIdentity: a.chatIdentity,
          mediaRequestId: _
        });
      }), r.clear();
    }
    function M() {
      d.value.forEach((_, T) => {
        _.kind === "image" && P(_, T);
      });
    }
    return nt(() => {
      u = a.bridge.subscribe((_) => {
        if (_.type === "fourth-wall/image-progress") {
          const T = _.payload, S = Object.keys(o).map(Number).find(($) => o[$]?.requestId === T.mediaRequestId);
          S !== void 0 && (o[S].message = T.status === "queued" ? `图片队列第 ${T.position || 1} 位` : "正在生成图片");
        }
        if (_.type === "fourth-wall/voice-state") {
          const T = _.payload, S = Object.keys(o).map(Number).find(($) => o[$]?.requestId === T.requestId);
          if (S === void 0) return;
          T.state === "playing" && (o[S].status = "playing"), (T.state === "ended" || T.state === "stopped") && (r.delete(String(T.requestId || "")), o[S] = { status: "idle" }), T.state === "error" && (r.delete(String(T.requestId || "")), o[S] = {
            status: "error",
            message: T.message || "语音播放失败"
          });
        }
      }), M();
    }), at(() => a.message.content, () => {
      L(), Object.keys(o).forEach((_) => delete o[Number(_)]), M();
    }), ct(() => {
      u(), L();
    }), (_, T) => (p(), b("article", { class: ae(["fourth-wall-message", e.message.role === "user" ? "is-user" : "is-ai"]) }, [(e.message.role === "user" ? e.userAvatar : e.characterAvatar) ? (p(), b("img", {
      key: 0,
      class: "fourth-wall-avatar",
      src: e.message.role === "user" ? e.userAvatar : e.characterAvatar,
      alt: ""
    }, null, 8, Yb)) : (p(), b("span", Xb)), i("div", Jb, [
      e.message.thinking ? (p(), b("details", Qb, [T[3] || (T[3] = i("summary", null, "思考过程", -1)), i("div", null, h(e.message.thinking), 1)])) : H("", !0),
      i("div", Zb, [s.value ? Pe((p(), b("textarea", {
        key: 0,
        "onUpdate:modelValue": T[0] || (T[0] = (S) => l.value = S),
        class: "fourth-wall-edit",
        rows: "3"
      }, null, 512)), [[tt, l.value]]) : (p(!0), b(te, { key: 1 }, ce(d.value, (S, $) => (p(), b(te, { key: `${S.kind}-${$}` }, [S.kind === "text" ? (p(), b("span", eh, h(S.value), 1)) : S.kind === "image" ? (p(), b("figure", th, [o[$]?.status === "ready" ? (p(), b("img", {
        key: 0,
        src: o[$].source,
        alt: S.value
      }, null, 8, ah)) : o[$]?.status === "error" ? (p(), b("button", {
        key: 1,
        type: "button",
        onClick: (C) => P(S, $)
      }, [ve(h(S.raw), 1), i("small", null, h(o[$].message) + "，点此重试", 1)], 8, nh)) : o[$]?.status === "unavailable" ? (p(), b("div", sh, [ve(h(S.raw), 1), i("small", null, h(o[$].message), 1)])) : (p(), b("div", ih, [ve(h(S.raw), 1), i("small", null, h(o[$]?.message || "准备图片"), 1)]))])) : (p(), b("button", {
        key: 2,
        class: "fourth-wall-voice",
        type: "button",
        onClick: (C) => R(S, $)
      }, [
        i("span", rh, h(o[$]?.status === "playing" ? "■" : "▶"), 1),
        i("span", null, h(S.value), 1),
        o[$]?.message ? (p(), b("small", oh, h(o[$].message), 1)) : H("", !0)
      ], 8, lh))], 64))), 128)), i("div", uh, [s.value ? (p(), b(te, { key: 0 }, [i("button", {
        type: "button",
        onClick: U
      }, "保存"), i("button", {
        type: "button",
        onClick: T[1] || (T[1] = (S) => s.value = !1)
      }, "取消")], 64)) : (p(), b(te, { key: 1 }, [i("button", {
        type: "button",
        onClick: q
      }, "编辑"), i("button", {
        type: "button",
        onClick: T[2] || (T[2] = (S) => n("delete", e.messageIndex))
      }, "删除")], 64))])]),
      y.value ? (p(), b("time", dh, h(y.value), 1)) : H("", !0)
    ])], 2));
  }
}), fh = ch, vh = {
  key: 1,
  class: "fourth-wall-empty"
}, ph = {
  key: 2,
  class: "fourth-wall-message is-ai is-streaming"
}, gh = ["src"], mh = {
  key: 1,
  class: "fourth-wall-avatar is-placeholder"
}, bh = { class: "fourth-wall-message-stack" }, hh = {
  key: 0,
  class: "fourth-wall-thinking",
  open: ""
}, yh = { class: "fourth-wall-bubble" }, kh = {
  key: 0,
  class: "fourth-wall-unsaved"
}, wh = /* @__PURE__ */ re({
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
    const t = e, a = /* @__PURE__ */ W(null), n = /* @__PURE__ */ W(40), s = z(() => Math.max(0, t.history.length - n.value)), l = z(() => t.history.slice(s.value));
    function o() {
      n.value = Math.min(t.history.length, n.value + 40);
    }
    return at(() => t.sessionId, () => {
      n.value = 40;
    }), at(() => [t.history.length, t.generation.text], async () => {
      await nn(), a.value && (a.value.scrollTop = a.value.scrollHeight);
    }, { immediate: !0 }), (r, u) => (p(), b("section", {
      ref_key: "viewport",
      ref: a,
      class: "fourth-wall-conversation",
      "aria-live": "polite"
    }, [
      s.value > 0 ? (p(), b("button", {
        key: 0,
        type: "button",
        class: "fourth-wall-earlier",
        onClick: o
      }, " 显示更早的 " + h(s.value) + " 条记录 ", 1)) : H("", !0),
      e.history.length === 0 && e.generation.status === "idle" ? (p(), b("div", vh, [...u[2] || (u[2] = [
        i("span", null, "IV", -1),
        i("strong", null, "越过故事边界", -1),
        i("p", null, "这里是你与角色扮演者的皮下私聊。", -1)
      ])])) : H("", !0),
      (p(!0), b(te, null, ce(l.value, (c, d) => (p(), be(fh, {
        key: `${c.ts}-${s.value + d}`,
        message: c,
        "message-index": s.value + d,
        "chat-identity": e.chatIdentity,
        "session-id": e.sessionId,
        "user-avatar": e.userAvatar,
        "character-avatar": e.characterAvatar,
        "image-available": e.imageAvailable,
        "voice-available": e.voiceAvailable,
        bridge: e.bridge,
        onEdit: u[0] || (u[0] = (y, w) => r.$emit("edit", y, w)),
        onDelete: u[1] || (u[1] = (y) => r.$emit("delete", y))
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
      e.generation.status !== "idle" ? (p(), b("article", ph, [e.characterAvatar ? (p(), b("img", {
        key: 0,
        class: "fourth-wall-avatar",
        src: e.characterAvatar,
        alt: ""
      }, null, 8, gh)) : (p(), b("span", mh)), i("div", bh, [e.generation.thinking ? (p(), b("details", hh, [u[3] || (u[3] = i("summary", null, "思考中", -1)), i("div", null, h(e.generation.thinking), 1)])) : H("", !0), i("div", yh, [ve(h(e.generation.text || (e.generation.status === "error" ? e.generation.message : "等待回应...")) + " ", 1), e.generation.unsaved ? (p(), b("small", kh, "未保存")) : H("", !0)])])])) : H("", !0)
    ], 512));
  }
}), xh = wh, Sh = {
  class: "fourth-wall-modal",
  role: "dialog",
  "aria-modal": "true",
  "aria-label": "四次元壁提示词"
}, _h = { class: "fourth-wall-prompt-fields" }, $h = /* @__PURE__ */ re({
  __name: "FourthWallPromptEditor",
  props: { templates: {} },
  emits: [
    "close",
    "save",
    "restore"
  ],
  setup(e, { emit: t }) {
    const a = e, n = t, s = /* @__PURE__ */ Dt(structuredClone(/* @__PURE__ */ ie(a.templates)));
    function l() {
      n("save", structuredClone(/* @__PURE__ */ ie(s)));
    }
    return (o, r) => (p(), b("div", {
      class: "fourth-wall-modal-backdrop",
      onClick: r[6] || (r[6] = ut((u) => n("close"), ["self"]))
    }, [i("section", Sh, [
      i("header", null, [r[7] || (r[7] = i("strong", null, "提示词模板", -1)), i("button", {
        type: "button",
        onClick: r[0] || (r[0] = (u) => n("close"))
      }, "关闭")]),
      i("div", _h, [
        i("label", null, [r[8] || (r[8] = ve("Top User", -1)), Pe(i("textarea", {
          "onUpdate:modelValue": r[1] || (r[1] = (u) => s.topuser = u),
          rows: "5"
        }, null, 512), [[tt, s.topuser]])]),
        i("label", null, [r[9] || (r[9] = ve("Confirm", -1)), Pe(i("textarea", {
          "onUpdate:modelValue": r[2] || (r[2] = (u) => s.confirm = u),
          rows: "3"
        }, null, 512), [[tt, s.confirm]])]),
        i("label", null, [r[10] || (r[10] = ve("Meta Protocol", -1)), Pe(i("textarea", {
          "onUpdate:modelValue": r[3] || (r[3] = (u) => s.metaProtocol = u),
          rows: "12"
        }, null, 512), [[tt, s.metaProtocol]])]),
        i("label", null, [r[11] || (r[11] = ve("Bottom", -1)), Pe(i("textarea", {
          "onUpdate:modelValue": r[4] || (r[4] = (u) => s.bottom = u),
          rows: "5"
        }, null, 512), [[tt, s.bottom]])])
      ]),
      i("footer", null, [i("button", {
        type: "button",
        class: "is-danger",
        onClick: r[5] || (r[5] = (u) => n("restore"))
      }, "恢复默认"), i("button", {
        type: "button",
        class: "is-primary",
        onClick: l
      }, "保存")])
    ])]));
  }
}), Ch = $h, Ah = { class: "fourth-wall-settings-section" }, Mh = { class: "fourth-wall-session-row" }, Th = ["value", "disabled"], Eh = ["value"], Ih = ["disabled"], Ph = ["disabled"], Oh = ["disabled"], Lh = /* @__PURE__ */ re({
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
      const o = window.prompt("新记录名称", "新记录")?.trim();
      o && a("add", o);
    }
    function s(o, r) {
      const u = window.prompt("重命名记录", r)?.trim();
      u && a("rename", o, u);
    }
    function l(o) {
      window.confirm("确定删除当前记录吗？") && a("delete", o);
    }
    return (o, r) => (p(), b("section", Ah, [r[3] || (r[3] = i("h3", null, "聊天记录", -1)), i("div", Mh, [
      i("select", {
        value: e.activeSessionId,
        disabled: e.disabled,
        onChange: r[0] || (r[0] = (u) => a("switch", u.target.value))
      }, [(p(!0), b(te, null, ce(e.sessions, (u) => (p(), b("option", {
        key: u.id,
        value: u.id
      }, h(u.name), 9, Eh))), 128))], 40, Th),
      i("button", {
        type: "button",
        disabled: e.disabled,
        title: "新建记录",
        onClick: n
      }, "＋", 8, Ih),
      i("button", {
        type: "button",
        disabled: e.disabled,
        title: "重命名记录",
        onClick: r[1] || (r[1] = (u) => s(e.activeSessionId, e.sessions.find((c) => c.id === e.activeSessionId)?.name || ""))
      }, " 改 ", 8, Ph),
      i("button", {
        type: "button",
        disabled: e.disabled || e.sessions.length <= 1,
        title: "删除记录",
        class: "is-danger",
        onClick: r[2] || (r[2] = (u) => l(e.activeSessionId))
      }, " 删 ", 8, Oh)
    ])]));
  }
}), Rh = Lh, Dh = {
  class: "fourth-wall-settings",
  "aria-label": "四次元壁设置"
}, Bh = { class: "fourth-wall-settings-scroll" }, Nh = { class: "fourth-wall-settings-section" }, qh = { class: "is-toggle" }, Uh = { class: "is-toggle" }, Fh = ["disabled"], jh = { class: "fourth-wall-settings-section" }, Hh = { class: "is-toggle" }, Kh = { class: "is-toggle" }, Gh = { class: "is-toggle" }, zh = { key: 0 }, Vh = ["disabled"], Wh = { class: "fourth-wall-settings-section is-actions" }, Yh = /* @__PURE__ */ re({
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
    const a = e, n = t, s = /* @__PURE__ */ Dt(structuredClone(/* @__PURE__ */ ie(a.chat.settings))), l = /* @__PURE__ */ Dt(structuredClone(/* @__PURE__ */ ie(a.global)));
    function o() {
      n("updateChat", structuredClone(/* @__PURE__ */ ie(s)));
    }
    function r() {
      n("updateGlobal", {
        image: structuredClone(/* @__PURE__ */ ie(l.image)),
        voice: structuredClone(/* @__PURE__ */ ie(l.voice)),
        commentary: structuredClone(/* @__PURE__ */ ie(l.commentary))
      });
    }
    return (u, c) => (p(), b("aside", Dh, [i("header", null, [c[14] || (c[14] = i("strong", null, "四次元壁设置", -1)), i("button", {
      type: "button",
      onClick: c[0] || (c[0] = (d) => n("close"))
    }, "关闭")]), i("div", Bh, [
      Ce(Rh, {
        sessions: e.chat.sessions,
        "active-session-id": e.chat.activeSessionId,
        disabled: e.busy,
        onSwitch: c[1] || (c[1] = (d) => n("switchSession", d)),
        onAdd: c[2] || (c[2] = (d) => n("addSession", d)),
        onRename: c[3] || (c[3] = (d, y) => n("renameSession", d, y)),
        onDelete: c[4] || (c[4] = (d) => n("deleteSession", d))
      }, null, 8, [
        "sessions",
        "active-session-id",
        "disabled"
      ]),
      i("section", Nh, [
        c[19] || (c[19] = i("h3", null, "上下文", -1)),
        i("label", null, [c[15] || (c[15] = ve("普通聊天层数", -1)), Pe(i("input", {
          "onUpdate:modelValue": c[5] || (c[5] = (d) => s.maxChatLayers = d),
          type: "number",
          min: "1",
          max: "9999"
        }, null, 512), [[
          tt,
          s.maxChatLayers,
          void 0,
          { number: !0 }
        ]])]),
        i("label", null, [c[16] || (c[16] = ve("皮下聊天轮数", -1)), Pe(i("input", {
          "onUpdate:modelValue": c[6] || (c[6] = (d) => s.maxMetaTurns = d),
          type: "number",
          min: "1",
          max: "9999"
        }, null, 512), [[
          tt,
          s.maxMetaTurns,
          void 0,
          { number: !0 }
        ]])]),
        i("label", qh, [c[17] || (c[17] = i("span", null, "流式生成", -1)), Pe(i("input", {
          "onUpdate:modelValue": c[7] || (c[7] = (d) => s.stream = d),
          type: "checkbox"
        }, null, 512), [[Pa, s.stream]])]),
        i("label", Uh, [c[18] || (c[18] = i("span", null, "禁用 Assistant Prefill", -1)), Pe(i("input", {
          "onUpdate:modelValue": c[8] || (c[8] = (d) => s.disableAssistantPrefill = d),
          type: "checkbox"
        }, null, 512), [[Pa, s.disableAssistantPrefill]])]),
        i("button", {
          type: "button",
          class: "is-primary",
          disabled: e.busy,
          onClick: o
        }, "保存上下文设置", 8, Fh)
      ]),
      i("section", jh, [
        c[23] || (c[23] = i("h3", null, "能力", -1)),
        i("label", Hh, [c[20] || (c[20] = i("span", null, "在提示词中允许图片", -1)), Pe(i("input", {
          "onUpdate:modelValue": c[9] || (c[9] = (d) => l.image.enablePrompt = d),
          type: "checkbox"
        }, null, 512), [[Pa, l.image.enablePrompt]])]),
        i("label", Kh, [c[21] || (c[21] = i("span", null, "在提示词中允许语音", -1)), Pe(i("input", {
          "onUpdate:modelValue": c[10] || (c[10] = (d) => l.voice.enabled = d),
          type: "checkbox"
        }, null, 512), [[Pa, l.voice.enabled]])]),
        i("label", Gh, [c[22] || (c[22] = i("span", null, "实时吐槽", -1)), Pe(i("input", {
          "onUpdate:modelValue": c[11] || (c[11] = (d) => l.commentary.enabled = d),
          type: "checkbox"
        }, null, 512), [[Pa, l.commentary.enabled]])]),
        l.commentary.enabled ? (p(), b("label", zh, [ve(" 吐槽概率 " + h(l.commentary.probability) + "% ", 1), Pe(i("input", {
          "onUpdate:modelValue": c[12] || (c[12] = (d) => l.commentary.probability = d),
          type: "range",
          min: "1",
          max: "99"
        }, null, 512), [[
          tt,
          l.commentary.probability,
          void 0,
          { number: !0 }
        ]])])) : H("", !0),
        i("button", {
          type: "button",
          class: "is-primary",
          disabled: e.busy,
          onClick: r
        }, "保存能力设置", 8, Vh)
      ]),
      i("section", Wh, [i("button", {
        type: "button",
        onClick: c[13] || (c[13] = (d) => n("openPrompts"))
      }, "提示词模板")])
    ])]));
  }
}), Xh = Yh, Jh = { class: "fourth-wall-app" }, Qh = { class: "fourth-wall-header" }, Zh = { class: "fourth-wall-heading" }, ey = { class: "fourth-wall-header-actions" }, ty = ["disabled"], ay = ["disabled"], ny = {
  key: 0,
  class: "fourth-wall-error",
  role: "alert"
}, sy = { class: "fourth-wall-composer" }, iy = ["disabled"], ly = ["disabled"], ry = 35e3, oy = /* @__PURE__ */ re({
  __name: "FourthWallApp",
  props: {
    bridge: {},
    initialState: {}
  },
  setup(e) {
    const t = e, a = /* @__PURE__ */ W(structuredClone(/* @__PURE__ */ ie(t.initialState))), n = /* @__PURE__ */ W(""), s = /* @__PURE__ */ W(!1), l = /* @__PURE__ */ W(!1), o = /* @__PURE__ */ W(!1), r = /* @__PURE__ */ W(""), u = /* @__PURE__ */ W(!1), c = /* @__PURE__ */ W({
      status: "idle",
      sessionId: "",
      text: "",
      thinking: "",
      message: "",
      unsaved: !1
    });
    let d = () => {
    };
    const y = z(() => a.value.chat.sessions.find(($) => $.id === a.value.chat.activeSessionId)), w = z(() => c.value.status === "started" || c.value.status === "progress");
    function m($ = y.value.id) {
      return {
        chatIdentity: a.value.chatIdentity,
        sessionId: $
      };
    }
    function A($) {
      return structuredClone($.result);
    }
    async function P($, C) {
      o.value = !0, r.value = "";
      try {
        a.value = A(await t.bridge.request($, C, ry));
      } catch (G) {
        r.value = G instanceof Error ? G.message : String(G);
      } finally {
        o.value = !1;
      }
    }
    async function R() {
      const $ = n.value.trim();
      !$ || w.value || o.value || (n.value = "", c.value = {
        status: "started",
        sessionId: y.value.id,
        text: "",
        thinking: "",
        message: "",
        unsaved: !1
      }, await P("fourth-wall/send", {
        ...m(),
        content: $
      }), r.value && (c.value.status = "idle"));
    }
    async function q() {
      w.value || o.value || (c.value = {
        status: "started",
        sessionId: y.value.id,
        text: "",
        thinking: "",
        message: "",
        unsaved: !1
      }, await P("fourth-wall/regenerate", m()), r.value && (c.value.status = "idle"));
    }
    function U() {
      t.bridge.post("fourth-wall/cancel", m());
    }
    function L($) {
      $.key !== "Enter" || $.shiftKey || u.value || ($.preventDefault(), w.value ? U() : R());
    }
    function M($) {
      window.confirm("确定删除这条消息吗？") && P("fourth-wall/delete-message", {
        ...m(),
        messageIndex: $
      });
    }
    function _() {
      window.confirm("确定清空当前记录吗？") && P("fourth-wall/clear-history", m());
    }
    function T($) {
      P("fourth-wall/update-chat-settings", {
        ...m(),
        patch: $
      });
    }
    function S($) {
      P("fourth-wall/update-global-settings", {
        ...m(),
        patch: $
      });
    }
    return nt(() => {
      d = t.bridge.subscribe(($) => {
        if ($.type === "fourth-wall/state" && (a.value = structuredClone($.payload.state)), $.type !== "fourth-wall/generation") return;
        const C = $.payload;
        if (!(C.sessionId && C.sessionId !== y.value.id)) {
          if (C.status === "complete" || C.status === "cancelled") {
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
          if (C.status === "error") {
            r.value = C.message || "生成失败", c.value = C.kind === "save" && (C.draft?.text || C.draft?.thinking) ? {
              status: "error",
              sessionId: C.sessionId || y.value.id,
              text: C.draft?.text || "",
              thinking: C.draft?.thinking || "",
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
            status: C.status || "progress",
            sessionId: C.sessionId || y.value.id,
            text: C.text || c.value.text,
            thinking: C.thinking || c.value.thinking,
            message: "",
            unsaved: !1
          };
        }
      });
    }), ct(() => d()), ($, C) => (p(), b("main", Jh, [
      i("header", Qh, [i("div", Zh, [C[17] || (C[17] = i("span", null, "IV", -1)), i("div", null, [C[16] || (C[16] = i("strong", null, "四次元壁", -1)), i("small", null, h(y.value.name), 1)])]), i("div", ey, [
        i("button", {
          type: "button",
          title: "重答",
          disabled: o.value || w.value,
          onClick: q
        }, "↻", 8, ty),
        i("button", {
          type: "button",
          title: "清空当前记录",
          "aria-label": "清空当前记录",
          disabled: o.value,
          onClick: _
        }, [...C[18] || (C[18] = [i("svg", {
          viewBox: "0 0 24 24",
          "aria-hidden": "true"
        }, [i("path", { d: "M4 7h16M9 7V4h6v3m3 0-1 13H7L6 7m4 4v5m4-5v5" })], -1)])], 8, ay),
        i("button", {
          type: "button",
          title: "设置",
          onClick: C[0] || (C[0] = (G) => s.value = !0)
        }, "⚙")
      ])]),
      r.value ? (p(), b("div", ny, [i("span", null, h(r.value), 1), i("button", {
        type: "button",
        onClick: C[1] || (C[1] = (G) => r.value = "")
      }, "×")])) : H("", !0),
      Ce(xh, {
        history: y.value.history,
        "session-id": y.value.id,
        "chat-identity": a.value.chatIdentity,
        "user-avatar": a.value.userAvatar,
        "character-avatar": a.value.characterAvatar,
        "image-available": a.value.capabilities.image.available,
        "voice-available": a.value.capabilities.voice.available,
        generation: c.value,
        bridge: e.bridge,
        onEdit: C[2] || (C[2] = (G, Z) => P("fourth-wall/edit-message", {
          ...m(),
          messageIndex: G,
          content: Z
        })),
        onDelete: M
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
      i("footer", sy, [Pe(i("textarea", {
        "onUpdate:modelValue": C[3] || (C[3] = (G) => n.value = G),
        rows: "1",
        placeholder: "聊点什么...",
        disabled: o.value,
        onCompositionstart: C[4] || (C[4] = (G) => u.value = !0),
        onCompositionend: C[5] || (C[5] = (G) => u.value = !1),
        onKeydown: L
      }, null, 40, iy), [[tt, n.value]]), i("button", {
        type: "button",
        class: ae({ "is-stop": w.value }),
        disabled: o.value,
        onClick: C[6] || (C[6] = (G) => w.value ? U() : R())
      }, h(w.value ? "■" : "↑"), 11, ly)]),
      s.value ? (p(), be(Xh, {
        key: 1,
        chat: a.value.chat,
        global: a.value.global,
        busy: o.value || w.value,
        onClose: C[7] || (C[7] = (G) => s.value = !1),
        onUpdateChat: T,
        onUpdateGlobal: S,
        onSwitchSession: C[8] || (C[8] = (G) => P("fourth-wall/switch-session", {
          ...m(),
          targetSessionId: G
        })),
        onAddSession: C[9] || (C[9] = (G) => P("fourth-wall/add-session", {
          ...m(),
          name: G
        })),
        onRenameSession: C[10] || (C[10] = (G, Z) => P("fourth-wall/rename-session", {
          ...m(G),
          name: Z
        })),
        onDeleteSession: C[11] || (C[11] = (G) => P("fourth-wall/delete-session", m(G))),
        onOpenPrompts: C[12] || (C[12] = (G) => l.value = !0)
      }, null, 8, [
        "chat",
        "global",
        "busy"
      ])) : H("", !0),
      l.value ? (p(), be(Ch, {
        key: 2,
        templates: a.value.global.promptTemplates,
        onClose: C[13] || (C[13] = (G) => l.value = !1),
        onSave: C[14] || (C[14] = (G) => {
          S({ promptTemplates: G }), l.value = !1;
        }),
        onRestore: C[15] || (C[15] = () => {
          P("fourth-wall/restore-prompts", m()), l.value = !1;
        })
      }, null, 8, ["templates"])) : H("", !0)
    ]));
  }
}), uy = oy, dy = Object.freeze({
  id: "shop",
  name: "奇物商店",
  accent: "#a83b32"
}), cy = ["aria-labelledby"], fy = ["id"], vy = { class: "shop-dialog-item" }, py = { "aria-hidden": "true" }, gy = [
  "onUpdate:modelValue",
  "maxlength",
  "placeholder"
], my = {
  key: 0,
  class: "shop-dialog-error",
  role: "alert"
}, by = { class: "shop-dialog-actions" }, hy = ["disabled"], yy = ["disabled"], ky = /* @__PURE__ */ re({
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
    const a = e, n = t, s = /* @__PURE__ */ Dt({}), l = z(() => a.mode === "purchase" ? "确认购入" : a.mode === "deactivate" ? "关闭效果" : "确认使用"), o = z(() => a.mode === "purchase" ? `将支付 ${a.item.price} 小白币，奇物会先放入背包。` : a.mode === "deactivate" ? "关闭后将从下一次回复起停止影响剧情，已经发生的事实不会消失。" : a.item.duration === "permanent" ? "这件奇物将永久影响后续剧情，使用后无法关闭。" : `使用后从下一次回复起${a.item.durationLabel}。`), r = z(() => a.mode !== "use" || a.item.inputs.every((c) => String(s[c.key] || "").trim().length > 0));
    function u() {
      !a.busy && r.value && n("confirm", { ...s });
    }
    return (c, d) => (p(), b("dialog", {
      open: "",
      class: "shop-dialog",
      "aria-labelledby": `shop-dialog-${e.mode}`,
      onClick: d[1] || (d[1] = ut((y) => !e.busy && c.$emit("cancel"), ["self"])),
      onKeydown: d[2] || (d[2] = vr(ut((y) => !e.busy && c.$emit("cancel"), ["stop", "prevent"]), ["esc"]))
    }, [i("form", {
      method: "dialog",
      class: "shop-dialog-card",
      onSubmit: ut(u, ["prevent"])
    }, [
      d[3] || (d[3] = i("span", { class: "shop-dialog-kicker" }, "SEALED DECISION", -1)),
      i("h2", { id: `shop-dialog-${e.mode}` }, h(l.value), 9, fy),
      i("div", vy, [i("span", py, h(e.item.name.slice(0, 1)), 1), i("div", null, [i("strong", null, h(e.item.name), 1), i("small", null, h(e.item.durationLabel), 1)])]),
      (p(!0), b(te, null, ce(e.mode === "use" ? e.item.inputs : [], (y) => (p(), b("label", {
        key: y.key,
        class: "shop-dialog-field"
      }, [i("span", null, h(y.label), 1), Pe(i("input", {
        "onUpdate:modelValue": (w) => s[y.key] = w,
        type: "text",
        maxlength: y.maxLength,
        placeholder: y.placeholder,
        autocomplete: "off",
        required: ""
      }, null, 8, gy), [[tt, s[y.key]]])]))), 128)),
      i("p", { class: ae(["shop-dialog-warning", { "is-permanent": e.mode === "use" && e.item.duration === "permanent" }]) }, h(o.value), 3),
      e.error ? (p(), b("p", my, h(e.error), 1)) : H("", !0),
      i("div", by, [i("button", {
        type: "button",
        disabled: e.busy,
        onClick: d[0] || (d[0] = (y) => c.$emit("cancel"))
      }, "再想想", 8, hy), i("button", {
        type: "submit",
        class: "is-primary",
        disabled: e.busy || !r.value
      }, h(e.busy ? "正在封存…" : e.mode === "purchase" ? "确认支付" : e.mode === "deactivate" ? "确认关闭" : "确认使用"), 9, yy)])
    ], 32)], 40, cy));
  }
}), wy = ky, xy = {
  class: "shop-inventory",
  "aria-labelledby": "shop-inventory-title"
}, Sy = { class: "shop-section-heading" }, _y = {
  key: 0,
  class: "shop-write-reason",
  role: "status"
}, $y = {
  class: "shop-inventory-group",
  "aria-labelledby": "shop-active-title"
}, Cy = {
  key: 0,
  class: "shop-activation-list"
}, Ay = {
  class: "shop-mini-mark",
  "aria-hidden": "true"
}, My = [
  "disabled",
  "title",
  "onClick"
], Ty = {
  key: 1,
  class: "shop-empty-copy"
}, Ey = {
  class: "shop-inventory-group",
  "aria-labelledby": "shop-held-title"
}, Iy = {
  key: 0,
  class: "shop-held-grid"
}, Py = {
  class: "shop-mini-mark",
  "aria-hidden": "true"
}, Oy = [
  "disabled",
  "title",
  "onClick"
], Ly = {
  key: 1,
  class: "shop-empty-copy"
}, Ry = {
  key: 1,
  class: "shop-inventory-group is-exhausted"
}, Dy = ["aria-expanded"], By = {
  key: 0,
  class: "shop-exhausted-list"
}, Ny = { key: 0 }, qy = /* @__PURE__ */ re({
  __name: "ShopInventory",
  props: {
    catalog: {},
    activations: {},
    writeDisabledReason: {}
  },
  emits: ["use", "deactivate"],
  setup(e) {
    const t = e, a = /* @__PURE__ */ W(!1), n = z(() => t.activations.filter((r) => r.state === "active")), s = z(() => t.catalog.filter((r) => r.quantity > 0)), l = z(() => t.catalog.filter((r) => r.purchasedCount > 0 && r.quantity === 0)), o = z(() => {
      const r = /* @__PURE__ */ new Map();
      for (const u of t.activations) u.state !== "active" && r.set(u.itemId, (r.get(u.itemId) || 0) + 1);
      return r;
    });
    return (r, u) => (p(), b("section", xy, [
      i("header", Sy, [u[1] || (u[1] = i("div", null, [i("span", null, "PRIVATE COLLECTION"), i("h2", { id: "shop-inventory-title" }, "我的奇物")], -1)), i("small", null, h(s.value.reduce((c, d) => c + d.quantity, 0)) + " 件可用", 1)]),
      e.writeDisabledReason ? (p(), b("p", _y, h(e.writeDisabledReason), 1)) : H("", !0),
      i("section", $y, [i("header", null, [u[2] || (u[2] = i("h3", { id: "shop-active-title" }, "生效中", -1)), i("span", null, h(n.value.length), 1)]), n.value.length ? (p(), b("div", Cy, [(p(!0), b(te, null, ce(n.value, (c) => (p(), b("article", {
        key: c.activationId,
        class: "shop-activation-card"
      }, [
        i("div", Ay, h(c.name.slice(0, 1)), 1),
        i("div", null, [
          i("h4", null, h(c.name), 1),
          (p(!0), b(te, null, ce(c.parameters, (d) => (p(), b("p", { key: d.label }, [i("span", null, h(d.label), 1), ve(h(d.value), 1)]))), 128)),
          i("small", null, h(c.stateLabel), 1)
        ]),
        c.canDeactivate ? (p(), b("button", {
          key: 0,
          type: "button",
          disabled: !!e.writeDisabledReason,
          title: e.writeDisabledReason,
          onClick: (d) => r.$emit("deactivate", c)
        }, " 关闭 ", 8, My)) : H("", !0)
      ]))), 128))])) : (p(), b("p", Ty, "尚无正在影响剧情的奇物。"))]),
      i("section", Ey, [i("header", null, [u[3] || (u[3] = i("h3", { id: "shop-held-title" }, "持有", -1)), i("span", null, h(s.value.length), 1)]), s.value.length ? (p(), b("div", Iy, [(p(!0), b(te, null, ce(s.value, (c) => (p(), b("article", {
        key: c.id,
        class: "shop-held-card"
      }, [
        i("div", Py, h(c.name.slice(0, 1)), 1),
        i("div", null, [i("h4", null, h(c.name), 1), i("p", null, h(c.durationLabel), 1)]),
        i("strong", null, "×" + h(c.quantity), 1),
        i("button", {
          type: "button",
          disabled: !!e.writeDisabledReason,
          title: e.writeDisabledReason,
          onClick: (d) => r.$emit("use", c)
        }, " 使用 ", 8, Oy)
      ]))), 128))])) : (p(), b("p", Ly, "背包还是空的，去货架挑一件吧。"))]),
      l.value.length ? (p(), b("section", Ry, [i("button", {
        type: "button",
        class: "shop-collapse-button",
        "aria-expanded": a.value,
        onClick: u[0] || (u[0] = (c) => a.value = !a.value)
      }, [
        u[4] || (u[4] = i("span", null, "已耗尽", -1)),
        i("small", null, h(l.value.length), 1),
        u[5] || (u[5] = i("i", { "aria-hidden": "true" }, "⌄", -1))
      ], 8, Dy), a.value ? (p(), b("div", By, [(p(!0), b(te, null, ce(l.value, (c) => (p(), b("article", { key: c.id }, [i("span", null, h(c.name), 1), i("small", null, [ve("购入 " + h(c.purchasedCount) + " 次", 1), o.value.get(c.id) ? (p(), b("span", Ny, " · 已结束 " + h(o.value.get(c.id)), 1)) : H("", !0)])]))), 128))])) : H("", !0)])) : H("", !0)
    ]));
  }
}), Uy = qy, Fy = {
  class: "shop-shelf",
  "aria-labelledby": "shop-shelf-title"
}, jy = { class: "shop-section-heading" }, Hy = {
  class: "shop-category-strip",
  "aria-label": "商品分类"
}, Ky = ["onClick"], Gy = { class: "shop-product-grid" }, zy = {
  class: "shop-product-mark",
  "aria-hidden": "true"
}, Vy = { class: "shop-product-copy" }, Wy = { class: "shop-product-title" }, Yy = { class: "shop-product-footer" }, Xy = { key: 0 }, Jy = [
  "disabled",
  "title",
  "onClick"
], Qy = {
  key: 0,
  class: "shop-card-reason"
}, Zy = /* @__PURE__ */ re({
  __name: "ShopShelf",
  props: {
    catalog: {},
    balance: {},
    writeDisabledReason: {}
  },
  emits: ["purchase"],
  setup(e) {
    const t = e, a = /* @__PURE__ */ W("all"), n = z(() => {
      const r = /* @__PURE__ */ new Map();
      for (const u of t.catalog) r.set(u.category, u.categoryLabel);
      return [{
        id: "all",
        label: "全部"
      }, ...Array.from(r, ([u, c]) => ({
        id: u,
        label: c
      }))];
    }), s = z(() => a.value === "all" ? t.catalog : t.catalog.filter((r) => r.category === a.value));
    function l(r) {
      return t.writeDisabledReason ? t.writeDisabledReason : o(r);
    }
    function o(r) {
      return r.purchaseLimit !== null && r.purchasedCount >= r.purchaseLimit ? "此奇物已达购买上限" : t.balance < r.price ? `还差 ${r.price - t.balance} 小白币` : "";
    }
    return (r, u) => (p(), b("section", Fy, [
      i("header", jy, [u[0] || (u[0] = i("div", null, [i("span", null, "CURIO CABINET"), i("h2", { id: "shop-shelf-title" }, "今日陈列")], -1)), i("small", null, h(s.value.length) + " 件奇物", 1)]),
      i("nav", Hy, [(p(!0), b(te, null, ce(n.value, (c) => (p(), b("button", {
        key: c.id,
        type: "button",
        class: ae({ "is-active": a.value === c.id }),
        onClick: (d) => a.value = c.id
      }, h(c.label), 11, Ky))), 128))]),
      i("div", Gy, [(p(!0), b(te, null, ce(s.value, (c) => (p(), b("article", {
        key: c.id,
        class: "shop-product-card"
      }, [i("div", zy, h(c.name.slice(0, 1)), 1), i("div", Vy, [
        i("div", Wy, [i("h3", null, h(c.name), 1), i("span", null, h(c.categoryLabel), 1)]),
        i("p", null, h(c.description), 1),
        i("small", null, h(c.durationLabel), 1),
        i("div", Yy, [
          i("strong", null, [u[1] || (u[1] = i("i", null, "¤", -1)), ve(h(c.price), 1)]),
          c.quantity ? (p(), b("span", Xy, "持有 " + h(c.quantity), 1)) : H("", !0),
          i("button", {
            type: "button",
            disabled: !!l(c),
            title: l(c),
            onClick: (d) => r.$emit("purchase", c)
          }, h(c.purchaseLimit !== null && c.purchasedCount >= c.purchaseLimit ? "已购得" : "购入"), 9, Jy)
        ]),
        o(c) ? (p(), b("p", Qy, h(o(c)), 1)) : H("", !0)
      ])]))), 128))])
    ]));
  }
}), e1 = Zy, t1 = { class: "shop-app" }, a1 = { class: "shop-header" }, n1 = {
  class: "shop-balance",
  "aria-label": "小白币余额"
}, s1 = ["disabled"], i1 = {
  class: "shop-root-tabs",
  "aria-label": "商店页面"
}, l1 = { key: 0 }, r1 = ["disabled"], o1 = ["disabled"], u1 = { class: "shop-scroll" }, os = 35e3, d1 = /* @__PURE__ */ re({
  __name: "ShopApp",
  props: {
    bridge: {},
    initialState: {}
  },
  setup(e) {
    const t = e, a = /* @__PURE__ */ W(structuredClone(/* @__PURE__ */ ie(t.initialState))), n = /* @__PURE__ */ W("shelf"), s = /* @__PURE__ */ W(null), l = /* @__PURE__ */ W(!1), o = /* @__PURE__ */ W(!1), r = /* @__PURE__ */ W(""), u = /* @__PURE__ */ W("");
    let c = () => {
    }, d = 0;
    const y = z(() => a.value.status === "unconfirmed"), w = z(() => o.value ? "正在处理上一项操作" : l.value ? "正在刷新商店状态" : a.value.status !== "ready" ? a.value.message || "商店暂时不可写入" : a.value.generationActive ? "主剧情正在生成，请等待回复完成" : ""), m = z(() => l.value || o.value || y.value);
    function A() {
      return typeof globalThis.crypto?.randomUUID == "function" ? `shop-ui:${globalThis.crypto.randomUUID()}` : `shop-ui:${Date.now()}:${Math.random().toString(36).slice(2, 10)}`;
    }
    function P() {
      return { chatIdentity: a.value.chatIdentity };
    }
    function R(S) {
      a.value = structuredClone(S), l.value = !1, r.value = "";
    }
    function q(S) {
      const $ = S instanceof Error ? S.message : String(S);
      return $.includes("cannot be overdrawn") ? "小白币余额不足，未完成购买。" : $.includes("shop_main_generation_active") ? "主剧情正在生成，请等待回复完成。" : $.includes("shop_revision_conflict") || $.includes("shop_event_id_conflict") ? "商店状态已变化，请关闭确认框后重试。" : $ === "host_request_timeout" ? "等待保存结果超时，请使用同一确认框重试。" : "商店操作未完成，请稍后重试。";
    }
    async function U() {
      if (m.value) return;
      const S = ++d;
      l.value = !0, r.value = "";
      try {
        const $ = await t.bridge.request("shop/refresh", P(), os);
        S === d && R($.result);
      } catch ($) {
        S === d && (r.value = q($));
      } finally {
        S === d && (l.value = !1);
      }
    }
    async function L() {
      if (l.value || o.value) return;
      const S = ++d;
      l.value = !0, r.value = "";
      try {
        const $ = await t.bridge.request("shop/confirm-save", P(), os);
        S === d && R($.result.state);
      } catch ($) {
        S === d && (r.value = q($));
      } finally {
        S === d && (l.value = !1);
      }
    }
    function M(S, $, C) {
      w.value || (u.value = "", s.value = {
        mode: S,
        item: $,
        activation: C,
        actionId: A()
      });
    }
    function _() {
      o.value || (s.value = null, u.value = "");
    }
    async function T(S) {
      const $ = s.value;
      if (!$ || o.value) return;
      o.value = !0, u.value = "";
      const C = d, G = $.mode === "purchase" ? "shop/purchase" : $.mode === "use" ? "shop/activate" : "shop/deactivate";
      try {
        const Z = await t.bridge.request(G, {
          ...P(),
          expectedRevision: a.value.revision,
          expectedEventId: a.value.eventId,
          actionId: $.actionId,
          itemId: $.item.id,
          ...$.mode === "use" ? { parameters: S } : {},
          ...$.activation ? { activationId: $.activation.activationId } : {}
        }, os);
        if (C !== d || s.value !== $) return;
        R(Z.result), s.value = null;
      } catch (Z) {
        C === d && s.value === $ && (u.value = q(Z));
      } finally {
        C === d && (o.value = !1);
      }
    }
    return nt(() => {
      c = t.bridge.subscribe((S) => {
        S.type === "shop/state" && (o.value || (d += 1), R(S.payload.state)), S.type === "shop/error" && (r.value = q(S.payload?.message || ""));
      });
    }), ct(() => {
      d += 1, c(), s.value = null;
    }), (S, $) => (p(), b("main", t1, [
      i("header", a1, [
        $[7] || ($[7] = i("div", null, [i("span", { class: "shop-header-kicker" }, "VERMILION CABINET"), i("h1", null, "奇物商店")], -1)),
        i("div", n1, [$[5] || ($[5] = i("small", null, "余额", -1)), i("strong", null, "¤ " + h(a.value.balance), 1)]),
        i("button", {
          type: "button",
          class: "shop-refresh",
          disabled: m.value,
          title: "重新读取商店",
          onClick: U
        }, [...$[6] || ($[6] = [i("svg", {
          viewBox: "0 0 24 24",
          "aria-hidden": "true"
        }, [i("path", { d: "M20 7v5h-5M4 17v-5h5M18.2 9A7 7 0 0 0 6.1 6.7L4 9m16 6-2.1 2.3A7 7 0 0 1 5.8 15" })], -1), i("span", { class: "shop-sr-only" }, "重新读取商店", -1)])], 8, s1)
      ]),
      i("nav", i1, [i("button", {
        type: "button",
        class: ae({ "is-active": n.value === "shelf" }),
        onClick: $[0] || ($[0] = (C) => n.value = "shelf")
      }, "货架", 2), i("button", {
        type: "button",
        class: ae({ "is-active": n.value === "inventory" }),
        onClick: $[1] || ($[1] = (C) => n.value = "inventory")
      }, [$[8] || ($[8] = ve(" 背包", -1)), a.value.catalog.some((C) => C.quantity) ? (p(), b("span", l1, h(a.value.catalog.reduce((C, G) => C + G.quantity, 0)), 1)) : H("", !0)], 2)]),
      a.value.message || r.value ? (p(), b("aside", {
        key: 0,
        class: ae(["shop-notice", `is-${a.value.status}`]),
        role: "status"
      }, [$[9] || ($[9] = i("span", { "aria-hidden": "true" }, "印", -1)), i("div", null, [
        i("strong", null, h(a.value.status === "unconfirmed" ? "保存待核实" : a.value.status === "conflict" ? "状态冲突" : "商店状态"), 1),
        i("p", null, h(r.value || a.value.message), 1),
        y.value ? (p(), b("button", {
          key: 0,
          type: "button",
          disabled: l.value,
          onClick: L
        }, h(l.value ? "正在核实…" : "核实保存结果"), 9, r1)) : a.value.status === "blocked" ? (p(), b("button", {
          key: 1,
          type: "button",
          disabled: l.value,
          onClick: U
        }, h(l.value ? "正在读取…" : "重新读取"), 9, o1)) : H("", !0)
      ])], 2)) : H("", !0),
      i("div", u1, [n.value === "shelf" ? (p(), be(e1, {
        key: 0,
        catalog: a.value.catalog,
        balance: a.value.balance,
        "write-disabled-reason": w.value,
        onPurchase: $[2] || ($[2] = (C) => M("purchase", C))
      }, null, 8, [
        "catalog",
        "balance",
        "write-disabled-reason"
      ])) : (p(), be(Uy, {
        key: 1,
        catalog: a.value.catalog,
        activations: a.value.activations,
        "write-disabled-reason": w.value,
        onUse: $[3] || ($[3] = (C) => M("use", C)),
        onDeactivate: $[4] || ($[4] = (C) => {
          const G = a.value.catalog.find((Z) => Z.id === C.itemId);
          G && M("deactivate", G, C);
        })
      }, null, 8, [
        "catalog",
        "activations",
        "write-disabled-reason"
      ]))]),
      s.value ? (p(), be(wy, {
        key: 1,
        mode: s.value.mode,
        item: s.value.item,
        activation: s.value.activation,
        busy: o.value,
        error: u.value,
        onCancel: _,
        onConfirm: T
      }, null, 8, [
        "mode",
        "item",
        "activation",
        "busy",
        "error"
      ])) : H("", !0)
    ]));
  }
}), c1 = d1, f1 = Object.freeze({
  id: "wallet",
  name: "钱包",
  accent: "#a9660f"
}), v1 = { class: "wallet-ui-header" }, p1 = { class: "wallet-ui-header-copy" }, g1 = {
  key: 0,
  class: "wallet-ui-kicker"
}, m1 = { class: "wallet-ui-title" }, b1 = /* @__PURE__ */ re({
  __name: "WalletAppHeader",
  props: {
    kicker: {},
    title: {}
  },
  setup(e) {
    return (t, a) => (p(), b("header", v1, [i("div", p1, [e.kicker ? (p(), b("span", g1, h(e.kicker), 1)) : H("", !0), i("h1", m1, h(e.title), 1)])]));
  }
}), h1 = b1, y1 = {
  class: "wallet-balance wallet-ui-rise",
  "aria-labelledby": "wallet-balance-title"
}, k1 = { class: "wallet-balance-chip" }, w1 = ["aria-label"], x1 = /* @__PURE__ */ re({
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
    return (s, l) => (p(), b("section", y1, [
      i("header", null, [l[0] || (l[0] = i("p", { id: "wallet-balance-title" }, "当前结余", -1)), i("span", k1, [i("i", {
        class: ae(`is-${e.status}`),
        "aria-hidden": "true"
      }, null, 2), ve(h(n.value), 1)])]),
      i("div", {
        class: "wallet-balance-value",
        "aria-label": `${a.value} ${e.currency}`
      }, [l[1] || (l[1] = i("span", { "aria-hidden": "true" }, "¤", -1)), ve(h(a.value), 1)], 8, w1),
      i("footer", null, h(e.currency), 1)
    ]));
  }
}), S1 = x1, _1 = {
  class: "wallet-ui-notice-icon",
  "aria-hidden": "true"
}, $1 = { class: "wallet-ui-notice-copy" }, C1 = { key: 0 }, A1 = /* @__PURE__ */ re({
  __name: "WalletNotice",
  props: {
    title: {},
    message: { default: "" },
    tone: { default: "info" }
  },
  setup(e) {
    return (t, a) => (p(), b("aside", {
      class: ae(["wallet-ui-notice", `is-${e.tone}`]),
      role: "status"
    }, [i("span", _1, [$n(t.$slots, "icon", {}, () => [a[0] || (a[0] = ve("!", -1))])]), i("div", $1, [
      i("strong", null, h(e.title), 1),
      e.message ? (p(), b("p", C1, h(e.message), 1)) : H("", !0),
      $n(t.$slots, "default")
    ])], 2));
  }
}), M1 = A1, T1 = { class: "wallet-ui-empty" }, E1 = {
  key: 0,
  class: "wallet-ui-empty-icon",
  "aria-hidden": "true"
}, I1 = { key: 1 }, P1 = /* @__PURE__ */ re({
  __name: "WalletEmpty",
  props: {
    title: {},
    message: { default: "" }
  },
  setup(e) {
    return (t, a) => (p(), b("div", T1, [
      t.$slots.icon ? (p(), b("span", E1, [$n(t.$slots, "icon")])) : H("", !0),
      i("strong", null, h(e.title), 1),
      e.message ? (p(), b("p", I1, h(e.message), 1)) : H("", !0)
    ]));
  }
}), O1 = P1, L1 = {
  class: "wallet-row-mark",
  "aria-hidden": "true"
}, R1 = { viewBox: "0 0 24 24" }, D1 = ["d"], B1 = { class: "wallet-row-copy" }, N1 = { key: 0 }, q1 = { class: "wallet-row-amount" }, U1 = /* @__PURE__ */ re({
  __name: "WalletTransactionRow",
  props: { transaction: {} },
  setup(e) {
    const t = {
      income: "M12 5v14m0 0-5.5-5.5M12 19l5.5-5.5",
      expense: "M12 19V5m0 0L6.5 10.5M12 5l5.5 5.5",
      transfer: "M4 9h16m0 0-4-4m4 4-4 4M20 15H4m0 0 4 4m-4-4 4-4"
    }, a = e, n = z(() => t[a.transaction.direction] || t.transfer), s = z(() => {
      const o = a.transaction.amount.toLocaleString("zh-CN");
      return a.transaction.direction === "income" ? `+${o}` : a.transaction.direction === "expense" ? `−${o}` : o;
    }), l = z(() => {
      const o = new Date(a.transaction.createdAt), r = new Intl.DateTimeFormat("zh-CN", {
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
        hour12: !1
      }).format(o);
      return a.transaction.sequence === 1 && a.transaction.sourceDomain === "economy" ? `开户 · ${r}` : r;
    });
    return (o, r) => (p(), b("li", { class: ae(["wallet-row", `is-${e.transaction.direction}`]) }, [
      i("span", L1, [(p(), b("svg", R1, [i("path", { d: n.value }, null, 8, D1)]))]),
      i("div", B1, [
        i("strong", null, h(e.transaction.title), 1),
        e.transaction.note ? (p(), b("p", N1, h(e.transaction.note), 1)) : H("", !0),
        i("small", null, h(e.transaction.source) + " · " + h(l.value), 1)
      ]),
      i("span", q1, h(s.value), 1)
    ], 2));
  }
}), F1 = U1, j1 = {
  key: 1,
  class: "wallet-ui-list"
}, H1 = {
  key: 2,
  class: "wallet-ledger-foot"
}, K1 = {
  key: 0,
  class: "wallet-load-error",
  role: "alert"
}, G1 = ["disabled"], z1 = {
  key: 2,
  class: "wallet-ledger-end"
}, V1 = /* @__PURE__ */ re({
  __name: "WalletTransactionList",
  props: {
    transactions: {},
    hasMore: { type: Boolean },
    loadingMore: { type: Boolean },
    error: {}
  },
  emits: ["loadMore"],
  setup(e) {
    return (t, a) => (p(), b("div", null, [e.transactions.length === 1 && e.transactions[0]?.sequence === 1 && e.transactions[0]?.sourceDomain === "economy" ? (p(), be(O1, {
      key: 0,
      title: "新账簿已经启用",
      message: "除了开户赠礼，还没有其他收支。"
    }, {
      icon: ia(() => [...a[1] || (a[1] = [i("svg", { viewBox: "0 0 24 24" }, [i("path", { d: "m5 12.5 4.5 4.5L19 7.5" })], -1)])]),
      _: 1
    })) : (p(), b("ol", j1, [(p(!0), b(te, null, ce(e.transactions, (n) => (p(), be(F1, {
      key: n.id,
      transaction: n
    }, null, 8, ["transaction"]))), 128))])), e.hasMore || e.transactions.length > 1 ? (p(), b("div", H1, [e.error ? (p(), b("p", K1, h(e.error), 1)) : H("", !0), e.hasMore ? (p(), b("button", {
      key: 1,
      type: "button",
      class: "wallet-ui-text-button",
      disabled: e.loadingMore,
      onClick: a[0] || (a[0] = (n) => t.$emit("loadMore"))
    }, h(e.loadingMore ? "正在翻阅…" : "翻阅更早账目"), 9, G1)) : (p(), b("span", z1, "账簿至此"))])) : H("", !0)]));
  }
}), W1 = V1, Y1 = { class: "wallet-ui-app wallet-app" }, X1 = { class: "wallet-ui-scroll" }, J1 = ["disabled"], Q1 = ["disabled"], Z1 = {
  class: "wallet-ledger",
  "aria-labelledby": "wallet-ledger-title"
}, e0 = { class: "wallet-ui-section-title" }, t0 = { class: "wallet-ui-card" }, Qi = 35e3, a0 = /* @__PURE__ */ re({
  __name: "WalletApp",
  props: {
    bridge: {},
    initialState: {}
  },
  setup(e) {
    const t = e, a = /* @__PURE__ */ W(structuredClone(/* @__PURE__ */ ie(t.initialState))), n = /* @__PURE__ */ W(!1), s = /* @__PURE__ */ W(!1), l = /* @__PURE__ */ W(""), o = /* @__PURE__ */ W("");
    let r = () => {
    }, u = 0;
    const c = z(() => a.value.status === "unconfirmed"), d = z(() => n.value || a.value.status === "loading" || a.value.status === "saving"), y = z(() => d.value || c.value || a.value.status === "conflict"), w = z(() => !!(a.value.message || l.value)), m = z(() => l.value || a.value.status === "conflict" || a.value.status === "blocked" ? "danger" : c.value ? "warning" : "info"), A = z(() => a.value.status === "conflict" ? "账本发生冲突" : a.value.status === "blocked" ? "钱包暂时无法读取" : "账本状态");
    function P(_) {
      const T = _ instanceof Error ? _.message : String(_);
      return T.includes("聊天已切换") ? "聊天已切换，请重新打开钱包。" : T === "host_request_timeout" ? "读取等待超时，请稍后重新读取。" : "钱包数据暂时无法读取，请稍后重试。";
    }
    function R() {
      return { chatIdentity: a.value.chatIdentity };
    }
    function q(_) {
      a.value = structuredClone(_), n.value = !1, s.value = !1, l.value = "", o.value = "";
    }
    async function U() {
      if (d.value || c.value || a.value.status === "conflict") return;
      const _ = ++u;
      n.value = !0, l.value = "";
      try {
        const T = await t.bridge.request("wallet/refresh", R(), Qi);
        _ === u && q(T.result);
      } catch (T) {
        _ === u && (l.value = P(T));
      } finally {
        _ === u && (n.value = !1);
      }
    }
    async function L() {
      if (d.value) return;
      const _ = ++u;
      n.value = !0, l.value = "";
      try {
        const T = await t.bridge.request("wallet/confirm-save", R(), Qi);
        _ === u && q(T.result.state);
      } catch (T) {
        _ === u && (l.value = P(T));
      } finally {
        _ === u && (n.value = !1);
      }
    }
    async function M() {
      const _ = a.value.nextCursor;
      if (!_ || s.value) return;
      const T = u;
      s.value = !0, o.value = "";
      try {
        const S = await t.bridge.request("wallet/load-more", {
          ...R(),
          beforeSequence: _
        });
        if (T !== u) return;
        const $ = new Set(a.value.transactions.map((C) => C.id));
        a.value.transactions.push(...S.result.transactions.filter((C) => !$.has(C.id))), a.value.nextCursor = S.result.nextCursor, a.value.hasMore = S.result.hasMore;
      } catch {
        T === u && (o.value = "更多流水暂时无法读取，请稍后重试。");
      } finally {
        T === u && (s.value = !1);
      }
    }
    return nt(() => {
      r = t.bridge.subscribe((_) => {
        _.type === "wallet/state" && (u += 1, q(_.payload.state)), _.type === "wallet/error" && (l.value = P(_.payload?.message || ""));
      });
    }), ct(() => {
      u += 1, r();
    }), (_, T) => (p(), b("main", Y1, [Ce(h1, {
      kicker: "Wallet",
      title: "钱包"
    }), i("div", X1, [
      Ce(S1, {
        balance: a.value.balance,
        currency: a.value.currency,
        status: a.value.status
      }, null, 8, [
        "balance",
        "currency",
        "status"
      ]),
      w.value ? (p(), be(M1, {
        key: 0,
        class: "wallet-notice",
        tone: m.value,
        title: A.value,
        message: l.value || a.value.message
      }, {
        default: ia(() => [c.value ? (p(), b("button", {
          key: 0,
          type: "button",
          class: "wallet-ui-text-button",
          disabled: n.value,
          onClick: L
        }, h(n.value ? "正在核实…" : "核实保存结果"), 9, J1)) : a.value.status === "blocked" || l.value ? (p(), b("button", {
          key: 1,
          type: "button",
          class: "wallet-ui-text-button",
          disabled: y.value,
          onClick: U
        }, h(n.value ? "正在读取…" : "重新读取"), 9, Q1)) : H("", !0)]),
        _: 1
      }, 8, [
        "tone",
        "title",
        "message"
      ])) : H("", !0),
      i("section", Z1, [i("div", e0, [T[0] || (T[0] = i("h2", { id: "wallet-ledger-title" }, "流水明细", -1)), i("small", null, h(a.value.transactionCount) + " 笔", 1)]), i("div", t0, [Ce(W1, {
        transactions: a.value.transactions,
        "has-more": a.value.hasMore,
        "loading-more": s.value,
        error: o.value,
        onLoadMore: M
      }, null, 8, [
        "transactions",
        "has-more",
        "loading-more",
        "error"
      ])])])
    ])]));
  }
}), n0 = a0, s0 = Object.freeze([
  {
    ...cd,
    iconPaths: ["M14 11h36a4 4 0 0 1 4 4v34a4 4 0 0 1-4 4H14a4 4 0 0 1-4-4V15a4 4 0 0 1 4-4z", "M19 24h26M19 34h18M19 44h11M45 44h.1"],
    component: Nc
  },
  {
    ...Wb,
    iconPaths: ["M13 15h38v29H32l-12 9 3-9H13z", "M22 25h20M22 33h14"],
    component: uy
  },
  {
    ...f1,
    iconPaths: ["M12 19.5h37a5 5 0 0 1 5 5v24a5 5 0 0 1-5 5H15a5 5 0 0 1-5-5v-30a8 8 0 0 1 8-8h27", "M54 30H42a6 6 0 0 0 0 12h12M43 36h.1"],
    component: n0
  },
  {
    ...dy,
    iconPaths: ["M14 19h36l-3 35H17z", "M11 19h42M19 19V11h26v8M23 29h18M22 38h20M21 47h22"],
    component: c1
  },
  {
    ...qc,
    iconPaths: ["M9 24h46L32 9z", "M14 52h36M18 24v28M28 24v28M38 24v28M48 24v28"],
    component: cv
  },
  {
    ...fv,
    iconPaths: ["M15 12h34a6 6 0 0 1 6 6v28a6 6 0 0 1-6 6H15a6 6 0 0 1-6-6V18a6 6 0 0 1 6-6z", "M21 23h.1M43 23h.1M32 32h.1M21 41h.1M43 41h.1"],
    component: xg
  },
  {
    ...Sg,
    iconPaths: ["M11 16l13-6 16 6 13-6v38l-13 6-16-6-13 6z", "M24 10v38M40 16v38M18 31l6-3 8 3 8-4 7 3"],
    component: Vb
  }
]), i0 = { class: "xiaobai-os-home" }, l0 = ["src"], r0 = {
  class: "xiaobai-os-app-grid",
  "aria-label": "应用"
}, o0 = ["onClick"], u0 = {
  class: "xiaobai-os-app-icon",
  "aria-hidden": "true"
}, d0 = { viewBox: "0 0 64 64" }, c0 = ["d"], f0 = { class: "xiaobai-os-app-name" }, v0 = /* @__PURE__ */ re({
  __name: "XiaobaiOsHome",
  props: {
    apps: {},
    characterAvatar: {}
  },
  emits: ["openApp"],
  setup(e) {
    return (t, a) => (p(), b("main", i0, [
      e.characterAvatar ? (p(), b("img", {
        key: 0,
        class: "xiaobai-os-wallpaper",
        src: e.characterAvatar,
        alt: ""
      }, null, 8, l0)) : H("", !0),
      a[0] || (a[0] = i("div", {
        class: "xiaobai-os-home-wash",
        "aria-hidden": "true"
      }, null, -1)),
      i("section", r0, [(p(!0), b(te, null, ce(e.apps, (n) => (p(), b("button", {
        key: n.id,
        type: "button",
        class: "xiaobai-os-app-tile",
        style: _t({ "--app-accent": n.accent }),
        onClick: (s) => t.$emit("openApp", n)
      }, [i("span", u0, [(p(), b("svg", d0, [(p(!0), b(te, null, ce(n.iconPaths, (s) => (p(), b("path", {
        key: s,
        d: s
      }, null, 8, c0))), 128))]))]), i("span", f0, h(n.name), 1)], 12, o0))), 128))])
    ]));
  }
}), p0 = v0, g0 = ["disabled"], m0 = {
  key: 0,
  "aria-hidden": "true"
}, b0 = /* @__PURE__ */ re({
  __name: "XiaobaiOsNavigation",
  props: { isHome: { type: Boolean } },
  emits: [
    "back",
    "home",
    "close"
  ],
  setup(e) {
    return (t, a) => (p(), b("nav", {
      class: ae(["xiaobai-os-navigation", { "is-home": e.isHome }]),
      "aria-label": "系统导航"
    }, [
      i("button", {
        type: "button",
        class: "xiaobai-os-nav-button",
        disabled: e.isHome,
        "aria-label": "返回",
        onClick: a[0] || (a[0] = (n) => t.$emit("back"))
      }, [...a[3] || (a[3] = [i("svg", {
        viewBox: "0 0 24 24",
        "aria-hidden": "true"
      }, [i("path", { d: "m14.5 6-6 6 6 6" })], -1)])], 8, g0),
      i("button", {
        type: "button",
        class: "xiaobai-os-nav-button xiaobai-os-home-button",
        "aria-label": "主页",
        onClick: a[1] || (a[1] = (n) => t.$emit("home"))
      }, [a[4] || (a[4] = i("svg", {
        viewBox: "0 0 24 24",
        "aria-hidden": "true"
      }, [i("path", { d: "m4.5 11 7.5-6 7.5 6v8h-5v-5h-5v5h-5z" })], -1)), e.isHome ? (p(), b("i", m0)) : H("", !0)]),
      i("button", {
        type: "button",
        class: "xiaobai-os-nav-button xiaobai-os-close-button",
        "aria-label": "关闭",
        onClick: a[2] || (a[2] = (n) => t.$emit("close"))
      }, [...a[5] || (a[5] = [i("span", null, [i("svg", {
        viewBox: "0 0 24 24",
        "aria-hidden": "true"
      }, [i("path", { d: "m7 9.5 5 5 5-5" })])], -1)])])
    ], 2));
  }
}), h0 = b0, y0 = /* @__PURE__ */ re({
  __name: "XiaobaiOsSystemBar",
  props: { isHome: { type: Boolean } },
  setup(e) {
    return (t, a) => (p(), b("header", {
      class: ae(["xiaobai-os-system-bar", { "is-home": e.isHome }]),
      "aria-label": "系统状态"
    }, [...a[0] || (a[0] = [i("span", { class: "xiaobai-os-system-mark" }, "小白", -1), i("span", {
      class: "xiaobai-os-system-status",
      "aria-hidden": "true"
    }, [i("span", { class: "xiaobai-os-signal" }, [
      i("i"),
      i("i"),
      i("i"),
      i("i")
    ]), i("span", { class: "xiaobai-os-battery" }, [i("i")])], -1)])], 2));
  }
}), k0 = y0, w0 = { class: "xiaobai-os-device" }, x0 = { class: "xiaobai-os-glass" }, S0 = /* @__PURE__ */ re({
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
    return (n, s) => (p(), b("div", w0, [s[4] || (s[4] = i("span", {
      class: "xiaobai-os-side-key",
      "aria-hidden": "true"
    }, null, -1)), i("div", x0, [
      Ce(k0, { "is-home": a.value }, null, 8, ["is-home"]),
      i("div", {
        class: "xiaobai-os-stage",
        style: _t(e.activeApp ? { "--app-accent": e.activeApp.accent } : null)
      }, [Ce(dr, {
        name: "xiaobai-os-route",
        mode: "out-in"
      }, {
        default: ia(() => [a.value ? (p(), be(p0, {
          key: "home",
          apps: e.apps,
          "character-avatar": e.characterAvatar,
          onOpenApp: s[0] || (s[0] = (l) => n.$emit("openApp", l))
        }, null, 8, ["apps", "character-avatar"])) : e.activeApp ? (p(), be(Uo(e.activeApp.component), {
          key: "app",
          bridge: e.bridge,
          "initial-state": e.activeState
        }, null, 8, ["bridge", "initial-state"])) : H("", !0)]),
        _: 1
      })], 4),
      Ce(h0, {
        "is-home": a.value,
        onBack: s[1] || (s[1] = (l) => n.$emit("back")),
        onHome: s[2] || (s[2] = (l) => n.$emit("home")),
        onClose: s[3] || (s[3] = (l) => n.$emit("close"))
      }, null, 8, ["is-home"])
    ])]));
  }
}), _0 = S0, $0 = "LittleWhiteBox-XiaobaiOS";
function C0() {
  return `xiaobai-os-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
}
function A0() {
  const e = /* @__PURE__ */ new Map(), t = /* @__PURE__ */ new Set();
  let a = !1;
  function n(d, y = {}, w = "") {
    parent.postMessage({
      source: $0,
      type: d,
      requestId: w,
      payload: y
    }, window.location.origin);
  }
  function s(d) {
    const y = String(d.requestId || "");
    if (!y) return !1;
    const w = e.get(y);
    if (!w) return !1;
    e.delete(y), clearTimeout(w.timer);
    const m = d.payload;
    return m?.ok === !1 ? w.reject(new Error(m.error || "host_request_failed")) : w.resolve(m), !0;
  }
  function l(d) {
    d.origin !== window.location.origin || d.source !== parent || d.data?.source !== "LittleWhiteBox-XiaobaiOS" || typeof d.data.type != "string" || s(d.data) || t.forEach((y) => y(d.data));
  }
  function o() {
    a || (a = !0, window.addEventListener("message", l), n("os/frame-ready"));
  }
  function r(d, y = {}, w = 15e3) {
    const m = C0();
    return new Promise((A, P) => {
      const R = setTimeout(() => {
        e.delete(m), P(/* @__PURE__ */ new Error("host_request_timeout"));
      }, w);
      e.set(m, {
        resolve: A,
        reject: P,
        timer: R
      }), n(d, y, m);
    });
  }
  function u(d) {
    return t.add(d), () => t.delete(d);
  }
  function c() {
    a && window.removeEventListener("message", l), a = !1, t.clear(), e.forEach((d) => {
      clearTimeout(d.timer), d.reject(/* @__PURE__ */ new Error("frame_bridge_disposed"));
    }), e.clear();
  }
  return Object.freeze({
    start: o,
    post: n,
    request: r,
    subscribe: u,
    dispose: c
  });
}
var M0 = {
  key: 0,
  class: "xiaobai-os-error",
  role: "alert"
}, T0 = {
  key: 1,
  class: "xiaobai-os-loading",
  role: "status"
}, E0 = /* @__PURE__ */ re({
  __name: "App",
  setup(e) {
    const t = A0(), a = /* @__PURE__ */ W(null), n = /* @__PURE__ */ W(!1), s = /* @__PURE__ */ W("light"), l = /* @__PURE__ */ W(/* @__PURE__ */ new Set()), o = /* @__PURE__ */ W(""), r = /* @__PURE__ */ W(null), u = /* @__PURE__ */ W(null), c = /* @__PURE__ */ W("");
    let d = null, y = () => {
    }, w = 0, m = null;
    const A = z(() => s0.filter((T) => l.value.has(T.id)));
    function P(T) {
      const S = new Set(T.map((G) => String(G.id))), $ = r.value && !S.has(r.value.id), C = m && !S.has(m.appId);
      l.value = S, !(!$ && !C) && (w += 1, m = null, r.value = null, u.value = null);
    }
    function R(T) {
      w += 1, m = null, s.value = T.theme === "dark" ? "dark" : "light", P(T.apps || []), o.value = String(T.chat?.characterAvatar || ""), r.value = null, u.value = null, n.value = !0;
    }
    function q(T) {
      if (T.type === "os/init" && R(T.payload || {}), T.type === "os/theme-changed" && (s.value = T.payload?.theme === "dark" ? "dark" : "light"), T.type === "os/apps-changed") {
        const $ = T.payload;
        P($?.apps || []);
      }
      T.type === "os/error" && (c.value = String(T.payload?.message || "小白 OS 初始化失败"));
      const S = T.payload?.state;
      m && T.type === `${m.appId}/state` && (m.latestState = S), r.value && T.type === `${r.value.id}/state` && (u.value = S);
    }
    async function U(T) {
      const S = ++w, $ = { appId: T.id };
      m = $, c.value = "";
      try {
        const C = await t.request("app/activate", { appId: T.id });
        if (S !== w) return;
        if (C.appId !== T.id) throw new Error("app_activation_mismatch");
        u.value = $.latestState ?? C.state ?? null, r.value = T;
      } catch (C) {
        if (S !== w) return;
        r.value = null, c.value = C instanceof Error ? C.message : String(C);
      } finally {
        m === $ && (m = null);
      }
    }
    function L() {
      w += 1, m = null, t.post("app/deactivate", { appId: r.value?.id || "" }), r.value = null, u.value = null;
    }
    function M() {
      w += 1, m = null, t.post("os/close");
    }
    function _(T) {
      if (T.key === "Escape") {
        T.preventDefault(), r.value ? L() : M();
        return;
      }
      if (T.key !== "Tab" || !a.value) return;
      const S = Array.from(a.value.querySelectorAll('button:not(:disabled), [href], input:not(:disabled), textarea:not(:disabled), [tabindex]:not([tabindex="-1"])'));
      if (S.length === 0) return;
      const $ = S[0], C = S[S.length - 1];
      T.shiftKey && document.activeElement === $ ? (T.preventDefault(), C.focus()) : !T.shiftKey && document.activeElement === C && (T.preventDefault(), $.focus());
    }
    return nt(async () => {
      d = document.activeElement instanceof HTMLElement ? document.activeElement : null, y = t.subscribe(q), t.start(), await nn(), a.value?.focus();
    }), ct(() => {
      w += 1, m = null, y(), t.dispose(), d?.focus();
    }), (T, S) => (p(), b("main", {
      ref_key: "root",
      ref: a,
      class: ae(["xiaobai-os-shell", `theme-${s.value}`]),
      role: "dialog",
      "aria-modal": "true",
      "aria-label": "小白 OS",
      tabindex: "-1",
      onKeydown: _,
      onClick: ut(M, ["self"])
    }, [c.value ? (p(), b("div", M0, h(c.value), 1)) : H("", !0), n.value ? (p(), be(_0, {
      key: 2,
      apps: A.value,
      "active-app": r.value,
      "active-state": u.value,
      bridge: fe(t),
      "character-avatar": o.value,
      onOpenApp: U,
      onBack: L,
      onHome: L,
      onClose: M
    }, null, 8, [
      "apps",
      "active-app",
      "active-state",
      "bridge",
      "character-avatar"
    ])) : (p(), b("div", T0, "正在启动小白 OS"))], 34));
  }
}), I0 = E0;
od(I0).mount("#app");
