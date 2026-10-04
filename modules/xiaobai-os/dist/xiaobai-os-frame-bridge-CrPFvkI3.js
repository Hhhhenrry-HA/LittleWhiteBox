/* eslint-disable */
// @__NO_SIDE_EFFECTS__
function Mr(e) {
  const t = /* @__PURE__ */ Object.create(null);
  for (const r of e.split(",")) t[r] = 1;
  return (r) => r in t;
}
var G = {}, yt = [], He = () => {
}, Bs = () => !1, Or = (e) => e.charCodeAt(0) === 111 && e.charCodeAt(1) === 110 && (e.charCodeAt(2) > 122 || e.charCodeAt(2) < 97), Ir = (e) => e.startsWith("onUpdate:"), ne = Object.assign, An = (e, t) => {
  const r = e.indexOf(t);
  r > -1 && e.splice(r, 1);
}, go = Object.prototype.hasOwnProperty, Y = (e, t) => go.call(e, t), P = Array.isArray, xt = (e) => Pt(e) === "[object Map]", It = (e) => Pt(e) === "[object Set]", Zn = (e) => Pt(e) === "[object Date]", vo = (e) => Pt(e) === "[object RegExp]", $ = (e) => typeof e == "function", te = (e) => typeof e == "string", we = (e) => typeof e == "symbol", J = (e) => e !== null && typeof e == "object", Ks = (e) => (J(e) || $(e)) && $(e.then) && $(e.catch), ks = Object.prototype.toString, Pt = (e) => ks.call(e), mo = (e) => Pt(e).slice(8, -1), Us = (e) => Pt(e) === "[object Object]", Pr = (e) => te(e) && e !== "NaN" && e[0] !== "-" && "" + parseInt(e, 10) === e, kt = /* @__PURE__ */ Mr(",key,ref,ref_for,ref_key,onVnodeBeforeMount,onVnodeMounted,onVnodeBeforeUpdate,onVnodeUpdated,onVnodeBeforeUnmount,onVnodeUnmounted"), Fr = (e) => {
  const t = /* @__PURE__ */ Object.create(null);
  return ((r) => t[r] || (t[r] = e(r)));
}, _o = /-\w/g, me = Fr((e) => e.replace(_o, (t) => t.slice(1).toUpperCase())), bo = /\B([A-Z])/g, ze = Fr((e) => e.replace(bo, "-$1").toLowerCase()), Rr = Fr((e) => e.charAt(0).toUpperCase() + e.slice(1)), dr = Fr((e) => e ? `on${Rr(e)}` : ""), he = (e, t) => !Object.is(e, t), St = (e, ...t) => {
  for (let r = 0; r < e.length; r++) e[r](...t);
}, Ws = (e, t, r, n = !1) => {
  Object.defineProperty(e, t, {
    configurable: !0,
    enumerable: !1,
    writable: n,
    value: r
  });
}, Lr = (e) => {
  const t = parseFloat(e);
  return isNaN(t) ? e : t;
}, yo = (e) => {
  const t = te(e) ? Number(e) : NaN;
  return isNaN(t) ? e : t;
}, Qn, Nr = () => Qn || (Qn = typeof globalThis < "u" ? globalThis : typeof self < "u" ? self : typeof window < "u" ? window : typeof globalThis < "u" ? globalThis : {});
function Mn(e) {
  if (P(e)) {
    const t = {};
    for (let r = 0; r < e.length; r++) {
      const n = e[r], s = te(n) ? To(n) : Mn(n);
      if (s) for (const i in s) t[i] = s[i];
    }
    return t;
  } else if (te(e) || J(e)) return e;
}
var xo = /;(?![^(]*\))/g, So = /:([^]+)/, Co = /\/\*[^]*?\*\//g;
function To(e) {
  const t = {};
  return e.replace(Co, "").split(xo).forEach((r) => {
    if (r) {
      const n = r.split(So);
      n.length > 1 && (t[n[0].trim()] = n[1].trim());
    }
  }), t;
}
function On(e) {
  let t = "";
  if (te(e)) t = e;
  else if (P(e)) for (let r = 0; r < e.length; r++) {
    const n = On(e[r]);
    n && (t += n + " ");
  }
  else if (J(e))
    for (const r in e) e[r] && (t += r + " ");
  return t.trim();
}
var qs = "itemscope,allowfullscreen,formnovalidate,ismap,nomodule,novalidate,readonly", wo = /* @__PURE__ */ Mr(qs), sa = /* @__PURE__ */ Mr(qs + ",async,autofocus,autoplay,controls,default,defer,disabled,hidden,inert,loop,open,required,reversed,scoped,seamless,checked,muted,multiple,selected");
function Gs(e) {
  return !!e || e === "";
}
function Eo(e, t) {
  if (e.length !== t.length) return !1;
  let r = !0;
  for (let n = 0; r && n < e.length; n++) r = Ft(e[n], t[n]);
  return r;
}
function Ft(e, t) {
  if (e === t) return !0;
  let r = Zn(e), n = Zn(t);
  if (r || n) return r && n ? e.getTime() === t.getTime() : !1;
  if (r = we(e), n = we(t), r || n) return e === t;
  if (r = P(e), n = P(t), r || n) return r && n ? Eo(e, t) : !1;
  if (r = J(e), n = J(t), r || n) {
    if (!r || !n || Object.keys(e).length !== Object.keys(t).length) return !1;
    for (const s in e) {
      const i = e.hasOwnProperty(s), o = t.hasOwnProperty(s);
      if (i && !o || !i && o || !Ft(e[s], t[s])) return !1;
    }
  }
  return String(e) === String(t);
}
function In(e, t) {
  return e.findIndex((r) => Ft(r, t));
}
var Js = (e) => !!(e && e.__v_isRef === !0), Ao = (e) => te(e) ? e : e == null ? "" : P(e) || J(e) && (e.toString === ks || !$(e.toString)) ? Js(e) ? Ao(e.value) : JSON.stringify(e, Ys, 2) : String(e), Ys = (e, t) => Js(t) ? Ys(e, t.value) : xt(t) ? { [`Map(${t.size})`]: [...t.entries()].reduce((r, [n, s], i) => (r[zr(n, i) + " =>"] = s, r), {}) } : It(t) ? { [`Set(${t.size})`]: [...t.values()].map((r) => zr(r)) } : we(t) ? zr(t) : J(t) && !P(t) && !Us(t) ? String(t) : t, zr = (e, t = "") => {
  var r;
  return we(e) ? `Symbol(${(r = e.description) != null ? r : t})` : e;
}, ce, Mo = class {
  constructor(e = !1) {
    this.detached = e, this._active = !0, this._on = 0, this.effects = [], this.cleanups = [], this._isPaused = !1, this._warnOnRun = !0, this.__v_skip = !0, !e && ce && (ce.active ? (this.parent = ce, this.index = (ce.scopes || (ce.scopes = [])).push(this) - 1) : (this._active = !1, this._warnOnRun = !1));
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
      const t = ce;
      try {
        return ce = this, e();
      } finally {
        ce = t;
      }
    }
  }
  on() {
    ++this._on === 1 && (this.prevScope = ce, ce = this);
  }
  off() {
    if (this._on > 0 && --this._on === 0) {
      if (ce === this) ce = this.prevScope;
      else {
        let e = ce;
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
function Oo() {
  return ce;
}
var ee, Xr = /* @__PURE__ */ new WeakSet(), zs = class {
  constructor(e) {
    this.fn = e, this.deps = void 0, this.depsTail = void 0, this.flags = 5, this.next = void 0, this.cleanup = void 0, this.scheduler = void 0, ce && (ce.active ? ce.effects.push(this) : this.flags &= -2);
  }
  pause() {
    this.flags |= 64;
  }
  resume() {
    this.flags & 64 && (this.flags &= -65, Xr.has(this) && (Xr.delete(this), this.trigger()));
  }
  notify() {
    this.flags & 2 && !(this.flags & 32) || this.flags & 8 || Zs(this);
  }
  run() {
    if (!(this.flags & 1)) return this.fn();
    this.flags |= 2, es(this), Qs(this);
    const e = ee, t = Pe;
    ee = this, Pe = !0;
    try {
      return this.fn();
    } finally {
      ei(this), ee = e, Pe = t, this.flags &= -3;
    }
  }
  stop() {
    if (this.flags & 1) {
      for (let e = this.deps; e; e = e.nextDep) Rn(e);
      this.deps = this.depsTail = void 0, es(this), this.onStop && this.onStop(), this.flags &= -2;
    }
  }
  trigger() {
    this.flags & 64 ? Xr.add(this) : this.scheduler ? this.scheduler() : this.runIfDirty();
  }
  runIfDirty() {
    an(this) && this.run();
  }
  get dirty() {
    return an(this);
  }
}, Xs = 0, Ut, Wt;
function Zs(e, t = !1) {
  if (e.flags |= 8, t) {
    e.next = Wt, Wt = e;
    return;
  }
  e.next = Ut, Ut = e;
}
function Pn() {
  Xs++;
}
function Fn() {
  if (--Xs > 0) return;
  if (Wt) {
    let t = Wt;
    for (Wt = void 0; t; ) {
      const r = t.next;
      t.next = void 0, t.flags &= -9, t = r;
    }
  }
  let e;
  for (; Ut; ) {
    let t = Ut;
    for (Ut = void 0; t; ) {
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
function Qs(e) {
  for (let t = e.deps; t; t = t.nextDep)
    t.version = -1, t.prevActiveLink = t.dep.activeLink, t.dep.activeLink = t;
}
function ei(e) {
  let t, r = e.depsTail, n = r;
  for (; n; ) {
    const s = n.prevDep;
    n.version === -1 ? (n === r && (r = s), Rn(n), Io(n)) : t = n, n.dep.activeLink = n.prevActiveLink, n.prevActiveLink = void 0, n = s;
  }
  e.deps = t, e.depsTail = r;
}
function an(e) {
  for (let t = e.deps; t; t = t.nextDep) if (t.dep.version !== t.version || t.dep.computed && (ti(t.dep.computed) || t.dep.version !== t.version)) return !0;
  return !!e._dirty;
}
function ti(e) {
  if (e.flags & 4 && !(e.flags & 16) || (e.flags &= -17, e.globalVersion === Yt) || (e.globalVersion = Yt, !e.isSSR && e.flags & 128 && (!e.deps && !e._dirty || !an(e)))) return;
  e.flags |= 2;
  const t = e.dep, r = ee, n = Pe;
  ee = e, Pe = !0;
  try {
    Qs(e);
    const s = e.fn(e._value);
    (t.version === 0 || he(s, e._value)) && (e.flags |= 128, e._value = s, t.version++);
  } catch (s) {
    throw t.version++, s;
  } finally {
    ee = r, Pe = n, ei(e), e.flags &= -3;
  }
}
function Rn(e, t = !1) {
  const { dep: r, prevSub: n, nextSub: s } = e;
  if (n && (n.nextSub = s, e.prevSub = void 0), s && (s.prevSub = n, e.nextSub = void 0), r.subs === e && (r.subs = n, !n && r.computed)) {
    r.computed.flags &= -5;
    for (let i = r.computed.deps; i; i = i.nextDep) Rn(i, !0);
  }
  !t && !--r.sc && r.map && r.map.delete(r.key);
}
function Io(e) {
  const { prevDep: t, nextDep: r } = e;
  t && (t.nextDep = r, e.prevDep = void 0), r && (r.prevDep = t, e.nextDep = void 0);
}
var Pe = !0, ri = [];
function qe() {
  ri.push(Pe), Pe = !1;
}
function Ge() {
  const e = ri.pop();
  Pe = e === void 0 ? !0 : e;
}
function es(e) {
  const { cleanup: t } = e;
  if (e.cleanup = void 0, t) {
    const r = ee;
    ee = void 0;
    try {
      t();
    } finally {
      ee = r;
    }
  }
}
var Yt = 0, Po = class {
  constructor(e, t) {
    this.sub = e, this.dep = t, this.version = t.version, this.nextDep = this.prevDep = this.nextSub = this.prevSub = this.prevActiveLink = void 0;
  }
}, Dr = class {
  constructor(e) {
    this.computed = e, this.version = 0, this.activeLink = void 0, this.subs = void 0, this.map = void 0, this.key = void 0, this.sc = 0, this.__v_skip = !0;
  }
  track(e) {
    if (!ee || !Pe || ee === this.computed) return;
    let t = this.activeLink;
    if (t === void 0 || t.sub !== ee)
      t = this.activeLink = new Po(ee, this), ee.deps ? (t.prevDep = ee.depsTail, ee.depsTail.nextDep = t, ee.depsTail = t) : ee.deps = ee.depsTail = t, ni(t);
    else if (t.version === -1 && (t.version = this.version, t.nextDep)) {
      const r = t.nextDep;
      r.prevDep = t.prevDep, t.prevDep && (t.prevDep.nextDep = r), t.prevDep = ee.depsTail, t.nextDep = void 0, ee.depsTail.nextDep = t, ee.depsTail = t, ee.deps === t && (ee.deps = r);
    }
    return t;
  }
  trigger(e) {
    this.version++, Yt++, this.notify(e);
  }
  notify(e) {
    Pn();
    try {
      for (let t = this.subs; t; t = t.prevSub) t.sub.notify() && t.sub.dep.notify();
    } finally {
      Fn();
    }
  }
};
function ni(e) {
  if (e.dep.sc++, e.sub.flags & 4) {
    const t = e.dep.computed;
    if (t && !e.dep.subs) {
      t.flags |= 20;
      for (let n = t.deps; n; n = n.nextDep) ni(n);
    }
    const r = e.dep.subs;
    r !== e && (e.prevSub = r, r && (r.nextSub = e)), e.dep.subs = e;
  }
}
var gr = /* @__PURE__ */ new WeakMap(), ht = /* @__PURE__ */ Symbol(""), cn = /* @__PURE__ */ Symbol(""), zt = /* @__PURE__ */ Symbol("");
function pe(e, t, r) {
  if (Pe && ee) {
    let n = gr.get(e);
    n || gr.set(e, n = /* @__PURE__ */ new Map());
    let s = n.get(r);
    s || (n.set(r, s = new Dr()), s.map = n, s.key = r), s.track();
  }
}
function ke(e, t, r, n, s, i) {
  const o = gr.get(e);
  if (!o) {
    Yt++;
    return;
  }
  const l = (f) => {
    f && f.trigger();
  };
  if (Pn(), t === "clear") o.forEach(l);
  else {
    const f = P(e), u = f && Pr(r);
    if (f && r === "length") {
      const c = Number(n);
      o.forEach((h, v) => {
        (v === "length" || v === zt || !we(v) && v >= c) && l(h);
      });
    } else
      switch ((r !== void 0 || o.has(void 0)) && l(o.get(r)), u && l(o.get(zt)), t) {
        case "add":
          f ? u && l(o.get("length")) : (l(o.get(ht)), xt(e) && l(o.get(cn)));
          break;
        case "delete":
          f || (l(o.get(ht)), xt(e) && l(o.get(cn)));
          break;
        case "set":
          xt(e) && l(o.get(ht));
          break;
      }
  }
  Fn();
}
function Fo(e, t) {
  const r = gr.get(e);
  return r && r.get(t);
}
function _t(e) {
  const t = /* @__PURE__ */ k(e);
  return t === e ? t : (pe(t, "iterate", zt), /* @__PURE__ */ Te(e) ? t : t.map(Fe));
}
function Vr(e) {
  return pe(e = /* @__PURE__ */ k(e), "iterate", zt), e;
}
function De(e, t) {
  return /* @__PURE__ */ Je(e) ? Et(/* @__PURE__ */ pt(e) ? Fe(t) : t) : Fe(t);
}
var Ro = {
  __proto__: null,
  [Symbol.iterator]() {
    return Zr(this, Symbol.iterator, (e) => De(this, e));
  },
  concat(...e) {
    return _t(this).concat(...e.map((t) => P(t) ? _t(t) : t));
  },
  entries() {
    return Zr(this, "entries", (e) => (e[1] = De(this, e[1]), e));
  },
  every(e, t) {
    return $e(this, "every", e, t, void 0, arguments);
  },
  filter(e, t) {
    return $e(this, "filter", e, t, (r) => r.map((n) => De(this, n)), arguments);
  },
  find(e, t) {
    return $e(this, "find", e, t, (r) => De(this, r), arguments);
  },
  findIndex(e, t) {
    return $e(this, "findIndex", e, t, void 0, arguments);
  },
  findLast(e, t) {
    return $e(this, "findLast", e, t, (r) => De(this, r), arguments);
  },
  findLastIndex(e, t) {
    return $e(this, "findLastIndex", e, t, void 0, arguments);
  },
  forEach(e, t) {
    return $e(this, "forEach", e, t, void 0, arguments);
  },
  includes(...e) {
    return Qr(this, "includes", e);
  },
  indexOf(...e) {
    return Qr(this, "indexOf", e);
  },
  join(e) {
    return _t(this).join(e);
  },
  lastIndexOf(...e) {
    return Qr(this, "lastIndexOf", e);
  },
  map(e, t) {
    return $e(this, "map", e, t, void 0, arguments);
  },
  pop() {
    return Nt(this, "pop");
  },
  push(...e) {
    return Nt(this, "push", e);
  },
  reduce(e, ...t) {
    return ts(this, "reduce", e, t);
  },
  reduceRight(e, ...t) {
    return ts(this, "reduceRight", e, t);
  },
  shift() {
    return Nt(this, "shift");
  },
  some(e, t) {
    return $e(this, "some", e, t, void 0, arguments);
  },
  splice(...e) {
    return Nt(this, "splice", e);
  },
  toReversed() {
    return _t(this).toReversed();
  },
  toSorted(e) {
    return _t(this).toSorted(e);
  },
  toSpliced(...e) {
    return _t(this).toSpliced(...e);
  },
  unshift(...e) {
    return Nt(this, "unshift", e);
  },
  values() {
    return Zr(this, "values", (e) => De(this, e));
  }
};
function Zr(e, t, r) {
  const n = Vr(e), s = n[t]();
  return n !== e && !/* @__PURE__ */ Te(e) && (s._next = s.next, s.next = () => {
    const i = s._next();
    return i.done || (i.value = r(i.value)), i;
  }), s;
}
var Lo = Array.prototype;
function $e(e, t, r, n, s, i) {
  const o = Vr(e), l = o !== e && !/* @__PURE__ */ Te(e), f = o[t];
  if (f !== Lo[t]) {
    const h = f.apply(e, i);
    return l ? Fe(h) : h;
  }
  let u = r;
  o !== e && (l ? u = function(h, v) {
    return r.call(this, De(e, h), v, e);
  } : r.length > 2 && (u = function(h, v) {
    return r.call(this, h, v, e);
  }));
  const c = f.call(o, u, n);
  return l && s ? s(c) : c;
}
function ts(e, t, r, n) {
  const s = Vr(e), i = s !== e && !/* @__PURE__ */ Te(e);
  let o = r, l = !1;
  s !== e && (i ? (l = n.length === 0, o = function(u, c, h) {
    return l && (l = !1, u = De(e, u)), r.call(this, u, De(e, c), h, e);
  }) : r.length > 3 && (o = function(u, c, h) {
    return r.call(this, u, c, h, e);
  }));
  const f = s[t](o, ...n);
  return l ? De(e, f) : f;
}
function Qr(e, t, r) {
  const n = /* @__PURE__ */ k(e);
  pe(n, "iterate", zt);
  const s = n[t](...r);
  return (s === -1 || s === !1) && /* @__PURE__ */ Hr(r[0]) ? (r[0] = /* @__PURE__ */ k(r[0]), n[t](...r)) : s;
}
function Nt(e, t, r = []) {
  qe(), Pn();
  const n = (/* @__PURE__ */ k(e))[t].apply(e, r);
  return Fn(), Ge(), n;
}
var No = /* @__PURE__ */ Mr("__proto__,__v_isRef,__isVue"), si = new Set(/* @__PURE__ */ Object.getOwnPropertyNames(Symbol).filter((e) => e !== "arguments" && e !== "caller").map((e) => Symbol[e]).filter(we));
function Do(e) {
  we(e) || (e = String(e));
  const t = /* @__PURE__ */ k(this);
  return pe(t, "has", e), t.hasOwnProperty(e);
}
var ii = class {
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
      return r === (n ? s ? qo : ai : s ? fi : li).get(e) || Object.getPrototypeOf(e) === Object.getPrototypeOf(r) ? e : void 0;
    const i = P(e);
    if (!n) {
      let l;
      if (i && (l = Ro[t])) return l;
      if (t === "hasOwnProperty") return Do;
    }
    const o = Reflect.get(e, t, /* @__PURE__ */ fe(e) ? e : r);
    if ((we(t) ? si.has(t) : No(t)) || (n || pe(e, "get", t), s)) return o;
    if (/* @__PURE__ */ fe(o)) {
      const l = i && Pr(t) ? o : o.value;
      return n && J(l) ? /* @__PURE__ */ dn(l) : l;
    }
    return J(o) ? n ? /* @__PURE__ */ dn(o) : /* @__PURE__ */ Nn(o) : o;
  }
}, oi = class extends ii {
  constructor(e = !1) {
    super(!1, e);
  }
  set(e, t, r, n) {
    let s = e[t];
    const i = P(e) && Pr(t);
    if (!this._isShallow) {
      const f = /* @__PURE__ */ Je(s);
      if (!/* @__PURE__ */ Te(r) && !/* @__PURE__ */ Je(r) && (s = /* @__PURE__ */ k(s), r = /* @__PURE__ */ k(r)), !i && /* @__PURE__ */ fe(s) && !/* @__PURE__ */ fe(r)) return f || (s.value = r), !0;
    }
    const o = i ? Number(t) < e.length : Y(e, t), l = Reflect.set(e, t, r, /* @__PURE__ */ fe(e) ? e : n);
    return e === /* @__PURE__ */ k(n) && (o ? he(r, s) && ke(e, "set", t, r, s) : ke(e, "add", t, r)), l;
  }
  deleteProperty(e, t) {
    const r = Y(e, t), n = e[t], s = Reflect.deleteProperty(e, t);
    return s && r && ke(e, "delete", t, void 0, n), s;
  }
  has(e, t) {
    const r = Reflect.has(e, t);
    return (!we(t) || !si.has(t)) && pe(e, "has", t), r;
  }
  ownKeys(e) {
    return pe(e, "iterate", P(e) ? "length" : ht), Reflect.ownKeys(e);
  }
}, Vo = class extends ii {
  constructor(e = !1) {
    super(!0, e);
  }
  set(e, t) {
    return !0;
  }
  deleteProperty(e, t) {
    return !0;
  }
}, Ho = /* @__PURE__ */ new oi(), jo = /* @__PURE__ */ new Vo(), $o = /* @__PURE__ */ new oi(!0), un = (e) => e, lr = (e) => Reflect.getPrototypeOf(e);
function Bo(e, t, r) {
  return function(...n) {
    const s = this.__v_raw, i = /* @__PURE__ */ k(s), o = xt(i), l = e === "entries" || e === Symbol.iterator && o, f = e === "keys" && o, u = s[e](...n), c = r ? un : t ? Et : Fe;
    return !t && pe(i, "iterate", f ? cn : ht), ne(Object.create(u), { next() {
      const { value: h, done: v } = u.next();
      return v ? {
        value: h,
        done: v
      } : {
        value: l ? [c(h[0]), c(h[1])] : c(h),
        done: v
      };
    } });
  };
}
function fr(e) {
  return function(...t) {
    return e === "delete" ? !1 : e === "clear" ? void 0 : this;
  };
}
function Ko(e, t) {
  const r = {
    get(n) {
      const s = this.__v_raw, i = /* @__PURE__ */ k(s), o = /* @__PURE__ */ k(n);
      e || (he(n, o) && pe(i, "get", n), pe(i, "get", o));
      const { has: l } = lr(i), f = t ? un : e ? Et : Fe;
      if (l.call(i, n)) return f(s.get(n));
      if (l.call(i, o)) return f(s.get(o));
      s !== i && s.get(n);
    },
    get size() {
      const n = this.__v_raw;
      return !e && pe(/* @__PURE__ */ k(n), "iterate", ht), n.size;
    },
    has(n) {
      const s = this.__v_raw, i = /* @__PURE__ */ k(s), o = /* @__PURE__ */ k(n);
      return e || (he(n, o) && pe(i, "has", n), pe(i, "has", o)), n === o ? s.has(n) : s.has(n) || s.has(o);
    },
    forEach(n, s) {
      const i = this, o = i.__v_raw, l = /* @__PURE__ */ k(o), f = t ? un : e ? Et : Fe;
      return !e && pe(l, "iterate", ht), o.forEach((u, c) => n.call(s, f(u), f(c), i));
    }
  };
  return ne(r, e ? {
    add: fr("add"),
    set: fr("set"),
    delete: fr("delete"),
    clear: fr("clear")
  } : {
    add(n) {
      const s = /* @__PURE__ */ k(this), i = lr(s), o = /* @__PURE__ */ k(n), l = !t && !/* @__PURE__ */ Te(n) && !/* @__PURE__ */ Je(n) ? o : n;
      return i.has.call(s, l) || he(n, l) && i.has.call(s, n) || he(o, l) && i.has.call(s, o) || (s.add(l), ke(s, "add", l, l)), this;
    },
    set(n, s) {
      !t && !/* @__PURE__ */ Te(s) && !/* @__PURE__ */ Je(s) && (s = /* @__PURE__ */ k(s));
      const i = /* @__PURE__ */ k(this), { has: o, get: l } = lr(i);
      let f = o.call(i, n);
      f || (n = /* @__PURE__ */ k(n), f = o.call(i, n));
      const u = l.call(i, n);
      return i.set(n, s), f ? he(s, u) && ke(i, "set", n, s, u) : ke(i, "add", n, s), this;
    },
    delete(n) {
      const s = /* @__PURE__ */ k(this), { has: i, get: o } = lr(s);
      let l = i.call(s, n);
      l || (n = /* @__PURE__ */ k(n), l = i.call(s, n));
      const f = o ? o.call(s, n) : void 0, u = s.delete(n);
      return l && ke(s, "delete", n, void 0, f), u;
    },
    clear() {
      const n = /* @__PURE__ */ k(this), s = n.size !== 0, i = void 0, o = n.clear();
      return s && ke(n, "clear", void 0, void 0, i), o;
    }
  }), [
    "keys",
    "values",
    "entries",
    Symbol.iterator
  ].forEach((n) => {
    r[n] = Bo(n, e, t);
  }), r;
}
function Ln(e, t) {
  const r = Ko(e, t);
  return (n, s, i) => s === "__v_isReactive" ? !e : s === "__v_isReadonly" ? e : s === "__v_raw" ? n : Reflect.get(Y(r, s) && s in n ? r : n, s, i);
}
var ko = { get: /* @__PURE__ */ Ln(!1, !1) }, Uo = { get: /* @__PURE__ */ Ln(!1, !0) }, Wo = { get: /* @__PURE__ */ Ln(!0, !1) }, li = /* @__PURE__ */ new WeakMap(), fi = /* @__PURE__ */ new WeakMap(), ai = /* @__PURE__ */ new WeakMap(), qo = /* @__PURE__ */ new WeakMap();
function Go(e) {
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
function Nn(e) {
  return /* @__PURE__ */ Je(e) ? e : Dn(e, !1, Ho, ko, li);
}
// @__NO_SIDE_EFFECTS__
function Jo(e) {
  return Dn(e, !1, $o, Uo, fi);
}
// @__NO_SIDE_EFFECTS__
function dn(e) {
  return Dn(e, !0, jo, Wo, ai);
}
function Dn(e, t, r, n, s) {
  if (!J(e) || e.__v_raw && !(t && e.__v_isReactive) || e.__v_skip || !Object.isExtensible(e)) return e;
  const i = s.get(e);
  if (i) return i;
  const o = Go(mo(e));
  if (o === 0) return e;
  const l = new Proxy(e, o === 2 ? n : r);
  return s.set(e, l), l;
}
// @__NO_SIDE_EFFECTS__
function pt(e) {
  return /* @__PURE__ */ Je(e) ? /* @__PURE__ */ pt(e.__v_raw) : !!(e && e.__v_isReactive);
}
// @__NO_SIDE_EFFECTS__
function Je(e) {
  return !!(e && e.__v_isReadonly);
}
// @__NO_SIDE_EFFECTS__
function Te(e) {
  return !!(e && e.__v_isShallow);
}
// @__NO_SIDE_EFFECTS__
function Hr(e) {
  return e ? !!e.__v_raw : !1;
}
// @__NO_SIDE_EFFECTS__
function k(e) {
  const t = e && e.__v_raw;
  return t ? /* @__PURE__ */ k(t) : e;
}
function Yo(e) {
  return !Y(e, "__v_skip") && Object.isExtensible(e) && Ws(e, "__v_skip", !0), e;
}
var Fe = (e) => J(e) ? /* @__PURE__ */ Nn(e) : e, Et = (e) => J(e) ? /* @__PURE__ */ dn(e) : e;
// @__NO_SIDE_EFFECTS__
function fe(e) {
  return e ? e.__v_isRef === !0 : !1;
}
// @__NO_SIDE_EFFECTS__
function zo(e) {
  return ci(e, !1);
}
// @__NO_SIDE_EFFECTS__
function ia(e) {
  return ci(e, !0);
}
function ci(e, t) {
  return /* @__PURE__ */ fe(e) ? e : new Xo(e, t);
}
var Xo = class {
  constructor(e, t) {
    this.dep = new Dr(), this.__v_isRef = !0, this.__v_isShallow = !1, this._rawValue = t ? e : /* @__PURE__ */ k(e), this._value = t ? e : Fe(e), this.__v_isShallow = t;
  }
  get value() {
    return this.dep.track(), this._value;
  }
  set value(e) {
    const t = this._rawValue, r = this.__v_isShallow || /* @__PURE__ */ Te(e) || /* @__PURE__ */ Je(e);
    e = r ? e : /* @__PURE__ */ k(e), he(e, t) && (this._rawValue = e, this._value = r ? e : Fe(e), this.dep.trigger());
  }
};
function ui(e) {
  return /* @__PURE__ */ fe(e) ? e.value : e;
}
var Zo = {
  get: (e, t, r) => t === "__v_raw" ? e : ui(Reflect.get(e, t, r)),
  set: (e, t, r, n) => {
    const s = e[t];
    return /* @__PURE__ */ fe(s) && !/* @__PURE__ */ fe(r) ? (s.value = r, !0) : Reflect.set(e, t, r, n);
  }
};
function di(e) {
  return /* @__PURE__ */ pt(e) ? e : new Proxy(e, Zo);
}
var Qo = class {
  constructor(e) {
    this.__v_isRef = !0, this._value = void 0;
    const t = this.dep = new Dr(), { get: r, set: n } = e(t.track.bind(t), t.trigger.bind(t));
    this._get = r, this._set = n;
  }
  get value() {
    return this._value = this._get();
  }
  set value(e) {
    this._set(e);
  }
};
function el(e) {
  return new Qo(e);
}
var tl = class {
  constructor(e, t, r) {
    this._object = e, this._defaultValue = r, this.__v_isRef = !0, this._value = void 0, this._key = we(t) ? t : String(t), this._raw = /* @__PURE__ */ k(e);
    let n = !0, s = e;
    if (!P(e) || we(this._key) || !Pr(this._key)) do
      n = !/* @__PURE__ */ Hr(s) || /* @__PURE__ */ Te(s);
    while (n && (s = s.__v_raw));
    this._shallow = n;
  }
  get value() {
    let e = this._object[this._key];
    return this._shallow && (e = ui(e)), this._value = e === void 0 ? this._defaultValue : e;
  }
  set value(e) {
    if (this._shallow && /* @__PURE__ */ fe(this._raw[this._key])) {
      const t = this._object[this._key];
      if (/* @__PURE__ */ fe(t)) {
        t.value = e;
        return;
      }
    }
    this._object[this._key] = e;
  }
  get dep() {
    return Fo(this._raw, this._key);
  }
}, rl = class {
  constructor(e) {
    this._getter = e, this.__v_isRef = !0, this.__v_isReadonly = !0, this._value = void 0;
  }
  get value() {
    return this._value = this._getter();
  }
};
// @__NO_SIDE_EFFECTS__
function oa(e, t, r) {
  return /* @__PURE__ */ fe(e) ? e : $(e) ? new rl(e) : J(e) && arguments.length > 1 ? nl(e, t, r) : /* @__PURE__ */ zo(e);
}
function nl(e, t, r) {
  return new tl(e, t, r);
}
var sl = class {
  constructor(e, t, r) {
    this.fn = e, this.setter = t, this._value = void 0, this.dep = new Dr(this), this.__v_isRef = !0, this.deps = void 0, this.depsTail = void 0, this.flags = 16, this.globalVersion = Yt - 1, this.next = void 0, this.effect = this, this.__v_isReadonly = !t, this.isSSR = r;
  }
  notify() {
    if (this.flags |= 16, !(this.flags & 8) && ee !== this)
      return Zs(this, !0), !0;
  }
  get value() {
    const e = this.dep.track();
    return ti(this), e && (e.version = this.dep.version), this._value;
  }
  set value(e) {
    this.setter && this.setter(e);
  }
};
// @__NO_SIDE_EFFECTS__
function il(e, t, r = !1) {
  let n, s;
  return $(e) ? n = e : (n = e.get, s = e.set), new sl(n, s, r);
}
var ar = {}, vr = /* @__PURE__ */ new WeakMap(), ut = void 0;
function ol(e, t = !1, r = ut) {
  if (r) {
    let n = vr.get(r);
    n || vr.set(r, n = []), n.push(e);
  }
}
function ll(e, t, r = G) {
  const { immediate: n, deep: s, once: i, scheduler: o, augmentJob: l, call: f } = r, u = (x) => s ? x : /* @__PURE__ */ Te(x) || s === !1 || s === 0 ? Ue(x, 1) : Ue(x);
  let c, h, v, C, M = !1, g = !1;
  if (/* @__PURE__ */ fe(e) ? (h = () => e.value, M = /* @__PURE__ */ Te(e)) : /* @__PURE__ */ pt(e) ? (h = () => u(e), M = !0) : P(e) ? (g = !0, M = e.some((x) => /* @__PURE__ */ pt(x) || /* @__PURE__ */ Te(x)), h = () => e.map((x) => {
    if (/* @__PURE__ */ fe(x)) return x.value;
    if (/* @__PURE__ */ pt(x)) return u(x);
    if ($(x)) return f ? f(x, 2) : x();
  })) : $(e) ? t ? h = f ? () => f(e, 2) : e : h = () => {
    if (v) {
      qe();
      try {
        v();
      } finally {
        Ge();
      }
    }
    const x = ut;
    ut = c;
    try {
      return f ? f(e, 3, [C]) : e(C);
    } finally {
      ut = x;
    }
  } : h = He, t && s) {
    const x = h, j = s === !0 ? 1 / 0 : s;
    h = () => Ue(x(), j);
  }
  const F = Oo(), R = () => {
    c.stop(), F && F.active && An(F.effects, c);
  };
  if (i && t) {
    const x = t;
    t = (...j) => {
      x(...j), R();
    };
  }
  let m = g ? new Array(e.length).fill(ar) : ar;
  const A = (x) => {
    if (!(!(c.flags & 1) || !c.dirty && !x))
      if (t) {
        const j = c.run();
        if (s || M || (g ? j.some((U, V) => he(U, m[V])) : he(j, m))) {
          v && v();
          const U = ut;
          ut = c;
          try {
            const V = [
              j,
              m === ar ? void 0 : g && m[0] === ar ? [] : m,
              C
            ];
            m = j, f ? f(t, 3, V) : t(...V);
          } finally {
            ut = U;
          }
        }
      } else c.run();
  };
  return l && l(A), c = new zs(h), c.scheduler = o ? () => o(A, !1) : A, C = (x) => ol(x, !1, c), v = c.onStop = () => {
    const x = vr.get(c);
    if (x) {
      if (f) f(x, 4);
      else for (const j of x) j();
      vr.delete(c);
    }
  }, t ? n ? A(!0) : m = c.run() : o ? o(A.bind(null, !0), !0) : c.run(), R.pause = c.pause.bind(c), R.resume = c.resume.bind(c), R.stop = R, R;
}
function Ue(e, t = 1 / 0, r) {
  if (t <= 0 || !J(e) || e.__v_skip || (r = r || /* @__PURE__ */ new Map(), (r.get(e) || 0) >= t)) return e;
  if (r.set(e, t), t--, /* @__PURE__ */ fe(e)) Ue(e.value, t, r);
  else if (P(e)) for (let n = 0; n < e.length; n++) Ue(e[n], t, r);
  else if (It(e) || xt(e)) e.forEach((n) => {
    Ue(n, t, r);
  });
  else if (Us(e)) {
    for (const n in e) Ue(e[n], t, r);
    for (const n of Object.getOwnPropertySymbols(e)) Object.prototype.propertyIsEnumerable.call(e, n) && Ue(e[n], t, r);
  }
  return e;
}
function rr(e, t, r, n) {
  try {
    return n ? e(...n) : e();
  } catch (s) {
    jr(s, t, r);
  }
}
function Oe(e, t, r, n) {
  if ($(e)) {
    const s = rr(e, t, r, n);
    return s && Ks(s) && s.catch((i) => {
      jr(i, t, r);
    }), s;
  }
  if (P(e)) {
    const s = [];
    for (let i = 0; i < e.length; i++) s.push(Oe(e[i], t, r, n));
    return s;
  }
}
function jr(e, t, r, n = !0) {
  const s = t ? t.vnode : null, { errorHandler: i, throwUnhandledErrorInProduction: o } = t && t.appContext.config || G;
  if (t) {
    let l = t.parent;
    const f = t.proxy, u = `https://vuejs.org/error-reference/#runtime-${r}`;
    for (; l; ) {
      const c = l.ec;
      if (c) {
        for (let h = 0; h < c.length; h++) if (c[h](e, f, u) === !1) return;
      }
      l = l.parent;
    }
    if (i) {
      qe(), rr(i, null, 10, [
        e,
        f,
        u
      ]), Ge();
      return;
    }
  }
  fl(e, r, s, n, o);
}
function fl(e, t, r, n = !0, s = !1) {
  if (s) throw e;
  console.error(e);
}
var be = [], Ne = -1, Ct = [], nt = null, bt = 0, hi = /* @__PURE__ */ Promise.resolve(), mr = null;
function $r(e) {
  const t = mr || hi;
  return e ? t.then(this ? e.bind(this) : e) : t;
}
function al(e) {
  let t = Ne + 1, r = be.length;
  for (; t < r; ) {
    const n = t + r >>> 1, s = be[n], i = Xt(s);
    i < e || i === e && s.flags & 2 ? t = n + 1 : r = n;
  }
  return t;
}
function Vn(e) {
  if (!(e.flags & 1)) {
    const t = Xt(e), r = be[be.length - 1];
    !r || !(e.flags & 2) && t >= Xt(r) ? be.push(e) : be.splice(al(t), 0, e), e.flags |= 1, pi();
  }
}
function pi() {
  mr || (mr = hi.then(vi));
}
function cl(e) {
  P(e) ? Ct.push(...e) : nt && e.id === -1 ? nt.splice(bt + 1, 0, e) : e.flags & 1 || (Ct.push(e), e.flags |= 1), pi();
}
function rs(e, t, r = Ne + 1) {
  for (; r < be.length; r++) {
    const n = be[r];
    if (n && n.flags & 2) {
      if (e && n.id !== e.uid) continue;
      be.splice(r, 1), r--, n.flags & 4 && (n.flags &= -2), n(), n.flags & 4 || (n.flags &= -2);
    }
  }
}
function gi(e) {
  if (Ct.length) {
    const t = [...new Set(Ct)].sort((r, n) => Xt(r) - Xt(n));
    if (Ct.length = 0, nt) {
      nt.push(...t);
      return;
    }
    for (nt = t, bt = 0; bt < nt.length; bt++) {
      const r = nt[bt];
      r.flags & 4 && (r.flags &= -2), r.flags & 8 || r(), r.flags &= -2;
    }
    nt = null, bt = 0;
  }
}
var Xt = (e) => e.id == null ? e.flags & 2 ? -1 : 1 / 0 : e.id;
function vi(e) {
  try {
    for (Ne = 0; Ne < be.length; Ne++) {
      const t = be[Ne];
      t && !(t.flags & 8) && (t.flags & 4 && (t.flags &= -2), rr(t, t.i, t.i ? 15 : 14), t.flags & 4 || (t.flags &= -2));
    }
  } finally {
    for (; Ne < be.length; Ne++) {
      const t = be[Ne];
      t && (t.flags &= -2);
    }
    Ne = -1, be.length = 0, gi(e), mr = null, (be.length || Ct.length) && vi(e);
  }
}
var de = null, mi = null;
function _r(e) {
  const t = de;
  return de = e, mi = e && e.type.__scopeId || null, t;
}
function ul(e, t = de, r) {
  if (!t || e._n) return e;
  const n = (...s) => {
    n._d && Tr(-1);
    const i = _r(t);
    let o;
    try {
      o = e(...s);
    } finally {
      _r(i), n._d && Tr(1);
    }
    return o;
  };
  return n._n = !0, n._c = !0, n._d = !0, n;
}
function la(e, t) {
  if (de === null) return e;
  const r = qr(de), n = e.dirs || (e.dirs = []);
  for (let s = 0; s < t.length; s++) {
    let [i, o, l, f = G] = t[s];
    i && ($(i) && (i = {
      mounted: i,
      updated: i
    }), i.deep && Ue(o), n.push({
      dir: i,
      instance: r,
      value: o,
      oldValue: void 0,
      arg: l,
      modifiers: f
    }));
  }
  return e;
}
function ft(e, t, r, n) {
  const s = e.dirs, i = t && t.dirs;
  for (let o = 0; o < s.length; o++) {
    const l = s[o];
    i && (l.oldValue = i[o].value);
    let f = l.dir[n];
    f && (qe(), Oe(f, r, 8, [
      e.el,
      l,
      e,
      t
    ]), Ge());
  }
}
function dl(e, t) {
  if (ge) {
    let r = ge.provides;
    const n = ge.parent && ge.parent.provides;
    n === r && (r = ge.provides = Object.create(n)), r[e] = t;
  }
}
function Tt(e, t, r = !1) {
  const n = vt();
  if (n || wt) {
    let s = wt ? wt._context.provides : n ? n.parent == null || n.ce ? n.vnode.appContext && n.vnode.appContext.provides : n.parent.provides : void 0;
    if (s && e in s) return s[e];
    if (arguments.length > 1) return r && $(t) ? t.call(n && n.proxy) : t;
  }
}
var hl = /* @__PURE__ */ Symbol.for("v-scx"), pl = () => {
  {
    const e = Tt(hl);
    return e;
  }
};
function fa(e, t) {
  return Br(e, null, t);
}
function gl(e, t) {
  return Br(e, null, { flush: "sync" });
}
function gt(e, t, r) {
  return Br(e, t, r);
}
function Br(e, t, r = G) {
  const { immediate: n, deep: s, flush: i, once: o } = r, l = ne({}, r), f = t && n || !t && i !== "post";
  let u;
  if (er) {
    if (i === "sync") {
      const C = pl();
      u = C.__watcherHandles || (C.__watcherHandles = []);
    } else if (!f) {
      const C = () => {
      };
      return C.stop = He, C.resume = He, C.pause = He, C;
    }
  }
  const c = ge;
  l.call = (C, M, g) => Oe(C, c, M, g);
  let h = !1;
  i === "post" ? l.scheduler = (C) => {
    le(C, c && c.suspense);
  } : i !== "sync" && (h = !0, l.scheduler = (C, M) => {
    M ? C() : Vn(C);
  }), l.augmentJob = (C) => {
    t && (C.flags |= 4), h && (C.flags |= 2, c && (C.id = c.uid, C.i = c));
  };
  const v = ll(e, t, l);
  return er && (u ? u.push(v) : f && v()), v;
}
function vl(e, t, r) {
  const n = this.proxy, s = te(e) ? e.includes(".") ? _i(n, e) : () => n[e] : e.bind(n, n);
  let i;
  $(t) ? i = t : (i = t.handler, r = t);
  const o = nr(this), l = Br(s, i.bind(n), r);
  return o(), l;
}
function _i(e, t) {
  const r = t.split(".");
  return () => {
    let n = e;
    for (let s = 0; s < r.length && n; s++) n = n[r[s]];
    return n;
  };
}
var tt = /* @__PURE__ */ new WeakMap(), bi = /* @__PURE__ */ Symbol("_vte"), yi = (e) => e.__isTeleport, dt = (e) => e && (e.disabled || e.disabled === ""), ml = (e) => e && (e.defer || e.defer === ""), ns = (e) => typeof SVGElement < "u" && e instanceof SVGElement, ss = (e) => typeof MathMLElement == "function" && e instanceof MathMLElement, hn = (e, t) => {
  const r = e && e.to;
  return te(r) ? t ? t(r) : null : r;
}, _l = {
  name: "Teleport",
  __isTeleport: !0,
  process(e, t, r, n, s, i, o, l, f, u) {
    const { mc: c, pc: h, pbc: v, o: { insert: C, querySelector: M, createText: g, createComment: F, parentNode: R } } = u, m = dt(t.props);
    let { dynamicChildren: A } = t;
    const x = (V, K, L) => {
      V.shapeFlag & 16 && c(V.children, K, L, s, i, o, l, f);
    }, j = (V = t) => {
      const K = dt(V.props), L = V.target = hn(V.props, M), B = pn(L, V, g, C);
      L && (o !== "svg" && ns(L) ? o = "svg" : o !== "mathml" && ss(L) && (o = "mathml"), s && s.isCE && (s.ce._teleportTargets || (s.ce._teleportTargets = /* @__PURE__ */ new Set())).add(L), K || (x(V, L, B), jt(V, !1)));
    }, U = (V) => {
      const K = () => {
        tt.get(V) === K && (tt.delete(V), dt(V.props) && (x(V, R(V.el) || r, V.anchor), jt(V, !0)), j(V));
      };
      tt.set(V, K), le(K, i);
    };
    if (e == null) {
      const V = t.el = g(""), K = t.anchor = g("");
      if (C(V, r, n), C(K, r, n), ml(t.props) || i && i.pendingBranch) {
        U(t);
        return;
      }
      m && (x(t, r, K), jt(t, !0)), j();
    } else {
      t.el = e.el;
      const V = t.anchor = e.anchor, K = tt.get(e);
      if (K) {
        K.flags |= 8, tt.delete(e), U(t);
        return;
      }
      t.targetStart = e.targetStart;
      const L = t.target = e.target, B = t.targetAnchor = e.targetAnchor, W = dt(e.props), I = W ? r : L, z = W ? V : B;
      if (o === "svg" || ns(L) ? o = "svg" : (o === "mathml" || ss(L)) && (o = "mathml"), A ? (v(e.dynamicChildren, A, I, s, i, o, l), Wn(e, t, !0)) : f || h(e, t, I, z, s, i, o, l, !1), m)
        W ? t.props && e.props && t.props.to !== e.props.to && (t.props.to = e.props.to) : cr(t, r, V, u, 1);
      else if ((t.props && t.props.to) !== (e.props && e.props.to)) {
        const ie = t.target = hn(t.props, M);
        ie && cr(t, ie, null, u, 0);
      } else W && cr(t, L, B, u, 1);
      jt(t, m);
    }
  },
  remove(e, t, r, { um: n, o: { remove: s } }, i) {
    const { shapeFlag: o, children: l, anchor: f, targetStart: u, targetAnchor: c, target: h, props: v } = e, C = i || !dt(v), M = tt.get(e);
    if (M && (M.flags |= 8, tt.delete(e)), h && (s(u), s(c)), i && s(f), !M && o & 16) for (let g = 0; g < l.length; g++) {
      const F = l[g];
      n(F, t, r, C, !!F.dynamicChildren);
    }
  },
  move: cr,
  hydrate: bl
};
function cr(e, t, r, { o: { insert: n }, m: s }, i = 2) {
  i === 0 && n(e.targetAnchor, t, r);
  const { el: o, anchor: l, shapeFlag: f, children: u, props: c } = e, h = i === 2;
  if (h && n(o, t, r), !tt.has(e) && (!h || dt(c)) && f & 16)
    for (let v = 0; v < u.length; v++) s(u[v], t, r, 2);
  h && n(l, t, r);
}
function bl(e, t, r, n, s, i, { o: { nextSibling: o, parentNode: l, querySelector: f, insert: u, createText: c } }, h) {
  function v(F, R) {
    let m = R;
    for (; m; ) {
      if (m && m.nodeType === 8) {
        if (m.data === "teleport start anchor") t.targetStart = m;
        else if (m.data === "teleport anchor") {
          t.targetAnchor = m, F._lpa = t.targetAnchor && o(t.targetAnchor);
          break;
        }
      }
      m = o(m);
    }
  }
  function C(F, R) {
    R.anchor = h(o(F), R, l(F), r, n, s, i);
  }
  const M = t.target = hn(t.props, f), g = dt(t.props);
  if (M) {
    const F = M._lpa || M.firstChild;
    t.shapeFlag & 16 && (g ? (C(e, t), v(M, F), t.targetAnchor || pn(M, t, c, u, l(e) === M ? e : null)) : (t.anchor = o(e), v(M, F), t.targetAnchor || pn(M, t, c, u), h(F && o(F), t, M, r, n, s, i))), jt(t, g);
  } else g && t.shapeFlag & 16 && (C(e, t), t.targetStart = e, t.targetAnchor = o(e));
  return t.anchor && o(t.anchor);
}
var aa = _l;
function jt(e, t) {
  const r = e.ctx;
  if (r && r.ut) {
    let n, s;
    for (t ? (n = e.el, s = e.anchor) : (n = e.targetStart, s = e.targetAnchor); n && n !== s; )
      n.nodeType === 1 && n.setAttribute("data-v-owner", r.uid), n = n.nextSibling;
    r.ut();
  }
}
function pn(e, t, r, n, s = null) {
  const i = t.targetStart = r(""), o = t.targetAnchor = r("");
  return i[bi] = o, e && (n(i, e, s), n(o, e, s)), o;
}
var Me = /* @__PURE__ */ Symbol("_leaveCb"), Dt = /* @__PURE__ */ Symbol("_enterCb");
function xi() {
  const e = {
    isMounted: !1,
    isLeaving: !1,
    isUnmounting: !1,
    leavingVNodes: /* @__PURE__ */ new Map()
  };
  return jn(() => {
    e.isMounted = !0;
  }), Bn(() => {
    e.isUnmounting = !0;
  }), e;
}
var Ee = [Function, Array], Si = {
  mode: String,
  appear: Boolean,
  persisted: Boolean,
  onBeforeEnter: Ee,
  onEnter: Ee,
  onAfterEnter: Ee,
  onEnterCancelled: Ee,
  onBeforeLeave: Ee,
  onLeave: Ee,
  onAfterLeave: Ee,
  onLeaveCancelled: Ee,
  onBeforeAppear: Ee,
  onAppear: Ee,
  onAfterAppear: Ee,
  onAppearCancelled: Ee
}, Ci = (e) => {
  const t = e.subTree;
  return t.component ? Ci(t.component) : t;
}, yl = {
  name: "BaseTransition",
  props: Si,
  setup(e, { slots: t }) {
    const r = vt(), n = xi();
    return () => {
      const s = t.default && Hn(t.default(), !0), i = s && s.length ? Ti(s) : r.subTree ? af() : void 0;
      if (!i) return;
      const o = /* @__PURE__ */ k(e), { mode: l } = o;
      if (n.isLeaving) return en(i);
      const f = is(i);
      if (!f) return en(i);
      let u = Zt(f, o, n, r, (h) => u = h);
      f.type !== ue && lt(f, u);
      let c = r.subTree && is(r.subTree);
      if (c && c.type !== ue && !st(c, f) && Ci(r).type !== ue) {
        let h = Zt(c, o, n, r);
        if (lt(c, h), l === "out-in" && f.type !== ue)
          return n.isLeaving = !0, h.afterLeave = () => {
            n.isLeaving = !1, r.job.flags & 8 || r.update(), delete h.afterLeave, c = void 0;
          }, en(i);
        l === "in-out" && f.type !== ue ? h.delayLeave = (v, C, M) => {
          const g = wi(n, c);
          g[String(c.key)] = c, v[Me] = () => {
            C(), v[Me] = void 0, delete u.delayedLeave, c = void 0;
          }, u.delayedLeave = () => {
            M(), delete u.delayedLeave, c = void 0;
          };
        } : c = void 0;
      } else c && (c = void 0);
      return i;
    };
  }
};
function Ti(e) {
  let t = e[0];
  if (e.length > 1) {
    for (const r of e) if (r.type !== ue) {
      t = r;
      break;
    }
  }
  return t;
}
var xl = yl;
function wi(e, t) {
  const { leavingVNodes: r } = e;
  let n = r.get(t.type);
  return n || (n = /* @__PURE__ */ Object.create(null), r.set(t.type, n)), n;
}
function Zt(e, t, r, n, s) {
  const { appear: i, mode: o, persisted: l = !1, onBeforeEnter: f, onEnter: u, onAfterEnter: c, onEnterCancelled: h, onBeforeLeave: v, onLeave: C, onAfterLeave: M, onLeaveCancelled: g, onBeforeAppear: F, onAppear: R, onAfterAppear: m, onAppearCancelled: A } = t, x = String(e.key), j = wi(r, e), U = (L, B) => {
    L && Oe(L, n, 9, B);
  }, V = (L, B) => {
    const W = B[1];
    U(L, B), P(L) ? L.every((I) => I.length <= 1) && W() : L.length <= 1 && W();
  }, K = {
    mode: o,
    persisted: l,
    beforeEnter(L) {
      let B = f;
      if (!r.isMounted) if (i) B = F || f;
      else return;
      L[Me] && L[Me](!0);
      const W = j[x];
      W && st(e, W) && W.el[Me] && W.el[Me](), U(B, [L]);
    },
    enter(L) {
      if (j[x] === e) return;
      let B = u, W = c, I = h;
      if (!r.isMounted) if (i)
        B = R || u, W = m || c, I = A || h;
      else return;
      let z = !1;
      L[Dt] = (je) => {
        z || (z = !0, je ? U(I, [L]) : U(W, [L]), K.delayedLeave && K.delayedLeave(), L[Dt] = void 0);
      };
      const ie = L[Dt].bind(null, !1);
      B ? V(B, [L, ie]) : ie();
    },
    leave(L, B) {
      const W = String(e.key);
      if (L[Dt] && L[Dt](!0), r.isUnmounting) return B();
      U(v, [L]);
      let I = !1;
      L[Me] = (ie) => {
        I || (I = !0, B(), ie ? U(g, [L]) : U(M, [L]), L[Me] = void 0, j[W] === e && delete j[W]);
      };
      const z = L[Me].bind(null, !1);
      j[W] = e, C ? V(C, [L, z]) : z();
    },
    clone(L) {
      const B = Zt(L, t, r, n, s);
      return s && s(B), B;
    }
  };
  return K;
}
function en(e) {
  if (Kr(e))
    return e = Ye(e), e.children = null, e;
}
function is(e) {
  if (!Kr(e))
    return yi(e.type) && e.children ? Ti(e.children) : e;
  if (e.component) return e.component.subTree;
  const { shapeFlag: t, children: r } = e;
  if (r) {
    if (t & 16) return r[0];
    if (t & 32 && $(r.default)) return r.default();
  }
}
function lt(e, t) {
  e.shapeFlag & 6 && e.component ? (e.transition = t, lt(e.component.subTree, t)) : e.shapeFlag & 128 ? (e.ssContent.transition = t.clone(e.ssContent), e.ssFallback.transition = t.clone(e.ssFallback)) : e.transition = t;
}
function Hn(e, t = !1, r) {
  let n = [], s = 0;
  for (let i = 0; i < e.length; i++) {
    let o = e[i];
    const l = r == null ? o.key : String(r) + String(o.key != null ? o.key : i);
    o.type === ye ? (o.patchFlag & 128 && s++, n = n.concat(Hn(o.children, t, l))) : (t || o.type !== ue) && n.push(l != null ? Ye(o, { key: l }) : o);
  }
  if (s > 1) for (let i = 0; i < n.length; i++) n[i].patchFlag = -2;
  return n;
}
// @__NO_SIDE_EFFECTS__
function ca(e, t) {
  return $(e) ? ne({ name: e.name }, t, { setup: e }) : e;
}
function ua() {
  const e = vt();
  return e ? (e.appContext.config.idPrefix || "v") + "-" + e.ids[0] + e.ids[1]++ : "";
}
function Ei(e) {
  e.ids = [
    e.ids[0] + e.ids[2]++ + "-",
    0,
    0
  ];
}
function os(e, t) {
  let r;
  return !!((r = Object.getOwnPropertyDescriptor(e, t)) && !r.configurable);
}
var br = /* @__PURE__ */ new WeakMap();
function qt(e, t, r, n, s = !1) {
  if (P(e)) {
    e.forEach((g, F) => qt(g, t && (P(t) ? t[F] : t), r, n, s));
    return;
  }
  if (ot(n) && !s) {
    n.shapeFlag & 512 && n.type.__asyncResolved && n.component.subTree.component && qt(e, t, r, n.component.subTree);
    return;
  }
  const i = n.shapeFlag & 4 ? qr(n.component) : n.el, o = s ? null : i, { i: l, r: f } = e, u = t && t.r, c = l.refs === G ? l.refs = {} : l.refs, h = l.setupState, v = /* @__PURE__ */ k(h), C = h === G ? Bs : (g) => os(c, g) ? !1 : Y(v, g), M = (g, F) => !(F && os(c, F));
  if (u != null && u !== f) {
    if (ls(t), te(u))
      c[u] = null, C(u) && (h[u] = null);
    else if (/* @__PURE__ */ fe(u)) {
      const g = t;
      M(u, g.k) && (u.value = null), g.k && (c[g.k] = null);
    }
  }
  if ($(f)) rr(f, l, 12, [o, c]);
  else {
    const g = te(f), F = /* @__PURE__ */ fe(f);
    if (g || F) {
      const R = () => {
        if (e.f) {
          const m = g ? C(f) ? h[f] : c[f] : M(f) || !e.k ? f.value : c[e.k];
          if (s) P(m) && An(m, i);
          else if (P(m)) m.includes(i) || m.push(i);
          else if (g)
            c[f] = [i], C(f) && (h[f] = c[f]);
          else {
            const A = [i];
            M(f, e.k) && (f.value = A), e.k && (c[e.k] = A);
          }
        } else g ? (c[f] = o, C(f) && (h[f] = o)) : F && (M(f, e.k) && (f.value = o), e.k && (c[e.k] = o));
      };
      if (o) {
        const m = () => {
          R(), br.delete(e);
        };
        m.id = -1, br.set(e, m), le(m, r);
      } else
        ls(e), R();
    }
  }
}
function ls(e) {
  const t = br.get(e);
  t && (t.flags |= 8, br.delete(e));
}
var da = Nr().requestIdleCallback || ((e) => setTimeout(e, 1)), ha = Nr().cancelIdleCallback || ((e) => clearTimeout(e)), ot = (e) => !!e.type.__asyncLoader, Kr = (e) => e.type.__isKeepAlive, pa = {
  name: "KeepAlive",
  __isKeepAlive: !0,
  props: {
    include: [
      String,
      RegExp,
      Array
    ],
    exclude: [
      String,
      RegExp,
      Array
    ],
    max: [String, Number]
  },
  setup(e, { slots: t }) {
    const r = vt(), n = r.ctx;
    if (!n.renderer) return () => {
      const m = t.default && t.default();
      return m && m.length === 1 ? m[0] : m;
    };
    const s = /* @__PURE__ */ new Map(), i = /* @__PURE__ */ new Set();
    let o = null;
    const l = r.suspense, { renderer: { p: f, m: u, um: c, o: { createElement: h } } } = n, v = h("div");
    n.activate = (m, A, x, j, U) => {
      const V = m.component;
      u(m, A, x, 0, l), f(V.vnode, m, A, x, V, l, j, m.slotScopeIds, U), le(() => {
        V.isDeactivated = !1, V.a && St(V.a);
        const K = m.props && m.props.onVnodeMounted;
        K && Ae(K, V.parent, m);
      }, l);
    }, n.deactivate = (m) => {
      const A = m.component;
      Sr(A.m), Sr(A.a), u(m, v, null, 1, l), le(() => {
        A.da && St(A.da);
        const x = m.props && m.props.onVnodeUnmounted;
        x && Ae(x, A.parent, m), A.isDeactivated = !0;
      }, l);
    };
    function C(m) {
      tn(m), c(m, r, l, !0);
    }
    function M(m) {
      s.forEach((A, x) => {
        const j = Sn(ot(A) ? A.type.__asyncResolved || {} : A.type);
        j && !m(j) && g(x);
      });
    }
    function g(m) {
      const A = s.get(m);
      A && (!o || !st(A, o)) ? C(A) : o && tn(o), s.delete(m), i.delete(m);
    }
    gt(() => [e.include, e.exclude], ([m, A]) => {
      m && M((x) => $t(m, x)), A && M((x) => !$t(A, x));
    }, {
      flush: "post",
      deep: !0
    });
    let F = null;
    const R = () => {
      F != null && (Cr(r.subTree.type) ? le(() => {
        s.set(F, ur(r.subTree));
      }, r.subTree.suspense) : s.set(F, ur(r.subTree)));
    };
    return jn(R), $n(R), Bn(() => {
      s.forEach((m) => {
        const { subTree: A, suspense: x } = r, j = ur(A);
        if (m.type === j.type && m.key === j.key) {
          tn(j);
          const U = j.component.da;
          U && le(U, x);
          return;
        }
        C(m);
      });
    }), () => {
      if (F = null, !t.default) return o = null;
      const m = t.default(), A = m[0];
      if (m.length > 1)
        return o = null, m;
      if (!At(A) || !(A.shapeFlag & 4) && !(A.shapeFlag & 128))
        return o = null, A;
      let x = ur(A);
      if (x.type === ue)
        return o = null, x;
      const j = x.type, U = Sn(ot(x) ? x.type.__asyncResolved || {} : j), { include: V, exclude: K, max: L } = e;
      if (V && (!U || !$t(V, U)) || K && U && $t(K, U))
        return x.shapeFlag &= -257, o = x, A;
      const B = x.key == null ? j : x.key, W = s.get(B);
      return x.el && (x = Ye(x), A.shapeFlag & 128 && (A.ssContent = x)), F = B, W ? (x.el = W.el, x.component = W.component, x.transition && lt(x, x.transition), x.shapeFlag |= 512, i.delete(B), i.add(B)) : (i.add(B), L && i.size > parseInt(L, 10) && g(i.values().next().value)), x.shapeFlag |= 256, o = x, Cr(A.type) ? A : x;
    };
  }
};
function $t(e, t) {
  return P(e) ? e.some((r) => $t(r, t)) : te(e) ? e.split(",").includes(t) : vo(e) ? (e.lastIndex = 0, e.test(t)) : !1;
}
function Sl(e, t) {
  Ai(e, "a", t);
}
function Cl(e, t) {
  Ai(e, "da", t);
}
function Ai(e, t, r = ge) {
  const n = e.__wdc || (e.__wdc = () => {
    let s = r;
    for (; s; ) {
      if (s.isDeactivated) return;
      s = s.parent;
    }
    return e();
  });
  if (kr(t, n, r), r) {
    let s = r.parent;
    for (; s && s.parent; )
      Kr(s.parent.vnode) && Tl(n, t, r, s), s = s.parent;
  }
}
function Tl(e, t, r, n) {
  const s = kr(t, e, n, !0);
  Mi(() => {
    An(n[t], s);
  }, r);
}
function tn(e) {
  e.shapeFlag &= -257, e.shapeFlag &= -513;
}
function ur(e) {
  return e.shapeFlag & 128 ? e.ssContent : e;
}
function kr(e, t, r = ge, n = !1) {
  if (r) {
    const s = r[e] || (r[e] = []), i = t.__weh || (t.__weh = (...o) => {
      qe();
      const l = nr(r), f = Oe(t, r, e, o);
      return l(), Ge(), f;
    });
    return n ? s.unshift(i) : s.push(i), i;
  }
}
var Xe = (e) => (t, r = ge) => {
  (!er || e === "sp") && kr(e, (...n) => t(...n), r);
}, wl = Xe("bm"), jn = Xe("m"), El = Xe("bu"), $n = Xe("u"), Bn = Xe("bum"), Mi = Xe("um"), Al = Xe("sp"), Ml = Xe("rtg"), Ol = Xe("rtc");
function Il(e, t = ge) {
  kr("ec", e, t);
}
var Oi = "components", Ii = /* @__PURE__ */ Symbol.for("v-ndc");
function ga(e) {
  return te(e) ? Pl(Oi, e, !1) || e : e || Ii;
}
function Pl(e, t, r = !0, n = !1) {
  const s = de || ge;
  if (s) {
    const i = s.type;
    if (e === Oi) {
      const l = Sn(i, !1);
      if (l && (l === t || l === me(t) || l === Rr(me(t)))) return i;
    }
    const o = fs(s[e] || i[e], t) || fs(s.appContext[e], t);
    return !o && n ? i : o;
  }
}
function fs(e, t) {
  return e && (e[t] || e[me(t)] || e[Rr(me(t))]);
}
function va(e, t, r, n) {
  let s;
  const i = r && r[n], o = P(e);
  if (o || te(e)) {
    const l = o && /* @__PURE__ */ pt(e);
    let f = !1, u = !1;
    l && (f = !/* @__PURE__ */ Te(e), u = /* @__PURE__ */ Je(e), e = Vr(e)), s = new Array(e.length);
    for (let c = 0, h = e.length; c < h; c++) s[c] = t(f ? u ? Et(Fe(e[c])) : Fe(e[c]) : e[c], c, void 0, i && i[c]);
  } else if (typeof e == "number") {
    s = new Array(e);
    for (let l = 0; l < e; l++) s[l] = t(l + 1, l, void 0, i && i[l]);
  } else if (J(e)) if (e[Symbol.iterator]) s = Array.from(e, (l, f) => t(l, f, void 0, i && i[f]));
  else {
    const l = Object.keys(e);
    s = new Array(l.length);
    for (let f = 0, u = l.length; f < u; f++) {
      const c = l[f];
      s[f] = t(e[c], c, f, i && i[f]);
    }
  }
  else s = [];
  return r && (r[n] = s), s;
}
function ma(e, t) {
  for (let r = 0; r < t.length; r++) {
    const n = t[r];
    if (P(n)) for (let s = 0; s < n.length; s++) e[n[s].name] = n[s].fn;
    else n && (e[n.name] = n.key ? (...s) => {
      const i = n.fn(...s);
      return i && (i.key = n.key), i;
    } : n.fn);
  }
  return e;
}
function _a(e, t, r = {}, n, s) {
  if (de.ce || de.parent && ot(de.parent) && de.parent.ce) {
    const u = Object.keys(r).length > 0;
    return t !== "default" && (r.name = t), bn(), yn(ye, null, [ve("slot", r, n && n())], u ? -2 : 64);
  }
  let i = e[t];
  i && i._c && (i._d = !1), bn();
  const o = i && Pi(i(r)), l = r.key || o && o.key, f = yn(ye, { key: (l && !we(l) ? l : `_${t}`) + (!o && n ? "_fb" : "") }, o || (n ? n() : []), o && e._ === 1 ? 64 : -2);
  return !s && f.scopeId && (f.slotScopeIds = [f.scopeId + "-s"]), i && i._c && (i._d = !0), f;
}
function Pi(e) {
  return e.some((t) => At(t) ? !(t.type === ue || t.type === ye && !Pi(t.children)) : !0) ? e : null;
}
function ba(e, t) {
  const r = {};
  for (const n in e) r[t && /[A-Z]/.test(n) ? `on:${n}` : dr(n)] = e[n];
  return r;
}
var gn = (e) => e ? zi(e) ? qr(e) : gn(e.parent) : null, Gt = /* @__PURE__ */ ne(/* @__PURE__ */ Object.create(null), {
  $: (e) => e,
  $el: (e) => e.vnode.el,
  $data: (e) => e.data,
  $props: (e) => e.props,
  $attrs: (e) => e.attrs,
  $slots: (e) => e.slots,
  $refs: (e) => e.refs,
  $parent: (e) => gn(e.parent),
  $root: (e) => gn(e.root),
  $host: (e) => e.ce,
  $emit: (e) => e.emit,
  $options: (e) => Kn(e),
  $forceUpdate: (e) => e.f || (e.f = () => {
    Vn(e.update);
  }),
  $nextTick: (e) => e.n || (e.n = $r.bind(e.proxy)),
  $watch: (e) => vl.bind(e)
}), rn = (e, t) => e !== G && !e.__isScriptSetup && Y(e, t), Fl = {
  get({ _: e }, t) {
    if (t === "__v_skip") return !0;
    const { ctx: r, setupState: n, data: s, props: i, accessCache: o, type: l, appContext: f } = e;
    if (t[0] !== "$") {
      const v = o[t];
      if (v !== void 0) switch (v) {
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
        if (rn(n, t))
          return o[t] = 1, n[t];
        if (s !== G && Y(s, t))
          return o[t] = 2, s[t];
        if (Y(i, t))
          return o[t] = 3, i[t];
        if (r !== G && Y(r, t))
          return o[t] = 4, r[t];
        vn && (o[t] = 0);
      }
    }
    const u = Gt[t];
    let c, h;
    if (u)
      return t === "$attrs" && pe(e.attrs, "get", ""), u(e);
    if ((c = l.__cssModules) && (c = c[t])) return c;
    if (r !== G && Y(r, t))
      return o[t] = 4, r[t];
    if (h = f.config.globalProperties, Y(h, t)) return h[t];
  },
  set({ _: e }, t, r) {
    const { data: n, setupState: s, ctx: i } = e;
    return rn(s, t) ? (s[t] = r, !0) : n !== G && Y(n, t) ? (n[t] = r, !0) : Y(e.props, t) || t[0] === "$" && t.slice(1) in e ? !1 : (i[t] = r, !0);
  },
  has({ _: { data: e, setupState: t, accessCache: r, ctx: n, appContext: s, props: i, type: o } }, l) {
    let f;
    return !!(r[l] || e !== G && l[0] !== "$" && Y(e, l) || rn(t, l) || Y(i, l) || Y(n, l) || Y(Gt, l) || Y(s.config.globalProperties, l) || (f = o.__cssModules) && f[l]);
  },
  defineProperty(e, t, r) {
    return r.get != null ? e._.accessCache[t] = 0 : Y(r, "value") && this.set(e, t, r.value, null), Reflect.defineProperty(e, t, r);
  }
};
function ya() {
  return Rl("useSlots").slots;
}
function Rl(e) {
  const t = vt();
  return t.setupContext || (t.setupContext = Zi(t));
}
function yr(e) {
  return P(e) ? e.reduce((t, r) => (t[r] = null, t), {}) : e;
}
function xa(e, t) {
  return !e || !t ? e || t : P(e) && P(t) ? e.concat(t) : ne({}, yr(e), yr(t));
}
var vn = !0;
function Ll(e) {
  const t = Kn(e), r = e.proxy, n = e.ctx;
  vn = !1, t.beforeCreate && as(t.beforeCreate, e, "bc");
  const { data: s, computed: i, methods: o, watch: l, provide: f, inject: u, created: c, beforeMount: h, mounted: v, beforeUpdate: C, updated: M, activated: g, deactivated: F, beforeDestroy: R, beforeUnmount: m, destroyed: A, unmounted: x, render: j, renderTracked: U, renderTriggered: V, errorCaptured: K, serverPrefetch: L, expose: B, inheritAttrs: W, components: I, directives: z, filters: ie } = t;
  if (u && Nl(u, n, null), o) for (const re in o) {
    const X = o[re];
    $(X) && (n[re] = X.bind(r));
  }
  if (s) {
    const re = s.call(r, r);
    J(re) && (e.data = /* @__PURE__ */ Nn(re));
  }
  if (vn = !0, i) for (const re in i) {
    const X = i[re], Ze = _f({
      get: $(X) ? X.bind(r, r) : $(X.get) ? X.get.bind(r, r) : He,
      set: !$(X) && $(X.set) ? X.set.bind(r) : He
    });
    Object.defineProperty(n, re, {
      enumerable: !0,
      configurable: !0,
      get: () => Ze.value,
      set: (sr) => Ze.value = sr
    });
  }
  if (l) for (const re in l) Fi(l[re], n, r, re);
  if (f) {
    const re = $(f) ? f.call(r) : f;
    Reflect.ownKeys(re).forEach((X) => {
      dl(X, re[X]);
    });
  }
  c && as(c, e, "c");
  function ae(re, X) {
    P(X) ? X.forEach((Ze) => re(Ze.bind(r))) : X && re(X.bind(r));
  }
  if (ae(wl, h), ae(jn, v), ae(El, C), ae($n, M), ae(Sl, g), ae(Cl, F), ae(Il, K), ae(Ol, U), ae(Ml, V), ae(Bn, m), ae(Mi, x), ae(Al, L), P(B))
    if (B.length) {
      const re = e.exposed || (e.exposed = {});
      B.forEach((X) => {
        Object.defineProperty(re, X, {
          get: () => r[X],
          set: (Ze) => r[X] = Ze,
          enumerable: !0
        });
      });
    } else e.exposed || (e.exposed = {});
  j && e.render === He && (e.render = j), W != null && (e.inheritAttrs = W), I && (e.components = I), z && (e.directives = z), L && Ei(e);
}
function Nl(e, t, r = He) {
  P(e) && (e = mn(e));
  for (const n in e) {
    const s = e[n];
    let i;
    J(s) ? "default" in s ? i = Tt(s.from || n, s.default, !0) : i = Tt(s.from || n) : i = Tt(s), /* @__PURE__ */ fe(i) ? Object.defineProperty(t, n, {
      enumerable: !0,
      configurable: !0,
      get: () => i.value,
      set: (o) => i.value = o
    }) : t[n] = i;
  }
}
function as(e, t, r) {
  Oe(P(e) ? e.map((n) => n.bind(t.proxy)) : e.bind(t.proxy), t, r);
}
function Fi(e, t, r, n) {
  let s = n.includes(".") ? _i(r, n) : () => r[n];
  if (te(e)) {
    const i = t[e];
    $(i) && gt(s, i);
  } else if ($(e)) gt(s, e.bind(r));
  else if (J(e)) if (P(e)) e.forEach((i) => Fi(i, t, r, n));
  else {
    const i = $(e.handler) ? e.handler.bind(r) : t[e.handler];
    $(i) && gt(s, i, e);
  }
}
function Kn(e) {
  const t = e.type, { mixins: r, extends: n } = t, { mixins: s, optionsCache: i, config: { optionMergeStrategies: o } } = e.appContext, l = i.get(t);
  let f;
  return l ? f = l : !s.length && !r && !n ? f = t : (f = {}, s.length && s.forEach((u) => xr(f, u, o, !0)), xr(f, t, o)), J(t) && i.set(t, f), f;
}
function xr(e, t, r, n = !1) {
  const { mixins: s, extends: i } = t;
  i && xr(e, i, r, !0), s && s.forEach((o) => xr(e, o, r, !0));
  for (const o in t) if (!(n && o === "expose")) {
    const l = Dl[o] || r && r[o];
    e[o] = l ? l(e[o], t[o]) : t[o];
  }
  return e;
}
var Dl = {
  data: cs,
  props: us,
  emits: us,
  methods: Bt,
  computed: Bt,
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
  components: Bt,
  directives: Bt,
  watch: Hl,
  provide: cs,
  inject: Vl
};
function cs(e, t) {
  return t ? e ? function() {
    return ne($(e) ? e.call(this, this) : e, $(t) ? t.call(this, this) : t);
  } : t : e;
}
function Vl(e, t) {
  return Bt(mn(e), mn(t));
}
function mn(e) {
  if (P(e)) {
    const t = {};
    for (let r = 0; r < e.length; r++) t[e[r]] = e[r];
    return t;
  }
  return e;
}
function _e(e, t) {
  return e ? [...new Set([].concat(e, t))] : t;
}
function Bt(e, t) {
  return e ? ne(/* @__PURE__ */ Object.create(null), e, t) : t;
}
function us(e, t) {
  return e ? P(e) && P(t) ? [.../* @__PURE__ */ new Set([...e, ...t])] : ne(/* @__PURE__ */ Object.create(null), yr(e), yr(t ?? {})) : t;
}
function Hl(e, t) {
  if (!e) return t;
  if (!t) return e;
  const r = ne(/* @__PURE__ */ Object.create(null), e);
  for (const n in t) r[n] = _e(e[n], t[n]);
  return r;
}
function Ri() {
  return {
    app: null,
    config: {
      isNativeTag: Bs,
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
var jl = 0;
function $l(e, t) {
  return function(n, s = null) {
    $(n) || (n = ne({}, n)), s != null && !J(s) && (s = null);
    const i = Ri(), o = /* @__PURE__ */ new WeakSet(), l = [];
    let f = !1;
    const u = i.app = {
      _uid: jl++,
      _component: n,
      _props: s,
      _container: null,
      _context: i,
      _instance: null,
      version: yf,
      get config() {
        return i.config;
      },
      set config(c) {
      },
      use(c, ...h) {
        return o.has(c) || (c && $(c.install) ? (o.add(c), c.install(u, ...h)) : $(c) && (o.add(c), c(u, ...h))), u;
      },
      mixin(c) {
        return i.mixins.includes(c) || i.mixins.push(c), u;
      },
      component(c, h) {
        return h ? (i.components[c] = h, u) : i.components[c];
      },
      directive(c, h) {
        return h ? (i.directives[c] = h, u) : i.directives[c];
      },
      mount(c, h, v) {
        if (!f) {
          const C = u._ceVNode || ve(n, s);
          return C.appContext = i, v === !0 ? v = "svg" : v === !1 && (v = void 0), h && t ? t(C, c) : e(C, c, v), f = !0, u._container = c, c.__vue_app__ = u, qr(C.component);
        }
      },
      onUnmount(c) {
        l.push(c);
      },
      unmount() {
        f && (Oe(l, u._instance, 16), e(null, u._container), delete u._container.__vue_app__);
      },
      provide(c, h) {
        return i.provides[c] = h, u;
      },
      runWithContext(c) {
        const h = wt;
        wt = u;
        try {
          return c();
        } finally {
          wt = h;
        }
      }
    };
    return u;
  };
}
var wt = null;
function Sa(e, t, r = G) {
  const n = vt(), s = me(t), i = ze(t), o = Li(e, s), l = el((f, u) => {
    let c, h = G, v;
    return gl(() => {
      const C = e[s];
      he(c, C) && (c = C, u());
    }), {
      get() {
        return f(), r.get ? r.get(c) : c;
      },
      set(C) {
        const M = r.set ? r.set(C) : C;
        if (!he(M, c) && !(h !== G && he(C, h))) return;
        const g = n.vnode.props;
        g && (t in g || s in g || i in g) && (`onUpdate:${t}` in g || `onUpdate:${s}` in g || `onUpdate:${i}` in g) || (c = C, u()), n.emit(`update:${t}`, M), he(C, M) && he(C, h) && !he(M, v) && u(), h = C, v = M;
      }
    };
  });
  return l[Symbol.iterator] = () => {
    let f = 0;
    return { next() {
      return f < 2 ? {
        value: f++ ? o || G : l,
        done: !1
      } : { done: !0 };
    } };
  }, l;
}
var Li = (e, t) => t === "modelValue" || t === "model-value" ? e.modelModifiers : e[`${t}Modifiers`] || e[`${me(t)}Modifiers`] || e[`${ze(t)}Modifiers`];
function Bl(e, t, ...r) {
  if (e.isUnmounted) return;
  const n = e.vnode.props || G;
  let s = r;
  const i = t.startsWith("update:"), o = i && Li(n, t.slice(7));
  o && (o.trim && (s = r.map((c) => te(c) ? c.trim() : c)), o.number && (s = r.map(Lr)));
  let l, f = n[l = dr(t)] || n[l = dr(me(t))];
  !f && i && (f = n[l = dr(ze(t))]), f && Oe(f, e, 6, s);
  const u = n[l + "Once"];
  if (u) {
    if (!e.emitted) e.emitted = {};
    else if (e.emitted[l]) return;
    e.emitted[l] = !0, Oe(u, e, 6, s);
  }
}
var Kl = /* @__PURE__ */ new WeakMap();
function Ni(e, t, r = !1) {
  const n = r ? Kl : t.emitsCache, s = n.get(e);
  if (s !== void 0) return s;
  const i = e.emits;
  let o = {}, l = !1;
  if (!$(e)) {
    const f = (u) => {
      const c = Ni(u, t, !0);
      c && (l = !0, ne(o, c));
    };
    !r && t.mixins.length && t.mixins.forEach(f), e.extends && f(e.extends), e.mixins && e.mixins.forEach(f);
  }
  return !i && !l ? (J(e) && n.set(e, null), null) : (P(i) ? i.forEach((f) => o[f] = null) : ne(o, i), J(e) && n.set(e, o), o);
}
function Ur(e, t) {
  return !e || !Or(t) ? !1 : (t = t.slice(2).replace(/Once$/, ""), Y(e, t[0].toLowerCase() + t.slice(1)) || Y(e, ze(t)) || Y(e, t));
}
function nn(e) {
  const { type: t, vnode: r, proxy: n, withProxy: s, propsOptions: [i], slots: o, attrs: l, emit: f, render: u, renderCache: c, props: h, data: v, setupState: C, ctx: M, inheritAttrs: g } = e, F = _r(e);
  let R, m;
  try {
    if (r.shapeFlag & 4) {
      const x = s || n, j = x;
      R = Ve(u.call(j, x, c, h, C, v, M)), m = l;
    } else {
      const x = t;
      R = Ve(x.length > 1 ? x(h, {
        attrs: l,
        slots: o,
        emit: f
      }) : x(h, null)), m = t.props ? l : kl(l);
    }
  } catch (x) {
    Jt.length = 0, jr(x, e, 1), R = ve(ue);
  }
  let A = R;
  if (m && g !== !1) {
    const x = Object.keys(m), { shapeFlag: j } = A;
    x.length && j & 7 && (i && x.some(Ir) && (m = Ul(m, i)), A = Ye(A, m, !1, !0));
  }
  return r.dirs && (A = Ye(A, null, !1, !0), A.dirs = A.dirs ? A.dirs.concat(r.dirs) : r.dirs), r.transition && lt(A, r.transition), R = A, _r(F), R;
}
var kl = (e) => {
  let t;
  for (const r in e) (r === "class" || r === "style" || Or(r)) && ((t || (t = {}))[r] = e[r]);
  return t;
}, Ul = (e, t) => {
  const r = {};
  for (const n in e) (!Ir(n) || !(n.slice(9) in t)) && (r[n] = e[n]);
  return r;
};
function Wl(e, t, r) {
  const { props: n, children: s, component: i } = e, { props: o, children: l, patchFlag: f } = t, u = i.emitsOptions;
  if (t.dirs || t.transition) return !0;
  if (r && f >= 0) {
    if (f & 1024) return !0;
    if (f & 16)
      return n ? ds(n, o, u) : !!o;
    if (f & 8) {
      const c = t.dynamicProps;
      for (let h = 0; h < c.length; h++) {
        const v = c[h];
        if (Di(o, n, v) && !Ur(u, v)) return !0;
      }
    }
  } else
    return (s || l) && (!l || !l.$stable) ? !0 : n === o ? !1 : n ? o ? ds(n, o, u) : !0 : !!o;
  return !1;
}
function ds(e, t, r) {
  const n = Object.keys(t);
  if (n.length !== Object.keys(e).length) return !0;
  for (let s = 0; s < n.length; s++) {
    const i = n[s];
    if (Di(t, e, i) && !Ur(r, i)) return !0;
  }
  return !1;
}
function Di(e, t, r) {
  const n = e[r], s = t[r];
  return r === "style" && J(n) && J(s) ? !Ft(n, s) : n !== s;
}
function ql({ vnode: e, parent: t, suspense: r }, n) {
  for (; t; ) {
    const s = t.subTree;
    if (s.suspense && s.suspense.activeBranch === e && (s.suspense.vnode.el = s.el = n, e = s), s === e)
      (e = t.vnode).el = n, t = t.parent;
    else break;
  }
  r && r.activeBranch === e && (r.vnode.el = n);
}
var Vi = {}, Hi = () => Object.create(Vi), ji = (e) => Object.getPrototypeOf(e) === Vi;
function Gl(e, t, r, n = !1) {
  const s = {}, i = Hi();
  e.propsDefaults = /* @__PURE__ */ Object.create(null), $i(e, t, s, i);
  for (const o in e.propsOptions[0]) o in s || (s[o] = void 0);
  r ? e.props = n ? s : /* @__PURE__ */ Jo(s) : e.type.props ? e.props = s : e.props = i, e.attrs = i;
}
function Jl(e, t, r, n) {
  const { props: s, attrs: i, vnode: { patchFlag: o } } = e, l = /* @__PURE__ */ k(s), [f] = e.propsOptions;
  let u = !1;
  if ((n || o > 0) && !(o & 16)) {
    if (o & 8) {
      const c = e.vnode.dynamicProps;
      for (let h = 0; h < c.length; h++) {
        let v = c[h];
        if (Ur(e.emitsOptions, v)) continue;
        const C = t[v];
        if (f) if (Y(i, v))
          C !== i[v] && (i[v] = C, u = !0);
        else {
          const M = me(v);
          s[M] = _n(f, l, M, C, e, !1);
        }
        else C !== i[v] && (i[v] = C, u = !0);
      }
    }
  } else {
    $i(e, t, s, i) && (u = !0);
    let c;
    for (const h in l) (!t || !Y(t, h) && ((c = ze(h)) === h || !Y(t, c))) && (f ? r && (r[h] !== void 0 || r[c] !== void 0) && (s[h] = _n(f, l, h, void 0, e, !0)) : delete s[h]);
    if (i !== l)
      for (const h in i) (!t || !Y(t, h)) && (delete i[h], u = !0);
  }
  u && ke(e.attrs, "set", "");
}
function $i(e, t, r, n) {
  const [s, i] = e.propsOptions;
  let o = !1, l;
  if (t) for (let f in t) {
    if (kt(f)) continue;
    const u = t[f];
    let c;
    s && Y(s, c = me(f)) ? !i || !i.includes(c) ? r[c] = u : (l || (l = {}))[c] = u : Ur(e.emitsOptions, f) || (!(f in n) || u !== n[f]) && (n[f] = u, o = !0);
  }
  if (i) {
    const f = /* @__PURE__ */ k(r), u = l || G;
    for (let c = 0; c < i.length; c++) {
      const h = i[c];
      r[h] = _n(s, f, h, u[h], e, !Y(u, h));
    }
  }
  return o;
}
function _n(e, t, r, n, s, i) {
  const o = e[r];
  if (o != null) {
    const l = Y(o, "default");
    if (l && n === void 0) {
      const f = o.default;
      if (o.type !== Function && !o.skipFactory && $(f)) {
        const { propsDefaults: u } = s;
        if (r in u) n = u[r];
        else {
          const c = nr(s);
          n = u[r] = f.call(null, t), c();
        }
      } else n = f;
      s.ce && s.ce._setProp(r, n);
    }
    o[0] && (i && !l ? n = !1 : o[1] && (n === "" || n === ze(r)) && (n = !0));
  }
  return n;
}
var Yl = /* @__PURE__ */ new WeakMap();
function Bi(e, t, r = !1) {
  const n = r ? Yl : t.propsCache, s = n.get(e);
  if (s) return s;
  const i = e.props, o = {}, l = [];
  let f = !1;
  if (!$(e)) {
    const c = (h) => {
      f = !0;
      const [v, C] = Bi(h, t, !0);
      ne(o, v), C && l.push(...C);
    };
    !r && t.mixins.length && t.mixins.forEach(c), e.extends && c(e.extends), e.mixins && e.mixins.forEach(c);
  }
  if (!i && !f)
    return J(e) && n.set(e, yt), yt;
  if (P(i)) for (let c = 0; c < i.length; c++) {
    const h = me(i[c]);
    hs(h) && (o[h] = G);
  }
  else if (i) for (const c in i) {
    const h = me(c);
    if (hs(h)) {
      const v = i[c], C = o[h] = P(v) || $(v) ? { type: v } : ne({}, v), M = C.type;
      let g = !1, F = !0;
      if (P(M)) for (let R = 0; R < M.length; ++R) {
        const m = M[R], A = $(m) && m.name;
        if (A === "Boolean") {
          g = !0;
          break;
        } else A === "String" && (F = !1);
      }
      else g = $(M) && M.name === "Boolean";
      C[0] = g, C[1] = F, (g || Y(C, "default")) && l.push(h);
    }
  }
  const u = [o, l];
  return J(e) && n.set(e, u), u;
}
function hs(e) {
  return e[0] !== "$" && !kt(e);
}
var kn = (e) => e === "_" || e === "_ctx" || e === "$stable", Un = (e) => P(e) ? e.map(Ve) : [Ve(e)], zl = (e, t, r) => {
  if (t._n) return t;
  const n = ul((...s) => Un(t(...s)), r);
  return n._c = !1, n;
}, Ki = (e, t, r) => {
  const n = e._ctx;
  for (const s in e) {
    if (kn(s)) continue;
    const i = e[s];
    if ($(i)) t[s] = zl(s, i, n);
    else if (i != null) {
      const o = Un(i);
      t[s] = () => o;
    }
  }
}, ki = (e, t) => {
  const r = Un(t);
  e.slots.default = () => r;
}, Ui = (e, t, r) => {
  for (const n in t) (r || !kn(n)) && (e[n] = t[n]);
}, Xl = (e, t, r) => {
  const n = e.slots = Hi();
  if (e.vnode.shapeFlag & 32) {
    const s = t._;
    s ? (Ui(n, t, r), r && Ws(n, "_", s, !0)) : Ki(t, n);
  } else t && ki(e, t);
}, Zl = (e, t, r) => {
  const { vnode: n, slots: s } = e;
  let i = !0, o = G;
  if (n.shapeFlag & 32) {
    const l = t._;
    l ? r && l === 1 ? i = !1 : Ui(s, t, r) : (i = !t.$stable, Ki(t, s)), o = t;
  } else t && (ki(e, t), o = { default: 1 });
  if (i)
    for (const l in s) !kn(l) && o[l] == null && delete s[l];
}, le = nf;
function Ql(e) {
  return ef(e);
}
function ef(e, t) {
  const r = Nr();
  r.__VUE__ = !0;
  const { insert: n, remove: s, patchProp: i, createElement: o, createText: l, createComment: f, setText: u, setElementText: c, parentNode: h, nextSibling: v, setScopeId: C = He, insertStaticContent: M } = e, g = (a, d, p, S = null, b = null, _ = null, E = void 0, w = null, T = !!d.dynamicChildren) => {
    if (a === d) return;
    a && !st(a, d) && (S = or(a), Qe(a, b, _, !0), a = null), d.patchFlag === -2 && (T = !1, d.dynamicChildren = null);
    const { type: y, ref: D, shapeFlag: O } = d;
    switch (y) {
      case Wr:
        F(a, d, p, S);
        break;
      case ue:
        R(a, d, p, S);
        break;
      case hr:
        a == null && m(d, p, S, E);
        break;
      case ye:
        I(a, d, p, S, b, _, E, w, T);
        break;
      default:
        O & 1 ? j(a, d, p, S, b, _, E, w, T) : O & 6 ? z(a, d, p, S, b, _, E, w, T) : (O & 64 || O & 128) && y.process(a, d, p, S, b, _, E, w, T, mt);
    }
    D != null && b ? qt(D, a && a.ref, _, d || a, !d) : D == null && a && a.ref != null && qt(a.ref, null, _, a, !0);
  }, F = (a, d, p, S) => {
    if (a == null) n(d.el = l(d.children), p, S);
    else {
      const b = d.el = a.el;
      d.children !== a.children && u(b, d.children);
    }
  }, R = (a, d, p, S) => {
    a == null ? n(d.el = f(d.children || ""), p, S) : d.el = a.el;
  }, m = (a, d, p, S) => {
    [a.el, a.anchor] = M(a.children, d, p, S, a.el, a.anchor);
  }, A = ({ el: a, anchor: d }, p, S) => {
    let b;
    for (; a && a !== d; )
      b = v(a), n(a, p, S), a = b;
    n(d, p, S);
  }, x = ({ el: a, anchor: d }) => {
    let p;
    for (; a && a !== d; )
      p = v(a), s(a), a = p;
    s(d);
  }, j = (a, d, p, S, b, _, E, w, T) => {
    if (d.type === "svg" ? E = "svg" : d.type === "math" && (E = "mathml"), a == null) U(d, p, S, b, _, E, w, T);
    else {
      const y = a.el && a.el._isVueCE ? a.el : null;
      try {
        y && y._beginPatch(), L(a, d, b, _, E, w, T);
      } finally {
        y && y._endPatch();
      }
    }
  }, U = (a, d, p, S, b, _, E, w) => {
    let T, y;
    const { props: D, shapeFlag: O, transition: N, dirs: H } = a;
    if (T = a.el = o(a.type, _, D && D.is, D), O & 8 ? c(T, a.children) : O & 16 && K(a.children, T, null, S, b, sn(a, _), E, w), H && ft(a, null, S, "created"), V(T, a, a.scopeId, E, S), D) {
      for (const Z in D) Z !== "value" && !kt(Z) && i(T, Z, null, D[Z], _, S);
      "value" in D && i(T, "value", null, D.value, _), (y = D.onVnodeBeforeMount) && Ae(y, S, a);
    }
    H && ft(a, null, S, "beforeMount");
    const q = tf(b, N);
    q && N.beforeEnter(T), n(T, d, p), ((y = D && D.onVnodeMounted) || q || H) && le(() => {
      y && Ae(y, S, a), q && N.enter(T), H && ft(a, null, S, "mounted");
    }, b);
  }, V = (a, d, p, S, b) => {
    if (p && C(a, p), S) for (let _ = 0; _ < S.length; _++) C(a, S[_]);
    if (b) {
      let _ = b.subTree;
      if (d === _ || Cr(_.type) && (_.ssContent === d || _.ssFallback === d)) {
        const E = b.vnode;
        V(a, E, E.scopeId, E.slotScopeIds, b.parent);
      }
    }
  }, K = (a, d, p, S, b, _, E, w, T = 0) => {
    for (let y = T; y < a.length; y++) g(null, a[y] = w ? Ke(a[y]) : Ve(a[y]), d, p, S, b, _, E, w);
  }, L = (a, d, p, S, b, _, E) => {
    const w = d.el = a.el;
    let { patchFlag: T, dynamicChildren: y, dirs: D } = d;
    T |= a.patchFlag & 16;
    const O = a.props || G, N = d.props || G;
    let H;
    if (p && at(p, !1), (H = N.onVnodeBeforeUpdate) && Ae(H, p, d, a), D && ft(d, a, p, "beforeUpdate"), p && at(p, !0), (O.innerHTML && N.innerHTML == null || O.textContent && N.textContent == null) && c(w, ""), y ? B(a.dynamicChildren, y, w, p, S, sn(d, b), _) : E || X(a, d, w, null, p, S, sn(d, b), _, !1), T > 0) {
      if (T & 16) W(w, O, N, p, b);
      else if (T & 2 && O.class !== N.class && i(w, "class", null, N.class, b), T & 4 && i(w, "style", O.style, N.style, b), T & 8) {
        const q = d.dynamicProps;
        for (let Z = 0; Z < q.length; Z++) {
          const Q = q[Z], se = O[Q], oe = N[Q];
          (oe !== se || Q === "value") && i(w, Q, se, oe, b, p);
        }
      }
      T & 1 && a.children !== d.children && c(w, d.children);
    } else !E && y == null && W(w, O, N, p, b);
    ((H = N.onVnodeUpdated) || D) && le(() => {
      H && Ae(H, p, d, a), D && ft(d, a, p, "updated");
    }, S);
  }, B = (a, d, p, S, b, _, E) => {
    for (let w = 0; w < d.length; w++) {
      const T = a[w], y = d[w];
      g(T, y, T.el && (T.type === ye || !st(T, y) || T.shapeFlag & 198) ? h(T.el) : p, null, S, b, _, E, !0);
    }
  }, W = (a, d, p, S, b) => {
    if (d !== p) {
      if (d !== G)
        for (const _ in d) !kt(_) && !(_ in p) && i(a, _, d[_], null, b, S);
      for (const _ in p) {
        if (kt(_)) continue;
        const E = p[_], w = d[_];
        E !== w && _ !== "value" && i(a, _, w, E, b, S);
      }
      "value" in p && i(a, "value", d.value, p.value, b);
    }
  }, I = (a, d, p, S, b, _, E, w, T) => {
    const y = d.el = a ? a.el : l(""), D = d.anchor = a ? a.anchor : l("");
    let { patchFlag: O, dynamicChildren: N, slotScopeIds: H } = d;
    H && (w = w ? w.concat(H) : H), a == null ? (n(y, p, S), n(D, p, S), K(d.children || [], p, D, b, _, E, w, T)) : O > 0 && O & 64 && N && a.dynamicChildren && a.dynamicChildren.length === N.length ? (B(a.dynamicChildren, N, p, b, _, E, w), (d.key != null || b && d === b.subTree) && Wn(a, d, !0)) : X(a, d, p, D, b, _, E, w, T);
  }, z = (a, d, p, S, b, _, E, w, T) => {
    d.slotScopeIds = w, a == null ? d.shapeFlag & 512 ? b.ctx.activate(d, p, S, E, T) : ie(d, p, S, b, _, E, T) : je(a, d, T);
  }, ie = (a, d, p, S, b, _, E) => {
    const w = a.component = hf(a, S, b);
    if (Kr(a) && (w.ctx.renderer = mt), pf(w, !1, E), w.asyncDep) {
      if (b && b.registerDep(w, ae, E), !a.el) {
        const T = w.subTree = ve(ue);
        R(null, T, d, p), a.placeholder = T.el;
      }
    } else ae(w, a, d, p, b, _, E);
  }, je = (a, d, p) => {
    const S = d.component = a.component;
    if (Wl(a, d, p)) if (S.asyncDep && !S.asyncResolved) {
      re(S, d, p);
      return;
    } else
      S.next = d, S.update();
    else
      d.el = a.el, S.vnode = d;
  }, ae = (a, d, p, S, b, _, E) => {
    const w = () => {
      if (a.isMounted) {
        let { next: O, bu: N, u: H, parent: q, vnode: Z } = a;
        {
          const xe = Wi(a);
          if (xe) {
            O && (O.el = Z.el, re(a, O, E)), xe.asyncDep.then(() => {
              le(() => {
                a.isUnmounted || y();
              }, b);
            });
            return;
          }
        }
        let Q = O, se;
        at(a, !1), O ? (O.el = Z.el, re(a, O, E)) : O = Z, N && St(N), (se = O.props && O.props.onVnodeBeforeUpdate) && Ae(se, q, O, Z), at(a, !0);
        const oe = nn(a), Ie = a.subTree;
        a.subTree = oe, g(Ie, oe, h(Ie.el), or(Ie), a, b, _), O.el = oe.el, Q === null && ql(a, oe.el), H && le(H, b), (se = O.props && O.props.onVnodeUpdated) && le(() => Ae(se, q, O, Z), b);
      } else {
        let O;
        const { el: N, props: H } = d, { bm: q, m: Z, parent: Q, root: se, type: oe } = a, Ie = ot(d);
        if (at(a, !1), q && St(q), !Ie && (O = H && H.onVnodeBeforeMount) && Ae(O, Q, d), at(a, !0), N && Yr) {
          const xe = () => {
            a.subTree = nn(a), Yr(N, a.subTree, a, b, null);
          };
          Ie && oe.__asyncHydrate ? oe.__asyncHydrate(N, a, xe) : xe();
        } else {
          se.ce && se.ce._hasShadowRoot() && se.ce._injectChildStyle(oe, a.parent ? a.parent.type : void 0);
          const xe = a.subTree = nn(a);
          g(null, xe, p, S, a, b, _), d.el = xe.el;
        }
        if (Z && le(Z, b), !Ie && (O = H && H.onVnodeMounted)) {
          const xe = d;
          le(() => Ae(O, Q, xe), b);
        }
        (d.shapeFlag & 256 || Q && ot(Q.vnode) && Q.vnode.shapeFlag & 256) && a.a && le(a.a, b), a.isMounted = !0, d = p = S = null;
      }
    };
    a.scope.on();
    const T = a.effect = new zs(w);
    a.scope.off();
    const y = a.update = T.run.bind(T), D = a.job = T.runIfDirty.bind(T);
    D.i = a, D.id = a.uid, T.scheduler = () => Vn(D), at(a, !0), y();
  }, re = (a, d, p) => {
    d.component = a;
    const S = a.vnode.props;
    a.vnode = d, a.next = null, Jl(a, d.props, S, p), Zl(a, d.children, p), qe(), rs(a), Ge();
  }, X = (a, d, p, S, b, _, E, w, T = !1) => {
    const y = a && a.children, D = a ? a.shapeFlag : 0, O = d.children, { patchFlag: N, shapeFlag: H } = d;
    if (N > 0) {
      if (N & 128) {
        sr(y, O, p, S, b, _, E, w, T);
        return;
      } else if (N & 256) {
        Ze(y, O, p, S, b, _, E, w, T);
        return;
      }
    }
    H & 8 ? (D & 16 && Rt(y, b, _), O !== y && c(p, O)) : D & 16 ? H & 16 ? sr(y, O, p, S, b, _, E, w, T) : Rt(y, b, _, !0) : (D & 8 && c(p, ""), H & 16 && K(O, p, S, b, _, E, w, T));
  }, Ze = (a, d, p, S, b, _, E, w, T) => {
    a = a || yt, d = d || yt;
    const y = a.length, D = d.length, O = Math.min(y, D);
    let N;
    for (N = 0; N < O; N++) {
      const H = d[N] = T ? Ke(d[N]) : Ve(d[N]);
      g(a[N], H, p, null, b, _, E, w, T);
    }
    y > D ? Rt(a, b, _, !0, !1, O) : K(d, p, S, b, _, E, w, T, O);
  }, sr = (a, d, p, S, b, _, E, w, T) => {
    let y = 0;
    const D = d.length;
    let O = a.length - 1, N = D - 1;
    for (; y <= O && y <= N; ) {
      const H = a[y], q = d[y] = T ? Ke(d[y]) : Ve(d[y]);
      if (st(H, q)) g(H, q, p, null, b, _, E, w, T);
      else break;
      y++;
    }
    for (; y <= O && y <= N; ) {
      const H = a[O], q = d[N] = T ? Ke(d[N]) : Ve(d[N]);
      if (st(H, q)) g(H, q, p, null, b, _, E, w, T);
      else break;
      O--, N--;
    }
    if (y > O) {
      if (y <= N) {
        const H = N + 1, q = H < D ? d[H].el : S;
        for (; y <= N; )
          g(null, d[y] = T ? Ke(d[y]) : Ve(d[y]), p, q, b, _, E, w, T), y++;
      }
    } else if (y > N) for (; y <= O; )
      Qe(a[y], b, _, !0), y++;
    else {
      const H = y, q = y, Z = /* @__PURE__ */ new Map();
      for (y = q; y <= N; y++) {
        const Se = d[y] = T ? Ke(d[y]) : Ve(d[y]);
        Se.key != null && Z.set(Se.key, y);
      }
      let Q, se = 0;
      const oe = N - q + 1;
      let Ie = !1, xe = 0;
      const Lt = new Array(oe);
      for (y = 0; y < oe; y++) Lt[y] = 0;
      for (y = H; y <= O; y++) {
        const Se = a[y];
        if (se >= oe) {
          Qe(Se, b, _, !0);
          continue;
        }
        let Re;
        if (Se.key != null) Re = Z.get(Se.key);
        else for (Q = q; Q <= N; Q++) if (Lt[Q - q] === 0 && st(Se, d[Q])) {
          Re = Q;
          break;
        }
        Re === void 0 ? Qe(Se, b, _, !0) : (Lt[Re - q] = y + 1, Re >= xe ? xe = Re : Ie = !0, g(Se, d[Re], p, null, b, _, E, w, T), se++);
      }
      const Yn = Ie ? rf(Lt) : yt;
      for (Q = Yn.length - 1, y = oe - 1; y >= 0; y--) {
        const Se = q + y, Re = d[Se], zn = d[Se + 1], Xn = Se + 1 < D ? zn.el || qi(zn) : S;
        Lt[y] === 0 ? g(null, Re, p, Xn, b, _, E, w, T) : Ie && (Q < 0 || y !== Yn[Q] ? ir(Re, p, Xn, 2) : Q--);
      }
    }
  }, ir = (a, d, p, S, b = null) => {
    const { el: _, type: E, transition: w, children: T, shapeFlag: y } = a;
    if (y & 6) {
      ir(a.component.subTree, d, p, S);
      return;
    }
    if (y & 128) {
      a.suspense.move(d, p, S);
      return;
    }
    if (y & 64) {
      E.move(a, d, p, mt);
      return;
    }
    if (E === ye) {
      n(_, d, p);
      for (let D = 0; D < T.length; D++) ir(T[D], d, p, S);
      n(a.anchor, d, p);
      return;
    }
    if (E === hr) {
      A(a, d, p);
      return;
    }
    if (S !== 2 && y & 1 && w) if (S === 0) w.persisted && !_[Me] ? n(_, d, p) : (w.beforeEnter(_), n(_, d, p), le(() => w.enter(_), b));
    else {
      const { leave: D, delayLeave: O, afterLeave: N } = w, H = () => {
        a.ctx.isUnmounted ? s(_) : n(_, d, p);
      }, q = () => {
        const Z = _._isLeaving || !!_[Me];
        _._isLeaving && _[Me](!0), w.persisted && !Z ? H() : D(_, () => {
          H(), N && N();
        });
      };
      O ? O(_, H, q) : q();
    }
    else n(_, d, p);
  }, Qe = (a, d, p, S = !1, b = !1) => {
    const { type: _, props: E, ref: w, children: T, dynamicChildren: y, shapeFlag: D, patchFlag: O, dirs: N, cacheIndex: H, memo: q } = a;
    if (O === -2 && (b = !1), w != null && (qe(), qt(w, null, p, a, !0), Ge()), H != null && (d.renderCache[H] = void 0), D & 256) {
      d.ctx.deactivate(a);
      return;
    }
    const Z = D & 1 && N, Q = !ot(a);
    let se;
    if (Q && (se = E && E.onVnodeBeforeUnmount) && Ae(se, d, a), D & 6) po(a.component, p, S);
    else {
      if (D & 128) {
        a.suspense.unmount(p, S);
        return;
      }
      Z && ft(a, null, d, "beforeUnmount"), D & 64 ? a.type.remove(a, d, p, mt, S) : y && !y.hasOnce && (_ !== ye || O > 0 && O & 64) ? Rt(y, d, p, !1, !0) : (_ === ye && O & 384 || !b && D & 16) && Rt(T, d, p), S && Gn(a);
    }
    const oe = q != null && H == null;
    (Q && (se = E && E.onVnodeUnmounted) || Z || oe) && le(() => {
      se && Ae(se, d, a), Z && ft(a, null, d, "unmounted"), oe && (a.el = null);
    }, p);
  }, Gn = (a) => {
    const { type: d, el: p, anchor: S, transition: b } = a;
    if (d === ye) {
      ho(p, S);
      return;
    }
    if (d === hr) {
      x(a);
      return;
    }
    const _ = () => {
      s(p), b && !b.persisted && b.afterLeave && b.afterLeave();
    };
    if (a.shapeFlag & 1 && b && !b.persisted) {
      const { leave: E, delayLeave: w } = b, T = () => E(p, _);
      w ? w(a.el, _, T) : T();
    } else _();
  }, ho = (a, d) => {
    let p;
    for (; a !== d; )
      p = v(a), s(a), a = p;
    s(d);
  }, po = (a, d, p) => {
    const { bum: S, scope: b, job: _, subTree: E, um: w, m: T, a: y } = a;
    Sr(T), Sr(y), S && St(S), b.stop(), _ && (_.flags |= 8, Qe(E, a, d, p)), w && le(w, d), le(() => {
      a.isUnmounted = !0;
    }, d);
  }, Rt = (a, d, p, S = !1, b = !1, _ = 0) => {
    for (let E = _; E < a.length; E++) Qe(a[E], d, p, S, b);
  }, or = (a) => {
    if (a.shapeFlag & 6) return or(a.component.subTree);
    if (a.shapeFlag & 128) return a.suspense.next();
    const d = v(a.anchor || a.el), p = d && d[bi];
    return p ? v(p) : d;
  };
  let Gr = !1;
  const Jn = (a, d, p) => {
    let S;
    a == null ? d._vnode && (Qe(d._vnode, null, null, !0), S = d._vnode.component) : g(d._vnode || null, a, d, null, null, null, p), d._vnode = a, Gr || (Gr = !0, rs(S), gi(), Gr = !1);
  }, mt = {
    p: g,
    um: Qe,
    m: ir,
    r: Gn,
    mt: ie,
    mc: K,
    pc: X,
    pbc: B,
    n: or,
    o: e
  };
  let Jr, Yr;
  return t && ([Jr, Yr] = t(mt)), {
    render: Jn,
    hydrate: Jr,
    createApp: $l(Jn, Jr)
  };
}
function sn({ type: e, props: t }, r) {
  return r === "svg" && e === "foreignObject" || r === "mathml" && e === "annotation-xml" && t && t.encoding && t.encoding.includes("html") ? void 0 : r;
}
function at({ effect: e, job: t }, r) {
  r ? (e.flags |= 32, t.flags |= 4) : (e.flags &= -33, t.flags &= -5);
}
function tf(e, t) {
  return (!e || e && !e.pendingBranch) && t && !t.persisted;
}
function Wn(e, t, r = !1) {
  const n = e.children, s = t.children;
  if (P(n) && P(s)) for (let i = 0; i < n.length; i++) {
    const o = n[i];
    let l = s[i];
    l.shapeFlag & 1 && !l.dynamicChildren && ((l.patchFlag <= 0 || l.patchFlag === 32) && (l = s[i] = Ke(s[i]), l.el = o.el), !r && l.patchFlag !== -2 && Wn(o, l)), l.type === Wr && (l.patchFlag === -1 && (l = s[i] = Ke(l)), l.el = o.el), l.type === ue && !l.el && (l.el = o.el);
  }
}
function rf(e) {
  const t = e.slice(), r = [0];
  let n, s, i, o, l;
  const f = e.length;
  for (n = 0; n < f; n++) {
    const u = e[n];
    if (u !== 0) {
      if (s = r[r.length - 1], e[s] < u) {
        t[n] = s, r.push(n);
        continue;
      }
      for (i = 0, o = r.length - 1; i < o; )
        l = i + o >> 1, e[r[l]] < u ? i = l + 1 : o = l;
      u < e[r[i]] && (i > 0 && (t[n] = r[i - 1]), r[i] = n);
    }
  }
  for (i = r.length, o = r[i - 1]; i-- > 0; )
    r[i] = o, o = t[o];
  return r;
}
function Wi(e) {
  const t = e.subTree.component;
  if (t) return t.asyncDep && !t.asyncResolved ? t : Wi(t);
}
function Sr(e) {
  if (e) for (let t = 0; t < e.length; t++) e[t].flags |= 8;
}
function qi(e) {
  if (e.placeholder) return e.placeholder;
  const t = e.component;
  return t ? qi(t.subTree) : null;
}
var Cr = (e) => e.__isSuspense;
function nf(e, t) {
  t && t.pendingBranch ? P(e) ? t.effects.push(...e) : t.effects.push(e) : cl(e);
}
var ye = /* @__PURE__ */ Symbol.for("v-fgt"), Wr = /* @__PURE__ */ Symbol.for("v-txt"), ue = /* @__PURE__ */ Symbol.for("v-cmt"), hr = /* @__PURE__ */ Symbol.for("v-stc"), Jt = [], Ce = null;
function bn(e = !1) {
  Jt.push(Ce = e ? null : []);
}
function sf() {
  Jt.pop(), Ce = Jt[Jt.length - 1] || null;
}
var Qt = 1;
function Tr(e, t = !1) {
  Qt += e, e < 0 && Ce && t && (Ce.hasOnce = !0);
}
function Gi(e) {
  return e.dynamicChildren = Qt > 0 ? Ce || yt : null, sf(), Qt > 0 && Ce && Ce.push(e), e;
}
function Ca(e, t, r, n, s, i) {
  return Gi(Yi(e, t, r, n, s, i, !0));
}
function yn(e, t, r, n, s) {
  return Gi(ve(e, t, r, n, s, !0));
}
function At(e) {
  return e ? e.__v_isVNode === !0 : !1;
}
function st(e, t) {
  return e.type === t.type && e.key === t.key;
}
var Ji = ({ key: e }) => e ?? null, pr = ({ ref: e, ref_key: t, ref_for: r }) => (typeof e == "number" && (e = "" + e), e != null ? te(e) || /* @__PURE__ */ fe(e) || $(e) ? {
  i: de,
  r: e,
  k: t,
  f: !!r
} : e : null);
function Yi(e, t = null, r = null, n = 0, s = null, i = e === ye ? 0 : 1, o = !1, l = !1) {
  const f = {
    __v_isVNode: !0,
    __v_skip: !0,
    type: e,
    props: t,
    key: t && Ji(t),
    ref: t && pr(t),
    scopeId: mi,
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
    ctx: de
  };
  return l ? (qn(f, r), i & 128 && e.normalize(f)) : r && (f.shapeFlag |= te(r) ? 8 : 16), Qt > 0 && !o && Ce && (f.patchFlag > 0 || i & 6) && f.patchFlag !== 32 && Ce.push(f), f;
}
var ve = of;
function of(e, t = null, r = null, n = 0, s = null, i = !1) {
  if ((!e || e === Ii) && (e = ue), At(e)) {
    const l = Ye(e, t, !0);
    return r && qn(l, r), Qt > 0 && !i && Ce && (l.shapeFlag & 6 ? Ce[Ce.indexOf(e)] = l : Ce.push(l)), l.patchFlag = -2, l;
  }
  if (mf(e) && (e = e.__vccOpts), t) {
    t = lf(t);
    let { class: l, style: f } = t;
    l && !te(l) && (t.class = On(l)), J(f) && (/* @__PURE__ */ Hr(f) && !P(f) && (f = ne({}, f)), t.style = Mn(f));
  }
  const o = te(e) ? 1 : Cr(e) ? 128 : yi(e) ? 64 : J(e) ? 4 : $(e) ? 2 : 0;
  return Yi(e, t, r, n, s, o, i, !0);
}
function lf(e) {
  return e ? /* @__PURE__ */ Hr(e) || ji(e) ? ne({}, e) : e : null;
}
function Ye(e, t, r = !1, n = !1) {
  const { props: s, ref: i, patchFlag: o, children: l, transition: f } = e, u = t ? cf(s || {}, t) : s, c = {
    __v_isVNode: !0,
    __v_skip: !0,
    type: e.type,
    props: u,
    key: u && Ji(u),
    ref: t && t.ref ? r && i ? P(i) ? i.concat(pr(t)) : [i, pr(t)] : pr(t) : i,
    scopeId: e.scopeId,
    slotScopeIds: e.slotScopeIds,
    children: l,
    target: e.target,
    targetStart: e.targetStart,
    targetAnchor: e.targetAnchor,
    staticCount: e.staticCount,
    shapeFlag: e.shapeFlag,
    patchFlag: t && e.type !== ye ? o === -1 ? 16 : o | 16 : o,
    dynamicProps: e.dynamicProps,
    dynamicChildren: e.dynamicChildren,
    appContext: e.appContext,
    dirs: e.dirs,
    transition: f,
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
  return f && n && lt(c, f.clone(c)), c;
}
function ff(e = " ", t = 0) {
  return ve(Wr, null, e, t);
}
function Ta(e, t) {
  const r = ve(hr, null, e);
  return r.staticCount = t, r;
}
function af(e = "", t = !1) {
  return t ? (bn(), yn(ue, null, e)) : ve(ue, null, e);
}
function Ve(e) {
  return e == null || typeof e == "boolean" ? ve(ue) : P(e) ? ve(ye, null, e.slice()) : At(e) ? Ke(e) : ve(Wr, null, String(e));
}
function Ke(e) {
  return e.el === null && e.patchFlag !== -1 || e.memo ? e : Ye(e);
}
function qn(e, t) {
  let r = 0;
  const { shapeFlag: n } = e;
  if (t == null) t = null;
  else if (P(t)) r = 16;
  else if (typeof t == "object") if (n & 65) {
    const s = t.default;
    s && (s._c && (s._d = !1), qn(e, s()), s._c && (s._d = !0));
    return;
  } else {
    r = 32;
    const s = t._;
    !s && !ji(t) ? t._ctx = de : s === 3 && de && (de.slots._ === 1 ? t._ = 1 : (t._ = 2, e.patchFlag |= 1024));
  }
  else $(t) ? (t = {
    default: t,
    _ctx: de
  }, r = 32) : (t = String(t), n & 64 ? (r = 16, t = [ff(t)]) : r = 8);
  e.children = t, e.shapeFlag |= r;
}
function cf(...e) {
  const t = {};
  for (let r = 0; r < e.length; r++) {
    const n = e[r];
    for (const s in n) if (s === "class")
      t.class !== n.class && (t.class = On([t.class, n.class]));
    else if (s === "style") t.style = Mn([t.style, n.style]);
    else if (Or(s)) {
      const i = t[s], o = n[s];
      o && i !== o && !(P(i) && i.includes(o)) ? t[s] = i ? [].concat(i, o) : o : o == null && i == null && !Ir(s) && (t[s] = o);
    } else s !== "" && (t[s] = n[s]);
  }
  return t;
}
function Ae(e, t, r, n = null) {
  Oe(e, t, 7, [r, n]);
}
var uf = Ri(), df = 0;
function hf(e, t, r) {
  const n = e.type, s = (t ? t.appContext : e.appContext) || uf, i = {
    uid: df++,
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
    scope: new Mo(!0),
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
    propsOptions: Bi(n, s),
    emitsOptions: Ni(n, s),
    emit: null,
    emitted: null,
    propsDefaults: G,
    inheritAttrs: n.inheritAttrs,
    ctx: G,
    data: G,
    props: G,
    attrs: G,
    slots: G,
    refs: G,
    setupState: G,
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
  return i.ctx = { _: i }, i.root = t ? t.root : i, i.emit = Bl.bind(null, i), e.ce && e.ce(i), i;
}
var ge = null, vt = () => ge || de, wr, xn;
{
  const e = Nr(), t = (r, n) => {
    let s;
    return (s = e[r]) || (s = e[r] = []), s.push(n), (i) => {
      s.length > 1 ? s.forEach((o) => o(i)) : s[0](i);
    };
  };
  wr = t("__VUE_INSTANCE_SETTERS__", (r) => ge = r), xn = t("__VUE_SSR_SETTERS__", (r) => er = r);
}
var nr = (e) => {
  const t = ge;
  return wr(e), e.scope.on(), () => {
    e.scope.off(), wr(t);
  };
}, ps = () => {
  ge && ge.scope.off(), wr(null);
};
function zi(e) {
  return e.vnode.shapeFlag & 4;
}
var er = !1;
function pf(e, t = !1, r = !1) {
  t && xn(t);
  const { props: n, children: s } = e.vnode, i = zi(e);
  Gl(e, n, i, t), Xl(e, s, r || t);
  const o = i ? gf(e, t) : void 0;
  return t && xn(!1), o;
}
function gf(e, t) {
  const r = e.type;
  e.accessCache = /* @__PURE__ */ Object.create(null), e.proxy = new Proxy(e.ctx, Fl);
  const { setup: n } = r;
  if (n) {
    qe();
    const s = e.setupContext = n.length > 1 ? Zi(e) : null, i = nr(e), o = rr(n, e, 0, [e.props, s]), l = Ks(o);
    if (Ge(), i(), (l || e.sp) && !ot(e) && Ei(e), l) {
      if (o.then(ps, ps), t) return o.then((f) => {
        gs(e, f, t);
      }).catch((f) => {
        jr(f, e, 0);
      });
      e.asyncDep = o;
    } else gs(e, o, t);
  } else Xi(e, t);
}
function gs(e, t, r) {
  $(t) ? e.type.__ssrInlineRender ? e.ssrRender = t : e.render = t : J(t) && (e.setupState = di(t)), Xi(e, r);
}
var vs, ms;
function Xi(e, t, r) {
  const n = e.type;
  if (!e.render) {
    if (!t && vs && !n.render) {
      const s = n.template || Kn(e).template;
      if (s) {
        const { isCustomElement: i, compilerOptions: o } = e.appContext.config, { delimiters: l, compilerOptions: f } = n, u = ne(ne({
          isCustomElement: i,
          delimiters: l
        }, o), f);
        n.render = vs(s, u);
      }
    }
    e.render = n.render || He, ms && ms(e);
  }
  {
    const s = nr(e);
    qe();
    try {
      Ll(e);
    } finally {
      Ge(), s();
    }
  }
}
var vf = { get(e, t) {
  return pe(e, "get", ""), e[t];
} };
function Zi(e) {
  const t = (r) => {
    e.exposed = r || {};
  };
  return {
    attrs: new Proxy(e.attrs, vf),
    slots: e.slots,
    emit: e.emit,
    expose: t
  };
}
function qr(e) {
  return e.exposed ? e.exposeProxy || (e.exposeProxy = new Proxy(di(Yo(e.exposed)), {
    get(t, r) {
      if (r in t) return t[r];
      if (r in Gt) return Gt[r](e);
    },
    has(t, r) {
      return r in t || r in Gt;
    }
  })) : e.proxy;
}
function Sn(e, t = !0) {
  return $(e) ? e.displayName || e.name : e.name || t && e.__name;
}
function mf(e) {
  return $(e) && "__vccOpts" in e;
}
var _f = (e, t) => /* @__PURE__ */ il(e, t, er);
function bf(e, t, r) {
  try {
    Tr(-1);
    const n = arguments.length;
    return n === 2 ? J(t) && !P(t) ? At(t) ? ve(e, null, [t]) : ve(e, t) : ve(e, null, t) : (n > 3 ? r = Array.prototype.slice.call(arguments, 2) : n === 3 && At(r) && (r = [r]), ve(e, t, r));
  } finally {
    Tr(1);
  }
}
var yf = "3.5.35", Cn = void 0, _s = typeof window < "u" && window.trustedTypes;
if (_s) try {
  Cn = /* @__PURE__ */ _s.createPolicy("vue", { createHTML: (e) => e });
} catch {
}
var Qi = Cn ? (e) => Cn.createHTML(e) : (e) => e, xf = "http://www.w3.org/2000/svg", Sf = "http://www.w3.org/1998/Math/MathML", Be = typeof document < "u" ? document : null, bs = Be && /* @__PURE__ */ Be.createElement("template"), Cf = {
  insert: (e, t, r) => {
    t.insertBefore(e, r || null);
  },
  remove: (e) => {
    const t = e.parentNode;
    t && t.removeChild(e);
  },
  createElement: (e, t, r, n) => {
    const s = t === "svg" ? Be.createElementNS(xf, e) : t === "mathml" ? Be.createElementNS(Sf, e) : r ? Be.createElement(e, { is: r }) : Be.createElement(e);
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
    const o = r ? r.previousSibling : t.lastChild;
    if (s && (s === i || s.nextSibling)) for (; t.insertBefore(s.cloneNode(!0), r), !(s === i || !(s = s.nextSibling)); )
      ;
    else {
      bs.innerHTML = Qi(n === "svg" ? `<svg>${e}</svg>` : n === "mathml" ? `<math>${e}</math>` : e);
      const l = bs.content;
      if (n === "svg" || n === "mathml") {
        const f = l.firstChild;
        for (; f.firstChild; ) l.appendChild(f.firstChild);
        l.removeChild(f);
      }
      t.insertBefore(l, r);
    }
    return [o ? o.nextSibling : t.firstChild, r ? r.previousSibling : t.lastChild];
  }
}, et = "transition", Vt = "animation", Mt = /* @__PURE__ */ Symbol("_vtc"), eo = {
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
}, to = /* @__PURE__ */ ne({}, Si, eo), Tf = (e) => (e.displayName = "Transition", e.props = to, e), wa = /* @__PURE__ */ Tf((e, { slots: t }) => bf(xl, ro(e), t)), ct = (e, t = []) => {
  P(e) ? e.forEach((r) => r(...t)) : e && e(...t);
}, ys = (e) => e ? P(e) ? e.some((t) => t.length > 1) : e.length > 1 : !1;
function ro(e) {
  const t = {};
  for (const I in e) I in eo || (t[I] = e[I]);
  if (e.css === !1) return t;
  const { name: r = "v", type: n, duration: s, enterFromClass: i = `${r}-enter-from`, enterActiveClass: o = `${r}-enter-active`, enterToClass: l = `${r}-enter-to`, appearFromClass: f = i, appearActiveClass: u = o, appearToClass: c = l, leaveFromClass: h = `${r}-leave-from`, leaveActiveClass: v = `${r}-leave-active`, leaveToClass: C = `${r}-leave-to` } = e, M = wf(s), g = M && M[0], F = M && M[1], { onBeforeEnter: R, onEnter: m, onEnterCancelled: A, onLeave: x, onLeaveCancelled: j, onBeforeAppear: U = R, onAppear: V = m, onAppearCancelled: K = A } = t, L = (I, z, ie, je) => {
    I._enterCancelled = je, rt(I, z ? c : l), rt(I, z ? u : o), ie && ie();
  }, B = (I, z) => {
    I._isLeaving = !1, rt(I, h), rt(I, C), rt(I, v), z && z();
  }, W = (I) => (z, ie) => {
    const je = I ? V : m, ae = () => L(z, I, ie);
    ct(je, [z, ae]), xs(() => {
      rt(z, I ? f : i), Le(z, I ? c : l), ys(je) || Ss(z, n, g, ae);
    });
  };
  return ne(t, {
    onBeforeEnter(I) {
      ct(R, [I]), Le(I, i), Le(I, o);
    },
    onBeforeAppear(I) {
      ct(U, [I]), Le(I, f), Le(I, u);
    },
    onEnter: W(!1),
    onAppear: W(!0),
    onLeave(I, z) {
      I._isLeaving = !0;
      const ie = () => B(I, z);
      Le(I, h), I._enterCancelled ? (Le(I, v), Tn(I)) : (Tn(I), Le(I, v)), xs(() => {
        I._isLeaving && (rt(I, h), Le(I, C), ys(x) || Ss(I, n, F, ie));
      }), ct(x, [I, ie]);
    },
    onEnterCancelled(I) {
      L(I, !1, void 0, !0), ct(A, [I]);
    },
    onAppearCancelled(I) {
      L(I, !0, void 0, !0), ct(K, [I]);
    },
    onLeaveCancelled(I) {
      B(I), ct(j, [I]);
    }
  });
}
function wf(e) {
  if (e == null) return null;
  if (J(e)) return [on(e.enter), on(e.leave)];
  {
    const t = on(e);
    return [t, t];
  }
}
function on(e) {
  return yo(e);
}
function Le(e, t) {
  t.split(/\s+/).forEach((r) => r && e.classList.add(r)), (e[Mt] || (e[Mt] = /* @__PURE__ */ new Set())).add(t);
}
function rt(e, t) {
  t.split(/\s+/).forEach((n) => n && e.classList.remove(n));
  const r = e[Mt];
  r && (r.delete(t), r.size || (e[Mt] = void 0));
}
function xs(e) {
  requestAnimationFrame(() => {
    requestAnimationFrame(e);
  });
}
var Ef = 0;
function Ss(e, t, r, n) {
  const s = e._endId = ++Ef, i = () => {
    s === e._endId && n();
  };
  if (r != null) return setTimeout(i, r);
  const { type: o, timeout: l, propCount: f } = no(e, t);
  if (!o) return n();
  const u = o + "end";
  let c = 0;
  const h = () => {
    e.removeEventListener(u, v), i();
  }, v = (C) => {
    C.target === e && ++c >= f && h();
  };
  setTimeout(() => {
    c < f && h();
  }, l + 1), e.addEventListener(u, v);
}
function no(e, t) {
  const r = window.getComputedStyle(e), n = (M) => (r[M] || "").split(", "), s = n(`${et}Delay`), i = n(`${et}Duration`), o = Cs(s, i), l = n(`${Vt}Delay`), f = n(`${Vt}Duration`), u = Cs(l, f);
  let c = null, h = 0, v = 0;
  t === et ? o > 0 && (c = et, h = o, v = i.length) : t === Vt ? u > 0 && (c = Vt, h = u, v = f.length) : (h = Math.max(o, u), c = h > 0 ? o > u ? et : Vt : null, v = c ? c === et ? i.length : f.length : 0);
  const C = c === et && /\b(?:transform|all)(?:,|$)/.test(n(`${et}Property`).toString());
  return {
    type: c,
    timeout: h,
    propCount: v,
    hasTransform: C
  };
}
function Cs(e, t) {
  for (; e.length < t.length; ) e = e.concat(e);
  return Math.max(...t.map((r, n) => Ts(r) + Ts(e[n])));
}
function Ts(e) {
  return e === "auto" ? 0 : Number(e.slice(0, -1).replace(",", ".")) * 1e3;
}
function Tn(e) {
  return (e ? e.ownerDocument : document).body.offsetHeight;
}
function Af(e, t, r) {
  const n = e[Mt];
  n && (t = (t ? [t, ...n] : [...n]).join(" ")), t == null ? e.removeAttribute("class") : r ? e.setAttribute("class", t) : e.className = t;
}
var Er = /* @__PURE__ */ Symbol("_vod"), so = /* @__PURE__ */ Symbol("_vsh"), Ea = {
  name: "show",
  beforeMount(e, { value: t }, { transition: r }) {
    e[Er] = e.style.display === "none" ? "" : e.style.display, r && t ? r.beforeEnter(e) : Ht(e, t);
  },
  mounted(e, { value: t }, { transition: r }) {
    r && t && r.enter(e);
  },
  updated(e, { value: t, oldValue: r }, { transition: n }) {
    !t != !r && (n ? t ? (n.beforeEnter(e), Ht(e, !0), n.enter(e)) : n.leave(e, () => {
      Ht(e, !1);
    }) : Ht(e, t));
  },
  beforeUnmount(e, { value: t }) {
    Ht(e, t);
  }
};
function Ht(e, t) {
  e.style.display = t ? e[Er] : "none", e[so] = !t;
}
var Mf = /* @__PURE__ */ Symbol(""), Of = /(?:^|;)\s*display\s*:/;
function If(e, t, r) {
  const n = e.style, s = te(r);
  let i = !1;
  if (r && !s) {
    if (t) if (te(t))
      for (const o of t.split(";")) {
        const l = o.slice(0, o.indexOf(":")).trim();
        r[l] == null && Kt(n, l, "");
      }
    else for (const o in t) r[o] == null && Kt(n, o, "");
    for (const o in r) {
      o === "display" && (i = !0);
      const l = r[o];
      l != null ? Ff(e, o, !te(t) && t ? t[o] : void 0, l) || Kt(n, o, l) : Kt(n, o, "");
    }
  } else if (s) {
    if (t !== r) {
      const o = n[Mf];
      o && (r += ";" + o), n.cssText = r, i = Of.test(r);
    }
  } else t && e.removeAttribute("style");
  Er in e && (e[Er] = i ? n.display : "", e[so] && (n.display = "none"));
}
var ws = /\s*!important$/;
function Kt(e, t, r) {
  if (P(r)) r.forEach((n) => Kt(e, t, n));
  else if (r == null && (r = ""), t.startsWith("--")) e.setProperty(t, r);
  else {
    const n = Pf(e, t);
    ws.test(r) ? e.setProperty(ze(n), r.replace(ws, ""), "important") : e[n] = r;
  }
}
var Es = [
  "Webkit",
  "Moz",
  "ms"
], ln = {};
function Pf(e, t) {
  const r = ln[t];
  if (r) return r;
  let n = me(t);
  if (n !== "filter" && n in e) return ln[t] = n;
  n = Rr(n);
  for (let s = 0; s < Es.length; s++) {
    const i = Es[s] + n;
    if (i in e) return ln[t] = i;
  }
  return t;
}
function Ff(e, t, r, n) {
  return e.tagName === "TEXTAREA" && (t === "width" || t === "height") && te(n) && r === n;
}
var As = "http://www.w3.org/1999/xlink";
function Ms(e, t, r, n, s, i = wo(t)) {
  n && t.startsWith("xlink:") ? r == null ? e.removeAttributeNS(As, t.slice(6, t.length)) : e.setAttributeNS(As, t, r) : r == null || i && !Gs(r) ? e.removeAttribute(t) : e.setAttribute(t, i ? "" : we(r) ? String(r) : r);
}
function Os(e, t, r, n, s) {
  if (t === "innerHTML" || t === "textContent") {
    r != null && (e[t] = t === "innerHTML" ? Qi(r) : r);
    return;
  }
  const i = e.tagName;
  if (t === "value" && i !== "PROGRESS" && !i.includes("-")) {
    const l = i === "OPTION" ? e.getAttribute("value") || "" : e.value, f = r == null ? e.type === "checkbox" ? "on" : "" : String(r);
    (l !== f || !("_value" in e)) && (e.value = f), r == null && e.removeAttribute(t), e._value = r;
    return;
  }
  let o = !1;
  if (r === "" || r == null) {
    const l = typeof e[t];
    l === "boolean" ? r = Gs(r) : r == null && l === "string" ? (r = "", o = !0) : l === "number" && (r = 0, o = !0);
  }
  try {
    e[t] = r;
  } catch {
  }
  o && e.removeAttribute(s || t);
}
function it(e, t, r, n) {
  e.addEventListener(t, r, n);
}
function Rf(e, t, r, n) {
  e.removeEventListener(t, r, n);
}
var Is = /* @__PURE__ */ Symbol("_vei");
function Lf(e, t, r, n, s = null) {
  const i = e[Is] || (e[Is] = {}), o = i[t];
  if (n && o) o.value = n;
  else {
    const [l, f] = Nf(t);
    n ? it(e, l, i[t] = Hf(n, s), f) : o && (Rf(e, l, o, f), i[t] = void 0);
  }
}
var Ps = /(?:Once|Passive|Capture)$/;
function Nf(e) {
  let t;
  if (Ps.test(e)) {
    t = {};
    let r;
    for (; r = e.match(Ps); )
      e = e.slice(0, e.length - r[0].length), t[r[0].toLowerCase()] = !0;
  }
  return [e[2] === ":" ? e.slice(3) : ze(e.slice(2)), t];
}
var fn = 0, Df = /* @__PURE__ */ Promise.resolve(), Vf = () => fn || (Df.then(() => fn = 0), fn = Date.now());
function Hf(e, t) {
  const r = (n) => {
    if (!n._vts) n._vts = Date.now();
    else if (n._vts <= r.attached) return;
    const s = r.value;
    if (P(s)) {
      const i = n.stopImmediatePropagation;
      n.stopImmediatePropagation = () => {
        i.call(n), n._stopped = !0;
      };
      const o = s.slice(), l = [n];
      for (let f = 0; f < o.length && !n._stopped; f++) {
        const u = o[f];
        u && Oe(u, t, 5, l);
      }
    } else Oe(s, t, 5, [n]);
  };
  return r.value = e, r.attached = Vf(), r;
}
var Fs = (e) => e.charCodeAt(0) === 111 && e.charCodeAt(1) === 110 && e.charCodeAt(2) > 96 && e.charCodeAt(2) < 123, jf = (e, t, r, n, s, i) => {
  const o = s === "svg";
  t === "class" ? Af(e, n, o) : t === "style" ? If(e, r, n) : Or(t) ? Ir(t) || Lf(e, t, r, n, i) : (t[0] === "." ? (t = t.slice(1), !0) : t[0] === "^" ? (t = t.slice(1), !1) : $f(e, t, n, o)) ? (Os(e, t, n), !e.tagName.includes("-") && (t === "value" || t === "checked" || t === "selected") && Ms(e, t, n, o, i, t !== "value")) : e._isVueCE && (Bf(e, t) || e._def.__asyncLoader && (/[A-Z]/.test(t) || !te(n))) ? Os(e, me(t), n, i, t) : (t === "true-value" ? e._trueValue = n : t === "false-value" && (e._falseValue = n), Ms(e, t, n, o));
};
function $f(e, t, r, n) {
  if (n)
    return !!(t === "innerHTML" || t === "textContent" || t in e && Fs(t) && $(r));
  if (t === "spellcheck" || t === "draggable" || t === "translate" || t === "autocorrect" || t === "sandbox" && e.tagName === "IFRAME" || t === "form" || t === "list" && e.tagName === "INPUT" || t === "type" && e.tagName === "TEXTAREA") return !1;
  if (t === "width" || t === "height") {
    const s = e.tagName;
    if (s === "IMG" || s === "VIDEO" || s === "CANVAS" || s === "SOURCE") return !1;
  }
  return Fs(t) && te(r) ? !1 : t in e;
}
function Bf(e, t) {
  const r = e._def.props;
  if (!r) return !1;
  const n = me(t);
  return Array.isArray(r) ? r.some((s) => me(s) === n) : Object.keys(r).some((s) => me(s) === n);
}
var io = /* @__PURE__ */ new WeakMap(), oo = /* @__PURE__ */ new WeakMap(), Ar = /* @__PURE__ */ Symbol("_moveCb"), Rs = /* @__PURE__ */ Symbol("_enterCb"), Kf = (e) => (delete e.props.mode, e), Aa = /* @__PURE__ */ Kf({
  name: "TransitionGroup",
  props: /* @__PURE__ */ ne({}, to, {
    tag: String,
    moveClass: String
  }),
  setup(e, { slots: t }) {
    const r = vt(), n = xi();
    let s, i;
    return $n(() => {
      if (!s.length) return;
      const o = e.moveClass || `${e.name || "v"}-move`;
      if (!qf(s[0].el, r.vnode.el, o)) {
        s = [];
        return;
      }
      s.forEach(kf), s.forEach(Uf);
      const l = s.filter(Wf);
      Tn(r.vnode.el), l.forEach((f) => {
        const u = f.el, c = u.style;
        Le(u, o), c.transform = c.webkitTransform = c.transitionDuration = "";
        const h = u[Ar] = (v) => {
          v && v.target !== u || (!v || v.propertyName.endsWith("transform")) && (u.removeEventListener("transitionend", h), u[Ar] = null, rt(u, o));
        };
        u.addEventListener("transitionend", h);
      }), s = [];
    }), () => {
      const o = /* @__PURE__ */ k(e), l = ro(o);
      let f = o.tag || ye;
      if (s = [], i) for (let u = 0; u < i.length; u++) {
        const c = i[u];
        c.el && c.el instanceof Element && (s.push(c), lt(c, Zt(c, l, n, r)), io.set(c, lo(c.el)));
      }
      i = t.default ? Hn(t.default()) : [];
      for (let u = 0; u < i.length; u++) {
        const c = i[u];
        c.key != null && lt(c, Zt(c, l, n, r));
      }
      return ve(f, null, i);
    };
  }
});
function kf(e) {
  const t = e.el;
  t[Ar] && t[Ar](), t[Rs] && t[Rs]();
}
function Uf(e) {
  oo.set(e, lo(e.el));
}
function Wf(e) {
  const t = io.get(e), r = oo.get(e), n = t.left - r.left, s = t.top - r.top;
  if (n || s) {
    const i = e.el, o = i.style, l = i.getBoundingClientRect();
    let f = 1, u = 1;
    return i.offsetWidth && (f = l.width / i.offsetWidth), i.offsetHeight && (u = l.height / i.offsetHeight), (!Number.isFinite(f) || f === 0) && (f = 1), (!Number.isFinite(u) || u === 0) && (u = 1), Math.abs(f - 1) < 0.01 && (f = 1), Math.abs(u - 1) < 0.01 && (u = 1), o.transform = o.webkitTransform = `translate(${n / f}px,${s / u}px)`, o.transitionDuration = "0s", e;
  }
}
function lo(e) {
  const t = e.getBoundingClientRect();
  return {
    left: t.left,
    top: t.top
  };
}
function qf(e, t, r) {
  const n = e.cloneNode(), s = e[Mt];
  s && s.forEach((l) => {
    l.split(/\s+/).forEach((f) => f && n.classList.remove(f));
  }), r.split(/\s+/).forEach((l) => l && n.classList.add(l)), n.style.display = "none";
  const i = t.nodeType === 1 ? t : t.parentNode;
  i.appendChild(n);
  const { hasTransform: o } = no(n);
  return i.removeChild(n), o;
}
var Ot = (e) => {
  const t = e.props["onUpdate:modelValue"] || !1;
  return P(t) ? (r) => St(t, r) : t;
};
function Gf(e) {
  e.target.composing = !0;
}
function Ls(e) {
  const t = e.target;
  t.composing && (t.composing = !1, t.dispatchEvent(new Event("input")));
}
var We = /* @__PURE__ */ Symbol("_assign");
function Ns(e, t, r) {
  return t && (e = e.trim()), r && (e = Lr(e)), e;
}
var Ma = {
  created(e, { modifiers: { lazy: t, trim: r, number: n } }, s) {
    e[We] = Ot(s);
    const i = n || s.props && s.props.type === "number";
    it(e, t ? "change" : "input", (o) => {
      o.target.composing || e[We](Ns(e.value, r, i));
    }), (r || i) && it(e, "change", () => {
      e.value = Ns(e.value, r, i);
    }), t || (it(e, "compositionstart", Gf), it(e, "compositionend", Ls), it(e, "change", Ls));
  },
  mounted(e, { value: t }) {
    e.value = t ?? "";
  },
  beforeUpdate(e, { value: t, oldValue: r, modifiers: { lazy: n, trim: s, number: i } }, o) {
    if (e[We] = Ot(o), e.composing) return;
    const l = (i || e.type === "number") && !/^0\d/.test(e.value) ? Lr(e.value) : e.value, f = t ?? "";
    if (l === f) return;
    const u = e.getRootNode();
    (u instanceof Document || u instanceof ShadowRoot) && u.activeElement === e && e.type !== "range" && (n && t === r || s && e.value.trim() === f) || (e.value = f);
  }
}, Oa = {
  deep: !0,
  created(e, t, r) {
    e[We] = Ot(r), it(e, "change", () => {
      const n = e._modelValue, s = tr(e), i = e.checked, o = e[We];
      if (P(n)) {
        const l = In(n, s), f = l !== -1;
        if (i && !f) o(n.concat(s));
        else if (!i && f) {
          const u = [...n];
          u.splice(l, 1), o(u);
        }
      } else if (It(n)) {
        const l = new Set(n);
        i ? l.add(s) : l.delete(s), o(l);
      } else o(fo(e, i));
    });
  },
  mounted: Ds,
  beforeUpdate(e, t, r) {
    e[We] = Ot(r), Ds(e, t, r);
  }
};
function Ds(e, { value: t, oldValue: r }, n) {
  e._modelValue = t;
  let s;
  if (P(t)) s = In(t, n.props.value) > -1;
  else if (It(t)) s = t.has(n.props.value);
  else {
    if (t === r) return;
    s = Ft(t, fo(e, !0));
  }
  e.checked !== s && (e.checked = s);
}
var Ia = {
  deep: !0,
  created(e, { value: t, modifiers: { number: r } }, n) {
    const s = It(t);
    it(e, "change", () => {
      const i = Array.prototype.filter.call(e.options, (o) => o.selected).map((o) => r ? Lr(tr(o)) : tr(o));
      e[We](e.multiple ? s ? new Set(i) : i : i[0]), e._assigning = !0, $r(() => {
        e._assigning = !1;
      });
    }), e[We] = Ot(n);
  },
  mounted(e, { value: t }) {
    Vs(e, t);
  },
  beforeUpdate(e, t, r) {
    e[We] = Ot(r);
  },
  updated(e, { value: t }) {
    e._assigning || Vs(e, t);
  }
};
function Vs(e, t) {
  const r = e.multiple, n = P(t);
  if (!(r && !n && !It(t))) {
    for (let s = 0, i = e.options.length; s < i; s++) {
      const o = e.options[s], l = tr(o);
      if (r) if (n) {
        const f = typeof l;
        f === "string" || f === "number" ? o.selected = t.some((u) => String(u) === String(l)) : o.selected = In(t, l) > -1;
      } else o.selected = t.has(l);
      else if (Ft(tr(o), t)) {
        e.selectedIndex !== s && (e.selectedIndex = s);
        return;
      }
    }
    !r && e.selectedIndex !== -1 && (e.selectedIndex = -1);
  }
}
function tr(e) {
  return "_value" in e ? e._value : e.value;
}
function fo(e, t) {
  const r = t ? "_trueValue" : "_falseValue";
  return r in e ? e[r] : t;
}
var Jf = [
  "ctrl",
  "shift",
  "alt",
  "meta"
], Yf = {
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
  exact: (e, t) => Jf.some((r) => e[`${r}Key`] && !t.includes(r))
}, Pa = (e, t) => {
  if (!e) return e;
  const r = e._withMods || (e._withMods = {}), n = t.join(".");
  return r[n] || (r[n] = ((s, ...i) => {
    for (let o = 0; o < t.length; o++) {
      const l = Yf[t[o]];
      if (l && l(s, t)) return;
    }
    return e(s, ...i);
  }));
}, zf = {
  esc: "escape",
  space: " ",
  up: "arrow-up",
  left: "arrow-left",
  right: "arrow-right",
  down: "arrow-down",
  delete: "backspace"
}, Fa = (e, t) => {
  const r = e._withKeys || (e._withKeys = {}), n = t.join(".");
  return r[n] || (r[n] = ((s) => {
    if (!("key" in s)) return;
    const i = ze(s.key);
    if (t.some((o) => o === i || zf[o] === i)) return e(s);
  }));
}, Xf = /* @__PURE__ */ ne({ patchProp: jf }, Cf), Hs;
function Zf() {
  return Hs || (Hs = Ql(Xf));
}
var Ra = ((...e) => {
  const t = Zf().createApp(...e), { mount: r } = t;
  return t.mount = (n) => {
    const s = ea(n);
    if (!s) return;
    const i = t._component;
    !$(i) && !i.render && !i.template && (i.template = s.innerHTML), s.nodeType === 1 && (s.textContent = "");
    const o = r(s, !1, Qf(s));
    return s instanceof Element && (s.removeAttribute("v-cloak"), s.setAttribute("data-v-app", "")), o;
  }, t;
});
function Qf(e) {
  if (e instanceof SVGElement) return "svg";
  if (typeof MathMLElement == "function" && e instanceof MathMLElement) return "mathml";
}
function ea(e) {
  return te(e) ? document.querySelector(e) : e;
}
var ao = /* @__PURE__ */ Symbol("app-navigation");
function co(e) {
  const t = e.layers.value;
  for (let r = t.length - 1; r >= 0; r--) if (t[r].modal()) return t[r].element;
}
function wn(e) {
  return e.isConnected && !e.matches(":disabled") && !e.closest("[inert]") && e.getClientRects().length > 0 && getComputedStyle(e).visibility !== "hidden";
}
function uo(e) {
  for (const t of [
    "[autofocus]",
    'button, [href], input, textarea, select, summary, [tabindex]:not([tabindex="-1"])',
    '[tabindex="-1"]'
  ]) for (const r of e.querySelectorAll(t))
    if (wn(r) && (r.focus({ preventScroll: !0 }), r.ownerDocument.activeElement === r))
      return;
  e.focus({ preventScroll: !0 });
}
function En(e, t = null) {
  const r = e?.root.value;
  queueMicrotask(() => {
    $r(() => {
      if (r && (!r.isConnected || e?.root.value !== r)) return;
      const n = document.activeElement;
      if (n instanceof HTMLElement && n !== document.body && wn(n)) return;
      const s = e ? co(e) : void 0;
      t instanceof HTMLElement && wn(t) && (!r || r.contains(t)) && (!s || s.contains(t)) && (t.focus({ preventScroll: !0 }), document.activeElement === t) || (s ? uo(s) : r?.focus({ preventScroll: !0 }));
    });
  });
}
function ta(e, t = () => !0) {
  const r = Tt(ao, null), n = (s = null) => {
    const i = e();
    return i && En(r, s), i;
  };
  return gt(t, (s, i, o) => {
    if (s && r) {
      const l = document.activeElement, f = r.stack.add(() => n(l));
      o(() => {
        f(), En(r, l);
      });
    }
  }, {
    immediate: !0,
    flush: "sync"
  }), () => r ? r.stack.back() : n();
}
function La(e, t, r = () => !0) {
  const n = Tt(ao, null);
  ta(() => (t(), !0), () => !!e.value), gt(e, (s, i, o) => {
    if (!s || !n) return;
    const l = {
      element: s,
      modal: r
    };
    n.layers.value = [...n.layers.value, l], o(() => {
      n.layers.value = n.layers.value.filter((f) => f !== l);
    });
  }, { flush: "post" }), gt(() => r() ? e.value : null, async (s, i, o) => {
    if (!s) return;
    const l = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    o(() => En(n, l)), await $r(), !(!s.isConnected || !r() || n && co(n) !== s) && uo(s);
  }, { flush: "post" });
}
var ra = "LittleWhiteBox-XiaobaiOS", js = class extends Error {
  code;
  constructor(e, t) {
    super(e, t), this.code = e, this.name = "FrameRequestError";
  }
}, na = class extends Error {
  code;
  phase;
  retryable;
  requiresAppRetry;
  constructor(e) {
    super(e.message || e.error || "host_request_failed"), this.name = "HostRequestError", this.code = e.error || "host_request_failed", this.phase = e.phase || "host", this.retryable = e.retryable !== !1, this.requiresAppRetry = e.requiresAppRetry === !0;
  }
};
function $s() {
  return `xiaobai-os-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
}
function Na() {
  const e = /* @__PURE__ */ new Map(), t = /* @__PURE__ */ new Set();
  let r = !1, n = null;
  function s(g, F = {}, R = "") {
    const m = n && g !== "app/activate" && g !== "app/retry" && g !== "os/frame-ready" && g !== "os/close", A = m && !R ? $s() : R;
    parent.postMessage({
      source: ra,
      type: g,
      requestId: A,
      ...m ? n : {},
      payload: F
    }, window.location.origin);
  }
  function i(g) {
    const F = String(g.requestId || "");
    if (!F) return !1;
    const R = e.get(F);
    if (!R || R.session && (g.appId !== R.session.appId || g.activationToken !== R.session.activationToken)) return !1;
    e.delete(F), clearTimeout(R.timer);
    const m = g.payload;
    return m?.ok === !1 ? R.reject(new na(m)) : R.resolve(m), !0;
  }
  function o(g) {
    g.origin !== window.location.origin || g.source !== parent || g.data?.source !== "LittleWhiteBox-XiaobaiOS" || typeof g.data.type != "string" || i(g.data) || t.forEach((F) => F(g.data));
  }
  function l() {
    s("os/frame-ready");
  }
  function f() {
    r || (r = !0, window.addEventListener("message", o), document.readyState === "complete" ? l() : window.addEventListener("load", l, { once: !0 }));
  }
  function u(g, F = {}, R = 15e3) {
    const m = $s();
    return new Promise((A, x) => {
      const j = setTimeout(() => {
        e.delete(m), x(new js("host_request_timeout"));
      }, R);
      e.set(m, {
        resolve: A,
        reject: x,
        timer: j,
        session: n ? { ...n } : null
      });
      try {
        s(g, F, m);
      } catch (U) {
        e.delete(m), clearTimeout(j), x(new js("host_request_not_sent", { cause: U }));
      }
    });
  }
  function c(g) {
    n = Object.freeze({ ...g });
  }
  function h() {
    const g = n;
    if (n = null, !!g)
      for (const [F, R] of e)
        R.session?.activationToken === g.activationToken && (clearTimeout(R.timer), R.reject(/* @__PURE__ */ new Error("app_inactive")), e.delete(F));
  }
  function v() {
    return n ? { ...n } : null;
  }
  function C(g) {
    return t.add(g), () => t.delete(g);
  }
  function M() {
    window.removeEventListener("load", l), r && window.removeEventListener("message", o), r = !1, t.clear(), e.forEach((g) => {
      clearTimeout(g.timer), g.reject(/* @__PURE__ */ new Error("frame_bridge_disposed"));
    }), e.clear(), n = null;
  }
  return Object.freeze({
    start: f,
    post: s,
    request: u,
    subscribe: C,
    setAppSession: c,
    clearAppSession: h,
    getAppSession: v,
    dispose: M
  });
}
export {
  fa as $,
  bf as A,
  jn as B,
  af as C,
  ff as D,
  Ta as E,
  Sl as F,
  va as G,
  $n as H,
  Bn as I,
  ba as J,
  _a as K,
  El as L,
  xa as M,
  cf as N,
  ve as O,
  $r as P,
  gt as Q,
  Cl as R,
  yn as S,
  ma as T,
  bn as U,
  Mi as V,
  dl as W,
  Sa as X,
  ua as Y,
  ya as Z,
  ye as _,
  co as a,
  zo as at,
  _f as b,
  wa as c,
  oa as ct,
  Oa as d,
  Mn as dt,
  ul as et,
  Ia as f,
  Ao as ft,
  Pa as g,
  Fa as h,
  ao as i,
  Nn as it,
  Tt as j,
  ca as k,
  Aa as l,
  ui as lt,
  Ea as m,
  na as n,
  fe as nt,
  ta as o,
  ia as ot,
  Ma as p,
  ga as q,
  Na as r,
  Yo as rt,
  La as s,
  k as st,
  js as t,
  la as tt,
  Ra as u,
  On as ut,
  pa as v,
  Ca as w,
  Yi as x,
  aa as y,
  Il as z
};
