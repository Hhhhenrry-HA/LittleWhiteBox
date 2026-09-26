(function() {
	var it = (t, i) => () => (i || (t((i = { exports: {} }).exports, i), t = null), i.exports), at = it(((t, i) => {
		i.exports = {};
	}));
	it(((t, i) => {
		(function() {
			"use strict";
			var a = "input is invalid type", u = typeof window == "object", s = u ? window : {};
			s.JS_SHA256_NO_WINDOW && (u = !1);
			var d = !u && typeof self == "object", M = !s.JS_SHA256_NO_NODE_JS && typeof process == "object" && process.versions && process.versions.node && process.type != "renderer";
			M ? s = globalThis : d && (s = self);
			var h = !s.JS_SHA256_NO_COMMON_JS && typeof i == "object" && i.exports, m = typeof define == "function" && define.amd, n = !s.JS_SHA256_NO_ARRAY_BUFFER && typeof ArrayBuffer < "u", e = "0123456789abcdef".split(""), y = [
				-2147483648,
				8388608,
				32768,
				128
			], v = [
				24,
				16,
				8,
				0
			], B = [
				1116352408,
				1899447441,
				3049323471,
				3921009573,
				961987163,
				1508970993,
				2453635748,
				2870763221,
				3624381080,
				310598401,
				607225278,
				1426881987,
				1925078388,
				2162078206,
				2614888103,
				3248222580,
				3835390401,
				4022224774,
				264347078,
				604807628,
				770255983,
				1249150122,
				1555081692,
				1996064986,
				2554220882,
				2821834349,
				2952996808,
				3210313671,
				3336571891,
				3584528711,
				113926993,
				338241895,
				666307205,
				773529912,
				1294757372,
				1396182291,
				1695183700,
				1986661051,
				2177026350,
				2456956037,
				2730485921,
				2820302411,
				3259730800,
				3345764771,
				3516065817,
				3600352804,
				4094571909,
				275423344,
				430227734,
				506948616,
				659060556,
				883997877,
				958139571,
				1322822218,
				1537002063,
				1747873779,
				1955562222,
				2024104815,
				2227730452,
				2361852424,
				2428436474,
				2756734187,
				3204031479,
				3329325298
			], E = [
				"hex",
				"array",
				"digest",
				"arrayBuffer"
			], b = [];
			(s.JS_SHA256_NO_NODE_JS || !Array.isArray) && (Array.isArray = function(r) {
				return Object.prototype.toString.call(r) === "[object Array]";
			}), n && (s.JS_SHA256_NO_ARRAY_BUFFER_IS_VIEW || !ArrayBuffer.isView) && (ArrayBuffer.isView = function(r) {
				return typeof r == "object" && r.buffer && r.buffer.constructor === ArrayBuffer;
			});
			var A = function(r, f) {
				return function(p) {
					return new k(f, !0).update(p)[r]();
				};
			}, x = function(r) {
				var f = A("hex", r);
				M && (f = R(f, r)), f.create = function() {
					return new k(r);
				}, f.update = function(w) {
					return f.create().update(w);
				};
				for (var p = 0; p < E.length; ++p) {
					var l = E[p];
					f[l] = A(l, r);
				}
				return f;
			}, R = function(r, f) {
				var p = at(), l = at().Buffer, w = f ? "sha224" : "sha256", c;
				l.from && !s.JS_SHA256_NO_BUFFER_FROM ? c = l.from : c = function(o) {
					return new l(o);
				};
				var _ = function(o) {
					if (typeof o == "string") return p.createHash(w).update(o, "utf8").digest("hex");
					if (o == null) throw new Error(a);
					return o.constructor === ArrayBuffer && (o = new Uint8Array(o)), Array.isArray(o) || ArrayBuffer.isView(o) || o.constructor === l ? p.createHash(w).update(c(o)).digest("hex") : r(o);
				};
				return _;
			}, U = function(r, f) {
				return function(p, l) {
					return new T(p, f, !0).update(l)[r]();
				};
			}, N = function(r) {
				var f = U("hex", r);
				f.create = function(w) {
					return new T(w, r);
				}, f.update = function(w, c) {
					return f.create(w).update(c);
				};
				for (var p = 0; p < E.length; ++p) {
					var l = E[p];
					f[l] = U(l, r);
				}
				return f;
			};
			function k(r, f) {
				f ? (b[0] = b[16] = b[1] = b[2] = b[3] = b[4] = b[5] = b[6] = b[7] = b[8] = b[9] = b[10] = b[11] = b[12] = b[13] = b[14] = b[15] = 0, this.blocks = b) : this.blocks = [
					0,
					0,
					0,
					0,
					0,
					0,
					0,
					0,
					0,
					0,
					0,
					0,
					0,
					0,
					0,
					0,
					0
				], r ? (this.h0 = 3238371032, this.h1 = 914150663, this.h2 = 812702999, this.h3 = 4144912697, this.h4 = 4290775857, this.h5 = 1750603025, this.h6 = 1694076839, this.h7 = 3204075428) : (this.h0 = 1779033703, this.h1 = 3144134277, this.h2 = 1013904242, this.h3 = 2773480762, this.h4 = 1359893119, this.h5 = 2600822924, this.h6 = 528734635, this.h7 = 1541459225), this.block = this.start = this.bytes = this.hBytes = 0, this.finalized = this.hashed = !1, this.first = !0, this.is224 = r;
			}
			k.prototype.update = function(r) {
				if (!this.finalized) {
					var f, p = typeof r;
					if (p !== "string") {
						if (p === "object") {
							if (r === null) throw new Error(a);
							if (n && r.constructor === ArrayBuffer) r = new Uint8Array(r);
							else if (!Array.isArray(r) && (!n || !ArrayBuffer.isView(r))) throw new Error(a);
						} else throw new Error(a);
						f = !0;
					}
					for (var l, w = 0, c, _ = r.length, o = this.blocks; w < _;) {
						if (this.hashed && (this.hashed = !1, o[0] = this.block, this.block = o[16] = o[1] = o[2] = o[3] = o[4] = o[5] = o[6] = o[7] = o[8] = o[9] = o[10] = o[11] = o[12] = o[13] = o[14] = o[15] = 0), f) for (c = this.start; w < _ && c < 64; ++w) o[c >>> 2] |= r[w] << v[c++ & 3];
						else for (c = this.start; w < _ && c < 64; ++w) l = r.charCodeAt(w), l < 128 ? o[c >>> 2] |= l << v[c++ & 3] : l < 2048 ? (o[c >>> 2] |= (192 | l >>> 6) << v[c++ & 3], o[c >>> 2] |= (128 | l & 63) << v[c++ & 3]) : l < 55296 || l >= 57344 ? (o[c >>> 2] |= (224 | l >>> 12) << v[c++ & 3], o[c >>> 2] |= (128 | l >>> 6 & 63) << v[c++ & 3], o[c >>> 2] |= (128 | l & 63) << v[c++ & 3]) : (l = 65536 + ((l & 1023) << 10 | r.charCodeAt(++w) & 1023), o[c >>> 2] |= (240 | l >>> 18) << v[c++ & 3], o[c >>> 2] |= (128 | l >>> 12 & 63) << v[c++ & 3], o[c >>> 2] |= (128 | l >>> 6 & 63) << v[c++ & 3], o[c >>> 2] |= (128 | l & 63) << v[c++ & 3]);
						this.lastByteIndex = c, this.bytes += c - this.start, c >= 64 ? (this.block = o[16], this.start = c - 64, this.hash(), this.hashed = !0) : this.start = c;
					}
					return this.bytes > 4294967295 && (this.hBytes += this.bytes / 4294967296 << 0, this.bytes = this.bytes % 4294967296), this;
				}
			}, k.prototype.finalize = function() {
				if (!this.finalized) {
					this.finalized = !0;
					var r = this.blocks, f = this.lastByteIndex;
					r[16] = this.block, r[f >>> 2] |= y[f & 3], this.block = r[16], f >= 56 && (this.hashed || this.hash(), r[0] = this.block, r[16] = r[1] = r[2] = r[3] = r[4] = r[5] = r[6] = r[7] = r[8] = r[9] = r[10] = r[11] = r[12] = r[13] = r[14] = r[15] = 0), r[14] = this.hBytes << 3 | this.bytes >>> 29, r[15] = this.bytes << 3, this.hash();
				}
			}, k.prototype.hash = function() {
				var r = this.h0, f = this.h1, p = this.h2, l = this.h3, w = this.h4, c = this.h5, _ = this.h6, o = this.h7, g = this.blocks, I, F, z, C, S, J, K, W, et, rt, X;
				for (I = 16; I < 64; ++I) S = g[I - 15], F = (S >>> 7 | S << 25) ^ (S >>> 18 | S << 14) ^ S >>> 3, S = g[I - 2], z = (S >>> 17 | S << 15) ^ (S >>> 19 | S << 13) ^ S >>> 10, g[I] = g[I - 16] + F + g[I - 7] + z << 0;
				for (X = f & p, I = 0; I < 64; I += 4) this.first ? (this.is224 ? (W = 300032, S = g[0] - 1413257819, o = S - 150054599 << 0, l = S + 24177077 << 0) : (W = 704751109, S = g[0] - 210244248, o = S - 1521486534 << 0, l = S + 143694565 << 0), this.first = !1) : (F = (r >>> 2 | r << 30) ^ (r >>> 13 | r << 19) ^ (r >>> 22 | r << 10), z = (w >>> 6 | w << 26) ^ (w >>> 11 | w << 21) ^ (w >>> 25 | w << 7), W = r & f, C = W ^ r & p ^ X, K = w & c ^ ~w & _, S = o + z + K + B[I] + g[I], J = F + C, o = l + S << 0, l = S + J << 0), F = (l >>> 2 | l << 30) ^ (l >>> 13 | l << 19) ^ (l >>> 22 | l << 10), z = (o >>> 6 | o << 26) ^ (o >>> 11 | o << 21) ^ (o >>> 25 | o << 7), et = l & r, C = et ^ l & f ^ W, K = o & w ^ ~o & c, S = _ + z + K + B[I + 1] + g[I + 1], J = F + C, _ = p + S << 0, p = S + J << 0, F = (p >>> 2 | p << 30) ^ (p >>> 13 | p << 19) ^ (p >>> 22 | p << 10), z = (_ >>> 6 | _ << 26) ^ (_ >>> 11 | _ << 21) ^ (_ >>> 25 | _ << 7), rt = p & l, C = rt ^ p & r ^ et, K = _ & o ^ ~_ & w, S = c + z + K + B[I + 2] + g[I + 2], J = F + C, c = f + S << 0, f = S + J << 0, F = (f >>> 2 | f << 30) ^ (f >>> 13 | f << 19) ^ (f >>> 22 | f << 10), z = (c >>> 6 | c << 26) ^ (c >>> 11 | c << 21) ^ (c >>> 25 | c << 7), X = f & p, C = X ^ f & l ^ rt, K = c & _ ^ ~c & o, S = w + z + K + B[I + 3] + g[I + 3], J = F + C, w = r + S << 0, r = S + J << 0, this.chromeBugWorkAround = !0;
				this.h0 = this.h0 + r << 0, this.h1 = this.h1 + f << 0, this.h2 = this.h2 + p << 0, this.h3 = this.h3 + l << 0, this.h4 = this.h4 + w << 0, this.h5 = this.h5 + c << 0, this.h6 = this.h6 + _ << 0, this.h7 = this.h7 + o << 0;
			}, k.prototype.hex = function() {
				this.finalize();
				var r = this.h0, f = this.h1, p = this.h2, l = this.h3, w = this.h4, c = this.h5, _ = this.h6, o = this.h7, g = e[r >>> 28 & 15] + e[r >>> 24 & 15] + e[r >>> 20 & 15] + e[r >>> 16 & 15] + e[r >>> 12 & 15] + e[r >>> 8 & 15] + e[r >>> 4 & 15] + e[r & 15] + e[f >>> 28 & 15] + e[f >>> 24 & 15] + e[f >>> 20 & 15] + e[f >>> 16 & 15] + e[f >>> 12 & 15] + e[f >>> 8 & 15] + e[f >>> 4 & 15] + e[f & 15] + e[p >>> 28 & 15] + e[p >>> 24 & 15] + e[p >>> 20 & 15] + e[p >>> 16 & 15] + e[p >>> 12 & 15] + e[p >>> 8 & 15] + e[p >>> 4 & 15] + e[p & 15] + e[l >>> 28 & 15] + e[l >>> 24 & 15] + e[l >>> 20 & 15] + e[l >>> 16 & 15] + e[l >>> 12 & 15] + e[l >>> 8 & 15] + e[l >>> 4 & 15] + e[l & 15] + e[w >>> 28 & 15] + e[w >>> 24 & 15] + e[w >>> 20 & 15] + e[w >>> 16 & 15] + e[w >>> 12 & 15] + e[w >>> 8 & 15] + e[w >>> 4 & 15] + e[w & 15] + e[c >>> 28 & 15] + e[c >>> 24 & 15] + e[c >>> 20 & 15] + e[c >>> 16 & 15] + e[c >>> 12 & 15] + e[c >>> 8 & 15] + e[c >>> 4 & 15] + e[c & 15] + e[_ >>> 28 & 15] + e[_ >>> 24 & 15] + e[_ >>> 20 & 15] + e[_ >>> 16 & 15] + e[_ >>> 12 & 15] + e[_ >>> 8 & 15] + e[_ >>> 4 & 15] + e[_ & 15];
				return this.is224 || (g += e[o >>> 28 & 15] + e[o >>> 24 & 15] + e[o >>> 20 & 15] + e[o >>> 16 & 15] + e[o >>> 12 & 15] + e[o >>> 8 & 15] + e[o >>> 4 & 15] + e[o & 15]), g;
			}, k.prototype.toString = k.prototype.hex, k.prototype.digest = function() {
				this.finalize();
				var r = this.h0, f = this.h1, p = this.h2, l = this.h3, w = this.h4, c = this.h5, _ = this.h6, o = this.h7, g = [
					r >>> 24 & 255,
					r >>> 16 & 255,
					r >>> 8 & 255,
					r & 255,
					f >>> 24 & 255,
					f >>> 16 & 255,
					f >>> 8 & 255,
					f & 255,
					p >>> 24 & 255,
					p >>> 16 & 255,
					p >>> 8 & 255,
					p & 255,
					l >>> 24 & 255,
					l >>> 16 & 255,
					l >>> 8 & 255,
					l & 255,
					w >>> 24 & 255,
					w >>> 16 & 255,
					w >>> 8 & 255,
					w & 255,
					c >>> 24 & 255,
					c >>> 16 & 255,
					c >>> 8 & 255,
					c & 255,
					_ >>> 24 & 255,
					_ >>> 16 & 255,
					_ >>> 8 & 255,
					_ & 255
				];
				return this.is224 || g.push(o >>> 24 & 255, o >>> 16 & 255, o >>> 8 & 255, o & 255), g;
			}, k.prototype.array = k.prototype.digest, k.prototype.arrayBuffer = function() {
				this.finalize();
				var r = /* @__PURE__ */ new ArrayBuffer(this.is224 ? 28 : 32), f = new DataView(r);
				return f.setUint32(0, this.h0), f.setUint32(4, this.h1), f.setUint32(8, this.h2), f.setUint32(12, this.h3), f.setUint32(16, this.h4), f.setUint32(20, this.h5), f.setUint32(24, this.h6), this.is224 || f.setUint32(28, this.h7), r;
			};
			function T(r, f, p) {
				var l, w = typeof r;
				if (w === "string") {
					var c = [], _ = r.length, o = 0, g;
					for (l = 0; l < _; ++l) g = r.charCodeAt(l), g < 128 ? c[o++] = g : g < 2048 ? (c[o++] = 192 | g >>> 6, c[o++] = 128 | g & 63) : g < 55296 || g >= 57344 ? (c[o++] = 224 | g >>> 12, c[o++] = 128 | g >>> 6 & 63, c[o++] = 128 | g & 63) : (g = 65536 + ((g & 1023) << 10 | r.charCodeAt(++l) & 1023), c[o++] = 240 | g >>> 18, c[o++] = 128 | g >>> 12 & 63, c[o++] = 128 | g >>> 6 & 63, c[o++] = 128 | g & 63);
					r = c;
				} else if (w === "object") {
					if (r === null) throw new Error(a);
					if (n && r.constructor === ArrayBuffer) r = new Uint8Array(r);
					else if (!Array.isArray(r) && (!n || !ArrayBuffer.isView(r))) throw new Error(a);
				} else throw new Error(a);
				r.length > 64 && (r = new k(f, !0).update(r).array());
				var I = [], F = [];
				for (l = 0; l < 64; ++l) {
					var z = r[l] || 0;
					I[l] = 92 ^ z, F[l] = 54 ^ z;
				}
				k.call(this, f, p), this.update(F), this.oKeyPad = I, this.inner = !0, this.sharedMemory = p;
			}
			T.prototype = new k(), T.prototype.finalize = function() {
				if (k.prototype.finalize.call(this), this.inner) {
					this.inner = !1;
					var r = this.array();
					k.call(this, this.is224, this.sharedMemory), this.update(this.oKeyPad), this.update(r), k.prototype.finalize.call(this);
				}
			};
			var O = x();
			O.sha256 = O, O.sha224 = x(!0), O.sha256.hmac = N(), O.sha224.hmac = N(!0), h ? i.exports = O : (s.sha256 = O.sha256, s.sha224 = O.sha224, m && define(function() {
				return O;
			}));
		})();
	}))();
	Object.freeze({
		frame: "atlas",
		scale: 1,
		offset: [0, 0]
	});
	function ht(t) {
		return t.shape === "rect" || t.shape === "circle" || (t.shape === "path" || t.shape === "curve") && t.closed === !0;
	}
	function G(t) {
		if (t.shape === "rect") return [
			[t.x, t.y],
			[t.x + t.width, t.y],
			[t.x + t.width, t.y + t.height],
			[t.x, t.y + t.height]
		];
		if (t.shape === "point") return [[t.x, t.y]];
		if (t.shape === "circle") return Array.from({ length: 64 }, (s, d) => [t.x + t.radius * Math.cos(d * Math.PI / 32), t.y + t.radius * Math.sin(d * Math.PI / 32)]);
		if (t.shape === "path") return t.points;
		const i = [], a = t.points.length, u = (s) => t.points[t.closed ? (s + a) % a : Math.max(0, Math.min(a - 1, s))];
		for (let s = 0; s < a - (t.closed ? 0 : 1); s++) {
			const d = u(s - 1), M = u(s), h = u(s + 1), m = u(s + 2);
			for (let n = 0; n < 8; n++) {
				const e = n / 8;
				i.push([0, 1].map((y) => .5 * (2 * M[y] + (-d[y] + h[y]) * e + (2 * d[y] - 5 * M[y] + 4 * h[y] - m[y]) * e * e + (-d[y] + 3 * M[y] - 3 * h[y] + m[y]) * e * e * e)));
			}
		}
		return t.closed || i.push(t.points[a - 1]), i;
	}
	function ot(t, i = 0) {
		let a = Infinity, u = Infinity, s = -Infinity, d = -Infinity;
		for (const [M, h] of t) a = Math.min(a, M), u = Math.min(u, h), s = Math.max(s, M), d = Math.max(d, h);
		return [
			a - i,
			u - i,
			s - a + 2 * i,
			d - u + 2 * i
		];
	}
	function ft(t) {
		return ot(G(t), (t.shape === "path" || t.shape === "curve") && !t.closed ? (t.width || 0) / 2 : 0);
	}
	const ct = {
		unknown: {
			base: "#dbe3ea",
			ink: "#657d8f",
			light: "#f7fafc"
		},
		wood: {
			base: "#cea77d",
			ink: "#896345",
			light: "#edcdaa"
		},
		stone: {
			base: "#c0c9c8",
			ink: "#768c91",
			light: "#f1f2e7"
		},
		tile: {
			base: "#d6dbe5",
			ink: "#96a2b5",
			light: "#f7f7ff"
		},
		carpet: {
			base: "#c59cb4",
			ink: "#8a637b",
			light: "#eacbdf"
		},
		"bed-sheet": {
			base: "#e7dce8",
			ink: "#ab96b0",
			light: "#fff5fa"
		},
		fabric: {
			base: "#cab6d8",
			ink: "#91749f",
			light: "#e9d8f3"
		},
		tatami: {
			base: "#cdd3a8",
			ink: "#8e9762",
			light: "#e7eacd"
		},
		sand: {
			base: "#e4c28b",
			ink: "#ae754d",
			light: "#fff0c7"
		},
		marble: {
			base: "#ecedf4",
			ink: "#a9b4c9",
			light: "#ffffff"
		},
		blood: {
			base: "#c77780",
			ink: "#853d51",
			light: "#efa3a4"
		},
		water: {
			base: "#71bbc9",
			ink: "#397a99",
			light: "#d3eff0"
		},
		grass: {
			base: "#d1dfba",
			ink: "#8da987",
			light: "#eff0d5"
		},
		forest: {
			base: "#73997d",
			ink: "#365e52",
			light: "#bace9e"
		},
		glass: {
			base: "#b9e5e5",
			ink: "#6daeb6",
			light: "#ecffff"
		},
		dirt: {
			base: "#d4bb9c",
			ink: "#a18766",
			light: "#ead7b9"
		},
		snow: {
			base: "#eaf6fc",
			ink: "#9dbecf",
			light: "#ffffff"
		},
		metal: {
			base: "#a8bfd2",
			ink: "#587b98",
			light: "#e0edf8"
		},
		rune: {
			base: "#c4b2ef",
			ink: "#8068bd",
			light: "#ece2ff"
		},
		"warm-light": {
			base: "#ffe0a1",
			ink: "#d6a45b",
			light: "#fff8d8"
		},
		"cold-light": {
			base: "#b6e8ff",
			ink: "#6daecb",
			light: "#edfbff"
		},
		shadow: {
			base: "#9e9bba",
			ink: "#615b83",
			light: "#c8c7df"
		},
		vacuum: {
			base: "#101d32",
			ink: "#182b49",
			light: "#b8d4ed"
		},
		rock: {
			base: "#b5b7a7",
			ink: "#616e68",
			light: "#ebe9d8"
		},
		ice: {
			base: "#c6eaf1",
			ink: "#74b3cd",
			light: "#f0ffff"
		},
		cloud: {
			base: "#d4d9f0",
			ink: "#939fc6",
			light: "#f6f6ff"
		},
		lava: {
			base: "#f5a274",
			ink: "#ba624e",
			light: "#ffdf91"
		}
	};
	function lt(t) {
		let i = 2166136261;
		for (let a = 0; a < t.length; a++) i = Math.imul(i ^ t.charCodeAt(a), 16777619);
		return i >>> 0;
	}
	function P(t, i, a) {
		let u = Math.imul(t, 374761393) + Math.imul(i, 668265263) + a;
		return u = Math.imul(u ^ u >>> 13, 1274126177), ((u ^ u >>> 16) >>> 0) / 4294967295;
	}
	function Z(t, i, a) {
		const u = Math.floor(t), s = Math.floor(i), d = t - u, M = i - s, h = d * d * (3 - 2 * d), m = M * M * (3 - 2 * M), n = P(u, s, a), e = P(u + 1, s, a), y = P(u, s + 1, a), v = P(u + 1, s + 1, a);
		return n + (e - n) * h + (y - n) * m + (n - e - y + v) * h * m;
	}
	function $(t) {
		return Math.min(1, Math.max(0, 2 - 4 * t));
	}
	function V(t, i, a, u = 0) {
		return .5 + Y(t, i, a, u, 1, .55, 0) + Y(t, i, a, u, 2.07, .27, 71) + Y(t, i, a, u, 4.13, .13, 137) + Y(t, i, a, u, 8.23, .05, 211);
	}
	function Y(t, i, a, u, s, d, M) {
		const h = $(s * u);
		return h ? (Z(t * s, i * s, a + M) - .5) * d * h : 0;
	}
	const D = (t) => Math.min(1, Math.max(0, t)), Q = (t) => [
		1,
		3,
		5
	].map((i) => parseInt(t.slice(i, i + 2), 16));
	function ut(t, { level: i, tx: a, ty: u }) {
		const s = 2 ** i, d = 256, M = Math.max(a * d, Math.floor(t[0] / s)), h = Math.max(u * d, Math.floor(t[1] / s)), m = Math.min((a + 1) * d, Math.ceil((t[0] + t[2]) / s)), n = Math.min((u + 1) * d, Math.ceil((t[1] + t[3]) / s));
		return m > M && n > h ? [
			M - 1,
			h - 1,
			m - M + 2,
			n - h + 2
		] : null;
	}
	const j = new Float64Array(18);
	let q = [
		NaN,
		NaN,
		NaN
	];
	function dt(t, i, a) {
		const s = Math.floor(t / 8), d = Math.floor(i / 8);
		if (q[0] !== s || q[1] !== d || q[2] !== a) {
			for (let h = 0; h < 9; h++) {
				const m = s - 1 + h % 3, n = d - 1 + Math.floor(h / 3);
				j[h * 2] = P(m, n, a), j[h * 2 + 1] = P(m, n, a + 53);
			}
			q = [
				s,
				d,
				a
			];
		}
		let M = 0;
		for (let h = d - 1, m = 0; h <= d + 1; h++) for (let n = s - 1; n <= s + 1; n++, m += 2) {
			const e = j[m], y = j[m + 1], v = t - (n + e) * 8, B = i - (h + y) * 8, E = (v * v + B * B) / (3.7 + e * 3.2) ** 2;
			M = Math.max(M, Math.max(0, 1 - E) * (.65 + y * .35));
		}
		return Math.sqrt(M);
	}
	const bt = 256;
	function Mt(t, i) {
		const a = Math.max(i[2], i[3], 9313225746154785e-25) / bt, u = Math.max(1, Math.ceil(i[2] / a)), s = Math.max(1, Math.ceil(i[3] / a)), d = u + 2, M = new Float32Array(d * (s + 2));
		for (let h = 0; h < s; h++) {
			const m = i[1] + (h + .5) * a, n = [];
			for (let e = 0, y = t.length - 1; e < t.length; y = e++) {
				const v = t[e], B = t[y];
				v[1] > m != B[1] > m && n.push((v[0] + (m - v[1]) * (B[0] - v[0]) / (B[1] - v[1]) - i[0]) / a);
			}
			n.sort((e, y) => e - y);
			for (let e = 0; e + 1 < n.length; e += 2) for (let y = Math.max(0, Math.ceil(n[e] - .5)); y < Math.min(u, n[e + 1] - .5); y++) M[(h + 1) * d + y + 1] = Math.min(y + .5 - n[e], n[e + 1] - y - .5, h + .5, s - h - .5);
		}
		for (let h = 1; h <= s; h++) for (let m = 1; m <= u; m++) {
			const n = h * d + m;
			M[n] && (M[n] = Math.min(M[n], M[n - 1] + 1, M[n - d] + 1, M[n - d - 1] + 1.414, M[n - d + 1] + 1.414));
		}
		for (let h = s; h > 0; h--) for (let m = u; m > 0; m--) {
			const n = h * d + m;
			M[n] && (M[n] = Math.min(M[n], M[n + 1] + 1, M[n + d] + 1, M[n + d + 1] + 1.414, M[n + d - 1] + 1.414));
		}
		return {
			bounds: i,
			cell: a,
			width: u,
			height: s,
			field: M,
			points: t
		};
	}
	function mt(t, i, a) {
		let u = !1, s = Infinity;
		for (let d = 0, M = t.length - 1; d < t.length; M = d++) {
			const h = t[d], m = t[M], n = m[0] - h[0], e = m[1] - h[1];
			h[1] > a != m[1] > a && i < h[0] + (a - h[1]) * n / e && (u = !u);
			const y = D(((i - h[0]) * n + (a - h[1]) * e) / (n * n + e * e || 1));
			s = Math.min(s, (i - h[0] - n * y) ** 2 + (a - h[1] - e * y) ** 2);
		}
		return u ? Math.sqrt(s) : 0;
	}
	function tt(t, i, a) {
		const u = Math.min(t.width + 1, Math.max(0, (i - t.bounds[0]) / t.cell + .5)), s = Math.min(t.height + 1, Math.max(0, (a - t.bounds[1]) / t.cell + .5)), d = Math.min(t.width, Math.floor(u)), M = Math.min(t.height, Math.floor(s)), h = u - d, m = s - M, n = t.width + 2, e = t.field, y = M * n + d, v = ((e[y] * (1 - h) + e[y + 1] * h) * (1 - m) + (e[y + n] * (1 - h) + e[y + n + 1] * h) * m) * t.cell;
		if (v >= t.cell * 2.5) return v;
		const B = mt(t.points, i, a);
		return v <= t.cell * 1.5 ? B : B + (v - B) * (v / t.cell - 1.5);
	}
	function pt(t) {
		return t.form === "celestial" ? "planet" : t.form === "nebula" ? "nebula" : t.form === "ridge" ? "ridge" : t.form === "dunes" ? "dunes" : t.form === "forest" || t.material === "forest" ? "forest" : [
			"scattered",
			"compact",
			"blocks",
			"towers"
		].includes(t.form || "") ? "city" : t.material === "vacuum" ? "space" : t.material === "cloud" ? "cloud" : t.material === "water" ? "water" : t.material === "metal" ? "metal" : "plain";
	}
	function yt(t) {
		const i = ft(t.geometry), a = pt(t), u = ct[t.material], s = a === "ridge" || a === "forest" || t.role === "environment", d = ht(t.geometry);
		return {
			feature: t,
			bounds: i,
			kind: a,
			seed: lt(t.id),
			base: Q(u.base),
			light: Q(u.light),
			ink: Q(u.ink),
			softEdge: s,
			envelope: (s || a === "water") && d ? Mt(G(t.geometry), i) : void 0,
			banks: a === "water" && !d ? G(t.geometry) : [],
			reach: Math.max(12, Math.min(i[2], i[3]) * .38),
			fade: Math.min(18, Math.min(i[2], i[3]) * .12)
		};
	}
	function wt(t, i) {
		return t === "city" ? Math.min(3, Math.ceil(i / .75)) : t === "forest" ? Math.min(3, Math.ceil(i / 1.5)) : 1;
	}
	const nt = (t, i, a, u) => Math.abs(t - Math.round(t / i) * i) < Math.max(a, u) / 2 ? Math.min(1, a / u) : 0, H = new Float64Array(5);
	function vt(t, i, a, u) {
		const { feature: s, kind: d, seed: M, bounds: h } = t, m = d === "city" || d === "planet" ? .5 : V(i / 90, a / 90, M, u / 90);
		let n = m, e = (m - .5) * .4, y = 1, v = 1;
		if (d === "ridge") {
			const b = Z(i / 130, a / 130, M) * 2.4, A = 1 - Math.abs(V(i / 62 + b, a / 45, M + 19, u / 45) * 2 - 1);
			n = (t.envelope ? Math.pow(D(tt(t.envelope, i, a) / t.reach), .65) : 1) * (.3 + A * A * .7), e = n * .8 - .2;
		} else if (d === "dunes") {
			const b = V(i / 130, a / 130, M, u / 130) * 5, A = .5 + Math.sin(i / 18 + a / 49 + b) * .5 * $(u / 113);
			n = Math.pow(A, .65) * (.65 + m * .35), e = n * .38 - .1;
		} else if (d === "forest") {
			const b = dt(i, a, M + 32);
			n = b * .7 + m * .3, e = (b - .5) * .6 + (m - .5) * .8;
		} else if (d === "city") {
			const b = s.form === "compact" ? 32 : s.form === "towers" ? 38 : 58, A = Math.floor(i / b), x = Math.floor(a / b), R = i / b - A, U = a / b - x, N = P(A, x, M), k = s.form === "scattered" && N > .36, T = s.form === "towers" ? 1 : N < .5 ? 2 : 3, O = s.form === "towers" ? 1 : N < .3 ? 3 : 2, r = Math.floor(R * T), f = Math.floor(U * O), p = R * T - r, l = U * O - f, w = P(A * 7 + r, x * 7 + f, M + 21), c = .1 + w * .09, _ = R > .07 && U > .07 && R < .93 && U < .93, o = !k && _ && p > c && l > c && p < .87 && l < .86;
			if (n = 0, e = o ? -.06 + w * .28 : .6, !o && _ && p > c + .06 && l > c + .06 && p < .98 && l < .98 && (e = -.32), o) {
				const g = N < .5 ? p : l;
				e += g < .5 ? .08 : -.12, Math.abs(g - .5) < .025 && (e += .15), w > .7 && p > .35 && p < .6 && l > .35 && l < .6 && (e -= .25);
			}
		} else if (d === "water") {
			n = m * .12, e = (m - .5) * .45;
			let b = t.envelope ? tt(t.envelope, i, a) : Infinity;
			if (t.banks.length > 1) {
				let A = Infinity;
				for (let x = 1; x < t.banks.length; x++) {
					const R = t.banks[x - 1], U = t.banks[x], N = U[0] - R[0], k = U[1] - R[1], T = D(((i - R[0]) * N + (a - R[1]) * k) / (N * N + k * k || 1));
					A = Math.min(A, (i - R[0] - N * T) ** 2 + (a - R[1] - k * T) ** 2);
				}
				b = ("width" in s.geometry && s.geometry.width || 1) / 2 - Math.sqrt(A);
			}
			s.role !== "environment" && (e += .38 * (1 - D(b / 9)) - .1);
		} else if (d === "space") n = 0, e = (m - .5) * .18;
		else if (d === "nebula") {
			const b = (i - h[0]) / Math.max(1, h[2]) * 2 - 1, A = (a - h[1]) / Math.max(1, h[3]) * 2 - 1, x = V(i / 70 + m * 3, a / 100, M + 42, u / 70);
			y = D(1 - Math.hypot(b, A)) * D((x - .2) * 2.4), n = 0, e = x * 1.5 - .4;
		} else if (d === "planet") {
			const b = (i - h[0]) / Math.max(1, h[2]) * 2 - 1, A = (a - h[1]) / Math.max(1, h[3]) * 2 - 1, x = Math.sqrt(Math.max(0, 1 - b * b - A * A));
			v = .19 + Math.max(0, -b * .48 - A * .52 + x * .67) * .92, n = 0, e = (V(i / 17, a / 17, M, u / 17) - .5) * .7;
		} else if (d === "cloud") n = m * .3, e = (m - .4) * .65;
		else if (d === "metal") {
			const b = Math.max(nt(i, 64, 1.28, u), nt(a, 40, .96, u));
			n = 0, e = -.35 * b + (m - .5) * .14 * (1 - b);
		} else n = m * .15, s.material === "sand" && (e += (Z(i / 2, a / 2, M) - .5) * .1 * $(u / 2)), (s.material === "lava" || s.material === "rune") && (e += Math.pow(1 - Math.abs(m * 2 - 1), 12) * .8);
		if (t.softEdge && t.envelope) {
			const b = D((tt(t.envelope, i, a) + u / 2) / Math.max(t.fade, u));
			y *= b * b * (3 - 2 * b);
		}
		const B = e >= 0 ? t.light : t.ink, E = D(Math.abs(e));
		for (let b = 0; b < 3; b++) H[b] = (t.base[b] + (B[b] - t.base[b]) * E) * v;
		H[3] = y, H[4] = n;
	}
	function At(t, i) {
		const a = ut(t.bounds, i);
		if (!a) return null;
		const [u, s, d, M] = a, h = 2 ** i.level, m = d + 2, n = wt(t.kind, h), e = h / n, y = new Float32Array(m * (M + 2)), v = new Float32Array(d * M * 4);
		for (let A = -1; A <= M; A++) for (let x = -1; x <= d; x++) {
			const R = x >= 0 && A >= 0 && x < d && A < M;
			let U = 0, N = 0, k = 0, T = 0, O = 0;
			for (let r = 0; r < n; r++) for (let f = 0; f < n; f++) vt(t, (u + x) * h + (f + .5) * e, (s + A) * h + (r + .5) * e, e), U += H[0] * H[3], N += H[1] * H[3], k += H[2] * H[3], T += H[3], O += H[4];
			if (y[(A + 1) * m + x + 1] = O / (n * n), R) {
				const r = (A * d + x) * 4, f = T || 1;
				v[r] = U / f, v[r + 1] = N / f, v[r + 2] = k / f, v[r + 3] = T / (n * n);
			}
		}
		const B = new Uint8ClampedArray(d * M * 4), E = Math.max(.5, h), b = t.kind === "ridge" ? 26 : t.kind === "dunes" ? 18 : t.kind === "forest" ? 1.8 : 0;
		for (let A = 0; A < M; A++) for (let x = 0; x < d; x++) {
			const R = (A + 1) * m + x + 1, U = (A * d + x) * 4;
			let N = 1;
			if (b) {
				const r = (y[R + 1] - y[R - 1]) / (2 * h) * b, f = (y[R + m] - y[R - m]) / (2 * h) * b, p = (.82 + (r + f) * .55) / Math.sqrt(1 + r * r + f * f);
				N = Math.max(.58, Math.min(1.12, .32 + p * .82));
			}
			const k = (u + x + .5) * h, T = (s + A + .5) * h, O = (P(Math.floor(k / E), Math.floor(T / E), t.seed) - .5) * (t.kind === "space" ? 1 : 3);
			for (let r = 0; r < 3; r++) B[U + r] = Math.round(Math.min(255, Math.max(0, v[U + r] + O))) * N;
			B[U + 3] = v[U + 3] * 255;
		}
		return {
			rect: a,
			pixels: B
		};
	}
	const L = /* @__PURE__ */ new Map(), _t = 64;
	function gt(t) {
		let i = L.get(t.surfaceKey);
		return i ? L.delete(t.surfaceKey) : i = yt(t.source), L.set(t.surfaceKey, i), L.size > _t && L.delete(L.keys().next().value), i;
	}
	const xt = Array.from({ length: 256 }, (t, i) => {
		for (let a = 0; a < 8; a++) i = i & 1 ? 3988292384 ^ i >>> 1 : i >>> 1;
		return i >>> 0;
	});
	function kt(t, i) {
		const a = (t * 4 + 1) * i;
		return 63 + a + Math.max(1, Math.ceil(a / 65535)) * 5;
	}
	function St(t, i, a) {
		let u = -1;
		for (let s = i; s < a; s++) u = xt[(u ^ t[s]) & 255] ^ u >>> 8;
		return ~u >>> 0;
	}
	function Et(t, i, a) {
		const u = i * 4 + 1, s = u * a, d = Math.max(1, Math.ceil(s / 65535)), M = 2 + s + d * 5 + 4, h = new Uint8Array(kt(i, a)), m = new DataView(h.buffer);
		h.set([
			137,
			80,
			78,
			71,
			13,
			10,
			26,
			10
		]);
		let n = 8;
		const e = (y, v, B) => {
			m.setUint32(n, v);
			for (let b = 0; b < 4; b++) h[n + 4 + b] = y.charCodeAt(b);
			const E = n + 4;
			n += 8, B(), m.setUint32(n, St(h, E, n)), n += 4;
		};
		return e("IHDR", 13, () => {
			m.setUint32(n, i), m.setUint32(n + 4, a), h.set([
				8,
				6,
				0,
				0,
				0
			], n + 8), n += 13;
		}), e("IDAT", M, () => {
			const y = new Uint8Array(s);
			for (let E = 0; E < a; E++) y.set(t.subarray(E * i * 4, (E + 1) * i * 4), E * u + 1);
			h[n++] = 120, h[n++] = 1;
			for (let E = 0, b = 0; E < d; E++, b += 65535) {
				const A = Math.min(65535, s - b);
				h[n] = E === d - 1 ? 1 : 0, m.setUint16(n + 1, A, !0), m.setUint16(n + 3, ~A & 65535, !0), h.set(y.subarray(b, b + A), n + 5), n += 5 + A;
			}
			let v = 1, B = 0;
			for (let E = 0; E < s;) {
				for (const b = Math.min(s, E + 5552); E < b; E++) v += y[E], B += v;
				v %= 65521, B %= 65521;
			}
			m.setUint32(n, (B << 16 | v) >>> 0), n += 4;
		}), e("IEND", 0, () => {}), h;
	}
	function Bt(t) {
		try {
			const i = At(gt(t), t.tile);
			return i ? {
				id: t.id,
				rect: i.rect,
				blob: new Blob([Et(i.pixels, i.rect[2], i.rect[3])], { type: "image/png" })
			} : { id: t.id };
		} catch (i) {
			return {
				id: t.id,
				error: i instanceof Error ? i.message : String(i)
			};
		}
	}
	self.onmessage = (t) => {
		self.postMessage(Bt(t.data));
	};
})();
