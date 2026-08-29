/* eslint-disable */
// @__NO_SIDE_EFFECTS__
function Ts(e) {
  const t = /* @__PURE__ */ Object.create(null);
  for (const s of e.split(",")) t[s] = 1;
  return (s) => s in t;
}
var Q = {}, It = [], Ke = () => {
}, An = () => !1, Is = (e) => e.charCodeAt(0) === 111 && e.charCodeAt(1) === 110 && (e.charCodeAt(2) > 122 || e.charCodeAt(2) < 97), Es = (e) => e.startsWith("onUpdate:"), oe = Object.assign, gr = (e, t) => {
  const s = e.indexOf(t);
  s > -1 && e.splice(s, 1);
}, Ui = Object.prototype.hasOwnProperty, J = (e, t) => Ui.call(e, t), N = Array.isArray, Et = (e) => ss(e) === "[object Map]", Os = (e) => ss(e) === "[object Set]", Rr = (e) => ss(e) === "[object Date]", W = (e) => typeof e == "function", ne = (e) => typeof e == "string", qe = (e) => typeof e == "symbol", Y = (e) => e !== null && typeof e == "object", Tn = (e) => (Y(e) || W(e)) && W(e.then) && W(e.catch), In = Object.prototype.toString, ss = (e) => In.call(e), Wi = (e) => ss(e).slice(8, -1), En = (e) => ss(e) === "[object Object]", mr = (e) => ne(e) && e !== "NaN" && e[0] !== "-" && "" + parseInt(e, 10) === e, jt = /* @__PURE__ */ Ts(",key,ref,ref_for,ref_key,onVnodeBeforeMount,onVnodeMounted,onVnodeBeforeUpdate,onVnodeUpdated,onVnodeBeforeUnmount,onVnodeUnmounted"), $s = (e) => {
  const t = /* @__PURE__ */ Object.create(null);
  return ((s) => t[s] || (t[s] = e(s)));
}, Ki = /-\w/g, Ce = $s((e) => e.replace(Ki, (t) => t.slice(1).toUpperCase())), qi = /\B([A-Z])/g, Ct = $s((e) => e.replace(qi, "-$1").toLowerCase()), Ms = $s((e) => e.charAt(0).toUpperCase() + e.slice(1)), Ks = $s((e) => e ? `on${Ms(e)}` : ""), We = (e, t) => !Object.is(e, t), ps = (e, ...t) => {
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
}, Gi = (e) => {
  const t = ne(e) ? Number(e) : NaN;
  return isNaN(t) ? e : t;
}, Hr, ks = () => Hr || (Hr = typeof globalThis < "u" ? globalThis : typeof self < "u" ? self : typeof window < "u" ? window : typeof globalThis < "u" ? globalThis : {});
function Ps(e) {
  if (N(e)) {
    const t = {};
    for (let s = 0; s < e.length; s++) {
      const r = e[s], n = ne(r) ? Yi(r) : Ps(r);
      if (n) for (const i in n) t[i] = n[i];
    }
    return t;
  } else if (ne(e) || Y(e)) return e;
}
var Xi = /;(?![^(]*\))/g, zi = /:([^]+)/, Ji = /\/\*[^]*?\*\//g;
function Yi(e) {
  const t = {};
  return e.replace(Ji, "").split(Xi).forEach((s) => {
    if (s) {
      const r = s.split(zi);
      r.length > 1 && (t[r[0].trim()] = r[1].trim());
    }
  }), t;
}
function ct(e) {
  let t = "";
  if (ne(e)) t = e;
  else if (N(e)) for (let s = 0; s < e.length; s++) {
    const r = ct(e[s]);
    r && (t += r + " ");
  }
  else if (Y(e))
    for (const s in e) e[s] && (t += s + " ");
  return t.trim();
}
var $n = "itemscope,allowfullscreen,formnovalidate,ismap,nomodule,novalidate,readonly", Qi = /* @__PURE__ */ Ts($n), af = /* @__PURE__ */ Ts($n + ",async,autofocus,autoplay,controls,default,defer,disabled,hidden,inert,loop,open,required,reversed,scoped,seamless,checked,muted,multiple,selected");
function Mn(e) {
  return !!e || e === "";
}
function Zi(e, t) {
  if (e.length !== t.length) return !1;
  let s = !0;
  for (let r = 0; s && r < e.length; r++) s = rs(e[r], t[r]);
  return s;
}
function rs(e, t) {
  if (e === t) return !0;
  let s = Rr(e), r = Rr(t);
  if (s || r) return s && r ? e.getTime() === t.getTime() : !1;
  if (s = qe(e), r = qe(t), s || r) return e === t;
  if (s = N(e), r = N(t), s || r) return s && r ? Zi(e, t) : !1;
  if (s = Y(e), r = Y(t), s || r) {
    if (!s || !r || Object.keys(e).length !== Object.keys(t).length) return !1;
    for (const n in e) {
      const i = e.hasOwnProperty(n), l = t.hasOwnProperty(n);
      if (i && !l || !i && l || !rs(e[n], t[n])) return !1;
    }
  }
  return String(e) === String(t);
}
function kn(e, t) {
  return e.findIndex((s) => rs(s, t));
}
var Pn = (e) => !!(e && e.__v_isRef === !0), le = (e) => ne(e) ? e : e == null ? "" : N(e) || Y(e) && (e.toString === In || !W(e.toString)) ? Pn(e) ? le(e.value) : JSON.stringify(e, Fn, 2) : String(e), Fn = (e, t) => Pn(t) ? Fn(e, t.value) : Et(t) ? { [`Map(${t.size})`]: [...t.entries()].reduce((s, [r, n], i) => (s[qs(r, i) + " =>"] = n, s), {}) } : Os(t) ? { [`Set(${t.size})`]: [...t.values()].map((s) => qs(s)) } : qe(t) ? qs(t) : Y(t) && !N(t) && !En(t) ? String(t) : t, qs = (e, t = "") => {
  var s;
  return qe(e) ? `Symbol(${(s = e.description) != null ? s : t})` : e;
}, he, el = class {
  constructor(e = !1) {
    this.detached = e, this._active = !0, this._on = 0, this.effects = [], this.cleanups = [], this._isPaused = !1, this._warnOnRun = !0, this.__v_skip = !0, !e && he && (he.active ? (this.parent = he, this.index = (he.scopes || (he.scopes = [])).push(this) - 1) : (this._active = !1, this._warnOnRun = !1));
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
      const t = he;
      try {
        return he = this, e();
      } finally {
        he = t;
      }
    }
  }
  on() {
    ++this._on === 1 && (this.prevScope = he, he = this);
  }
  off() {
    if (this._on > 0 && --this._on === 0) {
      if (he === this) he = this.prevScope;
      else {
        let e = he;
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
function tl() {
  return he;
}
var se, Gs = /* @__PURE__ */ new WeakSet(), Dn = class {
  constructor(e) {
    this.fn = e, this.deps = void 0, this.depsTail = void 0, this.flags = 5, this.next = void 0, this.cleanup = void 0, this.scheduler = void 0, he && (he.active ? he.effects.push(this) : this.flags &= -2);
  }
  pause() {
    this.flags |= 64;
  }
  resume() {
    this.flags & 64 && (this.flags &= -65, Gs.has(this) && (Gs.delete(this), this.trigger()));
  }
  notify() {
    this.flags & 2 && !(this.flags & 32) || this.flags & 8 || Rn(this);
  }
  run() {
    if (!(this.flags & 1)) return this.fn();
    this.flags |= 2, Nr(this), Hn(this);
    const e = se, t = Le;
    se = this, Le = !0;
    try {
      return this.fn();
    } finally {
      Nn(this), se = e, Le = t, this.flags &= -3;
    }
  }
  stop() {
    if (this.flags & 1) {
      for (let e = this.deps; e; e = e.nextDep) wr(e);
      this.deps = this.depsTail = void 0, Nr(this), this.onStop && this.onStop(), this.flags &= -2;
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
}, Ln = 0, Ut, Wt;
function Rn(e, t = !1) {
  if (e.flags |= 8, t) {
    e.next = Wt, Wt = e;
    return;
  }
  e.next = Ut, Ut = e;
}
function yr() {
  Ln++;
}
function _r() {
  if (--Ln > 0) return;
  if (Wt) {
    let t = Wt;
    for (Wt = void 0; t; ) {
      const s = t.next;
      t.next = void 0, t.flags &= -9, t = s;
    }
  }
  let e;
  for (; Ut; ) {
    let t = Ut;
    for (Ut = void 0; t; ) {
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
function Nn(e) {
  let t, s = e.depsTail, r = s;
  for (; r; ) {
    const n = r.prevDep;
    r.version === -1 ? (r === s && (s = n), wr(r), sl(r)) : t = r, r.dep.activeLink = r.prevActiveLink, r.prevActiveLink = void 0, r = n;
  }
  e.deps = t, e.depsTail = s;
}
function nr(e) {
  for (let t = e.deps; t; t = t.nextDep) if (t.dep.version !== t.version || t.dep.computed && (Vn(t.dep.computed) || t.dep.version !== t.version)) return !0;
  return !!e._dirty;
}
function Vn(e) {
  if (e.flags & 4 && !(e.flags & 16) || (e.flags &= -17, e.globalVersion === zt) || (e.globalVersion = zt, !e.isSSR && e.flags & 128 && (!e.deps && !e._dirty || !nr(e)))) return;
  e.flags |= 2;
  const t = e.dep, s = se, r = Le;
  se = e, Le = !0;
  try {
    Hn(e);
    const n = e.fn(e._value);
    (t.version === 0 || We(n, e._value)) && (e.flags |= 128, e._value = n, t.version++);
  } catch (n) {
    throw t.version++, n;
  } finally {
    se = s, Le = r, Nn(e), e.flags &= -3;
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
function sl(e) {
  const { prevDep: t, nextDep: s } = e;
  t && (t.nextDep = s, e.prevDep = void 0), s && (s.prevDep = t, e.nextDep = void 0);
}
var Le = !0, Bn = [];
function tt() {
  Bn.push(Le), Le = !1;
}
function st() {
  const e = Bn.pop();
  Le = e === void 0 ? !0 : e;
}
function Nr(e) {
  const { cleanup: t } = e;
  if (e.cleanup = void 0, t) {
    const s = se;
    se = void 0;
    try {
      t();
    } finally {
      se = s;
    }
  }
}
var zt = 0, rl = class {
  constructor(e, t) {
    this.sub = e, this.dep = t, this.version = t.version, this.nextDep = this.prevDep = this.nextSub = this.prevSub = this.prevActiveLink = void 0;
  }
}, xr = class {
  constructor(e) {
    this.computed = e, this.version = 0, this.activeLink = void 0, this.subs = void 0, this.map = void 0, this.key = void 0, this.sc = 0, this.__v_skip = !0;
  }
  track(e) {
    if (!se || !Le || se === this.computed) return;
    let t = this.activeLink;
    if (t === void 0 || t.sub !== se)
      t = this.activeLink = new rl(se, this), se.deps ? (t.prevDep = se.depsTail, se.depsTail.nextDep = t, se.depsTail = t) : se.deps = se.depsTail = t, jn(t);
    else if (t.version === -1 && (t.version = this.version, t.nextDep)) {
      const s = t.nextDep;
      s.prevDep = t.prevDep, t.prevDep && (t.prevDep.nextDep = s), t.prevDep = se.depsTail, t.nextDep = void 0, se.depsTail.nextDep = t, se.depsTail = t, se.deps === t && (se.deps = s);
    }
    return t;
  }
  trigger(e) {
    this.version++, zt++, this.notify(e);
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
function jn(e) {
  if (e.dep.sc++, e.sub.flags & 4) {
    const t = e.dep.computed;
    if (t && !e.dep.subs) {
      t.flags |= 20;
      for (let r = t.deps; r; r = r.nextDep) jn(r);
    }
    const s = e.dep.subs;
    s !== e && (e.prevSub = s, s && (s.nextSub = e)), e.dep.subs = e;
  }
}
var ir = /* @__PURE__ */ new WeakMap(), yt = /* @__PURE__ */ Symbol(""), lr = /* @__PURE__ */ Symbol(""), Jt = /* @__PURE__ */ Symbol("");
function me(e, t, s) {
  if (Le && se) {
    let r = ir.get(e);
    r || ir.set(e, r = /* @__PURE__ */ new Map());
    let n = r.get(s);
    n || (r.set(s, n = new xr()), n.map = r, n.key = s), n.track();
  }
}
function Qe(e, t, s, r, n, i) {
  const l = ir.get(e);
  if (!l) {
    zt++;
    return;
  }
  const o = (a) => {
    a && a.trigger();
  };
  if (yr(), t === "clear") l.forEach(o);
  else {
    const a = N(e), c = a && mr(s);
    if (a && s === "length") {
      const u = Number(r);
      l.forEach((h, g) => {
        (g === "length" || g === Jt || !qe(g) && g >= u) && o(h);
      });
    } else
      switch ((s !== void 0 || l.has(void 0)) && o(l.get(s)), c && o(l.get(Jt)), t) {
        case "add":
          a ? c && o(l.get("length")) : (o(l.get(yt)), Et(e) && o(l.get(lr)));
          break;
        case "delete":
          a || (o(l.get(yt)), Et(e) && o(l.get(lr)));
          break;
        case "set":
          Et(e) && o(l.get(yt));
          break;
      }
  }
  _r();
}
function At(e) {
  const t = /* @__PURE__ */ K(e);
  return t === e ? t : (me(t, "iterate", Jt), /* @__PURE__ */ Pe(e) ? t : t.map(Re));
}
function Fs(e) {
  return me(e = /* @__PURE__ */ K(e), "iterate", Jt), e;
}
function je(e, t) {
  return /* @__PURE__ */ rt(e) ? Pt(/* @__PURE__ */ _t(e) ? Re(t) : t) : Re(t);
}
var nl = {
  __proto__: null,
  [Symbol.iterator]() {
    return Xs(this, Symbol.iterator, (e) => je(this, e));
  },
  concat(...e) {
    return At(this).concat(...e.map((t) => N(t) ? At(t) : t));
  },
  entries() {
    return Xs(this, "entries", (e) => (e[1] = je(this, e[1]), e));
  },
  every(e, t) {
    return Xe(this, "every", e, t, void 0, arguments);
  },
  filter(e, t) {
    return Xe(this, "filter", e, t, (s) => s.map((r) => je(this, r)), arguments);
  },
  find(e, t) {
    return Xe(this, "find", e, t, (s) => je(this, s), arguments);
  },
  findIndex(e, t) {
    return Xe(this, "findIndex", e, t, void 0, arguments);
  },
  findLast(e, t) {
    return Xe(this, "findLast", e, t, (s) => je(this, s), arguments);
  },
  findLastIndex(e, t) {
    return Xe(this, "findLastIndex", e, t, void 0, arguments);
  },
  forEach(e, t) {
    return Xe(this, "forEach", e, t, void 0, arguments);
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
    return Xe(this, "map", e, t, void 0, arguments);
  },
  pop() {
    return Lt(this, "pop");
  },
  push(...e) {
    return Lt(this, "push", e);
  },
  reduce(e, ...t) {
    return Vr(this, "reduce", e, t);
  },
  reduceRight(e, ...t) {
    return Vr(this, "reduceRight", e, t);
  },
  shift() {
    return Lt(this, "shift");
  },
  some(e, t) {
    return Xe(this, "some", e, t, void 0, arguments);
  },
  splice(...e) {
    return Lt(this, "splice", e);
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
    return Lt(this, "unshift", e);
  },
  values() {
    return Xs(this, "values", (e) => je(this, e));
  }
};
function Xs(e, t, s) {
  const r = Fs(e), n = r[t]();
  return r !== e && !/* @__PURE__ */ Pe(e) && (n._next = n.next, n.next = () => {
    const i = n._next();
    return i.done || (i.value = s(i.value)), i;
  }), n;
}
var il = Array.prototype;
function Xe(e, t, s, r, n, i) {
  const l = Fs(e), o = l !== e && !/* @__PURE__ */ Pe(e), a = l[t];
  if (a !== il[t]) {
    const h = a.apply(e, i);
    return o ? Re(h) : h;
  }
  let c = s;
  l !== e && (o ? c = function(h, g) {
    return s.call(this, je(e, h), g, e);
  } : s.length > 2 && (c = function(h, g) {
    return s.call(this, h, g, e);
  }));
  const u = a.call(l, c, r);
  return o && n ? n(u) : u;
}
function Vr(e, t, s, r) {
  const n = Fs(e), i = n !== e && !/* @__PURE__ */ Pe(e);
  let l = s, o = !1;
  n !== e && (i ? (o = r.length === 0, l = function(c, u, h) {
    return o && (o = !1, c = je(e, c)), s.call(this, c, je(e, u), h, e);
  }) : s.length > 3 && (l = function(c, u, h) {
    return s.call(this, c, u, h, e);
  }));
  const a = n[t](l, ...r);
  return o ? je(e, a) : a;
}
function zs(e, t, s) {
  const r = /* @__PURE__ */ K(e);
  me(r, "iterate", Jt);
  const n = r[t](...s);
  return (n === -1 || n === !1) && /* @__PURE__ */ Ar(s[0]) ? (s[0] = /* @__PURE__ */ K(s[0]), r[t](...s)) : n;
}
function Lt(e, t, s = []) {
  tt(), yr();
  const r = (/* @__PURE__ */ K(e))[t].apply(e, s);
  return _r(), st(), r;
}
var ll = /* @__PURE__ */ Ts("__proto__,__v_isRef,__isVue"), Un = new Set(/* @__PURE__ */ Object.getOwnPropertyNames(Symbol).filter((e) => e !== "arguments" && e !== "caller").map((e) => Symbol[e]).filter(qe));
function ol(e) {
  qe(e) || (e = String(e));
  const t = /* @__PURE__ */ K(this);
  return me(t, "has", e), t.hasOwnProperty(e);
}
var Wn = class {
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
      return s === (r ? n ? ml : Xn : n ? Gn : qn).get(e) || Object.getPrototypeOf(e) === Object.getPrototypeOf(s) ? e : void 0;
    const i = N(e);
    if (!r) {
      let o;
      if (i && (o = nl[t])) return o;
      if (t === "hasOwnProperty") return ol;
    }
    const l = Reflect.get(e, t, /* @__PURE__ */ ye(e) ? e : s);
    if ((qe(t) ? Un.has(t) : ll(t)) || (r || me(e, "get", t), n)) return l;
    if (/* @__PURE__ */ ye(l)) {
      const o = i && mr(t) ? l : l.value;
      return r && Y(o) ? /* @__PURE__ */ ar(o) : o;
    }
    return Y(l) ? r ? /* @__PURE__ */ ar(l) : /* @__PURE__ */ wt(l) : l;
  }
}, Kn = class extends Wn {
  constructor(e = !1) {
    super(!1, e);
  }
  set(e, t, s, r) {
    let n = e[t];
    const i = N(e) && mr(t);
    if (!this._isShallow) {
      const a = /* @__PURE__ */ rt(n);
      if (!/* @__PURE__ */ Pe(s) && !/* @__PURE__ */ rt(s) && (n = /* @__PURE__ */ K(n), s = /* @__PURE__ */ K(s)), !i && /* @__PURE__ */ ye(n) && !/* @__PURE__ */ ye(s)) return a || (n.value = s), !0;
    }
    const l = i ? Number(t) < e.length : J(e, t), o = Reflect.set(e, t, s, /* @__PURE__ */ ye(e) ? e : r);
    return e === /* @__PURE__ */ K(r) && (l ? We(s, n) && Qe(e, "set", t, s, n) : Qe(e, "add", t, s)), o;
  }
  deleteProperty(e, t) {
    const s = J(e, t), r = e[t], n = Reflect.deleteProperty(e, t);
    return n && s && Qe(e, "delete", t, void 0, r), n;
  }
  has(e, t) {
    const s = Reflect.has(e, t);
    return (!qe(t) || !Un.has(t)) && me(e, "has", t), s;
  }
  ownKeys(e) {
    return me(e, "iterate", N(e) ? "length" : yt), Reflect.ownKeys(e);
  }
}, al = class extends Wn {
  constructor(e = !1) {
    super(!0, e);
  }
  set(e, t) {
    return !0;
  }
  deleteProperty(e, t) {
    return !0;
  }
}, ul = /* @__PURE__ */ new Kn(), fl = /* @__PURE__ */ new al(), cl = /* @__PURE__ */ new Kn(!0), or = (e) => e, cs = (e) => Reflect.getPrototypeOf(e);
function dl(e, t, s) {
  return function(...r) {
    const n = this.__v_raw, i = /* @__PURE__ */ K(n), l = Et(i), o = e === "entries" || e === Symbol.iterator && l, a = e === "keys" && l, c = n[e](...r), u = s ? or : t ? Pt : Re;
    return !t && me(i, "iterate", a ? lr : yt), oe(Object.create(c), { next() {
      const { value: h, done: g } = c.next();
      return g ? {
        value: h,
        done: g
      } : {
        value: o ? [u(h[0]), u(h[1])] : u(h),
        done: g
      };
    } });
  };
}
function ds(e) {
  return function(...t) {
    return e === "delete" ? !1 : e === "clear" ? void 0 : this;
  };
}
function hl(e, t) {
  const s = {
    get(r) {
      const n = this.__v_raw, i = /* @__PURE__ */ K(n), l = /* @__PURE__ */ K(r);
      e || (We(r, l) && me(i, "get", r), me(i, "get", l));
      const { has: o } = cs(i), a = t ? or : e ? Pt : Re;
      if (o.call(i, r)) return a(n.get(r));
      if (o.call(i, l)) return a(n.get(l));
      n !== i && n.get(r);
    },
    get size() {
      const r = this.__v_raw;
      return !e && me(/* @__PURE__ */ K(r), "iterate", yt), r.size;
    },
    has(r) {
      const n = this.__v_raw, i = /* @__PURE__ */ K(n), l = /* @__PURE__ */ K(r);
      return e || (We(r, l) && me(i, "has", r), me(i, "has", l)), r === l ? n.has(r) : n.has(r) || n.has(l);
    },
    forEach(r, n) {
      const i = this, l = i.__v_raw, o = /* @__PURE__ */ K(l), a = t ? or : e ? Pt : Re;
      return !e && me(o, "iterate", yt), l.forEach((c, u) => r.call(n, a(c), a(u), i));
    }
  };
  return oe(s, e ? {
    add: ds("add"),
    set: ds("set"),
    delete: ds("delete"),
    clear: ds("clear")
  } : {
    add(r) {
      const n = /* @__PURE__ */ K(this), i = cs(n), l = /* @__PURE__ */ K(r), o = !t && !/* @__PURE__ */ Pe(r) && !/* @__PURE__ */ rt(r) ? l : r;
      return i.has.call(n, o) || We(r, o) && i.has.call(n, r) || We(l, o) && i.has.call(n, l) || (n.add(o), Qe(n, "add", o, o)), this;
    },
    set(r, n) {
      !t && !/* @__PURE__ */ Pe(n) && !/* @__PURE__ */ rt(n) && (n = /* @__PURE__ */ K(n));
      const i = /* @__PURE__ */ K(this), { has: l, get: o } = cs(i);
      let a = l.call(i, r);
      a || (r = /* @__PURE__ */ K(r), a = l.call(i, r));
      const c = o.call(i, r);
      return i.set(r, n), a ? We(n, c) && Qe(i, "set", r, n, c) : Qe(i, "add", r, n), this;
    },
    delete(r) {
      const n = /* @__PURE__ */ K(this), { has: i, get: l } = cs(n);
      let o = i.call(n, r);
      o || (r = /* @__PURE__ */ K(r), o = i.call(n, r));
      const a = l ? l.call(n, r) : void 0, c = n.delete(r);
      return o && Qe(n, "delete", r, void 0, a), c;
    },
    clear() {
      const r = /* @__PURE__ */ K(this), n = r.size !== 0, i = void 0, l = r.clear();
      return n && Qe(r, "clear", void 0, void 0, i), l;
    }
  }), [
    "keys",
    "values",
    "entries",
    Symbol.iterator
  ].forEach((r) => {
    s[r] = dl(r, e, t);
  }), s;
}
function Cr(e, t) {
  const s = hl(e, t);
  return (r, n, i) => n === "__v_isReactive" ? !e : n === "__v_isReadonly" ? e : n === "__v_raw" ? r : Reflect.get(J(s, n) && n in r ? s : r, n, i);
}
var pl = { get: /* @__PURE__ */ Cr(!1, !1) }, vl = { get: /* @__PURE__ */ Cr(!1, !0) }, gl = { get: /* @__PURE__ */ Cr(!0, !1) }, qn = /* @__PURE__ */ new WeakMap(), Gn = /* @__PURE__ */ new WeakMap(), Xn = /* @__PURE__ */ new WeakMap(), ml = /* @__PURE__ */ new WeakMap();
function bl(e) {
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
function wt(e) {
  return /* @__PURE__ */ rt(e) ? e : Sr(e, !1, ul, pl, qn);
}
// @__NO_SIDE_EFFECTS__
function yl(e) {
  return Sr(e, !1, cl, vl, Gn);
}
// @__NO_SIDE_EFFECTS__
function ar(e) {
  return Sr(e, !0, fl, gl, Xn);
}
function Sr(e, t, s, r, n) {
  if (!Y(e) || e.__v_raw && !(t && e.__v_isReactive) || e.__v_skip || !Object.isExtensible(e)) return e;
  const i = n.get(e);
  if (i) return i;
  const l = bl(Wi(e));
  if (l === 0) return e;
  const o = new Proxy(e, l === 2 ? r : s);
  return n.set(e, o), o;
}
// @__NO_SIDE_EFFECTS__
function _t(e) {
  return /* @__PURE__ */ rt(e) ? /* @__PURE__ */ _t(e.__v_raw) : !!(e && e.__v_isReactive);
}
// @__NO_SIDE_EFFECTS__
function rt(e) {
  return !!(e && e.__v_isReadonly);
}
// @__NO_SIDE_EFFECTS__
function Pe(e) {
  return !!(e && e.__v_isShallow);
}
// @__NO_SIDE_EFFECTS__
function Ar(e) {
  return e ? !!e.__v_raw : !1;
}
// @__NO_SIDE_EFFECTS__
function K(e) {
  const t = e && e.__v_raw;
  return t ? /* @__PURE__ */ K(t) : e;
}
function _l(e) {
  return !J(e, "__v_skip") && Object.isExtensible(e) && On(e, "__v_skip", !0), e;
}
var Re = (e) => Y(e) ? /* @__PURE__ */ wt(e) : e, Pt = (e) => Y(e) ? /* @__PURE__ */ ar(e) : e;
// @__NO_SIDE_EFFECTS__
function ye(e) {
  return e ? e.__v_isRef === !0 : !1;
}
// @__NO_SIDE_EFFECTS__
function ue(e) {
  return wl(e, !1);
}
function wl(e, t) {
  return /* @__PURE__ */ ye(e) ? e : new xl(e, t);
}
var xl = class {
  constructor(e, t) {
    this.dep = new xr(), this.__v_isRef = !0, this.__v_isShallow = !1, this._rawValue = t ? e : /* @__PURE__ */ K(e), this._value = t ? e : Re(e), this.__v_isShallow = t;
  }
  get value() {
    return this.dep.track(), this._value;
  }
  set value(e) {
    const t = this._rawValue, s = this.__v_isShallow || /* @__PURE__ */ Pe(e) || /* @__PURE__ */ rt(e);
    e = s ? e : /* @__PURE__ */ K(e), We(e, t) && (this._rawValue = e, this._value = s ? e : Re(e), this.dep.trigger());
  }
};
function zn(e) {
  return /* @__PURE__ */ ye(e) ? e.value : e;
}
var Cl = {
  get: (e, t, s) => t === "__v_raw" ? e : zn(Reflect.get(e, t, s)),
  set: (e, t, s, r) => {
    const n = e[t];
    return /* @__PURE__ */ ye(n) && !/* @__PURE__ */ ye(s) ? (n.value = s, !0) : Reflect.set(e, t, s, r);
  }
};
function Jn(e) {
  return /* @__PURE__ */ _t(e) ? e : new Proxy(e, Cl);
}
var Sl = class {
  constructor(e, t, s) {
    this.fn = e, this.setter = t, this._value = void 0, this.dep = new xr(this), this.__v_isRef = !0, this.deps = void 0, this.depsTail = void 0, this.flags = 16, this.globalVersion = zt - 1, this.next = void 0, this.effect = this, this.__v_isReadonly = !t, this.isSSR = s;
  }
  notify() {
    if (this.flags |= 16, !(this.flags & 8) && se !== this)
      return Rn(this, !0), !0;
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
function Al(e, t, s = !1) {
  let r, n;
  return W(e) ? r = e : (r = e.get, n = e.set), new Sl(r, n, s);
}
var hs = {}, ms = /* @__PURE__ */ new WeakMap(), gt = void 0;
function Tl(e, t = !1, s = gt) {
  if (s) {
    let r = ms.get(s);
    r || ms.set(s, r = []), r.push(e);
  }
}
function Il(e, t, s = Q) {
  const { immediate: r, deep: n, once: i, scheduler: l, augmentJob: o, call: a } = s, c = (P) => n ? P : /* @__PURE__ */ Pe(P) || n === !1 || n === 0 ? Ze(P, 1) : Ze(P);
  let u, h, g, _, V = !1, $ = !1;
  if (/* @__PURE__ */ ye(e) ? (h = () => e.value, V = /* @__PURE__ */ Pe(e)) : /* @__PURE__ */ _t(e) ? (h = () => c(e), V = !0) : N(e) ? ($ = !0, V = e.some((P) => /* @__PURE__ */ _t(P) || /* @__PURE__ */ Pe(P)), h = () => e.map((P) => {
    if (/* @__PURE__ */ ye(P)) return P.value;
    if (/* @__PURE__ */ _t(P)) return c(P);
    if (W(P)) return a ? a(P, 2) : P();
  })) : W(e) ? t ? h = a ? () => a(e, 2) : e : h = () => {
    if (g) {
      tt();
      try {
        g();
      } finally {
        st();
      }
    }
    const P = gt;
    gt = u;
    try {
      return a ? a(e, 3, [_]) : e(_);
    } finally {
      gt = P;
    }
  } : h = Ke, t && n) {
    const P = h, C = n === !0 ? 1 / 0 : n;
    h = () => Ze(P(), C);
  }
  const X = tl(), G = () => {
    u.stop(), X && X.active && gr(X.effects, u);
  };
  if (i && t) {
    const P = t;
    t = (...C) => {
      P(...C), G();
    };
  }
  let j = $ ? new Array(e.length).fill(hs) : hs;
  const q = (P) => {
    if (!(!(u.flags & 1) || !u.dirty && !P))
      if (t) {
        const C = u.run();
        if (n || V || ($ ? C.some((A, E) => We(A, j[E])) : We(C, j))) {
          g && g();
          const A = gt;
          gt = u;
          try {
            const E = [
              C,
              j === hs ? void 0 : $ && j[0] === hs ? [] : j,
              _
            ];
            j = C, a ? a(t, 3, E) : t(...E);
          } finally {
            gt = A;
          }
        }
      } else u.run();
  };
  return o && o(q), u = new Dn(h), u.scheduler = l ? () => l(q, !1) : q, _ = (P) => Tl(P, !1, u), g = u.onStop = () => {
    const P = ms.get(u);
    if (P) {
      if (a) a(P, 4);
      else for (const C of P) C();
      ms.delete(u);
    }
  }, t ? r ? q(!0) : j = u.run() : l ? l(q.bind(null, !0), !0) : u.run(), G.pause = u.pause.bind(u), G.resume = u.resume.bind(u), G.stop = G, G;
}
function Ze(e, t = 1 / 0, s) {
  if (t <= 0 || !Y(e) || e.__v_skip || (s = s || /* @__PURE__ */ new Map(), (s.get(e) || 0) >= t)) return e;
  if (s.set(e, t), t--, /* @__PURE__ */ ye(e)) Ze(e.value, t, s);
  else if (N(e)) for (let r = 0; r < e.length; r++) Ze(e[r], t, s);
  else if (Os(e) || Et(e)) e.forEach((r) => {
    Ze(r, t, s);
  });
  else if (En(e)) {
    for (const r in e) Ze(e[r], t, s);
    for (const r of Object.getOwnPropertySymbols(e)) Object.prototype.propertyIsEnumerable.call(e, r) && Ze(e[r], t, s);
  }
  return e;
}
function ns(e, t, s, r) {
  try {
    return r ? e(...r) : e();
  } catch (n) {
    Ds(n, t, s);
  }
}
function Fe(e, t, s, r) {
  if (W(e)) {
    const n = ns(e, t, s, r);
    return n && Tn(n) && n.catch((i) => {
      Ds(i, t, s);
    }), n;
  }
  if (N(e)) {
    const n = [];
    for (let i = 0; i < e.length; i++) n.push(Fe(e[i], t, s, r));
    return n;
  }
}
function Ds(e, t, s, r = !0) {
  const n = t ? t.vnode : null, { errorHandler: i, throwUnhandledErrorInProduction: l } = t && t.appContext.config || Q;
  if (t) {
    let o = t.parent;
    const a = t.proxy, c = `https://vuejs.org/error-reference/#runtime-${s}`;
    for (; o; ) {
      const u = o.ec;
      if (u) {
        for (let h = 0; h < u.length; h++) if (u[h](e, a, c) === !1) return;
      }
      o = o.parent;
    }
    if (i) {
      tt(), ns(i, null, 10, [
        e,
        a,
        c
      ]), st();
      return;
    }
  }
  El(e, s, n, r, l);
}
function El(e, t, s, r = !0, n = !1) {
  if (n) throw e;
  console.error(e);
}
var we = [], Be = -1, Ot = [], ut = null, Tt = 0, Yn = /* @__PURE__ */ Promise.resolve(), bs = null;
function Tr(e) {
  const t = bs || Yn;
  return e ? t.then(this ? e.bind(this) : e) : t;
}
function Ol(e) {
  let t = Be + 1, s = we.length;
  for (; t < s; ) {
    const r = t + s >>> 1, n = we[r], i = Yt(n);
    i < e || i === e && n.flags & 2 ? t = r + 1 : s = r;
  }
  return t;
}
function Ir(e) {
  if (!(e.flags & 1)) {
    const t = Yt(e), s = we[we.length - 1];
    !s || !(e.flags & 2) && t >= Yt(s) ? we.push(e) : we.splice(Ol(t), 0, e), e.flags |= 1, Qn();
  }
}
function Qn() {
  bs || (bs = Yn.then(ei));
}
function $l(e) {
  N(e) ? Ot.push(...e) : ut && e.id === -1 ? ut.splice(Tt + 1, 0, e) : e.flags & 1 || (Ot.push(e), e.flags |= 1), Qn();
}
function Br(e, t, s = Be + 1) {
  for (; s < we.length; s++) {
    const r = we[s];
    if (r && r.flags & 2) {
      if (e && r.id !== e.uid) continue;
      we.splice(s, 1), s--, r.flags & 4 && (r.flags &= -2), r(), r.flags & 4 || (r.flags &= -2);
    }
  }
}
function Zn(e) {
  if (Ot.length) {
    const t = [...new Set(Ot)].sort((s, r) => Yt(s) - Yt(r));
    if (Ot.length = 0, ut) {
      ut.push(...t);
      return;
    }
    for (ut = t, Tt = 0; Tt < ut.length; Tt++) {
      const s = ut[Tt];
      s.flags & 4 && (s.flags &= -2), s.flags & 8 || s(), s.flags &= -2;
    }
    ut = null, Tt = 0;
  }
}
var Yt = (e) => e.id == null ? e.flags & 2 ? -1 : 1 / 0 : e.id;
function ei(e) {
  try {
    for (Be = 0; Be < we.length; Be++) {
      const t = we[Be];
      t && !(t.flags & 8) && (t.flags & 4 && (t.flags &= -2), ns(t, t.i, t.i ? 15 : 14), t.flags & 4 || (t.flags &= -2));
    }
  } finally {
    for (; Be < we.length; Be++) {
      const t = we[Be];
      t && (t.flags &= -2);
    }
    Be = -1, we.length = 0, Zn(e), bs = null, (we.length || Ot.length) && ei(e);
  }
}
var Ee = null, ti = null;
function ys(e) {
  const t = Ee;
  return Ee = e, ti = e && e.type.__scopeId || null, t;
}
function si(e, t = Ee, s) {
  if (!t || e._n) return e;
  const r = (...n) => {
    r._d && xs(-1);
    const i = ys(t);
    let l;
    try {
      l = e(...n);
    } finally {
      ys(i), r._d && xs(1);
    }
    return l;
  };
  return r._n = !0, r._c = !0, r._d = !0, r;
}
function Ae(e, t) {
  if (Ee === null) return e;
  const s = Bs(Ee), r = e.dirs || (e.dirs = []);
  for (let n = 0; n < t.length; n++) {
    let [i, l, o, a = Q] = t[n];
    i && (W(i) && (i = {
      mounted: i,
      updated: i
    }), i.deep && Ze(l), r.push({
      dir: i,
      instance: s,
      value: l,
      oldValue: void 0,
      arg: o,
      modifiers: a
    }));
  }
  return e;
}
function dt(e, t, s, r) {
  const n = e.dirs, i = t && t.dirs;
  for (let l = 0; l < n.length; l++) {
    const o = n[l];
    i && (o.oldValue = i[l].value);
    let a = o.dir[r];
    a && (tt(), Fe(a, s, 8, [
      e.el,
      o,
      e,
      t
    ]), st());
  }
}
function Ml(e, t) {
  if (be) {
    let s = be.provides;
    const r = be.parent && be.parent.provides;
    r === s && (s = be.provides = Object.create(r)), s[e] = t;
  }
}
function vs(e, t, s = !1) {
  const r = Fi();
  if (r || Mt) {
    let n = Mt ? Mt._context.provides : r ? r.parent == null || r.ce ? r.vnode.appContext && r.vnode.appContext.provides : r.parent.provides : void 0;
    if (n && e in n) return n[e];
    if (arguments.length > 1) return s && W(t) ? t.call(r && r.proxy) : t;
  }
}
var kl = /* @__PURE__ */ Symbol.for("v-scx"), Pl = () => {
  {
    const e = vs(kl);
    return e;
  }
};
function $t(e, t, s) {
  return ri(e, t, s);
}
function ri(e, t, s = Q) {
  const { immediate: r, deep: n, flush: i, once: l } = s, o = oe({}, s), a = t && r || !t && i !== "post";
  let c;
  if (es) {
    if (i === "sync") {
      const _ = Pl();
      c = _.__watcherHandles || (_.__watcherHandles = []);
    } else if (!a) {
      const _ = () => {
      };
      return _.stop = Ke, _.resume = Ke, _.pause = Ke, _;
    }
  }
  const u = be;
  o.call = (_, V, $) => Fe(_, u, V, $);
  let h = !1;
  i === "post" ? o.scheduler = (_) => {
    Se(_, u && u.suspense);
  } : i !== "sync" && (h = !0, o.scheduler = (_, V) => {
    V ? _() : Ir(_);
  }), o.augmentJob = (_) => {
    t && (_.flags |= 4), h && (_.flags |= 2, u && (_.id = u.uid, _.i = u));
  };
  const g = Il(e, t, o);
  return es && (c ? c.push(g) : a && g()), g;
}
function Fl(e, t, s) {
  const r = this.proxy, n = ne(e) ? e.includes(".") ? ni(r, e) : () => r[e] : e.bind(r, r);
  let i;
  W(t) ? i = t : (i = t.handler, s = t);
  const l = os(this), o = ri(n, i.bind(r), s);
  return l(), o;
}
function ni(e, t) {
  const s = t.split(".");
  return () => {
    let r = e;
    for (let n = 0; n < s.length && r; n++) r = r[s[n]];
    return r;
  };
}
var Dl = /* @__PURE__ */ Symbol("_vte"), ii = (e) => e.__isTeleport, Me = /* @__PURE__ */ Symbol("_leaveCb"), Rt = /* @__PURE__ */ Symbol("_enterCb");
function Ll() {
  const e = {
    isMounted: !1,
    isLeaving: !1,
    isUnmounting: !1,
    leavingVNodes: /* @__PURE__ */ new Map()
  };
  return is(() => {
    e.isMounted = !0;
  }), ls(() => {
    e.isUnmounting = !0;
  }), e;
}
var $e = [Function, Array], li = {
  mode: String,
  appear: Boolean,
  persisted: Boolean,
  onBeforeEnter: $e,
  onEnter: $e,
  onAfterEnter: $e,
  onEnterCancelled: $e,
  onBeforeLeave: $e,
  onLeave: $e,
  onAfterLeave: $e,
  onLeaveCancelled: $e,
  onBeforeAppear: $e,
  onAppear: $e,
  onAfterAppear: $e,
  onAppearCancelled: $e
}, oi = (e) => {
  const t = e.subTree;
  return t.component ? oi(t.component) : t;
}, Rl = {
  name: "BaseTransition",
  props: li,
  setup(e, { slots: t }) {
    const s = Fi(), r = Ll();
    return () => {
      const n = t.default && fi(t.default(), !0), i = n && n.length ? ai(n) : s.subTree ? ve() : void 0;
      if (!i) return;
      const l = /* @__PURE__ */ K(e), { mode: o } = l;
      if (r.isLeaving) return Js(i);
      const a = jr(i);
      if (!a) return Js(i);
      let c = ur(a, l, r, s, (h) => c = h);
      a.type !== xe && Qt(a, c);
      let u = s.subTree && jr(s.subTree);
      if (u && u.type !== xe && !mt(u, a) && oi(s).type !== xe) {
        let h = ur(u, l, r, s);
        if (Qt(u, h), o === "out-in" && a.type !== xe)
          return r.isLeaving = !0, h.afterLeave = () => {
            r.isLeaving = !1, s.job.flags & 8 || s.update(), delete h.afterLeave, u = void 0;
          }, Js(i);
        o === "in-out" && a.type !== xe ? h.delayLeave = (g, _, V) => {
          const $ = ui(r, u);
          $[String(u.key)] = u, g[Me] = () => {
            _(), g[Me] = void 0, delete c.delayedLeave, u = void 0;
          }, c.delayedLeave = () => {
            V(), delete c.delayedLeave, u = void 0;
          };
        } : u = void 0;
      } else u && (u = void 0);
      return i;
    };
  }
};
function ai(e) {
  let t = e[0];
  if (e.length > 1) {
    for (const s of e) if (s.type !== xe) {
      t = s;
      break;
    }
  }
  return t;
}
var Hl = Rl;
function ui(e, t) {
  const { leavingVNodes: s } = e;
  let r = s.get(t.type);
  return r || (r = /* @__PURE__ */ Object.create(null), s.set(t.type, r)), r;
}
function ur(e, t, s, r, n) {
  const { appear: i, mode: l, persisted: o = !1, onBeforeEnter: a, onEnter: c, onAfterEnter: u, onEnterCancelled: h, onBeforeLeave: g, onLeave: _, onAfterLeave: V, onLeaveCancelled: $, onBeforeAppear: X, onAppear: G, onAfterAppear: j, onAppearCancelled: q } = t, P = String(e.key), C = ui(s, e), A = (w, S) => {
    w && Fe(w, r, 9, S);
  }, E = (w, S) => {
    const R = S[1];
    A(w, S), N(w) ? w.every((k) => k.length <= 1) && R() : w.length <= 1 && R();
  }, D = {
    mode: l,
    persisted: o,
    beforeEnter(w) {
      let S = a;
      if (!s.isMounted) if (i) S = X || a;
      else return;
      w[Me] && w[Me](!0);
      const R = C[P];
      R && mt(e, R) && R.el[Me] && R.el[Me](), A(S, [w]);
    },
    enter(w) {
      if (C[P] === e) return;
      let S = c, R = u, k = h;
      if (!s.isMounted) if (i)
        S = G || c, R = j || u, k = q || h;
      else return;
      let re = !1;
      w[Rt] = (Ge) => {
        re || (re = !0, Ge ? A(k, [w]) : A(R, [w]), D.delayedLeave && D.delayedLeave(), w[Rt] = void 0);
      };
      const ge = w[Rt].bind(null, !1);
      S ? E(S, [w, ge]) : ge();
    },
    leave(w, S) {
      const R = String(e.key);
      if (w[Rt] && w[Rt](!0), s.isUnmounting) return S();
      A(g, [w]);
      let k = !1;
      w[Me] = (ge) => {
        k || (k = !0, S(), ge ? A($, [w]) : A(V, [w]), w[Me] = void 0, C[R] === e && delete C[R]);
      };
      const re = w[Me].bind(null, !1);
      C[R] = e, _ ? E(_, [w, re]) : re();
    },
    clone(w) {
      const S = ur(w, t, s, r, n);
      return n && n(S), S;
    }
  };
  return D;
}
function Js(e) {
  if (Ls(e))
    return e = ft(e), e.children = null, e;
}
function jr(e) {
  if (!Ls(e))
    return ii(e.type) && e.children ? ai(e.children) : e;
  if (e.component) return e.component.subTree;
  const { shapeFlag: t, children: s } = e;
  if (s) {
    if (t & 16) return s[0];
    if (t & 32 && W(s.default)) return s.default();
  }
}
function Qt(e, t) {
  e.shapeFlag & 6 && e.component ? (e.transition = t, Qt(e.component.subTree, t)) : e.shapeFlag & 128 ? (e.ssContent.transition = t.clone(e.ssContent), e.ssFallback.transition = t.clone(e.ssFallback)) : e.transition = t;
}
function fi(e, t = !1, s) {
  let r = [], n = 0;
  for (let i = 0; i < e.length; i++) {
    let l = e[i];
    const o = s == null ? l.key : String(s) + String(l.key != null ? l.key : i);
    l.type === pe ? (l.patchFlag & 128 && n++, r = r.concat(fi(l.children, t, o))) : (t || l.type !== xe) && r.push(o != null ? ft(l, { key: o }) : l);
  }
  if (n > 1) for (let i = 0; i < r.length; i++) r[i].patchFlag = -2;
  return r;
}
// @__NO_SIDE_EFFECTS__
function He(e, t) {
  return W(e) ? oe({ name: e.name }, t, { setup: e }) : e;
}
function ci(e) {
  e.ids = [
    e.ids[0] + e.ids[2]++ + "-",
    0,
    0
  ];
}
function Ur(e, t) {
  let s;
  return !!((s = Object.getOwnPropertyDescriptor(e, t)) && !s.configurable);
}
var _s = /* @__PURE__ */ new WeakMap();
function Kt(e, t, s, r, n = !1) {
  if (N(e)) {
    e.forEach(($, X) => Kt($, t && (N(t) ? t[X] : t), s, r, n));
    return;
  }
  if (qt(r) && !n) {
    r.shapeFlag & 512 && r.type.__asyncResolved && r.component.subTree.component && Kt(e, t, s, r.component.subTree);
    return;
  }
  const i = r.shapeFlag & 4 ? Bs(r.component) : r.el, l = n ? null : i, { i: o, r: a } = e, c = t && t.r, u = o.refs === Q ? o.refs = {} : o.refs, h = o.setupState, g = /* @__PURE__ */ K(h), _ = h === Q ? An : ($) => Ur(u, $) ? !1 : J(g, $), V = ($, X) => !(X && Ur(u, X));
  if (c != null && c !== a) {
    if (Wr(t), ne(c))
      u[c] = null, _(c) && (h[c] = null);
    else if (/* @__PURE__ */ ye(c)) {
      const $ = t;
      V(c, $.k) && (c.value = null), $.k && (u[$.k] = null);
    }
  }
  if (W(a)) ns(a, o, 12, [l, u]);
  else {
    const $ = ne(a), X = /* @__PURE__ */ ye(a);
    if ($ || X) {
      const G = () => {
        if (e.f) {
          const j = $ ? _(a) ? h[a] : u[a] : V(a) || !e.k ? a.value : u[e.k];
          if (n) N(j) && gr(j, i);
          else if (N(j)) j.includes(i) || j.push(i);
          else if ($)
            u[a] = [i], _(a) && (h[a] = u[a]);
          else {
            const q = [i];
            V(a, e.k) && (a.value = q), e.k && (u[e.k] = q);
          }
        } else $ ? (u[a] = l, _(a) && (h[a] = l)) : X && (V(a, e.k) && (a.value = l), e.k && (u[e.k] = l));
      };
      if (l) {
        const j = () => {
          G(), _s.delete(e);
        };
        j.id = -1, _s.set(e, j), Se(j, s);
      } else
        Wr(e), G();
    }
  }
}
function Wr(e) {
  const t = _s.get(e);
  t && (t.flags |= 8, _s.delete(e));
}
var uf = ks().requestIdleCallback || ((e) => setTimeout(e, 1)), ff = ks().cancelIdleCallback || ((e) => clearTimeout(e)), qt = (e) => !!e.type.__asyncLoader, Ls = (e) => e.type.__isKeepAlive;
function Nl(e, t) {
  di(e, "a", t);
}
function Vl(e, t) {
  di(e, "da", t);
}
function di(e, t, s = be) {
  const r = e.__wdc || (e.__wdc = () => {
    let n = s;
    for (; n; ) {
      if (n.isDeactivated) return;
      n = n.parent;
    }
    return e();
  });
  if (Rs(t, r, s), s) {
    let n = s.parent;
    for (; n && n.parent; )
      Ls(n.parent.vnode) && Bl(r, t, s, n), n = n.parent;
  }
}
function Bl(e, t, s, r) {
  const n = Rs(t, e, r, !0);
  hi(() => {
    gr(r[t], n);
  }, s);
}
function Rs(e, t, s = be, r = !1) {
  if (s) {
    const n = s[e] || (s[e] = []), i = t.__weh || (t.__weh = (...l) => {
      tt();
      const o = os(s), a = Fe(t, s, e, l);
      return o(), st(), a;
    });
    return r ? n.unshift(i) : n.push(i), i;
  }
}
var it = (e) => (t, s = be) => {
  (!es || e === "sp") && Rs(e, (...r) => t(...r), s);
}, jl = it("bm"), is = it("m"), Ul = it("bu"), Wl = it("u"), ls = it("bum"), hi = it("um"), Kl = it("sp"), ql = it("rtg"), Gl = it("rtc");
function Xl(e, t = be) {
  Rs("ec", e, t);
}
var pi = "components", vi = /* @__PURE__ */ Symbol.for("v-ndc");
function zl(e) {
  return ne(e) ? Jl(pi, e, !1) || e : e || vi;
}
function Jl(e, t, s = !0, r = !1) {
  const n = Ee || be;
  if (n) {
    const i = n.type;
    if (e === pi) {
      const o = Do(i, !1);
      if (o && (o === t || o === Ce(t) || o === Ms(Ce(t)))) return i;
    }
    const l = Kr(n[e] || i[e], t) || Kr(n.appContext[e], t);
    return !l && r ? i : l;
  }
}
function Kr(e, t) {
  return e && (e[t] || e[Ce(t)] || e[Ms(Ce(t))]);
}
function Hs(e, t, s, r) {
  let n;
  const i = s && s[r], l = N(e);
  if (l || ne(e)) {
    const o = l && /* @__PURE__ */ _t(e);
    let a = !1, c = !1;
    o && (a = !/* @__PURE__ */ Pe(e), c = /* @__PURE__ */ rt(e), e = Fs(e)), n = new Array(e.length);
    for (let u = 0, h = e.length; u < h; u++) n[u] = t(a ? c ? Pt(Re(e[u])) : Re(e[u]) : e[u], u, void 0, i && i[u]);
  } else if (typeof e == "number") {
    n = new Array(e);
    for (let o = 0; o < e; o++) n[o] = t(o + 1, o, void 0, i && i[o]);
  } else if (Y(e)) if (e[Symbol.iterator]) n = Array.from(e, (o, a) => t(o, a, void 0, i && i[a]));
  else {
    const o = Object.keys(e);
    n = new Array(o.length);
    for (let a = 0, c = o.length; a < c; a++) {
      const u = o[a];
      n[a] = t(e[u], u, a, i && i[a]);
    }
  }
  else n = [];
  return s && (s[r] = n), n;
}
var fr = (e) => e ? Di(e) ? Bs(e) : fr(e.parent) : null, Gt = /* @__PURE__ */ oe(/* @__PURE__ */ Object.create(null), {
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
  $options: (e) => Er(e),
  $forceUpdate: (e) => e.f || (e.f = () => {
    Ir(e.update);
  }),
  $nextTick: (e) => e.n || (e.n = Tr.bind(e.proxy)),
  $watch: (e) => Fl.bind(e)
}), Ys = (e, t) => e !== Q && !e.__isScriptSetup && J(e, t), Yl = {
  get({ _: e }, t) {
    if (t === "__v_skip") return !0;
    const { ctx: s, setupState: r, data: n, props: i, accessCache: l, type: o, appContext: a } = e;
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
        if (n !== Q && J(n, t))
          return l[t] = 2, n[t];
        if (J(i, t))
          return l[t] = 3, i[t];
        if (s !== Q && J(s, t))
          return l[t] = 4, s[t];
        cr && (l[t] = 0);
      }
    }
    const c = Gt[t];
    let u, h;
    if (c)
      return t === "$attrs" && me(e.attrs, "get", ""), c(e);
    if ((u = o.__cssModules) && (u = u[t])) return u;
    if (s !== Q && J(s, t))
      return l[t] = 4, s[t];
    if (h = a.config.globalProperties, J(h, t)) return h[t];
  },
  set({ _: e }, t, s) {
    const { data: r, setupState: n, ctx: i } = e;
    return Ys(n, t) ? (n[t] = s, !0) : r !== Q && J(r, t) ? (r[t] = s, !0) : J(e.props, t) || t[0] === "$" && t.slice(1) in e ? !1 : (i[t] = s, !0);
  },
  has({ _: { data: e, setupState: t, accessCache: s, ctx: r, appContext: n, props: i, type: l } }, o) {
    let a;
    return !!(s[o] || e !== Q && o[0] !== "$" && J(e, o) || Ys(t, o) || J(i, o) || J(r, o) || J(Gt, o) || J(n.config.globalProperties, o) || (a = l.__cssModules) && a[o]);
  },
  defineProperty(e, t, s) {
    return s.get != null ? e._.accessCache[t] = 0 : J(s, "value") && this.set(e, t, s.value, null), Reflect.defineProperty(e, t, s);
  }
};
function qr(e) {
  return N(e) ? e.reduce((t, s) => (t[s] = null, t), {}) : e;
}
var cr = !0;
function Ql(e) {
  const t = Er(e), s = e.proxy, r = e.ctx;
  cr = !1, t.beforeCreate && Gr(t.beforeCreate, e, "bc");
  const { data: n, computed: i, methods: l, watch: o, provide: a, inject: c, created: u, beforeMount: h, mounted: g, beforeUpdate: _, updated: V, activated: $, deactivated: X, beforeDestroy: G, beforeUnmount: j, destroyed: q, unmounted: P, render: C, renderTracked: A, renderTriggered: E, errorCaptured: D, serverPrefetch: w, expose: S, inheritAttrs: R, components: k, directives: re, filters: ge } = t;
  if (c && Zl(c, r, null), l) for (const ie in l) {
    const Z = l[ie];
    W(Z) && (r[ie] = Z.bind(s));
  }
  if (n) {
    const ie = n.call(s, s);
    Y(ie) && (e.data = /* @__PURE__ */ wt(ie));
  }
  if (cr = !0, i) for (const ie in i) {
    const Z = i[ie], lt = nt({
      get: W(Z) ? Z.bind(s, s) : W(Z.get) ? Z.get.bind(s, s) : Ke,
      set: !W(Z) && W(Z.set) ? Z.set.bind(s) : Ke
    });
    Object.defineProperty(r, ie, {
      enumerable: !0,
      configurable: !0,
      get: () => lt.value,
      set: (as) => lt.value = as
    });
  }
  if (o) for (const ie in o) gi(o[ie], r, s, ie);
  if (a) {
    const ie = W(a) ? a.call(s) : a;
    Reflect.ownKeys(ie).forEach((Z) => {
      Ml(Z, ie[Z]);
    });
  }
  u && Gr(u, e, "c");
  function ce(ie, Z) {
    N(Z) ? Z.forEach((lt) => ie(lt.bind(s))) : Z && ie(Z.bind(s));
  }
  if (ce(jl, h), ce(is, g), ce(Ul, _), ce(Wl, V), ce(Nl, $), ce(Vl, X), ce(Xl, D), ce(Gl, A), ce(ql, E), ce(ls, j), ce(hi, P), ce(Kl, w), N(S))
    if (S.length) {
      const ie = e.exposed || (e.exposed = {});
      S.forEach((Z) => {
        Object.defineProperty(ie, Z, {
          get: () => s[Z],
          set: (lt) => s[Z] = lt,
          enumerable: !0
        });
      });
    } else e.exposed || (e.exposed = {});
  C && e.render === Ke && (e.render = C), R != null && (e.inheritAttrs = R), k && (e.components = k), re && (e.directives = re), w && ci(e);
}
function Zl(e, t, s = Ke) {
  N(e) && (e = dr(e));
  for (const r in e) {
    const n = e[r];
    let i;
    Y(n) ? "default" in n ? i = vs(n.from || r, n.default, !0) : i = vs(n.from || r) : i = vs(n), /* @__PURE__ */ ye(i) ? Object.defineProperty(t, r, {
      enumerable: !0,
      configurable: !0,
      get: () => i.value,
      set: (l) => i.value = l
    }) : t[r] = i;
  }
}
function Gr(e, t, s) {
  Fe(N(e) ? e.map((r) => r.bind(t.proxy)) : e.bind(t.proxy), t, s);
}
function gi(e, t, s, r) {
  let n = r.includes(".") ? ni(s, r) : () => s[r];
  if (ne(e)) {
    const i = t[e];
    W(i) && $t(n, i);
  } else if (W(e)) $t(n, e.bind(s));
  else if (Y(e)) if (N(e)) e.forEach((i) => gi(i, t, s, r));
  else {
    const i = W(e.handler) ? e.handler.bind(s) : t[e.handler];
    W(i) && $t(n, i, e);
  }
}
function Er(e) {
  const t = e.type, { mixins: s, extends: r } = t, { mixins: n, optionsCache: i, config: { optionMergeStrategies: l } } = e.appContext, o = i.get(t);
  let a;
  return o ? a = o : !n.length && !s && !r ? a = t : (a = {}, n.length && n.forEach((c) => ws(a, c, l, !0)), ws(a, t, l)), Y(t) && i.set(t, a), a;
}
function ws(e, t, s, r = !1) {
  const { mixins: n, extends: i } = t;
  i && ws(e, i, s, !0), n && n.forEach((l) => ws(e, l, s, !0));
  for (const l in t) if (!(r && l === "expose")) {
    const o = eo[l] || s && s[l];
    e[l] = o ? o(e[l], t[l]) : t[l];
  }
  return e;
}
var eo = {
  data: Xr,
  props: zr,
  emits: zr,
  methods: Vt,
  computed: Vt,
  beforeCreate: _e,
  created: _e,
  beforeMount: _e,
  mounted: _e,
  beforeUpdate: _e,
  updated: _e,
  beforeDestroy: _e,
  beforeUnmount: _e,
  destroyed: _e,
  unmounted: _e,
  activated: _e,
  deactivated: _e,
  errorCaptured: _e,
  serverPrefetch: _e,
  components: Vt,
  directives: Vt,
  watch: so,
  provide: Xr,
  inject: to
};
function Xr(e, t) {
  return t ? e ? function() {
    return oe(W(e) ? e.call(this, this) : e, W(t) ? t.call(this, this) : t);
  } : t : e;
}
function to(e, t) {
  return Vt(dr(e), dr(t));
}
function dr(e) {
  if (N(e)) {
    const t = {};
    for (let s = 0; s < e.length; s++) t[e[s]] = e[s];
    return t;
  }
  return e;
}
function _e(e, t) {
  return e ? [...new Set([].concat(e, t))] : t;
}
function Vt(e, t) {
  return e ? oe(/* @__PURE__ */ Object.create(null), e, t) : t;
}
function zr(e, t) {
  return e ? N(e) && N(t) ? [.../* @__PURE__ */ new Set([...e, ...t])] : oe(/* @__PURE__ */ Object.create(null), qr(e), qr(t ?? {})) : t;
}
function so(e, t) {
  if (!e) return t;
  if (!t) return e;
  const s = oe(/* @__PURE__ */ Object.create(null), e);
  for (const r in t) s[r] = _e(e[r], t[r]);
  return s;
}
function mi() {
  return {
    app: null,
    config: {
      isNativeTag: An,
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
var ro = 0;
function no(e, t) {
  return function(r, n = null) {
    W(r) || (r = oe({}, r)), n != null && !Y(n) && (n = null);
    const i = mi(), l = /* @__PURE__ */ new WeakSet(), o = [];
    let a = !1;
    const c = i.app = {
      _uid: ro++,
      _component: r,
      _props: n,
      _container: null,
      _context: i,
      _instance: null,
      version: Ho,
      get config() {
        return i.config;
      },
      set config(u) {
      },
      use(u, ...h) {
        return l.has(u) || (u && W(u.install) ? (l.add(u), u.install(c, ...h)) : W(u) && (l.add(u), u(c, ...h))), c;
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
        if (!a) {
          const _ = c._ceVNode || de(r, n);
          return _.appContext = i, g === !0 ? g = "svg" : g === !1 && (g = void 0), h && t ? t(_, u) : e(_, u, g), a = !0, c._container = u, u.__vue_app__ = c, Bs(_.component);
        }
      },
      onUnmount(u) {
        o.push(u);
      },
      unmount() {
        a && (Fe(o, c._instance, 16), e(null, c._container), delete c._container.__vue_app__);
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
var Mt = null, io = (e, t) => t === "modelValue" || t === "model-value" ? e.modelModifiers : e[`${t}Modifiers`] || e[`${Ce(t)}Modifiers`] || e[`${Ct(t)}Modifiers`];
function lo(e, t, ...s) {
  if (e.isUnmounted) return;
  const r = e.vnode.props || Q;
  let n = s;
  const i = t.startsWith("update:"), l = i && io(r, t.slice(7));
  l && (l.trim && (n = s.map((u) => ne(u) ? u.trim() : u)), l.number && (n = s.map(br)));
  let o, a = r[o = Ks(t)] || r[o = Ks(Ce(t))];
  !a && i && (a = r[o = Ks(Ct(t))]), a && Fe(a, e, 6, n);
  const c = r[o + "Once"];
  if (c) {
    if (!e.emitted) e.emitted = {};
    else if (e.emitted[o]) return;
    e.emitted[o] = !0, Fe(c, e, 6, n);
  }
}
var oo = /* @__PURE__ */ new WeakMap();
function bi(e, t, s = !1) {
  const r = s ? oo : t.emitsCache, n = r.get(e);
  if (n !== void 0) return n;
  const i = e.emits;
  let l = {}, o = !1;
  if (!W(e)) {
    const a = (c) => {
      const u = bi(c, t, !0);
      u && (o = !0, oe(l, u));
    };
    !s && t.mixins.length && t.mixins.forEach(a), e.extends && a(e.extends), e.mixins && e.mixins.forEach(a);
  }
  return !i && !o ? (Y(e) && r.set(e, null), null) : (N(i) ? i.forEach((a) => l[a] = null) : oe(l, i), Y(e) && r.set(e, l), l);
}
function Ns(e, t) {
  return !e || !Is(t) ? !1 : (t = t.slice(2).replace(/Once$/, ""), J(e, t[0].toLowerCase() + t.slice(1)) || J(e, Ct(t)) || J(e, t));
}
function Qs(e) {
  const { type: t, vnode: s, proxy: r, withProxy: n, propsOptions: [i], slots: l, attrs: o, emit: a, render: c, renderCache: u, props: h, data: g, setupState: _, ctx: V, inheritAttrs: $ } = e, X = ys(e);
  let G, j;
  try {
    if (s.shapeFlag & 4) {
      const P = n || r, C = P;
      G = Ue(c.call(C, P, u, h, _, g, V)), j = o;
    } else {
      const P = t;
      G = Ue(P.length > 1 ? P(h, {
        attrs: o,
        slots: l,
        emit: a
      }) : P(h, null)), j = t.props ? o : ao(o);
    }
  } catch (P) {
    Xt.length = 0, Ds(P, e, 1), G = de(xe);
  }
  let q = G;
  if (j && $ !== !1) {
    const P = Object.keys(j), { shapeFlag: C } = q;
    P.length && C & 7 && (i && P.some(Es) && (j = uo(j, i)), q = ft(q, j, !1, !0));
  }
  return s.dirs && (q = ft(q, null, !1, !0), q.dirs = q.dirs ? q.dirs.concat(s.dirs) : s.dirs), s.transition && Qt(q, s.transition), G = q, ys(X), G;
}
var ao = (e) => {
  let t;
  for (const s in e) (s === "class" || s === "style" || Is(s)) && ((t || (t = {}))[s] = e[s]);
  return t;
}, uo = (e, t) => {
  const s = {};
  for (const r in e) (!Es(r) || !(r.slice(9) in t)) && (s[r] = e[r]);
  return s;
};
function fo(e, t, s) {
  const { props: r, children: n, component: i } = e, { props: l, children: o, patchFlag: a } = t, c = i.emitsOptions;
  if (t.dirs || t.transition) return !0;
  if (s && a >= 0) {
    if (a & 1024) return !0;
    if (a & 16)
      return r ? Jr(r, l, c) : !!l;
    if (a & 8) {
      const u = t.dynamicProps;
      for (let h = 0; h < u.length; h++) {
        const g = u[h];
        if (yi(l, r, g) && !Ns(c, g)) return !0;
      }
    }
  } else
    return (n || o) && (!o || !o.$stable) ? !0 : r === l ? !1 : r ? l ? Jr(r, l, c) : !0 : !!l;
  return !1;
}
function Jr(e, t, s) {
  const r = Object.keys(t);
  if (r.length !== Object.keys(e).length) return !0;
  for (let n = 0; n < r.length; n++) {
    const i = r[n];
    if (yi(t, e, i) && !Ns(s, i)) return !0;
  }
  return !1;
}
function yi(e, t, s) {
  const r = e[s], n = t[s];
  return s === "style" && Y(r) && Y(n) ? !rs(r, n) : r !== n;
}
function co({ vnode: e, parent: t, suspense: s }, r) {
  for (; t; ) {
    const n = t.subTree;
    if (n.suspense && n.suspense.activeBranch === e && (n.suspense.vnode.el = n.el = r, e = n), n === e)
      (e = t.vnode).el = r, t = t.parent;
    else break;
  }
  s && s.activeBranch === e && (s.vnode.el = r);
}
var _i = {}, wi = () => Object.create(_i), xi = (e) => Object.getPrototypeOf(e) === _i;
function ho(e, t, s, r = !1) {
  const n = {}, i = wi();
  e.propsDefaults = /* @__PURE__ */ Object.create(null), Ci(e, t, n, i);
  for (const l in e.propsOptions[0]) l in n || (n[l] = void 0);
  s ? e.props = r ? n : /* @__PURE__ */ yl(n) : e.type.props ? e.props = n : e.props = i, e.attrs = i;
}
function po(e, t, s, r) {
  const { props: n, attrs: i, vnode: { patchFlag: l } } = e, o = /* @__PURE__ */ K(n), [a] = e.propsOptions;
  let c = !1;
  if ((r || l > 0) && !(l & 16)) {
    if (l & 8) {
      const u = e.vnode.dynamicProps;
      for (let h = 0; h < u.length; h++) {
        let g = u[h];
        if (Ns(e.emitsOptions, g)) continue;
        const _ = t[g];
        if (a) if (J(i, g))
          _ !== i[g] && (i[g] = _, c = !0);
        else {
          const V = Ce(g);
          n[V] = hr(a, o, V, _, e, !1);
        }
        else _ !== i[g] && (i[g] = _, c = !0);
      }
    }
  } else {
    Ci(e, t, n, i) && (c = !0);
    let u;
    for (const h in o) (!t || !J(t, h) && ((u = Ct(h)) === h || !J(t, u))) && (a ? s && (s[h] !== void 0 || s[u] !== void 0) && (n[h] = hr(a, o, h, void 0, e, !0)) : delete n[h]);
    if (i !== o)
      for (const h in i) (!t || !J(t, h)) && (delete i[h], c = !0);
  }
  c && Qe(e.attrs, "set", "");
}
function Ci(e, t, s, r) {
  const [n, i] = e.propsOptions;
  let l = !1, o;
  if (t) for (let a in t) {
    if (jt(a)) continue;
    const c = t[a];
    let u;
    n && J(n, u = Ce(a)) ? !i || !i.includes(u) ? s[u] = c : (o || (o = {}))[u] = c : Ns(e.emitsOptions, a) || (!(a in r) || c !== r[a]) && (r[a] = c, l = !0);
  }
  if (i) {
    const a = /* @__PURE__ */ K(s), c = o || Q;
    for (let u = 0; u < i.length; u++) {
      const h = i[u];
      s[h] = hr(n, a, h, c[h], e, !J(c, h));
    }
  }
  return l;
}
function hr(e, t, s, r, n, i) {
  const l = e[s];
  if (l != null) {
    const o = J(l, "default");
    if (o && r === void 0) {
      const a = l.default;
      if (l.type !== Function && !l.skipFactory && W(a)) {
        const { propsDefaults: c } = n;
        if (s in c) r = c[s];
        else {
          const u = os(n);
          r = c[s] = a.call(null, t), u();
        }
      } else r = a;
      n.ce && n.ce._setProp(s, r);
    }
    l[0] && (i && !o ? r = !1 : l[1] && (r === "" || r === Ct(s)) && (r = !0));
  }
  return r;
}
var vo = /* @__PURE__ */ new WeakMap();
function Si(e, t, s = !1) {
  const r = s ? vo : t.propsCache, n = r.get(e);
  if (n) return n;
  const i = e.props, l = {}, o = [];
  let a = !1;
  if (!W(e)) {
    const u = (h) => {
      a = !0;
      const [g, _] = Si(h, t, !0);
      oe(l, g), _ && o.push(..._);
    };
    !s && t.mixins.length && t.mixins.forEach(u), e.extends && u(e.extends), e.mixins && e.mixins.forEach(u);
  }
  if (!i && !a)
    return Y(e) && r.set(e, It), It;
  if (N(i)) for (let u = 0; u < i.length; u++) {
    const h = Ce(i[u]);
    Yr(h) && (l[h] = Q);
  }
  else if (i) for (const u in i) {
    const h = Ce(u);
    if (Yr(h)) {
      const g = i[u], _ = l[h] = N(g) || W(g) ? { type: g } : oe({}, g), V = _.type;
      let $ = !1, X = !0;
      if (N(V)) for (let G = 0; G < V.length; ++G) {
        const j = V[G], q = W(j) && j.name;
        if (q === "Boolean") {
          $ = !0;
          break;
        } else q === "String" && (X = !1);
      }
      else $ = W(V) && V.name === "Boolean";
      _[0] = $, _[1] = X, ($ || J(_, "default")) && o.push(h);
    }
  }
  const c = [l, o];
  return Y(e) && r.set(e, c), c;
}
function Yr(e) {
  return e[0] !== "$" && !jt(e);
}
var Or = (e) => e === "_" || e === "_ctx" || e === "$stable", $r = (e) => N(e) ? e.map(Ue) : [Ue(e)], go = (e, t, s) => {
  if (t._n) return t;
  const r = si((...n) => $r(t(...n)), s);
  return r._c = !1, r;
}, Ai = (e, t, s) => {
  const r = e._ctx;
  for (const n in e) {
    if (Or(n)) continue;
    const i = e[n];
    if (W(i)) t[n] = go(n, i, r);
    else if (i != null) {
      const l = $r(i);
      t[n] = () => l;
    }
  }
}, Ti = (e, t) => {
  const s = $r(t);
  e.slots.default = () => s;
}, Ii = (e, t, s) => {
  for (const r in t) (s || !Or(r)) && (e[r] = t[r]);
}, mo = (e, t, s) => {
  const r = e.slots = wi();
  if (e.vnode.shapeFlag & 32) {
    const n = t._;
    n ? (Ii(r, t, s), s && On(r, "_", n, !0)) : Ai(t, r);
  } else t && Ti(e, t);
}, bo = (e, t, s) => {
  const { vnode: r, slots: n } = e;
  let i = !0, l = Q;
  if (r.shapeFlag & 32) {
    const o = t._;
    o ? s && o === 1 ? i = !1 : Ii(n, t, s) : (i = !t.$stable, Ai(t, n)), l = t;
  } else t && (Ti(e, t), l = { default: 1 });
  if (i)
    for (const o in n) !Or(o) && l[o] == null && delete n[o];
}, Se = Co;
function yo(e) {
  return _o(e);
}
function _o(e, t) {
  const s = ks();
  s.__VUE__ = !0;
  const { insert: r, remove: n, patchProp: i, createElement: l, createText: o, createComment: a, setText: c, setElementText: u, parentNode: h, nextSibling: g, setScopeId: _ = Ke, insertStaticContent: V } = e, $ = (f, d, p, x = null, b = null, m = null, O = void 0, I = null, T = !!d.dynamicChildren) => {
    if (f === d) return;
    f && !mt(f, d) && (x = fs(f), ot(f, b, m, !0), f = null), d.patchFlag === -2 && (T = !1, d.dynamicChildren = null);
    const { type: y, ref: H, shapeFlag: M } = d;
    switch (y) {
      case Vs:
        X(f, d, p, x);
        break;
      case xe:
        G(f, d, p, x);
        break;
      case er:
        f == null && j(d, p, x, O);
        break;
      case pe:
        k(f, d, p, x, b, m, O, I, T);
        break;
      default:
        M & 1 ? C(f, d, p, x, b, m, O, I, T) : M & 6 ? re(f, d, p, x, b, m, O, I, T) : (M & 64 || M & 128) && y.process(f, d, p, x, b, m, O, I, T, St);
    }
    H != null && b ? Kt(H, f && f.ref, m, d || f, !d) : H == null && f && f.ref != null && Kt(f.ref, null, m, f, !0);
  }, X = (f, d, p, x) => {
    if (f == null) r(d.el = o(d.children), p, x);
    else {
      const b = d.el = f.el;
      d.children !== f.children && c(b, d.children);
    }
  }, G = (f, d, p, x) => {
    f == null ? r(d.el = a(d.children || ""), p, x) : d.el = f.el;
  }, j = (f, d, p, x) => {
    [f.el, f.anchor] = V(f.children, d, p, x, f.el, f.anchor);
  }, q = ({ el: f, anchor: d }, p, x) => {
    let b;
    for (; f && f !== d; )
      b = g(f), r(f, p, x), f = b;
    r(d, p, x);
  }, P = ({ el: f, anchor: d }) => {
    let p;
    for (; f && f !== d; )
      p = g(f), n(f), f = p;
    n(d);
  }, C = (f, d, p, x, b, m, O, I, T) => {
    if (d.type === "svg" ? O = "svg" : d.type === "math" && (O = "mathml"), f == null) A(d, p, x, b, m, O, I, T);
    else {
      const y = f.el && f.el._isVueCE ? f.el : null;
      try {
        y && y._beginPatch(), w(f, d, b, m, O, I, T);
      } finally {
        y && y._endPatch();
      }
    }
  }, A = (f, d, p, x, b, m, O, I) => {
    let T, y;
    const { props: H, shapeFlag: M, transition: F, dirs: B } = f;
    if (T = f.el = l(f.type, m, H && H.is, H), M & 8 ? u(T, f.children) : M & 16 && D(f.children, T, null, x, b, Zs(f, m), O, I), B && dt(f, null, x, "created"), E(T, f, f.scopeId, O, x), H) {
      for (const ee in H) ee !== "value" && !jt(ee) && i(T, ee, null, H[ee], m, x);
      "value" in H && i(T, "value", null, H.value, m), (y = H.onVnodeBeforeMount) && Ve(y, x, f);
    }
    B && dt(f, null, x, "beforeMount");
    const z = wo(b, F);
    z && F.beforeEnter(T), r(T, d, p), ((y = H && H.onVnodeMounted) || z || B) && Se(() => {
      y && Ve(y, x, f), z && F.enter(T), B && dt(f, null, x, "mounted");
    }, b);
  }, E = (f, d, p, x, b) => {
    if (p && _(f, p), x) for (let m = 0; m < x.length; m++) _(f, x[m]);
    if (b) {
      let m = b.subTree;
      if (d === m || Mi(m.type) && (m.ssContent === d || m.ssFallback === d)) {
        const O = b.vnode;
        E(f, O, O.scopeId, O.slotScopeIds, b.parent);
      }
    }
  }, D = (f, d, p, x, b, m, O, I, T = 0) => {
    for (let y = T; y < f.length; y++) $(null, f[y] = I ? Ye(f[y]) : Ue(f[y]), d, p, x, b, m, O, I);
  }, w = (f, d, p, x, b, m, O) => {
    const I = d.el = f.el;
    let { patchFlag: T, dynamicChildren: y, dirs: H } = d;
    T |= f.patchFlag & 16;
    const M = f.props || Q, F = d.props || Q;
    let B;
    if (p && ht(p, !1), (B = F.onVnodeBeforeUpdate) && Ve(B, p, d, f), H && dt(d, f, p, "beforeUpdate"), p && ht(p, !0), (M.innerHTML && F.innerHTML == null || M.textContent && F.textContent == null) && u(I, ""), y ? S(f.dynamicChildren, y, I, p, x, Zs(d, b), m) : O || Z(f, d, I, null, p, x, Zs(d, b), m, !1), T > 0) {
      if (T & 16) R(I, M, F, p, b);
      else if (T & 2 && M.class !== F.class && i(I, "class", null, F.class, b), T & 4 && i(I, "style", M.style, F.style, b), T & 8) {
        const z = d.dynamicProps;
        for (let ee = 0; ee < z.length; ee++) {
          const te = z[ee], ae = M[te], fe = F[te];
          (fe !== ae || te === "value") && i(I, te, ae, fe, b, p);
        }
      }
      T & 1 && f.children !== d.children && u(I, d.children);
    } else !O && y == null && R(I, M, F, p, b);
    ((B = F.onVnodeUpdated) || H) && Se(() => {
      B && Ve(B, p, d, f), H && dt(d, f, p, "updated");
    }, x);
  }, S = (f, d, p, x, b, m, O) => {
    for (let I = 0; I < d.length; I++) {
      const T = f[I], y = d[I];
      $(T, y, T.el && (T.type === pe || !mt(T, y) || T.shapeFlag & 198) ? h(T.el) : p, null, x, b, m, O, !0);
    }
  }, R = (f, d, p, x, b) => {
    if (d !== p) {
      if (d !== Q)
        for (const m in d) !jt(m) && !(m in p) && i(f, m, d[m], null, b, x);
      for (const m in p) {
        if (jt(m)) continue;
        const O = p[m], I = d[m];
        O !== I && m !== "value" && i(f, m, I, O, b, x);
      }
      "value" in p && i(f, "value", d.value, p.value, b);
    }
  }, k = (f, d, p, x, b, m, O, I, T) => {
    const y = d.el = f ? f.el : o(""), H = d.anchor = f ? f.anchor : o("");
    let { patchFlag: M, dynamicChildren: F, slotScopeIds: B } = d;
    B && (I = I ? I.concat(B) : B), f == null ? (r(y, p, x), r(H, p, x), D(d.children || [], p, H, b, m, O, I, T)) : M > 0 && M & 64 && F && f.dynamicChildren && f.dynamicChildren.length === F.length ? (S(f.dynamicChildren, F, p, b, m, O, I), (d.key != null || b && d === b.subTree) && Ei(f, d, !0)) : Z(f, d, p, H, b, m, O, I, T);
  }, re = (f, d, p, x, b, m, O, I, T) => {
    d.slotScopeIds = I, f == null ? d.shapeFlag & 512 ? b.ctx.activate(d, p, x, O, T) : ge(d, p, x, b, m, O, T) : Ge(f, d, T);
  }, ge = (f, d, p, x, b, m, O) => {
    const I = f.component = $o(f, x, b);
    if (Ls(f) && (I.ctx.renderer = St), Mo(I, !1, O), I.asyncDep) {
      if (b && b.registerDep(I, ce, O), !f.el) {
        const T = I.subTree = de(xe);
        G(null, T, d, p), f.placeholder = T.el;
      }
    } else ce(I, f, d, p, b, m, O);
  }, Ge = (f, d, p) => {
    const x = d.component = f.component;
    if (fo(f, d, p)) if (x.asyncDep && !x.asyncResolved) {
      ie(x, d, p);
      return;
    } else
      x.next = d, x.update();
    else
      d.el = f.el, x.vnode = d;
  }, ce = (f, d, p, x, b, m, O) => {
    const I = () => {
      if (f.isMounted) {
        let { next: M, bu: F, u: B, parent: z, vnode: ee } = f;
        {
          const Te = Oi(f);
          if (Te) {
            M && (M.el = ee.el, ie(f, M, O)), Te.asyncDep.then(() => {
              Se(() => {
                f.isUnmounted || y();
              }, b);
            });
            return;
          }
        }
        let te = M, ae;
        ht(f, !1), M ? (M.el = ee.el, ie(f, M, O)) : M = ee, F && ps(F), (ae = M.props && M.props.onVnodeBeforeUpdate) && Ve(ae, z, M, ee), ht(f, !0);
        const fe = Qs(f), De = f.subTree;
        f.subTree = fe, $(De, fe, h(De.el), fs(De), f, b, m), M.el = fe.el, te === null && co(f, fe.el), B && Se(B, b), (ae = M.props && M.props.onVnodeUpdated) && Se(() => Ve(ae, z, M, ee), b);
      } else {
        let M;
        const { el: F, props: B } = d, { bm: z, m: ee, parent: te, root: ae, type: fe } = f, De = qt(d);
        if (ht(f, !1), z && ps(z), !De && (M = B && B.onVnodeBeforeMount) && Ve(M, te, d), ht(f, !0), F && Ws) {
          const Te = () => {
            f.subTree = Qs(f), Ws(F, f.subTree, f, b, null);
          };
          De && fe.__asyncHydrate ? fe.__asyncHydrate(F, f, Te) : Te();
        } else {
          ae.ce && ae.ce._hasShadowRoot() && ae.ce._injectChildStyle(fe, f.parent ? f.parent.type : void 0);
          const Te = f.subTree = Qs(f);
          $(null, Te, p, x, f, b, m), d.el = Te.el;
        }
        if (ee && Se(ee, b), !De && (M = B && B.onVnodeMounted)) {
          const Te = d;
          Se(() => Ve(M, te, Te), b);
        }
        (d.shapeFlag & 256 || te && qt(te.vnode) && te.vnode.shapeFlag & 256) && f.a && Se(f.a, b), f.isMounted = !0, d = p = x = null;
      }
    };
    f.scope.on();
    const T = f.effect = new Dn(I);
    f.scope.off();
    const y = f.update = T.run.bind(T), H = f.job = T.runIfDirty.bind(T);
    H.i = f, H.id = f.uid, T.scheduler = () => Ir(H), ht(f, !0), y();
  }, ie = (f, d, p) => {
    d.component = f;
    const x = f.vnode.props;
    f.vnode = d, f.next = null, po(f, d.props, x, p), bo(f, d.children, p), tt(), Br(f), st();
  }, Z = (f, d, p, x, b, m, O, I, T = !1) => {
    const y = f && f.children, H = f ? f.shapeFlag : 0, M = d.children, { patchFlag: F, shapeFlag: B } = d;
    if (F > 0) {
      if (F & 128) {
        as(y, M, p, x, b, m, O, I, T);
        return;
      } else if (F & 256) {
        lt(y, M, p, x, b, m, O, I, T);
        return;
      }
    }
    B & 8 ? (H & 16 && Ft(y, b, m), M !== y && u(p, M)) : H & 16 ? B & 16 ? as(y, M, p, x, b, m, O, I, T) : Ft(y, b, m, !0) : (H & 8 && u(p, ""), B & 16 && D(M, p, x, b, m, O, I, T));
  }, lt = (f, d, p, x, b, m, O, I, T) => {
    f = f || It, d = d || It;
    const y = f.length, H = d.length, M = Math.min(y, H);
    let F;
    for (F = 0; F < M; F++) {
      const B = d[F] = T ? Ye(d[F]) : Ue(d[F]);
      $(f[F], B, p, null, b, m, O, I, T);
    }
    y > H ? Ft(f, b, m, !0, !1, M) : D(d, p, x, b, m, O, I, T, M);
  }, as = (f, d, p, x, b, m, O, I, T) => {
    let y = 0;
    const H = d.length;
    let M = f.length - 1, F = H - 1;
    for (; y <= M && y <= F; ) {
      const B = f[y], z = d[y] = T ? Ye(d[y]) : Ue(d[y]);
      if (mt(B, z)) $(B, z, p, null, b, m, O, I, T);
      else break;
      y++;
    }
    for (; y <= M && y <= F; ) {
      const B = f[M], z = d[F] = T ? Ye(d[F]) : Ue(d[F]);
      if (mt(B, z)) $(B, z, p, null, b, m, O, I, T);
      else break;
      M--, F--;
    }
    if (y > M) {
      if (y <= F) {
        const B = F + 1, z = B < H ? d[B].el : x;
        for (; y <= F; )
          $(null, d[y] = T ? Ye(d[y]) : Ue(d[y]), p, z, b, m, O, I, T), y++;
      }
    } else if (y > F) for (; y <= M; )
      ot(f[y], b, m, !0), y++;
    else {
      const B = y, z = y, ee = /* @__PURE__ */ new Map();
      for (y = z; y <= F; y++) {
        const Ie = d[y] = T ? Ye(d[y]) : Ue(d[y]);
        Ie.key != null && ee.set(Ie.key, y);
      }
      let te, ae = 0;
      const fe = F - z + 1;
      let De = !1, Te = 0;
      const Dt = new Array(fe);
      for (y = 0; y < fe; y++) Dt[y] = 0;
      for (y = B; y <= M; y++) {
        const Ie = f[y];
        if (ae >= fe) {
          ot(Ie, b, m, !0);
          continue;
        }
        let Ne;
        if (Ie.key != null) Ne = ee.get(Ie.key);
        else for (te = z; te <= F; te++) if (Dt[te - z] === 0 && mt(Ie, d[te])) {
          Ne = te;
          break;
        }
        Ne === void 0 ? ot(Ie, b, m, !0) : (Dt[Ne - z] = y + 1, Ne >= Te ? Te = Ne : De = !0, $(Ie, d[Ne], p, null, b, m, O, I, T), ae++);
      }
      const Fr = De ? xo(Dt) : It;
      for (te = Fr.length - 1, y = fe - 1; y >= 0; y--) {
        const Ie = z + y, Ne = d[Ie], Dr = d[Ie + 1], Lr = Ie + 1 < H ? Dr.el || $i(Dr) : x;
        Dt[y] === 0 ? $(null, Ne, p, Lr, b, m, O, I, T) : De && (te < 0 || y !== Fr[te] ? us(Ne, p, Lr, 2) : te--);
      }
    }
  }, us = (f, d, p, x, b = null) => {
    const { el: m, type: O, transition: I, children: T, shapeFlag: y } = f;
    if (y & 6) {
      us(f.component.subTree, d, p, x);
      return;
    }
    if (y & 128) {
      f.suspense.move(d, p, x);
      return;
    }
    if (y & 64) {
      O.move(f, d, p, St);
      return;
    }
    if (O === pe) {
      r(m, d, p);
      for (let H = 0; H < T.length; H++) us(T[H], d, p, x);
      r(f.anchor, d, p);
      return;
    }
    if (O === er) {
      q(f, d, p);
      return;
    }
    if (x !== 2 && y & 1 && I) if (x === 0) I.persisted && !m[Me] ? r(m, d, p) : (I.beforeEnter(m), r(m, d, p), Se(() => I.enter(m), b));
    else {
      const { leave: H, delayLeave: M, afterLeave: F } = I, B = () => {
        f.ctx.isUnmounted ? n(m) : r(m, d, p);
      }, z = () => {
        const ee = m._isLeaving || !!m[Me];
        m._isLeaving && m[Me](!0), I.persisted && !ee ? B() : H(m, () => {
          B(), F && F();
        });
      };
      M ? M(m, B, z) : z();
    }
    else r(m, d, p);
  }, ot = (f, d, p, x = !1, b = !1) => {
    const { type: m, props: O, ref: I, children: T, dynamicChildren: y, shapeFlag: H, patchFlag: M, dirs: F, cacheIndex: B, memo: z } = f;
    if (M === -2 && (b = !1), I != null && (tt(), Kt(I, null, p, f, !0), st()), B != null && (d.renderCache[B] = void 0), H & 256) {
      d.ctx.deactivate(f);
      return;
    }
    const ee = H & 1 && F, te = !qt(f);
    let ae;
    if (te && (ae = O && O.onVnodeBeforeUnmount) && Ve(ae, d, f), H & 6) ji(f.component, p, x);
    else {
      if (H & 128) {
        f.suspense.unmount(p, x);
        return;
      }
      ee && dt(f, null, d, "beforeUnmount"), H & 64 ? f.type.remove(f, d, p, St, x) : y && !y.hasOnce && (m !== pe || M > 0 && M & 64) ? Ft(y, d, p, !1, !0) : (m === pe && M & 384 || !b && H & 16) && Ft(T, d, p), x && kr(f);
    }
    const fe = z != null && B == null;
    (te && (ae = O && O.onVnodeUnmounted) || ee || fe) && Se(() => {
      ae && Ve(ae, d, f), ee && dt(f, null, d, "unmounted"), fe && (f.el = null);
    }, p);
  }, kr = (f) => {
    const { type: d, el: p, anchor: x, transition: b } = f;
    if (d === pe) {
      Bi(p, x);
      return;
    }
    if (d === er) {
      P(f);
      return;
    }
    const m = () => {
      n(p), b && !b.persisted && b.afterLeave && b.afterLeave();
    };
    if (f.shapeFlag & 1 && b && !b.persisted) {
      const { leave: O, delayLeave: I } = b, T = () => O(p, m);
      I ? I(f.el, m, T) : T();
    } else m();
  }, Bi = (f, d) => {
    let p;
    for (; f !== d; )
      p = g(f), n(f), f = p;
    n(d);
  }, ji = (f, d, p) => {
    const { bum: x, scope: b, job: m, subTree: O, um: I, m: T, a: y } = f;
    Qr(T), Qr(y), x && ps(x), b.stop(), m && (m.flags |= 8, ot(O, f, d, p)), I && Se(I, d), Se(() => {
      f.isUnmounted = !0;
    }, d);
  }, Ft = (f, d, p, x = !1, b = !1, m = 0) => {
    for (let O = m; O < f.length; O++) ot(f[O], d, p, x, b);
  }, fs = (f) => {
    if (f.shapeFlag & 6) return fs(f.component.subTree);
    if (f.shapeFlag & 128) return f.suspense.next();
    const d = g(f.anchor || f.el), p = d && d[Dl];
    return p ? g(p) : d;
  };
  let js = !1;
  const Pr = (f, d, p) => {
    let x;
    f == null ? d._vnode && (ot(d._vnode, null, null, !0), x = d._vnode.component) : $(d._vnode || null, f, d, null, null, null, p), d._vnode = f, js || (js = !0, Br(x), Zn(), js = !1);
  }, St = {
    p: $,
    um: ot,
    m: us,
    r: kr,
    mt: ge,
    mc: D,
    pc: Z,
    pbc: S,
    n: fs,
    o: e
  };
  let Us, Ws;
  return t && ([Us, Ws] = t(St)), {
    render: Pr,
    hydrate: Us,
    createApp: no(Pr, Us)
  };
}
function Zs({ type: e, props: t }, s) {
  return s === "svg" && e === "foreignObject" || s === "mathml" && e === "annotation-xml" && t && t.encoding && t.encoding.includes("html") ? void 0 : s;
}
function ht({ effect: e, job: t }, s) {
  s ? (e.flags |= 32, t.flags |= 4) : (e.flags &= -33, t.flags &= -5);
}
function wo(e, t) {
  return (!e || e && !e.pendingBranch) && t && !t.persisted;
}
function Ei(e, t, s = !1) {
  const r = e.children, n = t.children;
  if (N(r) && N(n)) for (let i = 0; i < r.length; i++) {
    const l = r[i];
    let o = n[i];
    o.shapeFlag & 1 && !o.dynamicChildren && ((o.patchFlag <= 0 || o.patchFlag === 32) && (o = n[i] = Ye(n[i]), o.el = l.el), !s && o.patchFlag !== -2 && Ei(l, o)), o.type === Vs && (o.patchFlag === -1 && (o = n[i] = Ye(o)), o.el = l.el), o.type === xe && !o.el && (o.el = l.el);
  }
}
function xo(e) {
  const t = e.slice(), s = [0];
  let r, n, i, l, o;
  const a = e.length;
  for (r = 0; r < a; r++) {
    const c = e[r];
    if (c !== 0) {
      if (n = s[s.length - 1], e[n] < c) {
        t[r] = n, s.push(r);
        continue;
      }
      for (i = 0, l = s.length - 1; i < l; )
        o = i + l >> 1, e[s[o]] < c ? i = o + 1 : l = o;
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
function $i(e) {
  if (e.placeholder) return e.placeholder;
  const t = e.component;
  return t ? $i(t.subTree) : null;
}
var Mi = (e) => e.__isSuspense;
function Co(e, t) {
  t && t.pendingBranch ? N(e) ? t.effects.push(...e) : t.effects.push(e) : $l(e);
}
var pe = /* @__PURE__ */ Symbol.for("v-fgt"), Vs = /* @__PURE__ */ Symbol.for("v-txt"), xe = /* @__PURE__ */ Symbol.for("v-cmt"), er = /* @__PURE__ */ Symbol.for("v-stc"), Xt = [], Oe = null;
function L(e = !1) {
  Xt.push(Oe = e ? null : []);
}
function So() {
  Xt.pop(), Oe = Xt[Xt.length - 1] || null;
}
var Zt = 1;
function xs(e, t = !1) {
  Zt += e, e < 0 && Oe && t && (Oe.hasOnce = !0);
}
function ki(e) {
  return e.dynamicChildren = Zt > 0 ? Oe || It : null, So(), Zt > 0 && Oe && Oe.push(e), e;
}
function U(e, t, s, r, n, i) {
  return ki(v(e, t, s, r, n, i, !0));
}
function xt(e, t, s, r, n) {
  return ki(de(e, t, s, r, n, !0));
}
function Cs(e) {
  return e ? e.__v_isVNode === !0 : !1;
}
function mt(e, t) {
  return e.type === t.type && e.key === t.key;
}
var Pi = ({ key: e }) => e ?? null, gs = ({ ref: e, ref_key: t, ref_for: s }) => (typeof e == "number" && (e = "" + e), e != null ? ne(e) || /* @__PURE__ */ ye(e) || W(e) ? {
  i: Ee,
  r: e,
  k: t,
  f: !!s
} : e : null);
function v(e, t = null, s = null, r = 0, n = null, i = e === pe ? 0 : 1, l = !1, o = !1) {
  const a = {
    __v_isVNode: !0,
    __v_skip: !0,
    type: e,
    props: t,
    key: t && Pi(t),
    ref: t && gs(t),
    scopeId: ti,
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
    ctx: Ee
  };
  return o ? (Mr(a, s), i & 128 && e.normalize(a)) : s && (a.shapeFlag |= ne(s) ? 8 : 16), Zt > 0 && !l && Oe && (a.patchFlag > 0 || i & 6) && a.patchFlag !== 32 && Oe.push(a), a;
}
var de = Ao;
function Ao(e, t = null, s = null, r = 0, n = null, i = !1) {
  if ((!e || e === vi) && (e = xe), Cs(e)) {
    const o = ft(e, t, !0);
    return s && Mr(o, s), Zt > 0 && !i && Oe && (o.shapeFlag & 6 ? Oe[Oe.indexOf(e)] = o : Oe.push(o)), o.patchFlag = -2, o;
  }
  if (Lo(e) && (e = e.__vccOpts), t) {
    t = To(t);
    let { class: o, style: a } = t;
    o && !ne(o) && (t.class = ct(o)), Y(a) && (/* @__PURE__ */ Ar(a) && !N(a) && (a = oe({}, a)), t.style = Ps(a));
  }
  const l = ne(e) ? 1 : Mi(e) ? 128 : ii(e) ? 64 : Y(e) ? 4 : W(e) ? 2 : 0;
  return v(e, t, s, r, n, l, i, !0);
}
function To(e) {
  return e ? /* @__PURE__ */ Ar(e) || xi(e) ? oe({}, e) : e : null;
}
function ft(e, t, s = !1, r = !1) {
  const { props: n, ref: i, patchFlag: l, children: o, transition: a } = e, c = t ? Io(n || {}, t) : n, u = {
    __v_isVNode: !0,
    __v_skip: !0,
    type: e.type,
    props: c,
    key: c && Pi(c),
    ref: t && t.ref ? s && i ? N(i) ? i.concat(gs(t)) : [i, gs(t)] : gs(t) : i,
    scopeId: e.scopeId,
    slotScopeIds: e.slotScopeIds,
    children: o,
    target: e.target,
    targetStart: e.targetStart,
    targetAnchor: e.targetAnchor,
    staticCount: e.staticCount,
    shapeFlag: e.shapeFlag,
    patchFlag: t && e.type !== pe ? l === -1 ? 16 : l | 16 : l,
    dynamicProps: e.dynamicProps,
    dynamicChildren: e.dynamicChildren,
    appContext: e.appContext,
    dirs: e.dirs,
    transition: a,
    component: e.component,
    suspense: e.suspense,
    ssContent: e.ssContent && ft(e.ssContent),
    ssFallback: e.ssFallback && ft(e.ssFallback),
    placeholder: e.placeholder,
    el: e.el,
    anchor: e.anchor,
    ctx: e.ctx,
    ce: e.ce
  };
  return a && r && Qt(u, a.clone(u)), u;
}
function ke(e = " ", t = 0) {
  return de(Vs, null, e, t);
}
function ve(e = "", t = !1) {
  return t ? (L(), xt(xe, null, e)) : de(xe, null, e);
}
function Ue(e) {
  return e == null || typeof e == "boolean" ? de(xe) : N(e) ? de(pe, null, e.slice()) : Cs(e) ? Ye(e) : de(Vs, null, String(e));
}
function Ye(e) {
  return e.el === null && e.patchFlag !== -1 || e.memo ? e : ft(e);
}
function Mr(e, t) {
  let s = 0;
  const { shapeFlag: r } = e;
  if (t == null) t = null;
  else if (N(t)) s = 16;
  else if (typeof t == "object") if (r & 65) {
    const n = t.default;
    n && (n._c && (n._d = !1), Mr(e, n()), n._c && (n._d = !0));
    return;
  } else {
    s = 32;
    const n = t._;
    !n && !xi(t) ? t._ctx = Ee : n === 3 && Ee && (Ee.slots._ === 1 ? t._ = 1 : (t._ = 2, e.patchFlag |= 1024));
  }
  else W(t) ? (t = {
    default: t,
    _ctx: Ee
  }, s = 32) : (t = String(t), r & 64 ? (s = 16, t = [ke(t)]) : s = 8);
  e.children = t, e.shapeFlag |= s;
}
function Io(...e) {
  const t = {};
  for (let s = 0; s < e.length; s++) {
    const r = e[s];
    for (const n in r) if (n === "class")
      t.class !== r.class && (t.class = ct([t.class, r.class]));
    else if (n === "style") t.style = Ps([t.style, r.style]);
    else if (Is(n)) {
      const i = t[n], l = r[n];
      l && i !== l && !(N(i) && i.includes(l)) ? t[n] = i ? [].concat(i, l) : l : l == null && i == null && !Es(n) && (t[n] = l);
    } else n !== "" && (t[n] = r[n]);
  }
  return t;
}
function Ve(e, t, s, r = null) {
  Fe(e, t, 7, [s, r]);
}
var Eo = mi(), Oo = 0;
function $o(e, t, s) {
  const r = e.type, n = (t ? t.appContext : e.appContext) || Eo, i = {
    uid: Oo++,
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
    scope: new el(!0),
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
    propsOptions: Si(r, n),
    emitsOptions: bi(r, n),
    emit: null,
    emitted: null,
    propsDefaults: Q,
    inheritAttrs: r.inheritAttrs,
    ctx: Q,
    data: Q,
    props: Q,
    attrs: Q,
    slots: Q,
    refs: Q,
    setupState: Q,
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
  return i.ctx = { _: i }, i.root = t ? t.root : i, i.emit = lo.bind(null, i), e.ce && e.ce(i), i;
}
var be = null, Fi = () => be || Ee, Ss, pr;
{
  const e = ks(), t = (s, r) => {
    let n;
    return (n = e[s]) || (n = e[s] = []), n.push(r), (i) => {
      n.length > 1 ? n.forEach((l) => l(i)) : n[0](i);
    };
  };
  Ss = t("__VUE_INSTANCE_SETTERS__", (s) => be = s), pr = t("__VUE_SSR_SETTERS__", (s) => es = s);
}
var os = (e) => {
  const t = be;
  return Ss(e), e.scope.on(), () => {
    e.scope.off(), Ss(t);
  };
}, Zr = () => {
  be && be.scope.off(), Ss(null);
};
function Di(e) {
  return e.vnode.shapeFlag & 4;
}
var es = !1;
function Mo(e, t = !1, s = !1) {
  t && pr(t);
  const { props: r, children: n } = e.vnode, i = Di(e);
  ho(e, r, i, t), mo(e, n, s || t);
  const l = i ? ko(e, t) : void 0;
  return t && pr(!1), l;
}
function ko(e, t) {
  const s = e.type;
  e.accessCache = /* @__PURE__ */ Object.create(null), e.proxy = new Proxy(e.ctx, Yl);
  const { setup: r } = s;
  if (r) {
    tt();
    const n = e.setupContext = r.length > 1 ? Fo(e) : null, i = os(e), l = ns(r, e, 0, [e.props, n]), o = Tn(l);
    if (st(), i(), (o || e.sp) && !qt(e) && ci(e), o) {
      if (l.then(Zr, Zr), t) return l.then((a) => {
        en(e, a, t);
      }).catch((a) => {
        Ds(a, e, 0);
      });
      e.asyncDep = l;
    } else en(e, l, t);
  } else Li(e, t);
}
function en(e, t, s) {
  W(t) ? e.type.__ssrInlineRender ? e.ssrRender = t : e.render = t : Y(t) && (e.setupState = Jn(t)), Li(e, s);
}
var tn, sn;
function Li(e, t, s) {
  const r = e.type;
  if (!e.render) {
    if (!t && tn && !r.render) {
      const n = r.template || Er(e).template;
      if (n) {
        const { isCustomElement: i, compilerOptions: l } = e.appContext.config, { delimiters: o, compilerOptions: a } = r, c = oe(oe({
          isCustomElement: i,
          delimiters: o
        }, l), a);
        r.render = tn(n, c);
      }
    }
    e.render = r.render || Ke, sn && sn(e);
  }
  {
    const n = os(e);
    tt();
    try {
      Ql(e);
    } finally {
      st(), n();
    }
  }
}
var Po = { get(e, t) {
  return me(e, "get", ""), e[t];
} };
function Fo(e) {
  const t = (s) => {
    e.exposed = s || {};
  };
  return {
    attrs: new Proxy(e.attrs, Po),
    slots: e.slots,
    emit: e.emit,
    expose: t
  };
}
function Bs(e) {
  return e.exposed ? e.exposeProxy || (e.exposeProxy = new Proxy(Jn(_l(e.exposed)), {
    get(t, s) {
      if (s in t) return t[s];
      if (s in Gt) return Gt[s](e);
    },
    has(t, s) {
      return s in t || s in Gt;
    }
  })) : e.proxy;
}
function Do(e, t = !0) {
  return W(e) ? e.displayName || e.name : e.name || t && e.__name;
}
function Lo(e) {
  return W(e) && "__vccOpts" in e;
}
var nt = (e, t) => /* @__PURE__ */ Al(e, t, es);
function Ro(e, t, s) {
  try {
    xs(-1);
    const r = arguments.length;
    return r === 2 ? Y(t) && !N(t) ? Cs(t) ? de(e, null, [t]) : de(e, t) : de(e, null, t) : (r > 3 ? s = Array.prototype.slice.call(arguments, 2) : r === 3 && Cs(s) && (s = [s]), de(e, t, s));
  } finally {
    xs(1);
  }
}
var Ho = "3.5.35", vr = void 0, rn = typeof window < "u" && window.trustedTypes;
if (rn) try {
  vr = /* @__PURE__ */ rn.createPolicy("vue", { createHTML: (e) => e });
} catch {
}
var Ri = vr ? (e) => vr.createHTML(e) : (e) => e, No = "http://www.w3.org/2000/svg", Vo = "http://www.w3.org/1998/Math/MathML", Je = typeof document < "u" ? document : null, nn = Je && /* @__PURE__ */ Je.createElement("template"), Bo = {
  insert: (e, t, s) => {
    t.insertBefore(e, s || null);
  },
  remove: (e) => {
    const t = e.parentNode;
    t && t.removeChild(e);
  },
  createElement: (e, t, s, r) => {
    const n = t === "svg" ? Je.createElementNS(No, e) : t === "mathml" ? Je.createElementNS(Vo, e) : s ? Je.createElement(e, { is: s }) : Je.createElement(e);
    return e === "select" && r && r.multiple != null && n.setAttribute("multiple", r.multiple), n;
  },
  createText: (e) => Je.createTextNode(e),
  createComment: (e) => Je.createComment(e),
  setText: (e, t) => {
    e.nodeValue = t;
  },
  setElementText: (e, t) => {
    e.textContent = t;
  },
  parentNode: (e) => e.parentNode,
  nextSibling: (e) => e.nextSibling,
  querySelector: (e) => Je.querySelector(e),
  setScopeId(e, t) {
    e.setAttribute(t, "");
  },
  insertStaticContent(e, t, s, r, n, i) {
    const l = s ? s.previousSibling : t.lastChild;
    if (n && (n === i || n.nextSibling)) for (; t.insertBefore(n.cloneNode(!0), s), !(n === i || !(n = n.nextSibling)); )
      ;
    else {
      nn.innerHTML = Ri(r === "svg" ? `<svg>${e}</svg>` : r === "mathml" ? `<math>${e}</math>` : e);
      const o = nn.content;
      if (r === "svg" || r === "mathml") {
        const a = o.firstChild;
        for (; a.firstChild; ) o.appendChild(a.firstChild);
        o.removeChild(a);
      }
      t.insertBefore(o, s);
    }
    return [l ? l.nextSibling : t.firstChild, s ? s.previousSibling : t.lastChild];
  }
}, at = "transition", Ht = "animation", ts = /* @__PURE__ */ Symbol("_vtc"), Hi = {
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
}, jo = /* @__PURE__ */ oe({}, li, Hi), Uo = (e) => (e.displayName = "Transition", e.props = jo, e), Wo = /* @__PURE__ */ Uo((e, { slots: t }) => Ro(Hl, Ko(e), t)), pt = (e, t = []) => {
  N(e) ? e.forEach((s) => s(...t)) : e && e(...t);
}, ln = (e) => e ? N(e) ? e.some((t) => t.length > 1) : e.length > 1 : !1;
function Ko(e) {
  const t = {};
  for (const k in e) k in Hi || (t[k] = e[k]);
  if (e.css === !1) return t;
  const { name: s = "v", type: r, duration: n, enterFromClass: i = `${s}-enter-from`, enterActiveClass: l = `${s}-enter-active`, enterToClass: o = `${s}-enter-to`, appearFromClass: a = i, appearActiveClass: c = l, appearToClass: u = o, leaveFromClass: h = `${s}-leave-from`, leaveActiveClass: g = `${s}-leave-active`, leaveToClass: _ = `${s}-leave-to` } = e, V = qo(n), $ = V && V[0], X = V && V[1], { onBeforeEnter: G, onEnter: j, onEnterCancelled: q, onLeave: P, onLeaveCancelled: C, onBeforeAppear: A = G, onAppear: E = j, onAppearCancelled: D = q } = t, w = (k, re, ge, Ge) => {
    k._enterCancelled = Ge, vt(k, re ? u : o), vt(k, re ? c : l), ge && ge();
  }, S = (k, re) => {
    k._isLeaving = !1, vt(k, h), vt(k, _), vt(k, g), re && re();
  }, R = (k) => (re, ge) => {
    const Ge = k ? E : j, ce = () => w(re, k, ge);
    pt(Ge, [re, ce]), on(() => {
      vt(re, k ? a : i), ze(re, k ? u : o), ln(Ge) || an(re, r, $, ce);
    });
  };
  return oe(t, {
    onBeforeEnter(k) {
      pt(G, [k]), ze(k, i), ze(k, l);
    },
    onBeforeAppear(k) {
      pt(A, [k]), ze(k, a), ze(k, c);
    },
    onEnter: R(!1),
    onAppear: R(!0),
    onLeave(k, re) {
      k._isLeaving = !0;
      const ge = () => S(k, re);
      ze(k, h), k._enterCancelled ? (ze(k, g), cn(k)) : (cn(k), ze(k, g)), on(() => {
        k._isLeaving && (vt(k, h), ze(k, _), ln(P) || an(k, r, X, ge));
      }), pt(P, [k, ge]);
    },
    onEnterCancelled(k) {
      w(k, !1, void 0, !0), pt(q, [k]);
    },
    onAppearCancelled(k) {
      w(k, !0, void 0, !0), pt(D, [k]);
    },
    onLeaveCancelled(k) {
      S(k), pt(C, [k]);
    }
  });
}
function qo(e) {
  if (e == null) return null;
  if (Y(e)) return [tr(e.enter), tr(e.leave)];
  {
    const t = tr(e);
    return [t, t];
  }
}
function tr(e) {
  return Gi(e);
}
function ze(e, t) {
  t.split(/\s+/).forEach((s) => s && e.classList.add(s)), (e[ts] || (e[ts] = /* @__PURE__ */ new Set())).add(t);
}
function vt(e, t) {
  t.split(/\s+/).forEach((r) => r && e.classList.remove(r));
  const s = e[ts];
  s && (s.delete(t), s.size || (e[ts] = void 0));
}
function on(e) {
  requestAnimationFrame(() => {
    requestAnimationFrame(e);
  });
}
var Go = 0;
function an(e, t, s, r) {
  const n = e._endId = ++Go, i = () => {
    n === e._endId && r();
  };
  if (s != null) return setTimeout(i, s);
  const { type: l, timeout: o, propCount: a } = Xo(e, t);
  if (!l) return r();
  const c = l + "end";
  let u = 0;
  const h = () => {
    e.removeEventListener(c, g), i();
  }, g = (_) => {
    _.target === e && ++u >= a && h();
  };
  setTimeout(() => {
    u < a && h();
  }, o + 1), e.addEventListener(c, g);
}
function Xo(e, t) {
  const s = window.getComputedStyle(e), r = (V) => (s[V] || "").split(", "), n = r(`${at}Delay`), i = r(`${at}Duration`), l = un(n, i), o = r(`${Ht}Delay`), a = r(`${Ht}Duration`), c = un(o, a);
  let u = null, h = 0, g = 0;
  t === at ? l > 0 && (u = at, h = l, g = i.length) : t === Ht ? c > 0 && (u = Ht, h = c, g = a.length) : (h = Math.max(l, c), u = h > 0 ? l > c ? at : Ht : null, g = u ? u === at ? i.length : a.length : 0);
  const _ = u === at && /\b(?:transform|all)(?:,|$)/.test(r(`${at}Property`).toString());
  return {
    type: u,
    timeout: h,
    propCount: g,
    hasTransform: _
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
function zo(e, t, s) {
  const r = e[ts];
  r && (t = (t ? [t, ...r] : [...r]).join(" ")), t == null ? e.removeAttribute("class") : s ? e.setAttribute("class", t) : e.className = t;
}
var dn = /* @__PURE__ */ Symbol("_vod"), Jo = /* @__PURE__ */ Symbol("_vsh"), Yo = /* @__PURE__ */ Symbol(""), Qo = /(?:^|;)\s*display\s*:/;
function Zo(e, t, s) {
  const r = e.style, n = ne(s);
  let i = !1;
  if (s && !n) {
    if (t) if (ne(t))
      for (const l of t.split(";")) {
        const o = l.slice(0, l.indexOf(":")).trim();
        s[o] == null && Bt(r, o, "");
      }
    else for (const l in t) s[l] == null && Bt(r, l, "");
    for (const l in s) {
      l === "display" && (i = !0);
      const o = s[l];
      o != null ? ta(e, l, !ne(t) && t ? t[l] : void 0, o) || Bt(r, l, o) : Bt(r, l, "");
    }
  } else if (n) {
    if (t !== s) {
      const l = r[Yo];
      l && (s += ";" + l), r.cssText = s, i = Qo.test(s);
    }
  } else t && e.removeAttribute("style");
  dn in e && (e[dn] = i ? r.display : "", e[Jo] && (r.display = "none"));
}
var hn = /\s*!important$/;
function Bt(e, t, s) {
  if (N(s)) s.forEach((r) => Bt(e, t, r));
  else if (s == null && (s = ""), t.startsWith("--")) e.setProperty(t, s);
  else {
    const r = ea(e, t);
    hn.test(s) ? e.setProperty(Ct(r), s.replace(hn, ""), "important") : e[r] = s;
  }
}
var pn = [
  "Webkit",
  "Moz",
  "ms"
], sr = {};
function ea(e, t) {
  const s = sr[t];
  if (s) return s;
  let r = Ce(t);
  if (r !== "filter" && r in e) return sr[t] = r;
  r = Ms(r);
  for (let n = 0; n < pn.length; n++) {
    const i = pn[n] + r;
    if (i in e) return sr[t] = i;
  }
  return t;
}
function ta(e, t, s, r) {
  return e.tagName === "TEXTAREA" && (t === "width" || t === "height") && ne(r) && s === r;
}
var vn = "http://www.w3.org/1999/xlink";
function gn(e, t, s, r, n, i = Qi(t)) {
  r && t.startsWith("xlink:") ? s == null ? e.removeAttributeNS(vn, t.slice(6, t.length)) : e.setAttributeNS(vn, t, s) : s == null || i && !Mn(s) ? e.removeAttribute(t) : e.setAttribute(t, i ? "" : qe(s) ? String(s) : s);
}
function mn(e, t, s, r, n) {
  if (t === "innerHTML" || t === "textContent") {
    s != null && (e[t] = t === "innerHTML" ? Ri(s) : s);
    return;
  }
  const i = e.tagName;
  if (t === "value" && i !== "PROGRESS" && !i.includes("-")) {
    const o = i === "OPTION" ? e.getAttribute("value") || "" : e.value, a = s == null ? e.type === "checkbox" ? "on" : "" : String(s);
    (o !== a || !("_value" in e)) && (e.value = a), s == null && e.removeAttribute(t), e._value = s;
    return;
  }
  let l = !1;
  if (s === "" || s == null) {
    const o = typeof e[t];
    o === "boolean" ? s = Mn(s) : s == null && o === "string" ? (s = "", l = !0) : o === "number" && (s = 0, l = !0);
  }
  try {
    e[t] = s;
  } catch {
  }
  l && e.removeAttribute(n || t);
}
function bt(e, t, s, r) {
  e.addEventListener(t, s, r);
}
function sa(e, t, s, r) {
  e.removeEventListener(t, s, r);
}
var bn = /* @__PURE__ */ Symbol("_vei");
function ra(e, t, s, r, n = null) {
  const i = e[bn] || (e[bn] = {}), l = i[t];
  if (r && l) l.value = r;
  else {
    const [o, a] = na(t);
    r ? bt(e, o, i[t] = oa(r, n), a) : l && (sa(e, o, l, a), i[t] = void 0);
  }
}
var yn = /(?:Once|Passive|Capture)$/;
function na(e) {
  let t;
  if (yn.test(e)) {
    t = {};
    let s;
    for (; s = e.match(yn); )
      e = e.slice(0, e.length - s[0].length), t[s[0].toLowerCase()] = !0;
  }
  return [e[2] === ":" ? e.slice(3) : Ct(e.slice(2)), t];
}
var rr = 0, ia = /* @__PURE__ */ Promise.resolve(), la = () => rr || (ia.then(() => rr = 0), rr = Date.now());
function oa(e, t) {
  const s = (r) => {
    if (!r._vts) r._vts = Date.now();
    else if (r._vts <= s.attached) return;
    const n = s.value;
    if (N(n)) {
      const i = r.stopImmediatePropagation;
      r.stopImmediatePropagation = () => {
        i.call(r), r._stopped = !0;
      };
      const l = n.slice(), o = [r];
      for (let a = 0; a < l.length && !r._stopped; a++) {
        const c = l[a];
        c && Fe(c, t, 5, o);
      }
    } else Fe(n, t, 5, [r]);
  };
  return s.value = e, s.attached = la(), s;
}
var _n = (e) => e.charCodeAt(0) === 111 && e.charCodeAt(1) === 110 && e.charCodeAt(2) > 96 && e.charCodeAt(2) < 123, aa = (e, t, s, r, n, i) => {
  const l = n === "svg";
  t === "class" ? zo(e, r, l) : t === "style" ? Zo(e, s, r) : Is(t) ? Es(t) || ra(e, t, s, r, i) : (t[0] === "." ? (t = t.slice(1), !0) : t[0] === "^" ? (t = t.slice(1), !1) : ua(e, t, r, l)) ? (mn(e, t, r), !e.tagName.includes("-") && (t === "value" || t === "checked" || t === "selected") && gn(e, t, r, l, i, t !== "value")) : e._isVueCE && (fa(e, t) || e._def.__asyncLoader && (/[A-Z]/.test(t) || !ne(r))) ? mn(e, Ce(t), r, i, t) : (t === "true-value" ? e._trueValue = r : t === "false-value" && (e._falseValue = r), gn(e, t, r, l));
};
function ua(e, t, s, r) {
  if (r)
    return !!(t === "innerHTML" || t === "textContent" || t in e && _n(t) && W(s));
  if (t === "spellcheck" || t === "draggable" || t === "translate" || t === "autocorrect" || t === "sandbox" && e.tagName === "IFRAME" || t === "form" || t === "list" && e.tagName === "INPUT" || t === "type" && e.tagName === "TEXTAREA") return !1;
  if (t === "width" || t === "height") {
    const n = e.tagName;
    if (n === "IMG" || n === "VIDEO" || n === "CANVAS" || n === "SOURCE") return !1;
  }
  return _n(t) && ne(s) ? !1 : t in e;
}
function fa(e, t) {
  const s = e._def.props;
  if (!s) return !1;
  const r = Ce(t);
  return Array.isArray(s) ? s.some((n) => Ce(n) === r) : Object.keys(s).some((n) => Ce(n) === r);
}
var As = (e) => {
  const t = e.props["onUpdate:modelValue"] || !1;
  return N(t) ? (s) => ps(t, s) : t;
};
function ca(e) {
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
var et = {
  created(e, { modifiers: { lazy: t, trim: s, number: r } }, n) {
    e[kt] = As(n);
    const i = r || n.props && n.props.type === "number";
    bt(e, t ? "change" : "input", (l) => {
      l.target.composing || e[kt](xn(e.value, s, i));
    }), (s || i) && bt(e, "change", () => {
      e.value = xn(e.value, s, i);
    }), t || (bt(e, "compositionstart", ca), bt(e, "compositionend", wn), bt(e, "change", wn));
  },
  mounted(e, { value: t }) {
    e.value = t ?? "";
  },
  beforeUpdate(e, { value: t, oldValue: s, modifiers: { lazy: r, trim: n, number: i } }, l) {
    if (e[kt] = As(l), e.composing) return;
    const o = (i || e.type === "number") && !/^0\d/.test(e.value) ? br(e.value) : e.value, a = t ?? "";
    if (o === a) return;
    const c = e.getRootNode();
    (c instanceof Document || c instanceof ShadowRoot) && c.activeElement === e && e.type !== "range" && (r && t === s || n && e.value.trim() === a) || (e.value = a);
  }
}, Nt = {
  deep: !0,
  created(e, t, s) {
    e[kt] = As(s), bt(e, "change", () => {
      const r = e._modelValue, n = da(e), i = e.checked, l = e[kt];
      if (N(r)) {
        const o = kn(r, n), a = o !== -1;
        if (i && !a) l(r.concat(n));
        else if (!i && a) {
          const c = [...r];
          c.splice(o, 1), l(c);
        }
      } else if (Os(r)) {
        const o = new Set(r);
        i ? o.add(n) : o.delete(n), l(o);
      } else l(Ni(e, i));
    });
  },
  mounted: Cn,
  beforeUpdate(e, t, s) {
    e[kt] = As(s), Cn(e, t, s);
  }
};
function Cn(e, { value: t, oldValue: s }, r) {
  e._modelValue = t;
  let n;
  if (N(t)) n = kn(t, r.props.value) > -1;
  else if (Os(t)) n = t.has(r.props.value);
  else {
    if (t === s) return;
    n = rs(t, Ni(e, !0));
  }
  e.checked !== n && (e.checked = n);
}
function da(e) {
  return "_value" in e ? e._value : e.value;
}
function Ni(e, t) {
  const s = t ? "_trueValue" : "_falseValue";
  return s in e ? e[s] : t;
}
var ha = [
  "ctrl",
  "shift",
  "alt",
  "meta"
], pa = {
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
  exact: (e, t) => ha.some((s) => e[`${s}Key`] && !t.includes(s))
}, Vi = (e, t) => {
  if (!e) return e;
  const s = e._withMods || (e._withMods = {}), r = t.join(".");
  return s[r] || (s[r] = ((n, ...i) => {
    for (let l = 0; l < t.length; l++) {
      const o = pa[t[l]];
      if (o && o(n, t)) return;
    }
    return e(n, ...i);
  }));
}, va = /* @__PURE__ */ oe({ patchProp: aa }, Bo), Sn;
function ga() {
  return Sn || (Sn = yo(va));
}
var ma = ((...e) => {
  const t = ga().createApp(...e), { mount: s } = t;
  return t.mount = (r) => {
    const n = ya(r);
    if (!n) return;
    const i = t._component;
    !W(i) && !i.render && !i.template && (i.template = n.innerHTML), n.nodeType === 1 && (n.textContent = "");
    const l = s(n, !1, ba(n));
    return n instanceof Element && (n.removeAttribute("v-cloak"), n.setAttribute("data-v-app", "")), l;
  }, t;
});
function ba(e) {
  if (e instanceof SVGElement) return "svg";
  if (typeof MathMLElement == "function" && e instanceof MathMLElement) return "mathml";
}
function ya(e) {
  return ne(e) ? document.querySelector(e) : e;
}
var _a = ["src"], wa = {
  key: 1,
  class: "fourth-wall-avatar is-placeholder",
  "aria-hidden": "true"
}, xa = { class: "fourth-wall-message-stack" }, Ca = {
  key: 0,
  class: "fourth-wall-thinking"
}, Sa = { class: "fourth-wall-bubble" }, Aa = {
  key: 0,
  class: "fourth-wall-message-text"
}, Ta = {
  key: 1,
  class: "fourth-wall-image-card"
}, Ia = ["src", "alt"], Ea = ["onClick"], Oa = { key: 2 }, $a = { key: 3 }, Ma = ["onClick"], ka = { "aria-hidden": "true" }, Pa = { key: 0 }, Fa = { class: "fourth-wall-message-actions" }, Da = { key: 1 }, La = /* @__PURE__ */ He({
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
    const s = e, r = t, n = /* @__PURE__ */ ue(!1), i = /* @__PURE__ */ ue(""), l = /* @__PURE__ */ wt({}), o = /* @__PURE__ */ new Set();
    let a = () => {
    };
    function c(C) {
      const A = /\[(?:img|图片)\s*:\s*([^\]]+)\]|\[(?:voice|语音)\s*:([^:\]]*):([^\]]+)\]|\[(?:voice|语音)\s*:\s*([^\]]+)\]/gi, E = [];
      let D = 0, w;
      for (; (w = A.exec(C)) !== null; )
        w.index > D && E.push({
          kind: "text",
          raw: C.slice(D, w.index),
          value: C.slice(D, w.index)
        }), w[1] !== void 0 ? E.push({
          kind: "image",
          raw: w[0],
          value: w[1].trim()
        }) : E.push({
          kind: "voice",
          raw: w[0],
          value: String(w[3] ?? w[4] ?? "").trim(),
          emotion: String(w[2] || "").trim().toLowerCase()
        }), D = A.lastIndex;
      return D < C.length && E.push({
        kind: "text",
        raw: C.slice(D),
        value: C.slice(D)
      }), E.length ? E : [{
        kind: "text",
        raw: C,
        value: C
      }];
    }
    const u = nt(() => c(s.message.content)), h = nt(() => s.message.ts ? new Intl.DateTimeFormat("zh-CN", {
      hour: "2-digit",
      minute: "2-digit"
    }).format(s.message.ts) : "");
    function g(C, A) {
      return `fw-${C}-${Date.now()}-${s.messageIndex}-${A}-${Math.random().toString(36).slice(2, 7)}`;
    }
    function _(C) {
      return C.result;
    }
    function V(C, A) {
      return o.has(A) && l[C]?.requestId === A;
    }
    async function $(C, A) {
      if (l[A]?.status === "loading" || l[A]?.status === "ready") return;
      if (!s.imageAvailable) {
        l[A] = {
          status: "unavailable",
          message: "画图能力未启用"
        };
        return;
      }
      const E = g("image", A);
      o.add(E), l[A] = {
        status: "loading",
        message: "查询图片缓存",
        requestId: E
      };
      const D = {
        chatIdentity: s.chatIdentity,
        sessionId: s.sessionId
      };
      try {
        const w = _(await s.bridge.request("fourth-wall/image-check", {
          ...D,
          tags: C.value,
          mediaRequestId: E
        }, 3e4));
        if (!V(A, E)) return;
        if (!w.available) {
          l[A] = {
            status: "unavailable",
            message: "画图能力未启用",
            requestId: E
          };
          return;
        }
        let S = w.cached || "";
        if (!S) {
          l[A] = {
            status: "loading",
            message: "正在生成图片",
            requestId: E
          };
          const R = _(await s.bridge.request("fourth-wall/image-generate", {
            ...D,
            tags: C.value,
            mediaRequestId: E
          }, 18e4));
          if (!V(A, E)) return;
          S = R.base64;
        }
        l[A] = {
          status: "ready",
          source: /^(?:data:|blob:|https?:)/i.test(S) ? S : `data:image/png;base64,${S}`
        };
      } catch (w) {
        V(A, E) && (l[A] = {
          status: "error",
          message: w instanceof Error ? w.message : String(w),
          requestId: E
        });
      } finally {
        o.delete(E);
      }
    }
    async function X(C, A) {
      if (!s.voiceAvailable) {
        l[A] = {
          status: "unavailable",
          message: "TTS 能力未启用"
        };
        return;
      }
      const E = l[A];
      if (E?.status === "loading") return;
      if (E?.status === "playing" && E.requestId) {
        s.bridge.post("fourth-wall/voice-stop", {
          chatIdentity: s.chatIdentity,
          mediaRequestId: E.requestId
        }), l[A] = { status: "idle" };
        return;
      }
      const D = g("voice", A);
      o.add(D), l[A] = {
        status: "loading",
        message: "正在准备语音",
        requestId: D
      };
      try {
        await s.bridge.request("fourth-wall/voice-play", {
          chatIdentity: s.chatIdentity,
          sessionId: s.sessionId,
          mediaRequestId: D,
          text: C.value,
          emotion: C.emotion
        });
      } catch (w) {
        V(A, D) && (l[A] = {
          status: "error",
          message: w instanceof Error ? w.message : String(w),
          requestId: D
        }), o.delete(D);
      }
    }
    function G() {
      i.value = s.message.content, n.value = !0;
    }
    function j() {
      const C = i.value.trim();
      C && (r("edit", s.messageIndex, C), n.value = !1);
    }
    function q() {
      o.forEach((C) => {
        s.bridge.post("fourth-wall/image-cancel", {
          chatIdentity: s.chatIdentity,
          mediaRequestId: C
        }), s.bridge.post("fourth-wall/voice-stop", {
          chatIdentity: s.chatIdentity,
          mediaRequestId: C
        });
      }), o.clear();
    }
    function P() {
      u.value.forEach((C, A) => {
        C.kind === "image" && $(C, A);
      });
    }
    return is(() => {
      a = s.bridge.subscribe((C) => {
        if (C.type === "fourth-wall/image-progress") {
          const A = C.payload, E = Object.keys(l).map(Number).find((D) => l[D]?.requestId === A.mediaRequestId);
          E !== void 0 && (l[E].message = A.status === "queued" ? `图片队列第 ${A.position || 1} 位` : "正在生成图片");
        }
        if (C.type === "fourth-wall/voice-state") {
          const A = C.payload, E = Object.keys(l).map(Number).find((D) => l[D]?.requestId === A.requestId);
          if (E === void 0) return;
          A.state === "playing" && (l[E].status = "playing"), (A.state === "ended" || A.state === "stopped") && (o.delete(String(A.requestId || "")), l[E] = { status: "idle" }), A.state === "error" && (o.delete(String(A.requestId || "")), l[E] = {
            status: "error",
            message: A.message || "语音播放失败"
          });
        }
      }), P();
    }), $t(() => s.message.content, () => {
      q(), Object.keys(l).forEach((C) => delete l[Number(C)]), P();
    }), ls(() => {
      a(), q();
    }), (C, A) => (L(), U("article", { class: ct(["fourth-wall-message", e.message.role === "user" ? "is-user" : "is-ai"]) }, [(e.message.role === "user" ? e.userAvatar : e.characterAvatar) ? (L(), U("img", {
      key: 0,
      class: "fourth-wall-avatar",
      src: e.message.role === "user" ? e.userAvatar : e.characterAvatar,
      alt: ""
    }, null, 8, _a)) : (L(), U("span", wa)), v("div", xa, [
      e.message.thinking ? (L(), U("details", Ca, [A[3] || (A[3] = v("summary", null, "思考过程", -1)), v("div", null, le(e.message.thinking), 1)])) : ve("", !0),
      v("div", Sa, [n.value ? Ae((L(), U("textarea", {
        key: 0,
        "onUpdate:modelValue": A[0] || (A[0] = (E) => i.value = E),
        class: "fourth-wall-edit",
        rows: "3"
      }, null, 512)), [[et, i.value]]) : (L(!0), U(pe, { key: 1 }, Hs(u.value, (E, D) => (L(), U(pe, { key: `${E.kind}-${D}` }, [E.kind === "text" ? (L(), U("span", Aa, le(E.value), 1)) : E.kind === "image" ? (L(), U("figure", Ta, [l[D]?.status === "ready" ? (L(), U("img", {
        key: 0,
        src: l[D].source,
        alt: E.value
      }, null, 8, Ia)) : l[D]?.status === "error" ? (L(), U("button", {
        key: 1,
        type: "button",
        onClick: (w) => $(E, D)
      }, [ke(le(E.raw), 1), v("small", null, le(l[D].message) + "，点此重试", 1)], 8, Ea)) : l[D]?.status === "unavailable" ? (L(), U("div", Oa, [ke(le(E.raw), 1), v("small", null, le(l[D].message), 1)])) : (L(), U("div", $a, [ke(le(E.raw), 1), v("small", null, le(l[D]?.message || "准备图片"), 1)]))])) : (L(), U("button", {
        key: 2,
        class: "fourth-wall-voice",
        type: "button",
        onClick: (w) => X(E, D)
      }, [
        v("span", ka, le(l[D]?.status === "playing" ? "■" : "▶"), 1),
        v("span", null, le(E.value), 1),
        l[D]?.message ? (L(), U("small", Pa, le(l[D].message), 1)) : ve("", !0)
      ], 8, Ma))], 64))), 128)), v("div", Fa, [n.value ? (L(), U(pe, { key: 0 }, [v("button", {
        type: "button",
        onClick: j
      }, "保存"), v("button", {
        type: "button",
        onClick: A[1] || (A[1] = (E) => n.value = !1)
      }, "取消")], 64)) : (L(), U(pe, { key: 1 }, [v("button", {
        type: "button",
        onClick: G
      }, "编辑"), v("button", {
        type: "button",
        onClick: A[2] || (A[2] = (E) => r("delete", e.messageIndex))
      }, "删除")], 64))])]),
      h.value ? (L(), U("time", Da, le(h.value), 1)) : ve("", !0)
    ])], 2));
  }
}), Ra = La, Ha = {
  key: 1,
  class: "fourth-wall-empty"
}, Na = {
  key: 2,
  class: "fourth-wall-message is-ai is-streaming"
}, Va = ["src"], Ba = {
  key: 1,
  class: "fourth-wall-avatar is-placeholder"
}, ja = { class: "fourth-wall-message-stack" }, Ua = {
  key: 0,
  class: "fourth-wall-thinking",
  open: ""
}, Wa = { class: "fourth-wall-bubble" }, Ka = {
  key: 0,
  class: "fourth-wall-unsaved"
}, qa = /* @__PURE__ */ He({
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
    const t = e, s = /* @__PURE__ */ ue(null), r = /* @__PURE__ */ ue(40), n = nt(() => Math.max(0, t.history.length - r.value)), i = nt(() => t.history.slice(n.value));
    function l() {
      r.value = Math.min(t.history.length, r.value + 40);
    }
    return $t(() => t.sessionId, () => {
      r.value = 40;
    }), $t(() => [t.history.length, t.generation.text], async () => {
      await Tr(), s.value && (s.value.scrollTop = s.value.scrollHeight);
    }, { immediate: !0 }), (o, a) => (L(), U("section", {
      ref_key: "viewport",
      ref: s,
      class: "fourth-wall-conversation",
      "aria-live": "polite"
    }, [
      n.value > 0 ? (L(), U("button", {
        key: 0,
        type: "button",
        class: "fourth-wall-earlier",
        onClick: l
      }, " 显示更早的 " + le(n.value) + " 条记录 ", 1)) : ve("", !0),
      e.history.length === 0 && e.generation.status === "idle" ? (L(), U("div", Ha, [...a[2] || (a[2] = [
        v("span", null, "IV", -1),
        v("strong", null, "越过故事边界", -1),
        v("p", null, "这里是你与角色扮演者的皮下私聊。", -1)
      ])])) : ve("", !0),
      (L(!0), U(pe, null, Hs(i.value, (c, u) => (L(), xt(Ra, {
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
        onEdit: a[0] || (a[0] = (h, g) => o.$emit("edit", h, g)),
        onDelete: a[1] || (a[1] = (h) => o.$emit("delete", h))
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
      e.generation.status !== "idle" ? (L(), U("article", Na, [e.characterAvatar ? (L(), U("img", {
        key: 0,
        class: "fourth-wall-avatar",
        src: e.characterAvatar,
        alt: ""
      }, null, 8, Va)) : (L(), U("span", Ba)), v("div", ja, [e.generation.thinking ? (L(), U("details", Ua, [a[3] || (a[3] = v("summary", null, "思考中", -1)), v("div", null, le(e.generation.thinking), 1)])) : ve("", !0), v("div", Wa, [ke(le(e.generation.text || (e.generation.status === "error" ? e.generation.message : "等待回应...")) + " ", 1), e.generation.unsaved ? (L(), U("small", Ka, "未保存")) : ve("", !0)])])])) : ve("", !0)
    ], 512));
  }
}), Ga = qa, Xa = {
  class: "fourth-wall-modal",
  role: "dialog",
  "aria-modal": "true",
  "aria-label": "四次元壁提示词"
}, za = { class: "fourth-wall-prompt-fields" }, Ja = /* @__PURE__ */ He({
  __name: "FourthWallPromptEditor",
  props: { templates: {} },
  emits: [
    "close",
    "save",
    "restore"
  ],
  setup(e, { emit: t }) {
    const s = e, r = t, n = /* @__PURE__ */ wt(structuredClone(/* @__PURE__ */ K(s.templates)));
    function i() {
      r("save", structuredClone(/* @__PURE__ */ K(n)));
    }
    return (l, o) => (L(), U("div", {
      class: "fourth-wall-modal-backdrop",
      onClick: o[6] || (o[6] = Vi((a) => r("close"), ["self"]))
    }, [v("section", Xa, [
      v("header", null, [o[7] || (o[7] = v("strong", null, "提示词模板", -1)), v("button", {
        type: "button",
        onClick: o[0] || (o[0] = (a) => r("close"))
      }, "关闭")]),
      v("div", za, [
        v("label", null, [o[8] || (o[8] = ke("Top User", -1)), Ae(v("textarea", {
          "onUpdate:modelValue": o[1] || (o[1] = (a) => n.topuser = a),
          rows: "5"
        }, null, 512), [[et, n.topuser]])]),
        v("label", null, [o[9] || (o[9] = ke("Confirm", -1)), Ae(v("textarea", {
          "onUpdate:modelValue": o[2] || (o[2] = (a) => n.confirm = a),
          rows: "3"
        }, null, 512), [[et, n.confirm]])]),
        v("label", null, [o[10] || (o[10] = ke("Meta Protocol", -1)), Ae(v("textarea", {
          "onUpdate:modelValue": o[3] || (o[3] = (a) => n.metaProtocol = a),
          rows: "12"
        }, null, 512), [[et, n.metaProtocol]])]),
        v("label", null, [o[11] || (o[11] = ke("Bottom", -1)), Ae(v("textarea", {
          "onUpdate:modelValue": o[4] || (o[4] = (a) => n.bottom = a),
          rows: "5"
        }, null, 512), [[et, n.bottom]])])
      ]),
      v("footer", null, [v("button", {
        type: "button",
        class: "is-danger",
        onClick: o[5] || (o[5] = (a) => r("restore"))
      }, "恢复默认"), v("button", {
        type: "button",
        class: "is-primary",
        onClick: i
      }, "保存")])
    ])]));
  }
}), Ya = Ja, Qa = { class: "fourth-wall-settings-section" }, Za = { class: "fourth-wall-session-row" }, eu = ["value", "disabled"], tu = ["value"], su = ["disabled"], ru = ["disabled"], nu = ["disabled"], iu = /* @__PURE__ */ He({
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
    function n(l, o) {
      const a = window.prompt("重命名记录", o)?.trim();
      a && s("rename", l, a);
    }
    function i(l) {
      window.confirm("确定删除当前记录吗？") && s("delete", l);
    }
    return (l, o) => (L(), U("section", Qa, [o[3] || (o[3] = v("h3", null, "聊天记录", -1)), v("div", Za, [
      v("select", {
        value: e.activeSessionId,
        disabled: e.disabled,
        onChange: o[0] || (o[0] = (a) => s("switch", a.target.value))
      }, [(L(!0), U(pe, null, Hs(e.sessions, (a) => (L(), U("option", {
        key: a.id,
        value: a.id
      }, le(a.name), 9, tu))), 128))], 40, eu),
      v("button", {
        type: "button",
        disabled: e.disabled,
        title: "新建记录",
        onClick: r
      }, "＋", 8, su),
      v("button", {
        type: "button",
        disabled: e.disabled,
        title: "重命名记录",
        onClick: o[1] || (o[1] = (a) => n(e.activeSessionId, e.sessions.find((c) => c.id === e.activeSessionId)?.name || ""))
      }, " 改 ", 8, ru),
      v("button", {
        type: "button",
        disabled: e.disabled || e.sessions.length <= 1,
        title: "删除记录",
        class: "is-danger",
        onClick: o[2] || (o[2] = (a) => i(e.activeSessionId))
      }, " 删 ", 8, nu)
    ])]));
  }
}), lu = iu, ou = {
  class: "fourth-wall-settings",
  "aria-label": "四次元壁设置"
}, au = { class: "fourth-wall-settings-scroll" }, uu = { class: "fourth-wall-settings-section" }, fu = { class: "is-toggle" }, cu = { class: "is-toggle" }, du = ["disabled"], hu = { class: "fourth-wall-settings-section" }, pu = { class: "is-toggle" }, vu = { class: "is-toggle" }, gu = { class: "is-toggle" }, mu = { key: 0 }, bu = ["disabled"], yu = { class: "fourth-wall-settings-section is-actions" }, _u = /* @__PURE__ */ He({
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
    const s = e, r = t, n = /* @__PURE__ */ wt(structuredClone(/* @__PURE__ */ K(s.chat.settings))), i = /* @__PURE__ */ wt(structuredClone(/* @__PURE__ */ K(s.global)));
    function l() {
      r("updateChat", structuredClone(/* @__PURE__ */ K(n)));
    }
    function o() {
      r("updateGlobal", {
        image: structuredClone(/* @__PURE__ */ K(i.image)),
        voice: structuredClone(/* @__PURE__ */ K(i.voice)),
        commentary: structuredClone(/* @__PURE__ */ K(i.commentary))
      });
    }
    return (a, c) => (L(), U("aside", ou, [v("header", null, [c[15] || (c[15] = v("strong", null, "四次元壁设置", -1)), v("button", {
      type: "button",
      onClick: c[0] || (c[0] = (u) => r("close"))
    }, "关闭")]), v("div", au, [
      de(lu, {
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
      v("section", uu, [
        c[20] || (c[20] = v("h3", null, "上下文", -1)),
        v("label", null, [c[16] || (c[16] = ke("普通聊天层数", -1)), Ae(v("input", {
          "onUpdate:modelValue": c[5] || (c[5] = (u) => n.maxChatLayers = u),
          type: "number",
          min: "1",
          max: "9999"
        }, null, 512), [[
          et,
          n.maxChatLayers,
          void 0,
          { number: !0 }
        ]])]),
        v("label", null, [c[17] || (c[17] = ke("皮下聊天轮数", -1)), Ae(v("input", {
          "onUpdate:modelValue": c[6] || (c[6] = (u) => n.maxMetaTurns = u),
          type: "number",
          min: "1",
          max: "9999"
        }, null, 512), [[
          et,
          n.maxMetaTurns,
          void 0,
          { number: !0 }
        ]])]),
        v("label", fu, [c[18] || (c[18] = v("span", null, "流式生成", -1)), Ae(v("input", {
          "onUpdate:modelValue": c[7] || (c[7] = (u) => n.stream = u),
          type: "checkbox"
        }, null, 512), [[Nt, n.stream]])]),
        v("label", cu, [c[19] || (c[19] = v("span", null, "禁用 Assistant Prefill", -1)), Ae(v("input", {
          "onUpdate:modelValue": c[8] || (c[8] = (u) => n.disableAssistantPrefill = u),
          type: "checkbox"
        }, null, 512), [[Nt, n.disableAssistantPrefill]])]),
        v("button", {
          type: "button",
          class: "is-primary",
          disabled: e.busy,
          onClick: l
        }, "保存上下文设置", 8, du)
      ]),
      v("section", hu, [
        c[24] || (c[24] = v("h3", null, "能力", -1)),
        v("label", pu, [c[21] || (c[21] = v("span", null, "在提示词中允许图片", -1)), Ae(v("input", {
          "onUpdate:modelValue": c[9] || (c[9] = (u) => i.image.enablePrompt = u),
          type: "checkbox"
        }, null, 512), [[Nt, i.image.enablePrompt]])]),
        v("label", vu, [c[22] || (c[22] = v("span", null, "在提示词中允许语音", -1)), Ae(v("input", {
          "onUpdate:modelValue": c[10] || (c[10] = (u) => i.voice.enabled = u),
          type: "checkbox"
        }, null, 512), [[Nt, i.voice.enabled]])]),
        v("label", gu, [c[23] || (c[23] = v("span", null, "实时吐槽", -1)), Ae(v("input", {
          "onUpdate:modelValue": c[11] || (c[11] = (u) => i.commentary.enabled = u),
          type: "checkbox"
        }, null, 512), [[Nt, i.commentary.enabled]])]),
        i.commentary.enabled ? (L(), U("label", mu, [ke(" 吐槽概率 " + le(i.commentary.probability) + "% ", 1), Ae(v("input", {
          "onUpdate:modelValue": c[12] || (c[12] = (u) => i.commentary.probability = u),
          type: "range",
          min: "1",
          max: "99"
        }, null, 512), [[
          et,
          i.commentary.probability,
          void 0,
          { number: !0 }
        ]])])) : ve("", !0),
        v("button", {
          type: "button",
          class: "is-primary",
          disabled: e.busy,
          onClick: o
        }, "保存能力设置", 8, bu)
      ]),
      v("section", yu, [v("button", {
        type: "button",
        onClick: c[13] || (c[13] = (u) => r("openPrompts"))
      }, "提示词模板"), v("button", {
        type: "button",
        onClick: c[14] || (c[14] = (u) => r("openAgent"))
      }, "Agent API 配置")])
    ])]));
  }
}), wu = _u, xu = { class: "fourth-wall-app" }, Cu = { class: "fourth-wall-header" }, Su = { class: "fourth-wall-heading" }, Au = { class: "fourth-wall-header-actions" }, Tu = ["disabled"], Iu = ["disabled"], Eu = {
  key: 0,
  class: "fourth-wall-error",
  role: "alert"
}, Ou = { class: "fourth-wall-composer" }, $u = ["disabled"], Mu = ["disabled"], ku = 35e3, Pu = /* @__PURE__ */ He({
  __name: "FourthWallApp",
  props: {
    bridge: {},
    initialState: {}
  },
  setup(e) {
    const t = e, s = /* @__PURE__ */ ue(structuredClone(/* @__PURE__ */ K(t.initialState))), r = /* @__PURE__ */ ue(""), n = /* @__PURE__ */ ue(!1), i = /* @__PURE__ */ ue(!1), l = /* @__PURE__ */ ue(!1), o = /* @__PURE__ */ ue(""), a = /* @__PURE__ */ ue(!1), c = /* @__PURE__ */ ue({
      status: "idle",
      sessionId: "",
      text: "",
      thinking: "",
      message: "",
      unsaved: !1
    });
    let u = () => {
    };
    const h = nt(() => s.value.chat.sessions.find((w) => w.id === s.value.chat.activeSessionId)), g = nt(() => c.value.status === "started" || c.value.status === "progress");
    function _(w = h.value.id) {
      return {
        chatIdentity: s.value.chatIdentity,
        sessionId: w
      };
    }
    function V(w) {
      return structuredClone(w.result);
    }
    async function $(w, S) {
      l.value = !0, o.value = "";
      try {
        s.value = V(await t.bridge.request(w, S, ku));
      } catch (R) {
        o.value = R instanceof Error ? R.message : String(R);
      } finally {
        l.value = !1;
      }
    }
    async function X() {
      const w = r.value.trim();
      !w || g.value || l.value || (r.value = "", c.value = {
        status: "started",
        sessionId: h.value.id,
        text: "",
        thinking: "",
        message: "",
        unsaved: !1
      }, await $("fourth-wall/send", {
        ..._(),
        content: w
      }), o.value && (c.value.status = "idle"));
    }
    async function G() {
      g.value || l.value || (c.value = {
        status: "started",
        sessionId: h.value.id,
        text: "",
        thinking: "",
        message: "",
        unsaved: !1
      }, await $("fourth-wall/regenerate", _()), o.value && (c.value.status = "idle"));
    }
    function j() {
      t.bridge.post("fourth-wall/cancel", _());
    }
    function q(w) {
      w.key !== "Enter" || w.shiftKey || a.value || (w.preventDefault(), g.value ? j() : X());
    }
    function P(w) {
      window.confirm("确定删除这条消息吗？") && $("fourth-wall/delete-message", {
        ..._(),
        messageIndex: w
      });
    }
    function C() {
      window.confirm("确定清空当前记录吗？") && $("fourth-wall/clear-history", _());
    }
    function A(w) {
      $("fourth-wall/update-chat-settings", {
        ..._(),
        patch: w
      });
    }
    function E(w) {
      $("fourth-wall/update-global-settings", {
        ..._(),
        patch: w
      });
    }
    async function D() {
      o.value = "";
      try {
        await t.bridge.request("fourth-wall/open-agent-settings", _());
      } catch (w) {
        o.value = w instanceof Error ? w.message : String(w);
      }
    }
    return is(() => {
      u = t.bridge.subscribe((w) => {
        if (w.type === "fourth-wall/state" && (s.value = structuredClone(w.payload.state)), w.type !== "fourth-wall/generation") return;
        const S = w.payload;
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
            c.value = {
              status: "error",
              sessionId: S.sessionId || h.value.id,
              text: S.draft?.text || S.text || "",
              thinking: S.draft?.thinking || S.thinking || "",
              message: S.message || "生成失败",
              unsaved: S.kind === "save"
            }, o.value = S.message || "生成失败";
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
    }), ls(() => u()), (w, S) => (L(), U("main", xu, [
      v("header", Cu, [v("div", Su, [S[17] || (S[17] = v("span", null, "IV", -1)), v("div", null, [S[16] || (S[16] = v("strong", null, "四次元壁", -1)), v("small", null, le(h.value.name), 1)])]), v("div", Au, [
        v("button", {
          type: "button",
          title: "重答",
          disabled: l.value || g.value,
          onClick: G
        }, "↻", 8, Tu),
        v("button", {
          type: "button",
          title: "清空当前记录",
          disabled: l.value,
          onClick: C
        }, "⌫", 8, Iu),
        v("button", {
          type: "button",
          title: "设置",
          onClick: S[0] || (S[0] = (R) => n.value = !0)
        }, "⚙")
      ])]),
      o.value ? (L(), U("div", Eu, [v("span", null, le(o.value), 1), v("button", {
        type: "button",
        onClick: S[1] || (S[1] = (R) => o.value = "")
      }, "×")])) : ve("", !0),
      de(Ga, {
        history: h.value.history,
        "session-id": h.value.id,
        "chat-identity": s.value.chatIdentity,
        "user-avatar": s.value.userAvatar,
        "character-avatar": s.value.characterAvatar,
        "image-available": s.value.capabilities.image.available,
        "voice-available": s.value.capabilities.voice.available,
        generation: c.value,
        bridge: e.bridge,
        onEdit: S[2] || (S[2] = (R, k) => $("fourth-wall/edit-message", {
          ..._(),
          messageIndex: R,
          content: k
        })),
        onDelete: P
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
      v("footer", Ou, [Ae(v("textarea", {
        "onUpdate:modelValue": S[3] || (S[3] = (R) => r.value = R),
        rows: "1",
        placeholder: "聊点什么...",
        disabled: l.value,
        onCompositionstart: S[4] || (S[4] = (R) => a.value = !0),
        onCompositionend: S[5] || (S[5] = (R) => a.value = !1),
        onKeydown: q
      }, null, 40, $u), [[et, r.value]]), v("button", {
        type: "button",
        class: ct({ "is-stop": g.value }),
        disabled: l.value,
        onClick: S[6] || (S[6] = (R) => g.value ? j() : X())
      }, le(g.value ? "■" : "↑"), 11, Mu)]),
      n.value ? (L(), xt(wu, {
        key: 1,
        chat: s.value.chat,
        global: s.value.global,
        busy: l.value || g.value,
        onClose: S[7] || (S[7] = (R) => n.value = !1),
        onUpdateChat: A,
        onUpdateGlobal: E,
        onSwitchSession: S[8] || (S[8] = (R) => $("fourth-wall/switch-session", {
          ..._(),
          targetSessionId: R
        })),
        onAddSession: S[9] || (S[9] = (R) => $("fourth-wall/add-session", {
          ..._(),
          name: R
        })),
        onRenameSession: S[10] || (S[10] = (R, k) => $("fourth-wall/rename-session", {
          ..._(R),
          name: k
        })),
        onDeleteSession: S[11] || (S[11] = (R) => $("fourth-wall/delete-session", _(R))),
        onOpenPrompts: S[12] || (S[12] = (R) => i.value = !0),
        onOpenAgent: D
      }, null, 8, [
        "chat",
        "global",
        "busy"
      ])) : ve("", !0),
      i.value ? (L(), xt(Ya, {
        key: 2,
        templates: s.value.global.promptTemplates,
        onClose: S[13] || (S[13] = (R) => i.value = !1),
        onSave: S[14] || (S[14] = (R) => {
          E({ promptTemplates: R }), i.value = !1;
        }),
        onRestore: S[15] || (S[15] = () => {
          $("fourth-wall/restore-prompts", _()), i.value = !1;
        })
      }, null, 8, ["templates"])) : ve("", !0)
    ]));
  }
}), Fu = Pu, Du = Object.freeze([{
  id: "fourth-wall",
  name: "四次元壁",
  accent: "#7567d8",
  component: Fu
}]), Lu = { class: "xiaobai-os-home" }, Ru = ["src"], Hu = {
  class: "xiaobai-os-app-grid",
  "aria-label": "应用"
}, Nu = ["onClick"], Vu = { class: "xiaobai-os-app-name" }, Bu = /* @__PURE__ */ He({
  __name: "XiaobaiOsHome",
  props: {
    apps: {},
    characterAvatar: {}
  },
  emits: ["openApp"],
  setup(e) {
    return (t, s) => (L(), U("main", Lu, [
      e.characterAvatar ? (L(), U("img", {
        key: 0,
        class: "xiaobai-os-wallpaper",
        src: e.characterAvatar,
        alt: ""
      }, null, 8, Ru)) : ve("", !0),
      s[1] || (s[1] = v("div", {
        class: "xiaobai-os-home-wash",
        "aria-hidden": "true"
      }, null, -1)),
      v("section", Hu, [(L(!0), U(pe, null, Hs(e.apps, (r) => (L(), U("button", {
        key: r.id,
        type: "button",
        class: "xiaobai-os-app-tile",
        style: Ps({ "--app-accent": r.accent }),
        onClick: (n) => t.$emit("openApp", r)
      }, [s[0] || (s[0] = v("span", {
        class: "xiaobai-os-app-icon",
        "aria-hidden": "true"
      }, [v("svg", { viewBox: "0 0 64 64" }, [v("path", { d: "M13 15h38v29H32l-12 9 3-9H13z" }), v("path", { d: "M22 25h20M22 33h14" })])], -1)), v("span", Vu, le(r.name), 1)], 12, Nu))), 128))])
    ]));
  }
}), ju = Bu, Uu = ["disabled"], Wu = {
  key: 0,
  "aria-hidden": "true"
}, Ku = /* @__PURE__ */ He({
  __name: "XiaobaiOsNavigation",
  props: { isHome: { type: Boolean } },
  emits: [
    "back",
    "home",
    "close"
  ],
  setup(e) {
    return (t, s) => (L(), U("nav", {
      class: ct(["xiaobai-os-navigation", { "is-home": e.isHome }]),
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
      }, [v("path", { d: "m14.5 6-6 6 6 6" })], -1)])], 8, Uu),
      v("button", {
        type: "button",
        class: "xiaobai-os-nav-button xiaobai-os-home-button",
        "aria-label": "主页",
        onClick: s[1] || (s[1] = (r) => t.$emit("home"))
      }, [s[4] || (s[4] = v("svg", {
        viewBox: "0 0 24 24",
        "aria-hidden": "true"
      }, [v("path", { d: "m4.5 11 7.5-6 7.5 6v8h-5v-5h-5v5h-5z" })], -1)), e.isHome ? (L(), U("i", Wu)) : ve("", !0)]),
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
}), qu = Ku, Gu = /* @__PURE__ */ He({
  __name: "XiaobaiOsSystemBar",
  props: { isHome: { type: Boolean } },
  setup(e) {
    return (t, s) => (L(), U("header", {
      class: ct(["xiaobai-os-system-bar", { "is-home": e.isHome }]),
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
}), Xu = Gu, zu = { class: "xiaobai-os-device" }, Ju = { class: "xiaobai-os-glass" }, Yu = { class: "xiaobai-os-stage" }, Qu = /* @__PURE__ */ He({
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
    return (t, s) => (L(), U("div", zu, [s[4] || (s[4] = v("span", {
      class: "xiaobai-os-side-key",
      "aria-hidden": "true"
    }, null, -1)), v("div", Ju, [
      de(Xu, { "is-home": e.isHome }, null, 8, ["is-home"]),
      v("div", Yu, [de(Wo, {
        name: "xiaobai-os-route",
        mode: "out-in"
      }, {
        default: si(() => [e.isHome ? (L(), xt(ju, {
          key: "home",
          apps: e.apps,
          "character-avatar": e.characterAvatar,
          onOpenApp: s[0] || (s[0] = (r) => t.$emit("openApp", r))
        }, null, 8, ["apps", "character-avatar"])) : e.activeComponent ? (L(), xt(zl(e.activeComponent), {
          key: "app",
          bridge: e.bridge,
          "initial-state": e.activeState
        }, null, 8, ["bridge", "initial-state"])) : ve("", !0)]),
        _: 1
      })]),
      de(qu, {
        "is-home": e.isHome,
        onBack: s[1] || (s[1] = (r) => t.$emit("back")),
        onHome: s[2] || (s[2] = (r) => t.$emit("home")),
        onClose: s[3] || (s[3] = (r) => t.$emit("close"))
      }, null, 8, ["is-home"])
    ])]));
  }
}), Zu = Qu, ef = "LittleWhiteBox-XiaobaiOS";
function tf() {
  return `xiaobai-os-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
}
function sf() {
  const e = /* @__PURE__ */ new Map(), t = /* @__PURE__ */ new Set();
  let s = !1;
  function r(u, h = {}, g = "") {
    parent.postMessage({
      source: ef,
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
    const _ = u.payload;
    return _?.ok === !1 ? g.reject(new Error(_.error || "host_request_failed")) : g.resolve(_), !0;
  }
  function i(u) {
    u.origin !== window.location.origin || u.source !== parent || u.data?.source !== "LittleWhiteBox-XiaobaiOS" || typeof u.data.type != "string" || n(u.data) || t.forEach((h) => h(u.data));
  }
  function l() {
    s || (s = !0, window.addEventListener("message", i), r("os/frame-ready"));
  }
  function o(u, h = {}, g = 15e3) {
    const _ = tf();
    return new Promise((V, $) => {
      const X = setTimeout(() => {
        e.delete(_), $(/* @__PURE__ */ new Error("host_request_timeout"));
      }, g);
      e.set(_, {
        resolve: V,
        reject: $,
        timer: X
      }), r(u, h, _);
    });
  }
  function a(u) {
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
    request: o,
    subscribe: a,
    dispose: c
  });
}
var rf = {
  key: 0,
  class: "xiaobai-os-error",
  role: "alert"
}, nf = {
  key: 1,
  class: "xiaobai-os-loading",
  role: "status"
}, lf = /* @__PURE__ */ He({
  __name: "App",
  setup(e) {
    const t = sf(), s = /* @__PURE__ */ ue(null), r = /* @__PURE__ */ ue(!1), n = /* @__PURE__ */ ue("light"), i = /* @__PURE__ */ ue(/* @__PURE__ */ new Set()), l = /* @__PURE__ */ ue(""), o = /* @__PURE__ */ ue(null), a = /* @__PURE__ */ ue(null), c = /* @__PURE__ */ ue("");
    let u = null, h = () => {
    }, g = 0;
    const _ = nt(() => Du.filter((C) => i.value.has(C.id))), V = nt(() => o.value === null);
    function $(C) {
      g += 1, n.value = C.theme === "dark" ? "dark" : "light", i.value = new Set((C.apps || []).map((A) => String(A.id))), l.value = String(C.chat?.characterAvatar || ""), o.value = null, a.value = null, r.value = !0;
    }
    function X(C) {
      C.type === "os/init" && $(C.payload || {}), C.type === "os/theme-changed" && (n.value = C.payload?.theme === "dark" ? "dark" : "light"), C.type === "os/error" && (c.value = String(C.payload?.message || "小白 OS 初始化失败"));
    }
    async function G(C) {
      const A = ++g;
      c.value = "";
      try {
        const E = await t.request("app/activate", { appId: C.id });
        if (A !== g) return;
        if (E.appId !== C.id) throw new Error("app_activation_mismatch");
        a.value = E.state ?? null, o.value = C;
      } catch (E) {
        if (A !== g) return;
        o.value = null, c.value = E instanceof Error ? E.message : String(E);
      }
    }
    function j() {
      g += 1, t.post("app/deactivate", { appId: o.value?.id || "" }), o.value = null, a.value = null;
    }
    function q() {
      g += 1, t.post("os/close");
    }
    function P(C) {
      if (C.key === "Escape") {
        C.preventDefault(), o.value ? j() : q();
        return;
      }
      if (C.key !== "Tab" || !s.value) return;
      const A = Array.from(s.value.querySelectorAll('button:not(:disabled), [href], input:not(:disabled), textarea:not(:disabled), [tabindex]:not([tabindex="-1"])'));
      if (A.length === 0) return;
      const E = A[0], D = A[A.length - 1];
      C.shiftKey && document.activeElement === E ? (C.preventDefault(), D.focus()) : !C.shiftKey && document.activeElement === D && (C.preventDefault(), E.focus());
    }
    return is(async () => {
      u = document.activeElement instanceof HTMLElement ? document.activeElement : null, h = t.subscribe(X), t.start(), await Tr(), s.value?.focus();
    }), ls(() => {
      g += 1, h(), t.dispose(), u?.focus();
    }), (C, A) => (L(), U("main", {
      ref_key: "root",
      ref: s,
      class: ct(["xiaobai-os-shell", `theme-${n.value}`]),
      role: "dialog",
      "aria-modal": "true",
      "aria-label": "小白 OS",
      tabindex: "-1",
      onKeydown: P,
      onClick: Vi(q, ["self"])
    }, [c.value ? (L(), U("div", rf, le(c.value), 1)) : ve("", !0), r.value ? (L(), xt(Zu, {
      key: 2,
      apps: _.value,
      "active-component": o.value?.component || null,
      "active-state": a.value,
      bridge: zn(t),
      "character-avatar": l.value,
      "is-home": V.value,
      onOpenApp: G,
      onBack: j,
      onHome: j,
      onClose: q
    }, null, 8, [
      "apps",
      "active-component",
      "active-state",
      "bridge",
      "character-avatar",
      "is-home"
    ])) : (L(), U("div", nf, "正在启动小白 OS"))], 34));
  }
}), of = lf;
ma(of).mount("#app");
