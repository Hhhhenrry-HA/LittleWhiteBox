/* eslint-disable */
// @__NO_SIDE_EFFECTS__
function Ts(e) {
  const t = /* @__PURE__ */ Object.create(null);
  for (const s of e.split(",")) t[s] = 1;
  return (s) => s in t;
}
var Z = {}, It = [], Ke = () => {
}, An = () => !1, Is = (e) => e.charCodeAt(0) === 111 && e.charCodeAt(1) === 110 && (e.charCodeAt(2) > 122 || e.charCodeAt(2) < 97), Es = (e) => e.startsWith("onUpdate:"), oe = Object.assign, gr = (e, t) => {
  const s = e.indexOf(t);
  s > -1 && e.splice(s, 1);
}, Ui = Object.prototype.hasOwnProperty, z = (e, t) => Ui.call(e, t), R = Array.isArray, Et = (e) => ss(e) === "[object Map]", Os = (e) => ss(e) === "[object Set]", Hr = (e) => ss(e) === "[object Date]", U = (e) => typeof e == "function", ne = (e) => typeof e == "string", qe = (e) => typeof e == "symbol", J = (e) => e !== null && typeof e == "object", Tn = (e) => (J(e) || U(e)) && U(e.then) && U(e.catch), In = Object.prototype.toString, ss = (e) => In.call(e), Wi = (e) => ss(e).slice(8, -1), En = (e) => ss(e) === "[object Object]", mr = (e) => ne(e) && e !== "NaN" && e[0] !== "-" && "" + parseInt(e, 10) === e, jt = /* @__PURE__ */ Ts(",key,ref,ref_for,ref_key,onVnodeBeforeMount,onVnodeMounted,onVnodeBeforeUpdate,onVnodeUpdated,onVnodeBeforeUnmount,onVnodeUnmounted"), $s = (e) => {
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
}, Rr, ks = () => Rr || (Rr = typeof globalThis < "u" ? globalThis : typeof self < "u" ? self : typeof window < "u" ? window : typeof globalThis < "u" ? globalThis : {});
function Ps(e) {
  if (R(e)) {
    const t = {};
    for (let s = 0; s < e.length; s++) {
      const r = e[s], n = ne(r) ? Yi(r) : Ps(r);
      if (n) for (const i in n) t[i] = n[i];
    }
    return t;
  } else if (ne(e) || J(e)) return e;
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
  else if (R(e)) for (let s = 0; s < e.length; s++) {
    const r = ct(e[s]);
    r && (t += r + " ");
  }
  else if (J(e))
    for (const s in e) e[s] && (t += s + " ");
  return t.trim();
}
var $n = "itemscope,allowfullscreen,formnovalidate,ismap,nomodule,novalidate,readonly", Zi = /* @__PURE__ */ Ts($n), of = /* @__PURE__ */ Ts($n + ",async,autofocus,autoplay,controls,default,defer,disabled,hidden,inert,loop,open,required,reversed,scoped,seamless,checked,muted,multiple,selected");
function Mn(e) {
  return !!e || e === "";
}
function Qi(e, t) {
  if (e.length !== t.length) return !1;
  let s = !0;
  for (let r = 0; s && r < e.length; r++) s = rs(e[r], t[r]);
  return s;
}
function rs(e, t) {
  if (e === t) return !0;
  let s = Hr(e), r = Hr(t);
  if (s || r) return s && r ? e.getTime() === t.getTime() : !1;
  if (s = qe(e), r = qe(t), s || r) return e === t;
  if (s = R(e), r = R(t), s || r) return s && r ? Qi(e, t) : !1;
  if (s = J(e), r = J(t), s || r) {
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
var Pn = (e) => !!(e && e.__v_isRef === !0), le = (e) => ne(e) ? e : e == null ? "" : R(e) || J(e) && (e.toString === In || !U(e.toString)) ? Pn(e) ? le(e.value) : JSON.stringify(e, Fn, 2) : String(e), Fn = (e, t) => Pn(t) ? Fn(e, t.value) : Et(t) ? { [`Map(${t.size})`]: [...t.entries()].reduce((s, [r, n], i) => (s[qs(r, i) + " =>"] = n, s), {}) } : Os(t) ? { [`Set(${t.size})`]: [...t.values()].map((s) => qs(s)) } : qe(t) ? qs(t) : J(t) && !R(t) && !En(t) ? String(t) : t, qs = (e, t = "") => {
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
    this.flags & 2 && !(this.flags & 32) || this.flags & 8 || Hn(this);
  }
  run() {
    if (!(this.flags & 1)) return this.fn();
    this.flags |= 2, Nr(this), Rn(this);
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
      for (let e = this.deps; e; e = e.nextDep) xr(e);
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
function Hn(e, t = !1) {
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
function Rn(e) {
  for (let t = e.deps; t; t = t.nextDep)
    t.version = -1, t.prevActiveLink = t.dep.activeLink, t.dep.activeLink = t;
}
function Nn(e) {
  let t, s = e.depsTail, r = s;
  for (; r; ) {
    const n = r.prevDep;
    r.version === -1 ? (r === s && (s = n), xr(r), sl(r)) : t = r, r.dep.activeLink = r.prevActiveLink, r.prevActiveLink = void 0, r = n;
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
    Rn(e);
    const n = e.fn(e._value);
    (t.version === 0 || We(n, e._value)) && (e.flags |= 128, e._value = n, t.version++);
  } catch (n) {
    throw t.version++, n;
  } finally {
    se = s, Le = r, Nn(e), e.flags &= -3;
  }
}
function xr(e, t = !1) {
  const { dep: s, prevSub: r, nextSub: n } = e;
  if (r && (r.nextSub = n, e.prevSub = void 0), n && (n.prevSub = r, e.nextSub = void 0), s.subs === e && (s.subs = r, !r && s.computed)) {
    s.computed.flags &= -5;
    for (let i = s.computed.deps; i; i = i.nextDep) xr(i, !0);
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
}, wr = class {
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
    n || (r.set(s, n = new wr()), n.map = r, n.key = s), n.track();
  }
}
function Ze(e, t, s, r, n, i) {
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
    const a = R(e), c = a && mr(s);
    if (a && s === "length") {
      const u = Number(r);
      l.forEach((h, m) => {
        (m === "length" || m === Jt || !qe(m) && m >= u) && o(h);
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
  const t = /* @__PURE__ */ X(e);
  return t === e ? t : (me(t, "iterate", Jt), /* @__PURE__ */ Pe(e) ? t : t.map(He));
}
function Fs(e) {
  return me(e = /* @__PURE__ */ X(e), "iterate", Jt), e;
}
function je(e, t) {
  return /* @__PURE__ */ rt(e) ? Pt(/* @__PURE__ */ _t(e) ? He(t) : t) : He(t);
}
var nl = {
  __proto__: null,
  [Symbol.iterator]() {
    return Xs(this, Symbol.iterator, (e) => je(this, e));
  },
  concat(...e) {
    return At(this).concat(...e.map((t) => R(t) ? At(t) : t));
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
    return o ? He(h) : h;
  }
  let c = s;
  l !== e && (o ? c = function(h, m) {
    return s.call(this, je(e, h), m, e);
  } : s.length > 2 && (c = function(h, m) {
    return s.call(this, h, m, e);
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
  const r = /* @__PURE__ */ X(e);
  me(r, "iterate", Jt);
  const n = r[t](...s);
  return (n === -1 || n === !1) && /* @__PURE__ */ Ar(s[0]) ? (s[0] = /* @__PURE__ */ X(s[0]), r[t](...s)) : n;
}
function Lt(e, t, s = []) {
  tt(), yr();
  const r = (/* @__PURE__ */ X(e))[t].apply(e, s);
  return _r(), st(), r;
}
var ll = /* @__PURE__ */ Ts("__proto__,__v_isRef,__isVue"), Un = new Set(/* @__PURE__ */ Object.getOwnPropertyNames(Symbol).filter((e) => e !== "arguments" && e !== "caller").map((e) => Symbol[e]).filter(qe));
function ol(e) {
  qe(e) || (e = String(e));
  const t = /* @__PURE__ */ X(this);
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
    const i = R(e);
    if (!r) {
      let o;
      if (i && (o = nl[t])) return o;
      if (t === "hasOwnProperty") return ol;
    }
    const l = Reflect.get(e, t, /* @__PURE__ */ ye(e) ? e : s);
    if ((qe(t) ? Un.has(t) : ll(t)) || (r || me(e, "get", t), n)) return l;
    if (/* @__PURE__ */ ye(l)) {
      const o = i && mr(t) ? l : l.value;
      return r && J(o) ? /* @__PURE__ */ ar(o) : o;
    }
    return J(l) ? r ? /* @__PURE__ */ ar(l) : /* @__PURE__ */ xt(l) : l;
  }
}, Kn = class extends Wn {
  constructor(e = !1) {
    super(!1, e);
  }
  set(e, t, s, r) {
    let n = e[t];
    const i = R(e) && mr(t);
    if (!this._isShallow) {
      const a = /* @__PURE__ */ rt(n);
      if (!/* @__PURE__ */ Pe(s) && !/* @__PURE__ */ rt(s) && (n = /* @__PURE__ */ X(n), s = /* @__PURE__ */ X(s)), !i && /* @__PURE__ */ ye(n) && !/* @__PURE__ */ ye(s)) return a || (n.value = s), !0;
    }
    const l = i ? Number(t) < e.length : z(e, t), o = Reflect.set(e, t, s, /* @__PURE__ */ ye(e) ? e : r);
    return e === /* @__PURE__ */ X(r) && (l ? We(s, n) && Ze(e, "set", t, s, n) : Ze(e, "add", t, s)), o;
  }
  deleteProperty(e, t) {
    const s = z(e, t), r = e[t], n = Reflect.deleteProperty(e, t);
    return n && s && Ze(e, "delete", t, void 0, r), n;
  }
  has(e, t) {
    const s = Reflect.has(e, t);
    return (!qe(t) || !Un.has(t)) && me(e, "has", t), s;
  }
  ownKeys(e) {
    return me(e, "iterate", R(e) ? "length" : yt), Reflect.ownKeys(e);
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
    const n = this.__v_raw, i = /* @__PURE__ */ X(n), l = Et(i), o = e === "entries" || e === Symbol.iterator && l, a = e === "keys" && l, c = n[e](...r), u = s ? or : t ? Pt : He;
    return !t && me(i, "iterate", a ? lr : yt), oe(Object.create(c), { next() {
      const { value: h, done: m } = c.next();
      return m ? {
        value: h,
        done: m
      } : {
        value: o ? [u(h[0]), u(h[1])] : u(h),
        done: m
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
      const n = this.__v_raw, i = /* @__PURE__ */ X(n), l = /* @__PURE__ */ X(r);
      e || (We(r, l) && me(i, "get", r), me(i, "get", l));
      const { has: o } = cs(i), a = t ? or : e ? Pt : He;
      if (o.call(i, r)) return a(n.get(r));
      if (o.call(i, l)) return a(n.get(l));
      n !== i && n.get(r);
    },
    get size() {
      const r = this.__v_raw;
      return !e && me(/* @__PURE__ */ X(r), "iterate", yt), r.size;
    },
    has(r) {
      const n = this.__v_raw, i = /* @__PURE__ */ X(n), l = /* @__PURE__ */ X(r);
      return e || (We(r, l) && me(i, "has", r), me(i, "has", l)), r === l ? n.has(r) : n.has(r) || n.has(l);
    },
    forEach(r, n) {
      const i = this, l = i.__v_raw, o = /* @__PURE__ */ X(l), a = t ? or : e ? Pt : He;
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
      const n = /* @__PURE__ */ X(this), i = cs(n), l = /* @__PURE__ */ X(r), o = !t && !/* @__PURE__ */ Pe(r) && !/* @__PURE__ */ rt(r) ? l : r;
      return i.has.call(n, o) || We(r, o) && i.has.call(n, r) || We(l, o) && i.has.call(n, l) || (n.add(o), Ze(n, "add", o, o)), this;
    },
    set(r, n) {
      !t && !/* @__PURE__ */ Pe(n) && !/* @__PURE__ */ rt(n) && (n = /* @__PURE__ */ X(n));
      const i = /* @__PURE__ */ X(this), { has: l, get: o } = cs(i);
      let a = l.call(i, r);
      a || (r = /* @__PURE__ */ X(r), a = l.call(i, r));
      const c = o.call(i, r);
      return i.set(r, n), a ? We(n, c) && Ze(i, "set", r, n, c) : Ze(i, "add", r, n), this;
    },
    delete(r) {
      const n = /* @__PURE__ */ X(this), { has: i, get: l } = cs(n);
      let o = i.call(n, r);
      o || (r = /* @__PURE__ */ X(r), o = i.call(n, r));
      const a = l ? l.call(n, r) : void 0, c = n.delete(r);
      return o && Ze(n, "delete", r, void 0, a), c;
    },
    clear() {
      const r = /* @__PURE__ */ X(this), n = r.size !== 0, i = void 0, l = r.clear();
      return n && Ze(r, "clear", void 0, void 0, i), l;
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
  return (r, n, i) => n === "__v_isReactive" ? !e : n === "__v_isReadonly" ? e : n === "__v_raw" ? r : Reflect.get(z(s, n) && n in r ? s : r, n, i);
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
function xt(e) {
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
  if (!J(e) || e.__v_raw && !(t && e.__v_isReactive) || e.__v_skip || !Object.isExtensible(e)) return e;
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
function X(e) {
  const t = e && e.__v_raw;
  return t ? /* @__PURE__ */ X(t) : e;
}
function _l(e) {
  return !z(e, "__v_skip") && Object.isExtensible(e) && On(e, "__v_skip", !0), e;
}
var He = (e) => J(e) ? /* @__PURE__ */ xt(e) : e, Pt = (e) => J(e) ? /* @__PURE__ */ ar(e) : e;
// @__NO_SIDE_EFFECTS__
function ye(e) {
  return e ? e.__v_isRef === !0 : !1;
}
// @__NO_SIDE_EFFECTS__
function ue(e) {
  return xl(e, !1);
}
function xl(e, t) {
  return /* @__PURE__ */ ye(e) ? e : new wl(e, t);
}
var wl = class {
  constructor(e, t) {
    this.dep = new wr(), this.__v_isRef = !0, this.__v_isShallow = !1, this._rawValue = t ? e : /* @__PURE__ */ X(e), this._value = t ? e : He(e), this.__v_isShallow = t;
  }
  get value() {
    return this.dep.track(), this._value;
  }
  set value(e) {
    const t = this._rawValue, s = this.__v_isShallow || /* @__PURE__ */ Pe(e) || /* @__PURE__ */ rt(e);
    e = s ? e : /* @__PURE__ */ X(e), We(e, t) && (this._rawValue = e, this._value = s ? e : He(e), this.dep.trigger());
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
    this.fn = e, this.setter = t, this._value = void 0, this.dep = new wr(this), this.__v_isRef = !0, this.deps = void 0, this.depsTail = void 0, this.flags = 16, this.globalVersion = zt - 1, this.next = void 0, this.effect = this, this.__v_isReadonly = !t, this.isSSR = s;
  }
  notify() {
    if (this.flags |= 16, !(this.flags & 8) && se !== this)
      return Hn(this, !0), !0;
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
  return U(e) ? r = e : (r = e.get, n = e.set), new Sl(r, n, s);
}
var hs = {}, ms = /* @__PURE__ */ new WeakMap(), gt = void 0;
function Tl(e, t = !1, s = gt) {
  if (s) {
    let r = ms.get(s);
    r || ms.set(s, r = []), r.push(e);
  }
}
function Il(e, t, s = Z) {
  const { immediate: r, deep: n, once: i, scheduler: l, augmentJob: o, call: a } = s, c = (g) => n ? g : /* @__PURE__ */ Pe(g) || n === !1 || n === 0 ? Qe(g, 1) : Qe(g);
  let u, h, m, w, N = !1, E = !1;
  if (/* @__PURE__ */ ye(e) ? (h = () => e.value, N = /* @__PURE__ */ Pe(e)) : /* @__PURE__ */ _t(e) ? (h = () => c(e), N = !0) : R(e) ? (E = !0, N = e.some((g) => /* @__PURE__ */ _t(g) || /* @__PURE__ */ Pe(g)), h = () => e.map((g) => {
    if (/* @__PURE__ */ ye(g)) return g.value;
    if (/* @__PURE__ */ _t(g)) return c(g);
    if (U(g)) return a ? a(g, 2) : g();
  })) : U(e) ? t ? h = a ? () => a(e, 2) : e : h = () => {
    if (m) {
      tt();
      try {
        m();
      } finally {
        st();
      }
    }
    const g = gt;
    gt = u;
    try {
      return a ? a(e, 3, [w]) : e(w);
    } finally {
      gt = g;
    }
  } : h = Ke, t && n) {
    const g = h, S = n === !0 ? 1 / 0 : n;
    h = () => Qe(g(), S);
  }
  const q = tl(), W = () => {
    u.stop(), q && q.active && gr(q.effects, u);
  };
  if (i && t) {
    const g = t;
    t = (...S) => {
      g(...S), W();
    };
  }
  let V = E ? new Array(e.length).fill(hs) : hs;
  const K = (g) => {
    if (!(!(u.flags & 1) || !u.dirty && !g))
      if (t) {
        const S = u.run();
        if (n || N || (E ? S.some((M, D) => We(M, V[D])) : We(S, V))) {
          m && m();
          const M = gt;
          gt = u;
          try {
            const D = [
              S,
              V === hs ? void 0 : E && V[0] === hs ? [] : V,
              w
            ];
            V = S, a ? a(t, 3, D) : t(...D);
          } finally {
            gt = M;
          }
        }
      } else u.run();
  };
  return o && o(K), u = new Dn(h), u.scheduler = l ? () => l(K, !1) : K, w = (g) => Tl(g, !1, u), m = u.onStop = () => {
    const g = ms.get(u);
    if (g) {
      if (a) a(g, 4);
      else for (const S of g) S();
      ms.delete(u);
    }
  }, t ? r ? K(!0) : V = u.run() : l ? l(K.bind(null, !0), !0) : u.run(), W.pause = u.pause.bind(u), W.resume = u.resume.bind(u), W.stop = W, W;
}
function Qe(e, t = 1 / 0, s) {
  if (t <= 0 || !J(e) || e.__v_skip || (s = s || /* @__PURE__ */ new Map(), (s.get(e) || 0) >= t)) return e;
  if (s.set(e, t), t--, /* @__PURE__ */ ye(e)) Qe(e.value, t, s);
  else if (R(e)) for (let r = 0; r < e.length; r++) Qe(e[r], t, s);
  else if (Os(e) || Et(e)) e.forEach((r) => {
    Qe(r, t, s);
  });
  else if (En(e)) {
    for (const r in e) Qe(e[r], t, s);
    for (const r of Object.getOwnPropertySymbols(e)) Object.prototype.propertyIsEnumerable.call(e, r) && Qe(e[r], t, s);
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
  if (U(e)) {
    const n = ns(e, t, s, r);
    return n && Tn(n) && n.catch((i) => {
      Ds(i, t, s);
    }), n;
  }
  if (R(e)) {
    const n = [];
    for (let i = 0; i < e.length; i++) n.push(Fe(e[i], t, s, r));
    return n;
  }
}
function Ds(e, t, s, r = !0) {
  const n = t ? t.vnode : null, { errorHandler: i, throwUnhandledErrorInProduction: l } = t && t.appContext.config || Z;
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
var xe = [], Be = -1, Ot = [], ut = null, Tt = 0, Yn = /* @__PURE__ */ Promise.resolve(), bs = null;
function Tr(e) {
  const t = bs || Yn;
  return e ? t.then(this ? e.bind(this) : e) : t;
}
function Ol(e) {
  let t = Be + 1, s = xe.length;
  for (; t < s; ) {
    const r = t + s >>> 1, n = xe[r], i = Yt(n);
    i < e || i === e && n.flags & 2 ? t = r + 1 : s = r;
  }
  return t;
}
function Ir(e) {
  if (!(e.flags & 1)) {
    const t = Yt(e), s = xe[xe.length - 1];
    !s || !(e.flags & 2) && t >= Yt(s) ? xe.push(e) : xe.splice(Ol(t), 0, e), e.flags |= 1, Zn();
  }
}
function Zn() {
  bs || (bs = Yn.then(ei));
}
function $l(e) {
  R(e) ? Ot.push(...e) : ut && e.id === -1 ? ut.splice(Tt + 1, 0, e) : e.flags & 1 || (Ot.push(e), e.flags |= 1), Zn();
}
function Br(e, t, s = Be + 1) {
  for (; s < xe.length; s++) {
    const r = xe[s];
    if (r && r.flags & 2) {
      if (e && r.id !== e.uid) continue;
      xe.splice(s, 1), s--, r.flags & 4 && (r.flags &= -2), r(), r.flags & 4 || (r.flags &= -2);
    }
  }
}
function Qn(e) {
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
    for (Be = 0; Be < xe.length; Be++) {
      const t = xe[Be];
      t && !(t.flags & 8) && (t.flags & 4 && (t.flags &= -2), ns(t, t.i, t.i ? 15 : 14), t.flags & 4 || (t.flags &= -2));
    }
  } finally {
    for (; Be < xe.length; Be++) {
      const t = xe[Be];
      t && (t.flags &= -2);
    }
    Be = -1, xe.length = 0, Qn(e), bs = null, (xe.length || Ot.length) && ei(e);
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
    r._d && ws(-1);
    const i = ys(t);
    let l;
    try {
      l = e(...n);
    } finally {
      ys(i), r._d && ws(1);
    }
    return l;
  };
  return r._n = !0, r._c = !0, r._d = !0, r;
}
function Ae(e, t) {
  if (Ee === null) return e;
  const s = Bs(Ee), r = e.dirs || (e.dirs = []);
  for (let n = 0; n < t.length; n++) {
    let [i, l, o, a = Z] = t[n];
    i && (U(i) && (i = {
      mounted: i,
      updated: i
    }), i.deep && Qe(l), r.push({
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
    if (arguments.length > 1) return s && U(t) ? t.call(r && r.proxy) : t;
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
function ri(e, t, s = Z) {
  const { immediate: r, deep: n, flush: i, once: l } = s, o = oe({}, s), a = t && r || !t && i !== "post";
  let c;
  if (es) {
    if (i === "sync") {
      const w = Pl();
      c = w.__watcherHandles || (w.__watcherHandles = []);
    } else if (!a) {
      const w = () => {
      };
      return w.stop = Ke, w.resume = Ke, w.pause = Ke, w;
    }
  }
  const u = be;
  o.call = (w, N, E) => Fe(w, u, N, E);
  let h = !1;
  i === "post" ? o.scheduler = (w) => {
    Se(w, u && u.suspense);
  } : i !== "sync" && (h = !0, o.scheduler = (w, N) => {
    N ? w() : Ir(w);
  }), o.augmentJob = (w) => {
    t && (w.flags |= 4), h && (w.flags |= 2, u && (w.id = u.uid, w.i = u));
  };
  const m = Il(e, t, o);
  return es && (c ? c.push(m) : a && m()), m;
}
function Fl(e, t, s) {
  const r = this.proxy, n = ne(e) ? e.includes(".") ? ni(r, e) : () => r[e] : e.bind(r, r);
  let i;
  U(t) ? i = t : (i = t.handler, s = t);
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
var Dl = /* @__PURE__ */ Symbol("_vte"), ii = (e) => e.__isTeleport, Me = /* @__PURE__ */ Symbol("_leaveCb"), Ht = /* @__PURE__ */ Symbol("_enterCb");
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
}, Hl = {
  name: "BaseTransition",
  props: li,
  setup(e, { slots: t }) {
    const s = Fi(), r = Ll();
    return () => {
      const n = t.default && fi(t.default(), !0), i = n && n.length ? ai(n) : s.subTree ? ve() : void 0;
      if (!i) return;
      const l = /* @__PURE__ */ X(e), { mode: o } = l;
      if (r.isLeaving) return Js(i);
      const a = jr(i);
      if (!a) return Js(i);
      let c = ur(a, l, r, s, (h) => c = h);
      a.type !== we && Zt(a, c);
      let u = s.subTree && jr(s.subTree);
      if (u && u.type !== we && !mt(u, a) && oi(s).type !== we) {
        let h = ur(u, l, r, s);
        if (Zt(u, h), o === "out-in" && a.type !== we)
          return r.isLeaving = !0, h.afterLeave = () => {
            r.isLeaving = !1, s.job.flags & 8 || s.update(), delete h.afterLeave, u = void 0;
          }, Js(i);
        o === "in-out" && a.type !== we ? h.delayLeave = (m, w, N) => {
          const E = ui(r, u);
          E[String(u.key)] = u, m[Me] = () => {
            w(), m[Me] = void 0, delete c.delayedLeave, u = void 0;
          }, c.delayedLeave = () => {
            N(), delete c.delayedLeave, u = void 0;
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
    for (const s of e) if (s.type !== we) {
      t = s;
      break;
    }
  }
  return t;
}
var Rl = Hl;
function ui(e, t) {
  const { leavingVNodes: s } = e;
  let r = s.get(t.type);
  return r || (r = /* @__PURE__ */ Object.create(null), s.set(t.type, r)), r;
}
function ur(e, t, s, r, n) {
  const { appear: i, mode: l, persisted: o = !1, onBeforeEnter: a, onEnter: c, onAfterEnter: u, onEnterCancelled: h, onBeforeLeave: m, onLeave: w, onAfterLeave: N, onLeaveCancelled: E, onBeforeAppear: q, onAppear: W, onAfterAppear: V, onAppearCancelled: K } = t, g = String(e.key), S = ui(s, e), M = (b, F) => {
    b && Fe(b, r, 9, F);
  }, D = (b, F) => {
    const Y = F[1];
    M(b, F), R(b) ? b.every((k) => k.length <= 1) && Y() : b.length <= 1 && Y();
  }, $ = {
    mode: l,
    persisted: o,
    beforeEnter(b) {
      let F = a;
      if (!s.isMounted) if (i) F = q || a;
      else return;
      b[Me] && b[Me](!0);
      const Y = S[g];
      Y && mt(e, Y) && Y.el[Me] && Y.el[Me](), M(F, [b]);
    },
    enter(b) {
      if (S[g] === e) return;
      let F = c, Y = u, k = h;
      if (!s.isMounted) if (i)
        F = W || c, Y = V || u, k = K || h;
      else return;
      let re = !1;
      b[Ht] = (Ge) => {
        re || (re = !0, Ge ? M(k, [b]) : M(Y, [b]), $.delayedLeave && $.delayedLeave(), b[Ht] = void 0);
      };
      const ge = b[Ht].bind(null, !1);
      F ? D(F, [b, ge]) : ge();
    },
    leave(b, F) {
      const Y = String(e.key);
      if (b[Ht] && b[Ht](!0), s.isUnmounting) return F();
      M(m, [b]);
      let k = !1;
      b[Me] = (ge) => {
        k || (k = !0, F(), ge ? M(E, [b]) : M(N, [b]), b[Me] = void 0, S[Y] === e && delete S[Y]);
      };
      const re = b[Me].bind(null, !1);
      S[Y] = e, w ? D(w, [b, re]) : re();
    },
    clone(b) {
      const F = ur(b, t, s, r, n);
      return n && n(F), F;
    }
  };
  return $;
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
    if (t & 32 && U(s.default)) return s.default();
  }
}
function Zt(e, t) {
  e.shapeFlag & 6 && e.component ? (e.transition = t, Zt(e.component.subTree, t)) : e.shapeFlag & 128 ? (e.ssContent.transition = t.clone(e.ssContent), e.ssFallback.transition = t.clone(e.ssFallback)) : e.transition = t;
}
function fi(e, t = !1, s) {
  let r = [], n = 0;
  for (let i = 0; i < e.length; i++) {
    let l = e[i];
    const o = s == null ? l.key : String(s) + String(l.key != null ? l.key : i);
    l.type === pe ? (l.patchFlag & 128 && n++, r = r.concat(fi(l.children, t, o))) : (t || l.type !== we) && r.push(o != null ? ft(l, { key: o }) : l);
  }
  if (n > 1) for (let i = 0; i < r.length; i++) r[i].patchFlag = -2;
  return r;
}
// @__NO_SIDE_EFFECTS__
function Re(e, t) {
  return U(e) ? oe({ name: e.name }, t, { setup: e }) : e;
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
  if (R(e)) {
    e.forEach((E, q) => Kt(E, t && (R(t) ? t[q] : t), s, r, n));
    return;
  }
  if (qt(r) && !n) {
    r.shapeFlag & 512 && r.type.__asyncResolved && r.component.subTree.component && Kt(e, t, s, r.component.subTree);
    return;
  }
  const i = r.shapeFlag & 4 ? Bs(r.component) : r.el, l = n ? null : i, { i: o, r: a } = e, c = t && t.r, u = o.refs === Z ? o.refs = {} : o.refs, h = o.setupState, m = /* @__PURE__ */ X(h), w = h === Z ? An : (E) => Ur(u, E) ? !1 : z(m, E), N = (E, q) => !(q && Ur(u, q));
  if (c != null && c !== a) {
    if (Wr(t), ne(c))
      u[c] = null, w(c) && (h[c] = null);
    else if (/* @__PURE__ */ ye(c)) {
      const E = t;
      N(c, E.k) && (c.value = null), E.k && (u[E.k] = null);
    }
  }
  if (U(a)) ns(a, o, 12, [l, u]);
  else {
    const E = ne(a), q = /* @__PURE__ */ ye(a);
    if (E || q) {
      const W = () => {
        if (e.f) {
          const V = E ? w(a) ? h[a] : u[a] : N(a) || !e.k ? a.value : u[e.k];
          if (n) R(V) && gr(V, i);
          else if (R(V)) V.includes(i) || V.push(i);
          else if (E)
            u[a] = [i], w(a) && (h[a] = u[a]);
          else {
            const K = [i];
            N(a, e.k) && (a.value = K), e.k && (u[e.k] = K);
          }
        } else E ? (u[a] = l, w(a) && (h[a] = l)) : q && (N(a, e.k) && (a.value = l), e.k && (u[e.k] = l));
      };
      if (l) {
        const V = () => {
          W(), _s.delete(e);
        };
        V.id = -1, _s.set(e, V), Se(V, s);
      } else
        Wr(e), W();
    }
  }
}
function Wr(e) {
  const t = _s.get(e);
  t && (t.flags |= 8, _s.delete(e));
}
var af = ks().requestIdleCallback || ((e) => setTimeout(e, 1)), uf = ks().cancelIdleCallback || ((e) => clearTimeout(e)), qt = (e) => !!e.type.__asyncLoader, Ls = (e) => e.type.__isKeepAlive;
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
  if (Hs(t, r, s), s) {
    let n = s.parent;
    for (; n && n.parent; )
      Ls(n.parent.vnode) && Bl(r, t, s, n), n = n.parent;
  }
}
function Bl(e, t, s, r) {
  const n = Hs(t, e, r, !0);
  hi(() => {
    gr(r[t], n);
  }, s);
}
function Hs(e, t, s = be, r = !1) {
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
  (!es || e === "sp") && Hs(e, (...r) => t(...r), s);
}, jl = it("bm"), is = it("m"), Ul = it("bu"), Wl = it("u"), ls = it("bum"), hi = it("um"), Kl = it("sp"), ql = it("rtg"), Gl = it("rtc");
function Xl(e, t = be) {
  Hs("ec", e, t);
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
function Rs(e, t, s, r) {
  let n;
  const i = s && s[r], l = R(e);
  if (l || ne(e)) {
    const o = l && /* @__PURE__ */ _t(e);
    let a = !1, c = !1;
    o && (a = !/* @__PURE__ */ Pe(e), c = /* @__PURE__ */ rt(e), e = Fs(e)), n = new Array(e.length);
    for (let u = 0, h = e.length; u < h; u++) n[u] = t(a ? c ? Pt(He(e[u])) : He(e[u]) : e[u], u, void 0, i && i[u]);
  } else if (typeof e == "number") {
    n = new Array(e);
    for (let o = 0; o < e; o++) n[o] = t(o + 1, o, void 0, i && i[o]);
  } else if (J(e)) if (e[Symbol.iterator]) n = Array.from(e, (o, a) => t(o, a, void 0, i && i[a]));
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
}), Ys = (e, t) => e !== Z && !e.__isScriptSetup && z(e, t), Yl = {
  get({ _: e }, t) {
    if (t === "__v_skip") return !0;
    const { ctx: s, setupState: r, data: n, props: i, accessCache: l, type: o, appContext: a } = e;
    if (t[0] !== "$") {
      const m = l[t];
      if (m !== void 0) switch (m) {
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
        if (n !== Z && z(n, t))
          return l[t] = 2, n[t];
        if (z(i, t))
          return l[t] = 3, i[t];
        if (s !== Z && z(s, t))
          return l[t] = 4, s[t];
        cr && (l[t] = 0);
      }
    }
    const c = Gt[t];
    let u, h;
    if (c)
      return t === "$attrs" && me(e.attrs, "get", ""), c(e);
    if ((u = o.__cssModules) && (u = u[t])) return u;
    if (s !== Z && z(s, t))
      return l[t] = 4, s[t];
    if (h = a.config.globalProperties, z(h, t)) return h[t];
  },
  set({ _: e }, t, s) {
    const { data: r, setupState: n, ctx: i } = e;
    return Ys(n, t) ? (n[t] = s, !0) : r !== Z && z(r, t) ? (r[t] = s, !0) : z(e.props, t) || t[0] === "$" && t.slice(1) in e ? !1 : (i[t] = s, !0);
  },
  has({ _: { data: e, setupState: t, accessCache: s, ctx: r, appContext: n, props: i, type: l } }, o) {
    let a;
    return !!(s[o] || e !== Z && o[0] !== "$" && z(e, o) || Ys(t, o) || z(i, o) || z(r, o) || z(Gt, o) || z(n.config.globalProperties, o) || (a = l.__cssModules) && a[o]);
  },
  defineProperty(e, t, s) {
    return s.get != null ? e._.accessCache[t] = 0 : z(s, "value") && this.set(e, t, s.value, null), Reflect.defineProperty(e, t, s);
  }
};
function qr(e) {
  return R(e) ? e.reduce((t, s) => (t[s] = null, t), {}) : e;
}
var cr = !0;
function Zl(e) {
  const t = Er(e), s = e.proxy, r = e.ctx;
  cr = !1, t.beforeCreate && Gr(t.beforeCreate, e, "bc");
  const { data: n, computed: i, methods: l, watch: o, provide: a, inject: c, created: u, beforeMount: h, mounted: m, beforeUpdate: w, updated: N, activated: E, deactivated: q, beforeDestroy: W, beforeUnmount: V, destroyed: K, unmounted: g, render: S, renderTracked: M, renderTriggered: D, errorCaptured: $, serverPrefetch: b, expose: F, inheritAttrs: Y, components: k, directives: re, filters: ge } = t;
  if (c && Ql(c, r, null), l) for (const ie in l) {
    const Q = l[ie];
    U(Q) && (r[ie] = Q.bind(s));
  }
  if (n) {
    const ie = n.call(s, s);
    J(ie) && (e.data = /* @__PURE__ */ xt(ie));
  }
  if (cr = !0, i) for (const ie in i) {
    const Q = i[ie], lt = nt({
      get: U(Q) ? Q.bind(s, s) : U(Q.get) ? Q.get.bind(s, s) : Ke,
      set: !U(Q) && U(Q.set) ? Q.set.bind(s) : Ke
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
    const ie = U(a) ? a.call(s) : a;
    Reflect.ownKeys(ie).forEach((Q) => {
      Ml(Q, ie[Q]);
    });
  }
  u && Gr(u, e, "c");
  function ce(ie, Q) {
    R(Q) ? Q.forEach((lt) => ie(lt.bind(s))) : Q && ie(Q.bind(s));
  }
  if (ce(jl, h), ce(is, m), ce(Ul, w), ce(Wl, N), ce(Nl, E), ce(Vl, q), ce(Xl, $), ce(Gl, M), ce(ql, D), ce(ls, V), ce(hi, g), ce(Kl, b), R(F))
    if (F.length) {
      const ie = e.exposed || (e.exposed = {});
      F.forEach((Q) => {
        Object.defineProperty(ie, Q, {
          get: () => s[Q],
          set: (lt) => s[Q] = lt,
          enumerable: !0
        });
      });
    } else e.exposed || (e.exposed = {});
  S && e.render === Ke && (e.render = S), Y != null && (e.inheritAttrs = Y), k && (e.components = k), re && (e.directives = re), b && ci(e);
}
function Ql(e, t, s = Ke) {
  R(e) && (e = dr(e));
  for (const r in e) {
    const n = e[r];
    let i;
    J(n) ? "default" in n ? i = vs(n.from || r, n.default, !0) : i = vs(n.from || r) : i = vs(n), /* @__PURE__ */ ye(i) ? Object.defineProperty(t, r, {
      enumerable: !0,
      configurable: !0,
      get: () => i.value,
      set: (l) => i.value = l
    }) : t[r] = i;
  }
}
function Gr(e, t, s) {
  Fe(R(e) ? e.map((r) => r.bind(t.proxy)) : e.bind(t.proxy), t, s);
}
function gi(e, t, s, r) {
  let n = r.includes(".") ? ni(s, r) : () => s[r];
  if (ne(e)) {
    const i = t[e];
    U(i) && $t(n, i);
  } else if (U(e)) $t(n, e.bind(s));
  else if (J(e)) if (R(e)) e.forEach((i) => gi(i, t, s, r));
  else {
    const i = U(e.handler) ? e.handler.bind(s) : t[e.handler];
    U(i) && $t(n, i, e);
  }
}
function Er(e) {
  const t = e.type, { mixins: s, extends: r } = t, { mixins: n, optionsCache: i, config: { optionMergeStrategies: l } } = e.appContext, o = i.get(t);
  let a;
  return o ? a = o : !n.length && !s && !r ? a = t : (a = {}, n.length && n.forEach((c) => xs(a, c, l, !0)), xs(a, t, l)), J(t) && i.set(t, a), a;
}
function xs(e, t, s, r = !1) {
  const { mixins: n, extends: i } = t;
  i && xs(e, i, s, !0), n && n.forEach((l) => xs(e, l, s, !0));
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
    return oe(U(e) ? e.call(this, this) : e, U(t) ? t.call(this, this) : t);
  } : t : e;
}
function to(e, t) {
  return Vt(dr(e), dr(t));
}
function dr(e) {
  if (R(e)) {
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
  return e ? R(e) && R(t) ? [.../* @__PURE__ */ new Set([...e, ...t])] : oe(/* @__PURE__ */ Object.create(null), qr(e), qr(t ?? {})) : t;
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
    U(r) || (r = oe({}, r)), n != null && !J(n) && (n = null);
    const i = mi(), l = /* @__PURE__ */ new WeakSet(), o = [];
    let a = !1;
    const c = i.app = {
      _uid: ro++,
      _component: r,
      _props: n,
      _container: null,
      _context: i,
      _instance: null,
      version: Ro,
      get config() {
        return i.config;
      },
      set config(u) {
      },
      use(u, ...h) {
        return l.has(u) || (u && U(u.install) ? (l.add(u), u.install(c, ...h)) : U(u) && (l.add(u), u(c, ...h))), c;
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
      mount(u, h, m) {
        if (!a) {
          const w = c._ceVNode || de(r, n);
          return w.appContext = i, m === !0 ? m = "svg" : m === !1 && (m = void 0), h && t ? t(w, u) : e(w, u, m), a = !0, c._container = u, u.__vue_app__ = c, Bs(w.component);
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
  const r = e.vnode.props || Z;
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
  if (!U(e)) {
    const a = (c) => {
      const u = bi(c, t, !0);
      u && (o = !0, oe(l, u));
    };
    !s && t.mixins.length && t.mixins.forEach(a), e.extends && a(e.extends), e.mixins && e.mixins.forEach(a);
  }
  return !i && !o ? (J(e) && r.set(e, null), null) : (R(i) ? i.forEach((a) => l[a] = null) : oe(l, i), J(e) && r.set(e, l), l);
}
function Ns(e, t) {
  return !e || !Is(t) ? !1 : (t = t.slice(2).replace(/Once$/, ""), z(e, t[0].toLowerCase() + t.slice(1)) || z(e, Ct(t)) || z(e, t));
}
function Zs(e) {
  const { type: t, vnode: s, proxy: r, withProxy: n, propsOptions: [i], slots: l, attrs: o, emit: a, render: c, renderCache: u, props: h, data: m, setupState: w, ctx: N, inheritAttrs: E } = e, q = ys(e);
  let W, V;
  try {
    if (s.shapeFlag & 4) {
      const g = n || r, S = g;
      W = Ue(c.call(S, g, u, h, w, m, N)), V = o;
    } else {
      const g = t;
      W = Ue(g.length > 1 ? g(h, {
        attrs: o,
        slots: l,
        emit: a
      }) : g(h, null)), V = t.props ? o : ao(o);
    }
  } catch (g) {
    Xt.length = 0, Ds(g, e, 1), W = de(we);
  }
  let K = W;
  if (V && E !== !1) {
    const g = Object.keys(V), { shapeFlag: S } = K;
    g.length && S & 7 && (i && g.some(Es) && (V = uo(V, i)), K = ft(K, V, !1, !0));
  }
  return s.dirs && (K = ft(K, null, !1, !0), K.dirs = K.dirs ? K.dirs.concat(s.dirs) : s.dirs), s.transition && Zt(K, s.transition), W = K, ys(q), W;
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
        const m = u[h];
        if (yi(l, r, m) && !Ns(c, m)) return !0;
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
  return s === "style" && J(r) && J(n) ? !rs(r, n) : r !== n;
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
var _i = {}, xi = () => Object.create(_i), wi = (e) => Object.getPrototypeOf(e) === _i;
function ho(e, t, s, r = !1) {
  const n = {}, i = xi();
  e.propsDefaults = /* @__PURE__ */ Object.create(null), Ci(e, t, n, i);
  for (const l in e.propsOptions[0]) l in n || (n[l] = void 0);
  s ? e.props = r ? n : /* @__PURE__ */ yl(n) : e.type.props ? e.props = n : e.props = i, e.attrs = i;
}
function po(e, t, s, r) {
  const { props: n, attrs: i, vnode: { patchFlag: l } } = e, o = /* @__PURE__ */ X(n), [a] = e.propsOptions;
  let c = !1;
  if ((r || l > 0) && !(l & 16)) {
    if (l & 8) {
      const u = e.vnode.dynamicProps;
      for (let h = 0; h < u.length; h++) {
        let m = u[h];
        if (Ns(e.emitsOptions, m)) continue;
        const w = t[m];
        if (a) if (z(i, m))
          w !== i[m] && (i[m] = w, c = !0);
        else {
          const N = Ce(m);
          n[N] = hr(a, o, N, w, e, !1);
        }
        else w !== i[m] && (i[m] = w, c = !0);
      }
    }
  } else {
    Ci(e, t, n, i) && (c = !0);
    let u;
    for (const h in o) (!t || !z(t, h) && ((u = Ct(h)) === h || !z(t, u))) && (a ? s && (s[h] !== void 0 || s[u] !== void 0) && (n[h] = hr(a, o, h, void 0, e, !0)) : delete n[h]);
    if (i !== o)
      for (const h in i) (!t || !z(t, h)) && (delete i[h], c = !0);
  }
  c && Ze(e.attrs, "set", "");
}
function Ci(e, t, s, r) {
  const [n, i] = e.propsOptions;
  let l = !1, o;
  if (t) for (let a in t) {
    if (jt(a)) continue;
    const c = t[a];
    let u;
    n && z(n, u = Ce(a)) ? !i || !i.includes(u) ? s[u] = c : (o || (o = {}))[u] = c : Ns(e.emitsOptions, a) || (!(a in r) || c !== r[a]) && (r[a] = c, l = !0);
  }
  if (i) {
    const a = /* @__PURE__ */ X(s), c = o || Z;
    for (let u = 0; u < i.length; u++) {
      const h = i[u];
      s[h] = hr(n, a, h, c[h], e, !z(c, h));
    }
  }
  return l;
}
function hr(e, t, s, r, n, i) {
  const l = e[s];
  if (l != null) {
    const o = z(l, "default");
    if (o && r === void 0) {
      const a = l.default;
      if (l.type !== Function && !l.skipFactory && U(a)) {
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
  if (!U(e)) {
    const u = (h) => {
      a = !0;
      const [m, w] = Si(h, t, !0);
      oe(l, m), w && o.push(...w);
    };
    !s && t.mixins.length && t.mixins.forEach(u), e.extends && u(e.extends), e.mixins && e.mixins.forEach(u);
  }
  if (!i && !a)
    return J(e) && r.set(e, It), It;
  if (R(i)) for (let u = 0; u < i.length; u++) {
    const h = Ce(i[u]);
    Yr(h) && (l[h] = Z);
  }
  else if (i) for (const u in i) {
    const h = Ce(u);
    if (Yr(h)) {
      const m = i[u], w = l[h] = R(m) || U(m) ? { type: m } : oe({}, m), N = w.type;
      let E = !1, q = !0;
      if (R(N)) for (let W = 0; W < N.length; ++W) {
        const V = N[W], K = U(V) && V.name;
        if (K === "Boolean") {
          E = !0;
          break;
        } else K === "String" && (q = !1);
      }
      else E = U(N) && N.name === "Boolean";
      w[0] = E, w[1] = q, (E || z(w, "default")) && o.push(h);
    }
  }
  const c = [l, o];
  return J(e) && r.set(e, c), c;
}
function Yr(e) {
  return e[0] !== "$" && !jt(e);
}
var Or = (e) => e === "_" || e === "_ctx" || e === "$stable", $r = (e) => R(e) ? e.map(Ue) : [Ue(e)], go = (e, t, s) => {
  if (t._n) return t;
  const r = si((...n) => $r(t(...n)), s);
  return r._c = !1, r;
}, Ai = (e, t, s) => {
  const r = e._ctx;
  for (const n in e) {
    if (Or(n)) continue;
    const i = e[n];
    if (U(i)) t[n] = go(n, i, r);
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
  const r = e.slots = xi();
  if (e.vnode.shapeFlag & 32) {
    const n = t._;
    n ? (Ii(r, t, s), s && On(r, "_", n, !0)) : Ai(t, r);
  } else t && Ti(e, t);
}, bo = (e, t, s) => {
  const { vnode: r, slots: n } = e;
  let i = !0, l = Z;
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
  const { insert: r, remove: n, patchProp: i, createElement: l, createText: o, createComment: a, setText: c, setElementText: u, parentNode: h, nextSibling: m, setScopeId: w = Ke, insertStaticContent: N } = e, E = (f, d, p, C = null, _ = null, y = null, I = void 0, T = null, A = !!d.dynamicChildren) => {
    if (f === d) return;
    f && !mt(f, d) && (C = fs(f), ot(f, _, y, !0), f = null), d.patchFlag === -2 && (A = !1, d.dynamicChildren = null);
    const { type: x, ref: H, shapeFlag: O } = d;
    switch (x) {
      case Vs:
        q(f, d, p, C);
        break;
      case we:
        W(f, d, p, C);
        break;
      case er:
        f == null && V(d, p, C, I);
        break;
      case pe:
        k(f, d, p, C, _, y, I, T, A);
        break;
      default:
        O & 1 ? S(f, d, p, C, _, y, I, T, A) : O & 6 ? re(f, d, p, C, _, y, I, T, A) : (O & 64 || O & 128) && x.process(f, d, p, C, _, y, I, T, A, St);
    }
    H != null && _ ? Kt(H, f && f.ref, y, d || f, !d) : H == null && f && f.ref != null && Kt(f.ref, null, y, f, !0);
  }, q = (f, d, p, C) => {
    if (f == null) r(d.el = o(d.children), p, C);
    else {
      const _ = d.el = f.el;
      d.children !== f.children && c(_, d.children);
    }
  }, W = (f, d, p, C) => {
    f == null ? r(d.el = a(d.children || ""), p, C) : d.el = f.el;
  }, V = (f, d, p, C) => {
    [f.el, f.anchor] = N(f.children, d, p, C, f.el, f.anchor);
  }, K = ({ el: f, anchor: d }, p, C) => {
    let _;
    for (; f && f !== d; )
      _ = m(f), r(f, p, C), f = _;
    r(d, p, C);
  }, g = ({ el: f, anchor: d }) => {
    let p;
    for (; f && f !== d; )
      p = m(f), n(f), f = p;
    n(d);
  }, S = (f, d, p, C, _, y, I, T, A) => {
    if (d.type === "svg" ? I = "svg" : d.type === "math" && (I = "mathml"), f == null) M(d, p, C, _, y, I, T, A);
    else {
      const x = f.el && f.el._isVueCE ? f.el : null;
      try {
        x && x._beginPatch(), b(f, d, _, y, I, T, A);
      } finally {
        x && x._endPatch();
      }
    }
  }, M = (f, d, p, C, _, y, I, T) => {
    let A, x;
    const { props: H, shapeFlag: O, transition: P, dirs: B } = f;
    if (A = f.el = l(f.type, y, H && H.is, H), O & 8 ? u(A, f.children) : O & 16 && $(f.children, A, null, C, _, Qs(f, y), I, T), B && dt(f, null, C, "created"), D(A, f, f.scopeId, I, C), H) {
      for (const ee in H) ee !== "value" && !jt(ee) && i(A, ee, null, H[ee], y, C);
      "value" in H && i(A, "value", null, H.value, y), (x = H.onVnodeBeforeMount) && Ve(x, C, f);
    }
    B && dt(f, null, C, "beforeMount");
    const G = xo(_, P);
    G && P.beforeEnter(A), r(A, d, p), ((x = H && H.onVnodeMounted) || G || B) && Se(() => {
      x && Ve(x, C, f), G && P.enter(A), B && dt(f, null, C, "mounted");
    }, _);
  }, D = (f, d, p, C, _) => {
    if (p && w(f, p), C) for (let y = 0; y < C.length; y++) w(f, C[y]);
    if (_) {
      let y = _.subTree;
      if (d === y || Mi(y.type) && (y.ssContent === d || y.ssFallback === d)) {
        const I = _.vnode;
        D(f, I, I.scopeId, I.slotScopeIds, _.parent);
      }
    }
  }, $ = (f, d, p, C, _, y, I, T, A = 0) => {
    for (let x = A; x < f.length; x++) E(null, f[x] = T ? Ye(f[x]) : Ue(f[x]), d, p, C, _, y, I, T);
  }, b = (f, d, p, C, _, y, I) => {
    const T = d.el = f.el;
    let { patchFlag: A, dynamicChildren: x, dirs: H } = d;
    A |= f.patchFlag & 16;
    const O = f.props || Z, P = d.props || Z;
    let B;
    if (p && ht(p, !1), (B = P.onVnodeBeforeUpdate) && Ve(B, p, d, f), H && dt(d, f, p, "beforeUpdate"), p && ht(p, !0), (O.innerHTML && P.innerHTML == null || O.textContent && P.textContent == null) && u(T, ""), x ? F(f.dynamicChildren, x, T, p, C, Qs(d, _), y) : I || Q(f, d, T, null, p, C, Qs(d, _), y, !1), A > 0) {
      if (A & 16) Y(T, O, P, p, _);
      else if (A & 2 && O.class !== P.class && i(T, "class", null, P.class, _), A & 4 && i(T, "style", O.style, P.style, _), A & 8) {
        const G = d.dynamicProps;
        for (let ee = 0; ee < G.length; ee++) {
          const te = G[ee], ae = O[te], fe = P[te];
          (fe !== ae || te === "value") && i(T, te, ae, fe, _, p);
        }
      }
      A & 1 && f.children !== d.children && u(T, d.children);
    } else !I && x == null && Y(T, O, P, p, _);
    ((B = P.onVnodeUpdated) || H) && Se(() => {
      B && Ve(B, p, d, f), H && dt(d, f, p, "updated");
    }, C);
  }, F = (f, d, p, C, _, y, I) => {
    for (let T = 0; T < d.length; T++) {
      const A = f[T], x = d[T];
      E(A, x, A.el && (A.type === pe || !mt(A, x) || A.shapeFlag & 198) ? h(A.el) : p, null, C, _, y, I, !0);
    }
  }, Y = (f, d, p, C, _) => {
    if (d !== p) {
      if (d !== Z)
        for (const y in d) !jt(y) && !(y in p) && i(f, y, d[y], null, _, C);
      for (const y in p) {
        if (jt(y)) continue;
        const I = p[y], T = d[y];
        I !== T && y !== "value" && i(f, y, T, I, _, C);
      }
      "value" in p && i(f, "value", d.value, p.value, _);
    }
  }, k = (f, d, p, C, _, y, I, T, A) => {
    const x = d.el = f ? f.el : o(""), H = d.anchor = f ? f.anchor : o("");
    let { patchFlag: O, dynamicChildren: P, slotScopeIds: B } = d;
    B && (T = T ? T.concat(B) : B), f == null ? (r(x, p, C), r(H, p, C), $(d.children || [], p, H, _, y, I, T, A)) : O > 0 && O & 64 && P && f.dynamicChildren && f.dynamicChildren.length === P.length ? (F(f.dynamicChildren, P, p, _, y, I, T), (d.key != null || _ && d === _.subTree) && Ei(f, d, !0)) : Q(f, d, p, H, _, y, I, T, A);
  }, re = (f, d, p, C, _, y, I, T, A) => {
    d.slotScopeIds = T, f == null ? d.shapeFlag & 512 ? _.ctx.activate(d, p, C, I, A) : ge(d, p, C, _, y, I, A) : Ge(f, d, A);
  }, ge = (f, d, p, C, _, y, I) => {
    const T = f.component = $o(f, C, _);
    if (Ls(f) && (T.ctx.renderer = St), Mo(T, !1, I), T.asyncDep) {
      if (_ && _.registerDep(T, ce, I), !f.el) {
        const A = T.subTree = de(we);
        W(null, A, d, p), f.placeholder = A.el;
      }
    } else ce(T, f, d, p, _, y, I);
  }, Ge = (f, d, p) => {
    const C = d.component = f.component;
    if (fo(f, d, p)) if (C.asyncDep && !C.asyncResolved) {
      ie(C, d, p);
      return;
    } else
      C.next = d, C.update();
    else
      d.el = f.el, C.vnode = d;
  }, ce = (f, d, p, C, _, y, I) => {
    const T = () => {
      if (f.isMounted) {
        let { next: O, bu: P, u: B, parent: G, vnode: ee } = f;
        {
          const Te = Oi(f);
          if (Te) {
            O && (O.el = ee.el, ie(f, O, I)), Te.asyncDep.then(() => {
              Se(() => {
                f.isUnmounted || x();
              }, _);
            });
            return;
          }
        }
        let te = O, ae;
        ht(f, !1), O ? (O.el = ee.el, ie(f, O, I)) : O = ee, P && ps(P), (ae = O.props && O.props.onVnodeBeforeUpdate) && Ve(ae, G, O, ee), ht(f, !0);
        const fe = Zs(f), De = f.subTree;
        f.subTree = fe, E(De, fe, h(De.el), fs(De), f, _, y), O.el = fe.el, te === null && co(f, fe.el), B && Se(B, _), (ae = O.props && O.props.onVnodeUpdated) && Se(() => Ve(ae, G, O, ee), _);
      } else {
        let O;
        const { el: P, props: B } = d, { bm: G, m: ee, parent: te, root: ae, type: fe } = f, De = qt(d);
        if (ht(f, !1), G && ps(G), !De && (O = B && B.onVnodeBeforeMount) && Ve(O, te, d), ht(f, !0), P && Ws) {
          const Te = () => {
            f.subTree = Zs(f), Ws(P, f.subTree, f, _, null);
          };
          De && fe.__asyncHydrate ? fe.__asyncHydrate(P, f, Te) : Te();
        } else {
          ae.ce && ae.ce._hasShadowRoot() && ae.ce._injectChildStyle(fe, f.parent ? f.parent.type : void 0);
          const Te = f.subTree = Zs(f);
          E(null, Te, p, C, f, _, y), d.el = Te.el;
        }
        if (ee && Se(ee, _), !De && (O = B && B.onVnodeMounted)) {
          const Te = d;
          Se(() => Ve(O, te, Te), _);
        }
        (d.shapeFlag & 256 || te && qt(te.vnode) && te.vnode.shapeFlag & 256) && f.a && Se(f.a, _), f.isMounted = !0, d = p = C = null;
      }
    };
    f.scope.on();
    const A = f.effect = new Dn(T);
    f.scope.off();
    const x = f.update = A.run.bind(A), H = f.job = A.runIfDirty.bind(A);
    H.i = f, H.id = f.uid, A.scheduler = () => Ir(H), ht(f, !0), x();
  }, ie = (f, d, p) => {
    d.component = f;
    const C = f.vnode.props;
    f.vnode = d, f.next = null, po(f, d.props, C, p), bo(f, d.children, p), tt(), Br(f), st();
  }, Q = (f, d, p, C, _, y, I, T, A = !1) => {
    const x = f && f.children, H = f ? f.shapeFlag : 0, O = d.children, { patchFlag: P, shapeFlag: B } = d;
    if (P > 0) {
      if (P & 128) {
        as(x, O, p, C, _, y, I, T, A);
        return;
      } else if (P & 256) {
        lt(x, O, p, C, _, y, I, T, A);
        return;
      }
    }
    B & 8 ? (H & 16 && Ft(x, _, y), O !== x && u(p, O)) : H & 16 ? B & 16 ? as(x, O, p, C, _, y, I, T, A) : Ft(x, _, y, !0) : (H & 8 && u(p, ""), B & 16 && $(O, p, C, _, y, I, T, A));
  }, lt = (f, d, p, C, _, y, I, T, A) => {
    f = f || It, d = d || It;
    const x = f.length, H = d.length, O = Math.min(x, H);
    let P;
    for (P = 0; P < O; P++) {
      const B = d[P] = A ? Ye(d[P]) : Ue(d[P]);
      E(f[P], B, p, null, _, y, I, T, A);
    }
    x > H ? Ft(f, _, y, !0, !1, O) : $(d, p, C, _, y, I, T, A, O);
  }, as = (f, d, p, C, _, y, I, T, A) => {
    let x = 0;
    const H = d.length;
    let O = f.length - 1, P = H - 1;
    for (; x <= O && x <= P; ) {
      const B = f[x], G = d[x] = A ? Ye(d[x]) : Ue(d[x]);
      if (mt(B, G)) E(B, G, p, null, _, y, I, T, A);
      else break;
      x++;
    }
    for (; x <= O && x <= P; ) {
      const B = f[O], G = d[P] = A ? Ye(d[P]) : Ue(d[P]);
      if (mt(B, G)) E(B, G, p, null, _, y, I, T, A);
      else break;
      O--, P--;
    }
    if (x > O) {
      if (x <= P) {
        const B = P + 1, G = B < H ? d[B].el : C;
        for (; x <= P; )
          E(null, d[x] = A ? Ye(d[x]) : Ue(d[x]), p, G, _, y, I, T, A), x++;
      }
    } else if (x > P) for (; x <= O; )
      ot(f[x], _, y, !0), x++;
    else {
      const B = x, G = x, ee = /* @__PURE__ */ new Map();
      for (x = G; x <= P; x++) {
        const Ie = d[x] = A ? Ye(d[x]) : Ue(d[x]);
        Ie.key != null && ee.set(Ie.key, x);
      }
      let te, ae = 0;
      const fe = P - G + 1;
      let De = !1, Te = 0;
      const Dt = new Array(fe);
      for (x = 0; x < fe; x++) Dt[x] = 0;
      for (x = B; x <= O; x++) {
        const Ie = f[x];
        if (ae >= fe) {
          ot(Ie, _, y, !0);
          continue;
        }
        let Ne;
        if (Ie.key != null) Ne = ee.get(Ie.key);
        else for (te = G; te <= P; te++) if (Dt[te - G] === 0 && mt(Ie, d[te])) {
          Ne = te;
          break;
        }
        Ne === void 0 ? ot(Ie, _, y, !0) : (Dt[Ne - G] = x + 1, Ne >= Te ? Te = Ne : De = !0, E(Ie, d[Ne], p, null, _, y, I, T, A), ae++);
      }
      const Fr = De ? wo(Dt) : It;
      for (te = Fr.length - 1, x = fe - 1; x >= 0; x--) {
        const Ie = G + x, Ne = d[Ie], Dr = d[Ie + 1], Lr = Ie + 1 < H ? Dr.el || $i(Dr) : C;
        Dt[x] === 0 ? E(null, Ne, p, Lr, _, y, I, T, A) : De && (te < 0 || x !== Fr[te] ? us(Ne, p, Lr, 2) : te--);
      }
    }
  }, us = (f, d, p, C, _ = null) => {
    const { el: y, type: I, transition: T, children: A, shapeFlag: x } = f;
    if (x & 6) {
      us(f.component.subTree, d, p, C);
      return;
    }
    if (x & 128) {
      f.suspense.move(d, p, C);
      return;
    }
    if (x & 64) {
      I.move(f, d, p, St);
      return;
    }
    if (I === pe) {
      r(y, d, p);
      for (let H = 0; H < A.length; H++) us(A[H], d, p, C);
      r(f.anchor, d, p);
      return;
    }
    if (I === er) {
      K(f, d, p);
      return;
    }
    if (C !== 2 && x & 1 && T) if (C === 0) T.persisted && !y[Me] ? r(y, d, p) : (T.beforeEnter(y), r(y, d, p), Se(() => T.enter(y), _));
    else {
      const { leave: H, delayLeave: O, afterLeave: P } = T, B = () => {
        f.ctx.isUnmounted ? n(y) : r(y, d, p);
      }, G = () => {
        const ee = y._isLeaving || !!y[Me];
        y._isLeaving && y[Me](!0), T.persisted && !ee ? B() : H(y, () => {
          B(), P && P();
        });
      };
      O ? O(y, B, G) : G();
    }
    else r(y, d, p);
  }, ot = (f, d, p, C = !1, _ = !1) => {
    const { type: y, props: I, ref: T, children: A, dynamicChildren: x, shapeFlag: H, patchFlag: O, dirs: P, cacheIndex: B, memo: G } = f;
    if (O === -2 && (_ = !1), T != null && (tt(), Kt(T, null, p, f, !0), st()), B != null && (d.renderCache[B] = void 0), H & 256) {
      d.ctx.deactivate(f);
      return;
    }
    const ee = H & 1 && P, te = !qt(f);
    let ae;
    if (te && (ae = I && I.onVnodeBeforeUnmount) && Ve(ae, d, f), H & 6) ji(f.component, p, C);
    else {
      if (H & 128) {
        f.suspense.unmount(p, C);
        return;
      }
      ee && dt(f, null, d, "beforeUnmount"), H & 64 ? f.type.remove(f, d, p, St, C) : x && !x.hasOnce && (y !== pe || O > 0 && O & 64) ? Ft(x, d, p, !1, !0) : (y === pe && O & 384 || !_ && H & 16) && Ft(A, d, p), C && kr(f);
    }
    const fe = G != null && B == null;
    (te && (ae = I && I.onVnodeUnmounted) || ee || fe) && Se(() => {
      ae && Ve(ae, d, f), ee && dt(f, null, d, "unmounted"), fe && (f.el = null);
    }, p);
  }, kr = (f) => {
    const { type: d, el: p, anchor: C, transition: _ } = f;
    if (d === pe) {
      Bi(p, C);
      return;
    }
    if (d === er) {
      g(f);
      return;
    }
    const y = () => {
      n(p), _ && !_.persisted && _.afterLeave && _.afterLeave();
    };
    if (f.shapeFlag & 1 && _ && !_.persisted) {
      const { leave: I, delayLeave: T } = _, A = () => I(p, y);
      T ? T(f.el, y, A) : A();
    } else y();
  }, Bi = (f, d) => {
    let p;
    for (; f !== d; )
      p = m(f), n(f), f = p;
    n(d);
  }, ji = (f, d, p) => {
    const { bum: C, scope: _, job: y, subTree: I, um: T, m: A, a: x } = f;
    Zr(A), Zr(x), C && ps(C), _.stop(), y && (y.flags |= 8, ot(I, f, d, p)), T && Se(T, d), Se(() => {
      f.isUnmounted = !0;
    }, d);
  }, Ft = (f, d, p, C = !1, _ = !1, y = 0) => {
    for (let I = y; I < f.length; I++) ot(f[I], d, p, C, _);
  }, fs = (f) => {
    if (f.shapeFlag & 6) return fs(f.component.subTree);
    if (f.shapeFlag & 128) return f.suspense.next();
    const d = m(f.anchor || f.el), p = d && d[Dl];
    return p ? m(p) : d;
  };
  let js = !1;
  const Pr = (f, d, p) => {
    let C;
    f == null ? d._vnode && (ot(d._vnode, null, null, !0), C = d._vnode.component) : E(d._vnode || null, f, d, null, null, null, p), d._vnode = f, js || (js = !0, Br(C), Qn(), js = !1);
  }, St = {
    p: E,
    um: ot,
    m: us,
    r: kr,
    mt: ge,
    mc: $,
    pc: Q,
    pbc: F,
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
function Qs({ type: e, props: t }, s) {
  return s === "svg" && e === "foreignObject" || s === "mathml" && e === "annotation-xml" && t && t.encoding && t.encoding.includes("html") ? void 0 : s;
}
function ht({ effect: e, job: t }, s) {
  s ? (e.flags |= 32, t.flags |= 4) : (e.flags &= -33, t.flags &= -5);
}
function xo(e, t) {
  return (!e || e && !e.pendingBranch) && t && !t.persisted;
}
function Ei(e, t, s = !1) {
  const r = e.children, n = t.children;
  if (R(r) && R(n)) for (let i = 0; i < r.length; i++) {
    const l = r[i];
    let o = n[i];
    o.shapeFlag & 1 && !o.dynamicChildren && ((o.patchFlag <= 0 || o.patchFlag === 32) && (o = n[i] = Ye(n[i]), o.el = l.el), !s && o.patchFlag !== -2 && Ei(l, o)), o.type === Vs && (o.patchFlag === -1 && (o = n[i] = Ye(o)), o.el = l.el), o.type === we && !o.el && (o.el = l.el);
  }
}
function wo(e) {
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
function Zr(e) {
  if (e) for (let t = 0; t < e.length; t++) e[t].flags |= 8;
}
function $i(e) {
  if (e.placeholder) return e.placeholder;
  const t = e.component;
  return t ? $i(t.subTree) : null;
}
var Mi = (e) => e.__isSuspense;
function Co(e, t) {
  t && t.pendingBranch ? R(e) ? t.effects.push(...e) : t.effects.push(e) : $l(e);
}
var pe = /* @__PURE__ */ Symbol.for("v-fgt"), Vs = /* @__PURE__ */ Symbol.for("v-txt"), we = /* @__PURE__ */ Symbol.for("v-cmt"), er = /* @__PURE__ */ Symbol.for("v-stc"), Xt = [], Oe = null;
function L(e = !1) {
  Xt.push(Oe = e ? null : []);
}
function So() {
  Xt.pop(), Oe = Xt[Xt.length - 1] || null;
}
var Qt = 1;
function ws(e, t = !1) {
  Qt += e, e < 0 && Oe && t && (Oe.hasOnce = !0);
}
function ki(e) {
  return e.dynamicChildren = Qt > 0 ? Oe || It : null, So(), Qt > 0 && Oe && Oe.push(e), e;
}
function j(e, t, s, r, n, i) {
  return ki(v(e, t, s, r, n, i, !0));
}
function wt(e, t, s, r, n) {
  return ki(de(e, t, s, r, n, !0));
}
function Cs(e) {
  return e ? e.__v_isVNode === !0 : !1;
}
function mt(e, t) {
  return e.type === t.type && e.key === t.key;
}
var Pi = ({ key: e }) => e ?? null, gs = ({ ref: e, ref_key: t, ref_for: s }) => (typeof e == "number" && (e = "" + e), e != null ? ne(e) || /* @__PURE__ */ ye(e) || U(e) ? {
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
  return o ? (Mr(a, s), i & 128 && e.normalize(a)) : s && (a.shapeFlag |= ne(s) ? 8 : 16), Qt > 0 && !l && Oe && (a.patchFlag > 0 || i & 6) && a.patchFlag !== 32 && Oe.push(a), a;
}
var de = Ao;
function Ao(e, t = null, s = null, r = 0, n = null, i = !1) {
  if ((!e || e === vi) && (e = we), Cs(e)) {
    const o = ft(e, t, !0);
    return s && Mr(o, s), Qt > 0 && !i && Oe && (o.shapeFlag & 6 ? Oe[Oe.indexOf(e)] = o : Oe.push(o)), o.patchFlag = -2, o;
  }
  if (Lo(e) && (e = e.__vccOpts), t) {
    t = To(t);
    let { class: o, style: a } = t;
    o && !ne(o) && (t.class = ct(o)), J(a) && (/* @__PURE__ */ Ar(a) && !R(a) && (a = oe({}, a)), t.style = Ps(a));
  }
  const l = ne(e) ? 1 : Mi(e) ? 128 : ii(e) ? 64 : J(e) ? 4 : U(e) ? 2 : 0;
  return v(e, t, s, r, n, l, i, !0);
}
function To(e) {
  return e ? /* @__PURE__ */ Ar(e) || wi(e) ? oe({}, e) : e : null;
}
function ft(e, t, s = !1, r = !1) {
  const { props: n, ref: i, patchFlag: l, children: o, transition: a } = e, c = t ? Io(n || {}, t) : n, u = {
    __v_isVNode: !0,
    __v_skip: !0,
    type: e.type,
    props: c,
    key: c && Pi(c),
    ref: t && t.ref ? s && i ? R(i) ? i.concat(gs(t)) : [i, gs(t)] : gs(t) : i,
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
  return a && r && Zt(u, a.clone(u)), u;
}
function ke(e = " ", t = 0) {
  return de(Vs, null, e, t);
}
function ve(e = "", t = !1) {
  return t ? (L(), wt(we, null, e)) : de(we, null, e);
}
function Ue(e) {
  return e == null || typeof e == "boolean" ? de(we) : R(e) ? de(pe, null, e.slice()) : Cs(e) ? Ye(e) : de(Vs, null, String(e));
}
function Ye(e) {
  return e.el === null && e.patchFlag !== -1 || e.memo ? e : ft(e);
}
function Mr(e, t) {
  let s = 0;
  const { shapeFlag: r } = e;
  if (t == null) t = null;
  else if (R(t)) s = 16;
  else if (typeof t == "object") if (r & 65) {
    const n = t.default;
    n && (n._c && (n._d = !1), Mr(e, n()), n._c && (n._d = !0));
    return;
  } else {
    s = 32;
    const n = t._;
    !n && !wi(t) ? t._ctx = Ee : n === 3 && Ee && (Ee.slots._ === 1 ? t._ = 1 : (t._ = 2, e.patchFlag |= 1024));
  }
  else U(t) ? (t = {
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
      l && i !== l && !(R(i) && i.includes(l)) ? t[n] = i ? [].concat(i, l) : l : l == null && i == null && !Es(n) && (t[n] = l);
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
}, Qr = () => {
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
      if (l.then(Qr, Qr), t) return l.then((a) => {
        en(e, a, t);
      }).catch((a) => {
        Ds(a, e, 0);
      });
      e.asyncDep = l;
    } else en(e, l, t);
  } else Li(e, t);
}
function en(e, t, s) {
  U(t) ? e.type.__ssrInlineRender ? e.ssrRender = t : e.render = t : J(t) && (e.setupState = Jn(t)), Li(e, s);
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
      Zl(e);
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
  return U(e) ? e.displayName || e.name : e.name || t && e.__name;
}
function Lo(e) {
  return U(e) && "__vccOpts" in e;
}
var nt = (e, t) => /* @__PURE__ */ Al(e, t, es);
function Ho(e, t, s) {
  try {
    ws(-1);
    const r = arguments.length;
    return r === 2 ? J(t) && !R(t) ? Cs(t) ? de(e, null, [t]) : de(e, t) : de(e, null, t) : (r > 3 ? s = Array.prototype.slice.call(arguments, 2) : r === 3 && Cs(s) && (s = [s]), de(e, t, s));
  } finally {
    ws(1);
  }
}
var Ro = "3.5.35", vr = void 0, rn = typeof window < "u" && window.trustedTypes;
if (rn) try {
  vr = /* @__PURE__ */ rn.createPolicy("vue", { createHTML: (e) => e });
} catch {
}
var Hi = vr ? (e) => vr.createHTML(e) : (e) => e, No = "http://www.w3.org/2000/svg", Vo = "http://www.w3.org/1998/Math/MathML", Je = typeof document < "u" ? document : null, nn = Je && /* @__PURE__ */ Je.createElement("template"), Bo = {
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
      nn.innerHTML = Hi(r === "svg" ? `<svg>${e}</svg>` : r === "mathml" ? `<math>${e}</math>` : e);
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
}, at = "transition", Rt = "animation", ts = /* @__PURE__ */ Symbol("_vtc"), Ri = {
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
}, jo = /* @__PURE__ */ oe({}, li, Ri), Uo = (e) => (e.displayName = "Transition", e.props = jo, e), Wo = /* @__PURE__ */ Uo((e, { slots: t }) => Ho(Rl, Ko(e), t)), pt = (e, t = []) => {
  R(e) ? e.forEach((s) => s(...t)) : e && e(...t);
}, ln = (e) => e ? R(e) ? e.some((t) => t.length > 1) : e.length > 1 : !1;
function Ko(e) {
  const t = {};
  for (const k in e) k in Ri || (t[k] = e[k]);
  if (e.css === !1) return t;
  const { name: s = "v", type: r, duration: n, enterFromClass: i = `${s}-enter-from`, enterActiveClass: l = `${s}-enter-active`, enterToClass: o = `${s}-enter-to`, appearFromClass: a = i, appearActiveClass: c = l, appearToClass: u = o, leaveFromClass: h = `${s}-leave-from`, leaveActiveClass: m = `${s}-leave-active`, leaveToClass: w = `${s}-leave-to` } = e, N = qo(n), E = N && N[0], q = N && N[1], { onBeforeEnter: W, onEnter: V, onEnterCancelled: K, onLeave: g, onLeaveCancelled: S, onBeforeAppear: M = W, onAppear: D = V, onAppearCancelled: $ = K } = t, b = (k, re, ge, Ge) => {
    k._enterCancelled = Ge, vt(k, re ? u : o), vt(k, re ? c : l), ge && ge();
  }, F = (k, re) => {
    k._isLeaving = !1, vt(k, h), vt(k, w), vt(k, m), re && re();
  }, Y = (k) => (re, ge) => {
    const Ge = k ? D : V, ce = () => b(re, k, ge);
    pt(Ge, [re, ce]), on(() => {
      vt(re, k ? a : i), ze(re, k ? u : o), ln(Ge) || an(re, r, E, ce);
    });
  };
  return oe(t, {
    onBeforeEnter(k) {
      pt(W, [k]), ze(k, i), ze(k, l);
    },
    onBeforeAppear(k) {
      pt(M, [k]), ze(k, a), ze(k, c);
    },
    onEnter: Y(!1),
    onAppear: Y(!0),
    onLeave(k, re) {
      k._isLeaving = !0;
      const ge = () => F(k, re);
      ze(k, h), k._enterCancelled ? (ze(k, m), cn(k)) : (cn(k), ze(k, m)), on(() => {
        k._isLeaving && (vt(k, h), ze(k, w), ln(g) || an(k, r, q, ge));
      }), pt(g, [k, ge]);
    },
    onEnterCancelled(k) {
      b(k, !1, void 0, !0), pt(K, [k]);
    },
    onAppearCancelled(k) {
      b(k, !0, void 0, !0), pt($, [k]);
    },
    onLeaveCancelled(k) {
      F(k), pt(S, [k]);
    }
  });
}
function qo(e) {
  if (e == null) return null;
  if (J(e)) return [tr(e.enter), tr(e.leave)];
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
    e.removeEventListener(c, m), i();
  }, m = (w) => {
    w.target === e && ++u >= a && h();
  };
  setTimeout(() => {
    u < a && h();
  }, o + 1), e.addEventListener(c, m);
}
function Xo(e, t) {
  const s = window.getComputedStyle(e), r = (N) => (s[N] || "").split(", "), n = r(`${at}Delay`), i = r(`${at}Duration`), l = un(n, i), o = r(`${Rt}Delay`), a = r(`${Rt}Duration`), c = un(o, a);
  let u = null, h = 0, m = 0;
  t === at ? l > 0 && (u = at, h = l, m = i.length) : t === Rt ? c > 0 && (u = Rt, h = c, m = a.length) : (h = Math.max(l, c), u = h > 0 ? l > c ? at : Rt : null, m = u ? u === at ? i.length : a.length : 0);
  const w = u === at && /\b(?:transform|all)(?:,|$)/.test(r(`${at}Property`).toString());
  return {
    type: u,
    timeout: h,
    propCount: m,
    hasTransform: w
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
var dn = /* @__PURE__ */ Symbol("_vod"), Jo = /* @__PURE__ */ Symbol("_vsh"), Yo = /* @__PURE__ */ Symbol(""), Zo = /(?:^|;)\s*display\s*:/;
function Qo(e, t, s) {
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
      l && (s += ";" + l), r.cssText = s, i = Zo.test(s);
    }
  } else t && e.removeAttribute("style");
  dn in e && (e[dn] = i ? r.display : "", e[Jo] && (r.display = "none"));
}
var hn = /\s*!important$/;
function Bt(e, t, s) {
  if (R(s)) s.forEach((r) => Bt(e, t, r));
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
function gn(e, t, s, r, n, i = Zi(t)) {
  r && t.startsWith("xlink:") ? s == null ? e.removeAttributeNS(vn, t.slice(6, t.length)) : e.setAttributeNS(vn, t, s) : s == null || i && !Mn(s) ? e.removeAttribute(t) : e.setAttribute(t, i ? "" : qe(s) ? String(s) : s);
}
function mn(e, t, s, r, n) {
  if (t === "innerHTML" || t === "textContent") {
    s != null && (e[t] = t === "innerHTML" ? Hi(s) : s);
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
    if (R(n)) {
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
  t === "class" ? zo(e, r, l) : t === "style" ? Qo(e, s, r) : Is(t) ? Es(t) || ra(e, t, s, r, i) : (t[0] === "." ? (t = t.slice(1), !0) : t[0] === "^" ? (t = t.slice(1), !1) : ua(e, t, r, l)) ? (mn(e, t, r), !e.tagName.includes("-") && (t === "value" || t === "checked" || t === "selected") && gn(e, t, r, l, i, t !== "value")) : e._isVueCE && (fa(e, t) || e._def.__asyncLoader && (/[A-Z]/.test(t) || !ne(r))) ? mn(e, Ce(t), r, i, t) : (t === "true-value" ? e._trueValue = r : t === "false-value" && (e._falseValue = r), gn(e, t, r, l));
};
function ua(e, t, s, r) {
  if (r)
    return !!(t === "innerHTML" || t === "textContent" || t in e && _n(t) && U(s));
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
  return R(t) ? (s) => ps(t, s) : t;
};
function ca(e) {
  e.target.composing = !0;
}
function xn(e) {
  const t = e.target;
  t.composing && (t.composing = !1, t.dispatchEvent(new Event("input")));
}
var kt = /* @__PURE__ */ Symbol("_assign");
function wn(e, t, s) {
  return t && (e = e.trim()), s && (e = br(e)), e;
}
var et = {
  created(e, { modifiers: { lazy: t, trim: s, number: r } }, n) {
    e[kt] = As(n);
    const i = r || n.props && n.props.type === "number";
    bt(e, t ? "change" : "input", (l) => {
      l.target.composing || e[kt](wn(e.value, s, i));
    }), (s || i) && bt(e, "change", () => {
      e.value = wn(e.value, s, i);
    }), t || (bt(e, "compositionstart", ca), bt(e, "compositionend", xn), bt(e, "change", xn));
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
      if (R(r)) {
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
  if (R(t)) n = kn(t, r.props.value) > -1;
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
    !U(i) && !i.render && !i.template && (i.template = n.innerHTML), n.nodeType === 1 && (n.textContent = "");
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
var _a = ["src"], xa = {
  key: 1,
  class: "fourth-wall-avatar is-placeholder",
  "aria-hidden": "true"
}, wa = { class: "fourth-wall-message-stack" }, Ca = {
  key: 0,
  class: "fourth-wall-thinking"
}, Sa = { class: "fourth-wall-bubble" }, Aa = {
  key: 0,
  class: "fourth-wall-message-text"
}, Ta = {
  key: 1,
  class: "fourth-wall-image-card"
}, Ia = ["src", "alt"], Ea = ["onClick"], Oa = { key: 2 }, $a = { key: 3 }, Ma = ["onClick"], ka = { "aria-hidden": "true" }, Pa = { key: 0 }, Fa = { class: "fourth-wall-message-actions" }, Da = { key: 1 }, La = /* @__PURE__ */ Re({
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
    const s = e, r = t, n = /* @__PURE__ */ ue(!1), i = /* @__PURE__ */ ue(""), l = /* @__PURE__ */ xt({}), o = /* @__PURE__ */ new Set();
    let a = () => {
    };
    function c(g) {
      const S = /\[(?:img|图片)\s*:\s*([^\]]+)\]|\[(?:voice|语音)\s*:([^:\]]*):([^\]]+)\]|\[(?:voice|语音)\s*:\s*([^\]]+)\]/gi, M = [];
      let D = 0, $;
      for (; ($ = S.exec(g)) !== null; )
        $.index > D && M.push({
          kind: "text",
          raw: g.slice(D, $.index),
          value: g.slice(D, $.index)
        }), $[1] !== void 0 ? M.push({
          kind: "image",
          raw: $[0],
          value: $[1].trim()
        }) : M.push({
          kind: "voice",
          raw: $[0],
          value: String($[3] ?? $[4] ?? "").trim(),
          emotion: String($[2] || "").trim().toLowerCase()
        }), D = S.lastIndex;
      return D < g.length && M.push({
        kind: "text",
        raw: g.slice(D),
        value: g.slice(D)
      }), M.length ? M : [{
        kind: "text",
        raw: g,
        value: g
      }];
    }
    const u = nt(() => c(s.message.content)), h = nt(() => s.message.ts ? new Intl.DateTimeFormat("zh-CN", {
      hour: "2-digit",
      minute: "2-digit"
    }).format(s.message.ts) : "");
    function m(g, S) {
      return `fw-${g}-${Date.now()}-${s.messageIndex}-${S}-${Math.random().toString(36).slice(2, 7)}`;
    }
    function w(g) {
      return g.result;
    }
    async function N(g, S) {
      if (l[S]?.status === "loading" || l[S]?.status === "ready") return;
      if (!s.imageAvailable) {
        l[S] = {
          status: "unavailable",
          message: "画图能力未启用"
        };
        return;
      }
      const M = m("image", S);
      o.add(M), l[S] = {
        status: "loading",
        message: "查询图片缓存",
        requestId: M
      };
      const D = {
        chatIdentity: s.chatIdentity,
        sessionId: s.sessionId
      };
      try {
        const $ = w(await s.bridge.request("fourth-wall/image-check", {
          ...D,
          tags: g.value,
          mediaRequestId: M
        }, 3e4));
        if (!$.available) {
          l[S] = {
            status: "unavailable",
            message: "画图能力未启用"
          };
          return;
        }
        let b = $.cached || "";
        b || (l[S] = {
          status: "loading",
          message: "正在生成图片",
          requestId: M
        }, b = w(await s.bridge.request("fourth-wall/image-generate", {
          ...D,
          tags: g.value,
          mediaRequestId: M
        }, 18e4)).base64), l[S] = {
          status: "ready",
          source: /^(?:data:|blob:|https?:)/i.test(b) ? b : `data:image/png;base64,${b}`
        };
      } catch ($) {
        l[S] = {
          status: "error",
          message: $ instanceof Error ? $.message : String($)
        };
      } finally {
        o.delete(M);
      }
    }
    async function E(g, S) {
      if (!s.voiceAvailable) {
        l[S] = {
          status: "unavailable",
          message: "TTS 能力未启用"
        };
        return;
      }
      const M = l[S];
      if (M?.status === "playing" && M.requestId) {
        s.bridge.post("fourth-wall/voice-stop", {
          chatIdentity: s.chatIdentity,
          mediaRequestId: M.requestId
        }), l[S] = { status: "idle" };
        return;
      }
      const D = m("voice", S);
      o.add(D), l[S] = {
        status: "loading",
        message: "正在准备语音",
        requestId: D
      };
      try {
        await s.bridge.request("fourth-wall/voice-play", {
          chatIdentity: s.chatIdentity,
          sessionId: s.sessionId,
          mediaRequestId: D,
          text: g.value,
          emotion: g.emotion
        });
      } catch ($) {
        o.delete(D), l[S] = {
          status: "error",
          message: $ instanceof Error ? $.message : String($)
        };
      }
    }
    function q() {
      i.value = s.message.content, n.value = !0;
    }
    function W() {
      const g = i.value.trim();
      g && (r("edit", s.messageIndex, g), n.value = !1);
    }
    function V() {
      o.forEach((g) => {
        s.bridge.post("fourth-wall/image-cancel", {
          chatIdentity: s.chatIdentity,
          mediaRequestId: g
        }), s.bridge.post("fourth-wall/voice-stop", {
          chatIdentity: s.chatIdentity,
          mediaRequestId: g
        });
      }), o.clear();
    }
    function K() {
      u.value.forEach((g, S) => {
        g.kind === "image" && N(g, S);
      });
    }
    return is(() => {
      a = s.bridge.subscribe((g) => {
        if (g.type === "fourth-wall/image-progress") {
          const S = g.payload, M = Object.keys(l).map(Number).find((D) => l[D]?.requestId === S.mediaRequestId);
          M !== void 0 && (l[M].message = S.status === "queued" ? `图片队列第 ${S.position || 1} 位` : "正在生成图片");
        }
        if (g.type === "fourth-wall/voice-state") {
          const S = g.payload, M = Object.keys(l).map(Number).find((D) => l[D]?.requestId === S.requestId);
          if (M === void 0) return;
          S.state === "playing" && (l[M].status = "playing"), (S.state === "ended" || S.state === "stopped") && (o.delete(String(S.requestId || "")), l[M] = { status: "idle" }), S.state === "error" && (o.delete(String(S.requestId || "")), l[M] = {
            status: "error",
            message: S.message || "语音播放失败"
          });
        }
      }), K();
    }), $t(() => s.message.content, () => {
      V(), Object.keys(l).forEach((g) => delete l[Number(g)]), K();
    }), ls(() => {
      a(), V();
    }), (g, S) => (L(), j("article", { class: ct(["fourth-wall-message", e.message.role === "user" ? "is-user" : "is-ai"]) }, [(e.message.role === "user" ? e.userAvatar : e.characterAvatar) ? (L(), j("img", {
      key: 0,
      class: "fourth-wall-avatar",
      src: e.message.role === "user" ? e.userAvatar : e.characterAvatar,
      alt: ""
    }, null, 8, _a)) : (L(), j("span", xa)), v("div", wa, [
      e.message.thinking ? (L(), j("details", Ca, [S[3] || (S[3] = v("summary", null, "思考过程", -1)), v("div", null, le(e.message.thinking), 1)])) : ve("", !0),
      v("div", Sa, [n.value ? Ae((L(), j("textarea", {
        key: 0,
        "onUpdate:modelValue": S[0] || (S[0] = (M) => i.value = M),
        class: "fourth-wall-edit",
        rows: "3"
      }, null, 512)), [[et, i.value]]) : (L(!0), j(pe, { key: 1 }, Rs(u.value, (M, D) => (L(), j(pe, { key: `${M.kind}-${D}` }, [M.kind === "text" ? (L(), j("span", Aa, le(M.value), 1)) : M.kind === "image" ? (L(), j("figure", Ta, [l[D]?.status === "ready" ? (L(), j("img", {
        key: 0,
        src: l[D].source,
        alt: M.value
      }, null, 8, Ia)) : l[D]?.status === "error" ? (L(), j("button", {
        key: 1,
        type: "button",
        onClick: ($) => N(M, D)
      }, [ke(le(M.raw), 1), v("small", null, le(l[D].message) + "，点此重试", 1)], 8, Ea)) : l[D]?.status === "unavailable" ? (L(), j("div", Oa, [ke(le(M.raw), 1), v("small", null, le(l[D].message), 1)])) : (L(), j("div", $a, [ke(le(M.raw), 1), v("small", null, le(l[D]?.message || "准备图片"), 1)]))])) : (L(), j("button", {
        key: 2,
        class: "fourth-wall-voice",
        type: "button",
        onClick: ($) => E(M, D)
      }, [
        v("span", ka, le(l[D]?.status === "playing" ? "■" : "▶"), 1),
        v("span", null, le(M.value), 1),
        l[D]?.message ? (L(), j("small", Pa, le(l[D].message), 1)) : ve("", !0)
      ], 8, Ma))], 64))), 128)), v("div", Fa, [n.value ? (L(), j(pe, { key: 0 }, [v("button", {
        type: "button",
        onClick: W
      }, "保存"), v("button", {
        type: "button",
        onClick: S[1] || (S[1] = (M) => n.value = !1)
      }, "取消")], 64)) : (L(), j(pe, { key: 1 }, [v("button", {
        type: "button",
        onClick: q
      }, "编辑"), v("button", {
        type: "button",
        onClick: S[2] || (S[2] = (M) => r("delete", e.messageIndex))
      }, "删除")], 64))])]),
      h.value ? (L(), j("time", Da, le(h.value), 1)) : ve("", !0)
    ])], 2));
  }
}), Ha = La, Ra = {
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
}, qa = /* @__PURE__ */ Re({
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
    }, { immediate: !0 }), (o, a) => (L(), j("section", {
      ref_key: "viewport",
      ref: s,
      class: "fourth-wall-conversation",
      "aria-live": "polite"
    }, [
      n.value > 0 ? (L(), j("button", {
        key: 0,
        type: "button",
        class: "fourth-wall-earlier",
        onClick: l
      }, " 显示更早的 " + le(n.value) + " 条记录 ", 1)) : ve("", !0),
      e.history.length === 0 && e.generation.status === "idle" ? (L(), j("div", Ra, [...a[2] || (a[2] = [
        v("span", null, "IV", -1),
        v("strong", null, "越过故事边界", -1),
        v("p", null, "这里是你与角色扮演者的皮下私聊。", -1)
      ])])) : ve("", !0),
      (L(!0), j(pe, null, Rs(i.value, (c, u) => (L(), wt(Ha, {
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
        onEdit: a[0] || (a[0] = (h, m) => o.$emit("edit", h, m)),
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
      e.generation.status !== "idle" ? (L(), j("article", Na, [e.characterAvatar ? (L(), j("img", {
        key: 0,
        class: "fourth-wall-avatar",
        src: e.characterAvatar,
        alt: ""
      }, null, 8, Va)) : (L(), j("span", Ba)), v("div", ja, [e.generation.thinking ? (L(), j("details", Ua, [a[3] || (a[3] = v("summary", null, "思考中", -1)), v("div", null, le(e.generation.thinking), 1)])) : ve("", !0), v("div", Wa, [ke(le(e.generation.text || (e.generation.status === "error" ? e.generation.message : "等待回应...")) + " ", 1), e.generation.unsaved ? (L(), j("small", Ka, "未保存")) : ve("", !0)])])])) : ve("", !0)
    ], 512));
  }
}), Ga = qa, Xa = {
  class: "fourth-wall-modal",
  role: "dialog",
  "aria-modal": "true",
  "aria-label": "四次元壁提示词"
}, za = { class: "fourth-wall-prompt-fields" }, Ja = /* @__PURE__ */ Re({
  __name: "FourthWallPromptEditor",
  props: { templates: {} },
  emits: [
    "close",
    "save",
    "restore"
  ],
  setup(e, { emit: t }) {
    const s = e, r = t, n = /* @__PURE__ */ xt(structuredClone(s.templates));
    function i() {
      r("save", structuredClone(n));
    }
    return (l, o) => (L(), j("div", {
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
}), Ya = Ja, Za = { class: "fourth-wall-settings-section" }, Qa = { class: "fourth-wall-session-row" }, eu = ["value", "disabled"], tu = ["value"], su = ["disabled"], ru = ["disabled"], nu = ["disabled"], iu = /* @__PURE__ */ Re({
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
    return (l, o) => (L(), j("section", Za, [o[3] || (o[3] = v("h3", null, "聊天记录", -1)), v("div", Qa, [
      v("select", {
        value: e.activeSessionId,
        disabled: e.disabled,
        onChange: o[0] || (o[0] = (a) => s("switch", a.target.value))
      }, [(L(!0), j(pe, null, Rs(e.sessions, (a) => (L(), j("option", {
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
}, au = { class: "fourth-wall-settings-scroll" }, uu = { class: "fourth-wall-settings-section" }, fu = { class: "is-toggle" }, cu = { class: "is-toggle" }, du = ["disabled"], hu = { class: "fourth-wall-settings-section" }, pu = { class: "is-toggle" }, vu = { class: "is-toggle" }, gu = { class: "is-toggle" }, mu = { key: 0 }, bu = ["disabled"], yu = { class: "fourth-wall-settings-section is-actions" }, _u = /* @__PURE__ */ Re({
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
    const s = e, r = t, n = /* @__PURE__ */ xt(structuredClone(s.chat.settings)), i = /* @__PURE__ */ xt(structuredClone(s.global));
    function l() {
      r("updateChat", structuredClone(n));
    }
    function o() {
      r("updateGlobal", {
        image: structuredClone(i.image),
        voice: structuredClone(i.voice),
        commentary: structuredClone(i.commentary)
      });
    }
    return (a, c) => (L(), j("aside", ou, [v("header", null, [c[15] || (c[15] = v("strong", null, "四次元壁设置", -1)), v("button", {
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
        i.commentary.enabled ? (L(), j("label", mu, [ke(" 吐槽概率 " + le(i.commentary.probability) + "% ", 1), Ae(v("input", {
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
}), xu = _u, wu = { class: "fourth-wall-app" }, Cu = { class: "fourth-wall-header" }, Su = { class: "fourth-wall-heading" }, Au = { class: "fourth-wall-header-actions" }, Tu = ["disabled"], Iu = ["disabled"], Eu = {
  key: 0,
  class: "fourth-wall-error",
  role: "alert"
}, Ou = { class: "fourth-wall-composer" }, $u = ["disabled"], Mu = ["disabled"], ku = /* @__PURE__ */ Re({
  __name: "FourthWallApp",
  props: {
    bridge: {},
    initialState: {}
  },
  setup(e) {
    const t = e, s = /* @__PURE__ */ ue(structuredClone(t.initialState)), r = /* @__PURE__ */ ue(""), n = /* @__PURE__ */ ue(!1), i = /* @__PURE__ */ ue(!1), l = /* @__PURE__ */ ue(!1), o = /* @__PURE__ */ ue(""), a = /* @__PURE__ */ ue(!1), c = /* @__PURE__ */ ue({
      status: "idle",
      sessionId: "",
      text: "",
      thinking: "",
      message: "",
      unsaved: !1
    });
    let u = () => {
    };
    const h = nt(() => s.value.chat.sessions.find(($) => $.id === s.value.chat.activeSessionId)), m = nt(() => c.value.status === "started" || c.value.status === "progress");
    function w($ = h.value.id) {
      return {
        chatIdentity: s.value.chatIdentity,
        sessionId: $
      };
    }
    function N($) {
      return structuredClone($.result);
    }
    async function E($, b) {
      l.value = !0, o.value = "";
      try {
        s.value = N(await t.bridge.request($, b));
      } catch (F) {
        o.value = F instanceof Error ? F.message : String(F);
      } finally {
        l.value = !1;
      }
    }
    async function q() {
      const $ = r.value.trim();
      !$ || m.value || l.value || (r.value = "", c.value = {
        status: "started",
        sessionId: h.value.id,
        text: "",
        thinking: "",
        message: "",
        unsaved: !1
      }, await E("fourth-wall/send", {
        ...w(),
        content: $
      }), o.value && (c.value.status = "idle"));
    }
    async function W() {
      m.value || l.value || (c.value = {
        status: "started",
        sessionId: h.value.id,
        text: "",
        thinking: "",
        message: "",
        unsaved: !1
      }, await E("fourth-wall/regenerate", w()), o.value && (c.value.status = "idle"));
    }
    function V() {
      t.bridge.post("fourth-wall/cancel", w());
    }
    function K($) {
      $.key !== "Enter" || $.shiftKey || a.value || ($.preventDefault(), m.value ? V() : q());
    }
    function g($) {
      window.confirm("确定删除这条消息吗？") && E("fourth-wall/delete-message", {
        ...w(),
        messageIndex: $
      });
    }
    function S() {
      window.confirm("确定清空当前记录吗？") && E("fourth-wall/clear-history", w());
    }
    function M($) {
      E("fourth-wall/update-chat-settings", {
        ...w(),
        patch: $
      });
    }
    function D($) {
      E("fourth-wall/update-global-settings", {
        ...w(),
        patch: $
      });
    }
    return is(() => {
      u = t.bridge.subscribe(($) => {
        if ($.type === "fourth-wall/state" && (s.value = structuredClone($.payload.state)), $.type !== "fourth-wall/generation") return;
        const b = $.payload;
        if (!(b.sessionId && b.sessionId !== h.value.id)) {
          if (b.status === "complete" || b.status === "cancelled") {
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
          if (b.status === "error") {
            c.value = {
              status: "error",
              sessionId: b.sessionId || h.value.id,
              text: b.draft?.text || b.text || "",
              thinking: b.draft?.thinking || b.thinking || "",
              message: b.message || "生成失败",
              unsaved: b.kind === "save"
            }, o.value = b.message || "生成失败";
            return;
          }
          c.value = {
            status: b.status || "progress",
            sessionId: b.sessionId || h.value.id,
            text: b.text || c.value.text,
            thinking: b.thinking || c.value.thinking,
            message: "",
            unsaved: !1
          };
        }
      });
    }), ls(() => u()), ($, b) => (L(), j("main", wu, [
      v("header", Cu, [v("div", Su, [b[18] || (b[18] = v("span", null, "IV", -1)), v("div", null, [b[17] || (b[17] = v("strong", null, "四次元壁", -1)), v("small", null, le(h.value.name), 1)])]), v("div", Au, [
        v("button", {
          type: "button",
          title: "重答",
          disabled: l.value || m.value,
          onClick: W
        }, "↻", 8, Tu),
        v("button", {
          type: "button",
          title: "清空当前记录",
          disabled: l.value,
          onClick: S
        }, "⌫", 8, Iu),
        v("button", {
          type: "button",
          title: "设置",
          onClick: b[0] || (b[0] = (F) => n.value = !0)
        }, "⚙")
      ])]),
      o.value ? (L(), j("div", Eu, [v("span", null, le(o.value), 1), v("button", {
        type: "button",
        onClick: b[1] || (b[1] = (F) => o.value = "")
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
        onEdit: b[2] || (b[2] = (F, Y) => E("fourth-wall/edit-message", {
          ...w(),
          messageIndex: F,
          content: Y
        })),
        onDelete: g
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
        "onUpdate:modelValue": b[3] || (b[3] = (F) => r.value = F),
        rows: "1",
        placeholder: "聊点什么...",
        disabled: l.value,
        onCompositionstart: b[4] || (b[4] = (F) => a.value = !0),
        onCompositionend: b[5] || (b[5] = (F) => a.value = !1),
        onKeydown: K
      }, null, 40, $u), [[et, r.value]]), v("button", {
        type: "button",
        class: ct({ "is-stop": m.value }),
        disabled: l.value,
        onClick: b[6] || (b[6] = (F) => m.value ? V() : q())
      }, le(m.value ? "■" : "↑"), 11, Mu)]),
      n.value ? (L(), wt(xu, {
        key: 1,
        chat: s.value.chat,
        global: s.value.global,
        busy: l.value || m.value,
        onClose: b[7] || (b[7] = (F) => n.value = !1),
        onUpdateChat: M,
        onUpdateGlobal: D,
        onSwitchSession: b[8] || (b[8] = (F) => E("fourth-wall/switch-session", {
          ...w(),
          targetSessionId: F
        })),
        onAddSession: b[9] || (b[9] = (F) => E("fourth-wall/add-session", {
          ...w(),
          name: F
        })),
        onRenameSession: b[10] || (b[10] = (F, Y) => E("fourth-wall/rename-session", {
          ...w(F),
          name: Y
        })),
        onDeleteSession: b[11] || (b[11] = (F) => E("fourth-wall/delete-session", w(F))),
        onOpenPrompts: b[12] || (b[12] = (F) => i.value = !0),
        onOpenAgent: b[13] || (b[13] = (F) => t.bridge.request("fourth-wall/open-agent-settings", w()))
      }, null, 8, [
        "chat",
        "global",
        "busy"
      ])) : ve("", !0),
      i.value ? (L(), wt(Ya, {
        key: 2,
        templates: s.value.global.promptTemplates,
        onClose: b[14] || (b[14] = (F) => i.value = !1),
        onSave: b[15] || (b[15] = (F) => {
          D({ promptTemplates: F }), i.value = !1;
        }),
        onRestore: b[16] || (b[16] = () => {
          E("fourth-wall/restore-prompts", w()), i.value = !1;
        })
      }, null, 8, ["templates"])) : ve("", !0)
    ]));
  }
}), Pu = ku, Fu = Object.freeze([{
  id: "fourth-wall",
  name: "四次元壁",
  accent: "#7567d8",
  component: Pu
}]), Du = { class: "xiaobai-os-home" }, Lu = ["src"], Hu = {
  class: "xiaobai-os-app-grid",
  "aria-label": "应用"
}, Ru = ["onClick"], Nu = { class: "xiaobai-os-app-name" }, Vu = /* @__PURE__ */ Re({
  __name: "XiaobaiOsHome",
  props: {
    apps: {},
    characterAvatar: {}
  },
  emits: ["openApp"],
  setup(e) {
    return (t, s) => (L(), j("main", Du, [
      e.characterAvatar ? (L(), j("img", {
        key: 0,
        class: "xiaobai-os-wallpaper",
        src: e.characterAvatar,
        alt: ""
      }, null, 8, Lu)) : ve("", !0),
      s[1] || (s[1] = v("div", {
        class: "xiaobai-os-home-wash",
        "aria-hidden": "true"
      }, null, -1)),
      v("section", Hu, [(L(!0), j(pe, null, Rs(e.apps, (r) => (L(), j("button", {
        key: r.id,
        type: "button",
        class: "xiaobai-os-app-tile",
        style: Ps({ "--app-accent": r.accent }),
        onClick: (n) => t.$emit("openApp", r)
      }, [s[0] || (s[0] = v("span", {
        class: "xiaobai-os-app-icon",
        "aria-hidden": "true"
      }, [v("svg", { viewBox: "0 0 64 64" }, [v("path", { d: "M13 15h38v29H32l-12 9 3-9H13z" }), v("path", { d: "M22 25h20M22 33h14" })])], -1)), v("span", Nu, le(r.name), 1)], 12, Ru))), 128))])
    ]));
  }
}), Bu = Vu, ju = ["disabled"], Uu = {
  key: 0,
  "aria-hidden": "true"
}, Wu = /* @__PURE__ */ Re({
  __name: "XiaobaiOsNavigation",
  props: { isHome: { type: Boolean } },
  emits: [
    "back",
    "home",
    "close"
  ],
  setup(e) {
    return (t, s) => (L(), j("nav", {
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
      }, [v("path", { d: "m14.5 6-6 6 6 6" })], -1)])], 8, ju),
      v("button", {
        type: "button",
        class: "xiaobai-os-nav-button xiaobai-os-home-button",
        "aria-label": "主页",
        onClick: s[1] || (s[1] = (r) => t.$emit("home"))
      }, [s[4] || (s[4] = v("svg", {
        viewBox: "0 0 24 24",
        "aria-hidden": "true"
      }, [v("path", { d: "m4.5 11 7.5-6 7.5 6v8h-5v-5h-5v5h-5z" })], -1)), e.isHome ? (L(), j("i", Uu)) : ve("", !0)]),
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
}), Ku = Wu, qu = /* @__PURE__ */ Re({
  __name: "XiaobaiOsSystemBar",
  props: { isHome: { type: Boolean } },
  setup(e) {
    return (t, s) => (L(), j("header", {
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
}), Gu = qu, Xu = { class: "xiaobai-os-device" }, zu = { class: "xiaobai-os-glass" }, Ju = { class: "xiaobai-os-stage" }, Yu = /* @__PURE__ */ Re({
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
    return (t, s) => (L(), j("div", Xu, [s[4] || (s[4] = v("span", {
      class: "xiaobai-os-side-key",
      "aria-hidden": "true"
    }, null, -1)), v("div", zu, [
      de(Gu, { "is-home": e.isHome }, null, 8, ["is-home"]),
      v("div", Ju, [de(Wo, {
        name: "xiaobai-os-route",
        mode: "out-in"
      }, {
        default: si(() => [e.isHome ? (L(), wt(Bu, {
          key: "home",
          apps: e.apps,
          "character-avatar": e.characterAvatar,
          onOpenApp: s[0] || (s[0] = (r) => t.$emit("openApp", r))
        }, null, 8, ["apps", "character-avatar"])) : e.activeComponent ? (L(), wt(zl(e.activeComponent), {
          key: "app",
          bridge: e.bridge,
          "initial-state": e.activeState
        }, null, 8, ["bridge", "initial-state"])) : ve("", !0)]),
        _: 1
      })]),
      de(Ku, {
        "is-home": e.isHome,
        onBack: s[1] || (s[1] = (r) => t.$emit("back")),
        onHome: s[2] || (s[2] = (r) => t.$emit("home")),
        onClose: s[3] || (s[3] = (r) => t.$emit("close"))
      }, null, 8, ["is-home"])
    ])]));
  }
}), Zu = Yu, Qu = "LittleWhiteBox-XiaobaiOS";
function ef() {
  return `xiaobai-os-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
}
function tf() {
  const e = /* @__PURE__ */ new Map(), t = /* @__PURE__ */ new Set();
  let s = !1;
  function r(u, h = {}, m = "") {
    parent.postMessage({
      source: Qu,
      type: u,
      requestId: m,
      payload: h
    }, window.location.origin);
  }
  function n(u) {
    const h = String(u.requestId || "");
    if (!h) return !1;
    const m = e.get(h);
    if (!m) return !1;
    e.delete(h), clearTimeout(m.timer);
    const w = u.payload;
    return w?.ok === !1 ? m.reject(new Error(w.error || "host_request_failed")) : m.resolve(w), !0;
  }
  function i(u) {
    u.origin !== window.location.origin || u.source !== parent || u.data?.source !== "LittleWhiteBox-XiaobaiOS" || typeof u.data.type != "string" || n(u.data) || t.forEach((h) => h(u.data));
  }
  function l() {
    s || (s = !0, window.addEventListener("message", i), r("os/frame-ready"));
  }
  function o(u, h = {}, m = 15e3) {
    const w = ef();
    return new Promise((N, E) => {
      const q = setTimeout(() => {
        e.delete(w), E(/* @__PURE__ */ new Error("host_request_timeout"));
      }, m);
      e.set(w, {
        resolve: N,
        reject: E,
        timer: q
      }), r(u, h, w);
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
var sf = {
  key: 0,
  class: "xiaobai-os-error",
  role: "alert"
}, rf = {
  key: 1,
  class: "xiaobai-os-loading",
  role: "status"
}, nf = /* @__PURE__ */ Re({
  __name: "App",
  setup(e) {
    const t = tf(), s = /* @__PURE__ */ ue(null), r = /* @__PURE__ */ ue(!1), n = /* @__PURE__ */ ue("light"), i = /* @__PURE__ */ ue(/* @__PURE__ */ new Set()), l = /* @__PURE__ */ ue(""), o = /* @__PURE__ */ ue(null), a = /* @__PURE__ */ ue(null), c = /* @__PURE__ */ ue("");
    let u = null, h = () => {
    };
    const m = nt(() => Fu.filter((g) => i.value.has(g.id))), w = nt(() => o.value === null);
    function N(g) {
      n.value = g.theme === "dark" ? "dark" : "light", i.value = new Set((g.apps || []).map((S) => String(S.id))), l.value = String(g.chat?.characterAvatar || ""), o.value = null, a.value = null, r.value = !0;
    }
    function E(g) {
      g.type === "os/init" && N(g.payload || {}), g.type === "os/theme-changed" && (n.value = g.payload?.theme === "dark" ? "dark" : "light"), g.type === "os/error" && (c.value = String(g.payload?.message || "小白 OS 初始化失败"));
    }
    async function q(g) {
      c.value = "";
      try {
        const S = await t.request("app/activate", { appId: g.id });
        if (S.appId !== g.id) throw new Error("app_activation_mismatch");
        a.value = S.state ?? null, o.value = g;
      } catch (S) {
        o.value = null, c.value = S instanceof Error ? S.message : String(S);
      }
    }
    function W() {
      o.value && t.post("app/deactivate", { appId: o.value.id }), o.value = null, a.value = null;
    }
    function V() {
      t.post("os/close");
    }
    function K(g) {
      if (g.key === "Escape") {
        g.preventDefault(), o.value ? W() : V();
        return;
      }
      if (g.key !== "Tab" || !s.value) return;
      const S = Array.from(s.value.querySelectorAll('button:not(:disabled), [href], input:not(:disabled), textarea:not(:disabled), [tabindex]:not([tabindex="-1"])'));
      if (S.length === 0) return;
      const M = S[0], D = S[S.length - 1];
      g.shiftKey && document.activeElement === M ? (g.preventDefault(), D.focus()) : !g.shiftKey && document.activeElement === D && (g.preventDefault(), M.focus());
    }
    return is(async () => {
      u = document.activeElement instanceof HTMLElement ? document.activeElement : null, h = t.subscribe(E), t.start(), await Tr(), s.value?.focus();
    }), ls(() => {
      h(), t.dispose(), u?.focus();
    }), (g, S) => (L(), j("main", {
      ref_key: "root",
      ref: s,
      class: ct(["xiaobai-os-shell", `theme-${n.value}`]),
      role: "dialog",
      "aria-modal": "true",
      "aria-label": "小白 OS",
      tabindex: "-1",
      onKeydown: K,
      onClick: Vi(V, ["self"])
    }, [c.value ? (L(), j("div", sf, le(c.value), 1)) : ve("", !0), r.value ? (L(), wt(Zu, {
      key: 2,
      apps: m.value,
      "active-component": o.value?.component || null,
      "active-state": a.value,
      bridge: zn(t),
      "character-avatar": l.value,
      "is-home": w.value,
      onOpenApp: q,
      onBack: W,
      onHome: W,
      onClose: V
    }, null, 8, [
      "apps",
      "active-component",
      "active-state",
      "bridge",
      "character-avatar",
      "is-home"
    ])) : (L(), j("div", rf, "正在启动小白 OS"))], 34));
  }
}), lf = nf;
ma(lf).mount("#app");
