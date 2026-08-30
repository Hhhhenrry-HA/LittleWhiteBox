/* eslint-disable */
// @__NO_SIDE_EFFECTS__
function Es(e) {
  const t = /* @__PURE__ */ Object.create(null);
  for (const s of e.split(",")) t[s] = 1;
  return (s) => s in t;
}
var Z = {}, Et = [], Ge = () => {
}, Tn = () => !1, Is = (e) => e.charCodeAt(0) === 111 && e.charCodeAt(1) === 110 && (e.charCodeAt(2) > 122 || e.charCodeAt(2) < 97), $s = (e) => e.startsWith("onUpdate:"), ue = Object.assign, gr = (e, t) => {
  const s = e.indexOf(t);
  s > -1 && e.splice(s, 1);
}, Ui = Object.prototype.hasOwnProperty, Y = (e, t) => Ui.call(e, t), W = Array.isArray, It = (e) => ns(e) === "[object Map]", Os = (e) => ns(e) === "[object Set]", Rr = (e) => ns(e) === "[object Date]", K = (e) => typeof e == "function", le = (e) => typeof e == "string", Xe = (e) => typeof e == "symbol", Q = (e) => e !== null && typeof e == "object", En = (e) => (Q(e) || K(e)) && K(e.then) && K(e.catch), In = Object.prototype.toString, ns = (e) => In.call(e), qi = (e) => ns(e).slice(8, -1), $n = (e) => ns(e) === "[object Object]", mr = (e) => le(e) && e !== "NaN" && e[0] !== "-" && "" + parseInt(e, 10) === e, Ut = /* @__PURE__ */ Es(",key,ref,ref_for,ref_key,onVnodeBeforeMount,onVnodeMounted,onVnodeBeforeUpdate,onVnodeUpdated,onVnodeBeforeUnmount,onVnodeUnmounted"), Ms = (e) => {
  const t = /* @__PURE__ */ Object.create(null);
  return ((s) => t[s] || (t[s] = e(s)));
}, Ki = /-\w/g, Se = Ms((e) => e.replace(Ki, (t) => t.slice(1).toUpperCase())), Gi = /\B([A-Z])/g, Ct = Ms((e) => e.replace(Gi, "-$1").toLowerCase()), ks = Ms((e) => e.charAt(0).toUpperCase() + e.slice(1)), qs = Ms((e) => e ? `on${ks(e)}` : ""), Ke = (e, t) => !Object.is(e, t), ps = (e, ...t) => {
  for (let s = 0; s < e.length; s++) e[s](...t);
}, On = (e, t, s, r = !1) => {
  Object.defineProperty(e, t, {
    configurable: !0,
    enumerable: !1,
    writable: r,
    value: s
  });
}, br = (e) => {
  const t = parseFloat(e);
  return isNaN(t) ? e : t;
}, Xi = (e) => {
  const t = le(e) ? Number(e) : NaN;
  return isNaN(t) ? e : t;
}, Nr, Ps = () => Nr || (Nr = typeof globalThis < "u" ? globalThis : typeof self < "u" ? self : typeof window < "u" ? window : typeof globalThis < "u" ? globalThis : {});
function Fs(e) {
  if (W(e)) {
    const t = {};
    for (let s = 0; s < e.length; s++) {
      const r = e[s], n = le(r) ? Qi(r) : Fs(r);
      if (n) for (const i in n) t[i] = n[i];
    }
    return t;
  } else if (le(e) || Q(e)) return e;
}
var zi = /;(?![^(]*\))/g, Ji = /:([^]+)/, Yi = /\/\*[^]*?\*\//g;
function Qi(e) {
  const t = {};
  return e.replace(Yi, "").split(zi).forEach((s) => {
    if (s) {
      const r = s.split(Ji);
      r.length > 1 && (t[r[0].trim()] = r[1].trim());
    }
  }), t;
}
function Be(e) {
  let t = "";
  if (le(e)) t = e;
  else if (W(e)) for (let s = 0; s < e.length; s++) {
    const r = Be(e[s]);
    r && (t += r + " ");
  }
  else if (Q(e))
    for (const s in e) e[s] && (t += s + " ");
  return t.trim();
}
var Mn = "itemscope,allowfullscreen,formnovalidate,ismap,nomodule,novalidate,readonly", Zi = /* @__PURE__ */ Es(Mn), Wf = /* @__PURE__ */ Es(Mn + ",async,autofocus,autoplay,controls,default,defer,disabled,hidden,inert,loop,open,required,reversed,scoped,seamless,checked,muted,multiple,selected");
function kn(e) {
  return !!e || e === "";
}
function el(e, t) {
  if (e.length !== t.length) return !1;
  let s = !0;
  for (let r = 0; s && r < e.length; r++) s = is(e[r], t[r]);
  return s;
}
function is(e, t) {
  if (e === t) return !0;
  let s = Rr(e), r = Rr(t);
  if (s || r) return s && r ? e.getTime() === t.getTime() : !1;
  if (s = Xe(e), r = Xe(t), s || r) return e === t;
  if (s = W(e), r = W(t), s || r) return s && r ? el(e, t) : !1;
  if (s = Q(e), r = Q(t), s || r) {
    if (!s || !r || Object.keys(e).length !== Object.keys(t).length) return !1;
    for (const n in e) {
      const i = e.hasOwnProperty(n), l = t.hasOwnProperty(n);
      if (i && !l || !i && l || !is(e[n], t[n])) return !1;
    }
  }
  return String(e) === String(t);
}
function Pn(e, t) {
  return e.findIndex((s) => is(s, t));
}
var Fn = (e) => !!(e && e.__v_isRef === !0), X = (e) => le(e) ? e : e == null ? "" : W(e) || Q(e) && (e.toString === In || !K(e.toString)) ? Fn(e) ? X(e.value) : JSON.stringify(e, Ln, 2) : String(e), Ln = (e, t) => Fn(t) ? Ln(e, t.value) : It(t) ? { [`Map(${t.size})`]: [...t.entries()].reduce((s, [r, n], i) => (s[Ks(r, i) + " =>"] = n, s), {}) } : Os(t) ? { [`Set(${t.size})`]: [...t.values()].map((s) => Ks(s)) } : Xe(t) ? Ks(t) : Q(t) && !W(t) && !$n(t) ? String(t) : t, Ks = (e, t = "") => {
  var s;
  return Xe(e) ? `Symbol(${(s = e.description) != null ? s : t})` : e;
}, pe, tl = class {
  constructor(e = !1) {
    this.detached = e, this._active = !0, this._on = 0, this.effects = [], this.cleanups = [], this._isPaused = !1, this._warnOnRun = !0, this.__v_skip = !0, !e && pe && (pe.active ? (this.parent = pe, this.index = (pe.scopes || (pe.scopes = [])).push(this) - 1) : (this._active = !1, this._warnOnRun = !1));
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
      const t = pe;
      try {
        return pe = this, e();
      } finally {
        pe = t;
      }
    }
  }
  on() {
    ++this._on === 1 && (this.prevScope = pe, pe = this);
  }
  off() {
    if (this._on > 0 && --this._on === 0) {
      if (pe === this) pe = this.prevScope;
      else {
        let e = pe;
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
      let t, s;
      for (t = 0, s = this.effects.length; t < s; t++) this.effects[t].stop();
      for (this.effects.length = 0, t = 0, s = this.cleanups.length; t < s; t++) this.cleanups[t]();
      if (this.cleanups.length = 0, this.scopes) {
        for (t = 0, s = this.scopes.length; t < s; t++) this.scopes[t].stop(!0);
        this.scopes.length = 0;
      }
      if (!this.detached && this.parent && !e) {
        const r = this.parent.scopes.pop();
        r && r !== this && (this.parent.scopes[this.index] = r, r.index = this.index);
      }
      this.parent = void 0;
    }
  }
};
function sl() {
  return pe;
}
var re, Gs = /* @__PURE__ */ new WeakSet(), Dn = class {
  constructor(e) {
    this.fn = e, this.deps = void 0, this.depsTail = void 0, this.flags = 5, this.next = void 0, this.cleanup = void 0, this.scheduler = void 0, pe && (pe.active ? pe.effects.push(this) : this.flags &= -2);
  }
  pause() {
    this.flags |= 64;
  }
  resume() {
    this.flags & 64 && (this.flags &= -65, Gs.has(this) && (Gs.delete(this), this.trigger()));
  }
  notify() {
    this.flags & 2 && !(this.flags & 32) || this.flags & 8 || Nn(this);
  }
  run() {
    if (!(this.flags & 1)) return this.fn();
    this.flags |= 2, Hr(this), Hn(this);
    const e = re, t = Ne;
    re = this, Ne = !0;
    try {
      return this.fn();
    } finally {
      Bn(this), re = e, Ne = t, this.flags &= -3;
    }
  }
  stop() {
    if (this.flags & 1) {
      for (let e = this.deps; e; e = e.nextDep) wr(e);
      this.deps = this.depsTail = void 0, Hr(this), this.onStop && this.onStop(), this.flags &= -2;
    }
  }
  trigger() {
    this.flags & 64 ? Gs.add(this) : this.scheduler ? this.scheduler() : this.runIfDirty();
  }
  runIfDirty() {
    nr(this) && this.run();
  }
  get dirty() {
    return nr(this);
  }
}, Rn = 0, qt, Kt;
function Nn(e, t = !1) {
  if (e.flags |= 8, t) {
    e.next = Kt, Kt = e;
    return;
  }
  e.next = qt, qt = e;
}
function yr() {
  Rn++;
}
function _r() {
  if (--Rn > 0) return;
  if (Kt) {
    let t = Kt;
    for (Kt = void 0; t; ) {
      const s = t.next;
      t.next = void 0, t.flags &= -9, t = s;
    }
  }
  let e;
  for (; qt; ) {
    let t = qt;
    for (qt = void 0; t; ) {
      const s = t.next;
      if (t.next = void 0, t.flags &= -9, t.flags & 1) try {
        t.trigger();
      } catch (r) {
        e || (e = r);
      }
      t = s;
    }
  }
  if (e) throw e;
}
function Hn(e) {
  for (let t = e.deps; t; t = t.nextDep)
    t.version = -1, t.prevActiveLink = t.dep.activeLink, t.dep.activeLink = t;
}
function Bn(e) {
  let t, s = e.depsTail, r = s;
  for (; r; ) {
    const n = r.prevDep;
    r.version === -1 ? (r === s && (s = n), wr(r), rl(r)) : t = r, r.dep.activeLink = r.prevActiveLink, r.prevActiveLink = void 0, r = n;
  }
  e.deps = t, e.depsTail = s;
}
function nr(e) {
  for (let t = e.deps; t; t = t.nextDep) if (t.dep.version !== t.version || t.dep.computed && (Vn(t.dep.computed) || t.dep.version !== t.version)) return !0;
  return !!e._dirty;
}
function Vn(e) {
  if (e.flags & 4 && !(e.flags & 16) || (e.flags &= -17, e.globalVersion === Yt) || (e.globalVersion = Yt, !e.isSSR && e.flags & 128 && (!e.deps && !e._dirty || !nr(e)))) return;
  e.flags |= 2;
  const t = e.dep, s = re, r = Ne;
  re = e, Ne = !0;
  try {
    Hn(e);
    const n = e.fn(e._value);
    (t.version === 0 || Ke(n, e._value)) && (e.flags |= 128, e._value = n, t.version++);
  } catch (n) {
    throw t.version++, n;
  } finally {
    re = s, Ne = r, Bn(e), e.flags &= -3;
  }
}
function wr(e, t = !1) {
  const { dep: s, prevSub: r, nextSub: n } = e;
  if (r && (r.nextSub = n, e.prevSub = void 0), n && (n.prevSub = r, e.nextSub = void 0), s.subs === e && (s.subs = r, !r && s.computed)) {
    s.computed.flags &= -5;
    for (let i = s.computed.deps; i; i = i.nextDep) wr(i, !0);
  }
  !t && !--s.sc && s.map && s.map.delete(s.key);
}
function rl(e) {
  const { prevDep: t, nextDep: s } = e;
  t && (t.nextDep = s, e.prevDep = void 0), s && (s.prevDep = t, e.nextDep = void 0);
}
var Ne = !0, jn = [];
function rt() {
  jn.push(Ne), Ne = !1;
}
function nt() {
  const e = jn.pop();
  Ne = e === void 0 ? !0 : e;
}
function Hr(e) {
  const { cleanup: t } = e;
  if (e.cleanup = void 0, t) {
    const s = re;
    re = void 0;
    try {
      t();
    } finally {
      re = s;
    }
  }
}
var Yt = 0, nl = class {
  constructor(e, t) {
    this.sub = e, this.dep = t, this.version = t.version, this.nextDep = this.prevDep = this.nextSub = this.prevSub = this.prevActiveLink = void 0;
  }
}, xr = class {
  constructor(e) {
    this.computed = e, this.version = 0, this.activeLink = void 0, this.subs = void 0, this.map = void 0, this.key = void 0, this.sc = 0, this.__v_skip = !0;
  }
  track(e) {
    if (!re || !Ne || re === this.computed) return;
    let t = this.activeLink;
    if (t === void 0 || t.sub !== re)
      t = this.activeLink = new nl(re, this), re.deps ? (t.prevDep = re.depsTail, re.depsTail.nextDep = t, re.depsTail = t) : re.deps = re.depsTail = t, Wn(t);
    else if (t.version === -1 && (t.version = this.version, t.nextDep)) {
      const s = t.nextDep;
      s.prevDep = t.prevDep, t.prevDep && (t.prevDep.nextDep = s), t.prevDep = re.depsTail, t.nextDep = void 0, re.depsTail.nextDep = t, re.depsTail = t, re.deps === t && (re.deps = s);
    }
    return t;
  }
  trigger(e) {
    this.version++, Yt++, this.notify(e);
  }
  notify(e) {
    yr();
    try {
      for (let t = this.subs; t; t = t.prevSub) t.sub.notify() && t.sub.dep.notify();
    } finally {
      _r();
    }
  }
};
function Wn(e) {
  if (e.dep.sc++, e.sub.flags & 4) {
    const t = e.dep.computed;
    if (t && !e.dep.subs) {
      t.flags |= 20;
      for (let r = t.deps; r; r = r.nextDep) Wn(r);
    }
    const s = e.dep.subs;
    s !== e && (e.prevSub = s, s && (s.nextSub = e)), e.dep.subs = e;
  }
}
var ir = /* @__PURE__ */ new WeakMap(), _t = /* @__PURE__ */ Symbol(""), lr = /* @__PURE__ */ Symbol(""), Qt = /* @__PURE__ */ Symbol("");
function me(e, t, s) {
  if (Ne && re) {
    let r = ir.get(e);
    r || ir.set(e, r = /* @__PURE__ */ new Map());
    let n = r.get(s);
    n || (r.set(s, n = new xr()), n.map = r, n.key = s), n.track();
  }
}
function et(e, t, s, r, n, i) {
  const l = ir.get(e);
  if (!l) {
    Yt++;
    return;
  }
  const a = (o) => {
    o && o.trigger();
  };
  if (yr(), t === "clear") l.forEach(a);
  else {
    const o = W(e), c = o && mr(s);
    if (o && s === "length") {
      const u = Number(r);
      l.forEach((h, g) => {
        (g === "length" || g === Qt || !Xe(g) && g >= u) && a(h);
      });
    } else
      switch ((s !== void 0 || l.has(void 0)) && a(l.get(s)), c && a(l.get(Qt)), t) {
        case "add":
          o ? c && a(l.get("length")) : (a(l.get(_t)), It(e) && a(l.get(lr)));
          break;
        case "delete":
          o || (a(l.get(_t)), It(e) && a(l.get(lr)));
          break;
        case "set":
          It(e) && a(l.get(_t));
          break;
      }
  }
  _r();
}
function At(e) {
  const t = /* @__PURE__ */ G(e);
  return t === e ? t : (me(t, "iterate", Qt), /* @__PURE__ */ Le(e) ? t : t.map(He));
}
function Ls(e) {
  return me(e = /* @__PURE__ */ G(e), "iterate", Qt), e;
}
function Ue(e, t) {
  return /* @__PURE__ */ it(e) ? Pt(/* @__PURE__ */ wt(e) ? He(t) : t) : He(t);
}
var il = {
  __proto__: null,
  [Symbol.iterator]() {
    return Xs(this, Symbol.iterator, (e) => Ue(this, e));
  },
  concat(...e) {
    return At(this).concat(...e.map((t) => W(t) ? At(t) : t));
  },
  entries() {
    return Xs(this, "entries", (e) => (e[1] = Ue(this, e[1]), e));
  },
  every(e, t) {
    return Je(this, "every", e, t, void 0, arguments);
  },
  filter(e, t) {
    return Je(this, "filter", e, t, (s) => s.map((r) => Ue(this, r)), arguments);
  },
  find(e, t) {
    return Je(this, "find", e, t, (s) => Ue(this, s), arguments);
  },
  findIndex(e, t) {
    return Je(this, "findIndex", e, t, void 0, arguments);
  },
  findLast(e, t) {
    return Je(this, "findLast", e, t, (s) => Ue(this, s), arguments);
  },
  findLastIndex(e, t) {
    return Je(this, "findLastIndex", e, t, void 0, arguments);
  },
  forEach(e, t) {
    return Je(this, "forEach", e, t, void 0, arguments);
  },
  includes(...e) {
    return zs(this, "includes", e);
  },
  indexOf(...e) {
    return zs(this, "indexOf", e);
  },
  join(e) {
    return At(this).join(e);
  },
  lastIndexOf(...e) {
    return zs(this, "lastIndexOf", e);
  },
  map(e, t) {
    return Je(this, "map", e, t, void 0, arguments);
  },
  pop() {
    return Nt(this, "pop");
  },
  push(...e) {
    return Nt(this, "push", e);
  },
  reduce(e, ...t) {
    return Br(this, "reduce", e, t);
  },
  reduceRight(e, ...t) {
    return Br(this, "reduceRight", e, t);
  },
  shift() {
    return Nt(this, "shift");
  },
  some(e, t) {
    return Je(this, "some", e, t, void 0, arguments);
  },
  splice(...e) {
    return Nt(this, "splice", e);
  },
  toReversed() {
    return At(this).toReversed();
  },
  toSorted(e) {
    return At(this).toSorted(e);
  },
  toSpliced(...e) {
    return At(this).toSpliced(...e);
  },
  unshift(...e) {
    return Nt(this, "unshift", e);
  },
  values() {
    return Xs(this, "values", (e) => Ue(this, e));
  }
};
function Xs(e, t, s) {
  const r = Ls(e), n = r[t]();
  return r !== e && !/* @__PURE__ */ Le(e) && (n._next = n.next, n.next = () => {
    const i = n._next();
    return i.done || (i.value = s(i.value)), i;
  }), n;
}
var ll = Array.prototype;
function Je(e, t, s, r, n, i) {
  const l = Ls(e), a = l !== e && !/* @__PURE__ */ Le(e), o = l[t];
  if (o !== ll[t]) {
    const h = o.apply(e, i);
    return a ? He(h) : h;
  }
  let c = s;
  l !== e && (a ? c = function(h, g) {
    return s.call(this, Ue(e, h), g, e);
  } : s.length > 2 && (c = function(h, g) {
    return s.call(this, h, g, e);
  }));
  const u = o.call(l, c, r);
  return a && n ? n(u) : u;
}
function Br(e, t, s, r) {
  const n = Ls(e), i = n !== e && !/* @__PURE__ */ Le(e);
  let l = s, a = !1;
  n !== e && (i ? (a = r.length === 0, l = function(c, u, h) {
    return a && (a = !1, c = Ue(e, c)), s.call(this, c, Ue(e, u), h, e);
  }) : s.length > 3 && (l = function(c, u, h) {
    return s.call(this, c, u, h, e);
  }));
  const o = n[t](l, ...r);
  return a ? Ue(e, o) : o;
}
function zs(e, t, s) {
  const r = /* @__PURE__ */ G(e);
  me(r, "iterate", Qt);
  const n = r[t](...s);
  return (n === -1 || n === !1) && /* @__PURE__ */ Ar(s[0]) ? (s[0] = /* @__PURE__ */ G(s[0]), r[t](...s)) : n;
}
function Nt(e, t, s = []) {
  rt(), yr();
  const r = (/* @__PURE__ */ G(e))[t].apply(e, s);
  return _r(), nt(), r;
}
var al = /* @__PURE__ */ Es("__proto__,__v_isRef,__isVue"), Un = new Set(/* @__PURE__ */ Object.getOwnPropertyNames(Symbol).filter((e) => e !== "arguments" && e !== "caller").map((e) => Symbol[e]).filter(Xe));
function ol(e) {
  Xe(e) || (e = String(e));
  const t = /* @__PURE__ */ G(this);
  return me(t, "has", e), t.hasOwnProperty(e);
}
var qn = class {
  constructor(e = !1, t = !1) {
    this._isReadonly = e, this._isShallow = t;
  }
  get(e, t, s) {
    if (t === "__v_skip") return e.__v_skip;
    const r = this._isReadonly, n = this._isShallow;
    if (t === "__v_isReactive") return !r;
    if (t === "__v_isReadonly") return r;
    if (t === "__v_isShallow") return n;
    if (t === "__v_raw")
      return s === (r ? n ? bl : zn : n ? Xn : Gn).get(e) || Object.getPrototypeOf(e) === Object.getPrototypeOf(s) ? e : void 0;
    const i = W(e);
    if (!r) {
      let a;
      if (i && (a = il[t])) return a;
      if (t === "hasOwnProperty") return ol;
    }
    const l = Reflect.get(e, t, /* @__PURE__ */ ye(e) ? e : s);
    if ((Xe(t) ? Un.has(t) : al(t)) || (r || me(e, "get", t), n)) return l;
    if (/* @__PURE__ */ ye(l)) {
      const a = i && mr(t) ? l : l.value;
      return r && Q(a) ? /* @__PURE__ */ or(a) : a;
    }
    return Q(l) ? r ? /* @__PURE__ */ or(l) : /* @__PURE__ */ xt(l) : l;
  }
}, Kn = class extends qn {
  constructor(e = !1) {
    super(!1, e);
  }
  set(e, t, s, r) {
    let n = e[t];
    const i = W(e) && mr(t);
    if (!this._isShallow) {
      const o = /* @__PURE__ */ it(n);
      if (!/* @__PURE__ */ Le(s) && !/* @__PURE__ */ it(s) && (n = /* @__PURE__ */ G(n), s = /* @__PURE__ */ G(s)), !i && /* @__PURE__ */ ye(n) && !/* @__PURE__ */ ye(s)) return o || (n.value = s), !0;
    }
    const l = i ? Number(t) < e.length : Y(e, t), a = Reflect.set(e, t, s, /* @__PURE__ */ ye(e) ? e : r);
    return e === /* @__PURE__ */ G(r) && (l ? Ke(s, n) && et(e, "set", t, s, n) : et(e, "add", t, s)), a;
  }
  deleteProperty(e, t) {
    const s = Y(e, t), r = e[t], n = Reflect.deleteProperty(e, t);
    return n && s && et(e, "delete", t, void 0, r), n;
  }
  has(e, t) {
    const s = Reflect.has(e, t);
    return (!Xe(t) || !Un.has(t)) && me(e, "has", t), s;
  }
  ownKeys(e) {
    return me(e, "iterate", W(e) ? "length" : _t), Reflect.ownKeys(e);
  }
}, ul = class extends qn {
  constructor(e = !1) {
    super(!0, e);
  }
  set(e, t) {
    return !0;
  }
  deleteProperty(e, t) {
    return !0;
  }
}, fl = /* @__PURE__ */ new Kn(), cl = /* @__PURE__ */ new ul(), dl = /* @__PURE__ */ new Kn(!0), ar = (e) => e, ds = (e) => Reflect.getPrototypeOf(e);
function vl(e, t, s) {
  return function(...r) {
    const n = this.__v_raw, i = /* @__PURE__ */ G(n), l = It(i), a = e === "entries" || e === Symbol.iterator && l, o = e === "keys" && l, c = n[e](...r), u = s ? ar : t ? Pt : He;
    return !t && me(i, "iterate", o ? lr : _t), ue(Object.create(c), { next() {
      const { value: h, done: g } = c.next();
      return g ? {
        value: h,
        done: g
      } : {
        value: a ? [u(h[0]), u(h[1])] : u(h),
        done: g
      };
    } });
  };
}
function vs(e) {
  return function(...t) {
    return e === "delete" ? !1 : e === "clear" ? void 0 : this;
  };
}
function hl(e, t) {
  const s = {
    get(r) {
      const n = this.__v_raw, i = /* @__PURE__ */ G(n), l = /* @__PURE__ */ G(r);
      e || (Ke(r, l) && me(i, "get", r), me(i, "get", l));
      const { has: a } = ds(i), o = t ? ar : e ? Pt : He;
      if (a.call(i, r)) return o(n.get(r));
      if (a.call(i, l)) return o(n.get(l));
      n !== i && n.get(r);
    },
    get size() {
      const r = this.__v_raw;
      return !e && me(/* @__PURE__ */ G(r), "iterate", _t), r.size;
    },
    has(r) {
      const n = this.__v_raw, i = /* @__PURE__ */ G(n), l = /* @__PURE__ */ G(r);
      return e || (Ke(r, l) && me(i, "has", r), me(i, "has", l)), r === l ? n.has(r) : n.has(r) || n.has(l);
    },
    forEach(r, n) {
      const i = this, l = i.__v_raw, a = /* @__PURE__ */ G(l), o = t ? ar : e ? Pt : He;
      return !e && me(a, "iterate", _t), l.forEach((c, u) => r.call(n, o(c), o(u), i));
    }
  };
  return ue(s, e ? {
    add: vs("add"),
    set: vs("set"),
    delete: vs("delete"),
    clear: vs("clear")
  } : {
    add(r) {
      const n = /* @__PURE__ */ G(this), i = ds(n), l = /* @__PURE__ */ G(r), a = !t && !/* @__PURE__ */ Le(r) && !/* @__PURE__ */ it(r) ? l : r;
      return i.has.call(n, a) || Ke(r, a) && i.has.call(n, r) || Ke(l, a) && i.has.call(n, l) || (n.add(a), et(n, "add", a, a)), this;
    },
    set(r, n) {
      !t && !/* @__PURE__ */ Le(n) && !/* @__PURE__ */ it(n) && (n = /* @__PURE__ */ G(n));
      const i = /* @__PURE__ */ G(this), { has: l, get: a } = ds(i);
      let o = l.call(i, r);
      o || (r = /* @__PURE__ */ G(r), o = l.call(i, r));
      const c = a.call(i, r);
      return i.set(r, n), o ? Ke(n, c) && et(i, "set", r, n, c) : et(i, "add", r, n), this;
    },
    delete(r) {
      const n = /* @__PURE__ */ G(this), { has: i, get: l } = ds(n);
      let a = i.call(n, r);
      a || (r = /* @__PURE__ */ G(r), a = i.call(n, r));
      const o = l ? l.call(n, r) : void 0, c = n.delete(r);
      return a && et(n, "delete", r, void 0, o), c;
    },
    clear() {
      const r = /* @__PURE__ */ G(this), n = r.size !== 0, i = void 0, l = r.clear();
      return n && et(r, "clear", void 0, void 0, i), l;
    }
  }), [
    "keys",
    "values",
    "entries",
    Symbol.iterator
  ].forEach((r) => {
    s[r] = vl(r, e, t);
  }), s;
}
function Cr(e, t) {
  const s = hl(e, t);
  return (r, n, i) => n === "__v_isReactive" ? !e : n === "__v_isReadonly" ? e : n === "__v_raw" ? r : Reflect.get(Y(s, n) && n in r ? s : r, n, i);
}
var pl = { get: /* @__PURE__ */ Cr(!1, !1) }, gl = { get: /* @__PURE__ */ Cr(!1, !0) }, ml = { get: /* @__PURE__ */ Cr(!0, !1) }, Gn = /* @__PURE__ */ new WeakMap(), Xn = /* @__PURE__ */ new WeakMap(), zn = /* @__PURE__ */ new WeakMap(), bl = /* @__PURE__ */ new WeakMap();
function yl(e) {
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
function xt(e) {
  return /* @__PURE__ */ it(e) ? e : Sr(e, !1, fl, pl, Gn);
}
// @__NO_SIDE_EFFECTS__
function _l(e) {
  return Sr(e, !1, dl, gl, Xn);
}
// @__NO_SIDE_EFFECTS__
function or(e) {
  return Sr(e, !0, cl, ml, zn);
}
function Sr(e, t, s, r, n) {
  if (!Q(e) || e.__v_raw && !(t && e.__v_isReactive) || e.__v_skip || !Object.isExtensible(e)) return e;
  const i = n.get(e);
  if (i) return i;
  const l = yl(qi(e));
  if (l === 0) return e;
  const a = new Proxy(e, l === 2 ? r : s);
  return n.set(e, a), a;
}
// @__NO_SIDE_EFFECTS__
function wt(e) {
  return /* @__PURE__ */ it(e) ? /* @__PURE__ */ wt(e.__v_raw) : !!(e && e.__v_isReactive);
}
// @__NO_SIDE_EFFECTS__
function it(e) {
  return !!(e && e.__v_isReadonly);
}
// @__NO_SIDE_EFFECTS__
function Le(e) {
  return !!(e && e.__v_isShallow);
}
// @__NO_SIDE_EFFECTS__
function Ar(e) {
  return e ? !!e.__v_raw : !1;
}
// @__NO_SIDE_EFFECTS__
function G(e) {
  const t = e && e.__v_raw;
  return t ? /* @__PURE__ */ G(t) : e;
}
function wl(e) {
  return !Y(e, "__v_skip") && Object.isExtensible(e) && On(e, "__v_skip", !0), e;
}
var He = (e) => Q(e) ? /* @__PURE__ */ xt(e) : e, Pt = (e) => Q(e) ? /* @__PURE__ */ or(e) : e;
// @__NO_SIDE_EFFECTS__
function ye(e) {
  return e ? e.__v_isRef === !0 : !1;
}
// @__NO_SIDE_EFFECTS__
function ne(e) {
  return xl(e, !1);
}
function xl(e, t) {
  return /* @__PURE__ */ ye(e) ? e : new Cl(e, t);
}
var Cl = class {
  constructor(e, t) {
    this.dep = new xr(), this.__v_isRef = !0, this.__v_isShallow = !1, this._rawValue = t ? e : /* @__PURE__ */ G(e), this._value = t ? e : He(e), this.__v_isShallow = t;
  }
  get value() {
    return this.dep.track(), this._value;
  }
  set value(e) {
    const t = this._rawValue, s = this.__v_isShallow || /* @__PURE__ */ Le(e) || /* @__PURE__ */ it(e);
    e = s ? e : /* @__PURE__ */ G(e), Ke(e, t) && (this._rawValue = e, this._value = s ? e : He(e), this.dep.trigger());
  }
};
function Jn(e) {
  return /* @__PURE__ */ ye(e) ? e.value : e;
}
var Sl = {
  get: (e, t, s) => t === "__v_raw" ? e : Jn(Reflect.get(e, t, s)),
  set: (e, t, s, r) => {
    const n = e[t];
    return /* @__PURE__ */ ye(n) && !/* @__PURE__ */ ye(s) ? (n.value = s, !0) : Reflect.set(e, t, s, r);
  }
};
function Yn(e) {
  return /* @__PURE__ */ wt(e) ? e : new Proxy(e, Sl);
}
var Al = class {
  constructor(e, t, s) {
    this.fn = e, this.setter = t, this._value = void 0, this.dep = new xr(this), this.__v_isRef = !0, this.deps = void 0, this.depsTail = void 0, this.flags = 16, this.globalVersion = Yt - 1, this.next = void 0, this.effect = this, this.__v_isReadonly = !t, this.isSSR = s;
  }
  notify() {
    if (this.flags |= 16, !(this.flags & 8) && re !== this)
      return Nn(this, !0), !0;
  }
  get value() {
    const e = this.dep.track();
    return Vn(this), e && (e.version = this.dep.version), this._value;
  }
  set value(e) {
    this.setter && this.setter(e);
  }
};
// @__NO_SIDE_EFFECTS__
function Tl(e, t, s = !1) {
  let r, n;
  return K(e) ? r = e : (r = e.get, n = e.set), new Al(r, n, s);
}
var hs = {}, bs = /* @__PURE__ */ new WeakMap(), mt = void 0;
function El(e, t = !1, s = mt) {
  if (s) {
    let r = bs.get(s);
    r || bs.set(s, r = []), r.push(e);
  }
}
function Il(e, t, s = Z) {
  const { immediate: r, deep: n, once: i, scheduler: l, augmentJob: a, call: o } = s, c = (D) => n ? D : /* @__PURE__ */ Le(D) || n === !1 || n === 0 ? tt(D, 1) : tt(D);
  let u, h, g, y, B = !1, O = !1;
  if (/* @__PURE__ */ ye(e) ? (h = () => e.value, B = /* @__PURE__ */ Le(e)) : /* @__PURE__ */ wt(e) ? (h = () => c(e), B = !0) : W(e) ? (O = !0, B = e.some((D) => /* @__PURE__ */ wt(D) || /* @__PURE__ */ Le(D)), h = () => e.map((D) => {
    if (/* @__PURE__ */ ye(D)) return D.value;
    if (/* @__PURE__ */ wt(D)) return c(D);
    if (K(D)) return o ? o(D, 2) : D();
  })) : K(e) ? t ? h = o ? () => o(e, 2) : e : h = () => {
    if (g) {
      rt();
      try {
        g();
      } finally {
        nt();
      }
    }
    const D = mt;
    mt = u;
    try {
      return o ? o(e, 3, [y]) : e(y);
    } finally {
      mt = D;
    }
  } : h = Ge, t && n) {
    const D = h, w = n === !0 ? 1 / 0 : n;
    h = () => tt(D(), w);
  }
  const z = sl(), N = () => {
    u.stop(), z && z.active && gr(z.effects, u);
  };
  if (i && t) {
    const D = t;
    t = (...w) => {
      D(...w), N();
    };
  }
  let k = O ? new Array(e.length).fill(hs) : hs;
  const U = (D) => {
    if (!(!(u.flags & 1) || !u.dirty && !D))
      if (t) {
        const w = u.run();
        if (n || B || (O ? w.some((A, I) => Ke(A, k[I])) : Ke(w, k))) {
          g && g();
          const A = mt;
          mt = u;
          try {
            const I = [
              w,
              k === hs ? void 0 : O && k[0] === hs ? [] : k,
              y
            ];
            k = w, o ? o(t, 3, I) : t(...I);
          } finally {
            mt = A;
          }
        }
      } else u.run();
  };
  return a && a(U), u = new Dn(h), u.scheduler = l ? () => l(U, !1) : U, y = (D) => El(D, !1, u), g = u.onStop = () => {
    const D = bs.get(u);
    if (D) {
      if (o) o(D, 4);
      else for (const w of D) w();
      bs.delete(u);
    }
  }, t ? r ? U(!0) : k = u.run() : l ? l(U.bind(null, !0), !0) : u.run(), N.pause = u.pause.bind(u), N.resume = u.resume.bind(u), N.stop = N, N;
}
function tt(e, t = 1 / 0, s) {
  if (t <= 0 || !Q(e) || e.__v_skip || (s = s || /* @__PURE__ */ new Map(), (s.get(e) || 0) >= t)) return e;
  if (s.set(e, t), t--, /* @__PURE__ */ ye(e)) tt(e.value, t, s);
  else if (W(e)) for (let r = 0; r < e.length; r++) tt(e[r], t, s);
  else if (Os(e) || It(e)) e.forEach((r) => {
    tt(r, t, s);
  });
  else if ($n(e)) {
    for (const r in e) tt(e[r], t, s);
    for (const r of Object.getOwnPropertySymbols(e)) Object.prototype.propertyIsEnumerable.call(e, r) && tt(e[r], t, s);
  }
  return e;
}
function ls(e, t, s, r) {
  try {
    return r ? e(...r) : e();
  } catch (n) {
    Ds(n, t, s);
  }
}
function De(e, t, s, r) {
  if (K(e)) {
    const n = ls(e, t, s, r);
    return n && En(n) && n.catch((i) => {
      Ds(i, t, s);
    }), n;
  }
  if (W(e)) {
    const n = [];
    for (let i = 0; i < e.length; i++) n.push(De(e[i], t, s, r));
    return n;
  }
}
function Ds(e, t, s, r = !0) {
  const n = t ? t.vnode : null, { errorHandler: i, throwUnhandledErrorInProduction: l } = t && t.appContext.config || Z;
  if (t) {
    let a = t.parent;
    const o = t.proxy, c = `https://vuejs.org/error-reference/#runtime-${s}`;
    for (; a; ) {
      const u = a.ec;
      if (u) {
        for (let h = 0; h < u.length; h++) if (u[h](e, o, c) === !1) return;
      }
      a = a.parent;
    }
    if (i) {
      rt(), ls(i, null, 10, [
        e,
        o,
        c
      ]), nt();
      return;
    }
  }
  $l(e, s, n, r, l);
}
function $l(e, t, s, r = !0, n = !1) {
  if (n) throw e;
  console.error(e);
}
var xe = [], We = -1, $t = [], ft = null, Tt = 0, Qn = /* @__PURE__ */ Promise.resolve(), ys = null;
function Tr(e) {
  const t = ys || Qn;
  return e ? t.then(this ? e.bind(this) : e) : t;
}
function Ol(e) {
  let t = We + 1, s = xe.length;
  for (; t < s; ) {
    const r = t + s >>> 1, n = xe[r], i = Zt(n);
    i < e || i === e && n.flags & 2 ? t = r + 1 : s = r;
  }
  return t;
}
function Er(e) {
  if (!(e.flags & 1)) {
    const t = Zt(e), s = xe[xe.length - 1];
    !s || !(e.flags & 2) && t >= Zt(s) ? xe.push(e) : xe.splice(Ol(t), 0, e), e.flags |= 1, Zn();
  }
}
function Zn() {
  ys || (ys = Qn.then(ti));
}
function Ml(e) {
  W(e) ? $t.push(...e) : ft && e.id === -1 ? ft.splice(Tt + 1, 0, e) : e.flags & 1 || ($t.push(e), e.flags |= 1), Zn();
}
function Vr(e, t, s = We + 1) {
  for (; s < xe.length; s++) {
    const r = xe[s];
    if (r && r.flags & 2) {
      if (e && r.id !== e.uid) continue;
      xe.splice(s, 1), s--, r.flags & 4 && (r.flags &= -2), r(), r.flags & 4 || (r.flags &= -2);
    }
  }
}
function ei(e) {
  if ($t.length) {
    const t = [...new Set($t)].sort((s, r) => Zt(s) - Zt(r));
    if ($t.length = 0, ft) {
      ft.push(...t);
      return;
    }
    for (ft = t, Tt = 0; Tt < ft.length; Tt++) {
      const s = ft[Tt];
      s.flags & 4 && (s.flags &= -2), s.flags & 8 || s(), s.flags &= -2;
    }
    ft = null, Tt = 0;
  }
}
var Zt = (e) => e.id == null ? e.flags & 2 ? -1 : 1 / 0 : e.id;
function ti(e) {
  try {
    for (We = 0; We < xe.length; We++) {
      const t = xe[We];
      t && !(t.flags & 8) && (t.flags & 4 && (t.flags &= -2), ls(t, t.i, t.i ? 15 : 14), t.flags & 4 || (t.flags &= -2));
    }
  } finally {
    for (; We < xe.length; We++) {
      const t = xe[We];
      t && (t.flags &= -2);
    }
    We = -1, xe.length = 0, ei(e), ys = null, (xe.length || $t.length) && ti(e);
  }
}
var Me = null, si = null;
function _s(e) {
  const t = Me;
  return Me = e, si = e && e.type.__scopeId || null, t;
}
function ri(e, t = Me, s) {
  if (!t || e._n) return e;
  const r = (...n) => {
    r._d && Cs(-1);
    const i = _s(t);
    let l;
    try {
      l = e(...n);
    } finally {
      _s(i), r._d && Cs(1);
    }
    return l;
  };
  return r._n = !0, r._c = !0, r._d = !0, r;
}
function Ee(e, t) {
  if (Me === null) return e;
  const s = Vs(Me), r = e.dirs || (e.dirs = []);
  for (let n = 0; n < t.length; n++) {
    let [i, l, a, o = Z] = t[n];
    i && (K(i) && (i = {
      mounted: i,
      updated: i
    }), i.deep && tt(l), r.push({
      dir: i,
      instance: s,
      value: l,
      oldValue: void 0,
      arg: a,
      modifiers: o
    }));
  }
  return e;
}
function vt(e, t, s, r) {
  const n = e.dirs, i = t && t.dirs;
  for (let l = 0; l < n.length; l++) {
    const a = n[l];
    i && (a.oldValue = i[l].value);
    let o = a.dir[r];
    o && (rt(), De(o, s, 8, [
      e.el,
      a,
      e,
      t
    ]), nt());
  }
}
function kl(e, t) {
  if (be) {
    let s = be.provides;
    const r = be.parent && be.parent.provides;
    r === s && (s = be.provides = Object.create(r)), s[e] = t;
  }
}
function gs(e, t, s = !1) {
  const r = Li();
  if (r || Mt) {
    let n = Mt ? Mt._context.provides : r ? r.parent == null || r.ce ? r.vnode.appContext && r.vnode.appContext.provides : r.parent.provides : void 0;
    if (n && e in n) return n[e];
    if (arguments.length > 1) return s && K(t) ? t.call(r && r.proxy) : t;
  }
}
var Pl = /* @__PURE__ */ Symbol.for("v-scx"), Fl = () => {
  {
    const e = gs(Pl);
    return e;
  }
};
function Ot(e, t, s) {
  return ni(e, t, s);
}
function ni(e, t, s = Z) {
  const { immediate: r, deep: n, flush: i, once: l } = s, a = ue({}, s), o = t && r || !t && i !== "post";
  let c;
  if (ss) {
    if (i === "sync") {
      const y = Fl();
      c = y.__watcherHandles || (y.__watcherHandles = []);
    } else if (!o) {
      const y = () => {
      };
      return y.stop = Ge, y.resume = Ge, y.pause = Ge, y;
    }
  }
  const u = be;
  a.call = (y, B, O) => De(y, u, B, O);
  let h = !1;
  i === "post" ? a.scheduler = (y) => {
    Te(y, u && u.suspense);
  } : i !== "sync" && (h = !0, a.scheduler = (y, B) => {
    B ? y() : Er(y);
  }), a.augmentJob = (y) => {
    t && (y.flags |= 4), h && (y.flags |= 2, u && (y.id = u.uid, y.i = u));
  };
  const g = Il(e, t, a);
  return ss && (c ? c.push(g) : o && g()), g;
}
function Ll(e, t, s) {
  const r = this.proxy, n = le(e) ? e.includes(".") ? ii(r, e) : () => r[e] : e.bind(r, r);
  let i;
  K(t) ? i = t : (i = t.handler, s = t);
  const l = os(this), a = ni(n, i.bind(r), s);
  return l(), a;
}
function ii(e, t) {
  const s = t.split(".");
  return () => {
    let r = e;
    for (let n = 0; n < s.length && r; n++) r = r[s[n]];
    return r;
  };
}
var Dl = /* @__PURE__ */ Symbol("_vte"), li = (e) => e.__isTeleport, Fe = /* @__PURE__ */ Symbol("_leaveCb"), Ht = /* @__PURE__ */ Symbol("_enterCb");
function Rl() {
  const e = {
    isMounted: !1,
    isLeaving: !1,
    isUnmounting: !1,
    leavingVNodes: /* @__PURE__ */ new Map()
  };
  return Ft(() => {
    e.isMounted = !0;
  }), Lt(() => {
    e.isUnmounting = !0;
  }), e;
}
var Pe = [Function, Array], ai = {
  mode: String,
  appear: Boolean,
  persisted: Boolean,
  onBeforeEnter: Pe,
  onEnter: Pe,
  onAfterEnter: Pe,
  onEnterCancelled: Pe,
  onBeforeLeave: Pe,
  onLeave: Pe,
  onAfterLeave: Pe,
  onLeaveCancelled: Pe,
  onBeforeAppear: Pe,
  onAppear: Pe,
  onAfterAppear: Pe,
  onAppearCancelled: Pe
}, oi = (e) => {
  const t = e.subTree;
  return t.component ? oi(t.component) : t;
}, Nl = {
  name: "BaseTransition",
  props: ai,
  setup(e, { slots: t }) {
    const s = Li(), r = Rl();
    return () => {
      const n = t.default && ci(t.default(), !0), i = n && n.length ? ui(n) : s.subTree ? oe() : void 0;
      if (!i) return;
      const l = /* @__PURE__ */ G(e), { mode: a } = l;
      if (r.isLeaving) return Js(i);
      const o = jr(i);
      if (!o) return Js(i);
      let c = ur(o, l, r, s, (h) => c = h);
      o.type !== Ce && es(o, c);
      let u = s.subTree && jr(s.subTree);
      if (u && u.type !== Ce && !bt(u, o) && oi(s).type !== Ce) {
        let h = ur(u, l, r, s);
        if (es(u, h), a === "out-in" && o.type !== Ce)
          return r.isLeaving = !0, h.afterLeave = () => {
            r.isLeaving = !1, s.job.flags & 8 || s.update(), delete h.afterLeave, u = void 0;
          }, Js(i);
        a === "in-out" && o.type !== Ce ? h.delayLeave = (g, y, B) => {
          const O = fi(r, u);
          O[String(u.key)] = u, g[Fe] = () => {
            y(), g[Fe] = void 0, delete c.delayedLeave, u = void 0;
          }, c.delayedLeave = () => {
            B(), delete c.delayedLeave, u = void 0;
          };
        } : u = void 0;
      } else u && (u = void 0);
      return i;
    };
  }
};
function ui(e) {
  let t = e[0];
  if (e.length > 1) {
    for (const s of e) if (s.type !== Ce) {
      t = s;
      break;
    }
  }
  return t;
}
var Hl = Nl;
function fi(e, t) {
  const { leavingVNodes: s } = e;
  let r = s.get(t.type);
  return r || (r = /* @__PURE__ */ Object.create(null), s.set(t.type, r)), r;
}
function ur(e, t, s, r, n) {
  const { appear: i, mode: l, persisted: a = !1, onBeforeEnter: o, onEnter: c, onAfterEnter: u, onEnterCancelled: h, onBeforeLeave: g, onLeave: y, onAfterLeave: B, onLeaveCancelled: O, onBeforeAppear: z, onAppear: N, onAfterAppear: k, onAppearCancelled: U } = t, D = String(e.key), w = fi(s, e), A = (x, S) => {
    x && De(x, r, 9, S);
  }, I = (x, S) => {
    const V = S[1];
    A(x, S), W(x) ? x.every((F) => F.length <= 1) && V() : x.length <= 1 && V();
  }, H = {
    mode: l,
    persisted: a,
    beforeEnter(x) {
      let S = o;
      if (!s.isMounted) if (i) S = z || o;
      else return;
      x[Fe] && x[Fe](!0);
      const V = w[D];
      V && bt(e, V) && V.el[Fe] && V.el[Fe](), A(S, [x]);
    },
    enter(x) {
      if (w[D] === e) return;
      let S = c, V = u, F = h;
      if (!s.isMounted) if (i)
        S = N || c, V = k || u, F = U || h;
      else return;
      let ie = !1;
      x[Ht] = (ze) => {
        ie || (ie = !0, ze ? A(F, [x]) : A(V, [x]), H.delayedLeave && H.delayedLeave(), x[Ht] = void 0);
      };
      const ge = x[Ht].bind(null, !1);
      S ? I(S, [x, ge]) : ge();
    },
    leave(x, S) {
      const V = String(e.key);
      if (x[Ht] && x[Ht](!0), s.isUnmounting) return S();
      A(g, [x]);
      let F = !1;
      x[Fe] = (ge) => {
        F || (F = !0, S(), ge ? A(O, [x]) : A(B, [x]), x[Fe] = void 0, w[V] === e && delete w[V]);
      };
      const ie = x[Fe].bind(null, !1);
      w[V] = e, y ? I(y, [x, ie]) : ie();
    },
    clone(x) {
      const S = ur(x, t, s, r, n);
      return n && n(S), S;
    }
  };
  return H;
}
function Js(e) {
  if (Rs(e))
    return e = dt(e), e.children = null, e;
}
function jr(e) {
  if (!Rs(e))
    return li(e.type) && e.children ? ui(e.children) : e;
  if (e.component) return e.component.subTree;
  const { shapeFlag: t, children: s } = e;
  if (s) {
    if (t & 16) return s[0];
    if (t & 32 && K(s.default)) return s.default();
  }
}
function es(e, t) {
  e.shapeFlag & 6 && e.component ? (e.transition = t, es(e.component.subTree, t)) : e.shapeFlag & 128 ? (e.ssContent.transition = t.clone(e.ssContent), e.ssFallback.transition = t.clone(e.ssFallback)) : e.transition = t;
}
function ci(e, t = !1, s) {
  let r = [], n = 0;
  for (let i = 0; i < e.length; i++) {
    let l = e[i];
    const a = s == null ? l.key : String(s) + String(l.key != null ? l.key : i);
    l.type === he ? (l.patchFlag & 128 && n++, r = r.concat(ci(l.children, t, a))) : (t || l.type !== Ce) && r.push(a != null ? dt(l, { key: a }) : l);
  }
  if (n > 1) for (let i = 0; i < r.length; i++) r[i].patchFlag = -2;
  return r;
}
// @__NO_SIDE_EFFECTS__
function Ae(e, t) {
  return K(e) ? ue({ name: e.name }, t, { setup: e }) : e;
}
function di(e) {
  e.ids = [
    e.ids[0] + e.ids[2]++ + "-",
    0,
    0
  ];
}
function Wr(e, t) {
  let s;
  return !!((s = Object.getOwnPropertyDescriptor(e, t)) && !s.configurable);
}
var ws = /* @__PURE__ */ new WeakMap();
function Gt(e, t, s, r, n = !1) {
  if (W(e)) {
    e.forEach((O, z) => Gt(O, t && (W(t) ? t[z] : t), s, r, n));
    return;
  }
  if (Xt(r) && !n) {
    r.shapeFlag & 512 && r.type.__asyncResolved && r.component.subTree.component && Gt(e, t, s, r.component.subTree);
    return;
  }
  const i = r.shapeFlag & 4 ? Vs(r.component) : r.el, l = n ? null : i, { i: a, r: o } = e, c = t && t.r, u = a.refs === Z ? a.refs = {} : a.refs, h = a.setupState, g = /* @__PURE__ */ G(h), y = h === Z ? Tn : (O) => Wr(u, O) ? !1 : Y(g, O), B = (O, z) => !(z && Wr(u, z));
  if (c != null && c !== o) {
    if (Ur(t), le(c))
      u[c] = null, y(c) && (h[c] = null);
    else if (/* @__PURE__ */ ye(c)) {
      const O = t;
      B(c, O.k) && (c.value = null), O.k && (u[O.k] = null);
    }
  }
  if (K(o)) ls(o, a, 12, [l, u]);
  else {
    const O = le(o), z = /* @__PURE__ */ ye(o);
    if (O || z) {
      const N = () => {
        if (e.f) {
          const k = O ? y(o) ? h[o] : u[o] : B(o) || !e.k ? o.value : u[e.k];
          if (n) W(k) && gr(k, i);
          else if (W(k)) k.includes(i) || k.push(i);
          else if (O)
            u[o] = [i], y(o) && (h[o] = u[o]);
          else {
            const U = [i];
            B(o, e.k) && (o.value = U), e.k && (u[e.k] = U);
          }
        } else O ? (u[o] = l, y(o) && (h[o] = l)) : z && (B(o, e.k) && (o.value = l), e.k && (u[e.k] = l));
      };
      if (l) {
        const k = () => {
          N(), ws.delete(e);
        };
        k.id = -1, ws.set(e, k), Te(k, s);
      } else
        Ur(e), N();
    }
  }
}
function Ur(e) {
  const t = ws.get(e);
  t && (t.flags |= 8, ws.delete(e));
}
var Uf = Ps().requestIdleCallback || ((e) => setTimeout(e, 1)), qf = Ps().cancelIdleCallback || ((e) => clearTimeout(e)), Xt = (e) => !!e.type.__asyncLoader, Rs = (e) => e.type.__isKeepAlive;
function Bl(e, t) {
  vi(e, "a", t);
}
function Vl(e, t) {
  vi(e, "da", t);
}
function vi(e, t, s = be) {
  const r = e.__wdc || (e.__wdc = () => {
    let n = s;
    for (; n; ) {
      if (n.isDeactivated) return;
      n = n.parent;
    }
    return e();
  });
  if (Ns(t, r, s), s) {
    let n = s.parent;
    for (; n && n.parent; )
      Rs(n.parent.vnode) && jl(r, t, s, n), n = n.parent;
  }
}
function jl(e, t, s, r) {
  const n = Ns(t, e, r, !0);
  hi(() => {
    gr(r[t], n);
  }, s);
}
function Ns(e, t, s = be, r = !1) {
  if (s) {
    const n = s[e] || (s[e] = []), i = t.__weh || (t.__weh = (...l) => {
      rt();
      const a = os(s), o = De(t, s, e, l);
      return a(), nt(), o;
    });
    return r ? n.unshift(i) : n.push(i), i;
  }
}
var lt = (e) => (t, s = be) => {
  (!ss || e === "sp") && Ns(e, (...r) => t(...r), s);
}, Wl = lt("bm"), Ft = lt("m"), Ul = lt("bu"), ql = lt("u"), Lt = lt("bum"), hi = lt("um"), Kl = lt("sp"), Gl = lt("rtg"), Xl = lt("rtc");
function zl(e, t = be) {
  Ns("ec", e, t);
}
var pi = "components", gi = /* @__PURE__ */ Symbol.for("v-ndc");
function Jl(e) {
  return le(e) ? Yl(pi, e, !1) || e : e || gi;
}
function Yl(e, t, s = !0, r = !1) {
  const n = Me || be;
  if (n) {
    const i = n.type;
    if (e === pi) {
      const a = La(i, !1);
      if (a && (a === t || a === Se(t) || a === ks(Se(t)))) return i;
    }
    const l = qr(n[e] || i[e], t) || qr(n.appContext[e], t);
    return !l && r ? i : l;
  }
}
function qr(e, t) {
  return e && (e[t] || e[Se(t)] || e[ks(Se(t))]);
}
function as(e, t, s, r) {
  let n;
  const i = s && s[r], l = W(e);
  if (l || le(e)) {
    const a = l && /* @__PURE__ */ wt(e);
    let o = !1, c = !1;
    a && (o = !/* @__PURE__ */ Le(e), c = /* @__PURE__ */ it(e), e = Ls(e)), n = new Array(e.length);
    for (let u = 0, h = e.length; u < h; u++) n[u] = t(o ? c ? Pt(He(e[u])) : He(e[u]) : e[u], u, void 0, i && i[u]);
  } else if (typeof e == "number") {
    n = new Array(e);
    for (let a = 0; a < e; a++) n[a] = t(a + 1, a, void 0, i && i[a]);
  } else if (Q(e)) if (e[Symbol.iterator]) n = Array.from(e, (a, o) => t(a, o, void 0, i && i[o]));
  else {
    const a = Object.keys(e);
    n = new Array(a.length);
    for (let o = 0, c = a.length; o < c; o++) {
      const u = a[o];
      n[o] = t(e[u], u, o, i && i[o]);
    }
  }
  else n = [];
  return s && (s[r] = n), n;
}
var fr = (e) => e ? Di(e) ? Vs(e) : fr(e.parent) : null, zt = /* @__PURE__ */ ue(/* @__PURE__ */ Object.create(null), {
  $: (e) => e,
  $el: (e) => e.vnode.el,
  $data: (e) => e.data,
  $props: (e) => e.props,
  $attrs: (e) => e.attrs,
  $slots: (e) => e.slots,
  $refs: (e) => e.refs,
  $parent: (e) => fr(e.parent),
  $root: (e) => fr(e.root),
  $host: (e) => e.ce,
  $emit: (e) => e.emit,
  $options: (e) => Ir(e),
  $forceUpdate: (e) => e.f || (e.f = () => {
    Er(e.update);
  }),
  $nextTick: (e) => e.n || (e.n = Tr.bind(e.proxy)),
  $watch: (e) => Ll.bind(e)
}), Ys = (e, t) => e !== Z && !e.__isScriptSetup && Y(e, t), Ql = {
  get({ _: e }, t) {
    if (t === "__v_skip") return !0;
    const { ctx: s, setupState: r, data: n, props: i, accessCache: l, type: a, appContext: o } = e;
    if (t[0] !== "$") {
      const g = l[t];
      if (g !== void 0) switch (g) {
        case 1:
          return r[t];
        case 2:
          return n[t];
        case 4:
          return s[t];
        case 3:
          return i[t];
      }
      else {
        if (Ys(r, t))
          return l[t] = 1, r[t];
        if (n !== Z && Y(n, t))
          return l[t] = 2, n[t];
        if (Y(i, t))
          return l[t] = 3, i[t];
        if (s !== Z && Y(s, t))
          return l[t] = 4, s[t];
        cr && (l[t] = 0);
      }
    }
    const c = zt[t];
    let u, h;
    if (c)
      return t === "$attrs" && me(e.attrs, "get", ""), c(e);
    if ((u = a.__cssModules) && (u = u[t])) return u;
    if (s !== Z && Y(s, t))
      return l[t] = 4, s[t];
    if (h = o.config.globalProperties, Y(h, t)) return h[t];
  },
  set({ _: e }, t, s) {
    const { data: r, setupState: n, ctx: i } = e;
    return Ys(n, t) ? (n[t] = s, !0) : r !== Z && Y(r, t) ? (r[t] = s, !0) : Y(e.props, t) || t[0] === "$" && t.slice(1) in e ? !1 : (i[t] = s, !0);
  },
  has({ _: { data: e, setupState: t, accessCache: s, ctx: r, appContext: n, props: i, type: l } }, a) {
    let o;
    return !!(s[a] || e !== Z && a[0] !== "$" && Y(e, a) || Ys(t, a) || Y(i, a) || Y(r, a) || Y(zt, a) || Y(n.config.globalProperties, a) || (o = l.__cssModules) && o[a]);
  },
  defineProperty(e, t, s) {
    return s.get != null ? e._.accessCache[t] = 0 : Y(s, "value") && this.set(e, t, s.value, null), Reflect.defineProperty(e, t, s);
  }
};
function Kr(e) {
  return W(e) ? e.reduce((t, s) => (t[s] = null, t), {}) : e;
}
var cr = !0;
function Zl(e) {
  const t = Ir(e), s = e.proxy, r = e.ctx;
  cr = !1, t.beforeCreate && Gr(t.beforeCreate, e, "bc");
  const { data: n, computed: i, methods: l, watch: a, provide: o, inject: c, created: u, beforeMount: h, mounted: g, beforeUpdate: y, updated: B, activated: O, deactivated: z, beforeDestroy: N, beforeUnmount: k, destroyed: U, unmounted: D, render: w, renderTracked: A, renderTriggered: I, errorCaptured: H, serverPrefetch: x, expose: S, inheritAttrs: V, components: F, directives: ie, filters: ge } = t;
  if (c && ea(c, r, null), l) for (const ae in l) {
    const ee = l[ae];
    K(ee) && (r[ae] = ee.bind(s));
  }
  if (n) {
    const ae = n.call(s, s);
    Q(ae) && (e.data = /* @__PURE__ */ xt(ae));
  }
  if (cr = !0, i) for (const ae in i) {
    const ee = i[ae], at = _e({
      get: K(ee) ? ee.bind(s, s) : K(ee.get) ? ee.get.bind(s, s) : Ge,
      set: !K(ee) && K(ee.set) ? ee.set.bind(s) : Ge
    });
    Object.defineProperty(r, ae, {
      enumerable: !0,
      configurable: !0,
      get: () => at.value,
      set: (us) => at.value = us
    });
  }
  if (a) for (const ae in a) mi(a[ae], r, s, ae);
  if (o) {
    const ae = K(o) ? o.call(s) : o;
    Reflect.ownKeys(ae).forEach((ee) => {
      kl(ee, ae[ee]);
    });
  }
  u && Gr(u, e, "c");
  function ve(ae, ee) {
    W(ee) ? ee.forEach((at) => ae(at.bind(s))) : ee && ae(ee.bind(s));
  }
  if (ve(Wl, h), ve(Ft, g), ve(Ul, y), ve(ql, B), ve(Bl, O), ve(Vl, z), ve(zl, H), ve(Xl, A), ve(Gl, I), ve(Lt, k), ve(hi, D), ve(Kl, x), W(S))
    if (S.length) {
      const ae = e.exposed || (e.exposed = {});
      S.forEach((ee) => {
        Object.defineProperty(ae, ee, {
          get: () => s[ee],
          set: (at) => s[ee] = at,
          enumerable: !0
        });
      });
    } else e.exposed || (e.exposed = {});
  w && e.render === Ge && (e.render = w), V != null && (e.inheritAttrs = V), F && (e.components = F), ie && (e.directives = ie), x && di(e);
}
function ea(e, t, s = Ge) {
  W(e) && (e = dr(e));
  for (const r in e) {
    const n = e[r];
    let i;
    Q(n) ? "default" in n ? i = gs(n.from || r, n.default, !0) : i = gs(n.from || r) : i = gs(n), /* @__PURE__ */ ye(i) ? Object.defineProperty(t, r, {
      enumerable: !0,
      configurable: !0,
      get: () => i.value,
      set: (l) => i.value = l
    }) : t[r] = i;
  }
}
function Gr(e, t, s) {
  De(W(e) ? e.map((r) => r.bind(t.proxy)) : e.bind(t.proxy), t, s);
}
function mi(e, t, s, r) {
  let n = r.includes(".") ? ii(s, r) : () => s[r];
  if (le(e)) {
    const i = t[e];
    K(i) && Ot(n, i);
  } else if (K(e)) Ot(n, e.bind(s));
  else if (Q(e)) if (W(e)) e.forEach((i) => mi(i, t, s, r));
  else {
    const i = K(e.handler) ? e.handler.bind(s) : t[e.handler];
    K(i) && Ot(n, i, e);
  }
}
function Ir(e) {
  const t = e.type, { mixins: s, extends: r } = t, { mixins: n, optionsCache: i, config: { optionMergeStrategies: l } } = e.appContext, a = i.get(t);
  let o;
  return a ? o = a : !n.length && !s && !r ? o = t : (o = {}, n.length && n.forEach((c) => xs(o, c, l, !0)), xs(o, t, l)), Q(t) && i.set(t, o), o;
}
function xs(e, t, s, r = !1) {
  const { mixins: n, extends: i } = t;
  i && xs(e, i, s, !0), n && n.forEach((l) => xs(e, l, s, !0));
  for (const l in t) if (!(r && l === "expose")) {
    const a = ta[l] || s && s[l];
    e[l] = a ? a(e[l], t[l]) : t[l];
  }
  return e;
}
var ta = {
  data: Xr,
  props: zr,
  emits: zr,
  methods: jt,
  computed: jt,
  beforeCreate: we,
  created: we,
  beforeMount: we,
  mounted: we,
  beforeUpdate: we,
  updated: we,
  beforeDestroy: we,
  beforeUnmount: we,
  destroyed: we,
  unmounted: we,
  activated: we,
  deactivated: we,
  errorCaptured: we,
  serverPrefetch: we,
  components: jt,
  directives: jt,
  watch: ra,
  provide: Xr,
  inject: sa
};
function Xr(e, t) {
  return t ? e ? function() {
    return ue(K(e) ? e.call(this, this) : e, K(t) ? t.call(this, this) : t);
  } : t : e;
}
function sa(e, t) {
  return jt(dr(e), dr(t));
}
function dr(e) {
  if (W(e)) {
    const t = {};
    for (let s = 0; s < e.length; s++) t[e[s]] = e[s];
    return t;
  }
  return e;
}
function we(e, t) {
  return e ? [...new Set([].concat(e, t))] : t;
}
function jt(e, t) {
  return e ? ue(/* @__PURE__ */ Object.create(null), e, t) : t;
}
function zr(e, t) {
  return e ? W(e) && W(t) ? [.../* @__PURE__ */ new Set([...e, ...t])] : ue(/* @__PURE__ */ Object.create(null), Kr(e), Kr(t ?? {})) : t;
}
function ra(e, t) {
  if (!e) return t;
  if (!t) return e;
  const s = ue(/* @__PURE__ */ Object.create(null), e);
  for (const r in t) s[r] = we(e[r], t[r]);
  return s;
}
function bi() {
  return {
    app: null,
    config: {
      isNativeTag: Tn,
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
var na = 0;
function ia(e, t) {
  return function(r, n = null) {
    K(r) || (r = ue({}, r)), n != null && !Q(n) && (n = null);
    const i = bi(), l = /* @__PURE__ */ new WeakSet(), a = [];
    let o = !1;
    const c = i.app = {
      _uid: na++,
      _component: r,
      _props: n,
      _container: null,
      _context: i,
      _instance: null,
      version: Na,
      get config() {
        return i.config;
      },
      set config(u) {
      },
      use(u, ...h) {
        return l.has(u) || (u && K(u.install) ? (l.add(u), u.install(c, ...h)) : K(u) && (l.add(u), u(c, ...h))), c;
      },
      mixin(u) {
        return i.mixins.includes(u) || i.mixins.push(u), c;
      },
      component(u, h) {
        return h ? (i.components[u] = h, c) : i.components[u];
      },
      directive(u, h) {
        return h ? (i.directives[u] = h, c) : i.directives[u];
      },
      mount(u, h, g) {
        if (!o) {
          const y = c._ceVNode || ce(r, n);
          return y.appContext = i, g === !0 ? g = "svg" : g === !1 && (g = void 0), h && t ? t(y, u) : e(y, u, g), o = !0, c._container = u, u.__vue_app__ = c, Vs(y.component);
        }
      },
      onUnmount(u) {
        a.push(u);
      },
      unmount() {
        o && (De(a, c._instance, 16), e(null, c._container), delete c._container.__vue_app__);
      },
      provide(u, h) {
        return i.provides[u] = h, c;
      },
      runWithContext(u) {
        const h = Mt;
        Mt = c;
        try {
          return u();
        } finally {
          Mt = h;
        }
      }
    };
    return c;
  };
}
var Mt = null, la = (e, t) => t === "modelValue" || t === "model-value" ? e.modelModifiers : e[`${t}Modifiers`] || e[`${Se(t)}Modifiers`] || e[`${Ct(t)}Modifiers`];
function aa(e, t, ...s) {
  if (e.isUnmounted) return;
  const r = e.vnode.props || Z;
  let n = s;
  const i = t.startsWith("update:"), l = i && la(r, t.slice(7));
  l && (l.trim && (n = s.map((u) => le(u) ? u.trim() : u)), l.number && (n = s.map(br)));
  let a, o = r[a = qs(t)] || r[a = qs(Se(t))];
  !o && i && (o = r[a = qs(Ct(t))]), o && De(o, e, 6, n);
  const c = r[a + "Once"];
  if (c) {
    if (!e.emitted) e.emitted = {};
    else if (e.emitted[a]) return;
    e.emitted[a] = !0, De(c, e, 6, n);
  }
}
var oa = /* @__PURE__ */ new WeakMap();
function yi(e, t, s = !1) {
  const r = s ? oa : t.emitsCache, n = r.get(e);
  if (n !== void 0) return n;
  const i = e.emits;
  let l = {}, a = !1;
  if (!K(e)) {
    const o = (c) => {
      const u = yi(c, t, !0);
      u && (a = !0, ue(l, u));
    };
    !s && t.mixins.length && t.mixins.forEach(o), e.extends && o(e.extends), e.mixins && e.mixins.forEach(o);
  }
  return !i && !a ? (Q(e) && r.set(e, null), null) : (W(i) ? i.forEach((o) => l[o] = null) : ue(l, i), Q(e) && r.set(e, l), l);
}
function Hs(e, t) {
  return !e || !Is(t) ? !1 : (t = t.slice(2).replace(/Once$/, ""), Y(e, t[0].toLowerCase() + t.slice(1)) || Y(e, Ct(t)) || Y(e, t));
}
function Qs(e) {
  const { type: t, vnode: s, proxy: r, withProxy: n, propsOptions: [i], slots: l, attrs: a, emit: o, render: c, renderCache: u, props: h, data: g, setupState: y, ctx: B, inheritAttrs: O } = e, z = _s(e);
  let N, k;
  try {
    if (s.shapeFlag & 4) {
      const D = n || r, w = D;
      N = qe(c.call(w, D, u, h, y, g, B)), k = a;
    } else {
      const D = t;
      N = qe(D.length > 1 ? D(h, {
        attrs: a,
        slots: l,
        emit: o
      }) : D(h, null)), k = t.props ? a : ua(a);
    }
  } catch (D) {
    Jt.length = 0, Ds(D, e, 1), N = ce(Ce);
  }
  let U = N;
  if (k && O !== !1) {
    const D = Object.keys(k), { shapeFlag: w } = U;
    D.length && w & 7 && (i && D.some($s) && (k = fa(k, i)), U = dt(U, k, !1, !0));
  }
  return s.dirs && (U = dt(U, null, !1, !0), U.dirs = U.dirs ? U.dirs.concat(s.dirs) : s.dirs), s.transition && es(U, s.transition), N = U, _s(z), N;
}
var ua = (e) => {
  let t;
  for (const s in e) (s === "class" || s === "style" || Is(s)) && ((t || (t = {}))[s] = e[s]);
  return t;
}, fa = (e, t) => {
  const s = {};
  for (const r in e) (!$s(r) || !(r.slice(9) in t)) && (s[r] = e[r]);
  return s;
};
function ca(e, t, s) {
  const { props: r, children: n, component: i } = e, { props: l, children: a, patchFlag: o } = t, c = i.emitsOptions;
  if (t.dirs || t.transition) return !0;
  if (s && o >= 0) {
    if (o & 1024) return !0;
    if (o & 16)
      return r ? Jr(r, l, c) : !!l;
    if (o & 8) {
      const u = t.dynamicProps;
      for (let h = 0; h < u.length; h++) {
        const g = u[h];
        if (_i(l, r, g) && !Hs(c, g)) return !0;
      }
    }
  } else
    return (n || a) && (!a || !a.$stable) ? !0 : r === l ? !1 : r ? l ? Jr(r, l, c) : !0 : !!l;
  return !1;
}
function Jr(e, t, s) {
  const r = Object.keys(t);
  if (r.length !== Object.keys(e).length) return !0;
  for (let n = 0; n < r.length; n++) {
    const i = r[n];
    if (_i(t, e, i) && !Hs(s, i)) return !0;
  }
  return !1;
}
function _i(e, t, s) {
  const r = e[s], n = t[s];
  return s === "style" && Q(r) && Q(n) ? !is(r, n) : r !== n;
}
function da({ vnode: e, parent: t, suspense: s }, r) {
  for (; t; ) {
    const n = t.subTree;
    if (n.suspense && n.suspense.activeBranch === e && (n.suspense.vnode.el = n.el = r, e = n), n === e)
      (e = t.vnode).el = r, t = t.parent;
    else break;
  }
  s && s.activeBranch === e && (s.vnode.el = r);
}
var wi = {}, xi = () => Object.create(wi), Ci = (e) => Object.getPrototypeOf(e) === wi;
function va(e, t, s, r = !1) {
  const n = {}, i = xi();
  e.propsDefaults = /* @__PURE__ */ Object.create(null), Si(e, t, n, i);
  for (const l in e.propsOptions[0]) l in n || (n[l] = void 0);
  s ? e.props = r ? n : /* @__PURE__ */ _l(n) : e.type.props ? e.props = n : e.props = i, e.attrs = i;
}
function ha(e, t, s, r) {
  const { props: n, attrs: i, vnode: { patchFlag: l } } = e, a = /* @__PURE__ */ G(n), [o] = e.propsOptions;
  let c = !1;
  if ((r || l > 0) && !(l & 16)) {
    if (l & 8) {
      const u = e.vnode.dynamicProps;
      for (let h = 0; h < u.length; h++) {
        let g = u[h];
        if (Hs(e.emitsOptions, g)) continue;
        const y = t[g];
        if (o) if (Y(i, g))
          y !== i[g] && (i[g] = y, c = !0);
        else {
          const B = Se(g);
          n[B] = vr(o, a, B, y, e, !1);
        }
        else y !== i[g] && (i[g] = y, c = !0);
      }
    }
  } else {
    Si(e, t, n, i) && (c = !0);
    let u;
    for (const h in a) (!t || !Y(t, h) && ((u = Ct(h)) === h || !Y(t, u))) && (o ? s && (s[h] !== void 0 || s[u] !== void 0) && (n[h] = vr(o, a, h, void 0, e, !0)) : delete n[h]);
    if (i !== a)
      for (const h in i) (!t || !Y(t, h)) && (delete i[h], c = !0);
  }
  c && et(e.attrs, "set", "");
}
function Si(e, t, s, r) {
  const [n, i] = e.propsOptions;
  let l = !1, a;
  if (t) for (let o in t) {
    if (Ut(o)) continue;
    const c = t[o];
    let u;
    n && Y(n, u = Se(o)) ? !i || !i.includes(u) ? s[u] = c : (a || (a = {}))[u] = c : Hs(e.emitsOptions, o) || (!(o in r) || c !== r[o]) && (r[o] = c, l = !0);
  }
  if (i) {
    const o = /* @__PURE__ */ G(s), c = a || Z;
    for (let u = 0; u < i.length; u++) {
      const h = i[u];
      s[h] = vr(n, o, h, c[h], e, !Y(c, h));
    }
  }
  return l;
}
function vr(e, t, s, r, n, i) {
  const l = e[s];
  if (l != null) {
    const a = Y(l, "default");
    if (a && r === void 0) {
      const o = l.default;
      if (l.type !== Function && !l.skipFactory && K(o)) {
        const { propsDefaults: c } = n;
        if (s in c) r = c[s];
        else {
          const u = os(n);
          r = c[s] = o.call(null, t), u();
        }
      } else r = o;
      n.ce && n.ce._setProp(s, r);
    }
    l[0] && (i && !a ? r = !1 : l[1] && (r === "" || r === Ct(s)) && (r = !0));
  }
  return r;
}
var pa = /* @__PURE__ */ new WeakMap();
function Ai(e, t, s = !1) {
  const r = s ? pa : t.propsCache, n = r.get(e);
  if (n) return n;
  const i = e.props, l = {}, a = [];
  let o = !1;
  if (!K(e)) {
    const u = (h) => {
      o = !0;
      const [g, y] = Ai(h, t, !0);
      ue(l, g), y && a.push(...y);
    };
    !s && t.mixins.length && t.mixins.forEach(u), e.extends && u(e.extends), e.mixins && e.mixins.forEach(u);
  }
  if (!i && !o)
    return Q(e) && r.set(e, Et), Et;
  if (W(i)) for (let u = 0; u < i.length; u++) {
    const h = Se(i[u]);
    Yr(h) && (l[h] = Z);
  }
  else if (i) for (const u in i) {
    const h = Se(u);
    if (Yr(h)) {
      const g = i[u], y = l[h] = W(g) || K(g) ? { type: g } : ue({}, g), B = y.type;
      let O = !1, z = !0;
      if (W(B)) for (let N = 0; N < B.length; ++N) {
        const k = B[N], U = K(k) && k.name;
        if (U === "Boolean") {
          O = !0;
          break;
        } else U === "String" && (z = !1);
      }
      else O = K(B) && B.name === "Boolean";
      y[0] = O, y[1] = z, (O || Y(y, "default")) && a.push(h);
    }
  }
  const c = [l, a];
  return Q(e) && r.set(e, c), c;
}
function Yr(e) {
  return e[0] !== "$" && !Ut(e);
}
var $r = (e) => e === "_" || e === "_ctx" || e === "$stable", Or = (e) => W(e) ? e.map(qe) : [qe(e)], ga = (e, t, s) => {
  if (t._n) return t;
  const r = ri((...n) => Or(t(...n)), s);
  return r._c = !1, r;
}, Ti = (e, t, s) => {
  const r = e._ctx;
  for (const n in e) {
    if ($r(n)) continue;
    const i = e[n];
    if (K(i)) t[n] = ga(n, i, r);
    else if (i != null) {
      const l = Or(i);
      t[n] = () => l;
    }
  }
}, Ei = (e, t) => {
  const s = Or(t);
  e.slots.default = () => s;
}, Ii = (e, t, s) => {
  for (const r in t) (s || !$r(r)) && (e[r] = t[r]);
}, ma = (e, t, s) => {
  const r = e.slots = xi();
  if (e.vnode.shapeFlag & 32) {
    const n = t._;
    n ? (Ii(r, t, s), s && On(r, "_", n, !0)) : Ti(t, r);
  } else t && Ei(e, t);
}, ba = (e, t, s) => {
  const { vnode: r, slots: n } = e;
  let i = !0, l = Z;
  if (r.shapeFlag & 32) {
    const a = t._;
    a ? s && a === 1 ? i = !1 : Ii(n, t, s) : (i = !t.$stable, Ti(t, n)), l = t;
  } else t && (Ei(e, t), l = { default: 1 });
  if (i)
    for (const a in n) !$r(a) && l[a] == null && delete n[a];
}, Te = Ca;
function ya(e) {
  return _a(e);
}
function _a(e, t) {
  const s = Ps();
  s.__VUE__ = !0;
  const { insert: r, remove: n, patchProp: i, createElement: l, createText: a, createComment: o, setText: c, setElementText: u, parentNode: h, nextSibling: g, setScopeId: y = Ge, insertStaticContent: B } = e, O = (f, d, p, C = null, b = null, m = null, $ = void 0, E = null, T = !!d.dynamicChildren) => {
    if (f === d) return;
    f && !bt(f, d) && (C = cs(f), ot(f, b, m, !0), f = null), d.patchFlag === -2 && (T = !1, d.dynamicChildren = null);
    const { type: _, ref: j, shapeFlag: P } = d;
    switch (_) {
      case Bs:
        z(f, d, p, C);
        break;
      case Ce:
        N(f, d, p, C);
        break;
      case er:
        f == null && k(d, p, C, $);
        break;
      case he:
        F(f, d, p, C, b, m, $, E, T);
        break;
      default:
        P & 1 ? w(f, d, p, C, b, m, $, E, T) : P & 6 ? ie(f, d, p, C, b, m, $, E, T) : (P & 64 || P & 128) && _.process(f, d, p, C, b, m, $, E, T, St);
    }
    j != null && b ? Gt(j, f && f.ref, m, d || f, !d) : j == null && f && f.ref != null && Gt(f.ref, null, m, f, !0);
  }, z = (f, d, p, C) => {
    if (f == null) r(d.el = a(d.children), p, C);
    else {
      const b = d.el = f.el;
      d.children !== f.children && c(b, d.children);
    }
  }, N = (f, d, p, C) => {
    f == null ? r(d.el = o(d.children || ""), p, C) : d.el = f.el;
  }, k = (f, d, p, C) => {
    [f.el, f.anchor] = B(f.children, d, p, C, f.el, f.anchor);
  }, U = ({ el: f, anchor: d }, p, C) => {
    let b;
    for (; f && f !== d; )
      b = g(f), r(f, p, C), f = b;
    r(d, p, C);
  }, D = ({ el: f, anchor: d }) => {
    let p;
    for (; f && f !== d; )
      p = g(f), n(f), f = p;
    n(d);
  }, w = (f, d, p, C, b, m, $, E, T) => {
    if (d.type === "svg" ? $ = "svg" : d.type === "math" && ($ = "mathml"), f == null) A(d, p, C, b, m, $, E, T);
    else {
      const _ = f.el && f.el._isVueCE ? f.el : null;
      try {
        _ && _._beginPatch(), x(f, d, b, m, $, E, T);
      } finally {
        _ && _._endPatch();
      }
    }
  }, A = (f, d, p, C, b, m, $, E) => {
    let T, _;
    const { props: j, shapeFlag: P, transition: R, dirs: q } = f;
    if (T = f.el = l(f.type, m, j && j.is, j), P & 8 ? u(T, f.children) : P & 16 && H(f.children, T, null, C, b, Zs(f, m), $, E), q && vt(f, null, C, "created"), I(T, f, f.scopeId, $, C), j) {
      for (const te in j) te !== "value" && !Ut(te) && i(T, te, null, j[te], m, C);
      "value" in j && i(T, "value", null, j.value, m), (_ = j.onVnodeBeforeMount) && je(_, C, f);
    }
    q && vt(f, null, C, "beforeMount");
    const J = wa(b, R);
    J && R.beforeEnter(T), r(T, d, p), ((_ = j && j.onVnodeMounted) || J || q) && Te(() => {
      _ && je(_, C, f), J && R.enter(T), q && vt(f, null, C, "mounted");
    }, b);
  }, I = (f, d, p, C, b) => {
    if (p && y(f, p), C) for (let m = 0; m < C.length; m++) y(f, C[m]);
    if (b) {
      let m = b.subTree;
      if (d === m || ki(m.type) && (m.ssContent === d || m.ssFallback === d)) {
        const $ = b.vnode;
        I(f, $, $.scopeId, $.slotScopeIds, b.parent);
      }
    }
  }, H = (f, d, p, C, b, m, $, E, T = 0) => {
    for (let _ = T; _ < f.length; _++) O(null, f[_] = E ? Ze(f[_]) : qe(f[_]), d, p, C, b, m, $, E);
  }, x = (f, d, p, C, b, m, $) => {
    const E = d.el = f.el;
    let { patchFlag: T, dynamicChildren: _, dirs: j } = d;
    T |= f.patchFlag & 16;
    const P = f.props || Z, R = d.props || Z;
    let q;
    if (p && ht(p, !1), (q = R.onVnodeBeforeUpdate) && je(q, p, d, f), j && vt(d, f, p, "beforeUpdate"), p && ht(p, !0), (P.innerHTML && R.innerHTML == null || P.textContent && R.textContent == null) && u(E, ""), _ ? S(f.dynamicChildren, _, E, p, C, Zs(d, b), m) : $ || ee(f, d, E, null, p, C, Zs(d, b), m, !1), T > 0) {
      if (T & 16) V(E, P, R, p, b);
      else if (T & 2 && P.class !== R.class && i(E, "class", null, R.class, b), T & 4 && i(E, "style", P.style, R.style, b), T & 8) {
        const J = d.dynamicProps;
        for (let te = 0; te < J.length; te++) {
          const se = J[te], fe = P[se], de = R[se];
          (de !== fe || se === "value") && i(E, se, fe, de, b, p);
        }
      }
      T & 1 && f.children !== d.children && u(E, d.children);
    } else !$ && _ == null && V(E, P, R, p, b);
    ((q = R.onVnodeUpdated) || j) && Te(() => {
      q && je(q, p, d, f), j && vt(d, f, p, "updated");
    }, C);
  }, S = (f, d, p, C, b, m, $) => {
    for (let E = 0; E < d.length; E++) {
      const T = f[E], _ = d[E];
      O(T, _, T.el && (T.type === he || !bt(T, _) || T.shapeFlag & 198) ? h(T.el) : p, null, C, b, m, $, !0);
    }
  }, V = (f, d, p, C, b) => {
    if (d !== p) {
      if (d !== Z)
        for (const m in d) !Ut(m) && !(m in p) && i(f, m, d[m], null, b, C);
      for (const m in p) {
        if (Ut(m)) continue;
        const $ = p[m], E = d[m];
        $ !== E && m !== "value" && i(f, m, E, $, b, C);
      }
      "value" in p && i(f, "value", d.value, p.value, b);
    }
  }, F = (f, d, p, C, b, m, $, E, T) => {
    const _ = d.el = f ? f.el : a(""), j = d.anchor = f ? f.anchor : a("");
    let { patchFlag: P, dynamicChildren: R, slotScopeIds: q } = d;
    q && (E = E ? E.concat(q) : q), f == null ? (r(_, p, C), r(j, p, C), H(d.children || [], p, j, b, m, $, E, T)) : P > 0 && P & 64 && R && f.dynamicChildren && f.dynamicChildren.length === R.length ? (S(f.dynamicChildren, R, p, b, m, $, E), (d.key != null || b && d === b.subTree) && $i(f, d, !0)) : ee(f, d, p, j, b, m, $, E, T);
  }, ie = (f, d, p, C, b, m, $, E, T) => {
    d.slotScopeIds = E, f == null ? d.shapeFlag & 512 ? b.ctx.activate(d, p, C, $, T) : ge(d, p, C, b, m, $, T) : ze(f, d, T);
  }, ge = (f, d, p, C, b, m, $) => {
    const E = f.component = Oa(f, C, b);
    if (Rs(f) && (E.ctx.renderer = St), Ma(E, !1, $), E.asyncDep) {
      if (b && b.registerDep(E, ve, $), !f.el) {
        const T = E.subTree = ce(Ce);
        N(null, T, d, p), f.placeholder = T.el;
      }
    } else ve(E, f, d, p, b, m, $);
  }, ze = (f, d, p) => {
    const C = d.component = f.component;
    if (ca(f, d, p)) if (C.asyncDep && !C.asyncResolved) {
      ae(C, d, p);
      return;
    } else
      C.next = d, C.update();
    else
      d.el = f.el, C.vnode = d;
  }, ve = (f, d, p, C, b, m, $) => {
    const E = () => {
      if (f.isMounted) {
        let { next: P, bu: R, u: q, parent: J, vnode: te } = f;
        {
          const $e = Oi(f);
          if ($e) {
            P && (P.el = te.el, ae(f, P, $)), $e.asyncDep.then(() => {
              Te(() => {
                f.isUnmounted || _();
              }, b);
            });
            return;
          }
        }
        let se = P, fe;
        ht(f, !1), P ? (P.el = te.el, ae(f, P, $)) : P = te, R && ps(R), (fe = P.props && P.props.onVnodeBeforeUpdate) && je(fe, J, P, te), ht(f, !0);
        const de = Qs(f), Re = f.subTree;
        f.subTree = de, O(Re, de, h(Re.el), cs(Re), f, b, m), P.el = de.el, se === null && da(f, de.el), q && Te(q, b), (fe = P.props && P.props.onVnodeUpdated) && Te(() => je(fe, J, P, te), b);
      } else {
        let P;
        const { el: R, props: q } = d, { bm: J, m: te, parent: se, root: fe, type: de } = f, Re = Xt(d);
        if (ht(f, !1), J && ps(J), !Re && (P = q && q.onVnodeBeforeMount) && je(P, se, d), ht(f, !0), R && Us) {
          const $e = () => {
            f.subTree = Qs(f), Us(R, f.subTree, f, b, null);
          };
          Re && de.__asyncHydrate ? de.__asyncHydrate(R, f, $e) : $e();
        } else {
          fe.ce && fe.ce._hasShadowRoot() && fe.ce._injectChildStyle(de, f.parent ? f.parent.type : void 0);
          const $e = f.subTree = Qs(f);
          O(null, $e, p, C, f, b, m), d.el = $e.el;
        }
        if (te && Te(te, b), !Re && (P = q && q.onVnodeMounted)) {
          const $e = d;
          Te(() => je(P, se, $e), b);
        }
        (d.shapeFlag & 256 || se && Xt(se.vnode) && se.vnode.shapeFlag & 256) && f.a && Te(f.a, b), f.isMounted = !0, d = p = C = null;
      }
    };
    f.scope.on();
    const T = f.effect = new Dn(E);
    f.scope.off();
    const _ = f.update = T.run.bind(T), j = f.job = T.runIfDirty.bind(T);
    j.i = f, j.id = f.uid, T.scheduler = () => Er(j), ht(f, !0), _();
  }, ae = (f, d, p) => {
    d.component = f;
    const C = f.vnode.props;
    f.vnode = d, f.next = null, ha(f, d.props, C, p), ba(f, d.children, p), rt(), Vr(f), nt();
  }, ee = (f, d, p, C, b, m, $, E, T = !1) => {
    const _ = f && f.children, j = f ? f.shapeFlag : 0, P = d.children, { patchFlag: R, shapeFlag: q } = d;
    if (R > 0) {
      if (R & 128) {
        us(_, P, p, C, b, m, $, E, T);
        return;
      } else if (R & 256) {
        at(_, P, p, C, b, m, $, E, T);
        return;
      }
    }
    q & 8 ? (j & 16 && Dt(_, b, m), P !== _ && u(p, P)) : j & 16 ? q & 16 ? us(_, P, p, C, b, m, $, E, T) : Dt(_, b, m, !0) : (j & 8 && u(p, ""), q & 16 && H(P, p, C, b, m, $, E, T));
  }, at = (f, d, p, C, b, m, $, E, T) => {
    f = f || Et, d = d || Et;
    const _ = f.length, j = d.length, P = Math.min(_, j);
    let R;
    for (R = 0; R < P; R++) {
      const q = d[R] = T ? Ze(d[R]) : qe(d[R]);
      O(f[R], q, p, null, b, m, $, E, T);
    }
    _ > j ? Dt(f, b, m, !0, !1, P) : H(d, p, C, b, m, $, E, T, P);
  }, us = (f, d, p, C, b, m, $, E, T) => {
    let _ = 0;
    const j = d.length;
    let P = f.length - 1, R = j - 1;
    for (; _ <= P && _ <= R; ) {
      const q = f[_], J = d[_] = T ? Ze(d[_]) : qe(d[_]);
      if (bt(q, J)) O(q, J, p, null, b, m, $, E, T);
      else break;
      _++;
    }
    for (; _ <= P && _ <= R; ) {
      const q = f[P], J = d[R] = T ? Ze(d[R]) : qe(d[R]);
      if (bt(q, J)) O(q, J, p, null, b, m, $, E, T);
      else break;
      P--, R--;
    }
    if (_ > P) {
      if (_ <= R) {
        const q = R + 1, J = q < j ? d[q].el : C;
        for (; _ <= R; )
          O(null, d[_] = T ? Ze(d[_]) : qe(d[_]), p, J, b, m, $, E, T), _++;
      }
    } else if (_ > R) for (; _ <= P; )
      ot(f[_], b, m, !0), _++;
    else {
      const q = _, J = _, te = /* @__PURE__ */ new Map();
      for (_ = J; _ <= R; _++) {
        const Oe = d[_] = T ? Ze(d[_]) : qe(d[_]);
        Oe.key != null && te.set(Oe.key, _);
      }
      let se, fe = 0;
      const de = R - J + 1;
      let Re = !1, $e = 0;
      const Rt = new Array(de);
      for (_ = 0; _ < de; _++) Rt[_] = 0;
      for (_ = q; _ <= P; _++) {
        const Oe = f[_];
        if (fe >= de) {
          ot(Oe, b, m, !0);
          continue;
        }
        let Ve;
        if (Oe.key != null) Ve = te.get(Oe.key);
        else for (se = J; se <= R; se++) if (Rt[se - J] === 0 && bt(Oe, d[se])) {
          Ve = se;
          break;
        }
        Ve === void 0 ? ot(Oe, b, m, !0) : (Rt[Ve - J] = _ + 1, Ve >= $e ? $e = Ve : Re = !0, O(Oe, d[Ve], p, null, b, m, $, E, T), fe++);
      }
      const Fr = Re ? xa(Rt) : Et;
      for (se = Fr.length - 1, _ = de - 1; _ >= 0; _--) {
        const Oe = J + _, Ve = d[Oe], Lr = d[Oe + 1], Dr = Oe + 1 < j ? Lr.el || Mi(Lr) : C;
        Rt[_] === 0 ? O(null, Ve, p, Dr, b, m, $, E, T) : Re && (se < 0 || _ !== Fr[se] ? fs(Ve, p, Dr, 2) : se--);
      }
    }
  }, fs = (f, d, p, C, b = null) => {
    const { el: m, type: $, transition: E, children: T, shapeFlag: _ } = f;
    if (_ & 6) {
      fs(f.component.subTree, d, p, C);
      return;
    }
    if (_ & 128) {
      f.suspense.move(d, p, C);
      return;
    }
    if (_ & 64) {
      $.move(f, d, p, St);
      return;
    }
    if ($ === he) {
      r(m, d, p);
      for (let j = 0; j < T.length; j++) fs(T[j], d, p, C);
      r(f.anchor, d, p);
      return;
    }
    if ($ === er) {
      U(f, d, p);
      return;
    }
    if (C !== 2 && _ & 1 && E) if (C === 0) E.persisted && !m[Fe] ? r(m, d, p) : (E.beforeEnter(m), r(m, d, p), Te(() => E.enter(m), b));
    else {
      const { leave: j, delayLeave: P, afterLeave: R } = E, q = () => {
        f.ctx.isUnmounted ? n(m) : r(m, d, p);
      }, J = () => {
        const te = m._isLeaving || !!m[Fe];
        m._isLeaving && m[Fe](!0), E.persisted && !te ? q() : j(m, () => {
          q(), R && R();
        });
      };
      P ? P(m, q, J) : J();
    }
    else r(m, d, p);
  }, ot = (f, d, p, C = !1, b = !1) => {
    const { type: m, props: $, ref: E, children: T, dynamicChildren: _, shapeFlag: j, patchFlag: P, dirs: R, cacheIndex: q, memo: J } = f;
    if (P === -2 && (b = !1), E != null && (rt(), Gt(E, null, p, f, !0), nt()), q != null && (d.renderCache[q] = void 0), j & 256) {
      d.ctx.deactivate(f);
      return;
    }
    const te = j & 1 && R, se = !Xt(f);
    let fe;
    if (se && (fe = $ && $.onVnodeBeforeUnmount) && je(fe, d, f), j & 6) Wi(f.component, p, C);
    else {
      if (j & 128) {
        f.suspense.unmount(p, C);
        return;
      }
      te && vt(f, null, d, "beforeUnmount"), j & 64 ? f.type.remove(f, d, p, St, C) : _ && !_.hasOnce && (m !== he || P > 0 && P & 64) ? Dt(_, d, p, !1, !0) : (m === he && P & 384 || !b && j & 16) && Dt(T, d, p), C && kr(f);
    }
    const de = J != null && q == null;
    (se && (fe = $ && $.onVnodeUnmounted) || te || de) && Te(() => {
      fe && je(fe, d, f), te && vt(f, null, d, "unmounted"), de && (f.el = null);
    }, p);
  }, kr = (f) => {
    const { type: d, el: p, anchor: C, transition: b } = f;
    if (d === he) {
      ji(p, C);
      return;
    }
    if (d === er) {
      D(f);
      return;
    }
    const m = () => {
      n(p), b && !b.persisted && b.afterLeave && b.afterLeave();
    };
    if (f.shapeFlag & 1 && b && !b.persisted) {
      const { leave: $, delayLeave: E } = b, T = () => $(p, m);
      E ? E(f.el, m, T) : T();
    } else m();
  }, ji = (f, d) => {
    let p;
    for (; f !== d; )
      p = g(f), n(f), f = p;
    n(d);
  }, Wi = (f, d, p) => {
    const { bum: C, scope: b, job: m, subTree: $, um: E, m: T, a: _ } = f;
    Qr(T), Qr(_), C && ps(C), b.stop(), m && (m.flags |= 8, ot($, f, d, p)), E && Te(E, d), Te(() => {
      f.isUnmounted = !0;
    }, d);
  }, Dt = (f, d, p, C = !1, b = !1, m = 0) => {
    for (let $ = m; $ < f.length; $++) ot(f[$], d, p, C, b);
  }, cs = (f) => {
    if (f.shapeFlag & 6) return cs(f.component.subTree);
    if (f.shapeFlag & 128) return f.suspense.next();
    const d = g(f.anchor || f.el), p = d && d[Dl];
    return p ? g(p) : d;
  };
  let js = !1;
  const Pr = (f, d, p) => {
    let C;
    f == null ? d._vnode && (ot(d._vnode, null, null, !0), C = d._vnode.component) : O(d._vnode || null, f, d, null, null, null, p), d._vnode = f, js || (js = !0, Vr(C), ei(), js = !1);
  }, St = {
    p: O,
    um: ot,
    m: fs,
    r: kr,
    mt: ge,
    mc: H,
    pc: ee,
    pbc: S,
    n: cs,
    o: e
  };
  let Ws, Us;
  return t && ([Ws, Us] = t(St)), {
    render: Pr,
    hydrate: Ws,
    createApp: ia(Pr, Ws)
  };
}
function Zs({ type: e, props: t }, s) {
  return s === "svg" && e === "foreignObject" || s === "mathml" && e === "annotation-xml" && t && t.encoding && t.encoding.includes("html") ? void 0 : s;
}
function ht({ effect: e, job: t }, s) {
  s ? (e.flags |= 32, t.flags |= 4) : (e.flags &= -33, t.flags &= -5);
}
function wa(e, t) {
  return (!e || e && !e.pendingBranch) && t && !t.persisted;
}
function $i(e, t, s = !1) {
  const r = e.children, n = t.children;
  if (W(r) && W(n)) for (let i = 0; i < r.length; i++) {
    const l = r[i];
    let a = n[i];
    a.shapeFlag & 1 && !a.dynamicChildren && ((a.patchFlag <= 0 || a.patchFlag === 32) && (a = n[i] = Ze(n[i]), a.el = l.el), !s && a.patchFlag !== -2 && $i(l, a)), a.type === Bs && (a.patchFlag === -1 && (a = n[i] = Ze(a)), a.el = l.el), a.type === Ce && !a.el && (a.el = l.el);
  }
}
function xa(e) {
  const t = e.slice(), s = [0];
  let r, n, i, l, a;
  const o = e.length;
  for (r = 0; r < o; r++) {
    const c = e[r];
    if (c !== 0) {
      if (n = s[s.length - 1], e[n] < c) {
        t[r] = n, s.push(r);
        continue;
      }
      for (i = 0, l = s.length - 1; i < l; )
        a = i + l >> 1, e[s[a]] < c ? i = a + 1 : l = a;
      c < e[s[i]] && (i > 0 && (t[r] = s[i - 1]), s[i] = r);
    }
  }
  for (i = s.length, l = s[i - 1]; i-- > 0; )
    s[i] = l, l = t[l];
  return s;
}
function Oi(e) {
  const t = e.subTree.component;
  if (t) return t.asyncDep && !t.asyncResolved ? t : Oi(t);
}
function Qr(e) {
  if (e) for (let t = 0; t < e.length; t++) e[t].flags |= 8;
}
function Mi(e) {
  if (e.placeholder) return e.placeholder;
  const t = e.component;
  return t ? Mi(t.subTree) : null;
}
var ki = (e) => e.__isSuspense;
function Ca(e, t) {
  t && t.pendingBranch ? W(e) ? t.effects.push(...e) : t.effects.push(e) : Ml(e);
}
var he = /* @__PURE__ */ Symbol.for("v-fgt"), Bs = /* @__PURE__ */ Symbol.for("v-txt"), Ce = /* @__PURE__ */ Symbol.for("v-cmt"), er = /* @__PURE__ */ Symbol.for("v-stc"), Jt = [], ke = null;
function M(e = !1) {
  Jt.push(ke = e ? null : []);
}
function Sa() {
  Jt.pop(), ke = Jt[Jt.length - 1] || null;
}
var ts = 1;
function Cs(e, t = !1) {
  ts += e, e < 0 && ke && t && (ke.hasOnce = !0);
}
function Pi(e) {
  return e.dynamicChildren = ts > 0 ? ke || Et : null, Sa(), ts > 0 && ke && ke.push(e), e;
}
function L(e, t, s, r, n, i) {
  return Pi(v(e, t, s, r, n, i, !0));
}
function ct(e, t, s, r, n) {
  return Pi(ce(e, t, s, r, n, !0));
}
function Ss(e) {
  return e ? e.__v_isVNode === !0 : !1;
}
function bt(e, t) {
  return e.type === t.type && e.key === t.key;
}
var Fi = ({ key: e }) => e ?? null, ms = ({ ref: e, ref_key: t, ref_for: s }) => (typeof e == "number" && (e = "" + e), e != null ? le(e) || /* @__PURE__ */ ye(e) || K(e) ? {
  i: Me,
  r: e,
  k: t,
  f: !!s
} : e : null);
function v(e, t = null, s = null, r = 0, n = null, i = e === he ? 0 : 1, l = !1, a = !1) {
  const o = {
    __v_isVNode: !0,
    __v_skip: !0,
    type: e,
    props: t,
    key: t && Fi(t),
    ref: t && ms(t),
    scopeId: si,
    slotScopeIds: null,
    children: s,
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
    patchFlag: r,
    dynamicProps: n,
    dynamicChildren: null,
    appContext: null,
    ctx: Me
  };
  return a ? (Mr(o, s), i & 128 && e.normalize(o)) : s && (o.shapeFlag |= le(s) ? 8 : 16), ts > 0 && !l && ke && (o.patchFlag > 0 || i & 6) && o.patchFlag !== 32 && ke.push(o), o;
}
var ce = Aa;
function Aa(e, t = null, s = null, r = 0, n = null, i = !1) {
  if ((!e || e === gi) && (e = Ce), Ss(e)) {
    const a = dt(e, t, !0);
    return s && Mr(a, s), ts > 0 && !i && ke && (a.shapeFlag & 6 ? ke[ke.indexOf(e)] = a : ke.push(a)), a.patchFlag = -2, a;
  }
  if (Da(e) && (e = e.__vccOpts), t) {
    t = Ta(t);
    let { class: a, style: o } = t;
    a && !le(a) && (t.class = Be(a)), Q(o) && (/* @__PURE__ */ Ar(o) && !W(o) && (o = ue({}, o)), t.style = Fs(o));
  }
  const l = le(e) ? 1 : ki(e) ? 128 : li(e) ? 64 : Q(e) ? 4 : K(e) ? 2 : 0;
  return v(e, t, s, r, n, l, i, !0);
}
function Ta(e) {
  return e ? /* @__PURE__ */ Ar(e) || Ci(e) ? ue({}, e) : e : null;
}
function dt(e, t, s = !1, r = !1) {
  const { props: n, ref: i, patchFlag: l, children: a, transition: o } = e, c = t ? Ea(n || {}, t) : n, u = {
    __v_isVNode: !0,
    __v_skip: !0,
    type: e.type,
    props: c,
    key: c && Fi(c),
    ref: t && t.ref ? s && i ? W(i) ? i.concat(ms(t)) : [i, ms(t)] : ms(t) : i,
    scopeId: e.scopeId,
    slotScopeIds: e.slotScopeIds,
    children: a,
    target: e.target,
    targetStart: e.targetStart,
    targetAnchor: e.targetAnchor,
    staticCount: e.staticCount,
    shapeFlag: e.shapeFlag,
    patchFlag: t && e.type !== he ? l === -1 ? 16 : l | 16 : l,
    dynamicProps: e.dynamicProps,
    dynamicChildren: e.dynamicChildren,
    appContext: e.appContext,
    dirs: e.dirs,
    transition: o,
    component: e.component,
    suspense: e.suspense,
    ssContent: e.ssContent && dt(e.ssContent),
    ssFallback: e.ssFallback && dt(e.ssFallback),
    placeholder: e.placeholder,
    el: e.el,
    anchor: e.anchor,
    ctx: e.ctx,
    ce: e.ce
  };
  return o && r && es(u, o.clone(u)), u;
}
function Ie(e = " ", t = 0) {
  return ce(Bs, null, e, t);
}
function oe(e = "", t = !1) {
  return t ? (M(), ct(Ce, null, e)) : ce(Ce, null, e);
}
function qe(e) {
  return e == null || typeof e == "boolean" ? ce(Ce) : W(e) ? ce(he, null, e.slice()) : Ss(e) ? Ze(e) : ce(Bs, null, String(e));
}
function Ze(e) {
  return e.el === null && e.patchFlag !== -1 || e.memo ? e : dt(e);
}
function Mr(e, t) {
  let s = 0;
  const { shapeFlag: r } = e;
  if (t == null) t = null;
  else if (W(t)) s = 16;
  else if (typeof t == "object") if (r & 65) {
    const n = t.default;
    n && (n._c && (n._d = !1), Mr(e, n()), n._c && (n._d = !0));
    return;
  } else {
    s = 32;
    const n = t._;
    !n && !Ci(t) ? t._ctx = Me : n === 3 && Me && (Me.slots._ === 1 ? t._ = 1 : (t._ = 2, e.patchFlag |= 1024));
  }
  else K(t) ? (t = {
    default: t,
    _ctx: Me
  }, s = 32) : (t = String(t), r & 64 ? (s = 16, t = [Ie(t)]) : s = 8);
  e.children = t, e.shapeFlag |= s;
}
function Ea(...e) {
  const t = {};
  for (let s = 0; s < e.length; s++) {
    const r = e[s];
    for (const n in r) if (n === "class")
      t.class !== r.class && (t.class = Be([t.class, r.class]));
    else if (n === "style") t.style = Fs([t.style, r.style]);
    else if (Is(n)) {
      const i = t[n], l = r[n];
      l && i !== l && !(W(i) && i.includes(l)) ? t[n] = i ? [].concat(i, l) : l : l == null && i == null && !$s(n) && (t[n] = l);
    } else n !== "" && (t[n] = r[n]);
  }
  return t;
}
function je(e, t, s, r = null) {
  De(e, t, 7, [s, r]);
}
var Ia = bi(), $a = 0;
function Oa(e, t, s) {
  const r = e.type, n = (t ? t.appContext : e.appContext) || Ia, i = {
    uid: $a++,
    vnode: e,
    type: r,
    parent: t,
    appContext: n,
    root: null,
    next: null,
    subTree: null,
    effect: null,
    update: null,
    job: null,
    scope: new tl(!0),
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
    propsOptions: Ai(r, n),
    emitsOptions: yi(r, n),
    emit: null,
    emitted: null,
    propsDefaults: Z,
    inheritAttrs: r.inheritAttrs,
    ctx: Z,
    data: Z,
    props: Z,
    attrs: Z,
    slots: Z,
    refs: Z,
    setupState: Z,
    setupContext: null,
    suspense: s,
    suspenseId: s ? s.pendingId : 0,
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
  return i.ctx = { _: i }, i.root = t ? t.root : i, i.emit = aa.bind(null, i), e.ce && e.ce(i), i;
}
var be = null, Li = () => be || Me, As, hr;
{
  const e = Ps(), t = (s, r) => {
    let n;
    return (n = e[s]) || (n = e[s] = []), n.push(r), (i) => {
      n.length > 1 ? n.forEach((l) => l(i)) : n[0](i);
    };
  };
  As = t("__VUE_INSTANCE_SETTERS__", (s) => be = s), hr = t("__VUE_SSR_SETTERS__", (s) => ss = s);
}
var os = (e) => {
  const t = be;
  return As(e), e.scope.on(), () => {
    e.scope.off(), As(t);
  };
}, Zr = () => {
  be && be.scope.off(), As(null);
};
function Di(e) {
  return e.vnode.shapeFlag & 4;
}
var ss = !1;
function Ma(e, t = !1, s = !1) {
  t && hr(t);
  const { props: r, children: n } = e.vnode, i = Di(e);
  va(e, r, i, t), ma(e, n, s || t);
  const l = i ? ka(e, t) : void 0;
  return t && hr(!1), l;
}
function ka(e, t) {
  const s = e.type;
  e.accessCache = /* @__PURE__ */ Object.create(null), e.proxy = new Proxy(e.ctx, Ql);
  const { setup: r } = s;
  if (r) {
    rt();
    const n = e.setupContext = r.length > 1 ? Fa(e) : null, i = os(e), l = ls(r, e, 0, [e.props, n]), a = En(l);
    if (nt(), i(), (a || e.sp) && !Xt(e) && di(e), a) {
      if (l.then(Zr, Zr), t) return l.then((o) => {
        en(e, o, t);
      }).catch((o) => {
        Ds(o, e, 0);
      });
      e.asyncDep = l;
    } else en(e, l, t);
  } else Ri(e, t);
}
function en(e, t, s) {
  K(t) ? e.type.__ssrInlineRender ? e.ssrRender = t : e.render = t : Q(t) && (e.setupState = Yn(t)), Ri(e, s);
}
var tn, sn;
function Ri(e, t, s) {
  const r = e.type;
  if (!e.render) {
    if (!t && tn && !r.render) {
      const n = r.template || Ir(e).template;
      if (n) {
        const { isCustomElement: i, compilerOptions: l } = e.appContext.config, { delimiters: a, compilerOptions: o } = r, c = ue(ue({
          isCustomElement: i,
          delimiters: a
        }, l), o);
        r.render = tn(n, c);
      }
    }
    e.render = r.render || Ge, sn && sn(e);
  }
  {
    const n = os(e);
    rt();
    try {
      Zl(e);
    } finally {
      nt(), n();
    }
  }
}
var Pa = { get(e, t) {
  return me(e, "get", ""), e[t];
} };
function Fa(e) {
  const t = (s) => {
    e.exposed = s || {};
  };
  return {
    attrs: new Proxy(e.attrs, Pa),
    slots: e.slots,
    emit: e.emit,
    expose: t
  };
}
function Vs(e) {
  return e.exposed ? e.exposeProxy || (e.exposeProxy = new Proxy(Yn(wl(e.exposed)), {
    get(t, s) {
      if (s in t) return t[s];
      if (s in zt) return zt[s](e);
    },
    has(t, s) {
      return s in t || s in zt;
    }
  })) : e.proxy;
}
function La(e, t = !0) {
  return K(e) ? e.displayName || e.name : e.name || t && e.__name;
}
function Da(e) {
  return K(e) && "__vccOpts" in e;
}
var _e = (e, t) => /* @__PURE__ */ Tl(e, t, ss);
function Ra(e, t, s) {
  try {
    Cs(-1);
    const r = arguments.length;
    return r === 2 ? Q(t) && !W(t) ? Ss(t) ? ce(e, null, [t]) : ce(e, t) : ce(e, null, t) : (r > 3 ? s = Array.prototype.slice.call(arguments, 2) : r === 3 && Ss(s) && (s = [s]), ce(e, t, s));
  } finally {
    Cs(1);
  }
}
var Na = "3.5.35", pr = void 0, rn = typeof window < "u" && window.trustedTypes;
if (rn) try {
  pr = /* @__PURE__ */ rn.createPolicy("vue", { createHTML: (e) => e });
} catch {
}
var Ni = pr ? (e) => pr.createHTML(e) : (e) => e, Ha = "http://www.w3.org/2000/svg", Ba = "http://www.w3.org/1998/Math/MathML", Qe = typeof document < "u" ? document : null, nn = Qe && /* @__PURE__ */ Qe.createElement("template"), Va = {
  insert: (e, t, s) => {
    t.insertBefore(e, s || null);
  },
  remove: (e) => {
    const t = e.parentNode;
    t && t.removeChild(e);
  },
  createElement: (e, t, s, r) => {
    const n = t === "svg" ? Qe.createElementNS(Ha, e) : t === "mathml" ? Qe.createElementNS(Ba, e) : s ? Qe.createElement(e, { is: s }) : Qe.createElement(e);
    return e === "select" && r && r.multiple != null && n.setAttribute("multiple", r.multiple), n;
  },
  createText: (e) => Qe.createTextNode(e),
  createComment: (e) => Qe.createComment(e),
  setText: (e, t) => {
    e.nodeValue = t;
  },
  setElementText: (e, t) => {
    e.textContent = t;
  },
  parentNode: (e) => e.parentNode,
  nextSibling: (e) => e.nextSibling,
  querySelector: (e) => Qe.querySelector(e),
  setScopeId(e, t) {
    e.setAttribute(t, "");
  },
  insertStaticContent(e, t, s, r, n, i) {
    const l = s ? s.previousSibling : t.lastChild;
    if (n && (n === i || n.nextSibling)) for (; t.insertBefore(n.cloneNode(!0), s), !(n === i || !(n = n.nextSibling)); )
      ;
    else {
      nn.innerHTML = Ni(r === "svg" ? `<svg>${e}</svg>` : r === "mathml" ? `<math>${e}</math>` : e);
      const a = nn.content;
      if (r === "svg" || r === "mathml") {
        const o = a.firstChild;
        for (; o.firstChild; ) a.appendChild(o.firstChild);
        a.removeChild(o);
      }
      t.insertBefore(a, s);
    }
    return [l ? l.nextSibling : t.firstChild, s ? s.previousSibling : t.lastChild];
  }
}, ut = "transition", Bt = "animation", rs = /* @__PURE__ */ Symbol("_vtc"), Hi = {
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
}, ja = /* @__PURE__ */ ue({}, ai, Hi), Wa = (e) => (e.displayName = "Transition", e.props = ja, e), Ua = /* @__PURE__ */ Wa((e, { slots: t }) => Ra(Hl, qa(e), t)), pt = (e, t = []) => {
  W(e) ? e.forEach((s) => s(...t)) : e && e(...t);
}, ln = (e) => e ? W(e) ? e.some((t) => t.length > 1) : e.length > 1 : !1;
function qa(e) {
  const t = {};
  for (const F in e) F in Hi || (t[F] = e[F]);
  if (e.css === !1) return t;
  const { name: s = "v", type: r, duration: n, enterFromClass: i = `${s}-enter-from`, enterActiveClass: l = `${s}-enter-active`, enterToClass: a = `${s}-enter-to`, appearFromClass: o = i, appearActiveClass: c = l, appearToClass: u = a, leaveFromClass: h = `${s}-leave-from`, leaveActiveClass: g = `${s}-leave-active`, leaveToClass: y = `${s}-leave-to` } = e, B = Ka(n), O = B && B[0], z = B && B[1], { onBeforeEnter: N, onEnter: k, onEnterCancelled: U, onLeave: D, onLeaveCancelled: w, onBeforeAppear: A = N, onAppear: I = k, onAppearCancelled: H = U } = t, x = (F, ie, ge, ze) => {
    F._enterCancelled = ze, gt(F, ie ? u : a), gt(F, ie ? c : l), ge && ge();
  }, S = (F, ie) => {
    F._isLeaving = !1, gt(F, h), gt(F, y), gt(F, g), ie && ie();
  }, V = (F) => (ie, ge) => {
    const ze = F ? I : k, ve = () => x(ie, F, ge);
    pt(ze, [ie, ve]), an(() => {
      gt(ie, F ? o : i), Ye(ie, F ? u : a), ln(ze) || on(ie, r, O, ve);
    });
  };
  return ue(t, {
    onBeforeEnter(F) {
      pt(N, [F]), Ye(F, i), Ye(F, l);
    },
    onBeforeAppear(F) {
      pt(A, [F]), Ye(F, o), Ye(F, c);
    },
    onEnter: V(!1),
    onAppear: V(!0),
    onLeave(F, ie) {
      F._isLeaving = !0;
      const ge = () => S(F, ie);
      Ye(F, h), F._enterCancelled ? (Ye(F, g), cn(F)) : (cn(F), Ye(F, g)), an(() => {
        F._isLeaving && (gt(F, h), Ye(F, y), ln(D) || on(F, r, z, ge));
      }), pt(D, [F, ge]);
    },
    onEnterCancelled(F) {
      x(F, !1, void 0, !0), pt(U, [F]);
    },
    onAppearCancelled(F) {
      x(F, !0, void 0, !0), pt(H, [F]);
    },
    onLeaveCancelled(F) {
      S(F), pt(w, [F]);
    }
  });
}
function Ka(e) {
  if (e == null) return null;
  if (Q(e)) return [tr(e.enter), tr(e.leave)];
  {
    const t = tr(e);
    return [t, t];
  }
}
function tr(e) {
  return Xi(e);
}
function Ye(e, t) {
  t.split(/\s+/).forEach((s) => s && e.classList.add(s)), (e[rs] || (e[rs] = /* @__PURE__ */ new Set())).add(t);
}
function gt(e, t) {
  t.split(/\s+/).forEach((r) => r && e.classList.remove(r));
  const s = e[rs];
  s && (s.delete(t), s.size || (e[rs] = void 0));
}
function an(e) {
  requestAnimationFrame(() => {
    requestAnimationFrame(e);
  });
}
var Ga = 0;
function on(e, t, s, r) {
  const n = e._endId = ++Ga, i = () => {
    n === e._endId && r();
  };
  if (s != null) return setTimeout(i, s);
  const { type: l, timeout: a, propCount: o } = Xa(e, t);
  if (!l) return r();
  const c = l + "end";
  let u = 0;
  const h = () => {
    e.removeEventListener(c, g), i();
  }, g = (y) => {
    y.target === e && ++u >= o && h();
  };
  setTimeout(() => {
    u < o && h();
  }, a + 1), e.addEventListener(c, g);
}
function Xa(e, t) {
  const s = window.getComputedStyle(e), r = (B) => (s[B] || "").split(", "), n = r(`${ut}Delay`), i = r(`${ut}Duration`), l = un(n, i), a = r(`${Bt}Delay`), o = r(`${Bt}Duration`), c = un(a, o);
  let u = null, h = 0, g = 0;
  t === ut ? l > 0 && (u = ut, h = l, g = i.length) : t === Bt ? c > 0 && (u = Bt, h = c, g = o.length) : (h = Math.max(l, c), u = h > 0 ? l > c ? ut : Bt : null, g = u ? u === ut ? i.length : o.length : 0);
  const y = u === ut && /\b(?:transform|all)(?:,|$)/.test(r(`${ut}Property`).toString());
  return {
    type: u,
    timeout: h,
    propCount: g,
    hasTransform: y
  };
}
function un(e, t) {
  for (; e.length < t.length; ) e = e.concat(e);
  return Math.max(...t.map((s, r) => fn(s) + fn(e[r])));
}
function fn(e) {
  return e === "auto" ? 0 : Number(e.slice(0, -1).replace(",", ".")) * 1e3;
}
function cn(e) {
  return (e ? e.ownerDocument : document).body.offsetHeight;
}
function za(e, t, s) {
  const r = e[rs];
  r && (t = (t ? [t, ...r] : [...r]).join(" ")), t == null ? e.removeAttribute("class") : s ? e.setAttribute("class", t) : e.className = t;
}
var dn = /* @__PURE__ */ Symbol("_vod"), Ja = /* @__PURE__ */ Symbol("_vsh"), Ya = /* @__PURE__ */ Symbol(""), Qa = /(?:^|;)\s*display\s*:/;
function Za(e, t, s) {
  const r = e.style, n = le(s);
  let i = !1;
  if (s && !n) {
    if (t) if (le(t))
      for (const l of t.split(";")) {
        const a = l.slice(0, l.indexOf(":")).trim();
        s[a] == null && Wt(r, a, "");
      }
    else for (const l in t) s[l] == null && Wt(r, l, "");
    for (const l in s) {
      l === "display" && (i = !0);
      const a = s[l];
      a != null ? to(e, l, !le(t) && t ? t[l] : void 0, a) || Wt(r, l, a) : Wt(r, l, "");
    }
  } else if (n) {
    if (t !== s) {
      const l = r[Ya];
      l && (s += ";" + l), r.cssText = s, i = Qa.test(s);
    }
  } else t && e.removeAttribute("style");
  dn in e && (e[dn] = i ? r.display : "", e[Ja] && (r.display = "none"));
}
var vn = /\s*!important$/;
function Wt(e, t, s) {
  if (W(s)) s.forEach((r) => Wt(e, t, r));
  else if (s == null && (s = ""), t.startsWith("--")) e.setProperty(t, s);
  else {
    const r = eo(e, t);
    vn.test(s) ? e.setProperty(Ct(r), s.replace(vn, ""), "important") : e[r] = s;
  }
}
var hn = [
  "Webkit",
  "Moz",
  "ms"
], sr = {};
function eo(e, t) {
  const s = sr[t];
  if (s) return s;
  let r = Se(t);
  if (r !== "filter" && r in e) return sr[t] = r;
  r = ks(r);
  for (let n = 0; n < hn.length; n++) {
    const i = hn[n] + r;
    if (i in e) return sr[t] = i;
  }
  return t;
}
function to(e, t, s, r) {
  return e.tagName === "TEXTAREA" && (t === "width" || t === "height") && le(r) && s === r;
}
var pn = "http://www.w3.org/1999/xlink";
function gn(e, t, s, r, n, i = Zi(t)) {
  r && t.startsWith("xlink:") ? s == null ? e.removeAttributeNS(pn, t.slice(6, t.length)) : e.setAttributeNS(pn, t, s) : s == null || i && !kn(s) ? e.removeAttribute(t) : e.setAttribute(t, i ? "" : Xe(s) ? String(s) : s);
}
function mn(e, t, s, r, n) {
  if (t === "innerHTML" || t === "textContent") {
    s != null && (e[t] = t === "innerHTML" ? Ni(s) : s);
    return;
  }
  const i = e.tagName;
  if (t === "value" && i !== "PROGRESS" && !i.includes("-")) {
    const a = i === "OPTION" ? e.getAttribute("value") || "" : e.value, o = s == null ? e.type === "checkbox" ? "on" : "" : String(s);
    (a !== o || !("_value" in e)) && (e.value = o), s == null && e.removeAttribute(t), e._value = s;
    return;
  }
  let l = !1;
  if (s === "" || s == null) {
    const a = typeof e[t];
    a === "boolean" ? s = kn(s) : s == null && a === "string" ? (s = "", l = !0) : a === "number" && (s = 0, l = !0);
  }
  try {
    e[t] = s;
  } catch {
  }
  l && e.removeAttribute(n || t);
}
function yt(e, t, s, r) {
  e.addEventListener(t, s, r);
}
function so(e, t, s, r) {
  e.removeEventListener(t, s, r);
}
var bn = /* @__PURE__ */ Symbol("_vei");
function ro(e, t, s, r, n = null) {
  const i = e[bn] || (e[bn] = {}), l = i[t];
  if (r && l) l.value = r;
  else {
    const [a, o] = no(t);
    r ? yt(e, a, i[t] = ao(r, n), o) : l && (so(e, a, l, o), i[t] = void 0);
  }
}
var yn = /(?:Once|Passive|Capture)$/;
function no(e) {
  let t;
  if (yn.test(e)) {
    t = {};
    let s;
    for (; s = e.match(yn); )
      e = e.slice(0, e.length - s[0].length), t[s[0].toLowerCase()] = !0;
  }
  return [e[2] === ":" ? e.slice(3) : Ct(e.slice(2)), t];
}
var rr = 0, io = /* @__PURE__ */ Promise.resolve(), lo = () => rr || (io.then(() => rr = 0), rr = Date.now());
function ao(e, t) {
  const s = (r) => {
    if (!r._vts) r._vts = Date.now();
    else if (r._vts <= s.attached) return;
    const n = s.value;
    if (W(n)) {
      const i = r.stopImmediatePropagation;
      r.stopImmediatePropagation = () => {
        i.call(r), r._stopped = !0;
      };
      const l = n.slice(), a = [r];
      for (let o = 0; o < l.length && !r._stopped; o++) {
        const c = l[o];
        c && De(c, t, 5, a);
      }
    } else De(n, t, 5, [r]);
  };
  return s.value = e, s.attached = lo(), s;
}
var _n = (e) => e.charCodeAt(0) === 111 && e.charCodeAt(1) === 110 && e.charCodeAt(2) > 96 && e.charCodeAt(2) < 123, oo = (e, t, s, r, n, i) => {
  const l = n === "svg";
  t === "class" ? za(e, r, l) : t === "style" ? Za(e, s, r) : Is(t) ? $s(t) || ro(e, t, s, r, i) : (t[0] === "." ? (t = t.slice(1), !0) : t[0] === "^" ? (t = t.slice(1), !1) : uo(e, t, r, l)) ? (mn(e, t, r), !e.tagName.includes("-") && (t === "value" || t === "checked" || t === "selected") && gn(e, t, r, l, i, t !== "value")) : e._isVueCE && (fo(e, t) || e._def.__asyncLoader && (/[A-Z]/.test(t) || !le(r))) ? mn(e, Se(t), r, i, t) : (t === "true-value" ? e._trueValue = r : t === "false-value" && (e._falseValue = r), gn(e, t, r, l));
};
function uo(e, t, s, r) {
  if (r)
    return !!(t === "innerHTML" || t === "textContent" || t in e && _n(t) && K(s));
  if (t === "spellcheck" || t === "draggable" || t === "translate" || t === "autocorrect" || t === "sandbox" && e.tagName === "IFRAME" || t === "form" || t === "list" && e.tagName === "INPUT" || t === "type" && e.tagName === "TEXTAREA") return !1;
  if (t === "width" || t === "height") {
    const n = e.tagName;
    if (n === "IMG" || n === "VIDEO" || n === "CANVAS" || n === "SOURCE") return !1;
  }
  return _n(t) && le(s) ? !1 : t in e;
}
function fo(e, t) {
  const s = e._def.props;
  if (!s) return !1;
  const r = Se(t);
  return Array.isArray(s) ? s.some((n) => Se(n) === r) : Object.keys(s).some((n) => Se(n) === r);
}
var Ts = (e) => {
  const t = e.props["onUpdate:modelValue"] || !1;
  return W(t) ? (s) => ps(t, s) : t;
};
function co(e) {
  e.target.composing = !0;
}
function wn(e) {
  const t = e.target;
  t.composing && (t.composing = !1, t.dispatchEvent(new Event("input")));
}
var kt = /* @__PURE__ */ Symbol("_assign");
function xn(e, t, s) {
  return t && (e = e.trim()), s && (e = br(e)), e;
}
var st = {
  created(e, { modifiers: { lazy: t, trim: s, number: r } }, n) {
    e[kt] = Ts(n);
    const i = r || n.props && n.props.type === "number";
    yt(e, t ? "change" : "input", (l) => {
      l.target.composing || e[kt](xn(e.value, s, i));
    }), (s || i) && yt(e, "change", () => {
      e.value = xn(e.value, s, i);
    }), t || (yt(e, "compositionstart", co), yt(e, "compositionend", wn), yt(e, "change", wn));
  },
  mounted(e, { value: t }) {
    e.value = t ?? "";
  },
  beforeUpdate(e, { value: t, oldValue: s, modifiers: { lazy: r, trim: n, number: i } }, l) {
    if (e[kt] = Ts(l), e.composing) return;
    const a = (i || e.type === "number") && !/^0\d/.test(e.value) ? br(e.value) : e.value, o = t ?? "";
    if (a === o) return;
    const c = e.getRootNode();
    (c instanceof Document || c instanceof ShadowRoot) && c.activeElement === e && e.type !== "range" && (r && t === s || n && e.value.trim() === o) || (e.value = o);
  }
}, Vt = {
  deep: !0,
  created(e, t, s) {
    e[kt] = Ts(s), yt(e, "change", () => {
      const r = e._modelValue, n = vo(e), i = e.checked, l = e[kt];
      if (W(r)) {
        const a = Pn(r, n), o = a !== -1;
        if (i && !o) l(r.concat(n));
        else if (!i && o) {
          const c = [...r];
          c.splice(a, 1), l(c);
        }
      } else if (Os(r)) {
        const a = new Set(r);
        i ? a.add(n) : a.delete(n), l(a);
      } else l(Bi(e, i));
    });
  },
  mounted: Cn,
  beforeUpdate(e, t, s) {
    e[kt] = Ts(s), Cn(e, t, s);
  }
};
function Cn(e, { value: t, oldValue: s }, r) {
  e._modelValue = t;
  let n;
  if (W(t)) n = Pn(t, r.props.value) > -1;
  else if (Os(t)) n = t.has(r.props.value);
  else {
    if (t === s) return;
    n = is(t, Bi(e, !0));
  }
  e.checked !== n && (e.checked = n);
}
function vo(e) {
  return "_value" in e ? e._value : e.value;
}
function Bi(e, t) {
  const s = t ? "_trueValue" : "_falseValue";
  return s in e ? e[s] : t;
}
var ho = [
  "ctrl",
  "shift",
  "alt",
  "meta"
], po = {
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
  exact: (e, t) => ho.some((s) => e[`${s}Key`] && !t.includes(s))
}, Vi = (e, t) => {
  if (!e) return e;
  const s = e._withMods || (e._withMods = {}), r = t.join(".");
  return s[r] || (s[r] = ((n, ...i) => {
    for (let l = 0; l < t.length; l++) {
      const a = po[t[l]];
      if (a && a(n, t)) return;
    }
    return e(n, ...i);
  }));
}, go = /* @__PURE__ */ ue({ patchProp: oo }, Va), Sn;
function mo() {
  return Sn || (Sn = ya(go));
}
var bo = ((...e) => {
  const t = mo().createApp(...e), { mount: s } = t;
  return t.mount = (r) => {
    const n = _o(r);
    if (!n) return;
    const i = t._component;
    !K(i) && !i.render && !i.template && (i.template = n.innerHTML), n.nodeType === 1 && (n.textContent = "");
    const l = s(n, !1, yo(n));
    return n instanceof Element && (n.removeAttribute("v-cloak"), n.setAttribute("data-v-app", "")), l;
  }, t;
});
function yo(e) {
  if (e instanceof SVGElement) return "svg";
  if (typeof MathMLElement == "function" && e instanceof MathMLElement) return "mathml";
}
function _o(e) {
  return le(e) ? document.querySelector(e) : e;
}
var wo = Object.freeze({
  id: "fourth-wall",
  name: "四次元壁",
  accent: "#7567d8"
}), xo = ["src"], Co = {
  key: 1,
  class: "fourth-wall-avatar is-placeholder",
  "aria-hidden": "true"
}, So = { class: "fourth-wall-message-stack" }, Ao = {
  key: 0,
  class: "fourth-wall-thinking"
}, To = { class: "fourth-wall-bubble" }, Eo = {
  key: 0,
  class: "fourth-wall-message-text"
}, Io = {
  key: 1,
  class: "fourth-wall-image-card"
}, $o = ["src", "alt"], Oo = ["onClick"], Mo = { key: 2 }, ko = { key: 3 }, Po = ["onClick"], Fo = { "aria-hidden": "true" }, Lo = { key: 0 }, Do = { class: "fourth-wall-message-actions" }, Ro = { key: 1 }, No = /* @__PURE__ */ Ae({
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
    const s = e, r = t, n = /* @__PURE__ */ ne(!1), i = /* @__PURE__ */ ne(""), l = /* @__PURE__ */ xt({}), a = /* @__PURE__ */ new Set();
    let o = () => {
    };
    function c(w) {
      const A = /\[(?:img|图片)\s*:\s*([^\]]+)\]|\[(?:voice|语音)\s*:([^:\]]*):([^\]]+)\]|\[(?:voice|语音)\s*:\s*([^\]]+)\]/gi, I = [];
      let H = 0, x;
      for (; (x = A.exec(w)) !== null; )
        x.index > H && I.push({
          kind: "text",
          raw: w.slice(H, x.index),
          value: w.slice(H, x.index)
        }), x[1] !== void 0 ? I.push({
          kind: "image",
          raw: x[0],
          value: x[1].trim()
        }) : I.push({
          kind: "voice",
          raw: x[0],
          value: String(x[3] ?? x[4] ?? "").trim(),
          emotion: String(x[2] || "").trim().toLowerCase()
        }), H = A.lastIndex;
      return H < w.length && I.push({
        kind: "text",
        raw: w.slice(H),
        value: w.slice(H)
      }), I.length ? I : [{
        kind: "text",
        raw: w,
        value: w
      }];
    }
    const u = _e(() => c(s.message.content)), h = _e(() => s.message.ts ? new Intl.DateTimeFormat("zh-CN", {
      hour: "2-digit",
      minute: "2-digit"
    }).format(s.message.ts) : "");
    function g(w, A) {
      return `fw-${w}-${Date.now()}-${s.messageIndex}-${A}-${Math.random().toString(36).slice(2, 7)}`;
    }
    function y(w) {
      return w.result;
    }
    function B(w, A) {
      return a.has(A) && l[w]?.requestId === A;
    }
    async function O(w, A) {
      if (l[A]?.status === "loading" || l[A]?.status === "ready") return;
      if (!s.imageAvailable) {
        l[A] = {
          status: "unavailable",
          message: "画图能力未启用"
        };
        return;
      }
      const I = g("image", A);
      a.add(I), l[A] = {
        status: "loading",
        message: "查询图片缓存",
        requestId: I
      };
      const H = {
        chatIdentity: s.chatIdentity,
        sessionId: s.sessionId
      };
      try {
        const x = y(await s.bridge.request("fourth-wall/image-check", {
          ...H,
          tags: w.value,
          mediaRequestId: I
        }, 3e4));
        if (!B(A, I)) return;
        if (!x.available) {
          l[A] = {
            status: "unavailable",
            message: "画图能力未启用",
            requestId: I
          };
          return;
        }
        let S = x.cached || "";
        if (!S) {
          l[A] = {
            status: "loading",
            message: "正在生成图片",
            requestId: I
          };
          const V = y(await s.bridge.request("fourth-wall/image-generate", {
            ...H,
            tags: w.value,
            mediaRequestId: I
          }, 18e4));
          if (!B(A, I)) return;
          S = V.base64;
        }
        l[A] = {
          status: "ready",
          source: /^(?:data:|blob:|https?:)/i.test(S) ? S : `data:image/png;base64,${S}`
        };
      } catch (x) {
        B(A, I) && (l[A] = {
          status: "error",
          message: x instanceof Error ? x.message : String(x),
          requestId: I
        });
      } finally {
        a.delete(I);
      }
    }
    async function z(w, A) {
      if (!s.voiceAvailable) {
        l[A] = {
          status: "unavailable",
          message: "TTS 能力未启用"
        };
        return;
      }
      const I = l[A];
      if (I?.status === "loading") return;
      if (I?.status === "playing" && I.requestId) {
        s.bridge.post("fourth-wall/voice-stop", {
          chatIdentity: s.chatIdentity,
          mediaRequestId: I.requestId
        }), l[A] = { status: "idle" };
        return;
      }
      const H = g("voice", A);
      a.add(H), l[A] = {
        status: "loading",
        message: "正在准备语音",
        requestId: H
      };
      try {
        await s.bridge.request("fourth-wall/voice-play", {
          chatIdentity: s.chatIdentity,
          sessionId: s.sessionId,
          mediaRequestId: H,
          text: w.value,
          emotion: w.emotion
        });
      } catch (x) {
        B(A, H) && (l[A] = {
          status: "error",
          message: x instanceof Error ? x.message : String(x),
          requestId: H
        }), a.delete(H);
      }
    }
    function N() {
      i.value = s.message.content, n.value = !0;
    }
    function k() {
      const w = i.value.trim();
      w && (r("edit", s.messageIndex, w), n.value = !1);
    }
    function U() {
      a.forEach((w) => {
        s.bridge.post("fourth-wall/image-cancel", {
          chatIdentity: s.chatIdentity,
          mediaRequestId: w
        }), s.bridge.post("fourth-wall/voice-stop", {
          chatIdentity: s.chatIdentity,
          mediaRequestId: w
        });
      }), a.clear();
    }
    function D() {
      u.value.forEach((w, A) => {
        w.kind === "image" && O(w, A);
      });
    }
    return Ft(() => {
      o = s.bridge.subscribe((w) => {
        if (w.type === "fourth-wall/image-progress") {
          const A = w.payload, I = Object.keys(l).map(Number).find((H) => l[H]?.requestId === A.mediaRequestId);
          I !== void 0 && (l[I].message = A.status === "queued" ? `图片队列第 ${A.position || 1} 位` : "正在生成图片");
        }
        if (w.type === "fourth-wall/voice-state") {
          const A = w.payload, I = Object.keys(l).map(Number).find((H) => l[H]?.requestId === A.requestId);
          if (I === void 0) return;
          A.state === "playing" && (l[I].status = "playing"), (A.state === "ended" || A.state === "stopped") && (a.delete(String(A.requestId || "")), l[I] = { status: "idle" }), A.state === "error" && (a.delete(String(A.requestId || "")), l[I] = {
            status: "error",
            message: A.message || "语音播放失败"
          });
        }
      }), D();
    }), Ot(() => s.message.content, () => {
      U(), Object.keys(l).forEach((w) => delete l[Number(w)]), D();
    }), Lt(() => {
      o(), U();
    }), (w, A) => (M(), L("article", { class: Be(["fourth-wall-message", e.message.role === "user" ? "is-user" : "is-ai"]) }, [(e.message.role === "user" ? e.userAvatar : e.characterAvatar) ? (M(), L("img", {
      key: 0,
      class: "fourth-wall-avatar",
      src: e.message.role === "user" ? e.userAvatar : e.characterAvatar,
      alt: ""
    }, null, 8, xo)) : (M(), L("span", Co)), v("div", So, [
      e.message.thinking ? (M(), L("details", Ao, [A[3] || (A[3] = v("summary", null, "思考过程", -1)), v("div", null, X(e.message.thinking), 1)])) : oe("", !0),
      v("div", To, [n.value ? Ee((M(), L("textarea", {
        key: 0,
        "onUpdate:modelValue": A[0] || (A[0] = (I) => i.value = I),
        class: "fourth-wall-edit",
        rows: "3"
      }, null, 512)), [[st, i.value]]) : (M(!0), L(he, { key: 1 }, as(u.value, (I, H) => (M(), L(he, { key: `${I.kind}-${H}` }, [I.kind === "text" ? (M(), L("span", Eo, X(I.value), 1)) : I.kind === "image" ? (M(), L("figure", Io, [l[H]?.status === "ready" ? (M(), L("img", {
        key: 0,
        src: l[H].source,
        alt: I.value
      }, null, 8, $o)) : l[H]?.status === "error" ? (M(), L("button", {
        key: 1,
        type: "button",
        onClick: (x) => O(I, H)
      }, [Ie(X(I.raw), 1), v("small", null, X(l[H].message) + "，点此重试", 1)], 8, Oo)) : l[H]?.status === "unavailable" ? (M(), L("div", Mo, [Ie(X(I.raw), 1), v("small", null, X(l[H].message), 1)])) : (M(), L("div", ko, [Ie(X(I.raw), 1), v("small", null, X(l[H]?.message || "准备图片"), 1)]))])) : (M(), L("button", {
        key: 2,
        class: "fourth-wall-voice",
        type: "button",
        onClick: (x) => z(I, H)
      }, [
        v("span", Fo, X(l[H]?.status === "playing" ? "■" : "▶"), 1),
        v("span", null, X(I.value), 1),
        l[H]?.message ? (M(), L("small", Lo, X(l[H].message), 1)) : oe("", !0)
      ], 8, Po))], 64))), 128)), v("div", Do, [n.value ? (M(), L(he, { key: 0 }, [v("button", {
        type: "button",
        onClick: k
      }, "保存"), v("button", {
        type: "button",
        onClick: A[1] || (A[1] = (I) => n.value = !1)
      }, "取消")], 64)) : (M(), L(he, { key: 1 }, [v("button", {
        type: "button",
        onClick: N
      }, "编辑"), v("button", {
        type: "button",
        onClick: A[2] || (A[2] = (I) => r("delete", e.messageIndex))
      }, "删除")], 64))])]),
      h.value ? (M(), L("time", Ro, X(h.value), 1)) : oe("", !0)
    ])], 2));
  }
}), Ho = No, Bo = {
  key: 1,
  class: "fourth-wall-empty"
}, Vo = {
  key: 2,
  class: "fourth-wall-message is-ai is-streaming"
}, jo = ["src"], Wo = {
  key: 1,
  class: "fourth-wall-avatar is-placeholder"
}, Uo = { class: "fourth-wall-message-stack" }, qo = {
  key: 0,
  class: "fourth-wall-thinking",
  open: ""
}, Ko = { class: "fourth-wall-bubble" }, Go = {
  key: 0,
  class: "fourth-wall-unsaved"
}, Xo = /* @__PURE__ */ Ae({
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
    const t = e, s = /* @__PURE__ */ ne(null), r = /* @__PURE__ */ ne(40), n = _e(() => Math.max(0, t.history.length - r.value)), i = _e(() => t.history.slice(n.value));
    function l() {
      r.value = Math.min(t.history.length, r.value + 40);
    }
    return Ot(() => t.sessionId, () => {
      r.value = 40;
    }), Ot(() => [t.history.length, t.generation.text], async () => {
      await Tr(), s.value && (s.value.scrollTop = s.value.scrollHeight);
    }, { immediate: !0 }), (a, o) => (M(), L("section", {
      ref_key: "viewport",
      ref: s,
      class: "fourth-wall-conversation",
      "aria-live": "polite"
    }, [
      n.value > 0 ? (M(), L("button", {
        key: 0,
        type: "button",
        class: "fourth-wall-earlier",
        onClick: l
      }, " 显示更早的 " + X(n.value) + " 条记录 ", 1)) : oe("", !0),
      e.history.length === 0 && e.generation.status === "idle" ? (M(), L("div", Bo, [...o[2] || (o[2] = [
        v("span", null, "IV", -1),
        v("strong", null, "越过故事边界", -1),
        v("p", null, "这里是你与角色扮演者的皮下私聊。", -1)
      ])])) : oe("", !0),
      (M(!0), L(he, null, as(i.value, (c, u) => (M(), ct(Ho, {
        key: `${c.ts}-${n.value + u}`,
        message: c,
        "message-index": n.value + u,
        "chat-identity": e.chatIdentity,
        "session-id": e.sessionId,
        "user-avatar": e.userAvatar,
        "character-avatar": e.characterAvatar,
        "image-available": e.imageAvailable,
        "voice-available": e.voiceAvailable,
        bridge: e.bridge,
        onEdit: o[0] || (o[0] = (h, g) => a.$emit("edit", h, g)),
        onDelete: o[1] || (o[1] = (h) => a.$emit("delete", h))
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
      e.generation.status !== "idle" ? (M(), L("article", Vo, [e.characterAvatar ? (M(), L("img", {
        key: 0,
        class: "fourth-wall-avatar",
        src: e.characterAvatar,
        alt: ""
      }, null, 8, jo)) : (M(), L("span", Wo)), v("div", Uo, [e.generation.thinking ? (M(), L("details", qo, [o[3] || (o[3] = v("summary", null, "思考中", -1)), v("div", null, X(e.generation.thinking), 1)])) : oe("", !0), v("div", Ko, [Ie(X(e.generation.text || (e.generation.status === "error" ? e.generation.message : "等待回应...")) + " ", 1), e.generation.unsaved ? (M(), L("small", Go, "未保存")) : oe("", !0)])])])) : oe("", !0)
    ], 512));
  }
}), zo = Xo, Jo = {
  class: "fourth-wall-modal",
  role: "dialog",
  "aria-modal": "true",
  "aria-label": "四次元壁提示词"
}, Yo = { class: "fourth-wall-prompt-fields" }, Qo = /* @__PURE__ */ Ae({
  __name: "FourthWallPromptEditor",
  props: { templates: {} },
  emits: [
    "close",
    "save",
    "restore"
  ],
  setup(e, { emit: t }) {
    const s = e, r = t, n = /* @__PURE__ */ xt(structuredClone(/* @__PURE__ */ G(s.templates)));
    function i() {
      r("save", structuredClone(/* @__PURE__ */ G(n)));
    }
    return (l, a) => (M(), L("div", {
      class: "fourth-wall-modal-backdrop",
      onClick: a[6] || (a[6] = Vi((o) => r("close"), ["self"]))
    }, [v("section", Jo, [
      v("header", null, [a[7] || (a[7] = v("strong", null, "提示词模板", -1)), v("button", {
        type: "button",
        onClick: a[0] || (a[0] = (o) => r("close"))
      }, "关闭")]),
      v("div", Yo, [
        v("label", null, [a[8] || (a[8] = Ie("Top User", -1)), Ee(v("textarea", {
          "onUpdate:modelValue": a[1] || (a[1] = (o) => n.topuser = o),
          rows: "5"
        }, null, 512), [[st, n.topuser]])]),
        v("label", null, [a[9] || (a[9] = Ie("Confirm", -1)), Ee(v("textarea", {
          "onUpdate:modelValue": a[2] || (a[2] = (o) => n.confirm = o),
          rows: "3"
        }, null, 512), [[st, n.confirm]])]),
        v("label", null, [a[10] || (a[10] = Ie("Meta Protocol", -1)), Ee(v("textarea", {
          "onUpdate:modelValue": a[3] || (a[3] = (o) => n.metaProtocol = o),
          rows: "12"
        }, null, 512), [[st, n.metaProtocol]])]),
        v("label", null, [a[11] || (a[11] = Ie("Bottom", -1)), Ee(v("textarea", {
          "onUpdate:modelValue": a[4] || (a[4] = (o) => n.bottom = o),
          rows: "5"
        }, null, 512), [[st, n.bottom]])])
      ]),
      v("footer", null, [v("button", {
        type: "button",
        class: "is-danger",
        onClick: a[5] || (a[5] = (o) => r("restore"))
      }, "恢复默认"), v("button", {
        type: "button",
        class: "is-primary",
        onClick: i
      }, "保存")])
    ])]));
  }
}), Zo = Qo, eu = { class: "fourth-wall-settings-section" }, tu = { class: "fourth-wall-session-row" }, su = ["value", "disabled"], ru = ["value"], nu = ["disabled"], iu = ["disabled"], lu = ["disabled"], au = /* @__PURE__ */ Ae({
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
    const s = t;
    function r() {
      const l = window.prompt("新记录名称", "新记录")?.trim();
      l && s("add", l);
    }
    function n(l, a) {
      const o = window.prompt("重命名记录", a)?.trim();
      o && s("rename", l, o);
    }
    function i(l) {
      window.confirm("确定删除当前记录吗？") && s("delete", l);
    }
    return (l, a) => (M(), L("section", eu, [a[3] || (a[3] = v("h3", null, "聊天记录", -1)), v("div", tu, [
      v("select", {
        value: e.activeSessionId,
        disabled: e.disabled,
        onChange: a[0] || (a[0] = (o) => s("switch", o.target.value))
      }, [(M(!0), L(he, null, as(e.sessions, (o) => (M(), L("option", {
        key: o.id,
        value: o.id
      }, X(o.name), 9, ru))), 128))], 40, su),
      v("button", {
        type: "button",
        disabled: e.disabled,
        title: "新建记录",
        onClick: r
      }, "＋", 8, nu),
      v("button", {
        type: "button",
        disabled: e.disabled,
        title: "重命名记录",
        onClick: a[1] || (a[1] = (o) => n(e.activeSessionId, e.sessions.find((c) => c.id === e.activeSessionId)?.name || ""))
      }, " 改 ", 8, iu),
      v("button", {
        type: "button",
        disabled: e.disabled || e.sessions.length <= 1,
        title: "删除记录",
        class: "is-danger",
        onClick: a[2] || (a[2] = (o) => i(e.activeSessionId))
      }, " 删 ", 8, lu)
    ])]));
  }
}), ou = au, uu = {
  class: "fourth-wall-settings",
  "aria-label": "四次元壁设置"
}, fu = { class: "fourth-wall-settings-scroll" }, cu = { class: "fourth-wall-settings-section" }, du = { class: "is-toggle" }, vu = { class: "is-toggle" }, hu = ["disabled"], pu = { class: "fourth-wall-settings-section" }, gu = { class: "is-toggle" }, mu = { class: "is-toggle" }, bu = { class: "is-toggle" }, yu = { key: 0 }, _u = ["disabled"], wu = { class: "fourth-wall-settings-section is-actions" }, xu = /* @__PURE__ */ Ae({
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
    const s = e, r = t, n = /* @__PURE__ */ xt(structuredClone(/* @__PURE__ */ G(s.chat.settings))), i = /* @__PURE__ */ xt(structuredClone(/* @__PURE__ */ G(s.global)));
    function l() {
      r("updateChat", structuredClone(/* @__PURE__ */ G(n)));
    }
    function a() {
      r("updateGlobal", {
        image: structuredClone(/* @__PURE__ */ G(i.image)),
        voice: structuredClone(/* @__PURE__ */ G(i.voice)),
        commentary: structuredClone(/* @__PURE__ */ G(i.commentary))
      });
    }
    return (o, c) => (M(), L("aside", uu, [v("header", null, [c[15] || (c[15] = v("strong", null, "四次元壁设置", -1)), v("button", {
      type: "button",
      onClick: c[0] || (c[0] = (u) => r("close"))
    }, "关闭")]), v("div", fu, [
      ce(ou, {
        sessions: e.chat.sessions,
        "active-session-id": e.chat.activeSessionId,
        disabled: e.busy,
        onSwitch: c[1] || (c[1] = (u) => r("switchSession", u)),
        onAdd: c[2] || (c[2] = (u) => r("addSession", u)),
        onRename: c[3] || (c[3] = (u, h) => r("renameSession", u, h)),
        onDelete: c[4] || (c[4] = (u) => r("deleteSession", u))
      }, null, 8, [
        "sessions",
        "active-session-id",
        "disabled"
      ]),
      v("section", cu, [
        c[20] || (c[20] = v("h3", null, "上下文", -1)),
        v("label", null, [c[16] || (c[16] = Ie("普通聊天层数", -1)), Ee(v("input", {
          "onUpdate:modelValue": c[5] || (c[5] = (u) => n.maxChatLayers = u),
          type: "number",
          min: "1",
          max: "9999"
        }, null, 512), [[
          st,
          n.maxChatLayers,
          void 0,
          { number: !0 }
        ]])]),
        v("label", null, [c[17] || (c[17] = Ie("皮下聊天轮数", -1)), Ee(v("input", {
          "onUpdate:modelValue": c[6] || (c[6] = (u) => n.maxMetaTurns = u),
          type: "number",
          min: "1",
          max: "9999"
        }, null, 512), [[
          st,
          n.maxMetaTurns,
          void 0,
          { number: !0 }
        ]])]),
        v("label", du, [c[18] || (c[18] = v("span", null, "流式生成", -1)), Ee(v("input", {
          "onUpdate:modelValue": c[7] || (c[7] = (u) => n.stream = u),
          type: "checkbox"
        }, null, 512), [[Vt, n.stream]])]),
        v("label", vu, [c[19] || (c[19] = v("span", null, "禁用 Assistant Prefill", -1)), Ee(v("input", {
          "onUpdate:modelValue": c[8] || (c[8] = (u) => n.disableAssistantPrefill = u),
          type: "checkbox"
        }, null, 512), [[Vt, n.disableAssistantPrefill]])]),
        v("button", {
          type: "button",
          class: "is-primary",
          disabled: e.busy,
          onClick: l
        }, "保存上下文设置", 8, hu)
      ]),
      v("section", pu, [
        c[24] || (c[24] = v("h3", null, "能力", -1)),
        v("label", gu, [c[21] || (c[21] = v("span", null, "在提示词中允许图片", -1)), Ee(v("input", {
          "onUpdate:modelValue": c[9] || (c[9] = (u) => i.image.enablePrompt = u),
          type: "checkbox"
        }, null, 512), [[Vt, i.image.enablePrompt]])]),
        v("label", mu, [c[22] || (c[22] = v("span", null, "在提示词中允许语音", -1)), Ee(v("input", {
          "onUpdate:modelValue": c[10] || (c[10] = (u) => i.voice.enabled = u),
          type: "checkbox"
        }, null, 512), [[Vt, i.voice.enabled]])]),
        v("label", bu, [c[23] || (c[23] = v("span", null, "实时吐槽", -1)), Ee(v("input", {
          "onUpdate:modelValue": c[11] || (c[11] = (u) => i.commentary.enabled = u),
          type: "checkbox"
        }, null, 512), [[Vt, i.commentary.enabled]])]),
        i.commentary.enabled ? (M(), L("label", yu, [Ie(" 吐槽概率 " + X(i.commentary.probability) + "% ", 1), Ee(v("input", {
          "onUpdate:modelValue": c[12] || (c[12] = (u) => i.commentary.probability = u),
          type: "range",
          min: "1",
          max: "99"
        }, null, 512), [[
          st,
          i.commentary.probability,
          void 0,
          { number: !0 }
        ]])])) : oe("", !0),
        v("button", {
          type: "button",
          class: "is-primary",
          disabled: e.busy,
          onClick: a
        }, "保存能力设置", 8, _u)
      ]),
      v("section", wu, [v("button", {
        type: "button",
        onClick: c[13] || (c[13] = (u) => r("openPrompts"))
      }, "提示词模板"), v("button", {
        type: "button",
        onClick: c[14] || (c[14] = (u) => r("openAgent"))
      }, "Agent API 配置")])
    ])]));
  }
}), Cu = xu, Su = { class: "fourth-wall-app" }, Au = { class: "fourth-wall-header" }, Tu = { class: "fourth-wall-heading" }, Eu = { class: "fourth-wall-header-actions" }, Iu = ["disabled"], $u = ["disabled"], Ou = {
  key: 0,
  class: "fourth-wall-error",
  role: "alert"
}, Mu = { class: "fourth-wall-composer" }, ku = ["disabled"], Pu = ["disabled"], Fu = 35e3, Lu = /* @__PURE__ */ Ae({
  __name: "FourthWallApp",
  props: {
    bridge: {},
    initialState: {}
  },
  setup(e) {
    const t = e, s = /* @__PURE__ */ ne(structuredClone(/* @__PURE__ */ G(t.initialState))), r = /* @__PURE__ */ ne(""), n = /* @__PURE__ */ ne(!1), i = /* @__PURE__ */ ne(!1), l = /* @__PURE__ */ ne(!1), a = /* @__PURE__ */ ne(""), o = /* @__PURE__ */ ne(!1), c = /* @__PURE__ */ ne({
      status: "idle",
      sessionId: "",
      text: "",
      thinking: "",
      message: "",
      unsaved: !1
    });
    let u = () => {
    };
    const h = _e(() => s.value.chat.sessions.find((x) => x.id === s.value.chat.activeSessionId)), g = _e(() => c.value.status === "started" || c.value.status === "progress");
    function y(x = h.value.id) {
      return {
        chatIdentity: s.value.chatIdentity,
        sessionId: x
      };
    }
    function B(x) {
      return structuredClone(x.result);
    }
    async function O(x, S) {
      l.value = !0, a.value = "";
      try {
        s.value = B(await t.bridge.request(x, S, Fu));
      } catch (V) {
        a.value = V instanceof Error ? V.message : String(V);
      } finally {
        l.value = !1;
      }
    }
    async function z() {
      const x = r.value.trim();
      !x || g.value || l.value || (r.value = "", c.value = {
        status: "started",
        sessionId: h.value.id,
        text: "",
        thinking: "",
        message: "",
        unsaved: !1
      }, await O("fourth-wall/send", {
        ...y(),
        content: x
      }), a.value && (c.value.status = "idle"));
    }
    async function N() {
      g.value || l.value || (c.value = {
        status: "started",
        sessionId: h.value.id,
        text: "",
        thinking: "",
        message: "",
        unsaved: !1
      }, await O("fourth-wall/regenerate", y()), a.value && (c.value.status = "idle"));
    }
    function k() {
      t.bridge.post("fourth-wall/cancel", y());
    }
    function U(x) {
      x.key !== "Enter" || x.shiftKey || o.value || (x.preventDefault(), g.value ? k() : z());
    }
    function D(x) {
      window.confirm("确定删除这条消息吗？") && O("fourth-wall/delete-message", {
        ...y(),
        messageIndex: x
      });
    }
    function w() {
      window.confirm("确定清空当前记录吗？") && O("fourth-wall/clear-history", y());
    }
    function A(x) {
      O("fourth-wall/update-chat-settings", {
        ...y(),
        patch: x
      });
    }
    function I(x) {
      O("fourth-wall/update-global-settings", {
        ...y(),
        patch: x
      });
    }
    async function H() {
      a.value = "";
      try {
        await t.bridge.request("fourth-wall/open-agent-settings", y());
      } catch (x) {
        a.value = x instanceof Error ? x.message : String(x);
      }
    }
    return Ft(() => {
      u = t.bridge.subscribe((x) => {
        if (x.type === "fourth-wall/state" && (s.value = structuredClone(x.payload.state)), x.type !== "fourth-wall/generation") return;
        const S = x.payload;
        if (!(S.sessionId && S.sessionId !== h.value.id)) {
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
            a.value = S.message || "生成失败", c.value = S.kind === "save" && (S.draft?.text || S.draft?.thinking) ? {
              status: "error",
              sessionId: S.sessionId || h.value.id,
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
            sessionId: S.sessionId || h.value.id,
            text: S.text || c.value.text,
            thinking: S.thinking || c.value.thinking,
            message: "",
            unsaved: !1
          };
        }
      });
    }), Lt(() => u()), (x, S) => (M(), L("main", Su, [
      v("header", Au, [v("div", Tu, [S[17] || (S[17] = v("span", null, "IV", -1)), v("div", null, [S[16] || (S[16] = v("strong", null, "四次元壁", -1)), v("small", null, X(h.value.name), 1)])]), v("div", Eu, [
        v("button", {
          type: "button",
          title: "重答",
          disabled: l.value || g.value,
          onClick: N
        }, "↻", 8, Iu),
        v("button", {
          type: "button",
          title: "清空当前记录",
          disabled: l.value,
          onClick: w
        }, "⌫", 8, $u),
        v("button", {
          type: "button",
          title: "设置",
          onClick: S[0] || (S[0] = (V) => n.value = !0)
        }, "⚙")
      ])]),
      a.value ? (M(), L("div", Ou, [v("span", null, X(a.value), 1), v("button", {
        type: "button",
        onClick: S[1] || (S[1] = (V) => a.value = "")
      }, "×")])) : oe("", !0),
      ce(zo, {
        history: h.value.history,
        "session-id": h.value.id,
        "chat-identity": s.value.chatIdentity,
        "user-avatar": s.value.userAvatar,
        "character-avatar": s.value.characterAvatar,
        "image-available": s.value.capabilities.image.available,
        "voice-available": s.value.capabilities.voice.available,
        generation: c.value,
        bridge: e.bridge,
        onEdit: S[2] || (S[2] = (V, F) => O("fourth-wall/edit-message", {
          ...y(),
          messageIndex: V,
          content: F
        })),
        onDelete: D
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
      v("footer", Mu, [Ee(v("textarea", {
        "onUpdate:modelValue": S[3] || (S[3] = (V) => r.value = V),
        rows: "1",
        placeholder: "聊点什么...",
        disabled: l.value,
        onCompositionstart: S[4] || (S[4] = (V) => o.value = !0),
        onCompositionend: S[5] || (S[5] = (V) => o.value = !1),
        onKeydown: U
      }, null, 40, ku), [[st, r.value]]), v("button", {
        type: "button",
        class: Be({ "is-stop": g.value }),
        disabled: l.value,
        onClick: S[6] || (S[6] = (V) => g.value ? k() : z())
      }, X(g.value ? "■" : "↑"), 11, Pu)]),
      n.value ? (M(), ct(Cu, {
        key: 1,
        chat: s.value.chat,
        global: s.value.global,
        busy: l.value || g.value,
        onClose: S[7] || (S[7] = (V) => n.value = !1),
        onUpdateChat: A,
        onUpdateGlobal: I,
        onSwitchSession: S[8] || (S[8] = (V) => O("fourth-wall/switch-session", {
          ...y(),
          targetSessionId: V
        })),
        onAddSession: S[9] || (S[9] = (V) => O("fourth-wall/add-session", {
          ...y(),
          name: V
        })),
        onRenameSession: S[10] || (S[10] = (V, F) => O("fourth-wall/rename-session", {
          ...y(V),
          name: F
        })),
        onDeleteSession: S[11] || (S[11] = (V) => O("fourth-wall/delete-session", y(V))),
        onOpenPrompts: S[12] || (S[12] = (V) => i.value = !0),
        onOpenAgent: H
      }, null, 8, [
        "chat",
        "global",
        "busy"
      ])) : oe("", !0),
      i.value ? (M(), ct(Zo, {
        key: 2,
        templates: s.value.global.promptTemplates,
        onClose: S[13] || (S[13] = (V) => i.value = !1),
        onSave: S[14] || (S[14] = (V) => {
          I({ promptTemplates: V }), i.value = !1;
        }),
        onRestore: S[15] || (S[15] = () => {
          O("fourth-wall/restore-prompts", y()), i.value = !1;
        })
      }, null, 8, ["templates"])) : oe("", !0)
    ]));
  }
}), Du = Lu, Ru = Object.freeze({
  id: "wallet",
  name: "钱包",
  accent: "#9b642c"
}), Nu = {
  class: "wallet-balance-card",
  "aria-labelledby": "wallet-balance-title"
}, Hu = ["aria-label"], Bu = { class: "wallet-balance-state" }, Vu = /* @__PURE__ */ Ae({
  __name: "WalletBalanceCard",
  props: {
    balance: {},
    currency: {},
    status: {}
  },
  setup(e) {
    const t = e, s = _e(() => Number(t.balance).toLocaleString("zh-CN")), r = _e(() => ({
      ready: "账目已核",
      reconciling: "剧情核对中",
      saving: "保存确认中",
      unconfirmed: "保存待核实",
      conflict: "账目已冻结",
      blocked: "账目已暂停"
    })[t.status]);
    return (n, i) => (M(), L("section", Nu, [
      i[4] || (i[4] = v("div", {
        class: "wallet-balance-watermark",
        "aria-hidden": "true"
      }, "白", -1)),
      v("header", null, [i[1] || (i[1] = v("span", {
        class: "wallet-seal",
        "aria-hidden": "true"
      }, "币", -1)), v("div", null, [i[0] || (i[0] = v("p", { id: "wallet-balance-title" }, "当前结余", -1)), v("small", null, X(e.currency) + " · 私人账簿", 1)])]),
      v("div", {
        class: "wallet-balance-value",
        "aria-label": `${s.value} ${e.currency}`
      }, [i[2] || (i[2] = v("span", null, "¤", -1)), Ie(X(s.value), 1)], 8, Hu),
      v("footer", null, [i[3] || (i[3] = v("span", null, "NO. XBO-01", -1)), v("span", Bu, [v("i", { class: Be(`is-${e.status}`) }, null, 2), Ie(X(r.value), 1)])])
    ]));
  }
}), ju = Vu, Wu = {
  class: "wallet-transaction-mark",
  "aria-hidden": "true"
}, Uu = { class: "wallet-transaction-copy" }, qu = { key: 0 }, Ku = { class: "wallet-transaction-amount" }, Gu = /* @__PURE__ */ Ae({
  __name: "WalletTransactionRow",
  props: { transaction: {} },
  setup(e) {
    const t = e, s = _e(() => {
      const n = t.transaction.amount.toLocaleString("zh-CN");
      return t.transaction.direction === "income" ? `+${n}` : t.transaction.direction === "expense" ? `−${n}` : n;
    }), r = _e(() => {
      const n = new Date(t.transaction.createdAt), i = new Intl.DateTimeFormat("zh-CN", {
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
        hour12: !1
      }).format(n);
      return t.transaction.anchorFloor < 0 ? `开户 · ${i}` : `第 ${t.transaction.anchorFloor} 楼 · ${i}`;
    });
    return (n, i) => (M(), L("li", { class: Be(["wallet-transaction-row", `is-${e.transaction.direction}`]) }, [
      v("span", Wu, X(e.transaction.direction === "income" ? "入" : e.transaction.direction === "expense" ? "出" : "转"), 1),
      v("div", Uu, [
        v("strong", null, X(e.transaction.title), 1),
        e.transaction.note ? (M(), L("p", qu, X(e.transaction.note), 1)) : oe("", !0),
        v("small", null, X(e.transaction.source) + " · " + X(r.value), 1)
      ]),
      v("span", Ku, X(s.value), 1)
    ], 2));
  }
}), Xu = Gu, zu = { class: "wallet-ledger-body" }, Ju = {
  key: 0,
  class: "wallet-ledger-empty"
}, Yu = {
  key: 1,
  class: "wallet-transaction-list"
}, Qu = {
  key: 2,
  class: "wallet-load-error",
  role: "alert"
}, Zu = ["disabled"], ef = {
  key: 4,
  class: "wallet-ledger-end"
}, tf = /* @__PURE__ */ Ae({
  __name: "WalletTransactionList",
  props: {
    transactions: {},
    hasMore: { type: Boolean },
    loadingMore: { type: Boolean },
    error: {}
  },
  emits: ["loadMore"],
  setup(e) {
    return (t, s) => (M(), L("div", zu, [
      e.transactions.length === 1 && e.transactions[0]?.anchorFloor === -1 ? (M(), L("div", Ju, [...s[1] || (s[1] = [
        v("span", { "aria-hidden": "true" }, "✓", -1),
        v("strong", null, "新账簿已经启用", -1),
        v("p", null, "除了开户赠礼，还没有其他收支。", -1)
      ])])) : (M(), L("ol", Yu, [(M(!0), L(he, null, as(e.transactions, (r) => (M(), ct(Xu, {
        key: r.id,
        transaction: r
      }, null, 8, ["transaction"]))), 128))])),
      e.error ? (M(), L("p", Qu, X(e.error), 1)) : oe("", !0),
      e.hasMore ? (M(), L("button", {
        key: 3,
        type: "button",
        class: "wallet-load-more",
        disabled: e.loadingMore,
        onClick: s[0] || (s[0] = (r) => t.$emit("loadMore"))
      }, X(e.loadingMore ? "正在翻阅…" : "翻阅更早账目"), 9, Zu)) : e.transactions.length > 1 ? (M(), L("div", ef, "— 账簿至此 —")) : oe("", !0)
    ]));
  }
}), sf = tf, rf = { class: "wallet-app" }, nf = { class: "wallet-header" }, lf = ["disabled"], af = { class: "wallet-scroll" }, of = { "aria-hidden": "true" }, uf = ["disabled"], ff = ["disabled"], cf = {
  class: "wallet-ledger",
  "aria-labelledby": "wallet-ledger-title"
}, An = 35e3, df = /* @__PURE__ */ Ae({
  __name: "WalletApp",
  props: {
    bridge: {},
    initialState: {}
  },
  setup(e) {
    const t = e, s = /* @__PURE__ */ ne(structuredClone(/* @__PURE__ */ G(t.initialState))), r = /* @__PURE__ */ ne(!1), n = /* @__PURE__ */ ne(!1), i = /* @__PURE__ */ ne(""), l = /* @__PURE__ */ ne("");
    let a = () => {
    }, o = 0;
    const c = _e(() => s.value.status === "unconfirmed"), u = _e(() => r.value || s.value.status === "reconciling" || s.value.status === "saving"), h = _e(() => u.value || c.value || s.value.status === "conflict");
    function g() {
      return { chatIdentity: s.value.chatIdentity };
    }
    function y(N) {
      s.value = structuredClone(N), r.value = !1, n.value = !1, i.value = "", l.value = "";
    }
    async function B() {
      if (u.value || c.value || s.value.status === "conflict") return;
      const N = ++o;
      r.value = !0, i.value = "";
      try {
        const k = await t.bridge.request("wallet/refresh", g(), An);
        N === o && y(k.result);
      } catch (k) {
        N === o && (i.value = k instanceof Error ? k.message : String(k));
      } finally {
        N === o && (r.value = !1);
      }
    }
    async function O() {
      if (u.value) return;
      const N = ++o;
      r.value = !0, i.value = "";
      try {
        const k = await t.bridge.request("wallet/confirm-save", g(), An);
        N === o && y(k.result.state);
      } catch (k) {
        N === o && (i.value = k instanceof Error ? k.message : String(k));
      } finally {
        N === o && (r.value = !1);
      }
    }
    async function z() {
      const N = s.value.nextCursor;
      if (!N || n.value) return;
      const k = o;
      n.value = !0, l.value = "";
      try {
        const U = await t.bridge.request("wallet/load-more", {
          ...g(),
          beforeSequence: N
        });
        if (k !== o) return;
        const D = new Set(s.value.transactions.map((w) => w.id));
        s.value.transactions.push(...U.result.transactions.filter((w) => !D.has(w.id))), s.value.nextCursor = U.result.nextCursor, s.value.hasMore = U.result.hasMore;
      } catch (U) {
        k === o && (l.value = U instanceof Error ? U.message : String(U));
      } finally {
        k === o && (n.value = !1);
      }
    }
    return Ft(() => {
      a = t.bridge.subscribe((N) => {
        N.type === "wallet/state" && (o += 1, y(N.payload.state)), N.type === "wallet/error" && (i.value = String(N.payload?.message || "钱包暂时无法读取"));
      });
    }), Lt(() => {
      o += 1, a();
    }), (N, k) => (M(), L("main", rf, [v("header", nf, [k[1] || (k[1] = v("div", null, [v("span", { class: "wallet-header-kicker" }, "XIAOBAI LEDGER"), v("h1", null, "钱包")], -1)), v("button", {
      type: "button",
      class: "wallet-refresh",
      title: "重新读取账本",
      disabled: h.value,
      onClick: B
    }, [...k[0] || (k[0] = [v("svg", {
      viewBox: "0 0 24 24",
      "aria-hidden": "true"
    }, [v("path", { d: "M20 7v5h-5M4 17v-5h5M18.2 9A7 7 0 0 0 6.1 6.7L4 9m16 6-2.1 2.3A7 7 0 0 1 5.8 15" })], -1), v("span", { class: "sr-only" }, "重新读取账本", -1)])], 8, lf)]), v("div", af, [
      ce(ju, {
        balance: s.value.balance,
        currency: s.value.currency,
        status: s.value.status
      }, null, 8, [
        "balance",
        "currency",
        "status"
      ]),
      s.value.message || i.value ? (M(), L("aside", {
        key: 0,
        class: Be(["wallet-notice", `is-${s.value.status}`]),
        role: "status"
      }, [v("span", of, X(s.value.status === "ready" ? "!" : "※"), 1), v("div", null, [
        v("strong", null, X(s.value.status === "conflict" ? "账本发生冲突" : s.value.status === "blocked" ? "账本暂停" : "账本状态"), 1),
        v("p", null, X(i.value || s.value.message), 1),
        c.value ? (M(), L("button", {
          key: 0,
          type: "button",
          disabled: r.value,
          onClick: O
        }, X(r.value ? "正在核实…" : "核实保存结果"), 9, uf)) : s.value.status === "blocked" ? (M(), L("button", {
          key: 1,
          type: "button",
          disabled: r.value,
          onClick: B
        }, X(r.value ? "正在读取…" : "重新读取"), 9, ff)) : oe("", !0)
      ])], 2)) : oe("", !0),
      v("section", cf, [v("header", null, [k[2] || (k[2] = v("div", null, [v("span", null, "收支簿"), v("h2", { id: "wallet-ledger-title" }, "流水明细")], -1)), v("small", null, X(s.value.transactionCount) + " 笔", 1)]), ce(sf, {
        transactions: s.value.transactions,
        "has-more": s.value.hasMore,
        "loading-more": n.value,
        error: l.value,
        onLoadMore: z
      }, null, 8, [
        "transactions",
        "has-more",
        "loading-more",
        "error"
      ])])
    ])]));
  }
}), vf = df, hf = Object.freeze([{
  ...wo,
  icon: "conversation",
  component: Du
}, {
  ...Ru,
  icon: "wallet",
  component: vf
}]), pf = { class: "xiaobai-os-home" }, gf = ["src"], mf = {
  class: "xiaobai-os-app-grid",
  "aria-label": "应用"
}, bf = ["onClick"], yf = {
  class: "xiaobai-os-app-icon",
  "aria-hidden": "true"
}, _f = {
  key: 0,
  viewBox: "0 0 64 64"
}, wf = {
  key: 1,
  viewBox: "0 0 64 64"
}, xf = { class: "xiaobai-os-app-name" }, Cf = /* @__PURE__ */ Ae({
  __name: "XiaobaiOsHome",
  props: {
    apps: {},
    characterAvatar: {}
  },
  emits: ["openApp"],
  setup(e) {
    return (t, s) => (M(), L("main", pf, [
      e.characterAvatar ? (M(), L("img", {
        key: 0,
        class: "xiaobai-os-wallpaper",
        src: e.characterAvatar,
        alt: ""
      }, null, 8, gf)) : oe("", !0),
      s[2] || (s[2] = v("div", {
        class: "xiaobai-os-home-wash",
        "aria-hidden": "true"
      }, null, -1)),
      v("section", mf, [(M(!0), L(he, null, as(e.apps, (r) => (M(), L("button", {
        key: r.id,
        type: "button",
        class: "xiaobai-os-app-tile",
        style: Fs({ "--app-accent": r.accent }),
        onClick: (n) => t.$emit("openApp", r)
      }, [v("span", yf, [r.icon === "wallet" ? (M(), L("svg", _f, [...s[0] || (s[0] = [v("path", { d: "M12 19.5h37a5 5 0 0 1 5 5v24a5 5 0 0 1-5 5H15a5 5 0 0 1-5-5v-30a8 8 0 0 1 8-8h27" }, null, -1), v("path", { d: "M54 30H42a6 6 0 0 0 0 12h12M43 36h.1" }, null, -1)])])) : (M(), L("svg", wf, [...s[1] || (s[1] = [v("path", { d: "M13 15h38v29H32l-12 9 3-9H13z" }, null, -1), v("path", { d: "M22 25h20M22 33h14" }, null, -1)])]))]), v("span", xf, X(r.name), 1)], 12, bf))), 128))])
    ]));
  }
}), Sf = Cf, Af = ["disabled"], Tf = {
  key: 0,
  "aria-hidden": "true"
}, Ef = /* @__PURE__ */ Ae({
  __name: "XiaobaiOsNavigation",
  props: { isHome: { type: Boolean } },
  emits: [
    "back",
    "home",
    "close"
  ],
  setup(e) {
    return (t, s) => (M(), L("nav", {
      class: Be(["xiaobai-os-navigation", { "is-home": e.isHome }]),
      "aria-label": "系统导航"
    }, [
      v("button", {
        type: "button",
        class: "xiaobai-os-nav-button",
        disabled: e.isHome,
        "aria-label": "返回",
        onClick: s[0] || (s[0] = (r) => t.$emit("back"))
      }, [...s[3] || (s[3] = [v("svg", {
        viewBox: "0 0 24 24",
        "aria-hidden": "true"
      }, [v("path", { d: "m14.5 6-6 6 6 6" })], -1)])], 8, Af),
      v("button", {
        type: "button",
        class: "xiaobai-os-nav-button xiaobai-os-home-button",
        "aria-label": "主页",
        onClick: s[1] || (s[1] = (r) => t.$emit("home"))
      }, [s[4] || (s[4] = v("svg", {
        viewBox: "0 0 24 24",
        "aria-hidden": "true"
      }, [v("path", { d: "m4.5 11 7.5-6 7.5 6v8h-5v-5h-5v5h-5z" })], -1)), e.isHome ? (M(), L("i", Tf)) : oe("", !0)]),
      v("button", {
        type: "button",
        class: "xiaobai-os-nav-button xiaobai-os-close-button",
        "aria-label": "关闭",
        onClick: s[2] || (s[2] = (r) => t.$emit("close"))
      }, [...s[5] || (s[5] = [v("span", null, [v("svg", {
        viewBox: "0 0 24 24",
        "aria-hidden": "true"
      }, [v("path", { d: "m7 9.5 5 5 5-5" })])], -1)])])
    ], 2));
  }
}), If = Ef, $f = /* @__PURE__ */ Ae({
  __name: "XiaobaiOsSystemBar",
  props: { isHome: { type: Boolean } },
  setup(e) {
    return (t, s) => (M(), L("header", {
      class: Be(["xiaobai-os-system-bar", { "is-home": e.isHome }]),
      "aria-label": "系统状态"
    }, [...s[0] || (s[0] = [v("span", { class: "xiaobai-os-system-mark" }, "小白", -1), v("span", {
      class: "xiaobai-os-system-status",
      "aria-hidden": "true"
    }, [v("span", { class: "xiaobai-os-signal" }, [
      v("i"),
      v("i"),
      v("i"),
      v("i")
    ]), v("span", { class: "xiaobai-os-battery" }, [v("i")])], -1)])], 2));
  }
}), Of = $f, Mf = { class: "xiaobai-os-device" }, kf = { class: "xiaobai-os-glass" }, Pf = { class: "xiaobai-os-stage" }, Ff = /* @__PURE__ */ Ae({
  __name: "XiaobaiOsDevice",
  props: {
    apps: {},
    activeComponent: {},
    activeState: {},
    bridge: {},
    characterAvatar: {},
    isHome: { type: Boolean }
  },
  emits: [
    "openApp",
    "back",
    "home",
    "close"
  ],
  setup(e) {
    return (t, s) => (M(), L("div", Mf, [s[4] || (s[4] = v("span", {
      class: "xiaobai-os-side-key",
      "aria-hidden": "true"
    }, null, -1)), v("div", kf, [
      ce(Of, { "is-home": e.isHome }, null, 8, ["is-home"]),
      v("div", Pf, [ce(Ua, {
        name: "xiaobai-os-route",
        mode: "out-in"
      }, {
        default: ri(() => [e.isHome ? (M(), ct(Sf, {
          key: "home",
          apps: e.apps,
          "character-avatar": e.characterAvatar,
          onOpenApp: s[0] || (s[0] = (r) => t.$emit("openApp", r))
        }, null, 8, ["apps", "character-avatar"])) : e.activeComponent ? (M(), ct(Jl(e.activeComponent), {
          key: "app",
          bridge: e.bridge,
          "initial-state": e.activeState
        }, null, 8, ["bridge", "initial-state"])) : oe("", !0)]),
        _: 1
      })]),
      ce(If, {
        "is-home": e.isHome,
        onBack: s[1] || (s[1] = (r) => t.$emit("back")),
        onHome: s[2] || (s[2] = (r) => t.$emit("home")),
        onClose: s[3] || (s[3] = (r) => t.$emit("close"))
      }, null, 8, ["is-home"])
    ])]));
  }
}), Lf = Ff, Df = "LittleWhiteBox-XiaobaiOS";
function Rf() {
  return `xiaobai-os-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
}
function Nf() {
  const e = /* @__PURE__ */ new Map(), t = /* @__PURE__ */ new Set();
  let s = !1;
  function r(u, h = {}, g = "") {
    parent.postMessage({
      source: Df,
      type: u,
      requestId: g,
      payload: h
    }, window.location.origin);
  }
  function n(u) {
    const h = String(u.requestId || "");
    if (!h) return !1;
    const g = e.get(h);
    if (!g) return !1;
    e.delete(h), clearTimeout(g.timer);
    const y = u.payload;
    return y?.ok === !1 ? g.reject(new Error(y.error || "host_request_failed")) : g.resolve(y), !0;
  }
  function i(u) {
    u.origin !== window.location.origin || u.source !== parent || u.data?.source !== "LittleWhiteBox-XiaobaiOS" || typeof u.data.type != "string" || n(u.data) || t.forEach((h) => h(u.data));
  }
  function l() {
    s || (s = !0, window.addEventListener("message", i), r("os/frame-ready"));
  }
  function a(u, h = {}, g = 15e3) {
    const y = Rf();
    return new Promise((B, O) => {
      const z = setTimeout(() => {
        e.delete(y), O(/* @__PURE__ */ new Error("host_request_timeout"));
      }, g);
      e.set(y, {
        resolve: B,
        reject: O,
        timer: z
      }), r(u, h, y);
    });
  }
  function o(u) {
    return t.add(u), () => t.delete(u);
  }
  function c() {
    s && window.removeEventListener("message", i), s = !1, t.clear(), e.forEach((u) => {
      clearTimeout(u.timer), u.reject(/* @__PURE__ */ new Error("frame_bridge_disposed"));
    }), e.clear();
  }
  return Object.freeze({
    start: l,
    post: r,
    request: a,
    subscribe: o,
    dispose: c
  });
}
var Hf = {
  key: 0,
  class: "xiaobai-os-error",
  role: "alert"
}, Bf = {
  key: 1,
  class: "xiaobai-os-loading",
  role: "status"
}, Vf = /* @__PURE__ */ Ae({
  __name: "App",
  setup(e) {
    const t = Nf(), s = /* @__PURE__ */ ne(null), r = /* @__PURE__ */ ne(!1), n = /* @__PURE__ */ ne("light"), i = /* @__PURE__ */ ne(/* @__PURE__ */ new Set()), l = /* @__PURE__ */ ne(""), a = /* @__PURE__ */ ne(null), o = /* @__PURE__ */ ne(null), c = /* @__PURE__ */ ne("");
    let u = null, h = () => {
    }, g = 0;
    const y = _e(() => hf.filter((w) => i.value.has(w.id))), B = _e(() => a.value === null);
    function O(w) {
      g += 1, n.value = w.theme === "dark" ? "dark" : "light", i.value = new Set((w.apps || []).map((A) => String(A.id))), l.value = String(w.chat?.characterAvatar || ""), a.value = null, o.value = null, r.value = !0;
    }
    function z(w) {
      w.type === "os/init" && O(w.payload || {}), w.type === "os/theme-changed" && (n.value = w.payload?.theme === "dark" ? "dark" : "light"), w.type === "os/error" && (c.value = String(w.payload?.message || "小白 OS 初始化失败"));
    }
    async function N(w) {
      const A = ++g;
      c.value = "";
      try {
        const I = await t.request("app/activate", { appId: w.id });
        if (A !== g) return;
        if (I.appId !== w.id) throw new Error("app_activation_mismatch");
        o.value = I.state ?? null, a.value = w;
      } catch (I) {
        if (A !== g) return;
        a.value = null, c.value = I instanceof Error ? I.message : String(I);
      }
    }
    function k() {
      g += 1, t.post("app/deactivate", { appId: a.value?.id || "" }), a.value = null, o.value = null;
    }
    function U() {
      g += 1, t.post("os/close");
    }
    function D(w) {
      if (w.key === "Escape") {
        w.preventDefault(), a.value ? k() : U();
        return;
      }
      if (w.key !== "Tab" || !s.value) return;
      const A = Array.from(s.value.querySelectorAll('button:not(:disabled), [href], input:not(:disabled), textarea:not(:disabled), [tabindex]:not([tabindex="-1"])'));
      if (A.length === 0) return;
      const I = A[0], H = A[A.length - 1];
      w.shiftKey && document.activeElement === I ? (w.preventDefault(), H.focus()) : !w.shiftKey && document.activeElement === H && (w.preventDefault(), I.focus());
    }
    return Ft(async () => {
      u = document.activeElement instanceof HTMLElement ? document.activeElement : null, h = t.subscribe(z), t.start(), await Tr(), s.value?.focus();
    }), Lt(() => {
      g += 1, h(), t.dispose(), u?.focus();
    }), (w, A) => (M(), L("main", {
      ref_key: "root",
      ref: s,
      class: Be(["xiaobai-os-shell", `theme-${n.value}`]),
      role: "dialog",
      "aria-modal": "true",
      "aria-label": "小白 OS",
      tabindex: "-1",
      onKeydown: D,
      onClick: Vi(U, ["self"])
    }, [c.value ? (M(), L("div", Hf, X(c.value), 1)) : oe("", !0), r.value ? (M(), ct(Lf, {
      key: 2,
      apps: y.value,
      "active-component": a.value?.component || null,
      "active-state": o.value,
      bridge: Jn(t),
      "character-avatar": l.value,
      "is-home": B.value,
      onOpenApp: N,
      onBack: k,
      onHome: k,
      onClose: U
    }, null, 8, [
      "apps",
      "active-component",
      "active-state",
      "bridge",
      "character-avatar",
      "is-home"
    ])) : (M(), L("div", Bf, "正在启动小白 OS"))], 34));
  }
}), jf = Vf;
bo(jf).mount("#app");
