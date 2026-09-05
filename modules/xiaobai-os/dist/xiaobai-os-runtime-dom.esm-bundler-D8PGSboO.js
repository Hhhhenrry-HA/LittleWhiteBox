/* eslint-disable */
// @__NO_SIDE_EFFECTS__
function cr(e) {
  const t = /* @__PURE__ */ Object.create(null);
  for (const r of e.split(",")) t[r] = 1;
  return (r) => r in t;
}
var W = {}, ht = [], He = () => {
}, ds = () => !1, dr = (e) => e.charCodeAt(0) === 111 && e.charCodeAt(1) === 110 && (e.charCodeAt(2) > 122 || e.charCodeAt(2) < 97), hr = (e) => e.startsWith("onUpdate:"), ee = Object.assign, tn = (e, t) => {
  const r = e.indexOf(t);
  r > -1 && e.splice(r, 1);
}, Fi = Object.prototype.hasOwnProperty, V = (e, t) => Fi.call(e, t), M = Array.isArray, pt = (e) => Kt(e) === "[object Map]", pr = (e) => Kt(e) === "[object Set]", wn = (e) => Kt(e) === "[object Date]", F = (e) => typeof e == "function", X = (e) => typeof e == "string", Me = (e) => typeof e == "symbol", $ = (e) => e !== null && typeof e == "object", hs = (e) => ($(e) || F(e)) && F(e.then) && F(e.catch), ps = Object.prototype.toString, Kt = (e) => ps.call(e), Li = (e) => Kt(e).slice(8, -1), gs = (e) => Kt(e) === "[object Object]", rn = (e) => X(e) && e !== "NaN" && e[0] !== "-" && "" + parseInt(e, 10) === e, Ot = /* @__PURE__ */ cr(",key,ref,ref_for,ref_key,onVnodeBeforeMount,onVnodeMounted,onVnodeBeforeUpdate,onVnodeUpdated,onVnodeBeforeUnmount,onVnodeUnmounted"), gr = (e) => {
  const t = /* @__PURE__ */ Object.create(null);
  return ((r) => t[r] || (t[r] = e(r)));
}, Di = /-\w/g, ge = gr((e) => e.replace(Di, (t) => t.slice(1).toUpperCase())), Ni = /\B([A-Z])/g, et = gr((e) => e.replace(Ni, "-$1").toLowerCase()), vr = gr((e) => e.charAt(0).toUpperCase() + e.slice(1)), Or = gr((e) => e ? `on${vr(e)}` : ""), Re = (e, t) => !Object.is(e, t), Zt = (e, ...t) => {
  for (let r = 0; r < e.length; r++) e[r](...t);
}, vs = (e, t, r, n = !1) => {
  Object.defineProperty(e, t, {
    configurable: !0,
    enumerable: !1,
    writable: n,
    value: r
  });
}, nn = (e) => {
  const t = parseFloat(e);
  return isNaN(t) ? e : t;
}, Ri = (e) => {
  const t = X(e) ? Number(e) : NaN;
  return isNaN(t) ? e : t;
}, An, mr = () => An || (An = typeof globalThis < "u" ? globalThis : typeof self < "u" ? self : typeof window < "u" ? window : typeof globalThis < "u" ? globalThis : {});
function sn(e) {
  if (M(e)) {
    const t = {};
    for (let r = 0; r < e.length; r++) {
      const n = e[r], s = X(n) ? $i(n) : sn(n);
      if (s) for (const i in s) t[i] = s[i];
    }
    return t;
  } else if (X(e) || $(e)) return e;
}
var Hi = /;(?![^(]*\))/g, ji = /:([^]+)/, Vi = /\/\*[^]*?\*\//g;
function $i(e) {
  const t = {};
  return e.replace(Vi, "").split(Hi).forEach((r) => {
    if (r) {
      const n = r.split(ji);
      n.length > 1 && (t[n[0].trim()] = n[1].trim());
    }
  }), t;
}
function ln(e) {
  let t = "";
  if (X(e)) t = e;
  else if (M(e)) for (let r = 0; r < e.length; r++) {
    const n = ln(e[r]);
    n && (t += n + " ");
  }
  else if ($(e))
    for (const r in e) e[r] && (t += r + " ");
  return t.trim();
}
var ms = "itemscope,allowfullscreen,formnovalidate,ismap,nomodule,novalidate,readonly", Bi = /* @__PURE__ */ cr(ms), hf = /* @__PURE__ */ cr(ms + ",async,autofocus,autoplay,controls,default,defer,disabled,hidden,inert,loop,open,required,reversed,scoped,seamless,checked,muted,multiple,selected");
function _s(e) {
  return !!e || e === "";
}
function Ki(e, t) {
  if (e.length !== t.length) return !1;
  let r = !0;
  for (let n = 0; r && n < e.length; n++) r = Ut(e[n], t[n]);
  return r;
}
function Ut(e, t) {
  if (e === t) return !0;
  let r = wn(e), n = wn(t);
  if (r || n) return r && n ? e.getTime() === t.getTime() : !1;
  if (r = Me(e), n = Me(t), r || n) return e === t;
  if (r = M(e), n = M(t), r || n) return r && n ? Ki(e, t) : !1;
  if (r = $(e), n = $(t), r || n) {
    if (!r || !n || Object.keys(e).length !== Object.keys(t).length) return !1;
    for (const s in e) {
      const i = e.hasOwnProperty(s), l = t.hasOwnProperty(s);
      if (i && !l || !i && l || !Ut(e[s], t[s])) return !1;
    }
  }
  return String(e) === String(t);
}
function bs(e, t) {
  return e.findIndex((r) => Ut(r, t));
}
var ys = (e) => !!(e && e.__v_isRef === !0), Ui = (e) => X(e) ? e : e == null ? "" : M(e) || $(e) && (e.toString === ps || !F(e.toString)) ? ys(e) ? Ui(e.value) : JSON.stringify(e, xs, 2) : String(e), xs = (e, t) => ys(t) ? xs(e, t.value) : pt(t) ? { [`Map(${t.size})`]: [...t.entries()].reduce((r, [n, s], i) => (r[Mr(n, i) + " =>"] = s, r), {}) } : pr(t) ? { [`Set(${t.size})`]: [...t.values()].map((r) => Mr(r)) } : Me(t) ? Mr(t) : $(t) && !M(t) && !gs(t) ? String(t) : t, Mr = (e, t = "") => {
  var r;
  return Me(e) ? `Symbol(${(r = e.description) != null ? r : t})` : e;
}, ie, Wi = class {
  constructor(e = !1) {
    this.detached = e, this._active = !0, this._on = 0, this.effects = [], this.cleanups = [], this._isPaused = !1, this._warnOnRun = !0, this.__v_skip = !0, !e && ie && (ie.active ? (this.parent = ie, this.index = (ie.scopes || (ie.scopes = [])).push(this) - 1) : (this._active = !1, this._warnOnRun = !1));
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
      const t = ie;
      try {
        return ie = this, e();
      } finally {
        ie = t;
      }
    }
  }
  on() {
    ++this._on === 1 && (this.prevScope = ie, ie = this);
  }
  off() {
    if (this._on > 0 && --this._on === 0) {
      if (ie === this) ie = this.prevScope;
      else {
        let e = ie;
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
        const n = this.parent.scopes.pop();
        n && n !== this && (this.parent.scopes[this.index] = n, n.index = this.index);
      }
      this.parent = void 0;
    }
  }
};
function ki() {
  return ie;
}
var J, Pr = /* @__PURE__ */ new WeakSet(), Cs = class {
  constructor(e) {
    this.fn = e, this.deps = void 0, this.depsTail = void 0, this.flags = 5, this.next = void 0, this.cleanup = void 0, this.scheduler = void 0, ie && (ie.active ? ie.effects.push(this) : this.flags &= -2);
  }
  pause() {
    this.flags |= 64;
  }
  resume() {
    this.flags & 64 && (this.flags &= -65, Pr.has(this) && (Pr.delete(this), this.trigger()));
  }
  notify() {
    this.flags & 2 && !(this.flags & 32) || this.flags & 8 || Ts(this);
  }
  run() {
    if (!(this.flags & 1)) return this.fn();
    this.flags |= 2, On(this), Es(this);
    const e = J, t = Oe;
    J = this, Oe = !0;
    try {
      return this.fn();
    } finally {
      ws(this), J = e, Oe = t, this.flags &= -3;
    }
  }
  stop() {
    if (this.flags & 1) {
      for (let e = this.deps; e; e = e.nextDep) an(e);
      this.deps = this.depsTail = void 0, On(this), this.onStop && this.onStop(), this.flags &= -2;
    }
  }
  trigger() {
    this.flags & 64 ? Pr.add(this) : this.scheduler ? this.scheduler() : this.runIfDirty();
  }
  runIfDirty() {
    Br(this) && this.run();
  }
  get dirty() {
    return Br(this);
  }
}, Ss = 0, Mt, Pt;
function Ts(e, t = !1) {
  if (e.flags |= 8, t) {
    e.next = Pt, Pt = e;
    return;
  }
  e.next = Mt, Mt = e;
}
function on() {
  Ss++;
}
function fn() {
  if (--Ss > 0) return;
  if (Pt) {
    let t = Pt;
    for (Pt = void 0; t; ) {
      const r = t.next;
      t.next = void 0, t.flags &= -9, t = r;
    }
  }
  let e;
  for (; Mt; ) {
    let t = Mt;
    for (Mt = void 0; t; ) {
      const r = t.next;
      if (t.next = void 0, t.flags &= -9, t.flags & 1) try {
        t.trigger();
      } catch (n) {
        e || (e = n);
      }
      t = r;
    }
  }
  if (e) throw e;
}
function Es(e) {
  for (let t = e.deps; t; t = t.nextDep)
    t.version = -1, t.prevActiveLink = t.dep.activeLink, t.dep.activeLink = t;
}
function ws(e) {
  let t, r = e.depsTail, n = r;
  for (; n; ) {
    const s = n.prevDep;
    n.version === -1 ? (n === r && (r = s), an(n), qi(n)) : t = n, n.dep.activeLink = n.prevActiveLink, n.prevActiveLink = void 0, n = s;
  }
  e.deps = t, e.depsTail = r;
}
function Br(e) {
  for (let t = e.deps; t; t = t.nextDep) if (t.dep.version !== t.version || t.dep.computed && (As(t.dep.computed) || t.dep.version !== t.version)) return !0;
  return !!e._dirty;
}
function As(e) {
  if (e.flags & 4 && !(e.flags & 16) || (e.flags &= -17, e.globalVersion === Dt) || (e.globalVersion = Dt, !e.isSSR && e.flags & 128 && (!e.deps && !e._dirty || !Br(e)))) return;
  e.flags |= 2;
  const t = e.dep, r = J, n = Oe;
  J = e, Oe = !0;
  try {
    Es(e);
    const s = e.fn(e._value);
    (t.version === 0 || Re(s, e._value)) && (e.flags |= 128, e._value = s, t.version++);
  } catch (s) {
    throw t.version++, s;
  } finally {
    J = r, Oe = n, ws(e), e.flags &= -3;
  }
}
function an(e, t = !1) {
  const { dep: r, prevSub: n, nextSub: s } = e;
  if (n && (n.nextSub = s, e.prevSub = void 0), s && (s.prevSub = n, e.nextSub = void 0), r.subs === e && (r.subs = n, !n && r.computed)) {
    r.computed.flags &= -5;
    for (let i = r.computed.deps; i; i = i.nextDep) an(i, !0);
  }
  !t && !--r.sc && r.map && r.map.delete(r.key);
}
function qi(e) {
  const { prevDep: t, nextDep: r } = e;
  t && (t.nextDep = r, e.prevDep = void 0), r && (r.prevDep = t, e.nextDep = void 0);
}
var Oe = !0, Os = [];
function ke() {
  Os.push(Oe), Oe = !1;
}
function qe() {
  const e = Os.pop();
  Oe = e === void 0 ? !0 : e;
}
function On(e) {
  const { cleanup: t } = e;
  if (e.cleanup = void 0, t) {
    const r = J;
    J = void 0;
    try {
      t();
    } finally {
      J = r;
    }
  }
}
var Dt = 0, Gi = class {
  constructor(e, t) {
    this.sub = e, this.dep = t, this.version = t.version, this.nextDep = this.prevDep = this.nextSub = this.prevSub = this.prevActiveLink = void 0;
  }
}, un = class {
  constructor(e) {
    this.computed = e, this.version = 0, this.activeLink = void 0, this.subs = void 0, this.map = void 0, this.key = void 0, this.sc = 0, this.__v_skip = !0;
  }
  track(e) {
    if (!J || !Oe || J === this.computed) return;
    let t = this.activeLink;
    if (t === void 0 || t.sub !== J)
      t = this.activeLink = new Gi(J, this), J.deps ? (t.prevDep = J.depsTail, J.depsTail.nextDep = t, J.depsTail = t) : J.deps = J.depsTail = t, Ms(t);
    else if (t.version === -1 && (t.version = this.version, t.nextDep)) {
      const r = t.nextDep;
      r.prevDep = t.prevDep, t.prevDep && (t.prevDep.nextDep = r), t.prevDep = J.depsTail, t.nextDep = void 0, J.depsTail.nextDep = t, J.depsTail = t, J.deps === t && (J.deps = r);
    }
    return t;
  }
  trigger(e) {
    this.version++, Dt++, this.notify(e);
  }
  notify(e) {
    on();
    try {
      for (let t = this.subs; t; t = t.prevSub) t.sub.notify() && t.sub.dep.notify();
    } finally {
      fn();
    }
  }
};
function Ms(e) {
  if (e.dep.sc++, e.sub.flags & 4) {
    const t = e.dep.computed;
    if (t && !e.dep.subs) {
      t.flags |= 20;
      for (let n = t.deps; n; n = n.nextDep) Ms(n);
    }
    const r = e.dep.subs;
    r !== e && (e.prevSub = r, r && (r.nextSub = e)), e.dep.subs = e;
  }
}
var Kr = /* @__PURE__ */ new WeakMap(), ft = /* @__PURE__ */ Symbol(""), Ur = /* @__PURE__ */ Symbol(""), Nt = /* @__PURE__ */ Symbol("");
function fe(e, t, r) {
  if (Oe && J) {
    let n = Kr.get(e);
    n || Kr.set(e, n = /* @__PURE__ */ new Map());
    let s = n.get(r);
    s || (n.set(r, s = new un()), s.map = n, s.key = r), s.track();
  }
}
function Ue(e, t, r, n, s, i) {
  const l = Kr.get(e);
  if (!l) {
    Dt++;
    return;
  }
  const o = (a) => {
    a && a.trigger();
  };
  if (on(), t === "clear") l.forEach(o);
  else {
    const a = M(e), d = a && rn(r);
    if (a && r === "length") {
      const u = Number(n);
      l.forEach((h, y) => {
        (y === "length" || y === Nt || !Me(y) && y >= u) && o(h);
      });
    } else
      switch ((r !== void 0 || l.has(void 0)) && o(l.get(r)), d && o(l.get(Nt)), t) {
        case "add":
          a ? d && o(l.get("length")) : (o(l.get(ft)), pt(e) && o(l.get(Ur)));
          break;
        case "delete":
          a || (o(l.get(ft)), pt(e) && o(l.get(Ur)));
          break;
        case "set":
          pt(e) && o(l.get(ft));
          break;
      }
  }
  fn();
}
function ct(e) {
  const t = /* @__PURE__ */ H(e);
  return t === e ? t : (fe(t, "iterate", Nt), /* @__PURE__ */ Ee(e) ? t : t.map(Pe));
}
function _r(e) {
  return fe(e = /* @__PURE__ */ H(e), "iterate", Nt), e;
}
function De(e, t) {
  return /* @__PURE__ */ Ge(e) ? bt(/* @__PURE__ */ at(e) ? Pe(t) : t) : Pe(t);
}
var Ji = {
  __proto__: null,
  [Symbol.iterator]() {
    return Ir(this, Symbol.iterator, (e) => De(this, e));
  },
  concat(...e) {
    return ct(this).concat(...e.map((t) => M(t) ? ct(t) : t));
  },
  entries() {
    return Ir(this, "entries", (e) => (e[1] = De(this, e[1]), e));
  },
  every(e, t) {
    return Ve(this, "every", e, t, void 0, arguments);
  },
  filter(e, t) {
    return Ve(this, "filter", e, t, (r) => r.map((n) => De(this, n)), arguments);
  },
  find(e, t) {
    return Ve(this, "find", e, t, (r) => De(this, r), arguments);
  },
  findIndex(e, t) {
    return Ve(this, "findIndex", e, t, void 0, arguments);
  },
  findLast(e, t) {
    return Ve(this, "findLast", e, t, (r) => De(this, r), arguments);
  },
  findLastIndex(e, t) {
    return Ve(this, "findLastIndex", e, t, void 0, arguments);
  },
  forEach(e, t) {
    return Ve(this, "forEach", e, t, void 0, arguments);
  },
  includes(...e) {
    return Fr(this, "includes", e);
  },
  indexOf(...e) {
    return Fr(this, "indexOf", e);
  },
  join(e) {
    return ct(this).join(e);
  },
  lastIndexOf(...e) {
    return Fr(this, "lastIndexOf", e);
  },
  map(e, t) {
    return Ve(this, "map", e, t, void 0, arguments);
  },
  pop() {
    return Ct(this, "pop");
  },
  push(...e) {
    return Ct(this, "push", e);
  },
  reduce(e, ...t) {
    return Mn(this, "reduce", e, t);
  },
  reduceRight(e, ...t) {
    return Mn(this, "reduceRight", e, t);
  },
  shift() {
    return Ct(this, "shift");
  },
  some(e, t) {
    return Ve(this, "some", e, t, void 0, arguments);
  },
  splice(...e) {
    return Ct(this, "splice", e);
  },
  toReversed() {
    return ct(this).toReversed();
  },
  toSorted(e) {
    return ct(this).toSorted(e);
  },
  toSpliced(...e) {
    return ct(this).toSpliced(...e);
  },
  unshift(...e) {
    return Ct(this, "unshift", e);
  },
  values() {
    return Ir(this, "values", (e) => De(this, e));
  }
};
function Ir(e, t, r) {
  const n = _r(e), s = n[t]();
  return n !== e && !/* @__PURE__ */ Ee(e) && (s._next = s.next, s.next = () => {
    const i = s._next();
    return i.done || (i.value = r(i.value)), i;
  }), s;
}
var Yi = Array.prototype;
function Ve(e, t, r, n, s, i) {
  const l = _r(e), o = l !== e && !/* @__PURE__ */ Ee(e), a = l[t];
  if (a !== Yi[t]) {
    const h = a.apply(e, i);
    return o ? Pe(h) : h;
  }
  let d = r;
  l !== e && (o ? d = function(h, y) {
    return r.call(this, De(e, h), y, e);
  } : r.length > 2 && (d = function(h, y) {
    return r.call(this, h, y, e);
  }));
  const u = a.call(l, d, n);
  return o && s ? s(u) : u;
}
function Mn(e, t, r, n) {
  const s = _r(e), i = s !== e && !/* @__PURE__ */ Ee(e);
  let l = r, o = !1;
  s !== e && (i ? (o = n.length === 0, l = function(d, u, h) {
    return o && (o = !1, d = De(e, d)), r.call(this, d, De(e, u), h, e);
  }) : r.length > 3 && (l = function(d, u, h) {
    return r.call(this, d, u, h, e);
  }));
  const a = s[t](l, ...n);
  return o ? De(e, a) : a;
}
function Fr(e, t, r) {
  const n = /* @__PURE__ */ H(e);
  fe(n, "iterate", Nt);
  const s = n[t](...r);
  return (s === -1 || s === !1) && /* @__PURE__ */ pn(r[0]) ? (r[0] = /* @__PURE__ */ H(r[0]), n[t](...r)) : s;
}
function Ct(e, t, r = []) {
  ke(), on();
  const n = (/* @__PURE__ */ H(e))[t].apply(e, r);
  return fn(), qe(), n;
}
var zi = /* @__PURE__ */ cr("__proto__,__v_isRef,__isVue"), Ps = new Set(/* @__PURE__ */ Object.getOwnPropertyNames(Symbol).filter((e) => e !== "arguments" && e !== "caller").map((e) => Symbol[e]).filter(Me));
function Xi(e) {
  Me(e) || (e = String(e));
  const t = /* @__PURE__ */ H(this);
  return fe(t, "has", e), t.hasOwnProperty(e);
}
var Is = class {
  constructor(e = !1, t = !1) {
    this._isReadonly = e, this._isShallow = t;
  }
  get(e, t, r) {
    if (t === "__v_skip") return e.__v_skip;
    const n = this._isReadonly, s = this._isShallow;
    if (t === "__v_isReactive") return !n;
    if (t === "__v_isReadonly") return n;
    if (t === "__v_isShallow") return s;
    if (t === "__v_raw")
      return r === (n ? s ? ol : Ns : s ? Ds : Ls).get(e) || Object.getPrototypeOf(e) === Object.getPrototypeOf(r) ? e : void 0;
    const i = M(e);
    if (!n) {
      let o;
      if (i && (o = Ji[t])) return o;
      if (t === "hasOwnProperty") return Xi;
    }
    const l = Reflect.get(e, t, /* @__PURE__ */ ce(e) ? e : r);
    if ((Me(t) ? Ps.has(t) : zi(t)) || (n || fe(e, "get", t), s)) return l;
    if (/* @__PURE__ */ ce(l)) {
      const o = i && rn(t) ? l : l.value;
      return n && $(o) ? /* @__PURE__ */ kr(o) : o;
    }
    return $(l) ? n ? /* @__PURE__ */ kr(l) : /* @__PURE__ */ dn(l) : l;
  }
}, Fs = class extends Is {
  constructor(e = !1) {
    super(!1, e);
  }
  set(e, t, r, n) {
    let s = e[t];
    const i = M(e) && rn(t);
    if (!this._isShallow) {
      const a = /* @__PURE__ */ Ge(s);
      if (!/* @__PURE__ */ Ee(r) && !/* @__PURE__ */ Ge(r) && (s = /* @__PURE__ */ H(s), r = /* @__PURE__ */ H(r)), !i && /* @__PURE__ */ ce(s) && !/* @__PURE__ */ ce(r)) return a || (s.value = r), !0;
    }
    const l = i ? Number(t) < e.length : V(e, t), o = Reflect.set(e, t, r, /* @__PURE__ */ ce(e) ? e : n);
    return e === /* @__PURE__ */ H(n) && (l ? Re(r, s) && Ue(e, "set", t, r, s) : Ue(e, "add", t, r)), o;
  }
  deleteProperty(e, t) {
    const r = V(e, t), n = e[t], s = Reflect.deleteProperty(e, t);
    return s && r && Ue(e, "delete", t, void 0, n), s;
  }
  has(e, t) {
    const r = Reflect.has(e, t);
    return (!Me(t) || !Ps.has(t)) && fe(e, "has", t), r;
  }
  ownKeys(e) {
    return fe(e, "iterate", M(e) ? "length" : ft), Reflect.ownKeys(e);
  }
}, Zi = class extends Is {
  constructor(e = !1) {
    super(!0, e);
  }
  set(e, t) {
    return !0;
  }
  deleteProperty(e, t) {
    return !0;
  }
}, Qi = /* @__PURE__ */ new Fs(), el = /* @__PURE__ */ new Zi(), tl = /* @__PURE__ */ new Fs(!0), Wr = (e) => e, Yt = (e) => Reflect.getPrototypeOf(e);
function rl(e, t, r) {
  return function(...n) {
    const s = this.__v_raw, i = /* @__PURE__ */ H(s), l = pt(i), o = e === "entries" || e === Symbol.iterator && l, a = e === "keys" && l, d = s[e](...n), u = r ? Wr : t ? bt : Pe;
    return !t && fe(i, "iterate", a ? Ur : ft), ee(Object.create(d), { next() {
      const { value: h, done: y } = d.next();
      return y ? {
        value: h,
        done: y
      } : {
        value: o ? [u(h[0]), u(h[1])] : u(h),
        done: y
      };
    } });
  };
}
function zt(e) {
  return function(...t) {
    return e === "delete" ? !1 : e === "clear" ? void 0 : this;
  };
}
function nl(e, t) {
  const r = {
    get(n) {
      const s = this.__v_raw, i = /* @__PURE__ */ H(s), l = /* @__PURE__ */ H(n);
      e || (Re(n, l) && fe(i, "get", n), fe(i, "get", l));
      const { has: o } = Yt(i), a = t ? Wr : e ? bt : Pe;
      if (o.call(i, n)) return a(s.get(n));
      if (o.call(i, l)) return a(s.get(l));
      s !== i && s.get(n);
    },
    get size() {
      const n = this.__v_raw;
      return !e && fe(/* @__PURE__ */ H(n), "iterate", ft), n.size;
    },
    has(n) {
      const s = this.__v_raw, i = /* @__PURE__ */ H(s), l = /* @__PURE__ */ H(n);
      return e || (Re(n, l) && fe(i, "has", n), fe(i, "has", l)), n === l ? s.has(n) : s.has(n) || s.has(l);
    },
    forEach(n, s) {
      const i = this, l = i.__v_raw, o = /* @__PURE__ */ H(l), a = t ? Wr : e ? bt : Pe;
      return !e && fe(o, "iterate", ft), l.forEach((d, u) => n.call(s, a(d), a(u), i));
    }
  };
  return ee(r, e ? {
    add: zt("add"),
    set: zt("set"),
    delete: zt("delete"),
    clear: zt("clear")
  } : {
    add(n) {
      const s = /* @__PURE__ */ H(this), i = Yt(s), l = /* @__PURE__ */ H(n), o = !t && !/* @__PURE__ */ Ee(n) && !/* @__PURE__ */ Ge(n) ? l : n;
      return i.has.call(s, o) || Re(n, o) && i.has.call(s, n) || Re(l, o) && i.has.call(s, l) || (s.add(o), Ue(s, "add", o, o)), this;
    },
    set(n, s) {
      !t && !/* @__PURE__ */ Ee(s) && !/* @__PURE__ */ Ge(s) && (s = /* @__PURE__ */ H(s));
      const i = /* @__PURE__ */ H(this), { has: l, get: o } = Yt(i);
      let a = l.call(i, n);
      a || (n = /* @__PURE__ */ H(n), a = l.call(i, n));
      const d = o.call(i, n);
      return i.set(n, s), a ? Re(s, d) && Ue(i, "set", n, s, d) : Ue(i, "add", n, s), this;
    },
    delete(n) {
      const s = /* @__PURE__ */ H(this), { has: i, get: l } = Yt(s);
      let o = i.call(s, n);
      o || (n = /* @__PURE__ */ H(n), o = i.call(s, n));
      const a = l ? l.call(s, n) : void 0, d = s.delete(n);
      return o && Ue(s, "delete", n, void 0, a), d;
    },
    clear() {
      const n = /* @__PURE__ */ H(this), s = n.size !== 0, i = void 0, l = n.clear();
      return s && Ue(n, "clear", void 0, void 0, i), l;
    }
  }), [
    "keys",
    "values",
    "entries",
    Symbol.iterator
  ].forEach((n) => {
    r[n] = rl(n, e, t);
  }), r;
}
function cn(e, t) {
  const r = nl(e, t);
  return (n, s, i) => s === "__v_isReactive" ? !e : s === "__v_isReadonly" ? e : s === "__v_raw" ? n : Reflect.get(V(r, s) && s in n ? r : n, s, i);
}
var sl = { get: /* @__PURE__ */ cn(!1, !1) }, il = { get: /* @__PURE__ */ cn(!1, !0) }, ll = { get: /* @__PURE__ */ cn(!0, !1) }, Ls = /* @__PURE__ */ new WeakMap(), Ds = /* @__PURE__ */ new WeakMap(), Ns = /* @__PURE__ */ new WeakMap(), ol = /* @__PURE__ */ new WeakMap();
function fl(e) {
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
function dn(e) {
  return /* @__PURE__ */ Ge(e) ? e : hn(e, !1, Qi, sl, Ls);
}
// @__NO_SIDE_EFFECTS__
function al(e) {
  return hn(e, !1, tl, il, Ds);
}
// @__NO_SIDE_EFFECTS__
function kr(e) {
  return hn(e, !0, el, ll, Ns);
}
function hn(e, t, r, n, s) {
  if (!$(e) || e.__v_raw && !(t && e.__v_isReactive) || e.__v_skip || !Object.isExtensible(e)) return e;
  const i = s.get(e);
  if (i) return i;
  const l = fl(Li(e));
  if (l === 0) return e;
  const o = new Proxy(e, l === 2 ? n : r);
  return s.set(e, o), o;
}
// @__NO_SIDE_EFFECTS__
function at(e) {
  return /* @__PURE__ */ Ge(e) ? /* @__PURE__ */ at(e.__v_raw) : !!(e && e.__v_isReactive);
}
// @__NO_SIDE_EFFECTS__
function Ge(e) {
  return !!(e && e.__v_isReadonly);
}
// @__NO_SIDE_EFFECTS__
function Ee(e) {
  return !!(e && e.__v_isShallow);
}
// @__NO_SIDE_EFFECTS__
function pn(e) {
  return e ? !!e.__v_raw : !1;
}
// @__NO_SIDE_EFFECTS__
function H(e) {
  const t = e && e.__v_raw;
  return t ? /* @__PURE__ */ H(t) : e;
}
function ul(e) {
  return !V(e, "__v_skip") && Object.isExtensible(e) && vs(e, "__v_skip", !0), e;
}
var Pe = (e) => $(e) ? /* @__PURE__ */ dn(e) : e, bt = (e) => $(e) ? /* @__PURE__ */ kr(e) : e;
// @__NO_SIDE_EFFECTS__
function ce(e) {
  return e ? e.__v_isRef === !0 : !1;
}
// @__NO_SIDE_EFFECTS__
function pf(e) {
  return Rs(e, !1);
}
// @__NO_SIDE_EFFECTS__
function gf(e) {
  return Rs(e, !0);
}
function Rs(e, t) {
  return /* @__PURE__ */ ce(e) ? e : new cl(e, t);
}
var cl = class {
  constructor(e, t) {
    this.dep = new un(), this.__v_isRef = !0, this.__v_isShallow = !1, this._rawValue = t ? e : /* @__PURE__ */ H(e), this._value = t ? e : Pe(e), this.__v_isShallow = t;
  }
  get value() {
    return this.dep.track(), this._value;
  }
  set value(e) {
    const t = this._rawValue, r = this.__v_isShallow || /* @__PURE__ */ Ee(e) || /* @__PURE__ */ Ge(e);
    e = r ? e : /* @__PURE__ */ H(e), Re(e, t) && (this._rawValue = e, this._value = r ? e : Pe(e), this.dep.trigger());
  }
};
function dl(e) {
  return /* @__PURE__ */ ce(e) ? e.value : e;
}
var hl = {
  get: (e, t, r) => t === "__v_raw" ? e : dl(Reflect.get(e, t, r)),
  set: (e, t, r, n) => {
    const s = e[t];
    return /* @__PURE__ */ ce(s) && !/* @__PURE__ */ ce(r) ? (s.value = r, !0) : Reflect.set(e, t, r, n);
  }
};
function Hs(e) {
  return /* @__PURE__ */ at(e) ? e : new Proxy(e, hl);
}
var pl = class {
  constructor(e, t, r) {
    this.fn = e, this.setter = t, this._value = void 0, this.dep = new un(this), this.__v_isRef = !0, this.deps = void 0, this.depsTail = void 0, this.flags = 16, this.globalVersion = Dt - 1, this.next = void 0, this.effect = this, this.__v_isReadonly = !t, this.isSSR = r;
  }
  notify() {
    if (this.flags |= 16, !(this.flags & 8) && J !== this)
      return Ts(this, !0), !0;
  }
  get value() {
    const e = this.dep.track();
    return As(this), e && (e.version = this.dep.version), this._value;
  }
  set value(e) {
    this.setter && this.setter(e);
  }
};
// @__NO_SIDE_EFFECTS__
function gl(e, t, r = !1) {
  let n, s;
  return F(e) ? n = e : (n = e.get, s = e.set), new pl(n, s, r);
}
var Xt = {}, rr = /* @__PURE__ */ new WeakMap(), it = void 0;
function vl(e, t = !1, r = it) {
  if (r) {
    let n = rr.get(r);
    n || rr.set(r, n = []), n.push(e);
  }
}
function ml(e, t, r = W) {
  const { immediate: n, deep: s, once: i, scheduler: l, augmentJob: o, call: a } = r, d = (A) => s ? A : /* @__PURE__ */ Ee(A) || s === !1 || s === 0 ? We(A, 1) : We(A);
  let u, h, y, S, L = !1, P = !1;
  if (/* @__PURE__ */ ce(e) ? (h = () => e.value, L = /* @__PURE__ */ Ee(e)) : /* @__PURE__ */ at(e) ? (h = () => d(e), L = !0) : M(e) ? (P = !0, L = e.some((A) => /* @__PURE__ */ at(A) || /* @__PURE__ */ Ee(A)), h = () => e.map((A) => {
    if (/* @__PURE__ */ ce(A)) return A.value;
    if (/* @__PURE__ */ at(A)) return d(A);
    if (F(A)) return a ? a(A, 2) : A();
  })) : F(e) ? t ? h = a ? () => a(e, 2) : e : h = () => {
    if (y) {
      ke();
      try {
        y();
      } finally {
        qe();
      }
    }
    const A = it;
    it = u;
    try {
      return a ? a(e, 3, [S]) : e(S);
    } finally {
      it = A;
    }
  } : h = He, t && s) {
    const A = h, U = s === !0 ? 1 / 0 : s;
    h = () => We(A(), U);
  }
  const Y = ki(), B = () => {
    u.stop(), Y && Y.active && tn(Y.effects, u);
  };
  if (i && t) {
    const A = t;
    t = (...U) => {
      A(...U), B();
    };
  }
  let N = P ? new Array(e.length).fill(Xt) : Xt;
  const j = (A) => {
    if (!(!(u.flags & 1) || !u.dirty && !A))
      if (t) {
        const U = u.run();
        if (s || L || (P ? U.some((se, ve) => Re(se, N[ve])) : Re(U, N))) {
          y && y();
          const se = it;
          it = u;
          try {
            const ve = [
              U,
              N === Xt ? void 0 : P && N[0] === Xt ? [] : N,
              S
            ];
            N = U, a ? a(t, 3, ve) : t(...ve);
          } finally {
            it = se;
          }
        }
      } else u.run();
  };
  return o && o(j), u = new Cs(h), u.scheduler = l ? () => l(j, !1) : j, S = (A) => vl(A, !1, u), y = u.onStop = () => {
    const A = rr.get(u);
    if (A) {
      if (a) a(A, 4);
      else for (const U of A) U();
      rr.delete(u);
    }
  }, t ? n ? j(!0) : N = u.run() : l ? l(j.bind(null, !0), !0) : u.run(), B.pause = u.pause.bind(u), B.resume = u.resume.bind(u), B.stop = B, B;
}
function We(e, t = 1 / 0, r) {
  if (t <= 0 || !$(e) || e.__v_skip || (r = r || /* @__PURE__ */ new Map(), (r.get(e) || 0) >= t)) return e;
  if (r.set(e, t), t--, /* @__PURE__ */ ce(e)) We(e.value, t, r);
  else if (M(e)) for (let n = 0; n < e.length; n++) We(e[n], t, r);
  else if (pr(e) || pt(e)) e.forEach((n) => {
    We(n, t, r);
  });
  else if (gs(e)) {
    for (const n in e) We(e[n], t, r);
    for (const n of Object.getOwnPropertySymbols(e)) Object.prototype.propertyIsEnumerable.call(e, n) && We(e[n], t, r);
  }
  return e;
}
function Wt(e, t, r, n) {
  try {
    return n ? e(...n) : e();
  } catch (s) {
    br(s, t, r);
  }
}
function we(e, t, r, n) {
  if (F(e)) {
    const s = Wt(e, t, r, n);
    return s && hs(s) && s.catch((i) => {
      br(i, t, r);
    }), s;
  }
  if (M(e)) {
    const s = [];
    for (let i = 0; i < e.length; i++) s.push(we(e[i], t, r, n));
    return s;
  }
}
function br(e, t, r, n = !0) {
  const s = t ? t.vnode : null, { errorHandler: i, throwUnhandledErrorInProduction: l } = t && t.appContext.config || W;
  if (t) {
    let o = t.parent;
    const a = t.proxy, d = `https://vuejs.org/error-reference/#runtime-${r}`;
    for (; o; ) {
      const u = o.ec;
      if (u) {
        for (let h = 0; h < u.length; h++) if (u[h](e, a, d) === !1) return;
      }
      o = o.parent;
    }
    if (i) {
      ke(), Wt(i, null, 10, [
        e,
        a,
        d
      ]), qe();
      return;
    }
  }
  _l(e, r, s, n, l);
}
function _l(e, t, r, n = !0, s = !1) {
  if (s) throw e;
  console.error(e);
}
var he = [], Le = -1, gt = [], Ze = null, dt = 0, js = /* @__PURE__ */ Promise.resolve(), nr = null;
function bl(e) {
  const t = nr || js;
  return e ? t.then(this ? e.bind(this) : e) : t;
}
function yl(e) {
  let t = Le + 1, r = he.length;
  for (; t < r; ) {
    const n = t + r >>> 1, s = he[n], i = Rt(s);
    i < e || i === e && s.flags & 2 ? t = n + 1 : r = n;
  }
  return t;
}
function gn(e) {
  if (!(e.flags & 1)) {
    const t = Rt(e), r = he[he.length - 1];
    !r || !(e.flags & 2) && t >= Rt(r) ? he.push(e) : he.splice(yl(t), 0, e), e.flags |= 1, Vs();
  }
}
function Vs() {
  nr || (nr = js.then(Bs));
}
function xl(e) {
  M(e) ? gt.push(...e) : Ze && e.id === -1 ? Ze.splice(dt + 1, 0, e) : e.flags & 1 || (gt.push(e), e.flags |= 1), Vs();
}
function Pn(e, t, r = Le + 1) {
  for (; r < he.length; r++) {
    const n = he[r];
    if (n && n.flags & 2) {
      if (e && n.id !== e.uid) continue;
      he.splice(r, 1), r--, n.flags & 4 && (n.flags &= -2), n(), n.flags & 4 || (n.flags &= -2);
    }
  }
}
function $s(e) {
  if (gt.length) {
    const t = [...new Set(gt)].sort((r, n) => Rt(r) - Rt(n));
    if (gt.length = 0, Ze) {
      Ze.push(...t);
      return;
    }
    for (Ze = t, dt = 0; dt < Ze.length; dt++) {
      const r = Ze[dt];
      r.flags & 4 && (r.flags &= -2), r.flags & 8 || r(), r.flags &= -2;
    }
    Ze = null, dt = 0;
  }
}
var Rt = (e) => e.id == null ? e.flags & 2 ? -1 : 1 / 0 : e.id;
function Bs(e) {
  try {
    for (Le = 0; Le < he.length; Le++) {
      const t = he[Le];
      t && !(t.flags & 8) && (t.flags & 4 && (t.flags &= -2), Wt(t, t.i, t.i ? 15 : 14), t.flags & 4 || (t.flags &= -2));
    }
  } finally {
    for (; Le < he.length; Le++) {
      const t = he[Le];
      t && (t.flags &= -2);
    }
    Le = -1, he.length = 0, $s(e), nr = null, (he.length || gt.length) && Bs(e);
  }
}
var le = null, Ks = null;
function sr(e) {
  const t = le;
  return le = e, Ks = e && e.type.__scopeId || null, t;
}
function Cl(e, t = le, r) {
  if (!t || e._n) return e;
  const n = (...s) => {
    n._d && or(-1);
    const i = sr(t);
    let l;
    try {
      l = e(...s);
    } finally {
      sr(i), n._d && or(1);
    }
    return l;
  };
  return n._n = !0, n._c = !0, n._d = !0, n;
}
function vf(e, t) {
  if (le === null) return e;
  const r = Tr(le), n = e.dirs || (e.dirs = []);
  for (let s = 0; s < t.length; s++) {
    let [i, l, o, a = W] = t[s];
    i && (F(i) && (i = {
      mounted: i,
      updated: i
    }), i.deep && We(l), n.push({
      dir: i,
      instance: r,
      value: l,
      oldValue: void 0,
      arg: o,
      modifiers: a
    }));
  }
  return e;
}
function tt(e, t, r, n) {
  const s = e.dirs, i = t && t.dirs;
  for (let l = 0; l < s.length; l++) {
    const o = s[l];
    i && (o.oldValue = i[l].value);
    let a = o.dir[n];
    a && (ke(), we(a, r, 8, [
      e.el,
      o,
      e,
      t
    ]), qe());
  }
}
function Sl(e, t) {
  if (ue) {
    let r = ue.provides;
    const n = ue.parent && ue.parent.provides;
    n === r && (r = ue.provides = Object.create(n)), r[e] = t;
  }
}
function Qt(e, t, r = !1) {
  const n = yn();
  if (n || mt) {
    let s = mt ? mt._context.provides : n ? n.parent == null || n.ce ? n.vnode.appContext && n.vnode.appContext.provides : n.parent.provides : void 0;
    if (s && e in s) return s[e];
    if (arguments.length > 1) return r && F(t) ? t.call(n && n.proxy) : t;
  }
}
var Tl = /* @__PURE__ */ Symbol.for("v-scx"), El = () => {
  {
    const e = Qt(Tl);
    return e;
  }
};
function Lr(e, t, r) {
  return Us(e, t, r);
}
function Us(e, t, r = W) {
  const { immediate: n, deep: s, flush: i, once: l } = r, o = ee({}, r), a = t && n || !t && i !== "post";
  let d;
  if ($t) {
    if (i === "sync") {
      const S = El();
      d = S.__watcherHandles || (S.__watcherHandles = []);
    } else if (!a) {
      const S = () => {
      };
      return S.stop = He, S.resume = He, S.pause = He, S;
    }
  }
  const u = ue;
  o.call = (S, L, P) => we(S, u, L, P);
  let h = !1;
  i === "post" ? o.scheduler = (S) => {
    me(S, u && u.suspense);
  } : i !== "sync" && (h = !0, o.scheduler = (S, L) => {
    L ? S() : gn(S);
  }), o.augmentJob = (S) => {
    t && (S.flags |= 4), h && (S.flags |= 2, u && (S.id = u.uid, S.i = u));
  };
  const y = ml(e, t, o);
  return $t && (d ? d.push(y) : a && y()), y;
}
function wl(e, t, r) {
  const n = this.proxy, s = X(e) ? e.includes(".") ? Ws(n, e) : () => n[e] : e.bind(n, n);
  let i;
  F(t) ? i = t : (i = t.handler, r = t);
  const l = kt(this), o = Us(s, i.bind(n), r);
  return l(), o;
}
function Ws(e, t) {
  const r = t.split(".");
  return () => {
    let n = e;
    for (let s = 0; s < r.length && n; s++) n = n[r[s]];
    return n;
  };
}
var Al = /* @__PURE__ */ Symbol("_vte"), ks = (e) => e.__isTeleport, Te = /* @__PURE__ */ Symbol("_leaveCb"), St = /* @__PURE__ */ Symbol("_enterCb");
function Ol() {
  const e = {
    isMounted: !1,
    isLeaving: !1,
    isUnmounting: !1,
    leavingVNodes: /* @__PURE__ */ new Map()
  };
  return Qs(() => {
    e.isMounted = !0;
  }), ei(() => {
    e.isUnmounting = !0;
  }), e;
}
var Se = [Function, Array], qs = {
  mode: String,
  appear: Boolean,
  persisted: Boolean,
  onBeforeEnter: Se,
  onEnter: Se,
  onAfterEnter: Se,
  onEnterCancelled: Se,
  onBeforeLeave: Se,
  onLeave: Se,
  onAfterLeave: Se,
  onLeaveCancelled: Se,
  onBeforeAppear: Se,
  onAppear: Se,
  onAfterAppear: Se,
  onAppearCancelled: Se
}, Gs = (e) => {
  const t = e.subTree;
  return t.component ? Gs(t.component) : t;
}, Ml = {
  name: "BaseTransition",
  props: qs,
  setup(e, { slots: t }) {
    const r = yn(), n = Ol();
    return () => {
      const s = t.default && zs(t.default(), !0), i = s && s.length ? Js(s) : r.subTree ? bo() : void 0;
      if (!i) return;
      const l = /* @__PURE__ */ H(e), { mode: o } = l;
      if (n.isLeaving) return Dr(i);
      const a = In(i);
      if (!a) return Dr(i);
      let d = qr(a, l, n, r, (h) => d = h);
      a.type !== ae && Ht(a, d);
      let u = r.subTree && In(r.subTree);
      if (u && u.type !== ae && !lt(u, a) && Gs(r).type !== ae) {
        let h = qr(u, l, n, r);
        if (Ht(u, h), o === "out-in" && a.type !== ae)
          return n.isLeaving = !0, h.afterLeave = () => {
            n.isLeaving = !1, r.job.flags & 8 || r.update(), delete h.afterLeave, u = void 0;
          }, Dr(i);
        o === "in-out" && a.type !== ae ? h.delayLeave = (y, S, L) => {
          const P = Ys(n, u);
          P[String(u.key)] = u, y[Te] = () => {
            S(), y[Te] = void 0, delete d.delayedLeave, u = void 0;
          }, d.delayedLeave = () => {
            L(), delete d.delayedLeave, u = void 0;
          };
        } : u = void 0;
      } else u && (u = void 0);
      return i;
    };
  }
};
function Js(e) {
  let t = e[0];
  if (e.length > 1) {
    for (const r of e) if (r.type !== ae) {
      t = r;
      break;
    }
  }
  return t;
}
var Pl = Ml;
function Ys(e, t) {
  const { leavingVNodes: r } = e;
  let n = r.get(t.type);
  return n || (n = /* @__PURE__ */ Object.create(null), r.set(t.type, n)), n;
}
function qr(e, t, r, n, s) {
  const { appear: i, mode: l, persisted: o = !1, onBeforeEnter: a, onEnter: d, onAfterEnter: u, onEnterCancelled: h, onBeforeLeave: y, onLeave: S, onAfterLeave: L, onLeaveCancelled: P, onBeforeAppear: Y, onAppear: B, onAfterAppear: N, onAppearCancelled: j } = t, A = String(e.key), U = Ys(r, e), se = (D, K) => {
    D && we(D, n, 9, K);
  }, ve = (D, K) => {
    const Z = K[1];
    se(D, K), M(D) ? D.every((E) => E.length <= 1) && Z() : D.length <= 1 && Z();
  }, _e = {
    mode: l,
    persisted: o,
    beforeEnter(D) {
      let K = a;
      if (!r.isMounted) if (i) K = Y || a;
      else return;
      D[Te] && D[Te](!0);
      const Z = U[A];
      Z && lt(e, Z) && Z.el[Te] && Z.el[Te](), se(K, [D]);
    },
    enter(D) {
      if (U[A] === e) return;
      let K = d, Z = u, E = h;
      if (!r.isMounted) if (i)
        K = B || d, Z = N || u, E = j || h;
      else return;
      let z = !1;
      D[St] = (je) => {
        z || (z = !0, je ? se(E, [D]) : se(Z, [D]), _e.delayedLeave && _e.delayedLeave(), D[St] = void 0);
      };
      const oe = D[St].bind(null, !1);
      K ? ve(K, [D, oe]) : oe();
    },
    leave(D, K) {
      const Z = String(e.key);
      if (D[St] && D[St](!0), r.isUnmounting) return K();
      se(y, [D]);
      let E = !1;
      D[Te] = (oe) => {
        E || (E = !0, K(), oe ? se(P, [D]) : se(L, [D]), D[Te] = void 0, U[Z] === e && delete U[Z]);
      };
      const z = D[Te].bind(null, !1);
      U[Z] = e, S ? ve(S, [D, z]) : z();
    },
    clone(D) {
      const K = qr(D, t, r, n, s);
      return s && s(K), K;
    }
  };
  return _e;
}
function Dr(e) {
  if (yr(e))
    return e = Qe(e), e.children = null, e;
}
function In(e) {
  if (!yr(e))
    return ks(e.type) && e.children ? Js(e.children) : e;
  if (e.component) return e.component.subTree;
  const { shapeFlag: t, children: r } = e;
  if (r) {
    if (t & 16) return r[0];
    if (t & 32 && F(r.default)) return r.default();
  }
}
function Ht(e, t) {
  e.shapeFlag & 6 && e.component ? (e.transition = t, Ht(e.component.subTree, t)) : e.shapeFlag & 128 ? (e.ssContent.transition = t.clone(e.ssContent), e.ssFallback.transition = t.clone(e.ssFallback)) : e.transition = t;
}
function zs(e, t = !1, r) {
  let n = [], s = 0;
  for (let i = 0; i < e.length; i++) {
    let l = e[i];
    const o = r == null ? l.key : String(r) + String(l.key != null ? l.key : i);
    l.type === xe ? (l.patchFlag & 128 && s++, n = n.concat(zs(l.children, t, o))) : (t || l.type !== ae) && n.push(o != null ? Qe(l, { key: o }) : l);
  }
  if (s > 1) for (let i = 0; i < n.length; i++) n[i].patchFlag = -2;
  return n;
}
// @__NO_SIDE_EFFECTS__
function mf(e, t) {
  return F(e) ? ee({ name: e.name }, t, { setup: e }) : e;
}
function _f() {
  const e = yn();
  return e ? (e.appContext.config.idPrefix || "v") + "-" + e.ids[0] + e.ids[1]++ : "";
}
function Xs(e) {
  e.ids = [
    e.ids[0] + e.ids[2]++ + "-",
    0,
    0
  ];
}
function Fn(e, t) {
  let r;
  return !!((r = Object.getOwnPropertyDescriptor(e, t)) && !r.configurable);
}
var ir = /* @__PURE__ */ new WeakMap();
function It(e, t, r, n, s = !1) {
  if (M(e)) {
    e.forEach((P, Y) => It(P, t && (M(t) ? t[Y] : t), r, n, s));
    return;
  }
  if (vt(n) && !s) {
    n.shapeFlag & 512 && n.type.__asyncResolved && n.component.subTree.component && It(e, t, r, n.component.subTree);
    return;
  }
  const i = n.shapeFlag & 4 ? Tr(n.component) : n.el, l = s ? null : i, { i: o, r: a } = e, d = t && t.r, u = o.refs === W ? o.refs = {} : o.refs, h = o.setupState, y = /* @__PURE__ */ H(h), S = h === W ? ds : (P) => Fn(u, P) ? !1 : V(y, P), L = (P, Y) => !(Y && Fn(u, Y));
  if (d != null && d !== a) {
    if (Ln(t), X(d))
      u[d] = null, S(d) && (h[d] = null);
    else if (/* @__PURE__ */ ce(d)) {
      const P = t;
      L(d, P.k) && (d.value = null), P.k && (u[P.k] = null);
    }
  }
  if (F(a)) Wt(a, o, 12, [l, u]);
  else {
    const P = X(a), Y = /* @__PURE__ */ ce(a);
    if (P || Y) {
      const B = () => {
        if (e.f) {
          const N = P ? S(a) ? h[a] : u[a] : L(a) || !e.k ? a.value : u[e.k];
          if (s) M(N) && tn(N, i);
          else if (M(N)) N.includes(i) || N.push(i);
          else if (P)
            u[a] = [i], S(a) && (h[a] = u[a]);
          else {
            const j = [i];
            L(a, e.k) && (a.value = j), e.k && (u[e.k] = j);
          }
        } else P ? (u[a] = l, S(a) && (h[a] = l)) : Y && (L(a, e.k) && (a.value = l), e.k && (u[e.k] = l));
      };
      if (l) {
        const N = () => {
          B(), ir.delete(e);
        };
        N.id = -1, ir.set(e, N), me(N, r);
      } else
        Ln(e), B();
    }
  }
}
function Ln(e) {
  const t = ir.get(e);
  t && (t.flags |= 8, ir.delete(e));
}
var bf = mr().requestIdleCallback || ((e) => setTimeout(e, 1)), yf = mr().cancelIdleCallback || ((e) => clearTimeout(e)), vt = (e) => !!e.type.__asyncLoader, yr = (e) => e.type.__isKeepAlive;
function Il(e, t) {
  Zs(e, "a", t);
}
function Fl(e, t) {
  Zs(e, "da", t);
}
function Zs(e, t, r = ue) {
  const n = e.__wdc || (e.__wdc = () => {
    let s = r;
    for (; s; ) {
      if (s.isDeactivated) return;
      s = s.parent;
    }
    return e();
  });
  if (xr(t, n, r), r) {
    let s = r.parent;
    for (; s && s.parent; )
      yr(s.parent.vnode) && Ll(n, t, r, s), s = s.parent;
  }
}
function Ll(e, t, r, n) {
  const s = xr(t, e, n, !0);
  ti(() => {
    tn(n[t], s);
  }, r);
}
function xr(e, t, r = ue, n = !1) {
  if (r) {
    const s = r[e] || (r[e] = []), i = t.__weh || (t.__weh = (...l) => {
      ke();
      const o = kt(r), a = we(t, r, e, l);
      return o(), qe(), a;
    });
    return n ? s.unshift(i) : s.push(i), i;
  }
}
var Je = (e) => (t, r = ue) => {
  (!$t || e === "sp") && xr(e, (...n) => t(...n), r);
}, Dl = Je("bm"), Qs = Je("m"), Nl = Je("bu"), Rl = Je("u"), ei = Je("bum"), ti = Je("um"), Hl = Je("sp"), jl = Je("rtg"), Vl = Je("rtc");
function $l(e, t = ue) {
  xr("ec", e, t);
}
var ri = "components", ni = /* @__PURE__ */ Symbol.for("v-ndc");
function xf(e) {
  return X(e) ? Bl(ri, e, !1) || e : e || ni;
}
function Bl(e, t, r = !0, n = !1) {
  const s = le || ue;
  if (s) {
    const i = s.type;
    if (e === ri) {
      const o = Oo(i, !1);
      if (o && (o === t || o === ge(t) || o === vr(ge(t)))) return i;
    }
    const l = Dn(s[e] || i[e], t) || Dn(s.appContext[e], t);
    return !l && n ? i : l;
  }
}
function Dn(e, t) {
  return e && (e[t] || e[ge(t)] || e[vr(ge(t))]);
}
function Cf(e, t, r, n) {
  let s;
  const i = r && r[n], l = M(e);
  if (l || X(e)) {
    const o = l && /* @__PURE__ */ at(e);
    let a = !1, d = !1;
    o && (a = !/* @__PURE__ */ Ee(e), d = /* @__PURE__ */ Ge(e), e = _r(e)), s = new Array(e.length);
    for (let u = 0, h = e.length; u < h; u++) s[u] = t(a ? d ? bt(Pe(e[u])) : Pe(e[u]) : e[u], u, void 0, i && i[u]);
  } else if (typeof e == "number") {
    s = new Array(e);
    for (let o = 0; o < e; o++) s[o] = t(o + 1, o, void 0, i && i[o]);
  } else if ($(e)) if (e[Symbol.iterator]) s = Array.from(e, (o, a) => t(o, a, void 0, i && i[a]));
  else {
    const o = Object.keys(e);
    s = new Array(o.length);
    for (let a = 0, d = o.length; a < d; a++) {
      const u = o[a];
      s[a] = t(e[u], u, a, i && i[a]);
    }
  }
  else s = [];
  return r && (r[n] = s), s;
}
function Sf(e, t, r = {}, n, s) {
  if (le.ce || le.parent && vt(le.parent) && le.parent.ce) {
    const d = Object.keys(r).length > 0;
    return t !== "default" && (r.name = t), Xr(), Zr(xe, null, [pe("slot", r, n && n())], d ? -2 : 64);
  }
  let i = e[t];
  i && i._c && (i._d = !1), Xr();
  const l = i && si(i(r)), o = r.key || l && l.key, a = Zr(xe, { key: (o && !Me(o) ? o : `_${t}`) + (!l && n ? "_fb" : "") }, l || (n ? n() : []), l && e._ === 1 ? 64 : -2);
  return !s && a.scopeId && (a.slotScopeIds = [a.scopeId + "-s"]), i && i._c && (i._d = !0), a;
}
function si(e) {
  return e.some((t) => Vt(t) ? !(t.type === ae || t.type === xe && !si(t.children)) : !0) ? e : null;
}
var Gr = (e) => e ? Ti(e) ? Tr(e) : Gr(e.parent) : null, Ft = /* @__PURE__ */ ee(/* @__PURE__ */ Object.create(null), {
  $: (e) => e,
  $el: (e) => e.vnode.el,
  $data: (e) => e.data,
  $props: (e) => e.props,
  $attrs: (e) => e.attrs,
  $slots: (e) => e.slots,
  $refs: (e) => e.refs,
  $parent: (e) => Gr(e.parent),
  $root: (e) => Gr(e.root),
  $host: (e) => e.ce,
  $emit: (e) => e.emit,
  $options: (e) => vn(e),
  $forceUpdate: (e) => e.f || (e.f = () => {
    gn(e.update);
  }),
  $nextTick: (e) => e.n || (e.n = bl.bind(e.proxy)),
  $watch: (e) => wl.bind(e)
}), Nr = (e, t) => e !== W && !e.__isScriptSetup && V(e, t), Kl = {
  get({ _: e }, t) {
    if (t === "__v_skip") return !0;
    const { ctx: r, setupState: n, data: s, props: i, accessCache: l, type: o, appContext: a } = e;
    if (t[0] !== "$") {
      const y = l[t];
      if (y !== void 0) switch (y) {
        case 1:
          return n[t];
        case 2:
          return s[t];
        case 4:
          return r[t];
        case 3:
          return i[t];
      }
      else {
        if (Nr(n, t))
          return l[t] = 1, n[t];
        if (s !== W && V(s, t))
          return l[t] = 2, s[t];
        if (V(i, t))
          return l[t] = 3, i[t];
        if (r !== W && V(r, t))
          return l[t] = 4, r[t];
        Jr && (l[t] = 0);
      }
    }
    const d = Ft[t];
    let u, h;
    if (d)
      return t === "$attrs" && fe(e.attrs, "get", ""), d(e);
    if ((u = o.__cssModules) && (u = u[t])) return u;
    if (r !== W && V(r, t))
      return l[t] = 4, r[t];
    if (h = a.config.globalProperties, V(h, t)) return h[t];
  },
  set({ _: e }, t, r) {
    const { data: n, setupState: s, ctx: i } = e;
    return Nr(s, t) ? (s[t] = r, !0) : n !== W && V(n, t) ? (n[t] = r, !0) : V(e.props, t) || t[0] === "$" && t.slice(1) in e ? !1 : (i[t] = r, !0);
  },
  has({ _: { data: e, setupState: t, accessCache: r, ctx: n, appContext: s, props: i, type: l } }, o) {
    let a;
    return !!(r[o] || e !== W && o[0] !== "$" && V(e, o) || Nr(t, o) || V(i, o) || V(n, o) || V(Ft, o) || V(s.config.globalProperties, o) || (a = l.__cssModules) && a[o]);
  },
  defineProperty(e, t, r) {
    return r.get != null ? e._.accessCache[t] = 0 : V(r, "value") && this.set(e, t, r.value, null), Reflect.defineProperty(e, t, r);
  }
};
function Nn(e) {
  return M(e) ? e.reduce((t, r) => (t[r] = null, t), {}) : e;
}
var Jr = !0;
function Ul(e) {
  const t = vn(e), r = e.proxy, n = e.ctx;
  Jr = !1, t.beforeCreate && Rn(t.beforeCreate, e, "bc");
  const { data: s, computed: i, methods: l, watch: o, provide: a, inject: d, created: u, beforeMount: h, mounted: y, beforeUpdate: S, updated: L, activated: P, deactivated: Y, beforeDestroy: B, beforeUnmount: N, destroyed: j, unmounted: A, render: U, renderTracked: se, renderTriggered: ve, errorCaptured: _e, serverPrefetch: D, expose: K, inheritAttrs: Z, components: E, directives: z, filters: oe } = t;
  if (d && Wl(d, n, null), l) for (const Q in l) {
    const k = l[Q];
    F(k) && (n[Q] = k.bind(r));
  }
  if (s) {
    const Q = s.call(r, r);
    $(Q) && (e.data = /* @__PURE__ */ dn(Q));
  }
  if (Jr = !0, i) for (const Q in i) {
    const k = i[Q], Ye = Po({
      get: F(k) ? k.bind(r, r) : F(k.get) ? k.get.bind(r, r) : He,
      set: !F(k) && F(k.set) ? k.set.bind(r) : He
    });
    Object.defineProperty(n, Q, {
      enumerable: !0,
      configurable: !0,
      get: () => Ye.value,
      set: (qt) => Ye.value = qt
    });
  }
  if (o) for (const Q in o) ii(o[Q], n, r, Q);
  if (a) {
    const Q = F(a) ? a.call(r) : a;
    Reflect.ownKeys(Q).forEach((k) => {
      Sl(k, Q[k]);
    });
  }
  u && Rn(u, e, "c");
  function ne(Q, k) {
    M(k) ? k.forEach((Ye) => Q(Ye.bind(r))) : k && Q(k.bind(r));
  }
  if (ne(Dl, h), ne(Qs, y), ne(Nl, S), ne(Rl, L), ne(Il, P), ne(Fl, Y), ne($l, _e), ne(Vl, se), ne(jl, ve), ne(ei, N), ne(ti, A), ne(Hl, D), M(K))
    if (K.length) {
      const Q = e.exposed || (e.exposed = {});
      K.forEach((k) => {
        Object.defineProperty(Q, k, {
          get: () => r[k],
          set: (Ye) => r[k] = Ye,
          enumerable: !0
        });
      });
    } else e.exposed || (e.exposed = {});
  U && e.render === He && (e.render = U), Z != null && (e.inheritAttrs = Z), E && (e.components = E), z && (e.directives = z), D && Xs(e);
}
function Wl(e, t, r = He) {
  M(e) && (e = Yr(e));
  for (const n in e) {
    const s = e[n];
    let i;
    $(s) ? "default" in s ? i = Qt(s.from || n, s.default, !0) : i = Qt(s.from || n) : i = Qt(s), /* @__PURE__ */ ce(i) ? Object.defineProperty(t, n, {
      enumerable: !0,
      configurable: !0,
      get: () => i.value,
      set: (l) => i.value = l
    }) : t[n] = i;
  }
}
function Rn(e, t, r) {
  we(M(e) ? e.map((n) => n.bind(t.proxy)) : e.bind(t.proxy), t, r);
}
function ii(e, t, r, n) {
  let s = n.includes(".") ? Ws(r, n) : () => r[n];
  if (X(e)) {
    const i = t[e];
    F(i) && Lr(s, i);
  } else if (F(e)) Lr(s, e.bind(r));
  else if ($(e)) if (M(e)) e.forEach((i) => ii(i, t, r, n));
  else {
    const i = F(e.handler) ? e.handler.bind(r) : t[e.handler];
    F(i) && Lr(s, i, e);
  }
}
function vn(e) {
  const t = e.type, { mixins: r, extends: n } = t, { mixins: s, optionsCache: i, config: { optionMergeStrategies: l } } = e.appContext, o = i.get(t);
  let a;
  return o ? a = o : !s.length && !r && !n ? a = t : (a = {}, s.length && s.forEach((d) => lr(a, d, l, !0)), lr(a, t, l)), $(t) && i.set(t, a), a;
}
function lr(e, t, r, n = !1) {
  const { mixins: s, extends: i } = t;
  i && lr(e, i, r, !0), s && s.forEach((l) => lr(e, l, r, !0));
  for (const l in t) if (!(n && l === "expose")) {
    const o = kl[l] || r && r[l];
    e[l] = o ? o(e[l], t[l]) : t[l];
  }
  return e;
}
var kl = {
  data: Hn,
  props: jn,
  emits: jn,
  methods: wt,
  computed: wt,
  beforeCreate: de,
  created: de,
  beforeMount: de,
  mounted: de,
  beforeUpdate: de,
  updated: de,
  beforeDestroy: de,
  beforeUnmount: de,
  destroyed: de,
  unmounted: de,
  activated: de,
  deactivated: de,
  errorCaptured: de,
  serverPrefetch: de,
  components: wt,
  directives: wt,
  watch: Gl,
  provide: Hn,
  inject: ql
};
function Hn(e, t) {
  return t ? e ? function() {
    return ee(F(e) ? e.call(this, this) : e, F(t) ? t.call(this, this) : t);
  } : t : e;
}
function ql(e, t) {
  return wt(Yr(e), Yr(t));
}
function Yr(e) {
  if (M(e)) {
    const t = {};
    for (let r = 0; r < e.length; r++) t[e[r]] = e[r];
    return t;
  }
  return e;
}
function de(e, t) {
  return e ? [...new Set([].concat(e, t))] : t;
}
function wt(e, t) {
  return e ? ee(/* @__PURE__ */ Object.create(null), e, t) : t;
}
function jn(e, t) {
  return e ? M(e) && M(t) ? [.../* @__PURE__ */ new Set([...e, ...t])] : ee(/* @__PURE__ */ Object.create(null), Nn(e), Nn(t ?? {})) : t;
}
function Gl(e, t) {
  if (!e) return t;
  if (!t) return e;
  const r = ee(/* @__PURE__ */ Object.create(null), e);
  for (const n in t) r[n] = de(e[n], t[n]);
  return r;
}
function li() {
  return {
    app: null,
    config: {
      isNativeTag: ds,
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
var Jl = 0;
function Yl(e, t) {
  return function(n, s = null) {
    F(n) || (n = ee({}, n)), s != null && !$(s) && (s = null);
    const i = li(), l = /* @__PURE__ */ new WeakSet(), o = [];
    let a = !1;
    const d = i.app = {
      _uid: Jl++,
      _component: n,
      _props: s,
      _container: null,
      _context: i,
      _instance: null,
      version: Fo,
      get config() {
        return i.config;
      },
      set config(u) {
      },
      use(u, ...h) {
        return l.has(u) || (u && F(u.install) ? (l.add(u), u.install(d, ...h)) : F(u) && (l.add(u), u(d, ...h))), d;
      },
      mixin(u) {
        return i.mixins.includes(u) || i.mixins.push(u), d;
      },
      component(u, h) {
        return h ? (i.components[u] = h, d) : i.components[u];
      },
      directive(u, h) {
        return h ? (i.directives[u] = h, d) : i.directives[u];
      },
      mount(u, h, y) {
        if (!a) {
          const S = d._ceVNode || pe(n, s);
          return S.appContext = i, y === !0 ? y = "svg" : y === !1 && (y = void 0), h && t ? t(S, u) : e(S, u, y), a = !0, d._container = u, u.__vue_app__ = d, Tr(S.component);
        }
      },
      onUnmount(u) {
        o.push(u);
      },
      unmount() {
        a && (we(o, d._instance, 16), e(null, d._container), delete d._container.__vue_app__);
      },
      provide(u, h) {
        return i.provides[u] = h, d;
      },
      runWithContext(u) {
        const h = mt;
        mt = d;
        try {
          return u();
        } finally {
          mt = h;
        }
      }
    };
    return d;
  };
}
var mt = null, zl = (e, t) => t === "modelValue" || t === "model-value" ? e.modelModifiers : e[`${t}Modifiers`] || e[`${ge(t)}Modifiers`] || e[`${et(t)}Modifiers`];
function Xl(e, t, ...r) {
  if (e.isUnmounted) return;
  const n = e.vnode.props || W;
  let s = r;
  const i = t.startsWith("update:"), l = i && zl(n, t.slice(7));
  l && (l.trim && (s = r.map((u) => X(u) ? u.trim() : u)), l.number && (s = r.map(nn)));
  let o, a = n[o = Or(t)] || n[o = Or(ge(t))];
  !a && i && (a = n[o = Or(et(t))]), a && we(a, e, 6, s);
  const d = n[o + "Once"];
  if (d) {
    if (!e.emitted) e.emitted = {};
    else if (e.emitted[o]) return;
    e.emitted[o] = !0, we(d, e, 6, s);
  }
}
var Zl = /* @__PURE__ */ new WeakMap();
function oi(e, t, r = !1) {
  const n = r ? Zl : t.emitsCache, s = n.get(e);
  if (s !== void 0) return s;
  const i = e.emits;
  let l = {}, o = !1;
  if (!F(e)) {
    const a = (d) => {
      const u = oi(d, t, !0);
      u && (o = !0, ee(l, u));
    };
    !r && t.mixins.length && t.mixins.forEach(a), e.extends && a(e.extends), e.mixins && e.mixins.forEach(a);
  }
  return !i && !o ? ($(e) && n.set(e, null), null) : (M(i) ? i.forEach((a) => l[a] = null) : ee(l, i), $(e) && n.set(e, l), l);
}
function Cr(e, t) {
  return !e || !dr(t) ? !1 : (t = t.slice(2).replace(/Once$/, ""), V(e, t[0].toLowerCase() + t.slice(1)) || V(e, et(t)) || V(e, t));
}
function Rr(e) {
  const { type: t, vnode: r, proxy: n, withProxy: s, propsOptions: [i], slots: l, attrs: o, emit: a, render: d, renderCache: u, props: h, data: y, setupState: S, ctx: L, inheritAttrs: P } = e, Y = sr(e);
  let B, N;
  try {
    if (r.shapeFlag & 4) {
      const A = s || n, U = A;
      B = Ne(d.call(U, A, u, h, S, y, L)), N = o;
    } else {
      const A = t;
      B = Ne(A.length > 1 ? A(h, {
        attrs: o,
        slots: l,
        emit: a
      }) : A(h, null)), N = t.props ? o : Ql(o);
    }
  } catch (A) {
    Lt.length = 0, br(A, e, 1), B = pe(ae);
  }
  let j = B;
  if (N && P !== !1) {
    const A = Object.keys(N), { shapeFlag: U } = j;
    A.length && U & 7 && (i && A.some(hr) && (N = eo(N, i)), j = Qe(j, N, !1, !0));
  }
  return r.dirs && (j = Qe(j, null, !1, !0), j.dirs = j.dirs ? j.dirs.concat(r.dirs) : r.dirs), r.transition && Ht(j, r.transition), B = j, sr(Y), B;
}
var Ql = (e) => {
  let t;
  for (const r in e) (r === "class" || r === "style" || dr(r)) && ((t || (t = {}))[r] = e[r]);
  return t;
}, eo = (e, t) => {
  const r = {};
  for (const n in e) (!hr(n) || !(n.slice(9) in t)) && (r[n] = e[n]);
  return r;
};
function to(e, t, r) {
  const { props: n, children: s, component: i } = e, { props: l, children: o, patchFlag: a } = t, d = i.emitsOptions;
  if (t.dirs || t.transition) return !0;
  if (r && a >= 0) {
    if (a & 1024) return !0;
    if (a & 16)
      return n ? Vn(n, l, d) : !!l;
    if (a & 8) {
      const u = t.dynamicProps;
      for (let h = 0; h < u.length; h++) {
        const y = u[h];
        if (fi(l, n, y) && !Cr(d, y)) return !0;
      }
    }
  } else
    return (s || o) && (!o || !o.$stable) ? !0 : n === l ? !1 : n ? l ? Vn(n, l, d) : !0 : !!l;
  return !1;
}
function Vn(e, t, r) {
  const n = Object.keys(t);
  if (n.length !== Object.keys(e).length) return !0;
  for (let s = 0; s < n.length; s++) {
    const i = n[s];
    if (fi(t, e, i) && !Cr(r, i)) return !0;
  }
  return !1;
}
function fi(e, t, r) {
  const n = e[r], s = t[r];
  return r === "style" && $(n) && $(s) ? !Ut(n, s) : n !== s;
}
function ro({ vnode: e, parent: t, suspense: r }, n) {
  for (; t; ) {
    const s = t.subTree;
    if (s.suspense && s.suspense.activeBranch === e && (s.suspense.vnode.el = s.el = n, e = s), s === e)
      (e = t.vnode).el = n, t = t.parent;
    else break;
  }
  r && r.activeBranch === e && (r.vnode.el = n);
}
var ai = {}, ui = () => Object.create(ai), ci = (e) => Object.getPrototypeOf(e) === ai;
function no(e, t, r, n = !1) {
  const s = {}, i = ui();
  e.propsDefaults = /* @__PURE__ */ Object.create(null), di(e, t, s, i);
  for (const l in e.propsOptions[0]) l in s || (s[l] = void 0);
  r ? e.props = n ? s : /* @__PURE__ */ al(s) : e.type.props ? e.props = s : e.props = i, e.attrs = i;
}
function so(e, t, r, n) {
  const { props: s, attrs: i, vnode: { patchFlag: l } } = e, o = /* @__PURE__ */ H(s), [a] = e.propsOptions;
  let d = !1;
  if ((n || l > 0) && !(l & 16)) {
    if (l & 8) {
      const u = e.vnode.dynamicProps;
      for (let h = 0; h < u.length; h++) {
        let y = u[h];
        if (Cr(e.emitsOptions, y)) continue;
        const S = t[y];
        if (a) if (V(i, y))
          S !== i[y] && (i[y] = S, d = !0);
        else {
          const L = ge(y);
          s[L] = zr(a, o, L, S, e, !1);
        }
        else S !== i[y] && (i[y] = S, d = !0);
      }
    }
  } else {
    di(e, t, s, i) && (d = !0);
    let u;
    for (const h in o) (!t || !V(t, h) && ((u = et(h)) === h || !V(t, u))) && (a ? r && (r[h] !== void 0 || r[u] !== void 0) && (s[h] = zr(a, o, h, void 0, e, !0)) : delete s[h]);
    if (i !== o)
      for (const h in i) (!t || !V(t, h)) && (delete i[h], d = !0);
  }
  d && Ue(e.attrs, "set", "");
}
function di(e, t, r, n) {
  const [s, i] = e.propsOptions;
  let l = !1, o;
  if (t) for (let a in t) {
    if (Ot(a)) continue;
    const d = t[a];
    let u;
    s && V(s, u = ge(a)) ? !i || !i.includes(u) ? r[u] = d : (o || (o = {}))[u] = d : Cr(e.emitsOptions, a) || (!(a in n) || d !== n[a]) && (n[a] = d, l = !0);
  }
  if (i) {
    const a = /* @__PURE__ */ H(r), d = o || W;
    for (let u = 0; u < i.length; u++) {
      const h = i[u];
      r[h] = zr(s, a, h, d[h], e, !V(d, h));
    }
  }
  return l;
}
function zr(e, t, r, n, s, i) {
  const l = e[r];
  if (l != null) {
    const o = V(l, "default");
    if (o && n === void 0) {
      const a = l.default;
      if (l.type !== Function && !l.skipFactory && F(a)) {
        const { propsDefaults: d } = s;
        if (r in d) n = d[r];
        else {
          const u = kt(s);
          n = d[r] = a.call(null, t), u();
        }
      } else n = a;
      s.ce && s.ce._setProp(r, n);
    }
    l[0] && (i && !o ? n = !1 : l[1] && (n === "" || n === et(r)) && (n = !0));
  }
  return n;
}
var io = /* @__PURE__ */ new WeakMap();
function hi(e, t, r = !1) {
  const n = r ? io : t.propsCache, s = n.get(e);
  if (s) return s;
  const i = e.props, l = {}, o = [];
  let a = !1;
  if (!F(e)) {
    const u = (h) => {
      a = !0;
      const [y, S] = hi(h, t, !0);
      ee(l, y), S && o.push(...S);
    };
    !r && t.mixins.length && t.mixins.forEach(u), e.extends && u(e.extends), e.mixins && e.mixins.forEach(u);
  }
  if (!i && !a)
    return $(e) && n.set(e, ht), ht;
  if (M(i)) for (let u = 0; u < i.length; u++) {
    const h = ge(i[u]);
    $n(h) && (l[h] = W);
  }
  else if (i) for (const u in i) {
    const h = ge(u);
    if ($n(h)) {
      const y = i[u], S = l[h] = M(y) || F(y) ? { type: y } : ee({}, y), L = S.type;
      let P = !1, Y = !0;
      if (M(L)) for (let B = 0; B < L.length; ++B) {
        const N = L[B], j = F(N) && N.name;
        if (j === "Boolean") {
          P = !0;
          break;
        } else j === "String" && (Y = !1);
      }
      else P = F(L) && L.name === "Boolean";
      S[0] = P, S[1] = Y, (P || V(S, "default")) && o.push(h);
    }
  }
  const d = [l, o];
  return $(e) && n.set(e, d), d;
}
function $n(e) {
  return e[0] !== "$" && !Ot(e);
}
var mn = (e) => e === "_" || e === "_ctx" || e === "$stable", _n = (e) => M(e) ? e.map(Ne) : [Ne(e)], lo = (e, t, r) => {
  if (t._n) return t;
  const n = Cl((...s) => _n(t(...s)), r);
  return n._c = !1, n;
}, pi = (e, t, r) => {
  const n = e._ctx;
  for (const s in e) {
    if (mn(s)) continue;
    const i = e[s];
    if (F(i)) t[s] = lo(s, i, n);
    else if (i != null) {
      const l = _n(i);
      t[s] = () => l;
    }
  }
}, gi = (e, t) => {
  const r = _n(t);
  e.slots.default = () => r;
}, vi = (e, t, r) => {
  for (const n in t) (r || !mn(n)) && (e[n] = t[n]);
}, oo = (e, t, r) => {
  const n = e.slots = ui();
  if (e.vnode.shapeFlag & 32) {
    const s = t._;
    s ? (vi(n, t, r), r && vs(n, "_", s, !0)) : pi(t, n);
  } else t && gi(e, t);
}, fo = (e, t, r) => {
  const { vnode: n, slots: s } = e;
  let i = !0, l = W;
  if (n.shapeFlag & 32) {
    const o = t._;
    o ? r && o === 1 ? i = !1 : vi(s, t, r) : (i = !t.$stable, pi(t, s)), l = t;
  } else t && (gi(e, t), l = { default: 1 });
  if (i)
    for (const o in s) !mn(o) && l[o] == null && delete s[o];
}, me = po;
function ao(e) {
  return uo(e);
}
function uo(e, t) {
  const r = mr();
  r.__VUE__ = !0;
  const { insert: n, remove: s, patchProp: i, createElement: l, createText: o, createComment: a, setText: d, setElementText: u, parentNode: h, nextSibling: y, setScopeId: S = He, insertStaticContent: L } = e, P = (f, c, p, _ = null, v = null, g = null, C = void 0, x = null, b = !!c.dynamicChildren) => {
    if (f === c) return;
    f && !lt(f, c) && (_ = Jt(f), ze(f, v, g, !0), f = null), c.patchFlag === -2 && (b = !1, c.dynamicChildren = null);
    const { type: m, ref: O, shapeFlag: T } = c;
    switch (m) {
      case Sr:
        Y(f, c, p, _);
        break;
      case ae:
        B(f, c, p, _);
        break;
      case er:
        f == null && N(c, p, _, C);
        break;
      case xe:
        E(f, c, p, _, v, g, C, x, b);
        break;
      default:
        T & 1 ? U(f, c, p, _, v, g, C, x, b) : T & 6 ? z(f, c, p, _, v, g, C, x, b) : (T & 64 || T & 128) && m.process(f, c, p, _, v, g, C, x, b, ut);
    }
    O != null && v ? It(O, f && f.ref, g, c || f, !c) : O == null && f && f.ref != null && It(f.ref, null, g, f, !0);
  }, Y = (f, c, p, _) => {
    if (f == null) n(c.el = o(c.children), p, _);
    else {
      const v = c.el = f.el;
      c.children !== f.children && d(v, c.children);
    }
  }, B = (f, c, p, _) => {
    f == null ? n(c.el = a(c.children || ""), p, _) : c.el = f.el;
  }, N = (f, c, p, _) => {
    [f.el, f.anchor] = L(f.children, c, p, _, f.el, f.anchor);
  }, j = ({ el: f, anchor: c }, p, _) => {
    let v;
    for (; f && f !== c; )
      v = y(f), n(f, p, _), f = v;
    n(c, p, _);
  }, A = ({ el: f, anchor: c }) => {
    let p;
    for (; f && f !== c; )
      p = y(f), s(f), f = p;
    s(c);
  }, U = (f, c, p, _, v, g, C, x, b) => {
    if (c.type === "svg" ? C = "svg" : c.type === "math" && (C = "mathml"), f == null) se(c, p, _, v, g, C, x, b);
    else {
      const m = f.el && f.el._isVueCE ? f.el : null;
      try {
        m && m._beginPatch(), D(f, c, v, g, C, x, b);
      } finally {
        m && m._endPatch();
      }
    }
  }, se = (f, c, p, _, v, g, C, x) => {
    let b, m;
    const { props: O, shapeFlag: T, transition: w, dirs: I } = f;
    if (b = f.el = l(f.type, g, O && O.is, O), T & 8 ? u(b, f.children) : T & 16 && _e(f.children, b, null, _, v, Hr(f, g), C, x), I && tt(f, null, _, "created"), ve(b, f, f.scopeId, C, _), O) {
      for (const q in O) q !== "value" && !Ot(q) && i(b, q, null, O[q], g, _);
      "value" in O && i(b, "value", null, O.value, g), (m = O.onVnodeBeforeMount) && Fe(m, _, f);
    }
    I && tt(f, null, _, "beforeMount");
    const R = co(v, w);
    R && w.beforeEnter(b), n(b, c, p), ((m = O && O.onVnodeMounted) || R || I) && me(() => {
      m && Fe(m, _, f), R && w.enter(b), I && tt(f, null, _, "mounted");
    }, v);
  }, ve = (f, c, p, _, v) => {
    if (p && S(f, p), _) for (let g = 0; g < _.length; g++) S(f, _[g]);
    if (v) {
      let g = v.subTree;
      if (c === g || yi(g.type) && (g.ssContent === c || g.ssFallback === c)) {
        const C = v.vnode;
        ve(f, C, C.scopeId, C.slotScopeIds, v.parent);
      }
    }
  }, _e = (f, c, p, _, v, g, C, x, b = 0) => {
    for (let m = b; m < f.length; m++) P(null, f[m] = x ? Ke(f[m]) : Ne(f[m]), c, p, _, v, g, C, x);
  }, D = (f, c, p, _, v, g, C) => {
    const x = c.el = f.el;
    let { patchFlag: b, dynamicChildren: m, dirs: O } = c;
    b |= f.patchFlag & 16;
    const T = f.props || W, w = c.props || W;
    let I;
    if (p && rt(p, !1), (I = w.onVnodeBeforeUpdate) && Fe(I, p, c, f), O && tt(c, f, p, "beforeUpdate"), p && rt(p, !0), (T.innerHTML && w.innerHTML == null || T.textContent && w.textContent == null) && u(x, ""), m ? K(f.dynamicChildren, m, x, p, _, Hr(c, v), g) : C || k(f, c, x, null, p, _, Hr(c, v), g, !1), b > 0) {
      if (b & 16) Z(x, T, w, p, v);
      else if (b & 2 && T.class !== w.class && i(x, "class", null, w.class, v), b & 4 && i(x, "style", T.style, w.style, v), b & 8) {
        const R = c.dynamicProps;
        for (let q = 0; q < R.length; q++) {
          const G = R[q], te = T[G], re = w[G];
          (re !== te || G === "value") && i(x, G, te, re, v, p);
        }
      }
      b & 1 && f.children !== c.children && u(x, c.children);
    } else !C && m == null && Z(x, T, w, p, v);
    ((I = w.onVnodeUpdated) || O) && me(() => {
      I && Fe(I, p, c, f), O && tt(c, f, p, "updated");
    }, _);
  }, K = (f, c, p, _, v, g, C) => {
    for (let x = 0; x < c.length; x++) {
      const b = f[x], m = c[x];
      P(b, m, b.el && (b.type === xe || !lt(b, m) || b.shapeFlag & 198) ? h(b.el) : p, null, _, v, g, C, !0);
    }
  }, Z = (f, c, p, _, v) => {
    if (c !== p) {
      if (c !== W)
        for (const g in c) !Ot(g) && !(g in p) && i(f, g, c[g], null, v, _);
      for (const g in p) {
        if (Ot(g)) continue;
        const C = p[g], x = c[g];
        C !== x && g !== "value" && i(f, g, x, C, v, _);
      }
      "value" in p && i(f, "value", c.value, p.value, v);
    }
  }, E = (f, c, p, _, v, g, C, x, b) => {
    const m = c.el = f ? f.el : o(""), O = c.anchor = f ? f.anchor : o("");
    let { patchFlag: T, dynamicChildren: w, slotScopeIds: I } = c;
    I && (x = x ? x.concat(I) : I), f == null ? (n(m, p, _), n(O, p, _), _e(c.children || [], p, O, v, g, C, x, b)) : T > 0 && T & 64 && w && f.dynamicChildren && f.dynamicChildren.length === w.length ? (K(f.dynamicChildren, w, p, v, g, C, x), (c.key != null || v && c === v.subTree) && mi(f, c, !0)) : k(f, c, p, O, v, g, C, x, b);
  }, z = (f, c, p, _, v, g, C, x, b) => {
    c.slotScopeIds = x, f == null ? c.shapeFlag & 512 ? v.ctx.activate(c, p, _, C, b) : oe(c, p, _, v, g, C, b) : je(f, c, b);
  }, oe = (f, c, p, _, v, g, C) => {
    const x = f.component = So(f, _, v);
    if (yr(f) && (x.ctx.renderer = ut), To(x, !1, C), x.asyncDep) {
      if (v && v.registerDep(x, ne, C), !f.el) {
        const b = x.subTree = pe(ae);
        B(null, b, c, p), f.placeholder = b.el;
      }
    } else ne(x, f, c, p, v, g, C);
  }, je = (f, c, p) => {
    const _ = c.component = f.component;
    if (to(f, c, p)) if (_.asyncDep && !_.asyncResolved) {
      Q(_, c, p);
      return;
    } else
      _.next = c, _.update();
    else
      c.el = f.el, _.vnode = c;
  }, ne = (f, c, p, _, v, g, C) => {
    const x = () => {
      if (f.isMounted) {
        let { next: T, bu: w, u: I, parent: R, vnode: q } = f;
        {
          const be = _i(f);
          if (be) {
            T && (T.el = q.el, Q(f, T, C)), be.asyncDep.then(() => {
              me(() => {
                f.isUnmounted || m();
              }, v);
            });
            return;
          }
        }
        let G = T, te;
        rt(f, !1), T ? (T.el = q.el, Q(f, T, C)) : T = q, w && Zt(w), (te = T.props && T.props.onVnodeBeforeUpdate) && Fe(te, R, T, q), rt(f, !0);
        const re = Rr(f), Ae = f.subTree;
        f.subTree = re, P(Ae, re, h(Ae.el), Jt(Ae), f, v, g), T.el = re.el, G === null && ro(f, re.el), I && me(I, v), (te = T.props && T.props.onVnodeUpdated) && me(() => Fe(te, R, T, q), v);
      } else {
        let T;
        const { el: w, props: I } = c, { bm: R, m: q, parent: G, root: te, type: re } = f, Ae = vt(c);
        if (rt(f, !1), R && Zt(R), !Ae && (T = I && I.onVnodeBeforeMount) && Fe(T, G, c), rt(f, !0), w && Ar) {
          const be = () => {
            f.subTree = Rr(f), Ar(w, f.subTree, f, v, null);
          };
          Ae && re.__asyncHydrate ? re.__asyncHydrate(w, f, be) : be();
        } else {
          te.ce && te.ce._hasShadowRoot() && te.ce._injectChildStyle(re, f.parent ? f.parent.type : void 0);
          const be = f.subTree = Rr(f);
          P(null, be, p, _, f, v, g), c.el = be.el;
        }
        if (q && me(q, v), !Ae && (T = I && I.onVnodeMounted)) {
          const be = c;
          me(() => Fe(T, G, be), v);
        }
        (c.shapeFlag & 256 || G && vt(G.vnode) && G.vnode.shapeFlag & 256) && f.a && me(f.a, v), f.isMounted = !0, c = p = _ = null;
      }
    };
    f.scope.on();
    const b = f.effect = new Cs(x);
    f.scope.off();
    const m = f.update = b.run.bind(b), O = f.job = b.runIfDirty.bind(b);
    O.i = f, O.id = f.uid, b.scheduler = () => gn(O), rt(f, !0), m();
  }, Q = (f, c, p) => {
    c.component = f;
    const _ = f.vnode.props;
    f.vnode = c, f.next = null, so(f, c.props, _, p), fo(f, c.children, p), ke(), Pn(f), qe();
  }, k = (f, c, p, _, v, g, C, x, b = !1) => {
    const m = f && f.children, O = f ? f.shapeFlag : 0, T = c.children, { patchFlag: w, shapeFlag: I } = c;
    if (w > 0) {
      if (w & 128) {
        qt(m, T, p, _, v, g, C, x, b);
        return;
      } else if (w & 256) {
        Ye(m, T, p, _, v, g, C, x, b);
        return;
      }
    }
    I & 8 ? (O & 16 && yt(m, v, g), T !== m && u(p, T)) : O & 16 ? I & 16 ? qt(m, T, p, _, v, g, C, x, b) : yt(m, v, g, !0) : (O & 8 && u(p, ""), I & 16 && _e(T, p, _, v, g, C, x, b));
  }, Ye = (f, c, p, _, v, g, C, x, b) => {
    f = f || ht, c = c || ht;
    const m = f.length, O = c.length, T = Math.min(m, O);
    let w;
    for (w = 0; w < T; w++) {
      const I = c[w] = b ? Ke(c[w]) : Ne(c[w]);
      P(f[w], I, p, null, v, g, C, x, b);
    }
    m > O ? yt(f, v, g, !0, !1, T) : _e(c, p, _, v, g, C, x, b, T);
  }, qt = (f, c, p, _, v, g, C, x, b) => {
    let m = 0;
    const O = c.length;
    let T = f.length - 1, w = O - 1;
    for (; m <= T && m <= w; ) {
      const I = f[m], R = c[m] = b ? Ke(c[m]) : Ne(c[m]);
      if (lt(I, R)) P(I, R, p, null, v, g, C, x, b);
      else break;
      m++;
    }
    for (; m <= T && m <= w; ) {
      const I = f[T], R = c[w] = b ? Ke(c[w]) : Ne(c[w]);
      if (lt(I, R)) P(I, R, p, null, v, g, C, x, b);
      else break;
      T--, w--;
    }
    if (m > T) {
      if (m <= w) {
        const I = w + 1, R = I < O ? c[I].el : _;
        for (; m <= w; )
          P(null, c[m] = b ? Ke(c[m]) : Ne(c[m]), p, R, v, g, C, x, b), m++;
      }
    } else if (m > w) for (; m <= T; )
      ze(f[m], v, g, !0), m++;
    else {
      const I = m, R = m, q = /* @__PURE__ */ new Map();
      for (m = R; m <= w; m++) {
        const ye = c[m] = b ? Ke(c[m]) : Ne(c[m]);
        ye.key != null && q.set(ye.key, m);
      }
      let G, te = 0;
      const re = w - R + 1;
      let Ae = !1, be = 0;
      const xt = new Array(re);
      for (m = 0; m < re; m++) xt[m] = 0;
      for (m = I; m <= T; m++) {
        const ye = f[m];
        if (te >= re) {
          ze(ye, v, g, !0);
          continue;
        }
        let Ie;
        if (ye.key != null) Ie = q.get(ye.key);
        else for (G = R; G <= w; G++) if (xt[G - R] === 0 && lt(ye, c[G])) {
          Ie = G;
          break;
        }
        Ie === void 0 ? ze(ye, v, g, !0) : (xt[Ie - R] = m + 1, Ie >= be ? be = Ie : Ae = !0, P(ye, c[Ie], p, null, v, g, C, x, b), te++);
      }
      const Sn = Ae ? ho(xt) : ht;
      for (G = Sn.length - 1, m = re - 1; m >= 0; m--) {
        const ye = R + m, Ie = c[ye], Tn = c[ye + 1], En = ye + 1 < O ? Tn.el || bi(Tn) : _;
        xt[m] === 0 ? P(null, Ie, p, En, v, g, C, x, b) : Ae && (G < 0 || m !== Sn[G] ? Gt(Ie, p, En, 2) : G--);
      }
    }
  }, Gt = (f, c, p, _, v = null) => {
    const { el: g, type: C, transition: x, children: b, shapeFlag: m } = f;
    if (m & 6) {
      Gt(f.component.subTree, c, p, _);
      return;
    }
    if (m & 128) {
      f.suspense.move(c, p, _);
      return;
    }
    if (m & 64) {
      C.move(f, c, p, ut);
      return;
    }
    if (C === xe) {
      n(g, c, p);
      for (let O = 0; O < b.length; O++) Gt(b[O], c, p, _);
      n(f.anchor, c, p);
      return;
    }
    if (C === er) {
      j(f, c, p);
      return;
    }
    if (_ !== 2 && m & 1 && x) if (_ === 0) x.persisted && !g[Te] ? n(g, c, p) : (x.beforeEnter(g), n(g, c, p), me(() => x.enter(g), v));
    else {
      const { leave: O, delayLeave: T, afterLeave: w } = x, I = () => {
        f.ctx.isUnmounted ? s(g) : n(g, c, p);
      }, R = () => {
        const q = g._isLeaving || !!g[Te];
        g._isLeaving && g[Te](!0), x.persisted && !q ? I() : O(g, () => {
          I(), w && w();
        });
      };
      T ? T(g, I, R) : R();
    }
    else n(g, c, p);
  }, ze = (f, c, p, _ = !1, v = !1) => {
    const { type: g, props: C, ref: x, children: b, dynamicChildren: m, shapeFlag: O, patchFlag: T, dirs: w, cacheIndex: I, memo: R } = f;
    if (T === -2 && (v = !1), x != null && (ke(), It(x, null, p, f, !0), qe()), I != null && (c.renderCache[I] = void 0), O & 256) {
      c.ctx.deactivate(f);
      return;
    }
    const q = O & 1 && w, G = !vt(f);
    let te;
    if (G && (te = C && C.onVnodeBeforeUnmount) && Fe(te, c, f), O & 6) Ii(f.component, p, _);
    else {
      if (O & 128) {
        f.suspense.unmount(p, _);
        return;
      }
      q && tt(f, null, c, "beforeUnmount"), O & 64 ? f.type.remove(f, c, p, ut, _) : m && !m.hasOnce && (g !== xe || T > 0 && T & 64) ? yt(m, c, p, !1, !0) : (g === xe && T & 384 || !v && O & 16) && yt(b, c, p), _ && xn(f);
    }
    const re = R != null && I == null;
    (G && (te = C && C.onVnodeUnmounted) || q || re) && me(() => {
      te && Fe(te, c, f), q && tt(f, null, c, "unmounted"), re && (f.el = null);
    }, p);
  }, xn = (f) => {
    const { type: c, el: p, anchor: _, transition: v } = f;
    if (c === xe) {
      Pi(p, _);
      return;
    }
    if (c === er) {
      A(f);
      return;
    }
    const g = () => {
      s(p), v && !v.persisted && v.afterLeave && v.afterLeave();
    };
    if (f.shapeFlag & 1 && v && !v.persisted) {
      const { leave: C, delayLeave: x } = v, b = () => C(p, g);
      x ? x(f.el, g, b) : b();
    } else g();
  }, Pi = (f, c) => {
    let p;
    for (; f !== c; )
      p = y(f), s(f), f = p;
    s(c);
  }, Ii = (f, c, p) => {
    const { bum: _, scope: v, job: g, subTree: C, um: x, m: b, a: m } = f;
    Bn(b), Bn(m), _ && Zt(_), v.stop(), g && (g.flags |= 8, ze(C, f, c, p)), x && me(x, c), me(() => {
      f.isUnmounted = !0;
    }, c);
  }, yt = (f, c, p, _ = !1, v = !1, g = 0) => {
    for (let C = g; C < f.length; C++) ze(f[C], c, p, _, v);
  }, Jt = (f) => {
    if (f.shapeFlag & 6) return Jt(f.component.subTree);
    if (f.shapeFlag & 128) return f.suspense.next();
    const c = y(f.anchor || f.el), p = c && c[Al];
    return p ? y(p) : c;
  };
  let Er = !1;
  const Cn = (f, c, p) => {
    let _;
    f == null ? c._vnode && (ze(c._vnode, null, null, !0), _ = c._vnode.component) : P(c._vnode || null, f, c, null, null, null, p), c._vnode = f, Er || (Er = !0, Pn(_), $s(), Er = !1);
  }, ut = {
    p: P,
    um: ze,
    m: Gt,
    r: xn,
    mt: oe,
    mc: _e,
    pc: k,
    pbc: K,
    n: Jt,
    o: e
  };
  let wr, Ar;
  return t && ([wr, Ar] = t(ut)), {
    render: Cn,
    hydrate: wr,
    createApp: Yl(Cn, wr)
  };
}
function Hr({ type: e, props: t }, r) {
  return r === "svg" && e === "foreignObject" || r === "mathml" && e === "annotation-xml" && t && t.encoding && t.encoding.includes("html") ? void 0 : r;
}
function rt({ effect: e, job: t }, r) {
  r ? (e.flags |= 32, t.flags |= 4) : (e.flags &= -33, t.flags &= -5);
}
function co(e, t) {
  return (!e || e && !e.pendingBranch) && t && !t.persisted;
}
function mi(e, t, r = !1) {
  const n = e.children, s = t.children;
  if (M(n) && M(s)) for (let i = 0; i < n.length; i++) {
    const l = n[i];
    let o = s[i];
    o.shapeFlag & 1 && !o.dynamicChildren && ((o.patchFlag <= 0 || o.patchFlag === 32) && (o = s[i] = Ke(s[i]), o.el = l.el), !r && o.patchFlag !== -2 && mi(l, o)), o.type === Sr && (o.patchFlag === -1 && (o = s[i] = Ke(o)), o.el = l.el), o.type === ae && !o.el && (o.el = l.el);
  }
}
function ho(e) {
  const t = e.slice(), r = [0];
  let n, s, i, l, o;
  const a = e.length;
  for (n = 0; n < a; n++) {
    const d = e[n];
    if (d !== 0) {
      if (s = r[r.length - 1], e[s] < d) {
        t[n] = s, r.push(n);
        continue;
      }
      for (i = 0, l = r.length - 1; i < l; )
        o = i + l >> 1, e[r[o]] < d ? i = o + 1 : l = o;
      d < e[r[i]] && (i > 0 && (t[n] = r[i - 1]), r[i] = n);
    }
  }
  for (i = r.length, l = r[i - 1]; i-- > 0; )
    r[i] = l, l = t[l];
  return r;
}
function _i(e) {
  const t = e.subTree.component;
  if (t) return t.asyncDep && !t.asyncResolved ? t : _i(t);
}
function Bn(e) {
  if (e) for (let t = 0; t < e.length; t++) e[t].flags |= 8;
}
function bi(e) {
  if (e.placeholder) return e.placeholder;
  const t = e.component;
  return t ? bi(t.subTree) : null;
}
var yi = (e) => e.__isSuspense;
function po(e, t) {
  t && t.pendingBranch ? M(e) ? t.effects.push(...e) : t.effects.push(e) : xl(e);
}
var xe = /* @__PURE__ */ Symbol.for("v-fgt"), Sr = /* @__PURE__ */ Symbol.for("v-txt"), ae = /* @__PURE__ */ Symbol.for("v-cmt"), er = /* @__PURE__ */ Symbol.for("v-stc"), Lt = [], Ce = null;
function Xr(e = !1) {
  Lt.push(Ce = e ? null : []);
}
function go() {
  Lt.pop(), Ce = Lt[Lt.length - 1] || null;
}
var jt = 1;
function or(e, t = !1) {
  jt += e, e < 0 && Ce && t && (Ce.hasOnce = !0);
}
function xi(e) {
  return e.dynamicChildren = jt > 0 ? Ce || ht : null, go(), jt > 0 && Ce && Ce.push(e), e;
}
function Tf(e, t, r, n, s, i) {
  return xi(Si(e, t, r, n, s, i, !0));
}
function Zr(e, t, r, n, s) {
  return xi(pe(e, t, r, n, s, !0));
}
function Vt(e) {
  return e ? e.__v_isVNode === !0 : !1;
}
function lt(e, t) {
  return e.type === t.type && e.key === t.key;
}
var Ci = ({ key: e }) => e ?? null, tr = ({ ref: e, ref_key: t, ref_for: r }) => (typeof e == "number" && (e = "" + e), e != null ? X(e) || /* @__PURE__ */ ce(e) || F(e) ? {
  i: le,
  r: e,
  k: t,
  f: !!r
} : e : null);
function Si(e, t = null, r = null, n = 0, s = null, i = e === xe ? 0 : 1, l = !1, o = !1) {
  const a = {
    __v_isVNode: !0,
    __v_skip: !0,
    type: e,
    props: t,
    key: t && Ci(t),
    ref: t && tr(t),
    scopeId: Ks,
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
    patchFlag: n,
    dynamicProps: s,
    dynamicChildren: null,
    appContext: null,
    ctx: le
  };
  return o ? (bn(a, r), i & 128 && e.normalize(a)) : r && (a.shapeFlag |= X(r) ? 8 : 16), jt > 0 && !l && Ce && (a.patchFlag > 0 || i & 6) && a.patchFlag !== 32 && Ce.push(a), a;
}
var pe = vo;
function vo(e, t = null, r = null, n = 0, s = null, i = !1) {
  if ((!e || e === ni) && (e = ae), Vt(e)) {
    const o = Qe(e, t, !0);
    return r && bn(o, r), jt > 0 && !i && Ce && (o.shapeFlag & 6 ? Ce[Ce.indexOf(e)] = o : Ce.push(o)), o.patchFlag = -2, o;
  }
  if (Mo(e) && (e = e.__vccOpts), t) {
    t = mo(t);
    let { class: o, style: a } = t;
    o && !X(o) && (t.class = ln(o)), $(a) && (/* @__PURE__ */ pn(a) && !M(a) && (a = ee({}, a)), t.style = sn(a));
  }
  const l = X(e) ? 1 : yi(e) ? 128 : ks(e) ? 64 : $(e) ? 4 : F(e) ? 2 : 0;
  return Si(e, t, r, n, s, l, i, !0);
}
function mo(e) {
  return e ? /* @__PURE__ */ pn(e) || ci(e) ? ee({}, e) : e : null;
}
function Qe(e, t, r = !1, n = !1) {
  const { props: s, ref: i, patchFlag: l, children: o, transition: a } = e, d = t ? yo(s || {}, t) : s, u = {
    __v_isVNode: !0,
    __v_skip: !0,
    type: e.type,
    props: d,
    key: d && Ci(d),
    ref: t && t.ref ? r && i ? M(i) ? i.concat(tr(t)) : [i, tr(t)] : tr(t) : i,
    scopeId: e.scopeId,
    slotScopeIds: e.slotScopeIds,
    children: o,
    target: e.target,
    targetStart: e.targetStart,
    targetAnchor: e.targetAnchor,
    staticCount: e.staticCount,
    shapeFlag: e.shapeFlag,
    patchFlag: t && e.type !== xe ? l === -1 ? 16 : l | 16 : l,
    dynamicProps: e.dynamicProps,
    dynamicChildren: e.dynamicChildren,
    appContext: e.appContext,
    dirs: e.dirs,
    transition: a,
    component: e.component,
    suspense: e.suspense,
    ssContent: e.ssContent && Qe(e.ssContent),
    ssFallback: e.ssFallback && Qe(e.ssFallback),
    placeholder: e.placeholder,
    el: e.el,
    anchor: e.anchor,
    ctx: e.ctx,
    ce: e.ce
  };
  return a && n && Ht(u, a.clone(u)), u;
}
function _o(e = " ", t = 0) {
  return pe(Sr, null, e, t);
}
function Ef(e, t) {
  const r = pe(er, null, e);
  return r.staticCount = t, r;
}
function bo(e = "", t = !1) {
  return t ? (Xr(), Zr(ae, null, e)) : pe(ae, null, e);
}
function Ne(e) {
  return e == null || typeof e == "boolean" ? pe(ae) : M(e) ? pe(xe, null, e.slice()) : Vt(e) ? Ke(e) : pe(Sr, null, String(e));
}
function Ke(e) {
  return e.el === null && e.patchFlag !== -1 || e.memo ? e : Qe(e);
}
function bn(e, t) {
  let r = 0;
  const { shapeFlag: n } = e;
  if (t == null) t = null;
  else if (M(t)) r = 16;
  else if (typeof t == "object") if (n & 65) {
    const s = t.default;
    s && (s._c && (s._d = !1), bn(e, s()), s._c && (s._d = !0));
    return;
  } else {
    r = 32;
    const s = t._;
    !s && !ci(t) ? t._ctx = le : s === 3 && le && (le.slots._ === 1 ? t._ = 1 : (t._ = 2, e.patchFlag |= 1024));
  }
  else F(t) ? (t = {
    default: t,
    _ctx: le
  }, r = 32) : (t = String(t), n & 64 ? (r = 16, t = [_o(t)]) : r = 8);
  e.children = t, e.shapeFlag |= r;
}
function yo(...e) {
  const t = {};
  for (let r = 0; r < e.length; r++) {
    const n = e[r];
    for (const s in n) if (s === "class")
      t.class !== n.class && (t.class = ln([t.class, n.class]));
    else if (s === "style") t.style = sn([t.style, n.style]);
    else if (dr(s)) {
      const i = t[s], l = n[s];
      l && i !== l && !(M(i) && i.includes(l)) ? t[s] = i ? [].concat(i, l) : l : l == null && i == null && !hr(s) && (t[s] = l);
    } else s !== "" && (t[s] = n[s]);
  }
  return t;
}
function Fe(e, t, r, n = null) {
  we(e, t, 7, [r, n]);
}
var xo = li(), Co = 0;
function So(e, t, r) {
  const n = e.type, s = (t ? t.appContext : e.appContext) || xo, i = {
    uid: Co++,
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
    scope: new Wi(!0),
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
    propsOptions: hi(n, s),
    emitsOptions: oi(n, s),
    emit: null,
    emitted: null,
    propsDefaults: W,
    inheritAttrs: n.inheritAttrs,
    ctx: W,
    data: W,
    props: W,
    attrs: W,
    slots: W,
    refs: W,
    setupState: W,
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
  return i.ctx = { _: i }, i.root = t ? t.root : i, i.emit = Xl.bind(null, i), e.ce && e.ce(i), i;
}
var ue = null, yn = () => ue || le, fr, Qr;
{
  const e = mr(), t = (r, n) => {
    let s;
    return (s = e[r]) || (s = e[r] = []), s.push(n), (i) => {
      s.length > 1 ? s.forEach((l) => l(i)) : s[0](i);
    };
  };
  fr = t("__VUE_INSTANCE_SETTERS__", (r) => ue = r), Qr = t("__VUE_SSR_SETTERS__", (r) => $t = r);
}
var kt = (e) => {
  const t = ue;
  return fr(e), e.scope.on(), () => {
    e.scope.off(), fr(t);
  };
}, Kn = () => {
  ue && ue.scope.off(), fr(null);
};
function Ti(e) {
  return e.vnode.shapeFlag & 4;
}
var $t = !1;
function To(e, t = !1, r = !1) {
  t && Qr(t);
  const { props: n, children: s } = e.vnode, i = Ti(e);
  no(e, n, i, t), oo(e, s, r || t);
  const l = i ? Eo(e, t) : void 0;
  return t && Qr(!1), l;
}
function Eo(e, t) {
  const r = e.type;
  e.accessCache = /* @__PURE__ */ Object.create(null), e.proxy = new Proxy(e.ctx, Kl);
  const { setup: n } = r;
  if (n) {
    ke();
    const s = e.setupContext = n.length > 1 ? Ao(e) : null, i = kt(e), l = Wt(n, e, 0, [e.props, s]), o = hs(l);
    if (qe(), i(), (o || e.sp) && !vt(e) && Xs(e), o) {
      if (l.then(Kn, Kn), t) return l.then((a) => {
        Un(e, a, t);
      }).catch((a) => {
        br(a, e, 0);
      });
      e.asyncDep = l;
    } else Un(e, l, t);
  } else Ei(e, t);
}
function Un(e, t, r) {
  F(t) ? e.type.__ssrInlineRender ? e.ssrRender = t : e.render = t : $(t) && (e.setupState = Hs(t)), Ei(e, r);
}
var Wn, kn;
function Ei(e, t, r) {
  const n = e.type;
  if (!e.render) {
    if (!t && Wn && !n.render) {
      const s = n.template || vn(e).template;
      if (s) {
        const { isCustomElement: i, compilerOptions: l } = e.appContext.config, { delimiters: o, compilerOptions: a } = n, d = ee(ee({
          isCustomElement: i,
          delimiters: o
        }, l), a);
        n.render = Wn(s, d);
      }
    }
    e.render = n.render || He, kn && kn(e);
  }
  {
    const s = kt(e);
    ke();
    try {
      Ul(e);
    } finally {
      qe(), s();
    }
  }
}
var wo = { get(e, t) {
  return fe(e, "get", ""), e[t];
} };
function Ao(e) {
  const t = (r) => {
    e.exposed = r || {};
  };
  return {
    attrs: new Proxy(e.attrs, wo),
    slots: e.slots,
    emit: e.emit,
    expose: t
  };
}
function Tr(e) {
  return e.exposed ? e.exposeProxy || (e.exposeProxy = new Proxy(Hs(ul(e.exposed)), {
    get(t, r) {
      if (r in t) return t[r];
      if (r in Ft) return Ft[r](e);
    },
    has(t, r) {
      return r in t || r in Ft;
    }
  })) : e.proxy;
}
function Oo(e, t = !0) {
  return F(e) ? e.displayName || e.name : e.name || t && e.__name;
}
function Mo(e) {
  return F(e) && "__vccOpts" in e;
}
var Po = (e, t) => /* @__PURE__ */ gl(e, t, $t);
function Io(e, t, r) {
  try {
    or(-1);
    const n = arguments.length;
    return n === 2 ? $(t) && !M(t) ? Vt(t) ? pe(e, null, [t]) : pe(e, t) : pe(e, null, t) : (n > 3 ? r = Array.prototype.slice.call(arguments, 2) : n === 3 && Vt(r) && (r = [r]), pe(e, t, r));
  } finally {
    or(1);
  }
}
var Fo = "3.5.35", en = void 0, qn = typeof window < "u" && window.trustedTypes;
if (qn) try {
  en = /* @__PURE__ */ qn.createPolicy("vue", { createHTML: (e) => e });
} catch {
}
var wi = en ? (e) => en.createHTML(e) : (e) => e, Lo = "http://www.w3.org/2000/svg", Do = "http://www.w3.org/1998/Math/MathML", Be = typeof document < "u" ? document : null, Gn = Be && /* @__PURE__ */ Be.createElement("template"), No = {
  insert: (e, t, r) => {
    t.insertBefore(e, r || null);
  },
  remove: (e) => {
    const t = e.parentNode;
    t && t.removeChild(e);
  },
  createElement: (e, t, r, n) => {
    const s = t === "svg" ? Be.createElementNS(Lo, e) : t === "mathml" ? Be.createElementNS(Do, e) : r ? Be.createElement(e, { is: r }) : Be.createElement(e);
    return e === "select" && n && n.multiple != null && s.setAttribute("multiple", n.multiple), s;
  },
  createText: (e) => Be.createTextNode(e),
  createComment: (e) => Be.createComment(e),
  setText: (e, t) => {
    e.nodeValue = t;
  },
  setElementText: (e, t) => {
    e.textContent = t;
  },
  parentNode: (e) => e.parentNode,
  nextSibling: (e) => e.nextSibling,
  querySelector: (e) => Be.querySelector(e),
  setScopeId(e, t) {
    e.setAttribute(t, "");
  },
  insertStaticContent(e, t, r, n, s, i) {
    const l = r ? r.previousSibling : t.lastChild;
    if (s && (s === i || s.nextSibling)) for (; t.insertBefore(s.cloneNode(!0), r), !(s === i || !(s = s.nextSibling)); )
      ;
    else {
      Gn.innerHTML = wi(n === "svg" ? `<svg>${e}</svg>` : n === "mathml" ? `<math>${e}</math>` : e);
      const o = Gn.content;
      if (n === "svg" || n === "mathml") {
        const a = o.firstChild;
        for (; a.firstChild; ) o.appendChild(a.firstChild);
        o.removeChild(a);
      }
      t.insertBefore(o, r);
    }
    return [l ? l.nextSibling : t.firstChild, r ? r.previousSibling : t.lastChild];
  }
}, Xe = "transition", Tt = "animation", Bt = /* @__PURE__ */ Symbol("_vtc"), Ai = {
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
}, Ro = /* @__PURE__ */ ee({}, qs, Ai), Ho = (e) => (e.displayName = "Transition", e.props = Ro, e), wf = /* @__PURE__ */ Ho((e, { slots: t }) => Io(Pl, jo(e), t)), nt = (e, t = []) => {
  M(e) ? e.forEach((r) => r(...t)) : e && e(...t);
}, Jn = (e) => e ? M(e) ? e.some((t) => t.length > 1) : e.length > 1 : !1;
function jo(e) {
  const t = {};
  for (const E in e) E in Ai || (t[E] = e[E]);
  if (e.css === !1) return t;
  const { name: r = "v", type: n, duration: s, enterFromClass: i = `${r}-enter-from`, enterActiveClass: l = `${r}-enter-active`, enterToClass: o = `${r}-enter-to`, appearFromClass: a = i, appearActiveClass: d = l, appearToClass: u = o, leaveFromClass: h = `${r}-leave-from`, leaveActiveClass: y = `${r}-leave-active`, leaveToClass: S = `${r}-leave-to` } = e, L = Vo(s), P = L && L[0], Y = L && L[1], { onBeforeEnter: B, onEnter: N, onEnterCancelled: j, onLeave: A, onLeaveCancelled: U, onBeforeAppear: se = B, onAppear: ve = N, onAppearCancelled: _e = j } = t, D = (E, z, oe, je) => {
    E._enterCancelled = je, st(E, z ? u : o), st(E, z ? d : l), oe && oe();
  }, K = (E, z) => {
    E._isLeaving = !1, st(E, h), st(E, S), st(E, y), z && z();
  }, Z = (E) => (z, oe) => {
    const je = E ? ve : N, ne = () => D(z, E, oe);
    nt(je, [z, ne]), Yn(() => {
      st(z, E ? a : i), $e(z, E ? u : o), Jn(je) || zn(z, n, P, ne);
    });
  };
  return ee(t, {
    onBeforeEnter(E) {
      nt(B, [E]), $e(E, i), $e(E, l);
    },
    onBeforeAppear(E) {
      nt(se, [E]), $e(E, a), $e(E, d);
    },
    onEnter: Z(!1),
    onAppear: Z(!0),
    onLeave(E, z) {
      E._isLeaving = !0;
      const oe = () => K(E, z);
      $e(E, h), E._enterCancelled ? ($e(E, y), Qn(E)) : (Qn(E), $e(E, y)), Yn(() => {
        E._isLeaving && (st(E, h), $e(E, S), Jn(A) || zn(E, n, Y, oe));
      }), nt(A, [E, oe]);
    },
    onEnterCancelled(E) {
      D(E, !1, void 0, !0), nt(j, [E]);
    },
    onAppearCancelled(E) {
      D(E, !0, void 0, !0), nt(_e, [E]);
    },
    onLeaveCancelled(E) {
      K(E), nt(U, [E]);
    }
  });
}
function Vo(e) {
  if (e == null) return null;
  if ($(e)) return [jr(e.enter), jr(e.leave)];
  {
    const t = jr(e);
    return [t, t];
  }
}
function jr(e) {
  return Ri(e);
}
function $e(e, t) {
  t.split(/\s+/).forEach((r) => r && e.classList.add(r)), (e[Bt] || (e[Bt] = /* @__PURE__ */ new Set())).add(t);
}
function st(e, t) {
  t.split(/\s+/).forEach((n) => n && e.classList.remove(n));
  const r = e[Bt];
  r && (r.delete(t), r.size || (e[Bt] = void 0));
}
function Yn(e) {
  requestAnimationFrame(() => {
    requestAnimationFrame(e);
  });
}
var $o = 0;
function zn(e, t, r, n) {
  const s = e._endId = ++$o, i = () => {
    s === e._endId && n();
  };
  if (r != null) return setTimeout(i, r);
  const { type: l, timeout: o, propCount: a } = Bo(e, t);
  if (!l) return n();
  const d = l + "end";
  let u = 0;
  const h = () => {
    e.removeEventListener(d, y), i();
  }, y = (S) => {
    S.target === e && ++u >= a && h();
  };
  setTimeout(() => {
    u < a && h();
  }, o + 1), e.addEventListener(d, y);
}
function Bo(e, t) {
  const r = window.getComputedStyle(e), n = (L) => (r[L] || "").split(", "), s = n(`${Xe}Delay`), i = n(`${Xe}Duration`), l = Xn(s, i), o = n(`${Tt}Delay`), a = n(`${Tt}Duration`), d = Xn(o, a);
  let u = null, h = 0, y = 0;
  t === Xe ? l > 0 && (u = Xe, h = l, y = i.length) : t === Tt ? d > 0 && (u = Tt, h = d, y = a.length) : (h = Math.max(l, d), u = h > 0 ? l > d ? Xe : Tt : null, y = u ? u === Xe ? i.length : a.length : 0);
  const S = u === Xe && /\b(?:transform|all)(?:,|$)/.test(n(`${Xe}Property`).toString());
  return {
    type: u,
    timeout: h,
    propCount: y,
    hasTransform: S
  };
}
function Xn(e, t) {
  for (; e.length < t.length; ) e = e.concat(e);
  return Math.max(...t.map((r, n) => Zn(r) + Zn(e[n])));
}
function Zn(e) {
  return e === "auto" ? 0 : Number(e.slice(0, -1).replace(",", ".")) * 1e3;
}
function Qn(e) {
  return (e ? e.ownerDocument : document).body.offsetHeight;
}
function Ko(e, t, r) {
  const n = e[Bt];
  n && (t = (t ? [t, ...n] : [...n]).join(" ")), t == null ? e.removeAttribute("class") : r ? e.setAttribute("class", t) : e.className = t;
}
var ar = /* @__PURE__ */ Symbol("_vod"), Oi = /* @__PURE__ */ Symbol("_vsh"), Af = {
  name: "show",
  beforeMount(e, { value: t }, { transition: r }) {
    e[ar] = e.style.display === "none" ? "" : e.style.display, r && t ? r.beforeEnter(e) : Et(e, t);
  },
  mounted(e, { value: t }, { transition: r }) {
    r && t && r.enter(e);
  },
  updated(e, { value: t, oldValue: r }, { transition: n }) {
    !t != !r && (n ? t ? (n.beforeEnter(e), Et(e, !0), n.enter(e)) : n.leave(e, () => {
      Et(e, !1);
    }) : Et(e, t));
  },
  beforeUnmount(e, { value: t }) {
    Et(e, t);
  }
};
function Et(e, t) {
  e.style.display = t ? e[ar] : "none", e[Oi] = !t;
}
var Uo = /* @__PURE__ */ Symbol(""), Wo = /(?:^|;)\s*display\s*:/;
function ko(e, t, r) {
  const n = e.style, s = X(r);
  let i = !1;
  if (r && !s) {
    if (t) if (X(t))
      for (const l of t.split(";")) {
        const o = l.slice(0, l.indexOf(":")).trim();
        r[o] == null && At(n, o, "");
      }
    else for (const l in t) r[l] == null && At(n, l, "");
    for (const l in r) {
      l === "display" && (i = !0);
      const o = r[l];
      o != null ? Go(e, l, !X(t) && t ? t[l] : void 0, o) || At(n, l, o) : At(n, l, "");
    }
  } else if (s) {
    if (t !== r) {
      const l = n[Uo];
      l && (r += ";" + l), n.cssText = r, i = Wo.test(r);
    }
  } else t && e.removeAttribute("style");
  ar in e && (e[ar] = i ? n.display : "", e[Oi] && (n.display = "none"));
}
var es = /\s*!important$/;
function At(e, t, r) {
  if (M(r)) r.forEach((n) => At(e, t, n));
  else if (r == null && (r = ""), t.startsWith("--")) e.setProperty(t, r);
  else {
    const n = qo(e, t);
    es.test(r) ? e.setProperty(et(n), r.replace(es, ""), "important") : e[n] = r;
  }
}
var ts = [
  "Webkit",
  "Moz",
  "ms"
], Vr = {};
function qo(e, t) {
  const r = Vr[t];
  if (r) return r;
  let n = ge(t);
  if (n !== "filter" && n in e) return Vr[t] = n;
  n = vr(n);
  for (let s = 0; s < ts.length; s++) {
    const i = ts[s] + n;
    if (i in e) return Vr[t] = i;
  }
  return t;
}
function Go(e, t, r, n) {
  return e.tagName === "TEXTAREA" && (t === "width" || t === "height") && X(n) && r === n;
}
var rs = "http://www.w3.org/1999/xlink";
function ns(e, t, r, n, s, i = Bi(t)) {
  n && t.startsWith("xlink:") ? r == null ? e.removeAttributeNS(rs, t.slice(6, t.length)) : e.setAttributeNS(rs, t, r) : r == null || i && !_s(r) ? e.removeAttribute(t) : e.setAttribute(t, i ? "" : Me(r) ? String(r) : r);
}
function ss(e, t, r, n, s) {
  if (t === "innerHTML" || t === "textContent") {
    r != null && (e[t] = t === "innerHTML" ? wi(r) : r);
    return;
  }
  const i = e.tagName;
  if (t === "value" && i !== "PROGRESS" && !i.includes("-")) {
    const o = i === "OPTION" ? e.getAttribute("value") || "" : e.value, a = r == null ? e.type === "checkbox" ? "on" : "" : String(r);
    (o !== a || !("_value" in e)) && (e.value = a), r == null && e.removeAttribute(t), e._value = r;
    return;
  }
  let l = !1;
  if (r === "" || r == null) {
    const o = typeof e[t];
    o === "boolean" ? r = _s(r) : r == null && o === "string" ? (r = "", l = !0) : o === "number" && (r = 0, l = !0);
  }
  try {
    e[t] = r;
  } catch {
  }
  l && e.removeAttribute(s || t);
}
function ot(e, t, r, n) {
  e.addEventListener(t, r, n);
}
function Jo(e, t, r, n) {
  e.removeEventListener(t, r, n);
}
var is = /* @__PURE__ */ Symbol("_vei");
function Yo(e, t, r, n, s = null) {
  const i = e[is] || (e[is] = {}), l = i[t];
  if (n && l) l.value = n;
  else {
    const [o, a] = zo(t);
    n ? ot(e, o, i[t] = Qo(n, s), a) : l && (Jo(e, o, l, a), i[t] = void 0);
  }
}
var ls = /(?:Once|Passive|Capture)$/;
function zo(e) {
  let t;
  if (ls.test(e)) {
    t = {};
    let r;
    for (; r = e.match(ls); )
      e = e.slice(0, e.length - r[0].length), t[r[0].toLowerCase()] = !0;
  }
  return [e[2] === ":" ? e.slice(3) : et(e.slice(2)), t];
}
var $r = 0, Xo = /* @__PURE__ */ Promise.resolve(), Zo = () => $r || (Xo.then(() => $r = 0), $r = Date.now());
function Qo(e, t) {
  const r = (n) => {
    if (!n._vts) n._vts = Date.now();
    else if (n._vts <= r.attached) return;
    const s = r.value;
    if (M(s)) {
      const i = n.stopImmediatePropagation;
      n.stopImmediatePropagation = () => {
        i.call(n), n._stopped = !0;
      };
      const l = s.slice(), o = [n];
      for (let a = 0; a < l.length && !n._stopped; a++) {
        const d = l[a];
        d && we(d, t, 5, o);
      }
    } else we(s, t, 5, [n]);
  };
  return r.value = e, r.attached = Zo(), r;
}
var os = (e) => e.charCodeAt(0) === 111 && e.charCodeAt(1) === 110 && e.charCodeAt(2) > 96 && e.charCodeAt(2) < 123, ef = (e, t, r, n, s, i) => {
  const l = s === "svg";
  t === "class" ? Ko(e, n, l) : t === "style" ? ko(e, r, n) : dr(t) ? hr(t) || Yo(e, t, r, n, i) : (t[0] === "." ? (t = t.slice(1), !0) : t[0] === "^" ? (t = t.slice(1), !1) : tf(e, t, n, l)) ? (ss(e, t, n), !e.tagName.includes("-") && (t === "value" || t === "checked" || t === "selected") && ns(e, t, n, l, i, t !== "value")) : e._isVueCE && (rf(e, t) || e._def.__asyncLoader && (/[A-Z]/.test(t) || !X(n))) ? ss(e, ge(t), n, i, t) : (t === "true-value" ? e._trueValue = n : t === "false-value" && (e._falseValue = n), ns(e, t, n, l));
};
function tf(e, t, r, n) {
  if (n)
    return !!(t === "innerHTML" || t === "textContent" || t in e && os(t) && F(r));
  if (t === "spellcheck" || t === "draggable" || t === "translate" || t === "autocorrect" || t === "sandbox" && e.tagName === "IFRAME" || t === "form" || t === "list" && e.tagName === "INPUT" || t === "type" && e.tagName === "TEXTAREA") return !1;
  if (t === "width" || t === "height") {
    const s = e.tagName;
    if (s === "IMG" || s === "VIDEO" || s === "CANVAS" || s === "SOURCE") return !1;
  }
  return os(t) && X(r) ? !1 : t in e;
}
function rf(e, t) {
  const r = e._def.props;
  if (!r) return !1;
  const n = ge(t);
  return Array.isArray(r) ? r.some((s) => ge(s) === n) : Object.keys(r).some((s) => ge(s) === n);
}
var ur = (e) => {
  const t = e.props["onUpdate:modelValue"] || !1;
  return M(t) ? (r) => Zt(t, r) : t;
};
function nf(e) {
  e.target.composing = !0;
}
function fs(e) {
  const t = e.target;
  t.composing && (t.composing = !1, t.dispatchEvent(new Event("input")));
}
var _t = /* @__PURE__ */ Symbol("_assign");
function as(e, t, r) {
  return t && (e = e.trim()), r && (e = nn(e)), e;
}
var Of = {
  created(e, { modifiers: { lazy: t, trim: r, number: n } }, s) {
    e[_t] = ur(s);
    const i = n || s.props && s.props.type === "number";
    ot(e, t ? "change" : "input", (l) => {
      l.target.composing || e[_t](as(e.value, r, i));
    }), (r || i) && ot(e, "change", () => {
      e.value = as(e.value, r, i);
    }), t || (ot(e, "compositionstart", nf), ot(e, "compositionend", fs), ot(e, "change", fs));
  },
  mounted(e, { value: t }) {
    e.value = t ?? "";
  },
  beforeUpdate(e, { value: t, oldValue: r, modifiers: { lazy: n, trim: s, number: i } }, l) {
    if (e[_t] = ur(l), e.composing) return;
    const o = (i || e.type === "number") && !/^0\d/.test(e.value) ? nn(e.value) : e.value, a = t ?? "";
    if (o === a) return;
    const d = e.getRootNode();
    (d instanceof Document || d instanceof ShadowRoot) && d.activeElement === e && e.type !== "range" && (n && t === r || s && e.value.trim() === a) || (e.value = a);
  }
}, Mf = {
  deep: !0,
  created(e, t, r) {
    e[_t] = ur(r), ot(e, "change", () => {
      const n = e._modelValue, s = sf(e), i = e.checked, l = e[_t];
      if (M(n)) {
        const o = bs(n, s), a = o !== -1;
        if (i && !a) l(n.concat(s));
        else if (!i && a) {
          const d = [...n];
          d.splice(o, 1), l(d);
        }
      } else if (pr(n)) {
        const o = new Set(n);
        i ? o.add(s) : o.delete(s), l(o);
      } else l(Mi(e, i));
    });
  },
  mounted: us,
  beforeUpdate(e, t, r) {
    e[_t] = ur(r), us(e, t, r);
  }
};
function us(e, { value: t, oldValue: r }, n) {
  e._modelValue = t;
  let s;
  if (M(t)) s = bs(t, n.props.value) > -1;
  else if (pr(t)) s = t.has(n.props.value);
  else {
    if (t === r) return;
    s = Ut(t, Mi(e, !0));
  }
  e.checked !== s && (e.checked = s);
}
function sf(e) {
  return "_value" in e ? e._value : e.value;
}
function Mi(e, t) {
  const r = t ? "_trueValue" : "_falseValue";
  return r in e ? e[r] : t;
}
var lf = [
  "ctrl",
  "shift",
  "alt",
  "meta"
], of = {
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
  exact: (e, t) => lf.some((r) => e[`${r}Key`] && !t.includes(r))
}, Pf = (e, t) => {
  if (!e) return e;
  const r = e._withMods || (e._withMods = {}), n = t.join(".");
  return r[n] || (r[n] = ((s, ...i) => {
    for (let l = 0; l < t.length; l++) {
      const o = of[t[l]];
      if (o && o(s, t)) return;
    }
    return e(s, ...i);
  }));
}, ff = {
  esc: "escape",
  space: " ",
  up: "arrow-up",
  left: "arrow-left",
  right: "arrow-right",
  down: "arrow-down",
  delete: "backspace"
}, If = (e, t) => {
  const r = e._withKeys || (e._withKeys = {}), n = t.join(".");
  return r[n] || (r[n] = ((s) => {
    if (!("key" in s)) return;
    const i = et(s.key);
    if (t.some((l) => l === i || ff[l] === i)) return e(s);
  }));
}, af = /* @__PURE__ */ ee({ patchProp: ef }, No), cs;
function uf() {
  return cs || (cs = ao(af));
}
var Ff = ((...e) => {
  const t = uf().createApp(...e), { mount: r } = t;
  return t.mount = (n) => {
    const s = df(n);
    if (!s) return;
    const i = t._component;
    !F(i) && !i.render && !i.template && (i.template = s.innerHTML), s.nodeType === 1 && (s.textContent = "");
    const l = r(s, !1, cf(s));
    return s instanceof Element && (s.removeAttribute("v-cloak"), s.setAttribute("data-v-app", "")), l;
  }, t;
});
function cf(e) {
  if (e instanceof SVGElement) return "svg";
  if (typeof MathMLElement == "function" && e instanceof MathMLElement) return "mathml";
}
function df(e) {
  return X(e) ? document.querySelector(e) : e;
}
export {
  vf as A,
  Xr as C,
  _f as D,
  xf as E,
  H as F,
  dl as I,
  ln as L,
  dn as M,
  pf as N,
  Lr as O,
  gf as P,
  sn as R,
  ti as S,
  Sf as T,
  mf as _,
  Af as a,
  $l as b,
  xe as c,
  Zr as d,
  bo as f,
  pe as g,
  _o as h,
  Of as i,
  ul as j,
  Cl as k,
  Po as l,
  Ef as m,
  Ff as n,
  If as o,
  Tf as p,
  Mf as r,
  Pf as s,
  wf as t,
  Si as u,
  bl as v,
  Cf as w,
  Qs as x,
  ei as y,
  Ui as z
};
