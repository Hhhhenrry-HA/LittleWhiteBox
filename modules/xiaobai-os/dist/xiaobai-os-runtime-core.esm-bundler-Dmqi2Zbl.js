/* eslint-disable */
// @__NO_SIDE_EFFECTS__
function zt(e) {
  const t = /* @__PURE__ */ Object.create(null);
  for (const r of e.split(",")) t[r] = 1;
  return (r) => r in t;
}
var B = {}, it = [], Re = () => {
}, ws = () => !1, Dr = (e) => e.charCodeAt(0) === 111 && e.charCodeAt(1) === 110 && (e.charCodeAt(2) > 122 || e.charCodeAt(2) < 97), jr = (e) => e.startsWith("onUpdate:"), X = Object.assign, Lr = (e, t) => {
  const r = e.indexOf(t);
  r > -1 && e.splice(r, 1);
}, kn = Object.prototype.hasOwnProperty, H = (e, t) => kn.call(e, t), I = Array.isArray, lt = (e) => Pt(e) === "[object Map]", Os = (e) => Pt(e) === "[object Set]", is = (e) => Pt(e) === "[object Date]", F = (e) => typeof e == "function", re = (e) => typeof e == "string", De = (e) => typeof e == "symbol", N = (e) => e !== null && typeof e == "object", Es = (e) => (N(e) || F(e)) && F(e.then) && F(e.catch), As = Object.prototype.toString, Pt = (e) => As.call(e), Un = (e) => Pt(e).slice(8, -1), Ps = (e) => Pt(e) === "[object Object]", Hr = (e) => re(e) && e !== "NaN" && e[0] !== "-" && "" + parseInt(e, 10) === e, vt = /* @__PURE__ */ zt(",key,ref,ref_for,ref_key,onVnodeBeforeMount,onVnodeMounted,onVnodeBeforeUpdate,onVnodeUpdated,onVnodeBeforeUnmount,onVnodeUnmounted"), Qt = (e) => {
  const t = /* @__PURE__ */ Object.create(null);
  return ((r) => t[r] || (t[r] = e(r)));
}, Kn = /-\w/g, je = Qt((e) => e.replace(Kn, (t) => t.slice(1).toUpperCase())), $n = /\B([A-Z])/g, It = Qt((e) => e.replace($n, "-$1").toLowerCase()), Nr = Qt((e) => e.charAt(0).toUpperCase() + e.slice(1)), cr = Qt((e) => e ? `on${Nr(e)}` : ""), Me = (e, t) => !Object.is(e, t), ar = (e, ...t) => {
  for (let r = 0; r < e.length; r++) e[r](...t);
}, Is = (e, t, r, s = !1) => {
  Object.defineProperty(e, t, {
    configurable: !0,
    enumerable: !1,
    writable: s,
    value: r
  });
}, Wn = (e) => {
  const t = parseFloat(e);
  return isNaN(t) ? e : t;
}, Nl = (e) => {
  const t = re(e) ? Number(e) : NaN;
  return isNaN(t) ? e : t;
}, ls, Zt = () => ls || (ls = typeof globalThis < "u" ? globalThis : typeof self < "u" ? self : typeof window < "u" ? window : typeof globalThis < "u" ? globalThis : {});
function Vr(e) {
  if (I(e)) {
    const t = {};
    for (let r = 0; r < e.length; r++) {
      const s = e[r], n = re(s) ? Yn(s) : Vr(s);
      if (n) for (const i in n) t[i] = n[i];
    }
    return t;
  } else if (re(e) || N(e)) return e;
}
var qn = /;(?![^(]*\))/g, Jn = /:([^]+)/, Gn = /\/\*[^]*?\*\//g;
function Yn(e) {
  const t = {};
  return e.replace(Gn, "").split(qn).forEach((r) => {
    if (r) {
      const s = r.split(Jn);
      s.length > 1 && (t[s[0].trim()] = s[1].trim());
    }
  }), t;
}
function Br(e) {
  let t = "";
  if (re(e)) t = e;
  else if (I(e)) for (let r = 0; r < e.length; r++) {
    const s = Br(e[r]);
    s && (t += s + " ");
  }
  else if (N(e))
    for (const r in e) e[r] && (t += r + " ");
  return t.trim();
}
var Fs = "itemscope,allowfullscreen,formnovalidate,ismap,nomodule,novalidate,readonly", Vl = /* @__PURE__ */ zt(Fs), Bl = /* @__PURE__ */ zt(Fs + ",async,autofocus,autoplay,controls,default,defer,disabled,hidden,inert,loop,open,required,reversed,scoped,seamless,checked,muted,multiple,selected");
function kl(e) {
  return !!e || e === "";
}
function zn(e, t) {
  if (e.length !== t.length) return !1;
  let r = !0;
  for (let s = 0; r && s < e.length; s++) r = Xt(e[s], t[s]);
  return r;
}
function Xt(e, t) {
  if (e === t) return !0;
  let r = is(e), s = is(t);
  if (r || s) return r && s ? e.getTime() === t.getTime() : !1;
  if (r = De(e), s = De(t), r || s) return e === t;
  if (r = I(e), s = I(t), r || s) return r && s ? zn(e, t) : !1;
  if (r = N(e), s = N(t), r || s) {
    if (!r || !s || Object.keys(e).length !== Object.keys(t).length) return !1;
    for (const n in e) {
      const i = e.hasOwnProperty(n), l = t.hasOwnProperty(n);
      if (i && !l || !i && l || !Xt(e[n], t[n])) return !1;
    }
  }
  return String(e) === String(t);
}
function Ul(e, t) {
  return e.findIndex((r) => Xt(r, t));
}
var Ms = (e) => !!(e && e.__v_isRef === !0), Qn = (e) => re(e) ? e : e == null ? "" : I(e) || N(e) && (e.toString === As || !F(e.toString)) ? Ms(e) ? Qn(e.value) : JSON.stringify(e, Rs, 2) : String(e), Rs = (e, t) => Ms(t) ? Rs(e, t.value) : lt(t) ? { [`Map(${t.size})`]: [...t.entries()].reduce((r, [s, n], i) => (r[dr(s, i) + " =>"] = n, r), {}) } : Os(t) ? { [`Set(${t.size})`]: [...t.values()].map((r) => dr(r)) } : De(t) ? dr(t) : N(t) && !I(t) && !Ps(t) ? String(t) : t, dr = (e, t = "") => {
  var r;
  return De(e) ? `Symbol(${(r = e.description) != null ? r : t})` : e;
}, ee, Zn = class {
  constructor(e = !1) {
    this.detached = e, this._active = !0, this._on = 0, this.effects = [], this.cleanups = [], this._isPaused = !1, this._warnOnRun = !0, this.__v_skip = !0, !e && ee && (ee.active ? (this.parent = ee, this.index = (ee.scopes || (ee.scopes = [])).push(this) - 1) : (this._active = !1, this._warnOnRun = !1));
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
      const t = ee;
      try {
        return ee = this, e();
      } finally {
        ee = t;
      }
    }
  }
  on() {
    ++this._on === 1 && (this.prevScope = ee, ee = this);
  }
  off() {
    if (this._on > 0 && --this._on === 0) {
      if (ee === this) ee = this.prevScope;
      else {
        let e = ee;
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
      let t, r;
      for (t = 0, r = this.effects.length; t < r; t++) this.effects[t].stop();
      for (this.effects.length = 0, t = 0, r = this.cleanups.length; t < r; t++) this.cleanups[t]();
      if (this.cleanups.length = 0, this.scopes) {
        for (t = 0, r = this.scopes.length; t < r; t++) this.scopes[t].stop(!0);
        this.scopes.length = 0;
      }
      if (!this.detached && this.parent && !e) {
        const s = this.parent.scopes.pop();
        s && s !== this && (this.parent.scopes[this.index] = s, s.index = this.index);
      }
      this.parent = void 0;
    }
  }
};
function Xn() {
  return ee;
}
var W, hr = /* @__PURE__ */ new WeakSet(), Ds = class {
  constructor(e) {
    this.fn = e, this.deps = void 0, this.depsTail = void 0, this.flags = 5, this.next = void 0, this.cleanup = void 0, this.scheduler = void 0, ee && (ee.active ? ee.effects.push(this) : this.flags &= -2);
  }
  pause() {
    this.flags |= 64;
  }
  resume() {
    this.flags & 64 && (this.flags &= -65, hr.has(this) && (hr.delete(this), this.trigger()));
  }
  notify() {
    this.flags & 2 && !(this.flags & 32) || this.flags & 8 || Ls(this);
  }
  run() {
    if (!(this.flags & 1)) return this.fn();
    this.flags |= 2, os(this), Hs(this);
    const e = W, t = Ce;
    W = this, Ce = !0;
    try {
      return this.fn();
    } finally {
      Ns(this), W = e, Ce = t, this.flags &= -3;
    }
  }
  stop() {
    if (this.flags & 1) {
      for (let e = this.deps; e; e = e.nextDep) Kr(e);
      this.deps = this.depsTail = void 0, os(this), this.onStop && this.onStop(), this.flags &= -2;
    }
  }
  trigger() {
    this.flags & 64 ? hr.add(this) : this.scheduler ? this.scheduler() : this.runIfDirty();
  }
  runIfDirty() {
    xr(this) && this.run();
  }
  get dirty() {
    return xr(this);
  }
}, js = 0, _t, bt;
function Ls(e, t = !1) {
  if (e.flags |= 8, t) {
    e.next = bt, bt = e;
    return;
  }
  e.next = _t, _t = e;
}
function kr() {
  js++;
}
function Ur() {
  if (--js > 0) return;
  if (bt) {
    let t = bt;
    for (bt = void 0; t; ) {
      const r = t.next;
      t.next = void 0, t.flags &= -9, t = r;
    }
  }
  let e;
  for (; _t; ) {
    let t = _t;
    for (_t = void 0; t; ) {
      const r = t.next;
      if (t.next = void 0, t.flags &= -9, t.flags & 1) try {
        t.trigger();
      } catch (s) {
        e || (e = s);
      }
      t = r;
    }
  }
  if (e) throw e;
}
function Hs(e) {
  for (let t = e.deps; t; t = t.nextDep)
    t.version = -1, t.prevActiveLink = t.dep.activeLink, t.dep.activeLink = t;
}
function Ns(e) {
  let t, r = e.depsTail, s = r;
  for (; s; ) {
    const n = s.prevDep;
    s.version === -1 ? (s === r && (r = n), Kr(s), ei(s)) : t = s, s.dep.activeLink = s.prevActiveLink, s.prevActiveLink = void 0, s = n;
  }
  e.deps = t, e.depsTail = r;
}
function xr(e) {
  for (let t = e.deps; t; t = t.nextDep) if (t.dep.version !== t.version || t.dep.computed && (Vs(t.dep.computed) || t.dep.version !== t.version)) return !0;
  return !!e._dirty;
}
function Vs(e) {
  if (e.flags & 4 && !(e.flags & 16) || (e.flags &= -17, e.globalVersion === Tt) || (e.globalVersion = Tt, !e.isSSR && e.flags & 128 && (!e.deps && !e._dirty || !xr(e)))) return;
  e.flags |= 2;
  const t = e.dep, r = W, s = Ce;
  W = e, Ce = !0;
  try {
    Hs(e);
    const n = e.fn(e._value);
    (t.version === 0 || Me(n, e._value)) && (e.flags |= 128, e._value = n, t.version++);
  } catch (n) {
    throw t.version++, n;
  } finally {
    W = r, Ce = s, Ns(e), e.flags &= -3;
  }
}
function Kr(e, t = !1) {
  const { dep: r, prevSub: s, nextSub: n } = e;
  if (s && (s.nextSub = n, e.prevSub = void 0), n && (n.prevSub = s, e.nextSub = void 0), r.subs === e && (r.subs = s, !s && r.computed)) {
    r.computed.flags &= -5;
    for (let i = r.computed.deps; i; i = i.nextDep) Kr(i, !0);
  }
  !t && !--r.sc && r.map && r.map.delete(r.key);
}
function ei(e) {
  const { prevDep: t, nextDep: r } = e;
  t && (t.nextDep = r, e.prevDep = void 0), r && (r.prevDep = t, e.nextDep = void 0);
}
var Ce = !0, Bs = [];
function ke() {
  Bs.push(Ce), Ce = !1;
}
function Ue() {
  const e = Bs.pop();
  Ce = e === void 0 ? !0 : e;
}
function os(e) {
  const { cleanup: t } = e;
  if (e.cleanup = void 0, t) {
    const r = W;
    W = void 0;
    try {
      t();
    } finally {
      W = r;
    }
  }
}
var Tt = 0, ti = class {
  constructor(e, t) {
    this.sub = e, this.dep = t, this.version = t.version, this.nextDep = this.prevDep = this.nextSub = this.prevSub = this.prevActiveLink = void 0;
  }
}, $r = class {
  constructor(e) {
    this.computed = e, this.version = 0, this.activeLink = void 0, this.subs = void 0, this.map = void 0, this.key = void 0, this.sc = 0, this.__v_skip = !0;
  }
  track(e) {
    if (!W || !Ce || W === this.computed) return;
    let t = this.activeLink;
    if (t === void 0 || t.sub !== W)
      t = this.activeLink = new ti(W, this), W.deps ? (t.prevDep = W.depsTail, W.depsTail.nextDep = t, W.depsTail = t) : W.deps = W.depsTail = t, ks(t);
    else if (t.version === -1 && (t.version = this.version, t.nextDep)) {
      const r = t.nextDep;
      r.prevDep = t.prevDep, t.prevDep && (t.prevDep.nextDep = r), t.prevDep = W.depsTail, t.nextDep = void 0, W.depsTail.nextDep = t, W.depsTail = t, W.deps === t && (W.deps = r);
    }
    return t;
  }
  trigger(e) {
    this.version++, Tt++, this.notify(e);
  }
  notify(e) {
    kr();
    try {
      for (let t = this.subs; t; t = t.prevSub) t.sub.notify() && t.sub.dep.notify();
    } finally {
      Ur();
    }
  }
};
function ks(e) {
  if (e.dep.sc++, e.sub.flags & 4) {
    const t = e.dep.computed;
    if (t && !e.dep.subs) {
      t.flags |= 20;
      for (let s = t.deps; s; s = s.nextDep) ks(s);
    }
    const r = e.dep.subs;
    r !== e && (e.prevSub = r, r && (r.nextSub = e)), e.dep.subs = e;
  }
}
var Tr = /* @__PURE__ */ new WeakMap(), et = /* @__PURE__ */ Symbol(""), Sr = /* @__PURE__ */ Symbol(""), St = /* @__PURE__ */ Symbol("");
function se(e, t, r) {
  if (Ce && W) {
    let s = Tr.get(e);
    s || Tr.set(e, s = /* @__PURE__ */ new Map());
    let n = s.get(r);
    n || (s.set(r, n = new $r()), n.map = s, n.key = r), n.track();
  }
}
function Ve(e, t, r, s, n, i) {
  const l = Tr.get(e);
  if (!l) {
    Tt++;
    return;
  }
  const f = (u) => {
    u && u.trigger();
  };
  if (kr(), t === "clear") l.forEach(f);
  else {
    const u = I(e), d = u && Hr(r);
    if (u && r === "length") {
      const a = Number(s);
      l.forEach((p, T) => {
        (T === "length" || T === St || !De(T) && T >= a) && f(p);
      });
    } else
      switch ((r !== void 0 || l.has(void 0)) && f(l.get(r)), d && f(l.get(St)), t) {
        case "add":
          u ? d && f(l.get("length")) : (f(l.get(et)), lt(e) && f(l.get(Sr)));
          break;
        case "delete":
          u || (f(l.get(et)), lt(e) && f(l.get(Sr)));
          break;
        case "set":
          lt(e) && f(l.get(et));
          break;
      }
  }
  Ur();
}
function st(e) {
  const t = /* @__PURE__ */ L(e);
  return t === e ? t : (se(t, "iterate", St), /* @__PURE__ */ xe(e) ? t : t.map(we));
}
function er(e) {
  return se(e = /* @__PURE__ */ L(e), "iterate", St), e;
}
function Ie(e, t) {
  return /* @__PURE__ */ Ke(e) ? ct(/* @__PURE__ */ tt(e) ? we(t) : t) : we(t);
}
var ri = {
  __proto__: null,
  [Symbol.iterator]() {
    return pr(this, Symbol.iterator, (e) => Ie(this, e));
  },
  concat(...e) {
    return st(this).concat(...e.map((t) => I(t) ? st(t) : t));
  },
  entries() {
    return pr(this, "entries", (e) => (e[1] = Ie(this, e[1]), e));
  },
  every(e, t) {
    return He(this, "every", e, t, void 0, arguments);
  },
  filter(e, t) {
    return He(this, "filter", e, t, (r) => r.map((s) => Ie(this, s)), arguments);
  },
  find(e, t) {
    return He(this, "find", e, t, (r) => Ie(this, r), arguments);
  },
  findIndex(e, t) {
    return He(this, "findIndex", e, t, void 0, arguments);
  },
  findLast(e, t) {
    return He(this, "findLast", e, t, (r) => Ie(this, r), arguments);
  },
  findLastIndex(e, t) {
    return He(this, "findLastIndex", e, t, void 0, arguments);
  },
  forEach(e, t) {
    return He(this, "forEach", e, t, void 0, arguments);
  },
  includes(...e) {
    return gr(this, "includes", e);
  },
  indexOf(...e) {
    return gr(this, "indexOf", e);
  },
  join(e) {
    return st(this).join(e);
  },
  lastIndexOf(...e) {
    return gr(this, "lastIndexOf", e);
  },
  map(e, t) {
    return He(this, "map", e, t, void 0, arguments);
  },
  pop() {
    return ht(this, "pop");
  },
  push(...e) {
    return ht(this, "push", e);
  },
  reduce(e, ...t) {
    return fs(this, "reduce", e, t);
  },
  reduceRight(e, ...t) {
    return fs(this, "reduceRight", e, t);
  },
  shift() {
    return ht(this, "shift");
  },
  some(e, t) {
    return He(this, "some", e, t, void 0, arguments);
  },
  splice(...e) {
    return ht(this, "splice", e);
  },
  toReversed() {
    return st(this).toReversed();
  },
  toSorted(e) {
    return st(this).toSorted(e);
  },
  toSpliced(...e) {
    return st(this).toSpliced(...e);
  },
  unshift(...e) {
    return ht(this, "unshift", e);
  },
  values() {
    return pr(this, "values", (e) => Ie(this, e));
  }
};
function pr(e, t, r) {
  const s = er(e), n = s[t]();
  return s !== e && !/* @__PURE__ */ xe(e) && (n._next = n.next, n.next = () => {
    const i = n._next();
    return i.done || (i.value = r(i.value)), i;
  }), n;
}
var si = Array.prototype;
function He(e, t, r, s, n, i) {
  const l = er(e), f = l !== e && !/* @__PURE__ */ xe(e), u = l[t];
  if (u !== si[t]) {
    const p = u.apply(e, i);
    return f ? we(p) : p;
  }
  let d = r;
  l !== e && (f ? d = function(p, T) {
    return r.call(this, Ie(e, p), T, e);
  } : r.length > 2 && (d = function(p, T) {
    return r.call(this, p, T, e);
  }));
  const a = u.call(l, d, s);
  return f && n ? n(a) : a;
}
function fs(e, t, r, s) {
  const n = er(e), i = n !== e && !/* @__PURE__ */ xe(e);
  let l = r, f = !1;
  n !== e && (i ? (f = s.length === 0, l = function(d, a, p) {
    return f && (f = !1, d = Ie(e, d)), r.call(this, d, Ie(e, a), p, e);
  }) : r.length > 3 && (l = function(d, a, p) {
    return r.call(this, d, a, p, e);
  }));
  const u = n[t](l, ...s);
  return f ? Ie(e, u) : u;
}
function gr(e, t, r) {
  const s = /* @__PURE__ */ L(e);
  se(s, "iterate", St);
  const n = s[t](...r);
  return (n === -1 || n === !1) && /* @__PURE__ */ Gr(r[0]) ? (r[0] = /* @__PURE__ */ L(r[0]), s[t](...r)) : n;
}
function ht(e, t, r = []) {
  ke(), kr();
  const s = (/* @__PURE__ */ L(e))[t].apply(e, r);
  return Ur(), Ue(), s;
}
var ni = /* @__PURE__ */ zt("__proto__,__v_isRef,__isVue"), Us = new Set(/* @__PURE__ */ Object.getOwnPropertyNames(Symbol).filter((e) => e !== "arguments" && e !== "caller").map((e) => Symbol[e]).filter(De));
function ii(e) {
  De(e) || (e = String(e));
  const t = /* @__PURE__ */ L(this);
  return se(t, "has", e), t.hasOwnProperty(e);
}
var Ks = class {
  constructor(e = !1, t = !1) {
    this._isReadonly = e, this._isShallow = t;
  }
  get(e, t, r) {
    if (t === "__v_skip") return e.__v_skip;
    const s = this._isReadonly, n = this._isShallow;
    if (t === "__v_isReactive") return !s;
    if (t === "__v_isReadonly") return s;
    if (t === "__v_isShallow") return n;
    if (t === "__v_raw")
      return r === (s ? n ? gi : Js : n ? qs : Ws).get(e) || Object.getPrototypeOf(e) === Object.getPrototypeOf(r) ? e : void 0;
    const i = I(e);
    if (!s) {
      let f;
      if (i && (f = ri[t])) return f;
      if (t === "hasOwnProperty") return ii;
    }
    const l = Reflect.get(e, t, /* @__PURE__ */ le(e) ? e : r);
    if ((De(t) ? Us.has(t) : ni(t)) || (s || se(e, "get", t), n)) return l;
    if (/* @__PURE__ */ le(l)) {
      const f = i && Hr(t) ? l : l.value;
      return s && N(f) ? /* @__PURE__ */ wr(f) : f;
    }
    return N(l) ? s ? /* @__PURE__ */ wr(l) : /* @__PURE__ */ qr(l) : l;
  }
}, $s = class extends Ks {
  constructor(e = !1) {
    super(!1, e);
  }
  set(e, t, r, s) {
    let n = e[t];
    const i = I(e) && Hr(t);
    if (!this._isShallow) {
      const u = /* @__PURE__ */ Ke(n);
      if (!/* @__PURE__ */ xe(r) && !/* @__PURE__ */ Ke(r) && (n = /* @__PURE__ */ L(n), r = /* @__PURE__ */ L(r)), !i && /* @__PURE__ */ le(n) && !/* @__PURE__ */ le(r)) return u || (n.value = r), !0;
    }
    const l = i ? Number(t) < e.length : H(e, t), f = Reflect.set(e, t, r, /* @__PURE__ */ le(e) ? e : s);
    return e === /* @__PURE__ */ L(s) && (l ? Me(r, n) && Ve(e, "set", t, r, n) : Ve(e, "add", t, r)), f;
  }
  deleteProperty(e, t) {
    const r = H(e, t), s = e[t], n = Reflect.deleteProperty(e, t);
    return n && r && Ve(e, "delete", t, void 0, s), n;
  }
  has(e, t) {
    const r = Reflect.has(e, t);
    return (!De(t) || !Us.has(t)) && se(e, "has", t), r;
  }
  ownKeys(e) {
    return se(e, "iterate", I(e) ? "length" : et), Reflect.ownKeys(e);
  }
}, li = class extends Ks {
  constructor(e = !1) {
    super(!0, e);
  }
  set(e, t) {
    return !0;
  }
  deleteProperty(e, t) {
    return !0;
  }
}, oi = /* @__PURE__ */ new $s(), fi = /* @__PURE__ */ new li(), ui = /* @__PURE__ */ new $s(!0), Cr = (e) => e, Ht = (e) => Reflect.getPrototypeOf(e);
function ci(e, t, r) {
  return function(...s) {
    const n = this.__v_raw, i = /* @__PURE__ */ L(n), l = lt(i), f = e === "entries" || e === Symbol.iterator && l, u = e === "keys" && l, d = n[e](...s), a = r ? Cr : t ? ct : we;
    return !t && se(i, "iterate", u ? Sr : et), X(Object.create(d), { next() {
      const { value: p, done: T } = d.next();
      return T ? {
        value: p,
        done: T
      } : {
        value: f ? [a(p[0]), a(p[1])] : a(p),
        done: T
      };
    } });
  };
}
function Nt(e) {
  return function(...t) {
    return e === "delete" ? !1 : e === "clear" ? void 0 : this;
  };
}
function ai(e, t) {
  const r = {
    get(s) {
      const n = this.__v_raw, i = /* @__PURE__ */ L(n), l = /* @__PURE__ */ L(s);
      e || (Me(s, l) && se(i, "get", s), se(i, "get", l));
      const { has: f } = Ht(i), u = t ? Cr : e ? ct : we;
      if (f.call(i, s)) return u(n.get(s));
      if (f.call(i, l)) return u(n.get(l));
      n !== i && n.get(s);
    },
    get size() {
      const s = this.__v_raw;
      return !e && se(/* @__PURE__ */ L(s), "iterate", et), s.size;
    },
    has(s) {
      const n = this.__v_raw, i = /* @__PURE__ */ L(n), l = /* @__PURE__ */ L(s);
      return e || (Me(s, l) && se(i, "has", s), se(i, "has", l)), s === l ? n.has(s) : n.has(s) || n.has(l);
    },
    forEach(s, n) {
      const i = this, l = i.__v_raw, f = /* @__PURE__ */ L(l), u = t ? Cr : e ? ct : we;
      return !e && se(f, "iterate", et), l.forEach((d, a) => s.call(n, u(d), u(a), i));
    }
  };
  return X(r, e ? {
    add: Nt("add"),
    set: Nt("set"),
    delete: Nt("delete"),
    clear: Nt("clear")
  } : {
    add(s) {
      const n = /* @__PURE__ */ L(this), i = Ht(n), l = /* @__PURE__ */ L(s), f = !t && !/* @__PURE__ */ xe(s) && !/* @__PURE__ */ Ke(s) ? l : s;
      return i.has.call(n, f) || Me(s, f) && i.has.call(n, s) || Me(l, f) && i.has.call(n, l) || (n.add(f), Ve(n, "add", f, f)), this;
    },
    set(s, n) {
      !t && !/* @__PURE__ */ xe(n) && !/* @__PURE__ */ Ke(n) && (n = /* @__PURE__ */ L(n));
      const i = /* @__PURE__ */ L(this), { has: l, get: f } = Ht(i);
      let u = l.call(i, s);
      u || (s = /* @__PURE__ */ L(s), u = l.call(i, s));
      const d = f.call(i, s);
      return i.set(s, n), u ? Me(n, d) && Ve(i, "set", s, n, d) : Ve(i, "add", s, n), this;
    },
    delete(s) {
      const n = /* @__PURE__ */ L(this), { has: i, get: l } = Ht(n);
      let f = i.call(n, s);
      f || (s = /* @__PURE__ */ L(s), f = i.call(n, s));
      const u = l ? l.call(n, s) : void 0, d = n.delete(s);
      return f && Ve(n, "delete", s, void 0, u), d;
    },
    clear() {
      const s = /* @__PURE__ */ L(this), n = s.size !== 0, i = void 0, l = s.clear();
      return n && Ve(s, "clear", void 0, void 0, i), l;
    }
  }), [
    "keys",
    "values",
    "entries",
    Symbol.iterator
  ].forEach((s) => {
    r[s] = ci(s, e, t);
  }), r;
}
function Wr(e, t) {
  const r = ai(e, t);
  return (s, n, i) => n === "__v_isReactive" ? !e : n === "__v_isReadonly" ? e : n === "__v_raw" ? s : Reflect.get(H(r, n) && n in s ? r : s, n, i);
}
var di = { get: /* @__PURE__ */ Wr(!1, !1) }, hi = { get: /* @__PURE__ */ Wr(!1, !0) }, pi = { get: /* @__PURE__ */ Wr(!0, !1) }, Ws = /* @__PURE__ */ new WeakMap(), qs = /* @__PURE__ */ new WeakMap(), Js = /* @__PURE__ */ new WeakMap(), gi = /* @__PURE__ */ new WeakMap();
function vi(e) {
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
function qr(e) {
  return /* @__PURE__ */ Ke(e) ? e : Jr(e, !1, oi, di, Ws);
}
// @__NO_SIDE_EFFECTS__
function _i(e) {
  return Jr(e, !1, ui, hi, qs);
}
// @__NO_SIDE_EFFECTS__
function wr(e) {
  return Jr(e, !0, fi, pi, Js);
}
function Jr(e, t, r, s, n) {
  if (!N(e) || e.__v_raw && !(t && e.__v_isReactive) || e.__v_skip || !Object.isExtensible(e)) return e;
  const i = n.get(e);
  if (i) return i;
  const l = vi(Un(e));
  if (l === 0) return e;
  const f = new Proxy(e, l === 2 ? s : r);
  return n.set(e, f), f;
}
// @__NO_SIDE_EFFECTS__
function tt(e) {
  return /* @__PURE__ */ Ke(e) ? /* @__PURE__ */ tt(e.__v_raw) : !!(e && e.__v_isReactive);
}
// @__NO_SIDE_EFFECTS__
function Ke(e) {
  return !!(e && e.__v_isReadonly);
}
// @__NO_SIDE_EFFECTS__
function xe(e) {
  return !!(e && e.__v_isShallow);
}
// @__NO_SIDE_EFFECTS__
function Gr(e) {
  return e ? !!e.__v_raw : !1;
}
// @__NO_SIDE_EFFECTS__
function L(e) {
  const t = e && e.__v_raw;
  return t ? /* @__PURE__ */ L(t) : e;
}
function bi(e) {
  return !H(e, "__v_skip") && Object.isExtensible(e) && Is(e, "__v_skip", !0), e;
}
var we = (e) => N(e) ? /* @__PURE__ */ qr(e) : e, ct = (e) => N(e) ? /* @__PURE__ */ wr(e) : e;
// @__NO_SIDE_EFFECTS__
function le(e) {
  return e ? e.__v_isRef === !0 : !1;
}
// @__NO_SIDE_EFFECTS__
function Kl(e) {
  return Gs(e, !1);
}
// @__NO_SIDE_EFFECTS__
function $l(e) {
  return Gs(e, !0);
}
function Gs(e, t) {
  return /* @__PURE__ */ le(e) ? e : new yi(e, t);
}
var yi = class {
  constructor(e, t) {
    this.dep = new $r(), this.__v_isRef = !0, this.__v_isShallow = !1, this._rawValue = t ? e : /* @__PURE__ */ L(e), this._value = t ? e : we(e), this.__v_isShallow = t;
  }
  get value() {
    return this.dep.track(), this._value;
  }
  set value(e) {
    const t = this._rawValue, r = this.__v_isShallow || /* @__PURE__ */ xe(e) || /* @__PURE__ */ Ke(e);
    e = r ? e : /* @__PURE__ */ L(e), Me(e, t) && (this._rawValue = e, this._value = r ? e : we(e), this.dep.trigger());
  }
};
function mi(e) {
  return /* @__PURE__ */ le(e) ? e.value : e;
}
var xi = {
  get: (e, t, r) => t === "__v_raw" ? e : mi(Reflect.get(e, t, r)),
  set: (e, t, r, s) => {
    const n = e[t];
    return /* @__PURE__ */ le(n) && !/* @__PURE__ */ le(r) ? (n.value = r, !0) : Reflect.set(e, t, r, s);
  }
};
function Ys(e) {
  return /* @__PURE__ */ tt(e) ? e : new Proxy(e, xi);
}
var Ti = class {
  constructor(e, t, r) {
    this.fn = e, this.setter = t, this._value = void 0, this.dep = new $r(this), this.__v_isRef = !0, this.deps = void 0, this.depsTail = void 0, this.flags = 16, this.globalVersion = Tt - 1, this.next = void 0, this.effect = this, this.__v_isReadonly = !t, this.isSSR = r;
  }
  notify() {
    if (this.flags |= 16, !(this.flags & 8) && W !== this)
      return Ls(this, !0), !0;
  }
  get value() {
    const e = this.dep.track();
    return Vs(this), e && (e.version = this.dep.version), this._value;
  }
  set value(e) {
    this.setter && this.setter(e);
  }
};
// @__NO_SIDE_EFFECTS__
function Si(e, t, r = !1) {
  let s, n;
  return F(e) ? s = e : (s = e.get, n = e.set), new Ti(s, n, r);
}
var Vt = {}, Kt = /* @__PURE__ */ new WeakMap(), Ze = void 0;
function Ci(e, t = !1, r = Ze) {
  if (r) {
    let s = Kt.get(r);
    s || Kt.set(r, s = []), s.push(e);
  }
}
function wi(e, t, r = B) {
  const { immediate: s, deep: n, once: i, scheduler: l, augmentJob: f, call: u } = r, d = (E) => n ? E : /* @__PURE__ */ xe(E) || n === !1 || n === 0 ? Be(E, 1) : Be(E);
  let a, p, T, C, D = !1, A = !1;
  if (/* @__PURE__ */ le(e) ? (p = () => e.value, D = /* @__PURE__ */ xe(e)) : /* @__PURE__ */ tt(e) ? (p = () => d(e), D = !0) : I(e) ? (A = !0, D = e.some((E) => /* @__PURE__ */ tt(E) || /* @__PURE__ */ xe(E)), p = () => e.map((E) => {
    if (/* @__PURE__ */ le(E)) return E.value;
    if (/* @__PURE__ */ tt(E)) return d(E);
    if (F(E)) return u ? u(E, 2) : E();
  })) : F(e) ? t ? p = u ? () => u(e, 2) : e : p = () => {
    if (T) {
      ke();
      try {
        T();
      } finally {
        Ue();
      }
    }
    const E = Ze;
    Ze = a;
    try {
      return u ? u(e, 3, [C]) : e(C);
    } finally {
      Ze = E;
    }
  } : p = Re, t && n) {
    const E = p, q = n === !0 ? 1 / 0 : n;
    p = () => Be(E(), q);
  }
  const Y = Xn(), k = () => {
    a.stop(), Y && Y.active && Lr(Y.effects, a);
  };
  if (i && t) {
    const E = t;
    t = (...q) => {
      E(...q), k();
    };
  }
  let R = A ? new Array(e.length).fill(Vt) : Vt;
  const V = (E) => {
    if (!(!(a.flags & 1) || !a.dirty && !E))
      if (t) {
        const q = a.run();
        if (n || D || (A ? q.some((oe, _e) => Me(oe, R[_e])) : Me(q, R))) {
          T && T();
          const oe = Ze;
          Ze = a;
          try {
            const _e = [
              q,
              R === Vt ? void 0 : A && R[0] === Vt ? [] : R,
              C
            ];
            R = q, u ? u(t, 3, _e) : t(..._e);
          } finally {
            Ze = oe;
          }
        }
      } else a.run();
  };
  return f && f(V), a = new Ds(p), a.scheduler = l ? () => l(V, !1) : V, C = (E) => Ci(E, !1, a), T = a.onStop = () => {
    const E = Kt.get(a);
    if (E) {
      if (u) u(E, 4);
      else for (const q of E) q();
      Kt.delete(a);
    }
  }, t ? s ? V(!0) : R = a.run() : l ? l(V.bind(null, !0), !0) : a.run(), k.pause = a.pause.bind(a), k.resume = a.resume.bind(a), k.stop = k, k;
}
function Be(e, t = 1 / 0, r) {
  if (t <= 0 || !N(e) || e.__v_skip || (r = r || /* @__PURE__ */ new Map(), (r.get(e) || 0) >= t)) return e;
  if (r.set(e, t), t--, /* @__PURE__ */ le(e)) Be(e.value, t, r);
  else if (I(e)) for (let s = 0; s < e.length; s++) Be(e[s], t, r);
  else if (Os(e) || lt(e)) e.forEach((s) => {
    Be(s, t, r);
  });
  else if (Ps(e)) {
    for (const s in e) Be(e[s], t, r);
    for (const s of Object.getOwnPropertySymbols(e)) Object.prototype.propertyIsEnumerable.call(e, s) && Be(e[s], t, r);
  }
  return e;
}
function Ft(e, t, r, s) {
  try {
    return s ? e(...s) : e();
  } catch (n) {
    tr(n, t, r);
  }
}
function Le(e, t, r, s) {
  if (F(e)) {
    const n = Ft(e, t, r, s);
    return n && Es(n) && n.catch((i) => {
      tr(i, t, r);
    }), n;
  }
  if (I(e)) {
    const n = [];
    for (let i = 0; i < e.length; i++) n.push(Le(e[i], t, r, s));
    return n;
  }
}
function tr(e, t, r, s = !0) {
  const n = t ? t.vnode : null, { errorHandler: i, throwUnhandledErrorInProduction: l } = t && t.appContext.config || B;
  if (t) {
    let f = t.parent;
    const u = t.proxy, d = `https://vuejs.org/error-reference/#runtime-${r}`;
    for (; f; ) {
      const a = f.ec;
      if (a) {
        for (let p = 0; p < a.length; p++) if (a[p](e, u, d) === !1) return;
      }
      f = f.parent;
    }
    if (i) {
      ke(), Ft(i, null, 10, [
        e,
        u,
        d
      ]), Ue();
      return;
    }
  }
  Oi(e, r, n, s, l);
}
function Oi(e, t, r, s = !0, n = !1) {
  if (n) throw e;
  console.error(e);
}
var ce = [], Pe = -1, ot = [], Ge = null, nt = 0, zs = /* @__PURE__ */ Promise.resolve(), $t = null;
function Ei(e) {
  const t = $t || zs;
  return e ? t.then(this ? e.bind(this) : e) : t;
}
function Ai(e) {
  let t = Pe + 1, r = ce.length;
  for (; t < r; ) {
    const s = t + r >>> 1, n = ce[s], i = Ct(n);
    i < e || i === e && n.flags & 2 ? t = s + 1 : r = s;
  }
  return t;
}
function Yr(e) {
  if (!(e.flags & 1)) {
    const t = Ct(e), r = ce[ce.length - 1];
    !r || !(e.flags & 2) && t >= Ct(r) ? ce.push(e) : ce.splice(Ai(t), 0, e), e.flags |= 1, Qs();
  }
}
function Qs() {
  $t || ($t = zs.then(Xs));
}
function Pi(e) {
  I(e) ? ot.push(...e) : Ge && e.id === -1 ? Ge.splice(nt + 1, 0, e) : e.flags & 1 || (ot.push(e), e.flags |= 1), Qs();
}
function us(e, t, r = Pe + 1) {
  for (; r < ce.length; r++) {
    const s = ce[r];
    if (s && s.flags & 2) {
      if (e && s.id !== e.uid) continue;
      ce.splice(r, 1), r--, s.flags & 4 && (s.flags &= -2), s(), s.flags & 4 || (s.flags &= -2);
    }
  }
}
function Zs(e) {
  if (ot.length) {
    const t = [...new Set(ot)].sort((r, s) => Ct(r) - Ct(s));
    if (ot.length = 0, Ge) {
      Ge.push(...t);
      return;
    }
    for (Ge = t, nt = 0; nt < Ge.length; nt++) {
      const r = Ge[nt];
      r.flags & 4 && (r.flags &= -2), r.flags & 8 || r(), r.flags &= -2;
    }
    Ge = null, nt = 0;
  }
}
var Ct = (e) => e.id == null ? e.flags & 2 ? -1 : 1 / 0 : e.id;
function Xs(e) {
  try {
    for (Pe = 0; Pe < ce.length; Pe++) {
      const t = ce[Pe];
      t && !(t.flags & 8) && (t.flags & 4 && (t.flags &= -2), Ft(t, t.i, t.i ? 15 : 14), t.flags & 4 || (t.flags &= -2));
    }
  } finally {
    for (; Pe < ce.length; Pe++) {
      const t = ce[Pe];
      t && (t.flags &= -2);
    }
    Pe = -1, ce.length = 0, Zs(e), $t = null, (ce.length || ot.length) && Xs(e);
  }
}
var te = null, en = null;
function Wt(e) {
  const t = te;
  return te = e, en = e && e.type.__scopeId || null, t;
}
function Ii(e, t = te, r) {
  if (!t || e._n) return e;
  const s = (...n) => {
    s._d && Gt(-1);
    const i = Wt(t);
    let l;
    try {
      l = e(...n);
    } finally {
      Wt(i), s._d && Gt(1);
    }
    return l;
  };
  return s._n = !0, s._c = !0, s._d = !0, s;
}
function Wl(e, t) {
  if (te === null) return e;
  const r = lr(te), s = e.dirs || (e.dirs = []);
  for (let n = 0; n < t.length; n++) {
    let [i, l, f, u = B] = t[n];
    i && (F(i) && (i = {
      mounted: i,
      updated: i
    }), i.deep && Be(l), s.push({
      dir: i,
      instance: r,
      value: l,
      oldValue: void 0,
      arg: f,
      modifiers: u
    }));
  }
  return e;
}
function ze(e, t, r, s) {
  const n = e.dirs, i = t && t.dirs;
  for (let l = 0; l < n.length; l++) {
    const f = n[l];
    i && (f.oldValue = i[l].value);
    let u = f.dir[s];
    u && (ke(), Le(u, r, 8, [
      e.el,
      f,
      e,
      t
    ]), Ue());
  }
}
function Fi(e, t) {
  if (ie) {
    let r = ie.provides;
    const s = ie.parent && ie.parent.provides;
    s === r && (r = ie.provides = Object.create(s)), r[e] = t;
  }
}
function Bt(e, t, r = !1) {
  const s = Ln();
  if (s || ut) {
    let n = ut ? ut._context.provides : s ? s.parent == null || s.ce ? s.vnode.appContext && s.vnode.appContext.provides : s.parent.provides : void 0;
    if (n && e in n) return n[e];
    if (arguments.length > 1) return r && F(t) ? t.call(s && s.proxy) : t;
  }
}
var Mi = /* @__PURE__ */ Symbol.for("v-scx"), Ri = () => {
  {
    const e = Bt(Mi);
    return e;
  }
};
function vr(e, t, r) {
  return tn(e, t, r);
}
function tn(e, t, r = B) {
  const { immediate: s, deep: n, flush: i, once: l } = r, f = X({}, r), u = t && s || !t && i !== "post";
  let d;
  if (At) {
    if (i === "sync") {
      const C = Ri();
      d = C.__watcherHandles || (C.__watcherHandles = []);
    } else if (!u) {
      const C = () => {
      };
      return C.stop = Re, C.resume = Re, C.pause = Re, C;
    }
  }
  const a = ie;
  f.call = (C, D, A) => Le(C, a, D, A);
  let p = !1;
  i === "post" ? f.scheduler = (C) => {
    de(C, a && a.suspense);
  } : i !== "sync" && (p = !0, f.scheduler = (C, D) => {
    D ? C() : Yr(C);
  }), f.augmentJob = (C) => {
    t && (C.flags |= 4), p && (C.flags |= 2, a && (C.id = a.uid, C.i = a));
  };
  const T = wi(e, t, f);
  return At && (d ? d.push(T) : u && T()), T;
}
function Di(e, t, r) {
  const s = this.proxy, n = re(e) ? e.includes(".") ? rn(s, e) : () => s[e] : e.bind(s, s);
  let i;
  F(t) ? i = t : (i = t.handler, r = t);
  const l = Mt(this), f = tn(n, i.bind(s), r);
  return l(), f;
}
function rn(e, t) {
  const r = t.split(".");
  return () => {
    let s = e;
    for (let n = 0; n < r.length && s; n++) s = s[r[n]];
    return s;
  };
}
var ji = /* @__PURE__ */ Symbol("_vte"), sn = (e) => e.__isTeleport, me = /* @__PURE__ */ Symbol("_leaveCb"), pt = /* @__PURE__ */ Symbol("_enterCb");
function Li() {
  const e = {
    isMounted: !1,
    isLeaving: !1,
    isUnmounting: !1,
    leavingVNodes: /* @__PURE__ */ new Map()
  };
  return an(() => {
    e.isMounted = !0;
  }), dn(() => {
    e.isUnmounting = !0;
  }), e;
}
var ye = [Function, Array], Hi = {
  mode: String,
  appear: Boolean,
  persisted: Boolean,
  onBeforeEnter: ye,
  onEnter: ye,
  onAfterEnter: ye,
  onEnterCancelled: ye,
  onBeforeLeave: ye,
  onLeave: ye,
  onAfterLeave: ye,
  onLeaveCancelled: ye,
  onBeforeAppear: ye,
  onAppear: ye,
  onAfterAppear: ye,
  onAppearCancelled: ye
}, nn = (e) => {
  const t = e.subTree;
  return t.component ? nn(t.component) : t;
}, Ni = {
  name: "BaseTransition",
  props: Hi,
  setup(e, { slots: t }) {
    const r = Ln(), s = Li();
    return () => {
      const n = t.default && fn(t.default(), !0), i = n && n.length ? ln(n) : r.subTree ? wl() : void 0;
      if (!i) return;
      const l = /* @__PURE__ */ L(e), { mode: f } = l;
      if (s.isLeaving) return _r(i);
      const u = cs(i);
      if (!u) return _r(i);
      let d = Or(u, l, s, r, (p) => d = p);
      u.type !== ne && wt(u, d);
      let a = r.subTree && cs(r.subTree);
      if (a && a.type !== ne && !Xe(a, u) && nn(r).type !== ne) {
        let p = Or(a, l, s, r);
        if (wt(a, p), f === "out-in" && u.type !== ne)
          return s.isLeaving = !0, p.afterLeave = () => {
            s.isLeaving = !1, r.job.flags & 8 || r.update(), delete p.afterLeave, a = void 0;
          }, _r(i);
        f === "in-out" && u.type !== ne ? p.delayLeave = (T, C, D) => {
          const A = on(s, a);
          A[String(a.key)] = a, T[me] = () => {
            C(), T[me] = void 0, delete d.delayedLeave, a = void 0;
          }, d.delayedLeave = () => {
            D(), delete d.delayedLeave, a = void 0;
          };
        } : a = void 0;
      } else a && (a = void 0);
      return i;
    };
  }
};
function ln(e) {
  let t = e[0];
  if (e.length > 1) {
    for (const r of e) if (r.type !== ne) {
      t = r;
      break;
    }
  }
  return t;
}
var ql = Ni;
function on(e, t) {
  const { leavingVNodes: r } = e;
  let s = r.get(t.type);
  return s || (s = /* @__PURE__ */ Object.create(null), r.set(t.type, s)), s;
}
function Or(e, t, r, s, n) {
  const { appear: i, mode: l, persisted: f = !1, onBeforeEnter: u, onEnter: d, onAfterEnter: a, onEnterCancelled: p, onBeforeLeave: T, onLeave: C, onAfterLeave: D, onLeaveCancelled: A, onBeforeAppear: Y, onAppear: k, onAfterAppear: R, onAppearCancelled: V } = t, E = String(e.key), q = on(r, e), oe = (M, J) => {
    M && Le(M, s, 9, J);
  }, _e = (M, J) => {
    const z = J[1];
    oe(M, J), I(M) ? M.every((be) => be.length <= 1) && z() : M.length <= 1 && z();
  }, Te = {
    mode: l,
    persisted: f,
    beforeEnter(M) {
      let J = u;
      if (!r.isMounted) if (i) J = Y || u;
      else return;
      M[me] && M[me](!0);
      const z = q[E];
      z && Xe(e, z) && z.el[me] && z.el[me](), oe(J, [M]);
    },
    enter(M) {
      if (q[E] === e) return;
      let J = d, z = a, be = p;
      if (!r.isMounted) if (i)
        J = k || d, z = R || a, be = V || p;
      else return;
      let Oe = !1;
      M[pt] = (Rt) => {
        Oe || (Oe = !0, Rt ? oe(be, [M]) : oe(z, [M]), Te.delayedLeave && Te.delayedLeave(), M[pt] = void 0);
      };
      const We = M[pt].bind(null, !1);
      J ? _e(J, [M, We]) : We();
    },
    leave(M, J) {
      const z = String(e.key);
      if (M[pt] && M[pt](!0), r.isUnmounting) return J();
      oe(T, [M]);
      let be = !1;
      M[me] = (We) => {
        be || (be = !0, J(), We ? oe(A, [M]) : oe(D, [M]), M[me] = void 0, q[z] === e && delete q[z]);
      };
      const Oe = M[me].bind(null, !1);
      q[z] = e, C ? _e(C, [M, Oe]) : Oe();
    },
    clone(M) {
      const J = Or(M, t, r, s, n);
      return n && n(J), J;
    }
  };
  return Te;
}
function _r(e) {
  if (rr(e))
    return e = Ye(e), e.children = null, e;
}
function cs(e) {
  if (!rr(e))
    return sn(e.type) && e.children ? ln(e.children) : e;
  if (e.component) return e.component.subTree;
  const { shapeFlag: t, children: r } = e;
  if (r) {
    if (t & 16) return r[0];
    if (t & 32 && F(r.default)) return r.default();
  }
}
function wt(e, t) {
  e.shapeFlag & 6 && e.component ? (e.transition = t, wt(e.component.subTree, t)) : e.shapeFlag & 128 ? (e.ssContent.transition = t.clone(e.ssContent), e.ssFallback.transition = t.clone(e.ssFallback)) : e.transition = t;
}
function fn(e, t = !1, r) {
  let s = [], n = 0;
  for (let i = 0; i < e.length; i++) {
    let l = e[i];
    const f = r == null ? l.key : String(r) + String(l.key != null ? l.key : i);
    l.type === ge ? (l.patchFlag & 128 && n++, s = s.concat(fn(l.children, t, f))) : (t || l.type !== ne) && s.push(f != null ? Ye(l, { key: f }) : l);
  }
  if (n > 1) for (let i = 0; i < s.length; i++) s[i].patchFlag = -2;
  return s;
}
// @__NO_SIDE_EFFECTS__
function Jl(e, t) {
  return F(e) ? X({ name: e.name }, t, { setup: e }) : e;
}
function un(e) {
  e.ids = [
    e.ids[0] + e.ids[2]++ + "-",
    0,
    0
  ];
}
function as(e, t) {
  let r;
  return !!((r = Object.getOwnPropertyDescriptor(e, t)) && !r.configurable);
}
var qt = /* @__PURE__ */ new WeakMap();
function yt(e, t, r, s, n = !1) {
  if (I(e)) {
    e.forEach((A, Y) => yt(A, t && (I(t) ? t[Y] : t), r, s, n));
    return;
  }
  if (ft(s) && !n) {
    s.shapeFlag & 512 && s.type.__asyncResolved && s.component.subTree.component && yt(e, t, r, s.component.subTree);
    return;
  }
  const i = s.shapeFlag & 4 ? lr(s.component) : s.el, l = n ? null : i, { i: f, r: u } = e, d = t && t.r, a = f.refs === B ? f.refs = {} : f.refs, p = f.setupState, T = /* @__PURE__ */ L(p), C = p === B ? ws : (A) => as(a, A) ? !1 : H(T, A), D = (A, Y) => !(Y && as(a, Y));
  if (d != null && d !== u) {
    if (ds(t), re(d))
      a[d] = null, C(d) && (p[d] = null);
    else if (/* @__PURE__ */ le(d)) {
      const A = t;
      D(d, A.k) && (d.value = null), A.k && (a[A.k] = null);
    }
  }
  if (F(u)) Ft(u, f, 12, [l, a]);
  else {
    const A = re(u), Y = /* @__PURE__ */ le(u);
    if (A || Y) {
      const k = () => {
        if (e.f) {
          const R = A ? C(u) ? p[u] : a[u] : D(u) || !e.k ? u.value : a[e.k];
          if (n) I(R) && Lr(R, i);
          else if (I(R)) R.includes(i) || R.push(i);
          else if (A)
            a[u] = [i], C(u) && (p[u] = a[u]);
          else {
            const V = [i];
            D(u, e.k) && (u.value = V), e.k && (a[e.k] = V);
          }
        } else A ? (a[u] = l, C(u) && (p[u] = l)) : Y && (D(u, e.k) && (u.value = l), e.k && (a[e.k] = l));
      };
      if (l) {
        const R = () => {
          k(), qt.delete(e);
        };
        R.id = -1, qt.set(e, R), de(R, r);
      } else
        ds(e), k();
    }
  }
}
function ds(e) {
  const t = qt.get(e);
  t && (t.flags |= 8, qt.delete(e));
}
var Gl = Zt().requestIdleCallback || ((e) => setTimeout(e, 1)), Yl = Zt().cancelIdleCallback || ((e) => clearTimeout(e)), ft = (e) => !!e.type.__asyncLoader, rr = (e) => e.type.__isKeepAlive;
function Vi(e, t) {
  cn(e, "a", t);
}
function Bi(e, t) {
  cn(e, "da", t);
}
function cn(e, t, r = ie) {
  const s = e.__wdc || (e.__wdc = () => {
    let n = r;
    for (; n; ) {
      if (n.isDeactivated) return;
      n = n.parent;
    }
    return e();
  });
  if (sr(t, s, r), r) {
    let n = r.parent;
    for (; n && n.parent; )
      rr(n.parent.vnode) && ki(s, t, r, n), n = n.parent;
  }
}
function ki(e, t, r, s) {
  const n = sr(t, e, s, !0);
  hn(() => {
    Lr(s[t], n);
  }, r);
}
function sr(e, t, r = ie, s = !1) {
  if (r) {
    const n = r[e] || (r[e] = []), i = t.__weh || (t.__weh = (...l) => {
      ke();
      const f = Mt(r), u = Le(t, r, e, l);
      return f(), Ue(), u;
    });
    return s ? n.unshift(i) : n.push(i), i;
  }
}
var $e = (e) => (t, r = ie) => {
  (!At || e === "sp") && sr(e, (...s) => t(...s), r);
}, Ui = $e("bm"), an = $e("m"), Ki = $e("bu"), $i = $e("u"), dn = $e("bum"), hn = $e("um"), Wi = $e("sp"), qi = $e("rtg"), Ji = $e("rtc");
function Gi(e, t = ie) {
  sr("ec", e, t);
}
var pn = "components", gn = /* @__PURE__ */ Symbol.for("v-ndc");
function zl(e) {
  return re(e) ? Yi(pn, e, !1) || e : e || gn;
}
function Yi(e, t, r = !0, s = !1) {
  const n = te || ie;
  if (n) {
    const i = n.type;
    if (e === pn) {
      const f = Dl(i, !1);
      if (f && (f === t || f === je(t) || f === Nr(je(t)))) return i;
    }
    const l = hs(n[e] || i[e], t) || hs(n.appContext[e], t);
    return !l && s ? i : l;
  }
}
function hs(e, t) {
  return e && (e[t] || e[je(t)] || e[Nr(je(t))]);
}
function Ql(e, t, r, s) {
  let n;
  const i = r && r[s], l = I(e);
  if (l || re(e)) {
    const f = l && /* @__PURE__ */ tt(e);
    let u = !1, d = !1;
    f && (u = !/* @__PURE__ */ xe(e), d = /* @__PURE__ */ Ke(e), e = er(e)), n = new Array(e.length);
    for (let a = 0, p = e.length; a < p; a++) n[a] = t(u ? d ? ct(we(e[a])) : we(e[a]) : e[a], a, void 0, i && i[a]);
  } else if (typeof e == "number") {
    n = new Array(e);
    for (let f = 0; f < e; f++) n[f] = t(f + 1, f, void 0, i && i[f]);
  } else if (N(e)) if (e[Symbol.iterator]) n = Array.from(e, (f, u) => t(f, u, void 0, i && i[u]));
  else {
    const f = Object.keys(e);
    n = new Array(f.length);
    for (let u = 0, d = f.length; u < d; u++) {
      const a = f[u];
      n[u] = t(e[a], a, u, i && i[u]);
    }
  }
  else n = [];
  return r && (r[s] = n), n;
}
function Zl(e, t, r = {}, s, n) {
  if (te.ce || te.parent && ft(te.parent) && te.parent.ce) {
    const d = Object.keys(r).length > 0;
    return t !== "default" && (r.name = t), Fr(), Mr(ge, null, [ae("slot", r, s && s())], d ? -2 : 64);
  }
  let i = e[t];
  i && i._c && (i._d = !1), Fr();
  const l = i && vn(i(r)), f = r.key || l && l.key, u = Mr(ge, { key: (f && !De(f) ? f : `_${t}`) + (!l && s ? "_fb" : "") }, l || (s ? s() : []), l && e._ === 1 ? 64 : -2);
  return !n && u.scopeId && (u.slotScopeIds = [u.scopeId + "-s"]), i && i._c && (i._d = !0), u;
}
function vn(e) {
  return e.some((t) => Et(t) ? !(t.type === ne || t.type === ge && !vn(t.children)) : !0) ? e : null;
}
var Er = (e) => e ? Hn(e) ? lr(e) : Er(e.parent) : null, mt = /* @__PURE__ */ X(/* @__PURE__ */ Object.create(null), {
  $: (e) => e,
  $el: (e) => e.vnode.el,
  $data: (e) => e.data,
  $props: (e) => e.props,
  $attrs: (e) => e.attrs,
  $slots: (e) => e.slots,
  $refs: (e) => e.refs,
  $parent: (e) => Er(e.parent),
  $root: (e) => Er(e.root),
  $host: (e) => e.ce,
  $emit: (e) => e.emit,
  $options: (e) => zr(e),
  $forceUpdate: (e) => e.f || (e.f = () => {
    Yr(e.update);
  }),
  $nextTick: (e) => e.n || (e.n = Ei.bind(e.proxy)),
  $watch: (e) => Di.bind(e)
}), br = (e, t) => e !== B && !e.__isScriptSetup && H(e, t), zi = {
  get({ _: e }, t) {
    if (t === "__v_skip") return !0;
    const { ctx: r, setupState: s, data: n, props: i, accessCache: l, type: f, appContext: u } = e;
    if (t[0] !== "$") {
      const T = l[t];
      if (T !== void 0) switch (T) {
        case 1:
          return s[t];
        case 2:
          return n[t];
        case 4:
          return r[t];
        case 3:
          return i[t];
      }
      else {
        if (br(s, t))
          return l[t] = 1, s[t];
        if (n !== B && H(n, t))
          return l[t] = 2, n[t];
        if (H(i, t))
          return l[t] = 3, i[t];
        if (r !== B && H(r, t))
          return l[t] = 4, r[t];
        Ar && (l[t] = 0);
      }
    }
    const d = mt[t];
    let a, p;
    if (d)
      return t === "$attrs" && se(e.attrs, "get", ""), d(e);
    if ((a = f.__cssModules) && (a = a[t])) return a;
    if (r !== B && H(r, t))
      return l[t] = 4, r[t];
    if (p = u.config.globalProperties, H(p, t)) return p[t];
  },
  set({ _: e }, t, r) {
    const { data: s, setupState: n, ctx: i } = e;
    return br(n, t) ? (n[t] = r, !0) : s !== B && H(s, t) ? (s[t] = r, !0) : H(e.props, t) || t[0] === "$" && t.slice(1) in e ? !1 : (i[t] = r, !0);
  },
  has({ _: { data: e, setupState: t, accessCache: r, ctx: s, appContext: n, props: i, type: l } }, f) {
    let u;
    return !!(r[f] || e !== B && f[0] !== "$" && H(e, f) || br(t, f) || H(i, f) || H(s, f) || H(mt, f) || H(n.config.globalProperties, f) || (u = l.__cssModules) && u[f]);
  },
  defineProperty(e, t, r) {
    return r.get != null ? e._.accessCache[t] = 0 : H(r, "value") && this.set(e, t, r.value, null), Reflect.defineProperty(e, t, r);
  }
};
function ps(e) {
  return I(e) ? e.reduce((t, r) => (t[r] = null, t), {}) : e;
}
var Ar = !0;
function Qi(e) {
  const t = zr(e), r = e.proxy, s = e.ctx;
  Ar = !1, t.beforeCreate && gs(t.beforeCreate, e, "bc");
  const { data: n, computed: i, methods: l, watch: f, provide: u, inject: d, created: a, beforeMount: p, mounted: T, beforeUpdate: C, updated: D, activated: A, deactivated: Y, beforeDestroy: k, beforeUnmount: R, destroyed: V, unmounted: E, render: q, renderTracked: oe, renderTriggered: _e, errorCaptured: Te, serverPrefetch: M, expose: J, inheritAttrs: z, components: be, directives: Oe, filters: We } = t;
  if (d && Zi(d, s, null), l) for (const G in l) {
    const U = l[G];
    F(U) && (s[G] = U.bind(r));
  }
  if (n) {
    const G = n.call(r, r);
    N(G) && (e.data = /* @__PURE__ */ qr(G));
  }
  if (Ar = !0, i) for (const G in i) {
    const U = i[G], qe = Ll({
      get: F(U) ? U.bind(r, r) : F(U.get) ? U.get.bind(r, r) : Re,
      set: !F(U) && F(U.set) ? U.set.bind(r) : Re
    });
    Object.defineProperty(s, G, {
      enumerable: !0,
      configurable: !0,
      get: () => qe.value,
      set: (Dt) => qe.value = Dt
    });
  }
  if (f) for (const G in f) _n(f[G], s, r, G);
  if (u) {
    const G = F(u) ? u.call(r) : u;
    Reflect.ownKeys(G).forEach((U) => {
      Fi(U, G[U]);
    });
  }
  a && gs(a, e, "c");
  function fe(G, U) {
    I(U) ? U.forEach((qe) => G(qe.bind(r))) : U && G(U.bind(r));
  }
  if (fe(Ui, p), fe(an, T), fe(Ki, C), fe($i, D), fe(Vi, A), fe(Bi, Y), fe(Gi, Te), fe(Ji, oe), fe(qi, _e), fe(dn, R), fe(hn, E), fe(Wi, M), I(J))
    if (J.length) {
      const G = e.exposed || (e.exposed = {});
      J.forEach((U) => {
        Object.defineProperty(G, U, {
          get: () => r[U],
          set: (qe) => r[U] = qe,
          enumerable: !0
        });
      });
    } else e.exposed || (e.exposed = {});
  q && e.render === Re && (e.render = q), z != null && (e.inheritAttrs = z), be && (e.components = be), Oe && (e.directives = Oe), M && un(e);
}
function Zi(e, t, r = Re) {
  I(e) && (e = Pr(e));
  for (const s in e) {
    const n = e[s];
    let i;
    N(n) ? "default" in n ? i = Bt(n.from || s, n.default, !0) : i = Bt(n.from || s) : i = Bt(n), /* @__PURE__ */ le(i) ? Object.defineProperty(t, s, {
      enumerable: !0,
      configurable: !0,
      get: () => i.value,
      set: (l) => i.value = l
    }) : t[s] = i;
  }
}
function gs(e, t, r) {
  Le(I(e) ? e.map((s) => s.bind(t.proxy)) : e.bind(t.proxy), t, r);
}
function _n(e, t, r, s) {
  let n = s.includes(".") ? rn(r, s) : () => r[s];
  if (re(e)) {
    const i = t[e];
    F(i) && vr(n, i);
  } else if (F(e)) vr(n, e.bind(r));
  else if (N(e)) if (I(e)) e.forEach((i) => _n(i, t, r, s));
  else {
    const i = F(e.handler) ? e.handler.bind(r) : t[e.handler];
    F(i) && vr(n, i, e);
  }
}
function zr(e) {
  const t = e.type, { mixins: r, extends: s } = t, { mixins: n, optionsCache: i, config: { optionMergeStrategies: l } } = e.appContext, f = i.get(t);
  let u;
  return f ? u = f : !n.length && !r && !s ? u = t : (u = {}, n.length && n.forEach((d) => Jt(u, d, l, !0)), Jt(u, t, l)), N(t) && i.set(t, u), u;
}
function Jt(e, t, r, s = !1) {
  const { mixins: n, extends: i } = t;
  i && Jt(e, i, r, !0), n && n.forEach((l) => Jt(e, l, r, !0));
  for (const l in t) if (!(s && l === "expose")) {
    const f = Xi[l] || r && r[l];
    e[l] = f ? f(e[l], t[l]) : t[l];
  }
  return e;
}
var Xi = {
  data: vs,
  props: _s,
  emits: _s,
  methods: gt,
  computed: gt,
  beforeCreate: ue,
  created: ue,
  beforeMount: ue,
  mounted: ue,
  beforeUpdate: ue,
  updated: ue,
  beforeDestroy: ue,
  beforeUnmount: ue,
  destroyed: ue,
  unmounted: ue,
  activated: ue,
  deactivated: ue,
  errorCaptured: ue,
  serverPrefetch: ue,
  components: gt,
  directives: gt,
  watch: tl,
  provide: vs,
  inject: el
};
function vs(e, t) {
  return t ? e ? function() {
    return X(F(e) ? e.call(this, this) : e, F(t) ? t.call(this, this) : t);
  } : t : e;
}
function el(e, t) {
  return gt(Pr(e), Pr(t));
}
function Pr(e) {
  if (I(e)) {
    const t = {};
    for (let r = 0; r < e.length; r++) t[e[r]] = e[r];
    return t;
  }
  return e;
}
function ue(e, t) {
  return e ? [...new Set([].concat(e, t))] : t;
}
function gt(e, t) {
  return e ? X(/* @__PURE__ */ Object.create(null), e, t) : t;
}
function _s(e, t) {
  return e ? I(e) && I(t) ? [.../* @__PURE__ */ new Set([...e, ...t])] : X(/* @__PURE__ */ Object.create(null), ps(e), ps(t ?? {})) : t;
}
function tl(e, t) {
  if (!e) return t;
  if (!t) return e;
  const r = X(/* @__PURE__ */ Object.create(null), e);
  for (const s in t) r[s] = ue(e[s], t[s]);
  return r;
}
function bn() {
  return {
    app: null,
    config: {
      isNativeTag: ws,
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
var rl = 0;
function sl(e, t) {
  return function(s, n = null) {
    F(s) || (s = X({}, s)), n != null && !N(n) && (n = null);
    const i = bn(), l = /* @__PURE__ */ new WeakSet(), f = [];
    let u = !1;
    const d = i.app = {
      _uid: rl++,
      _component: s,
      _props: n,
      _container: null,
      _context: i,
      _instance: null,
      version: Hl,
      get config() {
        return i.config;
      },
      set config(a) {
      },
      use(a, ...p) {
        return l.has(a) || (a && F(a.install) ? (l.add(a), a.install(d, ...p)) : F(a) && (l.add(a), a(d, ...p))), d;
      },
      mixin(a) {
        return i.mixins.includes(a) || i.mixins.push(a), d;
      },
      component(a, p) {
        return p ? (i.components[a] = p, d) : i.components[a];
      },
      directive(a, p) {
        return p ? (i.directives[a] = p, d) : i.directives[a];
      },
      mount(a, p, T) {
        if (!u) {
          const C = d._ceVNode || ae(s, n);
          return C.appContext = i, T === !0 ? T = "svg" : T === !1 && (T = void 0), p && t ? t(C, a) : e(C, a, T), u = !0, d._container = a, a.__vue_app__ = d, lr(C.component);
        }
      },
      onUnmount(a) {
        f.push(a);
      },
      unmount() {
        u && (Le(f, d._instance, 16), e(null, d._container), delete d._container.__vue_app__);
      },
      provide(a, p) {
        return i.provides[a] = p, d;
      },
      runWithContext(a) {
        const p = ut;
        ut = d;
        try {
          return a();
        } finally {
          ut = p;
        }
      }
    };
    return d;
  };
}
var ut = null, nl = (e, t) => t === "modelValue" || t === "model-value" ? e.modelModifiers : e[`${t}Modifiers`] || e[`${je(t)}Modifiers`] || e[`${It(t)}Modifiers`];
function il(e, t, ...r) {
  if (e.isUnmounted) return;
  const s = e.vnode.props || B;
  let n = r;
  const i = t.startsWith("update:"), l = i && nl(s, t.slice(7));
  l && (l.trim && (n = r.map((a) => re(a) ? a.trim() : a)), l.number && (n = r.map(Wn)));
  let f, u = s[f = cr(t)] || s[f = cr(je(t))];
  !u && i && (u = s[f = cr(It(t))]), u && Le(u, e, 6, n);
  const d = s[f + "Once"];
  if (d) {
    if (!e.emitted) e.emitted = {};
    else if (e.emitted[f]) return;
    e.emitted[f] = !0, Le(d, e, 6, n);
  }
}
var ll = /* @__PURE__ */ new WeakMap();
function yn(e, t, r = !1) {
  const s = r ? ll : t.emitsCache, n = s.get(e);
  if (n !== void 0) return n;
  const i = e.emits;
  let l = {}, f = !1;
  if (!F(e)) {
    const u = (d) => {
      const a = yn(d, t, !0);
      a && (f = !0, X(l, a));
    };
    !r && t.mixins.length && t.mixins.forEach(u), e.extends && u(e.extends), e.mixins && e.mixins.forEach(u);
  }
  return !i && !f ? (N(e) && s.set(e, null), null) : (I(i) ? i.forEach((u) => l[u] = null) : X(l, i), N(e) && s.set(e, l), l);
}
function nr(e, t) {
  return !e || !Dr(t) ? !1 : (t = t.slice(2).replace(/Once$/, ""), H(e, t[0].toLowerCase() + t.slice(1)) || H(e, It(t)) || H(e, t));
}
function yr(e) {
  const { type: t, vnode: r, proxy: s, withProxy: n, propsOptions: [i], slots: l, attrs: f, emit: u, render: d, renderCache: a, props: p, data: T, setupState: C, ctx: D, inheritAttrs: A } = e, Y = Wt(e);
  let k, R;
  try {
    if (r.shapeFlag & 4) {
      const E = n || s, q = E;
      k = Fe(d.call(q, E, a, p, C, T, D)), R = f;
    } else {
      const E = t;
      k = Fe(E.length > 1 ? E(p, {
        attrs: f,
        slots: l,
        emit: u
      }) : E(p, null)), R = t.props ? f : ol(f);
    }
  } catch (E) {
    xt.length = 0, tr(E, e, 1), k = ae(ne);
  }
  let V = k;
  if (R && A !== !1) {
    const E = Object.keys(R), { shapeFlag: q } = V;
    E.length && q & 7 && (i && E.some(jr) && (R = fl(R, i)), V = Ye(V, R, !1, !0));
  }
  return r.dirs && (V = Ye(V, null, !1, !0), V.dirs = V.dirs ? V.dirs.concat(r.dirs) : r.dirs), r.transition && wt(V, r.transition), k = V, Wt(Y), k;
}
var ol = (e) => {
  let t;
  for (const r in e) (r === "class" || r === "style" || Dr(r)) && ((t || (t = {}))[r] = e[r]);
  return t;
}, fl = (e, t) => {
  const r = {};
  for (const s in e) (!jr(s) || !(s.slice(9) in t)) && (r[s] = e[s]);
  return r;
};
function ul(e, t, r) {
  const { props: s, children: n, component: i } = e, { props: l, children: f, patchFlag: u } = t, d = i.emitsOptions;
  if (t.dirs || t.transition) return !0;
  if (r && u >= 0) {
    if (u & 1024) return !0;
    if (u & 16)
      return s ? bs(s, l, d) : !!l;
    if (u & 8) {
      const a = t.dynamicProps;
      for (let p = 0; p < a.length; p++) {
        const T = a[p];
        if (mn(l, s, T) && !nr(d, T)) return !0;
      }
    }
  } else
    return (n || f) && (!f || !f.$stable) ? !0 : s === l ? !1 : s ? l ? bs(s, l, d) : !0 : !!l;
  return !1;
}
function bs(e, t, r) {
  const s = Object.keys(t);
  if (s.length !== Object.keys(e).length) return !0;
  for (let n = 0; n < s.length; n++) {
    const i = s[n];
    if (mn(t, e, i) && !nr(r, i)) return !0;
  }
  return !1;
}
function mn(e, t, r) {
  const s = e[r], n = t[r];
  return r === "style" && N(s) && N(n) ? !Xt(s, n) : s !== n;
}
function cl({ vnode: e, parent: t, suspense: r }, s) {
  for (; t; ) {
    const n = t.subTree;
    if (n.suspense && n.suspense.activeBranch === e && (n.suspense.vnode.el = n.el = s, e = n), n === e)
      (e = t.vnode).el = s, t = t.parent;
    else break;
  }
  r && r.activeBranch === e && (r.vnode.el = s);
}
var xn = {}, Tn = () => Object.create(xn), Sn = (e) => Object.getPrototypeOf(e) === xn;
function al(e, t, r, s = !1) {
  const n = {}, i = Tn();
  e.propsDefaults = /* @__PURE__ */ Object.create(null), Cn(e, t, n, i);
  for (const l in e.propsOptions[0]) l in n || (n[l] = void 0);
  r ? e.props = s ? n : /* @__PURE__ */ _i(n) : e.type.props ? e.props = n : e.props = i, e.attrs = i;
}
function dl(e, t, r, s) {
  const { props: n, attrs: i, vnode: { patchFlag: l } } = e, f = /* @__PURE__ */ L(n), [u] = e.propsOptions;
  let d = !1;
  if ((s || l > 0) && !(l & 16)) {
    if (l & 8) {
      const a = e.vnode.dynamicProps;
      for (let p = 0; p < a.length; p++) {
        let T = a[p];
        if (nr(e.emitsOptions, T)) continue;
        const C = t[T];
        if (u) if (H(i, T))
          C !== i[T] && (i[T] = C, d = !0);
        else {
          const D = je(T);
          n[D] = Ir(u, f, D, C, e, !1);
        }
        else C !== i[T] && (i[T] = C, d = !0);
      }
    }
  } else {
    Cn(e, t, n, i) && (d = !0);
    let a;
    for (const p in f) (!t || !H(t, p) && ((a = It(p)) === p || !H(t, a))) && (u ? r && (r[p] !== void 0 || r[a] !== void 0) && (n[p] = Ir(u, f, p, void 0, e, !0)) : delete n[p]);
    if (i !== f)
      for (const p in i) (!t || !H(t, p)) && (delete i[p], d = !0);
  }
  d && Ve(e.attrs, "set", "");
}
function Cn(e, t, r, s) {
  const [n, i] = e.propsOptions;
  let l = !1, f;
  if (t) for (let u in t) {
    if (vt(u)) continue;
    const d = t[u];
    let a;
    n && H(n, a = je(u)) ? !i || !i.includes(a) ? r[a] = d : (f || (f = {}))[a] = d : nr(e.emitsOptions, u) || (!(u in s) || d !== s[u]) && (s[u] = d, l = !0);
  }
  if (i) {
    const u = /* @__PURE__ */ L(r), d = f || B;
    for (let a = 0; a < i.length; a++) {
      const p = i[a];
      r[p] = Ir(n, u, p, d[p], e, !H(d, p));
    }
  }
  return l;
}
function Ir(e, t, r, s, n, i) {
  const l = e[r];
  if (l != null) {
    const f = H(l, "default");
    if (f && s === void 0) {
      const u = l.default;
      if (l.type !== Function && !l.skipFactory && F(u)) {
        const { propsDefaults: d } = n;
        if (r in d) s = d[r];
        else {
          const a = Mt(n);
          s = d[r] = u.call(null, t), a();
        }
      } else s = u;
      n.ce && n.ce._setProp(r, s);
    }
    l[0] && (i && !f ? s = !1 : l[1] && (s === "" || s === It(r)) && (s = !0));
  }
  return s;
}
var hl = /* @__PURE__ */ new WeakMap();
function wn(e, t, r = !1) {
  const s = r ? hl : t.propsCache, n = s.get(e);
  if (n) return n;
  const i = e.props, l = {}, f = [];
  let u = !1;
  if (!F(e)) {
    const a = (p) => {
      u = !0;
      const [T, C] = wn(p, t, !0);
      X(l, T), C && f.push(...C);
    };
    !r && t.mixins.length && t.mixins.forEach(a), e.extends && a(e.extends), e.mixins && e.mixins.forEach(a);
  }
  if (!i && !u)
    return N(e) && s.set(e, it), it;
  if (I(i)) for (let a = 0; a < i.length; a++) {
    const p = je(i[a]);
    ys(p) && (l[p] = B);
  }
  else if (i) for (const a in i) {
    const p = je(a);
    if (ys(p)) {
      const T = i[a], C = l[p] = I(T) || F(T) ? { type: T } : X({}, T), D = C.type;
      let A = !1, Y = !0;
      if (I(D)) for (let k = 0; k < D.length; ++k) {
        const R = D[k], V = F(R) && R.name;
        if (V === "Boolean") {
          A = !0;
          break;
        } else V === "String" && (Y = !1);
      }
      else A = F(D) && D.name === "Boolean";
      C[0] = A, C[1] = Y, (A || H(C, "default")) && f.push(p);
    }
  }
  const d = [l, f];
  return N(e) && s.set(e, d), d;
}
function ys(e) {
  return e[0] !== "$" && !vt(e);
}
var Qr = (e) => e === "_" || e === "_ctx" || e === "$stable", Zr = (e) => I(e) ? e.map(Fe) : [Fe(e)], pl = (e, t, r) => {
  if (t._n) return t;
  const s = Ii((...n) => Zr(t(...n)), r);
  return s._c = !1, s;
}, On = (e, t, r) => {
  const s = e._ctx;
  for (const n in e) {
    if (Qr(n)) continue;
    const i = e[n];
    if (F(i)) t[n] = pl(n, i, s);
    else if (i != null) {
      const l = Zr(i);
      t[n] = () => l;
    }
  }
}, En = (e, t) => {
  const r = Zr(t);
  e.slots.default = () => r;
}, An = (e, t, r) => {
  for (const s in t) (r || !Qr(s)) && (e[s] = t[s]);
}, gl = (e, t, r) => {
  const s = e.slots = Tn();
  if (e.vnode.shapeFlag & 32) {
    const n = t._;
    n ? (An(s, t, r), r && Is(s, "_", n, !0)) : On(t, s);
  } else t && En(e, t);
}, vl = (e, t, r) => {
  const { vnode: s, slots: n } = e;
  let i = !0, l = B;
  if (s.shapeFlag & 32) {
    const f = t._;
    f ? r && f === 1 ? i = !1 : An(n, t, r) : (i = !t.$stable, On(t, n)), l = t;
  } else t && (En(e, t), l = { default: 1 });
  if (i)
    for (const f in n) !Qr(f) && l[f] == null && delete n[f];
}, de = ml;
function Xl(e) {
  return _l(e);
}
function _l(e, t) {
  const r = Zt();
  r.__VUE__ = !0;
  const { insert: s, remove: n, patchProp: i, createElement: l, createText: f, createComment: u, setText: d, setElementText: a, parentNode: p, nextSibling: T, setScopeId: C = Re, insertStaticContent: D } = e, A = (o, c, h, b = null, v = null, g = null, x = void 0, m = null, y = !!c.dynamicChildren) => {
    if (o === c) return;
    o && !Xe(o, c) && (b = Lt(o), Je(o, v, g, !0), o = null), c.patchFlag === -2 && (y = !1, c.dynamicChildren = null);
    const { type: _, ref: O, shapeFlag: S } = c;
    switch (_) {
      case ir:
        Y(o, c, h, b);
        break;
      case ne:
        k(o, c, h, b);
        break;
      case kt:
        o == null && R(c, h, b, x);
        break;
      case ge:
        be(o, c, h, b, v, g, x, m, y);
        break;
      default:
        S & 1 ? q(o, c, h, b, v, g, x, m, y) : S & 6 ? Oe(o, c, h, b, v, g, x, m, y) : (S & 64 || S & 128) && _.process(o, c, h, b, v, g, x, m, y, rt);
    }
    O != null && v ? yt(O, o && o.ref, g, c || o, !c) : O == null && o && o.ref != null && yt(o.ref, null, g, o, !0);
  }, Y = (o, c, h, b) => {
    if (o == null) s(c.el = f(c.children), h, b);
    else {
      const v = c.el = o.el;
      c.children !== o.children && d(v, c.children);
    }
  }, k = (o, c, h, b) => {
    o == null ? s(c.el = u(c.children || ""), h, b) : c.el = o.el;
  }, R = (o, c, h, b) => {
    [o.el, o.anchor] = D(o.children, c, h, b, o.el, o.anchor);
  }, V = ({ el: o, anchor: c }, h, b) => {
    let v;
    for (; o && o !== c; )
      v = T(o), s(o, h, b), o = v;
    s(c, h, b);
  }, E = ({ el: o, anchor: c }) => {
    let h;
    for (; o && o !== c; )
      h = T(o), n(o), o = h;
    n(c);
  }, q = (o, c, h, b, v, g, x, m, y) => {
    if (c.type === "svg" ? x = "svg" : c.type === "math" && (x = "mathml"), o == null) oe(c, h, b, v, g, x, m, y);
    else {
      const _ = o.el && o.el._isVueCE ? o.el : null;
      try {
        _ && _._beginPatch(), M(o, c, v, g, x, m, y);
      } finally {
        _ && _._endPatch();
      }
    }
  }, oe = (o, c, h, b, v, g, x, m) => {
    let y, _;
    const { props: O, shapeFlag: S, transition: w, dirs: P } = o;
    if (y = o.el = l(o.type, g, O && O.is, O), S & 8 ? a(y, o.children) : S & 16 && Te(o.children, y, null, b, v, mr(o, g), x, m), P && ze(o, null, b, "created"), _e(y, o, o.scopeId, x, b), O) {
      for (const K in O) K !== "value" && !vt(K) && i(y, K, null, O[K], g, b);
      "value" in O && i(y, "value", null, O.value, g), (_ = O.onVnodeBeforeMount) && Ae(_, b, o);
    }
    P && ze(o, null, b, "beforeMount");
    const j = bl(v, w);
    j && w.beforeEnter(y), s(y, c, h), ((_ = O && O.onVnodeMounted) || j || P) && de(() => {
      _ && Ae(_, b, o), j && w.enter(y), P && ze(o, null, b, "mounted");
    }, v);
  }, _e = (o, c, h, b, v) => {
    if (h && C(o, h), b) for (let g = 0; g < b.length; g++) C(o, b[g]);
    if (v) {
      let g = v.subTree;
      if (c === g || Mn(g.type) && (g.ssContent === c || g.ssFallback === c)) {
        const x = v.vnode;
        _e(o, x, x.scopeId, x.slotScopeIds, v.parent);
      }
    }
  }, Te = (o, c, h, b, v, g, x, m, y = 0) => {
    for (let _ = y; _ < o.length; _++) A(null, o[_] = m ? Ne(o[_]) : Fe(o[_]), c, h, b, v, g, x, m);
  }, M = (o, c, h, b, v, g, x) => {
    const m = c.el = o.el;
    let { patchFlag: y, dynamicChildren: _, dirs: O } = c;
    y |= o.patchFlag & 16;
    const S = o.props || B, w = c.props || B;
    let P;
    if (h && Qe(h, !1), (P = w.onVnodeBeforeUpdate) && Ae(P, h, c, o), O && ze(c, o, h, "beforeUpdate"), h && Qe(h, !0), (S.innerHTML && w.innerHTML == null || S.textContent && w.textContent == null) && a(m, ""), _ ? J(o.dynamicChildren, _, m, h, b, mr(c, v), g) : x || U(o, c, m, null, h, b, mr(c, v), g, !1), y > 0) {
      if (y & 16) z(m, S, w, h, v);
      else if (y & 2 && S.class !== w.class && i(m, "class", null, w.class, v), y & 4 && i(m, "style", S.style, w.style, v), y & 8) {
        const j = c.dynamicProps;
        for (let K = 0; K < j.length; K++) {
          const $ = j[K], Q = S[$], Z = w[$];
          (Z !== Q || $ === "value") && i(m, $, Q, Z, v, h);
        }
      }
      y & 1 && o.children !== c.children && a(m, c.children);
    } else !x && _ == null && z(m, S, w, h, v);
    ((P = w.onVnodeUpdated) || O) && de(() => {
      P && Ae(P, h, c, o), O && ze(c, o, h, "updated");
    }, b);
  }, J = (o, c, h, b, v, g, x) => {
    for (let m = 0; m < c.length; m++) {
      const y = o[m], _ = c[m];
      A(y, _, y.el && (y.type === ge || !Xe(y, _) || y.shapeFlag & 198) ? p(y.el) : h, null, b, v, g, x, !0);
    }
  }, z = (o, c, h, b, v) => {
    if (c !== h) {
      if (c !== B)
        for (const g in c) !vt(g) && !(g in h) && i(o, g, c[g], null, v, b);
      for (const g in h) {
        if (vt(g)) continue;
        const x = h[g], m = c[g];
        x !== m && g !== "value" && i(o, g, m, x, v, b);
      }
      "value" in h && i(o, "value", c.value, h.value, v);
    }
  }, be = (o, c, h, b, v, g, x, m, y) => {
    const _ = c.el = o ? o.el : f(""), O = c.anchor = o ? o.anchor : f("");
    let { patchFlag: S, dynamicChildren: w, slotScopeIds: P } = c;
    P && (m = m ? m.concat(P) : P), o == null ? (s(_, h, b), s(O, h, b), Te(c.children || [], h, O, v, g, x, m, y)) : S > 0 && S & 64 && w && o.dynamicChildren && o.dynamicChildren.length === w.length ? (J(o.dynamicChildren, w, h, v, g, x, m), (c.key != null || v && c === v.subTree) && Pn(o, c, !0)) : U(o, c, h, O, v, g, x, m, y);
  }, Oe = (o, c, h, b, v, g, x, m, y) => {
    c.slotScopeIds = m, o == null ? c.shapeFlag & 512 ? v.ctx.activate(c, h, b, x, y) : We(c, h, b, v, g, x, y) : Rt(o, c, y);
  }, We = (o, c, h, b, v, g, x) => {
    const m = o.component = Pl(o, b, v);
    if (rr(o) && (m.ctx.renderer = rt), Il(m, !1, x), m.asyncDep) {
      if (v && v.registerDep(m, fe, x), !o.el) {
        const y = m.subTree = ae(ne);
        k(null, y, c, h), o.placeholder = y.el;
      }
    } else fe(m, o, c, h, v, g, x);
  }, Rt = (o, c, h) => {
    const b = c.component = o.component;
    if (ul(o, c, h)) if (b.asyncDep && !b.asyncResolved) {
      G(b, c, h);
      return;
    } else
      b.next = c, b.update();
    else
      c.el = o.el, b.vnode = c;
  }, fe = (o, c, h, b, v, g, x) => {
    const m = () => {
      if (o.isMounted) {
        let { next: S, bu: w, u: P, parent: j, vnode: K } = o;
        {
          const he = In(o);
          if (he) {
            S && (S.el = K.el, G(o, S, x)), he.asyncDep.then(() => {
              de(() => {
                o.isUnmounted || _();
              }, v);
            });
            return;
          }
        }
        let $ = S, Q;
        Qe(o, !1), S ? (S.el = K.el, G(o, S, x)) : S = K, w && ar(w), (Q = S.props && S.props.onVnodeBeforeUpdate) && Ae(Q, j, S, K), Qe(o, !0);
        const Z = yr(o), Se = o.subTree;
        o.subTree = Z, A(Se, Z, p(Se.el), Lt(Se), o, v, g), S.el = Z.el, $ === null && cl(o, Z.el), P && de(P, v), (Q = S.props && S.props.onVnodeUpdated) && de(() => Ae(Q, j, S, K), v);
      } else {
        let S;
        const { el: w, props: P } = c, { bm: j, m: K, parent: $, root: Q, type: Z } = o, Se = ft(c);
        if (Qe(o, !1), j && ar(j), !Se && (S = P && P.onVnodeBeforeMount) && Ae(S, $, c), Qe(o, !0), w && ur) {
          const he = () => {
            o.subTree = yr(o), ur(w, o.subTree, o, v, null);
          };
          Se && Z.__asyncHydrate ? Z.__asyncHydrate(w, o, he) : he();
        } else {
          Q.ce && Q.ce._hasShadowRoot() && Q.ce._injectChildStyle(Z, o.parent ? o.parent.type : void 0);
          const he = o.subTree = yr(o);
          A(null, he, h, b, o, v, g), c.el = he.el;
        }
        if (K && de(K, v), !Se && (S = P && P.onVnodeMounted)) {
          const he = c;
          de(() => Ae(S, $, he), v);
        }
        (c.shapeFlag & 256 || $ && ft($.vnode) && $.vnode.shapeFlag & 256) && o.a && de(o.a, v), o.isMounted = !0, c = h = b = null;
      }
    };
    o.scope.on();
    const y = o.effect = new Ds(m);
    o.scope.off();
    const _ = o.update = y.run.bind(y), O = o.job = y.runIfDirty.bind(y);
    O.i = o, O.id = o.uid, y.scheduler = () => Yr(O), Qe(o, !0), _();
  }, G = (o, c, h) => {
    c.component = o;
    const b = o.vnode.props;
    o.vnode = c, o.next = null, dl(o, c.props, b, h), vl(o, c.children, h), ke(), us(o), Ue();
  }, U = (o, c, h, b, v, g, x, m, y = !1) => {
    const _ = o && o.children, O = o ? o.shapeFlag : 0, S = c.children, { patchFlag: w, shapeFlag: P } = c;
    if (w > 0) {
      if (w & 128) {
        Dt(_, S, h, b, v, g, x, m, y);
        return;
      } else if (w & 256) {
        qe(_, S, h, b, v, g, x, m, y);
        return;
      }
    }
    P & 8 ? (O & 16 && at(_, v, g), S !== _ && a(h, S)) : O & 16 ? P & 16 ? Dt(_, S, h, b, v, g, x, m, y) : at(_, v, g, !0) : (O & 8 && a(h, ""), P & 16 && Te(S, h, b, v, g, x, m, y));
  }, qe = (o, c, h, b, v, g, x, m, y) => {
    o = o || it, c = c || it;
    const _ = o.length, O = c.length, S = Math.min(_, O);
    let w;
    for (w = 0; w < S; w++) {
      const P = c[w] = y ? Ne(c[w]) : Fe(c[w]);
      A(o[w], P, h, null, v, g, x, m, y);
    }
    _ > O ? at(o, v, g, !0, !1, S) : Te(c, h, b, v, g, x, m, y, S);
  }, Dt = (o, c, h, b, v, g, x, m, y) => {
    let _ = 0;
    const O = c.length;
    let S = o.length - 1, w = O - 1;
    for (; _ <= S && _ <= w; ) {
      const P = o[_], j = c[_] = y ? Ne(c[_]) : Fe(c[_]);
      if (Xe(P, j)) A(P, j, h, null, v, g, x, m, y);
      else break;
      _++;
    }
    for (; _ <= S && _ <= w; ) {
      const P = o[S], j = c[w] = y ? Ne(c[w]) : Fe(c[w]);
      if (Xe(P, j)) A(P, j, h, null, v, g, x, m, y);
      else break;
      S--, w--;
    }
    if (_ > S) {
      if (_ <= w) {
        const P = w + 1, j = P < O ? c[P].el : b;
        for (; _ <= w; )
          A(null, c[_] = y ? Ne(c[_]) : Fe(c[_]), h, j, v, g, x, m, y), _++;
      }
    } else if (_ > w) for (; _ <= S; )
      Je(o[_], v, g, !0), _++;
    else {
      const P = _, j = _, K = /* @__PURE__ */ new Map();
      for (_ = j; _ <= w; _++) {
        const pe = c[_] = y ? Ne(c[_]) : Fe(c[_]);
        pe.key != null && K.set(pe.key, _);
      }
      let $, Q = 0;
      const Z = w - j + 1;
      let Se = !1, he = 0;
      const dt = new Array(Z);
      for (_ = 0; _ < Z; _++) dt[_] = 0;
      for (_ = P; _ <= S; _++) {
        const pe = o[_];
        if (Q >= Z) {
          Je(pe, v, g, !0);
          continue;
        }
        let Ee;
        if (pe.key != null) Ee = K.get(pe.key);
        else for ($ = j; $ <= w; $++) if (dt[$ - j] === 0 && Xe(pe, c[$])) {
          Ee = $;
          break;
        }
        Ee === void 0 ? Je(pe, v, g, !0) : (dt[Ee - j] = _ + 1, Ee >= he ? he = Ee : Se = !0, A(pe, c[Ee], h, null, v, g, x, m, y), Q++);
      }
      const rs = Se ? yl(dt) : it;
      for ($ = rs.length - 1, _ = Z - 1; _ >= 0; _--) {
        const pe = j + _, Ee = c[pe], ss = c[pe + 1], ns = pe + 1 < O ? ss.el || Fn(ss) : b;
        dt[_] === 0 ? A(null, Ee, h, ns, v, g, x, m, y) : Se && ($ < 0 || _ !== rs[$] ? jt(Ee, h, ns, 2) : $--);
      }
    }
  }, jt = (o, c, h, b, v = null) => {
    const { el: g, type: x, transition: m, children: y, shapeFlag: _ } = o;
    if (_ & 6) {
      jt(o.component.subTree, c, h, b);
      return;
    }
    if (_ & 128) {
      o.suspense.move(c, h, b);
      return;
    }
    if (_ & 64) {
      x.move(o, c, h, rt);
      return;
    }
    if (x === ge) {
      s(g, c, h);
      for (let O = 0; O < y.length; O++) jt(y[O], c, h, b);
      s(o.anchor, c, h);
      return;
    }
    if (x === kt) {
      V(o, c, h);
      return;
    }
    if (b !== 2 && _ & 1 && m) if (b === 0) m.persisted && !g[me] ? s(g, c, h) : (m.beforeEnter(g), s(g, c, h), de(() => m.enter(g), v));
    else {
      const { leave: O, delayLeave: S, afterLeave: w } = m, P = () => {
        o.ctx.isUnmounted ? n(g) : s(g, c, h);
      }, j = () => {
        const K = g._isLeaving || !!g[me];
        g._isLeaving && g[me](!0), m.persisted && !K ? P() : O(g, () => {
          P(), w && w();
        });
      };
      S ? S(g, P, j) : j();
    }
    else s(g, c, h);
  }, Je = (o, c, h, b = !1, v = !1) => {
    const { type: g, props: x, ref: m, children: y, dynamicChildren: _, shapeFlag: O, patchFlag: S, dirs: w, cacheIndex: P, memo: j } = o;
    if (S === -2 && (v = !1), m != null && (ke(), yt(m, null, h, o, !0), Ue()), P != null && (c.renderCache[P] = void 0), O & 256) {
      c.ctx.deactivate(o);
      return;
    }
    const K = O & 1 && w, $ = !ft(o);
    let Q;
    if ($ && (Q = x && x.onVnodeBeforeUnmount) && Ae(Q, c, o), O & 6) Bn(o.component, h, b);
    else {
      if (O & 128) {
        o.suspense.unmount(h, b);
        return;
      }
      K && ze(o, null, c, "beforeUnmount"), O & 64 ? o.type.remove(o, c, h, rt, b) : _ && !_.hasOnce && (g !== ge || S > 0 && S & 64) ? at(_, c, h, !1, !0) : (g === ge && S & 384 || !v && O & 16) && at(y, c, h), b && es(o);
    }
    const Z = j != null && P == null;
    ($ && (Q = x && x.onVnodeUnmounted) || K || Z) && de(() => {
      Q && Ae(Q, c, o), K && ze(o, null, c, "unmounted"), Z && (o.el = null);
    }, h);
  }, es = (o) => {
    const { type: c, el: h, anchor: b, transition: v } = o;
    if (c === ge) {
      Vn(h, b);
      return;
    }
    if (c === kt) {
      E(o);
      return;
    }
    const g = () => {
      n(h), v && !v.persisted && v.afterLeave && v.afterLeave();
    };
    if (o.shapeFlag & 1 && v && !v.persisted) {
      const { leave: x, delayLeave: m } = v, y = () => x(h, g);
      m ? m(o.el, g, y) : y();
    } else g();
  }, Vn = (o, c) => {
    let h;
    for (; o !== c; )
      h = T(o), n(o), o = h;
    n(c);
  }, Bn = (o, c, h) => {
    const { bum: b, scope: v, job: g, subTree: x, um: m, m: y, a: _ } = o;
    ms(y), ms(_), b && ar(b), v.stop(), g && (g.flags |= 8, Je(x, o, c, h)), m && de(m, c), de(() => {
      o.isUnmounted = !0;
    }, c);
  }, at = (o, c, h, b = !1, v = !1, g = 0) => {
    for (let x = g; x < o.length; x++) Je(o[x], c, h, b, v);
  }, Lt = (o) => {
    if (o.shapeFlag & 6) return Lt(o.component.subTree);
    if (o.shapeFlag & 128) return o.suspense.next();
    const c = T(o.anchor || o.el), h = c && c[ji];
    return h ? T(h) : c;
  };
  let or = !1;
  const ts = (o, c, h) => {
    let b;
    o == null ? c._vnode && (Je(c._vnode, null, null, !0), b = c._vnode.component) : A(c._vnode || null, o, c, null, null, null, h), c._vnode = o, or || (or = !0, us(b), Zs(), or = !1);
  }, rt = {
    p: A,
    um: Je,
    m: jt,
    r: es,
    mt: We,
    mc: Te,
    pc: U,
    pbc: J,
    n: Lt,
    o: e
  };
  let fr, ur;
  return t && ([fr, ur] = t(rt)), {
    render: ts,
    hydrate: fr,
    createApp: sl(ts, fr)
  };
}
function mr({ type: e, props: t }, r) {
  return r === "svg" && e === "foreignObject" || r === "mathml" && e === "annotation-xml" && t && t.encoding && t.encoding.includes("html") ? void 0 : r;
}
function Qe({ effect: e, job: t }, r) {
  r ? (e.flags |= 32, t.flags |= 4) : (e.flags &= -33, t.flags &= -5);
}
function bl(e, t) {
  return (!e || e && !e.pendingBranch) && t && !t.persisted;
}
function Pn(e, t, r = !1) {
  const s = e.children, n = t.children;
  if (I(s) && I(n)) for (let i = 0; i < s.length; i++) {
    const l = s[i];
    let f = n[i];
    f.shapeFlag & 1 && !f.dynamicChildren && ((f.patchFlag <= 0 || f.patchFlag === 32) && (f = n[i] = Ne(n[i]), f.el = l.el), !r && f.patchFlag !== -2 && Pn(l, f)), f.type === ir && (f.patchFlag === -1 && (f = n[i] = Ne(f)), f.el = l.el), f.type === ne && !f.el && (f.el = l.el);
  }
}
function yl(e) {
  const t = e.slice(), r = [0];
  let s, n, i, l, f;
  const u = e.length;
  for (s = 0; s < u; s++) {
    const d = e[s];
    if (d !== 0) {
      if (n = r[r.length - 1], e[n] < d) {
        t[s] = n, r.push(s);
        continue;
      }
      for (i = 0, l = r.length - 1; i < l; )
        f = i + l >> 1, e[r[f]] < d ? i = f + 1 : l = f;
      d < e[r[i]] && (i > 0 && (t[s] = r[i - 1]), r[i] = s);
    }
  }
  for (i = r.length, l = r[i - 1]; i-- > 0; )
    r[i] = l, l = t[l];
  return r;
}
function In(e) {
  const t = e.subTree.component;
  if (t) return t.asyncDep && !t.asyncResolved ? t : In(t);
}
function ms(e) {
  if (e) for (let t = 0; t < e.length; t++) e[t].flags |= 8;
}
function Fn(e) {
  if (e.placeholder) return e.placeholder;
  const t = e.component;
  return t ? Fn(t.subTree) : null;
}
var Mn = (e) => e.__isSuspense;
function ml(e, t) {
  t && t.pendingBranch ? I(e) ? t.effects.push(...e) : t.effects.push(e) : Pi(e);
}
var ge = /* @__PURE__ */ Symbol.for("v-fgt"), ir = /* @__PURE__ */ Symbol.for("v-txt"), ne = /* @__PURE__ */ Symbol.for("v-cmt"), kt = /* @__PURE__ */ Symbol.for("v-stc"), xt = [], ve = null;
function Fr(e = !1) {
  xt.push(ve = e ? null : []);
}
function xl() {
  xt.pop(), ve = xt[xt.length - 1] || null;
}
var Ot = 1;
function Gt(e, t = !1) {
  Ot += e, e < 0 && ve && t && (ve.hasOnce = !0);
}
function Rn(e) {
  return e.dynamicChildren = Ot > 0 ? ve || it : null, xl(), Ot > 0 && ve && ve.push(e), e;
}
function eo(e, t, r, s, n, i) {
  return Rn(jn(e, t, r, s, n, i, !0));
}
function Mr(e, t, r, s, n) {
  return Rn(ae(e, t, r, s, n, !0));
}
function Et(e) {
  return e ? e.__v_isVNode === !0 : !1;
}
function Xe(e, t) {
  return e.type === t.type && e.key === t.key;
}
var Dn = ({ key: e }) => e ?? null, Ut = ({ ref: e, ref_key: t, ref_for: r }) => (typeof e == "number" && (e = "" + e), e != null ? re(e) || /* @__PURE__ */ le(e) || F(e) ? {
  i: te,
  r: e,
  k: t,
  f: !!r
} : e : null);
function jn(e, t = null, r = null, s = 0, n = null, i = e === ge ? 0 : 1, l = !1, f = !1) {
  const u = {
    __v_isVNode: !0,
    __v_skip: !0,
    type: e,
    props: t,
    key: t && Dn(t),
    ref: t && Ut(t),
    scopeId: en,
    slotScopeIds: null,
    children: r,
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
    patchFlag: s,
    dynamicProps: n,
    dynamicChildren: null,
    appContext: null,
    ctx: te
  };
  return f ? (Xr(u, r), i & 128 && e.normalize(u)) : r && (u.shapeFlag |= re(r) ? 8 : 16), Ot > 0 && !l && ve && (u.patchFlag > 0 || i & 6) && u.patchFlag !== 32 && ve.push(u), u;
}
var ae = Tl;
function Tl(e, t = null, r = null, s = 0, n = null, i = !1) {
  if ((!e || e === gn) && (e = ne), Et(e)) {
    const f = Ye(e, t, !0);
    return r && Xr(f, r), Ot > 0 && !i && ve && (f.shapeFlag & 6 ? ve[ve.indexOf(e)] = f : ve.push(f)), f.patchFlag = -2, f;
  }
  if (jl(e) && (e = e.__vccOpts), t) {
    t = Sl(t);
    let { class: f, style: u } = t;
    f && !re(f) && (t.class = Br(f)), N(u) && (/* @__PURE__ */ Gr(u) && !I(u) && (u = X({}, u)), t.style = Vr(u));
  }
  const l = re(e) ? 1 : Mn(e) ? 128 : sn(e) ? 64 : N(e) ? 4 : F(e) ? 2 : 0;
  return jn(e, t, r, s, n, l, i, !0);
}
function Sl(e) {
  return e ? /* @__PURE__ */ Gr(e) || Sn(e) ? X({}, e) : e : null;
}
function Ye(e, t, r = !1, s = !1) {
  const { props: n, ref: i, patchFlag: l, children: f, transition: u } = e, d = t ? Ol(n || {}, t) : n, a = {
    __v_isVNode: !0,
    __v_skip: !0,
    type: e.type,
    props: d,
    key: d && Dn(d),
    ref: t && t.ref ? r && i ? I(i) ? i.concat(Ut(t)) : [i, Ut(t)] : Ut(t) : i,
    scopeId: e.scopeId,
    slotScopeIds: e.slotScopeIds,
    children: f,
    target: e.target,
    targetStart: e.targetStart,
    targetAnchor: e.targetAnchor,
    staticCount: e.staticCount,
    shapeFlag: e.shapeFlag,
    patchFlag: t && e.type !== ge ? l === -1 ? 16 : l | 16 : l,
    dynamicProps: e.dynamicProps,
    dynamicChildren: e.dynamicChildren,
    appContext: e.appContext,
    dirs: e.dirs,
    transition: u,
    component: e.component,
    suspense: e.suspense,
    ssContent: e.ssContent && Ye(e.ssContent),
    ssFallback: e.ssFallback && Ye(e.ssFallback),
    placeholder: e.placeholder,
    el: e.el,
    anchor: e.anchor,
    ctx: e.ctx,
    ce: e.ce
  };
  return u && s && wt(a, u.clone(a)), a;
}
function Cl(e = " ", t = 0) {
  return ae(ir, null, e, t);
}
function to(e, t) {
  const r = ae(kt, null, e);
  return r.staticCount = t, r;
}
function wl(e = "", t = !1) {
  return t ? (Fr(), Mr(ne, null, e)) : ae(ne, null, e);
}
function Fe(e) {
  return e == null || typeof e == "boolean" ? ae(ne) : I(e) ? ae(ge, null, e.slice()) : Et(e) ? Ne(e) : ae(ir, null, String(e));
}
function Ne(e) {
  return e.el === null && e.patchFlag !== -1 || e.memo ? e : Ye(e);
}
function Xr(e, t) {
  let r = 0;
  const { shapeFlag: s } = e;
  if (t == null) t = null;
  else if (I(t)) r = 16;
  else if (typeof t == "object") if (s & 65) {
    const n = t.default;
    n && (n._c && (n._d = !1), Xr(e, n()), n._c && (n._d = !0));
    return;
  } else {
    r = 32;
    const n = t._;
    !n && !Sn(t) ? t._ctx = te : n === 3 && te && (te.slots._ === 1 ? t._ = 1 : (t._ = 2, e.patchFlag |= 1024));
  }
  else F(t) ? (t = {
    default: t,
    _ctx: te
  }, r = 32) : (t = String(t), s & 64 ? (r = 16, t = [Cl(t)]) : r = 8);
  e.children = t, e.shapeFlag |= r;
}
function Ol(...e) {
  const t = {};
  for (let r = 0; r < e.length; r++) {
    const s = e[r];
    for (const n in s) if (n === "class")
      t.class !== s.class && (t.class = Br([t.class, s.class]));
    else if (n === "style") t.style = Vr([t.style, s.style]);
    else if (Dr(n)) {
      const i = t[n], l = s[n];
      l && i !== l && !(I(i) && i.includes(l)) ? t[n] = i ? [].concat(i, l) : l : l == null && i == null && !jr(n) && (t[n] = l);
    } else n !== "" && (t[n] = s[n]);
  }
  return t;
}
function Ae(e, t, r, s = null) {
  Le(e, t, 7, [r, s]);
}
var El = bn(), Al = 0;
function Pl(e, t, r) {
  const s = e.type, n = (t ? t.appContext : e.appContext) || El, i = {
    uid: Al++,
    vnode: e,
    type: s,
    parent: t,
    appContext: n,
    root: null,
    next: null,
    subTree: null,
    effect: null,
    update: null,
    job: null,
    scope: new Zn(!0),
    render: null,
    proxy: null,
    exposed: null,
    exposeProxy: null,
    withProxy: null,
    provides: t ? t.provides : Object.create(n.provides),
    ids: t ? t.ids : [
      "",
      0,
      0
    ],
    accessCache: null,
    renderCache: [],
    components: null,
    directives: null,
    propsOptions: wn(s, n),
    emitsOptions: yn(s, n),
    emit: null,
    emitted: null,
    propsDefaults: B,
    inheritAttrs: s.inheritAttrs,
    ctx: B,
    data: B,
    props: B,
    attrs: B,
    slots: B,
    refs: B,
    setupState: B,
    setupContext: null,
    suspense: r,
    suspenseId: r ? r.pendingId : 0,
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
  return i.ctx = { _: i }, i.root = t ? t.root : i, i.emit = il.bind(null, i), e.ce && e.ce(i), i;
}
var ie = null, Ln = () => ie || te, Yt, Rr;
{
  const e = Zt(), t = (r, s) => {
    let n;
    return (n = e[r]) || (n = e[r] = []), n.push(s), (i) => {
      n.length > 1 ? n.forEach((l) => l(i)) : n[0](i);
    };
  };
  Yt = t("__VUE_INSTANCE_SETTERS__", (r) => ie = r), Rr = t("__VUE_SSR_SETTERS__", (r) => At = r);
}
var Mt = (e) => {
  const t = ie;
  return Yt(e), e.scope.on(), () => {
    e.scope.off(), Yt(t);
  };
}, xs = () => {
  ie && ie.scope.off(), Yt(null);
};
function Hn(e) {
  return e.vnode.shapeFlag & 4;
}
var At = !1;
function Il(e, t = !1, r = !1) {
  t && Rr(t);
  const { props: s, children: n } = e.vnode, i = Hn(e);
  al(e, s, i, t), gl(e, n, r || t);
  const l = i ? Fl(e, t) : void 0;
  return t && Rr(!1), l;
}
function Fl(e, t) {
  const r = e.type;
  e.accessCache = /* @__PURE__ */ Object.create(null), e.proxy = new Proxy(e.ctx, zi);
  const { setup: s } = r;
  if (s) {
    ke();
    const n = e.setupContext = s.length > 1 ? Rl(e) : null, i = Mt(e), l = Ft(s, e, 0, [e.props, n]), f = Es(l);
    if (Ue(), i(), (f || e.sp) && !ft(e) && un(e), f) {
      if (l.then(xs, xs), t) return l.then((u) => {
        Ts(e, u, t);
      }).catch((u) => {
        tr(u, e, 0);
      });
      e.asyncDep = l;
    } else Ts(e, l, t);
  } else Nn(e, t);
}
function Ts(e, t, r) {
  F(t) ? e.type.__ssrInlineRender ? e.ssrRender = t : e.render = t : N(t) && (e.setupState = Ys(t)), Nn(e, r);
}
var Ss, Cs;
function Nn(e, t, r) {
  const s = e.type;
  if (!e.render) {
    if (!t && Ss && !s.render) {
      const n = s.template || zr(e).template;
      if (n) {
        const { isCustomElement: i, compilerOptions: l } = e.appContext.config, { delimiters: f, compilerOptions: u } = s, d = X(X({
          isCustomElement: i,
          delimiters: f
        }, l), u);
        s.render = Ss(n, d);
      }
    }
    e.render = s.render || Re, Cs && Cs(e);
  }
  {
    const n = Mt(e);
    ke();
    try {
      Qi(e);
    } finally {
      Ue(), n();
    }
  }
}
var Ml = { get(e, t) {
  return se(e, "get", ""), e[t];
} };
function Rl(e) {
  const t = (r) => {
    e.exposed = r || {};
  };
  return {
    attrs: new Proxy(e.attrs, Ml),
    slots: e.slots,
    emit: e.emit,
    expose: t
  };
}
function lr(e) {
  return e.exposed ? e.exposeProxy || (e.exposeProxy = new Proxy(Ys(bi(e.exposed)), {
    get(t, r) {
      if (r in t) return t[r];
      if (r in mt) return mt[r](e);
    },
    has(t, r) {
      return r in t || r in mt;
    }
  })) : e.proxy;
}
function Dl(e, t = !0) {
  return F(e) ? e.displayName || e.name : e.name || t && e.__name;
}
function jl(e) {
  return F(e) && "__vccOpts" in e;
}
var Ll = (e, t) => /* @__PURE__ */ Si(e, t, At);
function ro(e, t, r) {
  try {
    Gt(-1);
    const s = arguments.length;
    return s === 2 ? N(t) && !I(t) ? Et(t) ? ae(e, null, [t]) : ae(e, t) : ae(e, null, t) : (s > 3 ? r = Array.prototype.slice.call(arguments, 2) : s === 3 && Et(r) && (r = [r]), ae(e, t, r));
  } finally {
    Gt(1);
  }
}
var Hl = "3.5.35";
export {
  Vr as $,
  Kl as A,
  I as B,
  Zl as C,
  Wl as D,
  Ii as E,
  Nr as F,
  Os as G,
  jr as H,
  X as I,
  De as J,
  Vl as K,
  It as L,
  L as M,
  mi as N,
  bi as O,
  je as P,
  Br as Q,
  kl as R,
  Ql as S,
  vr as T,
  N as U,
  F as V,
  Dr as W,
  Ul as X,
  Xt as Y,
  Wn as Z,
  dn as _,
  Ll as a,
  hn as b,
  wl as c,
  to as d,
  Qn as et,
  Cl as f,
  Ei as g,
  ro as h,
  Le as i,
  $l as j,
  qr as k,
  eo as l,
  Jl as m,
  Hi as n,
  jn as o,
  ae as p,
  re as q,
  ge as r,
  Mr as s,
  ql as t,
  Nl as tt,
  Xl as u,
  Gi as v,
  zl as w,
  Fr as x,
  an as y,
  ar as z
};
