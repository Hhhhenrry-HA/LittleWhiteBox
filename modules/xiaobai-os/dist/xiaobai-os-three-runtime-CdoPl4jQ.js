/* eslint-disable */
import { a as os, c as Us, d as Ka, f as ja, h as Ja, o as $a, s as Qa, t as el, u as tl } from "./xiaobai-os-map-presentation-D954V1Aq.js";
var Kn = {
  LEFT: 0,
  MIDDLE: 1,
  RIGHT: 2,
  ROTATE: 0,
  DOLLY: 1,
  PAN: 2
}, Yn = {
  ROTATE: 0,
  PAN: 1,
  DOLLY_PAN: 2,
  DOLLY_ROTATE: 3
};
var ur = 1e3, En = 1001, as = 1002, Ht = 1003, nl = 1004, il = 1005, cn = 1006, rl = 1007, vr = 1008, Jn = 1009, sl = 1010, ol = 1011, al = 1012, ll = 1013, gs = 1014, xr = 1015, vs = 1016, cl = 1017, hl = 1018, ul = 1020, dl = 35902, fl = 35899, pl = 1021, ml = 1022, $n = 1023, Yo = 1026, qo = 1027, Zo = 1028, _l = 1029, gl = 1030, vl = 1031, xl = 1033, yl = 33776, Ml = 33777, Sl = 33778, El = 33779, Tl = 35840, bl = 35841, Al = 35842, wl = 35843, Rl = 36196, Cl = 37492, Pl = 37496, Ll = 37808, Dl = 37809, Il = 37810, Ul = 37811, Nl = 37812, Ol = 37813, Fl = 37814, Bl = 37815, zl = 37816, Vl = 37817, Hl = 37818, kl = 37819, Gl = 37820, Wl = 37821, Xl = 36492, Yl = 36494, ql = 36495, Zl = 36283, Kl = 36284, jl = 36285, Jl = 36286, dr = 2300, ls = 2301, Tr = 2302, Ns = 2400, Os = 2401, Fs = 2402, $l = 3200, Ql = 3201;
var wt = "srgb", Mi = "srgb-linear", fr = "linear", pr = "srgb", br = 7680;
var ec = 35044;
var Qn = 2e3;
var An = class {
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
      const r = i.indexOf(t);
      r !== -1 && i.splice(r, 1);
    }
  }
  dispatchEvent(e) {
    const t = this._listeners;
    if (t === void 0) return;
    const n = t[e.type];
    if (n !== void 0) {
      e.target = this;
      const i = n.slice(0);
      for (let r = 0, s = i.length; r < s; r++) i[r].call(this, e);
      e.target = null;
    }
  }
}, vt = [
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
], Bs = 1234567, gi = Math.PI / 180, Si = 180 / Math.PI;
function wn() {
  const e = Math.random() * 4294967295 | 0, t = Math.random() * 4294967295 | 0, n = Math.random() * 4294967295 | 0, i = Math.random() * 4294967295 | 0;
  return (vt[e & 255] + vt[e >> 8 & 255] + vt[e >> 16 & 255] + vt[e >> 24 & 255] + "-" + vt[t & 255] + vt[t >> 8 & 255] + "-" + vt[t >> 16 & 15 | 64] + vt[t >> 24 & 255] + "-" + vt[n & 63 | 128] + vt[n >> 8 & 255] + "-" + vt[n >> 16 & 255] + vt[n >> 24 & 255] + vt[i & 255] + vt[i >> 8 & 255] + vt[i >> 16 & 255] + vt[i >> 24 & 255]).toLowerCase();
}
function He(e, t, n) {
  return Math.max(t, Math.min(n, e));
}
function xs(e, t) {
  return (e % t + t) % t;
}
function tc(e, t, n, i, r) {
  return i + (e - t) * (r - i) / (n - t);
}
function nc(e, t, n) {
  return e !== t ? (n - e) / (t - e) : 0;
}
function vi(e, t, n) {
  return (1 - n) * e + n * t;
}
function ic(e, t, n, i) {
  return vi(e, t, 1 - Math.exp(-n * i));
}
function rc(e, t = 1) {
  return t - Math.abs(xs(e, t * 2) - t);
}
function sc(e, t, n) {
  return e <= t ? 0 : e >= n ? 1 : (e = (e - t) / (n - t), e * e * (3 - 2 * e));
}
function oc(e, t, n) {
  return e <= t ? 0 : e >= n ? 1 : (e = (e - t) / (n - t), e * e * e * (e * (e * 6 - 15) + 10));
}
function ac(e, t) {
  return e + Math.floor(Math.random() * (t - e + 1));
}
function lc(e, t) {
  return e + Math.random() * (t - e);
}
function cc(e) {
  return e * (0.5 - Math.random());
}
function hc(e) {
  e !== void 0 && (Bs = e);
  let t = Bs += 1831565813;
  return t = Math.imul(t ^ t >>> 15, t | 1), t ^= t + Math.imul(t ^ t >>> 7, t | 61), ((t ^ t >>> 14) >>> 0) / 4294967296;
}
function uc(e) {
  return e * gi;
}
function dc(e) {
  return e * Si;
}
function fc(e) {
  return (e & e - 1) === 0 && e !== 0;
}
function pc(e) {
  return Math.pow(2, Math.ceil(Math.log(e) / Math.LN2));
}
function mc(e) {
  return Math.pow(2, Math.floor(Math.log(e) / Math.LN2));
}
function _c(e, t, n, i, r) {
  const s = Math.cos, o = Math.sin, a = s(n / 2), c = o(n / 2), l = s((t + i) / 2), h = o((t + i) / 2), u = s((t - i) / 2), f = o((t - i) / 2), p = s((i - t) / 2), g = o((i - t) / 2);
  switch (r) {
    case "XYX":
      e.set(a * h, c * u, c * f, a * l);
      break;
    case "YZY":
      e.set(c * f, a * h, c * u, a * l);
      break;
    case "ZXZ":
      e.set(c * u, c * f, a * h, a * l);
      break;
    case "XZX":
      e.set(a * h, c * g, c * p, a * l);
      break;
    case "YXY":
      e.set(c * p, a * h, c * g, a * l);
      break;
    case "ZYZ":
      e.set(c * g, c * p, a * h, a * l);
      break;
    default:
      console.warn("THREE.MathUtils: .setQuaternionFromProperEuler() encountered an unknown order: " + r);
  }
}
function Gn(e, t) {
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
function yt(e, t) {
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
var cs = {
  DEG2RAD: gi,
  RAD2DEG: Si,
  generateUUID: wn,
  clamp: He,
  euclideanModulo: xs,
  mapLinear: tc,
  inverseLerp: nc,
  lerp: vi,
  damp: ic,
  pingpong: rc,
  smoothstep: sc,
  smootherstep: oc,
  randInt: ac,
  randFloat: lc,
  randFloatSpread: cc,
  seededRandom: hc,
  degToRad: uc,
  radToDeg: dc,
  isPowerOfTwo: fc,
  ceilPowerOfTwo: pc,
  floorPowerOfTwo: mc,
  setQuaternionFromProperEuler: _c,
  normalize: yt,
  denormalize: Gn
}, se = class Ko {
  constructor(t = 0, n = 0) {
    Ko.prototype.isVector2 = !0, this.x = t, this.y = n;
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
    const n = this.x, i = this.y, r = t.elements;
    return this.x = r[0] * n + r[3] * i + r[6], this.y = r[1] * n + r[4] * i + r[7], this;
  }
  min(t) {
    return this.x = Math.min(this.x, t.x), this.y = Math.min(this.y, t.y), this;
  }
  max(t) {
    return this.x = Math.max(this.x, t.x), this.y = Math.max(this.y, t.y), this;
  }
  clamp(t, n) {
    return this.x = He(this.x, t.x, n.x), this.y = He(this.y, t.y, n.y), this;
  }
  clampScalar(t, n) {
    return this.x = He(this.x, t, n), this.y = He(this.y, t, n), this;
  }
  clampLength(t, n) {
    const i = this.length();
    return this.divideScalar(i || 1).multiplyScalar(He(i, t, n));
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
    return Math.acos(He(i, -1, 1));
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
    const i = Math.cos(n), r = Math.sin(n), s = this.x - t.x, o = this.y - t.y;
    return this.x = s * i - o * r + t.x, this.y = s * r + o * i + t.y, this;
  }
  random() {
    return this.x = Math.random(), this.y = Math.random(), this;
  }
  *[Symbol.iterator]() {
    yield this.x, yield this.y;
  }
}, hn = class {
  constructor(e = 0, t = 0, n = 0, i = 1) {
    this.isQuaternion = !0, this._x = e, this._y = t, this._z = n, this._w = i;
  }
  static slerpFlat(e, t, n, i, r, s, o) {
    let a = n[i + 0], c = n[i + 1], l = n[i + 2], h = n[i + 3];
    const u = r[s + 0], f = r[s + 1], p = r[s + 2], g = r[s + 3];
    if (o === 0) {
      e[t + 0] = a, e[t + 1] = c, e[t + 2] = l, e[t + 3] = h;
      return;
    }
    if (o === 1) {
      e[t + 0] = u, e[t + 1] = f, e[t + 2] = p, e[t + 3] = g;
      return;
    }
    if (h !== g || a !== u || c !== f || l !== p) {
      let _ = 1 - o;
      const m = a * u + c * f + l * p + h * g, d = m >= 0 ? 1 : -1, T = 1 - m * m;
      if (T > Number.EPSILON) {
        const S = Math.sqrt(T), b = Math.atan2(S, m * d);
        _ = Math.sin(_ * b) / S, o = Math.sin(o * b) / S;
      }
      const v = o * d;
      if (a = a * _ + u * v, c = c * _ + f * v, l = l * _ + p * v, h = h * _ + g * v, _ === 1 - o) {
        const S = 1 / Math.sqrt(a * a + c * c + l * l + h * h);
        a *= S, c *= S, l *= S, h *= S;
      }
    }
    e[t] = a, e[t + 1] = c, e[t + 2] = l, e[t + 3] = h;
  }
  static multiplyQuaternionsFlat(e, t, n, i, r, s) {
    const o = n[i], a = n[i + 1], c = n[i + 2], l = n[i + 3], h = r[s], u = r[s + 1], f = r[s + 2], p = r[s + 3];
    return e[t] = o * p + l * h + a * f - c * u, e[t + 1] = a * p + l * u + c * h - o * f, e[t + 2] = c * p + l * f + o * u - a * h, e[t + 3] = l * p - o * h - a * u - c * f, e;
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
    const n = e._x, i = e._y, r = e._z, s = e._order, o = Math.cos, a = Math.sin, c = o(n / 2), l = o(i / 2), h = o(r / 2), u = a(n / 2), f = a(i / 2), p = a(r / 2);
    switch (s) {
      case "XYZ":
        this._x = u * l * h + c * f * p, this._y = c * f * h - u * l * p, this._z = c * l * p + u * f * h, this._w = c * l * h - u * f * p;
        break;
      case "YXZ":
        this._x = u * l * h + c * f * p, this._y = c * f * h - u * l * p, this._z = c * l * p - u * f * h, this._w = c * l * h + u * f * p;
        break;
      case "ZXY":
        this._x = u * l * h - c * f * p, this._y = c * f * h + u * l * p, this._z = c * l * p + u * f * h, this._w = c * l * h - u * f * p;
        break;
      case "ZYX":
        this._x = u * l * h - c * f * p, this._y = c * f * h + u * l * p, this._z = c * l * p - u * f * h, this._w = c * l * h + u * f * p;
        break;
      case "YZX":
        this._x = u * l * h + c * f * p, this._y = c * f * h + u * l * p, this._z = c * l * p - u * f * h, this._w = c * l * h - u * f * p;
        break;
      case "XZY":
        this._x = u * l * h - c * f * p, this._y = c * f * h - u * l * p, this._z = c * l * p + u * f * h, this._w = c * l * h + u * f * p;
        break;
      default:
        console.warn("THREE.Quaternion: .setFromEuler() encountered an unknown order: " + s);
    }
    return t === !0 && this._onChangeCallback(), this;
  }
  setFromAxisAngle(e, t) {
    const n = t / 2, i = Math.sin(n);
    return this._x = e.x * i, this._y = e.y * i, this._z = e.z * i, this._w = Math.cos(n), this._onChangeCallback(), this;
  }
  setFromRotationMatrix(e) {
    const t = e.elements, n = t[0], i = t[4], r = t[8], s = t[1], o = t[5], a = t[9], c = t[2], l = t[6], h = t[10], u = n + o + h;
    if (u > 0) {
      const f = 0.5 / Math.sqrt(u + 1);
      this._w = 0.25 / f, this._x = (l - a) * f, this._y = (r - c) * f, this._z = (s - i) * f;
    } else if (n > o && n > h) {
      const f = 2 * Math.sqrt(1 + n - o - h);
      this._w = (l - a) / f, this._x = 0.25 * f, this._y = (i + s) / f, this._z = (r + c) / f;
    } else if (o > h) {
      const f = 2 * Math.sqrt(1 + o - n - h);
      this._w = (r - c) / f, this._x = (i + s) / f, this._y = 0.25 * f, this._z = (a + l) / f;
    } else {
      const f = 2 * Math.sqrt(1 + h - n - o);
      this._w = (s - i) / f, this._x = (r + c) / f, this._y = (a + l) / f, this._z = 0.25 * f;
    }
    return this._onChangeCallback(), this;
  }
  setFromUnitVectors(e, t) {
    let n = e.dot(t) + 1;
    return n < 1e-8 ? (n = 0, Math.abs(e.x) > Math.abs(e.z) ? (this._x = -e.y, this._y = e.x, this._z = 0, this._w = n) : (this._x = 0, this._y = -e.z, this._z = e.y, this._w = n)) : (this._x = e.y * t.z - e.z * t.y, this._y = e.z * t.x - e.x * t.z, this._z = e.x * t.y - e.y * t.x, this._w = n), this.normalize();
  }
  angleTo(e) {
    return 2 * Math.acos(Math.abs(He(this.dot(e), -1, 1)));
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
    const n = e._x, i = e._y, r = e._z, s = e._w, o = t._x, a = t._y, c = t._z, l = t._w;
    return this._x = n * l + s * o + i * c - r * a, this._y = i * l + s * a + r * o - n * c, this._z = r * l + s * c + n * a - i * o, this._w = s * l - n * o - i * a - r * c, this._onChangeCallback(), this;
  }
  slerp(e, t) {
    if (t === 0) return this;
    if (t === 1) return this.copy(e);
    const n = this._x, i = this._y, r = this._z, s = this._w;
    let o = s * e._w + n * e._x + i * e._y + r * e._z;
    if (o < 0 ? (this._w = -e._w, this._x = -e._x, this._y = -e._y, this._z = -e._z, o = -o) : this.copy(e), o >= 1)
      return this._w = s, this._x = n, this._y = i, this._z = r, this;
    const a = 1 - o * o;
    if (a <= Number.EPSILON) {
      const f = 1 - t;
      return this._w = f * s + t * this._w, this._x = f * n + t * this._x, this._y = f * i + t * this._y, this._z = f * r + t * this._z, this.normalize(), this;
    }
    const c = Math.sqrt(a), l = Math.atan2(c, o), h = Math.sin((1 - t) * l) / c, u = Math.sin(t * l) / c;
    return this._w = s * h + this._w * u, this._x = n * h + this._x * u, this._y = i * h + this._y * u, this._z = r * h + this._z * u, this._onChangeCallback(), this;
  }
  slerpQuaternions(e, t, n) {
    return this.copy(e).slerp(t, n);
  }
  random() {
    const e = 2 * Math.PI * Math.random(), t = 2 * Math.PI * Math.random(), n = Math.random(), i = Math.sqrt(1 - n), r = Math.sqrt(n);
    return this.set(i * Math.sin(e), i * Math.cos(e), r * Math.sin(t), r * Math.cos(t));
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
}, D = class jo {
  constructor(t = 0, n = 0, i = 0) {
    jo.prototype.isVector3 = !0, this.x = t, this.y = n, this.z = i;
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
    return this.applyQuaternion(zs.setFromEuler(t));
  }
  applyAxisAngle(t, n) {
    return this.applyQuaternion(zs.setFromAxisAngle(t, n));
  }
  applyMatrix3(t) {
    const n = this.x, i = this.y, r = this.z, s = t.elements;
    return this.x = s[0] * n + s[3] * i + s[6] * r, this.y = s[1] * n + s[4] * i + s[7] * r, this.z = s[2] * n + s[5] * i + s[8] * r, this;
  }
  applyNormalMatrix(t) {
    return this.applyMatrix3(t).normalize();
  }
  applyMatrix4(t) {
    const n = this.x, i = this.y, r = this.z, s = t.elements, o = 1 / (s[3] * n + s[7] * i + s[11] * r + s[15]);
    return this.x = (s[0] * n + s[4] * i + s[8] * r + s[12]) * o, this.y = (s[1] * n + s[5] * i + s[9] * r + s[13]) * o, this.z = (s[2] * n + s[6] * i + s[10] * r + s[14]) * o, this;
  }
  applyQuaternion(t) {
    const n = this.x, i = this.y, r = this.z, s = t.x, o = t.y, a = t.z, c = t.w, l = 2 * (o * r - a * i), h = 2 * (a * n - s * r), u = 2 * (s * i - o * n);
    return this.x = n + c * l + o * u - a * h, this.y = i + c * h + a * l - s * u, this.z = r + c * u + s * h - o * l, this;
  }
  project(t) {
    return this.applyMatrix4(t.matrixWorldInverse).applyMatrix4(t.projectionMatrix);
  }
  unproject(t) {
    return this.applyMatrix4(t.projectionMatrixInverse).applyMatrix4(t.matrixWorld);
  }
  transformDirection(t) {
    const n = this.x, i = this.y, r = this.z, s = t.elements;
    return this.x = s[0] * n + s[4] * i + s[8] * r, this.y = s[1] * n + s[5] * i + s[9] * r, this.z = s[2] * n + s[6] * i + s[10] * r, this.normalize();
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
    return this.x = He(this.x, t.x, n.x), this.y = He(this.y, t.y, n.y), this.z = He(this.z, t.z, n.z), this;
  }
  clampScalar(t, n) {
    return this.x = He(this.x, t, n), this.y = He(this.y, t, n), this.z = He(this.z, t, n), this;
  }
  clampLength(t, n) {
    const i = this.length();
    return this.divideScalar(i || 1).multiplyScalar(He(i, t, n));
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
    const i = t.x, r = t.y, s = t.z, o = n.x, a = n.y, c = n.z;
    return this.x = r * c - s * a, this.y = s * o - i * c, this.z = i * a - r * o, this;
  }
  projectOnVector(t) {
    const n = t.lengthSq();
    if (n === 0) return this.set(0, 0, 0);
    const i = t.dot(this) / n;
    return this.copy(t).multiplyScalar(i);
  }
  projectOnPlane(t) {
    return Ar.copy(this).projectOnVector(t), this.sub(Ar);
  }
  reflect(t) {
    return this.sub(Ar.copy(t).multiplyScalar(2 * this.dot(t)));
  }
  angleTo(t) {
    const n = Math.sqrt(this.lengthSq() * t.lengthSq());
    if (n === 0) return Math.PI / 2;
    const i = this.dot(t) / n;
    return Math.acos(He(i, -1, 1));
  }
  distanceTo(t) {
    return Math.sqrt(this.distanceToSquared(t));
  }
  distanceToSquared(t) {
    const n = this.x - t.x, i = this.y - t.y, r = this.z - t.z;
    return n * n + i * i + r * r;
  }
  manhattanDistanceTo(t) {
    return Math.abs(this.x - t.x) + Math.abs(this.y - t.y) + Math.abs(this.z - t.z);
  }
  setFromSpherical(t) {
    return this.setFromSphericalCoords(t.radius, t.phi, t.theta);
  }
  setFromSphericalCoords(t, n, i) {
    const r = Math.sin(n) * t;
    return this.x = r * Math.sin(i), this.y = Math.cos(n) * t, this.z = r * Math.cos(i), this;
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
    const n = this.setFromMatrixColumn(t, 0).length(), i = this.setFromMatrixColumn(t, 1).length(), r = this.setFromMatrixColumn(t, 2).length();
    return this.x = n, this.y = i, this.z = r, this;
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
}, Ar = /* @__PURE__ */ new D(), zs = /* @__PURE__ */ new hn(), Xe = class Jo {
  constructor(t, n, i, r, s, o, a, c, l) {
    Jo.prototype.isMatrix3 = !0, this.elements = [
      1,
      0,
      0,
      0,
      1,
      0,
      0,
      0,
      1
    ], t !== void 0 && this.set(t, n, i, r, s, o, a, c, l);
  }
  set(t, n, i, r, s, o, a, c, l) {
    const h = this.elements;
    return h[0] = t, h[1] = r, h[2] = a, h[3] = n, h[4] = s, h[5] = c, h[6] = i, h[7] = o, h[8] = l, this;
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
    const i = t.elements, r = n.elements, s = this.elements, o = i[0], a = i[3], c = i[6], l = i[1], h = i[4], u = i[7], f = i[2], p = i[5], g = i[8], _ = r[0], m = r[3], d = r[6], T = r[1], v = r[4], S = r[7], b = r[2], w = r[5], C = r[8];
    return s[0] = o * _ + a * T + c * b, s[3] = o * m + a * v + c * w, s[6] = o * d + a * S + c * C, s[1] = l * _ + h * T + u * b, s[4] = l * m + h * v + u * w, s[7] = l * d + h * S + u * C, s[2] = f * _ + p * T + g * b, s[5] = f * m + p * v + g * w, s[8] = f * d + p * S + g * C, this;
  }
  multiplyScalar(t) {
    const n = this.elements;
    return n[0] *= t, n[3] *= t, n[6] *= t, n[1] *= t, n[4] *= t, n[7] *= t, n[2] *= t, n[5] *= t, n[8] *= t, this;
  }
  determinant() {
    const t = this.elements, n = t[0], i = t[1], r = t[2], s = t[3], o = t[4], a = t[5], c = t[6], l = t[7], h = t[8];
    return n * o * h - n * a * l - i * s * h + i * a * c + r * s * l - r * o * c;
  }
  invert() {
    const t = this.elements, n = t[0], i = t[1], r = t[2], s = t[3], o = t[4], a = t[5], c = t[6], l = t[7], h = t[8], u = h * o - a * l, f = a * c - h * s, p = l * s - o * c, g = n * u + i * f + r * p;
    if (g === 0) return this.set(0, 0, 0, 0, 0, 0, 0, 0, 0);
    const _ = 1 / g;
    return t[0] = u * _, t[1] = (r * l - h * i) * _, t[2] = (a * i - r * o) * _, t[3] = f * _, t[4] = (h * n - r * c) * _, t[5] = (r * s - a * n) * _, t[6] = p * _, t[7] = (i * c - l * n) * _, t[8] = (o * n - i * s) * _, this;
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
  setUvTransform(t, n, i, r, s, o, a) {
    const c = Math.cos(s), l = Math.sin(s);
    return this.set(i * c, i * l, -i * (c * o + l * a) + o + t, -r * l, r * c, -r * (-l * o + c * a) + a + n, 0, 0, 1), this;
  }
  scale(t, n) {
    return this.premultiply(wr.makeScale(t, n)), this;
  }
  rotate(t) {
    return this.premultiply(wr.makeRotation(-t)), this;
  }
  translate(t, n) {
    return this.premultiply(wr.makeTranslation(t, n)), this;
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
    for (let r = 0; r < 9; r++) if (n[r] !== i[r]) return !1;
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
}, wr = /* @__PURE__ */ new Xe();
function $o(e) {
  for (let t = e.length - 1; t >= 0; --t) if (e[t] >= 65535) return !0;
  return !1;
}
function mr(e) {
  return document.createElementNS("http://www.w3.org/1999/xhtml", e);
}
function gc() {
  const e = mr("canvas");
  return e.style.display = "block", e;
}
var Vs = {};
function Ei(e) {
  e in Vs || (Vs[e] = !0, console.warn(e));
}
function vc(e, t, n) {
  return new Promise(function(i, r) {
    function s() {
      switch (e.clientWaitSync(t, e.SYNC_FLUSH_COMMANDS_BIT, 0)) {
        case e.WAIT_FAILED:
          r();
          break;
        case e.TIMEOUT_EXPIRED:
          setTimeout(s, n);
          break;
        default:
          i();
      }
    }
    setTimeout(s, n);
  });
}
var Hs = /* @__PURE__ */ new Xe().set(0.4123908, 0.3575843, 0.1804808, 0.212639, 0.7151687, 0.0721923, 0.0193308, 0.1191948, 0.9505322), ks = /* @__PURE__ */ new Xe().set(3.2409699, -1.5373832, -0.4986108, -0.9692436, 1.8759675, 0.0415551, 0.0556301, -0.203977, 1.0569715);
function xc() {
  const e = {
    enabled: !0,
    workingColorSpace: Mi,
    spaces: {},
    convert: function(r, s, o) {
      return this.enabled === !1 || s === o || !s || !o || (this.spaces[s].transfer === "srgb" && (r.r = Qt(r.r), r.g = Qt(r.g), r.b = Qt(r.b)), this.spaces[s].primaries !== this.spaces[o].primaries && (r.applyMatrix3(this.spaces[s].toXYZ), r.applyMatrix3(this.spaces[o].fromXYZ)), this.spaces[o].transfer === "srgb" && (r.r = jn(r.r), r.g = jn(r.g), r.b = jn(r.b))), r;
    },
    workingToColorSpace: function(r, s) {
      return this.convert(r, this.workingColorSpace, s);
    },
    colorSpaceToWorking: function(r, s) {
      return this.convert(r, s, this.workingColorSpace);
    },
    getPrimaries: function(r) {
      return this.spaces[r].primaries;
    },
    getTransfer: function(r) {
      return r === "" ? fr : this.spaces[r].transfer;
    },
    getToneMappingMode: function(r) {
      return this.spaces[r].outputColorSpaceConfig.toneMappingMode || "standard";
    },
    getLuminanceCoefficients: function(r, s = this.workingColorSpace) {
      return r.fromArray(this.spaces[s].luminanceCoefficients);
    },
    define: function(r) {
      Object.assign(this.spaces, r);
    },
    _getMatrix: function(r, s, o) {
      return r.copy(this.spaces[s].toXYZ).multiply(this.spaces[o].fromXYZ);
    },
    _getDrawingBufferColorSpace: function(r) {
      return this.spaces[r].outputColorSpaceConfig.drawingBufferColorSpace;
    },
    _getUnpackColorSpace: function(r = this.workingColorSpace) {
      return this.spaces[r].workingColorSpaceConfig.unpackColorSpace;
    },
    fromWorkingColorSpace: function(r, s) {
      return Ei("THREE.ColorManagement: .fromWorkingColorSpace() has been renamed to .workingToColorSpace()."), e.workingToColorSpace(r, s);
    },
    toWorkingColorSpace: function(r, s) {
      return Ei("THREE.ColorManagement: .toWorkingColorSpace() has been renamed to .colorSpaceToWorking()."), e.colorSpaceToWorking(r, s);
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
    [Mi]: {
      primaries: t,
      whitePoint: i,
      transfer: fr,
      toXYZ: Hs,
      fromXYZ: ks,
      luminanceCoefficients: n,
      workingColorSpaceConfig: { unpackColorSpace: wt },
      outputColorSpaceConfig: { drawingBufferColorSpace: wt }
    },
    [wt]: {
      primaries: t,
      whitePoint: i,
      transfer: pr,
      toXYZ: Hs,
      fromXYZ: ks,
      luminanceCoefficients: n,
      outputColorSpaceConfig: { drawingBufferColorSpace: wt }
    }
  }), e;
}
var je = /* @__PURE__ */ xc();
function Qt(e) {
  return e < 0.04045 ? e * 0.0773993808 : Math.pow(e * 0.9478672986 + 0.0521327014, 2.4);
}
function jn(e) {
  return e < 31308e-7 ? e * 12.92 : 1.055 * Math.pow(e, 0.41666) - 0.055;
}
var Cn, yc = class {
  static getDataURL(e, t = "image/png") {
    if (/^data:/i.test(e.src) || typeof HTMLCanvasElement > "u") return e.src;
    let n;
    if (e instanceof HTMLCanvasElement) n = e;
    else {
      Cn === void 0 && (Cn = mr("canvas")), Cn.width = e.width, Cn.height = e.height;
      const i = Cn.getContext("2d");
      e instanceof ImageData ? i.putImageData(e, 0, 0) : i.drawImage(e, 0, 0, e.width, e.height), n = Cn;
    }
    return n.toDataURL(t);
  }
  static sRGBToLinear(e) {
    if (typeof HTMLImageElement < "u" && e instanceof HTMLImageElement || typeof HTMLCanvasElement < "u" && e instanceof HTMLCanvasElement || typeof ImageBitmap < "u" && e instanceof ImageBitmap) {
      const t = mr("canvas");
      t.width = e.width, t.height = e.height;
      const n = t.getContext("2d");
      n.drawImage(e, 0, 0, e.width, e.height);
      const i = n.getImageData(0, 0, e.width, e.height), r = i.data;
      for (let s = 0; s < r.length; s++) r[s] = Qt(r[s] / 255) * 255;
      return n.putImageData(i, 0, 0), t;
    } else if (e.data) {
      const t = e.data.slice(0);
      for (let n = 0; n < t.length; n++) t instanceof Uint8Array || t instanceof Uint8ClampedArray ? t[n] = Math.floor(Qt(t[n] / 255) * 255) : t[n] = Qt(t[n]);
      return {
        data: t,
        width: e.width,
        height: e.height
      };
    } else
      return console.warn("THREE.ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."), e;
  }
}, Mc = 0, ys = class {
  constructor(e = null) {
    this.isSource = !0, Object.defineProperty(this, "id", { value: Mc++ }), this.uuid = wn(), this.data = e, this.dataReady = !0, this.version = 0;
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
      let r;
      if (Array.isArray(i)) {
        r = [];
        for (let s = 0, o = i.length; s < o; s++) i[s].isDataTexture ? r.push(Rr(i[s].image)) : r.push(Rr(i[s]));
      } else r = Rr(i);
      n.url = r;
    }
    return t || (e.images[this.uuid] = n), n;
  }
};
function Rr(e) {
  return typeof HTMLImageElement < "u" && e instanceof HTMLImageElement || typeof HTMLCanvasElement < "u" && e instanceof HTMLCanvasElement || typeof ImageBitmap < "u" && e instanceof ImageBitmap ? yc.getDataURL(e) : e.data ? {
    data: Array.from(e.data),
    width: e.width,
    height: e.height,
    type: e.data.constructor.name
  } : (console.warn("THREE.Texture: Unable to serialize Texture."), {});
}
var Sc = 0, Cr = /* @__PURE__ */ new D(), kt = class lr extends An {
  constructor(t = lr.DEFAULT_IMAGE, n = lr.DEFAULT_MAPPING, i = En, r = En, s = cn, o = vr, a = $n, c = Jn, l = lr.DEFAULT_ANISOTROPY, h = "") {
    super(), this.isTexture = !0, Object.defineProperty(this, "id", { value: Sc++ }), this.uuid = wn(), this.name = "", this.source = new ys(t), this.mipmaps = [], this.mapping = n, this.channel = 0, this.wrapS = i, this.wrapT = r, this.magFilter = s, this.minFilter = o, this.anisotropy = l, this.format = a, this.internalFormat = null, this.type = c, this.offset = new se(0, 0), this.repeat = new se(1, 1), this.center = new se(0, 0), this.rotation = 0, this.matrixAutoUpdate = !0, this.matrix = new Xe(), this.generateMipmaps = !0, this.premultiplyAlpha = !1, this.flipY = !0, this.unpackAlignment = 4, this.colorSpace = h, this.userData = {}, this.updateRanges = [], this.version = 0, this.onUpdate = null, this.renderTarget = null, this.isRenderTargetTexture = !1, this.isArrayTexture = !!(t && t.depth && t.depth > 1), this.pmremVersion = 0;
  }
  get width() {
    return this.source.getSize(Cr).x;
  }
  get height() {
    return this.source.getSize(Cr).y;
  }
  get depth() {
    return this.source.getSize(Cr).z;
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
      const r = this[n];
      if (r === void 0) {
        console.warn(`THREE.Texture.setValues(): property '${n}' does not exist.`);
        continue;
      }
      r && i && r.isVector2 && i.isVector2 || r && i && r.isVector3 && i.isVector3 || r && i && r.isMatrix3 && i.isMatrix3 ? r.copy(i) : this[n] = i;
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
      case ur:
        t.x = t.x - Math.floor(t.x);
        break;
      case En:
        t.x = t.x < 0 ? 0 : 1;
        break;
      case as:
        Math.abs(Math.floor(t.x) % 2) === 1 ? t.x = Math.ceil(t.x) - t.x : t.x = t.x - Math.floor(t.x);
        break;
    }
    if (t.y < 0 || t.y > 1) switch (this.wrapT) {
      case ur:
        t.y = t.y - Math.floor(t.y);
        break;
      case En:
        t.y = t.y < 0 ? 0 : 1;
        break;
      case as:
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
kt.DEFAULT_IMAGE = null;
kt.DEFAULT_MAPPING = 300;
kt.DEFAULT_ANISOTROPY = 1;
var ht = class Qo {
  constructor(t = 0, n = 0, i = 0, r = 1) {
    Qo.prototype.isVector4 = !0, this.x = t, this.y = n, this.z = i, this.w = r;
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
  set(t, n, i, r) {
    return this.x = t, this.y = n, this.z = i, this.w = r, this;
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
    const n = this.x, i = this.y, r = this.z, s = this.w, o = t.elements;
    return this.x = o[0] * n + o[4] * i + o[8] * r + o[12] * s, this.y = o[1] * n + o[5] * i + o[9] * r + o[13] * s, this.z = o[2] * n + o[6] * i + o[10] * r + o[14] * s, this.w = o[3] * n + o[7] * i + o[11] * r + o[15] * s, this;
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
    let n, i, r, s;
    const c = t.elements, l = c[0], h = c[4], u = c[8], f = c[1], p = c[5], g = c[9], _ = c[2], m = c[6], d = c[10];
    if (Math.abs(h - f) < 0.01 && Math.abs(u - _) < 0.01 && Math.abs(g - m) < 0.01) {
      if (Math.abs(h + f) < 0.1 && Math.abs(u + _) < 0.1 && Math.abs(g + m) < 0.1 && Math.abs(l + p + d - 3) < 0.1)
        return this.set(1, 0, 0, 0), this;
      n = Math.PI;
      const v = (l + 1) / 2, S = (p + 1) / 2, b = (d + 1) / 2, w = (h + f) / 4, C = (u + _) / 4, P = (g + m) / 4;
      return v > S && v > b ? v < 0.01 ? (i = 0, r = 0.707106781, s = 0.707106781) : (i = Math.sqrt(v), r = w / i, s = C / i) : S > b ? S < 0.01 ? (i = 0.707106781, r = 0, s = 0.707106781) : (r = Math.sqrt(S), i = w / r, s = P / r) : b < 0.01 ? (i = 0.707106781, r = 0.707106781, s = 0) : (s = Math.sqrt(b), i = C / s, r = P / s), this.set(i, r, s, n), this;
    }
    let T = Math.sqrt((m - g) * (m - g) + (u - _) * (u - _) + (f - h) * (f - h));
    return Math.abs(T) < 1e-3 && (T = 1), this.x = (m - g) / T, this.y = (u - _) / T, this.z = (f - h) / T, this.w = Math.acos((l + p + d - 1) / 2), this;
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
    return this.x = He(this.x, t.x, n.x), this.y = He(this.y, t.y, n.y), this.z = He(this.z, t.z, n.z), this.w = He(this.w, t.w, n.w), this;
  }
  clampScalar(t, n) {
    return this.x = He(this.x, t, n), this.y = He(this.y, t, n), this.z = He(this.z, t, n), this.w = He(this.w, t, n), this;
  }
  clampLength(t, n) {
    const i = this.length();
    return this.divideScalar(i || 1).multiplyScalar(He(i, t, n));
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
}, Ec = class extends An {
  constructor(e = 1, t = 1, n = {}) {
    super(), n = Object.assign({
      generateMipmaps: !1,
      internalFormat: null,
      minFilter: cn,
      depthBuffer: !0,
      stencilBuffer: !1,
      resolveDepthBuffer: !0,
      resolveStencilBuffer: !0,
      depthTexture: null,
      samples: 0,
      count: 1,
      depth: 1,
      multiview: !1
    }, n), this.isRenderTarget = !0, this.width = e, this.height = t, this.depth = n.depth, this.scissor = new ht(0, 0, e, t), this.scissorTest = !1, this.viewport = new ht(0, 0, e, t);
    const i = new kt({
      width: e,
      height: t,
      depth: n.depth
    });
    this.textures = [];
    const r = n.count;
    for (let s = 0; s < r; s++)
      this.textures[s] = i.clone(), this.textures[s].isRenderTargetTexture = !0, this.textures[s].renderTarget = this;
    this._setTextureOptions(n), this.depthBuffer = n.depthBuffer, this.stencilBuffer = n.stencilBuffer, this.resolveDepthBuffer = n.resolveDepthBuffer, this.resolveStencilBuffer = n.resolveStencilBuffer, this._depthTexture = null, this.depthTexture = n.depthTexture, this.samples = n.samples, this.multiview = n.multiview;
  }
  _setTextureOptions(e = {}) {
    const t = {
      minFilter: cn,
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
      for (let i = 0, r = this.textures.length; i < r; i++)
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
      this.textures[t].source = new ys(i);
    }
    return this.depthBuffer = e.depthBuffer, this.stencilBuffer = e.stencilBuffer, this.resolveDepthBuffer = e.resolveDepthBuffer, this.resolveStencilBuffer = e.resolveStencilBuffer, e.depthTexture !== null && (this.depthTexture = e.depthTexture.clone()), this.samples = e.samples, this;
  }
  dispose() {
    this.dispatchEvent({ type: "dispose" });
  }
}, Tn = class extends Ec {
  constructor(e = 1, t = 1, n = {}) {
    super(e, t, n), this.isWebGLRenderTarget = !0;
  }
}, ea = class extends kt {
  constructor(e = null, t = 1, n = 1, i = 1) {
    super(null), this.isDataArrayTexture = !0, this.image = {
      data: e,
      width: t,
      height: n,
      depth: i
    }, this.magFilter = Ht, this.minFilter = Ht, this.wrapR = En, this.generateMipmaps = !1, this.flipY = !1, this.unpackAlignment = 1, this.layerUpdates = /* @__PURE__ */ new Set();
  }
  addLayerUpdate(e) {
    this.layerUpdates.add(e);
  }
  clearLayerUpdates() {
    this.layerUpdates.clear();
  }
}, Tc = class extends kt {
  constructor(e = null, t = 1, n = 1, i = 1) {
    super(null), this.isData3DTexture = !0, this.image = {
      data: e,
      width: t,
      height: n,
      depth: i
    }, this.magFilter = Ht, this.minFilter = Ht, this.wrapR = En, this.generateMipmaps = !1, this.flipY = !1, this.unpackAlignment = 1;
  }
}, en = class {
  constructor(e = new D(1 / 0, 1 / 0, 1 / 0), t = new D(-1 / 0, -1 / 0, -1 / 0)) {
    this.isBox3 = !0, this.min = e, this.max = t;
  }
  set(e, t) {
    return this.min.copy(e), this.max.copy(t), this;
  }
  setFromArray(e) {
    this.makeEmpty();
    for (let t = 0, n = e.length; t < n; t += 3) this.expandByPoint(Ot.fromArray(e, t));
    return this;
  }
  setFromBufferAttribute(e) {
    this.makeEmpty();
    for (let t = 0, n = e.count; t < n; t++) this.expandByPoint(Ot.fromBufferAttribute(e, t));
    return this;
  }
  setFromPoints(e) {
    this.makeEmpty();
    for (let t = 0, n = e.length; t < n; t++) this.expandByPoint(e[t]);
    return this;
  }
  setFromCenterAndSize(e, t) {
    const n = Ot.copy(t).multiplyScalar(0.5);
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
      const r = n.getAttribute("position");
      if (t === !0 && r !== void 0 && e.isInstancedMesh !== !0) for (let s = 0, o = r.count; s < o; s++)
        e.isMesh === !0 ? e.getVertexPosition(s, Ot) : Ot.fromBufferAttribute(r, s), Ot.applyMatrix4(e.matrixWorld), this.expandByPoint(Ot);
      else
        e.boundingBox !== void 0 ? (e.boundingBox === null && e.computeBoundingBox(), Ii.copy(e.boundingBox)) : (n.boundingBox === null && n.computeBoundingBox(), Ii.copy(n.boundingBox)), Ii.applyMatrix4(e.matrixWorld), this.union(Ii);
    }
    const i = e.children;
    for (let r = 0, s = i.length; r < s; r++) this.expandByObject(i[r], t);
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
    return this.clampPoint(e.center, Ot), Ot.distanceToSquared(e.center) <= e.radius * e.radius;
  }
  intersectsPlane(e) {
    let t, n;
    return e.normal.x > 0 ? (t = e.normal.x * this.min.x, n = e.normal.x * this.max.x) : (t = e.normal.x * this.max.x, n = e.normal.x * this.min.x), e.normal.y > 0 ? (t += e.normal.y * this.min.y, n += e.normal.y * this.max.y) : (t += e.normal.y * this.max.y, n += e.normal.y * this.min.y), e.normal.z > 0 ? (t += e.normal.z * this.min.z, n += e.normal.z * this.max.z) : (t += e.normal.z * this.max.z, n += e.normal.z * this.min.z), t <= -e.constant && n >= -e.constant;
  }
  intersectsTriangle(e) {
    if (this.isEmpty()) return !1;
    this.getCenter(oi), Ui.subVectors(this.max, oi), Pn.subVectors(e.a, oi), Ln.subVectors(e.b, oi), Dn.subVectors(e.c, oi), tn.subVectors(Ln, Pn), nn.subVectors(Dn, Ln), mn.subVectors(Pn, Dn);
    let t = [
      0,
      -tn.z,
      tn.y,
      0,
      -nn.z,
      nn.y,
      0,
      -mn.z,
      mn.y,
      tn.z,
      0,
      -tn.x,
      nn.z,
      0,
      -nn.x,
      mn.z,
      0,
      -mn.x,
      -tn.y,
      tn.x,
      0,
      -nn.y,
      nn.x,
      0,
      -mn.y,
      mn.x,
      0
    ];
    return !Pr(t, Pn, Ln, Dn, Ui) || (t = [
      1,
      0,
      0,
      0,
      1,
      0,
      0,
      0,
      1
    ], !Pr(t, Pn, Ln, Dn, Ui)) ? !1 : (Ni.crossVectors(tn, nn), t = [
      Ni.x,
      Ni.y,
      Ni.z
    ], Pr(t, Pn, Ln, Dn, Ui));
  }
  clampPoint(e, t) {
    return t.copy(e).clamp(this.min, this.max);
  }
  distanceToPoint(e) {
    return this.clampPoint(e, Ot).distanceTo(e);
  }
  getBoundingSphere(e) {
    return this.isEmpty() ? e.makeEmpty() : (this.getCenter(e.center), e.radius = this.getSize(Ot).length() * 0.5), e;
  }
  intersect(e) {
    return this.min.max(e.min), this.max.min(e.max), this.isEmpty() && this.makeEmpty(), this;
  }
  union(e) {
    return this.min.min(e.min), this.max.max(e.max), this;
  }
  applyMatrix4(e) {
    return this.isEmpty() ? this : (Zt[0].set(this.min.x, this.min.y, this.min.z).applyMatrix4(e), Zt[1].set(this.min.x, this.min.y, this.max.z).applyMatrix4(e), Zt[2].set(this.min.x, this.max.y, this.min.z).applyMatrix4(e), Zt[3].set(this.min.x, this.max.y, this.max.z).applyMatrix4(e), Zt[4].set(this.max.x, this.min.y, this.min.z).applyMatrix4(e), Zt[5].set(this.max.x, this.min.y, this.max.z).applyMatrix4(e), Zt[6].set(this.max.x, this.max.y, this.min.z).applyMatrix4(e), Zt[7].set(this.max.x, this.max.y, this.max.z).applyMatrix4(e), this.setFromPoints(Zt), this);
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
}, Zt = [
  /* @__PURE__ */ new D(),
  /* @__PURE__ */ new D(),
  /* @__PURE__ */ new D(),
  /* @__PURE__ */ new D(),
  /* @__PURE__ */ new D(),
  /* @__PURE__ */ new D(),
  /* @__PURE__ */ new D(),
  /* @__PURE__ */ new D()
], Ot = /* @__PURE__ */ new D(), Ii = /* @__PURE__ */ new en(), Pn = /* @__PURE__ */ new D(), Ln = /* @__PURE__ */ new D(), Dn = /* @__PURE__ */ new D(), tn = /* @__PURE__ */ new D(), nn = /* @__PURE__ */ new D(), mn = /* @__PURE__ */ new D(), oi = /* @__PURE__ */ new D(), Ui = /* @__PURE__ */ new D(), Ni = /* @__PURE__ */ new D(), _n = /* @__PURE__ */ new D();
function Pr(e, t, n, i, r) {
  for (let s = 0, o = e.length - 3; s <= o; s += 3) {
    _n.fromArray(e, s);
    const a = r.x * Math.abs(_n.x) + r.y * Math.abs(_n.y) + r.z * Math.abs(_n.z), c = t.dot(_n), l = n.dot(_n), h = i.dot(_n);
    if (Math.max(-Math.max(c, l, h), Math.min(c, l, h)) > a) return !1;
  }
  return !0;
}
var bc = /* @__PURE__ */ new en(), ai = /* @__PURE__ */ new D(), Lr = /* @__PURE__ */ new D(), ni = class {
  constructor(e = new D(), t = -1) {
    this.isSphere = !0, this.center = e, this.radius = t;
  }
  set(e, t) {
    return this.center.copy(e), this.radius = t, this;
  }
  setFromPoints(e, t) {
    const n = this.center;
    t !== void 0 ? n.copy(t) : bc.setFromPoints(e).getCenter(n);
    let i = 0;
    for (let r = 0, s = e.length; r < s; r++) i = Math.max(i, n.distanceToSquared(e[r]));
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
    ai.subVectors(e, this.center);
    const t = ai.lengthSq();
    if (t > this.radius * this.radius) {
      const n = Math.sqrt(t), i = (n - this.radius) * 0.5;
      this.center.addScaledVector(ai, i / n), this.radius += i;
    }
    return this;
  }
  union(e) {
    return e.isEmpty() ? this : this.isEmpty() ? (this.copy(e), this) : (this.center.equals(e.center) === !0 ? this.radius = Math.max(this.radius, e.radius) : (Lr.subVectors(e.center, this.center).setLength(e.radius), this.expandByPoint(ai.copy(e.center).add(Lr)), this.expandByPoint(ai.copy(e.center).sub(Lr))), this);
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
}, Kt = /* @__PURE__ */ new D(), Dr = /* @__PURE__ */ new D(), Oi = /* @__PURE__ */ new D(), rn = /* @__PURE__ */ new D(), Ir = /* @__PURE__ */ new D(), Fi = /* @__PURE__ */ new D(), Ur = /* @__PURE__ */ new D(), Ms = class {
  constructor(e = new D(), t = new D(0, 0, -1)) {
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
    return this.origin.copy(this.at(e, Kt)), this;
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
    const t = Kt.subVectors(e, this.origin).dot(this.direction);
    return t < 0 ? this.origin.distanceToSquared(e) : (Kt.copy(this.origin).addScaledVector(this.direction, t), Kt.distanceToSquared(e));
  }
  distanceSqToSegment(e, t, n, i) {
    Dr.copy(e).add(t).multiplyScalar(0.5), Oi.copy(t).sub(e).normalize(), rn.copy(this.origin).sub(Dr);
    const r = e.distanceTo(t) * 0.5, s = -this.direction.dot(Oi), o = rn.dot(this.direction), a = -rn.dot(Oi), c = rn.lengthSq(), l = Math.abs(1 - s * s);
    let h, u, f, p;
    if (l > 0)
      if (h = s * a - o, u = s * o - a, p = r * l, h >= 0) if (u >= -p) if (u <= p) {
        const g = 1 / l;
        h *= g, u *= g, f = h * (h + s * u + 2 * o) + u * (s * h + u + 2 * a) + c;
      } else
        u = r, h = Math.max(0, -(s * u + o)), f = -h * h + u * (u + 2 * a) + c;
      else
        u = -r, h = Math.max(0, -(s * u + o)), f = -h * h + u * (u + 2 * a) + c;
      else u <= -p ? (h = Math.max(0, -(-s * r + o)), u = h > 0 ? -r : Math.min(Math.max(-r, -a), r), f = -h * h + u * (u + 2 * a) + c) : u <= p ? (h = 0, u = Math.min(Math.max(-r, -a), r), f = u * (u + 2 * a) + c) : (h = Math.max(0, -(s * r + o)), u = h > 0 ? r : Math.min(Math.max(-r, -a), r), f = -h * h + u * (u + 2 * a) + c);
    else
      u = s > 0 ? -r : r, h = Math.max(0, -(s * u + o)), f = -h * h + u * (u + 2 * a) + c;
    return n && n.copy(this.origin).addScaledVector(this.direction, h), i && i.copy(Dr).addScaledVector(Oi, u), f;
  }
  intersectSphere(e, t) {
    Kt.subVectors(e.center, this.origin);
    const n = Kt.dot(this.direction), i = Kt.dot(Kt) - n * n, r = e.radius * e.radius;
    if (i > r) return null;
    const s = Math.sqrt(r - i), o = n - s, a = n + s;
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
    let n, i, r, s, o, a;
    const c = 1 / this.direction.x, l = 1 / this.direction.y, h = 1 / this.direction.z, u = this.origin;
    return c >= 0 ? (n = (e.min.x - u.x) * c, i = (e.max.x - u.x) * c) : (n = (e.max.x - u.x) * c, i = (e.min.x - u.x) * c), l >= 0 ? (r = (e.min.y - u.y) * l, s = (e.max.y - u.y) * l) : (r = (e.max.y - u.y) * l, s = (e.min.y - u.y) * l), n > s || r > i || ((r > n || isNaN(n)) && (n = r), (s < i || isNaN(i)) && (i = s), h >= 0 ? (o = (e.min.z - u.z) * h, a = (e.max.z - u.z) * h) : (o = (e.max.z - u.z) * h, a = (e.min.z - u.z) * h), n > a || o > i) || ((o > n || n !== n) && (n = o), (a < i || i !== i) && (i = a), i < 0) ? null : this.at(n >= 0 ? n : i, t);
  }
  intersectsBox(e) {
    return this.intersectBox(e, Kt) !== null;
  }
  intersectTriangle(e, t, n, i, r) {
    Ir.subVectors(t, e), Fi.subVectors(n, e), Ur.crossVectors(Ir, Fi);
    let s = this.direction.dot(Ur), o;
    if (s > 0) {
      if (i) return null;
      o = 1;
    } else if (s < 0)
      o = -1, s = -s;
    else return null;
    rn.subVectors(this.origin, e);
    const a = o * this.direction.dot(Fi.crossVectors(rn, Fi));
    if (a < 0) return null;
    const c = o * this.direction.dot(Ir.cross(rn));
    if (c < 0 || a + c > s) return null;
    const l = -o * rn.dot(Ur);
    return l < 0 ? null : this.at(l / s, r);
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
}, nt = class hs {
  constructor(t, n, i, r, s, o, a, c, l, h, u, f, p, g, _, m) {
    hs.prototype.isMatrix4 = !0, this.elements = [
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
    ], t !== void 0 && this.set(t, n, i, r, s, o, a, c, l, h, u, f, p, g, _, m);
  }
  set(t, n, i, r, s, o, a, c, l, h, u, f, p, g, _, m) {
    const d = this.elements;
    return d[0] = t, d[4] = n, d[8] = i, d[12] = r, d[1] = s, d[5] = o, d[9] = a, d[13] = c, d[2] = l, d[6] = h, d[10] = u, d[14] = f, d[3] = p, d[7] = g, d[11] = _, d[15] = m, this;
  }
  identity() {
    return this.set(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1), this;
  }
  clone() {
    return new hs().fromArray(this.elements);
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
    const n = this.elements, i = t.elements, r = 1 / In.setFromMatrixColumn(t, 0).length(), s = 1 / In.setFromMatrixColumn(t, 1).length(), o = 1 / In.setFromMatrixColumn(t, 2).length();
    return n[0] = i[0] * r, n[1] = i[1] * r, n[2] = i[2] * r, n[3] = 0, n[4] = i[4] * s, n[5] = i[5] * s, n[6] = i[6] * s, n[7] = 0, n[8] = i[8] * o, n[9] = i[9] * o, n[10] = i[10] * o, n[11] = 0, n[12] = 0, n[13] = 0, n[14] = 0, n[15] = 1, this;
  }
  makeRotationFromEuler(t) {
    const n = this.elements, i = t.x, r = t.y, s = t.z, o = Math.cos(i), a = Math.sin(i), c = Math.cos(r), l = Math.sin(r), h = Math.cos(s), u = Math.sin(s);
    if (t.order === "XYZ") {
      const f = o * h, p = o * u, g = a * h, _ = a * u;
      n[0] = c * h, n[4] = -c * u, n[8] = l, n[1] = p + g * l, n[5] = f - _ * l, n[9] = -a * c, n[2] = _ - f * l, n[6] = g + p * l, n[10] = o * c;
    } else if (t.order === "YXZ") {
      const f = c * h, p = c * u, g = l * h, _ = l * u;
      n[0] = f + _ * a, n[4] = g * a - p, n[8] = o * l, n[1] = o * u, n[5] = o * h, n[9] = -a, n[2] = p * a - g, n[6] = _ + f * a, n[10] = o * c;
    } else if (t.order === "ZXY") {
      const f = c * h, p = c * u, g = l * h, _ = l * u;
      n[0] = f - _ * a, n[4] = -o * u, n[8] = g + p * a, n[1] = p + g * a, n[5] = o * h, n[9] = _ - f * a, n[2] = -o * l, n[6] = a, n[10] = o * c;
    } else if (t.order === "ZYX") {
      const f = o * h, p = o * u, g = a * h, _ = a * u;
      n[0] = c * h, n[4] = g * l - p, n[8] = f * l + _, n[1] = c * u, n[5] = _ * l + f, n[9] = p * l - g, n[2] = -l, n[6] = a * c, n[10] = o * c;
    } else if (t.order === "YZX") {
      const f = o * c, p = o * l, g = a * c, _ = a * l;
      n[0] = c * h, n[4] = _ - f * u, n[8] = g * u + p, n[1] = u, n[5] = o * h, n[9] = -a * h, n[2] = -l * h, n[6] = p * u + g, n[10] = f - _ * u;
    } else if (t.order === "XZY") {
      const f = o * c, p = o * l, g = a * c, _ = a * l;
      n[0] = c * h, n[4] = -u, n[8] = l * h, n[1] = f * u + _, n[5] = o * h, n[9] = p * u - g, n[2] = g * u - p, n[6] = a * h, n[10] = _ * u + f;
    }
    return n[3] = 0, n[7] = 0, n[11] = 0, n[12] = 0, n[13] = 0, n[14] = 0, n[15] = 1, this;
  }
  makeRotationFromQuaternion(t) {
    return this.compose(Ac, t, wc);
  }
  lookAt(t, n, i) {
    const r = this.elements;
    return bt.subVectors(t, n), bt.lengthSq() === 0 && (bt.z = 1), bt.normalize(), sn.crossVectors(i, bt), sn.lengthSq() === 0 && (Math.abs(i.z) === 1 ? bt.x += 1e-4 : bt.z += 1e-4, bt.normalize(), sn.crossVectors(i, bt)), sn.normalize(), Bi.crossVectors(bt, sn), r[0] = sn.x, r[4] = Bi.x, r[8] = bt.x, r[1] = sn.y, r[5] = Bi.y, r[9] = bt.y, r[2] = sn.z, r[6] = Bi.z, r[10] = bt.z, this;
  }
  multiply(t) {
    return this.multiplyMatrices(this, t);
  }
  premultiply(t) {
    return this.multiplyMatrices(t, this);
  }
  multiplyMatrices(t, n) {
    const i = t.elements, r = n.elements, s = this.elements, o = i[0], a = i[4], c = i[8], l = i[12], h = i[1], u = i[5], f = i[9], p = i[13], g = i[2], _ = i[6], m = i[10], d = i[14], T = i[3], v = i[7], S = i[11], b = i[15], w = r[0], C = r[4], P = r[8], E = r[12], y = r[1], R = r[5], z = r[9], k = r[13], B = r[2], Z = r[6], W = r[10], Q = r[14], G = r[3], oe = r[7], fe = r[11], Le = r[15];
    return s[0] = o * w + a * y + c * B + l * G, s[4] = o * C + a * R + c * Z + l * oe, s[8] = o * P + a * z + c * W + l * fe, s[12] = o * E + a * k + c * Q + l * Le, s[1] = h * w + u * y + f * B + p * G, s[5] = h * C + u * R + f * Z + p * oe, s[9] = h * P + u * z + f * W + p * fe, s[13] = h * E + u * k + f * Q + p * Le, s[2] = g * w + _ * y + m * B + d * G, s[6] = g * C + _ * R + m * Z + d * oe, s[10] = g * P + _ * z + m * W + d * fe, s[14] = g * E + _ * k + m * Q + d * Le, s[3] = T * w + v * y + S * B + b * G, s[7] = T * C + v * R + S * Z + b * oe, s[11] = T * P + v * z + S * W + b * fe, s[15] = T * E + v * k + S * Q + b * Le, this;
  }
  multiplyScalar(t) {
    const n = this.elements;
    return n[0] *= t, n[4] *= t, n[8] *= t, n[12] *= t, n[1] *= t, n[5] *= t, n[9] *= t, n[13] *= t, n[2] *= t, n[6] *= t, n[10] *= t, n[14] *= t, n[3] *= t, n[7] *= t, n[11] *= t, n[15] *= t, this;
  }
  determinant() {
    const t = this.elements, n = t[0], i = t[4], r = t[8], s = t[12], o = t[1], a = t[5], c = t[9], l = t[13], h = t[2], u = t[6], f = t[10], p = t[14], g = t[3], _ = t[7], m = t[11], d = t[15];
    return g * (+s * c * u - r * l * u - s * a * f + i * l * f + r * a * p - i * c * p) + _ * (+n * c * p - n * l * f + s * o * f - r * o * p + r * l * h - s * c * h) + m * (+n * l * u - n * a * p - s * o * u + i * o * p + s * a * h - i * l * h) + d * (-r * a * h - n * c * u + n * a * f + r * o * u - i * o * f + i * c * h);
  }
  transpose() {
    const t = this.elements;
    let n;
    return n = t[1], t[1] = t[4], t[4] = n, n = t[2], t[2] = t[8], t[8] = n, n = t[6], t[6] = t[9], t[9] = n, n = t[3], t[3] = t[12], t[12] = n, n = t[7], t[7] = t[13], t[13] = n, n = t[11], t[11] = t[14], t[14] = n, this;
  }
  setPosition(t, n, i) {
    const r = this.elements;
    return t.isVector3 ? (r[12] = t.x, r[13] = t.y, r[14] = t.z) : (r[12] = t, r[13] = n, r[14] = i), this;
  }
  invert() {
    const t = this.elements, n = t[0], i = t[1], r = t[2], s = t[3], o = t[4], a = t[5], c = t[6], l = t[7], h = t[8], u = t[9], f = t[10], p = t[11], g = t[12], _ = t[13], m = t[14], d = t[15], T = u * m * l - _ * f * l + _ * c * p - a * m * p - u * c * d + a * f * d, v = g * f * l - h * m * l - g * c * p + o * m * p + h * c * d - o * f * d, S = h * _ * l - g * u * l + g * a * p - o * _ * p - h * a * d + o * u * d, b = g * u * c - h * _ * c - g * a * f + o * _ * f + h * a * m - o * u * m, w = n * T + i * v + r * S + s * b;
    if (w === 0) return this.set(0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);
    const C = 1 / w;
    return t[0] = T * C, t[1] = (_ * f * s - u * m * s - _ * r * p + i * m * p + u * r * d - i * f * d) * C, t[2] = (a * m * s - _ * c * s + _ * r * l - i * m * l - a * r * d + i * c * d) * C, t[3] = (u * c * s - a * f * s - u * r * l + i * f * l + a * r * p - i * c * p) * C, t[4] = v * C, t[5] = (h * m * s - g * f * s + g * r * p - n * m * p - h * r * d + n * f * d) * C, t[6] = (g * c * s - o * m * s - g * r * l + n * m * l + o * r * d - n * c * d) * C, t[7] = (o * f * s - h * c * s + h * r * l - n * f * l - o * r * p + n * c * p) * C, t[8] = S * C, t[9] = (g * u * s - h * _ * s - g * i * p + n * _ * p + h * i * d - n * u * d) * C, t[10] = (o * _ * s - g * a * s + g * i * l - n * _ * l - o * i * d + n * a * d) * C, t[11] = (h * a * s - o * u * s - h * i * l + n * u * l + o * i * p - n * a * p) * C, t[12] = b * C, t[13] = (h * _ * r - g * u * r + g * i * f - n * _ * f - h * i * m + n * u * m) * C, t[14] = (g * a * r - o * _ * r - g * i * c + n * _ * c + o * i * m - n * a * m) * C, t[15] = (o * u * r - h * a * r + h * i * c - n * u * c - o * i * f + n * a * f) * C, this;
  }
  scale(t) {
    const n = this.elements, i = t.x, r = t.y, s = t.z;
    return n[0] *= i, n[4] *= r, n[8] *= s, n[1] *= i, n[5] *= r, n[9] *= s, n[2] *= i, n[6] *= r, n[10] *= s, n[3] *= i, n[7] *= r, n[11] *= s, this;
  }
  getMaxScaleOnAxis() {
    const t = this.elements, n = t[0] * t[0] + t[1] * t[1] + t[2] * t[2], i = t[4] * t[4] + t[5] * t[5] + t[6] * t[6], r = t[8] * t[8] + t[9] * t[9] + t[10] * t[10];
    return Math.sqrt(Math.max(n, i, r));
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
    const i = Math.cos(n), r = Math.sin(n), s = 1 - i, o = t.x, a = t.y, c = t.z, l = s * o, h = s * a;
    return this.set(l * o + i, l * a - r * c, l * c + r * a, 0, l * a + r * c, h * a + i, h * c - r * o, 0, l * c - r * a, h * c + r * o, s * c * c + i, 0, 0, 0, 0, 1), this;
  }
  makeScale(t, n, i) {
    return this.set(t, 0, 0, 0, 0, n, 0, 0, 0, 0, i, 0, 0, 0, 0, 1), this;
  }
  makeShear(t, n, i, r, s, o) {
    return this.set(1, i, s, 0, t, 1, o, 0, n, r, 1, 0, 0, 0, 0, 1), this;
  }
  compose(t, n, i) {
    const r = this.elements, s = n._x, o = n._y, a = n._z, c = n._w, l = s + s, h = o + o, u = a + a, f = s * l, p = s * h, g = s * u, _ = o * h, m = o * u, d = a * u, T = c * l, v = c * h, S = c * u, b = i.x, w = i.y, C = i.z;
    return r[0] = (1 - (_ + d)) * b, r[1] = (p + S) * b, r[2] = (g - v) * b, r[3] = 0, r[4] = (p - S) * w, r[5] = (1 - (f + d)) * w, r[6] = (m + T) * w, r[7] = 0, r[8] = (g + v) * C, r[9] = (m - T) * C, r[10] = (1 - (f + _)) * C, r[11] = 0, r[12] = t.x, r[13] = t.y, r[14] = t.z, r[15] = 1, this;
  }
  decompose(t, n, i) {
    const r = this.elements;
    let s = In.set(r[0], r[1], r[2]).length();
    const o = In.set(r[4], r[5], r[6]).length(), a = In.set(r[8], r[9], r[10]).length();
    this.determinant() < 0 && (s = -s), t.x = r[12], t.y = r[13], t.z = r[14], Ft.copy(this);
    const c = 1 / s, l = 1 / o, h = 1 / a;
    return Ft.elements[0] *= c, Ft.elements[1] *= c, Ft.elements[2] *= c, Ft.elements[4] *= l, Ft.elements[5] *= l, Ft.elements[6] *= l, Ft.elements[8] *= h, Ft.elements[9] *= h, Ft.elements[10] *= h, n.setFromRotationMatrix(Ft), i.x = s, i.y = o, i.z = a, this;
  }
  makePerspective(t, n, i, r, s, o, a = Qn, c = !1) {
    const l = this.elements, h = 2 * s / (n - t), u = 2 * s / (i - r), f = (n + t) / (n - t), p = (i + r) / (i - r);
    let g, _;
    if (c)
      g = s / (o - s), _ = o * s / (o - s);
    else if (a === 2e3)
      g = -(o + s) / (o - s), _ = -2 * o * s / (o - s);
    else if (a === 2001)
      g = -o / (o - s), _ = -o * s / (o - s);
    else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: " + a);
    return l[0] = h, l[4] = 0, l[8] = f, l[12] = 0, l[1] = 0, l[5] = u, l[9] = p, l[13] = 0, l[2] = 0, l[6] = 0, l[10] = g, l[14] = _, l[3] = 0, l[7] = 0, l[11] = -1, l[15] = 0, this;
  }
  makeOrthographic(t, n, i, r, s, o, a = Qn, c = !1) {
    const l = this.elements, h = 2 / (n - t), u = 2 / (i - r), f = -(n + t) / (n - t), p = -(i + r) / (i - r);
    let g, _;
    if (c)
      g = 1 / (o - s), _ = o / (o - s);
    else if (a === 2e3)
      g = -2 / (o - s), _ = -(o + s) / (o - s);
    else if (a === 2001)
      g = -1 / (o - s), _ = -s / (o - s);
    else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: " + a);
    return l[0] = h, l[4] = 0, l[8] = 0, l[12] = f, l[1] = 0, l[5] = u, l[9] = 0, l[13] = p, l[2] = 0, l[6] = 0, l[10] = g, l[14] = _, l[3] = 0, l[7] = 0, l[11] = 0, l[15] = 1, this;
  }
  equals(t) {
    const n = this.elements, i = t.elements;
    for (let r = 0; r < 16; r++) if (n[r] !== i[r]) return !1;
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
}, In = /* @__PURE__ */ new D(), Ft = /* @__PURE__ */ new nt(), Ac = /* @__PURE__ */ new D(0, 0, 0), wc = /* @__PURE__ */ new D(1, 1, 1), sn = /* @__PURE__ */ new D(), Bi = /* @__PURE__ */ new D(), bt = /* @__PURE__ */ new D(), Gs = /* @__PURE__ */ new nt(), Ws = /* @__PURE__ */ new hn(), un = class ta {
  constructor(t = 0, n = 0, i = 0, r = ta.DEFAULT_ORDER) {
    this.isEuler = !0, this._x = t, this._y = n, this._z = i, this._order = r;
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
  set(t, n, i, r = this._order) {
    return this._x = t, this._y = n, this._z = i, this._order = r, this._onChangeCallback(), this;
  }
  clone() {
    return new this.constructor(this._x, this._y, this._z, this._order);
  }
  copy(t) {
    return this._x = t._x, this._y = t._y, this._z = t._z, this._order = t._order, this._onChangeCallback(), this;
  }
  setFromRotationMatrix(t, n = this._order, i = !0) {
    const r = t.elements, s = r[0], o = r[4], a = r[8], c = r[1], l = r[5], h = r[9], u = r[2], f = r[6], p = r[10];
    switch (n) {
      case "XYZ":
        this._y = Math.asin(He(a, -1, 1)), Math.abs(a) < 0.9999999 ? (this._x = Math.atan2(-h, p), this._z = Math.atan2(-o, s)) : (this._x = Math.atan2(f, l), this._z = 0);
        break;
      case "YXZ":
        this._x = Math.asin(-He(h, -1, 1)), Math.abs(h) < 0.9999999 ? (this._y = Math.atan2(a, p), this._z = Math.atan2(c, l)) : (this._y = Math.atan2(-u, s), this._z = 0);
        break;
      case "ZXY":
        this._x = Math.asin(He(f, -1, 1)), Math.abs(f) < 0.9999999 ? (this._y = Math.atan2(-u, p), this._z = Math.atan2(-o, l)) : (this._y = 0, this._z = Math.atan2(c, s));
        break;
      case "ZYX":
        this._y = Math.asin(-He(u, -1, 1)), Math.abs(u) < 0.9999999 ? (this._x = Math.atan2(f, p), this._z = Math.atan2(c, s)) : (this._x = 0, this._z = Math.atan2(-o, l));
        break;
      case "YZX":
        this._z = Math.asin(He(c, -1, 1)), Math.abs(c) < 0.9999999 ? (this._x = Math.atan2(-h, l), this._y = Math.atan2(-u, s)) : (this._x = 0, this._y = Math.atan2(a, p));
        break;
      case "XZY":
        this._z = Math.asin(-He(o, -1, 1)), Math.abs(o) < 0.9999999 ? (this._x = Math.atan2(f, l), this._y = Math.atan2(a, s)) : (this._x = Math.atan2(-h, p), this._y = 0);
        break;
      default:
        console.warn("THREE.Euler: .setFromRotationMatrix() encountered an unknown order: " + n);
    }
    return this._order = n, i === !0 && this._onChangeCallback(), this;
  }
  setFromQuaternion(t, n, i) {
    return Gs.makeRotationFromQuaternion(t), this.setFromRotationMatrix(Gs, n, i);
  }
  setFromVector3(t, n = this._order) {
    return this.set(t.x, t.y, t.z, n);
  }
  reorder(t) {
    return Ws.setFromEuler(this), this.setFromQuaternion(Ws, t);
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
un.DEFAULT_ORDER = "XYZ";
var na = class {
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
}, Rc = 0, Xs = /* @__PURE__ */ new D(), Un = /* @__PURE__ */ new hn(), jt = /* @__PURE__ */ new nt(), zi = /* @__PURE__ */ new D(), li = /* @__PURE__ */ new D(), Cc = /* @__PURE__ */ new D(), Pc = /* @__PURE__ */ new hn(), Ys = /* @__PURE__ */ new D(1, 0, 0), qs = /* @__PURE__ */ new D(0, 1, 0), Zs = /* @__PURE__ */ new D(0, 0, 1), Ks = { type: "added" }, Lc = { type: "removed" }, Nn = {
  type: "childadded",
  child: null
}, Nr = {
  type: "childremoved",
  child: null
}, Et = class cr extends An {
  constructor() {
    super(), this.isObject3D = !0, Object.defineProperty(this, "id", { value: Rc++ }), this.uuid = wn(), this.name = "", this.type = "Object3D", this.parent = null, this.children = [], this.up = cr.DEFAULT_UP.clone();
    const t = new D(), n = new un(), i = new hn(), r = new D(1, 1, 1);
    function s() {
      i.setFromEuler(n, !1);
    }
    function o() {
      n.setFromQuaternion(i, void 0, !1);
    }
    n._onChange(s), i._onChange(o), Object.defineProperties(this, {
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
        value: r
      },
      modelViewMatrix: { value: new nt() },
      normalMatrix: { value: new Xe() }
    }), this.matrix = new nt(), this.matrixWorld = new nt(), this.matrixAutoUpdate = cr.DEFAULT_MATRIX_AUTO_UPDATE, this.matrixWorldAutoUpdate = cr.DEFAULT_MATRIX_WORLD_AUTO_UPDATE, this.matrixWorldNeedsUpdate = !1, this.layers = new na(), this.visible = !0, this.castShadow = !1, this.receiveShadow = !1, this.frustumCulled = !0, this.renderOrder = 0, this.animations = [], this.customDepthMaterial = void 0, this.customDistanceMaterial = void 0, this.userData = {};
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
    return Un.setFromAxisAngle(t, n), this.quaternion.multiply(Un), this;
  }
  rotateOnWorldAxis(t, n) {
    return Un.setFromAxisAngle(t, n), this.quaternion.premultiply(Un), this;
  }
  rotateX(t) {
    return this.rotateOnAxis(Ys, t);
  }
  rotateY(t) {
    return this.rotateOnAxis(qs, t);
  }
  rotateZ(t) {
    return this.rotateOnAxis(Zs, t);
  }
  translateOnAxis(t, n) {
    return Xs.copy(t).applyQuaternion(this.quaternion), this.position.add(Xs.multiplyScalar(n)), this;
  }
  translateX(t) {
    return this.translateOnAxis(Ys, t);
  }
  translateY(t) {
    return this.translateOnAxis(qs, t);
  }
  translateZ(t) {
    return this.translateOnAxis(Zs, t);
  }
  localToWorld(t) {
    return this.updateWorldMatrix(!0, !1), t.applyMatrix4(this.matrixWorld);
  }
  worldToLocal(t) {
    return this.updateWorldMatrix(!0, !1), t.applyMatrix4(jt.copy(this.matrixWorld).invert());
  }
  lookAt(t, n, i) {
    t.isVector3 ? zi.copy(t) : zi.set(t, n, i);
    const r = this.parent;
    this.updateWorldMatrix(!0, !1), li.setFromMatrixPosition(this.matrixWorld), this.isCamera || this.isLight ? jt.lookAt(li, zi, this.up) : jt.lookAt(zi, li, this.up), this.quaternion.setFromRotationMatrix(jt), r && (jt.extractRotation(r.matrixWorld), Un.setFromRotationMatrix(jt), this.quaternion.premultiply(Un.invert()));
  }
  add(t) {
    if (arguments.length > 1) {
      for (let n = 0; n < arguments.length; n++) this.add(arguments[n]);
      return this;
    }
    return t === this ? (console.error("THREE.Object3D.add: object can't be added as a child of itself.", t), this) : (t && t.isObject3D ? (t.removeFromParent(), t.parent = this, this.children.push(t), t.dispatchEvent(Ks), Nn.child = t, this.dispatchEvent(Nn), Nn.child = null) : console.error("THREE.Object3D.add: object not an instance of THREE.Object3D.", t), this);
  }
  remove(t) {
    if (arguments.length > 1) {
      for (let i = 0; i < arguments.length; i++) this.remove(arguments[i]);
      return this;
    }
    const n = this.children.indexOf(t);
    return n !== -1 && (t.parent = null, this.children.splice(n, 1), t.dispatchEvent(Lc), Nr.child = t, this.dispatchEvent(Nr), Nr.child = null), this;
  }
  removeFromParent() {
    const t = this.parent;
    return t !== null && t.remove(this), this;
  }
  clear() {
    return this.remove(...this.children);
  }
  attach(t) {
    return this.updateWorldMatrix(!0, !1), jt.copy(this.matrixWorld).invert(), t.parent !== null && (t.parent.updateWorldMatrix(!0, !1), jt.multiply(t.parent.matrixWorld)), t.applyMatrix4(jt), t.removeFromParent(), t.parent = this, this.children.push(t), t.updateWorldMatrix(!1, !0), t.dispatchEvent(Ks), Nn.child = t, this.dispatchEvent(Nn), Nn.child = null, this;
  }
  getObjectById(t) {
    return this.getObjectByProperty("id", t);
  }
  getObjectByName(t) {
    return this.getObjectByProperty("name", t);
  }
  getObjectByProperty(t, n) {
    if (this[t] === n) return this;
    for (let i = 0, r = this.children.length; i < r; i++) {
      const s = this.children[i].getObjectByProperty(t, n);
      if (s !== void 0) return s;
    }
  }
  getObjectsByProperty(t, n, i = []) {
    this[t] === n && i.push(this);
    const r = this.children;
    for (let s = 0, o = r.length; s < o; s++) r[s].getObjectsByProperty(t, n, i);
    return i;
  }
  getWorldPosition(t) {
    return this.updateWorldMatrix(!0, !1), t.setFromMatrixPosition(this.matrixWorld);
  }
  getWorldQuaternion(t) {
    return this.updateWorldMatrix(!0, !1), this.matrixWorld.decompose(li, t, Cc), t;
  }
  getWorldScale(t) {
    return this.updateWorldMatrix(!0, !1), this.matrixWorld.decompose(li, Pc, t), t;
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
    for (let i = 0, r = n.length; i < r; i++) n[i].traverse(t);
  }
  traverseVisible(t) {
    if (this.visible === !1) return;
    t(this);
    const n = this.children;
    for (let i = 0, r = n.length; i < r; i++) n[i].traverseVisible(t);
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
    for (let i = 0, r = n.length; i < r; i++) n[i].updateMatrixWorld(t);
  }
  updateWorldMatrix(t, n) {
    const i = this.parent;
    if (t === !0 && i !== null && i.updateWorldMatrix(!0, !1), this.matrixAutoUpdate && this.updateMatrix(), this.matrixWorldAutoUpdate === !0 && (this.parent === null ? this.matrixWorld.copy(this.matrix) : this.matrixWorld.multiplyMatrices(this.parent.matrixWorld, this.matrix)), n === !0) {
      const r = this.children;
      for (let s = 0, o = r.length; s < o; s++) r[s].updateWorldMatrix(!1, !0);
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
    const r = {};
    r.uuid = this.uuid, r.type = this.type, this.name !== "" && (r.name = this.name), this.castShadow === !0 && (r.castShadow = !0), this.receiveShadow === !0 && (r.receiveShadow = !0), this.visible === !1 && (r.visible = !1), this.frustumCulled === !1 && (r.frustumCulled = !1), this.renderOrder !== 0 && (r.renderOrder = this.renderOrder), Object.keys(this.userData).length > 0 && (r.userData = this.userData), r.layers = this.layers.mask, r.matrix = this.matrix.toArray(), r.up = this.up.toArray(), this.matrixAutoUpdate === !1 && (r.matrixAutoUpdate = !1), this.isInstancedMesh && (r.type = "InstancedMesh", r.count = this.count, r.instanceMatrix = this.instanceMatrix.toJSON(), this.instanceColor !== null && (r.instanceColor = this.instanceColor.toJSON())), this.isBatchedMesh && (r.type = "BatchedMesh", r.perObjectFrustumCulled = this.perObjectFrustumCulled, r.sortObjects = this.sortObjects, r.drawRanges = this._drawRanges, r.reservedRanges = this._reservedRanges, r.geometryInfo = this._geometryInfo.map((a) => ({
      ...a,
      boundingBox: a.boundingBox ? a.boundingBox.toJSON() : void 0,
      boundingSphere: a.boundingSphere ? a.boundingSphere.toJSON() : void 0
    })), r.instanceInfo = this._instanceInfo.map((a) => ({ ...a })), r.availableInstanceIds = this._availableInstanceIds.slice(), r.availableGeometryIds = this._availableGeometryIds.slice(), r.nextIndexStart = this._nextIndexStart, r.nextVertexStart = this._nextVertexStart, r.geometryCount = this._geometryCount, r.maxInstanceCount = this._maxInstanceCount, r.maxVertexCount = this._maxVertexCount, r.maxIndexCount = this._maxIndexCount, r.geometryInitialized = this._geometryInitialized, r.matricesTexture = this._matricesTexture.toJSON(t), r.indirectTexture = this._indirectTexture.toJSON(t), this._colorsTexture !== null && (r.colorsTexture = this._colorsTexture.toJSON(t)), this.boundingSphere !== null && (r.boundingSphere = this.boundingSphere.toJSON()), this.boundingBox !== null && (r.boundingBox = this.boundingBox.toJSON()));
    function s(a, c) {
      return a[c.uuid] === void 0 && (a[c.uuid] = c.toJSON(t)), c.uuid;
    }
    if (this.isScene)
      this.background && (this.background.isColor ? r.background = this.background.toJSON() : this.background.isTexture && (r.background = this.background.toJSON(t).uuid)), this.environment && this.environment.isTexture && this.environment.isRenderTargetTexture !== !0 && (r.environment = this.environment.toJSON(t).uuid);
    else if (this.isMesh || this.isLine || this.isPoints) {
      r.geometry = s(t.geometries, this.geometry);
      const a = this.geometry.parameters;
      if (a !== void 0 && a.shapes !== void 0) {
        const c = a.shapes;
        if (Array.isArray(c)) for (let l = 0, h = c.length; l < h; l++) {
          const u = c[l];
          s(t.shapes, u);
        }
        else s(t.shapes, c);
      }
    }
    if (this.isSkinnedMesh && (r.bindMode = this.bindMode, r.bindMatrix = this.bindMatrix.toArray(), this.skeleton !== void 0 && (s(t.skeletons, this.skeleton), r.skeleton = this.skeleton.uuid)), this.material !== void 0) if (Array.isArray(this.material)) {
      const a = [];
      for (let c = 0, l = this.material.length; c < l; c++) a.push(s(t.materials, this.material[c]));
      r.material = a;
    } else r.material = s(t.materials, this.material);
    if (this.children.length > 0) {
      r.children = [];
      for (let a = 0; a < this.children.length; a++) r.children.push(this.children[a].toJSON(t).object);
    }
    if (this.animations.length > 0) {
      r.animations = [];
      for (let a = 0; a < this.animations.length; a++) {
        const c = this.animations[a];
        r.animations.push(s(t.animations, c));
      }
    }
    if (n) {
      const a = o(t.geometries), c = o(t.materials), l = o(t.textures), h = o(t.images), u = o(t.shapes), f = o(t.skeletons), p = o(t.animations), g = o(t.nodes);
      a.length > 0 && (i.geometries = a), c.length > 0 && (i.materials = c), l.length > 0 && (i.textures = l), h.length > 0 && (i.images = h), u.length > 0 && (i.shapes = u), f.length > 0 && (i.skeletons = f), p.length > 0 && (i.animations = p), g.length > 0 && (i.nodes = g);
    }
    return i.object = r, i;
    function o(a) {
      const c = [];
      for (const l in a) {
        const h = a[l];
        delete h.metadata, c.push(h);
      }
      return c;
    }
  }
  clone(t) {
    return new this.constructor().copy(this, t);
  }
  copy(t, n = !0) {
    if (this.name = t.name, this.up.copy(t.up), this.position.copy(t.position), this.rotation.order = t.rotation.order, this.quaternion.copy(t.quaternion), this.scale.copy(t.scale), this.matrix.copy(t.matrix), this.matrixWorld.copy(t.matrixWorld), this.matrixAutoUpdate = t.matrixAutoUpdate, this.matrixWorldAutoUpdate = t.matrixWorldAutoUpdate, this.matrixWorldNeedsUpdate = t.matrixWorldNeedsUpdate, this.layers.mask = t.layers.mask, this.visible = t.visible, this.castShadow = t.castShadow, this.receiveShadow = t.receiveShadow, this.frustumCulled = t.frustumCulled, this.renderOrder = t.renderOrder, this.animations = t.animations.slice(), this.userData = JSON.parse(JSON.stringify(t.userData)), n === !0) for (let i = 0; i < t.children.length; i++) {
      const r = t.children[i];
      this.add(r.clone());
    }
    return this;
  }
};
Et.DEFAULT_UP = /* @__PURE__ */ new D(0, 1, 0);
Et.DEFAULT_MATRIX_AUTO_UPDATE = !0;
Et.DEFAULT_MATRIX_WORLD_AUTO_UPDATE = !0;
var Bt = /* @__PURE__ */ new D(), Jt = /* @__PURE__ */ new D(), Or = /* @__PURE__ */ new D(), $t = /* @__PURE__ */ new D(), On = /* @__PURE__ */ new D(), Fn = /* @__PURE__ */ new D(), js = /* @__PURE__ */ new D(), Fr = /* @__PURE__ */ new D(), Br = /* @__PURE__ */ new D(), zr = /* @__PURE__ */ new D(), Vr = /* @__PURE__ */ new ht(), Hr = /* @__PURE__ */ new ht(), kr = /* @__PURE__ */ new ht(), ci = class Wn {
  constructor(t = new D(), n = new D(), i = new D()) {
    this.a = t, this.b = n, this.c = i;
  }
  static getNormal(t, n, i, r) {
    r.subVectors(i, n), Bt.subVectors(t, n), r.cross(Bt);
    const s = r.lengthSq();
    return s > 0 ? r.multiplyScalar(1 / Math.sqrt(s)) : r.set(0, 0, 0);
  }
  static getBarycoord(t, n, i, r, s) {
    Bt.subVectors(r, n), Jt.subVectors(i, n), Or.subVectors(t, n);
    const o = Bt.dot(Bt), a = Bt.dot(Jt), c = Bt.dot(Or), l = Jt.dot(Jt), h = Jt.dot(Or), u = o * l - a * a;
    if (u === 0)
      return s.set(0, 0, 0), null;
    const f = 1 / u, p = (l * c - a * h) * f, g = (o * h - a * c) * f;
    return s.set(1 - p - g, g, p);
  }
  static containsPoint(t, n, i, r) {
    return this.getBarycoord(t, n, i, r, $t) === null ? !1 : $t.x >= 0 && $t.y >= 0 && $t.x + $t.y <= 1;
  }
  static getInterpolation(t, n, i, r, s, o, a, c) {
    return this.getBarycoord(t, n, i, r, $t) === null ? (c.x = 0, c.y = 0, "z" in c && (c.z = 0), "w" in c && (c.w = 0), null) : (c.setScalar(0), c.addScaledVector(s, $t.x), c.addScaledVector(o, $t.y), c.addScaledVector(a, $t.z), c);
  }
  static getInterpolatedAttribute(t, n, i, r, s, o) {
    return Vr.setScalar(0), Hr.setScalar(0), kr.setScalar(0), Vr.fromBufferAttribute(t, n), Hr.fromBufferAttribute(t, i), kr.fromBufferAttribute(t, r), o.setScalar(0), o.addScaledVector(Vr, s.x), o.addScaledVector(Hr, s.y), o.addScaledVector(kr, s.z), o;
  }
  static isFrontFacing(t, n, i, r) {
    return Bt.subVectors(i, n), Jt.subVectors(t, n), Bt.cross(Jt).dot(r) < 0;
  }
  set(t, n, i) {
    return this.a.copy(t), this.b.copy(n), this.c.copy(i), this;
  }
  setFromPointsAndIndices(t, n, i, r) {
    return this.a.copy(t[n]), this.b.copy(t[i]), this.c.copy(t[r]), this;
  }
  setFromAttributeAndIndices(t, n, i, r) {
    return this.a.fromBufferAttribute(t, n), this.b.fromBufferAttribute(t, i), this.c.fromBufferAttribute(t, r), this;
  }
  clone() {
    return new this.constructor().copy(this);
  }
  copy(t) {
    return this.a.copy(t.a), this.b.copy(t.b), this.c.copy(t.c), this;
  }
  getArea() {
    return Bt.subVectors(this.c, this.b), Jt.subVectors(this.a, this.b), Bt.cross(Jt).length() * 0.5;
  }
  getMidpoint(t) {
    return t.addVectors(this.a, this.b).add(this.c).multiplyScalar(1 / 3);
  }
  getNormal(t) {
    return Wn.getNormal(this.a, this.b, this.c, t);
  }
  getPlane(t) {
    return t.setFromCoplanarPoints(this.a, this.b, this.c);
  }
  getBarycoord(t, n) {
    return Wn.getBarycoord(t, this.a, this.b, this.c, n);
  }
  getInterpolation(t, n, i, r, s) {
    return Wn.getInterpolation(t, this.a, this.b, this.c, n, i, r, s);
  }
  containsPoint(t) {
    return Wn.containsPoint(t, this.a, this.b, this.c);
  }
  isFrontFacing(t) {
    return Wn.isFrontFacing(this.a, this.b, this.c, t);
  }
  intersectsBox(t) {
    return t.intersectsTriangle(this);
  }
  closestPointToPoint(t, n) {
    const i = this.a, r = this.b, s = this.c;
    let o, a;
    On.subVectors(r, i), Fn.subVectors(s, i), Fr.subVectors(t, i);
    const c = On.dot(Fr), l = Fn.dot(Fr);
    if (c <= 0 && l <= 0) return n.copy(i);
    Br.subVectors(t, r);
    const h = On.dot(Br), u = Fn.dot(Br);
    if (h >= 0 && u <= h) return n.copy(r);
    const f = c * u - h * l;
    if (f <= 0 && c >= 0 && h <= 0)
      return o = c / (c - h), n.copy(i).addScaledVector(On, o);
    zr.subVectors(t, s);
    const p = On.dot(zr), g = Fn.dot(zr);
    if (g >= 0 && p <= g) return n.copy(s);
    const _ = p * l - c * g;
    if (_ <= 0 && l >= 0 && g <= 0)
      return a = l / (l - g), n.copy(i).addScaledVector(Fn, a);
    const m = h * g - p * u;
    if (m <= 0 && u - h >= 0 && p - g >= 0)
      return js.subVectors(s, r), a = (u - h) / (u - h + (p - g)), n.copy(r).addScaledVector(js, a);
    const d = 1 / (m + _ + f);
    return o = _ * d, a = f * d, n.copy(i).addScaledVector(On, o).addScaledVector(Fn, a);
  }
  equals(t) {
    return t.a.equals(this.a) && t.b.equals(this.b) && t.c.equals(this.c);
  }
}, ia = {
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
}, on = {
  h: 0,
  s: 0,
  l: 0
}, Vi = {
  h: 0,
  s: 0,
  l: 0
};
function Gr(e, t, n) {
  return n < 0 && (n += 1), n > 1 && (n -= 1), n < 1 / 6 ? e + (t - e) * 6 * n : n < 1 / 2 ? t : n < 2 / 3 ? e + (t - e) * 6 * (2 / 3 - n) : e;
}
var qe = class {
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
  setHex(e, t = wt) {
    return e = Math.floor(e), this.r = (e >> 16 & 255) / 255, this.g = (e >> 8 & 255) / 255, this.b = (e & 255) / 255, je.colorSpaceToWorking(this, t), this;
  }
  setRGB(e, t, n, i = je.workingColorSpace) {
    return this.r = e, this.g = t, this.b = n, je.colorSpaceToWorking(this, i), this;
  }
  setHSL(e, t, n, i = je.workingColorSpace) {
    if (e = xs(e, 1), t = He(t, 0, 1), n = He(n, 0, 1), t === 0) this.r = this.g = this.b = n;
    else {
      const r = n <= 0.5 ? n * (1 + t) : n + t - n * t, s = 2 * n - r;
      this.r = Gr(s, r, e + 1 / 3), this.g = Gr(s, r, e), this.b = Gr(s, r, e - 1 / 3);
    }
    return je.colorSpaceToWorking(this, i), this;
  }
  setStyle(e, t = wt) {
    function n(r) {
      r !== void 0 && parseFloat(r) < 1 && console.warn("THREE.Color: Alpha component of " + e + " will be ignored.");
    }
    let i;
    if (i = /^(\w+)\(([^\)]*)\)/.exec(e)) {
      let r;
      const s = i[1], o = i[2];
      switch (s) {
        case "rgb":
        case "rgba":
          if (r = /^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))
            return n(r[4]), this.setRGB(Math.min(255, parseInt(r[1], 10)) / 255, Math.min(255, parseInt(r[2], 10)) / 255, Math.min(255, parseInt(r[3], 10)) / 255, t);
          if (r = /^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))
            return n(r[4]), this.setRGB(Math.min(100, parseInt(r[1], 10)) / 100, Math.min(100, parseInt(r[2], 10)) / 100, Math.min(100, parseInt(r[3], 10)) / 100, t);
          break;
        case "hsl":
        case "hsla":
          if (r = /^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))
            return n(r[4]), this.setHSL(parseFloat(r[1]) / 360, parseFloat(r[2]) / 100, parseFloat(r[3]) / 100, t);
          break;
        default:
          console.warn("THREE.Color: Unknown color model " + e);
      }
    } else if (i = /^\#([A-Fa-f\d]+)$/.exec(e)) {
      const r = i[1], s = r.length;
      if (s === 3) return this.setRGB(parseInt(r.charAt(0), 16) / 15, parseInt(r.charAt(1), 16) / 15, parseInt(r.charAt(2), 16) / 15, t);
      if (s === 6) return this.setHex(parseInt(r, 16), t);
      console.warn("THREE.Color: Invalid hex color " + e);
    } else if (e && e.length > 0) return this.setColorName(e, t);
    return this;
  }
  setColorName(e, t = wt) {
    const n = ia[e.toLowerCase()];
    return n !== void 0 ? this.setHex(n, t) : console.warn("THREE.Color: Unknown color " + e), this;
  }
  clone() {
    return new this.constructor(this.r, this.g, this.b);
  }
  copy(e) {
    return this.r = e.r, this.g = e.g, this.b = e.b, this;
  }
  copySRGBToLinear(e) {
    return this.r = Qt(e.r), this.g = Qt(e.g), this.b = Qt(e.b), this;
  }
  copyLinearToSRGB(e) {
    return this.r = jn(e.r), this.g = jn(e.g), this.b = jn(e.b), this;
  }
  convertSRGBToLinear() {
    return this.copySRGBToLinear(this), this;
  }
  convertLinearToSRGB() {
    return this.copyLinearToSRGB(this), this;
  }
  getHex(e = wt) {
    return je.workingToColorSpace(xt.copy(this), e), Math.round(He(xt.r * 255, 0, 255)) * 65536 + Math.round(He(xt.g * 255, 0, 255)) * 256 + Math.round(He(xt.b * 255, 0, 255));
  }
  getHexString(e = wt) {
    return ("000000" + this.getHex(e).toString(16)).slice(-6);
  }
  getHSL(e, t = je.workingColorSpace) {
    je.workingToColorSpace(xt.copy(this), t);
    const n = xt.r, i = xt.g, r = xt.b, s = Math.max(n, i, r), o = Math.min(n, i, r);
    let a, c;
    const l = (o + s) / 2;
    if (o === s)
      a = 0, c = 0;
    else {
      const h = s - o;
      switch (c = l <= 0.5 ? h / (s + o) : h / (2 - s - o), s) {
        case n:
          a = (i - r) / h + (i < r ? 6 : 0);
          break;
        case i:
          a = (r - n) / h + 2;
          break;
        case r:
          a = (n - i) / h + 4;
          break;
      }
      a /= 6;
    }
    return e.h = a, e.s = c, e.l = l, e;
  }
  getRGB(e, t = je.workingColorSpace) {
    return je.workingToColorSpace(xt.copy(this), t), e.r = xt.r, e.g = xt.g, e.b = xt.b, e;
  }
  getStyle(e = wt) {
    je.workingToColorSpace(xt.copy(this), e);
    const t = xt.r, n = xt.g, i = xt.b;
    return e !== "srgb" ? `color(${e} ${t.toFixed(3)} ${n.toFixed(3)} ${i.toFixed(3)})` : `rgb(${Math.round(t * 255)},${Math.round(n * 255)},${Math.round(i * 255)})`;
  }
  offsetHSL(e, t, n) {
    return this.getHSL(on), this.setHSL(on.h + e, on.s + t, on.l + n);
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
    this.getHSL(on), e.getHSL(Vi);
    const n = vi(on.h, Vi.h, t), i = vi(on.s, Vi.s, t), r = vi(on.l, Vi.l, t);
    return this.setHSL(n, i, r), this;
  }
  setFromVector3(e) {
    return this.r = e.x, this.g = e.y, this.b = e.z, this;
  }
  applyMatrix3(e) {
    const t = this.r, n = this.g, i = this.b, r = e.elements;
    return this.r = r[0] * t + r[3] * n + r[6] * i, this.g = r[1] * t + r[4] * n + r[7] * i, this.b = r[2] * t + r[5] * n + r[8] * i, this;
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
}, xt = /* @__PURE__ */ new qe();
qe.NAMES = ia;
var Dc = 0, ii = class extends An {
  constructor() {
    super(), this.isMaterial = !0, Object.defineProperty(this, "id", { value: Dc++ }), this.uuid = wn(), this.name = "", this.type = "Material", this.blending = 1, this.side = 0, this.vertexColors = !1, this.opacity = 1, this.transparent = !1, this.alphaHash = !1, this.blendSrc = 204, this.blendDst = 205, this.blendEquation = 100, this.blendSrcAlpha = null, this.blendDstAlpha = null, this.blendEquationAlpha = null, this.blendColor = new qe(0, 0, 0), this.blendAlpha = 0, this.depthFunc = 3, this.depthTest = !0, this.depthWrite = !0, this.stencilWriteMask = 255, this.stencilFunc = 519, this.stencilRef = 0, this.stencilFuncMask = 255, this.stencilFail = br, this.stencilZFail = br, this.stencilZPass = br, this.stencilWrite = !1, this.clippingPlanes = null, this.clipIntersection = !1, this.clipShadows = !1, this.shadowSide = null, this.colorWrite = !0, this.precision = null, this.polygonOffset = !1, this.polygonOffsetFactor = 0, this.polygonOffsetUnits = 0, this.dithering = !1, this.alphaToCoverage = !1, this.premultipliedAlpha = !1, this.forceSinglePass = !1, this.allowOverride = !0, this.visible = !0, this.toneMapped = !0, this.userData = {}, this.version = 0, this._alphaTest = 0;
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
    function i(r) {
      const s = [];
      for (const o in r) {
        const a = r[o];
        delete a.metadata, s.push(a);
      }
      return s;
    }
    if (t) {
      const r = i(e.textures), s = i(e.images);
      r.length > 0 && (n.textures = r), s.length > 0 && (n.images = s);
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
      for (let r = 0; r !== i; ++r) n[r] = t[r].clone();
    }
    return this.clippingPlanes = n, this.clipIntersection = e.clipIntersection, this.clipShadows = e.clipShadows, this.shadowSide = e.shadowSide, this.colorWrite = e.colorWrite, this.precision = e.precision, this.polygonOffset = e.polygonOffset, this.polygonOffsetFactor = e.polygonOffsetFactor, this.polygonOffsetUnits = e.polygonOffsetUnits, this.dithering = e.dithering, this.alphaTest = e.alphaTest, this.alphaHash = e.alphaHash, this.alphaToCoverage = e.alphaToCoverage, this.premultipliedAlpha = e.premultipliedAlpha, this.forceSinglePass = e.forceSinglePass, this.visible = e.visible, this.toneMapped = e.toneMapped, this.userData = JSON.parse(JSON.stringify(e.userData)), this;
  }
  dispose() {
    this.dispatchEvent({ type: "dispose" });
  }
  set needsUpdate(e) {
    e === !0 && this.version++;
  }
}, ra = class extends ii {
  constructor(e) {
    super(), this.isMeshBasicMaterial = !0, this.type = "MeshBasicMaterial", this.color = new qe(16777215), this.map = null, this.lightMap = null, this.lightMapIntensity = 1, this.aoMap = null, this.aoMapIntensity = 1, this.specularMap = null, this.alphaMap = null, this.envMap = null, this.envMapRotation = new un(), this.combine = 0, this.reflectivity = 1, this.refractionRatio = 0.98, this.wireframe = !1, this.wireframeLinewidth = 1, this.wireframeLinecap = "round", this.wireframeLinejoin = "round", this.fog = !0, this.setValues(e);
  }
  copy(e) {
    return super.copy(e), this.color.copy(e.color), this.map = e.map, this.lightMap = e.lightMap, this.lightMapIntensity = e.lightMapIntensity, this.aoMap = e.aoMap, this.aoMapIntensity = e.aoMapIntensity, this.specularMap = e.specularMap, this.alphaMap = e.alphaMap, this.envMap = e.envMap, this.envMapRotation.copy(e.envMapRotation), this.combine = e.combine, this.reflectivity = e.reflectivity, this.refractionRatio = e.refractionRatio, this.wireframe = e.wireframe, this.wireframeLinewidth = e.wireframeLinewidth, this.wireframeLinecap = e.wireframeLinecap, this.wireframeLinejoin = e.wireframeLinejoin, this.fog = e.fog, this;
  }
}, ct = /* @__PURE__ */ new D(), Hi = /* @__PURE__ */ new se(), Ic = 0, Vt = class {
  constructor(e, t, n = !1) {
    if (Array.isArray(e)) throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");
    this.isBufferAttribute = !0, Object.defineProperty(this, "id", { value: Ic++ }), this.name = "", this.array = e, this.itemSize = t, this.count = e !== void 0 ? e.length / t : 0, this.normalized = n, this.usage = ec, this.updateRanges = [], this.gpuType = xr, this.version = 0;
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
    for (let i = 0, r = this.itemSize; i < r; i++) this.array[e + i] = t.array[n + i];
    return this;
  }
  copyArray(e) {
    return this.array.set(e), this;
  }
  applyMatrix3(e) {
    if (this.itemSize === 2) for (let t = 0, n = this.count; t < n; t++)
      Hi.fromBufferAttribute(this, t), Hi.applyMatrix3(e), this.setXY(t, Hi.x, Hi.y);
    else if (this.itemSize === 3) for (let t = 0, n = this.count; t < n; t++)
      ct.fromBufferAttribute(this, t), ct.applyMatrix3(e), this.setXYZ(t, ct.x, ct.y, ct.z);
    return this;
  }
  applyMatrix4(e) {
    for (let t = 0, n = this.count; t < n; t++)
      ct.fromBufferAttribute(this, t), ct.applyMatrix4(e), this.setXYZ(t, ct.x, ct.y, ct.z);
    return this;
  }
  applyNormalMatrix(e) {
    for (let t = 0, n = this.count; t < n; t++)
      ct.fromBufferAttribute(this, t), ct.applyNormalMatrix(e), this.setXYZ(t, ct.x, ct.y, ct.z);
    return this;
  }
  transformDirection(e) {
    for (let t = 0, n = this.count; t < n; t++)
      ct.fromBufferAttribute(this, t), ct.transformDirection(e), this.setXYZ(t, ct.x, ct.y, ct.z);
    return this;
  }
  set(e, t = 0) {
    return this.array.set(e, t), this;
  }
  getComponent(e, t) {
    let n = this.array[e * this.itemSize + t];
    return this.normalized && (n = Gn(n, this.array)), n;
  }
  setComponent(e, t, n) {
    return this.normalized && (n = yt(n, this.array)), this.array[e * this.itemSize + t] = n, this;
  }
  getX(e) {
    let t = this.array[e * this.itemSize];
    return this.normalized && (t = Gn(t, this.array)), t;
  }
  setX(e, t) {
    return this.normalized && (t = yt(t, this.array)), this.array[e * this.itemSize] = t, this;
  }
  getY(e) {
    let t = this.array[e * this.itemSize + 1];
    return this.normalized && (t = Gn(t, this.array)), t;
  }
  setY(e, t) {
    return this.normalized && (t = yt(t, this.array)), this.array[e * this.itemSize + 1] = t, this;
  }
  getZ(e) {
    let t = this.array[e * this.itemSize + 2];
    return this.normalized && (t = Gn(t, this.array)), t;
  }
  setZ(e, t) {
    return this.normalized && (t = yt(t, this.array)), this.array[e * this.itemSize + 2] = t, this;
  }
  getW(e) {
    let t = this.array[e * this.itemSize + 3];
    return this.normalized && (t = Gn(t, this.array)), t;
  }
  setW(e, t) {
    return this.normalized && (t = yt(t, this.array)), this.array[e * this.itemSize + 3] = t, this;
  }
  setXY(e, t, n) {
    return e *= this.itemSize, this.normalized && (t = yt(t, this.array), n = yt(n, this.array)), this.array[e + 0] = t, this.array[e + 1] = n, this;
  }
  setXYZ(e, t, n, i) {
    return e *= this.itemSize, this.normalized && (t = yt(t, this.array), n = yt(n, this.array), i = yt(i, this.array)), this.array[e + 0] = t, this.array[e + 1] = n, this.array[e + 2] = i, this;
  }
  setXYZW(e, t, n, i, r) {
    return e *= this.itemSize, this.normalized && (t = yt(t, this.array), n = yt(n, this.array), i = yt(i, this.array), r = yt(r, this.array)), this.array[e + 0] = t, this.array[e + 1] = n, this.array[e + 2] = i, this.array[e + 3] = r, this;
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
}, sa = class extends Vt {
  constructor(e, t, n) {
    super(new Uint16Array(e), t, n);
  }
}, oa = class extends Vt {
  constructor(e, t, n) {
    super(new Uint32Array(e), t, n);
  }
}, ut = class extends Vt {
  constructor(e, t, n) {
    super(new Float32Array(e), t, n);
  }
}, Uc = 0, Lt = /* @__PURE__ */ new nt(), Wr = /* @__PURE__ */ new Et(), Bn = /* @__PURE__ */ new D(), At = /* @__PURE__ */ new en(), hi = /* @__PURE__ */ new en(), mt = /* @__PURE__ */ new D(), It = class aa extends An {
  constructor() {
    super(), this.isBufferGeometry = !0, Object.defineProperty(this, "id", { value: Uc++ }), this.uuid = wn(), this.name = "", this.type = "BufferGeometry", this.index = null, this.indirect = null, this.attributes = {}, this.morphAttributes = {}, this.morphTargetsRelative = !1, this.groups = [], this.boundingBox = null, this.boundingSphere = null, this.drawRange = {
      start: 0,
      count: 1 / 0
    }, this.userData = {};
  }
  getIndex() {
    return this.index;
  }
  setIndex(t) {
    return Array.isArray(t) ? this.index = new ($o(t) ? oa : sa)(t, 1) : this.index = t, this;
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
      const s = new Xe().getNormalMatrix(t);
      i.applyNormalMatrix(s), i.needsUpdate = !0;
    }
    const r = this.attributes.tangent;
    return r !== void 0 && (r.transformDirection(t), r.needsUpdate = !0), this.boundingBox !== null && this.computeBoundingBox(), this.boundingSphere !== null && this.computeBoundingSphere(), this;
  }
  applyQuaternion(t) {
    return Lt.makeRotationFromQuaternion(t), this.applyMatrix4(Lt), this;
  }
  rotateX(t) {
    return Lt.makeRotationX(t), this.applyMatrix4(Lt), this;
  }
  rotateY(t) {
    return Lt.makeRotationY(t), this.applyMatrix4(Lt), this;
  }
  rotateZ(t) {
    return Lt.makeRotationZ(t), this.applyMatrix4(Lt), this;
  }
  translate(t, n, i) {
    return Lt.makeTranslation(t, n, i), this.applyMatrix4(Lt), this;
  }
  scale(t, n, i) {
    return Lt.makeScale(t, n, i), this.applyMatrix4(Lt), this;
  }
  lookAt(t) {
    return Wr.lookAt(t), Wr.updateMatrix(), this.applyMatrix4(Wr.matrix), this;
  }
  center() {
    return this.computeBoundingBox(), this.boundingBox.getCenter(Bn).negate(), this.translate(Bn.x, Bn.y, Bn.z), this;
  }
  setFromPoints(t) {
    const n = this.getAttribute("position");
    if (n === void 0) {
      const i = [];
      for (let r = 0, s = t.length; r < s; r++) {
        const o = t[r];
        i.push(o.x, o.y, o.z || 0);
      }
      this.setAttribute("position", new ut(i, 3));
    } else {
      const i = Math.min(t.length, n.count);
      for (let r = 0; r < i; r++) {
        const s = t[r];
        n.setXYZ(r, s.x, s.y, s.z || 0);
      }
      t.length > n.count && console.warn("THREE.BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."), n.needsUpdate = !0;
    }
    return this;
  }
  computeBoundingBox() {
    this.boundingBox === null && (this.boundingBox = new en());
    const t = this.attributes.position, n = this.morphAttributes.position;
    if (t && t.isGLBufferAttribute) {
      console.error("THREE.BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.", this), this.boundingBox.set(new D(-1 / 0, -1 / 0, -1 / 0), new D(1 / 0, 1 / 0, 1 / 0));
      return;
    }
    if (t !== void 0) {
      if (this.boundingBox.setFromBufferAttribute(t), n) for (let i = 0, r = n.length; i < r; i++) {
        const s = n[i];
        At.setFromBufferAttribute(s), this.morphTargetsRelative ? (mt.addVectors(this.boundingBox.min, At.min), this.boundingBox.expandByPoint(mt), mt.addVectors(this.boundingBox.max, At.max), this.boundingBox.expandByPoint(mt)) : (this.boundingBox.expandByPoint(At.min), this.boundingBox.expandByPoint(At.max));
      }
    } else this.boundingBox.makeEmpty();
    (isNaN(this.boundingBox.min.x) || isNaN(this.boundingBox.min.y) || isNaN(this.boundingBox.min.z)) && console.error('THREE.BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.', this);
  }
  computeBoundingSphere() {
    this.boundingSphere === null && (this.boundingSphere = new ni());
    const t = this.attributes.position, n = this.morphAttributes.position;
    if (t && t.isGLBufferAttribute) {
      console.error("THREE.BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.", this), this.boundingSphere.set(new D(), 1 / 0);
      return;
    }
    if (t) {
      const i = this.boundingSphere.center;
      if (At.setFromBufferAttribute(t), n) for (let s = 0, o = n.length; s < o; s++) {
        const a = n[s];
        hi.setFromBufferAttribute(a), this.morphTargetsRelative ? (mt.addVectors(At.min, hi.min), At.expandByPoint(mt), mt.addVectors(At.max, hi.max), At.expandByPoint(mt)) : (At.expandByPoint(hi.min), At.expandByPoint(hi.max));
      }
      At.getCenter(i);
      let r = 0;
      for (let s = 0, o = t.count; s < o; s++)
        mt.fromBufferAttribute(t, s), r = Math.max(r, i.distanceToSquared(mt));
      if (n) for (let s = 0, o = n.length; s < o; s++) {
        const a = n[s], c = this.morphTargetsRelative;
        for (let l = 0, h = a.count; l < h; l++)
          mt.fromBufferAttribute(a, l), c && (Bn.fromBufferAttribute(t, l), mt.add(Bn)), r = Math.max(r, i.distanceToSquared(mt));
      }
      this.boundingSphere.radius = Math.sqrt(r), isNaN(this.boundingSphere.radius) && console.error('THREE.BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.', this);
    }
  }
  computeTangents() {
    const t = this.index, n = this.attributes;
    if (t === null || n.position === void 0 || n.normal === void 0 || n.uv === void 0) {
      console.error("THREE.BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");
      return;
    }
    const i = n.position, r = n.normal, s = n.uv;
    this.hasAttribute("tangent") === !1 && this.setAttribute("tangent", new Vt(new Float32Array(4 * i.count), 4));
    const o = this.getAttribute("tangent"), a = [], c = [];
    for (let P = 0; P < i.count; P++)
      a[P] = new D(), c[P] = new D();
    const l = new D(), h = new D(), u = new D(), f = new se(), p = new se(), g = new se(), _ = new D(), m = new D();
    function d(P, E, y) {
      l.fromBufferAttribute(i, P), h.fromBufferAttribute(i, E), u.fromBufferAttribute(i, y), f.fromBufferAttribute(s, P), p.fromBufferAttribute(s, E), g.fromBufferAttribute(s, y), h.sub(l), u.sub(l), p.sub(f), g.sub(f);
      const R = 1 / (p.x * g.y - g.x * p.y);
      isFinite(R) && (_.copy(h).multiplyScalar(g.y).addScaledVector(u, -p.y).multiplyScalar(R), m.copy(u).multiplyScalar(p.x).addScaledVector(h, -g.x).multiplyScalar(R), a[P].add(_), a[E].add(_), a[y].add(_), c[P].add(m), c[E].add(m), c[y].add(m));
    }
    let T = this.groups;
    T.length === 0 && (T = [{
      start: 0,
      count: t.count
    }]);
    for (let P = 0, E = T.length; P < E; ++P) {
      const y = T[P], R = y.start, z = y.count;
      for (let k = R, B = R + z; k < B; k += 3) d(t.getX(k + 0), t.getX(k + 1), t.getX(k + 2));
    }
    const v = new D(), S = new D(), b = new D(), w = new D();
    function C(P) {
      b.fromBufferAttribute(r, P), w.copy(b);
      const E = a[P];
      v.copy(E), v.sub(b.multiplyScalar(b.dot(E))).normalize(), S.crossVectors(w, E);
      const y = S.dot(c[P]) < 0 ? -1 : 1;
      o.setXYZW(P, v.x, v.y, v.z, y);
    }
    for (let P = 0, E = T.length; P < E; ++P) {
      const y = T[P], R = y.start, z = y.count;
      for (let k = R, B = R + z; k < B; k += 3)
        C(t.getX(k + 0)), C(t.getX(k + 1)), C(t.getX(k + 2));
    }
  }
  computeVertexNormals() {
    const t = this.index, n = this.getAttribute("position");
    if (n !== void 0) {
      let i = this.getAttribute("normal");
      if (i === void 0)
        i = new Vt(new Float32Array(n.count * 3), 3), this.setAttribute("normal", i);
      else for (let f = 0, p = i.count; f < p; f++) i.setXYZ(f, 0, 0, 0);
      const r = new D(), s = new D(), o = new D(), a = new D(), c = new D(), l = new D(), h = new D(), u = new D();
      if (t) for (let f = 0, p = t.count; f < p; f += 3) {
        const g = t.getX(f + 0), _ = t.getX(f + 1), m = t.getX(f + 2);
        r.fromBufferAttribute(n, g), s.fromBufferAttribute(n, _), o.fromBufferAttribute(n, m), h.subVectors(o, s), u.subVectors(r, s), h.cross(u), a.fromBufferAttribute(i, g), c.fromBufferAttribute(i, _), l.fromBufferAttribute(i, m), a.add(h), c.add(h), l.add(h), i.setXYZ(g, a.x, a.y, a.z), i.setXYZ(_, c.x, c.y, c.z), i.setXYZ(m, l.x, l.y, l.z);
      }
      else for (let f = 0, p = n.count; f < p; f += 3)
        r.fromBufferAttribute(n, f + 0), s.fromBufferAttribute(n, f + 1), o.fromBufferAttribute(n, f + 2), h.subVectors(o, s), u.subVectors(r, s), h.cross(u), i.setXYZ(f + 0, h.x, h.y, h.z), i.setXYZ(f + 1, h.x, h.y, h.z), i.setXYZ(f + 2, h.x, h.y, h.z);
      this.normalizeNormals(), i.needsUpdate = !0;
    }
  }
  normalizeNormals() {
    const t = this.attributes.normal;
    for (let n = 0, i = t.count; n < i; n++)
      mt.fromBufferAttribute(t, n), mt.normalize(), t.setXYZ(n, mt.x, mt.y, mt.z);
  }
  toNonIndexed() {
    function t(a, c) {
      const l = a.array, h = a.itemSize, u = a.normalized, f = new l.constructor(c.length * h);
      let p = 0, g = 0;
      for (let _ = 0, m = c.length; _ < m; _++) {
        a.isInterleavedBufferAttribute ? p = c[_] * a.data.stride + a.offset : p = c[_] * h;
        for (let d = 0; d < h; d++) f[g++] = l[p++];
      }
      return new Vt(f, h, u);
    }
    if (this.index === null)
      return console.warn("THREE.BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."), this;
    const n = new aa(), i = this.index.array, r = this.attributes;
    for (const a in r) {
      const c = r[a], l = t(c, i);
      n.setAttribute(a, l);
    }
    const s = this.morphAttributes;
    for (const a in s) {
      const c = [], l = s[a];
      for (let h = 0, u = l.length; h < u; h++) {
        const f = l[h], p = t(f, i);
        c.push(p);
      }
      n.morphAttributes[a] = c;
    }
    n.morphTargetsRelative = this.morphTargetsRelative;
    const o = this.groups;
    for (let a = 0, c = o.length; a < c; a++) {
      const l = o[a];
      n.addGroup(l.start, l.count, l.materialIndex);
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
      const c = this.parameters;
      for (const l in c) c[l] !== void 0 && (t[l] = c[l]);
      return t;
    }
    t.data = { attributes: {} };
    const n = this.index;
    n !== null && (t.data.index = {
      type: n.array.constructor.name,
      array: Array.prototype.slice.call(n.array)
    });
    const i = this.attributes;
    for (const c in i) {
      const l = i[c];
      t.data.attributes[c] = l.toJSON(t.data);
    }
    const r = {};
    let s = !1;
    for (const c in this.morphAttributes) {
      const l = this.morphAttributes[c], h = [];
      for (let u = 0, f = l.length; u < f; u++) {
        const p = l[u];
        h.push(p.toJSON(t.data));
      }
      h.length > 0 && (r[c] = h, s = !0);
    }
    s && (t.data.morphAttributes = r, t.data.morphTargetsRelative = this.morphTargetsRelative);
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
    const r = t.attributes;
    for (const l in r) {
      const h = r[l];
      this.setAttribute(l, h.clone(n));
    }
    const s = t.morphAttributes;
    for (const l in s) {
      const h = [], u = s[l];
      for (let f = 0, p = u.length; f < p; f++) h.push(u[f].clone(n));
      this.morphAttributes[l] = h;
    }
    this.morphTargetsRelative = t.morphTargetsRelative;
    const o = t.groups;
    for (let l = 0, h = o.length; l < h; l++) {
      const u = o[l];
      this.addGroup(u.start, u.count, u.materialIndex);
    }
    const a = t.boundingBox;
    a !== null && (this.boundingBox = a.clone());
    const c = t.boundingSphere;
    return c !== null && (this.boundingSphere = c.clone()), this.drawRange.start = t.drawRange.start, this.drawRange.count = t.drawRange.count, this.userData = t.userData, this;
  }
  dispose() {
    this.dispatchEvent({ type: "dispose" });
  }
}, Js = /* @__PURE__ */ new nt(), gn = /* @__PURE__ */ new Ms(), ki = /* @__PURE__ */ new ni(), $s = /* @__PURE__ */ new D(), Gi = /* @__PURE__ */ new D(), Wi = /* @__PURE__ */ new D(), Xi = /* @__PURE__ */ new D(), Xr = /* @__PURE__ */ new D(), Yi = /* @__PURE__ */ new D(), Qs = /* @__PURE__ */ new D(), qi = /* @__PURE__ */ new D(), Rt = class extends Et {
  constructor(e = new It(), t = new ra()) {
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
        for (let i = 0, r = n.length; i < r; i++) {
          const s = n[i].name || String(i);
          this.morphTargetInfluences.push(0), this.morphTargetDictionary[s] = i;
        }
      }
    }
  }
  getVertexPosition(e, t) {
    const n = this.geometry, i = n.attributes.position, r = n.morphAttributes.position, s = n.morphTargetsRelative;
    t.fromBufferAttribute(i, e);
    const o = this.morphTargetInfluences;
    if (r && o) {
      Yi.set(0, 0, 0);
      for (let a = 0, c = r.length; a < c; a++) {
        const l = o[a], h = r[a];
        l !== 0 && (Xr.fromBufferAttribute(h, e), s ? Yi.addScaledVector(Xr, l) : Yi.addScaledVector(Xr.sub(t), l));
      }
      t.add(Yi);
    }
    return t;
  }
  raycast(e, t) {
    const n = this.geometry, i = this.material, r = this.matrixWorld;
    i !== void 0 && (n.boundingSphere === null && n.computeBoundingSphere(), ki.copy(n.boundingSphere), ki.applyMatrix4(r), gn.copy(e.ray).recast(e.near), !(ki.containsPoint(gn.origin) === !1 && (gn.intersectSphere(ki, $s) === null || gn.origin.distanceToSquared($s) > (e.far - e.near) ** 2)) && (Js.copy(r).invert(), gn.copy(e.ray).applyMatrix4(Js), !(n.boundingBox !== null && gn.intersectsBox(n.boundingBox) === !1) && this._computeIntersections(e, t, gn)));
  }
  _computeIntersections(e, t, n) {
    let i;
    const r = this.geometry, s = this.material, o = r.index, a = r.attributes.position, c = r.attributes.uv, l = r.attributes.uv1, h = r.attributes.normal, u = r.groups, f = r.drawRange;
    if (o !== null) if (Array.isArray(s)) for (let p = 0, g = u.length; p < g; p++) {
      const _ = u[p], m = s[_.materialIndex], d = Math.max(_.start, f.start), T = Math.min(o.count, Math.min(_.start + _.count, f.start + f.count));
      for (let v = d, S = T; v < S; v += 3) {
        const b = o.getX(v), w = o.getX(v + 1), C = o.getX(v + 2);
        i = Zi(this, m, e, n, c, l, h, b, w, C), i && (i.faceIndex = Math.floor(v / 3), i.face.materialIndex = _.materialIndex, t.push(i));
      }
    }
    else {
      const p = Math.max(0, f.start), g = Math.min(o.count, f.start + f.count);
      for (let _ = p, m = g; _ < m; _ += 3) {
        const d = o.getX(_), T = o.getX(_ + 1), v = o.getX(_ + 2);
        i = Zi(this, s, e, n, c, l, h, d, T, v), i && (i.faceIndex = Math.floor(_ / 3), t.push(i));
      }
    }
    else if (a !== void 0) if (Array.isArray(s)) for (let p = 0, g = u.length; p < g; p++) {
      const _ = u[p], m = s[_.materialIndex], d = Math.max(_.start, f.start), T = Math.min(a.count, Math.min(_.start + _.count, f.start + f.count));
      for (let v = d, S = T; v < S; v += 3) {
        const b = v, w = v + 1, C = v + 2;
        i = Zi(this, m, e, n, c, l, h, b, w, C), i && (i.faceIndex = Math.floor(v / 3), i.face.materialIndex = _.materialIndex, t.push(i));
      }
    }
    else {
      const p = Math.max(0, f.start), g = Math.min(a.count, f.start + f.count);
      for (let _ = p, m = g; _ < m; _ += 3) {
        const d = _, T = _ + 1, v = _ + 2;
        i = Zi(this, s, e, n, c, l, h, d, T, v), i && (i.faceIndex = Math.floor(_ / 3), t.push(i));
      }
    }
  }
};
function Nc(e, t, n, i, r, s, o, a) {
  let c;
  if (t.side === 1 ? c = i.intersectTriangle(o, s, r, !0, a) : c = i.intersectTriangle(r, s, o, t.side === 0, a), c === null) return null;
  qi.copy(a), qi.applyMatrix4(e.matrixWorld);
  const l = n.ray.origin.distanceTo(qi);
  return l < n.near || l > n.far ? null : {
    distance: l,
    point: qi.clone(),
    object: e
  };
}
function Zi(e, t, n, i, r, s, o, a, c, l) {
  e.getVertexPosition(a, Gi), e.getVertexPosition(c, Wi), e.getVertexPosition(l, Xi);
  const h = Nc(e, t, n, i, Gi, Wi, Xi, Qs);
  if (h) {
    const u = new D();
    ci.getBarycoord(Qs, Gi, Wi, Xi, u), r && (h.uv = ci.getInterpolatedAttribute(r, a, c, l, u, new se())), s && (h.uv1 = ci.getInterpolatedAttribute(s, a, c, l, u, new se())), o && (h.normal = ci.getInterpolatedAttribute(o, a, c, l, u, new D()), h.normal.dot(i.direction) > 0 && h.normal.multiplyScalar(-1));
    const f = {
      a,
      b: c,
      c: l,
      normal: new D(),
      materialIndex: 0
    };
    ci.getNormal(Gi, Wi, Xi, f.normal), h.face = f, h.barycoord = u;
  }
  return h;
}
var Ri = class la extends It {
  constructor(t = 1, n = 1, i = 1, r = 1, s = 1, o = 1) {
    super(), this.type = "BoxGeometry", this.parameters = {
      width: t,
      height: n,
      depth: i,
      widthSegments: r,
      heightSegments: s,
      depthSegments: o
    };
    const a = this;
    r = Math.floor(r), s = Math.floor(s), o = Math.floor(o);
    const c = [], l = [], h = [], u = [];
    let f = 0, p = 0;
    g("z", "y", "x", -1, -1, i, n, t, o, s, 0), g("z", "y", "x", 1, -1, i, n, -t, o, s, 1), g("x", "z", "y", 1, 1, t, i, n, r, o, 2), g("x", "z", "y", 1, -1, t, i, -n, r, o, 3), g("x", "y", "z", 1, -1, t, n, i, r, s, 4), g("x", "y", "z", -1, -1, t, n, -i, r, s, 5), this.setIndex(c), this.setAttribute("position", new ut(l, 3)), this.setAttribute("normal", new ut(h, 3)), this.setAttribute("uv", new ut(u, 2));
    function g(_, m, d, T, v, S, b, w, C, P, E) {
      const y = S / C, R = b / P, z = S / 2, k = b / 2, B = w / 2, Z = C + 1, W = P + 1;
      let Q = 0, G = 0;
      const oe = new D();
      for (let fe = 0; fe < W; fe++) {
        const Le = fe * R - k;
        for (let Ue = 0; Ue < Z; Ue++)
          oe[_] = (Ue * y - z) * T, oe[m] = Le * v, oe[d] = B, l.push(oe.x, oe.y, oe.z), oe[_] = 0, oe[m] = 0, oe[d] = w > 0 ? 1 : -1, h.push(oe.x, oe.y, oe.z), u.push(Ue / C), u.push(1 - fe / P), Q += 1;
      }
      for (let fe = 0; fe < P; fe++) for (let Le = 0; Le < C; Le++) {
        const Ue = f + Le + Z * fe, Je = f + Le + Z * (fe + 1), Ye = f + (Le + 1) + Z * (fe + 1), F = f + (Le + 1) + Z * fe;
        c.push(Ue, Je, F), c.push(Je, Ye, F), G += 6;
      }
      a.addGroup(p, G, E), p += G, f += Q;
    }
  }
  copy(t) {
    return super.copy(t), this.parameters = Object.assign({}, t.parameters), this;
  }
  static fromJSON(t) {
    return new la(t.width, t.height, t.depth, t.widthSegments, t.heightSegments, t.depthSegments);
  }
};
function ei(e) {
  const t = {};
  for (const n in e) {
    t[n] = {};
    for (const i in e[n]) {
      const r = e[n][i];
      r && (r.isColor || r.isMatrix3 || r.isMatrix4 || r.isVector2 || r.isVector3 || r.isVector4 || r.isTexture || r.isQuaternion) ? r.isRenderTargetTexture ? (console.warn("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."), t[n][i] = null) : t[n][i] = r.clone() : Array.isArray(r) ? t[n][i] = r.slice() : t[n][i] = r;
    }
  }
  return t;
}
function Mt(e) {
  const t = {};
  for (let n = 0; n < e.length; n++) {
    const i = ei(e[n]);
    for (const r in i) t[r] = i[r];
  }
  return t;
}
function Oc(e) {
  const t = [];
  for (let n = 0; n < e.length; n++) t.push(e[n].clone());
  return t;
}
function ca(e) {
  const t = e.getRenderTarget();
  return t === null ? e.outputColorSpace : t.isXRRenderTarget === !0 ? t.texture.colorSpace : je.workingColorSpace;
}
var Fc = {
  clone: ei,
  merge: Mt
}, Bc = `void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`, zc = `void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`, dn = class extends ii {
  constructor(e) {
    super(), this.isShaderMaterial = !0, this.type = "ShaderMaterial", this.defines = {}, this.uniforms = {}, this.uniformsGroups = [], this.vertexShader = Bc, this.fragmentShader = zc, this.linewidth = 1, this.wireframe = !1, this.wireframeLinewidth = 1, this.fog = !1, this.lights = !1, this.clipping = !1, this.forceSinglePass = !0, this.extensions = {
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
    return super.copy(e), this.fragmentShader = e.fragmentShader, this.vertexShader = e.vertexShader, this.uniforms = ei(e.uniforms), this.uniformsGroups = Oc(e.uniformsGroups), this.defines = Object.assign({}, e.defines), this.wireframe = e.wireframe, this.wireframeLinewidth = e.wireframeLinewidth, this.fog = e.fog, this.lights = e.lights, this.clipping = e.clipping, this.extensions = Object.assign({}, e.extensions), this.glslVersion = e.glslVersion, this;
  }
  toJSON(e) {
    const t = super.toJSON(e);
    t.glslVersion = this.glslVersion, t.uniforms = {};
    for (const i in this.uniforms) {
      const r = this.uniforms[i].value;
      r && r.isTexture ? t.uniforms[i] = {
        type: "t",
        value: r.toJSON(e).uuid
      } : r && r.isColor ? t.uniforms[i] = {
        type: "c",
        value: r.getHex()
      } : r && r.isVector2 ? t.uniforms[i] = {
        type: "v2",
        value: r.toArray()
      } : r && r.isVector3 ? t.uniforms[i] = {
        type: "v3",
        value: r.toArray()
      } : r && r.isVector4 ? t.uniforms[i] = {
        type: "v4",
        value: r.toArray()
      } : r && r.isMatrix3 ? t.uniforms[i] = {
        type: "m3",
        value: r.toArray()
      } : r && r.isMatrix4 ? t.uniforms[i] = {
        type: "m4",
        value: r.toArray()
      } : t.uniforms[i] = { value: r };
    }
    Object.keys(this.defines).length > 0 && (t.defines = this.defines), t.vertexShader = this.vertexShader, t.fragmentShader = this.fragmentShader, t.lights = this.lights, t.clipping = this.clipping;
    const n = {};
    for (const i in this.extensions) this.extensions[i] === !0 && (n[i] = !0);
    return Object.keys(n).length > 0 && (t.extensions = n), t;
  }
}, ha = class extends Et {
  constructor() {
    super(), this.isCamera = !0, this.type = "Camera", this.matrixWorldInverse = new nt(), this.projectionMatrix = new nt(), this.projectionMatrixInverse = new nt(), this.coordinateSystem = Qn, this._reversedDepth = !1;
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
}, an = /* @__PURE__ */ new D(), eo = /* @__PURE__ */ new se(), to = /* @__PURE__ */ new se(), zt = class extends ha {
  constructor(e = 50, t = 1, n = 0.1, i = 2e3) {
    super(), this.isPerspectiveCamera = !0, this.type = "PerspectiveCamera", this.fov = e, this.zoom = 1, this.near = n, this.far = i, this.focus = 10, this.aspect = t, this.view = null, this.filmGauge = 35, this.filmOffset = 0, this.updateProjectionMatrix();
  }
  copy(e, t) {
    return super.copy(e, t), this.fov = e.fov, this.zoom = e.zoom, this.near = e.near, this.far = e.far, this.focus = e.focus, this.aspect = e.aspect, this.view = e.view === null ? null : Object.assign({}, e.view), this.filmGauge = e.filmGauge, this.filmOffset = e.filmOffset, this;
  }
  setFocalLength(e) {
    const t = 0.5 * this.getFilmHeight() / e;
    this.fov = Si * 2 * Math.atan(t), this.updateProjectionMatrix();
  }
  getFocalLength() {
    const e = Math.tan(gi * 0.5 * this.fov);
    return 0.5 * this.getFilmHeight() / e;
  }
  getEffectiveFOV() {
    return Si * 2 * Math.atan(Math.tan(gi * 0.5 * this.fov) / this.zoom);
  }
  getFilmWidth() {
    return this.filmGauge * Math.min(this.aspect, 1);
  }
  getFilmHeight() {
    return this.filmGauge / Math.max(this.aspect, 1);
  }
  getViewBounds(e, t, n) {
    an.set(-1, -1, 0.5).applyMatrix4(this.projectionMatrixInverse), t.set(an.x, an.y).multiplyScalar(-e / an.z), an.set(1, 1, 0.5).applyMatrix4(this.projectionMatrixInverse), n.set(an.x, an.y).multiplyScalar(-e / an.z);
  }
  getViewSize(e, t) {
    return this.getViewBounds(e, eo, to), t.subVectors(to, eo);
  }
  setViewOffset(e, t, n, i, r, s) {
    this.aspect = e / t, this.view === null && (this.view = {
      enabled: !0,
      fullWidth: 1,
      fullHeight: 1,
      offsetX: 0,
      offsetY: 0,
      width: 1,
      height: 1
    }), this.view.enabled = !0, this.view.fullWidth = e, this.view.fullHeight = t, this.view.offsetX = n, this.view.offsetY = i, this.view.width = r, this.view.height = s, this.updateProjectionMatrix();
  }
  clearViewOffset() {
    this.view !== null && (this.view.enabled = !1), this.updateProjectionMatrix();
  }
  updateProjectionMatrix() {
    const e = this.near;
    let t = e * Math.tan(gi * 0.5 * this.fov) / this.zoom, n = 2 * t, i = this.aspect * n, r = -0.5 * i;
    const s = this.view;
    if (this.view !== null && this.view.enabled) {
      const a = s.fullWidth, c = s.fullHeight;
      r += s.offsetX * i / a, t -= s.offsetY * n / c, i *= s.width / a, n *= s.height / c;
    }
    const o = this.filmOffset;
    o !== 0 && (r += e * o / this.getFilmWidth()), this.projectionMatrix.makePerspective(r, r + i, t, t - n, e, this.far, this.coordinateSystem, this.reversedDepth), this.projectionMatrixInverse.copy(this.projectionMatrix).invert();
  }
  toJSON(e) {
    const t = super.toJSON(e);
    return t.object.fov = this.fov, t.object.zoom = this.zoom, t.object.near = this.near, t.object.far = this.far, t.object.focus = this.focus, t.object.aspect = this.aspect, this.view !== null && (t.object.view = Object.assign({}, this.view)), t.object.filmGauge = this.filmGauge, t.object.filmOffset = this.filmOffset, t;
  }
}, zn = -90, Vn = 1, Vc = class extends Et {
  constructor(e, t, n) {
    super(), this.type = "CubeCamera", this.renderTarget = n, this.coordinateSystem = null, this.activeMipmapLevel = 0;
    const i = new zt(zn, Vn, e, t);
    i.layers = this.layers, this.add(i);
    const r = new zt(zn, Vn, e, t);
    r.layers = this.layers, this.add(r);
    const s = new zt(zn, Vn, e, t);
    s.layers = this.layers, this.add(s);
    const o = new zt(zn, Vn, e, t);
    o.layers = this.layers, this.add(o);
    const a = new zt(zn, Vn, e, t);
    a.layers = this.layers, this.add(a);
    const c = new zt(zn, Vn, e, t);
    c.layers = this.layers, this.add(c);
  }
  updateCoordinateSystem() {
    const e = this.coordinateSystem, t = this.children.concat(), [n, i, r, s, o, a] = t;
    for (const c of t) this.remove(c);
    if (e === 2e3)
      n.up.set(0, 1, 0), n.lookAt(1, 0, 0), i.up.set(0, 1, 0), i.lookAt(-1, 0, 0), r.up.set(0, 0, -1), r.lookAt(0, 1, 0), s.up.set(0, 0, 1), s.lookAt(0, -1, 0), o.up.set(0, 1, 0), o.lookAt(0, 0, 1), a.up.set(0, 1, 0), a.lookAt(0, 0, -1);
    else if (e === 2001)
      n.up.set(0, -1, 0), n.lookAt(-1, 0, 0), i.up.set(0, -1, 0), i.lookAt(1, 0, 0), r.up.set(0, 0, 1), r.lookAt(0, 1, 0), s.up.set(0, 0, -1), s.lookAt(0, -1, 0), o.up.set(0, -1, 0), o.lookAt(0, 0, 1), a.up.set(0, -1, 0), a.lookAt(0, 0, -1);
    else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: " + e);
    for (const c of t)
      this.add(c), c.updateMatrixWorld();
  }
  update(e, t) {
    this.parent === null && this.updateMatrixWorld();
    const { renderTarget: n, activeMipmapLevel: i } = this;
    this.coordinateSystem !== e.coordinateSystem && (this.coordinateSystem = e.coordinateSystem, this.updateCoordinateSystem());
    const [r, s, o, a, c, l] = this.children, h = e.getRenderTarget(), u = e.getActiveCubeFace(), f = e.getActiveMipmapLevel(), p = e.xr.enabled;
    e.xr.enabled = !1;
    const g = n.texture.generateMipmaps;
    n.texture.generateMipmaps = !1, e.setRenderTarget(n, 0, i), e.render(t, r), e.setRenderTarget(n, 1, i), e.render(t, s), e.setRenderTarget(n, 2, i), e.render(t, o), e.setRenderTarget(n, 3, i), e.render(t, a), e.setRenderTarget(n, 4, i), e.render(t, c), n.texture.generateMipmaps = g, e.setRenderTarget(n, 5, i), e.render(t, l), e.setRenderTarget(h, u, f), e.xr.enabled = p, n.texture.needsPMREMUpdate = !0;
  }
}, ua = class extends kt {
  constructor(e = [], t = 301, n, i, r, s, o, a, c, l) {
    super(e, t, n, i, r, s, o, a, c, l), this.isCubeTexture = !0, this.flipY = !1;
  }
  get images() {
    return this.image;
  }
  set images(e) {
    this.image = e;
  }
}, Hc = class extends Tn {
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
    this.texture = new ua(i), this._setTextureOptions(t), this.texture.isRenderTargetTexture = !0;
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
    }, i = new Ri(5, 5, 5), r = new dn({
      name: "CubemapFromEquirect",
      uniforms: ei(n.uniforms),
      vertexShader: n.vertexShader,
      fragmentShader: n.fragmentShader,
      side: 1,
      blending: 0
    });
    r.uniforms.tEquirect.value = t;
    const s = new Rt(i, r), o = t.minFilter;
    return t.minFilter === 1008 && (t.minFilter = cn), new Vc(1, 10, this).update(e, s), t.minFilter = o, s.geometry.dispose(), s.material.dispose(), this;
  }
  clear(e, t = !0, n = !0, i = !0) {
    const r = e.getRenderTarget();
    for (let s = 0; s < 6; s++)
      e.setRenderTarget(this, s), e.clear(t, n, i);
    e.setRenderTarget(r);
  }
}, qn = class extends Et {
  constructor() {
    super(), this.isGroup = !0, this.type = "Group";
  }
}, kc = { type: "move" }, Yr = class {
  constructor() {
    this._targetRay = null, this._grip = null, this._hand = null;
  }
  getHandSpace() {
    return this._hand === null && (this._hand = new qn(), this._hand.matrixAutoUpdate = !1, this._hand.visible = !1, this._hand.joints = {}, this._hand.inputState = { pinching: !1 }), this._hand;
  }
  getTargetRaySpace() {
    return this._targetRay === null && (this._targetRay = new qn(), this._targetRay.matrixAutoUpdate = !1, this._targetRay.visible = !1, this._targetRay.hasLinearVelocity = !1, this._targetRay.linearVelocity = new D(), this._targetRay.hasAngularVelocity = !1, this._targetRay.angularVelocity = new D()), this._targetRay;
  }
  getGripSpace() {
    return this._grip === null && (this._grip = new qn(), this._grip.matrixAutoUpdate = !1, this._grip.visible = !1, this._grip.hasLinearVelocity = !1, this._grip.linearVelocity = new D(), this._grip.hasAngularVelocity = !1, this._grip.angularVelocity = new D()), this._grip;
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
    let i = null, r = null, s = null;
    const o = this._targetRay, a = this._grip, c = this._hand;
    if (e && t.session.visibilityState !== "visible-blurred") {
      if (c && e.hand) {
        s = !0;
        for (const g of e.hand.values()) {
          const _ = t.getJointPose(g, n), m = this._getHandJoint(c, g);
          _ !== null && (m.matrix.fromArray(_.transform.matrix), m.matrix.decompose(m.position, m.rotation, m.scale), m.matrixWorldNeedsUpdate = !0, m.jointRadius = _.radius), m.visible = _ !== null;
        }
        const l = c.joints["index-finger-tip"], h = c.joints["thumb-tip"], u = l.position.distanceTo(h.position);
        c.inputState.pinching && u > 0.025 ? (c.inputState.pinching = !1, this.dispatchEvent({
          type: "pinchend",
          handedness: e.handedness,
          target: this
        })) : !c.inputState.pinching && u <= 0.02 - 5e-3 && (c.inputState.pinching = !0, this.dispatchEvent({
          type: "pinchstart",
          handedness: e.handedness,
          target: this
        }));
      } else a !== null && e.gripSpace && (r = t.getPose(e.gripSpace, n), r !== null && (a.matrix.fromArray(r.transform.matrix), a.matrix.decompose(a.position, a.rotation, a.scale), a.matrixWorldNeedsUpdate = !0, r.linearVelocity ? (a.hasLinearVelocity = !0, a.linearVelocity.copy(r.linearVelocity)) : a.hasLinearVelocity = !1, r.angularVelocity ? (a.hasAngularVelocity = !0, a.angularVelocity.copy(r.angularVelocity)) : a.hasAngularVelocity = !1));
      o !== null && (i = t.getPose(e.targetRaySpace, n), i === null && r !== null && (i = r), i !== null && (o.matrix.fromArray(i.transform.matrix), o.matrix.decompose(o.position, o.rotation, o.scale), o.matrixWorldNeedsUpdate = !0, i.linearVelocity ? (o.hasLinearVelocity = !0, o.linearVelocity.copy(i.linearVelocity)) : o.hasLinearVelocity = !1, i.angularVelocity ? (o.hasAngularVelocity = !0, o.angularVelocity.copy(i.angularVelocity)) : o.hasAngularVelocity = !1, this.dispatchEvent(kc)));
    }
    return o !== null && (o.visible = i !== null), a !== null && (a.visible = r !== null), c !== null && (c.visible = s !== null), this;
  }
  _getHandJoint(e, t) {
    if (e.joints[t.jointName] === void 0) {
      const n = new qn();
      n.matrixAutoUpdate = !1, n.visible = !1, e.joints[t.jointName] = n, e.add(n);
    }
    return e.joints[t.jointName];
  }
}, Gc = class extends Et {
  constructor() {
    super(), this.isScene = !0, this.type = "Scene", this.background = null, this.environment = null, this.fog = null, this.backgroundBlurriness = 0, this.backgroundIntensity = 1, this.backgroundRotation = new un(), this.environmentIntensity = 1, this.environmentRotation = new un(), this.overrideMaterial = null, typeof __THREE_DEVTOOLS__ < "u" && __THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe", { detail: this }));
  }
  copy(e, t) {
    return super.copy(e, t), e.background !== null && (this.background = e.background.clone()), e.environment !== null && (this.environment = e.environment.clone()), e.fog !== null && (this.fog = e.fog.clone()), this.backgroundBlurriness = e.backgroundBlurriness, this.backgroundIntensity = e.backgroundIntensity, this.backgroundRotation.copy(e.backgroundRotation), this.environmentIntensity = e.environmentIntensity, this.environmentRotation.copy(e.environmentRotation), e.overrideMaterial !== null && (this.overrideMaterial = e.overrideMaterial.clone()), this.matrixAutoUpdate = e.matrixAutoUpdate, this;
  }
  toJSON(e) {
    const t = super.toJSON(e);
    return this.fog !== null && (t.object.fog = this.fog.toJSON()), this.backgroundBlurriness > 0 && (t.object.backgroundBlurriness = this.backgroundBlurriness), this.backgroundIntensity !== 1 && (t.object.backgroundIntensity = this.backgroundIntensity), t.object.backgroundRotation = this.backgroundRotation.toArray(), this.environmentIntensity !== 1 && (t.object.environmentIntensity = this.environmentIntensity), t.object.environmentRotation = this.environmentRotation.toArray(), t;
  }
}, da = class extends kt {
  constructor(e = null, t = 1, n = 1, i, r, s, o, a, c = Ht, l = Ht, h, u) {
    super(null, s, o, a, c, l, i, r, h, u), this.isDataTexture = !0, this.image = {
      data: e,
      width: t,
      height: n
    }, this.generateMipmaps = !1, this.flipY = !1, this.unpackAlignment = 1;
  }
}, no = class extends Vt {
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
}, Hn = /* @__PURE__ */ new nt(), io = /* @__PURE__ */ new nt(), Ki = [], ro = /* @__PURE__ */ new en(), Wc = /* @__PURE__ */ new nt(), ui = /* @__PURE__ */ new Rt(), di = /* @__PURE__ */ new ni(), us = class extends Rt {
  constructor(e, t, n) {
    super(e, t), this.isInstancedMesh = !0, this.instanceMatrix = new no(new Float32Array(n * 16), 16), this.instanceColor = null, this.morphTexture = null, this.count = n, this.boundingBox = null, this.boundingSphere = null;
    for (let i = 0; i < n; i++) this.setMatrixAt(i, Wc);
  }
  computeBoundingBox() {
    const e = this.geometry, t = this.count;
    this.boundingBox === null && (this.boundingBox = new en()), e.boundingBox === null && e.computeBoundingBox(), this.boundingBox.makeEmpty();
    for (let n = 0; n < t; n++)
      this.getMatrixAt(n, Hn), ro.copy(e.boundingBox).applyMatrix4(Hn), this.boundingBox.union(ro);
  }
  computeBoundingSphere() {
    const e = this.geometry, t = this.count;
    this.boundingSphere === null && (this.boundingSphere = new ni()), e.boundingSphere === null && e.computeBoundingSphere(), this.boundingSphere.makeEmpty();
    for (let n = 0; n < t; n++)
      this.getMatrixAt(n, Hn), di.copy(e.boundingSphere).applyMatrix4(Hn), this.boundingSphere.union(di);
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
    const n = t.morphTargetInfluences, i = this.morphTexture.source.data.data, r = e * (n.length + 1) + 1;
    for (let s = 0; s < n.length; s++) n[s] = i[r + s];
  }
  raycast(e, t) {
    const n = this.matrixWorld, i = this.count;
    if (ui.geometry = this.geometry, ui.material = this.material, ui.material !== void 0 && (this.boundingSphere === null && this.computeBoundingSphere(), di.copy(this.boundingSphere), di.applyMatrix4(n), e.ray.intersectsSphere(di) !== !1))
      for (let r = 0; r < i; r++) {
        this.getMatrixAt(r, Hn), io.multiplyMatrices(n, Hn), ui.matrixWorld = io, ui.raycast(e, Ki);
        for (let s = 0, o = Ki.length; s < o; s++) {
          const a = Ki[s];
          a.instanceId = r, a.object = this, t.push(a);
        }
        Ki.length = 0;
      }
  }
  setColorAt(e, t) {
    this.instanceColor === null && (this.instanceColor = new no(new Float32Array(this.instanceMatrix.count * 3).fill(1), 3)), t.toArray(this.instanceColor.array, e * 3);
  }
  setMatrixAt(e, t) {
    t.toArray(this.instanceMatrix.array, e * 16);
  }
  setMorphAt(e, t) {
    const n = t.morphTargetInfluences, i = n.length + 1;
    this.morphTexture === null && (this.morphTexture = new da(new Float32Array(i * this.count), i, this.count, Zo, xr));
    const r = this.morphTexture.source.data.data;
    let s = 0;
    for (let c = 0; c < n.length; c++) s += n[c];
    const o = this.geometry.morphTargetsRelative ? 1 : 1 - s, a = i * e;
    r[a] = o, r.set(n, a + 1);
  }
  updateMorphTargets() {
  }
  dispose() {
    this.dispatchEvent({ type: "dispose" }), this.morphTexture !== null && (this.morphTexture.dispose(), this.morphTexture = null);
  }
}, qr = /* @__PURE__ */ new D(), Xc = /* @__PURE__ */ new D(), Yc = /* @__PURE__ */ new Xe(), ln = class {
  constructor(e = new D(1, 0, 0), t = 0) {
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
    const i = qr.subVectors(n, t).cross(Xc.subVectors(e, t)).normalize();
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
    const n = e.delta(qr), i = this.normal.dot(n);
    if (i === 0)
      return this.distanceToPoint(e.start) === 0 ? t.copy(e.start) : null;
    const r = -(e.start.dot(this.normal) + this.constant) / i;
    return r < 0 || r > 1 ? null : t.copy(e.start).addScaledVector(n, r);
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
    const n = t || Yc.getNormalMatrix(e), i = this.coplanarPoint(qr).applyMatrix4(e), r = this.normal.applyMatrix3(n).normalize();
    return this.constant = -i.dot(r), this;
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
}, vn = /* @__PURE__ */ new ni(), qc = /* @__PURE__ */ new se(0.5, 0.5), ji = /* @__PURE__ */ new D(), Ss = class {
  constructor(e = new ln(), t = new ln(), n = new ln(), i = new ln(), r = new ln(), s = new ln()) {
    this.planes = [
      e,
      t,
      n,
      i,
      r,
      s
    ];
  }
  set(e, t, n, i, r, s) {
    const o = this.planes;
    return o[0].copy(e), o[1].copy(t), o[2].copy(n), o[3].copy(i), o[4].copy(r), o[5].copy(s), this;
  }
  copy(e) {
    const t = this.planes;
    for (let n = 0; n < 6; n++) t[n].copy(e.planes[n]);
    return this;
  }
  setFromProjectionMatrix(e, t = Qn, n = !1) {
    const i = this.planes, r = e.elements, s = r[0], o = r[1], a = r[2], c = r[3], l = r[4], h = r[5], u = r[6], f = r[7], p = r[8], g = r[9], _ = r[10], m = r[11], d = r[12], T = r[13], v = r[14], S = r[15];
    if (i[0].setComponents(c - s, f - l, m - p, S - d).normalize(), i[1].setComponents(c + s, f + l, m + p, S + d).normalize(), i[2].setComponents(c + o, f + h, m + g, S + T).normalize(), i[3].setComponents(c - o, f - h, m - g, S - T).normalize(), n)
      i[4].setComponents(a, u, _, v).normalize(), i[5].setComponents(c - a, f - u, m - _, S - v).normalize();
    else if (i[4].setComponents(c - a, f - u, m - _, S - v).normalize(), t === 2e3) i[5].setComponents(c + a, f + u, m + _, S + v).normalize();
    else if (t === 2001) i[5].setComponents(a, u, _, v).normalize();
    else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: " + t);
    return this;
  }
  intersectsObject(e) {
    if (e.boundingSphere !== void 0)
      e.boundingSphere === null && e.computeBoundingSphere(), vn.copy(e.boundingSphere).applyMatrix4(e.matrixWorld);
    else {
      const t = e.geometry;
      t.boundingSphere === null && t.computeBoundingSphere(), vn.copy(t.boundingSphere).applyMatrix4(e.matrixWorld);
    }
    return this.intersectsSphere(vn);
  }
  intersectsSprite(e) {
    return vn.center.set(0, 0, 0), vn.radius = 0.7071067811865476 + qc.distanceTo(e.center), vn.applyMatrix4(e.matrixWorld), this.intersectsSphere(vn);
  }
  intersectsSphere(e) {
    const t = this.planes, n = e.center, i = -e.radius;
    for (let r = 0; r < 6; r++) if (t[r].distanceToPoint(n) < i) return !1;
    return !0;
  }
  intersectsBox(e) {
    const t = this.planes;
    for (let n = 0; n < 6; n++) {
      const i = t[n];
      if (ji.x = i.normal.x > 0 ? e.max.x : e.min.x, ji.y = i.normal.y > 0 ? e.max.y : e.min.y, ji.z = i.normal.z > 0 ? e.max.z : e.min.z, i.distanceToPoint(ji) < 0) return !1;
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
}, fa = class extends ii {
  constructor(e) {
    super(), this.isLineBasicMaterial = !0, this.type = "LineBasicMaterial", this.color = new qe(16777215), this.map = null, this.linewidth = 1, this.linecap = "round", this.linejoin = "round", this.fog = !0, this.setValues(e);
  }
  copy(e) {
    return super.copy(e), this.color.copy(e.color), this.map = e.map, this.linewidth = e.linewidth, this.linecap = e.linecap, this.linejoin = e.linejoin, this.fog = e.fog, this;
  }
}, _r = /* @__PURE__ */ new D(), gr = /* @__PURE__ */ new D(), so = /* @__PURE__ */ new nt(), fi = /* @__PURE__ */ new Ms(), Ji = /* @__PURE__ */ new ni(), Zr = /* @__PURE__ */ new D(), oo = /* @__PURE__ */ new D(), Zc = class extends Et {
  constructor(e = new It(), t = new fa()) {
    super(), this.isLine = !0, this.type = "Line", this.geometry = e, this.material = t, this.morphTargetDictionary = void 0, this.morphTargetInfluences = void 0, this.updateMorphTargets();
  }
  copy(e, t) {
    return super.copy(e, t), this.material = Array.isArray(e.material) ? e.material.slice() : e.material, this.geometry = e.geometry, this;
  }
  computeLineDistances() {
    const e = this.geometry;
    if (e.index === null) {
      const t = e.attributes.position, n = [0];
      for (let i = 1, r = t.count; i < r; i++)
        _r.fromBufferAttribute(t, i - 1), gr.fromBufferAttribute(t, i), n[i] = n[i - 1], n[i] += _r.distanceTo(gr);
      e.setAttribute("lineDistance", new ut(n, 1));
    } else console.warn("THREE.Line.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");
    return this;
  }
  raycast(e, t) {
    const n = this.geometry, i = this.matrixWorld, r = e.params.Line.threshold, s = n.drawRange;
    if (n.boundingSphere === null && n.computeBoundingSphere(), Ji.copy(n.boundingSphere), Ji.applyMatrix4(i), Ji.radius += r, e.ray.intersectsSphere(Ji) === !1) return;
    so.copy(i).invert(), fi.copy(e.ray).applyMatrix4(so);
    const o = r / ((this.scale.x + this.scale.y + this.scale.z) / 3), a = o * o, c = this.isLineSegments ? 2 : 1, l = n.index, h = n.attributes.position;
    if (l !== null) {
      const u = Math.max(0, s.start), f = Math.min(l.count, s.start + s.count);
      for (let p = u, g = f - 1; p < g; p += c) {
        const _ = l.getX(p), m = l.getX(p + 1), d = $i(this, e, fi, a, _, m, p);
        d && t.push(d);
      }
      if (this.isLineLoop) {
        const p = l.getX(f - 1), g = l.getX(u), _ = $i(this, e, fi, a, p, g, f - 1);
        _ && t.push(_);
      }
    } else {
      const u = Math.max(0, s.start), f = Math.min(h.count, s.start + s.count);
      for (let p = u, g = f - 1; p < g; p += c) {
        const _ = $i(this, e, fi, a, p, p + 1, p);
        _ && t.push(_);
      }
      if (this.isLineLoop) {
        const p = $i(this, e, fi, a, f - 1, u, f - 1);
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
        for (let i = 0, r = n.length; i < r; i++) {
          const s = n[i].name || String(i);
          this.morphTargetInfluences.push(0), this.morphTargetDictionary[s] = i;
        }
      }
    }
  }
};
function $i(e, t, n, i, r, s, o) {
  const a = e.geometry.attributes.position;
  if (_r.fromBufferAttribute(a, r), gr.fromBufferAttribute(a, s), n.distanceSqToSegment(_r, gr, Zr, oo) > i) return;
  Zr.applyMatrix4(e.matrixWorld);
  const c = t.ray.origin.distanceTo(Zr);
  if (!(c < t.near || c > t.far))
    return {
      distance: c,
      point: oo.clone().applyMatrix4(e.matrixWorld),
      index: o,
      face: null,
      faceIndex: null,
      barycoord: null,
      object: e
    };
}
var pa = class extends kt {
  constructor(e, t, n = gs, i, r, s, o = Ht, a = Ht, c, l = Yo, h = 1) {
    if (l !== 1026 && l !== 1027) throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");
    super({
      width: e,
      height: t,
      depth: h
    }, i, r, s, o, a, l, n, c), this.isDepthTexture = !0, this.flipY = !1, this.generateMipmaps = !1, this.compareFunction = null;
  }
  copy(e) {
    return super.copy(e), this.source = new ys(Object.assign({}, e.image)), this.compareFunction = e.compareFunction, this;
  }
  toJSON(e) {
    const t = super.toJSON(e);
    return this.compareFunction !== null && (t.compareFunction = this.compareFunction), t;
  }
}, ma = class extends kt {
  constructor(e = null) {
    super(), this.sourceTexture = e, this.isExternalTexture = !0;
  }
  copy(e) {
    return super.copy(e), this.sourceTexture = e.sourceTexture, this;
  }
}, Kc = class _a extends It {
  constructor(t = 1, n = 1, i = 1, r = 32, s = 1, o = !1, a = 0, c = Math.PI * 2) {
    super(), this.type = "CylinderGeometry", this.parameters = {
      radiusTop: t,
      radiusBottom: n,
      height: i,
      radialSegments: r,
      heightSegments: s,
      openEnded: o,
      thetaStart: a,
      thetaLength: c
    };
    const l = this;
    r = Math.floor(r), s = Math.floor(s);
    const h = [], u = [], f = [], p = [];
    let g = 0;
    const _ = [], m = i / 2;
    let d = 0;
    T(), o === !1 && (t > 0 && v(!0), n > 0 && v(!1)), this.setIndex(h), this.setAttribute("position", new ut(u, 3)), this.setAttribute("normal", new ut(f, 3)), this.setAttribute("uv", new ut(p, 2));
    function T() {
      const S = new D(), b = new D();
      let w = 0;
      const C = (n - t) / i;
      for (let P = 0; P <= s; P++) {
        const E = [], y = P / s, R = y * (n - t) + t;
        for (let z = 0; z <= r; z++) {
          const k = z / r, B = k * c + a, Z = Math.sin(B), W = Math.cos(B);
          b.x = R * Z, b.y = -y * i + m, b.z = R * W, u.push(b.x, b.y, b.z), S.set(Z, C, W).normalize(), f.push(S.x, S.y, S.z), p.push(k, 1 - y), E.push(g++);
        }
        _.push(E);
      }
      for (let P = 0; P < r; P++) for (let E = 0; E < s; E++) {
        const y = _[E][P], R = _[E + 1][P], z = _[E + 1][P + 1], k = _[E][P + 1];
        (t > 0 || E !== 0) && (h.push(y, R, k), w += 3), (n > 0 || E !== s - 1) && (h.push(R, z, k), w += 3);
      }
      l.addGroup(d, w, 0), d += w;
    }
    function v(S) {
      const b = g, w = new se(), C = new D();
      let P = 0;
      const E = S === !0 ? t : n, y = S === !0 ? 1 : -1;
      for (let z = 1; z <= r; z++)
        u.push(0, m * y, 0), f.push(0, y, 0), p.push(0.5, 0.5), g++;
      const R = g;
      for (let z = 0; z <= r; z++) {
        const k = z / r * c + a, B = Math.cos(k), Z = Math.sin(k);
        C.x = E * Z, C.y = m * y, C.z = E * B, u.push(C.x, C.y, C.z), f.push(0, y, 0), w.x = B * 0.5 + 0.5, w.y = Z * 0.5 * y + 0.5, p.push(w.x, w.y), g++;
      }
      for (let z = 0; z < r; z++) {
        const k = b + z, B = R + z;
        S === !0 ? h.push(B, B + 1, k) : h.push(B + 1, B, k), P += 3;
      }
      l.addGroup(d, P, S === !0 ? 1 : 2), d += P;
    }
  }
  copy(t) {
    return super.copy(t), this.parameters = Object.assign({}, t.parameters), this;
  }
  static fromJSON(t) {
    return new _a(t.radiusTop, t.radiusBottom, t.height, t.radialSegments, t.heightSegments, t.openEnded, t.thetaStart, t.thetaLength);
  }
}, jc = class ga extends It {
  constructor(t = [], n = [], i = 1, r = 0) {
    super(), this.type = "PolyhedronGeometry", this.parameters = {
      vertices: t,
      indices: n,
      radius: i,
      detail: r
    };
    const s = [], o = [];
    a(r), l(i), h(), this.setAttribute("position", new ut(s, 3)), this.setAttribute("normal", new ut(s.slice(), 3)), this.setAttribute("uv", new ut(o, 2)), r === 0 ? this.computeVertexNormals() : this.normalizeNormals();
    function a(T) {
      const v = new D(), S = new D(), b = new D();
      for (let w = 0; w < n.length; w += 3)
        p(n[w + 0], v), p(n[w + 1], S), p(n[w + 2], b), c(v, S, b, T);
    }
    function c(T, v, S, b) {
      const w = b + 1, C = [];
      for (let P = 0; P <= w; P++) {
        C[P] = [];
        const E = T.clone().lerp(S, P / w), y = v.clone().lerp(S, P / w), R = w - P;
        for (let z = 0; z <= R; z++) z === 0 && P === w ? C[P][z] = E : C[P][z] = E.clone().lerp(y, z / R);
      }
      for (let P = 0; P < w; P++) for (let E = 0; E < 2 * (w - P) - 1; E++) {
        const y = Math.floor(E / 2);
        E % 2 === 0 ? (f(C[P][y + 1]), f(C[P + 1][y]), f(C[P][y])) : (f(C[P][y + 1]), f(C[P + 1][y + 1]), f(C[P + 1][y]));
      }
    }
    function l(T) {
      const v = new D();
      for (let S = 0; S < s.length; S += 3)
        v.x = s[S + 0], v.y = s[S + 1], v.z = s[S + 2], v.normalize().multiplyScalar(T), s[S + 0] = v.x, s[S + 1] = v.y, s[S + 2] = v.z;
    }
    function h() {
      const T = new D();
      for (let v = 0; v < s.length; v += 3) {
        T.x = s[v + 0], T.y = s[v + 1], T.z = s[v + 2];
        const S = m(T) / 2 / Math.PI + 0.5, b = d(T) / Math.PI + 0.5;
        o.push(S, 1 - b);
      }
      g(), u();
    }
    function u() {
      for (let T = 0; T < o.length; T += 6) {
        const v = o[T + 0], S = o[T + 2], b = o[T + 4];
        Math.max(v, S, b) > 0.9 && Math.min(v, S, b) < 0.1 && (v < 0.2 && (o[T + 0] += 1), S < 0.2 && (o[T + 2] += 1), b < 0.2 && (o[T + 4] += 1));
      }
    }
    function f(T) {
      s.push(T.x, T.y, T.z);
    }
    function p(T, v) {
      const S = T * 3;
      v.x = t[S + 0], v.y = t[S + 1], v.z = t[S + 2];
    }
    function g() {
      const T = new D(), v = new D(), S = new D(), b = new D(), w = new se(), C = new se(), P = new se();
      for (let E = 0, y = 0; E < s.length; E += 9, y += 6) {
        T.set(s[E + 0], s[E + 1], s[E + 2]), v.set(s[E + 3], s[E + 4], s[E + 5]), S.set(s[E + 6], s[E + 7], s[E + 8]), w.set(o[y + 0], o[y + 1]), C.set(o[y + 2], o[y + 3]), P.set(o[y + 4], o[y + 5]), b.copy(T).add(v).add(S).divideScalar(3);
        const R = m(b);
        _(w, y + 0, T, R), _(C, y + 2, v, R), _(P, y + 4, S, R);
      }
    }
    function _(T, v, S, b) {
      b < 0 && T.x === 1 && (o[v] = T.x - 1), S.x === 0 && S.z === 0 && (o[v] = b / 2 / Math.PI + 0.5);
    }
    function m(T) {
      return Math.atan2(T.z, -T.x);
    }
    function d(T) {
      return Math.atan2(-T.y, Math.sqrt(T.x * T.x + T.z * T.z));
    }
  }
  copy(t) {
    return super.copy(t), this.parameters = Object.assign({}, t.parameters), this;
  }
  static fromJSON(t) {
    return new ga(t.vertices, t.indices, t.radius, t.details);
  }
}, Jc = class va extends jc {
  constructor(t = 1, n = 0) {
    const i = (1 + Math.sqrt(5)) / 2, r = 1 / i, s = [
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
      -r,
      -i,
      0,
      -r,
      i,
      0,
      r,
      -i,
      0,
      r,
      i,
      -r,
      -i,
      0,
      -r,
      i,
      0,
      r,
      -i,
      0,
      r,
      i,
      0,
      -i,
      0,
      -r,
      i,
      0,
      -r,
      -i,
      0,
      r,
      i,
      0,
      r
    ];
    super(s, [
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
    return new va(t.radius, t.detail);
  }
}, Yt = class {
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
    let n, i = this.getPoint(0), r = 0;
    t.push(0);
    for (let s = 1; s <= e; s++)
      n = this.getPoint(s / e), r += n.distanceTo(i), t.push(r), i = n;
    return this.cacheArcLengths = t, t;
  }
  updateArcLengths() {
    this.needsUpdate = !0, this.getLengths();
  }
  getUtoTmapping(e, t = null) {
    const n = this.getLengths();
    let i = 0;
    const r = n.length;
    let s;
    t ? s = t : s = e * n[r - 1];
    let o = 0, a = r - 1, c;
    for (; o <= a; )
      if (i = Math.floor(o + (a - o) / 2), c = n[i] - s, c < 0) o = i + 1;
      else if (c > 0) a = i - 1;
      else {
        a = i;
        break;
      }
    if (i = a, n[i] === s) return i / (r - 1);
    const l = n[i], h = n[i + 1] - l, u = (s - l) / h;
    return (i + u) / (r - 1);
  }
  getTangent(e, t) {
    let i = e - 1e-4, r = e + 1e-4;
    i < 0 && (i = 0), r > 1 && (r = 1);
    const s = this.getPoint(i), o = this.getPoint(r), a = t || (s.isVector2 ? new se() : new D());
    return a.copy(o).sub(s).normalize(), a;
  }
  getTangentAt(e, t) {
    const n = this.getUtoTmapping(e);
    return this.getTangent(n, t);
  }
  computeFrenetFrames(e, t = !1) {
    const n = new D(), i = [], r = [], s = [], o = new D(), a = new nt();
    for (let f = 0; f <= e; f++) {
      const p = f / e;
      i[f] = this.getTangentAt(p, new D());
    }
    r[0] = new D(), s[0] = new D();
    let c = Number.MAX_VALUE;
    const l = Math.abs(i[0].x), h = Math.abs(i[0].y), u = Math.abs(i[0].z);
    l <= c && (c = l, n.set(1, 0, 0)), h <= c && (c = h, n.set(0, 1, 0)), u <= c && n.set(0, 0, 1), o.crossVectors(i[0], n).normalize(), r[0].crossVectors(i[0], o), s[0].crossVectors(i[0], r[0]);
    for (let f = 1; f <= e; f++) {
      if (r[f] = r[f - 1].clone(), s[f] = s[f - 1].clone(), o.crossVectors(i[f - 1], i[f]), o.length() > Number.EPSILON) {
        o.normalize();
        const p = Math.acos(He(i[f - 1].dot(i[f]), -1, 1));
        r[f].applyMatrix4(a.makeRotationAxis(o, p));
      }
      s[f].crossVectors(i[f], r[f]);
    }
    if (t === !0) {
      let f = Math.acos(He(r[0].dot(r[e]), -1, 1));
      f /= e, i[0].dot(o.crossVectors(r[0], r[e])) > 0 && (f = -f);
      for (let p = 1; p <= e; p++)
        r[p].applyMatrix4(a.makeRotationAxis(i[p], f * p)), s[p].crossVectors(i[p], r[p]);
    }
    return {
      tangents: i,
      normals: r,
      binormals: s
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
}, Es = class extends Yt {
  constructor(e = 0, t = 0, n = 1, i = 1, r = 0, s = Math.PI * 2, o = !1, a = 0) {
    super(), this.isEllipseCurve = !0, this.type = "EllipseCurve", this.aX = e, this.aY = t, this.xRadius = n, this.yRadius = i, this.aStartAngle = r, this.aEndAngle = s, this.aClockwise = o, this.aRotation = a;
  }
  getPoint(e, t = new se()) {
    const n = t, i = Math.PI * 2;
    let r = this.aEndAngle - this.aStartAngle;
    const s = Math.abs(r) < Number.EPSILON;
    for (; r < 0; ) r += i;
    for (; r > i; ) r -= i;
    r < Number.EPSILON && (s ? r = 0 : r = i), this.aClockwise === !0 && !s && (r === i ? r = -i : r = r - i);
    const o = this.aStartAngle + e * r;
    let a = this.aX + this.xRadius * Math.cos(o), c = this.aY + this.yRadius * Math.sin(o);
    if (this.aRotation !== 0) {
      const l = Math.cos(this.aRotation), h = Math.sin(this.aRotation), u = a - this.aX, f = c - this.aY;
      a = u * l - f * h + this.aX, c = u * h + f * l + this.aY;
    }
    return n.set(a, c);
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
}, $c = class extends Es {
  constructor(e, t, n, i, r, s) {
    super(e, t, n, n, i, r, s), this.isArcCurve = !0, this.type = "ArcCurve";
  }
};
function Ts() {
  let e = 0, t = 0, n = 0, i = 0;
  function r(s, o, a, c) {
    e = s, t = a, n = -3 * s + 3 * o - 2 * a - c, i = 2 * s - 2 * o + a + c;
  }
  return {
    initCatmullRom: function(s, o, a, c, l) {
      r(o, a, l * (a - s), l * (c - o));
    },
    initNonuniformCatmullRom: function(s, o, a, c, l, h, u) {
      let f = (o - s) / l - (a - s) / (l + h) + (a - o) / h, p = (a - o) / h - (c - o) / (h + u) + (c - a) / u;
      f *= h, p *= h, r(o, a, f, p);
    },
    calc: function(s) {
      const o = s * s, a = o * s;
      return e + t * s + n * o + i * a;
    }
  };
}
var Qi = /* @__PURE__ */ new D(), Kr = /* @__PURE__ */ new Ts(), jr = /* @__PURE__ */ new Ts(), Jr = /* @__PURE__ */ new Ts(), Qc = class extends Yt {
  constructor(e = [], t = !1, n = "centripetal", i = 0.5) {
    super(), this.isCatmullRomCurve3 = !0, this.type = "CatmullRomCurve3", this.points = e, this.closed = t, this.curveType = n, this.tension = i;
  }
  getPoint(e, t = new D()) {
    const n = t, i = this.points, r = i.length, s = (r - (this.closed ? 0 : 1)) * e;
    let o = Math.floor(s), a = s - o;
    this.closed ? o += o > 0 ? 0 : (Math.floor(Math.abs(o) / r) + 1) * r : a === 0 && o === r - 1 && (o = r - 2, a = 1);
    let c, l;
    this.closed || o > 0 ? c = i[(o - 1) % r] : (Qi.subVectors(i[0], i[1]).add(i[0]), c = Qi);
    const h = i[o % r], u = i[(o + 1) % r];
    if (this.closed || o + 2 < r ? l = i[(o + 2) % r] : (Qi.subVectors(i[r - 1], i[r - 2]).add(i[r - 1]), l = Qi), this.curveType === "centripetal" || this.curveType === "chordal") {
      const f = this.curveType === "chordal" ? 0.5 : 0.25;
      let p = Math.pow(c.distanceToSquared(h), f), g = Math.pow(h.distanceToSquared(u), f), _ = Math.pow(u.distanceToSquared(l), f);
      g < 1e-4 && (g = 1), p < 1e-4 && (p = g), _ < 1e-4 && (_ = g), Kr.initNonuniformCatmullRom(c.x, h.x, u.x, l.x, p, g, _), jr.initNonuniformCatmullRom(c.y, h.y, u.y, l.y, p, g, _), Jr.initNonuniformCatmullRom(c.z, h.z, u.z, l.z, p, g, _);
    } else this.curveType === "catmullrom" && (Kr.initCatmullRom(c.x, h.x, u.x, l.x, this.tension), jr.initCatmullRom(c.y, h.y, u.y, l.y, this.tension), Jr.initCatmullRom(c.z, h.z, u.z, l.z, this.tension));
    return n.set(Kr.calc(a), jr.calc(a), Jr.calc(a)), n;
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
      this.points.push(new D().fromArray(i));
    }
    return this.closed = e.closed, this.curveType = e.curveType, this.tension = e.tension, this;
  }
};
function ao(e, t, n, i, r) {
  const s = (i - t) * 0.5, o = (r - n) * 0.5, a = e * e, c = e * a;
  return (2 * n - 2 * i + s + o) * c + (-3 * n + 3 * i - 2 * s - o) * a + s * e + n;
}
function eh(e, t) {
  const n = 1 - e;
  return n * n * t;
}
function th(e, t) {
  return 2 * (1 - e) * e * t;
}
function nh(e, t) {
  return e * e * t;
}
function xi(e, t, n, i) {
  return eh(e, t) + th(e, n) + nh(e, i);
}
function ih(e, t) {
  const n = 1 - e;
  return n * n * n * t;
}
function rh(e, t) {
  const n = 1 - e;
  return 3 * n * n * e * t;
}
function sh(e, t) {
  return 3 * (1 - e) * e * e * t;
}
function oh(e, t) {
  return e * e * e * t;
}
function yi(e, t, n, i, r) {
  return ih(e, t) + rh(e, n) + sh(e, i) + oh(e, r);
}
var xa = class extends Yt {
  constructor(e = new se(), t = new se(), n = new se(), i = new se()) {
    super(), this.isCubicBezierCurve = !0, this.type = "CubicBezierCurve", this.v0 = e, this.v1 = t, this.v2 = n, this.v3 = i;
  }
  getPoint(e, t = new se()) {
    const n = t, i = this.v0, r = this.v1, s = this.v2, o = this.v3;
    return n.set(yi(e, i.x, r.x, s.x, o.x), yi(e, i.y, r.y, s.y, o.y)), n;
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
}, ah = class extends Yt {
  constructor(e = new D(), t = new D(), n = new D(), i = new D()) {
    super(), this.isCubicBezierCurve3 = !0, this.type = "CubicBezierCurve3", this.v0 = e, this.v1 = t, this.v2 = n, this.v3 = i;
  }
  getPoint(e, t = new D()) {
    const n = t, i = this.v0, r = this.v1, s = this.v2, o = this.v3;
    return n.set(yi(e, i.x, r.x, s.x, o.x), yi(e, i.y, r.y, s.y, o.y), yi(e, i.z, r.z, s.z, o.z)), n;
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
}, ya = class extends Yt {
  constructor(e = new se(), t = new se()) {
    super(), this.isLineCurve = !0, this.type = "LineCurve", this.v1 = e, this.v2 = t;
  }
  getPoint(e, t = new se()) {
    const n = t;
    return e === 1 ? n.copy(this.v2) : (n.copy(this.v2).sub(this.v1), n.multiplyScalar(e).add(this.v1)), n;
  }
  getPointAt(e, t) {
    return this.getPoint(e, t);
  }
  getTangent(e, t = new se()) {
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
}, lh = class extends Yt {
  constructor(e = new D(), t = new D()) {
    super(), this.isLineCurve3 = !0, this.type = "LineCurve3", this.v1 = e, this.v2 = t;
  }
  getPoint(e, t = new D()) {
    const n = t;
    return e === 1 ? n.copy(this.v2) : (n.copy(this.v2).sub(this.v1), n.multiplyScalar(e).add(this.v1)), n;
  }
  getPointAt(e, t) {
    return this.getPoint(e, t);
  }
  getTangent(e, t = new D()) {
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
}, Ma = class extends Yt {
  constructor(e = new se(), t = new se(), n = new se()) {
    super(), this.isQuadraticBezierCurve = !0, this.type = "QuadraticBezierCurve", this.v0 = e, this.v1 = t, this.v2 = n;
  }
  getPoint(e, t = new se()) {
    const n = t, i = this.v0, r = this.v1, s = this.v2;
    return n.set(xi(e, i.x, r.x, s.x), xi(e, i.y, r.y, s.y)), n;
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
}, ch = class extends Yt {
  constructor(e = new D(), t = new D(), n = new D()) {
    super(), this.isQuadraticBezierCurve3 = !0, this.type = "QuadraticBezierCurve3", this.v0 = e, this.v1 = t, this.v2 = n;
  }
  getPoint(e, t = new D()) {
    const n = t, i = this.v0, r = this.v1, s = this.v2;
    return n.set(xi(e, i.x, r.x, s.x), xi(e, i.y, r.y, s.y), xi(e, i.z, r.z, s.z)), n;
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
}, Sa = class extends Yt {
  constructor(e = []) {
    super(), this.isSplineCurve = !0, this.type = "SplineCurve", this.points = e;
  }
  getPoint(e, t = new se()) {
    const n = t, i = this.points, r = (i.length - 1) * e, s = Math.floor(r), o = r - s, a = i[s === 0 ? s : s - 1], c = i[s], l = i[s > i.length - 2 ? i.length - 1 : s + 1], h = i[s > i.length - 3 ? i.length - 1 : s + 2];
    return n.set(ao(o, a.x, c.x, l.x, h.x), ao(o, a.y, c.y, l.y, h.y)), n;
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
      this.points.push(new se().fromArray(i));
    }
    return this;
  }
}, ds = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  ArcCurve: $c,
  CatmullRomCurve3: Qc,
  CubicBezierCurve: xa,
  CubicBezierCurve3: ah,
  EllipseCurve: Es,
  LineCurve: ya,
  LineCurve3: lh,
  QuadraticBezierCurve: Ma,
  QuadraticBezierCurve3: ch,
  SplineCurve: Sa
}), hh = class extends Yt {
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
      this.curves.push(new ds[n](t, e));
    }
    return this;
  }
  getPoint(e, t) {
    const n = e * this.getLength(), i = this.getCurveLengths();
    let r = 0;
    for (; r < i.length; ) {
      if (i[r] >= n) {
        const s = i[r] - n, o = this.curves[r], a = o.getLength(), c = a === 0 ? 0 : 1 - s / a;
        return o.getPointAt(c, t);
      }
      r++;
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
    for (let i = 0, r = this.curves; i < r.length; i++) {
      const s = r[i], o = s.isEllipseCurve ? e * 2 : s.isLineCurve || s.isLineCurve3 ? 1 : s.isSplineCurve ? e * s.points.length : e, a = s.getPoints(o);
      for (let c = 0; c < a.length; c++) {
        const l = a[c];
        n && n.equals(l) || (t.push(l), n = l);
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
      this.curves.push(new ds[i.type]().fromJSON(i));
    }
    return this;
  }
}, lo = class extends hh {
  constructor(e) {
    super(), this.type = "Path", this.currentPoint = new se(), e && this.setFromPoints(e);
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
    const n = new ya(this.currentPoint.clone(), new se(e, t));
    return this.curves.push(n), this.currentPoint.set(e, t), this;
  }
  quadraticCurveTo(e, t, n, i) {
    const r = new Ma(this.currentPoint.clone(), new se(e, t), new se(n, i));
    return this.curves.push(r), this.currentPoint.set(n, i), this;
  }
  bezierCurveTo(e, t, n, i, r, s) {
    const o = new xa(this.currentPoint.clone(), new se(e, t), new se(n, i), new se(r, s));
    return this.curves.push(o), this.currentPoint.set(r, s), this;
  }
  splineThru(e) {
    const t = new Sa([this.currentPoint.clone()].concat(e));
    return this.curves.push(t), this.currentPoint.copy(e[e.length - 1]), this;
  }
  arc(e, t, n, i, r, s) {
    const o = this.currentPoint.x, a = this.currentPoint.y;
    return this.absarc(e + o, t + a, n, i, r, s), this;
  }
  absarc(e, t, n, i, r, s) {
    return this.absellipse(e, t, n, n, i, r, s), this;
  }
  ellipse(e, t, n, i, r, s, o, a) {
    const c = this.currentPoint.x, l = this.currentPoint.y;
    return this.absellipse(e + c, t + l, n, i, r, s, o, a), this;
  }
  absellipse(e, t, n, i, r, s, o, a) {
    const c = new Es(e, t, n, i, r, s, o, a);
    if (this.curves.length > 0) {
      const h = c.getPoint(0);
      h.equals(this.currentPoint) || this.lineTo(h.x, h.y);
    }
    this.curves.push(c);
    const l = c.getPoint(1);
    return this.currentPoint.copy(l), this;
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
}, Ea = class extends lo {
  constructor(e) {
    super(e), this.uuid = wn(), this.type = "Shape", this.holes = [];
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
      this.holes.push(new lo().fromJSON(i));
    }
    return this;
  }
};
function uh(e, t, n = 2) {
  const i = t && t.length, r = i ? t[0] * n : e.length;
  let s = Ta(e, 0, r, n, !0);
  const o = [];
  if (!s || s.next === s.prev) return o;
  let a, c, l;
  if (i && (s = _h(e, t, s, n)), e.length > 80 * n) {
    a = 1 / 0, c = 1 / 0;
    let h = -1 / 0, u = -1 / 0;
    for (let f = n; f < r; f += n) {
      const p = e[f], g = e[f + 1];
      p < a && (a = p), g < c && (c = g), p > h && (h = p), g > u && (u = g);
    }
    l = Math.max(h - a, u - c), l = l !== 0 ? 32767 / l : 0;
  }
  return Ti(s, o, n, a, c, l, 0), o;
}
function Ta(e, t, n, i, r) {
  let s;
  if (r === wh(e, t, n, i) > 0) for (let o = t; o < n; o += i) s = co(o / i | 0, e[o], e[o + 1], s);
  else for (let o = n - i; o >= t; o -= i) s = co(o / i | 0, e[o], e[o + 1], s);
  return s && ti(s, s.next) && (Ai(s), s = s.next), s;
}
function bn(e, t) {
  if (!e) return e;
  t || (t = e);
  let n = e, i;
  do
    if (i = !1, !n.steiner && (ti(n, n.next) || ot(n.prev, n, n.next) === 0)) {
      if (Ai(n), n = t = n.prev, n === n.next) break;
      i = !0;
    } else n = n.next;
  while (i || n !== t);
  return t;
}
function Ti(e, t, n, i, r, s, o) {
  if (!e) return;
  !o && s && Mh(e, i, r, s);
  let a = e;
  for (; e.prev !== e.next; ) {
    const c = e.prev, l = e.next;
    if (s ? fh(e, i, r, s) : dh(e)) {
      t.push(c.i, e.i, l.i), Ai(e), e = l.next, a = l.next;
      continue;
    }
    if (e = l, e === a) {
      o ? o === 1 ? (e = ph(bn(e), t), Ti(e, t, n, i, r, s, 2)) : o === 2 && mh(e, t, n, i, r, s) : Ti(bn(e), t, n, i, r, s, 1);
      break;
    }
  }
}
function dh(e) {
  const t = e.prev, n = e, i = e.next;
  if (ot(t, n, i) >= 0) return !1;
  const r = t.x, s = n.x, o = i.x, a = t.y, c = n.y, l = i.y, h = Math.min(r, s, o), u = Math.min(a, c, l), f = Math.max(r, s, o), p = Math.max(a, c, l);
  let g = i.next;
  for (; g !== t; ) {
    if (g.x >= h && g.x <= f && g.y >= u && g.y <= p && mi(r, a, s, c, o, l, g.x, g.y) && ot(g.prev, g, g.next) >= 0) return !1;
    g = g.next;
  }
  return !0;
}
function fh(e, t, n, i) {
  const r = e.prev, s = e, o = e.next;
  if (ot(r, s, o) >= 0) return !1;
  const a = r.x, c = s.x, l = o.x, h = r.y, u = s.y, f = o.y, p = Math.min(a, c, l), g = Math.min(h, u, f), _ = Math.max(a, c, l), m = Math.max(h, u, f), d = fs(p, g, t, n, i), T = fs(_, m, t, n, i);
  let v = e.prevZ, S = e.nextZ;
  for (; v && v.z >= d && S && S.z <= T; ) {
    if (v.x >= p && v.x <= _ && v.y >= g && v.y <= m && v !== r && v !== o && mi(a, h, c, u, l, f, v.x, v.y) && ot(v.prev, v, v.next) >= 0 || (v = v.prevZ, S.x >= p && S.x <= _ && S.y >= g && S.y <= m && S !== r && S !== o && mi(a, h, c, u, l, f, S.x, S.y) && ot(S.prev, S, S.next) >= 0)) return !1;
    S = S.nextZ;
  }
  for (; v && v.z >= d; ) {
    if (v.x >= p && v.x <= _ && v.y >= g && v.y <= m && v !== r && v !== o && mi(a, h, c, u, l, f, v.x, v.y) && ot(v.prev, v, v.next) >= 0) return !1;
    v = v.prevZ;
  }
  for (; S && S.z <= T; ) {
    if (S.x >= p && S.x <= _ && S.y >= g && S.y <= m && S !== r && S !== o && mi(a, h, c, u, l, f, S.x, S.y) && ot(S.prev, S, S.next) >= 0) return !1;
    S = S.nextZ;
  }
  return !0;
}
function ph(e, t) {
  let n = e;
  do {
    const i = n.prev, r = n.next.next;
    !ti(i, r) && Aa(i, n, n.next, r) && bi(i, r) && bi(r, i) && (t.push(i.i, n.i, r.i), Ai(n), Ai(n.next), n = e = r), n = n.next;
  } while (n !== e);
  return bn(n);
}
function mh(e, t, n, i, r, s) {
  let o = e;
  do {
    let a = o.next.next;
    for (; a !== o.prev; ) {
      if (o.i !== a.i && Th(o, a)) {
        let c = wa(o, a);
        o = bn(o, o.next), c = bn(c, c.next), Ti(o, t, n, i, r, s, 0), Ti(c, t, n, i, r, s, 0);
        return;
      }
      a = a.next;
    }
    o = o.next;
  } while (o !== e);
}
function _h(e, t, n, i) {
  const r = [];
  for (let s = 0, o = t.length; s < o; s++) {
    const a = Ta(e, t[s] * i, s < o - 1 ? t[s + 1] * i : e.length, i, !1);
    a === a.next && (a.steiner = !0), r.push(Eh(a));
  }
  r.sort(gh);
  for (let s = 0; s < r.length; s++) n = vh(r[s], n);
  return n;
}
function gh(e, t) {
  let n = e.x - t.x;
  return n === 0 && (n = e.y - t.y, n === 0 && (n = (e.next.y - e.y) / (e.next.x - e.x) - (t.next.y - t.y) / (t.next.x - t.x))), n;
}
function vh(e, t) {
  const n = xh(e, t);
  if (!n) return t;
  const i = wa(n, e);
  return bn(i, i.next), bn(n, n.next);
}
function xh(e, t) {
  let n = t;
  const i = e.x, r = e.y;
  let s = -1 / 0, o;
  if (ti(e, n)) return n;
  do {
    if (ti(e, n.next)) return n.next;
    if (r <= n.y && r >= n.next.y && n.next.y !== n.y) {
      const u = n.x + (r - n.y) * (n.next.x - n.x) / (n.next.y - n.y);
      if (u <= i && u > s && (s = u, o = n.x < n.next.x ? n : n.next, u === i))
        return o;
    }
    n = n.next;
  } while (n !== t);
  if (!o) return null;
  const a = o, c = o.x, l = o.y;
  let h = 1 / 0;
  n = o;
  do {
    if (i >= n.x && n.x >= c && i !== n.x && ba(r < l ? i : s, r, c, l, r < l ? s : i, r, n.x, n.y)) {
      const u = Math.abs(r - n.y) / (i - n.x);
      bi(n, e) && (u < h || u === h && (n.x > o.x || n.x === o.x && yh(o, n))) && (o = n, h = u);
    }
    n = n.next;
  } while (n !== a);
  return o;
}
function yh(e, t) {
  return ot(e.prev, e, t.prev) < 0 && ot(t.next, e, e.next) < 0;
}
function Mh(e, t, n, i) {
  let r = e;
  do
    r.z === 0 && (r.z = fs(r.x, r.y, t, n, i)), r.prevZ = r.prev, r.nextZ = r.next, r = r.next;
  while (r !== e);
  r.prevZ.nextZ = null, r.prevZ = null, Sh(r);
}
function Sh(e) {
  let t, n = 1;
  do {
    let i = e, r;
    e = null;
    let s = null;
    for (t = 0; i; ) {
      t++;
      let o = i, a = 0;
      for (let l = 0; l < n && (a++, o = o.nextZ, !!o); l++)
        ;
      let c = n;
      for (; a > 0 || c > 0 && o; )
        a !== 0 && (c === 0 || !o || i.z <= o.z) ? (r = i, i = i.nextZ, a--) : (r = o, o = o.nextZ, c--), s ? s.nextZ = r : e = r, r.prevZ = s, s = r;
      i = o;
    }
    s.nextZ = null, n *= 2;
  } while (t > 1);
  return e;
}
function fs(e, t, n, i, r) {
  return e = (e - n) * r | 0, t = (t - i) * r | 0, e = (e | e << 8) & 16711935, e = (e | e << 4) & 252645135, e = (e | e << 2) & 858993459, e = (e | e << 1) & 1431655765, t = (t | t << 8) & 16711935, t = (t | t << 4) & 252645135, t = (t | t << 2) & 858993459, t = (t | t << 1) & 1431655765, e | t << 1;
}
function Eh(e) {
  let t = e, n = e;
  do
    (t.x < n.x || t.x === n.x && t.y < n.y) && (n = t), t = t.next;
  while (t !== e);
  return n;
}
function ba(e, t, n, i, r, s, o, a) {
  return (r - o) * (t - a) >= (e - o) * (s - a) && (e - o) * (i - a) >= (n - o) * (t - a) && (n - o) * (s - a) >= (r - o) * (i - a);
}
function mi(e, t, n, i, r, s, o, a) {
  return !(e === o && t === a) && ba(e, t, n, i, r, s, o, a);
}
function Th(e, t) {
  return e.next.i !== t.i && e.prev.i !== t.i && !bh(e, t) && (bi(e, t) && bi(t, e) && Ah(e, t) && (ot(e.prev, e, t.prev) || ot(e, t.prev, t)) || ti(e, t) && ot(e.prev, e, e.next) > 0 && ot(t.prev, t, t.next) > 0);
}
function ot(e, t, n) {
  return (t.y - e.y) * (n.x - t.x) - (t.x - e.x) * (n.y - t.y);
}
function ti(e, t) {
  return e.x === t.x && e.y === t.y;
}
function Aa(e, t, n, i) {
  const r = tr(ot(e, t, n)), s = tr(ot(e, t, i)), o = tr(ot(n, i, e)), a = tr(ot(n, i, t));
  return !!(r !== s && o !== a || r === 0 && er(e, n, t) || s === 0 && er(e, i, t) || o === 0 && er(n, e, i) || a === 0 && er(n, t, i));
}
function er(e, t, n) {
  return t.x <= Math.max(e.x, n.x) && t.x >= Math.min(e.x, n.x) && t.y <= Math.max(e.y, n.y) && t.y >= Math.min(e.y, n.y);
}
function tr(e) {
  return e > 0 ? 1 : e < 0 ? -1 : 0;
}
function bh(e, t) {
  let n = e;
  do {
    if (n.i !== e.i && n.next.i !== e.i && n.i !== t.i && n.next.i !== t.i && Aa(n, n.next, e, t)) return !0;
    n = n.next;
  } while (n !== e);
  return !1;
}
function bi(e, t) {
  return ot(e.prev, e, e.next) < 0 ? ot(e, t, e.next) >= 0 && ot(e, e.prev, t) >= 0 : ot(e, t, e.prev) < 0 || ot(e, e.next, t) < 0;
}
function Ah(e, t) {
  let n = e, i = !1;
  const r = (e.x + t.x) / 2, s = (e.y + t.y) / 2;
  do
    n.y > s != n.next.y > s && n.next.y !== n.y && r < (n.next.x - n.x) * (s - n.y) / (n.next.y - n.y) + n.x && (i = !i), n = n.next;
  while (n !== e);
  return i;
}
function wa(e, t) {
  const n = ps(e.i, e.x, e.y), i = ps(t.i, t.x, t.y), r = e.next, s = t.prev;
  return e.next = t, t.prev = e, n.next = r, r.prev = n, i.next = n, n.prev = i, s.next = i, i.prev = s, i;
}
function co(e, t, n, i) {
  const r = ps(e, t, n);
  return i ? (r.next = i.next, r.prev = i, i.next.prev = r, i.next = r) : (r.prev = r, r.next = r), r;
}
function Ai(e) {
  e.next.prev = e.prev, e.prev.next = e.next, e.prevZ && (e.prevZ.nextZ = e.nextZ), e.nextZ && (e.nextZ.prevZ = e.prevZ);
}
function ps(e, t, n) {
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
function wh(e, t, n, i) {
  let r = 0;
  for (let s = t, o = n - i; s < n; s += i)
    r += (e[o] - e[s]) * (e[s + 1] + e[o + 1]), o = s;
  return r;
}
var Rh = class {
  static triangulate(e, t, n = 2) {
    return uh(e, t, n);
  }
}, nr = class Ra {
  static area(t) {
    const n = t.length;
    let i = 0;
    for (let r = n - 1, s = 0; s < n; r = s++) i += t[r].x * t[s].y - t[s].x * t[r].y;
    return i * 0.5;
  }
  static isClockWise(t) {
    return Ra.area(t) < 0;
  }
  static triangulateShape(t, n) {
    const i = [], r = [], s = [];
    ho(t), uo(i, t);
    let o = t.length;
    n.forEach(ho);
    for (let c = 0; c < n.length; c++)
      r.push(o), o += n[c].length, uo(i, n[c]);
    const a = Rh.triangulate(i, r);
    for (let c = 0; c < a.length; c += 3) s.push(a.slice(c, c + 3));
    return s;
  }
};
function ho(e) {
  const t = e.length;
  t > 2 && e[t - 1].equals(e[0]) && e.pop();
}
function uo(e, t) {
  for (let n = 0; n < t.length; n++)
    e.push(t[n].x), e.push(t[n].y);
}
var Ch = class Ca extends It {
  constructor(t = new Ea([
    new se(0.5, 0.5),
    new se(-0.5, 0.5),
    new se(-0.5, -0.5),
    new se(0.5, -0.5)
  ]), n = {}) {
    super(), this.type = "ExtrudeGeometry", this.parameters = {
      shapes: t,
      options: n
    }, t = Array.isArray(t) ? t : [t];
    const i = this, r = [], s = [];
    for (let a = 0, c = t.length; a < c; a++) {
      const l = t[a];
      o(l);
    }
    this.setAttribute("position", new ut(r, 3)), this.setAttribute("uv", new ut(s, 2)), this.computeVertexNormals();
    function o(a) {
      const c = [], l = n.curveSegments !== void 0 ? n.curveSegments : 12, h = n.steps !== void 0 ? n.steps : 1, u = n.depth !== void 0 ? n.depth : 1;
      let f = n.bevelEnabled !== void 0 ? n.bevelEnabled : !0, p = n.bevelThickness !== void 0 ? n.bevelThickness : 0.2, g = n.bevelSize !== void 0 ? n.bevelSize : p - 0.1, _ = n.bevelOffset !== void 0 ? n.bevelOffset : 0, m = n.bevelSegments !== void 0 ? n.bevelSegments : 3;
      const d = n.extrudePath, T = n.UVGenerator !== void 0 ? n.UVGenerator : Ph;
      let v, S = !1, b, w, C, P;
      d && (v = d.getSpacedPoints(h), S = !0, f = !1, b = d.computeFrenetFrames(h, !1), w = new D(), C = new D(), P = new D()), f || (m = 0, p = 0, g = 0, _ = 0);
      const E = a.extractPoints(l);
      let y = E.shape;
      const R = E.holes;
      if (!nr.isClockWise(y)) {
        y = y.reverse();
        for (let K = 0, $ = R.length; K < $; K++) {
          const ie = R[K];
          nr.isClockWise(ie) && (R[K] = ie.reverse());
        }
      }
      function z(K) {
        const ie = 10000000000000001e-36;
        let j = K[0];
        for (let de = 1; de <= K.length; de++) {
          const ce = de % K.length, ae = K[ce], Be = ae.x - j.x, ze = ae.y - j.y, Ge = Be * Be + ze * ze, A = Math.max(Math.abs(ae.x), Math.abs(ae.y), Math.abs(j.x), Math.abs(j.y));
          if (Ge <= ie * A * A) {
            K.splice(ce, 1), de--;
            continue;
          }
          j = ae;
        }
      }
      z(y), R.forEach(z);
      const k = R.length, B = y;
      for (let K = 0; K < k; K++) {
        const $ = R[K];
        y = y.concat($);
      }
      function Z(K, $, ie) {
        return $ || console.error("THREE.ExtrudeGeometry: vec does not exist"), K.clone().addScaledVector($, ie);
      }
      const W = y.length;
      function Q(K, $, ie) {
        let j, de, ce;
        const ae = K.x - $.x, Be = K.y - $.y, ze = ie.x - K.x, Ge = ie.y - K.y, A = ae * ae + Be * Be, x = ae * Ge - Be * ze;
        if (Math.abs(x) > Number.EPSILON) {
          const N = Math.sqrt(A), q = Math.sqrt(ze * ze + Ge * Ge), te = $.x - Be / N, Y = $.y + ae / N, Me = ie.x - Ge / q, he = ie.y + ze / q, Te = ((Me - te) * Ge - (he - Y) * ze) / (ae * Ge - Be * ze);
          j = te + ae * Te - K.x, de = Y + Be * Te - K.y;
          const De = j * j + de * de;
          if (De <= 2) return new se(j, de);
          ce = Math.sqrt(De / 2);
        } else {
          let N = !1;
          ae > Number.EPSILON ? ze > Number.EPSILON && (N = !0) : ae < -Number.EPSILON ? ze < -Number.EPSILON && (N = !0) : Math.sign(Be) === Math.sign(Ge) && (N = !0), N ? (j = -Be, de = ae, ce = Math.sqrt(A)) : (j = ae, de = Be, ce = Math.sqrt(A / 2));
        }
        return new se(j / ce, de / ce);
      }
      const G = [];
      for (let K = 0, $ = B.length, ie = $ - 1, j = K + 1; K < $; K++, ie++, j++)
        ie === $ && (ie = 0), j === $ && (j = 0), G[K] = Q(B[K], B[ie], B[j]);
      const oe = [];
      let fe, Le = G.concat();
      for (let K = 0, $ = k; K < $; K++) {
        const ie = R[K];
        fe = [];
        for (let j = 0, de = ie.length, ce = de - 1, ae = j + 1; j < de; j++, ce++, ae++)
          ce === de && (ce = 0), ae === de && (ae = 0), fe[j] = Q(ie[j], ie[ce], ie[ae]);
        oe.push(fe), Le = Le.concat(fe);
      }
      let Ue;
      if (m === 0) Ue = nr.triangulateShape(B, R);
      else {
        const K = [], $ = [];
        for (let ie = 0; ie < m; ie++) {
          const j = ie / m, de = p * Math.cos(j * Math.PI / 2), ce = g * Math.sin(j * Math.PI / 2) + _;
          for (let ae = 0, Be = B.length; ae < Be; ae++) {
            const ze = Z(B[ae], G[ae], ce);
            pe(ze.x, ze.y, -de), j === 0 && K.push(ze);
          }
          for (let ae = 0, Be = k; ae < Be; ae++) {
            const ze = R[ae];
            fe = oe[ae];
            const Ge = [];
            for (let A = 0, x = ze.length; A < x; A++) {
              const N = Z(ze[A], fe[A], ce);
              pe(N.x, N.y, -de), j === 0 && Ge.push(N);
            }
            j === 0 && $.push(Ge);
          }
        }
        Ue = nr.triangulateShape(K, $);
      }
      const Je = Ue.length, Ye = g + _;
      for (let K = 0; K < W; K++) {
        const $ = f ? Z(y[K], Le[K], Ye) : y[K];
        S ? (C.copy(b.normals[0]).multiplyScalar($.x), w.copy(b.binormals[0]).multiplyScalar($.y), P.copy(v[0]).add(C).add(w), pe(P.x, P.y, P.z)) : pe($.x, $.y, 0);
      }
      for (let K = 1; K <= h; K++) for (let $ = 0; $ < W; $++) {
        const ie = f ? Z(y[$], Le[$], Ye) : y[$];
        S ? (C.copy(b.normals[K]).multiplyScalar(ie.x), w.copy(b.binormals[K]).multiplyScalar(ie.y), P.copy(v[K]).add(C).add(w), pe(P.x, P.y, P.z)) : pe(ie.x, ie.y, u / h * K);
      }
      for (let K = m - 1; K >= 0; K--) {
        const $ = K / m, ie = p * Math.cos($ * Math.PI / 2), j = g * Math.sin($ * Math.PI / 2) + _;
        for (let de = 0, ce = B.length; de < ce; de++) {
          const ae = Z(B[de], G[de], j);
          pe(ae.x, ae.y, u + ie);
        }
        for (let de = 0, ce = R.length; de < ce; de++) {
          const ae = R[de];
          fe = oe[de];
          for (let Be = 0, ze = ae.length; Be < ze; Be++) {
            const Ge = Z(ae[Be], fe[Be], j);
            S ? pe(Ge.x, Ge.y + v[h - 1].y, v[h - 1].x + ie) : pe(Ge.x, Ge.y, u + ie);
          }
        }
      }
      F(), X();
      function F() {
        const K = r.length / 3;
        if (f) {
          let $ = 0, ie = W * $;
          for (let j = 0; j < Je; j++) {
            const de = Ue[j];
            Pe(de[2] + ie, de[1] + ie, de[0] + ie);
          }
          $ = h + m * 2, ie = W * $;
          for (let j = 0; j < Je; j++) {
            const de = Ue[j];
            Pe(de[0] + ie, de[1] + ie, de[2] + ie);
          }
        } else {
          for (let $ = 0; $ < Je; $++) {
            const ie = Ue[$];
            Pe(ie[2], ie[1], ie[0]);
          }
          for (let $ = 0; $ < Je; $++) {
            const ie = Ue[$];
            Pe(ie[0] + W * h, ie[1] + W * h, ie[2] + W * h);
          }
        }
        i.addGroup(K, r.length / 3 - K, 0);
      }
      function X() {
        const K = r.length / 3;
        let $ = 0;
        ee(B, $), $ += B.length;
        for (let ie = 0, j = R.length; ie < j; ie++) {
          const de = R[ie];
          ee(de, $), $ += de.length;
        }
        i.addGroup(K, r.length / 3 - K, 1);
      }
      function ee(K, $) {
        let ie = K.length;
        for (; --ie >= 0; ) {
          const j = ie;
          let de = ie - 1;
          de < 0 && (de = K.length - 1);
          for (let ce = 0, ae = h + m * 2; ce < ae; ce++) {
            const Be = W * ce, ze = W * (ce + 1);
            ye($ + j + Be, $ + de + Be, $ + de + ze, $ + j + ze);
          }
        }
      }
      function pe(K, $, ie) {
        c.push(K), c.push($), c.push(ie);
      }
      function Pe(K, $, ie) {
        ke(K), ke($), ke(ie);
        const j = r.length / 3, de = T.generateTopUV(i, r, j - 3, j - 2, j - 1);
        L(de[0]), L(de[1]), L(de[2]);
      }
      function ye(K, $, ie, j) {
        ke(K), ke($), ke(j), ke($), ke(ie), ke(j);
        const de = r.length / 3, ce = T.generateSideWallUV(i, r, de - 6, de - 3, de - 2, de - 1);
        L(ce[0]), L(ce[1]), L(ce[3]), L(ce[1]), L(ce[2]), L(ce[3]);
      }
      function ke(K) {
        r.push(c[K * 3 + 0]), r.push(c[K * 3 + 1]), r.push(c[K * 3 + 2]);
      }
      function L(K) {
        s.push(K.x), s.push(K.y);
      }
    }
  }
  copy(t) {
    return super.copy(t), this.parameters = Object.assign({}, t.parameters), this;
  }
  toJSON() {
    const t = super.toJSON(), n = this.parameters.shapes, i = this.parameters.options;
    return Lh(n, i, t);
  }
  static fromJSON(t, n) {
    const i = [];
    for (let s = 0, o = t.shapes.length; s < o; s++) {
      const a = n[t.shapes[s]];
      i.push(a);
    }
    const r = t.options.extrudePath;
    return r !== void 0 && (t.options.extrudePath = new ds[r.type]().fromJSON(r)), new Ca(i, t.options);
  }
}, Ph = {
  generateTopUV: function(e, t, n, i, r) {
    const s = t[n * 3], o = t[n * 3 + 1], a = t[i * 3], c = t[i * 3 + 1], l = t[r * 3], h = t[r * 3 + 1];
    return [
      new se(s, o),
      new se(a, c),
      new se(l, h)
    ];
  },
  generateSideWallUV: function(e, t, n, i, r, s) {
    const o = t[n * 3], a = t[n * 3 + 1], c = t[n * 3 + 2], l = t[i * 3], h = t[i * 3 + 1], u = t[i * 3 + 2], f = t[r * 3], p = t[r * 3 + 1], g = t[r * 3 + 2], _ = t[s * 3], m = t[s * 3 + 1], d = t[s * 3 + 2];
    return Math.abs(a - h) < Math.abs(o - l) ? [
      new se(o, 1 - c),
      new se(l, 1 - u),
      new se(f, 1 - g),
      new se(_, 1 - d)
    ] : [
      new se(a, 1 - c),
      new se(h, 1 - u),
      new se(p, 1 - g),
      new se(m, 1 - d)
    ];
  }
};
function Lh(e, t, n) {
  if (n.shapes = [], Array.isArray(e)) for (let i = 0, r = e.length; i < r; i++) {
    const s = e[i];
    n.shapes.push(s.uuid);
  }
  else n.shapes.push(e.uuid);
  return n.options = Object.assign({}, t), t.extrudePath !== void 0 && (n.options.extrudePath = t.extrudePath.toJSON()), n;
}
var Pa = class La extends It {
  constructor(t = 1, n = 1, i = 1, r = 1) {
    super(), this.type = "PlaneGeometry", this.parameters = {
      width: t,
      height: n,
      widthSegments: i,
      heightSegments: r
    };
    const s = t / 2, o = n / 2, a = Math.floor(i), c = Math.floor(r), l = a + 1, h = c + 1, u = t / a, f = n / c, p = [], g = [], _ = [], m = [];
    for (let d = 0; d < h; d++) {
      const T = d * f - o;
      for (let v = 0; v < l; v++) {
        const S = v * u - s;
        g.push(S, -T, 0), _.push(0, 0, 1), m.push(v / a), m.push(1 - d / c);
      }
    }
    for (let d = 0; d < c; d++) for (let T = 0; T < a; T++) {
      const v = T + l * d, S = T + l * (d + 1), b = T + 1 + l * (d + 1), w = T + 1 + l * d;
      p.push(v, S, w), p.push(S, b, w);
    }
    this.setIndex(p), this.setAttribute("position", new ut(g, 3)), this.setAttribute("normal", new ut(_, 3)), this.setAttribute("uv", new ut(m, 2));
  }
  copy(t) {
    return super.copy(t), this.parameters = Object.assign({}, t.parameters), this;
  }
  static fromJSON(t) {
    return new La(t.width, t.height, t.widthSegments, t.heightSegments);
  }
}, Da = class Ia extends It {
  constructor(t = 1, n = 32, i = 16, r = 0, s = Math.PI * 2, o = 0, a = Math.PI) {
    super(), this.type = "SphereGeometry", this.parameters = {
      radius: t,
      widthSegments: n,
      heightSegments: i,
      phiStart: r,
      phiLength: s,
      thetaStart: o,
      thetaLength: a
    }, n = Math.max(3, Math.floor(n)), i = Math.max(2, Math.floor(i));
    const c = Math.min(o + a, Math.PI);
    let l = 0;
    const h = [], u = new D(), f = new D(), p = [], g = [], _ = [], m = [];
    for (let d = 0; d <= i; d++) {
      const T = [], v = d / i;
      let S = 0;
      d === 0 && o === 0 ? S = 0.5 / n : d === i && c === Math.PI && (S = -0.5 / n);
      for (let b = 0; b <= n; b++) {
        const w = b / n;
        u.x = -t * Math.cos(r + w * s) * Math.sin(o + v * a), u.y = t * Math.cos(o + v * a), u.z = t * Math.sin(r + w * s) * Math.sin(o + v * a), g.push(u.x, u.y, u.z), f.copy(u).normalize(), _.push(f.x, f.y, f.z), m.push(w + S, 1 - v), T.push(l++);
      }
      h.push(T);
    }
    for (let d = 0; d < i; d++) for (let T = 0; T < n; T++) {
      const v = h[d][T + 1], S = h[d][T], b = h[d + 1][T], w = h[d + 1][T + 1];
      (d !== 0 || o > 0) && p.push(v, S, w), (d !== i - 1 || c < Math.PI) && p.push(S, b, w);
    }
    this.setIndex(p), this.setAttribute("position", new ut(g, 3)), this.setAttribute("normal", new ut(_, 3)), this.setAttribute("uv", new ut(m, 2));
  }
  copy(t) {
    return super.copy(t), this.parameters = Object.assign({}, t.parameters), this;
  }
  static fromJSON(t) {
    return new Ia(t.radius, t.widthSegments, t.heightSegments, t.phiStart, t.phiLength, t.thetaStart, t.thetaLength);
  }
}, Dh = class extends ii {
  constructor(e) {
    super(), this.isMeshStandardMaterial = !0, this.type = "MeshStandardMaterial", this.defines = { STANDARD: "" }, this.color = new qe(16777215), this.roughness = 1, this.metalness = 0, this.map = null, this.lightMap = null, this.lightMapIntensity = 1, this.aoMap = null, this.aoMapIntensity = 1, this.emissive = new qe(0), this.emissiveIntensity = 1, this.emissiveMap = null, this.bumpMap = null, this.bumpScale = 1, this.normalMap = null, this.normalMapType = 0, this.normalScale = new se(1, 1), this.displacementMap = null, this.displacementScale = 1, this.displacementBias = 0, this.roughnessMap = null, this.metalnessMap = null, this.alphaMap = null, this.envMap = null, this.envMapRotation = new un(), this.envMapIntensity = 1, this.wireframe = !1, this.wireframeLinewidth = 1, this.wireframeLinecap = "round", this.wireframeLinejoin = "round", this.flatShading = !1, this.fog = !0, this.setValues(e);
  }
  copy(e) {
    return super.copy(e), this.defines = { STANDARD: "" }, this.color.copy(e.color), this.roughness = e.roughness, this.metalness = e.metalness, this.map = e.map, this.lightMap = e.lightMap, this.lightMapIntensity = e.lightMapIntensity, this.aoMap = e.aoMap, this.aoMapIntensity = e.aoMapIntensity, this.emissive.copy(e.emissive), this.emissiveMap = e.emissiveMap, this.emissiveIntensity = e.emissiveIntensity, this.bumpMap = e.bumpMap, this.bumpScale = e.bumpScale, this.normalMap = e.normalMap, this.normalMapType = e.normalMapType, this.normalScale.copy(e.normalScale), this.displacementMap = e.displacementMap, this.displacementScale = e.displacementScale, this.displacementBias = e.displacementBias, this.roughnessMap = e.roughnessMap, this.metalnessMap = e.metalnessMap, this.alphaMap = e.alphaMap, this.envMap = e.envMap, this.envMapRotation.copy(e.envMapRotation), this.envMapIntensity = e.envMapIntensity, this.wireframe = e.wireframe, this.wireframeLinewidth = e.wireframeLinewidth, this.wireframeLinecap = e.wireframeLinecap, this.wireframeLinejoin = e.wireframeLinejoin, this.flatShading = e.flatShading, this.fog = e.fog, this;
  }
}, Ih = class extends ii {
  constructor(e) {
    super(), this.isMeshDepthMaterial = !0, this.type = "MeshDepthMaterial", this.depthPacking = $l, this.map = null, this.alphaMap = null, this.displacementMap = null, this.displacementScale = 1, this.displacementBias = 0, this.wireframe = !1, this.wireframeLinewidth = 1, this.setValues(e);
  }
  copy(e) {
    return super.copy(e), this.depthPacking = e.depthPacking, this.map = e.map, this.alphaMap = e.alphaMap, this.displacementMap = e.displacementMap, this.displacementScale = e.displacementScale, this.displacementBias = e.displacementBias, this.wireframe = e.wireframe, this.wireframeLinewidth = e.wireframeLinewidth, this;
  }
}, Uh = class extends ii {
  constructor(e) {
    super(), this.isMeshDistanceMaterial = !0, this.type = "MeshDistanceMaterial", this.map = null, this.alphaMap = null, this.displacementMap = null, this.displacementScale = 1, this.displacementBias = 0, this.setValues(e);
  }
  copy(e) {
    return super.copy(e), this.map = e.map, this.alphaMap = e.alphaMap, this.displacementMap = e.displacementMap, this.displacementScale = e.displacementScale, this.displacementBias = e.displacementBias, this;
  }
}, Nh = class extends fa {
  constructor(e) {
    super(), this.isLineDashedMaterial = !0, this.type = "LineDashedMaterial", this.scale = 1, this.dashSize = 3, this.gapSize = 1, this.setValues(e);
  }
  copy(e) {
    return super.copy(e), this.scale = e.scale, this.dashSize = e.dashSize, this.gapSize = e.gapSize, this;
  }
};
function ir(e, t) {
  return !e || e.constructor === t ? e : typeof t.BYTES_PER_ELEMENT == "number" ? new t(e) : Array.prototype.slice.call(e);
}
function Oh(e) {
  return ArrayBuffer.isView(e) && !(e instanceof DataView);
}
var yr = class {
  constructor(e, t, n, i) {
    this.parameterPositions = e, this._cachedIndex = 0, this.resultBuffer = i !== void 0 ? i : new t.constructor(n), this.sampleValues = t, this.valueSize = n, this.settings = null, this.DefaultSettings_ = {};
  }
  evaluate(e) {
    const t = this.parameterPositions;
    let n = this._cachedIndex, i = t[n], r = t[n - 1];
    n: {
      e: {
        let s;
        t: {
          i: if (!(e < i)) {
            for (let o = n + 2; ; ) {
              if (i === void 0) {
                if (e < r) break i;
                return n = t.length, this._cachedIndex = n, this.copySampleValue_(n - 1);
              }
              if (n === o) break;
              if (r = i, i = t[++n], e < i) break e;
            }
            s = t.length;
            break t;
          }
          if (!(e >= r)) {
            const o = t[1];
            e < o && (n = 2, r = o);
            for (let a = n - 2; ; ) {
              if (r === void 0)
                return this._cachedIndex = 0, this.copySampleValue_(0);
              if (n === a) break;
              if (i = r, r = t[--n - 1], e >= r) break e;
            }
            s = n, n = 0;
            break t;
          }
          break n;
        }
        for (; n < s; ) {
          const o = n + s >>> 1;
          e < t[o] ? s = o : n = o + 1;
        }
        if (i = t[n], r = t[n - 1], r === void 0)
          return this._cachedIndex = 0, this.copySampleValue_(0);
        if (i === void 0)
          return n = t.length, this._cachedIndex = n, this.copySampleValue_(n - 1);
      }
      this._cachedIndex = n, this.intervalChanged_(n, r, i);
    }
    return this.interpolate_(n, r, e, i);
  }
  getSettings_() {
    return this.settings || this.DefaultSettings_;
  }
  copySampleValue_(e) {
    const t = this.resultBuffer, n = this.sampleValues, i = this.valueSize, r = e * i;
    for (let s = 0; s !== i; ++s) t[s] = n[r + s];
    return t;
  }
  interpolate_() {
    throw new Error("call to abstract method");
  }
  intervalChanged_() {
  }
}, Fh = class extends yr {
  constructor(e, t, n, i) {
    super(e, t, n, i), this._weightPrev = -0, this._offsetPrev = -0, this._weightNext = -0, this._offsetNext = -0, this.DefaultSettings_ = {
      endingStart: Ns,
      endingEnd: Ns
    };
  }
  intervalChanged_(e, t, n) {
    const i = this.parameterPositions;
    let r = e - 2, s = e + 1, o = i[r], a = i[s];
    if (o === void 0) switch (this.getSettings_().endingStart) {
      case Os:
        r = e, o = 2 * t - n;
        break;
      case Fs:
        r = i.length - 2, o = t + i[r] - i[r + 1];
        break;
      default:
        r = e, o = n;
    }
    if (a === void 0) switch (this.getSettings_().endingEnd) {
      case Os:
        s = e, a = 2 * n - t;
        break;
      case Fs:
        s = 1, a = n + i[1] - i[0];
        break;
      default:
        s = e - 1, a = t;
    }
    const c = (n - t) * 0.5, l = this.valueSize;
    this._weightPrev = c / (t - o), this._weightNext = c / (a - n), this._offsetPrev = r * l, this._offsetNext = s * l;
  }
  interpolate_(e, t, n, i) {
    const r = this.resultBuffer, s = this.sampleValues, o = this.valueSize, a = e * o, c = a - o, l = this._offsetPrev, h = this._offsetNext, u = this._weightPrev, f = this._weightNext, p = (n - t) / (i - t), g = p * p, _ = g * p, m = -u * _ + 2 * u * g - u * p, d = (1 + u) * _ + (-1.5 - 2 * u) * g + (-0.5 + u) * p + 1, T = (-1 - f) * _ + (1.5 + f) * g + 0.5 * p, v = f * _ - f * g;
    for (let S = 0; S !== o; ++S) r[S] = m * s[l + S] + d * s[c + S] + T * s[a + S] + v * s[h + S];
    return r;
  }
}, Bh = class extends yr {
  constructor(e, t, n, i) {
    super(e, t, n, i);
  }
  interpolate_(e, t, n, i) {
    const r = this.resultBuffer, s = this.sampleValues, o = this.valueSize, a = e * o, c = a - o, l = (n - t) / (i - t), h = 1 - l;
    for (let u = 0; u !== o; ++u) r[u] = s[c + u] * h + s[a + u] * l;
    return r;
  }
}, zh = class extends yr {
  constructor(e, t, n, i) {
    super(e, t, n, i);
  }
  interpolate_(e) {
    return this.copySampleValue_(e - 1);
  }
}, qt = class {
  constructor(e, t, n, i) {
    if (e === void 0) throw new Error("THREE.KeyframeTrack: track name is undefined");
    if (t === void 0 || t.length === 0) throw new Error("THREE.KeyframeTrack: no keyframes in track named " + e);
    this.name = e, this.times = ir(t, this.TimeBufferType), this.values = ir(n, this.ValueBufferType), this.setInterpolation(i || this.DefaultInterpolation);
  }
  static toJSON(e) {
    const t = e.constructor;
    let n;
    if (t.toJSON !== this.toJSON) n = t.toJSON(e);
    else {
      n = {
        name: e.name,
        times: ir(e.times, Array),
        values: ir(e.values, Array)
      };
      const i = e.getInterpolation();
      i !== e.DefaultInterpolation && (n.interpolation = i);
    }
    return n.type = e.ValueTypeName, n;
  }
  InterpolantFactoryMethodDiscrete(e) {
    return new zh(this.times, this.values, this.getValueSize(), e);
  }
  InterpolantFactoryMethodLinear(e) {
    return new Bh(this.times, this.values, this.getValueSize(), e);
  }
  InterpolantFactoryMethodSmooth(e) {
    return new Fh(this.times, this.values, this.getValueSize(), e);
  }
  setInterpolation(e) {
    let t;
    switch (e) {
      case dr:
        t = this.InterpolantFactoryMethodDiscrete;
        break;
      case ls:
        t = this.InterpolantFactoryMethodLinear;
        break;
      case Tr:
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
        return dr;
      case this.InterpolantFactoryMethodLinear:
        return ls;
      case this.InterpolantFactoryMethodSmooth:
        return Tr;
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
    let r = 0, s = i - 1;
    for (; r !== i && n[r] < e; ) ++r;
    for (; s !== -1 && n[s] > t; ) --s;
    if (++s, r !== 0 || s !== i) {
      r >= s && (s = Math.max(s, 1), r = s - 1);
      const o = this.getValueSize();
      this.times = n.slice(r, s), this.values = this.values.slice(r * o, s * o);
    }
    return this;
  }
  validate() {
    let e = !0;
    const t = this.getValueSize();
    t - Math.floor(t) !== 0 && (console.error("THREE.KeyframeTrack: Invalid value size in track.", this), e = !1);
    const n = this.times, i = this.values, r = n.length;
    r === 0 && (console.error("THREE.KeyframeTrack: Track is empty.", this), e = !1);
    let s = null;
    for (let o = 0; o !== r; o++) {
      const a = n[o];
      if (typeof a == "number" && isNaN(a)) {
        console.error("THREE.KeyframeTrack: Time is not a valid number.", this, o, a), e = !1;
        break;
      }
      if (s !== null && s > a) {
        console.error("THREE.KeyframeTrack: Out of order keys.", this, o, a, s), e = !1;
        break;
      }
      s = a;
    }
    if (i !== void 0 && Oh(i))
      for (let o = 0, a = i.length; o !== a; ++o) {
        const c = i[o];
        if (isNaN(c)) {
          console.error("THREE.KeyframeTrack: Value is not a valid number.", this, o, c), e = !1;
          break;
        }
      }
    return e;
  }
  optimize() {
    const e = this.times.slice(), t = this.values.slice(), n = this.getValueSize(), i = this.getInterpolation() === Tr, r = e.length - 1;
    let s = 1;
    for (let o = 1; o < r; ++o) {
      let a = !1;
      const c = e[o];
      if (c !== e[o + 1] && (o !== 1 || c !== e[0])) if (i)
        a = !0;
      else {
        const l = o * n, h = l - n, u = l + n;
        for (let f = 0; f !== n; ++f) {
          const p = t[l + f];
          if (p !== t[h + f] || p !== t[u + f]) {
            a = !0;
            break;
          }
        }
      }
      if (a) {
        if (o !== s) {
          e[s] = e[o];
          const l = o * n, h = s * n;
          for (let u = 0; u !== n; ++u) t[h + u] = t[l + u];
        }
        ++s;
      }
    }
    if (r > 0) {
      e[s] = e[r];
      for (let o = r * n, a = s * n, c = 0; c !== n; ++c) t[a + c] = t[o + c];
      ++s;
    }
    return s !== e.length ? (this.times = e.slice(0, s), this.values = t.slice(0, s * n)) : (this.times = e, this.values = t), this;
  }
  clone() {
    const e = this.times.slice(), t = this.values.slice(), n = this.constructor, i = new n(this.name, e, t);
    return i.createInterpolant = this.createInterpolant, i;
  }
};
qt.prototype.ValueTypeName = "";
qt.prototype.TimeBufferType = Float32Array;
qt.prototype.ValueBufferType = Float32Array;
qt.prototype.DefaultInterpolation = ls;
var Ci = class extends qt {
  constructor(e, t, n) {
    super(e, t, n);
  }
};
Ci.prototype.ValueTypeName = "bool";
Ci.prototype.ValueBufferType = Array;
Ci.prototype.DefaultInterpolation = dr;
Ci.prototype.InterpolantFactoryMethodLinear = void 0;
Ci.prototype.InterpolantFactoryMethodSmooth = void 0;
var Vh = class extends qt {
  constructor(e, t, n, i) {
    super(e, t, n, i);
  }
};
Vh.prototype.ValueTypeName = "color";
var Hh = class extends qt {
  constructor(e, t, n, i) {
    super(e, t, n, i);
  }
};
Hh.prototype.ValueTypeName = "number";
var kh = class extends yr {
  constructor(e, t, n, i) {
    super(e, t, n, i);
  }
  interpolate_(e, t, n, i) {
    const r = this.resultBuffer, s = this.sampleValues, o = this.valueSize, a = (n - t) / (i - t);
    let c = e * o;
    for (let l = c + o; c !== l; c += 4) hn.slerpFlat(r, 0, s, c - o, s, c, a);
    return r;
  }
}, Ua = class extends qt {
  constructor(e, t, n, i) {
    super(e, t, n, i);
  }
  InterpolantFactoryMethodLinear(e) {
    return new kh(this.times, this.values, this.getValueSize(), e);
  }
};
Ua.prototype.ValueTypeName = "quaternion";
Ua.prototype.InterpolantFactoryMethodSmooth = void 0;
var Pi = class extends qt {
  constructor(e, t, n) {
    super(e, t, n);
  }
};
Pi.prototype.ValueTypeName = "string";
Pi.prototype.ValueBufferType = Array;
Pi.prototype.DefaultInterpolation = dr;
Pi.prototype.InterpolantFactoryMethodLinear = void 0;
Pi.prototype.InterpolantFactoryMethodSmooth = void 0;
var Gh = class extends qt {
  constructor(e, t, n, i) {
    super(e, t, n, i);
  }
};
Gh.prototype.ValueTypeName = "vector";
var Wh = class {
  constructor(e, t, n) {
    const i = this;
    let r = !1, s = 0, o = 0, a;
    const c = [];
    this.onStart = void 0, this.onLoad = e, this.onProgress = t, this.onError = n, this.abortController = new AbortController(), this.itemStart = function(l) {
      o++, r === !1 && i.onStart !== void 0 && i.onStart(l, s, o), r = !0;
    }, this.itemEnd = function(l) {
      s++, i.onProgress !== void 0 && i.onProgress(l, s, o), s === o && (r = !1, i.onLoad !== void 0 && i.onLoad());
    }, this.itemError = function(l) {
      i.onError !== void 0 && i.onError(l);
    }, this.resolveURL = function(l) {
      return a ? a(l) : l;
    }, this.setURLModifier = function(l) {
      return a = l, this;
    }, this.addHandler = function(l, h) {
      return c.push(l, h), this;
    }, this.removeHandler = function(l) {
      const h = c.indexOf(l);
      return h !== -1 && c.splice(h, 2), this;
    }, this.getHandler = function(l) {
      for (let h = 0, u = c.length; h < u; h += 2) {
        const f = c[h], p = c[h + 1];
        if (f.global && (f.lastIndex = 0), f.test(l)) return p;
      }
      return null;
    }, this.abort = function() {
      return this.abortController.abort(), this.abortController = new AbortController(), this;
    };
  }
}, Xh = /* @__PURE__ */ new Wh(), Yh = class {
  constructor(e) {
    this.manager = e !== void 0 ? e : Xh, this.crossOrigin = "anonymous", this.withCredentials = !1, this.path = "", this.resourcePath = "", this.requestHeader = {};
  }
  load() {
  }
  loadAsync(e, t) {
    const n = this;
    return new Promise(function(i, r) {
      n.load(e, i, t, r);
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
Yh.DEFAULT_MATERIAL_NAME = "__DEFAULT";
var Na = class extends Et {
  constructor(e, t = 1) {
    super(), this.isLight = !0, this.type = "Light", this.color = new qe(e), this.intensity = t;
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
}, qh = class extends Na {
  constructor(e, t, n) {
    super(e, n), this.isHemisphereLight = !0, this.type = "HemisphereLight", this.position.copy(Et.DEFAULT_UP), this.updateMatrix(), this.groundColor = new qe(t);
  }
  copy(e, t) {
    return super.copy(e, t), this.groundColor.copy(e.groundColor), this;
  }
}, $r = /* @__PURE__ */ new nt(), fo = /* @__PURE__ */ new D(), po = /* @__PURE__ */ new D(), Zh = class {
  constructor(e) {
    this.camera = e, this.intensity = 1, this.bias = 0, this.normalBias = 0, this.radius = 1, this.blurSamples = 8, this.mapSize = new se(512, 512), this.mapType = Jn, this.map = null, this.mapPass = null, this.matrix = new nt(), this.autoUpdate = !0, this.needsUpdate = !1, this._frustum = new Ss(), this._frameExtents = new se(1, 1), this._viewportCount = 1, this._viewports = [new ht(0, 0, 1, 1)];
  }
  getViewportCount() {
    return this._viewportCount;
  }
  getFrustum() {
    return this._frustum;
  }
  updateMatrices(e) {
    const t = this.camera, n = this.matrix;
    fo.setFromMatrixPosition(e.matrixWorld), t.position.copy(fo), po.setFromMatrixPosition(e.target.matrixWorld), t.lookAt(po), t.updateMatrixWorld(), $r.multiplyMatrices(t.projectionMatrix, t.matrixWorldInverse), this._frustum.setFromProjectionMatrix($r, t.coordinateSystem, t.reversedDepth), t.reversedDepth ? n.set(0.5, 0, 0, 0.5, 0, 0.5, 0, 0.5, 0, 0, 1, 0, 0, 0, 0, 1) : n.set(0.5, 0, 0, 0.5, 0, 0.5, 0, 0.5, 0, 0, 0.5, 0.5, 0, 0, 0, 1), n.multiply($r);
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
}, bs = class extends ha {
  constructor(e = -1, t = 1, n = 1, i = -1, r = 0.1, s = 2e3) {
    super(), this.isOrthographicCamera = !0, this.type = "OrthographicCamera", this.zoom = 1, this.view = null, this.left = e, this.right = t, this.top = n, this.bottom = i, this.near = r, this.far = s, this.updateProjectionMatrix();
  }
  copy(e, t) {
    return super.copy(e, t), this.left = e.left, this.right = e.right, this.top = e.top, this.bottom = e.bottom, this.near = e.near, this.far = e.far, this.zoom = e.zoom, this.view = e.view === null ? null : Object.assign({}, e.view), this;
  }
  setViewOffset(e, t, n, i, r, s) {
    this.view === null && (this.view = {
      enabled: !0,
      fullWidth: 1,
      fullHeight: 1,
      offsetX: 0,
      offsetY: 0,
      width: 1,
      height: 1
    }), this.view.enabled = !0, this.view.fullWidth = e, this.view.fullHeight = t, this.view.offsetX = n, this.view.offsetY = i, this.view.width = r, this.view.height = s, this.updateProjectionMatrix();
  }
  clearViewOffset() {
    this.view !== null && (this.view.enabled = !1), this.updateProjectionMatrix();
  }
  updateProjectionMatrix() {
    const e = (this.right - this.left) / (2 * this.zoom), t = (this.top - this.bottom) / (2 * this.zoom), n = (this.right + this.left) / 2, i = (this.top + this.bottom) / 2;
    let r = n - e, s = n + e, o = i + t, a = i - t;
    if (this.view !== null && this.view.enabled) {
      const c = (this.right - this.left) / this.view.fullWidth / this.zoom, l = (this.top - this.bottom) / this.view.fullHeight / this.zoom;
      r += c * this.view.offsetX, s = r + c * this.view.width, o -= l * this.view.offsetY, a = o - l * this.view.height;
    }
    this.projectionMatrix.makeOrthographic(r, s, o, a, this.near, this.far, this.coordinateSystem, this.reversedDepth), this.projectionMatrixInverse.copy(this.projectionMatrix).invert();
  }
  toJSON(e) {
    const t = super.toJSON(e);
    return t.object.zoom = this.zoom, t.object.left = this.left, t.object.right = this.right, t.object.top = this.top, t.object.bottom = this.bottom, t.object.near = this.near, t.object.far = this.far, this.view !== null && (t.object.view = Object.assign({}, this.view)), t;
  }
}, Kh = class extends Zh {
  constructor() {
    super(new bs(-5, 5, 5, -5, 0.5, 500)), this.isDirectionalLightShadow = !0;
  }
}, mo = class extends Na {
  constructor(e, t) {
    super(e, t), this.isDirectionalLight = !0, this.type = "DirectionalLight", this.position.copy(Et.DEFAULT_UP), this.updateMatrix(), this.target = new Et(), this.shadow = new Kh();
  }
  dispose() {
    this.shadow.dispose();
  }
  copy(e) {
    return super.copy(e), this.target = e.target.clone(), this.shadow = e.shadow.clone(), this;
  }
}, jh = class extends zt {
  constructor(e = []) {
    super(), this.isArrayCamera = !0, this.isMultiViewCamera = !1, this.cameras = e;
  }
}, Jh = "\\[\\]\\.:\\/", $h = /* @__PURE__ */ new RegExp("[\\[\\]\\.:\\/]", "g"), As = "[^\\[\\]\\.:\\/]", Qh = "[^" + Jh.replace("\\.", "") + "]", eu = /* @__PURE__ */ /((?:WC+[\/:])*)/.source.replace("WC", As), tu = /* @__PURE__ */ /(WCOD+)?/.source.replace("WCOD", Qh), nu = /* @__PURE__ */ /(?:\.(WC+)(?:\[(.+)\])?)?/.source.replace("WC", As), iu = /* @__PURE__ */ /\.(WC+)(?:\[(.+)\])?/.source.replace("WC", As), ru = new RegExp("^" + eu + tu + nu + iu + "$"), su = [
  "material",
  "materials",
  "bones",
  "map"
], ou = class {
  constructor(e, t, n) {
    const i = n || at.parseTrackName(t);
    this._targetGroup = e, this._bindings = e.subscribe_(t, i);
  }
  getValue(e, t) {
    this.bind();
    const n = this._targetGroup.nCachedObjects_, i = this._bindings[n];
    i !== void 0 && i.getValue(e, t);
  }
  setValue(e, t) {
    const n = this._bindings;
    for (let i = this._targetGroup.nCachedObjects_, r = n.length; i !== r; ++i) n[i].setValue(e, t);
  }
  bind() {
    const e = this._bindings;
    for (let t = this._targetGroup.nCachedObjects_, n = e.length; t !== n; ++t) e[t].bind();
  }
  unbind() {
    const e = this._bindings;
    for (let t = this._targetGroup.nCachedObjects_, n = e.length; t !== n; ++t) e[t].unbind();
  }
}, at = class Xn {
  constructor(t, n, i) {
    this.path = n, this.parsedPath = i || Xn.parseTrackName(n), this.node = Xn.findNode(t, this.parsedPath.nodeName), this.rootNode = t, this.getValue = this._getValue_unbound, this.setValue = this._setValue_unbound;
  }
  static create(t, n, i) {
    return t && t.isAnimationObjectGroup ? new Xn.Composite(t, n, i) : new Xn(t, n, i);
  }
  static sanitizeNodeName(t) {
    return t.replace(/\s/g, "_").replace($h, "");
  }
  static parseTrackName(t) {
    const n = ru.exec(t);
    if (n === null) throw new Error("PropertyBinding: Cannot parse trackName: " + t);
    const i = {
      nodeName: n[2],
      objectName: n[3],
      objectIndex: n[4],
      propertyName: n[5],
      propertyIndex: n[6]
    }, r = i.nodeName && i.nodeName.lastIndexOf(".");
    if (r !== void 0 && r !== -1) {
      const s = i.nodeName.substring(r + 1);
      su.indexOf(s) !== -1 && (i.nodeName = i.nodeName.substring(0, r), i.objectName = s);
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
      const i = function(s) {
        for (let o = 0; o < s.length; o++) {
          const a = s[o];
          if (a.name === n || a.uuid === n) return a;
          const c = i(a.children);
          if (c) return c;
        }
        return null;
      }, r = i(t.children);
      if (r) return r;
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
    for (let r = 0, s = i.length; r !== s; ++r) t[n++] = i[r];
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
    for (let r = 0, s = i.length; r !== s; ++r) i[r] = t[n++];
  }
  _setValue_array_setNeedsUpdate(t, n) {
    const i = this.resolvedProperty;
    for (let r = 0, s = i.length; r !== s; ++r) i[r] = t[n++];
    this.targetObject.needsUpdate = !0;
  }
  _setValue_array_setMatrixWorldNeedsUpdate(t, n) {
    const i = this.resolvedProperty;
    for (let r = 0, s = i.length; r !== s; ++r) i[r] = t[n++];
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
    const n = this.parsedPath, i = n.objectName, r = n.propertyName;
    let s = n.propertyIndex;
    if (t || (t = Xn.findNode(this.rootNode, n.nodeName), this.node = t), this.getValue = this._getValue_unavailable, this.setValue = this._setValue_unavailable, !t) {
      console.warn("THREE.PropertyBinding: No target node found for track: " + this.path + ".");
      return;
    }
    if (i) {
      let l = n.objectIndex;
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
          for (let h = 0; h < t.length; h++) if (t[h].name === l) {
            l = h;
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
      if (l !== void 0) {
        if (t[l] === void 0) {
          console.error("THREE.PropertyBinding: Trying to bind to objectIndex of objectName, but is undefined.", this, t);
          return;
        }
        t = t[l];
      }
    }
    const o = t[r];
    if (o === void 0) {
      const l = n.nodeName;
      console.error("THREE.PropertyBinding: Trying to update property for track: " + l + "." + r + " but it wasn't found.", t);
      return;
    }
    let a = this.Versioning.None;
    this.targetObject = t, t.isMaterial === !0 ? a = this.Versioning.NeedsUpdate : t.isObject3D === !0 && (a = this.Versioning.MatrixWorldNeedsUpdate);
    let c = this.BindingType.Direct;
    if (s !== void 0) {
      if (r === "morphTargetInfluences") {
        if (!t.geometry) {
          console.error("THREE.PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.", this);
          return;
        }
        if (!t.geometry.morphAttributes) {
          console.error("THREE.PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.morphAttributes.", this);
          return;
        }
        t.morphTargetDictionary[s] !== void 0 && (s = t.morphTargetDictionary[s]);
      }
      c = this.BindingType.ArrayElement, this.resolvedProperty = o, this.propertyIndex = s;
    } else o.fromArray !== void 0 && o.toArray !== void 0 ? (c = this.BindingType.HasFromToArray, this.resolvedProperty = o) : Array.isArray(o) ? (c = this.BindingType.EntireArray, this.resolvedProperty = o) : this.propertyName = r;
    this.getValue = this.GetterByBindingType[c], this.setValue = this.SetterByBindingTypeAndVersioning[c][a];
  }
  unbind() {
    this.node = null, this.getValue = this._getValue_unbound, this.setValue = this._setValue_unbound;
  }
};
at.Composite = ou;
at.prototype.BindingType = {
  Direct: 0,
  EntireArray: 1,
  ArrayElement: 2,
  HasFromToArray: 3
};
at.prototype.Versioning = {
  None: 0,
  NeedsUpdate: 1,
  MatrixWorldNeedsUpdate: 2
};
at.prototype.GetterByBindingType = [
  at.prototype._getValue_direct,
  at.prototype._getValue_array,
  at.prototype._getValue_arrayElement,
  at.prototype._getValue_toArray
];
at.prototype.SetterByBindingTypeAndVersioning = [
  [
    at.prototype._setValue_direct,
    at.prototype._setValue_direct_setNeedsUpdate,
    at.prototype._setValue_direct_setMatrixWorldNeedsUpdate
  ],
  [
    at.prototype._setValue_array,
    at.prototype._setValue_array_setNeedsUpdate,
    at.prototype._setValue_array_setMatrixWorldNeedsUpdate
  ],
  [
    at.prototype._setValue_arrayElement,
    at.prototype._setValue_arrayElement_setNeedsUpdate,
    at.prototype._setValue_arrayElement_setMatrixWorldNeedsUpdate
  ],
  [
    at.prototype._setValue_fromArray,
    at.prototype._setValue_fromArray_setNeedsUpdate,
    at.prototype._setValue_fromArray_setMatrixWorldNeedsUpdate
  ]
];
var ms = class {
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
    return this.phi = He(this.phi, 1e-6, Math.PI - 1e-6), this;
  }
  setFromVector3(e) {
    return this.setFromCartesianCoords(e.x, e.y, e.z);
  }
  setFromCartesianCoords(e, t, n) {
    return this.radius = Math.sqrt(e * e + t * t + n * n), this.radius === 0 ? (this.theta = 0, this.phi = 0) : (this.theta = Math.atan2(e, n), this.phi = Math.acos(He(t / this.radius, -1, 1))), this;
  }
  clone() {
    return new this.constructor().copy(this);
  }
}, au = class extends An {
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
function _o(e, t, n, i) {
  const r = lu(i);
  switch (n) {
    case pl:
      return e * t;
    case Zo:
      return e * t / r.components * r.byteLength;
    case _l:
      return e * t / r.components * r.byteLength;
    case gl:
      return e * t * 2 / r.components * r.byteLength;
    case vl:
      return e * t * 2 / r.components * r.byteLength;
    case ml:
      return e * t * 3 / r.components * r.byteLength;
    case $n:
      return e * t * 4 / r.components * r.byteLength;
    case xl:
      return e * t * 4 / r.components * r.byteLength;
    case yl:
    case Ml:
      return Math.floor((e + 3) / 4) * Math.floor((t + 3) / 4) * 8;
    case Sl:
    case El:
      return Math.floor((e + 3) / 4) * Math.floor((t + 3) / 4) * 16;
    case bl:
    case wl:
      return Math.max(e, 16) * Math.max(t, 8) / 4;
    case Tl:
    case Al:
      return Math.max(e, 8) * Math.max(t, 8) / 2;
    case Rl:
    case Cl:
      return Math.floor((e + 3) / 4) * Math.floor((t + 3) / 4) * 8;
    case Pl:
      return Math.floor((e + 3) / 4) * Math.floor((t + 3) / 4) * 16;
    case Ll:
      return Math.floor((e + 3) / 4) * Math.floor((t + 3) / 4) * 16;
    case Dl:
      return Math.floor((e + 4) / 5) * Math.floor((t + 3) / 4) * 16;
    case Il:
      return Math.floor((e + 4) / 5) * Math.floor((t + 4) / 5) * 16;
    case Ul:
      return Math.floor((e + 5) / 6) * Math.floor((t + 4) / 5) * 16;
    case Nl:
      return Math.floor((e + 5) / 6) * Math.floor((t + 5) / 6) * 16;
    case Ol:
      return Math.floor((e + 7) / 8) * Math.floor((t + 4) / 5) * 16;
    case Fl:
      return Math.floor((e + 7) / 8) * Math.floor((t + 5) / 6) * 16;
    case Bl:
      return Math.floor((e + 7) / 8) * Math.floor((t + 7) / 8) * 16;
    case zl:
      return Math.floor((e + 9) / 10) * Math.floor((t + 4) / 5) * 16;
    case Vl:
      return Math.floor((e + 9) / 10) * Math.floor((t + 5) / 6) * 16;
    case Hl:
      return Math.floor((e + 9) / 10) * Math.floor((t + 7) / 8) * 16;
    case kl:
      return Math.floor((e + 9) / 10) * Math.floor((t + 9) / 10) * 16;
    case Gl:
      return Math.floor((e + 11) / 12) * Math.floor((t + 9) / 10) * 16;
    case Wl:
      return Math.floor((e + 11) / 12) * Math.floor((t + 11) / 12) * 16;
    case Xl:
    case Yl:
    case ql:
      return Math.ceil(e / 4) * Math.ceil(t / 4) * 16;
    case Zl:
    case Kl:
      return Math.ceil(e / 4) * Math.ceil(t / 4) * 8;
    case jl:
    case Jl:
      return Math.ceil(e / 4) * Math.ceil(t / 4) * 16;
  }
  throw new Error(`Unable to determine texture byte length for ${n} format.`);
}
function lu(e) {
  switch (e) {
    case Jn:
    case sl:
      return {
        byteLength: 1,
        components: 1
      };
    case al:
    case ol:
    case vs:
      return {
        byteLength: 2,
        components: 1
      };
    case cl:
    case hl:
      return {
        byteLength: 2,
        components: 4
      };
    case gs:
    case ll:
    case xr:
      return {
        byteLength: 4,
        components: 1
      };
    case dl:
    case fl:
      return {
        byteLength: 4,
        components: 3
      };
  }
  throw new Error(`Unknown texture type ${e}.`);
}
typeof __THREE_DEVTOOLS__ < "u" && __THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register", { detail: { revision: "180" } }));
typeof window < "u" && (window.__THREE__ ? console.warn("WARNING: Multiple instances of Three.js being imported.") : window.__THREE__ = "180");
function Oa() {
  let e = null, t = !1, n = null, i = null;
  function r(s, o) {
    n(s, o), i = e.requestAnimationFrame(r);
  }
  return {
    start: function() {
      t !== !0 && n !== null && (i = e.requestAnimationFrame(r), t = !0);
    },
    stop: function() {
      e.cancelAnimationFrame(i), t = !1;
    },
    setAnimationLoop: function(s) {
      n = s;
    },
    setContext: function(s) {
      e = s;
    }
  };
}
function cu(e) {
  const t = /* @__PURE__ */ new WeakMap();
  function n(a, c) {
    const l = a.array, h = a.usage, u = l.byteLength, f = e.createBuffer();
    e.bindBuffer(c, f), e.bufferData(c, l, h), a.onUploadCallback();
    let p;
    if (l instanceof Float32Array) p = e.FLOAT;
    else if (typeof Float16Array < "u" && l instanceof Float16Array) p = e.HALF_FLOAT;
    else if (l instanceof Uint16Array) a.isFloat16BufferAttribute ? p = e.HALF_FLOAT : p = e.UNSIGNED_SHORT;
    else if (l instanceof Int16Array) p = e.SHORT;
    else if (l instanceof Uint32Array) p = e.UNSIGNED_INT;
    else if (l instanceof Int32Array) p = e.INT;
    else if (l instanceof Int8Array) p = e.BYTE;
    else if (l instanceof Uint8Array) p = e.UNSIGNED_BYTE;
    else if (l instanceof Uint8ClampedArray) p = e.UNSIGNED_BYTE;
    else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: " + l);
    return {
      buffer: f,
      type: p,
      bytesPerElement: l.BYTES_PER_ELEMENT,
      version: a.version,
      size: u
    };
  }
  function i(a, c, l) {
    const h = c.array, u = c.updateRanges;
    if (e.bindBuffer(l, a), u.length === 0) e.bufferSubData(l, 0, h);
    else {
      u.sort((p, g) => p.start - g.start);
      let f = 0;
      for (let p = 1; p < u.length; p++) {
        const g = u[f], _ = u[p];
        _.start <= g.start + g.count + 1 ? g.count = Math.max(g.count, _.start + _.count - g.start) : (++f, u[f] = _);
      }
      u.length = f + 1;
      for (let p = 0, g = u.length; p < g; p++) {
        const _ = u[p];
        e.bufferSubData(l, _.start * h.BYTES_PER_ELEMENT, h, _.start, _.count);
      }
      c.clearUpdateRanges();
    }
    c.onUploadCallback();
  }
  function r(a) {
    return a.isInterleavedBufferAttribute && (a = a.data), t.get(a);
  }
  function s(a) {
    a.isInterleavedBufferAttribute && (a = a.data);
    const c = t.get(a);
    c && (e.deleteBuffer(c.buffer), t.delete(a));
  }
  function o(a, c) {
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
    const l = t.get(a);
    if (l === void 0) t.set(a, n(a, c));
    else if (l.version < a.version) {
      if (l.size !== a.array.byteLength) throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");
      i(l.buffer, a, c), l.version = a.version;
    }
  }
  return {
    get: r,
    remove: s,
    update: o
  };
}
var Ve = {
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
    diffuse: { value: /* @__PURE__ */ new qe(16777215) },
    opacity: { value: 1 },
    map: { value: null },
    mapTransform: { value: /* @__PURE__ */ new Xe() },
    alphaMap: { value: null },
    alphaMapTransform: { value: /* @__PURE__ */ new Xe() },
    alphaTest: { value: 0 }
  },
  specularmap: {
    specularMap: { value: null },
    specularMapTransform: { value: /* @__PURE__ */ new Xe() }
  },
  envmap: {
    envMap: { value: null },
    envMapRotation: { value: /* @__PURE__ */ new Xe() },
    flipEnvMap: { value: -1 },
    reflectivity: { value: 1 },
    ior: { value: 1.5 },
    refractionRatio: { value: 0.98 }
  },
  aomap: {
    aoMap: { value: null },
    aoMapIntensity: { value: 1 },
    aoMapTransform: { value: /* @__PURE__ */ new Xe() }
  },
  lightmap: {
    lightMap: { value: null },
    lightMapIntensity: { value: 1 },
    lightMapTransform: { value: /* @__PURE__ */ new Xe() }
  },
  bumpmap: {
    bumpMap: { value: null },
    bumpMapTransform: { value: /* @__PURE__ */ new Xe() },
    bumpScale: { value: 1 }
  },
  normalmap: {
    normalMap: { value: null },
    normalMapTransform: { value: /* @__PURE__ */ new Xe() },
    normalScale: { value: /* @__PURE__ */ new se(1, 1) }
  },
  displacementmap: {
    displacementMap: { value: null },
    displacementMapTransform: { value: /* @__PURE__ */ new Xe() },
    displacementScale: { value: 1 },
    displacementBias: { value: 0 }
  },
  emissivemap: {
    emissiveMap: { value: null },
    emissiveMapTransform: { value: /* @__PURE__ */ new Xe() }
  },
  metalnessmap: {
    metalnessMap: { value: null },
    metalnessMapTransform: { value: /* @__PURE__ */ new Xe() }
  },
  roughnessmap: {
    roughnessMap: { value: null },
    roughnessMapTransform: { value: /* @__PURE__ */ new Xe() }
  },
  gradientmap: { gradientMap: { value: null } },
  fog: {
    fogDensity: { value: 25e-5 },
    fogNear: { value: 1 },
    fogFar: { value: 2e3 },
    fogColor: { value: /* @__PURE__ */ new qe(16777215) }
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
    diffuse: { value: /* @__PURE__ */ new qe(16777215) },
    opacity: { value: 1 },
    size: { value: 1 },
    scale: { value: 1 },
    map: { value: null },
    alphaMap: { value: null },
    alphaMapTransform: { value: /* @__PURE__ */ new Xe() },
    alphaTest: { value: 0 },
    uvTransform: { value: /* @__PURE__ */ new Xe() }
  },
  sprite: {
    diffuse: { value: /* @__PURE__ */ new qe(16777215) },
    opacity: { value: 1 },
    center: { value: /* @__PURE__ */ new se(0.5, 0.5) },
    rotation: { value: 0 },
    map: { value: null },
    mapTransform: { value: /* @__PURE__ */ new Xe() },
    alphaMap: { value: null },
    alphaMapTransform: { value: /* @__PURE__ */ new Xe() },
    alphaTest: { value: 0 }
  }
}, Xt = {
  basic: {
    uniforms: /* @__PURE__ */ Mt([
      me.common,
      me.specularmap,
      me.envmap,
      me.aomap,
      me.lightmap,
      me.fog
    ]),
    vertexShader: Ve.meshbasic_vert,
    fragmentShader: Ve.meshbasic_frag
  },
  lambert: {
    uniforms: /* @__PURE__ */ Mt([
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
      { emissive: { value: /* @__PURE__ */ new qe(0) } }
    ]),
    vertexShader: Ve.meshlambert_vert,
    fragmentShader: Ve.meshlambert_frag
  },
  phong: {
    uniforms: /* @__PURE__ */ Mt([
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
        emissive: { value: /* @__PURE__ */ new qe(0) },
        specular: { value: /* @__PURE__ */ new qe(1118481) },
        shininess: { value: 30 }
      }
    ]),
    vertexShader: Ve.meshphong_vert,
    fragmentShader: Ve.meshphong_frag
  },
  standard: {
    uniforms: /* @__PURE__ */ Mt([
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
        emissive: { value: /* @__PURE__ */ new qe(0) },
        roughness: { value: 1 },
        metalness: { value: 0 },
        envMapIntensity: { value: 1 }
      }
    ]),
    vertexShader: Ve.meshphysical_vert,
    fragmentShader: Ve.meshphysical_frag
  },
  toon: {
    uniforms: /* @__PURE__ */ Mt([
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
      { emissive: { value: /* @__PURE__ */ new qe(0) } }
    ]),
    vertexShader: Ve.meshtoon_vert,
    fragmentShader: Ve.meshtoon_frag
  },
  matcap: {
    uniforms: /* @__PURE__ */ Mt([
      me.common,
      me.bumpmap,
      me.normalmap,
      me.displacementmap,
      me.fog,
      { matcap: { value: null } }
    ]),
    vertexShader: Ve.meshmatcap_vert,
    fragmentShader: Ve.meshmatcap_frag
  },
  points: {
    uniforms: /* @__PURE__ */ Mt([me.points, me.fog]),
    vertexShader: Ve.points_vert,
    fragmentShader: Ve.points_frag
  },
  dashed: {
    uniforms: /* @__PURE__ */ Mt([
      me.common,
      me.fog,
      {
        scale: { value: 1 },
        dashSize: { value: 1 },
        totalSize: { value: 2 }
      }
    ]),
    vertexShader: Ve.linedashed_vert,
    fragmentShader: Ve.linedashed_frag
  },
  depth: {
    uniforms: /* @__PURE__ */ Mt([me.common, me.displacementmap]),
    vertexShader: Ve.depth_vert,
    fragmentShader: Ve.depth_frag
  },
  normal: {
    uniforms: /* @__PURE__ */ Mt([
      me.common,
      me.bumpmap,
      me.normalmap,
      me.displacementmap,
      { opacity: { value: 1 } }
    ]),
    vertexShader: Ve.meshnormal_vert,
    fragmentShader: Ve.meshnormal_frag
  },
  sprite: {
    uniforms: /* @__PURE__ */ Mt([me.sprite, me.fog]),
    vertexShader: Ve.sprite_vert,
    fragmentShader: Ve.sprite_frag
  },
  background: {
    uniforms: {
      uvTransform: { value: /* @__PURE__ */ new Xe() },
      t2D: { value: null },
      backgroundIntensity: { value: 1 }
    },
    vertexShader: Ve.background_vert,
    fragmentShader: Ve.background_frag
  },
  backgroundCube: {
    uniforms: {
      envMap: { value: null },
      flipEnvMap: { value: -1 },
      backgroundBlurriness: { value: 0 },
      backgroundIntensity: { value: 1 },
      backgroundRotation: { value: /* @__PURE__ */ new Xe() }
    },
    vertexShader: Ve.backgroundCube_vert,
    fragmentShader: Ve.backgroundCube_frag
  },
  cube: {
    uniforms: {
      tCube: { value: null },
      tFlip: { value: -1 },
      opacity: { value: 1 }
    },
    vertexShader: Ve.cube_vert,
    fragmentShader: Ve.cube_frag
  },
  equirect: {
    uniforms: { tEquirect: { value: null } },
    vertexShader: Ve.equirect_vert,
    fragmentShader: Ve.equirect_frag
  },
  distanceRGBA: {
    uniforms: /* @__PURE__ */ Mt([
      me.common,
      me.displacementmap,
      {
        referencePosition: { value: /* @__PURE__ */ new D() },
        nearDistance: { value: 1 },
        farDistance: { value: 1e3 }
      }
    ]),
    vertexShader: Ve.distanceRGBA_vert,
    fragmentShader: Ve.distanceRGBA_frag
  },
  shadow: {
    uniforms: /* @__PURE__ */ Mt([
      me.lights,
      me.fog,
      {
        color: { value: /* @__PURE__ */ new qe(0) },
        opacity: { value: 1 }
      }
    ]),
    vertexShader: Ve.shadow_vert,
    fragmentShader: Ve.shadow_frag
  }
};
Xt.physical = {
  uniforms: /* @__PURE__ */ Mt([Xt.standard.uniforms, {
    clearcoat: { value: 0 },
    clearcoatMap: { value: null },
    clearcoatMapTransform: { value: /* @__PURE__ */ new Xe() },
    clearcoatNormalMap: { value: null },
    clearcoatNormalMapTransform: { value: /* @__PURE__ */ new Xe() },
    clearcoatNormalScale: { value: /* @__PURE__ */ new se(1, 1) },
    clearcoatRoughness: { value: 0 },
    clearcoatRoughnessMap: { value: null },
    clearcoatRoughnessMapTransform: { value: /* @__PURE__ */ new Xe() },
    dispersion: { value: 0 },
    iridescence: { value: 0 },
    iridescenceMap: { value: null },
    iridescenceMapTransform: { value: /* @__PURE__ */ new Xe() },
    iridescenceIOR: { value: 1.3 },
    iridescenceThicknessMinimum: { value: 100 },
    iridescenceThicknessMaximum: { value: 400 },
    iridescenceThicknessMap: { value: null },
    iridescenceThicknessMapTransform: { value: /* @__PURE__ */ new Xe() },
    sheen: { value: 0 },
    sheenColor: { value: /* @__PURE__ */ new qe(0) },
    sheenColorMap: { value: null },
    sheenColorMapTransform: { value: /* @__PURE__ */ new Xe() },
    sheenRoughness: { value: 1 },
    sheenRoughnessMap: { value: null },
    sheenRoughnessMapTransform: { value: /* @__PURE__ */ new Xe() },
    transmission: { value: 0 },
    transmissionMap: { value: null },
    transmissionMapTransform: { value: /* @__PURE__ */ new Xe() },
    transmissionSamplerSize: { value: /* @__PURE__ */ new se() },
    transmissionSamplerMap: { value: null },
    thickness: { value: 0 },
    thicknessMap: { value: null },
    thicknessMapTransform: { value: /* @__PURE__ */ new Xe() },
    attenuationDistance: { value: 0 },
    attenuationColor: { value: /* @__PURE__ */ new qe(0) },
    specularColor: { value: /* @__PURE__ */ new qe(1, 1, 1) },
    specularColorMap: { value: null },
    specularColorMapTransform: { value: /* @__PURE__ */ new Xe() },
    specularIntensity: { value: 1 },
    specularIntensityMap: { value: null },
    specularIntensityMapTransform: { value: /* @__PURE__ */ new Xe() },
    anisotropyVector: { value: /* @__PURE__ */ new se() },
    anisotropyMap: { value: null },
    anisotropyMapTransform: { value: /* @__PURE__ */ new Xe() }
  }]),
  vertexShader: Ve.meshphysical_vert,
  fragmentShader: Ve.meshphysical_frag
};
var rr = {
  r: 0,
  b: 0,
  g: 0
}, xn = /* @__PURE__ */ new un(), hu = /* @__PURE__ */ new nt();
function uu(e, t, n, i, r, s, o) {
  const a = new qe(0);
  let c = s === !0 ? 0 : 1, l, h, u = null, f = 0, p = null;
  function g(v) {
    let S = v.isScene === !0 ? v.background : null;
    return S && S.isTexture && (S = (v.backgroundBlurriness > 0 ? n : t).get(S)), S;
  }
  function _(v) {
    let S = !1;
    const b = g(v);
    b === null ? d(a, c) : b && b.isColor && (d(b, 1), S = !0);
    const w = e.xr.getEnvironmentBlendMode();
    w === "additive" ? i.buffers.color.setClear(0, 0, 0, 1, o) : w === "alpha-blend" && i.buffers.color.setClear(0, 0, 0, 0, o), (e.autoClear || S) && (i.buffers.depth.setTest(!0), i.buffers.depth.setMask(!0), i.buffers.color.setMask(!0), e.clear(e.autoClearColor, e.autoClearDepth, e.autoClearStencil));
  }
  function m(v, S) {
    const b = g(S);
    b && (b.isCubeTexture || b.mapping === 306) ? (h === void 0 && (h = new Rt(new Ri(1, 1, 1), new dn({
      name: "BackgroundCubeMaterial",
      uniforms: ei(Xt.backgroundCube.uniforms),
      vertexShader: Xt.backgroundCube.vertexShader,
      fragmentShader: Xt.backgroundCube.fragmentShader,
      side: 1,
      depthTest: !1,
      depthWrite: !1,
      fog: !1,
      allowOverride: !1
    })), h.geometry.deleteAttribute("normal"), h.geometry.deleteAttribute("uv"), h.onBeforeRender = function(w, C, P) {
      this.matrixWorld.copyPosition(P.matrixWorld);
    }, Object.defineProperty(h.material, "envMap", { get: function() {
      return this.uniforms.envMap.value;
    } }), r.update(h)), xn.copy(S.backgroundRotation), xn.x *= -1, xn.y *= -1, xn.z *= -1, b.isCubeTexture && b.isRenderTargetTexture === !1 && (xn.y *= -1, xn.z *= -1), h.material.uniforms.envMap.value = b, h.material.uniforms.flipEnvMap.value = b.isCubeTexture && b.isRenderTargetTexture === !1 ? -1 : 1, h.material.uniforms.backgroundBlurriness.value = S.backgroundBlurriness, h.material.uniforms.backgroundIntensity.value = S.backgroundIntensity, h.material.uniforms.backgroundRotation.value.setFromMatrix4(hu.makeRotationFromEuler(xn)), h.material.toneMapped = je.getTransfer(b.colorSpace) !== pr, (u !== b || f !== b.version || p !== e.toneMapping) && (h.material.needsUpdate = !0, u = b, f = b.version, p = e.toneMapping), h.layers.enableAll(), v.unshift(h, h.geometry, h.material, 0, 0, null)) : b && b.isTexture && (l === void 0 && (l = new Rt(new Pa(2, 2), new dn({
      name: "BackgroundMaterial",
      uniforms: ei(Xt.background.uniforms),
      vertexShader: Xt.background.vertexShader,
      fragmentShader: Xt.background.fragmentShader,
      side: 0,
      depthTest: !1,
      depthWrite: !1,
      fog: !1,
      allowOverride: !1
    })), l.geometry.deleteAttribute("normal"), Object.defineProperty(l.material, "map", { get: function() {
      return this.uniforms.t2D.value;
    } }), r.update(l)), l.material.uniforms.t2D.value = b, l.material.uniforms.backgroundIntensity.value = S.backgroundIntensity, l.material.toneMapped = je.getTransfer(b.colorSpace) !== pr, b.matrixAutoUpdate === !0 && b.updateMatrix(), l.material.uniforms.uvTransform.value.copy(b.matrix), (u !== b || f !== b.version || p !== e.toneMapping) && (l.material.needsUpdate = !0, u = b, f = b.version, p = e.toneMapping), l.layers.enableAll(), v.unshift(l, l.geometry, l.material, 0, 0, null));
  }
  function d(v, S) {
    v.getRGB(rr, ca(e)), i.buffers.color.setClear(rr.r, rr.g, rr.b, S, o);
  }
  function T() {
    h !== void 0 && (h.geometry.dispose(), h.material.dispose(), h = void 0), l !== void 0 && (l.geometry.dispose(), l.material.dispose(), l = void 0);
  }
  return {
    getClearColor: function() {
      return a;
    },
    setClearColor: function(v, S = 1) {
      a.set(v), c = S, d(a, c);
    },
    getClearAlpha: function() {
      return c;
    },
    setClearAlpha: function(v) {
      c = v, d(a, c);
    },
    render: _,
    addToRenderList: m,
    dispose: T
  };
}
function du(e, t) {
  const n = e.getParameter(e.MAX_VERTEX_ATTRIBS), i = {}, r = f(null);
  let s = r, o = !1;
  function a(y, R, z, k, B) {
    let Z = !1;
    const W = u(k, z, R);
    s !== W && (s = W, l(s.object)), Z = p(y, k, z, B), Z && g(y, k, z, B), B !== null && t.update(B, e.ELEMENT_ARRAY_BUFFER), (Z || o) && (o = !1, S(y, R, z, k), B !== null && e.bindBuffer(e.ELEMENT_ARRAY_BUFFER, t.get(B).buffer));
  }
  function c() {
    return e.createVertexArray();
  }
  function l(y) {
    return e.bindVertexArray(y);
  }
  function h(y) {
    return e.deleteVertexArray(y);
  }
  function u(y, R, z) {
    const k = z.wireframe === !0;
    let B = i[y.id];
    B === void 0 && (B = {}, i[y.id] = B);
    let Z = B[R.id];
    Z === void 0 && (Z = {}, B[R.id] = Z);
    let W = Z[k];
    return W === void 0 && (W = f(c()), Z[k] = W), W;
  }
  function f(y) {
    const R = [], z = [], k = [];
    for (let B = 0; B < n; B++)
      R[B] = 0, z[B] = 0, k[B] = 0;
    return {
      geometry: null,
      program: null,
      wireframe: !1,
      newAttributes: R,
      enabledAttributes: z,
      attributeDivisors: k,
      object: y,
      attributes: {},
      index: null
    };
  }
  function p(y, R, z, k) {
    const B = s.attributes, Z = R.attributes;
    let W = 0;
    const Q = z.getAttributes();
    for (const G in Q) if (Q[G].location >= 0) {
      const oe = B[G];
      let fe = Z[G];
      if (fe === void 0 && (G === "instanceMatrix" && y.instanceMatrix && (fe = y.instanceMatrix), G === "instanceColor" && y.instanceColor && (fe = y.instanceColor)), oe === void 0 || oe.attribute !== fe || fe && oe.data !== fe.data) return !0;
      W++;
    }
    return s.attributesNum !== W || s.index !== k;
  }
  function g(y, R, z, k) {
    const B = {}, Z = R.attributes;
    let W = 0;
    const Q = z.getAttributes();
    for (const G in Q) if (Q[G].location >= 0) {
      let oe = Z[G];
      oe === void 0 && (G === "instanceMatrix" && y.instanceMatrix && (oe = y.instanceMatrix), G === "instanceColor" && y.instanceColor && (oe = y.instanceColor));
      const fe = {};
      fe.attribute = oe, oe && oe.data && (fe.data = oe.data), B[G] = fe, W++;
    }
    s.attributes = B, s.attributesNum = W, s.index = k;
  }
  function _() {
    const y = s.newAttributes;
    for (let R = 0, z = y.length; R < z; R++) y[R] = 0;
  }
  function m(y) {
    d(y, 0);
  }
  function d(y, R) {
    const z = s.newAttributes, k = s.enabledAttributes, B = s.attributeDivisors;
    z[y] = 1, k[y] === 0 && (e.enableVertexAttribArray(y), k[y] = 1), B[y] !== R && (e.vertexAttribDivisor(y, R), B[y] = R);
  }
  function T() {
    const y = s.newAttributes, R = s.enabledAttributes;
    for (let z = 0, k = R.length; z < k; z++) R[z] !== y[z] && (e.disableVertexAttribArray(z), R[z] = 0);
  }
  function v(y, R, z, k, B, Z, W) {
    W === !0 ? e.vertexAttribIPointer(y, R, z, B, Z) : e.vertexAttribPointer(y, R, z, k, B, Z);
  }
  function S(y, R, z, k) {
    _();
    const B = k.attributes, Z = z.getAttributes(), W = R.defaultAttributeValues;
    for (const Q in Z) {
      const G = Z[Q];
      if (G.location >= 0) {
        let oe = B[Q];
        if (oe === void 0 && (Q === "instanceMatrix" && y.instanceMatrix && (oe = y.instanceMatrix), Q === "instanceColor" && y.instanceColor && (oe = y.instanceColor)), oe !== void 0) {
          const fe = oe.normalized, Le = oe.itemSize, Ue = t.get(oe);
          if (Ue === void 0) continue;
          const Je = Ue.buffer, Ye = Ue.type, F = Ue.bytesPerElement, X = Ye === e.INT || Ye === e.UNSIGNED_INT || oe.gpuType === 1013;
          if (oe.isInterleavedBufferAttribute) {
            const ee = oe.data, pe = ee.stride, Pe = oe.offset;
            if (ee.isInstancedInterleavedBuffer) {
              for (let ye = 0; ye < G.locationSize; ye++) d(G.location + ye, ee.meshPerAttribute);
              y.isInstancedMesh !== !0 && k._maxInstanceCount === void 0 && (k._maxInstanceCount = ee.meshPerAttribute * ee.count);
            } else for (let ye = 0; ye < G.locationSize; ye++) m(G.location + ye);
            e.bindBuffer(e.ARRAY_BUFFER, Je);
            for (let ye = 0; ye < G.locationSize; ye++) v(G.location + ye, Le / G.locationSize, Ye, fe, pe * F, (Pe + Le / G.locationSize * ye) * F, X);
          } else {
            if (oe.isInstancedBufferAttribute) {
              for (let ee = 0; ee < G.locationSize; ee++) d(G.location + ee, oe.meshPerAttribute);
              y.isInstancedMesh !== !0 && k._maxInstanceCount === void 0 && (k._maxInstanceCount = oe.meshPerAttribute * oe.count);
            } else for (let ee = 0; ee < G.locationSize; ee++) m(G.location + ee);
            e.bindBuffer(e.ARRAY_BUFFER, Je);
            for (let ee = 0; ee < G.locationSize; ee++) v(G.location + ee, Le / G.locationSize, Ye, fe, Le * F, Le / G.locationSize * ee * F, X);
          }
        } else if (W !== void 0) {
          const fe = W[Q];
          if (fe !== void 0) switch (fe.length) {
            case 2:
              e.vertexAttrib2fv(G.location, fe);
              break;
            case 3:
              e.vertexAttrib3fv(G.location, fe);
              break;
            case 4:
              e.vertexAttrib4fv(G.location, fe);
              break;
            default:
              e.vertexAttrib1fv(G.location, fe);
          }
        }
      }
    }
    T();
  }
  function b() {
    P();
    for (const y in i) {
      const R = i[y];
      for (const z in R) {
        const k = R[z];
        for (const B in k)
          h(k[B].object), delete k[B];
        delete R[z];
      }
      delete i[y];
    }
  }
  function w(y) {
    if (i[y.id] === void 0) return;
    const R = i[y.id];
    for (const z in R) {
      const k = R[z];
      for (const B in k)
        h(k[B].object), delete k[B];
      delete R[z];
    }
    delete i[y.id];
  }
  function C(y) {
    for (const R in i) {
      const z = i[R];
      if (z[y.id] === void 0) continue;
      const k = z[y.id];
      for (const B in k)
        h(k[B].object), delete k[B];
      delete z[y.id];
    }
  }
  function P() {
    E(), o = !0, s !== r && (s = r, l(s.object));
  }
  function E() {
    r.geometry = null, r.program = null, r.wireframe = !1;
  }
  return {
    setup: a,
    reset: P,
    resetDefaultState: E,
    dispose: b,
    releaseStatesOfGeometry: w,
    releaseStatesOfProgram: C,
    initAttributes: _,
    enableAttribute: m,
    disableUnusedAttributes: T
  };
}
function fu(e, t, n) {
  let i;
  function r(l) {
    i = l;
  }
  function s(l, h) {
    e.drawArrays(i, l, h), n.update(h, i, 1);
  }
  function o(l, h, u) {
    u !== 0 && (e.drawArraysInstanced(i, l, h, u), n.update(h, i, u));
  }
  function a(l, h, u) {
    if (u === 0) return;
    t.get("WEBGL_multi_draw").multiDrawArraysWEBGL(i, l, 0, h, 0, u);
    let f = 0;
    for (let p = 0; p < u; p++) f += h[p];
    n.update(f, i, 1);
  }
  function c(l, h, u, f) {
    if (u === 0) return;
    const p = t.get("WEBGL_multi_draw");
    if (p === null) for (let g = 0; g < l.length; g++) o(l[g], h[g], f[g]);
    else {
      p.multiDrawArraysInstancedWEBGL(i, l, 0, h, 0, f, 0, u);
      let g = 0;
      for (let _ = 0; _ < u; _++) g += h[_] * f[_];
      n.update(g, i, 1);
    }
  }
  this.setMode = r, this.render = s, this.renderInstances = o, this.renderMultiDraw = a, this.renderMultiDrawInstances = c;
}
function pu(e, t, n, i) {
  let r;
  function s() {
    if (r !== void 0) return r;
    if (t.has("EXT_texture_filter_anisotropic") === !0) {
      const C = t.get("EXT_texture_filter_anisotropic");
      r = e.getParameter(C.MAX_TEXTURE_MAX_ANISOTROPY_EXT);
    } else r = 0;
    return r;
  }
  function o(C) {
    return !(C !== 1023 && i.convert(C) !== e.getParameter(e.IMPLEMENTATION_COLOR_READ_FORMAT));
  }
  function a(C) {
    const P = C === 1016 && (t.has("EXT_color_buffer_half_float") || t.has("EXT_color_buffer_float"));
    return !(C !== 1009 && i.convert(C) !== e.getParameter(e.IMPLEMENTATION_COLOR_READ_TYPE) && C !== 1015 && !P);
  }
  function c(C) {
    if (C === "highp") {
      if (e.getShaderPrecisionFormat(e.VERTEX_SHADER, e.HIGH_FLOAT).precision > 0 && e.getShaderPrecisionFormat(e.FRAGMENT_SHADER, e.HIGH_FLOAT).precision > 0) return "highp";
      C = "mediump";
    }
    return C === "mediump" && e.getShaderPrecisionFormat(e.VERTEX_SHADER, e.MEDIUM_FLOAT).precision > 0 && e.getShaderPrecisionFormat(e.FRAGMENT_SHADER, e.MEDIUM_FLOAT).precision > 0 ? "mediump" : "lowp";
  }
  let l = n.precision !== void 0 ? n.precision : "highp";
  const h = c(l);
  h !== l && (console.warn("THREE.WebGLRenderer:", l, "not supported, using", h, "instead."), l = h);
  const u = n.logarithmicDepthBuffer === !0, f = n.reversedDepthBuffer === !0 && t.has("EXT_clip_control"), p = e.getParameter(e.MAX_TEXTURE_IMAGE_UNITS), g = e.getParameter(e.MAX_VERTEX_TEXTURE_IMAGE_UNITS), _ = e.getParameter(e.MAX_TEXTURE_SIZE), m = e.getParameter(e.MAX_CUBE_MAP_TEXTURE_SIZE), d = e.getParameter(e.MAX_VERTEX_ATTRIBS), T = e.getParameter(e.MAX_VERTEX_UNIFORM_VECTORS), v = e.getParameter(e.MAX_VARYING_VECTORS), S = e.getParameter(e.MAX_FRAGMENT_UNIFORM_VECTORS), b = g > 0, w = e.getParameter(e.MAX_SAMPLES);
  return {
    isWebGL2: !0,
    getMaxAnisotropy: s,
    getMaxPrecision: c,
    textureFormatReadable: o,
    textureTypeReadable: a,
    precision: l,
    logarithmicDepthBuffer: u,
    reversedDepthBuffer: f,
    maxTextures: p,
    maxVertexTextures: g,
    maxTextureSize: _,
    maxCubemapSize: m,
    maxAttributes: d,
    maxVertexUniforms: T,
    maxVaryings: v,
    maxFragmentUniforms: S,
    vertexTextures: b,
    maxSamples: w
  };
}
function mu(e) {
  const t = this;
  let n = null, i = 0, r = !1, s = !1;
  const o = new ln(), a = new Xe(), c = {
    value: null,
    needsUpdate: !1
  };
  this.uniform = c, this.numPlanes = 0, this.numIntersection = 0, this.init = function(u, f) {
    const p = u.length !== 0 || f || i !== 0 || r;
    return r = f, i = u.length, p;
  }, this.beginShadows = function() {
    s = !0, h(null);
  }, this.endShadows = function() {
    s = !1;
  }, this.setGlobalState = function(u, f) {
    n = h(u, f, 0);
  }, this.setState = function(u, f, p) {
    const g = u.clippingPlanes, _ = u.clipIntersection, m = u.clipShadows, d = e.get(u);
    if (!r || g === null || g.length === 0 || s && !m) s ? h(null) : l();
    else {
      const T = s ? 0 : i, v = T * 4;
      let S = d.clippingState || null;
      c.value = S, S = h(g, f, v, p);
      for (let b = 0; b !== v; ++b) S[b] = n[b];
      d.clippingState = S, this.numIntersection = _ ? this.numPlanes : 0, this.numPlanes += T;
    }
  };
  function l() {
    c.value !== n && (c.value = n, c.needsUpdate = i > 0), t.numPlanes = i, t.numIntersection = 0;
  }
  function h(u, f, p, g) {
    const _ = u !== null ? u.length : 0;
    let m = null;
    if (_ !== 0) {
      if (m = c.value, g !== !0 || m === null) {
        const d = p + _ * 4, T = f.matrixWorldInverse;
        a.getNormalMatrix(T), (m === null || m.length < d) && (m = new Float32Array(d));
        for (let v = 0, S = p; v !== _; ++v, S += 4)
          o.copy(u[v]).applyMatrix4(T, a), o.normal.toArray(m, S), m[S + 3] = o.constant;
      }
      c.value = m, c.needsUpdate = !0;
    }
    return t.numPlanes = _, t.numIntersection = 0, m;
  }
}
function _u(e) {
  let t = /* @__PURE__ */ new WeakMap();
  function n(o, a) {
    return a === 303 ? o.mapping = 301 : a === 304 && (o.mapping = 302), o;
  }
  function i(o) {
    if (o && o.isTexture) {
      const a = o.mapping;
      if (a === 303 || a === 304) if (t.has(o)) {
        const c = t.get(o).texture;
        return n(c, o.mapping);
      } else {
        const c = o.image;
        if (c && c.height > 0) {
          const l = new Hc(c.height);
          return l.fromEquirectangularTexture(e, o), t.set(o, l), o.addEventListener("dispose", r), n(l.texture, o.mapping);
        } else return null;
      }
    }
    return o;
  }
  function r(o) {
    const a = o.target;
    a.removeEventListener("dispose", r);
    const c = t.get(a);
    c !== void 0 && (t.delete(a), c.dispose());
  }
  function s() {
    t = /* @__PURE__ */ new WeakMap();
  }
  return {
    get: i,
    dispose: s
  };
}
var Zn = 4, go = [
  0.125,
  0.215,
  0.35,
  0.446,
  0.526,
  0.582
], Sn = 20, Qr = /* @__PURE__ */ new bs(), vo = /* @__PURE__ */ new qe(), es = null, ts = 0, ns = 0, is = !1, Mn = (1 + Math.sqrt(5)) / 2, kn = 1 / Mn, xo = [
  /* @__PURE__ */ new D(-Mn, kn, 0),
  /* @__PURE__ */ new D(Mn, kn, 0),
  /* @__PURE__ */ new D(-kn, 0, Mn),
  /* @__PURE__ */ new D(kn, 0, Mn),
  /* @__PURE__ */ new D(0, Mn, -kn),
  /* @__PURE__ */ new D(0, Mn, kn),
  /* @__PURE__ */ new D(-1, 1, -1),
  /* @__PURE__ */ new D(1, 1, -1),
  /* @__PURE__ */ new D(-1, 1, 1),
  /* @__PURE__ */ new D(1, 1, 1)
], gu = /* @__PURE__ */ new D(), yo = class {
  constructor(e) {
    this._renderer = e, this._pingPongRenderTarget = null, this._lodMax = 0, this._cubeSize = 0, this._lodPlanes = [], this._sizeLods = [], this._sigmas = [], this._blurMaterial = null, this._cubemapMaterial = null, this._equirectMaterial = null, this._compileMaterial(this._blurMaterial);
  }
  fromScene(e, t = 0, n = 0.1, i = 100, r = {}) {
    const { size: s = 256, position: o = gu } = r;
    es = this._renderer.getRenderTarget(), ts = this._renderer.getActiveCubeFace(), ns = this._renderer.getActiveMipmapLevel(), is = this._renderer.xr.enabled, this._renderer.xr.enabled = !1, this._setSize(s);
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
    this._cubemapMaterial === null && (this._cubemapMaterial = Eo(), this._compileMaterial(this._cubemapMaterial));
  }
  compileEquirectangularShader() {
    this._equirectMaterial === null && (this._equirectMaterial = So(), this._compileMaterial(this._equirectMaterial));
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
    this._renderer.setRenderTarget(es, ts, ns), this._renderer.xr.enabled = is, e.scissorTest = !1, sr(e, 0, 0, e.width, e.height);
  }
  _fromTexture(e, t) {
    e.mapping === 301 || e.mapping === 302 ? this._setSize(e.image.length === 0 ? 16 : e.image[0].width || e.image[0].image.width) : this._setSize(e.image.width / 4), es = this._renderer.getRenderTarget(), ts = this._renderer.getActiveCubeFace(), ns = this._renderer.getActiveMipmapLevel(), is = this._renderer.xr.enabled, this._renderer.xr.enabled = !1;
    const n = t || this._allocateTargets();
    return this._textureToCubeUV(e, n), this._applyPMREM(n), this._cleanup(n), n;
  }
  _allocateTargets() {
    const e = 3 * Math.max(this._cubeSize, 112), t = 4 * this._cubeSize, n = {
      magFilter: cn,
      minFilter: cn,
      generateMipmaps: !1,
      type: vs,
      format: $n,
      colorSpace: Mi,
      depthBuffer: !1
    }, i = Mo(e, t, n);
    if (this._pingPongRenderTarget === null || this._pingPongRenderTarget.width !== e || this._pingPongRenderTarget.height !== t) {
      this._pingPongRenderTarget !== null && this._dispose(), this._pingPongRenderTarget = Mo(e, t, n);
      const { _lodMax: r } = this;
      ({ sizeLods: this._sizeLods, lodPlanes: this._lodPlanes, sigmas: this._sigmas } = vu(r)), this._blurMaterial = xu(r, e, t);
    }
    return i;
  }
  _compileMaterial(e) {
    const t = new Rt(this._lodPlanes[0], e);
    this._renderer.compile(t, Qr);
  }
  _sceneToCubeUV(e, t, n, i, r) {
    const s = new zt(90, 1, t, n), o = [
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
    ], c = this._renderer, l = c.autoClear, h = c.toneMapping;
    c.getClearColor(vo), c.toneMapping = 0, c.autoClear = !1, c.state.buffers.depth.getReversed() && (c.setRenderTarget(i), c.clearDepth(), c.setRenderTarget(null));
    const u = new ra({
      name: "PMREM.Background",
      side: 1,
      depthWrite: !1,
      depthTest: !1
    }), f = new Rt(new Ri(), u);
    let p = !1;
    const g = e.background;
    g ? g.isColor && (u.color.copy(g), e.background = null, p = !0) : (u.color.copy(vo), p = !0);
    for (let _ = 0; _ < 6; _++) {
      const m = _ % 3;
      m === 0 ? (s.up.set(0, o[_], 0), s.position.set(r.x, r.y, r.z), s.lookAt(r.x + a[_], r.y, r.z)) : m === 1 ? (s.up.set(0, 0, o[_]), s.position.set(r.x, r.y, r.z), s.lookAt(r.x, r.y + a[_], r.z)) : (s.up.set(0, o[_], 0), s.position.set(r.x, r.y, r.z), s.lookAt(r.x, r.y, r.z + a[_]));
      const d = this._cubeSize;
      sr(i, m * d, _ > 2 ? d : 0, d, d), c.setRenderTarget(i), p && c.render(f, s), c.render(e, s);
    }
    f.geometry.dispose(), f.material.dispose(), c.toneMapping = h, c.autoClear = l, e.background = g;
  }
  _textureToCubeUV(e, t) {
    const n = this._renderer, i = e.mapping === 301 || e.mapping === 302;
    i ? (this._cubemapMaterial === null && (this._cubemapMaterial = Eo()), this._cubemapMaterial.uniforms.flipEnvMap.value = e.isRenderTargetTexture === !1 ? -1 : 1) : this._equirectMaterial === null && (this._equirectMaterial = So());
    const r = i ? this._cubemapMaterial : this._equirectMaterial, s = new Rt(this._lodPlanes[0], r), o = r.uniforms;
    o.envMap.value = e;
    const a = this._cubeSize;
    sr(t, 0, 0, 3 * a, 2 * a), n.setRenderTarget(t), n.render(s, Qr);
  }
  _applyPMREM(e) {
    const t = this._renderer, n = t.autoClear;
    t.autoClear = !1;
    const i = this._lodPlanes.length;
    for (let r = 1; r < i; r++) {
      const s = Math.sqrt(this._sigmas[r] * this._sigmas[r] - this._sigmas[r - 1] * this._sigmas[r - 1]), o = xo[(i - r - 1) % xo.length];
      this._blur(e, r - 1, r, s, o);
    }
    t.autoClear = n;
  }
  _blur(e, t, n, i, r) {
    const s = this._pingPongRenderTarget;
    this._halfBlur(e, s, t, n, i, "latitudinal", r), this._halfBlur(s, e, n, n, i, "longitudinal", r);
  }
  _halfBlur(e, t, n, i, r, s, o) {
    const a = this._renderer, c = this._blurMaterial;
    s !== "latitudinal" && s !== "longitudinal" && console.error("blur direction must be either latitudinal or longitudinal!");
    const l = 3, h = new Rt(this._lodPlanes[i], c), u = c.uniforms, f = this._sizeLods[n] - 1, p = isFinite(r) ? Math.PI / (2 * f) : 2 * Math.PI / (2 * Sn - 1), g = r / p, _ = isFinite(r) ? 1 + Math.floor(l * g) : Sn;
    _ > Sn && console.warn(`sigmaRadians, ${r}, is too large and will clip, as it requested ${_} samples when the maximum is set to ${Sn}`);
    const m = [];
    let d = 0;
    for (let S = 0; S < Sn; ++S) {
      const b = S / g, w = Math.exp(-b * b / 2);
      m.push(w), S === 0 ? d += w : S < _ && (d += 2 * w);
    }
    for (let S = 0; S < m.length; S++) m[S] = m[S] / d;
    u.envMap.value = e.texture, u.samples.value = _, u.weights.value = m, u.latitudinal.value = s === "latitudinal", o && (u.poleAxis.value = o);
    const { _lodMax: T } = this;
    u.dTheta.value = p, u.mipInt.value = T - n;
    const v = this._sizeLods[i];
    sr(t, 3 * v * (i > T - Zn ? i - T + Zn : 0), 4 * (this._cubeSize - v), 3 * v, 2 * v), a.setRenderTarget(t), a.render(h, Qr);
  }
};
function vu(e) {
  const t = [], n = [], i = [];
  let r = e;
  const s = e - Zn + 1 + go.length;
  for (let o = 0; o < s; o++) {
    const a = Math.pow(2, r);
    n.push(a);
    let c = 1 / a;
    o > e - Zn ? c = go[o - e + Zn - 1] : o === 0 && (c = 0), i.push(c);
    const l = 1 / (a - 2), h = -l, u = 1 + l, f = [
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
    ], p = 6, g = 6, _ = 3, m = 2, d = 1, T = new Float32Array(_ * g * p), v = new Float32Array(m * g * p), S = new Float32Array(d * g * p);
    for (let w = 0; w < p; w++) {
      const C = w % 3 * 2 / 3 - 1, P = w > 2 ? 0 : -1, E = [
        C,
        P,
        0,
        C + 2 / 3,
        P,
        0,
        C + 2 / 3,
        P + 1,
        0,
        C,
        P,
        0,
        C + 2 / 3,
        P + 1,
        0,
        C,
        P + 1,
        0
      ];
      T.set(E, _ * g * w), v.set(f, m * g * w);
      const y = [
        w,
        w,
        w,
        w,
        w,
        w
      ];
      S.set(y, d * g * w);
    }
    const b = new It();
    b.setAttribute("position", new Vt(T, _)), b.setAttribute("uv", new Vt(v, m)), b.setAttribute("faceIndex", new Vt(S, d)), t.push(b), r > Zn && r--;
  }
  return {
    lodPlanes: t,
    sizeLods: n,
    sigmas: i
  };
}
function Mo(e, t, n) {
  const i = new Tn(e, t, n);
  return i.texture.mapping = 306, i.texture.name = "PMREM.cubeUv", i.scissorTest = !0, i;
}
function sr(e, t, n, i, r) {
  e.viewport.set(t, n, i, r), e.scissor.set(t, n, i, r);
}
function xu(e, t, n) {
  const i = new Float32Array(Sn), r = new D(0, 1, 0);
  return new dn({
    name: "SphericalGaussianBlur",
    defines: {
      n: Sn,
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
      poleAxis: { value: r }
    },
    vertexShader: ws(),
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
function So() {
  return new dn({
    name: "EquirectangularToCubeUV",
    uniforms: { envMap: { value: null } },
    vertexShader: ws(),
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
function Eo() {
  return new dn({
    name: "CubemapToCubeUV",
    uniforms: {
      envMap: { value: null },
      flipEnvMap: { value: -1 }
    },
    vertexShader: ws(),
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
function ws() {
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
function yu(e) {
  let t = /* @__PURE__ */ new WeakMap(), n = null;
  function i(a) {
    if (a && a.isTexture) {
      const c = a.mapping, l = c === 303 || c === 304, h = c === 301 || c === 302;
      if (l || h) {
        let u = t.get(a);
        const f = u !== void 0 ? u.texture.pmremVersion : 0;
        if (a.isRenderTargetTexture && a.pmremVersion !== f)
          return n === null && (n = new yo(e)), u = l ? n.fromEquirectangular(a, u) : n.fromCubemap(a, u), u.texture.pmremVersion = a.pmremVersion, t.set(a, u), u.texture;
        if (u !== void 0) return u.texture;
        {
          const p = a.image;
          return l && p && p.height > 0 || h && p && r(p) ? (n === null && (n = new yo(e)), u = l ? n.fromEquirectangular(a) : n.fromCubemap(a), u.texture.pmremVersion = a.pmremVersion, t.set(a, u), a.addEventListener("dispose", s), u.texture) : null;
        }
      }
    }
    return a;
  }
  function r(a) {
    let c = 0;
    const l = 6;
    for (let h = 0; h < l; h++) a[h] !== void 0 && c++;
    return c === l;
  }
  function s(a) {
    const c = a.target;
    c.removeEventListener("dispose", s);
    const l = t.get(c);
    l !== void 0 && (t.delete(c), l.dispose());
  }
  function o() {
    t = /* @__PURE__ */ new WeakMap(), n !== null && (n.dispose(), n = null);
  }
  return {
    get: i,
    dispose: o
  };
}
function Mu(e) {
  const t = {};
  function n(i) {
    if (t[i] !== void 0) return t[i];
    let r;
    switch (i) {
      case "WEBGL_depth_texture":
        r = e.getExtension("WEBGL_depth_texture") || e.getExtension("MOZ_WEBGL_depth_texture") || e.getExtension("WEBKIT_WEBGL_depth_texture");
        break;
      case "EXT_texture_filter_anisotropic":
        r = e.getExtension("EXT_texture_filter_anisotropic") || e.getExtension("MOZ_EXT_texture_filter_anisotropic") || e.getExtension("WEBKIT_EXT_texture_filter_anisotropic");
        break;
      case "WEBGL_compressed_texture_s3tc":
        r = e.getExtension("WEBGL_compressed_texture_s3tc") || e.getExtension("MOZ_WEBGL_compressed_texture_s3tc") || e.getExtension("WEBKIT_WEBGL_compressed_texture_s3tc");
        break;
      case "WEBGL_compressed_texture_pvrtc":
        r = e.getExtension("WEBGL_compressed_texture_pvrtc") || e.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc");
        break;
      default:
        r = e.getExtension(i);
    }
    return t[i] = r, r;
  }
  return {
    has: function(i) {
      return n(i) !== null;
    },
    init: function() {
      n("EXT_color_buffer_float"), n("WEBGL_clip_cull_distance"), n("OES_texture_float_linear"), n("EXT_color_buffer_half_float"), n("WEBGL_multisampled_render_to_texture"), n("WEBGL_render_shared_exponent");
    },
    get: function(i) {
      const r = n(i);
      return r === null && Ei("THREE.WebGLRenderer: " + i + " extension not supported."), r;
    }
  };
}
function Su(e, t, n, i) {
  const r = {}, s = /* @__PURE__ */ new WeakMap();
  function o(u) {
    const f = u.target;
    f.index !== null && t.remove(f.index);
    for (const g in f.attributes) t.remove(f.attributes[g]);
    f.removeEventListener("dispose", o), delete r[f.id];
    const p = s.get(f);
    p && (t.remove(p), s.delete(f)), i.releaseStatesOfGeometry(f), f.isInstancedBufferGeometry === !0 && delete f._maxInstanceCount, n.memory.geometries--;
  }
  function a(u, f) {
    return r[f.id] === !0 || (f.addEventListener("dispose", o), r[f.id] = !0, n.memory.geometries++), f;
  }
  function c(u) {
    const f = u.attributes;
    for (const p in f) t.update(f[p], e.ARRAY_BUFFER);
  }
  function l(u) {
    const f = [], p = u.index, g = u.attributes.position;
    let _ = 0;
    if (p !== null) {
      const T = p.array;
      _ = p.version;
      for (let v = 0, S = T.length; v < S; v += 3) {
        const b = T[v + 0], w = T[v + 1], C = T[v + 2];
        f.push(b, w, w, C, C, b);
      }
    } else if (g !== void 0) {
      const T = g.array;
      _ = g.version;
      for (let v = 0, S = T.length / 3 - 1; v < S; v += 3) {
        const b = v + 0, w = v + 1, C = v + 2;
        f.push(b, w, w, C, C, b);
      }
    } else return;
    const m = new ($o(f) ? oa : sa)(f, 1);
    m.version = _;
    const d = s.get(u);
    d && t.remove(d), s.set(u, m);
  }
  function h(u) {
    const f = s.get(u);
    if (f) {
      const p = u.index;
      p !== null && f.version < p.version && l(u);
    } else l(u);
    return s.get(u);
  }
  return {
    get: a,
    update: c,
    getWireframeAttribute: h
  };
}
function Eu(e, t, n) {
  let i;
  function r(f) {
    i = f;
  }
  let s, o;
  function a(f) {
    s = f.type, o = f.bytesPerElement;
  }
  function c(f, p) {
    e.drawElements(i, p, s, f * o), n.update(p, i, 1);
  }
  function l(f, p, g) {
    g !== 0 && (e.drawElementsInstanced(i, p, s, f * o, g), n.update(p, i, g));
  }
  function h(f, p, g) {
    if (g === 0) return;
    t.get("WEBGL_multi_draw").multiDrawElementsWEBGL(i, p, 0, s, f, 0, g);
    let _ = 0;
    for (let m = 0; m < g; m++) _ += p[m];
    n.update(_, i, 1);
  }
  function u(f, p, g, _) {
    if (g === 0) return;
    const m = t.get("WEBGL_multi_draw");
    if (m === null) for (let d = 0; d < f.length; d++) l(f[d] / o, p[d], _[d]);
    else {
      m.multiDrawElementsInstancedWEBGL(i, p, 0, s, f, 0, _, 0, g);
      let d = 0;
      for (let T = 0; T < g; T++) d += p[T] * _[T];
      n.update(d, i, 1);
    }
  }
  this.setMode = r, this.setIndex = a, this.render = c, this.renderInstances = l, this.renderMultiDraw = h, this.renderMultiDrawInstances = u;
}
function Tu(e) {
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
  function i(s, o, a) {
    switch (n.calls++, o) {
      case e.TRIANGLES:
        n.triangles += a * (s / 3);
        break;
      case e.LINES:
        n.lines += a * (s / 2);
        break;
      case e.LINE_STRIP:
        n.lines += a * (s - 1);
        break;
      case e.LINE_LOOP:
        n.lines += a * s;
        break;
      case e.POINTS:
        n.points += a * s;
        break;
      default:
        console.error("THREE.WebGLInfo: Unknown draw mode:", o);
        break;
    }
  }
  function r() {
    n.calls = 0, n.triangles = 0, n.points = 0, n.lines = 0;
  }
  return {
    memory: t,
    render: n,
    programs: null,
    autoReset: !0,
    reset: r,
    update: i
  };
}
function bu(e, t, n) {
  const i = /* @__PURE__ */ new WeakMap(), r = new ht();
  function s(o, a, c) {
    const l = o.morphTargetInfluences, h = a.morphAttributes.position || a.morphAttributes.normal || a.morphAttributes.color, u = h !== void 0 ? h.length : 0;
    let f = i.get(a);
    if (f === void 0 || f.count !== u) {
      let E = function() {
        C.dispose(), i.delete(a), a.removeEventListener("dispose", E);
      };
      f !== void 0 && f.texture.dispose();
      const p = a.morphAttributes.position !== void 0, g = a.morphAttributes.normal !== void 0, _ = a.morphAttributes.color !== void 0, m = a.morphAttributes.position || [], d = a.morphAttributes.normal || [], T = a.morphAttributes.color || [];
      let v = 0;
      p === !0 && (v = 1), g === !0 && (v = 2), _ === !0 && (v = 3);
      let S = a.attributes.position.count * v, b = 1;
      S > t.maxTextureSize && (b = Math.ceil(S / t.maxTextureSize), S = t.maxTextureSize);
      const w = new Float32Array(S * b * 4 * u), C = new ea(w, S, b, u);
      C.type = xr, C.needsUpdate = !0;
      const P = v * 4;
      for (let y = 0; y < u; y++) {
        const R = m[y], z = d[y], k = T[y], B = S * b * 4 * y;
        for (let Z = 0; Z < R.count; Z++) {
          const W = Z * P;
          p === !0 && (r.fromBufferAttribute(R, Z), w[B + W + 0] = r.x, w[B + W + 1] = r.y, w[B + W + 2] = r.z, w[B + W + 3] = 0), g === !0 && (r.fromBufferAttribute(z, Z), w[B + W + 4] = r.x, w[B + W + 5] = r.y, w[B + W + 6] = r.z, w[B + W + 7] = 0), _ === !0 && (r.fromBufferAttribute(k, Z), w[B + W + 8] = r.x, w[B + W + 9] = r.y, w[B + W + 10] = r.z, w[B + W + 11] = k.itemSize === 4 ? r.w : 1);
        }
      }
      f = {
        count: u,
        texture: C,
        size: new se(S, b)
      }, i.set(a, f), a.addEventListener("dispose", E);
    }
    if (o.isInstancedMesh === !0 && o.morphTexture !== null) c.getUniforms().setValue(e, "morphTexture", o.morphTexture, n);
    else {
      let p = 0;
      for (let _ = 0; _ < l.length; _++) p += l[_];
      const g = a.morphTargetsRelative ? 1 : 1 - p;
      c.getUniforms().setValue(e, "morphTargetBaseInfluence", g), c.getUniforms().setValue(e, "morphTargetInfluences", l);
    }
    c.getUniforms().setValue(e, "morphTargetsTexture", f.texture, n), c.getUniforms().setValue(e, "morphTargetsTextureSize", f.size);
  }
  return { update: s };
}
function Au(e, t, n, i) {
  let r = /* @__PURE__ */ new WeakMap();
  function s(c) {
    const l = i.render.frame, h = c.geometry, u = t.get(c, h);
    if (r.get(u) !== l && (t.update(u), r.set(u, l)), c.isInstancedMesh && (c.hasEventListener("dispose", a) === !1 && c.addEventListener("dispose", a), r.get(c) !== l && (n.update(c.instanceMatrix, e.ARRAY_BUFFER), c.instanceColor !== null && n.update(c.instanceColor, e.ARRAY_BUFFER), r.set(c, l))), c.isSkinnedMesh) {
      const f = c.skeleton;
      r.get(f) !== l && (f.update(), r.set(f, l));
    }
    return u;
  }
  function o() {
    r = /* @__PURE__ */ new WeakMap();
  }
  function a(c) {
    const l = c.target;
    l.removeEventListener("dispose", a), n.remove(l.instanceMatrix), l.instanceColor !== null && n.remove(l.instanceColor);
  }
  return {
    update: s,
    dispose: o
  };
}
var Fa = /* @__PURE__ */ new kt(), To = /* @__PURE__ */ new pa(1, 1), Ba = /* @__PURE__ */ new ea(), za = /* @__PURE__ */ new Tc(), Va = /* @__PURE__ */ new ua(), bo = [], Ao = [], wo = new Float32Array(16), Ro = new Float32Array(9), Co = new Float32Array(4);
function ri(e, t, n) {
  const i = e[0];
  if (i <= 0 || i > 0) return e;
  const r = t * n;
  let s = bo[r];
  if (s === void 0 && (s = new Float32Array(r), bo[r] = s), t !== 0) {
    i.toArray(s, 0);
    for (let o = 1, a = 0; o !== t; ++o)
      a += n, e[o].toArray(s, a);
  }
  return s;
}
function ft(e, t) {
  if (e.length !== t.length) return !1;
  for (let n = 0, i = e.length; n < i; n++) if (e[n] !== t[n]) return !1;
  return !0;
}
function pt(e, t) {
  for (let n = 0, i = t.length; n < i; n++) e[n] = t[n];
}
function Mr(e, t) {
  let n = Ao[t];
  n === void 0 && (n = new Int32Array(t), Ao[t] = n);
  for (let i = 0; i !== t; ++i) n[i] = e.allocateTextureUnit();
  return n;
}
function wu(e, t) {
  const n = this.cache;
  n[0] !== t && (e.uniform1f(this.addr, t), n[0] = t);
}
function Ru(e, t) {
  const n = this.cache;
  if (t.x !== void 0)
    (n[0] !== t.x || n[1] !== t.y) && (e.uniform2f(this.addr, t.x, t.y), n[0] = t.x, n[1] = t.y);
  else {
    if (ft(n, t)) return;
    e.uniform2fv(this.addr, t), pt(n, t);
  }
}
function Cu(e, t) {
  const n = this.cache;
  if (t.x !== void 0)
    (n[0] !== t.x || n[1] !== t.y || n[2] !== t.z) && (e.uniform3f(this.addr, t.x, t.y, t.z), n[0] = t.x, n[1] = t.y, n[2] = t.z);
  else if (t.r !== void 0)
    (n[0] !== t.r || n[1] !== t.g || n[2] !== t.b) && (e.uniform3f(this.addr, t.r, t.g, t.b), n[0] = t.r, n[1] = t.g, n[2] = t.b);
  else {
    if (ft(n, t)) return;
    e.uniform3fv(this.addr, t), pt(n, t);
  }
}
function Pu(e, t) {
  const n = this.cache;
  if (t.x !== void 0)
    (n[0] !== t.x || n[1] !== t.y || n[2] !== t.z || n[3] !== t.w) && (e.uniform4f(this.addr, t.x, t.y, t.z, t.w), n[0] = t.x, n[1] = t.y, n[2] = t.z, n[3] = t.w);
  else {
    if (ft(n, t)) return;
    e.uniform4fv(this.addr, t), pt(n, t);
  }
}
function Lu(e, t) {
  const n = this.cache, i = t.elements;
  if (i === void 0) {
    if (ft(n, t)) return;
    e.uniformMatrix2fv(this.addr, !1, t), pt(n, t);
  } else {
    if (ft(n, i)) return;
    Co.set(i), e.uniformMatrix2fv(this.addr, !1, Co), pt(n, i);
  }
}
function Du(e, t) {
  const n = this.cache, i = t.elements;
  if (i === void 0) {
    if (ft(n, t)) return;
    e.uniformMatrix3fv(this.addr, !1, t), pt(n, t);
  } else {
    if (ft(n, i)) return;
    Ro.set(i), e.uniformMatrix3fv(this.addr, !1, Ro), pt(n, i);
  }
}
function Iu(e, t) {
  const n = this.cache, i = t.elements;
  if (i === void 0) {
    if (ft(n, t)) return;
    e.uniformMatrix4fv(this.addr, !1, t), pt(n, t);
  } else {
    if (ft(n, i)) return;
    wo.set(i), e.uniformMatrix4fv(this.addr, !1, wo), pt(n, i);
  }
}
function Uu(e, t) {
  const n = this.cache;
  n[0] !== t && (e.uniform1i(this.addr, t), n[0] = t);
}
function Nu(e, t) {
  const n = this.cache;
  if (t.x !== void 0)
    (n[0] !== t.x || n[1] !== t.y) && (e.uniform2i(this.addr, t.x, t.y), n[0] = t.x, n[1] = t.y);
  else {
    if (ft(n, t)) return;
    e.uniform2iv(this.addr, t), pt(n, t);
  }
}
function Ou(e, t) {
  const n = this.cache;
  if (t.x !== void 0)
    (n[0] !== t.x || n[1] !== t.y || n[2] !== t.z) && (e.uniform3i(this.addr, t.x, t.y, t.z), n[0] = t.x, n[1] = t.y, n[2] = t.z);
  else {
    if (ft(n, t)) return;
    e.uniform3iv(this.addr, t), pt(n, t);
  }
}
function Fu(e, t) {
  const n = this.cache;
  if (t.x !== void 0)
    (n[0] !== t.x || n[1] !== t.y || n[2] !== t.z || n[3] !== t.w) && (e.uniform4i(this.addr, t.x, t.y, t.z, t.w), n[0] = t.x, n[1] = t.y, n[2] = t.z, n[3] = t.w);
  else {
    if (ft(n, t)) return;
    e.uniform4iv(this.addr, t), pt(n, t);
  }
}
function Bu(e, t) {
  const n = this.cache;
  n[0] !== t && (e.uniform1ui(this.addr, t), n[0] = t);
}
function zu(e, t) {
  const n = this.cache;
  if (t.x !== void 0)
    (n[0] !== t.x || n[1] !== t.y) && (e.uniform2ui(this.addr, t.x, t.y), n[0] = t.x, n[1] = t.y);
  else {
    if (ft(n, t)) return;
    e.uniform2uiv(this.addr, t), pt(n, t);
  }
}
function Vu(e, t) {
  const n = this.cache;
  if (t.x !== void 0)
    (n[0] !== t.x || n[1] !== t.y || n[2] !== t.z) && (e.uniform3ui(this.addr, t.x, t.y, t.z), n[0] = t.x, n[1] = t.y, n[2] = t.z);
  else {
    if (ft(n, t)) return;
    e.uniform3uiv(this.addr, t), pt(n, t);
  }
}
function Hu(e, t) {
  const n = this.cache;
  if (t.x !== void 0)
    (n[0] !== t.x || n[1] !== t.y || n[2] !== t.z || n[3] !== t.w) && (e.uniform4ui(this.addr, t.x, t.y, t.z, t.w), n[0] = t.x, n[1] = t.y, n[2] = t.z, n[3] = t.w);
  else {
    if (ft(n, t)) return;
    e.uniform4uiv(this.addr, t), pt(n, t);
  }
}
function ku(e, t, n) {
  const i = this.cache, r = n.allocateTextureUnit();
  i[0] !== r && (e.uniform1i(this.addr, r), i[0] = r);
  let s;
  this.type === e.SAMPLER_2D_SHADOW ? (To.compareFunction = 515, s = To) : s = Fa, n.setTexture2D(t || s, r);
}
function Gu(e, t, n) {
  const i = this.cache, r = n.allocateTextureUnit();
  i[0] !== r && (e.uniform1i(this.addr, r), i[0] = r), n.setTexture3D(t || za, r);
}
function Wu(e, t, n) {
  const i = this.cache, r = n.allocateTextureUnit();
  i[0] !== r && (e.uniform1i(this.addr, r), i[0] = r), n.setTextureCube(t || Va, r);
}
function Xu(e, t, n) {
  const i = this.cache, r = n.allocateTextureUnit();
  i[0] !== r && (e.uniform1i(this.addr, r), i[0] = r), n.setTexture2DArray(t || Ba, r);
}
function Yu(e) {
  switch (e) {
    case 5126:
      return wu;
    case 35664:
      return Ru;
    case 35665:
      return Cu;
    case 35666:
      return Pu;
    case 35674:
      return Lu;
    case 35675:
      return Du;
    case 35676:
      return Iu;
    case 5124:
    case 35670:
      return Uu;
    case 35667:
    case 35671:
      return Nu;
    case 35668:
    case 35672:
      return Ou;
    case 35669:
    case 35673:
      return Fu;
    case 5125:
      return Bu;
    case 36294:
      return zu;
    case 36295:
      return Vu;
    case 36296:
      return Hu;
    case 35678:
    case 36198:
    case 36298:
    case 36306:
    case 35682:
      return ku;
    case 35679:
    case 36299:
    case 36307:
      return Gu;
    case 35680:
    case 36300:
    case 36308:
    case 36293:
      return Wu;
    case 36289:
    case 36303:
    case 36311:
    case 36292:
      return Xu;
  }
}
function qu(e, t) {
  e.uniform1fv(this.addr, t);
}
function Zu(e, t) {
  const n = ri(t, this.size, 2);
  e.uniform2fv(this.addr, n);
}
function Ku(e, t) {
  const n = ri(t, this.size, 3);
  e.uniform3fv(this.addr, n);
}
function ju(e, t) {
  const n = ri(t, this.size, 4);
  e.uniform4fv(this.addr, n);
}
function Ju(e, t) {
  const n = ri(t, this.size, 4);
  e.uniformMatrix2fv(this.addr, !1, n);
}
function $u(e, t) {
  const n = ri(t, this.size, 9);
  e.uniformMatrix3fv(this.addr, !1, n);
}
function Qu(e, t) {
  const n = ri(t, this.size, 16);
  e.uniformMatrix4fv(this.addr, !1, n);
}
function ed(e, t) {
  e.uniform1iv(this.addr, t);
}
function td(e, t) {
  e.uniform2iv(this.addr, t);
}
function nd(e, t) {
  e.uniform3iv(this.addr, t);
}
function id(e, t) {
  e.uniform4iv(this.addr, t);
}
function rd(e, t) {
  e.uniform1uiv(this.addr, t);
}
function sd(e, t) {
  e.uniform2uiv(this.addr, t);
}
function od(e, t) {
  e.uniform3uiv(this.addr, t);
}
function ad(e, t) {
  e.uniform4uiv(this.addr, t);
}
function ld(e, t, n) {
  const i = this.cache, r = t.length, s = Mr(n, r);
  ft(i, s) || (e.uniform1iv(this.addr, s), pt(i, s));
  for (let o = 0; o !== r; ++o) n.setTexture2D(t[o] || Fa, s[o]);
}
function cd(e, t, n) {
  const i = this.cache, r = t.length, s = Mr(n, r);
  ft(i, s) || (e.uniform1iv(this.addr, s), pt(i, s));
  for (let o = 0; o !== r; ++o) n.setTexture3D(t[o] || za, s[o]);
}
function hd(e, t, n) {
  const i = this.cache, r = t.length, s = Mr(n, r);
  ft(i, s) || (e.uniform1iv(this.addr, s), pt(i, s));
  for (let o = 0; o !== r; ++o) n.setTextureCube(t[o] || Va, s[o]);
}
function ud(e, t, n) {
  const i = this.cache, r = t.length, s = Mr(n, r);
  ft(i, s) || (e.uniform1iv(this.addr, s), pt(i, s));
  for (let o = 0; o !== r; ++o) n.setTexture2DArray(t[o] || Ba, s[o]);
}
function dd(e) {
  switch (e) {
    case 5126:
      return qu;
    case 35664:
      return Zu;
    case 35665:
      return Ku;
    case 35666:
      return ju;
    case 35674:
      return Ju;
    case 35675:
      return $u;
    case 35676:
      return Qu;
    case 5124:
    case 35670:
      return ed;
    case 35667:
    case 35671:
      return td;
    case 35668:
    case 35672:
      return nd;
    case 35669:
    case 35673:
      return id;
    case 5125:
      return rd;
    case 36294:
      return sd;
    case 36295:
      return od;
    case 36296:
      return ad;
    case 35678:
    case 36198:
    case 36298:
    case 36306:
    case 35682:
      return ld;
    case 35679:
    case 36299:
    case 36307:
      return cd;
    case 35680:
    case 36300:
    case 36308:
    case 36293:
      return hd;
    case 36289:
    case 36303:
    case 36311:
    case 36292:
      return ud;
  }
}
var fd = class {
  constructor(e, t, n) {
    this.id = e, this.addr = n, this.cache = [], this.type = t.type, this.setValue = Yu(t.type);
  }
}, pd = class {
  constructor(e, t, n) {
    this.id = e, this.addr = n, this.cache = [], this.type = t.type, this.size = t.size, this.setValue = dd(t.type);
  }
}, md = class {
  constructor(e) {
    this.id = e, this.seq = [], this.map = {};
  }
  setValue(e, t, n) {
    const i = this.seq;
    for (let r = 0, s = i.length; r !== s; ++r) {
      const o = i[r];
      o.setValue(e, t[o.id], n);
    }
  }
}, rs = /(\w+)(\])?(\[|\.)?/g;
function Po(e, t) {
  e.seq.push(t), e.map[t.id] = t;
}
function _d(e, t, n) {
  const i = e.name, r = i.length;
  for (rs.lastIndex = 0; ; ) {
    const s = rs.exec(i), o = rs.lastIndex;
    let a = s[1];
    const c = s[2] === "]", l = s[3];
    if (c && (a = a | 0), l === void 0 || l === "[" && o + 2 === r) {
      Po(n, l === void 0 ? new fd(a, e, t) : new pd(a, e, t));
      break;
    } else {
      let h = n.map[a];
      h === void 0 && (h = new md(a), Po(n, h)), n = h;
    }
  }
}
var hr = class {
  constructor(e, t) {
    this.seq = [], this.map = {};
    const n = e.getProgramParameter(t, e.ACTIVE_UNIFORMS);
    for (let i = 0; i < n; ++i) {
      const r = e.getActiveUniform(t, i);
      _d(r, e.getUniformLocation(t, r.name), this);
    }
  }
  setValue(e, t, n, i) {
    const r = this.map[t];
    r !== void 0 && r.setValue(e, n, i);
  }
  setOptional(e, t, n) {
    const i = t[n];
    i !== void 0 && this.setValue(e, n, i);
  }
  static upload(e, t, n, i) {
    for (let r = 0, s = t.length; r !== s; ++r) {
      const o = t[r], a = n[o.id];
      a.needsUpdate !== !1 && o.setValue(e, a.value, i);
    }
  }
  static seqWithValue(e, t) {
    const n = [];
    for (let i = 0, r = e.length; i !== r; ++i) {
      const s = e[i];
      s.id in t && n.push(s);
    }
    return n;
  }
};
function Lo(e, t, n) {
  const i = e.createShader(t);
  return e.shaderSource(i, n), e.compileShader(i), i;
}
var gd = 37297, vd = 0;
function xd(e, t) {
  const n = e.split(`
`), i = [], r = Math.max(t - 6, 0), s = Math.min(t + 6, n.length);
  for (let o = r; o < s; o++) {
    const a = o + 1;
    i.push(`${a === t ? ">" : " "} ${a}: ${n[o]}`);
  }
  return i.join(`
`);
}
var Do = /* @__PURE__ */ new Xe();
function yd(e) {
  je._getMatrix(Do, je.workingColorSpace, e);
  const t = `mat3( ${Do.elements.map((n) => n.toFixed(4))} )`;
  switch (je.getTransfer(e)) {
    case fr:
      return [t, "LinearTransferOETF"];
    case pr:
      return [t, "sRGBTransferOETF"];
    default:
      return console.warn("THREE.WebGLProgram: Unsupported color space: ", e), [t, "LinearTransferOETF"];
  }
}
function Io(e, t, n) {
  const i = e.getShaderParameter(t, e.COMPILE_STATUS), r = (e.getShaderInfoLog(t) || "").trim();
  if (i && r === "") return "";
  const s = /ERROR: 0:(\d+)/.exec(r);
  if (s) {
    const o = parseInt(s[1]);
    return n.toUpperCase() + `

` + r + `

` + xd(e.getShaderSource(t), o);
  } else return r;
}
function Md(e, t) {
  const n = yd(t);
  return [
    `vec4 ${e}( vec4 value ) {`,
    `	return ${n[1]}( vec4( value.rgb * ${n[0]}, value.a ) );`,
    "}"
  ].join(`
`);
}
function Sd(e, t) {
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
var or = /* @__PURE__ */ new D();
function Ed() {
  return je.getLuminanceCoefficients(or), [
    "float luminance( const in vec3 rgb ) {",
    `	const vec3 weights = vec3( ${or.x.toFixed(4)}, ${or.y.toFixed(4)}, ${or.z.toFixed(4)} );`,
    "	return dot( weights, rgb );",
    "}"
  ].join(`
`);
}
function Td(e) {
  return [e.extensionClipCullDistance ? "#extension GL_ANGLE_clip_cull_distance : require" : "", e.extensionMultiDraw ? "#extension GL_ANGLE_multi_draw : require" : ""].filter(_i).join(`
`);
}
function bd(e) {
  const t = [];
  for (const n in e) {
    const i = e[n];
    i !== !1 && t.push("#define " + n + " " + i);
  }
  return t.join(`
`);
}
function Ad(e, t) {
  const n = {}, i = e.getProgramParameter(t, e.ACTIVE_ATTRIBUTES);
  for (let r = 0; r < i; r++) {
    const s = e.getActiveAttrib(t, r), o = s.name;
    let a = 1;
    s.type === e.FLOAT_MAT2 && (a = 2), s.type === e.FLOAT_MAT3 && (a = 3), s.type === e.FLOAT_MAT4 && (a = 4), n[o] = {
      type: s.type,
      location: e.getAttribLocation(t, o),
      locationSize: a
    };
  }
  return n;
}
function _i(e) {
  return e !== "";
}
function Uo(e, t) {
  const n = t.numSpotLightShadows + t.numSpotLightMaps - t.numSpotLightShadowsWithMaps;
  return e.replace(/NUM_DIR_LIGHTS/g, t.numDirLights).replace(/NUM_SPOT_LIGHTS/g, t.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g, t.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g, n).replace(/NUM_RECT_AREA_LIGHTS/g, t.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g, t.numPointLights).replace(/NUM_HEMI_LIGHTS/g, t.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g, t.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g, t.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g, t.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g, t.numPointLightShadows);
}
function No(e, t) {
  return e.replace(/NUM_CLIPPING_PLANES/g, t.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g, t.numClippingPlanes - t.numClipIntersection);
}
var wd = /^[ \t]*#include +<([\w\d./]+)>/gm;
function _s(e) {
  return e.replace(wd, Cd);
}
var Rd = /* @__PURE__ */ new Map();
function Cd(e, t) {
  let n = Ve[t];
  if (n === void 0) {
    const i = Rd.get(t);
    if (i !== void 0)
      n = Ve[i], console.warn('THREE.WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.', t, i);
    else throw new Error("Can not resolve #include <" + t + ">");
  }
  return _s(n);
}
var Pd = /#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;
function Oo(e) {
  return e.replace(Pd, Ld);
}
function Ld(e, t, n, i) {
  let r = "";
  for (let s = parseInt(t); s < parseInt(n); s++) r += i.replace(/\[\s*i\s*\]/g, "[ " + s + " ]").replace(/UNROLLED_LOOP_INDEX/g, s);
  return r;
}
function Fo(e) {
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
function Dd(e) {
  let t = "SHADOWMAP_TYPE_BASIC";
  return e.shadowMapType === 1 ? t = "SHADOWMAP_TYPE_PCF" : e.shadowMapType === 2 ? t = "SHADOWMAP_TYPE_PCF_SOFT" : e.shadowMapType === 3 && (t = "SHADOWMAP_TYPE_VSM"), t;
}
function Id(e) {
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
function Ud(e) {
  let t = "ENVMAP_MODE_REFLECTION";
  return e.envMap && e.envMapMode === 302 && (t = "ENVMAP_MODE_REFRACTION"), t;
}
function Nd(e) {
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
function Od(e) {
  const t = e.envMapCubeUVHeight;
  if (t === null) return null;
  const n = Math.log2(t) - 2, i = 1 / t;
  return {
    texelWidth: 1 / (3 * Math.max(Math.pow(2, n), 112)),
    texelHeight: i,
    maxMip: n
  };
}
function Fd(e, t, n, i) {
  const r = e.getContext(), s = n.defines;
  let o = n.vertexShader, a = n.fragmentShader;
  const c = Dd(n), l = Id(n), h = Ud(n), u = Nd(n), f = Od(n), p = Td(n), g = bd(s), _ = r.createProgram();
  let m, d, T = n.glslVersion ? "#version " + n.glslVersion + `
` : "";
  n.isRawShaderMaterial ? (m = [
    "#define SHADER_TYPE " + n.shaderType,
    "#define SHADER_NAME " + n.shaderName,
    g
  ].filter(_i).join(`
`), m.length > 0 && (m += `
`), d = [
    "#define SHADER_TYPE " + n.shaderType,
    "#define SHADER_NAME " + n.shaderName,
    g
  ].filter(_i).join(`
`), d.length > 0 && (d += `
`)) : (m = [
    Fo(n),
    "#define SHADER_TYPE " + n.shaderType,
    "#define SHADER_NAME " + n.shaderName,
    g,
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
    n.shadowMapEnabled ? "#define " + c : "",
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
  ].filter(_i).join(`
`), d = [
    Fo(n),
    "#define SHADER_TYPE " + n.shaderType,
    "#define SHADER_NAME " + n.shaderName,
    g,
    n.useFog && n.fog ? "#define USE_FOG" : "",
    n.useFog && n.fogExp2 ? "#define FOG_EXP2" : "",
    n.alphaToCoverage ? "#define ALPHA_TO_COVERAGE" : "",
    n.map ? "#define USE_MAP" : "",
    n.matcap ? "#define USE_MATCAP" : "",
    n.envMap ? "#define USE_ENVMAP" : "",
    n.envMap ? "#define " + l : "",
    n.envMap ? "#define " + h : "",
    n.envMap ? "#define " + u : "",
    f ? "#define CUBEUV_TEXEL_WIDTH " + f.texelWidth : "",
    f ? "#define CUBEUV_TEXEL_HEIGHT " + f.texelHeight : "",
    f ? "#define CUBEUV_MAX_MIP " + f.maxMip + ".0" : "",
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
    n.shadowMapEnabled ? "#define " + c : "",
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
    n.toneMapping !== 0 ? Ve.tonemapping_pars_fragment : "",
    n.toneMapping !== 0 ? Sd("toneMapping", n.toneMapping) : "",
    n.dithering ? "#define DITHERING" : "",
    n.opaque ? "#define OPAQUE" : "",
    Ve.colorspace_pars_fragment,
    Md("linearToOutputTexel", n.outputColorSpace),
    Ed(),
    n.useDepthPacking ? "#define DEPTH_PACKING " + n.depthPacking : "",
    `
`
  ].filter(_i).join(`
`)), o = _s(o), o = Uo(o, n), o = No(o, n), a = _s(a), a = Uo(a, n), a = No(a, n), o = Oo(o), a = Oo(a), n.isRawShaderMaterial !== !0 && (T = `#version 300 es
`, m = [
    p,
    "#define attribute in",
    "#define varying out",
    "#define texture2D texture"
  ].join(`
`) + `
` + m, d = [
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
` + d);
  const v = T + m + o, S = T + d + a, b = Lo(r, r.VERTEX_SHADER, v), w = Lo(r, r.FRAGMENT_SHADER, S);
  r.attachShader(_, b), r.attachShader(_, w), n.index0AttributeName !== void 0 ? r.bindAttribLocation(_, 0, n.index0AttributeName) : n.morphTargets === !0 && r.bindAttribLocation(_, 0, "position"), r.linkProgram(_);
  function C(R) {
    if (e.debug.checkShaderErrors) {
      const z = r.getProgramInfoLog(_) || "", k = r.getShaderInfoLog(b) || "", B = r.getShaderInfoLog(w) || "", Z = z.trim(), W = k.trim(), Q = B.trim();
      let G = !0, oe = !0;
      if (r.getProgramParameter(_, r.LINK_STATUS) === !1)
        if (G = !1, typeof e.debug.onShaderError == "function") e.debug.onShaderError(r, _, b, w);
        else {
          const fe = Io(r, b, "vertex"), Le = Io(r, w, "fragment");
          console.error("THREE.WebGLProgram: Shader Error " + r.getError() + " - VALIDATE_STATUS " + r.getProgramParameter(_, r.VALIDATE_STATUS) + `

Material Name: ` + R.name + `
Material Type: ` + R.type + `

Program Info Log: ` + Z + `
` + fe + `
` + Le);
        }
      else Z !== "" ? console.warn("THREE.WebGLProgram: Program Info Log:", Z) : (W === "" || Q === "") && (oe = !1);
      oe && (R.diagnostics = {
        runnable: G,
        programLog: Z,
        vertexShader: {
          log: W,
          prefix: m
        },
        fragmentShader: {
          log: Q,
          prefix: d
        }
      });
    }
    r.deleteShader(b), r.deleteShader(w), P = new hr(r, _), E = Ad(r, _);
  }
  let P;
  this.getUniforms = function() {
    return P === void 0 && C(this), P;
  };
  let E;
  this.getAttributes = function() {
    return E === void 0 && C(this), E;
  };
  let y = n.rendererExtensionParallelShaderCompile === !1;
  return this.isReady = function() {
    return y === !1 && (y = r.getProgramParameter(_, gd)), y;
  }, this.destroy = function() {
    i.releaseStatesOfProgram(this), r.deleteProgram(_), this.program = void 0;
  }, this.type = n.shaderType, this.name = n.shaderName, this.id = vd++, this.cacheKey = t, this.usedTimes = 1, this.program = _, this.vertexShader = b, this.fragmentShader = w, this;
}
var Bd = 0, zd = class {
  constructor() {
    this.shaderCache = /* @__PURE__ */ new Map(), this.materialCache = /* @__PURE__ */ new Map();
  }
  update(e) {
    const t = e.vertexShader, n = e.fragmentShader, i = this._getShaderStage(t), r = this._getShaderStage(n), s = this._getShaderCacheForMaterial(e);
    return s.has(i) === !1 && (s.add(i), i.usedTimes++), s.has(r) === !1 && (s.add(r), r.usedTimes++), this;
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
    return n === void 0 && (n = new Vd(e), t.set(e, n)), n;
  }
}, Vd = class {
  constructor(e) {
    this.id = Bd++, this.code = e, this.usedTimes = 0;
  }
};
function Hd(e, t, n, i, r, s, o) {
  const a = new na(), c = new zd(), l = /* @__PURE__ */ new Set(), h = [], u = r.logarithmicDepthBuffer, f = r.vertexTextures;
  let p = r.precision;
  const g = {
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
  function _(E) {
    return l.add(E), E === 0 ? "uv" : `uv${E}`;
  }
  function m(E, y, R, z, k) {
    const B = z.fog, Z = k.geometry, W = E.isMeshStandardMaterial ? z.environment : null, Q = (E.isMeshStandardMaterial ? n : t).get(E.envMap || W), G = Q && Q.mapping === 306 ? Q.image.height : null, oe = g[E.type];
    E.precision !== null && (p = r.getMaxPrecision(E.precision), p !== E.precision && console.warn("THREE.WebGLProgram.getParameters:", E.precision, "not supported, using", p, "instead."));
    const fe = Z.morphAttributes.position || Z.morphAttributes.normal || Z.morphAttributes.color, Le = fe !== void 0 ? fe.length : 0;
    let Ue = 0;
    Z.morphAttributes.position !== void 0 && (Ue = 1), Z.morphAttributes.normal !== void 0 && (Ue = 2), Z.morphAttributes.color !== void 0 && (Ue = 3);
    let Je, Ye, F, X;
    if (oe) {
      const $e = Xt[oe];
      Je = $e.vertexShader, Ye = $e.fragmentShader;
    } else
      Je = E.vertexShader, Ye = E.fragmentShader, c.update(E), F = c.getVertexShaderID(E), X = c.getFragmentShaderID(E);
    const ee = e.getRenderTarget(), pe = e.state.buffers.depth.getReversed(), Pe = k.isInstancedMesh === !0, ye = k.isBatchedMesh === !0, ke = !!E.map, L = !!E.matcap, K = !!Q, $ = !!E.aoMap, ie = !!E.lightMap, j = !!E.bumpMap, de = !!E.normalMap, ce = !!E.displacementMap, ae = !!E.emissiveMap, Be = !!E.metalnessMap, ze = !!E.roughnessMap, Ge = E.anisotropy > 0, A = E.clearcoat > 0, x = E.dispersion > 0, N = E.iridescence > 0, q = E.sheen > 0, te = E.transmission > 0, Y = Ge && !!E.anisotropyMap, Me = A && !!E.clearcoatMap, he = A && !!E.clearcoatNormalMap, Te = A && !!E.clearcoatRoughnessMap, De = N && !!E.iridescenceMap, le = N && !!E.iridescenceThicknessMap, ge = q && !!E.sheenColorMap, Re = q && !!E.sheenRoughnessMap, Ce = !!E.specularMap, ve = !!E.specularColorMap, We = !!E.specularIntensityMap, I = te && !!E.transmissionMap, _e = te && !!E.thicknessMap, ue = !!E.gradientMap, Ae = !!E.alphaMap, re = E.alphaTest > 0, J = !!E.alphaHash, be = !!E.extensions;
    let Ie = 0;
    E.toneMapped && (ee === null || ee.isXRRenderTarget === !0) && (Ie = e.toneMapping);
    const lt = {
      shaderID: oe,
      shaderType: E.type,
      shaderName: E.name,
      vertexShader: Je,
      fragmentShader: Ye,
      defines: E.defines,
      customVertexShaderID: F,
      customFragmentShaderID: X,
      isRawShaderMaterial: E.isRawShaderMaterial === !0,
      glslVersion: E.glslVersion,
      precision: p,
      batching: ye,
      batchingColor: ye && k._colorsTexture !== null,
      instancing: Pe,
      instancingColor: Pe && k.instanceColor !== null,
      instancingMorph: Pe && k.morphTexture !== null,
      supportsVertexTextures: f,
      outputColorSpace: ee === null ? e.outputColorSpace : ee.isXRRenderTarget === !0 ? ee.texture.colorSpace : Mi,
      alphaToCoverage: !!E.alphaToCoverage,
      map: ke,
      matcap: L,
      envMap: K,
      envMapMode: K && Q.mapping,
      envMapCubeUVHeight: G,
      aoMap: $,
      lightMap: ie,
      bumpMap: j,
      normalMap: de,
      displacementMap: f && ce,
      emissiveMap: ae,
      normalMapObjectSpace: de && E.normalMapType === 1,
      normalMapTangentSpace: de && E.normalMapType === 0,
      metalnessMap: Be,
      roughnessMap: ze,
      anisotropy: Ge,
      anisotropyMap: Y,
      clearcoat: A,
      clearcoatMap: Me,
      clearcoatNormalMap: he,
      clearcoatRoughnessMap: Te,
      dispersion: x,
      iridescence: N,
      iridescenceMap: De,
      iridescenceThicknessMap: le,
      sheen: q,
      sheenColorMap: ge,
      sheenRoughnessMap: Re,
      specularMap: Ce,
      specularColorMap: ve,
      specularIntensityMap: We,
      transmission: te,
      transmissionMap: I,
      thicknessMap: _e,
      gradientMap: ue,
      opaque: E.transparent === !1 && E.blending === 1 && E.alphaToCoverage === !1,
      alphaMap: Ae,
      alphaTest: re,
      alphaHash: J,
      combine: E.combine,
      mapUv: ke && _(E.map.channel),
      aoMapUv: $ && _(E.aoMap.channel),
      lightMapUv: ie && _(E.lightMap.channel),
      bumpMapUv: j && _(E.bumpMap.channel),
      normalMapUv: de && _(E.normalMap.channel),
      displacementMapUv: ce && _(E.displacementMap.channel),
      emissiveMapUv: ae && _(E.emissiveMap.channel),
      metalnessMapUv: Be && _(E.metalnessMap.channel),
      roughnessMapUv: ze && _(E.roughnessMap.channel),
      anisotropyMapUv: Y && _(E.anisotropyMap.channel),
      clearcoatMapUv: Me && _(E.clearcoatMap.channel),
      clearcoatNormalMapUv: he && _(E.clearcoatNormalMap.channel),
      clearcoatRoughnessMapUv: Te && _(E.clearcoatRoughnessMap.channel),
      iridescenceMapUv: De && _(E.iridescenceMap.channel),
      iridescenceThicknessMapUv: le && _(E.iridescenceThicknessMap.channel),
      sheenColorMapUv: ge && _(E.sheenColorMap.channel),
      sheenRoughnessMapUv: Re && _(E.sheenRoughnessMap.channel),
      specularMapUv: Ce && _(E.specularMap.channel),
      specularColorMapUv: ve && _(E.specularColorMap.channel),
      specularIntensityMapUv: We && _(E.specularIntensityMap.channel),
      transmissionMapUv: I && _(E.transmissionMap.channel),
      thicknessMapUv: _e && _(E.thicknessMap.channel),
      alphaMapUv: Ae && _(E.alphaMap.channel),
      vertexTangents: !!Z.attributes.tangent && (de || Ge),
      vertexColors: E.vertexColors,
      vertexAlphas: E.vertexColors === !0 && !!Z.attributes.color && Z.attributes.color.itemSize === 4,
      pointsUvs: k.isPoints === !0 && !!Z.attributes.uv && (ke || Ae),
      fog: !!B,
      useFog: E.fog === !0,
      fogExp2: !!B && B.isFogExp2,
      flatShading: E.flatShading === !0 && E.wireframe === !1,
      sizeAttenuation: E.sizeAttenuation === !0,
      logarithmicDepthBuffer: u,
      reversedDepthBuffer: pe,
      skinning: k.isSkinnedMesh === !0,
      morphTargets: Z.morphAttributes.position !== void 0,
      morphNormals: Z.morphAttributes.normal !== void 0,
      morphColors: Z.morphAttributes.color !== void 0,
      morphTargetsCount: Le,
      morphTextureStride: Ue,
      numDirLights: y.directional.length,
      numPointLights: y.point.length,
      numSpotLights: y.spot.length,
      numSpotLightMaps: y.spotLightMap.length,
      numRectAreaLights: y.rectArea.length,
      numHemiLights: y.hemi.length,
      numDirLightShadows: y.directionalShadowMap.length,
      numPointLightShadows: y.pointShadowMap.length,
      numSpotLightShadows: y.spotShadowMap.length,
      numSpotLightShadowsWithMaps: y.numSpotLightShadowsWithMaps,
      numLightProbes: y.numLightProbes,
      numClippingPlanes: o.numPlanes,
      numClipIntersection: o.numIntersection,
      dithering: E.dithering,
      shadowMapEnabled: e.shadowMap.enabled && R.length > 0,
      shadowMapType: e.shadowMap.type,
      toneMapping: Ie,
      decodeVideoTexture: ke && E.map.isVideoTexture === !0 && je.getTransfer(E.map.colorSpace) === "srgb",
      decodeVideoTextureEmissive: ae && E.emissiveMap.isVideoTexture === !0 && je.getTransfer(E.emissiveMap.colorSpace) === "srgb",
      premultipliedAlpha: E.premultipliedAlpha,
      doubleSided: E.side === 2,
      flipSided: E.side === 1,
      useDepthPacking: E.depthPacking >= 0,
      depthPacking: E.depthPacking || 0,
      index0AttributeName: E.index0AttributeName,
      extensionClipCullDistance: be && E.extensions.clipCullDistance === !0 && i.has("WEBGL_clip_cull_distance"),
      extensionMultiDraw: (be && E.extensions.multiDraw === !0 || ye) && i.has("WEBGL_multi_draw"),
      rendererExtensionParallelShaderCompile: i.has("KHR_parallel_shader_compile"),
      customProgramCacheKey: E.customProgramCacheKey()
    };
    return lt.vertexUv1s = l.has(1), lt.vertexUv2s = l.has(2), lt.vertexUv3s = l.has(3), l.clear(), lt;
  }
  function d(E) {
    const y = [];
    if (E.shaderID ? y.push(E.shaderID) : (y.push(E.customVertexShaderID), y.push(E.customFragmentShaderID)), E.defines !== void 0) for (const R in E.defines)
      y.push(R), y.push(E.defines[R]);
    return E.isRawShaderMaterial === !1 && (T(y, E), v(y, E), y.push(e.outputColorSpace)), y.push(E.customProgramCacheKey), y.join();
  }
  function T(E, y) {
    E.push(y.precision), E.push(y.outputColorSpace), E.push(y.envMapMode), E.push(y.envMapCubeUVHeight), E.push(y.mapUv), E.push(y.alphaMapUv), E.push(y.lightMapUv), E.push(y.aoMapUv), E.push(y.bumpMapUv), E.push(y.normalMapUv), E.push(y.displacementMapUv), E.push(y.emissiveMapUv), E.push(y.metalnessMapUv), E.push(y.roughnessMapUv), E.push(y.anisotropyMapUv), E.push(y.clearcoatMapUv), E.push(y.clearcoatNormalMapUv), E.push(y.clearcoatRoughnessMapUv), E.push(y.iridescenceMapUv), E.push(y.iridescenceThicknessMapUv), E.push(y.sheenColorMapUv), E.push(y.sheenRoughnessMapUv), E.push(y.specularMapUv), E.push(y.specularColorMapUv), E.push(y.specularIntensityMapUv), E.push(y.transmissionMapUv), E.push(y.thicknessMapUv), E.push(y.combine), E.push(y.fogExp2), E.push(y.sizeAttenuation), E.push(y.morphTargetsCount), E.push(y.morphAttributeCount), E.push(y.numDirLights), E.push(y.numPointLights), E.push(y.numSpotLights), E.push(y.numSpotLightMaps), E.push(y.numHemiLights), E.push(y.numRectAreaLights), E.push(y.numDirLightShadows), E.push(y.numPointLightShadows), E.push(y.numSpotLightShadows), E.push(y.numSpotLightShadowsWithMaps), E.push(y.numLightProbes), E.push(y.shadowMapType), E.push(y.toneMapping), E.push(y.numClippingPlanes), E.push(y.numClipIntersection), E.push(y.depthPacking);
  }
  function v(E, y) {
    a.disableAll(), y.supportsVertexTextures && a.enable(0), y.instancing && a.enable(1), y.instancingColor && a.enable(2), y.instancingMorph && a.enable(3), y.matcap && a.enable(4), y.envMap && a.enable(5), y.normalMapObjectSpace && a.enable(6), y.normalMapTangentSpace && a.enable(7), y.clearcoat && a.enable(8), y.iridescence && a.enable(9), y.alphaTest && a.enable(10), y.vertexColors && a.enable(11), y.vertexAlphas && a.enable(12), y.vertexUv1s && a.enable(13), y.vertexUv2s && a.enable(14), y.vertexUv3s && a.enable(15), y.vertexTangents && a.enable(16), y.anisotropy && a.enable(17), y.alphaHash && a.enable(18), y.batching && a.enable(19), y.dispersion && a.enable(20), y.batchingColor && a.enable(21), y.gradientMap && a.enable(22), E.push(a.mask), a.disableAll(), y.fog && a.enable(0), y.useFog && a.enable(1), y.flatShading && a.enable(2), y.logarithmicDepthBuffer && a.enable(3), y.reversedDepthBuffer && a.enable(4), y.skinning && a.enable(5), y.morphTargets && a.enable(6), y.morphNormals && a.enable(7), y.morphColors && a.enable(8), y.premultipliedAlpha && a.enable(9), y.shadowMapEnabled && a.enable(10), y.doubleSided && a.enable(11), y.flipSided && a.enable(12), y.useDepthPacking && a.enable(13), y.dithering && a.enable(14), y.transmission && a.enable(15), y.sheen && a.enable(16), y.opaque && a.enable(17), y.pointsUvs && a.enable(18), y.decodeVideoTexture && a.enable(19), y.decodeVideoTextureEmissive && a.enable(20), y.alphaToCoverage && a.enable(21), E.push(a.mask);
  }
  function S(E) {
    const y = g[E.type];
    let R;
    if (y) {
      const z = Xt[y];
      R = Fc.clone(z.uniforms);
    } else R = E.uniforms;
    return R;
  }
  function b(E, y) {
    let R;
    for (let z = 0, k = h.length; z < k; z++) {
      const B = h[z];
      if (B.cacheKey === y) {
        R = B, ++R.usedTimes;
        break;
      }
    }
    return R === void 0 && (R = new Fd(e, y, E, s), h.push(R)), R;
  }
  function w(E) {
    if (--E.usedTimes === 0) {
      const y = h.indexOf(E);
      h[y] = h[h.length - 1], h.pop(), E.destroy();
    }
  }
  function C(E) {
    c.remove(E);
  }
  function P() {
    c.dispose();
  }
  return {
    getParameters: m,
    getProgramCacheKey: d,
    getUniforms: S,
    acquireProgram: b,
    releaseProgram: w,
    releaseShaderCache: C,
    programs: h,
    dispose: P
  };
}
function kd() {
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
  function r(o, a, c) {
    e.get(o)[a] = c;
  }
  function s() {
    e = /* @__PURE__ */ new WeakMap();
  }
  return {
    has: t,
    get: n,
    remove: i,
    update: r,
    dispose: s
  };
}
function Gd(e, t) {
  return e.groupOrder !== t.groupOrder ? e.groupOrder - t.groupOrder : e.renderOrder !== t.renderOrder ? e.renderOrder - t.renderOrder : e.material.id !== t.material.id ? e.material.id - t.material.id : e.z !== t.z ? e.z - t.z : e.id - t.id;
}
function Bo(e, t) {
  return e.groupOrder !== t.groupOrder ? e.groupOrder - t.groupOrder : e.renderOrder !== t.renderOrder ? e.renderOrder - t.renderOrder : e.z !== t.z ? t.z - e.z : e.id - t.id;
}
function zo() {
  const e = [];
  let t = 0;
  const n = [], i = [], r = [];
  function s() {
    t = 0, n.length = 0, i.length = 0, r.length = 0;
  }
  function o(u, f, p, g, _, m) {
    let d = e[t];
    return d === void 0 ? (d = {
      id: u.id,
      object: u,
      geometry: f,
      material: p,
      groupOrder: g,
      renderOrder: u.renderOrder,
      z: _,
      group: m
    }, e[t] = d) : (d.id = u.id, d.object = u, d.geometry = f, d.material = p, d.groupOrder = g, d.renderOrder = u.renderOrder, d.z = _, d.group = m), t++, d;
  }
  function a(u, f, p, g, _, m) {
    const d = o(u, f, p, g, _, m);
    p.transmission > 0 ? i.push(d) : p.transparent === !0 ? r.push(d) : n.push(d);
  }
  function c(u, f, p, g, _, m) {
    const d = o(u, f, p, g, _, m);
    p.transmission > 0 ? i.unshift(d) : p.transparent === !0 ? r.unshift(d) : n.unshift(d);
  }
  function l(u, f) {
    n.length > 1 && n.sort(u || Gd), i.length > 1 && i.sort(f || Bo), r.length > 1 && r.sort(f || Bo);
  }
  function h() {
    for (let u = t, f = e.length; u < f; u++) {
      const p = e[u];
      if (p.id === null) break;
      p.id = null, p.object = null, p.geometry = null, p.material = null, p.group = null;
    }
  }
  return {
    opaque: n,
    transmissive: i,
    transparent: r,
    init: s,
    push: a,
    unshift: c,
    finish: h,
    sort: l
  };
}
function Wd() {
  let e = /* @__PURE__ */ new WeakMap();
  function t(i, r) {
    const s = e.get(i);
    let o;
    return s === void 0 ? (o = new zo(), e.set(i, [o])) : r >= s.length ? (o = new zo(), s.push(o)) : o = s[r], o;
  }
  function n() {
    e = /* @__PURE__ */ new WeakMap();
  }
  return {
    get: t,
    dispose: n
  };
}
function Xd() {
  const e = {};
  return { get: function(t) {
    if (e[t.id] !== void 0) return e[t.id];
    let n;
    switch (t.type) {
      case "DirectionalLight":
        n = {
          direction: new D(),
          color: new qe()
        };
        break;
      case "SpotLight":
        n = {
          position: new D(),
          direction: new D(),
          color: new qe(),
          distance: 0,
          coneCos: 0,
          penumbraCos: 0,
          decay: 0
        };
        break;
      case "PointLight":
        n = {
          position: new D(),
          color: new qe(),
          distance: 0,
          decay: 0
        };
        break;
      case "HemisphereLight":
        n = {
          direction: new D(),
          skyColor: new qe(),
          groundColor: new qe()
        };
        break;
      case "RectAreaLight":
        n = {
          color: new qe(),
          position: new D(),
          halfWidth: new D(),
          halfHeight: new D()
        };
        break;
    }
    return e[t.id] = n, n;
  } };
}
function Yd() {
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
          shadowMapSize: new se()
        };
        break;
      case "SpotLight":
        n = {
          shadowIntensity: 1,
          shadowBias: 0,
          shadowNormalBias: 0,
          shadowRadius: 1,
          shadowMapSize: new se()
        };
        break;
      case "PointLight":
        n = {
          shadowIntensity: 1,
          shadowBias: 0,
          shadowNormalBias: 0,
          shadowRadius: 1,
          shadowMapSize: new se(),
          shadowCameraNear: 1,
          shadowCameraFar: 1e3
        };
        break;
    }
    return e[t.id] = n, n;
  } };
}
var qd = 0;
function Zd(e, t) {
  return (t.castShadow ? 2 : 0) - (e.castShadow ? 2 : 0) + (t.map ? 1 : 0) - (e.map ? 1 : 0);
}
function Kd(e) {
  const t = new Xd(), n = Yd(), i = {
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
  for (let l = 0; l < 9; l++) i.probe.push(new D());
  const r = new D(), s = new nt(), o = new nt();
  function a(l) {
    let h = 0, u = 0, f = 0;
    for (let E = 0; E < 9; E++) i.probe[E].set(0, 0, 0);
    let p = 0, g = 0, _ = 0, m = 0, d = 0, T = 0, v = 0, S = 0, b = 0, w = 0, C = 0;
    l.sort(Zd);
    for (let E = 0, y = l.length; E < y; E++) {
      const R = l[E], z = R.color, k = R.intensity, B = R.distance, Z = R.shadow && R.shadow.map ? R.shadow.map.texture : null;
      if (R.isAmbientLight)
        h += z.r * k, u += z.g * k, f += z.b * k;
      else if (R.isLightProbe) {
        for (let W = 0; W < 9; W++) i.probe[W].addScaledVector(R.sh.coefficients[W], k);
        C++;
      } else if (R.isDirectionalLight) {
        const W = t.get(R);
        if (W.color.copy(R.color).multiplyScalar(R.intensity), R.castShadow) {
          const Q = R.shadow, G = n.get(R);
          G.shadowIntensity = Q.intensity, G.shadowBias = Q.bias, G.shadowNormalBias = Q.normalBias, G.shadowRadius = Q.radius, G.shadowMapSize = Q.mapSize, i.directionalShadow[p] = G, i.directionalShadowMap[p] = Z, i.directionalShadowMatrix[p] = R.shadow.matrix, T++;
        }
        i.directional[p] = W, p++;
      } else if (R.isSpotLight) {
        const W = t.get(R);
        W.position.setFromMatrixPosition(R.matrixWorld), W.color.copy(z).multiplyScalar(k), W.distance = B, W.coneCos = Math.cos(R.angle), W.penumbraCos = Math.cos(R.angle * (1 - R.penumbra)), W.decay = R.decay, i.spot[_] = W;
        const Q = R.shadow;
        if (R.map && (i.spotLightMap[b] = R.map, b++, Q.updateMatrices(R), R.castShadow && w++), i.spotLightMatrix[_] = Q.matrix, R.castShadow) {
          const G = n.get(R);
          G.shadowIntensity = Q.intensity, G.shadowBias = Q.bias, G.shadowNormalBias = Q.normalBias, G.shadowRadius = Q.radius, G.shadowMapSize = Q.mapSize, i.spotShadow[_] = G, i.spotShadowMap[_] = Z, S++;
        }
        _++;
      } else if (R.isRectAreaLight) {
        const W = t.get(R);
        W.color.copy(z).multiplyScalar(k), W.halfWidth.set(R.width * 0.5, 0, 0), W.halfHeight.set(0, R.height * 0.5, 0), i.rectArea[m] = W, m++;
      } else if (R.isPointLight) {
        const W = t.get(R);
        if (W.color.copy(R.color).multiplyScalar(R.intensity), W.distance = R.distance, W.decay = R.decay, R.castShadow) {
          const Q = R.shadow, G = n.get(R);
          G.shadowIntensity = Q.intensity, G.shadowBias = Q.bias, G.shadowNormalBias = Q.normalBias, G.shadowRadius = Q.radius, G.shadowMapSize = Q.mapSize, G.shadowCameraNear = Q.camera.near, G.shadowCameraFar = Q.camera.far, i.pointShadow[g] = G, i.pointShadowMap[g] = Z, i.pointShadowMatrix[g] = R.shadow.matrix, v++;
        }
        i.point[g] = W, g++;
      } else if (R.isHemisphereLight) {
        const W = t.get(R);
        W.skyColor.copy(R.color).multiplyScalar(k), W.groundColor.copy(R.groundColor).multiplyScalar(k), i.hemi[d] = W, d++;
      }
    }
    m > 0 && (e.has("OES_texture_float_linear") === !0 ? (i.rectAreaLTC1 = me.LTC_FLOAT_1, i.rectAreaLTC2 = me.LTC_FLOAT_2) : (i.rectAreaLTC1 = me.LTC_HALF_1, i.rectAreaLTC2 = me.LTC_HALF_2)), i.ambient[0] = h, i.ambient[1] = u, i.ambient[2] = f;
    const P = i.hash;
    (P.directionalLength !== p || P.pointLength !== g || P.spotLength !== _ || P.rectAreaLength !== m || P.hemiLength !== d || P.numDirectionalShadows !== T || P.numPointShadows !== v || P.numSpotShadows !== S || P.numSpotMaps !== b || P.numLightProbes !== C) && (i.directional.length = p, i.spot.length = _, i.rectArea.length = m, i.point.length = g, i.hemi.length = d, i.directionalShadow.length = T, i.directionalShadowMap.length = T, i.pointShadow.length = v, i.pointShadowMap.length = v, i.spotShadow.length = S, i.spotShadowMap.length = S, i.directionalShadowMatrix.length = T, i.pointShadowMatrix.length = v, i.spotLightMatrix.length = S + b - w, i.spotLightMap.length = b, i.numSpotLightShadowsWithMaps = w, i.numLightProbes = C, P.directionalLength = p, P.pointLength = g, P.spotLength = _, P.rectAreaLength = m, P.hemiLength = d, P.numDirectionalShadows = T, P.numPointShadows = v, P.numSpotShadows = S, P.numSpotMaps = b, P.numLightProbes = C, i.version = qd++);
  }
  function c(l, h) {
    let u = 0, f = 0, p = 0, g = 0, _ = 0;
    const m = h.matrixWorldInverse;
    for (let d = 0, T = l.length; d < T; d++) {
      const v = l[d];
      if (v.isDirectionalLight) {
        const S = i.directional[u];
        S.direction.setFromMatrixPosition(v.matrixWorld), r.setFromMatrixPosition(v.target.matrixWorld), S.direction.sub(r), S.direction.transformDirection(m), u++;
      } else if (v.isSpotLight) {
        const S = i.spot[p];
        S.position.setFromMatrixPosition(v.matrixWorld), S.position.applyMatrix4(m), S.direction.setFromMatrixPosition(v.matrixWorld), r.setFromMatrixPosition(v.target.matrixWorld), S.direction.sub(r), S.direction.transformDirection(m), p++;
      } else if (v.isRectAreaLight) {
        const S = i.rectArea[g];
        S.position.setFromMatrixPosition(v.matrixWorld), S.position.applyMatrix4(m), o.identity(), s.copy(v.matrixWorld), s.premultiply(m), o.extractRotation(s), S.halfWidth.set(v.width * 0.5, 0, 0), S.halfHeight.set(0, v.height * 0.5, 0), S.halfWidth.applyMatrix4(o), S.halfHeight.applyMatrix4(o), g++;
      } else if (v.isPointLight) {
        const S = i.point[f];
        S.position.setFromMatrixPosition(v.matrixWorld), S.position.applyMatrix4(m), f++;
      } else if (v.isHemisphereLight) {
        const S = i.hemi[_];
        S.direction.setFromMatrixPosition(v.matrixWorld), S.direction.transformDirection(m), _++;
      }
    }
  }
  return {
    setup: a,
    setupView: c,
    state: i
  };
}
function Vo(e) {
  const t = new Kd(e), n = [], i = [];
  function r(h) {
    l.camera = h, n.length = 0, i.length = 0;
  }
  function s(h) {
    n.push(h);
  }
  function o(h) {
    i.push(h);
  }
  function a() {
    t.setup(n);
  }
  function c(h) {
    t.setupView(n, h);
  }
  const l = {
    lightsArray: n,
    shadowsArray: i,
    camera: null,
    lights: t,
    transmissionRenderTarget: {}
  };
  return {
    init: r,
    state: l,
    setupLights: a,
    setupLightsView: c,
    pushLight: s,
    pushShadow: o
  };
}
function jd(e) {
  let t = /* @__PURE__ */ new WeakMap();
  function n(r, s = 0) {
    const o = t.get(r);
    let a;
    return o === void 0 ? (a = new Vo(e), t.set(r, [a])) : s >= o.length ? (a = new Vo(e), o.push(a)) : a = o[s], a;
  }
  function i() {
    t = /* @__PURE__ */ new WeakMap();
  }
  return {
    get: n,
    dispose: i
  };
}
var Jd = `void main() {
	gl_Position = vec4( position, 1.0 );
}`, $d = `uniform sampler2D shadow_pass;
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
function Qd(e, t, n) {
  let i = new Ss();
  const r = new se(), s = new se(), o = new ht(), a = new Ih({ depthPacking: Ql }), c = new Uh(), l = {}, h = n.maxTextureSize, u = {
    0: 1,
    1: 0,
    2: 2
  }, f = new dn({
    defines: { VSM_SAMPLES: 8 },
    uniforms: {
      shadow_pass: { value: null },
      resolution: { value: new se() },
      radius: { value: 4 }
    },
    vertexShader: Jd,
    fragmentShader: $d
  }), p = f.clone();
  p.defines.HORIZONTAL_PASS = 1;
  const g = new It();
  g.setAttribute("position", new Vt(new Float32Array([
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
  const _ = new Rt(g, f), m = this;
  this.enabled = !1, this.autoUpdate = !0, this.needsUpdate = !1, this.type = 1;
  let d = this.type;
  this.render = function(w, C, P) {
    if (m.enabled === !1 || m.autoUpdate === !1 && m.needsUpdate === !1 || w.length === 0) return;
    const E = e.getRenderTarget(), y = e.getActiveCubeFace(), R = e.getActiveMipmapLevel(), z = e.state;
    z.setBlending(0), z.buffers.depth.getReversed() === !0 ? z.buffers.color.setClear(0, 0, 0, 0) : z.buffers.color.setClear(1, 1, 1, 1), z.buffers.depth.setTest(!0), z.setScissorTest(!1);
    const k = d !== 3 && this.type === 3, B = d === 3 && this.type !== 3;
    for (let Z = 0, W = w.length; Z < W; Z++) {
      const Q = w[Z], G = Q.shadow;
      if (G === void 0) {
        console.warn("THREE.WebGLShadowMap:", Q, "has no shadow.");
        continue;
      }
      if (G.autoUpdate === !1 && G.needsUpdate === !1) continue;
      r.copy(G.mapSize);
      const oe = G.getFrameExtents();
      if (r.multiply(oe), s.copy(G.mapSize), (r.x > h || r.y > h) && (r.x > h && (s.x = Math.floor(h / oe.x), r.x = s.x * oe.x, G.mapSize.x = s.x), r.y > h && (s.y = Math.floor(h / oe.y), r.y = s.y * oe.y, G.mapSize.y = s.y)), G.map === null || k === !0 || B === !0) {
        const Le = this.type !== 3 ? {
          minFilter: Ht,
          magFilter: Ht
        } : {};
        G.map !== null && G.map.dispose(), G.map = new Tn(r.x, r.y, Le), G.map.texture.name = Q.name + ".shadowMap", G.camera.updateProjectionMatrix();
      }
      e.setRenderTarget(G.map), e.clear();
      const fe = G.getViewportCount();
      for (let Le = 0; Le < fe; Le++) {
        const Ue = G.getViewport(Le);
        o.set(s.x * Ue.x, s.y * Ue.y, s.x * Ue.z, s.y * Ue.w), z.viewport(o), G.updateMatrices(Q, Le), i = G.getFrustum(), S(C, P, G.camera, Q, this.type);
      }
      G.isPointLightShadow !== !0 && this.type === 3 && T(G, P), G.needsUpdate = !1;
    }
    d = this.type, m.needsUpdate = !1, e.setRenderTarget(E, y, R);
  };
  function T(w, C) {
    const P = t.update(_);
    f.defines.VSM_SAMPLES !== w.blurSamples && (f.defines.VSM_SAMPLES = w.blurSamples, p.defines.VSM_SAMPLES = w.blurSamples, f.needsUpdate = !0, p.needsUpdate = !0), w.mapPass === null && (w.mapPass = new Tn(r.x, r.y)), f.uniforms.shadow_pass.value = w.map.texture, f.uniforms.resolution.value = w.mapSize, f.uniforms.radius.value = w.radius, e.setRenderTarget(w.mapPass), e.clear(), e.renderBufferDirect(C, null, P, f, _, null), p.uniforms.shadow_pass.value = w.mapPass.texture, p.uniforms.resolution.value = w.mapSize, p.uniforms.radius.value = w.radius, e.setRenderTarget(w.map), e.clear(), e.renderBufferDirect(C, null, P, p, _, null);
  }
  function v(w, C, P, E) {
    let y = null;
    const R = P.isPointLight === !0 ? w.customDistanceMaterial : w.customDepthMaterial;
    if (R !== void 0) y = R;
    else if (y = P.isPointLight === !0 ? c : a, e.localClippingEnabled && C.clipShadows === !0 && Array.isArray(C.clippingPlanes) && C.clippingPlanes.length !== 0 || C.displacementMap && C.displacementScale !== 0 || C.alphaMap && C.alphaTest > 0 || C.map && C.alphaTest > 0 || C.alphaToCoverage === !0) {
      const z = y.uuid, k = C.uuid;
      let B = l[z];
      B === void 0 && (B = {}, l[z] = B);
      let Z = B[k];
      Z === void 0 && (Z = y.clone(), B[k] = Z, C.addEventListener("dispose", b)), y = Z;
    }
    if (y.visible = C.visible, y.wireframe = C.wireframe, E === 3 ? y.side = C.shadowSide !== null ? C.shadowSide : C.side : y.side = C.shadowSide !== null ? C.shadowSide : u[C.side], y.alphaMap = C.alphaMap, y.alphaTest = C.alphaToCoverage === !0 ? 0.5 : C.alphaTest, y.map = C.map, y.clipShadows = C.clipShadows, y.clippingPlanes = C.clippingPlanes, y.clipIntersection = C.clipIntersection, y.displacementMap = C.displacementMap, y.displacementScale = C.displacementScale, y.displacementBias = C.displacementBias, y.wireframeLinewidth = C.wireframeLinewidth, y.linewidth = C.linewidth, P.isPointLight === !0 && y.isMeshDistanceMaterial === !0) {
      const z = e.properties.get(y);
      z.light = P;
    }
    return y;
  }
  function S(w, C, P, E, y) {
    if (w.visible === !1) return;
    if (w.layers.test(C.layers) && (w.isMesh || w.isLine || w.isPoints) && (w.castShadow || w.receiveShadow && y === 3) && (!w.frustumCulled || i.intersectsObject(w))) {
      w.modelViewMatrix.multiplyMatrices(P.matrixWorldInverse, w.matrixWorld);
      const z = t.update(w), k = w.material;
      if (Array.isArray(k)) {
        const B = z.groups;
        for (let Z = 0, W = B.length; Z < W; Z++) {
          const Q = B[Z], G = k[Q.materialIndex];
          if (G && G.visible) {
            const oe = v(w, G, E, y);
            w.onBeforeShadow(e, w, C, P, z, oe, Q), e.renderBufferDirect(P, null, z, oe, w, Q), w.onAfterShadow(e, w, C, P, z, oe, Q);
          }
        }
      } else if (k.visible) {
        const B = v(w, k, E, y);
        w.onBeforeShadow(e, w, C, P, z, B, null), e.renderBufferDirect(P, null, z, B, w, null), w.onAfterShadow(e, w, C, P, z, B, null);
      }
    }
    const R = w.children;
    for (let z = 0, k = R.length; z < k; z++) S(R[z], C, P, E, y);
  }
  function b(w) {
    w.target.removeEventListener("dispose", b);
    for (const C in l) {
      const P = l[C], E = w.target.uuid;
      E in P && (P[E].dispose(), delete P[E]);
    }
  }
}
var ef = {
  0: 1,
  2: 6,
  4: 7,
  3: 5,
  1: 0,
  6: 2,
  7: 4,
  5: 3
};
function tf(e, t) {
  function n() {
    let I = !1;
    const _e = new ht();
    let ue = null;
    const Ae = new ht(0, 0, 0, 0);
    return {
      setMask: function(re) {
        ue !== re && !I && (e.colorMask(re, re, re, re), ue = re);
      },
      setLocked: function(re) {
        I = re;
      },
      setClear: function(re, J, be, Ie, lt) {
        lt === !0 && (re *= Ie, J *= Ie, be *= Ie), _e.set(re, J, be, Ie), Ae.equals(_e) === !1 && (e.clearColor(re, J, be, Ie), Ae.copy(_e));
      },
      reset: function() {
        I = !1, ue = null, Ae.set(-1, 0, 0, 0);
      }
    };
  }
  function i() {
    let I = !1, _e = !1, ue = null, Ae = null, re = null;
    return {
      setReversed: function(J) {
        if (_e !== J) {
          const be = t.get("EXT_clip_control");
          J ? be.clipControlEXT(be.LOWER_LEFT_EXT, be.ZERO_TO_ONE_EXT) : be.clipControlEXT(be.LOWER_LEFT_EXT, be.NEGATIVE_ONE_TO_ONE_EXT), _e = J;
          const Ie = re;
          re = null, this.setClear(Ie);
        }
      },
      getReversed: function() {
        return _e;
      },
      setTest: function(J) {
        J ? ee(e.DEPTH_TEST) : pe(e.DEPTH_TEST);
      },
      setMask: function(J) {
        ue !== J && !I && (e.depthMask(J), ue = J);
      },
      setFunc: function(J) {
        if (_e && (J = ef[J]), Ae !== J) {
          switch (J) {
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
          Ae = J;
        }
      },
      setLocked: function(J) {
        I = J;
      },
      setClear: function(J) {
        re !== J && (_e && (J = 1 - J), e.clearDepth(J), re = J);
      },
      reset: function() {
        I = !1, ue = null, Ae = null, re = null, _e = !1;
      }
    };
  }
  function r() {
    let I = !1, _e = null, ue = null, Ae = null, re = null, J = null, be = null, Ie = null, lt = null;
    return {
      setTest: function($e) {
        I || ($e ? ee(e.STENCIL_TEST) : pe(e.STENCIL_TEST));
      },
      setMask: function($e) {
        _e !== $e && !I && (e.stencilMask($e), _e = $e);
      },
      setFunc: function($e, Gt, Wt) {
        (ue !== $e || Ae !== Gt || re !== Wt) && (e.stencilFunc($e, Gt, Wt), ue = $e, Ae = Gt, re = Wt);
      },
      setOp: function($e, Gt, Wt) {
        (J !== $e || be !== Gt || Ie !== Wt) && (e.stencilOp($e, Gt, Wt), J = $e, be = Gt, Ie = Wt);
      },
      setLocked: function($e) {
        I = $e;
      },
      setClear: function($e) {
        lt !== $e && (e.clearStencil($e), lt = $e);
      },
      reset: function() {
        I = !1, _e = null, ue = null, Ae = null, re = null, J = null, be = null, Ie = null, lt = null;
      }
    };
  }
  const s = new n(), o = new i(), a = new r(), c = /* @__PURE__ */ new WeakMap(), l = /* @__PURE__ */ new WeakMap();
  let h = {}, u = {}, f = /* @__PURE__ */ new WeakMap(), p = [], g = null, _ = !1, m = null, d = null, T = null, v = null, S = null, b = null, w = null, C = new qe(0, 0, 0), P = 0, E = !1, y = null, R = null, z = null, k = null, B = null;
  const Z = e.getParameter(e.MAX_COMBINED_TEXTURE_IMAGE_UNITS);
  let W = !1, Q = 0;
  const G = e.getParameter(e.VERSION);
  G.indexOf("WebGL") !== -1 ? (Q = parseFloat(/^WebGL (\d)/.exec(G)[1]), W = Q >= 1) : G.indexOf("OpenGL ES") !== -1 && (Q = parseFloat(/^OpenGL ES (\d)/.exec(G)[1]), W = Q >= 2);
  let oe = null, fe = {};
  const Le = e.getParameter(e.SCISSOR_BOX), Ue = e.getParameter(e.VIEWPORT), Je = new ht().fromArray(Le), Ye = new ht().fromArray(Ue);
  function F(I, _e, ue, Ae) {
    const re = new Uint8Array(4), J = e.createTexture();
    e.bindTexture(I, J), e.texParameteri(I, e.TEXTURE_MIN_FILTER, e.NEAREST), e.texParameteri(I, e.TEXTURE_MAG_FILTER, e.NEAREST);
    for (let be = 0; be < ue; be++) I === e.TEXTURE_3D || I === e.TEXTURE_2D_ARRAY ? e.texImage3D(_e, 0, e.RGBA, 1, 1, Ae, 0, e.RGBA, e.UNSIGNED_BYTE, re) : e.texImage2D(_e + be, 0, e.RGBA, 1, 1, 0, e.RGBA, e.UNSIGNED_BYTE, re);
    return J;
  }
  const X = {};
  X[e.TEXTURE_2D] = F(e.TEXTURE_2D, e.TEXTURE_2D, 1), X[e.TEXTURE_CUBE_MAP] = F(e.TEXTURE_CUBE_MAP, e.TEXTURE_CUBE_MAP_POSITIVE_X, 6), X[e.TEXTURE_2D_ARRAY] = F(e.TEXTURE_2D_ARRAY, e.TEXTURE_2D_ARRAY, 1, 1), X[e.TEXTURE_3D] = F(e.TEXTURE_3D, e.TEXTURE_3D, 1, 1), s.setClear(0, 0, 0, 1), o.setClear(1), a.setClear(0), ee(e.DEPTH_TEST), o.setFunc(3), j(!1), de(1), ee(e.CULL_FACE), $(0);
  function ee(I) {
    h[I] !== !0 && (e.enable(I), h[I] = !0);
  }
  function pe(I) {
    h[I] !== !1 && (e.disable(I), h[I] = !1);
  }
  function Pe(I, _e) {
    return u[I] !== _e ? (e.bindFramebuffer(I, _e), u[I] = _e, I === e.DRAW_FRAMEBUFFER && (u[e.FRAMEBUFFER] = _e), I === e.FRAMEBUFFER && (u[e.DRAW_FRAMEBUFFER] = _e), !0) : !1;
  }
  function ye(I, _e) {
    let ue = p, Ae = !1;
    if (I) {
      ue = f.get(_e), ue === void 0 && (ue = [], f.set(_e, ue));
      const re = I.textures;
      if (ue.length !== re.length || ue[0] !== e.COLOR_ATTACHMENT0) {
        for (let J = 0, be = re.length; J < be; J++) ue[J] = e.COLOR_ATTACHMENT0 + J;
        ue.length = re.length, Ae = !0;
      }
    } else ue[0] !== e.BACK && (ue[0] = e.BACK, Ae = !0);
    Ae && e.drawBuffers(ue);
  }
  function ke(I) {
    return g !== I ? (e.useProgram(I), g = I, !0) : !1;
  }
  const L = {
    100: e.FUNC_ADD,
    101: e.FUNC_SUBTRACT,
    102: e.FUNC_REVERSE_SUBTRACT
  };
  L[103] = e.MIN, L[104] = e.MAX;
  const K = {
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
  function $(I, _e, ue, Ae, re, J, be, Ie, lt, $e) {
    if (I === 0) {
      _ === !0 && (pe(e.BLEND), _ = !1);
      return;
    }
    if (_ === !1 && (ee(e.BLEND), _ = !0), I !== 5) {
      if (I !== m || $e !== E) {
        if ((d !== 100 || S !== 100) && (e.blendEquation(e.FUNC_ADD), d = 100, S = 100), $e) switch (I) {
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
            console.error("THREE.WebGLState: Invalid blending: ", I);
            break;
        }
        else switch (I) {
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
            console.error("THREE.WebGLState: Invalid blending: ", I);
            break;
        }
        T = null, v = null, b = null, w = null, C.set(0, 0, 0), P = 0, m = I, E = $e;
      }
      return;
    }
    re = re || _e, J = J || ue, be = be || Ae, (_e !== d || re !== S) && (e.blendEquationSeparate(L[_e], L[re]), d = _e, S = re), (ue !== T || Ae !== v || J !== b || be !== w) && (e.blendFuncSeparate(K[ue], K[Ae], K[J], K[be]), T = ue, v = Ae, b = J, w = be), (Ie.equals(C) === !1 || lt !== P) && (e.blendColor(Ie.r, Ie.g, Ie.b, lt), C.copy(Ie), P = lt), m = I, E = !1;
  }
  function ie(I, _e) {
    I.side === 2 ? pe(e.CULL_FACE) : ee(e.CULL_FACE);
    let ue = I.side === 1;
    _e && (ue = !ue), j(ue), I.blending === 1 && I.transparent === !1 ? $(0) : $(I.blending, I.blendEquation, I.blendSrc, I.blendDst, I.blendEquationAlpha, I.blendSrcAlpha, I.blendDstAlpha, I.blendColor, I.blendAlpha, I.premultipliedAlpha), o.setFunc(I.depthFunc), o.setTest(I.depthTest), o.setMask(I.depthWrite), s.setMask(I.colorWrite);
    const Ae = I.stencilWrite;
    a.setTest(Ae), Ae && (a.setMask(I.stencilWriteMask), a.setFunc(I.stencilFunc, I.stencilRef, I.stencilFuncMask), a.setOp(I.stencilFail, I.stencilZFail, I.stencilZPass)), ae(I.polygonOffset, I.polygonOffsetFactor, I.polygonOffsetUnits), I.alphaToCoverage === !0 ? ee(e.SAMPLE_ALPHA_TO_COVERAGE) : pe(e.SAMPLE_ALPHA_TO_COVERAGE);
  }
  function j(I) {
    y !== I && (I ? e.frontFace(e.CW) : e.frontFace(e.CCW), y = I);
  }
  function de(I) {
    I !== 0 ? (ee(e.CULL_FACE), I !== R && (I === 1 ? e.cullFace(e.BACK) : I === 2 ? e.cullFace(e.FRONT) : e.cullFace(e.FRONT_AND_BACK))) : pe(e.CULL_FACE), R = I;
  }
  function ce(I) {
    I !== z && (W && e.lineWidth(I), z = I);
  }
  function ae(I, _e, ue) {
    I ? (ee(e.POLYGON_OFFSET_FILL), (k !== _e || B !== ue) && (e.polygonOffset(_e, ue), k = _e, B = ue)) : pe(e.POLYGON_OFFSET_FILL);
  }
  function Be(I) {
    I ? ee(e.SCISSOR_TEST) : pe(e.SCISSOR_TEST);
  }
  function ze(I) {
    I === void 0 && (I = e.TEXTURE0 + Z - 1), oe !== I && (e.activeTexture(I), oe = I);
  }
  function Ge(I, _e, ue) {
    ue === void 0 && (oe === null ? ue = e.TEXTURE0 + Z - 1 : ue = oe);
    let Ae = fe[ue];
    Ae === void 0 && (Ae = {
      type: void 0,
      texture: void 0
    }, fe[ue] = Ae), (Ae.type !== I || Ae.texture !== _e) && (oe !== ue && (e.activeTexture(ue), oe = ue), e.bindTexture(I, _e || X[I]), Ae.type = I, Ae.texture = _e);
  }
  function A() {
    const I = fe[oe];
    I !== void 0 && I.type !== void 0 && (e.bindTexture(I.type, null), I.type = void 0, I.texture = void 0);
  }
  function x() {
    try {
      e.compressedTexImage2D(...arguments);
    } catch (I) {
      console.error("THREE.WebGLState:", I);
    }
  }
  function N() {
    try {
      e.compressedTexImage3D(...arguments);
    } catch (I) {
      console.error("THREE.WebGLState:", I);
    }
  }
  function q() {
    try {
      e.texSubImage2D(...arguments);
    } catch (I) {
      console.error("THREE.WebGLState:", I);
    }
  }
  function te() {
    try {
      e.texSubImage3D(...arguments);
    } catch (I) {
      console.error("THREE.WebGLState:", I);
    }
  }
  function Y() {
    try {
      e.compressedTexSubImage2D(...arguments);
    } catch (I) {
      console.error("THREE.WebGLState:", I);
    }
  }
  function Me() {
    try {
      e.compressedTexSubImage3D(...arguments);
    } catch (I) {
      console.error("THREE.WebGLState:", I);
    }
  }
  function he() {
    try {
      e.texStorage2D(...arguments);
    } catch (I) {
      console.error("THREE.WebGLState:", I);
    }
  }
  function Te() {
    try {
      e.texStorage3D(...arguments);
    } catch (I) {
      console.error("THREE.WebGLState:", I);
    }
  }
  function De() {
    try {
      e.texImage2D(...arguments);
    } catch (I) {
      console.error("THREE.WebGLState:", I);
    }
  }
  function le() {
    try {
      e.texImage3D(...arguments);
    } catch (I) {
      console.error("THREE.WebGLState:", I);
    }
  }
  function ge(I) {
    Je.equals(I) === !1 && (e.scissor(I.x, I.y, I.z, I.w), Je.copy(I));
  }
  function Re(I) {
    Ye.equals(I) === !1 && (e.viewport(I.x, I.y, I.z, I.w), Ye.copy(I));
  }
  function Ce(I, _e) {
    let ue = l.get(_e);
    ue === void 0 && (ue = /* @__PURE__ */ new WeakMap(), l.set(_e, ue));
    let Ae = ue.get(I);
    Ae === void 0 && (Ae = e.getUniformBlockIndex(_e, I.name), ue.set(I, Ae));
  }
  function ve(I, _e) {
    const ue = l.get(_e).get(I);
    c.get(_e) !== ue && (e.uniformBlockBinding(_e, ue, I.__bindingPointIndex), c.set(_e, ue));
  }
  function We() {
    e.disable(e.BLEND), e.disable(e.CULL_FACE), e.disable(e.DEPTH_TEST), e.disable(e.POLYGON_OFFSET_FILL), e.disable(e.SCISSOR_TEST), e.disable(e.STENCIL_TEST), e.disable(e.SAMPLE_ALPHA_TO_COVERAGE), e.blendEquation(e.FUNC_ADD), e.blendFunc(e.ONE, e.ZERO), e.blendFuncSeparate(e.ONE, e.ZERO, e.ONE, e.ZERO), e.blendColor(0, 0, 0, 0), e.colorMask(!0, !0, !0, !0), e.clearColor(0, 0, 0, 0), e.depthMask(!0), e.depthFunc(e.LESS), o.setReversed(!1), e.clearDepth(1), e.stencilMask(4294967295), e.stencilFunc(e.ALWAYS, 0, 4294967295), e.stencilOp(e.KEEP, e.KEEP, e.KEEP), e.clearStencil(0), e.cullFace(e.BACK), e.frontFace(e.CCW), e.polygonOffset(0, 0), e.activeTexture(e.TEXTURE0), e.bindFramebuffer(e.FRAMEBUFFER, null), e.bindFramebuffer(e.DRAW_FRAMEBUFFER, null), e.bindFramebuffer(e.READ_FRAMEBUFFER, null), e.useProgram(null), e.lineWidth(1), e.scissor(0, 0, e.canvas.width, e.canvas.height), e.viewport(0, 0, e.canvas.width, e.canvas.height), h = {}, oe = null, fe = {}, u = {}, f = /* @__PURE__ */ new WeakMap(), p = [], g = null, _ = !1, m = null, d = null, T = null, v = null, S = null, b = null, w = null, C = new qe(0, 0, 0), P = 0, E = !1, y = null, R = null, z = null, k = null, B = null, Je.set(0, 0, e.canvas.width, e.canvas.height), Ye.set(0, 0, e.canvas.width, e.canvas.height), s.reset(), o.reset(), a.reset();
  }
  return {
    buffers: {
      color: s,
      depth: o,
      stencil: a
    },
    enable: ee,
    disable: pe,
    bindFramebuffer: Pe,
    drawBuffers: ye,
    useProgram: ke,
    setBlending: $,
    setMaterial: ie,
    setFlipSided: j,
    setCullFace: de,
    setLineWidth: ce,
    setPolygonOffset: ae,
    setScissorTest: Be,
    activeTexture: ze,
    bindTexture: Ge,
    unbindTexture: A,
    compressedTexImage2D: x,
    compressedTexImage3D: N,
    texImage2D: De,
    texImage3D: le,
    updateUBOMapping: Ce,
    uniformBlockBinding: ve,
    texStorage2D: he,
    texStorage3D: Te,
    texSubImage2D: q,
    texSubImage3D: te,
    compressedTexSubImage2D: Y,
    compressedTexSubImage3D: Me,
    scissor: ge,
    viewport: Re,
    reset: We
  };
}
function nf(e, t, n, i, r, s, o) {
  const a = t.has("WEBGL_multisampled_render_to_texture") ? t.get("WEBGL_multisampled_render_to_texture") : null, c = typeof navigator > "u" ? !1 : /OculusBrowser/g.test(navigator.userAgent), l = new se(), h = /* @__PURE__ */ new WeakMap();
  let u;
  const f = /* @__PURE__ */ new WeakMap();
  let p = !1;
  try {
    p = typeof OffscreenCanvas < "u" && new OffscreenCanvas(1, 1).getContext("2d") !== null;
  } catch {
  }
  function g(A, x) {
    return p ? new OffscreenCanvas(A, x) : mr("canvas");
  }
  function _(A, x, N) {
    let q = 1;
    const te = Ge(A);
    if ((te.width > N || te.height > N) && (q = N / Math.max(te.width, te.height)), q < 1) if (typeof HTMLImageElement < "u" && A instanceof HTMLImageElement || typeof HTMLCanvasElement < "u" && A instanceof HTMLCanvasElement || typeof ImageBitmap < "u" && A instanceof ImageBitmap || typeof VideoFrame < "u" && A instanceof VideoFrame) {
      const Y = Math.floor(q * te.width), Me = Math.floor(q * te.height);
      u === void 0 && (u = g(Y, Me));
      const he = x ? g(Y, Me) : u;
      return he.width = Y, he.height = Me, he.getContext("2d").drawImage(A, 0, 0, Y, Me), console.warn("THREE.WebGLRenderer: Texture has been resized from (" + te.width + "x" + te.height + ") to (" + Y + "x" + Me + ")."), he;
    } else
      return "data" in A && console.warn("THREE.WebGLRenderer: Image in DataTexture is too big (" + te.width + "x" + te.height + ")."), A;
    return A;
  }
  function m(A) {
    return A.generateMipmaps;
  }
  function d(A) {
    e.generateMipmap(A);
  }
  function T(A) {
    return A.isWebGLCubeRenderTarget ? e.TEXTURE_CUBE_MAP : A.isWebGL3DRenderTarget ? e.TEXTURE_3D : A.isWebGLArrayRenderTarget || A.isCompressedArrayTexture ? e.TEXTURE_2D_ARRAY : e.TEXTURE_2D;
  }
  function v(A, x, N, q, te = !1) {
    if (A !== null) {
      if (e[A] !== void 0) return e[A];
      console.warn("THREE.WebGLRenderer: Attempt to use non-existing WebGL internal format '" + A + "'");
    }
    let Y = x;
    if (x === e.RED && (N === e.FLOAT && (Y = e.R32F), N === e.HALF_FLOAT && (Y = e.R16F), N === e.UNSIGNED_BYTE && (Y = e.R8)), x === e.RED_INTEGER && (N === e.UNSIGNED_BYTE && (Y = e.R8UI), N === e.UNSIGNED_SHORT && (Y = e.R16UI), N === e.UNSIGNED_INT && (Y = e.R32UI), N === e.BYTE && (Y = e.R8I), N === e.SHORT && (Y = e.R16I), N === e.INT && (Y = e.R32I)), x === e.RG && (N === e.FLOAT && (Y = e.RG32F), N === e.HALF_FLOAT && (Y = e.RG16F), N === e.UNSIGNED_BYTE && (Y = e.RG8)), x === e.RG_INTEGER && (N === e.UNSIGNED_BYTE && (Y = e.RG8UI), N === e.UNSIGNED_SHORT && (Y = e.RG16UI), N === e.UNSIGNED_INT && (Y = e.RG32UI), N === e.BYTE && (Y = e.RG8I), N === e.SHORT && (Y = e.RG16I), N === e.INT && (Y = e.RG32I)), x === e.RGB_INTEGER && (N === e.UNSIGNED_BYTE && (Y = e.RGB8UI), N === e.UNSIGNED_SHORT && (Y = e.RGB16UI), N === e.UNSIGNED_INT && (Y = e.RGB32UI), N === e.BYTE && (Y = e.RGB8I), N === e.SHORT && (Y = e.RGB16I), N === e.INT && (Y = e.RGB32I)), x === e.RGBA_INTEGER && (N === e.UNSIGNED_BYTE && (Y = e.RGBA8UI), N === e.UNSIGNED_SHORT && (Y = e.RGBA16UI), N === e.UNSIGNED_INT && (Y = e.RGBA32UI), N === e.BYTE && (Y = e.RGBA8I), N === e.SHORT && (Y = e.RGBA16I), N === e.INT && (Y = e.RGBA32I)), x === e.RGB && (N === e.UNSIGNED_INT_5_9_9_9_REV && (Y = e.RGB9_E5), N === e.UNSIGNED_INT_10F_11F_11F_REV && (Y = e.R11F_G11F_B10F)), x === e.RGBA) {
      const Me = te ? fr : je.getTransfer(q);
      N === e.FLOAT && (Y = e.RGBA32F), N === e.HALF_FLOAT && (Y = e.RGBA16F), N === e.UNSIGNED_BYTE && (Y = Me === "srgb" ? e.SRGB8_ALPHA8 : e.RGBA8), N === e.UNSIGNED_SHORT_4_4_4_4 && (Y = e.RGBA4), N === e.UNSIGNED_SHORT_5_5_5_1 && (Y = e.RGB5_A1);
    }
    return (Y === e.R16F || Y === e.R32F || Y === e.RG16F || Y === e.RG32F || Y === e.RGBA16F || Y === e.RGBA32F) && t.get("EXT_color_buffer_float"), Y;
  }
  function S(A, x) {
    let N;
    return A ? x === null || x === 1014 || x === 1020 ? N = e.DEPTH24_STENCIL8 : x === 1015 ? N = e.DEPTH32F_STENCIL8 : x === 1012 && (N = e.DEPTH24_STENCIL8, console.warn("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")) : x === null || x === 1014 || x === 1020 ? N = e.DEPTH_COMPONENT24 : x === 1015 ? N = e.DEPTH_COMPONENT32F : x === 1012 && (N = e.DEPTH_COMPONENT16), N;
  }
  function b(A, x) {
    return m(A) === !0 || A.isFramebufferTexture && A.minFilter !== 1003 && A.minFilter !== 1006 ? Math.log2(Math.max(x.width, x.height)) + 1 : A.mipmaps !== void 0 && A.mipmaps.length > 0 ? A.mipmaps.length : A.isCompressedTexture && Array.isArray(A.image) ? x.mipmaps.length : 1;
  }
  function w(A) {
    const x = A.target;
    x.removeEventListener("dispose", w), P(x), x.isVideoTexture && h.delete(x);
  }
  function C(A) {
    const x = A.target;
    x.removeEventListener("dispose", C), y(x);
  }
  function P(A) {
    const x = i.get(A);
    if (x.__webglInit === void 0) return;
    const N = A.source, q = f.get(N);
    if (q) {
      const te = q[x.__cacheKey];
      te.usedTimes--, te.usedTimes === 0 && E(A), Object.keys(q).length === 0 && f.delete(N);
    }
    i.remove(A);
  }
  function E(A) {
    const x = i.get(A);
    e.deleteTexture(x.__webglTexture);
    const N = A.source, q = f.get(N);
    delete q[x.__cacheKey], o.memory.textures--;
  }
  function y(A) {
    const x = i.get(A);
    if (A.depthTexture && (A.depthTexture.dispose(), i.remove(A.depthTexture)), A.isWebGLCubeRenderTarget) for (let q = 0; q < 6; q++) {
      if (Array.isArray(x.__webglFramebuffer[q])) for (let te = 0; te < x.__webglFramebuffer[q].length; te++) e.deleteFramebuffer(x.__webglFramebuffer[q][te]);
      else e.deleteFramebuffer(x.__webglFramebuffer[q]);
      x.__webglDepthbuffer && e.deleteRenderbuffer(x.__webglDepthbuffer[q]);
    }
    else {
      if (Array.isArray(x.__webglFramebuffer)) for (let q = 0; q < x.__webglFramebuffer.length; q++) e.deleteFramebuffer(x.__webglFramebuffer[q]);
      else e.deleteFramebuffer(x.__webglFramebuffer);
      if (x.__webglDepthbuffer && e.deleteRenderbuffer(x.__webglDepthbuffer), x.__webglMultisampledFramebuffer && e.deleteFramebuffer(x.__webglMultisampledFramebuffer), x.__webglColorRenderbuffer)
        for (let q = 0; q < x.__webglColorRenderbuffer.length; q++) x.__webglColorRenderbuffer[q] && e.deleteRenderbuffer(x.__webglColorRenderbuffer[q]);
      x.__webglDepthRenderbuffer && e.deleteRenderbuffer(x.__webglDepthRenderbuffer);
    }
    const N = A.textures;
    for (let q = 0, te = N.length; q < te; q++) {
      const Y = i.get(N[q]);
      Y.__webglTexture && (e.deleteTexture(Y.__webglTexture), o.memory.textures--), i.remove(N[q]);
    }
    i.remove(A);
  }
  let R = 0;
  function z() {
    R = 0;
  }
  function k() {
    const A = R;
    return A >= r.maxTextures && console.warn("THREE.WebGLTextures: Trying to use " + A + " texture units while this GPU supports only " + r.maxTextures), R += 1, A;
  }
  function B(A) {
    const x = [];
    return x.push(A.wrapS), x.push(A.wrapT), x.push(A.wrapR || 0), x.push(A.magFilter), x.push(A.minFilter), x.push(A.anisotropy), x.push(A.internalFormat), x.push(A.format), x.push(A.type), x.push(A.generateMipmaps), x.push(A.premultiplyAlpha), x.push(A.flipY), x.push(A.unpackAlignment), x.push(A.colorSpace), x.join();
  }
  function Z(A, x) {
    const N = i.get(A);
    if (A.isVideoTexture && Be(A), A.isRenderTargetTexture === !1 && A.isExternalTexture !== !0 && A.version > 0 && N.__version !== A.version) {
      const q = A.image;
      if (q === null) console.warn("THREE.WebGLRenderer: Texture marked for update but no image data found.");
      else if (q.complete === !1) console.warn("THREE.WebGLRenderer: Texture marked for update but image is incomplete");
      else {
        X(N, A, x);
        return;
      }
    } else A.isExternalTexture && (N.__webglTexture = A.sourceTexture ? A.sourceTexture : null);
    n.bindTexture(e.TEXTURE_2D, N.__webglTexture, e.TEXTURE0 + x);
  }
  function W(A, x) {
    const N = i.get(A);
    if (A.isRenderTargetTexture === !1 && A.version > 0 && N.__version !== A.version) {
      X(N, A, x);
      return;
    }
    n.bindTexture(e.TEXTURE_2D_ARRAY, N.__webglTexture, e.TEXTURE0 + x);
  }
  function Q(A, x) {
    const N = i.get(A);
    if (A.isRenderTargetTexture === !1 && A.version > 0 && N.__version !== A.version) {
      X(N, A, x);
      return;
    }
    n.bindTexture(e.TEXTURE_3D, N.__webglTexture, e.TEXTURE0 + x);
  }
  function G(A, x) {
    const N = i.get(A);
    if (A.version > 0 && N.__version !== A.version) {
      ee(N, A, x);
      return;
    }
    n.bindTexture(e.TEXTURE_CUBE_MAP, N.__webglTexture, e.TEXTURE0 + x);
  }
  const oe = {
    [ur]: e.REPEAT,
    [En]: e.CLAMP_TO_EDGE,
    [as]: e.MIRRORED_REPEAT
  }, fe = {
    [Ht]: e.NEAREST,
    [nl]: e.NEAREST_MIPMAP_NEAREST,
    [il]: e.NEAREST_MIPMAP_LINEAR,
    [cn]: e.LINEAR,
    [rl]: e.LINEAR_MIPMAP_NEAREST,
    [vr]: e.LINEAR_MIPMAP_LINEAR
  }, Le = {
    512: e.NEVER,
    519: e.ALWAYS,
    513: e.LESS,
    515: e.LEQUAL,
    514: e.EQUAL,
    518: e.GEQUAL,
    516: e.GREATER,
    517: e.NOTEQUAL
  };
  function Ue(A, x) {
    if (x.type === 1015 && t.has("OES_texture_float_linear") === !1 && (x.magFilter === 1006 || x.magFilter === 1007 || x.magFilter === 1005 || x.magFilter === 1008 || x.minFilter === 1006 || x.minFilter === 1007 || x.minFilter === 1005 || x.minFilter === 1008) && console.warn("THREE.WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."), e.texParameteri(A, e.TEXTURE_WRAP_S, oe[x.wrapS]), e.texParameteri(A, e.TEXTURE_WRAP_T, oe[x.wrapT]), (A === e.TEXTURE_3D || A === e.TEXTURE_2D_ARRAY) && e.texParameteri(A, e.TEXTURE_WRAP_R, oe[x.wrapR]), e.texParameteri(A, e.TEXTURE_MAG_FILTER, fe[x.magFilter]), e.texParameteri(A, e.TEXTURE_MIN_FILTER, fe[x.minFilter]), x.compareFunction && (e.texParameteri(A, e.TEXTURE_COMPARE_MODE, e.COMPARE_REF_TO_TEXTURE), e.texParameteri(A, e.TEXTURE_COMPARE_FUNC, Le[x.compareFunction])), t.has("EXT_texture_filter_anisotropic") === !0) {
      if (x.magFilter === 1003 || x.minFilter !== 1005 && x.minFilter !== 1008 || x.type === 1015 && t.has("OES_texture_float_linear") === !1) return;
      if (x.anisotropy > 1 || i.get(x).__currentAnisotropy) {
        const N = t.get("EXT_texture_filter_anisotropic");
        e.texParameterf(A, N.TEXTURE_MAX_ANISOTROPY_EXT, Math.min(x.anisotropy, r.getMaxAnisotropy())), i.get(x).__currentAnisotropy = x.anisotropy;
      }
    }
  }
  function Je(A, x) {
    let N = !1;
    A.__webglInit === void 0 && (A.__webglInit = !0, x.addEventListener("dispose", w));
    const q = x.source;
    let te = f.get(q);
    te === void 0 && (te = {}, f.set(q, te));
    const Y = B(x);
    if (Y !== A.__cacheKey) {
      te[Y] === void 0 && (te[Y] = {
        texture: e.createTexture(),
        usedTimes: 0
      }, o.memory.textures++, N = !0), te[Y].usedTimes++;
      const Me = te[A.__cacheKey];
      Me !== void 0 && (te[A.__cacheKey].usedTimes--, Me.usedTimes === 0 && E(x)), A.__cacheKey = Y, A.__webglTexture = te[Y].texture;
    }
    return N;
  }
  function Ye(A, x, N) {
    return Math.floor(Math.floor(A / N) / x);
  }
  function F(A, x, N, q) {
    const Y = A.updateRanges;
    if (Y.length === 0) n.texSubImage2D(e.TEXTURE_2D, 0, 0, 0, x.width, x.height, N, q, x.data);
    else {
      Y.sort((le, ge) => le.start - ge.start);
      let Me = 0;
      for (let le = 1; le < Y.length; le++) {
        const ge = Y[Me], Re = Y[le], Ce = ge.start + ge.count, ve = Ye(Re.start, x.width, 4), We = Ye(ge.start, x.width, 4);
        Re.start <= Ce + 1 && ve === We && Ye(Re.start + Re.count - 1, x.width, 4) === ve ? ge.count = Math.max(ge.count, Re.start + Re.count - ge.start) : (++Me, Y[Me] = Re);
      }
      Y.length = Me + 1;
      const he = e.getParameter(e.UNPACK_ROW_LENGTH), Te = e.getParameter(e.UNPACK_SKIP_PIXELS), De = e.getParameter(e.UNPACK_SKIP_ROWS);
      e.pixelStorei(e.UNPACK_ROW_LENGTH, x.width);
      for (let le = 0, ge = Y.length; le < ge; le++) {
        const Re = Y[le], Ce = Math.floor(Re.start / 4), ve = Math.ceil(Re.count / 4), We = Ce % x.width, I = Math.floor(Ce / x.width), _e = ve, ue = 1;
        e.pixelStorei(e.UNPACK_SKIP_PIXELS, We), e.pixelStorei(e.UNPACK_SKIP_ROWS, I), n.texSubImage2D(e.TEXTURE_2D, 0, We, I, _e, ue, N, q, x.data);
      }
      A.clearUpdateRanges(), e.pixelStorei(e.UNPACK_ROW_LENGTH, he), e.pixelStorei(e.UNPACK_SKIP_PIXELS, Te), e.pixelStorei(e.UNPACK_SKIP_ROWS, De);
    }
  }
  function X(A, x, N) {
    let q = e.TEXTURE_2D;
    (x.isDataArrayTexture || x.isCompressedArrayTexture) && (q = e.TEXTURE_2D_ARRAY), x.isData3DTexture && (q = e.TEXTURE_3D);
    const te = Je(A, x), Y = x.source;
    n.bindTexture(q, A.__webglTexture, e.TEXTURE0 + N);
    const Me = i.get(Y);
    if (Y.version !== Me.__version || te === !0) {
      n.activeTexture(e.TEXTURE0 + N);
      const he = je.getPrimaries(je.workingColorSpace), Te = x.colorSpace === "" ? null : je.getPrimaries(x.colorSpace), De = x.colorSpace === "" || he === Te ? e.NONE : e.BROWSER_DEFAULT_WEBGL;
      e.pixelStorei(e.UNPACK_FLIP_Y_WEBGL, x.flipY), e.pixelStorei(e.UNPACK_PREMULTIPLY_ALPHA_WEBGL, x.premultiplyAlpha), e.pixelStorei(e.UNPACK_ALIGNMENT, x.unpackAlignment), e.pixelStorei(e.UNPACK_COLORSPACE_CONVERSION_WEBGL, De);
      let le = _(x.image, !1, r.maxTextureSize);
      le = ze(x, le);
      const ge = s.convert(x.format, x.colorSpace), Re = s.convert(x.type);
      let Ce = v(x.internalFormat, ge, Re, x.colorSpace, x.isVideoTexture);
      Ue(q, x);
      let ve;
      const We = x.mipmaps, I = x.isVideoTexture !== !0, _e = Me.__version === void 0 || te === !0, ue = Y.dataReady, Ae = b(x, le);
      if (x.isDepthTexture)
        Ce = S(x.format === qo, x.type), _e && (I ? n.texStorage2D(e.TEXTURE_2D, 1, Ce, le.width, le.height) : n.texImage2D(e.TEXTURE_2D, 0, Ce, le.width, le.height, 0, ge, Re, null));
      else if (x.isDataTexture) if (We.length > 0) {
        I && _e && n.texStorage2D(e.TEXTURE_2D, Ae, Ce, We[0].width, We[0].height);
        for (let re = 0, J = We.length; re < J; re++)
          ve = We[re], I ? ue && n.texSubImage2D(e.TEXTURE_2D, re, 0, 0, ve.width, ve.height, ge, Re, ve.data) : n.texImage2D(e.TEXTURE_2D, re, Ce, ve.width, ve.height, 0, ge, Re, ve.data);
        x.generateMipmaps = !1;
      } else I ? (_e && n.texStorage2D(e.TEXTURE_2D, Ae, Ce, le.width, le.height), ue && F(x, le, ge, Re)) : n.texImage2D(e.TEXTURE_2D, 0, Ce, le.width, le.height, 0, ge, Re, le.data);
      else if (x.isCompressedTexture) if (x.isCompressedArrayTexture) {
        I && _e && n.texStorage3D(e.TEXTURE_2D_ARRAY, Ae, Ce, We[0].width, We[0].height, le.depth);
        for (let re = 0, J = We.length; re < J; re++)
          if (ve = We[re], x.format !== 1023) if (ge !== null) if (I) {
            if (ue) if (x.layerUpdates.size > 0) {
              const be = _o(ve.width, ve.height, x.format, x.type);
              for (const Ie of x.layerUpdates) {
                const lt = ve.data.subarray(Ie * be / ve.data.BYTES_PER_ELEMENT, (Ie + 1) * be / ve.data.BYTES_PER_ELEMENT);
                n.compressedTexSubImage3D(e.TEXTURE_2D_ARRAY, re, 0, 0, Ie, ve.width, ve.height, 1, ge, lt);
              }
              x.clearLayerUpdates();
            } else n.compressedTexSubImage3D(e.TEXTURE_2D_ARRAY, re, 0, 0, 0, ve.width, ve.height, le.depth, ge, ve.data);
          } else n.compressedTexImage3D(e.TEXTURE_2D_ARRAY, re, Ce, ve.width, ve.height, le.depth, 0, ve.data, 0, 0);
          else console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");
          else I ? ue && n.texSubImage3D(e.TEXTURE_2D_ARRAY, re, 0, 0, 0, ve.width, ve.height, le.depth, ge, Re, ve.data) : n.texImage3D(e.TEXTURE_2D_ARRAY, re, Ce, ve.width, ve.height, le.depth, 0, ge, Re, ve.data);
      } else {
        I && _e && n.texStorage2D(e.TEXTURE_2D, Ae, Ce, We[0].width, We[0].height);
        for (let re = 0, J = We.length; re < J; re++)
          ve = We[re], x.format !== 1023 ? ge !== null ? I ? ue && n.compressedTexSubImage2D(e.TEXTURE_2D, re, 0, 0, ve.width, ve.height, ge, ve.data) : n.compressedTexImage2D(e.TEXTURE_2D, re, Ce, ve.width, ve.height, 0, ve.data) : console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()") : I ? ue && n.texSubImage2D(e.TEXTURE_2D, re, 0, 0, ve.width, ve.height, ge, Re, ve.data) : n.texImage2D(e.TEXTURE_2D, re, Ce, ve.width, ve.height, 0, ge, Re, ve.data);
      }
      else if (x.isDataArrayTexture) if (I) {
        if (_e && n.texStorage3D(e.TEXTURE_2D_ARRAY, Ae, Ce, le.width, le.height, le.depth), ue) if (x.layerUpdates.size > 0) {
          const re = _o(le.width, le.height, x.format, x.type);
          for (const J of x.layerUpdates) {
            const be = le.data.subarray(J * re / le.data.BYTES_PER_ELEMENT, (J + 1) * re / le.data.BYTES_PER_ELEMENT);
            n.texSubImage3D(e.TEXTURE_2D_ARRAY, 0, 0, 0, J, le.width, le.height, 1, ge, Re, be);
          }
          x.clearLayerUpdates();
        } else n.texSubImage3D(e.TEXTURE_2D_ARRAY, 0, 0, 0, 0, le.width, le.height, le.depth, ge, Re, le.data);
      } else n.texImage3D(e.TEXTURE_2D_ARRAY, 0, Ce, le.width, le.height, le.depth, 0, ge, Re, le.data);
      else if (x.isData3DTexture) I ? (_e && n.texStorage3D(e.TEXTURE_3D, Ae, Ce, le.width, le.height, le.depth), ue && n.texSubImage3D(e.TEXTURE_3D, 0, 0, 0, 0, le.width, le.height, le.depth, ge, Re, le.data)) : n.texImage3D(e.TEXTURE_3D, 0, Ce, le.width, le.height, le.depth, 0, ge, Re, le.data);
      else if (x.isFramebufferTexture) {
        if (_e) if (I) n.texStorage2D(e.TEXTURE_2D, Ae, Ce, le.width, le.height);
        else {
          let re = le.width, J = le.height;
          for (let be = 0; be < Ae; be++)
            n.texImage2D(e.TEXTURE_2D, be, Ce, re, J, 0, ge, Re, null), re >>= 1, J >>= 1;
        }
      } else if (We.length > 0) {
        if (I && _e) {
          const re = Ge(We[0]);
          n.texStorage2D(e.TEXTURE_2D, Ae, Ce, re.width, re.height);
        }
        for (let re = 0, J = We.length; re < J; re++)
          ve = We[re], I ? ue && n.texSubImage2D(e.TEXTURE_2D, re, 0, 0, ge, Re, ve) : n.texImage2D(e.TEXTURE_2D, re, Ce, ge, Re, ve);
        x.generateMipmaps = !1;
      } else if (I) {
        if (_e) {
          const re = Ge(le);
          n.texStorage2D(e.TEXTURE_2D, Ae, Ce, re.width, re.height);
        }
        ue && n.texSubImage2D(e.TEXTURE_2D, 0, 0, 0, ge, Re, le);
      } else n.texImage2D(e.TEXTURE_2D, 0, Ce, ge, Re, le);
      m(x) && d(q), Me.__version = Y.version, x.onUpdate && x.onUpdate(x);
    }
    A.__version = x.version;
  }
  function ee(A, x, N) {
    if (x.image.length !== 6) return;
    const q = Je(A, x), te = x.source;
    n.bindTexture(e.TEXTURE_CUBE_MAP, A.__webglTexture, e.TEXTURE0 + N);
    const Y = i.get(te);
    if (te.version !== Y.__version || q === !0) {
      n.activeTexture(e.TEXTURE0 + N);
      const Me = je.getPrimaries(je.workingColorSpace), he = x.colorSpace === "" ? null : je.getPrimaries(x.colorSpace), Te = x.colorSpace === "" || Me === he ? e.NONE : e.BROWSER_DEFAULT_WEBGL;
      e.pixelStorei(e.UNPACK_FLIP_Y_WEBGL, x.flipY), e.pixelStorei(e.UNPACK_PREMULTIPLY_ALPHA_WEBGL, x.premultiplyAlpha), e.pixelStorei(e.UNPACK_ALIGNMENT, x.unpackAlignment), e.pixelStorei(e.UNPACK_COLORSPACE_CONVERSION_WEBGL, Te);
      const De = x.isCompressedTexture || x.image[0].isCompressedTexture, le = x.image[0] && x.image[0].isDataTexture, ge = [];
      for (let J = 0; J < 6; J++)
        !De && !le ? ge[J] = _(x.image[J], !0, r.maxCubemapSize) : ge[J] = le ? x.image[J].image : x.image[J], ge[J] = ze(x, ge[J]);
      const Re = ge[0], Ce = s.convert(x.format, x.colorSpace), ve = s.convert(x.type), We = v(x.internalFormat, Ce, ve, x.colorSpace), I = x.isVideoTexture !== !0, _e = Y.__version === void 0 || q === !0, ue = te.dataReady;
      let Ae = b(x, Re);
      Ue(e.TEXTURE_CUBE_MAP, x);
      let re;
      if (De) {
        I && _e && n.texStorage2D(e.TEXTURE_CUBE_MAP, Ae, We, Re.width, Re.height);
        for (let J = 0; J < 6; J++) {
          re = ge[J].mipmaps;
          for (let be = 0; be < re.length; be++) {
            const Ie = re[be];
            x.format !== 1023 ? Ce !== null ? I ? ue && n.compressedTexSubImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X + J, be, 0, 0, Ie.width, Ie.height, Ce, Ie.data) : n.compressedTexImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X + J, be, We, Ie.width, Ie.height, 0, Ie.data) : console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()") : I ? ue && n.texSubImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X + J, be, 0, 0, Ie.width, Ie.height, Ce, ve, Ie.data) : n.texImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X + J, be, We, Ie.width, Ie.height, 0, Ce, ve, Ie.data);
          }
        }
      } else {
        if (re = x.mipmaps, I && _e) {
          re.length > 0 && Ae++;
          const J = Ge(ge[0]);
          n.texStorage2D(e.TEXTURE_CUBE_MAP, Ae, We, J.width, J.height);
        }
        for (let J = 0; J < 6; J++) if (le) {
          I ? ue && n.texSubImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X + J, 0, 0, 0, ge[J].width, ge[J].height, Ce, ve, ge[J].data) : n.texImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X + J, 0, We, ge[J].width, ge[J].height, 0, Ce, ve, ge[J].data);
          for (let be = 0; be < re.length; be++) {
            const Ie = re[be].image[J].image;
            I ? ue && n.texSubImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X + J, be + 1, 0, 0, Ie.width, Ie.height, Ce, ve, Ie.data) : n.texImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X + J, be + 1, We, Ie.width, Ie.height, 0, Ce, ve, Ie.data);
          }
        } else {
          I ? ue && n.texSubImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X + J, 0, 0, 0, Ce, ve, ge[J]) : n.texImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X + J, 0, We, Ce, ve, ge[J]);
          for (let be = 0; be < re.length; be++) {
            const Ie = re[be];
            I ? ue && n.texSubImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X + J, be + 1, 0, 0, Ce, ve, Ie.image[J]) : n.texImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X + J, be + 1, We, Ce, ve, Ie.image[J]);
          }
        }
      }
      m(x) && d(e.TEXTURE_CUBE_MAP), Y.__version = te.version, x.onUpdate && x.onUpdate(x);
    }
    A.__version = x.version;
  }
  function pe(A, x, N, q, te, Y) {
    const Me = s.convert(N.format, N.colorSpace), he = s.convert(N.type), Te = v(N.internalFormat, Me, he, N.colorSpace), De = i.get(x), le = i.get(N);
    if (le.__renderTarget = x, !De.__hasExternalTextures) {
      const ge = Math.max(1, x.width >> Y), Re = Math.max(1, x.height >> Y);
      te === e.TEXTURE_3D || te === e.TEXTURE_2D_ARRAY ? n.texImage3D(te, Y, Te, ge, Re, x.depth, 0, Me, he, null) : n.texImage2D(te, Y, Te, ge, Re, 0, Me, he, null);
    }
    n.bindFramebuffer(e.FRAMEBUFFER, A), ae(x) ? a.framebufferTexture2DMultisampleEXT(e.FRAMEBUFFER, q, te, le.__webglTexture, 0, ce(x)) : (te === e.TEXTURE_2D || te >= e.TEXTURE_CUBE_MAP_POSITIVE_X && te <= e.TEXTURE_CUBE_MAP_NEGATIVE_Z) && e.framebufferTexture2D(e.FRAMEBUFFER, q, te, le.__webglTexture, Y), n.bindFramebuffer(e.FRAMEBUFFER, null);
  }
  function Pe(A, x, N) {
    if (e.bindRenderbuffer(e.RENDERBUFFER, A), x.depthBuffer) {
      const q = x.depthTexture, te = q && q.isDepthTexture ? q.type : null, Y = S(x.stencilBuffer, te), Me = x.stencilBuffer ? e.DEPTH_STENCIL_ATTACHMENT : e.DEPTH_ATTACHMENT, he = ce(x);
      ae(x) ? a.renderbufferStorageMultisampleEXT(e.RENDERBUFFER, he, Y, x.width, x.height) : N ? e.renderbufferStorageMultisample(e.RENDERBUFFER, he, Y, x.width, x.height) : e.renderbufferStorage(e.RENDERBUFFER, Y, x.width, x.height), e.framebufferRenderbuffer(e.FRAMEBUFFER, Me, e.RENDERBUFFER, A);
    } else {
      const q = x.textures;
      for (let te = 0; te < q.length; te++) {
        const Y = q[te], Me = s.convert(Y.format, Y.colorSpace), he = s.convert(Y.type), Te = v(Y.internalFormat, Me, he, Y.colorSpace), De = ce(x);
        N && ae(x) === !1 ? e.renderbufferStorageMultisample(e.RENDERBUFFER, De, Te, x.width, x.height) : ae(x) ? a.renderbufferStorageMultisampleEXT(e.RENDERBUFFER, De, Te, x.width, x.height) : e.renderbufferStorage(e.RENDERBUFFER, Te, x.width, x.height);
      }
    }
    e.bindRenderbuffer(e.RENDERBUFFER, null);
  }
  function ye(A, x) {
    if (x && x.isWebGLCubeRenderTarget) throw new Error("Depth Texture with cube render targets is not supported");
    if (n.bindFramebuffer(e.FRAMEBUFFER, A), !(x.depthTexture && x.depthTexture.isDepthTexture)) throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");
    const N = i.get(x.depthTexture);
    N.__renderTarget = x, (!N.__webglTexture || x.depthTexture.image.width !== x.width || x.depthTexture.image.height !== x.height) && (x.depthTexture.image.width = x.width, x.depthTexture.image.height = x.height, x.depthTexture.needsUpdate = !0), Z(x.depthTexture, 0);
    const q = N.__webglTexture, te = ce(x);
    if (x.depthTexture.format === 1026) ae(x) ? a.framebufferTexture2DMultisampleEXT(e.FRAMEBUFFER, e.DEPTH_ATTACHMENT, e.TEXTURE_2D, q, 0, te) : e.framebufferTexture2D(e.FRAMEBUFFER, e.DEPTH_ATTACHMENT, e.TEXTURE_2D, q, 0);
    else if (x.depthTexture.format === 1027) ae(x) ? a.framebufferTexture2DMultisampleEXT(e.FRAMEBUFFER, e.DEPTH_STENCIL_ATTACHMENT, e.TEXTURE_2D, q, 0, te) : e.framebufferTexture2D(e.FRAMEBUFFER, e.DEPTH_STENCIL_ATTACHMENT, e.TEXTURE_2D, q, 0);
    else throw new Error("Unknown depthTexture format");
  }
  function ke(A) {
    const x = i.get(A), N = A.isWebGLCubeRenderTarget === !0;
    if (x.__boundDepthTexture !== A.depthTexture) {
      const q = A.depthTexture;
      if (x.__depthDisposeCallback && x.__depthDisposeCallback(), q) {
        const te = () => {
          delete x.__boundDepthTexture, delete x.__depthDisposeCallback, q.removeEventListener("dispose", te);
        };
        q.addEventListener("dispose", te), x.__depthDisposeCallback = te;
      }
      x.__boundDepthTexture = q;
    }
    if (A.depthTexture && !x.__autoAllocateDepthBuffer) {
      if (N) throw new Error("target.depthTexture not supported in Cube render targets");
      const q = A.texture.mipmaps;
      q && q.length > 0 ? ye(x.__webglFramebuffer[0], A) : ye(x.__webglFramebuffer, A);
    } else if (N) {
      x.__webglDepthbuffer = [];
      for (let q = 0; q < 6; q++)
        if (n.bindFramebuffer(e.FRAMEBUFFER, x.__webglFramebuffer[q]), x.__webglDepthbuffer[q] === void 0)
          x.__webglDepthbuffer[q] = e.createRenderbuffer(), Pe(x.__webglDepthbuffer[q], A, !1);
        else {
          const te = A.stencilBuffer ? e.DEPTH_STENCIL_ATTACHMENT : e.DEPTH_ATTACHMENT, Y = x.__webglDepthbuffer[q];
          e.bindRenderbuffer(e.RENDERBUFFER, Y), e.framebufferRenderbuffer(e.FRAMEBUFFER, te, e.RENDERBUFFER, Y);
        }
    } else {
      const q = A.texture.mipmaps;
      if (q && q.length > 0 ? n.bindFramebuffer(e.FRAMEBUFFER, x.__webglFramebuffer[0]) : n.bindFramebuffer(e.FRAMEBUFFER, x.__webglFramebuffer), x.__webglDepthbuffer === void 0)
        x.__webglDepthbuffer = e.createRenderbuffer(), Pe(x.__webglDepthbuffer, A, !1);
      else {
        const te = A.stencilBuffer ? e.DEPTH_STENCIL_ATTACHMENT : e.DEPTH_ATTACHMENT, Y = x.__webglDepthbuffer;
        e.bindRenderbuffer(e.RENDERBUFFER, Y), e.framebufferRenderbuffer(e.FRAMEBUFFER, te, e.RENDERBUFFER, Y);
      }
    }
    n.bindFramebuffer(e.FRAMEBUFFER, null);
  }
  function L(A, x, N) {
    const q = i.get(A);
    x !== void 0 && pe(q.__webglFramebuffer, A, A.texture, e.COLOR_ATTACHMENT0, e.TEXTURE_2D, 0), N !== void 0 && ke(A);
  }
  function K(A) {
    const x = A.texture, N = i.get(A), q = i.get(x);
    A.addEventListener("dispose", C);
    const te = A.textures, Y = A.isWebGLCubeRenderTarget === !0, Me = te.length > 1;
    if (Me || (q.__webglTexture === void 0 && (q.__webglTexture = e.createTexture()), q.__version = x.version, o.memory.textures++), Y) {
      N.__webglFramebuffer = [];
      for (let he = 0; he < 6; he++) if (x.mipmaps && x.mipmaps.length > 0) {
        N.__webglFramebuffer[he] = [];
        for (let Te = 0; Te < x.mipmaps.length; Te++) N.__webglFramebuffer[he][Te] = e.createFramebuffer();
      } else N.__webglFramebuffer[he] = e.createFramebuffer();
    } else {
      if (x.mipmaps && x.mipmaps.length > 0) {
        N.__webglFramebuffer = [];
        for (let he = 0; he < x.mipmaps.length; he++) N.__webglFramebuffer[he] = e.createFramebuffer();
      } else N.__webglFramebuffer = e.createFramebuffer();
      if (Me) for (let he = 0, Te = te.length; he < Te; he++) {
        const De = i.get(te[he]);
        De.__webglTexture === void 0 && (De.__webglTexture = e.createTexture(), o.memory.textures++);
      }
      if (A.samples > 0 && ae(A) === !1) {
        N.__webglMultisampledFramebuffer = e.createFramebuffer(), N.__webglColorRenderbuffer = [], n.bindFramebuffer(e.FRAMEBUFFER, N.__webglMultisampledFramebuffer);
        for (let he = 0; he < te.length; he++) {
          const Te = te[he];
          N.__webglColorRenderbuffer[he] = e.createRenderbuffer(), e.bindRenderbuffer(e.RENDERBUFFER, N.__webglColorRenderbuffer[he]);
          const De = s.convert(Te.format, Te.colorSpace), le = s.convert(Te.type), ge = v(Te.internalFormat, De, le, Te.colorSpace, A.isXRRenderTarget === !0), Re = ce(A);
          e.renderbufferStorageMultisample(e.RENDERBUFFER, Re, ge, A.width, A.height), e.framebufferRenderbuffer(e.FRAMEBUFFER, e.COLOR_ATTACHMENT0 + he, e.RENDERBUFFER, N.__webglColorRenderbuffer[he]);
        }
        e.bindRenderbuffer(e.RENDERBUFFER, null), A.depthBuffer && (N.__webglDepthRenderbuffer = e.createRenderbuffer(), Pe(N.__webglDepthRenderbuffer, A, !0)), n.bindFramebuffer(e.FRAMEBUFFER, null);
      }
    }
    if (Y) {
      n.bindTexture(e.TEXTURE_CUBE_MAP, q.__webglTexture), Ue(e.TEXTURE_CUBE_MAP, x);
      for (let he = 0; he < 6; he++) if (x.mipmaps && x.mipmaps.length > 0) for (let Te = 0; Te < x.mipmaps.length; Te++) pe(N.__webglFramebuffer[he][Te], A, x, e.COLOR_ATTACHMENT0, e.TEXTURE_CUBE_MAP_POSITIVE_X + he, Te);
      else pe(N.__webglFramebuffer[he], A, x, e.COLOR_ATTACHMENT0, e.TEXTURE_CUBE_MAP_POSITIVE_X + he, 0);
      m(x) && d(e.TEXTURE_CUBE_MAP), n.unbindTexture();
    } else if (Me) {
      for (let he = 0, Te = te.length; he < Te; he++) {
        const De = te[he], le = i.get(De);
        let ge = e.TEXTURE_2D;
        (A.isWebGL3DRenderTarget || A.isWebGLArrayRenderTarget) && (ge = A.isWebGL3DRenderTarget ? e.TEXTURE_3D : e.TEXTURE_2D_ARRAY), n.bindTexture(ge, le.__webglTexture), Ue(ge, De), pe(N.__webglFramebuffer, A, De, e.COLOR_ATTACHMENT0 + he, ge, 0), m(De) && d(ge);
      }
      n.unbindTexture();
    } else {
      let he = e.TEXTURE_2D;
      if ((A.isWebGL3DRenderTarget || A.isWebGLArrayRenderTarget) && (he = A.isWebGL3DRenderTarget ? e.TEXTURE_3D : e.TEXTURE_2D_ARRAY), n.bindTexture(he, q.__webglTexture), Ue(he, x), x.mipmaps && x.mipmaps.length > 0) for (let Te = 0; Te < x.mipmaps.length; Te++) pe(N.__webglFramebuffer[Te], A, x, e.COLOR_ATTACHMENT0, he, Te);
      else pe(N.__webglFramebuffer, A, x, e.COLOR_ATTACHMENT0, he, 0);
      m(x) && d(he), n.unbindTexture();
    }
    A.depthBuffer && ke(A);
  }
  function $(A) {
    const x = A.textures;
    for (let N = 0, q = x.length; N < q; N++) {
      const te = x[N];
      if (m(te)) {
        const Y = T(A), Me = i.get(te).__webglTexture;
        n.bindTexture(Y, Me), d(Y), n.unbindTexture();
      }
    }
  }
  const ie = [], j = [];
  function de(A) {
    if (A.samples > 0) {
      if (ae(A) === !1) {
        const x = A.textures, N = A.width, q = A.height;
        let te = e.COLOR_BUFFER_BIT;
        const Y = A.stencilBuffer ? e.DEPTH_STENCIL_ATTACHMENT : e.DEPTH_ATTACHMENT, Me = i.get(A), he = x.length > 1;
        if (he) for (let De = 0; De < x.length; De++)
          n.bindFramebuffer(e.FRAMEBUFFER, Me.__webglMultisampledFramebuffer), e.framebufferRenderbuffer(e.FRAMEBUFFER, e.COLOR_ATTACHMENT0 + De, e.RENDERBUFFER, null), n.bindFramebuffer(e.FRAMEBUFFER, Me.__webglFramebuffer), e.framebufferTexture2D(e.DRAW_FRAMEBUFFER, e.COLOR_ATTACHMENT0 + De, e.TEXTURE_2D, null, 0);
        n.bindFramebuffer(e.READ_FRAMEBUFFER, Me.__webglMultisampledFramebuffer);
        const Te = A.texture.mipmaps;
        Te && Te.length > 0 ? n.bindFramebuffer(e.DRAW_FRAMEBUFFER, Me.__webglFramebuffer[0]) : n.bindFramebuffer(e.DRAW_FRAMEBUFFER, Me.__webglFramebuffer);
        for (let De = 0; De < x.length; De++) {
          if (A.resolveDepthBuffer && (A.depthBuffer && (te |= e.DEPTH_BUFFER_BIT), A.stencilBuffer && A.resolveStencilBuffer && (te |= e.STENCIL_BUFFER_BIT)), he) {
            e.framebufferRenderbuffer(e.READ_FRAMEBUFFER, e.COLOR_ATTACHMENT0, e.RENDERBUFFER, Me.__webglColorRenderbuffer[De]);
            const le = i.get(x[De]).__webglTexture;
            e.framebufferTexture2D(e.DRAW_FRAMEBUFFER, e.COLOR_ATTACHMENT0, e.TEXTURE_2D, le, 0);
          }
          e.blitFramebuffer(0, 0, N, q, 0, 0, N, q, te, e.NEAREST), c === !0 && (ie.length = 0, j.length = 0, ie.push(e.COLOR_ATTACHMENT0 + De), A.depthBuffer && A.resolveDepthBuffer === !1 && (ie.push(Y), j.push(Y), e.invalidateFramebuffer(e.DRAW_FRAMEBUFFER, j)), e.invalidateFramebuffer(e.READ_FRAMEBUFFER, ie));
        }
        if (n.bindFramebuffer(e.READ_FRAMEBUFFER, null), n.bindFramebuffer(e.DRAW_FRAMEBUFFER, null), he) for (let De = 0; De < x.length; De++) {
          n.bindFramebuffer(e.FRAMEBUFFER, Me.__webglMultisampledFramebuffer), e.framebufferRenderbuffer(e.FRAMEBUFFER, e.COLOR_ATTACHMENT0 + De, e.RENDERBUFFER, Me.__webglColorRenderbuffer[De]);
          const le = i.get(x[De]).__webglTexture;
          n.bindFramebuffer(e.FRAMEBUFFER, Me.__webglFramebuffer), e.framebufferTexture2D(e.DRAW_FRAMEBUFFER, e.COLOR_ATTACHMENT0 + De, e.TEXTURE_2D, le, 0);
        }
        n.bindFramebuffer(e.DRAW_FRAMEBUFFER, Me.__webglMultisampledFramebuffer);
      } else if (A.depthBuffer && A.resolveDepthBuffer === !1 && c) {
        const x = A.stencilBuffer ? e.DEPTH_STENCIL_ATTACHMENT : e.DEPTH_ATTACHMENT;
        e.invalidateFramebuffer(e.DRAW_FRAMEBUFFER, [x]);
      }
    }
  }
  function ce(A) {
    return Math.min(r.maxSamples, A.samples);
  }
  function ae(A) {
    const x = i.get(A);
    return A.samples > 0 && t.has("WEBGL_multisampled_render_to_texture") === !0 && x.__useRenderToTexture !== !1;
  }
  function Be(A) {
    const x = o.render.frame;
    h.get(A) !== x && (h.set(A, x), A.update());
  }
  function ze(A, x) {
    const N = A.colorSpace, q = A.format, te = A.type;
    return A.isCompressedTexture === !0 || A.isVideoTexture === !0 || N !== "srgb-linear" && N !== "" && (je.getTransfer(N) === "srgb" ? (q !== 1023 || te !== 1009) && console.warn("THREE.WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType.") : console.error("THREE.WebGLTextures: Unsupported texture color space:", N)), x;
  }
  function Ge(A) {
    return typeof HTMLImageElement < "u" && A instanceof HTMLImageElement ? (l.width = A.naturalWidth || A.width, l.height = A.naturalHeight || A.height) : typeof VideoFrame < "u" && A instanceof VideoFrame ? (l.width = A.displayWidth, l.height = A.displayHeight) : (l.width = A.width, l.height = A.height), l;
  }
  this.allocateTextureUnit = k, this.resetTextureUnits = z, this.setTexture2D = Z, this.setTexture2DArray = W, this.setTexture3D = Q, this.setTextureCube = G, this.rebindTextures = L, this.setupRenderTarget = K, this.updateRenderTargetMipmap = $, this.updateMultisampleRenderTarget = de, this.setupDepthRenderbuffer = ke, this.setupFrameBufferTexture = pe, this.useMultisampledRTT = ae;
}
function rf(e, t) {
  function n(i, r = "") {
    let s;
    const o = je.getTransfer(r);
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
      if (s = t.get("WEBGL_compressed_texture_s3tc_srgb"), s !== null) {
        if (i === 33776) return s.COMPRESSED_SRGB_S3TC_DXT1_EXT;
        if (i === 33777) return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;
        if (i === 33778) return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;
        if (i === 33779) return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT;
      } else return null;
    else if (s = t.get("WEBGL_compressed_texture_s3tc"), s !== null) {
      if (i === 33776) return s.COMPRESSED_RGB_S3TC_DXT1_EXT;
      if (i === 33777) return s.COMPRESSED_RGBA_S3TC_DXT1_EXT;
      if (i === 33778) return s.COMPRESSED_RGBA_S3TC_DXT3_EXT;
      if (i === 33779) return s.COMPRESSED_RGBA_S3TC_DXT5_EXT;
    } else return null;
    if (i === 35840 || i === 35841 || i === 35842 || i === 35843)
      if (s = t.get("WEBGL_compressed_texture_pvrtc"), s !== null) {
        if (i === 35840) return s.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;
        if (i === 35841) return s.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;
        if (i === 35842) return s.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;
        if (i === 35843) return s.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG;
      } else return null;
    if (i === 36196 || i === 37492 || i === 37496)
      if (s = t.get("WEBGL_compressed_texture_etc"), s !== null) {
        if (i === 36196 || i === 37492) return o === "srgb" ? s.COMPRESSED_SRGB8_ETC2 : s.COMPRESSED_RGB8_ETC2;
        if (i === 37496) return o === "srgb" ? s.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC : s.COMPRESSED_RGBA8_ETC2_EAC;
      } else return null;
    if (i === 37808 || i === 37809 || i === 37810 || i === 37811 || i === 37812 || i === 37813 || i === 37814 || i === 37815 || i === 37816 || i === 37817 || i === 37818 || i === 37819 || i === 37820 || i === 37821)
      if (s = t.get("WEBGL_compressed_texture_astc"), s !== null) {
        if (i === 37808) return o === "srgb" ? s.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR : s.COMPRESSED_RGBA_ASTC_4x4_KHR;
        if (i === 37809) return o === "srgb" ? s.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR : s.COMPRESSED_RGBA_ASTC_5x4_KHR;
        if (i === 37810) return o === "srgb" ? s.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR : s.COMPRESSED_RGBA_ASTC_5x5_KHR;
        if (i === 37811) return o === "srgb" ? s.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR : s.COMPRESSED_RGBA_ASTC_6x5_KHR;
        if (i === 37812) return o === "srgb" ? s.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR : s.COMPRESSED_RGBA_ASTC_6x6_KHR;
        if (i === 37813) return o === "srgb" ? s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR : s.COMPRESSED_RGBA_ASTC_8x5_KHR;
        if (i === 37814) return o === "srgb" ? s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR : s.COMPRESSED_RGBA_ASTC_8x6_KHR;
        if (i === 37815) return o === "srgb" ? s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR : s.COMPRESSED_RGBA_ASTC_8x8_KHR;
        if (i === 37816) return o === "srgb" ? s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR : s.COMPRESSED_RGBA_ASTC_10x5_KHR;
        if (i === 37817) return o === "srgb" ? s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR : s.COMPRESSED_RGBA_ASTC_10x6_KHR;
        if (i === 37818) return o === "srgb" ? s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR : s.COMPRESSED_RGBA_ASTC_10x8_KHR;
        if (i === 37819) return o === "srgb" ? s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR : s.COMPRESSED_RGBA_ASTC_10x10_KHR;
        if (i === 37820) return o === "srgb" ? s.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR : s.COMPRESSED_RGBA_ASTC_12x10_KHR;
        if (i === 37821) return o === "srgb" ? s.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR : s.COMPRESSED_RGBA_ASTC_12x12_KHR;
      } else return null;
    if (i === 36492 || i === 36494 || i === 36495)
      if (s = t.get("EXT_texture_compression_bptc"), s !== null) {
        if (i === 36492) return o === "srgb" ? s.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT : s.COMPRESSED_RGBA_BPTC_UNORM_EXT;
        if (i === 36494) return s.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;
        if (i === 36495) return s.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT;
      } else return null;
    if (i === 36283 || i === 36284 || i === 36285 || i === 36286)
      if (s = t.get("EXT_texture_compression_rgtc"), s !== null) {
        if (i === 36283) return s.COMPRESSED_RED_RGTC1_EXT;
        if (i === 36284) return s.COMPRESSED_SIGNED_RED_RGTC1_EXT;
        if (i === 36285) return s.COMPRESSED_RED_GREEN_RGTC2_EXT;
        if (i === 36286) return s.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT;
      } else return null;
    return i === 1020 ? e.UNSIGNED_INT_24_8 : e[i] !== void 0 ? e[i] : null;
  }
  return { convert: n };
}
var sf = `
void main() {

	gl_Position = vec4( position, 1.0 );

}`, of = `
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

}`, af = class {
  constructor() {
    this.texture = null, this.mesh = null, this.depthNear = 0, this.depthFar = 0;
  }
  init(e, t) {
    if (this.texture === null) {
      const n = new ma(e.texture);
      (e.depthNear !== t.depthNear || e.depthFar !== t.depthFar) && (this.depthNear = e.depthNear, this.depthFar = e.depthFar), this.texture = n;
    }
  }
  getMesh(e) {
    if (this.texture !== null && this.mesh === null) {
      const t = e.cameras[0].viewport, n = new dn({
        vertexShader: sf,
        fragmentShader: of,
        uniforms: {
          depthColor: { value: this.texture },
          depthWidth: { value: t.z },
          depthHeight: { value: t.w }
        }
      });
      this.mesh = new Rt(new Pa(20, 20), n);
    }
    return this.mesh;
  }
  reset() {
    this.texture = null, this.mesh = null;
  }
  getDepthTexture() {
    return this.texture;
  }
}, lf = class extends An {
  constructor(e, t) {
    super();
    const n = this;
    let i = null, r = 1, s = null, o = "local-floor", a = 1, c = null, l = null, h = null, u = null, f = null, p = null;
    const g = typeof XRWebGLBinding < "u", _ = new af(), m = {}, d = t.getContextAttributes();
    let T = null, v = null;
    const S = [], b = [], w = new se();
    let C = null;
    const P = new zt();
    P.viewport = new ht();
    const E = new zt();
    E.viewport = new ht();
    const y = [P, E], R = new jh();
    let z = null, k = null;
    this.cameraAutoUpdate = !0, this.enabled = !1, this.isPresenting = !1, this.getController = function(F) {
      let X = S[F];
      return X === void 0 && (X = new Yr(), S[F] = X), X.getTargetRaySpace();
    }, this.getControllerGrip = function(F) {
      let X = S[F];
      return X === void 0 && (X = new Yr(), S[F] = X), X.getGripSpace();
    }, this.getHand = function(F) {
      let X = S[F];
      return X === void 0 && (X = new Yr(), S[F] = X), X.getHandSpace();
    };
    function B(F) {
      const X = b.indexOf(F.inputSource);
      if (X === -1) return;
      const ee = S[X];
      ee !== void 0 && (ee.update(F.inputSource, F.frame, c || s), ee.dispatchEvent({
        type: F.type,
        data: F.inputSource
      }));
    }
    function Z() {
      i.removeEventListener("select", B), i.removeEventListener("selectstart", B), i.removeEventListener("selectend", B), i.removeEventListener("squeeze", B), i.removeEventListener("squeezestart", B), i.removeEventListener("squeezeend", B), i.removeEventListener("end", Z), i.removeEventListener("inputsourceschange", W);
      for (let F = 0; F < S.length; F++) {
        const X = b[F];
        X !== null && (b[F] = null, S[F].disconnect(X));
      }
      z = null, k = null, _.reset();
      for (const F in m) delete m[F];
      e.setRenderTarget(T), f = null, u = null, h = null, i = null, v = null, Ye.stop(), n.isPresenting = !1, e.setPixelRatio(C), e.setSize(w.width, w.height, !1), n.dispatchEvent({ type: "sessionend" });
    }
    this.setFramebufferScaleFactor = function(F) {
      r = F, n.isPresenting === !0 && console.warn("THREE.WebXRManager: Cannot change framebuffer scale while presenting.");
    }, this.setReferenceSpaceType = function(F) {
      o = F, n.isPresenting === !0 && console.warn("THREE.WebXRManager: Cannot change reference space type while presenting.");
    }, this.getReferenceSpace = function() {
      return c || s;
    }, this.setReferenceSpace = function(F) {
      c = F;
    }, this.getBaseLayer = function() {
      return u !== null ? u : f;
    }, this.getBinding = function() {
      return h === null && g && (h = new XRWebGLBinding(i, t)), h;
    }, this.getFrame = function() {
      return p;
    }, this.getSession = function() {
      return i;
    }, this.setSession = async function(F) {
      if (i = F, i !== null) {
        if (T = e.getRenderTarget(), i.addEventListener("select", B), i.addEventListener("selectstart", B), i.addEventListener("selectend", B), i.addEventListener("squeeze", B), i.addEventListener("squeezestart", B), i.addEventListener("squeezeend", B), i.addEventListener("end", Z), i.addEventListener("inputsourceschange", W), d.xrCompatible !== !0 && await t.makeXRCompatible(), C = e.getPixelRatio(), e.getSize(w), g && "createProjectionLayer" in XRWebGLBinding.prototype) {
          let X = null, ee = null, pe = null;
          d.depth && (pe = d.stencil ? t.DEPTH24_STENCIL8 : t.DEPTH_COMPONENT24, X = d.stencil ? qo : Yo, ee = d.stencil ? ul : gs);
          const Pe = {
            colorFormat: t.RGBA8,
            depthFormat: pe,
            scaleFactor: r
          };
          h = this.getBinding(), u = h.createProjectionLayer(Pe), i.updateRenderState({ layers: [u] }), e.setPixelRatio(1), e.setSize(u.textureWidth, u.textureHeight, !1), v = new Tn(u.textureWidth, u.textureHeight, {
            format: $n,
            type: Jn,
            depthTexture: new pa(u.textureWidth, u.textureHeight, ee, void 0, void 0, void 0, void 0, void 0, void 0, X),
            stencilBuffer: d.stencil,
            colorSpace: e.outputColorSpace,
            samples: d.antialias ? 4 : 0,
            resolveDepthBuffer: u.ignoreDepthValues === !1,
            resolveStencilBuffer: u.ignoreDepthValues === !1
          });
        } else {
          const X = {
            antialias: d.antialias,
            alpha: !0,
            depth: d.depth,
            stencil: d.stencil,
            framebufferScaleFactor: r
          };
          f = new XRWebGLLayer(i, t, X), i.updateRenderState({ baseLayer: f }), e.setPixelRatio(1), e.setSize(f.framebufferWidth, f.framebufferHeight, !1), v = new Tn(f.framebufferWidth, f.framebufferHeight, {
            format: $n,
            type: Jn,
            colorSpace: e.outputColorSpace,
            stencilBuffer: d.stencil,
            resolveDepthBuffer: f.ignoreDepthValues === !1,
            resolveStencilBuffer: f.ignoreDepthValues === !1
          });
        }
        v.isXRRenderTarget = !0, this.setFoveation(a), c = null, s = await i.requestReferenceSpace(o), Ye.setContext(i), Ye.start(), n.isPresenting = !0, n.dispatchEvent({ type: "sessionstart" });
      }
    }, this.getEnvironmentBlendMode = function() {
      if (i !== null) return i.environmentBlendMode;
    }, this.getDepthTexture = function() {
      return _.getDepthTexture();
    };
    function W(F) {
      for (let X = 0; X < F.removed.length; X++) {
        const ee = F.removed[X], pe = b.indexOf(ee);
        pe >= 0 && (b[pe] = null, S[pe].disconnect(ee));
      }
      for (let X = 0; X < F.added.length; X++) {
        const ee = F.added[X];
        let pe = b.indexOf(ee);
        if (pe === -1) {
          for (let ye = 0; ye < S.length; ye++) if (ye >= b.length) {
            b.push(ee), pe = ye;
            break;
          } else if (b[ye] === null) {
            b[ye] = ee, pe = ye;
            break;
          }
          if (pe === -1) break;
        }
        const Pe = S[pe];
        Pe && Pe.connect(ee);
      }
    }
    const Q = new D(), G = new D();
    function oe(F, X, ee) {
      Q.setFromMatrixPosition(X.matrixWorld), G.setFromMatrixPosition(ee.matrixWorld);
      const pe = Q.distanceTo(G), Pe = X.projectionMatrix.elements, ye = ee.projectionMatrix.elements, ke = Pe[14] / (Pe[10] - 1), L = Pe[14] / (Pe[10] + 1), K = (Pe[9] + 1) / Pe[5], $ = (Pe[9] - 1) / Pe[5], ie = (Pe[8] - 1) / Pe[0], j = (ye[8] + 1) / ye[0], de = ke * ie, ce = ke * j, ae = pe / (-ie + j), Be = ae * -ie;
      if (X.matrixWorld.decompose(F.position, F.quaternion, F.scale), F.translateX(Be), F.translateZ(ae), F.matrixWorld.compose(F.position, F.quaternion, F.scale), F.matrixWorldInverse.copy(F.matrixWorld).invert(), Pe[10] === -1)
        F.projectionMatrix.copy(X.projectionMatrix), F.projectionMatrixInverse.copy(X.projectionMatrixInverse);
      else {
        const ze = ke + ae, Ge = L + ae, A = de - Be, x = ce + (pe - Be), N = K * L / Ge * ze, q = $ * L / Ge * ze;
        F.projectionMatrix.makePerspective(A, x, N, q, ze, Ge), F.projectionMatrixInverse.copy(F.projectionMatrix).invert();
      }
    }
    function fe(F, X) {
      X === null ? F.matrixWorld.copy(F.matrix) : F.matrixWorld.multiplyMatrices(X.matrixWorld, F.matrix), F.matrixWorldInverse.copy(F.matrixWorld).invert();
    }
    this.updateCamera = function(F) {
      if (i === null) return;
      let X = F.near, ee = F.far;
      _.texture !== null && (_.depthNear > 0 && (X = _.depthNear), _.depthFar > 0 && (ee = _.depthFar)), R.near = E.near = P.near = X, R.far = E.far = P.far = ee, (z !== R.near || k !== R.far) && (i.updateRenderState({
        depthNear: R.near,
        depthFar: R.far
      }), z = R.near, k = R.far), R.layers.mask = F.layers.mask | 6, P.layers.mask = R.layers.mask & 3, E.layers.mask = R.layers.mask & 5;
      const pe = F.parent, Pe = R.cameras;
      fe(R, pe);
      for (let ye = 0; ye < Pe.length; ye++) fe(Pe[ye], pe);
      Pe.length === 2 ? oe(R, P, E) : R.projectionMatrix.copy(P.projectionMatrix), Le(F, R, pe);
    };
    function Le(F, X, ee) {
      ee === null ? F.matrix.copy(X.matrixWorld) : (F.matrix.copy(ee.matrixWorld), F.matrix.invert(), F.matrix.multiply(X.matrixWorld)), F.matrix.decompose(F.position, F.quaternion, F.scale), F.updateMatrixWorld(!0), F.projectionMatrix.copy(X.projectionMatrix), F.projectionMatrixInverse.copy(X.projectionMatrixInverse), F.isPerspectiveCamera && (F.fov = Si * 2 * Math.atan(1 / F.projectionMatrix.elements[5]), F.zoom = 1);
    }
    this.getCamera = function() {
      return R;
    }, this.getFoveation = function() {
      if (!(u === null && f === null))
        return a;
    }, this.setFoveation = function(F) {
      a = F, u !== null && (u.fixedFoveation = F), f !== null && f.fixedFoveation !== void 0 && (f.fixedFoveation = F);
    }, this.hasDepthSensing = function() {
      return _.texture !== null;
    }, this.getDepthSensingMesh = function() {
      return _.getMesh(R);
    }, this.getCameraTexture = function(F) {
      return m[F];
    };
    let Ue = null;
    function Je(F, X) {
      if (l = X.getViewerPose(c || s), p = X, l !== null) {
        const ee = l.views;
        f !== null && (e.setRenderTargetFramebuffer(v, f.framebuffer), e.setRenderTarget(v));
        let pe = !1;
        ee.length !== R.cameras.length && (R.cameras.length = 0, pe = !0);
        for (let ye = 0; ye < ee.length; ye++) {
          const ke = ee[ye];
          let L = null;
          if (f !== null) L = f.getViewport(ke);
          else {
            const $ = h.getViewSubImage(u, ke);
            L = $.viewport, ye === 0 && (e.setRenderTargetTextures(v, $.colorTexture, $.depthStencilTexture), e.setRenderTarget(v));
          }
          let K = y[ye];
          K === void 0 && (K = new zt(), K.layers.enable(ye), K.viewport = new ht(), y[ye] = K), K.matrix.fromArray(ke.transform.matrix), K.matrix.decompose(K.position, K.quaternion, K.scale), K.projectionMatrix.fromArray(ke.projectionMatrix), K.projectionMatrixInverse.copy(K.projectionMatrix).invert(), K.viewport.set(L.x, L.y, L.width, L.height), ye === 0 && (R.matrix.copy(K.matrix), R.matrix.decompose(R.position, R.quaternion, R.scale)), pe === !0 && R.cameras.push(K);
        }
        const Pe = i.enabledFeatures;
        if (Pe && Pe.includes("depth-sensing") && i.depthUsage == "gpu-optimized" && g) {
          h = n.getBinding();
          const ye = h.getDepthInformation(ee[0]);
          ye && ye.isValid && ye.texture && _.init(ye, i.renderState);
        }
        if (Pe && Pe.includes("camera-access") && g) {
          e.state.unbindTexture(), h = n.getBinding();
          for (let ye = 0; ye < ee.length; ye++) {
            const ke = ee[ye].camera;
            if (ke) {
              let L = m[ke];
              L || (L = new ma(), m[ke] = L);
              const K = h.getCameraImage(ke);
              L.sourceTexture = K;
            }
          }
        }
      }
      for (let ee = 0; ee < S.length; ee++) {
        const pe = b[ee], Pe = S[ee];
        pe !== null && Pe !== void 0 && Pe.update(pe, X, c || s);
      }
      Ue && Ue(F, X), X.detectedPlanes && n.dispatchEvent({
        type: "planesdetected",
        data: X
      }), p = null;
    }
    const Ye = new Oa();
    Ye.setAnimationLoop(Je), this.setAnimationLoop = function(F) {
      Ue = F;
    }, this.dispose = function() {
    };
  }
}, yn = /* @__PURE__ */ new un(), cf = /* @__PURE__ */ new nt();
function hf(e, t) {
  function n(m, d) {
    m.matrixAutoUpdate === !0 && m.updateMatrix(), d.value.copy(m.matrix);
  }
  function i(m, d) {
    d.color.getRGB(m.fogColor.value, ca(e)), d.isFog ? (m.fogNear.value = d.near, m.fogFar.value = d.far) : d.isFogExp2 && (m.fogDensity.value = d.density);
  }
  function r(m, d, T, v, S) {
    d.isMeshBasicMaterial || d.isMeshLambertMaterial ? s(m, d) : d.isMeshToonMaterial ? (s(m, d), u(m, d)) : d.isMeshPhongMaterial ? (s(m, d), h(m, d)) : d.isMeshStandardMaterial ? (s(m, d), f(m, d), d.isMeshPhysicalMaterial && p(m, d, S)) : d.isMeshMatcapMaterial ? (s(m, d), g(m, d)) : d.isMeshDepthMaterial ? s(m, d) : d.isMeshDistanceMaterial ? (s(m, d), _(m, d)) : d.isMeshNormalMaterial ? s(m, d) : d.isLineBasicMaterial ? (o(m, d), d.isLineDashedMaterial && a(m, d)) : d.isPointsMaterial ? c(m, d, T, v) : d.isSpriteMaterial ? l(m, d) : d.isShadowMaterial ? (m.color.value.copy(d.color), m.opacity.value = d.opacity) : d.isShaderMaterial && (d.uniformsNeedUpdate = !1);
  }
  function s(m, d) {
    m.opacity.value = d.opacity, d.color && m.diffuse.value.copy(d.color), d.emissive && m.emissive.value.copy(d.emissive).multiplyScalar(d.emissiveIntensity), d.map && (m.map.value = d.map, n(d.map, m.mapTransform)), d.alphaMap && (m.alphaMap.value = d.alphaMap, n(d.alphaMap, m.alphaMapTransform)), d.bumpMap && (m.bumpMap.value = d.bumpMap, n(d.bumpMap, m.bumpMapTransform), m.bumpScale.value = d.bumpScale, d.side === 1 && (m.bumpScale.value *= -1)), d.normalMap && (m.normalMap.value = d.normalMap, n(d.normalMap, m.normalMapTransform), m.normalScale.value.copy(d.normalScale), d.side === 1 && m.normalScale.value.negate()), d.displacementMap && (m.displacementMap.value = d.displacementMap, n(d.displacementMap, m.displacementMapTransform), m.displacementScale.value = d.displacementScale, m.displacementBias.value = d.displacementBias), d.emissiveMap && (m.emissiveMap.value = d.emissiveMap, n(d.emissiveMap, m.emissiveMapTransform)), d.specularMap && (m.specularMap.value = d.specularMap, n(d.specularMap, m.specularMapTransform)), d.alphaTest > 0 && (m.alphaTest.value = d.alphaTest);
    const T = t.get(d), v = T.envMap, S = T.envMapRotation;
    v && (m.envMap.value = v, yn.copy(S), yn.x *= -1, yn.y *= -1, yn.z *= -1, v.isCubeTexture && v.isRenderTargetTexture === !1 && (yn.y *= -1, yn.z *= -1), m.envMapRotation.value.setFromMatrix4(cf.makeRotationFromEuler(yn)), m.flipEnvMap.value = v.isCubeTexture && v.isRenderTargetTexture === !1 ? -1 : 1, m.reflectivity.value = d.reflectivity, m.ior.value = d.ior, m.refractionRatio.value = d.refractionRatio), d.lightMap && (m.lightMap.value = d.lightMap, m.lightMapIntensity.value = d.lightMapIntensity, n(d.lightMap, m.lightMapTransform)), d.aoMap && (m.aoMap.value = d.aoMap, m.aoMapIntensity.value = d.aoMapIntensity, n(d.aoMap, m.aoMapTransform));
  }
  function o(m, d) {
    m.diffuse.value.copy(d.color), m.opacity.value = d.opacity, d.map && (m.map.value = d.map, n(d.map, m.mapTransform));
  }
  function a(m, d) {
    m.dashSize.value = d.dashSize, m.totalSize.value = d.dashSize + d.gapSize, m.scale.value = d.scale;
  }
  function c(m, d, T, v) {
    m.diffuse.value.copy(d.color), m.opacity.value = d.opacity, m.size.value = d.size * T, m.scale.value = v * 0.5, d.map && (m.map.value = d.map, n(d.map, m.uvTransform)), d.alphaMap && (m.alphaMap.value = d.alphaMap, n(d.alphaMap, m.alphaMapTransform)), d.alphaTest > 0 && (m.alphaTest.value = d.alphaTest);
  }
  function l(m, d) {
    m.diffuse.value.copy(d.color), m.opacity.value = d.opacity, m.rotation.value = d.rotation, d.map && (m.map.value = d.map, n(d.map, m.mapTransform)), d.alphaMap && (m.alphaMap.value = d.alphaMap, n(d.alphaMap, m.alphaMapTransform)), d.alphaTest > 0 && (m.alphaTest.value = d.alphaTest);
  }
  function h(m, d) {
    m.specular.value.copy(d.specular), m.shininess.value = Math.max(d.shininess, 1e-4);
  }
  function u(m, d) {
    d.gradientMap && (m.gradientMap.value = d.gradientMap);
  }
  function f(m, d) {
    m.metalness.value = d.metalness, d.metalnessMap && (m.metalnessMap.value = d.metalnessMap, n(d.metalnessMap, m.metalnessMapTransform)), m.roughness.value = d.roughness, d.roughnessMap && (m.roughnessMap.value = d.roughnessMap, n(d.roughnessMap, m.roughnessMapTransform)), d.envMap && (m.envMapIntensity.value = d.envMapIntensity);
  }
  function p(m, d, T) {
    m.ior.value = d.ior, d.sheen > 0 && (m.sheenColor.value.copy(d.sheenColor).multiplyScalar(d.sheen), m.sheenRoughness.value = d.sheenRoughness, d.sheenColorMap && (m.sheenColorMap.value = d.sheenColorMap, n(d.sheenColorMap, m.sheenColorMapTransform)), d.sheenRoughnessMap && (m.sheenRoughnessMap.value = d.sheenRoughnessMap, n(d.sheenRoughnessMap, m.sheenRoughnessMapTransform))), d.clearcoat > 0 && (m.clearcoat.value = d.clearcoat, m.clearcoatRoughness.value = d.clearcoatRoughness, d.clearcoatMap && (m.clearcoatMap.value = d.clearcoatMap, n(d.clearcoatMap, m.clearcoatMapTransform)), d.clearcoatRoughnessMap && (m.clearcoatRoughnessMap.value = d.clearcoatRoughnessMap, n(d.clearcoatRoughnessMap, m.clearcoatRoughnessMapTransform)), d.clearcoatNormalMap && (m.clearcoatNormalMap.value = d.clearcoatNormalMap, n(d.clearcoatNormalMap, m.clearcoatNormalMapTransform), m.clearcoatNormalScale.value.copy(d.clearcoatNormalScale), d.side === 1 && m.clearcoatNormalScale.value.negate())), d.dispersion > 0 && (m.dispersion.value = d.dispersion), d.iridescence > 0 && (m.iridescence.value = d.iridescence, m.iridescenceIOR.value = d.iridescenceIOR, m.iridescenceThicknessMinimum.value = d.iridescenceThicknessRange[0], m.iridescenceThicknessMaximum.value = d.iridescenceThicknessRange[1], d.iridescenceMap && (m.iridescenceMap.value = d.iridescenceMap, n(d.iridescenceMap, m.iridescenceMapTransform)), d.iridescenceThicknessMap && (m.iridescenceThicknessMap.value = d.iridescenceThicknessMap, n(d.iridescenceThicknessMap, m.iridescenceThicknessMapTransform))), d.transmission > 0 && (m.transmission.value = d.transmission, m.transmissionSamplerMap.value = T.texture, m.transmissionSamplerSize.value.set(T.width, T.height), d.transmissionMap && (m.transmissionMap.value = d.transmissionMap, n(d.transmissionMap, m.transmissionMapTransform)), m.thickness.value = d.thickness, d.thicknessMap && (m.thicknessMap.value = d.thicknessMap, n(d.thicknessMap, m.thicknessMapTransform)), m.attenuationDistance.value = d.attenuationDistance, m.attenuationColor.value.copy(d.attenuationColor)), d.anisotropy > 0 && (m.anisotropyVector.value.set(d.anisotropy * Math.cos(d.anisotropyRotation), d.anisotropy * Math.sin(d.anisotropyRotation)), d.anisotropyMap && (m.anisotropyMap.value = d.anisotropyMap, n(d.anisotropyMap, m.anisotropyMapTransform))), m.specularIntensity.value = d.specularIntensity, m.specularColor.value.copy(d.specularColor), d.specularColorMap && (m.specularColorMap.value = d.specularColorMap, n(d.specularColorMap, m.specularColorMapTransform)), d.specularIntensityMap && (m.specularIntensityMap.value = d.specularIntensityMap, n(d.specularIntensityMap, m.specularIntensityMapTransform));
  }
  function g(m, d) {
    d.matcap && (m.matcap.value = d.matcap);
  }
  function _(m, d) {
    const T = t.get(d).light;
    m.referencePosition.value.setFromMatrixPosition(T.matrixWorld), m.nearDistance.value = T.shadow.camera.near, m.farDistance.value = T.shadow.camera.far;
  }
  return {
    refreshFogUniforms: i,
    refreshMaterialUniforms: r
  };
}
function uf(e, t, n, i) {
  let r = {}, s = {}, o = [];
  const a = e.getParameter(e.MAX_UNIFORM_BUFFER_BINDINGS);
  function c(T, v) {
    const S = v.program;
    i.uniformBlockBinding(T, S);
  }
  function l(T, v) {
    let S = r[T.id];
    S === void 0 && (g(T), S = h(T), r[T.id] = S, T.addEventListener("dispose", m));
    const b = v.program;
    i.updateUBOMapping(T, b);
    const w = t.render.frame;
    s[T.id] !== w && (f(T), s[T.id] = w);
  }
  function h(T) {
    const v = u();
    T.__bindingPointIndex = v;
    const S = e.createBuffer(), b = T.__size, w = T.usage;
    return e.bindBuffer(e.UNIFORM_BUFFER, S), e.bufferData(e.UNIFORM_BUFFER, b, w), e.bindBuffer(e.UNIFORM_BUFFER, null), e.bindBufferBase(e.UNIFORM_BUFFER, v, S), S;
  }
  function u() {
    for (let T = 0; T < a; T++) if (o.indexOf(T) === -1)
      return o.push(T), T;
    return console.error("THREE.WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."), 0;
  }
  function f(T) {
    const v = r[T.id], S = T.uniforms, b = T.__cache;
    e.bindBuffer(e.UNIFORM_BUFFER, v);
    for (let w = 0, C = S.length; w < C; w++) {
      const P = Array.isArray(S[w]) ? S[w] : [S[w]];
      for (let E = 0, y = P.length; E < y; E++) {
        const R = P[E];
        if (p(R, w, E, b) === !0) {
          const z = R.__offset, k = Array.isArray(R.value) ? R.value : [R.value];
          let B = 0;
          for (let Z = 0; Z < k.length; Z++) {
            const W = k[Z], Q = _(W);
            typeof W == "number" || typeof W == "boolean" ? (R.__data[0] = W, e.bufferSubData(e.UNIFORM_BUFFER, z + B, R.__data)) : W.isMatrix3 ? (R.__data[0] = W.elements[0], R.__data[1] = W.elements[1], R.__data[2] = W.elements[2], R.__data[3] = 0, R.__data[4] = W.elements[3], R.__data[5] = W.elements[4], R.__data[6] = W.elements[5], R.__data[7] = 0, R.__data[8] = W.elements[6], R.__data[9] = W.elements[7], R.__data[10] = W.elements[8], R.__data[11] = 0) : (W.toArray(R.__data, B), B += Q.storage / Float32Array.BYTES_PER_ELEMENT);
          }
          e.bufferSubData(e.UNIFORM_BUFFER, z, R.__data);
        }
      }
    }
    e.bindBuffer(e.UNIFORM_BUFFER, null);
  }
  function p(T, v, S, b) {
    const w = T.value, C = v + "_" + S;
    if (b[C] === void 0)
      return typeof w == "number" || typeof w == "boolean" ? b[C] = w : b[C] = w.clone(), !0;
    {
      const P = b[C];
      if (typeof w == "number" || typeof w == "boolean") {
        if (P !== w)
          return b[C] = w, !0;
      } else if (P.equals(w) === !1)
        return P.copy(w), !0;
    }
    return !1;
  }
  function g(T) {
    const v = T.uniforms;
    let S = 0;
    const b = 16;
    for (let C = 0, P = v.length; C < P; C++) {
      const E = Array.isArray(v[C]) ? v[C] : [v[C]];
      for (let y = 0, R = E.length; y < R; y++) {
        const z = E[y], k = Array.isArray(z.value) ? z.value : [z.value];
        for (let B = 0, Z = k.length; B < Z; B++) {
          const W = k[B], Q = _(W), G = S % b, oe = G % Q.boundary, fe = G + oe;
          S += oe, fe !== 0 && b - fe < Q.storage && (S += b - fe), z.__data = new Float32Array(Q.storage / Float32Array.BYTES_PER_ELEMENT), z.__offset = S, S += Q.storage;
        }
      }
    }
    const w = S % b;
    return w > 0 && (S += b - w), T.__size = S, T.__cache = {}, this;
  }
  function _(T) {
    const v = {
      boundary: 0,
      storage: 0
    };
    return typeof T == "number" || typeof T == "boolean" ? (v.boundary = 4, v.storage = 4) : T.isVector2 ? (v.boundary = 8, v.storage = 8) : T.isVector3 || T.isColor ? (v.boundary = 16, v.storage = 12) : T.isVector4 ? (v.boundary = 16, v.storage = 16) : T.isMatrix3 ? (v.boundary = 48, v.storage = 48) : T.isMatrix4 ? (v.boundary = 64, v.storage = 64) : T.isTexture ? console.warn("THREE.WebGLRenderer: Texture samplers can not be part of an uniforms group.") : console.warn("THREE.WebGLRenderer: Unsupported uniform value type.", T), v;
  }
  function m(T) {
    const v = T.target;
    v.removeEventListener("dispose", m);
    const S = o.indexOf(v.__bindingPointIndex);
    o.splice(S, 1), e.deleteBuffer(r[v.id]), delete r[v.id], delete s[v.id];
  }
  function d() {
    for (const T in r) e.deleteBuffer(r[T]);
    o = [], r = {}, s = {};
  }
  return {
    bind: c,
    update: l,
    dispose: d
  };
}
var df = class {
  constructor(e = {}) {
    const { canvas: t = gc(), context: n = null, depth: i = !0, stencil: r = !1, alpha: s = !1, antialias: o = !1, premultipliedAlpha: a = !0, preserveDrawingBuffer: c = !1, powerPreference: l = "default", failIfMajorPerformanceCaveat: h = !1, reversedDepthBuffer: u = !1 } = e;
    this.isWebGLRenderer = !0;
    let f;
    if (n !== null) {
      if (typeof WebGLRenderingContext < "u" && n instanceof WebGLRenderingContext) throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");
      f = n.getContextAttributes().alpha;
    } else f = s;
    const p = new Uint32Array(4), g = new Int32Array(4);
    let _ = null, m = null;
    const d = [], T = [];
    this.domElement = t, this.debug = {
      checkShaderErrors: !0,
      onShaderError: null
    }, this.autoClear = !0, this.autoClearColor = !0, this.autoClearDepth = !0, this.autoClearStencil = !0, this.sortObjects = !0, this.clippingPlanes = [], this.localClippingEnabled = !1, this.toneMapping = 0, this.toneMappingExposure = 1, this.transmissionResolutionScale = 1;
    const v = this;
    let S = !1;
    this._outputColorSpace = wt;
    let b = 0, w = 0, C = null, P = -1, E = null;
    const y = new ht(), R = new ht();
    let z = null;
    const k = new qe(0);
    let B = 0, Z = t.width, W = t.height, Q = 1, G = null, oe = null;
    const fe = new ht(0, 0, Z, W), Le = new ht(0, 0, Z, W);
    let Ue = !1;
    const Je = new Ss();
    let Ye = !1, F = !1;
    const X = new nt(), ee = new D(), pe = new ht(), Pe = {
      background: null,
      fog: null,
      environment: null,
      overrideMaterial: null,
      isScene: !0
    };
    let ye = !1;
    function ke() {
      return C === null ? Q : 1;
    }
    let L = n;
    function K(M, O) {
      return t.getContext(M, O);
    }
    try {
      const M = {
        alpha: !0,
        depth: i,
        stencil: r,
        antialias: o,
        premultipliedAlpha: a,
        preserveDrawingBuffer: c,
        powerPreference: l,
        failIfMajorPerformanceCaveat: h
      };
      if ("setAttribute" in t && t.setAttribute("data-engine", "three.js r180"), t.addEventListener("webglcontextlost", _e, !1), t.addEventListener("webglcontextrestored", ue, !1), t.addEventListener("webglcontextcreationerror", Ae, !1), L === null) {
        const O = "webgl2";
        if (L = K(O, M), L === null) throw K(O) ? new Error("Error creating WebGL context with your selected attributes.") : new Error("Error creating WebGL context.");
      }
    } catch (M) {
      throw console.error("THREE.WebGLRenderer: " + M.message), M;
    }
    let $, ie, j, de, ce, ae, Be, ze, Ge, A, x, N, q, te, Y, Me, he, Te, De, le, ge, Re, Ce, ve;
    function We() {
      $ = new Mu(L), $.init(), Re = new rf(L, $), ie = new pu(L, $, e, Re), j = new tf(L, $), ie.reversedDepthBuffer && u && j.buffers.depth.setReversed(!0), de = new Tu(L), ce = new kd(), ae = new nf(L, $, j, ce, ie, Re, de), Be = new _u(v), ze = new yu(v), Ge = new cu(L), Ce = new du(L, Ge), A = new Su(L, Ge, de, Ce), x = new Au(L, A, Ge, de), De = new bu(L, ie, ae), Me = new mu(ce), N = new Hd(v, Be, ze, $, ie, Ce, Me), q = new hf(v, ce), te = new Wd(), Y = new jd($), Te = new uu(v, Be, ze, j, x, f, a), he = new Qd(v, x, ie), ve = new uf(L, de, ie, j), le = new fu(L, $, de), ge = new Eu(L, $, de), de.programs = N.programs, v.capabilities = ie, v.extensions = $, v.properties = ce, v.renderLists = te, v.shadowMap = he, v.state = j, v.info = de;
    }
    We();
    const I = new lf(v, L);
    this.xr = I, this.getContext = function() {
      return L;
    }, this.getContextAttributes = function() {
      return L.getContextAttributes();
    }, this.forceContextLoss = function() {
      const M = $.get("WEBGL_lose_context");
      M && M.loseContext();
    }, this.forceContextRestore = function() {
      const M = $.get("WEBGL_lose_context");
      M && M.restoreContext();
    }, this.getPixelRatio = function() {
      return Q;
    }, this.setPixelRatio = function(M) {
      M !== void 0 && (Q = M, this.setSize(Z, W, !1));
    }, this.getSize = function(M) {
      return M.set(Z, W);
    }, this.setSize = function(M, O, V = !0) {
      if (I.isPresenting) {
        console.warn("THREE.WebGLRenderer: Can't change size while VR device is presenting.");
        return;
      }
      Z = M, W = O, t.width = Math.floor(M * Q), t.height = Math.floor(O * Q), V === !0 && (t.style.width = M + "px", t.style.height = O + "px"), this.setViewport(0, 0, M, O);
    }, this.getDrawingBufferSize = function(M) {
      return M.set(Z * Q, W * Q).floor();
    }, this.setDrawingBufferSize = function(M, O, V) {
      Z = M, W = O, Q = V, t.width = Math.floor(M * V), t.height = Math.floor(O * V), this.setViewport(0, 0, M, O);
    }, this.getCurrentViewport = function(M) {
      return M.copy(y);
    }, this.getViewport = function(M) {
      return M.copy(fe);
    }, this.setViewport = function(M, O, V, H) {
      M.isVector4 ? fe.set(M.x, M.y, M.z, M.w) : fe.set(M, O, V, H), j.viewport(y.copy(fe).multiplyScalar(Q).round());
    }, this.getScissor = function(M) {
      return M.copy(Le);
    }, this.setScissor = function(M, O, V, H) {
      M.isVector4 ? Le.set(M.x, M.y, M.z, M.w) : Le.set(M, O, V, H), j.scissor(R.copy(Le).multiplyScalar(Q).round());
    }, this.getScissorTest = function() {
      return Ue;
    }, this.setScissorTest = function(M) {
      j.setScissorTest(Ue = M);
    }, this.setOpaqueSort = function(M) {
      G = M;
    }, this.setTransparentSort = function(M) {
      oe = M;
    }, this.getClearColor = function(M) {
      return M.copy(Te.getClearColor());
    }, this.setClearColor = function() {
      Te.setClearColor(...arguments);
    }, this.getClearAlpha = function() {
      return Te.getClearAlpha();
    }, this.setClearAlpha = function() {
      Te.setClearAlpha(...arguments);
    }, this.clear = function(M = !0, O = !0, V = !0) {
      let H = 0;
      if (M) {
        let U = !1;
        if (C !== null) {
          const ne = C.texture.format;
          U = ne === 1033 || ne === 1031 || ne === 1029;
        }
        if (U) {
          const ne = C.texture.type, xe = ne === 1009 || ne === 1014 || ne === 1012 || ne === 1020 || ne === 1017 || ne === 1018, Se = Te.getClearColor(), Ee = Te.getClearAlpha(), Oe = Se.r, Fe = Se.g, Ne = Se.b;
          xe ? (p[0] = Oe, p[1] = Fe, p[2] = Ne, p[3] = Ee, L.clearBufferuiv(L.COLOR, 0, p)) : (g[0] = Oe, g[1] = Fe, g[2] = Ne, g[3] = Ee, L.clearBufferiv(L.COLOR, 0, g));
        } else H |= L.COLOR_BUFFER_BIT;
      }
      O && (H |= L.DEPTH_BUFFER_BIT), V && (H |= L.STENCIL_BUFFER_BIT, this.state.buffers.stencil.setMask(4294967295)), L.clear(H);
    }, this.clearColor = function() {
      this.clear(!0, !1, !1);
    }, this.clearDepth = function() {
      this.clear(!1, !0, !1);
    }, this.clearStencil = function() {
      this.clear(!1, !1, !0);
    }, this.dispose = function() {
      t.removeEventListener("webglcontextlost", _e, !1), t.removeEventListener("webglcontextrestored", ue, !1), t.removeEventListener("webglcontextcreationerror", Ae, !1), Te.dispose(), te.dispose(), Y.dispose(), ce.dispose(), Be.dispose(), ze.dispose(), x.dispose(), Ce.dispose(), ve.dispose(), N.dispose(), I.dispose(), I.removeEventListener("sessionstart", Gt), I.removeEventListener("sessionend", Wt), fn.stop();
    };
    function _e(M) {
      M.preventDefault(), console.log("THREE.WebGLRenderer: Context Lost."), S = !0;
    }
    function ue() {
      console.log("THREE.WebGLRenderer: Context Restored."), S = !1;
      const M = de.autoReset, O = he.enabled, V = he.autoUpdate, H = he.needsUpdate, U = he.type;
      We(), de.autoReset = M, he.enabled = O, he.autoUpdate = V, he.needsUpdate = H, he.type = U;
    }
    function Ae(M) {
      console.error("THREE.WebGLRenderer: A WebGL context could not be created. Reason: ", M.statusMessage);
    }
    function re(M) {
      const O = M.target;
      O.removeEventListener("dispose", re), J(O);
    }
    function J(M) {
      be(M), ce.remove(M);
    }
    function be(M) {
      const O = ce.get(M).programs;
      O !== void 0 && (O.forEach(function(V) {
        N.releaseProgram(V);
      }), M.isShaderMaterial && N.releaseShaderCache(M));
    }
    this.renderBufferDirect = function(M, O, V, H, U, ne) {
      O === null && (O = Pe);
      const xe = U.isMesh && U.matrixWorld.determinant() < 0, Se = Ga(M, O, V, H, U);
      j.setMaterial(H, xe);
      let Ee = V.index, Oe = 1;
      if (H.wireframe === !0) {
        if (Ee = A.getWireframeAttribute(V), Ee === void 0) return;
        Oe = 2;
      }
      const Fe = V.drawRange, Ne = V.attributes.position;
      let Ze = Fe.start * Oe, et = (Fe.start + Fe.count) * Oe;
      ne !== null && (Ze = Math.max(Ze, ne.start * Oe), et = Math.min(et, (ne.start + ne.count) * Oe)), Ee !== null ? (Ze = Math.max(Ze, 0), et = Math.min(et, Ee.count)) : Ne != null && (Ze = Math.max(Ze, 0), et = Math.min(et, Ne.count));
      const it = et - Ze;
      if (it < 0 || it === 1 / 0) return;
      Ce.setup(U, H, Se, V, Ee);
      let rt, tt = le;
      if (Ee !== null && (rt = Ge.get(Ee), tt = ge, tt.setIndex(rt)), U.isMesh) H.wireframe === !0 ? (j.setLineWidth(H.wireframeLinewidth * ke()), tt.setMode(L.LINES)) : tt.setMode(L.TRIANGLES);
      else if (U.isLine) {
        let we = H.linewidth;
        we === void 0 && (we = 1), j.setLineWidth(we * ke()), U.isLineSegments ? tt.setMode(L.LINES) : U.isLineLoop ? tt.setMode(L.LINE_LOOP) : tt.setMode(L.LINE_STRIP);
      } else U.isPoints ? tt.setMode(L.POINTS) : U.isSprite && tt.setMode(L.TRIANGLES);
      if (U.isBatchedMesh) if (U._multiDrawInstances !== null)
        Ei("THREE.WebGLRenderer: renderMultiDrawInstances has been deprecated and will be removed in r184. Append to renderMultiDraw arguments and use indirection."), tt.renderMultiDrawInstances(U._multiDrawStarts, U._multiDrawCounts, U._multiDrawCount, U._multiDrawInstances);
      else if ($.get("WEBGL_multi_draw"))
        tt.renderMultiDraw(U._multiDrawStarts, U._multiDrawCounts, U._multiDrawCount);
      else {
        const we = U._multiDrawStarts, _t = U._multiDrawCounts, Ke = U._multiDrawCount, Ut = Ee ? Ge.get(Ee).bytesPerElement : 1, Rn = ce.get(H).currentProgram.getUniforms();
        for (let Tt = 0; Tt < Ke; Tt++)
          Rn.setValue(L, "_gl_DrawID", Tt), tt.render(we[Tt] / Ut, _t[Tt]);
      }
      else if (U.isInstancedMesh) tt.renderInstances(Ze, it, U.count);
      else if (V.isInstancedBufferGeometry) {
        const we = V._maxInstanceCount !== void 0 ? V._maxInstanceCount : 1 / 0, _t = Math.min(V.instanceCount, we);
        tt.renderInstances(Ze, it, _t);
      } else tt.render(Ze, it);
    };
    function Ie(M, O, V) {
      M.transparent === !0 && M.side === 2 && M.forceSinglePass === !1 ? (M.side = 1, M.needsUpdate = !0, Di(M, O, V), M.side = 0, M.needsUpdate = !0, Di(M, O, V), M.side = 2) : Di(M, O, V);
    }
    this.compile = function(M, O, V = null) {
      V === null && (V = M), m = Y.get(V), m.init(O), T.push(m), V.traverseVisible(function(U) {
        U.isLight && U.layers.test(O.layers) && (m.pushLight(U), U.castShadow && m.pushShadow(U));
      }), M !== V && M.traverseVisible(function(U) {
        U.isLight && U.layers.test(O.layers) && (m.pushLight(U), U.castShadow && m.pushShadow(U));
      }), m.setupLights();
      const H = /* @__PURE__ */ new Set();
      return M.traverse(function(U) {
        if (!(U.isMesh || U.isPoints || U.isLine || U.isSprite)) return;
        const ne = U.material;
        if (ne) if (Array.isArray(ne)) for (let xe = 0; xe < ne.length; xe++) {
          const Se = ne[xe];
          Ie(Se, V, U), H.add(Se);
        }
        else
          Ie(ne, V, U), H.add(ne);
      }), m = T.pop(), H;
    }, this.compileAsync = function(M, O, V = null) {
      const H = this.compile(M, O, V);
      return new Promise((U) => {
        function ne() {
          if (H.forEach(function(xe) {
            ce.get(xe).currentProgram.isReady() && H.delete(xe);
          }), H.size === 0) {
            U(M);
            return;
          }
          setTimeout(ne, 10);
        }
        $.get("KHR_parallel_shader_compile") !== null ? ne() : setTimeout(ne, 10);
      });
    };
    let lt = null;
    function $e(M) {
      lt && lt(M);
    }
    function Gt() {
      fn.stop();
    }
    function Wt() {
      fn.start();
    }
    const fn = new Oa();
    fn.setAnimationLoop($e), typeof self < "u" && fn.setContext(self), this.setAnimationLoop = function(M) {
      lt = M, I.setAnimationLoop(M), M === null ? fn.stop() : fn.start();
    }, I.addEventListener("sessionstart", Gt), I.addEventListener("sessionend", Wt), this.render = function(M, O) {
      if (O !== void 0 && O.isCamera !== !0) {
        console.error("THREE.WebGLRenderer.render: camera is not an instance of THREE.Camera.");
        return;
      }
      if (S === !0) return;
      if (M.matrixWorldAutoUpdate === !0 && M.updateMatrixWorld(), O.parent === null && O.matrixWorldAutoUpdate === !0 && O.updateMatrixWorld(), I.enabled === !0 && I.isPresenting === !0 && (I.cameraAutoUpdate === !0 && I.updateCamera(O), O = I.getCamera()), M.isScene === !0 && M.onBeforeRender(v, M, O, C), m = Y.get(M, T.length), m.init(O), T.push(m), X.multiplyMatrices(O.projectionMatrix, O.matrixWorldInverse), Je.setFromProjectionMatrix(X, Qn, O.reversedDepth), F = this.localClippingEnabled, Ye = Me.init(this.clippingPlanes, F), _ = te.get(M, d.length), _.init(), d.push(_), I.enabled === !0 && I.isPresenting === !0) {
        const ne = v.xr.getDepthSensingMesh();
        ne !== null && Sr(ne, O, -1 / 0, v.sortObjects);
      }
      Sr(M, O, 0, v.sortObjects), _.finish(), v.sortObjects === !0 && _.sort(G, oe), ye = I.enabled === !1 || I.isPresenting === !1 || I.hasDepthSensing() === !1, ye && Te.addToRenderList(_, M), this.info.render.frame++, Ye === !0 && Me.beginShadows();
      const V = m.state.shadowsArray;
      he.render(V, M, O), Ye === !0 && Me.endShadows(), this.info.autoReset === !0 && this.info.reset();
      const H = _.opaque, U = _.transmissive;
      if (m.setupLights(), O.isArrayCamera) {
        const ne = O.cameras;
        if (U.length > 0) for (let xe = 0, Se = ne.length; xe < Se; xe++) {
          const Ee = ne[xe];
          Ps(H, U, M, Ee);
        }
        ye && Te.render(M);
        for (let xe = 0, Se = ne.length; xe < Se; xe++) {
          const Ee = ne[xe];
          Cs(_, M, Ee, Ee.viewport);
        }
      } else
        U.length > 0 && Ps(H, U, M, O), ye && Te.render(M), Cs(_, M, O);
      C !== null && w === 0 && (ae.updateMultisampleRenderTarget(C), ae.updateRenderTargetMipmap(C)), M.isScene === !0 && M.onAfterRender(v, M, O), Ce.resetDefaultState(), P = -1, E = null, T.pop(), T.length > 0 ? (m = T[T.length - 1], Ye === !0 && Me.setGlobalState(v.clippingPlanes, m.state.camera)) : m = null, d.pop(), d.length > 0 ? _ = d[d.length - 1] : _ = null;
    };
    function Sr(M, O, V, H) {
      if (M.visible === !1) return;
      if (M.layers.test(O.layers)) {
        if (M.isGroup) V = M.renderOrder;
        else if (M.isLOD)
          M.autoUpdate === !0 && M.update(O);
        else if (M.isLight)
          m.pushLight(M), M.castShadow && m.pushShadow(M);
        else if (M.isSprite) {
          if (!M.frustumCulled || Je.intersectsSprite(M)) {
            H && pe.setFromMatrixPosition(M.matrixWorld).applyMatrix4(X);
            const ne = x.update(M), xe = M.material;
            xe.visible && _.push(M, ne, xe, V, pe.z, null);
          }
        } else if ((M.isMesh || M.isLine || M.isPoints) && (!M.frustumCulled || Je.intersectsObject(M))) {
          const ne = x.update(M), xe = M.material;
          if (H && (M.boundingSphere !== void 0 ? (M.boundingSphere === null && M.computeBoundingSphere(), pe.copy(M.boundingSphere.center)) : (ne.boundingSphere === null && ne.computeBoundingSphere(), pe.copy(ne.boundingSphere.center)), pe.applyMatrix4(M.matrixWorld).applyMatrix4(X)), Array.isArray(xe)) {
            const Se = ne.groups;
            for (let Ee = 0, Oe = Se.length; Ee < Oe; Ee++) {
              const Fe = Se[Ee], Ne = xe[Fe.materialIndex];
              Ne && Ne.visible && _.push(M, ne, Ne, V, pe.z, Fe);
            }
          } else xe.visible && _.push(M, ne, xe, V, pe.z, null);
        }
      }
      const U = M.children;
      for (let ne = 0, xe = U.length; ne < xe; ne++) Sr(U[ne], O, V, H);
    }
    function Cs(M, O, V, H) {
      const U = M.opaque, ne = M.transmissive, xe = M.transparent;
      m.setupLightsView(V), Ye === !0 && Me.setGlobalState(v.clippingPlanes, V), H && j.viewport(y.copy(H)), U.length > 0 && Li(U, O, V), ne.length > 0 && Li(ne, O, V), xe.length > 0 && Li(xe, O, V), j.buffers.depth.setTest(!0), j.buffers.depth.setMask(!0), j.buffers.color.setMask(!0), j.setPolygonOffset(!1);
    }
    function Ps(M, O, V, H) {
      if ((V.isScene === !0 ? V.overrideMaterial : null) !== null) return;
      m.state.transmissionRenderTarget[H.id] === void 0 && (m.state.transmissionRenderTarget[H.id] = new Tn(1, 1, {
        generateMipmaps: !0,
        type: $.has("EXT_color_buffer_half_float") || $.has("EXT_color_buffer_float") ? vs : Jn,
        minFilter: vr,
        samples: 4,
        stencilBuffer: r,
        resolveDepthBuffer: !1,
        resolveStencilBuffer: !1,
        colorSpace: je.workingColorSpace
      }));
      const U = m.state.transmissionRenderTarget[H.id], ne = H.viewport || y;
      U.setSize(ne.z * v.transmissionResolutionScale, ne.w * v.transmissionResolutionScale);
      const xe = v.getRenderTarget(), Se = v.getActiveCubeFace(), Ee = v.getActiveMipmapLevel();
      v.setRenderTarget(U), v.getClearColor(k), B = v.getClearAlpha(), B < 1 && v.setClearColor(16777215, 0.5), v.clear(), ye && Te.render(V);
      const Oe = v.toneMapping;
      v.toneMapping = 0;
      const Fe = H.viewport;
      if (H.viewport !== void 0 && (H.viewport = void 0), m.setupLightsView(H), Ye === !0 && Me.setGlobalState(v.clippingPlanes, H), Li(M, V, H), ae.updateMultisampleRenderTarget(U), ae.updateRenderTargetMipmap(U), $.has("WEBGL_multisampled_render_to_texture") === !1) {
        let Ne = !1;
        for (let Ze = 0, et = O.length; Ze < et; Ze++) {
          const it = O[Ze], rt = it.object, tt = it.geometry, we = it.material, _t = it.group;
          if (we.side === 2 && rt.layers.test(H.layers)) {
            const Ke = we.side;
            we.side = 1, we.needsUpdate = !0, Ls(rt, V, H, tt, we, _t), we.side = Ke, we.needsUpdate = !0, Ne = !0;
          }
        }
        Ne === !0 && (ae.updateMultisampleRenderTarget(U), ae.updateRenderTargetMipmap(U));
      }
      v.setRenderTarget(xe, Se, Ee), v.setClearColor(k, B), Fe !== void 0 && (H.viewport = Fe), v.toneMapping = Oe;
    }
    function Li(M, O, V) {
      const H = O.isScene === !0 ? O.overrideMaterial : null;
      for (let U = 0, ne = M.length; U < ne; U++) {
        const xe = M[U], Se = xe.object, Ee = xe.geometry, Oe = xe.group;
        let Fe = xe.material;
        Fe.allowOverride === !0 && H !== null && (Fe = H), Se.layers.test(V.layers) && Ls(Se, O, V, Ee, Fe, Oe);
      }
    }
    function Ls(M, O, V, H, U, ne) {
      M.onBeforeRender(v, O, V, H, U, ne), M.modelViewMatrix.multiplyMatrices(V.matrixWorldInverse, M.matrixWorld), M.normalMatrix.getNormalMatrix(M.modelViewMatrix), U.onBeforeRender(v, O, V, H, M, ne), U.transparent === !0 && U.side === 2 && U.forceSinglePass === !1 ? (U.side = 1, U.needsUpdate = !0, v.renderBufferDirect(V, O, H, U, M, ne), U.side = 0, U.needsUpdate = !0, v.renderBufferDirect(V, O, H, U, M, ne), U.side = 2) : v.renderBufferDirect(V, O, H, U, M, ne), M.onAfterRender(v, O, V, H, U, ne);
    }
    function Di(M, O, V) {
      O.isScene !== !0 && (O = Pe);
      const H = ce.get(M), U = m.state.lights, ne = m.state.shadowsArray, xe = U.state.version, Se = N.getParameters(M, U.state, ne, O, V), Ee = N.getProgramCacheKey(Se);
      let Oe = H.programs;
      H.environment = M.isMeshStandardMaterial ? O.environment : null, H.fog = O.fog, H.envMap = (M.isMeshStandardMaterial ? ze : Be).get(M.envMap || H.environment), H.envMapRotation = H.environment !== null && M.envMap === null ? O.environmentRotation : M.envMapRotation, Oe === void 0 && (M.addEventListener("dispose", re), Oe = /* @__PURE__ */ new Map(), H.programs = Oe);
      let Fe = Oe.get(Ee);
      if (Fe !== void 0) {
        if (H.currentProgram === Fe && H.lightsStateVersion === xe)
          return Is(M, Se), Fe;
      } else
        Se.uniforms = N.getUniforms(M), M.onBeforeCompile(Se, v), Fe = N.acquireProgram(Se, Ee), Oe.set(Ee, Fe), H.uniforms = Se.uniforms;
      const Ne = H.uniforms;
      return (!M.isShaderMaterial && !M.isRawShaderMaterial || M.clipping === !0) && (Ne.clippingPlanes = Me.uniform), Is(M, Se), H.needsLights = Xa(M), H.lightsStateVersion = xe, H.needsLights && (Ne.ambientLightColor.value = U.state.ambient, Ne.lightProbe.value = U.state.probe, Ne.directionalLights.value = U.state.directional, Ne.directionalLightShadows.value = U.state.directionalShadow, Ne.spotLights.value = U.state.spot, Ne.spotLightShadows.value = U.state.spotShadow, Ne.rectAreaLights.value = U.state.rectArea, Ne.ltc_1.value = U.state.rectAreaLTC1, Ne.ltc_2.value = U.state.rectAreaLTC2, Ne.pointLights.value = U.state.point, Ne.pointLightShadows.value = U.state.pointShadow, Ne.hemisphereLights.value = U.state.hemi, Ne.directionalShadowMap.value = U.state.directionalShadowMap, Ne.directionalShadowMatrix.value = U.state.directionalShadowMatrix, Ne.spotShadowMap.value = U.state.spotShadowMap, Ne.spotLightMatrix.value = U.state.spotLightMatrix, Ne.spotLightMap.value = U.state.spotLightMap, Ne.pointShadowMap.value = U.state.pointShadowMap, Ne.pointShadowMatrix.value = U.state.pointShadowMatrix), H.currentProgram = Fe, H.uniformsList = null, Fe;
    }
    function Ds(M) {
      if (M.uniformsList === null) {
        const O = M.currentProgram.getUniforms();
        M.uniformsList = hr.seqWithValue(O.seq, M.uniforms);
      }
      return M.uniformsList;
    }
    function Is(M, O) {
      const V = ce.get(M);
      V.outputColorSpace = O.outputColorSpace, V.batching = O.batching, V.batchingColor = O.batchingColor, V.instancing = O.instancing, V.instancingColor = O.instancingColor, V.instancingMorph = O.instancingMorph, V.skinning = O.skinning, V.morphTargets = O.morphTargets, V.morphNormals = O.morphNormals, V.morphColors = O.morphColors, V.morphTargetsCount = O.morphTargetsCount, V.numClippingPlanes = O.numClippingPlanes, V.numIntersection = O.numClipIntersection, V.vertexAlphas = O.vertexAlphas, V.vertexTangents = O.vertexTangents, V.toneMapping = O.toneMapping;
    }
    function Ga(M, O, V, H, U) {
      O.isScene !== !0 && (O = Pe), ae.resetTextureUnits();
      const ne = O.fog, xe = H.isMeshStandardMaterial ? O.environment : null, Se = C === null ? v.outputColorSpace : C.isXRRenderTarget === !0 ? C.texture.colorSpace : Mi, Ee = (H.isMeshStandardMaterial ? ze : Be).get(H.envMap || xe), Oe = H.vertexColors === !0 && !!V.attributes.color && V.attributes.color.itemSize === 4, Fe = !!V.attributes.tangent && (!!H.normalMap || H.anisotropy > 0), Ne = !!V.morphAttributes.position, Ze = !!V.morphAttributes.normal, et = !!V.morphAttributes.color;
      let it = 0;
      H.toneMapped && (C === null || C.isXRRenderTarget === !0) && (it = v.toneMapping);
      const rt = V.morphAttributes.position || V.morphAttributes.normal || V.morphAttributes.color, tt = rt !== void 0 ? rt.length : 0, we = ce.get(H), _t = m.state.lights;
      if (Ye === !0 && (F === !0 || M !== E)) {
        const gt = M === E && H.id === P;
        Me.setState(H, M, gt);
      }
      let Ke = !1;
      H.version === we.__version ? (we.needsLights && we.lightsStateVersion !== _t.state.version || we.outputColorSpace !== Se || U.isBatchedMesh && we.batching === !1 || !U.isBatchedMesh && we.batching === !0 || U.isBatchedMesh && we.batchingColor === !0 && U.colorTexture === null || U.isBatchedMesh && we.batchingColor === !1 && U.colorTexture !== null || U.isInstancedMesh && we.instancing === !1 || !U.isInstancedMesh && we.instancing === !0 || U.isSkinnedMesh && we.skinning === !1 || !U.isSkinnedMesh && we.skinning === !0 || U.isInstancedMesh && we.instancingColor === !0 && U.instanceColor === null || U.isInstancedMesh && we.instancingColor === !1 && U.instanceColor !== null || U.isInstancedMesh && we.instancingMorph === !0 && U.morphTexture === null || U.isInstancedMesh && we.instancingMorph === !1 && U.morphTexture !== null || we.envMap !== Ee || H.fog === !0 && we.fog !== ne || we.numClippingPlanes !== void 0 && (we.numClippingPlanes !== Me.numPlanes || we.numIntersection !== Me.numIntersection) || we.vertexAlphas !== Oe || we.vertexTangents !== Fe || we.morphTargets !== Ne || we.morphNormals !== Ze || we.morphColors !== et || we.toneMapping !== it || we.morphTargetsCount !== tt) && (Ke = !0) : (Ke = !0, we.__version = H.version);
      let Ut = we.currentProgram;
      Ke === !0 && (Ut = Di(H, O, U));
      let Rn = !1, Tt = !1, si = !1;
      const st = Ut.getUniforms(), Ct = we.uniforms;
      if (j.useProgram(Ut.program) && (Rn = !0, Tt = !0, si = !0), H.id !== P && (P = H.id, Tt = !0), Rn || E !== M) {
        j.buffers.depth.getReversed() && M.reversedDepth !== !0 && (M._reversedDepth = !0, M.updateProjectionMatrix()), st.setValue(L, "projectionMatrix", M.projectionMatrix), st.setValue(L, "viewMatrix", M.matrixWorldInverse);
        const gt = st.map.cameraPosition;
        gt !== void 0 && gt.setValue(L, ee.setFromMatrixPosition(M.matrixWorld)), ie.logarithmicDepthBuffer && st.setValue(L, "logDepthBufFC", 2 / (Math.log(M.far + 1) / Math.LN2)), (H.isMeshPhongMaterial || H.isMeshToonMaterial || H.isMeshLambertMaterial || H.isMeshBasicMaterial || H.isMeshStandardMaterial || H.isShaderMaterial) && st.setValue(L, "isOrthographic", M.isOrthographicCamera === !0), E !== M && (E = M, Tt = !0, si = !0);
      }
      if (U.isSkinnedMesh) {
        st.setOptional(L, U, "bindMatrix"), st.setOptional(L, U, "bindMatrixInverse");
        const gt = U.skeleton;
        gt && (gt.boneTexture === null && gt.computeBoneTexture(), st.setValue(L, "boneTexture", gt.boneTexture, ae));
      }
      U.isBatchedMesh && (st.setOptional(L, U, "batchingTexture"), st.setValue(L, "batchingTexture", U._matricesTexture, ae), st.setOptional(L, U, "batchingIdTexture"), st.setValue(L, "batchingIdTexture", U._indirectTexture, ae), st.setOptional(L, U, "batchingColorTexture"), U._colorsTexture !== null && st.setValue(L, "batchingColorTexture", U._colorsTexture, ae));
      const Pt = V.morphAttributes;
      if ((Pt.position !== void 0 || Pt.normal !== void 0 || Pt.color !== void 0) && De.update(U, V, Ut), (Tt || we.receiveShadow !== U.receiveShadow) && (we.receiveShadow = U.receiveShadow, st.setValue(L, "receiveShadow", U.receiveShadow)), H.isMeshGouraudMaterial && H.envMap !== null && (Ct.envMap.value = Ee, Ct.flipEnvMap.value = Ee.isCubeTexture && Ee.isRenderTargetTexture === !1 ? -1 : 1), H.isMeshStandardMaterial && H.envMap === null && O.environment !== null && (Ct.envMapIntensity.value = O.environmentIntensity), Tt && (st.setValue(L, "toneMappingExposure", v.toneMappingExposure), we.needsLights && Wa(Ct, si), ne && H.fog === !0 && q.refreshFogUniforms(Ct, ne), q.refreshMaterialUniforms(Ct, H, Q, W, m.state.transmissionRenderTarget[M.id]), hr.upload(L, Ds(we), Ct, ae)), H.isShaderMaterial && H.uniformsNeedUpdate === !0 && (hr.upload(L, Ds(we), Ct, ae), H.uniformsNeedUpdate = !1), H.isSpriteMaterial && st.setValue(L, "center", U.center), st.setValue(L, "modelViewMatrix", U.modelViewMatrix), st.setValue(L, "normalMatrix", U.normalMatrix), st.setValue(L, "modelMatrix", U.matrixWorld), H.isShaderMaterial || H.isRawShaderMaterial) {
        const gt = H.uniformsGroups;
        for (let Nt = 0, Er = gt.length; Nt < Er; Nt++) {
          const pn = gt[Nt];
          ve.update(pn, Ut), ve.bind(pn, Ut);
        }
      }
      return Ut;
    }
    function Wa(M, O) {
      M.ambientLightColor.needsUpdate = O, M.lightProbe.needsUpdate = O, M.directionalLights.needsUpdate = O, M.directionalLightShadows.needsUpdate = O, M.pointLights.needsUpdate = O, M.pointLightShadows.needsUpdate = O, M.spotLights.needsUpdate = O, M.spotLightShadows.needsUpdate = O, M.rectAreaLights.needsUpdate = O, M.hemisphereLights.needsUpdate = O;
    }
    function Xa(M) {
      return M.isMeshLambertMaterial || M.isMeshToonMaterial || M.isMeshPhongMaterial || M.isMeshStandardMaterial || M.isShadowMaterial || M.isShaderMaterial && M.lights === !0;
    }
    this.getActiveCubeFace = function() {
      return b;
    }, this.getActiveMipmapLevel = function() {
      return w;
    }, this.getRenderTarget = function() {
      return C;
    }, this.setRenderTargetTextures = function(M, O, V) {
      const H = ce.get(M);
      H.__autoAllocateDepthBuffer = M.resolveDepthBuffer === !1, H.__autoAllocateDepthBuffer === !1 && (H.__useRenderToTexture = !1), ce.get(M.texture).__webglTexture = O, ce.get(M.depthTexture).__webglTexture = H.__autoAllocateDepthBuffer ? void 0 : V, H.__hasExternalTextures = !0;
    }, this.setRenderTargetFramebuffer = function(M, O) {
      const V = ce.get(M);
      V.__webglFramebuffer = O, V.__useDefaultFramebuffer = O === void 0;
    };
    const Ya = L.createFramebuffer();
    this.setRenderTarget = function(M, O = 0, V = 0) {
      C = M, b = O, w = V;
      let H = !0, U = null, ne = !1, xe = !1;
      if (M) {
        const Se = ce.get(M);
        if (Se.__useDefaultFramebuffer !== void 0)
          j.bindFramebuffer(L.FRAMEBUFFER, null), H = !1;
        else if (Se.__webglFramebuffer === void 0) ae.setupRenderTarget(M);
        else if (Se.__hasExternalTextures) ae.rebindTextures(M, ce.get(M.texture).__webglTexture, ce.get(M.depthTexture).__webglTexture);
        else if (M.depthBuffer) {
          const Fe = M.depthTexture;
          if (Se.__boundDepthTexture !== Fe) {
            if (Fe !== null && ce.has(Fe) && (M.width !== Fe.image.width || M.height !== Fe.image.height)) throw new Error("WebGLRenderTarget: Attached DepthTexture is initialized to the incorrect size.");
            ae.setupDepthRenderbuffer(M);
          }
        }
        const Ee = M.texture;
        (Ee.isData3DTexture || Ee.isDataArrayTexture || Ee.isCompressedArrayTexture) && (xe = !0);
        const Oe = ce.get(M).__webglFramebuffer;
        M.isWebGLCubeRenderTarget ? (Array.isArray(Oe[O]) ? U = Oe[O][V] : U = Oe[O], ne = !0) : M.samples > 0 && ae.useMultisampledRTT(M) === !1 ? U = ce.get(M).__webglMultisampledFramebuffer : Array.isArray(Oe) ? U = Oe[V] : U = Oe, y.copy(M.viewport), R.copy(M.scissor), z = M.scissorTest;
      } else
        y.copy(fe).multiplyScalar(Q).floor(), R.copy(Le).multiplyScalar(Q).floor(), z = Ue;
      if (V !== 0 && (U = Ya), j.bindFramebuffer(L.FRAMEBUFFER, U) && H && j.drawBuffers(M, U), j.viewport(y), j.scissor(R), j.setScissorTest(z), ne) {
        const Se = ce.get(M.texture);
        L.framebufferTexture2D(L.FRAMEBUFFER, L.COLOR_ATTACHMENT0, L.TEXTURE_CUBE_MAP_POSITIVE_X + O, Se.__webglTexture, V);
      } else if (xe) {
        const Se = O;
        for (let Ee = 0; Ee < M.textures.length; Ee++) {
          const Oe = ce.get(M.textures[Ee]);
          L.framebufferTextureLayer(L.FRAMEBUFFER, L.COLOR_ATTACHMENT0 + Ee, Oe.__webglTexture, V, Se);
        }
      } else if (M !== null && V !== 0) {
        const Se = ce.get(M.texture);
        L.framebufferTexture2D(L.FRAMEBUFFER, L.COLOR_ATTACHMENT0, L.TEXTURE_2D, Se.__webglTexture, V);
      }
      P = -1;
    }, this.readRenderTargetPixels = function(M, O, V, H, U, ne, xe, Se = 0) {
      if (!(M && M.isWebGLRenderTarget)) {
        console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");
        return;
      }
      let Ee = ce.get(M).__webglFramebuffer;
      if (M.isWebGLCubeRenderTarget && xe !== void 0 && (Ee = Ee[xe]), Ee) {
        j.bindFramebuffer(L.FRAMEBUFFER, Ee);
        try {
          const Oe = M.textures[Se], Fe = Oe.format, Ne = Oe.type;
          if (!ie.textureFormatReadable(Fe)) {
            console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");
            return;
          }
          if (!ie.textureTypeReadable(Ne)) {
            console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");
            return;
          }
          O >= 0 && O <= M.width - H && V >= 0 && V <= M.height - U && (M.textures.length > 1 && L.readBuffer(L.COLOR_ATTACHMENT0 + Se), L.readPixels(O, V, H, U, Re.convert(Fe), Re.convert(Ne), ne));
        } finally {
          const Oe = C !== null ? ce.get(C).__webglFramebuffer : null;
          j.bindFramebuffer(L.FRAMEBUFFER, Oe);
        }
      }
    }, this.readRenderTargetPixelsAsync = async function(M, O, V, H, U, ne, xe, Se = 0) {
      if (!(M && M.isWebGLRenderTarget)) throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");
      let Ee = ce.get(M).__webglFramebuffer;
      if (M.isWebGLCubeRenderTarget && xe !== void 0 && (Ee = Ee[xe]), Ee) if (O >= 0 && O <= M.width - H && V >= 0 && V <= M.height - U) {
        j.bindFramebuffer(L.FRAMEBUFFER, Ee);
        const Oe = M.textures[Se], Fe = Oe.format, Ne = Oe.type;
        if (!ie.textureFormatReadable(Fe)) throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");
        if (!ie.textureTypeReadable(Ne)) throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");
        const Ze = L.createBuffer();
        L.bindBuffer(L.PIXEL_PACK_BUFFER, Ze), L.bufferData(L.PIXEL_PACK_BUFFER, ne.byteLength, L.STREAM_READ), M.textures.length > 1 && L.readBuffer(L.COLOR_ATTACHMENT0 + Se), L.readPixels(O, V, H, U, Re.convert(Fe), Re.convert(Ne), 0);
        const et = C !== null ? ce.get(C).__webglFramebuffer : null;
        j.bindFramebuffer(L.FRAMEBUFFER, et);
        const it = L.fenceSync(L.SYNC_GPU_COMMANDS_COMPLETE, 0);
        return L.flush(), await vc(L, it, 4), L.bindBuffer(L.PIXEL_PACK_BUFFER, Ze), L.getBufferSubData(L.PIXEL_PACK_BUFFER, 0, ne), L.deleteBuffer(Ze), L.deleteSync(it), ne;
      } else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.");
    }, this.copyFramebufferToTexture = function(M, O = null, V = 0) {
      const H = Math.pow(2, -V), U = Math.floor(M.image.width * H), ne = Math.floor(M.image.height * H), xe = O !== null ? O.x : 0, Se = O !== null ? O.y : 0;
      ae.setTexture2D(M, 0), L.copyTexSubImage2D(L.TEXTURE_2D, V, 0, 0, xe, Se, U, ne), j.unbindTexture();
    };
    const qa = L.createFramebuffer(), Za = L.createFramebuffer();
    this.copyTextureToTexture = function(M, O, V = null, H = null, U = 0, ne = null) {
      ne === null && (U !== 0 ? (Ei("WebGLRenderer: copyTextureToTexture function signature has changed to support src and dst mipmap levels."), ne = U, U = 0) : ne = 0);
      let xe, Se, Ee, Oe, Fe, Ne, Ze, et, it;
      const rt = M.isCompressedTexture ? M.mipmaps[ne] : M.image;
      if (V !== null)
        xe = V.max.x - V.min.x, Se = V.max.y - V.min.y, Ee = V.isBox3 ? V.max.z - V.min.z : 1, Oe = V.min.x, Fe = V.min.y, Ne = V.isBox3 ? V.min.z : 0;
      else {
        const Pt = Math.pow(2, -U);
        xe = Math.floor(rt.width * Pt), Se = Math.floor(rt.height * Pt), M.isDataArrayTexture ? Ee = rt.depth : M.isData3DTexture ? Ee = Math.floor(rt.depth * Pt) : Ee = 1, Oe = 0, Fe = 0, Ne = 0;
      }
      H !== null ? (Ze = H.x, et = H.y, it = H.z) : (Ze = 0, et = 0, it = 0);
      const tt = Re.convert(O.format), we = Re.convert(O.type);
      let _t;
      O.isData3DTexture ? (ae.setTexture3D(O, 0), _t = L.TEXTURE_3D) : O.isDataArrayTexture || O.isCompressedArrayTexture ? (ae.setTexture2DArray(O, 0), _t = L.TEXTURE_2D_ARRAY) : (ae.setTexture2D(O, 0), _t = L.TEXTURE_2D), L.pixelStorei(L.UNPACK_FLIP_Y_WEBGL, O.flipY), L.pixelStorei(L.UNPACK_PREMULTIPLY_ALPHA_WEBGL, O.premultiplyAlpha), L.pixelStorei(L.UNPACK_ALIGNMENT, O.unpackAlignment);
      const Ke = L.getParameter(L.UNPACK_ROW_LENGTH), Ut = L.getParameter(L.UNPACK_IMAGE_HEIGHT), Rn = L.getParameter(L.UNPACK_SKIP_PIXELS), Tt = L.getParameter(L.UNPACK_SKIP_ROWS), si = L.getParameter(L.UNPACK_SKIP_IMAGES);
      L.pixelStorei(L.UNPACK_ROW_LENGTH, rt.width), L.pixelStorei(L.UNPACK_IMAGE_HEIGHT, rt.height), L.pixelStorei(L.UNPACK_SKIP_PIXELS, Oe), L.pixelStorei(L.UNPACK_SKIP_ROWS, Fe), L.pixelStorei(L.UNPACK_SKIP_IMAGES, Ne);
      const st = M.isDataArrayTexture || M.isData3DTexture, Ct = O.isDataArrayTexture || O.isData3DTexture;
      if (M.isDepthTexture) {
        const Pt = ce.get(M), gt = ce.get(O), Nt = ce.get(Pt.__renderTarget), Er = ce.get(gt.__renderTarget);
        j.bindFramebuffer(L.READ_FRAMEBUFFER, Nt.__webglFramebuffer), j.bindFramebuffer(L.DRAW_FRAMEBUFFER, Er.__webglFramebuffer);
        for (let pn = 0; pn < Ee; pn++)
          st && (L.framebufferTextureLayer(L.READ_FRAMEBUFFER, L.COLOR_ATTACHMENT0, ce.get(M).__webglTexture, U, Ne + pn), L.framebufferTextureLayer(L.DRAW_FRAMEBUFFER, L.COLOR_ATTACHMENT0, ce.get(O).__webglTexture, ne, it + pn)), L.blitFramebuffer(Oe, Fe, xe, Se, Ze, et, xe, Se, L.DEPTH_BUFFER_BIT, L.NEAREST);
        j.bindFramebuffer(L.READ_FRAMEBUFFER, null), j.bindFramebuffer(L.DRAW_FRAMEBUFFER, null);
      } else if (U !== 0 || M.isRenderTargetTexture || ce.has(M)) {
        const Pt = ce.get(M), gt = ce.get(O);
        j.bindFramebuffer(L.READ_FRAMEBUFFER, qa), j.bindFramebuffer(L.DRAW_FRAMEBUFFER, Za);
        for (let Nt = 0; Nt < Ee; Nt++)
          st ? L.framebufferTextureLayer(L.READ_FRAMEBUFFER, L.COLOR_ATTACHMENT0, Pt.__webglTexture, U, Ne + Nt) : L.framebufferTexture2D(L.READ_FRAMEBUFFER, L.COLOR_ATTACHMENT0, L.TEXTURE_2D, Pt.__webglTexture, U), Ct ? L.framebufferTextureLayer(L.DRAW_FRAMEBUFFER, L.COLOR_ATTACHMENT0, gt.__webglTexture, ne, it + Nt) : L.framebufferTexture2D(L.DRAW_FRAMEBUFFER, L.COLOR_ATTACHMENT0, L.TEXTURE_2D, gt.__webglTexture, ne), U !== 0 ? L.blitFramebuffer(Oe, Fe, xe, Se, Ze, et, xe, Se, L.COLOR_BUFFER_BIT, L.NEAREST) : Ct ? L.copyTexSubImage3D(_t, ne, Ze, et, it + Nt, Oe, Fe, xe, Se) : L.copyTexSubImage2D(_t, ne, Ze, et, Oe, Fe, xe, Se);
        j.bindFramebuffer(L.READ_FRAMEBUFFER, null), j.bindFramebuffer(L.DRAW_FRAMEBUFFER, null);
      } else Ct ? M.isDataTexture || M.isData3DTexture ? L.texSubImage3D(_t, ne, Ze, et, it, xe, Se, Ee, tt, we, rt.data) : O.isCompressedArrayTexture ? L.compressedTexSubImage3D(_t, ne, Ze, et, it, xe, Se, Ee, tt, rt.data) : L.texSubImage3D(_t, ne, Ze, et, it, xe, Se, Ee, tt, we, rt) : M.isDataTexture ? L.texSubImage2D(L.TEXTURE_2D, ne, Ze, et, xe, Se, tt, we, rt.data) : M.isCompressedTexture ? L.compressedTexSubImage2D(L.TEXTURE_2D, ne, Ze, et, rt.width, rt.height, tt, rt.data) : L.texSubImage2D(L.TEXTURE_2D, ne, Ze, et, xe, Se, tt, we, rt);
      L.pixelStorei(L.UNPACK_ROW_LENGTH, Ke), L.pixelStorei(L.UNPACK_IMAGE_HEIGHT, Ut), L.pixelStorei(L.UNPACK_SKIP_PIXELS, Rn), L.pixelStorei(L.UNPACK_SKIP_ROWS, Tt), L.pixelStorei(L.UNPACK_SKIP_IMAGES, si), ne === 0 && O.generateMipmaps && L.generateMipmap(_t), j.unbindTexture();
    }, this.initRenderTarget = function(M) {
      ce.get(M).__webglFramebuffer === void 0 && ae.setupRenderTarget(M);
    }, this.initTexture = function(M) {
      M.isCubeTexture ? ae.setTextureCube(M, 0) : M.isData3DTexture ? ae.setTexture3D(M, 0) : M.isDataArrayTexture || M.isCompressedArrayTexture ? ae.setTexture2DArray(M, 0) : ae.setTexture2D(M, 0), j.unbindTexture();
    }, this.resetState = function() {
      b = 0, w = 0, C = null, j.reset(), Ce.reset();
    }, typeof __THREE_DEVTOOLS__ < "u" && __THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe", { detail: this }));
  }
  get coordinateSystem() {
    return Qn;
  }
  get outputColorSpace() {
    return this._outputColorSpace;
  }
  set outputColorSpace(e) {
    this._outputColorSpace = e;
    const t = this.getContext();
    t.drawingBufferColorSpace = je._getDrawingBufferColorSpace(e), t.unpackColorSpace = je._getUnpackColorSpace();
  }
}, Ho = { type: "change" }, Rs = { type: "start" }, Ha = { type: "end" }, ar = new Ms(), ko = new ln(), ff = Math.cos(70 * cs.DEG2RAD), dt = new D(), St = 2 * Math.PI, Qe = {
  NONE: -1,
  ROTATE: 0,
  DOLLY: 1,
  PAN: 2,
  TOUCH_ROTATE: 3,
  TOUCH_PAN: 4,
  TOUCH_DOLLY_PAN: 5,
  TOUCH_DOLLY_ROTATE: 6
}, ss = 1e-6, pf = class extends au {
  constructor(e, t = null) {
    super(e, t), this.state = Qe.NONE, this.target = new D(), this.cursor = new D(), this.minDistance = 0, this.maxDistance = 1 / 0, this.minZoom = 0, this.maxZoom = 1 / 0, this.minTargetRadius = 0, this.maxTargetRadius = 1 / 0, this.minPolarAngle = 0, this.maxPolarAngle = Math.PI, this.minAzimuthAngle = -1 / 0, this.maxAzimuthAngle = 1 / 0, this.enableDamping = !1, this.dampingFactor = 0.05, this.enableZoom = !0, this.zoomSpeed = 1, this.enableRotate = !0, this.rotateSpeed = 1, this.keyRotateSpeed = 1, this.enablePan = !0, this.panSpeed = 1, this.screenSpacePanning = !0, this.keyPanSpeed = 7, this.zoomToCursor = !1, this.autoRotate = !1, this.autoRotateSpeed = 2, this.keys = {
      LEFT: "ArrowLeft",
      UP: "ArrowUp",
      RIGHT: "ArrowRight",
      BOTTOM: "ArrowDown"
    }, this.mouseButtons = {
      LEFT: Kn.ROTATE,
      MIDDLE: Kn.DOLLY,
      RIGHT: Kn.PAN
    }, this.touches = {
      ONE: Yn.ROTATE,
      TWO: Yn.DOLLY_PAN
    }, this.target0 = this.target.clone(), this.position0 = this.object.position.clone(), this.zoom0 = this.object.zoom, this._domElementKeyEvents = null, this._lastPosition = new D(), this._lastQuaternion = new hn(), this._lastTargetPosition = new D(), this._quat = new hn().setFromUnitVectors(e.up, new D(0, 1, 0)), this._quatInverse = this._quat.clone().invert(), this._spherical = new ms(), this._sphericalDelta = new ms(), this._scale = 1, this._panOffset = new D(), this._rotateStart = new se(), this._rotateEnd = new se(), this._rotateDelta = new se(), this._panStart = new se(), this._panEnd = new se(), this._panDelta = new se(), this._dollyStart = new se(), this._dollyEnd = new se(), this._dollyDelta = new se(), this._dollyDirection = new D(), this._mouse = new se(), this._performCursorZoom = !1, this._pointers = [], this._pointerPositions = {}, this._controlActive = !1, this._onPointerMove = _f.bind(this), this._onPointerDown = mf.bind(this), this._onPointerUp = gf.bind(this), this._onContextMenu = Tf.bind(this), this._onMouseWheel = yf.bind(this), this._onKeyDown = Mf.bind(this), this._onTouchStart = Sf.bind(this), this._onTouchMove = Ef.bind(this), this._onMouseDown = vf.bind(this), this._onMouseMove = xf.bind(this), this._interceptControlDown = bf.bind(this), this._interceptControlUp = Af.bind(this), this.domElement !== null && this.connect(this.domElement), this.update();
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
    this.target.copy(this.target0), this.object.position.copy(this.position0), this.object.zoom = this.zoom0, this.object.updateProjectionMatrix(), this.dispatchEvent(Ho), this.update(), this.state = Qe.NONE;
  }
  update(e = null) {
    const t = this.object.position;
    dt.copy(t).sub(this.target), dt.applyQuaternion(this._quat), this._spherical.setFromVector3(dt), this.autoRotate && this.state === Qe.NONE && this._rotateLeft(this._getAutoRotationAngle(e)), this.enableDamping ? (this._spherical.theta += this._sphericalDelta.theta * this.dampingFactor, this._spherical.phi += this._sphericalDelta.phi * this.dampingFactor) : (this._spherical.theta += this._sphericalDelta.theta, this._spherical.phi += this._sphericalDelta.phi);
    let n = this.minAzimuthAngle, i = this.maxAzimuthAngle;
    isFinite(n) && isFinite(i) && (n < -Math.PI ? n += St : n > Math.PI && (n -= St), i < -Math.PI ? i += St : i > Math.PI && (i -= St), n <= i ? this._spherical.theta = Math.max(n, Math.min(i, this._spherical.theta)) : this._spherical.theta = this._spherical.theta > (n + i) / 2 ? Math.max(n, this._spherical.theta) : Math.min(i, this._spherical.theta)), this._spherical.phi = Math.max(this.minPolarAngle, Math.min(this.maxPolarAngle, this._spherical.phi)), this._spherical.makeSafe(), this.enableDamping === !0 ? this.target.addScaledVector(this._panOffset, this.dampingFactor) : this.target.add(this._panOffset), this.target.sub(this.cursor), this.target.clampLength(this.minTargetRadius, this.maxTargetRadius), this.target.add(this.cursor);
    let r = !1;
    if (this.zoomToCursor && this._performCursorZoom || this.object.isOrthographicCamera) this._spherical.radius = this._clampDistance(this._spherical.radius);
    else {
      const s = this._spherical.radius;
      this._spherical.radius = this._clampDistance(this._spherical.radius * this._scale), r = s != this._spherical.radius;
    }
    if (dt.setFromSpherical(this._spherical), dt.applyQuaternion(this._quatInverse), t.copy(this.target).add(dt), this.object.lookAt(this.target), this.enableDamping === !0 ? (this._sphericalDelta.theta *= 1 - this.dampingFactor, this._sphericalDelta.phi *= 1 - this.dampingFactor, this._panOffset.multiplyScalar(1 - this.dampingFactor)) : (this._sphericalDelta.set(0, 0, 0), this._panOffset.set(0, 0, 0)), this.zoomToCursor && this._performCursorZoom) {
      let s = null;
      if (this.object.isPerspectiveCamera) {
        const o = dt.length();
        s = this._clampDistance(o * this._scale);
        const a = o - s;
        this.object.position.addScaledVector(this._dollyDirection, a), this.object.updateMatrixWorld(), r = !!a;
      } else if (this.object.isOrthographicCamera) {
        const o = new D(this._mouse.x, this._mouse.y, 0);
        o.unproject(this.object);
        const a = this.object.zoom;
        this.object.zoom = Math.max(this.minZoom, Math.min(this.maxZoom, this.object.zoom / this._scale)), this.object.updateProjectionMatrix(), r = a !== this.object.zoom;
        const c = new D(this._mouse.x, this._mouse.y, 0);
        c.unproject(this.object), this.object.position.sub(c).add(o), this.object.updateMatrixWorld(), s = dt.length();
      } else
        console.warn("WARNING: OrbitControls.js encountered an unknown camera type - zoom to cursor disabled."), this.zoomToCursor = !1;
      s !== null && (this.screenSpacePanning ? this.target.set(0, 0, -1).transformDirection(this.object.matrix).multiplyScalar(s).add(this.object.position) : (ar.origin.copy(this.object.position), ar.direction.set(0, 0, -1).transformDirection(this.object.matrix), Math.abs(this.object.up.dot(ar.direction)) < ff ? this.object.lookAt(this.target) : (ko.setFromNormalAndCoplanarPoint(this.object.up, this.target), ar.intersectPlane(ko, this.target))));
    } else if (this.object.isOrthographicCamera) {
      const s = this.object.zoom;
      this.object.zoom = Math.max(this.minZoom, Math.min(this.maxZoom, this.object.zoom / this._scale)), s !== this.object.zoom && (this.object.updateProjectionMatrix(), r = !0);
    }
    return this._scale = 1, this._performCursorZoom = !1, r || this._lastPosition.distanceToSquared(this.object.position) > ss || 8 * (1 - this._lastQuaternion.dot(this.object.quaternion)) > ss || this._lastTargetPosition.distanceToSquared(this.target) > ss ? (this.dispatchEvent(Ho), this._lastPosition.copy(this.object.position), this._lastQuaternion.copy(this.object.quaternion), this._lastTargetPosition.copy(this.target), !0) : !1;
  }
  _getAutoRotationAngle(e) {
    return e !== null ? St / 60 * this.autoRotateSpeed * e : St / 60 / 60 * this.autoRotateSpeed;
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
    dt.setFromMatrixColumn(t, 0), dt.multiplyScalar(-e), this._panOffset.add(dt);
  }
  _panUp(e, t) {
    this.screenSpacePanning === !0 ? dt.setFromMatrixColumn(t, 1) : (dt.setFromMatrixColumn(t, 0), dt.crossVectors(this.object.up, dt)), dt.multiplyScalar(e), this._panOffset.add(dt);
  }
  _pan(e, t) {
    const n = this.domElement;
    if (this.object.isPerspectiveCamera) {
      const i = this.object.position;
      dt.copy(i).sub(this.target);
      let r = dt.length();
      r *= Math.tan(this.object.fov / 2 * Math.PI / 180), this._panLeft(2 * e * r / n.clientHeight, this.object.matrix), this._panUp(2 * t * r / n.clientHeight, this.object.matrix);
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
    const n = this.domElement.getBoundingClientRect(), i = e - n.left, r = t - n.top, s = n.width, o = n.height;
    this._mouse.x = i / s * 2 - 1, this._mouse.y = -(r / o) * 2 + 1, this._dollyDirection.set(this._mouse.x, this._mouse.y, 1).unproject(this.object).sub(this.object.position).normalize();
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
    this._rotateLeft(St * this._rotateDelta.x / t.clientHeight), this._rotateUp(St * this._rotateDelta.y / t.clientHeight), this._rotateStart.copy(this._rotateEnd), this.update();
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
        e.ctrlKey || e.metaKey || e.shiftKey ? this.enableRotate && this._rotateUp(St * this.keyRotateSpeed / this.domElement.clientHeight) : this.enablePan && this._pan(0, this.keyPanSpeed), t = !0;
        break;
      case this.keys.BOTTOM:
        e.ctrlKey || e.metaKey || e.shiftKey ? this.enableRotate && this._rotateUp(-St * this.keyRotateSpeed / this.domElement.clientHeight) : this.enablePan && this._pan(0, -this.keyPanSpeed), t = !0;
        break;
      case this.keys.LEFT:
        e.ctrlKey || e.metaKey || e.shiftKey ? this.enableRotate && this._rotateLeft(St * this.keyRotateSpeed / this.domElement.clientHeight) : this.enablePan && this._pan(this.keyPanSpeed, 0), t = !0;
        break;
      case this.keys.RIGHT:
        e.ctrlKey || e.metaKey || e.shiftKey ? this.enableRotate && this._rotateLeft(-St * this.keyRotateSpeed / this.domElement.clientHeight) : this.enablePan && this._pan(-this.keyPanSpeed, 0), t = !0;
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
    const t = this._getSecondPointerPosition(e), n = e.pageX - t.x, i = e.pageY - t.y, r = Math.sqrt(n * n + i * i);
    this._dollyStart.set(0, r);
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
      const n = this._getSecondPointerPosition(e), i = 0.5 * (e.pageX + n.x), r = 0.5 * (e.pageY + n.y);
      this._rotateEnd.set(i, r);
    }
    this._rotateDelta.subVectors(this._rotateEnd, this._rotateStart).multiplyScalar(this.rotateSpeed);
    const t = this.domElement;
    this._rotateLeft(St * this._rotateDelta.x / t.clientHeight), this._rotateUp(St * this._rotateDelta.y / t.clientHeight), this._rotateStart.copy(this._rotateEnd);
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
    const t = this._getSecondPointerPosition(e), n = e.pageX - t.x, i = e.pageY - t.y, r = Math.sqrt(n * n + i * i);
    this._dollyEnd.set(0, r), this._dollyDelta.set(0, Math.pow(this._dollyEnd.y / this._dollyStart.y, this.zoomSpeed)), this._dollyOut(this._dollyDelta.y), this._dollyStart.copy(this._dollyEnd);
    const s = (e.pageX + t.x) * 0.5, o = (e.pageY + t.y) * 0.5;
    this._updateZoomParameters(s, o);
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
    t === void 0 && (t = new se(), this._pointerPositions[e.pointerId] = t), t.set(e.pageX, e.pageY);
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
function mf(e) {
  this.enabled !== !1 && (this._pointers.length === 0 && (this.domElement.setPointerCapture(e.pointerId), this.domElement.addEventListener("pointermove", this._onPointerMove), this.domElement.addEventListener("pointerup", this._onPointerUp)), !this._isTrackingPointer(e) && (this._addPointer(e), e.pointerType === "touch" ? this._onTouchStart(e) : this._onMouseDown(e)));
}
function _f(e) {
  this.enabled !== !1 && (e.pointerType === "touch" ? this._onTouchMove(e) : this._onMouseMove(e));
}
function gf(e) {
  switch (this._removePointer(e), this._pointers.length) {
    case 0:
      this.domElement.releasePointerCapture(e.pointerId), this.domElement.removeEventListener("pointermove", this._onPointerMove), this.domElement.removeEventListener("pointerup", this._onPointerUp), this.dispatchEvent(Ha), this.state = Qe.NONE;
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
function vf(e) {
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
    case Kn.DOLLY:
      if (this.enableZoom === !1) return;
      this._handleMouseDownDolly(e), this.state = Qe.DOLLY;
      break;
    case Kn.ROTATE:
      if (e.ctrlKey || e.metaKey || e.shiftKey) {
        if (this.enablePan === !1) return;
        this._handleMouseDownPan(e), this.state = Qe.PAN;
      } else {
        if (this.enableRotate === !1) return;
        this._handleMouseDownRotate(e), this.state = Qe.ROTATE;
      }
      break;
    case Kn.PAN:
      if (e.ctrlKey || e.metaKey || e.shiftKey) {
        if (this.enableRotate === !1) return;
        this._handleMouseDownRotate(e), this.state = Qe.ROTATE;
      } else {
        if (this.enablePan === !1) return;
        this._handleMouseDownPan(e), this.state = Qe.PAN;
      }
      break;
    default:
      this.state = Qe.NONE;
  }
  this.state !== Qe.NONE && this.dispatchEvent(Rs);
}
function xf(e) {
  switch (this.state) {
    case Qe.ROTATE:
      if (this.enableRotate === !1) return;
      this._handleMouseMoveRotate(e);
      break;
    case Qe.DOLLY:
      if (this.enableZoom === !1) return;
      this._handleMouseMoveDolly(e);
      break;
    case Qe.PAN:
      if (this.enablePan === !1) return;
      this._handleMouseMovePan(e);
      break;
  }
}
function yf(e) {
  this.enabled === !1 || this.enableZoom === !1 || this.state !== Qe.NONE || (e.preventDefault(), this.dispatchEvent(Rs), this._handleMouseWheel(this._customWheelEvent(e)), this.dispatchEvent(Ha));
}
function Mf(e) {
  this.enabled !== !1 && this._handleKeyDown(e);
}
function Sf(e) {
  switch (this._trackPointer(e), this._pointers.length) {
    case 1:
      switch (this.touches.ONE) {
        case Yn.ROTATE:
          if (this.enableRotate === !1) return;
          this._handleTouchStartRotate(e), this.state = Qe.TOUCH_ROTATE;
          break;
        case Yn.PAN:
          if (this.enablePan === !1) return;
          this._handleTouchStartPan(e), this.state = Qe.TOUCH_PAN;
          break;
        default:
          this.state = Qe.NONE;
      }
      break;
    case 2:
      switch (this.touches.TWO) {
        case Yn.DOLLY_PAN:
          if (this.enableZoom === !1 && this.enablePan === !1) return;
          this._handleTouchStartDollyPan(e), this.state = Qe.TOUCH_DOLLY_PAN;
          break;
        case Yn.DOLLY_ROTATE:
          if (this.enableZoom === !1 && this.enableRotate === !1) return;
          this._handleTouchStartDollyRotate(e), this.state = Qe.TOUCH_DOLLY_ROTATE;
          break;
        default:
          this.state = Qe.NONE;
      }
      break;
    default:
      this.state = Qe.NONE;
  }
  this.state !== Qe.NONE && this.dispatchEvent(Rs);
}
function Ef(e) {
  switch (this._trackPointer(e), this.state) {
    case Qe.TOUCH_ROTATE:
      if (this.enableRotate === !1) return;
      this._handleTouchMoveRotate(e), this.update();
      break;
    case Qe.TOUCH_PAN:
      if (this.enablePan === !1) return;
      this._handleTouchMovePan(e), this.update();
      break;
    case Qe.TOUCH_DOLLY_PAN:
      if (this.enableZoom === !1 && this.enablePan === !1) return;
      this._handleTouchMoveDollyPan(e), this.update();
      break;
    case Qe.TOUCH_DOLLY_ROTATE:
      if (this.enableZoom === !1 && this.enableRotate === !1) return;
      this._handleTouchMoveDollyRotate(e), this.update();
      break;
    default:
      this.state = Qe.NONE;
  }
}
function Tf(e) {
  this.enabled !== !1 && e.preventDefault();
}
function bf(e) {
  e.key === "Control" && (this._controlActive = !0, this.domElement.getRootNode().addEventListener("keyup", this._interceptControlUp, {
    passive: !0,
    capture: !0
  }));
}
function Af(e) {
  e.key === "Control" && (this._controlActive = !1, this.domElement.getRootNode().removeEventListener("keyup", this._interceptControlUp, {
    passive: !0,
    capture: !0
  }));
}
var Go = {
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
function wi(e) {
  return e.shape === "icon" || e.shape === "label" || e.category === "actor" || e.category === "door" || e.kind === "stairs" || e.icon === "stairs";
}
function wf(e) {
  if (wi(e) || e.category === "wall" || !e.icon || !Object.hasOwn(Go, e.icon)) return;
  const t = e.icon;
  return Go[t].includes(e.shape) ? t : void 0;
}
function Rf(e) {
  const [t, n, i, r] = e.viewBox, s = Math.max(i, r) / 14;
  return {
    scale: s,
    point: (o, a, c = 0) => new D((o - t - i / 2) / s, c, (a - n - r / 2) / s)
  };
}
function Cf(e, t) {
  const n = tl(e), i = [n.x + n.width / 2, n.y + n.height / 2], r = ja(e), s = r.points.map(([o, a]) => new se((o - i[0]) / t, (a - i[1]) / t));
  return r.closed && s.length > 1 && s[0].equals(s[s.length - 1]) && s.pop(), {
    center: i,
    width: n.width / t,
    depth: n.height / t,
    points: s,
    closed: r.closed,
    rotation: -(e.rotation || 0) * Math.PI / 180
  };
}
function Pf(e, t) {
  const n = new Ch(new Ea(e.map((i) => new se(i.x, -i.y))), {
    depth: t,
    bevelEnabled: !1,
    steps: 1,
    curveSegments: 1
  });
  return n.rotateX(-Math.PI / 2), n;
}
function Lf(e, t, n) {
  const i = e.map((r) => new D(r.x, n, r.y));
  return t && i.length && i.push(i[0].clone()), new It().setFromPoints(i);
}
function Df(e, t, n) {
  const i = [];
  for (let s = 0; s < e.length - (t ? 0 : 1); s += 1) {
    const o = e[s], a = e[(s + 1) % e.length], c = a.clone().sub(o);
    if (!c.lengthSq()) continue;
    const l = new se(-c.y, c.x).normalize().multiplyScalar(n / 2), h = [
      o.clone().add(l),
      o.clone().sub(l),
      a.clone().add(l),
      a.clone().sub(l)
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
  const r = new It();
  return r.setAttribute("position", new ut(i, 3)), r.computeVertexNormals(), r;
}
function If(e, t) {
  return e.slice(0, t ? e.length : -1).flatMap((n, i) => {
    const r = e[(i + 1) % e.length], s = n.distanceTo(r);
    return s ? [{
      x: (n.x + r.x) / 2,
      z: (n.y + r.y) / 2,
      length: s,
      rotation: -Math.atan2(r.y - n.y, r.x - n.x)
    }] : [];
  });
}
function Uf(e, t) {
  const i = new Uint8Array(65536);
  let r = 781;
  for (let o = 0; o < 128; o += 1) for (let a = 0; a < 128; a += 1) {
    r = Math.imul(r, 1664525) + 1013904223 >>> 0;
    const c = r / 4294967296;
    let l = 0.94 + c * 0.06;
    if (e === "wood") {
      if (l = 0.89 + Math.sin(o * 0.82 + Math.sin(a * Math.PI / 64) * 2 + Math.sin(o * 0.19)) * 0.045 + c * 0.04, t) {
        const u = Math.floor(o / 32);
        l += [
          0,
          0.025,
          -0.02,
          0.012
        ][u], (o % 32 === 0 || (a + u * 47) % 128 === 0) && (l = 0.69);
      }
    } else e === "tile" ? l = a % 64 < 2 || o % 64 < 2 ? 0.73 : 0.96 + c * 0.04 : [
      "fabric",
      "carpet",
      "bed-sheet",
      "tatami"
    ].includes(e) ? l = 0.88 + (a % 4 < 2 == o % 4 < 2 ? 0.07 : 0) + c * 0.05 : (e === "stone" || e === "marble") && (l = 0.92 + Math.sin(a * 0.15 + Math.sin(o * 0.12)) * 0.025 + c * 0.055);
    const h = Math.round(l * 255);
    i.set([
      h,
      h,
      h,
      255
    ], (o * 128 + a) * 4);
  }
  const s = new da(i, 128, 128, $n);
  return s.colorSpace = wt, s.wrapS = s.wrapT = ur, t && e === "wood" && s.repeat.set(0.55, 0.55), s.magFilter = cn, s.minFilter = vr, s.generateMipmaps = !0, s.anisotropy = 4, s.needsUpdate = !0, s;
}
var Nf = {
  ...Ja,
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
function Of(e, t) {
  const n = /* @__PURE__ */ new Map(), i = /* @__PURE__ */ new Map(), r = /* @__PURE__ */ new Map();
  function s(a, c = 0) {
    const l = a.material || (a.category === "water" ? "water" : "unknown"), h = `${l}:${a.category}:${a.certainty}:${c}`;
    let u = n.get(h);
    if (!u) {
      const f = {
        danger: "#d77c80",
        magic: "#b29cdb",
        light: "#f4d697",
        actor: "#4598cf",
        marker: "#72b9cb",
        secret: "#8d9ca9"
      }, p = a.category === "terrain", g = l === "wood" && p ? "#c8ab85" : Nf[l], _ = new qe(!a.material && a.category in f ? f[a.category] : g);
      _.lerp(new qe(c > 0 ? "#ffffff" : "#201c1a"), Math.abs(c));
      const m = os(a, "").opacity * (l === "glass" ? 0.42 : 1), d = [
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
      ].includes(l), T = `${l}:${p}`;
      d && !r.has(T) && r.set(T, e.own(Uf(l, p)));
      const v = r.get(T) || null;
      u = e.own(new Dh({
        color: _,
        roughness: l === "metal" ? 0.32 : l === "glass" || l === "water" ? 0.22 : l === "wood" ? 0.64 : 0.92,
        metalness: l === "metal" ? 0.32 : 0,
        transparent: m < 1,
        opacity: m,
        depthWrite: m >= 1,
        side: 2,
        map: v,
        bumpMap: v,
        bumpScale: l === "wood" ? 0.018 : 9e-3,
        emissive: [
          "rune",
          "warm-light",
          "cold-light"
        ].includes(l) ? _ : "#000000",
        emissiveIntensity: 0.18
      })), n.set(h, u);
    }
    return u;
  }
  function o(a) {
    const c = `${a.certainty}:${a.category}`;
    let l = i.get(c);
    if (!l) {
      const h = a.certainty && a.certainty !== "confirmed";
      l = e.own(new Nh({
        color: t ? "#b1bfca" : "#798b91",
        dashSize: a.certainty === "unknown" ? 0.035 : 0.12,
        gapSize: h ? 0.09 : 0,
        transparent: !0,
        opacity: os(a, "").opacity
      })), i.set(c, l);
    }
    return l;
  }
  return {
    mesh: s,
    line: o
  };
}
var Ff = class {
  resources = /* @__PURE__ */ new Set();
  own(e) {
    return this.resources.add(e), e;
  }
  dispose() {
    for (const e of this.resources) e.dispose();
    this.resources.clear();
  }
}, pi = new D();
function Dt(e, t, n, i, r, s) {
  const o = 2 * Math.PI * r / 4, a = Math.max(s - 2 * r, 0), c = Math.PI / 4;
  pi.copy(t), pi[i] = 0, pi.normalize();
  const l = 0.5 * o / (o + a), h = 1 - pi.angleTo(e) / c;
  return Math.sign(pi[n]) === 1 ? h * l : a / (o + a) + l + l * (1 - h);
}
var Wo = class ka extends Ri {
  constructor(t = 1, n = 1, i = 1, r = 2, s = 0.1) {
    const o = r * 2 + 1;
    if (s = Math.min(t / 2, n / 2, i / 2, s), super(1, 1, 1, o, o, o), this.type = "RoundedBoxGeometry", this.parameters = {
      width: t,
      height: n,
      depth: i,
      segments: r,
      radius: s
    }, o === 1) return;
    const a = this.toNonIndexed();
    this.index = null, this.attributes.position = a.attributes.position, this.attributes.normal = a.attributes.normal, this.attributes.uv = a.attributes.uv;
    const c = new D(), l = new D(), h = new D(t, n, i).divideScalar(2).subScalar(s), u = this.attributes.position.array, f = this.attributes.normal.array, p = this.attributes.uv.array, g = u.length / 6, _ = new D(), m = 0.5 / o;
    for (let d = 0, T = 0; d < u.length; d += 3, T += 2)
      switch (c.fromArray(u, d), l.copy(c), l.x -= Math.sign(l.x) * m, l.y -= Math.sign(l.y) * m, l.z -= Math.sign(l.z) * m, l.normalize(), u[d + 0] = h.x * Math.sign(c.x) + l.x * s, u[d + 1] = h.y * Math.sign(c.y) + l.y * s, u[d + 2] = h.z * Math.sign(c.z) + l.z * s, f[d + 0] = l.x, f[d + 1] = l.y, f[d + 2] = l.z, Math.floor(d / g)) {
        case 0:
          _.set(1, 0, 0), p[T + 0] = Dt(_, l, "z", "y", s, i), p[T + 1] = 1 - Dt(_, l, "y", "z", s, n);
          break;
        case 1:
          _.set(-1, 0, 0), p[T + 0] = 1 - Dt(_, l, "z", "y", s, i), p[T + 1] = 1 - Dt(_, l, "y", "z", s, n);
          break;
        case 2:
          _.set(0, 1, 0), p[T + 0] = 1 - Dt(_, l, "x", "z", s, t), p[T + 1] = Dt(_, l, "z", "x", s, i);
          break;
        case 3:
          _.set(0, -1, 0), p[T + 0] = 1 - Dt(_, l, "x", "z", s, t), p[T + 1] = 1 - Dt(_, l, "z", "x", s, i);
          break;
        case 4:
          _.set(0, 0, 1), p[T + 0] = 1 - Dt(_, l, "x", "y", s, t), p[T + 1] = 1 - Dt(_, l, "y", "x", s, n);
          break;
        case 5:
          _.set(0, 0, -1), p[T + 0] = Dt(_, l, "x", "y", s, t), p[T + 1] = 1 - Dt(_, l, "y", "x", s, n);
          break;
      }
  }
  static fromJSON(t) {
    return new ka(t.width, t.height, t.depth, t.segments, t.radius);
  }
};
function Bf(e, t) {
  const n = e.own(new Wo(1, 1, 1, 3, 0.035)), i = e.own(new Wo(1, 1, 1, 4, 0.16)), r = e.own(n.clone()), s = r.getAttribute("position");
  for (let l = 0; l < s.count; l += 1) {
    const h = 0.72 + 0.28 * (s.getY(l) + 0.5);
    s.setX(l, s.getX(l) * h), s.setZ(l, s.getZ(l) * h);
  }
  r.computeVertexNormals();
  const o = e.own(new Kc(0.5, 0.5, 1, 32)), a = e.own(new Da(0.5, 16, 10)), c = e.own(new Jc(0.5, 0));
  return function(h, u, f, p, g) {
    const _ = Math.min(1.6, Math.min(p, g)), m = /* @__PURE__ */ new Map();
    function d(b, w, C, P, E, y, R = 0, z = n) {
      const k = t.mesh(u, R), B = `${z.uuid}:${k.uuid}`;
      m.has(B) || m.set(B, {
        geometry: z,
        material: k,
        matrices: []
      }), m.get(B).matrices.push(new nt().makeScale(P * p, E * _, y * g).setPosition(b * p, w * _, C * g));
    }
    function T(b) {
      for (const w of [-0.37, 0.37]) for (const C of [-0.36, 0.36]) d(w, b / 2, C, 0.075, b, 0.075, -0.16, r);
    }
    function v() {
      switch (f) {
        case "table":
          if (u.shape === "circle")
            d(0, 0.6, 0, 1, 0.08, 1, 0.12, o), d(0, 0.29, 0, 0.18, 0.58, 0.18, -0.15, o), d(0, 0.04, 0, 0.43, 0.08, 0.43, -0.22, o);
          else {
            T(0.58);
            for (const b of [-0.36, 0.36]) d(0, 0.52, b, 0.83, 0.13, 0.045, -0.12);
            for (const b of [-0.37, 0.37]) d(b, 0.52, 0, 0.045, 0.13, 0.75, -0.12);
            d(0, 0.607, 0, 0.98, 0.065, 0.98, -0.1), d(0, 0.651, 0, 1, 0.035, 1, 0.12);
          }
          return 0.67 * _;
        case "chair":
          T(0.52), d(0, 0.55, 0.035, 1, 0.08, 0.93, 0.06), d(0, 0.595, 0.05, 0.91, 0.035, 0.83, 0.16);
          for (const b of [-0.42, 0.42]) d(b, 0.82, -0.425, 0.095, 0.73, 0.12, -0.1);
          for (const b of [
            -0.22,
            0,
            0.22
          ]) d(b, 0.9, -0.425, 0.12, 0.42, 0.07, 0.02);
          d(0, 1.14, -0.425, 0.96, 0.1, 0.14, 0.12);
          for (const b of [-0.37, 0.37]) d(b, 0.23, 0, 0.035, 0.045, 0.74, -0.12);
          return 1.19 * _;
        case "bed":
          return T(0.2), d(0, 0.24, 0, 1, 0.18, 1, -0.2), d(0, 0.39, 0.02, 0.96, 0.16, 0.92, 0.55), d(0, 0.5, 0.15, 0.98, 0.06, 0.63, 0.08), d(0, 0.5, -0.29, 0.64, 0.13, 0.22, 0.65), d(0, 0.47, -0.47, 1, 0.7, 0.06, -0.16), 0.82 * _;
        case "counter":
          d(0, 0.08, 0, 0.9, 0.16, 0.86, -0.28), d(0, 0.57, 0, 0.94, 0.9, 0.91, -0.08), d(0, 0.17, 0.46, 0.96, 0.1, 0.06, 0.06), d(0, 0.94, 0.46, 0.96, 0.08, 0.06, 0.08);
          for (const b of [
            -0.32,
            0,
            0.32
          ])
            d(b, 0.55, 0.46, 0.28, 0.66, 0.045, 0.03), d(b, 0.55, 0.487, 0.235, 0.52, 0.02, -0.09);
          return d(0, 1.025, 0, 1, 0.065, 1, -0.18), d(0, 1.065, 0, 1, 0.03, 1, 0.16), 1.08 * _;
        case "shelf":
          d(0, 1.05, -0.47, 1, 2.1, 0.06, -0.2);
          for (const b of [-0.48, 0.48]) d(b, 1.05, 0, 0.04, 2.1, 1, -0.08);
          for (let b = 0; b < 4; b += 1) d(0, 0.04 + b * 0.67, 0, 1, 0.06, 1, 0.12);
          for (const b of [-0.17, 0.17]) d(b, 1.03, 0, 0.025, 1.98, 0.92, -0.04);
          return d(0, 2.06, 0, 1, 0.08, 1, 0.16), 2.1 * _;
        case "sofa":
          T(0.14), d(0, 0.26, 0, 0.96, 0.27, 0.96, -0.18), d(0, 0.65, -0.37, 0.98, 0.76, 0.26, -0.08, i);
          for (const b of [-0.44, 0.44]) d(b, 0.52, 0, 0.12, 0.49, 0.98, 0.02, i);
          for (const b of [
            -0.26,
            0,
            0.26
          ])
            d(b, 0.46, 0.11, 0.245, 0.19, 0.72, 0.12, i), d(b, 0.77, -0.22, 0.245, 0.43, 0.22, 0.08, i);
          return 1.04 * _;
        case "bridge":
          for (let b = 0; b < 12; b += 1) d(0, 0.16, -0.46 + b * 0.083, 1, 0.1, 0.075, b % 2 ? 0.1 : 0);
          for (const b of [-0.45, 0.45]) {
            d(b, 0.61, 0, 0.045, 0.045, 1, -0.15);
            for (const w of [
              -0.45,
              0,
              0.45
            ]) d(b, 0.35, w, 0.055, 0.55, 0.04, -0.18);
          }
          return 0.65 * _;
        case "tree":
          return d(0, 0.44, 0, 0.14, 0.88, 0.14, -0.42, o), d(0, 1.04, 0, 1, 1.2, 1, -0.04, a), d(-0.16, 1.3, -0.06, 0.6, 0.65, 0.6, 0.13, a), 1.65 * _;
        case "rock":
          return d(0, 0.29, 0, 1, 0.62, 1, 0.03, c), 0.6 * _;
      }
    }
    const S = v();
    for (const { geometry: b, material: w, matrices: C } of m.values()) {
      const P = e.own(new us(b, w, C.length));
      C.forEach((E, y) => P.setMatrixAt(y, E)), P.castShadow = w.opacity >= 0.8, P.receiveShadow = !0, h.add(P);
    }
    return S;
  };
}
function zf(e, t) {
  let n = !1;
  for (let i = 0, r = t.length - 1; i < t.length; r = i++) {
    const s = t[i], o = t[r];
    s.y > e.y != o.y > e.y && e.x < (o.x - s.x) * (e.y - s.y) / (o.y - s.y) + s.x && (n = !n);
  }
  return n;
}
function Vf(e, t) {
  const n = new Ff(), i = new qn();
  try {
    const r = Rf(e), s = Of(n, t), o = Bf(n, s), a = n.own(new Ri(1, 1, 1)), c = n.own(new Da(0.5, 8, 6)), l = Qa(e.elements), h = /* @__PURE__ */ new Map(), u = [];
    for (const [p, g] of $a(e.elements).entries()) {
      const _ = Cf(g, r.scale), m = new qn();
      m.position.copy(r.point(..._.center, p * 2e-3)), m.rotation.y = _.rotation, i.add(m);
      let d = 0.015;
      const T = wf(g), v = !T && !wi(g) && Us(g) && ["furniture", "decoration"].includes(g.category);
      if (g.shape === "icon" || g.shape === "label") d = 0.08;
      else if (g.category === "wall") {
        d = 1.1;
        const b = If(_.points, _.closed), w = n.own(new us(a, s.mesh(g, 0.12), b.length));
        w.castShadow = w.receiveShadow = !0, m.add(w), b.forEach((C, P) => {
          const E = new nt().makeRotationY(C.rotation).scale(new D(C.length, d, 0.08)).setPosition(C.x, d / 2, C.z);
          w.setMatrixAt(P, E);
        }), u.push(w);
      } else if (T) d = o(m, g, T, _.width, _.depth);
      else if (Us(g)) {
        d = v ? 0.2 : 0.015;
        const b = new Rt(n.own(Pf(_.points, d)), s.mesh(g));
        b.castShadow = d > 0.1, b.receiveShadow = !0, m.add(b);
      } else if (g.category === "road" || g.category === "water") {
        const b = new Rt(n.own(Df(_.points, _.closed, g.category === "road" ? 0.16 : 0.08).translate(0, d, 0)), s.mesh(g));
        b.receiveShadow = !0, m.add(b);
      }
      if (_.points.length && !T) {
        const b = new Zc(n.own(Lf(_.points, _.closed, g.category === "wall" ? 0.012 : d + 4e-3)), s.line(g));
        b.computeLineDistances(), m.add(b);
      }
      const S = (l.get(g.id) || []).flatMap((b) => {
        const w = new se((b.x - _.center[0]) / r.scale, (b.y - _.center[1]) / r.scale), C = b.size / r.scale / 2;
        return Array.from({ length: 8 }, (P, E) => new se(w.x + C * Math.cos(E * Math.PI / 4), w.y + C * Math.sin(E * Math.PI / 4))).every((P) => zf(P, _.points)) ? [{
          center: w,
          radius: C
        }] : [];
      });
      if (S.length) {
        const b = new us(c, s.mesh(g, -0.13), S.length);
        S.forEach(({ center: w, radius: C }, P) => b.setMatrixAt(P, new nt().makeScale(C * 2, C * 1.4, C * 2).setPosition(w.x, C * 0.7 + d, w.y))), b.castShadow = b.receiveShadow = !0, n.own(b), m.add(b);
      }
      wi(g) ? h.set(g.id, r.point(..._.center, m.position.y + 0.025)) : T || v ? h.set(g.id, r.point(..._.center, m.position.y + d + 0.1)) : h.set(g.id, r.point(...Ka(g, 0), m.position.y + 0.1));
    }
    const f = new en().setFromObject(i);
    for (const p of h.values()) f.expandByPoint(p);
    return {
      group: i,
      anchors: h,
      bounds: f,
      updateWalls(p) {
        for (const g of u) g.scale.y = p ? 0.2 / 1.1 : 1;
      },
      dispose() {
        i.removeFromParent(), n.dispose(), i.clear();
      }
    };
  } catch (r) {
    throw n.dispose(), i.clear(), r;
  }
}
var Xo = (e, t) => e.x < t.x + t.w + 3 && e.x + e.w + 3 > t.x && e.y < t.y + t.h + 3 && e.y + e.h + 3 > t.y;
function Hf(e, t, n, i = []) {
  const r = /* @__PURE__ */ new Map(), s = [...e].sort((h, u) => h.priority - u.priority || h.id.localeCompare(u.id)), o = [...i], a = s.filter((h) => h.badge).map(({ anchor: h }) => ({
    x: h.x - 3,
    y: h.y - 3,
    w: 6,
    h: 6
  })), c = (h) => h.x >= 3 && h.y >= 3 && h.x + h.w <= t - 3 && h.y + h.h <= n - 3, l = (h) => c(h) && !o.some((u) => Xo(h, u)) && !a.some((u) => Xo(h, u));
  for (const h of s) {
    const u = { anchor: { ...h.anchor } };
    if (r.set(h.id, u), !h.badge) continue;
    const { w: f, h: p } = h.badge, { x: g, y: _ } = h.anchor, m = [];
    for (const T of [
      9,
      27,
      45
    ]) m.push({
      x: g - f / 2,
      y: _ - p - T,
      w: f,
      h: p
    }, {
      x: g + T,
      y: _ - p / 2,
      w: f,
      h: p
    }, {
      x: g - f - T,
      y: _ - p / 2,
      w: f,
      h: p
    }, {
      x: g - f / 2,
      y: _ + T,
      w: f,
      h: p
    });
    const d = m.map((T) => ({
      x: Math.max(3, Math.min(t - f - 3, T.x)),
      y: Math.max(3, Math.min(n - p - 3, T.y)),
      w: f,
      h: p
    }));
    u.badge = d.find(l) || d[0], o.push(u.badge);
  }
  for (const h of s) {
    if (!h.caption) continue;
    const u = r.get(h.id), { w: f, h: p } = h.caption, g = u.badge || {
      ...h.anchor,
      w: 0,
      h: 0
    };
    u.caption = [
      {
        x: g.x + (g.w - f) / 2,
        y: g.y - p - 5,
        w: f,
        h: p
      },
      {
        x: g.x + g.w + 6,
        y: g.y + (g.h - p) / 2,
        w: f,
        h: p
      },
      {
        x: g.x - f - 6,
        y: g.y + (g.h - p) / 2,
        w: f,
        h: p
      },
      {
        x: g.x + (g.w - f) / 2,
        y: g.y + g.h + 5,
        w: f,
        h: p
      }
    ].find(l), u.caption && o.push(u.caption);
  }
  return r;
}
function kf(e, t, n) {
  const i = t.elements.filter((r) => r.label || wi(r)).map((r) => {
    const s = wi(r) && r.shape !== "label", o = r.actorKey === "player", a = o ? 0 : r.category === "door" ? 1 : r.category === "actor" ? 2 : s ? 3 : 4, c = r.label || el[r.category], l = document.createElement("span");
    l.className = `map-3d-label is-${r.category}${o ? " is-player" : ""}`, l.dataset.element = r.id, l.style.zIndex = String(10 - a), s && (l.setAttribute("role", "img"), l.setAttribute("aria-label", c));
    const h = os(r, "");
    l.style.opacity = String(h.opacity);
    const u = document.createElement("span");
    u.className = "map-3d-glyph", u.setAttribute("aria-hidden", "true");
    const f = document.createElement("span");
    f.className = "map-3d-anchor", f.setAttribute("aria-hidden", "true");
    const p = document.createElement("span");
    p.className = "map-3d-leader", p.setAttribute("aria-hidden", "true"), s && l.append(p, f, u);
    const g = document.createElement("span");
    return g.textContent = c, g.className = "map-3d-label-text", s && g.setAttribute("aria-hidden", "true"), l.append(g), e.append(l), {
      element: r,
      node: l,
      glyph: u,
      dot: f,
      leader: p,
      caption: g,
      recipe: h,
      hasGlyph: s,
      priority: a,
      anchor: n.get(r.id)
    };
  });
  return {
    symbols(r) {
      for (const s of i)
        s.glyph.textContent = r ? s.recipe.icon : s.recipe.fallback, s.glyph.classList.toggle("has-symbols", r);
    },
    update(r, s, o, a) {
      const c = [];
      for (const { element: f, node: p, caption: g, glyph: _, anchor: m, hasGlyph: d, priority: T } of i) {
        p.style.visibility = "hidden", g.hidden = !a;
        const v = m.clone().project(r), S = (v.x + 1) * s / 2, b = (1 - v.y) * o / 2;
        v.z < -1 || v.z > 1 || S < 0 || S > s || b < 0 || b > o || c.push({
          id: f.id,
          anchor: {
            x: S,
            y: b
          },
          priority: T,
          badge: d ? {
            w: _.offsetWidth,
            h: _.offsetHeight
          } : void 0,
          caption: a ? {
            w: g.offsetWidth,
            h: g.offsetHeight
          } : void 0
        });
      }
      const l = e.parentElement?.querySelector(".map-viewport-controls")?.getBoundingClientRect(), h = e.getBoundingClientRect(), u = Hf(c, s, o, l ? [{
        x: l.x - h.x,
        y: l.y - h.y,
        w: l.width,
        h: l.height
      }] : []);
      for (const { element: f, node: p, caption: g, dot: _, leader: m } of i) {
        const d = u.get(f.id), T = d?.badge || d?.caption;
        if (g.style.visibility = d?.caption ? "inherit" : "hidden", !(!d || !T) && (p.style.visibility = "visible", p.style.transform = `translate(${T.x}px, ${T.y}px)`, p.style.width = `${T.w}px`, p.style.height = `${T.h}px`, d.caption && (g.style.left = `${d.caption.x - T.x}px`, g.style.top = `${d.caption.y - T.y}px`), d.badge)) {
          const v = d.anchor.x - T.x, S = d.anchor.y - T.y;
          _.style.transform = `translate(${v}px, ${S}px)`;
          const b = Math.max(0, Math.min(T.w, v)), w = Math.max(0, Math.min(T.h, S));
          m.style.width = `${Math.hypot(b - v, w - S)}px`, m.style.transform = `translate(${v}px, ${S}px) rotate(${Math.atan2(w - S, b - v)}rad)`;
        }
      }
    },
    dispose() {
      for (const { node: r } of i) r.remove();
    }
  };
}
function Wf(e, t, n) {
  let i, r, s, o, a, c, l, h = !1, u = !1, f = !0, p = 0, g = 0, _ = 0, m = !0, d = !0, T = !1, v, S = 14, b = 14;
  const w = new AbortController(), C = new Gc(), P = new bs(-10, 10, 10, -10, 0.01, 1e3), E = new se(), y = new qh("#f5f8ff", "#9c8c7a", 1.65), R = new mo("#fff3df", 3.1);
  R.castShadow = !0, R.shadow.mapSize.set(1024, 1024), R.shadow.normalBias = 0.012, R.shadow.bias = -15e-5, R.shadow.radius = 2;
  const z = new mo("#daeaff", 0.65);
  C.add(y, R, R.target, z);
  const k = () => !!e.closest(".theme-dark");
  let B = k();
  function Z() {
    p && (cancelAnimationFrame(p), p = 0);
  }
  function W() {
    h || (h = !0, Z(), w.abort(), a?.disconnect(), c?.disconnect(), l?.disconnect(), r?.dispose(), o?.dispose(), s?.dispose(), R.shadow.dispose(), i?.dispose(), i?.forceContextLoss(), i?.domElement.remove(), C.clear());
  }
  function Q(F) {
    h || u || (u = !0, Z(), n.fallback(F));
  }
  function G() {
    h || u || p || document.hidden || !f || g <= 0 || _ <= 0 || (p = requestAnimationFrame(() => {
      p = 0;
      try {
        i.getSize(E), (E.x !== g || E.y !== _) && i.setSize(g, _, !1), i.render(C, P), o?.update(P, g, _, m);
      } catch {
        Q("三维画面暂不可用，已切换二维。");
      }
    }));
  }
  function oe() {
    const F = v ? Math.max(v.viewBox[2], v.viewBox[3]) / 14 : 1, X = v ? v.viewBox[2] / F / 2 : 7, ee = v ? v.viewBox[3] / F / 2 : 7;
    return new en(new D(-X, 0, -ee), new D(X, 0, ee)).union(s.bounds);
  }
  function fe() {
    const F = oe(), X = F.getCenter(new D()), ee = Math.max(1, F.getSize(new D()).length());
    R.position.copy(X).add(new D(-ee / 2, ee, ee / 2)), R.target.position.copy(X), z.position.copy(X).add(new D(ee, ee / 2, -ee)), R.updateMatrixWorld(!0), R.target.updateMatrixWorld(!0), R.shadow.updateMatrices(R);
    const pe = F.clone().applyMatrix4(R.shadow.camera.matrixWorldInverse);
    Object.assign(R.shadow.camera, {
      left: pe.min.x - 0.3,
      right: pe.max.x + 0.3,
      top: pe.max.y + 0.3,
      bottom: pe.min.y - 0.3,
      near: Math.max(0.01, -pe.max.z - 1),
      far: -pe.min.z + 1
    }), R.shadow.camera.updateProjectionMatrix(), R.shadow.needsUpdate = !0;
  }
  function Le() {
    if (!r || !s) return;
    const F = oe(), X = F.getCenter(new D()), ee = Math.max(1, F.getSize(new D()).length());
    r.target.copy(X), P.position.copy(X).add(new D(9, 13, 15).normalize().multiplyScalar(ee * 2)), P.near = ee / 1e3, P.far = ee * 6, P.lookAt(X), P.updateMatrixWorld(!0);
    let pe = 0, Pe = 0;
    for (const ke of [F.min.x, F.max.x]) for (const L of [F.min.y, F.max.y]) for (const K of [F.min.z, F.max.z]) {
      const $ = new D(ke, L, K).applyMatrix4(P.matrixWorldInverse);
      pe = Math.max(pe, Math.abs($.x)), Pe = Math.max(Pe, Math.abs($.y));
    }
    S = pe, b = Pe;
    const ye = Math.max(b, S / (g / _ || 1)) * 1.09;
    P.top = ye, P.bottom = -ye, P.left = -ye * (g / _ || 1), P.right = -P.left, P.zoom = 1, P.updateProjectionMatrix(), r.update(), G();
  }
  function Ue() {
    if (h) return;
    const F = e.getBoundingClientRect();
    if (g = F.width, _ = F.height, g <= 0 || _ <= 0) {
      Z();
      return;
    }
    P.top = Math.max(b, S / (g / _)) * 1.09, P.bottom = -P.top, P.left = -P.top * g / _, P.right = -P.left, P.updateProjectionMatrix(), G();
  }
  function Je(F) {
    if (!(h || u))
      try {
        const X = v?.key !== F.key, ee = Vf(F, B);
        o?.dispose(), s?.dispose(), v = F, s = ee, C.add(s.group), s.updateWalls(d), o = kf(t, F, s.anchors), o.symbols(T), fe(), X && Le(), G();
      } catch {
        Q("这个场景暂时无法立体显示，已切换二维。");
      }
  }
  function Ye(F) {
    P.zoom = cs.clamp(P.zoom * F, 0.4, 6), P.updateProjectionMatrix(), G();
  }
  try {
    i = new df({
      antialias: !0,
      alpha: !0,
      powerPreference: "low-power"
    }), i.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.8)), i.setClearColor(0, 0), i.outputColorSpace = wt, i.toneMapping = 7, i.toneMappingExposure = 1.1, i.shadowMap.enabled = !0, i.shadowMap.type = 2, i.debug.onShaderError = () => Q("图形驱动无法绘制三维，已切换二维。");
    const F = i.domElement;
    F.setAttribute("aria-label", "三维场景：拖动旋转，双指缩放和平移，方向键旋转，Home 全图"), F.setAttribute("role", "group"), F.tabIndex = 0, e.prepend(F), r = new pf(P, F), r.enableDamping = !1, r.minPolarAngle = 0.08, r.maxPolarAngle = Math.PI * 0.46, r.minZoom = 0.4, r.maxZoom = 6, r.rotateSpeed = 0.65, r.zoomSpeed = 0.8, r.addEventListener("change", G), F.addEventListener("webglcontextlost", (X) => {
      X.preventDefault(), Q("图形连接已中断，已切换二维。重新打开地图可重试。");
    }, { signal: w.signal }), F.addEventListener("keydown", (X) => {
      if (!(X.ctrlKey || X.metaKey || X.altKey)) {
        if (X.key === "Home") Le();
        else if (X.key === "+" || X.key === "=") Ye(1.2);
        else if (X.key === "-") Ye(1 / 1.2);
        else if ([
          "ArrowLeft",
          "ArrowRight",
          "ArrowUp",
          "ArrowDown"
        ].includes(X.key)) {
          const ee = new ms().setFromVector3(P.position.clone().sub(r.target));
          ee.theta += X.key === "ArrowLeft" ? -0.13 : X.key === "ArrowRight" ? 0.13 : 0, ee.phi = cs.clamp(ee.phi + (X.key === "ArrowUp" ? -0.1 : X.key === "ArrowDown" ? 0.1 : 0), r.minPolarAngle, r.maxPolarAngle), P.position.copy(r.target).add(new D().setFromSpherical(ee)), r.update(), G();
        } else return;
        X.preventDefault();
      }
    }, { signal: w.signal }), a = new ResizeObserver(() => {
      try {
        Ue();
      } catch {
        Q("三维画面尺寸调整失败，已切换二维。");
      }
    }), a.observe(e), Ue(), c = new IntersectionObserver((X) => {
      f = X[0].isIntersecting, f ? G() : Z();
    }), c.observe(e), document.addEventListener("visibilitychange", () => {
      document.hidden ? Z() : G();
    }, { signal: w.signal }), l = new MutationObserver(() => {
      const X = k();
      X !== B && (B = X, v && Je(v));
    });
    for (let X = e; X; X = X.parentElement) l.observe(X, {
      attributes: !0,
      attributeFilter: ["class"]
    });
    return {
      dispose: W,
      setScene: Je,
      fit: Le,
      zoom: Ye,
      labels(X) {
        m = X, G();
      },
      walls(X) {
        d = X, s?.updateWalls(X), G();
      },
      symbols(X) {
        T = X, o?.symbols(X), G();
      }
    };
  } catch (F) {
    throw W(), F;
  }
}
export {
  Wf as createThreeRuntime
};
