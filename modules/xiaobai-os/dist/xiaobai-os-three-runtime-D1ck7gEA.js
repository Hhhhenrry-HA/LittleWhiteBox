/* eslint-disable */
import { a as Wr, c as Mo, d as cc, f as hc, h as uc, o as dc, s as fc, t as pc, u as Ka } from "./xiaobai-os-map-presentation-D954V1Aq.js";
var hi = {
  LEFT: 0,
  MIDDLE: 1,
  RIGHT: 2,
  ROTATE: 0,
  DOLLY: 1,
  PAN: 2
}, li = {
  ROTATE: 0,
  PAN: 1,
  DOLLY_PAN: 2,
  DOLLY_ROTATE: 3
};
var mc = "attached";
var Wi = 1e3, bn = 1001, Vs = 1002, Vt = 1003, ja = 1004, Za = 1005, gn = 1006, Ja = 1007, es = 1008, fi = 1009, gc = 1010, _c = 1011, vc = 1012, xc = 1013, no = 1014, ts = 1015, io = 1016, yc = 1017, Mc = 1018, Sc = 1020, Ec = 35902, Tc = 35899, bc = 1021, Ac = 1022, kn = 1023, $a = 1026, Qa = 1027, el = 1028, wc = 1029, Rc = 1030, Cc = 1031, Pc = 1033, Lc = 33776, Ic = 33777, Dc = 33778, Nc = 33779, Uc = 35840, Oc = 35841, Fc = 35842, Bc = 35843, zc = 36196, kc = 37492, Hc = 37496, Vc = 37808, Gc = 37809, Wc = 37810, Xc = 37811, Yc = 37812, qc = 37813, Kc = 37814, jc = 37815, Zc = 37816, Jc = 37817, $c = 37818, Qc = 37819, eh = 37820, th = 37821, nh = 36492, ih = 36494, sh = 36495, rh = 36283, oh = 36284, ah = 36285, lh = 36286, Xi = 2300, Yi = 2301, tr = 2302, So = 2400, Eo = 2401, To = 2402, ch = 2500, hh = 3200, uh = 3201;
var xt = "srgb", Ut = "srgb-linear", Gs = "linear", Ws = "srgb", nr = 7680;
var tl = 35044;
var pi = 2e3;
var Gn = class {
  addEventListener(e, t) {
    this._listeners === void 0 && (this._listeners = {});
    const n = this._listeners;
    n[e] === void 0 && (n[e] = []), n[e].indexOf(t) === -1 && n[e].push(t);
  }
  hasEventListener(e, t) {
    const n = this._listeners;
    return n === void 0 ? !1 : n[e] !== void 0 && n[e].indexOf(t) !== -1;
  }
  removeEventListener(e, t) {
    const n = this._listeners;
    if (n === void 0) return;
    const i = n[e];
    if (i !== void 0) {
      const s = i.indexOf(t);
      s !== -1 && i.splice(s, 1);
    }
  }
  dispatchEvent(e) {
    const t = this._listeners;
    if (t === void 0) return;
    const n = t[e.type];
    if (n !== void 0) {
      e.target = this;
      const i = n.slice(0);
      for (let s = 0, r = i.length; s < r; s++) i[s].call(this, e);
      e.target = null;
    }
  }
}, St = [
  "00",
  "01",
  "02",
  "03",
  "04",
  "05",
  "06",
  "07",
  "08",
  "09",
  "0a",
  "0b",
  "0c",
  "0d",
  "0e",
  "0f",
  "10",
  "11",
  "12",
  "13",
  "14",
  "15",
  "16",
  "17",
  "18",
  "19",
  "1a",
  "1b",
  "1c",
  "1d",
  "1e",
  "1f",
  "20",
  "21",
  "22",
  "23",
  "24",
  "25",
  "26",
  "27",
  "28",
  "29",
  "2a",
  "2b",
  "2c",
  "2d",
  "2e",
  "2f",
  "30",
  "31",
  "32",
  "33",
  "34",
  "35",
  "36",
  "37",
  "38",
  "39",
  "3a",
  "3b",
  "3c",
  "3d",
  "3e",
  "3f",
  "40",
  "41",
  "42",
  "43",
  "44",
  "45",
  "46",
  "47",
  "48",
  "49",
  "4a",
  "4b",
  "4c",
  "4d",
  "4e",
  "4f",
  "50",
  "51",
  "52",
  "53",
  "54",
  "55",
  "56",
  "57",
  "58",
  "59",
  "5a",
  "5b",
  "5c",
  "5d",
  "5e",
  "5f",
  "60",
  "61",
  "62",
  "63",
  "64",
  "65",
  "66",
  "67",
  "68",
  "69",
  "6a",
  "6b",
  "6c",
  "6d",
  "6e",
  "6f",
  "70",
  "71",
  "72",
  "73",
  "74",
  "75",
  "76",
  "77",
  "78",
  "79",
  "7a",
  "7b",
  "7c",
  "7d",
  "7e",
  "7f",
  "80",
  "81",
  "82",
  "83",
  "84",
  "85",
  "86",
  "87",
  "88",
  "89",
  "8a",
  "8b",
  "8c",
  "8d",
  "8e",
  "8f",
  "90",
  "91",
  "92",
  "93",
  "94",
  "95",
  "96",
  "97",
  "98",
  "99",
  "9a",
  "9b",
  "9c",
  "9d",
  "9e",
  "9f",
  "a0",
  "a1",
  "a2",
  "a3",
  "a4",
  "a5",
  "a6",
  "a7",
  "a8",
  "a9",
  "aa",
  "ab",
  "ac",
  "ad",
  "ae",
  "af",
  "b0",
  "b1",
  "b2",
  "b3",
  "b4",
  "b5",
  "b6",
  "b7",
  "b8",
  "b9",
  "ba",
  "bb",
  "bc",
  "bd",
  "be",
  "bf",
  "c0",
  "c1",
  "c2",
  "c3",
  "c4",
  "c5",
  "c6",
  "c7",
  "c8",
  "c9",
  "ca",
  "cb",
  "cc",
  "cd",
  "ce",
  "cf",
  "d0",
  "d1",
  "d2",
  "d3",
  "d4",
  "d5",
  "d6",
  "d7",
  "d8",
  "d9",
  "da",
  "db",
  "dc",
  "dd",
  "de",
  "df",
  "e0",
  "e1",
  "e2",
  "e3",
  "e4",
  "e5",
  "e6",
  "e7",
  "e8",
  "e9",
  "ea",
  "eb",
  "ec",
  "ed",
  "ee",
  "ef",
  "f0",
  "f1",
  "f2",
  "f3",
  "f4",
  "f5",
  "f6",
  "f7",
  "f8",
  "f9",
  "fa",
  "fb",
  "fc",
  "fd",
  "fe",
  "ff"
], bo = 1234567, zi = Math.PI / 180, mi = 180 / Math.PI;
function Ht() {
  const e = Math.random() * 4294967295 | 0, t = Math.random() * 4294967295 | 0, n = Math.random() * 4294967295 | 0, i = Math.random() * 4294967295 | 0;
  return (St[e & 255] + St[e >> 8 & 255] + St[e >> 16 & 255] + St[e >> 24 & 255] + "-" + St[t & 255] + St[t >> 8 & 255] + "-" + St[t >> 16 & 15 | 64] + St[t >> 24 & 255] + "-" + St[n & 63 | 128] + St[n >> 8 & 255] + "-" + St[n >> 16 & 255] + St[n >> 24 & 255] + St[i & 255] + St[i >> 8 & 255] + St[i >> 16 & 255] + St[i >> 24 & 255]).toLowerCase();
}
function Ge(e, t, n) {
  return Math.max(t, Math.min(n, e));
}
function so(e, t) {
  return (e % t + t) % t;
}
function dh(e, t, n, i, s) {
  return i + (e - t) * (s - i) / (n - t);
}
function fh(e, t, n) {
  return e !== t ? (n - e) / (t - e) : 0;
}
function ki(e, t, n) {
  return (1 - n) * e + n * t;
}
function ph(e, t, n, i) {
  return ki(e, t, 1 - Math.exp(-n * i));
}
function mh(e, t = 1) {
  return t - Math.abs(so(e, t * 2) - t);
}
function gh(e, t, n) {
  return e <= t ? 0 : e >= n ? 1 : (e = (e - t) / (n - t), e * e * (3 - 2 * e));
}
function _h(e, t, n) {
  return e <= t ? 0 : e >= n ? 1 : (e = (e - t) / (n - t), e * e * e * (e * (e * 6 - 15) + 10));
}
function vh(e, t) {
  return e + Math.floor(Math.random() * (t - e + 1));
}
function xh(e, t) {
  return e + Math.random() * (t - e);
}
function yh(e) {
  return e * (0.5 - Math.random());
}
function Mh(e) {
  e !== void 0 && (bo = e);
  let t = bo += 1831565813;
  return t = Math.imul(t ^ t >>> 15, t | 1), t ^= t + Math.imul(t ^ t >>> 7, t | 61), ((t ^ t >>> 14) >>> 0) / 4294967296;
}
function Sh(e) {
  return e * zi;
}
function Eh(e) {
  return e * mi;
}
function Th(e) {
  return (e & e - 1) === 0 && e !== 0;
}
function bh(e) {
  return Math.pow(2, Math.ceil(Math.log(e) / Math.LN2));
}
function Ah(e) {
  return Math.pow(2, Math.floor(Math.log(e) / Math.LN2));
}
function wh(e, t, n, i, s) {
  const r = Math.cos, o = Math.sin, a = r(n / 2), l = o(n / 2), c = r((t + i) / 2), h = o((t + i) / 2), u = r((t - i) / 2), d = o((t - i) / 2), p = r((i - t) / 2), _ = o((i - t) / 2);
  switch (s) {
    case "XYX":
      e.set(a * h, l * u, l * d, a * c);
      break;
    case "YZY":
      e.set(l * d, a * h, l * u, a * c);
      break;
    case "ZXZ":
      e.set(l * u, l * d, a * h, a * c);
      break;
    case "XZX":
      e.set(a * h, l * _, l * p, a * c);
      break;
    case "YXY":
      e.set(l * p, a * h, l * _, a * c);
      break;
    case "ZYZ":
      e.set(l * _, l * p, a * h, a * c);
      break;
    default:
      console.warn("THREE.MathUtils: .setQuaternionFromProperEuler() encountered an unknown order: " + s);
  }
}
function jt(e, t) {
  switch (t.constructor) {
    case Float32Array:
      return e;
    case Uint32Array:
      return e / 4294967295;
    case Uint16Array:
      return e / 65535;
    case Uint8Array:
      return e / 255;
    case Int32Array:
      return Math.max(e / 2147483647, -1);
    case Int16Array:
      return Math.max(e / 32767, -1);
    case Int8Array:
      return Math.max(e / 127, -1);
    default:
      throw new Error("Invalid component type.");
  }
}
function et(e, t) {
  switch (t.constructor) {
    case Float32Array:
      return e;
    case Uint32Array:
      return Math.round(e * 4294967295);
    case Uint16Array:
      return Math.round(e * 65535);
    case Uint8Array:
      return Math.round(e * 255);
    case Int32Array:
      return Math.round(e * 2147483647);
    case Int16Array:
      return Math.round(e * 32767);
    case Int8Array:
      return Math.round(e * 127);
    default:
      throw new Error("Invalid component type.");
  }
}
var Xs = {
  DEG2RAD: zi,
  RAD2DEG: mi,
  generateUUID: Ht,
  clamp: Ge,
  euclideanModulo: so,
  mapLinear: dh,
  inverseLerp: fh,
  lerp: ki,
  damp: ph,
  pingpong: mh,
  smoothstep: gh,
  smootherstep: _h,
  randInt: vh,
  randFloat: xh,
  randFloatSpread: yh,
  seededRandom: Mh,
  degToRad: Sh,
  radToDeg: Eh,
  isPowerOfTwo: Th,
  ceilPowerOfTwo: bh,
  floorPowerOfTwo: Ah,
  setQuaternionFromProperEuler: wh,
  normalize: et,
  denormalize: jt
}, re = class nl {
  constructor(t = 0, n = 0) {
    nl.prototype.isVector2 = !0, this.x = t, this.y = n;
  }
  get width() {
    return this.x;
  }
  set width(t) {
    this.x = t;
  }
  get height() {
    return this.y;
  }
  set height(t) {
    this.y = t;
  }
  set(t, n) {
    return this.x = t, this.y = n, this;
  }
  setScalar(t) {
    return this.x = t, this.y = t, this;
  }
  setX(t) {
    return this.x = t, this;
  }
  setY(t) {
    return this.y = t, this;
  }
  setComponent(t, n) {
    switch (t) {
      case 0:
        this.x = n;
        break;
      case 1:
        this.y = n;
        break;
      default:
        throw new Error("index is out of range: " + t);
    }
    return this;
  }
  getComponent(t) {
    switch (t) {
      case 0:
        return this.x;
      case 1:
        return this.y;
      default:
        throw new Error("index is out of range: " + t);
    }
  }
  clone() {
    return new this.constructor(this.x, this.y);
  }
  copy(t) {
    return this.x = t.x, this.y = t.y, this;
  }
  add(t) {
    return this.x += t.x, this.y += t.y, this;
  }
  addScalar(t) {
    return this.x += t, this.y += t, this;
  }
  addVectors(t, n) {
    return this.x = t.x + n.x, this.y = t.y + n.y, this;
  }
  addScaledVector(t, n) {
    return this.x += t.x * n, this.y += t.y * n, this;
  }
  sub(t) {
    return this.x -= t.x, this.y -= t.y, this;
  }
  subScalar(t) {
    return this.x -= t, this.y -= t, this;
  }
  subVectors(t, n) {
    return this.x = t.x - n.x, this.y = t.y - n.y, this;
  }
  multiply(t) {
    return this.x *= t.x, this.y *= t.y, this;
  }
  multiplyScalar(t) {
    return this.x *= t, this.y *= t, this;
  }
  divide(t) {
    return this.x /= t.x, this.y /= t.y, this;
  }
  divideScalar(t) {
    return this.multiplyScalar(1 / t);
  }
  applyMatrix3(t) {
    const n = this.x, i = this.y, s = t.elements;
    return this.x = s[0] * n + s[3] * i + s[6], this.y = s[1] * n + s[4] * i + s[7], this;
  }
  min(t) {
    return this.x = Math.min(this.x, t.x), this.y = Math.min(this.y, t.y), this;
  }
  max(t) {
    return this.x = Math.max(this.x, t.x), this.y = Math.max(this.y, t.y), this;
  }
  clamp(t, n) {
    return this.x = Ge(this.x, t.x, n.x), this.y = Ge(this.y, t.y, n.y), this;
  }
  clampScalar(t, n) {
    return this.x = Ge(this.x, t, n), this.y = Ge(this.y, t, n), this;
  }
  clampLength(t, n) {
    const i = this.length();
    return this.divideScalar(i || 1).multiplyScalar(Ge(i, t, n));
  }
  floor() {
    return this.x = Math.floor(this.x), this.y = Math.floor(this.y), this;
  }
  ceil() {
    return this.x = Math.ceil(this.x), this.y = Math.ceil(this.y), this;
  }
  round() {
    return this.x = Math.round(this.x), this.y = Math.round(this.y), this;
  }
  roundToZero() {
    return this.x = Math.trunc(this.x), this.y = Math.trunc(this.y), this;
  }
  negate() {
    return this.x = -this.x, this.y = -this.y, this;
  }
  dot(t) {
    return this.x * t.x + this.y * t.y;
  }
  cross(t) {
    return this.x * t.y - this.y * t.x;
  }
  lengthSq() {
    return this.x * this.x + this.y * this.y;
  }
  length() {
    return Math.sqrt(this.x * this.x + this.y * this.y);
  }
  manhattanLength() {
    return Math.abs(this.x) + Math.abs(this.y);
  }
  normalize() {
    return this.divideScalar(this.length() || 1);
  }
  angle() {
    return Math.atan2(-this.y, -this.x) + Math.PI;
  }
  angleTo(t) {
    const n = Math.sqrt(this.lengthSq() * t.lengthSq());
    if (n === 0) return Math.PI / 2;
    const i = this.dot(t) / n;
    return Math.acos(Ge(i, -1, 1));
  }
  distanceTo(t) {
    return Math.sqrt(this.distanceToSquared(t));
  }
  distanceToSquared(t) {
    const n = this.x - t.x, i = this.y - t.y;
    return n * n + i * i;
  }
  manhattanDistanceTo(t) {
    return Math.abs(this.x - t.x) + Math.abs(this.y - t.y);
  }
  setLength(t) {
    return this.normalize().multiplyScalar(t);
  }
  lerp(t, n) {
    return this.x += (t.x - this.x) * n, this.y += (t.y - this.y) * n, this;
  }
  lerpVectors(t, n, i) {
    return this.x = t.x + (n.x - t.x) * i, this.y = t.y + (n.y - t.y) * i, this;
  }
  equals(t) {
    return t.x === this.x && t.y === this.y;
  }
  fromArray(t, n = 0) {
    return this.x = t[n], this.y = t[n + 1], this;
  }
  toArray(t = [], n = 0) {
    return t[n] = this.x, t[n + 1] = this.y, t;
  }
  fromBufferAttribute(t, n) {
    return this.x = t.getX(n), this.y = t.getY(n), this;
  }
  rotateAround(t, n) {
    const i = Math.cos(n), s = Math.sin(n), r = this.x - t.x, o = this.y - t.y;
    return this.x = r * i - o * s + t.x, this.y = r * s + o * i + t.y, this;
  }
  random() {
    return this.x = Math.random(), this.y = Math.random(), this;
  }
  *[Symbol.iterator]() {
    yield this.x, yield this.y;
  }
}, nn = class {
  constructor(e = 0, t = 0, n = 0, i = 1) {
    this.isQuaternion = !0, this._x = e, this._y = t, this._z = n, this._w = i;
  }
  static slerpFlat(e, t, n, i, s, r, o) {
    let a = n[i + 0], l = n[i + 1], c = n[i + 2], h = n[i + 3];
    const u = s[r + 0], d = s[r + 1], p = s[r + 2], _ = s[r + 3];
    if (o === 0) {
      e[t + 0] = a, e[t + 1] = l, e[t + 2] = c, e[t + 3] = h;
      return;
    }
    if (o === 1) {
      e[t + 0] = u, e[t + 1] = d, e[t + 2] = p, e[t + 3] = _;
      return;
    }
    if (h !== _ || a !== u || l !== d || c !== p) {
      let g = 1 - o;
      const m = a * u + l * d + c * p + h * _, f = m >= 0 ? 1 : -1, y = 1 - m * m;
      if (y > Number.EPSILON) {
        const S = Math.sqrt(y), A = Math.atan2(S, m * f);
        g = Math.sin(g * A) / S, o = Math.sin(o * A) / S;
      }
      const v = o * f;
      if (a = a * g + u * v, l = l * g + d * v, c = c * g + p * v, h = h * g + _ * v, g === 1 - o) {
        const S = 1 / Math.sqrt(a * a + l * l + c * c + h * h);
        a *= S, l *= S, c *= S, h *= S;
      }
    }
    e[t] = a, e[t + 1] = l, e[t + 2] = c, e[t + 3] = h;
  }
  static multiplyQuaternionsFlat(e, t, n, i, s, r) {
    const o = n[i], a = n[i + 1], l = n[i + 2], c = n[i + 3], h = s[r], u = s[r + 1], d = s[r + 2], p = s[r + 3];
    return e[t] = o * p + c * h + a * d - l * u, e[t + 1] = a * p + c * u + l * h - o * d, e[t + 2] = l * p + c * d + o * u - a * h, e[t + 3] = c * p - o * h - a * u - l * d, e;
  }
  get x() {
    return this._x;
  }
  set x(e) {
    this._x = e, this._onChangeCallback();
  }
  get y() {
    return this._y;
  }
  set y(e) {
    this._y = e, this._onChangeCallback();
  }
  get z() {
    return this._z;
  }
  set z(e) {
    this._z = e, this._onChangeCallback();
  }
  get w() {
    return this._w;
  }
  set w(e) {
    this._w = e, this._onChangeCallback();
  }
  set(e, t, n, i) {
    return this._x = e, this._y = t, this._z = n, this._w = i, this._onChangeCallback(), this;
  }
  clone() {
    return new this.constructor(this._x, this._y, this._z, this._w);
  }
  copy(e) {
    return this._x = e.x, this._y = e.y, this._z = e.z, this._w = e.w, this._onChangeCallback(), this;
  }
  setFromEuler(e, t = !0) {
    const n = e._x, i = e._y, s = e._z, r = e._order, o = Math.cos, a = Math.sin, l = o(n / 2), c = o(i / 2), h = o(s / 2), u = a(n / 2), d = a(i / 2), p = a(s / 2);
    switch (r) {
      case "XYZ":
        this._x = u * c * h + l * d * p, this._y = l * d * h - u * c * p, this._z = l * c * p + u * d * h, this._w = l * c * h - u * d * p;
        break;
      case "YXZ":
        this._x = u * c * h + l * d * p, this._y = l * d * h - u * c * p, this._z = l * c * p - u * d * h, this._w = l * c * h + u * d * p;
        break;
      case "ZXY":
        this._x = u * c * h - l * d * p, this._y = l * d * h + u * c * p, this._z = l * c * p + u * d * h, this._w = l * c * h - u * d * p;
        break;
      case "ZYX":
        this._x = u * c * h - l * d * p, this._y = l * d * h + u * c * p, this._z = l * c * p - u * d * h, this._w = l * c * h + u * d * p;
        break;
      case "YZX":
        this._x = u * c * h + l * d * p, this._y = l * d * h + u * c * p, this._z = l * c * p - u * d * h, this._w = l * c * h - u * d * p;
        break;
      case "XZY":
        this._x = u * c * h - l * d * p, this._y = l * d * h - u * c * p, this._z = l * c * p + u * d * h, this._w = l * c * h + u * d * p;
        break;
      default:
        console.warn("THREE.Quaternion: .setFromEuler() encountered an unknown order: " + r);
    }
    return t === !0 && this._onChangeCallback(), this;
  }
  setFromAxisAngle(e, t) {
    const n = t / 2, i = Math.sin(n);
    return this._x = e.x * i, this._y = e.y * i, this._z = e.z * i, this._w = Math.cos(n), this._onChangeCallback(), this;
  }
  setFromRotationMatrix(e) {
    const t = e.elements, n = t[0], i = t[4], s = t[8], r = t[1], o = t[5], a = t[9], l = t[2], c = t[6], h = t[10], u = n + o + h;
    if (u > 0) {
      const d = 0.5 / Math.sqrt(u + 1);
      this._w = 0.25 / d, this._x = (c - a) * d, this._y = (s - l) * d, this._z = (r - i) * d;
    } else if (n > o && n > h) {
      const d = 2 * Math.sqrt(1 + n - o - h);
      this._w = (c - a) / d, this._x = 0.25 * d, this._y = (i + r) / d, this._z = (s + l) / d;
    } else if (o > h) {
      const d = 2 * Math.sqrt(1 + o - n - h);
      this._w = (s - l) / d, this._x = (i + r) / d, this._y = 0.25 * d, this._z = (a + c) / d;
    } else {
      const d = 2 * Math.sqrt(1 + h - n - o);
      this._w = (r - i) / d, this._x = (s + l) / d, this._y = (a + c) / d, this._z = 0.25 * d;
    }
    return this._onChangeCallback(), this;
  }
  setFromUnitVectors(e, t) {
    let n = e.dot(t) + 1;
    return n < 1e-8 ? (n = 0, Math.abs(e.x) > Math.abs(e.z) ? (this._x = -e.y, this._y = e.x, this._z = 0, this._w = n) : (this._x = 0, this._y = -e.z, this._z = e.y, this._w = n)) : (this._x = e.y * t.z - e.z * t.y, this._y = e.z * t.x - e.x * t.z, this._z = e.x * t.y - e.y * t.x, this._w = n), this.normalize();
  }
  angleTo(e) {
    return 2 * Math.acos(Math.abs(Ge(this.dot(e), -1, 1)));
  }
  rotateTowards(e, t) {
    const n = this.angleTo(e);
    if (n === 0) return this;
    const i = Math.min(1, t / n);
    return this.slerp(e, i), this;
  }
  identity() {
    return this.set(0, 0, 0, 1);
  }
  invert() {
    return this.conjugate();
  }
  conjugate() {
    return this._x *= -1, this._y *= -1, this._z *= -1, this._onChangeCallback(), this;
  }
  dot(e) {
    return this._x * e._x + this._y * e._y + this._z * e._z + this._w * e._w;
  }
  lengthSq() {
    return this._x * this._x + this._y * this._y + this._z * this._z + this._w * this._w;
  }
  length() {
    return Math.sqrt(this._x * this._x + this._y * this._y + this._z * this._z + this._w * this._w);
  }
  normalize() {
    let e = this.length();
    return e === 0 ? (this._x = 0, this._y = 0, this._z = 0, this._w = 1) : (e = 1 / e, this._x = this._x * e, this._y = this._y * e, this._z = this._z * e, this._w = this._w * e), this._onChangeCallback(), this;
  }
  multiply(e) {
    return this.multiplyQuaternions(this, e);
  }
  premultiply(e) {
    return this.multiplyQuaternions(e, this);
  }
  multiplyQuaternions(e, t) {
    const n = e._x, i = e._y, s = e._z, r = e._w, o = t._x, a = t._y, l = t._z, c = t._w;
    return this._x = n * c + r * o + i * l - s * a, this._y = i * c + r * a + s * o - n * l, this._z = s * c + r * l + n * a - i * o, this._w = r * c - n * o - i * a - s * l, this._onChangeCallback(), this;
  }
  slerp(e, t) {
    if (t === 0) return this;
    if (t === 1) return this.copy(e);
    const n = this._x, i = this._y, s = this._z, r = this._w;
    let o = r * e._w + n * e._x + i * e._y + s * e._z;
    if (o < 0 ? (this._w = -e._w, this._x = -e._x, this._y = -e._y, this._z = -e._z, o = -o) : this.copy(e), o >= 1)
      return this._w = r, this._x = n, this._y = i, this._z = s, this;
    const a = 1 - o * o;
    if (a <= Number.EPSILON) {
      const d = 1 - t;
      return this._w = d * r + t * this._w, this._x = d * n + t * this._x, this._y = d * i + t * this._y, this._z = d * s + t * this._z, this.normalize(), this;
    }
    const l = Math.sqrt(a), c = Math.atan2(l, o), h = Math.sin((1 - t) * c) / l, u = Math.sin(t * c) / l;
    return this._w = r * h + this._w * u, this._x = n * h + this._x * u, this._y = i * h + this._y * u, this._z = s * h + this._z * u, this._onChangeCallback(), this;
  }
  slerpQuaternions(e, t, n) {
    return this.copy(e).slerp(t, n);
  }
  random() {
    const e = 2 * Math.PI * Math.random(), t = 2 * Math.PI * Math.random(), n = Math.random(), i = Math.sqrt(1 - n), s = Math.sqrt(n);
    return this.set(i * Math.sin(e), i * Math.cos(e), s * Math.sin(t), s * Math.cos(t));
  }
  equals(e) {
    return e._x === this._x && e._y === this._y && e._z === this._z && e._w === this._w;
  }
  fromArray(e, t = 0) {
    return this._x = e[t], this._y = e[t + 1], this._z = e[t + 2], this._w = e[t + 3], this._onChangeCallback(), this;
  }
  toArray(e = [], t = 0) {
    return e[t] = this._x, e[t + 1] = this._y, e[t + 2] = this._z, e[t + 3] = this._w, e;
  }
  fromBufferAttribute(e, t) {
    return this._x = e.getX(t), this._y = e.getY(t), this._z = e.getZ(t), this._w = e.getW(t), this._onChangeCallback(), this;
  }
  toJSON() {
    return this.toArray();
  }
  _onChange(e) {
    return this._onChangeCallback = e, this;
  }
  _onChangeCallback() {
  }
  *[Symbol.iterator]() {
    yield this._x, yield this._y, yield this._z, yield this._w;
  }
}, C = class il {
  constructor(t = 0, n = 0, i = 0) {
    il.prototype.isVector3 = !0, this.x = t, this.y = n, this.z = i;
  }
  set(t, n, i) {
    return i === void 0 && (i = this.z), this.x = t, this.y = n, this.z = i, this;
  }
  setScalar(t) {
    return this.x = t, this.y = t, this.z = t, this;
  }
  setX(t) {
    return this.x = t, this;
  }
  setY(t) {
    return this.y = t, this;
  }
  setZ(t) {
    return this.z = t, this;
  }
  setComponent(t, n) {
    switch (t) {
      case 0:
        this.x = n;
        break;
      case 1:
        this.y = n;
        break;
      case 2:
        this.z = n;
        break;
      default:
        throw new Error("index is out of range: " + t);
    }
    return this;
  }
  getComponent(t) {
    switch (t) {
      case 0:
        return this.x;
      case 1:
        return this.y;
      case 2:
        return this.z;
      default:
        throw new Error("index is out of range: " + t);
    }
  }
  clone() {
    return new this.constructor(this.x, this.y, this.z);
  }
  copy(t) {
    return this.x = t.x, this.y = t.y, this.z = t.z, this;
  }
  add(t) {
    return this.x += t.x, this.y += t.y, this.z += t.z, this;
  }
  addScalar(t) {
    return this.x += t, this.y += t, this.z += t, this;
  }
  addVectors(t, n) {
    return this.x = t.x + n.x, this.y = t.y + n.y, this.z = t.z + n.z, this;
  }
  addScaledVector(t, n) {
    return this.x += t.x * n, this.y += t.y * n, this.z += t.z * n, this;
  }
  sub(t) {
    return this.x -= t.x, this.y -= t.y, this.z -= t.z, this;
  }
  subScalar(t) {
    return this.x -= t, this.y -= t, this.z -= t, this;
  }
  subVectors(t, n) {
    return this.x = t.x - n.x, this.y = t.y - n.y, this.z = t.z - n.z, this;
  }
  multiply(t) {
    return this.x *= t.x, this.y *= t.y, this.z *= t.z, this;
  }
  multiplyScalar(t) {
    return this.x *= t, this.y *= t, this.z *= t, this;
  }
  multiplyVectors(t, n) {
    return this.x = t.x * n.x, this.y = t.y * n.y, this.z = t.z * n.z, this;
  }
  applyEuler(t) {
    return this.applyQuaternion(Ao.setFromEuler(t));
  }
  applyAxisAngle(t, n) {
    return this.applyQuaternion(Ao.setFromAxisAngle(t, n));
  }
  applyMatrix3(t) {
    const n = this.x, i = this.y, s = this.z, r = t.elements;
    return this.x = r[0] * n + r[3] * i + r[6] * s, this.y = r[1] * n + r[4] * i + r[7] * s, this.z = r[2] * n + r[5] * i + r[8] * s, this;
  }
  applyNormalMatrix(t) {
    return this.applyMatrix3(t).normalize();
  }
  applyMatrix4(t) {
    const n = this.x, i = this.y, s = this.z, r = t.elements, o = 1 / (r[3] * n + r[7] * i + r[11] * s + r[15]);
    return this.x = (r[0] * n + r[4] * i + r[8] * s + r[12]) * o, this.y = (r[1] * n + r[5] * i + r[9] * s + r[13]) * o, this.z = (r[2] * n + r[6] * i + r[10] * s + r[14]) * o, this;
  }
  applyQuaternion(t) {
    const n = this.x, i = this.y, s = this.z, r = t.x, o = t.y, a = t.z, l = t.w, c = 2 * (o * s - a * i), h = 2 * (a * n - r * s), u = 2 * (r * i - o * n);
    return this.x = n + l * c + o * u - a * h, this.y = i + l * h + a * c - r * u, this.z = s + l * u + r * h - o * c, this;
  }
  project(t) {
    return this.applyMatrix4(t.matrixWorldInverse).applyMatrix4(t.projectionMatrix);
  }
  unproject(t) {
    return this.applyMatrix4(t.projectionMatrixInverse).applyMatrix4(t.matrixWorld);
  }
  transformDirection(t) {
    const n = this.x, i = this.y, s = this.z, r = t.elements;
    return this.x = r[0] * n + r[4] * i + r[8] * s, this.y = r[1] * n + r[5] * i + r[9] * s, this.z = r[2] * n + r[6] * i + r[10] * s, this.normalize();
  }
  divide(t) {
    return this.x /= t.x, this.y /= t.y, this.z /= t.z, this;
  }
  divideScalar(t) {
    return this.multiplyScalar(1 / t);
  }
  min(t) {
    return this.x = Math.min(this.x, t.x), this.y = Math.min(this.y, t.y), this.z = Math.min(this.z, t.z), this;
  }
  max(t) {
    return this.x = Math.max(this.x, t.x), this.y = Math.max(this.y, t.y), this.z = Math.max(this.z, t.z), this;
  }
  clamp(t, n) {
    return this.x = Ge(this.x, t.x, n.x), this.y = Ge(this.y, t.y, n.y), this.z = Ge(this.z, t.z, n.z), this;
  }
  clampScalar(t, n) {
    return this.x = Ge(this.x, t, n), this.y = Ge(this.y, t, n), this.z = Ge(this.z, t, n), this;
  }
  clampLength(t, n) {
    const i = this.length();
    return this.divideScalar(i || 1).multiplyScalar(Ge(i, t, n));
  }
  floor() {
    return this.x = Math.floor(this.x), this.y = Math.floor(this.y), this.z = Math.floor(this.z), this;
  }
  ceil() {
    return this.x = Math.ceil(this.x), this.y = Math.ceil(this.y), this.z = Math.ceil(this.z), this;
  }
  round() {
    return this.x = Math.round(this.x), this.y = Math.round(this.y), this.z = Math.round(this.z), this;
  }
  roundToZero() {
    return this.x = Math.trunc(this.x), this.y = Math.trunc(this.y), this.z = Math.trunc(this.z), this;
  }
  negate() {
    return this.x = -this.x, this.y = -this.y, this.z = -this.z, this;
  }
  dot(t) {
    return this.x * t.x + this.y * t.y + this.z * t.z;
  }
  lengthSq() {
    return this.x * this.x + this.y * this.y + this.z * this.z;
  }
  length() {
    return Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z);
  }
  manhattanLength() {
    return Math.abs(this.x) + Math.abs(this.y) + Math.abs(this.z);
  }
  normalize() {
    return this.divideScalar(this.length() || 1);
  }
  setLength(t) {
    return this.normalize().multiplyScalar(t);
  }
  lerp(t, n) {
    return this.x += (t.x - this.x) * n, this.y += (t.y - this.y) * n, this.z += (t.z - this.z) * n, this;
  }
  lerpVectors(t, n, i) {
    return this.x = t.x + (n.x - t.x) * i, this.y = t.y + (n.y - t.y) * i, this.z = t.z + (n.z - t.z) * i, this;
  }
  cross(t) {
    return this.crossVectors(this, t);
  }
  crossVectors(t, n) {
    const i = t.x, s = t.y, r = t.z, o = n.x, a = n.y, l = n.z;
    return this.x = s * l - r * a, this.y = r * o - i * l, this.z = i * a - s * o, this;
  }
  projectOnVector(t) {
    const n = t.lengthSq();
    if (n === 0) return this.set(0, 0, 0);
    const i = t.dot(this) / n;
    return this.copy(t).multiplyScalar(i);
  }
  projectOnPlane(t) {
    return ir.copy(this).projectOnVector(t), this.sub(ir);
  }
  reflect(t) {
    return this.sub(ir.copy(t).multiplyScalar(2 * this.dot(t)));
  }
  angleTo(t) {
    const n = Math.sqrt(this.lengthSq() * t.lengthSq());
    if (n === 0) return Math.PI / 2;
    const i = this.dot(t) / n;
    return Math.acos(Ge(i, -1, 1));
  }
  distanceTo(t) {
    return Math.sqrt(this.distanceToSquared(t));
  }
  distanceToSquared(t) {
    const n = this.x - t.x, i = this.y - t.y, s = this.z - t.z;
    return n * n + i * i + s * s;
  }
  manhattanDistanceTo(t) {
    return Math.abs(this.x - t.x) + Math.abs(this.y - t.y) + Math.abs(this.z - t.z);
  }
  setFromSpherical(t) {
    return this.setFromSphericalCoords(t.radius, t.phi, t.theta);
  }
  setFromSphericalCoords(t, n, i) {
    const s = Math.sin(n) * t;
    return this.x = s * Math.sin(i), this.y = Math.cos(n) * t, this.z = s * Math.cos(i), this;
  }
  setFromCylindrical(t) {
    return this.setFromCylindricalCoords(t.radius, t.theta, t.y);
  }
  setFromCylindricalCoords(t, n, i) {
    return this.x = t * Math.sin(n), this.y = i, this.z = t * Math.cos(n), this;
  }
  setFromMatrixPosition(t) {
    const n = t.elements;
    return this.x = n[12], this.y = n[13], this.z = n[14], this;
  }
  setFromMatrixScale(t) {
    const n = this.setFromMatrixColumn(t, 0).length(), i = this.setFromMatrixColumn(t, 1).length(), s = this.setFromMatrixColumn(t, 2).length();
    return this.x = n, this.y = i, this.z = s, this;
  }
  setFromMatrixColumn(t, n) {
    return this.fromArray(t.elements, n * 4);
  }
  setFromMatrix3Column(t, n) {
    return this.fromArray(t.elements, n * 3);
  }
  setFromEuler(t) {
    return this.x = t._x, this.y = t._y, this.z = t._z, this;
  }
  setFromColor(t) {
    return this.x = t.r, this.y = t.g, this.z = t.b, this;
  }
  equals(t) {
    return t.x === this.x && t.y === this.y && t.z === this.z;
  }
  fromArray(t, n = 0) {
    return this.x = t[n], this.y = t[n + 1], this.z = t[n + 2], this;
  }
  toArray(t = [], n = 0) {
    return t[n] = this.x, t[n + 1] = this.y, t[n + 2] = this.z, t;
  }
  fromBufferAttribute(t, n) {
    return this.x = t.getX(n), this.y = t.getY(n), this.z = t.getZ(n), this;
  }
  random() {
    return this.x = Math.random(), this.y = Math.random(), this.z = Math.random(), this;
  }
  randomDirection() {
    const t = Math.random() * Math.PI * 2, n = Math.random() * 2 - 1, i = Math.sqrt(1 - n * n);
    return this.x = i * Math.cos(t), this.y = n, this.z = i * Math.sin(t), this;
  }
  *[Symbol.iterator]() {
    yield this.x, yield this.y, yield this.z;
  }
}, ir = /* @__PURE__ */ new C(), Ao = /* @__PURE__ */ new nn(), qe = class sl {
  constructor(t, n, i, s, r, o, a, l, c) {
    sl.prototype.isMatrix3 = !0, this.elements = [
      1,
      0,
      0,
      0,
      1,
      0,
      0,
      0,
      1
    ], t !== void 0 && this.set(t, n, i, s, r, o, a, l, c);
  }
  set(t, n, i, s, r, o, a, l, c) {
    const h = this.elements;
    return h[0] = t, h[1] = s, h[2] = a, h[3] = n, h[4] = r, h[5] = l, h[6] = i, h[7] = o, h[8] = c, this;
  }
  identity() {
    return this.set(1, 0, 0, 0, 1, 0, 0, 0, 1), this;
  }
  copy(t) {
    const n = this.elements, i = t.elements;
    return n[0] = i[0], n[1] = i[1], n[2] = i[2], n[3] = i[3], n[4] = i[4], n[5] = i[5], n[6] = i[6], n[7] = i[7], n[8] = i[8], this;
  }
  extractBasis(t, n, i) {
    return t.setFromMatrix3Column(this, 0), n.setFromMatrix3Column(this, 1), i.setFromMatrix3Column(this, 2), this;
  }
  setFromMatrix4(t) {
    const n = t.elements;
    return this.set(n[0], n[4], n[8], n[1], n[5], n[9], n[2], n[6], n[10]), this;
  }
  multiply(t) {
    return this.multiplyMatrices(this, t);
  }
  premultiply(t) {
    return this.multiplyMatrices(t, this);
  }
  multiplyMatrices(t, n) {
    const i = t.elements, s = n.elements, r = this.elements, o = i[0], a = i[3], l = i[6], c = i[1], h = i[4], u = i[7], d = i[2], p = i[5], _ = i[8], g = s[0], m = s[3], f = s[6], y = s[1], v = s[4], S = s[7], A = s[2], b = s[5], R = s[8];
    return r[0] = o * g + a * y + l * A, r[3] = o * m + a * v + l * b, r[6] = o * f + a * S + l * R, r[1] = c * g + h * y + u * A, r[4] = c * m + h * v + u * b, r[7] = c * f + h * S + u * R, r[2] = d * g + p * y + _ * A, r[5] = d * m + p * v + _ * b, r[8] = d * f + p * S + _ * R, this;
  }
  multiplyScalar(t) {
    const n = this.elements;
    return n[0] *= t, n[3] *= t, n[6] *= t, n[1] *= t, n[4] *= t, n[7] *= t, n[2] *= t, n[5] *= t, n[8] *= t, this;
  }
  determinant() {
    const t = this.elements, n = t[0], i = t[1], s = t[2], r = t[3], o = t[4], a = t[5], l = t[6], c = t[7], h = t[8];
    return n * o * h - n * a * c - i * r * h + i * a * l + s * r * c - s * o * l;
  }
  invert() {
    const t = this.elements, n = t[0], i = t[1], s = t[2], r = t[3], o = t[4], a = t[5], l = t[6], c = t[7], h = t[8], u = h * o - a * c, d = a * l - h * r, p = c * r - o * l, _ = n * u + i * d + s * p;
    if (_ === 0) return this.set(0, 0, 0, 0, 0, 0, 0, 0, 0);
    const g = 1 / _;
    return t[0] = u * g, t[1] = (s * c - h * i) * g, t[2] = (a * i - s * o) * g, t[3] = d * g, t[4] = (h * n - s * l) * g, t[5] = (s * r - a * n) * g, t[6] = p * g, t[7] = (i * l - c * n) * g, t[8] = (o * n - i * r) * g, this;
  }
  transpose() {
    let t;
    const n = this.elements;
    return t = n[1], n[1] = n[3], n[3] = t, t = n[2], n[2] = n[6], n[6] = t, t = n[5], n[5] = n[7], n[7] = t, this;
  }
  getNormalMatrix(t) {
    return this.setFromMatrix4(t).invert().transpose();
  }
  transposeIntoArray(t) {
    const n = this.elements;
    return t[0] = n[0], t[1] = n[3], t[2] = n[6], t[3] = n[1], t[4] = n[4], t[5] = n[7], t[6] = n[2], t[7] = n[5], t[8] = n[8], this;
  }
  setUvTransform(t, n, i, s, r, o, a) {
    const l = Math.cos(r), c = Math.sin(r);
    return this.set(i * l, i * c, -i * (l * o + c * a) + o + t, -s * c, s * l, -s * (-c * o + l * a) + a + n, 0, 0, 1), this;
  }
  scale(t, n) {
    return this.premultiply(sr.makeScale(t, n)), this;
  }
  rotate(t) {
    return this.premultiply(sr.makeRotation(-t)), this;
  }
  translate(t, n) {
    return this.premultiply(sr.makeTranslation(t, n)), this;
  }
  makeTranslation(t, n) {
    return t.isVector2 ? this.set(1, 0, t.x, 0, 1, t.y, 0, 0, 1) : this.set(1, 0, t, 0, 1, n, 0, 0, 1), this;
  }
  makeRotation(t) {
    const n = Math.cos(t), i = Math.sin(t);
    return this.set(n, -i, 0, i, n, 0, 0, 0, 1), this;
  }
  makeScale(t, n) {
    return this.set(t, 0, 0, 0, n, 0, 0, 0, 1), this;
  }
  equals(t) {
    const n = this.elements, i = t.elements;
    for (let s = 0; s < 9; s++) if (n[s] !== i[s]) return !1;
    return !0;
  }
  fromArray(t, n = 0) {
    for (let i = 0; i < 9; i++) this.elements[i] = t[i + n];
    return this;
  }
  toArray(t = [], n = 0) {
    const i = this.elements;
    return t[n] = i[0], t[n + 1] = i[1], t[n + 2] = i[2], t[n + 3] = i[3], t[n + 4] = i[4], t[n + 5] = i[5], t[n + 6] = i[6], t[n + 7] = i[7], t[n + 8] = i[8], t;
  }
  clone() {
    return new this.constructor().fromArray(this.elements);
  }
}, sr = /* @__PURE__ */ new qe();
function rl(e) {
  for (let t = e.length - 1; t >= 0; --t) if (e[t] >= 65535) return !0;
  return !1;
}
function qi(e) {
  return document.createElementNS("http://www.w3.org/1999/xhtml", e);
}
function Rh() {
  const e = qi("canvas");
  return e.style.display = "block", e;
}
var wo = {};
function Ki(e) {
  e in wo || (wo[e] = !0, console.warn(e));
}
function Ch(e, t, n) {
  return new Promise(function(i, s) {
    function r() {
      switch (e.clientWaitSync(t, e.SYNC_FLUSH_COMMANDS_BIT, 0)) {
        case e.WAIT_FAILED:
          s();
          break;
        case e.TIMEOUT_EXPIRED:
          setTimeout(r, n);
          break;
        default:
          i();
      }
    }
    setTimeout(r, n);
  });
}
var Ro = /* @__PURE__ */ new qe().set(0.4123908, 0.3575843, 0.1804808, 0.212639, 0.7151687, 0.0721923, 0.0193308, 0.1191948, 0.9505322), Co = /* @__PURE__ */ new qe().set(3.2409699, -1.5373832, -0.4986108, -0.9692436, 1.8759675, 0.0415551, 0.0556301, -0.203977, 1.0569715);
function Ph() {
  const e = {
    enabled: !0,
    workingColorSpace: Ut,
    spaces: {},
    convert: function(s, r, o) {
      return this.enabled === !1 || r === o || !r || !o || (this.spaces[r].transfer === "srgb" && (s.r = mn(s.r), s.g = mn(s.g), s.b = mn(s.b)), this.spaces[r].primaries !== this.spaces[o].primaries && (s.applyMatrix3(this.spaces[r].toXYZ), s.applyMatrix3(this.spaces[o].fromXYZ)), this.spaces[o].transfer === "srgb" && (s.r = ui(s.r), s.g = ui(s.g), s.b = ui(s.b))), s;
    },
    workingToColorSpace: function(s, r) {
      return this.convert(s, this.workingColorSpace, r);
    },
    colorSpaceToWorking: function(s, r) {
      return this.convert(s, r, this.workingColorSpace);
    },
    getPrimaries: function(s) {
      return this.spaces[s].primaries;
    },
    getTransfer: function(s) {
      return s === "" ? Gs : this.spaces[s].transfer;
    },
    getToneMappingMode: function(s) {
      return this.spaces[s].outputColorSpaceConfig.toneMappingMode || "standard";
    },
    getLuminanceCoefficients: function(s, r = this.workingColorSpace) {
      return s.fromArray(this.spaces[r].luminanceCoefficients);
    },
    define: function(s) {
      Object.assign(this.spaces, s);
    },
    _getMatrix: function(s, r, o) {
      return s.copy(this.spaces[r].toXYZ).multiply(this.spaces[o].fromXYZ);
    },
    _getDrawingBufferColorSpace: function(s) {
      return this.spaces[s].outputColorSpaceConfig.drawingBufferColorSpace;
    },
    _getUnpackColorSpace: function(s = this.workingColorSpace) {
      return this.spaces[s].workingColorSpaceConfig.unpackColorSpace;
    },
    fromWorkingColorSpace: function(s, r) {
      return Ki("THREE.ColorManagement: .fromWorkingColorSpace() has been renamed to .workingToColorSpace()."), e.workingToColorSpace(s, r);
    },
    toWorkingColorSpace: function(s, r) {
      return Ki("THREE.ColorManagement: .toWorkingColorSpace() has been renamed to .colorSpaceToWorking()."), e.colorSpaceToWorking(s, r);
    }
  }, t = [
    0.64,
    0.33,
    0.3,
    0.6,
    0.15,
    0.06
  ], n = [
    0.2126,
    0.7152,
    0.0722
  ], i = [0.3127, 0.329];
  return e.define({
    [Ut]: {
      primaries: t,
      whitePoint: i,
      transfer: Gs,
      toXYZ: Ro,
      fromXYZ: Co,
      luminanceCoefficients: n,
      workingColorSpaceConfig: { unpackColorSpace: xt },
      outputColorSpaceConfig: { drawingBufferColorSpace: xt }
    },
    [xt]: {
      primaries: t,
      whitePoint: i,
      transfer: Ws,
      toXYZ: Ro,
      fromXYZ: Co,
      luminanceCoefficients: n,
      outputColorSpaceConfig: { drawingBufferColorSpace: xt }
    }
  }), e;
}
var Ze = /* @__PURE__ */ Ph();
function mn(e) {
  return e < 0.04045 ? e * 0.0773993808 : Math.pow(e * 0.9478672986 + 0.0521327014, 2.4);
}
function ui(e) {
  return e < 31308e-7 ? e * 12.92 : 1.055 * Math.pow(e, 0.41666) - 0.055;
}
var Xn, Lh = class {
  static getDataURL(e, t = "image/png") {
    if (/^data:/i.test(e.src) || typeof HTMLCanvasElement > "u") return e.src;
    let n;
    if (e instanceof HTMLCanvasElement) n = e;
    else {
      Xn === void 0 && (Xn = qi("canvas")), Xn.width = e.width, Xn.height = e.height;
      const i = Xn.getContext("2d");
      e instanceof ImageData ? i.putImageData(e, 0, 0) : i.drawImage(e, 0, 0, e.width, e.height), n = Xn;
    }
    return n.toDataURL(t);
  }
  static sRGBToLinear(e) {
    if (typeof HTMLImageElement < "u" && e instanceof HTMLImageElement || typeof HTMLCanvasElement < "u" && e instanceof HTMLCanvasElement || typeof ImageBitmap < "u" && e instanceof ImageBitmap) {
      const t = qi("canvas");
      t.width = e.width, t.height = e.height;
      const n = t.getContext("2d");
      n.drawImage(e, 0, 0, e.width, e.height);
      const i = n.getImageData(0, 0, e.width, e.height), s = i.data;
      for (let r = 0; r < s.length; r++) s[r] = mn(s[r] / 255) * 255;
      return n.putImageData(i, 0, 0), t;
    } else if (e.data) {
      const t = e.data.slice(0);
      for (let n = 0; n < t.length; n++) t instanceof Uint8Array || t instanceof Uint8ClampedArray ? t[n] = Math.floor(mn(t[n] / 255) * 255) : t[n] = mn(t[n]);
      return {
        data: t,
        width: e.width,
        height: e.height
      };
    } else
      return console.warn("THREE.ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."), e;
  }
}, Ih = 0, ro = class {
  constructor(e = null) {
    this.isSource = !0, Object.defineProperty(this, "id", { value: Ih++ }), this.uuid = Ht(), this.data = e, this.dataReady = !0, this.version = 0;
  }
  getSize(e) {
    const t = this.data;
    return typeof HTMLVideoElement < "u" && t instanceof HTMLVideoElement ? e.set(t.videoWidth, t.videoHeight, 0) : t instanceof VideoFrame ? e.set(t.displayHeight, t.displayWidth, 0) : t !== null ? e.set(t.width, t.height, t.depth || 0) : e.set(0, 0, 0), e;
  }
  set needsUpdate(e) {
    e === !0 && this.version++;
  }
  toJSON(e) {
    const t = e === void 0 || typeof e == "string";
    if (!t && e.images[this.uuid] !== void 0) return e.images[this.uuid];
    const n = {
      uuid: this.uuid,
      url: ""
    }, i = this.data;
    if (i !== null) {
      let s;
      if (Array.isArray(i)) {
        s = [];
        for (let r = 0, o = i.length; r < o; r++) i[r].isDataTexture ? s.push(rr(i[r].image)) : s.push(rr(i[r]));
      } else s = rr(i);
      n.url = s;
    }
    return t || (e.images[this.uuid] = n), n;
  }
};
function rr(e) {
  return typeof HTMLImageElement < "u" && e instanceof HTMLImageElement || typeof HTMLCanvasElement < "u" && e instanceof HTMLCanvasElement || typeof ImageBitmap < "u" && e instanceof ImageBitmap ? Lh.getDataURL(e) : e.data ? {
    data: Array.from(e.data),
    width: e.width,
    height: e.height,
    type: e.data.constructor.name
  } : (console.warn("THREE.Texture: Unable to serialize Texture."), {});
}
var Dh = 0, or = /* @__PURE__ */ new C(), Pt = class zs extends Gn {
  constructor(t = zs.DEFAULT_IMAGE, n = zs.DEFAULT_MAPPING, i = bn, s = bn, r = gn, o = es, a = kn, l = fi, c = zs.DEFAULT_ANISOTROPY, h = "") {
    super(), this.isTexture = !0, Object.defineProperty(this, "id", { value: Dh++ }), this.uuid = Ht(), this.name = "", this.source = new ro(t), this.mipmaps = [], this.mapping = n, this.channel = 0, this.wrapS = i, this.wrapT = s, this.magFilter = r, this.minFilter = o, this.anisotropy = c, this.format = a, this.internalFormat = null, this.type = l, this.offset = new re(0, 0), this.repeat = new re(1, 1), this.center = new re(0, 0), this.rotation = 0, this.matrixAutoUpdate = !0, this.matrix = new qe(), this.generateMipmaps = !0, this.premultiplyAlpha = !1, this.flipY = !0, this.unpackAlignment = 4, this.colorSpace = h, this.userData = {}, this.updateRanges = [], this.version = 0, this.onUpdate = null, this.renderTarget = null, this.isRenderTargetTexture = !1, this.isArrayTexture = !!(t && t.depth && t.depth > 1), this.pmremVersion = 0;
  }
  get width() {
    return this.source.getSize(or).x;
  }
  get height() {
    return this.source.getSize(or).y;
  }
  get depth() {
    return this.source.getSize(or).z;
  }
  get image() {
    return this.source.data;
  }
  set image(t = null) {
    this.source.data = t;
  }
  updateMatrix() {
    this.matrix.setUvTransform(this.offset.x, this.offset.y, this.repeat.x, this.repeat.y, this.rotation, this.center.x, this.center.y);
  }
  addUpdateRange(t, n) {
    this.updateRanges.push({
      start: t,
      count: n
    });
  }
  clearUpdateRanges() {
    this.updateRanges.length = 0;
  }
  clone() {
    return new this.constructor().copy(this);
  }
  copy(t) {
    return this.name = t.name, this.source = t.source, this.mipmaps = t.mipmaps.slice(0), this.mapping = t.mapping, this.channel = t.channel, this.wrapS = t.wrapS, this.wrapT = t.wrapT, this.magFilter = t.magFilter, this.minFilter = t.minFilter, this.anisotropy = t.anisotropy, this.format = t.format, this.internalFormat = t.internalFormat, this.type = t.type, this.offset.copy(t.offset), this.repeat.copy(t.repeat), this.center.copy(t.center), this.rotation = t.rotation, this.matrixAutoUpdate = t.matrixAutoUpdate, this.matrix.copy(t.matrix), this.generateMipmaps = t.generateMipmaps, this.premultiplyAlpha = t.premultiplyAlpha, this.flipY = t.flipY, this.unpackAlignment = t.unpackAlignment, this.colorSpace = t.colorSpace, this.renderTarget = t.renderTarget, this.isRenderTargetTexture = t.isRenderTargetTexture, this.isArrayTexture = t.isArrayTexture, this.userData = JSON.parse(JSON.stringify(t.userData)), this.needsUpdate = !0, this;
  }
  setValues(t) {
    for (const n in t) {
      const i = t[n];
      if (i === void 0) {
        console.warn(`THREE.Texture.setValues(): parameter '${n}' has value of undefined.`);
        continue;
      }
      const s = this[n];
      if (s === void 0) {
        console.warn(`THREE.Texture.setValues(): property '${n}' does not exist.`);
        continue;
      }
      s && i && s.isVector2 && i.isVector2 || s && i && s.isVector3 && i.isVector3 || s && i && s.isMatrix3 && i.isMatrix3 ? s.copy(i) : this[n] = i;
    }
  }
  toJSON(t) {
    const n = t === void 0 || typeof t == "string";
    if (!n && t.textures[this.uuid] !== void 0) return t.textures[this.uuid];
    const i = {
      metadata: {
        version: 4.7,
        type: "Texture",
        generator: "Texture.toJSON"
      },
      uuid: this.uuid,
      name: this.name,
      image: this.source.toJSON(t).uuid,
      mapping: this.mapping,
      channel: this.channel,
      repeat: [this.repeat.x, this.repeat.y],
      offset: [this.offset.x, this.offset.y],
      center: [this.center.x, this.center.y],
      rotation: this.rotation,
      wrap: [this.wrapS, this.wrapT],
      format: this.format,
      internalFormat: this.internalFormat,
      type: this.type,
      colorSpace: this.colorSpace,
      minFilter: this.minFilter,
      magFilter: this.magFilter,
      anisotropy: this.anisotropy,
      flipY: this.flipY,
      generateMipmaps: this.generateMipmaps,
      premultiplyAlpha: this.premultiplyAlpha,
      unpackAlignment: this.unpackAlignment
    };
    return Object.keys(this.userData).length > 0 && (i.userData = this.userData), n || (t.textures[this.uuid] = i), i;
  }
  dispose() {
    this.dispatchEvent({ type: "dispose" });
  }
  transformUv(t) {
    if (this.mapping !== 300) return t;
    if (t.applyMatrix3(this.matrix), t.x < 0 || t.x > 1) switch (this.wrapS) {
      case Wi:
        t.x = t.x - Math.floor(t.x);
        break;
      case bn:
        t.x = t.x < 0 ? 0 : 1;
        break;
      case Vs:
        Math.abs(Math.floor(t.x) % 2) === 1 ? t.x = Math.ceil(t.x) - t.x : t.x = t.x - Math.floor(t.x);
        break;
    }
    if (t.y < 0 || t.y > 1) switch (this.wrapT) {
      case Wi:
        t.y = t.y - Math.floor(t.y);
        break;
      case bn:
        t.y = t.y < 0 ? 0 : 1;
        break;
      case Vs:
        Math.abs(Math.floor(t.y) % 2) === 1 ? t.y = Math.ceil(t.y) - t.y : t.y = t.y - Math.floor(t.y);
        break;
    }
    return this.flipY && (t.y = 1 - t.y), t;
  }
  set needsUpdate(t) {
    t === !0 && (this.version++, this.source.needsUpdate = !0);
  }
  set needsPMREMUpdate(t) {
    t === !0 && this.pmremVersion++;
  }
};
Pt.DEFAULT_IMAGE = null;
Pt.DEFAULT_MAPPING = 300;
Pt.DEFAULT_ANISOTROPY = 1;
var tt = class ol {
  constructor(t = 0, n = 0, i = 0, s = 1) {
    ol.prototype.isVector4 = !0, this.x = t, this.y = n, this.z = i, this.w = s;
  }
  get width() {
    return this.z;
  }
  set width(t) {
    this.z = t;
  }
  get height() {
    return this.w;
  }
  set height(t) {
    this.w = t;
  }
  set(t, n, i, s) {
    return this.x = t, this.y = n, this.z = i, this.w = s, this;
  }
  setScalar(t) {
    return this.x = t, this.y = t, this.z = t, this.w = t, this;
  }
  setX(t) {
    return this.x = t, this;
  }
  setY(t) {
    return this.y = t, this;
  }
  setZ(t) {
    return this.z = t, this;
  }
  setW(t) {
    return this.w = t, this;
  }
  setComponent(t, n) {
    switch (t) {
      case 0:
        this.x = n;
        break;
      case 1:
        this.y = n;
        break;
      case 2:
        this.z = n;
        break;
      case 3:
        this.w = n;
        break;
      default:
        throw new Error("index is out of range: " + t);
    }
    return this;
  }
  getComponent(t) {
    switch (t) {
      case 0:
        return this.x;
      case 1:
        return this.y;
      case 2:
        return this.z;
      case 3:
        return this.w;
      default:
        throw new Error("index is out of range: " + t);
    }
  }
  clone() {
    return new this.constructor(this.x, this.y, this.z, this.w);
  }
  copy(t) {
    return this.x = t.x, this.y = t.y, this.z = t.z, this.w = t.w !== void 0 ? t.w : 1, this;
  }
  add(t) {
    return this.x += t.x, this.y += t.y, this.z += t.z, this.w += t.w, this;
  }
  addScalar(t) {
    return this.x += t, this.y += t, this.z += t, this.w += t, this;
  }
  addVectors(t, n) {
    return this.x = t.x + n.x, this.y = t.y + n.y, this.z = t.z + n.z, this.w = t.w + n.w, this;
  }
  addScaledVector(t, n) {
    return this.x += t.x * n, this.y += t.y * n, this.z += t.z * n, this.w += t.w * n, this;
  }
  sub(t) {
    return this.x -= t.x, this.y -= t.y, this.z -= t.z, this.w -= t.w, this;
  }
  subScalar(t) {
    return this.x -= t, this.y -= t, this.z -= t, this.w -= t, this;
  }
  subVectors(t, n) {
    return this.x = t.x - n.x, this.y = t.y - n.y, this.z = t.z - n.z, this.w = t.w - n.w, this;
  }
  multiply(t) {
    return this.x *= t.x, this.y *= t.y, this.z *= t.z, this.w *= t.w, this;
  }
  multiplyScalar(t) {
    return this.x *= t, this.y *= t, this.z *= t, this.w *= t, this;
  }
  applyMatrix4(t) {
    const n = this.x, i = this.y, s = this.z, r = this.w, o = t.elements;
    return this.x = o[0] * n + o[4] * i + o[8] * s + o[12] * r, this.y = o[1] * n + o[5] * i + o[9] * s + o[13] * r, this.z = o[2] * n + o[6] * i + o[10] * s + o[14] * r, this.w = o[3] * n + o[7] * i + o[11] * s + o[15] * r, this;
  }
  divide(t) {
    return this.x /= t.x, this.y /= t.y, this.z /= t.z, this.w /= t.w, this;
  }
  divideScalar(t) {
    return this.multiplyScalar(1 / t);
  }
  setAxisAngleFromQuaternion(t) {
    this.w = 2 * Math.acos(t.w);
    const n = Math.sqrt(1 - t.w * t.w);
    return n < 1e-4 ? (this.x = 1, this.y = 0, this.z = 0) : (this.x = t.x / n, this.y = t.y / n, this.z = t.z / n), this;
  }
  setAxisAngleFromRotationMatrix(t) {
    let n, i, s, r;
    const l = t.elements, c = l[0], h = l[4], u = l[8], d = l[1], p = l[5], _ = l[9], g = l[2], m = l[6], f = l[10];
    if (Math.abs(h - d) < 0.01 && Math.abs(u - g) < 0.01 && Math.abs(_ - m) < 0.01) {
      if (Math.abs(h + d) < 0.1 && Math.abs(u + g) < 0.1 && Math.abs(_ + m) < 0.1 && Math.abs(c + p + f - 3) < 0.1)
        return this.set(1, 0, 0, 0), this;
      n = Math.PI;
      const v = (c + 1) / 2, S = (p + 1) / 2, A = (f + 1) / 2, b = (h + d) / 4, R = (u + g) / 4, I = (_ + m) / 4;
      return v > S && v > A ? v < 0.01 ? (i = 0, s = 0.707106781, r = 0.707106781) : (i = Math.sqrt(v), s = b / i, r = R / i) : S > A ? S < 0.01 ? (i = 0.707106781, s = 0, r = 0.707106781) : (s = Math.sqrt(S), i = b / s, r = I / s) : A < 0.01 ? (i = 0.707106781, s = 0.707106781, r = 0) : (r = Math.sqrt(A), i = R / r, s = I / r), this.set(i, s, r, n), this;
    }
    let y = Math.sqrt((m - _) * (m - _) + (u - g) * (u - g) + (d - h) * (d - h));
    return Math.abs(y) < 1e-3 && (y = 1), this.x = (m - _) / y, this.y = (u - g) / y, this.z = (d - h) / y, this.w = Math.acos((c + p + f - 1) / 2), this;
  }
  setFromMatrixPosition(t) {
    const n = t.elements;
    return this.x = n[12], this.y = n[13], this.z = n[14], this.w = n[15], this;
  }
  min(t) {
    return this.x = Math.min(this.x, t.x), this.y = Math.min(this.y, t.y), this.z = Math.min(this.z, t.z), this.w = Math.min(this.w, t.w), this;
  }
  max(t) {
    return this.x = Math.max(this.x, t.x), this.y = Math.max(this.y, t.y), this.z = Math.max(this.z, t.z), this.w = Math.max(this.w, t.w), this;
  }
  clamp(t, n) {
    return this.x = Ge(this.x, t.x, n.x), this.y = Ge(this.y, t.y, n.y), this.z = Ge(this.z, t.z, n.z), this.w = Ge(this.w, t.w, n.w), this;
  }
  clampScalar(t, n) {
    return this.x = Ge(this.x, t, n), this.y = Ge(this.y, t, n), this.z = Ge(this.z, t, n), this.w = Ge(this.w, t, n), this;
  }
  clampLength(t, n) {
    const i = this.length();
    return this.divideScalar(i || 1).multiplyScalar(Ge(i, t, n));
  }
  floor() {
    return this.x = Math.floor(this.x), this.y = Math.floor(this.y), this.z = Math.floor(this.z), this.w = Math.floor(this.w), this;
  }
  ceil() {
    return this.x = Math.ceil(this.x), this.y = Math.ceil(this.y), this.z = Math.ceil(this.z), this.w = Math.ceil(this.w), this;
  }
  round() {
    return this.x = Math.round(this.x), this.y = Math.round(this.y), this.z = Math.round(this.z), this.w = Math.round(this.w), this;
  }
  roundToZero() {
    return this.x = Math.trunc(this.x), this.y = Math.trunc(this.y), this.z = Math.trunc(this.z), this.w = Math.trunc(this.w), this;
  }
  negate() {
    return this.x = -this.x, this.y = -this.y, this.z = -this.z, this.w = -this.w, this;
  }
  dot(t) {
    return this.x * t.x + this.y * t.y + this.z * t.z + this.w * t.w;
  }
  lengthSq() {
    return this.x * this.x + this.y * this.y + this.z * this.z + this.w * this.w;
  }
  length() {
    return Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z + this.w * this.w);
  }
  manhattanLength() {
    return Math.abs(this.x) + Math.abs(this.y) + Math.abs(this.z) + Math.abs(this.w);
  }
  normalize() {
    return this.divideScalar(this.length() || 1);
  }
  setLength(t) {
    return this.normalize().multiplyScalar(t);
  }
  lerp(t, n) {
    return this.x += (t.x - this.x) * n, this.y += (t.y - this.y) * n, this.z += (t.z - this.z) * n, this.w += (t.w - this.w) * n, this;
  }
  lerpVectors(t, n, i) {
    return this.x = t.x + (n.x - t.x) * i, this.y = t.y + (n.y - t.y) * i, this.z = t.z + (n.z - t.z) * i, this.w = t.w + (n.w - t.w) * i, this;
  }
  equals(t) {
    return t.x === this.x && t.y === this.y && t.z === this.z && t.w === this.w;
  }
  fromArray(t, n = 0) {
    return this.x = t[n], this.y = t[n + 1], this.z = t[n + 2], this.w = t[n + 3], this;
  }
  toArray(t = [], n = 0) {
    return t[n] = this.x, t[n + 1] = this.y, t[n + 2] = this.z, t[n + 3] = this.w, t;
  }
  fromBufferAttribute(t, n) {
    return this.x = t.getX(n), this.y = t.getY(n), this.z = t.getZ(n), this.w = t.getW(n), this;
  }
  random() {
    return this.x = Math.random(), this.y = Math.random(), this.z = Math.random(), this.w = Math.random(), this;
  }
  *[Symbol.iterator]() {
    yield this.x, yield this.y, yield this.z, yield this.w;
  }
}, Nh = class extends Gn {
  constructor(e = 1, t = 1, n = {}) {
    super(), n = Object.assign({
      generateMipmaps: !1,
      internalFormat: null,
      minFilter: gn,
      depthBuffer: !0,
      stencilBuffer: !1,
      resolveDepthBuffer: !0,
      resolveStencilBuffer: !0,
      depthTexture: null,
      samples: 0,
      count: 1,
      depth: 1,
      multiview: !1
    }, n), this.isRenderTarget = !0, this.width = e, this.height = t, this.depth = n.depth, this.scissor = new tt(0, 0, e, t), this.scissorTest = !1, this.viewport = new tt(0, 0, e, t);
    const i = new Pt({
      width: e,
      height: t,
      depth: n.depth
    });
    this.textures = [];
    const s = n.count;
    for (let r = 0; r < s; r++)
      this.textures[r] = i.clone(), this.textures[r].isRenderTargetTexture = !0, this.textures[r].renderTarget = this;
    this._setTextureOptions(n), this.depthBuffer = n.depthBuffer, this.stencilBuffer = n.stencilBuffer, this.resolveDepthBuffer = n.resolveDepthBuffer, this.resolveStencilBuffer = n.resolveStencilBuffer, this._depthTexture = null, this.depthTexture = n.depthTexture, this.samples = n.samples, this.multiview = n.multiview;
  }
  _setTextureOptions(e = {}) {
    const t = {
      minFilter: gn,
      generateMipmaps: !1,
      flipY: !1,
      internalFormat: null
    };
    e.mapping !== void 0 && (t.mapping = e.mapping), e.wrapS !== void 0 && (t.wrapS = e.wrapS), e.wrapT !== void 0 && (t.wrapT = e.wrapT), e.wrapR !== void 0 && (t.wrapR = e.wrapR), e.magFilter !== void 0 && (t.magFilter = e.magFilter), e.minFilter !== void 0 && (t.minFilter = e.minFilter), e.format !== void 0 && (t.format = e.format), e.type !== void 0 && (t.type = e.type), e.anisotropy !== void 0 && (t.anisotropy = e.anisotropy), e.colorSpace !== void 0 && (t.colorSpace = e.colorSpace), e.flipY !== void 0 && (t.flipY = e.flipY), e.generateMipmaps !== void 0 && (t.generateMipmaps = e.generateMipmaps), e.internalFormat !== void 0 && (t.internalFormat = e.internalFormat);
    for (let n = 0; n < this.textures.length; n++) this.textures[n].setValues(t);
  }
  get texture() {
    return this.textures[0];
  }
  set texture(e) {
    this.textures[0] = e;
  }
  set depthTexture(e) {
    this._depthTexture !== null && (this._depthTexture.renderTarget = null), e !== null && (e.renderTarget = this), this._depthTexture = e;
  }
  get depthTexture() {
    return this._depthTexture;
  }
  setSize(e, t, n = 1) {
    if (this.width !== e || this.height !== t || this.depth !== n) {
      this.width = e, this.height = t, this.depth = n;
      for (let i = 0, s = this.textures.length; i < s; i++)
        this.textures[i].image.width = e, this.textures[i].image.height = t, this.textures[i].image.depth = n, this.textures[i].isArrayTexture = this.textures[i].image.depth > 1;
      this.dispose();
    }
    this.viewport.set(0, 0, e, t), this.scissor.set(0, 0, e, t);
  }
  clone() {
    return new this.constructor().copy(this);
  }
  copy(e) {
    this.width = e.width, this.height = e.height, this.depth = e.depth, this.scissor.copy(e.scissor), this.scissorTest = e.scissorTest, this.viewport.copy(e.viewport), this.textures.length = 0;
    for (let t = 0, n = e.textures.length; t < n; t++) {
      this.textures[t] = e.textures[t].clone(), this.textures[t].isRenderTargetTexture = !0, this.textures[t].renderTarget = this;
      const i = Object.assign({}, e.textures[t].image);
      this.textures[t].source = new ro(i);
    }
    return this.depthBuffer = e.depthBuffer, this.stencilBuffer = e.stencilBuffer, this.resolveDepthBuffer = e.resolveDepthBuffer, this.resolveStencilBuffer = e.resolveStencilBuffer, e.depthTexture !== null && (this.depthTexture = e.depthTexture.clone()), this.samples = e.samples, this;
  }
  dispose() {
    this.dispatchEvent({ type: "dispose" });
  }
}, Hn = class extends Nh {
  constructor(e = 1, t = 1, n = {}) {
    super(e, t, n), this.isWebGLRenderTarget = !0;
  }
}, al = class extends Pt {
  constructor(e = null, t = 1, n = 1, i = 1) {
    super(null), this.isDataArrayTexture = !0, this.image = {
      data: e,
      width: t,
      height: n,
      depth: i
    }, this.magFilter = Vt, this.minFilter = Vt, this.wrapR = bn, this.generateMipmaps = !1, this.flipY = !1, this.unpackAlignment = 1, this.layerUpdates = /* @__PURE__ */ new Set();
  }
  addLayerUpdate(e) {
    this.layerUpdates.add(e);
  }
  clearLayerUpdates() {
    this.layerUpdates.clear();
  }
}, Uh = class extends Pt {
  constructor(e = null, t = 1, n = 1, i = 1) {
    super(null), this.isData3DTexture = !0, this.image = {
      data: e,
      width: t,
      height: n,
      depth: i
    }, this.magFilter = Vt, this.minFilter = Vt, this.wrapR = bn, this.generateMipmaps = !1, this.flipY = !1, this.unpackAlignment = 1;
  }
}, Gt = class {
  constructor(e = new C(1 / 0, 1 / 0, 1 / 0), t = new C(-1 / 0, -1 / 0, -1 / 0)) {
    this.isBox3 = !0, this.min = e, this.max = t;
  }
  set(e, t) {
    return this.min.copy(e), this.max.copy(t), this;
  }
  setFromArray(e) {
    this.makeEmpty();
    for (let t = 0, n = e.length; t < n; t += 3) this.expandByPoint(Yt.fromArray(e, t));
    return this;
  }
  setFromBufferAttribute(e) {
    this.makeEmpty();
    for (let t = 0, n = e.count; t < n; t++) this.expandByPoint(Yt.fromBufferAttribute(e, t));
    return this;
  }
  setFromPoints(e) {
    this.makeEmpty();
    for (let t = 0, n = e.length; t < n; t++) this.expandByPoint(e[t]);
    return this;
  }
  setFromCenterAndSize(e, t) {
    const n = Yt.copy(t).multiplyScalar(0.5);
    return this.min.copy(e).sub(n), this.max.copy(e).add(n), this;
  }
  setFromObject(e, t = !1) {
    return this.makeEmpty(), this.expandByObject(e, t);
  }
  clone() {
    return new this.constructor().copy(this);
  }
  copy(e) {
    return this.min.copy(e.min), this.max.copy(e.max), this;
  }
  makeEmpty() {
    return this.min.x = this.min.y = this.min.z = 1 / 0, this.max.x = this.max.y = this.max.z = -1 / 0, this;
  }
  isEmpty() {
    return this.max.x < this.min.x || this.max.y < this.min.y || this.max.z < this.min.z;
  }
  getCenter(e) {
    return this.isEmpty() ? e.set(0, 0, 0) : e.addVectors(this.min, this.max).multiplyScalar(0.5);
  }
  getSize(e) {
    return this.isEmpty() ? e.set(0, 0, 0) : e.subVectors(this.max, this.min);
  }
  expandByPoint(e) {
    return this.min.min(e), this.max.max(e), this;
  }
  expandByVector(e) {
    return this.min.sub(e), this.max.add(e), this;
  }
  expandByScalar(e) {
    return this.min.addScalar(-e), this.max.addScalar(e), this;
  }
  expandByObject(e, t = !1) {
    e.updateWorldMatrix(!1, !1);
    const n = e.geometry;
    if (n !== void 0) {
      const s = n.getAttribute("position");
      if (t === !0 && s !== void 0 && e.isInstancedMesh !== !0) for (let r = 0, o = s.count; r < o; r++)
        e.isMesh === !0 ? e.getVertexPosition(r, Yt) : Yt.fromBufferAttribute(s, r), Yt.applyMatrix4(e.matrixWorld), this.expandByPoint(Yt);
      else
        e.boundingBox !== void 0 ? (e.boundingBox === null && e.computeBoundingBox(), as.copy(e.boundingBox)) : (n.boundingBox === null && n.computeBoundingBox(), as.copy(n.boundingBox)), as.applyMatrix4(e.matrixWorld), this.union(as);
    }
    const i = e.children;
    for (let s = 0, r = i.length; s < r; s++) this.expandByObject(i[s], t);
    return this;
  }
  containsPoint(e) {
    return e.x >= this.min.x && e.x <= this.max.x && e.y >= this.min.y && e.y <= this.max.y && e.z >= this.min.z && e.z <= this.max.z;
  }
  containsBox(e) {
    return this.min.x <= e.min.x && e.max.x <= this.max.x && this.min.y <= e.min.y && e.max.y <= this.max.y && this.min.z <= e.min.z && e.max.z <= this.max.z;
  }
  getParameter(e, t) {
    return t.set((e.x - this.min.x) / (this.max.x - this.min.x), (e.y - this.min.y) / (this.max.y - this.min.y), (e.z - this.min.z) / (this.max.z - this.min.z));
  }
  intersectsBox(e) {
    return e.max.x >= this.min.x && e.min.x <= this.max.x && e.max.y >= this.min.y && e.min.y <= this.max.y && e.max.z >= this.min.z && e.min.z <= this.max.z;
  }
  intersectsSphere(e) {
    return this.clampPoint(e.center, Yt), Yt.distanceToSquared(e.center) <= e.radius * e.radius;
  }
  intersectsPlane(e) {
    let t, n;
    return e.normal.x > 0 ? (t = e.normal.x * this.min.x, n = e.normal.x * this.max.x) : (t = e.normal.x * this.max.x, n = e.normal.x * this.min.x), e.normal.y > 0 ? (t += e.normal.y * this.min.y, n += e.normal.y * this.max.y) : (t += e.normal.y * this.max.y, n += e.normal.y * this.min.y), e.normal.z > 0 ? (t += e.normal.z * this.min.z, n += e.normal.z * this.max.z) : (t += e.normal.z * this.max.z, n += e.normal.z * this.min.z), t <= -e.constant && n >= -e.constant;
  }
  intersectsTriangle(e) {
    if (this.isEmpty()) return !1;
    this.getCenter(Ai), ls.subVectors(this.max, Ai), Yn.subVectors(e.a, Ai), qn.subVectors(e.b, Ai), Kn.subVectors(e.c, Ai), _n.subVectors(qn, Yn), vn.subVectors(Kn, qn), Pn.subVectors(Yn, Kn);
    let t = [
      0,
      -_n.z,
      _n.y,
      0,
      -vn.z,
      vn.y,
      0,
      -Pn.z,
      Pn.y,
      _n.z,
      0,
      -_n.x,
      vn.z,
      0,
      -vn.x,
      Pn.z,
      0,
      -Pn.x,
      -_n.y,
      _n.x,
      0,
      -vn.y,
      vn.x,
      0,
      -Pn.y,
      Pn.x,
      0
    ];
    return !ar(t, Yn, qn, Kn, ls) || (t = [
      1,
      0,
      0,
      0,
      1,
      0,
      0,
      0,
      1
    ], !ar(t, Yn, qn, Kn, ls)) ? !1 : (cs.crossVectors(_n, vn), t = [
      cs.x,
      cs.y,
      cs.z
    ], ar(t, Yn, qn, Kn, ls));
  }
  clampPoint(e, t) {
    return t.copy(e).clamp(this.min, this.max);
  }
  distanceToPoint(e) {
    return this.clampPoint(e, Yt).distanceTo(e);
  }
  getBoundingSphere(e) {
    return this.isEmpty() ? e.makeEmpty() : (this.getCenter(e.center), e.radius = this.getSize(Yt).length() * 0.5), e;
  }
  intersect(e) {
    return this.min.max(e.min), this.max.min(e.max), this.isEmpty() && this.makeEmpty(), this;
  }
  union(e) {
    return this.min.min(e.min), this.max.max(e.max), this;
  }
  applyMatrix4(e) {
    return this.isEmpty() ? this : (an[0].set(this.min.x, this.min.y, this.min.z).applyMatrix4(e), an[1].set(this.min.x, this.min.y, this.max.z).applyMatrix4(e), an[2].set(this.min.x, this.max.y, this.min.z).applyMatrix4(e), an[3].set(this.min.x, this.max.y, this.max.z).applyMatrix4(e), an[4].set(this.max.x, this.min.y, this.min.z).applyMatrix4(e), an[5].set(this.max.x, this.min.y, this.max.z).applyMatrix4(e), an[6].set(this.max.x, this.max.y, this.min.z).applyMatrix4(e), an[7].set(this.max.x, this.max.y, this.max.z).applyMatrix4(e), this.setFromPoints(an), this);
  }
  translate(e) {
    return this.min.add(e), this.max.add(e), this;
  }
  equals(e) {
    return e.min.equals(this.min) && e.max.equals(this.max);
  }
  toJSON() {
    return {
      min: this.min.toArray(),
      max: this.max.toArray()
    };
  }
  fromJSON(e) {
    return this.min.fromArray(e.min), this.max.fromArray(e.max), this;
  }
}, an = [
  /* @__PURE__ */ new C(),
  /* @__PURE__ */ new C(),
  /* @__PURE__ */ new C(),
  /* @__PURE__ */ new C(),
  /* @__PURE__ */ new C(),
  /* @__PURE__ */ new C(),
  /* @__PURE__ */ new C(),
  /* @__PURE__ */ new C()
], Yt = /* @__PURE__ */ new C(), as = /* @__PURE__ */ new Gt(), Yn = /* @__PURE__ */ new C(), qn = /* @__PURE__ */ new C(), Kn = /* @__PURE__ */ new C(), _n = /* @__PURE__ */ new C(), vn = /* @__PURE__ */ new C(), Pn = /* @__PURE__ */ new C(), Ai = /* @__PURE__ */ new C(), ls = /* @__PURE__ */ new C(), cs = /* @__PURE__ */ new C(), Ln = /* @__PURE__ */ new C();
function ar(e, t, n, i, s) {
  for (let r = 0, o = e.length - 3; r <= o; r += 3) {
    Ln.fromArray(e, r);
    const a = s.x * Math.abs(Ln.x) + s.y * Math.abs(Ln.y) + s.z * Math.abs(Ln.z), l = t.dot(Ln), c = n.dot(Ln), h = i.dot(Ln);
    if (Math.max(-Math.max(l, c, h), Math.min(l, c, h)) > a) return !1;
  }
  return !0;
}
var Oh = /* @__PURE__ */ new Gt(), wi = /* @__PURE__ */ new C(), lr = /* @__PURE__ */ new C(), sn = class {
  constructor(e = new C(), t = -1) {
    this.isSphere = !0, this.center = e, this.radius = t;
  }
  set(e, t) {
    return this.center.copy(e), this.radius = t, this;
  }
  setFromPoints(e, t) {
    const n = this.center;
    t !== void 0 ? n.copy(t) : Oh.setFromPoints(e).getCenter(n);
    let i = 0;
    for (let s = 0, r = e.length; s < r; s++) i = Math.max(i, n.distanceToSquared(e[s]));
    return this.radius = Math.sqrt(i), this;
  }
  copy(e) {
    return this.center.copy(e.center), this.radius = e.radius, this;
  }
  isEmpty() {
    return this.radius < 0;
  }
  makeEmpty() {
    return this.center.set(0, 0, 0), this.radius = -1, this;
  }
  containsPoint(e) {
    return e.distanceToSquared(this.center) <= this.radius * this.radius;
  }
  distanceToPoint(e) {
    return e.distanceTo(this.center) - this.radius;
  }
  intersectsSphere(e) {
    const t = this.radius + e.radius;
    return e.center.distanceToSquared(this.center) <= t * t;
  }
  intersectsBox(e) {
    return e.intersectsSphere(this);
  }
  intersectsPlane(e) {
    return Math.abs(e.distanceToPoint(this.center)) <= this.radius;
  }
  clampPoint(e, t) {
    const n = this.center.distanceToSquared(e);
    return t.copy(e), n > this.radius * this.radius && (t.sub(this.center).normalize(), t.multiplyScalar(this.radius).add(this.center)), t;
  }
  getBoundingBox(e) {
    return this.isEmpty() ? (e.makeEmpty(), e) : (e.set(this.center, this.center), e.expandByScalar(this.radius), e);
  }
  applyMatrix4(e) {
    return this.center.applyMatrix4(e), this.radius = this.radius * e.getMaxScaleOnAxis(), this;
  }
  translate(e) {
    return this.center.add(e), this;
  }
  expandByPoint(e) {
    if (this.isEmpty())
      return this.center.copy(e), this.radius = 0, this;
    wi.subVectors(e, this.center);
    const t = wi.lengthSq();
    if (t > this.radius * this.radius) {
      const n = Math.sqrt(t), i = (n - this.radius) * 0.5;
      this.center.addScaledVector(wi, i / n), this.radius += i;
    }
    return this;
  }
  union(e) {
    return e.isEmpty() ? this : this.isEmpty() ? (this.copy(e), this) : (this.center.equals(e.center) === !0 ? this.radius = Math.max(this.radius, e.radius) : (lr.subVectors(e.center, this.center).setLength(e.radius), this.expandByPoint(wi.copy(e.center).add(lr)), this.expandByPoint(wi.copy(e.center).sub(lr))), this);
  }
  equals(e) {
    return e.center.equals(this.center) && e.radius === this.radius;
  }
  clone() {
    return new this.constructor().copy(this);
  }
  toJSON() {
    return {
      radius: this.radius,
      center: this.center.toArray()
    };
  }
  fromJSON(e) {
    return this.radius = e.radius, this.center.fromArray(e.center), this;
  }
}, ln = /* @__PURE__ */ new C(), cr = /* @__PURE__ */ new C(), hs = /* @__PURE__ */ new C(), xn = /* @__PURE__ */ new C(), hr = /* @__PURE__ */ new C(), us = /* @__PURE__ */ new C(), ur = /* @__PURE__ */ new C(), ns = class {
  constructor(e = new C(), t = new C(0, 0, -1)) {
    this.origin = e, this.direction = t;
  }
  set(e, t) {
    return this.origin.copy(e), this.direction.copy(t), this;
  }
  copy(e) {
    return this.origin.copy(e.origin), this.direction.copy(e.direction), this;
  }
  at(e, t) {
    return t.copy(this.origin).addScaledVector(this.direction, e);
  }
  lookAt(e) {
    return this.direction.copy(e).sub(this.origin).normalize(), this;
  }
  recast(e) {
    return this.origin.copy(this.at(e, ln)), this;
  }
  closestPointToPoint(e, t) {
    t.subVectors(e, this.origin);
    const n = t.dot(this.direction);
    return n < 0 ? t.copy(this.origin) : t.copy(this.origin).addScaledVector(this.direction, n);
  }
  distanceToPoint(e) {
    return Math.sqrt(this.distanceSqToPoint(e));
  }
  distanceSqToPoint(e) {
    const t = ln.subVectors(e, this.origin).dot(this.direction);
    return t < 0 ? this.origin.distanceToSquared(e) : (ln.copy(this.origin).addScaledVector(this.direction, t), ln.distanceToSquared(e));
  }
  distanceSqToSegment(e, t, n, i) {
    cr.copy(e).add(t).multiplyScalar(0.5), hs.copy(t).sub(e).normalize(), xn.copy(this.origin).sub(cr);
    const s = e.distanceTo(t) * 0.5, r = -this.direction.dot(hs), o = xn.dot(this.direction), a = -xn.dot(hs), l = xn.lengthSq(), c = Math.abs(1 - r * r);
    let h, u, d, p;
    if (c > 0)
      if (h = r * a - o, u = r * o - a, p = s * c, h >= 0) if (u >= -p) if (u <= p) {
        const _ = 1 / c;
        h *= _, u *= _, d = h * (h + r * u + 2 * o) + u * (r * h + u + 2 * a) + l;
      } else
        u = s, h = Math.max(0, -(r * u + o)), d = -h * h + u * (u + 2 * a) + l;
      else
        u = -s, h = Math.max(0, -(r * u + o)), d = -h * h + u * (u + 2 * a) + l;
      else u <= -p ? (h = Math.max(0, -(-r * s + o)), u = h > 0 ? -s : Math.min(Math.max(-s, -a), s), d = -h * h + u * (u + 2 * a) + l) : u <= p ? (h = 0, u = Math.min(Math.max(-s, -a), s), d = u * (u + 2 * a) + l) : (h = Math.max(0, -(r * s + o)), u = h > 0 ? s : Math.min(Math.max(-s, -a), s), d = -h * h + u * (u + 2 * a) + l);
    else
      u = r > 0 ? -s : s, h = Math.max(0, -(r * u + o)), d = -h * h + u * (u + 2 * a) + l;
    return n && n.copy(this.origin).addScaledVector(this.direction, h), i && i.copy(cr).addScaledVector(hs, u), d;
  }
  intersectSphere(e, t) {
    ln.subVectors(e.center, this.origin);
    const n = ln.dot(this.direction), i = ln.dot(ln) - n * n, s = e.radius * e.radius;
    if (i > s) return null;
    const r = Math.sqrt(s - i), o = n - r, a = n + r;
    return a < 0 ? null : o < 0 ? this.at(a, t) : this.at(o, t);
  }
  intersectsSphere(e) {
    return e.radius < 0 ? !1 : this.distanceSqToPoint(e.center) <= e.radius * e.radius;
  }
  distanceToPlane(e) {
    const t = e.normal.dot(this.direction);
    if (t === 0)
      return e.distanceToPoint(this.origin) === 0 ? 0 : null;
    const n = -(this.origin.dot(e.normal) + e.constant) / t;
    return n >= 0 ? n : null;
  }
  intersectPlane(e, t) {
    const n = this.distanceToPlane(e);
    return n === null ? null : this.at(n, t);
  }
  intersectsPlane(e) {
    const t = e.distanceToPoint(this.origin);
    return t === 0 || e.normal.dot(this.direction) * t < 0;
  }
  intersectBox(e, t) {
    let n, i, s, r, o, a;
    const l = 1 / this.direction.x, c = 1 / this.direction.y, h = 1 / this.direction.z, u = this.origin;
    return l >= 0 ? (n = (e.min.x - u.x) * l, i = (e.max.x - u.x) * l) : (n = (e.max.x - u.x) * l, i = (e.min.x - u.x) * l), c >= 0 ? (s = (e.min.y - u.y) * c, r = (e.max.y - u.y) * c) : (s = (e.max.y - u.y) * c, r = (e.min.y - u.y) * c), n > r || s > i || ((s > n || isNaN(n)) && (n = s), (r < i || isNaN(i)) && (i = r), h >= 0 ? (o = (e.min.z - u.z) * h, a = (e.max.z - u.z) * h) : (o = (e.max.z - u.z) * h, a = (e.min.z - u.z) * h), n > a || o > i) || ((o > n || n !== n) && (n = o), (a < i || i !== i) && (i = a), i < 0) ? null : this.at(n >= 0 ? n : i, t);
  }
  intersectsBox(e) {
    return this.intersectBox(e, ln) !== null;
  }
  intersectTriangle(e, t, n, i, s) {
    hr.subVectors(t, e), us.subVectors(n, e), ur.crossVectors(hr, us);
    let r = this.direction.dot(ur), o;
    if (r > 0) {
      if (i) return null;
      o = 1;
    } else if (r < 0)
      o = -1, r = -r;
    else return null;
    xn.subVectors(this.origin, e);
    const a = o * this.direction.dot(us.crossVectors(xn, us));
    if (a < 0) return null;
    const l = o * this.direction.dot(hr.cross(xn));
    if (l < 0 || a + l > r) return null;
    const c = -o * xn.dot(ur);
    return c < 0 ? null : this.at(c / r, s);
  }
  applyMatrix4(e) {
    return this.origin.applyMatrix4(e), this.direction.transformDirection(e), this;
  }
  equals(e) {
    return e.origin.equals(this.origin) && e.direction.equals(this.direction);
  }
  clone() {
    return new this.constructor().copy(this);
  }
}, Ve = class Xr {
  constructor(t, n, i, s, r, o, a, l, c, h, u, d, p, _, g, m) {
    Xr.prototype.isMatrix4 = !0, this.elements = [
      1,
      0,
      0,
      0,
      0,
      1,
      0,
      0,
      0,
      0,
      1,
      0,
      0,
      0,
      0,
      1
    ], t !== void 0 && this.set(t, n, i, s, r, o, a, l, c, h, u, d, p, _, g, m);
  }
  set(t, n, i, s, r, o, a, l, c, h, u, d, p, _, g, m) {
    const f = this.elements;
    return f[0] = t, f[4] = n, f[8] = i, f[12] = s, f[1] = r, f[5] = o, f[9] = a, f[13] = l, f[2] = c, f[6] = h, f[10] = u, f[14] = d, f[3] = p, f[7] = _, f[11] = g, f[15] = m, this;
  }
  identity() {
    return this.set(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1), this;
  }
  clone() {
    return new Xr().fromArray(this.elements);
  }
  copy(t) {
    const n = this.elements, i = t.elements;
    return n[0] = i[0], n[1] = i[1], n[2] = i[2], n[3] = i[3], n[4] = i[4], n[5] = i[5], n[6] = i[6], n[7] = i[7], n[8] = i[8], n[9] = i[9], n[10] = i[10], n[11] = i[11], n[12] = i[12], n[13] = i[13], n[14] = i[14], n[15] = i[15], this;
  }
  copyPosition(t) {
    const n = this.elements, i = t.elements;
    return n[12] = i[12], n[13] = i[13], n[14] = i[14], this;
  }
  setFromMatrix3(t) {
    const n = t.elements;
    return this.set(n[0], n[3], n[6], 0, n[1], n[4], n[7], 0, n[2], n[5], n[8], 0, 0, 0, 0, 1), this;
  }
  extractBasis(t, n, i) {
    return t.setFromMatrixColumn(this, 0), n.setFromMatrixColumn(this, 1), i.setFromMatrixColumn(this, 2), this;
  }
  makeBasis(t, n, i) {
    return this.set(t.x, n.x, i.x, 0, t.y, n.y, i.y, 0, t.z, n.z, i.z, 0, 0, 0, 0, 1), this;
  }
  extractRotation(t) {
    const n = this.elements, i = t.elements, s = 1 / jn.setFromMatrixColumn(t, 0).length(), r = 1 / jn.setFromMatrixColumn(t, 1).length(), o = 1 / jn.setFromMatrixColumn(t, 2).length();
    return n[0] = i[0] * s, n[1] = i[1] * s, n[2] = i[2] * s, n[3] = 0, n[4] = i[4] * r, n[5] = i[5] * r, n[6] = i[6] * r, n[7] = 0, n[8] = i[8] * o, n[9] = i[9] * o, n[10] = i[10] * o, n[11] = 0, n[12] = 0, n[13] = 0, n[14] = 0, n[15] = 1, this;
  }
  makeRotationFromEuler(t) {
    const n = this.elements, i = t.x, s = t.y, r = t.z, o = Math.cos(i), a = Math.sin(i), l = Math.cos(s), c = Math.sin(s), h = Math.cos(r), u = Math.sin(r);
    if (t.order === "XYZ") {
      const d = o * h, p = o * u, _ = a * h, g = a * u;
      n[0] = l * h, n[4] = -l * u, n[8] = c, n[1] = p + _ * c, n[5] = d - g * c, n[9] = -a * l, n[2] = g - d * c, n[6] = _ + p * c, n[10] = o * l;
    } else if (t.order === "YXZ") {
      const d = l * h, p = l * u, _ = c * h, g = c * u;
      n[0] = d + g * a, n[4] = _ * a - p, n[8] = o * c, n[1] = o * u, n[5] = o * h, n[9] = -a, n[2] = p * a - _, n[6] = g + d * a, n[10] = o * l;
    } else if (t.order === "ZXY") {
      const d = l * h, p = l * u, _ = c * h, g = c * u;
      n[0] = d - g * a, n[4] = -o * u, n[8] = _ + p * a, n[1] = p + _ * a, n[5] = o * h, n[9] = g - d * a, n[2] = -o * c, n[6] = a, n[10] = o * l;
    } else if (t.order === "ZYX") {
      const d = o * h, p = o * u, _ = a * h, g = a * u;
      n[0] = l * h, n[4] = _ * c - p, n[8] = d * c + g, n[1] = l * u, n[5] = g * c + d, n[9] = p * c - _, n[2] = -c, n[6] = a * l, n[10] = o * l;
    } else if (t.order === "YZX") {
      const d = o * l, p = o * c, _ = a * l, g = a * c;
      n[0] = l * h, n[4] = g - d * u, n[8] = _ * u + p, n[1] = u, n[5] = o * h, n[9] = -a * h, n[2] = -c * h, n[6] = p * u + _, n[10] = d - g * u;
    } else if (t.order === "XZY") {
      const d = o * l, p = o * c, _ = a * l, g = a * c;
      n[0] = l * h, n[4] = -u, n[8] = c * h, n[1] = d * u + g, n[5] = o * h, n[9] = p * u - _, n[2] = _ * u - p, n[6] = a * h, n[10] = g * u + d;
    }
    return n[3] = 0, n[7] = 0, n[11] = 0, n[12] = 0, n[13] = 0, n[14] = 0, n[15] = 1, this;
  }
  makeRotationFromQuaternion(t) {
    return this.compose(Fh, t, Bh);
  }
  lookAt(t, n, i) {
    const s = this.elements;
    return Dt.subVectors(t, n), Dt.lengthSq() === 0 && (Dt.z = 1), Dt.normalize(), yn.crossVectors(i, Dt), yn.lengthSq() === 0 && (Math.abs(i.z) === 1 ? Dt.x += 1e-4 : Dt.z += 1e-4, Dt.normalize(), yn.crossVectors(i, Dt)), yn.normalize(), ds.crossVectors(Dt, yn), s[0] = yn.x, s[4] = ds.x, s[8] = Dt.x, s[1] = yn.y, s[5] = ds.y, s[9] = Dt.y, s[2] = yn.z, s[6] = ds.z, s[10] = Dt.z, this;
  }
  multiply(t) {
    return this.multiplyMatrices(this, t);
  }
  premultiply(t) {
    return this.multiplyMatrices(t, this);
  }
  multiplyMatrices(t, n) {
    const i = t.elements, s = n.elements, r = this.elements, o = i[0], a = i[4], l = i[8], c = i[12], h = i[1], u = i[5], d = i[9], p = i[13], _ = i[2], g = i[6], m = i[10], f = i[14], y = i[3], v = i[7], S = i[11], A = i[15], b = s[0], R = s[4], I = s[8], M = s[12], E = s[1], P = s[5], F = s[9], H = s[13], B = s[2], j = s[6], V = s[10], te = s[14], W = s[3], ee = s[7], pe = s[11], De = s[15];
    return r[0] = o * b + a * E + l * B + c * W, r[4] = o * R + a * P + l * j + c * ee, r[8] = o * I + a * F + l * V + c * pe, r[12] = o * M + a * H + l * te + c * De, r[1] = h * b + u * E + d * B + p * W, r[5] = h * R + u * P + d * j + p * ee, r[9] = h * I + u * F + d * V + p * pe, r[13] = h * M + u * H + d * te + p * De, r[2] = _ * b + g * E + m * B + f * W, r[6] = _ * R + g * P + m * j + f * ee, r[10] = _ * I + g * F + m * V + f * pe, r[14] = _ * M + g * H + m * te + f * De, r[3] = y * b + v * E + S * B + A * W, r[7] = y * R + v * P + S * j + A * ee, r[11] = y * I + v * F + S * V + A * pe, r[15] = y * M + v * H + S * te + A * De, this;
  }
  multiplyScalar(t) {
    const n = this.elements;
    return n[0] *= t, n[4] *= t, n[8] *= t, n[12] *= t, n[1] *= t, n[5] *= t, n[9] *= t, n[13] *= t, n[2] *= t, n[6] *= t, n[10] *= t, n[14] *= t, n[3] *= t, n[7] *= t, n[11] *= t, n[15] *= t, this;
  }
  determinant() {
    const t = this.elements, n = t[0], i = t[4], s = t[8], r = t[12], o = t[1], a = t[5], l = t[9], c = t[13], h = t[2], u = t[6], d = t[10], p = t[14], _ = t[3], g = t[7], m = t[11], f = t[15];
    return _ * (+r * l * u - s * c * u - r * a * d + i * c * d + s * a * p - i * l * p) + g * (+n * l * p - n * c * d + r * o * d - s * o * p + s * c * h - r * l * h) + m * (+n * c * u - n * a * p - r * o * u + i * o * p + r * a * h - i * c * h) + f * (-s * a * h - n * l * u + n * a * d + s * o * u - i * o * d + i * l * h);
  }
  transpose() {
    const t = this.elements;
    let n;
    return n = t[1], t[1] = t[4], t[4] = n, n = t[2], t[2] = t[8], t[8] = n, n = t[6], t[6] = t[9], t[9] = n, n = t[3], t[3] = t[12], t[12] = n, n = t[7], t[7] = t[13], t[13] = n, n = t[11], t[11] = t[14], t[14] = n, this;
  }
  setPosition(t, n, i) {
    const s = this.elements;
    return t.isVector3 ? (s[12] = t.x, s[13] = t.y, s[14] = t.z) : (s[12] = t, s[13] = n, s[14] = i), this;
  }
  invert() {
    const t = this.elements, n = t[0], i = t[1], s = t[2], r = t[3], o = t[4], a = t[5], l = t[6], c = t[7], h = t[8], u = t[9], d = t[10], p = t[11], _ = t[12], g = t[13], m = t[14], f = t[15], y = u * m * c - g * d * c + g * l * p - a * m * p - u * l * f + a * d * f, v = _ * d * c - h * m * c - _ * l * p + o * m * p + h * l * f - o * d * f, S = h * g * c - _ * u * c + _ * a * p - o * g * p - h * a * f + o * u * f, A = _ * u * l - h * g * l - _ * a * d + o * g * d + h * a * m - o * u * m, b = n * y + i * v + s * S + r * A;
    if (b === 0) return this.set(0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);
    const R = 1 / b;
    return t[0] = y * R, t[1] = (g * d * r - u * m * r - g * s * p + i * m * p + u * s * f - i * d * f) * R, t[2] = (a * m * r - g * l * r + g * s * c - i * m * c - a * s * f + i * l * f) * R, t[3] = (u * l * r - a * d * r - u * s * c + i * d * c + a * s * p - i * l * p) * R, t[4] = v * R, t[5] = (h * m * r - _ * d * r + _ * s * p - n * m * p - h * s * f + n * d * f) * R, t[6] = (_ * l * r - o * m * r - _ * s * c + n * m * c + o * s * f - n * l * f) * R, t[7] = (o * d * r - h * l * r + h * s * c - n * d * c - o * s * p + n * l * p) * R, t[8] = S * R, t[9] = (_ * u * r - h * g * r - _ * i * p + n * g * p + h * i * f - n * u * f) * R, t[10] = (o * g * r - _ * a * r + _ * i * c - n * g * c - o * i * f + n * a * f) * R, t[11] = (h * a * r - o * u * r - h * i * c + n * u * c + o * i * p - n * a * p) * R, t[12] = A * R, t[13] = (h * g * s - _ * u * s + _ * i * d - n * g * d - h * i * m + n * u * m) * R, t[14] = (_ * a * s - o * g * s - _ * i * l + n * g * l + o * i * m - n * a * m) * R, t[15] = (o * u * s - h * a * s + h * i * l - n * u * l - o * i * d + n * a * d) * R, this;
  }
  scale(t) {
    const n = this.elements, i = t.x, s = t.y, r = t.z;
    return n[0] *= i, n[4] *= s, n[8] *= r, n[1] *= i, n[5] *= s, n[9] *= r, n[2] *= i, n[6] *= s, n[10] *= r, n[3] *= i, n[7] *= s, n[11] *= r, this;
  }
  getMaxScaleOnAxis() {
    const t = this.elements, n = t[0] * t[0] + t[1] * t[1] + t[2] * t[2], i = t[4] * t[4] + t[5] * t[5] + t[6] * t[6], s = t[8] * t[8] + t[9] * t[9] + t[10] * t[10];
    return Math.sqrt(Math.max(n, i, s));
  }
  makeTranslation(t, n, i) {
    return t.isVector3 ? this.set(1, 0, 0, t.x, 0, 1, 0, t.y, 0, 0, 1, t.z, 0, 0, 0, 1) : this.set(1, 0, 0, t, 0, 1, 0, n, 0, 0, 1, i, 0, 0, 0, 1), this;
  }
  makeRotationX(t) {
    const n = Math.cos(t), i = Math.sin(t);
    return this.set(1, 0, 0, 0, 0, n, -i, 0, 0, i, n, 0, 0, 0, 0, 1), this;
  }
  makeRotationY(t) {
    const n = Math.cos(t), i = Math.sin(t);
    return this.set(n, 0, i, 0, 0, 1, 0, 0, -i, 0, n, 0, 0, 0, 0, 1), this;
  }
  makeRotationZ(t) {
    const n = Math.cos(t), i = Math.sin(t);
    return this.set(n, -i, 0, 0, i, n, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1), this;
  }
  makeRotationAxis(t, n) {
    const i = Math.cos(n), s = Math.sin(n), r = 1 - i, o = t.x, a = t.y, l = t.z, c = r * o, h = r * a;
    return this.set(c * o + i, c * a - s * l, c * l + s * a, 0, c * a + s * l, h * a + i, h * l - s * o, 0, c * l - s * a, h * l + s * o, r * l * l + i, 0, 0, 0, 0, 1), this;
  }
  makeScale(t, n, i) {
    return this.set(t, 0, 0, 0, 0, n, 0, 0, 0, 0, i, 0, 0, 0, 0, 1), this;
  }
  makeShear(t, n, i, s, r, o) {
    return this.set(1, i, r, 0, t, 1, o, 0, n, s, 1, 0, 0, 0, 0, 1), this;
  }
  compose(t, n, i) {
    const s = this.elements, r = n._x, o = n._y, a = n._z, l = n._w, c = r + r, h = o + o, u = a + a, d = r * c, p = r * h, _ = r * u, g = o * h, m = o * u, f = a * u, y = l * c, v = l * h, S = l * u, A = i.x, b = i.y, R = i.z;
    return s[0] = (1 - (g + f)) * A, s[1] = (p + S) * A, s[2] = (_ - v) * A, s[3] = 0, s[4] = (p - S) * b, s[5] = (1 - (d + f)) * b, s[6] = (m + y) * b, s[7] = 0, s[8] = (_ + v) * R, s[9] = (m - y) * R, s[10] = (1 - (d + g)) * R, s[11] = 0, s[12] = t.x, s[13] = t.y, s[14] = t.z, s[15] = 1, this;
  }
  decompose(t, n, i) {
    const s = this.elements;
    let r = jn.set(s[0], s[1], s[2]).length();
    const o = jn.set(s[4], s[5], s[6]).length(), a = jn.set(s[8], s[9], s[10]).length();
    this.determinant() < 0 && (r = -r), t.x = s[12], t.y = s[13], t.z = s[14], qt.copy(this);
    const l = 1 / r, c = 1 / o, h = 1 / a;
    return qt.elements[0] *= l, qt.elements[1] *= l, qt.elements[2] *= l, qt.elements[4] *= c, qt.elements[5] *= c, qt.elements[6] *= c, qt.elements[8] *= h, qt.elements[9] *= h, qt.elements[10] *= h, n.setFromRotationMatrix(qt), i.x = r, i.y = o, i.z = a, this;
  }
  makePerspective(t, n, i, s, r, o, a = pi, l = !1) {
    const c = this.elements, h = 2 * r / (n - t), u = 2 * r / (i - s), d = (n + t) / (n - t), p = (i + s) / (i - s);
    let _, g;
    if (l)
      _ = r / (o - r), g = o * r / (o - r);
    else if (a === 2e3)
      _ = -(o + r) / (o - r), g = -2 * o * r / (o - r);
    else if (a === 2001)
      _ = -o / (o - r), g = -o * r / (o - r);
    else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: " + a);
    return c[0] = h, c[4] = 0, c[8] = d, c[12] = 0, c[1] = 0, c[5] = u, c[9] = p, c[13] = 0, c[2] = 0, c[6] = 0, c[10] = _, c[14] = g, c[3] = 0, c[7] = 0, c[11] = -1, c[15] = 0, this;
  }
  makeOrthographic(t, n, i, s, r, o, a = pi, l = !1) {
    const c = this.elements, h = 2 / (n - t), u = 2 / (i - s), d = -(n + t) / (n - t), p = -(i + s) / (i - s);
    let _, g;
    if (l)
      _ = 1 / (o - r), g = o / (o - r);
    else if (a === 2e3)
      _ = -2 / (o - r), g = -(o + r) / (o - r);
    else if (a === 2001)
      _ = -1 / (o - r), g = -r / (o - r);
    else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: " + a);
    return c[0] = h, c[4] = 0, c[8] = 0, c[12] = d, c[1] = 0, c[5] = u, c[9] = 0, c[13] = p, c[2] = 0, c[6] = 0, c[10] = _, c[14] = g, c[3] = 0, c[7] = 0, c[11] = 0, c[15] = 1, this;
  }
  equals(t) {
    const n = this.elements, i = t.elements;
    for (let s = 0; s < 16; s++) if (n[s] !== i[s]) return !1;
    return !0;
  }
  fromArray(t, n = 0) {
    for (let i = 0; i < 16; i++) this.elements[i] = t[i + n];
    return this;
  }
  toArray(t = [], n = 0) {
    const i = this.elements;
    return t[n] = i[0], t[n + 1] = i[1], t[n + 2] = i[2], t[n + 3] = i[3], t[n + 4] = i[4], t[n + 5] = i[5], t[n + 6] = i[6], t[n + 7] = i[7], t[n + 8] = i[8], t[n + 9] = i[9], t[n + 10] = i[10], t[n + 11] = i[11], t[n + 12] = i[12], t[n + 13] = i[13], t[n + 14] = i[14], t[n + 15] = i[15], t;
  }
}, jn = /* @__PURE__ */ new C(), qt = /* @__PURE__ */ new Ve(), Fh = /* @__PURE__ */ new C(0, 0, 0), Bh = /* @__PURE__ */ new C(1, 1, 1), yn = /* @__PURE__ */ new C(), ds = /* @__PURE__ */ new C(), Dt = /* @__PURE__ */ new C(), Po = /* @__PURE__ */ new Ve(), Lo = /* @__PURE__ */ new nn(), An = class ll {
  constructor(t = 0, n = 0, i = 0, s = ll.DEFAULT_ORDER) {
    this.isEuler = !0, this._x = t, this._y = n, this._z = i, this._order = s;
  }
  get x() {
    return this._x;
  }
  set x(t) {
    this._x = t, this._onChangeCallback();
  }
  get y() {
    return this._y;
  }
  set y(t) {
    this._y = t, this._onChangeCallback();
  }
  get z() {
    return this._z;
  }
  set z(t) {
    this._z = t, this._onChangeCallback();
  }
  get order() {
    return this._order;
  }
  set order(t) {
    this._order = t, this._onChangeCallback();
  }
  set(t, n, i, s = this._order) {
    return this._x = t, this._y = n, this._z = i, this._order = s, this._onChangeCallback(), this;
  }
  clone() {
    return new this.constructor(this._x, this._y, this._z, this._order);
  }
  copy(t) {
    return this._x = t._x, this._y = t._y, this._z = t._z, this._order = t._order, this._onChangeCallback(), this;
  }
  setFromRotationMatrix(t, n = this._order, i = !0) {
    const s = t.elements, r = s[0], o = s[4], a = s[8], l = s[1], c = s[5], h = s[9], u = s[2], d = s[6], p = s[10];
    switch (n) {
      case "XYZ":
        this._y = Math.asin(Ge(a, -1, 1)), Math.abs(a) < 0.9999999 ? (this._x = Math.atan2(-h, p), this._z = Math.atan2(-o, r)) : (this._x = Math.atan2(d, c), this._z = 0);
        break;
      case "YXZ":
        this._x = Math.asin(-Ge(h, -1, 1)), Math.abs(h) < 0.9999999 ? (this._y = Math.atan2(a, p), this._z = Math.atan2(l, c)) : (this._y = Math.atan2(-u, r), this._z = 0);
        break;
      case "ZXY":
        this._x = Math.asin(Ge(d, -1, 1)), Math.abs(d) < 0.9999999 ? (this._y = Math.atan2(-u, p), this._z = Math.atan2(-o, c)) : (this._y = 0, this._z = Math.atan2(l, r));
        break;
      case "ZYX":
        this._y = Math.asin(-Ge(u, -1, 1)), Math.abs(u) < 0.9999999 ? (this._x = Math.atan2(d, p), this._z = Math.atan2(l, r)) : (this._x = 0, this._z = Math.atan2(-o, c));
        break;
      case "YZX":
        this._z = Math.asin(Ge(l, -1, 1)), Math.abs(l) < 0.9999999 ? (this._x = Math.atan2(-h, c), this._y = Math.atan2(-u, r)) : (this._x = 0, this._y = Math.atan2(a, p));
        break;
      case "XZY":
        this._z = Math.asin(-Ge(o, -1, 1)), Math.abs(o) < 0.9999999 ? (this._x = Math.atan2(d, c), this._y = Math.atan2(a, r)) : (this._x = Math.atan2(-h, p), this._y = 0);
        break;
      default:
        console.warn("THREE.Euler: .setFromRotationMatrix() encountered an unknown order: " + n);
    }
    return this._order = n, i === !0 && this._onChangeCallback(), this;
  }
  setFromQuaternion(t, n, i) {
    return Po.makeRotationFromQuaternion(t), this.setFromRotationMatrix(Po, n, i);
  }
  setFromVector3(t, n = this._order) {
    return this.set(t.x, t.y, t.z, n);
  }
  reorder(t) {
    return Lo.setFromEuler(this), this.setFromQuaternion(Lo, t);
  }
  equals(t) {
    return t._x === this._x && t._y === this._y && t._z === this._z && t._order === this._order;
  }
  fromArray(t) {
    return this._x = t[0], this._y = t[1], this._z = t[2], t[3] !== void 0 && (this._order = t[3]), this._onChangeCallback(), this;
  }
  toArray(t = [], n = 0) {
    return t[n] = this._x, t[n + 1] = this._y, t[n + 2] = this._z, t[n + 3] = this._order, t;
  }
  _onChange(t) {
    return this._onChangeCallback = t, this;
  }
  _onChangeCallback() {
  }
  *[Symbol.iterator]() {
    yield this._x, yield this._y, yield this._z, yield this._order;
  }
};
An.DEFAULT_ORDER = "XYZ";
var cl = class {
  constructor() {
    this.mask = 1;
  }
  set(e) {
    this.mask = (1 << e | 0) >>> 0;
  }
  enable(e) {
    this.mask |= 1 << e | 0;
  }
  enableAll() {
    this.mask = -1;
  }
  toggle(e) {
    this.mask ^= 1 << e | 0;
  }
  disable(e) {
    this.mask &= ~(1 << e | 0);
  }
  disableAll() {
    this.mask = 0;
  }
  test(e) {
    return (this.mask & e.mask) !== 0;
  }
  isEnabled(e) {
    return (this.mask & (1 << e | 0)) !== 0;
  }
}, zh = 0, Io = /* @__PURE__ */ new C(), Zn = /* @__PURE__ */ new nn(), cn = /* @__PURE__ */ new Ve(), fs = /* @__PURE__ */ new C(), Ri = /* @__PURE__ */ new C(), kh = /* @__PURE__ */ new C(), Hh = /* @__PURE__ */ new nn(), Do = /* @__PURE__ */ new C(1, 0, 0), No = /* @__PURE__ */ new C(0, 1, 0), Uo = /* @__PURE__ */ new C(0, 0, 1), Oo = { type: "added" }, Vh = { type: "removed" }, Jn = {
  type: "childadded",
  child: null
}, dr = {
  type: "childremoved",
  child: null
}, pt = class ks extends Gn {
  constructor() {
    super(), this.isObject3D = !0, Object.defineProperty(this, "id", { value: zh++ }), this.uuid = Ht(), this.name = "", this.type = "Object3D", this.parent = null, this.children = [], this.up = ks.DEFAULT_UP.clone();
    const t = new C(), n = new An(), i = new nn(), s = new C(1, 1, 1);
    function r() {
      i.setFromEuler(n, !1);
    }
    function o() {
      n.setFromQuaternion(i, void 0, !1);
    }
    n._onChange(r), i._onChange(o), Object.defineProperties(this, {
      position: {
        configurable: !0,
        enumerable: !0,
        value: t
      },
      rotation: {
        configurable: !0,
        enumerable: !0,
        value: n
      },
      quaternion: {
        configurable: !0,
        enumerable: !0,
        value: i
      },
      scale: {
        configurable: !0,
        enumerable: !0,
        value: s
      },
      modelViewMatrix: { value: new Ve() },
      normalMatrix: { value: new qe() }
    }), this.matrix = new Ve(), this.matrixWorld = new Ve(), this.matrixAutoUpdate = ks.DEFAULT_MATRIX_AUTO_UPDATE, this.matrixWorldAutoUpdate = ks.DEFAULT_MATRIX_WORLD_AUTO_UPDATE, this.matrixWorldNeedsUpdate = !1, this.layers = new cl(), this.visible = !0, this.castShadow = !1, this.receiveShadow = !1, this.frustumCulled = !0, this.renderOrder = 0, this.animations = [], this.customDepthMaterial = void 0, this.customDistanceMaterial = void 0, this.userData = {};
  }
  onBeforeShadow() {
  }
  onAfterShadow() {
  }
  onBeforeRender() {
  }
  onAfterRender() {
  }
  applyMatrix4(t) {
    this.matrixAutoUpdate && this.updateMatrix(), this.matrix.premultiply(t), this.matrix.decompose(this.position, this.quaternion, this.scale);
  }
  applyQuaternion(t) {
    return this.quaternion.premultiply(t), this;
  }
  setRotationFromAxisAngle(t, n) {
    this.quaternion.setFromAxisAngle(t, n);
  }
  setRotationFromEuler(t) {
    this.quaternion.setFromEuler(t, !0);
  }
  setRotationFromMatrix(t) {
    this.quaternion.setFromRotationMatrix(t);
  }
  setRotationFromQuaternion(t) {
    this.quaternion.copy(t);
  }
  rotateOnAxis(t, n) {
    return Zn.setFromAxisAngle(t, n), this.quaternion.multiply(Zn), this;
  }
  rotateOnWorldAxis(t, n) {
    return Zn.setFromAxisAngle(t, n), this.quaternion.premultiply(Zn), this;
  }
  rotateX(t) {
    return this.rotateOnAxis(Do, t);
  }
  rotateY(t) {
    return this.rotateOnAxis(No, t);
  }
  rotateZ(t) {
    return this.rotateOnAxis(Uo, t);
  }
  translateOnAxis(t, n) {
    return Io.copy(t).applyQuaternion(this.quaternion), this.position.add(Io.multiplyScalar(n)), this;
  }
  translateX(t) {
    return this.translateOnAxis(Do, t);
  }
  translateY(t) {
    return this.translateOnAxis(No, t);
  }
  translateZ(t) {
    return this.translateOnAxis(Uo, t);
  }
  localToWorld(t) {
    return this.updateWorldMatrix(!0, !1), t.applyMatrix4(this.matrixWorld);
  }
  worldToLocal(t) {
    return this.updateWorldMatrix(!0, !1), t.applyMatrix4(cn.copy(this.matrixWorld).invert());
  }
  lookAt(t, n, i) {
    t.isVector3 ? fs.copy(t) : fs.set(t, n, i);
    const s = this.parent;
    this.updateWorldMatrix(!0, !1), Ri.setFromMatrixPosition(this.matrixWorld), this.isCamera || this.isLight ? cn.lookAt(Ri, fs, this.up) : cn.lookAt(fs, Ri, this.up), this.quaternion.setFromRotationMatrix(cn), s && (cn.extractRotation(s.matrixWorld), Zn.setFromRotationMatrix(cn), this.quaternion.premultiply(Zn.invert()));
  }
  add(t) {
    if (arguments.length > 1) {
      for (let n = 0; n < arguments.length; n++) this.add(arguments[n]);
      return this;
    }
    return t === this ? (console.error("THREE.Object3D.add: object can't be added as a child of itself.", t), this) : (t && t.isObject3D ? (t.removeFromParent(), t.parent = this, this.children.push(t), t.dispatchEvent(Oo), Jn.child = t, this.dispatchEvent(Jn), Jn.child = null) : console.error("THREE.Object3D.add: object not an instance of THREE.Object3D.", t), this);
  }
  remove(t) {
    if (arguments.length > 1) {
      for (let i = 0; i < arguments.length; i++) this.remove(arguments[i]);
      return this;
    }
    const n = this.children.indexOf(t);
    return n !== -1 && (t.parent = null, this.children.splice(n, 1), t.dispatchEvent(Vh), dr.child = t, this.dispatchEvent(dr), dr.child = null), this;
  }
  removeFromParent() {
    const t = this.parent;
    return t !== null && t.remove(this), this;
  }
  clear() {
    return this.remove(...this.children);
  }
  attach(t) {
    return this.updateWorldMatrix(!0, !1), cn.copy(this.matrixWorld).invert(), t.parent !== null && (t.parent.updateWorldMatrix(!0, !1), cn.multiply(t.parent.matrixWorld)), t.applyMatrix4(cn), t.removeFromParent(), t.parent = this, this.children.push(t), t.updateWorldMatrix(!1, !0), t.dispatchEvent(Oo), Jn.child = t, this.dispatchEvent(Jn), Jn.child = null, this;
  }
  getObjectById(t) {
    return this.getObjectByProperty("id", t);
  }
  getObjectByName(t) {
    return this.getObjectByProperty("name", t);
  }
  getObjectByProperty(t, n) {
    if (this[t] === n) return this;
    for (let i = 0, s = this.children.length; i < s; i++) {
      const r = this.children[i].getObjectByProperty(t, n);
      if (r !== void 0) return r;
    }
  }
  getObjectsByProperty(t, n, i = []) {
    this[t] === n && i.push(this);
    const s = this.children;
    for (let r = 0, o = s.length; r < o; r++) s[r].getObjectsByProperty(t, n, i);
    return i;
  }
  getWorldPosition(t) {
    return this.updateWorldMatrix(!0, !1), t.setFromMatrixPosition(this.matrixWorld);
  }
  getWorldQuaternion(t) {
    return this.updateWorldMatrix(!0, !1), this.matrixWorld.decompose(Ri, t, kh), t;
  }
  getWorldScale(t) {
    return this.updateWorldMatrix(!0, !1), this.matrixWorld.decompose(Ri, Hh, t), t;
  }
  getWorldDirection(t) {
    this.updateWorldMatrix(!0, !1);
    const n = this.matrixWorld.elements;
    return t.set(n[8], n[9], n[10]).normalize();
  }
  raycast() {
  }
  traverse(t) {
    t(this);
    const n = this.children;
    for (let i = 0, s = n.length; i < s; i++) n[i].traverse(t);
  }
  traverseVisible(t) {
    if (this.visible === !1) return;
    t(this);
    const n = this.children;
    for (let i = 0, s = n.length; i < s; i++) n[i].traverseVisible(t);
  }
  traverseAncestors(t) {
    const n = this.parent;
    n !== null && (t(n), n.traverseAncestors(t));
  }
  updateMatrix() {
    this.matrix.compose(this.position, this.quaternion, this.scale), this.matrixWorldNeedsUpdate = !0;
  }
  updateMatrixWorld(t) {
    this.matrixAutoUpdate && this.updateMatrix(), (this.matrixWorldNeedsUpdate || t) && (this.matrixWorldAutoUpdate === !0 && (this.parent === null ? this.matrixWorld.copy(this.matrix) : this.matrixWorld.multiplyMatrices(this.parent.matrixWorld, this.matrix)), this.matrixWorldNeedsUpdate = !1, t = !0);
    const n = this.children;
    for (let i = 0, s = n.length; i < s; i++) n[i].updateMatrixWorld(t);
  }
  updateWorldMatrix(t, n) {
    const i = this.parent;
    if (t === !0 && i !== null && i.updateWorldMatrix(!0, !1), this.matrixAutoUpdate && this.updateMatrix(), this.matrixWorldAutoUpdate === !0 && (this.parent === null ? this.matrixWorld.copy(this.matrix) : this.matrixWorld.multiplyMatrices(this.parent.matrixWorld, this.matrix)), n === !0) {
      const s = this.children;
      for (let r = 0, o = s.length; r < o; r++) s[r].updateWorldMatrix(!1, !0);
    }
  }
  toJSON(t) {
    const n = t === void 0 || typeof t == "string", i = {};
    n && (t = {
      geometries: {},
      materials: {},
      textures: {},
      images: {},
      shapes: {},
      skeletons: {},
      animations: {},
      nodes: {}
    }, i.metadata = {
      version: 4.7,
      type: "Object",
      generator: "Object3D.toJSON"
    });
    const s = {};
    s.uuid = this.uuid, s.type = this.type, this.name !== "" && (s.name = this.name), this.castShadow === !0 && (s.castShadow = !0), this.receiveShadow === !0 && (s.receiveShadow = !0), this.visible === !1 && (s.visible = !1), this.frustumCulled === !1 && (s.frustumCulled = !1), this.renderOrder !== 0 && (s.renderOrder = this.renderOrder), Object.keys(this.userData).length > 0 && (s.userData = this.userData), s.layers = this.layers.mask, s.matrix = this.matrix.toArray(), s.up = this.up.toArray(), this.matrixAutoUpdate === !1 && (s.matrixAutoUpdate = !1), this.isInstancedMesh && (s.type = "InstancedMesh", s.count = this.count, s.instanceMatrix = this.instanceMatrix.toJSON(), this.instanceColor !== null && (s.instanceColor = this.instanceColor.toJSON())), this.isBatchedMesh && (s.type = "BatchedMesh", s.perObjectFrustumCulled = this.perObjectFrustumCulled, s.sortObjects = this.sortObjects, s.drawRanges = this._drawRanges, s.reservedRanges = this._reservedRanges, s.geometryInfo = this._geometryInfo.map((a) => ({
      ...a,
      boundingBox: a.boundingBox ? a.boundingBox.toJSON() : void 0,
      boundingSphere: a.boundingSphere ? a.boundingSphere.toJSON() : void 0
    })), s.instanceInfo = this._instanceInfo.map((a) => ({ ...a })), s.availableInstanceIds = this._availableInstanceIds.slice(), s.availableGeometryIds = this._availableGeometryIds.slice(), s.nextIndexStart = this._nextIndexStart, s.nextVertexStart = this._nextVertexStart, s.geometryCount = this._geometryCount, s.maxInstanceCount = this._maxInstanceCount, s.maxVertexCount = this._maxVertexCount, s.maxIndexCount = this._maxIndexCount, s.geometryInitialized = this._geometryInitialized, s.matricesTexture = this._matricesTexture.toJSON(t), s.indirectTexture = this._indirectTexture.toJSON(t), this._colorsTexture !== null && (s.colorsTexture = this._colorsTexture.toJSON(t)), this.boundingSphere !== null && (s.boundingSphere = this.boundingSphere.toJSON()), this.boundingBox !== null && (s.boundingBox = this.boundingBox.toJSON()));
    function r(a, l) {
      return a[l.uuid] === void 0 && (a[l.uuid] = l.toJSON(t)), l.uuid;
    }
    if (this.isScene)
      this.background && (this.background.isColor ? s.background = this.background.toJSON() : this.background.isTexture && (s.background = this.background.toJSON(t).uuid)), this.environment && this.environment.isTexture && this.environment.isRenderTargetTexture !== !0 && (s.environment = this.environment.toJSON(t).uuid);
    else if (this.isMesh || this.isLine || this.isPoints) {
      s.geometry = r(t.geometries, this.geometry);
      const a = this.geometry.parameters;
      if (a !== void 0 && a.shapes !== void 0) {
        const l = a.shapes;
        if (Array.isArray(l)) for (let c = 0, h = l.length; c < h; c++) {
          const u = l[c];
          r(t.shapes, u);
        }
        else r(t.shapes, l);
      }
    }
    if (this.isSkinnedMesh && (s.bindMode = this.bindMode, s.bindMatrix = this.bindMatrix.toArray(), this.skeleton !== void 0 && (r(t.skeletons, this.skeleton), s.skeleton = this.skeleton.uuid)), this.material !== void 0) if (Array.isArray(this.material)) {
      const a = [];
      for (let l = 0, c = this.material.length; l < c; l++) a.push(r(t.materials, this.material[l]));
      s.material = a;
    } else s.material = r(t.materials, this.material);
    if (this.children.length > 0) {
      s.children = [];
      for (let a = 0; a < this.children.length; a++) s.children.push(this.children[a].toJSON(t).object);
    }
    if (this.animations.length > 0) {
      s.animations = [];
      for (let a = 0; a < this.animations.length; a++) {
        const l = this.animations[a];
        s.animations.push(r(t.animations, l));
      }
    }
    if (n) {
      const a = o(t.geometries), l = o(t.materials), c = o(t.textures), h = o(t.images), u = o(t.shapes), d = o(t.skeletons), p = o(t.animations), _ = o(t.nodes);
      a.length > 0 && (i.geometries = a), l.length > 0 && (i.materials = l), c.length > 0 && (i.textures = c), h.length > 0 && (i.images = h), u.length > 0 && (i.shapes = u), d.length > 0 && (i.skeletons = d), p.length > 0 && (i.animations = p), _.length > 0 && (i.nodes = _);
    }
    return i.object = s, i;
    function o(a) {
      const l = [];
      for (const c in a) {
        const h = a[c];
        delete h.metadata, l.push(h);
      }
      return l;
    }
  }
  clone(t) {
    return new this.constructor().copy(this, t);
  }
  copy(t, n = !0) {
    if (this.name = t.name, this.up.copy(t.up), this.position.copy(t.position), this.rotation.order = t.rotation.order, this.quaternion.copy(t.quaternion), this.scale.copy(t.scale), this.matrix.copy(t.matrix), this.matrixWorld.copy(t.matrixWorld), this.matrixAutoUpdate = t.matrixAutoUpdate, this.matrixWorldAutoUpdate = t.matrixWorldAutoUpdate, this.matrixWorldNeedsUpdate = t.matrixWorldNeedsUpdate, this.layers.mask = t.layers.mask, this.visible = t.visible, this.castShadow = t.castShadow, this.receiveShadow = t.receiveShadow, this.frustumCulled = t.frustumCulled, this.renderOrder = t.renderOrder, this.animations = t.animations.slice(), this.userData = JSON.parse(JSON.stringify(t.userData)), n === !0) for (let i = 0; i < t.children.length; i++) {
      const s = t.children[i];
      this.add(s.clone());
    }
    return this;
  }
};
pt.DEFAULT_UP = /* @__PURE__ */ new C(0, 1, 0);
pt.DEFAULT_MATRIX_AUTO_UPDATE = !0;
pt.DEFAULT_MATRIX_WORLD_AUTO_UPDATE = !0;
var Kt = /* @__PURE__ */ new C(), hn = /* @__PURE__ */ new C(), fr = /* @__PURE__ */ new C(), un = /* @__PURE__ */ new C(), $n = /* @__PURE__ */ new C(), Qn = /* @__PURE__ */ new C(), Fo = /* @__PURE__ */ new C(), pr = /* @__PURE__ */ new C(), mr = /* @__PURE__ */ new C(), gr = /* @__PURE__ */ new C(), _r = /* @__PURE__ */ new tt(), vr = /* @__PURE__ */ new tt(), xr = /* @__PURE__ */ new tt(), Ci = class oi {
  constructor(t = new C(), n = new C(), i = new C()) {
    this.a = t, this.b = n, this.c = i;
  }
  static getNormal(t, n, i, s) {
    s.subVectors(i, n), Kt.subVectors(t, n), s.cross(Kt);
    const r = s.lengthSq();
    return r > 0 ? s.multiplyScalar(1 / Math.sqrt(r)) : s.set(0, 0, 0);
  }
  static getBarycoord(t, n, i, s, r) {
    Kt.subVectors(s, n), hn.subVectors(i, n), fr.subVectors(t, n);
    const o = Kt.dot(Kt), a = Kt.dot(hn), l = Kt.dot(fr), c = hn.dot(hn), h = hn.dot(fr), u = o * c - a * a;
    if (u === 0)
      return r.set(0, 0, 0), null;
    const d = 1 / u, p = (c * l - a * h) * d, _ = (o * h - a * l) * d;
    return r.set(1 - p - _, _, p);
  }
  static containsPoint(t, n, i, s) {
    return this.getBarycoord(t, n, i, s, un) === null ? !1 : un.x >= 0 && un.y >= 0 && un.x + un.y <= 1;
  }
  static getInterpolation(t, n, i, s, r, o, a, l) {
    return this.getBarycoord(t, n, i, s, un) === null ? (l.x = 0, l.y = 0, "z" in l && (l.z = 0), "w" in l && (l.w = 0), null) : (l.setScalar(0), l.addScaledVector(r, un.x), l.addScaledVector(o, un.y), l.addScaledVector(a, un.z), l);
  }
  static getInterpolatedAttribute(t, n, i, s, r, o) {
    return _r.setScalar(0), vr.setScalar(0), xr.setScalar(0), _r.fromBufferAttribute(t, n), vr.fromBufferAttribute(t, i), xr.fromBufferAttribute(t, s), o.setScalar(0), o.addScaledVector(_r, r.x), o.addScaledVector(vr, r.y), o.addScaledVector(xr, r.z), o;
  }
  static isFrontFacing(t, n, i, s) {
    return Kt.subVectors(i, n), hn.subVectors(t, n), Kt.cross(hn).dot(s) < 0;
  }
  set(t, n, i) {
    return this.a.copy(t), this.b.copy(n), this.c.copy(i), this;
  }
  setFromPointsAndIndices(t, n, i, s) {
    return this.a.copy(t[n]), this.b.copy(t[i]), this.c.copy(t[s]), this;
  }
  setFromAttributeAndIndices(t, n, i, s) {
    return this.a.fromBufferAttribute(t, n), this.b.fromBufferAttribute(t, i), this.c.fromBufferAttribute(t, s), this;
  }
  clone() {
    return new this.constructor().copy(this);
  }
  copy(t) {
    return this.a.copy(t.a), this.b.copy(t.b), this.c.copy(t.c), this;
  }
  getArea() {
    return Kt.subVectors(this.c, this.b), hn.subVectors(this.a, this.b), Kt.cross(hn).length() * 0.5;
  }
  getMidpoint(t) {
    return t.addVectors(this.a, this.b).add(this.c).multiplyScalar(1 / 3);
  }
  getNormal(t) {
    return oi.getNormal(this.a, this.b, this.c, t);
  }
  getPlane(t) {
    return t.setFromCoplanarPoints(this.a, this.b, this.c);
  }
  getBarycoord(t, n) {
    return oi.getBarycoord(t, this.a, this.b, this.c, n);
  }
  getInterpolation(t, n, i, s, r) {
    return oi.getInterpolation(t, this.a, this.b, this.c, n, i, s, r);
  }
  containsPoint(t) {
    return oi.containsPoint(t, this.a, this.b, this.c);
  }
  isFrontFacing(t) {
    return oi.isFrontFacing(this.a, this.b, this.c, t);
  }
  intersectsBox(t) {
    return t.intersectsTriangle(this);
  }
  closestPointToPoint(t, n) {
    const i = this.a, s = this.b, r = this.c;
    let o, a;
    $n.subVectors(s, i), Qn.subVectors(r, i), pr.subVectors(t, i);
    const l = $n.dot(pr), c = Qn.dot(pr);
    if (l <= 0 && c <= 0) return n.copy(i);
    mr.subVectors(t, s);
    const h = $n.dot(mr), u = Qn.dot(mr);
    if (h >= 0 && u <= h) return n.copy(s);
    const d = l * u - h * c;
    if (d <= 0 && l >= 0 && h <= 0)
      return o = l / (l - h), n.copy(i).addScaledVector($n, o);
    gr.subVectors(t, r);
    const p = $n.dot(gr), _ = Qn.dot(gr);
    if (_ >= 0 && p <= _) return n.copy(r);
    const g = p * c - l * _;
    if (g <= 0 && c >= 0 && _ <= 0)
      return a = c / (c - _), n.copy(i).addScaledVector(Qn, a);
    const m = h * _ - p * u;
    if (m <= 0 && u - h >= 0 && p - _ >= 0)
      return Fo.subVectors(r, s), a = (u - h) / (u - h + (p - _)), n.copy(s).addScaledVector(Fo, a);
    const f = 1 / (m + g + d);
    return o = g * f, a = d * f, n.copy(i).addScaledVector($n, o).addScaledVector(Qn, a);
  }
  equals(t) {
    return t.a.equals(this.a) && t.b.equals(this.b) && t.c.equals(this.c);
  }
}, hl = {
  aliceblue: 15792383,
  antiquewhite: 16444375,
  aqua: 65535,
  aquamarine: 8388564,
  azure: 15794175,
  beige: 16119260,
  bisque: 16770244,
  black: 0,
  blanchedalmond: 16772045,
  blue: 255,
  blueviolet: 9055202,
  brown: 10824234,
  burlywood: 14596231,
  cadetblue: 6266528,
  chartreuse: 8388352,
  chocolate: 13789470,
  coral: 16744272,
  cornflowerblue: 6591981,
  cornsilk: 16775388,
  crimson: 14423100,
  cyan: 65535,
  darkblue: 139,
  darkcyan: 35723,
  darkgoldenrod: 12092939,
  darkgray: 11119017,
  darkgreen: 25600,
  darkgrey: 11119017,
  darkkhaki: 12433259,
  darkmagenta: 9109643,
  darkolivegreen: 5597999,
  darkorange: 16747520,
  darkorchid: 10040012,
  darkred: 9109504,
  darksalmon: 15308410,
  darkseagreen: 9419919,
  darkslateblue: 4734347,
  darkslategray: 3100495,
  darkslategrey: 3100495,
  darkturquoise: 52945,
  darkviolet: 9699539,
  deeppink: 16716947,
  deepskyblue: 49151,
  dimgray: 6908265,
  dimgrey: 6908265,
  dodgerblue: 2003199,
  firebrick: 11674146,
  floralwhite: 16775920,
  forestgreen: 2263842,
  fuchsia: 16711935,
  gainsboro: 14474460,
  ghostwhite: 16316671,
  gold: 16766720,
  goldenrod: 14329120,
  gray: 8421504,
  green: 32768,
  greenyellow: 11403055,
  grey: 8421504,
  honeydew: 15794160,
  hotpink: 16738740,
  indianred: 13458524,
  indigo: 4915330,
  ivory: 16777200,
  khaki: 15787660,
  lavender: 15132410,
  lavenderblush: 16773365,
  lawngreen: 8190976,
  lemonchiffon: 16775885,
  lightblue: 11393254,
  lightcoral: 15761536,
  lightcyan: 14745599,
  lightgoldenrodyellow: 16448210,
  lightgray: 13882323,
  lightgreen: 9498256,
  lightgrey: 13882323,
  lightpink: 16758465,
  lightsalmon: 16752762,
  lightseagreen: 2142890,
  lightskyblue: 8900346,
  lightslategray: 7833753,
  lightslategrey: 7833753,
  lightsteelblue: 11584734,
  lightyellow: 16777184,
  lime: 65280,
  limegreen: 3329330,
  linen: 16445670,
  magenta: 16711935,
  maroon: 8388608,
  mediumaquamarine: 6737322,
  mediumblue: 205,
  mediumorchid: 12211667,
  mediumpurple: 9662683,
  mediumseagreen: 3978097,
  mediumslateblue: 8087790,
  mediumspringgreen: 64154,
  mediumturquoise: 4772300,
  mediumvioletred: 13047173,
  midnightblue: 1644912,
  mintcream: 16121850,
  mistyrose: 16770273,
  moccasin: 16770229,
  navajowhite: 16768685,
  navy: 128,
  oldlace: 16643558,
  olive: 8421376,
  olivedrab: 7048739,
  orange: 16753920,
  orangered: 16729344,
  orchid: 14315734,
  palegoldenrod: 15657130,
  palegreen: 10025880,
  paleturquoise: 11529966,
  palevioletred: 14381203,
  papayawhip: 16773077,
  peachpuff: 16767673,
  peru: 13468991,
  pink: 16761035,
  plum: 14524637,
  powderblue: 11591910,
  purple: 8388736,
  rebeccapurple: 6697881,
  red: 16711680,
  rosybrown: 12357519,
  royalblue: 4286945,
  saddlebrown: 9127187,
  salmon: 16416882,
  sandybrown: 16032864,
  seagreen: 3050327,
  seashell: 16774638,
  sienna: 10506797,
  silver: 12632256,
  skyblue: 8900331,
  slateblue: 6970061,
  slategray: 7372944,
  slategrey: 7372944,
  snow: 16775930,
  springgreen: 65407,
  steelblue: 4620980,
  tan: 13808780,
  teal: 32896,
  thistle: 14204888,
  tomato: 16737095,
  turquoise: 4251856,
  violet: 15631086,
  wheat: 16113331,
  white: 16777215,
  whitesmoke: 16119285,
  yellow: 16776960,
  yellowgreen: 10145074
}, Mn = {
  h: 0,
  s: 0,
  l: 0
}, ps = {
  h: 0,
  s: 0,
  l: 0
};
function yr(e, t, n) {
  return n < 0 && (n += 1), n > 1 && (n -= 1), n < 1 / 6 ? e + (t - e) * 6 * n : n < 1 / 2 ? t : n < 2 / 3 ? e + (t - e) * 6 * (2 / 3 - n) : e;
}
var Be = class {
  constructor(e, t, n) {
    return this.isColor = !0, this.r = 1, this.g = 1, this.b = 1, this.set(e, t, n);
  }
  set(e, t, n) {
    if (t === void 0 && n === void 0) {
      const i = e;
      i && i.isColor ? this.copy(i) : typeof i == "number" ? this.setHex(i) : typeof i == "string" && this.setStyle(i);
    } else this.setRGB(e, t, n);
    return this;
  }
  setScalar(e) {
    return this.r = e, this.g = e, this.b = e, this;
  }
  setHex(e, t = xt) {
    return e = Math.floor(e), this.r = (e >> 16 & 255) / 255, this.g = (e >> 8 & 255) / 255, this.b = (e & 255) / 255, Ze.colorSpaceToWorking(this, t), this;
  }
  setRGB(e, t, n, i = Ze.workingColorSpace) {
    return this.r = e, this.g = t, this.b = n, Ze.colorSpaceToWorking(this, i), this;
  }
  setHSL(e, t, n, i = Ze.workingColorSpace) {
    if (e = so(e, 1), t = Ge(t, 0, 1), n = Ge(n, 0, 1), t === 0) this.r = this.g = this.b = n;
    else {
      const s = n <= 0.5 ? n * (1 + t) : n + t - n * t, r = 2 * n - s;
      this.r = yr(r, s, e + 1 / 3), this.g = yr(r, s, e), this.b = yr(r, s, e - 1 / 3);
    }
    return Ze.colorSpaceToWorking(this, i), this;
  }
  setStyle(e, t = xt) {
    function n(s) {
      s !== void 0 && parseFloat(s) < 1 && console.warn("THREE.Color: Alpha component of " + e + " will be ignored.");
    }
    let i;
    if (i = /^(\w+)\(([^\)]*)\)/.exec(e)) {
      let s;
      const r = i[1], o = i[2];
      switch (r) {
        case "rgb":
        case "rgba":
          if (s = /^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))
            return n(s[4]), this.setRGB(Math.min(255, parseInt(s[1], 10)) / 255, Math.min(255, parseInt(s[2], 10)) / 255, Math.min(255, parseInt(s[3], 10)) / 255, t);
          if (s = /^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))
            return n(s[4]), this.setRGB(Math.min(100, parseInt(s[1], 10)) / 100, Math.min(100, parseInt(s[2], 10)) / 100, Math.min(100, parseInt(s[3], 10)) / 100, t);
          break;
        case "hsl":
        case "hsla":
          if (s = /^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))
            return n(s[4]), this.setHSL(parseFloat(s[1]) / 360, parseFloat(s[2]) / 100, parseFloat(s[3]) / 100, t);
          break;
        default:
          console.warn("THREE.Color: Unknown color model " + e);
      }
    } else if (i = /^\#([A-Fa-f\d]+)$/.exec(e)) {
      const s = i[1], r = s.length;
      if (r === 3) return this.setRGB(parseInt(s.charAt(0), 16) / 15, parseInt(s.charAt(1), 16) / 15, parseInt(s.charAt(2), 16) / 15, t);
      if (r === 6) return this.setHex(parseInt(s, 16), t);
      console.warn("THREE.Color: Invalid hex color " + e);
    } else if (e && e.length > 0) return this.setColorName(e, t);
    return this;
  }
  setColorName(e, t = xt) {
    const n = hl[e.toLowerCase()];
    return n !== void 0 ? this.setHex(n, t) : console.warn("THREE.Color: Unknown color " + e), this;
  }
  clone() {
    return new this.constructor(this.r, this.g, this.b);
  }
  copy(e) {
    return this.r = e.r, this.g = e.g, this.b = e.b, this;
  }
  copySRGBToLinear(e) {
    return this.r = mn(e.r), this.g = mn(e.g), this.b = mn(e.b), this;
  }
  copyLinearToSRGB(e) {
    return this.r = ui(e.r), this.g = ui(e.g), this.b = ui(e.b), this;
  }
  convertSRGBToLinear() {
    return this.copySRGBToLinear(this), this;
  }
  convertLinearToSRGB() {
    return this.copyLinearToSRGB(this), this;
  }
  getHex(e = xt) {
    return Ze.workingToColorSpace(Et.copy(this), e), Math.round(Ge(Et.r * 255, 0, 255)) * 65536 + Math.round(Ge(Et.g * 255, 0, 255)) * 256 + Math.round(Ge(Et.b * 255, 0, 255));
  }
  getHexString(e = xt) {
    return ("000000" + this.getHex(e).toString(16)).slice(-6);
  }
  getHSL(e, t = Ze.workingColorSpace) {
    Ze.workingToColorSpace(Et.copy(this), t);
    const n = Et.r, i = Et.g, s = Et.b, r = Math.max(n, i, s), o = Math.min(n, i, s);
    let a, l;
    const c = (o + r) / 2;
    if (o === r)
      a = 0, l = 0;
    else {
      const h = r - o;
      switch (l = c <= 0.5 ? h / (r + o) : h / (2 - r - o), r) {
        case n:
          a = (i - s) / h + (i < s ? 6 : 0);
          break;
        case i:
          a = (s - n) / h + 2;
          break;
        case s:
          a = (n - i) / h + 4;
          break;
      }
      a /= 6;
    }
    return e.h = a, e.s = l, e.l = c, e;
  }
  getRGB(e, t = Ze.workingColorSpace) {
    return Ze.workingToColorSpace(Et.copy(this), t), e.r = Et.r, e.g = Et.g, e.b = Et.b, e;
  }
  getStyle(e = xt) {
    Ze.workingToColorSpace(Et.copy(this), e);
    const t = Et.r, n = Et.g, i = Et.b;
    return e !== "srgb" ? `color(${e} ${t.toFixed(3)} ${n.toFixed(3)} ${i.toFixed(3)})` : `rgb(${Math.round(t * 255)},${Math.round(n * 255)},${Math.round(i * 255)})`;
  }
  offsetHSL(e, t, n) {
    return this.getHSL(Mn), this.setHSL(Mn.h + e, Mn.s + t, Mn.l + n);
  }
  add(e) {
    return this.r += e.r, this.g += e.g, this.b += e.b, this;
  }
  addColors(e, t) {
    return this.r = e.r + t.r, this.g = e.g + t.g, this.b = e.b + t.b, this;
  }
  addScalar(e) {
    return this.r += e, this.g += e, this.b += e, this;
  }
  sub(e) {
    return this.r = Math.max(0, this.r - e.r), this.g = Math.max(0, this.g - e.g), this.b = Math.max(0, this.b - e.b), this;
  }
  multiply(e) {
    return this.r *= e.r, this.g *= e.g, this.b *= e.b, this;
  }
  multiplyScalar(e) {
    return this.r *= e, this.g *= e, this.b *= e, this;
  }
  lerp(e, t) {
    return this.r += (e.r - this.r) * t, this.g += (e.g - this.g) * t, this.b += (e.b - this.b) * t, this;
  }
  lerpColors(e, t, n) {
    return this.r = e.r + (t.r - e.r) * n, this.g = e.g + (t.g - e.g) * n, this.b = e.b + (t.b - e.b) * n, this;
  }
  lerpHSL(e, t) {
    this.getHSL(Mn), e.getHSL(ps);
    const n = ki(Mn.h, ps.h, t), i = ki(Mn.s, ps.s, t), s = ki(Mn.l, ps.l, t);
    return this.setHSL(n, i, s), this;
  }
  setFromVector3(e) {
    return this.r = e.x, this.g = e.y, this.b = e.z, this;
  }
  applyMatrix3(e) {
    const t = this.r, n = this.g, i = this.b, s = e.elements;
    return this.r = s[0] * t + s[3] * n + s[6] * i, this.g = s[1] * t + s[4] * n + s[7] * i, this.b = s[2] * t + s[5] * n + s[8] * i, this;
  }
  equals(e) {
    return e.r === this.r && e.g === this.g && e.b === this.b;
  }
  fromArray(e, t = 0) {
    return this.r = e[t], this.g = e[t + 1], this.b = e[t + 2], this;
  }
  toArray(e = [], t = 0) {
    return e[t] = this.r, e[t + 1] = this.g, e[t + 2] = this.b, e;
  }
  fromBufferAttribute(e, t) {
    return this.r = e.getX(t), this.g = e.getY(t), this.b = e.getZ(t), this;
  }
  toJSON() {
    return this.getHex();
  }
  *[Symbol.iterator]() {
    yield this.r, yield this.g, yield this.b;
  }
}, Et = /* @__PURE__ */ new Be();
Be.NAMES = hl;
var Gh = 0, tn = class extends Gn {
  constructor() {
    super(), this.isMaterial = !0, Object.defineProperty(this, "id", { value: Gh++ }), this.uuid = Ht(), this.name = "", this.type = "Material", this.blending = 1, this.side = 0, this.vertexColors = !1, this.opacity = 1, this.transparent = !1, this.alphaHash = !1, this.blendSrc = 204, this.blendDst = 205, this.blendEquation = 100, this.blendSrcAlpha = null, this.blendDstAlpha = null, this.blendEquationAlpha = null, this.blendColor = new Be(0, 0, 0), this.blendAlpha = 0, this.depthFunc = 3, this.depthTest = !0, this.depthWrite = !0, this.stencilWriteMask = 255, this.stencilFunc = 519, this.stencilRef = 0, this.stencilFuncMask = 255, this.stencilFail = nr, this.stencilZFail = nr, this.stencilZPass = nr, this.stencilWrite = !1, this.clippingPlanes = null, this.clipIntersection = !1, this.clipShadows = !1, this.shadowSide = null, this.colorWrite = !0, this.precision = null, this.polygonOffset = !1, this.polygonOffsetFactor = 0, this.polygonOffsetUnits = 0, this.dithering = !1, this.alphaToCoverage = !1, this.premultipliedAlpha = !1, this.forceSinglePass = !1, this.allowOverride = !0, this.visible = !0, this.toneMapped = !0, this.userData = {}, this.version = 0, this._alphaTest = 0;
  }
  get alphaTest() {
    return this._alphaTest;
  }
  set alphaTest(e) {
    this._alphaTest > 0 != e > 0 && this.version++, this._alphaTest = e;
  }
  onBeforeRender() {
  }
  onBeforeCompile() {
  }
  customProgramCacheKey() {
    return this.onBeforeCompile.toString();
  }
  setValues(e) {
    if (e !== void 0)
      for (const t in e) {
        const n = e[t];
        if (n === void 0) {
          console.warn(`THREE.Material: parameter '${t}' has value of undefined.`);
          continue;
        }
        const i = this[t];
        if (i === void 0) {
          console.warn(`THREE.Material: '${t}' is not a property of THREE.${this.type}.`);
          continue;
        }
        i && i.isColor ? i.set(n) : i && i.isVector3 && n && n.isVector3 ? i.copy(n) : this[t] = n;
      }
  }
  toJSON(e) {
    const t = e === void 0 || typeof e == "string";
    t && (e = {
      textures: {},
      images: {}
    });
    const n = { metadata: {
      version: 4.7,
      type: "Material",
      generator: "Material.toJSON"
    } };
    n.uuid = this.uuid, n.type = this.type, this.name !== "" && (n.name = this.name), this.color && this.color.isColor && (n.color = this.color.getHex()), this.roughness !== void 0 && (n.roughness = this.roughness), this.metalness !== void 0 && (n.metalness = this.metalness), this.sheen !== void 0 && (n.sheen = this.sheen), this.sheenColor && this.sheenColor.isColor && (n.sheenColor = this.sheenColor.getHex()), this.sheenRoughness !== void 0 && (n.sheenRoughness = this.sheenRoughness), this.emissive && this.emissive.isColor && (n.emissive = this.emissive.getHex()), this.emissiveIntensity !== void 0 && this.emissiveIntensity !== 1 && (n.emissiveIntensity = this.emissiveIntensity), this.specular && this.specular.isColor && (n.specular = this.specular.getHex()), this.specularIntensity !== void 0 && (n.specularIntensity = this.specularIntensity), this.specularColor && this.specularColor.isColor && (n.specularColor = this.specularColor.getHex()), this.shininess !== void 0 && (n.shininess = this.shininess), this.clearcoat !== void 0 && (n.clearcoat = this.clearcoat), this.clearcoatRoughness !== void 0 && (n.clearcoatRoughness = this.clearcoatRoughness), this.clearcoatMap && this.clearcoatMap.isTexture && (n.clearcoatMap = this.clearcoatMap.toJSON(e).uuid), this.clearcoatRoughnessMap && this.clearcoatRoughnessMap.isTexture && (n.clearcoatRoughnessMap = this.clearcoatRoughnessMap.toJSON(e).uuid), this.clearcoatNormalMap && this.clearcoatNormalMap.isTexture && (n.clearcoatNormalMap = this.clearcoatNormalMap.toJSON(e).uuid, n.clearcoatNormalScale = this.clearcoatNormalScale.toArray()), this.sheenColorMap && this.sheenColorMap.isTexture && (n.sheenColorMap = this.sheenColorMap.toJSON(e).uuid), this.sheenRoughnessMap && this.sheenRoughnessMap.isTexture && (n.sheenRoughnessMap = this.sheenRoughnessMap.toJSON(e).uuid), this.dispersion !== void 0 && (n.dispersion = this.dispersion), this.iridescence !== void 0 && (n.iridescence = this.iridescence), this.iridescenceIOR !== void 0 && (n.iridescenceIOR = this.iridescenceIOR), this.iridescenceThicknessRange !== void 0 && (n.iridescenceThicknessRange = this.iridescenceThicknessRange), this.iridescenceMap && this.iridescenceMap.isTexture && (n.iridescenceMap = this.iridescenceMap.toJSON(e).uuid), this.iridescenceThicknessMap && this.iridescenceThicknessMap.isTexture && (n.iridescenceThicknessMap = this.iridescenceThicknessMap.toJSON(e).uuid), this.anisotropy !== void 0 && (n.anisotropy = this.anisotropy), this.anisotropyRotation !== void 0 && (n.anisotropyRotation = this.anisotropyRotation), this.anisotropyMap && this.anisotropyMap.isTexture && (n.anisotropyMap = this.anisotropyMap.toJSON(e).uuid), this.map && this.map.isTexture && (n.map = this.map.toJSON(e).uuid), this.matcap && this.matcap.isTexture && (n.matcap = this.matcap.toJSON(e).uuid), this.alphaMap && this.alphaMap.isTexture && (n.alphaMap = this.alphaMap.toJSON(e).uuid), this.lightMap && this.lightMap.isTexture && (n.lightMap = this.lightMap.toJSON(e).uuid, n.lightMapIntensity = this.lightMapIntensity), this.aoMap && this.aoMap.isTexture && (n.aoMap = this.aoMap.toJSON(e).uuid, n.aoMapIntensity = this.aoMapIntensity), this.bumpMap && this.bumpMap.isTexture && (n.bumpMap = this.bumpMap.toJSON(e).uuid, n.bumpScale = this.bumpScale), this.normalMap && this.normalMap.isTexture && (n.normalMap = this.normalMap.toJSON(e).uuid, n.normalMapType = this.normalMapType, n.normalScale = this.normalScale.toArray()), this.displacementMap && this.displacementMap.isTexture && (n.displacementMap = this.displacementMap.toJSON(e).uuid, n.displacementScale = this.displacementScale, n.displacementBias = this.displacementBias), this.roughnessMap && this.roughnessMap.isTexture && (n.roughnessMap = this.roughnessMap.toJSON(e).uuid), this.metalnessMap && this.metalnessMap.isTexture && (n.metalnessMap = this.metalnessMap.toJSON(e).uuid), this.emissiveMap && this.emissiveMap.isTexture && (n.emissiveMap = this.emissiveMap.toJSON(e).uuid), this.specularMap && this.specularMap.isTexture && (n.specularMap = this.specularMap.toJSON(e).uuid), this.specularIntensityMap && this.specularIntensityMap.isTexture && (n.specularIntensityMap = this.specularIntensityMap.toJSON(e).uuid), this.specularColorMap && this.specularColorMap.isTexture && (n.specularColorMap = this.specularColorMap.toJSON(e).uuid), this.envMap && this.envMap.isTexture && (n.envMap = this.envMap.toJSON(e).uuid, this.combine !== void 0 && (n.combine = this.combine)), this.envMapRotation !== void 0 && (n.envMapRotation = this.envMapRotation.toArray()), this.envMapIntensity !== void 0 && (n.envMapIntensity = this.envMapIntensity), this.reflectivity !== void 0 && (n.reflectivity = this.reflectivity), this.refractionRatio !== void 0 && (n.refractionRatio = this.refractionRatio), this.gradientMap && this.gradientMap.isTexture && (n.gradientMap = this.gradientMap.toJSON(e).uuid), this.transmission !== void 0 && (n.transmission = this.transmission), this.transmissionMap && this.transmissionMap.isTexture && (n.transmissionMap = this.transmissionMap.toJSON(e).uuid), this.thickness !== void 0 && (n.thickness = this.thickness), this.thicknessMap && this.thicknessMap.isTexture && (n.thicknessMap = this.thicknessMap.toJSON(e).uuid), this.attenuationDistance !== void 0 && this.attenuationDistance !== 1 / 0 && (n.attenuationDistance = this.attenuationDistance), this.attenuationColor !== void 0 && (n.attenuationColor = this.attenuationColor.getHex()), this.size !== void 0 && (n.size = this.size), this.shadowSide !== null && (n.shadowSide = this.shadowSide), this.sizeAttenuation !== void 0 && (n.sizeAttenuation = this.sizeAttenuation), this.blending !== 1 && (n.blending = this.blending), this.side !== 0 && (n.side = this.side), this.vertexColors === !0 && (n.vertexColors = !0), this.opacity < 1 && (n.opacity = this.opacity), this.transparent === !0 && (n.transparent = !0), this.blendSrc !== 204 && (n.blendSrc = this.blendSrc), this.blendDst !== 205 && (n.blendDst = this.blendDst), this.blendEquation !== 100 && (n.blendEquation = this.blendEquation), this.blendSrcAlpha !== null && (n.blendSrcAlpha = this.blendSrcAlpha), this.blendDstAlpha !== null && (n.blendDstAlpha = this.blendDstAlpha), this.blendEquationAlpha !== null && (n.blendEquationAlpha = this.blendEquationAlpha), this.blendColor && this.blendColor.isColor && (n.blendColor = this.blendColor.getHex()), this.blendAlpha !== 0 && (n.blendAlpha = this.blendAlpha), this.depthFunc !== 3 && (n.depthFunc = this.depthFunc), this.depthTest === !1 && (n.depthTest = this.depthTest), this.depthWrite === !1 && (n.depthWrite = this.depthWrite), this.colorWrite === !1 && (n.colorWrite = this.colorWrite), this.stencilWriteMask !== 255 && (n.stencilWriteMask = this.stencilWriteMask), this.stencilFunc !== 519 && (n.stencilFunc = this.stencilFunc), this.stencilRef !== 0 && (n.stencilRef = this.stencilRef), this.stencilFuncMask !== 255 && (n.stencilFuncMask = this.stencilFuncMask), this.stencilFail !== 7680 && (n.stencilFail = this.stencilFail), this.stencilZFail !== 7680 && (n.stencilZFail = this.stencilZFail), this.stencilZPass !== 7680 && (n.stencilZPass = this.stencilZPass), this.stencilWrite === !0 && (n.stencilWrite = this.stencilWrite), this.rotation !== void 0 && this.rotation !== 0 && (n.rotation = this.rotation), this.polygonOffset === !0 && (n.polygonOffset = !0), this.polygonOffsetFactor !== 0 && (n.polygonOffsetFactor = this.polygonOffsetFactor), this.polygonOffsetUnits !== 0 && (n.polygonOffsetUnits = this.polygonOffsetUnits), this.linewidth !== void 0 && this.linewidth !== 1 && (n.linewidth = this.linewidth), this.dashSize !== void 0 && (n.dashSize = this.dashSize), this.gapSize !== void 0 && (n.gapSize = this.gapSize), this.scale !== void 0 && (n.scale = this.scale), this.dithering === !0 && (n.dithering = !0), this.alphaTest > 0 && (n.alphaTest = this.alphaTest), this.alphaHash === !0 && (n.alphaHash = !0), this.alphaToCoverage === !0 && (n.alphaToCoverage = !0), this.premultipliedAlpha === !0 && (n.premultipliedAlpha = !0), this.forceSinglePass === !0 && (n.forceSinglePass = !0), this.wireframe === !0 && (n.wireframe = !0), this.wireframeLinewidth > 1 && (n.wireframeLinewidth = this.wireframeLinewidth), this.wireframeLinecap !== "round" && (n.wireframeLinecap = this.wireframeLinecap), this.wireframeLinejoin !== "round" && (n.wireframeLinejoin = this.wireframeLinejoin), this.flatShading === !0 && (n.flatShading = !0), this.visible === !1 && (n.visible = !1), this.toneMapped === !1 && (n.toneMapped = !1), this.fog === !1 && (n.fog = !1), Object.keys(this.userData).length > 0 && (n.userData = this.userData);
    function i(s) {
      const r = [];
      for (const o in s) {
        const a = s[o];
        delete a.metadata, r.push(a);
      }
      return r;
    }
    if (t) {
      const s = i(e.textures), r = i(e.images);
      s.length > 0 && (n.textures = s), r.length > 0 && (n.images = r);
    }
    return n;
  }
  clone() {
    return new this.constructor().copy(this);
  }
  copy(e) {
    this.name = e.name, this.blending = e.blending, this.side = e.side, this.vertexColors = e.vertexColors, this.opacity = e.opacity, this.transparent = e.transparent, this.blendSrc = e.blendSrc, this.blendDst = e.blendDst, this.blendEquation = e.blendEquation, this.blendSrcAlpha = e.blendSrcAlpha, this.blendDstAlpha = e.blendDstAlpha, this.blendEquationAlpha = e.blendEquationAlpha, this.blendColor.copy(e.blendColor), this.blendAlpha = e.blendAlpha, this.depthFunc = e.depthFunc, this.depthTest = e.depthTest, this.depthWrite = e.depthWrite, this.stencilWriteMask = e.stencilWriteMask, this.stencilFunc = e.stencilFunc, this.stencilRef = e.stencilRef, this.stencilFuncMask = e.stencilFuncMask, this.stencilFail = e.stencilFail, this.stencilZFail = e.stencilZFail, this.stencilZPass = e.stencilZPass, this.stencilWrite = e.stencilWrite;
    const t = e.clippingPlanes;
    let n = null;
    if (t !== null) {
      const i = t.length;
      n = new Array(i);
      for (let s = 0; s !== i; ++s) n[s] = t[s].clone();
    }
    return this.clippingPlanes = n, this.clipIntersection = e.clipIntersection, this.clipShadows = e.clipShadows, this.shadowSide = e.shadowSide, this.colorWrite = e.colorWrite, this.precision = e.precision, this.polygonOffset = e.polygonOffset, this.polygonOffsetFactor = e.polygonOffsetFactor, this.polygonOffsetUnits = e.polygonOffsetUnits, this.dithering = e.dithering, this.alphaTest = e.alphaTest, this.alphaHash = e.alphaHash, this.alphaToCoverage = e.alphaToCoverage, this.premultipliedAlpha = e.premultipliedAlpha, this.forceSinglePass = e.forceSinglePass, this.visible = e.visible, this.toneMapped = e.toneMapped, this.userData = JSON.parse(JSON.stringify(e.userData)), this;
  }
  dispose() {
    this.dispatchEvent({ type: "dispose" });
  }
  set needsUpdate(e) {
    e === !0 && this.version++;
  }
}, zn = class extends tn {
  constructor(e) {
    super(), this.isMeshBasicMaterial = !0, this.type = "MeshBasicMaterial", this.color = new Be(16777215), this.map = null, this.lightMap = null, this.lightMapIntensity = 1, this.aoMap = null, this.aoMapIntensity = 1, this.specularMap = null, this.alphaMap = null, this.envMap = null, this.envMapRotation = new An(), this.combine = 0, this.reflectivity = 1, this.refractionRatio = 0.98, this.wireframe = !1, this.wireframeLinewidth = 1, this.wireframeLinecap = "round", this.wireframeLinejoin = "round", this.fog = !0, this.setValues(e);
  }
  copy(e) {
    return super.copy(e), this.color.copy(e.color), this.map = e.map, this.lightMap = e.lightMap, this.lightMapIntensity = e.lightMapIntensity, this.aoMap = e.aoMap, this.aoMapIntensity = e.aoMapIntensity, this.specularMap = e.specularMap, this.alphaMap = e.alphaMap, this.envMap = e.envMap, this.envMapRotation.copy(e.envMapRotation), this.combine = e.combine, this.reflectivity = e.reflectivity, this.refractionRatio = e.refractionRatio, this.wireframe = e.wireframe, this.wireframeLinewidth = e.wireframeLinewidth, this.wireframeLinecap = e.wireframeLinecap, this.wireframeLinejoin = e.wireframeLinejoin, this.fog = e.fog, this;
  }
}, ft = /* @__PURE__ */ new C(), ms = /* @__PURE__ */ new re(), Wh = 0, wt = class {
  constructor(e, t, n = !1) {
    if (Array.isArray(e)) throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");
    this.isBufferAttribute = !0, Object.defineProperty(this, "id", { value: Wh++ }), this.name = "", this.array = e, this.itemSize = t, this.count = e !== void 0 ? e.length / t : 0, this.normalized = n, this.usage = tl, this.updateRanges = [], this.gpuType = ts, this.version = 0;
  }
  onUploadCallback() {
  }
  set needsUpdate(e) {
    e === !0 && this.version++;
  }
  setUsage(e) {
    return this.usage = e, this;
  }
  addUpdateRange(e, t) {
    this.updateRanges.push({
      start: e,
      count: t
    });
  }
  clearUpdateRanges() {
    this.updateRanges.length = 0;
  }
  copy(e) {
    return this.name = e.name, this.array = new e.array.constructor(e.array), this.itemSize = e.itemSize, this.count = e.count, this.normalized = e.normalized, this.usage = e.usage, this.gpuType = e.gpuType, this;
  }
  copyAt(e, t, n) {
    e *= this.itemSize, n *= t.itemSize;
    for (let i = 0, s = this.itemSize; i < s; i++) this.array[e + i] = t.array[n + i];
    return this;
  }
  copyArray(e) {
    return this.array.set(e), this;
  }
  applyMatrix3(e) {
    if (this.itemSize === 2) for (let t = 0, n = this.count; t < n; t++)
      ms.fromBufferAttribute(this, t), ms.applyMatrix3(e), this.setXY(t, ms.x, ms.y);
    else if (this.itemSize === 3) for (let t = 0, n = this.count; t < n; t++)
      ft.fromBufferAttribute(this, t), ft.applyMatrix3(e), this.setXYZ(t, ft.x, ft.y, ft.z);
    return this;
  }
  applyMatrix4(e) {
    for (let t = 0, n = this.count; t < n; t++)
      ft.fromBufferAttribute(this, t), ft.applyMatrix4(e), this.setXYZ(t, ft.x, ft.y, ft.z);
    return this;
  }
  applyNormalMatrix(e) {
    for (let t = 0, n = this.count; t < n; t++)
      ft.fromBufferAttribute(this, t), ft.applyNormalMatrix(e), this.setXYZ(t, ft.x, ft.y, ft.z);
    return this;
  }
  transformDirection(e) {
    for (let t = 0, n = this.count; t < n; t++)
      ft.fromBufferAttribute(this, t), ft.transformDirection(e), this.setXYZ(t, ft.x, ft.y, ft.z);
    return this;
  }
  set(e, t = 0) {
    return this.array.set(e, t), this;
  }
  getComponent(e, t) {
    let n = this.array[e * this.itemSize + t];
    return this.normalized && (n = jt(n, this.array)), n;
  }
  setComponent(e, t, n) {
    return this.normalized && (n = et(n, this.array)), this.array[e * this.itemSize + t] = n, this;
  }
  getX(e) {
    let t = this.array[e * this.itemSize];
    return this.normalized && (t = jt(t, this.array)), t;
  }
  setX(e, t) {
    return this.normalized && (t = et(t, this.array)), this.array[e * this.itemSize] = t, this;
  }
  getY(e) {
    let t = this.array[e * this.itemSize + 1];
    return this.normalized && (t = jt(t, this.array)), t;
  }
  setY(e, t) {
    return this.normalized && (t = et(t, this.array)), this.array[e * this.itemSize + 1] = t, this;
  }
  getZ(e) {
    let t = this.array[e * this.itemSize + 2];
    return this.normalized && (t = jt(t, this.array)), t;
  }
  setZ(e, t) {
    return this.normalized && (t = et(t, this.array)), this.array[e * this.itemSize + 2] = t, this;
  }
  getW(e) {
    let t = this.array[e * this.itemSize + 3];
    return this.normalized && (t = jt(t, this.array)), t;
  }
  setW(e, t) {
    return this.normalized && (t = et(t, this.array)), this.array[e * this.itemSize + 3] = t, this;
  }
  setXY(e, t, n) {
    return e *= this.itemSize, this.normalized && (t = et(t, this.array), n = et(n, this.array)), this.array[e + 0] = t, this.array[e + 1] = n, this;
  }
  setXYZ(e, t, n, i) {
    return e *= this.itemSize, this.normalized && (t = et(t, this.array), n = et(n, this.array), i = et(i, this.array)), this.array[e + 0] = t, this.array[e + 1] = n, this.array[e + 2] = i, this;
  }
  setXYZW(e, t, n, i, s) {
    return e *= this.itemSize, this.normalized && (t = et(t, this.array), n = et(n, this.array), i = et(i, this.array), s = et(s, this.array)), this.array[e + 0] = t, this.array[e + 1] = n, this.array[e + 2] = i, this.array[e + 3] = s, this;
  }
  onUpload(e) {
    return this.onUploadCallback = e, this;
  }
  clone() {
    return new this.constructor(this.array, this.itemSize).copy(this);
  }
  toJSON() {
    const e = {
      itemSize: this.itemSize,
      type: this.array.constructor.name,
      array: Array.from(this.array),
      normalized: this.normalized
    };
    return this.name !== "" && (e.name = this.name), this.usage !== 35044 && (e.usage = this.usage), e;
  }
}, ul = class extends wt {
  constructor(e, t, n) {
    super(new Uint16Array(e), t, n);
  }
}, dl = class extends wt {
  constructor(e, t, n) {
    super(new Uint32Array(e), t, n);
  }
}, ut = class extends wt {
  constructor(e, t, n) {
    super(new Float32Array(e), t, n);
  }
}, Xh = 0, Bt = /* @__PURE__ */ new Ve(), Mr = /* @__PURE__ */ new pt(), ei = /* @__PURE__ */ new C(), Nt = /* @__PURE__ */ new Gt(), Pi = /* @__PURE__ */ new Gt(), vt = /* @__PURE__ */ new C(), Lt = class fl extends Gn {
  constructor() {
    super(), this.isBufferGeometry = !0, Object.defineProperty(this, "id", { value: Xh++ }), this.uuid = Ht(), this.name = "", this.type = "BufferGeometry", this.index = null, this.indirect = null, this.attributes = {}, this.morphAttributes = {}, this.morphTargetsRelative = !1, this.groups = [], this.boundingBox = null, this.boundingSphere = null, this.drawRange = {
      start: 0,
      count: 1 / 0
    }, this.userData = {};
  }
  getIndex() {
    return this.index;
  }
  setIndex(t) {
    return Array.isArray(t) ? this.index = new (rl(t) ? dl : ul)(t, 1) : this.index = t, this;
  }
  setIndirect(t) {
    return this.indirect = t, this;
  }
  getIndirect() {
    return this.indirect;
  }
  getAttribute(t) {
    return this.attributes[t];
  }
  setAttribute(t, n) {
    return this.attributes[t] = n, this;
  }
  deleteAttribute(t) {
    return delete this.attributes[t], this;
  }
  hasAttribute(t) {
    return this.attributes[t] !== void 0;
  }
  addGroup(t, n, i = 0) {
    this.groups.push({
      start: t,
      count: n,
      materialIndex: i
    });
  }
  clearGroups() {
    this.groups = [];
  }
  setDrawRange(t, n) {
    this.drawRange.start = t, this.drawRange.count = n;
  }
  applyMatrix4(t) {
    const n = this.attributes.position;
    n !== void 0 && (n.applyMatrix4(t), n.needsUpdate = !0);
    const i = this.attributes.normal;
    if (i !== void 0) {
      const r = new qe().getNormalMatrix(t);
      i.applyNormalMatrix(r), i.needsUpdate = !0;
    }
    const s = this.attributes.tangent;
    return s !== void 0 && (s.transformDirection(t), s.needsUpdate = !0), this.boundingBox !== null && this.computeBoundingBox(), this.boundingSphere !== null && this.computeBoundingSphere(), this;
  }
  applyQuaternion(t) {
    return Bt.makeRotationFromQuaternion(t), this.applyMatrix4(Bt), this;
  }
  rotateX(t) {
    return Bt.makeRotationX(t), this.applyMatrix4(Bt), this;
  }
  rotateY(t) {
    return Bt.makeRotationY(t), this.applyMatrix4(Bt), this;
  }
  rotateZ(t) {
    return Bt.makeRotationZ(t), this.applyMatrix4(Bt), this;
  }
  translate(t, n, i) {
    return Bt.makeTranslation(t, n, i), this.applyMatrix4(Bt), this;
  }
  scale(t, n, i) {
    return Bt.makeScale(t, n, i), this.applyMatrix4(Bt), this;
  }
  lookAt(t) {
    return Mr.lookAt(t), Mr.updateMatrix(), this.applyMatrix4(Mr.matrix), this;
  }
  center() {
    return this.computeBoundingBox(), this.boundingBox.getCenter(ei).negate(), this.translate(ei.x, ei.y, ei.z), this;
  }
  setFromPoints(t) {
    const n = this.getAttribute("position");
    if (n === void 0) {
      const i = [];
      for (let s = 0, r = t.length; s < r; s++) {
        const o = t[s];
        i.push(o.x, o.y, o.z || 0);
      }
      this.setAttribute("position", new ut(i, 3));
    } else {
      const i = Math.min(t.length, n.count);
      for (let s = 0; s < i; s++) {
        const r = t[s];
        n.setXYZ(s, r.x, r.y, r.z || 0);
      }
      t.length > n.count && console.warn("THREE.BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."), n.needsUpdate = !0;
    }
    return this;
  }
  computeBoundingBox() {
    this.boundingBox === null && (this.boundingBox = new Gt());
    const t = this.attributes.position, n = this.morphAttributes.position;
    if (t && t.isGLBufferAttribute) {
      console.error("THREE.BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.", this), this.boundingBox.set(new C(-1 / 0, -1 / 0, -1 / 0), new C(1 / 0, 1 / 0, 1 / 0));
      return;
    }
    if (t !== void 0) {
      if (this.boundingBox.setFromBufferAttribute(t), n) for (let i = 0, s = n.length; i < s; i++) {
        const r = n[i];
        Nt.setFromBufferAttribute(r), this.morphTargetsRelative ? (vt.addVectors(this.boundingBox.min, Nt.min), this.boundingBox.expandByPoint(vt), vt.addVectors(this.boundingBox.max, Nt.max), this.boundingBox.expandByPoint(vt)) : (this.boundingBox.expandByPoint(Nt.min), this.boundingBox.expandByPoint(Nt.max));
      }
    } else this.boundingBox.makeEmpty();
    (isNaN(this.boundingBox.min.x) || isNaN(this.boundingBox.min.y) || isNaN(this.boundingBox.min.z)) && console.error('THREE.BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.', this);
  }
  computeBoundingSphere() {
    this.boundingSphere === null && (this.boundingSphere = new sn());
    const t = this.attributes.position, n = this.morphAttributes.position;
    if (t && t.isGLBufferAttribute) {
      console.error("THREE.BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.", this), this.boundingSphere.set(new C(), 1 / 0);
      return;
    }
    if (t) {
      const i = this.boundingSphere.center;
      if (Nt.setFromBufferAttribute(t), n) for (let r = 0, o = n.length; r < o; r++) {
        const a = n[r];
        Pi.setFromBufferAttribute(a), this.morphTargetsRelative ? (vt.addVectors(Nt.min, Pi.min), Nt.expandByPoint(vt), vt.addVectors(Nt.max, Pi.max), Nt.expandByPoint(vt)) : (Nt.expandByPoint(Pi.min), Nt.expandByPoint(Pi.max));
      }
      Nt.getCenter(i);
      let s = 0;
      for (let r = 0, o = t.count; r < o; r++)
        vt.fromBufferAttribute(t, r), s = Math.max(s, i.distanceToSquared(vt));
      if (n) for (let r = 0, o = n.length; r < o; r++) {
        const a = n[r], l = this.morphTargetsRelative;
        for (let c = 0, h = a.count; c < h; c++)
          vt.fromBufferAttribute(a, c), l && (ei.fromBufferAttribute(t, c), vt.add(ei)), s = Math.max(s, i.distanceToSquared(vt));
      }
      this.boundingSphere.radius = Math.sqrt(s), isNaN(this.boundingSphere.radius) && console.error('THREE.BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.', this);
    }
  }
  computeTangents() {
    const t = this.index, n = this.attributes;
    if (t === null || n.position === void 0 || n.normal === void 0 || n.uv === void 0) {
      console.error("THREE.BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");
      return;
    }
    const i = n.position, s = n.normal, r = n.uv;
    this.hasAttribute("tangent") === !1 && this.setAttribute("tangent", new wt(new Float32Array(4 * i.count), 4));
    const o = this.getAttribute("tangent"), a = [], l = [];
    for (let I = 0; I < i.count; I++)
      a[I] = new C(), l[I] = new C();
    const c = new C(), h = new C(), u = new C(), d = new re(), p = new re(), _ = new re(), g = new C(), m = new C();
    function f(I, M, E) {
      c.fromBufferAttribute(i, I), h.fromBufferAttribute(i, M), u.fromBufferAttribute(i, E), d.fromBufferAttribute(r, I), p.fromBufferAttribute(r, M), _.fromBufferAttribute(r, E), h.sub(c), u.sub(c), p.sub(d), _.sub(d);
      const P = 1 / (p.x * _.y - _.x * p.y);
      isFinite(P) && (g.copy(h).multiplyScalar(_.y).addScaledVector(u, -p.y).multiplyScalar(P), m.copy(u).multiplyScalar(p.x).addScaledVector(h, -_.x).multiplyScalar(P), a[I].add(g), a[M].add(g), a[E].add(g), l[I].add(m), l[M].add(m), l[E].add(m));
    }
    let y = this.groups;
    y.length === 0 && (y = [{
      start: 0,
      count: t.count
    }]);
    for (let I = 0, M = y.length; I < M; ++I) {
      const E = y[I], P = E.start, F = E.count;
      for (let H = P, B = P + F; H < B; H += 3) f(t.getX(H + 0), t.getX(H + 1), t.getX(H + 2));
    }
    const v = new C(), S = new C(), A = new C(), b = new C();
    function R(I) {
      A.fromBufferAttribute(s, I), b.copy(A);
      const M = a[I];
      v.copy(M), v.sub(A.multiplyScalar(A.dot(M))).normalize(), S.crossVectors(b, M);
      const E = S.dot(l[I]) < 0 ? -1 : 1;
      o.setXYZW(I, v.x, v.y, v.z, E);
    }
    for (let I = 0, M = y.length; I < M; ++I) {
      const E = y[I], P = E.start, F = E.count;
      for (let H = P, B = P + F; H < B; H += 3)
        R(t.getX(H + 0)), R(t.getX(H + 1)), R(t.getX(H + 2));
    }
  }
  computeVertexNormals() {
    const t = this.index, n = this.getAttribute("position");
    if (n !== void 0) {
      let i = this.getAttribute("normal");
      if (i === void 0)
        i = new wt(new Float32Array(n.count * 3), 3), this.setAttribute("normal", i);
      else for (let d = 0, p = i.count; d < p; d++) i.setXYZ(d, 0, 0, 0);
      const s = new C(), r = new C(), o = new C(), a = new C(), l = new C(), c = new C(), h = new C(), u = new C();
      if (t) for (let d = 0, p = t.count; d < p; d += 3) {
        const _ = t.getX(d + 0), g = t.getX(d + 1), m = t.getX(d + 2);
        s.fromBufferAttribute(n, _), r.fromBufferAttribute(n, g), o.fromBufferAttribute(n, m), h.subVectors(o, r), u.subVectors(s, r), h.cross(u), a.fromBufferAttribute(i, _), l.fromBufferAttribute(i, g), c.fromBufferAttribute(i, m), a.add(h), l.add(h), c.add(h), i.setXYZ(_, a.x, a.y, a.z), i.setXYZ(g, l.x, l.y, l.z), i.setXYZ(m, c.x, c.y, c.z);
      }
      else for (let d = 0, p = n.count; d < p; d += 3)
        s.fromBufferAttribute(n, d + 0), r.fromBufferAttribute(n, d + 1), o.fromBufferAttribute(n, d + 2), h.subVectors(o, r), u.subVectors(s, r), h.cross(u), i.setXYZ(d + 0, h.x, h.y, h.z), i.setXYZ(d + 1, h.x, h.y, h.z), i.setXYZ(d + 2, h.x, h.y, h.z);
      this.normalizeNormals(), i.needsUpdate = !0;
    }
  }
  normalizeNormals() {
    const t = this.attributes.normal;
    for (let n = 0, i = t.count; n < i; n++)
      vt.fromBufferAttribute(t, n), vt.normalize(), t.setXYZ(n, vt.x, vt.y, vt.z);
  }
  toNonIndexed() {
    function t(a, l) {
      const c = a.array, h = a.itemSize, u = a.normalized, d = new c.constructor(l.length * h);
      let p = 0, _ = 0;
      for (let g = 0, m = l.length; g < m; g++) {
        a.isInterleavedBufferAttribute ? p = l[g] * a.data.stride + a.offset : p = l[g] * h;
        for (let f = 0; f < h; f++) d[_++] = c[p++];
      }
      return new wt(d, h, u);
    }
    if (this.index === null)
      return console.warn("THREE.BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."), this;
    const n = new fl(), i = this.index.array, s = this.attributes;
    for (const a in s) {
      const l = s[a], c = t(l, i);
      n.setAttribute(a, c);
    }
    const r = this.morphAttributes;
    for (const a in r) {
      const l = [], c = r[a];
      for (let h = 0, u = c.length; h < u; h++) {
        const d = c[h], p = t(d, i);
        l.push(p);
      }
      n.morphAttributes[a] = l;
    }
    n.morphTargetsRelative = this.morphTargetsRelative;
    const o = this.groups;
    for (let a = 0, l = o.length; a < l; a++) {
      const c = o[a];
      n.addGroup(c.start, c.count, c.materialIndex);
    }
    return n;
  }
  toJSON() {
    const t = { metadata: {
      version: 4.7,
      type: "BufferGeometry",
      generator: "BufferGeometry.toJSON"
    } };
    if (t.uuid = this.uuid, t.type = this.type, this.name !== "" && (t.name = this.name), Object.keys(this.userData).length > 0 && (t.userData = this.userData), this.parameters !== void 0) {
      const l = this.parameters;
      for (const c in l) l[c] !== void 0 && (t[c] = l[c]);
      return t;
    }
    t.data = { attributes: {} };
    const n = this.index;
    n !== null && (t.data.index = {
      type: n.array.constructor.name,
      array: Array.prototype.slice.call(n.array)
    });
    const i = this.attributes;
    for (const l in i) {
      const c = i[l];
      t.data.attributes[l] = c.toJSON(t.data);
    }
    const s = {};
    let r = !1;
    for (const l in this.morphAttributes) {
      const c = this.morphAttributes[l], h = [];
      for (let u = 0, d = c.length; u < d; u++) {
        const p = c[u];
        h.push(p.toJSON(t.data));
      }
      h.length > 0 && (s[l] = h, r = !0);
    }
    r && (t.data.morphAttributes = s, t.data.morphTargetsRelative = this.morphTargetsRelative);
    const o = this.groups;
    o.length > 0 && (t.data.groups = JSON.parse(JSON.stringify(o)));
    const a = this.boundingSphere;
    return a !== null && (t.data.boundingSphere = a.toJSON()), t;
  }
  clone() {
    return new this.constructor().copy(this);
  }
  copy(t) {
    this.index = null, this.attributes = {}, this.morphAttributes = {}, this.groups = [], this.boundingBox = null, this.boundingSphere = null;
    const n = {};
    this.name = t.name;
    const i = t.index;
    i !== null && this.setIndex(i.clone());
    const s = t.attributes;
    for (const c in s) {
      const h = s[c];
      this.setAttribute(c, h.clone(n));
    }
    const r = t.morphAttributes;
    for (const c in r) {
      const h = [], u = r[c];
      for (let d = 0, p = u.length; d < p; d++) h.push(u[d].clone(n));
      this.morphAttributes[c] = h;
    }
    this.morphTargetsRelative = t.morphTargetsRelative;
    const o = t.groups;
    for (let c = 0, h = o.length; c < h; c++) {
      const u = o[c];
      this.addGroup(u.start, u.count, u.materialIndex);
    }
    const a = t.boundingBox;
    a !== null && (this.boundingBox = a.clone());
    const l = t.boundingSphere;
    return l !== null && (this.boundingSphere = l.clone()), this.drawRange.start = t.drawRange.start, this.drawRange.count = t.drawRange.count, this.userData = t.userData, this;
  }
  dispose() {
    this.dispatchEvent({ type: "dispose" });
  }
}, Bo = /* @__PURE__ */ new Ve(), In = /* @__PURE__ */ new ns(), gs = /* @__PURE__ */ new sn(), zo = /* @__PURE__ */ new C(), _s = /* @__PURE__ */ new C(), vs = /* @__PURE__ */ new C(), xs = /* @__PURE__ */ new C(), Sr = /* @__PURE__ */ new C(), ys = /* @__PURE__ */ new C(), ko = /* @__PURE__ */ new C(), Ms = /* @__PURE__ */ new C(), Tt = class extends pt {
  constructor(e = new Lt(), t = new zn()) {
    super(), this.isMesh = !0, this.type = "Mesh", this.geometry = e, this.material = t, this.morphTargetDictionary = void 0, this.morphTargetInfluences = void 0, this.count = 1, this.updateMorphTargets();
  }
  copy(e, t) {
    return super.copy(e, t), e.morphTargetInfluences !== void 0 && (this.morphTargetInfluences = e.morphTargetInfluences.slice()), e.morphTargetDictionary !== void 0 && (this.morphTargetDictionary = Object.assign({}, e.morphTargetDictionary)), this.material = Array.isArray(e.material) ? e.material.slice() : e.material, this.geometry = e.geometry, this;
  }
  updateMorphTargets() {
    const e = this.geometry.morphAttributes, t = Object.keys(e);
    if (t.length > 0) {
      const n = e[t[0]];
      if (n !== void 0) {
        this.morphTargetInfluences = [], this.morphTargetDictionary = {};
        for (let i = 0, s = n.length; i < s; i++) {
          const r = n[i].name || String(i);
          this.morphTargetInfluences.push(0), this.morphTargetDictionary[r] = i;
        }
      }
    }
  }
  getVertexPosition(e, t) {
    const n = this.geometry, i = n.attributes.position, s = n.morphAttributes.position, r = n.morphTargetsRelative;
    t.fromBufferAttribute(i, e);
    const o = this.morphTargetInfluences;
    if (s && o) {
      ys.set(0, 0, 0);
      for (let a = 0, l = s.length; a < l; a++) {
        const c = o[a], h = s[a];
        c !== 0 && (Sr.fromBufferAttribute(h, e), r ? ys.addScaledVector(Sr, c) : ys.addScaledVector(Sr.sub(t), c));
      }
      t.add(ys);
    }
    return t;
  }
  raycast(e, t) {
    const n = this.geometry, i = this.material, s = this.matrixWorld;
    i !== void 0 && (n.boundingSphere === null && n.computeBoundingSphere(), gs.copy(n.boundingSphere), gs.applyMatrix4(s), In.copy(e.ray).recast(e.near), !(gs.containsPoint(In.origin) === !1 && (In.intersectSphere(gs, zo) === null || In.origin.distanceToSquared(zo) > (e.far - e.near) ** 2)) && (Bo.copy(s).invert(), In.copy(e.ray).applyMatrix4(Bo), !(n.boundingBox !== null && In.intersectsBox(n.boundingBox) === !1) && this._computeIntersections(e, t, In)));
  }
  _computeIntersections(e, t, n) {
    let i;
    const s = this.geometry, r = this.material, o = s.index, a = s.attributes.position, l = s.attributes.uv, c = s.attributes.uv1, h = s.attributes.normal, u = s.groups, d = s.drawRange;
    if (o !== null) if (Array.isArray(r)) for (let p = 0, _ = u.length; p < _; p++) {
      const g = u[p], m = r[g.materialIndex], f = Math.max(g.start, d.start), y = Math.min(o.count, Math.min(g.start + g.count, d.start + d.count));
      for (let v = f, S = y; v < S; v += 3) {
        const A = o.getX(v), b = o.getX(v + 1), R = o.getX(v + 2);
        i = Ss(this, m, e, n, l, c, h, A, b, R), i && (i.faceIndex = Math.floor(v / 3), i.face.materialIndex = g.materialIndex, t.push(i));
      }
    }
    else {
      const p = Math.max(0, d.start), _ = Math.min(o.count, d.start + d.count);
      for (let g = p, m = _; g < m; g += 3) {
        const f = o.getX(g), y = o.getX(g + 1), v = o.getX(g + 2);
        i = Ss(this, r, e, n, l, c, h, f, y, v), i && (i.faceIndex = Math.floor(g / 3), t.push(i));
      }
    }
    else if (a !== void 0) if (Array.isArray(r)) for (let p = 0, _ = u.length; p < _; p++) {
      const g = u[p], m = r[g.materialIndex], f = Math.max(g.start, d.start), y = Math.min(a.count, Math.min(g.start + g.count, d.start + d.count));
      for (let v = f, S = y; v < S; v += 3) {
        const A = v, b = v + 1, R = v + 2;
        i = Ss(this, m, e, n, l, c, h, A, b, R), i && (i.faceIndex = Math.floor(v / 3), i.face.materialIndex = g.materialIndex, t.push(i));
      }
    }
    else {
      const p = Math.max(0, d.start), _ = Math.min(a.count, d.start + d.count);
      for (let g = p, m = _; g < m; g += 3) {
        const f = g, y = g + 1, v = g + 2;
        i = Ss(this, r, e, n, l, c, h, f, y, v), i && (i.faceIndex = Math.floor(g / 3), t.push(i));
      }
    }
  }
};
function Yh(e, t, n, i, s, r, o, a) {
  let l;
  if (t.side === 1 ? l = i.intersectTriangle(o, r, s, !0, a) : l = i.intersectTriangle(s, r, o, t.side === 0, a), l === null) return null;
  Ms.copy(a), Ms.applyMatrix4(e.matrixWorld);
  const c = n.ray.origin.distanceTo(Ms);
  return c < n.near || c > n.far ? null : {
    distance: c,
    point: Ms.clone(),
    object: e
  };
}
function Ss(e, t, n, i, s, r, o, a, l, c) {
  e.getVertexPosition(a, _s), e.getVertexPosition(l, vs), e.getVertexPosition(c, xs);
  const h = Yh(e, t, n, i, _s, vs, xs, ko);
  if (h) {
    const u = new C();
    Ci.getBarycoord(ko, _s, vs, xs, u), s && (h.uv = Ci.getInterpolatedAttribute(s, a, l, c, u, new re())), r && (h.uv1 = Ci.getInterpolatedAttribute(r, a, l, c, u, new re())), o && (h.normal = Ci.getInterpolatedAttribute(o, a, l, c, u, new C()), h.normal.dot(i.direction) > 0 && h.normal.multiplyScalar(-1));
    const d = {
      a,
      b: l,
      c,
      normal: new C(),
      materialIndex: 0
    };
    Ci.getNormal(_s, vs, xs, d.normal), h.face = d, h.barycoord = u;
  }
  return h;
}
var is = class pl extends Lt {
  constructor(t = 1, n = 1, i = 1, s = 1, r = 1, o = 1) {
    super(), this.type = "BoxGeometry", this.parameters = {
      width: t,
      height: n,
      depth: i,
      widthSegments: s,
      heightSegments: r,
      depthSegments: o
    };
    const a = this;
    s = Math.floor(s), r = Math.floor(r), o = Math.floor(o);
    const l = [], c = [], h = [], u = [];
    let d = 0, p = 0;
    _("z", "y", "x", -1, -1, i, n, t, o, r, 0), _("z", "y", "x", 1, -1, i, n, -t, o, r, 1), _("x", "z", "y", 1, 1, t, i, n, s, o, 2), _("x", "z", "y", 1, -1, t, i, -n, s, o, 3), _("x", "y", "z", 1, -1, t, n, i, s, r, 4), _("x", "y", "z", -1, -1, t, n, -i, s, r, 5), this.setIndex(l), this.setAttribute("position", new ut(c, 3)), this.setAttribute("normal", new ut(h, 3)), this.setAttribute("uv", new ut(u, 2));
    function _(g, m, f, y, v, S, A, b, R, I, M) {
      const E = S / R, P = A / I, F = S / 2, H = A / 2, B = b / 2, j = R + 1, V = I + 1;
      let te = 0, W = 0;
      const ee = new C();
      for (let pe = 0; pe < V; pe++) {
        const De = pe * P - H;
        for (let Ne = 0; Ne < j; Ne++)
          ee[g] = (Ne * E - F) * y, ee[m] = De * v, ee[f] = B, c.push(ee.x, ee.y, ee.z), ee[g] = 0, ee[m] = 0, ee[f] = b > 0 ? 1 : -1, h.push(ee.x, ee.y, ee.z), u.push(Ne / R), u.push(1 - pe / I), te += 1;
      }
      for (let pe = 0; pe < I; pe++) for (let De = 0; De < R; De++) {
        const Ne = d + De + j * pe, Qe = d + De + j * (pe + 1), Ke = d + (De + 1) + j * (pe + 1), Y = d + (De + 1) + j * pe;
        l.push(Ne, Qe, Y), l.push(Qe, Ke, Y), W += 6;
      }
      a.addGroup(p, W, M), p += W, d += te;
    }
  }
  copy(t) {
    return super.copy(t), this.parameters = Object.assign({}, t.parameters), this;
  }
  static fromJSON(t) {
    return new pl(t.width, t.height, t.depth, t.widthSegments, t.heightSegments, t.depthSegments);
  }
};
function gi(e) {
  const t = {};
  for (const n in e) {
    t[n] = {};
    for (const i in e[n]) {
      const s = e[n][i];
      s && (s.isColor || s.isMatrix3 || s.isMatrix4 || s.isVector2 || s.isVector3 || s.isVector4 || s.isTexture || s.isQuaternion) ? s.isRenderTargetTexture ? (console.warn("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."), t[n][i] = null) : t[n][i] = s.clone() : Array.isArray(s) ? t[n][i] = s.slice() : t[n][i] = s;
    }
  }
  return t;
}
function At(e) {
  const t = {};
  for (let n = 0; n < e.length; n++) {
    const i = gi(e[n]);
    for (const s in i) t[s] = i[s];
  }
  return t;
}
function qh(e) {
  const t = [];
  for (let n = 0; n < e.length; n++) t.push(e[n].clone());
  return t;
}
function ml(e) {
  const t = e.getRenderTarget();
  return t === null ? e.outputColorSpace : t.isXRRenderTarget === !0 ? t.texture.colorSpace : Ze.workingColorSpace;
}
var Kh = {
  clone: gi,
  merge: At
}, jh = `void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`, Zh = `void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`, wn = class extends tn {
  constructor(e) {
    super(), this.isShaderMaterial = !0, this.type = "ShaderMaterial", this.defines = {}, this.uniforms = {}, this.uniformsGroups = [], this.vertexShader = jh, this.fragmentShader = Zh, this.linewidth = 1, this.wireframe = !1, this.wireframeLinewidth = 1, this.fog = !1, this.lights = !1, this.clipping = !1, this.forceSinglePass = !0, this.extensions = {
      clipCullDistance: !1,
      multiDraw: !1
    }, this.defaultAttributeValues = {
      color: [
        1,
        1,
        1
      ],
      uv: [0, 0],
      uv1: [0, 0]
    }, this.index0AttributeName = void 0, this.uniformsNeedUpdate = !1, this.glslVersion = null, e !== void 0 && this.setValues(e);
  }
  copy(e) {
    return super.copy(e), this.fragmentShader = e.fragmentShader, this.vertexShader = e.vertexShader, this.uniforms = gi(e.uniforms), this.uniformsGroups = qh(e.uniformsGroups), this.defines = Object.assign({}, e.defines), this.wireframe = e.wireframe, this.wireframeLinewidth = e.wireframeLinewidth, this.fog = e.fog, this.lights = e.lights, this.clipping = e.clipping, this.extensions = Object.assign({}, e.extensions), this.glslVersion = e.glslVersion, this;
  }
  toJSON(e) {
    const t = super.toJSON(e);
    t.glslVersion = this.glslVersion, t.uniforms = {};
    for (const i in this.uniforms) {
      const s = this.uniforms[i].value;
      s && s.isTexture ? t.uniforms[i] = {
        type: "t",
        value: s.toJSON(e).uuid
      } : s && s.isColor ? t.uniforms[i] = {
        type: "c",
        value: s.getHex()
      } : s && s.isVector2 ? t.uniforms[i] = {
        type: "v2",
        value: s.toArray()
      } : s && s.isVector3 ? t.uniforms[i] = {
        type: "v3",
        value: s.toArray()
      } : s && s.isVector4 ? t.uniforms[i] = {
        type: "v4",
        value: s.toArray()
      } : s && s.isMatrix3 ? t.uniforms[i] = {
        type: "m3",
        value: s.toArray()
      } : s && s.isMatrix4 ? t.uniforms[i] = {
        type: "m4",
        value: s.toArray()
      } : t.uniforms[i] = { value: s };
    }
    Object.keys(this.defines).length > 0 && (t.defines = this.defines), t.vertexShader = this.vertexShader, t.fragmentShader = this.fragmentShader, t.lights = this.lights, t.clipping = this.clipping;
    const n = {};
    for (const i in this.extensions) this.extensions[i] === !0 && (n[i] = !0);
    return Object.keys(n).length > 0 && (t.extensions = n), t;
  }
}, gl = class extends pt {
  constructor() {
    super(), this.isCamera = !0, this.type = "Camera", this.matrixWorldInverse = new Ve(), this.projectionMatrix = new Ve(), this.projectionMatrixInverse = new Ve(), this.coordinateSystem = pi, this._reversedDepth = !1;
  }
  get reversedDepth() {
    return this._reversedDepth;
  }
  copy(e, t) {
    return super.copy(e, t), this.matrixWorldInverse.copy(e.matrixWorldInverse), this.projectionMatrix.copy(e.projectionMatrix), this.projectionMatrixInverse.copy(e.projectionMatrixInverse), this.coordinateSystem = e.coordinateSystem, this;
  }
  getWorldDirection(e) {
    return super.getWorldDirection(e).negate();
  }
  updateMatrixWorld(e) {
    super.updateMatrixWorld(e), this.matrixWorldInverse.copy(this.matrixWorld).invert();
  }
  updateWorldMatrix(e, t) {
    super.updateWorldMatrix(e, t), this.matrixWorldInverse.copy(this.matrixWorld).invert();
  }
  clone() {
    return new this.constructor().copy(this);
  }
}, Sn = /* @__PURE__ */ new C(), Ho = /* @__PURE__ */ new re(), Vo = /* @__PURE__ */ new re(), Ct = class extends gl {
  constructor(e = 50, t = 1, n = 0.1, i = 2e3) {
    super(), this.isPerspectiveCamera = !0, this.type = "PerspectiveCamera", this.fov = e, this.zoom = 1, this.near = n, this.far = i, this.focus = 10, this.aspect = t, this.view = null, this.filmGauge = 35, this.filmOffset = 0, this.updateProjectionMatrix();
  }
  copy(e, t) {
    return super.copy(e, t), this.fov = e.fov, this.zoom = e.zoom, this.near = e.near, this.far = e.far, this.focus = e.focus, this.aspect = e.aspect, this.view = e.view === null ? null : Object.assign({}, e.view), this.filmGauge = e.filmGauge, this.filmOffset = e.filmOffset, this;
  }
  setFocalLength(e) {
    const t = 0.5 * this.getFilmHeight() / e;
    this.fov = mi * 2 * Math.atan(t), this.updateProjectionMatrix();
  }
  getFocalLength() {
    const e = Math.tan(zi * 0.5 * this.fov);
    return 0.5 * this.getFilmHeight() / e;
  }
  getEffectiveFOV() {
    return mi * 2 * Math.atan(Math.tan(zi * 0.5 * this.fov) / this.zoom);
  }
  getFilmWidth() {
    return this.filmGauge * Math.min(this.aspect, 1);
  }
  getFilmHeight() {
    return this.filmGauge / Math.max(this.aspect, 1);
  }
  getViewBounds(e, t, n) {
    Sn.set(-1, -1, 0.5).applyMatrix4(this.projectionMatrixInverse), t.set(Sn.x, Sn.y).multiplyScalar(-e / Sn.z), Sn.set(1, 1, 0.5).applyMatrix4(this.projectionMatrixInverse), n.set(Sn.x, Sn.y).multiplyScalar(-e / Sn.z);
  }
  getViewSize(e, t) {
    return this.getViewBounds(e, Ho, Vo), t.subVectors(Vo, Ho);
  }
  setViewOffset(e, t, n, i, s, r) {
    this.aspect = e / t, this.view === null && (this.view = {
      enabled: !0,
      fullWidth: 1,
      fullHeight: 1,
      offsetX: 0,
      offsetY: 0,
      width: 1,
      height: 1
    }), this.view.enabled = !0, this.view.fullWidth = e, this.view.fullHeight = t, this.view.offsetX = n, this.view.offsetY = i, this.view.width = s, this.view.height = r, this.updateProjectionMatrix();
  }
  clearViewOffset() {
    this.view !== null && (this.view.enabled = !1), this.updateProjectionMatrix();
  }
  updateProjectionMatrix() {
    const e = this.near;
    let t = e * Math.tan(zi * 0.5 * this.fov) / this.zoom, n = 2 * t, i = this.aspect * n, s = -0.5 * i;
    const r = this.view;
    if (this.view !== null && this.view.enabled) {
      const a = r.fullWidth, l = r.fullHeight;
      s += r.offsetX * i / a, t -= r.offsetY * n / l, i *= r.width / a, n *= r.height / l;
    }
    const o = this.filmOffset;
    o !== 0 && (s += e * o / this.getFilmWidth()), this.projectionMatrix.makePerspective(s, s + i, t, t - n, e, this.far, this.coordinateSystem, this.reversedDepth), this.projectionMatrixInverse.copy(this.projectionMatrix).invert();
  }
  toJSON(e) {
    const t = super.toJSON(e);
    return t.object.fov = this.fov, t.object.zoom = this.zoom, t.object.near = this.near, t.object.far = this.far, t.object.focus = this.focus, t.object.aspect = this.aspect, this.view !== null && (t.object.view = Object.assign({}, this.view)), t.object.filmGauge = this.filmGauge, t.object.filmOffset = this.filmOffset, t;
  }
}, ti = -90, ni = 1, Jh = class extends pt {
  constructor(e, t, n) {
    super(), this.type = "CubeCamera", this.renderTarget = n, this.coordinateSystem = null, this.activeMipmapLevel = 0;
    const i = new Ct(ti, ni, e, t);
    i.layers = this.layers, this.add(i);
    const s = new Ct(ti, ni, e, t);
    s.layers = this.layers, this.add(s);
    const r = new Ct(ti, ni, e, t);
    r.layers = this.layers, this.add(r);
    const o = new Ct(ti, ni, e, t);
    o.layers = this.layers, this.add(o);
    const a = new Ct(ti, ni, e, t);
    a.layers = this.layers, this.add(a);
    const l = new Ct(ti, ni, e, t);
    l.layers = this.layers, this.add(l);
  }
  updateCoordinateSystem() {
    const e = this.coordinateSystem, t = this.children.concat(), [n, i, s, r, o, a] = t;
    for (const l of t) this.remove(l);
    if (e === 2e3)
      n.up.set(0, 1, 0), n.lookAt(1, 0, 0), i.up.set(0, 1, 0), i.lookAt(-1, 0, 0), s.up.set(0, 0, -1), s.lookAt(0, 1, 0), r.up.set(0, 0, 1), r.lookAt(0, -1, 0), o.up.set(0, 1, 0), o.lookAt(0, 0, 1), a.up.set(0, 1, 0), a.lookAt(0, 0, -1);
    else if (e === 2001)
      n.up.set(0, -1, 0), n.lookAt(-1, 0, 0), i.up.set(0, -1, 0), i.lookAt(1, 0, 0), s.up.set(0, 0, 1), s.lookAt(0, 1, 0), r.up.set(0, 0, -1), r.lookAt(0, -1, 0), o.up.set(0, -1, 0), o.lookAt(0, 0, 1), a.up.set(0, -1, 0), a.lookAt(0, 0, -1);
    else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: " + e);
    for (const l of t)
      this.add(l), l.updateMatrixWorld();
  }
  update(e, t) {
    this.parent === null && this.updateMatrixWorld();
    const { renderTarget: n, activeMipmapLevel: i } = this;
    this.coordinateSystem !== e.coordinateSystem && (this.coordinateSystem = e.coordinateSystem, this.updateCoordinateSystem());
    const [s, r, o, a, l, c] = this.children, h = e.getRenderTarget(), u = e.getActiveCubeFace(), d = e.getActiveMipmapLevel(), p = e.xr.enabled;
    e.xr.enabled = !1;
    const _ = n.texture.generateMipmaps;
    n.texture.generateMipmaps = !1, e.setRenderTarget(n, 0, i), e.render(t, s), e.setRenderTarget(n, 1, i), e.render(t, r), e.setRenderTarget(n, 2, i), e.render(t, o), e.setRenderTarget(n, 3, i), e.render(t, a), e.setRenderTarget(n, 4, i), e.render(t, l), n.texture.generateMipmaps = _, e.setRenderTarget(n, 5, i), e.render(t, c), e.setRenderTarget(h, u, d), e.xr.enabled = p, n.texture.needsPMREMUpdate = !0;
  }
}, _l = class extends Pt {
  constructor(e = [], t = 301, n, i, s, r, o, a, l, c) {
    super(e, t, n, i, s, r, o, a, l, c), this.isCubeTexture = !0, this.flipY = !1;
  }
  get images() {
    return this.image;
  }
  set images(e) {
    this.image = e;
  }
}, $h = class extends Hn {
  constructor(e = 1, t = {}) {
    super(e, e, t), this.isWebGLCubeRenderTarget = !0;
    const n = {
      width: e,
      height: e,
      depth: 1
    }, i = [
      n,
      n,
      n,
      n,
      n,
      n
    ];
    this.texture = new _l(i), this._setTextureOptions(t), this.texture.isRenderTargetTexture = !0;
  }
  fromEquirectangularTexture(e, t) {
    this.texture.type = t.type, this.texture.colorSpace = t.colorSpace, this.texture.generateMipmaps = t.generateMipmaps, this.texture.minFilter = t.minFilter, this.texture.magFilter = t.magFilter;
    const n = {
      uniforms: { tEquirect: { value: null } },
      vertexShader: `

				varying vec3 vWorldDirection;

				vec3 transformDirection( in vec3 dir, in mat4 matrix ) {

					return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );

				}

				void main() {

					vWorldDirection = transformDirection( position, modelMatrix );

					#include <begin_vertex>
					#include <project_vertex>

				}
			`,
      fragmentShader: `

				uniform sampler2D tEquirect;

				varying vec3 vWorldDirection;

				#include <common>

				void main() {

					vec3 direction = normalize( vWorldDirection );

					vec2 sampleUV = equirectUv( direction );

					gl_FragColor = texture2D( tEquirect, sampleUV );

				}
			`
    }, i = new is(5, 5, 5), s = new wn({
      name: "CubemapFromEquirect",
      uniforms: gi(n.uniforms),
      vertexShader: n.vertexShader,
      fragmentShader: n.fragmentShader,
      side: 1,
      blending: 0
    });
    s.uniforms.tEquirect.value = t;
    const r = new Tt(i, s), o = t.minFilter;
    return t.minFilter === 1008 && (t.minFilter = gn), new Jh(1, 10, this).update(e, r), t.minFilter = o, r.geometry.dispose(), r.material.dispose(), this;
  }
  clear(e, t = !0, n = !0, i = !0) {
    const s = e.getRenderTarget();
    for (let r = 0; r < 6; r++)
      e.setRenderTarget(this, r), e.clear(t, n, i);
    e.setRenderTarget(s);
  }
}, fn = class extends pt {
  constructor() {
    super(), this.isGroup = !0, this.type = "Group";
  }
}, Qh = { type: "move" }, Er = class {
  constructor() {
    this._targetRay = null, this._grip = null, this._hand = null;
  }
  getHandSpace() {
    return this._hand === null && (this._hand = new fn(), this._hand.matrixAutoUpdate = !1, this._hand.visible = !1, this._hand.joints = {}, this._hand.inputState = { pinching: !1 }), this._hand;
  }
  getTargetRaySpace() {
    return this._targetRay === null && (this._targetRay = new fn(), this._targetRay.matrixAutoUpdate = !1, this._targetRay.visible = !1, this._targetRay.hasLinearVelocity = !1, this._targetRay.linearVelocity = new C(), this._targetRay.hasAngularVelocity = !1, this._targetRay.angularVelocity = new C()), this._targetRay;
  }
  getGripSpace() {
    return this._grip === null && (this._grip = new fn(), this._grip.matrixAutoUpdate = !1, this._grip.visible = !1, this._grip.hasLinearVelocity = !1, this._grip.linearVelocity = new C(), this._grip.hasAngularVelocity = !1, this._grip.angularVelocity = new C()), this._grip;
  }
  dispatchEvent(e) {
    return this._targetRay !== null && this._targetRay.dispatchEvent(e), this._grip !== null && this._grip.dispatchEvent(e), this._hand !== null && this._hand.dispatchEvent(e), this;
  }
  connect(e) {
    if (e && e.hand) {
      const t = this._hand;
      if (t) for (const n of e.hand.values()) this._getHandJoint(t, n);
    }
    return this.dispatchEvent({
      type: "connected",
      data: e
    }), this;
  }
  disconnect(e) {
    return this.dispatchEvent({
      type: "disconnected",
      data: e
    }), this._targetRay !== null && (this._targetRay.visible = !1), this._grip !== null && (this._grip.visible = !1), this._hand !== null && (this._hand.visible = !1), this;
  }
  update(e, t, n) {
    let i = null, s = null, r = null;
    const o = this._targetRay, a = this._grip, l = this._hand;
    if (e && t.session.visibilityState !== "visible-blurred") {
      if (l && e.hand) {
        r = !0;
        for (const _ of e.hand.values()) {
          const g = t.getJointPose(_, n), m = this._getHandJoint(l, _);
          g !== null && (m.matrix.fromArray(g.transform.matrix), m.matrix.decompose(m.position, m.rotation, m.scale), m.matrixWorldNeedsUpdate = !0, m.jointRadius = g.radius), m.visible = g !== null;
        }
        const c = l.joints["index-finger-tip"], h = l.joints["thumb-tip"], u = c.position.distanceTo(h.position);
        l.inputState.pinching && u > 0.025 ? (l.inputState.pinching = !1, this.dispatchEvent({
          type: "pinchend",
          handedness: e.handedness,
          target: this
        })) : !l.inputState.pinching && u <= 0.02 - 5e-3 && (l.inputState.pinching = !0, this.dispatchEvent({
          type: "pinchstart",
          handedness: e.handedness,
          target: this
        }));
      } else a !== null && e.gripSpace && (s = t.getPose(e.gripSpace, n), s !== null && (a.matrix.fromArray(s.transform.matrix), a.matrix.decompose(a.position, a.rotation, a.scale), a.matrixWorldNeedsUpdate = !0, s.linearVelocity ? (a.hasLinearVelocity = !0, a.linearVelocity.copy(s.linearVelocity)) : a.hasLinearVelocity = !1, s.angularVelocity ? (a.hasAngularVelocity = !0, a.angularVelocity.copy(s.angularVelocity)) : a.hasAngularVelocity = !1));
      o !== null && (i = t.getPose(e.targetRaySpace, n), i === null && s !== null && (i = s), i !== null && (o.matrix.fromArray(i.transform.matrix), o.matrix.decompose(o.position, o.rotation, o.scale), o.matrixWorldNeedsUpdate = !0, i.linearVelocity ? (o.hasLinearVelocity = !0, o.linearVelocity.copy(i.linearVelocity)) : o.hasLinearVelocity = !1, i.angularVelocity ? (o.hasAngularVelocity = !0, o.angularVelocity.copy(i.angularVelocity)) : o.hasAngularVelocity = !1, this.dispatchEvent(Qh)));
    }
    return o !== null && (o.visible = i !== null), a !== null && (a.visible = s !== null), l !== null && (l.visible = r !== null), this;
  }
  _getHandJoint(e, t) {
    if (e.joints[t.jointName] === void 0) {
      const n = new fn();
      n.matrixAutoUpdate = !1, n.visible = !1, e.joints[t.jointName] = n, e.add(n);
    }
    return e.joints[t.jointName];
  }
}, eu = class extends pt {
  constructor() {
    super(), this.isScene = !0, this.type = "Scene", this.background = null, this.environment = null, this.fog = null, this.backgroundBlurriness = 0, this.backgroundIntensity = 1, this.backgroundRotation = new An(), this.environmentIntensity = 1, this.environmentRotation = new An(), this.overrideMaterial = null, typeof __THREE_DEVTOOLS__ < "u" && __THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe", { detail: this }));
  }
  copy(e, t) {
    return super.copy(e, t), e.background !== null && (this.background = e.background.clone()), e.environment !== null && (this.environment = e.environment.clone()), e.fog !== null && (this.fog = e.fog.clone()), this.backgroundBlurriness = e.backgroundBlurriness, this.backgroundIntensity = e.backgroundIntensity, this.backgroundRotation.copy(e.backgroundRotation), this.environmentIntensity = e.environmentIntensity, this.environmentRotation.copy(e.environmentRotation), e.overrideMaterial !== null && (this.overrideMaterial = e.overrideMaterial.clone()), this.matrixAutoUpdate = e.matrixAutoUpdate, this;
  }
  toJSON(e) {
    const t = super.toJSON(e);
    return this.fog !== null && (t.object.fog = this.fog.toJSON()), this.backgroundBlurriness > 0 && (t.object.backgroundBlurriness = this.backgroundBlurriness), this.backgroundIntensity !== 1 && (t.object.backgroundIntensity = this.backgroundIntensity), t.object.backgroundRotation = this.backgroundRotation.toArray(), this.environmentIntensity !== 1 && (t.object.environmentIntensity = this.environmentIntensity), t.object.environmentRotation = this.environmentRotation.toArray(), t;
  }
}, tu = class {
  constructor(e, t) {
    this.isInterleavedBuffer = !0, this.array = e, this.stride = t, this.count = e !== void 0 ? e.length / t : 0, this.usage = tl, this.updateRanges = [], this.version = 0, this.uuid = Ht();
  }
  onUploadCallback() {
  }
  set needsUpdate(e) {
    e === !0 && this.version++;
  }
  setUsage(e) {
    return this.usage = e, this;
  }
  addUpdateRange(e, t) {
    this.updateRanges.push({
      start: e,
      count: t
    });
  }
  clearUpdateRanges() {
    this.updateRanges.length = 0;
  }
  copy(e) {
    return this.array = new e.array.constructor(e.array), this.count = e.count, this.stride = e.stride, this.usage = e.usage, this;
  }
  copyAt(e, t, n) {
    e *= this.stride, n *= t.stride;
    for (let i = 0, s = this.stride; i < s; i++) this.array[e + i] = t.array[n + i];
    return this;
  }
  set(e, t = 0) {
    return this.array.set(e, t), this;
  }
  clone(e) {
    e.arrayBuffers === void 0 && (e.arrayBuffers = {}), this.array.buffer._uuid === void 0 && (this.array.buffer._uuid = Ht()), e.arrayBuffers[this.array.buffer._uuid] === void 0 && (e.arrayBuffers[this.array.buffer._uuid] = this.array.slice(0).buffer);
    const t = new this.array.constructor(e.arrayBuffers[this.array.buffer._uuid]), n = new this.constructor(t, this.stride);
    return n.setUsage(this.usage), n;
  }
  onUpload(e) {
    return this.onUploadCallback = e, this;
  }
  toJSON(e) {
    return e.arrayBuffers === void 0 && (e.arrayBuffers = {}), this.array.buffer._uuid === void 0 && (this.array.buffer._uuid = Ht()), e.arrayBuffers[this.array.buffer._uuid] === void 0 && (e.arrayBuffers[this.array.buffer._uuid] = Array.from(new Uint32Array(this.array.buffer))), {
      uuid: this.uuid,
      buffer: this.array.buffer._uuid,
      type: this.array.constructor.name,
      stride: this.stride
    };
  }
}, bt = /* @__PURE__ */ new C(), nu = class vl {
  constructor(t, n, i, s = !1) {
    this.isInterleavedBufferAttribute = !0, this.name = "", this.data = t, this.itemSize = n, this.offset = i, this.normalized = s;
  }
  get count() {
    return this.data.count;
  }
  get array() {
    return this.data.array;
  }
  set needsUpdate(t) {
    this.data.needsUpdate = t;
  }
  applyMatrix4(t) {
    for (let n = 0, i = this.data.count; n < i; n++)
      bt.fromBufferAttribute(this, n), bt.applyMatrix4(t), this.setXYZ(n, bt.x, bt.y, bt.z);
    return this;
  }
  applyNormalMatrix(t) {
    for (let n = 0, i = this.count; n < i; n++)
      bt.fromBufferAttribute(this, n), bt.applyNormalMatrix(t), this.setXYZ(n, bt.x, bt.y, bt.z);
    return this;
  }
  transformDirection(t) {
    for (let n = 0, i = this.count; n < i; n++)
      bt.fromBufferAttribute(this, n), bt.transformDirection(t), this.setXYZ(n, bt.x, bt.y, bt.z);
    return this;
  }
  getComponent(t, n) {
    let i = this.array[t * this.data.stride + this.offset + n];
    return this.normalized && (i = jt(i, this.array)), i;
  }
  setComponent(t, n, i) {
    return this.normalized && (i = et(i, this.array)), this.data.array[t * this.data.stride + this.offset + n] = i, this;
  }
  setX(t, n) {
    return this.normalized && (n = et(n, this.array)), this.data.array[t * this.data.stride + this.offset] = n, this;
  }
  setY(t, n) {
    return this.normalized && (n = et(n, this.array)), this.data.array[t * this.data.stride + this.offset + 1] = n, this;
  }
  setZ(t, n) {
    return this.normalized && (n = et(n, this.array)), this.data.array[t * this.data.stride + this.offset + 2] = n, this;
  }
  setW(t, n) {
    return this.normalized && (n = et(n, this.array)), this.data.array[t * this.data.stride + this.offset + 3] = n, this;
  }
  getX(t) {
    let n = this.data.array[t * this.data.stride + this.offset];
    return this.normalized && (n = jt(n, this.array)), n;
  }
  getY(t) {
    let n = this.data.array[t * this.data.stride + this.offset + 1];
    return this.normalized && (n = jt(n, this.array)), n;
  }
  getZ(t) {
    let n = this.data.array[t * this.data.stride + this.offset + 2];
    return this.normalized && (n = jt(n, this.array)), n;
  }
  getW(t) {
    let n = this.data.array[t * this.data.stride + this.offset + 3];
    return this.normalized && (n = jt(n, this.array)), n;
  }
  setXY(t, n, i) {
    return t = t * this.data.stride + this.offset, this.normalized && (n = et(n, this.array), i = et(i, this.array)), this.data.array[t + 0] = n, this.data.array[t + 1] = i, this;
  }
  setXYZ(t, n, i, s) {
    return t = t * this.data.stride + this.offset, this.normalized && (n = et(n, this.array), i = et(i, this.array), s = et(s, this.array)), this.data.array[t + 0] = n, this.data.array[t + 1] = i, this.data.array[t + 2] = s, this;
  }
  setXYZW(t, n, i, s, r) {
    return t = t * this.data.stride + this.offset, this.normalized && (n = et(n, this.array), i = et(i, this.array), s = et(s, this.array), r = et(r, this.array)), this.data.array[t + 0] = n, this.data.array[t + 1] = i, this.data.array[t + 2] = s, this.data.array[t + 3] = r, this;
  }
  clone(t) {
    if (t === void 0) {
      console.log("THREE.InterleavedBufferAttribute.clone(): Cloning an interleaved buffer attribute will de-interleave buffer data.");
      const n = [];
      for (let i = 0; i < this.count; i++) {
        const s = i * this.data.stride + this.offset;
        for (let r = 0; r < this.itemSize; r++) n.push(this.data.array[s + r]);
      }
      return new wt(new this.array.constructor(n), this.itemSize, this.normalized);
    } else
      return t.interleavedBuffers === void 0 && (t.interleavedBuffers = {}), t.interleavedBuffers[this.data.uuid] === void 0 && (t.interleavedBuffers[this.data.uuid] = this.data.clone(t)), new vl(t.interleavedBuffers[this.data.uuid], this.itemSize, this.offset, this.normalized);
  }
  toJSON(t) {
    if (t === void 0) {
      console.log("THREE.InterleavedBufferAttribute.toJSON(): Serializing an interleaved buffer attribute will de-interleave buffer data.");
      const n = [];
      for (let i = 0; i < this.count; i++) {
        const s = i * this.data.stride + this.offset;
        for (let r = 0; r < this.itemSize; r++) n.push(this.data.array[s + r]);
      }
      return {
        itemSize: this.itemSize,
        type: this.array.constructor.name,
        array: n,
        normalized: this.normalized
      };
    } else
      return t.interleavedBuffers === void 0 && (t.interleavedBuffers = {}), t.interleavedBuffers[this.data.uuid] === void 0 && (t.interleavedBuffers[this.data.uuid] = this.data.toJSON(t)), {
        isInterleavedBufferAttribute: !0,
        itemSize: this.itemSize,
        data: this.data.uuid,
        offset: this.offset,
        normalized: this.normalized
      };
  }
}, Go = /* @__PURE__ */ new C(), Wo = /* @__PURE__ */ new tt(), Xo = /* @__PURE__ */ new tt(), iu = /* @__PURE__ */ new C(), Yo = /* @__PURE__ */ new Ve(), Es = /* @__PURE__ */ new C(), Tr = /* @__PURE__ */ new sn(), qo = /* @__PURE__ */ new Ve(), br = /* @__PURE__ */ new ns(), su = class extends Tt {
  constructor(e, t) {
    super(e, t), this.isSkinnedMesh = !0, this.type = "SkinnedMesh", this.bindMode = mc, this.bindMatrix = new Ve(), this.bindMatrixInverse = new Ve(), this.boundingBox = null, this.boundingSphere = null;
  }
  computeBoundingBox() {
    const e = this.geometry;
    this.boundingBox === null && (this.boundingBox = new Gt()), this.boundingBox.makeEmpty();
    const t = e.getAttribute("position");
    for (let n = 0; n < t.count; n++)
      this.getVertexPosition(n, Es), this.boundingBox.expandByPoint(Es);
  }
  computeBoundingSphere() {
    const e = this.geometry;
    this.boundingSphere === null && (this.boundingSphere = new sn()), this.boundingSphere.makeEmpty();
    const t = e.getAttribute("position");
    for (let n = 0; n < t.count; n++)
      this.getVertexPosition(n, Es), this.boundingSphere.expandByPoint(Es);
  }
  copy(e, t) {
    return super.copy(e, t), this.bindMode = e.bindMode, this.bindMatrix.copy(e.bindMatrix), this.bindMatrixInverse.copy(e.bindMatrixInverse), this.skeleton = e.skeleton, e.boundingBox !== null && (this.boundingBox = e.boundingBox.clone()), e.boundingSphere !== null && (this.boundingSphere = e.boundingSphere.clone()), this;
  }
  raycast(e, t) {
    const n = this.material, i = this.matrixWorld;
    n !== void 0 && (this.boundingSphere === null && this.computeBoundingSphere(), Tr.copy(this.boundingSphere), Tr.applyMatrix4(i), e.ray.intersectsSphere(Tr) !== !1 && (qo.copy(i).invert(), br.copy(e.ray).applyMatrix4(qo), !(this.boundingBox !== null && br.intersectsBox(this.boundingBox) === !1) && this._computeIntersections(e, t, br)));
  }
  getVertexPosition(e, t) {
    return super.getVertexPosition(e, t), this.applyBoneTransform(e, t), t;
  }
  bind(e, t) {
    this.skeleton = e, t === void 0 && (this.updateMatrixWorld(!0), this.skeleton.calculateInverses(), t = this.matrixWorld), this.bindMatrix.copy(t), this.bindMatrixInverse.copy(t).invert();
  }
  pose() {
    this.skeleton.pose();
  }
  normalizeSkinWeights() {
    const e = new tt(), t = this.geometry.attributes.skinWeight;
    for (let n = 0, i = t.count; n < i; n++) {
      e.fromBufferAttribute(t, n);
      const s = 1 / e.manhattanLength();
      s !== 1 / 0 ? e.multiplyScalar(s) : e.set(1, 0, 0, 0), t.setXYZW(n, e.x, e.y, e.z, e.w);
    }
  }
  updateMatrixWorld(e) {
    super.updateMatrixWorld(e), this.bindMode === "attached" ? this.bindMatrixInverse.copy(this.matrixWorld).invert() : this.bindMode === "detached" ? this.bindMatrixInverse.copy(this.bindMatrix).invert() : console.warn("THREE.SkinnedMesh: Unrecognized bindMode: " + this.bindMode);
  }
  applyBoneTransform(e, t) {
    const n = this.skeleton, i = this.geometry;
    Wo.fromBufferAttribute(i.attributes.skinIndex, e), Xo.fromBufferAttribute(i.attributes.skinWeight, e), Go.copy(t).applyMatrix4(this.bindMatrix), t.set(0, 0, 0);
    for (let s = 0; s < 4; s++) {
      const r = Xo.getComponent(s);
      if (r !== 0) {
        const o = Wo.getComponent(s);
        Yo.multiplyMatrices(n.bones[o].matrixWorld, n.boneInverses[o]), t.addScaledVector(iu.copy(Go).applyMatrix4(Yo), r);
      }
    }
    return t.applyMatrix4(this.bindMatrixInverse);
  }
}, xl = class extends pt {
  constructor() {
    super(), this.isBone = !0, this.type = "Bone";
  }
}, oo = class extends Pt {
  constructor(e = null, t = 1, n = 1, i, s, r, o, a, l = Vt, c = Vt, h, u) {
    super(null, r, o, a, l, c, i, s, h, u), this.isDataTexture = !0, this.image = {
      data: e,
      width: t,
      height: n
    }, this.generateMipmaps = !1, this.flipY = !1, this.unpackAlignment = 1;
  }
}, Ko = /* @__PURE__ */ new Ve(), ru = /* @__PURE__ */ new Ve(), ou = class yl {
  constructor(t = [], n = []) {
    this.uuid = Ht(), this.bones = t.slice(0), this.boneInverses = n, this.boneMatrices = null, this.boneTexture = null, this.init();
  }
  init() {
    const t = this.bones, n = this.boneInverses;
    if (this.boneMatrices = new Float32Array(t.length * 16), n.length === 0) this.calculateInverses();
    else if (t.length !== n.length) {
      console.warn("THREE.Skeleton: Number of inverse bone matrices does not match amount of bones."), this.boneInverses = [];
      for (let i = 0, s = this.bones.length; i < s; i++) this.boneInverses.push(new Ve());
    }
  }
  calculateInverses() {
    this.boneInverses.length = 0;
    for (let t = 0, n = this.bones.length; t < n; t++) {
      const i = new Ve();
      this.bones[t] && i.copy(this.bones[t].matrixWorld).invert(), this.boneInverses.push(i);
    }
  }
  pose() {
    for (let t = 0, n = this.bones.length; t < n; t++) {
      const i = this.bones[t];
      i && i.matrixWorld.copy(this.boneInverses[t]).invert();
    }
    for (let t = 0, n = this.bones.length; t < n; t++) {
      const i = this.bones[t];
      i && (i.parent && i.parent.isBone ? (i.matrix.copy(i.parent.matrixWorld).invert(), i.matrix.multiply(i.matrixWorld)) : i.matrix.copy(i.matrixWorld), i.matrix.decompose(i.position, i.quaternion, i.scale));
    }
  }
  update() {
    const t = this.bones, n = this.boneInverses, i = this.boneMatrices, s = this.boneTexture;
    for (let r = 0, o = t.length; r < o; r++) {
      const a = t[r] ? t[r].matrixWorld : ru;
      Ko.multiplyMatrices(a, n[r]), Ko.toArray(i, r * 16);
    }
    s !== null && (s.needsUpdate = !0);
  }
  clone() {
    return new yl(this.bones, this.boneInverses);
  }
  computeBoneTexture() {
    let t = Math.sqrt(this.bones.length * 4);
    t = Math.ceil(t / 4) * 4, t = Math.max(t, 4);
    const n = new Float32Array(t * t * 4);
    n.set(this.boneMatrices);
    const i = new oo(n, t, t, kn, ts);
    return i.needsUpdate = !0, this.boneMatrices = n, this.boneTexture = i, this;
  }
  getBoneByName(t) {
    for (let n = 0, i = this.bones.length; n < i; n++) {
      const s = this.bones[n];
      if (s.name === t) return s;
    }
  }
  dispose() {
    this.boneTexture !== null && (this.boneTexture.dispose(), this.boneTexture = null);
  }
  fromJSON(t, n) {
    this.uuid = t.uuid;
    for (let i = 0, s = t.bones.length; i < s; i++) {
      const r = t.bones[i];
      let o = n[r];
      o === void 0 && (console.warn("THREE.Skeleton: No bone found with UUID:", r), o = new xl()), this.bones.push(o), this.boneInverses.push(new Ve().fromArray(t.boneInverses[i]));
    }
    return this.init(), this;
  }
  toJSON() {
    const t = {
      metadata: {
        version: 4.7,
        type: "Skeleton",
        generator: "Skeleton.toJSON"
      },
      bones: [],
      boneInverses: []
    };
    t.uuid = this.uuid;
    const n = this.bones, i = this.boneInverses;
    for (let s = 0, r = n.length; s < r; s++) {
      const o = n[s];
      t.bones.push(o.uuid);
      const a = i[s];
      t.boneInverses.push(a.toArray());
    }
    return t;
  }
}, Yr = class extends wt {
  constructor(e, t, n, i = 1) {
    super(e, t, n), this.isInstancedBufferAttribute = !0, this.meshPerAttribute = i;
  }
  copy(e) {
    return super.copy(e), this.meshPerAttribute = e.meshPerAttribute, this;
  }
  toJSON() {
    const e = super.toJSON();
    return e.meshPerAttribute = this.meshPerAttribute, e.isInstancedBufferAttribute = !0, e;
  }
}, ii = /* @__PURE__ */ new Ve(), jo = /* @__PURE__ */ new Ve(), Ts = [], Zo = /* @__PURE__ */ new Gt(), au = /* @__PURE__ */ new Ve(), Li = /* @__PURE__ */ new Tt(), Ii = /* @__PURE__ */ new sn(), ji = class extends Tt {
  constructor(e, t, n) {
    super(e, t), this.isInstancedMesh = !0, this.instanceMatrix = new Yr(new Float32Array(n * 16), 16), this.instanceColor = null, this.morphTexture = null, this.count = n, this.boundingBox = null, this.boundingSphere = null;
    for (let i = 0; i < n; i++) this.setMatrixAt(i, au);
  }
  computeBoundingBox() {
    const e = this.geometry, t = this.count;
    this.boundingBox === null && (this.boundingBox = new Gt()), e.boundingBox === null && e.computeBoundingBox(), this.boundingBox.makeEmpty();
    for (let n = 0; n < t; n++)
      this.getMatrixAt(n, ii), Zo.copy(e.boundingBox).applyMatrix4(ii), this.boundingBox.union(Zo);
  }
  computeBoundingSphere() {
    const e = this.geometry, t = this.count;
    this.boundingSphere === null && (this.boundingSphere = new sn()), e.boundingSphere === null && e.computeBoundingSphere(), this.boundingSphere.makeEmpty();
    for (let n = 0; n < t; n++)
      this.getMatrixAt(n, ii), Ii.copy(e.boundingSphere).applyMatrix4(ii), this.boundingSphere.union(Ii);
  }
  copy(e, t) {
    return super.copy(e, t), this.instanceMatrix.copy(e.instanceMatrix), e.morphTexture !== null && (this.morphTexture = e.morphTexture.clone()), e.instanceColor !== null && (this.instanceColor = e.instanceColor.clone()), this.count = e.count, e.boundingBox !== null && (this.boundingBox = e.boundingBox.clone()), e.boundingSphere !== null && (this.boundingSphere = e.boundingSphere.clone()), this;
  }
  getColorAt(e, t) {
    t.fromArray(this.instanceColor.array, e * 3);
  }
  getMatrixAt(e, t) {
    t.fromArray(this.instanceMatrix.array, e * 16);
  }
  getMorphAt(e, t) {
    const n = t.morphTargetInfluences, i = this.morphTexture.source.data.data, s = e * (n.length + 1) + 1;
    for (let r = 0; r < n.length; r++) n[r] = i[s + r];
  }
  raycast(e, t) {
    const n = this.matrixWorld, i = this.count;
    if (Li.geometry = this.geometry, Li.material = this.material, Li.material !== void 0 && (this.boundingSphere === null && this.computeBoundingSphere(), Ii.copy(this.boundingSphere), Ii.applyMatrix4(n), e.ray.intersectsSphere(Ii) !== !1))
      for (let s = 0; s < i; s++) {
        this.getMatrixAt(s, ii), jo.multiplyMatrices(n, ii), Li.matrixWorld = jo, Li.raycast(e, Ts);
        for (let r = 0, o = Ts.length; r < o; r++) {
          const a = Ts[r];
          a.instanceId = s, a.object = this, t.push(a);
        }
        Ts.length = 0;
      }
  }
  setColorAt(e, t) {
    this.instanceColor === null && (this.instanceColor = new Yr(new Float32Array(this.instanceMatrix.count * 3).fill(1), 3)), t.toArray(this.instanceColor.array, e * 3);
  }
  setMatrixAt(e, t) {
    t.toArray(this.instanceMatrix.array, e * 16);
  }
  setMorphAt(e, t) {
    const n = t.morphTargetInfluences, i = n.length + 1;
    this.morphTexture === null && (this.morphTexture = new oo(new Float32Array(i * this.count), i, this.count, el, ts));
    const s = this.morphTexture.source.data.data;
    let r = 0;
    for (let l = 0; l < n.length; l++) r += n[l];
    const o = this.geometry.morphTargetsRelative ? 1 : 1 - r, a = i * e;
    s[a] = o, s.set(n, a + 1);
  }
  updateMorphTargets() {
  }
  dispose() {
    this.dispatchEvent({ type: "dispose" }), this.morphTexture !== null && (this.morphTexture.dispose(), this.morphTexture = null);
  }
}, Ar = /* @__PURE__ */ new C(), lu = /* @__PURE__ */ new C(), cu = /* @__PURE__ */ new qe(), Tn = class {
  constructor(e = new C(1, 0, 0), t = 0) {
    this.isPlane = !0, this.normal = e, this.constant = t;
  }
  set(e, t) {
    return this.normal.copy(e), this.constant = t, this;
  }
  setComponents(e, t, n, i) {
    return this.normal.set(e, t, n), this.constant = i, this;
  }
  setFromNormalAndCoplanarPoint(e, t) {
    return this.normal.copy(e), this.constant = -t.dot(this.normal), this;
  }
  setFromCoplanarPoints(e, t, n) {
    const i = Ar.subVectors(n, t).cross(lu.subVectors(e, t)).normalize();
    return this.setFromNormalAndCoplanarPoint(i, e), this;
  }
  copy(e) {
    return this.normal.copy(e.normal), this.constant = e.constant, this;
  }
  normalize() {
    const e = 1 / this.normal.length();
    return this.normal.multiplyScalar(e), this.constant *= e, this;
  }
  negate() {
    return this.constant *= -1, this.normal.negate(), this;
  }
  distanceToPoint(e) {
    return this.normal.dot(e) + this.constant;
  }
  distanceToSphere(e) {
    return this.distanceToPoint(e.center) - e.radius;
  }
  projectPoint(e, t) {
    return t.copy(e).addScaledVector(this.normal, -this.distanceToPoint(e));
  }
  intersectLine(e, t) {
    const n = e.delta(Ar), i = this.normal.dot(n);
    if (i === 0)
      return this.distanceToPoint(e.start) === 0 ? t.copy(e.start) : null;
    const s = -(e.start.dot(this.normal) + this.constant) / i;
    return s < 0 || s > 1 ? null : t.copy(e.start).addScaledVector(n, s);
  }
  intersectsLine(e) {
    const t = this.distanceToPoint(e.start), n = this.distanceToPoint(e.end);
    return t < 0 && n > 0 || n < 0 && t > 0;
  }
  intersectsBox(e) {
    return e.intersectsPlane(this);
  }
  intersectsSphere(e) {
    return e.intersectsPlane(this);
  }
  coplanarPoint(e) {
    return e.copy(this.normal).multiplyScalar(-this.constant);
  }
  applyMatrix4(e, t) {
    const n = t || cu.getNormalMatrix(e), i = this.coplanarPoint(Ar).applyMatrix4(e), s = this.normal.applyMatrix3(n).normalize();
    return this.constant = -i.dot(s), this;
  }
  translate(e) {
    return this.constant -= e.dot(this.normal), this;
  }
  equals(e) {
    return e.normal.equals(this.normal) && e.constant === this.constant;
  }
  clone() {
    return new this.constructor().copy(this);
  }
}, Dn = /* @__PURE__ */ new sn(), hu = /* @__PURE__ */ new re(0.5, 0.5), bs = /* @__PURE__ */ new C(), ao = class {
  constructor(e = new Tn(), t = new Tn(), n = new Tn(), i = new Tn(), s = new Tn(), r = new Tn()) {
    this.planes = [
      e,
      t,
      n,
      i,
      s,
      r
    ];
  }
  set(e, t, n, i, s, r) {
    const o = this.planes;
    return o[0].copy(e), o[1].copy(t), o[2].copy(n), o[3].copy(i), o[4].copy(s), o[5].copy(r), this;
  }
  copy(e) {
    const t = this.planes;
    for (let n = 0; n < 6; n++) t[n].copy(e.planes[n]);
    return this;
  }
  setFromProjectionMatrix(e, t = pi, n = !1) {
    const i = this.planes, s = e.elements, r = s[0], o = s[1], a = s[2], l = s[3], c = s[4], h = s[5], u = s[6], d = s[7], p = s[8], _ = s[9], g = s[10], m = s[11], f = s[12], y = s[13], v = s[14], S = s[15];
    if (i[0].setComponents(l - r, d - c, m - p, S - f).normalize(), i[1].setComponents(l + r, d + c, m + p, S + f).normalize(), i[2].setComponents(l + o, d + h, m + _, S + y).normalize(), i[3].setComponents(l - o, d - h, m - _, S - y).normalize(), n)
      i[4].setComponents(a, u, g, v).normalize(), i[5].setComponents(l - a, d - u, m - g, S - v).normalize();
    else if (i[4].setComponents(l - a, d - u, m - g, S - v).normalize(), t === 2e3) i[5].setComponents(l + a, d + u, m + g, S + v).normalize();
    else if (t === 2001) i[5].setComponents(a, u, g, v).normalize();
    else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: " + t);
    return this;
  }
  intersectsObject(e) {
    if (e.boundingSphere !== void 0)
      e.boundingSphere === null && e.computeBoundingSphere(), Dn.copy(e.boundingSphere).applyMatrix4(e.matrixWorld);
    else {
      const t = e.geometry;
      t.boundingSphere === null && t.computeBoundingSphere(), Dn.copy(t.boundingSphere).applyMatrix4(e.matrixWorld);
    }
    return this.intersectsSphere(Dn);
  }
  intersectsSprite(e) {
    return Dn.center.set(0, 0, 0), Dn.radius = 0.7071067811865476 + hu.distanceTo(e.center), Dn.applyMatrix4(e.matrixWorld), this.intersectsSphere(Dn);
  }
  intersectsSphere(e) {
    const t = this.planes, n = e.center, i = -e.radius;
    for (let s = 0; s < 6; s++) if (t[s].distanceToPoint(n) < i) return !1;
    return !0;
  }
  intersectsBox(e) {
    const t = this.planes;
    for (let n = 0; n < 6; n++) {
      const i = t[n];
      if (bs.x = i.normal.x > 0 ? e.max.x : e.min.x, bs.y = i.normal.y > 0 ? e.max.y : e.min.y, bs.z = i.normal.z > 0 ? e.max.z : e.min.z, i.distanceToPoint(bs) < 0) return !1;
    }
    return !0;
  }
  containsPoint(e) {
    const t = this.planes;
    for (let n = 0; n < 6; n++) if (t[n].distanceToPoint(e) < 0) return !1;
    return !0;
  }
  clone() {
    return new this.constructor().copy(this);
  }
}, lo = class extends tn {
  constructor(e) {
    super(), this.isLineBasicMaterial = !0, this.type = "LineBasicMaterial", this.color = new Be(16777215), this.map = null, this.linewidth = 1, this.linecap = "round", this.linejoin = "round", this.fog = !0, this.setValues(e);
  }
  copy(e) {
    return super.copy(e), this.color.copy(e.color), this.map = e.map, this.linewidth = e.linewidth, this.linecap = e.linecap, this.linejoin = e.linejoin, this.fog = e.fog, this;
  }
}, Ys = /* @__PURE__ */ new C(), qs = /* @__PURE__ */ new C(), Jo = /* @__PURE__ */ new Ve(), Di = /* @__PURE__ */ new ns(), As = /* @__PURE__ */ new sn(), wr = /* @__PURE__ */ new C(), $o = /* @__PURE__ */ new C(), Ks = class extends pt {
  constructor(e = new Lt(), t = new lo()) {
    super(), this.isLine = !0, this.type = "Line", this.geometry = e, this.material = t, this.morphTargetDictionary = void 0, this.morphTargetInfluences = void 0, this.updateMorphTargets();
  }
  copy(e, t) {
    return super.copy(e, t), this.material = Array.isArray(e.material) ? e.material.slice() : e.material, this.geometry = e.geometry, this;
  }
  computeLineDistances() {
    const e = this.geometry;
    if (e.index === null) {
      const t = e.attributes.position, n = [0];
      for (let i = 1, s = t.count; i < s; i++)
        Ys.fromBufferAttribute(t, i - 1), qs.fromBufferAttribute(t, i), n[i] = n[i - 1], n[i] += Ys.distanceTo(qs);
      e.setAttribute("lineDistance", new ut(n, 1));
    } else console.warn("THREE.Line.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");
    return this;
  }
  raycast(e, t) {
    const n = this.geometry, i = this.matrixWorld, s = e.params.Line.threshold, r = n.drawRange;
    if (n.boundingSphere === null && n.computeBoundingSphere(), As.copy(n.boundingSphere), As.applyMatrix4(i), As.radius += s, e.ray.intersectsSphere(As) === !1) return;
    Jo.copy(i).invert(), Di.copy(e.ray).applyMatrix4(Jo);
    const o = s / ((this.scale.x + this.scale.y + this.scale.z) / 3), a = o * o, l = this.isLineSegments ? 2 : 1, c = n.index, h = n.attributes.position;
    if (c !== null) {
      const u = Math.max(0, r.start), d = Math.min(c.count, r.start + r.count);
      for (let p = u, _ = d - 1; p < _; p += l) {
        const g = c.getX(p), m = c.getX(p + 1), f = ws(this, e, Di, a, g, m, p);
        f && t.push(f);
      }
      if (this.isLineLoop) {
        const p = c.getX(d - 1), _ = c.getX(u), g = ws(this, e, Di, a, p, _, d - 1);
        g && t.push(g);
      }
    } else {
      const u = Math.max(0, r.start), d = Math.min(h.count, r.start + r.count);
      for (let p = u, _ = d - 1; p < _; p += l) {
        const g = ws(this, e, Di, a, p, p + 1, p);
        g && t.push(g);
      }
      if (this.isLineLoop) {
        const p = ws(this, e, Di, a, d - 1, u, d - 1);
        p && t.push(p);
      }
    }
  }
  updateMorphTargets() {
    const e = this.geometry.morphAttributes, t = Object.keys(e);
    if (t.length > 0) {
      const n = e[t[0]];
      if (n !== void 0) {
        this.morphTargetInfluences = [], this.morphTargetDictionary = {};
        for (let i = 0, s = n.length; i < s; i++) {
          const r = n[i].name || String(i);
          this.morphTargetInfluences.push(0), this.morphTargetDictionary[r] = i;
        }
      }
    }
  }
};
function ws(e, t, n, i, s, r, o) {
  const a = e.geometry.attributes.position;
  if (Ys.fromBufferAttribute(a, s), qs.fromBufferAttribute(a, r), n.distanceSqToSegment(Ys, qs, wr, $o) > i) return;
  wr.applyMatrix4(e.matrixWorld);
  const l = t.ray.origin.distanceTo(wr);
  if (!(l < t.near || l > t.far))
    return {
      distance: l,
      point: $o.clone().applyMatrix4(e.matrixWorld),
      index: o,
      face: null,
      faceIndex: null,
      barycoord: null,
      object: e
    };
}
var Qo = /* @__PURE__ */ new C(), ea = /* @__PURE__ */ new C(), uu = class extends Ks {
  constructor(e, t) {
    super(e, t), this.isLineSegments = !0, this.type = "LineSegments";
  }
  computeLineDistances() {
    const e = this.geometry;
    if (e.index === null) {
      const t = e.attributes.position, n = [];
      for (let i = 0, s = t.count; i < s; i += 2)
        Qo.fromBufferAttribute(t, i), ea.fromBufferAttribute(t, i + 1), n[i] = i === 0 ? 0 : n[i - 1], n[i + 1] = n[i] + Qo.distanceTo(ea);
      e.setAttribute("lineDistance", new ut(n, 1));
    } else console.warn("THREE.LineSegments.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");
    return this;
  }
}, du = class extends Ks {
  constructor(e, t) {
    super(e, t), this.isLineLoop = !0, this.type = "LineLoop";
  }
}, Ml = class extends tn {
  constructor(e) {
    super(), this.isPointsMaterial = !0, this.type = "PointsMaterial", this.color = new Be(16777215), this.map = null, this.alphaMap = null, this.size = 1, this.sizeAttenuation = !0, this.fog = !0, this.setValues(e);
  }
  copy(e) {
    return super.copy(e), this.color.copy(e.color), this.map = e.map, this.alphaMap = e.alphaMap, this.size = e.size, this.sizeAttenuation = e.sizeAttenuation, this.fog = e.fog, this;
  }
}, ta = /* @__PURE__ */ new Ve(), qr = /* @__PURE__ */ new ns(), Rs = /* @__PURE__ */ new sn(), Cs = /* @__PURE__ */ new C(), fu = class extends pt {
  constructor(e = new Lt(), t = new Ml()) {
    super(), this.isPoints = !0, this.type = "Points", this.geometry = e, this.material = t, this.morphTargetDictionary = void 0, this.morphTargetInfluences = void 0, this.updateMorphTargets();
  }
  copy(e, t) {
    return super.copy(e, t), this.material = Array.isArray(e.material) ? e.material.slice() : e.material, this.geometry = e.geometry, this;
  }
  raycast(e, t) {
    const n = this.geometry, i = this.matrixWorld, s = e.params.Points.threshold, r = n.drawRange;
    if (n.boundingSphere === null && n.computeBoundingSphere(), Rs.copy(n.boundingSphere), Rs.applyMatrix4(i), Rs.radius += s, e.ray.intersectsSphere(Rs) === !1) return;
    ta.copy(i).invert(), qr.copy(e.ray).applyMatrix4(ta);
    const o = s / ((this.scale.x + this.scale.y + this.scale.z) / 3), a = o * o, l = n.index, c = n.attributes.position;
    if (l !== null) {
      const h = Math.max(0, r.start), u = Math.min(l.count, r.start + r.count);
      for (let d = h, p = u; d < p; d++) {
        const _ = l.getX(d);
        Cs.fromBufferAttribute(c, _), na(Cs, _, a, i, e, t, this);
      }
    } else {
      const h = Math.max(0, r.start), u = Math.min(c.count, r.start + r.count);
      for (let d = h, p = u; d < p; d++)
        Cs.fromBufferAttribute(c, d), na(Cs, d, a, i, e, t, this);
    }
  }
  updateMorphTargets() {
    const e = this.geometry.morphAttributes, t = Object.keys(e);
    if (t.length > 0) {
      const n = e[t[0]];
      if (n !== void 0) {
        this.morphTargetInfluences = [], this.morphTargetDictionary = {};
        for (let i = 0, s = n.length; i < s; i++) {
          const r = n[i].name || String(i);
          this.morphTargetInfluences.push(0), this.morphTargetDictionary[r] = i;
        }
      }
    }
  }
};
function na(e, t, n, i, s, r, o) {
  const a = qr.distanceSqToPoint(e);
  if (a < n) {
    const l = new C();
    qr.closestPointToPoint(e, l), l.applyMatrix4(i);
    const c = s.ray.origin.distanceTo(l);
    if (c < s.near || c > s.far) return;
    r.push({
      distance: c,
      distanceToRay: Math.sqrt(a),
      point: l,
      index: t,
      face: null,
      faceIndex: null,
      barycoord: null,
      object: o
    });
  }
}
var Sl = class extends Pt {
  constructor(e, t, n = no, i, s, r, o = Vt, a = Vt, l, c = $a, h = 1) {
    if (c !== 1026 && c !== 1027) throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");
    super({
      width: e,
      height: t,
      depth: h
    }, i, s, r, o, a, c, n, l), this.isDepthTexture = !0, this.flipY = !1, this.generateMipmaps = !1, this.compareFunction = null;
  }
  copy(e) {
    return super.copy(e), this.source = new ro(Object.assign({}, e.image)), this.compareFunction = e.compareFunction, this;
  }
  toJSON(e) {
    const t = super.toJSON(e);
    return this.compareFunction !== null && (t.compareFunction = this.compareFunction), t;
  }
}, El = class extends Pt {
  constructor(e = null) {
    super(), this.sourceTexture = e, this.isExternalTexture = !0;
  }
  copy(e) {
    return super.copy(e), this.sourceTexture = e.sourceTexture, this;
  }
}, pu = class Tl extends Lt {
  constructor(t = 1, n = 1, i = 1, s = 32, r = 1, o = !1, a = 0, l = Math.PI * 2) {
    super(), this.type = "CylinderGeometry", this.parameters = {
      radiusTop: t,
      radiusBottom: n,
      height: i,
      radialSegments: s,
      heightSegments: r,
      openEnded: o,
      thetaStart: a,
      thetaLength: l
    };
    const c = this;
    s = Math.floor(s), r = Math.floor(r);
    const h = [], u = [], d = [], p = [];
    let _ = 0;
    const g = [], m = i / 2;
    let f = 0;
    y(), o === !1 && (t > 0 && v(!0), n > 0 && v(!1)), this.setIndex(h), this.setAttribute("position", new ut(u, 3)), this.setAttribute("normal", new ut(d, 3)), this.setAttribute("uv", new ut(p, 2));
    function y() {
      const S = new C(), A = new C();
      let b = 0;
      const R = (n - t) / i;
      for (let I = 0; I <= r; I++) {
        const M = [], E = I / r, P = E * (n - t) + t;
        for (let F = 0; F <= s; F++) {
          const H = F / s, B = H * l + a, j = Math.sin(B), V = Math.cos(B);
          A.x = P * j, A.y = -E * i + m, A.z = P * V, u.push(A.x, A.y, A.z), S.set(j, R, V).normalize(), d.push(S.x, S.y, S.z), p.push(H, 1 - E), M.push(_++);
        }
        g.push(M);
      }
      for (let I = 0; I < s; I++) for (let M = 0; M < r; M++) {
        const E = g[M][I], P = g[M + 1][I], F = g[M + 1][I + 1], H = g[M][I + 1];
        (t > 0 || M !== 0) && (h.push(E, P, H), b += 3), (n > 0 || M !== r - 1) && (h.push(P, F, H), b += 3);
      }
      c.addGroup(f, b, 0), f += b;
    }
    function v(S) {
      const A = _, b = new re(), R = new C();
      let I = 0;
      const M = S === !0 ? t : n, E = S === !0 ? 1 : -1;
      for (let F = 1; F <= s; F++)
        u.push(0, m * E, 0), d.push(0, E, 0), p.push(0.5, 0.5), _++;
      const P = _;
      for (let F = 0; F <= s; F++) {
        const H = F / s * l + a, B = Math.cos(H), j = Math.sin(H);
        R.x = M * j, R.y = m * E, R.z = M * B, u.push(R.x, R.y, R.z), d.push(0, E, 0), b.x = B * 0.5 + 0.5, b.y = j * 0.5 * E + 0.5, p.push(b.x, b.y), _++;
      }
      for (let F = 0; F < s; F++) {
        const H = A + F, B = P + F;
        S === !0 ? h.push(B, B + 1, H) : h.push(B + 1, B, H), I += 3;
      }
      c.addGroup(f, I, S === !0 ? 1 : 2), f += I;
    }
  }
  copy(t) {
    return super.copy(t), this.parameters = Object.assign({}, t.parameters), this;
  }
  static fromJSON(t) {
    return new Tl(t.radiusTop, t.radiusBottom, t.height, t.radialSegments, t.heightSegments, t.openEnded, t.thetaStart, t.thetaLength);
  }
}, mu = class bl extends Lt {
  constructor(t = [], n = [], i = 1, s = 0) {
    super(), this.type = "PolyhedronGeometry", this.parameters = {
      vertices: t,
      indices: n,
      radius: i,
      detail: s
    };
    const r = [], o = [];
    a(s), c(i), h(), this.setAttribute("position", new ut(r, 3)), this.setAttribute("normal", new ut(r.slice(), 3)), this.setAttribute("uv", new ut(o, 2)), s === 0 ? this.computeVertexNormals() : this.normalizeNormals();
    function a(y) {
      const v = new C(), S = new C(), A = new C();
      for (let b = 0; b < n.length; b += 3)
        p(n[b + 0], v), p(n[b + 1], S), p(n[b + 2], A), l(v, S, A, y);
    }
    function l(y, v, S, A) {
      const b = A + 1, R = [];
      for (let I = 0; I <= b; I++) {
        R[I] = [];
        const M = y.clone().lerp(S, I / b), E = v.clone().lerp(S, I / b), P = b - I;
        for (let F = 0; F <= P; F++) F === 0 && I === b ? R[I][F] = M : R[I][F] = M.clone().lerp(E, F / P);
      }
      for (let I = 0; I < b; I++) for (let M = 0; M < 2 * (b - I) - 1; M++) {
        const E = Math.floor(M / 2);
        M % 2 === 0 ? (d(R[I][E + 1]), d(R[I + 1][E]), d(R[I][E])) : (d(R[I][E + 1]), d(R[I + 1][E + 1]), d(R[I + 1][E]));
      }
    }
    function c(y) {
      const v = new C();
      for (let S = 0; S < r.length; S += 3)
        v.x = r[S + 0], v.y = r[S + 1], v.z = r[S + 2], v.normalize().multiplyScalar(y), r[S + 0] = v.x, r[S + 1] = v.y, r[S + 2] = v.z;
    }
    function h() {
      const y = new C();
      for (let v = 0; v < r.length; v += 3) {
        y.x = r[v + 0], y.y = r[v + 1], y.z = r[v + 2];
        const S = m(y) / 2 / Math.PI + 0.5, A = f(y) / Math.PI + 0.5;
        o.push(S, 1 - A);
      }
      _(), u();
    }
    function u() {
      for (let y = 0; y < o.length; y += 6) {
        const v = o[y + 0], S = o[y + 2], A = o[y + 4];
        Math.max(v, S, A) > 0.9 && Math.min(v, S, A) < 0.1 && (v < 0.2 && (o[y + 0] += 1), S < 0.2 && (o[y + 2] += 1), A < 0.2 && (o[y + 4] += 1));
      }
    }
    function d(y) {
      r.push(y.x, y.y, y.z);
    }
    function p(y, v) {
      const S = y * 3;
      v.x = t[S + 0], v.y = t[S + 1], v.z = t[S + 2];
    }
    function _() {
      const y = new C(), v = new C(), S = new C(), A = new C(), b = new re(), R = new re(), I = new re();
      for (let M = 0, E = 0; M < r.length; M += 9, E += 6) {
        y.set(r[M + 0], r[M + 1], r[M + 2]), v.set(r[M + 3], r[M + 4], r[M + 5]), S.set(r[M + 6], r[M + 7], r[M + 8]), b.set(o[E + 0], o[E + 1]), R.set(o[E + 2], o[E + 3]), I.set(o[E + 4], o[E + 5]), A.copy(y).add(v).add(S).divideScalar(3);
        const P = m(A);
        g(b, E + 0, y, P), g(R, E + 2, v, P), g(I, E + 4, S, P);
      }
    }
    function g(y, v, S, A) {
      A < 0 && y.x === 1 && (o[v] = y.x - 1), S.x === 0 && S.z === 0 && (o[v] = A / 2 / Math.PI + 0.5);
    }
    function m(y) {
      return Math.atan2(y.z, -y.x);
    }
    function f(y) {
      return Math.atan2(-y.y, Math.sqrt(y.x * y.x + y.z * y.z));
    }
  }
  copy(t) {
    return super.copy(t), this.parameters = Object.assign({}, t.parameters), this;
  }
  static fromJSON(t) {
    return new bl(t.vertices, t.indices, t.radius, t.details);
  }
}, gu = class Al extends mu {
  constructor(t = 1, n = 0) {
    const i = (1 + Math.sqrt(5)) / 2, s = 1 / i, r = [
      -1,
      -1,
      -1,
      -1,
      -1,
      1,
      -1,
      1,
      -1,
      -1,
      1,
      1,
      1,
      -1,
      -1,
      1,
      -1,
      1,
      1,
      1,
      -1,
      1,
      1,
      1,
      0,
      -s,
      -i,
      0,
      -s,
      i,
      0,
      s,
      -i,
      0,
      s,
      i,
      -s,
      -i,
      0,
      -s,
      i,
      0,
      s,
      -i,
      0,
      s,
      i,
      0,
      -i,
      0,
      -s,
      i,
      0,
      -s,
      -i,
      0,
      s,
      i,
      0,
      s
    ];
    super(r, [
      3,
      11,
      7,
      3,
      7,
      15,
      3,
      15,
      13,
      7,
      19,
      17,
      7,
      17,
      6,
      7,
      6,
      15,
      17,
      4,
      8,
      17,
      8,
      10,
      17,
      10,
      6,
      8,
      0,
      16,
      8,
      16,
      2,
      8,
      2,
      10,
      0,
      12,
      1,
      0,
      1,
      18,
      0,
      18,
      16,
      6,
      10,
      2,
      6,
      2,
      13,
      6,
      13,
      15,
      2,
      16,
      18,
      2,
      18,
      3,
      2,
      3,
      13,
      18,
      1,
      9,
      18,
      9,
      11,
      18,
      11,
      3,
      4,
      14,
      12,
      4,
      12,
      0,
      4,
      0,
      8,
      11,
      9,
      5,
      11,
      5,
      19,
      11,
      19,
      7,
      19,
      5,
      14,
      19,
      14,
      4,
      19,
      4,
      17,
      1,
      12,
      14,
      1,
      14,
      5,
      1,
      5,
      9
    ], t, n), this.type = "DodecahedronGeometry", this.parameters = {
      radius: t,
      detail: n
    };
  }
  static fromJSON(t) {
    return new Al(t.radius, t.detail);
  }
}, rn = class {
  constructor() {
    this.type = "Curve", this.arcLengthDivisions = 200, this.needsUpdate = !1, this.cacheArcLengths = null;
  }
  getPoint() {
    console.warn("THREE.Curve: .getPoint() not implemented.");
  }
  getPointAt(e, t) {
    const n = this.getUtoTmapping(e);
    return this.getPoint(n, t);
  }
  getPoints(e = 5) {
    const t = [];
    for (let n = 0; n <= e; n++) t.push(this.getPoint(n / e));
    return t;
  }
  getSpacedPoints(e = 5) {
    const t = [];
    for (let n = 0; n <= e; n++) t.push(this.getPointAt(n / e));
    return t;
  }
  getLength() {
    const e = this.getLengths();
    return e[e.length - 1];
  }
  getLengths(e = this.arcLengthDivisions) {
    if (this.cacheArcLengths && this.cacheArcLengths.length === e + 1 && !this.needsUpdate) return this.cacheArcLengths;
    this.needsUpdate = !1;
    const t = [];
    let n, i = this.getPoint(0), s = 0;
    t.push(0);
    for (let r = 1; r <= e; r++)
      n = this.getPoint(r / e), s += n.distanceTo(i), t.push(s), i = n;
    return this.cacheArcLengths = t, t;
  }
  updateArcLengths() {
    this.needsUpdate = !0, this.getLengths();
  }
  getUtoTmapping(e, t = null) {
    const n = this.getLengths();
    let i = 0;
    const s = n.length;
    let r;
    t ? r = t : r = e * n[s - 1];
    let o = 0, a = s - 1, l;
    for (; o <= a; )
      if (i = Math.floor(o + (a - o) / 2), l = n[i] - r, l < 0) o = i + 1;
      else if (l > 0) a = i - 1;
      else {
        a = i;
        break;
      }
    if (i = a, n[i] === r) return i / (s - 1);
    const c = n[i], h = n[i + 1] - c, u = (r - c) / h;
    return (i + u) / (s - 1);
  }
  getTangent(e, t) {
    let i = e - 1e-4, s = e + 1e-4;
    i < 0 && (i = 0), s > 1 && (s = 1);
    const r = this.getPoint(i), o = this.getPoint(s), a = t || (r.isVector2 ? new re() : new C());
    return a.copy(o).sub(r).normalize(), a;
  }
  getTangentAt(e, t) {
    const n = this.getUtoTmapping(e);
    return this.getTangent(n, t);
  }
  computeFrenetFrames(e, t = !1) {
    const n = new C(), i = [], s = [], r = [], o = new C(), a = new Ve();
    for (let d = 0; d <= e; d++) {
      const p = d / e;
      i[d] = this.getTangentAt(p, new C());
    }
    s[0] = new C(), r[0] = new C();
    let l = Number.MAX_VALUE;
    const c = Math.abs(i[0].x), h = Math.abs(i[0].y), u = Math.abs(i[0].z);
    c <= l && (l = c, n.set(1, 0, 0)), h <= l && (l = h, n.set(0, 1, 0)), u <= l && n.set(0, 0, 1), o.crossVectors(i[0], n).normalize(), s[0].crossVectors(i[0], o), r[0].crossVectors(i[0], s[0]);
    for (let d = 1; d <= e; d++) {
      if (s[d] = s[d - 1].clone(), r[d] = r[d - 1].clone(), o.crossVectors(i[d - 1], i[d]), o.length() > Number.EPSILON) {
        o.normalize();
        const p = Math.acos(Ge(i[d - 1].dot(i[d]), -1, 1));
        s[d].applyMatrix4(a.makeRotationAxis(o, p));
      }
      r[d].crossVectors(i[d], s[d]);
    }
    if (t === !0) {
      let d = Math.acos(Ge(s[0].dot(s[e]), -1, 1));
      d /= e, i[0].dot(o.crossVectors(s[0], s[e])) > 0 && (d = -d);
      for (let p = 1; p <= e; p++)
        s[p].applyMatrix4(a.makeRotationAxis(i[p], d * p)), r[p].crossVectors(i[p], s[p]);
    }
    return {
      tangents: i,
      normals: s,
      binormals: r
    };
  }
  clone() {
    return new this.constructor().copy(this);
  }
  copy(e) {
    return this.arcLengthDivisions = e.arcLengthDivisions, this;
  }
  toJSON() {
    const e = { metadata: {
      version: 4.7,
      type: "Curve",
      generator: "Curve.toJSON"
    } };
    return e.arcLengthDivisions = this.arcLengthDivisions, e.type = this.type, e;
  }
  fromJSON(e) {
    return this.arcLengthDivisions = e.arcLengthDivisions, this;
  }
}, co = class extends rn {
  constructor(e = 0, t = 0, n = 1, i = 1, s = 0, r = Math.PI * 2, o = !1, a = 0) {
    super(), this.isEllipseCurve = !0, this.type = "EllipseCurve", this.aX = e, this.aY = t, this.xRadius = n, this.yRadius = i, this.aStartAngle = s, this.aEndAngle = r, this.aClockwise = o, this.aRotation = a;
  }
  getPoint(e, t = new re()) {
    const n = t, i = Math.PI * 2;
    let s = this.aEndAngle - this.aStartAngle;
    const r = Math.abs(s) < Number.EPSILON;
    for (; s < 0; ) s += i;
    for (; s > i; ) s -= i;
    s < Number.EPSILON && (r ? s = 0 : s = i), this.aClockwise === !0 && !r && (s === i ? s = -i : s = s - i);
    const o = this.aStartAngle + e * s;
    let a = this.aX + this.xRadius * Math.cos(o), l = this.aY + this.yRadius * Math.sin(o);
    if (this.aRotation !== 0) {
      const c = Math.cos(this.aRotation), h = Math.sin(this.aRotation), u = a - this.aX, d = l - this.aY;
      a = u * c - d * h + this.aX, l = u * h + d * c + this.aY;
    }
    return n.set(a, l);
  }
  copy(e) {
    return super.copy(e), this.aX = e.aX, this.aY = e.aY, this.xRadius = e.xRadius, this.yRadius = e.yRadius, this.aStartAngle = e.aStartAngle, this.aEndAngle = e.aEndAngle, this.aClockwise = e.aClockwise, this.aRotation = e.aRotation, this;
  }
  toJSON() {
    const e = super.toJSON();
    return e.aX = this.aX, e.aY = this.aY, e.xRadius = this.xRadius, e.yRadius = this.yRadius, e.aStartAngle = this.aStartAngle, e.aEndAngle = this.aEndAngle, e.aClockwise = this.aClockwise, e.aRotation = this.aRotation, e;
  }
  fromJSON(e) {
    return super.fromJSON(e), this.aX = e.aX, this.aY = e.aY, this.xRadius = e.xRadius, this.yRadius = e.yRadius, this.aStartAngle = e.aStartAngle, this.aEndAngle = e.aEndAngle, this.aClockwise = e.aClockwise, this.aRotation = e.aRotation, this;
  }
}, _u = class extends co {
  constructor(e, t, n, i, s, r) {
    super(e, t, n, n, i, s, r), this.isArcCurve = !0, this.type = "ArcCurve";
  }
};
function ho() {
  let e = 0, t = 0, n = 0, i = 0;
  function s(r, o, a, l) {
    e = r, t = a, n = -3 * r + 3 * o - 2 * a - l, i = 2 * r - 2 * o + a + l;
  }
  return {
    initCatmullRom: function(r, o, a, l, c) {
      s(o, a, c * (a - r), c * (l - o));
    },
    initNonuniformCatmullRom: function(r, o, a, l, c, h, u) {
      let d = (o - r) / c - (a - r) / (c + h) + (a - o) / h, p = (a - o) / h - (l - o) / (h + u) + (l - a) / u;
      d *= h, p *= h, s(o, a, d, p);
    },
    calc: function(r) {
      const o = r * r, a = o * r;
      return e + t * r + n * o + i * a;
    }
  };
}
var Ps = /* @__PURE__ */ new C(), Rr = /* @__PURE__ */ new ho(), Cr = /* @__PURE__ */ new ho(), Pr = /* @__PURE__ */ new ho(), vu = class extends rn {
  constructor(e = [], t = !1, n = "centripetal", i = 0.5) {
    super(), this.isCatmullRomCurve3 = !0, this.type = "CatmullRomCurve3", this.points = e, this.closed = t, this.curveType = n, this.tension = i;
  }
  getPoint(e, t = new C()) {
    const n = t, i = this.points, s = i.length, r = (s - (this.closed ? 0 : 1)) * e;
    let o = Math.floor(r), a = r - o;
    this.closed ? o += o > 0 ? 0 : (Math.floor(Math.abs(o) / s) + 1) * s : a === 0 && o === s - 1 && (o = s - 2, a = 1);
    let l, c;
    this.closed || o > 0 ? l = i[(o - 1) % s] : (Ps.subVectors(i[0], i[1]).add(i[0]), l = Ps);
    const h = i[o % s], u = i[(o + 1) % s];
    if (this.closed || o + 2 < s ? c = i[(o + 2) % s] : (Ps.subVectors(i[s - 1], i[s - 2]).add(i[s - 1]), c = Ps), this.curveType === "centripetal" || this.curveType === "chordal") {
      const d = this.curveType === "chordal" ? 0.5 : 0.25;
      let p = Math.pow(l.distanceToSquared(h), d), _ = Math.pow(h.distanceToSquared(u), d), g = Math.pow(u.distanceToSquared(c), d);
      _ < 1e-4 && (_ = 1), p < 1e-4 && (p = _), g < 1e-4 && (g = _), Rr.initNonuniformCatmullRom(l.x, h.x, u.x, c.x, p, _, g), Cr.initNonuniformCatmullRom(l.y, h.y, u.y, c.y, p, _, g), Pr.initNonuniformCatmullRom(l.z, h.z, u.z, c.z, p, _, g);
    } else this.curveType === "catmullrom" && (Rr.initCatmullRom(l.x, h.x, u.x, c.x, this.tension), Cr.initCatmullRom(l.y, h.y, u.y, c.y, this.tension), Pr.initCatmullRom(l.z, h.z, u.z, c.z, this.tension));
    return n.set(Rr.calc(a), Cr.calc(a), Pr.calc(a)), n;
  }
  copy(e) {
    super.copy(e), this.points = [];
    for (let t = 0, n = e.points.length; t < n; t++) {
      const i = e.points[t];
      this.points.push(i.clone());
    }
    return this.closed = e.closed, this.curveType = e.curveType, this.tension = e.tension, this;
  }
  toJSON() {
    const e = super.toJSON();
    e.points = [];
    for (let t = 0, n = this.points.length; t < n; t++) {
      const i = this.points[t];
      e.points.push(i.toArray());
    }
    return e.closed = this.closed, e.curveType = this.curveType, e.tension = this.tension, e;
  }
  fromJSON(e) {
    super.fromJSON(e), this.points = [];
    for (let t = 0, n = e.points.length; t < n; t++) {
      const i = e.points[t];
      this.points.push(new C().fromArray(i));
    }
    return this.closed = e.closed, this.curveType = e.curveType, this.tension = e.tension, this;
  }
};
function ia(e, t, n, i, s) {
  const r = (i - t) * 0.5, o = (s - n) * 0.5, a = e * e, l = e * a;
  return (2 * n - 2 * i + r + o) * l + (-3 * n + 3 * i - 2 * r - o) * a + r * e + n;
}
function xu(e, t) {
  const n = 1 - e;
  return n * n * t;
}
function yu(e, t) {
  return 2 * (1 - e) * e * t;
}
function Mu(e, t) {
  return e * e * t;
}
function Hi(e, t, n, i) {
  return xu(e, t) + yu(e, n) + Mu(e, i);
}
function Su(e, t) {
  const n = 1 - e;
  return n * n * n * t;
}
function Eu(e, t) {
  const n = 1 - e;
  return 3 * n * n * e * t;
}
function Tu(e, t) {
  return 3 * (1 - e) * e * e * t;
}
function bu(e, t) {
  return e * e * e * t;
}
function Vi(e, t, n, i, s) {
  return Su(e, t) + Eu(e, n) + Tu(e, i) + bu(e, s);
}
var wl = class extends rn {
  constructor(e = new re(), t = new re(), n = new re(), i = new re()) {
    super(), this.isCubicBezierCurve = !0, this.type = "CubicBezierCurve", this.v0 = e, this.v1 = t, this.v2 = n, this.v3 = i;
  }
  getPoint(e, t = new re()) {
    const n = t, i = this.v0, s = this.v1, r = this.v2, o = this.v3;
    return n.set(Vi(e, i.x, s.x, r.x, o.x), Vi(e, i.y, s.y, r.y, o.y)), n;
  }
  copy(e) {
    return super.copy(e), this.v0.copy(e.v0), this.v1.copy(e.v1), this.v2.copy(e.v2), this.v3.copy(e.v3), this;
  }
  toJSON() {
    const e = super.toJSON();
    return e.v0 = this.v0.toArray(), e.v1 = this.v1.toArray(), e.v2 = this.v2.toArray(), e.v3 = this.v3.toArray(), e;
  }
  fromJSON(e) {
    return super.fromJSON(e), this.v0.fromArray(e.v0), this.v1.fromArray(e.v1), this.v2.fromArray(e.v2), this.v3.fromArray(e.v3), this;
  }
}, Au = class extends rn {
  constructor(e = new C(), t = new C(), n = new C(), i = new C()) {
    super(), this.isCubicBezierCurve3 = !0, this.type = "CubicBezierCurve3", this.v0 = e, this.v1 = t, this.v2 = n, this.v3 = i;
  }
  getPoint(e, t = new C()) {
    const n = t, i = this.v0, s = this.v1, r = this.v2, o = this.v3;
    return n.set(Vi(e, i.x, s.x, r.x, o.x), Vi(e, i.y, s.y, r.y, o.y), Vi(e, i.z, s.z, r.z, o.z)), n;
  }
  copy(e) {
    return super.copy(e), this.v0.copy(e.v0), this.v1.copy(e.v1), this.v2.copy(e.v2), this.v3.copy(e.v3), this;
  }
  toJSON() {
    const e = super.toJSON();
    return e.v0 = this.v0.toArray(), e.v1 = this.v1.toArray(), e.v2 = this.v2.toArray(), e.v3 = this.v3.toArray(), e;
  }
  fromJSON(e) {
    return super.fromJSON(e), this.v0.fromArray(e.v0), this.v1.fromArray(e.v1), this.v2.fromArray(e.v2), this.v3.fromArray(e.v3), this;
  }
}, Rl = class extends rn {
  constructor(e = new re(), t = new re()) {
    super(), this.isLineCurve = !0, this.type = "LineCurve", this.v1 = e, this.v2 = t;
  }
  getPoint(e, t = new re()) {
    const n = t;
    return e === 1 ? n.copy(this.v2) : (n.copy(this.v2).sub(this.v1), n.multiplyScalar(e).add(this.v1)), n;
  }
  getPointAt(e, t) {
    return this.getPoint(e, t);
  }
  getTangent(e, t = new re()) {
    return t.subVectors(this.v2, this.v1).normalize();
  }
  getTangentAt(e, t) {
    return this.getTangent(e, t);
  }
  copy(e) {
    return super.copy(e), this.v1.copy(e.v1), this.v2.copy(e.v2), this;
  }
  toJSON() {
    const e = super.toJSON();
    return e.v1 = this.v1.toArray(), e.v2 = this.v2.toArray(), e;
  }
  fromJSON(e) {
    return super.fromJSON(e), this.v1.fromArray(e.v1), this.v2.fromArray(e.v2), this;
  }
}, wu = class extends rn {
  constructor(e = new C(), t = new C()) {
    super(), this.isLineCurve3 = !0, this.type = "LineCurve3", this.v1 = e, this.v2 = t;
  }
  getPoint(e, t = new C()) {
    const n = t;
    return e === 1 ? n.copy(this.v2) : (n.copy(this.v2).sub(this.v1), n.multiplyScalar(e).add(this.v1)), n;
  }
  getPointAt(e, t) {
    return this.getPoint(e, t);
  }
  getTangent(e, t = new C()) {
    return t.subVectors(this.v2, this.v1).normalize();
  }
  getTangentAt(e, t) {
    return this.getTangent(e, t);
  }
  copy(e) {
    return super.copy(e), this.v1.copy(e.v1), this.v2.copy(e.v2), this;
  }
  toJSON() {
    const e = super.toJSON();
    return e.v1 = this.v1.toArray(), e.v2 = this.v2.toArray(), e;
  }
  fromJSON(e) {
    return super.fromJSON(e), this.v1.fromArray(e.v1), this.v2.fromArray(e.v2), this;
  }
}, Cl = class extends rn {
  constructor(e = new re(), t = new re(), n = new re()) {
    super(), this.isQuadraticBezierCurve = !0, this.type = "QuadraticBezierCurve", this.v0 = e, this.v1 = t, this.v2 = n;
  }
  getPoint(e, t = new re()) {
    const n = t, i = this.v0, s = this.v1, r = this.v2;
    return n.set(Hi(e, i.x, s.x, r.x), Hi(e, i.y, s.y, r.y)), n;
  }
  copy(e) {
    return super.copy(e), this.v0.copy(e.v0), this.v1.copy(e.v1), this.v2.copy(e.v2), this;
  }
  toJSON() {
    const e = super.toJSON();
    return e.v0 = this.v0.toArray(), e.v1 = this.v1.toArray(), e.v2 = this.v2.toArray(), e;
  }
  fromJSON(e) {
    return super.fromJSON(e), this.v0.fromArray(e.v0), this.v1.fromArray(e.v1), this.v2.fromArray(e.v2), this;
  }
}, Ru = class extends rn {
  constructor(e = new C(), t = new C(), n = new C()) {
    super(), this.isQuadraticBezierCurve3 = !0, this.type = "QuadraticBezierCurve3", this.v0 = e, this.v1 = t, this.v2 = n;
  }
  getPoint(e, t = new C()) {
    const n = t, i = this.v0, s = this.v1, r = this.v2;
    return n.set(Hi(e, i.x, s.x, r.x), Hi(e, i.y, s.y, r.y), Hi(e, i.z, s.z, r.z)), n;
  }
  copy(e) {
    return super.copy(e), this.v0.copy(e.v0), this.v1.copy(e.v1), this.v2.copy(e.v2), this;
  }
  toJSON() {
    const e = super.toJSON();
    return e.v0 = this.v0.toArray(), e.v1 = this.v1.toArray(), e.v2 = this.v2.toArray(), e;
  }
  fromJSON(e) {
    return super.fromJSON(e), this.v0.fromArray(e.v0), this.v1.fromArray(e.v1), this.v2.fromArray(e.v2), this;
  }
}, Pl = class extends rn {
  constructor(e = []) {
    super(), this.isSplineCurve = !0, this.type = "SplineCurve", this.points = e;
  }
  getPoint(e, t = new re()) {
    const n = t, i = this.points, s = (i.length - 1) * e, r = Math.floor(s), o = s - r, a = i[r === 0 ? r : r - 1], l = i[r], c = i[r > i.length - 2 ? i.length - 1 : r + 1], h = i[r > i.length - 3 ? i.length - 1 : r + 2];
    return n.set(ia(o, a.x, l.x, c.x, h.x), ia(o, a.y, l.y, c.y, h.y)), n;
  }
  copy(e) {
    super.copy(e), this.points = [];
    for (let t = 0, n = e.points.length; t < n; t++) {
      const i = e.points[t];
      this.points.push(i.clone());
    }
    return this;
  }
  toJSON() {
    const e = super.toJSON();
    e.points = [];
    for (let t = 0, n = this.points.length; t < n; t++) {
      const i = this.points[t];
      e.points.push(i.toArray());
    }
    return e;
  }
  fromJSON(e) {
    super.fromJSON(e), this.points = [];
    for (let t = 0, n = e.points.length; t < n; t++) {
      const i = e.points[t];
      this.points.push(new re().fromArray(i));
    }
    return this;
  }
}, Kr = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  ArcCurve: _u,
  CatmullRomCurve3: vu,
  CubicBezierCurve: wl,
  CubicBezierCurve3: Au,
  EllipseCurve: co,
  LineCurve: Rl,
  LineCurve3: wu,
  QuadraticBezierCurve: Cl,
  QuadraticBezierCurve3: Ru,
  SplineCurve: Pl
}), Cu = class extends rn {
  constructor() {
    super(), this.type = "CurvePath", this.curves = [], this.autoClose = !1;
  }
  add(e) {
    this.curves.push(e);
  }
  closePath() {
    const e = this.curves[0].getPoint(0), t = this.curves[this.curves.length - 1].getPoint(1);
    if (!e.equals(t)) {
      const n = e.isVector2 === !0 ? "LineCurve" : "LineCurve3";
      this.curves.push(new Kr[n](t, e));
    }
    return this;
  }
  getPoint(e, t) {
    const n = e * this.getLength(), i = this.getCurveLengths();
    let s = 0;
    for (; s < i.length; ) {
      if (i[s] >= n) {
        const r = i[s] - n, o = this.curves[s], a = o.getLength(), l = a === 0 ? 0 : 1 - r / a;
        return o.getPointAt(l, t);
      }
      s++;
    }
    return null;
  }
  getLength() {
    const e = this.getCurveLengths();
    return e[e.length - 1];
  }
  updateArcLengths() {
    this.needsUpdate = !0, this.cacheLengths = null, this.getCurveLengths();
  }
  getCurveLengths() {
    if (this.cacheLengths && this.cacheLengths.length === this.curves.length) return this.cacheLengths;
    const e = [];
    let t = 0;
    for (let n = 0, i = this.curves.length; n < i; n++)
      t += this.curves[n].getLength(), e.push(t);
    return this.cacheLengths = e, e;
  }
  getSpacedPoints(e = 40) {
    const t = [];
    for (let n = 0; n <= e; n++) t.push(this.getPoint(n / e));
    return this.autoClose && t.push(t[0]), t;
  }
  getPoints(e = 12) {
    const t = [];
    let n;
    for (let i = 0, s = this.curves; i < s.length; i++) {
      const r = s[i], o = r.isEllipseCurve ? e * 2 : r.isLineCurve || r.isLineCurve3 ? 1 : r.isSplineCurve ? e * r.points.length : e, a = r.getPoints(o);
      for (let l = 0; l < a.length; l++) {
        const c = a[l];
        n && n.equals(c) || (t.push(c), n = c);
      }
    }
    return this.autoClose && t.length > 1 && !t[t.length - 1].equals(t[0]) && t.push(t[0]), t;
  }
  copy(e) {
    super.copy(e), this.curves = [];
    for (let t = 0, n = e.curves.length; t < n; t++) {
      const i = e.curves[t];
      this.curves.push(i.clone());
    }
    return this.autoClose = e.autoClose, this;
  }
  toJSON() {
    const e = super.toJSON();
    e.autoClose = this.autoClose, e.curves = [];
    for (let t = 0, n = this.curves.length; t < n; t++) {
      const i = this.curves[t];
      e.curves.push(i.toJSON());
    }
    return e;
  }
  fromJSON(e) {
    super.fromJSON(e), this.autoClose = e.autoClose, this.curves = [];
    for (let t = 0, n = e.curves.length; t < n; t++) {
      const i = e.curves[t];
      this.curves.push(new Kr[i.type]().fromJSON(i));
    }
    return this;
  }
}, sa = class extends Cu {
  constructor(e) {
    super(), this.type = "Path", this.currentPoint = new re(), e && this.setFromPoints(e);
  }
  setFromPoints(e) {
    this.moveTo(e[0].x, e[0].y);
    for (let t = 1, n = e.length; t < n; t++) this.lineTo(e[t].x, e[t].y);
    return this;
  }
  moveTo(e, t) {
    return this.currentPoint.set(e, t), this;
  }
  lineTo(e, t) {
    const n = new Rl(this.currentPoint.clone(), new re(e, t));
    return this.curves.push(n), this.currentPoint.set(e, t), this;
  }
  quadraticCurveTo(e, t, n, i) {
    const s = new Cl(this.currentPoint.clone(), new re(e, t), new re(n, i));
    return this.curves.push(s), this.currentPoint.set(n, i), this;
  }
  bezierCurveTo(e, t, n, i, s, r) {
    const o = new wl(this.currentPoint.clone(), new re(e, t), new re(n, i), new re(s, r));
    return this.curves.push(o), this.currentPoint.set(s, r), this;
  }
  splineThru(e) {
    const t = new Pl([this.currentPoint.clone()].concat(e));
    return this.curves.push(t), this.currentPoint.copy(e[e.length - 1]), this;
  }
  arc(e, t, n, i, s, r) {
    const o = this.currentPoint.x, a = this.currentPoint.y;
    return this.absarc(e + o, t + a, n, i, s, r), this;
  }
  absarc(e, t, n, i, s, r) {
    return this.absellipse(e, t, n, n, i, s, r), this;
  }
  ellipse(e, t, n, i, s, r, o, a) {
    const l = this.currentPoint.x, c = this.currentPoint.y;
    return this.absellipse(e + l, t + c, n, i, s, r, o, a), this;
  }
  absellipse(e, t, n, i, s, r, o, a) {
    const l = new co(e, t, n, i, s, r, o, a);
    if (this.curves.length > 0) {
      const h = l.getPoint(0);
      h.equals(this.currentPoint) || this.lineTo(h.x, h.y);
    }
    this.curves.push(l);
    const c = l.getPoint(1);
    return this.currentPoint.copy(c), this;
  }
  copy(e) {
    return super.copy(e), this.currentPoint.copy(e.currentPoint), this;
  }
  toJSON() {
    const e = super.toJSON();
    return e.currentPoint = this.currentPoint.toArray(), e;
  }
  fromJSON(e) {
    return super.fromJSON(e), this.currentPoint.fromArray(e.currentPoint), this;
  }
}, Ll = class extends sa {
  constructor(e) {
    super(e), this.uuid = Ht(), this.type = "Shape", this.holes = [];
  }
  getPointsHoles(e) {
    const t = [];
    for (let n = 0, i = this.holes.length; n < i; n++) t[n] = this.holes[n].getPoints(e);
    return t;
  }
  extractPoints(e) {
    return {
      shape: this.getPoints(e),
      holes: this.getPointsHoles(e)
    };
  }
  copy(e) {
    super.copy(e), this.holes = [];
    for (let t = 0, n = e.holes.length; t < n; t++) {
      const i = e.holes[t];
      this.holes.push(i.clone());
    }
    return this;
  }
  toJSON() {
    const e = super.toJSON();
    e.uuid = this.uuid, e.holes = [];
    for (let t = 0, n = this.holes.length; t < n; t++) {
      const i = this.holes[t];
      e.holes.push(i.toJSON());
    }
    return e;
  }
  fromJSON(e) {
    super.fromJSON(e), this.uuid = e.uuid, this.holes = [];
    for (let t = 0, n = e.holes.length; t < n; t++) {
      const i = e.holes[t];
      this.holes.push(new sa().fromJSON(i));
    }
    return this;
  }
};
function Pu(e, t, n = 2) {
  const i = t && t.length, s = i ? t[0] * n : e.length;
  let r = Il(e, 0, s, n, !0);
  const o = [];
  if (!r || r.next === r.prev) return o;
  let a, l, c;
  if (i && (r = Uu(e, t, r, n)), e.length > 80 * n) {
    a = 1 / 0, l = 1 / 0;
    let h = -1 / 0, u = -1 / 0;
    for (let d = n; d < s; d += n) {
      const p = e[d], _ = e[d + 1];
      p < a && (a = p), _ < l && (l = _), p > h && (h = p), _ > u && (u = _);
    }
    c = Math.max(h - a, u - l), c = c !== 0 ? 32767 / c : 0;
  }
  return Zi(r, o, n, a, l, c, 0), o;
}
function Il(e, t, n, i, s) {
  let r;
  if (s === Yu(e, t, n, i) > 0) for (let o = t; o < n; o += i) r = ra(o / i | 0, e[o], e[o + 1], r);
  else for (let o = n - i; o >= t; o -= i) r = ra(o / i | 0, e[o], e[o + 1], r);
  return r && _i(r, r.next) && ($i(r), r = r.next), r;
}
function Vn(e, t) {
  if (!e) return e;
  t || (t = e);
  let n = e, i;
  do
    if (i = !1, !n.steiner && (_i(n, n.next) || ht(n.prev, n, n.next) === 0)) {
      if ($i(n), n = t = n.prev, n === n.next) break;
      i = !0;
    } else n = n.next;
  while (i || n !== t);
  return t;
}
function Zi(e, t, n, i, s, r, o) {
  if (!e) return;
  !o && r && ku(e, i, s, r);
  let a = e;
  for (; e.prev !== e.next; ) {
    const l = e.prev, c = e.next;
    if (r ? Iu(e, i, s, r) : Lu(e)) {
      t.push(l.i, e.i, c.i), $i(e), e = c.next, a = c.next;
      continue;
    }
    if (e = c, e === a) {
      o ? o === 1 ? (e = Du(Vn(e), t), Zi(e, t, n, i, s, r, 2)) : o === 2 && Nu(e, t, n, i, s, r) : Zi(Vn(e), t, n, i, s, r, 1);
      break;
    }
  }
}
function Lu(e) {
  const t = e.prev, n = e, i = e.next;
  if (ht(t, n, i) >= 0) return !1;
  const s = t.x, r = n.x, o = i.x, a = t.y, l = n.y, c = i.y, h = Math.min(s, r, o), u = Math.min(a, l, c), d = Math.max(s, r, o), p = Math.max(a, l, c);
  let _ = i.next;
  for (; _ !== t; ) {
    if (_.x >= h && _.x <= d && _.y >= u && _.y <= p && Fi(s, a, r, l, o, c, _.x, _.y) && ht(_.prev, _, _.next) >= 0) return !1;
    _ = _.next;
  }
  return !0;
}
function Iu(e, t, n, i) {
  const s = e.prev, r = e, o = e.next;
  if (ht(s, r, o) >= 0) return !1;
  const a = s.x, l = r.x, c = o.x, h = s.y, u = r.y, d = o.y, p = Math.min(a, l, c), _ = Math.min(h, u, d), g = Math.max(a, l, c), m = Math.max(h, u, d), f = jr(p, _, t, n, i), y = jr(g, m, t, n, i);
  let v = e.prevZ, S = e.nextZ;
  for (; v && v.z >= f && S && S.z <= y; ) {
    if (v.x >= p && v.x <= g && v.y >= _ && v.y <= m && v !== s && v !== o && Fi(a, h, l, u, c, d, v.x, v.y) && ht(v.prev, v, v.next) >= 0 || (v = v.prevZ, S.x >= p && S.x <= g && S.y >= _ && S.y <= m && S !== s && S !== o && Fi(a, h, l, u, c, d, S.x, S.y) && ht(S.prev, S, S.next) >= 0)) return !1;
    S = S.nextZ;
  }
  for (; v && v.z >= f; ) {
    if (v.x >= p && v.x <= g && v.y >= _ && v.y <= m && v !== s && v !== o && Fi(a, h, l, u, c, d, v.x, v.y) && ht(v.prev, v, v.next) >= 0) return !1;
    v = v.prevZ;
  }
  for (; S && S.z <= y; ) {
    if (S.x >= p && S.x <= g && S.y >= _ && S.y <= m && S !== s && S !== o && Fi(a, h, l, u, c, d, S.x, S.y) && ht(S.prev, S, S.next) >= 0) return !1;
    S = S.nextZ;
  }
  return !0;
}
function Du(e, t) {
  let n = e;
  do {
    const i = n.prev, s = n.next.next;
    !_i(i, s) && Nl(i, n, n.next, s) && Ji(i, s) && Ji(s, i) && (t.push(i.i, n.i, s.i), $i(n), $i(n.next), n = e = s), n = n.next;
  } while (n !== e);
  return Vn(n);
}
function Nu(e, t, n, i, s, r) {
  let o = e;
  do {
    let a = o.next.next;
    for (; a !== o.prev; ) {
      if (o.i !== a.i && Gu(o, a)) {
        let l = Ul(o, a);
        o = Vn(o, o.next), l = Vn(l, l.next), Zi(o, t, n, i, s, r, 0), Zi(l, t, n, i, s, r, 0);
        return;
      }
      a = a.next;
    }
    o = o.next;
  } while (o !== e);
}
function Uu(e, t, n, i) {
  const s = [];
  for (let r = 0, o = t.length; r < o; r++) {
    const a = Il(e, t[r] * i, r < o - 1 ? t[r + 1] * i : e.length, i, !1);
    a === a.next && (a.steiner = !0), s.push(Vu(a));
  }
  s.sort(Ou);
  for (let r = 0; r < s.length; r++) n = Fu(s[r], n);
  return n;
}
function Ou(e, t) {
  let n = e.x - t.x;
  return n === 0 && (n = e.y - t.y, n === 0 && (n = (e.next.y - e.y) / (e.next.x - e.x) - (t.next.y - t.y) / (t.next.x - t.x))), n;
}
function Fu(e, t) {
  const n = Bu(e, t);
  if (!n) return t;
  const i = Ul(n, e);
  return Vn(i, i.next), Vn(n, n.next);
}
function Bu(e, t) {
  let n = t;
  const i = e.x, s = e.y;
  let r = -1 / 0, o;
  if (_i(e, n)) return n;
  do {
    if (_i(e, n.next)) return n.next;
    if (s <= n.y && s >= n.next.y && n.next.y !== n.y) {
      const u = n.x + (s - n.y) * (n.next.x - n.x) / (n.next.y - n.y);
      if (u <= i && u > r && (r = u, o = n.x < n.next.x ? n : n.next, u === i))
        return o;
    }
    n = n.next;
  } while (n !== t);
  if (!o) return null;
  const a = o, l = o.x, c = o.y;
  let h = 1 / 0;
  n = o;
  do {
    if (i >= n.x && n.x >= l && i !== n.x && Dl(s < c ? i : r, s, l, c, s < c ? r : i, s, n.x, n.y)) {
      const u = Math.abs(s - n.y) / (i - n.x);
      Ji(n, e) && (u < h || u === h && (n.x > o.x || n.x === o.x && zu(o, n))) && (o = n, h = u);
    }
    n = n.next;
  } while (n !== a);
  return o;
}
function zu(e, t) {
  return ht(e.prev, e, t.prev) < 0 && ht(t.next, e, e.next) < 0;
}
function ku(e, t, n, i) {
  let s = e;
  do
    s.z === 0 && (s.z = jr(s.x, s.y, t, n, i)), s.prevZ = s.prev, s.nextZ = s.next, s = s.next;
  while (s !== e);
  s.prevZ.nextZ = null, s.prevZ = null, Hu(s);
}
function Hu(e) {
  let t, n = 1;
  do {
    let i = e, s;
    e = null;
    let r = null;
    for (t = 0; i; ) {
      t++;
      let o = i, a = 0;
      for (let c = 0; c < n && (a++, o = o.nextZ, !!o); c++)
        ;
      let l = n;
      for (; a > 0 || l > 0 && o; )
        a !== 0 && (l === 0 || !o || i.z <= o.z) ? (s = i, i = i.nextZ, a--) : (s = o, o = o.nextZ, l--), r ? r.nextZ = s : e = s, s.prevZ = r, r = s;
      i = o;
    }
    r.nextZ = null, n *= 2;
  } while (t > 1);
  return e;
}
function jr(e, t, n, i, s) {
  return e = (e - n) * s | 0, t = (t - i) * s | 0, e = (e | e << 8) & 16711935, e = (e | e << 4) & 252645135, e = (e | e << 2) & 858993459, e = (e | e << 1) & 1431655765, t = (t | t << 8) & 16711935, t = (t | t << 4) & 252645135, t = (t | t << 2) & 858993459, t = (t | t << 1) & 1431655765, e | t << 1;
}
function Vu(e) {
  let t = e, n = e;
  do
    (t.x < n.x || t.x === n.x && t.y < n.y) && (n = t), t = t.next;
  while (t !== e);
  return n;
}
function Dl(e, t, n, i, s, r, o, a) {
  return (s - o) * (t - a) >= (e - o) * (r - a) && (e - o) * (i - a) >= (n - o) * (t - a) && (n - o) * (r - a) >= (s - o) * (i - a);
}
function Fi(e, t, n, i, s, r, o, a) {
  return !(e === o && t === a) && Dl(e, t, n, i, s, r, o, a);
}
function Gu(e, t) {
  return e.next.i !== t.i && e.prev.i !== t.i && !Wu(e, t) && (Ji(e, t) && Ji(t, e) && Xu(e, t) && (ht(e.prev, e, t.prev) || ht(e, t.prev, t)) || _i(e, t) && ht(e.prev, e, e.next) > 0 && ht(t.prev, t, t.next) > 0);
}
function ht(e, t, n) {
  return (t.y - e.y) * (n.x - t.x) - (t.x - e.x) * (n.y - t.y);
}
function _i(e, t) {
  return e.x === t.x && e.y === t.y;
}
function Nl(e, t, n, i) {
  const s = Is(ht(e, t, n)), r = Is(ht(e, t, i)), o = Is(ht(n, i, e)), a = Is(ht(n, i, t));
  return !!(s !== r && o !== a || s === 0 && Ls(e, n, t) || r === 0 && Ls(e, i, t) || o === 0 && Ls(n, e, i) || a === 0 && Ls(n, t, i));
}
function Ls(e, t, n) {
  return t.x <= Math.max(e.x, n.x) && t.x >= Math.min(e.x, n.x) && t.y <= Math.max(e.y, n.y) && t.y >= Math.min(e.y, n.y);
}
function Is(e) {
  return e > 0 ? 1 : e < 0 ? -1 : 0;
}
function Wu(e, t) {
  let n = e;
  do {
    if (n.i !== e.i && n.next.i !== e.i && n.i !== t.i && n.next.i !== t.i && Nl(n, n.next, e, t)) return !0;
    n = n.next;
  } while (n !== e);
  return !1;
}
function Ji(e, t) {
  return ht(e.prev, e, e.next) < 0 ? ht(e, t, e.next) >= 0 && ht(e, e.prev, t) >= 0 : ht(e, t, e.prev) < 0 || ht(e, e.next, t) < 0;
}
function Xu(e, t) {
  let n = e, i = !1;
  const s = (e.x + t.x) / 2, r = (e.y + t.y) / 2;
  do
    n.y > r != n.next.y > r && n.next.y !== n.y && s < (n.next.x - n.x) * (r - n.y) / (n.next.y - n.y) + n.x && (i = !i), n = n.next;
  while (n !== e);
  return i;
}
function Ul(e, t) {
  const n = Zr(e.i, e.x, e.y), i = Zr(t.i, t.x, t.y), s = e.next, r = t.prev;
  return e.next = t, t.prev = e, n.next = s, s.prev = n, i.next = n, n.prev = i, r.next = i, i.prev = r, i;
}
function ra(e, t, n, i) {
  const s = Zr(e, t, n);
  return i ? (s.next = i.next, s.prev = i, i.next.prev = s, i.next = s) : (s.prev = s, s.next = s), s;
}
function $i(e) {
  e.next.prev = e.prev, e.prev.next = e.next, e.prevZ && (e.prevZ.nextZ = e.nextZ), e.nextZ && (e.nextZ.prevZ = e.prevZ);
}
function Zr(e, t, n) {
  return {
    i: e,
    x: t,
    y: n,
    prev: null,
    next: null,
    z: 0,
    prevZ: null,
    nextZ: null,
    steiner: !1
  };
}
function Yu(e, t, n, i) {
  let s = 0;
  for (let r = t, o = n - i; r < n; r += i)
    s += (e[o] - e[r]) * (e[r + 1] + e[o + 1]), o = r;
  return s;
}
var qu = class {
  static triangulate(e, t, n = 2) {
    return Pu(e, t, n);
  }
}, Ds = class Ol {
  static area(t) {
    const n = t.length;
    let i = 0;
    for (let s = n - 1, r = 0; r < n; s = r++) i += t[s].x * t[r].y - t[r].x * t[s].y;
    return i * 0.5;
  }
  static isClockWise(t) {
    return Ol.area(t) < 0;
  }
  static triangulateShape(t, n) {
    const i = [], s = [], r = [];
    oa(t), aa(i, t);
    let o = t.length;
    n.forEach(oa);
    for (let l = 0; l < n.length; l++)
      s.push(o), o += n[l].length, aa(i, n[l]);
    const a = qu.triangulate(i, s);
    for (let l = 0; l < a.length; l += 3) r.push(a.slice(l, l + 3));
    return r;
  }
};
function oa(e) {
  const t = e.length;
  t > 2 && e[t - 1].equals(e[0]) && e.pop();
}
function aa(e, t) {
  for (let n = 0; n < t.length; n++)
    e.push(t[n].x), e.push(t[n].y);
}
var Ku = class Fl extends Lt {
  constructor(t = new Ll([
    new re(0.5, 0.5),
    new re(-0.5, 0.5),
    new re(-0.5, -0.5),
    new re(0.5, -0.5)
  ]), n = {}) {
    super(), this.type = "ExtrudeGeometry", this.parameters = {
      shapes: t,
      options: n
    }, t = Array.isArray(t) ? t : [t];
    const i = this, s = [], r = [];
    for (let a = 0, l = t.length; a < l; a++) {
      const c = t[a];
      o(c);
    }
    this.setAttribute("position", new ut(s, 3)), this.setAttribute("uv", new ut(r, 2)), this.computeVertexNormals();
    function o(a) {
      const l = [], c = n.curveSegments !== void 0 ? n.curveSegments : 12, h = n.steps !== void 0 ? n.steps : 1, u = n.depth !== void 0 ? n.depth : 1;
      let d = n.bevelEnabled !== void 0 ? n.bevelEnabled : !0, p = n.bevelThickness !== void 0 ? n.bevelThickness : 0.2, _ = n.bevelSize !== void 0 ? n.bevelSize : p - 0.1, g = n.bevelOffset !== void 0 ? n.bevelOffset : 0, m = n.bevelSegments !== void 0 ? n.bevelSegments : 3;
      const f = n.extrudePath, y = n.UVGenerator !== void 0 ? n.UVGenerator : ju;
      let v, S = !1, A, b, R, I;
      f && (v = f.getSpacedPoints(h), S = !0, d = !1, A = f.computeFrenetFrames(h, !1), b = new C(), R = new C(), I = new C()), d || (m = 0, p = 0, _ = 0, g = 0);
      const M = a.extractPoints(c);
      let E = M.shape;
      const P = M.holes;
      if (!Ds.isClockWise(E)) {
        E = E.reverse();
        for (let Z = 0, Q = P.length; Z < Q; Z++) {
          const se = P[Z];
          Ds.isClockWise(se) && (P[Z] = se.reverse());
        }
      }
      function F(Z) {
        const se = 10000000000000001e-36;
        let J = Z[0];
        for (let fe = 1; fe <= Z.length; fe++) {
          const he = fe % Z.length, ae = Z[he], ke = ae.x - J.x, He = ae.y - J.y, Xe = ke * ke + He * He, w = Math.max(Math.abs(ae.x), Math.abs(ae.y), Math.abs(J.x), Math.abs(J.y));
          if (Xe <= se * w * w) {
            Z.splice(he, 1), fe--;
            continue;
          }
          J = ae;
        }
      }
      F(E), P.forEach(F);
      const H = P.length, B = E;
      for (let Z = 0; Z < H; Z++) {
        const Q = P[Z];
        E = E.concat(Q);
      }
      function j(Z, Q, se) {
        return Q || console.error("THREE.ExtrudeGeometry: vec does not exist"), Z.clone().addScaledVector(Q, se);
      }
      const V = E.length;
      function te(Z, Q, se) {
        let J, fe, he;
        const ae = Z.x - Q.x, ke = Z.y - Q.y, He = se.x - Z.x, Xe = se.y - Z.y, w = ae * ae + ke * ke, x = ae * Xe - ke * He;
        if (Math.abs(x) > Number.EPSILON) {
          const U = Math.sqrt(w), K = Math.sqrt(He * He + Xe * Xe), ne = Q.x - ke / U, X = Q.y + ae / U, Se = se.x - Xe / K, ue = se.y + He / K, be = ((Se - ne) * Xe - (ue - X) * He) / (ae * Xe - ke * He);
          J = ne + ae * be - Z.x, fe = X + ke * be - Z.y;
          const Le = J * J + fe * fe;
          if (Le <= 2) return new re(J, fe);
          he = Math.sqrt(Le / 2);
        } else {
          let U = !1;
          ae > Number.EPSILON ? He > Number.EPSILON && (U = !0) : ae < -Number.EPSILON ? He < -Number.EPSILON && (U = !0) : Math.sign(ke) === Math.sign(Xe) && (U = !0), U ? (J = -ke, fe = ae, he = Math.sqrt(w)) : (J = ae, fe = ke, he = Math.sqrt(w / 2));
        }
        return new re(J / he, fe / he);
      }
      const W = [];
      for (let Z = 0, Q = B.length, se = Q - 1, J = Z + 1; Z < Q; Z++, se++, J++)
        se === Q && (se = 0), J === Q && (J = 0), W[Z] = te(B[Z], B[se], B[J]);
      const ee = [];
      let pe, De = W.concat();
      for (let Z = 0, Q = H; Z < Q; Z++) {
        const se = P[Z];
        pe = [];
        for (let J = 0, fe = se.length, he = fe - 1, ae = J + 1; J < fe; J++, he++, ae++)
          he === fe && (he = 0), ae === fe && (ae = 0), pe[J] = te(se[J], se[he], se[ae]);
        ee.push(pe), De = De.concat(pe);
      }
      let Ne;
      if (m === 0) Ne = Ds.triangulateShape(B, P);
      else {
        const Z = [], Q = [];
        for (let se = 0; se < m; se++) {
          const J = se / m, fe = p * Math.cos(J * Math.PI / 2), he = _ * Math.sin(J * Math.PI / 2) + g;
          for (let ae = 0, ke = B.length; ae < ke; ae++) {
            const He = j(B[ae], W[ae], he);
            ce(He.x, He.y, -fe), J === 0 && Z.push(He);
          }
          for (let ae = 0, ke = H; ae < ke; ae++) {
            const He = P[ae];
            pe = ee[ae];
            const Xe = [];
            for (let w = 0, x = He.length; w < x; w++) {
              const U = j(He[w], pe[w], he);
              ce(U.x, U.y, -fe), J === 0 && Xe.push(U);
            }
            J === 0 && Q.push(Xe);
          }
        }
        Ne = Ds.triangulateShape(Z, Q);
      }
      const Qe = Ne.length, Ke = _ + g;
      for (let Z = 0; Z < V; Z++) {
        const Q = d ? j(E[Z], De[Z], Ke) : E[Z];
        S ? (R.copy(A.normals[0]).multiplyScalar(Q.x), b.copy(A.binormals[0]).multiplyScalar(Q.y), I.copy(v[0]).add(R).add(b), ce(I.x, I.y, I.z)) : ce(Q.x, Q.y, 0);
      }
      for (let Z = 1; Z <= h; Z++) for (let Q = 0; Q < V; Q++) {
        const se = d ? j(E[Q], De[Q], Ke) : E[Q];
        S ? (R.copy(A.normals[Z]).multiplyScalar(se.x), b.copy(A.binormals[Z]).multiplyScalar(se.y), I.copy(v[Z]).add(R).add(b), ce(I.x, I.y, I.z)) : ce(se.x, se.y, u / h * Z);
      }
      for (let Z = m - 1; Z >= 0; Z--) {
        const Q = Z / m, se = p * Math.cos(Q * Math.PI / 2), J = _ * Math.sin(Q * Math.PI / 2) + g;
        for (let fe = 0, he = B.length; fe < he; fe++) {
          const ae = j(B[fe], W[fe], J);
          ce(ae.x, ae.y, u + se);
        }
        for (let fe = 0, he = P.length; fe < he; fe++) {
          const ae = P[fe];
          pe = ee[fe];
          for (let ke = 0, He = ae.length; ke < He; ke++) {
            const Xe = j(ae[ke], pe[ke], J);
            S ? ce(Xe.x, Xe.y + v[h - 1].y, v[h - 1].x + se) : ce(Xe.x, Xe.y, u + se);
          }
        }
      }
      Y(), q();
      function Y() {
        const Z = s.length / 3;
        if (d) {
          let Q = 0, se = V * Q;
          for (let J = 0; J < Qe; J++) {
            const fe = Ne[J];
            Me(fe[2] + se, fe[1] + se, fe[0] + se);
          }
          Q = h + m * 2, se = V * Q;
          for (let J = 0; J < Qe; J++) {
            const fe = Ne[J];
            Me(fe[0] + se, fe[1] + se, fe[2] + se);
          }
        } else {
          for (let Q = 0; Q < Qe; Q++) {
            const se = Ne[Q];
            Me(se[2], se[1], se[0]);
          }
          for (let Q = 0; Q < Qe; Q++) {
            const se = Ne[Q];
            Me(se[0] + V * h, se[1] + V * h, se[2] + V * h);
          }
        }
        i.addGroup(Z, s.length / 3 - Z, 0);
      }
      function q() {
        const Z = s.length / 3;
        let Q = 0;
        G(B, Q), Q += B.length;
        for (let se = 0, J = P.length; se < J; se++) {
          const fe = P[se];
          G(fe, Q), Q += fe.length;
        }
        i.addGroup(Z, s.length / 3 - Z, 1);
      }
      function G(Z, Q) {
        let se = Z.length;
        for (; --se >= 0; ) {
          const J = se;
          let fe = se - 1;
          fe < 0 && (fe = Z.length - 1);
          for (let he = 0, ae = h + m * 2; he < ae; he++) {
            const ke = V * he, He = V * (he + 1);
            ge(Q + J + ke, Q + fe + ke, Q + fe + He, Q + J + He);
          }
        }
      }
      function ce(Z, Q, se) {
        l.push(Z), l.push(Q), l.push(se);
      }
      function Me(Z, Q, se) {
        ze(Z), ze(Q), ze(se);
        const J = s.length / 3, fe = y.generateTopUV(i, s, J - 3, J - 2, J - 1);
        L(fe[0]), L(fe[1]), L(fe[2]);
      }
      function ge(Z, Q, se, J) {
        ze(Z), ze(Q), ze(J), ze(Q), ze(se), ze(J);
        const fe = s.length / 3, he = y.generateSideWallUV(i, s, fe - 6, fe - 3, fe - 2, fe - 1);
        L(he[0]), L(he[1]), L(he[3]), L(he[1]), L(he[2]), L(he[3]);
      }
      function ze(Z) {
        s.push(l[Z * 3 + 0]), s.push(l[Z * 3 + 1]), s.push(l[Z * 3 + 2]);
      }
      function L(Z) {
        r.push(Z.x), r.push(Z.y);
      }
    }
  }
  copy(t) {
    return super.copy(t), this.parameters = Object.assign({}, t.parameters), this;
  }
  toJSON() {
    const t = super.toJSON(), n = this.parameters.shapes, i = this.parameters.options;
    return Zu(n, i, t);
  }
  static fromJSON(t, n) {
    const i = [];
    for (let r = 0, o = t.shapes.length; r < o; r++) {
      const a = n[t.shapes[r]];
      i.push(a);
    }
    const s = t.options.extrudePath;
    return s !== void 0 && (t.options.extrudePath = new Kr[s.type]().fromJSON(s)), new Fl(i, t.options);
  }
}, ju = {
  generateTopUV: function(e, t, n, i, s) {
    const r = t[n * 3], o = t[n * 3 + 1], a = t[i * 3], l = t[i * 3 + 1], c = t[s * 3], h = t[s * 3 + 1];
    return [
      new re(r, o),
      new re(a, l),
      new re(c, h)
    ];
  },
  generateSideWallUV: function(e, t, n, i, s, r) {
    const o = t[n * 3], a = t[n * 3 + 1], l = t[n * 3 + 2], c = t[i * 3], h = t[i * 3 + 1], u = t[i * 3 + 2], d = t[s * 3], p = t[s * 3 + 1], _ = t[s * 3 + 2], g = t[r * 3], m = t[r * 3 + 1], f = t[r * 3 + 2];
    return Math.abs(a - h) < Math.abs(o - c) ? [
      new re(o, 1 - l),
      new re(c, 1 - u),
      new re(d, 1 - _),
      new re(g, 1 - f)
    ] : [
      new re(a, 1 - l),
      new re(h, 1 - u),
      new re(p, 1 - _),
      new re(m, 1 - f)
    ];
  }
};
function Zu(e, t, n) {
  if (n.shapes = [], Array.isArray(e)) for (let i = 0, s = e.length; i < s; i++) {
    const r = e[i];
    n.shapes.push(r.uuid);
  }
  else n.shapes.push(e.uuid);
  return n.options = Object.assign({}, t), t.extrudePath !== void 0 && (n.options.extrudePath = t.extrudePath.toJSON()), n;
}
var Bl = class zl extends Lt {
  constructor(t = 1, n = 1, i = 1, s = 1) {
    super(), this.type = "PlaneGeometry", this.parameters = {
      width: t,
      height: n,
      widthSegments: i,
      heightSegments: s
    };
    const r = t / 2, o = n / 2, a = Math.floor(i), l = Math.floor(s), c = a + 1, h = l + 1, u = t / a, d = n / l, p = [], _ = [], g = [], m = [];
    for (let f = 0; f < h; f++) {
      const y = f * d - o;
      for (let v = 0; v < c; v++) {
        const S = v * u - r;
        _.push(S, -y, 0), g.push(0, 0, 1), m.push(v / a), m.push(1 - f / l);
      }
    }
    for (let f = 0; f < l; f++) for (let y = 0; y < a; y++) {
      const v = y + c * f, S = y + c * (f + 1), A = y + 1 + c * (f + 1), b = y + 1 + c * f;
      p.push(v, S, b), p.push(S, A, b);
    }
    this.setIndex(p), this.setAttribute("position", new ut(_, 3)), this.setAttribute("normal", new ut(g, 3)), this.setAttribute("uv", new ut(m, 2));
  }
  copy(t) {
    return super.copy(t), this.parameters = Object.assign({}, t.parameters), this;
  }
  static fromJSON(t) {
    return new zl(t.width, t.height, t.widthSegments, t.heightSegments);
  }
}, kl = class Hl extends Lt {
  constructor(t = 1, n = 32, i = 16, s = 0, r = Math.PI * 2, o = 0, a = Math.PI) {
    super(), this.type = "SphereGeometry", this.parameters = {
      radius: t,
      widthSegments: n,
      heightSegments: i,
      phiStart: s,
      phiLength: r,
      thetaStart: o,
      thetaLength: a
    }, n = Math.max(3, Math.floor(n)), i = Math.max(2, Math.floor(i));
    const l = Math.min(o + a, Math.PI);
    let c = 0;
    const h = [], u = new C(), d = new C(), p = [], _ = [], g = [], m = [];
    for (let f = 0; f <= i; f++) {
      const y = [], v = f / i;
      let S = 0;
      f === 0 && o === 0 ? S = 0.5 / n : f === i && l === Math.PI && (S = -0.5 / n);
      for (let A = 0; A <= n; A++) {
        const b = A / n;
        u.x = -t * Math.cos(s + b * r) * Math.sin(o + v * a), u.y = t * Math.cos(o + v * a), u.z = t * Math.sin(s + b * r) * Math.sin(o + v * a), _.push(u.x, u.y, u.z), d.copy(u).normalize(), g.push(d.x, d.y, d.z), m.push(b + S, 1 - v), y.push(c++);
      }
      h.push(y);
    }
    for (let f = 0; f < i; f++) for (let y = 0; y < n; y++) {
      const v = h[f][y + 1], S = h[f][y], A = h[f + 1][y], b = h[f + 1][y + 1];
      (f !== 0 || o > 0) && p.push(v, S, b), (f !== i - 1 || l < Math.PI) && p.push(S, A, b);
    }
    this.setIndex(p), this.setAttribute("position", new ut(_, 3)), this.setAttribute("normal", new ut(g, 3)), this.setAttribute("uv", new ut(m, 2));
  }
  copy(t) {
    return super.copy(t), this.parameters = Object.assign({}, t.parameters), this;
  }
  static fromJSON(t) {
    return new Hl(t.radius, t.widthSegments, t.heightSegments, t.phiStart, t.phiLength, t.thetaStart, t.thetaLength);
  }
}, js = class extends tn {
  constructor(e) {
    super(), this.isMeshStandardMaterial = !0, this.type = "MeshStandardMaterial", this.defines = { STANDARD: "" }, this.color = new Be(16777215), this.roughness = 1, this.metalness = 0, this.map = null, this.lightMap = null, this.lightMapIntensity = 1, this.aoMap = null, this.aoMapIntensity = 1, this.emissive = new Be(0), this.emissiveIntensity = 1, this.emissiveMap = null, this.bumpMap = null, this.bumpScale = 1, this.normalMap = null, this.normalMapType = 0, this.normalScale = new re(1, 1), this.displacementMap = null, this.displacementScale = 1, this.displacementBias = 0, this.roughnessMap = null, this.metalnessMap = null, this.alphaMap = null, this.envMap = null, this.envMapRotation = new An(), this.envMapIntensity = 1, this.wireframe = !1, this.wireframeLinewidth = 1, this.wireframeLinecap = "round", this.wireframeLinejoin = "round", this.flatShading = !1, this.fog = !0, this.setValues(e);
  }
  copy(e) {
    return super.copy(e), this.defines = { STANDARD: "" }, this.color.copy(e.color), this.roughness = e.roughness, this.metalness = e.metalness, this.map = e.map, this.lightMap = e.lightMap, this.lightMapIntensity = e.lightMapIntensity, this.aoMap = e.aoMap, this.aoMapIntensity = e.aoMapIntensity, this.emissive.copy(e.emissive), this.emissiveMap = e.emissiveMap, this.emissiveIntensity = e.emissiveIntensity, this.bumpMap = e.bumpMap, this.bumpScale = e.bumpScale, this.normalMap = e.normalMap, this.normalMapType = e.normalMapType, this.normalScale.copy(e.normalScale), this.displacementMap = e.displacementMap, this.displacementScale = e.displacementScale, this.displacementBias = e.displacementBias, this.roughnessMap = e.roughnessMap, this.metalnessMap = e.metalnessMap, this.alphaMap = e.alphaMap, this.envMap = e.envMap, this.envMapRotation.copy(e.envMapRotation), this.envMapIntensity = e.envMapIntensity, this.wireframe = e.wireframe, this.wireframeLinewidth = e.wireframeLinewidth, this.wireframeLinecap = e.wireframeLinecap, this.wireframeLinejoin = e.wireframeLinejoin, this.flatShading = e.flatShading, this.fog = e.fog, this;
  }
}, on = class extends js {
  constructor(e) {
    super(), this.isMeshPhysicalMaterial = !0, this.defines = {
      STANDARD: "",
      PHYSICAL: ""
    }, this.type = "MeshPhysicalMaterial", this.anisotropyRotation = 0, this.anisotropyMap = null, this.clearcoatMap = null, this.clearcoatRoughness = 0, this.clearcoatRoughnessMap = null, this.clearcoatNormalScale = new re(1, 1), this.clearcoatNormalMap = null, this.ior = 1.5, Object.defineProperty(this, "reflectivity", {
      get: function() {
        return Ge(2.5 * (this.ior - 1) / (this.ior + 1), 0, 1);
      },
      set: function(t) {
        this.ior = (1 + 0.4 * t) / (1 - 0.4 * t);
      }
    }), this.iridescenceMap = null, this.iridescenceIOR = 1.3, this.iridescenceThicknessRange = [100, 400], this.iridescenceThicknessMap = null, this.sheenColor = new Be(0), this.sheenColorMap = null, this.sheenRoughness = 1, this.sheenRoughnessMap = null, this.transmissionMap = null, this.thickness = 0, this.thicknessMap = null, this.attenuationDistance = 1 / 0, this.attenuationColor = new Be(1, 1, 1), this.specularIntensity = 1, this.specularIntensityMap = null, this.specularColor = new Be(1, 1, 1), this.specularColorMap = null, this._anisotropy = 0, this._clearcoat = 0, this._dispersion = 0, this._iridescence = 0, this._sheen = 0, this._transmission = 0, this.setValues(e);
  }
  get anisotropy() {
    return this._anisotropy;
  }
  set anisotropy(e) {
    this._anisotropy > 0 != e > 0 && this.version++, this._anisotropy = e;
  }
  get clearcoat() {
    return this._clearcoat;
  }
  set clearcoat(e) {
    this._clearcoat > 0 != e > 0 && this.version++, this._clearcoat = e;
  }
  get iridescence() {
    return this._iridescence;
  }
  set iridescence(e) {
    this._iridescence > 0 != e > 0 && this.version++, this._iridescence = e;
  }
  get dispersion() {
    return this._dispersion;
  }
  set dispersion(e) {
    this._dispersion > 0 != e > 0 && this.version++, this._dispersion = e;
  }
  get sheen() {
    return this._sheen;
  }
  set sheen(e) {
    this._sheen > 0 != e > 0 && this.version++, this._sheen = e;
  }
  get transmission() {
    return this._transmission;
  }
  set transmission(e) {
    this._transmission > 0 != e > 0 && this.version++, this._transmission = e;
  }
  copy(e) {
    return super.copy(e), this.defines = {
      STANDARD: "",
      PHYSICAL: ""
    }, this.anisotropy = e.anisotropy, this.anisotropyRotation = e.anisotropyRotation, this.anisotropyMap = e.anisotropyMap, this.clearcoat = e.clearcoat, this.clearcoatMap = e.clearcoatMap, this.clearcoatRoughness = e.clearcoatRoughness, this.clearcoatRoughnessMap = e.clearcoatRoughnessMap, this.clearcoatNormalMap = e.clearcoatNormalMap, this.clearcoatNormalScale.copy(e.clearcoatNormalScale), this.dispersion = e.dispersion, this.ior = e.ior, this.iridescence = e.iridescence, this.iridescenceMap = e.iridescenceMap, this.iridescenceIOR = e.iridescenceIOR, this.iridescenceThicknessRange = [...e.iridescenceThicknessRange], this.iridescenceThicknessMap = e.iridescenceThicknessMap, this.sheen = e.sheen, this.sheenColor.copy(e.sheenColor), this.sheenColorMap = e.sheenColorMap, this.sheenRoughness = e.sheenRoughness, this.sheenRoughnessMap = e.sheenRoughnessMap, this.transmission = e.transmission, this.transmissionMap = e.transmissionMap, this.thickness = e.thickness, this.thicknessMap = e.thicknessMap, this.attenuationDistance = e.attenuationDistance, this.attenuationColor.copy(e.attenuationColor), this.specularIntensity = e.specularIntensity, this.specularIntensityMap = e.specularIntensityMap, this.specularColor.copy(e.specularColor), this.specularColorMap = e.specularColorMap, this;
  }
}, Ju = class extends tn {
  constructor(e) {
    super(), this.isMeshDepthMaterial = !0, this.type = "MeshDepthMaterial", this.depthPacking = hh, this.map = null, this.alphaMap = null, this.displacementMap = null, this.displacementScale = 1, this.displacementBias = 0, this.wireframe = !1, this.wireframeLinewidth = 1, this.setValues(e);
  }
  copy(e) {
    return super.copy(e), this.depthPacking = e.depthPacking, this.map = e.map, this.alphaMap = e.alphaMap, this.displacementMap = e.displacementMap, this.displacementScale = e.displacementScale, this.displacementBias = e.displacementBias, this.wireframe = e.wireframe, this.wireframeLinewidth = e.wireframeLinewidth, this;
  }
}, $u = class extends tn {
  constructor(e) {
    super(), this.isMeshDistanceMaterial = !0, this.type = "MeshDistanceMaterial", this.map = null, this.alphaMap = null, this.displacementMap = null, this.displacementScale = 1, this.displacementBias = 0, this.setValues(e);
  }
  copy(e) {
    return super.copy(e), this.map = e.map, this.alphaMap = e.alphaMap, this.displacementMap = e.displacementMap, this.displacementScale = e.displacementScale, this.displacementBias = e.displacementBias, this;
  }
}, Qu = class extends lo {
  constructor(e) {
    super(), this.isLineDashedMaterial = !0, this.type = "LineDashedMaterial", this.scale = 1, this.dashSize = 3, this.gapSize = 1, this.setValues(e);
  }
  copy(e) {
    return super.copy(e), this.scale = e.scale, this.dashSize = e.dashSize, this.gapSize = e.gapSize, this;
  }
};
function Ns(e, t) {
  return !e || e.constructor === t ? e : typeof t.BYTES_PER_ELEMENT == "number" ? new t(e) : Array.prototype.slice.call(e);
}
function ed(e) {
  return ArrayBuffer.isView(e) && !(e instanceof DataView);
}
function td(e) {
  function t(s, r) {
    return e[s] - e[r];
  }
  const n = e.length, i = new Array(n);
  for (let s = 0; s !== n; ++s) i[s] = s;
  return i.sort(t), i;
}
function la(e, t, n) {
  const i = e.length, s = new e.constructor(i);
  for (let r = 0, o = 0; o !== i; ++r) {
    const a = n[r] * t;
    for (let l = 0; l !== t; ++l) s[o++] = e[a + l];
  }
  return s;
}
function Vl(e, t, n, i) {
  let s = 1, r = e[0];
  for (; r !== void 0 && r[i] === void 0; ) r = e[s++];
  if (r === void 0) return;
  let o = r[i];
  if (o !== void 0)
    if (Array.isArray(o)) do
      o = r[i], o !== void 0 && (t.push(r.time), n.push(...o)), r = e[s++];
    while (r !== void 0);
    else if (o.toArray !== void 0) do
      o = r[i], o !== void 0 && (t.push(r.time), o.toArray(n, n.length)), r = e[s++];
    while (r !== void 0);
    else do
      o = r[i], o !== void 0 && (t.push(r.time), n.push(o)), r = e[s++];
    while (r !== void 0);
}
var ss = class {
  constructor(e, t, n, i) {
    this.parameterPositions = e, this._cachedIndex = 0, this.resultBuffer = i !== void 0 ? i : new t.constructor(n), this.sampleValues = t, this.valueSize = n, this.settings = null, this.DefaultSettings_ = {};
  }
  evaluate(e) {
    const t = this.parameterPositions;
    let n = this._cachedIndex, i = t[n], s = t[n - 1];
    n: {
      e: {
        let r;
        t: {
          i: if (!(e < i)) {
            for (let o = n + 2; ; ) {
              if (i === void 0) {
                if (e < s) break i;
                return n = t.length, this._cachedIndex = n, this.copySampleValue_(n - 1);
              }
              if (n === o) break;
              if (s = i, i = t[++n], e < i) break e;
            }
            r = t.length;
            break t;
          }
          if (!(e >= s)) {
            const o = t[1];
            e < o && (n = 2, s = o);
            for (let a = n - 2; ; ) {
              if (s === void 0)
                return this._cachedIndex = 0, this.copySampleValue_(0);
              if (n === a) break;
              if (i = s, s = t[--n - 1], e >= s) break e;
            }
            r = n, n = 0;
            break t;
          }
          break n;
        }
        for (; n < r; ) {
          const o = n + r >>> 1;
          e < t[o] ? r = o : n = o + 1;
        }
        if (i = t[n], s = t[n - 1], s === void 0)
          return this._cachedIndex = 0, this.copySampleValue_(0);
        if (i === void 0)
          return n = t.length, this._cachedIndex = n, this.copySampleValue_(n - 1);
      }
      this._cachedIndex = n, this.intervalChanged_(n, s, i);
    }
    return this.interpolate_(n, s, e, i);
  }
  getSettings_() {
    return this.settings || this.DefaultSettings_;
  }
  copySampleValue_(e) {
    const t = this.resultBuffer, n = this.sampleValues, i = this.valueSize, s = e * i;
    for (let r = 0; r !== i; ++r) t[r] = n[s + r];
    return t;
  }
  interpolate_() {
    throw new Error("call to abstract method");
  }
  intervalChanged_() {
  }
}, nd = class extends ss {
  constructor(e, t, n, i) {
    super(e, t, n, i), this._weightPrev = -0, this._offsetPrev = -0, this._weightNext = -0, this._offsetNext = -0, this.DefaultSettings_ = {
      endingStart: So,
      endingEnd: So
    };
  }
  intervalChanged_(e, t, n) {
    const i = this.parameterPositions;
    let s = e - 2, r = e + 1, o = i[s], a = i[r];
    if (o === void 0) switch (this.getSettings_().endingStart) {
      case Eo:
        s = e, o = 2 * t - n;
        break;
      case To:
        s = i.length - 2, o = t + i[s] - i[s + 1];
        break;
      default:
        s = e, o = n;
    }
    if (a === void 0) switch (this.getSettings_().endingEnd) {
      case Eo:
        r = e, a = 2 * n - t;
        break;
      case To:
        r = 1, a = n + i[1] - i[0];
        break;
      default:
        r = e - 1, a = t;
    }
    const l = (n - t) * 0.5, c = this.valueSize;
    this._weightPrev = l / (t - o), this._weightNext = l / (a - n), this._offsetPrev = s * c, this._offsetNext = r * c;
  }
  interpolate_(e, t, n, i) {
    const s = this.resultBuffer, r = this.sampleValues, o = this.valueSize, a = e * o, l = a - o, c = this._offsetPrev, h = this._offsetNext, u = this._weightPrev, d = this._weightNext, p = (n - t) / (i - t), _ = p * p, g = _ * p, m = -u * g + 2 * u * _ - u * p, f = (1 + u) * g + (-1.5 - 2 * u) * _ + (-0.5 + u) * p + 1, y = (-1 - d) * g + (1.5 + d) * _ + 0.5 * p, v = d * g - d * _;
    for (let S = 0; S !== o; ++S) s[S] = m * r[c + S] + f * r[l + S] + y * r[a + S] + v * r[h + S];
    return s;
  }
}, id = class extends ss {
  constructor(e, t, n, i) {
    super(e, t, n, i);
  }
  interpolate_(e, t, n, i) {
    const s = this.resultBuffer, r = this.sampleValues, o = this.valueSize, a = e * o, l = a - o, c = (n - t) / (i - t), h = 1 - c;
    for (let u = 0; u !== o; ++u) s[u] = r[l + u] * h + r[a + u] * c;
    return s;
  }
}, sd = class extends ss {
  constructor(e, t, n, i) {
    super(e, t, n, i);
  }
  interpolate_(e) {
    return this.copySampleValue_(e - 1);
  }
}, Zt = class {
  constructor(e, t, n, i) {
    if (e === void 0) throw new Error("THREE.KeyframeTrack: track name is undefined");
    if (t === void 0 || t.length === 0) throw new Error("THREE.KeyframeTrack: no keyframes in track named " + e);
    this.name = e, this.times = Ns(t, this.TimeBufferType), this.values = Ns(n, this.ValueBufferType), this.setInterpolation(i || this.DefaultInterpolation);
  }
  static toJSON(e) {
    const t = e.constructor;
    let n;
    if (t.toJSON !== this.toJSON) n = t.toJSON(e);
    else {
      n = {
        name: e.name,
        times: Ns(e.times, Array),
        values: Ns(e.values, Array)
      };
      const i = e.getInterpolation();
      i !== e.DefaultInterpolation && (n.interpolation = i);
    }
    return n.type = e.ValueTypeName, n;
  }
  InterpolantFactoryMethodDiscrete(e) {
    return new sd(this.times, this.values, this.getValueSize(), e);
  }
  InterpolantFactoryMethodLinear(e) {
    return new id(this.times, this.values, this.getValueSize(), e);
  }
  InterpolantFactoryMethodSmooth(e) {
    return new nd(this.times, this.values, this.getValueSize(), e);
  }
  setInterpolation(e) {
    let t;
    switch (e) {
      case Xi:
        t = this.InterpolantFactoryMethodDiscrete;
        break;
      case Yi:
        t = this.InterpolantFactoryMethodLinear;
        break;
      case tr:
        t = this.InterpolantFactoryMethodSmooth;
        break;
    }
    if (t === void 0) {
      const n = "unsupported interpolation for " + this.ValueTypeName + " keyframe track named " + this.name;
      if (this.createInterpolant === void 0) if (e !== this.DefaultInterpolation) this.setInterpolation(this.DefaultInterpolation);
      else throw new Error(n);
      return console.warn("THREE.KeyframeTrack:", n), this;
    }
    return this.createInterpolant = t, this;
  }
  getInterpolation() {
    switch (this.createInterpolant) {
      case this.InterpolantFactoryMethodDiscrete:
        return Xi;
      case this.InterpolantFactoryMethodLinear:
        return Yi;
      case this.InterpolantFactoryMethodSmooth:
        return tr;
    }
  }
  getValueSize() {
    return this.values.length / this.times.length;
  }
  shift(e) {
    if (e !== 0) {
      const t = this.times;
      for (let n = 0, i = t.length; n !== i; ++n) t[n] += e;
    }
    return this;
  }
  scale(e) {
    if (e !== 1) {
      const t = this.times;
      for (let n = 0, i = t.length; n !== i; ++n) t[n] *= e;
    }
    return this;
  }
  trim(e, t) {
    const n = this.times, i = n.length;
    let s = 0, r = i - 1;
    for (; s !== i && n[s] < e; ) ++s;
    for (; r !== -1 && n[r] > t; ) --r;
    if (++r, s !== 0 || r !== i) {
      s >= r && (r = Math.max(r, 1), s = r - 1);
      const o = this.getValueSize();
      this.times = n.slice(s, r), this.values = this.values.slice(s * o, r * o);
    }
    return this;
  }
  validate() {
    let e = !0;
    const t = this.getValueSize();
    t - Math.floor(t) !== 0 && (console.error("THREE.KeyframeTrack: Invalid value size in track.", this), e = !1);
    const n = this.times, i = this.values, s = n.length;
    s === 0 && (console.error("THREE.KeyframeTrack: Track is empty.", this), e = !1);
    let r = null;
    for (let o = 0; o !== s; o++) {
      const a = n[o];
      if (typeof a == "number" && isNaN(a)) {
        console.error("THREE.KeyframeTrack: Time is not a valid number.", this, o, a), e = !1;
        break;
      }
      if (r !== null && r > a) {
        console.error("THREE.KeyframeTrack: Out of order keys.", this, o, a, r), e = !1;
        break;
      }
      r = a;
    }
    if (i !== void 0 && ed(i))
      for (let o = 0, a = i.length; o !== a; ++o) {
        const l = i[o];
        if (isNaN(l)) {
          console.error("THREE.KeyframeTrack: Value is not a valid number.", this, o, l), e = !1;
          break;
        }
      }
    return e;
  }
  optimize() {
    const e = this.times.slice(), t = this.values.slice(), n = this.getValueSize(), i = this.getInterpolation() === tr, s = e.length - 1;
    let r = 1;
    for (let o = 1; o < s; ++o) {
      let a = !1;
      const l = e[o];
      if (l !== e[o + 1] && (o !== 1 || l !== e[0])) if (i)
        a = !0;
      else {
        const c = o * n, h = c - n, u = c + n;
        for (let d = 0; d !== n; ++d) {
          const p = t[c + d];
          if (p !== t[h + d] || p !== t[u + d]) {
            a = !0;
            break;
          }
        }
      }
      if (a) {
        if (o !== r) {
          e[r] = e[o];
          const c = o * n, h = r * n;
          for (let u = 0; u !== n; ++u) t[h + u] = t[c + u];
        }
        ++r;
      }
    }
    if (s > 0) {
      e[r] = e[s];
      for (let o = s * n, a = r * n, l = 0; l !== n; ++l) t[a + l] = t[o + l];
      ++r;
    }
    return r !== e.length ? (this.times = e.slice(0, r), this.values = t.slice(0, r * n)) : (this.times = e, this.values = t), this;
  }
  clone() {
    const e = this.times.slice(), t = this.values.slice(), n = this.constructor, i = new n(this.name, e, t);
    return i.createInterpolant = this.createInterpolant, i;
  }
};
Zt.prototype.ValueTypeName = "";
Zt.prototype.TimeBufferType = Float32Array;
Zt.prototype.ValueBufferType = Float32Array;
Zt.prototype.DefaultInterpolation = Yi;
var Mi = class extends Zt {
  constructor(e, t, n) {
    super(e, t, n);
  }
};
Mi.prototype.ValueTypeName = "bool";
Mi.prototype.ValueBufferType = Array;
Mi.prototype.DefaultInterpolation = Xi;
Mi.prototype.InterpolantFactoryMethodLinear = void 0;
Mi.prototype.InterpolantFactoryMethodSmooth = void 0;
var Gl = class extends Zt {
  constructor(e, t, n, i) {
    super(e, t, n, i);
  }
};
Gl.prototype.ValueTypeName = "color";
var vi = class extends Zt {
  constructor(e, t, n, i) {
    super(e, t, n, i);
  }
};
vi.prototype.ValueTypeName = "number";
var rd = class extends ss {
  constructor(e, t, n, i) {
    super(e, t, n, i);
  }
  interpolate_(e, t, n, i) {
    const s = this.resultBuffer, r = this.sampleValues, o = this.valueSize, a = (n - t) / (i - t);
    let l = e * o;
    for (let c = l + o; l !== c; l += 4) nn.slerpFlat(s, 0, r, l - o, r, l, a);
    return s;
  }
}, xi = class extends Zt {
  constructor(e, t, n, i) {
    super(e, t, n, i);
  }
  InterpolantFactoryMethodLinear(e) {
    return new rd(this.times, this.values, this.getValueSize(), e);
  }
};
xi.prototype.ValueTypeName = "quaternion";
xi.prototype.InterpolantFactoryMethodSmooth = void 0;
var Si = class extends Zt {
  constructor(e, t, n) {
    super(e, t, n);
  }
};
Si.prototype.ValueTypeName = "string";
Si.prototype.ValueBufferType = Array;
Si.prototype.DefaultInterpolation = Xi;
Si.prototype.InterpolantFactoryMethodLinear = void 0;
Si.prototype.InterpolantFactoryMethodSmooth = void 0;
var yi = class extends Zt {
  constructor(e, t, n, i) {
    super(e, t, n, i);
  }
};
yi.prototype.ValueTypeName = "vector";
var od = class {
  constructor(e = "", t = -1, n = [], i = ch) {
    this.name = e, this.tracks = n, this.duration = t, this.blendMode = i, this.uuid = Ht(), this.userData = {}, this.duration < 0 && this.resetDuration();
  }
  static parse(e) {
    const t = [], n = e.tracks, i = 1 / (e.fps || 1);
    for (let r = 0, o = n.length; r !== o; ++r) t.push(ld(n[r]).scale(i));
    const s = new this(e.name, e.duration, t, e.blendMode);
    return s.uuid = e.uuid, s.userData = JSON.parse(e.userData || "{}"), s;
  }
  static toJSON(e) {
    const t = [], n = e.tracks, i = {
      name: e.name,
      duration: e.duration,
      tracks: t,
      uuid: e.uuid,
      blendMode: e.blendMode,
      userData: JSON.stringify(e.userData)
    };
    for (let s = 0, r = n.length; s !== r; ++s) t.push(Zt.toJSON(n[s]));
    return i;
  }
  static CreateFromMorphTargetSequence(e, t, n, i) {
    const s = t.length, r = [];
    for (let o = 0; o < s; o++) {
      let a = [], l = [];
      a.push((o + s - 1) % s, o, (o + 1) % s), l.push(0, 1, 0);
      const c = td(a);
      a = la(a, 1, c), l = la(l, 1, c), !i && a[0] === 0 && (a.push(s), l.push(l[0])), r.push(new vi(".morphTargetInfluences[" + t[o].name + "]", a, l).scale(1 / n));
    }
    return new this(e, -1, r);
  }
  static findByName(e, t) {
    let n = e;
    if (!Array.isArray(e)) {
      const i = e;
      n = i.geometry && i.geometry.animations || i.animations;
    }
    for (let i = 0; i < n.length; i++) if (n[i].name === t) return n[i];
    return null;
  }
  static CreateClipsFromMorphTargetSequences(e, t, n) {
    const i = {}, s = /^([\w-]*?)([\d]+)$/;
    for (let o = 0, a = e.length; o < a; o++) {
      const l = e[o], c = l.name.match(s);
      if (c && c.length > 1) {
        const h = c[1];
        let u = i[h];
        u || (i[h] = u = []), u.push(l);
      }
    }
    const r = [];
    for (const o in i) r.push(this.CreateFromMorphTargetSequence(o, i[o], t, n));
    return r;
  }
  static parseAnimation(e, t) {
    if (console.warn("THREE.AnimationClip: parseAnimation() is deprecated and will be removed with r185"), !e)
      return console.error("THREE.AnimationClip: No animation in JSONLoader data."), null;
    const n = function(c, h, u, d, p) {
      if (u.length !== 0) {
        const _ = [], g = [];
        Vl(u, _, g, d), _.length !== 0 && p.push(new c(h, _, g));
      }
    }, i = [], s = e.name || "default", r = e.fps || 30, o = e.blendMode;
    let a = e.length || -1;
    const l = e.hierarchy || [];
    for (let c = 0; c < l.length; c++) {
      const h = l[c].keys;
      if (!(!h || h.length === 0))
        if (h[0].morphTargets) {
          const u = {};
          let d;
          for (d = 0; d < h.length; d++) if (h[d].morphTargets) for (let p = 0; p < h[d].morphTargets.length; p++) u[h[d].morphTargets[p]] = -1;
          for (const p in u) {
            const _ = [], g = [];
            for (let m = 0; m !== h[d].morphTargets.length; ++m) {
              const f = h[d];
              _.push(f.time), g.push(f.morphTarget === p ? 1 : 0);
            }
            i.push(new vi(".morphTargetInfluence[" + p + "]", _, g));
          }
          a = u.length * r;
        } else {
          const u = ".bones[" + t[c].name + "]";
          n(yi, u + ".position", h, "pos", i), n(xi, u + ".quaternion", h, "rot", i), n(yi, u + ".scale", h, "scl", i);
        }
    }
    return i.length === 0 ? null : new this(s, a, i, o);
  }
  resetDuration() {
    const e = this.tracks;
    let t = 0;
    for (let n = 0, i = e.length; n !== i; ++n) {
      const s = this.tracks[n];
      t = Math.max(t, s.times[s.times.length - 1]);
    }
    return this.duration = t, this;
  }
  trim() {
    for (let e = 0; e < this.tracks.length; e++) this.tracks[e].trim(0, this.duration);
    return this;
  }
  validate() {
    let e = !0;
    for (let t = 0; t < this.tracks.length; t++) e = e && this.tracks[t].validate();
    return e;
  }
  optimize() {
    for (let e = 0; e < this.tracks.length; e++) this.tracks[e].optimize();
    return this;
  }
  clone() {
    const e = [];
    for (let n = 0; n < this.tracks.length; n++) e.push(this.tracks[n].clone());
    const t = new this.constructor(this.name, this.duration, e, this.blendMode);
    return t.userData = JSON.parse(JSON.stringify(this.userData)), t;
  }
  toJSON() {
    return this.constructor.toJSON(this);
  }
};
function ad(e) {
  switch (e.toLowerCase()) {
    case "scalar":
    case "double":
    case "float":
    case "number":
    case "integer":
      return vi;
    case "vector":
    case "vector2":
    case "vector3":
    case "vector4":
      return yi;
    case "color":
      return Gl;
    case "quaternion":
      return xi;
    case "bool":
    case "boolean":
      return Mi;
    case "string":
      return Si;
  }
  throw new Error("THREE.KeyframeTrack: Unsupported typeName: " + e);
}
function ld(e) {
  if (e.type === void 0) throw new Error("THREE.KeyframeTrack: track type undefined, can not parse");
  const t = ad(e.type);
  if (e.times === void 0) {
    const n = [], i = [];
    Vl(e.keys, n, i, "value"), e.times = n, e.values = i;
  }
  return t.parse !== void 0 ? t.parse(e) : new t(e.name, e.times, e.values, e.interpolation);
}
var pn = {
  enabled: !1,
  files: {},
  add: function(e, t) {
    this.enabled !== !1 && (this.files[e] = t);
  },
  get: function(e) {
    if (this.enabled !== !1)
      return this.files[e];
  },
  remove: function(e) {
    delete this.files[e];
  },
  clear: function() {
    this.files = {};
  }
}, cd = class {
  constructor(e, t, n) {
    const i = this;
    let s = !1, r = 0, o = 0, a;
    const l = [];
    this.onStart = void 0, this.onLoad = e, this.onProgress = t, this.onError = n, this.abortController = new AbortController(), this.itemStart = function(c) {
      o++, s === !1 && i.onStart !== void 0 && i.onStart(c, r, o), s = !0;
    }, this.itemEnd = function(c) {
      r++, i.onProgress !== void 0 && i.onProgress(c, r, o), r === o && (s = !1, i.onLoad !== void 0 && i.onLoad());
    }, this.itemError = function(c) {
      i.onError !== void 0 && i.onError(c);
    }, this.resolveURL = function(c) {
      return a ? a(c) : c;
    }, this.setURLModifier = function(c) {
      return a = c, this;
    }, this.addHandler = function(c, h) {
      return l.push(c, h), this;
    }, this.removeHandler = function(c) {
      const h = l.indexOf(c);
      return h !== -1 && l.splice(h, 2), this;
    }, this.getHandler = function(c) {
      for (let h = 0, u = l.length; h < u; h += 2) {
        const d = l[h], p = l[h + 1];
        if (d.global && (d.lastIndex = 0), d.test(c)) return p;
      }
      return null;
    }, this.abort = function() {
      return this.abortController.abort(), this.abortController = new AbortController(), this;
    };
  }
}, hd = /* @__PURE__ */ new cd(), Ei = class {
  constructor(e) {
    this.manager = e !== void 0 ? e : hd, this.crossOrigin = "anonymous", this.withCredentials = !1, this.path = "", this.resourcePath = "", this.requestHeader = {};
  }
  load() {
  }
  loadAsync(e, t) {
    const n = this;
    return new Promise(function(i, s) {
      n.load(e, i, t, s);
    });
  }
  parse() {
  }
  setCrossOrigin(e) {
    return this.crossOrigin = e, this;
  }
  setWithCredentials(e) {
    return this.withCredentials = e, this;
  }
  setPath(e) {
    return this.path = e, this;
  }
  setResourcePath(e) {
    return this.resourcePath = e, this;
  }
  setRequestHeader(e) {
    return this.requestHeader = e, this;
  }
  abort() {
    return this;
  }
};
Ei.DEFAULT_MATERIAL_NAME = "__DEFAULT";
var dn = {}, ud = class extends Error {
  constructor(e, t) {
    super(e), this.response = t;
  }
}, Wl = class extends Ei {
  constructor(e) {
    super(e), this.mimeType = "", this.responseType = "", this._abortController = new AbortController();
  }
  load(e, t, n, i) {
    e === void 0 && (e = ""), this.path !== void 0 && (e = this.path + e), e = this.manager.resolveURL(e);
    const s = pn.get(`file:${e}`);
    if (s !== void 0)
      return this.manager.itemStart(e), setTimeout(() => {
        t && t(s), this.manager.itemEnd(e);
      }, 0), s;
    if (dn[e] !== void 0) {
      dn[e].push({
        onLoad: t,
        onProgress: n,
        onError: i
      });
      return;
    }
    dn[e] = [], dn[e].push({
      onLoad: t,
      onProgress: n,
      onError: i
    });
    const r = new Request(e, {
      headers: new Headers(this.requestHeader),
      credentials: this.withCredentials ? "include" : "same-origin",
      signal: typeof AbortSignal.any == "function" ? AbortSignal.any([this._abortController.signal, this.manager.abortController.signal]) : this._abortController.signal
    }), o = this.mimeType, a = this.responseType;
    fetch(r).then((l) => {
      if (l.status === 200 || l.status === 0) {
        if (l.status === 0 && console.warn("THREE.FileLoader: HTTP Status 0 received."), typeof ReadableStream > "u" || l.body === void 0 || l.body.getReader === void 0) return l;
        const c = dn[e], h = l.body.getReader(), u = l.headers.get("X-File-Size") || l.headers.get("Content-Length"), d = u ? parseInt(u) : 0, p = d !== 0;
        let _ = 0;
        const g = new ReadableStream({ start(m) {
          f();
          function f() {
            h.read().then(({ done: y, value: v }) => {
              if (y) m.close();
              else {
                _ += v.byteLength;
                const S = new ProgressEvent("progress", {
                  lengthComputable: p,
                  loaded: _,
                  total: d
                });
                for (let A = 0, b = c.length; A < b; A++) {
                  const R = c[A];
                  R.onProgress && R.onProgress(S);
                }
                m.enqueue(v), f();
              }
            }, (y) => {
              m.error(y);
            });
          }
        } });
        return new Response(g);
      } else throw new ud(`fetch for "${l.url}" responded with ${l.status}: ${l.statusText}`, l);
    }).then((l) => {
      switch (a) {
        case "arraybuffer":
          return l.arrayBuffer();
        case "blob":
          return l.blob();
        case "document":
          return l.text().then((c) => new DOMParser().parseFromString(c, o));
        case "json":
          return l.json();
        default:
          if (o === "") return l.text();
          {
            const c = /charset="?([^;"\s]*)"?/i.exec(o), h = c && c[1] ? c[1].toLowerCase() : void 0, u = new TextDecoder(h);
            return l.arrayBuffer().then((d) => u.decode(d));
          }
      }
    }).then((l) => {
      pn.add(`file:${e}`, l);
      const c = dn[e];
      delete dn[e];
      for (let h = 0, u = c.length; h < u; h++) {
        const d = c[h];
        d.onLoad && d.onLoad(l);
      }
    }).catch((l) => {
      const c = dn[e];
      if (c === void 0)
        throw this.manager.itemError(e), l;
      delete dn[e];
      for (let h = 0, u = c.length; h < u; h++) {
        const d = c[h];
        d.onError && d.onError(l);
      }
      this.manager.itemError(e);
    }).finally(() => {
      this.manager.itemEnd(e);
    }), this.manager.itemStart(e);
  }
  setResponseType(e) {
    return this.responseType = e, this;
  }
  setMimeType(e) {
    return this.mimeType = e, this;
  }
  abort() {
    return this._abortController.abort(), this._abortController = new AbortController(), this;
  }
}, si = /* @__PURE__ */ new WeakMap(), dd = class extends Ei {
  constructor(e) {
    super(e);
  }
  load(e, t, n, i) {
    this.path !== void 0 && (e = this.path + e), e = this.manager.resolveURL(e);
    const s = this, r = pn.get(`image:${e}`);
    if (r !== void 0) {
      if (r.complete === !0)
        s.manager.itemStart(e), setTimeout(function() {
          t && t(r), s.manager.itemEnd(e);
        }, 0);
      else {
        let h = si.get(r);
        h === void 0 && (h = [], si.set(r, h)), h.push({
          onLoad: t,
          onError: i
        });
      }
      return r;
    }
    const o = qi("img");
    function a() {
      c(), t && t(this);
      const h = si.get(this) || [];
      for (let u = 0; u < h.length; u++) {
        const d = h[u];
        d.onLoad && d.onLoad(this);
      }
      si.delete(this), s.manager.itemEnd(e);
    }
    function l(h) {
      c(), i && i(h), pn.remove(`image:${e}`);
      const u = si.get(this) || [];
      for (let d = 0; d < u.length; d++) {
        const p = u[d];
        p.onError && p.onError(h);
      }
      si.delete(this), s.manager.itemError(e), s.manager.itemEnd(e);
    }
    function c() {
      o.removeEventListener("load", a, !1), o.removeEventListener("error", l, !1);
    }
    return o.addEventListener("load", a, !1), o.addEventListener("error", l, !1), e.slice(0, 5) !== "data:" && this.crossOrigin !== void 0 && (o.crossOrigin = this.crossOrigin), pn.add(`image:${e}`, o), s.manager.itemStart(e), o.src = e, o;
  }
}, fd = class extends Ei {
  constructor(e) {
    super(e);
  }
  load(e, t, n, i) {
    const s = new Pt(), r = new dd(this.manager);
    return r.setCrossOrigin(this.crossOrigin), r.setPath(this.path), r.load(e, function(o) {
      s.image = o, s.needsUpdate = !0, t !== void 0 && t(s);
    }, n, i), s;
  }
}, Zs = class extends pt {
  constructor(e, t = 1) {
    super(), this.isLight = !0, this.type = "Light", this.color = new Be(e), this.intensity = t;
  }
  dispose() {
  }
  copy(e, t) {
    return super.copy(e, t), this.color.copy(e.color), this.intensity = e.intensity, this;
  }
  toJSON(e) {
    const t = super.toJSON(e);
    return t.object.color = this.color.getHex(), t.object.intensity = this.intensity, this.groundColor !== void 0 && (t.object.groundColor = this.groundColor.getHex()), this.distance !== void 0 && (t.object.distance = this.distance), this.angle !== void 0 && (t.object.angle = this.angle), this.decay !== void 0 && (t.object.decay = this.decay), this.penumbra !== void 0 && (t.object.penumbra = this.penumbra), this.shadow !== void 0 && (t.object.shadow = this.shadow.toJSON()), this.target !== void 0 && (t.object.target = this.target.uuid), t;
  }
}, pd = class extends Zs {
  constructor(e, t, n) {
    super(e, n), this.isHemisphereLight = !0, this.type = "HemisphereLight", this.position.copy(pt.DEFAULT_UP), this.updateMatrix(), this.groundColor = new Be(t);
  }
  copy(e, t) {
    return super.copy(e, t), this.groundColor.copy(e.groundColor), this;
  }
}, Lr = /* @__PURE__ */ new Ve(), ca = /* @__PURE__ */ new C(), ha = /* @__PURE__ */ new C(), uo = class {
  constructor(e) {
    this.camera = e, this.intensity = 1, this.bias = 0, this.normalBias = 0, this.radius = 1, this.blurSamples = 8, this.mapSize = new re(512, 512), this.mapType = fi, this.map = null, this.mapPass = null, this.matrix = new Ve(), this.autoUpdate = !0, this.needsUpdate = !1, this._frustum = new ao(), this._frameExtents = new re(1, 1), this._viewportCount = 1, this._viewports = [new tt(0, 0, 1, 1)];
  }
  getViewportCount() {
    return this._viewportCount;
  }
  getFrustum() {
    return this._frustum;
  }
  updateMatrices(e) {
    const t = this.camera, n = this.matrix;
    ca.setFromMatrixPosition(e.matrixWorld), t.position.copy(ca), ha.setFromMatrixPosition(e.target.matrixWorld), t.lookAt(ha), t.updateMatrixWorld(), Lr.multiplyMatrices(t.projectionMatrix, t.matrixWorldInverse), this._frustum.setFromProjectionMatrix(Lr, t.coordinateSystem, t.reversedDepth), t.reversedDepth ? n.set(0.5, 0, 0, 0.5, 0, 0.5, 0, 0.5, 0, 0, 1, 0, 0, 0, 0, 1) : n.set(0.5, 0, 0, 0.5, 0, 0.5, 0, 0.5, 0, 0, 0.5, 0.5, 0, 0, 0, 1), n.multiply(Lr);
  }
  getViewport(e) {
    return this._viewports[e];
  }
  getFrameExtents() {
    return this._frameExtents;
  }
  dispose() {
    this.map && this.map.dispose(), this.mapPass && this.mapPass.dispose();
  }
  copy(e) {
    return this.camera = e.camera.clone(), this.intensity = e.intensity, this.bias = e.bias, this.radius = e.radius, this.autoUpdate = e.autoUpdate, this.needsUpdate = e.needsUpdate, this.normalBias = e.normalBias, this.blurSamples = e.blurSamples, this.mapSize.copy(e.mapSize), this;
  }
  clone() {
    return new this.constructor().copy(this);
  }
  toJSON() {
    const e = {};
    return this.intensity !== 1 && (e.intensity = this.intensity), this.bias !== 0 && (e.bias = this.bias), this.normalBias !== 0 && (e.normalBias = this.normalBias), this.radius !== 1 && (e.radius = this.radius), (this.mapSize.x !== 512 || this.mapSize.y !== 512) && (e.mapSize = this.mapSize.toArray()), e.camera = this.camera.toJSON(!1).object, delete e.camera.matrix, e;
  }
}, md = class extends uo {
  constructor() {
    super(new Ct(50, 1, 0.5, 500)), this.isSpotLightShadow = !0, this.focus = 1, this.aspect = 1;
  }
  updateMatrices(e) {
    const t = this.camera, n = mi * 2 * e.angle * this.focus, i = this.mapSize.width / this.mapSize.height * this.aspect, s = e.distance || t.far;
    (n !== t.fov || i !== t.aspect || s !== t.far) && (t.fov = n, t.aspect = i, t.far = s, t.updateProjectionMatrix()), super.updateMatrices(e);
  }
  copy(e) {
    return super.copy(e), this.focus = e.focus, this;
  }
}, gd = class extends Zs {
  constructor(e, t, n = 0, i = Math.PI / 3, s = 0, r = 2) {
    super(e, t), this.isSpotLight = !0, this.type = "SpotLight", this.position.copy(pt.DEFAULT_UP), this.updateMatrix(), this.target = new pt(), this.distance = n, this.angle = i, this.penumbra = s, this.decay = r, this.map = null, this.shadow = new md();
  }
  get power() {
    return this.intensity * Math.PI;
  }
  set power(e) {
    this.intensity = e / Math.PI;
  }
  dispose() {
    this.shadow.dispose();
  }
  copy(e, t) {
    return super.copy(e, t), this.distance = e.distance, this.angle = e.angle, this.penumbra = e.penumbra, this.decay = e.decay, this.target = e.target.clone(), this.shadow = e.shadow.clone(), this;
  }
}, ua = /* @__PURE__ */ new Ve(), Ni = /* @__PURE__ */ new C(), Ir = /* @__PURE__ */ new C(), _d = class extends uo {
  constructor() {
    super(new Ct(90, 1, 0.5, 500)), this.isPointLightShadow = !0, this._frameExtents = new re(4, 2), this._viewportCount = 6, this._viewports = [
      new tt(2, 1, 1, 1),
      new tt(0, 1, 1, 1),
      new tt(3, 1, 1, 1),
      new tt(1, 1, 1, 1),
      new tt(3, 0, 1, 1),
      new tt(1, 0, 1, 1)
    ], this._cubeDirections = [
      new C(1, 0, 0),
      new C(-1, 0, 0),
      new C(0, 0, 1),
      new C(0, 0, -1),
      new C(0, 1, 0),
      new C(0, -1, 0)
    ], this._cubeUps = [
      new C(0, 1, 0),
      new C(0, 1, 0),
      new C(0, 1, 0),
      new C(0, 1, 0),
      new C(0, 0, 1),
      new C(0, 0, -1)
    ];
  }
  updateMatrices(e, t = 0) {
    const n = this.camera, i = this.matrix, s = e.distance || n.far;
    s !== n.far && (n.far = s, n.updateProjectionMatrix()), Ni.setFromMatrixPosition(e.matrixWorld), n.position.copy(Ni), Ir.copy(n.position), Ir.add(this._cubeDirections[t]), n.up.copy(this._cubeUps[t]), n.lookAt(Ir), n.updateMatrixWorld(), i.makeTranslation(-Ni.x, -Ni.y, -Ni.z), ua.multiplyMatrices(n.projectionMatrix, n.matrixWorldInverse), this._frustum.setFromProjectionMatrix(ua, n.coordinateSystem, n.reversedDepth);
  }
}, vd = class extends Zs {
  constructor(e, t, n = 0, i = 2) {
    super(e, t), this.isPointLight = !0, this.type = "PointLight", this.distance = n, this.decay = i, this.shadow = new _d();
  }
  get power() {
    return this.intensity * 4 * Math.PI;
  }
  set power(e) {
    this.intensity = e / (4 * Math.PI);
  }
  dispose() {
    this.shadow.dispose();
  }
  copy(e, t) {
    return super.copy(e, t), this.distance = e.distance, this.decay = e.decay, this.shadow = e.shadow.clone(), this;
  }
}, Js = class extends gl {
  constructor(e = -1, t = 1, n = 1, i = -1, s = 0.1, r = 2e3) {
    super(), this.isOrthographicCamera = !0, this.type = "OrthographicCamera", this.zoom = 1, this.view = null, this.left = e, this.right = t, this.top = n, this.bottom = i, this.near = s, this.far = r, this.updateProjectionMatrix();
  }
  copy(e, t) {
    return super.copy(e, t), this.left = e.left, this.right = e.right, this.top = e.top, this.bottom = e.bottom, this.near = e.near, this.far = e.far, this.zoom = e.zoom, this.view = e.view === null ? null : Object.assign({}, e.view), this;
  }
  setViewOffset(e, t, n, i, s, r) {
    this.view === null && (this.view = {
      enabled: !0,
      fullWidth: 1,
      fullHeight: 1,
      offsetX: 0,
      offsetY: 0,
      width: 1,
      height: 1
    }), this.view.enabled = !0, this.view.fullWidth = e, this.view.fullHeight = t, this.view.offsetX = n, this.view.offsetY = i, this.view.width = s, this.view.height = r, this.updateProjectionMatrix();
  }
  clearViewOffset() {
    this.view !== null && (this.view.enabled = !1), this.updateProjectionMatrix();
  }
  updateProjectionMatrix() {
    const e = (this.right - this.left) / (2 * this.zoom), t = (this.top - this.bottom) / (2 * this.zoom), n = (this.right + this.left) / 2, i = (this.top + this.bottom) / 2;
    let s = n - e, r = n + e, o = i + t, a = i - t;
    if (this.view !== null && this.view.enabled) {
      const l = (this.right - this.left) / this.view.fullWidth / this.zoom, c = (this.top - this.bottom) / this.view.fullHeight / this.zoom;
      s += l * this.view.offsetX, r = s + l * this.view.width, o -= c * this.view.offsetY, a = o - c * this.view.height;
    }
    this.projectionMatrix.makeOrthographic(s, r, o, a, this.near, this.far, this.coordinateSystem, this.reversedDepth), this.projectionMatrixInverse.copy(this.projectionMatrix).invert();
  }
  toJSON(e) {
    const t = super.toJSON(e);
    return t.object.zoom = this.zoom, t.object.left = this.left, t.object.right = this.right, t.object.top = this.top, t.object.bottom = this.bottom, t.object.near = this.near, t.object.far = this.far, this.view !== null && (t.object.view = Object.assign({}, this.view)), t;
  }
}, xd = class extends uo {
  constructor() {
    super(new Js(-5, 5, 5, -5, 0.5, 500)), this.isDirectionalLightShadow = !0;
  }
}, Jr = class extends Zs {
  constructor(e, t) {
    super(e, t), this.isDirectionalLight = !0, this.type = "DirectionalLight", this.position.copy(pt.DEFAULT_UP), this.updateMatrix(), this.target = new pt(), this.shadow = new xd();
  }
  dispose() {
    this.shadow.dispose();
  }
  copy(e) {
    return super.copy(e), this.target = e.target.clone(), this.shadow = e.shadow.clone(), this;
  }
}, Gi = class {
  static extractUrlBase(e) {
    const t = e.lastIndexOf("/");
    return t === -1 ? "./" : e.slice(0, t + 1);
  }
  static resolveURL(e, t) {
    return typeof e != "string" || e === "" ? "" : (/^https?:\/\//i.test(t) && /^\//.test(e) && (t = t.replace(/(^https?:\/\/[^\/]+).*/i, "$1")), /^(https?:)?\/\//i.test(e) || /^data:.*,.*$/i.test(e) || /^blob:.*$/i.test(e) ? e : t + e);
  }
}, Dr = /* @__PURE__ */ new WeakMap(), yd = class extends Ei {
  constructor(e) {
    super(e), this.isImageBitmapLoader = !0, typeof createImageBitmap > "u" && console.warn("THREE.ImageBitmapLoader: createImageBitmap() not supported."), typeof fetch > "u" && console.warn("THREE.ImageBitmapLoader: fetch() not supported."), this.options = { premultiplyAlpha: "none" }, this._abortController = new AbortController();
  }
  setOptions(e) {
    return this.options = e, this;
  }
  load(e, t, n, i) {
    e === void 0 && (e = ""), this.path !== void 0 && (e = this.path + e), e = this.manager.resolveURL(e);
    const s = this, r = pn.get(`image-bitmap:${e}`);
    if (r !== void 0) {
      if (s.manager.itemStart(e), r.then) {
        r.then((l) => {
          if (Dr.has(r) === !0)
            i && i(Dr.get(r)), s.manager.itemError(e), s.manager.itemEnd(e);
          else
            return t && t(l), s.manager.itemEnd(e), l;
        });
        return;
      }
      return setTimeout(function() {
        t && t(r), s.manager.itemEnd(e);
      }, 0), r;
    }
    const o = {};
    o.credentials = this.crossOrigin === "anonymous" ? "same-origin" : "include", o.headers = this.requestHeader, o.signal = typeof AbortSignal.any == "function" ? AbortSignal.any([this._abortController.signal, this.manager.abortController.signal]) : this._abortController.signal;
    const a = fetch(e, o).then(function(l) {
      return l.blob();
    }).then(function(l) {
      return createImageBitmap(l, Object.assign(s.options, { colorSpaceConversion: "none" }));
    }).then(function(l) {
      return pn.add(`image-bitmap:${e}`, l), t && t(l), s.manager.itemEnd(e), l;
    }).catch(function(l) {
      i && i(l), Dr.set(a, l), pn.remove(`image-bitmap:${e}`), s.manager.itemError(e), s.manager.itemEnd(e);
    });
    pn.add(`image-bitmap:${e}`, a), s.manager.itemStart(e);
  }
  abort() {
    return this._abortController.abort(), this._abortController = new AbortController(), this;
  }
}, Md = class extends Ct {
  constructor(e = []) {
    super(), this.isArrayCamera = !0, this.isMultiViewCamera = !1, this.cameras = e;
  }
}, Sd = "\\[\\]\\.:\\/", Ed = /* @__PURE__ */ new RegExp("[\\[\\]\\.:\\/]", "g"), fo = "[^\\[\\]\\.:\\/]", Td = "[^" + Sd.replace("\\.", "") + "]", bd = /* @__PURE__ */ /((?:WC+[\/:])*)/.source.replace("WC", fo), Ad = /* @__PURE__ */ /(WCOD+)?/.source.replace("WCOD", Td), wd = /* @__PURE__ */ /(?:\.(WC+)(?:\[(.+)\])?)?/.source.replace("WC", fo), Rd = /* @__PURE__ */ /\.(WC+)(?:\[(.+)\])?/.source.replace("WC", fo), Cd = new RegExp("^" + bd + Ad + wd + Rd + "$"), Pd = [
  "material",
  "materials",
  "bones",
  "map"
], Ld = class {
  constructor(e, t, n) {
    const i = n || ct.parseTrackName(t);
    this._targetGroup = e, this._bindings = e.subscribe_(t, i);
  }
  getValue(e, t) {
    this.bind();
    const n = this._targetGroup.nCachedObjects_, i = this._bindings[n];
    i !== void 0 && i.getValue(e, t);
  }
  setValue(e, t) {
    const n = this._bindings;
    for (let i = this._targetGroup.nCachedObjects_, s = n.length; i !== s; ++i) n[i].setValue(e, t);
  }
  bind() {
    const e = this._bindings;
    for (let t = this._targetGroup.nCachedObjects_, n = e.length; t !== n; ++t) e[t].bind();
  }
  unbind() {
    const e = this._bindings;
    for (let t = this._targetGroup.nCachedObjects_, n = e.length; t !== n; ++t) e[t].unbind();
  }
}, ct = class ai {
  constructor(t, n, i) {
    this.path = n, this.parsedPath = i || ai.parseTrackName(n), this.node = ai.findNode(t, this.parsedPath.nodeName), this.rootNode = t, this.getValue = this._getValue_unbound, this.setValue = this._setValue_unbound;
  }
  static create(t, n, i) {
    return t && t.isAnimationObjectGroup ? new ai.Composite(t, n, i) : new ai(t, n, i);
  }
  static sanitizeNodeName(t) {
    return t.replace(/\s/g, "_").replace(Ed, "");
  }
  static parseTrackName(t) {
    const n = Cd.exec(t);
    if (n === null) throw new Error("PropertyBinding: Cannot parse trackName: " + t);
    const i = {
      nodeName: n[2],
      objectName: n[3],
      objectIndex: n[4],
      propertyName: n[5],
      propertyIndex: n[6]
    }, s = i.nodeName && i.nodeName.lastIndexOf(".");
    if (s !== void 0 && s !== -1) {
      const r = i.nodeName.substring(s + 1);
      Pd.indexOf(r) !== -1 && (i.nodeName = i.nodeName.substring(0, s), i.objectName = r);
    }
    if (i.propertyName === null || i.propertyName.length === 0) throw new Error("PropertyBinding: can not parse propertyName from trackName: " + t);
    return i;
  }
  static findNode(t, n) {
    if (n === void 0 || n === "" || n === "." || n === -1 || n === t.name || n === t.uuid) return t;
    if (t.skeleton) {
      const i = t.skeleton.getBoneByName(n);
      if (i !== void 0) return i;
    }
    if (t.children) {
      const i = function(r) {
        for (let o = 0; o < r.length; o++) {
          const a = r[o];
          if (a.name === n || a.uuid === n) return a;
          const l = i(a.children);
          if (l) return l;
        }
        return null;
      }, s = i(t.children);
      if (s) return s;
    }
    return null;
  }
  _getValue_unavailable() {
  }
  _setValue_unavailable() {
  }
  _getValue_direct(t, n) {
    t[n] = this.targetObject[this.propertyName];
  }
  _getValue_array(t, n) {
    const i = this.resolvedProperty;
    for (let s = 0, r = i.length; s !== r; ++s) t[n++] = i[s];
  }
  _getValue_arrayElement(t, n) {
    t[n] = this.resolvedProperty[this.propertyIndex];
  }
  _getValue_toArray(t, n) {
    this.resolvedProperty.toArray(t, n);
  }
  _setValue_direct(t, n) {
    this.targetObject[this.propertyName] = t[n];
  }
  _setValue_direct_setNeedsUpdate(t, n) {
    this.targetObject[this.propertyName] = t[n], this.targetObject.needsUpdate = !0;
  }
  _setValue_direct_setMatrixWorldNeedsUpdate(t, n) {
    this.targetObject[this.propertyName] = t[n], this.targetObject.matrixWorldNeedsUpdate = !0;
  }
  _setValue_array(t, n) {
    const i = this.resolvedProperty;
    for (let s = 0, r = i.length; s !== r; ++s) i[s] = t[n++];
  }
  _setValue_array_setNeedsUpdate(t, n) {
    const i = this.resolvedProperty;
    for (let s = 0, r = i.length; s !== r; ++s) i[s] = t[n++];
    this.targetObject.needsUpdate = !0;
  }
  _setValue_array_setMatrixWorldNeedsUpdate(t, n) {
    const i = this.resolvedProperty;
    for (let s = 0, r = i.length; s !== r; ++s) i[s] = t[n++];
    this.targetObject.matrixWorldNeedsUpdate = !0;
  }
  _setValue_arrayElement(t, n) {
    this.resolvedProperty[this.propertyIndex] = t[n];
  }
  _setValue_arrayElement_setNeedsUpdate(t, n) {
    this.resolvedProperty[this.propertyIndex] = t[n], this.targetObject.needsUpdate = !0;
  }
  _setValue_arrayElement_setMatrixWorldNeedsUpdate(t, n) {
    this.resolvedProperty[this.propertyIndex] = t[n], this.targetObject.matrixWorldNeedsUpdate = !0;
  }
  _setValue_fromArray(t, n) {
    this.resolvedProperty.fromArray(t, n);
  }
  _setValue_fromArray_setNeedsUpdate(t, n) {
    this.resolvedProperty.fromArray(t, n), this.targetObject.needsUpdate = !0;
  }
  _setValue_fromArray_setMatrixWorldNeedsUpdate(t, n) {
    this.resolvedProperty.fromArray(t, n), this.targetObject.matrixWorldNeedsUpdate = !0;
  }
  _getValue_unbound(t, n) {
    this.bind(), this.getValue(t, n);
  }
  _setValue_unbound(t, n) {
    this.bind(), this.setValue(t, n);
  }
  bind() {
    let t = this.node;
    const n = this.parsedPath, i = n.objectName, s = n.propertyName;
    let r = n.propertyIndex;
    if (t || (t = ai.findNode(this.rootNode, n.nodeName), this.node = t), this.getValue = this._getValue_unavailable, this.setValue = this._setValue_unavailable, !t) {
      console.warn("THREE.PropertyBinding: No target node found for track: " + this.path + ".");
      return;
    }
    if (i) {
      let c = n.objectIndex;
      switch (i) {
        case "materials":
          if (!t.material) {
            console.error("THREE.PropertyBinding: Can not bind to material as node does not have a material.", this);
            return;
          }
          if (!t.material.materials) {
            console.error("THREE.PropertyBinding: Can not bind to material.materials as node.material does not have a materials array.", this);
            return;
          }
          t = t.material.materials;
          break;
        case "bones":
          if (!t.skeleton) {
            console.error("THREE.PropertyBinding: Can not bind to bones as node does not have a skeleton.", this);
            return;
          }
          t = t.skeleton.bones;
          for (let h = 0; h < t.length; h++) if (t[h].name === c) {
            c = h;
            break;
          }
          break;
        case "map":
          if ("map" in t) {
            t = t.map;
            break;
          }
          if (!t.material) {
            console.error("THREE.PropertyBinding: Can not bind to material as node does not have a material.", this);
            return;
          }
          if (!t.material.map) {
            console.error("THREE.PropertyBinding: Can not bind to material.map as node.material does not have a map.", this);
            return;
          }
          t = t.material.map;
          break;
        default:
          if (t[i] === void 0) {
            console.error("THREE.PropertyBinding: Can not bind to objectName of node undefined.", this);
            return;
          }
          t = t[i];
      }
      if (c !== void 0) {
        if (t[c] === void 0) {
          console.error("THREE.PropertyBinding: Trying to bind to objectIndex of objectName, but is undefined.", this, t);
          return;
        }
        t = t[c];
      }
    }
    const o = t[s];
    if (o === void 0) {
      const c = n.nodeName;
      console.error("THREE.PropertyBinding: Trying to update property for track: " + c + "." + s + " but it wasn't found.", t);
      return;
    }
    let a = this.Versioning.None;
    this.targetObject = t, t.isMaterial === !0 ? a = this.Versioning.NeedsUpdate : t.isObject3D === !0 && (a = this.Versioning.MatrixWorldNeedsUpdate);
    let l = this.BindingType.Direct;
    if (r !== void 0) {
      if (s === "morphTargetInfluences") {
        if (!t.geometry) {
          console.error("THREE.PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.", this);
          return;
        }
        if (!t.geometry.morphAttributes) {
          console.error("THREE.PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.morphAttributes.", this);
          return;
        }
        t.morphTargetDictionary[r] !== void 0 && (r = t.morphTargetDictionary[r]);
      }
      l = this.BindingType.ArrayElement, this.resolvedProperty = o, this.propertyIndex = r;
    } else o.fromArray !== void 0 && o.toArray !== void 0 ? (l = this.BindingType.HasFromToArray, this.resolvedProperty = o) : Array.isArray(o) ? (l = this.BindingType.EntireArray, this.resolvedProperty = o) : this.propertyName = s;
    this.getValue = this.GetterByBindingType[l], this.setValue = this.SetterByBindingTypeAndVersioning[l][a];
  }
  unbind() {
    this.node = null, this.getValue = this._getValue_unbound, this.setValue = this._setValue_unbound;
  }
};
ct.Composite = Ld;
ct.prototype.BindingType = {
  Direct: 0,
  EntireArray: 1,
  ArrayElement: 2,
  HasFromToArray: 3
};
ct.prototype.Versioning = {
  None: 0,
  NeedsUpdate: 1,
  MatrixWorldNeedsUpdate: 2
};
ct.prototype.GetterByBindingType = [
  ct.prototype._getValue_direct,
  ct.prototype._getValue_array,
  ct.prototype._getValue_arrayElement,
  ct.prototype._getValue_toArray
];
ct.prototype.SetterByBindingTypeAndVersioning = [
  [
    ct.prototype._setValue_direct,
    ct.prototype._setValue_direct_setNeedsUpdate,
    ct.prototype._setValue_direct_setMatrixWorldNeedsUpdate
  ],
  [
    ct.prototype._setValue_array,
    ct.prototype._setValue_array_setNeedsUpdate,
    ct.prototype._setValue_array_setMatrixWorldNeedsUpdate
  ],
  [
    ct.prototype._setValue_arrayElement,
    ct.prototype._setValue_arrayElement_setNeedsUpdate,
    ct.prototype._setValue_arrayElement_setMatrixWorldNeedsUpdate
  ],
  [
    ct.prototype._setValue_fromArray,
    ct.prototype._setValue_fromArray_setNeedsUpdate,
    ct.prototype._setValue_fromArray_setMatrixWorldNeedsUpdate
  ]
];
var $r = class {
  constructor(e = 1, t = 0, n = 0) {
    this.radius = e, this.phi = t, this.theta = n;
  }
  set(e, t, n) {
    return this.radius = e, this.phi = t, this.theta = n, this;
  }
  copy(e) {
    return this.radius = e.radius, this.phi = e.phi, this.theta = e.theta, this;
  }
  makeSafe() {
    return this.phi = Ge(this.phi, 1e-6, Math.PI - 1e-6), this;
  }
  setFromVector3(e) {
    return this.setFromCartesianCoords(e.x, e.y, e.z);
  }
  setFromCartesianCoords(e, t, n) {
    return this.radius = Math.sqrt(e * e + t * t + n * n), this.radius === 0 ? (this.theta = 0, this.phi = 0) : (this.theta = Math.atan2(e, n), this.phi = Math.acos(Ge(t / this.radius, -1, 1))), this;
  }
  clone() {
    return new this.constructor().copy(this);
  }
}, Id = class extends Gn {
  constructor(e, t = null) {
    super(), this.object = e, this.domElement = t, this.enabled = !0, this.state = -1, this.keys = {}, this.mouseButtons = {
      LEFT: null,
      MIDDLE: null,
      RIGHT: null
    }, this.touches = {
      ONE: null,
      TWO: null
    };
  }
  connect(e) {
    if (e === void 0) {
      console.warn("THREE.Controls: connect() now requires an element.");
      return;
    }
    this.domElement !== null && this.disconnect(), this.domElement = e;
  }
  disconnect() {
  }
  dispose() {
  }
  update() {
  }
};
function da(e, t, n, i) {
  const s = Dd(i);
  switch (n) {
    case bc:
      return e * t;
    case el:
      return e * t / s.components * s.byteLength;
    case wc:
      return e * t / s.components * s.byteLength;
    case Rc:
      return e * t * 2 / s.components * s.byteLength;
    case Cc:
      return e * t * 2 / s.components * s.byteLength;
    case Ac:
      return e * t * 3 / s.components * s.byteLength;
    case kn:
      return e * t * 4 / s.components * s.byteLength;
    case Pc:
      return e * t * 4 / s.components * s.byteLength;
    case Lc:
    case Ic:
      return Math.floor((e + 3) / 4) * Math.floor((t + 3) / 4) * 8;
    case Dc:
    case Nc:
      return Math.floor((e + 3) / 4) * Math.floor((t + 3) / 4) * 16;
    case Oc:
    case Bc:
      return Math.max(e, 16) * Math.max(t, 8) / 4;
    case Uc:
    case Fc:
      return Math.max(e, 8) * Math.max(t, 8) / 2;
    case zc:
    case kc:
      return Math.floor((e + 3) / 4) * Math.floor((t + 3) / 4) * 8;
    case Hc:
      return Math.floor((e + 3) / 4) * Math.floor((t + 3) / 4) * 16;
    case Vc:
      return Math.floor((e + 3) / 4) * Math.floor((t + 3) / 4) * 16;
    case Gc:
      return Math.floor((e + 4) / 5) * Math.floor((t + 3) / 4) * 16;
    case Wc:
      return Math.floor((e + 4) / 5) * Math.floor((t + 4) / 5) * 16;
    case Xc:
      return Math.floor((e + 5) / 6) * Math.floor((t + 4) / 5) * 16;
    case Yc:
      return Math.floor((e + 5) / 6) * Math.floor((t + 5) / 6) * 16;
    case qc:
      return Math.floor((e + 7) / 8) * Math.floor((t + 4) / 5) * 16;
    case Kc:
      return Math.floor((e + 7) / 8) * Math.floor((t + 5) / 6) * 16;
    case jc:
      return Math.floor((e + 7) / 8) * Math.floor((t + 7) / 8) * 16;
    case Zc:
      return Math.floor((e + 9) / 10) * Math.floor((t + 4) / 5) * 16;
    case Jc:
      return Math.floor((e + 9) / 10) * Math.floor((t + 5) / 6) * 16;
    case $c:
      return Math.floor((e + 9) / 10) * Math.floor((t + 7) / 8) * 16;
    case Qc:
      return Math.floor((e + 9) / 10) * Math.floor((t + 9) / 10) * 16;
    case eh:
      return Math.floor((e + 11) / 12) * Math.floor((t + 9) / 10) * 16;
    case th:
      return Math.floor((e + 11) / 12) * Math.floor((t + 11) / 12) * 16;
    case nh:
    case ih:
    case sh:
      return Math.ceil(e / 4) * Math.ceil(t / 4) * 16;
    case rh:
    case oh:
      return Math.ceil(e / 4) * Math.ceil(t / 4) * 8;
    case ah:
    case lh:
      return Math.ceil(e / 4) * Math.ceil(t / 4) * 16;
  }
  throw new Error(`Unable to determine texture byte length for ${n} format.`);
}
function Dd(e) {
  switch (e) {
    case fi:
    case gc:
      return {
        byteLength: 1,
        components: 1
      };
    case vc:
    case _c:
    case io:
      return {
        byteLength: 2,
        components: 1
      };
    case yc:
    case Mc:
      return {
        byteLength: 2,
        components: 4
      };
    case no:
    case xc:
    case ts:
      return {
        byteLength: 4,
        components: 1
      };
    case Ec:
    case Tc:
      return {
        byteLength: 4,
        components: 3
      };
  }
  throw new Error(`Unknown texture type ${e}.`);
}
typeof __THREE_DEVTOOLS__ < "u" && __THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register", { detail: { revision: "180" } }));
typeof window < "u" && (window.__THREE__ ? console.warn("WARNING: Multiple instances of Three.js being imported.") : window.__THREE__ = "180");
function Xl() {
  let e = null, t = !1, n = null, i = null;
  function s(r, o) {
    n(r, o), i = e.requestAnimationFrame(s);
  }
  return {
    start: function() {
      t !== !0 && n !== null && (i = e.requestAnimationFrame(s), t = !0);
    },
    stop: function() {
      e.cancelAnimationFrame(i), t = !1;
    },
    setAnimationLoop: function(r) {
      n = r;
    },
    setContext: function(r) {
      e = r;
    }
  };
}
function Nd(e) {
  const t = /* @__PURE__ */ new WeakMap();
  function n(a, l) {
    const c = a.array, h = a.usage, u = c.byteLength, d = e.createBuffer();
    e.bindBuffer(l, d), e.bufferData(l, c, h), a.onUploadCallback();
    let p;
    if (c instanceof Float32Array) p = e.FLOAT;
    else if (typeof Float16Array < "u" && c instanceof Float16Array) p = e.HALF_FLOAT;
    else if (c instanceof Uint16Array) a.isFloat16BufferAttribute ? p = e.HALF_FLOAT : p = e.UNSIGNED_SHORT;
    else if (c instanceof Int16Array) p = e.SHORT;
    else if (c instanceof Uint32Array) p = e.UNSIGNED_INT;
    else if (c instanceof Int32Array) p = e.INT;
    else if (c instanceof Int8Array) p = e.BYTE;
    else if (c instanceof Uint8Array) p = e.UNSIGNED_BYTE;
    else if (c instanceof Uint8ClampedArray) p = e.UNSIGNED_BYTE;
    else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: " + c);
    return {
      buffer: d,
      type: p,
      bytesPerElement: c.BYTES_PER_ELEMENT,
      version: a.version,
      size: u
    };
  }
  function i(a, l, c) {
    const h = l.array, u = l.updateRanges;
    if (e.bindBuffer(c, a), u.length === 0) e.bufferSubData(c, 0, h);
    else {
      u.sort((p, _) => p.start - _.start);
      let d = 0;
      for (let p = 1; p < u.length; p++) {
        const _ = u[d], g = u[p];
        g.start <= _.start + _.count + 1 ? _.count = Math.max(_.count, g.start + g.count - _.start) : (++d, u[d] = g);
      }
      u.length = d + 1;
      for (let p = 0, _ = u.length; p < _; p++) {
        const g = u[p];
        e.bufferSubData(c, g.start * h.BYTES_PER_ELEMENT, h, g.start, g.count);
      }
      l.clearUpdateRanges();
    }
    l.onUploadCallback();
  }
  function s(a) {
    return a.isInterleavedBufferAttribute && (a = a.data), t.get(a);
  }
  function r(a) {
    a.isInterleavedBufferAttribute && (a = a.data);
    const l = t.get(a);
    l && (e.deleteBuffer(l.buffer), t.delete(a));
  }
  function o(a, l) {
    if (a.isInterleavedBufferAttribute && (a = a.data), a.isGLBufferAttribute) {
      const h = t.get(a);
      (!h || h.version < a.version) && t.set(a, {
        buffer: a.buffer,
        type: a.type,
        bytesPerElement: a.elementSize,
        version: a.version
      });
      return;
    }
    const c = t.get(a);
    if (c === void 0) t.set(a, n(a, l));
    else if (c.version < a.version) {
      if (c.size !== a.array.byteLength) throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");
      i(c.buffer, a, l), c.version = a.version;
    }
  }
  return {
    get: s,
    remove: r,
    update: o
  };
}
var We = {
  alphahash_fragment: `#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,
  alphahash_pars_fragment: `#ifdef USE_ALPHAHASH
	const float ALPHA_HASH_SCALE = 0.05;
	float hash2D( vec2 value ) {
		return fract( 1.0e4 * sin( 17.0 * value.x + 0.1 * value.y ) * ( 0.1 + abs( sin( 13.0 * value.y + value.x ) ) ) );
	}
	float hash3D( vec3 value ) {
		return hash2D( vec2( hash2D( value.xy ), value.z ) );
	}
	float getAlphaHashThreshold( vec3 position ) {
		float maxDeriv = max(
			length( dFdx( position.xyz ) ),
			length( dFdy( position.xyz ) )
		);
		float pixScale = 1.0 / ( ALPHA_HASH_SCALE * maxDeriv );
		vec2 pixScales = vec2(
			exp2( floor( log2( pixScale ) ) ),
			exp2( ceil( log2( pixScale ) ) )
		);
		vec2 alpha = vec2(
			hash3D( floor( pixScales.x * position.xyz ) ),
			hash3D( floor( pixScales.y * position.xyz ) )
		);
		float lerpFactor = fract( log2( pixScale ) );
		float x = ( 1.0 - lerpFactor ) * alpha.x + lerpFactor * alpha.y;
		float a = min( lerpFactor, 1.0 - lerpFactor );
		vec3 cases = vec3(
			x * x / ( 2.0 * a * ( 1.0 - a ) ),
			( x - 0.5 * a ) / ( 1.0 - a ),
			1.0 - ( ( 1.0 - x ) * ( 1.0 - x ) / ( 2.0 * a * ( 1.0 - a ) ) )
		);
		float threshold = ( x < ( 1.0 - a ) )
			? ( ( x < a ) ? cases.x : cases.y )
			: cases.z;
		return clamp( threshold , 1.0e-6, 1.0 );
	}
#endif`,
  alphamap_fragment: `#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,
  alphamap_pars_fragment: `#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,
  alphatest_fragment: `#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,
  alphatest_pars_fragment: `#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,
  aomap_fragment: `#ifdef USE_AOMAP
	float ambientOcclusion = ( texture2D( aoMap, vAoMapUv ).r - 1.0 ) * aoMapIntensity + 1.0;
	reflectedLight.indirectDiffuse *= ambientOcclusion;
	#if defined( USE_CLEARCOAT ) 
		clearcoatSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_SHEEN ) 
		sheenSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD )
		float dotNV = saturate( dot( geometryNormal, geometryViewDir ) );
		reflectedLight.indirectSpecular *= computeSpecularOcclusion( dotNV, ambientOcclusion, material.roughness );
	#endif
#endif`,
  aomap_pars_fragment: `#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,
  batching_pars_vertex: `#ifdef USE_BATCHING
	#if ! defined( GL_ANGLE_multi_draw )
	#define gl_DrawID _gl_DrawID
	uniform int _gl_DrawID;
	#endif
	uniform highp sampler2D batchingTexture;
	uniform highp usampler2D batchingIdTexture;
	mat4 getBatchingMatrix( const in float i ) {
		int size = textureSize( batchingTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( batchingTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( batchingTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( batchingTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( batchingTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
	float getIndirectIndex( const in int i ) {
		int size = textureSize( batchingIdTexture, 0 ).x;
		int x = i % size;
		int y = i / size;
		return float( texelFetch( batchingIdTexture, ivec2( x, y ), 0 ).r );
	}
#endif
#ifdef USE_BATCHING_COLOR
	uniform sampler2D batchingColorTexture;
	vec3 getBatchingColor( const in float i ) {
		int size = textureSize( batchingColorTexture, 0 ).x;
		int j = int( i );
		int x = j % size;
		int y = j / size;
		return texelFetch( batchingColorTexture, ivec2( x, y ), 0 ).rgb;
	}
#endif`,
  batching_vertex: `#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,
  begin_vertex: `vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,
  beginnormal_vertex: `vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,
  bsdfs: `float G_BlinnPhong_Implicit( ) {
	return 0.25;
}
float D_BlinnPhong( const in float shininess, const in float dotNH ) {
	return RECIPROCAL_PI * ( shininess * 0.5 + 1.0 ) * pow( dotNH, shininess );
}
vec3 BRDF_BlinnPhong( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in vec3 specularColor, const in float shininess ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( specularColor, 1.0, dotVH );
	float G = G_BlinnPhong_Implicit( );
	float D = D_BlinnPhong( shininess, dotNH );
	return F * ( G * D );
} // validated`,
  iridescence_fragment: `#ifdef USE_IRIDESCENCE
	const mat3 XYZ_TO_REC709 = mat3(
		 3.2404542, -0.9692660,  0.0556434,
		-1.5371385,  1.8760108, -0.2040259,
		-0.4985314,  0.0415560,  1.0572252
	);
	vec3 Fresnel0ToIor( vec3 fresnel0 ) {
		vec3 sqrtF0 = sqrt( fresnel0 );
		return ( vec3( 1.0 ) + sqrtF0 ) / ( vec3( 1.0 ) - sqrtF0 );
	}
	vec3 IorToFresnel0( vec3 transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - vec3( incidentIor ) ) / ( transmittedIor + vec3( incidentIor ) ) );
	}
	float IorToFresnel0( float transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - incidentIor ) / ( transmittedIor + incidentIor ));
	}
	vec3 evalSensitivity( float OPD, vec3 shift ) {
		float phase = 2.0 * PI * OPD * 1.0e-9;
		vec3 val = vec3( 5.4856e-13, 4.4201e-13, 5.2481e-13 );
		vec3 pos = vec3( 1.6810e+06, 1.7953e+06, 2.2084e+06 );
		vec3 var = vec3( 4.3278e+09, 9.3046e+09, 6.6121e+09 );
		vec3 xyz = val * sqrt( 2.0 * PI * var ) * cos( pos * phase + shift ) * exp( - pow2( phase ) * var );
		xyz.x += 9.7470e-14 * sqrt( 2.0 * PI * 4.5282e+09 ) * cos( 2.2399e+06 * phase + shift[ 0 ] ) * exp( - 4.5282e+09 * pow2( phase ) );
		xyz /= 1.0685e-7;
		vec3 rgb = XYZ_TO_REC709 * xyz;
		return rgb;
	}
	vec3 evalIridescence( float outsideIOR, float eta2, float cosTheta1, float thinFilmThickness, vec3 baseF0 ) {
		vec3 I;
		float iridescenceIOR = mix( outsideIOR, eta2, smoothstep( 0.0, 0.03, thinFilmThickness ) );
		float sinTheta2Sq = pow2( outsideIOR / iridescenceIOR ) * ( 1.0 - pow2( cosTheta1 ) );
		float cosTheta2Sq = 1.0 - sinTheta2Sq;
		if ( cosTheta2Sq < 0.0 ) {
			return vec3( 1.0 );
		}
		float cosTheta2 = sqrt( cosTheta2Sq );
		float R0 = IorToFresnel0( iridescenceIOR, outsideIOR );
		float R12 = F_Schlick( R0, 1.0, cosTheta1 );
		float T121 = 1.0 - R12;
		float phi12 = 0.0;
		if ( iridescenceIOR < outsideIOR ) phi12 = PI;
		float phi21 = PI - phi12;
		vec3 baseIOR = Fresnel0ToIor( clamp( baseF0, 0.0, 0.9999 ) );		vec3 R1 = IorToFresnel0( baseIOR, iridescenceIOR );
		vec3 R23 = F_Schlick( R1, 1.0, cosTheta2 );
		vec3 phi23 = vec3( 0.0 );
		if ( baseIOR[ 0 ] < iridescenceIOR ) phi23[ 0 ] = PI;
		if ( baseIOR[ 1 ] < iridescenceIOR ) phi23[ 1 ] = PI;
		if ( baseIOR[ 2 ] < iridescenceIOR ) phi23[ 2 ] = PI;
		float OPD = 2.0 * iridescenceIOR * thinFilmThickness * cosTheta2;
		vec3 phi = vec3( phi21 ) + phi23;
		vec3 R123 = clamp( R12 * R23, 1e-5, 0.9999 );
		vec3 r123 = sqrt( R123 );
		vec3 Rs = pow2( T121 ) * R23 / ( vec3( 1.0 ) - R123 );
		vec3 C0 = R12 + Rs;
		I = C0;
		vec3 Cm = Rs - T121;
		for ( int m = 1; m <= 2; ++ m ) {
			Cm *= r123;
			vec3 Sm = 2.0 * evalSensitivity( float( m ) * OPD, float( m ) * phi );
			I += Cm * Sm;
		}
		return max( I, vec3( 0.0 ) );
	}
#endif`,
  bumpmap_pars_fragment: `#ifdef USE_BUMPMAP
	uniform sampler2D bumpMap;
	uniform float bumpScale;
	vec2 dHdxy_fwd() {
		vec2 dSTdx = dFdx( vBumpMapUv );
		vec2 dSTdy = dFdy( vBumpMapUv );
		float Hll = bumpScale * texture2D( bumpMap, vBumpMapUv ).x;
		float dBx = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdx ).x - Hll;
		float dBy = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdy ).x - Hll;
		return vec2( dBx, dBy );
	}
	vec3 perturbNormalArb( vec3 surf_pos, vec3 surf_norm, vec2 dHdxy, float faceDirection ) {
		vec3 vSigmaX = normalize( dFdx( surf_pos.xyz ) );
		vec3 vSigmaY = normalize( dFdy( surf_pos.xyz ) );
		vec3 vN = surf_norm;
		vec3 R1 = cross( vSigmaY, vN );
		vec3 R2 = cross( vN, vSigmaX );
		float fDet = dot( vSigmaX, R1 ) * faceDirection;
		vec3 vGrad = sign( fDet ) * ( dHdxy.x * R1 + dHdxy.y * R2 );
		return normalize( abs( fDet ) * surf_norm - vGrad );
	}
#endif`,
  clipping_planes_fragment: `#if NUM_CLIPPING_PLANES > 0
	vec4 plane;
	#ifdef ALPHA_TO_COVERAGE
		float distanceToPlane, distanceGradient;
		float clipOpacity = 1.0;
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
			distanceGradient = fwidth( distanceToPlane ) / 2.0;
			clipOpacity *= smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			if ( clipOpacity == 0.0 ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			float unionClipOpacity = 1.0;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
				distanceGradient = fwidth( distanceToPlane ) / 2.0;
				unionClipOpacity *= 1.0 - smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			}
			#pragma unroll_loop_end
			clipOpacity *= 1.0 - unionClipOpacity;
		#endif
		diffuseColor.a *= clipOpacity;
		if ( diffuseColor.a == 0.0 ) discard;
	#else
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			if ( dot( vClipPosition, plane.xyz ) > plane.w ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			bool clipped = true;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				clipped = ( dot( vClipPosition, plane.xyz ) > plane.w ) && clipped;
			}
			#pragma unroll_loop_end
			if ( clipped ) discard;
		#endif
	#endif
#endif`,
  clipping_planes_pars_fragment: `#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,
  clipping_planes_pars_vertex: `#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,
  clipping_planes_vertex: `#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,
  color_fragment: `#if defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#elif defined( USE_COLOR )
	diffuseColor.rgb *= vColor;
#endif`,
  color_pars_fragment: `#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR )
	varying vec3 vColor;
#endif`,
  color_pars_vertex: `#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec3 vColor;
#endif`,
  color_vertex: `#if defined( USE_COLOR_ALPHA )
	vColor = vec4( 1.0 );
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	vColor = vec3( 1.0 );
#endif
#ifdef USE_COLOR
	vColor *= color;
#endif
#ifdef USE_INSTANCING_COLOR
	vColor.xyz *= instanceColor.xyz;
#endif
#ifdef USE_BATCHING_COLOR
	vec3 batchingColor = getBatchingColor( getIndirectIndex( gl_DrawID ) );
	vColor.xyz *= batchingColor.xyz;
#endif`,
  common: `#define PI 3.141592653589793
#define PI2 6.283185307179586
#define PI_HALF 1.5707963267948966
#define RECIPROCAL_PI 0.3183098861837907
#define RECIPROCAL_PI2 0.15915494309189535
#define EPSILON 1e-6
#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
#define whiteComplement( a ) ( 1.0 - saturate( a ) )
float pow2( const in float x ) { return x*x; }
vec3 pow2( const in vec3 x ) { return x*x; }
float pow3( const in float x ) { return x*x*x; }
float pow4( const in float x ) { float x2 = x*x; return x2*x2; }
float max3( const in vec3 v ) { return max( max( v.x, v.y ), v.z ); }
float average( const in vec3 v ) { return dot( v, vec3( 0.3333333 ) ); }
highp float rand( const in vec2 uv ) {
	const highp float a = 12.9898, b = 78.233, c = 43758.5453;
	highp float dt = dot( uv.xy, vec2( a,b ) ), sn = mod( dt, PI );
	return fract( sin( sn ) * c );
}
#ifdef HIGH_PRECISION
	float precisionSafeLength( vec3 v ) { return length( v ); }
#else
	float precisionSafeLength( vec3 v ) {
		float maxComponent = max3( abs( v ) );
		return length( v / maxComponent ) * maxComponent;
	}
#endif
struct IncidentLight {
	vec3 color;
	vec3 direction;
	bool visible;
};
struct ReflectedLight {
	vec3 directDiffuse;
	vec3 directSpecular;
	vec3 indirectDiffuse;
	vec3 indirectSpecular;
};
#ifdef USE_ALPHAHASH
	varying vec3 vPosition;
#endif
vec3 transformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );
}
vec3 inverseTransformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( vec4( dir, 0.0 ) * matrix ).xyz );
}
mat3 transposeMat3( const in mat3 m ) {
	mat3 tmp;
	tmp[ 0 ] = vec3( m[ 0 ].x, m[ 1 ].x, m[ 2 ].x );
	tmp[ 1 ] = vec3( m[ 0 ].y, m[ 1 ].y, m[ 2 ].y );
	tmp[ 2 ] = vec3( m[ 0 ].z, m[ 1 ].z, m[ 2 ].z );
	return tmp;
}
bool isPerspectiveMatrix( mat4 m ) {
	return m[ 2 ][ 3 ] == - 1.0;
}
vec2 equirectUv( in vec3 dir ) {
	float u = atan( dir.z, dir.x ) * RECIPROCAL_PI2 + 0.5;
	float v = asin( clamp( dir.y, - 1.0, 1.0 ) ) * RECIPROCAL_PI + 0.5;
	return vec2( u, v );
}
vec3 BRDF_Lambert( const in vec3 diffuseColor ) {
	return RECIPROCAL_PI * diffuseColor;
}
vec3 F_Schlick( const in vec3 f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
}
float F_Schlick( const in float f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
} // validated`,
  cube_uv_reflection_fragment: `#ifdef ENVMAP_TYPE_CUBE_UV
	#define cubeUV_minMipLevel 4.0
	#define cubeUV_minTileSize 16.0
	float getFace( vec3 direction ) {
		vec3 absDirection = abs( direction );
		float face = - 1.0;
		if ( absDirection.x > absDirection.z ) {
			if ( absDirection.x > absDirection.y )
				face = direction.x > 0.0 ? 0.0 : 3.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		} else {
			if ( absDirection.z > absDirection.y )
				face = direction.z > 0.0 ? 2.0 : 5.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		}
		return face;
	}
	vec2 getUV( vec3 direction, float face ) {
		vec2 uv;
		if ( face == 0.0 ) {
			uv = vec2( direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 1.0 ) {
			uv = vec2( - direction.x, - direction.z ) / abs( direction.y );
		} else if ( face == 2.0 ) {
			uv = vec2( - direction.x, direction.y ) / abs( direction.z );
		} else if ( face == 3.0 ) {
			uv = vec2( - direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 4.0 ) {
			uv = vec2( - direction.x, direction.z ) / abs( direction.y );
		} else {
			uv = vec2( direction.x, direction.y ) / abs( direction.z );
		}
		return 0.5 * ( uv + 1.0 );
	}
	vec3 bilinearCubeUV( sampler2D envMap, vec3 direction, float mipInt ) {
		float face = getFace( direction );
		float filterInt = max( cubeUV_minMipLevel - mipInt, 0.0 );
		mipInt = max( mipInt, cubeUV_minMipLevel );
		float faceSize = exp2( mipInt );
		highp vec2 uv = getUV( direction, face ) * ( faceSize - 2.0 ) + 1.0;
		if ( face > 2.0 ) {
			uv.y += faceSize;
			face -= 3.0;
		}
		uv.x += face * faceSize;
		uv.x += filterInt * 3.0 * cubeUV_minTileSize;
		uv.y += 4.0 * ( exp2( CUBEUV_MAX_MIP ) - faceSize );
		uv.x *= CUBEUV_TEXEL_WIDTH;
		uv.y *= CUBEUV_TEXEL_HEIGHT;
		#ifdef texture2DGradEXT
			return texture2DGradEXT( envMap, uv, vec2( 0.0 ), vec2( 0.0 ) ).rgb;
		#else
			return texture2D( envMap, uv ).rgb;
		#endif
	}
	#define cubeUV_r0 1.0
	#define cubeUV_m0 - 2.0
	#define cubeUV_r1 0.8
	#define cubeUV_m1 - 1.0
	#define cubeUV_r4 0.4
	#define cubeUV_m4 2.0
	#define cubeUV_r5 0.305
	#define cubeUV_m5 3.0
	#define cubeUV_r6 0.21
	#define cubeUV_m6 4.0
	float roughnessToMip( float roughness ) {
		float mip = 0.0;
		if ( roughness >= cubeUV_r1 ) {
			mip = ( cubeUV_r0 - roughness ) * ( cubeUV_m1 - cubeUV_m0 ) / ( cubeUV_r0 - cubeUV_r1 ) + cubeUV_m0;
		} else if ( roughness >= cubeUV_r4 ) {
			mip = ( cubeUV_r1 - roughness ) * ( cubeUV_m4 - cubeUV_m1 ) / ( cubeUV_r1 - cubeUV_r4 ) + cubeUV_m1;
		} else if ( roughness >= cubeUV_r5 ) {
			mip = ( cubeUV_r4 - roughness ) * ( cubeUV_m5 - cubeUV_m4 ) / ( cubeUV_r4 - cubeUV_r5 ) + cubeUV_m4;
		} else if ( roughness >= cubeUV_r6 ) {
			mip = ( cubeUV_r5 - roughness ) * ( cubeUV_m6 - cubeUV_m5 ) / ( cubeUV_r5 - cubeUV_r6 ) + cubeUV_m5;
		} else {
			mip = - 2.0 * log2( 1.16 * roughness );		}
		return mip;
	}
	vec4 textureCubeUV( sampler2D envMap, vec3 sampleDir, float roughness ) {
		float mip = clamp( roughnessToMip( roughness ), cubeUV_m0, CUBEUV_MAX_MIP );
		float mipF = fract( mip );
		float mipInt = floor( mip );
		vec3 color0 = bilinearCubeUV( envMap, sampleDir, mipInt );
		if ( mipF == 0.0 ) {
			return vec4( color0, 1.0 );
		} else {
			vec3 color1 = bilinearCubeUV( envMap, sampleDir, mipInt + 1.0 );
			return vec4( mix( color0, color1, mipF ), 1.0 );
		}
	}
#endif`,
  defaultnormal_vertex: `vec3 transformedNormal = objectNormal;
#ifdef USE_TANGENT
	vec3 transformedTangent = objectTangent;
#endif
#ifdef USE_BATCHING
	mat3 bm = mat3( batchingMatrix );
	transformedNormal /= vec3( dot( bm[ 0 ], bm[ 0 ] ), dot( bm[ 1 ], bm[ 1 ] ), dot( bm[ 2 ], bm[ 2 ] ) );
	transformedNormal = bm * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = bm * transformedTangent;
	#endif
#endif
#ifdef USE_INSTANCING
	mat3 im = mat3( instanceMatrix );
	transformedNormal /= vec3( dot( im[ 0 ], im[ 0 ] ), dot( im[ 1 ], im[ 1 ] ), dot( im[ 2 ], im[ 2 ] ) );
	transformedNormal = im * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = im * transformedTangent;
	#endif
#endif
transformedNormal = normalMatrix * transformedNormal;
#ifdef FLIP_SIDED
	transformedNormal = - transformedNormal;
#endif
#ifdef USE_TANGENT
	transformedTangent = ( modelViewMatrix * vec4( transformedTangent, 0.0 ) ).xyz;
	#ifdef FLIP_SIDED
		transformedTangent = - transformedTangent;
	#endif
#endif`,
  displacementmap_pars_vertex: `#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,
  displacementmap_vertex: `#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,
  emissivemap_fragment: `#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,
  emissivemap_pars_fragment: `#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,
  colorspace_fragment: "gl_FragColor = linearToOutputTexel( gl_FragColor );",
  colorspace_pars_fragment: `vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,
  envmap_fragment: `#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vec3 cameraToFrag;
		if ( isOrthographic ) {
			cameraToFrag = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToFrag = normalize( vWorldPosition - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vec3 reflectVec = reflect( cameraToFrag, worldNormal );
		#else
			vec3 reflectVec = refract( cameraToFrag, worldNormal, refractionRatio );
		#endif
	#else
		vec3 reflectVec = vReflect;
	#endif
	#ifdef ENVMAP_TYPE_CUBE
		vec4 envColor = textureCube( envMap, envMapRotation * vec3( flipEnvMap * reflectVec.x, reflectVec.yz ) );
	#else
		vec4 envColor = vec4( 0.0 );
	#endif
	#ifdef ENVMAP_BLENDING_MULTIPLY
		outgoingLight = mix( outgoingLight, outgoingLight * envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_MIX )
		outgoingLight = mix( outgoingLight, envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_ADD )
		outgoingLight += envColor.xyz * specularStrength * reflectivity;
	#endif
#endif`,
  envmap_common_pars_fragment: `#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform float flipEnvMap;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
	
#endif`,
  envmap_pars_fragment: `#ifdef USE_ENVMAP
	uniform float reflectivity;
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		varying vec3 vWorldPosition;
		uniform float refractionRatio;
	#else
		varying vec3 vReflect;
	#endif
#endif`,
  envmap_pars_vertex: `#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,
  envmap_physical_pars_fragment: `#ifdef USE_ENVMAP
	vec3 getIBLIrradiance( const in vec3 normal ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * worldNormal, 1.0 );
			return PI * envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	vec3 getIBLRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 reflectVec = reflect( - viewDir, normal );
			reflectVec = normalize( mix( reflectVec, normal, roughness * roughness) );
			reflectVec = inverseTransformDirection( reflectVec, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * reflectVec, roughness );
			return envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	#ifdef USE_ANISOTROPY
		vec3 getIBLAnisotropyRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {
			#ifdef ENVMAP_TYPE_CUBE_UV
				vec3 bentNormal = cross( bitangent, viewDir );
				bentNormal = normalize( cross( bentNormal, bitangent ) );
				bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );
				return getIBLRadiance( viewDir, bentNormal, roughness );
			#else
				return vec3( 0.0 );
			#endif
		}
	#endif
#endif`,
  envmap_vertex: `#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vWorldPosition = worldPosition.xyz;
	#else
		vec3 cameraToVertex;
		if ( isOrthographic ) {
			cameraToVertex = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToVertex = normalize( worldPosition.xyz - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vReflect = reflect( cameraToVertex, worldNormal );
		#else
			vReflect = refract( cameraToVertex, worldNormal, refractionRatio );
		#endif
	#endif
#endif`,
  fog_vertex: `#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,
  fog_pars_vertex: `#ifdef USE_FOG
	varying float vFogDepth;
#endif`,
  fog_fragment: `#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,
  fog_pars_fragment: `#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,
  gradientmap_pars_fragment: `#ifdef USE_GRADIENTMAP
	uniform sampler2D gradientMap;
#endif
vec3 getGradientIrradiance( vec3 normal, vec3 lightDirection ) {
	float dotNL = dot( normal, lightDirection );
	vec2 coord = vec2( dotNL * 0.5 + 0.5, 0.0 );
	#ifdef USE_GRADIENTMAP
		return vec3( texture2D( gradientMap, coord ).r );
	#else
		vec2 fw = fwidth( coord ) * 0.5;
		return mix( vec3( 0.7 ), vec3( 1.0 ), smoothstep( 0.7 - fw.x, 0.7 + fw.x, coord.x ) );
	#endif
}`,
  lightmap_pars_fragment: `#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,
  lights_lambert_fragment: `LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,
  lights_lambert_pars_fragment: `varying vec3 vViewPosition;
struct LambertMaterial {
	vec3 diffuseColor;
	float specularStrength;
};
void RE_Direct_Lambert( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Lambert( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Lambert
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,
  lights_pars_begin: `uniform bool receiveShadow;
uniform vec3 ambientLightColor;
#if defined( USE_LIGHT_PROBES )
	uniform vec3 lightProbe[ 9 ];
#endif
vec3 shGetIrradianceAt( in vec3 normal, in vec3 shCoefficients[ 9 ] ) {
	float x = normal.x, y = normal.y, z = normal.z;
	vec3 result = shCoefficients[ 0 ] * 0.886227;
	result += shCoefficients[ 1 ] * 2.0 * 0.511664 * y;
	result += shCoefficients[ 2 ] * 2.0 * 0.511664 * z;
	result += shCoefficients[ 3 ] * 2.0 * 0.511664 * x;
	result += shCoefficients[ 4 ] * 2.0 * 0.429043 * x * y;
	result += shCoefficients[ 5 ] * 2.0 * 0.429043 * y * z;
	result += shCoefficients[ 6 ] * ( 0.743125 * z * z - 0.247708 );
	result += shCoefficients[ 7 ] * 2.0 * 0.429043 * x * z;
	result += shCoefficients[ 8 ] * 0.429043 * ( x * x - y * y );
	return result;
}
vec3 getLightProbeIrradiance( const in vec3 lightProbe[ 9 ], const in vec3 normal ) {
	vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
	vec3 irradiance = shGetIrradianceAt( worldNormal, lightProbe );
	return irradiance;
}
vec3 getAmbientLightIrradiance( const in vec3 ambientLightColor ) {
	vec3 irradiance = ambientLightColor;
	return irradiance;
}
float getDistanceAttenuation( const in float lightDistance, const in float cutoffDistance, const in float decayExponent ) {
	float distanceFalloff = 1.0 / max( pow( lightDistance, decayExponent ), 0.01 );
	if ( cutoffDistance > 0.0 ) {
		distanceFalloff *= pow2( saturate( 1.0 - pow4( lightDistance / cutoffDistance ) ) );
	}
	return distanceFalloff;
}
float getSpotAttenuation( const in float coneCosine, const in float penumbraCosine, const in float angleCosine ) {
	return smoothstep( coneCosine, penumbraCosine, angleCosine );
}
#if NUM_DIR_LIGHTS > 0
	struct DirectionalLight {
		vec3 direction;
		vec3 color;
	};
	uniform DirectionalLight directionalLights[ NUM_DIR_LIGHTS ];
	void getDirectionalLightInfo( const in DirectionalLight directionalLight, out IncidentLight light ) {
		light.color = directionalLight.color;
		light.direction = directionalLight.direction;
		light.visible = true;
	}
#endif
#if NUM_POINT_LIGHTS > 0
	struct PointLight {
		vec3 position;
		vec3 color;
		float distance;
		float decay;
	};
	uniform PointLight pointLights[ NUM_POINT_LIGHTS ];
	void getPointLightInfo( const in PointLight pointLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = pointLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float lightDistance = length( lVector );
		light.color = pointLight.color;
		light.color *= getDistanceAttenuation( lightDistance, pointLight.distance, pointLight.decay );
		light.visible = ( light.color != vec3( 0.0 ) );
	}
#endif
#if NUM_SPOT_LIGHTS > 0
	struct SpotLight {
		vec3 position;
		vec3 direction;
		vec3 color;
		float distance;
		float decay;
		float coneCos;
		float penumbraCos;
	};
	uniform SpotLight spotLights[ NUM_SPOT_LIGHTS ];
	void getSpotLightInfo( const in SpotLight spotLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = spotLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float angleCos = dot( light.direction, spotLight.direction );
		float spotAttenuation = getSpotAttenuation( spotLight.coneCos, spotLight.penumbraCos, angleCos );
		if ( spotAttenuation > 0.0 ) {
			float lightDistance = length( lVector );
			light.color = spotLight.color * spotAttenuation;
			light.color *= getDistanceAttenuation( lightDistance, spotLight.distance, spotLight.decay );
			light.visible = ( light.color != vec3( 0.0 ) );
		} else {
			light.color = vec3( 0.0 );
			light.visible = false;
		}
	}
#endif
#if NUM_RECT_AREA_LIGHTS > 0
	struct RectAreaLight {
		vec3 color;
		vec3 position;
		vec3 halfWidth;
		vec3 halfHeight;
	};
	uniform sampler2D ltc_1;	uniform sampler2D ltc_2;
	uniform RectAreaLight rectAreaLights[ NUM_RECT_AREA_LIGHTS ];
#endif
#if NUM_HEMI_LIGHTS > 0
	struct HemisphereLight {
		vec3 direction;
		vec3 skyColor;
		vec3 groundColor;
	};
	uniform HemisphereLight hemisphereLights[ NUM_HEMI_LIGHTS ];
	vec3 getHemisphereLightIrradiance( const in HemisphereLight hemiLight, const in vec3 normal ) {
		float dotNL = dot( normal, hemiLight.direction );
		float hemiDiffuseWeight = 0.5 * dotNL + 0.5;
		vec3 irradiance = mix( hemiLight.groundColor, hemiLight.skyColor, hemiDiffuseWeight );
		return irradiance;
	}
#endif`,
  lights_toon_fragment: `ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,
  lights_toon_pars_fragment: `varying vec3 vViewPosition;
struct ToonMaterial {
	vec3 diffuseColor;
};
void RE_Direct_Toon( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 irradiance = getGradientIrradiance( geometryNormal, directLight.direction ) * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Toon( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Toon
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,
  lights_phong_fragment: `BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,
  lights_phong_pars_fragment: `varying vec3 vViewPosition;
struct BlinnPhongMaterial {
	vec3 diffuseColor;
	vec3 specularColor;
	float specularShininess;
	float specularStrength;
};
void RE_Direct_BlinnPhong( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
	reflectedLight.directSpecular += irradiance * BRDF_BlinnPhong( directLight.direction, geometryViewDir, geometryNormal, material.specularColor, material.specularShininess ) * material.specularStrength;
}
void RE_IndirectDiffuse_BlinnPhong( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_BlinnPhong
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,
  lights_physical_fragment: `PhysicalMaterial material;
material.diffuseColor = diffuseColor.rgb * ( 1.0 - metalnessFactor );
vec3 dxy = max( abs( dFdx( nonPerturbedNormal ) ), abs( dFdy( nonPerturbedNormal ) ) );
float geometryRoughness = max( max( dxy.x, dxy.y ), dxy.z );
material.roughness = max( roughnessFactor, 0.0525 );material.roughness += geometryRoughness;
material.roughness = min( material.roughness, 1.0 );
#ifdef IOR
	material.ior = ior;
	#ifdef USE_SPECULAR
		float specularIntensityFactor = specularIntensity;
		vec3 specularColorFactor = specularColor;
		#ifdef USE_SPECULAR_COLORMAP
			specularColorFactor *= texture2D( specularColorMap, vSpecularColorMapUv ).rgb;
		#endif
		#ifdef USE_SPECULAR_INTENSITYMAP
			specularIntensityFactor *= texture2D( specularIntensityMap, vSpecularIntensityMapUv ).a;
		#endif
		material.specularF90 = mix( specularIntensityFactor, 1.0, metalnessFactor );
	#else
		float specularIntensityFactor = 1.0;
		vec3 specularColorFactor = vec3( 1.0 );
		material.specularF90 = 1.0;
	#endif
	material.specularColor = mix( min( pow2( ( material.ior - 1.0 ) / ( material.ior + 1.0 ) ) * specularColorFactor, vec3( 1.0 ) ) * specularIntensityFactor, diffuseColor.rgb, metalnessFactor );
#else
	material.specularColor = mix( vec3( 0.04 ), diffuseColor.rgb, metalnessFactor );
	material.specularF90 = 1.0;
#endif
#ifdef USE_CLEARCOAT
	material.clearcoat = clearcoat;
	material.clearcoatRoughness = clearcoatRoughness;
	material.clearcoatF0 = vec3( 0.04 );
	material.clearcoatF90 = 1.0;
	#ifdef USE_CLEARCOATMAP
		material.clearcoat *= texture2D( clearcoatMap, vClearcoatMapUv ).x;
	#endif
	#ifdef USE_CLEARCOAT_ROUGHNESSMAP
		material.clearcoatRoughness *= texture2D( clearcoatRoughnessMap, vClearcoatRoughnessMapUv ).y;
	#endif
	material.clearcoat = saturate( material.clearcoat );	material.clearcoatRoughness = max( material.clearcoatRoughness, 0.0525 );
	material.clearcoatRoughness += geometryRoughness;
	material.clearcoatRoughness = min( material.clearcoatRoughness, 1.0 );
#endif
#ifdef USE_DISPERSION
	material.dispersion = dispersion;
#endif
#ifdef USE_IRIDESCENCE
	material.iridescence = iridescence;
	material.iridescenceIOR = iridescenceIOR;
	#ifdef USE_IRIDESCENCEMAP
		material.iridescence *= texture2D( iridescenceMap, vIridescenceMapUv ).r;
	#endif
	#ifdef USE_IRIDESCENCE_THICKNESSMAP
		material.iridescenceThickness = (iridescenceThicknessMaximum - iridescenceThicknessMinimum) * texture2D( iridescenceThicknessMap, vIridescenceThicknessMapUv ).g + iridescenceThicknessMinimum;
	#else
		material.iridescenceThickness = iridescenceThicknessMaximum;
	#endif
#endif
#ifdef USE_SHEEN
	material.sheenColor = sheenColor;
	#ifdef USE_SHEEN_COLORMAP
		material.sheenColor *= texture2D( sheenColorMap, vSheenColorMapUv ).rgb;
	#endif
	material.sheenRoughness = clamp( sheenRoughness, 0.07, 1.0 );
	#ifdef USE_SHEEN_ROUGHNESSMAP
		material.sheenRoughness *= texture2D( sheenRoughnessMap, vSheenRoughnessMapUv ).a;
	#endif
#endif
#ifdef USE_ANISOTROPY
	#ifdef USE_ANISOTROPYMAP
		mat2 anisotropyMat = mat2( anisotropyVector.x, anisotropyVector.y, - anisotropyVector.y, anisotropyVector.x );
		vec3 anisotropyPolar = texture2D( anisotropyMap, vAnisotropyMapUv ).rgb;
		vec2 anisotropyV = anisotropyMat * normalize( 2.0 * anisotropyPolar.rg - vec2( 1.0 ) ) * anisotropyPolar.b;
	#else
		vec2 anisotropyV = anisotropyVector;
	#endif
	material.anisotropy = length( anisotropyV );
	if( material.anisotropy == 0.0 ) {
		anisotropyV = vec2( 1.0, 0.0 );
	} else {
		anisotropyV /= material.anisotropy;
		material.anisotropy = saturate( material.anisotropy );
	}
	material.alphaT = mix( pow2( material.roughness ), 1.0, pow2( material.anisotropy ) );
	material.anisotropyT = tbn[ 0 ] * anisotropyV.x + tbn[ 1 ] * anisotropyV.y;
	material.anisotropyB = tbn[ 1 ] * anisotropyV.x - tbn[ 0 ] * anisotropyV.y;
#endif`,
  lights_physical_pars_fragment: `struct PhysicalMaterial {
	vec3 diffuseColor;
	float roughness;
	vec3 specularColor;
	float specularF90;
	float dispersion;
	#ifdef USE_CLEARCOAT
		float clearcoat;
		float clearcoatRoughness;
		vec3 clearcoatF0;
		float clearcoatF90;
	#endif
	#ifdef USE_IRIDESCENCE
		float iridescence;
		float iridescenceIOR;
		float iridescenceThickness;
		vec3 iridescenceFresnel;
		vec3 iridescenceF0;
	#endif
	#ifdef USE_SHEEN
		vec3 sheenColor;
		float sheenRoughness;
	#endif
	#ifdef IOR
		float ior;
	#endif
	#ifdef USE_TRANSMISSION
		float transmission;
		float transmissionAlpha;
		float thickness;
		float attenuationDistance;
		vec3 attenuationColor;
	#endif
	#ifdef USE_ANISOTROPY
		float anisotropy;
		float alphaT;
		vec3 anisotropyT;
		vec3 anisotropyB;
	#endif
};
vec3 clearcoatSpecularDirect = vec3( 0.0 );
vec3 clearcoatSpecularIndirect = vec3( 0.0 );
vec3 sheenSpecularDirect = vec3( 0.0 );
vec3 sheenSpecularIndirect = vec3(0.0 );
vec3 Schlick_to_F0( const in vec3 f, const in float f90, const in float dotVH ) {
    float x = clamp( 1.0 - dotVH, 0.0, 1.0 );
    float x2 = x * x;
    float x5 = clamp( x * x2 * x2, 0.0, 0.9999 );
    return ( f - vec3( f90 ) * x5 ) / ( 1.0 - x5 );
}
float V_GGX_SmithCorrelated( const in float alpha, const in float dotNL, const in float dotNV ) {
	float a2 = pow2( alpha );
	float gv = dotNL * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNV ) );
	float gl = dotNV * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNL ) );
	return 0.5 / max( gv + gl, EPSILON );
}
float D_GGX( const in float alpha, const in float dotNH ) {
	float a2 = pow2( alpha );
	float denom = pow2( dotNH ) * ( a2 - 1.0 ) + 1.0;
	return RECIPROCAL_PI * a2 / pow2( denom );
}
#ifdef USE_ANISOTROPY
	float V_GGX_SmithCorrelated_Anisotropic( const in float alphaT, const in float alphaB, const in float dotTV, const in float dotBV, const in float dotTL, const in float dotBL, const in float dotNV, const in float dotNL ) {
		float gv = dotNL * length( vec3( alphaT * dotTV, alphaB * dotBV, dotNV ) );
		float gl = dotNV * length( vec3( alphaT * dotTL, alphaB * dotBL, dotNL ) );
		float v = 0.5 / ( gv + gl );
		return saturate(v);
	}
	float D_GGX_Anisotropic( const in float alphaT, const in float alphaB, const in float dotNH, const in float dotTH, const in float dotBH ) {
		float a2 = alphaT * alphaB;
		highp vec3 v = vec3( alphaB * dotTH, alphaT * dotBH, a2 * dotNH );
		highp float v2 = dot( v, v );
		float w2 = a2 / v2;
		return RECIPROCAL_PI * a2 * pow2 ( w2 );
	}
#endif
#ifdef USE_CLEARCOAT
	vec3 BRDF_GGX_Clearcoat( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material) {
		vec3 f0 = material.clearcoatF0;
		float f90 = material.clearcoatF90;
		float roughness = material.clearcoatRoughness;
		float alpha = pow2( roughness );
		vec3 halfDir = normalize( lightDir + viewDir );
		float dotNL = saturate( dot( normal, lightDir ) );
		float dotNV = saturate( dot( normal, viewDir ) );
		float dotNH = saturate( dot( normal, halfDir ) );
		float dotVH = saturate( dot( viewDir, halfDir ) );
		vec3 F = F_Schlick( f0, f90, dotVH );
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
		return F * ( V * D );
	}
#endif
vec3 BRDF_GGX( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material ) {
	vec3 f0 = material.specularColor;
	float f90 = material.specularF90;
	float roughness = material.roughness;
	float alpha = pow2( roughness );
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( f0, f90, dotVH );
	#ifdef USE_IRIDESCENCE
		F = mix( F, material.iridescenceFresnel, material.iridescence );
	#endif
	#ifdef USE_ANISOTROPY
		float dotTL = dot( material.anisotropyT, lightDir );
		float dotTV = dot( material.anisotropyT, viewDir );
		float dotTH = dot( material.anisotropyT, halfDir );
		float dotBL = dot( material.anisotropyB, lightDir );
		float dotBV = dot( material.anisotropyB, viewDir );
		float dotBH = dot( material.anisotropyB, halfDir );
		float V = V_GGX_SmithCorrelated_Anisotropic( material.alphaT, alpha, dotTV, dotBV, dotTL, dotBL, dotNV, dotNL );
		float D = D_GGX_Anisotropic( material.alphaT, alpha, dotNH, dotTH, dotBH );
	#else
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
	#endif
	return F * ( V * D );
}
vec2 LTC_Uv( const in vec3 N, const in vec3 V, const in float roughness ) {
	const float LUT_SIZE = 64.0;
	const float LUT_SCALE = ( LUT_SIZE - 1.0 ) / LUT_SIZE;
	const float LUT_BIAS = 0.5 / LUT_SIZE;
	float dotNV = saturate( dot( N, V ) );
	vec2 uv = vec2( roughness, sqrt( 1.0 - dotNV ) );
	uv = uv * LUT_SCALE + LUT_BIAS;
	return uv;
}
float LTC_ClippedSphereFormFactor( const in vec3 f ) {
	float l = length( f );
	return max( ( l * l + f.z ) / ( l + 1.0 ), 0.0 );
}
vec3 LTC_EdgeVectorFormFactor( const in vec3 v1, const in vec3 v2 ) {
	float x = dot( v1, v2 );
	float y = abs( x );
	float a = 0.8543985 + ( 0.4965155 + 0.0145206 * y ) * y;
	float b = 3.4175940 + ( 4.1616724 + y ) * y;
	float v = a / b;
	float theta_sintheta = ( x > 0.0 ) ? v : 0.5 * inversesqrt( max( 1.0 - x * x, 1e-7 ) ) - v;
	return cross( v1, v2 ) * theta_sintheta;
}
vec3 LTC_Evaluate( const in vec3 N, const in vec3 V, const in vec3 P, const in mat3 mInv, const in vec3 rectCoords[ 4 ] ) {
	vec3 v1 = rectCoords[ 1 ] - rectCoords[ 0 ];
	vec3 v2 = rectCoords[ 3 ] - rectCoords[ 0 ];
	vec3 lightNormal = cross( v1, v2 );
	if( dot( lightNormal, P - rectCoords[ 0 ] ) < 0.0 ) return vec3( 0.0 );
	vec3 T1, T2;
	T1 = normalize( V - N * dot( V, N ) );
	T2 = - cross( N, T1 );
	mat3 mat = mInv * transposeMat3( mat3( T1, T2, N ) );
	vec3 coords[ 4 ];
	coords[ 0 ] = mat * ( rectCoords[ 0 ] - P );
	coords[ 1 ] = mat * ( rectCoords[ 1 ] - P );
	coords[ 2 ] = mat * ( rectCoords[ 2 ] - P );
	coords[ 3 ] = mat * ( rectCoords[ 3 ] - P );
	coords[ 0 ] = normalize( coords[ 0 ] );
	coords[ 1 ] = normalize( coords[ 1 ] );
	coords[ 2 ] = normalize( coords[ 2 ] );
	coords[ 3 ] = normalize( coords[ 3 ] );
	vec3 vectorFormFactor = vec3( 0.0 );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 0 ], coords[ 1 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 1 ], coords[ 2 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 2 ], coords[ 3 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 3 ], coords[ 0 ] );
	float result = LTC_ClippedSphereFormFactor( vectorFormFactor );
	return vec3( result );
}
#if defined( USE_SHEEN )
float D_Charlie( float roughness, float dotNH ) {
	float alpha = pow2( roughness );
	float invAlpha = 1.0 / alpha;
	float cos2h = dotNH * dotNH;
	float sin2h = max( 1.0 - cos2h, 0.0078125 );
	return ( 2.0 + invAlpha ) * pow( sin2h, invAlpha * 0.5 ) / ( 2.0 * PI );
}
float V_Neubelt( float dotNV, float dotNL ) {
	return saturate( 1.0 / ( 4.0 * ( dotNL + dotNV - dotNL * dotNV ) ) );
}
vec3 BRDF_Sheen( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, vec3 sheenColor, const in float sheenRoughness ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float D = D_Charlie( sheenRoughness, dotNH );
	float V = V_Neubelt( dotNV, dotNL );
	return sheenColor * ( D * V );
}
#endif
float IBLSheenBRDF( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	float r2 = roughness * roughness;
	float a = roughness < 0.25 ? -339.2 * r2 + 161.4 * roughness - 25.9 : -8.48 * r2 + 14.3 * roughness - 9.95;
	float b = roughness < 0.25 ? 44.0 * r2 - 23.7 * roughness + 3.26 : 1.97 * r2 - 3.27 * roughness + 0.72;
	float DG = exp( a * dotNV + b ) + ( roughness < 0.25 ? 0.0 : 0.1 * ( roughness - 0.25 ) );
	return saturate( DG * RECIPROCAL_PI );
}
vec2 DFGApprox( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	const vec4 c0 = vec4( - 1, - 0.0275, - 0.572, 0.022 );
	const vec4 c1 = vec4( 1, 0.0425, 1.04, - 0.04 );
	vec4 r = roughness * c0 + c1;
	float a004 = min( r.x * r.x, exp2( - 9.28 * dotNV ) ) * r.x + r.y;
	vec2 fab = vec2( - 1.04, 1.04 ) * a004 + r.zw;
	return fab;
}
vec3 EnvironmentBRDF( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness ) {
	vec2 fab = DFGApprox( normal, viewDir, roughness );
	return specularColor * fab.x + specularF90 * fab.y;
}
#ifdef USE_IRIDESCENCE
void computeMultiscatteringIridescence( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float iridescence, const in vec3 iridescenceF0, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#else
void computeMultiscattering( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#endif
	vec2 fab = DFGApprox( normal, viewDir, roughness );
	#ifdef USE_IRIDESCENCE
		vec3 Fr = mix( specularColor, iridescenceF0, iridescence );
	#else
		vec3 Fr = specularColor;
	#endif
	vec3 FssEss = Fr * fab.x + specularF90 * fab.y;
	float Ess = fab.x + fab.y;
	float Ems = 1.0 - Ess;
	vec3 Favg = Fr + ( 1.0 - Fr ) * 0.047619;	vec3 Fms = FssEss * Favg / ( 1.0 - Ems * Favg );
	singleScatter += FssEss;
	multiScatter += Fms * Ems;
}
#if NUM_RECT_AREA_LIGHTS > 0
	void RE_Direct_RectArea_Physical( const in RectAreaLight rectAreaLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
		vec3 normal = geometryNormal;
		vec3 viewDir = geometryViewDir;
		vec3 position = geometryPosition;
		vec3 lightPos = rectAreaLight.position;
		vec3 halfWidth = rectAreaLight.halfWidth;
		vec3 halfHeight = rectAreaLight.halfHeight;
		vec3 lightColor = rectAreaLight.color;
		float roughness = material.roughness;
		vec3 rectCoords[ 4 ];
		rectCoords[ 0 ] = lightPos + halfWidth - halfHeight;		rectCoords[ 1 ] = lightPos - halfWidth - halfHeight;
		rectCoords[ 2 ] = lightPos - halfWidth + halfHeight;
		rectCoords[ 3 ] = lightPos + halfWidth + halfHeight;
		vec2 uv = LTC_Uv( normal, viewDir, roughness );
		vec4 t1 = texture2D( ltc_1, uv );
		vec4 t2 = texture2D( ltc_2, uv );
		mat3 mInv = mat3(
			vec3( t1.x, 0, t1.y ),
			vec3(    0, 1,    0 ),
			vec3( t1.z, 0, t1.w )
		);
		vec3 fresnel = ( material.specularColor * t2.x + ( vec3( 1.0 ) - material.specularColor ) * t2.y );
		reflectedLight.directSpecular += lightColor * fresnel * LTC_Evaluate( normal, viewDir, position, mInv, rectCoords );
		reflectedLight.directDiffuse += lightColor * material.diffuseColor * LTC_Evaluate( normal, viewDir, position, mat3( 1.0 ), rectCoords );
	}
#endif
void RE_Direct_Physical( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	#ifdef USE_CLEARCOAT
		float dotNLcc = saturate( dot( geometryClearcoatNormal, directLight.direction ) );
		vec3 ccIrradiance = dotNLcc * directLight.color;
		clearcoatSpecularDirect += ccIrradiance * BRDF_GGX_Clearcoat( directLight.direction, geometryViewDir, geometryClearcoatNormal, material );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularDirect += irradiance * BRDF_Sheen( directLight.direction, geometryViewDir, geometryNormal, material.sheenColor, material.sheenRoughness );
	#endif
	reflectedLight.directSpecular += irradiance * BRDF_GGX( directLight.direction, geometryViewDir, geometryNormal, material );
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Physical( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectSpecular_Physical( const in vec3 radiance, const in vec3 irradiance, const in vec3 clearcoatRadiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight) {
	#ifdef USE_CLEARCOAT
		clearcoatSpecularIndirect += clearcoatRadiance * EnvironmentBRDF( geometryClearcoatNormal, geometryViewDir, material.clearcoatF0, material.clearcoatF90, material.clearcoatRoughness );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularIndirect += irradiance * material.sheenColor * IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
	#endif
	vec3 singleScattering = vec3( 0.0 );
	vec3 multiScattering = vec3( 0.0 );
	vec3 cosineWeightedIrradiance = irradiance * RECIPROCAL_PI;
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.iridescence, material.iridescenceFresnel, material.roughness, singleScattering, multiScattering );
	#else
		computeMultiscattering( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.roughness, singleScattering, multiScattering );
	#endif
	vec3 totalScattering = singleScattering + multiScattering;
	vec3 diffuse = material.diffuseColor * ( 1.0 - max( max( totalScattering.r, totalScattering.g ), totalScattering.b ) );
	reflectedLight.indirectSpecular += radiance * singleScattering;
	reflectedLight.indirectSpecular += multiScattering * cosineWeightedIrradiance;
	reflectedLight.indirectDiffuse += diffuse * cosineWeightedIrradiance;
}
#define RE_Direct				RE_Direct_Physical
#define RE_Direct_RectArea		RE_Direct_RectArea_Physical
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Physical
#define RE_IndirectSpecular		RE_IndirectSpecular_Physical
float computeSpecularOcclusion( const in float dotNV, const in float ambientOcclusion, const in float roughness ) {
	return saturate( pow( dotNV + ambientOcclusion, exp2( - 16.0 * roughness - 1.0 ) ) - 1.0 + ambientOcclusion );
}`,
  lights_fragment_begin: `
vec3 geometryPosition = - vViewPosition;
vec3 geometryNormal = normal;
vec3 geometryViewDir = ( isOrthographic ) ? vec3( 0, 0, 1 ) : normalize( vViewPosition );
vec3 geometryClearcoatNormal = vec3( 0.0 );
#ifdef USE_CLEARCOAT
	geometryClearcoatNormal = clearcoatNormal;
#endif
#ifdef USE_IRIDESCENCE
	float dotNVi = saturate( dot( normal, geometryViewDir ) );
	if ( material.iridescenceThickness == 0.0 ) {
		material.iridescence = 0.0;
	} else {
		material.iridescence = saturate( material.iridescence );
	}
	if ( material.iridescence > 0.0 ) {
		material.iridescenceFresnel = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.specularColor );
		material.iridescenceF0 = Schlick_to_F0( material.iridescenceFresnel, 1.0, dotNVi );
	}
#endif
IncidentLight directLight;
#if ( NUM_POINT_LIGHTS > 0 ) && defined( RE_Direct )
	PointLight pointLight;
	#if defined( USE_SHADOWMAP ) && NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHTS; i ++ ) {
		pointLight = pointLights[ i ];
		getPointLightInfo( pointLight, geometryPosition, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_POINT_LIGHT_SHADOWS )
		pointLightShadow = pointLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getPointShadow( pointShadowMap[ i ], pointLightShadow.shadowMapSize, pointLightShadow.shadowIntensity, pointLightShadow.shadowBias, pointLightShadow.shadowRadius, vPointShadowCoord[ i ], pointLightShadow.shadowCameraNear, pointLightShadow.shadowCameraFar ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_SPOT_LIGHTS > 0 ) && defined( RE_Direct )
	SpotLight spotLight;
	vec4 spotColor;
	vec3 spotLightCoord;
	bool inSpotLightMap;
	#if defined( USE_SHADOWMAP ) && NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHTS; i ++ ) {
		spotLight = spotLights[ i ];
		getSpotLightInfo( spotLight, geometryPosition, directLight );
		#if ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#define SPOT_LIGHT_MAP_INDEX UNROLLED_LOOP_INDEX
		#elif ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		#define SPOT_LIGHT_MAP_INDEX NUM_SPOT_LIGHT_MAPS
		#else
		#define SPOT_LIGHT_MAP_INDEX ( UNROLLED_LOOP_INDEX - NUM_SPOT_LIGHT_SHADOWS + NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#endif
		#if ( SPOT_LIGHT_MAP_INDEX < NUM_SPOT_LIGHT_MAPS )
			spotLightCoord = vSpotLightCoord[ i ].xyz / vSpotLightCoord[ i ].w;
			inSpotLightMap = all( lessThan( abs( spotLightCoord * 2. - 1. ), vec3( 1.0 ) ) );
			spotColor = texture2D( spotLightMap[ SPOT_LIGHT_MAP_INDEX ], spotLightCoord.xy );
			directLight.color = inSpotLightMap ? directLight.color * spotColor.rgb : directLight.color;
		#endif
		#undef SPOT_LIGHT_MAP_INDEX
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		spotLightShadow = spotLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( spotShadowMap[ i ], spotLightShadow.shadowMapSize, spotLightShadow.shadowIntensity, spotLightShadow.shadowBias, spotLightShadow.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_DIR_LIGHTS > 0 ) && defined( RE_Direct )
	DirectionalLight directionalLight;
	#if defined( USE_SHADOWMAP ) && NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHTS; i ++ ) {
		directionalLight = directionalLights[ i ];
		getDirectionalLightInfo( directionalLight, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_DIR_LIGHT_SHADOWS )
		directionalLightShadow = directionalLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( directionalShadowMap[ i ], directionalLightShadow.shadowMapSize, directionalLightShadow.shadowIntensity, directionalLightShadow.shadowBias, directionalLightShadow.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_RECT_AREA_LIGHTS > 0 ) && defined( RE_Direct_RectArea )
	RectAreaLight rectAreaLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_RECT_AREA_LIGHTS; i ++ ) {
		rectAreaLight = rectAreaLights[ i ];
		RE_Direct_RectArea( rectAreaLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if defined( RE_IndirectDiffuse )
	vec3 iblIrradiance = vec3( 0.0 );
	vec3 irradiance = getAmbientLightIrradiance( ambientLightColor );
	#if defined( USE_LIGHT_PROBES )
		irradiance += getLightProbeIrradiance( lightProbe, geometryNormal );
	#endif
	#if ( NUM_HEMI_LIGHTS > 0 )
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_HEMI_LIGHTS; i ++ ) {
			irradiance += getHemisphereLightIrradiance( hemisphereLights[ i ], geometryNormal );
		}
		#pragma unroll_loop_end
	#endif
#endif
#if defined( RE_IndirectSpecular )
	vec3 radiance = vec3( 0.0 );
	vec3 clearcoatRadiance = vec3( 0.0 );
#endif`,
  lights_fragment_maps: `#if defined( RE_IndirectDiffuse )
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
		irradiance += lightMapIrradiance;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD ) && defined( ENVMAP_TYPE_CUBE_UV )
		iblIrradiance += getIBLIrradiance( geometryNormal );
	#endif
#endif
#if defined( USE_ENVMAP ) && defined( RE_IndirectSpecular )
	#ifdef USE_ANISOTROPY
		radiance += getIBLAnisotropyRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );
	#else
		radiance += getIBLRadiance( geometryViewDir, geometryNormal, material.roughness );
	#endif
	#ifdef USE_CLEARCOAT
		clearcoatRadiance += getIBLRadiance( geometryViewDir, geometryClearcoatNormal, material.clearcoatRoughness );
	#endif
#endif`,
  lights_fragment_end: `#if defined( RE_IndirectDiffuse )
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,
  logdepthbuf_fragment: `#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,
  logdepthbuf_pars_fragment: `#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,
  logdepthbuf_pars_vertex: `#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,
  logdepthbuf_vertex: `#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,
  map_fragment: `#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,
  map_pars_fragment: `#ifdef USE_MAP
	uniform sampler2D map;
#endif`,
  map_particle_fragment: `#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
	#if defined( USE_POINTS_UV )
		vec2 uv = vUv;
	#else
		vec2 uv = ( uvTransform * vec3( gl_PointCoord.x, 1.0 - gl_PointCoord.y, 1 ) ).xy;
	#endif
#endif
#ifdef USE_MAP
	diffuseColor *= texture2D( map, uv );
#endif
#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, uv ).g;
#endif`,
  map_particle_pars_fragment: `#if defined( USE_POINTS_UV )
	varying vec2 vUv;
#else
	#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
		uniform mat3 uvTransform;
	#endif
#endif
#ifdef USE_MAP
	uniform sampler2D map;
#endif
#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,
  metalnessmap_fragment: `float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,
  metalnessmap_pars_fragment: `#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,
  morphinstance_vertex: `#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,
  morphcolor_vertex: `#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,
  morphnormal_vertex: `#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,
  morphtarget_pars_vertex: `#ifdef USE_MORPHTARGETS
	#ifndef USE_INSTANCING_MORPH
		uniform float morphTargetBaseInfluence;
		uniform float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	#endif
	uniform sampler2DArray morphTargetsTexture;
	uniform ivec2 morphTargetsTextureSize;
	vec4 getMorph( const in int vertexIndex, const in int morphTargetIndex, const in int offset ) {
		int texelIndex = vertexIndex * MORPHTARGETS_TEXTURE_STRIDE + offset;
		int y = texelIndex / morphTargetsTextureSize.x;
		int x = texelIndex - y * morphTargetsTextureSize.x;
		ivec3 morphUV = ivec3( x, y, morphTargetIndex );
		return texelFetch( morphTargetsTexture, morphUV, 0 );
	}
#endif`,
  morphtarget_vertex: `#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,
  normal_fragment_begin: `float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
#ifdef FLAT_SHADED
	vec3 fdx = dFdx( vViewPosition );
	vec3 fdy = dFdy( vViewPosition );
	vec3 normal = normalize( cross( fdx, fdy ) );
#else
	vec3 normal = normalize( vNormal );
	#ifdef DOUBLE_SIDED
		normal *= faceDirection;
	#endif
#endif
#if defined( USE_NORMALMAP_TANGENTSPACE ) || defined( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY )
	#ifdef USE_TANGENT
		mat3 tbn = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn = getTangentFrame( - vViewPosition, normal,
		#if defined( USE_NORMALMAP )
			vNormalMapUv
		#elif defined( USE_CLEARCOAT_NORMALMAP )
			vClearcoatNormalMapUv
		#else
			vUv
		#endif
		);
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn[0] *= faceDirection;
		tbn[1] *= faceDirection;
	#endif
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	#ifdef USE_TANGENT
		mat3 tbn2 = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn2 = getTangentFrame( - vViewPosition, normal, vClearcoatNormalMapUv );
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn2[0] *= faceDirection;
		tbn2[1] *= faceDirection;
	#endif
#endif
vec3 nonPerturbedNormal = normal;`,
  normal_fragment_maps: `#ifdef USE_NORMALMAP_OBJECTSPACE
	normal = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#ifdef FLIP_SIDED
		normal = - normal;
	#endif
	#ifdef DOUBLE_SIDED
		normal = normal * faceDirection;
	#endif
	normal = normalize( normalMatrix * normal );
#elif defined( USE_NORMALMAP_TANGENTSPACE )
	vec3 mapN = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	mapN.xy *= normalScale;
	normal = normalize( tbn * mapN );
#elif defined( USE_BUMPMAP )
	normal = perturbNormalArb( - vViewPosition, normal, dHdxy_fwd(), faceDirection );
#endif`,
  normal_pars_fragment: `#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,
  normal_pars_vertex: `#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,
  normal_vertex: `#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,
  normalmap_pars_fragment: `#ifdef USE_NORMALMAP
	uniform sampler2D normalMap;
	uniform vec2 normalScale;
#endif
#ifdef USE_NORMALMAP_OBJECTSPACE
	uniform mat3 normalMatrix;
#endif
#if ! defined ( USE_TANGENT ) && ( defined ( USE_NORMALMAP_TANGENTSPACE ) || defined ( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY ) )
	mat3 getTangentFrame( vec3 eye_pos, vec3 surf_norm, vec2 uv ) {
		vec3 q0 = dFdx( eye_pos.xyz );
		vec3 q1 = dFdy( eye_pos.xyz );
		vec2 st0 = dFdx( uv.st );
		vec2 st1 = dFdy( uv.st );
		vec3 N = surf_norm;
		vec3 q1perp = cross( q1, N );
		vec3 q0perp = cross( N, q0 );
		vec3 T = q1perp * st0.x + q0perp * st1.x;
		vec3 B = q1perp * st0.y + q0perp * st1.y;
		float det = max( dot( T, T ), dot( B, B ) );
		float scale = ( det == 0.0 ) ? 0.0 : inversesqrt( det );
		return mat3( T * scale, B * scale, N );
	}
#endif`,
  clearcoat_normal_fragment_begin: `#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,
  clearcoat_normal_fragment_maps: `#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,
  clearcoat_pars_fragment: `#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,
  iridescence_pars_fragment: `#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,
  opaque_fragment: `#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,
  packing: `vec3 packNormalToRGB( const in vec3 normal ) {
	return normalize( normal ) * 0.5 + 0.5;
}
vec3 unpackRGBToNormal( const in vec3 rgb ) {
	return 2.0 * rgb.xyz - 1.0;
}
const float PackUpscale = 256. / 255.;const float UnpackDownscale = 255. / 256.;const float ShiftRight8 = 1. / 256.;
const float Inv255 = 1. / 255.;
const vec4 PackFactors = vec4( 1.0, 256.0, 256.0 * 256.0, 256.0 * 256.0 * 256.0 );
const vec2 UnpackFactors2 = vec2( UnpackDownscale, 1.0 / PackFactors.g );
const vec3 UnpackFactors3 = vec3( UnpackDownscale / PackFactors.rg, 1.0 / PackFactors.b );
const vec4 UnpackFactors4 = vec4( UnpackDownscale / PackFactors.rgb, 1.0 / PackFactors.a );
vec4 packDepthToRGBA( const in float v ) {
	if( v <= 0.0 )
		return vec4( 0., 0., 0., 0. );
	if( v >= 1.0 )
		return vec4( 1., 1., 1., 1. );
	float vuf;
	float af = modf( v * PackFactors.a, vuf );
	float bf = modf( vuf * ShiftRight8, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec4( vuf * Inv255, gf * PackUpscale, bf * PackUpscale, af );
}
vec3 packDepthToRGB( const in float v ) {
	if( v <= 0.0 )
		return vec3( 0., 0., 0. );
	if( v >= 1.0 )
		return vec3( 1., 1., 1. );
	float vuf;
	float bf = modf( v * PackFactors.b, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec3( vuf * Inv255, gf * PackUpscale, bf );
}
vec2 packDepthToRG( const in float v ) {
	if( v <= 0.0 )
		return vec2( 0., 0. );
	if( v >= 1.0 )
		return vec2( 1., 1. );
	float vuf;
	float gf = modf( v * 256., vuf );
	return vec2( vuf * Inv255, gf );
}
float unpackRGBAToDepth( const in vec4 v ) {
	return dot( v, UnpackFactors4 );
}
float unpackRGBToDepth( const in vec3 v ) {
	return dot( v, UnpackFactors3 );
}
float unpackRGToDepth( const in vec2 v ) {
	return v.r * UnpackFactors2.r + v.g * UnpackFactors2.g;
}
vec4 pack2HalfToRGBA( const in vec2 v ) {
	vec4 r = vec4( v.x, fract( v.x * 255.0 ), v.y, fract( v.y * 255.0 ) );
	return vec4( r.x - r.y / 255.0, r.y, r.z - r.w / 255.0, r.w );
}
vec2 unpackRGBATo2Half( const in vec4 v ) {
	return vec2( v.x + ( v.y / 255.0 ), v.z + ( v.w / 255.0 ) );
}
float viewZToOrthographicDepth( const in float viewZ, const in float near, const in float far ) {
	return ( viewZ + near ) / ( near - far );
}
float orthographicDepthToViewZ( const in float depth, const in float near, const in float far ) {
	return depth * ( near - far ) - near;
}
float viewZToPerspectiveDepth( const in float viewZ, const in float near, const in float far ) {
	return ( ( near + viewZ ) * far ) / ( ( far - near ) * viewZ );
}
float perspectiveDepthToViewZ( const in float depth, const in float near, const in float far ) {
	return ( near * far ) / ( ( far - near ) * depth - far );
}`,
  premultiplied_alpha_fragment: `#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,
  project_vertex: `vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,
  dithering_fragment: `#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,
  dithering_pars_fragment: `#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,
  roughnessmap_fragment: `float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,
  roughnessmap_pars_fragment: `#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,
  shadowmap_pars_fragment: `#if NUM_SPOT_LIGHT_COORDS > 0
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#if NUM_SPOT_LIGHT_MAPS > 0
	uniform sampler2D spotLightMap[ NUM_SPOT_LIGHT_MAPS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform sampler2D directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		uniform sampler2D spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform sampler2D pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
	float texture2DCompare( sampler2D depths, vec2 uv, float compare ) {
		float depth = unpackRGBAToDepth( texture2D( depths, uv ) );
		#ifdef USE_REVERSED_DEPTH_BUFFER
			return step( depth, compare );
		#else
			return step( compare, depth );
		#endif
	}
	vec2 texture2DDistribution( sampler2D shadow, vec2 uv ) {
		return unpackRGBATo2Half( texture2D( shadow, uv ) );
	}
	float VSMShadow( sampler2D shadow, vec2 uv, float compare ) {
		float occlusion = 1.0;
		vec2 distribution = texture2DDistribution( shadow, uv );
		#ifdef USE_REVERSED_DEPTH_BUFFER
			float hard_shadow = step( distribution.x, compare );
		#else
			float hard_shadow = step( compare, distribution.x );
		#endif
		if ( hard_shadow != 1.0 ) {
			float distance = compare - distribution.x;
			float variance = max( 0.00000, distribution.y * distribution.y );
			float softness_probability = variance / (variance + distance * distance );			softness_probability = clamp( ( softness_probability - 0.3 ) / ( 0.95 - 0.3 ), 0.0, 1.0 );			occlusion = clamp( max( hard_shadow, softness_probability ), 0.0, 1.0 );
		}
		return occlusion;
	}
	float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
		float shadow = 1.0;
		shadowCoord.xyz /= shadowCoord.w;
		shadowCoord.z += shadowBias;
		bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
		bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
		if ( frustumTest ) {
		#if defined( SHADOWMAP_TYPE_PCF )
			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
			float dx0 = - texelSize.x * shadowRadius;
			float dy0 = - texelSize.y * shadowRadius;
			float dx1 = + texelSize.x * shadowRadius;
			float dy1 = + texelSize.y * shadowRadius;
			float dx2 = dx0 / 2.0;
			float dy2 = dy0 / 2.0;
			float dx3 = dx1 / 2.0;
			float dy3 = dy1 / 2.0;
			shadow = (
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy1 ), shadowCoord.z )
			) * ( 1.0 / 17.0 );
		#elif defined( SHADOWMAP_TYPE_PCF_SOFT )
			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
			float dx = texelSize.x;
			float dy = texelSize.y;
			vec2 uv = shadowCoord.xy;
			vec2 f = fract( uv * shadowMapSize + 0.5 );
			uv -= f * texelSize;
			shadow = (
				texture2DCompare( shadowMap, uv, shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( dx, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( 0.0, dy ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + texelSize, shadowCoord.z ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, 0.0 ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 0.0 ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, dy ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( 0.0, -dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 0.0, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( texture2DCompare( shadowMap, uv + vec2( dx, -dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( dx, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( mix( texture2DCompare( shadowMap, uv + vec2( -dx, -dy ), shadowCoord.z ),
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, -dy ), shadowCoord.z ),
						  f.x ),
					 mix( texture2DCompare( shadowMap, uv + vec2( -dx, 2.0 * dy ), shadowCoord.z ),
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 2.0 * dy ), shadowCoord.z ),
						  f.x ),
					 f.y )
			) * ( 1.0 / 9.0 );
		#elif defined( SHADOWMAP_TYPE_VSM )
			shadow = VSMShadow( shadowMap, shadowCoord.xy, shadowCoord.z );
		#else
			shadow = texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z );
		#endif
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	vec2 cubeToUV( vec3 v, float texelSizeY ) {
		vec3 absV = abs( v );
		float scaleToCube = 1.0 / max( absV.x, max( absV.y, absV.z ) );
		absV *= scaleToCube;
		v *= scaleToCube * ( 1.0 - 2.0 * texelSizeY );
		vec2 planar = v.xy;
		float almostATexel = 1.5 * texelSizeY;
		float almostOne = 1.0 - almostATexel;
		if ( absV.z >= almostOne ) {
			if ( v.z > 0.0 )
				planar.x = 4.0 - v.x;
		} else if ( absV.x >= almostOne ) {
			float signX = sign( v.x );
			planar.x = v.z * signX + 2.0 * signX;
		} else if ( absV.y >= almostOne ) {
			float signY = sign( v.y );
			planar.x = v.x + 2.0 * signY + 2.0;
			planar.y = v.z * signY - 2.0;
		}
		return vec2( 0.125, 0.25 ) * planar + vec2( 0.375, 0.75 );
	}
	float getPointShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		
		float lightToPositionLength = length( lightToPosition );
		if ( lightToPositionLength - shadowCameraFar <= 0.0 && lightToPositionLength - shadowCameraNear >= 0.0 ) {
			float dp = ( lightToPositionLength - shadowCameraNear ) / ( shadowCameraFar - shadowCameraNear );			dp += shadowBias;
			vec3 bd3D = normalize( lightToPosition );
			vec2 texelSize = vec2( 1.0 ) / ( shadowMapSize * vec2( 4.0, 2.0 ) );
			#if defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_PCF_SOFT ) || defined( SHADOWMAP_TYPE_VSM )
				vec2 offset = vec2( - 1, 1 ) * shadowRadius * texelSize.y;
				shadow = (
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxx, texelSize.y ), dp )
				) * ( 1.0 / 9.0 );
			#else
				shadow = texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp );
			#endif
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
#endif`,
  shadowmap_pars_vertex: `#if NUM_SPOT_LIGHT_COORDS > 0
	uniform mat4 spotLightMatrix[ NUM_SPOT_LIGHT_COORDS ];
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform mat4 directionalShadowMatrix[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform mat4 pointShadowMatrix[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
#endif`,
  shadowmap_vertex: `#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
	vec3 shadowWorldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
	vec4 shadowWorldPosition;
#endif
#if defined( USE_SHADOWMAP )
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * directionalLightShadows[ i ].shadowNormalBias, 0 );
			vDirectionalShadowCoord[ i ] = directionalShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * pointLightShadows[ i ].shadowNormalBias, 0 );
			vPointShadowCoord[ i ] = pointShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
#endif
#if NUM_SPOT_LIGHT_COORDS > 0
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_COORDS; i ++ ) {
		shadowWorldPosition = worldPosition;
		#if ( defined( USE_SHADOWMAP ) && UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
			shadowWorldPosition.xyz += shadowWorldNormal * spotLightShadows[ i ].shadowNormalBias;
		#endif
		vSpotLightCoord[ i ] = spotLightMatrix[ i ] * shadowWorldPosition;
	}
	#pragma unroll_loop_end
#endif`,
  shadowmask_pars_fragment: `float getShadowMask() {
	float shadow = 1.0;
	#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
		directionalLight = directionalLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( directionalShadowMap[ i ], directionalLight.shadowMapSize, directionalLight.shadowIntensity, directionalLight.shadowBias, directionalLight.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_SHADOWS; i ++ ) {
		spotLight = spotLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( spotShadowMap[ i ], spotLight.shadowMapSize, spotLight.shadowIntensity, spotLight.shadowBias, spotLight.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
		pointLight = pointLightShadows[ i ];
		shadow *= receiveShadow ? getPointShadow( pointShadowMap[ i ], pointLight.shadowMapSize, pointLight.shadowIntensity, pointLight.shadowBias, pointLight.shadowRadius, vPointShadowCoord[ i ], pointLight.shadowCameraNear, pointLight.shadowCameraFar ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#endif
	return shadow;
}`,
  skinbase_vertex: `#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,
  skinning_pars_vertex: `#ifdef USE_SKINNING
	uniform mat4 bindMatrix;
	uniform mat4 bindMatrixInverse;
	uniform highp sampler2D boneTexture;
	mat4 getBoneMatrix( const in float i ) {
		int size = textureSize( boneTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( boneTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( boneTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( boneTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( boneTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
#endif`,
  skinning_vertex: `#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,
  skinnormal_vertex: `#ifdef USE_SKINNING
	mat4 skinMatrix = mat4( 0.0 );
	skinMatrix += skinWeight.x * boneMatX;
	skinMatrix += skinWeight.y * boneMatY;
	skinMatrix += skinWeight.z * boneMatZ;
	skinMatrix += skinWeight.w * boneMatW;
	skinMatrix = bindMatrixInverse * skinMatrix * bindMatrix;
	objectNormal = vec4( skinMatrix * vec4( objectNormal, 0.0 ) ).xyz;
	#ifdef USE_TANGENT
		objectTangent = vec4( skinMatrix * vec4( objectTangent, 0.0 ) ).xyz;
	#endif
#endif`,
  specularmap_fragment: `float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,
  specularmap_pars_fragment: `#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,
  tonemapping_fragment: `#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,
  tonemapping_pars_fragment: `#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
uniform float toneMappingExposure;
vec3 LinearToneMapping( vec3 color ) {
	return saturate( toneMappingExposure * color );
}
vec3 ReinhardToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	return saturate( color / ( vec3( 1.0 ) + color ) );
}
vec3 CineonToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	color = max( vec3( 0.0 ), color - 0.004 );
	return pow( ( color * ( 6.2 * color + 0.5 ) ) / ( color * ( 6.2 * color + 1.7 ) + 0.06 ), vec3( 2.2 ) );
}
vec3 RRTAndODTFit( vec3 v ) {
	vec3 a = v * ( v + 0.0245786 ) - 0.000090537;
	vec3 b = v * ( 0.983729 * v + 0.4329510 ) + 0.238081;
	return a / b;
}
vec3 ACESFilmicToneMapping( vec3 color ) {
	const mat3 ACESInputMat = mat3(
		vec3( 0.59719, 0.07600, 0.02840 ),		vec3( 0.35458, 0.90834, 0.13383 ),
		vec3( 0.04823, 0.01566, 0.83777 )
	);
	const mat3 ACESOutputMat = mat3(
		vec3(  1.60475, -0.10208, -0.00327 ),		vec3( -0.53108,  1.10813, -0.07276 ),
		vec3( -0.07367, -0.00605,  1.07602 )
	);
	color *= toneMappingExposure / 0.6;
	color = ACESInputMat * color;
	color = RRTAndODTFit( color );
	color = ACESOutputMat * color;
	return saturate( color );
}
const mat3 LINEAR_REC2020_TO_LINEAR_SRGB = mat3(
	vec3( 1.6605, - 0.1246, - 0.0182 ),
	vec3( - 0.5876, 1.1329, - 0.1006 ),
	vec3( - 0.0728, - 0.0083, 1.1187 )
);
const mat3 LINEAR_SRGB_TO_LINEAR_REC2020 = mat3(
	vec3( 0.6274, 0.0691, 0.0164 ),
	vec3( 0.3293, 0.9195, 0.0880 ),
	vec3( 0.0433, 0.0113, 0.8956 )
);
vec3 agxDefaultContrastApprox( vec3 x ) {
	vec3 x2 = x * x;
	vec3 x4 = x2 * x2;
	return + 15.5 * x4 * x2
		- 40.14 * x4 * x
		+ 31.96 * x4
		- 6.868 * x2 * x
		+ 0.4298 * x2
		+ 0.1191 * x
		- 0.00232;
}
vec3 AgXToneMapping( vec3 color ) {
	const mat3 AgXInsetMatrix = mat3(
		vec3( 0.856627153315983, 0.137318972929847, 0.11189821299995 ),
		vec3( 0.0951212405381588, 0.761241990602591, 0.0767994186031903 ),
		vec3( 0.0482516061458583, 0.101439036467562, 0.811302368396859 )
	);
	const mat3 AgXOutsetMatrix = mat3(
		vec3( 1.1271005818144368, - 0.1413297634984383, - 0.14132976349843826 ),
		vec3( - 0.11060664309660323, 1.157823702216272, - 0.11060664309660294 ),
		vec3( - 0.016493938717834573, - 0.016493938717834257, 1.2519364065950405 )
	);
	const float AgxMinEv = - 12.47393;	const float AgxMaxEv = 4.026069;
	color *= toneMappingExposure;
	color = LINEAR_SRGB_TO_LINEAR_REC2020 * color;
	color = AgXInsetMatrix * color;
	color = max( color, 1e-10 );	color = log2( color );
	color = ( color - AgxMinEv ) / ( AgxMaxEv - AgxMinEv );
	color = clamp( color, 0.0, 1.0 );
	color = agxDefaultContrastApprox( color );
	color = AgXOutsetMatrix * color;
	color = pow( max( vec3( 0.0 ), color ), vec3( 2.2 ) );
	color = LINEAR_REC2020_TO_LINEAR_SRGB * color;
	color = clamp( color, 0.0, 1.0 );
	return color;
}
vec3 NeutralToneMapping( vec3 color ) {
	const float StartCompression = 0.8 - 0.04;
	const float Desaturation = 0.15;
	color *= toneMappingExposure;
	float x = min( color.r, min( color.g, color.b ) );
	float offset = x < 0.08 ? x - 6.25 * x * x : 0.04;
	color -= offset;
	float peak = max( color.r, max( color.g, color.b ) );
	if ( peak < StartCompression ) return color;
	float d = 1. - StartCompression;
	float newPeak = 1. - d * d / ( peak + d - StartCompression );
	color *= newPeak / peak;
	float g = 1. - 1. / ( Desaturation * ( peak - newPeak ) + 1. );
	return mix( color, vec3( newPeak ), g );
}
vec3 CustomToneMapping( vec3 color ) { return color; }`,
  transmission_fragment: `#ifdef USE_TRANSMISSION
	material.transmission = transmission;
	material.transmissionAlpha = 1.0;
	material.thickness = thickness;
	material.attenuationDistance = attenuationDistance;
	material.attenuationColor = attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		material.transmission *= texture2D( transmissionMap, vTransmissionMapUv ).r;
	#endif
	#ifdef USE_THICKNESSMAP
		material.thickness *= texture2D( thicknessMap, vThicknessMapUv ).g;
	#endif
	vec3 pos = vWorldPosition;
	vec3 v = normalize( cameraPosition - pos );
	vec3 n = inverseTransformDirection( normal, viewMatrix );
	vec4 transmitted = getIBLVolumeRefraction(
		n, v, material.roughness, material.diffuseColor, material.specularColor, material.specularF90,
		pos, modelMatrix, viewMatrix, projectionMatrix, material.dispersion, material.ior, material.thickness,
		material.attenuationColor, material.attenuationDistance );
	material.transmissionAlpha = mix( material.transmissionAlpha, transmitted.a, material.transmission );
	totalDiffuse = mix( totalDiffuse, transmitted.rgb, material.transmission );
#endif`,
  transmission_pars_fragment: `#ifdef USE_TRANSMISSION
	uniform float transmission;
	uniform float thickness;
	uniform float attenuationDistance;
	uniform vec3 attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		uniform sampler2D transmissionMap;
	#endif
	#ifdef USE_THICKNESSMAP
		uniform sampler2D thicknessMap;
	#endif
	uniform vec2 transmissionSamplerSize;
	uniform sampler2D transmissionSamplerMap;
	uniform mat4 modelMatrix;
	uniform mat4 projectionMatrix;
	varying vec3 vWorldPosition;
	float w0( float a ) {
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - a + 3.0 ) - 3.0 ) + 1.0 );
	}
	float w1( float a ) {
		return ( 1.0 / 6.0 ) * ( a *  a * ( 3.0 * a - 6.0 ) + 4.0 );
	}
	float w2( float a ){
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - 3.0 * a + 3.0 ) + 3.0 ) + 1.0 );
	}
	float w3( float a ) {
		return ( 1.0 / 6.0 ) * ( a * a * a );
	}
	float g0( float a ) {
		return w0( a ) + w1( a );
	}
	float g1( float a ) {
		return w2( a ) + w3( a );
	}
	float h0( float a ) {
		return - 1.0 + w1( a ) / ( w0( a ) + w1( a ) );
	}
	float h1( float a ) {
		return 1.0 + w3( a ) / ( w2( a ) + w3( a ) );
	}
	vec4 bicubic( sampler2D tex, vec2 uv, vec4 texelSize, float lod ) {
		uv = uv * texelSize.zw + 0.5;
		vec2 iuv = floor( uv );
		vec2 fuv = fract( uv );
		float g0x = g0( fuv.x );
		float g1x = g1( fuv.x );
		float h0x = h0( fuv.x );
		float h1x = h1( fuv.x );
		float h0y = h0( fuv.y );
		float h1y = h1( fuv.y );
		vec2 p0 = ( vec2( iuv.x + h0x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p1 = ( vec2( iuv.x + h1x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p2 = ( vec2( iuv.x + h0x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		vec2 p3 = ( vec2( iuv.x + h1x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		return g0( fuv.y ) * ( g0x * textureLod( tex, p0, lod ) + g1x * textureLod( tex, p1, lod ) ) +
			g1( fuv.y ) * ( g0x * textureLod( tex, p2, lod ) + g1x * textureLod( tex, p3, lod ) );
	}
	vec4 textureBicubic( sampler2D sampler, vec2 uv, float lod ) {
		vec2 fLodSize = vec2( textureSize( sampler, int( lod ) ) );
		vec2 cLodSize = vec2( textureSize( sampler, int( lod + 1.0 ) ) );
		vec2 fLodSizeInv = 1.0 / fLodSize;
		vec2 cLodSizeInv = 1.0 / cLodSize;
		vec4 fSample = bicubic( sampler, uv, vec4( fLodSizeInv, fLodSize ), floor( lod ) );
		vec4 cSample = bicubic( sampler, uv, vec4( cLodSizeInv, cLodSize ), ceil( lod ) );
		return mix( fSample, cSample, fract( lod ) );
	}
	vec3 getVolumeTransmissionRay( const in vec3 n, const in vec3 v, const in float thickness, const in float ior, const in mat4 modelMatrix ) {
		vec3 refractionVector = refract( - v, normalize( n ), 1.0 / ior );
		vec3 modelScale;
		modelScale.x = length( vec3( modelMatrix[ 0 ].xyz ) );
		modelScale.y = length( vec3( modelMatrix[ 1 ].xyz ) );
		modelScale.z = length( vec3( modelMatrix[ 2 ].xyz ) );
		return normalize( refractionVector ) * thickness * modelScale;
	}
	float applyIorToRoughness( const in float roughness, const in float ior ) {
		return roughness * clamp( ior * 2.0 - 2.0, 0.0, 1.0 );
	}
	vec4 getTransmissionSample( const in vec2 fragCoord, const in float roughness, const in float ior ) {
		float lod = log2( transmissionSamplerSize.x ) * applyIorToRoughness( roughness, ior );
		return textureBicubic( transmissionSamplerMap, fragCoord.xy, lod );
	}
	vec3 volumeAttenuation( const in float transmissionDistance, const in vec3 attenuationColor, const in float attenuationDistance ) {
		if ( isinf( attenuationDistance ) ) {
			return vec3( 1.0 );
		} else {
			vec3 attenuationCoefficient = -log( attenuationColor ) / attenuationDistance;
			vec3 transmittance = exp( - attenuationCoefficient * transmissionDistance );			return transmittance;
		}
	}
	vec4 getIBLVolumeRefraction( const in vec3 n, const in vec3 v, const in float roughness, const in vec3 diffuseColor,
		const in vec3 specularColor, const in float specularF90, const in vec3 position, const in mat4 modelMatrix,
		const in mat4 viewMatrix, const in mat4 projMatrix, const in float dispersion, const in float ior, const in float thickness,
		const in vec3 attenuationColor, const in float attenuationDistance ) {
		vec4 transmittedLight;
		vec3 transmittance;
		#ifdef USE_DISPERSION
			float halfSpread = ( ior - 1.0 ) * 0.025 * dispersion;
			vec3 iors = vec3( ior - halfSpread, ior, ior + halfSpread );
			for ( int i = 0; i < 3; i ++ ) {
				vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, iors[ i ], modelMatrix );
				vec3 refractedRayExit = position + transmissionRay;
				vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
				vec2 refractionCoords = ndcPos.xy / ndcPos.w;
				refractionCoords += 1.0;
				refractionCoords /= 2.0;
				vec4 transmissionSample = getTransmissionSample( refractionCoords, roughness, iors[ i ] );
				transmittedLight[ i ] = transmissionSample[ i ];
				transmittedLight.a += transmissionSample.a;
				transmittance[ i ] = diffuseColor[ i ] * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance )[ i ];
			}
			transmittedLight.a /= 3.0;
		#else
			vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, ior, modelMatrix );
			vec3 refractedRayExit = position + transmissionRay;
			vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
			vec2 refractionCoords = ndcPos.xy / ndcPos.w;
			refractionCoords += 1.0;
			refractionCoords /= 2.0;
			transmittedLight = getTransmissionSample( refractionCoords, roughness, ior );
			transmittance = diffuseColor * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance );
		#endif
		vec3 attenuatedColor = transmittance * transmittedLight.rgb;
		vec3 F = EnvironmentBRDF( n, v, specularColor, specularF90, roughness );
		float transmittanceFactor = ( transmittance.r + transmittance.g + transmittance.b ) / 3.0;
		return vec4( ( 1.0 - F ) * attenuatedColor, 1.0 - ( 1.0 - transmittedLight.a ) * transmittanceFactor );
	}
#endif`,
  uv_pars_fragment: `#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_SPECULARMAP
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,
  uv_pars_vertex: `#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	uniform mat3 mapTransform;
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	uniform mat3 alphaMapTransform;
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	uniform mat3 lightMapTransform;
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	uniform mat3 aoMapTransform;
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	uniform mat3 bumpMapTransform;
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	uniform mat3 normalMapTransform;
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_DISPLACEMENTMAP
	uniform mat3 displacementMapTransform;
	varying vec2 vDisplacementMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	uniform mat3 emissiveMapTransform;
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	uniform mat3 metalnessMapTransform;
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	uniform mat3 roughnessMapTransform;
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	uniform mat3 anisotropyMapTransform;
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	uniform mat3 clearcoatMapTransform;
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform mat3 clearcoatNormalMapTransform;
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform mat3 clearcoatRoughnessMapTransform;
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	uniform mat3 sheenColorMapTransform;
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	uniform mat3 sheenRoughnessMapTransform;
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	uniform mat3 iridescenceMapTransform;
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform mat3 iridescenceThicknessMapTransform;
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SPECULARMAP
	uniform mat3 specularMapTransform;
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	uniform mat3 specularColorMapTransform;
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	uniform mat3 specularIntensityMapTransform;
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,
  uv_vertex: `#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	vUv = vec3( uv, 1 ).xy;
#endif
#ifdef USE_MAP
	vMapUv = ( mapTransform * vec3( MAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ALPHAMAP
	vAlphaMapUv = ( alphaMapTransform * vec3( ALPHAMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_LIGHTMAP
	vLightMapUv = ( lightMapTransform * vec3( LIGHTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_AOMAP
	vAoMapUv = ( aoMapTransform * vec3( AOMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_BUMPMAP
	vBumpMapUv = ( bumpMapTransform * vec3( BUMPMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_NORMALMAP
	vNormalMapUv = ( normalMapTransform * vec3( NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_DISPLACEMENTMAP
	vDisplacementMapUv = ( displacementMapTransform * vec3( DISPLACEMENTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_EMISSIVEMAP
	vEmissiveMapUv = ( emissiveMapTransform * vec3( EMISSIVEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_METALNESSMAP
	vMetalnessMapUv = ( metalnessMapTransform * vec3( METALNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ROUGHNESSMAP
	vRoughnessMapUv = ( roughnessMapTransform * vec3( ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ANISOTROPYMAP
	vAnisotropyMapUv = ( anisotropyMapTransform * vec3( ANISOTROPYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOATMAP
	vClearcoatMapUv = ( clearcoatMapTransform * vec3( CLEARCOATMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	vClearcoatNormalMapUv = ( clearcoatNormalMapTransform * vec3( CLEARCOAT_NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	vClearcoatRoughnessMapUv = ( clearcoatRoughnessMapTransform * vec3( CLEARCOAT_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCEMAP
	vIridescenceMapUv = ( iridescenceMapTransform * vec3( IRIDESCENCEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	vIridescenceThicknessMapUv = ( iridescenceThicknessMapTransform * vec3( IRIDESCENCE_THICKNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_COLORMAP
	vSheenColorMapUv = ( sheenColorMapTransform * vec3( SHEEN_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	vSheenRoughnessMapUv = ( sheenRoughnessMapTransform * vec3( SHEEN_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULARMAP
	vSpecularMapUv = ( specularMapTransform * vec3( SPECULARMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_COLORMAP
	vSpecularColorMapUv = ( specularColorMapTransform * vec3( SPECULAR_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	vSpecularIntensityMapUv = ( specularIntensityMapTransform * vec3( SPECULAR_INTENSITYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_TRANSMISSIONMAP
	vTransmissionMapUv = ( transmissionMapTransform * vec3( TRANSMISSIONMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_THICKNESSMAP
	vThicknessMapUv = ( thicknessMapTransform * vec3( THICKNESSMAP_UV, 1 ) ).xy;
#endif`,
  worldpos_vertex: `#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`,
  background_vert: `varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,
  background_frag: `uniform sampler2D t2D;
uniform float backgroundIntensity;
varying vec2 vUv;
void main() {
	vec4 texColor = texture2D( t2D, vUv );
	#ifdef DECODE_VIDEO_TEXTURE
		texColor = vec4( mix( pow( texColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), texColor.rgb * 0.0773993808, vec3( lessThanEqual( texColor.rgb, vec3( 0.04045 ) ) ) ), texColor.w );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,
  backgroundCube_vert: `varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,
  backgroundCube_frag: `#ifdef ENVMAP_TYPE_CUBE
	uniform samplerCube envMap;
#elif defined( ENVMAP_TYPE_CUBE_UV )
	uniform sampler2D envMap;
#endif
uniform float flipEnvMap;
uniform float backgroundBlurriness;
uniform float backgroundIntensity;
uniform mat3 backgroundRotation;
varying vec3 vWorldDirection;
#include <cube_uv_reflection_fragment>
void main() {
	#ifdef ENVMAP_TYPE_CUBE
		vec4 texColor = textureCube( envMap, backgroundRotation * vec3( flipEnvMap * vWorldDirection.x, vWorldDirection.yz ) );
	#elif defined( ENVMAP_TYPE_CUBE_UV )
		vec4 texColor = textureCubeUV( envMap, backgroundRotation * vWorldDirection, backgroundBlurriness );
	#else
		vec4 texColor = vec4( 0.0, 0.0, 0.0, 1.0 );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,
  cube_vert: `varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,
  cube_frag: `uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,
  depth_vert: `#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
varying vec2 vHighPrecisionZW;
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vHighPrecisionZW = gl_Position.zw;
}`,
  depth_frag: `#if DEPTH_PACKING == 3200
	uniform float opacity;
#endif
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
varying vec2 vHighPrecisionZW;
void main() {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#if DEPTH_PACKING == 3200
		diffuseColor.a = opacity;
	#endif
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <logdepthbuf_fragment>
	#ifdef USE_REVERSED_DEPTH_BUFFER
		float fragCoordZ = vHighPrecisionZW[ 0 ] / vHighPrecisionZW[ 1 ];
	#else
		float fragCoordZ = 0.5 * vHighPrecisionZW[ 0 ] / vHighPrecisionZW[ 1 ] + 0.5;
	#endif
	#if DEPTH_PACKING == 3200
		gl_FragColor = vec4( vec3( 1.0 - fragCoordZ ), opacity );
	#elif DEPTH_PACKING == 3201
		gl_FragColor = packDepthToRGBA( fragCoordZ );
	#elif DEPTH_PACKING == 3202
		gl_FragColor = vec4( packDepthToRGB( fragCoordZ ), 1.0 );
	#elif DEPTH_PACKING == 3203
		gl_FragColor = vec4( packDepthToRG( fragCoordZ ), 0.0, 1.0 );
	#endif
}`,
  distanceRGBA_vert: `#define DISTANCE
varying vec3 vWorldPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <worldpos_vertex>
	#include <clipping_planes_vertex>
	vWorldPosition = worldPosition.xyz;
}`,
  distanceRGBA_frag: `#define DISTANCE
uniform vec3 referencePosition;
uniform float nearDistance;
uniform float farDistance;
varying vec3 vWorldPosition;
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <clipping_planes_pars_fragment>
void main () {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	float dist = length( vWorldPosition - referencePosition );
	dist = ( dist - nearDistance ) / ( farDistance - nearDistance );
	dist = saturate( dist );
	gl_FragColor = packDepthToRGBA( dist );
}`,
  equirect_vert: `varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,
  equirect_frag: `uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,
  linedashed_vert: `uniform float scale;
attribute float lineDistance;
varying float vLineDistance;
#include <common>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	vLineDistance = scale * lineDistance;
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,
  linedashed_frag: `uniform vec3 diffuse;
uniform float opacity;
uniform float dashSize;
uniform float totalSize;
varying float vLineDistance;
#include <common>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	if ( mod( vLineDistance, totalSize ) > dashSize ) {
		discard;
	}
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,
  meshbasic_vert: `#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#if defined ( USE_ENVMAP ) || defined ( USE_SKINNING )
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinbase_vertex>
		#include <skinnormal_vertex>
		#include <defaultnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <fog_vertex>
}`,
  meshbasic_frag: `uniform vec3 diffuse;
uniform float opacity;
#ifndef FLAT_SHADED
	varying vec3 vNormal;
#endif
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		reflectedLight.indirectDiffuse += lightMapTexel.rgb * lightMapIntensity * RECIPROCAL_PI;
	#else
		reflectedLight.indirectDiffuse += vec3( 1.0 );
	#endif
	#include <aomap_fragment>
	reflectedLight.indirectDiffuse *= diffuseColor.rgb;
	vec3 outgoingLight = reflectedLight.indirectDiffuse;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,
  meshlambert_vert: `#define LAMBERT
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,
  meshlambert_frag: `#define LAMBERT
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_lambert_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_lambert_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,
  meshmatcap_vert: `#define MATCAP
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <displacementmap_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
	vViewPosition = - mvPosition.xyz;
}`,
  meshmatcap_frag: `#define MATCAP
uniform vec3 diffuse;
uniform float opacity;
uniform sampler2D matcap;
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	vec3 viewDir = normalize( vViewPosition );
	vec3 x = normalize( vec3( viewDir.z, 0.0, - viewDir.x ) );
	vec3 y = cross( viewDir, x );
	vec2 uv = vec2( dot( x, normal ), dot( y, normal ) ) * 0.495 + 0.5;
	#ifdef USE_MATCAP
		vec4 matcapColor = texture2D( matcap, uv );
	#else
		vec4 matcapColor = vec4( vec3( mix( 0.2, 0.8, uv.y ) ), 1.0 );
	#endif
	vec3 outgoingLight = diffuseColor.rgb * matcapColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,
  meshnormal_vert: `#define NORMAL
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	vViewPosition = - mvPosition.xyz;
#endif
}`,
  meshnormal_frag: `#define NORMAL
uniform float opacity;
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <packing>
#include <uv_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( 0.0, 0.0, 0.0, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	gl_FragColor = vec4( packNormalToRGB( normal ), diffuseColor.a );
	#ifdef OPAQUE
		gl_FragColor.a = 1.0;
	#endif
}`,
  meshphong_vert: `#define PHONG
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,
  meshphong_frag: `#define PHONG
uniform vec3 diffuse;
uniform vec3 emissive;
uniform vec3 specular;
uniform float shininess;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_phong_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_phong_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + reflectedLight.directSpecular + reflectedLight.indirectSpecular + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,
  meshphysical_vert: `#define STANDARD
varying vec3 vViewPosition;
#ifdef USE_TRANSMISSION
	varying vec3 vWorldPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
#ifdef USE_TRANSMISSION
	vWorldPosition = worldPosition.xyz;
#endif
}`,
  meshphysical_frag: `#define STANDARD
#ifdef PHYSICAL
	#define IOR
	#define USE_SPECULAR
#endif
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float roughness;
uniform float metalness;
uniform float opacity;
#ifdef IOR
	uniform float ior;
#endif
#ifdef USE_SPECULAR
	uniform float specularIntensity;
	uniform vec3 specularColor;
	#ifdef USE_SPECULAR_COLORMAP
		uniform sampler2D specularColorMap;
	#endif
	#ifdef USE_SPECULAR_INTENSITYMAP
		uniform sampler2D specularIntensityMap;
	#endif
#endif
#ifdef USE_CLEARCOAT
	uniform float clearcoat;
	uniform float clearcoatRoughness;
#endif
#ifdef USE_DISPERSION
	uniform float dispersion;
#endif
#ifdef USE_IRIDESCENCE
	uniform float iridescence;
	uniform float iridescenceIOR;
	uniform float iridescenceThicknessMinimum;
	uniform float iridescenceThicknessMaximum;
#endif
#ifdef USE_SHEEN
	uniform vec3 sheenColor;
	uniform float sheenRoughness;
	#ifdef USE_SHEEN_COLORMAP
		uniform sampler2D sheenColorMap;
	#endif
	#ifdef USE_SHEEN_ROUGHNESSMAP
		uniform sampler2D sheenRoughnessMap;
	#endif
#endif
#ifdef USE_ANISOTROPY
	uniform vec2 anisotropyVector;
	#ifdef USE_ANISOTROPYMAP
		uniform sampler2D anisotropyMap;
	#endif
#endif
varying vec3 vViewPosition;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <iridescence_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_physical_pars_fragment>
#include <transmission_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <clearcoat_pars_fragment>
#include <iridescence_pars_fragment>
#include <roughnessmap_pars_fragment>
#include <metalnessmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <roughnessmap_fragment>
	#include <metalnessmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <clearcoat_normal_fragment_begin>
	#include <clearcoat_normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_physical_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 totalDiffuse = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse;
	vec3 totalSpecular = reflectedLight.directSpecular + reflectedLight.indirectSpecular;
	#include <transmission_fragment>
	vec3 outgoingLight = totalDiffuse + totalSpecular + totalEmissiveRadiance;
	#ifdef USE_SHEEN
		float sheenEnergyComp = 1.0 - 0.157 * max3( material.sheenColor );
		outgoingLight = outgoingLight * sheenEnergyComp + sheenSpecularDirect + sheenSpecularIndirect;
	#endif
	#ifdef USE_CLEARCOAT
		float dotNVcc = saturate( dot( geometryClearcoatNormal, geometryViewDir ) );
		vec3 Fcc = F_Schlick( material.clearcoatF0, material.clearcoatF90, dotNVcc );
		outgoingLight = outgoingLight * ( 1.0 - material.clearcoat * Fcc ) + ( clearcoatSpecularDirect + clearcoatSpecularIndirect ) * material.clearcoat;
	#endif
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,
  meshtoon_vert: `#define TOON
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,
  meshtoon_frag: `#define TOON
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <gradientmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_toon_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_toon_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,
  points_vert: `uniform float size;
uniform float scale;
#include <common>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
#ifdef USE_POINTS_UV
	varying vec2 vUv;
	uniform mat3 uvTransform;
#endif
void main() {
	#ifdef USE_POINTS_UV
		vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	#endif
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	gl_PointSize = size;
	#ifdef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) gl_PointSize *= ( scale / - mvPosition.z );
	#endif
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <fog_vertex>
}`,
  points_frag: `uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <color_pars_fragment>
#include <map_particle_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_particle_fragment>
	#include <color_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,
  shadow_vert: `#include <common>
#include <batching_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <shadowmap_pars_vertex>
void main() {
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,
  shadow_frag: `uniform vec3 color;
uniform float opacity;
#include <common>
#include <packing>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <logdepthbuf_pars_fragment>
#include <shadowmap_pars_fragment>
#include <shadowmask_pars_fragment>
void main() {
	#include <logdepthbuf_fragment>
	gl_FragColor = vec4( color, opacity * ( 1.0 - getShadowMask() ) );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,
  sprite_vert: `uniform float rotation;
uniform vec2 center;
#include <common>
#include <uv_pars_vertex>
#include <fog_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	vec4 mvPosition = modelViewMatrix[ 3 ];
	vec2 scale = vec2( length( modelMatrix[ 0 ].xyz ), length( modelMatrix[ 1 ].xyz ) );
	#ifndef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) scale *= - mvPosition.z;
	#endif
	vec2 alignedPosition = ( position.xy - ( center - vec2( 0.5 ) ) ) * scale;
	vec2 rotatedPosition;
	rotatedPosition.x = cos( rotation ) * alignedPosition.x - sin( rotation ) * alignedPosition.y;
	rotatedPosition.y = sin( rotation ) * alignedPosition.x + cos( rotation ) * alignedPosition.y;
	mvPosition.xy += rotatedPosition;
	gl_Position = projectionMatrix * mvPosition;
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,
  sprite_frag: `uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`
}, me = {
  common: {
    diffuse: { value: /* @__PURE__ */ new Be(16777215) },
    opacity: { value: 1 },
    map: { value: null },
    mapTransform: { value: /* @__PURE__ */ new qe() },
    alphaMap: { value: null },
    alphaMapTransform: { value: /* @__PURE__ */ new qe() },
    alphaTest: { value: 0 }
  },
  specularmap: {
    specularMap: { value: null },
    specularMapTransform: { value: /* @__PURE__ */ new qe() }
  },
  envmap: {
    envMap: { value: null },
    envMapRotation: { value: /* @__PURE__ */ new qe() },
    flipEnvMap: { value: -1 },
    reflectivity: { value: 1 },
    ior: { value: 1.5 },
    refractionRatio: { value: 0.98 }
  },
  aomap: {
    aoMap: { value: null },
    aoMapIntensity: { value: 1 },
    aoMapTransform: { value: /* @__PURE__ */ new qe() }
  },
  lightmap: {
    lightMap: { value: null },
    lightMapIntensity: { value: 1 },
    lightMapTransform: { value: /* @__PURE__ */ new qe() }
  },
  bumpmap: {
    bumpMap: { value: null },
    bumpMapTransform: { value: /* @__PURE__ */ new qe() },
    bumpScale: { value: 1 }
  },
  normalmap: {
    normalMap: { value: null },
    normalMapTransform: { value: /* @__PURE__ */ new qe() },
    normalScale: { value: /* @__PURE__ */ new re(1, 1) }
  },
  displacementmap: {
    displacementMap: { value: null },
    displacementMapTransform: { value: /* @__PURE__ */ new qe() },
    displacementScale: { value: 1 },
    displacementBias: { value: 0 }
  },
  emissivemap: {
    emissiveMap: { value: null },
    emissiveMapTransform: { value: /* @__PURE__ */ new qe() }
  },
  metalnessmap: {
    metalnessMap: { value: null },
    metalnessMapTransform: { value: /* @__PURE__ */ new qe() }
  },
  roughnessmap: {
    roughnessMap: { value: null },
    roughnessMapTransform: { value: /* @__PURE__ */ new qe() }
  },
  gradientmap: { gradientMap: { value: null } },
  fog: {
    fogDensity: { value: 25e-5 },
    fogNear: { value: 1 },
    fogFar: { value: 2e3 },
    fogColor: { value: /* @__PURE__ */ new Be(16777215) }
  },
  lights: {
    ambientLightColor: { value: [] },
    lightProbe: { value: [] },
    directionalLights: {
      value: [],
      properties: {
        direction: {},
        color: {}
      }
    },
    directionalLightShadows: {
      value: [],
      properties: {
        shadowIntensity: 1,
        shadowBias: {},
        shadowNormalBias: {},
        shadowRadius: {},
        shadowMapSize: {}
      }
    },
    directionalShadowMap: { value: [] },
    directionalShadowMatrix: { value: [] },
    spotLights: {
      value: [],
      properties: {
        color: {},
        position: {},
        direction: {},
        distance: {},
        coneCos: {},
        penumbraCos: {},
        decay: {}
      }
    },
    spotLightShadows: {
      value: [],
      properties: {
        shadowIntensity: 1,
        shadowBias: {},
        shadowNormalBias: {},
        shadowRadius: {},
        shadowMapSize: {}
      }
    },
    spotLightMap: { value: [] },
    spotShadowMap: { value: [] },
    spotLightMatrix: { value: [] },
    pointLights: {
      value: [],
      properties: {
        color: {},
        position: {},
        decay: {},
        distance: {}
      }
    },
    pointLightShadows: {
      value: [],
      properties: {
        shadowIntensity: 1,
        shadowBias: {},
        shadowNormalBias: {},
        shadowRadius: {},
        shadowMapSize: {},
        shadowCameraNear: {},
        shadowCameraFar: {}
      }
    },
    pointShadowMap: { value: [] },
    pointShadowMatrix: { value: [] },
    hemisphereLights: {
      value: [],
      properties: {
        direction: {},
        skyColor: {},
        groundColor: {}
      }
    },
    rectAreaLights: {
      value: [],
      properties: {
        color: {},
        position: {},
        width: {},
        height: {}
      }
    },
    ltc_1: { value: null },
    ltc_2: { value: null }
  },
  points: {
    diffuse: { value: /* @__PURE__ */ new Be(16777215) },
    opacity: { value: 1 },
    size: { value: 1 },
    scale: { value: 1 },
    map: { value: null },
    alphaMap: { value: null },
    alphaMapTransform: { value: /* @__PURE__ */ new qe() },
    alphaTest: { value: 0 },
    uvTransform: { value: /* @__PURE__ */ new qe() }
  },
  sprite: {
    diffuse: { value: /* @__PURE__ */ new Be(16777215) },
    opacity: { value: 1 },
    center: { value: /* @__PURE__ */ new re(0.5, 0.5) },
    rotation: { value: 0 },
    map: { value: null },
    mapTransform: { value: /* @__PURE__ */ new qe() },
    alphaMap: { value: null },
    alphaMapTransform: { value: /* @__PURE__ */ new qe() },
    alphaTest: { value: 0 }
  }
}, en = {
  basic: {
    uniforms: /* @__PURE__ */ At([
      me.common,
      me.specularmap,
      me.envmap,
      me.aomap,
      me.lightmap,
      me.fog
    ]),
    vertexShader: We.meshbasic_vert,
    fragmentShader: We.meshbasic_frag
  },
  lambert: {
    uniforms: /* @__PURE__ */ At([
      me.common,
      me.specularmap,
      me.envmap,
      me.aomap,
      me.lightmap,
      me.emissivemap,
      me.bumpmap,
      me.normalmap,
      me.displacementmap,
      me.fog,
      me.lights,
      { emissive: { value: /* @__PURE__ */ new Be(0) } }
    ]),
    vertexShader: We.meshlambert_vert,
    fragmentShader: We.meshlambert_frag
  },
  phong: {
    uniforms: /* @__PURE__ */ At([
      me.common,
      me.specularmap,
      me.envmap,
      me.aomap,
      me.lightmap,
      me.emissivemap,
      me.bumpmap,
      me.normalmap,
      me.displacementmap,
      me.fog,
      me.lights,
      {
        emissive: { value: /* @__PURE__ */ new Be(0) },
        specular: { value: /* @__PURE__ */ new Be(1118481) },
        shininess: { value: 30 }
      }
    ]),
    vertexShader: We.meshphong_vert,
    fragmentShader: We.meshphong_frag
  },
  standard: {
    uniforms: /* @__PURE__ */ At([
      me.common,
      me.envmap,
      me.aomap,
      me.lightmap,
      me.emissivemap,
      me.bumpmap,
      me.normalmap,
      me.displacementmap,
      me.roughnessmap,
      me.metalnessmap,
      me.fog,
      me.lights,
      {
        emissive: { value: /* @__PURE__ */ new Be(0) },
        roughness: { value: 1 },
        metalness: { value: 0 },
        envMapIntensity: { value: 1 }
      }
    ]),
    vertexShader: We.meshphysical_vert,
    fragmentShader: We.meshphysical_frag
  },
  toon: {
    uniforms: /* @__PURE__ */ At([
      me.common,
      me.aomap,
      me.lightmap,
      me.emissivemap,
      me.bumpmap,
      me.normalmap,
      me.displacementmap,
      me.gradientmap,
      me.fog,
      me.lights,
      { emissive: { value: /* @__PURE__ */ new Be(0) } }
    ]),
    vertexShader: We.meshtoon_vert,
    fragmentShader: We.meshtoon_frag
  },
  matcap: {
    uniforms: /* @__PURE__ */ At([
      me.common,
      me.bumpmap,
      me.normalmap,
      me.displacementmap,
      me.fog,
      { matcap: { value: null } }
    ]),
    vertexShader: We.meshmatcap_vert,
    fragmentShader: We.meshmatcap_frag
  },
  points: {
    uniforms: /* @__PURE__ */ At([me.points, me.fog]),
    vertexShader: We.points_vert,
    fragmentShader: We.points_frag
  },
  dashed: {
    uniforms: /* @__PURE__ */ At([
      me.common,
      me.fog,
      {
        scale: { value: 1 },
        dashSize: { value: 1 },
        totalSize: { value: 2 }
      }
    ]),
    vertexShader: We.linedashed_vert,
    fragmentShader: We.linedashed_frag
  },
  depth: {
    uniforms: /* @__PURE__ */ At([me.common, me.displacementmap]),
    vertexShader: We.depth_vert,
    fragmentShader: We.depth_frag
  },
  normal: {
    uniforms: /* @__PURE__ */ At([
      me.common,
      me.bumpmap,
      me.normalmap,
      me.displacementmap,
      { opacity: { value: 1 } }
    ]),
    vertexShader: We.meshnormal_vert,
    fragmentShader: We.meshnormal_frag
  },
  sprite: {
    uniforms: /* @__PURE__ */ At([me.sprite, me.fog]),
    vertexShader: We.sprite_vert,
    fragmentShader: We.sprite_frag
  },
  background: {
    uniforms: {
      uvTransform: { value: /* @__PURE__ */ new qe() },
      t2D: { value: null },
      backgroundIntensity: { value: 1 }
    },
    vertexShader: We.background_vert,
    fragmentShader: We.background_frag
  },
  backgroundCube: {
    uniforms: {
      envMap: { value: null },
      flipEnvMap: { value: -1 },
      backgroundBlurriness: { value: 0 },
      backgroundIntensity: { value: 1 },
      backgroundRotation: { value: /* @__PURE__ */ new qe() }
    },
    vertexShader: We.backgroundCube_vert,
    fragmentShader: We.backgroundCube_frag
  },
  cube: {
    uniforms: {
      tCube: { value: null },
      tFlip: { value: -1 },
      opacity: { value: 1 }
    },
    vertexShader: We.cube_vert,
    fragmentShader: We.cube_frag
  },
  equirect: {
    uniforms: { tEquirect: { value: null } },
    vertexShader: We.equirect_vert,
    fragmentShader: We.equirect_frag
  },
  distanceRGBA: {
    uniforms: /* @__PURE__ */ At([
      me.common,
      me.displacementmap,
      {
        referencePosition: { value: /* @__PURE__ */ new C() },
        nearDistance: { value: 1 },
        farDistance: { value: 1e3 }
      }
    ]),
    vertexShader: We.distanceRGBA_vert,
    fragmentShader: We.distanceRGBA_frag
  },
  shadow: {
    uniforms: /* @__PURE__ */ At([
      me.lights,
      me.fog,
      {
        color: { value: /* @__PURE__ */ new Be(0) },
        opacity: { value: 1 }
      }
    ]),
    vertexShader: We.shadow_vert,
    fragmentShader: We.shadow_frag
  }
};
en.physical = {
  uniforms: /* @__PURE__ */ At([en.standard.uniforms, {
    clearcoat: { value: 0 },
    clearcoatMap: { value: null },
    clearcoatMapTransform: { value: /* @__PURE__ */ new qe() },
    clearcoatNormalMap: { value: null },
    clearcoatNormalMapTransform: { value: /* @__PURE__ */ new qe() },
    clearcoatNormalScale: { value: /* @__PURE__ */ new re(1, 1) },
    clearcoatRoughness: { value: 0 },
    clearcoatRoughnessMap: { value: null },
    clearcoatRoughnessMapTransform: { value: /* @__PURE__ */ new qe() },
    dispersion: { value: 0 },
    iridescence: { value: 0 },
    iridescenceMap: { value: null },
    iridescenceMapTransform: { value: /* @__PURE__ */ new qe() },
    iridescenceIOR: { value: 1.3 },
    iridescenceThicknessMinimum: { value: 100 },
    iridescenceThicknessMaximum: { value: 400 },
    iridescenceThicknessMap: { value: null },
    iridescenceThicknessMapTransform: { value: /* @__PURE__ */ new qe() },
    sheen: { value: 0 },
    sheenColor: { value: /* @__PURE__ */ new Be(0) },
    sheenColorMap: { value: null },
    sheenColorMapTransform: { value: /* @__PURE__ */ new qe() },
    sheenRoughness: { value: 1 },
    sheenRoughnessMap: { value: null },
    sheenRoughnessMapTransform: { value: /* @__PURE__ */ new qe() },
    transmission: { value: 0 },
    transmissionMap: { value: null },
    transmissionMapTransform: { value: /* @__PURE__ */ new qe() },
    transmissionSamplerSize: { value: /* @__PURE__ */ new re() },
    transmissionSamplerMap: { value: null },
    thickness: { value: 0 },
    thicknessMap: { value: null },
    thicknessMapTransform: { value: /* @__PURE__ */ new qe() },
    attenuationDistance: { value: 0 },
    attenuationColor: { value: /* @__PURE__ */ new Be(0) },
    specularColor: { value: /* @__PURE__ */ new Be(1, 1, 1) },
    specularColorMap: { value: null },
    specularColorMapTransform: { value: /* @__PURE__ */ new qe() },
    specularIntensity: { value: 1 },
    specularIntensityMap: { value: null },
    specularIntensityMapTransform: { value: /* @__PURE__ */ new qe() },
    anisotropyVector: { value: /* @__PURE__ */ new re() },
    anisotropyMap: { value: null },
    anisotropyMapTransform: { value: /* @__PURE__ */ new qe() }
  }]),
  vertexShader: We.meshphysical_vert,
  fragmentShader: We.meshphysical_frag
};
var Us = {
  r: 0,
  b: 0,
  g: 0
}, Nn = /* @__PURE__ */ new An(), Ud = /* @__PURE__ */ new Ve();
function Od(e, t, n, i, s, r, o) {
  const a = new Be(0);
  let l = r === !0 ? 0 : 1, c, h, u = null, d = 0, p = null;
  function _(v) {
    let S = v.isScene === !0 ? v.background : null;
    return S && S.isTexture && (S = (v.backgroundBlurriness > 0 ? n : t).get(S)), S;
  }
  function g(v) {
    let S = !1;
    const A = _(v);
    A === null ? f(a, l) : A && A.isColor && (f(A, 1), S = !0);
    const b = e.xr.getEnvironmentBlendMode();
    b === "additive" ? i.buffers.color.setClear(0, 0, 0, 1, o) : b === "alpha-blend" && i.buffers.color.setClear(0, 0, 0, 0, o), (e.autoClear || S) && (i.buffers.depth.setTest(!0), i.buffers.depth.setMask(!0), i.buffers.color.setMask(!0), e.clear(e.autoClearColor, e.autoClearDepth, e.autoClearStencil));
  }
  function m(v, S) {
    const A = _(S);
    A && (A.isCubeTexture || A.mapping === 306) ? (h === void 0 && (h = new Tt(new is(1, 1, 1), new wn({
      name: "BackgroundCubeMaterial",
      uniforms: gi(en.backgroundCube.uniforms),
      vertexShader: en.backgroundCube.vertexShader,
      fragmentShader: en.backgroundCube.fragmentShader,
      side: 1,
      depthTest: !1,
      depthWrite: !1,
      fog: !1,
      allowOverride: !1
    })), h.geometry.deleteAttribute("normal"), h.geometry.deleteAttribute("uv"), h.onBeforeRender = function(b, R, I) {
      this.matrixWorld.copyPosition(I.matrixWorld);
    }, Object.defineProperty(h.material, "envMap", { get: function() {
      return this.uniforms.envMap.value;
    } }), s.update(h)), Nn.copy(S.backgroundRotation), Nn.x *= -1, Nn.y *= -1, Nn.z *= -1, A.isCubeTexture && A.isRenderTargetTexture === !1 && (Nn.y *= -1, Nn.z *= -1), h.material.uniforms.envMap.value = A, h.material.uniforms.flipEnvMap.value = A.isCubeTexture && A.isRenderTargetTexture === !1 ? -1 : 1, h.material.uniforms.backgroundBlurriness.value = S.backgroundBlurriness, h.material.uniforms.backgroundIntensity.value = S.backgroundIntensity, h.material.uniforms.backgroundRotation.value.setFromMatrix4(Ud.makeRotationFromEuler(Nn)), h.material.toneMapped = Ze.getTransfer(A.colorSpace) !== Ws, (u !== A || d !== A.version || p !== e.toneMapping) && (h.material.needsUpdate = !0, u = A, d = A.version, p = e.toneMapping), h.layers.enableAll(), v.unshift(h, h.geometry, h.material, 0, 0, null)) : A && A.isTexture && (c === void 0 && (c = new Tt(new Bl(2, 2), new wn({
      name: "BackgroundMaterial",
      uniforms: gi(en.background.uniforms),
      vertexShader: en.background.vertexShader,
      fragmentShader: en.background.fragmentShader,
      side: 0,
      depthTest: !1,
      depthWrite: !1,
      fog: !1,
      allowOverride: !1
    })), c.geometry.deleteAttribute("normal"), Object.defineProperty(c.material, "map", { get: function() {
      return this.uniforms.t2D.value;
    } }), s.update(c)), c.material.uniforms.t2D.value = A, c.material.uniforms.backgroundIntensity.value = S.backgroundIntensity, c.material.toneMapped = Ze.getTransfer(A.colorSpace) !== Ws, A.matrixAutoUpdate === !0 && A.updateMatrix(), c.material.uniforms.uvTransform.value.copy(A.matrix), (u !== A || d !== A.version || p !== e.toneMapping) && (c.material.needsUpdate = !0, u = A, d = A.version, p = e.toneMapping), c.layers.enableAll(), v.unshift(c, c.geometry, c.material, 0, 0, null));
  }
  function f(v, S) {
    v.getRGB(Us, ml(e)), i.buffers.color.setClear(Us.r, Us.g, Us.b, S, o);
  }
  function y() {
    h !== void 0 && (h.geometry.dispose(), h.material.dispose(), h = void 0), c !== void 0 && (c.geometry.dispose(), c.material.dispose(), c = void 0);
  }
  return {
    getClearColor: function() {
      return a;
    },
    setClearColor: function(v, S = 1) {
      a.set(v), l = S, f(a, l);
    },
    getClearAlpha: function() {
      return l;
    },
    setClearAlpha: function(v) {
      l = v, f(a, l);
    },
    render: g,
    addToRenderList: m,
    dispose: y
  };
}
function Fd(e, t) {
  const n = e.getParameter(e.MAX_VERTEX_ATTRIBS), i = {}, s = d(null);
  let r = s, o = !1;
  function a(E, P, F, H, B) {
    let j = !1;
    const V = u(H, F, P);
    r !== V && (r = V, c(r.object)), j = p(E, H, F, B), j && _(E, H, F, B), B !== null && t.update(B, e.ELEMENT_ARRAY_BUFFER), (j || o) && (o = !1, S(E, P, F, H), B !== null && e.bindBuffer(e.ELEMENT_ARRAY_BUFFER, t.get(B).buffer));
  }
  function l() {
    return e.createVertexArray();
  }
  function c(E) {
    return e.bindVertexArray(E);
  }
  function h(E) {
    return e.deleteVertexArray(E);
  }
  function u(E, P, F) {
    const H = F.wireframe === !0;
    let B = i[E.id];
    B === void 0 && (B = {}, i[E.id] = B);
    let j = B[P.id];
    j === void 0 && (j = {}, B[P.id] = j);
    let V = j[H];
    return V === void 0 && (V = d(l()), j[H] = V), V;
  }
  function d(E) {
    const P = [], F = [], H = [];
    for (let B = 0; B < n; B++)
      P[B] = 0, F[B] = 0, H[B] = 0;
    return {
      geometry: null,
      program: null,
      wireframe: !1,
      newAttributes: P,
      enabledAttributes: F,
      attributeDivisors: H,
      object: E,
      attributes: {},
      index: null
    };
  }
  function p(E, P, F, H) {
    const B = r.attributes, j = P.attributes;
    let V = 0;
    const te = F.getAttributes();
    for (const W in te) if (te[W].location >= 0) {
      const ee = B[W];
      let pe = j[W];
      if (pe === void 0 && (W === "instanceMatrix" && E.instanceMatrix && (pe = E.instanceMatrix), W === "instanceColor" && E.instanceColor && (pe = E.instanceColor)), ee === void 0 || ee.attribute !== pe || pe && ee.data !== pe.data) return !0;
      V++;
    }
    return r.attributesNum !== V || r.index !== H;
  }
  function _(E, P, F, H) {
    const B = {}, j = P.attributes;
    let V = 0;
    const te = F.getAttributes();
    for (const W in te) if (te[W].location >= 0) {
      let ee = j[W];
      ee === void 0 && (W === "instanceMatrix" && E.instanceMatrix && (ee = E.instanceMatrix), W === "instanceColor" && E.instanceColor && (ee = E.instanceColor));
      const pe = {};
      pe.attribute = ee, ee && ee.data && (pe.data = ee.data), B[W] = pe, V++;
    }
    r.attributes = B, r.attributesNum = V, r.index = H;
  }
  function g() {
    const E = r.newAttributes;
    for (let P = 0, F = E.length; P < F; P++) E[P] = 0;
  }
  function m(E) {
    f(E, 0);
  }
  function f(E, P) {
    const F = r.newAttributes, H = r.enabledAttributes, B = r.attributeDivisors;
    F[E] = 1, H[E] === 0 && (e.enableVertexAttribArray(E), H[E] = 1), B[E] !== P && (e.vertexAttribDivisor(E, P), B[E] = P);
  }
  function y() {
    const E = r.newAttributes, P = r.enabledAttributes;
    for (let F = 0, H = P.length; F < H; F++) P[F] !== E[F] && (e.disableVertexAttribArray(F), P[F] = 0);
  }
  function v(E, P, F, H, B, j, V) {
    V === !0 ? e.vertexAttribIPointer(E, P, F, B, j) : e.vertexAttribPointer(E, P, F, H, B, j);
  }
  function S(E, P, F, H) {
    g();
    const B = H.attributes, j = F.getAttributes(), V = P.defaultAttributeValues;
    for (const te in j) {
      const W = j[te];
      if (W.location >= 0) {
        let ee = B[te];
        if (ee === void 0 && (te === "instanceMatrix" && E.instanceMatrix && (ee = E.instanceMatrix), te === "instanceColor" && E.instanceColor && (ee = E.instanceColor)), ee !== void 0) {
          const pe = ee.normalized, De = ee.itemSize, Ne = t.get(ee);
          if (Ne === void 0) continue;
          const Qe = Ne.buffer, Ke = Ne.type, Y = Ne.bytesPerElement, q = Ke === e.INT || Ke === e.UNSIGNED_INT || ee.gpuType === 1013;
          if (ee.isInterleavedBufferAttribute) {
            const G = ee.data, ce = G.stride, Me = ee.offset;
            if (G.isInstancedInterleavedBuffer) {
              for (let ge = 0; ge < W.locationSize; ge++) f(W.location + ge, G.meshPerAttribute);
              E.isInstancedMesh !== !0 && H._maxInstanceCount === void 0 && (H._maxInstanceCount = G.meshPerAttribute * G.count);
            } else for (let ge = 0; ge < W.locationSize; ge++) m(W.location + ge);
            e.bindBuffer(e.ARRAY_BUFFER, Qe);
            for (let ge = 0; ge < W.locationSize; ge++) v(W.location + ge, De / W.locationSize, Ke, pe, ce * Y, (Me + De / W.locationSize * ge) * Y, q);
          } else {
            if (ee.isInstancedBufferAttribute) {
              for (let G = 0; G < W.locationSize; G++) f(W.location + G, ee.meshPerAttribute);
              E.isInstancedMesh !== !0 && H._maxInstanceCount === void 0 && (H._maxInstanceCount = ee.meshPerAttribute * ee.count);
            } else for (let G = 0; G < W.locationSize; G++) m(W.location + G);
            e.bindBuffer(e.ARRAY_BUFFER, Qe);
            for (let G = 0; G < W.locationSize; G++) v(W.location + G, De / W.locationSize, Ke, pe, De * Y, De / W.locationSize * G * Y, q);
          }
        } else if (V !== void 0) {
          const pe = V[te];
          if (pe !== void 0) switch (pe.length) {
            case 2:
              e.vertexAttrib2fv(W.location, pe);
              break;
            case 3:
              e.vertexAttrib3fv(W.location, pe);
              break;
            case 4:
              e.vertexAttrib4fv(W.location, pe);
              break;
            default:
              e.vertexAttrib1fv(W.location, pe);
          }
        }
      }
    }
    y();
  }
  function A() {
    I();
    for (const E in i) {
      const P = i[E];
      for (const F in P) {
        const H = P[F];
        for (const B in H)
          h(H[B].object), delete H[B];
        delete P[F];
      }
      delete i[E];
    }
  }
  function b(E) {
    if (i[E.id] === void 0) return;
    const P = i[E.id];
    for (const F in P) {
      const H = P[F];
      for (const B in H)
        h(H[B].object), delete H[B];
      delete P[F];
    }
    delete i[E.id];
  }
  function R(E) {
    for (const P in i) {
      const F = i[P];
      if (F[E.id] === void 0) continue;
      const H = F[E.id];
      for (const B in H)
        h(H[B].object), delete H[B];
      delete F[E.id];
    }
  }
  function I() {
    M(), o = !0, r !== s && (r = s, c(r.object));
  }
  function M() {
    s.geometry = null, s.program = null, s.wireframe = !1;
  }
  return {
    setup: a,
    reset: I,
    resetDefaultState: M,
    dispose: A,
    releaseStatesOfGeometry: b,
    releaseStatesOfProgram: R,
    initAttributes: g,
    enableAttribute: m,
    disableUnusedAttributes: y
  };
}
function Bd(e, t, n) {
  let i;
  function s(c) {
    i = c;
  }
  function r(c, h) {
    e.drawArrays(i, c, h), n.update(h, i, 1);
  }
  function o(c, h, u) {
    u !== 0 && (e.drawArraysInstanced(i, c, h, u), n.update(h, i, u));
  }
  function a(c, h, u) {
    if (u === 0) return;
    t.get("WEBGL_multi_draw").multiDrawArraysWEBGL(i, c, 0, h, 0, u);
    let d = 0;
    for (let p = 0; p < u; p++) d += h[p];
    n.update(d, i, 1);
  }
  function l(c, h, u, d) {
    if (u === 0) return;
    const p = t.get("WEBGL_multi_draw");
    if (p === null) for (let _ = 0; _ < c.length; _++) o(c[_], h[_], d[_]);
    else {
      p.multiDrawArraysInstancedWEBGL(i, c, 0, h, 0, d, 0, u);
      let _ = 0;
      for (let g = 0; g < u; g++) _ += h[g] * d[g];
      n.update(_, i, 1);
    }
  }
  this.setMode = s, this.render = r, this.renderInstances = o, this.renderMultiDraw = a, this.renderMultiDrawInstances = l;
}
function zd(e, t, n, i) {
  let s;
  function r() {
    if (s !== void 0) return s;
    if (t.has("EXT_texture_filter_anisotropic") === !0) {
      const R = t.get("EXT_texture_filter_anisotropic");
      s = e.getParameter(R.MAX_TEXTURE_MAX_ANISOTROPY_EXT);
    } else s = 0;
    return s;
  }
  function o(R) {
    return !(R !== 1023 && i.convert(R) !== e.getParameter(e.IMPLEMENTATION_COLOR_READ_FORMAT));
  }
  function a(R) {
    const I = R === 1016 && (t.has("EXT_color_buffer_half_float") || t.has("EXT_color_buffer_float"));
    return !(R !== 1009 && i.convert(R) !== e.getParameter(e.IMPLEMENTATION_COLOR_READ_TYPE) && R !== 1015 && !I);
  }
  function l(R) {
    if (R === "highp") {
      if (e.getShaderPrecisionFormat(e.VERTEX_SHADER, e.HIGH_FLOAT).precision > 0 && e.getShaderPrecisionFormat(e.FRAGMENT_SHADER, e.HIGH_FLOAT).precision > 0) return "highp";
      R = "mediump";
    }
    return R === "mediump" && e.getShaderPrecisionFormat(e.VERTEX_SHADER, e.MEDIUM_FLOAT).precision > 0 && e.getShaderPrecisionFormat(e.FRAGMENT_SHADER, e.MEDIUM_FLOAT).precision > 0 ? "mediump" : "lowp";
  }
  let c = n.precision !== void 0 ? n.precision : "highp";
  const h = l(c);
  h !== c && (console.warn("THREE.WebGLRenderer:", c, "not supported, using", h, "instead."), c = h);
  const u = n.logarithmicDepthBuffer === !0, d = n.reversedDepthBuffer === !0 && t.has("EXT_clip_control"), p = e.getParameter(e.MAX_TEXTURE_IMAGE_UNITS), _ = e.getParameter(e.MAX_VERTEX_TEXTURE_IMAGE_UNITS), g = e.getParameter(e.MAX_TEXTURE_SIZE), m = e.getParameter(e.MAX_CUBE_MAP_TEXTURE_SIZE), f = e.getParameter(e.MAX_VERTEX_ATTRIBS), y = e.getParameter(e.MAX_VERTEX_UNIFORM_VECTORS), v = e.getParameter(e.MAX_VARYING_VECTORS), S = e.getParameter(e.MAX_FRAGMENT_UNIFORM_VECTORS), A = _ > 0, b = e.getParameter(e.MAX_SAMPLES);
  return {
    isWebGL2: !0,
    getMaxAnisotropy: r,
    getMaxPrecision: l,
    textureFormatReadable: o,
    textureTypeReadable: a,
    precision: c,
    logarithmicDepthBuffer: u,
    reversedDepthBuffer: d,
    maxTextures: p,
    maxVertexTextures: _,
    maxTextureSize: g,
    maxCubemapSize: m,
    maxAttributes: f,
    maxVertexUniforms: y,
    maxVaryings: v,
    maxFragmentUniforms: S,
    vertexTextures: A,
    maxSamples: b
  };
}
function kd(e) {
  const t = this;
  let n = null, i = 0, s = !1, r = !1;
  const o = new Tn(), a = new qe(), l = {
    value: null,
    needsUpdate: !1
  };
  this.uniform = l, this.numPlanes = 0, this.numIntersection = 0, this.init = function(u, d) {
    const p = u.length !== 0 || d || i !== 0 || s;
    return s = d, i = u.length, p;
  }, this.beginShadows = function() {
    r = !0, h(null);
  }, this.endShadows = function() {
    r = !1;
  }, this.setGlobalState = function(u, d) {
    n = h(u, d, 0);
  }, this.setState = function(u, d, p) {
    const _ = u.clippingPlanes, g = u.clipIntersection, m = u.clipShadows, f = e.get(u);
    if (!s || _ === null || _.length === 0 || r && !m) r ? h(null) : c();
    else {
      const y = r ? 0 : i, v = y * 4;
      let S = f.clippingState || null;
      l.value = S, S = h(_, d, v, p);
      for (let A = 0; A !== v; ++A) S[A] = n[A];
      f.clippingState = S, this.numIntersection = g ? this.numPlanes : 0, this.numPlanes += y;
    }
  };
  function c() {
    l.value !== n && (l.value = n, l.needsUpdate = i > 0), t.numPlanes = i, t.numIntersection = 0;
  }
  function h(u, d, p, _) {
    const g = u !== null ? u.length : 0;
    let m = null;
    if (g !== 0) {
      if (m = l.value, _ !== !0 || m === null) {
        const f = p + g * 4, y = d.matrixWorldInverse;
        a.getNormalMatrix(y), (m === null || m.length < f) && (m = new Float32Array(f));
        for (let v = 0, S = p; v !== g; ++v, S += 4)
          o.copy(u[v]).applyMatrix4(y, a), o.normal.toArray(m, S), m[S + 3] = o.constant;
      }
      l.value = m, l.needsUpdate = !0;
    }
    return t.numPlanes = g, t.numIntersection = 0, m;
  }
}
function Hd(e) {
  let t = /* @__PURE__ */ new WeakMap();
  function n(o, a) {
    return a === 303 ? o.mapping = 301 : a === 304 && (o.mapping = 302), o;
  }
  function i(o) {
    if (o && o.isTexture) {
      const a = o.mapping;
      if (a === 303 || a === 304) if (t.has(o)) {
        const l = t.get(o).texture;
        return n(l, o.mapping);
      } else {
        const l = o.image;
        if (l && l.height > 0) {
          const c = new $h(l.height);
          return c.fromEquirectangularTexture(e, o), t.set(o, c), o.addEventListener("dispose", s), n(c.texture, o.mapping);
        } else return null;
      }
    }
    return o;
  }
  function s(o) {
    const a = o.target;
    a.removeEventListener("dispose", s);
    const l = t.get(a);
    l !== void 0 && (t.delete(a), l.dispose());
  }
  function r() {
    t = /* @__PURE__ */ new WeakMap();
  }
  return {
    get: i,
    dispose: r
  };
}
var ci = 4, fa = [
  0.125,
  0.215,
  0.35,
  0.446,
  0.526,
  0.582
], Bn = 20, Nr = /* @__PURE__ */ new Js(), pa = /* @__PURE__ */ new Be(), Ur = null, Or = 0, Fr = 0, Br = !1, Fn = (1 + Math.sqrt(5)) / 2, ri = 1 / Fn, ma = [
  /* @__PURE__ */ new C(-Fn, ri, 0),
  /* @__PURE__ */ new C(Fn, ri, 0),
  /* @__PURE__ */ new C(-ri, 0, Fn),
  /* @__PURE__ */ new C(ri, 0, Fn),
  /* @__PURE__ */ new C(0, Fn, -ri),
  /* @__PURE__ */ new C(0, Fn, ri),
  /* @__PURE__ */ new C(-1, 1, -1),
  /* @__PURE__ */ new C(1, 1, -1),
  /* @__PURE__ */ new C(-1, 1, 1),
  /* @__PURE__ */ new C(1, 1, 1)
], Vd = /* @__PURE__ */ new C(), ga = class {
  constructor(e) {
    this._renderer = e, this._pingPongRenderTarget = null, this._lodMax = 0, this._cubeSize = 0, this._lodPlanes = [], this._sizeLods = [], this._sigmas = [], this._blurMaterial = null, this._cubemapMaterial = null, this._equirectMaterial = null, this._compileMaterial(this._blurMaterial);
  }
  fromScene(e, t = 0, n = 0.1, i = 100, s = {}) {
    const { size: r = 256, position: o = Vd } = s;
    Ur = this._renderer.getRenderTarget(), Or = this._renderer.getActiveCubeFace(), Fr = this._renderer.getActiveMipmapLevel(), Br = this._renderer.xr.enabled, this._renderer.xr.enabled = !1, this._setSize(r);
    const a = this._allocateTargets();
    return a.depthBuffer = !0, this._sceneToCubeUV(e, n, i, a, o), t > 0 && this._blur(a, 0, 0, t), this._applyPMREM(a), this._cleanup(a), a;
  }
  fromEquirectangular(e, t = null) {
    return this._fromTexture(e, t);
  }
  fromCubemap(e, t = null) {
    return this._fromTexture(e, t);
  }
  compileCubemapShader() {
    this._cubemapMaterial === null && (this._cubemapMaterial = xa(), this._compileMaterial(this._cubemapMaterial));
  }
  compileEquirectangularShader() {
    this._equirectMaterial === null && (this._equirectMaterial = va(), this._compileMaterial(this._equirectMaterial));
  }
  dispose() {
    this._dispose(), this._cubemapMaterial !== null && this._cubemapMaterial.dispose(), this._equirectMaterial !== null && this._equirectMaterial.dispose();
  }
  _setSize(e) {
    this._lodMax = Math.floor(Math.log2(e)), this._cubeSize = Math.pow(2, this._lodMax);
  }
  _dispose() {
    this._blurMaterial !== null && this._blurMaterial.dispose(), this._pingPongRenderTarget !== null && this._pingPongRenderTarget.dispose();
    for (let e = 0; e < this._lodPlanes.length; e++) this._lodPlanes[e].dispose();
  }
  _cleanup(e) {
    this._renderer.setRenderTarget(Ur, Or, Fr), this._renderer.xr.enabled = Br, e.scissorTest = !1, Os(e, 0, 0, e.width, e.height);
  }
  _fromTexture(e, t) {
    e.mapping === 301 || e.mapping === 302 ? this._setSize(e.image.length === 0 ? 16 : e.image[0].width || e.image[0].image.width) : this._setSize(e.image.width / 4), Ur = this._renderer.getRenderTarget(), Or = this._renderer.getActiveCubeFace(), Fr = this._renderer.getActiveMipmapLevel(), Br = this._renderer.xr.enabled, this._renderer.xr.enabled = !1;
    const n = t || this._allocateTargets();
    return this._textureToCubeUV(e, n), this._applyPMREM(n), this._cleanup(n), n;
  }
  _allocateTargets() {
    const e = 3 * Math.max(this._cubeSize, 112), t = 4 * this._cubeSize, n = {
      magFilter: gn,
      minFilter: gn,
      generateMipmaps: !1,
      type: io,
      format: kn,
      colorSpace: Ut,
      depthBuffer: !1
    }, i = _a(e, t, n);
    if (this._pingPongRenderTarget === null || this._pingPongRenderTarget.width !== e || this._pingPongRenderTarget.height !== t) {
      this._pingPongRenderTarget !== null && this._dispose(), this._pingPongRenderTarget = _a(e, t, n);
      const { _lodMax: s } = this;
      ({ sizeLods: this._sizeLods, lodPlanes: this._lodPlanes, sigmas: this._sigmas } = Gd(s)), this._blurMaterial = Wd(s, e, t);
    }
    return i;
  }
  _compileMaterial(e) {
    const t = new Tt(this._lodPlanes[0], e);
    this._renderer.compile(t, Nr);
  }
  _sceneToCubeUV(e, t, n, i, s) {
    const r = new Ct(90, 1, t, n), o = [
      1,
      -1,
      1,
      1,
      1,
      1
    ], a = [
      1,
      1,
      1,
      -1,
      -1,
      -1
    ], l = this._renderer, c = l.autoClear, h = l.toneMapping;
    l.getClearColor(pa), l.toneMapping = 0, l.autoClear = !1, l.state.buffers.depth.getReversed() && (l.setRenderTarget(i), l.clearDepth(), l.setRenderTarget(null));
    const u = new zn({
      name: "PMREM.Background",
      side: 1,
      depthWrite: !1,
      depthTest: !1
    }), d = new Tt(new is(), u);
    let p = !1;
    const _ = e.background;
    _ ? _.isColor && (u.color.copy(_), e.background = null, p = !0) : (u.color.copy(pa), p = !0);
    for (let g = 0; g < 6; g++) {
      const m = g % 3;
      m === 0 ? (r.up.set(0, o[g], 0), r.position.set(s.x, s.y, s.z), r.lookAt(s.x + a[g], s.y, s.z)) : m === 1 ? (r.up.set(0, 0, o[g]), r.position.set(s.x, s.y, s.z), r.lookAt(s.x, s.y + a[g], s.z)) : (r.up.set(0, o[g], 0), r.position.set(s.x, s.y, s.z), r.lookAt(s.x, s.y, s.z + a[g]));
      const f = this._cubeSize;
      Os(i, m * f, g > 2 ? f : 0, f, f), l.setRenderTarget(i), p && l.render(d, r), l.render(e, r);
    }
    d.geometry.dispose(), d.material.dispose(), l.toneMapping = h, l.autoClear = c, e.background = _;
  }
  _textureToCubeUV(e, t) {
    const n = this._renderer, i = e.mapping === 301 || e.mapping === 302;
    i ? (this._cubemapMaterial === null && (this._cubemapMaterial = xa()), this._cubemapMaterial.uniforms.flipEnvMap.value = e.isRenderTargetTexture === !1 ? -1 : 1) : this._equirectMaterial === null && (this._equirectMaterial = va());
    const s = i ? this._cubemapMaterial : this._equirectMaterial, r = new Tt(this._lodPlanes[0], s), o = s.uniforms;
    o.envMap.value = e;
    const a = this._cubeSize;
    Os(t, 0, 0, 3 * a, 2 * a), n.setRenderTarget(t), n.render(r, Nr);
  }
  _applyPMREM(e) {
    const t = this._renderer, n = t.autoClear;
    t.autoClear = !1;
    const i = this._lodPlanes.length;
    for (let s = 1; s < i; s++) {
      const r = Math.sqrt(this._sigmas[s] * this._sigmas[s] - this._sigmas[s - 1] * this._sigmas[s - 1]), o = ma[(i - s - 1) % ma.length];
      this._blur(e, s - 1, s, r, o);
    }
    t.autoClear = n;
  }
  _blur(e, t, n, i, s) {
    const r = this._pingPongRenderTarget;
    this._halfBlur(e, r, t, n, i, "latitudinal", s), this._halfBlur(r, e, n, n, i, "longitudinal", s);
  }
  _halfBlur(e, t, n, i, s, r, o) {
    const a = this._renderer, l = this._blurMaterial;
    r !== "latitudinal" && r !== "longitudinal" && console.error("blur direction must be either latitudinal or longitudinal!");
    const c = 3, h = new Tt(this._lodPlanes[i], l), u = l.uniforms, d = this._sizeLods[n] - 1, p = isFinite(s) ? Math.PI / (2 * d) : 2 * Math.PI / (2 * Bn - 1), _ = s / p, g = isFinite(s) ? 1 + Math.floor(c * _) : Bn;
    g > Bn && console.warn(`sigmaRadians, ${s}, is too large and will clip, as it requested ${g} samples when the maximum is set to ${Bn}`);
    const m = [];
    let f = 0;
    for (let S = 0; S < Bn; ++S) {
      const A = S / _, b = Math.exp(-A * A / 2);
      m.push(b), S === 0 ? f += b : S < g && (f += 2 * b);
    }
    for (let S = 0; S < m.length; S++) m[S] = m[S] / f;
    u.envMap.value = e.texture, u.samples.value = g, u.weights.value = m, u.latitudinal.value = r === "latitudinal", o && (u.poleAxis.value = o);
    const { _lodMax: y } = this;
    u.dTheta.value = p, u.mipInt.value = y - n;
    const v = this._sizeLods[i];
    Os(t, 3 * v * (i > y - ci ? i - y + ci : 0), 4 * (this._cubeSize - v), 3 * v, 2 * v), a.setRenderTarget(t), a.render(h, Nr);
  }
};
function Gd(e) {
  const t = [], n = [], i = [];
  let s = e;
  const r = e - ci + 1 + fa.length;
  for (let o = 0; o < r; o++) {
    const a = Math.pow(2, s);
    n.push(a);
    let l = 1 / a;
    o > e - ci ? l = fa[o - e + ci - 1] : o === 0 && (l = 0), i.push(l);
    const c = 1 / (a - 2), h = -c, u = 1 + c, d = [
      h,
      h,
      u,
      h,
      u,
      u,
      h,
      h,
      u,
      u,
      h,
      u
    ], p = 6, _ = 6, g = 3, m = 2, f = 1, y = new Float32Array(g * _ * p), v = new Float32Array(m * _ * p), S = new Float32Array(f * _ * p);
    for (let b = 0; b < p; b++) {
      const R = b % 3 * 2 / 3 - 1, I = b > 2 ? 0 : -1, M = [
        R,
        I,
        0,
        R + 2 / 3,
        I,
        0,
        R + 2 / 3,
        I + 1,
        0,
        R,
        I,
        0,
        R + 2 / 3,
        I + 1,
        0,
        R,
        I + 1,
        0
      ];
      y.set(M, g * _ * b), v.set(d, m * _ * b);
      const E = [
        b,
        b,
        b,
        b,
        b,
        b
      ];
      S.set(E, f * _ * b);
    }
    const A = new Lt();
    A.setAttribute("position", new wt(y, g)), A.setAttribute("uv", new wt(v, m)), A.setAttribute("faceIndex", new wt(S, f)), t.push(A), s > ci && s--;
  }
  return {
    lodPlanes: t,
    sizeLods: n,
    sigmas: i
  };
}
function _a(e, t, n) {
  const i = new Hn(e, t, n);
  return i.texture.mapping = 306, i.texture.name = "PMREM.cubeUv", i.scissorTest = !0, i;
}
function Os(e, t, n, i, s) {
  e.viewport.set(t, n, i, s), e.scissor.set(t, n, i, s);
}
function Wd(e, t, n) {
  const i = new Float32Array(Bn), s = new C(0, 1, 0);
  return new wn({
    name: "SphericalGaussianBlur",
    defines: {
      n: Bn,
      CUBEUV_TEXEL_WIDTH: 1 / t,
      CUBEUV_TEXEL_HEIGHT: 1 / n,
      CUBEUV_MAX_MIP: `${e}.0`
    },
    uniforms: {
      envMap: { value: null },
      samples: { value: 1 },
      weights: { value: i },
      latitudinal: { value: !1 },
      dTheta: { value: 0 },
      mipInt: { value: 0 },
      poleAxis: { value: s }
    },
    vertexShader: po(),
    fragmentShader: `

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform int samples;
			uniform float weights[ n ];
			uniform bool latitudinal;
			uniform float dTheta;
			uniform float mipInt;
			uniform vec3 poleAxis;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			vec3 getSample( float theta, vec3 axis ) {

				float cosTheta = cos( theta );
				// Rodrigues' axis-angle rotation
				vec3 sampleDirection = vOutputDirection * cosTheta
					+ cross( axis, vOutputDirection ) * sin( theta )
					+ axis * dot( axis, vOutputDirection ) * ( 1.0 - cosTheta );

				return bilinearCubeUV( envMap, sampleDirection, mipInt );

			}

			void main() {

				vec3 axis = latitudinal ? poleAxis : cross( poleAxis, vOutputDirection );

				if ( all( equal( axis, vec3( 0.0 ) ) ) ) {

					axis = vec3( vOutputDirection.z, 0.0, - vOutputDirection.x );

				}

				axis = normalize( axis );

				gl_FragColor = vec4( 0.0, 0.0, 0.0, 1.0 );
				gl_FragColor.rgb += weights[ 0 ] * getSample( 0.0, axis );

				for ( int i = 1; i < n; i++ ) {

					if ( i >= samples ) {

						break;

					}

					float theta = dTheta * float( i );
					gl_FragColor.rgb += weights[ i ] * getSample( -1.0 * theta, axis );
					gl_FragColor.rgb += weights[ i ] * getSample( theta, axis );

				}

			}
		`,
    blending: 0,
    depthTest: !1,
    depthWrite: !1
  });
}
function va() {
  return new wn({
    name: "EquirectangularToCubeUV",
    uniforms: { envMap: { value: null } },
    vertexShader: po(),
    fragmentShader: `

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;

			#include <common>

			void main() {

				vec3 outputDirection = normalize( vOutputDirection );
				vec2 uv = equirectUv( outputDirection );

				gl_FragColor = vec4( texture2D ( envMap, uv ).rgb, 1.0 );

			}
		`,
    blending: 0,
    depthTest: !1,
    depthWrite: !1
  });
}
function xa() {
  return new wn({
    name: "CubemapToCubeUV",
    uniforms: {
      envMap: { value: null },
      flipEnvMap: { value: -1 }
    },
    vertexShader: po(),
    fragmentShader: `

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,
    blending: 0,
    depthTest: !1,
    depthWrite: !1
  });
}
function po() {
  return `

		precision mediump float;
		precision mediump int;

		attribute float faceIndex;

		varying vec3 vOutputDirection;

		// RH coordinate system; PMREM face-indexing convention
		vec3 getDirection( vec2 uv, float face ) {

			uv = 2.0 * uv - 1.0;

			vec3 direction = vec3( uv, 1.0 );

			if ( face == 0.0 ) {

				direction = direction.zyx; // ( 1, v, u ) pos x

			} else if ( face == 1.0 ) {

				direction = direction.xzy;
				direction.xz *= -1.0; // ( -u, 1, -v ) pos y

			} else if ( face == 2.0 ) {

				direction.x *= -1.0; // ( -u, v, 1 ) pos z

			} else if ( face == 3.0 ) {

				direction = direction.zyx;
				direction.xz *= -1.0; // ( -1, v, -u ) neg x

			} else if ( face == 4.0 ) {

				direction = direction.xzy;
				direction.xy *= -1.0; // ( -u, -1, v ) neg y

			} else if ( face == 5.0 ) {

				direction.z *= -1.0; // ( u, v, -1 ) neg z

			}

			return direction;

		}

		void main() {

			vOutputDirection = getDirection( uv, faceIndex );
			gl_Position = vec4( position, 1.0 );

		}
	`;
}
function Xd(e) {
  let t = /* @__PURE__ */ new WeakMap(), n = null;
  function i(a) {
    if (a && a.isTexture) {
      const l = a.mapping, c = l === 303 || l === 304, h = l === 301 || l === 302;
      if (c || h) {
        let u = t.get(a);
        const d = u !== void 0 ? u.texture.pmremVersion : 0;
        if (a.isRenderTargetTexture && a.pmremVersion !== d)
          return n === null && (n = new ga(e)), u = c ? n.fromEquirectangular(a, u) : n.fromCubemap(a, u), u.texture.pmremVersion = a.pmremVersion, t.set(a, u), u.texture;
        if (u !== void 0) return u.texture;
        {
          const p = a.image;
          return c && p && p.height > 0 || h && p && s(p) ? (n === null && (n = new ga(e)), u = c ? n.fromEquirectangular(a) : n.fromCubemap(a), u.texture.pmremVersion = a.pmremVersion, t.set(a, u), a.addEventListener("dispose", r), u.texture) : null;
        }
      }
    }
    return a;
  }
  function s(a) {
    let l = 0;
    const c = 6;
    for (let h = 0; h < c; h++) a[h] !== void 0 && l++;
    return l === c;
  }
  function r(a) {
    const l = a.target;
    l.removeEventListener("dispose", r);
    const c = t.get(l);
    c !== void 0 && (t.delete(l), c.dispose());
  }
  function o() {
    t = /* @__PURE__ */ new WeakMap(), n !== null && (n.dispose(), n = null);
  }
  return {
    get: i,
    dispose: o
  };
}
function Yd(e) {
  const t = {};
  function n(i) {
    if (t[i] !== void 0) return t[i];
    let s;
    switch (i) {
      case "WEBGL_depth_texture":
        s = e.getExtension("WEBGL_depth_texture") || e.getExtension("MOZ_WEBGL_depth_texture") || e.getExtension("WEBKIT_WEBGL_depth_texture");
        break;
      case "EXT_texture_filter_anisotropic":
        s = e.getExtension("EXT_texture_filter_anisotropic") || e.getExtension("MOZ_EXT_texture_filter_anisotropic") || e.getExtension("WEBKIT_EXT_texture_filter_anisotropic");
        break;
      case "WEBGL_compressed_texture_s3tc":
        s = e.getExtension("WEBGL_compressed_texture_s3tc") || e.getExtension("MOZ_WEBGL_compressed_texture_s3tc") || e.getExtension("WEBKIT_WEBGL_compressed_texture_s3tc");
        break;
      case "WEBGL_compressed_texture_pvrtc":
        s = e.getExtension("WEBGL_compressed_texture_pvrtc") || e.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc");
        break;
      default:
        s = e.getExtension(i);
    }
    return t[i] = s, s;
  }
  return {
    has: function(i) {
      return n(i) !== null;
    },
    init: function() {
      n("EXT_color_buffer_float"), n("WEBGL_clip_cull_distance"), n("OES_texture_float_linear"), n("EXT_color_buffer_half_float"), n("WEBGL_multisampled_render_to_texture"), n("WEBGL_render_shared_exponent");
    },
    get: function(i) {
      const s = n(i);
      return s === null && Ki("THREE.WebGLRenderer: " + i + " extension not supported."), s;
    }
  };
}
function qd(e, t, n, i) {
  const s = {}, r = /* @__PURE__ */ new WeakMap();
  function o(u) {
    const d = u.target;
    d.index !== null && t.remove(d.index);
    for (const _ in d.attributes) t.remove(d.attributes[_]);
    d.removeEventListener("dispose", o), delete s[d.id];
    const p = r.get(d);
    p && (t.remove(p), r.delete(d)), i.releaseStatesOfGeometry(d), d.isInstancedBufferGeometry === !0 && delete d._maxInstanceCount, n.memory.geometries--;
  }
  function a(u, d) {
    return s[d.id] === !0 || (d.addEventListener("dispose", o), s[d.id] = !0, n.memory.geometries++), d;
  }
  function l(u) {
    const d = u.attributes;
    for (const p in d) t.update(d[p], e.ARRAY_BUFFER);
  }
  function c(u) {
    const d = [], p = u.index, _ = u.attributes.position;
    let g = 0;
    if (p !== null) {
      const y = p.array;
      g = p.version;
      for (let v = 0, S = y.length; v < S; v += 3) {
        const A = y[v + 0], b = y[v + 1], R = y[v + 2];
        d.push(A, b, b, R, R, A);
      }
    } else if (_ !== void 0) {
      const y = _.array;
      g = _.version;
      for (let v = 0, S = y.length / 3 - 1; v < S; v += 3) {
        const A = v + 0, b = v + 1, R = v + 2;
        d.push(A, b, b, R, R, A);
      }
    } else return;
    const m = new (rl(d) ? dl : ul)(d, 1);
    m.version = g;
    const f = r.get(u);
    f && t.remove(f), r.set(u, m);
  }
  function h(u) {
    const d = r.get(u);
    if (d) {
      const p = u.index;
      p !== null && d.version < p.version && c(u);
    } else c(u);
    return r.get(u);
  }
  return {
    get: a,
    update: l,
    getWireframeAttribute: h
  };
}
function Kd(e, t, n) {
  let i;
  function s(d) {
    i = d;
  }
  let r, o;
  function a(d) {
    r = d.type, o = d.bytesPerElement;
  }
  function l(d, p) {
    e.drawElements(i, p, r, d * o), n.update(p, i, 1);
  }
  function c(d, p, _) {
    _ !== 0 && (e.drawElementsInstanced(i, p, r, d * o, _), n.update(p, i, _));
  }
  function h(d, p, _) {
    if (_ === 0) return;
    t.get("WEBGL_multi_draw").multiDrawElementsWEBGL(i, p, 0, r, d, 0, _);
    let g = 0;
    for (let m = 0; m < _; m++) g += p[m];
    n.update(g, i, 1);
  }
  function u(d, p, _, g) {
    if (_ === 0) return;
    const m = t.get("WEBGL_multi_draw");
    if (m === null) for (let f = 0; f < d.length; f++) c(d[f] / o, p[f], g[f]);
    else {
      m.multiDrawElementsInstancedWEBGL(i, p, 0, r, d, 0, g, 0, _);
      let f = 0;
      for (let y = 0; y < _; y++) f += p[y] * g[y];
      n.update(f, i, 1);
    }
  }
  this.setMode = s, this.setIndex = a, this.render = l, this.renderInstances = c, this.renderMultiDraw = h, this.renderMultiDrawInstances = u;
}
function jd(e) {
  const t = {
    geometries: 0,
    textures: 0
  }, n = {
    frame: 0,
    calls: 0,
    triangles: 0,
    points: 0,
    lines: 0
  };
  function i(r, o, a) {
    switch (n.calls++, o) {
      case e.TRIANGLES:
        n.triangles += a * (r / 3);
        break;
      case e.LINES:
        n.lines += a * (r / 2);
        break;
      case e.LINE_STRIP:
        n.lines += a * (r - 1);
        break;
      case e.LINE_LOOP:
        n.lines += a * r;
        break;
      case e.POINTS:
        n.points += a * r;
        break;
      default:
        console.error("THREE.WebGLInfo: Unknown draw mode:", o);
        break;
    }
  }
  function s() {
    n.calls = 0, n.triangles = 0, n.points = 0, n.lines = 0;
  }
  return {
    memory: t,
    render: n,
    programs: null,
    autoReset: !0,
    reset: s,
    update: i
  };
}
function Zd(e, t, n) {
  const i = /* @__PURE__ */ new WeakMap(), s = new tt();
  function r(o, a, l) {
    const c = o.morphTargetInfluences, h = a.morphAttributes.position || a.morphAttributes.normal || a.morphAttributes.color, u = h !== void 0 ? h.length : 0;
    let d = i.get(a);
    if (d === void 0 || d.count !== u) {
      let M = function() {
        R.dispose(), i.delete(a), a.removeEventListener("dispose", M);
      };
      d !== void 0 && d.texture.dispose();
      const p = a.morphAttributes.position !== void 0, _ = a.morphAttributes.normal !== void 0, g = a.morphAttributes.color !== void 0, m = a.morphAttributes.position || [], f = a.morphAttributes.normal || [], y = a.morphAttributes.color || [];
      let v = 0;
      p === !0 && (v = 1), _ === !0 && (v = 2), g === !0 && (v = 3);
      let S = a.attributes.position.count * v, A = 1;
      S > t.maxTextureSize && (A = Math.ceil(S / t.maxTextureSize), S = t.maxTextureSize);
      const b = new Float32Array(S * A * 4 * u), R = new al(b, S, A, u);
      R.type = ts, R.needsUpdate = !0;
      const I = v * 4;
      for (let E = 0; E < u; E++) {
        const P = m[E], F = f[E], H = y[E], B = S * A * 4 * E;
        for (let j = 0; j < P.count; j++) {
          const V = j * I;
          p === !0 && (s.fromBufferAttribute(P, j), b[B + V + 0] = s.x, b[B + V + 1] = s.y, b[B + V + 2] = s.z, b[B + V + 3] = 0), _ === !0 && (s.fromBufferAttribute(F, j), b[B + V + 4] = s.x, b[B + V + 5] = s.y, b[B + V + 6] = s.z, b[B + V + 7] = 0), g === !0 && (s.fromBufferAttribute(H, j), b[B + V + 8] = s.x, b[B + V + 9] = s.y, b[B + V + 10] = s.z, b[B + V + 11] = H.itemSize === 4 ? s.w : 1);
        }
      }
      d = {
        count: u,
        texture: R,
        size: new re(S, A)
      }, i.set(a, d), a.addEventListener("dispose", M);
    }
    if (o.isInstancedMesh === !0 && o.morphTexture !== null) l.getUniforms().setValue(e, "morphTexture", o.morphTexture, n);
    else {
      let p = 0;
      for (let g = 0; g < c.length; g++) p += c[g];
      const _ = a.morphTargetsRelative ? 1 : 1 - p;
      l.getUniforms().setValue(e, "morphTargetBaseInfluence", _), l.getUniforms().setValue(e, "morphTargetInfluences", c);
    }
    l.getUniforms().setValue(e, "morphTargetsTexture", d.texture, n), l.getUniforms().setValue(e, "morphTargetsTextureSize", d.size);
  }
  return { update: r };
}
function Jd(e, t, n, i) {
  let s = /* @__PURE__ */ new WeakMap();
  function r(l) {
    const c = i.render.frame, h = l.geometry, u = t.get(l, h);
    if (s.get(u) !== c && (t.update(u), s.set(u, c)), l.isInstancedMesh && (l.hasEventListener("dispose", a) === !1 && l.addEventListener("dispose", a), s.get(l) !== c && (n.update(l.instanceMatrix, e.ARRAY_BUFFER), l.instanceColor !== null && n.update(l.instanceColor, e.ARRAY_BUFFER), s.set(l, c))), l.isSkinnedMesh) {
      const d = l.skeleton;
      s.get(d) !== c && (d.update(), s.set(d, c));
    }
    return u;
  }
  function o() {
    s = /* @__PURE__ */ new WeakMap();
  }
  function a(l) {
    const c = l.target;
    c.removeEventListener("dispose", a), n.remove(c.instanceMatrix), c.instanceColor !== null && n.remove(c.instanceColor);
  }
  return {
    update: r,
    dispose: o
  };
}
var Yl = /* @__PURE__ */ new Pt(), ya = /* @__PURE__ */ new Sl(1, 1), ql = /* @__PURE__ */ new al(), Kl = /* @__PURE__ */ new Uh(), jl = /* @__PURE__ */ new _l(), Ma = [], Sa = [], Ea = new Float32Array(16), Ta = new Float32Array(9), ba = new Float32Array(4);
function Ti(e, t, n) {
  const i = e[0];
  if (i <= 0 || i > 0) return e;
  const s = t * n;
  let r = Ma[s];
  if (r === void 0 && (r = new Float32Array(s), Ma[s] = r), t !== 0) {
    i.toArray(r, 0);
    for (let o = 1, a = 0; o !== t; ++o)
      a += n, e[o].toArray(r, a);
  }
  return r;
}
function gt(e, t) {
  if (e.length !== t.length) return !1;
  for (let n = 0, i = e.length; n < i; n++) if (e[n] !== t[n]) return !1;
  return !0;
}
function _t(e, t) {
  for (let n = 0, i = t.length; n < i; n++) e[n] = t[n];
}
function $s(e, t) {
  let n = Sa[t];
  n === void 0 && (n = new Int32Array(t), Sa[t] = n);
  for (let i = 0; i !== t; ++i) n[i] = e.allocateTextureUnit();
  return n;
}
function $d(e, t) {
  const n = this.cache;
  n[0] !== t && (e.uniform1f(this.addr, t), n[0] = t);
}
function Qd(e, t) {
  const n = this.cache;
  if (t.x !== void 0)
    (n[0] !== t.x || n[1] !== t.y) && (e.uniform2f(this.addr, t.x, t.y), n[0] = t.x, n[1] = t.y);
  else {
    if (gt(n, t)) return;
    e.uniform2fv(this.addr, t), _t(n, t);
  }
}
function ef(e, t) {
  const n = this.cache;
  if (t.x !== void 0)
    (n[0] !== t.x || n[1] !== t.y || n[2] !== t.z) && (e.uniform3f(this.addr, t.x, t.y, t.z), n[0] = t.x, n[1] = t.y, n[2] = t.z);
  else if (t.r !== void 0)
    (n[0] !== t.r || n[1] !== t.g || n[2] !== t.b) && (e.uniform3f(this.addr, t.r, t.g, t.b), n[0] = t.r, n[1] = t.g, n[2] = t.b);
  else {
    if (gt(n, t)) return;
    e.uniform3fv(this.addr, t), _t(n, t);
  }
}
function tf(e, t) {
  const n = this.cache;
  if (t.x !== void 0)
    (n[0] !== t.x || n[1] !== t.y || n[2] !== t.z || n[3] !== t.w) && (e.uniform4f(this.addr, t.x, t.y, t.z, t.w), n[0] = t.x, n[1] = t.y, n[2] = t.z, n[3] = t.w);
  else {
    if (gt(n, t)) return;
    e.uniform4fv(this.addr, t), _t(n, t);
  }
}
function nf(e, t) {
  const n = this.cache, i = t.elements;
  if (i === void 0) {
    if (gt(n, t)) return;
    e.uniformMatrix2fv(this.addr, !1, t), _t(n, t);
  } else {
    if (gt(n, i)) return;
    ba.set(i), e.uniformMatrix2fv(this.addr, !1, ba), _t(n, i);
  }
}
function sf(e, t) {
  const n = this.cache, i = t.elements;
  if (i === void 0) {
    if (gt(n, t)) return;
    e.uniformMatrix3fv(this.addr, !1, t), _t(n, t);
  } else {
    if (gt(n, i)) return;
    Ta.set(i), e.uniformMatrix3fv(this.addr, !1, Ta), _t(n, i);
  }
}
function rf(e, t) {
  const n = this.cache, i = t.elements;
  if (i === void 0) {
    if (gt(n, t)) return;
    e.uniformMatrix4fv(this.addr, !1, t), _t(n, t);
  } else {
    if (gt(n, i)) return;
    Ea.set(i), e.uniformMatrix4fv(this.addr, !1, Ea), _t(n, i);
  }
}
function of(e, t) {
  const n = this.cache;
  n[0] !== t && (e.uniform1i(this.addr, t), n[0] = t);
}
function af(e, t) {
  const n = this.cache;
  if (t.x !== void 0)
    (n[0] !== t.x || n[1] !== t.y) && (e.uniform2i(this.addr, t.x, t.y), n[0] = t.x, n[1] = t.y);
  else {
    if (gt(n, t)) return;
    e.uniform2iv(this.addr, t), _t(n, t);
  }
}
function lf(e, t) {
  const n = this.cache;
  if (t.x !== void 0)
    (n[0] !== t.x || n[1] !== t.y || n[2] !== t.z) && (e.uniform3i(this.addr, t.x, t.y, t.z), n[0] = t.x, n[1] = t.y, n[2] = t.z);
  else {
    if (gt(n, t)) return;
    e.uniform3iv(this.addr, t), _t(n, t);
  }
}
function cf(e, t) {
  const n = this.cache;
  if (t.x !== void 0)
    (n[0] !== t.x || n[1] !== t.y || n[2] !== t.z || n[3] !== t.w) && (e.uniform4i(this.addr, t.x, t.y, t.z, t.w), n[0] = t.x, n[1] = t.y, n[2] = t.z, n[3] = t.w);
  else {
    if (gt(n, t)) return;
    e.uniform4iv(this.addr, t), _t(n, t);
  }
}
function hf(e, t) {
  const n = this.cache;
  n[0] !== t && (e.uniform1ui(this.addr, t), n[0] = t);
}
function uf(e, t) {
  const n = this.cache;
  if (t.x !== void 0)
    (n[0] !== t.x || n[1] !== t.y) && (e.uniform2ui(this.addr, t.x, t.y), n[0] = t.x, n[1] = t.y);
  else {
    if (gt(n, t)) return;
    e.uniform2uiv(this.addr, t), _t(n, t);
  }
}
function df(e, t) {
  const n = this.cache;
  if (t.x !== void 0)
    (n[0] !== t.x || n[1] !== t.y || n[2] !== t.z) && (e.uniform3ui(this.addr, t.x, t.y, t.z), n[0] = t.x, n[1] = t.y, n[2] = t.z);
  else {
    if (gt(n, t)) return;
    e.uniform3uiv(this.addr, t), _t(n, t);
  }
}
function ff(e, t) {
  const n = this.cache;
  if (t.x !== void 0)
    (n[0] !== t.x || n[1] !== t.y || n[2] !== t.z || n[3] !== t.w) && (e.uniform4ui(this.addr, t.x, t.y, t.z, t.w), n[0] = t.x, n[1] = t.y, n[2] = t.z, n[3] = t.w);
  else {
    if (gt(n, t)) return;
    e.uniform4uiv(this.addr, t), _t(n, t);
  }
}
function pf(e, t, n) {
  const i = this.cache, s = n.allocateTextureUnit();
  i[0] !== s && (e.uniform1i(this.addr, s), i[0] = s);
  let r;
  this.type === e.SAMPLER_2D_SHADOW ? (ya.compareFunction = 515, r = ya) : r = Yl, n.setTexture2D(t || r, s);
}
function mf(e, t, n) {
  const i = this.cache, s = n.allocateTextureUnit();
  i[0] !== s && (e.uniform1i(this.addr, s), i[0] = s), n.setTexture3D(t || Kl, s);
}
function gf(e, t, n) {
  const i = this.cache, s = n.allocateTextureUnit();
  i[0] !== s && (e.uniform1i(this.addr, s), i[0] = s), n.setTextureCube(t || jl, s);
}
function _f(e, t, n) {
  const i = this.cache, s = n.allocateTextureUnit();
  i[0] !== s && (e.uniform1i(this.addr, s), i[0] = s), n.setTexture2DArray(t || ql, s);
}
function vf(e) {
  switch (e) {
    case 5126:
      return $d;
    case 35664:
      return Qd;
    case 35665:
      return ef;
    case 35666:
      return tf;
    case 35674:
      return nf;
    case 35675:
      return sf;
    case 35676:
      return rf;
    case 5124:
    case 35670:
      return of;
    case 35667:
    case 35671:
      return af;
    case 35668:
    case 35672:
      return lf;
    case 35669:
    case 35673:
      return cf;
    case 5125:
      return hf;
    case 36294:
      return uf;
    case 36295:
      return df;
    case 36296:
      return ff;
    case 35678:
    case 36198:
    case 36298:
    case 36306:
    case 35682:
      return pf;
    case 35679:
    case 36299:
    case 36307:
      return mf;
    case 35680:
    case 36300:
    case 36308:
    case 36293:
      return gf;
    case 36289:
    case 36303:
    case 36311:
    case 36292:
      return _f;
  }
}
function xf(e, t) {
  e.uniform1fv(this.addr, t);
}
function yf(e, t) {
  const n = Ti(t, this.size, 2);
  e.uniform2fv(this.addr, n);
}
function Mf(e, t) {
  const n = Ti(t, this.size, 3);
  e.uniform3fv(this.addr, n);
}
function Sf(e, t) {
  const n = Ti(t, this.size, 4);
  e.uniform4fv(this.addr, n);
}
function Ef(e, t) {
  const n = Ti(t, this.size, 4);
  e.uniformMatrix2fv(this.addr, !1, n);
}
function Tf(e, t) {
  const n = Ti(t, this.size, 9);
  e.uniformMatrix3fv(this.addr, !1, n);
}
function bf(e, t) {
  const n = Ti(t, this.size, 16);
  e.uniformMatrix4fv(this.addr, !1, n);
}
function Af(e, t) {
  e.uniform1iv(this.addr, t);
}
function wf(e, t) {
  e.uniform2iv(this.addr, t);
}
function Rf(e, t) {
  e.uniform3iv(this.addr, t);
}
function Cf(e, t) {
  e.uniform4iv(this.addr, t);
}
function Pf(e, t) {
  e.uniform1uiv(this.addr, t);
}
function Lf(e, t) {
  e.uniform2uiv(this.addr, t);
}
function If(e, t) {
  e.uniform3uiv(this.addr, t);
}
function Df(e, t) {
  e.uniform4uiv(this.addr, t);
}
function Nf(e, t, n) {
  const i = this.cache, s = t.length, r = $s(n, s);
  gt(i, r) || (e.uniform1iv(this.addr, r), _t(i, r));
  for (let o = 0; o !== s; ++o) n.setTexture2D(t[o] || Yl, r[o]);
}
function Uf(e, t, n) {
  const i = this.cache, s = t.length, r = $s(n, s);
  gt(i, r) || (e.uniform1iv(this.addr, r), _t(i, r));
  for (let o = 0; o !== s; ++o) n.setTexture3D(t[o] || Kl, r[o]);
}
function Of(e, t, n) {
  const i = this.cache, s = t.length, r = $s(n, s);
  gt(i, r) || (e.uniform1iv(this.addr, r), _t(i, r));
  for (let o = 0; o !== s; ++o) n.setTextureCube(t[o] || jl, r[o]);
}
function Ff(e, t, n) {
  const i = this.cache, s = t.length, r = $s(n, s);
  gt(i, r) || (e.uniform1iv(this.addr, r), _t(i, r));
  for (let o = 0; o !== s; ++o) n.setTexture2DArray(t[o] || ql, r[o]);
}
function Bf(e) {
  switch (e) {
    case 5126:
      return xf;
    case 35664:
      return yf;
    case 35665:
      return Mf;
    case 35666:
      return Sf;
    case 35674:
      return Ef;
    case 35675:
      return Tf;
    case 35676:
      return bf;
    case 5124:
    case 35670:
      return Af;
    case 35667:
    case 35671:
      return wf;
    case 35668:
    case 35672:
      return Rf;
    case 35669:
    case 35673:
      return Cf;
    case 5125:
      return Pf;
    case 36294:
      return Lf;
    case 36295:
      return If;
    case 36296:
      return Df;
    case 35678:
    case 36198:
    case 36298:
    case 36306:
    case 35682:
      return Nf;
    case 35679:
    case 36299:
    case 36307:
      return Uf;
    case 35680:
    case 36300:
    case 36308:
    case 36293:
      return Of;
    case 36289:
    case 36303:
    case 36311:
    case 36292:
      return Ff;
  }
}
var zf = class {
  constructor(e, t, n) {
    this.id = e, this.addr = n, this.cache = [], this.type = t.type, this.setValue = vf(t.type);
  }
}, kf = class {
  constructor(e, t, n) {
    this.id = e, this.addr = n, this.cache = [], this.type = t.type, this.size = t.size, this.setValue = Bf(t.type);
  }
}, Hf = class {
  constructor(e) {
    this.id = e, this.seq = [], this.map = {};
  }
  setValue(e, t, n) {
    const i = this.seq;
    for (let s = 0, r = i.length; s !== r; ++s) {
      const o = i[s];
      o.setValue(e, t[o.id], n);
    }
  }
}, zr = /(\w+)(\])?(\[|\.)?/g;
function Aa(e, t) {
  e.seq.push(t), e.map[t.id] = t;
}
function Vf(e, t, n) {
  const i = e.name, s = i.length;
  for (zr.lastIndex = 0; ; ) {
    const r = zr.exec(i), o = zr.lastIndex;
    let a = r[1];
    const l = r[2] === "]", c = r[3];
    if (l && (a = a | 0), c === void 0 || c === "[" && o + 2 === s) {
      Aa(n, c === void 0 ? new zf(a, e, t) : new kf(a, e, t));
      break;
    } else {
      let h = n.map[a];
      h === void 0 && (h = new Hf(a), Aa(n, h)), n = h;
    }
  }
}
var Hs = class {
  constructor(e, t) {
    this.seq = [], this.map = {};
    const n = e.getProgramParameter(t, e.ACTIVE_UNIFORMS);
    for (let i = 0; i < n; ++i) {
      const s = e.getActiveUniform(t, i);
      Vf(s, e.getUniformLocation(t, s.name), this);
    }
  }
  setValue(e, t, n, i) {
    const s = this.map[t];
    s !== void 0 && s.setValue(e, n, i);
  }
  setOptional(e, t, n) {
    const i = t[n];
    i !== void 0 && this.setValue(e, n, i);
  }
  static upload(e, t, n, i) {
    for (let s = 0, r = t.length; s !== r; ++s) {
      const o = t[s], a = n[o.id];
      a.needsUpdate !== !1 && o.setValue(e, a.value, i);
    }
  }
  static seqWithValue(e, t) {
    const n = [];
    for (let i = 0, s = e.length; i !== s; ++i) {
      const r = e[i];
      r.id in t && n.push(r);
    }
    return n;
  }
};
function wa(e, t, n) {
  const i = e.createShader(t);
  return e.shaderSource(i, n), e.compileShader(i), i;
}
var Gf = 37297, Wf = 0;
function Xf(e, t) {
  const n = e.split(`
`), i = [], s = Math.max(t - 6, 0), r = Math.min(t + 6, n.length);
  for (let o = s; o < r; o++) {
    const a = o + 1;
    i.push(`${a === t ? ">" : " "} ${a}: ${n[o]}`);
  }
  return i.join(`
`);
}
var Ra = /* @__PURE__ */ new qe();
function Yf(e) {
  Ze._getMatrix(Ra, Ze.workingColorSpace, e);
  const t = `mat3( ${Ra.elements.map((n) => n.toFixed(4))} )`;
  switch (Ze.getTransfer(e)) {
    case Gs:
      return [t, "LinearTransferOETF"];
    case Ws:
      return [t, "sRGBTransferOETF"];
    default:
      return console.warn("THREE.WebGLProgram: Unsupported color space: ", e), [t, "LinearTransferOETF"];
  }
}
function Ca(e, t, n) {
  const i = e.getShaderParameter(t, e.COMPILE_STATUS), s = (e.getShaderInfoLog(t) || "").trim();
  if (i && s === "") return "";
  const r = /ERROR: 0:(\d+)/.exec(s);
  if (r) {
    const o = parseInt(r[1]);
    return n.toUpperCase() + `

` + s + `

` + Xf(e.getShaderSource(t), o);
  } else return s;
}
function qf(e, t) {
  const n = Yf(t);
  return [
    `vec4 ${e}( vec4 value ) {`,
    `	return ${n[1]}( vec4( value.rgb * ${n[0]}, value.a ) );`,
    "}"
  ].join(`
`);
}
function Kf(e, t) {
  let n;
  switch (t) {
    case 1:
      n = "Linear";
      break;
    case 2:
      n = "Reinhard";
      break;
    case 3:
      n = "Cineon";
      break;
    case 4:
      n = "ACESFilmic";
      break;
    case 6:
      n = "AgX";
      break;
    case 7:
      n = "Neutral";
      break;
    case 5:
      n = "Custom";
      break;
    default:
      console.warn("THREE.WebGLProgram: Unsupported toneMapping:", t), n = "Linear";
  }
  return "vec3 " + e + "( vec3 color ) { return " + n + "ToneMapping( color ); }";
}
var Fs = /* @__PURE__ */ new C();
function jf() {
  return Ze.getLuminanceCoefficients(Fs), [
    "float luminance( const in vec3 rgb ) {",
    `	const vec3 weights = vec3( ${Fs.x.toFixed(4)}, ${Fs.y.toFixed(4)}, ${Fs.z.toFixed(4)} );`,
    "	return dot( weights, rgb );",
    "}"
  ].join(`
`);
}
function Zf(e) {
  return [e.extensionClipCullDistance ? "#extension GL_ANGLE_clip_cull_distance : require" : "", e.extensionMultiDraw ? "#extension GL_ANGLE_multi_draw : require" : ""].filter(Bi).join(`
`);
}
function Jf(e) {
  const t = [];
  for (const n in e) {
    const i = e[n];
    i !== !1 && t.push("#define " + n + " " + i);
  }
  return t.join(`
`);
}
function $f(e, t) {
  const n = {}, i = e.getProgramParameter(t, e.ACTIVE_ATTRIBUTES);
  for (let s = 0; s < i; s++) {
    const r = e.getActiveAttrib(t, s), o = r.name;
    let a = 1;
    r.type === e.FLOAT_MAT2 && (a = 2), r.type === e.FLOAT_MAT3 && (a = 3), r.type === e.FLOAT_MAT4 && (a = 4), n[o] = {
      type: r.type,
      location: e.getAttribLocation(t, o),
      locationSize: a
    };
  }
  return n;
}
function Bi(e) {
  return e !== "";
}
function Pa(e, t) {
  const n = t.numSpotLightShadows + t.numSpotLightMaps - t.numSpotLightShadowsWithMaps;
  return e.replace(/NUM_DIR_LIGHTS/g, t.numDirLights).replace(/NUM_SPOT_LIGHTS/g, t.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g, t.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g, n).replace(/NUM_RECT_AREA_LIGHTS/g, t.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g, t.numPointLights).replace(/NUM_HEMI_LIGHTS/g, t.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g, t.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g, t.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g, t.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g, t.numPointLightShadows);
}
function La(e, t) {
  return e.replace(/NUM_CLIPPING_PLANES/g, t.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g, t.numClippingPlanes - t.numClipIntersection);
}
var Qf = /^[ \t]*#include +<([\w\d./]+)>/gm;
function Qr(e) {
  return e.replace(Qf, tp);
}
var ep = /* @__PURE__ */ new Map();
function tp(e, t) {
  let n = We[t];
  if (n === void 0) {
    const i = ep.get(t);
    if (i !== void 0)
      n = We[i], console.warn('THREE.WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.', t, i);
    else throw new Error("Can not resolve #include <" + t + ">");
  }
  return Qr(n);
}
var np = /#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;
function Ia(e) {
  return e.replace(np, ip);
}
function ip(e, t, n, i) {
  let s = "";
  for (let r = parseInt(t); r < parseInt(n); r++) s += i.replace(/\[\s*i\s*\]/g, "[ " + r + " ]").replace(/UNROLLED_LOOP_INDEX/g, r);
  return s;
}
function Da(e) {
  let t = `precision ${e.precision} float;
	precision ${e.precision} int;
	precision ${e.precision} sampler2D;
	precision ${e.precision} samplerCube;
	precision ${e.precision} sampler3D;
	precision ${e.precision} sampler2DArray;
	precision ${e.precision} sampler2DShadow;
	precision ${e.precision} samplerCubeShadow;
	precision ${e.precision} sampler2DArrayShadow;
	precision ${e.precision} isampler2D;
	precision ${e.precision} isampler3D;
	precision ${e.precision} isamplerCube;
	precision ${e.precision} isampler2DArray;
	precision ${e.precision} usampler2D;
	precision ${e.precision} usampler3D;
	precision ${e.precision} usamplerCube;
	precision ${e.precision} usampler2DArray;
	`;
  return e.precision === "highp" ? t += `
#define HIGH_PRECISION` : e.precision === "mediump" ? t += `
#define MEDIUM_PRECISION` : e.precision === "lowp" && (t += `
#define LOW_PRECISION`), t;
}
function sp(e) {
  let t = "SHADOWMAP_TYPE_BASIC";
  return e.shadowMapType === 1 ? t = "SHADOWMAP_TYPE_PCF" : e.shadowMapType === 2 ? t = "SHADOWMAP_TYPE_PCF_SOFT" : e.shadowMapType === 3 && (t = "SHADOWMAP_TYPE_VSM"), t;
}
function rp(e) {
  let t = "ENVMAP_TYPE_CUBE";
  if (e.envMap) switch (e.envMapMode) {
    case 301:
    case 302:
      t = "ENVMAP_TYPE_CUBE";
      break;
    case 306:
      t = "ENVMAP_TYPE_CUBE_UV";
      break;
  }
  return t;
}
function op(e) {
  let t = "ENVMAP_MODE_REFLECTION";
  return e.envMap && e.envMapMode === 302 && (t = "ENVMAP_MODE_REFRACTION"), t;
}
function ap(e) {
  let t = "ENVMAP_BLENDING_NONE";
  if (e.envMap) switch (e.combine) {
    case 0:
      t = "ENVMAP_BLENDING_MULTIPLY";
      break;
    case 1:
      t = "ENVMAP_BLENDING_MIX";
      break;
    case 2:
      t = "ENVMAP_BLENDING_ADD";
      break;
  }
  return t;
}
function lp(e) {
  const t = e.envMapCubeUVHeight;
  if (t === null) return null;
  const n = Math.log2(t) - 2, i = 1 / t;
  return {
    texelWidth: 1 / (3 * Math.max(Math.pow(2, n), 112)),
    texelHeight: i,
    maxMip: n
  };
}
function cp(e, t, n, i) {
  const s = e.getContext(), r = n.defines;
  let o = n.vertexShader, a = n.fragmentShader;
  const l = sp(n), c = rp(n), h = op(n), u = ap(n), d = lp(n), p = Zf(n), _ = Jf(r), g = s.createProgram();
  let m, f, y = n.glslVersion ? "#version " + n.glslVersion + `
` : "";
  n.isRawShaderMaterial ? (m = [
    "#define SHADER_TYPE " + n.shaderType,
    "#define SHADER_NAME " + n.shaderName,
    _
  ].filter(Bi).join(`
`), m.length > 0 && (m += `
`), f = [
    "#define SHADER_TYPE " + n.shaderType,
    "#define SHADER_NAME " + n.shaderName,
    _
  ].filter(Bi).join(`
`), f.length > 0 && (f += `
`)) : (m = [
    Da(n),
    "#define SHADER_TYPE " + n.shaderType,
    "#define SHADER_NAME " + n.shaderName,
    _,
    n.extensionClipCullDistance ? "#define USE_CLIP_DISTANCE" : "",
    n.batching ? "#define USE_BATCHING" : "",
    n.batchingColor ? "#define USE_BATCHING_COLOR" : "",
    n.instancing ? "#define USE_INSTANCING" : "",
    n.instancingColor ? "#define USE_INSTANCING_COLOR" : "",
    n.instancingMorph ? "#define USE_INSTANCING_MORPH" : "",
    n.useFog && n.fog ? "#define USE_FOG" : "",
    n.useFog && n.fogExp2 ? "#define FOG_EXP2" : "",
    n.map ? "#define USE_MAP" : "",
    n.envMap ? "#define USE_ENVMAP" : "",
    n.envMap ? "#define " + h : "",
    n.lightMap ? "#define USE_LIGHTMAP" : "",
    n.aoMap ? "#define USE_AOMAP" : "",
    n.bumpMap ? "#define USE_BUMPMAP" : "",
    n.normalMap ? "#define USE_NORMALMAP" : "",
    n.normalMapObjectSpace ? "#define USE_NORMALMAP_OBJECTSPACE" : "",
    n.normalMapTangentSpace ? "#define USE_NORMALMAP_TANGENTSPACE" : "",
    n.displacementMap ? "#define USE_DISPLACEMENTMAP" : "",
    n.emissiveMap ? "#define USE_EMISSIVEMAP" : "",
    n.anisotropy ? "#define USE_ANISOTROPY" : "",
    n.anisotropyMap ? "#define USE_ANISOTROPYMAP" : "",
    n.clearcoatMap ? "#define USE_CLEARCOATMAP" : "",
    n.clearcoatRoughnessMap ? "#define USE_CLEARCOAT_ROUGHNESSMAP" : "",
    n.clearcoatNormalMap ? "#define USE_CLEARCOAT_NORMALMAP" : "",
    n.iridescenceMap ? "#define USE_IRIDESCENCEMAP" : "",
    n.iridescenceThicknessMap ? "#define USE_IRIDESCENCE_THICKNESSMAP" : "",
    n.specularMap ? "#define USE_SPECULARMAP" : "",
    n.specularColorMap ? "#define USE_SPECULAR_COLORMAP" : "",
    n.specularIntensityMap ? "#define USE_SPECULAR_INTENSITYMAP" : "",
    n.roughnessMap ? "#define USE_ROUGHNESSMAP" : "",
    n.metalnessMap ? "#define USE_METALNESSMAP" : "",
    n.alphaMap ? "#define USE_ALPHAMAP" : "",
    n.alphaHash ? "#define USE_ALPHAHASH" : "",
    n.transmission ? "#define USE_TRANSMISSION" : "",
    n.transmissionMap ? "#define USE_TRANSMISSIONMAP" : "",
    n.thicknessMap ? "#define USE_THICKNESSMAP" : "",
    n.sheenColorMap ? "#define USE_SHEEN_COLORMAP" : "",
    n.sheenRoughnessMap ? "#define USE_SHEEN_ROUGHNESSMAP" : "",
    n.mapUv ? "#define MAP_UV " + n.mapUv : "",
    n.alphaMapUv ? "#define ALPHAMAP_UV " + n.alphaMapUv : "",
    n.lightMapUv ? "#define LIGHTMAP_UV " + n.lightMapUv : "",
    n.aoMapUv ? "#define AOMAP_UV " + n.aoMapUv : "",
    n.emissiveMapUv ? "#define EMISSIVEMAP_UV " + n.emissiveMapUv : "",
    n.bumpMapUv ? "#define BUMPMAP_UV " + n.bumpMapUv : "",
    n.normalMapUv ? "#define NORMALMAP_UV " + n.normalMapUv : "",
    n.displacementMapUv ? "#define DISPLACEMENTMAP_UV " + n.displacementMapUv : "",
    n.metalnessMapUv ? "#define METALNESSMAP_UV " + n.metalnessMapUv : "",
    n.roughnessMapUv ? "#define ROUGHNESSMAP_UV " + n.roughnessMapUv : "",
    n.anisotropyMapUv ? "#define ANISOTROPYMAP_UV " + n.anisotropyMapUv : "",
    n.clearcoatMapUv ? "#define CLEARCOATMAP_UV " + n.clearcoatMapUv : "",
    n.clearcoatNormalMapUv ? "#define CLEARCOAT_NORMALMAP_UV " + n.clearcoatNormalMapUv : "",
    n.clearcoatRoughnessMapUv ? "#define CLEARCOAT_ROUGHNESSMAP_UV " + n.clearcoatRoughnessMapUv : "",
    n.iridescenceMapUv ? "#define IRIDESCENCEMAP_UV " + n.iridescenceMapUv : "",
    n.iridescenceThicknessMapUv ? "#define IRIDESCENCE_THICKNESSMAP_UV " + n.iridescenceThicknessMapUv : "",
    n.sheenColorMapUv ? "#define SHEEN_COLORMAP_UV " + n.sheenColorMapUv : "",
    n.sheenRoughnessMapUv ? "#define SHEEN_ROUGHNESSMAP_UV " + n.sheenRoughnessMapUv : "",
    n.specularMapUv ? "#define SPECULARMAP_UV " + n.specularMapUv : "",
    n.specularColorMapUv ? "#define SPECULAR_COLORMAP_UV " + n.specularColorMapUv : "",
    n.specularIntensityMapUv ? "#define SPECULAR_INTENSITYMAP_UV " + n.specularIntensityMapUv : "",
    n.transmissionMapUv ? "#define TRANSMISSIONMAP_UV " + n.transmissionMapUv : "",
    n.thicknessMapUv ? "#define THICKNESSMAP_UV " + n.thicknessMapUv : "",
    n.vertexTangents && n.flatShading === !1 ? "#define USE_TANGENT" : "",
    n.vertexColors ? "#define USE_COLOR" : "",
    n.vertexAlphas ? "#define USE_COLOR_ALPHA" : "",
    n.vertexUv1s ? "#define USE_UV1" : "",
    n.vertexUv2s ? "#define USE_UV2" : "",
    n.vertexUv3s ? "#define USE_UV3" : "",
    n.pointsUvs ? "#define USE_POINTS_UV" : "",
    n.flatShading ? "#define FLAT_SHADED" : "",
    n.skinning ? "#define USE_SKINNING" : "",
    n.morphTargets ? "#define USE_MORPHTARGETS" : "",
    n.morphNormals && n.flatShading === !1 ? "#define USE_MORPHNORMALS" : "",
    n.morphColors ? "#define USE_MORPHCOLORS" : "",
    n.morphTargetsCount > 0 ? "#define MORPHTARGETS_TEXTURE_STRIDE " + n.morphTextureStride : "",
    n.morphTargetsCount > 0 ? "#define MORPHTARGETS_COUNT " + n.morphTargetsCount : "",
    n.doubleSided ? "#define DOUBLE_SIDED" : "",
    n.flipSided ? "#define FLIP_SIDED" : "",
    n.shadowMapEnabled ? "#define USE_SHADOWMAP" : "",
    n.shadowMapEnabled ? "#define " + l : "",
    n.sizeAttenuation ? "#define USE_SIZEATTENUATION" : "",
    n.numLightProbes > 0 ? "#define USE_LIGHT_PROBES" : "",
    n.logarithmicDepthBuffer ? "#define USE_LOGARITHMIC_DEPTH_BUFFER" : "",
    n.reversedDepthBuffer ? "#define USE_REVERSED_DEPTH_BUFFER" : "",
    "uniform mat4 modelMatrix;",
    "uniform mat4 modelViewMatrix;",
    "uniform mat4 projectionMatrix;",
    "uniform mat4 viewMatrix;",
    "uniform mat3 normalMatrix;",
    "uniform vec3 cameraPosition;",
    "uniform bool isOrthographic;",
    "#ifdef USE_INSTANCING",
    "	attribute mat4 instanceMatrix;",
    "#endif",
    "#ifdef USE_INSTANCING_COLOR",
    "	attribute vec3 instanceColor;",
    "#endif",
    "#ifdef USE_INSTANCING_MORPH",
    "	uniform sampler2D morphTexture;",
    "#endif",
    "attribute vec3 position;",
    "attribute vec3 normal;",
    "attribute vec2 uv;",
    "#ifdef USE_UV1",
    "	attribute vec2 uv1;",
    "#endif",
    "#ifdef USE_UV2",
    "	attribute vec2 uv2;",
    "#endif",
    "#ifdef USE_UV3",
    "	attribute vec2 uv3;",
    "#endif",
    "#ifdef USE_TANGENT",
    "	attribute vec4 tangent;",
    "#endif",
    "#if defined( USE_COLOR_ALPHA )",
    "	attribute vec4 color;",
    "#elif defined( USE_COLOR )",
    "	attribute vec3 color;",
    "#endif",
    "#ifdef USE_SKINNING",
    "	attribute vec4 skinIndex;",
    "	attribute vec4 skinWeight;",
    "#endif",
    `
`
  ].filter(Bi).join(`
`), f = [
    Da(n),
    "#define SHADER_TYPE " + n.shaderType,
    "#define SHADER_NAME " + n.shaderName,
    _,
    n.useFog && n.fog ? "#define USE_FOG" : "",
    n.useFog && n.fogExp2 ? "#define FOG_EXP2" : "",
    n.alphaToCoverage ? "#define ALPHA_TO_COVERAGE" : "",
    n.map ? "#define USE_MAP" : "",
    n.matcap ? "#define USE_MATCAP" : "",
    n.envMap ? "#define USE_ENVMAP" : "",
    n.envMap ? "#define " + c : "",
    n.envMap ? "#define " + h : "",
    n.envMap ? "#define " + u : "",
    d ? "#define CUBEUV_TEXEL_WIDTH " + d.texelWidth : "",
    d ? "#define CUBEUV_TEXEL_HEIGHT " + d.texelHeight : "",
    d ? "#define CUBEUV_MAX_MIP " + d.maxMip + ".0" : "",
    n.lightMap ? "#define USE_LIGHTMAP" : "",
    n.aoMap ? "#define USE_AOMAP" : "",
    n.bumpMap ? "#define USE_BUMPMAP" : "",
    n.normalMap ? "#define USE_NORMALMAP" : "",
    n.normalMapObjectSpace ? "#define USE_NORMALMAP_OBJECTSPACE" : "",
    n.normalMapTangentSpace ? "#define USE_NORMALMAP_TANGENTSPACE" : "",
    n.emissiveMap ? "#define USE_EMISSIVEMAP" : "",
    n.anisotropy ? "#define USE_ANISOTROPY" : "",
    n.anisotropyMap ? "#define USE_ANISOTROPYMAP" : "",
    n.clearcoat ? "#define USE_CLEARCOAT" : "",
    n.clearcoatMap ? "#define USE_CLEARCOATMAP" : "",
    n.clearcoatRoughnessMap ? "#define USE_CLEARCOAT_ROUGHNESSMAP" : "",
    n.clearcoatNormalMap ? "#define USE_CLEARCOAT_NORMALMAP" : "",
    n.dispersion ? "#define USE_DISPERSION" : "",
    n.iridescence ? "#define USE_IRIDESCENCE" : "",
    n.iridescenceMap ? "#define USE_IRIDESCENCEMAP" : "",
    n.iridescenceThicknessMap ? "#define USE_IRIDESCENCE_THICKNESSMAP" : "",
    n.specularMap ? "#define USE_SPECULARMAP" : "",
    n.specularColorMap ? "#define USE_SPECULAR_COLORMAP" : "",
    n.specularIntensityMap ? "#define USE_SPECULAR_INTENSITYMAP" : "",
    n.roughnessMap ? "#define USE_ROUGHNESSMAP" : "",
    n.metalnessMap ? "#define USE_METALNESSMAP" : "",
    n.alphaMap ? "#define USE_ALPHAMAP" : "",
    n.alphaTest ? "#define USE_ALPHATEST" : "",
    n.alphaHash ? "#define USE_ALPHAHASH" : "",
    n.sheen ? "#define USE_SHEEN" : "",
    n.sheenColorMap ? "#define USE_SHEEN_COLORMAP" : "",
    n.sheenRoughnessMap ? "#define USE_SHEEN_ROUGHNESSMAP" : "",
    n.transmission ? "#define USE_TRANSMISSION" : "",
    n.transmissionMap ? "#define USE_TRANSMISSIONMAP" : "",
    n.thicknessMap ? "#define USE_THICKNESSMAP" : "",
    n.vertexTangents && n.flatShading === !1 ? "#define USE_TANGENT" : "",
    n.vertexColors || n.instancingColor || n.batchingColor ? "#define USE_COLOR" : "",
    n.vertexAlphas ? "#define USE_COLOR_ALPHA" : "",
    n.vertexUv1s ? "#define USE_UV1" : "",
    n.vertexUv2s ? "#define USE_UV2" : "",
    n.vertexUv3s ? "#define USE_UV3" : "",
    n.pointsUvs ? "#define USE_POINTS_UV" : "",
    n.gradientMap ? "#define USE_GRADIENTMAP" : "",
    n.flatShading ? "#define FLAT_SHADED" : "",
    n.doubleSided ? "#define DOUBLE_SIDED" : "",
    n.flipSided ? "#define FLIP_SIDED" : "",
    n.shadowMapEnabled ? "#define USE_SHADOWMAP" : "",
    n.shadowMapEnabled ? "#define " + l : "",
    n.premultipliedAlpha ? "#define PREMULTIPLIED_ALPHA" : "",
    n.numLightProbes > 0 ? "#define USE_LIGHT_PROBES" : "",
    n.decodeVideoTexture ? "#define DECODE_VIDEO_TEXTURE" : "",
    n.decodeVideoTextureEmissive ? "#define DECODE_VIDEO_TEXTURE_EMISSIVE" : "",
    n.logarithmicDepthBuffer ? "#define USE_LOGARITHMIC_DEPTH_BUFFER" : "",
    n.reversedDepthBuffer ? "#define USE_REVERSED_DEPTH_BUFFER" : "",
    "uniform mat4 viewMatrix;",
    "uniform vec3 cameraPosition;",
    "uniform bool isOrthographic;",
    n.toneMapping !== 0 ? "#define TONE_MAPPING" : "",
    n.toneMapping !== 0 ? We.tonemapping_pars_fragment : "",
    n.toneMapping !== 0 ? Kf("toneMapping", n.toneMapping) : "",
    n.dithering ? "#define DITHERING" : "",
    n.opaque ? "#define OPAQUE" : "",
    We.colorspace_pars_fragment,
    qf("linearToOutputTexel", n.outputColorSpace),
    jf(),
    n.useDepthPacking ? "#define DEPTH_PACKING " + n.depthPacking : "",
    `
`
  ].filter(Bi).join(`
`)), o = Qr(o), o = Pa(o, n), o = La(o, n), a = Qr(a), a = Pa(a, n), a = La(a, n), o = Ia(o), a = Ia(a), n.isRawShaderMaterial !== !0 && (y = `#version 300 es
`, m = [
    p,
    "#define attribute in",
    "#define varying out",
    "#define texture2D texture"
  ].join(`
`) + `
` + m, f = [
    "#define varying in",
    n.glslVersion === "300 es" ? "" : "layout(location = 0) out highp vec4 pc_fragColor;",
    n.glslVersion === "300 es" ? "" : "#define gl_FragColor pc_fragColor",
    "#define gl_FragDepthEXT gl_FragDepth",
    "#define texture2D texture",
    "#define textureCube texture",
    "#define texture2DProj textureProj",
    "#define texture2DLodEXT textureLod",
    "#define texture2DProjLodEXT textureProjLod",
    "#define textureCubeLodEXT textureLod",
    "#define texture2DGradEXT textureGrad",
    "#define texture2DProjGradEXT textureProjGrad",
    "#define textureCubeGradEXT textureGrad"
  ].join(`
`) + `
` + f);
  const v = y + m + o, S = y + f + a, A = wa(s, s.VERTEX_SHADER, v), b = wa(s, s.FRAGMENT_SHADER, S);
  s.attachShader(g, A), s.attachShader(g, b), n.index0AttributeName !== void 0 ? s.bindAttribLocation(g, 0, n.index0AttributeName) : n.morphTargets === !0 && s.bindAttribLocation(g, 0, "position"), s.linkProgram(g);
  function R(P) {
    if (e.debug.checkShaderErrors) {
      const F = s.getProgramInfoLog(g) || "", H = s.getShaderInfoLog(A) || "", B = s.getShaderInfoLog(b) || "", j = F.trim(), V = H.trim(), te = B.trim();
      let W = !0, ee = !0;
      if (s.getProgramParameter(g, s.LINK_STATUS) === !1)
        if (W = !1, typeof e.debug.onShaderError == "function") e.debug.onShaderError(s, g, A, b);
        else {
          const pe = Ca(s, A, "vertex"), De = Ca(s, b, "fragment");
          console.error("THREE.WebGLProgram: Shader Error " + s.getError() + " - VALIDATE_STATUS " + s.getProgramParameter(g, s.VALIDATE_STATUS) + `

Material Name: ` + P.name + `
Material Type: ` + P.type + `

Program Info Log: ` + j + `
` + pe + `
` + De);
        }
      else j !== "" ? console.warn("THREE.WebGLProgram: Program Info Log:", j) : (V === "" || te === "") && (ee = !1);
      ee && (P.diagnostics = {
        runnable: W,
        programLog: j,
        vertexShader: {
          log: V,
          prefix: m
        },
        fragmentShader: {
          log: te,
          prefix: f
        }
      });
    }
    s.deleteShader(A), s.deleteShader(b), I = new Hs(s, g), M = $f(s, g);
  }
  let I;
  this.getUniforms = function() {
    return I === void 0 && R(this), I;
  };
  let M;
  this.getAttributes = function() {
    return M === void 0 && R(this), M;
  };
  let E = n.rendererExtensionParallelShaderCompile === !1;
  return this.isReady = function() {
    return E === !1 && (E = s.getProgramParameter(g, Gf)), E;
  }, this.destroy = function() {
    i.releaseStatesOfProgram(this), s.deleteProgram(g), this.program = void 0;
  }, this.type = n.shaderType, this.name = n.shaderName, this.id = Wf++, this.cacheKey = t, this.usedTimes = 1, this.program = g, this.vertexShader = A, this.fragmentShader = b, this;
}
var hp = 0, up = class {
  constructor() {
    this.shaderCache = /* @__PURE__ */ new Map(), this.materialCache = /* @__PURE__ */ new Map();
  }
  update(e) {
    const t = e.vertexShader, n = e.fragmentShader, i = this._getShaderStage(t), s = this._getShaderStage(n), r = this._getShaderCacheForMaterial(e);
    return r.has(i) === !1 && (r.add(i), i.usedTimes++), r.has(s) === !1 && (r.add(s), s.usedTimes++), this;
  }
  remove(e) {
    const t = this.materialCache.get(e);
    for (const n of t)
      n.usedTimes--, n.usedTimes === 0 && this.shaderCache.delete(n.code);
    return this.materialCache.delete(e), this;
  }
  getVertexShaderID(e) {
    return this._getShaderStage(e.vertexShader).id;
  }
  getFragmentShaderID(e) {
    return this._getShaderStage(e.fragmentShader).id;
  }
  dispose() {
    this.shaderCache.clear(), this.materialCache.clear();
  }
  _getShaderCacheForMaterial(e) {
    const t = this.materialCache;
    let n = t.get(e);
    return n === void 0 && (n = /* @__PURE__ */ new Set(), t.set(e, n)), n;
  }
  _getShaderStage(e) {
    const t = this.shaderCache;
    let n = t.get(e);
    return n === void 0 && (n = new dp(e), t.set(e, n)), n;
  }
}, dp = class {
  constructor(e) {
    this.id = hp++, this.code = e, this.usedTimes = 0;
  }
};
function fp(e, t, n, i, s, r, o) {
  const a = new cl(), l = new up(), c = /* @__PURE__ */ new Set(), h = [], u = s.logarithmicDepthBuffer, d = s.vertexTextures;
  let p = s.precision;
  const _ = {
    MeshDepthMaterial: "depth",
    MeshDistanceMaterial: "distanceRGBA",
    MeshNormalMaterial: "normal",
    MeshBasicMaterial: "basic",
    MeshLambertMaterial: "lambert",
    MeshPhongMaterial: "phong",
    MeshToonMaterial: "toon",
    MeshStandardMaterial: "physical",
    MeshPhysicalMaterial: "physical",
    MeshMatcapMaterial: "matcap",
    LineBasicMaterial: "basic",
    LineDashedMaterial: "dashed",
    PointsMaterial: "points",
    ShadowMaterial: "shadow",
    SpriteMaterial: "sprite"
  };
  function g(M) {
    return c.add(M), M === 0 ? "uv" : `uv${M}`;
  }
  function m(M, E, P, F, H) {
    const B = F.fog, j = H.geometry, V = M.isMeshStandardMaterial ? F.environment : null, te = (M.isMeshStandardMaterial ? n : t).get(M.envMap || V), W = te && te.mapping === 306 ? te.image.height : null, ee = _[M.type];
    M.precision !== null && (p = s.getMaxPrecision(M.precision), p !== M.precision && console.warn("THREE.WebGLProgram.getParameters:", M.precision, "not supported, using", p, "instead."));
    const pe = j.morphAttributes.position || j.morphAttributes.normal || j.morphAttributes.color, De = pe !== void 0 ? pe.length : 0;
    let Ne = 0;
    j.morphAttributes.position !== void 0 && (Ne = 1), j.morphAttributes.normal !== void 0 && (Ne = 2), j.morphAttributes.color !== void 0 && (Ne = 3);
    let Qe, Ke, Y, q;
    if (ee) {
      const nt = en[ee];
      Qe = nt.vertexShader, Ke = nt.fragmentShader;
    } else
      Qe = M.vertexShader, Ke = M.fragmentShader, l.update(M), Y = l.getVertexShaderID(M), q = l.getFragmentShaderID(M);
    const G = e.getRenderTarget(), ce = e.state.buffers.depth.getReversed(), Me = H.isInstancedMesh === !0, ge = H.isBatchedMesh === !0, ze = !!M.map, L = !!M.matcap, Z = !!te, Q = !!M.aoMap, se = !!M.lightMap, J = !!M.bumpMap, fe = !!M.normalMap, he = !!M.displacementMap, ae = !!M.emissiveMap, ke = !!M.metalnessMap, He = !!M.roughnessMap, Xe = M.anisotropy > 0, w = M.clearcoat > 0, x = M.dispersion > 0, U = M.iridescence > 0, K = M.sheen > 0, ne = M.transmission > 0, X = Xe && !!M.anisotropyMap, Se = w && !!M.clearcoatMap, ue = w && !!M.clearcoatNormalMap, be = w && !!M.clearcoatRoughnessMap, Le = U && !!M.iridescenceMap, le = U && !!M.iridescenceThicknessMap, ve = K && !!M.sheenColorMap, Ce = K && !!M.sheenRoughnessMap, Pe = !!M.specularMap, xe = !!M.specularColorMap, Ye = !!M.specularIntensityMap, D = ne && !!M.transmissionMap, _e = ne && !!M.thicknessMap, de = !!M.gradientMap, we = !!M.alphaMap, oe = M.alphaTest > 0, $ = !!M.alphaHash, Ae = !!M.extensions;
    let Ie = 0;
    M.toneMapped && (G === null || G.isXRRenderTarget === !0) && (Ie = e.toneMapping);
    const dt = {
      shaderID: ee,
      shaderType: M.type,
      shaderName: M.name,
      vertexShader: Qe,
      fragmentShader: Ke,
      defines: M.defines,
      customVertexShaderID: Y,
      customFragmentShaderID: q,
      isRawShaderMaterial: M.isRawShaderMaterial === !0,
      glslVersion: M.glslVersion,
      precision: p,
      batching: ge,
      batchingColor: ge && H._colorsTexture !== null,
      instancing: Me,
      instancingColor: Me && H.instanceColor !== null,
      instancingMorph: Me && H.morphTexture !== null,
      supportsVertexTextures: d,
      outputColorSpace: G === null ? e.outputColorSpace : G.isXRRenderTarget === !0 ? G.texture.colorSpace : Ut,
      alphaToCoverage: !!M.alphaToCoverage,
      map: ze,
      matcap: L,
      envMap: Z,
      envMapMode: Z && te.mapping,
      envMapCubeUVHeight: W,
      aoMap: Q,
      lightMap: se,
      bumpMap: J,
      normalMap: fe,
      displacementMap: d && he,
      emissiveMap: ae,
      normalMapObjectSpace: fe && M.normalMapType === 1,
      normalMapTangentSpace: fe && M.normalMapType === 0,
      metalnessMap: ke,
      roughnessMap: He,
      anisotropy: Xe,
      anisotropyMap: X,
      clearcoat: w,
      clearcoatMap: Se,
      clearcoatNormalMap: ue,
      clearcoatRoughnessMap: be,
      dispersion: x,
      iridescence: U,
      iridescenceMap: Le,
      iridescenceThicknessMap: le,
      sheen: K,
      sheenColorMap: ve,
      sheenRoughnessMap: Ce,
      specularMap: Pe,
      specularColorMap: xe,
      specularIntensityMap: Ye,
      transmission: ne,
      transmissionMap: D,
      thicknessMap: _e,
      gradientMap: de,
      opaque: M.transparent === !1 && M.blending === 1 && M.alphaToCoverage === !1,
      alphaMap: we,
      alphaTest: oe,
      alphaHash: $,
      combine: M.combine,
      mapUv: ze && g(M.map.channel),
      aoMapUv: Q && g(M.aoMap.channel),
      lightMapUv: se && g(M.lightMap.channel),
      bumpMapUv: J && g(M.bumpMap.channel),
      normalMapUv: fe && g(M.normalMap.channel),
      displacementMapUv: he && g(M.displacementMap.channel),
      emissiveMapUv: ae && g(M.emissiveMap.channel),
      metalnessMapUv: ke && g(M.metalnessMap.channel),
      roughnessMapUv: He && g(M.roughnessMap.channel),
      anisotropyMapUv: X && g(M.anisotropyMap.channel),
      clearcoatMapUv: Se && g(M.clearcoatMap.channel),
      clearcoatNormalMapUv: ue && g(M.clearcoatNormalMap.channel),
      clearcoatRoughnessMapUv: be && g(M.clearcoatRoughnessMap.channel),
      iridescenceMapUv: Le && g(M.iridescenceMap.channel),
      iridescenceThicknessMapUv: le && g(M.iridescenceThicknessMap.channel),
      sheenColorMapUv: ve && g(M.sheenColorMap.channel),
      sheenRoughnessMapUv: Ce && g(M.sheenRoughnessMap.channel),
      specularMapUv: Pe && g(M.specularMap.channel),
      specularColorMapUv: xe && g(M.specularColorMap.channel),
      specularIntensityMapUv: Ye && g(M.specularIntensityMap.channel),
      transmissionMapUv: D && g(M.transmissionMap.channel),
      thicknessMapUv: _e && g(M.thicknessMap.channel),
      alphaMapUv: we && g(M.alphaMap.channel),
      vertexTangents: !!j.attributes.tangent && (fe || Xe),
      vertexColors: M.vertexColors,
      vertexAlphas: M.vertexColors === !0 && !!j.attributes.color && j.attributes.color.itemSize === 4,
      pointsUvs: H.isPoints === !0 && !!j.attributes.uv && (ze || we),
      fog: !!B,
      useFog: M.fog === !0,
      fogExp2: !!B && B.isFogExp2,
      flatShading: M.flatShading === !0 && M.wireframe === !1,
      sizeAttenuation: M.sizeAttenuation === !0,
      logarithmicDepthBuffer: u,
      reversedDepthBuffer: ce,
      skinning: H.isSkinnedMesh === !0,
      morphTargets: j.morphAttributes.position !== void 0,
      morphNormals: j.morphAttributes.normal !== void 0,
      morphColors: j.morphAttributes.color !== void 0,
      morphTargetsCount: De,
      morphTextureStride: Ne,
      numDirLights: E.directional.length,
      numPointLights: E.point.length,
      numSpotLights: E.spot.length,
      numSpotLightMaps: E.spotLightMap.length,
      numRectAreaLights: E.rectArea.length,
      numHemiLights: E.hemi.length,
      numDirLightShadows: E.directionalShadowMap.length,
      numPointLightShadows: E.pointShadowMap.length,
      numSpotLightShadows: E.spotShadowMap.length,
      numSpotLightShadowsWithMaps: E.numSpotLightShadowsWithMaps,
      numLightProbes: E.numLightProbes,
      numClippingPlanes: o.numPlanes,
      numClipIntersection: o.numIntersection,
      dithering: M.dithering,
      shadowMapEnabled: e.shadowMap.enabled && P.length > 0,
      shadowMapType: e.shadowMap.type,
      toneMapping: Ie,
      decodeVideoTexture: ze && M.map.isVideoTexture === !0 && Ze.getTransfer(M.map.colorSpace) === "srgb",
      decodeVideoTextureEmissive: ae && M.emissiveMap.isVideoTexture === !0 && Ze.getTransfer(M.emissiveMap.colorSpace) === "srgb",
      premultipliedAlpha: M.premultipliedAlpha,
      doubleSided: M.side === 2,
      flipSided: M.side === 1,
      useDepthPacking: M.depthPacking >= 0,
      depthPacking: M.depthPacking || 0,
      index0AttributeName: M.index0AttributeName,
      extensionClipCullDistance: Ae && M.extensions.clipCullDistance === !0 && i.has("WEBGL_clip_cull_distance"),
      extensionMultiDraw: (Ae && M.extensions.multiDraw === !0 || ge) && i.has("WEBGL_multi_draw"),
      rendererExtensionParallelShaderCompile: i.has("KHR_parallel_shader_compile"),
      customProgramCacheKey: M.customProgramCacheKey()
    };
    return dt.vertexUv1s = c.has(1), dt.vertexUv2s = c.has(2), dt.vertexUv3s = c.has(3), c.clear(), dt;
  }
  function f(M) {
    const E = [];
    if (M.shaderID ? E.push(M.shaderID) : (E.push(M.customVertexShaderID), E.push(M.customFragmentShaderID)), M.defines !== void 0) for (const P in M.defines)
      E.push(P), E.push(M.defines[P]);
    return M.isRawShaderMaterial === !1 && (y(E, M), v(E, M), E.push(e.outputColorSpace)), E.push(M.customProgramCacheKey), E.join();
  }
  function y(M, E) {
    M.push(E.precision), M.push(E.outputColorSpace), M.push(E.envMapMode), M.push(E.envMapCubeUVHeight), M.push(E.mapUv), M.push(E.alphaMapUv), M.push(E.lightMapUv), M.push(E.aoMapUv), M.push(E.bumpMapUv), M.push(E.normalMapUv), M.push(E.displacementMapUv), M.push(E.emissiveMapUv), M.push(E.metalnessMapUv), M.push(E.roughnessMapUv), M.push(E.anisotropyMapUv), M.push(E.clearcoatMapUv), M.push(E.clearcoatNormalMapUv), M.push(E.clearcoatRoughnessMapUv), M.push(E.iridescenceMapUv), M.push(E.iridescenceThicknessMapUv), M.push(E.sheenColorMapUv), M.push(E.sheenRoughnessMapUv), M.push(E.specularMapUv), M.push(E.specularColorMapUv), M.push(E.specularIntensityMapUv), M.push(E.transmissionMapUv), M.push(E.thicknessMapUv), M.push(E.combine), M.push(E.fogExp2), M.push(E.sizeAttenuation), M.push(E.morphTargetsCount), M.push(E.morphAttributeCount), M.push(E.numDirLights), M.push(E.numPointLights), M.push(E.numSpotLights), M.push(E.numSpotLightMaps), M.push(E.numHemiLights), M.push(E.numRectAreaLights), M.push(E.numDirLightShadows), M.push(E.numPointLightShadows), M.push(E.numSpotLightShadows), M.push(E.numSpotLightShadowsWithMaps), M.push(E.numLightProbes), M.push(E.shadowMapType), M.push(E.toneMapping), M.push(E.numClippingPlanes), M.push(E.numClipIntersection), M.push(E.depthPacking);
  }
  function v(M, E) {
    a.disableAll(), E.supportsVertexTextures && a.enable(0), E.instancing && a.enable(1), E.instancingColor && a.enable(2), E.instancingMorph && a.enable(3), E.matcap && a.enable(4), E.envMap && a.enable(5), E.normalMapObjectSpace && a.enable(6), E.normalMapTangentSpace && a.enable(7), E.clearcoat && a.enable(8), E.iridescence && a.enable(9), E.alphaTest && a.enable(10), E.vertexColors && a.enable(11), E.vertexAlphas && a.enable(12), E.vertexUv1s && a.enable(13), E.vertexUv2s && a.enable(14), E.vertexUv3s && a.enable(15), E.vertexTangents && a.enable(16), E.anisotropy && a.enable(17), E.alphaHash && a.enable(18), E.batching && a.enable(19), E.dispersion && a.enable(20), E.batchingColor && a.enable(21), E.gradientMap && a.enable(22), M.push(a.mask), a.disableAll(), E.fog && a.enable(0), E.useFog && a.enable(1), E.flatShading && a.enable(2), E.logarithmicDepthBuffer && a.enable(3), E.reversedDepthBuffer && a.enable(4), E.skinning && a.enable(5), E.morphTargets && a.enable(6), E.morphNormals && a.enable(7), E.morphColors && a.enable(8), E.premultipliedAlpha && a.enable(9), E.shadowMapEnabled && a.enable(10), E.doubleSided && a.enable(11), E.flipSided && a.enable(12), E.useDepthPacking && a.enable(13), E.dithering && a.enable(14), E.transmission && a.enable(15), E.sheen && a.enable(16), E.opaque && a.enable(17), E.pointsUvs && a.enable(18), E.decodeVideoTexture && a.enable(19), E.decodeVideoTextureEmissive && a.enable(20), E.alphaToCoverage && a.enable(21), M.push(a.mask);
  }
  function S(M) {
    const E = _[M.type];
    let P;
    if (E) {
      const F = en[E];
      P = Kh.clone(F.uniforms);
    } else P = M.uniforms;
    return P;
  }
  function A(M, E) {
    let P;
    for (let F = 0, H = h.length; F < H; F++) {
      const B = h[F];
      if (B.cacheKey === E) {
        P = B, ++P.usedTimes;
        break;
      }
    }
    return P === void 0 && (P = new cp(e, E, M, r), h.push(P)), P;
  }
  function b(M) {
    if (--M.usedTimes === 0) {
      const E = h.indexOf(M);
      h[E] = h[h.length - 1], h.pop(), M.destroy();
    }
  }
  function R(M) {
    l.remove(M);
  }
  function I() {
    l.dispose();
  }
  return {
    getParameters: m,
    getProgramCacheKey: f,
    getUniforms: S,
    acquireProgram: A,
    releaseProgram: b,
    releaseShaderCache: R,
    programs: h,
    dispose: I
  };
}
function pp() {
  let e = /* @__PURE__ */ new WeakMap();
  function t(o) {
    return e.has(o);
  }
  function n(o) {
    let a = e.get(o);
    return a === void 0 && (a = {}, e.set(o, a)), a;
  }
  function i(o) {
    e.delete(o);
  }
  function s(o, a, l) {
    e.get(o)[a] = l;
  }
  function r() {
    e = /* @__PURE__ */ new WeakMap();
  }
  return {
    has: t,
    get: n,
    remove: i,
    update: s,
    dispose: r
  };
}
function mp(e, t) {
  return e.groupOrder !== t.groupOrder ? e.groupOrder - t.groupOrder : e.renderOrder !== t.renderOrder ? e.renderOrder - t.renderOrder : e.material.id !== t.material.id ? e.material.id - t.material.id : e.z !== t.z ? e.z - t.z : e.id - t.id;
}
function Na(e, t) {
  return e.groupOrder !== t.groupOrder ? e.groupOrder - t.groupOrder : e.renderOrder !== t.renderOrder ? e.renderOrder - t.renderOrder : e.z !== t.z ? t.z - e.z : e.id - t.id;
}
function Ua() {
  const e = [];
  let t = 0;
  const n = [], i = [], s = [];
  function r() {
    t = 0, n.length = 0, i.length = 0, s.length = 0;
  }
  function o(u, d, p, _, g, m) {
    let f = e[t];
    return f === void 0 ? (f = {
      id: u.id,
      object: u,
      geometry: d,
      material: p,
      groupOrder: _,
      renderOrder: u.renderOrder,
      z: g,
      group: m
    }, e[t] = f) : (f.id = u.id, f.object = u, f.geometry = d, f.material = p, f.groupOrder = _, f.renderOrder = u.renderOrder, f.z = g, f.group = m), t++, f;
  }
  function a(u, d, p, _, g, m) {
    const f = o(u, d, p, _, g, m);
    p.transmission > 0 ? i.push(f) : p.transparent === !0 ? s.push(f) : n.push(f);
  }
  function l(u, d, p, _, g, m) {
    const f = o(u, d, p, _, g, m);
    p.transmission > 0 ? i.unshift(f) : p.transparent === !0 ? s.unshift(f) : n.unshift(f);
  }
  function c(u, d) {
    n.length > 1 && n.sort(u || mp), i.length > 1 && i.sort(d || Na), s.length > 1 && s.sort(d || Na);
  }
  function h() {
    for (let u = t, d = e.length; u < d; u++) {
      const p = e[u];
      if (p.id === null) break;
      p.id = null, p.object = null, p.geometry = null, p.material = null, p.group = null;
    }
  }
  return {
    opaque: n,
    transmissive: i,
    transparent: s,
    init: r,
    push: a,
    unshift: l,
    finish: h,
    sort: c
  };
}
function gp() {
  let e = /* @__PURE__ */ new WeakMap();
  function t(i, s) {
    const r = e.get(i);
    let o;
    return r === void 0 ? (o = new Ua(), e.set(i, [o])) : s >= r.length ? (o = new Ua(), r.push(o)) : o = r[s], o;
  }
  function n() {
    e = /* @__PURE__ */ new WeakMap();
  }
  return {
    get: t,
    dispose: n
  };
}
function _p() {
  const e = {};
  return { get: function(t) {
    if (e[t.id] !== void 0) return e[t.id];
    let n;
    switch (t.type) {
      case "DirectionalLight":
        n = {
          direction: new C(),
          color: new Be()
        };
        break;
      case "SpotLight":
        n = {
          position: new C(),
          direction: new C(),
          color: new Be(),
          distance: 0,
          coneCos: 0,
          penumbraCos: 0,
          decay: 0
        };
        break;
      case "PointLight":
        n = {
          position: new C(),
          color: new Be(),
          distance: 0,
          decay: 0
        };
        break;
      case "HemisphereLight":
        n = {
          direction: new C(),
          skyColor: new Be(),
          groundColor: new Be()
        };
        break;
      case "RectAreaLight":
        n = {
          color: new Be(),
          position: new C(),
          halfWidth: new C(),
          halfHeight: new C()
        };
        break;
    }
    return e[t.id] = n, n;
  } };
}
function vp() {
  const e = {};
  return { get: function(t) {
    if (e[t.id] !== void 0) return e[t.id];
    let n;
    switch (t.type) {
      case "DirectionalLight":
        n = {
          shadowIntensity: 1,
          shadowBias: 0,
          shadowNormalBias: 0,
          shadowRadius: 1,
          shadowMapSize: new re()
        };
        break;
      case "SpotLight":
        n = {
          shadowIntensity: 1,
          shadowBias: 0,
          shadowNormalBias: 0,
          shadowRadius: 1,
          shadowMapSize: new re()
        };
        break;
      case "PointLight":
        n = {
          shadowIntensity: 1,
          shadowBias: 0,
          shadowNormalBias: 0,
          shadowRadius: 1,
          shadowMapSize: new re(),
          shadowCameraNear: 1,
          shadowCameraFar: 1e3
        };
        break;
    }
    return e[t.id] = n, n;
  } };
}
var xp = 0;
function yp(e, t) {
  return (t.castShadow ? 2 : 0) - (e.castShadow ? 2 : 0) + (t.map ? 1 : 0) - (e.map ? 1 : 0);
}
function Mp(e) {
  const t = new _p(), n = vp(), i = {
    version: 0,
    hash: {
      directionalLength: -1,
      pointLength: -1,
      spotLength: -1,
      rectAreaLength: -1,
      hemiLength: -1,
      numDirectionalShadows: -1,
      numPointShadows: -1,
      numSpotShadows: -1,
      numSpotMaps: -1,
      numLightProbes: -1
    },
    ambient: [
      0,
      0,
      0
    ],
    probe: [],
    directional: [],
    directionalShadow: [],
    directionalShadowMap: [],
    directionalShadowMatrix: [],
    spot: [],
    spotLightMap: [],
    spotShadow: [],
    spotShadowMap: [],
    spotLightMatrix: [],
    rectArea: [],
    rectAreaLTC1: null,
    rectAreaLTC2: null,
    point: [],
    pointShadow: [],
    pointShadowMap: [],
    pointShadowMatrix: [],
    hemi: [],
    numSpotLightShadowsWithMaps: 0,
    numLightProbes: 0
  };
  for (let c = 0; c < 9; c++) i.probe.push(new C());
  const s = new C(), r = new Ve(), o = new Ve();
  function a(c) {
    let h = 0, u = 0, d = 0;
    for (let M = 0; M < 9; M++) i.probe[M].set(0, 0, 0);
    let p = 0, _ = 0, g = 0, m = 0, f = 0, y = 0, v = 0, S = 0, A = 0, b = 0, R = 0;
    c.sort(yp);
    for (let M = 0, E = c.length; M < E; M++) {
      const P = c[M], F = P.color, H = P.intensity, B = P.distance, j = P.shadow && P.shadow.map ? P.shadow.map.texture : null;
      if (P.isAmbientLight)
        h += F.r * H, u += F.g * H, d += F.b * H;
      else if (P.isLightProbe) {
        for (let V = 0; V < 9; V++) i.probe[V].addScaledVector(P.sh.coefficients[V], H);
        R++;
      } else if (P.isDirectionalLight) {
        const V = t.get(P);
        if (V.color.copy(P.color).multiplyScalar(P.intensity), P.castShadow) {
          const te = P.shadow, W = n.get(P);
          W.shadowIntensity = te.intensity, W.shadowBias = te.bias, W.shadowNormalBias = te.normalBias, W.shadowRadius = te.radius, W.shadowMapSize = te.mapSize, i.directionalShadow[p] = W, i.directionalShadowMap[p] = j, i.directionalShadowMatrix[p] = P.shadow.matrix, y++;
        }
        i.directional[p] = V, p++;
      } else if (P.isSpotLight) {
        const V = t.get(P);
        V.position.setFromMatrixPosition(P.matrixWorld), V.color.copy(F).multiplyScalar(H), V.distance = B, V.coneCos = Math.cos(P.angle), V.penumbraCos = Math.cos(P.angle * (1 - P.penumbra)), V.decay = P.decay, i.spot[g] = V;
        const te = P.shadow;
        if (P.map && (i.spotLightMap[A] = P.map, A++, te.updateMatrices(P), P.castShadow && b++), i.spotLightMatrix[g] = te.matrix, P.castShadow) {
          const W = n.get(P);
          W.shadowIntensity = te.intensity, W.shadowBias = te.bias, W.shadowNormalBias = te.normalBias, W.shadowRadius = te.radius, W.shadowMapSize = te.mapSize, i.spotShadow[g] = W, i.spotShadowMap[g] = j, S++;
        }
        g++;
      } else if (P.isRectAreaLight) {
        const V = t.get(P);
        V.color.copy(F).multiplyScalar(H), V.halfWidth.set(P.width * 0.5, 0, 0), V.halfHeight.set(0, P.height * 0.5, 0), i.rectArea[m] = V, m++;
      } else if (P.isPointLight) {
        const V = t.get(P);
        if (V.color.copy(P.color).multiplyScalar(P.intensity), V.distance = P.distance, V.decay = P.decay, P.castShadow) {
          const te = P.shadow, W = n.get(P);
          W.shadowIntensity = te.intensity, W.shadowBias = te.bias, W.shadowNormalBias = te.normalBias, W.shadowRadius = te.radius, W.shadowMapSize = te.mapSize, W.shadowCameraNear = te.camera.near, W.shadowCameraFar = te.camera.far, i.pointShadow[_] = W, i.pointShadowMap[_] = j, i.pointShadowMatrix[_] = P.shadow.matrix, v++;
        }
        i.point[_] = V, _++;
      } else if (P.isHemisphereLight) {
        const V = t.get(P);
        V.skyColor.copy(P.color).multiplyScalar(H), V.groundColor.copy(P.groundColor).multiplyScalar(H), i.hemi[f] = V, f++;
      }
    }
    m > 0 && (e.has("OES_texture_float_linear") === !0 ? (i.rectAreaLTC1 = me.LTC_FLOAT_1, i.rectAreaLTC2 = me.LTC_FLOAT_2) : (i.rectAreaLTC1 = me.LTC_HALF_1, i.rectAreaLTC2 = me.LTC_HALF_2)), i.ambient[0] = h, i.ambient[1] = u, i.ambient[2] = d;
    const I = i.hash;
    (I.directionalLength !== p || I.pointLength !== _ || I.spotLength !== g || I.rectAreaLength !== m || I.hemiLength !== f || I.numDirectionalShadows !== y || I.numPointShadows !== v || I.numSpotShadows !== S || I.numSpotMaps !== A || I.numLightProbes !== R) && (i.directional.length = p, i.spot.length = g, i.rectArea.length = m, i.point.length = _, i.hemi.length = f, i.directionalShadow.length = y, i.directionalShadowMap.length = y, i.pointShadow.length = v, i.pointShadowMap.length = v, i.spotShadow.length = S, i.spotShadowMap.length = S, i.directionalShadowMatrix.length = y, i.pointShadowMatrix.length = v, i.spotLightMatrix.length = S + A - b, i.spotLightMap.length = A, i.numSpotLightShadowsWithMaps = b, i.numLightProbes = R, I.directionalLength = p, I.pointLength = _, I.spotLength = g, I.rectAreaLength = m, I.hemiLength = f, I.numDirectionalShadows = y, I.numPointShadows = v, I.numSpotShadows = S, I.numSpotMaps = A, I.numLightProbes = R, i.version = xp++);
  }
  function l(c, h) {
    let u = 0, d = 0, p = 0, _ = 0, g = 0;
    const m = h.matrixWorldInverse;
    for (let f = 0, y = c.length; f < y; f++) {
      const v = c[f];
      if (v.isDirectionalLight) {
        const S = i.directional[u];
        S.direction.setFromMatrixPosition(v.matrixWorld), s.setFromMatrixPosition(v.target.matrixWorld), S.direction.sub(s), S.direction.transformDirection(m), u++;
      } else if (v.isSpotLight) {
        const S = i.spot[p];
        S.position.setFromMatrixPosition(v.matrixWorld), S.position.applyMatrix4(m), S.direction.setFromMatrixPosition(v.matrixWorld), s.setFromMatrixPosition(v.target.matrixWorld), S.direction.sub(s), S.direction.transformDirection(m), p++;
      } else if (v.isRectAreaLight) {
        const S = i.rectArea[_];
        S.position.setFromMatrixPosition(v.matrixWorld), S.position.applyMatrix4(m), o.identity(), r.copy(v.matrixWorld), r.premultiply(m), o.extractRotation(r), S.halfWidth.set(v.width * 0.5, 0, 0), S.halfHeight.set(0, v.height * 0.5, 0), S.halfWidth.applyMatrix4(o), S.halfHeight.applyMatrix4(o), _++;
      } else if (v.isPointLight) {
        const S = i.point[d];
        S.position.setFromMatrixPosition(v.matrixWorld), S.position.applyMatrix4(m), d++;
      } else if (v.isHemisphereLight) {
        const S = i.hemi[g];
        S.direction.setFromMatrixPosition(v.matrixWorld), S.direction.transformDirection(m), g++;
      }
    }
  }
  return {
    setup: a,
    setupView: l,
    state: i
  };
}
function Oa(e) {
  const t = new Mp(e), n = [], i = [];
  function s(h) {
    c.camera = h, n.length = 0, i.length = 0;
  }
  function r(h) {
    n.push(h);
  }
  function o(h) {
    i.push(h);
  }
  function a() {
    t.setup(n);
  }
  function l(h) {
    t.setupView(n, h);
  }
  const c = {
    lightsArray: n,
    shadowsArray: i,
    camera: null,
    lights: t,
    transmissionRenderTarget: {}
  };
  return {
    init: s,
    state: c,
    setupLights: a,
    setupLightsView: l,
    pushLight: r,
    pushShadow: o
  };
}
function Sp(e) {
  let t = /* @__PURE__ */ new WeakMap();
  function n(s, r = 0) {
    const o = t.get(s);
    let a;
    return o === void 0 ? (a = new Oa(e), t.set(s, [a])) : r >= o.length ? (a = new Oa(e), o.push(a)) : a = o[r], a;
  }
  function i() {
    t = /* @__PURE__ */ new WeakMap();
  }
  return {
    get: n,
    dispose: i
  };
}
var Ep = `void main() {
	gl_Position = vec4( position, 1.0 );
}`, Tp = `uniform sampler2D shadow_pass;
uniform vec2 resolution;
uniform float radius;
#include <packing>
void main() {
	const float samples = float( VSM_SAMPLES );
	float mean = 0.0;
	float squared_mean = 0.0;
	float uvStride = samples <= 1.0 ? 0.0 : 2.0 / ( samples - 1.0 );
	float uvStart = samples <= 1.0 ? 0.0 : - 1.0;
	for ( float i = 0.0; i < samples; i ++ ) {
		float uvOffset = uvStart + i * uvStride;
		#ifdef HORIZONTAL_PASS
			vec2 distribution = unpackRGBATo2Half( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( uvOffset, 0.0 ) * radius ) / resolution ) );
			mean += distribution.x;
			squared_mean += distribution.y * distribution.y + distribution.x * distribution.x;
		#else
			float depth = unpackRGBAToDepth( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( 0.0, uvOffset ) * radius ) / resolution ) );
			mean += depth;
			squared_mean += depth * depth;
		#endif
	}
	mean = mean / samples;
	squared_mean = squared_mean / samples;
	float std_dev = sqrt( squared_mean - mean * mean );
	gl_FragColor = pack2HalfToRGBA( vec2( mean, std_dev ) );
}`;
function bp(e, t, n) {
  let i = new ao();
  const s = new re(), r = new re(), o = new tt(), a = new Ju({ depthPacking: uh }), l = new $u(), c = {}, h = n.maxTextureSize, u = {
    0: 1,
    1: 0,
    2: 2
  }, d = new wn({
    defines: { VSM_SAMPLES: 8 },
    uniforms: {
      shadow_pass: { value: null },
      resolution: { value: new re() },
      radius: { value: 4 }
    },
    vertexShader: Ep,
    fragmentShader: Tp
  }), p = d.clone();
  p.defines.HORIZONTAL_PASS = 1;
  const _ = new Lt();
  _.setAttribute("position", new wt(new Float32Array([
    -1,
    -1,
    0.5,
    3,
    -1,
    0.5,
    -1,
    3,
    0.5
  ]), 3));
  const g = new Tt(_, d), m = this;
  this.enabled = !1, this.autoUpdate = !0, this.needsUpdate = !1, this.type = 1;
  let f = this.type;
  this.render = function(b, R, I) {
    if (m.enabled === !1 || m.autoUpdate === !1 && m.needsUpdate === !1 || b.length === 0) return;
    const M = e.getRenderTarget(), E = e.getActiveCubeFace(), P = e.getActiveMipmapLevel(), F = e.state;
    F.setBlending(0), F.buffers.depth.getReversed() === !0 ? F.buffers.color.setClear(0, 0, 0, 0) : F.buffers.color.setClear(1, 1, 1, 1), F.buffers.depth.setTest(!0), F.setScissorTest(!1);
    const H = f !== 3 && this.type === 3, B = f === 3 && this.type !== 3;
    for (let j = 0, V = b.length; j < V; j++) {
      const te = b[j], W = te.shadow;
      if (W === void 0) {
        console.warn("THREE.WebGLShadowMap:", te, "has no shadow.");
        continue;
      }
      if (W.autoUpdate === !1 && W.needsUpdate === !1) continue;
      s.copy(W.mapSize);
      const ee = W.getFrameExtents();
      if (s.multiply(ee), r.copy(W.mapSize), (s.x > h || s.y > h) && (s.x > h && (r.x = Math.floor(h / ee.x), s.x = r.x * ee.x, W.mapSize.x = r.x), s.y > h && (r.y = Math.floor(h / ee.y), s.y = r.y * ee.y, W.mapSize.y = r.y)), W.map === null || H === !0 || B === !0) {
        const De = this.type !== 3 ? {
          minFilter: Vt,
          magFilter: Vt
        } : {};
        W.map !== null && W.map.dispose(), W.map = new Hn(s.x, s.y, De), W.map.texture.name = te.name + ".shadowMap", W.camera.updateProjectionMatrix();
      }
      e.setRenderTarget(W.map), e.clear();
      const pe = W.getViewportCount();
      for (let De = 0; De < pe; De++) {
        const Ne = W.getViewport(De);
        o.set(r.x * Ne.x, r.y * Ne.y, r.x * Ne.z, r.y * Ne.w), F.viewport(o), W.updateMatrices(te, De), i = W.getFrustum(), S(R, I, W.camera, te, this.type);
      }
      W.isPointLightShadow !== !0 && this.type === 3 && y(W, I), W.needsUpdate = !1;
    }
    f = this.type, m.needsUpdate = !1, e.setRenderTarget(M, E, P);
  };
  function y(b, R) {
    const I = t.update(g);
    d.defines.VSM_SAMPLES !== b.blurSamples && (d.defines.VSM_SAMPLES = b.blurSamples, p.defines.VSM_SAMPLES = b.blurSamples, d.needsUpdate = !0, p.needsUpdate = !0), b.mapPass === null && (b.mapPass = new Hn(s.x, s.y)), d.uniforms.shadow_pass.value = b.map.texture, d.uniforms.resolution.value = b.mapSize, d.uniforms.radius.value = b.radius, e.setRenderTarget(b.mapPass), e.clear(), e.renderBufferDirect(R, null, I, d, g, null), p.uniforms.shadow_pass.value = b.mapPass.texture, p.uniforms.resolution.value = b.mapSize, p.uniforms.radius.value = b.radius, e.setRenderTarget(b.map), e.clear(), e.renderBufferDirect(R, null, I, p, g, null);
  }
  function v(b, R, I, M) {
    let E = null;
    const P = I.isPointLight === !0 ? b.customDistanceMaterial : b.customDepthMaterial;
    if (P !== void 0) E = P;
    else if (E = I.isPointLight === !0 ? l : a, e.localClippingEnabled && R.clipShadows === !0 && Array.isArray(R.clippingPlanes) && R.clippingPlanes.length !== 0 || R.displacementMap && R.displacementScale !== 0 || R.alphaMap && R.alphaTest > 0 || R.map && R.alphaTest > 0 || R.alphaToCoverage === !0) {
      const F = E.uuid, H = R.uuid;
      let B = c[F];
      B === void 0 && (B = {}, c[F] = B);
      let j = B[H];
      j === void 0 && (j = E.clone(), B[H] = j, R.addEventListener("dispose", A)), E = j;
    }
    if (E.visible = R.visible, E.wireframe = R.wireframe, M === 3 ? E.side = R.shadowSide !== null ? R.shadowSide : R.side : E.side = R.shadowSide !== null ? R.shadowSide : u[R.side], E.alphaMap = R.alphaMap, E.alphaTest = R.alphaToCoverage === !0 ? 0.5 : R.alphaTest, E.map = R.map, E.clipShadows = R.clipShadows, E.clippingPlanes = R.clippingPlanes, E.clipIntersection = R.clipIntersection, E.displacementMap = R.displacementMap, E.displacementScale = R.displacementScale, E.displacementBias = R.displacementBias, E.wireframeLinewidth = R.wireframeLinewidth, E.linewidth = R.linewidth, I.isPointLight === !0 && E.isMeshDistanceMaterial === !0) {
      const F = e.properties.get(E);
      F.light = I;
    }
    return E;
  }
  function S(b, R, I, M, E) {
    if (b.visible === !1) return;
    if (b.layers.test(R.layers) && (b.isMesh || b.isLine || b.isPoints) && (b.castShadow || b.receiveShadow && E === 3) && (!b.frustumCulled || i.intersectsObject(b))) {
      b.modelViewMatrix.multiplyMatrices(I.matrixWorldInverse, b.matrixWorld);
      const F = t.update(b), H = b.material;
      if (Array.isArray(H)) {
        const B = F.groups;
        for (let j = 0, V = B.length; j < V; j++) {
          const te = B[j], W = H[te.materialIndex];
          if (W && W.visible) {
            const ee = v(b, W, M, E);
            b.onBeforeShadow(e, b, R, I, F, ee, te), e.renderBufferDirect(I, null, F, ee, b, te), b.onAfterShadow(e, b, R, I, F, ee, te);
          }
        }
      } else if (H.visible) {
        const B = v(b, H, M, E);
        b.onBeforeShadow(e, b, R, I, F, B, null), e.renderBufferDirect(I, null, F, B, b, null), b.onAfterShadow(e, b, R, I, F, B, null);
      }
    }
    const P = b.children;
    for (let F = 0, H = P.length; F < H; F++) S(P[F], R, I, M, E);
  }
  function A(b) {
    b.target.removeEventListener("dispose", A);
    for (const R in c) {
      const I = c[R], M = b.target.uuid;
      M in I && (I[M].dispose(), delete I[M]);
    }
  }
}
var Ap = {
  0: 1,
  2: 6,
  4: 7,
  3: 5,
  1: 0,
  6: 2,
  7: 4,
  5: 3
};
function wp(e, t) {
  function n() {
    let D = !1;
    const _e = new tt();
    let de = null;
    const we = new tt(0, 0, 0, 0);
    return {
      setMask: function(oe) {
        de !== oe && !D && (e.colorMask(oe, oe, oe, oe), de = oe);
      },
      setLocked: function(oe) {
        D = oe;
      },
      setClear: function(oe, $, Ae, Ie, dt) {
        dt === !0 && (oe *= Ie, $ *= Ie, Ae *= Ie), _e.set(oe, $, Ae, Ie), we.equals(_e) === !1 && (e.clearColor(oe, $, Ae, Ie), we.copy(_e));
      },
      reset: function() {
        D = !1, de = null, we.set(-1, 0, 0, 0);
      }
    };
  }
  function i() {
    let D = !1, _e = !1, de = null, we = null, oe = null;
    return {
      setReversed: function($) {
        if (_e !== $) {
          const Ae = t.get("EXT_clip_control");
          $ ? Ae.clipControlEXT(Ae.LOWER_LEFT_EXT, Ae.ZERO_TO_ONE_EXT) : Ae.clipControlEXT(Ae.LOWER_LEFT_EXT, Ae.NEGATIVE_ONE_TO_ONE_EXT), _e = $;
          const Ie = oe;
          oe = null, this.setClear(Ie);
        }
      },
      getReversed: function() {
        return _e;
      },
      setTest: function($) {
        $ ? G(e.DEPTH_TEST) : ce(e.DEPTH_TEST);
      },
      setMask: function($) {
        de !== $ && !D && (e.depthMask($), de = $);
      },
      setFunc: function($) {
        if (_e && ($ = Ap[$]), we !== $) {
          switch ($) {
            case 0:
              e.depthFunc(e.NEVER);
              break;
            case 1:
              e.depthFunc(e.ALWAYS);
              break;
            case 2:
              e.depthFunc(e.LESS);
              break;
            case 3:
              e.depthFunc(e.LEQUAL);
              break;
            case 4:
              e.depthFunc(e.EQUAL);
              break;
            case 5:
              e.depthFunc(e.GEQUAL);
              break;
            case 6:
              e.depthFunc(e.GREATER);
              break;
            case 7:
              e.depthFunc(e.NOTEQUAL);
              break;
            default:
              e.depthFunc(e.LEQUAL);
          }
          we = $;
        }
      },
      setLocked: function($) {
        D = $;
      },
      setClear: function($) {
        oe !== $ && (_e && ($ = 1 - $), e.clearDepth($), oe = $);
      },
      reset: function() {
        D = !1, de = null, we = null, oe = null, _e = !1;
      }
    };
  }
  function s() {
    let D = !1, _e = null, de = null, we = null, oe = null, $ = null, Ae = null, Ie = null, dt = null;
    return {
      setTest: function(nt) {
        D || (nt ? G(e.STENCIL_TEST) : ce(e.STENCIL_TEST));
      },
      setMask: function(nt) {
        _e !== nt && !D && (e.stencilMask(nt), _e = nt);
      },
      setFunc: function(nt, Jt, $t) {
        (de !== nt || we !== Jt || oe !== $t) && (e.stencilFunc(nt, Jt, $t), de = nt, we = Jt, oe = $t);
      },
      setOp: function(nt, Jt, $t) {
        ($ !== nt || Ae !== Jt || Ie !== $t) && (e.stencilOp(nt, Jt, $t), $ = nt, Ae = Jt, Ie = $t);
      },
      setLocked: function(nt) {
        D = nt;
      },
      setClear: function(nt) {
        dt !== nt && (e.clearStencil(nt), dt = nt);
      },
      reset: function() {
        D = !1, _e = null, de = null, we = null, oe = null, $ = null, Ae = null, Ie = null, dt = null;
      }
    };
  }
  const r = new n(), o = new i(), a = new s(), l = /* @__PURE__ */ new WeakMap(), c = /* @__PURE__ */ new WeakMap();
  let h = {}, u = {}, d = /* @__PURE__ */ new WeakMap(), p = [], _ = null, g = !1, m = null, f = null, y = null, v = null, S = null, A = null, b = null, R = new Be(0, 0, 0), I = 0, M = !1, E = null, P = null, F = null, H = null, B = null;
  const j = e.getParameter(e.MAX_COMBINED_TEXTURE_IMAGE_UNITS);
  let V = !1, te = 0;
  const W = e.getParameter(e.VERSION);
  W.indexOf("WebGL") !== -1 ? (te = parseFloat(/^WebGL (\d)/.exec(W)[1]), V = te >= 1) : W.indexOf("OpenGL ES") !== -1 && (te = parseFloat(/^OpenGL ES (\d)/.exec(W)[1]), V = te >= 2);
  let ee = null, pe = {};
  const De = e.getParameter(e.SCISSOR_BOX), Ne = e.getParameter(e.VIEWPORT), Qe = new tt().fromArray(De), Ke = new tt().fromArray(Ne);
  function Y(D, _e, de, we) {
    const oe = new Uint8Array(4), $ = e.createTexture();
    e.bindTexture(D, $), e.texParameteri(D, e.TEXTURE_MIN_FILTER, e.NEAREST), e.texParameteri(D, e.TEXTURE_MAG_FILTER, e.NEAREST);
    for (let Ae = 0; Ae < de; Ae++) D === e.TEXTURE_3D || D === e.TEXTURE_2D_ARRAY ? e.texImage3D(_e, 0, e.RGBA, 1, 1, we, 0, e.RGBA, e.UNSIGNED_BYTE, oe) : e.texImage2D(_e + Ae, 0, e.RGBA, 1, 1, 0, e.RGBA, e.UNSIGNED_BYTE, oe);
    return $;
  }
  const q = {};
  q[e.TEXTURE_2D] = Y(e.TEXTURE_2D, e.TEXTURE_2D, 1), q[e.TEXTURE_CUBE_MAP] = Y(e.TEXTURE_CUBE_MAP, e.TEXTURE_CUBE_MAP_POSITIVE_X, 6), q[e.TEXTURE_2D_ARRAY] = Y(e.TEXTURE_2D_ARRAY, e.TEXTURE_2D_ARRAY, 1, 1), q[e.TEXTURE_3D] = Y(e.TEXTURE_3D, e.TEXTURE_3D, 1, 1), r.setClear(0, 0, 0, 1), o.setClear(1), a.setClear(0), G(e.DEPTH_TEST), o.setFunc(3), J(!1), fe(1), G(e.CULL_FACE), Q(0);
  function G(D) {
    h[D] !== !0 && (e.enable(D), h[D] = !0);
  }
  function ce(D) {
    h[D] !== !1 && (e.disable(D), h[D] = !1);
  }
  function Me(D, _e) {
    return u[D] !== _e ? (e.bindFramebuffer(D, _e), u[D] = _e, D === e.DRAW_FRAMEBUFFER && (u[e.FRAMEBUFFER] = _e), D === e.FRAMEBUFFER && (u[e.DRAW_FRAMEBUFFER] = _e), !0) : !1;
  }
  function ge(D, _e) {
    let de = p, we = !1;
    if (D) {
      de = d.get(_e), de === void 0 && (de = [], d.set(_e, de));
      const oe = D.textures;
      if (de.length !== oe.length || de[0] !== e.COLOR_ATTACHMENT0) {
        for (let $ = 0, Ae = oe.length; $ < Ae; $++) de[$] = e.COLOR_ATTACHMENT0 + $;
        de.length = oe.length, we = !0;
      }
    } else de[0] !== e.BACK && (de[0] = e.BACK, we = !0);
    we && e.drawBuffers(de);
  }
  function ze(D) {
    return _ !== D ? (e.useProgram(D), _ = D, !0) : !1;
  }
  const L = {
    100: e.FUNC_ADD,
    101: e.FUNC_SUBTRACT,
    102: e.FUNC_REVERSE_SUBTRACT
  };
  L[103] = e.MIN, L[104] = e.MAX;
  const Z = {
    200: e.ZERO,
    201: e.ONE,
    202: e.SRC_COLOR,
    204: e.SRC_ALPHA,
    210: e.SRC_ALPHA_SATURATE,
    208: e.DST_COLOR,
    206: e.DST_ALPHA,
    203: e.ONE_MINUS_SRC_COLOR,
    205: e.ONE_MINUS_SRC_ALPHA,
    209: e.ONE_MINUS_DST_COLOR,
    207: e.ONE_MINUS_DST_ALPHA,
    211: e.CONSTANT_COLOR,
    212: e.ONE_MINUS_CONSTANT_COLOR,
    213: e.CONSTANT_ALPHA,
    214: e.ONE_MINUS_CONSTANT_ALPHA
  };
  function Q(D, _e, de, we, oe, $, Ae, Ie, dt, nt) {
    if (D === 0) {
      g === !0 && (ce(e.BLEND), g = !1);
      return;
    }
    if (g === !1 && (G(e.BLEND), g = !0), D !== 5) {
      if (D !== m || nt !== M) {
        if ((f !== 100 || S !== 100) && (e.blendEquation(e.FUNC_ADD), f = 100, S = 100), nt) switch (D) {
          case 1:
            e.blendFuncSeparate(e.ONE, e.ONE_MINUS_SRC_ALPHA, e.ONE, e.ONE_MINUS_SRC_ALPHA);
            break;
          case 2:
            e.blendFunc(e.ONE, e.ONE);
            break;
          case 3:
            e.blendFuncSeparate(e.ZERO, e.ONE_MINUS_SRC_COLOR, e.ZERO, e.ONE);
            break;
          case 4:
            e.blendFuncSeparate(e.DST_COLOR, e.ONE_MINUS_SRC_ALPHA, e.ZERO, e.ONE);
            break;
          default:
            console.error("THREE.WebGLState: Invalid blending: ", D);
            break;
        }
        else switch (D) {
          case 1:
            e.blendFuncSeparate(e.SRC_ALPHA, e.ONE_MINUS_SRC_ALPHA, e.ONE, e.ONE_MINUS_SRC_ALPHA);
            break;
          case 2:
            e.blendFuncSeparate(e.SRC_ALPHA, e.ONE, e.ONE, e.ONE);
            break;
          case 3:
            console.error("THREE.WebGLState: SubtractiveBlending requires material.premultipliedAlpha = true");
            break;
          case 4:
            console.error("THREE.WebGLState: MultiplyBlending requires material.premultipliedAlpha = true");
            break;
          default:
            console.error("THREE.WebGLState: Invalid blending: ", D);
            break;
        }
        y = null, v = null, A = null, b = null, R.set(0, 0, 0), I = 0, m = D, M = nt;
      }
      return;
    }
    oe = oe || _e, $ = $ || de, Ae = Ae || we, (_e !== f || oe !== S) && (e.blendEquationSeparate(L[_e], L[oe]), f = _e, S = oe), (de !== y || we !== v || $ !== A || Ae !== b) && (e.blendFuncSeparate(Z[de], Z[we], Z[$], Z[Ae]), y = de, v = we, A = $, b = Ae), (Ie.equals(R) === !1 || dt !== I) && (e.blendColor(Ie.r, Ie.g, Ie.b, dt), R.copy(Ie), I = dt), m = D, M = !1;
  }
  function se(D, _e) {
    D.side === 2 ? ce(e.CULL_FACE) : G(e.CULL_FACE);
    let de = D.side === 1;
    _e && (de = !de), J(de), D.blending === 1 && D.transparent === !1 ? Q(0) : Q(D.blending, D.blendEquation, D.blendSrc, D.blendDst, D.blendEquationAlpha, D.blendSrcAlpha, D.blendDstAlpha, D.blendColor, D.blendAlpha, D.premultipliedAlpha), o.setFunc(D.depthFunc), o.setTest(D.depthTest), o.setMask(D.depthWrite), r.setMask(D.colorWrite);
    const we = D.stencilWrite;
    a.setTest(we), we && (a.setMask(D.stencilWriteMask), a.setFunc(D.stencilFunc, D.stencilRef, D.stencilFuncMask), a.setOp(D.stencilFail, D.stencilZFail, D.stencilZPass)), ae(D.polygonOffset, D.polygonOffsetFactor, D.polygonOffsetUnits), D.alphaToCoverage === !0 ? G(e.SAMPLE_ALPHA_TO_COVERAGE) : ce(e.SAMPLE_ALPHA_TO_COVERAGE);
  }
  function J(D) {
    E !== D && (D ? e.frontFace(e.CW) : e.frontFace(e.CCW), E = D);
  }
  function fe(D) {
    D !== 0 ? (G(e.CULL_FACE), D !== P && (D === 1 ? e.cullFace(e.BACK) : D === 2 ? e.cullFace(e.FRONT) : e.cullFace(e.FRONT_AND_BACK))) : ce(e.CULL_FACE), P = D;
  }
  function he(D) {
    D !== F && (V && e.lineWidth(D), F = D);
  }
  function ae(D, _e, de) {
    D ? (G(e.POLYGON_OFFSET_FILL), (H !== _e || B !== de) && (e.polygonOffset(_e, de), H = _e, B = de)) : ce(e.POLYGON_OFFSET_FILL);
  }
  function ke(D) {
    D ? G(e.SCISSOR_TEST) : ce(e.SCISSOR_TEST);
  }
  function He(D) {
    D === void 0 && (D = e.TEXTURE0 + j - 1), ee !== D && (e.activeTexture(D), ee = D);
  }
  function Xe(D, _e, de) {
    de === void 0 && (ee === null ? de = e.TEXTURE0 + j - 1 : de = ee);
    let we = pe[de];
    we === void 0 && (we = {
      type: void 0,
      texture: void 0
    }, pe[de] = we), (we.type !== D || we.texture !== _e) && (ee !== de && (e.activeTexture(de), ee = de), e.bindTexture(D, _e || q[D]), we.type = D, we.texture = _e);
  }
  function w() {
    const D = pe[ee];
    D !== void 0 && D.type !== void 0 && (e.bindTexture(D.type, null), D.type = void 0, D.texture = void 0);
  }
  function x() {
    try {
      e.compressedTexImage2D(...arguments);
    } catch (D) {
      console.error("THREE.WebGLState:", D);
    }
  }
  function U() {
    try {
      e.compressedTexImage3D(...arguments);
    } catch (D) {
      console.error("THREE.WebGLState:", D);
    }
  }
  function K() {
    try {
      e.texSubImage2D(...arguments);
    } catch (D) {
      console.error("THREE.WebGLState:", D);
    }
  }
  function ne() {
    try {
      e.texSubImage3D(...arguments);
    } catch (D) {
      console.error("THREE.WebGLState:", D);
    }
  }
  function X() {
    try {
      e.compressedTexSubImage2D(...arguments);
    } catch (D) {
      console.error("THREE.WebGLState:", D);
    }
  }
  function Se() {
    try {
      e.compressedTexSubImage3D(...arguments);
    } catch (D) {
      console.error("THREE.WebGLState:", D);
    }
  }
  function ue() {
    try {
      e.texStorage2D(...arguments);
    } catch (D) {
      console.error("THREE.WebGLState:", D);
    }
  }
  function be() {
    try {
      e.texStorage3D(...arguments);
    } catch (D) {
      console.error("THREE.WebGLState:", D);
    }
  }
  function Le() {
    try {
      e.texImage2D(...arguments);
    } catch (D) {
      console.error("THREE.WebGLState:", D);
    }
  }
  function le() {
    try {
      e.texImage3D(...arguments);
    } catch (D) {
      console.error("THREE.WebGLState:", D);
    }
  }
  function ve(D) {
    Qe.equals(D) === !1 && (e.scissor(D.x, D.y, D.z, D.w), Qe.copy(D));
  }
  function Ce(D) {
    Ke.equals(D) === !1 && (e.viewport(D.x, D.y, D.z, D.w), Ke.copy(D));
  }
  function Pe(D, _e) {
    let de = c.get(_e);
    de === void 0 && (de = /* @__PURE__ */ new WeakMap(), c.set(_e, de));
    let we = de.get(D);
    we === void 0 && (we = e.getUniformBlockIndex(_e, D.name), de.set(D, we));
  }
  function xe(D, _e) {
    const de = c.get(_e).get(D);
    l.get(_e) !== de && (e.uniformBlockBinding(_e, de, D.__bindingPointIndex), l.set(_e, de));
  }
  function Ye() {
    e.disable(e.BLEND), e.disable(e.CULL_FACE), e.disable(e.DEPTH_TEST), e.disable(e.POLYGON_OFFSET_FILL), e.disable(e.SCISSOR_TEST), e.disable(e.STENCIL_TEST), e.disable(e.SAMPLE_ALPHA_TO_COVERAGE), e.blendEquation(e.FUNC_ADD), e.blendFunc(e.ONE, e.ZERO), e.blendFuncSeparate(e.ONE, e.ZERO, e.ONE, e.ZERO), e.blendColor(0, 0, 0, 0), e.colorMask(!0, !0, !0, !0), e.clearColor(0, 0, 0, 0), e.depthMask(!0), e.depthFunc(e.LESS), o.setReversed(!1), e.clearDepth(1), e.stencilMask(4294967295), e.stencilFunc(e.ALWAYS, 0, 4294967295), e.stencilOp(e.KEEP, e.KEEP, e.KEEP), e.clearStencil(0), e.cullFace(e.BACK), e.frontFace(e.CCW), e.polygonOffset(0, 0), e.activeTexture(e.TEXTURE0), e.bindFramebuffer(e.FRAMEBUFFER, null), e.bindFramebuffer(e.DRAW_FRAMEBUFFER, null), e.bindFramebuffer(e.READ_FRAMEBUFFER, null), e.useProgram(null), e.lineWidth(1), e.scissor(0, 0, e.canvas.width, e.canvas.height), e.viewport(0, 0, e.canvas.width, e.canvas.height), h = {}, ee = null, pe = {}, u = {}, d = /* @__PURE__ */ new WeakMap(), p = [], _ = null, g = !1, m = null, f = null, y = null, v = null, S = null, A = null, b = null, R = new Be(0, 0, 0), I = 0, M = !1, E = null, P = null, F = null, H = null, B = null, Qe.set(0, 0, e.canvas.width, e.canvas.height), Ke.set(0, 0, e.canvas.width, e.canvas.height), r.reset(), o.reset(), a.reset();
  }
  return {
    buffers: {
      color: r,
      depth: o,
      stencil: a
    },
    enable: G,
    disable: ce,
    bindFramebuffer: Me,
    drawBuffers: ge,
    useProgram: ze,
    setBlending: Q,
    setMaterial: se,
    setFlipSided: J,
    setCullFace: fe,
    setLineWidth: he,
    setPolygonOffset: ae,
    setScissorTest: ke,
    activeTexture: He,
    bindTexture: Xe,
    unbindTexture: w,
    compressedTexImage2D: x,
    compressedTexImage3D: U,
    texImage2D: Le,
    texImage3D: le,
    updateUBOMapping: Pe,
    uniformBlockBinding: xe,
    texStorage2D: ue,
    texStorage3D: be,
    texSubImage2D: K,
    texSubImage3D: ne,
    compressedTexSubImage2D: X,
    compressedTexSubImage3D: Se,
    scissor: ve,
    viewport: Ce,
    reset: Ye
  };
}
function Rp(e, t, n, i, s, r, o) {
  const a = t.has("WEBGL_multisampled_render_to_texture") ? t.get("WEBGL_multisampled_render_to_texture") : null, l = typeof navigator > "u" ? !1 : /OculusBrowser/g.test(navigator.userAgent), c = new re(), h = /* @__PURE__ */ new WeakMap();
  let u;
  const d = /* @__PURE__ */ new WeakMap();
  let p = !1;
  try {
    p = typeof OffscreenCanvas < "u" && new OffscreenCanvas(1, 1).getContext("2d") !== null;
  } catch {
  }
  function _(w, x) {
    return p ? new OffscreenCanvas(w, x) : qi("canvas");
  }
  function g(w, x, U) {
    let K = 1;
    const ne = Xe(w);
    if ((ne.width > U || ne.height > U) && (K = U / Math.max(ne.width, ne.height)), K < 1) if (typeof HTMLImageElement < "u" && w instanceof HTMLImageElement || typeof HTMLCanvasElement < "u" && w instanceof HTMLCanvasElement || typeof ImageBitmap < "u" && w instanceof ImageBitmap || typeof VideoFrame < "u" && w instanceof VideoFrame) {
      const X = Math.floor(K * ne.width), Se = Math.floor(K * ne.height);
      u === void 0 && (u = _(X, Se));
      const ue = x ? _(X, Se) : u;
      return ue.width = X, ue.height = Se, ue.getContext("2d").drawImage(w, 0, 0, X, Se), console.warn("THREE.WebGLRenderer: Texture has been resized from (" + ne.width + "x" + ne.height + ") to (" + X + "x" + Se + ")."), ue;
    } else
      return "data" in w && console.warn("THREE.WebGLRenderer: Image in DataTexture is too big (" + ne.width + "x" + ne.height + ")."), w;
    return w;
  }
  function m(w) {
    return w.generateMipmaps;
  }
  function f(w) {
    e.generateMipmap(w);
  }
  function y(w) {
    return w.isWebGLCubeRenderTarget ? e.TEXTURE_CUBE_MAP : w.isWebGL3DRenderTarget ? e.TEXTURE_3D : w.isWebGLArrayRenderTarget || w.isCompressedArrayTexture ? e.TEXTURE_2D_ARRAY : e.TEXTURE_2D;
  }
  function v(w, x, U, K, ne = !1) {
    if (w !== null) {
      if (e[w] !== void 0) return e[w];
      console.warn("THREE.WebGLRenderer: Attempt to use non-existing WebGL internal format '" + w + "'");
    }
    let X = x;
    if (x === e.RED && (U === e.FLOAT && (X = e.R32F), U === e.HALF_FLOAT && (X = e.R16F), U === e.UNSIGNED_BYTE && (X = e.R8)), x === e.RED_INTEGER && (U === e.UNSIGNED_BYTE && (X = e.R8UI), U === e.UNSIGNED_SHORT && (X = e.R16UI), U === e.UNSIGNED_INT && (X = e.R32UI), U === e.BYTE && (X = e.R8I), U === e.SHORT && (X = e.R16I), U === e.INT && (X = e.R32I)), x === e.RG && (U === e.FLOAT && (X = e.RG32F), U === e.HALF_FLOAT && (X = e.RG16F), U === e.UNSIGNED_BYTE && (X = e.RG8)), x === e.RG_INTEGER && (U === e.UNSIGNED_BYTE && (X = e.RG8UI), U === e.UNSIGNED_SHORT && (X = e.RG16UI), U === e.UNSIGNED_INT && (X = e.RG32UI), U === e.BYTE && (X = e.RG8I), U === e.SHORT && (X = e.RG16I), U === e.INT && (X = e.RG32I)), x === e.RGB_INTEGER && (U === e.UNSIGNED_BYTE && (X = e.RGB8UI), U === e.UNSIGNED_SHORT && (X = e.RGB16UI), U === e.UNSIGNED_INT && (X = e.RGB32UI), U === e.BYTE && (X = e.RGB8I), U === e.SHORT && (X = e.RGB16I), U === e.INT && (X = e.RGB32I)), x === e.RGBA_INTEGER && (U === e.UNSIGNED_BYTE && (X = e.RGBA8UI), U === e.UNSIGNED_SHORT && (X = e.RGBA16UI), U === e.UNSIGNED_INT && (X = e.RGBA32UI), U === e.BYTE && (X = e.RGBA8I), U === e.SHORT && (X = e.RGBA16I), U === e.INT && (X = e.RGBA32I)), x === e.RGB && (U === e.UNSIGNED_INT_5_9_9_9_REV && (X = e.RGB9_E5), U === e.UNSIGNED_INT_10F_11F_11F_REV && (X = e.R11F_G11F_B10F)), x === e.RGBA) {
      const Se = ne ? Gs : Ze.getTransfer(K);
      U === e.FLOAT && (X = e.RGBA32F), U === e.HALF_FLOAT && (X = e.RGBA16F), U === e.UNSIGNED_BYTE && (X = Se === "srgb" ? e.SRGB8_ALPHA8 : e.RGBA8), U === e.UNSIGNED_SHORT_4_4_4_4 && (X = e.RGBA4), U === e.UNSIGNED_SHORT_5_5_5_1 && (X = e.RGB5_A1);
    }
    return (X === e.R16F || X === e.R32F || X === e.RG16F || X === e.RG32F || X === e.RGBA16F || X === e.RGBA32F) && t.get("EXT_color_buffer_float"), X;
  }
  function S(w, x) {
    let U;
    return w ? x === null || x === 1014 || x === 1020 ? U = e.DEPTH24_STENCIL8 : x === 1015 ? U = e.DEPTH32F_STENCIL8 : x === 1012 && (U = e.DEPTH24_STENCIL8, console.warn("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")) : x === null || x === 1014 || x === 1020 ? U = e.DEPTH_COMPONENT24 : x === 1015 ? U = e.DEPTH_COMPONENT32F : x === 1012 && (U = e.DEPTH_COMPONENT16), U;
  }
  function A(w, x) {
    return m(w) === !0 || w.isFramebufferTexture && w.minFilter !== 1003 && w.minFilter !== 1006 ? Math.log2(Math.max(x.width, x.height)) + 1 : w.mipmaps !== void 0 && w.mipmaps.length > 0 ? w.mipmaps.length : w.isCompressedTexture && Array.isArray(w.image) ? x.mipmaps.length : 1;
  }
  function b(w) {
    const x = w.target;
    x.removeEventListener("dispose", b), I(x), x.isVideoTexture && h.delete(x);
  }
  function R(w) {
    const x = w.target;
    x.removeEventListener("dispose", R), E(x);
  }
  function I(w) {
    const x = i.get(w);
    if (x.__webglInit === void 0) return;
    const U = w.source, K = d.get(U);
    if (K) {
      const ne = K[x.__cacheKey];
      ne.usedTimes--, ne.usedTimes === 0 && M(w), Object.keys(K).length === 0 && d.delete(U);
    }
    i.remove(w);
  }
  function M(w) {
    const x = i.get(w);
    e.deleteTexture(x.__webglTexture);
    const U = w.source, K = d.get(U);
    delete K[x.__cacheKey], o.memory.textures--;
  }
  function E(w) {
    const x = i.get(w);
    if (w.depthTexture && (w.depthTexture.dispose(), i.remove(w.depthTexture)), w.isWebGLCubeRenderTarget) for (let K = 0; K < 6; K++) {
      if (Array.isArray(x.__webglFramebuffer[K])) for (let ne = 0; ne < x.__webglFramebuffer[K].length; ne++) e.deleteFramebuffer(x.__webglFramebuffer[K][ne]);
      else e.deleteFramebuffer(x.__webglFramebuffer[K]);
      x.__webglDepthbuffer && e.deleteRenderbuffer(x.__webglDepthbuffer[K]);
    }
    else {
      if (Array.isArray(x.__webglFramebuffer)) for (let K = 0; K < x.__webglFramebuffer.length; K++) e.deleteFramebuffer(x.__webglFramebuffer[K]);
      else e.deleteFramebuffer(x.__webglFramebuffer);
      if (x.__webglDepthbuffer && e.deleteRenderbuffer(x.__webglDepthbuffer), x.__webglMultisampledFramebuffer && e.deleteFramebuffer(x.__webglMultisampledFramebuffer), x.__webglColorRenderbuffer)
        for (let K = 0; K < x.__webglColorRenderbuffer.length; K++) x.__webglColorRenderbuffer[K] && e.deleteRenderbuffer(x.__webglColorRenderbuffer[K]);
      x.__webglDepthRenderbuffer && e.deleteRenderbuffer(x.__webglDepthRenderbuffer);
    }
    const U = w.textures;
    for (let K = 0, ne = U.length; K < ne; K++) {
      const X = i.get(U[K]);
      X.__webglTexture && (e.deleteTexture(X.__webglTexture), o.memory.textures--), i.remove(U[K]);
    }
    i.remove(w);
  }
  let P = 0;
  function F() {
    P = 0;
  }
  function H() {
    const w = P;
    return w >= s.maxTextures && console.warn("THREE.WebGLTextures: Trying to use " + w + " texture units while this GPU supports only " + s.maxTextures), P += 1, w;
  }
  function B(w) {
    const x = [];
    return x.push(w.wrapS), x.push(w.wrapT), x.push(w.wrapR || 0), x.push(w.magFilter), x.push(w.minFilter), x.push(w.anisotropy), x.push(w.internalFormat), x.push(w.format), x.push(w.type), x.push(w.generateMipmaps), x.push(w.premultiplyAlpha), x.push(w.flipY), x.push(w.unpackAlignment), x.push(w.colorSpace), x.join();
  }
  function j(w, x) {
    const U = i.get(w);
    if (w.isVideoTexture && ke(w), w.isRenderTargetTexture === !1 && w.isExternalTexture !== !0 && w.version > 0 && U.__version !== w.version) {
      const K = w.image;
      if (K === null) console.warn("THREE.WebGLRenderer: Texture marked for update but no image data found.");
      else if (K.complete === !1) console.warn("THREE.WebGLRenderer: Texture marked for update but image is incomplete");
      else {
        q(U, w, x);
        return;
      }
    } else w.isExternalTexture && (U.__webglTexture = w.sourceTexture ? w.sourceTexture : null);
    n.bindTexture(e.TEXTURE_2D, U.__webglTexture, e.TEXTURE0 + x);
  }
  function V(w, x) {
    const U = i.get(w);
    if (w.isRenderTargetTexture === !1 && w.version > 0 && U.__version !== w.version) {
      q(U, w, x);
      return;
    }
    n.bindTexture(e.TEXTURE_2D_ARRAY, U.__webglTexture, e.TEXTURE0 + x);
  }
  function te(w, x) {
    const U = i.get(w);
    if (w.isRenderTargetTexture === !1 && w.version > 0 && U.__version !== w.version) {
      q(U, w, x);
      return;
    }
    n.bindTexture(e.TEXTURE_3D, U.__webglTexture, e.TEXTURE0 + x);
  }
  function W(w, x) {
    const U = i.get(w);
    if (w.version > 0 && U.__version !== w.version) {
      G(U, w, x);
      return;
    }
    n.bindTexture(e.TEXTURE_CUBE_MAP, U.__webglTexture, e.TEXTURE0 + x);
  }
  const ee = {
    [Wi]: e.REPEAT,
    [bn]: e.CLAMP_TO_EDGE,
    [Vs]: e.MIRRORED_REPEAT
  }, pe = {
    [Vt]: e.NEAREST,
    [ja]: e.NEAREST_MIPMAP_NEAREST,
    [Za]: e.NEAREST_MIPMAP_LINEAR,
    [gn]: e.LINEAR,
    [Ja]: e.LINEAR_MIPMAP_NEAREST,
    [es]: e.LINEAR_MIPMAP_LINEAR
  }, De = {
    512: e.NEVER,
    519: e.ALWAYS,
    513: e.LESS,
    515: e.LEQUAL,
    514: e.EQUAL,
    518: e.GEQUAL,
    516: e.GREATER,
    517: e.NOTEQUAL
  };
  function Ne(w, x) {
    if (x.type === 1015 && t.has("OES_texture_float_linear") === !1 && (x.magFilter === 1006 || x.magFilter === 1007 || x.magFilter === 1005 || x.magFilter === 1008 || x.minFilter === 1006 || x.minFilter === 1007 || x.minFilter === 1005 || x.minFilter === 1008) && console.warn("THREE.WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."), e.texParameteri(w, e.TEXTURE_WRAP_S, ee[x.wrapS]), e.texParameteri(w, e.TEXTURE_WRAP_T, ee[x.wrapT]), (w === e.TEXTURE_3D || w === e.TEXTURE_2D_ARRAY) && e.texParameteri(w, e.TEXTURE_WRAP_R, ee[x.wrapR]), e.texParameteri(w, e.TEXTURE_MAG_FILTER, pe[x.magFilter]), e.texParameteri(w, e.TEXTURE_MIN_FILTER, pe[x.minFilter]), x.compareFunction && (e.texParameteri(w, e.TEXTURE_COMPARE_MODE, e.COMPARE_REF_TO_TEXTURE), e.texParameteri(w, e.TEXTURE_COMPARE_FUNC, De[x.compareFunction])), t.has("EXT_texture_filter_anisotropic") === !0) {
      if (x.magFilter === 1003 || x.minFilter !== 1005 && x.minFilter !== 1008 || x.type === 1015 && t.has("OES_texture_float_linear") === !1) return;
      if (x.anisotropy > 1 || i.get(x).__currentAnisotropy) {
        const U = t.get("EXT_texture_filter_anisotropic");
        e.texParameterf(w, U.TEXTURE_MAX_ANISOTROPY_EXT, Math.min(x.anisotropy, s.getMaxAnisotropy())), i.get(x).__currentAnisotropy = x.anisotropy;
      }
    }
  }
  function Qe(w, x) {
    let U = !1;
    w.__webglInit === void 0 && (w.__webglInit = !0, x.addEventListener("dispose", b));
    const K = x.source;
    let ne = d.get(K);
    ne === void 0 && (ne = {}, d.set(K, ne));
    const X = B(x);
    if (X !== w.__cacheKey) {
      ne[X] === void 0 && (ne[X] = {
        texture: e.createTexture(),
        usedTimes: 0
      }, o.memory.textures++, U = !0), ne[X].usedTimes++;
      const Se = ne[w.__cacheKey];
      Se !== void 0 && (ne[w.__cacheKey].usedTimes--, Se.usedTimes === 0 && M(x)), w.__cacheKey = X, w.__webglTexture = ne[X].texture;
    }
    return U;
  }
  function Ke(w, x, U) {
    return Math.floor(Math.floor(w / U) / x);
  }
  function Y(w, x, U, K) {
    const X = w.updateRanges;
    if (X.length === 0) n.texSubImage2D(e.TEXTURE_2D, 0, 0, 0, x.width, x.height, U, K, x.data);
    else {
      X.sort((le, ve) => le.start - ve.start);
      let Se = 0;
      for (let le = 1; le < X.length; le++) {
        const ve = X[Se], Ce = X[le], Pe = ve.start + ve.count, xe = Ke(Ce.start, x.width, 4), Ye = Ke(ve.start, x.width, 4);
        Ce.start <= Pe + 1 && xe === Ye && Ke(Ce.start + Ce.count - 1, x.width, 4) === xe ? ve.count = Math.max(ve.count, Ce.start + Ce.count - ve.start) : (++Se, X[Se] = Ce);
      }
      X.length = Se + 1;
      const ue = e.getParameter(e.UNPACK_ROW_LENGTH), be = e.getParameter(e.UNPACK_SKIP_PIXELS), Le = e.getParameter(e.UNPACK_SKIP_ROWS);
      e.pixelStorei(e.UNPACK_ROW_LENGTH, x.width);
      for (let le = 0, ve = X.length; le < ve; le++) {
        const Ce = X[le], Pe = Math.floor(Ce.start / 4), xe = Math.ceil(Ce.count / 4), Ye = Pe % x.width, D = Math.floor(Pe / x.width), _e = xe, de = 1;
        e.pixelStorei(e.UNPACK_SKIP_PIXELS, Ye), e.pixelStorei(e.UNPACK_SKIP_ROWS, D), n.texSubImage2D(e.TEXTURE_2D, 0, Ye, D, _e, de, U, K, x.data);
      }
      w.clearUpdateRanges(), e.pixelStorei(e.UNPACK_ROW_LENGTH, ue), e.pixelStorei(e.UNPACK_SKIP_PIXELS, be), e.pixelStorei(e.UNPACK_SKIP_ROWS, Le);
    }
  }
  function q(w, x, U) {
    let K = e.TEXTURE_2D;
    (x.isDataArrayTexture || x.isCompressedArrayTexture) && (K = e.TEXTURE_2D_ARRAY), x.isData3DTexture && (K = e.TEXTURE_3D);
    const ne = Qe(w, x), X = x.source;
    n.bindTexture(K, w.__webglTexture, e.TEXTURE0 + U);
    const Se = i.get(X);
    if (X.version !== Se.__version || ne === !0) {
      n.activeTexture(e.TEXTURE0 + U);
      const ue = Ze.getPrimaries(Ze.workingColorSpace), be = x.colorSpace === "" ? null : Ze.getPrimaries(x.colorSpace), Le = x.colorSpace === "" || ue === be ? e.NONE : e.BROWSER_DEFAULT_WEBGL;
      e.pixelStorei(e.UNPACK_FLIP_Y_WEBGL, x.flipY), e.pixelStorei(e.UNPACK_PREMULTIPLY_ALPHA_WEBGL, x.premultiplyAlpha), e.pixelStorei(e.UNPACK_ALIGNMENT, x.unpackAlignment), e.pixelStorei(e.UNPACK_COLORSPACE_CONVERSION_WEBGL, Le);
      let le = g(x.image, !1, s.maxTextureSize);
      le = He(x, le);
      const ve = r.convert(x.format, x.colorSpace), Ce = r.convert(x.type);
      let Pe = v(x.internalFormat, ve, Ce, x.colorSpace, x.isVideoTexture);
      Ne(K, x);
      let xe;
      const Ye = x.mipmaps, D = x.isVideoTexture !== !0, _e = Se.__version === void 0 || ne === !0, de = X.dataReady, we = A(x, le);
      if (x.isDepthTexture)
        Pe = S(x.format === Qa, x.type), _e && (D ? n.texStorage2D(e.TEXTURE_2D, 1, Pe, le.width, le.height) : n.texImage2D(e.TEXTURE_2D, 0, Pe, le.width, le.height, 0, ve, Ce, null));
      else if (x.isDataTexture) if (Ye.length > 0) {
        D && _e && n.texStorage2D(e.TEXTURE_2D, we, Pe, Ye[0].width, Ye[0].height);
        for (let oe = 0, $ = Ye.length; oe < $; oe++)
          xe = Ye[oe], D ? de && n.texSubImage2D(e.TEXTURE_2D, oe, 0, 0, xe.width, xe.height, ve, Ce, xe.data) : n.texImage2D(e.TEXTURE_2D, oe, Pe, xe.width, xe.height, 0, ve, Ce, xe.data);
        x.generateMipmaps = !1;
      } else D ? (_e && n.texStorage2D(e.TEXTURE_2D, we, Pe, le.width, le.height), de && Y(x, le, ve, Ce)) : n.texImage2D(e.TEXTURE_2D, 0, Pe, le.width, le.height, 0, ve, Ce, le.data);
      else if (x.isCompressedTexture) if (x.isCompressedArrayTexture) {
        D && _e && n.texStorage3D(e.TEXTURE_2D_ARRAY, we, Pe, Ye[0].width, Ye[0].height, le.depth);
        for (let oe = 0, $ = Ye.length; oe < $; oe++)
          if (xe = Ye[oe], x.format !== 1023) if (ve !== null) if (D) {
            if (de) if (x.layerUpdates.size > 0) {
              const Ae = da(xe.width, xe.height, x.format, x.type);
              for (const Ie of x.layerUpdates) {
                const dt = xe.data.subarray(Ie * Ae / xe.data.BYTES_PER_ELEMENT, (Ie + 1) * Ae / xe.data.BYTES_PER_ELEMENT);
                n.compressedTexSubImage3D(e.TEXTURE_2D_ARRAY, oe, 0, 0, Ie, xe.width, xe.height, 1, ve, dt);
              }
              x.clearLayerUpdates();
            } else n.compressedTexSubImage3D(e.TEXTURE_2D_ARRAY, oe, 0, 0, 0, xe.width, xe.height, le.depth, ve, xe.data);
          } else n.compressedTexImage3D(e.TEXTURE_2D_ARRAY, oe, Pe, xe.width, xe.height, le.depth, 0, xe.data, 0, 0);
          else console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");
          else D ? de && n.texSubImage3D(e.TEXTURE_2D_ARRAY, oe, 0, 0, 0, xe.width, xe.height, le.depth, ve, Ce, xe.data) : n.texImage3D(e.TEXTURE_2D_ARRAY, oe, Pe, xe.width, xe.height, le.depth, 0, ve, Ce, xe.data);
      } else {
        D && _e && n.texStorage2D(e.TEXTURE_2D, we, Pe, Ye[0].width, Ye[0].height);
        for (let oe = 0, $ = Ye.length; oe < $; oe++)
          xe = Ye[oe], x.format !== 1023 ? ve !== null ? D ? de && n.compressedTexSubImage2D(e.TEXTURE_2D, oe, 0, 0, xe.width, xe.height, ve, xe.data) : n.compressedTexImage2D(e.TEXTURE_2D, oe, Pe, xe.width, xe.height, 0, xe.data) : console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()") : D ? de && n.texSubImage2D(e.TEXTURE_2D, oe, 0, 0, xe.width, xe.height, ve, Ce, xe.data) : n.texImage2D(e.TEXTURE_2D, oe, Pe, xe.width, xe.height, 0, ve, Ce, xe.data);
      }
      else if (x.isDataArrayTexture) if (D) {
        if (_e && n.texStorage3D(e.TEXTURE_2D_ARRAY, we, Pe, le.width, le.height, le.depth), de) if (x.layerUpdates.size > 0) {
          const oe = da(le.width, le.height, x.format, x.type);
          for (const $ of x.layerUpdates) {
            const Ae = le.data.subarray($ * oe / le.data.BYTES_PER_ELEMENT, ($ + 1) * oe / le.data.BYTES_PER_ELEMENT);
            n.texSubImage3D(e.TEXTURE_2D_ARRAY, 0, 0, 0, $, le.width, le.height, 1, ve, Ce, Ae);
          }
          x.clearLayerUpdates();
        } else n.texSubImage3D(e.TEXTURE_2D_ARRAY, 0, 0, 0, 0, le.width, le.height, le.depth, ve, Ce, le.data);
      } else n.texImage3D(e.TEXTURE_2D_ARRAY, 0, Pe, le.width, le.height, le.depth, 0, ve, Ce, le.data);
      else if (x.isData3DTexture) D ? (_e && n.texStorage3D(e.TEXTURE_3D, we, Pe, le.width, le.height, le.depth), de && n.texSubImage3D(e.TEXTURE_3D, 0, 0, 0, 0, le.width, le.height, le.depth, ve, Ce, le.data)) : n.texImage3D(e.TEXTURE_3D, 0, Pe, le.width, le.height, le.depth, 0, ve, Ce, le.data);
      else if (x.isFramebufferTexture) {
        if (_e) if (D) n.texStorage2D(e.TEXTURE_2D, we, Pe, le.width, le.height);
        else {
          let oe = le.width, $ = le.height;
          for (let Ae = 0; Ae < we; Ae++)
            n.texImage2D(e.TEXTURE_2D, Ae, Pe, oe, $, 0, ve, Ce, null), oe >>= 1, $ >>= 1;
        }
      } else if (Ye.length > 0) {
        if (D && _e) {
          const oe = Xe(Ye[0]);
          n.texStorage2D(e.TEXTURE_2D, we, Pe, oe.width, oe.height);
        }
        for (let oe = 0, $ = Ye.length; oe < $; oe++)
          xe = Ye[oe], D ? de && n.texSubImage2D(e.TEXTURE_2D, oe, 0, 0, ve, Ce, xe) : n.texImage2D(e.TEXTURE_2D, oe, Pe, ve, Ce, xe);
        x.generateMipmaps = !1;
      } else if (D) {
        if (_e) {
          const oe = Xe(le);
          n.texStorage2D(e.TEXTURE_2D, we, Pe, oe.width, oe.height);
        }
        de && n.texSubImage2D(e.TEXTURE_2D, 0, 0, 0, ve, Ce, le);
      } else n.texImage2D(e.TEXTURE_2D, 0, Pe, ve, Ce, le);
      m(x) && f(K), Se.__version = X.version, x.onUpdate && x.onUpdate(x);
    }
    w.__version = x.version;
  }
  function G(w, x, U) {
    if (x.image.length !== 6) return;
    const K = Qe(w, x), ne = x.source;
    n.bindTexture(e.TEXTURE_CUBE_MAP, w.__webglTexture, e.TEXTURE0 + U);
    const X = i.get(ne);
    if (ne.version !== X.__version || K === !0) {
      n.activeTexture(e.TEXTURE0 + U);
      const Se = Ze.getPrimaries(Ze.workingColorSpace), ue = x.colorSpace === "" ? null : Ze.getPrimaries(x.colorSpace), be = x.colorSpace === "" || Se === ue ? e.NONE : e.BROWSER_DEFAULT_WEBGL;
      e.pixelStorei(e.UNPACK_FLIP_Y_WEBGL, x.flipY), e.pixelStorei(e.UNPACK_PREMULTIPLY_ALPHA_WEBGL, x.premultiplyAlpha), e.pixelStorei(e.UNPACK_ALIGNMENT, x.unpackAlignment), e.pixelStorei(e.UNPACK_COLORSPACE_CONVERSION_WEBGL, be);
      const Le = x.isCompressedTexture || x.image[0].isCompressedTexture, le = x.image[0] && x.image[0].isDataTexture, ve = [];
      for (let $ = 0; $ < 6; $++)
        !Le && !le ? ve[$] = g(x.image[$], !0, s.maxCubemapSize) : ve[$] = le ? x.image[$].image : x.image[$], ve[$] = He(x, ve[$]);
      const Ce = ve[0], Pe = r.convert(x.format, x.colorSpace), xe = r.convert(x.type), Ye = v(x.internalFormat, Pe, xe, x.colorSpace), D = x.isVideoTexture !== !0, _e = X.__version === void 0 || K === !0, de = ne.dataReady;
      let we = A(x, Ce);
      Ne(e.TEXTURE_CUBE_MAP, x);
      let oe;
      if (Le) {
        D && _e && n.texStorage2D(e.TEXTURE_CUBE_MAP, we, Ye, Ce.width, Ce.height);
        for (let $ = 0; $ < 6; $++) {
          oe = ve[$].mipmaps;
          for (let Ae = 0; Ae < oe.length; Ae++) {
            const Ie = oe[Ae];
            x.format !== 1023 ? Pe !== null ? D ? de && n.compressedTexSubImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X + $, Ae, 0, 0, Ie.width, Ie.height, Pe, Ie.data) : n.compressedTexImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X + $, Ae, Ye, Ie.width, Ie.height, 0, Ie.data) : console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()") : D ? de && n.texSubImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X + $, Ae, 0, 0, Ie.width, Ie.height, Pe, xe, Ie.data) : n.texImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X + $, Ae, Ye, Ie.width, Ie.height, 0, Pe, xe, Ie.data);
          }
        }
      } else {
        if (oe = x.mipmaps, D && _e) {
          oe.length > 0 && we++;
          const $ = Xe(ve[0]);
          n.texStorage2D(e.TEXTURE_CUBE_MAP, we, Ye, $.width, $.height);
        }
        for (let $ = 0; $ < 6; $++) if (le) {
          D ? de && n.texSubImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X + $, 0, 0, 0, ve[$].width, ve[$].height, Pe, xe, ve[$].data) : n.texImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X + $, 0, Ye, ve[$].width, ve[$].height, 0, Pe, xe, ve[$].data);
          for (let Ae = 0; Ae < oe.length; Ae++) {
            const Ie = oe[Ae].image[$].image;
            D ? de && n.texSubImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X + $, Ae + 1, 0, 0, Ie.width, Ie.height, Pe, xe, Ie.data) : n.texImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X + $, Ae + 1, Ye, Ie.width, Ie.height, 0, Pe, xe, Ie.data);
          }
        } else {
          D ? de && n.texSubImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X + $, 0, 0, 0, Pe, xe, ve[$]) : n.texImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X + $, 0, Ye, Pe, xe, ve[$]);
          for (let Ae = 0; Ae < oe.length; Ae++) {
            const Ie = oe[Ae];
            D ? de && n.texSubImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X + $, Ae + 1, 0, 0, Pe, xe, Ie.image[$]) : n.texImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X + $, Ae + 1, Ye, Pe, xe, Ie.image[$]);
          }
        }
      }
      m(x) && f(e.TEXTURE_CUBE_MAP), X.__version = ne.version, x.onUpdate && x.onUpdate(x);
    }
    w.__version = x.version;
  }
  function ce(w, x, U, K, ne, X) {
    const Se = r.convert(U.format, U.colorSpace), ue = r.convert(U.type), be = v(U.internalFormat, Se, ue, U.colorSpace), Le = i.get(x), le = i.get(U);
    if (le.__renderTarget = x, !Le.__hasExternalTextures) {
      const ve = Math.max(1, x.width >> X), Ce = Math.max(1, x.height >> X);
      ne === e.TEXTURE_3D || ne === e.TEXTURE_2D_ARRAY ? n.texImage3D(ne, X, be, ve, Ce, x.depth, 0, Se, ue, null) : n.texImage2D(ne, X, be, ve, Ce, 0, Se, ue, null);
    }
    n.bindFramebuffer(e.FRAMEBUFFER, w), ae(x) ? a.framebufferTexture2DMultisampleEXT(e.FRAMEBUFFER, K, ne, le.__webglTexture, 0, he(x)) : (ne === e.TEXTURE_2D || ne >= e.TEXTURE_CUBE_MAP_POSITIVE_X && ne <= e.TEXTURE_CUBE_MAP_NEGATIVE_Z) && e.framebufferTexture2D(e.FRAMEBUFFER, K, ne, le.__webglTexture, X), n.bindFramebuffer(e.FRAMEBUFFER, null);
  }
  function Me(w, x, U) {
    if (e.bindRenderbuffer(e.RENDERBUFFER, w), x.depthBuffer) {
      const K = x.depthTexture, ne = K && K.isDepthTexture ? K.type : null, X = S(x.stencilBuffer, ne), Se = x.stencilBuffer ? e.DEPTH_STENCIL_ATTACHMENT : e.DEPTH_ATTACHMENT, ue = he(x);
      ae(x) ? a.renderbufferStorageMultisampleEXT(e.RENDERBUFFER, ue, X, x.width, x.height) : U ? e.renderbufferStorageMultisample(e.RENDERBUFFER, ue, X, x.width, x.height) : e.renderbufferStorage(e.RENDERBUFFER, X, x.width, x.height), e.framebufferRenderbuffer(e.FRAMEBUFFER, Se, e.RENDERBUFFER, w);
    } else {
      const K = x.textures;
      for (let ne = 0; ne < K.length; ne++) {
        const X = K[ne], Se = r.convert(X.format, X.colorSpace), ue = r.convert(X.type), be = v(X.internalFormat, Se, ue, X.colorSpace), Le = he(x);
        U && ae(x) === !1 ? e.renderbufferStorageMultisample(e.RENDERBUFFER, Le, be, x.width, x.height) : ae(x) ? a.renderbufferStorageMultisampleEXT(e.RENDERBUFFER, Le, be, x.width, x.height) : e.renderbufferStorage(e.RENDERBUFFER, be, x.width, x.height);
      }
    }
    e.bindRenderbuffer(e.RENDERBUFFER, null);
  }
  function ge(w, x) {
    if (x && x.isWebGLCubeRenderTarget) throw new Error("Depth Texture with cube render targets is not supported");
    if (n.bindFramebuffer(e.FRAMEBUFFER, w), !(x.depthTexture && x.depthTexture.isDepthTexture)) throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");
    const U = i.get(x.depthTexture);
    U.__renderTarget = x, (!U.__webglTexture || x.depthTexture.image.width !== x.width || x.depthTexture.image.height !== x.height) && (x.depthTexture.image.width = x.width, x.depthTexture.image.height = x.height, x.depthTexture.needsUpdate = !0), j(x.depthTexture, 0);
    const K = U.__webglTexture, ne = he(x);
    if (x.depthTexture.format === 1026) ae(x) ? a.framebufferTexture2DMultisampleEXT(e.FRAMEBUFFER, e.DEPTH_ATTACHMENT, e.TEXTURE_2D, K, 0, ne) : e.framebufferTexture2D(e.FRAMEBUFFER, e.DEPTH_ATTACHMENT, e.TEXTURE_2D, K, 0);
    else if (x.depthTexture.format === 1027) ae(x) ? a.framebufferTexture2DMultisampleEXT(e.FRAMEBUFFER, e.DEPTH_STENCIL_ATTACHMENT, e.TEXTURE_2D, K, 0, ne) : e.framebufferTexture2D(e.FRAMEBUFFER, e.DEPTH_STENCIL_ATTACHMENT, e.TEXTURE_2D, K, 0);
    else throw new Error("Unknown depthTexture format");
  }
  function ze(w) {
    const x = i.get(w), U = w.isWebGLCubeRenderTarget === !0;
    if (x.__boundDepthTexture !== w.depthTexture) {
      const K = w.depthTexture;
      if (x.__depthDisposeCallback && x.__depthDisposeCallback(), K) {
        const ne = () => {
          delete x.__boundDepthTexture, delete x.__depthDisposeCallback, K.removeEventListener("dispose", ne);
        };
        K.addEventListener("dispose", ne), x.__depthDisposeCallback = ne;
      }
      x.__boundDepthTexture = K;
    }
    if (w.depthTexture && !x.__autoAllocateDepthBuffer) {
      if (U) throw new Error("target.depthTexture not supported in Cube render targets");
      const K = w.texture.mipmaps;
      K && K.length > 0 ? ge(x.__webglFramebuffer[0], w) : ge(x.__webglFramebuffer, w);
    } else if (U) {
      x.__webglDepthbuffer = [];
      for (let K = 0; K < 6; K++)
        if (n.bindFramebuffer(e.FRAMEBUFFER, x.__webglFramebuffer[K]), x.__webglDepthbuffer[K] === void 0)
          x.__webglDepthbuffer[K] = e.createRenderbuffer(), Me(x.__webglDepthbuffer[K], w, !1);
        else {
          const ne = w.stencilBuffer ? e.DEPTH_STENCIL_ATTACHMENT : e.DEPTH_ATTACHMENT, X = x.__webglDepthbuffer[K];
          e.bindRenderbuffer(e.RENDERBUFFER, X), e.framebufferRenderbuffer(e.FRAMEBUFFER, ne, e.RENDERBUFFER, X);
        }
    } else {
      const K = w.texture.mipmaps;
      if (K && K.length > 0 ? n.bindFramebuffer(e.FRAMEBUFFER, x.__webglFramebuffer[0]) : n.bindFramebuffer(e.FRAMEBUFFER, x.__webglFramebuffer), x.__webglDepthbuffer === void 0)
        x.__webglDepthbuffer = e.createRenderbuffer(), Me(x.__webglDepthbuffer, w, !1);
      else {
        const ne = w.stencilBuffer ? e.DEPTH_STENCIL_ATTACHMENT : e.DEPTH_ATTACHMENT, X = x.__webglDepthbuffer;
        e.bindRenderbuffer(e.RENDERBUFFER, X), e.framebufferRenderbuffer(e.FRAMEBUFFER, ne, e.RENDERBUFFER, X);
      }
    }
    n.bindFramebuffer(e.FRAMEBUFFER, null);
  }
  function L(w, x, U) {
    const K = i.get(w);
    x !== void 0 && ce(K.__webglFramebuffer, w, w.texture, e.COLOR_ATTACHMENT0, e.TEXTURE_2D, 0), U !== void 0 && ze(w);
  }
  function Z(w) {
    const x = w.texture, U = i.get(w), K = i.get(x);
    w.addEventListener("dispose", R);
    const ne = w.textures, X = w.isWebGLCubeRenderTarget === !0, Se = ne.length > 1;
    if (Se || (K.__webglTexture === void 0 && (K.__webglTexture = e.createTexture()), K.__version = x.version, o.memory.textures++), X) {
      U.__webglFramebuffer = [];
      for (let ue = 0; ue < 6; ue++) if (x.mipmaps && x.mipmaps.length > 0) {
        U.__webglFramebuffer[ue] = [];
        for (let be = 0; be < x.mipmaps.length; be++) U.__webglFramebuffer[ue][be] = e.createFramebuffer();
      } else U.__webglFramebuffer[ue] = e.createFramebuffer();
    } else {
      if (x.mipmaps && x.mipmaps.length > 0) {
        U.__webglFramebuffer = [];
        for (let ue = 0; ue < x.mipmaps.length; ue++) U.__webglFramebuffer[ue] = e.createFramebuffer();
      } else U.__webglFramebuffer = e.createFramebuffer();
      if (Se) for (let ue = 0, be = ne.length; ue < be; ue++) {
        const Le = i.get(ne[ue]);
        Le.__webglTexture === void 0 && (Le.__webglTexture = e.createTexture(), o.memory.textures++);
      }
      if (w.samples > 0 && ae(w) === !1) {
        U.__webglMultisampledFramebuffer = e.createFramebuffer(), U.__webglColorRenderbuffer = [], n.bindFramebuffer(e.FRAMEBUFFER, U.__webglMultisampledFramebuffer);
        for (let ue = 0; ue < ne.length; ue++) {
          const be = ne[ue];
          U.__webglColorRenderbuffer[ue] = e.createRenderbuffer(), e.bindRenderbuffer(e.RENDERBUFFER, U.__webglColorRenderbuffer[ue]);
          const Le = r.convert(be.format, be.colorSpace), le = r.convert(be.type), ve = v(be.internalFormat, Le, le, be.colorSpace, w.isXRRenderTarget === !0), Ce = he(w);
          e.renderbufferStorageMultisample(e.RENDERBUFFER, Ce, ve, w.width, w.height), e.framebufferRenderbuffer(e.FRAMEBUFFER, e.COLOR_ATTACHMENT0 + ue, e.RENDERBUFFER, U.__webglColorRenderbuffer[ue]);
        }
        e.bindRenderbuffer(e.RENDERBUFFER, null), w.depthBuffer && (U.__webglDepthRenderbuffer = e.createRenderbuffer(), Me(U.__webglDepthRenderbuffer, w, !0)), n.bindFramebuffer(e.FRAMEBUFFER, null);
      }
    }
    if (X) {
      n.bindTexture(e.TEXTURE_CUBE_MAP, K.__webglTexture), Ne(e.TEXTURE_CUBE_MAP, x);
      for (let ue = 0; ue < 6; ue++) if (x.mipmaps && x.mipmaps.length > 0) for (let be = 0; be < x.mipmaps.length; be++) ce(U.__webglFramebuffer[ue][be], w, x, e.COLOR_ATTACHMENT0, e.TEXTURE_CUBE_MAP_POSITIVE_X + ue, be);
      else ce(U.__webglFramebuffer[ue], w, x, e.COLOR_ATTACHMENT0, e.TEXTURE_CUBE_MAP_POSITIVE_X + ue, 0);
      m(x) && f(e.TEXTURE_CUBE_MAP), n.unbindTexture();
    } else if (Se) {
      for (let ue = 0, be = ne.length; ue < be; ue++) {
        const Le = ne[ue], le = i.get(Le);
        let ve = e.TEXTURE_2D;
        (w.isWebGL3DRenderTarget || w.isWebGLArrayRenderTarget) && (ve = w.isWebGL3DRenderTarget ? e.TEXTURE_3D : e.TEXTURE_2D_ARRAY), n.bindTexture(ve, le.__webglTexture), Ne(ve, Le), ce(U.__webglFramebuffer, w, Le, e.COLOR_ATTACHMENT0 + ue, ve, 0), m(Le) && f(ve);
      }
      n.unbindTexture();
    } else {
      let ue = e.TEXTURE_2D;
      if ((w.isWebGL3DRenderTarget || w.isWebGLArrayRenderTarget) && (ue = w.isWebGL3DRenderTarget ? e.TEXTURE_3D : e.TEXTURE_2D_ARRAY), n.bindTexture(ue, K.__webglTexture), Ne(ue, x), x.mipmaps && x.mipmaps.length > 0) for (let be = 0; be < x.mipmaps.length; be++) ce(U.__webglFramebuffer[be], w, x, e.COLOR_ATTACHMENT0, ue, be);
      else ce(U.__webglFramebuffer, w, x, e.COLOR_ATTACHMENT0, ue, 0);
      m(x) && f(ue), n.unbindTexture();
    }
    w.depthBuffer && ze(w);
  }
  function Q(w) {
    const x = w.textures;
    for (let U = 0, K = x.length; U < K; U++) {
      const ne = x[U];
      if (m(ne)) {
        const X = y(w), Se = i.get(ne).__webglTexture;
        n.bindTexture(X, Se), f(X), n.unbindTexture();
      }
    }
  }
  const se = [], J = [];
  function fe(w) {
    if (w.samples > 0) {
      if (ae(w) === !1) {
        const x = w.textures, U = w.width, K = w.height;
        let ne = e.COLOR_BUFFER_BIT;
        const X = w.stencilBuffer ? e.DEPTH_STENCIL_ATTACHMENT : e.DEPTH_ATTACHMENT, Se = i.get(w), ue = x.length > 1;
        if (ue) for (let Le = 0; Le < x.length; Le++)
          n.bindFramebuffer(e.FRAMEBUFFER, Se.__webglMultisampledFramebuffer), e.framebufferRenderbuffer(e.FRAMEBUFFER, e.COLOR_ATTACHMENT0 + Le, e.RENDERBUFFER, null), n.bindFramebuffer(e.FRAMEBUFFER, Se.__webglFramebuffer), e.framebufferTexture2D(e.DRAW_FRAMEBUFFER, e.COLOR_ATTACHMENT0 + Le, e.TEXTURE_2D, null, 0);
        n.bindFramebuffer(e.READ_FRAMEBUFFER, Se.__webglMultisampledFramebuffer);
        const be = w.texture.mipmaps;
        be && be.length > 0 ? n.bindFramebuffer(e.DRAW_FRAMEBUFFER, Se.__webglFramebuffer[0]) : n.bindFramebuffer(e.DRAW_FRAMEBUFFER, Se.__webglFramebuffer);
        for (let Le = 0; Le < x.length; Le++) {
          if (w.resolveDepthBuffer && (w.depthBuffer && (ne |= e.DEPTH_BUFFER_BIT), w.stencilBuffer && w.resolveStencilBuffer && (ne |= e.STENCIL_BUFFER_BIT)), ue) {
            e.framebufferRenderbuffer(e.READ_FRAMEBUFFER, e.COLOR_ATTACHMENT0, e.RENDERBUFFER, Se.__webglColorRenderbuffer[Le]);
            const le = i.get(x[Le]).__webglTexture;
            e.framebufferTexture2D(e.DRAW_FRAMEBUFFER, e.COLOR_ATTACHMENT0, e.TEXTURE_2D, le, 0);
          }
          e.blitFramebuffer(0, 0, U, K, 0, 0, U, K, ne, e.NEAREST), l === !0 && (se.length = 0, J.length = 0, se.push(e.COLOR_ATTACHMENT0 + Le), w.depthBuffer && w.resolveDepthBuffer === !1 && (se.push(X), J.push(X), e.invalidateFramebuffer(e.DRAW_FRAMEBUFFER, J)), e.invalidateFramebuffer(e.READ_FRAMEBUFFER, se));
        }
        if (n.bindFramebuffer(e.READ_FRAMEBUFFER, null), n.bindFramebuffer(e.DRAW_FRAMEBUFFER, null), ue) for (let Le = 0; Le < x.length; Le++) {
          n.bindFramebuffer(e.FRAMEBUFFER, Se.__webglMultisampledFramebuffer), e.framebufferRenderbuffer(e.FRAMEBUFFER, e.COLOR_ATTACHMENT0 + Le, e.RENDERBUFFER, Se.__webglColorRenderbuffer[Le]);
          const le = i.get(x[Le]).__webglTexture;
          n.bindFramebuffer(e.FRAMEBUFFER, Se.__webglFramebuffer), e.framebufferTexture2D(e.DRAW_FRAMEBUFFER, e.COLOR_ATTACHMENT0 + Le, e.TEXTURE_2D, le, 0);
        }
        n.bindFramebuffer(e.DRAW_FRAMEBUFFER, Se.__webglMultisampledFramebuffer);
      } else if (w.depthBuffer && w.resolveDepthBuffer === !1 && l) {
        const x = w.stencilBuffer ? e.DEPTH_STENCIL_ATTACHMENT : e.DEPTH_ATTACHMENT;
        e.invalidateFramebuffer(e.DRAW_FRAMEBUFFER, [x]);
      }
    }
  }
  function he(w) {
    return Math.min(s.maxSamples, w.samples);
  }
  function ae(w) {
    const x = i.get(w);
    return w.samples > 0 && t.has("WEBGL_multisampled_render_to_texture") === !0 && x.__useRenderToTexture !== !1;
  }
  function ke(w) {
    const x = o.render.frame;
    h.get(w) !== x && (h.set(w, x), w.update());
  }
  function He(w, x) {
    const U = w.colorSpace, K = w.format, ne = w.type;
    return w.isCompressedTexture === !0 || w.isVideoTexture === !0 || U !== "srgb-linear" && U !== "" && (Ze.getTransfer(U) === "srgb" ? (K !== 1023 || ne !== 1009) && console.warn("THREE.WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType.") : console.error("THREE.WebGLTextures: Unsupported texture color space:", U)), x;
  }
  function Xe(w) {
    return typeof HTMLImageElement < "u" && w instanceof HTMLImageElement ? (c.width = w.naturalWidth || w.width, c.height = w.naturalHeight || w.height) : typeof VideoFrame < "u" && w instanceof VideoFrame ? (c.width = w.displayWidth, c.height = w.displayHeight) : (c.width = w.width, c.height = w.height), c;
  }
  this.allocateTextureUnit = H, this.resetTextureUnits = F, this.setTexture2D = j, this.setTexture2DArray = V, this.setTexture3D = te, this.setTextureCube = W, this.rebindTextures = L, this.setupRenderTarget = Z, this.updateRenderTargetMipmap = Q, this.updateMultisampleRenderTarget = fe, this.setupDepthRenderbuffer = ze, this.setupFrameBufferTexture = ce, this.useMultisampledRTT = ae;
}
function Cp(e, t) {
  function n(i, s = "") {
    let r;
    const o = Ze.getTransfer(s);
    if (i === 1009) return e.UNSIGNED_BYTE;
    if (i === 1017) return e.UNSIGNED_SHORT_4_4_4_4;
    if (i === 1018) return e.UNSIGNED_SHORT_5_5_5_1;
    if (i === 35902) return e.UNSIGNED_INT_5_9_9_9_REV;
    if (i === 35899) return e.UNSIGNED_INT_10F_11F_11F_REV;
    if (i === 1010) return e.BYTE;
    if (i === 1011) return e.SHORT;
    if (i === 1012) return e.UNSIGNED_SHORT;
    if (i === 1013) return e.INT;
    if (i === 1014) return e.UNSIGNED_INT;
    if (i === 1015) return e.FLOAT;
    if (i === 1016) return e.HALF_FLOAT;
    if (i === 1021) return e.ALPHA;
    if (i === 1022) return e.RGB;
    if (i === 1023) return e.RGBA;
    if (i === 1026) return e.DEPTH_COMPONENT;
    if (i === 1027) return e.DEPTH_STENCIL;
    if (i === 1028) return e.RED;
    if (i === 1029) return e.RED_INTEGER;
    if (i === 1030) return e.RG;
    if (i === 1031) return e.RG_INTEGER;
    if (i === 1033) return e.RGBA_INTEGER;
    if (i === 33776 || i === 33777 || i === 33778 || i === 33779) if (o === "srgb")
      if (r = t.get("WEBGL_compressed_texture_s3tc_srgb"), r !== null) {
        if (i === 33776) return r.COMPRESSED_SRGB_S3TC_DXT1_EXT;
        if (i === 33777) return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;
        if (i === 33778) return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;
        if (i === 33779) return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT;
      } else return null;
    else if (r = t.get("WEBGL_compressed_texture_s3tc"), r !== null) {
      if (i === 33776) return r.COMPRESSED_RGB_S3TC_DXT1_EXT;
      if (i === 33777) return r.COMPRESSED_RGBA_S3TC_DXT1_EXT;
      if (i === 33778) return r.COMPRESSED_RGBA_S3TC_DXT3_EXT;
      if (i === 33779) return r.COMPRESSED_RGBA_S3TC_DXT5_EXT;
    } else return null;
    if (i === 35840 || i === 35841 || i === 35842 || i === 35843)
      if (r = t.get("WEBGL_compressed_texture_pvrtc"), r !== null) {
        if (i === 35840) return r.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;
        if (i === 35841) return r.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;
        if (i === 35842) return r.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;
        if (i === 35843) return r.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG;
      } else return null;
    if (i === 36196 || i === 37492 || i === 37496)
      if (r = t.get("WEBGL_compressed_texture_etc"), r !== null) {
        if (i === 36196 || i === 37492) return o === "srgb" ? r.COMPRESSED_SRGB8_ETC2 : r.COMPRESSED_RGB8_ETC2;
        if (i === 37496) return o === "srgb" ? r.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC : r.COMPRESSED_RGBA8_ETC2_EAC;
      } else return null;
    if (i === 37808 || i === 37809 || i === 37810 || i === 37811 || i === 37812 || i === 37813 || i === 37814 || i === 37815 || i === 37816 || i === 37817 || i === 37818 || i === 37819 || i === 37820 || i === 37821)
      if (r = t.get("WEBGL_compressed_texture_astc"), r !== null) {
        if (i === 37808) return o === "srgb" ? r.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR : r.COMPRESSED_RGBA_ASTC_4x4_KHR;
        if (i === 37809) return o === "srgb" ? r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR : r.COMPRESSED_RGBA_ASTC_5x4_KHR;
        if (i === 37810) return o === "srgb" ? r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR : r.COMPRESSED_RGBA_ASTC_5x5_KHR;
        if (i === 37811) return o === "srgb" ? r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR : r.COMPRESSED_RGBA_ASTC_6x5_KHR;
        if (i === 37812) return o === "srgb" ? r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR : r.COMPRESSED_RGBA_ASTC_6x6_KHR;
        if (i === 37813) return o === "srgb" ? r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR : r.COMPRESSED_RGBA_ASTC_8x5_KHR;
        if (i === 37814) return o === "srgb" ? r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR : r.COMPRESSED_RGBA_ASTC_8x6_KHR;
        if (i === 37815) return o === "srgb" ? r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR : r.COMPRESSED_RGBA_ASTC_8x8_KHR;
        if (i === 37816) return o === "srgb" ? r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR : r.COMPRESSED_RGBA_ASTC_10x5_KHR;
        if (i === 37817) return o === "srgb" ? r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR : r.COMPRESSED_RGBA_ASTC_10x6_KHR;
        if (i === 37818) return o === "srgb" ? r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR : r.COMPRESSED_RGBA_ASTC_10x8_KHR;
        if (i === 37819) return o === "srgb" ? r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR : r.COMPRESSED_RGBA_ASTC_10x10_KHR;
        if (i === 37820) return o === "srgb" ? r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR : r.COMPRESSED_RGBA_ASTC_12x10_KHR;
        if (i === 37821) return o === "srgb" ? r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR : r.COMPRESSED_RGBA_ASTC_12x12_KHR;
      } else return null;
    if (i === 36492 || i === 36494 || i === 36495)
      if (r = t.get("EXT_texture_compression_bptc"), r !== null) {
        if (i === 36492) return o === "srgb" ? r.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT : r.COMPRESSED_RGBA_BPTC_UNORM_EXT;
        if (i === 36494) return r.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;
        if (i === 36495) return r.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT;
      } else return null;
    if (i === 36283 || i === 36284 || i === 36285 || i === 36286)
      if (r = t.get("EXT_texture_compression_rgtc"), r !== null) {
        if (i === 36283) return r.COMPRESSED_RED_RGTC1_EXT;
        if (i === 36284) return r.COMPRESSED_SIGNED_RED_RGTC1_EXT;
        if (i === 36285) return r.COMPRESSED_RED_GREEN_RGTC2_EXT;
        if (i === 36286) return r.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT;
      } else return null;
    return i === 1020 ? e.UNSIGNED_INT_24_8 : e[i] !== void 0 ? e[i] : null;
  }
  return { convert: n };
}
var Pp = `
void main() {

	gl_Position = vec4( position, 1.0 );

}`, Lp = `
uniform sampler2DArray depthColor;
uniform float depthWidth;
uniform float depthHeight;

void main() {

	vec2 coord = vec2( gl_FragCoord.x / depthWidth, gl_FragCoord.y / depthHeight );

	if ( coord.x >= 1.0 ) {

		gl_FragDepth = texture( depthColor, vec3( coord.x - 1.0, coord.y, 1 ) ).r;

	} else {

		gl_FragDepth = texture( depthColor, vec3( coord.x, coord.y, 0 ) ).r;

	}

}`, Ip = class {
  constructor() {
    this.texture = null, this.mesh = null, this.depthNear = 0, this.depthFar = 0;
  }
  init(e, t) {
    if (this.texture === null) {
      const n = new El(e.texture);
      (e.depthNear !== t.depthNear || e.depthFar !== t.depthFar) && (this.depthNear = e.depthNear, this.depthFar = e.depthFar), this.texture = n;
    }
  }
  getMesh(e) {
    if (this.texture !== null && this.mesh === null) {
      const t = e.cameras[0].viewport, n = new wn({
        vertexShader: Pp,
        fragmentShader: Lp,
        uniforms: {
          depthColor: { value: this.texture },
          depthWidth: { value: t.z },
          depthHeight: { value: t.w }
        }
      });
      this.mesh = new Tt(new Bl(20, 20), n);
    }
    return this.mesh;
  }
  reset() {
    this.texture = null, this.mesh = null;
  }
  getDepthTexture() {
    return this.texture;
  }
}, Dp = class extends Gn {
  constructor(e, t) {
    super();
    const n = this;
    let i = null, s = 1, r = null, o = "local-floor", a = 1, l = null, c = null, h = null, u = null, d = null, p = null;
    const _ = typeof XRWebGLBinding < "u", g = new Ip(), m = {}, f = t.getContextAttributes();
    let y = null, v = null;
    const S = [], A = [], b = new re();
    let R = null;
    const I = new Ct();
    I.viewport = new tt();
    const M = new Ct();
    M.viewport = new tt();
    const E = [I, M], P = new Md();
    let F = null, H = null;
    this.cameraAutoUpdate = !0, this.enabled = !1, this.isPresenting = !1, this.getController = function(Y) {
      let q = S[Y];
      return q === void 0 && (q = new Er(), S[Y] = q), q.getTargetRaySpace();
    }, this.getControllerGrip = function(Y) {
      let q = S[Y];
      return q === void 0 && (q = new Er(), S[Y] = q), q.getGripSpace();
    }, this.getHand = function(Y) {
      let q = S[Y];
      return q === void 0 && (q = new Er(), S[Y] = q), q.getHandSpace();
    };
    function B(Y) {
      const q = A.indexOf(Y.inputSource);
      if (q === -1) return;
      const G = S[q];
      G !== void 0 && (G.update(Y.inputSource, Y.frame, l || r), G.dispatchEvent({
        type: Y.type,
        data: Y.inputSource
      }));
    }
    function j() {
      i.removeEventListener("select", B), i.removeEventListener("selectstart", B), i.removeEventListener("selectend", B), i.removeEventListener("squeeze", B), i.removeEventListener("squeezestart", B), i.removeEventListener("squeezeend", B), i.removeEventListener("end", j), i.removeEventListener("inputsourceschange", V);
      for (let Y = 0; Y < S.length; Y++) {
        const q = A[Y];
        q !== null && (A[Y] = null, S[Y].disconnect(q));
      }
      F = null, H = null, g.reset();
      for (const Y in m) delete m[Y];
      e.setRenderTarget(y), d = null, u = null, h = null, i = null, v = null, Ke.stop(), n.isPresenting = !1, e.setPixelRatio(R), e.setSize(b.width, b.height, !1), n.dispatchEvent({ type: "sessionend" });
    }
    this.setFramebufferScaleFactor = function(Y) {
      s = Y, n.isPresenting === !0 && console.warn("THREE.WebXRManager: Cannot change framebuffer scale while presenting.");
    }, this.setReferenceSpaceType = function(Y) {
      o = Y, n.isPresenting === !0 && console.warn("THREE.WebXRManager: Cannot change reference space type while presenting.");
    }, this.getReferenceSpace = function() {
      return l || r;
    }, this.setReferenceSpace = function(Y) {
      l = Y;
    }, this.getBaseLayer = function() {
      return u !== null ? u : d;
    }, this.getBinding = function() {
      return h === null && _ && (h = new XRWebGLBinding(i, t)), h;
    }, this.getFrame = function() {
      return p;
    }, this.getSession = function() {
      return i;
    }, this.setSession = async function(Y) {
      if (i = Y, i !== null) {
        if (y = e.getRenderTarget(), i.addEventListener("select", B), i.addEventListener("selectstart", B), i.addEventListener("selectend", B), i.addEventListener("squeeze", B), i.addEventListener("squeezestart", B), i.addEventListener("squeezeend", B), i.addEventListener("end", j), i.addEventListener("inputsourceschange", V), f.xrCompatible !== !0 && await t.makeXRCompatible(), R = e.getPixelRatio(), e.getSize(b), _ && "createProjectionLayer" in XRWebGLBinding.prototype) {
          let q = null, G = null, ce = null;
          f.depth && (ce = f.stencil ? t.DEPTH24_STENCIL8 : t.DEPTH_COMPONENT24, q = f.stencil ? Qa : $a, G = f.stencil ? Sc : no);
          const Me = {
            colorFormat: t.RGBA8,
            depthFormat: ce,
            scaleFactor: s
          };
          h = this.getBinding(), u = h.createProjectionLayer(Me), i.updateRenderState({ layers: [u] }), e.setPixelRatio(1), e.setSize(u.textureWidth, u.textureHeight, !1), v = new Hn(u.textureWidth, u.textureHeight, {
            format: kn,
            type: fi,
            depthTexture: new Sl(u.textureWidth, u.textureHeight, G, void 0, void 0, void 0, void 0, void 0, void 0, q),
            stencilBuffer: f.stencil,
            colorSpace: e.outputColorSpace,
            samples: f.antialias ? 4 : 0,
            resolveDepthBuffer: u.ignoreDepthValues === !1,
            resolveStencilBuffer: u.ignoreDepthValues === !1
          });
        } else {
          const q = {
            antialias: f.antialias,
            alpha: !0,
            depth: f.depth,
            stencil: f.stencil,
            framebufferScaleFactor: s
          };
          d = new XRWebGLLayer(i, t, q), i.updateRenderState({ baseLayer: d }), e.setPixelRatio(1), e.setSize(d.framebufferWidth, d.framebufferHeight, !1), v = new Hn(d.framebufferWidth, d.framebufferHeight, {
            format: kn,
            type: fi,
            colorSpace: e.outputColorSpace,
            stencilBuffer: f.stencil,
            resolveDepthBuffer: d.ignoreDepthValues === !1,
            resolveStencilBuffer: d.ignoreDepthValues === !1
          });
        }
        v.isXRRenderTarget = !0, this.setFoveation(a), l = null, r = await i.requestReferenceSpace(o), Ke.setContext(i), Ke.start(), n.isPresenting = !0, n.dispatchEvent({ type: "sessionstart" });
      }
    }, this.getEnvironmentBlendMode = function() {
      if (i !== null) return i.environmentBlendMode;
    }, this.getDepthTexture = function() {
      return g.getDepthTexture();
    };
    function V(Y) {
      for (let q = 0; q < Y.removed.length; q++) {
        const G = Y.removed[q], ce = A.indexOf(G);
        ce >= 0 && (A[ce] = null, S[ce].disconnect(G));
      }
      for (let q = 0; q < Y.added.length; q++) {
        const G = Y.added[q];
        let ce = A.indexOf(G);
        if (ce === -1) {
          for (let ge = 0; ge < S.length; ge++) if (ge >= A.length) {
            A.push(G), ce = ge;
            break;
          } else if (A[ge] === null) {
            A[ge] = G, ce = ge;
            break;
          }
          if (ce === -1) break;
        }
        const Me = S[ce];
        Me && Me.connect(G);
      }
    }
    const te = new C(), W = new C();
    function ee(Y, q, G) {
      te.setFromMatrixPosition(q.matrixWorld), W.setFromMatrixPosition(G.matrixWorld);
      const ce = te.distanceTo(W), Me = q.projectionMatrix.elements, ge = G.projectionMatrix.elements, ze = Me[14] / (Me[10] - 1), L = Me[14] / (Me[10] + 1), Z = (Me[9] + 1) / Me[5], Q = (Me[9] - 1) / Me[5], se = (Me[8] - 1) / Me[0], J = (ge[8] + 1) / ge[0], fe = ze * se, he = ze * J, ae = ce / (-se + J), ke = ae * -se;
      if (q.matrixWorld.decompose(Y.position, Y.quaternion, Y.scale), Y.translateX(ke), Y.translateZ(ae), Y.matrixWorld.compose(Y.position, Y.quaternion, Y.scale), Y.matrixWorldInverse.copy(Y.matrixWorld).invert(), Me[10] === -1)
        Y.projectionMatrix.copy(q.projectionMatrix), Y.projectionMatrixInverse.copy(q.projectionMatrixInverse);
      else {
        const He = ze + ae, Xe = L + ae, w = fe - ke, x = he + (ce - ke), U = Z * L / Xe * He, K = Q * L / Xe * He;
        Y.projectionMatrix.makePerspective(w, x, U, K, He, Xe), Y.projectionMatrixInverse.copy(Y.projectionMatrix).invert();
      }
    }
    function pe(Y, q) {
      q === null ? Y.matrixWorld.copy(Y.matrix) : Y.matrixWorld.multiplyMatrices(q.matrixWorld, Y.matrix), Y.matrixWorldInverse.copy(Y.matrixWorld).invert();
    }
    this.updateCamera = function(Y) {
      if (i === null) return;
      let q = Y.near, G = Y.far;
      g.texture !== null && (g.depthNear > 0 && (q = g.depthNear), g.depthFar > 0 && (G = g.depthFar)), P.near = M.near = I.near = q, P.far = M.far = I.far = G, (F !== P.near || H !== P.far) && (i.updateRenderState({
        depthNear: P.near,
        depthFar: P.far
      }), F = P.near, H = P.far), P.layers.mask = Y.layers.mask | 6, I.layers.mask = P.layers.mask & 3, M.layers.mask = P.layers.mask & 5;
      const ce = Y.parent, Me = P.cameras;
      pe(P, ce);
      for (let ge = 0; ge < Me.length; ge++) pe(Me[ge], ce);
      Me.length === 2 ? ee(P, I, M) : P.projectionMatrix.copy(I.projectionMatrix), De(Y, P, ce);
    };
    function De(Y, q, G) {
      G === null ? Y.matrix.copy(q.matrixWorld) : (Y.matrix.copy(G.matrixWorld), Y.matrix.invert(), Y.matrix.multiply(q.matrixWorld)), Y.matrix.decompose(Y.position, Y.quaternion, Y.scale), Y.updateMatrixWorld(!0), Y.projectionMatrix.copy(q.projectionMatrix), Y.projectionMatrixInverse.copy(q.projectionMatrixInverse), Y.isPerspectiveCamera && (Y.fov = mi * 2 * Math.atan(1 / Y.projectionMatrix.elements[5]), Y.zoom = 1);
    }
    this.getCamera = function() {
      return P;
    }, this.getFoveation = function() {
      if (!(u === null && d === null))
        return a;
    }, this.setFoveation = function(Y) {
      a = Y, u !== null && (u.fixedFoveation = Y), d !== null && d.fixedFoveation !== void 0 && (d.fixedFoveation = Y);
    }, this.hasDepthSensing = function() {
      return g.texture !== null;
    }, this.getDepthSensingMesh = function() {
      return g.getMesh(P);
    }, this.getCameraTexture = function(Y) {
      return m[Y];
    };
    let Ne = null;
    function Qe(Y, q) {
      if (c = q.getViewerPose(l || r), p = q, c !== null) {
        const G = c.views;
        d !== null && (e.setRenderTargetFramebuffer(v, d.framebuffer), e.setRenderTarget(v));
        let ce = !1;
        G.length !== P.cameras.length && (P.cameras.length = 0, ce = !0);
        for (let ge = 0; ge < G.length; ge++) {
          const ze = G[ge];
          let L = null;
          if (d !== null) L = d.getViewport(ze);
          else {
            const Q = h.getViewSubImage(u, ze);
            L = Q.viewport, ge === 0 && (e.setRenderTargetTextures(v, Q.colorTexture, Q.depthStencilTexture), e.setRenderTarget(v));
          }
          let Z = E[ge];
          Z === void 0 && (Z = new Ct(), Z.layers.enable(ge), Z.viewport = new tt(), E[ge] = Z), Z.matrix.fromArray(ze.transform.matrix), Z.matrix.decompose(Z.position, Z.quaternion, Z.scale), Z.projectionMatrix.fromArray(ze.projectionMatrix), Z.projectionMatrixInverse.copy(Z.projectionMatrix).invert(), Z.viewport.set(L.x, L.y, L.width, L.height), ge === 0 && (P.matrix.copy(Z.matrix), P.matrix.decompose(P.position, P.quaternion, P.scale)), ce === !0 && P.cameras.push(Z);
        }
        const Me = i.enabledFeatures;
        if (Me && Me.includes("depth-sensing") && i.depthUsage == "gpu-optimized" && _) {
          h = n.getBinding();
          const ge = h.getDepthInformation(G[0]);
          ge && ge.isValid && ge.texture && g.init(ge, i.renderState);
        }
        if (Me && Me.includes("camera-access") && _) {
          e.state.unbindTexture(), h = n.getBinding();
          for (let ge = 0; ge < G.length; ge++) {
            const ze = G[ge].camera;
            if (ze) {
              let L = m[ze];
              L || (L = new El(), m[ze] = L);
              const Z = h.getCameraImage(ze);
              L.sourceTexture = Z;
            }
          }
        }
      }
      for (let G = 0; G < S.length; G++) {
        const ce = A[G], Me = S[G];
        ce !== null && Me !== void 0 && Me.update(ce, q, l || r);
      }
      Ne && Ne(Y, q), q.detectedPlanes && n.dispatchEvent({
        type: "planesdetected",
        data: q
      }), p = null;
    }
    const Ke = new Xl();
    Ke.setAnimationLoop(Qe), this.setAnimationLoop = function(Y) {
      Ne = Y;
    }, this.dispose = function() {
    };
  }
}, Un = /* @__PURE__ */ new An(), Np = /* @__PURE__ */ new Ve();
function Up(e, t) {
  function n(m, f) {
    m.matrixAutoUpdate === !0 && m.updateMatrix(), f.value.copy(m.matrix);
  }
  function i(m, f) {
    f.color.getRGB(m.fogColor.value, ml(e)), f.isFog ? (m.fogNear.value = f.near, m.fogFar.value = f.far) : f.isFogExp2 && (m.fogDensity.value = f.density);
  }
  function s(m, f, y, v, S) {
    f.isMeshBasicMaterial || f.isMeshLambertMaterial ? r(m, f) : f.isMeshToonMaterial ? (r(m, f), u(m, f)) : f.isMeshPhongMaterial ? (r(m, f), h(m, f)) : f.isMeshStandardMaterial ? (r(m, f), d(m, f), f.isMeshPhysicalMaterial && p(m, f, S)) : f.isMeshMatcapMaterial ? (r(m, f), _(m, f)) : f.isMeshDepthMaterial ? r(m, f) : f.isMeshDistanceMaterial ? (r(m, f), g(m, f)) : f.isMeshNormalMaterial ? r(m, f) : f.isLineBasicMaterial ? (o(m, f), f.isLineDashedMaterial && a(m, f)) : f.isPointsMaterial ? l(m, f, y, v) : f.isSpriteMaterial ? c(m, f) : f.isShadowMaterial ? (m.color.value.copy(f.color), m.opacity.value = f.opacity) : f.isShaderMaterial && (f.uniformsNeedUpdate = !1);
  }
  function r(m, f) {
    m.opacity.value = f.opacity, f.color && m.diffuse.value.copy(f.color), f.emissive && m.emissive.value.copy(f.emissive).multiplyScalar(f.emissiveIntensity), f.map && (m.map.value = f.map, n(f.map, m.mapTransform)), f.alphaMap && (m.alphaMap.value = f.alphaMap, n(f.alphaMap, m.alphaMapTransform)), f.bumpMap && (m.bumpMap.value = f.bumpMap, n(f.bumpMap, m.bumpMapTransform), m.bumpScale.value = f.bumpScale, f.side === 1 && (m.bumpScale.value *= -1)), f.normalMap && (m.normalMap.value = f.normalMap, n(f.normalMap, m.normalMapTransform), m.normalScale.value.copy(f.normalScale), f.side === 1 && m.normalScale.value.negate()), f.displacementMap && (m.displacementMap.value = f.displacementMap, n(f.displacementMap, m.displacementMapTransform), m.displacementScale.value = f.displacementScale, m.displacementBias.value = f.displacementBias), f.emissiveMap && (m.emissiveMap.value = f.emissiveMap, n(f.emissiveMap, m.emissiveMapTransform)), f.specularMap && (m.specularMap.value = f.specularMap, n(f.specularMap, m.specularMapTransform)), f.alphaTest > 0 && (m.alphaTest.value = f.alphaTest);
    const y = t.get(f), v = y.envMap, S = y.envMapRotation;
    v && (m.envMap.value = v, Un.copy(S), Un.x *= -1, Un.y *= -1, Un.z *= -1, v.isCubeTexture && v.isRenderTargetTexture === !1 && (Un.y *= -1, Un.z *= -1), m.envMapRotation.value.setFromMatrix4(Np.makeRotationFromEuler(Un)), m.flipEnvMap.value = v.isCubeTexture && v.isRenderTargetTexture === !1 ? -1 : 1, m.reflectivity.value = f.reflectivity, m.ior.value = f.ior, m.refractionRatio.value = f.refractionRatio), f.lightMap && (m.lightMap.value = f.lightMap, m.lightMapIntensity.value = f.lightMapIntensity, n(f.lightMap, m.lightMapTransform)), f.aoMap && (m.aoMap.value = f.aoMap, m.aoMapIntensity.value = f.aoMapIntensity, n(f.aoMap, m.aoMapTransform));
  }
  function o(m, f) {
    m.diffuse.value.copy(f.color), m.opacity.value = f.opacity, f.map && (m.map.value = f.map, n(f.map, m.mapTransform));
  }
  function a(m, f) {
    m.dashSize.value = f.dashSize, m.totalSize.value = f.dashSize + f.gapSize, m.scale.value = f.scale;
  }
  function l(m, f, y, v) {
    m.diffuse.value.copy(f.color), m.opacity.value = f.opacity, m.size.value = f.size * y, m.scale.value = v * 0.5, f.map && (m.map.value = f.map, n(f.map, m.uvTransform)), f.alphaMap && (m.alphaMap.value = f.alphaMap, n(f.alphaMap, m.alphaMapTransform)), f.alphaTest > 0 && (m.alphaTest.value = f.alphaTest);
  }
  function c(m, f) {
    m.diffuse.value.copy(f.color), m.opacity.value = f.opacity, m.rotation.value = f.rotation, f.map && (m.map.value = f.map, n(f.map, m.mapTransform)), f.alphaMap && (m.alphaMap.value = f.alphaMap, n(f.alphaMap, m.alphaMapTransform)), f.alphaTest > 0 && (m.alphaTest.value = f.alphaTest);
  }
  function h(m, f) {
    m.specular.value.copy(f.specular), m.shininess.value = Math.max(f.shininess, 1e-4);
  }
  function u(m, f) {
    f.gradientMap && (m.gradientMap.value = f.gradientMap);
  }
  function d(m, f) {
    m.metalness.value = f.metalness, f.metalnessMap && (m.metalnessMap.value = f.metalnessMap, n(f.metalnessMap, m.metalnessMapTransform)), m.roughness.value = f.roughness, f.roughnessMap && (m.roughnessMap.value = f.roughnessMap, n(f.roughnessMap, m.roughnessMapTransform)), f.envMap && (m.envMapIntensity.value = f.envMapIntensity);
  }
  function p(m, f, y) {
    m.ior.value = f.ior, f.sheen > 0 && (m.sheenColor.value.copy(f.sheenColor).multiplyScalar(f.sheen), m.sheenRoughness.value = f.sheenRoughness, f.sheenColorMap && (m.sheenColorMap.value = f.sheenColorMap, n(f.sheenColorMap, m.sheenColorMapTransform)), f.sheenRoughnessMap && (m.sheenRoughnessMap.value = f.sheenRoughnessMap, n(f.sheenRoughnessMap, m.sheenRoughnessMapTransform))), f.clearcoat > 0 && (m.clearcoat.value = f.clearcoat, m.clearcoatRoughness.value = f.clearcoatRoughness, f.clearcoatMap && (m.clearcoatMap.value = f.clearcoatMap, n(f.clearcoatMap, m.clearcoatMapTransform)), f.clearcoatRoughnessMap && (m.clearcoatRoughnessMap.value = f.clearcoatRoughnessMap, n(f.clearcoatRoughnessMap, m.clearcoatRoughnessMapTransform)), f.clearcoatNormalMap && (m.clearcoatNormalMap.value = f.clearcoatNormalMap, n(f.clearcoatNormalMap, m.clearcoatNormalMapTransform), m.clearcoatNormalScale.value.copy(f.clearcoatNormalScale), f.side === 1 && m.clearcoatNormalScale.value.negate())), f.dispersion > 0 && (m.dispersion.value = f.dispersion), f.iridescence > 0 && (m.iridescence.value = f.iridescence, m.iridescenceIOR.value = f.iridescenceIOR, m.iridescenceThicknessMinimum.value = f.iridescenceThicknessRange[0], m.iridescenceThicknessMaximum.value = f.iridescenceThicknessRange[1], f.iridescenceMap && (m.iridescenceMap.value = f.iridescenceMap, n(f.iridescenceMap, m.iridescenceMapTransform)), f.iridescenceThicknessMap && (m.iridescenceThicknessMap.value = f.iridescenceThicknessMap, n(f.iridescenceThicknessMap, m.iridescenceThicknessMapTransform))), f.transmission > 0 && (m.transmission.value = f.transmission, m.transmissionSamplerMap.value = y.texture, m.transmissionSamplerSize.value.set(y.width, y.height), f.transmissionMap && (m.transmissionMap.value = f.transmissionMap, n(f.transmissionMap, m.transmissionMapTransform)), m.thickness.value = f.thickness, f.thicknessMap && (m.thicknessMap.value = f.thicknessMap, n(f.thicknessMap, m.thicknessMapTransform)), m.attenuationDistance.value = f.attenuationDistance, m.attenuationColor.value.copy(f.attenuationColor)), f.anisotropy > 0 && (m.anisotropyVector.value.set(f.anisotropy * Math.cos(f.anisotropyRotation), f.anisotropy * Math.sin(f.anisotropyRotation)), f.anisotropyMap && (m.anisotropyMap.value = f.anisotropyMap, n(f.anisotropyMap, m.anisotropyMapTransform))), m.specularIntensity.value = f.specularIntensity, m.specularColor.value.copy(f.specularColor), f.specularColorMap && (m.specularColorMap.value = f.specularColorMap, n(f.specularColorMap, m.specularColorMapTransform)), f.specularIntensityMap && (m.specularIntensityMap.value = f.specularIntensityMap, n(f.specularIntensityMap, m.specularIntensityMapTransform));
  }
  function _(m, f) {
    f.matcap && (m.matcap.value = f.matcap);
  }
  function g(m, f) {
    const y = t.get(f).light;
    m.referencePosition.value.setFromMatrixPosition(y.matrixWorld), m.nearDistance.value = y.shadow.camera.near, m.farDistance.value = y.shadow.camera.far;
  }
  return {
    refreshFogUniforms: i,
    refreshMaterialUniforms: s
  };
}
function Op(e, t, n, i) {
  let s = {}, r = {}, o = [];
  const a = e.getParameter(e.MAX_UNIFORM_BUFFER_BINDINGS);
  function l(y, v) {
    const S = v.program;
    i.uniformBlockBinding(y, S);
  }
  function c(y, v) {
    let S = s[y.id];
    S === void 0 && (_(y), S = h(y), s[y.id] = S, y.addEventListener("dispose", m));
    const A = v.program;
    i.updateUBOMapping(y, A);
    const b = t.render.frame;
    r[y.id] !== b && (d(y), r[y.id] = b);
  }
  function h(y) {
    const v = u();
    y.__bindingPointIndex = v;
    const S = e.createBuffer(), A = y.__size, b = y.usage;
    return e.bindBuffer(e.UNIFORM_BUFFER, S), e.bufferData(e.UNIFORM_BUFFER, A, b), e.bindBuffer(e.UNIFORM_BUFFER, null), e.bindBufferBase(e.UNIFORM_BUFFER, v, S), S;
  }
  function u() {
    for (let y = 0; y < a; y++) if (o.indexOf(y) === -1)
      return o.push(y), y;
    return console.error("THREE.WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."), 0;
  }
  function d(y) {
    const v = s[y.id], S = y.uniforms, A = y.__cache;
    e.bindBuffer(e.UNIFORM_BUFFER, v);
    for (let b = 0, R = S.length; b < R; b++) {
      const I = Array.isArray(S[b]) ? S[b] : [S[b]];
      for (let M = 0, E = I.length; M < E; M++) {
        const P = I[M];
        if (p(P, b, M, A) === !0) {
          const F = P.__offset, H = Array.isArray(P.value) ? P.value : [P.value];
          let B = 0;
          for (let j = 0; j < H.length; j++) {
            const V = H[j], te = g(V);
            typeof V == "number" || typeof V == "boolean" ? (P.__data[0] = V, e.bufferSubData(e.UNIFORM_BUFFER, F + B, P.__data)) : V.isMatrix3 ? (P.__data[0] = V.elements[0], P.__data[1] = V.elements[1], P.__data[2] = V.elements[2], P.__data[3] = 0, P.__data[4] = V.elements[3], P.__data[5] = V.elements[4], P.__data[6] = V.elements[5], P.__data[7] = 0, P.__data[8] = V.elements[6], P.__data[9] = V.elements[7], P.__data[10] = V.elements[8], P.__data[11] = 0) : (V.toArray(P.__data, B), B += te.storage / Float32Array.BYTES_PER_ELEMENT);
          }
          e.bufferSubData(e.UNIFORM_BUFFER, F, P.__data);
        }
      }
    }
    e.bindBuffer(e.UNIFORM_BUFFER, null);
  }
  function p(y, v, S, A) {
    const b = y.value, R = v + "_" + S;
    if (A[R] === void 0)
      return typeof b == "number" || typeof b == "boolean" ? A[R] = b : A[R] = b.clone(), !0;
    {
      const I = A[R];
      if (typeof b == "number" || typeof b == "boolean") {
        if (I !== b)
          return A[R] = b, !0;
      } else if (I.equals(b) === !1)
        return I.copy(b), !0;
    }
    return !1;
  }
  function _(y) {
    const v = y.uniforms;
    let S = 0;
    const A = 16;
    for (let R = 0, I = v.length; R < I; R++) {
      const M = Array.isArray(v[R]) ? v[R] : [v[R]];
      for (let E = 0, P = M.length; E < P; E++) {
        const F = M[E], H = Array.isArray(F.value) ? F.value : [F.value];
        for (let B = 0, j = H.length; B < j; B++) {
          const V = H[B], te = g(V), W = S % A, ee = W % te.boundary, pe = W + ee;
          S += ee, pe !== 0 && A - pe < te.storage && (S += A - pe), F.__data = new Float32Array(te.storage / Float32Array.BYTES_PER_ELEMENT), F.__offset = S, S += te.storage;
        }
      }
    }
    const b = S % A;
    return b > 0 && (S += A - b), y.__size = S, y.__cache = {}, this;
  }
  function g(y) {
    const v = {
      boundary: 0,
      storage: 0
    };
    return typeof y == "number" || typeof y == "boolean" ? (v.boundary = 4, v.storage = 4) : y.isVector2 ? (v.boundary = 8, v.storage = 8) : y.isVector3 || y.isColor ? (v.boundary = 16, v.storage = 12) : y.isVector4 ? (v.boundary = 16, v.storage = 16) : y.isMatrix3 ? (v.boundary = 48, v.storage = 48) : y.isMatrix4 ? (v.boundary = 64, v.storage = 64) : y.isTexture ? console.warn("THREE.WebGLRenderer: Texture samplers can not be part of an uniforms group.") : console.warn("THREE.WebGLRenderer: Unsupported uniform value type.", y), v;
  }
  function m(y) {
    const v = y.target;
    v.removeEventListener("dispose", m);
    const S = o.indexOf(v.__bindingPointIndex);
    o.splice(S, 1), e.deleteBuffer(s[v.id]), delete s[v.id], delete r[v.id];
  }
  function f() {
    for (const y in s) e.deleteBuffer(s[y]);
    o = [], s = {}, r = {};
  }
  return {
    bind: l,
    update: c,
    dispose: f
  };
}
var Fp = class {
  constructor(e = {}) {
    const { canvas: t = Rh(), context: n = null, depth: i = !0, stencil: s = !1, alpha: r = !1, antialias: o = !1, premultipliedAlpha: a = !0, preserveDrawingBuffer: l = !1, powerPreference: c = "default", failIfMajorPerformanceCaveat: h = !1, reversedDepthBuffer: u = !1 } = e;
    this.isWebGLRenderer = !0;
    let d;
    if (n !== null) {
      if (typeof WebGLRenderingContext < "u" && n instanceof WebGLRenderingContext) throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");
      d = n.getContextAttributes().alpha;
    } else d = r;
    const p = new Uint32Array(4), _ = new Int32Array(4);
    let g = null, m = null;
    const f = [], y = [];
    this.domElement = t, this.debug = {
      checkShaderErrors: !0,
      onShaderError: null
    }, this.autoClear = !0, this.autoClearColor = !0, this.autoClearDepth = !0, this.autoClearStencil = !0, this.sortObjects = !0, this.clippingPlanes = [], this.localClippingEnabled = !1, this.toneMapping = 0, this.toneMappingExposure = 1, this.transmissionResolutionScale = 1;
    const v = this;
    let S = !1;
    this._outputColorSpace = xt;
    let A = 0, b = 0, R = null, I = -1, M = null;
    const E = new tt(), P = new tt();
    let F = null;
    const H = new Be(0);
    let B = 0, j = t.width, V = t.height, te = 1, W = null, ee = null;
    const pe = new tt(0, 0, j, V), De = new tt(0, 0, j, V);
    let Ne = !1;
    const Qe = new ao();
    let Ke = !1, Y = !1;
    const q = new Ve(), G = new C(), ce = new tt(), Me = {
      background: null,
      fog: null,
      environment: null,
      overrideMaterial: null,
      isScene: !0
    };
    let ge = !1;
    function ze() {
      return R === null ? te : 1;
    }
    let L = n;
    function Z(T, O) {
      return t.getContext(T, O);
    }
    try {
      const T = {
        alpha: !0,
        depth: i,
        stencil: s,
        antialias: o,
        premultipliedAlpha: a,
        preserveDrawingBuffer: l,
        powerPreference: c,
        failIfMajorPerformanceCaveat: h
      };
      if ("setAttribute" in t && t.setAttribute("data-engine", "three.js r180"), t.addEventListener("webglcontextlost", _e, !1), t.addEventListener("webglcontextrestored", de, !1), t.addEventListener("webglcontextcreationerror", we, !1), L === null) {
        const O = "webgl2";
        if (L = Z(O, T), L === null) throw Z(O) ? new Error("Error creating WebGL context with your selected attributes.") : new Error("Error creating WebGL context.");
      }
    } catch (T) {
      throw console.error("THREE.WebGLRenderer: " + T.message), T;
    }
    let Q, se, J, fe, he, ae, ke, He, Xe, w, x, U, K, ne, X, Se, ue, be, Le, le, ve, Ce, Pe, xe;
    function Ye() {
      Q = new Yd(L), Q.init(), Ce = new Cp(L, Q), se = new zd(L, Q, e, Ce), J = new wp(L, Q), se.reversedDepthBuffer && u && J.buffers.depth.setReversed(!0), fe = new jd(L), he = new pp(), ae = new Rp(L, Q, J, he, se, Ce, fe), ke = new Hd(v), He = new Xd(v), Xe = new Nd(L), Pe = new Fd(L, Xe), w = new qd(L, Xe, fe, Pe), x = new Jd(L, w, Xe, fe), Le = new Zd(L, se, ae), Se = new kd(he), U = new fp(v, ke, He, Q, se, Pe, Se), K = new Up(v, he), ne = new gp(), X = new Sp(Q), be = new Od(v, ke, He, J, x, d, a), ue = new bp(v, x, se), xe = new Op(L, fe, se, J), le = new Bd(L, Q, fe), ve = new Kd(L, Q, fe), fe.programs = U.programs, v.capabilities = se, v.extensions = Q, v.properties = he, v.renderLists = ne, v.shadowMap = ue, v.state = J, v.info = fe;
    }
    Ye();
    const D = new Dp(v, L);
    this.xr = D, this.getContext = function() {
      return L;
    }, this.getContextAttributes = function() {
      return L.getContextAttributes();
    }, this.forceContextLoss = function() {
      const T = Q.get("WEBGL_lose_context");
      T && T.loseContext();
    }, this.forceContextRestore = function() {
      const T = Q.get("WEBGL_lose_context");
      T && T.restoreContext();
    }, this.getPixelRatio = function() {
      return te;
    }, this.setPixelRatio = function(T) {
      T !== void 0 && (te = T, this.setSize(j, V, !1));
    }, this.getSize = function(T) {
      return T.set(j, V);
    }, this.setSize = function(T, O, z = !0) {
      if (D.isPresenting) {
        console.warn("THREE.WebGLRenderer: Can't change size while VR device is presenting.");
        return;
      }
      j = T, V = O, t.width = Math.floor(T * te), t.height = Math.floor(O * te), z === !0 && (t.style.width = T + "px", t.style.height = O + "px"), this.setViewport(0, 0, T, O);
    }, this.getDrawingBufferSize = function(T) {
      return T.set(j * te, V * te).floor();
    }, this.setDrawingBufferSize = function(T, O, z) {
      j = T, V = O, te = z, t.width = Math.floor(T * z), t.height = Math.floor(O * z), this.setViewport(0, 0, T, O);
    }, this.getCurrentViewport = function(T) {
      return T.copy(E);
    }, this.getViewport = function(T) {
      return T.copy(pe);
    }, this.setViewport = function(T, O, z, k) {
      T.isVector4 ? pe.set(T.x, T.y, T.z, T.w) : pe.set(T, O, z, k), J.viewport(E.copy(pe).multiplyScalar(te).round());
    }, this.getScissor = function(T) {
      return T.copy(De);
    }, this.setScissor = function(T, O, z, k) {
      T.isVector4 ? De.set(T.x, T.y, T.z, T.w) : De.set(T, O, z, k), J.scissor(P.copy(De).multiplyScalar(te).round());
    }, this.getScissorTest = function() {
      return Ne;
    }, this.setScissorTest = function(T) {
      J.setScissorTest(Ne = T);
    }, this.setOpaqueSort = function(T) {
      W = T;
    }, this.setTransparentSort = function(T) {
      ee = T;
    }, this.getClearColor = function(T) {
      return T.copy(be.getClearColor());
    }, this.setClearColor = function() {
      be.setClearColor(...arguments);
    }, this.getClearAlpha = function() {
      return be.getClearAlpha();
    }, this.setClearAlpha = function() {
      be.setClearAlpha(...arguments);
    }, this.clear = function(T = !0, O = !0, z = !0) {
      let k = 0;
      if (T) {
        let N = !1;
        if (R !== null) {
          const ie = R.texture.format;
          N = ie === 1033 || ie === 1031 || ie === 1029;
        }
        if (N) {
          const ie = R.texture.type, ye = ie === 1009 || ie === 1014 || ie === 1012 || ie === 1020 || ie === 1017 || ie === 1018, Ee = be.getClearColor(), Te = be.getClearAlpha(), Oe = Ee.r, Fe = Ee.g, Ue = Ee.b;
          ye ? (p[0] = Oe, p[1] = Fe, p[2] = Ue, p[3] = Te, L.clearBufferuiv(L.COLOR, 0, p)) : (_[0] = Oe, _[1] = Fe, _[2] = Ue, _[3] = Te, L.clearBufferiv(L.COLOR, 0, _));
        } else k |= L.COLOR_BUFFER_BIT;
      }
      O && (k |= L.DEPTH_BUFFER_BIT), z && (k |= L.STENCIL_BUFFER_BIT, this.state.buffers.stencil.setMask(4294967295)), L.clear(k);
    }, this.clearColor = function() {
      this.clear(!0, !1, !1);
    }, this.clearDepth = function() {
      this.clear(!1, !0, !1);
    }, this.clearStencil = function() {
      this.clear(!1, !1, !0);
    }, this.dispose = function() {
      t.removeEventListener("webglcontextlost", _e, !1), t.removeEventListener("webglcontextrestored", de, !1), t.removeEventListener("webglcontextcreationerror", we, !1), be.dispose(), ne.dispose(), X.dispose(), he.dispose(), ke.dispose(), He.dispose(), x.dispose(), Pe.dispose(), xe.dispose(), U.dispose(), D.dispose(), D.removeEventListener("sessionstart", Jt), D.removeEventListener("sessionend", $t), Rn.stop();
    };
    function _e(T) {
      T.preventDefault(), console.log("THREE.WebGLRenderer: Context Lost."), S = !0;
    }
    function de() {
      console.log("THREE.WebGLRenderer: Context Restored."), S = !1;
      const T = fe.autoReset, O = ue.enabled, z = ue.autoUpdate, k = ue.needsUpdate, N = ue.type;
      Ye(), fe.autoReset = T, ue.enabled = O, ue.autoUpdate = z, ue.needsUpdate = k, ue.type = N;
    }
    function we(T) {
      console.error("THREE.WebGLRenderer: A WebGL context could not be created. Reason: ", T.statusMessage);
    }
    function oe(T) {
      const O = T.target;
      O.removeEventListener("dispose", oe), $(O);
    }
    function $(T) {
      Ae(T), he.remove(T);
    }
    function Ae(T) {
      const O = he.get(T).programs;
      O !== void 0 && (O.forEach(function(z) {
        U.releaseProgram(z);
      }), T.isShaderMaterial && U.releaseShaderCache(T));
    }
    this.renderBufferDirect = function(T, O, z, k, N, ie) {
      O === null && (O = Me);
      const ye = N.isMesh && N.matrixWorld.determinant() < 0, Ee = ic(T, O, z, k, N);
      J.setMaterial(k, ye);
      let Te = z.index, Oe = 1;
      if (k.wireframe === !0) {
        if (Te = w.getWireframeAttribute(z), Te === void 0) return;
        Oe = 2;
      }
      const Fe = z.drawRange, Ue = z.attributes.position;
      let Je = Fe.start * Oe, st = (Fe.start + Fe.count) * Oe;
      ie !== null && (Je = Math.max(Je, ie.start * Oe), st = Math.min(st, (ie.start + ie.count) * Oe)), Te !== null ? (Je = Math.max(Je, 0), st = Math.min(st, Te.count)) : Ue != null && (Je = Math.max(Je, 0), st = Math.min(st, Ue.count));
      const ot = st - Je;
      if (ot < 0 || ot === 1 / 0) return;
      Pe.setup(N, k, Ee, z, Te);
      let at, rt = le;
      if (Te !== null && (at = Xe.get(Te), rt = ve, rt.setIndex(at)), N.isMesh) k.wireframe === !0 ? (J.setLineWidth(k.wireframeLinewidth * ze()), rt.setMode(L.LINES)) : rt.setMode(L.TRIANGLES);
      else if (N.isLine) {
        let Re = k.linewidth;
        Re === void 0 && (Re = 1), J.setLineWidth(Re * ze()), N.isLineSegments ? rt.setMode(L.LINES) : N.isLineLoop ? rt.setMode(L.LINE_LOOP) : rt.setMode(L.LINE_STRIP);
      } else N.isPoints ? rt.setMode(L.POINTS) : N.isSprite && rt.setMode(L.TRIANGLES);
      if (N.isBatchedMesh) if (N._multiDrawInstances !== null)
        Ki("THREE.WebGLRenderer: renderMultiDrawInstances has been deprecated and will be removed in r184. Append to renderMultiDraw arguments and use indirection."), rt.renderMultiDrawInstances(N._multiDrawStarts, N._multiDrawCounts, N._multiDrawCount, N._multiDrawInstances);
      else if (Q.get("WEBGL_multi_draw"))
        rt.renderMultiDraw(N._multiDrawStarts, N._multiDrawCounts, N._multiDrawCount);
      else {
        const Re = N._multiDrawStarts, yt = N._multiDrawCounts, $e = N._multiDrawCount, Wt = Te ? Xe.get(Te).bytesPerElement : 1, Wn = he.get(k).currentProgram.getUniforms();
        for (let It = 0; It < $e; It++)
          Wn.setValue(L, "_gl_DrawID", It), rt.render(Re[It] / Wt, yt[It]);
      }
      else if (N.isInstancedMesh) rt.renderInstances(Je, ot, N.count);
      else if (z.isInstancedBufferGeometry) {
        const Re = z._maxInstanceCount !== void 0 ? z._maxInstanceCount : 1 / 0, yt = Math.min(z.instanceCount, Re);
        rt.renderInstances(Je, ot, yt);
      } else rt.render(Je, ot);
    };
    function Ie(T, O, z) {
      T.transparent === !0 && T.side === 2 && T.forceSinglePass === !1 ? (T.side = 1, T.needsUpdate = !0, os(T, O, z), T.side = 0, T.needsUpdate = !0, os(T, O, z), T.side = 2) : os(T, O, z);
    }
    this.compile = function(T, O, z = null) {
      z === null && (z = T), m = X.get(z), m.init(O), y.push(m), z.traverseVisible(function(N) {
        N.isLight && N.layers.test(O.layers) && (m.pushLight(N), N.castShadow && m.pushShadow(N));
      }), T !== z && T.traverseVisible(function(N) {
        N.isLight && N.layers.test(O.layers) && (m.pushLight(N), N.castShadow && m.pushShadow(N));
      }), m.setupLights();
      const k = /* @__PURE__ */ new Set();
      return T.traverse(function(N) {
        if (!(N.isMesh || N.isPoints || N.isLine || N.isSprite)) return;
        const ie = N.material;
        if (ie) if (Array.isArray(ie)) for (let ye = 0; ye < ie.length; ye++) {
          const Ee = ie[ye];
          Ie(Ee, z, N), k.add(Ee);
        }
        else
          Ie(ie, z, N), k.add(ie);
      }), m = y.pop(), k;
    }, this.compileAsync = function(T, O, z = null) {
      const k = this.compile(T, O, z);
      return new Promise((N) => {
        function ie() {
          if (k.forEach(function(ye) {
            he.get(ye).currentProgram.isReady() && k.delete(ye);
          }), k.size === 0) {
            N(T);
            return;
          }
          setTimeout(ie, 10);
        }
        Q.get("KHR_parallel_shader_compile") !== null ? ie() : setTimeout(ie, 10);
      });
    };
    let dt = null;
    function nt(T) {
      dt && dt(T);
    }
    function Jt() {
      Rn.stop();
    }
    function $t() {
      Rn.start();
    }
    const Rn = new Xl();
    Rn.setAnimationLoop(nt), typeof self < "u" && Rn.setContext(self), this.setAnimationLoop = function(T) {
      dt = T, D.setAnimationLoop(T), T === null ? Rn.stop() : Rn.start();
    }, D.addEventListener("sessionstart", Jt), D.addEventListener("sessionend", $t), this.render = function(T, O) {
      if (O !== void 0 && O.isCamera !== !0) {
        console.error("THREE.WebGLRenderer.render: camera is not an instance of THREE.Camera.");
        return;
      }
      if (S === !0) return;
      if (T.matrixWorldAutoUpdate === !0 && T.updateMatrixWorld(), O.parent === null && O.matrixWorldAutoUpdate === !0 && O.updateMatrixWorld(), D.enabled === !0 && D.isPresenting === !0 && (D.cameraAutoUpdate === !0 && D.updateCamera(O), O = D.getCamera()), T.isScene === !0 && T.onBeforeRender(v, T, O, R), m = X.get(T, y.length), m.init(O), y.push(m), q.multiplyMatrices(O.projectionMatrix, O.matrixWorldInverse), Qe.setFromProjectionMatrix(q, pi, O.reversedDepth), Y = this.localClippingEnabled, Ke = Se.init(this.clippingPlanes, Y), g = ne.get(T, f.length), g.init(), f.push(g), D.enabled === !0 && D.isPresenting === !0) {
        const ie = v.xr.getDepthSensingMesh();
        ie !== null && Qs(ie, O, -1 / 0, v.sortObjects);
      }
      Qs(T, O, 0, v.sortObjects), g.finish(), v.sortObjects === !0 && g.sort(W, ee), ge = D.enabled === !1 || D.isPresenting === !1 || D.hasDepthSensing() === !1, ge && be.addToRenderList(g, T), this.info.render.frame++, Ke === !0 && Se.beginShadows();
      const z = m.state.shadowsArray;
      ue.render(z, T, O), Ke === !0 && Se.endShadows(), this.info.autoReset === !0 && this.info.reset();
      const k = g.opaque, N = g.transmissive;
      if (m.setupLights(), O.isArrayCamera) {
        const ie = O.cameras;
        if (N.length > 0) for (let ye = 0, Ee = ie.length; ye < Ee; ye++) {
          const Te = ie[ye];
          _o(k, N, T, Te);
        }
        ge && be.render(T);
        for (let ye = 0, Ee = ie.length; ye < Ee; ye++) {
          const Te = ie[ye];
          go(g, T, Te, Te.viewport);
        }
      } else
        N.length > 0 && _o(k, N, T, O), ge && be.render(T), go(g, T, O);
      R !== null && b === 0 && (ae.updateMultisampleRenderTarget(R), ae.updateRenderTargetMipmap(R)), T.isScene === !0 && T.onAfterRender(v, T, O), Pe.resetDefaultState(), I = -1, M = null, y.pop(), y.length > 0 ? (m = y[y.length - 1], Ke === !0 && Se.setGlobalState(v.clippingPlanes, m.state.camera)) : m = null, f.pop(), f.length > 0 ? g = f[f.length - 1] : g = null;
    };
    function Qs(T, O, z, k) {
      if (T.visible === !1) return;
      if (T.layers.test(O.layers)) {
        if (T.isGroup) z = T.renderOrder;
        else if (T.isLOD)
          T.autoUpdate === !0 && T.update(O);
        else if (T.isLight)
          m.pushLight(T), T.castShadow && m.pushShadow(T);
        else if (T.isSprite) {
          if (!T.frustumCulled || Qe.intersectsSprite(T)) {
            k && ce.setFromMatrixPosition(T.matrixWorld).applyMatrix4(q);
            const ie = x.update(T), ye = T.material;
            ye.visible && g.push(T, ie, ye, z, ce.z, null);
          }
        } else if ((T.isMesh || T.isLine || T.isPoints) && (!T.frustumCulled || Qe.intersectsObject(T))) {
          const ie = x.update(T), ye = T.material;
          if (k && (T.boundingSphere !== void 0 ? (T.boundingSphere === null && T.computeBoundingSphere(), ce.copy(T.boundingSphere.center)) : (ie.boundingSphere === null && ie.computeBoundingSphere(), ce.copy(ie.boundingSphere.center)), ce.applyMatrix4(T.matrixWorld).applyMatrix4(q)), Array.isArray(ye)) {
            const Ee = ie.groups;
            for (let Te = 0, Oe = Ee.length; Te < Oe; Te++) {
              const Fe = Ee[Te], Ue = ye[Fe.materialIndex];
              Ue && Ue.visible && g.push(T, ie, Ue, z, ce.z, Fe);
            }
          } else ye.visible && g.push(T, ie, ye, z, ce.z, null);
        }
      }
      const N = T.children;
      for (let ie = 0, ye = N.length; ie < ye; ie++) Qs(N[ie], O, z, k);
    }
    function go(T, O, z, k) {
      const N = T.opaque, ie = T.transmissive, ye = T.transparent;
      m.setupLightsView(z), Ke === !0 && Se.setGlobalState(v.clippingPlanes, z), k && J.viewport(E.copy(k)), N.length > 0 && rs(N, O, z), ie.length > 0 && rs(ie, O, z), ye.length > 0 && rs(ye, O, z), J.buffers.depth.setTest(!0), J.buffers.depth.setMask(!0), J.buffers.color.setMask(!0), J.setPolygonOffset(!1);
    }
    function _o(T, O, z, k) {
      if ((z.isScene === !0 ? z.overrideMaterial : null) !== null) return;
      m.state.transmissionRenderTarget[k.id] === void 0 && (m.state.transmissionRenderTarget[k.id] = new Hn(1, 1, {
        generateMipmaps: !0,
        type: Q.has("EXT_color_buffer_half_float") || Q.has("EXT_color_buffer_float") ? io : fi,
        minFilter: es,
        samples: 4,
        stencilBuffer: s,
        resolveDepthBuffer: !1,
        resolveStencilBuffer: !1,
        colorSpace: Ze.workingColorSpace
      }));
      const N = m.state.transmissionRenderTarget[k.id], ie = k.viewport || E;
      N.setSize(ie.z * v.transmissionResolutionScale, ie.w * v.transmissionResolutionScale);
      const ye = v.getRenderTarget(), Ee = v.getActiveCubeFace(), Te = v.getActiveMipmapLevel();
      v.setRenderTarget(N), v.getClearColor(H), B = v.getClearAlpha(), B < 1 && v.setClearColor(16777215, 0.5), v.clear(), ge && be.render(z);
      const Oe = v.toneMapping;
      v.toneMapping = 0;
      const Fe = k.viewport;
      if (k.viewport !== void 0 && (k.viewport = void 0), m.setupLightsView(k), Ke === !0 && Se.setGlobalState(v.clippingPlanes, k), rs(T, z, k), ae.updateMultisampleRenderTarget(N), ae.updateRenderTargetMipmap(N), Q.has("WEBGL_multisampled_render_to_texture") === !1) {
        let Ue = !1;
        for (let Je = 0, st = O.length; Je < st; Je++) {
          const ot = O[Je], at = ot.object, rt = ot.geometry, Re = ot.material, yt = ot.group;
          if (Re.side === 2 && at.layers.test(k.layers)) {
            const $e = Re.side;
            Re.side = 1, Re.needsUpdate = !0, vo(at, z, k, rt, Re, yt), Re.side = $e, Re.needsUpdate = !0, Ue = !0;
          }
        }
        Ue === !0 && (ae.updateMultisampleRenderTarget(N), ae.updateRenderTargetMipmap(N));
      }
      v.setRenderTarget(ye, Ee, Te), v.setClearColor(H, B), Fe !== void 0 && (k.viewport = Fe), v.toneMapping = Oe;
    }
    function rs(T, O, z) {
      const k = O.isScene === !0 ? O.overrideMaterial : null;
      for (let N = 0, ie = T.length; N < ie; N++) {
        const ye = T[N], Ee = ye.object, Te = ye.geometry, Oe = ye.group;
        let Fe = ye.material;
        Fe.allowOverride === !0 && k !== null && (Fe = k), Ee.layers.test(z.layers) && vo(Ee, O, z, Te, Fe, Oe);
      }
    }
    function vo(T, O, z, k, N, ie) {
      T.onBeforeRender(v, O, z, k, N, ie), T.modelViewMatrix.multiplyMatrices(z.matrixWorldInverse, T.matrixWorld), T.normalMatrix.getNormalMatrix(T.modelViewMatrix), N.onBeforeRender(v, O, z, k, T, ie), N.transparent === !0 && N.side === 2 && N.forceSinglePass === !1 ? (N.side = 1, N.needsUpdate = !0, v.renderBufferDirect(z, O, k, N, T, ie), N.side = 0, N.needsUpdate = !0, v.renderBufferDirect(z, O, k, N, T, ie), N.side = 2) : v.renderBufferDirect(z, O, k, N, T, ie), T.onAfterRender(v, O, z, k, N, ie);
    }
    function os(T, O, z) {
      O.isScene !== !0 && (O = Me);
      const k = he.get(T), N = m.state.lights, ie = m.state.shadowsArray, ye = N.state.version, Ee = U.getParameters(T, N.state, ie, O, z), Te = U.getProgramCacheKey(Ee);
      let Oe = k.programs;
      k.environment = T.isMeshStandardMaterial ? O.environment : null, k.fog = O.fog, k.envMap = (T.isMeshStandardMaterial ? He : ke).get(T.envMap || k.environment), k.envMapRotation = k.environment !== null && T.envMap === null ? O.environmentRotation : T.envMapRotation, Oe === void 0 && (T.addEventListener("dispose", oe), Oe = /* @__PURE__ */ new Map(), k.programs = Oe);
      let Fe = Oe.get(Te);
      if (Fe !== void 0) {
        if (k.currentProgram === Fe && k.lightsStateVersion === ye)
          return yo(T, Ee), Fe;
      } else
        Ee.uniforms = U.getUniforms(T), T.onBeforeCompile(Ee, v), Fe = U.acquireProgram(Ee, Te), Oe.set(Te, Fe), k.uniforms = Ee.uniforms;
      const Ue = k.uniforms;
      return (!T.isShaderMaterial && !T.isRawShaderMaterial || T.clipping === !0) && (Ue.clippingPlanes = Se.uniform), yo(T, Ee), k.needsLights = rc(T), k.lightsStateVersion = ye, k.needsLights && (Ue.ambientLightColor.value = N.state.ambient, Ue.lightProbe.value = N.state.probe, Ue.directionalLights.value = N.state.directional, Ue.directionalLightShadows.value = N.state.directionalShadow, Ue.spotLights.value = N.state.spot, Ue.spotLightShadows.value = N.state.spotShadow, Ue.rectAreaLights.value = N.state.rectArea, Ue.ltc_1.value = N.state.rectAreaLTC1, Ue.ltc_2.value = N.state.rectAreaLTC2, Ue.pointLights.value = N.state.point, Ue.pointLightShadows.value = N.state.pointShadow, Ue.hemisphereLights.value = N.state.hemi, Ue.directionalShadowMap.value = N.state.directionalShadowMap, Ue.directionalShadowMatrix.value = N.state.directionalShadowMatrix, Ue.spotShadowMap.value = N.state.spotShadowMap, Ue.spotLightMatrix.value = N.state.spotLightMatrix, Ue.spotLightMap.value = N.state.spotLightMap, Ue.pointShadowMap.value = N.state.pointShadowMap, Ue.pointShadowMatrix.value = N.state.pointShadowMatrix), k.currentProgram = Fe, k.uniformsList = null, Fe;
    }
    function xo(T) {
      if (T.uniformsList === null) {
        const O = T.currentProgram.getUniforms();
        T.uniformsList = Hs.seqWithValue(O.seq, T.uniforms);
      }
      return T.uniformsList;
    }
    function yo(T, O) {
      const z = he.get(T);
      z.outputColorSpace = O.outputColorSpace, z.batching = O.batching, z.batchingColor = O.batchingColor, z.instancing = O.instancing, z.instancingColor = O.instancingColor, z.instancingMorph = O.instancingMorph, z.skinning = O.skinning, z.morphTargets = O.morphTargets, z.morphNormals = O.morphNormals, z.morphColors = O.morphColors, z.morphTargetsCount = O.morphTargetsCount, z.numClippingPlanes = O.numClippingPlanes, z.numIntersection = O.numClipIntersection, z.vertexAlphas = O.vertexAlphas, z.vertexTangents = O.vertexTangents, z.toneMapping = O.toneMapping;
    }
    function ic(T, O, z, k, N) {
      O.isScene !== !0 && (O = Me), ae.resetTextureUnits();
      const ie = O.fog, ye = k.isMeshStandardMaterial ? O.environment : null, Ee = R === null ? v.outputColorSpace : R.isXRRenderTarget === !0 ? R.texture.colorSpace : Ut, Te = (k.isMeshStandardMaterial ? He : ke).get(k.envMap || ye), Oe = k.vertexColors === !0 && !!z.attributes.color && z.attributes.color.itemSize === 4, Fe = !!z.attributes.tangent && (!!k.normalMap || k.anisotropy > 0), Ue = !!z.morphAttributes.position, Je = !!z.morphAttributes.normal, st = !!z.morphAttributes.color;
      let ot = 0;
      k.toneMapped && (R === null || R.isXRRenderTarget === !0) && (ot = v.toneMapping);
      const at = z.morphAttributes.position || z.morphAttributes.normal || z.morphAttributes.color, rt = at !== void 0 ? at.length : 0, Re = he.get(k), yt = m.state.lights;
      if (Ke === !0 && (Y === !0 || T !== M)) {
        const Mt = T === M && k.id === I;
        Se.setState(k, T, Mt);
      }
      let $e = !1;
      k.version === Re.__version ? (Re.needsLights && Re.lightsStateVersion !== yt.state.version || Re.outputColorSpace !== Ee || N.isBatchedMesh && Re.batching === !1 || !N.isBatchedMesh && Re.batching === !0 || N.isBatchedMesh && Re.batchingColor === !0 && N.colorTexture === null || N.isBatchedMesh && Re.batchingColor === !1 && N.colorTexture !== null || N.isInstancedMesh && Re.instancing === !1 || !N.isInstancedMesh && Re.instancing === !0 || N.isSkinnedMesh && Re.skinning === !1 || !N.isSkinnedMesh && Re.skinning === !0 || N.isInstancedMesh && Re.instancingColor === !0 && N.instanceColor === null || N.isInstancedMesh && Re.instancingColor === !1 && N.instanceColor !== null || N.isInstancedMesh && Re.instancingMorph === !0 && N.morphTexture === null || N.isInstancedMesh && Re.instancingMorph === !1 && N.morphTexture !== null || Re.envMap !== Te || k.fog === !0 && Re.fog !== ie || Re.numClippingPlanes !== void 0 && (Re.numClippingPlanes !== Se.numPlanes || Re.numIntersection !== Se.numIntersection) || Re.vertexAlphas !== Oe || Re.vertexTangents !== Fe || Re.morphTargets !== Ue || Re.morphNormals !== Je || Re.morphColors !== st || Re.toneMapping !== ot || Re.morphTargetsCount !== rt) && ($e = !0) : ($e = !0, Re.__version = k.version);
      let Wt = Re.currentProgram;
      $e === !0 && (Wt = os(k, O, N));
      let Wn = !1, It = !1, bi = !1;
      const lt = Wt.getUniforms(), Ot = Re.uniforms;
      if (J.useProgram(Wt.program) && (Wn = !0, It = !0, bi = !0), k.id !== I && (I = k.id, It = !0), Wn || M !== T) {
        J.buffers.depth.getReversed() && T.reversedDepth !== !0 && (T._reversedDepth = !0, T.updateProjectionMatrix()), lt.setValue(L, "projectionMatrix", T.projectionMatrix), lt.setValue(L, "viewMatrix", T.matrixWorldInverse);
        const Mt = lt.map.cameraPosition;
        Mt !== void 0 && Mt.setValue(L, G.setFromMatrixPosition(T.matrixWorld)), se.logarithmicDepthBuffer && lt.setValue(L, "logDepthBufFC", 2 / (Math.log(T.far + 1) / Math.LN2)), (k.isMeshPhongMaterial || k.isMeshToonMaterial || k.isMeshLambertMaterial || k.isMeshBasicMaterial || k.isMeshStandardMaterial || k.isShaderMaterial) && lt.setValue(L, "isOrthographic", T.isOrthographicCamera === !0), M !== T && (M = T, It = !0, bi = !0);
      }
      if (N.isSkinnedMesh) {
        lt.setOptional(L, N, "bindMatrix"), lt.setOptional(L, N, "bindMatrixInverse");
        const Mt = N.skeleton;
        Mt && (Mt.boneTexture === null && Mt.computeBoneTexture(), lt.setValue(L, "boneTexture", Mt.boneTexture, ae));
      }
      N.isBatchedMesh && (lt.setOptional(L, N, "batchingTexture"), lt.setValue(L, "batchingTexture", N._matricesTexture, ae), lt.setOptional(L, N, "batchingIdTexture"), lt.setValue(L, "batchingIdTexture", N._indirectTexture, ae), lt.setOptional(L, N, "batchingColorTexture"), N._colorsTexture !== null && lt.setValue(L, "batchingColorTexture", N._colorsTexture, ae));
      const Ft = z.morphAttributes;
      if ((Ft.position !== void 0 || Ft.normal !== void 0 || Ft.color !== void 0) && Le.update(N, z, Wt), (It || Re.receiveShadow !== N.receiveShadow) && (Re.receiveShadow = N.receiveShadow, lt.setValue(L, "receiveShadow", N.receiveShadow)), k.isMeshGouraudMaterial && k.envMap !== null && (Ot.envMap.value = Te, Ot.flipEnvMap.value = Te.isCubeTexture && Te.isRenderTargetTexture === !1 ? -1 : 1), k.isMeshStandardMaterial && k.envMap === null && O.environment !== null && (Ot.envMapIntensity.value = O.environmentIntensity), It && (lt.setValue(L, "toneMappingExposure", v.toneMappingExposure), Re.needsLights && sc(Ot, bi), ie && k.fog === !0 && K.refreshFogUniforms(Ot, ie), K.refreshMaterialUniforms(Ot, k, te, V, m.state.transmissionRenderTarget[T.id]), Hs.upload(L, xo(Re), Ot, ae)), k.isShaderMaterial && k.uniformsNeedUpdate === !0 && (Hs.upload(L, xo(Re), Ot, ae), k.uniformsNeedUpdate = !1), k.isSpriteMaterial && lt.setValue(L, "center", N.center), lt.setValue(L, "modelViewMatrix", N.modelViewMatrix), lt.setValue(L, "normalMatrix", N.normalMatrix), lt.setValue(L, "modelMatrix", N.matrixWorld), k.isShaderMaterial || k.isRawShaderMaterial) {
        const Mt = k.uniformsGroups;
        for (let Xt = 0, er = Mt.length; Xt < er; Xt++) {
          const Cn = Mt[Xt];
          xe.update(Cn, Wt), xe.bind(Cn, Wt);
        }
      }
      return Wt;
    }
    function sc(T, O) {
      T.ambientLightColor.needsUpdate = O, T.lightProbe.needsUpdate = O, T.directionalLights.needsUpdate = O, T.directionalLightShadows.needsUpdate = O, T.pointLights.needsUpdate = O, T.pointLightShadows.needsUpdate = O, T.spotLights.needsUpdate = O, T.spotLightShadows.needsUpdate = O, T.rectAreaLights.needsUpdate = O, T.hemisphereLights.needsUpdate = O;
    }
    function rc(T) {
      return T.isMeshLambertMaterial || T.isMeshToonMaterial || T.isMeshPhongMaterial || T.isMeshStandardMaterial || T.isShadowMaterial || T.isShaderMaterial && T.lights === !0;
    }
    this.getActiveCubeFace = function() {
      return A;
    }, this.getActiveMipmapLevel = function() {
      return b;
    }, this.getRenderTarget = function() {
      return R;
    }, this.setRenderTargetTextures = function(T, O, z) {
      const k = he.get(T);
      k.__autoAllocateDepthBuffer = T.resolveDepthBuffer === !1, k.__autoAllocateDepthBuffer === !1 && (k.__useRenderToTexture = !1), he.get(T.texture).__webglTexture = O, he.get(T.depthTexture).__webglTexture = k.__autoAllocateDepthBuffer ? void 0 : z, k.__hasExternalTextures = !0;
    }, this.setRenderTargetFramebuffer = function(T, O) {
      const z = he.get(T);
      z.__webglFramebuffer = O, z.__useDefaultFramebuffer = O === void 0;
    };
    const oc = L.createFramebuffer();
    this.setRenderTarget = function(T, O = 0, z = 0) {
      R = T, A = O, b = z;
      let k = !0, N = null, ie = !1, ye = !1;
      if (T) {
        const Ee = he.get(T);
        if (Ee.__useDefaultFramebuffer !== void 0)
          J.bindFramebuffer(L.FRAMEBUFFER, null), k = !1;
        else if (Ee.__webglFramebuffer === void 0) ae.setupRenderTarget(T);
        else if (Ee.__hasExternalTextures) ae.rebindTextures(T, he.get(T.texture).__webglTexture, he.get(T.depthTexture).__webglTexture);
        else if (T.depthBuffer) {
          const Fe = T.depthTexture;
          if (Ee.__boundDepthTexture !== Fe) {
            if (Fe !== null && he.has(Fe) && (T.width !== Fe.image.width || T.height !== Fe.image.height)) throw new Error("WebGLRenderTarget: Attached DepthTexture is initialized to the incorrect size.");
            ae.setupDepthRenderbuffer(T);
          }
        }
        const Te = T.texture;
        (Te.isData3DTexture || Te.isDataArrayTexture || Te.isCompressedArrayTexture) && (ye = !0);
        const Oe = he.get(T).__webglFramebuffer;
        T.isWebGLCubeRenderTarget ? (Array.isArray(Oe[O]) ? N = Oe[O][z] : N = Oe[O], ie = !0) : T.samples > 0 && ae.useMultisampledRTT(T) === !1 ? N = he.get(T).__webglMultisampledFramebuffer : Array.isArray(Oe) ? N = Oe[z] : N = Oe, E.copy(T.viewport), P.copy(T.scissor), F = T.scissorTest;
      } else
        E.copy(pe).multiplyScalar(te).floor(), P.copy(De).multiplyScalar(te).floor(), F = Ne;
      if (z !== 0 && (N = oc), J.bindFramebuffer(L.FRAMEBUFFER, N) && k && J.drawBuffers(T, N), J.viewport(E), J.scissor(P), J.setScissorTest(F), ie) {
        const Ee = he.get(T.texture);
        L.framebufferTexture2D(L.FRAMEBUFFER, L.COLOR_ATTACHMENT0, L.TEXTURE_CUBE_MAP_POSITIVE_X + O, Ee.__webglTexture, z);
      } else if (ye) {
        const Ee = O;
        for (let Te = 0; Te < T.textures.length; Te++) {
          const Oe = he.get(T.textures[Te]);
          L.framebufferTextureLayer(L.FRAMEBUFFER, L.COLOR_ATTACHMENT0 + Te, Oe.__webglTexture, z, Ee);
        }
      } else if (T !== null && z !== 0) {
        const Ee = he.get(T.texture);
        L.framebufferTexture2D(L.FRAMEBUFFER, L.COLOR_ATTACHMENT0, L.TEXTURE_2D, Ee.__webglTexture, z);
      }
      I = -1;
    }, this.readRenderTargetPixels = function(T, O, z, k, N, ie, ye, Ee = 0) {
      if (!(T && T.isWebGLRenderTarget)) {
        console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");
        return;
      }
      let Te = he.get(T).__webglFramebuffer;
      if (T.isWebGLCubeRenderTarget && ye !== void 0 && (Te = Te[ye]), Te) {
        J.bindFramebuffer(L.FRAMEBUFFER, Te);
        try {
          const Oe = T.textures[Ee], Fe = Oe.format, Ue = Oe.type;
          if (!se.textureFormatReadable(Fe)) {
            console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");
            return;
          }
          if (!se.textureTypeReadable(Ue)) {
            console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");
            return;
          }
          O >= 0 && O <= T.width - k && z >= 0 && z <= T.height - N && (T.textures.length > 1 && L.readBuffer(L.COLOR_ATTACHMENT0 + Ee), L.readPixels(O, z, k, N, Ce.convert(Fe), Ce.convert(Ue), ie));
        } finally {
          const Oe = R !== null ? he.get(R).__webglFramebuffer : null;
          J.bindFramebuffer(L.FRAMEBUFFER, Oe);
        }
      }
    }, this.readRenderTargetPixelsAsync = async function(T, O, z, k, N, ie, ye, Ee = 0) {
      if (!(T && T.isWebGLRenderTarget)) throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");
      let Te = he.get(T).__webglFramebuffer;
      if (T.isWebGLCubeRenderTarget && ye !== void 0 && (Te = Te[ye]), Te) if (O >= 0 && O <= T.width - k && z >= 0 && z <= T.height - N) {
        J.bindFramebuffer(L.FRAMEBUFFER, Te);
        const Oe = T.textures[Ee], Fe = Oe.format, Ue = Oe.type;
        if (!se.textureFormatReadable(Fe)) throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");
        if (!se.textureTypeReadable(Ue)) throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");
        const Je = L.createBuffer();
        L.bindBuffer(L.PIXEL_PACK_BUFFER, Je), L.bufferData(L.PIXEL_PACK_BUFFER, ie.byteLength, L.STREAM_READ), T.textures.length > 1 && L.readBuffer(L.COLOR_ATTACHMENT0 + Ee), L.readPixels(O, z, k, N, Ce.convert(Fe), Ce.convert(Ue), 0);
        const st = R !== null ? he.get(R).__webglFramebuffer : null;
        J.bindFramebuffer(L.FRAMEBUFFER, st);
        const ot = L.fenceSync(L.SYNC_GPU_COMMANDS_COMPLETE, 0);
        return L.flush(), await Ch(L, ot, 4), L.bindBuffer(L.PIXEL_PACK_BUFFER, Je), L.getBufferSubData(L.PIXEL_PACK_BUFFER, 0, ie), L.deleteBuffer(Je), L.deleteSync(ot), ie;
      } else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.");
    }, this.copyFramebufferToTexture = function(T, O = null, z = 0) {
      const k = Math.pow(2, -z), N = Math.floor(T.image.width * k), ie = Math.floor(T.image.height * k), ye = O !== null ? O.x : 0, Ee = O !== null ? O.y : 0;
      ae.setTexture2D(T, 0), L.copyTexSubImage2D(L.TEXTURE_2D, z, 0, 0, ye, Ee, N, ie), J.unbindTexture();
    };
    const ac = L.createFramebuffer(), lc = L.createFramebuffer();
    this.copyTextureToTexture = function(T, O, z = null, k = null, N = 0, ie = null) {
      ie === null && (N !== 0 ? (Ki("WebGLRenderer: copyTextureToTexture function signature has changed to support src and dst mipmap levels."), ie = N, N = 0) : ie = 0);
      let ye, Ee, Te, Oe, Fe, Ue, Je, st, ot;
      const at = T.isCompressedTexture ? T.mipmaps[ie] : T.image;
      if (z !== null)
        ye = z.max.x - z.min.x, Ee = z.max.y - z.min.y, Te = z.isBox3 ? z.max.z - z.min.z : 1, Oe = z.min.x, Fe = z.min.y, Ue = z.isBox3 ? z.min.z : 0;
      else {
        const Ft = Math.pow(2, -N);
        ye = Math.floor(at.width * Ft), Ee = Math.floor(at.height * Ft), T.isDataArrayTexture ? Te = at.depth : T.isData3DTexture ? Te = Math.floor(at.depth * Ft) : Te = 1, Oe = 0, Fe = 0, Ue = 0;
      }
      k !== null ? (Je = k.x, st = k.y, ot = k.z) : (Je = 0, st = 0, ot = 0);
      const rt = Ce.convert(O.format), Re = Ce.convert(O.type);
      let yt;
      O.isData3DTexture ? (ae.setTexture3D(O, 0), yt = L.TEXTURE_3D) : O.isDataArrayTexture || O.isCompressedArrayTexture ? (ae.setTexture2DArray(O, 0), yt = L.TEXTURE_2D_ARRAY) : (ae.setTexture2D(O, 0), yt = L.TEXTURE_2D), L.pixelStorei(L.UNPACK_FLIP_Y_WEBGL, O.flipY), L.pixelStorei(L.UNPACK_PREMULTIPLY_ALPHA_WEBGL, O.premultiplyAlpha), L.pixelStorei(L.UNPACK_ALIGNMENT, O.unpackAlignment);
      const $e = L.getParameter(L.UNPACK_ROW_LENGTH), Wt = L.getParameter(L.UNPACK_IMAGE_HEIGHT), Wn = L.getParameter(L.UNPACK_SKIP_PIXELS), It = L.getParameter(L.UNPACK_SKIP_ROWS), bi = L.getParameter(L.UNPACK_SKIP_IMAGES);
      L.pixelStorei(L.UNPACK_ROW_LENGTH, at.width), L.pixelStorei(L.UNPACK_IMAGE_HEIGHT, at.height), L.pixelStorei(L.UNPACK_SKIP_PIXELS, Oe), L.pixelStorei(L.UNPACK_SKIP_ROWS, Fe), L.pixelStorei(L.UNPACK_SKIP_IMAGES, Ue);
      const lt = T.isDataArrayTexture || T.isData3DTexture, Ot = O.isDataArrayTexture || O.isData3DTexture;
      if (T.isDepthTexture) {
        const Ft = he.get(T), Mt = he.get(O), Xt = he.get(Ft.__renderTarget), er = he.get(Mt.__renderTarget);
        J.bindFramebuffer(L.READ_FRAMEBUFFER, Xt.__webglFramebuffer), J.bindFramebuffer(L.DRAW_FRAMEBUFFER, er.__webglFramebuffer);
        for (let Cn = 0; Cn < Te; Cn++)
          lt && (L.framebufferTextureLayer(L.READ_FRAMEBUFFER, L.COLOR_ATTACHMENT0, he.get(T).__webglTexture, N, Ue + Cn), L.framebufferTextureLayer(L.DRAW_FRAMEBUFFER, L.COLOR_ATTACHMENT0, he.get(O).__webglTexture, ie, ot + Cn)), L.blitFramebuffer(Oe, Fe, ye, Ee, Je, st, ye, Ee, L.DEPTH_BUFFER_BIT, L.NEAREST);
        J.bindFramebuffer(L.READ_FRAMEBUFFER, null), J.bindFramebuffer(L.DRAW_FRAMEBUFFER, null);
      } else if (N !== 0 || T.isRenderTargetTexture || he.has(T)) {
        const Ft = he.get(T), Mt = he.get(O);
        J.bindFramebuffer(L.READ_FRAMEBUFFER, ac), J.bindFramebuffer(L.DRAW_FRAMEBUFFER, lc);
        for (let Xt = 0; Xt < Te; Xt++)
          lt ? L.framebufferTextureLayer(L.READ_FRAMEBUFFER, L.COLOR_ATTACHMENT0, Ft.__webglTexture, N, Ue + Xt) : L.framebufferTexture2D(L.READ_FRAMEBUFFER, L.COLOR_ATTACHMENT0, L.TEXTURE_2D, Ft.__webglTexture, N), Ot ? L.framebufferTextureLayer(L.DRAW_FRAMEBUFFER, L.COLOR_ATTACHMENT0, Mt.__webglTexture, ie, ot + Xt) : L.framebufferTexture2D(L.DRAW_FRAMEBUFFER, L.COLOR_ATTACHMENT0, L.TEXTURE_2D, Mt.__webglTexture, ie), N !== 0 ? L.blitFramebuffer(Oe, Fe, ye, Ee, Je, st, ye, Ee, L.COLOR_BUFFER_BIT, L.NEAREST) : Ot ? L.copyTexSubImage3D(yt, ie, Je, st, ot + Xt, Oe, Fe, ye, Ee) : L.copyTexSubImage2D(yt, ie, Je, st, Oe, Fe, ye, Ee);
        J.bindFramebuffer(L.READ_FRAMEBUFFER, null), J.bindFramebuffer(L.DRAW_FRAMEBUFFER, null);
      } else Ot ? T.isDataTexture || T.isData3DTexture ? L.texSubImage3D(yt, ie, Je, st, ot, ye, Ee, Te, rt, Re, at.data) : O.isCompressedArrayTexture ? L.compressedTexSubImage3D(yt, ie, Je, st, ot, ye, Ee, Te, rt, at.data) : L.texSubImage3D(yt, ie, Je, st, ot, ye, Ee, Te, rt, Re, at) : T.isDataTexture ? L.texSubImage2D(L.TEXTURE_2D, ie, Je, st, ye, Ee, rt, Re, at.data) : T.isCompressedTexture ? L.compressedTexSubImage2D(L.TEXTURE_2D, ie, Je, st, at.width, at.height, rt, at.data) : L.texSubImage2D(L.TEXTURE_2D, ie, Je, st, ye, Ee, rt, Re, at);
      L.pixelStorei(L.UNPACK_ROW_LENGTH, $e), L.pixelStorei(L.UNPACK_IMAGE_HEIGHT, Wt), L.pixelStorei(L.UNPACK_SKIP_PIXELS, Wn), L.pixelStorei(L.UNPACK_SKIP_ROWS, It), L.pixelStorei(L.UNPACK_SKIP_IMAGES, bi), ie === 0 && O.generateMipmaps && L.generateMipmap(yt), J.unbindTexture();
    }, this.initRenderTarget = function(T) {
      he.get(T).__webglFramebuffer === void 0 && ae.setupRenderTarget(T);
    }, this.initTexture = function(T) {
      T.isCubeTexture ? ae.setTextureCube(T, 0) : T.isData3DTexture ? ae.setTexture3D(T, 0) : T.isDataArrayTexture || T.isCompressedArrayTexture ? ae.setTexture2DArray(T, 0) : ae.setTexture2D(T, 0), J.unbindTexture();
    }, this.resetState = function() {
      A = 0, b = 0, R = null, J.reset(), Pe.reset();
    }, typeof __THREE_DEVTOOLS__ < "u" && __THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe", { detail: this }));
  }
  get coordinateSystem() {
    return pi;
  }
  get outputColorSpace() {
    return this._outputColorSpace;
  }
  set outputColorSpace(e) {
    this._outputColorSpace = e;
    const t = this.getContext();
    t.drawingBufferColorSpace = Ze._getDrawingBufferColorSpace(e), t.unpackColorSpace = Ze._getUnpackColorSpace();
  }
}, Fa = { type: "change" }, mo = { type: "start" }, Zl = { type: "end" }, Bs = new ns(), Ba = new Tn(), Bp = Math.cos(70 * Xs.DEG2RAD), mt = new C(), Rt = 2 * Math.PI, it = {
  NONE: -1,
  ROTATE: 0,
  DOLLY: 1,
  PAN: 2,
  TOUCH_ROTATE: 3,
  TOUCH_PAN: 4,
  TOUCH_DOLLY_PAN: 5,
  TOUCH_DOLLY_ROTATE: 6
}, kr = 1e-6, zp = class extends Id {
  constructor(e, t = null) {
    super(e, t), this.state = it.NONE, this.target = new C(), this.cursor = new C(), this.minDistance = 0, this.maxDistance = 1 / 0, this.minZoom = 0, this.maxZoom = 1 / 0, this.minTargetRadius = 0, this.maxTargetRadius = 1 / 0, this.minPolarAngle = 0, this.maxPolarAngle = Math.PI, this.minAzimuthAngle = -1 / 0, this.maxAzimuthAngle = 1 / 0, this.enableDamping = !1, this.dampingFactor = 0.05, this.enableZoom = !0, this.zoomSpeed = 1, this.enableRotate = !0, this.rotateSpeed = 1, this.keyRotateSpeed = 1, this.enablePan = !0, this.panSpeed = 1, this.screenSpacePanning = !0, this.keyPanSpeed = 7, this.zoomToCursor = !1, this.autoRotate = !1, this.autoRotateSpeed = 2, this.keys = {
      LEFT: "ArrowLeft",
      UP: "ArrowUp",
      RIGHT: "ArrowRight",
      BOTTOM: "ArrowDown"
    }, this.mouseButtons = {
      LEFT: hi.ROTATE,
      MIDDLE: hi.DOLLY,
      RIGHT: hi.PAN
    }, this.touches = {
      ONE: li.ROTATE,
      TWO: li.DOLLY_PAN
    }, this.target0 = this.target.clone(), this.position0 = this.object.position.clone(), this.zoom0 = this.object.zoom, this._domElementKeyEvents = null, this._lastPosition = new C(), this._lastQuaternion = new nn(), this._lastTargetPosition = new C(), this._quat = new nn().setFromUnitVectors(e.up, new C(0, 1, 0)), this._quatInverse = this._quat.clone().invert(), this._spherical = new $r(), this._sphericalDelta = new $r(), this._scale = 1, this._panOffset = new C(), this._rotateStart = new re(), this._rotateEnd = new re(), this._rotateDelta = new re(), this._panStart = new re(), this._panEnd = new re(), this._panDelta = new re(), this._dollyStart = new re(), this._dollyEnd = new re(), this._dollyDelta = new re(), this._dollyDirection = new C(), this._mouse = new re(), this._performCursorZoom = !1, this._pointers = [], this._pointerPositions = {}, this._controlActive = !1, this._onPointerMove = Hp.bind(this), this._onPointerDown = kp.bind(this), this._onPointerUp = Vp.bind(this), this._onContextMenu = jp.bind(this), this._onMouseWheel = Xp.bind(this), this._onKeyDown = Yp.bind(this), this._onTouchStart = qp.bind(this), this._onTouchMove = Kp.bind(this), this._onMouseDown = Gp.bind(this), this._onMouseMove = Wp.bind(this), this._interceptControlDown = Zp.bind(this), this._interceptControlUp = Jp.bind(this), this.domElement !== null && this.connect(this.domElement), this.update();
  }
  connect(e) {
    super.connect(e), this.domElement.addEventListener("pointerdown", this._onPointerDown), this.domElement.addEventListener("pointercancel", this._onPointerUp), this.domElement.addEventListener("contextmenu", this._onContextMenu), this.domElement.addEventListener("wheel", this._onMouseWheel, { passive: !1 }), this.domElement.getRootNode().addEventListener("keydown", this._interceptControlDown, {
      passive: !0,
      capture: !0
    }), this.domElement.style.touchAction = "none";
  }
  disconnect() {
    this.domElement.removeEventListener("pointerdown", this._onPointerDown), this.domElement.removeEventListener("pointermove", this._onPointerMove), this.domElement.removeEventListener("pointerup", this._onPointerUp), this.domElement.removeEventListener("pointercancel", this._onPointerUp), this.domElement.removeEventListener("wheel", this._onMouseWheel), this.domElement.removeEventListener("contextmenu", this._onContextMenu), this.stopListenToKeyEvents(), this.domElement.getRootNode().removeEventListener("keydown", this._interceptControlDown, { capture: !0 }), this.domElement.style.touchAction = "auto";
  }
  dispose() {
    this.disconnect();
  }
  getPolarAngle() {
    return this._spherical.phi;
  }
  getAzimuthalAngle() {
    return this._spherical.theta;
  }
  getDistance() {
    return this.object.position.distanceTo(this.target);
  }
  listenToKeyEvents(e) {
    e.addEventListener("keydown", this._onKeyDown), this._domElementKeyEvents = e;
  }
  stopListenToKeyEvents() {
    this._domElementKeyEvents !== null && (this._domElementKeyEvents.removeEventListener("keydown", this._onKeyDown), this._domElementKeyEvents = null);
  }
  saveState() {
    this.target0.copy(this.target), this.position0.copy(this.object.position), this.zoom0 = this.object.zoom;
  }
  reset() {
    this.target.copy(this.target0), this.object.position.copy(this.position0), this.object.zoom = this.zoom0, this.object.updateProjectionMatrix(), this.dispatchEvent(Fa), this.update(), this.state = it.NONE;
  }
  update(e = null) {
    const t = this.object.position;
    mt.copy(t).sub(this.target), mt.applyQuaternion(this._quat), this._spherical.setFromVector3(mt), this.autoRotate && this.state === it.NONE && this._rotateLeft(this._getAutoRotationAngle(e)), this.enableDamping ? (this._spherical.theta += this._sphericalDelta.theta * this.dampingFactor, this._spherical.phi += this._sphericalDelta.phi * this.dampingFactor) : (this._spherical.theta += this._sphericalDelta.theta, this._spherical.phi += this._sphericalDelta.phi);
    let n = this.minAzimuthAngle, i = this.maxAzimuthAngle;
    isFinite(n) && isFinite(i) && (n < -Math.PI ? n += Rt : n > Math.PI && (n -= Rt), i < -Math.PI ? i += Rt : i > Math.PI && (i -= Rt), n <= i ? this._spherical.theta = Math.max(n, Math.min(i, this._spherical.theta)) : this._spherical.theta = this._spherical.theta > (n + i) / 2 ? Math.max(n, this._spherical.theta) : Math.min(i, this._spherical.theta)), this._spherical.phi = Math.max(this.minPolarAngle, Math.min(this.maxPolarAngle, this._spherical.phi)), this._spherical.makeSafe(), this.enableDamping === !0 ? this.target.addScaledVector(this._panOffset, this.dampingFactor) : this.target.add(this._panOffset), this.target.sub(this.cursor), this.target.clampLength(this.minTargetRadius, this.maxTargetRadius), this.target.add(this.cursor);
    let s = !1;
    if (this.zoomToCursor && this._performCursorZoom || this.object.isOrthographicCamera) this._spherical.radius = this._clampDistance(this._spherical.radius);
    else {
      const r = this._spherical.radius;
      this._spherical.radius = this._clampDistance(this._spherical.radius * this._scale), s = r != this._spherical.radius;
    }
    if (mt.setFromSpherical(this._spherical), mt.applyQuaternion(this._quatInverse), t.copy(this.target).add(mt), this.object.lookAt(this.target), this.enableDamping === !0 ? (this._sphericalDelta.theta *= 1 - this.dampingFactor, this._sphericalDelta.phi *= 1 - this.dampingFactor, this._panOffset.multiplyScalar(1 - this.dampingFactor)) : (this._sphericalDelta.set(0, 0, 0), this._panOffset.set(0, 0, 0)), this.zoomToCursor && this._performCursorZoom) {
      let r = null;
      if (this.object.isPerspectiveCamera) {
        const o = mt.length();
        r = this._clampDistance(o * this._scale);
        const a = o - r;
        this.object.position.addScaledVector(this._dollyDirection, a), this.object.updateMatrixWorld(), s = !!a;
      } else if (this.object.isOrthographicCamera) {
        const o = new C(this._mouse.x, this._mouse.y, 0);
        o.unproject(this.object);
        const a = this.object.zoom;
        this.object.zoom = Math.max(this.minZoom, Math.min(this.maxZoom, this.object.zoom / this._scale)), this.object.updateProjectionMatrix(), s = a !== this.object.zoom;
        const l = new C(this._mouse.x, this._mouse.y, 0);
        l.unproject(this.object), this.object.position.sub(l).add(o), this.object.updateMatrixWorld(), r = mt.length();
      } else
        console.warn("WARNING: OrbitControls.js encountered an unknown camera type - zoom to cursor disabled."), this.zoomToCursor = !1;
      r !== null && (this.screenSpacePanning ? this.target.set(0, 0, -1).transformDirection(this.object.matrix).multiplyScalar(r).add(this.object.position) : (Bs.origin.copy(this.object.position), Bs.direction.set(0, 0, -1).transformDirection(this.object.matrix), Math.abs(this.object.up.dot(Bs.direction)) < Bp ? this.object.lookAt(this.target) : (Ba.setFromNormalAndCoplanarPoint(this.object.up, this.target), Bs.intersectPlane(Ba, this.target))));
    } else if (this.object.isOrthographicCamera) {
      const r = this.object.zoom;
      this.object.zoom = Math.max(this.minZoom, Math.min(this.maxZoom, this.object.zoom / this._scale)), r !== this.object.zoom && (this.object.updateProjectionMatrix(), s = !0);
    }
    return this._scale = 1, this._performCursorZoom = !1, s || this._lastPosition.distanceToSquared(this.object.position) > kr || 8 * (1 - this._lastQuaternion.dot(this.object.quaternion)) > kr || this._lastTargetPosition.distanceToSquared(this.target) > kr ? (this.dispatchEvent(Fa), this._lastPosition.copy(this.object.position), this._lastQuaternion.copy(this.object.quaternion), this._lastTargetPosition.copy(this.target), !0) : !1;
  }
  _getAutoRotationAngle(e) {
    return e !== null ? Rt / 60 * this.autoRotateSpeed * e : Rt / 60 / 60 * this.autoRotateSpeed;
  }
  _getZoomScale(e) {
    const t = Math.abs(e * 0.01);
    return Math.pow(0.95, this.zoomSpeed * t);
  }
  _rotateLeft(e) {
    this._sphericalDelta.theta -= e;
  }
  _rotateUp(e) {
    this._sphericalDelta.phi -= e;
  }
  _panLeft(e, t) {
    mt.setFromMatrixColumn(t, 0), mt.multiplyScalar(-e), this._panOffset.add(mt);
  }
  _panUp(e, t) {
    this.screenSpacePanning === !0 ? mt.setFromMatrixColumn(t, 1) : (mt.setFromMatrixColumn(t, 0), mt.crossVectors(this.object.up, mt)), mt.multiplyScalar(e), this._panOffset.add(mt);
  }
  _pan(e, t) {
    const n = this.domElement;
    if (this.object.isPerspectiveCamera) {
      const i = this.object.position;
      mt.copy(i).sub(this.target);
      let s = mt.length();
      s *= Math.tan(this.object.fov / 2 * Math.PI / 180), this._panLeft(2 * e * s / n.clientHeight, this.object.matrix), this._panUp(2 * t * s / n.clientHeight, this.object.matrix);
    } else this.object.isOrthographicCamera ? (this._panLeft(e * (this.object.right - this.object.left) / this.object.zoom / n.clientWidth, this.object.matrix), this._panUp(t * (this.object.top - this.object.bottom) / this.object.zoom / n.clientHeight, this.object.matrix)) : (console.warn("WARNING: OrbitControls.js encountered an unknown camera type - pan disabled."), this.enablePan = !1);
  }
  _dollyOut(e) {
    this.object.isPerspectiveCamera || this.object.isOrthographicCamera ? this._scale /= e : (console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."), this.enableZoom = !1);
  }
  _dollyIn(e) {
    this.object.isPerspectiveCamera || this.object.isOrthographicCamera ? this._scale *= e : (console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."), this.enableZoom = !1);
  }
  _updateZoomParameters(e, t) {
    if (!this.zoomToCursor) return;
    this._performCursorZoom = !0;
    const n = this.domElement.getBoundingClientRect(), i = e - n.left, s = t - n.top, r = n.width, o = n.height;
    this._mouse.x = i / r * 2 - 1, this._mouse.y = -(s / o) * 2 + 1, this._dollyDirection.set(this._mouse.x, this._mouse.y, 1).unproject(this.object).sub(this.object.position).normalize();
  }
  _clampDistance(e) {
    return Math.max(this.minDistance, Math.min(this.maxDistance, e));
  }
  _handleMouseDownRotate(e) {
    this._rotateStart.set(e.clientX, e.clientY);
  }
  _handleMouseDownDolly(e) {
    this._updateZoomParameters(e.clientX, e.clientX), this._dollyStart.set(e.clientX, e.clientY);
  }
  _handleMouseDownPan(e) {
    this._panStart.set(e.clientX, e.clientY);
  }
  _handleMouseMoveRotate(e) {
    this._rotateEnd.set(e.clientX, e.clientY), this._rotateDelta.subVectors(this._rotateEnd, this._rotateStart).multiplyScalar(this.rotateSpeed);
    const t = this.domElement;
    this._rotateLeft(Rt * this._rotateDelta.x / t.clientHeight), this._rotateUp(Rt * this._rotateDelta.y / t.clientHeight), this._rotateStart.copy(this._rotateEnd), this.update();
  }
  _handleMouseMoveDolly(e) {
    this._dollyEnd.set(e.clientX, e.clientY), this._dollyDelta.subVectors(this._dollyEnd, this._dollyStart), this._dollyDelta.y > 0 ? this._dollyOut(this._getZoomScale(this._dollyDelta.y)) : this._dollyDelta.y < 0 && this._dollyIn(this._getZoomScale(this._dollyDelta.y)), this._dollyStart.copy(this._dollyEnd), this.update();
  }
  _handleMouseMovePan(e) {
    this._panEnd.set(e.clientX, e.clientY), this._panDelta.subVectors(this._panEnd, this._panStart).multiplyScalar(this.panSpeed), this._pan(this._panDelta.x, this._panDelta.y), this._panStart.copy(this._panEnd), this.update();
  }
  _handleMouseWheel(e) {
    this._updateZoomParameters(e.clientX, e.clientY), e.deltaY < 0 ? this._dollyIn(this._getZoomScale(e.deltaY)) : e.deltaY > 0 && this._dollyOut(this._getZoomScale(e.deltaY)), this.update();
  }
  _handleKeyDown(e) {
    let t = !1;
    switch (e.code) {
      case this.keys.UP:
        e.ctrlKey || e.metaKey || e.shiftKey ? this.enableRotate && this._rotateUp(Rt * this.keyRotateSpeed / this.domElement.clientHeight) : this.enablePan && this._pan(0, this.keyPanSpeed), t = !0;
        break;
      case this.keys.BOTTOM:
        e.ctrlKey || e.metaKey || e.shiftKey ? this.enableRotate && this._rotateUp(-Rt * this.keyRotateSpeed / this.domElement.clientHeight) : this.enablePan && this._pan(0, -this.keyPanSpeed), t = !0;
        break;
      case this.keys.LEFT:
        e.ctrlKey || e.metaKey || e.shiftKey ? this.enableRotate && this._rotateLeft(Rt * this.keyRotateSpeed / this.domElement.clientHeight) : this.enablePan && this._pan(this.keyPanSpeed, 0), t = !0;
        break;
      case this.keys.RIGHT:
        e.ctrlKey || e.metaKey || e.shiftKey ? this.enableRotate && this._rotateLeft(-Rt * this.keyRotateSpeed / this.domElement.clientHeight) : this.enablePan && this._pan(-this.keyPanSpeed, 0), t = !0;
        break;
    }
    t && (e.preventDefault(), this.update());
  }
  _handleTouchStartRotate(e) {
    if (this._pointers.length === 1) this._rotateStart.set(e.pageX, e.pageY);
    else {
      const t = this._getSecondPointerPosition(e), n = 0.5 * (e.pageX + t.x), i = 0.5 * (e.pageY + t.y);
      this._rotateStart.set(n, i);
    }
  }
  _handleTouchStartPan(e) {
    if (this._pointers.length === 1) this._panStart.set(e.pageX, e.pageY);
    else {
      const t = this._getSecondPointerPosition(e), n = 0.5 * (e.pageX + t.x), i = 0.5 * (e.pageY + t.y);
      this._panStart.set(n, i);
    }
  }
  _handleTouchStartDolly(e) {
    const t = this._getSecondPointerPosition(e), n = e.pageX - t.x, i = e.pageY - t.y, s = Math.sqrt(n * n + i * i);
    this._dollyStart.set(0, s);
  }
  _handleTouchStartDollyPan(e) {
    this.enableZoom && this._handleTouchStartDolly(e), this.enablePan && this._handleTouchStartPan(e);
  }
  _handleTouchStartDollyRotate(e) {
    this.enableZoom && this._handleTouchStartDolly(e), this.enableRotate && this._handleTouchStartRotate(e);
  }
  _handleTouchMoveRotate(e) {
    if (this._pointers.length == 1) this._rotateEnd.set(e.pageX, e.pageY);
    else {
      const n = this._getSecondPointerPosition(e), i = 0.5 * (e.pageX + n.x), s = 0.5 * (e.pageY + n.y);
      this._rotateEnd.set(i, s);
    }
    this._rotateDelta.subVectors(this._rotateEnd, this._rotateStart).multiplyScalar(this.rotateSpeed);
    const t = this.domElement;
    this._rotateLeft(Rt * this._rotateDelta.x / t.clientHeight), this._rotateUp(Rt * this._rotateDelta.y / t.clientHeight), this._rotateStart.copy(this._rotateEnd);
  }
  _handleTouchMovePan(e) {
    if (this._pointers.length === 1) this._panEnd.set(e.pageX, e.pageY);
    else {
      const t = this._getSecondPointerPosition(e), n = 0.5 * (e.pageX + t.x), i = 0.5 * (e.pageY + t.y);
      this._panEnd.set(n, i);
    }
    this._panDelta.subVectors(this._panEnd, this._panStart).multiplyScalar(this.panSpeed), this._pan(this._panDelta.x, this._panDelta.y), this._panStart.copy(this._panEnd);
  }
  _handleTouchMoveDolly(e) {
    const t = this._getSecondPointerPosition(e), n = e.pageX - t.x, i = e.pageY - t.y, s = Math.sqrt(n * n + i * i);
    this._dollyEnd.set(0, s), this._dollyDelta.set(0, Math.pow(this._dollyEnd.y / this._dollyStart.y, this.zoomSpeed)), this._dollyOut(this._dollyDelta.y), this._dollyStart.copy(this._dollyEnd);
    const r = (e.pageX + t.x) * 0.5, o = (e.pageY + t.y) * 0.5;
    this._updateZoomParameters(r, o);
  }
  _handleTouchMoveDollyPan(e) {
    this.enableZoom && this._handleTouchMoveDolly(e), this.enablePan && this._handleTouchMovePan(e);
  }
  _handleTouchMoveDollyRotate(e) {
    this.enableZoom && this._handleTouchMoveDolly(e), this.enableRotate && this._handleTouchMoveRotate(e);
  }
  _addPointer(e) {
    this._pointers.push(e.pointerId);
  }
  _removePointer(e) {
    delete this._pointerPositions[e.pointerId];
    for (let t = 0; t < this._pointers.length; t++) if (this._pointers[t] == e.pointerId) {
      this._pointers.splice(t, 1);
      return;
    }
  }
  _isTrackingPointer(e) {
    for (let t = 0; t < this._pointers.length; t++) if (this._pointers[t] == e.pointerId) return !0;
    return !1;
  }
  _trackPointer(e) {
    let t = this._pointerPositions[e.pointerId];
    t === void 0 && (t = new re(), this._pointerPositions[e.pointerId] = t), t.set(e.pageX, e.pageY);
  }
  _getSecondPointerPosition(e) {
    const t = e.pointerId === this._pointers[0] ? this._pointers[1] : this._pointers[0];
    return this._pointerPositions[t];
  }
  _customWheelEvent(e) {
    const t = e.deltaMode, n = {
      clientX: e.clientX,
      clientY: e.clientY,
      deltaY: e.deltaY
    };
    switch (t) {
      case 1:
        n.deltaY *= 16;
        break;
      case 2:
        n.deltaY *= 100;
        break;
    }
    return e.ctrlKey && !this._controlActive && (n.deltaY *= 10), n;
  }
};
function kp(e) {
  this.enabled !== !1 && (this._pointers.length === 0 && (this.domElement.setPointerCapture(e.pointerId), this.domElement.addEventListener("pointermove", this._onPointerMove), this.domElement.addEventListener("pointerup", this._onPointerUp)), !this._isTrackingPointer(e) && (this._addPointer(e), e.pointerType === "touch" ? this._onTouchStart(e) : this._onMouseDown(e)));
}
function Hp(e) {
  this.enabled !== !1 && (e.pointerType === "touch" ? this._onTouchMove(e) : this._onMouseMove(e));
}
function Vp(e) {
  switch (this._removePointer(e), this._pointers.length) {
    case 0:
      this.domElement.releasePointerCapture(e.pointerId), this.domElement.removeEventListener("pointermove", this._onPointerMove), this.domElement.removeEventListener("pointerup", this._onPointerUp), this.dispatchEvent(Zl), this.state = it.NONE;
      break;
    case 1:
      const t = this._pointers[0], n = this._pointerPositions[t];
      this._onTouchStart({
        pointerId: t,
        pageX: n.x,
        pageY: n.y
      });
      break;
  }
}
function Gp(e) {
  let t;
  switch (e.button) {
    case 0:
      t = this.mouseButtons.LEFT;
      break;
    case 1:
      t = this.mouseButtons.MIDDLE;
      break;
    case 2:
      t = this.mouseButtons.RIGHT;
      break;
    default:
      t = -1;
  }
  switch (t) {
    case hi.DOLLY:
      if (this.enableZoom === !1) return;
      this._handleMouseDownDolly(e), this.state = it.DOLLY;
      break;
    case hi.ROTATE:
      if (e.ctrlKey || e.metaKey || e.shiftKey) {
        if (this.enablePan === !1) return;
        this._handleMouseDownPan(e), this.state = it.PAN;
      } else {
        if (this.enableRotate === !1) return;
        this._handleMouseDownRotate(e), this.state = it.ROTATE;
      }
      break;
    case hi.PAN:
      if (e.ctrlKey || e.metaKey || e.shiftKey) {
        if (this.enableRotate === !1) return;
        this._handleMouseDownRotate(e), this.state = it.ROTATE;
      } else {
        if (this.enablePan === !1) return;
        this._handleMouseDownPan(e), this.state = it.PAN;
      }
      break;
    default:
      this.state = it.NONE;
  }
  this.state !== it.NONE && this.dispatchEvent(mo);
}
function Wp(e) {
  switch (this.state) {
    case it.ROTATE:
      if (this.enableRotate === !1) return;
      this._handleMouseMoveRotate(e);
      break;
    case it.DOLLY:
      if (this.enableZoom === !1) return;
      this._handleMouseMoveDolly(e);
      break;
    case it.PAN:
      if (this.enablePan === !1) return;
      this._handleMouseMovePan(e);
      break;
  }
}
function Xp(e) {
  this.enabled === !1 || this.enableZoom === !1 || this.state !== it.NONE || (e.preventDefault(), this.dispatchEvent(mo), this._handleMouseWheel(this._customWheelEvent(e)), this.dispatchEvent(Zl));
}
function Yp(e) {
  this.enabled !== !1 && this._handleKeyDown(e);
}
function qp(e) {
  switch (this._trackPointer(e), this._pointers.length) {
    case 1:
      switch (this.touches.ONE) {
        case li.ROTATE:
          if (this.enableRotate === !1) return;
          this._handleTouchStartRotate(e), this.state = it.TOUCH_ROTATE;
          break;
        case li.PAN:
          if (this.enablePan === !1) return;
          this._handleTouchStartPan(e), this.state = it.TOUCH_PAN;
          break;
        default:
          this.state = it.NONE;
      }
      break;
    case 2:
      switch (this.touches.TWO) {
        case li.DOLLY_PAN:
          if (this.enableZoom === !1 && this.enablePan === !1) return;
          this._handleTouchStartDollyPan(e), this.state = it.TOUCH_DOLLY_PAN;
          break;
        case li.DOLLY_ROTATE:
          if (this.enableZoom === !1 && this.enableRotate === !1) return;
          this._handleTouchStartDollyRotate(e), this.state = it.TOUCH_DOLLY_ROTATE;
          break;
        default:
          this.state = it.NONE;
      }
      break;
    default:
      this.state = it.NONE;
  }
  this.state !== it.NONE && this.dispatchEvent(mo);
}
function Kp(e) {
  switch (this._trackPointer(e), this.state) {
    case it.TOUCH_ROTATE:
      if (this.enableRotate === !1) return;
      this._handleTouchMoveRotate(e), this.update();
      break;
    case it.TOUCH_PAN:
      if (this.enablePan === !1) return;
      this._handleTouchMovePan(e), this.update();
      break;
    case it.TOUCH_DOLLY_PAN:
      if (this.enableZoom === !1 && this.enablePan === !1) return;
      this._handleTouchMoveDollyPan(e), this.update();
      break;
    case it.TOUCH_DOLLY_ROTATE:
      if (this.enableZoom === !1 && this.enableRotate === !1) return;
      this._handleTouchMoveDollyRotate(e), this.update();
      break;
    default:
      this.state = it.NONE;
  }
}
function jp(e) {
  this.enabled !== !1 && e.preventDefault();
}
function Zp(e) {
  e.key === "Control" && (this._controlActive = !0, this.domElement.getRootNode().addEventListener("keyup", this._interceptControlUp, {
    passive: !0,
    capture: !0
  }));
}
function Jp(e) {
  e.key === "Control" && (this._controlActive = !1, this.domElement.getRootNode().removeEventListener("keyup", this._interceptControlUp, {
    passive: !0,
    capture: !0
  }));
}
var za = {
  table: ["rect", "circle"],
  counter: ["rect"],
  chair: ["rect"],
  bed: ["rect"],
  shelf: ["rect"],
  sofa: ["rect"],
  bridge: ["rect"],
  tree: ["rect", "circle"],
  rock: ["rect", "circle"]
};
function Qi(e) {
  return e.shape === "icon" || e.shape === "label" || e.category === "actor" || e.category === "door" || e.kind === "stairs" || e.icon === "stairs";
}
function Jl(e) {
  if (Qi(e) || e.category === "wall" || !e.icon || !Object.hasOwn(za, e.icon)) return;
  const t = e.icon;
  return za[t].includes(e.shape) ? t : void 0;
}
function $p(e) {
  const [t, n, i, s] = e.viewBox, r = Math.max(i, s) / 14;
  return {
    scale: r,
    point: (o, a, l = 0) => new C((o - t - i / 2) / r, l, (a - n - s / 2) / r)
  };
}
function Qp(e, t) {
  const n = Ka(e), i = [n.x + n.width / 2, n.y + n.height / 2], s = hc(e), r = s.points.map(([o, a]) => new re((o - i[0]) / t, (a - i[1]) / t));
  return s.closed && r.length > 1 && r[0].equals(r[r.length - 1]) && r.pop(), {
    center: i,
    width: n.width / t,
    depth: n.height / t,
    points: r,
    closed: s.closed,
    rotation: -(e.rotation || 0) * Math.PI / 180
  };
}
function em(e, t) {
  const n = new Ku(new Ll(e.map((i) => new re(i.x, -i.y))), {
    depth: t,
    bevelEnabled: !1,
    steps: 1,
    curveSegments: 1
  });
  return n.rotateX(-Math.PI / 2), n;
}
function tm(e, t, n) {
  const i = e.map((s) => new C(s.x, n, s.y));
  return t && i.length && i.push(i[0].clone()), new Lt().setFromPoints(i);
}
function nm(e, t, n) {
  const i = [];
  for (let r = 0; r < e.length - (t ? 0 : 1); r += 1) {
    const o = e[r], a = e[(r + 1) % e.length], l = a.clone().sub(o);
    if (!l.lengthSq()) continue;
    const c = new re(-l.y, l.x).normalize().multiplyScalar(n / 2), h = [
      o.clone().add(c),
      o.clone().sub(c),
      a.clone().add(c),
      a.clone().sub(c)
    ];
    for (const u of [
      0,
      2,
      1,
      1,
      2,
      3
    ]) i.push(h[u].x, 0, h[u].y);
  }
  const s = new Lt();
  return s.setAttribute("position", new ut(i, 3)), s.computeVertexNormals(), s;
}
function im(e, t) {
  return e.slice(0, t ? e.length : -1).flatMap((n, i) => {
    const s = e[(i + 1) % e.length], r = n.distanceTo(s);
    return r ? [{
      x: (n.x + s.x) / 2,
      z: (n.y + s.y) / 2,
      length: r,
      rotation: -Math.atan2(s.y - n.y, s.x - n.x)
    }] : [];
  });
}
function sm(e, t) {
  const i = new Uint8Array(65536);
  let s = 781;
  for (let o = 0; o < 128; o += 1) for (let a = 0; a < 128; a += 1) {
    s = Math.imul(s, 1664525) + 1013904223 >>> 0;
    const l = s / 4294967296;
    let c = 0.94 + l * 0.06;
    if (e === "wood") {
      if (c = 0.89 + Math.sin(o * 0.82 + Math.sin(a * Math.PI / 64) * 2 + Math.sin(o * 0.19)) * 0.045 + l * 0.04, t) {
        const u = Math.floor(o / 32);
        c += [
          0,
          0.025,
          -0.02,
          0.012
        ][u], (o % 32 === 0 || (a + u * 47) % 128 === 0) && (c = 0.69);
      }
    } else e === "tile" ? c = a % 64 < 2 || o % 64 < 2 ? 0.73 : 0.96 + l * 0.04 : [
      "fabric",
      "carpet",
      "bed-sheet",
      "tatami"
    ].includes(e) ? c = 0.88 + (a % 4 < 2 == o % 4 < 2 ? 0.07 : 0) + l * 0.05 : (e === "stone" || e === "marble") && (c = 0.92 + Math.sin(a * 0.15 + Math.sin(o * 0.12)) * 0.025 + l * 0.055);
    const h = Math.round(c * 255);
    i.set([
      h,
      h,
      h,
      255
    ], (o * 128 + a) * 4);
  }
  const r = new oo(i, 128, 128, kn);
  return r.colorSpace = xt, r.wrapS = r.wrapT = Wi, t && e === "wood" && r.repeat.set(0.55, 0.55), r.magFilter = gn, r.minFilter = es, r.generateMipmaps = !0, r.anisotropy = 4, r.needsUpdate = !0, r;
}
var rm = {
  ...uc,
  wood: "#9c6847",
  stone: "#c5cbd0",
  tile: "#cbd6df",
  carpet: "#a67568",
  fabric: "#608e92",
  "bed-sheet": "#e3e7e9",
  metal: "#98acbf",
  glass: "#b3deeb",
  marble: "#e5e6e7",
  water: "#6aabbf",
  grass: "#b7cba0",
  forest: "#6d957d"
};
function om(e, t) {
  const n = /* @__PURE__ */ new Map(), i = /* @__PURE__ */ new Map(), s = /* @__PURE__ */ new Map();
  function r(a, l = 0) {
    const c = a.material || (a.category === "water" ? "water" : "unknown"), h = `${c}:${a.category}:${a.certainty}:${l}`;
    let u = n.get(h);
    if (!u) {
      const d = {
        danger: "#d77c80",
        magic: "#b29cdb",
        light: "#f4d697",
        actor: "#4598cf",
        marker: "#72b9cb",
        secret: "#8d9ca9"
      }, p = a.category === "terrain", _ = c === "wood" && p ? "#c8ab85" : rm[c], g = new Be(!a.material && a.category in d ? d[a.category] : _);
      g.lerp(new Be(l > 0 ? "#ffffff" : "#201c1a"), Math.abs(l));
      const m = Wr(a, "").opacity * (c === "glass" ? 0.42 : 1), f = [
        "wood",
        "tile",
        "tatami",
        "fabric",
        "carpet",
        "bed-sheet",
        "stone",
        "sand",
        "dirt",
        "marble"
      ].includes(c), y = `${c}:${p}`;
      f && !s.has(y) && s.set(y, e.own(sm(c, p)));
      const v = s.get(y) || null;
      u = e.own(new js({
        color: g,
        roughness: c === "metal" ? 0.32 : c === "glass" || c === "water" ? 0.22 : c === "wood" ? 0.64 : 0.92,
        metalness: c === "metal" ? 0.32 : 0,
        transparent: m < 1,
        opacity: m,
        depthWrite: m >= 1,
        side: 2,
        map: v,
        bumpMap: v,
        bumpScale: c === "wood" ? 0.018 : 9e-3,
        emissive: [
          "rune",
          "warm-light",
          "cold-light"
        ].includes(c) ? g : "#000000",
        emissiveIntensity: 0.18
      })), n.set(h, u);
    }
    return u;
  }
  function o(a) {
    const l = `${a.certainty}:${a.category}`;
    let c = i.get(l);
    if (!c) {
      const h = a.certainty && a.certainty !== "confirmed";
      c = e.own(new Qu({
        color: t ? "#b1bfca" : "#798b91",
        dashSize: a.certainty === "unknown" ? 0.035 : 0.12,
        gapSize: h ? 0.09 : 0,
        transparent: !0,
        opacity: Wr(a, "").opacity
      })), i.set(l, c);
    }
    return c;
  }
  return {
    mesh: r,
    line: o
  };
}
var $l = class {
  resources = /* @__PURE__ */ new Set();
  own(e) {
    return this.resources.add(e), e;
  }
  dispose() {
    for (const e of this.resources) e.dispose();
    this.resources.clear();
  }
}, Ui = new C();
function zt(e, t, n, i, s, r) {
  const o = 2 * Math.PI * s / 4, a = Math.max(r - 2 * s, 0), l = Math.PI / 4;
  Ui.copy(t), Ui[i] = 0, Ui.normalize();
  const c = 0.5 * o / (o + a), h = 1 - Ui.angleTo(e) / l;
  return Math.sign(Ui[n]) === 1 ? h * c : a / (o + a) + c + c * (1 - h);
}
var ka = class Ql extends is {
  constructor(t = 1, n = 1, i = 1, s = 2, r = 0.1) {
    const o = s * 2 + 1;
    if (r = Math.min(t / 2, n / 2, i / 2, r), super(1, 1, 1, o, o, o), this.type = "RoundedBoxGeometry", this.parameters = {
      width: t,
      height: n,
      depth: i,
      segments: s,
      radius: r
    }, o === 1) return;
    const a = this.toNonIndexed();
    this.index = null, this.attributes.position = a.attributes.position, this.attributes.normal = a.attributes.normal, this.attributes.uv = a.attributes.uv;
    const l = new C(), c = new C(), h = new C(t, n, i).divideScalar(2).subScalar(r), u = this.attributes.position.array, d = this.attributes.normal.array, p = this.attributes.uv.array, _ = u.length / 6, g = new C(), m = 0.5 / o;
    for (let f = 0, y = 0; f < u.length; f += 3, y += 2)
      switch (l.fromArray(u, f), c.copy(l), c.x -= Math.sign(c.x) * m, c.y -= Math.sign(c.y) * m, c.z -= Math.sign(c.z) * m, c.normalize(), u[f + 0] = h.x * Math.sign(l.x) + c.x * r, u[f + 1] = h.y * Math.sign(l.y) + c.y * r, u[f + 2] = h.z * Math.sign(l.z) + c.z * r, d[f + 0] = c.x, d[f + 1] = c.y, d[f + 2] = c.z, Math.floor(f / _)) {
        case 0:
          g.set(1, 0, 0), p[y + 0] = zt(g, c, "z", "y", r, i), p[y + 1] = 1 - zt(g, c, "y", "z", r, n);
          break;
        case 1:
          g.set(-1, 0, 0), p[y + 0] = 1 - zt(g, c, "z", "y", r, i), p[y + 1] = 1 - zt(g, c, "y", "z", r, n);
          break;
        case 2:
          g.set(0, 1, 0), p[y + 0] = 1 - zt(g, c, "x", "z", r, t), p[y + 1] = zt(g, c, "z", "x", r, i);
          break;
        case 3:
          g.set(0, -1, 0), p[y + 0] = 1 - zt(g, c, "x", "z", r, t), p[y + 1] = 1 - zt(g, c, "z", "x", r, i);
          break;
        case 4:
          g.set(0, 0, 1), p[y + 0] = 1 - zt(g, c, "x", "y", r, t), p[y + 1] = 1 - zt(g, c, "y", "x", r, n);
          break;
        case 5:
          g.set(0, 0, -1), p[y + 0] = zt(g, c, "x", "y", r, t), p[y + 1] = 1 - zt(g, c, "y", "x", r, n);
          break;
      }
  }
  static fromJSON(t) {
    return new Ql(t.width, t.height, t.depth, t.segments, t.radius);
  }
};
function am(e, t) {
  const n = e.own(new ka(1, 1, 1, 3, 0.035)), i = e.own(new ka(1, 1, 1, 4, 0.16)), s = e.own(n.clone()), r = s.getAttribute("position");
  for (let c = 0; c < r.count; c += 1) {
    const h = 0.72 + 0.28 * (r.getY(c) + 0.5);
    r.setX(c, r.getX(c) * h), r.setZ(c, r.getZ(c) * h);
  }
  s.computeVertexNormals();
  const o = e.own(new pu(0.5, 0.5, 1, 32)), a = e.own(new kl(0.5, 16, 10)), l = e.own(new gu(0.5, 0));
  return function(h, u, d, p, _) {
    const g = Math.min(1.6, Math.min(p, _)), m = /* @__PURE__ */ new Map();
    function f(A, b, R, I, M, E, P = 0, F = n) {
      const H = t.mesh(u, P), B = `${F.uuid}:${H.uuid}`;
      m.has(B) || m.set(B, {
        geometry: F,
        material: H,
        matrices: []
      }), m.get(B).matrices.push(new Ve().makeScale(I * p, M * g, E * _).setPosition(A * p, b * g, R * _));
    }
    function y(A) {
      for (const b of [-0.37, 0.37]) for (const R of [-0.36, 0.36]) f(b, A / 2, R, 0.075, A, 0.075, -0.16, s);
    }
    function v() {
      switch (d) {
        case "table":
          if (u.shape === "circle")
            f(0, 0.6, 0, 1, 0.08, 1, 0.12, o), f(0, 0.29, 0, 0.18, 0.58, 0.18, -0.15, o), f(0, 0.04, 0, 0.43, 0.08, 0.43, -0.22, o);
          else {
            y(0.58);
            for (const A of [-0.36, 0.36]) f(0, 0.52, A, 0.83, 0.13, 0.045, -0.12);
            for (const A of [-0.37, 0.37]) f(A, 0.52, 0, 0.045, 0.13, 0.75, -0.12);
            f(0, 0.607, 0, 0.98, 0.065, 0.98, -0.1), f(0, 0.651, 0, 1, 0.035, 1, 0.12);
          }
          return 0.67 * g;
        case "chair":
          y(0.52), f(0, 0.55, 0.035, 1, 0.08, 0.93, 0.06), f(0, 0.595, 0.05, 0.91, 0.035, 0.83, 0.16);
          for (const A of [-0.42, 0.42]) f(A, 0.82, -0.425, 0.095, 0.73, 0.12, -0.1);
          for (const A of [
            -0.22,
            0,
            0.22
          ]) f(A, 0.9, -0.425, 0.12, 0.42, 0.07, 0.02);
          f(0, 1.14, -0.425, 0.96, 0.1, 0.14, 0.12);
          for (const A of [-0.37, 0.37]) f(A, 0.23, 0, 0.035, 0.045, 0.74, -0.12);
          return 1.19 * g;
        case "bed":
          return y(0.2), f(0, 0.24, 0, 1, 0.18, 1, -0.2), f(0, 0.39, 0.02, 0.96, 0.16, 0.92, 0.55), f(0, 0.5, 0.15, 0.98, 0.06, 0.63, 0.08), f(0, 0.5, -0.29, 0.64, 0.13, 0.22, 0.65), f(0, 0.47, -0.47, 1, 0.7, 0.06, -0.16), 0.82 * g;
        case "counter":
          f(0, 0.08, 0, 0.9, 0.16, 0.86, -0.28), f(0, 0.57, 0, 0.94, 0.9, 0.91, -0.08), f(0, 0.17, 0.46, 0.96, 0.1, 0.06, 0.06), f(0, 0.94, 0.46, 0.96, 0.08, 0.06, 0.08);
          for (const A of [
            -0.32,
            0,
            0.32
          ])
            f(A, 0.55, 0.46, 0.28, 0.66, 0.045, 0.03), f(A, 0.55, 0.487, 0.235, 0.52, 0.02, -0.09);
          return f(0, 1.025, 0, 1, 0.065, 1, -0.18), f(0, 1.065, 0, 1, 0.03, 1, 0.16), 1.08 * g;
        case "shelf":
          f(0, 1.05, -0.47, 1, 2.1, 0.06, -0.2);
          for (const A of [-0.48, 0.48]) f(A, 1.05, 0, 0.04, 2.1, 1, -0.08);
          for (let A = 0; A < 4; A += 1) f(0, 0.04 + A * 0.67, 0, 1, 0.06, 1, 0.12);
          for (const A of [-0.17, 0.17]) f(A, 1.03, 0, 0.025, 1.98, 0.92, -0.04);
          return f(0, 2.06, 0, 1, 0.08, 1, 0.16), 2.1 * g;
        case "sofa":
          y(0.14), f(0, 0.26, 0, 0.96, 0.27, 0.96, -0.18), f(0, 0.65, -0.37, 0.98, 0.76, 0.26, -0.08, i);
          for (const A of [-0.44, 0.44]) f(A, 0.52, 0, 0.12, 0.49, 0.98, 0.02, i);
          for (const A of [
            -0.26,
            0,
            0.26
          ])
            f(A, 0.46, 0.11, 0.245, 0.19, 0.72, 0.12, i), f(A, 0.77, -0.22, 0.245, 0.43, 0.22, 0.08, i);
          return 1.04 * g;
        case "bridge":
          for (let A = 0; A < 12; A += 1) f(0, 0.16, -0.46 + A * 0.083, 1, 0.1, 0.075, A % 2 ? 0.1 : 0);
          for (const A of [-0.45, 0.45]) {
            f(A, 0.61, 0, 0.045, 0.045, 1, -0.15);
            for (const b of [
              -0.45,
              0,
              0.45
            ]) f(A, 0.35, b, 0.055, 0.55, 0.04, -0.18);
          }
          return 0.65 * g;
        case "tree":
          return f(0, 0.44, 0, 0.14, 0.88, 0.14, -0.42, o), f(0, 1.04, 0, 1, 1.2, 1, -0.04, a), f(-0.16, 1.3, -0.06, 0.6, 0.65, 0.6, 0.13, a), 1.65 * g;
        case "rock":
          return f(0, 0.29, 0, 1, 0.62, 1, 0.03, l), 0.6 * g;
      }
    }
    const S = v();
    for (const { geometry: A, material: b, matrices: R } of m.values()) {
      const I = e.own(new ji(A, b, R.length));
      R.forEach((M, E) => I.setMatrixAt(E, M)), I.castShadow = b.opacity >= 0.8, I.receiveShadow = !0, h.add(I);
    }
    return S;
  };
}
var Ha = {
  table: [1.2, 3],
  chair: [0.75, 1.35],
  bed: [0.4, 0.85],
  shelf: [1, 8],
  tree: [0.6, 1.7],
  rock: [0.6, 1.7]
};
function ec(e) {
  const t = Jl(e);
  if (!t || !Object.hasOwn(Ha, t)) return;
  if (e.shape === "circle") return t === "tree" || t === "rock" ? t : void 0;
  const { width: n, height: i } = Ka(e), s = n / i, [r, o] = Ha[t];
  return s >= r && s <= o ? t : void 0;
}
function lm(e, t, n, i, s, r, o, a) {
  const { size: l } = i, c = n === "shelf" ? Math.max(1, Math.ceil(s / r / (l.x / l.z))) : 1, h = t.shape === "circle" ? s / (2 * i.radius) : Math.min(s / c / l.x, r / l.z), u = t.material ? t : {
    ...t,
    material: n === "tree" ? "forest" : n === "rock" ? "stone" : "unknown"
  };
  for (const d of i.parts) {
    const p = o.own(d.geometry.clone());
    if (p.scale(h, h, h), n === "table") {
      const y = p.getAttribute("position"), v = l.x * h / 2, S = s / 2 - v;
      for (let A = 0; A < y.count; A++) {
        if (y.getY(A) < l.y * h * 0.55) continue;
        const b = y.getX(A);
        y.setX(A, b + Math.max(-1, Math.min(1, b / (v * 0.5))) * S);
      }
      p.computeVertexNormals();
    }
    p.computeBoundingBox(), p.computeBoundingSphere();
    const _ = d.role === "soft" ? {
      ...t,
      material: "bed-sheet"
    } : d.role === "bark" && (!t.material || ["grass", "forest"].includes(t.material)) ? {
      ...t,
      material: "wood"
    } : u, g = d.role === "detail" || d.role === "bark" ? -0.22 : d.role === "soft" ? 0.12 : 0, m = a.mesh(_, g), f = o.own(new ji(p, m, c));
    for (let y = 0; y < c; y++) f.setMatrixAt(y, new Ve().makeTranslation((y - (c - 1) / 2) * l.x * h, 0, 0));
    f.castShadow = m.opacity >= 0.8, f.receiveShadow = !0, e.add(f);
  }
  return l.y * h;
}
function cm(e, t) {
  let n = !1;
  for (let i = 0, s = t.length - 1; i < t.length; s = i++) {
    const r = t[i], o = t[s];
    r.y > e.y != o.y > e.y && e.x < (o.x - r.x) * (e.y - r.y) / (o.y - r.y) + r.x && (n = !n);
  }
  return n;
}
function hm(e, t, n) {
  const i = new $l(), s = new fn();
  try {
    const r = $p(e), o = om(i, t), a = am(i, o), l = i.own(new is(1, 1, 1)), c = i.own(new kl(0.5, 8, 6)), h = fc(e.elements), u = /* @__PURE__ */ new Map(), d = [];
    for (const [_, g] of dc(e.elements).entries()) {
      const m = Qp(g, r.scale), f = new fn();
      f.position.copy(r.point(...m.center, _ * 2e-3)), f.rotation.y = m.rotation, s.add(f);
      let y = 0.015;
      const v = Jl(g), S = !v && !Qi(g) && Mo(g) && ["furniture", "decoration"].includes(g.category);
      if (g.shape === "icon" || g.shape === "label") y = 0.08;
      else if (g.category === "wall") {
        y = 1.1;
        const b = im(m.points, m.closed), R = i.own(new ji(l, o.mesh(g, 0.12), b.length));
        R.castShadow = R.receiveShadow = !0, f.add(R), b.forEach((I, M) => {
          const E = new Ve().makeRotationY(I.rotation).scale(new C(I.length, y, 0.08)).setPosition(I.x, y / 2, I.z);
          R.setMatrixAt(M, E);
        }), d.push(R);
      } else if (v) {
        const b = ec(g), R = b && n?.get(b);
        y = b && R ? lm(f, g, b, R, m.width, m.depth, i, o) : a(f, g, v, m.width, m.depth);
      } else if (Mo(g)) {
        y = S ? 0.2 : 0.015;
        const b = new Tt(i.own(em(m.points, y)), o.mesh(g));
        b.castShadow = y > 0.1, b.receiveShadow = !0, f.add(b);
      } else if (g.category === "road" || g.category === "water") {
        const b = new Tt(i.own(nm(m.points, m.closed, g.category === "road" ? 0.16 : 0.08).translate(0, y, 0)), o.mesh(g));
        b.receiveShadow = !0, f.add(b);
      }
      if (m.points.length && !v) {
        const b = new Ks(i.own(tm(m.points, m.closed, g.category === "wall" ? 0.012 : y + 4e-3)), o.line(g));
        b.computeLineDistances(), f.add(b);
      }
      const A = (h.get(g.id) || []).flatMap((b) => {
        const R = new re((b.x - m.center[0]) / r.scale, (b.y - m.center[1]) / r.scale), I = b.size / r.scale / 2;
        return Array.from({ length: 8 }, (M, E) => new re(R.x + I * Math.cos(E * Math.PI / 4), R.y + I * Math.sin(E * Math.PI / 4))).every((M) => cm(M, m.points)) ? [{
          center: R,
          radius: I
        }] : [];
      });
      if (A.length) {
        const b = new ji(c, o.mesh(g, -0.13), A.length);
        A.forEach(({ center: R, radius: I }, M) => b.setMatrixAt(M, new Ve().makeScale(I * 2, I * 1.4, I * 2).setPosition(R.x, I * 0.7 + y, R.y))), b.castShadow = b.receiveShadow = !0, i.own(b), f.add(b);
      }
      Qi(g) ? u.set(g.id, r.point(...m.center, f.position.y + 0.025)) : v || S ? u.set(g.id, r.point(...m.center, f.position.y + y + 0.1)) : u.set(g.id, r.point(...cc(g, 0), f.position.y + 0.1));
    }
    const p = new Gt().setFromObject(s);
    for (const _ of u.values()) p.expandByPoint(_);
    return {
      group: s,
      anchors: u,
      bounds: p,
      updateWalls(_) {
        for (const g of d) g.scale.y = _ ? 0.2 / 1.1 : 1;
      },
      dispose() {
        s.removeFromParent(), i.dispose(), s.clear();
      }
    };
  } catch (r) {
    throw i.dispose(), s.clear(), r;
  }
}
var Va = (e, t) => e.x < t.x + t.w + 3 && e.x + e.w + 3 > t.x && e.y < t.y + t.h + 3 && e.y + e.h + 3 > t.y;
function um(e, t, n, i = []) {
  const s = /* @__PURE__ */ new Map(), r = [...e].sort((h, u) => h.priority - u.priority || h.id.localeCompare(u.id)), o = [...i], a = r.filter((h) => h.badge).map(({ anchor: h }) => ({
    x: h.x - 3,
    y: h.y - 3,
    w: 6,
    h: 6
  })), l = (h) => h.x >= 3 && h.y >= 3 && h.x + h.w <= t - 3 && h.y + h.h <= n - 3, c = (h) => l(h) && !o.some((u) => Va(h, u)) && !a.some((u) => Va(h, u));
  for (const h of r) {
    const u = { anchor: { ...h.anchor } };
    if (s.set(h.id, u), !h.badge) continue;
    const { w: d, h: p } = h.badge, { x: _, y: g } = h.anchor, m = [];
    for (const y of [
      9,
      27,
      45
    ]) m.push({
      x: _ - d / 2,
      y: g - p - y,
      w: d,
      h: p
    }, {
      x: _ + y,
      y: g - p / 2,
      w: d,
      h: p
    }, {
      x: _ - d - y,
      y: g - p / 2,
      w: d,
      h: p
    }, {
      x: _ - d / 2,
      y: g + y,
      w: d,
      h: p
    });
    const f = m.map((y) => ({
      x: Math.max(3, Math.min(t - d - 3, y.x)),
      y: Math.max(3, Math.min(n - p - 3, y.y)),
      w: d,
      h: p
    }));
    u.badge = f.find(c) || f[0], o.push(u.badge);
  }
  for (const h of r) {
    if (!h.caption) continue;
    const u = s.get(h.id), { w: d, h: p } = h.caption, _ = u.badge || {
      ...h.anchor,
      w: 0,
      h: 0
    };
    u.caption = [
      {
        x: _.x + (_.w - d) / 2,
        y: _.y - p - 5,
        w: d,
        h: p
      },
      {
        x: _.x + _.w + 6,
        y: _.y + (_.h - p) / 2,
        w: d,
        h: p
      },
      {
        x: _.x - d - 6,
        y: _.y + (_.h - p) / 2,
        w: d,
        h: p
      },
      {
        x: _.x + (_.w - d) / 2,
        y: _.y + _.h + 5,
        w: d,
        h: p
      }
    ].find(c), u.caption && o.push(u.caption);
  }
  return s;
}
function dm(e, t, n) {
  const i = t.elements.filter((s) => s.label || Qi(s)).map((s) => {
    const r = Qi(s) && s.shape !== "label", o = s.actorKey === "player", a = o ? 0 : s.category === "door" ? 1 : s.category === "actor" ? 2 : r ? 3 : 4, l = s.label || pc[s.category], c = document.createElement("span");
    c.className = `map-3d-label is-${s.category}${o ? " is-player" : ""}`, c.dataset.element = s.id, c.style.zIndex = String(10 - a), r && (c.setAttribute("role", "img"), c.setAttribute("aria-label", l));
    const h = Wr(s, "");
    c.style.opacity = String(h.opacity);
    const u = document.createElement("span");
    u.className = "map-3d-glyph", u.setAttribute("aria-hidden", "true");
    const d = document.createElement("span");
    d.className = "map-3d-anchor", d.setAttribute("aria-hidden", "true");
    const p = document.createElement("span");
    p.className = "map-3d-leader", p.setAttribute("aria-hidden", "true"), r && c.append(p, d, u);
    const _ = document.createElement("span");
    return _.textContent = l, _.className = "map-3d-label-text", r && _.setAttribute("aria-hidden", "true"), c.append(_), e.append(c), {
      element: s,
      node: c,
      glyph: u,
      dot: d,
      leader: p,
      caption: _,
      recipe: h,
      hasGlyph: r,
      priority: a,
      anchor: n.get(s.id)
    };
  });
  return {
    symbols(s) {
      for (const r of i)
        r.glyph.textContent = s ? r.recipe.icon : r.recipe.fallback, r.glyph.classList.toggle("has-symbols", s);
    },
    update(s, r, o, a) {
      const l = [];
      for (const { element: d, node: p, caption: _, glyph: g, anchor: m, hasGlyph: f, priority: y } of i) {
        p.style.visibility = "hidden", _.hidden = !a;
        const v = m.clone().project(s), S = (v.x + 1) * r / 2, A = (1 - v.y) * o / 2;
        v.z < -1 || v.z > 1 || S < 0 || S > r || A < 0 || A > o || l.push({
          id: d.id,
          anchor: {
            x: S,
            y: A
          },
          priority: y,
          badge: f ? {
            w: g.offsetWidth,
            h: g.offsetHeight
          } : void 0,
          caption: a ? {
            w: _.offsetWidth,
            h: _.offsetHeight
          } : void 0
        });
      }
      const c = e.parentElement?.querySelector(".map-viewport-controls")?.getBoundingClientRect(), h = e.getBoundingClientRect(), u = um(l, r, o, c ? [{
        x: c.x - h.x,
        y: c.y - h.y,
        w: c.width,
        h: c.height
      }] : []);
      for (const { element: d, node: p, caption: _, dot: g, leader: m } of i) {
        const f = u.get(d.id), y = f?.badge || f?.caption;
        if (_.style.visibility = f?.caption ? "inherit" : "hidden", !(!f || !y) && (p.style.visibility = "visible", p.style.transform = `translate(${y.x}px, ${y.y}px)`, p.style.width = `${y.w}px`, p.style.height = `${y.h}px`, f.caption && (_.style.left = `${f.caption.x - y.x}px`, _.style.top = `${f.caption.y - y.y}px`), f.badge)) {
          const v = f.anchor.x - y.x, S = f.anchor.y - y.y;
          g.style.transform = `translate(${v}px, ${S}px)`;
          const A = Math.max(0, Math.min(y.w, v)), b = Math.max(0, Math.min(y.h, S));
          m.style.width = `${Math.hypot(A - v, b - S)}px`, m.style.transform = `translate(${v}px, ${S}px) rotate(${Math.atan2(b - S, A - v)}rad)`;
        }
      }
    },
    dispose() {
      for (const { node: s } of i) s.remove();
    }
  };
}
function Ga(e, t) {
  if (t === 0)
    return console.warn("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Geometry already defined as triangles."), e;
  if (t === 2 || t === 1) {
    let n = e.getIndex();
    if (n === null) {
      const o = [], a = e.getAttribute("position");
      if (a !== void 0) {
        for (let l = 0; l < a.count; l++) o.push(l);
        e.setIndex(o), n = e.getIndex();
      } else
        return console.error("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Undefined position attribute. Processing not possible."), e;
    }
    const i = n.count - 2, s = [];
    if (t === 2) for (let o = 1; o <= i; o++)
      s.push(n.getX(0)), s.push(n.getX(o)), s.push(n.getX(o + 1));
    else for (let o = 0; o < i; o++) o % 2 === 0 ? (s.push(n.getX(o)), s.push(n.getX(o + 1)), s.push(n.getX(o + 2))) : (s.push(n.getX(o + 2)), s.push(n.getX(o + 1)), s.push(n.getX(o)));
    s.length / 3 !== i && console.error("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Unable to generate correct amount of triangles.");
    const r = e.clone();
    return r.setIndex(s), r.clearGroups(), r;
  } else
    return console.error("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Unknown draw mode:", t), e;
}
var fm = class extends Ei {
  constructor(e) {
    super(e), this.dracoLoader = null, this.ktx2Loader = null, this.meshoptDecoder = null, this.pluginCallbacks = [], this.register(function(t) {
      return new vm(t);
    }), this.register(function(t) {
      return new xm(t);
    }), this.register(function(t) {
      return new Rm(t);
    }), this.register(function(t) {
      return new Cm(t);
    }), this.register(function(t) {
      return new Pm(t);
    }), this.register(function(t) {
      return new Mm(t);
    }), this.register(function(t) {
      return new Sm(t);
    }), this.register(function(t) {
      return new Em(t);
    }), this.register(function(t) {
      return new Tm(t);
    }), this.register(function(t) {
      return new _m(t);
    }), this.register(function(t) {
      return new bm(t);
    }), this.register(function(t) {
      return new ym(t);
    }), this.register(function(t) {
      return new wm(t);
    }), this.register(function(t) {
      return new Am(t);
    }), this.register(function(t) {
      return new mm(t);
    }), this.register(function(t) {
      return new Lm(t);
    }), this.register(function(t) {
      return new Im(t);
    });
  }
  load(e, t, n, i) {
    const s = this;
    let r;
    if (this.resourcePath !== "") r = this.resourcePath;
    else if (this.path !== "") {
      const l = Gi.extractUrlBase(e);
      r = Gi.resolveURL(l, this.path);
    } else r = Gi.extractUrlBase(e);
    this.manager.itemStart(e);
    const o = function(l) {
      i ? i(l) : console.error(l), s.manager.itemError(e), s.manager.itemEnd(e);
    }, a = new Wl(this.manager);
    a.setPath(this.path), a.setResponseType("arraybuffer"), a.setRequestHeader(this.requestHeader), a.setWithCredentials(this.withCredentials), a.load(e, function(l) {
      try {
        s.parse(l, r, function(c) {
          t(c), s.manager.itemEnd(e);
        }, o);
      } catch (c) {
        o(c);
      }
    }, n, o);
  }
  setDRACOLoader(e) {
    return this.dracoLoader = e, this;
  }
  setKTX2Loader(e) {
    return this.ktx2Loader = e, this;
  }
  setMeshoptDecoder(e) {
    return this.meshoptDecoder = e, this;
  }
  register(e) {
    return this.pluginCallbacks.indexOf(e) === -1 && this.pluginCallbacks.push(e), this;
  }
  unregister(e) {
    return this.pluginCallbacks.indexOf(e) !== -1 && this.pluginCallbacks.splice(this.pluginCallbacks.indexOf(e), 1), this;
  }
  parse(e, t, n, i) {
    let s;
    const r = {}, o = {}, a = new TextDecoder();
    if (typeof e == "string") s = JSON.parse(e);
    else if (e instanceof ArrayBuffer) if (a.decode(new Uint8Array(e, 0, 4)) === tc) {
      try {
        r[je.KHR_BINARY_GLTF] = new Dm(e);
      } catch (c) {
        i && i(c);
        return;
      }
      s = JSON.parse(r[je.KHR_BINARY_GLTF].content);
    } else s = JSON.parse(a.decode(e));
    else s = e;
    if (s.asset === void 0 || s.asset.version[0] < 2) {
      i && i(/* @__PURE__ */ new Error("THREE.GLTFLoader: Unsupported asset. glTF versions >=2.0 are supported."));
      return;
    }
    const l = new Ym(s, {
      path: t || this.resourcePath || "",
      crossOrigin: this.crossOrigin,
      requestHeader: this.requestHeader,
      manager: this.manager,
      ktx2Loader: this.ktx2Loader,
      meshoptDecoder: this.meshoptDecoder
    });
    l.fileLoader.setRequestHeader(this.requestHeader);
    for (let c = 0; c < this.pluginCallbacks.length; c++) {
      const h = this.pluginCallbacks[c](l);
      h.name || console.error("THREE.GLTFLoader: Invalid plugin found: missing name"), o[h.name] = h, r[h.name] = !0;
    }
    if (s.extensionsUsed) for (let c = 0; c < s.extensionsUsed.length; ++c) {
      const h = s.extensionsUsed[c], u = s.extensionsRequired || [];
      switch (h) {
        case je.KHR_MATERIALS_UNLIT:
          r[h] = new gm();
          break;
        case je.KHR_DRACO_MESH_COMPRESSION:
          r[h] = new Nm(s, this.dracoLoader);
          break;
        case je.KHR_TEXTURE_TRANSFORM:
          r[h] = new Um();
          break;
        case je.KHR_MESH_QUANTIZATION:
          r[h] = new Om();
          break;
        default:
          u.indexOf(h) >= 0 && o[h] === void 0 && console.warn('THREE.GLTFLoader: Unknown extension "' + h + '".');
      }
    }
    l.setExtensions(r), l.setPlugins(o), l.parse(n, i);
  }
  parseAsync(e, t) {
    const n = this;
    return new Promise(function(i, s) {
      n.parse(e, t, i, s);
    });
  }
};
function pm() {
  let e = {};
  return {
    get: function(t) {
      return e[t];
    },
    add: function(t, n) {
      e[t] = n;
    },
    remove: function(t) {
      delete e[t];
    },
    removeAll: function() {
      e = {};
    }
  };
}
var je = {
  KHR_BINARY_GLTF: "KHR_binary_glTF",
  KHR_DRACO_MESH_COMPRESSION: "KHR_draco_mesh_compression",
  KHR_LIGHTS_PUNCTUAL: "KHR_lights_punctual",
  KHR_MATERIALS_CLEARCOAT: "KHR_materials_clearcoat",
  KHR_MATERIALS_DISPERSION: "KHR_materials_dispersion",
  KHR_MATERIALS_IOR: "KHR_materials_ior",
  KHR_MATERIALS_SHEEN: "KHR_materials_sheen",
  KHR_MATERIALS_SPECULAR: "KHR_materials_specular",
  KHR_MATERIALS_TRANSMISSION: "KHR_materials_transmission",
  KHR_MATERIALS_IRIDESCENCE: "KHR_materials_iridescence",
  KHR_MATERIALS_ANISOTROPY: "KHR_materials_anisotropy",
  KHR_MATERIALS_UNLIT: "KHR_materials_unlit",
  KHR_MATERIALS_VOLUME: "KHR_materials_volume",
  KHR_TEXTURE_BASISU: "KHR_texture_basisu",
  KHR_TEXTURE_TRANSFORM: "KHR_texture_transform",
  KHR_MESH_QUANTIZATION: "KHR_mesh_quantization",
  KHR_MATERIALS_EMISSIVE_STRENGTH: "KHR_materials_emissive_strength",
  EXT_MATERIALS_BUMP: "EXT_materials_bump",
  EXT_TEXTURE_WEBP: "EXT_texture_webp",
  EXT_TEXTURE_AVIF: "EXT_texture_avif",
  EXT_MESHOPT_COMPRESSION: "EXT_meshopt_compression",
  EXT_MESH_GPU_INSTANCING: "EXT_mesh_gpu_instancing"
}, mm = class {
  constructor(e) {
    this.parser = e, this.name = je.KHR_LIGHTS_PUNCTUAL, this.cache = {
      refs: {},
      uses: {}
    };
  }
  _markDefs() {
    const e = this.parser, t = this.parser.json.nodes || [];
    for (let n = 0, i = t.length; n < i; n++) {
      const s = t[n];
      s.extensions && s.extensions[this.name] && s.extensions[this.name].light !== void 0 && e._addNodeRef(this.cache, s.extensions[this.name].light);
    }
  }
  _loadLight(e) {
    const t = this.parser, n = "light:" + e;
    let i = t.cache.get(n);
    if (i) return i;
    const s = t.json, r = ((s.extensions && s.extensions[this.name] || {}).lights || [])[e];
    let o;
    const a = new Be(16777215);
    r.color !== void 0 && a.setRGB(r.color[0], r.color[1], r.color[2], Ut);
    const l = r.range !== void 0 ? r.range : 0;
    switch (r.type) {
      case "directional":
        o = new Jr(a), o.target.position.set(0, 0, -1), o.add(o.target);
        break;
      case "point":
        o = new vd(a), o.distance = l;
        break;
      case "spot":
        o = new gd(a), o.distance = l, r.spot = r.spot || {}, r.spot.innerConeAngle = r.spot.innerConeAngle !== void 0 ? r.spot.innerConeAngle : 0, r.spot.outerConeAngle = r.spot.outerConeAngle !== void 0 ? r.spot.outerConeAngle : Math.PI / 4, o.angle = r.spot.outerConeAngle, o.penumbra = 1 - r.spot.innerConeAngle / r.spot.outerConeAngle, o.target.position.set(0, 0, -1), o.add(o.target);
        break;
      default:
        throw new Error("THREE.GLTFLoader: Unexpected light type: " + r.type);
    }
    return o.position.set(0, 0, 0), Qt(o, r), r.intensity !== void 0 && (o.intensity = r.intensity), o.name = t.createUniqueName(r.name || "light_" + e), i = Promise.resolve(o), t.cache.add(n, i), i;
  }
  getDependency(e, t) {
    if (e === "light")
      return this._loadLight(t);
  }
  createNodeAttachment(e) {
    const t = this, n = this.parser, i = n.json.nodes[e], s = (i.extensions && i.extensions[this.name] || {}).light;
    return s === void 0 ? null : this._loadLight(s).then(function(r) {
      return n._getNodeRef(t.cache, s, r);
    });
  }
}, gm = class {
  constructor() {
    this.name = je.KHR_MATERIALS_UNLIT;
  }
  getMaterialType() {
    return zn;
  }
  extendParams(e, t, n) {
    const i = [];
    e.color = new Be(1, 1, 1), e.opacity = 1;
    const s = t.pbrMetallicRoughness;
    if (s) {
      if (Array.isArray(s.baseColorFactor)) {
        const r = s.baseColorFactor;
        e.color.setRGB(r[0], r[1], r[2], Ut), e.opacity = r[3];
      }
      s.baseColorTexture !== void 0 && i.push(n.assignTexture(e, "map", s.baseColorTexture, xt));
    }
    return Promise.all(i);
  }
}, _m = class {
  constructor(e) {
    this.parser = e, this.name = je.KHR_MATERIALS_EMISSIVE_STRENGTH;
  }
  extendMaterialParams(e, t) {
    const n = this.parser.json.materials[e];
    if (!n.extensions || !n.extensions[this.name]) return Promise.resolve();
    const i = n.extensions[this.name].emissiveStrength;
    return i !== void 0 && (t.emissiveIntensity = i), Promise.resolve();
  }
}, vm = class {
  constructor(e) {
    this.parser = e, this.name = je.KHR_MATERIALS_CLEARCOAT;
  }
  getMaterialType(e) {
    const t = this.parser.json.materials[e];
    return !t.extensions || !t.extensions[this.name] ? null : on;
  }
  extendMaterialParams(e, t) {
    const n = this.parser, i = n.json.materials[e];
    if (!i.extensions || !i.extensions[this.name]) return Promise.resolve();
    const s = [], r = i.extensions[this.name];
    if (r.clearcoatFactor !== void 0 && (t.clearcoat = r.clearcoatFactor), r.clearcoatTexture !== void 0 && s.push(n.assignTexture(t, "clearcoatMap", r.clearcoatTexture)), r.clearcoatRoughnessFactor !== void 0 && (t.clearcoatRoughness = r.clearcoatRoughnessFactor), r.clearcoatRoughnessTexture !== void 0 && s.push(n.assignTexture(t, "clearcoatRoughnessMap", r.clearcoatRoughnessTexture)), r.clearcoatNormalTexture !== void 0 && (s.push(n.assignTexture(t, "clearcoatNormalMap", r.clearcoatNormalTexture)), r.clearcoatNormalTexture.scale !== void 0)) {
      const o = r.clearcoatNormalTexture.scale;
      t.clearcoatNormalScale = new re(o, o);
    }
    return Promise.all(s);
  }
}, xm = class {
  constructor(e) {
    this.parser = e, this.name = je.KHR_MATERIALS_DISPERSION;
  }
  getMaterialType(e) {
    const t = this.parser.json.materials[e];
    return !t.extensions || !t.extensions[this.name] ? null : on;
  }
  extendMaterialParams(e, t) {
    const n = this.parser.json.materials[e];
    if (!n.extensions || !n.extensions[this.name]) return Promise.resolve();
    const i = n.extensions[this.name];
    return t.dispersion = i.dispersion !== void 0 ? i.dispersion : 0, Promise.resolve();
  }
}, ym = class {
  constructor(e) {
    this.parser = e, this.name = je.KHR_MATERIALS_IRIDESCENCE;
  }
  getMaterialType(e) {
    const t = this.parser.json.materials[e];
    return !t.extensions || !t.extensions[this.name] ? null : on;
  }
  extendMaterialParams(e, t) {
    const n = this.parser, i = n.json.materials[e];
    if (!i.extensions || !i.extensions[this.name]) return Promise.resolve();
    const s = [], r = i.extensions[this.name];
    return r.iridescenceFactor !== void 0 && (t.iridescence = r.iridescenceFactor), r.iridescenceTexture !== void 0 && s.push(n.assignTexture(t, "iridescenceMap", r.iridescenceTexture)), r.iridescenceIor !== void 0 && (t.iridescenceIOR = r.iridescenceIor), t.iridescenceThicknessRange === void 0 && (t.iridescenceThicknessRange = [100, 400]), r.iridescenceThicknessMinimum !== void 0 && (t.iridescenceThicknessRange[0] = r.iridescenceThicknessMinimum), r.iridescenceThicknessMaximum !== void 0 && (t.iridescenceThicknessRange[1] = r.iridescenceThicknessMaximum), r.iridescenceThicknessTexture !== void 0 && s.push(n.assignTexture(t, "iridescenceThicknessMap", r.iridescenceThicknessTexture)), Promise.all(s);
  }
}, Mm = class {
  constructor(e) {
    this.parser = e, this.name = je.KHR_MATERIALS_SHEEN;
  }
  getMaterialType(e) {
    const t = this.parser.json.materials[e];
    return !t.extensions || !t.extensions[this.name] ? null : on;
  }
  extendMaterialParams(e, t) {
    const n = this.parser, i = n.json.materials[e];
    if (!i.extensions || !i.extensions[this.name]) return Promise.resolve();
    const s = [];
    t.sheenColor = new Be(0, 0, 0), t.sheenRoughness = 0, t.sheen = 1;
    const r = i.extensions[this.name];
    if (r.sheenColorFactor !== void 0) {
      const o = r.sheenColorFactor;
      t.sheenColor.setRGB(o[0], o[1], o[2], Ut);
    }
    return r.sheenRoughnessFactor !== void 0 && (t.sheenRoughness = r.sheenRoughnessFactor), r.sheenColorTexture !== void 0 && s.push(n.assignTexture(t, "sheenColorMap", r.sheenColorTexture, xt)), r.sheenRoughnessTexture !== void 0 && s.push(n.assignTexture(t, "sheenRoughnessMap", r.sheenRoughnessTexture)), Promise.all(s);
  }
}, Sm = class {
  constructor(e) {
    this.parser = e, this.name = je.KHR_MATERIALS_TRANSMISSION;
  }
  getMaterialType(e) {
    const t = this.parser.json.materials[e];
    return !t.extensions || !t.extensions[this.name] ? null : on;
  }
  extendMaterialParams(e, t) {
    const n = this.parser, i = n.json.materials[e];
    if (!i.extensions || !i.extensions[this.name]) return Promise.resolve();
    const s = [], r = i.extensions[this.name];
    return r.transmissionFactor !== void 0 && (t.transmission = r.transmissionFactor), r.transmissionTexture !== void 0 && s.push(n.assignTexture(t, "transmissionMap", r.transmissionTexture)), Promise.all(s);
  }
}, Em = class {
  constructor(e) {
    this.parser = e, this.name = je.KHR_MATERIALS_VOLUME;
  }
  getMaterialType(e) {
    const t = this.parser.json.materials[e];
    return !t.extensions || !t.extensions[this.name] ? null : on;
  }
  extendMaterialParams(e, t) {
    const n = this.parser, i = n.json.materials[e];
    if (!i.extensions || !i.extensions[this.name]) return Promise.resolve();
    const s = [], r = i.extensions[this.name];
    t.thickness = r.thicknessFactor !== void 0 ? r.thicknessFactor : 0, r.thicknessTexture !== void 0 && s.push(n.assignTexture(t, "thicknessMap", r.thicknessTexture)), t.attenuationDistance = r.attenuationDistance || 1 / 0;
    const o = r.attenuationColor || [
      1,
      1,
      1
    ];
    return t.attenuationColor = new Be().setRGB(o[0], o[1], o[2], Ut), Promise.all(s);
  }
}, Tm = class {
  constructor(e) {
    this.parser = e, this.name = je.KHR_MATERIALS_IOR;
  }
  getMaterialType(e) {
    const t = this.parser.json.materials[e];
    return !t.extensions || !t.extensions[this.name] ? null : on;
  }
  extendMaterialParams(e, t) {
    const n = this.parser.json.materials[e];
    if (!n.extensions || !n.extensions[this.name]) return Promise.resolve();
    const i = n.extensions[this.name];
    return t.ior = i.ior !== void 0 ? i.ior : 1.5, Promise.resolve();
  }
}, bm = class {
  constructor(e) {
    this.parser = e, this.name = je.KHR_MATERIALS_SPECULAR;
  }
  getMaterialType(e) {
    const t = this.parser.json.materials[e];
    return !t.extensions || !t.extensions[this.name] ? null : on;
  }
  extendMaterialParams(e, t) {
    const n = this.parser, i = n.json.materials[e];
    if (!i.extensions || !i.extensions[this.name]) return Promise.resolve();
    const s = [], r = i.extensions[this.name];
    t.specularIntensity = r.specularFactor !== void 0 ? r.specularFactor : 1, r.specularTexture !== void 0 && s.push(n.assignTexture(t, "specularIntensityMap", r.specularTexture));
    const o = r.specularColorFactor || [
      1,
      1,
      1
    ];
    return t.specularColor = new Be().setRGB(o[0], o[1], o[2], Ut), r.specularColorTexture !== void 0 && s.push(n.assignTexture(t, "specularColorMap", r.specularColorTexture, xt)), Promise.all(s);
  }
}, Am = class {
  constructor(e) {
    this.parser = e, this.name = je.EXT_MATERIALS_BUMP;
  }
  getMaterialType(e) {
    const t = this.parser.json.materials[e];
    return !t.extensions || !t.extensions[this.name] ? null : on;
  }
  extendMaterialParams(e, t) {
    const n = this.parser, i = n.json.materials[e];
    if (!i.extensions || !i.extensions[this.name]) return Promise.resolve();
    const s = [], r = i.extensions[this.name];
    return t.bumpScale = r.bumpFactor !== void 0 ? r.bumpFactor : 1, r.bumpTexture !== void 0 && s.push(n.assignTexture(t, "bumpMap", r.bumpTexture)), Promise.all(s);
  }
}, wm = class {
  constructor(e) {
    this.parser = e, this.name = je.KHR_MATERIALS_ANISOTROPY;
  }
  getMaterialType(e) {
    const t = this.parser.json.materials[e];
    return !t.extensions || !t.extensions[this.name] ? null : on;
  }
  extendMaterialParams(e, t) {
    const n = this.parser, i = n.json.materials[e];
    if (!i.extensions || !i.extensions[this.name]) return Promise.resolve();
    const s = [], r = i.extensions[this.name];
    return r.anisotropyStrength !== void 0 && (t.anisotropy = r.anisotropyStrength), r.anisotropyRotation !== void 0 && (t.anisotropyRotation = r.anisotropyRotation), r.anisotropyTexture !== void 0 && s.push(n.assignTexture(t, "anisotropyMap", r.anisotropyTexture)), Promise.all(s);
  }
}, Rm = class {
  constructor(e) {
    this.parser = e, this.name = je.KHR_TEXTURE_BASISU;
  }
  loadTexture(e) {
    const t = this.parser, n = t.json, i = n.textures[e];
    if (!i.extensions || !i.extensions[this.name]) return null;
    const s = i.extensions[this.name], r = t.options.ktx2Loader;
    if (!r) {
      if (n.extensionsRequired && n.extensionsRequired.indexOf(this.name) >= 0) throw new Error("THREE.GLTFLoader: setKTX2Loader must be called before loading KTX2 textures");
      return null;
    }
    return t.loadTextureImage(e, s.source, r);
  }
}, Cm = class {
  constructor(e) {
    this.parser = e, this.name = je.EXT_TEXTURE_WEBP;
  }
  loadTexture(e) {
    const t = this.name, n = this.parser, i = n.json, s = i.textures[e];
    if (!s.extensions || !s.extensions[t]) return null;
    const r = s.extensions[t], o = i.images[r.source];
    let a = n.textureLoader;
    if (o.uri) {
      const l = n.options.manager.getHandler(o.uri);
      l !== null && (a = l);
    }
    return n.loadTextureImage(e, r.source, a);
  }
}, Pm = class {
  constructor(e) {
    this.parser = e, this.name = je.EXT_TEXTURE_AVIF;
  }
  loadTexture(e) {
    const t = this.name, n = this.parser, i = n.json, s = i.textures[e];
    if (!s.extensions || !s.extensions[t]) return null;
    const r = s.extensions[t], o = i.images[r.source];
    let a = n.textureLoader;
    if (o.uri) {
      const l = n.options.manager.getHandler(o.uri);
      l !== null && (a = l);
    }
    return n.loadTextureImage(e, r.source, a);
  }
}, Lm = class {
  constructor(e) {
    this.name = je.EXT_MESHOPT_COMPRESSION, this.parser = e;
  }
  loadBufferView(e) {
    const t = this.parser.json, n = t.bufferViews[e];
    if (n.extensions && n.extensions[this.name]) {
      const i = n.extensions[this.name], s = this.parser.getDependency("buffer", i.buffer), r = this.parser.options.meshoptDecoder;
      if (!r || !r.supported) {
        if (t.extensionsRequired && t.extensionsRequired.indexOf(this.name) >= 0) throw new Error("THREE.GLTFLoader: setMeshoptDecoder must be called before loading compressed files");
        return null;
      }
      return s.then(function(o) {
        const a = i.byteOffset || 0, l = i.byteLength || 0, c = i.count, h = i.byteStride, u = new Uint8Array(o, a, l);
        return r.decodeGltfBufferAsync ? r.decodeGltfBufferAsync(c, h, u, i.mode, i.filter).then(function(d) {
          return d.buffer;
        }) : r.ready.then(function() {
          const d = new ArrayBuffer(c * h);
          return r.decodeGltfBuffer(new Uint8Array(d), c, h, u, i.mode, i.filter), d;
        });
      });
    } else return null;
  }
}, Im = class {
  constructor(e) {
    this.name = je.EXT_MESH_GPU_INSTANCING, this.parser = e;
  }
  createNodeMesh(e) {
    const t = this.parser.json, n = t.nodes[e];
    if (!n.extensions || !n.extensions[this.name] || n.mesh === void 0) return null;
    const i = t.meshes[n.mesh];
    for (const a of i.primitives) if (a.mode !== kt.TRIANGLES && a.mode !== kt.TRIANGLE_STRIP && a.mode !== kt.TRIANGLE_FAN && a.mode !== void 0) return null;
    const s = n.extensions[this.name].attributes, r = [], o = {};
    for (const a in s) r.push(this.parser.getDependency("accessor", s[a]).then((l) => (o[a] = l, o[a])));
    return r.length < 1 ? null : (r.push(this.parser.createNodeMesh(e)), Promise.all(r).then((a) => {
      const l = a.pop(), c = l.isGroup ? l.children : [l], h = a[0].count, u = [];
      for (const d of c) {
        const p = new Ve(), _ = new C(), g = new nn(), m = new C(1, 1, 1), f = new ji(d.geometry, d.material, h);
        for (let y = 0; y < h; y++)
          o.TRANSLATION && _.fromBufferAttribute(o.TRANSLATION, y), o.ROTATION && g.fromBufferAttribute(o.ROTATION, y), o.SCALE && m.fromBufferAttribute(o.SCALE, y), f.setMatrixAt(y, p.compose(_, g, m));
        for (const y in o) if (y === "_COLOR_0") {
          const v = o[y];
          f.instanceColor = new Yr(v.array, v.itemSize, v.normalized);
        } else y !== "TRANSLATION" && y !== "ROTATION" && y !== "SCALE" && d.geometry.setAttribute(y, o[y]);
        pt.prototype.copy.call(f, d), this.parser.assignFinalMaterial(f), u.push(f);
      }
      return l.isGroup ? (l.clear(), l.add(...u), l) : u[0];
    }));
  }
}, tc = "glTF", Oi = 12, Wa = {
  JSON: 1313821514,
  BIN: 5130562
}, Dm = class {
  constructor(e) {
    this.name = je.KHR_BINARY_GLTF, this.content = null, this.body = null;
    const t = new DataView(e, 0, Oi), n = new TextDecoder();
    if (this.header = {
      magic: n.decode(new Uint8Array(e.slice(0, 4))),
      version: t.getUint32(4, !0),
      length: t.getUint32(8, !0)
    }, this.header.magic !== tc) throw new Error("THREE.GLTFLoader: Unsupported glTF-Binary header.");
    if (this.header.version < 2) throw new Error("THREE.GLTFLoader: Legacy binary file detected.");
    const i = this.header.length - Oi, s = new DataView(e, Oi);
    let r = 0;
    for (; r < i; ) {
      const o = s.getUint32(r, !0);
      r += 4;
      const a = s.getUint32(r, !0);
      if (r += 4, a === Wa.JSON) {
        const l = new Uint8Array(e, Oi + r, o);
        this.content = n.decode(l);
      } else if (a === Wa.BIN) {
        const l = Oi + r;
        this.body = e.slice(l, l + o);
      }
      r += o;
    }
    if (this.content === null) throw new Error("THREE.GLTFLoader: JSON content not found.");
  }
}, Nm = class {
  constructor(e, t) {
    if (!t) throw new Error("THREE.GLTFLoader: No DRACOLoader instance provided.");
    this.name = je.KHR_DRACO_MESH_COMPRESSION, this.json = e, this.dracoLoader = t, this.dracoLoader.preload();
  }
  decodePrimitive(e, t) {
    const n = this.json, i = this.dracoLoader, s = e.extensions[this.name].bufferView, r = e.extensions[this.name].attributes, o = {}, a = {}, l = {};
    for (const c in r) {
      const h = eo[c] || c.toLowerCase();
      o[h] = r[c];
    }
    for (const c in e.attributes) {
      const h = eo[c] || c.toLowerCase();
      if (r[c] !== void 0) {
        const u = n.accessors[e.attributes[c]];
        l[h] = di[u.componentType].name, a[h] = u.normalized === !0;
      }
    }
    return t.getDependency("bufferView", s).then(function(c) {
      return new Promise(function(h, u) {
        i.decodeDracoFile(c, function(d) {
          for (const p in d.attributes) {
            const _ = d.attributes[p], g = a[p];
            g !== void 0 && (_.normalized = g);
          }
          h(d);
        }, o, l, Ut, u);
      });
    });
  }
}, Um = class {
  constructor() {
    this.name = je.KHR_TEXTURE_TRANSFORM;
  }
  extendTexture(e, t) {
    return (t.texCoord === void 0 || t.texCoord === e.channel) && t.offset === void 0 && t.rotation === void 0 && t.scale === void 0 || (e = e.clone(), t.texCoord !== void 0 && (e.channel = t.texCoord), t.offset !== void 0 && e.offset.fromArray(t.offset), t.rotation !== void 0 && (e.rotation = t.rotation), t.scale !== void 0 && e.repeat.fromArray(t.scale), e.needsUpdate = !0), e;
  }
}, Om = class {
  constructor() {
    this.name = je.KHR_MESH_QUANTIZATION;
  }
}, nc = class extends ss {
  constructor(e, t, n, i) {
    super(e, t, n, i);
  }
  copySampleValue_(e) {
    const t = this.resultBuffer, n = this.sampleValues, i = this.valueSize, s = e * i * 3 + i;
    for (let r = 0; r !== i; r++) t[r] = n[s + r];
    return t;
  }
  interpolate_(e, t, n, i) {
    const s = this.resultBuffer, r = this.sampleValues, o = this.valueSize, a = o * 2, l = o * 3, c = i - t, h = (n - t) / c, u = h * h, d = u * h, p = e * l, _ = p - l, g = -2 * d + 3 * u, m = d - u, f = 1 - g, y = m - u + h;
    for (let v = 0; v !== o; v++) {
      const S = r[_ + v + o], A = r[_ + v + a] * c, b = r[p + v + o], R = r[p + v] * c;
      s[v] = f * S + y * A + g * b + m * R;
    }
    return s;
  }
}, Fm = new nn(), Bm = class extends nc {
  interpolate_(e, t, n, i) {
    const s = super.interpolate_(e, t, n, i);
    return Fm.fromArray(s).normalize().toArray(s), s;
  }
}, kt = {
  FLOAT: 5126,
  FLOAT_MAT3: 35675,
  FLOAT_MAT4: 35676,
  FLOAT_VEC2: 35664,
  FLOAT_VEC3: 35665,
  FLOAT_VEC4: 35666,
  LINEAR: 9729,
  REPEAT: 10497,
  SAMPLER_2D: 35678,
  POINTS: 0,
  LINES: 1,
  LINE_LOOP: 2,
  LINE_STRIP: 3,
  TRIANGLES: 4,
  TRIANGLE_STRIP: 5,
  TRIANGLE_FAN: 6,
  UNSIGNED_BYTE: 5121,
  UNSIGNED_SHORT: 5123
}, di = {
  5120: Int8Array,
  5121: Uint8Array,
  5122: Int16Array,
  5123: Uint16Array,
  5125: Uint32Array,
  5126: Float32Array
}, Xa = {
  9728: Vt,
  9729: gn,
  9984: ja,
  9985: Ja,
  9986: Za,
  9987: es
}, Ya = {
  33071: bn,
  33648: Vs,
  10497: Wi
}, Hr = {
  SCALAR: 1,
  VEC2: 2,
  VEC3: 3,
  VEC4: 4,
  MAT2: 4,
  MAT3: 9,
  MAT4: 16
}, eo = {
  POSITION: "position",
  NORMAL: "normal",
  TANGENT: "tangent",
  TEXCOORD_0: "uv",
  TEXCOORD_1: "uv1",
  TEXCOORD_2: "uv2",
  TEXCOORD_3: "uv3",
  COLOR_0: "color",
  WEIGHTS_0: "skinWeight",
  JOINTS_0: "skinIndex"
}, En = {
  scale: "scale",
  translation: "position",
  rotation: "quaternion",
  weights: "morphTargetInfluences"
}, zm = {
  CUBICSPLINE: void 0,
  LINEAR: Yi,
  STEP: Xi
}, Vr = {
  OPAQUE: "OPAQUE",
  MASK: "MASK",
  BLEND: "BLEND"
};
function km(e) {
  return e.DefaultMaterial === void 0 && (e.DefaultMaterial = new js({
    color: 16777215,
    emissive: 0,
    metalness: 1,
    roughness: 1,
    transparent: !1,
    depthTest: !0,
    side: 0
  })), e.DefaultMaterial;
}
function On(e, t, n) {
  for (const i in n.extensions) e[i] === void 0 && (t.userData.gltfExtensions = t.userData.gltfExtensions || {}, t.userData.gltfExtensions[i] = n.extensions[i]);
}
function Qt(e, t) {
  t.extras !== void 0 && (typeof t.extras == "object" ? Object.assign(e.userData, t.extras) : console.warn("THREE.GLTFLoader: Ignoring primitive type .extras, " + t.extras));
}
function Hm(e, t, n) {
  let i = !1, s = !1, r = !1;
  for (let c = 0, h = t.length; c < h; c++) {
    const u = t[c];
    if (u.POSITION !== void 0 && (i = !0), u.NORMAL !== void 0 && (s = !0), u.COLOR_0 !== void 0 && (r = !0), i && s && r) break;
  }
  if (!i && !s && !r) return Promise.resolve(e);
  const o = [], a = [], l = [];
  for (let c = 0, h = t.length; c < h; c++) {
    const u = t[c];
    if (i) {
      const d = u.POSITION !== void 0 ? n.getDependency("accessor", u.POSITION) : e.attributes.position;
      o.push(d);
    }
    if (s) {
      const d = u.NORMAL !== void 0 ? n.getDependency("accessor", u.NORMAL) : e.attributes.normal;
      a.push(d);
    }
    if (r) {
      const d = u.COLOR_0 !== void 0 ? n.getDependency("accessor", u.COLOR_0) : e.attributes.color;
      l.push(d);
    }
  }
  return Promise.all([
    Promise.all(o),
    Promise.all(a),
    Promise.all(l)
  ]).then(function(c) {
    const h = c[0], u = c[1], d = c[2];
    return i && (e.morphAttributes.position = h), s && (e.morphAttributes.normal = u), r && (e.morphAttributes.color = d), e.morphTargetsRelative = !0, e;
  });
}
function Vm(e, t) {
  if (e.updateMorphTargets(), t.weights !== void 0) for (let n = 0, i = t.weights.length; n < i; n++) e.morphTargetInfluences[n] = t.weights[n];
  if (t.extras && Array.isArray(t.extras.targetNames)) {
    const n = t.extras.targetNames;
    if (e.morphTargetInfluences.length === n.length) {
      e.morphTargetDictionary = {};
      for (let i = 0, s = n.length; i < s; i++) e.morphTargetDictionary[n[i]] = i;
    } else console.warn("THREE.GLTFLoader: Invalid extras.targetNames length. Ignoring names.");
  }
}
function Gm(e) {
  let t;
  const n = e.extensions && e.extensions[je.KHR_DRACO_MESH_COMPRESSION];
  if (n ? t = "draco:" + n.bufferView + ":" + n.indices + ":" + Gr(n.attributes) : t = e.indices + ":" + Gr(e.attributes) + ":" + e.mode, e.targets !== void 0) for (let i = 0, s = e.targets.length; i < s; i++) t += ":" + Gr(e.targets[i]);
  return t;
}
function Gr(e) {
  let t = "";
  const n = Object.keys(e).sort();
  for (let i = 0, s = n.length; i < s; i++) t += n[i] + ":" + e[n[i]] + ";";
  return t;
}
function to(e) {
  switch (e) {
    case Int8Array:
      return 1 / 127;
    case Uint8Array:
      return 1 / 255;
    case Int16Array:
      return 1 / 32767;
    case Uint16Array:
      return 1 / 65535;
    default:
      throw new Error("THREE.GLTFLoader: Unsupported normalized accessor component type.");
  }
}
function Wm(e) {
  return e.search(/\.jpe?g($|\?)/i) > 0 || e.search(/^data\:image\/jpeg/) === 0 ? "image/jpeg" : e.search(/\.webp($|\?)/i) > 0 || e.search(/^data\:image\/webp/) === 0 ? "image/webp" : e.search(/\.ktx2($|\?)/i) > 0 || e.search(/^data\:image\/ktx2/) === 0 ? "image/ktx2" : "image/png";
}
var Xm = new Ve(), Ym = class {
  constructor(e = {}, t = {}) {
    this.json = e, this.extensions = {}, this.plugins = {}, this.options = t, this.cache = new pm(), this.associations = /* @__PURE__ */ new Map(), this.primitiveCache = {}, this.nodeCache = {}, this.meshCache = {
      refs: {},
      uses: {}
    }, this.cameraCache = {
      refs: {},
      uses: {}
    }, this.lightCache = {
      refs: {},
      uses: {}
    }, this.sourceCache = {}, this.textureCache = {}, this.nodeNamesUsed = {};
    let n = !1, i = -1, s = !1, r = -1;
    if (typeof navigator < "u") {
      const o = navigator.userAgent;
      n = /^((?!chrome|android).)*safari/i.test(o) === !0;
      const a = o.match(/Version\/(\d+)/);
      i = n && a ? parseInt(a[1], 10) : -1, s = o.indexOf("Firefox") > -1, r = s ? o.match(/Firefox\/([0-9]+)\./)[1] : -1;
    }
    typeof createImageBitmap > "u" || n && i < 17 || s && r < 98 ? this.textureLoader = new fd(this.options.manager) : this.textureLoader = new yd(this.options.manager), this.textureLoader.setCrossOrigin(this.options.crossOrigin), this.textureLoader.setRequestHeader(this.options.requestHeader), this.fileLoader = new Wl(this.options.manager), this.fileLoader.setResponseType("arraybuffer"), this.options.crossOrigin === "use-credentials" && this.fileLoader.setWithCredentials(!0);
  }
  setExtensions(e) {
    this.extensions = e;
  }
  setPlugins(e) {
    this.plugins = e;
  }
  parse(e, t) {
    const n = this, i = this.json, s = this.extensions;
    this.cache.removeAll(), this.nodeCache = {}, this._invokeAll(function(r) {
      return r._markDefs && r._markDefs();
    }), Promise.all(this._invokeAll(function(r) {
      return r.beforeRoot && r.beforeRoot();
    })).then(function() {
      return Promise.all([
        n.getDependencies("scene"),
        n.getDependencies("animation"),
        n.getDependencies("camera")
      ]);
    }).then(function(r) {
      const o = {
        scene: r[0][i.scene || 0],
        scenes: r[0],
        animations: r[1],
        cameras: r[2],
        asset: i.asset,
        parser: n,
        userData: {}
      };
      return On(s, o, i), Qt(o, i), Promise.all(n._invokeAll(function(a) {
        return a.afterRoot && a.afterRoot(o);
      })).then(function() {
        for (const a of o.scenes) a.updateMatrixWorld();
        e(o);
      });
    }).catch(t);
  }
  _markDefs() {
    const e = this.json.nodes || [], t = this.json.skins || [], n = this.json.meshes || [];
    for (let i = 0, s = t.length; i < s; i++) {
      const r = t[i].joints;
      for (let o = 0, a = r.length; o < a; o++) e[r[o]].isBone = !0;
    }
    for (let i = 0, s = e.length; i < s; i++) {
      const r = e[i];
      r.mesh !== void 0 && (this._addNodeRef(this.meshCache, r.mesh), r.skin !== void 0 && (n[r.mesh].isSkinnedMesh = !0)), r.camera !== void 0 && this._addNodeRef(this.cameraCache, r.camera);
    }
  }
  _addNodeRef(e, t) {
    t !== void 0 && (e.refs[t] === void 0 && (e.refs[t] = e.uses[t] = 0), e.refs[t]++);
  }
  _getNodeRef(e, t, n) {
    if (e.refs[t] <= 1) return n;
    const i = n.clone(), s = (r, o) => {
      const a = this.associations.get(r);
      a != null && this.associations.set(o, a);
      for (const [l, c] of r.children.entries()) s(c, o.children[l]);
    };
    return s(n, i), i.name += "_instance_" + e.uses[t]++, i;
  }
  _invokeOne(e) {
    const t = Object.values(this.plugins);
    t.push(this);
    for (let n = 0; n < t.length; n++) {
      const i = e(t[n]);
      if (i) return i;
    }
    return null;
  }
  _invokeAll(e) {
    const t = Object.values(this.plugins);
    t.unshift(this);
    const n = [];
    for (let i = 0; i < t.length; i++) {
      const s = e(t[i]);
      s && n.push(s);
    }
    return n;
  }
  getDependency(e, t) {
    const n = e + ":" + t;
    let i = this.cache.get(n);
    if (!i) {
      switch (e) {
        case "scene":
          i = this.loadScene(t);
          break;
        case "node":
          i = this._invokeOne(function(s) {
            return s.loadNode && s.loadNode(t);
          });
          break;
        case "mesh":
          i = this._invokeOne(function(s) {
            return s.loadMesh && s.loadMesh(t);
          });
          break;
        case "accessor":
          i = this.loadAccessor(t);
          break;
        case "bufferView":
          i = this._invokeOne(function(s) {
            return s.loadBufferView && s.loadBufferView(t);
          });
          break;
        case "buffer":
          i = this.loadBuffer(t);
          break;
        case "material":
          i = this._invokeOne(function(s) {
            return s.loadMaterial && s.loadMaterial(t);
          });
          break;
        case "texture":
          i = this._invokeOne(function(s) {
            return s.loadTexture && s.loadTexture(t);
          });
          break;
        case "skin":
          i = this.loadSkin(t);
          break;
        case "animation":
          i = this._invokeOne(function(s) {
            return s.loadAnimation && s.loadAnimation(t);
          });
          break;
        case "camera":
          i = this.loadCamera(t);
          break;
        default:
          if (i = this._invokeOne(function(s) {
            return s != this && s.getDependency && s.getDependency(e, t);
          }), !i) throw new Error("Unknown type: " + e);
          break;
      }
      this.cache.add(n, i);
    }
    return i;
  }
  getDependencies(e) {
    let t = this.cache.get(e);
    if (!t) {
      const n = this, i = this.json[e + (e === "mesh" ? "es" : "s")] || [];
      t = Promise.all(i.map(function(s, r) {
        return n.getDependency(e, r);
      })), this.cache.add(e, t);
    }
    return t;
  }
  loadBuffer(e) {
    const t = this.json.buffers[e], n = this.fileLoader;
    if (t.type && t.type !== "arraybuffer") throw new Error("THREE.GLTFLoader: " + t.type + " buffer type is not supported.");
    if (t.uri === void 0 && e === 0) return Promise.resolve(this.extensions[je.KHR_BINARY_GLTF].body);
    const i = this.options;
    return new Promise(function(s, r) {
      n.load(Gi.resolveURL(t.uri, i.path), s, void 0, function() {
        r(/* @__PURE__ */ new Error('THREE.GLTFLoader: Failed to load buffer "' + t.uri + '".'));
      });
    });
  }
  loadBufferView(e) {
    const t = this.json.bufferViews[e];
    return this.getDependency("buffer", t.buffer).then(function(n) {
      const i = t.byteLength || 0, s = t.byteOffset || 0;
      return n.slice(s, s + i);
    });
  }
  loadAccessor(e) {
    const t = this, n = this.json, i = this.json.accessors[e];
    if (i.bufferView === void 0 && i.sparse === void 0) {
      const r = Hr[i.type], o = di[i.componentType], a = i.normalized === !0, l = new o(i.count * r);
      return Promise.resolve(new wt(l, r, a));
    }
    const s = [];
    return i.bufferView !== void 0 ? s.push(this.getDependency("bufferView", i.bufferView)) : s.push(null), i.sparse !== void 0 && (s.push(this.getDependency("bufferView", i.sparse.indices.bufferView)), s.push(this.getDependency("bufferView", i.sparse.values.bufferView))), Promise.all(s).then(function(r) {
      const o = r[0], a = Hr[i.type], l = di[i.componentType], c = l.BYTES_PER_ELEMENT, h = c * a, u = i.byteOffset || 0, d = i.bufferView !== void 0 ? n.bufferViews[i.bufferView].byteStride : void 0, p = i.normalized === !0;
      let _, g;
      if (d && d !== h) {
        const m = Math.floor(u / d), f = "InterleavedBuffer:" + i.bufferView + ":" + i.componentType + ":" + m + ":" + i.count;
        let y = t.cache.get(f);
        y || (_ = new l(o, m * d, i.count * d / c), y = new tu(_, d / c), t.cache.add(f, y)), g = new nu(y, a, u % d / c, p);
      } else
        o === null ? _ = new l(i.count * a) : _ = new l(o, u, i.count * a), g = new wt(_, a, p);
      if (i.sparse !== void 0) {
        const m = Hr.SCALAR, f = di[i.sparse.indices.componentType], y = i.sparse.indices.byteOffset || 0, v = i.sparse.values.byteOffset || 0, S = new f(r[1], y, i.sparse.count * m), A = new l(r[2], v, i.sparse.count * a);
        o !== null && (g = new wt(g.array.slice(), g.itemSize, g.normalized)), g.normalized = !1;
        for (let b = 0, R = S.length; b < R; b++) {
          const I = S[b];
          if (g.setX(I, A[b * a]), a >= 2 && g.setY(I, A[b * a + 1]), a >= 3 && g.setZ(I, A[b * a + 2]), a >= 4 && g.setW(I, A[b * a + 3]), a >= 5) throw new Error("THREE.GLTFLoader: Unsupported itemSize in sparse BufferAttribute.");
        }
        g.normalized = p;
      }
      return g;
    });
  }
  loadTexture(e) {
    const t = this.json, n = this.options, i = t.textures[e].source, s = t.images[i];
    let r = this.textureLoader;
    if (s.uri) {
      const o = n.manager.getHandler(s.uri);
      o !== null && (r = o);
    }
    return this.loadTextureImage(e, i, r);
  }
  loadTextureImage(e, t, n) {
    const i = this, s = this.json, r = s.textures[e], o = s.images[t], a = (o.uri || o.bufferView) + ":" + r.sampler;
    if (this.textureCache[a]) return this.textureCache[a];
    const l = this.loadImageSource(t, n).then(function(c) {
      c.flipY = !1, c.name = r.name || o.name || "", c.name === "" && typeof o.uri == "string" && o.uri.startsWith("data:image/") === !1 && (c.name = o.uri);
      const h = (s.samplers || {})[r.sampler] || {};
      return c.magFilter = Xa[h.magFilter] || 1006, c.minFilter = Xa[h.minFilter] || 1008, c.wrapS = Ya[h.wrapS] || 1e3, c.wrapT = Ya[h.wrapT] || 1e3, c.generateMipmaps = !c.isCompressedTexture && c.minFilter !== 1003 && c.minFilter !== 1006, i.associations.set(c, { textures: e }), c;
    }).catch(function() {
      return null;
    });
    return this.textureCache[a] = l, l;
  }
  loadImageSource(e, t) {
    const n = this, i = this.json, s = this.options;
    if (this.sourceCache[e] !== void 0) return this.sourceCache[e].then((h) => h.clone());
    const r = i.images[e], o = self.URL || self.webkitURL;
    let a = r.uri || "", l = !1;
    if (r.bufferView !== void 0) a = n.getDependency("bufferView", r.bufferView).then(function(h) {
      l = !0;
      const u = new Blob([h], { type: r.mimeType });
      return a = o.createObjectURL(u), a;
    });
    else if (r.uri === void 0) throw new Error("THREE.GLTFLoader: Image " + e + " is missing URI and bufferView");
    const c = Promise.resolve(a).then(function(h) {
      return new Promise(function(u, d) {
        let p = u;
        t.isImageBitmapLoader === !0 && (p = function(_) {
          const g = new Pt(_);
          g.needsUpdate = !0, u(g);
        }), t.load(Gi.resolveURL(h, s.path), p, void 0, d);
      });
    }).then(function(h) {
      return l === !0 && o.revokeObjectURL(a), Qt(h, r), h.userData.mimeType = r.mimeType || Wm(r.uri), h;
    }).catch(function(h) {
      throw console.error("THREE.GLTFLoader: Couldn't load texture", a), h;
    });
    return this.sourceCache[e] = c, c;
  }
  assignTexture(e, t, n, i) {
    const s = this;
    return this.getDependency("texture", n.index).then(function(r) {
      if (!r) return null;
      if (n.texCoord !== void 0 && n.texCoord > 0 && (r = r.clone(), r.channel = n.texCoord), s.extensions[je.KHR_TEXTURE_TRANSFORM]) {
        const o = n.extensions !== void 0 ? n.extensions[je.KHR_TEXTURE_TRANSFORM] : void 0;
        if (o) {
          const a = s.associations.get(r);
          r = s.extensions[je.KHR_TEXTURE_TRANSFORM].extendTexture(r, o), s.associations.set(r, a);
        }
      }
      return i !== void 0 && (r.colorSpace = i), e[t] = r, r;
    });
  }
  assignFinalMaterial(e) {
    const t = e.geometry;
    let n = e.material;
    const i = t.attributes.tangent === void 0, s = t.attributes.color !== void 0, r = t.attributes.normal === void 0;
    if (e.isPoints) {
      const o = "PointsMaterial:" + n.uuid;
      let a = this.cache.get(o);
      a || (a = new Ml(), tn.prototype.copy.call(a, n), a.color.copy(n.color), a.map = n.map, a.sizeAttenuation = !1, this.cache.add(o, a)), n = a;
    } else if (e.isLine) {
      const o = "LineBasicMaterial:" + n.uuid;
      let a = this.cache.get(o);
      a || (a = new lo(), tn.prototype.copy.call(a, n), a.color.copy(n.color), a.map = n.map, this.cache.add(o, a)), n = a;
    }
    if (i || s || r) {
      let o = "ClonedMaterial:" + n.uuid + ":";
      i && (o += "derivative-tangents:"), s && (o += "vertex-colors:"), r && (o += "flat-shading:");
      let a = this.cache.get(o);
      a || (a = n.clone(), s && (a.vertexColors = !0), r && (a.flatShading = !0), i && (a.normalScale && (a.normalScale.y *= -1), a.clearcoatNormalScale && (a.clearcoatNormalScale.y *= -1)), this.cache.add(o, a), this.associations.set(a, this.associations.get(n))), n = a;
    }
    e.material = n;
  }
  getMaterialType() {
    return js;
  }
  loadMaterial(e) {
    const t = this, n = this.json, i = this.extensions, s = n.materials[e];
    let r;
    const o = {}, a = s.extensions || {}, l = [];
    if (a[je.KHR_MATERIALS_UNLIT]) {
      const h = i[je.KHR_MATERIALS_UNLIT];
      r = h.getMaterialType(), l.push(h.extendParams(o, s, t));
    } else {
      const h = s.pbrMetallicRoughness || {};
      if (o.color = new Be(1, 1, 1), o.opacity = 1, Array.isArray(h.baseColorFactor)) {
        const u = h.baseColorFactor;
        o.color.setRGB(u[0], u[1], u[2], Ut), o.opacity = u[3];
      }
      h.baseColorTexture !== void 0 && l.push(t.assignTexture(o, "map", h.baseColorTexture, xt)), o.metalness = h.metallicFactor !== void 0 ? h.metallicFactor : 1, o.roughness = h.roughnessFactor !== void 0 ? h.roughnessFactor : 1, h.metallicRoughnessTexture !== void 0 && (l.push(t.assignTexture(o, "metalnessMap", h.metallicRoughnessTexture)), l.push(t.assignTexture(o, "roughnessMap", h.metallicRoughnessTexture))), r = this._invokeOne(function(u) {
        return u.getMaterialType && u.getMaterialType(e);
      }), l.push(Promise.all(this._invokeAll(function(u) {
        return u.extendMaterialParams && u.extendMaterialParams(e, o);
      })));
    }
    s.doubleSided === !0 && (o.side = 2);
    const c = s.alphaMode || Vr.OPAQUE;
    if (c === Vr.BLEND ? (o.transparent = !0, o.depthWrite = !1) : (o.transparent = !1, c === Vr.MASK && (o.alphaTest = s.alphaCutoff !== void 0 ? s.alphaCutoff : 0.5)), s.normalTexture !== void 0 && r !== zn && (l.push(t.assignTexture(o, "normalMap", s.normalTexture)), o.normalScale = new re(1, 1), s.normalTexture.scale !== void 0)) {
      const h = s.normalTexture.scale;
      o.normalScale.set(h, h);
    }
    if (s.occlusionTexture !== void 0 && r !== zn && (l.push(t.assignTexture(o, "aoMap", s.occlusionTexture)), s.occlusionTexture.strength !== void 0 && (o.aoMapIntensity = s.occlusionTexture.strength)), s.emissiveFactor !== void 0 && r !== zn) {
      const h = s.emissiveFactor;
      o.emissive = new Be().setRGB(h[0], h[1], h[2], Ut);
    }
    return s.emissiveTexture !== void 0 && r !== zn && l.push(t.assignTexture(o, "emissiveMap", s.emissiveTexture, xt)), Promise.all(l).then(function() {
      const h = new r(o);
      return s.name && (h.name = s.name), Qt(h, s), t.associations.set(h, { materials: e }), s.extensions && On(i, h, s), h;
    });
  }
  createUniqueName(e) {
    const t = ct.sanitizeNodeName(e || "");
    return t in this.nodeNamesUsed ? t + "_" + ++this.nodeNamesUsed[t] : (this.nodeNamesUsed[t] = 0, t);
  }
  loadGeometries(e) {
    const t = this, n = this.extensions, i = this.primitiveCache;
    function s(o) {
      return n[je.KHR_DRACO_MESH_COMPRESSION].decodePrimitive(o, t).then(function(a) {
        return qa(a, o, t);
      });
    }
    const r = [];
    for (let o = 0, a = e.length; o < a; o++) {
      const l = e[o], c = Gm(l), h = i[c];
      if (h) r.push(h.promise);
      else {
        let u;
        l.extensions && l.extensions[je.KHR_DRACO_MESH_COMPRESSION] ? u = s(l) : u = qa(new Lt(), l, t), i[c] = {
          primitive: l,
          promise: u
        }, r.push(u);
      }
    }
    return Promise.all(r);
  }
  loadMesh(e) {
    const t = this, n = this.json, i = this.extensions, s = n.meshes[e], r = s.primitives, o = [];
    for (let a = 0, l = r.length; a < l; a++) {
      const c = r[a].material === void 0 ? km(this.cache) : this.getDependency("material", r[a].material);
      o.push(c);
    }
    return o.push(t.loadGeometries(r)), Promise.all(o).then(function(a) {
      const l = a.slice(0, a.length - 1), c = a[a.length - 1], h = [];
      for (let d = 0, p = c.length; d < p; d++) {
        const _ = c[d], g = r[d];
        let m;
        const f = l[d];
        if (g.mode === kt.TRIANGLES || g.mode === kt.TRIANGLE_STRIP || g.mode === kt.TRIANGLE_FAN || g.mode === void 0)
          m = s.isSkinnedMesh === !0 ? new su(_, f) : new Tt(_, f), m.isSkinnedMesh === !0 && m.normalizeSkinWeights(), g.mode === kt.TRIANGLE_STRIP ? m.geometry = Ga(m.geometry, 1) : g.mode === kt.TRIANGLE_FAN && (m.geometry = Ga(m.geometry, 2));
        else if (g.mode === kt.LINES) m = new uu(_, f);
        else if (g.mode === kt.LINE_STRIP) m = new Ks(_, f);
        else if (g.mode === kt.LINE_LOOP) m = new du(_, f);
        else if (g.mode === kt.POINTS) m = new fu(_, f);
        else throw new Error("THREE.GLTFLoader: Primitive mode unsupported: " + g.mode);
        Object.keys(m.geometry.morphAttributes).length > 0 && Vm(m, s), m.name = t.createUniqueName(s.name || "mesh_" + e), Qt(m, s), g.extensions && On(i, m, g), t.assignFinalMaterial(m), h.push(m);
      }
      for (let d = 0, p = h.length; d < p; d++) t.associations.set(h[d], {
        meshes: e,
        primitives: d
      });
      if (h.length === 1)
        return s.extensions && On(i, h[0], s), h[0];
      const u = new fn();
      s.extensions && On(i, u, s), t.associations.set(u, { meshes: e });
      for (let d = 0, p = h.length; d < p; d++) u.add(h[d]);
      return u;
    });
  }
  loadCamera(e) {
    let t;
    const n = this.json.cameras[e], i = n[n.type];
    if (!i) {
      console.warn("THREE.GLTFLoader: Missing camera parameters.");
      return;
    }
    return n.type === "perspective" ? t = new Ct(Xs.radToDeg(i.yfov), i.aspectRatio || 1, i.znear || 1, i.zfar || 2e6) : n.type === "orthographic" && (t = new Js(-i.xmag, i.xmag, i.ymag, -i.ymag, i.znear, i.zfar)), n.name && (t.name = this.createUniqueName(n.name)), Qt(t, n), Promise.resolve(t);
  }
  loadSkin(e) {
    const t = this.json.skins[e], n = [];
    for (let i = 0, s = t.joints.length; i < s; i++) n.push(this._loadNodeShallow(t.joints[i]));
    return t.inverseBindMatrices !== void 0 ? n.push(this.getDependency("accessor", t.inverseBindMatrices)) : n.push(null), Promise.all(n).then(function(i) {
      const s = i.pop(), r = i, o = [], a = [];
      for (let l = 0, c = r.length; l < c; l++) {
        const h = r[l];
        if (h) {
          o.push(h);
          const u = new Ve();
          s !== null && u.fromArray(s.array, l * 16), a.push(u);
        } else console.warn('THREE.GLTFLoader: Joint "%s" could not be found.', t.joints[l]);
      }
      return new ou(o, a);
    });
  }
  loadAnimation(e) {
    const t = this.json, n = this, i = t.animations[e], s = i.name ? i.name : "animation_" + e, r = [], o = [], a = [], l = [], c = [];
    for (let h = 0, u = i.channels.length; h < u; h++) {
      const d = i.channels[h], p = i.samplers[d.sampler], _ = d.target, g = _.node, m = i.parameters !== void 0 ? i.parameters[p.input] : p.input, f = i.parameters !== void 0 ? i.parameters[p.output] : p.output;
      _.node !== void 0 && (r.push(this.getDependency("node", g)), o.push(this.getDependency("accessor", m)), a.push(this.getDependency("accessor", f)), l.push(p), c.push(_));
    }
    return Promise.all([
      Promise.all(r),
      Promise.all(o),
      Promise.all(a),
      Promise.all(l),
      Promise.all(c)
    ]).then(function(h) {
      const u = h[0], d = h[1], p = h[2], _ = h[3], g = h[4], m = [];
      for (let y = 0, v = u.length; y < v; y++) {
        const S = u[y], A = d[y], b = p[y], R = _[y], I = g[y];
        if (S === void 0) continue;
        S.updateMatrix && S.updateMatrix();
        const M = n._createAnimationTracks(S, A, b, R, I);
        if (M) for (let E = 0; E < M.length; E++) m.push(M[E]);
      }
      const f = new od(s, void 0, m);
      return Qt(f, i), f;
    });
  }
  createNodeMesh(e) {
    const t = this.json, n = this, i = t.nodes[e];
    return i.mesh === void 0 ? null : n.getDependency("mesh", i.mesh).then(function(s) {
      const r = n._getNodeRef(n.meshCache, i.mesh, s);
      return i.weights !== void 0 && r.traverse(function(o) {
        if (o.isMesh)
          for (let a = 0, l = i.weights.length; a < l; a++) o.morphTargetInfluences[a] = i.weights[a];
      }), r;
    });
  }
  loadNode(e) {
    const t = this.json, n = this, i = t.nodes[e], s = n._loadNodeShallow(e), r = [], o = i.children || [];
    for (let l = 0, c = o.length; l < c; l++) r.push(n.getDependency("node", o[l]));
    const a = i.skin === void 0 ? Promise.resolve(null) : n.getDependency("skin", i.skin);
    return Promise.all([
      s,
      Promise.all(r),
      a
    ]).then(function(l) {
      const c = l[0], h = l[1], u = l[2];
      u !== null && c.traverse(function(d) {
        d.isSkinnedMesh && d.bind(u, Xm);
      });
      for (let d = 0, p = h.length; d < p; d++) c.add(h[d]);
      return c;
    });
  }
  _loadNodeShallow(e) {
    const t = this.json, n = this.extensions, i = this;
    if (this.nodeCache[e] !== void 0) return this.nodeCache[e];
    const s = t.nodes[e], r = s.name ? i.createUniqueName(s.name) : "", o = [], a = i._invokeOne(function(l) {
      return l.createNodeMesh && l.createNodeMesh(e);
    });
    return a && o.push(a), s.camera !== void 0 && o.push(i.getDependency("camera", s.camera).then(function(l) {
      return i._getNodeRef(i.cameraCache, s.camera, l);
    })), i._invokeAll(function(l) {
      return l.createNodeAttachment && l.createNodeAttachment(e);
    }).forEach(function(l) {
      o.push(l);
    }), this.nodeCache[e] = Promise.all(o).then(function(l) {
      let c;
      if (s.isBone === !0 ? c = new xl() : l.length > 1 ? c = new fn() : l.length === 1 ? c = l[0] : c = new pt(), c !== l[0]) for (let h = 0, u = l.length; h < u; h++) c.add(l[h]);
      if (s.name && (c.userData.name = s.name, c.name = r), Qt(c, s), s.extensions && On(n, c, s), s.matrix !== void 0) {
        const h = new Ve();
        h.fromArray(s.matrix), c.applyMatrix4(h);
      } else
        s.translation !== void 0 && c.position.fromArray(s.translation), s.rotation !== void 0 && c.quaternion.fromArray(s.rotation), s.scale !== void 0 && c.scale.fromArray(s.scale);
      if (!i.associations.has(c)) i.associations.set(c, {});
      else if (s.mesh !== void 0 && i.meshCache.refs[s.mesh] > 1) {
        const h = i.associations.get(c);
        i.associations.set(c, { ...h });
      }
      return i.associations.get(c).nodes = e, c;
    }), this.nodeCache[e];
  }
  loadScene(e) {
    const t = this.extensions, n = this.json.scenes[e], i = this, s = new fn();
    n.name && (s.name = i.createUniqueName(n.name)), Qt(s, n), n.extensions && On(t, s, n);
    const r = n.nodes || [], o = [];
    for (let a = 0, l = r.length; a < l; a++) o.push(i.getDependency("node", r[a]));
    return Promise.all(o).then(function(a) {
      for (let c = 0, h = a.length; c < h; c++) s.add(a[c]);
      const l = (c) => {
        const h = /* @__PURE__ */ new Map();
        for (const [u, d] of i.associations) (u instanceof tn || u instanceof Pt) && h.set(u, d);
        return c.traverse((u) => {
          const d = i.associations.get(u);
          d != null && h.set(u, d);
        }), h;
      };
      return i.associations = l(s), s;
    });
  }
  _createAnimationTracks(e, t, n, i, s) {
    const r = [], o = e.name ? e.name : e.uuid, a = [];
    En[s.path] === En.weights ? e.traverse(function(u) {
      u.morphTargetInfluences && a.push(u.name ? u.name : u.uuid);
    }) : a.push(o);
    let l;
    switch (En[s.path]) {
      case En.weights:
        l = vi;
        break;
      case En.rotation:
        l = xi;
        break;
      case En.translation:
      case En.scale:
        l = yi;
        break;
      default:
        n.itemSize === 1 ? l = vi : l = yi;
        break;
    }
    const c = i.interpolation !== void 0 ? zm[i.interpolation] : Yi, h = this._getArrayFromAccessor(n);
    for (let u = 0, d = a.length; u < d; u++) {
      const p = new l(a[u] + "." + En[s.path], t.array, h, c);
      i.interpolation === "CUBICSPLINE" && this._createCubicSplineTrackInterpolant(p), r.push(p);
    }
    return r;
  }
  _getArrayFromAccessor(e) {
    let t = e.array;
    if (e.normalized) {
      const n = to(t.constructor), i = new Float32Array(t.length);
      for (let s = 0, r = t.length; s < r; s++) i[s] = t[s] * n;
      t = i;
    }
    return t;
  }
  _createCubicSplineTrackInterpolant(e) {
    e.createInterpolant = function(n) {
      return new (this instanceof xi ? Bm : nc)(this.times, this.values, this.getValueSize() / 3, n);
    }, e.createInterpolant.isInterpolantFactoryMethodGLTFCubicSpline = !0;
  }
};
function qm(e, t, n) {
  const i = t.attributes, s = new Gt();
  if (i.POSITION !== void 0) {
    const a = n.json.accessors[i.POSITION], l = a.min, c = a.max;
    if (l !== void 0 && c !== void 0) {
      if (s.set(new C(l[0], l[1], l[2]), new C(c[0], c[1], c[2])), a.normalized) {
        const h = to(di[a.componentType]);
        s.min.multiplyScalar(h), s.max.multiplyScalar(h);
      }
    } else {
      console.warn("THREE.GLTFLoader: Missing min/max properties for accessor POSITION.");
      return;
    }
  } else return;
  const r = t.targets;
  if (r !== void 0) {
    const a = new C(), l = new C();
    for (let c = 0, h = r.length; c < h; c++) {
      const u = r[c];
      if (u.POSITION !== void 0) {
        const d = n.json.accessors[u.POSITION], p = d.min, _ = d.max;
        if (p !== void 0 && _ !== void 0) {
          if (l.setX(Math.max(Math.abs(p[0]), Math.abs(_[0]))), l.setY(Math.max(Math.abs(p[1]), Math.abs(_[1]))), l.setZ(Math.max(Math.abs(p[2]), Math.abs(_[2]))), d.normalized) {
            const g = to(di[d.componentType]);
            l.multiplyScalar(g);
          }
          a.max(l);
        } else console.warn("THREE.GLTFLoader: Missing min/max properties for accessor POSITION.");
      }
    }
    s.expandByVector(a);
  }
  e.boundingBox = s;
  const o = new sn();
  s.getCenter(o.center), o.radius = s.min.distanceTo(s.max) / 2, e.boundingSphere = o;
}
function qa(e, t, n) {
  const i = t.attributes, s = [];
  function r(o, a) {
    return n.getDependency("accessor", o).then(function(l) {
      e.setAttribute(a, l);
    });
  }
  for (const o in i) {
    const a = eo[o] || o.toLowerCase();
    a in e.attributes || s.push(r(i[o], a));
  }
  if (t.indices !== void 0 && !e.index) {
    const o = n.getDependency("accessor", t.indices).then(function(a) {
      e.setIndex(a);
    });
    s.push(o);
  }
  return Ze.workingColorSpace !== "srgb-linear" && "COLOR_0" in i && console.warn(`THREE.GLTFLoader: Converting vertex colors from "srgb-linear" to "${Ze.workingColorSpace}" not supported.`), Qt(e, t), qm(e, t, n), Promise.all(s).then(function() {
    return t.targets !== void 0 ? Hm(e, t.targets, n) : e;
  });
}
async function Km(e) {
  const { scene: t } = await new fm().parseAsync(e, ""), n = new $l(), i = [], s = new Gt().setFromObject(t).getSize(new C());
  let r = 0;
  return t.traverse((o) => {
    if (!(o instanceof Tt)) return;
    n.own(o.geometry);
    const a = Array.isArray(o.material) ? o.material : [o.material];
    a.forEach((c) => n.own(c)), i.push({
      geometry: o.geometry,
      role: a[0].name
    });
    const l = o.geometry.getAttribute("position");
    for (let c = 0; c < l.count; c++) r = Math.max(r, Math.hypot(l.getX(c), l.getZ(c)));
  }), {
    parts: i,
    size: s,
    radius: r,
    dispose: () => {
      n.dispose(), t.clear();
    }
  };
}
function jm(e, t, n) {
  const i = /* @__PURE__ */ new Map();
  let s = !1;
  function r(o) {
    const a = i.get(o);
    i.delete(o), a?.abort.abort(), a?.asset?.dispose();
  }
  return {
    get: (o) => i.get(o)?.asset,
    sync(o) {
      if (s) return;
      const a = new Set(o);
      for (const l of i.keys()) a.has(l) || r(l);
      for (const l of a) {
        if (i.has(l)) continue;
        const c = {
          abort: new AbortController(),
          asset: void 0
        };
        i.set(l, c), e(l, c.abort.signal).then((h) => {
          if (i.get(l) !== c) {
            h.dispose();
            return;
          }
          c.asset = h, t();
        }).catch((h) => {
          i.get(l) === c && n(l, h);
        });
      }
    },
    dispose() {
      s = !0;
      for (const o of i.keys()) r(o);
    }
  };
}
var Zm = "" + new URL("map-assets/table-BYH2YAbI.glb", import.meta.url).href, Jm = "" + new URL("map-assets/chairRounded-CAXjIAhg.glb", import.meta.url).href, $m = "" + new URL("map-assets/bedSingle-DQi3T5hW.glb", import.meta.url).href, Qm = "" + new URL("map-assets/bookcaseOpenLow-D5KCefka.glb", import.meta.url).href, eg = "" + new URL("map-assets/tree_oak-BfHnIhp4.glb", import.meta.url).href, tg = "" + new URL("map-assets/stone_largeE-BlCexUuF.glb", import.meta.url).href, ng = {
  table: Zm,
  chair: Jm,
  bed: $m,
  shelf: Qm,
  tree: eg,
  rock: tg
};
function sg(e, t, n) {
  let i, s, r, o, a, l, c, h, u = !1, d = !1, p = !0, _ = 0, g = 0, m = 0, f = !0, y = !0, v = !1, S, A = 14, b = 14;
  const R = new AbortController(), I = new eu(), M = new Js(-10, 10, 10, -10, 0.01, 1e3), E = new re(), P = new pd("#f5f8ff", "#9c8c7a", 1.65), F = new Jr("#fff3df", 3.1);
  F.castShadow = !0, F.shadow.mapSize.set(1024, 1024), F.shadow.normalBias = 0.012, F.shadow.bias = -15e-5, F.shadow.radius = 2;
  const H = new Jr("#daeaff", 0.65);
  I.add(P, F, F.target, H);
  const B = () => !!e.closest(".theme-dark");
  let j = B();
  function V() {
    _ && (cancelAnimationFrame(_), _ = 0);
  }
  function te() {
    u || (u = !0, V(), R.abort(), l?.disconnect(), c?.disconnect(), h?.disconnect(), s?.dispose(), a?.dispose(), r?.dispose(), o?.dispose(), F.shadow.dispose(), i?.dispose(), i?.forceContextLoss(), i?.domElement.remove(), I.clear());
  }
  function W(q) {
    u || d || (d = !0, V(), n.fallback(q));
  }
  function ee() {
    u || d || _ || document.hidden || !p || g <= 0 || m <= 0 || (_ = requestAnimationFrame(() => {
      _ = 0;
      try {
        i.getSize(E), (E.x !== g || E.y !== m) && i.setSize(g, m, !1), i.render(I, M), a?.update(M, g, m, f);
      } catch {
        W("三维画面暂不可用，已切换二维。");
      }
    }));
  }
  function pe() {
    const q = S ? Math.max(S.viewBox[2], S.viewBox[3]) / 14 : 1, G = S ? S.viewBox[2] / q / 2 : 7, ce = S ? S.viewBox[3] / q / 2 : 7;
    return new Gt(new C(-G, 0, -ce), new C(G, 0, ce)).union(r.bounds);
  }
  function De() {
    const q = pe(), G = q.getCenter(new C()), ce = Math.max(1, q.getSize(new C()).length());
    F.position.copy(G).add(new C(-ce / 2, ce, ce / 2)), F.target.position.copy(G), H.position.copy(G).add(new C(ce, ce / 2, -ce)), F.updateMatrixWorld(!0), F.target.updateMatrixWorld(!0), F.shadow.updateMatrices(F);
    const Me = q.clone().applyMatrix4(F.shadow.camera.matrixWorldInverse);
    Object.assign(F.shadow.camera, {
      left: Me.min.x - 0.3,
      right: Me.max.x + 0.3,
      top: Me.max.y + 0.3,
      bottom: Me.min.y - 0.3,
      near: Math.max(0.01, -Me.max.z - 1),
      far: -Me.min.z + 1
    }), F.shadow.camera.updateProjectionMatrix(), F.shadow.needsUpdate = !0;
  }
  function Ne() {
    if (!s || !r) return;
    const q = pe(), G = q.getCenter(new C()), ce = Math.max(1, q.getSize(new C()).length());
    s.target.copy(G), M.position.copy(G).add(new C(9, 13, 15).normalize().multiplyScalar(ce * 2)), M.near = ce / 1e3, M.far = ce * 6, M.lookAt(G), M.updateMatrixWorld(!0);
    let Me = 0, ge = 0;
    for (const L of [q.min.x, q.max.x]) for (const Z of [q.min.y, q.max.y]) for (const Q of [q.min.z, q.max.z]) {
      const se = new C(L, Z, Q).applyMatrix4(M.matrixWorldInverse);
      Me = Math.max(Me, Math.abs(se.x)), ge = Math.max(ge, Math.abs(se.y));
    }
    A = Me, b = ge;
    const ze = Math.max(b, A / (g / m || 1)) * 1.09;
    M.top = ze, M.bottom = -ze, M.left = -ze * (g / m || 1), M.right = -M.left, M.zoom = 1, M.updateProjectionMatrix(), s.update(), ee();
  }
  function Qe() {
    if (u) return;
    const q = e.getBoundingClientRect();
    if (g = q.width, m = q.height, g <= 0 || m <= 0) {
      V();
      return;
    }
    M.top = Math.max(b, A / (g / m)) * 1.09, M.bottom = -M.top, M.left = -M.top * g / m, M.right = -M.left, M.updateProjectionMatrix(), ee();
  }
  function Ke(q) {
    if (!(u || d))
      try {
        const G = S?.key !== q.key;
        G && (r?.dispose(), r = void 0, o?.dispose(), o = jm(async (Me, ge) => {
          const ze = await fetch(ng[Me], { signal: ge });
          if (!ze.ok) throw new Error(`HTTP ${ze.status}`);
          return Km(await ze.arrayBuffer());
        }, () => {
          S && Ke(S);
        }, (Me, ge) => console.warn(`[Map 3D] ${Me}: keeping procedural shape`, ge)));
        const ce = hm(q, j, o);
        a?.dispose(), r?.dispose(), S = q, r = ce, I.add(r.group), r.updateWalls(y), a = dm(t, q, r.anchors), a.symbols(v), De(), G && Ne(), o?.sync(q.elements.flatMap((Me) => {
          const ge = ec(Me);
          return ge ? [ge] : [];
        })), ee();
      } catch {
        W("这个场景暂时无法立体显示，已切换二维。");
      }
  }
  function Y(q) {
    M.zoom = Xs.clamp(M.zoom * q, 0.4, 6), M.updateProjectionMatrix(), ee();
  }
  try {
    i = new Fp({
      antialias: !0,
      alpha: !0,
      powerPreference: "low-power"
    }), i.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.8)), i.setClearColor(0, 0), i.outputColorSpace = xt, i.toneMapping = 7, i.toneMappingExposure = 1.1, i.shadowMap.enabled = !0, i.shadowMap.type = 2, i.debug.onShaderError = () => W("图形驱动无法绘制三维，已切换二维。");
    const q = i.domElement;
    q.setAttribute("aria-label", "三维场景：拖动旋转，双指缩放和平移，方向键旋转，Home 全图"), q.setAttribute("role", "group"), q.tabIndex = 0, e.prepend(q), s = new zp(M, q), s.enableDamping = !1, s.minPolarAngle = 0.08, s.maxPolarAngle = Math.PI * 0.46, s.minZoom = 0.4, s.maxZoom = 6, s.rotateSpeed = 0.65, s.zoomSpeed = 0.8, s.addEventListener("change", ee), q.addEventListener("webglcontextlost", (G) => {
      G.preventDefault(), W("图形连接已中断，已切换二维。重新打开地图可重试。");
    }, { signal: R.signal }), q.addEventListener("keydown", (G) => {
      if (!(G.ctrlKey || G.metaKey || G.altKey)) {
        if (G.key === "Home") Ne();
        else if (G.key === "+" || G.key === "=") Y(1.2);
        else if (G.key === "-") Y(1 / 1.2);
        else if ([
          "ArrowLeft",
          "ArrowRight",
          "ArrowUp",
          "ArrowDown"
        ].includes(G.key)) {
          const ce = new $r().setFromVector3(M.position.clone().sub(s.target));
          ce.theta += G.key === "ArrowLeft" ? -0.13 : G.key === "ArrowRight" ? 0.13 : 0, ce.phi = Xs.clamp(ce.phi + (G.key === "ArrowUp" ? -0.1 : G.key === "ArrowDown" ? 0.1 : 0), s.minPolarAngle, s.maxPolarAngle), M.position.copy(s.target).add(new C().setFromSpherical(ce)), s.update(), ee();
        } else return;
        G.preventDefault();
      }
    }, { signal: R.signal }), l = new ResizeObserver(() => {
      try {
        Qe();
      } catch {
        W("三维画面尺寸调整失败，已切换二维。");
      }
    }), l.observe(e), Qe(), c = new IntersectionObserver((G) => {
      p = G[0].isIntersecting, p ? ee() : V();
    }), c.observe(e), document.addEventListener("visibilitychange", () => {
      document.hidden ? V() : ee();
    }, { signal: R.signal }), h = new MutationObserver(() => {
      const G = B();
      G !== j && (j = G, S && Ke(S));
    });
    for (let G = e; G; G = G.parentElement) h.observe(G, {
      attributes: !0,
      attributeFilter: ["class"]
    });
    return {
      dispose: te,
      setScene: Ke,
      fit: Ne,
      zoom: Y,
      labels(G) {
        f = G, ee();
      },
      walls(G) {
        y = G, r?.updateWalls(G), ee();
      },
      symbols(G) {
        v = G, a?.symbols(G), ee();
      }
    };
  } catch (q) {
    throw te(), q;
  }
}
export {
  sg as createThreeRuntime
};
