/* eslint-disable */
// @__NO_SIDE_EFFECTS__
function Sa(e) {
  const t = /* @__PURE__ */ Object.create(null);
  for (const n of e.split(",")) t[n] = 1;
  return (n) => n in t;
}
var he = {}, en = [], ct = () => {
}, Ri = () => !1, xa = (e) => e.charCodeAt(0) === 111 && e.charCodeAt(1) === 110 && (e.charCodeAt(2) > 122 || e.charCodeAt(2) < 97), wa = (e) => e.startsWith("onUpdate:"), $e = Object.assign, ps = (e, t) => {
  const n = e.indexOf(t);
  n > -1 && e.splice(n, 1);
}, cl = Object.prototype.hasOwnProperty, pe = (e, t) => cl.call(e, t), Z = Array.isArray, tn = (e) => zn(e) === "[object Map]", fn = (e) => zn(e) === "[object Set]", Hs = (e) => zn(e) === "[object Date]", ne = (e) => typeof e == "function", _e = (e) => typeof e == "string", tt = (e) => typeof e == "symbol", ge = (e) => e !== null && typeof e == "object", Bi = (e) => (ge(e) || ne(e)) && ne(e.then) && ne(e.catch), qi = Object.prototype.toString, zn = (e) => qi.call(e), fl = (e) => zn(e).slice(8, -1), Ui = (e) => zn(e) === "[object Object]", gs = (e) => _e(e) && e !== "NaN" && e[0] !== "-" && "" + parseInt(e, 10) === e, Mn = /* @__PURE__ */ Sa(",key,ref,ref_for,ref_key,onVnodeBeforeMount,onVnodeMounted,onVnodeBeforeUpdate,onVnodeUpdated,onVnodeBeforeUnmount,onVnodeUnmounted"), _a = (e) => {
  const t = /* @__PURE__ */ Object.create(null);
  return ((n) => t[n] || (t[n] = e(n)));
}, vl = /-\w/g, He = _a((e) => e.replace(vl, (t) => t.slice(1).toUpperCase())), pl = /\B([A-Z])/g, Rt = _a((e) => e.replace(pl, "-$1").toLowerCase()), Ca = _a((e) => e.charAt(0).toUpperCase() + e.slice(1)), Ba = _a((e) => e ? `on${Ca(e)}` : ""), dt = (e, t) => !Object.is(e, t), oa = (e, ...t) => {
  for (let n = 0; n < e.length; n++) e[n](...t);
}, Fi = (e, t, n, a = !1) => {
  Object.defineProperty(e, t, {
    configurable: !0,
    enumerable: !1,
    writable: a,
    value: n
  });
}, $a = (e) => {
  const t = parseFloat(e);
  return isNaN(t) ? e : t;
}, gl = (e) => {
  const t = _e(e) ? Number(e) : NaN;
  return isNaN(t) ? e : t;
}, js, Ta = () => js || (js = typeof globalThis < "u" ? globalThis : typeof self < "u" ? self : typeof window < "u" ? window : typeof globalThis < "u" ? globalThis : {});
function vn(e) {
  if (Z(e)) {
    const t = {};
    for (let n = 0; n < e.length; n++) {
      const a = e[n], s = _e(a) ? yl(a) : vn(a);
      if (s) for (const i in s) t[i] = s[i];
    }
    return t;
  } else if (_e(e) || ge(e)) return e;
}
var ml = /;(?![^(]*\))/g, bl = /:([^]+)/, hl = /\/\*[^]*?\*\//g;
function yl(e) {
  const t = {};
  return e.replace(hl, "").split(ml).forEach((n) => {
    if (n) {
      const a = n.split(bl);
      a.length > 1 && (t[a[0].trim()] = a[1].trim());
    }
  }), t;
}
function oe(e) {
  let t = "";
  if (_e(e)) t = e;
  else if (Z(e)) for (let n = 0; n < e.length; n++) {
    const a = oe(e[n]);
    a && (t += a + " ");
  }
  else if (ge(e))
    for (const n in e) e[n] && (t += n + " ");
  return t.trim();
}
var Hi = "itemscope,allowfullscreen,formnovalidate,ismap,nomodule,novalidate,readonly", kl = /* @__PURE__ */ Sa(Hi), fh = /* @__PURE__ */ Sa(Hi + ",async,autofocus,autoplay,controls,default,defer,disabled,hidden,inert,loop,open,required,reversed,scoped,seamless,checked,muted,multiple,selected");
function ji(e) {
  return !!e || e === "";
}
function Sl(e, t) {
  if (e.length !== t.length) return !1;
  let n = !0;
  for (let a = 0; n && a < e.length; a++) n = pn(e[a], t[a]);
  return n;
}
function pn(e, t) {
  if (e === t) return !0;
  let n = Hs(e), a = Hs(t);
  if (n || a) return n && a ? e.getTime() === t.getTime() : !1;
  if (n = tt(e), a = tt(t), n || a) return e === t;
  if (n = Z(e), a = Z(t), n || a) return n && a ? Sl(e, t) : !1;
  if (n = ge(e), a = ge(t), n || a) {
    if (!n || !a || Object.keys(e).length !== Object.keys(t).length) return !1;
    for (const s in e) {
      const i = e.hasOwnProperty(s), l = t.hasOwnProperty(s);
      if (i && !l || !i && l || !pn(e[s], t[s])) return !1;
    }
  }
  return String(e) === String(t);
}
function ms(e, t) {
  return e.findIndex((n) => pn(n, t));
}
var Ki = (e) => !!(e && e.__v_isRef === !0), b = (e) => _e(e) ? e : e == null ? "" : Z(e) || ge(e) && (e.toString === qi || !ne(e.toString)) ? Ki(e) ? b(e.value) : JSON.stringify(e, Vi, 2) : String(e), Vi = (e, t) => Ki(t) ? Vi(e, t.value) : tn(t) ? { [`Map(${t.size})`]: [...t.entries()].reduce((n, [a, s], i) => (n[qa(a, i) + " =>"] = s, n), {}) } : fn(t) ? { [`Set(${t.size})`]: [...t.values()].map((n) => qa(n)) } : tt(t) ? qa(t) : ge(t) && !Z(t) && !Ui(t) ? String(t) : t, qa = (e, t = "") => {
  var n;
  return tt(e) ? `Symbol(${(n = e.description) != null ? n : t})` : e;
}, Me, xl = class {
  constructor(e = !1) {
    this.detached = e, this._active = !0, this._on = 0, this.effects = [], this.cleanups = [], this._isPaused = !1, this._warnOnRun = !0, this.__v_skip = !0, !e && Me && (Me.active ? (this.parent = Me, this.index = (Me.scopes || (Me.scopes = [])).push(this) - 1) : (this._active = !1, this._warnOnRun = !1));
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
      const t = Me;
      try {
        return Me = this, e();
      } finally {
        Me = t;
      }
    }
  }
  on() {
    ++this._on === 1 && (this.prevScope = Me, Me = this);
  }
  off() {
    if (this._on > 0 && --this._on === 0) {
      if (Me === this) Me = this.prevScope;
      else {
        let e = Me;
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
function wl() {
  return Me;
}
var we, Ua = /* @__PURE__ */ new WeakSet(), Gi = class {
  constructor(e) {
    this.fn = e, this.deps = void 0, this.depsTail = void 0, this.flags = 5, this.next = void 0, this.cleanup = void 0, this.scheduler = void 0, Me && (Me.active ? Me.effects.push(this) : this.flags &= -2);
  }
  pause() {
    this.flags |= 64;
  }
  resume() {
    this.flags & 64 && (this.flags &= -65, Ua.has(this) && (Ua.delete(this), this.trigger()));
  }
  notify() {
    this.flags & 2 && !(this.flags & 32) || this.flags & 8 || Wi(this);
  }
  run() {
    if (!(this.flags & 1)) return this.fn();
    this.flags |= 2, Ks(this), Ji(this);
    const e = we, t = et;
    we = this, et = !0;
    try {
      return this.fn();
    } finally {
      Xi(this), we = e, et = t, this.flags &= -3;
    }
  }
  stop() {
    if (this.flags & 1) {
      for (let e = this.deps; e; e = e.nextDep) ys(e);
      this.deps = this.depsTail = void 0, Ks(this), this.onStop && this.onStop(), this.flags &= -2;
    }
  }
  trigger() {
    this.flags & 64 ? Ua.add(this) : this.scheduler ? this.scheduler() : this.runIfDirty();
  }
  runIfDirty() {
    es(this) && this.run();
  }
  get dirty() {
    return es(this);
  }
}, zi = 0, In, Pn;
function Wi(e, t = !1) {
  if (e.flags |= 8, t) {
    e.next = Pn, Pn = e;
    return;
  }
  e.next = In, In = e;
}
function bs() {
  zi++;
}
function hs() {
  if (--zi > 0) return;
  if (Pn) {
    let t = Pn;
    for (Pn = void 0; t; ) {
      const n = t.next;
      t.next = void 0, t.flags &= -9, t = n;
    }
  }
  let e;
  for (; In; ) {
    let t = In;
    for (In = void 0; t; ) {
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
function Ji(e) {
  for (let t = e.deps; t; t = t.nextDep)
    t.version = -1, t.prevActiveLink = t.dep.activeLink, t.dep.activeLink = t;
}
function Xi(e) {
  let t, n = e.depsTail, a = n;
  for (; a; ) {
    const s = a.prevDep;
    a.version === -1 ? (a === n && (n = s), ys(a), _l(a)) : t = a, a.dep.activeLink = a.prevActiveLink, a.prevActiveLink = void 0, a = s;
  }
  e.deps = t, e.depsTail = n;
}
function es(e) {
  for (let t = e.deps; t; t = t.nextDep) if (t.dep.version !== t.version || t.dep.computed && (Yi(t.dep.computed) || t.dep.version !== t.version)) return !0;
  return !!e._dirty;
}
function Yi(e) {
  if (e.flags & 4 && !(e.flags & 16) || (e.flags &= -17, e.globalVersion === Nn) || (e.globalVersion = Nn, !e.isSSR && e.flags & 128 && (!e.deps && !e._dirty || !es(e)))) return;
  e.flags |= 2;
  const t = e.dep, n = we, a = et;
  we = e, et = !0;
  try {
    Ji(e);
    const s = e.fn(e._value);
    (t.version === 0 || dt(s, e._value)) && (e.flags |= 128, e._value = s, t.version++);
  } catch (s) {
    throw t.version++, s;
  } finally {
    we = n, et = a, Xi(e), e.flags &= -3;
  }
}
function ys(e, t = !1) {
  const { dep: n, prevSub: a, nextSub: s } = e;
  if (a && (a.nextSub = s, e.prevSub = void 0), s && (s.prevSub = a, e.nextSub = void 0), n.subs === e && (n.subs = a, !a && n.computed)) {
    n.computed.flags &= -5;
    for (let i = n.computed.deps; i; i = i.nextDep) ys(i, !0);
  }
  !t && !--n.sc && n.map && n.map.delete(n.key);
}
function _l(e) {
  const { prevDep: t, nextDep: n } = e;
  t && (t.nextDep = n, e.prevDep = void 0), n && (n.prevDep = t, e.nextDep = void 0);
}
var et = !0, Qi = [];
function _t() {
  Qi.push(et), et = !1;
}
function Ct() {
  const e = Qi.pop();
  et = e === void 0 ? !0 : e;
}
function Ks(e) {
  const { cleanup: t } = e;
  if (e.cleanup = void 0, t) {
    const n = we;
    we = void 0;
    try {
      t();
    } finally {
      we = n;
    }
  }
}
var Nn = 0, Cl = class {
  constructor(e, t) {
    this.sub = e, this.dep = t, this.version = t.version, this.nextDep = this.prevDep = this.nextSub = this.prevSub = this.prevActiveLink = void 0;
  }
}, ks = class {
  constructor(e) {
    this.computed = e, this.version = 0, this.activeLink = void 0, this.subs = void 0, this.map = void 0, this.key = void 0, this.sc = 0, this.__v_skip = !0;
  }
  track(e) {
    if (!we || !et || we === this.computed) return;
    let t = this.activeLink;
    if (t === void 0 || t.sub !== we)
      t = this.activeLink = new Cl(we, this), we.deps ? (t.prevDep = we.depsTail, we.depsTail.nextDep = t, we.depsTail = t) : we.deps = we.depsTail = t, Zi(t);
    else if (t.version === -1 && (t.version = this.version, t.nextDep)) {
      const n = t.nextDep;
      n.prevDep = t.prevDep, t.prevDep && (t.prevDep.nextDep = n), t.prevDep = we.depsTail, t.nextDep = void 0, we.depsTail.nextDep = t, we.depsTail = t, we.deps === t && (we.deps = n);
    }
    return t;
  }
  trigger(e) {
    this.version++, Nn++, this.notify(e);
  }
  notify(e) {
    bs();
    try {
      for (let t = this.subs; t; t = t.prevSub) t.sub.notify() && t.sub.dep.notify();
    } finally {
      hs();
    }
  }
};
function Zi(e) {
  if (e.dep.sc++, e.sub.flags & 4) {
    const t = e.dep.computed;
    if (t && !e.dep.subs) {
      t.flags |= 20;
      for (let a = t.deps; a; a = a.nextDep) Zi(a);
    }
    const n = e.dep.subs;
    n !== e && (e.prevSub = n, n && (n.nextSub = e)), e.dep.subs = e;
  }
}
var ts = /* @__PURE__ */ new WeakMap(), Vt = /* @__PURE__ */ Symbol(""), ns = /* @__PURE__ */ Symbol(""), Rn = /* @__PURE__ */ Symbol("");
function De(e, t, n) {
  if (et && we) {
    let a = ts.get(e);
    a || ts.set(e, a = /* @__PURE__ */ new Map());
    let s = a.get(n);
    s || (a.set(n, s = new ks()), s.map = a, s.key = n), s.track();
  }
}
function kt(e, t, n, a, s, i) {
  const l = ts.get(e);
  if (!l) {
    Nn++;
    return;
  }
  const o = (u) => {
    u && u.trigger();
  };
  if (bs(), t === "clear") l.forEach(o);
  else {
    const u = Z(e), v = u && gs(n);
    if (u && n === "length") {
      const d = Number(a);
      l.forEach((g, $) => {
        ($ === "length" || $ === Rn || !tt($) && $ >= d) && o(g);
      });
    } else
      switch ((n !== void 0 || l.has(void 0)) && o(l.get(n)), v && o(l.get(Rn)), t) {
        case "add":
          u ? v && o(l.get("length")) : (o(l.get(Vt)), tn(e) && o(l.get(ns)));
          break;
        case "delete":
          u || (o(l.get(Vt)), tn(e) && o(l.get(ns)));
          break;
        case "set":
          tn(e) && o(l.get(Vt));
          break;
      }
  }
  hs();
}
function Xt(e) {
  const t = /* @__PURE__ */ te(e);
  return t === e ? t : (De(t, "iterate", Rn), /* @__PURE__ */ Qe(e) ? t : t.map(nt));
}
function Aa(e) {
  return De(e = /* @__PURE__ */ te(e), "iterate", Rn), e;
}
function ot(e, t) {
  return /* @__PURE__ */ Tt(e) ? rn(/* @__PURE__ */ Gt(e) ? nt(t) : t) : nt(t);
}
var $l = {
  __proto__: null,
  [Symbol.iterator]() {
    return Fa(this, Symbol.iterator, (e) => ot(this, e));
  },
  concat(...e) {
    return Xt(this).concat(...e.map((t) => Z(t) ? Xt(t) : t));
  },
  entries() {
    return Fa(this, "entries", (e) => (e[1] = ot(this, e[1]), e));
  },
  every(e, t) {
    return gt(this, "every", e, t, void 0, arguments);
  },
  filter(e, t) {
    return gt(this, "filter", e, t, (n) => n.map((a) => ot(this, a)), arguments);
  },
  find(e, t) {
    return gt(this, "find", e, t, (n) => ot(this, n), arguments);
  },
  findIndex(e, t) {
    return gt(this, "findIndex", e, t, void 0, arguments);
  },
  findLast(e, t) {
    return gt(this, "findLast", e, t, (n) => ot(this, n), arguments);
  },
  findLastIndex(e, t) {
    return gt(this, "findLastIndex", e, t, void 0, arguments);
  },
  forEach(e, t) {
    return gt(this, "forEach", e, t, void 0, arguments);
  },
  includes(...e) {
    return Ha(this, "includes", e);
  },
  indexOf(...e) {
    return Ha(this, "indexOf", e);
  },
  join(e) {
    return Xt(this).join(e);
  },
  lastIndexOf(...e) {
    return Ha(this, "lastIndexOf", e);
  },
  map(e, t) {
    return gt(this, "map", e, t, void 0, arguments);
  },
  pop() {
    return kn(this, "pop");
  },
  push(...e) {
    return kn(this, "push", e);
  },
  reduce(e, ...t) {
    return Vs(this, "reduce", e, t);
  },
  reduceRight(e, ...t) {
    return Vs(this, "reduceRight", e, t);
  },
  shift() {
    return kn(this, "shift");
  },
  some(e, t) {
    return gt(this, "some", e, t, void 0, arguments);
  },
  splice(...e) {
    return kn(this, "splice", e);
  },
  toReversed() {
    return Xt(this).toReversed();
  },
  toSorted(e) {
    return Xt(this).toSorted(e);
  },
  toSpliced(...e) {
    return Xt(this).toSpliced(...e);
  },
  unshift(...e) {
    return kn(this, "unshift", e);
  },
  values() {
    return Fa(this, "values", (e) => ot(this, e));
  }
};
function Fa(e, t, n) {
  const a = Aa(e), s = a[t]();
  return a !== e && !/* @__PURE__ */ Qe(e) && (s._next = s.next, s.next = () => {
    const i = s._next();
    return i.done || (i.value = n(i.value)), i;
  }), s;
}
var Tl = Array.prototype;
function gt(e, t, n, a, s, i) {
  const l = Aa(e), o = l !== e && !/* @__PURE__ */ Qe(e), u = l[t];
  if (u !== Tl[t]) {
    const g = u.apply(e, i);
    return o ? nt(g) : g;
  }
  let v = n;
  l !== e && (o ? v = function(g, $) {
    return n.call(this, ot(e, g), $, e);
  } : n.length > 2 && (v = function(g, $) {
    return n.call(this, g, $, e);
  }));
  const d = u.call(l, v, a);
  return o && s ? s(d) : d;
}
function Vs(e, t, n, a) {
  const s = Aa(e), i = s !== e && !/* @__PURE__ */ Qe(e);
  let l = n, o = !1;
  s !== e && (i ? (o = a.length === 0, l = function(v, d, g) {
    return o && (o = !1, v = ot(e, v)), n.call(this, v, ot(e, d), g, e);
  }) : n.length > 3 && (l = function(v, d, g) {
    return n.call(this, v, d, g, e);
  }));
  const u = s[t](l, ...a);
  return o ? ot(e, u) : u;
}
function Ha(e, t, n) {
  const a = /* @__PURE__ */ te(e);
  De(a, "iterate", Rn);
  const s = a[t](...n);
  return (s === -1 || s === !1) && /* @__PURE__ */ ws(n[0]) ? (n[0] = /* @__PURE__ */ te(n[0]), a[t](...n)) : s;
}
function kn(e, t, n = []) {
  _t(), bs();
  const a = (/* @__PURE__ */ te(e))[t].apply(e, n);
  return hs(), Ct(), a;
}
var Al = /* @__PURE__ */ Sa("__proto__,__v_isRef,__isVue"), er = new Set(/* @__PURE__ */ Object.getOwnPropertyNames(Symbol).filter((e) => e !== "arguments" && e !== "caller").map((e) => Symbol[e]).filter(tt));
function El(e) {
  tt(e) || (e = String(e));
  const t = /* @__PURE__ */ te(this);
  return De(t, "has", e), t.hasOwnProperty(e);
}
var tr = class {
  constructor(e = !1, t = !1) {
    this._isReadonly = e, this._isShallow = t;
  }
  get(e, t, n) {
    if (t === "__v_skip") return e.__v_skip;
    const a = this._isReadonly, s = this._isShallow;
    if (t === "__v_isReactive") return !a;
    if (t === "__v_isReadonly") return a;
    if (t === "__v_isShallow") return s;
    if (t === "__v_raw")
      return n === (a ? s ? ql : ir : s ? sr : ar).get(e) || Object.getPrototypeOf(e) === Object.getPrototypeOf(n) ? e : void 0;
    const i = Z(e);
    if (!a) {
      let o;
      if (i && (o = $l[t])) return o;
      if (t === "hasOwnProperty") return El;
    }
    const l = Reflect.get(e, t, /* @__PURE__ */ Be(e) ? e : n);
    if ((tt(t) ? er.has(t) : Al(t)) || (a || De(e, "get", t), s)) return l;
    if (/* @__PURE__ */ Be(l)) {
      const o = i && gs(t) ? l : l.value;
      return a && ge(o) ? /* @__PURE__ */ ss(o) : o;
    }
    return ge(l) ? a ? /* @__PURE__ */ ss(l) : /* @__PURE__ */ $t(l) : l;
  }
}, nr = class extends tr {
  constructor(e = !1) {
    super(!1, e);
  }
  set(e, t, n, a) {
    let s = e[t];
    const i = Z(e) && gs(t);
    if (!this._isShallow) {
      const u = /* @__PURE__ */ Tt(s);
      if (!/* @__PURE__ */ Qe(n) && !/* @__PURE__ */ Tt(n) && (s = /* @__PURE__ */ te(s), n = /* @__PURE__ */ te(n)), !i && /* @__PURE__ */ Be(s) && !/* @__PURE__ */ Be(n)) return u || (s.value = n), !0;
    }
    const l = i ? Number(t) < e.length : pe(e, t), o = Reflect.set(e, t, n, /* @__PURE__ */ Be(e) ? e : a);
    return e === /* @__PURE__ */ te(a) && (l ? dt(n, s) && kt(e, "set", t, n, s) : kt(e, "add", t, n)), o;
  }
  deleteProperty(e, t) {
    const n = pe(e, t), a = e[t], s = Reflect.deleteProperty(e, t);
    return s && n && kt(e, "delete", t, void 0, a), s;
  }
  has(e, t) {
    const n = Reflect.has(e, t);
    return (!tt(t) || !er.has(t)) && De(e, "has", t), n;
  }
  ownKeys(e) {
    return De(e, "iterate", Z(e) ? "length" : Vt), Reflect.ownKeys(e);
  }
}, Ml = class extends tr {
  constructor(e = !1) {
    super(!0, e);
  }
  set(e, t) {
    return !0;
  }
  deleteProperty(e, t) {
    return !0;
  }
}, Il = /* @__PURE__ */ new nr(), Pl = /* @__PURE__ */ new Ml(), Ol = /* @__PURE__ */ new nr(!0), as = (e) => e, ta = (e) => Reflect.getPrototypeOf(e);
function Ll(e, t, n) {
  return function(...a) {
    const s = this.__v_raw, i = /* @__PURE__ */ te(s), l = tn(i), o = e === "entries" || e === Symbol.iterator && l, u = e === "keys" && l, v = s[e](...a), d = n ? as : t ? rn : nt;
    return !t && De(i, "iterate", u ? ns : Vt), $e(Object.create(v), { next() {
      const { value: g, done: $ } = v.next();
      return $ ? {
        value: g,
        done: $
      } : {
        value: o ? [d(g[0]), d(g[1])] : d(g),
        done: $
      };
    } });
  };
}
function na(e) {
  return function(...t) {
    return e === "delete" ? !1 : e === "clear" ? void 0 : this;
  };
}
function Dl(e, t) {
  const n = {
    get(a) {
      const s = this.__v_raw, i = /* @__PURE__ */ te(s), l = /* @__PURE__ */ te(a);
      e || (dt(a, l) && De(i, "get", a), De(i, "get", l));
      const { has: o } = ta(i), u = t ? as : e ? rn : nt;
      if (o.call(i, a)) return u(s.get(a));
      if (o.call(i, l)) return u(s.get(l));
      s !== i && s.get(a);
    },
    get size() {
      const a = this.__v_raw;
      return !e && De(/* @__PURE__ */ te(a), "iterate", Vt), a.size;
    },
    has(a) {
      const s = this.__v_raw, i = /* @__PURE__ */ te(s), l = /* @__PURE__ */ te(a);
      return e || (dt(a, l) && De(i, "has", a), De(i, "has", l)), a === l ? s.has(a) : s.has(a) || s.has(l);
    },
    forEach(a, s) {
      const i = this, l = i.__v_raw, o = /* @__PURE__ */ te(l), u = t ? as : e ? rn : nt;
      return !e && De(o, "iterate", Vt), l.forEach((v, d) => a.call(s, u(v), u(d), i));
    }
  };
  return $e(n, e ? {
    add: na("add"),
    set: na("set"),
    delete: na("delete"),
    clear: na("clear")
  } : {
    add(a) {
      const s = /* @__PURE__ */ te(this), i = ta(s), l = /* @__PURE__ */ te(a), o = !t && !/* @__PURE__ */ Qe(a) && !/* @__PURE__ */ Tt(a) ? l : a;
      return i.has.call(s, o) || dt(a, o) && i.has.call(s, a) || dt(l, o) && i.has.call(s, l) || (s.add(o), kt(s, "add", o, o)), this;
    },
    set(a, s) {
      !t && !/* @__PURE__ */ Qe(s) && !/* @__PURE__ */ Tt(s) && (s = /* @__PURE__ */ te(s));
      const i = /* @__PURE__ */ te(this), { has: l, get: o } = ta(i);
      let u = l.call(i, a);
      u || (a = /* @__PURE__ */ te(a), u = l.call(i, a));
      const v = o.call(i, a);
      return i.set(a, s), u ? dt(s, v) && kt(i, "set", a, s, v) : kt(i, "add", a, s), this;
    },
    delete(a) {
      const s = /* @__PURE__ */ te(this), { has: i, get: l } = ta(s);
      let o = i.call(s, a);
      o || (a = /* @__PURE__ */ te(a), o = i.call(s, a));
      const u = l ? l.call(s, a) : void 0, v = s.delete(a);
      return o && kt(s, "delete", a, void 0, u), v;
    },
    clear() {
      const a = /* @__PURE__ */ te(this), s = a.size !== 0, i = void 0, l = a.clear();
      return s && kt(a, "clear", void 0, void 0, i), l;
    }
  }), [
    "keys",
    "values",
    "entries",
    Symbol.iterator
  ].forEach((a) => {
    n[a] = Ll(a, e, t);
  }), n;
}
function Ss(e, t) {
  const n = Dl(e, t);
  return (a, s, i) => s === "__v_isReactive" ? !e : s === "__v_isReadonly" ? e : s === "__v_raw" ? a : Reflect.get(pe(n, s) && s in a ? n : a, s, i);
}
var Nl = { get: /* @__PURE__ */ Ss(!1, !1) }, Rl = { get: /* @__PURE__ */ Ss(!1, !0) }, Bl = { get: /* @__PURE__ */ Ss(!0, !1) }, ar = /* @__PURE__ */ new WeakMap(), sr = /* @__PURE__ */ new WeakMap(), ir = /* @__PURE__ */ new WeakMap(), ql = /* @__PURE__ */ new WeakMap();
function Ul(e) {
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
function $t(e) {
  return /* @__PURE__ */ Tt(e) ? e : xs(e, !1, Il, Nl, ar);
}
// @__NO_SIDE_EFFECTS__
function Fl(e) {
  return xs(e, !1, Ol, Rl, sr);
}
// @__NO_SIDE_EFFECTS__
function ss(e) {
  return xs(e, !0, Pl, Bl, ir);
}
function xs(e, t, n, a, s) {
  if (!ge(e) || e.__v_raw && !(t && e.__v_isReactive) || e.__v_skip || !Object.isExtensible(e)) return e;
  const i = s.get(e);
  if (i) return i;
  const l = Ul(fl(e));
  if (l === 0) return e;
  const o = new Proxy(e, l === 2 ? a : n);
  return s.set(e, o), o;
}
// @__NO_SIDE_EFFECTS__
function Gt(e) {
  return /* @__PURE__ */ Tt(e) ? /* @__PURE__ */ Gt(e.__v_raw) : !!(e && e.__v_isReactive);
}
// @__NO_SIDE_EFFECTS__
function Tt(e) {
  return !!(e && e.__v_isReadonly);
}
// @__NO_SIDE_EFFECTS__
function Qe(e) {
  return !!(e && e.__v_isShallow);
}
// @__NO_SIDE_EFFECTS__
function ws(e) {
  return e ? !!e.__v_raw : !1;
}
// @__NO_SIDE_EFFECTS__
function te(e) {
  const t = e && e.__v_raw;
  return t ? /* @__PURE__ */ te(t) : e;
}
function Hl(e) {
  return !pe(e, "__v_skip") && Object.isExtensible(e) && Fi(e, "__v_skip", !0), e;
}
var nt = (e) => ge(e) ? /* @__PURE__ */ $t(e) : e, rn = (e) => ge(e) ? /* @__PURE__ */ ss(e) : e;
// @__NO_SIDE_EFFECTS__
function Be(e) {
  return e ? e.__v_isRef === !0 : !1;
}
// @__NO_SIDE_EFFECTS__
function Y(e) {
  return jl(e, !1);
}
function jl(e, t) {
  return /* @__PURE__ */ Be(e) ? e : new Kl(e, t);
}
var Kl = class {
  constructor(e, t) {
    this.dep = new ks(), this.__v_isRef = !0, this.__v_isShallow = !1, this._rawValue = t ? e : /* @__PURE__ */ te(e), this._value = t ? e : nt(e), this.__v_isShallow = t;
  }
  get value() {
    return this.dep.track(), this._value;
  }
  set value(e) {
    const t = this._rawValue, n = this.__v_isShallow || /* @__PURE__ */ Qe(e) || /* @__PURE__ */ Tt(e);
    e = n ? e : /* @__PURE__ */ te(e), dt(e, t) && (this._rawValue = e, this._value = n ? e : nt(e), this.dep.trigger());
  }
};
function ln(e) {
  return /* @__PURE__ */ Be(e) ? e.value : e;
}
var Vl = {
  get: (e, t, n) => t === "__v_raw" ? e : ln(Reflect.get(e, t, n)),
  set: (e, t, n, a) => {
    const s = e[t];
    return /* @__PURE__ */ Be(s) && !/* @__PURE__ */ Be(n) ? (s.value = n, !0) : Reflect.set(e, t, n, a);
  }
};
function rr(e) {
  return /* @__PURE__ */ Gt(e) ? e : new Proxy(e, Vl);
}
var Gl = class {
  constructor(e, t, n) {
    this.fn = e, this.setter = t, this._value = void 0, this.dep = new ks(this), this.__v_isRef = !0, this.deps = void 0, this.depsTail = void 0, this.flags = 16, this.globalVersion = Nn - 1, this.next = void 0, this.effect = this, this.__v_isReadonly = !t, this.isSSR = n;
  }
  notify() {
    if (this.flags |= 16, !(this.flags & 8) && we !== this)
      return Wi(this, !0), !0;
  }
  get value() {
    const e = this.dep.track();
    return Yi(this), e && (e.version = this.dep.version), this._value;
  }
  set value(e) {
    this.setter && this.setter(e);
  }
};
// @__NO_SIDE_EFFECTS__
function zl(e, t, n = !1) {
  let a, s;
  return ne(e) ? a = e : (a = e.get, s = e.set), new Gl(a, s, n);
}
var aa = {}, fa = /* @__PURE__ */ new WeakMap(), jt = void 0;
function Wl(e, t = !1, n = jt) {
  if (n) {
    let a = fa.get(n);
    a || fa.set(n, a = []), a.push(e);
  }
}
function Jl(e, t, n = he) {
  const { immediate: a, deep: s, once: i, scheduler: l, augmentJob: o, call: u } = n, v = (R) => s ? R : /* @__PURE__ */ Qe(R) || s === !1 || s === 0 ? St(R, 1) : St(R);
  let d, g, $, x, D = !1, P = !1;
  if (/* @__PURE__ */ Be(e) ? (g = () => e.value, D = /* @__PURE__ */ Qe(e)) : /* @__PURE__ */ Gt(e) ? (g = () => v(e), D = !0) : Z(e) ? (P = !0, D = e.some((R) => /* @__PURE__ */ Gt(R) || /* @__PURE__ */ Qe(R)), g = () => e.map((R) => {
    if (/* @__PURE__ */ Be(R)) return R.value;
    if (/* @__PURE__ */ Gt(R)) return v(R);
    if (ne(R)) return u ? u(R, 2) : R();
  })) : ne(e) ? t ? g = u ? () => u(e, 2) : e : g = () => {
    if ($) {
      _t();
      try {
        $();
      } finally {
        Ct();
      }
    }
    const R = jt;
    jt = d;
    try {
      return u ? u(e, 3, [x]) : e(x);
    } finally {
      jt = R;
    }
  } : g = ct, t && s) {
    const R = g, C = s === !0 ? 1 / 0 : s;
    g = () => St(R(), C);
  }
  const X = wl(), G = () => {
    d.stop(), X && X.active && ps(X.effects, d);
  };
  if (i && t) {
    const R = t;
    t = (...C) => {
      R(...C), G();
    };
  }
  let V = P ? new Array(e.length).fill(aa) : aa;
  const z = (R) => {
    if (!(!(d.flags & 1) || !d.dirty && !R))
      if (t) {
        const C = d.run();
        if (s || D || (P ? C.some((E, k) => dt(E, V[k])) : dt(C, V))) {
          $ && $();
          const E = jt;
          jt = d;
          try {
            const k = [
              C,
              V === aa ? void 0 : P && V[0] === aa ? [] : V,
              x
            ];
            V = C, u ? u(t, 3, k) : t(...k);
          } finally {
            jt = E;
          }
        }
      } else d.run();
  };
  return o && o(z), d = new Gi(g), d.scheduler = l ? () => l(z, !1) : z, x = (R) => Wl(R, !1, d), $ = d.onStop = () => {
    const R = fa.get(d);
    if (R) {
      if (u) u(R, 4);
      else for (const C of R) C();
      fa.delete(d);
    }
  }, t ? a ? z(!0) : V = d.run() : l ? l(z.bind(null, !0), !0) : d.run(), G.pause = d.pause.bind(d), G.resume = d.resume.bind(d), G.stop = G, G;
}
function St(e, t = 1 / 0, n) {
  if (t <= 0 || !ge(e) || e.__v_skip || (n = n || /* @__PURE__ */ new Map(), (n.get(e) || 0) >= t)) return e;
  if (n.set(e, t), t--, /* @__PURE__ */ Be(e)) St(e.value, t, n);
  else if (Z(e)) for (let a = 0; a < e.length; a++) St(e[a], t, n);
  else if (fn(e) || tn(e)) e.forEach((a) => {
    St(a, t, n);
  });
  else if (Ui(e)) {
    for (const a in e) St(e[a], t, n);
    for (const a of Object.getOwnPropertySymbols(e)) Object.prototype.propertyIsEnumerable.call(e, a) && St(e[a], t, n);
  }
  return e;
}
function Wn(e, t, n, a) {
  try {
    return a ? e(...a) : e();
  } catch (s) {
    Ea(s, t, n);
  }
}
function Ze(e, t, n, a) {
  if (ne(e)) {
    const s = Wn(e, t, n, a);
    return s && Bi(s) && s.catch((i) => {
      Ea(i, t, n);
    }), s;
  }
  if (Z(e)) {
    const s = [];
    for (let i = 0; i < e.length; i++) s.push(Ze(e[i], t, n, a));
    return s;
  }
}
function Ea(e, t, n, a = !0) {
  const s = t ? t.vnode : null, { errorHandler: i, throwUnhandledErrorInProduction: l } = t && t.appContext.config || he;
  if (t) {
    let o = t.parent;
    const u = t.proxy, v = `https://vuejs.org/error-reference/#runtime-${n}`;
    for (; o; ) {
      const d = o.ec;
      if (d) {
        for (let g = 0; g < d.length; g++) if (d[g](e, u, v) === !1) return;
      }
      o = o.parent;
    }
    if (i) {
      _t(), Wn(i, null, 10, [
        e,
        u,
        v
      ]), Ct();
      return;
    }
  }
  Xl(e, n, s, a, l);
}
function Xl(e, t, n, a = !0, s = !1) {
  if (s) throw e;
  console.error(e);
}
var Fe = [], rt = -1, nn = [], Lt = null, Qt = 0, lr = /* @__PURE__ */ Promise.resolve(), va = null;
function Jn(e) {
  const t = va || lr;
  return e ? t.then(this ? e.bind(this) : e) : t;
}
function Yl(e) {
  let t = rt + 1, n = Fe.length;
  for (; t < n; ) {
    const a = t + n >>> 1, s = Fe[a], i = Bn(s);
    i < e || i === e && s.flags & 2 ? t = a + 1 : n = a;
  }
  return t;
}
function _s(e) {
  if (!(e.flags & 1)) {
    const t = Bn(e), n = Fe[Fe.length - 1];
    !n || !(e.flags & 2) && t >= Bn(n) ? Fe.push(e) : Fe.splice(Yl(t), 0, e), e.flags |= 1, or();
  }
}
function or() {
  va || (va = lr.then(dr));
}
function Ql(e) {
  Z(e) ? nn.push(...e) : Lt && e.id === -1 ? Lt.splice(Qt + 1, 0, e) : e.flags & 1 || (nn.push(e), e.flags |= 1), or();
}
function Gs(e, t, n = rt + 1) {
  for (; n < Fe.length; n++) {
    const a = Fe[n];
    if (a && a.flags & 2) {
      if (e && a.id !== e.uid) continue;
      Fe.splice(n, 1), n--, a.flags & 4 && (a.flags &= -2), a(), a.flags & 4 || (a.flags &= -2);
    }
  }
}
function ur(e) {
  if (nn.length) {
    const t = [...new Set(nn)].sort((n, a) => Bn(n) - Bn(a));
    if (nn.length = 0, Lt) {
      Lt.push(...t);
      return;
    }
    for (Lt = t, Qt = 0; Qt < Lt.length; Qt++) {
      const n = Lt[Qt];
      n.flags & 4 && (n.flags &= -2), n.flags & 8 || n(), n.flags &= -2;
    }
    Lt = null, Qt = 0;
  }
}
var Bn = (e) => e.id == null ? e.flags & 2 ? -1 : 1 / 0 : e.id;
function dr(e) {
  try {
    for (rt = 0; rt < Fe.length; rt++) {
      const t = Fe[rt];
      t && !(t.flags & 8) && (t.flags & 4 && (t.flags &= -2), Wn(t, t.i, t.i ? 15 : 14), t.flags & 4 || (t.flags &= -2));
    }
  } finally {
    for (; rt < Fe.length; rt++) {
      const t = Fe[rt];
      t && (t.flags &= -2);
    }
    rt = -1, Fe.length = 0, ur(e), va = null, (Fe.length || nn.length) && dr(e);
  }
}
var Ie = null, cr = null;
function pa(e) {
  const t = Ie;
  return Ie = e, cr = e && e.type.__scopeId || null, t;
}
function Ma(e, t = Ie, n) {
  if (!t || e._n) return e;
  const a = (...s) => {
    a._d && ba(-1);
    const i = pa(t);
    let l;
    try {
      l = e(...s);
    } finally {
      pa(i), a._d && ba(1);
    }
    return l;
  };
  return a._n = !0, a._c = !0, a._d = !0, a;
}
function Ee(e, t) {
  if (Ie === null) return e;
  const n = Da(Ie), a = e.dirs || (e.dirs = []);
  for (let s = 0; s < t.length; s++) {
    let [i, l, o, u = he] = t[s];
    i && (ne(i) && (i = {
      mounted: i,
      updated: i
    }), i.deep && St(l), a.push({
      dir: i,
      instance: n,
      value: l,
      oldValue: void 0,
      arg: o,
      modifiers: u
    }));
  }
  return e;
}
function qt(e, t, n, a) {
  const s = e.dirs, i = t && t.dirs;
  for (let l = 0; l < s.length; l++) {
    const o = s[l];
    i && (o.oldValue = i[l].value);
    let u = o.dir[a];
    u && (_t(), Ze(u, n, 8, [
      e.el,
      o,
      e,
      t
    ]), Ct());
  }
}
function Zl(e, t) {
  if (Re) {
    let n = Re.provides;
    const a = Re.parent && Re.parent.provides;
    a === n && (n = Re.provides = Object.create(a)), n[e] = t;
  }
}
function ua(e, t, n = !1) {
  const a = Kr();
  if (a || sn) {
    let s = sn ? sn._context.provides : a ? a.parent == null || a.ce ? a.vnode.appContext && a.vnode.appContext.provides : a.parent.provides : void 0;
    if (s && e in s) return s[e];
    if (arguments.length > 1) return n && ne(t) ? t.call(a && a.proxy) : t;
  }
}
var eo = /* @__PURE__ */ Symbol.for("v-scx"), to = () => {
  {
    const e = ua(eo);
    return e;
  }
};
function zt(e, t, n) {
  return fr(e, t, n);
}
function fr(e, t, n = he) {
  const { immediate: a, deep: s, flush: i, once: l } = n, o = $e({}, n), u = t && a || !t && i !== "post";
  let v;
  if (Hn) {
    if (i === "sync") {
      const x = to();
      v = x.__watcherHandles || (x.__watcherHandles = []);
    } else if (!u) {
      const x = () => {
      };
      return x.stop = ct, x.resume = ct, x.pause = ct, x;
    }
  }
  const d = Re;
  o.call = (x, D, P) => Ze(x, d, D, P);
  let g = !1;
  i === "post" ? o.scheduler = (x) => {
    je(x, d && d.suspense);
  } : i !== "sync" && (g = !0, o.scheduler = (x, D) => {
    D ? x() : _s(x);
  }), o.augmentJob = (x) => {
    t && (x.flags |= 4), g && (x.flags |= 2, d && (x.id = d.uid, x.i = d));
  };
  const $ = Jl(e, t, o);
  return Hn && (v ? v.push($) : u && $()), $;
}
function no(e, t, n) {
  const a = this.proxy, s = _e(e) ? e.includes(".") ? vr(a, e) : () => a[e] : e.bind(a, a);
  let i;
  ne(t) ? i = t : (i = t.handler, n = t);
  const l = Xn(this), o = fr(s, i.bind(a), n);
  return l(), o;
}
function vr(e, t) {
  const n = t.split(".");
  return () => {
    let a = e;
    for (let s = 0; s < n.length && a; s++) a = a[n[s]];
    return a;
  };
}
var ao = /* @__PURE__ */ Symbol("_vte"), pr = (e) => e.__isTeleport, Ye = /* @__PURE__ */ Symbol("_leaveCb"), Sn = /* @__PURE__ */ Symbol("_enterCb");
function so() {
  const e = {
    isMounted: !1,
    isLeaving: !1,
    isUnmounting: !1,
    leavingVNodes: /* @__PURE__ */ new Map()
  };
  return ft(() => {
    e.isMounted = !0;
  }), vt(() => {
    e.isUnmounting = !0;
  }), e;
}
var Je = [Function, Array], gr = {
  mode: String,
  appear: Boolean,
  persisted: Boolean,
  onBeforeEnter: Je,
  onEnter: Je,
  onAfterEnter: Je,
  onEnterCancelled: Je,
  onBeforeLeave: Je,
  onLeave: Je,
  onAfterLeave: Je,
  onLeaveCancelled: Je,
  onBeforeAppear: Je,
  onAppear: Je,
  onAfterAppear: Je,
  onAppearCancelled: Je
}, mr = (e) => {
  const t = e.subTree;
  return t.component ? mr(t.component) : t;
}, io = {
  name: "BaseTransition",
  props: gr,
  setup(e, { slots: t }) {
    const n = Kr(), a = so();
    return () => {
      const s = t.default && yr(t.default(), !0), i = s && s.length ? br(s) : n.subTree ? F() : void 0;
      if (!i) return;
      const l = /* @__PURE__ */ te(e), { mode: o } = l;
      if (a.isLeaving) return ja(i);
      const u = zs(i);
      if (!u) return ja(i);
      let v = is(u, l, a, n, (g) => v = g);
      u.type !== Ne && qn(u, v);
      let d = n.subTree && zs(n.subTree);
      if (d && d.type !== Ne && !Kt(d, u) && mr(n).type !== Ne) {
        let g = is(d, l, a, n);
        if (qn(d, g), o === "out-in" && u.type !== Ne)
          return a.isLeaving = !0, g.afterLeave = () => {
            a.isLeaving = !1, n.job.flags & 8 || n.update(), delete g.afterLeave, d = void 0;
          }, ja(i);
        o === "in-out" && u.type !== Ne ? g.delayLeave = ($, x, D) => {
          const P = hr(a, d);
          P[String(d.key)] = d, $[Ye] = () => {
            x(), $[Ye] = void 0, delete v.delayedLeave, d = void 0;
          }, v.delayedLeave = () => {
            D(), delete v.delayedLeave, d = void 0;
          };
        } : d = void 0;
      } else d && (d = void 0);
      return i;
    };
  }
};
function br(e) {
  let t = e[0];
  if (e.length > 1) {
    for (const n of e) if (n.type !== Ne) {
      t = n;
      break;
    }
  }
  return t;
}
var ro = io;
function hr(e, t) {
  const { leavingVNodes: n } = e;
  let a = n.get(t.type);
  return a || (a = /* @__PURE__ */ Object.create(null), n.set(t.type, a)), a;
}
function is(e, t, n, a, s) {
  const { appear: i, mode: l, persisted: o = !1, onBeforeEnter: u, onEnter: v, onAfterEnter: d, onEnterCancelled: g, onBeforeLeave: $, onLeave: x, onAfterLeave: D, onLeaveCancelled: P, onBeforeAppear: X, onAppear: G, onAfterAppear: V, onAppearCancelled: z } = t, R = String(e.key), C = hr(n, e), E = (S, H) => {
    S && Ze(S, a, 9, H);
  }, k = (S, H) => {
    const se = H[1];
    E(S, H), Z(S) ? S.every((K) => K.length <= 1) && se() : S.length <= 1 && se();
  }, w = {
    mode: l,
    persisted: o,
    beforeEnter(S) {
      let H = u;
      if (!n.isMounted) if (i) H = X || u;
      else return;
      S[Ye] && S[Ye](!0);
      const se = C[R];
      se && Kt(e, se) && se.el[Ye] && se.el[Ye](), E(H, [S]);
    },
    enter(S) {
      if (C[R] === e) return;
      let H = v, se = d, K = g;
      if (!n.isMounted) if (i)
        H = G || v, se = V || d, K = z || g;
      else return;
      let J = !1;
      S[Sn] = (le) => {
        J || (J = !0, le ? E(K, [S]) : E(se, [S]), w.delayedLeave && w.delayedLeave(), S[Sn] = void 0);
      };
      const N = S[Sn].bind(null, !1);
      H ? k(H, [S, N]) : N();
    },
    leave(S, H) {
      const se = String(e.key);
      if (S[Sn] && S[Sn](!0), n.isUnmounting) return H();
      E($, [S]);
      let K = !1;
      S[Ye] = (N) => {
        K || (K = !0, H(), N ? E(P, [S]) : E(D, [S]), S[Ye] = void 0, C[se] === e && delete C[se]);
      };
      const J = S[Ye].bind(null, !1);
      C[se] = e, x ? k(x, [S, J]) : J();
    },
    clone(S) {
      const H = is(S, t, n, a, s);
      return s && s(H), H;
    }
  };
  return w;
}
function ja(e) {
  if (Ia(e))
    return e = Nt(e), e.children = null, e;
}
function zs(e) {
  if (!Ia(e))
    return pr(e.type) && e.children ? br(e.children) : e;
  if (e.component) return e.component.subTree;
  const { shapeFlag: t, children: n } = e;
  if (n) {
    if (t & 16) return n[0];
    if (t & 32 && ne(n.default)) return n.default();
  }
}
function qn(e, t) {
  e.shapeFlag & 6 && e.component ? (e.transition = t, qn(e.component.subTree, t)) : e.shapeFlag & 128 ? (e.ssContent.transition = t.clone(e.ssContent), e.ssFallback.transition = t.clone(e.ssFallback)) : e.transition = t;
}
function yr(e, t = !1, n) {
  let a = [], s = 0;
  for (let i = 0; i < e.length; i++) {
    let l = e[i];
    const o = n == null ? l.key : String(n) + String(l.key != null ? l.key : i);
    l.type === ae ? (l.patchFlag & 128 && s++, a = a.concat(yr(l.children, t, o))) : (t || l.type !== Ne) && a.push(o != null ? Nt(l, { key: o }) : l);
  }
  if (s > 1) for (let i = 0; i < a.length; i++) a[i].patchFlag = -2;
  return a;
}
// @__NO_SIDE_EFFECTS__
function ue(e, t) {
  return ne(e) ? $e({ name: e.name }, t, { setup: e }) : e;
}
function kr(e) {
  e.ids = [
    e.ids[0] + e.ids[2]++ + "-",
    0,
    0
  ];
}
function Ws(e, t) {
  let n;
  return !!((n = Object.getOwnPropertyDescriptor(e, t)) && !n.configurable);
}
var ga = /* @__PURE__ */ new WeakMap();
function On(e, t, n, a, s = !1) {
  if (Z(e)) {
    e.forEach((P, X) => On(P, t && (Z(t) ? t[X] : t), n, a, s));
    return;
  }
  if (an(a) && !s) {
    a.shapeFlag & 512 && a.type.__asyncResolved && a.component.subTree.component && On(e, t, n, a.component.subTree);
    return;
  }
  const i = a.shapeFlag & 4 ? Da(a.component) : a.el, l = s ? null : i, { i: o, r: u } = e, v = t && t.r, d = o.refs === he ? o.refs = {} : o.refs, g = o.setupState, $ = /* @__PURE__ */ te(g), x = g === he ? Ri : (P) => Ws(d, P) ? !1 : pe($, P), D = (P, X) => !(X && Ws(d, X));
  if (v != null && v !== u) {
    if (Js(t), _e(v))
      d[v] = null, x(v) && (g[v] = null);
    else if (/* @__PURE__ */ Be(v)) {
      const P = t;
      D(v, P.k) && (v.value = null), P.k && (d[P.k] = null);
    }
  }
  if (ne(u)) Wn(u, o, 12, [l, d]);
  else {
    const P = _e(u), X = /* @__PURE__ */ Be(u);
    if (P || X) {
      const G = () => {
        if (e.f) {
          const V = P ? x(u) ? g[u] : d[u] : D(u) || !e.k ? u.value : d[e.k];
          if (s) Z(V) && ps(V, i);
          else if (Z(V)) V.includes(i) || V.push(i);
          else if (P)
            d[u] = [i], x(u) && (g[u] = d[u]);
          else {
            const z = [i];
            D(u, e.k) && (u.value = z), e.k && (d[e.k] = z);
          }
        } else P ? (d[u] = l, x(u) && (g[u] = l)) : X && (D(u, e.k) && (u.value = l), e.k && (d[e.k] = l));
      };
      if (l) {
        const V = () => {
          G(), ga.delete(e);
        };
        V.id = -1, ga.set(e, V), je(V, n);
      } else
        Js(e), G();
    }
  }
}
function Js(e) {
  const t = ga.get(e);
  t && (t.flags |= 8, ga.delete(e));
}
var vh = Ta().requestIdleCallback || ((e) => setTimeout(e, 1)), ph = Ta().cancelIdleCallback || ((e) => clearTimeout(e)), an = (e) => !!e.type.__asyncLoader, Ia = (e) => e.type.__isKeepAlive;
function lo(e, t) {
  Sr(e, "a", t);
}
function oo(e, t) {
  Sr(e, "da", t);
}
function Sr(e, t, n = Re) {
  const a = e.__wdc || (e.__wdc = () => {
    let s = n;
    for (; s; ) {
      if (s.isDeactivated) return;
      s = s.parent;
    }
    return e();
  });
  if (Pa(t, a, n), n) {
    let s = n.parent;
    for (; s && s.parent; )
      Ia(s.parent.vnode) && uo(a, t, n, s), s = s.parent;
  }
}
function uo(e, t, n, a) {
  const s = Pa(t, e, a, !0);
  xr(() => {
    ps(a[t], s);
  }, n);
}
function Pa(e, t, n = Re, a = !1) {
  if (n) {
    const s = n[e] || (n[e] = []), i = t.__weh || (t.__weh = (...l) => {
      _t();
      const o = Xn(n), u = Ze(t, n, e, l);
      return o(), Ct(), u;
    });
    return a ? s.unshift(i) : s.push(i), i;
  }
}
var At = (e) => (t, n = Re) => {
  (!Hn || e === "sp") && Pa(e, (...a) => t(...a), n);
}, co = At("bm"), ft = At("m"), fo = At("bu"), vo = At("u"), vt = At("bum"), xr = At("um"), po = At("sp"), go = At("rtg"), mo = At("rtc");
function bo(e, t = Re) {
  Pa("ec", e, t);
}
var wr = "components", _r = /* @__PURE__ */ Symbol.for("v-ndc");
function ho(e) {
  return _e(e) ? yo(wr, e, !1) || e : e || _r;
}
function yo(e, t, n = !0, a = !1) {
  const s = Ie || Re;
  if (s) {
    const i = s.type;
    if (e === wr) {
      const o = au(i, !1);
      if (o && (o === t || o === He(t) || o === Ca(He(t)))) return i;
    }
    const l = Xs(s[e] || i[e], t) || Xs(s.appContext[e], t);
    return !l && a ? i : l;
  }
}
function Xs(e, t) {
  return e && (e[t] || e[He(t)] || e[Ca(He(t))]);
}
function ke(e, t, n, a) {
  let s;
  const i = n && n[a], l = Z(e);
  if (l || _e(e)) {
    const o = l && /* @__PURE__ */ Gt(e);
    let u = !1, v = !1;
    o && (u = !/* @__PURE__ */ Qe(e), v = /* @__PURE__ */ Tt(e), e = Aa(e)), s = new Array(e.length);
    for (let d = 0, g = e.length; d < g; d++) s[d] = t(u ? v ? rn(nt(e[d])) : nt(e[d]) : e[d], d, void 0, i && i[d]);
  } else if (typeof e == "number") {
    s = new Array(e);
    for (let o = 0; o < e; o++) s[o] = t(o + 1, o, void 0, i && i[o]);
  } else if (ge(e)) if (e[Symbol.iterator]) s = Array.from(e, (o, u) => t(o, u, void 0, i && i[u]));
  else {
    const o = Object.keys(e);
    s = new Array(o.length);
    for (let u = 0, v = o.length; u < v; u++) {
      const d = o[u];
      s[u] = t(e[d], d, u, i && i[u]);
    }
  }
  else s = [];
  return n && (n[a] = s), s;
}
function rs(e, t, n = {}, a, s) {
  if (Ie.ce || Ie.parent && an(Ie.parent) && Ie.parent.ce) {
    const v = Object.keys(n).length > 0;
    return t !== "default" && (n.name = t), m(), ye(ae, null, [Ce("slot", n, a && a())], v ? -2 : 64);
  }
  let i = e[t];
  i && i._c && (i._d = !1), m();
  const l = i && Cr(i(n)), o = n.key || l && l.key, u = ye(ae, { key: (o && !tt(o) ? o : `_${t}`) + (!l && a ? "_fb" : "") }, l || (a ? a() : []), l && e._ === 1 ? 64 : -2);
  return !s && u.scopeId && (u.slotScopeIds = [u.scopeId + "-s"]), i && i._c && (i._d = !0), u;
}
function Cr(e) {
  return e.some((t) => Fn(t) ? !(t.type === Ne || t.type === ae && !Cr(t.children)) : !0) ? e : null;
}
var ls = (e) => e ? Vr(e) ? Da(e) : ls(e.parent) : null, Ln = /* @__PURE__ */ $e(/* @__PURE__ */ Object.create(null), {
  $: (e) => e,
  $el: (e) => e.vnode.el,
  $data: (e) => e.data,
  $props: (e) => e.props,
  $attrs: (e) => e.attrs,
  $slots: (e) => e.slots,
  $refs: (e) => e.refs,
  $parent: (e) => ls(e.parent),
  $root: (e) => ls(e.root),
  $host: (e) => e.ce,
  $emit: (e) => e.emit,
  $options: (e) => Cs(e),
  $forceUpdate: (e) => e.f || (e.f = () => {
    _s(e.update);
  }),
  $nextTick: (e) => e.n || (e.n = Jn.bind(e.proxy)),
  $watch: (e) => no.bind(e)
}), Ka = (e, t) => e !== he && !e.__isScriptSetup && pe(e, t), ko = {
  get({ _: e }, t) {
    if (t === "__v_skip") return !0;
    const { ctx: n, setupState: a, data: s, props: i, accessCache: l, type: o, appContext: u } = e;
    if (t[0] !== "$") {
      const $ = l[t];
      if ($ !== void 0) switch ($) {
        case 1:
          return a[t];
        case 2:
          return s[t];
        case 4:
          return n[t];
        case 3:
          return i[t];
      }
      else {
        if (Ka(a, t))
          return l[t] = 1, a[t];
        if (s !== he && pe(s, t))
          return l[t] = 2, s[t];
        if (pe(i, t))
          return l[t] = 3, i[t];
        if (n !== he && pe(n, t))
          return l[t] = 4, n[t];
        os && (l[t] = 0);
      }
    }
    const v = Ln[t];
    let d, g;
    if (v)
      return t === "$attrs" && De(e.attrs, "get", ""), v(e);
    if ((d = o.__cssModules) && (d = d[t])) return d;
    if (n !== he && pe(n, t))
      return l[t] = 4, n[t];
    if (g = u.config.globalProperties, pe(g, t)) return g[t];
  },
  set({ _: e }, t, n) {
    const { data: a, setupState: s, ctx: i } = e;
    return Ka(s, t) ? (s[t] = n, !0) : a !== he && pe(a, t) ? (a[t] = n, !0) : pe(e.props, t) || t[0] === "$" && t.slice(1) in e ? !1 : (i[t] = n, !0);
  },
  has({ _: { data: e, setupState: t, accessCache: n, ctx: a, appContext: s, props: i, type: l } }, o) {
    let u;
    return !!(n[o] || e !== he && o[0] !== "$" && pe(e, o) || Ka(t, o) || pe(i, o) || pe(a, o) || pe(Ln, o) || pe(s.config.globalProperties, o) || (u = l.__cssModules) && u[o]);
  },
  defineProperty(e, t, n) {
    return n.get != null ? e._.accessCache[t] = 0 : pe(n, "value") && this.set(e, t, n.value, null), Reflect.defineProperty(e, t, n);
  }
};
function Ys(e) {
  return Z(e) ? e.reduce((t, n) => (t[n] = null, t), {}) : e;
}
var os = !0;
function So(e) {
  const t = Cs(e), n = e.proxy, a = e.ctx;
  os = !1, t.beforeCreate && Qs(t.beforeCreate, e, "bc");
  const { data: s, computed: i, methods: l, watch: o, provide: u, inject: v, created: d, beforeMount: g, mounted: $, beforeUpdate: x, updated: D, activated: P, deactivated: X, beforeDestroy: G, beforeUnmount: V, destroyed: z, unmounted: R, render: C, renderTracked: E, renderTriggered: k, errorCaptured: w, serverPrefetch: S, expose: H, inheritAttrs: se, components: K, directives: J, filters: N } = t;
  if (v && xo(v, a, null), l) for (const de in l) {
    const ve = l[de];
    ne(ve) && (a[de] = ve.bind(n));
  }
  if (s) {
    const de = s.call(n, n);
    ge(de) && (e.data = /* @__PURE__ */ $t(de));
  }
  if (os = !0, i) for (const de in i) {
    const ve = i[de], q = ee({
      get: ne(ve) ? ve.bind(n, n) : ne(ve.get) ? ve.get.bind(n, n) : ct,
      set: !ne(ve) && ne(ve.set) ? ve.set.bind(n) : ct
    });
    Object.defineProperty(a, de, {
      enumerable: !0,
      configurable: !0,
      get: () => q.value,
      set: (O) => q.value = O
    });
  }
  if (o) for (const de in o) $r(o[de], a, n, de);
  if (u) {
    const de = ne(u) ? u.call(n) : u;
    Reflect.ownKeys(de).forEach((ve) => {
      Zl(ve, de[ve]);
    });
  }
  d && Qs(d, e, "c");
  function xe(de, ve) {
    Z(ve) ? ve.forEach((q) => de(q.bind(n))) : ve && de(ve.bind(n));
  }
  if (xe(co, g), xe(ft, $), xe(fo, x), xe(vo, D), xe(lo, P), xe(oo, X), xe(bo, w), xe(mo, E), xe(go, k), xe(vt, V), xe(xr, R), xe(po, S), Z(H))
    if (H.length) {
      const de = e.exposed || (e.exposed = {});
      H.forEach((ve) => {
        Object.defineProperty(de, ve, {
          get: () => n[ve],
          set: (q) => n[ve] = q,
          enumerable: !0
        });
      });
    } else e.exposed || (e.exposed = {});
  C && e.render === ct && (e.render = C), se != null && (e.inheritAttrs = se), K && (e.components = K), J && (e.directives = J), S && kr(e);
}
function xo(e, t, n = ct) {
  Z(e) && (e = us(e));
  for (const a in e) {
    const s = e[a];
    let i;
    ge(s) ? "default" in s ? i = ua(s.from || a, s.default, !0) : i = ua(s.from || a) : i = ua(s), /* @__PURE__ */ Be(i) ? Object.defineProperty(t, a, {
      enumerable: !0,
      configurable: !0,
      get: () => i.value,
      set: (l) => i.value = l
    }) : t[a] = i;
  }
}
function Qs(e, t, n) {
  Ze(Z(e) ? e.map((a) => a.bind(t.proxy)) : e.bind(t.proxy), t, n);
}
function $r(e, t, n, a) {
  let s = a.includes(".") ? vr(n, a) : () => n[a];
  if (_e(e)) {
    const i = t[e];
    ne(i) && zt(s, i);
  } else if (ne(e)) zt(s, e.bind(n));
  else if (ge(e)) if (Z(e)) e.forEach((i) => $r(i, t, n, a));
  else {
    const i = ne(e.handler) ? e.handler.bind(n) : t[e.handler];
    ne(i) && zt(s, i, e);
  }
}
function Cs(e) {
  const t = e.type, { mixins: n, extends: a } = t, { mixins: s, optionsCache: i, config: { optionMergeStrategies: l } } = e.appContext, o = i.get(t);
  let u;
  return o ? u = o : !s.length && !n && !a ? u = t : (u = {}, s.length && s.forEach((v) => ma(u, v, l, !0)), ma(u, t, l)), ge(t) && i.set(t, u), u;
}
function ma(e, t, n, a = !1) {
  const { mixins: s, extends: i } = t;
  i && ma(e, i, n, !0), s && s.forEach((l) => ma(e, l, n, !0));
  for (const l in t) if (!(a && l === "expose")) {
    const o = wo[l] || n && n[l];
    e[l] = o ? o(e[l], t[l]) : t[l];
  }
  return e;
}
var wo = {
  data: Zs,
  props: ei,
  emits: ei,
  methods: Tn,
  computed: Tn,
  beforeCreate: Ue,
  created: Ue,
  beforeMount: Ue,
  mounted: Ue,
  beforeUpdate: Ue,
  updated: Ue,
  beforeDestroy: Ue,
  beforeUnmount: Ue,
  destroyed: Ue,
  unmounted: Ue,
  activated: Ue,
  deactivated: Ue,
  errorCaptured: Ue,
  serverPrefetch: Ue,
  components: Tn,
  directives: Tn,
  watch: Co,
  provide: Zs,
  inject: _o
};
function Zs(e, t) {
  return t ? e ? function() {
    return $e(ne(e) ? e.call(this, this) : e, ne(t) ? t.call(this, this) : t);
  } : t : e;
}
function _o(e, t) {
  return Tn(us(e), us(t));
}
function us(e) {
  if (Z(e)) {
    const t = {};
    for (let n = 0; n < e.length; n++) t[e[n]] = e[n];
    return t;
  }
  return e;
}
function Ue(e, t) {
  return e ? [...new Set([].concat(e, t))] : t;
}
function Tn(e, t) {
  return e ? $e(/* @__PURE__ */ Object.create(null), e, t) : t;
}
function ei(e, t) {
  return e ? Z(e) && Z(t) ? [.../* @__PURE__ */ new Set([...e, ...t])] : $e(/* @__PURE__ */ Object.create(null), Ys(e), Ys(t ?? {})) : t;
}
function Co(e, t) {
  if (!e) return t;
  if (!t) return e;
  const n = $e(/* @__PURE__ */ Object.create(null), e);
  for (const a in t) n[a] = Ue(e[a], t[a]);
  return n;
}
function Tr() {
  return {
    app: null,
    config: {
      isNativeTag: Ri,
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
var $o = 0;
function To(e, t) {
  return function(a, s = null) {
    ne(a) || (a = $e({}, a)), s != null && !ge(s) && (s = null);
    const i = Tr(), l = /* @__PURE__ */ new WeakSet(), o = [];
    let u = !1;
    const v = i.app = {
      _uid: $o++,
      _component: a,
      _props: s,
      _container: null,
      _context: i,
      _instance: null,
      version: ru,
      get config() {
        return i.config;
      },
      set config(d) {
      },
      use(d, ...g) {
        return l.has(d) || (d && ne(d.install) ? (l.add(d), d.install(v, ...g)) : ne(d) && (l.add(d), d(v, ...g))), v;
      },
      mixin(d) {
        return i.mixins.includes(d) || i.mixins.push(d), v;
      },
      component(d, g) {
        return g ? (i.components[d] = g, v) : i.components[d];
      },
      directive(d, g) {
        return g ? (i.directives[d] = g, v) : i.directives[d];
      },
      mount(d, g, $) {
        if (!u) {
          const x = v._ceVNode || Ce(a, s);
          return x.appContext = i, $ === !0 ? $ = "svg" : $ === !1 && ($ = void 0), g && t ? t(x, d) : e(x, d, $), u = !0, v._container = d, d.__vue_app__ = v, Da(x.component);
        }
      },
      onUnmount(d) {
        o.push(d);
      },
      unmount() {
        u && (Ze(o, v._instance, 16), e(null, v._container), delete v._container.__vue_app__);
      },
      provide(d, g) {
        return i.provides[d] = g, v;
      },
      runWithContext(d) {
        const g = sn;
        sn = v;
        try {
          return d();
        } finally {
          sn = g;
        }
      }
    };
    return v;
  };
}
var sn = null, Ao = (e, t) => t === "modelValue" || t === "model-value" ? e.modelModifiers : e[`${t}Modifiers`] || e[`${He(t)}Modifiers`] || e[`${Rt(t)}Modifiers`];
function Eo(e, t, ...n) {
  if (e.isUnmounted) return;
  const a = e.vnode.props || he;
  let s = n;
  const i = t.startsWith("update:"), l = i && Ao(a, t.slice(7));
  l && (l.trim && (s = n.map((d) => _e(d) ? d.trim() : d)), l.number && (s = n.map($a)));
  let o, u = a[o = Ba(t)] || a[o = Ba(He(t))];
  !u && i && (u = a[o = Ba(Rt(t))]), u && Ze(u, e, 6, s);
  const v = a[o + "Once"];
  if (v) {
    if (!e.emitted) e.emitted = {};
    else if (e.emitted[o]) return;
    e.emitted[o] = !0, Ze(v, e, 6, s);
  }
}
var Mo = /* @__PURE__ */ new WeakMap();
function Ar(e, t, n = !1) {
  const a = n ? Mo : t.emitsCache, s = a.get(e);
  if (s !== void 0) return s;
  const i = e.emits;
  let l = {}, o = !1;
  if (!ne(e)) {
    const u = (v) => {
      const d = Ar(v, t, !0);
      d && (o = !0, $e(l, d));
    };
    !n && t.mixins.length && t.mixins.forEach(u), e.extends && u(e.extends), e.mixins && e.mixins.forEach(u);
  }
  return !i && !o ? (ge(e) && a.set(e, null), null) : (Z(i) ? i.forEach((u) => l[u] = null) : $e(l, i), ge(e) && a.set(e, l), l);
}
function Oa(e, t) {
  return !e || !xa(t) ? !1 : (t = t.slice(2).replace(/Once$/, ""), pe(e, t[0].toLowerCase() + t.slice(1)) || pe(e, Rt(t)) || pe(e, t));
}
function Va(e) {
  const { type: t, vnode: n, proxy: a, withProxy: s, propsOptions: [i], slots: l, attrs: o, emit: u, render: v, renderCache: d, props: g, data: $, setupState: x, ctx: D, inheritAttrs: P } = e, X = pa(e);
  let G, V;
  try {
    if (n.shapeFlag & 4) {
      const R = s || a, C = R;
      G = ut(v.call(C, R, d, g, x, $, D)), V = o;
    } else {
      const R = t;
      G = ut(R.length > 1 ? R(g, {
        attrs: o,
        slots: l,
        emit: u
      }) : R(g, null)), V = t.props ? o : Io(o);
    }
  } catch (R) {
    Dn.length = 0, Ea(R, e, 1), G = Ce(Ne);
  }
  let z = G;
  if (V && P !== !1) {
    const R = Object.keys(V), { shapeFlag: C } = z;
    R.length && C & 7 && (i && R.some(wa) && (V = Po(V, i)), z = Nt(z, V, !1, !0));
  }
  return n.dirs && (z = Nt(z, null, !1, !0), z.dirs = z.dirs ? z.dirs.concat(n.dirs) : n.dirs), n.transition && qn(z, n.transition), G = z, pa(X), G;
}
var Io = (e) => {
  let t;
  for (const n in e) (n === "class" || n === "style" || xa(n)) && ((t || (t = {}))[n] = e[n]);
  return t;
}, Po = (e, t) => {
  const n = {};
  for (const a in e) (!wa(a) || !(a.slice(9) in t)) && (n[a] = e[a]);
  return n;
};
function Oo(e, t, n) {
  const { props: a, children: s, component: i } = e, { props: l, children: o, patchFlag: u } = t, v = i.emitsOptions;
  if (t.dirs || t.transition) return !0;
  if (n && u >= 0) {
    if (u & 1024) return !0;
    if (u & 16)
      return a ? ti(a, l, v) : !!l;
    if (u & 8) {
      const d = t.dynamicProps;
      for (let g = 0; g < d.length; g++) {
        const $ = d[g];
        if (Er(l, a, $) && !Oa(v, $)) return !0;
      }
    }
  } else
    return (s || o) && (!o || !o.$stable) ? !0 : a === l ? !1 : a ? l ? ti(a, l, v) : !0 : !!l;
  return !1;
}
function ti(e, t, n) {
  const a = Object.keys(t);
  if (a.length !== Object.keys(e).length) return !0;
  for (let s = 0; s < a.length; s++) {
    const i = a[s];
    if (Er(t, e, i) && !Oa(n, i)) return !0;
  }
  return !1;
}
function Er(e, t, n) {
  const a = e[n], s = t[n];
  return n === "style" && ge(a) && ge(s) ? !pn(a, s) : a !== s;
}
function Lo({ vnode: e, parent: t, suspense: n }, a) {
  for (; t; ) {
    const s = t.subTree;
    if (s.suspense && s.suspense.activeBranch === e && (s.suspense.vnode.el = s.el = a, e = s), s === e)
      (e = t.vnode).el = a, t = t.parent;
    else break;
  }
  n && n.activeBranch === e && (n.vnode.el = a);
}
var Mr = {}, Ir = () => Object.create(Mr), Pr = (e) => Object.getPrototypeOf(e) === Mr;
function Do(e, t, n, a = !1) {
  const s = {}, i = Ir();
  e.propsDefaults = /* @__PURE__ */ Object.create(null), Or(e, t, s, i);
  for (const l in e.propsOptions[0]) l in s || (s[l] = void 0);
  n ? e.props = a ? s : /* @__PURE__ */ Fl(s) : e.type.props ? e.props = s : e.props = i, e.attrs = i;
}
function No(e, t, n, a) {
  const { props: s, attrs: i, vnode: { patchFlag: l } } = e, o = /* @__PURE__ */ te(s), [u] = e.propsOptions;
  let v = !1;
  if ((a || l > 0) && !(l & 16)) {
    if (l & 8) {
      const d = e.vnode.dynamicProps;
      for (let g = 0; g < d.length; g++) {
        let $ = d[g];
        if (Oa(e.emitsOptions, $)) continue;
        const x = t[$];
        if (u) if (pe(i, $))
          x !== i[$] && (i[$] = x, v = !0);
        else {
          const D = He($);
          s[D] = ds(u, o, D, x, e, !1);
        }
        else x !== i[$] && (i[$] = x, v = !0);
      }
    }
  } else {
    Or(e, t, s, i) && (v = !0);
    let d;
    for (const g in o) (!t || !pe(t, g) && ((d = Rt(g)) === g || !pe(t, d))) && (u ? n && (n[g] !== void 0 || n[d] !== void 0) && (s[g] = ds(u, o, g, void 0, e, !0)) : delete s[g]);
    if (i !== o)
      for (const g in i) (!t || !pe(t, g)) && (delete i[g], v = !0);
  }
  v && kt(e.attrs, "set", "");
}
function Or(e, t, n, a) {
  const [s, i] = e.propsOptions;
  let l = !1, o;
  if (t) for (let u in t) {
    if (Mn(u)) continue;
    const v = t[u];
    let d;
    s && pe(s, d = He(u)) ? !i || !i.includes(d) ? n[d] = v : (o || (o = {}))[d] = v : Oa(e.emitsOptions, u) || (!(u in a) || v !== a[u]) && (a[u] = v, l = !0);
  }
  if (i) {
    const u = /* @__PURE__ */ te(n), v = o || he;
    for (let d = 0; d < i.length; d++) {
      const g = i[d];
      n[g] = ds(s, u, g, v[g], e, !pe(v, g));
    }
  }
  return l;
}
function ds(e, t, n, a, s, i) {
  const l = e[n];
  if (l != null) {
    const o = pe(l, "default");
    if (o && a === void 0) {
      const u = l.default;
      if (l.type !== Function && !l.skipFactory && ne(u)) {
        const { propsDefaults: v } = s;
        if (n in v) a = v[n];
        else {
          const d = Xn(s);
          a = v[n] = u.call(null, t), d();
        }
      } else a = u;
      s.ce && s.ce._setProp(n, a);
    }
    l[0] && (i && !o ? a = !1 : l[1] && (a === "" || a === Rt(n)) && (a = !0));
  }
  return a;
}
var Ro = /* @__PURE__ */ new WeakMap();
function Lr(e, t, n = !1) {
  const a = n ? Ro : t.propsCache, s = a.get(e);
  if (s) return s;
  const i = e.props, l = {}, o = [];
  let u = !1;
  if (!ne(e)) {
    const d = (g) => {
      u = !0;
      const [$, x] = Lr(g, t, !0);
      $e(l, $), x && o.push(...x);
    };
    !n && t.mixins.length && t.mixins.forEach(d), e.extends && d(e.extends), e.mixins && e.mixins.forEach(d);
  }
  if (!i && !u)
    return ge(e) && a.set(e, en), en;
  if (Z(i)) for (let d = 0; d < i.length; d++) {
    const g = He(i[d]);
    ni(g) && (l[g] = he);
  }
  else if (i) for (const d in i) {
    const g = He(d);
    if (ni(g)) {
      const $ = i[d], x = l[g] = Z($) || ne($) ? { type: $ } : $e({}, $), D = x.type;
      let P = !1, X = !0;
      if (Z(D)) for (let G = 0; G < D.length; ++G) {
        const V = D[G], z = ne(V) && V.name;
        if (z === "Boolean") {
          P = !0;
          break;
        } else z === "String" && (X = !1);
      }
      else P = ne(D) && D.name === "Boolean";
      x[0] = P, x[1] = X, (P || pe(x, "default")) && o.push(g);
    }
  }
  const v = [l, o];
  return ge(e) && a.set(e, v), v;
}
function ni(e) {
  return e[0] !== "$" && !Mn(e);
}
var $s = (e) => e === "_" || e === "_ctx" || e === "$stable", Ts = (e) => Z(e) ? e.map(ut) : [ut(e)], Bo = (e, t, n) => {
  if (t._n) return t;
  const a = Ma((...s) => Ts(t(...s)), n);
  return a._c = !1, a;
}, Dr = (e, t, n) => {
  const a = e._ctx;
  for (const s in e) {
    if ($s(s)) continue;
    const i = e[s];
    if (ne(i)) t[s] = Bo(s, i, a);
    else if (i != null) {
      const l = Ts(i);
      t[s] = () => l;
    }
  }
}, Nr = (e, t) => {
  const n = Ts(t);
  e.slots.default = () => n;
}, Rr = (e, t, n) => {
  for (const a in t) (n || !$s(a)) && (e[a] = t[a]);
}, qo = (e, t, n) => {
  const a = e.slots = Ir();
  if (e.vnode.shapeFlag & 32) {
    const s = t._;
    s ? (Rr(a, t, n), n && Fi(a, "_", s, !0)) : Dr(t, a);
  } else t && Nr(e, t);
}, Uo = (e, t, n) => {
  const { vnode: a, slots: s } = e;
  let i = !0, l = he;
  if (a.shapeFlag & 32) {
    const o = t._;
    o ? n && o === 1 ? i = !1 : Rr(s, t, n) : (i = !t.$stable, Dr(t, s)), l = t;
  } else t && (Nr(e, t), l = { default: 1 });
  if (i)
    for (const o in s) !$s(o) && l[o] == null && delete s[o];
}, je = Vo;
function Fo(e) {
  return Ho(e);
}
function Ho(e, t) {
  const n = Ta();
  n.__VUE__ = !0;
  const { insert: a, remove: s, patchProp: i, createElement: l, createText: o, createComment: u, setText: v, setElementText: d, parentNode: g, nextSibling: $, setScopeId: x = ct, insertStaticContent: D } = e, P = (c, f, h, _ = null, A = null, T = null, B = void 0, L = null, I = !!f.dynamicChildren) => {
    if (c === f) return;
    c && !Kt(c, f) && (_ = Bt(c), Te(c, A, T, !0), c = null), f.patchFlag === -2 && (I = !1, f.dynamicChildren = null);
    const { type: M, ref: j, shapeFlag: U } = f;
    switch (M) {
      case La:
        X(c, f, h, _);
        break;
      case Ne:
        G(c, f, h, _);
        break;
      case za:
        c == null && V(f, h, _, B);
        break;
      case ae:
        K(c, f, h, _, A, T, B, L, I);
        break;
      default:
        U & 1 ? C(c, f, h, _, A, T, B, L, I) : U & 6 ? J(c, f, h, _, A, T, B, L, I) : (U & 64 || U & 128) && M.process(c, f, h, _, A, T, B, L, I, Et);
    }
    j != null && A ? On(j, c && c.ref, T, f || c, !f) : j == null && c && c.ref != null && On(c.ref, null, T, c, !0);
  }, X = (c, f, h, _) => {
    if (c == null) a(f.el = o(f.children), h, _);
    else {
      const A = f.el = c.el;
      f.children !== c.children && v(A, f.children);
    }
  }, G = (c, f, h, _) => {
    c == null ? a(f.el = u(f.children || ""), h, _) : f.el = c.el;
  }, V = (c, f, h, _) => {
    [c.el, c.anchor] = D(c.children, f, h, _, c.el, c.anchor);
  }, z = ({ el: c, anchor: f }, h, _) => {
    let A;
    for (; c && c !== f; )
      A = $(c), a(c, h, _), c = A;
    a(f, h, _);
  }, R = ({ el: c, anchor: f }) => {
    let h;
    for (; c && c !== f; )
      h = $(c), s(c), c = h;
    s(f);
  }, C = (c, f, h, _, A, T, B, L, I) => {
    if (f.type === "svg" ? B = "svg" : f.type === "math" && (B = "mathml"), c == null) E(f, h, _, A, T, B, L, I);
    else {
      const M = c.el && c.el._isVueCE ? c.el : null;
      try {
        M && M._beginPatch(), S(c, f, A, T, B, L, I);
      } finally {
        M && M._endPatch();
      }
    }
  }, E = (c, f, h, _, A, T, B, L) => {
    let I, M;
    const { props: j, shapeFlag: U, transition: W, dirs: Q } = c;
    if (I = c.el = l(c.type, T, j && j.is, j), U & 8 ? d(I, c.children) : U & 16 && w(c.children, I, null, _, A, Ga(c, T), B, L), Q && qt(c, null, _, "created"), k(I, c, c.scopeId, B, _), j) {
      for (const ce in j) ce !== "value" && !Mn(ce) && i(I, ce, null, j[ce], T, _);
      "value" in j && i(I, "value", null, j.value, T), (M = j.onVnodeBeforeMount) && st(M, _, c);
    }
    Q && qt(c, null, _, "beforeMount");
    const re = jo(A, W);
    re && W.beforeEnter(I), a(I, f, h), ((M = j && j.onVnodeMounted) || re || Q) && je(() => {
      M && st(M, _, c), re && W.enter(I), Q && qt(c, null, _, "mounted");
    }, A);
  }, k = (c, f, h, _, A) => {
    if (h && x(c, h), _) for (let T = 0; T < _.length; T++) x(c, _[T]);
    if (A) {
      let T = A.subTree;
      if (f === T || Fr(T.type) && (T.ssContent === f || T.ssFallback === f)) {
        const B = A.vnode;
        k(c, B, B.scopeId, B.slotScopeIds, A.parent);
      }
    }
  }, w = (c, f, h, _, A, T, B, L, I = 0) => {
    for (let M = I; M < c.length; M++) P(null, c[M] = L ? yt(c[M]) : ut(c[M]), f, h, _, A, T, B, L);
  }, S = (c, f, h, _, A, T, B) => {
    const L = f.el = c.el;
    let { patchFlag: I, dynamicChildren: M, dirs: j } = f;
    I |= c.patchFlag & 16;
    const U = c.props || he, W = f.props || he;
    let Q;
    if (h && Ut(h, !1), (Q = W.onVnodeBeforeUpdate) && st(Q, h, f, c), j && qt(f, c, h, "beforeUpdate"), h && Ut(h, !0), (U.innerHTML && W.innerHTML == null || U.textContent && W.textContent == null) && d(L, ""), M ? H(c.dynamicChildren, M, L, h, _, Ga(f, A), T) : B || ve(c, f, L, null, h, _, Ga(f, A), T, !1), I > 0) {
      if (I & 16) se(L, U, W, h, A);
      else if (I & 2 && U.class !== W.class && i(L, "class", null, W.class, A), I & 4 && i(L, "style", U.style, W.style, A), I & 8) {
        const re = f.dynamicProps;
        for (let ce = 0; ce < re.length; ce++) {
          const fe = re[ce], me = U[fe], be = W[fe];
          (be !== me || fe === "value") && i(L, fe, me, be, A, h);
        }
      }
      I & 1 && c.children !== f.children && d(L, f.children);
    } else !B && M == null && se(L, U, W, h, A);
    ((Q = W.onVnodeUpdated) || j) && je(() => {
      Q && st(Q, h, f, c), j && qt(f, c, h, "updated");
    }, _);
  }, H = (c, f, h, _, A, T, B) => {
    for (let L = 0; L < f.length; L++) {
      const I = c[L], M = f[L];
      P(I, M, I.el && (I.type === ae || !Kt(I, M) || I.shapeFlag & 198) ? g(I.el) : h, null, _, A, T, B, !0);
    }
  }, se = (c, f, h, _, A) => {
    if (f !== h) {
      if (f !== he)
        for (const T in f) !Mn(T) && !(T in h) && i(c, T, f[T], null, A, _);
      for (const T in h) {
        if (Mn(T)) continue;
        const B = h[T], L = f[T];
        B !== L && T !== "value" && i(c, T, L, B, A, _);
      }
      "value" in h && i(c, "value", f.value, h.value, A);
    }
  }, K = (c, f, h, _, A, T, B, L, I) => {
    const M = f.el = c ? c.el : o(""), j = f.anchor = c ? c.anchor : o("");
    let { patchFlag: U, dynamicChildren: W, slotScopeIds: Q } = f;
    Q && (L = L ? L.concat(Q) : Q), c == null ? (a(M, h, _), a(j, h, _), w(f.children || [], h, j, A, T, B, L, I)) : U > 0 && U & 64 && W && c.dynamicChildren && c.dynamicChildren.length === W.length ? (H(c.dynamicChildren, W, h, A, T, B, L), (f.key != null || A && f === A.subTree) && Br(c, f, !0)) : ve(c, f, h, j, A, T, B, L, I);
  }, J = (c, f, h, _, A, T, B, L, I) => {
    f.slotScopeIds = L, c == null ? f.shapeFlag & 512 ? A.ctx.activate(f, h, _, B, I) : N(f, h, _, A, T, B, I) : le(c, f, I);
  }, N = (c, f, h, _, A, T, B) => {
    const L = c.component = Qo(c, _, A);
    if (Ia(c) && (L.ctx.renderer = Et), Zo(L, !1, B), L.asyncDep) {
      if (A && A.registerDep(L, xe, B), !c.el) {
        const I = L.subTree = Ce(Ne);
        G(null, I, f, h), c.placeholder = I.el;
      }
    } else xe(L, c, f, h, A, T, B);
  }, le = (c, f, h) => {
    const _ = f.component = c.component;
    if (Oo(c, f, h)) if (_.asyncDep && !_.asyncResolved) {
      de(_, f, h);
      return;
    } else
      _.next = f, _.update();
    else
      f.el = c.el, _.vnode = f;
  }, xe = (c, f, h, _, A, T, B) => {
    const L = () => {
      if (c.isMounted) {
        let { next: U, bu: W, u: Q, parent: re, vnode: ce } = c;
        {
          const Pe = qr(c);
          if (Pe) {
            U && (U.el = ce.el, de(c, U, B)), Pe.asyncDep.then(() => {
              je(() => {
                c.isUnmounted || M();
              }, A);
            });
            return;
          }
        }
        let fe = U, me;
        Ut(c, !1), U ? (U.el = ce.el, de(c, U, B)) : U = ce, W && oa(W), (me = U.props && U.props.onVnodeBeforeUpdate) && st(me, re, U, ce), Ut(c, !0);
        const be = Va(c), qe = c.subTree;
        c.subTree = be, P(qe, be, g(qe.el), Bt(qe), c, A, T), U.el = be.el, fe === null && Lo(c, be.el), Q && je(Q, A), (me = U.props && U.props.onVnodeUpdated) && je(() => st(me, re, U, ce), A);
      } else {
        let U;
        const { el: W, props: Q } = f, { bm: re, m: ce, parent: fe, root: me, type: be } = c, qe = an(f);
        if (Ut(c, !1), re && oa(re), !qe && (U = Q && Q.onVnodeBeforeMount) && st(U, fe, f), Ut(c, !0), W && p) {
          const Pe = () => {
            c.subTree = Va(c), p(W, c.subTree, c, A, null);
          };
          qe && be.__asyncHydrate ? be.__asyncHydrate(W, c, Pe) : Pe();
        } else {
          me.ce && me.ce._hasShadowRoot() && me.ce._injectChildStyle(be, c.parent ? c.parent.type : void 0);
          const Pe = c.subTree = Va(c);
          P(null, Pe, h, _, c, A, T), f.el = Pe.el;
        }
        if (ce && je(ce, A), !qe && (U = Q && Q.onVnodeMounted)) {
          const Pe = f;
          je(() => st(U, fe, Pe), A);
        }
        (f.shapeFlag & 256 || fe && an(fe.vnode) && fe.vnode.shapeFlag & 256) && c.a && je(c.a, A), c.isMounted = !0, f = h = _ = null;
      }
    };
    c.scope.on();
    const I = c.effect = new Gi(L);
    c.scope.off();
    const M = c.update = I.run.bind(I), j = c.job = I.runIfDirty.bind(I);
    j.i = c, j.id = c.uid, I.scheduler = () => _s(j), Ut(c, !0), M();
  }, de = (c, f, h) => {
    f.component = c;
    const _ = c.vnode.props;
    c.vnode = f, c.next = null, No(c, f.props, _, h), Uo(c, f.children, h), _t(), Gs(c), Ct();
  }, ve = (c, f, h, _, A, T, B, L, I = !1) => {
    const M = c && c.children, j = c ? c.shapeFlag : 0, U = f.children, { patchFlag: W, shapeFlag: Q } = f;
    if (W > 0) {
      if (W & 128) {
        O(M, U, h, _, A, T, B, L, I);
        return;
      } else if (W & 256) {
        q(M, U, h, _, A, T, B, L, I);
        return;
      }
    }
    Q & 8 ? (j & 16 && at(M, A, T), U !== M && d(h, U)) : j & 16 ? Q & 16 ? O(M, U, h, _, A, T, B, L, I) : at(M, A, T, !0) : (j & 8 && d(h, ""), Q & 16 && w(U, h, _, A, T, B, L, I));
  }, q = (c, f, h, _, A, T, B, L, I) => {
    c = c || en, f = f || en;
    const M = c.length, j = f.length, U = Math.min(M, j);
    let W;
    for (W = 0; W < U; W++) {
      const Q = f[W] = I ? yt(f[W]) : ut(f[W]);
      P(c[W], Q, h, null, A, T, B, L, I);
    }
    M > j ? at(c, A, T, !0, !1, U) : w(f, h, _, A, T, B, L, I, U);
  }, O = (c, f, h, _, A, T, B, L, I) => {
    let M = 0;
    const j = f.length;
    let U = c.length - 1, W = j - 1;
    for (; M <= U && M <= W; ) {
      const Q = c[M], re = f[M] = I ? yt(f[M]) : ut(f[M]);
      if (Kt(Q, re)) P(Q, re, h, null, A, T, B, L, I);
      else break;
      M++;
    }
    for (; M <= U && M <= W; ) {
      const Q = c[U], re = f[W] = I ? yt(f[W]) : ut(f[W]);
      if (Kt(Q, re)) P(Q, re, h, null, A, T, B, L, I);
      else break;
      U--, W--;
    }
    if (M > U) {
      if (M <= W) {
        const Q = W + 1, re = Q < j ? f[Q].el : _;
        for (; M <= W; )
          P(null, f[M] = I ? yt(f[M]) : ut(f[M]), h, re, A, T, B, L, I), M++;
      }
    } else if (M > W) for (; M <= U; )
      Te(c[M], A, T, !0), M++;
    else {
      const Q = M, re = M, ce = /* @__PURE__ */ new Map();
      for (M = re; M <= W; M++) {
        const Oe = f[M] = I ? yt(f[M]) : ut(f[M]);
        Oe.key != null && ce.set(Oe.key, M);
      }
      let fe, me = 0;
      const be = W - re + 1;
      let qe = !1, Pe = 0;
      const Mt = new Array(be);
      for (M = 0; M < be; M++) Mt[M] = 0;
      for (M = Q; M <= U; M++) {
        const Oe = c[M];
        if (me >= be) {
          Te(Oe, A, T, !0);
          continue;
        }
        let Ke;
        if (Oe.key != null) Ke = ce.get(Oe.key);
        else for (fe = re; fe <= W; fe++) if (Mt[fe - re] === 0 && Kt(Oe, f[fe])) {
          Ke = fe;
          break;
        }
        Ke === void 0 ? Te(Oe, A, T, !0) : (Mt[Ke - re] = M + 1, Ke >= Pe ? Pe = Ke : qe = !0, P(Oe, f[Ke], h, null, A, T, B, L, I), me++);
      }
      const hn = qe ? Ko(Mt) : en;
      for (fe = hn.length - 1, M = be - 1; M >= 0; M--) {
        const Oe = re + M, Ke = f[Oe], Jt = f[Oe + 1], yn = Oe + 1 < j ? Jt.el || Ur(Jt) : _;
        Mt[M] === 0 ? P(null, Ke, h, yn, A, T, B, L, I) : qe && (fe < 0 || M !== hn[fe] ? ie(Ke, h, yn, 2) : fe--);
      }
    }
  }, ie = (c, f, h, _, A = null) => {
    const { el: T, type: B, transition: L, children: I, shapeFlag: M } = c;
    if (M & 6) {
      ie(c.component.subTree, f, h, _);
      return;
    }
    if (M & 128) {
      c.suspense.move(f, h, _);
      return;
    }
    if (M & 64) {
      B.move(c, f, h, Et);
      return;
    }
    if (B === ae) {
      a(T, f, h);
      for (let j = 0; j < I.length; j++) ie(I[j], f, h, _);
      a(c.anchor, f, h);
      return;
    }
    if (B === za) {
      z(c, f, h);
      return;
    }
    if (_ !== 2 && M & 1 && L) if (_ === 0) L.persisted && !T[Ye] ? a(T, f, h) : (L.beforeEnter(T), a(T, f, h), je(() => L.enter(T), A));
    else {
      const { leave: j, delayLeave: U, afterLeave: W } = L, Q = () => {
        c.ctx.isUnmounted ? s(T) : a(T, f, h);
      }, re = () => {
        const ce = T._isLeaving || !!T[Ye];
        T._isLeaving && T[Ye](!0), L.persisted && !ce ? Q() : j(T, () => {
          Q(), W && W();
        });
      };
      U ? U(T, Q, re) : re();
    }
    else a(T, f, h);
  }, Te = (c, f, h, _ = !1, A = !1) => {
    const { type: T, props: B, ref: L, children: I, dynamicChildren: M, shapeFlag: j, patchFlag: U, dirs: W, cacheIndex: Q, memo: re } = c;
    if (U === -2 && (A = !1), L != null && (_t(), On(L, null, h, c, !0), Ct()), Q != null && (f.renderCache[Q] = void 0), j & 256) {
      f.ctx.deactivate(c);
      return;
    }
    const ce = j & 1 && W, fe = !an(c);
    let me;
    if (fe && (me = B && B.onVnodeBeforeUnmount) && st(me, f, c), j & 6) Zn(c.component, h, _);
    else {
      if (j & 128) {
        c.suspense.unmount(h, _);
        return;
      }
      ce && qt(c, null, f, "beforeUnmount"), j & 64 ? c.type.remove(c, f, h, Et, _) : M && !M.hasOnce && (T !== ae || U > 0 && U & 64) ? at(M, f, h, !1, !0) : (T === ae && U & 384 || !A && j & 16) && at(I, f, h), _ && Wt(c);
    }
    const be = re != null && Q == null;
    (fe && (me = B && B.onVnodeUnmounted) || ce || be) && je(() => {
      me && st(me, f, c), ce && qt(c, null, f, "unmounted"), be && (c.el = null);
    }, h);
  }, Wt = (c) => {
    const { type: f, el: h, anchor: _, transition: A } = c;
    if (f === ae) {
      Na(h, _);
      return;
    }
    if (f === za) {
      R(c);
      return;
    }
    const T = () => {
      s(h), A && !A.persisted && A.afterLeave && A.afterLeave();
    };
    if (c.shapeFlag & 1 && A && !A.persisted) {
      const { leave: B, delayLeave: L } = A, I = () => B(h, T);
      L ? L(c.el, T, I) : I();
    } else T();
  }, Na = (c, f) => {
    let h;
    for (; c !== f; )
      h = $(c), s(c), c = h;
    s(f);
  }, Zn = (c, f, h) => {
    const { bum: _, scope: A, job: T, subTree: B, um: L, m: I, a: M } = c;
    ai(I), ai(M), _ && oa(_), A.stop(), T && (T.flags |= 8, Te(B, c, f, h)), L && je(L, f), je(() => {
      c.isUnmounted = !0;
    }, f);
  }, at = (c, f, h, _ = !1, A = !1, T = 0) => {
    for (let B = T; B < c.length; B++) Te(c[B], f, h, _, A);
  }, Bt = (c) => {
    if (c.shapeFlag & 6) return Bt(c.component.subTree);
    if (c.shapeFlag & 128) return c.suspense.next();
    const f = $(c.anchor || c.el), h = f && f[ao];
    return h ? $(h) : f;
  };
  let mn = !1;
  const ea = (c, f, h) => {
    let _;
    c == null ? f._vnode && (Te(f._vnode, null, null, !0), _ = f._vnode.component) : P(f._vnode || null, c, f, null, null, null, h), f._vnode = c, mn || (mn = !0, Gs(_), ur(), mn = !1);
  }, Et = {
    p: P,
    um: Te,
    m: ie,
    r: Wt,
    mt: N,
    mc: w,
    pc: ve,
    pbc: H,
    n: Bt,
    o: e
  };
  let bn, p;
  return t && ([bn, p] = t(Et)), {
    render: ea,
    hydrate: bn,
    createApp: To(ea, bn)
  };
}
function Ga({ type: e, props: t }, n) {
  return n === "svg" && e === "foreignObject" || n === "mathml" && e === "annotation-xml" && t && t.encoding && t.encoding.includes("html") ? void 0 : n;
}
function Ut({ effect: e, job: t }, n) {
  n ? (e.flags |= 32, t.flags |= 4) : (e.flags &= -33, t.flags &= -5);
}
function jo(e, t) {
  return (!e || e && !e.pendingBranch) && t && !t.persisted;
}
function Br(e, t, n = !1) {
  const a = e.children, s = t.children;
  if (Z(a) && Z(s)) for (let i = 0; i < a.length; i++) {
    const l = a[i];
    let o = s[i];
    o.shapeFlag & 1 && !o.dynamicChildren && ((o.patchFlag <= 0 || o.patchFlag === 32) && (o = s[i] = yt(s[i]), o.el = l.el), !n && o.patchFlag !== -2 && Br(l, o)), o.type === La && (o.patchFlag === -1 && (o = s[i] = yt(o)), o.el = l.el), o.type === Ne && !o.el && (o.el = l.el);
  }
}
function Ko(e) {
  const t = e.slice(), n = [0];
  let a, s, i, l, o;
  const u = e.length;
  for (a = 0; a < u; a++) {
    const v = e[a];
    if (v !== 0) {
      if (s = n[n.length - 1], e[s] < v) {
        t[a] = s, n.push(a);
        continue;
      }
      for (i = 0, l = n.length - 1; i < l; )
        o = i + l >> 1, e[n[o]] < v ? i = o + 1 : l = o;
      v < e[n[i]] && (i > 0 && (t[a] = n[i - 1]), n[i] = a);
    }
  }
  for (i = n.length, l = n[i - 1]; i-- > 0; )
    n[i] = l, l = t[l];
  return n;
}
function qr(e) {
  const t = e.subTree.component;
  if (t) return t.asyncDep && !t.asyncResolved ? t : qr(t);
}
function ai(e) {
  if (e) for (let t = 0; t < e.length; t++) e[t].flags |= 8;
}
function Ur(e) {
  if (e.placeholder) return e.placeholder;
  const t = e.component;
  return t ? Ur(t.subTree) : null;
}
var Fr = (e) => e.__isSuspense;
function Vo(e, t) {
  t && t.pendingBranch ? Z(e) ? t.effects.push(...e) : t.effects.push(e) : Ql(e);
}
var ae = /* @__PURE__ */ Symbol.for("v-fgt"), La = /* @__PURE__ */ Symbol.for("v-txt"), Ne = /* @__PURE__ */ Symbol.for("v-cmt"), za = /* @__PURE__ */ Symbol.for("v-stc"), Dn = [], ze = null;
function m(e = !1) {
  Dn.push(ze = e ? null : []);
}
function Go() {
  Dn.pop(), ze = Dn[Dn.length - 1] || null;
}
var Un = 1;
function ba(e, t = !1) {
  Un += e, e < 0 && ze && t && (ze.hasOnce = !0);
}
function Hr(e) {
  return e.dynamicChildren = Un > 0 ? ze || en : null, Go(), Un > 0 && ze && ze.push(e), e;
}
function y(e, t, n, a, s, i) {
  return Hr(r(e, t, n, a, s, i, !0));
}
function ye(e, t, n, a, s) {
  return Hr(Ce(e, t, n, a, s, !0));
}
function Fn(e) {
  return e ? e.__v_isVNode === !0 : !1;
}
function Kt(e, t) {
  return e.type === t.type && e.key === t.key;
}
var jr = ({ key: e }) => e ?? null, da = ({ ref: e, ref_key: t, ref_for: n }) => (typeof e == "number" && (e = "" + e), e != null ? _e(e) || /* @__PURE__ */ Be(e) || ne(e) ? {
  i: Ie,
  r: e,
  k: t,
  f: !!n
} : e : null);
function r(e, t = null, n = null, a = 0, s = null, i = e === ae ? 0 : 1, l = !1, o = !1) {
  const u = {
    __v_isVNode: !0,
    __v_skip: !0,
    type: e,
    props: t,
    key: t && jr(t),
    ref: t && da(t),
    scopeId: cr,
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
    dynamicProps: s,
    dynamicChildren: null,
    appContext: null,
    ctx: Ie
  };
  return o ? (As(u, n), i & 128 && e.normalize(u)) : n && (u.shapeFlag |= _e(n) ? 8 : 16), Un > 0 && !l && ze && (u.patchFlag > 0 || i & 6) && u.patchFlag !== 32 && ze.push(u), u;
}
var Ce = zo;
function zo(e, t = null, n = null, a = 0, s = null, i = !1) {
  if ((!e || e === _r) && (e = Ne), Fn(e)) {
    const o = Nt(e, t, !0);
    return n && As(o, n), Un > 0 && !i && ze && (o.shapeFlag & 6 ? ze[ze.indexOf(e)] = o : ze.push(o)), o.patchFlag = -2, o;
  }
  if (su(e) && (e = e.__vccOpts), t) {
    t = Wo(t);
    let { class: o, style: u } = t;
    o && !_e(o) && (t.class = oe(o)), ge(u) && (/* @__PURE__ */ ws(u) && !Z(u) && (u = $e({}, u)), t.style = vn(u));
  }
  const l = _e(e) ? 1 : Fr(e) ? 128 : pr(e) ? 64 : ge(e) ? 4 : ne(e) ? 2 : 0;
  return r(e, t, n, a, s, l, i, !0);
}
function Wo(e) {
  return e ? /* @__PURE__ */ ws(e) || Pr(e) ? $e({}, e) : e : null;
}
function Nt(e, t, n = !1, a = !1) {
  const { props: s, ref: i, patchFlag: l, children: o, transition: u } = e, v = t ? Jo(s || {}, t) : s, d = {
    __v_isVNode: !0,
    __v_skip: !0,
    type: e.type,
    props: v,
    key: v && jr(v),
    ref: t && t.ref ? n && i ? Z(i) ? i.concat(da(t)) : [i, da(t)] : da(t) : i,
    scopeId: e.scopeId,
    slotScopeIds: e.slotScopeIds,
    children: o,
    target: e.target,
    targetStart: e.targetStart,
    targetAnchor: e.targetAnchor,
    staticCount: e.staticCount,
    shapeFlag: e.shapeFlag,
    patchFlag: t && e.type !== ae ? l === -1 ? 16 : l | 16 : l,
    dynamicProps: e.dynamicProps,
    dynamicChildren: e.dynamicChildren,
    appContext: e.appContext,
    dirs: e.dirs,
    transition: u,
    component: e.component,
    suspense: e.suspense,
    ssContent: e.ssContent && Nt(e.ssContent),
    ssFallback: e.ssFallback && Nt(e.ssFallback),
    placeholder: e.placeholder,
    el: e.el,
    anchor: e.anchor,
    ctx: e.ctx,
    ce: e.ce
  };
  return u && a && qn(d, u.clone(d)), d;
}
function Se(e = " ", t = 0) {
  return Ce(La, null, e, t);
}
function F(e = "", t = !1) {
  return t ? (m(), ye(Ne, null, e)) : Ce(Ne, null, e);
}
function ut(e) {
  return e == null || typeof e == "boolean" ? Ce(Ne) : Z(e) ? Ce(ae, null, e.slice()) : Fn(e) ? yt(e) : Ce(La, null, String(e));
}
function yt(e) {
  return e.el === null && e.patchFlag !== -1 || e.memo ? e : Nt(e);
}
function As(e, t) {
  let n = 0;
  const { shapeFlag: a } = e;
  if (t == null) t = null;
  else if (Z(t)) n = 16;
  else if (typeof t == "object") if (a & 65) {
    const s = t.default;
    s && (s._c && (s._d = !1), As(e, s()), s._c && (s._d = !0));
    return;
  } else {
    n = 32;
    const s = t._;
    !s && !Pr(t) ? t._ctx = Ie : s === 3 && Ie && (Ie.slots._ === 1 ? t._ = 1 : (t._ = 2, e.patchFlag |= 1024));
  }
  else ne(t) ? (t = {
    default: t,
    _ctx: Ie
  }, n = 32) : (t = String(t), a & 64 ? (n = 16, t = [Se(t)]) : n = 8);
  e.children = t, e.shapeFlag |= n;
}
function Jo(...e) {
  const t = {};
  for (let n = 0; n < e.length; n++) {
    const a = e[n];
    for (const s in a) if (s === "class")
      t.class !== a.class && (t.class = oe([t.class, a.class]));
    else if (s === "style") t.style = vn([t.style, a.style]);
    else if (xa(s)) {
      const i = t[s], l = a[s];
      l && i !== l && !(Z(i) && i.includes(l)) ? t[s] = i ? [].concat(i, l) : l : l == null && i == null && !wa(s) && (t[s] = l);
    } else s !== "" && (t[s] = a[s]);
  }
  return t;
}
function st(e, t, n, a = null) {
  Ze(e, t, 7, [n, a]);
}
var Xo = Tr(), Yo = 0;
function Qo(e, t, n) {
  const a = e.type, s = (t ? t.appContext : e.appContext) || Xo, i = {
    uid: Yo++,
    vnode: e,
    type: a,
    parent: t,
    appContext: s,
    root: null,
    next: null,
    subTree: null,
    effect: null,
    update: null,
    job: null,
    scope: new xl(!0),
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
    propsOptions: Lr(a, s),
    emitsOptions: Ar(a, s),
    emit: null,
    emitted: null,
    propsDefaults: he,
    inheritAttrs: a.inheritAttrs,
    ctx: he,
    data: he,
    props: he,
    attrs: he,
    slots: he,
    refs: he,
    setupState: he,
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
  return i.ctx = { _: i }, i.root = t ? t.root : i, i.emit = Eo.bind(null, i), e.ce && e.ce(i), i;
}
var Re = null, Kr = () => Re || Ie, ha, cs;
{
  const e = Ta(), t = (n, a) => {
    let s;
    return (s = e[n]) || (s = e[n] = []), s.push(a), (i) => {
      s.length > 1 ? s.forEach((l) => l(i)) : s[0](i);
    };
  };
  ha = t("__VUE_INSTANCE_SETTERS__", (n) => Re = n), cs = t("__VUE_SSR_SETTERS__", (n) => Hn = n);
}
var Xn = (e) => {
  const t = Re;
  return ha(e), e.scope.on(), () => {
    e.scope.off(), ha(t);
  };
}, si = () => {
  Re && Re.scope.off(), ha(null);
};
function Vr(e) {
  return e.vnode.shapeFlag & 4;
}
var Hn = !1;
function Zo(e, t = !1, n = !1) {
  t && cs(t);
  const { props: a, children: s } = e.vnode, i = Vr(e);
  Do(e, a, i, t), qo(e, s, n || t);
  const l = i ? eu(e, t) : void 0;
  return t && cs(!1), l;
}
function eu(e, t) {
  const n = e.type;
  e.accessCache = /* @__PURE__ */ Object.create(null), e.proxy = new Proxy(e.ctx, ko);
  const { setup: a } = n;
  if (a) {
    _t();
    const s = e.setupContext = a.length > 1 ? nu(e) : null, i = Xn(e), l = Wn(a, e, 0, [e.props, s]), o = Bi(l);
    if (Ct(), i(), (o || e.sp) && !an(e) && kr(e), o) {
      if (l.then(si, si), t) return l.then((u) => {
        ii(e, u, t);
      }).catch((u) => {
        Ea(u, e, 0);
      });
      e.asyncDep = l;
    } else ii(e, l, t);
  } else Gr(e, t);
}
function ii(e, t, n) {
  ne(t) ? e.type.__ssrInlineRender ? e.ssrRender = t : e.render = t : ge(t) && (e.setupState = rr(t)), Gr(e, n);
}
var ri, li;
function Gr(e, t, n) {
  const a = e.type;
  if (!e.render) {
    if (!t && ri && !a.render) {
      const s = a.template || Cs(e).template;
      if (s) {
        const { isCustomElement: i, compilerOptions: l } = e.appContext.config, { delimiters: o, compilerOptions: u } = a, v = $e($e({
          isCustomElement: i,
          delimiters: o
        }, l), u);
        a.render = ri(s, v);
      }
    }
    e.render = a.render || ct, li && li(e);
  }
  {
    const s = Xn(e);
    _t();
    try {
      So(e);
    } finally {
      Ct(), s();
    }
  }
}
var tu = { get(e, t) {
  return De(e, "get", ""), e[t];
} };
function nu(e) {
  const t = (n) => {
    e.exposed = n || {};
  };
  return {
    attrs: new Proxy(e.attrs, tu),
    slots: e.slots,
    emit: e.emit,
    expose: t
  };
}
function Da(e) {
  return e.exposed ? e.exposeProxy || (e.exposeProxy = new Proxy(rr(Hl(e.exposed)), {
    get(t, n) {
      if (n in t) return t[n];
      if (n in Ln) return Ln[n](e);
    },
    has(t, n) {
      return n in t || n in Ln;
    }
  })) : e.proxy;
}
function au(e, t = !0) {
  return ne(e) ? e.displayName || e.name : e.name || t && e.__name;
}
function su(e) {
  return ne(e) && "__vccOpts" in e;
}
var ee = (e, t) => /* @__PURE__ */ zl(e, t, Hn);
function iu(e, t, n) {
  try {
    ba(-1);
    const a = arguments.length;
    return a === 2 ? ge(t) && !Z(t) ? Fn(t) ? Ce(e, null, [t]) : Ce(e, t) : Ce(e, null, t) : (a > 3 ? n = Array.prototype.slice.call(arguments, 2) : a === 3 && Fn(n) && (n = [n]), Ce(e, t, n));
  } finally {
    ba(1);
  }
}
var ru = "3.5.35", fs = void 0, oi = typeof window < "u" && window.trustedTypes;
if (oi) try {
  fs = /* @__PURE__ */ oi.createPolicy("vue", { createHTML: (e) => e });
} catch {
}
var zr = fs ? (e) => fs.createHTML(e) : (e) => e, lu = "http://www.w3.org/2000/svg", ou = "http://www.w3.org/1998/Math/MathML", bt = typeof document < "u" ? document : null, ui = bt && /* @__PURE__ */ bt.createElement("template"), uu = {
  insert: (e, t, n) => {
    t.insertBefore(e, n || null);
  },
  remove: (e) => {
    const t = e.parentNode;
    t && t.removeChild(e);
  },
  createElement: (e, t, n, a) => {
    const s = t === "svg" ? bt.createElementNS(lu, e) : t === "mathml" ? bt.createElementNS(ou, e) : n ? bt.createElement(e, { is: n }) : bt.createElement(e);
    return e === "select" && a && a.multiple != null && s.setAttribute("multiple", a.multiple), s;
  },
  createText: (e) => bt.createTextNode(e),
  createComment: (e) => bt.createComment(e),
  setText: (e, t) => {
    e.nodeValue = t;
  },
  setElementText: (e, t) => {
    e.textContent = t;
  },
  parentNode: (e) => e.parentNode,
  nextSibling: (e) => e.nextSibling,
  querySelector: (e) => bt.querySelector(e),
  setScopeId(e, t) {
    e.setAttribute(t, "");
  },
  insertStaticContent(e, t, n, a, s, i) {
    const l = n ? n.previousSibling : t.lastChild;
    if (s && (s === i || s.nextSibling)) for (; t.insertBefore(s.cloneNode(!0), n), !(s === i || !(s = s.nextSibling)); )
      ;
    else {
      ui.innerHTML = zr(a === "svg" ? `<svg>${e}</svg>` : a === "mathml" ? `<math>${e}</math>` : e);
      const o = ui.content;
      if (a === "svg" || a === "mathml") {
        const u = o.firstChild;
        for (; u.firstChild; ) o.appendChild(u.firstChild);
        o.removeChild(u);
      }
      t.insertBefore(o, n);
    }
    return [l ? l.nextSibling : t.firstChild, n ? n.previousSibling : t.lastChild];
  }
}, Pt = "transition", xn = "animation", jn = /* @__PURE__ */ Symbol("_vtc"), Wr = {
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
}, du = /* @__PURE__ */ $e({}, gr, Wr), cu = (e) => (e.displayName = "Transition", e.props = du, e), fu = /* @__PURE__ */ cu((e, { slots: t }) => iu(ro, vu(e), t)), Ft = (e, t = []) => {
  Z(e) ? e.forEach((n) => n(...t)) : e && e(...t);
}, di = (e) => e ? Z(e) ? e.some((t) => t.length > 1) : e.length > 1 : !1;
function vu(e) {
  const t = {};
  for (const K in e) K in Wr || (t[K] = e[K]);
  if (e.css === !1) return t;
  const { name: n = "v", type: a, duration: s, enterFromClass: i = `${n}-enter-from`, enterActiveClass: l = `${n}-enter-active`, enterToClass: o = `${n}-enter-to`, appearFromClass: u = i, appearActiveClass: v = l, appearToClass: d = o, leaveFromClass: g = `${n}-leave-from`, leaveActiveClass: $ = `${n}-leave-active`, leaveToClass: x = `${n}-leave-to` } = e, D = pu(s), P = D && D[0], X = D && D[1], { onBeforeEnter: G, onEnter: V, onEnterCancelled: z, onLeave: R, onLeaveCancelled: C, onBeforeAppear: E = G, onAppear: k = V, onAppearCancelled: w = z } = t, S = (K, J, N, le) => {
    K._enterCancelled = le, Ht(K, J ? d : o), Ht(K, J ? v : l), N && N();
  }, H = (K, J) => {
    K._isLeaving = !1, Ht(K, g), Ht(K, x), Ht(K, $), J && J();
  }, se = (K) => (J, N) => {
    const le = K ? k : V, xe = () => S(J, K, N);
    Ft(le, [J, xe]), ci(() => {
      Ht(J, K ? u : i), mt(J, K ? d : o), di(le) || fi(J, a, P, xe);
    });
  };
  return $e(t, {
    onBeforeEnter(K) {
      Ft(G, [K]), mt(K, i), mt(K, l);
    },
    onBeforeAppear(K) {
      Ft(E, [K]), mt(K, u), mt(K, v);
    },
    onEnter: se(!1),
    onAppear: se(!0),
    onLeave(K, J) {
      K._isLeaving = !0;
      const N = () => H(K, J);
      mt(K, g), K._enterCancelled ? (mt(K, $), gi(K)) : (gi(K), mt(K, $)), ci(() => {
        K._isLeaving && (Ht(K, g), mt(K, x), di(R) || fi(K, a, X, N));
      }), Ft(R, [K, N]);
    },
    onEnterCancelled(K) {
      S(K, !1, void 0, !0), Ft(z, [K]);
    },
    onAppearCancelled(K) {
      S(K, !0, void 0, !0), Ft(w, [K]);
    },
    onLeaveCancelled(K) {
      H(K), Ft(C, [K]);
    }
  });
}
function pu(e) {
  if (e == null) return null;
  if (ge(e)) return [Wa(e.enter), Wa(e.leave)];
  {
    const t = Wa(e);
    return [t, t];
  }
}
function Wa(e) {
  return gl(e);
}
function mt(e, t) {
  t.split(/\s+/).forEach((n) => n && e.classList.add(n)), (e[jn] || (e[jn] = /* @__PURE__ */ new Set())).add(t);
}
function Ht(e, t) {
  t.split(/\s+/).forEach((a) => a && e.classList.remove(a));
  const n = e[jn];
  n && (n.delete(t), n.size || (e[jn] = void 0));
}
function ci(e) {
  requestAnimationFrame(() => {
    requestAnimationFrame(e);
  });
}
var gu = 0;
function fi(e, t, n, a) {
  const s = e._endId = ++gu, i = () => {
    s === e._endId && a();
  };
  if (n != null) return setTimeout(i, n);
  const { type: l, timeout: o, propCount: u } = mu(e, t);
  if (!l) return a();
  const v = l + "end";
  let d = 0;
  const g = () => {
    e.removeEventListener(v, $), i();
  }, $ = (x) => {
    x.target === e && ++d >= u && g();
  };
  setTimeout(() => {
    d < u && g();
  }, o + 1), e.addEventListener(v, $);
}
function mu(e, t) {
  const n = window.getComputedStyle(e), a = (D) => (n[D] || "").split(", "), s = a(`${Pt}Delay`), i = a(`${Pt}Duration`), l = vi(s, i), o = a(`${xn}Delay`), u = a(`${xn}Duration`), v = vi(o, u);
  let d = null, g = 0, $ = 0;
  t === Pt ? l > 0 && (d = Pt, g = l, $ = i.length) : t === xn ? v > 0 && (d = xn, g = v, $ = u.length) : (g = Math.max(l, v), d = g > 0 ? l > v ? Pt : xn : null, $ = d ? d === Pt ? i.length : u.length : 0);
  const x = d === Pt && /\b(?:transform|all)(?:,|$)/.test(a(`${Pt}Property`).toString());
  return {
    type: d,
    timeout: g,
    propCount: $,
    hasTransform: x
  };
}
function vi(e, t) {
  for (; e.length < t.length; ) e = e.concat(e);
  return Math.max(...t.map((n, a) => pi(n) + pi(e[a])));
}
function pi(e) {
  return e === "auto" ? 0 : Number(e.slice(0, -1).replace(",", ".")) * 1e3;
}
function gi(e) {
  return (e ? e.ownerDocument : document).body.offsetHeight;
}
function bu(e, t, n) {
  const a = e[jn];
  a && (t = (t ? [t, ...a] : [...a]).join(" ")), t == null ? e.removeAttribute("class") : n ? e.setAttribute("class", t) : e.className = t;
}
var ya = /* @__PURE__ */ Symbol("_vod"), Jr = /* @__PURE__ */ Symbol("_vsh"), hu = {
  name: "show",
  beforeMount(e, { value: t }, { transition: n }) {
    e[ya] = e.style.display === "none" ? "" : e.style.display, n && t ? n.beforeEnter(e) : wn(e, t);
  },
  mounted(e, { value: t }, { transition: n }) {
    n && t && n.enter(e);
  },
  updated(e, { value: t, oldValue: n }, { transition: a }) {
    !t != !n && (a ? t ? (a.beforeEnter(e), wn(e, !0), a.enter(e)) : a.leave(e, () => {
      wn(e, !1);
    }) : wn(e, t));
  },
  beforeUnmount(e, { value: t }) {
    wn(e, t);
  }
};
function wn(e, t) {
  e.style.display = t ? e[ya] : "none", e[Jr] = !t;
}
var yu = /* @__PURE__ */ Symbol(""), ku = /(?:^|;)\s*display\s*:/;
function Su(e, t, n) {
  const a = e.style, s = _e(n);
  let i = !1;
  if (n && !s) {
    if (t) if (_e(t))
      for (const l of t.split(";")) {
        const o = l.slice(0, l.indexOf(":")).trim();
        n[o] == null && An(a, o, "");
      }
    else for (const l in t) n[l] == null && An(a, l, "");
    for (const l in n) {
      l === "display" && (i = !0);
      const o = n[l];
      o != null ? wu(e, l, !_e(t) && t ? t[l] : void 0, o) || An(a, l, o) : An(a, l, "");
    }
  } else if (s) {
    if (t !== n) {
      const l = a[yu];
      l && (n += ";" + l), a.cssText = n, i = ku.test(n);
    }
  } else t && e.removeAttribute("style");
  ya in e && (e[ya] = i ? a.display : "", e[Jr] && (a.display = "none"));
}
var mi = /\s*!important$/;
function An(e, t, n) {
  if (Z(n)) n.forEach((a) => An(e, t, a));
  else if (n == null && (n = ""), t.startsWith("--")) e.setProperty(t, n);
  else {
    const a = xu(e, t);
    mi.test(n) ? e.setProperty(Rt(a), n.replace(mi, ""), "important") : e[a] = n;
  }
}
var bi = [
  "Webkit",
  "Moz",
  "ms"
], Ja = {};
function xu(e, t) {
  const n = Ja[t];
  if (n) return n;
  let a = He(t);
  if (a !== "filter" && a in e) return Ja[t] = a;
  a = Ca(a);
  for (let s = 0; s < bi.length; s++) {
    const i = bi[s] + a;
    if (i in e) return Ja[t] = i;
  }
  return t;
}
function wu(e, t, n, a) {
  return e.tagName === "TEXTAREA" && (t === "width" || t === "height") && _e(a) && n === a;
}
var hi = "http://www.w3.org/1999/xlink";
function yi(e, t, n, a, s, i = kl(t)) {
  a && t.startsWith("xlink:") ? n == null ? e.removeAttributeNS(hi, t.slice(6, t.length)) : e.setAttributeNS(hi, t, n) : n == null || i && !ji(n) ? e.removeAttribute(t) : e.setAttribute(t, i ? "" : tt(n) ? String(n) : n);
}
function ki(e, t, n, a, s) {
  if (t === "innerHTML" || t === "textContent") {
    n != null && (e[t] = t === "innerHTML" ? zr(n) : n);
    return;
  }
  const i = e.tagName;
  if (t === "value" && i !== "PROGRESS" && !i.includes("-")) {
    const o = i === "OPTION" ? e.getAttribute("value") || "" : e.value, u = n == null ? e.type === "checkbox" ? "on" : "" : String(n);
    (o !== u || !("_value" in e)) && (e.value = u), n == null && e.removeAttribute(t), e._value = n;
    return;
  }
  let l = !1;
  if (n === "" || n == null) {
    const o = typeof e[t];
    o === "boolean" ? n = ji(n) : n == null && o === "string" ? (n = "", l = !0) : o === "number" && (n = 0, l = !0);
  }
  try {
    e[t] = n;
  } catch {
  }
  l && e.removeAttribute(s || t);
}
function Dt(e, t, n, a) {
  e.addEventListener(t, n, a);
}
function _u(e, t, n, a) {
  e.removeEventListener(t, n, a);
}
var Si = /* @__PURE__ */ Symbol("_vei");
function Cu(e, t, n, a, s = null) {
  const i = e[Si] || (e[Si] = {}), l = i[t];
  if (a && l) l.value = a;
  else {
    const [o, u] = $u(t);
    a ? Dt(e, o, i[t] = Eu(a, s), u) : l && (_u(e, o, l, u), i[t] = void 0);
  }
}
var xi = /(?:Once|Passive|Capture)$/;
function $u(e) {
  let t;
  if (xi.test(e)) {
    t = {};
    let n;
    for (; n = e.match(xi); )
      e = e.slice(0, e.length - n[0].length), t[n[0].toLowerCase()] = !0;
  }
  return [e[2] === ":" ? e.slice(3) : Rt(e.slice(2)), t];
}
var Xa = 0, Tu = /* @__PURE__ */ Promise.resolve(), Au = () => Xa || (Tu.then(() => Xa = 0), Xa = Date.now());
function Eu(e, t) {
  const n = (a) => {
    if (!a._vts) a._vts = Date.now();
    else if (a._vts <= n.attached) return;
    const s = n.value;
    if (Z(s)) {
      const i = a.stopImmediatePropagation;
      a.stopImmediatePropagation = () => {
        i.call(a), a._stopped = !0;
      };
      const l = s.slice(), o = [a];
      for (let u = 0; u < l.length && !a._stopped; u++) {
        const v = l[u];
        v && Ze(v, t, 5, o);
      }
    } else Ze(s, t, 5, [a]);
  };
  return n.value = e, n.attached = Au(), n;
}
var wi = (e) => e.charCodeAt(0) === 111 && e.charCodeAt(1) === 110 && e.charCodeAt(2) > 96 && e.charCodeAt(2) < 123, Mu = (e, t, n, a, s, i) => {
  const l = s === "svg";
  t === "class" ? bu(e, a, l) : t === "style" ? Su(e, n, a) : xa(t) ? wa(t) || Cu(e, t, n, a, i) : (t[0] === "." ? (t = t.slice(1), !0) : t[0] === "^" ? (t = t.slice(1), !1) : Iu(e, t, a, l)) ? (ki(e, t, a), !e.tagName.includes("-") && (t === "value" || t === "checked" || t === "selected") && yi(e, t, a, l, i, t !== "value")) : e._isVueCE && (Pu(e, t) || e._def.__asyncLoader && (/[A-Z]/.test(t) || !_e(a))) ? ki(e, He(t), a, i, t) : (t === "true-value" ? e._trueValue = a : t === "false-value" && (e._falseValue = a), yi(e, t, a, l));
};
function Iu(e, t, n, a) {
  if (a)
    return !!(t === "innerHTML" || t === "textContent" || t in e && wi(t) && ne(n));
  if (t === "spellcheck" || t === "draggable" || t === "translate" || t === "autocorrect" || t === "sandbox" && e.tagName === "IFRAME" || t === "form" || t === "list" && e.tagName === "INPUT" || t === "type" && e.tagName === "TEXTAREA") return !1;
  if (t === "width" || t === "height") {
    const s = e.tagName;
    if (s === "IMG" || s === "VIDEO" || s === "CANVAS" || s === "SOURCE") return !1;
  }
  return wi(t) && _e(n) ? !1 : t in e;
}
function Pu(e, t) {
  const n = e._def.props;
  if (!n) return !1;
  const a = He(t);
  return Array.isArray(n) ? n.some((s) => He(s) === a) : Object.keys(n).some((s) => He(s) === a);
}
var on = (e) => {
  const t = e.props["onUpdate:modelValue"] || !1;
  return Z(t) ? (n) => oa(t, n) : t;
};
function Ou(e) {
  e.target.composing = !0;
}
function _i(e) {
  const t = e.target;
  t.composing && (t.composing = !1, t.dispatchEvent(new Event("input")));
}
var xt = /* @__PURE__ */ Symbol("_assign");
function Ci(e, t, n) {
  return t && (e = e.trim()), n && (e = $a(e)), e;
}
var We = {
  created(e, { modifiers: { lazy: t, trim: n, number: a } }, s) {
    e[xt] = on(s);
    const i = a || s.props && s.props.type === "number";
    Dt(e, t ? "change" : "input", (l) => {
      l.target.composing || e[xt](Ci(e.value, n, i));
    }), (n || i) && Dt(e, "change", () => {
      e.value = Ci(e.value, n, i);
    }), t || (Dt(e, "compositionstart", Ou), Dt(e, "compositionend", _i), Dt(e, "change", _i));
  },
  mounted(e, { value: t }) {
    e.value = t ?? "";
  },
  beforeUpdate(e, { value: t, oldValue: n, modifiers: { lazy: a, trim: s, number: i } }, l) {
    if (e[xt] = on(l), e.composing) return;
    const o = (i || e.type === "number") && !/^0\d/.test(e.value) ? $a(e.value) : e.value, u = t ?? "";
    if (o === u) return;
    const v = e.getRootNode();
    (v instanceof Document || v instanceof ShadowRoot) && v.activeElement === e && e.type !== "range" && (a && t === n || s && e.value.trim() === u) || (e.value = u);
  }
}, _n = {
  deep: !0,
  created(e, t, n) {
    e[xt] = on(n), Dt(e, "change", () => {
      const a = e._modelValue, s = Kn(e), i = e.checked, l = e[xt];
      if (Z(a)) {
        const o = ms(a, s), u = o !== -1;
        if (i && !u) l(a.concat(s));
        else if (!i && u) {
          const v = [...a];
          v.splice(o, 1), l(v);
        }
      } else if (fn(a)) {
        const o = new Set(a);
        i ? o.add(s) : o.delete(s), l(o);
      } else l(Xr(e, i));
    });
  },
  mounted: $i,
  beforeUpdate(e, t, n) {
    e[xt] = on(n), $i(e, t, n);
  }
};
function $i(e, { value: t, oldValue: n }, a) {
  e._modelValue = t;
  let s;
  if (Z(t)) s = ms(t, a.props.value) > -1;
  else if (fn(t)) s = t.has(a.props.value);
  else {
    if (t === n) return;
    s = pn(t, Xr(e, !0));
  }
  e.checked !== s && (e.checked = s);
}
var Lu = {
  deep: !0,
  created(e, { value: t, modifiers: { number: n } }, a) {
    const s = fn(t);
    Dt(e, "change", () => {
      const i = Array.prototype.filter.call(e.options, (l) => l.selected).map((l) => n ? $a(Kn(l)) : Kn(l));
      e[xt](e.multiple ? s ? new Set(i) : i : i[0]), e._assigning = !0, Jn(() => {
        e._assigning = !1;
      });
    }), e[xt] = on(a);
  },
  mounted(e, { value: t }) {
    Ti(e, t);
  },
  beforeUpdate(e, t, n) {
    e[xt] = on(n);
  },
  updated(e, { value: t }) {
    e._assigning || Ti(e, t);
  }
};
function Ti(e, t) {
  const n = e.multiple, a = Z(t);
  if (!(n && !a && !fn(t))) {
    for (let s = 0, i = e.options.length; s < i; s++) {
      const l = e.options[s], o = Kn(l);
      if (n) if (a) {
        const u = typeof o;
        u === "string" || u === "number" ? l.selected = t.some((v) => String(v) === String(o)) : l.selected = ms(t, o) > -1;
      } else l.selected = t.has(o);
      else if (pn(Kn(l), t)) {
        e.selectedIndex !== s && (e.selectedIndex = s);
        return;
      }
    }
    !n && e.selectedIndex !== -1 && (e.selectedIndex = -1);
  }
}
function Kn(e) {
  return "_value" in e ? e._value : e.value;
}
function Xr(e, t) {
  const n = t ? "_trueValue" : "_falseValue";
  return n in e ? e[n] : t;
}
var Du = [
  "ctrl",
  "shift",
  "alt",
  "meta"
], Nu = {
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
  exact: (e, t) => Du.some((n) => e[`${n}Key`] && !t.includes(n))
}, wt = (e, t) => {
  if (!e) return e;
  const n = e._withMods || (e._withMods = {}), a = t.join(".");
  return n[a] || (n[a] = ((s, ...i) => {
    for (let l = 0; l < t.length; l++) {
      const o = Nu[t[l]];
      if (o && o(s, t)) return;
    }
    return e(s, ...i);
  }));
}, Ru = {
  esc: "escape",
  space: " ",
  up: "arrow-up",
  left: "arrow-left",
  right: "arrow-right",
  down: "arrow-down",
  delete: "backspace"
}, Yr = (e, t) => {
  const n = e._withKeys || (e._withKeys = {}), a = t.join(".");
  return n[a] || (n[a] = ((s) => {
    if (!("key" in s)) return;
    const i = Rt(s.key);
    if (t.some((l) => l === i || Ru[l] === i)) return e(s);
  }));
}, Bu = /* @__PURE__ */ $e({ patchProp: Mu }, uu), Ai;
function qu() {
  return Ai || (Ai = Fo(Bu));
}
var Uu = ((...e) => {
  const t = qu().createApp(...e), { mount: n } = t;
  return t.mount = (a) => {
    const s = Hu(a);
    if (!s) return;
    const i = t._component;
    !ne(i) && !i.render && !i.template && (i.template = s.innerHTML), s.nodeType === 1 && (s.textContent = "");
    const l = n(s, !1, Fu(s));
    return s instanceof Element && (s.removeAttribute("v-cloak"), s.setAttribute("data-v-app", "")), l;
  }, t;
});
function Fu(e) {
  if (e instanceof SVGElement) return "svg";
  if (typeof MathMLElement == "function" && e instanceof MathMLElement) return "mathml";
}
function Hu(e) {
  return _e(e) ? document.querySelector(e) : e;
}
var ju = Object.freeze({
  id: "agent-api",
  name: "Agent API",
  accent: "#63d8c6"
}), Ku = "https://api.tavily.com";
function Vu(e = "") {
  return String(e || "").trim();
}
function lt(e = "") {
  return String(e || "").trim().replace(/\/+$/, "") || "https://api.tavily.com";
}
var gh = Object.freeze([
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
function Gu(e = "") {
  return e === "on" || e === "off" ? e : "inherit";
}
function zu(e) {
  return String(e ?? "").trim().toLowerCase() || void 0;
}
function Wu(e) {
  if (e == null || e === "") return;
  const t = Number(e);
  return Number.isFinite(t) ? Math.floor(t) : void 0;
}
function un(e = {}) {
  const t = e && typeof e == "object" ? e : {}, n = zu(t.effort), a = Wu(t.budgetTokens);
  return {
    mode: Gu(t.mode),
    ...n ? { effort: n } : {},
    ...a !== void 0 ? { budgetTokens: a } : {}
  };
}
var Qr = "openai-compatible", Es = "默认", Zr = "default", Ju = "deny", ht = 32e3, Xu = Object.freeze([{
  value: "default",
  label: "默认权限"
}, {
  value: "full",
  label: "完全权限"
}]), Yu = Object.freeze([{
  value: "deny",
  label: "禁止"
}, {
  value: "allow",
  label: "允许"
}]), vs = {
  "openai-responses": {
    baseUrl: "https://api.openai.com/v1",
    model: "gpt-4.1-mini",
    apiKey: "",
    temperature: 1,
    maxTokens: ht,
    sendTemperature: !0
  },
  "openai-compatible": {
    baseUrl: "https://api.openai.com/v1",
    model: "gpt-4o-mini",
    apiKey: "",
    temperature: 1,
    maxTokens: ht,
    sendTemperature: !0,
    toolMode: "native"
  },
  "sillytavern-openai-compatible": {
    baseUrl: "",
    model: "gpt-4o-mini",
    apiKey: "",
    temperature: 1,
    maxTokens: ht,
    sendTemperature: !0,
    toolMode: "native"
  },
  "sillytavern-claude": {
    baseUrl: "",
    model: "claude-sonnet-4-0",
    apiKey: "",
    temperature: 1,
    maxTokens: ht,
    sendTemperature: !0
  },
  "sillytavern-google": {
    baseUrl: "",
    model: "gemini-2.5-pro",
    apiKey: "",
    temperature: 1,
    maxTokens: ht,
    sendTemperature: !0
  },
  anthropic: {
    baseUrl: "https://api.anthropic.com",
    model: "claude-sonnet-4-0",
    apiKey: "",
    temperature: 1,
    maxTokens: ht,
    sendTemperature: !0
  },
  google: {
    baseUrl: "https://generativelanguage.googleapis.com/v1beta",
    model: "gemini-2.5-pro",
    apiKey: "",
    temperature: 1,
    maxTokens: ht,
    sendTemperature: !0
  }
};
function el() {
  return JSON.parse(JSON.stringify(vs));
}
function Ge() {
  return {
    provider: Qr,
    modelConfigs: el(),
    permissionMode: Zr
  };
}
function tl(e = Ge()) {
  const t = e && typeof e == "object" ? e : Ge();
  return {
    provider: Ms(t.provider),
    modelConfigs: Ve(t.modelConfigs || {})
  };
}
function Zt(e) {
  return e === "full" ? "full" : Zr;
}
function Ot(e) {
  return e === "allow" ? "allow" : Ju;
}
function Le(e, t = ht) {
  const n = Number(e);
  if (!Number.isFinite(n) || n <= 0) {
    const a = Number(t);
    return Number.isFinite(a) && a > 0 ? Math.floor(a) : ht;
  }
  return Math.min(Number.MAX_SAFE_INTEGER, Math.floor(n));
}
function Ae(e) {
  return String(e || "").trim() || "默认";
}
function Ve(e = {}) {
  const t = el();
  return Object.keys(vs).forEach((n) => {
    const a = e && typeof e[n] == "object" ? e[n] : {}, s = vs[n];
    t[n] = {
      baseUrl: String(a.baseUrl ?? s.baseUrl ?? ""),
      model: String(a.model ?? s.model ?? ""),
      apiKey: String(a.apiKey ?? s.apiKey ?? ""),
      temperature: a.temperature ?? s.temperature,
      maxTokens: Le(a.maxTokens, s.maxTokens),
      sendTemperature: typeof a.sendTemperature == "boolean" ? a.sendTemperature : s.sendTemperature,
      ..."toolMode" in s ? { toolMode: String(a.toolMode || s.toolMode || "native") } : {},
      reasoning: un(a.reasoning)
    };
  }), t;
}
function Ms(e) {
  return typeof e == "string" && e.trim() ? e : Qr;
}
function Is(e = {}, t) {
  return e && typeof e.presets == "object" && e.presets ? e.presets : e?.modelConfigs ? { [t]: {
    provider: e.provider || "openai-compatible",
    modelConfigs: e.modelConfigs,
    permissionMode: e.permissionMode
  } } : {};
}
function Qu(e = {}, t) {
  const n = {}, a = Is(e, t);
  return Object.entries(a).forEach(([s, i]) => {
    if (!i || typeof i != "object") return;
    const l = Ae(s);
    n[l] = {
      provider: Ms(i.provider),
      modelConfigs: Ve(i.modelConfigs || {}),
      permissionMode: Zt(i.permissionMode)
    };
  }), Object.keys(n).length || (n[Es] = Ge()), n;
}
function Zu(e, t) {
  const n = Ae(t);
  return e[n] ? n : Object.keys(e)[0];
}
function ed(e, t, n) {
  const a = Ae(t || n);
  return e[a] ? a : e[n] ? n : Object.keys(e)[0];
}
function nl(e = {}, t = Ge()) {
  const n = tl(t), a = e && typeof e == "object" ? e : {};
  return {
    provider: Ms(a.provider || n.provider),
    modelConfigs: Ve(a.modelConfigs || n.modelConfigs)
  };
}
function td(e = {}, t = {}, n = Es, a = n) {
  if (e?.delegateConfigured === !1) return !1;
  if (a !== n) return !0;
  const s = e?.delegateConfig;
  if (!s || typeof s != "object" || Array.isArray(s) || !(typeof s.provider == "string" && s.provider.trim() || s.modelConfigs && typeof s.modelConfigs == "object" && Object.keys(s.modelConfigs).length)) return !1;
  if (e?.delegateConfigured === !0) return !0;
  const i = t[n] || Ge(), l = tl(i), o = nl(s, i);
  return JSON.stringify(o) !== JSON.stringify(l);
}
function nd(e = {}, t, n, a, s) {
  const i = s(e?.[a]);
  if (i) return i;
  const l = Is(e, t), o = [
    n,
    t,
    e?.currentPresetName,
    e?.delegatePresetName,
    ...Object.keys(l || {})
  ].map(Ae), u = /* @__PURE__ */ new Set();
  for (const v of o) {
    if (u.has(v)) continue;
    u.add(v);
    const d = s(l?.[v]?.[a]);
    if (d) return d;
  }
  return s(e?.delegateConfig?.[a]);
}
function ad(e = {}, t, n) {
  const a = (o) => String(o || "").trim();
  if (a(e?.tavilyBaseUrl)) return lt(e.tavilyBaseUrl);
  const s = Is(e, t), i = [
    n,
    t,
    e?.currentPresetName,
    e?.delegatePresetName,
    ...Object.keys(s || {})
  ].map(Ae), l = /* @__PURE__ */ new Set();
  for (const o of i) {
    if (l.has(o)) continue;
    l.add(o);
    const u = s?.[o]?.tavilyBaseUrl;
    if (a(u)) return lt(u);
  }
  return a(e?.delegateConfig?.tavilyBaseUrl) ? lt(e.delegateConfig.tavilyBaseUrl) : Ku;
}
function sd(e = {}, t, n) {
  return {
    tavilyApiKey: nd(e, t, n, "tavilyApiKey", Vu),
    tavilyBaseUrl: ad(e, t, n)
  };
}
function ka(e = {}) {
  const t = Ae(e.currentPresetName || e.presetDraftName || "默认"), n = Qu(e, t), a = Zu(n, e.currentPresetName), s = ed(n, e.delegatePresetName, a), i = n[a] || Ge(), l = n[s] || i, o = nl(e.delegateConfig, l), u = td(e, n, a, s), v = sd(e, t, a);
  return {
    workspaceFileName: String(e.workspaceFileName || ""),
    updatedAt: Number(e.updatedAt) || 0,
    jsApiPermission: Ot(e.jsApiPermission),
    currentPresetName: a,
    delegatePresetName: s,
    delegateConfig: o,
    delegateConfigured: u,
    presetDraftName: Ae(e.presetDraftName || a),
    presetNames: Object.keys(n),
    presets: n,
    provider: i.provider,
    modelConfigs: i.modelConfigs,
    permissionMode: Zt(i.permissionMode),
    tavilyApiKey: v.tavilyApiKey,
    tavilyBaseUrl: v.tavilyBaseUrl
  };
}
async function id(e, t) {
  const n = e.body?.getReader?.();
  if (!n) throw new Error("host_chat_completions_stream_missing_body");
  const a = new TextDecoder();
  let s = "";
  const i = /\r?\n\r?\n/, l = (u) => {
    const v = u.split(/\r?\n/).filter((d) => d.startsWith("data:")).map((d) => d.slice(5).trimStart()).join(`
`).trim();
    !v || v === "[DONE]" || t(JSON.parse(v));
  };
  for (; ; ) {
    const { done: u, value: v } = await n.read();
    if (u) break;
    for (s += a.decode(v, { stream: !0 }); ; ) {
      const d = s.match(i);
      if (!d || typeof d.index != "number") break;
      const g = s.slice(0, d.index);
      s = s.slice(d.index + d[0].length), l(g);
    }
  }
  const o = s.trim();
  o && l(o);
}
function rd(e = "") {
  return String(e || "").trim().toLowerCase();
}
function ld(e = "") {
  const t = rd(e);
  return t.includes("deepseek") ? "deepseek" : t.includes("kimi") || t.includes("moonshot") ? "kimi" : t.includes("gemini") ? "gemini" : t.includes("claude") ? "claude" : /(?:^|[/_.-])gpt(?:\d|[/_.-]|$)/.test(t) || /(?:^|[/_.-])o\d+(?:[/_.-]|$)/.test(t) ? "openai" : "";
}
var gn = "openai", al = "claude", sl = "makersuite", od = "/api/backends/chat-completions/status", ud = "/api/backends/chat-completions/generate", il = Object.freeze({
  [al]: "https://api.anthropic.com/v1",
  [sl]: "https://generativelanguage.googleapis.com"
}), Yn = null;
function dd(e) {
  return String(e || "").trim().replace(/\/+$/, "");
}
function cd(e, t) {
  const n = dd(e);
  return t === "claude" ? !n || /\/v\d[\w.-]*$/i.test(n) ? n : `${n}/v1` : t === "makersuite" ? n.replace(/\/v\d[\w.-]*$/i, "") : n;
}
async function rl(e = Yn) {
  if (typeof e != "function") throw new Error("宿主请求头未注册，无法调用酒馆后端。");
  return {
    "Content-Type": "application/json",
    ...await Promise.resolve(e() || {}),
    Accept: "application/json"
  };
}
function fd(e = {}) {
  const t = {};
  return Object.entries(e || {}).forEach(([n, a]) => {
    t[n] = /authorization|cookie|csrf|token|api[-_]?key/i.test(n) ? "[redacted]" : a;
  }), t;
}
async function Ps(e = {}, t = !1, n = Yn) {
  const a = await rl(n), s = {
    url: ud,
    method: "POST",
    headers: fd(a),
    body: {
      ...e,
      stream: !!t
    }
  };
  return Object.defineProperty(s, "rawHeaders", {
    value: a,
    enumerable: !1
  }), s;
}
async function vd(e = {}, t = !1) {
  return await Ps(e, t);
}
function pd(e = "") {
  return /^\s*(?:<!DOCTYPE\s+html\b|<html\b)/i.test(String(e || ""));
}
function gd(e = "") {
  return /invalid csrf token/i.test(String(e || ""));
}
function md() {
  return "酒馆当前页面的 CSRF token 已失效，请按 F5 刷新并重新进入酒馆后再试。";
}
function Ei(e = "", t = 10) {
  const n = Number.parseInt(String(e || ""), t);
  return Number.isInteger(n) && n >= 0 && n <= 1114111 ? String.fromCodePoint(n) : "";
}
function Mi(e = "") {
  return String(e || "").replace(/&nbsp;|&#160;/gi, " ").replace(/&amp;/gi, "&").replace(/&lt;/gi, "<").replace(/&gt;/gi, ">").replace(/&quot;/gi, '"').replace(/&#39;|&apos;/gi, "'").replace(/&#x([0-9a-f]+);?/gi, (t, n) => Ei(n, 16)).replace(/&#([0-9]+);?/g, (t, n) => Ei(n));
}
function bd(e = "") {
  const t = String(e || ""), n = Mi((t.match(/<title\b[^>]*>([\s\S]*?)<\/title>/i) || [])[1] || "").replace(/\s+/g, " ").trim(), a = Mi(t.replace(/<script\b[\s\S]*?<\/script>/gi, " ").replace(/<style\b[\s\S]*?<\/style>/gi, " ").replace(/<[^>]+>/g, " ")).replace(/\s+/g, " ").trim(), s = n || a;
  return s.length > 240 ? `${s.slice(0, 237)}...` : s;
}
function hd(e = null) {
  const t = Number(e?.status), n = String(e?.statusText || "").trim();
  let a = "";
  try {
    a = String(e?.headers?.get?.("content-type") || "").trim();
  } catch {
    a = "";
  }
  return {
    status: Number.isFinite(t) && t > 0 ? t : 0,
    statusText: n,
    contentType: a
  };
}
function yd(e = {}) {
  return e.status ? `HTTP ${e.status}${e.statusText ? ` ${e.statusText}` : ""}` : "";
}
function kd(e = "") {
  const t = String(e || "").trim();
  if (!t || t[0] !== "{" && t[0] !== "[") return "";
  try {
    const n = JSON.parse(t), a = n?.error?.message;
    if (typeof a == "string" && a.trim()) return a.trim();
    if (typeof n?.message == "string" && n.message.trim()) return n.message.trim();
  } catch {
    return "";
  }
  return "";
}
function dn(e = "", t = "", n = null) {
  if (gd(e)) return md();
  const a = hd(n);
  if (pd(e) || /\btext\/html\b/i.test(a.contentType)) {
    const s = yd(a), i = bd(e);
    return [
      "酒馆后端返回了非 JSON 的 HTML 页面",
      s ? `（${s}）` : "",
      i ? `：${i}` : ""
    ].join("");
  }
  return kd(e) || String(e || t || "").trim();
}
function Sd(e = {}, t = gn) {
  const n = cd(e.baseUrl, t), a = String(e.apiKey || "").trim(), s = il[t] || "", i = n || (a ? s : ""), l = { chat_completion_source: t || "openai" };
  return i && (l.reverse_proxy = i), a && (l.proxy_password = a), l;
}
function xd(e = {}, t = gn) {
  return Sd(e, t);
}
function Os(e) {
  const t = e || globalThis.fetch;
  if (typeof t != "function") throw new Error("当前运行环境没有可用的 fetch，无法调用酒馆后端。");
  return t;
}
async function wd(e = {}, t = gn, n = {}, a = {}) {
  const s = await Os(a.fetch)(od, {
    method: "POST",
    headers: await rl(a.requestHeadersProvider),
    body: JSON.stringify(xd(e, t)),
    signal: n.signal
  }), i = await s.text();
  let l = null;
  try {
    l = i ? JSON.parse(i) : {};
  } catch (u) {
    throw new Error(`酒馆后端模型列表拉取失败：${dn(i, String(u?.message || u), s)}`);
  }
  if (!s.ok || l?.error) {
    const u = dn(l?.message || l?.error?.message || i, `HTTP ${s.status}`, s);
    throw new Error(`酒馆后端模型列表拉取失败：${u}`);
  }
  const o = Array.isArray(l?.data) ? l.data.map((u) => String(u?.id || u?.name || "").trim()).filter(Boolean) : [];
  return [...new Set(o)];
}
async function Ls(e = {}, t = gn, n = {}) {
  return await wd(e, t, n, { requestHeadersProvider: Yn });
}
async function _d(e = {}, t = {}) {
  return await Ls(e, gn, t);
}
async function Cd(e = {}, t = {}, n = {}) {
  const a = await Ps(e, !1, n.requestHeadersProvider);
  typeof t.onRequest == "function" && t.onRequest(a);
  const s = await Os(n.fetch)(a.url, {
    method: a.method,
    headers: a.rawHeaders || a.headers,
    body: JSON.stringify(a.body),
    signal: t.signal
  }), i = await s.text();
  let l = null;
  try {
    l = i ? JSON.parse(i) : {};
  } catch (o) {
    const u = /* @__PURE__ */ new Error(`酒馆后端生成失败：${dn(i, String(o?.message || o), s)}`);
    throw u.status = s.status, u.body = i, u;
  }
  if (!s.ok || l?.error) {
    const o = dn(l?.error?.message || l?.message || i, `HTTP ${s.status}`, s), u = /* @__PURE__ */ new Error(`酒馆后端生成失败：${o}`);
    throw u.status = s.status, u.error = l?.error, u;
  }
  return l;
}
async function $d(e = {}, t = {}) {
  return await Cd(e, t, { requestHeadersProvider: Yn });
}
async function Td(e = {}, t, n = {}, a = {}) {
  const s = await Ps(e, !0, a.requestHeadersProvider);
  typeof n.onRequest == "function" && n.onRequest(s);
  const i = await Os(a.fetch)(s.url, {
    method: s.method,
    headers: s.rawHeaders || s.headers,
    body: JSON.stringify(s.body),
    signal: n.signal
  });
  if (!i.ok) {
    const l = await i.text().catch(() => ""), o = new Error(dn(l, `酒馆后端流式生成失败：HTTP ${i.status}`, i));
    throw o.status = i.status, o.body = l, o;
  }
  typeof n.onResponseAccepted == "function" && n.onResponseAccepted(), await id(i, (l) => {
    if (l?.error) {
      const o = dn(l.error?.message || l.message || JSON.stringify(l.error), "酒馆后端流式生成失败");
      throw new Error(o);
    }
    t(l);
  });
}
async function Ad(e = {}, t, n = {}) {
  return await Td(e, t, n, { requestHeadersProvider: Yn });
}
var mh = Object.freeze([
  "buildHostChatCompletionGenerateRequest",
  "createHostChatCompletion",
  "streamHostChatCompletion"
]), bh = Object.freeze({
  buildHostChatCompletionGenerateRequest: vd,
  fetchHostChatCompletionsModels: Ls,
  fetchHostOpenAICompatibleModels: _d,
  createHostChatCompletion: $d,
  streamHostChatCompletion: Ad
}), Ed = Object.freeze({
  minimal: "最小",
  low: "低",
  medium: "中",
  high: "高",
  xhigh: "超高",
  max: "最大",
  min: "最小"
});
function ll(e) {
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
function pt(e, t, n, a, s = {}) {
  return ll({
    profileId: e,
    modes: t,
    intensity: {
      kind: "effort",
      values: n,
      defaultValue: a
    },
    outputModes: s.outputModes,
    temperatureOmitModes: s.temperatureOmitModes
  });
}
var Ds = ll({
  profileId: "unsupported",
  modes: ["inherit"],
  outputModes: ["hide"],
  intensity: { kind: "none" },
  unsupportedReason: "当前 Provider、传输方式与模型组合没有已验证的 Reasoning 控制协议。"
}), Qn = Object.freeze(["on"]), Ns = Object.freeze([
  "inherit",
  "on",
  "off"
]), ol = pt("openai-gpt-5.6", [
  "inherit",
  "on",
  "off"
], [
  "low",
  "medium",
  "high",
  "xhigh",
  "max"
], "medium", { temperatureOmitModes: Ns }), Md = pt("kimi-k3", [
  "inherit",
  "on",
  "off"
], [
  "low",
  "high",
  "max"
], "max", { temperatureOmitModes: Qn }), Id = pt("deepseek-thinking", [
  "inherit",
  "on",
  "off"
], [
  "low",
  "high",
  "max"
], "high", { temperatureOmitModes: Qn }), Pd = pt("openai-compatible-gemini-latest", [
  "inherit",
  "on",
  "off"
], [
  "minimal",
  "low",
  "medium",
  "high"
], "high", { temperatureOmitModes: Qn }), Od = pt("openai-compatible-claude-latest", [
  "inherit",
  "on",
  "off"
], [
  "low",
  "medium",
  "high",
  "xhigh",
  "max"
], "high", { temperatureOmitModes: Qn }), Ld = pt("openai-compatible-default", [
  "inherit",
  "on",
  "off"
], [
  "low",
  "medium",
  "high"
], "medium", { temperatureOmitModes: Qn }), Dd = pt("anthropic-adaptive", [
  "inherit",
  "on",
  "off"
], [
  "low",
  "medium",
  "high",
  "xhigh",
  "max"
], "high", { temperatureOmitModes: Ns }), Nd = pt("sillytavern-claude-adaptive", [
  "inherit",
  "on",
  "off"
], [
  "low",
  "medium",
  "high",
  "max"
], "high", { temperatureOmitModes: Ns }), Rd = pt("google-gemini-3-flash", ["inherit", "on"], [
  "minimal",
  "low",
  "medium",
  "high"
], "high"), Bd = pt("sillytavern-google-3-flash", ["inherit", "on"], [
  "min",
  "low",
  "medium",
  "high"
], "high");
function qd(e = "") {
  switch (ld(e)) {
    case "deepseek":
      return Id;
    case "kimi":
      return Md;
    case "gemini":
      return Pd;
    case "claude":
      return Od;
    case "openai":
      return ol;
    default:
      return Ld;
  }
}
function Rs(e = {}) {
  const t = String(e.provider || "").trim(), n = String(e.model || "").trim().toLowerCase();
  switch (t) {
    case "openai-responses":
      return ol;
    case "openai-compatible":
    case "sillytavern-openai-compatible":
      return qd(n);
    case "anthropic":
      return Dd;
    case "sillytavern-claude":
      return Nd;
    case "google":
      return Rd;
    case "sillytavern-google":
      return Bd;
    default:
      return Ds;
  }
}
function Ud(e = Ds) {
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
function Fd(e = Ds) {
  return e.intensity?.kind !== "effort" ? [] : e.intensity.values.map((t) => ({
    value: t,
    label: Ed[t] || t
  }));
}
function Ya(e, t, n, a = "REASONING_CAPABILITY_UNSUPPORTED") {
  return {
    ...e,
    profileId: t.profileId,
    valid: !1,
    error: n,
    code: a
  };
}
function Hd(e, t) {
  const n = { ...e };
  return delete n.effort, delete n.budgetTokens, t.intensity?.kind === "effort" ? {
    ...n,
    ...e.effort ? { effort: e.effort } : {}
  } : n;
}
function sa(e = {}, t = {}) {
  const n = Rs(e), a = un(t), s = t?.output === "show" || t?.output === "hide" ? t.output : null, i = Hd({
    ...a,
    output: a.mode === "off" ? "hide" : s || (n.outputModes.includes("show") ? "show" : "hide")
  }, n);
  if (!n.outputModes.includes(i.output)) return Ya(i, n, "当前任务要求返回 Reasoning 内容，但所选模型不支持。");
  if (!n.modes.includes(i.mode)) return Ya(i, n, i.mode === "off" ? "当前模型不支持显式关闭 Reasoning。请选择“跟随模型默认”。" : n.unsupportedReason || "当前模型不支持显式开启 Reasoning。");
  if (i.mode !== "on") return {
    ...i,
    profileId: n.profileId,
    valid: !0
  };
  if (n.intensity.kind === "effort") {
    const l = i.effort || n.intensity.defaultValue;
    return n.intensity.values.includes(l) ? {
      ...i,
      effort: l,
      profileId: n.profileId,
      valid: !0
    } : Ya(i, n, `当前模型不支持 Reasoning 强度“${l}”。`, "REASONING_CONFIG_INVALID");
  }
  return {
    ...i,
    profileId: n.profileId,
    valid: !0
  };
}
var Ii = 900 * 1e3, Pi = Object.freeze([{
  value: "native",
  label: "原生 Tool Calling"
}, {
  value: "tagged-json",
  label: "Tagged JSON 兼容模式"
}]), jd = Object.freeze([
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
function Xe(e, t = 1) {
  const n = typeof e == "string" && !e.trim() ? t : e, a = Number(n);
  return Number.isFinite(a) ? Math.max(0, Math.min(2, a)) : Xe(t, 1);
}
function Qa(e = {}) {
  return e.sendTemperature !== !1;
}
function Oi(e = "", t = {}) {
  return t && typeof t == "object" && t[e] ? t[e] : jd.find((n) => n.value === e)?.label || e || "未配置";
}
var Kd = { chat: { exclude: [
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
] } }, Vd = Object.freeze([
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
function it(e, t, n = "") {
  if (e.replaceChildren(), n) {
    const a = document.createElement("option");
    a.value = "", a.textContent = n, e.appendChild(a);
  }
  t.forEach((a) => {
    const s = document.createElement("option");
    s.value = a.value, s.textContent = a.label, s.disabled = a.disabled === !0, e.appendChild(s);
  });
}
function ia(e = "", t = {}) {
  const n = un(t.reasoning), a = Rs({
    provider: e,
    baseUrl: t.baseUrl,
    model: t.model
  }), s = {
    reasoningMode: n.mode,
    reasoningEffort: "",
    reasoningBudgetTokens: void 0
  };
  if (a.intensity.kind === "effort") s.reasoningEffort = a.intensity.values.includes(n.effort) ? n.effort : a.intensity.defaultValue;
  else if (a.intensity.kind === "budget") {
    const i = n.budgetTokens, l = a.intensity.allowAuto && i === -1, o = Number.isInteger(i) && i >= a.intensity.min && i <= a.intensity.max;
    s.reasoningBudgetTokens = l || o ? i : a.intensity.defaultValue;
  }
  return s;
}
function Li(e = {}) {
  return un(e);
}
function Vn(e = []) {
  const t = [...new Set(e.filter(Boolean).map((s) => String(s).trim()).filter(Boolean))], n = Kd.chat, a = t.filter((s) => {
    const i = s.toLowerCase();
    return !n.exclude.some((l) => i.includes(l));
  });
  return a.length ? a : t;
}
function ra(e = "") {
  return e === "delegate" ? "delegate" : "main";
}
function cn(e) {
  return String(e || "").trim().replace(/\/+$/, "");
}
function Gd(e = "") {
  return e === "sillytavern-openai-compatible" || e === "sillytavern-claude" || e === "sillytavern-google";
}
function Yt(e = "") {
  return e === "openai-compatible" || e === "sillytavern-openai-compatible";
}
function zd(e = "") {
  return e === "anthropic" || e === "sillytavern-claude";
}
function Wd(e = "") {
  return e === "sillytavern-claude" ? al : e === "sillytavern-google" ? sl : gn;
}
function Gn(e = []) {
  return [...new Set(e.filter(Boolean).map((t) => String(t).trim()).filter(Boolean))];
}
function Jd(e) {
  const t = cn(e);
  if (!t) return [];
  if (t.endsWith("/v1")) {
    const n = t.slice(0, -3);
    return Gn([
      `${t}/models`,
      `${n}/v1/models`,
      `${n}/models`
    ]);
  }
  return Gn([`${t}/v1/models`, `${t}/models`]);
}
function ul(e) {
  const t = cn(e);
  if (!t) return [];
  if (t.endsWith("/v1")) {
    const n = t.slice(0, -3);
    return Gn([
      `${t}/models`,
      `${n}/v1/models`,
      `${n}/models`
    ]);
  }
  return Gn([`${t}/v1/models`, `${t}/models`]);
}
function Xd(e, t) {
  const n = cn(e);
  if (!n) return [];
  const a = n.endsWith("/v1beta") ? n.slice(0, -7) : n;
  return Gn([
    `${n}/models?key=${encodeURIComponent(t)}`,
    `${n}/models`,
    `${a}/v1beta/models?key=${encodeURIComponent(t)}`,
    `${a}/v1beta/models`,
    `${a}/models?key=${encodeURIComponent(t)}`,
    `${a}/models`
  ]);
}
function Yd(e, t) {
  const n = [
    e?.error?.message,
    e?.message,
    e?.detail,
    e?.details,
    e?.error
  ].find((a) => typeof a == "string" && a.trim());
  return n ? n.trim() : String(t || "").trim().slice(0, 160);
}
async function Qd(e, t = {}) {
  const n = await fetch(e, t), a = await n.text();
  let s = null, i = null;
  try {
    s = a ? JSON.parse(a) : {};
  } catch (l) {
    i = l;
  }
  return {
    ok: n.ok,
    status: n.status,
    url: e,
    data: s,
    rawText: a,
    parseError: i,
    errorSnippet: Yd(s, a)
  };
}
function Zd(e) {
  return Vn((e?.data || []).map((t) => String(t?.id || "").trim()).filter(Boolean));
}
function dl(e) {
  return Vn((e?.data || []).map((t) => String(t?.id || "").trim()).filter(Boolean));
}
function ec(e) {
  return Vn((e?.models || e?.data || []).map((t) => String(t?.id || t?.name || "")).map((t) => t.split("/").pop() || "").filter(Boolean));
}
async function ca({ urls: e, requestOptionsList: t, extractModels: n, providerLabel: a }) {
  let s = null;
  for (const i of e) for (const l of t) {
    const o = await Qd(i, l);
    if (!o.ok) {
      s = o;
      continue;
    }
    if (o.parseError) {
      s = {
        ...o,
        errorSnippet: "返回的不是 JSON"
      };
      continue;
    }
    const u = n(o.data);
    if (u.length) return u;
    s = {
      ...o,
      errorSnippet: "返回成功，但模型列表为空"
    };
  }
  if (s) {
    const i = s.url ? ` (${s.url})` : "", l = s.errorSnippet ? `：${s.errorSnippet}` : "";
    throw new Error(`${a} 拉取模型失败：${s.status || "unknown"}${l}${i}`);
  }
  throw new Error(`${a} 拉取模型失败：未获取到模型列表。`);
}
async function tc(e, t = {}) {
  const n = String(e.apiKey || "").trim(), a = cn(e.baseUrl || ""), s = cn(a || il.claude);
  if (n && s) try {
    return await ca({
      urls: ul(s),
      requestOptionsList: [{
        headers: {
          "x-api-key": n,
          "anthropic-version": "2023-06-01",
          Accept: "application/json"
        },
        signal: t.signal
      }],
      extractModels: dl,
      providerLabel: "Anthropic"
    });
  } catch (i) {
    if (a) throw i;
  }
  return [...Vd];
}
async function nc(e, t = {}) {
  const n = e.provider, a = cn(e.baseUrl || ""), s = String(e.apiKey || "").trim();
  if (n === "sillytavern-claude") return Vn(await tc(e, t));
  if (Gd(n)) return Vn(await Ls(e, Wd(n), { signal: t.signal }));
  if (!s) throw new Error("请先填写 API Key。");
  if (!a) throw new Error("请先填写 Base URL。");
  return n === "google" ? await ca({
    urls: Xd(a, s),
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
    extractModels: ec,
    providerLabel: "Google AI"
  }) : zd(n) ? await ca({
    urls: ul(a),
    requestOptionsList: [{
      headers: {
        "x-api-key": s,
        "anthropic-version": "2023-06-01",
        Accept: "application/json"
      },
      signal: t.signal
    }],
    extractModels: dl,
    providerLabel: "Anthropic"
  }) : await ca({
    urls: Jd(a),
    requestOptionsList: [{
      headers: {
        Authorization: `Bearer ${s}`,
        Accept: "application/json"
      },
      signal: t.signal
    }],
    extractModels: Zd,
    providerLabel: n === "openai-responses" ? "OpenAI Responses" : "OpenAI-Compatible"
  });
}
function ac(e) {
  return e instanceof Error ? e.message : String(e || "unknown_error");
}
function sc(e = {}) {
  const { state: t, render: n, showToast: a, createRequestId: s = (p = "req") => `${p}-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`, saveConfig: i, reloadConfig: l, pullModels: o = nc, describeError: u = ac, getRuntimeSummaryText: v } = e;
  function d() {
    t.configFormSyncPending = !0;
  }
  function g(p, c = "main") {
    const f = String(p || "").trim() || "openai-compatible";
    return c === "delegate" ? `delegate:${f}` : f;
  }
  function $(p, c = "main") {
    return t.pullStateByProvider?.[g(p, c)] || {
      status: "idle",
      message: ""
    };
  }
  function x(p, c, f = "main") {
    t.pullStateByProvider = {
      ...t.pullStateByProvider || {},
      [g(p, f)]: c
    };
  }
  function D(p, c, f = "main") {
    t.modelOptionsByProvider = {
      ...t.modelOptionsByProvider || {},
      [g(p, f)]: Array.isArray(c) ? c : []
    };
  }
  function P(p, c = "main") {
    const f = g(p, c);
    return Array.isArray(t.modelOptionsByProvider?.[f]) ? t.modelOptionsByProvider[f] : [];
  }
  function X(p, c) {
    const f = t.config?.presets || {}, h = Ae(p || c || "默认");
    return f[h] ? h : c && f[c] ? c : Object.keys(f)[0] || "默认";
  }
  function G(p, c) {
    const f = X(p, Es), h = c && typeof c == "object" ? c : Ge(), _ = h.provider || "openai-compatible", A = Ve(h.modelConfigs || {}), T = A[_] || {}, B = ia(_, T);
    return {
      delegatePresetName: f,
      delegateProvider: _,
      delegateModelConfigs: A,
      delegateBaseUrl: String(T.baseUrl || ""),
      delegateModel: String(T.model || ""),
      delegateApiKey: String(T.apiKey || ""),
      delegateTemperature: Xe(T.temperature, 1),
      delegateMaxTokens: Le(T.maxTokens),
      delegateSendTemperature: Qa(T),
      delegateReasoningMode: B.reasoningMode,
      delegateReasoningEffort: B.reasoningEffort,
      delegateReasoningBudgetTokens: B.reasoningBudgetTokens,
      delegateToolMode: T.toolMode || "native"
    };
  }
  function V(p = "openai-compatible", c = {}) {
    const f = Ve(c || {})[p] || {}, h = ia(p, f);
    return {
      baseUrl: String(f.baseUrl || ""),
      model: String(f.model || ""),
      apiKey: String(f.apiKey || ""),
      temperature: Xe(f.temperature, 1),
      maxTokens: Le(f.maxTokens),
      sendTemperature: Qa(f),
      ...h,
      toolMode: f.toolMode || "native"
    };
  }
  function z(p = "openai-compatible", c = {}) {
    const f = Ve(c || {})[p] || {}, h = ia(p, f);
    return {
      delegateBaseUrl: String(f.baseUrl || ""),
      delegateModel: String(f.model || ""),
      delegateApiKey: String(f.apiKey || ""),
      delegateTemperature: Xe(f.temperature, 1),
      delegateMaxTokens: Le(f.maxTokens),
      delegateSendTemperature: Qa(f),
      delegateReasoningMode: h.reasoningMode,
      delegateReasoningEffort: h.reasoningEffort,
      delegateReasoningBudgetTokens: h.reasoningBudgetTokens,
      delegateToolMode: f.toolMode || "native"
    };
  }
  function R(p, c, f = t.config) {
    const h = Ae(p || "默认"), _ = c && typeof c == "object" ? c : Ge(), A = _.provider || "openai-compatible", T = Ve(_.modelConfigs || {}), B = V(A, T), L = X(f?.delegatePresetName, h), I = G(L, f?.delegateConfig && typeof f.delegateConfig == "object" ? f.delegateConfig : (f?.presets || {})[L] || _);
    return {
      currentPresetName: h,
      presetDraftName: h,
      provider: A,
      modelConfigs: T,
      ...B,
      tavilyApiKey: String(f?.tavilyApiKey || ""),
      tavilyBaseUrl: lt(f?.tavilyBaseUrl || "https://api.tavily.com"),
      permissionMode: Zt(_.permissionMode),
      jsApiPermission: Ot(f?.jsApiPermission),
      ...I
    };
  }
  function C() {
    if (t.configDraft) return t.configDraft;
    const p = Ae(t.config?.currentPresetName || "默认");
    return t.configDraft = R(p, (t.config?.presets || {})[p] || Ge()), t.configDraft;
  }
  function E(p, c = {}) {
    const f = C(), h = c.provider || p.querySelector("#xb-assistant-provider")?.value || f.provider || "openai-compatible", _ = c.delegateProvider || p.querySelector("#xb-assistant-delegate-provider")?.value || f.delegateProvider || "openai-compatible", A = p.querySelector("#xb-assistant-base-url")?.value.trim() || "", T = p.querySelector("#xb-assistant-model")?.value.trim() || "", B = p.querySelector("#xb-assistant-delegate-base-url")?.value.trim() ?? f.delegateBaseUrl ?? "", L = p.querySelector("#xb-assistant-delegate-model")?.value.trim() ?? f.delegateModel ?? "", I = Li({
      mode: p.querySelector("#xb-assistant-reasoning-mode")?.value || f.reasoningMode,
      effort: p.querySelector("#xb-assistant-reasoning-effort")?.value || f.reasoningEffort,
      budgetTokens: p.querySelector("#xb-assistant-reasoning-budget")?.value ?? f.reasoningBudgetTokens
    }), M = Li({
      mode: p.querySelector("#xb-assistant-delegate-reasoning-mode")?.value || f.delegateReasoningMode,
      effort: p.querySelector("#xb-assistant-delegate-reasoning-effort")?.value || f.delegateReasoningEffort,
      budgetTokens: p.querySelector("#xb-assistant-delegate-reasoning-budget")?.value ?? f.delegateReasoningBudgetTokens
    }), j = {
      baseUrl: A,
      model: T,
      apiKey: p.querySelector("#xb-assistant-api-key")?.value.trim() || "",
      temperature: Xe(p.querySelector("#xb-assistant-temperature")?.value, f.temperature ?? 1),
      maxTokens: Le(p.querySelector("#xb-assistant-max-tokens")?.value, f.maxTokens),
      sendTemperature: p.querySelector("#xb-assistant-send-temperature")?.checked ?? !!(f.sendTemperature ?? !0),
      reasoning: I,
      toolMode: Yt(h) ? p.querySelector("#xb-assistant-tool-mode")?.value || f.toolMode || "native" : void 0
    }, U = {
      baseUrl: B,
      model: L,
      apiKey: p.querySelector("#xb-assistant-delegate-api-key")?.value.trim() ?? f.delegateApiKey ?? "",
      temperature: Xe(p.querySelector("#xb-assistant-delegate-temperature")?.value, f.delegateTemperature ?? 1),
      maxTokens: Le(p.querySelector("#xb-assistant-delegate-max-tokens")?.value, f.delegateMaxTokens),
      sendTemperature: p.querySelector("#xb-assistant-delegate-send-temperature")?.checked ?? !!(f.delegateSendTemperature ?? !0),
      reasoning: M,
      toolMode: Yt(_) ? p.querySelector("#xb-assistant-delegate-tool-mode")?.value || f.delegateToolMode || "native" : void 0
    }, W = {
      ...Ve(f.modelConfigs || {}),
      [h]: {
        ...Ve(f.modelConfigs || {})[h] || {},
        ...j
      }
    }, Q = {
      ...Ve(f.delegateModelConfigs || {}),
      [_]: {
        ...Ve(f.delegateModelConfigs || {})[_] || {},
        ...U
      }
    };
    return {
      ...f,
      currentPresetName: f.currentPresetName,
      presetDraftName: Ae(p.querySelector("#xb-assistant-preset-name")?.value),
      provider: h,
      modelConfigs: W,
      baseUrl: j.baseUrl,
      model: j.model,
      apiKey: j.apiKey,
      temperature: j.temperature,
      maxTokens: j.maxTokens,
      sendTemperature: j.sendTemperature,
      reasoningMode: j.reasoning.mode,
      reasoningEffort: j.reasoning.effort || "",
      reasoningBudgetTokens: j.reasoning.budgetTokens,
      toolMode: j.toolMode || f.toolMode || "native",
      tavilyApiKey: p.querySelector("#xb-assistant-tavily-api-key")?.value.trim() ?? f.tavilyApiKey ?? "",
      tavilyBaseUrl: lt(f.tavilyBaseUrl || "https://api.tavily.com"),
      permissionMode: Zt(p.querySelector("#xb-assistant-permission-mode")?.value || f.permissionMode),
      jsApiPermission: Ot(p.querySelector("#xb-assistant-jsapi-permission")?.value || f.jsApiPermission),
      delegatePresetName: X(p.querySelector("#xb-assistant-delegate-preset-select")?.value || f.delegatePresetName, f.currentPresetName),
      delegateProvider: _,
      delegateModelConfigs: Q,
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
  function k(p, c = {}) {
    return t.configDraft = E(p, c), t.configDirty = !0, t.configDraft;
  }
  function w(p = C()) {
    return {
      baseUrl: String(p.baseUrl || ""),
      model: String(p.model || ""),
      apiKey: String(p.apiKey || ""),
      temperature: Xe(p.temperature, 1),
      maxTokens: Le(p.maxTokens),
      sendTemperature: !!(p.sendTemperature ?? !0),
      reasoning: un({
        mode: p.reasoningMode,
        effort: p.reasoningEffort,
        budgetTokens: p.reasoningBudgetTokens
      }),
      toolMode: Yt(p.provider) ? p.toolMode || "native" : void 0
    };
  }
  function S(p = C()) {
    return {
      baseUrl: String(p.delegateBaseUrl || ""),
      model: String(p.delegateModel || ""),
      apiKey: String(p.delegateApiKey || ""),
      temperature: Xe(p.delegateTemperature, 1),
      maxTokens: Le(p.delegateMaxTokens),
      sendTemperature: !!(p.delegateSendTemperature ?? !0),
      reasoning: un({
        mode: p.delegateReasoningMode,
        effort: p.delegateReasoningEffort,
        budgetTokens: p.delegateReasoningBudgetTokens
      }),
      toolMode: Yt(p.delegateProvider) ? p.delegateToolMode || "native" : void 0
    };
  }
  function H(p = C()) {
    const c = p.delegateProvider || "openai-compatible", f = Ve(p.delegateModelConfigs || {});
    return {
      provider: c,
      modelConfigs: {
        ...f,
        [c]: {
          ...f[c] || {},
          ...S(p)
        }
      }
    };
  }
  function se(p = C()) {
    return {
      provider: p.provider || "openai-compatible",
      baseUrl: p.baseUrl || "",
      model: p.model || "",
      apiKey: p.apiKey || "",
      tavilyApiKey: p.tavilyApiKey || "",
      tavilyBaseUrl: lt(p.tavilyBaseUrl || "https://api.tavily.com"),
      temperature: p.sendTemperature === !1 ? void 0 : Xe(p.temperature, 1),
      sendTemperature: !!(p.sendTemperature ?? !0),
      maxTokens: Le(p.maxTokens),
      timeoutMs: Ii,
      toolMode: p.toolMode || "native",
      reasoning: sa({
        provider: p.provider,
        baseUrl: p.baseUrl,
        model: p.model,
        maxTokens: Le(p.maxTokens)
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
      tavilyBaseUrl: lt(p.tavilyBaseUrl || "https://api.tavily.com"),
      temperature: p.delegateSendTemperature === !1 ? void 0 : Xe(p.delegateTemperature, 1),
      sendTemperature: !!(p.delegateSendTemperature ?? !0),
      maxTokens: Le(p.delegateMaxTokens),
      timeoutMs: Ii,
      toolMode: p.delegateToolMode || "native",
      reasoning: sa({
        provider: p.delegateProvider,
        baseUrl: p.delegateBaseUrl,
        model: p.delegateModel,
        maxTokens: Le(p.delegateMaxTokens)
      }, {
        mode: p.delegateReasoningMode,
        effort: p.delegateReasoningEffort,
        budgetTokens: p.delegateReasoningBudgetTokens
      })
    };
  }
  function J(p = {}) {
    const c = [];
    Object.entries(p.presets || {}).forEach(([A, T]) => {
      const B = T?.provider || "openai-compatible", L = T?.modelConfigs?.[B] || {}, I = sa({
        provider: B,
        baseUrl: L.baseUrl,
        model: L.model,
        maxTokens: Le(L.maxTokens)
      }, L.reasoning);
      I.valid === !1 && c.push(`预设“${A}”：${I.error}`);
    });
    const f = p.delegateConfig?.provider || "openai-compatible", h = p.delegateConfig?.modelConfigs?.[f] || {}, _ = sa({
      provider: f,
      baseUrl: h.baseUrl,
      model: h.model,
      maxTokens: Le(h.maxTokens)
    }, h.reasoning);
    return _.valid === !1 && c.push(`分身模型：${_.error}`), c;
  }
  function N(p = {}) {
    const c = (p.role === "delegate", C());
    return p.role === "delegate" ? K(c) : se(c);
  }
  function le(p) {
    C(), t.configDraft = {
      ...t.configDraft,
      presetDraftName: Ae(p.querySelector("#xb-assistant-preset-name")?.value)
    };
  }
  function xe(p = C(), c = p.provider || "openai-compatible", f = "main") {
    const h = $(c, f);
    return typeof v == "function" ? v({
      state: t,
      draft: p,
      provider: c,
      pullState: h,
      providerLabel: Oi(c)
    }) : `预设「${p.currentPresetName || "默认"}」 · ${Oi(c)}`;
  }
  function de(p, c, f) {
    const h = p?.querySelector?.(c);
    if (!h) return;
    const _ = String(f?.status || "idle"), A = String(f?.message || "").trim();
    h.textContent = A, h.hidden = !A, h.classList.toggle("is-loading", _ === "loading"), h.classList.toggle("is-success", _ === "success"), h.classList.toggle("is-error", _ === "error");
  }
  function ve(p) {
    if (!p) return;
    const c = ra(t.configPage);
    t.configPage = c, p.querySelectorAll("[data-config-page]").forEach((f) => {
      const h = ra(f?.dataset?.configPage) === c;
      f.classList.toggle("is-active", h), f.setAttribute("aria-selected", h ? "true" : "false");
    }), p.querySelectorAll("[data-config-page-panel]").forEach((f) => {
      const h = ra(f?.dataset?.configPagePanel) === c;
      f.toggleAttribute("hidden", !h);
    }), p.querySelector("#xb-assistant-delete-preset")?.toggleAttribute("hidden", c === "delegate");
  }
  function q(p, c = "main") {
    const f = C(), h = c === "delegate", _ = h ? "#xb-assistant-delegate-reasoning" : "#xb-assistant-reasoning", A = h ? f.delegateProvider : f.provider, T = h ? f.delegateBaseUrl : f.baseUrl, B = h ? f.delegateModel : f.model, L = {
      mode: h ? f.delegateReasoningMode : f.reasoningMode,
      effort: h ? f.delegateReasoningEffort : f.reasoningEffort,
      budgetTokens: h ? f.delegateReasoningBudgetTokens : f.reasoningBudgetTokens
    }, I = Rs({
      provider: A,
      baseUrl: T,
      model: B
    }), M = ia(A, {
      baseUrl: T,
      model: B,
      reasoning: L
    }), j = M.reasoningMode, U = M.reasoningEffort, W = M.reasoningBudgetTokens, Q = p.querySelector(`${_}-mode`), re = p.querySelector(`${_}-capability`), ce = p.querySelector(`${_}-effort-wrap`), fe = p.querySelector(`${_}-effort`), me = p.querySelector(`${_}-budget-wrap`), be = p.querySelector(`${_}-budget`);
    Q && (it(Q, Ud(I)), Q.value = j), re && (re.textContent = I.unsupportedReason || `能力配置：${I.profileId}`), fe && (it(fe, Fd(I)), fe.value = U), ce && (ce.style.display = j === "on" && I.intensity.kind === "effort" ? "" : "none"), be && I.intensity.kind === "budget" && (be.min = I.intensity.allowAuto ? "-1" : String(I.intensity.min), be.max = String(I.intensity.max), be.value = String(W)), me && (me.style.display = j === "on" && I.intensity.kind === "budget" ? "" : "none");
  }
  function O(p) {
    const c = p.querySelector("#xb-assistant-runtime");
    if (!c) return;
    const f = C(), h = t.configPage === "delegate", _ = h ? f.delegateProvider : f.provider;
    c.textContent = xe(h ? {
      ...f,
      currentPresetName: "分身",
      provider: _
    } : f, _ || "openai-compatible", h ? "delegate" : "main");
  }
  function ie(p) {
    if (!t.config) return;
    ve(p);
    const c = C(), f = c.provider || "openai-compatible", h = P(f), _ = c.delegateProvider || "openai-compatible", A = P(_, "delegate"), T = p.querySelector("#xb-assistant-provider"), B = p.querySelector("#xb-assistant-base-url"), L = p.querySelector("#xb-assistant-model"), I = p.querySelector("#xb-assistant-api-key"), M = p.querySelector("#xb-assistant-temperature"), j = p.querySelector("#xb-assistant-send-temperature"), U = p.querySelector("#xb-assistant-tool-mode-wrap"), W = p.querySelector("#xb-assistant-tool-mode"), Q = p.querySelector("#xb-assistant-permission-mode"), re = p.querySelector("#xb-assistant-jsapi-permission"), ce = p.querySelector("#xb-assistant-model-pulled"), fe = p.querySelector("#xb-assistant-max-tokens"), me = p.querySelector("#xb-assistant-preset-select"), be = p.querySelector("#xb-assistant-preset-name"), qe = p.querySelector("#xb-assistant-delegate-preset-select"), Pe = p.querySelector("#xb-assistant-delegate-provider"), Mt = p.querySelector("#xb-assistant-delegate-base-url"), hn = p.querySelector("#xb-assistant-delegate-model"), Oe = p.querySelector("#xb-assistant-delegate-api-key"), Ke = p.querySelector("#xb-assistant-tavily-api-key"), Jt = p.querySelector("#xb-assistant-delegate-model-pulled"), yn = p.querySelector("#xb-assistant-delegate-max-tokens"), Bs = p.querySelector("#xb-assistant-delegate-tool-mode-wrap"), Ra = p.querySelector("#xb-assistant-delegate-tool-mode");
    if (!me || !be) return;
    const qs = (t.config.presetNames || []).map((It) => ({
      value: It,
      label: It
    }));
    it(me, qs), me.value = c.currentPresetName || t.config.currentPresetName || "默认", qe && (it(qe, qs), qe.value = X(c.delegatePresetName, c.currentPresetName)), be.value = c.presetDraftName || c.currentPresetName || "默认", T && (T.value = f), B && (B.value = c.baseUrl || ""), L && (L.value = c.model || ""), I && (I.value = c.apiKey || ""), fe && (fe.value = String(Le(c.maxTokens))), M && (M.value = String(Xe(c.temperature, 1))), j && (j.checked = !!(c.sendTemperature ?? !0)), Ke && (Ke.value = c.tavilyApiKey || ""), U && (U.style.display = Yt(f) ? "" : "none"), W && (it(W, Pi), W.value = c.toolMode || "native"), Q && (it(Q, Xu), Q.value = Zt(c.permissionMode)), re && (it(re, Yu), re.value = Ot(c.jsApiPermission)), q(p), ce && (it(ce, h.map((It) => ({
      value: It,
      label: It
    })), "手动填写"), ce.value = h.includes(c.model) ? c.model : ""), Pe && (Pe.value = _), Mt && (Mt.value = c.delegateBaseUrl || ""), hn && (hn.value = c.delegateModel || ""), Oe && (Oe.value = c.delegateApiKey || "");
    const Us = p.querySelector("#xb-assistant-delegate-temperature"), Fs = p.querySelector("#xb-assistant-delegate-send-temperature");
    yn && (yn.value = String(Le(c.delegateMaxTokens))), Us && (Us.value = String(Xe(c.delegateTemperature, 1))), Fs && (Fs.checked = !!(c.delegateSendTemperature ?? !0)), Bs && (Bs.style.display = Yt(_) ? "" : "none"), Ra && (it(Ra, Pi), Ra.value = c.delegateToolMode || "native"), q(p, "delegate"), Jt && (it(Jt, A.map((It) => ({
      value: It,
      label: It
    })), "手动填写"), Jt.value = A.includes(c.delegateModel) ? c.delegateModel : ""), de(p, "#xb-assistant-model-pull-status", $(f)), de(p, "#xb-assistant-delegate-model-pull-status", $(_, "delegate")), O(p);
  }
  function Te(p) {
    if (typeof i != "function") return;
    const c = i(p);
    c && typeof c.catch == "function" && c.catch((f) => {
      a?.(u(f));
    });
  }
  function Wt(p, c, f) {
    p.querySelector(c)?.addEventListener("click", () => {
      const h = p.querySelector(f);
      h && (h.type = h.type === "password" ? "text" : "password");
    });
  }
  function Na(p) {
    return {
      expectedUpdatedAt: Number(p?.updatedAt) || 0,
      workspaceFileName: p?.workspaceFileName || "",
      jsApiPermission: Ot(p?.jsApiPermission),
      tavilyApiKey: String(p?.tavilyApiKey || ""),
      tavilyBaseUrl: lt(p?.tavilyBaseUrl || "https://api.tavily.com"),
      currentPresetName: p?.currentPresetName || "默认",
      delegatePresetName: p?.delegatePresetName || p?.currentPresetName || "默认",
      delegateConfig: p?.delegateConfig || {},
      delegateConfigured: p?.delegateConfigured === !0,
      presets: p?.presets || {}
    };
  }
  function Zn(p, c = {}) {
    const f = ka(p), h = J(f);
    if (h.length)
      return a?.(h[0]), !1;
    t.config = f;
    const _ = Ae(c.presetName || f.currentPresetName || "默认");
    return t.configDraft = R(_, f.presets?.[_] || Ge(), f), d(), Te({
      requestId: s(c.requestPrefix || "save-config"),
      config: f,
      payload: Na(f)
    }), !0;
  }
  function at(p, c = {}) {
    const f = k(p), h = Ae(c.presetName || f.presetDraftName), _ = Ae(f.currentPresetName || t.config?.currentPresetName || "默认"), A = (t.config?.presets || {})[_] || Ge(), T = Ve(f.modelConfigs || A.modelConfigs || {}), B = {
      ...A,
      provider: f.provider,
      permissionMode: Zt(f.permissionMode),
      modelConfigs: {
        ...T,
        [f.provider]: {
          ...T[f.provider] || {},
          ...w(f)
        }
      }
    }, L = { ...t.config?.presets || {} };
    c.renameCurrentPreset && h !== _ && delete L[_], L[h] = B, Zn({
      ...t.config,
      jsApiPermission: Ot(f.jsApiPermission),
      tavilyApiKey: String(f.tavilyApiKey || ""),
      tavilyBaseUrl: lt(f.tavilyBaseUrl || "https://api.tavily.com"),
      currentPresetName: h,
      delegatePresetName: X(f.delegatePresetName, h),
      delegateConfig: H(f),
      delegateConfigured: c.configureDelegate === !0 || t.config?.delegateConfigured === !0,
      presets: L
    }, {
      presetName: h,
      requestPrefix: c.requestPrefix
    });
  }
  function Bt(p, c = "") {
    const f = Ae(c || "默认"), h = typeof window < "u" && typeof window.prompt == "function" ? window.prompt(p, f) : f;
    return h === null ? "" : Ae(h);
  }
  function mn(p) {
    const c = Bt("输入新预设名称：", `${k(p).currentPresetName || "默认"} 副本`);
    if (!c) {
      a?.("预设名称不能为空");
      return;
    }
    const f = p.querySelector("#xb-assistant-preset-name");
    f && (f.value = c, at(p, {
      presetName: c,
      requestPrefix: "create-preset"
    }));
  }
  function ea(p) {
    const c = k(p), f = Ae(c.currentPresetName || t.config?.currentPresetName || "默认"), h = Bt("输入预设名称：", c.presetDraftName || f);
    if (!h) {
      a?.("预设名称不能为空");
      return;
    }
    if (h === f) return;
    const _ = p.querySelector("#xb-assistant-preset-name");
    _ && (_.value = h, at(p, {
      presetName: h,
      renameCurrentPreset: !0,
      requestPrefix: "rename-preset"
    }));
  }
  function Et(p) {
    if (Object.keys(t.config?.presets || {}).length <= 1) {
      a?.("至少要保留一套预设");
      return;
    }
    const c = k(p), f = Ae(t.configDraft?.currentPresetName || t.config?.currentPresetName || "默认"), h = { ...t.config?.presets || {} };
    delete h[f];
    const _ = Object.keys(h)[0] || "默认";
    Zn({
      ...t.config,
      jsApiPermission: Ot(c.jsApiPermission),
      tavilyApiKey: String(c.tavilyApiKey || t.config?.tavilyApiKey || ""),
      tavilyBaseUrl: lt(c.tavilyBaseUrl || t.config?.tavilyBaseUrl || "https://api.tavily.com"),
      currentPresetName: _,
      delegatePresetName: X(c.delegatePresetName, _),
      delegateConfig: H(c),
      presets: h
    }, {
      presetName: _,
      requestPrefix: "delete-preset"
    }) && n?.();
  }
  function bn(p) {
    p?.querySelector?.("[data-xb-agent-config-retry]")?.addEventListener("click", () => {
      l?.();
    }), p?.querySelector?.("[data-xb-agent-config-reload]")?.addEventListener("click", () => {
      t.configDraft = null, t.configDirty = !1, t.configExternalChangePending = !1, d(), l?.();
    }), p?.querySelector?.("#xb-assistant-provider") && (p.querySelector("#xb-assistant-provider")?.addEventListener("change", (c) => {
      const f = c.currentTarget.value, h = C().provider, _ = k(p, { provider: h });
      t.configDraft = {
        ..._,
        provider: f,
        ...V(f, _.modelConfigs)
      }, d(), n?.();
    }), p.querySelector("#xb-assistant-preset-select")?.addEventListener("change", (c) => {
      const f = Ae(c.currentTarget.value), h = (t.config?.presets || {})[f] || Ge(), _ = k(p);
      t.config = ka({
        ...t.config,
        jsApiPermission: Ot(_.jsApiPermission),
        currentPresetName: f,
        delegatePresetName: X(_.delegatePresetName, f),
        delegateConfig: H(_)
      }), t.configDraft = R(f, h, t.config), d(), n?.();
    }), p.querySelector("#xb-assistant-preset-name")?.addEventListener("input", () => {
      le(p);
    }), p.querySelector("#xb-assistant-base-url")?.addEventListener("input", () => {
      k(p), q(p), O(p);
    }), p.querySelector("#xb-assistant-model")?.addEventListener("input", () => {
      k(p), q(p), O(p);
    }), p.querySelector("#xb-assistant-api-key")?.addEventListener("input", () => {
      k(p);
    }), p.querySelector("#xb-assistant-max-tokens")?.addEventListener("input", () => {
      k(p);
    }), p.querySelector("#xb-assistant-temperature")?.addEventListener("input", () => {
      k(p);
    }), p.querySelector("#xb-assistant-send-temperature")?.addEventListener("change", () => {
      k(p);
    }), p.querySelector("#xb-assistant-tavily-api-key")?.addEventListener("input", () => {
      k(p);
    }), p.querySelector("#xb-assistant-model-pulled")?.addEventListener("change", (c) => {
      const f = c.currentTarget.value;
      if (!f) return;
      const h = p.querySelector("#xb-assistant-model");
      h && (h.value = f), k(p), q(p), O(p);
    }), Wt(p, "#xb-assistant-toggle-key", "#xb-assistant-api-key"), Wt(p, "#xb-assistant-toggle-tavily-key", "#xb-assistant-tavily-api-key"), p.querySelector("#xb-assistant-delegate-provider")?.addEventListener("change", (c) => {
      const f = c.currentTarget.value, h = C().delegateProvider, _ = k(p, { delegateProvider: h });
      t.configDraft = {
        ..._,
        delegateProvider: f,
        ...z(f, _.delegateModelConfigs)
      }, d(), n?.();
    }), p.querySelector("#xb-assistant-delegate-base-url")?.addEventListener("input", () => {
      k(p), q(p, "delegate"), O(p);
    }), p.querySelector("#xb-assistant-delegate-model")?.addEventListener("input", () => {
      k(p), q(p, "delegate"), O(p);
    }), p.querySelector("#xb-assistant-delegate-api-key")?.addEventListener("input", () => {
      k(p);
    }), p.querySelector("#xb-assistant-delegate-max-tokens")?.addEventListener("input", () => {
      k(p);
    }), p.querySelector("#xb-assistant-delegate-temperature")?.addEventListener("input", () => {
      k(p);
    }), p.querySelector("#xb-assistant-delegate-send-temperature")?.addEventListener("change", () => {
      k(p);
    }), p.querySelector("#xb-assistant-delegate-model-pulled")?.addEventListener("change", (c) => {
      const f = c.currentTarget.value;
      if (!f) return;
      const h = p.querySelector("#xb-assistant-delegate-model");
      h && (h.value = f), k(p), q(p, "delegate"), O(p);
    }), Wt(p, "#xb-assistant-delegate-toggle-key", "#xb-assistant-delegate-api-key"), p.querySelector("#xb-assistant-reasoning-mode")?.addEventListener("change", () => {
      k(p), q(p), O(p);
    }), p.querySelector("#xb-assistant-reasoning-effort")?.addEventListener("change", () => {
      k(p);
    }), p.querySelector("#xb-assistant-reasoning-budget")?.addEventListener("input", () => {
      k(p);
    }), p.querySelector("#xb-assistant-tool-mode")?.addEventListener("change", () => {
      k(p);
    }), p.querySelector("#xb-assistant-delegate-reasoning-mode")?.addEventListener("change", () => {
      k(p), q(p, "delegate"), O(p);
    }), p.querySelector("#xb-assistant-delegate-reasoning-effort")?.addEventListener("change", () => {
      k(p);
    }), p.querySelector("#xb-assistant-delegate-reasoning-budget")?.addEventListener("input", () => {
      k(p);
    }), p.querySelector("#xb-assistant-delegate-tool-mode")?.addEventListener("change", () => {
      k(p);
    }), p.querySelector("#xb-assistant-permission-mode")?.addEventListener("change", () => {
      k(p);
    }), p.querySelector("#xb-assistant-jsapi-permission")?.addEventListener("change", () => {
      k(p);
    }), p.querySelector("#xb-assistant-delegate-preset-select")?.addEventListener("change", (c) => {
      const f = X(c.currentTarget?.value, t.configDraft?.currentPresetName || t.config?.currentPresetName || "默认"), h = (t.config?.presets || {})[f] || Ge();
      t.configDraft = {
        ...k(p),
        ...G(f, h)
      }, d(), n?.();
    }), p.querySelectorAll("[data-config-page]").forEach((c) => {
      c.addEventListener("click", (f) => {
        k(p), t.configPage = ra(f.currentTarget?.dataset?.configPage), ve(p), ie(p);
      });
    }), p.querySelector("#xb-assistant-pull-models")?.addEventListener("click", async () => {
      k(p), d();
      const c = N();
      x(c.provider, {
        status: "loading",
        message: "正在拉取模型列表…"
      }), n?.();
      try {
        const f = await o(c);
        D(c.provider, f), x(c.provider, {
          status: "success",
          message: `已拉取 ${f.length} 个模型`
        });
      } catch (f) {
        D(c.provider, []), x(c.provider, {
          status: "error",
          message: u(f)
        });
      }
      d(), n?.();
    }), p.querySelector("#xb-assistant-delegate-pull-models")?.addEventListener("click", async () => {
      k(p), d();
      const c = N({ role: "delegate" });
      x(c.provider, {
        status: "loading",
        message: "正在拉取模型列表…"
      }, "delegate"), n?.();
      try {
        const f = await o(c);
        D(c.provider, f, "delegate"), x(c.provider, {
          status: "success",
          message: `已拉取 ${f.length} 个模型`
        }, "delegate");
      } catch (f) {
        D(c.provider, [], "delegate"), x(c.provider, {
          status: "error",
          message: u(f)
        }, "delegate");
      }
      d(), n?.();
    }), p.querySelector("#xb-assistant-new-preset")?.addEventListener("click", () => {
      mn(p);
    }), p.querySelector("#xb-assistant-rename-preset")?.addEventListener("click", () => {
      ea(p);
    }), p.querySelector("#xb-assistant-save")?.addEventListener("click", () => {
      at(p);
    }), p.querySelector("#xb-assistant-delegate-save")?.addEventListener("click", () => {
      at(p, {
        requestPrefix: "save-delegate-config",
        configureDelegate: !0
      });
    }), p.querySelector("#xb-assistant-delete-preset")?.addEventListener("click", () => {
      Et(p);
    }));
  }
  return {
    getActiveProviderConfig: N,
    getActiveProviderConfigFromForm(p, c = {}) {
      return t.configDraft = E(p), N(c);
    },
    syncConfigToForm: ie,
    bindSettingsPanelEvents: bn
  };
}
function En(e = "") {
  return String(e || "").replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#39;");
}
function Cn(e) {
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
function ic(e = {}) {
  const t = String(e?.status || "idle");
  return t === "saving" ? "saving" : t === "success" ? "success" : t === "error" ? "error" : "save";
}
function rc(e = {}) {
  const t = String(e?.status || "idle");
  return t === "saving" ? {
    className: "xb-assistant-save-button is-saving",
    title: "正在保存配置"
  } : t === "success" ? {
    className: "xb-assistant-save-button is-success",
    title: "配置已保存"
  } : t === "error" ? {
    className: "xb-assistant-save-button is-error",
    title: En(e?.error || "保存失败")
  } : {
    className: "xb-assistant-save-button",
    title: "保存配置"
  };
}
function lc(e = {}) {
  const { configSave: t = {}, runtimeText: n = "", inlineToastText: a = "", showInlineToast: s = !0, showAssistantPermissions: i = !0, showDelegateSettings: l = !0, showTavilySettings: o = !0, activePage: u = "main", delegatePresetHint: v = "DelegateRun 分身会使用这里的独立 API 配置；可以和主助手使用不同 Provider、Base URL、模型和 Tool 调用格式。", isBusy: d = !1, canDeletePreset: g = !0, configLoadError: $ = "", configExternalChangePending: x = !1 } = e, D = String($ || "").trim(), P = rc(t), X = ic(t), G = d || D || String(t?.status || "") === "saving" ? "disabled" : "", V = d || !g ? "disabled" : "", z = u === "delegate" ? "delegate" : "main", R = z === "main", C = z === "delegate", E = i ? `
            <label>
                <span>斜杠命令权限</span>
                <select id="xb-assistant-permission-mode"></select>
            </label>
            <label>
                <span>JavaScript API 权限</span>
                <select id="xb-assistant-jsapi-permission"></select>
            </label>` : "", k = l ? `
            <div class="xb-assistant-config-tabs" role="tablist" aria-label="API 配置分页">
                <button id="xb-assistant-config-tab-main" type="button" class="xb-assistant-config-tab ${R ? "is-active" : ""}" data-config-page="main" role="tab" aria-selected="${R ? "true" : "false"}">主助手 API</button>
                <button id="xb-assistant-config-tab-delegate" type="button" class="xb-assistant-config-tab ${C ? "is-active" : ""}" data-config-page="delegate" role="tab" aria-selected="${C ? "true" : "false"}">分身 API</button>
            </div>` : "", w = l ? `
            <div class="xb-assistant-config-page" data-config-page-panel="delegate" ${C ? "" : "hidden"}>
                <p class="xb-assistant-config-note">${En(v)}</p>
                <div class="xb-assistant-preset-row">
                    <select id="xb-assistant-delegate-preset-select" class="xb-assistant-preset-field" aria-label="已存预设"></select>
                    <div class="xb-assistant-preset-tools is-single" aria-label="分身 API 预设操作">
                        <button id="xb-assistant-delegate-save" type="button" class="xb-assistant-icon-button ${P.className}" title="${P.title}" aria-label="${P.title}" ${G}>${Cn(X)}</button>
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
            <div class="xb-assistant-config-alert is-error" data-xb-agent-config-load-error ${D ? "" : "hidden"}>
                <span data-xb-agent-config-load-error-message>${En(D)}</span>
                <button type="button" data-xb-agent-config-retry>重新读取</button>
            </div>
            <div class="xb-assistant-config-alert is-conflict" data-xb-agent-config-conflict ${D || !x ? "hidden" : ""}>
                <span>共享配置已在其他页面更新。当前未保存编辑仍保留；重新载入会放弃这些编辑。</span>
                <button type="button" data-xb-agent-config-reload>重新载入</button>
            </div>
            <fieldset class="xb-assistant-config-fields" data-xb-agent-config-fields ${D ? "disabled" : ""}>
            ${k}
            <div class="xb-assistant-config-page" data-config-page-panel="main" ${R ? "" : "hidden"}>
            <div class="xb-assistant-preset-row">
                <select id="xb-assistant-preset-select" class="xb-assistant-preset-field" aria-label="已存预设"></select>
                <input id="xb-assistant-preset-name" type="hidden" />
                <div class="xb-assistant-preset-tools" aria-label="API 预设操作">
                    <button id="xb-assistant-new-preset" type="button" class="xb-assistant-icon-button" title="新增预设" aria-label="新增预设" ${d ? "disabled" : ""}>${Cn("add")}</button>
                    <button id="xb-assistant-rename-preset" type="button" class="xb-assistant-icon-button" title="重命名预设" aria-label="重命名预设" ${d ? "disabled" : ""}>${Cn("rename")}</button>
                    <button id="xb-assistant-save" type="button" class="xb-assistant-icon-button ${P.className}" title="${P.title}" aria-label="${P.title}" ${G}>${Cn(X)}</button>
                    <button id="xb-assistant-delete-preset" type="button" class="xb-assistant-icon-button" title="删除预设" aria-label="删除预设" ${V}>${Cn("delete")}</button>
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
            ${E}
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
            ${w}
            <div class="xb-assistant-runtime" id="xb-assistant-runtime">${En(n)}</div>
            </fieldset>
            ${s ? `<div class="xb-assistant-toast xb-assistant-toast-inline" id="xb-assistant-toast" aria-live="polite">${En(a)}</div>` : ""}
        </section>
    `;
}
var oc = { class: "agent-api-app" }, uc = { class: "agent-api-scroll" }, dc = { "aria-live": "polite" }, cc = ["disabled"], fc = {
  key: 0,
  class: "agent-api-state",
  "aria-live": "polite"
}, vc = {
  key: 1,
  class: "agent-api-state is-error",
  role: "alert"
}, pc = {
  class: "agent-api-panel",
  "aria-label": "共享 Agent API 配置"
}, Di = 13e4, gc = /* @__PURE__ */ ue({
  __name: "AgentApiApp",
  props: {
    bridge: {},
    initialState: {}
  },
  setup(e) {
    const t = e, n = structuredClone(/* @__PURE__ */ te(t.initialState)), a = /* @__PURE__ */ Y(n), s = /* @__PURE__ */ Y(null), i = /* @__PURE__ */ Y("idle"), l = /* @__PURE__ */ Y("尚未测试。打开页面和保存配置都不会自动连接供应商。");
    let o = () => {
    }, u = null, v = 0;
    const d = /* @__PURE__ */ $t({
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
    }), g = ee(() => a.value.status === "ready" && d.config !== null), $ = ee(() => Object.keys(d.config?.presets || {}).length), x = ee(() => i.value === "testing");
    function D(k) {
      const w = k instanceof Error ? k.message : String(k || "unknown_error");
      return w === "host_request_timeout" ? "请求等待超时，请检查网络后重试。" : w === "app_inactive" ? "页面已经关闭。" : w;
    }
    function P() {
      u && clearTimeout(u), u = setTimeout(() => {
        d.configSave = {
          status: "idle",
          requestId: "",
          error: ""
        }, d.inlineToastText = "", R();
      }, 1800);
    }
    async function X(k) {
      const w = k.payload || {};
      d.configSave = {
        status: "saving",
        requestId: "",
        error: ""
      }, d.inlineToastText = "正在保存共享配置…", R();
      try {
        const S = (await t.bridge.request("agent-api/save", { patch: w }, 35e3)).result;
        if (S.ok !== !0 || !S.config)
          throw S.conflict && (d.configExternalChangePending = !0), new Error(S.error || "共享 Agent API 配置保存失败");
        d.config = ka(S.config), d.configDraft = null, d.configDirty = !1, d.configExternalChangePending = !1, d.configFormSyncPending = !0, d.configSave = {
          status: "success",
          requestId: "",
          error: ""
        }, d.inlineToastText = "已保存；小白酒馆、画图、Ebook 与 OS 将读取同一份配置。";
      } catch (S) {
        const H = D(S);
        d.configSave = {
          status: "error",
          requestId: "",
          error: H
        }, d.inlineToastText = H;
      }
      R(), P();
    }
    async function G(k = !1) {
      const w = ++v;
      try {
        const S = await t.bridge.request("agent-api/reload", {}, 35e3);
        if (w !== v) return;
        if (k && d.configDirty) {
          d.configExternalChangePending = !0, R();
          return;
        }
        C(S.result);
      } catch (S) {
        if (w !== v) return;
        a.value = {
          status: "error",
          config: null,
          message: D(S)
        }, R();
      }
    }
    async function V(k) {
      return (await t.bridge.request("agent-api/pull-models", { providerConfig: k }, Di)).result.models;
    }
    const z = sc({
      state: d,
      render: R,
      saveConfig: X,
      reloadConfig: G,
      pullModels: V,
      describeError: D
    });
    function R() {
      const k = s.value;
      !k || !d.config || (k.innerHTML = lc({
        configSave: d.configSave,
        inlineToastText: d.inlineToastText,
        showAssistantPermissions: !1,
        showDelegateSettings: !1,
        showTavilySettings: !1,
        canDeletePreset: $.value > 1,
        configLoadError: a.value.status === "error" ? a.value.message : "",
        configExternalChangePending: d.configExternalChangePending
      }), z.syncConfigToForm(k), z.bindSettingsPanelEvents(k));
    }
    function C(k) {
      a.value = structuredClone(k), k.status === "ready" && k.config && (d.config = ka(k.config), d.configDraft = null, d.configDirty = !1, d.configExternalChangePending = !1, d.configFormSyncPending = !0), Jn(R);
    }
    async function E() {
      const k = s.value;
      if (!k || !g.value || x.value) return;
      const w = z.getActiveProviderConfigFromForm(k);
      i.value = "testing", l.value = "正在测试当前表单中的连接…";
      try {
        const S = (await t.bridge.request("agent-api/test-connection", { providerConfig: structuredClone(/* @__PURE__ */ te(w)) }, Di)).result;
        i.value = "success", l.value = `${S.provider || "Provider"} · ${S.model || "当前模型"} · ${S.latencyMs} ms`;
      } catch (S) {
        i.value = "error", l.value = D(S);
      }
    }
    return ft(() => {
      o = t.bridge.subscribe((k) => {
        if (k.type === "agent-api/state") {
          C(k.payload.state);
          return;
        }
        k.type === "agent-api/config-changed" && (d.configDirty ? (d.configExternalChangePending = !0, R()) : G(!0));
      }), C(n);
    }), vt(() => {
      v += 1, o(), u && clearTimeout(u);
    }), (k, w) => (m(), y("main", oc, [w[5] || (w[5] = r("header", { class: "agent-api-header" }, [r("div", null, [
      r("span", null, "System service"),
      r("h1", null, "Agent API"),
      r("p", null, "一份配置，供小白酒馆、画图、Ebook 与 OS 共同使用。")
    ]), r("i", { "aria-hidden": "true" }, [r("b"), Se(" API")])], -1)), r("div", uc, [
      r("section", {
        class: oe(["agent-api-connection", `is-${i.value}`]),
        "aria-labelledby": "agent-api-connection-title"
      }, [r("div", null, [
        w[1] || (w[1] = r("small", null, "CONNECTION CHECK", -1)),
        w[2] || (w[2] = r("h2", { id: "agent-api-connection-title" }, "当前连接", -1)),
        r("p", dc, b(l.value), 1)
      ]), r("button", {
        type: "button",
        disabled: !g.value || x.value,
        onClick: E
      }, b(x.value ? "测试中…" : "测试当前连接"), 9, cc)], 2),
      a.value.status === "loading" ? (m(), y("section", fc, [...w[3] || (w[3] = [r("i", { "aria-hidden": "true" }, null, -1), r("div", null, [r("strong", null, "正在读取共享配置"), r("span", null, "页面打开不会连接模型供应商。")], -1)])])) : a.value.status === "error" ? (m(), y("section", vc, [r("div", null, [w[4] || (w[4] = r("strong", null, "配置暂时无法读取", -1)), r("span", null, b(a.value.message), 1)]), r("button", {
        type: "button",
        onClick: w[0] || (w[0] = (S) => G())
      }, "重新读取")])) : F("", !0),
      Ee(r("section", pc, [r("div", {
        ref_key: "panelRoot",
        ref: s
      }, null, 512)], 512), [[hu, g.value]])
    ])]));
  }
}), mc = gc, bc = Object.freeze({
  id: "bank",
  name: "银行",
  accent: "#b89a58"
}), hc = ["aria-labelledby"], yc = ["id"], kc = { class: "bank-dialog-subject" }, Sc = { key: 0 }, xc = { key: 1 }, wc = {
  key: 0,
  class: "bank-dialog-field"
}, _c = { id: "bank-amount-help" }, Cc = {
  key: 1,
  class: "bank-dialog-validation"
}, $c = {
  key: 2,
  class: "bank-dialog-summary"
}, Tc = {
  key: 3,
  class: "bank-dialog-warning"
}, Ac = {
  key: 4,
  class: "bank-dialog-warning is-loss"
}, Ec = {
  key: 5,
  class: "bank-dialog-error",
  role: "alert"
}, Mc = { class: "bank-dialog-actions" }, Ic = ["disabled"], Pc = ["disabled"], Oc = /* @__PURE__ */ ue({
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
    const n = e, a = t, s = /* @__PURE__ */ Y(n.product ? String(n.product.minAmount) : ""), i = ee(() => n.mode === "deposit-open" ? "开立定期存单" : n.mode === "fund-open" ? "申购浮动理财" : "确认提前支取"), l = ee(() => /^\d+$/.test(s.value.trim()) ? Number(s.value) : 0), o = ee(() => n.mode === "withdraw" ? "" : !n.product || !Number.isSafeInteger(l.value) || l.value <= 0 ? "请输入正整数金额" : l.value < n.product.minAmount || l.value > n.product.maxAmount ? `金额须在 ${n.product.minAmount} 至 ${n.product.maxAmount} 之间` : l.value > n.balance ? "可用余额不足" : ""), u = ee(() => n.mode === "deposit-open" ? n.product : null), v = ee(() => u.value ? Math.floor(l.value * (1e4 + u.value.interestBps) / 1e4) : 0), d = ee(() => !n.busy && (n.mode === "withdraw" || !o.value));
    function g() {
      if (d.value) {
        if (n.mode === "withdraw") {
          a("confirm");
          return;
        }
        a("confirm", l.value);
      }
    }
    return ($, x) => (m(), y("dialog", {
      open: "",
      class: "bank-dialog",
      "aria-labelledby": `bank-dialog-${e.mode}`,
      onClick: x[2] || (x[2] = wt((D) => !e.busy && $.$emit("cancel"), ["self"])),
      onKeydown: x[3] || (x[3] = Yr(wt((D) => !e.busy && $.$emit("cancel"), ["stop", "prevent"]), ["esc"]))
    }, [r("form", {
      method: "dialog",
      class: "bank-dialog-card",
      onSubmit: wt(g, ["prevent"])
    }, [
      x[9] || (x[9] = r("span", { class: "bank-dialog-kicker" }, "VAULT AUTHORIZATION", -1)),
      r("h2", { id: `bank-dialog-${e.mode}` }, b(i.value), 9, yc),
      r("div", kc, [r("span", null, b(e.mode === "withdraw" ? "取" : e.mode === "deposit-open" ? "定" : "理"), 1), r("div", null, [r("strong", null, b(e.position?.name || e.product?.name), 1), e.product ? (m(), y("small", Sc, b(e.product.lockLabel), 1)) : (m(), y("small", xc, "当前本金 ¤ " + b(e.position?.principal.toLocaleString("zh-CN")), 1))])]),
      e.mode !== "withdraw" ? (m(), y("label", wc, [
        x[5] || (x[5] = r("span", null, "开户金额", -1)),
        r("div", null, [x[4] || (x[4] = r("i", null, "¤", -1)), Ee(r("input", {
          "onUpdate:modelValue": x[0] || (x[0] = (D) => s.value = D),
          type: "text",
          inputmode: "numeric",
          autocomplete: "off",
          "aria-describedby": "bank-amount-help"
        }, null, 512), [[We, s.value]])]),
        r("small", _c, "可用 " + b(e.balance.toLocaleString("zh-CN")) + " · 范围 " + b(e.product?.minAmount) + " - " + b(e.product?.maxAmount), 1)
      ])) : F("", !0),
      o.value ? (m(), y("p", Cc, b(o.value), 1)) : F("", !0),
      e.mode === "deposit-open" && u.value && !o.value ? (m(), y("dl", $c, [r("div", null, [x[6] || (x[6] = r("dt", null, "锁定期限", -1)), r("dd", null, b(u.value.lockLabel), 1)]), r("div", null, [x[7] || (x[7] = r("dt", null, "到期兑付", -1)), r("dd", null, "¤ " + b(v.value.toLocaleString("zh-CN")), 1)])])) : F("", !0),
      e.mode === "fund-open" ? (m(), y("p", Tc, " 实际收益将在开户时封存，锁定期间不可退出，到期后才会揭晓并可领取。 ")) : F("", !0),
      e.mode === "withdraw" && e.position ? (m(), y("p", Ac, [
        x[8] || (x[8] = Se(" 将立即收回 ", -1)),
        r("strong", null, b(e.position.earlyWithdrawalAmount.toLocaleString("zh-CN")) + " 小白币", 1),
        Se("，相较本金损失 " + b((e.position.principal - e.position.earlyWithdrawalAmount).toLocaleString("zh-CN")) + " 小白币。此操作不可撤销。 ", 1)
      ])) : F("", !0),
      e.error ? (m(), y("p", Ec, b(e.error), 1)) : F("", !0),
      r("div", Mc, [r("button", {
        type: "button",
        disabled: e.busy,
        onClick: x[1] || (x[1] = (D) => $.$emit("cancel"))
      }, "取消", 8, Ic), r("button", {
        type: "submit",
        class: "is-primary",
        disabled: !d.value
      }, b(e.busy ? "正在封存…" : e.mode === "withdraw" ? `确认收回 ${e.position?.earlyWithdrawalAmount || 0}` : "确认开户"), 9, Pc)])
    ], 32)], 40, hc));
  }
}), Lc = Oc, Dc = { "aria-labelledby": "bank-deposits-title" }, Nc = { class: "bank-product-grid" }, Rc = { class: "bank-product-index" }, Bc = { class: "bank-rate-block" }, qc = { class: "bank-product-terms" }, Uc = [
  "disabled",
  "title",
  "onClick"
], Fc = /* @__PURE__ */ ue({
  __name: "BankDeposits",
  props: {
    products: {},
    balance: {},
    writeDisabledReason: {}
  },
  emits: ["open"],
  setup(e) {
    return (t, n) => (m(), y("section", Dc, [
      n[6] || (n[6] = r("header", { class: "bank-section-heading" }, [r("div", null, [r("span", null, "FIXED CERTIFICATES"), r("h2", { id: "bank-deposits-title" }, "定期存单")]), r("small", null, "到期收益确定")], -1)),
      n[7] || (n[7] = r("p", { class: "bank-section-intro" }, "本金锁定至约定回合。到期前可提前支取，最终到账额会在确认时明确列出。", -1)),
      r("div", Nc, [(m(!0), y(ae, null, ke(e.products, (a, s) => (m(), y("article", {
        key: a.id,
        class: "bank-product-card bank-deposit-card"
      }, [
        r("header", null, [
          r("span", Rc, "0" + b(s + 1), 1),
          r("div", null, [r("small", null, b(a.lockLabel), 1), r("h3", null, b(a.name), 1)]),
          n[0] || (n[0] = r("span", { class: "bank-product-seal" }, "定", -1))
        ]),
        r("div", Bc, [
          n[1] || (n[1] = r("span", null, "到期收益率", -1)),
          r("strong", null, b(a.interestLabel), 1),
          n[2] || (n[2] = r("small", null, "固定收益", -1))
        ]),
        r("dl", qc, [r("div", null, [n[3] || (n[3] = r("dt", null, "开户范围", -1)), r("dd", null, b(a.amountLabel), 1)]), r("div", null, [n[4] || (n[4] = r("dt", null, "提前支取", -1)), r("dd", null, b(a.earlyPenaltyLabel), 1)])]),
        r("button", {
          type: "button",
          disabled: !!e.writeDisabledReason || e.balance < a.minAmount,
          title: e.writeDisabledReason || (e.balance < a.minAmount ? "可用余额不足最低开户额" : ""),
          onClick: (i) => t.$emit("open", a)
        }, [...n[5] || (n[5] = [Se(" 开立存单", -1), r("span", null, "›", -1)])], 8, Uc)
      ]))), 128))])
    ]));
  }
}), Hc = Fc, jc = { "aria-labelledby": "bank-funds-title" }, Kc = { class: "bank-product-grid" }, Vc = { class: "bank-product-index" }, Gc = { class: "bank-rate-block" }, zc = { class: "bank-product-terms" }, Wc = [
  "disabled",
  "title",
  "onClick"
], Jc = /* @__PURE__ */ ue({
  __name: "BankFunds",
  props: {
    products: {},
    balance: {},
    writeDisabledReason: {}
  },
  emits: ["open"],
  setup(e) {
    return (t, n) => (m(), y("section", jc, [
      n[4] || (n[4] = r("header", { class: "bank-section-heading" }, [r("div", null, [r("span", null, "MANAGED FUNDS"), r("h2", { id: "bank-funds-title" }, "浮动理财")]), r("small", null, "到期前不揭晓结果")], -1)),
      n[5] || (n[5] = r("p", { class: "bank-section-intro" }, "收益在开户时封存，到期后才会公开。理财锁定期间不可提前退出。", -1)),
      r("div", Kc, [(m(!0), y(ae, null, ke(e.products, (a, s) => (m(), y("article", {
        key: a.id,
        class: "bank-product-card bank-fund-card"
      }, [
        r("header", null, [
          r("span", Vc, "F" + b(s + 1), 1),
          r("div", null, [r("small", null, b(a.lockLabel), 1), r("h3", null, b(a.name), 1)]),
          r("span", { class: oe(["bank-risk-badge", `is-${a.riskLevel}`]) }, b(a.riskLabel), 3)
        ]),
        r("p", null, b(a.description), 1),
        r("div", Gc, [
          n[0] || (n[0] = r("span", null, "合同收益区间", -1)),
          r("strong", null, b(a.returnLabel), 1),
          n[1] || (n[1] = r("small", null, "实际结果到期可见", -1))
        ]),
        r("dl", zc, [r("div", null, [n[2] || (n[2] = r("dt", null, "开户范围", -1)), r("dd", null, b(a.amountLabel), 1)])]),
        r("button", {
          type: "button",
          disabled: !!e.writeDisabledReason || e.balance < a.minAmount,
          title: e.writeDisabledReason || (e.balance < a.minAmount ? "可用余额不足最低开户额" : ""),
          onClick: (i) => t.$emit("open", a)
        }, [...n[3] || (n[3] = [Se(" 申购理财", -1), r("span", null, "›", -1)])], 8, Wc)
      ]))), 128))])
    ]));
  }
}), Xc = Jc, Yc = { "aria-labelledby": "bank-positions-title" }, Qc = { class: "bank-section-heading" }, Zc = ["disabled"], ef = {
  key: 0,
  class: "bank-empty-state"
}, tf = {
  key: 1,
  class: "bank-position-group"
}, nf = { class: "bank-position-top" }, af = { key: 0 }, sf = { class: "is-loss" }, rf = [
  "disabled",
  "title",
  "onClick"
], lf = {
  key: 1,
  class: "bank-due-note"
}, of = {
  key: 2,
  class: "bank-position-group"
}, uf = { class: "bank-position-top" }, df = {
  key: 0,
  class: "bank-fund-result"
}, cf = {
  key: 1,
  class: "bank-sealed-copy"
}, ff = /* @__PURE__ */ ue({
  __name: "BankPositions",
  props: {
    deposits: {},
    investments: {},
    claimableCount: {},
    writeDisabledReason: {}
  },
  emits: ["withdraw", "settle"],
  setup(e) {
    return (t, n) => (m(), y("section", Yc, [
      r("header", Qc, [n[1] || (n[1] = r("div", null, [r("span", null, "SEALED POSITIONS"), r("h2", { id: "bank-positions-title" }, "我的头寸")], -1)), e.claimableCount ? (m(), y("button", {
        key: 0,
        type: "button",
        class: "bank-small-claim",
        disabled: !!e.writeDisabledReason,
        onClick: n[0] || (n[0] = (a) => t.$emit("settle"))
      }, " 领取全部 " + b(e.claimableCount) + " 笔 ", 9, Zc)) : F("", !0)]),
      !e.deposits.length && !e.investments.length ? (m(), y("div", ef, [...n[2] || (n[2] = [
        r("span", null, "◇", -1),
        r("strong", null, "金库尚无头寸", -1),
        r("p", null, "从定期或理财页面选择一份产品开始配置资产。", -1)
      ])])) : F("", !0),
      e.deposits.length ? (m(), y("div", tf, [r("header", null, [n[3] || (n[3] = r("h3", null, "定期存单", -1)), r("span", null, b(e.deposits.length), 1)]), (m(!0), y(ae, null, ke(e.deposits, (a) => (m(), y("article", {
        key: a.id,
        class: "bank-position-card"
      }, [
        r("div", nf, [
          n[4] || (n[4] = r("span", { class: "bank-position-mark" }, "定", -1)),
          r("div", null, [r("h4", null, b(a.name), 1), r("small", null, "本金 ¤ " + b(a.principal.toLocaleString("zh-CN")), 1)]),
          r("span", { class: oe(["bank-position-status", { "is-due": a.claimable }]) }, b(a.statusLabel), 3)
        ]),
        r("dl", null, [r("div", null, [n[5] || (n[5] = r("dt", null, "到期兑付", -1)), r("dd", null, "¤ " + b(a.maturityAmount.toLocaleString("zh-CN")), 1)]), a.claimable ? F("", !0) : (m(), y("div", af, [n[6] || (n[6] = r("dt", null, "现在支取", -1)), r("dd", sf, "¤ " + b(a.earlyWithdrawalAmount.toLocaleString("zh-CN")), 1)]))]),
        a.claimable ? (m(), y("span", lf, "将在“领取全部”时统一兑付")) : (m(), y("button", {
          key: 0,
          type: "button",
          class: "bank-withdraw-button",
          disabled: !!e.writeDisabledReason,
          title: e.writeDisabledReason,
          onClick: (s) => t.$emit("withdraw", a)
        }, " 提前支取 ", 8, rf))
      ]))), 128))])) : F("", !0),
      e.investments.length ? (m(), y("div", of, [r("header", null, [n[7] || (n[7] = r("h3", null, "浮动理财", -1)), r("span", null, b(e.investments.length), 1)]), (m(!0), y(ae, null, ke(e.investments, (a) => (m(), y("article", {
        key: a.id,
        class: "bank-position-card"
      }, [r("div", uf, [
        n[8] || (n[8] = r("span", { class: "bank-position-mark" }, "理", -1)),
        r("div", null, [r("h4", null, b(a.name), 1), r("small", null, b(a.riskLabel) + " · 本金 ¤ " + b(a.principal.toLocaleString("zh-CN")), 1)]),
        r("span", { class: oe(["bank-position-status", { "is-due": a.claimable }]) }, b(a.statusLabel), 3)
      ]), a.claimable ? (m(), y("div", df, [
        n[9] || (n[9] = r("span", null, "封存结果已揭晓", -1)),
        r("strong", { class: oe({ "is-negative": a.resolvedReturnBps < 0 }) }, b(a.returnLabel), 3),
        r("small", null, "可兑付 ¤ " + b(a.settlementAmount.toLocaleString("zh-CN")), 1)
      ])) : (m(), y("p", cf, "收益结果仍在金库中封存，到期前不会公开。"))]))), 128))])) : F("", !0)
    ]));
  }
}), vf = ff, pf = { "aria-labelledby": "bank-records-title" }, gf = { class: "bank-section-heading" }, mf = {
  key: 0,
  class: "bank-empty-state"
}, bf = {
  key: 1,
  class: "bank-record-list"
}, hf = { class: "bank-record-mark" }, yf = { class: "bank-record-main" }, kf = {
  key: 0,
  class: "bank-inline-error",
  role: "alert"
}, Sf = ["disabled"], xf = {
  key: 2,
  class: "bank-record-end"
}, wf = /* @__PURE__ */ ue({
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
    return (n, a) => (m(), y("section", pf, [r("header", gf, [a[1] || (a[1] = r("div", null, [r("span", null, "SETTLEMENT ARCHIVE"), r("h2", { id: "bank-records-title" }, "金融记录")], -1)), r("small", null, b(e.total) + " 笔", 1)]), e.activities.length ? (m(), y("div", bf, [
      (m(!0), y(ae, null, ke(e.activities, (s) => (m(), y("article", {
        key: s.id,
        class: "bank-record-row"
      }, [
        r("span", hf, b(s.kind === "deposit" ? "定" : "理"), 1),
        r("div", yf, [
          r("header", null, [r("strong", null, b(s.productName), 1), r("span", null, b(s.resultLabel), 1)]),
          r("dl", null, [r("div", null, [a[3] || (a[3] = r("dt", null, "投入", -1)), r("dd", null, "¤ " + b(s.amountIn.toLocaleString("zh-CN")), 1)]), r("div", null, [a[4] || (a[4] = r("dt", null, "兑付", -1)), r("dd", null, "¤ " + b(s.payout.toLocaleString("zh-CN")), 1)])]),
          r("small", null, b(s.turnLabel) + " · " + b(ln(t).format(s.createdAt)), 1)
        ]),
        r("strong", { class: oe(["bank-record-net", {
          "is-negative": s.net < 0,
          "is-flat": s.net === 0
        }]) }, [Se(b(s.net > 0 ? "+" : "") + b(s.net) + " ", 1), r("small", null, b(s.netLabel), 1)], 2)
      ]))), 128)),
      e.error ? (m(), y("p", kf, b(e.error), 1)) : F("", !0),
      e.hasMore ? (m(), y("button", {
        key: 1,
        type: "button",
        class: "bank-load-more",
        disabled: e.loadingMore,
        onClick: a[0] || (a[0] = (s) => n.$emit("loadMore"))
      }, b(e.loadingMore ? "正在开启下一册…" : "载入更多记录"), 9, Sf)) : (m(), y("p", xf, "金库档案已全部展开"))
    ])) : (m(), y("div", mf, [...a[2] || (a[2] = [
      r("span", null, "簿", -1),
      r("strong", null, "尚无兑付记录", -1),
      r("p", null, "头寸到期领取或提前支取后，结果会归档在这里。", -1)
    ])]))]));
  }
}), _f = wf, Cf = {
  class: "bank-vault",
  "aria-labelledby": "bank-vault-title"
}, $f = { class: "bank-section-heading bank-vault-heading" }, Tf = { class: "bank-balance-panel" }, Af = { class: "bank-vault-metrics" }, Ef = ["disabled", "title"], Mf = { class: "bank-vault-portals" }, If = /* @__PURE__ */ ue({
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
    return (t, n) => (m(), y("section", Cf, [
      n[18] || (n[18] = r("div", {
        class: "bank-vault-door",
        "aria-hidden": "true"
      }, [r("div", { class: "bank-vault-ring" }, [
        r("span", null, "III"),
        r("i"),
        r("span", null, "VI"),
        r("i"),
        r("span", null, "IX")
      ])], -1)),
      r("header", $f, [n[4] || (n[4] = r("div", null, [r("span", null, "PRIVATE RESERVE"), r("h2", { id: "bank-vault-title" }, "金库总览")], -1)), r("small", null, "第 " + b(e.currentTurn) + " 回合", 1)]),
      r("div", Tf, [
        n[6] || (n[6] = r("span", null, "可用资产", -1)),
        r("strong", null, [n[5] || (n[5] = r("small", null, "¤", -1)), Se(b(e.balance.toLocaleString("zh-CN")), 1)]),
        n[7] || (n[7] = r("div", null, [r("span", null, "小白币活期余额"), r("i", null, "AVAILABLE")], -1))
      ]),
      r("div", Af, [r("article", null, [
        n[8] || (n[8] = r("span", null, "锁定本金", -1)),
        r("strong", null, "¤ " + b(e.lockedAmount.toLocaleString("zh-CN")), 1),
        r("small", null, b(e.depositCount + e.fundCount) + " 笔持仓", 1)
      ]), r("article", { class: oe({ "is-claimable": e.claimableCount > 0 }) }, [
        n[9] || (n[9] = r("span", null, "待领取", -1)),
        r("strong", null, b(e.claimableCount), 1),
        r("small", null, b(e.claimableCount ? "已到期，可统一兑付" : "暂无到期头寸"), 1)
      ], 2)]),
      e.claimableCount ? (m(), y("button", {
        key: 0,
        type: "button",
        class: "bank-claim-button",
        disabled: !!e.writeDisabledReason,
        title: e.writeDisabledReason,
        onClick: n[0] || (n[0] = (a) => t.$emit("settle"))
      }, [n[10] || (n[10] = r("span", null, "领取全部到期资产", -1)), r("small", null, b(e.claimableCount) + " 笔一并结算", 1)], 8, Ef)) : F("", !0),
      r("div", Mf, [
        r("button", {
          type: "button",
          onClick: n[1] || (n[1] = (a) => t.$emit("navigate", "deposits"))
        }, [
          n[11] || (n[11] = r("span", { class: "bank-portal-mark" }, "定", -1)),
          n[12] || (n[12] = r("strong", null, "定期存单", -1)),
          r("small", null, b(e.depositCount) + " 笔持有", 1),
          n[13] || (n[13] = r("i", null, "›", -1))
        ]),
        r("button", {
          type: "button",
          onClick: n[2] || (n[2] = (a) => t.$emit("navigate", "funds"))
        }, [
          n[14] || (n[14] = r("span", { class: "bank-portal-mark" }, "理", -1)),
          n[15] || (n[15] = r("strong", null, "浮动理财", -1)),
          r("small", null, b(e.fundCount) + " 笔持有", 1),
          n[16] || (n[16] = r("i", null, "›", -1))
        ]),
        r("button", {
          type: "button",
          onClick: n[3] || (n[3] = (a) => t.$emit("navigate", "records"))
        }, [...n[17] || (n[17] = [
          r("span", { class: "bank-portal-mark" }, "簿", -1),
          r("strong", null, "金融记录", -1),
          r("small", null, "查阅历史兑付", -1),
          r("i", null, "›", -1)
        ])])
      ])
    ]));
  }
}), Pf = If, Of = { class: "bank-app" }, Lf = { class: "bank-header" }, Df = { class: "bank-header-balance" }, Nf = ["disabled"], Rf = {
  class: "bank-navigation",
  "aria-label": "银行页面"
}, Bf = { key: 0 }, qf = ["disabled"], Uf = ["disabled"], Ff = { class: "bank-scroll" }, $n = 35e3, Hf = /* @__PURE__ */ ue({
  __name: "BankApp",
  props: {
    bridge: {},
    initialState: {}
  },
  setup(e) {
    const t = e, n = /* @__PURE__ */ Y(structuredClone(/* @__PURE__ */ te(t.initialState))), a = /* @__PURE__ */ Y("vault"), s = /* @__PURE__ */ Y(null), i = /* @__PURE__ */ Y(!1), l = /* @__PURE__ */ Y(!1), o = /* @__PURE__ */ Y(!1), u = /* @__PURE__ */ Y(""), v = /* @__PURE__ */ Y(""), d = /* @__PURE__ */ Y("");
    let g = null, $ = () => {
    }, x = 0;
    const D = ee(() => n.value.status === "unconfirmed"), P = ee(() => l.value ? "正在处理上一项银行操作" : i.value ? "正在刷新金库状态" : n.value.status !== "ready" ? n.value.message || "金库暂时不可写入" : n.value.generationActive ? "主剧情正在生成，请等待回复完成" : ""), X = ee(() => i.value || l.value || D.value);
    function G() {
      return typeof globalThis.crypto?.randomUUID == "function" ? `bank-ui:${globalThis.crypto.randomUUID()}` : `bank-ui:${Date.now()}:${Math.random().toString(36).slice(2, 10)}`;
    }
    function V() {
      return { chatIdentity: n.value.chatIdentity };
    }
    function z(J) {
      n.value = structuredClone(J), i.value = !1, o.value = !1, u.value = "", d.value = "", J.claimableCount === 0 && (g = null);
    }
    function R(J) {
      const N = J instanceof Error ? J.message : String(J);
      return N.includes("economy_insufficient_funds") || N.includes("cannot be overdrawn") ? "可用小白币不足，开户未完成。" : N.includes("bank_amount_out_of_range") ? "开户金额不在该产品允许范围内。" : N.includes("bank_amount_invalid") ? "开户金额必须是正整数。" : N.includes("bank_revision_conflict") || N.includes("bank_event_id_conflict") ? "金库状态已变化，请关闭确认框并刷新后重试。" : N.includes("bank_position_missing") || N.includes("bank_position_state_changed") ? "该头寸状态已经变化，请刷新金库。" : N.includes("bank_no_due_positions") ? "当前没有可领取的到期头寸。" : N === "host_request_timeout" ? "等待保存结果超时，请保留当前页面并重试。" : "银行操作未完成，请稍后重试。";
    }
    async function C() {
      if (X.value) return;
      const J = ++x;
      i.value = !0, u.value = "";
      try {
        const N = await t.bridge.request("bank/refresh", V(), $n);
        J === x && z(N.result);
      } catch (N) {
        J === x && (u.value = R(N));
      } finally {
        J === x && (i.value = !1);
      }
    }
    async function E() {
      if (i.value || l.value) return;
      const J = ++x;
      i.value = !0, u.value = "";
      try {
        const N = await t.bridge.request("bank/confirm-save", V(), $n);
        J === x && z(N.result.state);
      } catch (N) {
        J === x && (u.value = R(N));
      } finally {
        J === x && (i.value = !1);
      }
    }
    function k(J, N) {
      P.value || (v.value = "", s.value = {
        mode: N,
        product: J,
        actionId: G()
      });
    }
    function w(J) {
      P.value || (v.value = "", s.value = {
        mode: "withdraw",
        position: J,
        actionId: G()
      });
    }
    function S() {
      l.value || (s.value = null, v.value = "");
    }
    async function H(J) {
      const N = s.value;
      if (!N || l.value) return;
      const le = x;
      l.value = !0, v.value = "";
      const xe = N.mode === "deposit-open" ? "bank/deposit/open" : N.mode === "fund-open" ? "bank/fund/open" : "bank/deposit/withdraw";
      try {
        const de = await t.bridge.request(xe, {
          ...V(),
          expectedRevision: n.value.revision,
          expectedEventId: n.value.eventId,
          actionId: N.actionId,
          ...N.product ? {
            productId: N.product.id,
            amount: J
          } : {},
          ...N.position ? { positionId: N.position.id } : {}
        }, $n);
        if (le !== x || s.value !== N) return;
        z(de.result), s.value = null;
      } catch (de) {
        le === x && s.value === N && (v.value = R(de));
      } finally {
        le === x && (l.value = !1);
      }
    }
    async function se() {
      if (P.value || n.value.claimableCount === 0) return;
      const J = x;
      g ||= G();
      const N = g;
      l.value = !0, u.value = "";
      try {
        const le = await t.bridge.request("bank/settle-due", {
          ...V(),
          expectedRevision: n.value.revision,
          expectedEventId: n.value.eventId,
          actionId: N
        }, $n);
        if (J !== x) return;
        g = null, z(le.result);
      } catch (le) {
        J === x && (u.value = R(le));
      } finally {
        J === x && (l.value = !1);
      }
    }
    async function K() {
      if (!n.value.activityPage.hasMore || o.value || l.value) return;
      const J = x, N = n.value.activities.length;
      o.value = !0, d.value = "";
      try {
        const le = await t.bridge.request("bank/records/load-more", {
          ...V(),
          offset: N
        }, $n);
        if (J !== x) return;
        const xe = new Set(n.value.activities.map((de) => de.id));
        n.value.activities.push(...le.result.activities.filter((de) => !xe.has(de.id))), n.value.activityPage = le.result.activityPage;
      } catch (le) {
        J === x && (d.value = R(le));
      } finally {
        J === x && (o.value = !1);
      }
    }
    return ft(() => {
      $ = t.bridge.subscribe((J) => {
        J.type === "bank/state" && (l.value || (x += 1), z(J.payload.state)), J.type === "bank/error" && (u.value = R(J.payload?.message || ""));
      });
    }), vt(() => {
      x += 1, $(), s.value = null, g = null;
    }), (J, N) => (m(), y("main", Of, [
      r("header", Lf, [
        N[10] || (N[10] = r("div", null, [r("span", { class: "bank-header-kicker" }, "JADE RESERVE · 01"), r("h1", null, "白银金库")], -1)),
        r("div", Df, [N[8] || (N[8] = r("small", null, "可用余额", -1)), r("strong", null, "¤ " + b(n.value.balance.toLocaleString("zh-CN")), 1)]),
        r("button", {
          type: "button",
          class: "bank-refresh",
          disabled: X.value,
          title: "重新读取金库",
          onClick: C
        }, [...N[9] || (N[9] = [r("svg", {
          viewBox: "0 0 24 24",
          "aria-hidden": "true"
        }, [r("path", { d: "M20 7v5h-5M4 17v-5h5M18.2 9A7 7 0 0 0 6.1 6.7L4 9m16 6-2.1 2.3A7 7 0 0 1 5.8 15" })], -1), r("span", { class: "bank-sr-only" }, "重新读取金库", -1)])], 8, Nf)
      ]),
      r("nav", Rf, [
        r("button", {
          type: "button",
          class: oe({ "is-active": a.value === "vault" }),
          onClick: N[0] || (N[0] = (le) => a.value = "vault")
        }, [...N[11] || (N[11] = [r("span", null, "总览", -1)])], 2),
        r("button", {
          type: "button",
          class: oe({ "is-active": a.value === "deposits" }),
          onClick: N[1] || (N[1] = (le) => a.value = "deposits")
        }, [...N[12] || (N[12] = [r("span", null, "定期", -1)])], 2),
        r("button", {
          type: "button",
          class: oe({ "is-active": a.value === "funds" }),
          onClick: N[2] || (N[2] = (le) => a.value = "funds")
        }, [...N[13] || (N[13] = [r("span", null, "理财", -1)])], 2),
        r("button", {
          type: "button",
          class: oe({ "is-active": a.value === "positions" }),
          onClick: N[3] || (N[3] = (le) => a.value = "positions")
        }, [N[14] || (N[14] = r("span", null, "头寸", -1)), n.value.claimableCount ? (m(), y("i", Bf, b(n.value.claimableCount), 1)) : F("", !0)], 2),
        r("button", {
          type: "button",
          class: oe({ "is-active": a.value === "records" }),
          onClick: N[4] || (N[4] = (le) => a.value = "records")
        }, [...N[15] || (N[15] = [r("span", null, "记录", -1)])], 2)
      ]),
      n.value.message || u.value ? (m(), y("aside", {
        key: 0,
        class: oe(["bank-notice", `is-${n.value.status}`]),
        role: "status"
      }, [N[16] || (N[16] = r("span", { "aria-hidden": "true" }, "鉴", -1)), r("div", null, [
        r("strong", null, b(u.value && n.value.status === "ready" ? "操作未完成" : n.value.statusLabel), 1),
        r("p", null, b(u.value || n.value.message), 1),
        D.value ? (m(), y("button", {
          key: 0,
          type: "button",
          disabled: i.value,
          onClick: E
        }, b(i.value ? "正在核实…" : "核实保存结果"), 9, qf)) : n.value.status === "blocked" || n.value.status === "conflict" ? (m(), y("button", {
          key: 1,
          type: "button",
          disabled: i.value,
          onClick: C
        }, b(i.value ? "正在读取…" : "重新读取金库"), 9, Uf)) : F("", !0)
      ])], 2)) : F("", !0),
      r("div", Ff, [a.value === "vault" ? (m(), ye(Pf, {
        key: 0,
        balance: n.value.balance,
        "locked-amount": n.value.lockedAmount,
        "current-turn": n.value.currentTurn,
        "deposit-count": n.value.deposits.length,
        "fund-count": n.value.investments.length,
        "claimable-count": n.value.claimableCount,
        "write-disabled-reason": P.value,
        onNavigate: N[5] || (N[5] = (le) => a.value = le),
        onSettle: se
      }, null, 8, [
        "balance",
        "locked-amount",
        "current-turn",
        "deposit-count",
        "fund-count",
        "claimable-count",
        "write-disabled-reason"
      ])) : a.value === "deposits" ? (m(), ye(Hc, {
        key: 1,
        products: n.value.products.deposits,
        balance: n.value.balance,
        "write-disabled-reason": P.value,
        onOpen: N[6] || (N[6] = (le) => k(le, "deposit-open"))
      }, null, 8, [
        "products",
        "balance",
        "write-disabled-reason"
      ])) : a.value === "funds" ? (m(), ye(Xc, {
        key: 2,
        products: n.value.products.funds,
        balance: n.value.balance,
        "write-disabled-reason": P.value,
        onOpen: N[7] || (N[7] = (le) => k(le, "fund-open"))
      }, null, 8, [
        "products",
        "balance",
        "write-disabled-reason"
      ])) : a.value === "positions" ? (m(), ye(vf, {
        key: 3,
        deposits: n.value.deposits,
        investments: n.value.investments,
        "claimable-count": n.value.claimableCount,
        "write-disabled-reason": P.value,
        onWithdraw: w,
        onSettle: se
      }, null, 8, [
        "deposits",
        "investments",
        "claimable-count",
        "write-disabled-reason"
      ])) : (m(), ye(_f, {
        key: 4,
        activities: n.value.activities,
        total: n.value.activityPage.total,
        "has-more": n.value.activityPage.hasMore,
        "loading-more": o.value,
        error: d.value,
        onLoadMore: K
      }, null, 8, [
        "activities",
        "total",
        "has-more",
        "loading-more",
        "error"
      ]))]),
      s.value ? (m(), ye(Lc, {
        key: 1,
        mode: s.value.mode,
        product: s.value.product,
        position: s.value.position,
        balance: n.value.balance,
        busy: l.value,
        error: v.value,
        onCancel: S,
        onConfirm: H
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
}), jf = Hf, Kf = Object.freeze({
  id: "game",
  name: "游戏",
  accent: "#c8a35a"
}), Vf = { class: "game-dialog-card" }, Gf = {
  key: 0,
  class: "game-inline-error",
  role: "status"
}, zf = { class: "game-dialog-actions" }, Wf = ["disabled"], Jf = ["disabled"], Xf = /* @__PURE__ */ ue({
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
    return (t, n) => (m(), y("dialog", {
      open: "",
      class: "game-dialog",
      onCancel: n[2] || (n[2] = wt((a) => t.$emit("cancel"), ["prevent"]))
    }, [r("section", Vf, [
      n[3] || (n[3] = r("span", { class: "game-eyebrow" }, "FINAL CALL", -1)),
      r("h2", null, b(e.heading), 1),
      r("p", null, b(e.summary), 1),
      e.error ? (m(), y("p", Gf, b(e.error), 1)) : F("", !0),
      r("div", zf, [r("button", {
        type: "button",
        disabled: e.busy,
        onClick: n[0] || (n[0] = (a) => t.$emit("cancel"))
      }, "再想想", 8, Wf), r("button", {
        type: "button",
        class: oe(["is-primary", { "is-danger": e.danger }]),
        disabled: e.busy,
        onClick: n[1] || (n[1] = (a) => t.$emit("confirm"))
      }, b(e.busy ? "正在落账…" : e.confirmLabel), 11, Jf)])
    ])], 32));
  }
}), Yf = Xf, Qf = {
  class: "game-table game-dice-table",
  "aria-labelledby": "game-dice-title"
}, Zf = { class: "game-table-heading" }, ev = { class: "game-dice-cloth" }, tv = { class: "game-dealer-position" }, nv = {
  key: 0,
  class: "game-current-bid"
}, av = {
  key: 1,
  class: "game-current-bid is-empty"
}, sv = { class: "game-player-hand" }, iv = { class: "game-dice-row" }, rv = { class: "game-dice-controls" }, lv = {
  key: 0,
  class: "game-bid-picker"
}, ov = ["disabled"], uv = ["value"], dv = ["disabled", "title"], cv = ["disabled", "title"], fv = {
  key: 0,
  class: "game-bid-history",
  "aria-label": "公开叫牌记录"
}, vv = /* @__PURE__ */ ue({
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
    function s(v) {
      return `${v.count}:${v.face}`;
    }
    const i = /* @__PURE__ */ Y(s(n.game.legalBids[0] || {
      count: 1,
      face: 2
    })), l = ee(() => n.game.legalBids.find((v) => s(v) === i.value) || null), o = ee(() => n.game.bids.at(-1) || null);
    zt(() => n.game.legalBids.map(s).join("|"), () => {
      !l.value && n.game.legalBids[0] && (i.value = s(n.game.legalBids[0]));
    });
    function u() {
      l.value && !n.writeDisabledReason && a("bid", {
        count: l.value.count,
        face: l.value.face
      });
    }
    return (v, d) => (m(), y("section", Qf, [
      r("header", Zf, [
        r("button", {
          type: "button",
          class: "game-back",
          onClick: d[0] || (d[0] = (g) => a("lobby"))
        }, "返回大厅"),
        d[3] || (d[3] = r("div", null, [r("span", null, "LIAR'S DICE"), r("h2", { id: "game-dice-title" }, "秘骰对决")], -1)),
        r("strong", null, "托管 ¤ " + b(e.game.bet), 1)
      ]),
      r("div", ev, [
        r("div", tv, [d[4] || (d[4] = r("span", {
          class: "game-dealer-chip",
          "aria-hidden": "true"
        }, "庄", -1)), r("p", null, b(o.value?.by === "dealer" ? "庄家已经加叫，轮到你决断。" : "庄家静候你的第一口价。"), 1)]),
        o.value ? (m(), y("div", nv, [
          d[5] || (d[5] = r("small", null, "桌面叫数", -1)),
          r("strong", null, b(o.value.count), 1),
          r("span", null, "枚 " + b(o.value.face) + " 点", 1),
          r("em", null, b(o.value.by === "dealer" ? "庄家" : "你") + "叫牌", 1)
        ])) : (m(), y("div", av, [...d[6] || (d[6] = [r("span", null, "等待首轮叫牌", -1)])])),
        r("div", sv, [
          d[7] || (d[7] = r("span", null, "你的骰子", -1)),
          r("div", iv, [(m(!0), y(ae, null, ke(e.game.playerDice, (g, $) => (m(), y("b", {
            key: $,
            class: "game-die"
          }, b(g), 1))), 128))]),
          d[8] || (d[8] = r("small", null, "一点可代替任意叫面", -1))
        ])
      ]),
      r("div", rv, [
        e.game.legalActions.includes("bid") ? (m(), y("label", lv, [d[9] || (d[9] = r("span", null, "下一口合法叫数", -1)), Ee(r("select", {
          "onUpdate:modelValue": d[1] || (d[1] = (g) => i.value = g),
          disabled: !!e.writeDisabledReason
        }, [(m(!0), y(ae, null, ke(e.game.legalBids, (g) => (m(), y("option", {
          key: s(g),
          value: s(g)
        }, b(g.count) + " 枚 " + b(g.face) + " 点 ", 9, uv))), 128))], 8, ov), [[Lu, i.value]])])) : F("", !0),
        e.game.legalActions.includes("bid") ? (m(), y("button", {
          key: 1,
          type: "button",
          class: "game-primary-action",
          disabled: !!e.writeDisabledReason || !l.value,
          title: e.writeDisabledReason,
          onClick: u
        }, " 加叫 ", 8, dv)) : F("", !0),
        e.game.legalActions.includes("challenge") ? (m(), y("button", {
          key: 2,
          type: "button",
          class: "game-danger-action",
          disabled: !!e.writeDisabledReason,
          title: e.writeDisabledReason,
          onClick: d[2] || (d[2] = (g) => a("challenge"))
        }, " 质疑 ", 8, cv)) : F("", !0)
      ]),
      e.game.bids.length ? (m(), y("ol", fv, [(m(!0), y(ae, null, ke(e.game.bids, (g, $) => (m(), y("li", { key: `${$}:${g.count}:${g.face}` }, [r("span", null, b(g.by === "player" ? "你" : "庄家"), 1), r("strong", null, b(g.count) + " × " + b(g.face) + " 点", 1)]))), 128))])) : F("", !0)
    ]));
  }
}), pv = vv, gv = {
  class: "game-table game-ladder-table",
  "aria-labelledby": "game-ladder-title"
}, mv = { class: "game-table-heading" }, bv = { class: "game-ladder-stage" }, hv = {
  class: "game-ladder-track",
  "aria-label": "五层挑战进度"
}, yv = { key: 0 }, kv = { key: 1 }, Sv = { class: "game-ladder-purse" }, xv = {
  key: 0,
  class: "game-ladder-choices"
}, wv = [
  "disabled",
  "title",
  "onClick"
], _v = ["disabled", "title"], Cv = /* @__PURE__ */ ue({
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
    function s(i) {
      return `${i / 100}%`;
    }
    return (i, l) => (m(), y("section", gv, [
      r("header", mv, [
        r("button", {
          type: "button",
          class: "game-back",
          onClick: l[0] || (l[0] = (o) => n("lobby"))
        }, "返回大厅"),
        l[2] || (l[2] = r("div", null, [r("span", null, "THE GILDED ASCENT"), r("h2", { id: "game-ladder-title" }, "鎏金阶梯")], -1)),
        r("strong", null, "托管 ¤ " + b(e.game.bet), 1)
      ]),
      r("div", bv, [r("div", hv, [(m(), y(ae, null, ke(5, (o) => r("div", {
        key: o,
        class: oe(["game-ladder-floor", {
          "is-complete": o <= e.game.completedFloors,
          "is-next": o === e.game.completedFloors + 1
        }])
      }, [r("span", null, b(o), 1), e.game.steps[o - 1] ? (m(), y("small", yv, "¤ " + b(e.game.steps[o - 1]?.amountAfterSuccess), 1)) : (m(), y("small", kv, "第 " + b(o) + " 层", 1))], 2)), 64))]), r("div", Sv, [
        r("span", null, b(e.game.canCashOut ? "当前可收手" : "风险起点"), 1),
        r("strong", null, "¤ " + b(e.game.cashoutAmount), 1),
        r("small", null, "已完成 " + b(e.game.completedFloors) + " / 5 层", 1)
      ])]),
      e.game.legalActions.includes("step") ? (m(), y("div", xv, [(m(!0), y(ae, null, ke(e.game.nextChoices, (o) => (m(), y("button", {
        key: o.choice,
        type: "button",
        class: oe(`is-${o.choice}`),
        disabled: !!e.writeDisabledReason,
        title: e.writeDisabledReason,
        onClick: (u) => n("step", o.choice)
      }, [
        r("span", null, b(ln(a)[o.choice].name), 1),
        r("small", null, b(ln(a)[o.choice].note), 1),
        r("strong", null, b(s(o.successProbabilityBps)), 1),
        r("em", null, "成功得 ¤ " + b(o.successAmount), 1)
      ], 10, wv))), 128))])) : F("", !0),
      e.game.legalActions.includes("cash-out") ? (m(), y("button", {
        key: 1,
        type: "button",
        class: "game-ladder-cashout",
        disabled: !!e.writeDisabledReason,
        title: e.writeDisabledReason,
        onClick: l[1] || (l[1] = (o) => n("cashOut"))
      }, " 收手并领取 ¤ " + b(e.game.cashoutAmount), 9, _v)) : F("", !0)
    ]));
  }
}), $v = Cv, Tv = {
  class: "game-lobby",
  "aria-labelledby": "game-lobby-title"
}, Av = {
  key: 0,
  class: "game-continue-card"
}, Ev = {
  key: 1,
  class: "game-grid"
}, Mv = { class: "game-card is-dice" }, Iv = { class: "game-bet-field" }, Pv = ["disabled", "title"], Ov = {
  key: 0,
  class: "game-card-reason"
}, Lv = { class: "game-card is-push" }, Dv = ["disabled", "title"], Nv = {
  key: 0,
  class: "game-card-reason"
}, Rv = { class: "game-card is-ladder" }, Bv = { class: "game-bet-field" }, qv = ["disabled", "title"], Uv = {
  key: 0,
  class: "game-card-reason"
}, Fv = /* @__PURE__ */ ue({
  __name: "GameLobby",
  props: {
    activeGame: {},
    balance: {},
    lockedAmount: {},
    writeDisabledReason: {}
  },
  emits: ["start", "continue"],
  setup(e, { emit: t }) {
    const n = e, a = t, s = /* @__PURE__ */ Y(50), i = /* @__PURE__ */ Y(30), l = ee(() => n.activeGame?.kind === "dice" ? "秘骰对决" : n.activeGame?.kind === "push" ? "翻倍或收手" : n.activeGame?.kind === "ladder" ? "鎏金阶梯" : "");
    function o() {
      return n.writeDisabledReason ? n.writeDisabledReason : !Number.isSafeInteger(s.value) || s.value < 50 || s.value > 500 || s.value % 10 !== 0 ? "下注须为 50 至 500，且为 10 的倍数" : n.balance < s.value ? "余额不足" : "";
    }
    function u() {
      return n.writeDisabledReason ? n.writeDisabledReason : n.balance < 50 ? "余额不足" : "";
    }
    function v() {
      return n.writeDisabledReason ? n.writeDisabledReason : !Number.isSafeInteger(i.value) || i.value < 30 || i.value > 800 || i.value % 10 !== 0 ? "下注须为 30 至 800，且为 10 的倍数" : n.balance < i.value ? "余额不足" : "";
    }
    return (d, g) => (m(), y("section", Tv, [g[17] || (g[17] = r("div", { class: "game-lobby-hero" }, [
      r("span", { class: "game-eyebrow" }, "THE GILDED PARLOUR"),
      r("h2", { id: "game-lobby-title" }, "今夜，押注你的判断"),
      r("p", null, "三张独立牌桌，只认明确选择。每一步都会先落账，再揭晓。")
    ], -1)), e.activeGame ? (m(), y("article", Av, [
      g[7] || (g[7] = r("div", {
        class: "game-continue-seal",
        "aria-hidden": "true"
      }, "续", -1)),
      r("div", null, [
        g[6] || (g[6] = r("span", null, "牌桌仍在等候", -1)),
        r("h3", null, b(l.value), 1),
        r("p", null, "已有 ¤ " + b(e.lockedAmount) + " 托管在本局，离开页面不会结束赌局。", 1)
      ]),
      r("button", {
        type: "button",
        onClick: g[0] || (g[0] = ($) => a("continue", e.activeGame.kind))
      }, "继续本局")
    ])) : (m(), y("div", Ev, [
      r("article", Mv, [
        g[9] || (g[9] = r("div", {
          class: "game-glyph",
          "aria-hidden": "true"
        }, [r("span", null, "⚄"), r("span", null, "⚂")], -1)),
        g[10] || (g[10] = r("div", { class: "game-copy" }, [
          r("span", { class: "game-card-index" }, "TABLE 01"),
          r("h3", null, "秘骰对决"),
          r("p", null, "五骰藏锋，一点为百搭。抬高叫数，或当场质疑庄家。"),
          r("ul", null, [r("li", null, "下注 50–500"), r("li", null, "胜出返还 1.9 倍")])
        ], -1)),
        r("label", Iv, [g[8] || (g[8] = r("span", null, "下注", -1)), Ee(r("input", {
          "onUpdate:modelValue": g[1] || (g[1] = ($) => s.value = $),
          type: "number",
          min: "50",
          max: "500",
          step: "10"
        }, null, 512), [[
          We,
          s.value,
          void 0,
          { number: !0 }
        ]])]),
        r("button", {
          type: "button",
          class: "game-table-button",
          disabled: !!o(),
          title: o(),
          onClick: g[2] || (g[2] = ($) => a("start", "dice", s.value))
        }, " 入席 ", 8, Pv),
        o() ? (m(), y("small", Ov, b(o()), 1)) : F("", !0)
      ]),
      r("article", Lv, [
        g[11] || (g[11] = r("div", {
          class: "game-glyph is-coin",
          "aria-hidden": "true"
        }, "¤", -1)),
        g[12] || (g[12] = r("div", { class: "game-copy" }, [
          r("span", { class: "game-card-index" }, "TABLE 02"),
          r("h3", null, "翻倍或收手"),
          r("p", null, "十张暗牌藏着七枚金币与三枚炸弹。每次翻牌都更接近答案。"),
          r("ul", null, [r("li", null, "固定下注 50"), r("li", null, "每枚金币价值 50")])
        ], -1)),
        g[13] || (g[13] = r("div", { class: "game-fixed-bet" }, [r("span", null, "入场"), r("strong", null, "¤ 50")], -1)),
        r("button", {
          type: "button",
          class: "game-table-button",
          disabled: !!u(),
          title: u(),
          onClick: g[3] || (g[3] = ($) => a("start", "push", 50))
        }, " 揭牌 ", 8, Dv),
        u() ? (m(), y("small", Nv, b(u()), 1)) : F("", !0)
      ]),
      r("article", Rv, [
        g[15] || (g[15] = r("div", {
          class: "game-glyph is-ladder-mark",
          "aria-hidden": "true"
        }, "Ⅴ", -1)),
        g[16] || (g[16] = r("div", { class: "game-copy" }, [
          r("span", { class: "game-card-index" }, "TABLE 03"),
          r("h3", null, "鎏金阶梯"),
          r("p", null, "五层风险逐级累积。每层选择稳、中、险，成功后可随时收手。"),
          r("ul", null, [r("li", null, "下注 30–800"), r("li", null, "最高返还 50,000")])
        ], -1)),
        r("label", Bv, [g[14] || (g[14] = r("span", null, "下注", -1)), Ee(r("input", {
          "onUpdate:modelValue": g[4] || (g[4] = ($) => i.value = $),
          type: "number",
          min: "30",
          max: "800",
          step: "10"
        }, null, 512), [[
          We,
          i.value,
          void 0,
          { number: !0 }
        ]])]),
        r("button", {
          type: "button",
          class: "game-table-button",
          disabled: !!v(),
          title: v(),
          onClick: g[5] || (g[5] = ($) => a("start", "ladder", i.value))
        }, " 登阶 ", 8, qv),
        v() ? (m(), y("small", Uv, b(v()), 1)) : F("", !0)
      ])
    ]))]));
  }
}), Hv = Fv, jv = {
  class: "game-table game-push-table",
  "aria-labelledby": "game-push-title"
}, Kv = { class: "game-table-heading" }, Vv = { class: "game-push-stage" }, Gv = {
  class: "game-coin-stack",
  "aria-label": "已翻出的金币"
}, zv = {
  key: 0,
  class: "game-empty-stack"
}, Wv = {
  class: "game-card-fan",
  "aria-hidden": "true"
}, Jv = { class: "game-push-metrics" }, Xv = { class: "game-actions" }, Yv = ["disabled", "title"], Qv = ["disabled", "title"], Zv = /* @__PURE__ */ ue({
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
    function a(s) {
      return `${(s / 100).toFixed(s % 100 === 0 ? 0 : 2)}%`;
    }
    return (s, i) => (m(), y("section", jv, [
      r("header", Kv, [
        r("button", {
          type: "button",
          class: "game-back",
          onClick: i[0] || (i[0] = (l) => n("lobby"))
        }, "返回大厅"),
        i[3] || (i[3] = r("div", null, [r("span", null, "DOUBLE OR HOLD"), r("h2", { id: "game-push-title" }, "翻倍或收手")], -1)),
        r("strong", null, "托管 ¤ " + b(e.game.bet), 1)
      ]),
      r("div", Vv, [r("div", Gv, [e.game.revealedCoins === 0 ? (m(), y("span", zv, "尚未揭牌")) : F("", !0), (m(!0), y(ae, null, ke(e.game.revealedCoins, (l) => (m(), y("b", {
        key: l,
        class: "game-revealed-coin"
      }, "¤"))), 128))]), r("div", Wv, [(m(!0), y(ae, null, ke(e.game.remainingCards, (l) => (m(), y("i", {
        key: l,
        style: vn({ "--card": l })
      }, null, 4))), 128))])]),
      r("div", Jv, [
        r("div", null, [i[4] || (i[4] = r("span", null, "可收手", -1)), r("strong", null, "¤ " + b(e.game.cashoutAmount), 1)]),
        r("div", null, [i[5] || (i[5] = r("span", null, "余牌", -1)), r("strong", null, b(e.game.remainingCards), 1)]),
        r("div", null, [i[6] || (i[6] = r("span", null, "余雷", -1)), r("strong", null, b(e.game.remainingBombs), 1)]),
        r("div", null, [i[7] || (i[7] = r("span", null, "下一张风险", -1)), r("strong", null, b(a(e.game.nextBombProbabilityBps)), 1)])
      ]),
      i[8] || (i[8] = r("p", { class: "game-rule-note" }, "每枚金币增加 ¤ 50；翻到炸弹立即以零返还结束。", -1)),
      r("div", Xv, [e.game.legalActions.includes("draw") ? (m(), y("button", {
        key: 0,
        type: "button",
        class: "game-primary-action",
        disabled: !!e.writeDisabledReason,
        title: e.writeDisabledReason,
        onClick: i[1] || (i[1] = (l) => n("draw"))
      }, " 再翻一张 ", 8, Yv)) : F("", !0), e.game.legalActions.includes("cash-out") ? (m(), y("button", {
        key: 1,
        type: "button",
        class: "game-secondary-action",
        disabled: !!e.writeDisabledReason,
        title: e.writeDisabledReason,
        onClick: i[2] || (i[2] = (l) => n("cashOut"))
      }, " 收手入账 ", 8, Qv)) : F("", !0)])
    ]));
  }
}), ep = Zv, tp = {
  class: "game-records",
  "aria-labelledby": "game-records-title"
}, np = { class: "game-section-heading" }, ap = {
  key: 0,
  class: "game-record-list"
}, sp = {
  class: "game-record-mark",
  "aria-hidden": "true"
}, ip = { class: "game-record-main" }, rp = ["datetime"], lp = { class: "game-record-money" }, op = {
  key: 0,
  class: "game-record-detail"
}, up = {
  key: 1,
  class: "game-record-detail"
}, dp = {
  key: 2,
  class: "game-record-steps"
}, cp = {
  key: 1,
  class: "game-record-empty"
}, fp = {
  key: 2,
  class: "game-inline-error",
  role: "status"
}, vp = ["disabled"], pp = /* @__PURE__ */ ue({
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
    return (a, s) => (m(), y("section", tp, [
      r("header", np, [s[1] || (s[1] = r("div", null, [r("span", null, "HOUSE LEDGER"), r("h2", { id: "game-records-title" }, "牌桌记录")], -1)), r("small", null, b(e.total) + " 局", 1)]),
      e.records.length ? (m(), y("div", ap, [(m(!0), y(ae, null, ke(e.records, (i) => (m(), y("article", {
        key: i.id,
        class: oe(["game-record", `is-${i.outcomeTone}`])
      }, [r("div", sp, b(i.game === "dice" ? "骰" : i.game === "push" ? "翻" : "阶"), 1), r("div", ip, [
        r("header", null, [r("div", null, [r("span", null, b(i.gameLabel), 1), r("strong", null, b(i.outcomeLabel), 1)]), r("time", { datetime: new Date(i.createdAt).toISOString() }, b(n(i.createdAt)), 9, rp)]),
        r("div", lp, [
          r("span", null, "下注 ¤ " + b(i.amountIn), 1),
          r("span", null, "返还 ¤ " + b(i.payout), 1),
          r("strong", null, b(i.net > 0 ? "+" : "") + b(i.net), 1)
        ]),
        r("details", null, [s[2] || (s[2] = r("summary", null, "查看公开牌局", -1)), i.detail.kind === "dice" ? (m(), y("div", op, [
          r("p", null, "终局叫数：" + b(i.detail.finalBid.count) + " 枚 " + b(i.detail.finalBid.face) + " 点", 1),
          r("p", null, "实际匹配：" + b(i.detail.matchingDiceCount) + " 枚 · " + b(i.detail.challenger === "player" ? "玩家" : "庄家") + "质疑", 1),
          r("p", null, "你的骰子：" + b(i.detail.playerDice.join(" · ")), 1)
        ])) : i.detail.kind === "push" ? (m(), y("div", up, [r("p", null, "共翻出 " + b(i.detail.revealedCoins) + " 枚金币", 1)])) : (m(), y("ol", dp, [(m(!0), y(ae, null, ke(i.detail.steps, (l) => (m(), y("li", { key: l.floor }, " 第 " + b(l.floor) + " 层 · " + b(ln(t)[l.choice]) + " · " + b(l.success ? `成功至 ¤ ${l.amountAfterStep}` : "挑战失败"), 1))), 128))]))])
      ])], 2))), 128))])) : (m(), y("div", cp, [...s[3] || (s[3] = [r("span", { "aria-hidden": "true" }, "◇", -1), r("p", null, "尚无结算记录", -1)])])),
      e.error ? (m(), y("p", fp, b(e.error), 1)) : F("", !0),
      e.hasMore ? (m(), y("button", {
        key: 3,
        type: "button",
        class: "game-load-more",
        disabled: e.loadingMore,
        onClick: s[0] || (s[0] = (i) => a.$emit("loadMore"))
      }, b(e.loadingMore ? "正在翻阅…" : "继续翻阅记录"), 9, vp)) : F("", !0)
    ]));
  }
}), gp = pp, mp = { class: "game-app" }, bp = { class: "game-header" }, hp = { class: "game-funds" }, yp = ["disabled"], kp = {
  class: "game-nav",
  "aria-label": "游戏页面"
}, Sp = ["disabled"], xp = ["disabled"], wp = {
  key: 1,
  class: "game-action-error",
  role: "status"
}, _p = ["disabled"], Cp = { class: "game-scroll" }, la = 35e3, $p = /* @__PURE__ */ ue({
  __name: "GameApp",
  props: {
    bridge: {},
    initialState: {}
  },
  setup(e) {
    const t = e, n = /* @__PURE__ */ Y(structuredClone(/* @__PURE__ */ te(t.initialState))), a = /* @__PURE__ */ Y(n.value.activeGame?.kind || "lobby"), s = /* @__PURE__ */ Y(!1), i = /* @__PURE__ */ Y(!1), l = /* @__PURE__ */ Y(!1), o = /* @__PURE__ */ Y(""), u = /* @__PURE__ */ Y(""), v = /* @__PURE__ */ Y(""), d = /* @__PURE__ */ Y(null), g = /* @__PURE__ */ Y(null), $ = /* @__PURE__ */ Y("");
    let x = () => {
    }, D = 0, P = 0;
    const X = ee(() => n.value.status === "unconfirmed"), G = ee(() => i.value ? "正在处理上一项操作" : s.value ? "正在刷新游戏状态" : n.value.status !== "ready" ? n.value.message || "游戏暂时不可写入" : n.value.generationActive ? "主剧情正在生成，请等待回复完成" : ""), V = ee(() => s.value || i.value || X.value || n.value.status === "conflict"), z = ee(() => n.value.records.find((q) => q.id === $.value) || null);
    function R() {
      return typeof globalThis.crypto?.randomUUID == "function" ? `game-ui:${globalThis.crypto.randomUUID()}` : (P += 1, `game-ui:${Date.now()}:${P}`);
    }
    function C() {
      return { chatIdentity: n.value.chatIdentity };
    }
    function E(q) {
      const O = q instanceof Error ? q.message : String(q);
      return O.includes("cannot be overdrawn") || O.includes("economy_insufficient_funds") ? "小白币余额不足，未能入局。" : O.includes("game_revision_conflict") || O.includes("game_event_id_conflict") ? "牌局已经变化，请重新读取后再操作。" : O.includes("game_dice_bid_not_higher") ? "叫数必须高于桌面当前叫数。" : O.includes("game_action_invalid") ? "当前牌局不接受这项操作。" : O.includes("game_main_generation_active") ? "主剧情正在生成，请等待回复完成。" : O.includes("game_push_cashout_invalid") || O.includes("game_ladder_cashout_invalid") ? "当前还不能收手。" : O.includes("聊天已切换") ? "聊天已切换，请重新打开游戏。" : O === "host_request_timeout" ? "等待落账结果超时；可用同一操作标识安全重试。" : "游戏操作未完成，请稍后重试。";
    }
    function k(q) {
      const O = n.value.activeGame;
      n.value = structuredClone(q), s.value = !1, l.value = !1, o.value = "", v.value = "", O && !q.activeGame ? ($.value = q.records.find((ie) => ie.gameId === O.id)?.id || "", a.value = "lobby") : q.activeGame && a.value !== "records" && a.value !== "lobby" ? a.value = q.activeGame.kind : !q.activeGame && a.value !== "records" && (a.value = "lobby");
    }
    function w(q, O) {
      const ie = {
        ...C(),
        expectedRevision: n.value.revision,
        expectedEventId: n.value.eventId,
        actionId: O
      };
      return q.endpoint === "game/dice/start" || q.endpoint === "game/ladder/start" ? {
        ...ie,
        bet: q.bet
      } : q.endpoint === "game/push/start" ? ie : q.endpoint === "game/dice/bid" ? {
        ...ie,
        gameId: q.gameId,
        bid: {
          count: q.bid.count,
          face: q.bid.face
        }
      } : q.endpoint === "game/ladder/step" ? {
        ...ie,
        gameId: q.gameId,
        choice: q.choice
      } : {
        ...ie,
        gameId: q.gameId
      };
    }
    async function S(q, O = R()) {
      if (G.value) return !1;
      const ie = D;
      i.value = !0, u.value = "", g.value = null;
      try {
        const Te = await t.bridge.request(q.endpoint, w(q, O), la);
        return ie !== D ? !1 : (k(Te.result), Te.result.activeGame && (a.value = Te.result.activeGame.kind), d.value = null, !0);
      } catch (Te) {
        return ie === D && (u.value = E(Te), n.value.status === "unconfirmed" ? (d.value = null, g.value = null) : g.value = {
          request: q,
          actionId: O
        }), !1;
      } finally {
        ie === D && (i.value = !1);
      }
    }
    function H(q, O) {
      if (G.value || n.value.activeGame) return;
      const ie = q === "dice" ? {
        heading: "确认入席秘骰对决",
        summary: `托管 ¤ ${O}，胜出返还下注的 1.9 倍。`,
        confirmLabel: "确认入席"
      } : q === "push" ? {
        heading: "确认揭开第一张牌",
        summary: "托管 ¤ 50。金币可以累积，炸弹会立即结束本局。",
        confirmLabel: "确认揭牌"
      } : {
        heading: "确认踏上鎏金阶梯",
        summary: `托管 ¤ ${O}，首层成功后才可收手。`,
        confirmLabel: "确认登阶"
      };
      d.value = {
        request: q === "dice" ? {
          endpoint: "game/dice/start",
          bet: O
        } : q === "push" ? { endpoint: "game/push/start" } : {
          endpoint: "game/ladder/start",
          bet: O
        },
        actionId: R(),
        ...ie
      }, u.value = "";
    }
    function se() {
      const q = n.value.activeGame;
      q?.kind !== "dice" || !q.legalActions.includes("challenge") || (d.value = {
        request: {
          endpoint: "game/dice/challenge",
          gameId: q.id
        },
        actionId: R(),
        heading: "确定质疑庄家？",
        summary: "双方骰子将立即核验，本局随结果结算。",
        confirmLabel: "提出质疑",
        danger: !0
      }, u.value = "");
    }
    function K(q) {
      const O = n.value.activeGame;
      if (!O || O.kind !== q || !O.legalActions.includes("cash-out")) return;
      const ie = O.cashoutAmount;
      d.value = {
        request: q === "push" ? {
          endpoint: "game/push/cash-out",
          gameId: O.id
        } : {
          endpoint: "game/ladder/cash-out",
          gameId: O.id
        },
        actionId: R(),
        heading: "现在收手？",
        summary: `本局将结束，并返还 ¤ ${ie}。`,
        confirmLabel: "收手入账"
      }, u.value = "";
    }
    async function J() {
      const q = d.value;
      q && await S(q.request, q.actionId);
    }
    function N() {
      i.value || (d.value = null, u.value = "");
    }
    async function le() {
      if (V.value) return;
      const q = ++D;
      s.value = !0, o.value = "";
      try {
        const O = await t.bridge.request("game/refresh", C(), la);
        q === D && k(O.result);
      } catch (O) {
        q === D && (o.value = E(O));
      } finally {
        q === D && (s.value = !1);
      }
    }
    async function xe() {
      if (s.value || i.value) return;
      const q = ++D;
      s.value = !0, o.value = "";
      try {
        const O = await t.bridge.request("game/confirm-save", C(), la);
        q === D && k(O.result.state);
      } catch (O) {
        q === D && (o.value = E(O));
      } finally {
        q === D && (s.value = !1);
      }
    }
    async function de() {
      if (!n.value.hasMore || l.value || i.value) return;
      const q = D;
      l.value = !0, v.value = "";
      try {
        const O = await t.bridge.request("game/records/load-more", {
          ...C(),
          offset: n.value.records.length
        }, la);
        if (q !== D) return;
        const ie = new Set(n.value.records.map((Te) => Te.id));
        n.value.records.push(...O.result.records.filter((Te) => !ie.has(Te.id))), n.value.total = O.result.total, n.value.hasMore = O.result.hasMore;
      } catch (O) {
        q === D && (v.value = E(O));
      } finally {
        q === D && (l.value = !1);
      }
    }
    function ve() {
      const q = g.value;
      q && S(q.request, q.actionId);
    }
    return ft(() => {
      x = t.bridge.subscribe((q) => {
        q.type === "game/state" && (i.value || (D += 1), u.value = "", g.value = null, k(q.payload.state)), q.type === "game/error" && (o.value = "游戏状态暂时无法读取，请重新打开。");
      });
    }), vt(() => {
      D += 1, x(), d.value = null, g.value = null;
    }), (q, O) => (m(), y("main", mp, [
      r("header", bp, [
        O[16] || (O[16] = r("div", { class: "game-brand" }, [r("span", null, "GAME CENTER"), r("h1", null, "游戏")], -1)),
        r("div", hp, [r("span", null, [O[13] || (O[13] = r("small", null, "可用", -1)), r("strong", null, "¤ " + b(n.value.balance), 1)]), r("span", null, [O[14] || (O[14] = r("small", null, "托管", -1)), r("strong", null, "¤ " + b(n.value.lockedAmount), 1)])]),
        r("button", {
          type: "button",
          class: "game-refresh",
          disabled: V.value,
          title: "重新读取游戏",
          onClick: le
        }, [...O[15] || (O[15] = [r("svg", {
          viewBox: "0 0 24 24",
          "aria-hidden": "true"
        }, [r("path", { d: "M20 7v5h-5M4 17v-5h5M18.2 9A7 7 0 0 0 6.1 6.7L4 9m16 6-2.1 2.3A7 7 0 0 1 5.8 15" })], -1), r("span", { class: "game-sr-only" }, "重新读取游戏", -1)])], 8, yp)
      ]),
      r("nav", kp, [
        r("button", {
          type: "button",
          class: oe({ "is-active": a.value === "lobby" }),
          onClick: O[0] || (O[0] = (ie) => a.value = "lobby")
        }, "大厅", 2),
        n.value.activeGame ? (m(), y("button", {
          key: 0,
          type: "button",
          class: oe({ "is-active": a.value === n.value.activeGame.kind }),
          onClick: O[1] || (O[1] = (ie) => a.value = n.value.activeGame?.kind || "lobby")
        }, [...O[17] || (O[17] = [Se(" 当前牌桌", -1), r("i", null, null, -1)])], 2)) : F("", !0),
        r("button", {
          type: "button",
          class: oe({ "is-active": a.value === "records" }),
          onClick: O[2] || (O[2] = (ie) => a.value = "records")
        }, "记录", 2)
      ]),
      n.value.message || o.value ? (m(), y("aside", {
        key: 0,
        class: oe(["game-notice", `is-${n.value.status}`]),
        role: "status"
      }, [O[18] || (O[18] = r("span", { "aria-hidden": "true" }, "!", -1)), r("div", null, [
        r("strong", null, b(n.value.status === "unconfirmed" ? "落账待核实" : n.value.status === "conflict" ? "牌局状态冲突" : "游戏状态"), 1),
        r("p", null, b(o.value || n.value.message), 1),
        X.value ? (m(), y("button", {
          key: 0,
          type: "button",
          disabled: s.value,
          onClick: xe
        }, b(s.value ? "正在核实…" : "核实保存结果"), 9, Sp)) : n.value.status === "blocked" ? (m(), y("button", {
          key: 1,
          type: "button",
          disabled: s.value,
          onClick: le
        }, b(s.value ? "正在读取…" : "重新读取"), 9, xp)) : F("", !0)
      ])], 2)) : F("", !0),
      u.value && !d.value ? (m(), y("aside", wp, [r("span", null, b(u.value), 1), g.value && n.value.status === "ready" ? (m(), y("button", {
        key: 0,
        type: "button",
        disabled: i.value,
        onClick: ve
      }, "重试同一操作", 8, _p)) : F("", !0)])) : F("", !0),
      r("div", Cp, [z.value && a.value === "lobby" ? (m(), y("div", {
        key: 0,
        class: oe(["game-result-banner", `is-${z.value.outcomeTone}`]),
        role: "status"
      }, [
        r("span", null, b(z.value.gameLabel), 1),
        r("strong", null, b(z.value.outcomeLabel), 1),
        r("em", null, b(z.value.net > 0 ? "+" : "") + b(z.value.net) + " 小白币", 1),
        r("button", {
          type: "button",
          onClick: O[3] || (O[3] = (ie) => $.value = "")
        }, "关闭")
      ], 2)) : F("", !0), a.value === "lobby" ? (m(), ye(Hv, {
        key: 1,
        "active-game": n.value.activeGame,
        balance: n.value.balance,
        "locked-amount": n.value.lockedAmount,
        "write-disabled-reason": G.value,
        onStart: H,
        onContinue: O[4] || (O[4] = (ie) => a.value = ie)
      }, null, 8, [
        "active-game",
        "balance",
        "locked-amount",
        "write-disabled-reason"
      ])) : a.value === "dice" && n.value.activeGame?.kind === "dice" ? (m(), ye(pv, {
        key: 2,
        game: n.value.activeGame,
        "write-disabled-reason": G.value,
        onBid: O[5] || (O[5] = (ie) => S({
          endpoint: "game/dice/bid",
          gameId: n.value.activeGame?.id || "",
          bid: ie
        })),
        onChallenge: se,
        onLobby: O[6] || (O[6] = (ie) => a.value = "lobby")
      }, null, 8, ["game", "write-disabled-reason"])) : a.value === "push" && n.value.activeGame?.kind === "push" ? (m(), ye(ep, {
        key: 3,
        game: n.value.activeGame,
        "write-disabled-reason": G.value,
        onDraw: O[7] || (O[7] = (ie) => S({
          endpoint: "game/push/draw",
          gameId: n.value.activeGame?.id || ""
        })),
        onCashOut: O[8] || (O[8] = (ie) => K("push")),
        onLobby: O[9] || (O[9] = (ie) => a.value = "lobby")
      }, null, 8, ["game", "write-disabled-reason"])) : a.value === "ladder" && n.value.activeGame?.kind === "ladder" ? (m(), ye($v, {
        key: 4,
        game: n.value.activeGame,
        "write-disabled-reason": G.value,
        onStep: O[10] || (O[10] = (ie) => S({
          endpoint: "game/ladder/step",
          gameId: n.value.activeGame?.id || "",
          choice: ie
        })),
        onCashOut: O[11] || (O[11] = (ie) => K("ladder")),
        onLobby: O[12] || (O[12] = (ie) => a.value = "lobby")
      }, null, 8, ["game", "write-disabled-reason"])) : a.value === "records" ? (m(), ye(gp, {
        key: 5,
        records: n.value.records,
        total: n.value.total,
        "has-more": n.value.hasMore,
        "loading-more": l.value,
        error: v.value,
        onLoadMore: de
      }, null, 8, [
        "records",
        "total",
        "has-more",
        "loading-more",
        "error"
      ])) : F("", !0)]),
      d.value ? (m(), ye(Yf, {
        key: 2,
        heading: d.value.heading,
        summary: d.value.summary,
        "confirm-label": d.value.confirmLabel,
        busy: i.value,
        error: u.value,
        danger: d.value.danger,
        onCancel: N,
        onConfirm: J
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
}), Tp = $p, Ap = Object.freeze({
  id: "fourth-wall",
  name: "四次元壁",
  accent: "#7567d8"
}), Ep = ["src"], Mp = {
  key: 1,
  class: "fourth-wall-avatar is-placeholder",
  "aria-hidden": "true"
}, Ip = { class: "fourth-wall-message-stack" }, Pp = {
  key: 0,
  class: "fourth-wall-thinking"
}, Op = { class: "fourth-wall-bubble" }, Lp = {
  key: 0,
  class: "fourth-wall-message-text"
}, Dp = {
  key: 1,
  class: "fourth-wall-image-card"
}, Np = ["src", "alt"], Rp = ["onClick"], Bp = { key: 2 }, qp = { key: 3 }, Up = ["onClick"], Fp = { "aria-hidden": "true" }, Hp = { key: 0 }, jp = { class: "fourth-wall-message-actions" }, Kp = { key: 1 }, Vp = /* @__PURE__ */ ue({
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
    const n = e, a = t, s = /* @__PURE__ */ Y(!1), i = /* @__PURE__ */ Y(""), l = /* @__PURE__ */ $t({}), o = /* @__PURE__ */ new Set();
    let u = () => {
    };
    function v(C) {
      const E = /\[(?:img|图片)\s*:\s*([^\]]+)\]|\[(?:voice|语音)\s*:([^:\]]*):([^\]]+)\]|\[(?:voice|语音)\s*:\s*([^\]]+)\]/gi, k = [];
      let w = 0, S;
      for (; (S = E.exec(C)) !== null; )
        S.index > w && k.push({
          kind: "text",
          raw: C.slice(w, S.index),
          value: C.slice(w, S.index)
        }), S[1] !== void 0 ? k.push({
          kind: "image",
          raw: S[0],
          value: S[1].trim()
        }) : k.push({
          kind: "voice",
          raw: S[0],
          value: String(S[3] ?? S[4] ?? "").trim(),
          emotion: String(S[2] || "").trim().toLowerCase()
        }), w = E.lastIndex;
      return w < C.length && k.push({
        kind: "text",
        raw: C.slice(w),
        value: C.slice(w)
      }), k.length ? k : [{
        kind: "text",
        raw: C,
        value: C
      }];
    }
    const d = ee(() => v(n.message.content)), g = ee(() => n.message.ts ? new Intl.DateTimeFormat("zh-CN", {
      hour: "2-digit",
      minute: "2-digit"
    }).format(n.message.ts) : "");
    function $(C, E) {
      return `fw-${C}-${Date.now()}-${n.messageIndex}-${E}-${Math.random().toString(36).slice(2, 7)}`;
    }
    function x(C) {
      return C.result;
    }
    function D(C, E) {
      return o.has(E) && l[C]?.requestId === E;
    }
    async function P(C, E) {
      if (l[E]?.status === "loading" || l[E]?.status === "ready") return;
      if (!n.imageAvailable) {
        l[E] = {
          status: "unavailable",
          message: "画图能力未启用"
        };
        return;
      }
      const k = $("image", E);
      o.add(k), l[E] = {
        status: "loading",
        message: "查询图片缓存",
        requestId: k
      };
      const w = {
        chatIdentity: n.chatIdentity,
        sessionId: n.sessionId
      };
      try {
        const S = x(await n.bridge.request("fourth-wall/image-check", {
          ...w,
          tags: C.value,
          mediaRequestId: k
        }, 3e4));
        if (!D(E, k)) return;
        if (!S.available) {
          l[E] = {
            status: "unavailable",
            message: "画图能力未启用",
            requestId: k
          };
          return;
        }
        let H = S.cached || "";
        if (!H) {
          l[E] = {
            status: "loading",
            message: "正在生成图片",
            requestId: k
          };
          const se = x(await n.bridge.request("fourth-wall/image-generate", {
            ...w,
            tags: C.value,
            mediaRequestId: k
          }, 18e4));
          if (!D(E, k)) return;
          H = se.base64;
        }
        l[E] = {
          status: "ready",
          source: /^(?:data:|blob:|https?:)/i.test(H) ? H : `data:image/png;base64,${H}`
        };
      } catch (S) {
        D(E, k) && (l[E] = {
          status: "error",
          message: S instanceof Error ? S.message : String(S),
          requestId: k
        });
      } finally {
        o.delete(k);
      }
    }
    async function X(C, E) {
      if (!n.voiceAvailable) {
        l[E] = {
          status: "unavailable",
          message: "TTS 能力未启用"
        };
        return;
      }
      const k = l[E];
      if (k?.status === "loading") return;
      if (k?.status === "playing" && k.requestId) {
        n.bridge.post("fourth-wall/voice-stop", {
          chatIdentity: n.chatIdentity,
          mediaRequestId: k.requestId
        }), l[E] = { status: "idle" };
        return;
      }
      const w = $("voice", E);
      o.add(w), l[E] = {
        status: "loading",
        message: "正在准备语音",
        requestId: w
      };
      try {
        await n.bridge.request("fourth-wall/voice-play", {
          chatIdentity: n.chatIdentity,
          sessionId: n.sessionId,
          mediaRequestId: w,
          text: C.value,
          emotion: C.emotion
        });
      } catch (S) {
        D(E, w) && (l[E] = {
          status: "error",
          message: S instanceof Error ? S.message : String(S),
          requestId: w
        }), o.delete(w);
      }
    }
    function G() {
      i.value = n.message.content, s.value = !0;
    }
    function V() {
      const C = i.value.trim();
      C && (a("edit", n.messageIndex, C), s.value = !1);
    }
    function z() {
      o.forEach((C) => {
        n.bridge.post("fourth-wall/image-cancel", {
          chatIdentity: n.chatIdentity,
          mediaRequestId: C
        }), n.bridge.post("fourth-wall/voice-stop", {
          chatIdentity: n.chatIdentity,
          mediaRequestId: C
        });
      }), o.clear();
    }
    function R() {
      d.value.forEach((C, E) => {
        C.kind === "image" && P(C, E);
      });
    }
    return ft(() => {
      u = n.bridge.subscribe((C) => {
        if (C.type === "fourth-wall/image-progress") {
          const E = C.payload, k = Object.keys(l).map(Number).find((w) => l[w]?.requestId === E.mediaRequestId);
          k !== void 0 && (l[k].message = E.status === "queued" ? `图片队列第 ${E.position || 1} 位` : "正在生成图片");
        }
        if (C.type === "fourth-wall/voice-state") {
          const E = C.payload, k = Object.keys(l).map(Number).find((w) => l[w]?.requestId === E.requestId);
          if (k === void 0) return;
          E.state === "playing" && (l[k].status = "playing"), (E.state === "ended" || E.state === "stopped") && (o.delete(String(E.requestId || "")), l[k] = { status: "idle" }), E.state === "error" && (o.delete(String(E.requestId || "")), l[k] = {
            status: "error",
            message: E.message || "语音播放失败"
          });
        }
      }), R();
    }), zt(() => n.message.content, () => {
      z(), Object.keys(l).forEach((C) => delete l[Number(C)]), R();
    }), vt(() => {
      u(), z();
    }), (C, E) => (m(), y("article", { class: oe(["fourth-wall-message", e.message.role === "user" ? "is-user" : "is-ai"]) }, [(e.message.role === "user" ? e.userAvatar : e.characterAvatar) ? (m(), y("img", {
      key: 0,
      class: "fourth-wall-avatar",
      src: e.message.role === "user" ? e.userAvatar : e.characterAvatar,
      alt: ""
    }, null, 8, Ep)) : (m(), y("span", Mp)), r("div", Ip, [
      e.message.thinking ? (m(), y("details", Pp, [E[3] || (E[3] = r("summary", null, "思考过程", -1)), r("div", null, b(e.message.thinking), 1)])) : F("", !0),
      r("div", Op, [s.value ? Ee((m(), y("textarea", {
        key: 0,
        "onUpdate:modelValue": E[0] || (E[0] = (k) => i.value = k),
        class: "fourth-wall-edit",
        rows: "3"
      }, null, 512)), [[We, i.value]]) : (m(!0), y(ae, { key: 1 }, ke(d.value, (k, w) => (m(), y(ae, { key: `${k.kind}-${w}` }, [k.kind === "text" ? (m(), y("span", Lp, b(k.value), 1)) : k.kind === "image" ? (m(), y("figure", Dp, [l[w]?.status === "ready" ? (m(), y("img", {
        key: 0,
        src: l[w].source,
        alt: k.value
      }, null, 8, Np)) : l[w]?.status === "error" ? (m(), y("button", {
        key: 1,
        type: "button",
        onClick: (S) => P(k, w)
      }, [Se(b(k.raw), 1), r("small", null, b(l[w].message) + "，点此重试", 1)], 8, Rp)) : l[w]?.status === "unavailable" ? (m(), y("div", Bp, [Se(b(k.raw), 1), r("small", null, b(l[w].message), 1)])) : (m(), y("div", qp, [Se(b(k.raw), 1), r("small", null, b(l[w]?.message || "准备图片"), 1)]))])) : (m(), y("button", {
        key: 2,
        class: "fourth-wall-voice",
        type: "button",
        onClick: (S) => X(k, w)
      }, [
        r("span", Fp, b(l[w]?.status === "playing" ? "■" : "▶"), 1),
        r("span", null, b(k.value), 1),
        l[w]?.message ? (m(), y("small", Hp, b(l[w].message), 1)) : F("", !0)
      ], 8, Up))], 64))), 128)), r("div", jp, [s.value ? (m(), y(ae, { key: 0 }, [r("button", {
        type: "button",
        onClick: V
      }, "保存"), r("button", {
        type: "button",
        onClick: E[1] || (E[1] = (k) => s.value = !1)
      }, "取消")], 64)) : (m(), y(ae, { key: 1 }, [r("button", {
        type: "button",
        onClick: G
      }, "编辑"), r("button", {
        type: "button",
        onClick: E[2] || (E[2] = (k) => a("delete", e.messageIndex))
      }, "删除")], 64))])]),
      g.value ? (m(), y("time", Kp, b(g.value), 1)) : F("", !0)
    ])], 2));
  }
}), Gp = Vp, zp = {
  key: 1,
  class: "fourth-wall-empty"
}, Wp = {
  key: 2,
  class: "fourth-wall-message is-ai is-streaming"
}, Jp = ["src"], Xp = {
  key: 1,
  class: "fourth-wall-avatar is-placeholder"
}, Yp = { class: "fourth-wall-message-stack" }, Qp = {
  key: 0,
  class: "fourth-wall-thinking",
  open: ""
}, Zp = { class: "fourth-wall-bubble" }, eg = {
  key: 0,
  class: "fourth-wall-unsaved"
}, tg = /* @__PURE__ */ ue({
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
    const t = e, n = /* @__PURE__ */ Y(null), a = /* @__PURE__ */ Y(40), s = ee(() => Math.max(0, t.history.length - a.value)), i = ee(() => t.history.slice(s.value));
    function l() {
      a.value = Math.min(t.history.length, a.value + 40);
    }
    return zt(() => t.sessionId, () => {
      a.value = 40;
    }), zt(() => [t.history.length, t.generation.text], async () => {
      await Jn(), n.value && (n.value.scrollTop = n.value.scrollHeight);
    }, { immediate: !0 }), (o, u) => (m(), y("section", {
      ref_key: "viewport",
      ref: n,
      class: "fourth-wall-conversation",
      "aria-live": "polite"
    }, [
      s.value > 0 ? (m(), y("button", {
        key: 0,
        type: "button",
        class: "fourth-wall-earlier",
        onClick: l
      }, " 显示更早的 " + b(s.value) + " 条记录 ", 1)) : F("", !0),
      e.history.length === 0 && e.generation.status === "idle" ? (m(), y("div", zp, [...u[2] || (u[2] = [
        r("span", null, "IV", -1),
        r("strong", null, "越过故事边界", -1),
        r("p", null, "这里是你与角色扮演者的皮下私聊。", -1)
      ])])) : F("", !0),
      (m(!0), y(ae, null, ke(i.value, (v, d) => (m(), ye(Gp, {
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
        onEdit: u[0] || (u[0] = (g, $) => o.$emit("edit", g, $)),
        onDelete: u[1] || (u[1] = (g) => o.$emit("delete", g))
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
      e.generation.status !== "idle" ? (m(), y("article", Wp, [e.characterAvatar ? (m(), y("img", {
        key: 0,
        class: "fourth-wall-avatar",
        src: e.characterAvatar,
        alt: ""
      }, null, 8, Jp)) : (m(), y("span", Xp)), r("div", Yp, [e.generation.thinking ? (m(), y("details", Qp, [u[3] || (u[3] = r("summary", null, "思考中", -1)), r("div", null, b(e.generation.thinking), 1)])) : F("", !0), r("div", Zp, [Se(b(e.generation.text || (e.generation.status === "error" ? e.generation.message : "等待回应...")) + " ", 1), e.generation.unsaved ? (m(), y("small", eg, "未保存")) : F("", !0)])])])) : F("", !0)
    ], 512));
  }
}), ng = tg, ag = {
  class: "fourth-wall-modal",
  role: "dialog",
  "aria-modal": "true",
  "aria-label": "四次元壁提示词"
}, sg = { class: "fourth-wall-prompt-fields" }, ig = /* @__PURE__ */ ue({
  __name: "FourthWallPromptEditor",
  props: { templates: {} },
  emits: [
    "close",
    "save",
    "restore"
  ],
  setup(e, { emit: t }) {
    const n = e, a = t, s = /* @__PURE__ */ $t(structuredClone(/* @__PURE__ */ te(n.templates)));
    function i() {
      a("save", structuredClone(/* @__PURE__ */ te(s)));
    }
    return (l, o) => (m(), y("div", {
      class: "fourth-wall-modal-backdrop",
      onClick: o[6] || (o[6] = wt((u) => a("close"), ["self"]))
    }, [r("section", ag, [
      r("header", null, [o[7] || (o[7] = r("strong", null, "提示词模板", -1)), r("button", {
        type: "button",
        onClick: o[0] || (o[0] = (u) => a("close"))
      }, "关闭")]),
      r("div", sg, [
        r("label", null, [o[8] || (o[8] = Se("Top User", -1)), Ee(r("textarea", {
          "onUpdate:modelValue": o[1] || (o[1] = (u) => s.topuser = u),
          rows: "5"
        }, null, 512), [[We, s.topuser]])]),
        r("label", null, [o[9] || (o[9] = Se("Confirm", -1)), Ee(r("textarea", {
          "onUpdate:modelValue": o[2] || (o[2] = (u) => s.confirm = u),
          rows: "3"
        }, null, 512), [[We, s.confirm]])]),
        r("label", null, [o[10] || (o[10] = Se("Meta Protocol", -1)), Ee(r("textarea", {
          "onUpdate:modelValue": o[3] || (o[3] = (u) => s.metaProtocol = u),
          rows: "12"
        }, null, 512), [[We, s.metaProtocol]])]),
        r("label", null, [o[11] || (o[11] = Se("Bottom", -1)), Ee(r("textarea", {
          "onUpdate:modelValue": o[4] || (o[4] = (u) => s.bottom = u),
          rows: "5"
        }, null, 512), [[We, s.bottom]])])
      ]),
      r("footer", null, [r("button", {
        type: "button",
        class: "is-danger",
        onClick: o[5] || (o[5] = (u) => a("restore"))
      }, "恢复默认"), r("button", {
        type: "button",
        class: "is-primary",
        onClick: i
      }, "保存")])
    ])]));
  }
}), rg = ig, lg = { class: "fourth-wall-settings-section" }, og = { class: "fourth-wall-session-row" }, ug = ["value", "disabled"], dg = ["value"], cg = ["disabled"], fg = ["disabled"], vg = ["disabled"], pg = /* @__PURE__ */ ue({
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
      const l = window.prompt("新记录名称", "新记录")?.trim();
      l && n("add", l);
    }
    function s(l, o) {
      const u = window.prompt("重命名记录", o)?.trim();
      u && n("rename", l, u);
    }
    function i(l) {
      window.confirm("确定删除当前记录吗？") && n("delete", l);
    }
    return (l, o) => (m(), y("section", lg, [o[3] || (o[3] = r("h3", null, "聊天记录", -1)), r("div", og, [
      r("select", {
        value: e.activeSessionId,
        disabled: e.disabled,
        onChange: o[0] || (o[0] = (u) => n("switch", u.target.value))
      }, [(m(!0), y(ae, null, ke(e.sessions, (u) => (m(), y("option", {
        key: u.id,
        value: u.id
      }, b(u.name), 9, dg))), 128))], 40, ug),
      r("button", {
        type: "button",
        disabled: e.disabled,
        title: "新建记录",
        onClick: a
      }, "＋", 8, cg),
      r("button", {
        type: "button",
        disabled: e.disabled,
        title: "重命名记录",
        onClick: o[1] || (o[1] = (u) => s(e.activeSessionId, e.sessions.find((v) => v.id === e.activeSessionId)?.name || ""))
      }, " 改 ", 8, fg),
      r("button", {
        type: "button",
        disabled: e.disabled || e.sessions.length <= 1,
        title: "删除记录",
        class: "is-danger",
        onClick: o[2] || (o[2] = (u) => i(e.activeSessionId))
      }, " 删 ", 8, vg)
    ])]));
  }
}), gg = pg, mg = {
  class: "fourth-wall-settings",
  "aria-label": "四次元壁设置"
}, bg = { class: "fourth-wall-settings-scroll" }, hg = { class: "fourth-wall-settings-section" }, yg = { class: "is-toggle" }, kg = { class: "is-toggle" }, Sg = ["disabled"], xg = { class: "fourth-wall-settings-section" }, wg = { class: "is-toggle" }, _g = { class: "is-toggle" }, Cg = { class: "is-toggle" }, $g = { key: 0 }, Tg = ["disabled"], Ag = { class: "fourth-wall-settings-section is-actions" }, Eg = /* @__PURE__ */ ue({
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
    const n = e, a = t, s = /* @__PURE__ */ $t(structuredClone(/* @__PURE__ */ te(n.chat.settings))), i = /* @__PURE__ */ $t(structuredClone(/* @__PURE__ */ te(n.global)));
    function l() {
      a("updateChat", structuredClone(/* @__PURE__ */ te(s)));
    }
    function o() {
      a("updateGlobal", {
        image: structuredClone(/* @__PURE__ */ te(i.image)),
        voice: structuredClone(/* @__PURE__ */ te(i.voice)),
        commentary: structuredClone(/* @__PURE__ */ te(i.commentary))
      });
    }
    return (u, v) => (m(), y("aside", mg, [r("header", null, [v[14] || (v[14] = r("strong", null, "四次元壁设置", -1)), r("button", {
      type: "button",
      onClick: v[0] || (v[0] = (d) => a("close"))
    }, "关闭")]), r("div", bg, [
      Ce(gg, {
        sessions: e.chat.sessions,
        "active-session-id": e.chat.activeSessionId,
        disabled: e.busy,
        onSwitch: v[1] || (v[1] = (d) => a("switchSession", d)),
        onAdd: v[2] || (v[2] = (d) => a("addSession", d)),
        onRename: v[3] || (v[3] = (d, g) => a("renameSession", d, g)),
        onDelete: v[4] || (v[4] = (d) => a("deleteSession", d))
      }, null, 8, [
        "sessions",
        "active-session-id",
        "disabled"
      ]),
      r("section", hg, [
        v[19] || (v[19] = r("h3", null, "上下文", -1)),
        r("label", null, [v[15] || (v[15] = Se("普通聊天层数", -1)), Ee(r("input", {
          "onUpdate:modelValue": v[5] || (v[5] = (d) => s.maxChatLayers = d),
          type: "number",
          min: "1",
          max: "9999"
        }, null, 512), [[
          We,
          s.maxChatLayers,
          void 0,
          { number: !0 }
        ]])]),
        r("label", null, [v[16] || (v[16] = Se("皮下聊天轮数", -1)), Ee(r("input", {
          "onUpdate:modelValue": v[6] || (v[6] = (d) => s.maxMetaTurns = d),
          type: "number",
          min: "1",
          max: "9999"
        }, null, 512), [[
          We,
          s.maxMetaTurns,
          void 0,
          { number: !0 }
        ]])]),
        r("label", yg, [v[17] || (v[17] = r("span", null, "流式生成", -1)), Ee(r("input", {
          "onUpdate:modelValue": v[7] || (v[7] = (d) => s.stream = d),
          type: "checkbox"
        }, null, 512), [[_n, s.stream]])]),
        r("label", kg, [v[18] || (v[18] = r("span", null, "禁用 Assistant Prefill", -1)), Ee(r("input", {
          "onUpdate:modelValue": v[8] || (v[8] = (d) => s.disableAssistantPrefill = d),
          type: "checkbox"
        }, null, 512), [[_n, s.disableAssistantPrefill]])]),
        r("button", {
          type: "button",
          class: "is-primary",
          disabled: e.busy,
          onClick: l
        }, "保存上下文设置", 8, Sg)
      ]),
      r("section", xg, [
        v[23] || (v[23] = r("h3", null, "能力", -1)),
        r("label", wg, [v[20] || (v[20] = r("span", null, "在提示词中允许图片", -1)), Ee(r("input", {
          "onUpdate:modelValue": v[9] || (v[9] = (d) => i.image.enablePrompt = d),
          type: "checkbox"
        }, null, 512), [[_n, i.image.enablePrompt]])]),
        r("label", _g, [v[21] || (v[21] = r("span", null, "在提示词中允许语音", -1)), Ee(r("input", {
          "onUpdate:modelValue": v[10] || (v[10] = (d) => i.voice.enabled = d),
          type: "checkbox"
        }, null, 512), [[_n, i.voice.enabled]])]),
        r("label", Cg, [v[22] || (v[22] = r("span", null, "实时吐槽", -1)), Ee(r("input", {
          "onUpdate:modelValue": v[11] || (v[11] = (d) => i.commentary.enabled = d),
          type: "checkbox"
        }, null, 512), [[_n, i.commentary.enabled]])]),
        i.commentary.enabled ? (m(), y("label", $g, [Se(" 吐槽概率 " + b(i.commentary.probability) + "% ", 1), Ee(r("input", {
          "onUpdate:modelValue": v[12] || (v[12] = (d) => i.commentary.probability = d),
          type: "range",
          min: "1",
          max: "99"
        }, null, 512), [[
          We,
          i.commentary.probability,
          void 0,
          { number: !0 }
        ]])])) : F("", !0),
        r("button", {
          type: "button",
          class: "is-primary",
          disabled: e.busy,
          onClick: o
        }, "保存能力设置", 8, Tg)
      ]),
      r("section", Ag, [r("button", {
        type: "button",
        onClick: v[13] || (v[13] = (d) => a("openPrompts"))
      }, "提示词模板")])
    ])]));
  }
}), Mg = Eg, Ig = { class: "fourth-wall-app" }, Pg = { class: "fourth-wall-header" }, Og = { class: "fourth-wall-heading" }, Lg = { class: "fourth-wall-header-actions" }, Dg = ["disabled"], Ng = ["disabled"], Rg = {
  key: 0,
  class: "fourth-wall-error",
  role: "alert"
}, Bg = { class: "fourth-wall-composer" }, qg = ["disabled"], Ug = ["disabled"], Fg = 35e3, Hg = /* @__PURE__ */ ue({
  __name: "FourthWallApp",
  props: {
    bridge: {},
    initialState: {}
  },
  setup(e) {
    const t = e, n = /* @__PURE__ */ Y(structuredClone(/* @__PURE__ */ te(t.initialState))), a = /* @__PURE__ */ Y(""), s = /* @__PURE__ */ Y(!1), i = /* @__PURE__ */ Y(!1), l = /* @__PURE__ */ Y(!1), o = /* @__PURE__ */ Y(""), u = /* @__PURE__ */ Y(!1), v = /* @__PURE__ */ Y({
      status: "idle",
      sessionId: "",
      text: "",
      thinking: "",
      message: "",
      unsaved: !1
    });
    let d = () => {
    };
    const g = ee(() => n.value.chat.sessions.find((w) => w.id === n.value.chat.activeSessionId)), $ = ee(() => v.value.status === "started" || v.value.status === "progress");
    function x(w = g.value.id) {
      return {
        chatIdentity: n.value.chatIdentity,
        sessionId: w
      };
    }
    function D(w) {
      return structuredClone(w.result);
    }
    async function P(w, S) {
      l.value = !0, o.value = "";
      try {
        n.value = D(await t.bridge.request(w, S, Fg));
      } catch (H) {
        o.value = H instanceof Error ? H.message : String(H);
      } finally {
        l.value = !1;
      }
    }
    async function X() {
      const w = a.value.trim();
      !w || $.value || l.value || (a.value = "", v.value = {
        status: "started",
        sessionId: g.value.id,
        text: "",
        thinking: "",
        message: "",
        unsaved: !1
      }, await P("fourth-wall/send", {
        ...x(),
        content: w
      }), o.value && (v.value.status = "idle"));
    }
    async function G() {
      $.value || l.value || (v.value = {
        status: "started",
        sessionId: g.value.id,
        text: "",
        thinking: "",
        message: "",
        unsaved: !1
      }, await P("fourth-wall/regenerate", x()), o.value && (v.value.status = "idle"));
    }
    function V() {
      t.bridge.post("fourth-wall/cancel", x());
    }
    function z(w) {
      w.key !== "Enter" || w.shiftKey || u.value || (w.preventDefault(), $.value ? V() : X());
    }
    function R(w) {
      window.confirm("确定删除这条消息吗？") && P("fourth-wall/delete-message", {
        ...x(),
        messageIndex: w
      });
    }
    function C() {
      window.confirm("确定清空当前记录吗？") && P("fourth-wall/clear-history", x());
    }
    function E(w) {
      P("fourth-wall/update-chat-settings", {
        ...x(),
        patch: w
      });
    }
    function k(w) {
      P("fourth-wall/update-global-settings", {
        ...x(),
        patch: w
      });
    }
    return ft(() => {
      d = t.bridge.subscribe((w) => {
        if (w.type === "fourth-wall/state" && (n.value = structuredClone(w.payload.state)), w.type !== "fourth-wall/generation") return;
        const S = w.payload;
        if (!(S.sessionId && S.sessionId !== g.value.id)) {
          if (S.status === "complete" || S.status === "cancelled") {
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
          if (S.status === "error") {
            o.value = S.message || "生成失败", v.value = S.kind === "save" && (S.draft?.text || S.draft?.thinking) ? {
              status: "error",
              sessionId: S.sessionId || g.value.id,
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
          v.value = {
            status: S.status || "progress",
            sessionId: S.sessionId || g.value.id,
            text: S.text || v.value.text,
            thinking: S.thinking || v.value.thinking,
            message: "",
            unsaved: !1
          };
        }
      });
    }), vt(() => d()), (w, S) => (m(), y("main", Ig, [
      r("header", Pg, [r("div", Og, [S[17] || (S[17] = r("span", null, "IV", -1)), r("div", null, [S[16] || (S[16] = r("strong", null, "四次元壁", -1)), r("small", null, b(g.value.name), 1)])]), r("div", Lg, [
        r("button", {
          type: "button",
          title: "重答",
          disabled: l.value || $.value,
          onClick: G
        }, "↻", 8, Dg),
        r("button", {
          type: "button",
          title: "清空当前记录",
          "aria-label": "清空当前记录",
          disabled: l.value,
          onClick: C
        }, [...S[18] || (S[18] = [r("svg", {
          viewBox: "0 0 24 24",
          "aria-hidden": "true"
        }, [r("path", { d: "M4 7h16M9 7V4h6v3m3 0-1 13H7L6 7m4 4v5m4-5v5" })], -1)])], 8, Ng),
        r("button", {
          type: "button",
          title: "设置",
          onClick: S[0] || (S[0] = (H) => s.value = !0)
        }, "⚙")
      ])]),
      o.value ? (m(), y("div", Rg, [r("span", null, b(o.value), 1), r("button", {
        type: "button",
        onClick: S[1] || (S[1] = (H) => o.value = "")
      }, "×")])) : F("", !0),
      Ce(ng, {
        history: g.value.history,
        "session-id": g.value.id,
        "chat-identity": n.value.chatIdentity,
        "user-avatar": n.value.userAvatar,
        "character-avatar": n.value.characterAvatar,
        "image-available": n.value.capabilities.image.available,
        "voice-available": n.value.capabilities.voice.available,
        generation: v.value,
        bridge: e.bridge,
        onEdit: S[2] || (S[2] = (H, se) => P("fourth-wall/edit-message", {
          ...x(),
          messageIndex: H,
          content: se
        })),
        onDelete: R
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
      r("footer", Bg, [Ee(r("textarea", {
        "onUpdate:modelValue": S[3] || (S[3] = (H) => a.value = H),
        rows: "1",
        placeholder: "聊点什么...",
        disabled: l.value,
        onCompositionstart: S[4] || (S[4] = (H) => u.value = !0),
        onCompositionend: S[5] || (S[5] = (H) => u.value = !1),
        onKeydown: z
      }, null, 40, qg), [[We, a.value]]), r("button", {
        type: "button",
        class: oe({ "is-stop": $.value }),
        disabled: l.value,
        onClick: S[6] || (S[6] = (H) => $.value ? V() : X())
      }, b($.value ? "■" : "↑"), 11, Ug)]),
      s.value ? (m(), ye(Mg, {
        key: 1,
        chat: n.value.chat,
        global: n.value.global,
        busy: l.value || $.value,
        onClose: S[7] || (S[7] = (H) => s.value = !1),
        onUpdateChat: E,
        onUpdateGlobal: k,
        onSwitchSession: S[8] || (S[8] = (H) => P("fourth-wall/switch-session", {
          ...x(),
          targetSessionId: H
        })),
        onAddSession: S[9] || (S[9] = (H) => P("fourth-wall/add-session", {
          ...x(),
          name: H
        })),
        onRenameSession: S[10] || (S[10] = (H, se) => P("fourth-wall/rename-session", {
          ...x(H),
          name: se
        })),
        onDeleteSession: S[11] || (S[11] = (H) => P("fourth-wall/delete-session", x(H))),
        onOpenPrompts: S[12] || (S[12] = (H) => i.value = !0)
      }, null, 8, [
        "chat",
        "global",
        "busy"
      ])) : F("", !0),
      i.value ? (m(), ye(rg, {
        key: 2,
        templates: n.value.global.promptTemplates,
        onClose: S[13] || (S[13] = (H) => i.value = !1),
        onSave: S[14] || (S[14] = (H) => {
          k({ promptTemplates: H }), i.value = !1;
        }),
        onRestore: S[15] || (S[15] = () => {
          P("fourth-wall/restore-prompts", x()), i.value = !1;
        })
      }, null, 8, ["templates"])) : F("", !0)
    ]));
  }
}), jg = Hg, Kg = Object.freeze({
  id: "shop",
  name: "奇物商店",
  accent: "#a83b32"
}), Vg = ["aria-labelledby"], Gg = ["id"], zg = { class: "shop-dialog-item" }, Wg = { "aria-hidden": "true" }, Jg = [
  "onUpdate:modelValue",
  "maxlength",
  "placeholder"
], Xg = {
  key: 0,
  class: "shop-dialog-error",
  role: "alert"
}, Yg = { class: "shop-dialog-actions" }, Qg = ["disabled"], Zg = ["disabled"], em = /* @__PURE__ */ ue({
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
    const n = e, a = t, s = /* @__PURE__ */ $t({}), i = ee(() => n.mode === "purchase" ? "确认购入" : n.mode === "deactivate" ? "关闭效果" : "确认使用"), l = ee(() => n.mode === "purchase" ? `将支付 ${n.item.price} 小白币，奇物会先放入背包。` : n.mode === "deactivate" ? "关闭后将从下一次回复起停止影响剧情，已经发生的事实不会消失。" : n.item.duration === "permanent" ? "这件奇物将永久影响后续剧情，使用后无法关闭。" : `使用后从下一次回复起${n.item.durationLabel}。`), o = ee(() => n.mode !== "use" || n.item.inputs.every((v) => String(s[v.key] || "").trim().length > 0));
    function u() {
      !n.busy && o.value && a("confirm", { ...s });
    }
    return (v, d) => (m(), y("dialog", {
      open: "",
      class: "shop-dialog",
      "aria-labelledby": `shop-dialog-${e.mode}`,
      onClick: d[1] || (d[1] = wt((g) => !e.busy && v.$emit("cancel"), ["self"])),
      onKeydown: d[2] || (d[2] = Yr(wt((g) => !e.busy && v.$emit("cancel"), ["stop", "prevent"]), ["esc"]))
    }, [r("form", {
      method: "dialog",
      class: "shop-dialog-card",
      onSubmit: wt(u, ["prevent"])
    }, [
      d[3] || (d[3] = r("span", { class: "shop-dialog-kicker" }, "SEALED DECISION", -1)),
      r("h2", { id: `shop-dialog-${e.mode}` }, b(i.value), 9, Gg),
      r("div", zg, [r("span", Wg, b(e.item.name.slice(0, 1)), 1), r("div", null, [r("strong", null, b(e.item.name), 1), r("small", null, b(e.item.durationLabel), 1)])]),
      (m(!0), y(ae, null, ke(e.mode === "use" ? e.item.inputs : [], (g) => (m(), y("label", {
        key: g.key,
        class: "shop-dialog-field"
      }, [r("span", null, b(g.label), 1), Ee(r("input", {
        "onUpdate:modelValue": ($) => s[g.key] = $,
        type: "text",
        maxlength: g.maxLength,
        placeholder: g.placeholder,
        autocomplete: "off",
        required: ""
      }, null, 8, Jg), [[We, s[g.key]]])]))), 128)),
      r("p", { class: oe(["shop-dialog-warning", { "is-permanent": e.mode === "use" && e.item.duration === "permanent" }]) }, b(l.value), 3),
      e.error ? (m(), y("p", Xg, b(e.error), 1)) : F("", !0),
      r("div", Yg, [r("button", {
        type: "button",
        disabled: e.busy,
        onClick: d[0] || (d[0] = (g) => v.$emit("cancel"))
      }, "再想想", 8, Qg), r("button", {
        type: "submit",
        class: "is-primary",
        disabled: e.busy || !o.value
      }, b(e.busy ? "正在封存…" : e.mode === "purchase" ? "确认支付" : e.mode === "deactivate" ? "确认关闭" : "确认使用"), 9, Zg)])
    ], 32)], 40, Vg));
  }
}), tm = em, nm = {
  class: "shop-inventory",
  "aria-labelledby": "shop-inventory-title"
}, am = { class: "shop-section-heading" }, sm = {
  key: 0,
  class: "shop-write-reason",
  role: "status"
}, im = {
  class: "shop-inventory-group",
  "aria-labelledby": "shop-active-title"
}, rm = {
  key: 0,
  class: "shop-activation-list"
}, lm = {
  class: "shop-mini-mark",
  "aria-hidden": "true"
}, om = [
  "disabled",
  "title",
  "onClick"
], um = {
  key: 1,
  class: "shop-empty-copy"
}, dm = {
  class: "shop-inventory-group",
  "aria-labelledby": "shop-held-title"
}, cm = {
  key: 0,
  class: "shop-held-grid"
}, fm = {
  class: "shop-mini-mark",
  "aria-hidden": "true"
}, vm = [
  "disabled",
  "title",
  "onClick"
], pm = {
  key: 1,
  class: "shop-empty-copy"
}, gm = {
  key: 1,
  class: "shop-inventory-group is-exhausted"
}, mm = ["aria-expanded"], bm = {
  key: 0,
  class: "shop-exhausted-list"
}, hm = { key: 0 }, ym = /* @__PURE__ */ ue({
  __name: "ShopInventory",
  props: {
    catalog: {},
    activations: {},
    writeDisabledReason: {}
  },
  emits: ["use", "deactivate"],
  setup(e) {
    const t = e, n = /* @__PURE__ */ Y(!1), a = ee(() => t.activations.filter((o) => o.state === "active")), s = ee(() => t.catalog.filter((o) => o.quantity > 0)), i = ee(() => t.catalog.filter((o) => o.purchasedCount > 0 && o.quantity === 0)), l = ee(() => {
      const o = /* @__PURE__ */ new Map();
      for (const u of t.activations) u.state !== "active" && o.set(u.itemId, (o.get(u.itemId) || 0) + 1);
      return o;
    });
    return (o, u) => (m(), y("section", nm, [
      r("header", am, [u[1] || (u[1] = r("div", null, [r("span", null, "PRIVATE COLLECTION"), r("h2", { id: "shop-inventory-title" }, "我的奇物")], -1)), r("small", null, b(s.value.reduce((v, d) => v + d.quantity, 0)) + " 件可用", 1)]),
      e.writeDisabledReason ? (m(), y("p", sm, b(e.writeDisabledReason), 1)) : F("", !0),
      r("section", im, [r("header", null, [u[2] || (u[2] = r("h3", { id: "shop-active-title" }, "生效中", -1)), r("span", null, b(a.value.length), 1)]), a.value.length ? (m(), y("div", rm, [(m(!0), y(ae, null, ke(a.value, (v) => (m(), y("article", {
        key: v.activationId,
        class: "shop-activation-card"
      }, [
        r("div", lm, b(v.name.slice(0, 1)), 1),
        r("div", null, [
          r("h4", null, b(v.name), 1),
          (m(!0), y(ae, null, ke(v.parameters, (d) => (m(), y("p", { key: d.label }, [r("span", null, b(d.label), 1), Se(b(d.value), 1)]))), 128)),
          r("small", null, b(v.stateLabel), 1)
        ]),
        v.canDeactivate ? (m(), y("button", {
          key: 0,
          type: "button",
          disabled: !!e.writeDisabledReason,
          title: e.writeDisabledReason,
          onClick: (d) => o.$emit("deactivate", v)
        }, " 关闭 ", 8, om)) : F("", !0)
      ]))), 128))])) : (m(), y("p", um, "尚无正在影响剧情的奇物。"))]),
      r("section", dm, [r("header", null, [u[3] || (u[3] = r("h3", { id: "shop-held-title" }, "持有", -1)), r("span", null, b(s.value.length), 1)]), s.value.length ? (m(), y("div", cm, [(m(!0), y(ae, null, ke(s.value, (v) => (m(), y("article", {
        key: v.id,
        class: "shop-held-card"
      }, [
        r("div", fm, b(v.name.slice(0, 1)), 1),
        r("div", null, [r("h4", null, b(v.name), 1), r("p", null, b(v.durationLabel), 1)]),
        r("strong", null, "×" + b(v.quantity), 1),
        r("button", {
          type: "button",
          disabled: !!e.writeDisabledReason,
          title: e.writeDisabledReason,
          onClick: (d) => o.$emit("use", v)
        }, " 使用 ", 8, vm)
      ]))), 128))])) : (m(), y("p", pm, "背包还是空的，去货架挑一件吧。"))]),
      i.value.length ? (m(), y("section", gm, [r("button", {
        type: "button",
        class: "shop-collapse-button",
        "aria-expanded": n.value,
        onClick: u[0] || (u[0] = (v) => n.value = !n.value)
      }, [
        u[4] || (u[4] = r("span", null, "已耗尽", -1)),
        r("small", null, b(i.value.length), 1),
        u[5] || (u[5] = r("i", { "aria-hidden": "true" }, "⌄", -1))
      ], 8, mm), n.value ? (m(), y("div", bm, [(m(!0), y(ae, null, ke(i.value, (v) => (m(), y("article", { key: v.id }, [r("span", null, b(v.name), 1), r("small", null, [Se("购入 " + b(v.purchasedCount) + " 次", 1), l.value.get(v.id) ? (m(), y("span", hm, " · 已结束 " + b(l.value.get(v.id)), 1)) : F("", !0)])]))), 128))])) : F("", !0)])) : F("", !0)
    ]));
  }
}), km = ym, Sm = {
  class: "shop-shelf",
  "aria-labelledby": "shop-shelf-title"
}, xm = { class: "shop-section-heading" }, wm = {
  class: "shop-category-strip",
  "aria-label": "商品分类"
}, _m = ["onClick"], Cm = { class: "shop-product-grid" }, $m = {
  class: "shop-product-mark",
  "aria-hidden": "true"
}, Tm = { class: "shop-product-copy" }, Am = { class: "shop-product-title" }, Em = { class: "shop-product-footer" }, Mm = { key: 0 }, Im = [
  "disabled",
  "title",
  "onClick"
], Pm = {
  key: 0,
  class: "shop-card-reason"
}, Om = /* @__PURE__ */ ue({
  __name: "ShopShelf",
  props: {
    catalog: {},
    balance: {},
    writeDisabledReason: {}
  },
  emits: ["purchase"],
  setup(e) {
    const t = e, n = /* @__PURE__ */ Y("all"), a = ee(() => {
      const o = /* @__PURE__ */ new Map();
      for (const u of t.catalog) o.set(u.category, u.categoryLabel);
      return [{
        id: "all",
        label: "全部"
      }, ...Array.from(o, ([u, v]) => ({
        id: u,
        label: v
      }))];
    }), s = ee(() => n.value === "all" ? t.catalog : t.catalog.filter((o) => o.category === n.value));
    function i(o) {
      return t.writeDisabledReason ? t.writeDisabledReason : l(o);
    }
    function l(o) {
      return o.purchaseLimit !== null && o.purchasedCount >= o.purchaseLimit ? "此奇物已达购买上限" : t.balance < o.price ? `还差 ${o.price - t.balance} 小白币` : "";
    }
    return (o, u) => (m(), y("section", Sm, [
      r("header", xm, [u[0] || (u[0] = r("div", null, [r("span", null, "CURIO CABINET"), r("h2", { id: "shop-shelf-title" }, "今日陈列")], -1)), r("small", null, b(s.value.length) + " 件奇物", 1)]),
      r("nav", wm, [(m(!0), y(ae, null, ke(a.value, (v) => (m(), y("button", {
        key: v.id,
        type: "button",
        class: oe({ "is-active": n.value === v.id }),
        onClick: (d) => n.value = v.id
      }, b(v.label), 11, _m))), 128))]),
      r("div", Cm, [(m(!0), y(ae, null, ke(s.value, (v) => (m(), y("article", {
        key: v.id,
        class: "shop-product-card"
      }, [r("div", $m, b(v.name.slice(0, 1)), 1), r("div", Tm, [
        r("div", Am, [r("h3", null, b(v.name), 1), r("span", null, b(v.categoryLabel), 1)]),
        r("p", null, b(v.description), 1),
        r("small", null, b(v.durationLabel), 1),
        r("div", Em, [
          r("strong", null, [u[1] || (u[1] = r("i", null, "¤", -1)), Se(b(v.price), 1)]),
          v.quantity ? (m(), y("span", Mm, "持有 " + b(v.quantity), 1)) : F("", !0),
          r("button", {
            type: "button",
            disabled: !!i(v),
            title: i(v),
            onClick: (d) => o.$emit("purchase", v)
          }, b(v.purchaseLimit !== null && v.purchasedCount >= v.purchaseLimit ? "已购得" : "购入"), 9, Im)
        ]),
        l(v) ? (m(), y("p", Pm, b(l(v)), 1)) : F("", !0)
      ])]))), 128))])
    ]));
  }
}), Lm = Om, Dm = { class: "shop-app" }, Nm = { class: "shop-header" }, Rm = {
  class: "shop-balance",
  "aria-label": "小白币余额"
}, Bm = ["disabled"], qm = {
  class: "shop-root-tabs",
  "aria-label": "商店页面"
}, Um = { key: 0 }, Fm = ["disabled"], Hm = ["disabled"], jm = { class: "shop-scroll" }, Za = 35e3, Km = /* @__PURE__ */ ue({
  __name: "ShopApp",
  props: {
    bridge: {},
    initialState: {}
  },
  setup(e) {
    const t = e, n = /* @__PURE__ */ Y(structuredClone(/* @__PURE__ */ te(t.initialState))), a = /* @__PURE__ */ Y("shelf"), s = /* @__PURE__ */ Y(null), i = /* @__PURE__ */ Y(!1), l = /* @__PURE__ */ Y(!1), o = /* @__PURE__ */ Y(""), u = /* @__PURE__ */ Y("");
    let v = () => {
    }, d = 0;
    const g = ee(() => n.value.status === "unconfirmed"), $ = ee(() => l.value ? "正在处理上一项操作" : i.value ? "正在刷新商店状态" : n.value.status !== "ready" ? n.value.message || "商店暂时不可写入" : n.value.generationActive ? "主剧情正在生成，请等待回复完成" : ""), x = ee(() => i.value || l.value || g.value);
    function D() {
      return typeof globalThis.crypto?.randomUUID == "function" ? `shop-ui:${globalThis.crypto.randomUUID()}` : `shop-ui:${Date.now()}:${Math.random().toString(36).slice(2, 10)}`;
    }
    function P() {
      return { chatIdentity: n.value.chatIdentity };
    }
    function X(k) {
      n.value = structuredClone(k), i.value = !1, o.value = "";
    }
    function G(k) {
      const w = k instanceof Error ? k.message : String(k);
      return w.includes("cannot be overdrawn") ? "小白币余额不足，未完成购买。" : w.includes("shop_main_generation_active") ? "主剧情正在生成，请等待回复完成。" : w.includes("shop_revision_conflict") || w.includes("shop_event_id_conflict") ? "商店状态已变化，请关闭确认框后重试。" : w === "host_request_timeout" ? "等待保存结果超时，请使用同一确认框重试。" : "商店操作未完成，请稍后重试。";
    }
    async function V() {
      if (x.value) return;
      const k = ++d;
      i.value = !0, o.value = "";
      try {
        const w = await t.bridge.request("shop/refresh", P(), Za);
        k === d && X(w.result);
      } catch (w) {
        k === d && (o.value = G(w));
      } finally {
        k === d && (i.value = !1);
      }
    }
    async function z() {
      if (i.value || l.value) return;
      const k = ++d;
      i.value = !0, o.value = "";
      try {
        const w = await t.bridge.request("shop/confirm-save", P(), Za);
        k === d && X(w.result.state);
      } catch (w) {
        k === d && (o.value = G(w));
      } finally {
        k === d && (i.value = !1);
      }
    }
    function R(k, w, S) {
      $.value || (u.value = "", s.value = {
        mode: k,
        item: w,
        activation: S,
        actionId: D()
      });
    }
    function C() {
      l.value || (s.value = null, u.value = "");
    }
    async function E(k) {
      const w = s.value;
      if (!w || l.value) return;
      l.value = !0, u.value = "";
      const S = d, H = w.mode === "purchase" ? "shop/purchase" : w.mode === "use" ? "shop/activate" : "shop/deactivate";
      try {
        const se = await t.bridge.request(H, {
          ...P(),
          expectedRevision: n.value.revision,
          expectedEventId: n.value.eventId,
          actionId: w.actionId,
          itemId: w.item.id,
          ...w.mode === "use" ? { parameters: k } : {},
          ...w.activation ? { activationId: w.activation.activationId } : {}
        }, Za);
        if (S !== d || s.value !== w) return;
        X(se.result), s.value = null;
      } catch (se) {
        S === d && s.value === w && (u.value = G(se));
      } finally {
        S === d && (l.value = !1);
      }
    }
    return ft(() => {
      v = t.bridge.subscribe((k) => {
        k.type === "shop/state" && (l.value || (d += 1), X(k.payload.state)), k.type === "shop/error" && (o.value = G(k.payload?.message || ""));
      });
    }), vt(() => {
      d += 1, v(), s.value = null;
    }), (k, w) => (m(), y("main", Dm, [
      r("header", Nm, [
        w[7] || (w[7] = r("div", null, [r("span", { class: "shop-header-kicker" }, "VERMILION CABINET"), r("h1", null, "奇物商店")], -1)),
        r("div", Rm, [w[5] || (w[5] = r("small", null, "余额", -1)), r("strong", null, "¤ " + b(n.value.balance), 1)]),
        r("button", {
          type: "button",
          class: "shop-refresh",
          disabled: x.value,
          title: "重新读取商店",
          onClick: V
        }, [...w[6] || (w[6] = [r("svg", {
          viewBox: "0 0 24 24",
          "aria-hidden": "true"
        }, [r("path", { d: "M20 7v5h-5M4 17v-5h5M18.2 9A7 7 0 0 0 6.1 6.7L4 9m16 6-2.1 2.3A7 7 0 0 1 5.8 15" })], -1), r("span", { class: "shop-sr-only" }, "重新读取商店", -1)])], 8, Bm)
      ]),
      r("nav", qm, [r("button", {
        type: "button",
        class: oe({ "is-active": a.value === "shelf" }),
        onClick: w[0] || (w[0] = (S) => a.value = "shelf")
      }, "货架", 2), r("button", {
        type: "button",
        class: oe({ "is-active": a.value === "inventory" }),
        onClick: w[1] || (w[1] = (S) => a.value = "inventory")
      }, [w[8] || (w[8] = Se(" 背包", -1)), n.value.catalog.some((S) => S.quantity) ? (m(), y("span", Um, b(n.value.catalog.reduce((S, H) => S + H.quantity, 0)), 1)) : F("", !0)], 2)]),
      n.value.message || o.value ? (m(), y("aside", {
        key: 0,
        class: oe(["shop-notice", `is-${n.value.status}`]),
        role: "status"
      }, [w[9] || (w[9] = r("span", { "aria-hidden": "true" }, "印", -1)), r("div", null, [
        r("strong", null, b(n.value.status === "unconfirmed" ? "保存待核实" : n.value.status === "conflict" ? "状态冲突" : "商店状态"), 1),
        r("p", null, b(o.value || n.value.message), 1),
        g.value ? (m(), y("button", {
          key: 0,
          type: "button",
          disabled: i.value,
          onClick: z
        }, b(i.value ? "正在核实…" : "核实保存结果"), 9, Fm)) : n.value.status === "blocked" ? (m(), y("button", {
          key: 1,
          type: "button",
          disabled: i.value,
          onClick: V
        }, b(i.value ? "正在读取…" : "重新读取"), 9, Hm)) : F("", !0)
      ])], 2)) : F("", !0),
      r("div", jm, [a.value === "shelf" ? (m(), ye(Lm, {
        key: 0,
        catalog: n.value.catalog,
        balance: n.value.balance,
        "write-disabled-reason": $.value,
        onPurchase: w[2] || (w[2] = (S) => R("purchase", S))
      }, null, 8, [
        "catalog",
        "balance",
        "write-disabled-reason"
      ])) : (m(), ye(km, {
        key: 1,
        catalog: n.value.catalog,
        activations: n.value.activations,
        "write-disabled-reason": $.value,
        onUse: w[3] || (w[3] = (S) => R("use", S)),
        onDeactivate: w[4] || (w[4] = (S) => {
          const H = n.value.catalog.find((se) => se.id === S.itemId);
          H && R("deactivate", H, S);
        })
      }, null, 8, [
        "catalog",
        "activations",
        "write-disabled-reason"
      ]))]),
      s.value ? (m(), ye(tm, {
        key: 1,
        mode: s.value.mode,
        item: s.value.item,
        activation: s.value.activation,
        busy: l.value,
        error: u.value,
        onCancel: C,
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
}), Vm = Km, Gm = Object.freeze({
  id: "wallet",
  name: "钱包",
  accent: "#a9660f"
}), zm = { class: "wallet-ui-header" }, Wm = { class: "wallet-ui-header-copy" }, Jm = {
  key: 0,
  class: "wallet-ui-kicker"
}, Xm = { class: "wallet-ui-title" }, Ym = /* @__PURE__ */ ue({
  __name: "WalletAppHeader",
  props: {
    kicker: {},
    title: {}
  },
  setup(e) {
    return (t, n) => (m(), y("header", zm, [r("div", Wm, [e.kicker ? (m(), y("span", Jm, b(e.kicker), 1)) : F("", !0), r("h1", Xm, b(e.title), 1)])]));
  }
}), Qm = Ym, Zm = {
  class: "wallet-balance wallet-ui-rise",
  "aria-labelledby": "wallet-balance-title"
}, eb = { class: "wallet-balance-chip" }, tb = ["aria-label"], nb = /* @__PURE__ */ ue({
  __name: "WalletBalanceCard",
  props: {
    balance: {},
    currency: {},
    status: {}
  },
  setup(e) {
    const t = e, n = ee(() => Number(t.balance).toLocaleString("zh-CN")), a = ee(() => ({
      ready: "账目就绪",
      loading: "正在开户",
      saving: "正在保存",
      unconfirmed: "保存待确认",
      conflict: "账目已冻结",
      blocked: "暂时不可用"
    })[t.status]);
    return (s, i) => (m(), y("section", Zm, [
      r("header", null, [i[0] || (i[0] = r("p", { id: "wallet-balance-title" }, "当前结余", -1)), r("span", eb, [r("i", {
        class: oe(`is-${e.status}`),
        "aria-hidden": "true"
      }, null, 2), Se(b(a.value), 1)])]),
      r("div", {
        class: "wallet-balance-value",
        "aria-label": `${n.value} ${e.currency}`
      }, [i[1] || (i[1] = r("span", { "aria-hidden": "true" }, "¤", -1)), Se(b(n.value), 1)], 8, tb),
      r("footer", null, b(e.currency), 1)
    ]));
  }
}), ab = nb, sb = {
  class: "wallet-ui-notice-icon",
  "aria-hidden": "true"
}, ib = { class: "wallet-ui-notice-copy" }, rb = { key: 0 }, lb = /* @__PURE__ */ ue({
  __name: "WalletNotice",
  props: {
    title: {},
    message: { default: "" },
    tone: { default: "info" }
  },
  setup(e) {
    return (t, n) => (m(), y("aside", {
      class: oe(["wallet-ui-notice", `is-${e.tone}`]),
      role: "status"
    }, [r("span", sb, [rs(t.$slots, "icon", {}, () => [n[0] || (n[0] = Se("!", -1))])]), r("div", ib, [
      r("strong", null, b(e.title), 1),
      e.message ? (m(), y("p", rb, b(e.message), 1)) : F("", !0),
      rs(t.$slots, "default")
    ])], 2));
  }
}), ob = lb, ub = { class: "wallet-ui-empty" }, db = {
  key: 0,
  class: "wallet-ui-empty-icon",
  "aria-hidden": "true"
}, cb = { key: 1 }, fb = /* @__PURE__ */ ue({
  __name: "WalletEmpty",
  props: {
    title: {},
    message: { default: "" }
  },
  setup(e) {
    return (t, n) => (m(), y("div", ub, [
      t.$slots.icon ? (m(), y("span", db, [rs(t.$slots, "icon")])) : F("", !0),
      r("strong", null, b(e.title), 1),
      e.message ? (m(), y("p", cb, b(e.message), 1)) : F("", !0)
    ]));
  }
}), vb = fb, pb = {
  class: "wallet-row-mark",
  "aria-hidden": "true"
}, gb = { viewBox: "0 0 24 24" }, mb = ["d"], bb = { class: "wallet-row-copy" }, hb = { key: 0 }, yb = { class: "wallet-row-amount" }, kb = /* @__PURE__ */ ue({
  __name: "WalletTransactionRow",
  props: { transaction: {} },
  setup(e) {
    const t = {
      income: "M12 5v14m0 0-5.5-5.5M12 19l5.5-5.5",
      expense: "M12 19V5m0 0L6.5 10.5M12 5l5.5 5.5",
      transfer: "M4 9h16m0 0-4-4m4 4-4 4M20 15H4m0 0 4 4m-4-4 4-4"
    }, n = e, a = ee(() => t[n.transaction.direction] || t.transfer), s = ee(() => {
      const l = n.transaction.amount.toLocaleString("zh-CN");
      return n.transaction.direction === "income" ? `+${l}` : n.transaction.direction === "expense" ? `−${l}` : l;
    }), i = ee(() => {
      const l = new Date(n.transaction.createdAt), o = new Intl.DateTimeFormat("zh-CN", {
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
        hour12: !1
      }).format(l);
      return n.transaction.sequence === 1 && n.transaction.sourceDomain === "economy" ? `开户 · ${o}` : o;
    });
    return (l, o) => (m(), y("li", { class: oe(["wallet-row", `is-${e.transaction.direction}`]) }, [
      r("span", pb, [(m(), y("svg", gb, [r("path", { d: a.value }, null, 8, mb)]))]),
      r("div", bb, [
        r("strong", null, b(e.transaction.title), 1),
        e.transaction.note ? (m(), y("p", hb, b(e.transaction.note), 1)) : F("", !0),
        r("small", null, b(e.transaction.source) + " · " + b(i.value), 1)
      ]),
      r("span", yb, b(s.value), 1)
    ], 2));
  }
}), Sb = kb, xb = {
  key: 1,
  class: "wallet-ui-list"
}, wb = {
  key: 2,
  class: "wallet-ledger-foot"
}, _b = {
  key: 0,
  class: "wallet-load-error",
  role: "alert"
}, Cb = ["disabled"], $b = {
  key: 2,
  class: "wallet-ledger-end"
}, Tb = /* @__PURE__ */ ue({
  __name: "WalletTransactionList",
  props: {
    transactions: {},
    hasMore: { type: Boolean },
    loadingMore: { type: Boolean },
    error: {}
  },
  emits: ["loadMore"],
  setup(e) {
    return (t, n) => (m(), y("div", null, [e.transactions.length === 1 && e.transactions[0]?.sequence === 1 && e.transactions[0]?.sourceDomain === "economy" ? (m(), ye(vb, {
      key: 0,
      title: "新账簿已经启用",
      message: "除了开户赠礼，还没有其他收支。"
    }, {
      icon: Ma(() => [...n[1] || (n[1] = [r("svg", { viewBox: "0 0 24 24" }, [r("path", { d: "m5 12.5 4.5 4.5L19 7.5" })], -1)])]),
      _: 1
    })) : (m(), y("ol", xb, [(m(!0), y(ae, null, ke(e.transactions, (a) => (m(), ye(Sb, {
      key: a.id,
      transaction: a
    }, null, 8, ["transaction"]))), 128))])), e.hasMore || e.transactions.length > 1 ? (m(), y("div", wb, [e.error ? (m(), y("p", _b, b(e.error), 1)) : F("", !0), e.hasMore ? (m(), y("button", {
      key: 1,
      type: "button",
      class: "wallet-ui-text-button",
      disabled: e.loadingMore,
      onClick: n[0] || (n[0] = (a) => t.$emit("loadMore"))
    }, b(e.loadingMore ? "正在翻阅…" : "翻阅更早账目"), 9, Cb)) : (m(), y("span", $b, "账簿至此"))])) : F("", !0)]));
  }
}), Ab = Tb, Eb = { class: "wallet-ui-app wallet-app" }, Mb = { class: "wallet-ui-scroll" }, Ib = ["disabled"], Pb = ["disabled"], Ob = {
  class: "wallet-ledger",
  "aria-labelledby": "wallet-ledger-title"
}, Lb = { class: "wallet-ui-section-title" }, Db = { class: "wallet-ui-card" }, Ni = 35e3, Nb = /* @__PURE__ */ ue({
  __name: "WalletApp",
  props: {
    bridge: {},
    initialState: {}
  },
  setup(e) {
    const t = e, n = /* @__PURE__ */ Y(structuredClone(/* @__PURE__ */ te(t.initialState))), a = /* @__PURE__ */ Y(!1), s = /* @__PURE__ */ Y(!1), i = /* @__PURE__ */ Y(""), l = /* @__PURE__ */ Y("");
    let o = () => {
    }, u = 0;
    const v = ee(() => n.value.status === "unconfirmed"), d = ee(() => a.value || n.value.status === "loading" || n.value.status === "saving"), g = ee(() => d.value || v.value || n.value.status === "conflict"), $ = ee(() => !!(n.value.message || i.value)), x = ee(() => i.value || n.value.status === "conflict" || n.value.status === "blocked" ? "danger" : v.value ? "warning" : "info"), D = ee(() => n.value.status === "conflict" ? "账本发生冲突" : n.value.status === "blocked" ? "钱包暂时无法读取" : "账本状态");
    function P(C) {
      const E = C instanceof Error ? C.message : String(C);
      return E.includes("聊天已切换") ? "聊天已切换，请重新打开钱包。" : E === "host_request_timeout" ? "读取等待超时，请稍后重新读取。" : "钱包数据暂时无法读取，请稍后重试。";
    }
    function X() {
      return { chatIdentity: n.value.chatIdentity };
    }
    function G(C) {
      n.value = structuredClone(C), a.value = !1, s.value = !1, i.value = "", l.value = "";
    }
    async function V() {
      if (d.value || v.value || n.value.status === "conflict") return;
      const C = ++u;
      a.value = !0, i.value = "";
      try {
        const E = await t.bridge.request("wallet/refresh", X(), Ni);
        C === u && G(E.result);
      } catch (E) {
        C === u && (i.value = P(E));
      } finally {
        C === u && (a.value = !1);
      }
    }
    async function z() {
      if (d.value) return;
      const C = ++u;
      a.value = !0, i.value = "";
      try {
        const E = await t.bridge.request("wallet/confirm-save", X(), Ni);
        C === u && G(E.result.state);
      } catch (E) {
        C === u && (i.value = P(E));
      } finally {
        C === u && (a.value = !1);
      }
    }
    async function R() {
      const C = n.value.nextCursor;
      if (!C || s.value) return;
      const E = u;
      s.value = !0, l.value = "";
      try {
        const k = await t.bridge.request("wallet/load-more", {
          ...X(),
          beforeSequence: C
        });
        if (E !== u) return;
        const w = new Set(n.value.transactions.map((S) => S.id));
        n.value.transactions.push(...k.result.transactions.filter((S) => !w.has(S.id))), n.value.nextCursor = k.result.nextCursor, n.value.hasMore = k.result.hasMore;
      } catch {
        E === u && (l.value = "更多流水暂时无法读取，请稍后重试。");
      } finally {
        E === u && (s.value = !1);
      }
    }
    return ft(() => {
      o = t.bridge.subscribe((C) => {
        C.type === "wallet/state" && (u += 1, G(C.payload.state)), C.type === "wallet/error" && (i.value = P(C.payload?.message || ""));
      });
    }), vt(() => {
      u += 1, o();
    }), (C, E) => (m(), y("main", Eb, [Ce(Qm, {
      kicker: "Wallet",
      title: "钱包"
    }), r("div", Mb, [
      Ce(ab, {
        balance: n.value.balance,
        currency: n.value.currency,
        status: n.value.status
      }, null, 8, [
        "balance",
        "currency",
        "status"
      ]),
      $.value ? (m(), ye(ob, {
        key: 0,
        class: "wallet-notice",
        tone: x.value,
        title: D.value,
        message: i.value || n.value.message
      }, {
        default: Ma(() => [v.value ? (m(), y("button", {
          key: 0,
          type: "button",
          class: "wallet-ui-text-button",
          disabled: a.value,
          onClick: z
        }, b(a.value ? "正在核实…" : "核实保存结果"), 9, Ib)) : n.value.status === "blocked" || i.value ? (m(), y("button", {
          key: 1,
          type: "button",
          class: "wallet-ui-text-button",
          disabled: g.value,
          onClick: V
        }, b(a.value ? "正在读取…" : "重新读取"), 9, Pb)) : F("", !0)]),
        _: 1
      }, 8, [
        "tone",
        "title",
        "message"
      ])) : F("", !0),
      r("section", Ob, [r("div", Lb, [E[0] || (E[0] = r("h2", { id: "wallet-ledger-title" }, "流水明细", -1)), r("small", null, b(n.value.transactionCount) + " 笔", 1)]), r("div", Db, [Ce(Ab, {
        transactions: n.value.transactions,
        "has-more": n.value.hasMore,
        "loading-more": s.value,
        error: l.value,
        onLoadMore: R
      }, null, 8, [
        "transactions",
        "has-more",
        "loading-more",
        "error"
      ])])])
    ])]));
  }
}), Rb = Nb, Bb = Object.freeze([
  {
    ...ju,
    iconPaths: ["M14 11h36a4 4 0 0 1 4 4v34a4 4 0 0 1-4 4H14a4 4 0 0 1-4-4V15a4 4 0 0 1 4-4z", "M19 24h26M19 34h18M19 44h11M45 44h.1"],
    component: mc
  },
  {
    ...Ap,
    iconPaths: ["M13 15h38v29H32l-12 9 3-9H13z", "M22 25h20M22 33h14"],
    component: jg
  },
  {
    ...Gm,
    iconPaths: ["M12 19.5h37a5 5 0 0 1 5 5v24a5 5 0 0 1-5 5H15a5 5 0 0 1-5-5v-30a8 8 0 0 1 8-8h27", "M54 30H42a6 6 0 0 0 0 12h12M43 36h.1"],
    component: Rb
  },
  {
    ...Kg,
    iconPaths: ["M14 19h36l-3 35H17z", "M11 19h42M19 19V11h26v8M23 29h18M22 38h20M21 47h22"],
    component: Vm
  },
  {
    ...bc,
    iconPaths: ["M9 24h46L32 9z", "M14 52h36M18 24v28M28 24v28M38 24v28M48 24v28"],
    component: jf
  },
  {
    ...Kf,
    iconPaths: ["M15 12h34a6 6 0 0 1 6 6v28a6 6 0 0 1-6 6H15a6 6 0 0 1-6-6V18a6 6 0 0 1 6-6z", "M21 23h.1M43 23h.1M32 32h.1M21 41h.1M43 41h.1"],
    component: Tp
  }
]), qb = { class: "xiaobai-os-home" }, Ub = ["src"], Fb = {
  class: "xiaobai-os-app-grid",
  "aria-label": "应用"
}, Hb = ["onClick"], jb = {
  class: "xiaobai-os-app-icon",
  "aria-hidden": "true"
}, Kb = { viewBox: "0 0 64 64" }, Vb = ["d"], Gb = { class: "xiaobai-os-app-name" }, zb = /* @__PURE__ */ ue({
  __name: "XiaobaiOsHome",
  props: {
    apps: {},
    characterAvatar: {}
  },
  emits: ["openApp"],
  setup(e) {
    return (t, n) => (m(), y("main", qb, [
      e.characterAvatar ? (m(), y("img", {
        key: 0,
        class: "xiaobai-os-wallpaper",
        src: e.characterAvatar,
        alt: ""
      }, null, 8, Ub)) : F("", !0),
      n[0] || (n[0] = r("div", {
        class: "xiaobai-os-home-wash",
        "aria-hidden": "true"
      }, null, -1)),
      r("section", Fb, [(m(!0), y(ae, null, ke(e.apps, (a) => (m(), y("button", {
        key: a.id,
        type: "button",
        class: "xiaobai-os-app-tile",
        style: vn({ "--app-accent": a.accent }),
        onClick: (s) => t.$emit("openApp", a)
      }, [r("span", jb, [(m(), y("svg", Kb, [(m(!0), y(ae, null, ke(a.iconPaths, (s) => (m(), y("path", {
        key: s,
        d: s
      }, null, 8, Vb))), 128))]))]), r("span", Gb, b(a.name), 1)], 12, Hb))), 128))])
    ]));
  }
}), Wb = zb, Jb = ["disabled"], Xb = {
  key: 0,
  "aria-hidden": "true"
}, Yb = /* @__PURE__ */ ue({
  __name: "XiaobaiOsNavigation",
  props: { isHome: { type: Boolean } },
  emits: [
    "back",
    "home",
    "close"
  ],
  setup(e) {
    return (t, n) => (m(), y("nav", {
      class: oe(["xiaobai-os-navigation", { "is-home": e.isHome }]),
      "aria-label": "系统导航"
    }, [
      r("button", {
        type: "button",
        class: "xiaobai-os-nav-button",
        disabled: e.isHome,
        "aria-label": "返回",
        onClick: n[0] || (n[0] = (a) => t.$emit("back"))
      }, [...n[3] || (n[3] = [r("svg", {
        viewBox: "0 0 24 24",
        "aria-hidden": "true"
      }, [r("path", { d: "m14.5 6-6 6 6 6" })], -1)])], 8, Jb),
      r("button", {
        type: "button",
        class: "xiaobai-os-nav-button xiaobai-os-home-button",
        "aria-label": "主页",
        onClick: n[1] || (n[1] = (a) => t.$emit("home"))
      }, [n[4] || (n[4] = r("svg", {
        viewBox: "0 0 24 24",
        "aria-hidden": "true"
      }, [r("path", { d: "m4.5 11 7.5-6 7.5 6v8h-5v-5h-5v5h-5z" })], -1)), e.isHome ? (m(), y("i", Xb)) : F("", !0)]),
      r("button", {
        type: "button",
        class: "xiaobai-os-nav-button xiaobai-os-close-button",
        "aria-label": "关闭",
        onClick: n[2] || (n[2] = (a) => t.$emit("close"))
      }, [...n[5] || (n[5] = [r("span", null, [r("svg", {
        viewBox: "0 0 24 24",
        "aria-hidden": "true"
      }, [r("path", { d: "m7 9.5 5 5 5-5" })])], -1)])])
    ], 2));
  }
}), Qb = Yb, Zb = /* @__PURE__ */ ue({
  __name: "XiaobaiOsSystemBar",
  props: { isHome: { type: Boolean } },
  setup(e) {
    return (t, n) => (m(), y("header", {
      class: oe(["xiaobai-os-system-bar", { "is-home": e.isHome }]),
      "aria-label": "系统状态"
    }, [...n[0] || (n[0] = [r("span", { class: "xiaobai-os-system-mark" }, "小白", -1), r("span", {
      class: "xiaobai-os-system-status",
      "aria-hidden": "true"
    }, [r("span", { class: "xiaobai-os-signal" }, [
      r("i"),
      r("i"),
      r("i"),
      r("i")
    ]), r("span", { class: "xiaobai-os-battery" }, [r("i")])], -1)])], 2));
  }
}), eh = Zb, th = { class: "xiaobai-os-device" }, nh = { class: "xiaobai-os-glass" }, ah = /* @__PURE__ */ ue({
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
    const t = e, n = ee(() => t.activeApp === null);
    return (a, s) => (m(), y("div", th, [s[4] || (s[4] = r("span", {
      class: "xiaobai-os-side-key",
      "aria-hidden": "true"
    }, null, -1)), r("div", nh, [
      Ce(eh, { "is-home": n.value }, null, 8, ["is-home"]),
      r("div", {
        class: "xiaobai-os-stage",
        style: vn(e.activeApp ? { "--app-accent": e.activeApp.accent } : null)
      }, [Ce(fu, {
        name: "xiaobai-os-route",
        mode: "out-in"
      }, {
        default: Ma(() => [n.value ? (m(), ye(Wb, {
          key: "home",
          apps: e.apps,
          "character-avatar": e.characterAvatar,
          onOpenApp: s[0] || (s[0] = (i) => a.$emit("openApp", i))
        }, null, 8, ["apps", "character-avatar"])) : e.activeApp ? (m(), ye(ho(e.activeApp.component), {
          key: "app",
          bridge: e.bridge,
          "initial-state": e.activeState
        }, null, 8, ["bridge", "initial-state"])) : F("", !0)]),
        _: 1
      })], 4),
      Ce(Qb, {
        "is-home": n.value,
        onBack: s[1] || (s[1] = (i) => a.$emit("back")),
        onHome: s[2] || (s[2] = (i) => a.$emit("home")),
        onClose: s[3] || (s[3] = (i) => a.$emit("close"))
      }, null, 8, ["is-home"])
    ])]));
  }
}), sh = ah, ih = "LittleWhiteBox-XiaobaiOS";
function rh() {
  return `xiaobai-os-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
}
function lh() {
  const e = /* @__PURE__ */ new Map(), t = /* @__PURE__ */ new Set();
  let n = !1;
  function a(d, g = {}, $ = "") {
    parent.postMessage({
      source: ih,
      type: d,
      requestId: $,
      payload: g
    }, window.location.origin);
  }
  function s(d) {
    const g = String(d.requestId || "");
    if (!g) return !1;
    const $ = e.get(g);
    if (!$) return !1;
    e.delete(g), clearTimeout($.timer);
    const x = d.payload;
    return x?.ok === !1 ? $.reject(new Error(x.error || "host_request_failed")) : $.resolve(x), !0;
  }
  function i(d) {
    d.origin !== window.location.origin || d.source !== parent || d.data?.source !== "LittleWhiteBox-XiaobaiOS" || typeof d.data.type != "string" || s(d.data) || t.forEach((g) => g(d.data));
  }
  function l() {
    n || (n = !0, window.addEventListener("message", i), a("os/frame-ready"));
  }
  function o(d, g = {}, $ = 15e3) {
    const x = rh();
    return new Promise((D, P) => {
      const X = setTimeout(() => {
        e.delete(x), P(/* @__PURE__ */ new Error("host_request_timeout"));
      }, $);
      e.set(x, {
        resolve: D,
        reject: P,
        timer: X
      }), a(d, g, x);
    });
  }
  function u(d) {
    return t.add(d), () => t.delete(d);
  }
  function v() {
    n && window.removeEventListener("message", i), n = !1, t.clear(), e.forEach((d) => {
      clearTimeout(d.timer), d.reject(/* @__PURE__ */ new Error("frame_bridge_disposed"));
    }), e.clear();
  }
  return Object.freeze({
    start: l,
    post: a,
    request: o,
    subscribe: u,
    dispose: v
  });
}
var oh = {
  key: 0,
  class: "xiaobai-os-error",
  role: "alert"
}, uh = {
  key: 1,
  class: "xiaobai-os-loading",
  role: "status"
}, dh = /* @__PURE__ */ ue({
  __name: "App",
  setup(e) {
    const t = lh(), n = /* @__PURE__ */ Y(null), a = /* @__PURE__ */ Y(!1), s = /* @__PURE__ */ Y("light"), i = /* @__PURE__ */ Y(/* @__PURE__ */ new Set()), l = /* @__PURE__ */ Y(""), o = /* @__PURE__ */ Y(null), u = /* @__PURE__ */ Y(null), v = /* @__PURE__ */ Y("");
    let d = null, g = () => {
    }, $ = 0, x = null;
    const D = ee(() => Bb.filter((C) => i.value.has(C.id)));
    function P(C) {
      $ += 1, x = null, s.value = C.theme === "dark" ? "dark" : "light", i.value = new Set((C.apps || []).map((E) => String(E.id))), l.value = String(C.chat?.characterAvatar || ""), o.value = null, u.value = null, a.value = !0;
    }
    function X(C) {
      C.type === "os/init" && P(C.payload || {}), C.type === "os/theme-changed" && (s.value = C.payload?.theme === "dark" ? "dark" : "light"), C.type === "os/error" && (v.value = String(C.payload?.message || "小白 OS 初始化失败"));
      const E = C.payload?.state;
      x && C.type === `${x.appId}/state` && (x.latestState = E), o.value && C.type === `${o.value.id}/state` && (u.value = E);
    }
    async function G(C) {
      const E = ++$, k = { appId: C.id };
      x = k, v.value = "";
      try {
        const w = await t.request("app/activate", { appId: C.id });
        if (E !== $) return;
        if (w.appId !== C.id) throw new Error("app_activation_mismatch");
        u.value = k.latestState ?? w.state ?? null, o.value = C;
      } catch (w) {
        if (E !== $) return;
        o.value = null, v.value = w instanceof Error ? w.message : String(w);
      } finally {
        x === k && (x = null);
      }
    }
    function V() {
      $ += 1, x = null, t.post("app/deactivate", { appId: o.value?.id || "" }), o.value = null, u.value = null;
    }
    function z() {
      $ += 1, x = null, t.post("os/close");
    }
    function R(C) {
      if (C.key === "Escape") {
        C.preventDefault(), o.value ? V() : z();
        return;
      }
      if (C.key !== "Tab" || !n.value) return;
      const E = Array.from(n.value.querySelectorAll('button:not(:disabled), [href], input:not(:disabled), textarea:not(:disabled), [tabindex]:not([tabindex="-1"])'));
      if (E.length === 0) return;
      const k = E[0], w = E[E.length - 1];
      C.shiftKey && document.activeElement === k ? (C.preventDefault(), w.focus()) : !C.shiftKey && document.activeElement === w && (C.preventDefault(), k.focus());
    }
    return ft(async () => {
      d = document.activeElement instanceof HTMLElement ? document.activeElement : null, g = t.subscribe(X), t.start(), await Jn(), n.value?.focus();
    }), vt(() => {
      $ += 1, x = null, g(), t.dispose(), d?.focus();
    }), (C, E) => (m(), y("main", {
      ref_key: "root",
      ref: n,
      class: oe(["xiaobai-os-shell", `theme-${s.value}`]),
      role: "dialog",
      "aria-modal": "true",
      "aria-label": "小白 OS",
      tabindex: "-1",
      onKeydown: R,
      onClick: wt(z, ["self"])
    }, [v.value ? (m(), y("div", oh, b(v.value), 1)) : F("", !0), a.value ? (m(), ye(sh, {
      key: 2,
      apps: D.value,
      "active-app": o.value,
      "active-state": u.value,
      bridge: ln(t),
      "character-avatar": l.value,
      onOpenApp: G,
      onBack: V,
      onHome: V,
      onClose: z
    }, null, 8, [
      "apps",
      "active-app",
      "active-state",
      "bridge",
      "character-avatar"
    ])) : (m(), y("div", uh, "正在启动小白 OS"))], 34));
  }
}), ch = dh;
Uu(ch).mount("#app");
