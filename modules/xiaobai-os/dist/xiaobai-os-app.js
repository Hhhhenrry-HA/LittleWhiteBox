/* eslint-disable */
// @__NO_SIDE_EFFECTS__
function En(e) {
  const t = /* @__PURE__ */ Object.create(null);
  for (const a of e.split(",")) t[a] = 1;
  return (a) => a in t;
}
var Se = {}, ca = [], kt = () => {
}, Wi = () => !1, In = (e) => e.charCodeAt(0) === 111 && e.charCodeAt(1) === 110 && (e.charCodeAt(2) > 122 || e.charCodeAt(2) < 97), Pn = (e) => e.startsWith("onUpdate:"), Ee = Object.assign, ws = (e, t) => {
  const a = e.indexOf(t);
  a > -1 && e.splice(a, 1);
}, Tl = Object.prototype.hasOwnProperty, be = (e, t) => Tl.call(e, t), ae = Array.isArray, fa = (e) => en(e) === "[object Map]", wa = (e) => en(e) === "[object Set]", Ys = (e) => en(e) === "[object Date]", ie = (e) => typeof e == "function", Me = (e) => typeof e == "string", ut = (e) => typeof e == "symbol", ye = (e) => e !== null && typeof e == "object", Yi = (e) => (ye(e) || ie(e)) && ie(e.then) && ie(e.catch), Xi = Object.prototype.toString, en = (e) => Xi.call(e), El = (e) => en(e).slice(8, -1), Ji = (e) => en(e) === "[object Object]", xs = (e) => Me(e) && e !== "NaN" && e[0] !== "-" && "" + parseInt(e, 10) === e, Da = /* @__PURE__ */ En(",key,ref,ref_for,ref_key,onVnodeBeforeMount,onVnodeMounted,onVnodeBeforeUpdate,onVnodeUpdated,onVnodeBeforeUnmount,onVnodeUnmounted"), On = (e) => {
  const t = /* @__PURE__ */ Object.create(null);
  return ((a) => t[a] || (t[a] = e(a)));
}, Il = /-\w/g, Ve = On((e) => e.replace(Il, (t) => t.slice(1).toUpperCase())), Pl = /\B([A-Z])/g, Gt = On((e) => e.replace(Pl, "-$1").toLowerCase()), Ln = On((e) => e.charAt(0).toUpperCase() + e.slice(1)), Gn = On((e) => e ? `on${Ln(e)}` : ""), yt = (e, t) => !Object.is(e, t), gn = (e, ...t) => {
  for (let a = 0; a < e.length; a++) e[a](...t);
}, Qi = (e, t, a, n = !1) => {
  Object.defineProperty(e, t, {
    configurable: !0,
    enumerable: !1,
    writable: n,
    value: a
  });
}, Rn = (e) => {
  const t = parseFloat(e);
  return isNaN(t) ? e : t;
}, Ol = (e) => {
  const t = Me(e) ? Number(e) : NaN;
  return isNaN(t) ? e : t;
}, Xs, Nn = () => Xs || (Xs = typeof globalThis < "u" ? globalThis : typeof self < "u" ? self : typeof window < "u" ? window : typeof globalThis < "u" ? globalThis : {});
function Vt(e) {
  if (ae(e)) {
    const t = {};
    for (let a = 0; a < e.length; a++) {
      const n = e[a], s = Me(n) ? Dl(n) : Vt(n);
      if (s) for (const r in s) t[r] = s[r];
    }
    return t;
  } else if (Me(e) || ye(e)) return e;
}
var Ll = /;(?![^(]*\))/g, Rl = /:([^]+)/, Nl = /\/\*[^]*?\*\//g;
function Dl(e) {
  const t = {};
  return e.replace(Nl, "").split(Ll).forEach((a) => {
    if (a) {
      const n = a.split(Rl);
      n.length > 1 && (t[n[0].trim()] = n[1].trim());
    }
  }), t;
}
function ne(e) {
  let t = "";
  if (Me(e)) t = e;
  else if (ae(e)) for (let a = 0; a < e.length; a++) {
    const n = ne(e[a]);
    n && (t += n + " ");
  }
  else if (ye(e))
    for (const a in e) e[a] && (t += a + " ");
  return t.trim();
}
var Zi = "itemscope,allowfullscreen,formnovalidate,ismap,nomodule,novalidate,readonly", Bl = /* @__PURE__ */ En(Zi), e0 = /* @__PURE__ */ En(Zi + ",async,autofocus,autoplay,controls,default,defer,disabled,hidden,inert,loop,open,required,reversed,scoped,seamless,checked,muted,multiple,selected");
function er(e) {
  return !!e || e === "";
}
function ql(e, t) {
  if (e.length !== t.length) return !1;
  let a = !0;
  for (let n = 0; a && n < e.length; n++) a = xa(e[n], t[n]);
  return a;
}
function xa(e, t) {
  if (e === t) return !0;
  let a = Ys(e), n = Ys(t);
  if (a || n) return a && n ? e.getTime() === t.getTime() : !1;
  if (a = ut(e), n = ut(t), a || n) return e === t;
  if (a = ae(e), n = ae(t), a || n) return a && n ? ql(e, t) : !1;
  if (a = ye(e), n = ye(t), a || n) {
    if (!a || !n || Object.keys(e).length !== Object.keys(t).length) return !1;
    for (const s in e) {
      const r = e.hasOwnProperty(s), o = t.hasOwnProperty(s);
      if (r && !o || !r && o || !xa(e[s], t[s])) return !1;
    }
  }
  return String(e) === String(t);
}
function Ss(e, t) {
  return e.findIndex((a) => xa(a, t));
}
var tr = (e) => !!(e && e.__v_isRef === !0), y = (e) => Me(e) ? e : e == null ? "" : ae(e) || ye(e) && (e.toString === Xi || !ie(e.toString)) ? tr(e) ? y(e.value) : JSON.stringify(e, ar, 2) : String(e), ar = (e, t) => tr(t) ? ar(e, t.value) : fa(t) ? { [`Map(${t.size})`]: [...t.entries()].reduce((a, [n, s], r) => (a[Vn(n, r) + " =>"] = s, a), {}) } : wa(t) ? { [`Set(${t.size})`]: [...t.values()].map((a) => Vn(a)) } : ut(t) ? Vn(t) : ye(t) && !ae(t) && !Ji(t) ? String(t) : t, Vn = (e, t = "") => {
  var a;
  return ut(e) ? `Symbol(${(a = e.description) != null ? a : t})` : e;
}, Pe, Ul = class {
  constructor(e = !1) {
    this.detached = e, this._active = !0, this._on = 0, this.effects = [], this.cleanups = [], this._isPaused = !1, this._warnOnRun = !0, this.__v_skip = !0, !e && Pe && (Pe.active ? (this.parent = Pe, this.index = (Pe.scopes || (Pe.scopes = [])).push(this) - 1) : (this._active = !1, this._warnOnRun = !1));
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
      const t = Pe;
      try {
        return Pe = this, e();
      } finally {
        Pe = t;
      }
    }
  }
  on() {
    ++this._on === 1 && (this.prevScope = Pe, Pe = this);
  }
  off() {
    if (this._on > 0 && --this._on === 0) {
      if (Pe === this) Pe = this.prevScope;
      else {
        let e = Pe;
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
function Fl() {
  return Pe;
}
var _e, zn = /* @__PURE__ */ new WeakSet(), nr = class {
  constructor(e) {
    this.fn = e, this.deps = void 0, this.depsTail = void 0, this.flags = 5, this.next = void 0, this.cleanup = void 0, this.scheduler = void 0, Pe && (Pe.active ? Pe.effects.push(this) : this.flags &= -2);
  }
  pause() {
    this.flags |= 64;
  }
  resume() {
    this.flags & 64 && (this.flags &= -65, zn.has(this) && (zn.delete(this), this.trigger()));
  }
  notify() {
    this.flags & 2 && !(this.flags & 32) || this.flags & 8 || ir(this);
  }
  run() {
    if (!(this.flags & 1)) return this.fn();
    this.flags |= 2, Js(this), rr(this);
    const e = _e, t = ot;
    _e = this, ot = !0;
    try {
      return this.fn();
    } finally {
      lr(this), _e = e, ot = t, this.flags &= -3;
    }
  }
  stop() {
    if (this.flags & 1) {
      for (let e = this.deps; e; e = e.nextDep) Cs(e);
      this.deps = this.depsTail = void 0, Js(this), this.onStop && this.onStop(), this.flags &= -2;
    }
  }
  trigger() {
    this.flags & 64 ? zn.add(this) : this.scheduler ? this.scheduler() : this.runIfDirty();
  }
  runIfDirty() {
    ls(this) && this.run();
  }
  get dirty() {
    return ls(this);
  }
}, sr = 0, Ba, qa;
function ir(e, t = !1) {
  if (e.flags |= 8, t) {
    e.next = qa, qa = e;
    return;
  }
  e.next = Ba, Ba = e;
}
function _s() {
  sr++;
}
function $s() {
  if (--sr > 0) return;
  if (qa) {
    let t = qa;
    for (qa = void 0; t; ) {
      const a = t.next;
      t.next = void 0, t.flags &= -9, t = a;
    }
  }
  let e;
  for (; Ba; ) {
    let t = Ba;
    for (Ba = void 0; t; ) {
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
function rr(e) {
  for (let t = e.deps; t; t = t.nextDep)
    t.version = -1, t.prevActiveLink = t.dep.activeLink, t.dep.activeLink = t;
}
function lr(e) {
  let t, a = e.depsTail, n = a;
  for (; n; ) {
    const s = n.prevDep;
    n.version === -1 ? (n === a && (a = s), Cs(n), jl(n)) : t = n, n.dep.activeLink = n.prevActiveLink, n.prevActiveLink = void 0, n = s;
  }
  e.deps = t, e.depsTail = a;
}
function ls(e) {
  for (let t = e.deps; t; t = t.nextDep) if (t.dep.version !== t.version || t.dep.computed && (or(t.dep.computed) || t.dep.version !== t.version)) return !0;
  return !!e._dirty;
}
function or(e) {
  if (e.flags & 4 && !(e.flags & 16) || (e.flags &= -17, e.globalVersion === Ha) || (e.globalVersion = Ha, !e.isSSR && e.flags & 128 && (!e.deps && !e._dirty || !ls(e)))) return;
  e.flags |= 2;
  const t = e.dep, a = _e, n = ot;
  _e = e, ot = !0;
  try {
    rr(e);
    const s = e.fn(e._value);
    (t.version === 0 || yt(s, e._value)) && (e.flags |= 128, e._value = s, t.version++);
  } catch (s) {
    throw t.version++, s;
  } finally {
    _e = a, ot = n, lr(e), e.flags &= -3;
  }
}
function Cs(e, t = !1) {
  const { dep: a, prevSub: n, nextSub: s } = e;
  if (n && (n.nextSub = s, e.prevSub = void 0), s && (s.prevSub = n, e.nextSub = void 0), a.subs === e && (a.subs = n, !n && a.computed)) {
    a.computed.flags &= -5;
    for (let r = a.computed.deps; r; r = r.nextDep) Cs(r, !0);
  }
  !t && !--a.sc && a.map && a.map.delete(a.key);
}
function jl(e) {
  const { prevDep: t, nextDep: a } = e;
  t && (t.nextDep = a, e.prevDep = void 0), a && (a.prevDep = t, e.nextDep = void 0);
}
var ot = !0, ur = [];
function It() {
  ur.push(ot), ot = !1;
}
function Pt() {
  const e = ur.pop();
  ot = e === void 0 ? !0 : e;
}
function Js(e) {
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
var Ha = 0, Hl = class {
  constructor(e, t) {
    this.sub = e, this.dep = t, this.version = t.version, this.nextDep = this.prevDep = this.nextSub = this.prevSub = this.prevActiveLink = void 0;
  }
}, As = class {
  constructor(e) {
    this.computed = e, this.version = 0, this.activeLink = void 0, this.subs = void 0, this.map = void 0, this.key = void 0, this.sc = 0, this.__v_skip = !0;
  }
  track(e) {
    if (!_e || !ot || _e === this.computed) return;
    let t = this.activeLink;
    if (t === void 0 || t.sub !== _e)
      t = this.activeLink = new Hl(_e, this), _e.deps ? (t.prevDep = _e.depsTail, _e.depsTail.nextDep = t, _e.depsTail = t) : _e.deps = _e.depsTail = t, dr(t);
    else if (t.version === -1 && (t.version = this.version, t.nextDep)) {
      const a = t.nextDep;
      a.prevDep = t.prevDep, t.prevDep && (t.prevDep.nextDep = a), t.prevDep = _e.depsTail, t.nextDep = void 0, _e.depsTail.nextDep = t, _e.depsTail = t, _e.deps === t && (_e.deps = a);
    }
    return t;
  }
  trigger(e) {
    this.version++, Ha++, this.notify(e);
  }
  notify(e) {
    _s();
    try {
      for (let t = this.subs; t; t = t.prevSub) t.sub.notify() && t.sub.dep.notify();
    } finally {
      $s();
    }
  }
};
function dr(e) {
  if (e.dep.sc++, e.sub.flags & 4) {
    const t = e.dep.computed;
    if (t && !e.dep.subs) {
      t.flags |= 20;
      for (let n = t.deps; n; n = n.nextDep) dr(n);
    }
    const a = e.dep.subs;
    a !== e && (e.prevSub = a, a && (a.nextSub = e)), e.dep.subs = e;
  }
}
var os = /* @__PURE__ */ new WeakMap(), ta = /* @__PURE__ */ Symbol(""), us = /* @__PURE__ */ Symbol(""), Ka = /* @__PURE__ */ Symbol("");
function Be(e, t, a) {
  if (ot && _e) {
    let n = os.get(e);
    n || os.set(e, n = /* @__PURE__ */ new Map());
    let s = n.get(a);
    s || (n.set(a, s = new As()), s.map = n, s.key = a), s.track();
  }
}
function Mt(e, t, a, n, s, r) {
  const o = os.get(e);
  if (!o) {
    Ha++;
    return;
  }
  const l = (u) => {
    u && u.trigger();
  };
  if (_s(), t === "clear") o.forEach(l);
  else {
    const u = ae(e), v = u && xs(a);
    if (u && a === "length") {
      const d = Number(n);
      o.forEach((m, S) => {
        (S === "length" || S === Ka || !ut(S) && S >= d) && l(m);
      });
    } else
      switch ((a !== void 0 || o.has(void 0)) && l(o.get(a)), v && l(o.get(Ka)), t) {
        case "add":
          u ? v && l(o.get("length")) : (l(o.get(ta)), fa(e) && l(o.get(us)));
          break;
        case "delete":
          u || (l(o.get(ta)), fa(e) && l(o.get(us)));
          break;
        case "set":
          fa(e) && l(o.get(ta));
          break;
      }
  }
  $s();
}
function ra(e) {
  const t = /* @__PURE__ */ se(e);
  return t === e ? t : (Be(t, "iterate", Ka), /* @__PURE__ */ st(e) ? t : t.map(dt));
}
function Dn(e) {
  return Be(e = /* @__PURE__ */ se(e), "iterate", Ka), e;
}
function bt(e, t) {
  return /* @__PURE__ */ Lt(e) ? ma(/* @__PURE__ */ aa(e) ? dt(t) : t) : dt(t);
}
var Kl = {
  __proto__: null,
  [Symbol.iterator]() {
    return Wn(this, Symbol.iterator, (e) => bt(this, e));
  },
  concat(...e) {
    return ra(this).concat(...e.map((t) => ae(t) ? ra(t) : t));
  },
  entries() {
    return Wn(this, "entries", (e) => (e[1] = bt(this, e[1]), e));
  },
  every(e, t) {
    return St(this, "every", e, t, void 0, arguments);
  },
  filter(e, t) {
    return St(this, "filter", e, t, (a) => a.map((n) => bt(this, n)), arguments);
  },
  find(e, t) {
    return St(this, "find", e, t, (a) => bt(this, a), arguments);
  },
  findIndex(e, t) {
    return St(this, "findIndex", e, t, void 0, arguments);
  },
  findLast(e, t) {
    return St(this, "findLast", e, t, (a) => bt(this, a), arguments);
  },
  findLastIndex(e, t) {
    return St(this, "findLastIndex", e, t, void 0, arguments);
  },
  forEach(e, t) {
    return St(this, "forEach", e, t, void 0, arguments);
  },
  includes(...e) {
    return Yn(this, "includes", e);
  },
  indexOf(...e) {
    return Yn(this, "indexOf", e);
  },
  join(e) {
    return ra(this).join(e);
  },
  lastIndexOf(...e) {
    return Yn(this, "lastIndexOf", e);
  },
  map(e, t) {
    return St(this, "map", e, t, void 0, arguments);
  },
  pop() {
    return Aa(this, "pop");
  },
  push(...e) {
    return Aa(this, "push", e);
  },
  reduce(e, ...t) {
    return Qs(this, "reduce", e, t);
  },
  reduceRight(e, ...t) {
    return Qs(this, "reduceRight", e, t);
  },
  shift() {
    return Aa(this, "shift");
  },
  some(e, t) {
    return St(this, "some", e, t, void 0, arguments);
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
    return Wn(this, "values", (e) => bt(this, e));
  }
};
function Wn(e, t, a) {
  const n = Dn(e), s = n[t]();
  return n !== e && !/* @__PURE__ */ st(e) && (s._next = s.next, s.next = () => {
    const r = s._next();
    return r.done || (r.value = a(r.value)), r;
  }), s;
}
var Gl = Array.prototype;
function St(e, t, a, n, s, r) {
  const o = Dn(e), l = o !== e && !/* @__PURE__ */ st(e), u = o[t];
  if (u !== Gl[t]) {
    const m = u.apply(e, r);
    return l ? dt(m) : m;
  }
  let v = a;
  o !== e && (l ? v = function(m, S) {
    return a.call(this, bt(e, m), S, e);
  } : a.length > 2 && (v = function(m, S) {
    return a.call(this, m, S, e);
  }));
  const d = u.call(o, v, n);
  return l && s ? s(d) : d;
}
function Qs(e, t, a, n) {
  const s = Dn(e), r = s !== e && !/* @__PURE__ */ st(e);
  let o = a, l = !1;
  s !== e && (r ? (l = n.length === 0, o = function(v, d, m) {
    return l && (l = !1, v = bt(e, v)), a.call(this, v, bt(e, d), m, e);
  }) : a.length > 3 && (o = function(v, d, m) {
    return a.call(this, v, d, m, e);
  }));
  const u = s[t](o, ...n);
  return l ? bt(e, u) : u;
}
function Yn(e, t, a) {
  const n = /* @__PURE__ */ se(e);
  Be(n, "iterate", Ka);
  const s = n[t](...a);
  return (s === -1 || s === !1) && /* @__PURE__ */ Es(a[0]) ? (a[0] = /* @__PURE__ */ se(a[0]), n[t](...a)) : s;
}
function Aa(e, t, a = []) {
  It(), _s();
  const n = (/* @__PURE__ */ se(e))[t].apply(e, a);
  return $s(), Pt(), n;
}
var Vl = /* @__PURE__ */ En("__proto__,__v_isRef,__isVue"), cr = new Set(/* @__PURE__ */ Object.getOwnPropertyNames(Symbol).filter((e) => e !== "arguments" && e !== "caller").map((e) => Symbol[e]).filter(ut));
function zl(e) {
  ut(e) || (e = String(e));
  const t = /* @__PURE__ */ se(this);
  return Be(t, "has", e), t.hasOwnProperty(e);
}
var fr = class {
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
      return a === (n ? s ? no : mr : s ? gr : pr).get(e) || Object.getPrototypeOf(e) === Object.getPrototypeOf(a) ? e : void 0;
    const r = ae(e);
    if (!n) {
      let l;
      if (r && (l = Kl[t])) return l;
      if (t === "hasOwnProperty") return zl;
    }
    const o = Reflect.get(e, t, /* @__PURE__ */ Fe(e) ? e : a);
    if ((ut(t) ? cr.has(t) : Vl(t)) || (n || Be(e, "get", t), s)) return o;
    if (/* @__PURE__ */ Fe(o)) {
      const l = r && xs(t) ? o : o.value;
      return n && ye(l) ? /* @__PURE__ */ cs(l) : l;
    }
    return ye(o) ? n ? /* @__PURE__ */ cs(o) : /* @__PURE__ */ Ot(o) : o;
  }
}, vr = class extends fr {
  constructor(e = !1) {
    super(!1, e);
  }
  set(e, t, a, n) {
    let s = e[t];
    const r = ae(e) && xs(t);
    if (!this._isShallow) {
      const u = /* @__PURE__ */ Lt(s);
      if (!/* @__PURE__ */ st(a) && !/* @__PURE__ */ Lt(a) && (s = /* @__PURE__ */ se(s), a = /* @__PURE__ */ se(a)), !r && /* @__PURE__ */ Fe(s) && !/* @__PURE__ */ Fe(a)) return u || (s.value = a), !0;
    }
    const o = r ? Number(t) < e.length : be(e, t), l = Reflect.set(e, t, a, /* @__PURE__ */ Fe(e) ? e : n);
    return e === /* @__PURE__ */ se(n) && (o ? yt(a, s) && Mt(e, "set", t, a, s) : Mt(e, "add", t, a)), l;
  }
  deleteProperty(e, t) {
    const a = be(e, t), n = e[t], s = Reflect.deleteProperty(e, t);
    return s && a && Mt(e, "delete", t, void 0, n), s;
  }
  has(e, t) {
    const a = Reflect.has(e, t);
    return (!ut(t) || !cr.has(t)) && Be(e, "has", t), a;
  }
  ownKeys(e) {
    return Be(e, "iterate", ae(e) ? "length" : ta), Reflect.ownKeys(e);
  }
}, Wl = class extends fr {
  constructor(e = !1) {
    super(!0, e);
  }
  set(e, t) {
    return !0;
  }
  deleteProperty(e, t) {
    return !0;
  }
}, Yl = /* @__PURE__ */ new vr(), Xl = /* @__PURE__ */ new Wl(), Jl = /* @__PURE__ */ new vr(!0), ds = (e) => e, ln = (e) => Reflect.getPrototypeOf(e);
function Ql(e, t, a) {
  return function(...n) {
    const s = this.__v_raw, r = /* @__PURE__ */ se(s), o = fa(r), l = e === "entries" || e === Symbol.iterator && o, u = e === "keys" && o, v = s[e](...n), d = a ? ds : t ? ma : dt;
    return !t && Be(r, "iterate", u ? us : ta), Ee(Object.create(v), { next() {
      const { value: m, done: S } = v.next();
      return S ? {
        value: m,
        done: S
      } : {
        value: l ? [d(m[0]), d(m[1])] : d(m),
        done: S
      };
    } });
  };
}
function on(e) {
  return function(...t) {
    return e === "delete" ? !1 : e === "clear" ? void 0 : this;
  };
}
function Zl(e, t) {
  const a = {
    get(n) {
      const s = this.__v_raw, r = /* @__PURE__ */ se(s), o = /* @__PURE__ */ se(n);
      e || (yt(n, o) && Be(r, "get", n), Be(r, "get", o));
      const { has: l } = ln(r), u = t ? ds : e ? ma : dt;
      if (l.call(r, n)) return u(s.get(n));
      if (l.call(r, o)) return u(s.get(o));
      s !== r && s.get(n);
    },
    get size() {
      const n = this.__v_raw;
      return !e && Be(/* @__PURE__ */ se(n), "iterate", ta), n.size;
    },
    has(n) {
      const s = this.__v_raw, r = /* @__PURE__ */ se(s), o = /* @__PURE__ */ se(n);
      return e || (yt(n, o) && Be(r, "has", n), Be(r, "has", o)), n === o ? s.has(n) : s.has(n) || s.has(o);
    },
    forEach(n, s) {
      const r = this, o = r.__v_raw, l = /* @__PURE__ */ se(o), u = t ? ds : e ? ma : dt;
      return !e && Be(l, "iterate", ta), o.forEach((v, d) => n.call(s, u(v), u(d), r));
    }
  };
  return Ee(a, e ? {
    add: on("add"),
    set: on("set"),
    delete: on("delete"),
    clear: on("clear")
  } : {
    add(n) {
      const s = /* @__PURE__ */ se(this), r = ln(s), o = /* @__PURE__ */ se(n), l = !t && !/* @__PURE__ */ st(n) && !/* @__PURE__ */ Lt(n) ? o : n;
      return r.has.call(s, l) || yt(n, l) && r.has.call(s, n) || yt(o, l) && r.has.call(s, o) || (s.add(l), Mt(s, "add", l, l)), this;
    },
    set(n, s) {
      !t && !/* @__PURE__ */ st(s) && !/* @__PURE__ */ Lt(s) && (s = /* @__PURE__ */ se(s));
      const r = /* @__PURE__ */ se(this), { has: o, get: l } = ln(r);
      let u = o.call(r, n);
      u || (n = /* @__PURE__ */ se(n), u = o.call(r, n));
      const v = l.call(r, n);
      return r.set(n, s), u ? yt(s, v) && Mt(r, "set", n, s, v) : Mt(r, "add", n, s), this;
    },
    delete(n) {
      const s = /* @__PURE__ */ se(this), { has: r, get: o } = ln(s);
      let l = r.call(s, n);
      l || (n = /* @__PURE__ */ se(n), l = r.call(s, n));
      const u = o ? o.call(s, n) : void 0, v = s.delete(n);
      return l && Mt(s, "delete", n, void 0, u), v;
    },
    clear() {
      const n = /* @__PURE__ */ se(this), s = n.size !== 0, r = void 0, o = n.clear();
      return s && Mt(n, "clear", void 0, void 0, r), o;
    }
  }), [
    "keys",
    "values",
    "entries",
    Symbol.iterator
  ].forEach((n) => {
    a[n] = Ql(n, e, t);
  }), a;
}
function Ms(e, t) {
  const a = Zl(e, t);
  return (n, s, r) => s === "__v_isReactive" ? !e : s === "__v_isReadonly" ? e : s === "__v_raw" ? n : Reflect.get(be(a, s) && s in n ? a : n, s, r);
}
var eo = { get: /* @__PURE__ */ Ms(!1, !1) }, to = { get: /* @__PURE__ */ Ms(!1, !0) }, ao = { get: /* @__PURE__ */ Ms(!0, !1) }, pr = /* @__PURE__ */ new WeakMap(), gr = /* @__PURE__ */ new WeakMap(), mr = /* @__PURE__ */ new WeakMap(), no = /* @__PURE__ */ new WeakMap();
function so(e) {
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
function Ot(e) {
  return /* @__PURE__ */ Lt(e) ? e : Ts(e, !1, Yl, eo, pr);
}
// @__NO_SIDE_EFFECTS__
function io(e) {
  return Ts(e, !1, Jl, to, gr);
}
// @__NO_SIDE_EFFECTS__
function cs(e) {
  return Ts(e, !0, Xl, ao, mr);
}
function Ts(e, t, a, n, s) {
  if (!ye(e) || e.__v_raw && !(t && e.__v_isReactive) || e.__v_skip || !Object.isExtensible(e)) return e;
  const r = s.get(e);
  if (r) return r;
  const o = so(El(e));
  if (o === 0) return e;
  const l = new Proxy(e, o === 2 ? n : a);
  return s.set(e, l), l;
}
// @__NO_SIDE_EFFECTS__
function aa(e) {
  return /* @__PURE__ */ Lt(e) ? /* @__PURE__ */ aa(e.__v_raw) : !!(e && e.__v_isReactive);
}
// @__NO_SIDE_EFFECTS__
function Lt(e) {
  return !!(e && e.__v_isReadonly);
}
// @__NO_SIDE_EFFECTS__
function st(e) {
  return !!(e && e.__v_isShallow);
}
// @__NO_SIDE_EFFECTS__
function Es(e) {
  return e ? !!e.__v_raw : !1;
}
// @__NO_SIDE_EFFECTS__
function se(e) {
  const t = e && e.__v_raw;
  return t ? /* @__PURE__ */ se(t) : e;
}
function ro(e) {
  return !be(e, "__v_skip") && Object.isExtensible(e) && Qi(e, "__v_skip", !0), e;
}
var dt = (e) => ye(e) ? /* @__PURE__ */ Ot(e) : e, ma = (e) => ye(e) ? /* @__PURE__ */ cs(e) : e;
// @__NO_SIDE_EFFECTS__
function Fe(e) {
  return e ? e.__v_isRef === !0 : !1;
}
// @__NO_SIDE_EFFECTS__
function Y(e) {
  return lo(e, !1);
}
function lo(e, t) {
  return /* @__PURE__ */ Fe(e) ? e : new oo(e, t);
}
var oo = class {
  constructor(e, t) {
    this.dep = new As(), this.__v_isRef = !0, this.__v_isShallow = !1, this._rawValue = t ? e : /* @__PURE__ */ se(e), this._value = t ? e : dt(e), this.__v_isShallow = t;
  }
  get value() {
    return this.dep.track(), this._value;
  }
  set value(e) {
    const t = this._rawValue, a = this.__v_isShallow || /* @__PURE__ */ st(e) || /* @__PURE__ */ Lt(e);
    e = a ? e : /* @__PURE__ */ se(e), yt(e, t) && (this._rawValue = e, this._value = a ? e : dt(e), this.dep.trigger());
  }
};
function pe(e) {
  return /* @__PURE__ */ Fe(e) ? e.value : e;
}
var uo = {
  get: (e, t, a) => t === "__v_raw" ? e : pe(Reflect.get(e, t, a)),
  set: (e, t, a, n) => {
    const s = e[t];
    return /* @__PURE__ */ Fe(s) && !/* @__PURE__ */ Fe(a) ? (s.value = a, !0) : Reflect.set(e, t, a, n);
  }
};
function br(e) {
  return /* @__PURE__ */ aa(e) ? e : new Proxy(e, uo);
}
var co = class {
  constructor(e, t, a) {
    this.fn = e, this.setter = t, this._value = void 0, this.dep = new As(this), this.__v_isRef = !0, this.deps = void 0, this.depsTail = void 0, this.flags = 16, this.globalVersion = Ha - 1, this.next = void 0, this.effect = this, this.__v_isReadonly = !t, this.isSSR = a;
  }
  notify() {
    if (this.flags |= 16, !(this.flags & 8) && _e !== this)
      return ir(this, !0), !0;
  }
  get value() {
    const e = this.dep.track();
    return or(this), e && (e.version = this.dep.version), this._value;
  }
  set value(e) {
    this.setter && this.setter(e);
  }
};
// @__NO_SIDE_EFFECTS__
function fo(e, t, a = !1) {
  let n, s;
  return ie(e) ? n = e : (n = e.get, s = e.set), new co(n, s, a);
}
var un = {}, kn = /* @__PURE__ */ new WeakMap(), Zt = void 0;
function vo(e, t = !1, a = Zt) {
  if (a) {
    let n = kn.get(a);
    n || kn.set(a, n = []), n.push(e);
  }
}
function po(e, t, a = Se) {
  const { immediate: n, deep: s, once: r, scheduler: o, augmentJob: l, call: u } = a, v = (E) => s ? E : /* @__PURE__ */ st(E) || s === !1 || s === 0 ? Tt(E, 1) : Tt(E);
  let d, m, S, h, A = !1, L = !1;
  if (/* @__PURE__ */ Fe(e) ? (m = () => e.value, A = /* @__PURE__ */ st(e)) : /* @__PURE__ */ aa(e) ? (m = () => v(e), A = !0) : ae(e) ? (L = !0, A = e.some((E) => /* @__PURE__ */ aa(E) || /* @__PURE__ */ st(E)), m = () => e.map((E) => {
    if (/* @__PURE__ */ Fe(E)) return E.value;
    if (/* @__PURE__ */ aa(E)) return v(E);
    if (ie(E)) return u ? u(E, 2) : E();
  })) : ie(e) ? t ? m = u ? () => u(e, 2) : e : m = () => {
    if (S) {
      It();
      try {
        S();
      } finally {
        Pt();
      }
    }
    const E = Zt;
    Zt = d;
    try {
      return u ? u(e, 3, [h]) : e(h);
    } finally {
      Zt = E;
    }
  } : m = kt, t && s) {
    const E = m, C = s === !0 ? 1 / 0 : s;
    m = () => Tt(E(), C);
  }
  const X = Fl(), V = () => {
    d.stop(), X && X.active && ws(X.effects, d);
  };
  if (r && t) {
    const E = t;
    t = (...C) => {
      E(...C), V();
    };
  }
  let W = L ? new Array(e.length).fill(un) : un;
  const G = (E) => {
    if (!(!(d.flags & 1) || !d.dirty && !E))
      if (t) {
        const C = d.run();
        if (s || A || (L ? C.some((M, x) => yt(M, W[x])) : yt(C, W))) {
          S && S();
          const M = Zt;
          Zt = d;
          try {
            const x = [
              C,
              W === un ? void 0 : L && W[0] === un ? [] : W,
              h
            ];
            W = C, u ? u(t, 3, x) : t(...x);
          } finally {
            Zt = M;
          }
        }
      } else d.run();
  };
  return l && l(G), d = new nr(m), d.scheduler = o ? () => o(G, !1) : G, h = (E) => vo(E, !1, d), S = d.onStop = () => {
    const E = kn.get(d);
    if (E) {
      if (u) u(E, 4);
      else for (const C of E) C();
      kn.delete(d);
    }
  }, t ? n ? G(!0) : W = d.run() : o ? o(G.bind(null, !0), !0) : d.run(), V.pause = d.pause.bind(d), V.resume = d.resume.bind(d), V.stop = V, V;
}
function Tt(e, t = 1 / 0, a) {
  if (t <= 0 || !ye(e) || e.__v_skip || (a = a || /* @__PURE__ */ new Map(), (a.get(e) || 0) >= t)) return e;
  if (a.set(e, t), t--, /* @__PURE__ */ Fe(e)) Tt(e.value, t, a);
  else if (ae(e)) for (let n = 0; n < e.length; n++) Tt(e[n], t, a);
  else if (wa(e) || fa(e)) e.forEach((n) => {
    Tt(n, t, a);
  });
  else if (Ji(e)) {
    for (const n in e) Tt(e[n], t, a);
    for (const n of Object.getOwnPropertySymbols(e)) Object.prototype.propertyIsEnumerable.call(e, n) && Tt(e[n], t, a);
  }
  return e;
}
function tn(e, t, a, n) {
  try {
    return n ? e(...n) : e();
  } catch (s) {
    Bn(s, t, a);
  }
}
function rt(e, t, a, n) {
  if (ie(e)) {
    const s = tn(e, t, a, n);
    return s && Yi(s) && s.catch((r) => {
      Bn(r, t, a);
    }), s;
  }
  if (ae(e)) {
    const s = [];
    for (let r = 0; r < e.length; r++) s.push(rt(e[r], t, a, n));
    return s;
  }
}
function Bn(e, t, a, n = !0) {
  const s = t ? t.vnode : null, { errorHandler: r, throwUnhandledErrorInProduction: o } = t && t.appContext.config || Se;
  if (t) {
    let l = t.parent;
    const u = t.proxy, v = `https://vuejs.org/error-reference/#runtime-${a}`;
    for (; l; ) {
      const d = l.ec;
      if (d) {
        for (let m = 0; m < d.length; m++) if (d[m](e, u, v) === !1) return;
      }
      l = l.parent;
    }
    if (r) {
      It(), tn(r, null, 10, [
        e,
        u,
        v
      ]), Pt();
      return;
    }
  }
  go(e, a, s, n, o);
}
function go(e, t, a, n = !0, s = !1) {
  if (s) throw e;
  console.error(e);
}
var Ge = [], gt = -1, va = [], Ut = null, oa = 0, hr = /* @__PURE__ */ Promise.resolve(), wn = null;
function an(e) {
  const t = wn || hr;
  return e ? t.then(this ? e.bind(this) : e) : t;
}
function mo(e) {
  let t = gt + 1, a = Ge.length;
  for (; t < a; ) {
    const n = t + a >>> 1, s = Ge[n], r = Ga(s);
    r < e || r === e && s.flags & 2 ? t = n + 1 : a = n;
  }
  return t;
}
function Is(e) {
  if (!(e.flags & 1)) {
    const t = Ga(e), a = Ge[Ge.length - 1];
    !a || !(e.flags & 2) && t >= Ga(a) ? Ge.push(e) : Ge.splice(mo(t), 0, e), e.flags |= 1, yr();
  }
}
function yr() {
  wn || (wn = hr.then(wr));
}
function bo(e) {
  ae(e) ? va.push(...e) : Ut && e.id === -1 ? Ut.splice(oa + 1, 0, e) : e.flags & 1 || (va.push(e), e.flags |= 1), yr();
}
function Zs(e, t, a = gt + 1) {
  for (; a < Ge.length; a++) {
    const n = Ge[a];
    if (n && n.flags & 2) {
      if (e && n.id !== e.uid) continue;
      Ge.splice(a, 1), a--, n.flags & 4 && (n.flags &= -2), n(), n.flags & 4 || (n.flags &= -2);
    }
  }
}
function kr(e) {
  if (va.length) {
    const t = [...new Set(va)].sort((a, n) => Ga(a) - Ga(n));
    if (va.length = 0, Ut) {
      Ut.push(...t);
      return;
    }
    for (Ut = t, oa = 0; oa < Ut.length; oa++) {
      const a = Ut[oa];
      a.flags & 4 && (a.flags &= -2), a.flags & 8 || a(), a.flags &= -2;
    }
    Ut = null, oa = 0;
  }
}
var Ga = (e) => e.id == null ? e.flags & 2 ? -1 : 1 / 0 : e.id;
function wr(e) {
  try {
    for (gt = 0; gt < Ge.length; gt++) {
      const t = Ge[gt];
      t && !(t.flags & 8) && (t.flags & 4 && (t.flags &= -2), tn(t, t.i, t.i ? 15 : 14), t.flags & 4 || (t.flags &= -2));
    }
  } finally {
    for (; gt < Ge.length; gt++) {
      const t = Ge[gt];
      t && (t.flags &= -2);
    }
    gt = -1, Ge.length = 0, kr(e), wn = null, (Ge.length || va.length) && wr(e);
  }
}
var Oe = null, xr = null;
function xn(e) {
  const t = Oe;
  return Oe = e, xr = e && e.type.__scopeId || null, t;
}
function na(e, t = Oe, a) {
  if (!t || e._n) return e;
  const n = (...s) => {
    n._d && Cn(-1);
    const r = xn(t);
    let o;
    try {
      o = e(...s);
    } finally {
      xn(r), n._d && Cn(1);
    }
    return o;
  };
  return n._n = !0, n._c = !0, n._d = !0, n;
}
function Te(e, t) {
  if (Oe === null) return e;
  const a = Hn(Oe), n = e.dirs || (e.dirs = []);
  for (let s = 0; s < t.length; s++) {
    let [r, o, l, u = Se] = t[s];
    r && (ie(r) && (r = {
      mounted: r,
      updated: r
    }), r.deep && Tt(o), n.push({
      dir: r,
      instance: a,
      value: o,
      oldValue: void 0,
      arg: l,
      modifiers: u
    }));
  }
  return e;
}
function Yt(e, t, a, n) {
  const s = e.dirs, r = t && t.dirs;
  for (let o = 0; o < s.length; o++) {
    const l = s[o];
    r && (l.oldValue = r[o].value);
    let u = l.dir[n];
    u && (It(), rt(u, a, 8, [
      e.el,
      l,
      e,
      t
    ]), Pt());
  }
}
function ho(e, t) {
  if (Ue) {
    let a = Ue.provides;
    const n = Ue.parent && Ue.parent.provides;
    n === a && (a = Ue.provides = Object.create(n)), a[e] = t;
  }
}
function mn(e, t, a = !1) {
  const n = tl();
  if (n || ga) {
    let s = ga ? ga._context.provides : n ? n.parent == null || n.ce ? n.vnode.appContext && n.vnode.appContext.provides : n.parent.provides : void 0;
    if (s && e in s) return s[e];
    if (arguments.length > 1) return a && ie(t) ? t.call(n && n.proxy) : t;
  }
}
var yo = /* @__PURE__ */ Symbol.for("v-scx"), ko = () => {
  {
    const e = mn(yo);
    return e;
  }
};
function jt(e, t, a) {
  return Sr(e, t, a);
}
function Sr(e, t, a = Se) {
  const { immediate: n, deep: s, flush: r, once: o } = a, l = Ee({}, a), u = t && n || !t && r !== "post";
  let v;
  if (Ya) {
    if (r === "sync") {
      const h = ko();
      v = h.__watcherHandles || (h.__watcherHandles = []);
    } else if (!u) {
      const h = () => {
      };
      return h.stop = kt, h.resume = kt, h.pause = kt, h;
    }
  }
  const d = Ue;
  l.call = (h, A, L) => rt(h, d, A, L);
  let m = !1;
  r === "post" ? l.scheduler = (h) => {
    ze(h, d && d.suspense);
  } : r !== "sync" && (m = !0, l.scheduler = (h, A) => {
    A ? h() : Is(h);
  }), l.augmentJob = (h) => {
    t && (h.flags |= 4), m && (h.flags |= 2, d && (h.id = d.uid, h.i = d));
  };
  const S = po(e, t, l);
  return Ya && (v ? v.push(S) : u && S()), S;
}
function wo(e, t, a) {
  const n = this.proxy, s = Me(e) ? e.includes(".") ? _r(n, e) : () => n[e] : e.bind(n, n);
  let r;
  ie(t) ? r = t : (r = t.handler, a = t);
  const o = nn(this), l = Sr(s, r.bind(n), a);
  return o(), l;
}
function _r(e, t) {
  const a = t.split(".");
  return () => {
    let n = e;
    for (let s = 0; s < a.length && n; s++) n = n[a[s]];
    return n;
  };
}
var xo = /* @__PURE__ */ Symbol("_vte"), $r = (e) => e.__isTeleport, nt = /* @__PURE__ */ Symbol("_leaveCb"), Ma = /* @__PURE__ */ Symbol("_enterCb");
function So() {
  const e = {
    isMounted: !1,
    isLeaving: !1,
    isUnmounting: !1,
    leavingVNodes: /* @__PURE__ */ new Map()
  };
  return ct(() => {
    e.isMounted = !0;
  }), lt(() => {
    e.isUnmounting = !0;
  }), e;
}
var tt = [Function, Array], Cr = {
  mode: String,
  appear: Boolean,
  persisted: Boolean,
  onBeforeEnter: tt,
  onEnter: tt,
  onAfterEnter: tt,
  onEnterCancelled: tt,
  onBeforeLeave: tt,
  onLeave: tt,
  onAfterLeave: tt,
  onLeaveCancelled: tt,
  onBeforeAppear: tt,
  onAppear: tt,
  onAfterAppear: tt,
  onAppearCancelled: tt
}, Ar = (e) => {
  const t = e.subTree;
  return t.component ? Ar(t.component) : t;
}, _o = {
  name: "BaseTransition",
  props: Cr,
  setup(e, { slots: t }) {
    const a = tl(), n = So();
    return () => {
      const s = t.default && Er(t.default(), !0), r = s && s.length ? Mr(s) : a.subTree ? q() : void 0;
      if (!r) return;
      const o = /* @__PURE__ */ se(e), { mode: l } = o;
      if (n.isLeaving) return Xn(r);
      const u = ei(r);
      if (!u) return Xn(r);
      let v = fs(u, o, n, a, (m) => v = m);
      u.type !== qe && Va(u, v);
      let d = a.subTree && ei(a.subTree);
      if (d && d.type !== qe && !ea(d, u) && Ar(a).type !== qe) {
        let m = fs(d, o, n, a);
        if (Va(d, m), l === "out-in" && u.type !== qe)
          return n.isLeaving = !0, m.afterLeave = () => {
            n.isLeaving = !1, a.job.flags & 8 || a.update(), delete m.afterLeave, d = void 0;
          }, Xn(r);
        l === "in-out" && u.type !== qe ? m.delayLeave = (S, h, A) => {
          const L = Tr(n, d);
          L[String(d.key)] = d, S[nt] = () => {
            h(), S[nt] = void 0, delete v.delayedLeave, d = void 0;
          }, v.delayedLeave = () => {
            A(), delete v.delayedLeave, d = void 0;
          };
        } : d = void 0;
      } else d && (d = void 0);
      return r;
    };
  }
};
function Mr(e) {
  let t = e[0];
  if (e.length > 1) {
    for (const a of e) if (a.type !== qe) {
      t = a;
      break;
    }
  }
  return t;
}
var $o = _o;
function Tr(e, t) {
  const { leavingVNodes: a } = e;
  let n = a.get(t.type);
  return n || (n = /* @__PURE__ */ Object.create(null), a.set(t.type, n)), n;
}
function fs(e, t, a, n, s) {
  const { appear: r, mode: o, persisted: l = !1, onBeforeEnter: u, onEnter: v, onAfterEnter: d, onEnterCancelled: m, onBeforeLeave: S, onLeave: h, onAfterLeave: A, onLeaveCancelled: L, onBeforeAppear: X, onAppear: V, onAfterAppear: W, onAppearCancelled: G } = t, E = String(e.key), C = Tr(a, e), M = ($, F) => {
    $ && rt($, n, 9, F);
  }, x = ($, F) => {
    const Z = F[1];
    M($, F), ae($) ? $.every((K) => K.length <= 1) && Z() : $.length <= 1 && Z();
  }, _ = {
    mode: o,
    persisted: l,
    beforeEnter($) {
      let F = u;
      if (!a.isMounted) if (r) F = X || u;
      else return;
      $[nt] && $[nt](!0);
      const Z = C[E];
      Z && ea(e, Z) && Z.el[nt] && Z.el[nt](), M(F, [$]);
    },
    enter($) {
      if (C[E] === e) return;
      let F = v, Z = d, K = m;
      if (!a.isMounted) if (r)
        F = V || v, Z = W || d, K = G || m;
      else return;
      let J = !1;
      $[Ma] = (ue) => {
        J || (J = !0, ue ? M(K, [$]) : M(Z, [$]), _.delayedLeave && _.delayedLeave(), $[Ma] = void 0);
      };
      const D = $[Ma].bind(null, !1);
      F ? x(F, [$, D]) : D();
    },
    leave($, F) {
      const Z = String(e.key);
      if ($[Ma] && $[Ma](!0), a.isUnmounting) return F();
      M(S, [$]);
      let K = !1;
      $[nt] = (D) => {
        K || (K = !0, F(), D ? M(L, [$]) : M(A, [$]), $[nt] = void 0, C[Z] === e && delete C[Z]);
      };
      const J = $[nt].bind(null, !1);
      C[Z] = e, h ? x(h, [$, J]) : J();
    },
    clone($) {
      const F = fs($, t, a, n, s);
      return s && s(F), F;
    }
  };
  return _;
}
function Xn(e) {
  if (qn(e))
    return e = Kt(e), e.children = null, e;
}
function ei(e) {
  if (!qn(e))
    return $r(e.type) && e.children ? Mr(e.children) : e;
  if (e.component) return e.component.subTree;
  const { shapeFlag: t, children: a } = e;
  if (a) {
    if (t & 16) return a[0];
    if (t & 32 && ie(a.default)) return a.default();
  }
}
function Va(e, t) {
  e.shapeFlag & 6 && e.component ? (e.transition = t, Va(e.component.subTree, t)) : e.shapeFlag & 128 ? (e.ssContent.transition = t.clone(e.ssContent), e.ssFallback.transition = t.clone(e.ssFallback)) : e.transition = t;
}
function Er(e, t = !1, a) {
  let n = [], s = 0;
  for (let r = 0; r < e.length; r++) {
    let o = e[r];
    const l = a == null ? o.key : String(a) + String(o.key != null ? o.key : r);
    o.type === te ? (o.patchFlag & 128 && s++, n = n.concat(Er(o.children, t, l))) : (t || o.type !== qe) && n.push(l != null ? Kt(o, { key: l }) : o);
  }
  if (s > 1) for (let r = 0; r < n.length; r++) n[r].patchFlag = -2;
  return n;
}
// @__NO_SIDE_EFFECTS__
function oe(e, t) {
  return ie(e) ? Ee({ name: e.name }, t, { setup: e }) : e;
}
function Ir(e) {
  e.ids = [
    e.ids[0] + e.ids[2]++ + "-",
    0,
    0
  ];
}
function ti(e, t) {
  let a;
  return !!((a = Object.getOwnPropertyDescriptor(e, t)) && !a.configurable);
}
var Sn = /* @__PURE__ */ new WeakMap();
function Ua(e, t, a, n, s = !1) {
  if (ae(e)) {
    e.forEach((L, X) => Ua(L, t && (ae(t) ? t[X] : t), a, n, s));
    return;
  }
  if (pa(n) && !s) {
    n.shapeFlag & 512 && n.type.__asyncResolved && n.component.subTree.component && Ua(e, t, a, n.component.subTree);
    return;
  }
  const r = n.shapeFlag & 4 ? Hn(n.component) : n.el, o = s ? null : r, { i: l, r: u } = e, v = t && t.r, d = l.refs === Se ? l.refs = {} : l.refs, m = l.setupState, S = /* @__PURE__ */ se(m), h = m === Se ? Wi : (L) => ti(d, L) ? !1 : be(S, L), A = (L, X) => !(X && ti(d, X));
  if (v != null && v !== u) {
    if (ai(t), Me(v))
      d[v] = null, h(v) && (m[v] = null);
    else if (/* @__PURE__ */ Fe(v)) {
      const L = t;
      A(v, L.k) && (v.value = null), L.k && (d[L.k] = null);
    }
  }
  if (ie(u)) tn(u, l, 12, [o, d]);
  else {
    const L = Me(u), X = /* @__PURE__ */ Fe(u);
    if (L || X) {
      const V = () => {
        if (e.f) {
          const W = L ? h(u) ? m[u] : d[u] : A(u) || !e.k ? u.value : d[e.k];
          if (s) ae(W) && ws(W, r);
          else if (ae(W)) W.includes(r) || W.push(r);
          else if (L)
            d[u] = [r], h(u) && (m[u] = d[u]);
          else {
            const G = [r];
            A(u, e.k) && (u.value = G), e.k && (d[e.k] = G);
          }
        } else L ? (d[u] = o, h(u) && (m[u] = o)) : X && (A(u, e.k) && (u.value = o), e.k && (d[e.k] = o));
      };
      if (o) {
        const W = () => {
          V(), Sn.delete(e);
        };
        W.id = -1, Sn.set(e, W), ze(W, a);
      } else
        ai(e), V();
    }
  }
}
function ai(e) {
  const t = Sn.get(e);
  t && (t.flags |= 8, Sn.delete(e));
}
var t0 = Nn().requestIdleCallback || ((e) => setTimeout(e, 1)), a0 = Nn().cancelIdleCallback || ((e) => clearTimeout(e)), pa = (e) => !!e.type.__asyncLoader, qn = (e) => e.type.__isKeepAlive;
function Co(e, t) {
  Pr(e, "a", t);
}
function Ao(e, t) {
  Pr(e, "da", t);
}
function Pr(e, t, a = Ue) {
  const n = e.__wdc || (e.__wdc = () => {
    let s = a;
    for (; s; ) {
      if (s.isDeactivated) return;
      s = s.parent;
    }
    return e();
  });
  if (Un(t, n, a), a) {
    let s = a.parent;
    for (; s && s.parent; )
      qn(s.parent.vnode) && Mo(n, t, a, s), s = s.parent;
  }
}
function Mo(e, t, a, n) {
  const s = Un(t, e, n, !0);
  Or(() => {
    ws(n[t], s);
  }, a);
}
function Un(e, t, a = Ue, n = !1) {
  if (a) {
    const s = a[e] || (a[e] = []), r = t.__weh || (t.__weh = (...o) => {
      It();
      const l = nn(a), u = rt(t, a, e, o);
      return l(), Pt(), u;
    });
    return n ? s.unshift(r) : s.push(r), r;
  }
}
var Rt = (e) => (t, a = Ue) => {
  (!Ya || e === "sp") && Un(e, (...n) => t(...n), a);
}, To = Rt("bm"), ct = Rt("m"), Eo = Rt("bu"), Io = Rt("u"), lt = Rt("bum"), Or = Rt("um"), Po = Rt("sp"), Oo = Rt("rtg"), Lo = Rt("rtc");
function Ro(e, t = Ue) {
  Un("ec", e, t);
}
var Lr = "components", Rr = /* @__PURE__ */ Symbol.for("v-ndc");
function No(e) {
  return Me(e) ? Do(Lr, e, !1) || e : e || Rr;
}
function Do(e, t, a = !0, n = !1) {
  const s = Oe || Ue;
  if (s) {
    const r = s.type;
    if (e === Lr) {
      const l = xu(r, !1);
      if (l && (l === t || l === Ve(t) || l === Ln(Ve(t)))) return r;
    }
    const o = ni(s[e] || r[e], t) || ni(s.appContext[e], t);
    return !o && n ? r : o;
  }
}
function ni(e, t) {
  return e && (e[t] || e[Ve(t)] || e[Ln(Ve(t))]);
}
function me(e, t, a, n) {
  let s;
  const r = a && a[n], o = ae(e);
  if (o || Me(e)) {
    const l = o && /* @__PURE__ */ aa(e);
    let u = !1, v = !1;
    l && (u = !/* @__PURE__ */ st(e), v = /* @__PURE__ */ Lt(e), e = Dn(e)), s = new Array(e.length);
    for (let d = 0, m = e.length; d < m; d++) s[d] = t(u ? v ? ma(dt(e[d])) : dt(e[d]) : e[d], d, void 0, r && r[d]);
  } else if (typeof e == "number") {
    s = new Array(e);
    for (let l = 0; l < e; l++) s[l] = t(l + 1, l, void 0, r && r[l]);
  } else if (ye(e)) if (e[Symbol.iterator]) s = Array.from(e, (l, u) => t(l, u, void 0, r && r[u]));
  else {
    const l = Object.keys(e);
    s = new Array(l.length);
    for (let u = 0, v = l.length; u < v; u++) {
      const d = l[u];
      s[u] = t(e[d], d, u, r && r[u]);
    }
  }
  else s = [];
  return a && (a[n] = s), s;
}
function _n(e, t, a = {}, n, s) {
  if (Oe.ce || Oe.parent && pa(Oe.parent) && Oe.parent.ce) {
    const v = Object.keys(a).length > 0;
    return t !== "default" && (a.name = t), g(), he(te, null, [Ce("slot", a, n && n())], v ? -2 : 64);
  }
  let r = e[t];
  r && r._c && (r._d = !1), g();
  const o = r && Nr(r(a)), l = a.key || o && o.key, u = he(te, { key: (l && !ut(l) ? l : `_${t}`) + (!o && n ? "_fb" : "") }, o || (n ? n() : []), o && e._ === 1 ? 64 : -2);
  return !s && u.scopeId && (u.slotScopeIds = [u.scopeId + "-s"]), r && r._c && (r._d = !0), u;
}
function Nr(e) {
  return e.some((t) => Wa(t) ? !(t.type === qe || t.type === te && !Nr(t.children)) : !0) ? e : null;
}
var vs = (e) => e ? al(e) ? Hn(e) : vs(e.parent) : null, Fa = /* @__PURE__ */ Ee(/* @__PURE__ */ Object.create(null), {
  $: (e) => e,
  $el: (e) => e.vnode.el,
  $data: (e) => e.data,
  $props: (e) => e.props,
  $attrs: (e) => e.attrs,
  $slots: (e) => e.slots,
  $refs: (e) => e.refs,
  $parent: (e) => vs(e.parent),
  $root: (e) => vs(e.root),
  $host: (e) => e.ce,
  $emit: (e) => e.emit,
  $options: (e) => Ps(e),
  $forceUpdate: (e) => e.f || (e.f = () => {
    Is(e.update);
  }),
  $nextTick: (e) => e.n || (e.n = an.bind(e.proxy)),
  $watch: (e) => wo.bind(e)
}), Jn = (e, t) => e !== Se && !e.__isScriptSetup && be(e, t), Bo = {
  get({ _: e }, t) {
    if (t === "__v_skip") return !0;
    const { ctx: a, setupState: n, data: s, props: r, accessCache: o, type: l, appContext: u } = e;
    if (t[0] !== "$") {
      const S = o[t];
      if (S !== void 0) switch (S) {
        case 1:
          return n[t];
        case 2:
          return s[t];
        case 4:
          return a[t];
        case 3:
          return r[t];
      }
      else {
        if (Jn(n, t))
          return o[t] = 1, n[t];
        if (s !== Se && be(s, t))
          return o[t] = 2, s[t];
        if (be(r, t))
          return o[t] = 3, r[t];
        if (a !== Se && be(a, t))
          return o[t] = 4, a[t];
        ps && (o[t] = 0);
      }
    }
    const v = Fa[t];
    let d, m;
    if (v)
      return t === "$attrs" && Be(e.attrs, "get", ""), v(e);
    if ((d = l.__cssModules) && (d = d[t])) return d;
    if (a !== Se && be(a, t))
      return o[t] = 4, a[t];
    if (m = u.config.globalProperties, be(m, t)) return m[t];
  },
  set({ _: e }, t, a) {
    const { data: n, setupState: s, ctx: r } = e;
    return Jn(s, t) ? (s[t] = a, !0) : n !== Se && be(n, t) ? (n[t] = a, !0) : be(e.props, t) || t[0] === "$" && t.slice(1) in e ? !1 : (r[t] = a, !0);
  },
  has({ _: { data: e, setupState: t, accessCache: a, ctx: n, appContext: s, props: r, type: o } }, l) {
    let u;
    return !!(a[l] || e !== Se && l[0] !== "$" && be(e, l) || Jn(t, l) || be(r, l) || be(n, l) || be(Fa, l) || be(s.config.globalProperties, l) || (u = o.__cssModules) && u[l]);
  },
  defineProperty(e, t, a) {
    return a.get != null ? e._.accessCache[t] = 0 : be(a, "value") && this.set(e, t, a.value, null), Reflect.defineProperty(e, t, a);
  }
};
function si(e) {
  return ae(e) ? e.reduce((t, a) => (t[a] = null, t), {}) : e;
}
var ps = !0;
function qo(e) {
  const t = Ps(e), a = e.proxy, n = e.ctx;
  ps = !1, t.beforeCreate && ii(t.beforeCreate, e, "bc");
  const { data: s, computed: r, methods: o, watch: l, provide: u, inject: v, created: d, beforeMount: m, mounted: S, beforeUpdate: h, updated: A, activated: L, deactivated: X, beforeDestroy: V, beforeUnmount: W, destroyed: G, unmounted: E, render: C, renderTracked: M, renderTriggered: x, errorCaptured: _, serverPrefetch: $, expose: F, inheritAttrs: Z, components: K, directives: J, filters: D } = t;
  if (v && Uo(v, n, null), o) for (const de in o) {
    const ce = o[de];
    ie(ce) && (n[de] = ce.bind(a));
  }
  if (s) {
    const de = s.call(a, a);
    ye(de) && (e.data = /* @__PURE__ */ Ot(de));
  }
  if (ps = !0, r) for (const de in r) {
    const ce = r[de], j = z({
      get: ie(ce) ? ce.bind(a, a) : ie(ce.get) ? ce.get.bind(a, a) : kt,
      set: !ie(ce) && ie(ce.set) ? ce.set.bind(a) : kt
    });
    Object.defineProperty(n, de, {
      enumerable: !0,
      configurable: !0,
      get: () => j.value,
      set: (B) => j.value = B
    });
  }
  if (l) for (const de in l) Dr(l[de], n, a, de);
  if (u) {
    const de = ie(u) ? u.call(a) : u;
    Reflect.ownKeys(de).forEach((ce) => {
      ho(ce, de[ce]);
    });
  }
  d && ii(d, e, "c");
  function ke(de, ce) {
    ae(ce) ? ce.forEach((j) => de(j.bind(a))) : ce && de(ce.bind(a));
  }
  if (ke(To, m), ke(ct, S), ke(Eo, h), ke(Io, A), ke(Co, L), ke(Ao, X), ke(Ro, _), ke(Lo, M), ke(Oo, x), ke(lt, W), ke(Or, E), ke(Po, $), ae(F))
    if (F.length) {
      const de = e.exposed || (e.exposed = {});
      F.forEach((ce) => {
        Object.defineProperty(de, ce, {
          get: () => a[ce],
          set: (j) => a[ce] = j,
          enumerable: !0
        });
      });
    } else e.exposed || (e.exposed = {});
  C && e.render === kt && (e.render = C), Z != null && (e.inheritAttrs = Z), K && (e.components = K), J && (e.directives = J), $ && Ir(e);
}
function Uo(e, t, a = kt) {
  ae(e) && (e = gs(e));
  for (const n in e) {
    const s = e[n];
    let r;
    ye(s) ? "default" in s ? r = mn(s.from || n, s.default, !0) : r = mn(s.from || n) : r = mn(s), /* @__PURE__ */ Fe(r) ? Object.defineProperty(t, n, {
      enumerable: !0,
      configurable: !0,
      get: () => r.value,
      set: (o) => r.value = o
    }) : t[n] = r;
  }
}
function ii(e, t, a) {
  rt(ae(e) ? e.map((n) => n.bind(t.proxy)) : e.bind(t.proxy), t, a);
}
function Dr(e, t, a, n) {
  let s = n.includes(".") ? _r(a, n) : () => a[n];
  if (Me(e)) {
    const r = t[e];
    ie(r) && jt(s, r);
  } else if (ie(e)) jt(s, e.bind(a));
  else if (ye(e)) if (ae(e)) e.forEach((r) => Dr(r, t, a, n));
  else {
    const r = ie(e.handler) ? e.handler.bind(a) : t[e.handler];
    ie(r) && jt(s, r, e);
  }
}
function Ps(e) {
  const t = e.type, { mixins: a, extends: n } = t, { mixins: s, optionsCache: r, config: { optionMergeStrategies: o } } = e.appContext, l = r.get(t);
  let u;
  return l ? u = l : !s.length && !a && !n ? u = t : (u = {}, s.length && s.forEach((v) => $n(u, v, o, !0)), $n(u, t, o)), ye(t) && r.set(t, u), u;
}
function $n(e, t, a, n = !1) {
  const { mixins: s, extends: r } = t;
  r && $n(e, r, a, !0), s && s.forEach((o) => $n(e, o, a, !0));
  for (const o in t) if (!(n && o === "expose")) {
    const l = Fo[o] || a && a[o];
    e[o] = l ? l(e[o], t[o]) : t[o];
  }
  return e;
}
var Fo = {
  data: ri,
  props: li,
  emits: li,
  methods: La,
  computed: La,
  beforeCreate: Ke,
  created: Ke,
  beforeMount: Ke,
  mounted: Ke,
  beforeUpdate: Ke,
  updated: Ke,
  beforeDestroy: Ke,
  beforeUnmount: Ke,
  destroyed: Ke,
  unmounted: Ke,
  activated: Ke,
  deactivated: Ke,
  errorCaptured: Ke,
  serverPrefetch: Ke,
  components: La,
  directives: La,
  watch: Ho,
  provide: ri,
  inject: jo
};
function ri(e, t) {
  return t ? e ? function() {
    return Ee(ie(e) ? e.call(this, this) : e, ie(t) ? t.call(this, this) : t);
  } : t : e;
}
function jo(e, t) {
  return La(gs(e), gs(t));
}
function gs(e) {
  if (ae(e)) {
    const t = {};
    for (let a = 0; a < e.length; a++) t[e[a]] = e[a];
    return t;
  }
  return e;
}
function Ke(e, t) {
  return e ? [...new Set([].concat(e, t))] : t;
}
function La(e, t) {
  return e ? Ee(/* @__PURE__ */ Object.create(null), e, t) : t;
}
function li(e, t) {
  return e ? ae(e) && ae(t) ? [.../* @__PURE__ */ new Set([...e, ...t])] : Ee(/* @__PURE__ */ Object.create(null), si(e), si(t ?? {})) : t;
}
function Ho(e, t) {
  if (!e) return t;
  if (!t) return e;
  const a = Ee(/* @__PURE__ */ Object.create(null), e);
  for (const n in t) a[n] = Ke(e[n], t[n]);
  return a;
}
function Br() {
  return {
    app: null,
    config: {
      isNativeTag: Wi,
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
var Ko = 0;
function Go(e, t) {
  return function(n, s = null) {
    ie(n) || (n = Ee({}, n)), s != null && !ye(s) && (s = null);
    const r = Br(), o = /* @__PURE__ */ new WeakSet(), l = [];
    let u = !1;
    const v = r.app = {
      _uid: Ko++,
      _component: n,
      _props: s,
      _container: null,
      _context: r,
      _instance: null,
      version: $u,
      get config() {
        return r.config;
      },
      set config(d) {
      },
      use(d, ...m) {
        return o.has(d) || (d && ie(d.install) ? (o.add(d), d.install(v, ...m)) : ie(d) && (o.add(d), d(v, ...m))), v;
      },
      mixin(d) {
        return r.mixins.includes(d) || r.mixins.push(d), v;
      },
      component(d, m) {
        return m ? (r.components[d] = m, v) : r.components[d];
      },
      directive(d, m) {
        return m ? (r.directives[d] = m, v) : r.directives[d];
      },
      mount(d, m, S) {
        if (!u) {
          const h = v._ceVNode || Ce(n, s);
          return h.appContext = r, S === !0 ? S = "svg" : S === !1 && (S = void 0), m && t ? t(h, d) : e(h, d, S), u = !0, v._container = d, d.__vue_app__ = v, Hn(h.component);
        }
      },
      onUnmount(d) {
        l.push(d);
      },
      unmount() {
        u && (rt(l, v._instance, 16), e(null, v._container), delete v._container.__vue_app__);
      },
      provide(d, m) {
        return r.provides[d] = m, v;
      },
      runWithContext(d) {
        const m = ga;
        ga = v;
        try {
          return d();
        } finally {
          ga = m;
        }
      }
    };
    return v;
  };
}
var ga = null, Vo = (e, t) => t === "modelValue" || t === "model-value" ? e.modelModifiers : e[`${t}Modifiers`] || e[`${Ve(t)}Modifiers`] || e[`${Gt(t)}Modifiers`];
function zo(e, t, ...a) {
  if (e.isUnmounted) return;
  const n = e.vnode.props || Se;
  let s = a;
  const r = t.startsWith("update:"), o = r && Vo(n, t.slice(7));
  o && (o.trim && (s = a.map((d) => Me(d) ? d.trim() : d)), o.number && (s = a.map(Rn)));
  let l, u = n[l = Gn(t)] || n[l = Gn(Ve(t))];
  !u && r && (u = n[l = Gn(Gt(t))]), u && rt(u, e, 6, s);
  const v = n[l + "Once"];
  if (v) {
    if (!e.emitted) e.emitted = {};
    else if (e.emitted[l]) return;
    e.emitted[l] = !0, rt(v, e, 6, s);
  }
}
var Wo = /* @__PURE__ */ new WeakMap();
function qr(e, t, a = !1) {
  const n = a ? Wo : t.emitsCache, s = n.get(e);
  if (s !== void 0) return s;
  const r = e.emits;
  let o = {}, l = !1;
  if (!ie(e)) {
    const u = (v) => {
      const d = qr(v, t, !0);
      d && (l = !0, Ee(o, d));
    };
    !a && t.mixins.length && t.mixins.forEach(u), e.extends && u(e.extends), e.mixins && e.mixins.forEach(u);
  }
  return !r && !l ? (ye(e) && n.set(e, null), null) : (ae(r) ? r.forEach((u) => o[u] = null) : Ee(o, r), ye(e) && n.set(e, o), o);
}
function Fn(e, t) {
  return !e || !In(t) ? !1 : (t = t.slice(2).replace(/Once$/, ""), be(e, t[0].toLowerCase() + t.slice(1)) || be(e, Gt(t)) || be(e, t));
}
function Qn(e) {
  const { type: t, vnode: a, proxy: n, withProxy: s, propsOptions: [r], slots: o, attrs: l, emit: u, render: v, renderCache: d, props: m, data: S, setupState: h, ctx: A, inheritAttrs: L } = e, X = xn(e);
  let V, W;
  try {
    if (a.shapeFlag & 4) {
      const E = s || n, C = E;
      V = ht(v.call(C, E, d, m, h, S, A)), W = l;
    } else {
      const E = t;
      V = ht(E.length > 1 ? E(m, {
        attrs: l,
        slots: o,
        emit: u
      }) : E(m, null)), W = t.props ? l : Yo(l);
    }
  } catch (E) {
    ja.length = 0, Bn(E, e, 1), V = Ce(qe);
  }
  let G = V;
  if (W && L !== !1) {
    const E = Object.keys(W), { shapeFlag: C } = G;
    E.length && C & 7 && (r && E.some(Pn) && (W = Xo(W, r)), G = Kt(G, W, !1, !0));
  }
  return a.dirs && (G = Kt(G, null, !1, !0), G.dirs = G.dirs ? G.dirs.concat(a.dirs) : a.dirs), a.transition && Va(G, a.transition), V = G, xn(X), V;
}
var Yo = (e) => {
  let t;
  for (const a in e) (a === "class" || a === "style" || In(a)) && ((t || (t = {}))[a] = e[a]);
  return t;
}, Xo = (e, t) => {
  const a = {};
  for (const n in e) (!Pn(n) || !(n.slice(9) in t)) && (a[n] = e[n]);
  return a;
};
function Jo(e, t, a) {
  const { props: n, children: s, component: r } = e, { props: o, children: l, patchFlag: u } = t, v = r.emitsOptions;
  if (t.dirs || t.transition) return !0;
  if (a && u >= 0) {
    if (u & 1024) return !0;
    if (u & 16)
      return n ? oi(n, o, v) : !!o;
    if (u & 8) {
      const d = t.dynamicProps;
      for (let m = 0; m < d.length; m++) {
        const S = d[m];
        if (Ur(o, n, S) && !Fn(v, S)) return !0;
      }
    }
  } else
    return (s || l) && (!l || !l.$stable) ? !0 : n === o ? !1 : n ? o ? oi(n, o, v) : !0 : !!o;
  return !1;
}
function oi(e, t, a) {
  const n = Object.keys(t);
  if (n.length !== Object.keys(e).length) return !0;
  for (let s = 0; s < n.length; s++) {
    const r = n[s];
    if (Ur(t, e, r) && !Fn(a, r)) return !0;
  }
  return !1;
}
function Ur(e, t, a) {
  const n = e[a], s = t[a];
  return a === "style" && ye(n) && ye(s) ? !xa(n, s) : n !== s;
}
function Qo({ vnode: e, parent: t, suspense: a }, n) {
  for (; t; ) {
    const s = t.subTree;
    if (s.suspense && s.suspense.activeBranch === e && (s.suspense.vnode.el = s.el = n, e = s), s === e)
      (e = t.vnode).el = n, t = t.parent;
    else break;
  }
  a && a.activeBranch === e && (a.vnode.el = n);
}
var Fr = {}, jr = () => Object.create(Fr), Hr = (e) => Object.getPrototypeOf(e) === Fr;
function Zo(e, t, a, n = !1) {
  const s = {}, r = jr();
  e.propsDefaults = /* @__PURE__ */ Object.create(null), Kr(e, t, s, r);
  for (const o in e.propsOptions[0]) o in s || (s[o] = void 0);
  a ? e.props = n ? s : /* @__PURE__ */ io(s) : e.type.props ? e.props = s : e.props = r, e.attrs = r;
}
function eu(e, t, a, n) {
  const { props: s, attrs: r, vnode: { patchFlag: o } } = e, l = /* @__PURE__ */ se(s), [u] = e.propsOptions;
  let v = !1;
  if ((n || o > 0) && !(o & 16)) {
    if (o & 8) {
      const d = e.vnode.dynamicProps;
      for (let m = 0; m < d.length; m++) {
        let S = d[m];
        if (Fn(e.emitsOptions, S)) continue;
        const h = t[S];
        if (u) if (be(r, S))
          h !== r[S] && (r[S] = h, v = !0);
        else {
          const A = Ve(S);
          s[A] = ms(u, l, A, h, e, !1);
        }
        else h !== r[S] && (r[S] = h, v = !0);
      }
    }
  } else {
    Kr(e, t, s, r) && (v = !0);
    let d;
    for (const m in l) (!t || !be(t, m) && ((d = Gt(m)) === m || !be(t, d))) && (u ? a && (a[m] !== void 0 || a[d] !== void 0) && (s[m] = ms(u, l, m, void 0, e, !0)) : delete s[m]);
    if (r !== l)
      for (const m in r) (!t || !be(t, m)) && (delete r[m], v = !0);
  }
  v && Mt(e.attrs, "set", "");
}
function Kr(e, t, a, n) {
  const [s, r] = e.propsOptions;
  let o = !1, l;
  if (t) for (let u in t) {
    if (Da(u)) continue;
    const v = t[u];
    let d;
    s && be(s, d = Ve(u)) ? !r || !r.includes(d) ? a[d] = v : (l || (l = {}))[d] = v : Fn(e.emitsOptions, u) || (!(u in n) || v !== n[u]) && (n[u] = v, o = !0);
  }
  if (r) {
    const u = /* @__PURE__ */ se(a), v = l || Se;
    for (let d = 0; d < r.length; d++) {
      const m = r[d];
      a[m] = ms(s, u, m, v[m], e, !be(v, m));
    }
  }
  return o;
}
function ms(e, t, a, n, s, r) {
  const o = e[a];
  if (o != null) {
    const l = be(o, "default");
    if (l && n === void 0) {
      const u = o.default;
      if (o.type !== Function && !o.skipFactory && ie(u)) {
        const { propsDefaults: v } = s;
        if (a in v) n = v[a];
        else {
          const d = nn(s);
          n = v[a] = u.call(null, t), d();
        }
      } else n = u;
      s.ce && s.ce._setProp(a, n);
    }
    o[0] && (r && !l ? n = !1 : o[1] && (n === "" || n === Gt(a)) && (n = !0));
  }
  return n;
}
var tu = /* @__PURE__ */ new WeakMap();
function Gr(e, t, a = !1) {
  const n = a ? tu : t.propsCache, s = n.get(e);
  if (s) return s;
  const r = e.props, o = {}, l = [];
  let u = !1;
  if (!ie(e)) {
    const d = (m) => {
      u = !0;
      const [S, h] = Gr(m, t, !0);
      Ee(o, S), h && l.push(...h);
    };
    !a && t.mixins.length && t.mixins.forEach(d), e.extends && d(e.extends), e.mixins && e.mixins.forEach(d);
  }
  if (!r && !u)
    return ye(e) && n.set(e, ca), ca;
  if (ae(r)) for (let d = 0; d < r.length; d++) {
    const m = Ve(r[d]);
    ui(m) && (o[m] = Se);
  }
  else if (r) for (const d in r) {
    const m = Ve(d);
    if (ui(m)) {
      const S = r[d], h = o[m] = ae(S) || ie(S) ? { type: S } : Ee({}, S), A = h.type;
      let L = !1, X = !0;
      if (ae(A)) for (let V = 0; V < A.length; ++V) {
        const W = A[V], G = ie(W) && W.name;
        if (G === "Boolean") {
          L = !0;
          break;
        } else G === "String" && (X = !1);
      }
      else L = ie(A) && A.name === "Boolean";
      h[0] = L, h[1] = X, (L || be(h, "default")) && l.push(m);
    }
  }
  const v = [o, l];
  return ye(e) && n.set(e, v), v;
}
function ui(e) {
  return e[0] !== "$" && !Da(e);
}
var Os = (e) => e === "_" || e === "_ctx" || e === "$stable", Ls = (e) => ae(e) ? e.map(ht) : [ht(e)], au = (e, t, a) => {
  if (t._n) return t;
  const n = na((...s) => Ls(t(...s)), a);
  return n._c = !1, n;
}, Vr = (e, t, a) => {
  const n = e._ctx;
  for (const s in e) {
    if (Os(s)) continue;
    const r = e[s];
    if (ie(r)) t[s] = au(s, r, n);
    else if (r != null) {
      const o = Ls(r);
      t[s] = () => o;
    }
  }
}, zr = (e, t) => {
  const a = Ls(t);
  e.slots.default = () => a;
}, Wr = (e, t, a) => {
  for (const n in t) (a || !Os(n)) && (e[n] = t[n]);
}, nu = (e, t, a) => {
  const n = e.slots = jr();
  if (e.vnode.shapeFlag & 32) {
    const s = t._;
    s ? (Wr(n, t, a), a && Qi(n, "_", s, !0)) : Vr(t, n);
  } else t && zr(e, t);
}, su = (e, t, a) => {
  const { vnode: n, slots: s } = e;
  let r = !0, o = Se;
  if (n.shapeFlag & 32) {
    const l = t._;
    l ? a && l === 1 ? r = !1 : Wr(s, t, a) : (r = !t.$stable, Vr(t, s)), o = t;
  } else t && (zr(e, t), o = { default: 1 });
  if (r)
    for (const l in s) !Os(l) && o[l] == null && delete s[l];
}, ze = uu;
function iu(e) {
  return ru(e);
}
function ru(e, t) {
  const a = Nn();
  a.__VUE__ = !0;
  const { insert: n, remove: s, patchProp: r, createElement: o, createText: l, createComment: u, setText: v, setElementText: d, parentNode: m, nextSibling: S, setScopeId: h = kt, insertStaticContent: A } = e, L = (c, f, w, I = null, R = null, O = null, T = void 0, k = null, P = !!f.dynamicChildren) => {
    if (c === f) return;
    c && !ea(c, f) && (I = xt(c), Ae(c, R, O, !0), c = null), f.patchFlag === -2 && (P = !1, f.dynamicChildren = null);
    const { type: N, ref: H, shapeFlag: U } = f;
    switch (N) {
      case jn:
        X(c, f, w, I);
        break;
      case qe:
        V(c, f, w, I);
        break;
      case bn:
        c == null && W(f, w, I, T);
        break;
      case te:
        K(c, f, w, I, R, O, T, k, P);
        break;
      default:
        U & 1 ? C(c, f, w, I, R, O, T, k, P) : U & 6 ? J(c, f, w, I, R, O, T, k, P) : (U & 64 || U & 128) && N.process(c, f, w, I, R, O, T, k, P, ft);
    }
    H != null && R ? Ua(H, c && c.ref, O, f || c, !f) : H == null && c && c.ref != null && Ua(c.ref, null, O, c, !0);
  }, X = (c, f, w, I) => {
    if (c == null) n(f.el = l(f.children), w, I);
    else {
      const R = f.el = c.el;
      f.children !== c.children && v(R, f.children);
    }
  }, V = (c, f, w, I) => {
    c == null ? n(f.el = u(f.children || ""), w, I) : f.el = c.el;
  }, W = (c, f, w, I) => {
    [c.el, c.anchor] = A(c.children, f, w, I, c.el, c.anchor);
  }, G = ({ el: c, anchor: f }, w, I) => {
    let R;
    for (; c && c !== f; )
      R = S(c), n(c, w, I), c = R;
    n(f, w, I);
  }, E = ({ el: c, anchor: f }) => {
    let w;
    for (; c && c !== f; )
      w = S(c), s(c), c = w;
    s(f);
  }, C = (c, f, w, I, R, O, T, k, P) => {
    if (f.type === "svg" ? T = "svg" : f.type === "math" && (T = "mathml"), c == null) M(f, w, I, R, O, T, k, P);
    else {
      const N = c.el && c.el._isVueCE ? c.el : null;
      try {
        N && N._beginPatch(), $(c, f, R, O, T, k, P);
      } finally {
        N && N._endPatch();
      }
    }
  }, M = (c, f, w, I, R, O, T, k) => {
    let P, N;
    const { props: H, shapeFlag: U, transition: Q, dirs: ee } = c;
    if (P = c.el = o(c.type, O, H && H.is, H), U & 8 ? d(P, c.children) : U & 16 && _(c.children, P, null, I, R, Zn(c, O), T, k), ee && Yt(c, null, I, "created"), x(P, c, c.scopeId, T, I), H) {
      for (const fe in H) fe !== "value" && !Da(fe) && r(P, fe, null, H[fe], O, I);
      "value" in H && r(P, "value", null, H.value, O), (N = H.onVnodeBeforeMount) && vt(N, I, c);
    }
    ee && Yt(c, null, I, "beforeMount");
    const le = lu(R, Q);
    le && Q.beforeEnter(P), n(P, f, w), ((N = H && H.onVnodeMounted) || le || ee) && ze(() => {
      N && vt(N, I, c), le && Q.enter(P), ee && Yt(c, null, I, "mounted");
    }, R);
  }, x = (c, f, w, I, R) => {
    if (w && h(c, w), I) for (let O = 0; O < I.length; O++) h(c, I[O]);
    if (R) {
      let O = R.subTree;
      if (f === O || Qr(O.type) && (O.ssContent === f || O.ssFallback === f)) {
        const T = R.vnode;
        x(c, T, T.scopeId, T.slotScopeIds, R.parent);
      }
    }
  }, _ = (c, f, w, I, R, O, T, k, P = 0) => {
    for (let N = P; N < c.length; N++) L(null, c[N] = k ? At(c[N]) : ht(c[N]), f, w, I, R, O, T, k);
  }, $ = (c, f, w, I, R, O, T) => {
    const k = f.el = c.el;
    let { patchFlag: P, dynamicChildren: N, dirs: H } = f;
    P |= c.patchFlag & 16;
    const U = c.props || Se, Q = f.props || Se;
    let ee;
    if (w && Xt(w, !1), (ee = Q.onVnodeBeforeUpdate) && vt(ee, w, f, c), H && Yt(f, c, w, "beforeUpdate"), w && Xt(w, !0), (U.innerHTML && Q.innerHTML == null || U.textContent && Q.textContent == null) && d(k, ""), N ? F(c.dynamicChildren, N, k, w, I, Zn(f, R), O) : T || ce(c, f, k, null, w, I, Zn(f, R), O, !1), P > 0) {
      if (P & 16) Z(k, U, Q, w, R);
      else if (P & 2 && U.class !== Q.class && r(k, "class", null, Q.class, R), P & 4 && r(k, "style", U.style, Q.style, R), P & 8) {
        const le = f.dynamicProps;
        for (let fe = 0; fe < le.length; fe++) {
          const ve = le[fe], we = U[ve], xe = Q[ve];
          (xe !== we || ve === "value") && r(k, ve, we, xe, R, w);
        }
      }
      P & 1 && c.children !== f.children && d(k, f.children);
    } else !T && N == null && Z(k, U, Q, w, R);
    ((ee = Q.onVnodeUpdated) || H) && ze(() => {
      ee && vt(ee, w, f, c), H && Yt(f, c, w, "updated");
    }, I);
  }, F = (c, f, w, I, R, O, T) => {
    for (let k = 0; k < f.length; k++) {
      const P = c[k], N = f[k];
      L(P, N, P.el && (P.type === te || !ea(P, N) || P.shapeFlag & 198) ? m(P.el) : w, null, I, R, O, T, !0);
    }
  }, Z = (c, f, w, I, R) => {
    if (f !== w) {
      if (f !== Se)
        for (const O in f) !Da(O) && !(O in w) && r(c, O, f[O], null, R, I);
      for (const O in w) {
        if (Da(O)) continue;
        const T = w[O], k = f[O];
        T !== k && O !== "value" && r(c, O, k, T, R, I);
      }
      "value" in w && r(c, "value", f.value, w.value, R);
    }
  }, K = (c, f, w, I, R, O, T, k, P) => {
    const N = f.el = c ? c.el : l(""), H = f.anchor = c ? c.anchor : l("");
    let { patchFlag: U, dynamicChildren: Q, slotScopeIds: ee } = f;
    ee && (k = k ? k.concat(ee) : ee), c == null ? (n(N, w, I), n(H, w, I), _(f.children || [], w, H, R, O, T, k, P)) : U > 0 && U & 64 && Q && c.dynamicChildren && c.dynamicChildren.length === Q.length ? (F(c.dynamicChildren, Q, w, R, O, T, k), (f.key != null || R && f === R.subTree) && Yr(c, f, !0)) : ce(c, f, w, H, R, O, T, k, P);
  }, J = (c, f, w, I, R, O, T, k, P) => {
    f.slotScopeIds = k, c == null ? f.shapeFlag & 512 ? R.ctx.activate(f, w, I, T, P) : D(f, w, I, R, O, T, P) : ue(c, f, P);
  }, D = (c, f, w, I, R, O, T) => {
    const k = c.component = bu(c, I, R);
    if (qn(c) && (k.ctx.renderer = ft), hu(k, !1, T), k.asyncDep) {
      if (R && R.registerDep(k, ke, T), !c.el) {
        const P = k.subTree = Ce(qe);
        V(null, P, f, w), c.placeholder = P.el;
      }
    } else ke(k, c, f, w, R, O, T);
  }, ue = (c, f, w) => {
    const I = f.component = c.component;
    if (Jo(c, f, w)) if (I.asyncDep && !I.asyncResolved) {
      de(I, f, w);
      return;
    } else
      I.next = f, I.update();
    else
      f.el = c.el, I.vnode = f;
  }, ke = (c, f, w, I, R, O, T) => {
    const k = () => {
      if (c.isMounted) {
        let { next: U, bu: Q, u: ee, parent: le, vnode: fe } = c;
        {
          const Le = Xr(c);
          if (Le) {
            U && (U.el = fe.el, de(c, U, T)), Le.asyncDep.then(() => {
              ze(() => {
                c.isUnmounted || N();
              }, R);
            });
            return;
          }
        }
        let ve = U, we;
        Xt(c, !1), U ? (U.el = fe.el, de(c, U, T)) : U = fe, Q && gn(Q), (we = U.props && U.props.onVnodeBeforeUpdate) && vt(we, le, U, fe), Xt(c, !0);
        const xe = Qn(c), He = c.subTree;
        c.subTree = xe, L(He, xe, m(He.el), xt(He), c, R, O), U.el = xe.el, ve === null && Qo(c, xe.el), ee && ze(ee, R), (we = U.props && U.props.onVnodeUpdated) && ze(() => vt(we, le, U, fe), R);
      } else {
        let U;
        const { el: Q, props: ee } = f, { bm: le, m: fe, parent: ve, root: we, type: xe } = c, He = pa(f);
        if (Xt(c, !1), le && gn(le), !He && (U = ee && ee.onVnodeBeforeMount) && vt(U, ve, f), Xt(c, !0), Q && p) {
          const Le = () => {
            c.subTree = Qn(c), p(Q, c.subTree, c, R, null);
          };
          He && xe.__asyncHydrate ? xe.__asyncHydrate(Q, c, Le) : Le();
        } else {
          we.ce && we.ce._hasShadowRoot() && we.ce._injectChildStyle(xe, c.parent ? c.parent.type : void 0);
          const Le = c.subTree = Qn(c);
          L(null, Le, w, I, c, R, O), f.el = Le.el;
        }
        if (fe && ze(fe, R), !He && (U = ee && ee.onVnodeMounted)) {
          const Le = f;
          ze(() => vt(U, ve, Le), R);
        }
        (f.shapeFlag & 256 || ve && pa(ve.vnode) && ve.vnode.shapeFlag & 256) && c.a && ze(c.a, R), c.isMounted = !0, f = w = I = null;
      }
    };
    c.scope.on();
    const P = c.effect = new nr(k);
    c.scope.off();
    const N = c.update = P.run.bind(P), H = c.job = P.runIfDirty.bind(P);
    H.i = c, H.id = c.uid, P.scheduler = () => Is(H), Xt(c, !0), N();
  }, de = (c, f, w) => {
    f.component = c;
    const I = c.vnode.props;
    c.vnode = f, c.next = null, eu(c, f.props, I, w), su(c, f.children, w), It(), Zs(c), Pt();
  }, ce = (c, f, w, I, R, O, T, k, P = !1) => {
    const N = c && c.children, H = c ? c.shapeFlag : 0, U = f.children, { patchFlag: Q, shapeFlag: ee } = f;
    if (Q > 0) {
      if (Q & 128) {
        B(N, U, w, I, R, O, T, k, P);
        return;
      } else if (Q & 256) {
        j(N, U, w, I, R, O, T, k, P);
        return;
      }
    }
    ee & 8 ? (H & 16 && We(N, R, O), U !== N && d(w, U)) : H & 16 ? ee & 16 ? B(N, U, w, I, R, O, T, k, P) : We(N, R, O, !0) : (H & 8 && d(w, ""), ee & 16 && _(U, w, I, R, O, T, k, P));
  }, j = (c, f, w, I, R, O, T, k, P) => {
    c = c || ca, f = f || ca;
    const N = c.length, H = f.length, U = Math.min(N, H);
    let Q;
    for (Q = 0; Q < U; Q++) {
      const ee = f[Q] = P ? At(f[Q]) : ht(f[Q]);
      L(c[Q], ee, w, null, R, O, T, k, P);
    }
    N > H ? We(c, R, O, !0, !1, U) : _(f, w, I, R, O, T, k, P, U);
  }, B = (c, f, w, I, R, O, T, k, P) => {
    let N = 0;
    const H = f.length;
    let U = c.length - 1, Q = H - 1;
    for (; N <= U && N <= Q; ) {
      const ee = c[N], le = f[N] = P ? At(f[N]) : ht(f[N]);
      if (ea(ee, le)) L(ee, le, w, null, R, O, T, k, P);
      else break;
      N++;
    }
    for (; N <= U && N <= Q; ) {
      const ee = c[U], le = f[Q] = P ? At(f[Q]) : ht(f[Q]);
      if (ea(ee, le)) L(ee, le, w, null, R, O, T, k, P);
      else break;
      U--, Q--;
    }
    if (N > U) {
      if (N <= Q) {
        const ee = Q + 1, le = ee < H ? f[ee].el : I;
        for (; N <= Q; )
          L(null, f[N] = P ? At(f[N]) : ht(f[N]), w, le, R, O, T, k, P), N++;
      }
    } else if (N > Q) for (; N <= U; )
      Ae(c[N], R, O, !0), N++;
    else {
      const ee = N, le = N, fe = /* @__PURE__ */ new Map();
      for (N = le; N <= Q; N++) {
        const Re = f[N] = P ? At(f[N]) : ht(f[N]);
        Re.key != null && fe.set(Re.key, N);
      }
      let ve, we = 0;
      const xe = Q - le + 1;
      let He = !1, Le = 0;
      const Nt = new Array(xe);
      for (N = 0; N < xe; N++) Nt[N] = 0;
      for (N = ee; N <= U; N++) {
        const Re = c[N];
        if (we >= xe) {
          Ae(Re, R, O, !0);
          continue;
        }
        let Ye;
        if (Re.key != null) Ye = fe.get(Re.key);
        else for (ve = le; ve <= Q; ve++) if (Nt[ve - le] === 0 && ea(Re, f[ve])) {
          Ye = ve;
          break;
        }
        Ye === void 0 ? Ae(Re, R, O, !0) : (Nt[Ye - le] = N + 1, Ye >= Le ? Le = Ye : He = !0, L(Re, f[Ye], w, null, R, O, T, k, P), we++);
      }
      const $a = He ? ou(Nt) : ca;
      for (ve = $a.length - 1, N = xe - 1; N >= 0; N--) {
        const Re = le + N, Ye = f[Re], ia = f[Re + 1], Ca = Re + 1 < H ? ia.el || Jr(ia) : I;
        Nt[N] === 0 ? L(null, Ye, w, Ca, R, O, T, k, P) : He && (ve < 0 || N !== $a[ve] ? re(Ye, w, Ca, 2) : ve--);
      }
    }
  }, re = (c, f, w, I, R = null) => {
    const { el: O, type: T, transition: k, children: P, shapeFlag: N } = c;
    if (N & 6) {
      re(c.component.subTree, f, w, I);
      return;
    }
    if (N & 128) {
      c.suspense.move(f, w, I);
      return;
    }
    if (N & 64) {
      T.move(c, f, w, ft);
      return;
    }
    if (T === te) {
      n(O, f, w);
      for (let H = 0; H < P.length; H++) re(P[H], f, w, I);
      n(c.anchor, f, w);
      return;
    }
    if (T === bn) {
      G(c, f, w);
      return;
    }
    if (I !== 2 && N & 1 && k) if (I === 0) k.persisted && !O[nt] ? n(O, f, w) : (k.beforeEnter(O), n(O, f, w), ze(() => k.enter(O), R));
    else {
      const { leave: H, delayLeave: U, afterLeave: Q } = k, ee = () => {
        c.ctx.isUnmounted ? s(O) : n(O, f, w);
      }, le = () => {
        const fe = O._isLeaving || !!O[nt];
        O._isLeaving && O[nt](!0), k.persisted && !fe ? ee() : H(O, () => {
          ee(), Q && Q();
        });
      };
      U ? U(O, ee, le) : le();
    }
    else n(O, f, w);
  }, Ae = (c, f, w, I = !1, R = !1) => {
    const { type: O, props: T, ref: k, children: P, dynamicChildren: N, shapeFlag: H, patchFlag: U, dirs: Q, cacheIndex: ee, memo: le } = c;
    if (U === -2 && (R = !1), k != null && (It(), Ua(k, null, w, c, !0), Pt()), ee != null && (f.renderCache[ee] = void 0), H & 256) {
      f.ctx.deactivate(c);
      return;
    }
    const fe = H & 1 && Q, ve = !pa(c);
    let we;
    if (ve && (we = T && T.onVnodeBeforeUnmount) && vt(we, f, c), H & 6) sa(c.component, w, I);
    else {
      if (H & 128) {
        c.suspense.unmount(w, I);
        return;
      }
      fe && Yt(c, null, f, "beforeUnmount"), H & 64 ? c.type.remove(c, f, w, ft, I) : N && !N.hasOnce && (O !== te || U > 0 && U & 64) ? We(N, f, w, !1, !0) : (O === te && U & 384 || !R && H & 16) && We(P, f, w), I && je(c);
    }
    const xe = le != null && ee == null;
    (ve && (we = T && T.onVnodeUnmounted) || fe || xe) && ze(() => {
      we && vt(we, f, c), fe && Yt(c, null, f, "unmounted"), xe && (c.el = null);
    }, w);
  }, je = (c) => {
    const { type: f, el: w, anchor: I, transition: R } = c;
    if (f === te) {
      _a(w, I);
      return;
    }
    if (f === bn) {
      E(c);
      return;
    }
    const O = () => {
      s(w), R && !R.persisted && R.afterLeave && R.afterLeave();
    };
    if (c.shapeFlag & 1 && R && !R.persisted) {
      const { leave: T, delayLeave: k } = R, P = () => T(w, O);
      k ? k(c.el, O, P) : P();
    } else O();
  }, _a = (c, f) => {
    let w;
    for (; c !== f; )
      w = S(c), s(c), c = w;
    s(f);
  }, sa = (c, f, w) => {
    const { bum: I, scope: R, job: O, subTree: T, um: k, m: P, a: N } = c;
    di(P), di(N), I && gn(I), R.stop(), O && (O.flags |= 8, Ae(T, c, f, w)), k && ze(k, f), ze(() => {
      c.isUnmounted = !0;
    }, f);
  }, We = (c, f, w, I = !1, R = !1, O = 0) => {
    for (let T = O; T < c.length; T++) Ae(c[T], f, w, I, R);
  }, xt = (c) => {
    if (c.shapeFlag & 6) return xt(c.component.subTree);
    if (c.shapeFlag & 128) return c.suspense.next();
    const f = S(c.anchor || c.el), w = f && f[xo];
    return w ? S(w) : f;
  };
  let et = !1;
  const zt = (c, f, w) => {
    let I;
    c == null ? f._vnode && (Ae(f._vnode, null, null, !0), I = f._vnode.component) : L(f._vnode || null, c, f, null, null, null, w), f._vnode = c, et || (et = !0, Zs(I), kr(), et = !1);
  }, ft = {
    p: L,
    um: Ae,
    m: re,
    r: je,
    mt: D,
    mc: _,
    pc: ce,
    pbc: F,
    n: xt,
    o: e
  };
  let Wt, p;
  return t && ([Wt, p] = t(ft)), {
    render: zt,
    hydrate: Wt,
    createApp: Go(zt, Wt)
  };
}
function Zn({ type: e, props: t }, a) {
  return a === "svg" && e === "foreignObject" || a === "mathml" && e === "annotation-xml" && t && t.encoding && t.encoding.includes("html") ? void 0 : a;
}
function Xt({ effect: e, job: t }, a) {
  a ? (e.flags |= 32, t.flags |= 4) : (e.flags &= -33, t.flags &= -5);
}
function lu(e, t) {
  return (!e || e && !e.pendingBranch) && t && !t.persisted;
}
function Yr(e, t, a = !1) {
  const n = e.children, s = t.children;
  if (ae(n) && ae(s)) for (let r = 0; r < n.length; r++) {
    const o = n[r];
    let l = s[r];
    l.shapeFlag & 1 && !l.dynamicChildren && ((l.patchFlag <= 0 || l.patchFlag === 32) && (l = s[r] = At(s[r]), l.el = o.el), !a && l.patchFlag !== -2 && Yr(o, l)), l.type === jn && (l.patchFlag === -1 && (l = s[r] = At(l)), l.el = o.el), l.type === qe && !l.el && (l.el = o.el);
  }
}
function ou(e) {
  const t = e.slice(), a = [0];
  let n, s, r, o, l;
  const u = e.length;
  for (n = 0; n < u; n++) {
    const v = e[n];
    if (v !== 0) {
      if (s = a[a.length - 1], e[s] < v) {
        t[n] = s, a.push(n);
        continue;
      }
      for (r = 0, o = a.length - 1; r < o; )
        l = r + o >> 1, e[a[l]] < v ? r = l + 1 : o = l;
      v < e[a[r]] && (r > 0 && (t[n] = a[r - 1]), a[r] = n);
    }
  }
  for (r = a.length, o = a[r - 1]; r-- > 0; )
    a[r] = o, o = t[o];
  return a;
}
function Xr(e) {
  const t = e.subTree.component;
  if (t) return t.asyncDep && !t.asyncResolved ? t : Xr(t);
}
function di(e) {
  if (e) for (let t = 0; t < e.length; t++) e[t].flags |= 8;
}
function Jr(e) {
  if (e.placeholder) return e.placeholder;
  const t = e.component;
  return t ? Jr(t.subTree) : null;
}
var Qr = (e) => e.__isSuspense;
function uu(e, t) {
  t && t.pendingBranch ? ae(e) ? t.effects.push(...e) : t.effects.push(e) : bo(e);
}
var te = /* @__PURE__ */ Symbol.for("v-fgt"), jn = /* @__PURE__ */ Symbol.for("v-txt"), qe = /* @__PURE__ */ Symbol.for("v-cmt"), bn = /* @__PURE__ */ Symbol.for("v-stc"), ja = [], Qe = null;
function g(e = !1) {
  ja.push(Qe = e ? null : []);
}
function du() {
  ja.pop(), Qe = ja[ja.length - 1] || null;
}
var za = 1;
function Cn(e, t = !1) {
  za += e, e < 0 && Qe && t && (Qe.hasOnce = !0);
}
function Zr(e) {
  return e.dynamicChildren = za > 0 ? Qe || ca : null, du(), za > 0 && Qe && Qe.push(e), e;
}
function b(e, t, a, n, s, r) {
  return Zr(i(e, t, a, n, s, r, !0));
}
function he(e, t, a, n, s) {
  return Zr(Ce(e, t, a, n, s, !0));
}
function Wa(e) {
  return e ? e.__v_isVNode === !0 : !1;
}
function ea(e, t) {
  return e.type === t.type && e.key === t.key;
}
var el = ({ key: e }) => e ?? null, hn = ({ ref: e, ref_key: t, ref_for: a }) => (typeof e == "number" && (e = "" + e), e != null ? Me(e) || /* @__PURE__ */ Fe(e) || ie(e) ? {
  i: Oe,
  r: e,
  k: t,
  f: !!a
} : e : null);
function i(e, t = null, a = null, n = 0, s = null, r = e === te ? 0 : 1, o = !1, l = !1) {
  const u = {
    __v_isVNode: !0,
    __v_skip: !0,
    type: e,
    props: t,
    key: t && el(t),
    ref: t && hn(t),
    scopeId: xr,
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
    shapeFlag: r,
    patchFlag: n,
    dynamicProps: s,
    dynamicChildren: null,
    appContext: null,
    ctx: Oe
  };
  return l ? (Rs(u, a), r & 128 && e.normalize(u)) : a && (u.shapeFlag |= Me(a) ? 8 : 16), za > 0 && !o && Qe && (u.patchFlag > 0 || r & 6) && u.patchFlag !== 32 && Qe.push(u), u;
}
var Ce = cu;
function cu(e, t = null, a = null, n = 0, s = null, r = !1) {
  if ((!e || e === Rr) && (e = qe), Wa(e)) {
    const l = Kt(e, t, !0);
    return a && Rs(l, a), za > 0 && !r && Qe && (l.shapeFlag & 6 ? Qe[Qe.indexOf(e)] = l : Qe.push(l)), l.patchFlag = -2, l;
  }
  if (Su(e) && (e = e.__vccOpts), t) {
    t = fu(t);
    let { class: l, style: u } = t;
    l && !Me(l) && (t.class = ne(l)), ye(u) && (/* @__PURE__ */ Es(u) && !ae(u) && (u = Ee({}, u)), t.style = Vt(u));
  }
  const o = Me(e) ? 1 : Qr(e) ? 128 : $r(e) ? 64 : ye(e) ? 4 : ie(e) ? 2 : 0;
  return i(e, t, a, n, s, o, r, !0);
}
function fu(e) {
  return e ? /* @__PURE__ */ Es(e) || Hr(e) ? Ee({}, e) : e : null;
}
function Kt(e, t, a = !1, n = !1) {
  const { props: s, ref: r, patchFlag: o, children: l, transition: u } = e, v = t ? pu(s || {}, t) : s, d = {
    __v_isVNode: !0,
    __v_skip: !0,
    type: e.type,
    props: v,
    key: v && el(v),
    ref: t && t.ref ? a && r ? ae(r) ? r.concat(hn(t)) : [r, hn(t)] : hn(t) : r,
    scopeId: e.scopeId,
    slotScopeIds: e.slotScopeIds,
    children: l,
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
    ssContent: e.ssContent && Kt(e.ssContent),
    ssFallback: e.ssFallback && Kt(e.ssFallback),
    placeholder: e.placeholder,
    el: e.el,
    anchor: e.anchor,
    ctx: e.ctx,
    ce: e.ce
  };
  return u && n && Va(d, u.clone(d)), d;
}
function ge(e = " ", t = 0) {
  return Ce(jn, null, e, t);
}
function vu(e, t) {
  const a = Ce(bn, null, e);
  return a.staticCount = t, a;
}
function q(e = "", t = !1) {
  return t ? (g(), he(qe, null, e)) : Ce(qe, null, e);
}
function ht(e) {
  return e == null || typeof e == "boolean" ? Ce(qe) : ae(e) ? Ce(te, null, e.slice()) : Wa(e) ? At(e) : Ce(jn, null, String(e));
}
function At(e) {
  return e.el === null && e.patchFlag !== -1 || e.memo ? e : Kt(e);
}
function Rs(e, t) {
  let a = 0;
  const { shapeFlag: n } = e;
  if (t == null) t = null;
  else if (ae(t)) a = 16;
  else if (typeof t == "object") if (n & 65) {
    const s = t.default;
    s && (s._c && (s._d = !1), Rs(e, s()), s._c && (s._d = !0));
    return;
  } else {
    a = 32;
    const s = t._;
    !s && !Hr(t) ? t._ctx = Oe : s === 3 && Oe && (Oe.slots._ === 1 ? t._ = 1 : (t._ = 2, e.patchFlag |= 1024));
  }
  else ie(t) ? (t = {
    default: t,
    _ctx: Oe
  }, a = 32) : (t = String(t), n & 64 ? (a = 16, t = [ge(t)]) : a = 8);
  e.children = t, e.shapeFlag |= a;
}
function pu(...e) {
  const t = {};
  for (let a = 0; a < e.length; a++) {
    const n = e[a];
    for (const s in n) if (s === "class")
      t.class !== n.class && (t.class = ne([t.class, n.class]));
    else if (s === "style") t.style = Vt([t.style, n.style]);
    else if (In(s)) {
      const r = t[s], o = n[s];
      o && r !== o && !(ae(r) && r.includes(o)) ? t[s] = r ? [].concat(r, o) : o : o == null && r == null && !Pn(s) && (t[s] = o);
    } else s !== "" && (t[s] = n[s]);
  }
  return t;
}
function vt(e, t, a, n = null) {
  rt(e, t, 7, [a, n]);
}
var gu = Br(), mu = 0;
function bu(e, t, a) {
  const n = e.type, s = (t ? t.appContext : e.appContext) || gu, r = {
    uid: mu++,
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
    scope: new Ul(!0),
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
    propsOptions: Gr(n, s),
    emitsOptions: qr(n, s),
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
  return r.ctx = { _: r }, r.root = t ? t.root : r, r.emit = zo.bind(null, r), e.ce && e.ce(r), r;
}
var Ue = null, tl = () => Ue || Oe, An, bs;
{
  const e = Nn(), t = (a, n) => {
    let s;
    return (s = e[a]) || (s = e[a] = []), s.push(n), (r) => {
      s.length > 1 ? s.forEach((o) => o(r)) : s[0](r);
    };
  };
  An = t("__VUE_INSTANCE_SETTERS__", (a) => Ue = a), bs = t("__VUE_SSR_SETTERS__", (a) => Ya = a);
}
var nn = (e) => {
  const t = Ue;
  return An(e), e.scope.on(), () => {
    e.scope.off(), An(t);
  };
}, ci = () => {
  Ue && Ue.scope.off(), An(null);
};
function al(e) {
  return e.vnode.shapeFlag & 4;
}
var Ya = !1;
function hu(e, t = !1, a = !1) {
  t && bs(t);
  const { props: n, children: s } = e.vnode, r = al(e);
  Zo(e, n, r, t), nu(e, s, a || t);
  const o = r ? yu(e, t) : void 0;
  return t && bs(!1), o;
}
function yu(e, t) {
  const a = e.type;
  e.accessCache = /* @__PURE__ */ Object.create(null), e.proxy = new Proxy(e.ctx, Bo);
  const { setup: n } = a;
  if (n) {
    It();
    const s = e.setupContext = n.length > 1 ? wu(e) : null, r = nn(e), o = tn(n, e, 0, [e.props, s]), l = Yi(o);
    if (Pt(), r(), (l || e.sp) && !pa(e) && Ir(e), l) {
      if (o.then(ci, ci), t) return o.then((u) => {
        fi(e, u, t);
      }).catch((u) => {
        Bn(u, e, 0);
      });
      e.asyncDep = o;
    } else fi(e, o, t);
  } else nl(e, t);
}
function fi(e, t, a) {
  ie(t) ? e.type.__ssrInlineRender ? e.ssrRender = t : e.render = t : ye(t) && (e.setupState = br(t)), nl(e, a);
}
var vi, pi;
function nl(e, t, a) {
  const n = e.type;
  if (!e.render) {
    if (!t && vi && !n.render) {
      const s = n.template || Ps(e).template;
      if (s) {
        const { isCustomElement: r, compilerOptions: o } = e.appContext.config, { delimiters: l, compilerOptions: u } = n, v = Ee(Ee({
          isCustomElement: r,
          delimiters: l
        }, o), u);
        n.render = vi(s, v);
      }
    }
    e.render = n.render || kt, pi && pi(e);
  }
  {
    const s = nn(e);
    It();
    try {
      qo(e);
    } finally {
      Pt(), s();
    }
  }
}
var ku = { get(e, t) {
  return Be(e, "get", ""), e[t];
} };
function wu(e) {
  const t = (a) => {
    e.exposed = a || {};
  };
  return {
    attrs: new Proxy(e.attrs, ku),
    slots: e.slots,
    emit: e.emit,
    expose: t
  };
}
function Hn(e) {
  return e.exposed ? e.exposeProxy || (e.exposeProxy = new Proxy(br(ro(e.exposed)), {
    get(t, a) {
      if (a in t) return t[a];
      if (a in Fa) return Fa[a](e);
    },
    has(t, a) {
      return a in t || a in Fa;
    }
  })) : e.proxy;
}
function xu(e, t = !0) {
  return ie(e) ? e.displayName || e.name : e.name || t && e.__name;
}
function Su(e) {
  return ie(e) && "__vccOpts" in e;
}
var z = (e, t) => /* @__PURE__ */ fo(e, t, Ya);
function _u(e, t, a) {
  try {
    Cn(-1);
    const n = arguments.length;
    return n === 2 ? ye(t) && !ae(t) ? Wa(t) ? Ce(e, null, [t]) : Ce(e, t) : Ce(e, null, t) : (n > 3 ? a = Array.prototype.slice.call(arguments, 2) : n === 3 && Wa(a) && (a = [a]), Ce(e, t, a));
  } finally {
    Cn(1);
  }
}
var $u = "3.5.35", hs = void 0, gi = typeof window < "u" && window.trustedTypes;
if (gi) try {
  hs = /* @__PURE__ */ gi.createPolicy("vue", { createHTML: (e) => e });
} catch {
}
var sl = hs ? (e) => hs.createHTML(e) : (e) => e, Cu = "http://www.w3.org/2000/svg", Au = "http://www.w3.org/1998/Math/MathML", $t = typeof document < "u" ? document : null, mi = $t && /* @__PURE__ */ $t.createElement("template"), Mu = {
  insert: (e, t, a) => {
    t.insertBefore(e, a || null);
  },
  remove: (e) => {
    const t = e.parentNode;
    t && t.removeChild(e);
  },
  createElement: (e, t, a, n) => {
    const s = t === "svg" ? $t.createElementNS(Cu, e) : t === "mathml" ? $t.createElementNS(Au, e) : a ? $t.createElement(e, { is: a }) : $t.createElement(e);
    return e === "select" && n && n.multiple != null && s.setAttribute("multiple", n.multiple), s;
  },
  createText: (e) => $t.createTextNode(e),
  createComment: (e) => $t.createComment(e),
  setText: (e, t) => {
    e.nodeValue = t;
  },
  setElementText: (e, t) => {
    e.textContent = t;
  },
  parentNode: (e) => e.parentNode,
  nextSibling: (e) => e.nextSibling,
  querySelector: (e) => $t.querySelector(e),
  setScopeId(e, t) {
    e.setAttribute(t, "");
  },
  insertStaticContent(e, t, a, n, s, r) {
    const o = a ? a.previousSibling : t.lastChild;
    if (s && (s === r || s.nextSibling)) for (; t.insertBefore(s.cloneNode(!0), a), !(s === r || !(s = s.nextSibling)); )
      ;
    else {
      mi.innerHTML = sl(n === "svg" ? `<svg>${e}</svg>` : n === "mathml" ? `<math>${e}</math>` : e);
      const l = mi.content;
      if (n === "svg" || n === "mathml") {
        const u = l.firstChild;
        for (; u.firstChild; ) l.appendChild(u.firstChild);
        l.removeChild(u);
      }
      t.insertBefore(l, a);
    }
    return [o ? o.nextSibling : t.firstChild, a ? a.previousSibling : t.lastChild];
  }
}, Bt = "transition", Ta = "animation", Xa = /* @__PURE__ */ Symbol("_vtc"), il = {
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
}, Tu = /* @__PURE__ */ Ee({}, Cr, il), Eu = (e) => (e.displayName = "Transition", e.props = Tu, e), rl = /* @__PURE__ */ Eu((e, { slots: t }) => _u($o, Iu(e), t)), Jt = (e, t = []) => {
  ae(e) ? e.forEach((a) => a(...t)) : e && e(...t);
}, bi = (e) => e ? ae(e) ? e.some((t) => t.length > 1) : e.length > 1 : !1;
function Iu(e) {
  const t = {};
  for (const K in e) K in il || (t[K] = e[K]);
  if (e.css === !1) return t;
  const { name: a = "v", type: n, duration: s, enterFromClass: r = `${a}-enter-from`, enterActiveClass: o = `${a}-enter-active`, enterToClass: l = `${a}-enter-to`, appearFromClass: u = r, appearActiveClass: v = o, appearToClass: d = l, leaveFromClass: m = `${a}-leave-from`, leaveActiveClass: S = `${a}-leave-active`, leaveToClass: h = `${a}-leave-to` } = e, A = Pu(s), L = A && A[0], X = A && A[1], { onBeforeEnter: V, onEnter: W, onEnterCancelled: G, onLeave: E, onLeaveCancelled: C, onBeforeAppear: M = V, onAppear: x = W, onAppearCancelled: _ = G } = t, $ = (K, J, D, ue) => {
    K._enterCancelled = ue, Qt(K, J ? d : l), Qt(K, J ? v : o), D && D();
  }, F = (K, J) => {
    K._isLeaving = !1, Qt(K, m), Qt(K, h), Qt(K, S), J && J();
  }, Z = (K) => (J, D) => {
    const ue = K ? x : W, ke = () => $(J, K, D);
    Jt(ue, [J, ke]), hi(() => {
      Qt(J, K ? u : r), _t(J, K ? d : l), bi(ue) || yi(J, n, L, ke);
    });
  };
  return Ee(t, {
    onBeforeEnter(K) {
      Jt(V, [K]), _t(K, r), _t(K, o);
    },
    onBeforeAppear(K) {
      Jt(M, [K]), _t(K, u), _t(K, v);
    },
    onEnter: Z(!1),
    onAppear: Z(!0),
    onLeave(K, J) {
      K._isLeaving = !0;
      const D = () => F(K, J);
      _t(K, m), K._enterCancelled ? (_t(K, S), xi(K)) : (xi(K), _t(K, S)), hi(() => {
        K._isLeaving && (Qt(K, m), _t(K, h), bi(E) || yi(K, n, X, D));
      }), Jt(E, [K, D]);
    },
    onEnterCancelled(K) {
      $(K, !1, void 0, !0), Jt(G, [K]);
    },
    onAppearCancelled(K) {
      $(K, !0, void 0, !0), Jt(_, [K]);
    },
    onLeaveCancelled(K) {
      F(K), Jt(C, [K]);
    }
  });
}
function Pu(e) {
  if (e == null) return null;
  if (ye(e)) return [es(e.enter), es(e.leave)];
  {
    const t = es(e);
    return [t, t];
  }
}
function es(e) {
  return Ol(e);
}
function _t(e, t) {
  t.split(/\s+/).forEach((a) => a && e.classList.add(a)), (e[Xa] || (e[Xa] = /* @__PURE__ */ new Set())).add(t);
}
function Qt(e, t) {
  t.split(/\s+/).forEach((n) => n && e.classList.remove(n));
  const a = e[Xa];
  a && (a.delete(t), a.size || (e[Xa] = void 0));
}
function hi(e) {
  requestAnimationFrame(() => {
    requestAnimationFrame(e);
  });
}
var Ou = 0;
function yi(e, t, a, n) {
  const s = e._endId = ++Ou, r = () => {
    s === e._endId && n();
  };
  if (a != null) return setTimeout(r, a);
  const { type: o, timeout: l, propCount: u } = Lu(e, t);
  if (!o) return n();
  const v = o + "end";
  let d = 0;
  const m = () => {
    e.removeEventListener(v, S), r();
  }, S = (h) => {
    h.target === e && ++d >= u && m();
  };
  setTimeout(() => {
    d < u && m();
  }, l + 1), e.addEventListener(v, S);
}
function Lu(e, t) {
  const a = window.getComputedStyle(e), n = (A) => (a[A] || "").split(", "), s = n(`${Bt}Delay`), r = n(`${Bt}Duration`), o = ki(s, r), l = n(`${Ta}Delay`), u = n(`${Ta}Duration`), v = ki(l, u);
  let d = null, m = 0, S = 0;
  t === Bt ? o > 0 && (d = Bt, m = o, S = r.length) : t === Ta ? v > 0 && (d = Ta, m = v, S = u.length) : (m = Math.max(o, v), d = m > 0 ? o > v ? Bt : Ta : null, S = d ? d === Bt ? r.length : u.length : 0);
  const h = d === Bt && /\b(?:transform|all)(?:,|$)/.test(n(`${Bt}Property`).toString());
  return {
    type: d,
    timeout: m,
    propCount: S,
    hasTransform: h
  };
}
function ki(e, t) {
  for (; e.length < t.length; ) e = e.concat(e);
  return Math.max(...t.map((a, n) => wi(a) + wi(e[n])));
}
function wi(e) {
  return e === "auto" ? 0 : Number(e.slice(0, -1).replace(",", ".")) * 1e3;
}
function xi(e) {
  return (e ? e.ownerDocument : document).body.offsetHeight;
}
function Ru(e, t, a) {
  const n = e[Xa];
  n && (t = (t ? [t, ...n] : [...n]).join(" ")), t == null ? e.removeAttribute("class") : a ? e.setAttribute("class", t) : e.className = t;
}
var Mn = /* @__PURE__ */ Symbol("_vod"), ll = /* @__PURE__ */ Symbol("_vsh"), Nu = {
  name: "show",
  beforeMount(e, { value: t }, { transition: a }) {
    e[Mn] = e.style.display === "none" ? "" : e.style.display, a && t ? a.beforeEnter(e) : Ea(e, t);
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
  e.style.display = t ? e[Mn] : "none", e[ll] = !t;
}
var Du = /* @__PURE__ */ Symbol(""), Bu = /(?:^|;)\s*display\s*:/;
function qu(e, t, a) {
  const n = e.style, s = Me(a);
  let r = !1;
  if (a && !s) {
    if (t) if (Me(t))
      for (const o of t.split(";")) {
        const l = o.slice(0, o.indexOf(":")).trim();
        a[l] == null && Ra(n, l, "");
      }
    else for (const o in t) a[o] == null && Ra(n, o, "");
    for (const o in a) {
      o === "display" && (r = !0);
      const l = a[o];
      l != null ? Fu(e, o, !Me(t) && t ? t[o] : void 0, l) || Ra(n, o, l) : Ra(n, o, "");
    }
  } else if (s) {
    if (t !== a) {
      const o = n[Du];
      o && (a += ";" + o), n.cssText = a, r = Bu.test(a);
    }
  } else t && e.removeAttribute("style");
  Mn in e && (e[Mn] = r ? n.display : "", e[ll] && (n.display = "none"));
}
var Si = /\s*!important$/;
function Ra(e, t, a) {
  if (ae(a)) a.forEach((n) => Ra(e, t, n));
  else if (a == null && (a = ""), t.startsWith("--")) e.setProperty(t, a);
  else {
    const n = Uu(e, t);
    Si.test(a) ? e.setProperty(Gt(n), a.replace(Si, ""), "important") : e[n] = a;
  }
}
var _i = [
  "Webkit",
  "Moz",
  "ms"
], ts = {};
function Uu(e, t) {
  const a = ts[t];
  if (a) return a;
  let n = Ve(t);
  if (n !== "filter" && n in e) return ts[t] = n;
  n = Ln(n);
  for (let s = 0; s < _i.length; s++) {
    const r = _i[s] + n;
    if (r in e) return ts[t] = r;
  }
  return t;
}
function Fu(e, t, a, n) {
  return e.tagName === "TEXTAREA" && (t === "width" || t === "height") && Me(n) && a === n;
}
var $i = "http://www.w3.org/1999/xlink";
function Ci(e, t, a, n, s, r = Bl(t)) {
  n && t.startsWith("xlink:") ? a == null ? e.removeAttributeNS($i, t.slice(6, t.length)) : e.setAttributeNS($i, t, a) : a == null || r && !er(a) ? e.removeAttribute(t) : e.setAttribute(t, r ? "" : ut(a) ? String(a) : a);
}
function Ai(e, t, a, n, s) {
  if (t === "innerHTML" || t === "textContent") {
    a != null && (e[t] = t === "innerHTML" ? sl(a) : a);
    return;
  }
  const r = e.tagName;
  if (t === "value" && r !== "PROGRESS" && !r.includes("-")) {
    const l = r === "OPTION" ? e.getAttribute("value") || "" : e.value, u = a == null ? e.type === "checkbox" ? "on" : "" : String(a);
    (l !== u || !("_value" in e)) && (e.value = u), a == null && e.removeAttribute(t), e._value = a;
    return;
  }
  let o = !1;
  if (a === "" || a == null) {
    const l = typeof e[t];
    l === "boolean" ? a = er(a) : a == null && l === "string" ? (a = "", o = !0) : l === "number" && (a = 0, o = !0);
  }
  try {
    e[t] = a;
  } catch {
  }
  o && e.removeAttribute(s || t);
}
function Ft(e, t, a, n) {
  e.addEventListener(t, a, n);
}
function ju(e, t, a, n) {
  e.removeEventListener(t, a, n);
}
var Mi = /* @__PURE__ */ Symbol("_vei");
function Hu(e, t, a, n, s = null) {
  const r = e[Mi] || (e[Mi] = {}), o = r[t];
  if (n && o) o.value = n;
  else {
    const [l, u] = Ku(t);
    n ? Ft(e, l, r[t] = zu(n, s), u) : o && (ju(e, l, o, u), r[t] = void 0);
  }
}
var Ti = /(?:Once|Passive|Capture)$/;
function Ku(e) {
  let t;
  if (Ti.test(e)) {
    t = {};
    let a;
    for (; a = e.match(Ti); )
      e = e.slice(0, e.length - a[0].length), t[a[0].toLowerCase()] = !0;
  }
  return [e[2] === ":" ? e.slice(3) : Gt(e.slice(2)), t];
}
var as = 0, Gu = /* @__PURE__ */ Promise.resolve(), Vu = () => as || (Gu.then(() => as = 0), as = Date.now());
function zu(e, t) {
  const a = (n) => {
    if (!n._vts) n._vts = Date.now();
    else if (n._vts <= a.attached) return;
    const s = a.value;
    if (ae(s)) {
      const r = n.stopImmediatePropagation;
      n.stopImmediatePropagation = () => {
        r.call(n), n._stopped = !0;
      };
      const o = s.slice(), l = [n];
      for (let u = 0; u < o.length && !n._stopped; u++) {
        const v = o[u];
        v && rt(v, t, 5, l);
      }
    } else rt(s, t, 5, [n]);
  };
  return a.value = e, a.attached = Vu(), a;
}
var Ei = (e) => e.charCodeAt(0) === 111 && e.charCodeAt(1) === 110 && e.charCodeAt(2) > 96 && e.charCodeAt(2) < 123, Wu = (e, t, a, n, s, r) => {
  const o = s === "svg";
  t === "class" ? Ru(e, n, o) : t === "style" ? qu(e, a, n) : In(t) ? Pn(t) || Hu(e, t, a, n, r) : (t[0] === "." ? (t = t.slice(1), !0) : t[0] === "^" ? (t = t.slice(1), !1) : Yu(e, t, n, o)) ? (Ai(e, t, n), !e.tagName.includes("-") && (t === "value" || t === "checked" || t === "selected") && Ci(e, t, n, o, r, t !== "value")) : e._isVueCE && (Xu(e, t) || e._def.__asyncLoader && (/[A-Z]/.test(t) || !Me(n))) ? Ai(e, Ve(t), n, r, t) : (t === "true-value" ? e._trueValue = n : t === "false-value" && (e._falseValue = n), Ci(e, t, n, o));
};
function Yu(e, t, a, n) {
  if (n)
    return !!(t === "innerHTML" || t === "textContent" || t in e && Ei(t) && ie(a));
  if (t === "spellcheck" || t === "draggable" || t === "translate" || t === "autocorrect" || t === "sandbox" && e.tagName === "IFRAME" || t === "form" || t === "list" && e.tagName === "INPUT" || t === "type" && e.tagName === "TEXTAREA") return !1;
  if (t === "width" || t === "height") {
    const s = e.tagName;
    if (s === "IMG" || s === "VIDEO" || s === "CANVAS" || s === "SOURCE") return !1;
  }
  return Ei(t) && Me(a) ? !1 : t in e;
}
function Xu(e, t) {
  const a = e._def.props;
  if (!a) return !1;
  const n = Ve(t);
  return Array.isArray(a) ? a.some((s) => Ve(s) === n) : Object.keys(a).some((s) => Ve(s) === n);
}
var ba = (e) => {
  const t = e.props["onUpdate:modelValue"] || !1;
  return ae(t) ? (a) => gn(t, a) : t;
};
function Ju(e) {
  e.target.composing = !0;
}
function Ii(e) {
  const t = e.target;
  t.composing && (t.composing = !1, t.dispatchEvent(new Event("input")));
}
var Et = /* @__PURE__ */ Symbol("_assign");
function Pi(e, t, a) {
  return t && (e = e.trim()), a && (e = Rn(e)), e;
}
var Ze = {
  created(e, { modifiers: { lazy: t, trim: a, number: n } }, s) {
    e[Et] = ba(s);
    const r = n || s.props && s.props.type === "number";
    Ft(e, t ? "change" : "input", (o) => {
      o.target.composing || e[Et](Pi(e.value, a, r));
    }), (a || r) && Ft(e, "change", () => {
      e.value = Pi(e.value, a, r);
    }), t || (Ft(e, "compositionstart", Ju), Ft(e, "compositionend", Ii), Ft(e, "change", Ii));
  },
  mounted(e, { value: t }) {
    e.value = t ?? "";
  },
  beforeUpdate(e, { value: t, oldValue: a, modifiers: { lazy: n, trim: s, number: r } }, o) {
    if (e[Et] = ba(o), e.composing) return;
    const l = (r || e.type === "number") && !/^0\d/.test(e.value) ? Rn(e.value) : e.value, u = t ?? "";
    if (l === u) return;
    const v = e.getRootNode();
    (v instanceof Document || v instanceof ShadowRoot) && v.activeElement === e && e.type !== "range" && (n && t === a || s && e.value.trim() === u) || (e.value = u);
  }
}, Ia = {
  deep: !0,
  created(e, t, a) {
    e[Et] = ba(a), Ft(e, "change", () => {
      const n = e._modelValue, s = Ja(e), r = e.checked, o = e[Et];
      if (ae(n)) {
        const l = Ss(n, s), u = l !== -1;
        if (r && !u) o(n.concat(s));
        else if (!r && u) {
          const v = [...n];
          v.splice(l, 1), o(v);
        }
      } else if (wa(n)) {
        const l = new Set(n);
        r ? l.add(s) : l.delete(s), o(l);
      } else o(ul(e, r));
    });
  },
  mounted: Oi,
  beforeUpdate(e, t, a) {
    e[Et] = ba(a), Oi(e, t, a);
  }
};
function Oi(e, { value: t, oldValue: a }, n) {
  e._modelValue = t;
  let s;
  if (ae(t)) s = Ss(t, n.props.value) > -1;
  else if (wa(t)) s = t.has(n.props.value);
  else {
    if (t === a) return;
    s = xa(t, ul(e, !0));
  }
  e.checked !== s && (e.checked = s);
}
var ol = {
  deep: !0,
  created(e, { value: t, modifiers: { number: a } }, n) {
    const s = wa(t);
    Ft(e, "change", () => {
      const r = Array.prototype.filter.call(e.options, (o) => o.selected).map((o) => a ? Rn(Ja(o)) : Ja(o));
      e[Et](e.multiple ? s ? new Set(r) : r : r[0]), e._assigning = !0, an(() => {
        e._assigning = !1;
      });
    }), e[Et] = ba(n);
  },
  mounted(e, { value: t }) {
    Li(e, t);
  },
  beforeUpdate(e, t, a) {
    e[Et] = ba(a);
  },
  updated(e, { value: t }) {
    e._assigning || Li(e, t);
  }
};
function Li(e, t) {
  const a = e.multiple, n = ae(t);
  if (!(a && !n && !wa(t))) {
    for (let s = 0, r = e.options.length; s < r; s++) {
      const o = e.options[s], l = Ja(o);
      if (a) if (n) {
        const u = typeof l;
        u === "string" || u === "number" ? o.selected = t.some((v) => String(v) === String(l)) : o.selected = Ss(t, l) > -1;
      } else o.selected = t.has(l);
      else if (xa(Ja(o), t)) {
        e.selectedIndex !== s && (e.selectedIndex = s);
        return;
      }
    }
    !a && e.selectedIndex !== -1 && (e.selectedIndex = -1);
  }
}
function Ja(e) {
  return "_value" in e ? e._value : e.value;
}
function ul(e, t) {
  const a = t ? "_trueValue" : "_falseValue";
  return a in e ? e[a] : t;
}
var Qu = [
  "ctrl",
  "shift",
  "alt",
  "meta"
], Zu = {
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
  exact: (e, t) => Qu.some((a) => e[`${a}Key`] && !t.includes(a))
}, it = (e, t) => {
  if (!e) return e;
  const a = e._withMods || (e._withMods = {}), n = t.join(".");
  return a[n] || (a[n] = ((s, ...r) => {
    for (let o = 0; o < t.length; o++) {
      const l = Zu[t[o]];
      if (l && l(s, t)) return;
    }
    return e(s, ...r);
  }));
}, ed = {
  esc: "escape",
  space: " ",
  up: "arrow-up",
  left: "arrow-left",
  right: "arrow-right",
  down: "arrow-down",
  delete: "backspace"
}, dl = (e, t) => {
  const a = e._withKeys || (e._withKeys = {}), n = t.join(".");
  return a[n] || (a[n] = ((s) => {
    if (!("key" in s)) return;
    const r = Gt(s.key);
    if (t.some((o) => o === r || ed[o] === r)) return e(s);
  }));
}, td = /* @__PURE__ */ Ee({ patchProp: Wu }, Mu), Ri;
function ad() {
  return Ri || (Ri = iu(td));
}
var nd = ((...e) => {
  const t = ad().createApp(...e), { mount: a } = t;
  return t.mount = (n) => {
    const s = id(n);
    if (!s) return;
    const r = t._component;
    !ie(r) && !r.render && !r.template && (r.template = s.innerHTML), s.nodeType === 1 && (s.textContent = "");
    const o = a(s, !1, sd(s));
    return s instanceof Element && (s.removeAttribute("v-cloak"), s.setAttribute("data-v-app", "")), o;
  }, t;
});
function sd(e) {
  if (e instanceof SVGElement) return "svg";
  if (typeof MathMLElement == "function" && e instanceof MathMLElement) return "mathml";
}
function id(e) {
  return Me(e) ? document.querySelector(e) : e;
}
var rd = Object.freeze({
  id: "agent-api",
  name: "Agent API",
  accent: "#63d8c6"
}), ld = "https://api.tavily.com";
function od(e = "") {
  return String(e || "").trim();
}
function mt(e = "") {
  return String(e || "").trim().replace(/\/+$/, "") || "https://api.tavily.com";
}
var n0 = Object.freeze([
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
function ud(e = "") {
  return e === "on" || e === "off" ? e : "inherit";
}
function dd(e) {
  return String(e ?? "").trim().toLowerCase() || void 0;
}
function cd(e) {
  if (e == null || e === "") return;
  const t = Number(e);
  return Number.isFinite(t) ? Math.floor(t) : void 0;
}
function ha(e = {}) {
  const t = e && typeof e == "object" ? e : {}, a = dd(t.effort), n = cd(t.budgetTokens);
  return {
    mode: ud(t.mode),
    ...a ? { effort: a } : {},
    ...n !== void 0 ? { budgetTokens: n } : {}
  };
}
var cl = "openai-compatible", Ns = "默认", fl = "default", fd = "deny", Ct = 32e3, vd = Object.freeze([{
  value: "default",
  label: "默认权限"
}, {
  value: "full",
  label: "完全权限"
}]), pd = Object.freeze([{
  value: "deny",
  label: "禁止"
}, {
  value: "allow",
  label: "允许"
}]), ys = {
  "openai-responses": {
    baseUrl: "https://api.openai.com/v1",
    model: "gpt-4.1-mini",
    apiKey: "",
    temperature: 1,
    maxTokens: Ct,
    sendTemperature: !0
  },
  "openai-compatible": {
    baseUrl: "https://api.openai.com/v1",
    model: "gpt-4o-mini",
    apiKey: "",
    temperature: 1,
    maxTokens: Ct,
    sendTemperature: !0,
    toolMode: "native"
  },
  "sillytavern-openai-compatible": {
    baseUrl: "",
    model: "gpt-4o-mini",
    apiKey: "",
    temperature: 1,
    maxTokens: Ct,
    sendTemperature: !0,
    toolMode: "native"
  },
  "sillytavern-claude": {
    baseUrl: "",
    model: "claude-sonnet-4-0",
    apiKey: "",
    temperature: 1,
    maxTokens: Ct,
    sendTemperature: !0
  },
  "sillytavern-google": {
    baseUrl: "",
    model: "gemini-2.5-pro",
    apiKey: "",
    temperature: 1,
    maxTokens: Ct,
    sendTemperature: !0
  },
  anthropic: {
    baseUrl: "https://api.anthropic.com",
    model: "claude-sonnet-4-0",
    apiKey: "",
    temperature: 1,
    maxTokens: Ct,
    sendTemperature: !0
  },
  google: {
    baseUrl: "https://generativelanguage.googleapis.com/v1beta",
    model: "gemini-2.5-pro",
    apiKey: "",
    temperature: 1,
    maxTokens: Ct,
    sendTemperature: !0
  }
};
function vl() {
  return JSON.parse(JSON.stringify(ys));
}
function Je() {
  return {
    provider: cl,
    modelConfigs: vl(),
    permissionMode: fl
  };
}
function pl(e = Je()) {
  const t = e && typeof e == "object" ? e : Je();
  return {
    provider: Ds(t.provider),
    modelConfigs: Xe(t.modelConfigs || {})
  };
}
function da(e) {
  return e === "full" ? "full" : fl;
}
function qt(e) {
  return e === "allow" ? "allow" : fd;
}
function De(e, t = Ct) {
  const a = Number(e);
  if (!Number.isFinite(a) || a <= 0) {
    const n = Number(t);
    return Number.isFinite(n) && n > 0 ? Math.floor(n) : Ct;
  }
  return Math.min(Number.MAX_SAFE_INTEGER, Math.floor(a));
}
function Ie(e) {
  return String(e || "").trim() || "默认";
}
function Xe(e = {}) {
  const t = vl();
  return Object.keys(ys).forEach((a) => {
    const n = e && typeof e[a] == "object" ? e[a] : {}, s = ys[a];
    t[a] = {
      baseUrl: String(n.baseUrl ?? s.baseUrl ?? ""),
      model: String(n.model ?? s.model ?? ""),
      apiKey: String(n.apiKey ?? s.apiKey ?? ""),
      temperature: n.temperature ?? s.temperature,
      maxTokens: De(n.maxTokens, s.maxTokens),
      sendTemperature: typeof n.sendTemperature == "boolean" ? n.sendTemperature : s.sendTemperature,
      ..."toolMode" in s ? { toolMode: String(n.toolMode || s.toolMode || "native") } : {},
      reasoning: ha(n.reasoning)
    };
  }), t;
}
function Ds(e) {
  return typeof e == "string" && e.trim() ? e : cl;
}
function Bs(e = {}, t) {
  return e && typeof e.presets == "object" && e.presets ? e.presets : e?.modelConfigs ? { [t]: {
    provider: e.provider || "openai-compatible",
    modelConfigs: e.modelConfigs,
    permissionMode: e.permissionMode
  } } : {};
}
function gd(e = {}, t) {
  const a = {}, n = Bs(e, t);
  return Object.entries(n).forEach(([s, r]) => {
    if (!r || typeof r != "object") return;
    const o = Ie(s);
    a[o] = {
      provider: Ds(r.provider),
      modelConfigs: Xe(r.modelConfigs || {}),
      permissionMode: da(r.permissionMode)
    };
  }), Object.keys(a).length || (a[Ns] = Je()), a;
}
function md(e, t) {
  const a = Ie(t);
  return e[a] ? a : Object.keys(e)[0];
}
function bd(e, t, a) {
  const n = Ie(t || a);
  return e[n] ? n : e[a] ? a : Object.keys(e)[0];
}
function gl(e = {}, t = Je()) {
  const a = pl(t), n = e && typeof e == "object" ? e : {};
  return {
    provider: Ds(n.provider || a.provider),
    modelConfigs: Xe(n.modelConfigs || a.modelConfigs)
  };
}
function hd(e = {}, t = {}, a = Ns, n = a) {
  if (e?.delegateConfigured === !1) return !1;
  if (n !== a) return !0;
  const s = e?.delegateConfig;
  if (!s || typeof s != "object" || Array.isArray(s) || !(typeof s.provider == "string" && s.provider.trim() || s.modelConfigs && typeof s.modelConfigs == "object" && Object.keys(s.modelConfigs).length)) return !1;
  if (e?.delegateConfigured === !0) return !0;
  const r = t[a] || Je(), o = pl(r), l = gl(s, r);
  return JSON.stringify(l) !== JSON.stringify(o);
}
function yd(e = {}, t, a, n, s) {
  const r = s(e?.[n]);
  if (r) return r;
  const o = Bs(e, t), l = [
    a,
    t,
    e?.currentPresetName,
    e?.delegatePresetName,
    ...Object.keys(o || {})
  ].map(Ie), u = /* @__PURE__ */ new Set();
  for (const v of l) {
    if (u.has(v)) continue;
    u.add(v);
    const d = s(o?.[v]?.[n]);
    if (d) return d;
  }
  return s(e?.delegateConfig?.[n]);
}
function kd(e = {}, t, a) {
  const n = (l) => String(l || "").trim();
  if (n(e?.tavilyBaseUrl)) return mt(e.tavilyBaseUrl);
  const s = Bs(e, t), r = [
    a,
    t,
    e?.currentPresetName,
    e?.delegatePresetName,
    ...Object.keys(s || {})
  ].map(Ie), o = /* @__PURE__ */ new Set();
  for (const l of r) {
    if (o.has(l)) continue;
    o.add(l);
    const u = s?.[l]?.tavilyBaseUrl;
    if (n(u)) return mt(u);
  }
  return n(e?.delegateConfig?.tavilyBaseUrl) ? mt(e.delegateConfig.tavilyBaseUrl) : ld;
}
function wd(e = {}, t, a) {
  return {
    tavilyApiKey: yd(e, t, a, "tavilyApiKey", od),
    tavilyBaseUrl: kd(e, t, a)
  };
}
function Tn(e = {}) {
  const t = Ie(e.currentPresetName || e.presetDraftName || "默认"), a = gd(e, t), n = md(a, e.currentPresetName), s = bd(a, e.delegatePresetName, n), r = a[n] || Je(), o = a[s] || r, l = gl(e.delegateConfig, o), u = hd(e, a, n, s), v = wd(e, t, n);
  return {
    workspaceFileName: String(e.workspaceFileName || ""),
    updatedAt: Number(e.updatedAt) || 0,
    jsApiPermission: qt(e.jsApiPermission),
    currentPresetName: n,
    delegatePresetName: s,
    delegateConfig: l,
    delegateConfigured: u,
    presetDraftName: Ie(e.presetDraftName || n),
    presetNames: Object.keys(a),
    presets: a,
    provider: r.provider,
    modelConfigs: r.modelConfigs,
    permissionMode: da(r.permissionMode),
    tavilyApiKey: v.tavilyApiKey,
    tavilyBaseUrl: v.tavilyBaseUrl
  };
}
async function xd(e, t) {
  const a = e.body?.getReader?.();
  if (!a) throw new Error("host_chat_completions_stream_missing_body");
  const n = new TextDecoder();
  let s = "";
  const r = /\r?\n\r?\n/, o = (u) => {
    const v = u.split(/\r?\n/).filter((d) => d.startsWith("data:")).map((d) => d.slice(5).trimStart()).join(`
`).trim();
    !v || v === "[DONE]" || t(JSON.parse(v));
  };
  for (; ; ) {
    const { done: u, value: v } = await a.read();
    if (u) break;
    for (s += n.decode(v, { stream: !0 }); ; ) {
      const d = s.match(r);
      if (!d || typeof d.index != "number") break;
      const m = s.slice(0, d.index);
      s = s.slice(d.index + d[0].length), o(m);
    }
  }
  const l = s.trim();
  l && o(l);
}
function Sd(e = "") {
  return String(e || "").trim().toLowerCase();
}
function _d(e = "") {
  const t = Sd(e);
  return t.includes("deepseek") ? "deepseek" : t.includes("kimi") || t.includes("moonshot") ? "kimi" : t.includes("gemini") ? "gemini" : t.includes("claude") ? "claude" : /(?:^|[/_.-])gpt(?:\d|[/_.-]|$)/.test(t) || /(?:^|[/_.-])o\d+(?:[/_.-]|$)/.test(t) ? "openai" : "";
}
var Sa = "openai", ml = "claude", bl = "makersuite", $d = "/api/backends/chat-completions/status", Cd = "/api/backends/chat-completions/generate", hl = Object.freeze({
  [ml]: "https://api.anthropic.com/v1",
  [bl]: "https://generativelanguage.googleapis.com"
}), sn = null;
function Ad(e) {
  return String(e || "").trim().replace(/\/+$/, "");
}
function Md(e, t) {
  const a = Ad(e);
  return t === "claude" ? !a || /\/v\d[\w.-]*$/i.test(a) ? a : `${a}/v1` : t === "makersuite" ? a.replace(/\/v\d[\w.-]*$/i, "") : a;
}
async function yl(e = sn) {
  if (typeof e != "function") throw new Error("宿主请求头未注册，无法调用酒馆后端。");
  return {
    "Content-Type": "application/json",
    ...await Promise.resolve(e() || {}),
    Accept: "application/json"
  };
}
function Td(e = {}) {
  const t = {};
  return Object.entries(e || {}).forEach(([a, n]) => {
    t[a] = /authorization|cookie|csrf|token|api[-_]?key/i.test(a) ? "[redacted]" : n;
  }), t;
}
async function qs(e = {}, t = !1, a = sn) {
  const n = await yl(a), s = {
    url: Cd,
    method: "POST",
    headers: Td(n),
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
async function Ed(e = {}, t = !1) {
  return await qs(e, t);
}
function Id(e = "") {
  return /^\s*(?:<!DOCTYPE\s+html\b|<html\b)/i.test(String(e || ""));
}
function Pd(e = "") {
  return /invalid csrf token/i.test(String(e || ""));
}
function Od() {
  return "酒馆当前页面的 CSRF token 已失效，请按 F5 刷新并重新进入酒馆后再试。";
}
function Ni(e = "", t = 10) {
  const a = Number.parseInt(String(e || ""), t);
  return Number.isInteger(a) && a >= 0 && a <= 1114111 ? String.fromCodePoint(a) : "";
}
function Di(e = "") {
  return String(e || "").replace(/&nbsp;|&#160;/gi, " ").replace(/&amp;/gi, "&").replace(/&lt;/gi, "<").replace(/&gt;/gi, ">").replace(/&quot;/gi, '"').replace(/&#39;|&apos;/gi, "'").replace(/&#x([0-9a-f]+);?/gi, (t, a) => Ni(a, 16)).replace(/&#([0-9]+);?/g, (t, a) => Ni(a));
}
function Ld(e = "") {
  const t = String(e || ""), a = Di((t.match(/<title\b[^>]*>([\s\S]*?)<\/title>/i) || [])[1] || "").replace(/\s+/g, " ").trim(), n = Di(t.replace(/<script\b[\s\S]*?<\/script>/gi, " ").replace(/<style\b[\s\S]*?<\/style>/gi, " ").replace(/<[^>]+>/g, " ")).replace(/\s+/g, " ").trim(), s = a || n;
  return s.length > 240 ? `${s.slice(0, 237)}...` : s;
}
function Rd(e = null) {
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
function Nd(e = {}) {
  return e.status ? `HTTP ${e.status}${e.statusText ? ` ${e.statusText}` : ""}` : "";
}
function Dd(e = "") {
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
function ya(e = "", t = "", a = null) {
  if (Pd(e)) return Od();
  const n = Rd(a);
  if (Id(e) || /\btext\/html\b/i.test(n.contentType)) {
    const s = Nd(n), r = Ld(e);
    return [
      "酒馆后端返回了非 JSON 的 HTML 页面",
      s ? `（${s}）` : "",
      r ? `：${r}` : ""
    ].join("");
  }
  return Dd(e) || String(e || t || "").trim();
}
function Bd(e = {}, t = Sa) {
  const a = Md(e.baseUrl, t), n = String(e.apiKey || "").trim(), s = hl[t] || "", r = a || (n ? s : ""), o = { chat_completion_source: t || "openai" };
  return r && (o.reverse_proxy = r), n && (o.proxy_password = n), o;
}
function qd(e = {}, t = Sa) {
  return Bd(e, t);
}
function Us(e) {
  const t = e || globalThis.fetch;
  if (typeof t != "function") throw new Error("当前运行环境没有可用的 fetch，无法调用酒馆后端。");
  return t;
}
async function Ud(e = {}, t = Sa, a = {}, n = {}) {
  const s = await Us(n.fetch)($d, {
    method: "POST",
    headers: await yl(n.requestHeadersProvider),
    body: JSON.stringify(qd(e, t)),
    signal: a.signal
  }), r = await s.text();
  let o = null;
  try {
    o = r ? JSON.parse(r) : {};
  } catch (u) {
    throw new Error(`酒馆后端模型列表拉取失败：${ya(r, String(u?.message || u), s)}`);
  }
  if (!s.ok || o?.error) {
    const u = ya(o?.message || o?.error?.message || r, `HTTP ${s.status}`, s);
    throw new Error(`酒馆后端模型列表拉取失败：${u}`);
  }
  const l = Array.isArray(o?.data) ? o.data.map((u) => String(u?.id || u?.name || "").trim()).filter(Boolean) : [];
  return [...new Set(l)];
}
async function Fs(e = {}, t = Sa, a = {}) {
  return await Ud(e, t, a, { requestHeadersProvider: sn });
}
async function Fd(e = {}, t = {}) {
  return await Fs(e, Sa, t);
}
async function jd(e = {}, t = {}, a = {}) {
  const n = await qs(e, !1, a.requestHeadersProvider);
  typeof t.onRequest == "function" && t.onRequest(n);
  const s = await Us(a.fetch)(n.url, {
    method: n.method,
    headers: n.rawHeaders || n.headers,
    body: JSON.stringify(n.body),
    signal: t.signal
  }), r = await s.text();
  let o = null;
  try {
    o = r ? JSON.parse(r) : {};
  } catch (l) {
    const u = /* @__PURE__ */ new Error(`酒馆后端生成失败：${ya(r, String(l?.message || l), s)}`);
    throw u.status = s.status, u.body = r, u;
  }
  if (!s.ok || o?.error) {
    const l = ya(o?.error?.message || o?.message || r, `HTTP ${s.status}`, s), u = /* @__PURE__ */ new Error(`酒馆后端生成失败：${l}`);
    throw u.status = s.status, u.error = o?.error, u;
  }
  return o;
}
async function Hd(e = {}, t = {}) {
  return await jd(e, t, { requestHeadersProvider: sn });
}
async function Kd(e = {}, t, a = {}, n = {}) {
  const s = await qs(e, !0, n.requestHeadersProvider);
  typeof a.onRequest == "function" && a.onRequest(s);
  const r = await Us(n.fetch)(s.url, {
    method: s.method,
    headers: s.rawHeaders || s.headers,
    body: JSON.stringify(s.body),
    signal: a.signal
  });
  if (!r.ok) {
    const o = await r.text().catch(() => ""), l = new Error(ya(o, `酒馆后端流式生成失败：HTTP ${r.status}`, r));
    throw l.status = r.status, l.body = o, l;
  }
  typeof a.onResponseAccepted == "function" && a.onResponseAccepted(), await xd(r, (o) => {
    if (o?.error) {
      const l = ya(o.error?.message || o.message || JSON.stringify(o.error), "酒馆后端流式生成失败");
      throw new Error(l);
    }
    t(o);
  });
}
async function Gd(e = {}, t, a = {}) {
  return await Kd(e, t, a, { requestHeadersProvider: sn });
}
var s0 = Object.freeze([
  "buildHostChatCompletionGenerateRequest",
  "createHostChatCompletion",
  "streamHostChatCompletion"
]), i0 = Object.freeze({
  buildHostChatCompletionGenerateRequest: Ed,
  fetchHostChatCompletionsModels: Fs,
  fetchHostOpenAICompatibleModels: Fd,
  createHostChatCompletion: Hd,
  streamHostChatCompletion: Gd
}), Vd = Object.freeze({
  minimal: "最小",
  low: "低",
  medium: "中",
  high: "高",
  xhigh: "超高",
  max: "最大",
  min: "最小"
});
function kl(e) {
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
function wt(e, t, a, n, s = {}) {
  return kl({
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
var js = kl({
  profileId: "unsupported",
  modes: ["inherit"],
  outputModes: ["hide"],
  intensity: { kind: "none" },
  unsupportedReason: "当前 Provider、传输方式与模型组合没有已验证的 Reasoning 控制协议。"
}), rn = Object.freeze(["on"]), Hs = Object.freeze([
  "inherit",
  "on",
  "off"
]), wl = wt("openai-gpt-5.6", [
  "inherit",
  "on",
  "off"
], [
  "low",
  "medium",
  "high",
  "xhigh",
  "max"
], "medium", { temperatureOmitModes: Hs }), zd = wt("kimi-k3", [
  "inherit",
  "on",
  "off"
], [
  "low",
  "high",
  "max"
], "max", { temperatureOmitModes: rn }), Wd = wt("deepseek-thinking", [
  "inherit",
  "on",
  "off"
], [
  "low",
  "high",
  "max"
], "high", { temperatureOmitModes: rn }), Yd = wt("openai-compatible-gemini-latest", [
  "inherit",
  "on",
  "off"
], [
  "minimal",
  "low",
  "medium",
  "high"
], "high", { temperatureOmitModes: rn }), Xd = wt("openai-compatible-claude-latest", [
  "inherit",
  "on",
  "off"
], [
  "low",
  "medium",
  "high",
  "xhigh",
  "max"
], "high", { temperatureOmitModes: rn }), Jd = wt("openai-compatible-default", [
  "inherit",
  "on",
  "off"
], [
  "low",
  "medium",
  "high"
], "medium", { temperatureOmitModes: rn }), Qd = wt("anthropic-adaptive", [
  "inherit",
  "on",
  "off"
], [
  "low",
  "medium",
  "high",
  "xhigh",
  "max"
], "high", { temperatureOmitModes: Hs }), Zd = wt("sillytavern-claude-adaptive", [
  "inherit",
  "on",
  "off"
], [
  "low",
  "medium",
  "high",
  "max"
], "high", { temperatureOmitModes: Hs }), ec = wt("google-gemini-3-flash", ["inherit", "on"], [
  "minimal",
  "low",
  "medium",
  "high"
], "high"), tc = wt("sillytavern-google-3-flash", ["inherit", "on"], [
  "min",
  "low",
  "medium",
  "high"
], "high");
function ac(e = "") {
  switch (_d(e)) {
    case "deepseek":
      return Wd;
    case "kimi":
      return zd;
    case "gemini":
      return Yd;
    case "claude":
      return Xd;
    case "openai":
      return wl;
    default:
      return Jd;
  }
}
function Ks(e = {}) {
  const t = String(e.provider || "").trim(), a = String(e.model || "").trim().toLowerCase();
  switch (t) {
    case "openai-responses":
      return wl;
    case "openai-compatible":
    case "sillytavern-openai-compatible":
      return ac(a);
    case "anthropic":
      return Qd;
    case "sillytavern-claude":
      return Zd;
    case "google":
      return ec;
    case "sillytavern-google":
      return tc;
    default:
      return js;
  }
}
function nc(e = js) {
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
function sc(e = js) {
  return e.intensity?.kind !== "effort" ? [] : e.intensity.values.map((t) => ({
    value: t,
    label: Vd[t] || t
  }));
}
function ns(e, t, a, n = "REASONING_CAPABILITY_UNSUPPORTED") {
  return {
    ...e,
    profileId: t.profileId,
    valid: !1,
    error: a,
    code: n
  };
}
function ic(e, t) {
  const a = { ...e };
  return delete a.effort, delete a.budgetTokens, t.intensity?.kind === "effort" ? {
    ...a,
    ...e.effort ? { effort: e.effort } : {}
  } : a;
}
function dn(e = {}, t = {}) {
  const a = Ks(e), n = ha(t), s = t?.output === "show" || t?.output === "hide" ? t.output : null, r = ic({
    ...n,
    output: n.mode === "off" ? "hide" : s || (a.outputModes.includes("show") ? "show" : "hide")
  }, a);
  if (!a.outputModes.includes(r.output)) return ns(r, a, "当前任务要求返回 Reasoning 内容，但所选模型不支持。");
  if (!a.modes.includes(r.mode)) return ns(r, a, r.mode === "off" ? "当前模型不支持显式关闭 Reasoning。请选择“跟随模型默认”。" : a.unsupportedReason || "当前模型不支持显式开启 Reasoning。");
  if (r.mode !== "on") return {
    ...r,
    profileId: a.profileId,
    valid: !0
  };
  if (a.intensity.kind === "effort") {
    const o = r.effort || a.intensity.defaultValue;
    return a.intensity.values.includes(o) ? {
      ...r,
      effort: o,
      profileId: a.profileId,
      valid: !0
    } : ns(r, a, `当前模型不支持 Reasoning 强度“${o}”。`, "REASONING_CONFIG_INVALID");
  }
  return {
    ...r,
    profileId: a.profileId,
    valid: !0
  };
}
var Bi = 900 * 1e3, qi = Object.freeze([{
  value: "native",
  label: "原生 Tool Calling"
}, {
  value: "tagged-json",
  label: "Tagged JSON 兼容模式"
}]), rc = Object.freeze([
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
function at(e, t = 1) {
  const a = typeof e == "string" && !e.trim() ? t : e, n = Number(a);
  return Number.isFinite(n) ? Math.max(0, Math.min(2, n)) : at(t, 1);
}
function ss(e = {}) {
  return e.sendTemperature !== !1;
}
function Ui(e = "", t = {}) {
  return t && typeof t == "object" && t[e] ? t[e] : rc.find((a) => a.value === e)?.label || e || "未配置";
}
var lc = { chat: { exclude: [
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
] } }, oc = Object.freeze([
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
function pt(e, t, a = "") {
  if (e.replaceChildren(), a) {
    const n = document.createElement("option");
    n.value = "", n.textContent = a, e.appendChild(n);
  }
  t.forEach((n) => {
    const s = document.createElement("option");
    s.value = n.value, s.textContent = n.label, s.disabled = n.disabled === !0, e.appendChild(s);
  });
}
function cn(e = "", t = {}) {
  const a = ha(t.reasoning), n = Ks({
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
    const r = a.budgetTokens, o = n.intensity.allowAuto && r === -1, l = Number.isInteger(r) && r >= n.intensity.min && r <= n.intensity.max;
    s.reasoningBudgetTokens = o || l ? r : n.intensity.defaultValue;
  }
  return s;
}
function Fi(e = {}) {
  return ha(e);
}
function Qa(e = []) {
  const t = [...new Set(e.filter(Boolean).map((s) => String(s).trim()).filter(Boolean))], a = lc.chat, n = t.filter((s) => {
    const r = s.toLowerCase();
    return !a.exclude.some((o) => r.includes(o));
  });
  return n.length ? n : t;
}
function fn(e = "") {
  return e === "delegate" ? "delegate" : "main";
}
function ka(e) {
  return String(e || "").trim().replace(/\/+$/, "");
}
function uc(e = "") {
  return e === "sillytavern-openai-compatible" || e === "sillytavern-claude" || e === "sillytavern-google";
}
function la(e = "") {
  return e === "openai-compatible" || e === "sillytavern-openai-compatible";
}
function dc(e = "") {
  return e === "anthropic" || e === "sillytavern-claude";
}
function cc(e = "") {
  return e === "sillytavern-claude" ? ml : e === "sillytavern-google" ? bl : Sa;
}
function Za(e = []) {
  return [...new Set(e.filter(Boolean).map((t) => String(t).trim()).filter(Boolean))];
}
function fc(e) {
  const t = ka(e);
  if (!t) return [];
  if (t.endsWith("/v1")) {
    const a = t.slice(0, -3);
    return Za([
      `${t}/models`,
      `${a}/v1/models`,
      `${a}/models`
    ]);
  }
  return Za([`${t}/v1/models`, `${t}/models`]);
}
function xl(e) {
  const t = ka(e);
  if (!t) return [];
  if (t.endsWith("/v1")) {
    const a = t.slice(0, -3);
    return Za([
      `${t}/models`,
      `${a}/v1/models`,
      `${a}/models`
    ]);
  }
  return Za([`${t}/v1/models`, `${t}/models`]);
}
function vc(e, t) {
  const a = ka(e);
  if (!a) return [];
  const n = a.endsWith("/v1beta") ? a.slice(0, -7) : a;
  return Za([
    `${a}/models?key=${encodeURIComponent(t)}`,
    `${a}/models`,
    `${n}/v1beta/models?key=${encodeURIComponent(t)}`,
    `${n}/v1beta/models`,
    `${n}/models?key=${encodeURIComponent(t)}`,
    `${n}/models`
  ]);
}
function pc(e, t) {
  const a = [
    e?.error?.message,
    e?.message,
    e?.detail,
    e?.details,
    e?.error
  ].find((n) => typeof n == "string" && n.trim());
  return a ? a.trim() : String(t || "").trim().slice(0, 160);
}
async function gc(e, t = {}) {
  const a = await fetch(e, t), n = await a.text();
  let s = null, r = null;
  try {
    s = n ? JSON.parse(n) : {};
  } catch (o) {
    r = o;
  }
  return {
    ok: a.ok,
    status: a.status,
    url: e,
    data: s,
    rawText: n,
    parseError: r,
    errorSnippet: pc(s, n)
  };
}
function mc(e) {
  return Qa((e?.data || []).map((t) => String(t?.id || "").trim()).filter(Boolean));
}
function Sl(e) {
  return Qa((e?.data || []).map((t) => String(t?.id || "").trim()).filter(Boolean));
}
function bc(e) {
  return Qa((e?.models || e?.data || []).map((t) => String(t?.id || t?.name || "")).map((t) => t.split("/").pop() || "").filter(Boolean));
}
async function yn({ urls: e, requestOptionsList: t, extractModels: a, providerLabel: n }) {
  let s = null;
  for (const r of e) for (const o of t) {
    const l = await gc(r, o);
    if (!l.ok) {
      s = l;
      continue;
    }
    if (l.parseError) {
      s = {
        ...l,
        errorSnippet: "返回的不是 JSON"
      };
      continue;
    }
    const u = a(l.data);
    if (u.length) return u;
    s = {
      ...l,
      errorSnippet: "返回成功，但模型列表为空"
    };
  }
  if (s) {
    const r = s.url ? ` (${s.url})` : "", o = s.errorSnippet ? `：${s.errorSnippet}` : "";
    throw new Error(`${n} 拉取模型失败：${s.status || "unknown"}${o}${r}`);
  }
  throw new Error(`${n} 拉取模型失败：未获取到模型列表。`);
}
async function hc(e, t = {}) {
  const a = String(e.apiKey || "").trim(), n = ka(e.baseUrl || ""), s = ka(n || hl.claude);
  if (a && s) try {
    return await yn({
      urls: xl(s),
      requestOptionsList: [{
        headers: {
          "x-api-key": a,
          "anthropic-version": "2023-06-01",
          Accept: "application/json"
        },
        signal: t.signal
      }],
      extractModels: Sl,
      providerLabel: "Anthropic"
    });
  } catch (r) {
    if (n) throw r;
  }
  return [...oc];
}
async function yc(e, t = {}) {
  const a = e.provider, n = ka(e.baseUrl || ""), s = String(e.apiKey || "").trim();
  if (a === "sillytavern-claude") return Qa(await hc(e, t));
  if (uc(a)) return Qa(await Fs(e, cc(a), { signal: t.signal }));
  if (!s) throw new Error("请先填写 API Key。");
  if (!n) throw new Error("请先填写 Base URL。");
  return a === "google" ? await yn({
    urls: vc(n, s),
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
    extractModels: bc,
    providerLabel: "Google AI"
  }) : dc(a) ? await yn({
    urls: xl(n),
    requestOptionsList: [{
      headers: {
        "x-api-key": s,
        "anthropic-version": "2023-06-01",
        Accept: "application/json"
      },
      signal: t.signal
    }],
    extractModels: Sl,
    providerLabel: "Anthropic"
  }) : await yn({
    urls: fc(n),
    requestOptionsList: [{
      headers: {
        Authorization: `Bearer ${s}`,
        Accept: "application/json"
      },
      signal: t.signal
    }],
    extractModels: mc,
    providerLabel: a === "openai-responses" ? "OpenAI Responses" : "OpenAI-Compatible"
  });
}
function kc(e) {
  return e instanceof Error ? e.message : String(e || "unknown_error");
}
function wc(e = {}) {
  const { state: t, render: a, showToast: n, createRequestId: s = (p = "req") => `${p}-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`, saveConfig: r, reloadConfig: o, pullModels: l = yc, describeError: u = kc, getRuntimeSummaryText: v } = e;
  function d() {
    t.configFormSyncPending = !0;
  }
  function m(p, c = "main") {
    const f = String(p || "").trim() || "openai-compatible";
    return c === "delegate" ? `delegate:${f}` : f;
  }
  function S(p, c = "main") {
    return t.pullStateByProvider?.[m(p, c)] || {
      status: "idle",
      message: ""
    };
  }
  function h(p, c, f = "main") {
    t.pullStateByProvider = {
      ...t.pullStateByProvider || {},
      [m(p, f)]: c
    };
  }
  function A(p, c, f = "main") {
    t.modelOptionsByProvider = {
      ...t.modelOptionsByProvider || {},
      [m(p, f)]: Array.isArray(c) ? c : []
    };
  }
  function L(p, c = "main") {
    const f = m(p, c);
    return Array.isArray(t.modelOptionsByProvider?.[f]) ? t.modelOptionsByProvider[f] : [];
  }
  function X(p, c) {
    const f = t.config?.presets || {}, w = Ie(p || c || "默认");
    return f[w] ? w : c && f[c] ? c : Object.keys(f)[0] || "默认";
  }
  function V(p, c) {
    const f = X(p, Ns), w = c && typeof c == "object" ? c : Je(), I = w.provider || "openai-compatible", R = Xe(w.modelConfigs || {}), O = R[I] || {}, T = cn(I, O);
    return {
      delegatePresetName: f,
      delegateProvider: I,
      delegateModelConfigs: R,
      delegateBaseUrl: String(O.baseUrl || ""),
      delegateModel: String(O.model || ""),
      delegateApiKey: String(O.apiKey || ""),
      delegateTemperature: at(O.temperature, 1),
      delegateMaxTokens: De(O.maxTokens),
      delegateSendTemperature: ss(O),
      delegateReasoningMode: T.reasoningMode,
      delegateReasoningEffort: T.reasoningEffort,
      delegateReasoningBudgetTokens: T.reasoningBudgetTokens,
      delegateToolMode: O.toolMode || "native"
    };
  }
  function W(p = "openai-compatible", c = {}) {
    const f = Xe(c || {})[p] || {}, w = cn(p, f);
    return {
      baseUrl: String(f.baseUrl || ""),
      model: String(f.model || ""),
      apiKey: String(f.apiKey || ""),
      temperature: at(f.temperature, 1),
      maxTokens: De(f.maxTokens),
      sendTemperature: ss(f),
      ...w,
      toolMode: f.toolMode || "native"
    };
  }
  function G(p = "openai-compatible", c = {}) {
    const f = Xe(c || {})[p] || {}, w = cn(p, f);
    return {
      delegateBaseUrl: String(f.baseUrl || ""),
      delegateModel: String(f.model || ""),
      delegateApiKey: String(f.apiKey || ""),
      delegateTemperature: at(f.temperature, 1),
      delegateMaxTokens: De(f.maxTokens),
      delegateSendTemperature: ss(f),
      delegateReasoningMode: w.reasoningMode,
      delegateReasoningEffort: w.reasoningEffort,
      delegateReasoningBudgetTokens: w.reasoningBudgetTokens,
      delegateToolMode: f.toolMode || "native"
    };
  }
  function E(p, c, f = t.config) {
    const w = Ie(p || "默认"), I = c && typeof c == "object" ? c : Je(), R = I.provider || "openai-compatible", O = Xe(I.modelConfigs || {}), T = W(R, O), k = X(f?.delegatePresetName, w), P = V(k, f?.delegateConfig && typeof f.delegateConfig == "object" ? f.delegateConfig : (f?.presets || {})[k] || I);
    return {
      currentPresetName: w,
      presetDraftName: w,
      provider: R,
      modelConfigs: O,
      ...T,
      tavilyApiKey: String(f?.tavilyApiKey || ""),
      tavilyBaseUrl: mt(f?.tavilyBaseUrl || "https://api.tavily.com"),
      permissionMode: da(I.permissionMode),
      jsApiPermission: qt(f?.jsApiPermission),
      ...P
    };
  }
  function C() {
    if (t.configDraft) return t.configDraft;
    const p = Ie(t.config?.currentPresetName || "默认");
    return t.configDraft = E(p, (t.config?.presets || {})[p] || Je()), t.configDraft;
  }
  function M(p, c = {}) {
    const f = C(), w = c.provider || p.querySelector("#xb-assistant-provider")?.value || f.provider || "openai-compatible", I = c.delegateProvider || p.querySelector("#xb-assistant-delegate-provider")?.value || f.delegateProvider || "openai-compatible", R = p.querySelector("#xb-assistant-base-url")?.value.trim() || "", O = p.querySelector("#xb-assistant-model")?.value.trim() || "", T = p.querySelector("#xb-assistant-delegate-base-url")?.value.trim() ?? f.delegateBaseUrl ?? "", k = p.querySelector("#xb-assistant-delegate-model")?.value.trim() ?? f.delegateModel ?? "", P = Fi({
      mode: p.querySelector("#xb-assistant-reasoning-mode")?.value || f.reasoningMode,
      effort: p.querySelector("#xb-assistant-reasoning-effort")?.value || f.reasoningEffort,
      budgetTokens: p.querySelector("#xb-assistant-reasoning-budget")?.value ?? f.reasoningBudgetTokens
    }), N = Fi({
      mode: p.querySelector("#xb-assistant-delegate-reasoning-mode")?.value || f.delegateReasoningMode,
      effort: p.querySelector("#xb-assistant-delegate-reasoning-effort")?.value || f.delegateReasoningEffort,
      budgetTokens: p.querySelector("#xb-assistant-delegate-reasoning-budget")?.value ?? f.delegateReasoningBudgetTokens
    }), H = {
      baseUrl: R,
      model: O,
      apiKey: p.querySelector("#xb-assistant-api-key")?.value.trim() || "",
      temperature: at(p.querySelector("#xb-assistant-temperature")?.value, f.temperature ?? 1),
      maxTokens: De(p.querySelector("#xb-assistant-max-tokens")?.value, f.maxTokens),
      sendTemperature: p.querySelector("#xb-assistant-send-temperature")?.checked ?? !!(f.sendTemperature ?? !0),
      reasoning: P,
      toolMode: la(w) ? p.querySelector("#xb-assistant-tool-mode")?.value || f.toolMode || "native" : void 0
    }, U = {
      baseUrl: T,
      model: k,
      apiKey: p.querySelector("#xb-assistant-delegate-api-key")?.value.trim() ?? f.delegateApiKey ?? "",
      temperature: at(p.querySelector("#xb-assistant-delegate-temperature")?.value, f.delegateTemperature ?? 1),
      maxTokens: De(p.querySelector("#xb-assistant-delegate-max-tokens")?.value, f.delegateMaxTokens),
      sendTemperature: p.querySelector("#xb-assistant-delegate-send-temperature")?.checked ?? !!(f.delegateSendTemperature ?? !0),
      reasoning: N,
      toolMode: la(I) ? p.querySelector("#xb-assistant-delegate-tool-mode")?.value || f.delegateToolMode || "native" : void 0
    }, Q = {
      ...Xe(f.modelConfigs || {}),
      [w]: {
        ...Xe(f.modelConfigs || {})[w] || {},
        ...H
      }
    }, ee = {
      ...Xe(f.delegateModelConfigs || {}),
      [I]: {
        ...Xe(f.delegateModelConfigs || {})[I] || {},
        ...U
      }
    };
    return {
      ...f,
      currentPresetName: f.currentPresetName,
      presetDraftName: Ie(p.querySelector("#xb-assistant-preset-name")?.value),
      provider: w,
      modelConfigs: Q,
      baseUrl: H.baseUrl,
      model: H.model,
      apiKey: H.apiKey,
      temperature: H.temperature,
      maxTokens: H.maxTokens,
      sendTemperature: H.sendTemperature,
      reasoningMode: H.reasoning.mode,
      reasoningEffort: H.reasoning.effort || "",
      reasoningBudgetTokens: H.reasoning.budgetTokens,
      toolMode: H.toolMode || f.toolMode || "native",
      tavilyApiKey: p.querySelector("#xb-assistant-tavily-api-key")?.value.trim() ?? f.tavilyApiKey ?? "",
      tavilyBaseUrl: mt(f.tavilyBaseUrl || "https://api.tavily.com"),
      permissionMode: da(p.querySelector("#xb-assistant-permission-mode")?.value || f.permissionMode),
      jsApiPermission: qt(p.querySelector("#xb-assistant-jsapi-permission")?.value || f.jsApiPermission),
      delegatePresetName: X(p.querySelector("#xb-assistant-delegate-preset-select")?.value || f.delegatePresetName, f.currentPresetName),
      delegateProvider: I,
      delegateModelConfigs: ee,
      delegateBaseUrl: U.baseUrl,
      delegateModel: U.model,
      delegateApiKey: U.apiKey,
      delegateTemperature: U.temperature,
      delegateMaxTokens: U.maxTokens,
      delegateSendTemperature: U.sendTemperature,
      delegateReasoningMode: U.reasoning.mode,
      delegateReasoningEffort: U.reasoning.effort || "",
      delegateReasoningBudgetTokens: U.reasoning.budgetTokens,
      delegateToolMode: U.toolMode || f.delegateToolMode || "native"
    };
  }
  function x(p, c = {}) {
    return t.configDraft = M(p, c), t.configDirty = !0, t.configDraft;
  }
  function _(p = C()) {
    return {
      baseUrl: String(p.baseUrl || ""),
      model: String(p.model || ""),
      apiKey: String(p.apiKey || ""),
      temperature: at(p.temperature, 1),
      maxTokens: De(p.maxTokens),
      sendTemperature: !!(p.sendTemperature ?? !0),
      reasoning: ha({
        mode: p.reasoningMode,
        effort: p.reasoningEffort,
        budgetTokens: p.reasoningBudgetTokens
      }),
      toolMode: la(p.provider) ? p.toolMode || "native" : void 0
    };
  }
  function $(p = C()) {
    return {
      baseUrl: String(p.delegateBaseUrl || ""),
      model: String(p.delegateModel || ""),
      apiKey: String(p.delegateApiKey || ""),
      temperature: at(p.delegateTemperature, 1),
      maxTokens: De(p.delegateMaxTokens),
      sendTemperature: !!(p.delegateSendTemperature ?? !0),
      reasoning: ha({
        mode: p.delegateReasoningMode,
        effort: p.delegateReasoningEffort,
        budgetTokens: p.delegateReasoningBudgetTokens
      }),
      toolMode: la(p.delegateProvider) ? p.delegateToolMode || "native" : void 0
    };
  }
  function F(p = C()) {
    const c = p.delegateProvider || "openai-compatible", f = Xe(p.delegateModelConfigs || {});
    return {
      provider: c,
      modelConfigs: {
        ...f,
        [c]: {
          ...f[c] || {},
          ...$(p)
        }
      }
    };
  }
  function Z(p = C()) {
    return {
      provider: p.provider || "openai-compatible",
      baseUrl: p.baseUrl || "",
      model: p.model || "",
      apiKey: p.apiKey || "",
      tavilyApiKey: p.tavilyApiKey || "",
      tavilyBaseUrl: mt(p.tavilyBaseUrl || "https://api.tavily.com"),
      temperature: p.sendTemperature === !1 ? void 0 : at(p.temperature, 1),
      sendTemperature: !!(p.sendTemperature ?? !0),
      maxTokens: De(p.maxTokens),
      timeoutMs: Bi,
      toolMode: p.toolMode || "native",
      reasoning: dn({
        provider: p.provider,
        baseUrl: p.baseUrl,
        model: p.model,
        maxTokens: De(p.maxTokens)
      }, {
        mode: p.reasoningMode,
        effort: p.reasoningEffort,
        budgetTokens: p.reasoningBudgetTokens
      })
    };
  }
  function K(p = C()) {
    return {
      provider: p.delegateProvider || "openai-compatible",
      baseUrl: p.delegateBaseUrl || "",
      model: p.delegateModel || "",
      apiKey: p.delegateApiKey || "",
      tavilyApiKey: p.tavilyApiKey || "",
      tavilyBaseUrl: mt(p.tavilyBaseUrl || "https://api.tavily.com"),
      temperature: p.delegateSendTemperature === !1 ? void 0 : at(p.delegateTemperature, 1),
      sendTemperature: !!(p.delegateSendTemperature ?? !0),
      maxTokens: De(p.delegateMaxTokens),
      timeoutMs: Bi,
      toolMode: p.delegateToolMode || "native",
      reasoning: dn({
        provider: p.delegateProvider,
        baseUrl: p.delegateBaseUrl,
        model: p.delegateModel,
        maxTokens: De(p.delegateMaxTokens)
      }, {
        mode: p.delegateReasoningMode,
        effort: p.delegateReasoningEffort,
        budgetTokens: p.delegateReasoningBudgetTokens
      })
    };
  }
  function J(p = {}) {
    const c = [];
    Object.entries(p.presets || {}).forEach(([R, O]) => {
      const T = O?.provider || "openai-compatible", k = O?.modelConfigs?.[T] || {}, P = dn({
        provider: T,
        baseUrl: k.baseUrl,
        model: k.model,
        maxTokens: De(k.maxTokens)
      }, k.reasoning);
      P.valid === !1 && c.push(`预设“${R}”：${P.error}`);
    });
    const f = p.delegateConfig?.provider || "openai-compatible", w = p.delegateConfig?.modelConfigs?.[f] || {}, I = dn({
      provider: f,
      baseUrl: w.baseUrl,
      model: w.model,
      maxTokens: De(w.maxTokens)
    }, w.reasoning);
    return I.valid === !1 && c.push(`分身模型：${I.error}`), c;
  }
  function D(p = {}) {
    const c = (p.role === "delegate", C());
    return p.role === "delegate" ? K(c) : Z(c);
  }
  function ue(p) {
    C(), t.configDraft = {
      ...t.configDraft,
      presetDraftName: Ie(p.querySelector("#xb-assistant-preset-name")?.value)
    };
  }
  function ke(p = C(), c = p.provider || "openai-compatible", f = "main") {
    const w = S(c, f);
    return typeof v == "function" ? v({
      state: t,
      draft: p,
      provider: c,
      pullState: w,
      providerLabel: Ui(c)
    }) : `预设「${p.currentPresetName || "默认"}」 · ${Ui(c)}`;
  }
  function de(p, c, f) {
    const w = p?.querySelector?.(c);
    if (!w) return;
    const I = String(f?.status || "idle"), R = String(f?.message || "").trim();
    w.textContent = R, w.hidden = !R, w.classList.toggle("is-loading", I === "loading"), w.classList.toggle("is-success", I === "success"), w.classList.toggle("is-error", I === "error");
  }
  function ce(p) {
    if (!p) return;
    const c = fn(t.configPage);
    t.configPage = c, p.querySelectorAll("[data-config-page]").forEach((f) => {
      const w = fn(f?.dataset?.configPage) === c;
      f.classList.toggle("is-active", w), f.setAttribute("aria-selected", w ? "true" : "false");
    }), p.querySelectorAll("[data-config-page-panel]").forEach((f) => {
      const w = fn(f?.dataset?.configPagePanel) === c;
      f.toggleAttribute("hidden", !w);
    }), p.querySelector("#xb-assistant-delete-preset")?.toggleAttribute("hidden", c === "delegate");
  }
  function j(p, c = "main") {
    const f = C(), w = c === "delegate", I = w ? "#xb-assistant-delegate-reasoning" : "#xb-assistant-reasoning", R = w ? f.delegateProvider : f.provider, O = w ? f.delegateBaseUrl : f.baseUrl, T = w ? f.delegateModel : f.model, k = {
      mode: w ? f.delegateReasoningMode : f.reasoningMode,
      effort: w ? f.delegateReasoningEffort : f.reasoningEffort,
      budgetTokens: w ? f.delegateReasoningBudgetTokens : f.reasoningBudgetTokens
    }, P = Ks({
      provider: R,
      baseUrl: O,
      model: T
    }), N = cn(R, {
      baseUrl: O,
      model: T,
      reasoning: k
    }), H = N.reasoningMode, U = N.reasoningEffort, Q = N.reasoningBudgetTokens, ee = p.querySelector(`${I}-mode`), le = p.querySelector(`${I}-capability`), fe = p.querySelector(`${I}-effort-wrap`), ve = p.querySelector(`${I}-effort`), we = p.querySelector(`${I}-budget-wrap`), xe = p.querySelector(`${I}-budget`);
    ee && (pt(ee, nc(P)), ee.value = H), le && (le.textContent = P.unsupportedReason || `能力配置：${P.profileId}`), ve && (pt(ve, sc(P)), ve.value = U), fe && (fe.style.display = H === "on" && P.intensity.kind === "effort" ? "" : "none"), xe && P.intensity.kind === "budget" && (xe.min = P.intensity.allowAuto ? "-1" : String(P.intensity.min), xe.max = String(P.intensity.max), xe.value = String(Q)), we && (we.style.display = H === "on" && P.intensity.kind === "budget" ? "" : "none");
  }
  function B(p) {
    const c = p.querySelector("#xb-assistant-runtime");
    if (!c) return;
    const f = C(), w = t.configPage === "delegate", I = w ? f.delegateProvider : f.provider;
    c.textContent = ke(w ? {
      ...f,
      currentPresetName: "分身",
      provider: I
    } : f, I || "openai-compatible", w ? "delegate" : "main");
  }
  function re(p) {
    if (!t.config) return;
    ce(p);
    const c = C(), f = c.provider || "openai-compatible", w = L(f), I = c.delegateProvider || "openai-compatible", R = L(I, "delegate"), O = p.querySelector("#xb-assistant-provider"), T = p.querySelector("#xb-assistant-base-url"), k = p.querySelector("#xb-assistant-model"), P = p.querySelector("#xb-assistant-api-key"), N = p.querySelector("#xb-assistant-temperature"), H = p.querySelector("#xb-assistant-send-temperature"), U = p.querySelector("#xb-assistant-tool-mode-wrap"), Q = p.querySelector("#xb-assistant-tool-mode"), ee = p.querySelector("#xb-assistant-permission-mode"), le = p.querySelector("#xb-assistant-jsapi-permission"), fe = p.querySelector("#xb-assistant-model-pulled"), ve = p.querySelector("#xb-assistant-max-tokens"), we = p.querySelector("#xb-assistant-preset-select"), xe = p.querySelector("#xb-assistant-preset-name"), He = p.querySelector("#xb-assistant-delegate-preset-select"), Le = p.querySelector("#xb-assistant-delegate-provider"), Nt = p.querySelector("#xb-assistant-delegate-base-url"), $a = p.querySelector("#xb-assistant-delegate-model"), Re = p.querySelector("#xb-assistant-delegate-api-key"), Ye = p.querySelector("#xb-assistant-tavily-api-key"), ia = p.querySelector("#xb-assistant-delegate-model-pulled"), Ca = p.querySelector("#xb-assistant-delegate-max-tokens"), Gs = p.querySelector("#xb-assistant-delegate-tool-mode-wrap"), Kn = p.querySelector("#xb-assistant-delegate-tool-mode");
    if (!we || !xe) return;
    const Vs = (t.config.presetNames || []).map((Dt) => ({
      value: Dt,
      label: Dt
    }));
    pt(we, Vs), we.value = c.currentPresetName || t.config.currentPresetName || "默认", He && (pt(He, Vs), He.value = X(c.delegatePresetName, c.currentPresetName)), xe.value = c.presetDraftName || c.currentPresetName || "默认", O && (O.value = f), T && (T.value = c.baseUrl || ""), k && (k.value = c.model || ""), P && (P.value = c.apiKey || ""), ve && (ve.value = String(De(c.maxTokens))), N && (N.value = String(at(c.temperature, 1))), H && (H.checked = !!(c.sendTemperature ?? !0)), Ye && (Ye.value = c.tavilyApiKey || ""), U && (U.style.display = la(f) ? "" : "none"), Q && (pt(Q, qi), Q.value = c.toolMode || "native"), ee && (pt(ee, vd), ee.value = da(c.permissionMode)), le && (pt(le, pd), le.value = qt(c.jsApiPermission)), j(p), fe && (pt(fe, w.map((Dt) => ({
      value: Dt,
      label: Dt
    })), "手动填写"), fe.value = w.includes(c.model) ? c.model : ""), Le && (Le.value = I), Nt && (Nt.value = c.delegateBaseUrl || ""), $a && ($a.value = c.delegateModel || ""), Re && (Re.value = c.delegateApiKey || "");
    const zs = p.querySelector("#xb-assistant-delegate-temperature"), Ws = p.querySelector("#xb-assistant-delegate-send-temperature");
    Ca && (Ca.value = String(De(c.delegateMaxTokens))), zs && (zs.value = String(at(c.delegateTemperature, 1))), Ws && (Ws.checked = !!(c.delegateSendTemperature ?? !0)), Gs && (Gs.style.display = la(I) ? "" : "none"), Kn && (pt(Kn, qi), Kn.value = c.delegateToolMode || "native"), j(p, "delegate"), ia && (pt(ia, R.map((Dt) => ({
      value: Dt,
      label: Dt
    })), "手动填写"), ia.value = R.includes(c.delegateModel) ? c.delegateModel : ""), de(p, "#xb-assistant-model-pull-status", S(f)), de(p, "#xb-assistant-delegate-model-pull-status", S(I, "delegate")), B(p);
  }
  function Ae(p) {
    if (typeof r != "function") return;
    const c = r(p);
    c && typeof c.catch == "function" && c.catch((f) => {
      n?.(u(f));
    });
  }
  function je(p, c, f) {
    p.querySelector(c)?.addEventListener("click", () => {
      const w = p.querySelector(f);
      w && (w.type = w.type === "password" ? "text" : "password");
    });
  }
  function _a(p) {
    return {
      expectedUpdatedAt: Number(p?.updatedAt) || 0,
      workspaceFileName: p?.workspaceFileName || "",
      jsApiPermission: qt(p?.jsApiPermission),
      tavilyApiKey: String(p?.tavilyApiKey || ""),
      tavilyBaseUrl: mt(p?.tavilyBaseUrl || "https://api.tavily.com"),
      currentPresetName: p?.currentPresetName || "默认",
      delegatePresetName: p?.delegatePresetName || p?.currentPresetName || "默认",
      delegateConfig: p?.delegateConfig || {},
      delegateConfigured: p?.delegateConfigured === !0,
      presets: p?.presets || {}
    };
  }
  function sa(p, c = {}) {
    const f = Tn(p), w = J(f);
    if (w.length)
      return n?.(w[0]), !1;
    t.config = f;
    const I = Ie(c.presetName || f.currentPresetName || "默认");
    return t.configDraft = E(I, f.presets?.[I] || Je(), f), d(), Ae({
      requestId: s(c.requestPrefix || "save-config"),
      config: f,
      payload: _a(f)
    }), !0;
  }
  function We(p, c = {}) {
    const f = x(p), w = Ie(c.presetName || f.presetDraftName), I = Ie(f.currentPresetName || t.config?.currentPresetName || "默认"), R = (t.config?.presets || {})[I] || Je(), O = Xe(f.modelConfigs || R.modelConfigs || {}), T = {
      ...R,
      provider: f.provider,
      permissionMode: da(f.permissionMode),
      modelConfigs: {
        ...O,
        [f.provider]: {
          ...O[f.provider] || {},
          ..._(f)
        }
      }
    }, k = { ...t.config?.presets || {} };
    c.renameCurrentPreset && w !== I && delete k[I], k[w] = T, sa({
      ...t.config,
      jsApiPermission: qt(f.jsApiPermission),
      tavilyApiKey: String(f.tavilyApiKey || ""),
      tavilyBaseUrl: mt(f.tavilyBaseUrl || "https://api.tavily.com"),
      currentPresetName: w,
      delegatePresetName: X(f.delegatePresetName, w),
      delegateConfig: F(f),
      delegateConfigured: c.configureDelegate === !0 || t.config?.delegateConfigured === !0,
      presets: k
    }, {
      presetName: w,
      requestPrefix: c.requestPrefix
    });
  }
  function xt(p, c = "") {
    const f = Ie(c || "默认"), w = typeof window < "u" && typeof window.prompt == "function" ? window.prompt(p, f) : f;
    return w === null ? "" : Ie(w);
  }
  function et(p) {
    const c = xt("输入新预设名称：", `${x(p).currentPresetName || "默认"} 副本`);
    if (!c) {
      n?.("预设名称不能为空");
      return;
    }
    const f = p.querySelector("#xb-assistant-preset-name");
    f && (f.value = c, We(p, {
      presetName: c,
      requestPrefix: "create-preset"
    }));
  }
  function zt(p) {
    const c = x(p), f = Ie(c.currentPresetName || t.config?.currentPresetName || "默认"), w = xt("输入预设名称：", c.presetDraftName || f);
    if (!w) {
      n?.("预设名称不能为空");
      return;
    }
    if (w === f) return;
    const I = p.querySelector("#xb-assistant-preset-name");
    I && (I.value = w, We(p, {
      presetName: w,
      renameCurrentPreset: !0,
      requestPrefix: "rename-preset"
    }));
  }
  function ft(p) {
    if (Object.keys(t.config?.presets || {}).length <= 1) {
      n?.("至少要保留一套预设");
      return;
    }
    const c = x(p), f = Ie(t.configDraft?.currentPresetName || t.config?.currentPresetName || "默认"), w = { ...t.config?.presets || {} };
    delete w[f];
    const I = Object.keys(w)[0] || "默认";
    sa({
      ...t.config,
      jsApiPermission: qt(c.jsApiPermission),
      tavilyApiKey: String(c.tavilyApiKey || t.config?.tavilyApiKey || ""),
      tavilyBaseUrl: mt(c.tavilyBaseUrl || t.config?.tavilyBaseUrl || "https://api.tavily.com"),
      currentPresetName: I,
      delegatePresetName: X(c.delegatePresetName, I),
      delegateConfig: F(c),
      presets: w
    }, {
      presetName: I,
      requestPrefix: "delete-preset"
    }) && a?.();
  }
  function Wt(p) {
    p?.querySelector?.("[data-xb-agent-config-retry]")?.addEventListener("click", () => {
      o?.();
    }), p?.querySelector?.("[data-xb-agent-config-reload]")?.addEventListener("click", () => {
      t.configDraft = null, t.configDirty = !1, t.configExternalChangePending = !1, d(), o?.();
    }), p?.querySelector?.("#xb-assistant-provider") && (p.querySelector("#xb-assistant-provider")?.addEventListener("change", (c) => {
      const f = c.currentTarget.value, w = C().provider, I = x(p, { provider: w });
      t.configDraft = {
        ...I,
        provider: f,
        ...W(f, I.modelConfigs)
      }, d(), a?.();
    }), p.querySelector("#xb-assistant-preset-select")?.addEventListener("change", (c) => {
      const f = Ie(c.currentTarget.value), w = (t.config?.presets || {})[f] || Je(), I = x(p);
      t.config = Tn({
        ...t.config,
        jsApiPermission: qt(I.jsApiPermission),
        currentPresetName: f,
        delegatePresetName: X(I.delegatePresetName, f),
        delegateConfig: F(I)
      }), t.configDraft = E(f, w, t.config), d(), a?.();
    }), p.querySelector("#xb-assistant-preset-name")?.addEventListener("input", () => {
      ue(p);
    }), p.querySelector("#xb-assistant-base-url")?.addEventListener("input", () => {
      x(p), j(p), B(p);
    }), p.querySelector("#xb-assistant-model")?.addEventListener("input", () => {
      x(p), j(p), B(p);
    }), p.querySelector("#xb-assistant-api-key")?.addEventListener("input", () => {
      x(p);
    }), p.querySelector("#xb-assistant-max-tokens")?.addEventListener("input", () => {
      x(p);
    }), p.querySelector("#xb-assistant-temperature")?.addEventListener("input", () => {
      x(p);
    }), p.querySelector("#xb-assistant-send-temperature")?.addEventListener("change", () => {
      x(p);
    }), p.querySelector("#xb-assistant-tavily-api-key")?.addEventListener("input", () => {
      x(p);
    }), p.querySelector("#xb-assistant-model-pulled")?.addEventListener("change", (c) => {
      const f = c.currentTarget.value;
      if (!f) return;
      const w = p.querySelector("#xb-assistant-model");
      w && (w.value = f), x(p), j(p), B(p);
    }), je(p, "#xb-assistant-toggle-key", "#xb-assistant-api-key"), je(p, "#xb-assistant-toggle-tavily-key", "#xb-assistant-tavily-api-key"), p.querySelector("#xb-assistant-delegate-provider")?.addEventListener("change", (c) => {
      const f = c.currentTarget.value, w = C().delegateProvider, I = x(p, { delegateProvider: w });
      t.configDraft = {
        ...I,
        delegateProvider: f,
        ...G(f, I.delegateModelConfigs)
      }, d(), a?.();
    }), p.querySelector("#xb-assistant-delegate-base-url")?.addEventListener("input", () => {
      x(p), j(p, "delegate"), B(p);
    }), p.querySelector("#xb-assistant-delegate-model")?.addEventListener("input", () => {
      x(p), j(p, "delegate"), B(p);
    }), p.querySelector("#xb-assistant-delegate-api-key")?.addEventListener("input", () => {
      x(p);
    }), p.querySelector("#xb-assistant-delegate-max-tokens")?.addEventListener("input", () => {
      x(p);
    }), p.querySelector("#xb-assistant-delegate-temperature")?.addEventListener("input", () => {
      x(p);
    }), p.querySelector("#xb-assistant-delegate-send-temperature")?.addEventListener("change", () => {
      x(p);
    }), p.querySelector("#xb-assistant-delegate-model-pulled")?.addEventListener("change", (c) => {
      const f = c.currentTarget.value;
      if (!f) return;
      const w = p.querySelector("#xb-assistant-delegate-model");
      w && (w.value = f), x(p), j(p, "delegate"), B(p);
    }), je(p, "#xb-assistant-delegate-toggle-key", "#xb-assistant-delegate-api-key"), p.querySelector("#xb-assistant-reasoning-mode")?.addEventListener("change", () => {
      x(p), j(p), B(p);
    }), p.querySelector("#xb-assistant-reasoning-effort")?.addEventListener("change", () => {
      x(p);
    }), p.querySelector("#xb-assistant-reasoning-budget")?.addEventListener("input", () => {
      x(p);
    }), p.querySelector("#xb-assistant-tool-mode")?.addEventListener("change", () => {
      x(p);
    }), p.querySelector("#xb-assistant-delegate-reasoning-mode")?.addEventListener("change", () => {
      x(p), j(p, "delegate"), B(p);
    }), p.querySelector("#xb-assistant-delegate-reasoning-effort")?.addEventListener("change", () => {
      x(p);
    }), p.querySelector("#xb-assistant-delegate-reasoning-budget")?.addEventListener("input", () => {
      x(p);
    }), p.querySelector("#xb-assistant-delegate-tool-mode")?.addEventListener("change", () => {
      x(p);
    }), p.querySelector("#xb-assistant-permission-mode")?.addEventListener("change", () => {
      x(p);
    }), p.querySelector("#xb-assistant-jsapi-permission")?.addEventListener("change", () => {
      x(p);
    }), p.querySelector("#xb-assistant-delegate-preset-select")?.addEventListener("change", (c) => {
      const f = X(c.currentTarget?.value, t.configDraft?.currentPresetName || t.config?.currentPresetName || "默认"), w = (t.config?.presets || {})[f] || Je();
      t.configDraft = {
        ...x(p),
        ...V(f, w)
      }, d(), a?.();
    }), p.querySelectorAll("[data-config-page]").forEach((c) => {
      c.addEventListener("click", (f) => {
        x(p), t.configPage = fn(f.currentTarget?.dataset?.configPage), ce(p), re(p);
      });
    }), p.querySelector("#xb-assistant-pull-models")?.addEventListener("click", async () => {
      x(p), d();
      const c = D();
      h(c.provider, {
        status: "loading",
        message: "正在拉取模型列表…"
      }), a?.();
      try {
        const f = await l(c);
        A(c.provider, f), h(c.provider, {
          status: "success",
          message: `已拉取 ${f.length} 个模型`
        });
      } catch (f) {
        A(c.provider, []), h(c.provider, {
          status: "error",
          message: u(f)
        });
      }
      d(), a?.();
    }), p.querySelector("#xb-assistant-delegate-pull-models")?.addEventListener("click", async () => {
      x(p), d();
      const c = D({ role: "delegate" });
      h(c.provider, {
        status: "loading",
        message: "正在拉取模型列表…"
      }, "delegate"), a?.();
      try {
        const f = await l(c);
        A(c.provider, f, "delegate"), h(c.provider, {
          status: "success",
          message: `已拉取 ${f.length} 个模型`
        }, "delegate");
      } catch (f) {
        A(c.provider, [], "delegate"), h(c.provider, {
          status: "error",
          message: u(f)
        }, "delegate");
      }
      d(), a?.();
    }), p.querySelector("#xb-assistant-new-preset")?.addEventListener("click", () => {
      et(p);
    }), p.querySelector("#xb-assistant-rename-preset")?.addEventListener("click", () => {
      zt(p);
    }), p.querySelector("#xb-assistant-save")?.addEventListener("click", () => {
      We(p);
    }), p.querySelector("#xb-assistant-delegate-save")?.addEventListener("click", () => {
      We(p, {
        requestPrefix: "save-delegate-config",
        configureDelegate: !0
      });
    }), p.querySelector("#xb-assistant-delete-preset")?.addEventListener("click", () => {
      ft(p);
    }));
  }
  return {
    getActiveProviderConfig: D,
    getActiveProviderConfigFromForm(p, c = {}) {
      return t.configDraft = M(p), D(c);
    },
    syncConfigToForm: re,
    bindSettingsPanelEvents: Wt
  };
}
function Na(e = "") {
  return String(e || "").replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#39;");
}
function Pa(e) {
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
function xc(e = {}) {
  const t = String(e?.status || "idle");
  return t === "saving" ? "saving" : t === "success" ? "success" : t === "error" ? "error" : "save";
}
function Sc(e = {}) {
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
function _c(e = {}) {
  const { configSave: t = {}, runtimeText: a = "", inlineToastText: n = "", showInlineToast: s = !0, showAssistantPermissions: r = !0, showDelegateSettings: o = !0, showTavilySettings: l = !0, activePage: u = "main", delegatePresetHint: v = "DelegateRun 分身会使用这里的独立 API 配置；可以和主助手使用不同 Provider、Base URL、模型和 Tool 调用格式。", isBusy: d = !1, canDeletePreset: m = !0, configLoadError: S = "", configExternalChangePending: h = !1 } = e, A = String(S || "").trim(), L = Sc(t), X = xc(t), V = d || A || String(t?.status || "") === "saving" ? "disabled" : "", W = d || !m ? "disabled" : "", G = u === "delegate" ? "delegate" : "main", E = G === "main", C = G === "delegate", M = r ? `
            <label>
                <span>斜杠命令权限</span>
                <select id="xb-assistant-permission-mode"></select>
            </label>
            <label>
                <span>JavaScript API 权限</span>
                <select id="xb-assistant-jsapi-permission"></select>
            </label>` : "", x = o ? `
            <div class="xb-assistant-config-tabs" role="tablist" aria-label="API 配置分页">
                <button id="xb-assistant-config-tab-main" type="button" class="xb-assistant-config-tab ${E ? "is-active" : ""}" data-config-page="main" role="tab" aria-selected="${E ? "true" : "false"}">主助手 API</button>
                <button id="xb-assistant-config-tab-delegate" type="button" class="xb-assistant-config-tab ${C ? "is-active" : ""}" data-config-page="delegate" role="tab" aria-selected="${C ? "true" : "false"}">分身 API</button>
            </div>` : "", _ = o ? `
            <div class="xb-assistant-config-page" data-config-page-panel="delegate" ${C ? "" : "hidden"}>
                <p class="xb-assistant-config-note">${Na(v)}</p>
                <div class="xb-assistant-preset-row">
                    <select id="xb-assistant-delegate-preset-select" class="xb-assistant-preset-field" aria-label="已存预设"></select>
                    <div class="xb-assistant-preset-tools is-single" aria-label="分身 API 预设操作">
                        <button id="xb-assistant-delegate-save" type="button" class="xb-assistant-icon-button ${L.className}" title="${L.title}" aria-label="${L.title}" ${V}>${Pa(X)}</button>
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
                <span data-xb-agent-config-load-error-message>${Na(A)}</span>
                <button type="button" data-xb-agent-config-retry>重新读取</button>
            </div>
            <div class="xb-assistant-config-alert is-conflict" data-xb-agent-config-conflict ${A || !h ? "hidden" : ""}>
                <span>共享配置已在其他页面更新。当前未保存编辑仍保留；重新载入会放弃这些编辑。</span>
                <button type="button" data-xb-agent-config-reload>重新载入</button>
            </div>
            <fieldset class="xb-assistant-config-fields" data-xb-agent-config-fields ${A ? "disabled" : ""}>
            ${x}
            <div class="xb-assistant-config-page" data-config-page-panel="main" ${E ? "" : "hidden"}>
            <div class="xb-assistant-preset-row">
                <select id="xb-assistant-preset-select" class="xb-assistant-preset-field" aria-label="已存预设"></select>
                <input id="xb-assistant-preset-name" type="hidden" />
                <div class="xb-assistant-preset-tools" aria-label="API 预设操作">
                    <button id="xb-assistant-new-preset" type="button" class="xb-assistant-icon-button" title="新增预设" aria-label="新增预设" ${d ? "disabled" : ""}>${Pa("add")}</button>
                    <button id="xb-assistant-rename-preset" type="button" class="xb-assistant-icon-button" title="重命名预设" aria-label="重命名预设" ${d ? "disabled" : ""}>${Pa("rename")}</button>
                    <button id="xb-assistant-save" type="button" class="xb-assistant-icon-button ${L.className}" title="${L.title}" aria-label="${L.title}" ${V}>${Pa(X)}</button>
                    <button id="xb-assistant-delete-preset" type="button" class="xb-assistant-icon-button" title="删除预设" aria-label="删除预设" ${W}>${Pa("delete")}</button>
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
            ${l ? `<label>
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
            <div class="xb-assistant-runtime" id="xb-assistant-runtime">${Na(a)}</div>
            </fieldset>
            ${s ? `<div class="xb-assistant-toast xb-assistant-toast-inline" id="xb-assistant-toast" aria-live="polite">${Na(n)}</div>` : ""}
        </section>
    `;
}
var $c = { class: "agent-api-app" }, Cc = { class: "agent-api-scroll" }, Ac = { "aria-live": "polite" }, Mc = ["disabled"], Tc = {
  key: 0,
  class: "agent-api-state",
  "aria-live": "polite"
}, Ec = {
  key: 1,
  class: "agent-api-state is-error",
  role: "alert"
}, Ic = {
  class: "agent-api-panel",
  "aria-label": "共享 Agent API 配置"
}, ji = 13e4, Pc = /* @__PURE__ */ oe({
  __name: "AgentApiApp",
  props: {
    bridge: {},
    initialState: {}
  },
  setup(e) {
    const t = e, a = structuredClone(/* @__PURE__ */ se(t.initialState)), n = /* @__PURE__ */ Y(a), s = /* @__PURE__ */ Y(null), r = /* @__PURE__ */ Y("idle"), o = /* @__PURE__ */ Y("尚未测试。打开页面和保存配置都不会自动连接供应商。");
    let l = () => {
    }, u = null, v = 0;
    const d = /* @__PURE__ */ Ot({
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
    }), m = z(() => n.value.status === "ready" && d.config !== null), S = z(() => Object.keys(d.config?.presets || {}).length), h = z(() => r.value === "testing");
    function A(x) {
      const _ = x instanceof Error ? x.message : String(x || "unknown_error");
      return _ === "host_request_timeout" ? "请求等待超时，请检查网络后重试。" : _ === "app_inactive" ? "页面已经关闭。" : _;
    }
    function L() {
      u && clearTimeout(u), u = setTimeout(() => {
        d.configSave = {
          status: "idle",
          requestId: "",
          error: ""
        }, d.inlineToastText = "", E();
      }, 1800);
    }
    async function X(x) {
      const _ = x.payload || {};
      d.configSave = {
        status: "saving",
        requestId: "",
        error: ""
      }, d.inlineToastText = "正在保存共享配置…", E();
      try {
        const $ = (await t.bridge.request("agent-api/save", { patch: _ }, 35e3)).result;
        if ($.ok !== !0 || !$.config)
          throw $.conflict && (d.configExternalChangePending = !0), new Error($.error || "共享 Agent API 配置保存失败");
        d.config = Tn($.config), d.configDraft = null, d.configDirty = !1, d.configExternalChangePending = !1, d.configFormSyncPending = !0, d.configSave = {
          status: "success",
          requestId: "",
          error: ""
        }, d.inlineToastText = "已保存；小白酒馆、画图、Ebook 与 OS 将读取同一份配置。";
      } catch ($) {
        const F = A($);
        d.configSave = {
          status: "error",
          requestId: "",
          error: F
        }, d.inlineToastText = F;
      }
      E(), L();
    }
    async function V(x = !1) {
      const _ = ++v;
      try {
        const $ = await t.bridge.request("agent-api/reload", {}, 35e3);
        if (_ !== v) return;
        if (x && d.configDirty) {
          d.configExternalChangePending = !0, E();
          return;
        }
        C($.result);
      } catch ($) {
        if (_ !== v) return;
        n.value = {
          status: "error",
          config: null,
          message: A($)
        }, E();
      }
    }
    async function W(x) {
      return (await t.bridge.request("agent-api/pull-models", { providerConfig: x }, ji)).result.models;
    }
    const G = wc({
      state: d,
      render: E,
      saveConfig: X,
      reloadConfig: V,
      pullModels: W,
      describeError: A
    });
    function E() {
      const x = s.value;
      !x || !d.config || (x.innerHTML = _c({
        configSave: d.configSave,
        inlineToastText: d.inlineToastText,
        showAssistantPermissions: !1,
        showDelegateSettings: !1,
        showTavilySettings: !1,
        canDeletePreset: S.value > 1,
        configLoadError: n.value.status === "error" ? n.value.message : "",
        configExternalChangePending: d.configExternalChangePending
      }), G.syncConfigToForm(x), G.bindSettingsPanelEvents(x));
    }
    function C(x) {
      n.value = structuredClone(x), x.status === "ready" && x.config && (d.config = Tn(x.config), d.configDraft = null, d.configDirty = !1, d.configExternalChangePending = !1, d.configFormSyncPending = !0), an(E);
    }
    async function M() {
      const x = s.value;
      if (!x || !m.value || h.value) return;
      const _ = G.getActiveProviderConfigFromForm(x);
      r.value = "testing", o.value = "正在测试当前表单中的连接…";
      try {
        const $ = (await t.bridge.request("agent-api/test-connection", { providerConfig: structuredClone(/* @__PURE__ */ se(_)) }, ji)).result;
        r.value = "success", o.value = `${$.provider || "Provider"} · ${$.model || "当前模型"} · ${$.latencyMs} ms`;
      } catch ($) {
        r.value = "error", o.value = A($);
      }
    }
    return ct(() => {
      l = t.bridge.subscribe((x) => {
        if (x.type === "agent-api/state") {
          C(x.payload.state);
          return;
        }
        x.type === "agent-api/config-changed" && (d.configDirty ? (d.configExternalChangePending = !0, E()) : V(!0));
      }), C(a);
    }), lt(() => {
      v += 1, l(), u && clearTimeout(u);
    }), (x, _) => (g(), b("main", $c, [_[5] || (_[5] = i("header", { class: "agent-api-header" }, [i("div", null, [
      i("span", null, "System service"),
      i("h1", null, "Agent API"),
      i("p", null, "一份配置，供小白酒馆、画图、Ebook 与 OS 共同使用。")
    ]), i("i", { "aria-hidden": "true" }, [i("b"), ge(" API")])], -1)), i("div", Cc, [
      i("section", {
        class: ne(["agent-api-connection", `is-${r.value}`]),
        "aria-labelledby": "agent-api-connection-title"
      }, [i("div", null, [
        _[1] || (_[1] = i("small", null, "CONNECTION CHECK", -1)),
        _[2] || (_[2] = i("h2", { id: "agent-api-connection-title" }, "当前连接", -1)),
        i("p", Ac, y(o.value), 1)
      ]), i("button", {
        type: "button",
        disabled: !m.value || h.value,
        onClick: M
      }, y(h.value ? "测试中…" : "测试当前连接"), 9, Mc)], 2),
      n.value.status === "loading" ? (g(), b("section", Tc, [..._[3] || (_[3] = [i("i", { "aria-hidden": "true" }, null, -1), i("div", null, [i("strong", null, "正在读取共享配置"), i("span", null, "页面打开不会连接模型供应商。")], -1)])])) : n.value.status === "error" ? (g(), b("section", Ec, [i("div", null, [_[4] || (_[4] = i("strong", null, "配置暂时无法读取", -1)), i("span", null, y(n.value.message), 1)]), i("button", {
        type: "button",
        onClick: _[0] || (_[0] = ($) => V())
      }, "重新读取")])) : q("", !0),
      Te(i("section", Ic, [i("div", {
        ref_key: "panelRoot",
        ref: s
      }, null, 512)], 512), [[Nu, m.value]])
    ])]));
  }
}), Oc = Pc, Lc = Object.freeze({
  id: "bank",
  name: "银行",
  accent: "#b89a58"
}), Rc = ["aria-labelledby"], Nc = ["id"], Dc = { class: "bank-dialog-subject" }, Bc = { key: 0 }, qc = { key: 1 }, Uc = {
  key: 0,
  class: "bank-dialog-field"
}, Fc = { id: "bank-amount-help" }, jc = {
  key: 1,
  class: "bank-dialog-validation"
}, Hc = {
  key: 2,
  class: "bank-dialog-summary"
}, Kc = {
  key: 3,
  class: "bank-dialog-warning"
}, Gc = {
  key: 4,
  class: "bank-dialog-warning is-loss"
}, Vc = {
  key: 5,
  class: "bank-dialog-error",
  role: "alert"
}, zc = { class: "bank-dialog-actions" }, Wc = ["disabled"], Yc = ["disabled"], Xc = /* @__PURE__ */ oe({
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
    const a = e, n = t, s = /* @__PURE__ */ Y(a.product ? String(a.product.minAmount) : ""), r = z(() => a.mode === "deposit-open" ? "开立定期存单" : a.mode === "fund-open" ? "申购浮动理财" : "确认提前支取"), o = z(() => /^\d+$/.test(s.value.trim()) ? Number(s.value) : 0), l = z(() => a.mode === "withdraw" ? "" : !a.product || !Number.isSafeInteger(o.value) || o.value <= 0 ? "请输入正整数金额" : o.value < a.product.minAmount || o.value > a.product.maxAmount ? `金额须在 ${a.product.minAmount} 至 ${a.product.maxAmount} 之间` : o.value > a.balance ? "可用余额不足" : ""), u = z(() => a.mode === "deposit-open" ? a.product : null), v = z(() => u.value ? Math.floor(o.value * (1e4 + u.value.interestBps) / 1e4) : 0), d = z(() => !a.busy && (a.mode === "withdraw" || !l.value));
    function m() {
      if (d.value) {
        if (a.mode === "withdraw") {
          n("confirm");
          return;
        }
        n("confirm", o.value);
      }
    }
    return (S, h) => (g(), b("dialog", {
      open: "",
      class: "bank-dialog",
      "aria-labelledby": `bank-dialog-${e.mode}`,
      onClick: h[2] || (h[2] = it((A) => !e.busy && S.$emit("cancel"), ["self"])),
      onKeydown: h[3] || (h[3] = dl(it((A) => !e.busy && S.$emit("cancel"), ["stop", "prevent"]), ["esc"]))
    }, [i("form", {
      method: "dialog",
      class: "bank-dialog-card",
      onSubmit: it(m, ["prevent"])
    }, [
      h[9] || (h[9] = i("span", { class: "bank-dialog-kicker" }, "VAULT AUTHORIZATION", -1)),
      i("h2", { id: `bank-dialog-${e.mode}` }, y(r.value), 9, Nc),
      i("div", Dc, [i("span", null, y(e.mode === "withdraw" ? "取" : e.mode === "deposit-open" ? "定" : "理"), 1), i("div", null, [i("strong", null, y(e.position?.name || e.product?.name), 1), e.product ? (g(), b("small", Bc, y(e.product.lockLabel), 1)) : (g(), b("small", qc, "当前本金 ¤ " + y(e.position?.principal.toLocaleString("zh-CN")), 1))])]),
      e.mode !== "withdraw" ? (g(), b("label", Uc, [
        h[5] || (h[5] = i("span", null, "开户金额", -1)),
        i("div", null, [h[4] || (h[4] = i("i", null, "¤", -1)), Te(i("input", {
          "onUpdate:modelValue": h[0] || (h[0] = (A) => s.value = A),
          type: "text",
          inputmode: "numeric",
          autocomplete: "off",
          "aria-describedby": "bank-amount-help"
        }, null, 512), [[Ze, s.value]])]),
        i("small", Fc, "可用 " + y(e.balance.toLocaleString("zh-CN")) + " · 范围 " + y(e.product?.minAmount) + " - " + y(e.product?.maxAmount), 1)
      ])) : q("", !0),
      l.value ? (g(), b("p", jc, y(l.value), 1)) : q("", !0),
      e.mode === "deposit-open" && u.value && !l.value ? (g(), b("dl", Hc, [i("div", null, [h[6] || (h[6] = i("dt", null, "锁定期限", -1)), i("dd", null, y(u.value.lockLabel), 1)]), i("div", null, [h[7] || (h[7] = i("dt", null, "到期兑付", -1)), i("dd", null, "¤ " + y(v.value.toLocaleString("zh-CN")), 1)])])) : q("", !0),
      e.mode === "fund-open" ? (g(), b("p", Kc, " 实际收益将在开户时封存，锁定期间不可退出，到期后才会揭晓并可领取。 ")) : q("", !0),
      e.mode === "withdraw" && e.position ? (g(), b("p", Gc, [
        h[8] || (h[8] = ge(" 将立即收回 ", -1)),
        i("strong", null, y(e.position.earlyWithdrawalAmount.toLocaleString("zh-CN")) + " 小白币", 1),
        ge("，相较本金损失 " + y((e.position.principal - e.position.earlyWithdrawalAmount).toLocaleString("zh-CN")) + " 小白币。此操作不可撤销。 ", 1)
      ])) : q("", !0),
      e.error ? (g(), b("p", Vc, y(e.error), 1)) : q("", !0),
      i("div", zc, [i("button", {
        type: "button",
        disabled: e.busy,
        onClick: h[1] || (h[1] = (A) => S.$emit("cancel"))
      }, "取消", 8, Wc), i("button", {
        type: "submit",
        class: "is-primary",
        disabled: !d.value
      }, y(e.busy ? "正在封存…" : e.mode === "withdraw" ? `确认收回 ${e.position?.earlyWithdrawalAmount || 0}` : "确认开户"), 9, Yc)])
    ], 32)], 40, Rc));
  }
}), Jc = Xc, Qc = { "aria-labelledby": "bank-deposits-title" }, Zc = { class: "bank-product-grid" }, ef = { class: "bank-product-index" }, tf = { class: "bank-rate-block" }, af = { class: "bank-product-terms" }, nf = [
  "disabled",
  "title",
  "onClick"
], sf = /* @__PURE__ */ oe({
  __name: "BankDeposits",
  props: {
    products: {},
    balance: {},
    writeDisabledReason: {}
  },
  emits: ["open"],
  setup(e) {
    return (t, a) => (g(), b("section", Qc, [
      a[6] || (a[6] = i("header", { class: "bank-section-heading" }, [i("div", null, [i("span", null, "FIXED CERTIFICATES"), i("h2", { id: "bank-deposits-title" }, "定期存单")]), i("small", null, "到期收益确定")], -1)),
      a[7] || (a[7] = i("p", { class: "bank-section-intro" }, "本金锁定至约定回合。到期前可提前支取，最终到账额会在确认时明确列出。", -1)),
      i("div", Zc, [(g(!0), b(te, null, me(e.products, (n, s) => (g(), b("article", {
        key: n.id,
        class: "bank-product-card bank-deposit-card"
      }, [
        i("header", null, [
          i("span", ef, "0" + y(s + 1), 1),
          i("div", null, [i("small", null, y(n.lockLabel), 1), i("h3", null, y(n.name), 1)]),
          a[0] || (a[0] = i("span", { class: "bank-product-seal" }, "定", -1))
        ]),
        i("div", tf, [
          a[1] || (a[1] = i("span", null, "到期收益率", -1)),
          i("strong", null, y(n.interestLabel), 1),
          a[2] || (a[2] = i("small", null, "固定收益", -1))
        ]),
        i("dl", af, [i("div", null, [a[3] || (a[3] = i("dt", null, "开户范围", -1)), i("dd", null, y(n.amountLabel), 1)]), i("div", null, [a[4] || (a[4] = i("dt", null, "提前支取", -1)), i("dd", null, y(n.earlyPenaltyLabel), 1)])]),
        i("button", {
          type: "button",
          disabled: !!e.writeDisabledReason || e.balance < n.minAmount,
          title: e.writeDisabledReason || (e.balance < n.minAmount ? "可用余额不足最低开户额" : ""),
          onClick: (r) => t.$emit("open", n)
        }, [...a[5] || (a[5] = [ge(" 开立存单", -1), i("span", null, "›", -1)])], 8, nf)
      ]))), 128))])
    ]));
  }
}), rf = sf, lf = { "aria-labelledby": "bank-funds-title" }, of = { class: "bank-product-grid" }, uf = { class: "bank-product-index" }, df = { class: "bank-rate-block" }, cf = { class: "bank-product-terms" }, ff = [
  "disabled",
  "title",
  "onClick"
], vf = /* @__PURE__ */ oe({
  __name: "BankFunds",
  props: {
    products: {},
    balance: {},
    writeDisabledReason: {}
  },
  emits: ["open"],
  setup(e) {
    return (t, a) => (g(), b("section", lf, [
      a[4] || (a[4] = i("header", { class: "bank-section-heading" }, [i("div", null, [i("span", null, "MANAGED FUNDS"), i("h2", { id: "bank-funds-title" }, "浮动理财")]), i("small", null, "到期前不揭晓结果")], -1)),
      a[5] || (a[5] = i("p", { class: "bank-section-intro" }, "收益在开户时封存，到期后才会公开。理财锁定期间不可提前退出。", -1)),
      i("div", of, [(g(!0), b(te, null, me(e.products, (n, s) => (g(), b("article", {
        key: n.id,
        class: "bank-product-card bank-fund-card"
      }, [
        i("header", null, [
          i("span", uf, "F" + y(s + 1), 1),
          i("div", null, [i("small", null, y(n.lockLabel), 1), i("h3", null, y(n.name), 1)]),
          i("span", { class: ne(["bank-risk-badge", `is-${n.riskLevel}`]) }, y(n.riskLabel), 3)
        ]),
        i("p", null, y(n.description), 1),
        i("div", df, [
          a[0] || (a[0] = i("span", null, "合同收益区间", -1)),
          i("strong", null, y(n.returnLabel), 1),
          a[1] || (a[1] = i("small", null, "实际结果到期可见", -1))
        ]),
        i("dl", cf, [i("div", null, [a[2] || (a[2] = i("dt", null, "开户范围", -1)), i("dd", null, y(n.amountLabel), 1)])]),
        i("button", {
          type: "button",
          disabled: !!e.writeDisabledReason || e.balance < n.minAmount,
          title: e.writeDisabledReason || (e.balance < n.minAmount ? "可用余额不足最低开户额" : ""),
          onClick: (r) => t.$emit("open", n)
        }, [...a[3] || (a[3] = [ge(" 申购理财", -1), i("span", null, "›", -1)])], 8, ff)
      ]))), 128))])
    ]));
  }
}), pf = vf, gf = { "aria-labelledby": "bank-positions-title" }, mf = { class: "bank-section-heading" }, bf = ["disabled"], hf = {
  key: 0,
  class: "bank-empty-state"
}, yf = {
  key: 1,
  class: "bank-position-group"
}, kf = { class: "bank-position-top" }, wf = { key: 0 }, xf = { class: "is-loss" }, Sf = [
  "disabled",
  "title",
  "onClick"
], _f = {
  key: 1,
  class: "bank-due-note"
}, $f = {
  key: 2,
  class: "bank-position-group"
}, Cf = { class: "bank-position-top" }, Af = {
  key: 0,
  class: "bank-fund-result"
}, Mf = {
  key: 1,
  class: "bank-sealed-copy"
}, Tf = /* @__PURE__ */ oe({
  __name: "BankPositions",
  props: {
    deposits: {},
    investments: {},
    claimableCount: {},
    writeDisabledReason: {}
  },
  emits: ["withdraw", "settle"],
  setup(e) {
    return (t, a) => (g(), b("section", gf, [
      i("header", mf, [a[1] || (a[1] = i("div", null, [i("span", null, "SEALED POSITIONS"), i("h2", { id: "bank-positions-title" }, "我的头寸")], -1)), e.claimableCount ? (g(), b("button", {
        key: 0,
        type: "button",
        class: "bank-small-claim",
        disabled: !!e.writeDisabledReason,
        onClick: a[0] || (a[0] = (n) => t.$emit("settle"))
      }, " 领取全部 " + y(e.claimableCount) + " 笔 ", 9, bf)) : q("", !0)]),
      !e.deposits.length && !e.investments.length ? (g(), b("div", hf, [...a[2] || (a[2] = [
        i("span", null, "◇", -1),
        i("strong", null, "金库尚无头寸", -1),
        i("p", null, "从定期或理财页面选择一份产品开始配置资产。", -1)
      ])])) : q("", !0),
      e.deposits.length ? (g(), b("div", yf, [i("header", null, [a[3] || (a[3] = i("h3", null, "定期存单", -1)), i("span", null, y(e.deposits.length), 1)]), (g(!0), b(te, null, me(e.deposits, (n) => (g(), b("article", {
        key: n.id,
        class: "bank-position-card"
      }, [
        i("div", kf, [
          a[4] || (a[4] = i("span", { class: "bank-position-mark" }, "定", -1)),
          i("div", null, [i("h4", null, y(n.name), 1), i("small", null, "本金 ¤ " + y(n.principal.toLocaleString("zh-CN")), 1)]),
          i("span", { class: ne(["bank-position-status", { "is-due": n.claimable }]) }, y(n.statusLabel), 3)
        ]),
        i("dl", null, [i("div", null, [a[5] || (a[5] = i("dt", null, "到期兑付", -1)), i("dd", null, "¤ " + y(n.maturityAmount.toLocaleString("zh-CN")), 1)]), n.claimable ? q("", !0) : (g(), b("div", wf, [a[6] || (a[6] = i("dt", null, "现在支取", -1)), i("dd", xf, "¤ " + y(n.earlyWithdrawalAmount.toLocaleString("zh-CN")), 1)]))]),
        n.claimable ? (g(), b("span", _f, "将在“领取全部”时统一兑付")) : (g(), b("button", {
          key: 0,
          type: "button",
          class: "bank-withdraw-button",
          disabled: !!e.writeDisabledReason,
          title: e.writeDisabledReason,
          onClick: (s) => t.$emit("withdraw", n)
        }, " 提前支取 ", 8, Sf))
      ]))), 128))])) : q("", !0),
      e.investments.length ? (g(), b("div", $f, [i("header", null, [a[7] || (a[7] = i("h3", null, "浮动理财", -1)), i("span", null, y(e.investments.length), 1)]), (g(!0), b(te, null, me(e.investments, (n) => (g(), b("article", {
        key: n.id,
        class: "bank-position-card"
      }, [i("div", Cf, [
        a[8] || (a[8] = i("span", { class: "bank-position-mark" }, "理", -1)),
        i("div", null, [i("h4", null, y(n.name), 1), i("small", null, y(n.riskLabel) + " · 本金 ¤ " + y(n.principal.toLocaleString("zh-CN")), 1)]),
        i("span", { class: ne(["bank-position-status", { "is-due": n.claimable }]) }, y(n.statusLabel), 3)
      ]), n.claimable ? (g(), b("div", Af, [
        a[9] || (a[9] = i("span", null, "封存结果已揭晓", -1)),
        i("strong", { class: ne({ "is-negative": n.resolvedReturnBps < 0 }) }, y(n.returnLabel), 3),
        i("small", null, "可兑付 ¤ " + y(n.settlementAmount.toLocaleString("zh-CN")), 1)
      ])) : (g(), b("p", Mf, "收益结果仍在金库中封存，到期前不会公开。"))]))), 128))])) : q("", !0)
    ]));
  }
}), Ef = Tf, If = { "aria-labelledby": "bank-records-title" }, Pf = { class: "bank-section-heading" }, Of = {
  key: 0,
  class: "bank-empty-state"
}, Lf = {
  key: 1,
  class: "bank-record-list"
}, Rf = { class: "bank-record-mark" }, Nf = { class: "bank-record-main" }, Df = {
  key: 0,
  class: "bank-inline-error",
  role: "alert"
}, Bf = ["disabled"], qf = {
  key: 2,
  class: "bank-record-end"
}, Uf = /* @__PURE__ */ oe({
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
    return (a, n) => (g(), b("section", If, [i("header", Pf, [n[1] || (n[1] = i("div", null, [i("span", null, "SETTLEMENT ARCHIVE"), i("h2", { id: "bank-records-title" }, "金融记录")], -1)), i("small", null, y(e.total) + " 笔", 1)]), e.activities.length ? (g(), b("div", Lf, [
      (g(!0), b(te, null, me(e.activities, (s) => (g(), b("article", {
        key: s.id,
        class: "bank-record-row"
      }, [
        i("span", Rf, y(s.kind === "deposit" ? "定" : "理"), 1),
        i("div", Nf, [
          i("header", null, [i("strong", null, y(s.productName), 1), i("span", null, y(s.resultLabel), 1)]),
          i("dl", null, [i("div", null, [n[3] || (n[3] = i("dt", null, "投入", -1)), i("dd", null, "¤ " + y(s.amountIn.toLocaleString("zh-CN")), 1)]), i("div", null, [n[4] || (n[4] = i("dt", null, "兑付", -1)), i("dd", null, "¤ " + y(s.payout.toLocaleString("zh-CN")), 1)])]),
          i("small", null, y(s.turnLabel) + " · " + y(pe(t).format(s.createdAt)), 1)
        ]),
        i("strong", { class: ne(["bank-record-net", {
          "is-negative": s.net < 0,
          "is-flat": s.net === 0
        }]) }, [ge(y(s.net > 0 ? "+" : "") + y(s.net) + " ", 1), i("small", null, y(s.netLabel), 1)], 2)
      ]))), 128)),
      e.error ? (g(), b("p", Df, y(e.error), 1)) : q("", !0),
      e.hasMore ? (g(), b("button", {
        key: 1,
        type: "button",
        class: "bank-load-more",
        disabled: e.loadingMore,
        onClick: n[0] || (n[0] = (s) => a.$emit("loadMore"))
      }, y(e.loadingMore ? "正在开启下一册…" : "载入更多记录"), 9, Bf)) : (g(), b("p", qf, "金库档案已全部展开"))
    ])) : (g(), b("div", Of, [...n[2] || (n[2] = [
      i("span", null, "簿", -1),
      i("strong", null, "尚无兑付记录", -1),
      i("p", null, "头寸到期领取或提前支取后，结果会归档在这里。", -1)
    ])]))]));
  }
}), Ff = Uf, jf = {
  class: "bank-vault",
  "aria-labelledby": "bank-vault-title"
}, Hf = { class: "bank-section-heading bank-vault-heading" }, Kf = { class: "bank-balance-panel" }, Gf = { class: "bank-vault-metrics" }, Vf = ["disabled", "title"], zf = { class: "bank-vault-portals" }, Wf = /* @__PURE__ */ oe({
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
    return (t, a) => (g(), b("section", jf, [
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
      i("header", Hf, [a[4] || (a[4] = i("div", null, [i("span", null, "PRIVATE RESERVE"), i("h2", { id: "bank-vault-title" }, "金库总览")], -1)), i("small", null, "第 " + y(e.currentTurn) + " 回合", 1)]),
      i("div", Kf, [
        a[6] || (a[6] = i("span", null, "可用资产", -1)),
        i("strong", null, [a[5] || (a[5] = i("small", null, "¤", -1)), ge(y(e.balance.toLocaleString("zh-CN")), 1)]),
        a[7] || (a[7] = i("div", null, [i("span", null, "小白币活期余额"), i("i", null, "AVAILABLE")], -1))
      ]),
      i("div", Gf, [i("article", null, [
        a[8] || (a[8] = i("span", null, "锁定本金", -1)),
        i("strong", null, "¤ " + y(e.lockedAmount.toLocaleString("zh-CN")), 1),
        i("small", null, y(e.depositCount + e.fundCount) + " 笔持仓", 1)
      ]), i("article", { class: ne({ "is-claimable": e.claimableCount > 0 }) }, [
        a[9] || (a[9] = i("span", null, "待领取", -1)),
        i("strong", null, y(e.claimableCount), 1),
        i("small", null, y(e.claimableCount ? "已到期，可统一兑付" : "暂无到期头寸"), 1)
      ], 2)]),
      e.claimableCount ? (g(), b("button", {
        key: 0,
        type: "button",
        class: "bank-claim-button",
        disabled: !!e.writeDisabledReason,
        title: e.writeDisabledReason,
        onClick: a[0] || (a[0] = (n) => t.$emit("settle"))
      }, [a[10] || (a[10] = i("span", null, "领取全部到期资产", -1)), i("small", null, y(e.claimableCount) + " 笔一并结算", 1)], 8, Vf)) : q("", !0),
      i("div", zf, [
        i("button", {
          type: "button",
          onClick: a[1] || (a[1] = (n) => t.$emit("navigate", "deposits"))
        }, [
          a[11] || (a[11] = i("span", { class: "bank-portal-mark" }, "定", -1)),
          a[12] || (a[12] = i("strong", null, "定期存单", -1)),
          i("small", null, y(e.depositCount) + " 笔持有", 1),
          a[13] || (a[13] = i("i", null, "›", -1))
        ]),
        i("button", {
          type: "button",
          onClick: a[2] || (a[2] = (n) => t.$emit("navigate", "funds"))
        }, [
          a[14] || (a[14] = i("span", { class: "bank-portal-mark" }, "理", -1)),
          a[15] || (a[15] = i("strong", null, "浮动理财", -1)),
          i("small", null, y(e.fundCount) + " 笔持有", 1),
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
}), Yf = Wf, Xf = { class: "bank-app" }, Jf = { class: "bank-header" }, Qf = { class: "bank-header-balance" }, Zf = ["disabled"], ev = {
  class: "bank-navigation",
  "aria-label": "银行页面"
}, tv = { key: 0 }, av = ["disabled"], nv = ["disabled"], sv = { class: "bank-scroll" }, Oa = 35e3, iv = /* @__PURE__ */ oe({
  __name: "BankApp",
  props: {
    bridge: {},
    initialState: {}
  },
  setup(e) {
    const t = e, a = /* @__PURE__ */ Y(structuredClone(/* @__PURE__ */ se(t.initialState))), n = /* @__PURE__ */ Y("vault"), s = /* @__PURE__ */ Y(null), r = /* @__PURE__ */ Y(!1), o = /* @__PURE__ */ Y(!1), l = /* @__PURE__ */ Y(!1), u = /* @__PURE__ */ Y(""), v = /* @__PURE__ */ Y(""), d = /* @__PURE__ */ Y("");
    let m = null, S = () => {
    }, h = 0;
    const A = z(() => a.value.status === "unconfirmed"), L = z(() => o.value ? "正在处理上一项银行操作" : r.value ? "正在刷新金库状态" : a.value.status !== "ready" ? a.value.message || "金库暂时不可写入" : a.value.generationActive ? "主剧情正在生成，请等待回复完成" : ""), X = z(() => r.value || o.value || A.value);
    function V() {
      return typeof globalThis.crypto?.randomUUID == "function" ? `bank-ui:${globalThis.crypto.randomUUID()}` : `bank-ui:${Date.now()}:${Math.random().toString(36).slice(2, 10)}`;
    }
    function W() {
      return { chatIdentity: a.value.chatIdentity };
    }
    function G(J) {
      a.value = structuredClone(J), r.value = !1, l.value = !1, u.value = "", d.value = "", J.claimableCount === 0 && (m = null);
    }
    function E(J) {
      const D = J instanceof Error ? J.message : String(J);
      return D.includes("economy_insufficient_funds") || D.includes("cannot be overdrawn") ? "可用小白币不足，开户未完成。" : D.includes("bank_amount_out_of_range") ? "开户金额不在该产品允许范围内。" : D.includes("bank_amount_invalid") ? "开户金额必须是正整数。" : D.includes("bank_revision_conflict") || D.includes("bank_event_id_conflict") ? "金库状态已变化，请关闭确认框并刷新后重试。" : D.includes("bank_position_missing") || D.includes("bank_position_state_changed") ? "该头寸状态已经变化，请刷新金库。" : D.includes("bank_no_due_positions") ? "当前没有可领取的到期头寸。" : D === "host_request_timeout" ? "等待保存结果超时，请保留当前页面并重试。" : "银行操作未完成，请稍后重试。";
    }
    async function C() {
      if (X.value) return;
      const J = ++h;
      r.value = !0, u.value = "";
      try {
        const D = await t.bridge.request("bank/refresh", W(), Oa);
        J === h && G(D.result);
      } catch (D) {
        J === h && (u.value = E(D));
      } finally {
        J === h && (r.value = !1);
      }
    }
    async function M() {
      if (r.value || o.value) return;
      const J = ++h;
      r.value = !0, u.value = "";
      try {
        const D = await t.bridge.request("bank/confirm-save", W(), Oa);
        J === h && G(D.result.state);
      } catch (D) {
        J === h && (u.value = E(D));
      } finally {
        J === h && (r.value = !1);
      }
    }
    function x(J, D) {
      L.value || (v.value = "", s.value = {
        mode: D,
        product: J,
        actionId: V()
      });
    }
    function _(J) {
      L.value || (v.value = "", s.value = {
        mode: "withdraw",
        position: J,
        actionId: V()
      });
    }
    function $() {
      o.value || (s.value = null, v.value = "");
    }
    async function F(J) {
      const D = s.value;
      if (!D || o.value) return;
      const ue = h;
      o.value = !0, v.value = "";
      const ke = D.mode === "deposit-open" ? "bank/deposit/open" : D.mode === "fund-open" ? "bank/fund/open" : "bank/deposit/withdraw";
      try {
        const de = await t.bridge.request(ke, {
          ...W(),
          expectedRevision: a.value.revision,
          expectedEventId: a.value.eventId,
          actionId: D.actionId,
          ...D.product ? {
            productId: D.product.id,
            amount: J
          } : {},
          ...D.position ? { positionId: D.position.id } : {}
        }, Oa);
        if (ue !== h || s.value !== D) return;
        G(de.result), s.value = null;
      } catch (de) {
        ue === h && s.value === D && (v.value = E(de));
      } finally {
        ue === h && (o.value = !1);
      }
    }
    async function Z() {
      if (L.value || a.value.claimableCount === 0) return;
      const J = h;
      m ||= V();
      const D = m;
      o.value = !0, u.value = "";
      try {
        const ue = await t.bridge.request("bank/settle-due", {
          ...W(),
          expectedRevision: a.value.revision,
          expectedEventId: a.value.eventId,
          actionId: D
        }, Oa);
        if (J !== h) return;
        m = null, G(ue.result);
      } catch (ue) {
        J === h && (u.value = E(ue));
      } finally {
        J === h && (o.value = !1);
      }
    }
    async function K() {
      if (!a.value.activityPage.hasMore || l.value || o.value) return;
      const J = h, D = a.value.activities.length;
      l.value = !0, d.value = "";
      try {
        const ue = await t.bridge.request("bank/records/load-more", {
          ...W(),
          offset: D
        }, Oa);
        if (J !== h) return;
        const ke = new Set(a.value.activities.map((de) => de.id));
        a.value.activities.push(...ue.result.activities.filter((de) => !ke.has(de.id))), a.value.activityPage = ue.result.activityPage;
      } catch (ue) {
        J === h && (d.value = E(ue));
      } finally {
        J === h && (l.value = !1);
      }
    }
    return ct(() => {
      S = t.bridge.subscribe((J) => {
        J.type === "bank/state" && (o.value || (h += 1), G(J.payload.state)), J.type === "bank/error" && (u.value = E(J.payload?.message || ""));
      });
    }), lt(() => {
      h += 1, S(), s.value = null, m = null;
    }), (J, D) => (g(), b("main", Xf, [
      i("header", Jf, [
        D[10] || (D[10] = i("div", null, [i("span", { class: "bank-header-kicker" }, "JADE RESERVE · 01"), i("h1", null, "白银金库")], -1)),
        i("div", Qf, [D[8] || (D[8] = i("small", null, "可用余额", -1)), i("strong", null, "¤ " + y(a.value.balance.toLocaleString("zh-CN")), 1)]),
        i("button", {
          type: "button",
          class: "bank-refresh",
          disabled: X.value,
          title: "重新读取金库",
          onClick: C
        }, [...D[9] || (D[9] = [i("svg", {
          viewBox: "0 0 24 24",
          "aria-hidden": "true"
        }, [i("path", { d: "M20 7v5h-5M4 17v-5h5M18.2 9A7 7 0 0 0 6.1 6.7L4 9m16 6-2.1 2.3A7 7 0 0 1 5.8 15" })], -1), i("span", { class: "bank-sr-only" }, "重新读取金库", -1)])], 8, Zf)
      ]),
      i("nav", ev, [
        i("button", {
          type: "button",
          class: ne({ "is-active": n.value === "vault" }),
          onClick: D[0] || (D[0] = (ue) => n.value = "vault")
        }, [...D[11] || (D[11] = [i("span", null, "总览", -1)])], 2),
        i("button", {
          type: "button",
          class: ne({ "is-active": n.value === "deposits" }),
          onClick: D[1] || (D[1] = (ue) => n.value = "deposits")
        }, [...D[12] || (D[12] = [i("span", null, "定期", -1)])], 2),
        i("button", {
          type: "button",
          class: ne({ "is-active": n.value === "funds" }),
          onClick: D[2] || (D[2] = (ue) => n.value = "funds")
        }, [...D[13] || (D[13] = [i("span", null, "理财", -1)])], 2),
        i("button", {
          type: "button",
          class: ne({ "is-active": n.value === "positions" }),
          onClick: D[3] || (D[3] = (ue) => n.value = "positions")
        }, [D[14] || (D[14] = i("span", null, "头寸", -1)), a.value.claimableCount ? (g(), b("i", tv, y(a.value.claimableCount), 1)) : q("", !0)], 2),
        i("button", {
          type: "button",
          class: ne({ "is-active": n.value === "records" }),
          onClick: D[4] || (D[4] = (ue) => n.value = "records")
        }, [...D[15] || (D[15] = [i("span", null, "记录", -1)])], 2)
      ]),
      a.value.message || u.value ? (g(), b("aside", {
        key: 0,
        class: ne(["bank-notice", `is-${a.value.status}`]),
        role: "status"
      }, [D[16] || (D[16] = i("span", { "aria-hidden": "true" }, "鉴", -1)), i("div", null, [
        i("strong", null, y(u.value && a.value.status === "ready" ? "操作未完成" : a.value.statusLabel), 1),
        i("p", null, y(u.value || a.value.message), 1),
        A.value ? (g(), b("button", {
          key: 0,
          type: "button",
          disabled: r.value,
          onClick: M
        }, y(r.value ? "正在核实…" : "核实保存结果"), 9, av)) : a.value.status === "blocked" || a.value.status === "conflict" ? (g(), b("button", {
          key: 1,
          type: "button",
          disabled: r.value,
          onClick: C
        }, y(r.value ? "正在读取…" : "重新读取金库"), 9, nv)) : q("", !0)
      ])], 2)) : q("", !0),
      i("div", sv, [n.value === "vault" ? (g(), he(Yf, {
        key: 0,
        balance: a.value.balance,
        "locked-amount": a.value.lockedAmount,
        "current-turn": a.value.currentTurn,
        "deposit-count": a.value.deposits.length,
        "fund-count": a.value.investments.length,
        "claimable-count": a.value.claimableCount,
        "write-disabled-reason": L.value,
        onNavigate: D[5] || (D[5] = (ue) => n.value = ue),
        onSettle: Z
      }, null, 8, [
        "balance",
        "locked-amount",
        "current-turn",
        "deposit-count",
        "fund-count",
        "claimable-count",
        "write-disabled-reason"
      ])) : n.value === "deposits" ? (g(), he(rf, {
        key: 1,
        products: a.value.products.deposits,
        balance: a.value.balance,
        "write-disabled-reason": L.value,
        onOpen: D[6] || (D[6] = (ue) => x(ue, "deposit-open"))
      }, null, 8, [
        "products",
        "balance",
        "write-disabled-reason"
      ])) : n.value === "funds" ? (g(), he(pf, {
        key: 2,
        products: a.value.products.funds,
        balance: a.value.balance,
        "write-disabled-reason": L.value,
        onOpen: D[7] || (D[7] = (ue) => x(ue, "fund-open"))
      }, null, 8, [
        "products",
        "balance",
        "write-disabled-reason"
      ])) : n.value === "positions" ? (g(), he(Ef, {
        key: 3,
        deposits: a.value.deposits,
        investments: a.value.investments,
        "claimable-count": a.value.claimableCount,
        "write-disabled-reason": L.value,
        onWithdraw: _,
        onSettle: Z
      }, null, 8, [
        "deposits",
        "investments",
        "claimable-count",
        "write-disabled-reason"
      ])) : (g(), he(Ff, {
        key: 4,
        activities: a.value.activities,
        total: a.value.activityPage.total,
        "has-more": a.value.activityPage.hasMore,
        "loading-more": l.value,
        error: d.value,
        onLoadMore: K
      }, null, 8, [
        "activities",
        "total",
        "has-more",
        "loading-more",
        "error"
      ]))]),
      s.value ? (g(), he(Jc, {
        key: 1,
        mode: s.value.mode,
        product: s.value.product,
        position: s.value.position,
        balance: a.value.balance,
        busy: o.value,
        error: v.value,
        onCancel: $,
        onConfirm: F
      }, null, 8, [
        "mode",
        "product",
        "position",
        "balance",
        "busy",
        "error"
      ])) : q("", !0)
    ]));
  }
}), rv = iv, lv = Object.freeze({
  id: "game",
  name: "游戏",
  accent: "#c8a35a"
}), ov = { class: "game-dialog-card" }, uv = {
  key: 0,
  class: "game-inline-error",
  role: "status"
}, dv = { class: "game-dialog-actions" }, cv = ["disabled"], fv = ["disabled"], vv = /* @__PURE__ */ oe({
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
      onCancel: a[2] || (a[2] = it((n) => t.$emit("cancel"), ["prevent"]))
    }, [i("section", ov, [
      a[3] || (a[3] = i("span", { class: "game-eyebrow" }, "FINAL CALL", -1)),
      i("h2", null, y(e.heading), 1),
      i("p", null, y(e.summary), 1),
      e.error ? (g(), b("p", uv, y(e.error), 1)) : q("", !0),
      i("div", dv, [i("button", {
        type: "button",
        disabled: e.busy,
        onClick: a[0] || (a[0] = (n) => t.$emit("cancel"))
      }, "再想想", 8, cv), i("button", {
        type: "button",
        class: ne(["is-primary", { "is-danger": e.danger }]),
        disabled: e.busy,
        onClick: a[1] || (a[1] = (n) => t.$emit("confirm"))
      }, y(e.busy ? "正在落账…" : e.confirmLabel), 11, fv)])
    ])], 32));
  }
}), pv = vv, gv = {
  class: "game-table game-dice-table",
  "aria-labelledby": "game-dice-title"
}, mv = { class: "game-table-heading" }, bv = { class: "game-dice-cloth" }, hv = { class: "game-dealer-position" }, yv = {
  key: 0,
  class: "game-current-bid"
}, kv = {
  key: 1,
  class: "game-current-bid is-empty"
}, wv = { class: "game-player-hand" }, xv = { class: "game-dice-row" }, Sv = { class: "game-dice-controls" }, _v = {
  key: 0,
  class: "game-bid-picker"
}, $v = ["disabled"], Cv = ["value"], Av = ["disabled", "title"], Mv = ["disabled", "title"], Tv = {
  key: 0,
  class: "game-bid-history",
  "aria-label": "公开叫牌记录"
}, Ev = /* @__PURE__ */ oe({
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
    const a = e, n = t;
    function s(v) {
      return `${v.count}:${v.face}`;
    }
    const r = /* @__PURE__ */ Y(s(a.game.legalBids[0] || {
      count: 1,
      face: 2
    })), o = z(() => a.game.legalBids.find((v) => s(v) === r.value) || null), l = z(() => a.game.bids.at(-1) || null);
    jt(() => a.game.legalBids.map(s).join("|"), () => {
      !o.value && a.game.legalBids[0] && (r.value = s(a.game.legalBids[0]));
    });
    function u() {
      o.value && !a.writeDisabledReason && n("bid", {
        count: o.value.count,
        face: o.value.face
      });
    }
    return (v, d) => (g(), b("section", gv, [
      i("header", mv, [
        i("button", {
          type: "button",
          class: "game-back",
          onClick: d[0] || (d[0] = (m) => n("lobby"))
        }, "返回大厅"),
        d[3] || (d[3] = i("div", null, [i("span", null, "LIAR'S DICE"), i("h2", { id: "game-dice-title" }, "秘骰对决")], -1)),
        i("strong", null, "托管 ¤ " + y(e.game.bet), 1)
      ]),
      i("div", bv, [
        i("div", hv, [d[4] || (d[4] = i("span", {
          class: "game-dealer-chip",
          "aria-hidden": "true"
        }, "庄", -1)), i("p", null, y(l.value?.by === "dealer" ? "庄家已经加叫，轮到你决断。" : "庄家静候你的第一口价。"), 1)]),
        l.value ? (g(), b("div", yv, [
          d[5] || (d[5] = i("small", null, "桌面叫数", -1)),
          i("strong", null, y(l.value.count), 1),
          i("span", null, "枚 " + y(l.value.face) + " 点", 1),
          i("em", null, y(l.value.by === "dealer" ? "庄家" : "你") + "叫牌", 1)
        ])) : (g(), b("div", kv, [...d[6] || (d[6] = [i("span", null, "等待首轮叫牌", -1)])])),
        i("div", wv, [
          d[7] || (d[7] = i("span", null, "你的骰子", -1)),
          i("div", xv, [(g(!0), b(te, null, me(e.game.playerDice, (m, S) => (g(), b("b", {
            key: S,
            class: "game-die"
          }, y(m), 1))), 128))]),
          d[8] || (d[8] = i("small", null, "一点可代替任意叫面", -1))
        ])
      ]),
      i("div", Sv, [
        e.game.legalActions.includes("bid") ? (g(), b("label", _v, [d[9] || (d[9] = i("span", null, "下一口合法叫数", -1)), Te(i("select", {
          "onUpdate:modelValue": d[1] || (d[1] = (m) => r.value = m),
          disabled: !!e.writeDisabledReason
        }, [(g(!0), b(te, null, me(e.game.legalBids, (m) => (g(), b("option", {
          key: s(m),
          value: s(m)
        }, y(m.count) + " 枚 " + y(m.face) + " 点 ", 9, Cv))), 128))], 8, $v), [[ol, r.value]])])) : q("", !0),
        e.game.legalActions.includes("bid") ? (g(), b("button", {
          key: 1,
          type: "button",
          class: "game-primary-action",
          disabled: !!e.writeDisabledReason || !o.value,
          title: e.writeDisabledReason,
          onClick: u
        }, " 加叫 ", 8, Av)) : q("", !0),
        e.game.legalActions.includes("challenge") ? (g(), b("button", {
          key: 2,
          type: "button",
          class: "game-danger-action",
          disabled: !!e.writeDisabledReason,
          title: e.writeDisabledReason,
          onClick: d[2] || (d[2] = (m) => n("challenge"))
        }, " 质疑 ", 8, Mv)) : q("", !0)
      ]),
      e.game.bids.length ? (g(), b("ol", Tv, [(g(!0), b(te, null, me(e.game.bids, (m, S) => (g(), b("li", { key: `${S}:${m.count}:${m.face}` }, [i("span", null, y(m.by === "player" ? "你" : "庄家"), 1), i("strong", null, y(m.count) + " × " + y(m.face) + " 点", 1)]))), 128))])) : q("", !0)
    ]));
  }
}), Iv = Ev, Pv = {
  class: "game-table game-ladder-table",
  "aria-labelledby": "game-ladder-title"
}, Ov = { class: "game-table-heading" }, Lv = { class: "game-ladder-stage" }, Rv = {
  class: "game-ladder-track",
  "aria-label": "五层挑战进度"
}, Nv = { key: 0 }, Dv = { key: 1 }, Bv = { class: "game-ladder-purse" }, qv = {
  key: 0,
  class: "game-ladder-choices"
}, Uv = [
  "disabled",
  "title",
  "onClick"
], Fv = ["disabled", "title"], jv = /* @__PURE__ */ oe({
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
    const a = t, n = Object.freeze({
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
    function s(r) {
      return `${r / 100}%`;
    }
    return (r, o) => (g(), b("section", Pv, [
      i("header", Ov, [
        i("button", {
          type: "button",
          class: "game-back",
          onClick: o[0] || (o[0] = (l) => a("lobby"))
        }, "返回大厅"),
        o[2] || (o[2] = i("div", null, [i("span", null, "THE GILDED ASCENT"), i("h2", { id: "game-ladder-title" }, "鎏金阶梯")], -1)),
        i("strong", null, "托管 ¤ " + y(e.game.bet), 1)
      ]),
      i("div", Lv, [i("div", Rv, [(g(), b(te, null, me(5, (l) => i("div", {
        key: l,
        class: ne(["game-ladder-floor", {
          "is-complete": l <= e.game.completedFloors,
          "is-next": l === e.game.completedFloors + 1
        }])
      }, [i("span", null, y(l), 1), e.game.steps[l - 1] ? (g(), b("small", Nv, "¤ " + y(e.game.steps[l - 1]?.amountAfterSuccess), 1)) : (g(), b("small", Dv, "第 " + y(l) + " 层", 1))], 2)), 64))]), i("div", Bv, [
        i("span", null, y(e.game.canCashOut ? "当前可收手" : "风险起点"), 1),
        i("strong", null, "¤ " + y(e.game.cashoutAmount), 1),
        i("small", null, "已完成 " + y(e.game.completedFloors) + " / 5 层", 1)
      ])]),
      e.game.legalActions.includes("step") ? (g(), b("div", qv, [(g(!0), b(te, null, me(e.game.nextChoices, (l) => (g(), b("button", {
        key: l.choice,
        type: "button",
        class: ne(`is-${l.choice}`),
        disabled: !!e.writeDisabledReason,
        title: e.writeDisabledReason,
        onClick: (u) => a("step", l.choice)
      }, [
        i("span", null, y(pe(n)[l.choice].name), 1),
        i("small", null, y(pe(n)[l.choice].note), 1),
        i("strong", null, y(s(l.successProbabilityBps)), 1),
        i("em", null, "成功得 ¤ " + y(l.successAmount), 1)
      ], 10, Uv))), 128))])) : q("", !0),
      e.game.legalActions.includes("cash-out") ? (g(), b("button", {
        key: 1,
        type: "button",
        class: "game-ladder-cashout",
        disabled: !!e.writeDisabledReason,
        title: e.writeDisabledReason,
        onClick: o[1] || (o[1] = (l) => a("cashOut"))
      }, " 收手并领取 ¤ " + y(e.game.cashoutAmount), 9, Fv)) : q("", !0)
    ]));
  }
}), Hv = jv, Kv = {
  class: "game-lobby",
  "aria-labelledby": "game-lobby-title"
}, Gv = {
  key: 0,
  class: "game-continue-card"
}, Vv = {
  key: 1,
  class: "game-grid"
}, zv = { class: "game-card is-dice" }, Wv = { class: "game-bet-field" }, Yv = ["disabled", "title"], Xv = {
  key: 0,
  class: "game-card-reason"
}, Jv = { class: "game-card is-push" }, Qv = ["disabled", "title"], Zv = {
  key: 0,
  class: "game-card-reason"
}, ep = { class: "game-card is-ladder" }, tp = { class: "game-bet-field" }, ap = ["disabled", "title"], np = {
  key: 0,
  class: "game-card-reason"
}, sp = /* @__PURE__ */ oe({
  __name: "GameLobby",
  props: {
    activeGame: {},
    balance: {},
    lockedAmount: {},
    writeDisabledReason: {}
  },
  emits: ["start", "continue"],
  setup(e, { emit: t }) {
    const a = e, n = t, s = /* @__PURE__ */ Y(50), r = /* @__PURE__ */ Y(30), o = z(() => a.activeGame?.kind === "dice" ? "秘骰对决" : a.activeGame?.kind === "push" ? "翻倍或收手" : a.activeGame?.kind === "ladder" ? "鎏金阶梯" : "");
    function l() {
      return a.writeDisabledReason ? a.writeDisabledReason : !Number.isSafeInteger(s.value) || s.value < 50 || s.value > 500 || s.value % 10 !== 0 ? "下注须为 50 至 500，且为 10 的倍数" : a.balance < s.value ? "余额不足" : "";
    }
    function u() {
      return a.writeDisabledReason ? a.writeDisabledReason : a.balance < 50 ? "余额不足" : "";
    }
    function v() {
      return a.writeDisabledReason ? a.writeDisabledReason : !Number.isSafeInteger(r.value) || r.value < 30 || r.value > 800 || r.value % 10 !== 0 ? "下注须为 30 至 800，且为 10 的倍数" : a.balance < r.value ? "余额不足" : "";
    }
    return (d, m) => (g(), b("section", Kv, [m[17] || (m[17] = i("div", { class: "game-lobby-hero" }, [
      i("span", { class: "game-eyebrow" }, "THE GILDED PARLOUR"),
      i("h2", { id: "game-lobby-title" }, "今夜，押注你的判断"),
      i("p", null, "三张独立牌桌，只认明确选择。每一步都会先落账，再揭晓。")
    ], -1)), e.activeGame ? (g(), b("article", Gv, [
      m[7] || (m[7] = i("div", {
        class: "game-continue-seal",
        "aria-hidden": "true"
      }, "续", -1)),
      i("div", null, [
        m[6] || (m[6] = i("span", null, "牌桌仍在等候", -1)),
        i("h3", null, y(o.value), 1),
        i("p", null, "已有 ¤ " + y(e.lockedAmount) + " 托管在本局，离开页面不会结束赌局。", 1)
      ]),
      i("button", {
        type: "button",
        onClick: m[0] || (m[0] = (S) => n("continue", e.activeGame.kind))
      }, "继续本局")
    ])) : (g(), b("div", Vv, [
      i("article", zv, [
        m[9] || (m[9] = i("div", {
          class: "game-glyph",
          "aria-hidden": "true"
        }, [i("span", null, "⚄"), i("span", null, "⚂")], -1)),
        m[10] || (m[10] = i("div", { class: "game-copy" }, [
          i("span", { class: "game-card-index" }, "TABLE 01"),
          i("h3", null, "秘骰对决"),
          i("p", null, "五骰藏锋，一点为百搭。抬高叫数，或当场质疑庄家。"),
          i("ul", null, [i("li", null, "下注 50–500"), i("li", null, "胜出返还 1.9 倍")])
        ], -1)),
        i("label", Wv, [m[8] || (m[8] = i("span", null, "下注", -1)), Te(i("input", {
          "onUpdate:modelValue": m[1] || (m[1] = (S) => s.value = S),
          type: "number",
          min: "50",
          max: "500",
          step: "10"
        }, null, 512), [[
          Ze,
          s.value,
          void 0,
          { number: !0 }
        ]])]),
        i("button", {
          type: "button",
          class: "game-table-button",
          disabled: !!l(),
          title: l(),
          onClick: m[2] || (m[2] = (S) => n("start", "dice", s.value))
        }, " 入席 ", 8, Yv),
        l() ? (g(), b("small", Xv, y(l()), 1)) : q("", !0)
      ]),
      i("article", Jv, [
        m[11] || (m[11] = i("div", {
          class: "game-glyph is-coin",
          "aria-hidden": "true"
        }, "¤", -1)),
        m[12] || (m[12] = i("div", { class: "game-copy" }, [
          i("span", { class: "game-card-index" }, "TABLE 02"),
          i("h3", null, "翻倍或收手"),
          i("p", null, "十张暗牌藏着七枚金币与三枚炸弹。每次翻牌都更接近答案。"),
          i("ul", null, [i("li", null, "固定下注 50"), i("li", null, "每枚金币价值 50")])
        ], -1)),
        m[13] || (m[13] = i("div", { class: "game-fixed-bet" }, [i("span", null, "入场"), i("strong", null, "¤ 50")], -1)),
        i("button", {
          type: "button",
          class: "game-table-button",
          disabled: !!u(),
          title: u(),
          onClick: m[3] || (m[3] = (S) => n("start", "push", 50))
        }, " 揭牌 ", 8, Qv),
        u() ? (g(), b("small", Zv, y(u()), 1)) : q("", !0)
      ]),
      i("article", ep, [
        m[15] || (m[15] = i("div", {
          class: "game-glyph is-ladder-mark",
          "aria-hidden": "true"
        }, "Ⅴ", -1)),
        m[16] || (m[16] = i("div", { class: "game-copy" }, [
          i("span", { class: "game-card-index" }, "TABLE 03"),
          i("h3", null, "鎏金阶梯"),
          i("p", null, "五层风险逐级累积。每层选择稳、中、险，成功后可随时收手。"),
          i("ul", null, [i("li", null, "下注 30–800"), i("li", null, "最高返还 50,000")])
        ], -1)),
        i("label", tp, [m[14] || (m[14] = i("span", null, "下注", -1)), Te(i("input", {
          "onUpdate:modelValue": m[4] || (m[4] = (S) => r.value = S),
          type: "number",
          min: "30",
          max: "800",
          step: "10"
        }, null, 512), [[
          Ze,
          r.value,
          void 0,
          { number: !0 }
        ]])]),
        i("button", {
          type: "button",
          class: "game-table-button",
          disabled: !!v(),
          title: v(),
          onClick: m[5] || (m[5] = (S) => n("start", "ladder", r.value))
        }, " 登阶 ", 8, ap),
        v() ? (g(), b("small", np, y(v()), 1)) : q("", !0)
      ])
    ]))]));
  }
}), ip = sp, rp = {
  class: "game-table game-push-table",
  "aria-labelledby": "game-push-title"
}, lp = { class: "game-table-heading" }, op = { class: "game-push-stage" }, up = {
  class: "game-coin-stack",
  "aria-label": "已翻出的金币"
}, dp = {
  key: 0,
  class: "game-empty-stack"
}, cp = {
  class: "game-card-fan",
  "aria-hidden": "true"
}, fp = { class: "game-push-metrics" }, vp = { class: "game-actions" }, pp = ["disabled", "title"], gp = ["disabled", "title"], mp = /* @__PURE__ */ oe({
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
    const a = t;
    function n(s) {
      return `${(s / 100).toFixed(s % 100 === 0 ? 0 : 2)}%`;
    }
    return (s, r) => (g(), b("section", rp, [
      i("header", lp, [
        i("button", {
          type: "button",
          class: "game-back",
          onClick: r[0] || (r[0] = (o) => a("lobby"))
        }, "返回大厅"),
        r[3] || (r[3] = i("div", null, [i("span", null, "DOUBLE OR HOLD"), i("h2", { id: "game-push-title" }, "翻倍或收手")], -1)),
        i("strong", null, "托管 ¤ " + y(e.game.bet), 1)
      ]),
      i("div", op, [i("div", up, [e.game.revealedCoins === 0 ? (g(), b("span", dp, "尚未揭牌")) : q("", !0), (g(!0), b(te, null, me(e.game.revealedCoins, (o) => (g(), b("b", {
        key: o,
        class: "game-revealed-coin"
      }, "¤"))), 128))]), i("div", cp, [(g(!0), b(te, null, me(e.game.remainingCards, (o) => (g(), b("i", {
        key: o,
        style: Vt({ "--card": o })
      }, null, 4))), 128))])]),
      i("div", fp, [
        i("div", null, [r[4] || (r[4] = i("span", null, "可收手", -1)), i("strong", null, "¤ " + y(e.game.cashoutAmount), 1)]),
        i("div", null, [r[5] || (r[5] = i("span", null, "余牌", -1)), i("strong", null, y(e.game.remainingCards), 1)]),
        i("div", null, [r[6] || (r[6] = i("span", null, "余雷", -1)), i("strong", null, y(e.game.remainingBombs), 1)]),
        i("div", null, [r[7] || (r[7] = i("span", null, "下一张风险", -1)), i("strong", null, y(n(e.game.nextBombProbabilityBps)), 1)])
      ]),
      r[8] || (r[8] = i("p", { class: "game-rule-note" }, "每枚金币增加 ¤ 50；翻到炸弹立即以零返还结束。", -1)),
      i("div", vp, [e.game.legalActions.includes("draw") ? (g(), b("button", {
        key: 0,
        type: "button",
        class: "game-primary-action",
        disabled: !!e.writeDisabledReason,
        title: e.writeDisabledReason,
        onClick: r[1] || (r[1] = (o) => a("draw"))
      }, " 再翻一张 ", 8, pp)) : q("", !0), e.game.legalActions.includes("cash-out") ? (g(), b("button", {
        key: 1,
        type: "button",
        class: "game-secondary-action",
        disabled: !!e.writeDisabledReason,
        title: e.writeDisabledReason,
        onClick: r[2] || (r[2] = (o) => a("cashOut"))
      }, " 收手入账 ", 8, gp)) : q("", !0)])
    ]));
  }
}), bp = mp, hp = {
  class: "game-records",
  "aria-labelledby": "game-records-title"
}, yp = { class: "game-section-heading" }, kp = {
  key: 0,
  class: "game-record-list"
}, wp = {
  class: "game-record-mark",
  "aria-hidden": "true"
}, xp = { class: "game-record-main" }, Sp = ["datetime"], _p = { class: "game-record-money" }, $p = {
  key: 0,
  class: "game-record-detail"
}, Cp = {
  key: 1,
  class: "game-record-detail"
}, Ap = {
  key: 2,
  class: "game-record-steps"
}, Mp = {
  key: 1,
  class: "game-record-empty"
}, Tp = {
  key: 2,
  class: "game-inline-error",
  role: "status"
}, Ep = ["disabled"], Ip = /* @__PURE__ */ oe({
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
    return (n, s) => (g(), b("section", hp, [
      i("header", yp, [s[1] || (s[1] = i("div", null, [i("span", null, "HOUSE LEDGER"), i("h2", { id: "game-records-title" }, "牌桌记录")], -1)), i("small", null, y(e.total) + " 局", 1)]),
      e.records.length ? (g(), b("div", kp, [(g(!0), b(te, null, me(e.records, (r) => (g(), b("article", {
        key: r.id,
        class: ne(["game-record", `is-${r.outcomeTone}`])
      }, [i("div", wp, y(r.game === "dice" ? "骰" : r.game === "push" ? "翻" : "阶"), 1), i("div", xp, [
        i("header", null, [i("div", null, [i("span", null, y(r.gameLabel), 1), i("strong", null, y(r.outcomeLabel), 1)]), i("time", { datetime: new Date(r.createdAt).toISOString() }, y(a(r.createdAt)), 9, Sp)]),
        i("div", _p, [
          i("span", null, "下注 ¤ " + y(r.amountIn), 1),
          i("span", null, "返还 ¤ " + y(r.payout), 1),
          i("strong", null, y(r.net > 0 ? "+" : "") + y(r.net), 1)
        ]),
        i("details", null, [s[2] || (s[2] = i("summary", null, "查看公开牌局", -1)), r.detail.kind === "dice" ? (g(), b("div", $p, [
          i("p", null, "终局叫数：" + y(r.detail.finalBid.count) + " 枚 " + y(r.detail.finalBid.face) + " 点", 1),
          i("p", null, "实际匹配：" + y(r.detail.matchingDiceCount) + " 枚 · " + y(r.detail.challenger === "player" ? "玩家" : "庄家") + "质疑", 1),
          i("p", null, "你的骰子：" + y(r.detail.playerDice.join(" · ")), 1)
        ])) : r.detail.kind === "push" ? (g(), b("div", Cp, [i("p", null, "共翻出 " + y(r.detail.revealedCoins) + " 枚金币", 1)])) : (g(), b("ol", Ap, [(g(!0), b(te, null, me(r.detail.steps, (o) => (g(), b("li", { key: o.floor }, " 第 " + y(o.floor) + " 层 · " + y(pe(t)[o.choice]) + " · " + y(o.success ? `成功至 ¤ ${o.amountAfterStep}` : "挑战失败"), 1))), 128))]))])
      ])], 2))), 128))])) : (g(), b("div", Mp, [...s[3] || (s[3] = [i("span", { "aria-hidden": "true" }, "◇", -1), i("p", null, "尚无结算记录", -1)])])),
      e.error ? (g(), b("p", Tp, y(e.error), 1)) : q("", !0),
      e.hasMore ? (g(), b("button", {
        key: 3,
        type: "button",
        class: "game-load-more",
        disabled: e.loadingMore,
        onClick: s[0] || (s[0] = (r) => n.$emit("loadMore"))
      }, y(e.loadingMore ? "正在翻阅…" : "继续翻阅记录"), 9, Ep)) : q("", !0)
    ]));
  }
}), Pp = Ip, Op = { class: "game-app" }, Lp = { class: "game-header" }, Rp = { class: "game-funds" }, Np = ["disabled"], Dp = {
  class: "game-nav",
  "aria-label": "游戏页面"
}, Bp = ["disabled"], qp = ["disabled"], Up = {
  key: 1,
  class: "game-action-error",
  role: "status"
}, Fp = ["disabled"], jp = { class: "game-scroll" }, vn = 35e3, Hp = /* @__PURE__ */ oe({
  __name: "GameApp",
  props: {
    bridge: {},
    initialState: {}
  },
  setup(e) {
    const t = e, a = /* @__PURE__ */ Y(structuredClone(/* @__PURE__ */ se(t.initialState))), n = /* @__PURE__ */ Y(a.value.activeGame?.kind || "lobby"), s = /* @__PURE__ */ Y(!1), r = /* @__PURE__ */ Y(!1), o = /* @__PURE__ */ Y(!1), l = /* @__PURE__ */ Y(""), u = /* @__PURE__ */ Y(""), v = /* @__PURE__ */ Y(""), d = /* @__PURE__ */ Y(null), m = /* @__PURE__ */ Y(null), S = /* @__PURE__ */ Y("");
    let h = () => {
    }, A = 0, L = 0;
    const X = z(() => a.value.status === "unconfirmed"), V = z(() => r.value ? "正在处理上一项操作" : s.value ? "正在刷新游戏状态" : a.value.status !== "ready" ? a.value.message || "游戏暂时不可写入" : a.value.generationActive ? "主剧情正在生成，请等待回复完成" : ""), W = z(() => s.value || r.value || X.value || a.value.status === "conflict"), G = z(() => a.value.records.find((j) => j.id === S.value) || null);
    function E() {
      return typeof globalThis.crypto?.randomUUID == "function" ? `game-ui:${globalThis.crypto.randomUUID()}` : (L += 1, `game-ui:${Date.now()}:${L}`);
    }
    function C() {
      return { chatIdentity: a.value.chatIdentity };
    }
    function M(j) {
      const B = j instanceof Error ? j.message : String(j);
      return B.includes("cannot be overdrawn") || B.includes("economy_insufficient_funds") ? "小白币余额不足，未能入局。" : B.includes("game_revision_conflict") || B.includes("game_event_id_conflict") ? "牌局已经变化，请重新读取后再操作。" : B.includes("game_dice_bid_not_higher") ? "叫数必须高于桌面当前叫数。" : B.includes("game_action_invalid") ? "当前牌局不接受这项操作。" : B.includes("game_main_generation_active") ? "主剧情正在生成，请等待回复完成。" : B.includes("game_push_cashout_invalid") || B.includes("game_ladder_cashout_invalid") ? "当前还不能收手。" : B.includes("聊天已切换") ? "聊天已切换，请重新打开游戏。" : B === "host_request_timeout" ? "等待落账结果超时；可用同一操作标识安全重试。" : "游戏操作未完成，请稍后重试。";
    }
    function x(j) {
      const B = a.value.activeGame;
      a.value = structuredClone(j), s.value = !1, o.value = !1, l.value = "", v.value = "", B && !j.activeGame ? (S.value = j.records.find((re) => re.gameId === B.id)?.id || "", n.value = "lobby") : j.activeGame && n.value !== "records" && n.value !== "lobby" ? n.value = j.activeGame.kind : !j.activeGame && n.value !== "records" && (n.value = "lobby");
    }
    function _(j, B) {
      const re = {
        ...C(),
        expectedRevision: a.value.revision,
        expectedEventId: a.value.eventId,
        actionId: B
      };
      return j.endpoint === "game/dice/start" || j.endpoint === "game/ladder/start" ? {
        ...re,
        bet: j.bet
      } : j.endpoint === "game/push/start" ? re : j.endpoint === "game/dice/bid" ? {
        ...re,
        gameId: j.gameId,
        bid: {
          count: j.bid.count,
          face: j.bid.face
        }
      } : j.endpoint === "game/ladder/step" ? {
        ...re,
        gameId: j.gameId,
        choice: j.choice
      } : {
        ...re,
        gameId: j.gameId
      };
    }
    async function $(j, B = E()) {
      if (V.value) return !1;
      const re = A;
      r.value = !0, u.value = "", m.value = null;
      try {
        const Ae = await t.bridge.request(j.endpoint, _(j, B), vn);
        return re !== A ? !1 : (x(Ae.result), Ae.result.activeGame && (n.value = Ae.result.activeGame.kind), d.value = null, !0);
      } catch (Ae) {
        return re === A && (u.value = M(Ae), a.value.status === "unconfirmed" ? (d.value = null, m.value = null) : m.value = {
          request: j,
          actionId: B
        }), !1;
      } finally {
        re === A && (r.value = !1);
      }
    }
    function F(j, B) {
      if (V.value || a.value.activeGame) return;
      const re = j === "dice" ? {
        heading: "确认入席秘骰对决",
        summary: `托管 ¤ ${B}，胜出返还下注的 1.9 倍。`,
        confirmLabel: "确认入席"
      } : j === "push" ? {
        heading: "确认揭开第一张牌",
        summary: "托管 ¤ 50。金币可以累积，炸弹会立即结束本局。",
        confirmLabel: "确认揭牌"
      } : {
        heading: "确认踏上鎏金阶梯",
        summary: `托管 ¤ ${B}，首层成功后才可收手。`,
        confirmLabel: "确认登阶"
      };
      d.value = {
        request: j === "dice" ? {
          endpoint: "game/dice/start",
          bet: B
        } : j === "push" ? { endpoint: "game/push/start" } : {
          endpoint: "game/ladder/start",
          bet: B
        },
        actionId: E(),
        ...re
      }, u.value = "";
    }
    function Z() {
      const j = a.value.activeGame;
      j?.kind !== "dice" || !j.legalActions.includes("challenge") || (d.value = {
        request: {
          endpoint: "game/dice/challenge",
          gameId: j.id
        },
        actionId: E(),
        heading: "确定质疑庄家？",
        summary: "双方骰子将立即核验，本局随结果结算。",
        confirmLabel: "提出质疑",
        danger: !0
      }, u.value = "");
    }
    function K(j) {
      const B = a.value.activeGame;
      if (!B || B.kind !== j || !B.legalActions.includes("cash-out")) return;
      const re = B.cashoutAmount;
      d.value = {
        request: j === "push" ? {
          endpoint: "game/push/cash-out",
          gameId: B.id
        } : {
          endpoint: "game/ladder/cash-out",
          gameId: B.id
        },
        actionId: E(),
        heading: "现在收手？",
        summary: `本局将结束，并返还 ¤ ${re}。`,
        confirmLabel: "收手入账"
      }, u.value = "";
    }
    async function J() {
      const j = d.value;
      j && await $(j.request, j.actionId);
    }
    function D() {
      r.value || (d.value = null, u.value = "");
    }
    async function ue() {
      if (W.value) return;
      const j = ++A;
      s.value = !0, l.value = "";
      try {
        const B = await t.bridge.request("game/refresh", C(), vn);
        j === A && x(B.result);
      } catch (B) {
        j === A && (l.value = M(B));
      } finally {
        j === A && (s.value = !1);
      }
    }
    async function ke() {
      if (s.value || r.value) return;
      const j = ++A;
      s.value = !0, l.value = "";
      try {
        const B = await t.bridge.request("game/confirm-save", C(), vn);
        j === A && x(B.result.state);
      } catch (B) {
        j === A && (l.value = M(B));
      } finally {
        j === A && (s.value = !1);
      }
    }
    async function de() {
      if (!a.value.hasMore || o.value || r.value) return;
      const j = A;
      o.value = !0, v.value = "";
      try {
        const B = await t.bridge.request("game/records/load-more", {
          ...C(),
          offset: a.value.records.length
        }, vn);
        if (j !== A) return;
        const re = new Set(a.value.records.map((Ae) => Ae.id));
        a.value.records.push(...B.result.records.filter((Ae) => !re.has(Ae.id))), a.value.total = B.result.total, a.value.hasMore = B.result.hasMore;
      } catch (B) {
        j === A && (v.value = M(B));
      } finally {
        j === A && (o.value = !1);
      }
    }
    function ce() {
      const j = m.value;
      j && $(j.request, j.actionId);
    }
    return ct(() => {
      h = t.bridge.subscribe((j) => {
        j.type === "game/state" && (r.value || (A += 1), u.value = "", m.value = null, x(j.payload.state)), j.type === "game/error" && (l.value = "游戏状态暂时无法读取，请重新打开。");
      });
    }), lt(() => {
      A += 1, h(), d.value = null, m.value = null;
    }), (j, B) => (g(), b("main", Op, [
      i("header", Lp, [
        B[16] || (B[16] = i("div", { class: "game-brand" }, [i("span", null, "GAME CENTER"), i("h1", null, "游戏")], -1)),
        i("div", Rp, [i("span", null, [B[13] || (B[13] = i("small", null, "可用", -1)), i("strong", null, "¤ " + y(a.value.balance), 1)]), i("span", null, [B[14] || (B[14] = i("small", null, "托管", -1)), i("strong", null, "¤ " + y(a.value.lockedAmount), 1)])]),
        i("button", {
          type: "button",
          class: "game-refresh",
          disabled: W.value,
          title: "重新读取游戏",
          onClick: ue
        }, [...B[15] || (B[15] = [i("svg", {
          viewBox: "0 0 24 24",
          "aria-hidden": "true"
        }, [i("path", { d: "M20 7v5h-5M4 17v-5h5M18.2 9A7 7 0 0 0 6.1 6.7L4 9m16 6-2.1 2.3A7 7 0 0 1 5.8 15" })], -1), i("span", { class: "game-sr-only" }, "重新读取游戏", -1)])], 8, Np)
      ]),
      i("nav", Dp, [
        i("button", {
          type: "button",
          class: ne({ "is-active": n.value === "lobby" }),
          onClick: B[0] || (B[0] = (re) => n.value = "lobby")
        }, "大厅", 2),
        a.value.activeGame ? (g(), b("button", {
          key: 0,
          type: "button",
          class: ne({ "is-active": n.value === a.value.activeGame.kind }),
          onClick: B[1] || (B[1] = (re) => n.value = a.value.activeGame?.kind || "lobby")
        }, [...B[17] || (B[17] = [ge(" 当前牌桌", -1), i("i", null, null, -1)])], 2)) : q("", !0),
        i("button", {
          type: "button",
          class: ne({ "is-active": n.value === "records" }),
          onClick: B[2] || (B[2] = (re) => n.value = "records")
        }, "记录", 2)
      ]),
      a.value.message || l.value ? (g(), b("aside", {
        key: 0,
        class: ne(["game-notice", `is-${a.value.status}`]),
        role: "status"
      }, [B[18] || (B[18] = i("span", { "aria-hidden": "true" }, "!", -1)), i("div", null, [
        i("strong", null, y(a.value.status === "unconfirmed" ? "落账待核实" : a.value.status === "conflict" ? "牌局状态冲突" : "游戏状态"), 1),
        i("p", null, y(l.value || a.value.message), 1),
        X.value ? (g(), b("button", {
          key: 0,
          type: "button",
          disabled: s.value,
          onClick: ke
        }, y(s.value ? "正在核实…" : "核实保存结果"), 9, Bp)) : a.value.status === "blocked" ? (g(), b("button", {
          key: 1,
          type: "button",
          disabled: s.value,
          onClick: ue
        }, y(s.value ? "正在读取…" : "重新读取"), 9, qp)) : q("", !0)
      ])], 2)) : q("", !0),
      u.value && !d.value ? (g(), b("aside", Up, [i("span", null, y(u.value), 1), m.value && a.value.status === "ready" ? (g(), b("button", {
        key: 0,
        type: "button",
        disabled: r.value,
        onClick: ce
      }, "重试同一操作", 8, Fp)) : q("", !0)])) : q("", !0),
      i("div", jp, [G.value && n.value === "lobby" ? (g(), b("div", {
        key: 0,
        class: ne(["game-result-banner", `is-${G.value.outcomeTone}`]),
        role: "status"
      }, [
        i("span", null, y(G.value.gameLabel), 1),
        i("strong", null, y(G.value.outcomeLabel), 1),
        i("em", null, y(G.value.net > 0 ? "+" : "") + y(G.value.net) + " 小白币", 1),
        i("button", {
          type: "button",
          onClick: B[3] || (B[3] = (re) => S.value = "")
        }, "关闭")
      ], 2)) : q("", !0), n.value === "lobby" ? (g(), he(ip, {
        key: 1,
        "active-game": a.value.activeGame,
        balance: a.value.balance,
        "locked-amount": a.value.lockedAmount,
        "write-disabled-reason": V.value,
        onStart: F,
        onContinue: B[4] || (B[4] = (re) => n.value = re)
      }, null, 8, [
        "active-game",
        "balance",
        "locked-amount",
        "write-disabled-reason"
      ])) : n.value === "dice" && a.value.activeGame?.kind === "dice" ? (g(), he(Iv, {
        key: 2,
        game: a.value.activeGame,
        "write-disabled-reason": V.value,
        onBid: B[5] || (B[5] = (re) => $({
          endpoint: "game/dice/bid",
          gameId: a.value.activeGame?.id || "",
          bid: re
        })),
        onChallenge: Z,
        onLobby: B[6] || (B[6] = (re) => n.value = "lobby")
      }, null, 8, ["game", "write-disabled-reason"])) : n.value === "push" && a.value.activeGame?.kind === "push" ? (g(), he(bp, {
        key: 3,
        game: a.value.activeGame,
        "write-disabled-reason": V.value,
        onDraw: B[7] || (B[7] = (re) => $({
          endpoint: "game/push/draw",
          gameId: a.value.activeGame?.id || ""
        })),
        onCashOut: B[8] || (B[8] = (re) => K("push")),
        onLobby: B[9] || (B[9] = (re) => n.value = "lobby")
      }, null, 8, ["game", "write-disabled-reason"])) : n.value === "ladder" && a.value.activeGame?.kind === "ladder" ? (g(), he(Hv, {
        key: 4,
        game: a.value.activeGame,
        "write-disabled-reason": V.value,
        onStep: B[10] || (B[10] = (re) => $({
          endpoint: "game/ladder/step",
          gameId: a.value.activeGame?.id || "",
          choice: re
        })),
        onCashOut: B[11] || (B[11] = (re) => K("ladder")),
        onLobby: B[12] || (B[12] = (re) => n.value = "lobby")
      }, null, 8, ["game", "write-disabled-reason"])) : n.value === "records" ? (g(), he(Pp, {
        key: 5,
        records: a.value.records,
        total: a.value.total,
        "has-more": a.value.hasMore,
        "loading-more": o.value,
        error: v.value,
        onLoadMore: de
      }, null, 8, [
        "records",
        "total",
        "has-more",
        "loading-more",
        "error"
      ])) : q("", !0)]),
      d.value ? (g(), he(pv, {
        key: 2,
        heading: d.value.heading,
        summary: d.value.summary,
        "confirm-label": d.value.confirmLabel,
        busy: r.value,
        error: u.value,
        danger: d.value.danger,
        onCancel: D,
        onConfirm: J
      }, null, 8, [
        "heading",
        "summary",
        "confirm-label",
        "busy",
        "error",
        "danger"
      ])) : q("", !0)
    ]));
  }
}), Kp = Hp, Gp = Object.freeze({
  id: "map",
  name: "地图",
  accent: "#3aa9ff"
}), Vp = { class: "map-viewport" }, zp = ["viewBox", "aria-label"], Wp = {
  class: "map-viewport-controls",
  "aria-label": "地图缩放控制"
}, Yp = /* @__PURE__ */ oe({
  __name: "MapViewport",
  props: {
    viewBox: {},
    resetKey: { default: "" },
    label: {}
  },
  setup(e) {
    const t = e, a = /* @__PURE__ */ Y(null), n = /* @__PURE__ */ Y([...t.viewBox]);
    let s = null, r = [0, 0], o = [0, 0], l = null, u = !1, v = !1, d = null;
    const m = z(() => n.value.join(" "));
    function S() {
      const [C, M, x, _] = t.viewBox;
      n.value = [
        C,
        M,
        Math.max(1, x),
        Math.max(1, _)
      ];
    }
    function h() {
      const C = a.value?.getBoundingClientRect();
      return !C?.width || !C.height ? 1 : Math.max(n.value[2] / C.width, n.value[3] / C.height);
    }
    function A(C, M) {
      const x = a.value?.getBoundingClientRect();
      if (!x?.width || !x.height) return [n.value[0] + n.value[2] / 2, n.value[1] + n.value[3] / 2];
      const _ = h(), $ = n.value[2] / _, F = n.value[3] / _, Z = (x.width - $) / 2, K = (x.height - F) / 2;
      return [n.value[0] + (C - x.left - Z) * _, n.value[1] + (M - x.top - K) * _];
    }
    function L(C, M) {
      const x = Math.max(1, t.viewBox[2]), _ = Math.min(x * 5, Math.max(x * 0.24, n.value[2] * C)), $ = _ / n.value[2], F = n.value[3] * $, Z = M || [n.value[0] + n.value[2] / 2, n.value[1] + n.value[3] / 2], K = (Z[0] - n.value[0]) / n.value[2], J = (Z[1] - n.value[1]) / n.value[3];
      n.value = [
        Z[0] - _ * K,
        Z[1] - F * J,
        _,
        F
      ];
    }
    function X(C) {
      L(C.deltaY < 0 ? 0.84 : 1.19, A(C.clientX, C.clientY));
    }
    function V(C) {
      C.button !== 0 || s !== null || (s = C.pointerId, r = [C.clientX, C.clientY], o = [n.value[0], n.value[1]], u = !1, l = C.target instanceof Element ? C.target : a.value, l?.setPointerCapture(C.pointerId));
    }
    function W(C) {
      if (C.pointerId !== s) return;
      const M = C.clientX - r[0], x = C.clientY - r[1];
      Math.abs(M) + Math.abs(x) > 4 && (u = !0);
      const _ = h();
      n.value = [
        o[0] - M * _,
        o[1] - x * _,
        n.value[2],
        n.value[3]
      ];
    }
    function G(C) {
      C.pointerId === s && (l?.hasPointerCapture(C.pointerId) && l.releasePointerCapture(C.pointerId), l = null, s = null, u && (v = !0, d && clearTimeout(d), d = setTimeout(() => {
        v = !1;
      }, 0)));
    }
    function E(C) {
      v && (C.preventDefault(), C.stopPropagation());
    }
    return jt(() => [
      t.viewBox[0],
      t.viewBox[1],
      t.viewBox[2],
      t.viewBox[3],
      t.resetKey
    ], S, { immediate: !0 }), lt(() => {
      d && clearTimeout(d);
    }), (C, M) => (g(), b("div", Vp, [(g(), b("svg", {
      ref_key: "svg",
      ref: a,
      class: "map-viewport-svg",
      viewBox: m.value,
      preserveAspectRatio: "xMidYMid meet",
      role: "img",
      "aria-label": e.label,
      onWheel: it(X, ["prevent"]),
      onPointerdown: V,
      onPointermove: W,
      onPointerup: G,
      onPointercancel: G,
      onClickCapture: E
    }, [_n(C.$slots, "default")], 40, zp)), i("div", Wp, [
      i("button", {
        type: "button",
        title: "放大",
        "aria-label": "放大",
        onClick: M[0] || (M[0] = (x) => L(0.8))
      }, "+"),
      i("button", {
        type: "button",
        title: "缩小",
        "aria-label": "缩小",
        onClick: M[1] || (M[1] = (x) => L(1.25))
      }, "-"),
      i("button", {
        type: "button",
        class: "map-viewport-reset",
        onClick: S
      }, "复位")
    ])]));
  }
}), _l = Yp, Xp = Object.freeze({
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
}), ua = Object.freeze({
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
}), Jp = Object.freeze({
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
}), Qp = Object.freeze({
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
}), Zp = Object.freeze({
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
}), eg = Object.freeze({
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
}), ks = Object.freeze({
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
}), $l = Object.freeze({
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
}), Cl = Object.freeze({
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
}), tg = Object.freeze({
  city: "location_city",
  district: "apartment",
  building: "home_work",
  floor: "stairs",
  room: "meeting_room",
  outdoor: "park"
}), Hi = Object.freeze({
  city: "城市",
  district: "区域",
  building: "建筑",
  floor: "楼层",
  room: "房间",
  outdoor: "户外"
}), ag = Object.freeze({
  door: "门",
  stairs: "楼梯",
  elevator: "电梯",
  path: "小径",
  road: "道路",
  portal: "传送门",
  passage: "通道"
}), ng = /* @__PURE__ */ new Set([
  "water",
  "terrain",
  "furniture",
  "decoration",
  "danger",
  "magic",
  "secret",
  "light"
]);
function Ht(e, t) {
  return e < t ? -1 : e > t ? 1 : 0;
}
function $e(e) {
  return Number(e.toFixed(3)).toString();
}
function Al(e) {
  const t = e.geometry;
  return Array.isArray(t.points) ? t.points : [];
}
function Ml(e) {
  return e.shape === "rect" || e.shape === "circle" ? !0 : Al(e).length >= 3 && (e.closed === !0 || ng.has(e.category));
}
function sg(e) {
  const t = Al(e);
  if (t.length < 2) return "";
  const a = Ml(e) ? " Z" : "";
  if (e.shape === "path") return `M ${t.map(([s, r]) => `${$e(s)} ${$e(r)}`).join(" L ")}${a}`;
  const n = [`M ${$e(t[0][0])} ${$e(t[0][1])}`];
  for (let s = 0; s < t.length - 1; s += 1) {
    const r = t[s - 1] || t[s], o = t[s], l = t[s + 1], u = t[s + 2] || l, v = o[0] + (l[0] - r[0]) / 6, d = o[1] + (l[1] - r[1]) / 6, m = l[0] - (u[0] - o[0]) / 6, S = l[1] - (u[1] - o[1]) / 6;
    n.push(`C ${$e(v)} ${$e(d)}, ${$e(m)} ${$e(S)}, ${$e(l[0])} ${$e(l[1])}`);
  }
  return n.join(" ") + a;
}
function Ki(e) {
  const t = e.geometry;
  if (typeof t.x == "number" && typeof t.y == "number")
    return e.shape === "rect" ? [t.x + (t.width || 0) / 2, t.y + (t.height || 0) / 2] : e.shape === "circle" ? [t.x, t.y - (t.radius || 0) - 8] : [t.x, t.y + (e.shape === "icon" ? 18 : 0)];
  const a = t.points || [];
  if (!a.length) return [0, 0];
  const [n, s] = a.reduce((r, o) => [r[0] + o[0], r[1] + o[1]], [0, 0]);
  return [n / a.length, s / a.length];
}
function Ne(e, t) {
  const a = Xp[e.category], n = Ml(e), s = n && e.material ? `url(#${t}-material-${e.material})` : "", r = e.certainty === "inferred" ? "8 6" : e.certainty === "unknown" ? "3 7" : a.dash;
  return {
    ...a,
    fill: n ? s || a.fill || $l[e.material] : "none",
    opacity: e.certainty === "unknown" ? 0.48 : e.certainty === "inferred" ? 0.72 : 1,
    dash: r,
    icon: e.icon ? Zp[e.icon] : e.kind ? Jp[e.kind] : eg[e.category],
    fallback: e.kind ? Qp[e.kind] : ua[e.category].slice(0, 1),
    z: ks[e.category]
  };
}
function ig(e) {
  return [...e].sort((t, a) => ks[t.category] - ks[a.category] || Ht(t.id, a.id));
}
var pn = 156, rg = 66, Gi = 34, lg = 70;
function is(e) {
  return [...e].sort((t, a) => Ht(t.parent || "", a.parent || "") || Ht(t.name, a.name) || Ht(t.key, a.key));
}
function og(e) {
  const t = /* @__PURE__ */ new Set();
  return e.forEach((a) => {
    const n = [], s = /* @__PURE__ */ new Map();
    let r = a;
    for (; r?.parent; ) {
      const o = s.get(r.key);
      if (o !== void 0) {
        n.slice(o).forEach((l) => t.add(l));
        break;
      }
      s.set(r.key, n.length), n.push(r.key), r = e.get(r.parent);
    }
  }), t;
}
function ug(e) {
  return [
    Math.min(...e.map((t) => t[0])),
    Math.min(...e.map((t) => t[1])),
    Math.max(...e.map((t) => t[0])),
    Math.max(...e.map((t) => t[1]))
  ];
}
function dg(e, t, a, n) {
  const s = [t.x + t.width / 2, t.y + t.height / 2], r = [a.x + a.width / 2, a.y + a.height / 2], o = r[0] - s[0], l = r[1] - s[1], u = Math.abs(o) >= Math.abs(l), v = u ? [o >= 0 ? t.x + t.width : t.x, s[1]] : [s[0], l >= 0 ? t.y + t.height : t.y], d = u ? [o >= 0 ? a.x : a.x + a.width, r[1]] : [r[0], l >= 0 ? a.y : a.y + a.height], m = (v[0] + d[0]) / 2, S = (v[1] + d[1]) / 2 + n, h = u ? [[m, v[1] + n], [m, d[1] + n]] : [[v[0] + n, S], [d[0] + n, S]];
  return {
    id: e.id,
    from: e.from,
    to: e.to,
    path: `M ${$e(v[0])} ${$e(v[1])} C ${$e(h[0][0])} ${$e(h[0][1])}, ${$e(h[1][0])} ${$e(h[1][1])}, ${$e(d[0])} ${$e(d[1])}`,
    labelX: m,
    labelY: S - 7,
    bounds: ug([
      v,
      d,
      h[0],
      h[1],
      [m, S - 7]
    ])
  };
}
function cg(e) {
  const t = is(e.locations), a = new Map(t.map((E) => [E.key, E])), n = og(a), s = /* @__PURE__ */ new Map(), r = [];
  t.forEach((E) => {
    const C = E.parent || "";
    if (C && a.has(C) && !n.has(C) && !n.has(E.key)) {
      const M = s.get(C) || [];
      M.push(E), s.set(C, M);
    } else r.push(E);
  }), s.forEach((E, C) => s.set(C, is(E)));
  const o = /* @__PURE__ */ new Map(), l = (E) => {
    const C = o.get(E.key);
    if (C !== void 0) return C;
    const M = s.get(E.key) || [], x = M.length ? Math.max(pn, M.reduce((_, $, F) => _ + l($) + (F ? Gi : 0), 0)) : pn;
    return o.set(E.key, x), x;
  }, u = [], v = (E, C, M) => {
    const x = l(E);
    u.push({
      key: E.key,
      x: C + (x - pn) / 2,
      y: M * 158,
      width: pn,
      height: rg,
      depth: M
    });
    let _ = C;
    (s.get(E.key) || []).forEach(($) => {
      v($, _, M + 1), _ += l($) + Gi;
    });
  };
  let d = 0;
  is(r).forEach((E) => {
    v(E, d, 0), d += l(E) + lg;
  });
  const m = new Map(u.map((E) => [E.key, E])), S = t.flatMap((E) => {
    const C = m.get(E.key), M = E.parent ? m.get(E.parent) : void 0;
    if (!C || !M) return [];
    const x = M.x + M.width / 2, _ = M.y + M.height, $ = C.x + C.width / 2, F = C.y, Z = (_ + F) / 2;
    return [{
      id: `${M.key}:${C.key}`,
      path: `M ${$e(x)} ${$e(_)} C ${$e(x)} ${$e(Z)}, ${$e($)} ${$e(Z)}, ${$e($)} ${$e(F)}`
    }];
  }), h = /* @__PURE__ */ new Map(), A = [...e.links].sort((E, C) => Ht(E.id, C.id)).flatMap((E) => {
    const C = m.get(E.from), M = m.get(E.to);
    if (!C || !M) return [];
    const x = [E.from, E.to].sort(Ht).join(":"), _ = h.get(x) || 0;
    return h.set(x, _ + 1), [dg(E, C, M, _ === 0 ? 0 : (_ % 2 ? 1 : -1) * Math.ceil(_ / 2) * 24)];
  });
  if (!u.length) return {
    nodes: u,
    hierarchy: S,
    routes: A,
    viewBox: [
      0,
      0,
      640,
      420
    ]
  };
  const L = A.flatMap((E) => [E.bounds]), X = Math.min(...u.map((E) => E.x), ...L.map((E) => E[0])) - 60, V = Math.min(...u.map((E) => E.y), ...L.map((E) => E[1])) - 60, W = Math.max(...u.map((E) => E.x + E.width), ...L.map((E) => E[2])) + 60, G = Math.max(...u.map((E) => E.y + E.height), ...L.map((E) => E[3])) + 60;
  return {
    nodes: u,
    hierarchy: S,
    routes: A,
    viewBox: [
      X,
      V,
      Math.max(420, W - X),
      Math.max(300, G - V)
    ]
  };
}
function fg(e, t) {
  return e.filter((a) => a.locationKey === t).sort((a, n) => Ht(a.displayName, n.displayName) || Ht(a.actorKey, n.actorKey));
}
var vg = [
  "x",
  "y",
  "width",
  "height"
], pg = [
  "x",
  "y",
  "width",
  "height"
], gg = {
  class: "map-atlas-hierarchy",
  "aria-hidden": "true"
}, mg = ["d"], bg = { class: "map-atlas-routes" }, hg = ["d", "marker-start"], yg = ["x", "y"], kg = [
  "role",
  "tabindex",
  "aria-label",
  "onClick",
  "onKeydown"
], wg = [
  "x",
  "y",
  "width",
  "height"
], xg = ["d"], Sg = ["cx", "cy"], _g = ["x", "y"], $g = ["x", "y"], Cg = ["x", "y"], Ag = ["x", "y"], Mg = {
  key: 2,
  class: "map-atlas-actors"
}, Tg = ["transform"], Eg = {
  key: 0,
  class: "map-material-symbol"
}, Ig = {
  key: 1,
  class: "map-symbol-fallback"
}, Pg = ["x", "y"], Og = ["transform"], Lg = /* @__PURE__ */ oe({
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
    const a = e, n = t, s = z(() => cg(a.atlas)), r = z(() => new Map(a.atlas.locations.map((S) => [S.key, S]))), o = z(() => new Map(a.atlas.links.map((S) => [S.id, S])));
    function l(S) {
      return r.value.get(S.key);
    }
    function u(S) {
      return o.value.get(S);
    }
    function v(S) {
      return fg(a.atlas.actors, S);
    }
    function d(S) {
      S.sceneKey && n("viewScene", S.key);
    }
    function m(S, h) {
      !h.sceneKey || S.key !== "Enter" && S.key !== " " || (S.preventDefault(), d(h));
    }
    return (S, h) => (g(), he(_l, {
      class: "map-atlas-viewport",
      "view-box": s.value.viewBox,
      "reset-key": String(e.revision),
      label: "世界地点关系图"
    }, {
      default: na(() => [
        h[2] || (h[2] = i("defs", null, [
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
        }, null, 8, vg),
        i("rect", {
          x: s.value.viewBox[0],
          y: s.value.viewBox[1],
          width: s.value.viewBox[2],
          height: s.value.viewBox[3],
          fill: "url(#map-atlas-grid)"
        }, null, 8, pg),
        i("g", gg, [(g(!0), b(te, null, me(s.value.hierarchy, (A) => (g(), b("path", {
          key: A.id,
          d: A.path,
          "vector-effect": "non-scaling-stroke"
        }, null, 8, mg))), 128))]),
        i("g", bg, [(g(!0), b(te, null, me(s.value.routes, (A) => (g(), b("g", { key: A.id }, [i("path", {
          d: A.path,
          "marker-start": u(A.id).bidirectional ? "url(#map-atlas-arrow)" : void 0,
          "marker-end": "url(#map-atlas-arrow)",
          "vector-effect": "non-scaling-stroke"
        }, null, 8, hg), i("text", {
          x: A.labelX,
          y: A.labelY
        }, y(u(A.id).label || pe(ag)[u(A.id).kind]), 9, yg)]))), 128))]),
        (g(!0), b(te, null, me(s.value.nodes, (A) => (g(), b("g", {
          key: A.key,
          class: ne(["map-atlas-node", {
            "is-current": A.key === e.currentLocationKey,
            "is-selected": A.key === e.selectedLocationKey,
            "is-visited": l(A).status === "visited",
            "is-clickable": !!l(A).sceneKey
          }]),
          role: l(A).sceneKey ? "button" : void 0,
          tabindex: l(A).sceneKey ? 0 : void 0,
          "aria-label": l(A).sceneKey ? `查看 ${l(A).name} 场景` : l(A).name,
          onClick: it((L) => d(l(A)), ["stop"]),
          onKeydown: (L) => m(L, l(A))
        }, [
          i("rect", {
            x: A.x,
            y: A.y,
            width: A.width,
            height: A.height,
            rx: "9"
          }, null, 8, wg),
          i("path", {
            class: "map-atlas-node-cut",
            d: `M ${A.x + A.width - 24} ${A.y} L ${A.x + A.width} ${A.y + 24}`
          }, null, 8, xg),
          i("circle", {
            cx: A.x + 24,
            cy: A.y + 24,
            r: "13",
            class: "map-atlas-node-icon-ring"
          }, null, 8, Sg),
          e.symbolsReady ? (g(), b("text", {
            key: 0,
            x: A.x + 24,
            y: A.y + 24,
            class: "map-material-symbol"
          }, y(pe(tg)[l(A).scale]), 9, _g)) : (g(), b("text", {
            key: 1,
            x: A.x + 24,
            y: A.y + 24,
            class: "map-symbol-fallback"
          }, y(pe(Hi)[l(A).scale].slice(0, 1)), 9, $g)),
          i("text", {
            x: A.x + 45,
            y: A.y + 23,
            class: "map-atlas-node-name"
          }, y(l(A).name), 9, Cg),
          i("text", {
            x: A.x + 45,
            y: A.y + 42,
            class: "map-atlas-node-meta"
          }, y(pe(Hi)[l(A).scale]) + " · " + y(l(A).status === "visited" ? "已到访" : "仅提及"), 9, Ag),
          v(A.key).length ? (g(), b("g", Mg, [(g(!0), b(te, null, me(v(A.key).slice(0, 4), (L, X) => (g(), b("g", {
            key: L.actorKey,
            transform: `translate(${A.x + 19 + X * 18} ${A.y + A.height - 2})`,
            class: ne({ "is-player": L.actorKey === "player" })
          }, [
            h[0] || (h[0] = i("circle", { r: "7" }, null, -1)),
            e.symbolsReady ? (g(), b("text", Eg, y(L.actorKey === "player" ? "person_pin_circle" : "person"), 1)) : (g(), b("text", Ig, y(L.actorKey === "player" ? "P" : "N"), 1)),
            i("title", null, y(L.displayName), 1)
          ], 10, Tg))), 128)), v(A.key).length > 4 ? (g(), b("text", {
            key: 0,
            x: A.x + 88,
            y: A.y + A.height + 2,
            class: "map-atlas-actor-overflow"
          }, " +" + y(v(A.key).length - 4), 9, Pg)) : q("", !0)])) : q("", !0),
          A.key === e.currentLocationKey ? (g(), b("g", {
            key: 3,
            class: "map-atlas-current-pin",
            transform: `translate(${A.x + A.width - 13} ${A.y + 13})`
          }, [...h[1] || (h[1] = [i("circle", { r: "7" }, null, -1), i("path", { d: "M-3 0l2 2 4-5" }, null, -1)])], 8, Og)) : q("", !0),
          i("title", null, y(l(A).brief || l(A).name), 1)
        ], 42, kg))), 128))
      ]),
      _: 1
    }, 8, ["view-box", "reset-key"]));
  }
}), Rg = Lg, r0 = Object.freeze([
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
]), l0 = Object.freeze([
  "rect",
  "circle",
  "path",
  "curve",
  "icon",
  "label"
]), o0 = Object.freeze([
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
]), Ng = Object.freeze([
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
]), u0 = Object.freeze([
  "confirmed",
  "inferred",
  "unknown"
]), d0 = Object.freeze([
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
]), c0 = Object.freeze(/* @__PURE__ */ new Set([
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
])), Dg = ["id"], Bg = ["fill"], qg = {
  key: 0,
  d: "M0 6H24M0 18H24M7 0V6M17 6V18M10 18V24"
}, Ug = {
  key: 1,
  d: "M0 8L7 3l8 3 9-4M2 19l8-5 10 4 4-3"
}, Fg = {
  key: 2,
  d: "M0 8H24M0 16H24M8 0v24m8-24v24"
}, jg = {
  key: 3,
  d: "M-4 6q6-5 12 0t12 0t12 0M-4 17q6-5 12 0t12 0t12 0"
}, Hg = {
  key: 4,
  d: "M4 20l2-7 2 7M13 13l2-8 2 8M19 23l2-6 2 6"
}, Kg = {
  key: 5,
  d: "M3 5h2m8 3h3m3 10h2M7 19h3"
}, Gg = {
  key: 6,
  cx: "6",
  cy: "7",
  r: "1.1"
}, Vg = {
  key: 7,
  cx: "18",
  cy: "16",
  r: "1"
}, zg = {
  key: 8,
  d: "M12 3v18M4 7l16 10M20 7L4 17"
}, Wg = {
  key: 9,
  d: "M0 4h24M0 20h24"
}, Yg = {
  key: 10,
  cx: "5",
  cy: "12",
  r: "1.2"
}, Xg = {
  key: 11,
  cx: "19",
  cy: "12",
  r: "1.2"
}, Jg = {
  key: 12,
  d: "M0 4q6 4 12 0t12 0M0 16q6 4 12 0t12 0"
}, Qg = {
  key: 13,
  d: "M0 6l7 5 5-8 5 13 7-5M0 22l8-5 6 4 10-8"
}, Zg = {
  key: 14,
  d: "M12 2l4 7 6 3-6 4-4 6-4-6-6-4 6-3zM8 9l8 7m0-7l-8 7"
}, em = {
  key: 15,
  d: "M12 2v20M2 12h20M5 5l14 14M19 5L5 19"
}, tm = [
  "x",
  "y",
  "width",
  "height"
], am = [
  "x",
  "y",
  "width",
  "height"
], nm = [
  "cx",
  "cy",
  "rx",
  "ry"
], sm = ["opacity"], im = [
  "x",
  "y",
  "width",
  "height",
  "fill",
  "stroke",
  "stroke-width",
  "stroke-dasharray"
], rm = [
  "cx",
  "cy",
  "r",
  "fill",
  "stroke",
  "stroke-width",
  "stroke-dasharray"
], lm = [
  "d",
  "fill",
  "stroke",
  "stroke-width",
  "stroke-dasharray"
], om = ["transform"], um = ["stroke"], dm = {
  key: 0,
  class: "map-material-symbol",
  "aria-hidden": "true"
}, cm = {
  key: 1,
  class: "map-symbol-fallback",
  "aria-hidden": "true"
}, fm = ["x", "y"], vm = ["x", "y"], pm = /* @__PURE__ */ oe({
  __name: "MapScene",
  props: {
    scene: {},
    symbolsReady: { type: Boolean }
  },
  setup(e) {
    let t = 0;
    const a = e, n = `xiaobai-map-scene-${t += 1}`, s = Ng, r = z(() => ig(a.scene.elements)), o = z(() => Cl[a.scene.mood || "neutral"]), l = z(() => ({
      "--map-canvas-bg": o.value.background,
      "--map-canvas-glow": o.value.glow,
      "--map-canvas-accent": o.value.accent
    }));
    function u(m) {
      return m.geometry;
    }
    function v(m) {
      return m.geometry;
    }
    function d(m) {
      return m.geometry;
    }
    return (m, S) => (g(), he(_l, {
      class: "map-scene-viewport",
      style: Vt(l.value),
      "view-box": e.scene.viewBox,
      "reset-key": e.scene.key,
      label: `${e.scene.name} 场景地图`
    }, {
      default: na(() => [
        i("defs", null, [
          S[0] || (S[0] = i("pattern", {
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
          S[1] || (S[1] = i("pattern", {
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
          (g(!0), b(te, null, me(pe(s), (h) => (g(), b("pattern", {
            id: `${n}-material-${h}`,
            key: h,
            width: "24",
            height: "24",
            patternUnits: "userSpaceOnUse",
            class: ne(`map-material-pattern is-${h}`)
          }, [
            i("rect", {
              width: "24",
              height: "24",
              fill: pe($l)[h]
            }, null, 8, Bg),
            h === "wood" ? (g(), b("path", qg)) : h === "stone" ? (g(), b("path", Ug)) : h === "tile" || h === "marble" ? (g(), b("path", Fg)) : h === "water" ? (g(), b("path", jg)) : h === "grass" ? (g(), b("path", Hg)) : h === "dirt" ? (g(), b("path", Kg)) : h === "sand" ? (g(), b("circle", Gg)) : q("", !0),
            h === "sand" ? (g(), b("circle", Vg)) : h === "snow" ? (g(), b("path", zg)) : h === "metal" ? (g(), b("path", Wg)) : q("", !0),
            h === "metal" ? (g(), b("circle", Yg)) : q("", !0),
            h === "metal" ? (g(), b("circle", Xg)) : h === "fabric" || h === "carpet" || h === "bed-sheet" || h === "tatami" ? (g(), b("path", Jg)) : h === "blood" ? (g(), b("path", Qg)) : h === "rune" ? (g(), b("path", Zg)) : h === "warm-light" || h === "cold-light" || h === "shadow" ? (g(), b("path", em)) : q("", !0)
          ], 10, Dg))), 128)),
          S[2] || (S[2] = i("filter", {
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
        }, null, 8, tm),
        i("rect", {
          x: e.scene.viewBox[0],
          y: e.scene.viewBox[1],
          width: e.scene.viewBox[2],
          height: e.scene.viewBox[3],
          fill: "url(#map-scene-major-grid)"
        }, null, 8, am),
        i("ellipse", {
          cx: e.scene.viewBox[0] + e.scene.viewBox[2] / 2,
          cy: e.scene.viewBox[1] + e.scene.viewBox[3] / 2,
          rx: e.scene.viewBox[2] * 0.42,
          ry: e.scene.viewBox[3] * 0.42,
          fill: "var(--map-canvas-glow)"
        }, null, 8, nm),
        (g(!0), b(te, null, me(r.value, (h) => (g(), b("g", {
          key: h.id,
          class: ne(["map-scene-element", [`is-${h.category}`, `is-${h.certainty || "confirmed"}`]]),
          opacity: pe(Ne)(h, n).opacity
        }, [h.shape === "rect" ? (g(), b("rect", {
          key: 0,
          x: u(h).x,
          y: u(h).y,
          width: u(h).width,
          height: u(h).height,
          fill: pe(Ne)(h, n).fill,
          stroke: pe(Ne)(h, n).stroke,
          "stroke-width": pe(Ne)(h, n).width,
          "stroke-dasharray": pe(Ne)(h, n).dash,
          "vector-effect": "non-scaling-stroke"
        }, null, 8, im)) : h.shape === "circle" ? (g(), b("circle", {
          key: 1,
          cx: v(h).x,
          cy: v(h).y,
          r: v(h).radius,
          fill: pe(Ne)(h, n).fill,
          stroke: pe(Ne)(h, n).stroke,
          "stroke-width": pe(Ne)(h, n).width,
          "stroke-dasharray": pe(Ne)(h, n).dash,
          "vector-effect": "non-scaling-stroke"
        }, null, 8, rm)) : h.shape === "path" || h.shape === "curve" ? (g(), b("path", {
          key: 2,
          d: pe(sg)(h),
          fill: pe(Ne)(h, n).fill,
          stroke: pe(Ne)(h, n).stroke,
          "stroke-width": pe(Ne)(h, n).width,
          "stroke-dasharray": pe(Ne)(h, n).dash,
          "stroke-linecap": "round",
          "stroke-linejoin": "round",
          "fill-rule": "evenodd",
          "vector-effect": "non-scaling-stroke"
        }, null, 8, lm)) : h.shape === "icon" ? (g(), b("g", {
          key: 3,
          class: "map-scene-icon",
          transform: `translate(${d(h).x} ${d(h).y})`
        }, [i("circle", {
          r: "11",
          stroke: pe(Ne)(h, n).stroke
        }, null, 8, um), e.symbolsReady ? (g(), b("text", dm, y(pe(Ne)(h, n).icon), 1)) : (g(), b("text", cm, y(pe(Ne)(h, n).fallback), 1))], 8, om)) : h.shape === "label" ? (g(), b("text", {
          key: 4,
          class: "map-scene-label is-primary",
          x: d(h).x,
          y: d(h).y
        }, y(h.label || ""), 9, fm)) : q("", !0), h.label && h.shape !== "label" ? (g(), b("text", {
          key: 5,
          class: "map-scene-label",
          x: pe(Ki)(h)[0],
          y: pe(Ki)(h)[1]
        }, y(h.label), 9, vm)) : q("", !0)], 10, sm))), 128))
      ]),
      _: 1
    }, 8, [
      "style",
      "view-box",
      "reset-key",
      "label"
    ]));
  }
}), gm = pm, mm = {
  class: "map-settings",
  "aria-labelledby": "map-settings-title"
}, bm = { class: "map-settings-body" }, hm = { class: "map-settings-card" }, ym = { class: "map-setting-row" }, km = [
  "aria-checked",
  "aria-label",
  "disabled"
], wm = { class: "map-settings-card" }, xm = ["disabled", "title"], Sm = { class: "map-settings-card is-danger-zone" }, _m = { class: "map-settings-action-copy" }, $m = ["disabled", "title"], Cm = {
  key: 0,
  class: "map-disabled-reason",
  role: "status"
}, Am = {
  key: 1,
  class: "map-maintenance-message",
  role: "status"
}, Mm = /* @__PURE__ */ oe({
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
    return (t, a) => (g(), b("aside", mm, [i("header", null, [a[4] || (a[4] = i("div", null, [i("span", null, "MAP SYSTEM / CONFIG"), i("h2", { id: "map-settings-title" }, "地图设置")], -1)), i("button", {
      type: "button",
      class: "map-icon-button",
      "aria-label": "关闭地图设置",
      onClick: a[0] || (a[0] = (n) => t.$emit("close"))
    }, "×")]), i("div", bm, [
      i("section", hm, [i("div", ym, [a[6] || (a[6] = i("div", null, [i("h3", null, "所有普通聊天自动维护"), i("p", null, "每次发送新的 User 消息后，让地图维护刚被接受的上一轮空间事实。")], -1)), i("button", {
        type: "button",
        class: "map-switch",
        role: "switch",
        "aria-checked": e.autoMaintenance,
        "aria-label": e.autoMaintenance ? "关闭所有普通聊天自动维护" : "开启所有普通聊天自动维护",
        disabled: e.autoToggleBusy,
        onClick: a[1] || (a[1] = (n) => t.$emit("setAutoMaintenance", !e.autoMaintenance))
      }, [...a[5] || (a[5] = [i("span", null, null, -1)])], 8, km)]), a[7] || (a[7] = i("div", { class: "map-cost-note" }, [i("strong", null, "API 成本说明"), i("p", null, "自动维护和下方两个手动操作都会调用已配置的 AI 模型，消耗 token / API 额度。切换此开关本身只保存设置，不会立即调用 AI。")], -1))]),
      i("section", wm, [a[8] || (a[8] = i("div", { class: "map-settings-action-copy" }, [i("h3", null, "增量维护"), i("p", null, "读取聊天尾部最新完整的 User 与 Assistant 对话，补充地点、路线、人物位置和场景细节。")], -1)), i("button", {
        type: "button",
        class: "map-action-button",
        disabled: e.busy || !!e.disabledReason || !e.hasMap,
        title: e.hasMap ? e.disabledReason : "请先从当前聊天建立地图",
        onClick: a[2] || (a[2] = (n) => t.$emit("maintainOnce"))
      }, y(e.maintenanceStatus === "maintaining" ? "正在维护…" : "维护一次"), 9, xm)]),
      i("section", Sm, [i("div", _m, [i("h3", null, y(e.hasMap ? "重建地图" : "建立地图"), 1), a[9] || (a[9] = i("p", null, "重新读取当前聊天并生成完整地图。已有地图会在保存成功后被新结果替换。", -1))]), i("button", {
        type: "button",
        class: "map-action-button is-strong",
        disabled: e.busy || !!e.disabledReason,
        title: e.disabledReason,
        onClick: a[3] || (a[3] = (n) => t.$emit("requestRebuild"))
      }, y(e.maintenanceStatus === "rebuilding" ? "正在重建…" : "从当前聊天建立/重建地图"), 9, $m)]),
      e.disabledReason ? (g(), b("p", Cm, y(e.disabledReason), 1)) : q("", !0),
      e.maintenanceMessage ? (g(), b("p", Am, y(e.maintenanceMessage), 1)) : q("", !0)
    ])]));
  }
}), Tm = Mm, Em = { class: "map-app" }, Im = { class: "map-header" }, Pm = { class: "map-header-actions" }, Om = ["disabled"], Lm = { class: "map-command-bar" }, Rm = {
  class: "map-tabs",
  "aria-label": "地图视图"
}, Nm = {
  key: 0,
  class: "map-location-select"
}, Dm = ["disabled"], Bm = {
  key: 0,
  value: ""
}, qm = ["value"], Um = {
  key: 1,
  class: "map-atlas-summary",
  "aria-label": "世界地图统计"
}, Fm = { class: "map-notice-code" }, jm = { key: 0 }, Hm = ["disabled"], Km = ["disabled"], Gm = ["disabled"], Vm = {
  key: 0,
  class: "map-empty-state"
}, zm = ["disabled"], Wm = {
  key: 1,
  class: "map-empty-state"
}, Ym = ["disabled"], Xm = {
  key: 2,
  class: "map-empty-state"
}, Jm = ["disabled"], Qm = { class: "map-canvas-heading" }, Zm = {
  class: "map-legend is-scene",
  "aria-label": "场景地图图例"
}, eb = {
  key: 0,
  class: "map-location-brief"
}, tb = {
  key: 0,
  class: "map-empty-state"
}, ab = ["disabled"], nb = { class: "map-canvas-heading is-atlas" }, sb = { key: 0 }, ib = {
  key: 2,
  class: "map-loading-scrim",
  role: "status"
}, rb = {
  class: "map-dialog",
  role: "alertdialog",
  "aria-modal": "true",
  "aria-labelledby": "map-rebuild-title"
}, lb = { id: "map-rebuild-title" }, ob = {
  key: 0,
  class: "map-dialog-error",
  role: "alert"
}, ub = ["disabled"], db = ["disabled", "title"], Vi = 35e3, cb = 18e4, fb = 24e4, vb = "Xiaobai Map Symbols", pb = /* @__PURE__ */ oe({
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
        const T = [
          "..",
          "..",
          "..",
          "libs",
          "material-symbols",
          "material-symbols-rounded.woff2"
        ].join("/"), k = new URL(T, import.meta.url).href;
        t = new FontFace(vb, `url("${k}")`, {
          display: "block",
          style: "normal",
          weight: "400"
        }).load().catch((P) => {
          throw t = null, P;
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
    function r(T) {
      return !T || typeof T != "object" ? s() : structuredClone(/* @__PURE__ */ se(T));
    }
    function o(T) {
      const k = T.map;
      if (!k) return "";
      const P = new Map(k.atlas.locations.map((U) => [U.key, U]));
      let N = P.get(k.atlas.actors.find((U) => U.actorKey === "player")?.locationKey || "");
      const H = /* @__PURE__ */ new Set();
      for (; N && !H.has(N.key); ) {
        if (H.add(N.key), N.sceneKey && k.scenes[N.sceneKey]) return N.key;
        N = N.parent ? P.get(N.parent) : void 0;
      }
      return k.atlas.locations.find((U) => U.sceneKey && k.scenes[U.sceneKey])?.key || "";
    }
    const l = /* @__PURE__ */ Y(r(a.initialState)), u = /* @__PURE__ */ Y("scene"), v = /* @__PURE__ */ Y(o(l.value)), d = /* @__PURE__ */ Y(!1), m = /* @__PURE__ */ Y(!1), S = /* @__PURE__ */ Y(null), h = /* @__PURE__ */ Y(""), A = /* @__PURE__ */ Y(""), L = /* @__PURE__ */ Y(!1);
    let X = () => {
    }, V = 0, W = 0, G = !1;
    const E = z(() => {
      const T = l.value.map;
      return T ? T.atlas.locations.filter((k) => k.sceneKey && T.scenes[k.sceneKey]) : [];
    }), C = z(() => l.value.map?.atlas.actors.find((T) => T.actorKey === "player") || null), M = z(() => l.value.map?.atlas.locations.find((T) => T.key === C.value?.locationKey) || null), x = z(() => l.value.map?.atlas.locations.find((T) => T.key === v.value) || null), _ = z(() => {
      const T = x.value?.sceneKey;
      return T && l.value.map?.scenes[T] || null;
    }), $ = z(() => {
      const T = l.value.map;
      let k = x.value;
      if (!T || !k) return "";
      const P = new Map(T.atlas.locations.map((U) => [U.key, U])), N = [], H = /* @__PURE__ */ new Set();
      for (; k && !H.has(k.key); )
        H.add(k.key), N.unshift(k.name), k = k.parent && P.get(k.parent) || null;
      return N.join(" / ");
    }), F = z(() => l.value.status === "loading" || l.value.status === "saving" || l.value.maintenanceStatus === "maintaining" || l.value.maintenanceStatus === "rebuilding"), Z = z(() => S.value !== null || F.value), K = z(() => l.value.status === "unconfirmed" || l.value.writeState === "unconfirmed"), J = z(() => Z.value || K.value), D = z(() => S.value ? "正在处理上一项地图操作" : l.value.maintenanceStatus === "maintaining" ? "地图正在维护，请等待本次维护完成" : l.value.maintenanceStatus === "rebuilding" ? "地图正在重建，请等待本次重建完成" : l.value.status === "loading" ? "地图状态正在载入" : l.value.status === "saving" ? "地图正在保存" : K.value ? "请先核实上一次保存结果" : l.value.status === "conflict" ? "地图版本发生冲突，请先采用服务端数据" : l.value.status === "blocked" ? l.value.message || "当前地图不可维护" : l.value.status === "error" ? l.value.message || "地图状态异常，请先重新读取" : l.value.chatIdentity ? "" : "当前聊天不可用"), ue = Object.freeze({
      ready: "地图就绪",
      loading: "正在载入",
      saving: "正在保存",
      unconfirmed: "保存待核实",
      conflict: "版本冲突",
      blocked: "暂时不可用",
      error: "状态异常"
    }), ke = z(() => l.value.maintenanceStatus === "maintaining" ? "正在维护地图" : l.value.maintenanceStatus === "rebuilding" ? "正在重建地图" : S.value === "refresh" ? "正在重新读取" : S.value === "settings" ? "正在保存设置" : S.value === "confirm" ? "正在核实保存" : S.value === "adopt" ? "正在采用服务端数据" : S.value === "maintain" ? "正在维护地图" : S.value === "rebuild" ? "正在重建地图" : ue[l.value.status]), de = z(() => !!(h.value || l.value.message || l.value.maintenanceMessage || A.value) || Z.value || l.value.status !== "ready" || l.value.maintenanceStatus === "error"), ce = z(() => h.value || [
      "error",
      "blocked",
      "conflict"
    ].includes(l.value.status) || l.value.maintenanceStatus === "error" ? "danger" : K.value ? "warning" : Z.value ? "busy" : "info"), j = z(() => K.value ? "保存结果尚未确认" : l.value.status === "conflict" ? "地图版本发生冲突" : l.value.maintenanceStatus === "error" ? "地图维护未完成" : h.value || l.value.status === "error" ? "地图操作未完成" : l.value.status === "blocked" ? "地图暂时不可用" : ke.value), B = z(() => h.value || l.value.maintenanceMessage || l.value.message || A.value), re = z(() => Cl[_.value?.mood || "neutral"]), Ae = z(() => ({
      locations: l.value.map?.atlas.locations.length || 0,
      routes: l.value.map?.atlas.links.length || 0,
      actors: l.value.map?.atlas.actors.length || 0
    }));
    function je(T) {
      return T !== null && typeof T == "object" && !Array.isArray(T);
    }
    function _a(T) {
      if (!je(T)) return null;
      const k = T.result, P = je(k) && je(k.state) ? k.state : k;
      return je(P) && typeof P.chatIdentity == "string" && typeof P.status == "string" ? P : null;
    }
    function sa(T, k) {
      const P = T.map;
      if (P) {
        const N = P.atlas.locations.find((H) => H.key === k);
        if (N?.sceneKey && P.scenes[N.sceneKey]) return k;
      }
      return o(T);
    }
    function We(T) {
      const k = structuredClone(T);
      v.value = sa(k, k.chatIdentity === l.value.chatIdentity ? v.value : ""), l.value = k, h.value = "", A.value = "";
    }
    function xt(T, k) {
      const P = T instanceof Error ? T.message : String(T);
      return P.includes("聊天已切换") ? "聊天已切换，请重新打开地图。" : P.includes("map_revision_conflict") ? "地图已被另一项操作更新，请重新读取后再试。" : P.includes("无法确认小白 OS 设置已经保存") ? "自动维护已按当前选择运行，但服务端保存结果未确认。" : P === "host_request_timeout" ? k === "maintain" || k === "rebuild" ? "等待 AI 处理超时；后台结果仍可能稍后送达，请勿立即重复操作。" : "等待地图服务响应超时，请稍后重试。" : P.includes("已有") && P.includes("维护") ? "已有地图维护正在进行，请等待完成。" : k === "settings" ? "自动维护设置未能保存，请重试。" : k === "refresh" ? "地图状态未能重新读取，请稍后重试。" : k === "confirm" ? "保存结果仍无法确认，请稍后再次核实。" : k === "adopt" ? "暂时无法采用服务端数据，冲突仍保持冻结。" : k === "rebuild" ? "地图建立/重建未完成，请检查模型配置后重试。" : "地图维护未完成，请检查模型配置后重试。";
    }
    async function et(T, k, P = Vi, N = {}) {
      if (S.value) return null;
      const H = ++V, U = W, Q = l.value.chatIdentity;
      S.value = k, h.value = "", A.value = "";
      try {
        const ee = await a.bridge.request(T, {
          chatIdentity: Q,
          ...N
        }, P);
        if (!G || H !== V || l.value.chatIdentity !== Q) return null;
        const le = W !== U, fe = _a(ee);
        let ve = !1;
        return !le && fe?.chatIdentity === Q && (We(fe), ve = !0), {
          response: ee,
          stateApplied: ve,
          newerStateReceived: le
        };
      } catch (ee) {
        return G && H === V && (h.value = xt(ee, k)), null;
      } finally {
        G && H === V && (S.value = null);
      }
    }
    async function zt() {
      J.value || await et("map/refresh", "refresh") && (A.value = "已读取当前聊天的最新地图状态。");
    }
    async function ft() {
      Z.value || await et("map/confirm-save", "confirm") && (A.value = "保存结果已重新核实。");
    }
    async function Wt() {
      if (Z.value) return;
      const T = await et("map/adopt-server-state", "adopt");
      if (!T) return;
      const k = je(T.response) ? T.response.result : null;
      A.value = (je(k) ? k.adoption : "") === "adopted" ? "已采用服务端数据，可以继续维护地图。" : "服务端数据仍无法采用，地图继续保持冻结。";
    }
    function p(T) {
      const k = je(T.response) ? T.response.result : null;
      return je(k) && typeof k.message == "string" ? k.message : "地图操作已结束。";
    }
    async function c(T) {
      if (S.value) return;
      const k = await et("map/set-auto-maintenance", "settings", Vi, { enabled: T });
      k && (!k.stateApplied && !k.newerStateReceived && (l.value = {
        ...l.value,
        autoMaintenance: T
      }), A.value = T ? "普通聊天自动维护已开启。" : "普通聊天自动维护已关闭。");
    }
    async function f() {
      if (D.value || !l.value.map) return;
      const T = await et("map/maintain-once", "maintain", cb);
      T && (A.value = p(T));
    }
    function w() {
      D.value || (m.value = !0);
    }
    async function I() {
      if (D.value) return;
      const T = await et("map/rebuild", "rebuild", fb);
      T && (m.value = !1, A.value = p(T));
    }
    function R(T) {
      const k = l.value.map?.atlas.locations.find((P) => P.key === T);
      !k?.sceneKey || !l.value.map?.scenes[k.sceneKey] || (v.value = T, u.value = "scene");
    }
    function O(T) {
      return T.key === M.value?.key ? `${T.name}（当前位置）` : T.name;
    }
    return ct(() => {
      G = !0, X = a.bridge.subscribe((T) => {
        if (T.type === "map/state") {
          const k = T.payload?.state;
          k && (W += 1, We(k));
        }
        T.type === "map/error" && (W += 1, A.value = "", h.value = T.payload?.message || "地图服务报告了一个错误，请重新读取。");
      }), typeof FontFace == "function" && document.fonts?.add && n().then((T) => {
        document.fonts.add(T), G && (L.value = !0);
      }).catch(() => {
        L.value = !1;
      });
    }), lt(() => {
      G = !1, V += 1, X(), m.value = !1;
    }), (T, k) => (g(), b("main", Em, [
      i("header", Im, [k[12] || (k[12] = i("div", { class: "map-brand" }, [i("span", {
        class: "map-brand-mark",
        "aria-hidden": "true"
      }, [
        i("i"),
        i("i"),
        i("i")
      ]), i("div", null, [i("small", null, "XIAOBAI CARTOGRAPHY / 01"), i("h1", null, "地图")])], -1)), i("div", Pm, [
        i("span", { class: ne(["map-status-chip", `is-${ce.value}`]) }, [k[9] || (k[9] = i("i", null, null, -1)), ge(y(ke.value), 1)], 2),
        i("button", {
          type: "button",
          class: "map-icon-button",
          disabled: J.value,
          title: "重新读取地图",
          "aria-label": "重新读取地图",
          onClick: zt
        }, [...k[10] || (k[10] = [i("svg", {
          viewBox: "0 0 24 24",
          "aria-hidden": "true"
        }, [i("path", { d: "M20 7v5h-5M4 17v-5h5M18.2 9A7 7 0 0 0 6.1 6.7L4 9m16 6-2.1 2.3A7 7 0 0 1 5.8 15" })], -1)])], 8, Om),
        i("button", {
          type: "button",
          class: ne(["map-icon-button", { "is-active": d.value }]),
          title: "地图设置",
          "aria-label": "地图设置",
          onClick: k[0] || (k[0] = (P) => d.value = !d.value)
        }, [...k[11] || (k[11] = [i("svg", {
          viewBox: "0 0 24 24",
          "aria-hidden": "true"
        }, [i("path", { d: "M12 8.5a3.5 3.5 0 1 0 0 7 3.5 3.5 0 0 0 0-7zM19 13.5l2-1.5-2-1.5-.5-1.3.4-2.5-2.5-.4L15 4l-2 1h-2L9 4 7.6 6.3l-2.5.4.4 2.5L5 10.5 3 12l2 1.5.5 1.3-.4 2.5 2.5.4L9 20l2-1h2l2 1 1.4-2.3 2.5-.4-.4-2.5z" })], -1)])], 2)
      ])]),
      i("div", Lm, [i("nav", Rm, [i("button", {
        type: "button",
        class: ne({ "is-active": u.value === "scene" }),
        onClick: k[1] || (k[1] = (P) => u.value = "scene")
      }, "场景", 2), i("button", {
        type: "button",
        class: ne({ "is-active": u.value === "atlas" }),
        onClick: k[2] || (k[2] = (P) => u.value = "atlas")
      }, "世界", 2)]), u.value === "scene" ? (g(), b("label", Nm, [k[13] || (k[13] = i("span", null, "观察地点", -1)), Te(i("select", {
        "onUpdate:modelValue": k[3] || (k[3] = (P) => v.value = P),
        disabled: E.value.length === 0
      }, [E.value.length === 0 ? (g(), b("option", Bm, "暂无可查看场景")) : q("", !0), (g(!0), b(te, null, me(E.value, (P) => (g(), b("option", {
        key: P.key,
        value: P.key
      }, y(O(P)), 9, qm))), 128))], 8, Dm), [[ol, v.value]])])) : (g(), b("div", Um, [
        i("span", null, y(Ae.value.locations) + " 地点", 1),
        k[14] || (k[14] = i("i", null, null, -1)),
        i("span", null, y(Ae.value.routes) + " 路线", 1),
        k[15] || (k[15] = i("i", null, null, -1)),
        i("span", null, y(Ae.value.actors) + " 人物", 1)
      ]))]),
      de.value ? (g(), b("aside", {
        key: 0,
        class: ne(["map-notice", `is-${ce.value}`]),
        role: "status"
      }, [
        i("span", Fm, y(ce.value === "danger" ? "!" : ce.value === "warning" ? "?" : "i"), 1),
        i("div", null, [i("strong", null, y(j.value), 1), B.value ? (g(), b("p", jm, y(B.value), 1)) : q("", !0)]),
        K.value ? (g(), b("button", {
          key: 0,
          type: "button",
          disabled: Z.value,
          onClick: ft
        }, y(S.value === "confirm" ? "正在核实…" : "确认保存结果"), 9, Hm)) : l.value.status === "conflict" ? (g(), b("button", {
          key: 1,
          type: "button",
          disabled: Z.value,
          onClick: Wt
        }, y(S.value === "adopt" ? "正在采用…" : "采用服务端数据"), 9, Km)) : l.value.status === "blocked" || l.value.status === "error" || h.value ? (g(), b("button", {
          key: 2,
          type: "button",
          disabled: J.value,
          onClick: zt
        }, y(S.value === "refresh" ? "正在读取…" : "重新读取"), 9, Gm)) : q("", !0)
      ], 2)) : q("", !0),
      i("section", { class: ne(["map-workspace", { "has-notice": de.value }]) }, [u.value === "scene" ? (g(), b(te, { key: 0 }, [l.value.map ? _.value ? _.value.status === "uninitialized" ? (g(), b("div", Xm, [
        k[24] || (k[24] = i("span", {
          class: "map-empty-radar",
          "aria-hidden": "true"
        }, [i("i")], -1)),
        k[25] || (k[25] = i("small", null, "SCENE PENDING", -1)),
        i("h2", null, y(_.value.name) + " 尚未绘制", 1),
        k[26] || (k[26] = i("p", null, "地点已记录，场景几何仍待地图维护补全。", -1)),
        i("button", {
          type: "button",
          disabled: !!D.value,
          onClick: k[5] || (k[5] = (P) => d.value = !0)
        }, "打开维护设置", 8, Jm)
      ])) : (g(), b(te, { key: 3 }, [
        Ce(gm, {
          scene: _.value,
          "symbols-ready": L.value
        }, null, 8, ["scene", "symbols-ready"]),
        i("div", Qm, [
          i("small", null, y($.value || _.value.name), 1),
          i("h2", null, y(_.value.name), 1),
          i("span", null, [i("i", { style: Vt({ background: re.value.accent }) }, null, 4), ge(y(_.value.mood || "neutral"), 1)])
        ]),
        i("aside", Zm, [
          k[32] || (k[32] = i("strong", null, "图例", -1)),
          i("span", null, [k[27] || (k[27] = i("i", { class: "is-wall" }, null, -1)), ge(y(pe(ua).wall), 1)]),
          i("span", null, [k[28] || (k[28] = i("i", { class: "is-road" }, null, -1)), ge(y(pe(ua).road), 1)]),
          i("span", null, [k[29] || (k[29] = i("i", { class: "is-water" }, null, -1)), ge(y(pe(ua).water), 1)]),
          i("span", null, [k[30] || (k[30] = i("i", { class: "is-danger" }, null, -1)), ge(y(pe(ua).danger), 1)]),
          i("span", null, [k[31] || (k[31] = i("i", { class: "is-actor" }, null, -1)), ge(y(pe(ua).actor), 1)]),
          k[33] || (k[33] = i("span", null, [i("i", { class: "is-inferred" }), ge("推断")], -1))
        ]),
        x.value?.brief ? (g(), b("div", eb, y(x.value.brief), 1)) : q("", !0)
      ], 64)) : (g(), b("div", Wm, [
        k[20] || (k[20] = i("span", {
          class: "map-empty-radar",
          "aria-hidden": "true"
        }, [i("i")], -1)),
        k[21] || (k[21] = i("small", null, "SCENE NOT AVAILABLE", -1)),
        k[22] || (k[22] = i("h2", null, "暂无可绘制的场景", -1)),
        k[23] || (k[23] = i("p", null, "世界地点已经存在，但还没有地点具备场景图。可维护一次地图来补充。", -1)),
        i("button", {
          type: "button",
          disabled: !!D.value,
          onClick: k[4] || (k[4] = (P) => d.value = !0)
        }, "打开维护设置", 8, Ym)
      ])) : (g(), b("div", Vm, [
        k[16] || (k[16] = i("span", {
          class: "map-empty-radar",
          "aria-hidden": "true"
        }, [i("i")], -1)),
        k[17] || (k[17] = i("small", null, "NO CARTOGRAPHIC DATA", -1)),
        k[18] || (k[18] = i("h2", null, "当前聊天还没有地图", -1)),
        k[19] || (k[19] = i("p", null, "从当前聊天中识别地点、路线与场景。只有确认后才会开始调用 AI。", -1)),
        i("button", {
          type: "button",
          disabled: !!D.value,
          onClick: w
        }, "从当前聊天建立地图", 8, zm)
      ]))], 64)) : (g(), b(te, { key: 1 }, [!l.value.map || l.value.map.atlas.locations.length === 0 ? (g(), b("div", tb, [
        k[34] || (k[34] = i("span", {
          class: "map-empty-radar",
          "aria-hidden": "true"
        }, [i("i")], -1)),
        k[35] || (k[35] = i("small", null, "ATLAS IS EMPTY", -1)),
        k[36] || (k[36] = i("h2", null, "世界地图尚未建立", -1)),
        k[37] || (k[37] = i("p", null, "建立地图后，这里会显示地点层级、通行路线和人物所在位置。", -1)),
        i("button", {
          type: "button",
          disabled: !!D.value,
          onClick: w
        }, "从当前聊天建立地图", 8, ab)
      ])) : (g(), b(te, { key: 1 }, [
        Ce(Rg, {
          atlas: l.value.map.atlas,
          revision: l.value.map.revision,
          "current-location-key": M.value?.key || "",
          "selected-location-key": v.value,
          "symbols-ready": L.value,
          onViewScene: R
        }, null, 8, [
          "atlas",
          "revision",
          "current-location-key",
          "selected-location-key",
          "symbols-ready"
        ]),
        i("div", nb, [
          k[39] || (k[39] = i("small", null, "DETERMINISTIC WORLD GRAPH", -1)),
          k[40] || (k[40] = i("h2", null, "地点网络", -1)),
          M.value ? (g(), b("span", sb, [k[38] || (k[38] = i("i", null, null, -1)), ge("当前位置 · " + y(M.value.name), 1)])) : q("", !0)
        ]),
        k[41] || (k[41] = vu('<aside class="map-legend is-atlas" aria-label="世界地图图例"><strong>图例</strong><span><i class="is-current"></i>当前位置</span><span><i class="is-visited"></i>已到访</span><span><i class="is-route"></i>通行路线</span><span><i class="is-hierarchy"></i>隶属层级</span><small>点击有场景的地点可查看</small></aside>', 1))
      ], 64))], 64)), l.value.status === "loading" ? (g(), b("div", ib, [...k[42] || (k[42] = [i("span", null, null, -1), i("p", null, "正在校准地图坐标", -1)])])) : q("", !0)], 2),
      Ce(rl, { name: "map-panel" }, {
        default: na(() => [d.value ? (g(), he(Tm, {
          key: 0,
          "auto-maintenance": l.value.autoMaintenance,
          busy: Z.value,
          "auto-toggle-busy": S.value !== null,
          "disabled-reason": D.value,
          "has-map": !!l.value.map,
          "maintenance-status": l.value.maintenanceStatus || "idle",
          "maintenance-message": l.value.maintenanceMessage || "",
          onClose: k[6] || (k[6] = (P) => d.value = !1),
          onSetAutoMaintenance: c,
          onMaintainOnce: f,
          onRequestRebuild: w
        }, null, 8, [
          "auto-maintenance",
          "busy",
          "auto-toggle-busy",
          "disabled-reason",
          "has-map",
          "maintenance-status",
          "maintenance-message"
        ])) : q("", !0)]),
        _: 1
      }),
      m.value ? (g(), b("div", {
        key: 1,
        class: "map-dialog-backdrop",
        onClick: k[8] || (k[8] = it((P) => !Z.value && (m.value = !1), ["self"]))
      }, [i("section", rb, [
        k[43] || (k[43] = i("small", null, "AI CARTOGRAPHY REQUEST", -1)),
        i("h2", lb, y(l.value.map ? "从当前聊天重建地图？" : "从当前聊天建立地图？"), 1),
        i("p", null, "此操作会调用已配置的 AI 模型并消耗 token / API 额度。" + y(l.value.map ? "现有地图将在新地图成功保存后被替换。" : "模型会读取当前聊天并生成第一版地图。"), 1),
        h.value ? (g(), b("p", ob, y(h.value), 1)) : q("", !0),
        i("div", null, [i("button", {
          type: "button",
          disabled: Z.value,
          onClick: k[7] || (k[7] = (P) => m.value = !1)
        }, "取消", 8, ub), i("button", {
          type: "button",
          class: "is-confirm",
          disabled: Z.value || !!D.value,
          title: D.value,
          onClick: I
        }, y(S.value === "rebuild" || l.value.maintenanceStatus === "rebuilding" ? "正在建立地图…" : "确认并开始"), 9, db)])
      ])])) : q("", !0)
    ]));
  }
}), gb = pb, mb = Object.freeze({
  id: "fourth-wall",
  name: "四次元壁",
  accent: "#7567d8"
}), bb = ["src"], hb = {
  key: 1,
  class: "fourth-wall-avatar is-placeholder",
  "aria-hidden": "true"
}, yb = { class: "fourth-wall-message-stack" }, kb = {
  key: 0,
  class: "fourth-wall-thinking"
}, wb = { class: "fourth-wall-bubble" }, xb = {
  key: 0,
  class: "fourth-wall-message-text"
}, Sb = {
  key: 1,
  class: "fourth-wall-image-card"
}, _b = ["src", "alt"], $b = ["onClick"], Cb = { key: 2 }, Ab = { key: 3 }, Mb = ["onClick"], Tb = { "aria-hidden": "true" }, Eb = { key: 0 }, Ib = { class: "fourth-wall-message-actions" }, Pb = { key: 1 }, Ob = /* @__PURE__ */ oe({
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
    const a = e, n = t, s = /* @__PURE__ */ Y(!1), r = /* @__PURE__ */ Y(""), o = /* @__PURE__ */ Ot({}), l = /* @__PURE__ */ new Set();
    let u = () => {
    };
    function v(C) {
      const M = /\[(?:img|图片)\s*:\s*([^\]]+)\]|\[(?:voice|语音)\s*:([^:\]]*):([^\]]+)\]|\[(?:voice|语音)\s*:\s*([^\]]+)\]/gi, x = [];
      let _ = 0, $;
      for (; ($ = M.exec(C)) !== null; )
        $.index > _ && x.push({
          kind: "text",
          raw: C.slice(_, $.index),
          value: C.slice(_, $.index)
        }), $[1] !== void 0 ? x.push({
          kind: "image",
          raw: $[0],
          value: $[1].trim()
        }) : x.push({
          kind: "voice",
          raw: $[0],
          value: String($[3] ?? $[4] ?? "").trim(),
          emotion: String($[2] || "").trim().toLowerCase()
        }), _ = M.lastIndex;
      return _ < C.length && x.push({
        kind: "text",
        raw: C.slice(_),
        value: C.slice(_)
      }), x.length ? x : [{
        kind: "text",
        raw: C,
        value: C
      }];
    }
    const d = z(() => v(a.message.content)), m = z(() => a.message.ts ? new Intl.DateTimeFormat("zh-CN", {
      hour: "2-digit",
      minute: "2-digit"
    }).format(a.message.ts) : "");
    function S(C, M) {
      return `fw-${C}-${Date.now()}-${a.messageIndex}-${M}-${Math.random().toString(36).slice(2, 7)}`;
    }
    function h(C) {
      return C.result;
    }
    function A(C, M) {
      return l.has(M) && o[C]?.requestId === M;
    }
    async function L(C, M) {
      if (o[M]?.status === "loading" || o[M]?.status === "ready") return;
      if (!a.imageAvailable) {
        o[M] = {
          status: "unavailable",
          message: "画图能力未启用"
        };
        return;
      }
      const x = S("image", M);
      l.add(x), o[M] = {
        status: "loading",
        message: "查询图片缓存",
        requestId: x
      };
      const _ = {
        chatIdentity: a.chatIdentity,
        sessionId: a.sessionId
      };
      try {
        const $ = h(await a.bridge.request("fourth-wall/image-check", {
          ..._,
          tags: C.value,
          mediaRequestId: x
        }, 3e4));
        if (!A(M, x)) return;
        if (!$.available) {
          o[M] = {
            status: "unavailable",
            message: "画图能力未启用",
            requestId: x
          };
          return;
        }
        let F = $.cached || "";
        if (!F) {
          o[M] = {
            status: "loading",
            message: "正在生成图片",
            requestId: x
          };
          const Z = h(await a.bridge.request("fourth-wall/image-generate", {
            ..._,
            tags: C.value,
            mediaRequestId: x
          }, 18e4));
          if (!A(M, x)) return;
          F = Z.base64;
        }
        o[M] = {
          status: "ready",
          source: /^(?:data:|blob:|https?:)/i.test(F) ? F : `data:image/png;base64,${F}`
        };
      } catch ($) {
        A(M, x) && (o[M] = {
          status: "error",
          message: $ instanceof Error ? $.message : String($),
          requestId: x
        });
      } finally {
        l.delete(x);
      }
    }
    async function X(C, M) {
      if (!a.voiceAvailable) {
        o[M] = {
          status: "unavailable",
          message: "TTS 能力未启用"
        };
        return;
      }
      const x = o[M];
      if (x?.status === "loading") return;
      if (x?.status === "playing" && x.requestId) {
        a.bridge.post("fourth-wall/voice-stop", {
          chatIdentity: a.chatIdentity,
          mediaRequestId: x.requestId
        }), o[M] = { status: "idle" };
        return;
      }
      const _ = S("voice", M);
      l.add(_), o[M] = {
        status: "loading",
        message: "正在准备语音",
        requestId: _
      };
      try {
        await a.bridge.request("fourth-wall/voice-play", {
          chatIdentity: a.chatIdentity,
          sessionId: a.sessionId,
          mediaRequestId: _,
          text: C.value,
          emotion: C.emotion
        });
      } catch ($) {
        A(M, _) && (o[M] = {
          status: "error",
          message: $ instanceof Error ? $.message : String($),
          requestId: _
        }), l.delete(_);
      }
    }
    function V() {
      r.value = a.message.content, s.value = !0;
    }
    function W() {
      const C = r.value.trim();
      C && (n("edit", a.messageIndex, C), s.value = !1);
    }
    function G() {
      l.forEach((C) => {
        a.bridge.post("fourth-wall/image-cancel", {
          chatIdentity: a.chatIdentity,
          mediaRequestId: C
        }), a.bridge.post("fourth-wall/voice-stop", {
          chatIdentity: a.chatIdentity,
          mediaRequestId: C
        });
      }), l.clear();
    }
    function E() {
      d.value.forEach((C, M) => {
        C.kind === "image" && L(C, M);
      });
    }
    return ct(() => {
      u = a.bridge.subscribe((C) => {
        if (C.type === "fourth-wall/image-progress") {
          const M = C.payload, x = Object.keys(o).map(Number).find((_) => o[_]?.requestId === M.mediaRequestId);
          x !== void 0 && (o[x].message = M.status === "queued" ? `图片队列第 ${M.position || 1} 位` : "正在生成图片");
        }
        if (C.type === "fourth-wall/voice-state") {
          const M = C.payload, x = Object.keys(o).map(Number).find((_) => o[_]?.requestId === M.requestId);
          if (x === void 0) return;
          M.state === "playing" && (o[x].status = "playing"), (M.state === "ended" || M.state === "stopped") && (l.delete(String(M.requestId || "")), o[x] = { status: "idle" }), M.state === "error" && (l.delete(String(M.requestId || "")), o[x] = {
            status: "error",
            message: M.message || "语音播放失败"
          });
        }
      }), E();
    }), jt(() => a.message.content, () => {
      G(), Object.keys(o).forEach((C) => delete o[Number(C)]), E();
    }), lt(() => {
      u(), G();
    }), (C, M) => (g(), b("article", { class: ne(["fourth-wall-message", e.message.role === "user" ? "is-user" : "is-ai"]) }, [(e.message.role === "user" ? e.userAvatar : e.characterAvatar) ? (g(), b("img", {
      key: 0,
      class: "fourth-wall-avatar",
      src: e.message.role === "user" ? e.userAvatar : e.characterAvatar,
      alt: ""
    }, null, 8, bb)) : (g(), b("span", hb)), i("div", yb, [
      e.message.thinking ? (g(), b("details", kb, [M[3] || (M[3] = i("summary", null, "思考过程", -1)), i("div", null, y(e.message.thinking), 1)])) : q("", !0),
      i("div", wb, [s.value ? Te((g(), b("textarea", {
        key: 0,
        "onUpdate:modelValue": M[0] || (M[0] = (x) => r.value = x),
        class: "fourth-wall-edit",
        rows: "3"
      }, null, 512)), [[Ze, r.value]]) : (g(!0), b(te, { key: 1 }, me(d.value, (x, _) => (g(), b(te, { key: `${x.kind}-${_}` }, [x.kind === "text" ? (g(), b("span", xb, y(x.value), 1)) : x.kind === "image" ? (g(), b("figure", Sb, [o[_]?.status === "ready" ? (g(), b("img", {
        key: 0,
        src: o[_].source,
        alt: x.value
      }, null, 8, _b)) : o[_]?.status === "error" ? (g(), b("button", {
        key: 1,
        type: "button",
        onClick: ($) => L(x, _)
      }, [ge(y(x.raw), 1), i("small", null, y(o[_].message) + "，点此重试", 1)], 8, $b)) : o[_]?.status === "unavailable" ? (g(), b("div", Cb, [ge(y(x.raw), 1), i("small", null, y(o[_].message), 1)])) : (g(), b("div", Ab, [ge(y(x.raw), 1), i("small", null, y(o[_]?.message || "准备图片"), 1)]))])) : (g(), b("button", {
        key: 2,
        class: "fourth-wall-voice",
        type: "button",
        onClick: ($) => X(x, _)
      }, [
        i("span", Tb, y(o[_]?.status === "playing" ? "■" : "▶"), 1),
        i("span", null, y(x.value), 1),
        o[_]?.message ? (g(), b("small", Eb, y(o[_].message), 1)) : q("", !0)
      ], 8, Mb))], 64))), 128)), i("div", Ib, [s.value ? (g(), b(te, { key: 0 }, [i("button", {
        type: "button",
        onClick: W
      }, "保存"), i("button", {
        type: "button",
        onClick: M[1] || (M[1] = (x) => s.value = !1)
      }, "取消")], 64)) : (g(), b(te, { key: 1 }, [i("button", {
        type: "button",
        onClick: V
      }, "编辑"), i("button", {
        type: "button",
        onClick: M[2] || (M[2] = (x) => n("delete", e.messageIndex))
      }, "删除")], 64))])]),
      m.value ? (g(), b("time", Pb, y(m.value), 1)) : q("", !0)
    ])], 2));
  }
}), Lb = Ob, Rb = {
  key: 1,
  class: "fourth-wall-empty"
}, Nb = {
  key: 2,
  class: "fourth-wall-message is-ai is-streaming"
}, Db = ["src"], Bb = {
  key: 1,
  class: "fourth-wall-avatar is-placeholder"
}, qb = { class: "fourth-wall-message-stack" }, Ub = {
  key: 0,
  class: "fourth-wall-thinking",
  open: ""
}, Fb = { class: "fourth-wall-bubble" }, jb = {
  key: 0,
  class: "fourth-wall-unsaved"
}, Hb = /* @__PURE__ */ oe({
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
    const t = e, a = /* @__PURE__ */ Y(null), n = /* @__PURE__ */ Y(40), s = z(() => Math.max(0, t.history.length - n.value)), r = z(() => t.history.slice(s.value));
    function o() {
      n.value = Math.min(t.history.length, n.value + 40);
    }
    return jt(() => t.sessionId, () => {
      n.value = 40;
    }), jt(() => [t.history.length, t.generation.text], async () => {
      await an(), a.value && (a.value.scrollTop = a.value.scrollHeight);
    }, { immediate: !0 }), (l, u) => (g(), b("section", {
      ref_key: "viewport",
      ref: a,
      class: "fourth-wall-conversation",
      "aria-live": "polite"
    }, [
      s.value > 0 ? (g(), b("button", {
        key: 0,
        type: "button",
        class: "fourth-wall-earlier",
        onClick: o
      }, " 显示更早的 " + y(s.value) + " 条记录 ", 1)) : q("", !0),
      e.history.length === 0 && e.generation.status === "idle" ? (g(), b("div", Rb, [...u[2] || (u[2] = [
        i("span", null, "IV", -1),
        i("strong", null, "越过故事边界", -1),
        i("p", null, "这里是你与角色扮演者的皮下私聊。", -1)
      ])])) : q("", !0),
      (g(!0), b(te, null, me(r.value, (v, d) => (g(), he(Lb, {
        key: `${v.ts}-${s.value + d}`,
        message: v,
        "message-index": s.value + d,
        "chat-identity": e.chatIdentity,
        "session-id": e.sessionId,
        "user-avatar": e.userAvatar,
        "character-avatar": e.characterAvatar,
        "image-available": e.imageAvailable,
        "voice-available": e.voiceAvailable,
        bridge: e.bridge,
        onEdit: u[0] || (u[0] = (m, S) => l.$emit("edit", m, S)),
        onDelete: u[1] || (u[1] = (m) => l.$emit("delete", m))
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
      e.generation.status !== "idle" ? (g(), b("article", Nb, [e.characterAvatar ? (g(), b("img", {
        key: 0,
        class: "fourth-wall-avatar",
        src: e.characterAvatar,
        alt: ""
      }, null, 8, Db)) : (g(), b("span", Bb)), i("div", qb, [e.generation.thinking ? (g(), b("details", Ub, [u[3] || (u[3] = i("summary", null, "思考中", -1)), i("div", null, y(e.generation.thinking), 1)])) : q("", !0), i("div", Fb, [ge(y(e.generation.text || (e.generation.status === "error" ? e.generation.message : "等待回应...")) + " ", 1), e.generation.unsaved ? (g(), b("small", jb, "未保存")) : q("", !0)])])])) : q("", !0)
    ], 512));
  }
}), Kb = Hb, Gb = {
  class: "fourth-wall-modal",
  role: "dialog",
  "aria-modal": "true",
  "aria-label": "四次元壁提示词"
}, Vb = { class: "fourth-wall-prompt-fields" }, zb = /* @__PURE__ */ oe({
  __name: "FourthWallPromptEditor",
  props: { templates: {} },
  emits: [
    "close",
    "save",
    "restore"
  ],
  setup(e, { emit: t }) {
    const a = e, n = t, s = /* @__PURE__ */ Ot(structuredClone(/* @__PURE__ */ se(a.templates)));
    function r() {
      n("save", structuredClone(/* @__PURE__ */ se(s)));
    }
    return (o, l) => (g(), b("div", {
      class: "fourth-wall-modal-backdrop",
      onClick: l[6] || (l[6] = it((u) => n("close"), ["self"]))
    }, [i("section", Gb, [
      i("header", null, [l[7] || (l[7] = i("strong", null, "提示词模板", -1)), i("button", {
        type: "button",
        onClick: l[0] || (l[0] = (u) => n("close"))
      }, "关闭")]),
      i("div", Vb, [
        i("label", null, [l[8] || (l[8] = ge("Top User", -1)), Te(i("textarea", {
          "onUpdate:modelValue": l[1] || (l[1] = (u) => s.topuser = u),
          rows: "5"
        }, null, 512), [[Ze, s.topuser]])]),
        i("label", null, [l[9] || (l[9] = ge("Confirm", -1)), Te(i("textarea", {
          "onUpdate:modelValue": l[2] || (l[2] = (u) => s.confirm = u),
          rows: "3"
        }, null, 512), [[Ze, s.confirm]])]),
        i("label", null, [l[10] || (l[10] = ge("Meta Protocol", -1)), Te(i("textarea", {
          "onUpdate:modelValue": l[3] || (l[3] = (u) => s.metaProtocol = u),
          rows: "12"
        }, null, 512), [[Ze, s.metaProtocol]])]),
        i("label", null, [l[11] || (l[11] = ge("Bottom", -1)), Te(i("textarea", {
          "onUpdate:modelValue": l[4] || (l[4] = (u) => s.bottom = u),
          rows: "5"
        }, null, 512), [[Ze, s.bottom]])])
      ]),
      i("footer", null, [i("button", {
        type: "button",
        class: "is-danger",
        onClick: l[5] || (l[5] = (u) => n("restore"))
      }, "恢复默认"), i("button", {
        type: "button",
        class: "is-primary",
        onClick: r
      }, "保存")])
    ])]));
  }
}), Wb = zb, Yb = { class: "fourth-wall-settings-section" }, Xb = { class: "fourth-wall-session-row" }, Jb = ["value", "disabled"], Qb = ["value"], Zb = ["disabled"], eh = ["disabled"], th = ["disabled"], ah = /* @__PURE__ */ oe({
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
    function s(o, l) {
      const u = window.prompt("重命名记录", l)?.trim();
      u && a("rename", o, u);
    }
    function r(o) {
      window.confirm("确定删除当前记录吗？") && a("delete", o);
    }
    return (o, l) => (g(), b("section", Yb, [l[3] || (l[3] = i("h3", null, "聊天记录", -1)), i("div", Xb, [
      i("select", {
        value: e.activeSessionId,
        disabled: e.disabled,
        onChange: l[0] || (l[0] = (u) => a("switch", u.target.value))
      }, [(g(!0), b(te, null, me(e.sessions, (u) => (g(), b("option", {
        key: u.id,
        value: u.id
      }, y(u.name), 9, Qb))), 128))], 40, Jb),
      i("button", {
        type: "button",
        disabled: e.disabled,
        title: "新建记录",
        onClick: n
      }, "＋", 8, Zb),
      i("button", {
        type: "button",
        disabled: e.disabled,
        title: "重命名记录",
        onClick: l[1] || (l[1] = (u) => s(e.activeSessionId, e.sessions.find((v) => v.id === e.activeSessionId)?.name || ""))
      }, " 改 ", 8, eh),
      i("button", {
        type: "button",
        disabled: e.disabled || e.sessions.length <= 1,
        title: "删除记录",
        class: "is-danger",
        onClick: l[2] || (l[2] = (u) => r(e.activeSessionId))
      }, " 删 ", 8, th)
    ])]));
  }
}), nh = ah, sh = {
  class: "fourth-wall-settings",
  "aria-label": "四次元壁设置"
}, ih = { class: "fourth-wall-settings-scroll" }, rh = { class: "fourth-wall-settings-section" }, lh = { class: "is-toggle" }, oh = { class: "is-toggle" }, uh = ["disabled"], dh = { class: "fourth-wall-settings-section" }, ch = { class: "is-toggle" }, fh = { class: "is-toggle" }, vh = { class: "is-toggle" }, ph = { key: 0 }, gh = ["disabled"], mh = { class: "fourth-wall-settings-section is-actions" }, bh = /* @__PURE__ */ oe({
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
    const a = e, n = t, s = /* @__PURE__ */ Ot(structuredClone(/* @__PURE__ */ se(a.chat.settings))), r = /* @__PURE__ */ Ot(structuredClone(/* @__PURE__ */ se(a.global)));
    function o() {
      n("updateChat", structuredClone(/* @__PURE__ */ se(s)));
    }
    function l() {
      n("updateGlobal", {
        image: structuredClone(/* @__PURE__ */ se(r.image)),
        voice: structuredClone(/* @__PURE__ */ se(r.voice)),
        commentary: structuredClone(/* @__PURE__ */ se(r.commentary))
      });
    }
    return (u, v) => (g(), b("aside", sh, [i("header", null, [v[14] || (v[14] = i("strong", null, "四次元壁设置", -1)), i("button", {
      type: "button",
      onClick: v[0] || (v[0] = (d) => n("close"))
    }, "关闭")]), i("div", ih, [
      Ce(nh, {
        sessions: e.chat.sessions,
        "active-session-id": e.chat.activeSessionId,
        disabled: e.busy,
        onSwitch: v[1] || (v[1] = (d) => n("switchSession", d)),
        onAdd: v[2] || (v[2] = (d) => n("addSession", d)),
        onRename: v[3] || (v[3] = (d, m) => n("renameSession", d, m)),
        onDelete: v[4] || (v[4] = (d) => n("deleteSession", d))
      }, null, 8, [
        "sessions",
        "active-session-id",
        "disabled"
      ]),
      i("section", rh, [
        v[19] || (v[19] = i("h3", null, "上下文", -1)),
        i("label", null, [v[15] || (v[15] = ge("普通聊天层数", -1)), Te(i("input", {
          "onUpdate:modelValue": v[5] || (v[5] = (d) => s.maxChatLayers = d),
          type: "number",
          min: "1",
          max: "9999"
        }, null, 512), [[
          Ze,
          s.maxChatLayers,
          void 0,
          { number: !0 }
        ]])]),
        i("label", null, [v[16] || (v[16] = ge("皮下聊天轮数", -1)), Te(i("input", {
          "onUpdate:modelValue": v[6] || (v[6] = (d) => s.maxMetaTurns = d),
          type: "number",
          min: "1",
          max: "9999"
        }, null, 512), [[
          Ze,
          s.maxMetaTurns,
          void 0,
          { number: !0 }
        ]])]),
        i("label", lh, [v[17] || (v[17] = i("span", null, "流式生成", -1)), Te(i("input", {
          "onUpdate:modelValue": v[7] || (v[7] = (d) => s.stream = d),
          type: "checkbox"
        }, null, 512), [[Ia, s.stream]])]),
        i("label", oh, [v[18] || (v[18] = i("span", null, "禁用 Assistant Prefill", -1)), Te(i("input", {
          "onUpdate:modelValue": v[8] || (v[8] = (d) => s.disableAssistantPrefill = d),
          type: "checkbox"
        }, null, 512), [[Ia, s.disableAssistantPrefill]])]),
        i("button", {
          type: "button",
          class: "is-primary",
          disabled: e.busy,
          onClick: o
        }, "保存上下文设置", 8, uh)
      ]),
      i("section", dh, [
        v[23] || (v[23] = i("h3", null, "能力", -1)),
        i("label", ch, [v[20] || (v[20] = i("span", null, "在提示词中允许图片", -1)), Te(i("input", {
          "onUpdate:modelValue": v[9] || (v[9] = (d) => r.image.enablePrompt = d),
          type: "checkbox"
        }, null, 512), [[Ia, r.image.enablePrompt]])]),
        i("label", fh, [v[21] || (v[21] = i("span", null, "在提示词中允许语音", -1)), Te(i("input", {
          "onUpdate:modelValue": v[10] || (v[10] = (d) => r.voice.enabled = d),
          type: "checkbox"
        }, null, 512), [[Ia, r.voice.enabled]])]),
        i("label", vh, [v[22] || (v[22] = i("span", null, "实时吐槽", -1)), Te(i("input", {
          "onUpdate:modelValue": v[11] || (v[11] = (d) => r.commentary.enabled = d),
          type: "checkbox"
        }, null, 512), [[Ia, r.commentary.enabled]])]),
        r.commentary.enabled ? (g(), b("label", ph, [ge(" 吐槽概率 " + y(r.commentary.probability) + "% ", 1), Te(i("input", {
          "onUpdate:modelValue": v[12] || (v[12] = (d) => r.commentary.probability = d),
          type: "range",
          min: "1",
          max: "99"
        }, null, 512), [[
          Ze,
          r.commentary.probability,
          void 0,
          { number: !0 }
        ]])])) : q("", !0),
        i("button", {
          type: "button",
          class: "is-primary",
          disabled: e.busy,
          onClick: l
        }, "保存能力设置", 8, gh)
      ]),
      i("section", mh, [i("button", {
        type: "button",
        onClick: v[13] || (v[13] = (d) => n("openPrompts"))
      }, "提示词模板")])
    ])]));
  }
}), hh = bh, yh = { class: "fourth-wall-app" }, kh = { class: "fourth-wall-header" }, wh = { class: "fourth-wall-heading" }, xh = { class: "fourth-wall-header-actions" }, Sh = ["disabled"], _h = ["disabled"], $h = {
  key: 0,
  class: "fourth-wall-error",
  role: "alert"
}, Ch = { class: "fourth-wall-composer" }, Ah = ["disabled"], Mh = ["disabled"], Th = 35e3, Eh = /* @__PURE__ */ oe({
  __name: "FourthWallApp",
  props: {
    bridge: {},
    initialState: {}
  },
  setup(e) {
    const t = e, a = /* @__PURE__ */ Y(structuredClone(/* @__PURE__ */ se(t.initialState))), n = /* @__PURE__ */ Y(""), s = /* @__PURE__ */ Y(!1), r = /* @__PURE__ */ Y(!1), o = /* @__PURE__ */ Y(!1), l = /* @__PURE__ */ Y(""), u = /* @__PURE__ */ Y(!1), v = /* @__PURE__ */ Y({
      status: "idle",
      sessionId: "",
      text: "",
      thinking: "",
      message: "",
      unsaved: !1
    });
    let d = () => {
    };
    const m = z(() => a.value.chat.sessions.find((_) => _.id === a.value.chat.activeSessionId)), S = z(() => v.value.status === "started" || v.value.status === "progress");
    function h(_ = m.value.id) {
      return {
        chatIdentity: a.value.chatIdentity,
        sessionId: _
      };
    }
    function A(_) {
      return structuredClone(_.result);
    }
    async function L(_, $) {
      o.value = !0, l.value = "";
      try {
        a.value = A(await t.bridge.request(_, $, Th));
      } catch (F) {
        l.value = F instanceof Error ? F.message : String(F);
      } finally {
        o.value = !1;
      }
    }
    async function X() {
      const _ = n.value.trim();
      !_ || S.value || o.value || (n.value = "", v.value = {
        status: "started",
        sessionId: m.value.id,
        text: "",
        thinking: "",
        message: "",
        unsaved: !1
      }, await L("fourth-wall/send", {
        ...h(),
        content: _
      }), l.value && (v.value.status = "idle"));
    }
    async function V() {
      S.value || o.value || (v.value = {
        status: "started",
        sessionId: m.value.id,
        text: "",
        thinking: "",
        message: "",
        unsaved: !1
      }, await L("fourth-wall/regenerate", h()), l.value && (v.value.status = "idle"));
    }
    function W() {
      t.bridge.post("fourth-wall/cancel", h());
    }
    function G(_) {
      _.key !== "Enter" || _.shiftKey || u.value || (_.preventDefault(), S.value ? W() : X());
    }
    function E(_) {
      window.confirm("确定删除这条消息吗？") && L("fourth-wall/delete-message", {
        ...h(),
        messageIndex: _
      });
    }
    function C() {
      window.confirm("确定清空当前记录吗？") && L("fourth-wall/clear-history", h());
    }
    function M(_) {
      L("fourth-wall/update-chat-settings", {
        ...h(),
        patch: _
      });
    }
    function x(_) {
      L("fourth-wall/update-global-settings", {
        ...h(),
        patch: _
      });
    }
    return ct(() => {
      d = t.bridge.subscribe((_) => {
        if (_.type === "fourth-wall/state" && (a.value = structuredClone(_.payload.state)), _.type !== "fourth-wall/generation") return;
        const $ = _.payload;
        if (!($.sessionId && $.sessionId !== m.value.id)) {
          if ($.status === "complete" || $.status === "cancelled") {
            v.value = {
              status: "idle",
              sessionId: "",
              text: "",
              thinking: "",
              message: "",
              unsaved: !1
            };
            return;
          }
          if ($.status === "error") {
            l.value = $.message || "生成失败", v.value = $.kind === "save" && ($.draft?.text || $.draft?.thinking) ? {
              status: "error",
              sessionId: $.sessionId || m.value.id,
              text: $.draft?.text || "",
              thinking: $.draft?.thinking || "",
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
          v.value = {
            status: $.status || "progress",
            sessionId: $.sessionId || m.value.id,
            text: $.text || v.value.text,
            thinking: $.thinking || v.value.thinking,
            message: "",
            unsaved: !1
          };
        }
      });
    }), lt(() => d()), (_, $) => (g(), b("main", yh, [
      i("header", kh, [i("div", wh, [$[17] || ($[17] = i("span", null, "IV", -1)), i("div", null, [$[16] || ($[16] = i("strong", null, "四次元壁", -1)), i("small", null, y(m.value.name), 1)])]), i("div", xh, [
        i("button", {
          type: "button",
          title: "重答",
          disabled: o.value || S.value,
          onClick: V
        }, "↻", 8, Sh),
        i("button", {
          type: "button",
          title: "清空当前记录",
          "aria-label": "清空当前记录",
          disabled: o.value,
          onClick: C
        }, [...$[18] || ($[18] = [i("svg", {
          viewBox: "0 0 24 24",
          "aria-hidden": "true"
        }, [i("path", { d: "M4 7h16M9 7V4h6v3m3 0-1 13H7L6 7m4 4v5m4-5v5" })], -1)])], 8, _h),
        i("button", {
          type: "button",
          title: "设置",
          onClick: $[0] || ($[0] = (F) => s.value = !0)
        }, "⚙")
      ])]),
      l.value ? (g(), b("div", $h, [i("span", null, y(l.value), 1), i("button", {
        type: "button",
        onClick: $[1] || ($[1] = (F) => l.value = "")
      }, "×")])) : q("", !0),
      Ce(Kb, {
        history: m.value.history,
        "session-id": m.value.id,
        "chat-identity": a.value.chatIdentity,
        "user-avatar": a.value.userAvatar,
        "character-avatar": a.value.characterAvatar,
        "image-available": a.value.capabilities.image.available,
        "voice-available": a.value.capabilities.voice.available,
        generation: v.value,
        bridge: e.bridge,
        onEdit: $[2] || ($[2] = (F, Z) => L("fourth-wall/edit-message", {
          ...h(),
          messageIndex: F,
          content: Z
        })),
        onDelete: E
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
      i("footer", Ch, [Te(i("textarea", {
        "onUpdate:modelValue": $[3] || ($[3] = (F) => n.value = F),
        rows: "1",
        placeholder: "聊点什么...",
        disabled: o.value,
        onCompositionstart: $[4] || ($[4] = (F) => u.value = !0),
        onCompositionend: $[5] || ($[5] = (F) => u.value = !1),
        onKeydown: G
      }, null, 40, Ah), [[Ze, n.value]]), i("button", {
        type: "button",
        class: ne({ "is-stop": S.value }),
        disabled: o.value,
        onClick: $[6] || ($[6] = (F) => S.value ? W() : X())
      }, y(S.value ? "■" : "↑"), 11, Mh)]),
      s.value ? (g(), he(hh, {
        key: 1,
        chat: a.value.chat,
        global: a.value.global,
        busy: o.value || S.value,
        onClose: $[7] || ($[7] = (F) => s.value = !1),
        onUpdateChat: M,
        onUpdateGlobal: x,
        onSwitchSession: $[8] || ($[8] = (F) => L("fourth-wall/switch-session", {
          ...h(),
          targetSessionId: F
        })),
        onAddSession: $[9] || ($[9] = (F) => L("fourth-wall/add-session", {
          ...h(),
          name: F
        })),
        onRenameSession: $[10] || ($[10] = (F, Z) => L("fourth-wall/rename-session", {
          ...h(F),
          name: Z
        })),
        onDeleteSession: $[11] || ($[11] = (F) => L("fourth-wall/delete-session", h(F))),
        onOpenPrompts: $[12] || ($[12] = (F) => r.value = !0)
      }, null, 8, [
        "chat",
        "global",
        "busy"
      ])) : q("", !0),
      r.value ? (g(), he(Wb, {
        key: 2,
        templates: a.value.global.promptTemplates,
        onClose: $[13] || ($[13] = (F) => r.value = !1),
        onSave: $[14] || ($[14] = (F) => {
          x({ promptTemplates: F }), r.value = !1;
        }),
        onRestore: $[15] || ($[15] = () => {
          L("fourth-wall/restore-prompts", h()), r.value = !1;
        })
      }, null, 8, ["templates"])) : q("", !0)
    ]));
  }
}), Ih = Eh, Ph = Object.freeze({
  id: "shop",
  name: "奇物商店",
  accent: "#a83b32"
}), Oh = ["aria-labelledby"], Lh = ["id"], Rh = { class: "shop-dialog-item" }, Nh = { "aria-hidden": "true" }, Dh = [
  "onUpdate:modelValue",
  "maxlength",
  "placeholder"
], Bh = {
  key: 0,
  class: "shop-dialog-error",
  role: "alert"
}, qh = { class: "shop-dialog-actions" }, Uh = ["disabled"], Fh = ["disabled"], jh = /* @__PURE__ */ oe({
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
    const a = e, n = t, s = /* @__PURE__ */ Ot({}), r = z(() => a.mode === "purchase" ? "确认购入" : a.mode === "deactivate" ? "关闭效果" : "确认使用"), o = z(() => a.mode === "purchase" ? `将支付 ${a.item.price} 小白币，奇物会先放入背包。` : a.mode === "deactivate" ? "关闭后将从下一次回复起停止影响剧情，已经发生的事实不会消失。" : a.item.duration === "permanent" ? "这件奇物将永久影响后续剧情，使用后无法关闭。" : `使用后从下一次回复起${a.item.durationLabel}。`), l = z(() => a.mode !== "use" || a.item.inputs.every((v) => String(s[v.key] || "").trim().length > 0));
    function u() {
      !a.busy && l.value && n("confirm", { ...s });
    }
    return (v, d) => (g(), b("dialog", {
      open: "",
      class: "shop-dialog",
      "aria-labelledby": `shop-dialog-${e.mode}`,
      onClick: d[1] || (d[1] = it((m) => !e.busy && v.$emit("cancel"), ["self"])),
      onKeydown: d[2] || (d[2] = dl(it((m) => !e.busy && v.$emit("cancel"), ["stop", "prevent"]), ["esc"]))
    }, [i("form", {
      method: "dialog",
      class: "shop-dialog-card",
      onSubmit: it(u, ["prevent"])
    }, [
      d[3] || (d[3] = i("span", { class: "shop-dialog-kicker" }, "SEALED DECISION", -1)),
      i("h2", { id: `shop-dialog-${e.mode}` }, y(r.value), 9, Lh),
      i("div", Rh, [i("span", Nh, y(e.item.name.slice(0, 1)), 1), i("div", null, [i("strong", null, y(e.item.name), 1), i("small", null, y(e.item.durationLabel), 1)])]),
      (g(!0), b(te, null, me(e.mode === "use" ? e.item.inputs : [], (m) => (g(), b("label", {
        key: m.key,
        class: "shop-dialog-field"
      }, [i("span", null, y(m.label), 1), Te(i("input", {
        "onUpdate:modelValue": (S) => s[m.key] = S,
        type: "text",
        maxlength: m.maxLength,
        placeholder: m.placeholder,
        autocomplete: "off",
        required: ""
      }, null, 8, Dh), [[Ze, s[m.key]]])]))), 128)),
      i("p", { class: ne(["shop-dialog-warning", { "is-permanent": e.mode === "use" && e.item.duration === "permanent" }]) }, y(o.value), 3),
      e.error ? (g(), b("p", Bh, y(e.error), 1)) : q("", !0),
      i("div", qh, [i("button", {
        type: "button",
        disabled: e.busy,
        onClick: d[0] || (d[0] = (m) => v.$emit("cancel"))
      }, "再想想", 8, Uh), i("button", {
        type: "submit",
        class: "is-primary",
        disabled: e.busy || !l.value
      }, y(e.busy ? "正在封存…" : e.mode === "purchase" ? "确认支付" : e.mode === "deactivate" ? "确认关闭" : "确认使用"), 9, Fh)])
    ], 32)], 40, Oh));
  }
}), Hh = jh, Kh = {
  class: "shop-inventory",
  "aria-labelledby": "shop-inventory-title"
}, Gh = { class: "shop-section-heading" }, Vh = {
  key: 0,
  class: "shop-write-reason",
  role: "status"
}, zh = {
  class: "shop-inventory-group",
  "aria-labelledby": "shop-active-title"
}, Wh = {
  key: 0,
  class: "shop-activation-list"
}, Yh = {
  class: "shop-mini-mark",
  "aria-hidden": "true"
}, Xh = [
  "disabled",
  "title",
  "onClick"
], Jh = {
  key: 1,
  class: "shop-empty-copy"
}, Qh = {
  class: "shop-inventory-group",
  "aria-labelledby": "shop-held-title"
}, Zh = {
  key: 0,
  class: "shop-held-grid"
}, ey = {
  class: "shop-mini-mark",
  "aria-hidden": "true"
}, ty = [
  "disabled",
  "title",
  "onClick"
], ay = {
  key: 1,
  class: "shop-empty-copy"
}, ny = {
  key: 1,
  class: "shop-inventory-group is-exhausted"
}, sy = ["aria-expanded"], iy = {
  key: 0,
  class: "shop-exhausted-list"
}, ry = { key: 0 }, ly = /* @__PURE__ */ oe({
  __name: "ShopInventory",
  props: {
    catalog: {},
    activations: {},
    writeDisabledReason: {}
  },
  emits: ["use", "deactivate"],
  setup(e) {
    const t = e, a = /* @__PURE__ */ Y(!1), n = z(() => t.activations.filter((l) => l.state === "active")), s = z(() => t.catalog.filter((l) => l.quantity > 0)), r = z(() => t.catalog.filter((l) => l.purchasedCount > 0 && l.quantity === 0)), o = z(() => {
      const l = /* @__PURE__ */ new Map();
      for (const u of t.activations) u.state !== "active" && l.set(u.itemId, (l.get(u.itemId) || 0) + 1);
      return l;
    });
    return (l, u) => (g(), b("section", Kh, [
      i("header", Gh, [u[1] || (u[1] = i("div", null, [i("span", null, "PRIVATE COLLECTION"), i("h2", { id: "shop-inventory-title" }, "我的奇物")], -1)), i("small", null, y(s.value.reduce((v, d) => v + d.quantity, 0)) + " 件可用", 1)]),
      e.writeDisabledReason ? (g(), b("p", Vh, y(e.writeDisabledReason), 1)) : q("", !0),
      i("section", zh, [i("header", null, [u[2] || (u[2] = i("h3", { id: "shop-active-title" }, "生效中", -1)), i("span", null, y(n.value.length), 1)]), n.value.length ? (g(), b("div", Wh, [(g(!0), b(te, null, me(n.value, (v) => (g(), b("article", {
        key: v.activationId,
        class: "shop-activation-card"
      }, [
        i("div", Yh, y(v.name.slice(0, 1)), 1),
        i("div", null, [
          i("h4", null, y(v.name), 1),
          (g(!0), b(te, null, me(v.parameters, (d) => (g(), b("p", { key: d.label }, [i("span", null, y(d.label), 1), ge(y(d.value), 1)]))), 128)),
          i("small", null, y(v.stateLabel), 1)
        ]),
        v.canDeactivate ? (g(), b("button", {
          key: 0,
          type: "button",
          disabled: !!e.writeDisabledReason,
          title: e.writeDisabledReason,
          onClick: (d) => l.$emit("deactivate", v)
        }, " 关闭 ", 8, Xh)) : q("", !0)
      ]))), 128))])) : (g(), b("p", Jh, "尚无正在影响剧情的奇物。"))]),
      i("section", Qh, [i("header", null, [u[3] || (u[3] = i("h3", { id: "shop-held-title" }, "持有", -1)), i("span", null, y(s.value.length), 1)]), s.value.length ? (g(), b("div", Zh, [(g(!0), b(te, null, me(s.value, (v) => (g(), b("article", {
        key: v.id,
        class: "shop-held-card"
      }, [
        i("div", ey, y(v.name.slice(0, 1)), 1),
        i("div", null, [i("h4", null, y(v.name), 1), i("p", null, y(v.durationLabel), 1)]),
        i("strong", null, "×" + y(v.quantity), 1),
        i("button", {
          type: "button",
          disabled: !!e.writeDisabledReason,
          title: e.writeDisabledReason,
          onClick: (d) => l.$emit("use", v)
        }, " 使用 ", 8, ty)
      ]))), 128))])) : (g(), b("p", ay, "背包还是空的，去货架挑一件吧。"))]),
      r.value.length ? (g(), b("section", ny, [i("button", {
        type: "button",
        class: "shop-collapse-button",
        "aria-expanded": a.value,
        onClick: u[0] || (u[0] = (v) => a.value = !a.value)
      }, [
        u[4] || (u[4] = i("span", null, "已耗尽", -1)),
        i("small", null, y(r.value.length), 1),
        u[5] || (u[5] = i("i", { "aria-hidden": "true" }, "⌄", -1))
      ], 8, sy), a.value ? (g(), b("div", iy, [(g(!0), b(te, null, me(r.value, (v) => (g(), b("article", { key: v.id }, [i("span", null, y(v.name), 1), i("small", null, [ge("购入 " + y(v.purchasedCount) + " 次", 1), o.value.get(v.id) ? (g(), b("span", ry, " · 已结束 " + y(o.value.get(v.id)), 1)) : q("", !0)])]))), 128))])) : q("", !0)])) : q("", !0)
    ]));
  }
}), oy = ly, uy = {
  class: "shop-shelf",
  "aria-labelledby": "shop-shelf-title"
}, dy = { class: "shop-section-heading" }, cy = {
  class: "shop-category-strip",
  "aria-label": "商品分类"
}, fy = ["onClick"], vy = { class: "shop-product-grid" }, py = {
  class: "shop-product-mark",
  "aria-hidden": "true"
}, gy = { class: "shop-product-copy" }, my = { class: "shop-product-title" }, by = { class: "shop-product-footer" }, hy = { key: 0 }, yy = [
  "disabled",
  "title",
  "onClick"
], ky = {
  key: 0,
  class: "shop-card-reason"
}, wy = /* @__PURE__ */ oe({
  __name: "ShopShelf",
  props: {
    catalog: {},
    balance: {},
    writeDisabledReason: {}
  },
  emits: ["purchase"],
  setup(e) {
    const t = e, a = /* @__PURE__ */ Y("all"), n = z(() => {
      const l = /* @__PURE__ */ new Map();
      for (const u of t.catalog) l.set(u.category, u.categoryLabel);
      return [{
        id: "all",
        label: "全部"
      }, ...Array.from(l, ([u, v]) => ({
        id: u,
        label: v
      }))];
    }), s = z(() => a.value === "all" ? t.catalog : t.catalog.filter((l) => l.category === a.value));
    function r(l) {
      return t.writeDisabledReason ? t.writeDisabledReason : o(l);
    }
    function o(l) {
      return l.purchaseLimit !== null && l.purchasedCount >= l.purchaseLimit ? "此奇物已达购买上限" : t.balance < l.price ? `还差 ${l.price - t.balance} 小白币` : "";
    }
    return (l, u) => (g(), b("section", uy, [
      i("header", dy, [u[0] || (u[0] = i("div", null, [i("span", null, "CURIO CABINET"), i("h2", { id: "shop-shelf-title" }, "今日陈列")], -1)), i("small", null, y(s.value.length) + " 件奇物", 1)]),
      i("nav", cy, [(g(!0), b(te, null, me(n.value, (v) => (g(), b("button", {
        key: v.id,
        type: "button",
        class: ne({ "is-active": a.value === v.id }),
        onClick: (d) => a.value = v.id
      }, y(v.label), 11, fy))), 128))]),
      i("div", vy, [(g(!0), b(te, null, me(s.value, (v) => (g(), b("article", {
        key: v.id,
        class: "shop-product-card"
      }, [i("div", py, y(v.name.slice(0, 1)), 1), i("div", gy, [
        i("div", my, [i("h3", null, y(v.name), 1), i("span", null, y(v.categoryLabel), 1)]),
        i("p", null, y(v.description), 1),
        i("small", null, y(v.durationLabel), 1),
        i("div", by, [
          i("strong", null, [u[1] || (u[1] = i("i", null, "¤", -1)), ge(y(v.price), 1)]),
          v.quantity ? (g(), b("span", hy, "持有 " + y(v.quantity), 1)) : q("", !0),
          i("button", {
            type: "button",
            disabled: !!r(v),
            title: r(v),
            onClick: (d) => l.$emit("purchase", v)
          }, y(v.purchaseLimit !== null && v.purchasedCount >= v.purchaseLimit ? "已购得" : "购入"), 9, yy)
        ]),
        o(v) ? (g(), b("p", ky, y(o(v)), 1)) : q("", !0)
      ])]))), 128))])
    ]));
  }
}), xy = wy, Sy = { class: "shop-app" }, _y = { class: "shop-header" }, $y = {
  class: "shop-balance",
  "aria-label": "小白币余额"
}, Cy = ["disabled"], Ay = {
  class: "shop-root-tabs",
  "aria-label": "商店页面"
}, My = { key: 0 }, Ty = ["disabled"], Ey = ["disabled"], Iy = { class: "shop-scroll" }, rs = 35e3, Py = /* @__PURE__ */ oe({
  __name: "ShopApp",
  props: {
    bridge: {},
    initialState: {}
  },
  setup(e) {
    const t = e, a = /* @__PURE__ */ Y(structuredClone(/* @__PURE__ */ se(t.initialState))), n = /* @__PURE__ */ Y("shelf"), s = /* @__PURE__ */ Y(null), r = /* @__PURE__ */ Y(!1), o = /* @__PURE__ */ Y(!1), l = /* @__PURE__ */ Y(""), u = /* @__PURE__ */ Y("");
    let v = () => {
    }, d = 0;
    const m = z(() => a.value.status === "unconfirmed"), S = z(() => o.value ? "正在处理上一项操作" : r.value ? "正在刷新商店状态" : a.value.status !== "ready" ? a.value.message || "商店暂时不可写入" : a.value.generationActive ? "主剧情正在生成，请等待回复完成" : ""), h = z(() => r.value || o.value || m.value);
    function A() {
      return typeof globalThis.crypto?.randomUUID == "function" ? `shop-ui:${globalThis.crypto.randomUUID()}` : `shop-ui:${Date.now()}:${Math.random().toString(36).slice(2, 10)}`;
    }
    function L() {
      return { chatIdentity: a.value.chatIdentity };
    }
    function X(x) {
      a.value = structuredClone(x), r.value = !1, l.value = "";
    }
    function V(x) {
      const _ = x instanceof Error ? x.message : String(x);
      return _.includes("cannot be overdrawn") ? "小白币余额不足，未完成购买。" : _.includes("shop_main_generation_active") ? "主剧情正在生成，请等待回复完成。" : _.includes("shop_revision_conflict") || _.includes("shop_event_id_conflict") ? "商店状态已变化，请关闭确认框后重试。" : _ === "host_request_timeout" ? "等待保存结果超时，请使用同一确认框重试。" : "商店操作未完成，请稍后重试。";
    }
    async function W() {
      if (h.value) return;
      const x = ++d;
      r.value = !0, l.value = "";
      try {
        const _ = await t.bridge.request("shop/refresh", L(), rs);
        x === d && X(_.result);
      } catch (_) {
        x === d && (l.value = V(_));
      } finally {
        x === d && (r.value = !1);
      }
    }
    async function G() {
      if (r.value || o.value) return;
      const x = ++d;
      r.value = !0, l.value = "";
      try {
        const _ = await t.bridge.request("shop/confirm-save", L(), rs);
        x === d && X(_.result.state);
      } catch (_) {
        x === d && (l.value = V(_));
      } finally {
        x === d && (r.value = !1);
      }
    }
    function E(x, _, $) {
      S.value || (u.value = "", s.value = {
        mode: x,
        item: _,
        activation: $,
        actionId: A()
      });
    }
    function C() {
      o.value || (s.value = null, u.value = "");
    }
    async function M(x) {
      const _ = s.value;
      if (!_ || o.value) return;
      o.value = !0, u.value = "";
      const $ = d, F = _.mode === "purchase" ? "shop/purchase" : _.mode === "use" ? "shop/activate" : "shop/deactivate";
      try {
        const Z = await t.bridge.request(F, {
          ...L(),
          expectedRevision: a.value.revision,
          expectedEventId: a.value.eventId,
          actionId: _.actionId,
          itemId: _.item.id,
          ..._.mode === "use" ? { parameters: x } : {},
          ..._.activation ? { activationId: _.activation.activationId } : {}
        }, rs);
        if ($ !== d || s.value !== _) return;
        X(Z.result), s.value = null;
      } catch (Z) {
        $ === d && s.value === _ && (u.value = V(Z));
      } finally {
        $ === d && (o.value = !1);
      }
    }
    return ct(() => {
      v = t.bridge.subscribe((x) => {
        x.type === "shop/state" && (o.value || (d += 1), X(x.payload.state)), x.type === "shop/error" && (l.value = V(x.payload?.message || ""));
      });
    }), lt(() => {
      d += 1, v(), s.value = null;
    }), (x, _) => (g(), b("main", Sy, [
      i("header", _y, [
        _[7] || (_[7] = i("div", null, [i("span", { class: "shop-header-kicker" }, "VERMILION CABINET"), i("h1", null, "奇物商店")], -1)),
        i("div", $y, [_[5] || (_[5] = i("small", null, "余额", -1)), i("strong", null, "¤ " + y(a.value.balance), 1)]),
        i("button", {
          type: "button",
          class: "shop-refresh",
          disabled: h.value,
          title: "重新读取商店",
          onClick: W
        }, [..._[6] || (_[6] = [i("svg", {
          viewBox: "0 0 24 24",
          "aria-hidden": "true"
        }, [i("path", { d: "M20 7v5h-5M4 17v-5h5M18.2 9A7 7 0 0 0 6.1 6.7L4 9m16 6-2.1 2.3A7 7 0 0 1 5.8 15" })], -1), i("span", { class: "shop-sr-only" }, "重新读取商店", -1)])], 8, Cy)
      ]),
      i("nav", Ay, [i("button", {
        type: "button",
        class: ne({ "is-active": n.value === "shelf" }),
        onClick: _[0] || (_[0] = ($) => n.value = "shelf")
      }, "货架", 2), i("button", {
        type: "button",
        class: ne({ "is-active": n.value === "inventory" }),
        onClick: _[1] || (_[1] = ($) => n.value = "inventory")
      }, [_[8] || (_[8] = ge(" 背包", -1)), a.value.catalog.some(($) => $.quantity) ? (g(), b("span", My, y(a.value.catalog.reduce(($, F) => $ + F.quantity, 0)), 1)) : q("", !0)], 2)]),
      a.value.message || l.value ? (g(), b("aside", {
        key: 0,
        class: ne(["shop-notice", `is-${a.value.status}`]),
        role: "status"
      }, [_[9] || (_[9] = i("span", { "aria-hidden": "true" }, "印", -1)), i("div", null, [
        i("strong", null, y(a.value.status === "unconfirmed" ? "保存待核实" : a.value.status === "conflict" ? "状态冲突" : "商店状态"), 1),
        i("p", null, y(l.value || a.value.message), 1),
        m.value ? (g(), b("button", {
          key: 0,
          type: "button",
          disabled: r.value,
          onClick: G
        }, y(r.value ? "正在核实…" : "核实保存结果"), 9, Ty)) : a.value.status === "blocked" ? (g(), b("button", {
          key: 1,
          type: "button",
          disabled: r.value,
          onClick: W
        }, y(r.value ? "正在读取…" : "重新读取"), 9, Ey)) : q("", !0)
      ])], 2)) : q("", !0),
      i("div", Iy, [n.value === "shelf" ? (g(), he(xy, {
        key: 0,
        catalog: a.value.catalog,
        balance: a.value.balance,
        "write-disabled-reason": S.value,
        onPurchase: _[2] || (_[2] = ($) => E("purchase", $))
      }, null, 8, [
        "catalog",
        "balance",
        "write-disabled-reason"
      ])) : (g(), he(oy, {
        key: 1,
        catalog: a.value.catalog,
        activations: a.value.activations,
        "write-disabled-reason": S.value,
        onUse: _[3] || (_[3] = ($) => E("use", $)),
        onDeactivate: _[4] || (_[4] = ($) => {
          const F = a.value.catalog.find((Z) => Z.id === $.itemId);
          F && E("deactivate", F, $);
        })
      }, null, 8, [
        "catalog",
        "activations",
        "write-disabled-reason"
      ]))]),
      s.value ? (g(), he(Hh, {
        key: 1,
        mode: s.value.mode,
        item: s.value.item,
        activation: s.value.activation,
        busy: o.value,
        error: u.value,
        onCancel: C,
        onConfirm: M
      }, null, 8, [
        "mode",
        "item",
        "activation",
        "busy",
        "error"
      ])) : q("", !0)
    ]));
  }
}), Oy = Py, Ly = Object.freeze({
  id: "wallet",
  name: "钱包",
  accent: "#a9660f"
}), Ry = { class: "wallet-ui-header" }, Ny = { class: "wallet-ui-header-copy" }, Dy = {
  key: 0,
  class: "wallet-ui-kicker"
}, By = { class: "wallet-ui-title" }, qy = /* @__PURE__ */ oe({
  __name: "WalletAppHeader",
  props: {
    kicker: {},
    title: {}
  },
  setup(e) {
    return (t, a) => (g(), b("header", Ry, [i("div", Ny, [e.kicker ? (g(), b("span", Dy, y(e.kicker), 1)) : q("", !0), i("h1", By, y(e.title), 1)])]));
  }
}), Uy = qy, Fy = {
  class: "wallet-balance wallet-ui-rise",
  "aria-labelledby": "wallet-balance-title"
}, jy = { class: "wallet-balance-chip" }, Hy = ["aria-label"], Ky = /* @__PURE__ */ oe({
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
    return (s, r) => (g(), b("section", Fy, [
      i("header", null, [r[0] || (r[0] = i("p", { id: "wallet-balance-title" }, "当前结余", -1)), i("span", jy, [i("i", {
        class: ne(`is-${e.status}`),
        "aria-hidden": "true"
      }, null, 2), ge(y(n.value), 1)])]),
      i("div", {
        class: "wallet-balance-value",
        "aria-label": `${a.value} ${e.currency}`
      }, [r[1] || (r[1] = i("span", { "aria-hidden": "true" }, "¤", -1)), ge(y(a.value), 1)], 8, Hy),
      i("footer", null, y(e.currency), 1)
    ]));
  }
}), Gy = Ky, Vy = {
  class: "wallet-ui-notice-icon",
  "aria-hidden": "true"
}, zy = { class: "wallet-ui-notice-copy" }, Wy = { key: 0 }, Yy = /* @__PURE__ */ oe({
  __name: "WalletNotice",
  props: {
    title: {},
    message: { default: "" },
    tone: { default: "info" }
  },
  setup(e) {
    return (t, a) => (g(), b("aside", {
      class: ne(["wallet-ui-notice", `is-${e.tone}`]),
      role: "status"
    }, [i("span", Vy, [_n(t.$slots, "icon", {}, () => [a[0] || (a[0] = ge("!", -1))])]), i("div", zy, [
      i("strong", null, y(e.title), 1),
      e.message ? (g(), b("p", Wy, y(e.message), 1)) : q("", !0),
      _n(t.$slots, "default")
    ])], 2));
  }
}), Xy = Yy, Jy = { class: "wallet-ui-empty" }, Qy = {
  key: 0,
  class: "wallet-ui-empty-icon",
  "aria-hidden": "true"
}, Zy = { key: 1 }, e1 = /* @__PURE__ */ oe({
  __name: "WalletEmpty",
  props: {
    title: {},
    message: { default: "" }
  },
  setup(e) {
    return (t, a) => (g(), b("div", Jy, [
      t.$slots.icon ? (g(), b("span", Qy, [_n(t.$slots, "icon")])) : q("", !0),
      i("strong", null, y(e.title), 1),
      e.message ? (g(), b("p", Zy, y(e.message), 1)) : q("", !0)
    ]));
  }
}), t1 = e1, a1 = {
  class: "wallet-row-mark",
  "aria-hidden": "true"
}, n1 = { viewBox: "0 0 24 24" }, s1 = ["d"], i1 = { class: "wallet-row-copy" }, r1 = { key: 0 }, l1 = { class: "wallet-row-amount" }, o1 = /* @__PURE__ */ oe({
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
    }), r = z(() => {
      const o = new Date(a.transaction.createdAt), l = new Intl.DateTimeFormat("zh-CN", {
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
        hour12: !1
      }).format(o);
      return a.transaction.sequence === 1 && a.transaction.sourceDomain === "economy" ? `开户 · ${l}` : l;
    });
    return (o, l) => (g(), b("li", { class: ne(["wallet-row", `is-${e.transaction.direction}`]) }, [
      i("span", a1, [(g(), b("svg", n1, [i("path", { d: n.value }, null, 8, s1)]))]),
      i("div", i1, [
        i("strong", null, y(e.transaction.title), 1),
        e.transaction.note ? (g(), b("p", r1, y(e.transaction.note), 1)) : q("", !0),
        i("small", null, y(e.transaction.source) + " · " + y(r.value), 1)
      ]),
      i("span", l1, y(s.value), 1)
    ], 2));
  }
}), u1 = o1, d1 = {
  key: 1,
  class: "wallet-ui-list"
}, c1 = {
  key: 2,
  class: "wallet-ledger-foot"
}, f1 = {
  key: 0,
  class: "wallet-load-error",
  role: "alert"
}, v1 = ["disabled"], p1 = {
  key: 2,
  class: "wallet-ledger-end"
}, g1 = /* @__PURE__ */ oe({
  __name: "WalletTransactionList",
  props: {
    transactions: {},
    hasMore: { type: Boolean },
    loadingMore: { type: Boolean },
    error: {}
  },
  emits: ["loadMore"],
  setup(e) {
    return (t, a) => (g(), b("div", null, [e.transactions.length === 1 && e.transactions[0]?.sequence === 1 && e.transactions[0]?.sourceDomain === "economy" ? (g(), he(t1, {
      key: 0,
      title: "新账簿已经启用",
      message: "除了开户赠礼，还没有其他收支。"
    }, {
      icon: na(() => [...a[1] || (a[1] = [i("svg", { viewBox: "0 0 24 24" }, [i("path", { d: "m5 12.5 4.5 4.5L19 7.5" })], -1)])]),
      _: 1
    })) : (g(), b("ol", d1, [(g(!0), b(te, null, me(e.transactions, (n) => (g(), he(u1, {
      key: n.id,
      transaction: n
    }, null, 8, ["transaction"]))), 128))])), e.hasMore || e.transactions.length > 1 ? (g(), b("div", c1, [e.error ? (g(), b("p", f1, y(e.error), 1)) : q("", !0), e.hasMore ? (g(), b("button", {
      key: 1,
      type: "button",
      class: "wallet-ui-text-button",
      disabled: e.loadingMore,
      onClick: a[0] || (a[0] = (n) => t.$emit("loadMore"))
    }, y(e.loadingMore ? "正在翻阅…" : "翻阅更早账目"), 9, v1)) : (g(), b("span", p1, "账簿至此"))])) : q("", !0)]));
  }
}), m1 = g1, b1 = { class: "wallet-ui-app wallet-app" }, h1 = { class: "wallet-ui-scroll" }, y1 = ["disabled"], k1 = ["disabled"], w1 = {
  class: "wallet-ledger",
  "aria-labelledby": "wallet-ledger-title"
}, x1 = { class: "wallet-ui-section-title" }, S1 = { class: "wallet-ui-card" }, zi = 35e3, _1 = /* @__PURE__ */ oe({
  __name: "WalletApp",
  props: {
    bridge: {},
    initialState: {}
  },
  setup(e) {
    const t = e, a = /* @__PURE__ */ Y(structuredClone(/* @__PURE__ */ se(t.initialState))), n = /* @__PURE__ */ Y(!1), s = /* @__PURE__ */ Y(!1), r = /* @__PURE__ */ Y(""), o = /* @__PURE__ */ Y("");
    let l = () => {
    }, u = 0;
    const v = z(() => a.value.status === "unconfirmed"), d = z(() => n.value || a.value.status === "loading" || a.value.status === "saving"), m = z(() => d.value || v.value || a.value.status === "conflict"), S = z(() => !!(a.value.message || r.value)), h = z(() => r.value || a.value.status === "conflict" || a.value.status === "blocked" ? "danger" : v.value ? "warning" : "info"), A = z(() => a.value.status === "conflict" ? "账本发生冲突" : a.value.status === "blocked" ? "钱包暂时无法读取" : "账本状态");
    function L(C) {
      const M = C instanceof Error ? C.message : String(C);
      return M.includes("聊天已切换") ? "聊天已切换，请重新打开钱包。" : M === "host_request_timeout" ? "读取等待超时，请稍后重新读取。" : "钱包数据暂时无法读取，请稍后重试。";
    }
    function X() {
      return { chatIdentity: a.value.chatIdentity };
    }
    function V(C) {
      a.value = structuredClone(C), n.value = !1, s.value = !1, r.value = "", o.value = "";
    }
    async function W() {
      if (d.value || v.value || a.value.status === "conflict") return;
      const C = ++u;
      n.value = !0, r.value = "";
      try {
        const M = await t.bridge.request("wallet/refresh", X(), zi);
        C === u && V(M.result);
      } catch (M) {
        C === u && (r.value = L(M));
      } finally {
        C === u && (n.value = !1);
      }
    }
    async function G() {
      if (d.value) return;
      const C = ++u;
      n.value = !0, r.value = "";
      try {
        const M = await t.bridge.request("wallet/confirm-save", X(), zi);
        C === u && V(M.result.state);
      } catch (M) {
        C === u && (r.value = L(M));
      } finally {
        C === u && (n.value = !1);
      }
    }
    async function E() {
      const C = a.value.nextCursor;
      if (!C || s.value) return;
      const M = u;
      s.value = !0, o.value = "";
      try {
        const x = await t.bridge.request("wallet/load-more", {
          ...X(),
          beforeSequence: C
        });
        if (M !== u) return;
        const _ = new Set(a.value.transactions.map(($) => $.id));
        a.value.transactions.push(...x.result.transactions.filter(($) => !_.has($.id))), a.value.nextCursor = x.result.nextCursor, a.value.hasMore = x.result.hasMore;
      } catch {
        M === u && (o.value = "更多流水暂时无法读取，请稍后重试。");
      } finally {
        M === u && (s.value = !1);
      }
    }
    return ct(() => {
      l = t.bridge.subscribe((C) => {
        C.type === "wallet/state" && (u += 1, V(C.payload.state)), C.type === "wallet/error" && (r.value = L(C.payload?.message || ""));
      });
    }), lt(() => {
      u += 1, l();
    }), (C, M) => (g(), b("main", b1, [Ce(Uy, {
      kicker: "Wallet",
      title: "钱包"
    }), i("div", h1, [
      Ce(Gy, {
        balance: a.value.balance,
        currency: a.value.currency,
        status: a.value.status
      }, null, 8, [
        "balance",
        "currency",
        "status"
      ]),
      S.value ? (g(), he(Xy, {
        key: 0,
        class: "wallet-notice",
        tone: h.value,
        title: A.value,
        message: r.value || a.value.message
      }, {
        default: na(() => [v.value ? (g(), b("button", {
          key: 0,
          type: "button",
          class: "wallet-ui-text-button",
          disabled: n.value,
          onClick: G
        }, y(n.value ? "正在核实…" : "核实保存结果"), 9, y1)) : a.value.status === "blocked" || r.value ? (g(), b("button", {
          key: 1,
          type: "button",
          class: "wallet-ui-text-button",
          disabled: m.value,
          onClick: W
        }, y(n.value ? "正在读取…" : "重新读取"), 9, k1)) : q("", !0)]),
        _: 1
      }, 8, [
        "tone",
        "title",
        "message"
      ])) : q("", !0),
      i("section", w1, [i("div", x1, [M[0] || (M[0] = i("h2", { id: "wallet-ledger-title" }, "流水明细", -1)), i("small", null, y(a.value.transactionCount) + " 笔", 1)]), i("div", S1, [Ce(m1, {
        transactions: a.value.transactions,
        "has-more": a.value.hasMore,
        "loading-more": s.value,
        error: o.value,
        onLoadMore: E
      }, null, 8, [
        "transactions",
        "has-more",
        "loading-more",
        "error"
      ])])])
    ])]));
  }
}), $1 = _1, C1 = Object.freeze([
  {
    ...rd,
    iconPaths: ["M14 11h36a4 4 0 0 1 4 4v34a4 4 0 0 1-4 4H14a4 4 0 0 1-4-4V15a4 4 0 0 1 4-4z", "M19 24h26M19 34h18M19 44h11M45 44h.1"],
    component: Oc
  },
  {
    ...mb,
    iconPaths: ["M13 15h38v29H32l-12 9 3-9H13z", "M22 25h20M22 33h14"],
    component: Ih
  },
  {
    ...Ly,
    iconPaths: ["M12 19.5h37a5 5 0 0 1 5 5v24a5 5 0 0 1-5 5H15a5 5 0 0 1-5-5v-30a8 8 0 0 1 8-8h27", "M54 30H42a6 6 0 0 0 0 12h12M43 36h.1"],
    component: $1
  },
  {
    ...Ph,
    iconPaths: ["M14 19h36l-3 35H17z", "M11 19h42M19 19V11h26v8M23 29h18M22 38h20M21 47h22"],
    component: Oy
  },
  {
    ...Lc,
    iconPaths: ["M9 24h46L32 9z", "M14 52h36M18 24v28M28 24v28M38 24v28M48 24v28"],
    component: rv
  },
  {
    ...lv,
    iconPaths: ["M15 12h34a6 6 0 0 1 6 6v28a6 6 0 0 1-6 6H15a6 6 0 0 1-6-6V18a6 6 0 0 1 6-6z", "M21 23h.1M43 23h.1M32 32h.1M21 41h.1M43 41h.1"],
    component: Kp
  },
  {
    ...Gp,
    iconPaths: ["M11 16l13-6 16 6 13-6v38l-13 6-16-6-13 6z", "M24 10v38M40 16v38M18 31l6-3 8 3 8-4 7 3"],
    component: gb
  }
]), A1 = { class: "xiaobai-os-home" }, M1 = ["src"], T1 = {
  class: "xiaobai-os-app-grid",
  "aria-label": "应用"
}, E1 = ["onClick"], I1 = {
  class: "xiaobai-os-app-icon",
  "aria-hidden": "true"
}, P1 = { viewBox: "0 0 64 64" }, O1 = ["d"], L1 = { class: "xiaobai-os-app-name" }, R1 = /* @__PURE__ */ oe({
  __name: "XiaobaiOsHome",
  props: {
    apps: {},
    characterAvatar: {}
  },
  emits: ["openApp"],
  setup(e) {
    return (t, a) => (g(), b("main", A1, [
      e.characterAvatar ? (g(), b("img", {
        key: 0,
        class: "xiaobai-os-wallpaper",
        src: e.characterAvatar,
        alt: ""
      }, null, 8, M1)) : q("", !0),
      a[0] || (a[0] = i("div", {
        class: "xiaobai-os-home-wash",
        "aria-hidden": "true"
      }, null, -1)),
      i("section", T1, [(g(!0), b(te, null, me(e.apps, (n) => (g(), b("button", {
        key: n.id,
        type: "button",
        class: "xiaobai-os-app-tile",
        style: Vt({ "--app-accent": n.accent }),
        onClick: (s) => t.$emit("openApp", n)
      }, [i("span", I1, [(g(), b("svg", P1, [(g(!0), b(te, null, me(n.iconPaths, (s) => (g(), b("path", {
        key: s,
        d: s
      }, null, 8, O1))), 128))]))]), i("span", L1, y(n.name), 1)], 12, E1))), 128))])
    ]));
  }
}), N1 = R1, D1 = ["disabled"], B1 = {
  key: 0,
  "aria-hidden": "true"
}, q1 = /* @__PURE__ */ oe({
  __name: "XiaobaiOsNavigation",
  props: { isHome: { type: Boolean } },
  emits: [
    "back",
    "home",
    "close"
  ],
  setup(e) {
    return (t, a) => (g(), b("nav", {
      class: ne(["xiaobai-os-navigation", { "is-home": e.isHome }]),
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
      }, [i("path", { d: "m14.5 6-6 6 6 6" })], -1)])], 8, D1),
      i("button", {
        type: "button",
        class: "xiaobai-os-nav-button xiaobai-os-home-button",
        "aria-label": "主页",
        onClick: a[1] || (a[1] = (n) => t.$emit("home"))
      }, [a[4] || (a[4] = i("svg", {
        viewBox: "0 0 24 24",
        "aria-hidden": "true"
      }, [i("path", { d: "m4.5 11 7.5-6 7.5 6v8h-5v-5h-5v5h-5z" })], -1)), e.isHome ? (g(), b("i", B1)) : q("", !0)]),
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
}), U1 = q1, F1 = /* @__PURE__ */ oe({
  __name: "XiaobaiOsSystemBar",
  props: { isHome: { type: Boolean } },
  setup(e) {
    return (t, a) => (g(), b("header", {
      class: ne(["xiaobai-os-system-bar", { "is-home": e.isHome }]),
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
}), j1 = F1, H1 = { class: "xiaobai-os-device" }, K1 = { class: "xiaobai-os-glass" }, G1 = /* @__PURE__ */ oe({
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
    return (n, s) => (g(), b("div", H1, [s[4] || (s[4] = i("span", {
      class: "xiaobai-os-side-key",
      "aria-hidden": "true"
    }, null, -1)), i("div", K1, [
      Ce(j1, { "is-home": a.value }, null, 8, ["is-home"]),
      i("div", {
        class: "xiaobai-os-stage",
        style: Vt(e.activeApp ? { "--app-accent": e.activeApp.accent } : null)
      }, [Ce(rl, {
        name: "xiaobai-os-route",
        mode: "out-in"
      }, {
        default: na(() => [a.value ? (g(), he(N1, {
          key: "home",
          apps: e.apps,
          "character-avatar": e.characterAvatar,
          onOpenApp: s[0] || (s[0] = (r) => n.$emit("openApp", r))
        }, null, 8, ["apps", "character-avatar"])) : e.activeApp ? (g(), he(No(e.activeApp.component), {
          key: "app",
          bridge: e.bridge,
          "initial-state": e.activeState
        }, null, 8, ["bridge", "initial-state"])) : q("", !0)]),
        _: 1
      })], 4),
      Ce(U1, {
        "is-home": a.value,
        onBack: s[1] || (s[1] = (r) => n.$emit("back")),
        onHome: s[2] || (s[2] = (r) => n.$emit("home")),
        onClose: s[3] || (s[3] = (r) => n.$emit("close"))
      }, null, 8, ["is-home"])
    ])]));
  }
}), V1 = G1, z1 = "LittleWhiteBox-XiaobaiOS";
function W1() {
  return `xiaobai-os-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
}
function Y1() {
  const e = /* @__PURE__ */ new Map(), t = /* @__PURE__ */ new Set();
  let a = !1;
  function n(d, m = {}, S = "") {
    parent.postMessage({
      source: z1,
      type: d,
      requestId: S,
      payload: m
    }, window.location.origin);
  }
  function s(d) {
    const m = String(d.requestId || "");
    if (!m) return !1;
    const S = e.get(m);
    if (!S) return !1;
    e.delete(m), clearTimeout(S.timer);
    const h = d.payload;
    return h?.ok === !1 ? S.reject(new Error(h.error || "host_request_failed")) : S.resolve(h), !0;
  }
  function r(d) {
    d.origin !== window.location.origin || d.source !== parent || d.data?.source !== "LittleWhiteBox-XiaobaiOS" || typeof d.data.type != "string" || s(d.data) || t.forEach((m) => m(d.data));
  }
  function o() {
    a || (a = !0, window.addEventListener("message", r), n("os/frame-ready"));
  }
  function l(d, m = {}, S = 15e3) {
    const h = W1();
    return new Promise((A, L) => {
      const X = setTimeout(() => {
        e.delete(h), L(/* @__PURE__ */ new Error("host_request_timeout"));
      }, S);
      e.set(h, {
        resolve: A,
        reject: L,
        timer: X
      }), n(d, m, h);
    });
  }
  function u(d) {
    return t.add(d), () => t.delete(d);
  }
  function v() {
    a && window.removeEventListener("message", r), a = !1, t.clear(), e.forEach((d) => {
      clearTimeout(d.timer), d.reject(/* @__PURE__ */ new Error("frame_bridge_disposed"));
    }), e.clear();
  }
  return Object.freeze({
    start: o,
    post: n,
    request: l,
    subscribe: u,
    dispose: v
  });
}
var X1 = {
  key: 0,
  class: "xiaobai-os-error",
  role: "alert"
}, J1 = {
  key: 1,
  class: "xiaobai-os-loading",
  role: "status"
}, Q1 = /* @__PURE__ */ oe({
  __name: "App",
  setup(e) {
    const t = Y1(), a = /* @__PURE__ */ Y(null), n = /* @__PURE__ */ Y(!1), s = /* @__PURE__ */ Y("light"), r = /* @__PURE__ */ Y(/* @__PURE__ */ new Set()), o = /* @__PURE__ */ Y(""), l = /* @__PURE__ */ Y(null), u = /* @__PURE__ */ Y(null), v = /* @__PURE__ */ Y("");
    let d = null, m = () => {
    }, S = 0, h = null;
    const A = z(() => C1.filter((M) => r.value.has(M.id)));
    function L(M) {
      const x = new Set(M.map((F) => String(F.id))), _ = l.value && !x.has(l.value.id), $ = h && !x.has(h.appId);
      r.value = x, !(!_ && !$) && (S += 1, h = null, l.value = null, u.value = null);
    }
    function X(M) {
      S += 1, h = null, s.value = M.theme === "dark" ? "dark" : "light", L(M.apps || []), o.value = String(M.chat?.characterAvatar || ""), l.value = null, u.value = null, n.value = !0;
    }
    function V(M) {
      if (M.type === "os/init" && X(M.payload || {}), M.type === "os/theme-changed" && (s.value = M.payload?.theme === "dark" ? "dark" : "light"), M.type === "os/apps-changed") {
        const _ = M.payload;
        L(_?.apps || []);
      }
      M.type === "os/error" && (v.value = String(M.payload?.message || "小白 OS 初始化失败"));
      const x = M.payload?.state;
      h && M.type === `${h.appId}/state` && (h.latestState = x), l.value && M.type === `${l.value.id}/state` && (u.value = x);
    }
    async function W(M) {
      const x = ++S, _ = { appId: M.id };
      h = _, v.value = "";
      try {
        const $ = await t.request("app/activate", { appId: M.id });
        if (x !== S) return;
        if ($.appId !== M.id) throw new Error("app_activation_mismatch");
        u.value = _.latestState ?? $.state ?? null, l.value = M;
      } catch ($) {
        if (x !== S) return;
        l.value = null, v.value = $ instanceof Error ? $.message : String($);
      } finally {
        h === _ && (h = null);
      }
    }
    function G() {
      S += 1, h = null, t.post("app/deactivate", { appId: l.value?.id || "" }), l.value = null, u.value = null;
    }
    function E() {
      S += 1, h = null, t.post("os/close");
    }
    function C(M) {
      if (M.key === "Escape") {
        M.preventDefault(), l.value ? G() : E();
        return;
      }
      if (M.key !== "Tab" || !a.value) return;
      const x = Array.from(a.value.querySelectorAll('button:not(:disabled), [href], input:not(:disabled), textarea:not(:disabled), [tabindex]:not([tabindex="-1"])'));
      if (x.length === 0) return;
      const _ = x[0], $ = x[x.length - 1];
      M.shiftKey && document.activeElement === _ ? (M.preventDefault(), $.focus()) : !M.shiftKey && document.activeElement === $ && (M.preventDefault(), _.focus());
    }
    return ct(async () => {
      d = document.activeElement instanceof HTMLElement ? document.activeElement : null, m = t.subscribe(V), t.start(), await an(), a.value?.focus();
    }), lt(() => {
      S += 1, h = null, m(), t.dispose(), d?.focus();
    }), (M, x) => (g(), b("main", {
      ref_key: "root",
      ref: a,
      class: ne(["xiaobai-os-shell", `theme-${s.value}`]),
      role: "dialog",
      "aria-modal": "true",
      "aria-label": "小白 OS",
      tabindex: "-1",
      onKeydown: C,
      onClick: it(E, ["self"])
    }, [v.value ? (g(), b("div", X1, y(v.value), 1)) : q("", !0), n.value ? (g(), he(V1, {
      key: 2,
      apps: A.value,
      "active-app": l.value,
      "active-state": u.value,
      bridge: pe(t),
      "character-avatar": o.value,
      onOpenApp: W,
      onBack: G,
      onHome: G,
      onClose: E
    }, null, 8, [
      "apps",
      "active-app",
      "active-state",
      "bridge",
      "character-avatar"
    ])) : (g(), b("div", J1, "正在启动小白 OS"))], 34));
  }
}), Z1 = Q1;
nd(Z1).mount("#app");
