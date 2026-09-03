/* eslint-disable */
import { A as he, D as Bt, M as lt, Q as jt, _ as Ft, a as we, c as Kt, et as qe, g as zt, k as Ht, l as Ie, m as Gt, o as w, x as _e, y as Jt } from "./xiaobai-os-runtime-core.esm-bundler-Dmqi2Zbl.js";
import { o as Vt } from "./xiaobai-os-runtime-dom.esm-bundler-BYy7nd4d.js";
var Wt = "https://api.tavily.com";
function Yt(t = "") {
  return String(t || "").trim();
}
function j(t = "") {
  return String(t || "").trim().replace(/\/+$/, "") || "https://api.tavily.com";
}
var Ea = Object.freeze([
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
function Xt(t = "") {
  return t === "on" || t === "off" ? t : "inherit";
}
function Qt(t) {
  return String(t ?? "").trim().toLowerCase() || void 0;
}
function Zt(t) {
  if (t == null || t === "") return;
  const n = Number(t);
  return Number.isFinite(n) ? Math.floor(n) : void 0;
}
function de(t = {}) {
  const n = t && typeof t == "object" ? t : {}, s = Qt(n.effort), r = Zt(n.budgetTokens);
  return {
    mode: Xt(n.mode),
    ...s ? { effort: s } : {},
    ...r !== void 0 ? { budgetTokens: r } : {}
  };
}
var bt = "openai-compatible", De = "默认", vt = "default", en = "deny", G = 32e3, tn = Object.freeze([{
  value: "default",
  label: "默认权限"
}, {
  value: "full",
  label: "完全权限"
}]), nn = Object.freeze([{
  value: "deny",
  label: "禁止"
}, {
  value: "allow",
  label: "允许"
}]), Ue = {
  "openai-responses": {
    baseUrl: "https://api.openai.com/v1",
    model: "gpt-4.1-mini",
    apiKey: "",
    temperature: 1,
    maxTokens: G,
    sendTemperature: !0
  },
  "openai-compatible": {
    baseUrl: "https://api.openai.com/v1",
    model: "gpt-4o-mini",
    apiKey: "",
    temperature: 1,
    maxTokens: G,
    sendTemperature: !0,
    toolMode: "tagged-json"
  },
  "sillytavern-openai-compatible": {
    baseUrl: "",
    model: "gpt-4o-mini",
    apiKey: "",
    temperature: 1,
    maxTokens: G,
    sendTemperature: !0,
    toolMode: "tagged-json"
  },
  "sillytavern-claude": {
    baseUrl: "",
    model: "claude-sonnet-4-0",
    apiKey: "",
    temperature: 1,
    maxTokens: G,
    sendTemperature: !0
  },
  "sillytavern-google": {
    baseUrl: "",
    model: "gemini-2.5-pro",
    apiKey: "",
    temperature: 1,
    maxTokens: G,
    sendTemperature: !0
  },
  anthropic: {
    baseUrl: "https://api.anthropic.com",
    model: "claude-sonnet-4-0",
    apiKey: "",
    temperature: 1,
    maxTokens: G,
    sendTemperature: !0
  },
  google: {
    baseUrl: "https://generativelanguage.googleapis.com/v1beta",
    model: "gemini-2.5-pro",
    apiKey: "",
    temperature: 1,
    maxTokens: G,
    sendTemperature: !0
  }
};
function yt() {
  return JSON.parse(JSON.stringify(Ue));
}
function _() {
  return {
    provider: bt,
    modelConfigs: yt(),
    permissionMode: vt
  };
}
function xt(t = _()) {
  const n = t && typeof t == "object" ? t : _();
  return {
    provider: $e(n.provider),
    modelConfigs: I(n.modelConfigs || {})
  };
}
function le(t) {
  return t === "full" ? "full" : vt;
}
function Y(t) {
  return t === "allow" ? "allow" : en;
}
function N(t, n = G) {
  const s = Number(t);
  if (!Number.isFinite(s) || s <= 0) {
    const r = Number(n);
    return Number.isFinite(r) && r > 0 ? Math.floor(r) : G;
  }
  return Math.min(Number.MAX_SAFE_INTEGER, Math.floor(s));
}
function P(t) {
  return String(t || "").trim() || "默认";
}
function I(t = {}) {
  const n = yt();
  return Object.keys(Ue).forEach((s) => {
    const r = t && typeof t[s] == "object" ? t[s] : {}, o = Ue[s];
    n[s] = {
      baseUrl: String(r.baseUrl ?? o.baseUrl ?? ""),
      model: String(r.model ?? o.model ?? ""),
      apiKey: String(r.apiKey ?? o.apiKey ?? ""),
      temperature: r.temperature ?? o.temperature,
      maxTokens: N(r.maxTokens, o.maxTokens),
      sendTemperature: typeof r.sendTemperature == "boolean" ? r.sendTemperature : o.sendTemperature,
      ..."toolMode" in o ? { toolMode: String(r.toolMode || o.toolMode || "native") } : {},
      reasoning: de(r.reasoning)
    };
  }), n;
}
function $e(t) {
  return typeof t == "string" && t.trim() ? t : bt;
}
function Be(t = {}, n) {
  return t && typeof t.presets == "object" && t.presets ? t.presets : t?.modelConfigs ? { [n]: {
    provider: t.provider || "openai-compatible",
    modelConfigs: t.modelConfigs,
    permissionMode: t.permissionMode
  } } : {};
}
function an(t = {}, n) {
  const s = {}, r = Be(t, n);
  return Object.entries(r).forEach(([o, d]) => {
    if (!d || typeof d != "object") return;
    const u = P(o);
    s[u] = {
      provider: $e(d.provider),
      modelConfigs: I(d.modelConfigs || {}),
      permissionMode: le(d.permissionMode)
    };
  }), Object.keys(s).length || (s[De] = _()), s;
}
function sn(t, n) {
  const s = P(n);
  return t[s] ? s : Object.keys(t)[0];
}
function rn(t, n, s) {
  const r = P(n || s);
  return t[r] ? r : t[s] ? s : Object.keys(t)[0];
}
function St(t = {}, n = _()) {
  const s = xt(n), r = t && typeof t == "object" ? t : {};
  return {
    provider: $e(r.provider || s.provider),
    modelConfigs: I(r.modelConfigs || s.modelConfigs)
  };
}
function on(t = {}, n = {}, s = De, r = s) {
  if (t?.delegateConfigured === !1) return !1;
  if (r !== s) return !0;
  const o = t?.delegateConfig;
  if (!o || typeof o != "object" || Array.isArray(o) || !(typeof o.provider == "string" && o.provider.trim() || o.modelConfigs && typeof o.modelConfigs == "object" && Object.keys(o.modelConfigs).length)) return !1;
  if (t?.delegateConfigured === !0) return !0;
  const d = n[s] || _(), u = xt(d), m = St(o, d);
  return JSON.stringify(m) !== JSON.stringify(u);
}
function ln(t = {}, n, s, r, o) {
  const d = o(t?.[r]);
  if (d) return d;
  const u = Be(t, n), m = [
    s,
    n,
    t?.currentPresetName,
    t?.delegatePresetName,
    ...Object.keys(u || {})
  ].map(P), f = /* @__PURE__ */ new Set();
  for (const y of m) {
    if (f.has(y)) continue;
    f.add(y);
    const g = o(u?.[y]?.[r]);
    if (g) return g;
  }
  return o(t?.delegateConfig?.[r]);
}
function dn(t = {}, n, s) {
  const r = (m) => String(m || "").trim();
  if (r(t?.tavilyBaseUrl)) return j(t.tavilyBaseUrl);
  const o = Be(t, n), d = [
    s,
    n,
    t?.currentPresetName,
    t?.delegatePresetName,
    ...Object.keys(o || {})
  ].map(P), u = /* @__PURE__ */ new Set();
  for (const m of d) {
    if (u.has(m)) continue;
    u.add(m);
    const f = o?.[m]?.tavilyBaseUrl;
    if (r(f)) return j(f);
  }
  return r(t?.delegateConfig?.tavilyBaseUrl) ? j(t.delegateConfig.tavilyBaseUrl) : Wt;
}
function un(t = {}, n, s) {
  return {
    tavilyApiKey: ln(t, n, s, "tavilyApiKey", Yt),
    tavilyBaseUrl: dn(t, n, s)
  };
}
function Me(t = {}) {
  const n = P(t.currentPresetName || t.presetDraftName || "默认"), s = an(t, n), r = sn(s, t.currentPresetName), o = rn(s, t.delegatePresetName, r), d = s[r] || _(), u = s[o] || d, m = St(t.delegateConfig, u), f = on(t, s, r, o), y = un(t, n, r);
  return {
    workspaceFileName: String(t.workspaceFileName || ""),
    updatedAt: Number(t.updatedAt) || 0,
    jsApiPermission: Y(t.jsApiPermission),
    currentPresetName: r,
    delegatePresetName: o,
    delegateConfig: m,
    delegateConfigured: f,
    presetDraftName: P(t.presetDraftName || r),
    presetNames: Object.keys(s),
    presets: s,
    provider: d.provider,
    modelConfigs: d.modelConfigs,
    permissionMode: le(d.permissionMode),
    tavilyApiKey: y.tavilyApiKey,
    tavilyBaseUrl: y.tavilyBaseUrl
  };
}
async function cn(t, n) {
  const s = t.body?.getReader?.();
  if (!s) throw new Error("host_chat_completions_stream_missing_body");
  const r = new TextDecoder();
  let o = "";
  const d = /\r?\n\r?\n/, u = (f) => {
    const y = f.split(/\r?\n/).filter((g) => g.startsWith("data:")).map((g) => g.slice(5).trimStart()).join(`
`).trim();
    !y || y === "[DONE]" || n(JSON.parse(y));
  };
  for (; ; ) {
    const { done: f, value: y } = await s.read();
    if (f) break;
    for (o += r.decode(y, { stream: !0 }); ; ) {
      const g = o.match(d);
      if (!g || typeof g.index != "number") break;
      const L = o.slice(0, g.index);
      o = o.slice(g.index + g[0].length), u(L);
    }
  }
  const m = o.trim();
  m && u(m);
}
function gn(t = "") {
  return String(t || "").trim().toLowerCase();
}
function pn(t = "") {
  const n = gn(t);
  return n.includes("deepseek") ? "deepseek" : n.includes("kimi") || n.includes("moonshot") ? "kimi" : n.includes("gemini") ? "gemini" : n.includes("claude") ? "claude" : /(?:^|[/_.-])gpt(?:\d|[/_.-]|$)/.test(n) || /(?:^|[/_.-])o\d+(?:[/_.-]|$)/.test(n) ? "openai" : "";
}
var ge = "openai", ht = "claude", Tt = "makersuite", mn = "/api/backends/chat-completions/status", fn = "/api/backends/chat-completions/generate", Pt = Object.freeze({
  [ht]: "https://api.anthropic.com/v1",
  [Tt]: "https://generativelanguage.googleapis.com"
}), ve = null;
function bn(t) {
  return String(t || "").trim().replace(/\/+$/, "");
}
function vn(t, n) {
  const s = bn(t);
  return n === "claude" ? !s || /\/v\d[\w.-]*$/i.test(s) ? s : `${s}/v1` : n === "makersuite" ? s.replace(/\/v\d[\w.-]*$/i, "") : s;
}
async function At(t = ve) {
  if (typeof t != "function") throw new Error("宿主请求头未注册，无法调用酒馆后端。");
  return {
    "Content-Type": "application/json",
    ...await Promise.resolve(t() || {}),
    Accept: "application/json"
  };
}
function yn(t = {}) {
  const n = {};
  return Object.entries(t || {}).forEach(([s, r]) => {
    n[s] = /authorization|cookie|csrf|token|api[-_]?key/i.test(s) ? "[redacted]" : r;
  }), n;
}
async function je(t = {}, n = !1, s = ve) {
  const r = await At(s), o = {
    url: fn,
    method: "POST",
    headers: yn(r),
    body: {
      ...t,
      stream: !!n
    }
  };
  return Object.defineProperty(o, "rawHeaders", {
    value: r,
    enumerable: !1
  }), o;
}
async function xn(t = {}, n = !1) {
  return await je(t, n);
}
function Sn(t = "") {
  return /^\s*(?:<!DOCTYPE\s+html\b|<html\b)/i.test(String(t || ""));
}
function hn(t = "") {
  return /invalid csrf token/i.test(String(t || ""));
}
function Tn() {
  return "酒馆当前页面的 CSRF token 已失效，请按 F5 刷新并重新进入酒馆后再试。";
}
function dt(t = "", n = 10) {
  const s = Number.parseInt(String(t || ""), n);
  return Number.isInteger(s) && s >= 0 && s <= 1114111 ? String.fromCodePoint(s) : "";
}
function ut(t = "") {
  return String(t || "").replace(/&nbsp;|&#160;/gi, " ").replace(/&amp;/gi, "&").replace(/&lt;/gi, "<").replace(/&gt;/gi, ">").replace(/&quot;/gi, '"').replace(/&#39;|&apos;/gi, "'").replace(/&#x([0-9a-f]+);?/gi, (n, s) => dt(s, 16)).replace(/&#([0-9]+);?/g, (n, s) => dt(s));
}
function Pn(t = "") {
  const n = String(t || ""), s = ut((n.match(/<title\b[^>]*>([\s\S]*?)<\/title>/i) || [])[1] || "").replace(/\s+/g, " ").trim(), r = ut(n.replace(/<script\b[\s\S]*?<\/script>/gi, " ").replace(/<style\b[\s\S]*?<\/style>/gi, " ").replace(/<[^>]+>/g, " ")).replace(/\s+/g, " ").trim(), o = s || r;
  return o.length > 240 ? `${o.slice(0, 237)}...` : o;
}
function An(t = null) {
  const n = Number(t?.status), s = String(t?.statusText || "").trim();
  let r = "";
  try {
    r = String(t?.headers?.get?.("content-type") || "").trim();
  } catch {
    r = "";
  }
  return {
    status: Number.isFinite(n) && n > 0 ? n : 0,
    statusText: s,
    contentType: r
  };
}
function En(t = {}) {
  return t.status ? `HTTP ${t.status}${t.statusText ? ` ${t.statusText}` : ""}` : "";
}
function Mn(t = "") {
  const n = String(t || "").trim();
  if (!n || n[0] !== "{" && n[0] !== "[") return "";
  try {
    const s = JSON.parse(n), r = s?.error?.message;
    if (typeof r == "string" && r.trim()) return r.trim();
    if (typeof s?.message == "string" && s.message.trim()) return s.message.trim();
  } catch {
    return "";
  }
  return "";
}
function ue(t = "", n = "", s = null) {
  if (hn(t)) return Tn();
  const r = An(s);
  if (Sn(t) || /\btext\/html\b/i.test(r.contentType)) {
    const o = En(r), d = Pn(t);
    return [
      "酒馆后端返回了非 JSON 的 HTML 页面",
      o ? `（${o}）` : "",
      d ? `：${d}` : ""
    ].join("");
  }
  return Mn(t) || String(t || n || "").trim();
}
function Cn(t = {}, n = ge) {
  const s = vn(t.baseUrl, n), r = String(t.apiKey || "").trim(), o = Pt[n] || "", d = s || (r ? o : ""), u = { chat_completion_source: n || "openai" };
  return d && (u.reverse_proxy = d), r && (u.proxy_password = r), u;
}
function kn(t = {}, n = ge) {
  return Cn(t, n);
}
function Fe(t) {
  const n = t || globalThis.fetch;
  if (typeof n != "function") throw new Error("当前运行环境没有可用的 fetch，无法调用酒馆后端。");
  return n;
}
async function Nn(t = {}, n = ge, s = {}, r = {}) {
  const o = await Fe(r.fetch)(mn, {
    method: "POST",
    headers: await At(r.requestHeadersProvider),
    body: JSON.stringify(kn(t, n)),
    signal: s.signal
  }), d = await o.text();
  let u = null;
  try {
    u = d ? JSON.parse(d) : {};
  } catch (f) {
    throw new Error(`酒馆后端模型列表拉取失败：${ue(d, String(f?.message || f), o)}`);
  }
  if (!o.ok || u?.error) {
    const f = ue(u?.message || u?.error?.message || d, `HTTP ${o.status}`, o);
    throw new Error(`酒馆后端模型列表拉取失败：${f}`);
  }
  const m = Array.isArray(u?.data) ? u.data.map((f) => String(f?.id || f?.name || "").trim()).filter(Boolean) : [];
  return [...new Set(m)];
}
async function Ke(t = {}, n = ge, s = {}) {
  return await Nn(t, n, s, { requestHeadersProvider: ve });
}
async function On(t = {}, n = {}) {
  return await Ke(t, ge, n);
}
async function wn(t = {}, n = {}, s = {}) {
  const r = await je(t, !1, s.requestHeadersProvider);
  typeof n.onRequest == "function" && n.onRequest(r);
  const o = await Fe(s.fetch)(r.url, {
    method: r.method,
    headers: r.rawHeaders || r.headers,
    body: JSON.stringify(r.body),
    signal: n.signal
  }), d = await o.text();
  let u = null;
  try {
    u = d ? JSON.parse(d) : {};
  } catch (m) {
    const f = /* @__PURE__ */ new Error(`酒馆后端生成失败：${ue(d, String(m?.message || m), o)}`);
    throw f.status = o.status, f.body = d, f;
  }
  if (!o.ok || u?.error) {
    const m = ue(u?.error?.message || u?.message || d, `HTTP ${o.status}`, o), f = /* @__PURE__ */ new Error(`酒馆后端生成失败：${m}`);
    throw f.status = o.status, f.error = u?.error, f;
  }
  return u;
}
async function qn(t = {}, n = {}) {
  return await wn(t, n, { requestHeadersProvider: ve });
}
async function In(t = {}, n, s = {}, r = {}) {
  const o = await je(t, !0, r.requestHeadersProvider);
  typeof s.onRequest == "function" && s.onRequest(o);
  const d = await Fe(r.fetch)(o.url, {
    method: o.method,
    headers: o.rawHeaders || o.headers,
    body: JSON.stringify(o.body),
    signal: s.signal
  });
  if (!d.ok) {
    const u = await d.text().catch(() => ""), m = new Error(ue(u, `酒馆后端流式生成失败：HTTP ${d.status}`, d));
    throw m.status = d.status, m.body = u, m;
  }
  typeof s.onResponseAccepted == "function" && s.onResponseAccepted(), await cn(d, (u) => {
    if (u?.error) {
      const m = ue(u.error?.message || u.message || JSON.stringify(u.error), "酒馆后端流式生成失败");
      throw new Error(m);
    }
    n(u);
  });
}
async function _n(t = {}, n, s = {}) {
  return await In(t, n, s, { requestHeadersProvider: ve });
}
var Ma = Object.freeze([
  "buildHostChatCompletionGenerateRequest",
  "createHostChatCompletion",
  "streamHostChatCompletion"
]), Ca = Object.freeze({
  buildHostChatCompletionGenerateRequest: xn,
  fetchHostChatCompletionsModels: Ke,
  fetchHostOpenAICompatibleModels: On,
  createHostChatCompletion: qn,
  streamHostChatCompletion: _n
}), Ln = Object.freeze({
  minimal: "最小",
  low: "低",
  medium: "中",
  high: "高",
  xhigh: "超高",
  max: "最大",
  min: "最小"
});
function Et(t) {
  const n = t.intensity || { kind: "none" };
  return Object.freeze({
    ...t,
    modes: Object.freeze([...t.modes || ["inherit"]]),
    outputModes: Object.freeze([...t.outputModes || ["hide", "show"]]),
    temperatureOmitModes: Object.freeze([...t.temperatureOmitModes || []]),
    intensity: Object.freeze({
      ...n,
      ...Array.isArray(n.values) ? { values: Object.freeze([...n.values]) } : {}
    })
  });
}
function F(t, n, s, r, o = {}) {
  return Et({
    profileId: t,
    modes: n,
    intensity: {
      kind: "effort",
      values: s,
      defaultValue: r
    },
    outputModes: o.outputModes,
    temperatureOmitModes: o.temperatureOmitModes
  });
}
var ze = Et({
  profileId: "unsupported",
  modes: ["inherit"],
  outputModes: ["hide"],
  intensity: { kind: "none" },
  unsupportedReason: "当前 Provider、传输方式与模型组合没有已验证的 Reasoning 控制协议。"
}), ye = Object.freeze(["on"]), He = Object.freeze([
  "inherit",
  "on",
  "off"
]), Mt = F("openai-gpt-5.6", [
  "inherit",
  "on",
  "off"
], [
  "low",
  "medium",
  "high",
  "xhigh",
  "max"
], "medium", { temperatureOmitModes: He }), Rn = F("kimi-k3", [
  "inherit",
  "on",
  "off"
], [
  "low",
  "high",
  "max"
], "max", { temperatureOmitModes: ye }), Un = F("deepseek-thinking", [
  "inherit",
  "on",
  "off"
], [
  "low",
  "high",
  "max"
], "high", { temperatureOmitModes: ye }), Dn = F("openai-compatible-gemini-latest", [
  "inherit",
  "on",
  "off"
], [
  "minimal",
  "low",
  "medium",
  "high"
], "high", { temperatureOmitModes: ye }), $n = F("openai-compatible-claude-latest", [
  "inherit",
  "on",
  "off"
], [
  "low",
  "medium",
  "high",
  "xhigh",
  "max"
], "high", { temperatureOmitModes: ye }), Bn = F("openai-compatible-default", [
  "inherit",
  "on",
  "off"
], [
  "low",
  "medium",
  "high"
], "medium", { temperatureOmitModes: ye }), jn = F("anthropic-adaptive", [
  "inherit",
  "on",
  "off"
], [
  "low",
  "medium",
  "high",
  "xhigh",
  "max"
], "high", { temperatureOmitModes: He }), Fn = F("sillytavern-claude-adaptive", [
  "inherit",
  "on",
  "off"
], [
  "low",
  "medium",
  "high",
  "max"
], "high", { temperatureOmitModes: He }), Kn = F("google-gemini-3-flash", ["inherit", "on"], [
  "minimal",
  "low",
  "medium",
  "high"
], "high"), zn = F("sillytavern-google-3-flash", ["inherit", "on"], [
  "min",
  "low",
  "medium",
  "high"
], "high");
function Hn(t = "") {
  switch (pn(t)) {
    case "deepseek":
      return Un;
    case "kimi":
      return Rn;
    case "gemini":
      return Dn;
    case "claude":
      return $n;
    case "openai":
      return Mt;
    default:
      return Bn;
  }
}
function Ge(t = {}) {
  const n = String(t.provider || "").trim(), s = String(t.model || "").trim().toLowerCase();
  switch (n) {
    case "openai-responses":
      return Mt;
    case "openai-compatible":
    case "sillytavern-openai-compatible":
      return Hn(s);
    case "anthropic":
      return jn;
    case "sillytavern-claude":
      return Fn;
    case "google":
      return Kn;
    case "sillytavern-google":
      return zn;
    default:
      return ze;
  }
}
function Gn(t = ze) {
  const n = new Set(t.modes || ["inherit"]);
  return [
    {
      value: "inherit",
      label: "跟随模型默认",
      disabled: !1
    },
    {
      value: "on",
      label: "开启",
      disabled: !n.has("on")
    },
    {
      value: "off",
      label: "关闭",
      disabled: !n.has("off")
    }
  ];
}
function Jn(t = ze) {
  return t.intensity?.kind !== "effort" ? [] : t.intensity.values.map((n) => ({
    value: n,
    label: Ln[n] || n
  }));
}
function Le(t, n, s, r = "REASONING_CAPABILITY_UNSUPPORTED") {
  return {
    ...t,
    profileId: n.profileId,
    valid: !1,
    error: s,
    code: r
  };
}
function Vn(t, n) {
  const s = { ...t };
  return delete s.effort, delete s.budgetTokens, n.intensity?.kind === "effort" ? {
    ...s,
    ...t.effort ? { effort: t.effort } : {}
  } : s;
}
function Te(t = {}, n = {}) {
  const s = Ge(t), r = de(n), o = n?.output === "show" || n?.output === "hide" ? n.output : null, d = Vn({
    ...r,
    output: r.mode === "off" ? "hide" : o || (s.outputModes.includes("show") ? "show" : "hide")
  }, s);
  if (!s.outputModes.includes(d.output)) return Le(d, s, "当前任务要求返回 Reasoning 内容，但所选模型不支持。");
  if (!s.modes.includes(d.mode)) return Le(d, s, d.mode === "off" ? "当前模型不支持显式关闭 Reasoning。请选择“跟随模型默认”。" : s.unsupportedReason || "当前模型不支持显式开启 Reasoning。");
  if (d.mode !== "on") return {
    ...d,
    profileId: s.profileId,
    valid: !0
  };
  if (s.intensity.kind === "effort") {
    const u = d.effort || s.intensity.defaultValue;
    return s.intensity.values.includes(u) ? {
      ...d,
      effort: u,
      profileId: s.profileId,
      valid: !0
    } : Le(d, s, `当前模型不支持 Reasoning 强度“${u}”。`, "REASONING_CONFIG_INVALID");
  }
  return {
    ...d,
    profileId: s.profileId,
    valid: !0
  };
}
var ct = 900 * 1e3, gt = Object.freeze([{
  value: "native",
  label: "原生 Tool Calling"
}, {
  value: "tagged-json",
  label: "Tagged JSON 兼容模式"
}]), Wn = Object.freeze([
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
function U(t, n = 1) {
  const s = typeof t == "string" && !t.trim() ? n : t, r = Number(s);
  return Number.isFinite(r) ? Math.max(0, Math.min(2, r)) : U(n, 1);
}
function Re(t = {}) {
  return t.sendTemperature !== !1;
}
function pt(t = "", n = {}) {
  return n && typeof n == "object" && n[t] ? n[t] : Wn.find((s) => s.value === t)?.label || t || "未配置";
}
var Yn = { chat: { exclude: [
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
] } }, Xn = Object.freeze([
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
function B(t, n, s = "") {
  if (t.replaceChildren(), s) {
    const r = document.createElement("option");
    r.value = "", r.textContent = s, t.appendChild(r);
  }
  n.forEach((r) => {
    const o = document.createElement("option");
    o.value = r.value, o.textContent = r.label, o.disabled = r.disabled === !0, t.appendChild(o);
  });
}
function Pe(t = "", n = {}) {
  const s = de(n.reasoning), r = Ge({
    provider: t,
    baseUrl: n.baseUrl,
    model: n.model
  }), o = {
    reasoningMode: s.mode,
    reasoningEffort: "",
    reasoningBudgetTokens: void 0
  };
  if (r.intensity.kind === "effort") o.reasoningEffort = r.intensity.values.includes(s.effort) ? s.effort : r.intensity.defaultValue;
  else if (r.intensity.kind === "budget") {
    const d = s.budgetTokens, u = r.intensity.allowAuto && d === -1, m = Number.isInteger(d) && d >= r.intensity.min && d <= r.intensity.max;
    o.reasoningBudgetTokens = u || m ? d : r.intensity.defaultValue;
  }
  return o;
}
function mt(t = {}) {
  return de(t);
}
function fe(t = []) {
  const n = [...new Set(t.filter(Boolean).map((o) => String(o).trim()).filter(Boolean))], s = Yn.chat, r = n.filter((o) => {
    const d = o.toLowerCase();
    return !s.exclude.some((u) => d.includes(u));
  });
  return r.length ? r : n;
}
function Ae(t = "") {
  return t === "delegate" ? "delegate" : "main";
}
function ce(t) {
  return String(t || "").trim().replace(/\/+$/, "");
}
function Qn(t = "") {
  return t === "sillytavern-openai-compatible" || t === "sillytavern-claude" || t === "sillytavern-google";
}
function oe(t = "") {
  return t === "openai-compatible" || t === "sillytavern-openai-compatible";
}
function Zn(t = "") {
  return t === "anthropic" || t === "sillytavern-claude";
}
function ea(t = "") {
  return t === "sillytavern-claude" ? ht : t === "sillytavern-google" ? Tt : ge;
}
function be(t = []) {
  return [...new Set(t.filter(Boolean).map((n) => String(n).trim()).filter(Boolean))];
}
function ta(t) {
  const n = ce(t);
  if (!n) return [];
  if (n.endsWith("/v1")) {
    const s = n.slice(0, -3);
    return be([
      `${n}/models`,
      `${s}/v1/models`,
      `${s}/models`
    ]);
  }
  return be([`${n}/v1/models`, `${n}/models`]);
}
function Ct(t) {
  const n = ce(t);
  if (!n) return [];
  if (n.endsWith("/v1")) {
    const s = n.slice(0, -3);
    return be([
      `${n}/models`,
      `${s}/v1/models`,
      `${s}/models`
    ]);
  }
  return be([`${n}/v1/models`, `${n}/models`]);
}
function na(t, n) {
  const s = ce(t);
  if (!s) return [];
  const r = s.endsWith("/v1beta") ? s.slice(0, -7) : s;
  return be([
    `${s}/models?key=${encodeURIComponent(n)}`,
    `${s}/models`,
    `${r}/v1beta/models?key=${encodeURIComponent(n)}`,
    `${r}/v1beta/models`,
    `${r}/models?key=${encodeURIComponent(n)}`,
    `${r}/models`
  ]);
}
function aa(t, n) {
  const s = [
    t?.error?.message,
    t?.message,
    t?.detail,
    t?.details,
    t?.error
  ].find((r) => typeof r == "string" && r.trim());
  return s ? s.trim() : String(n || "").trim().slice(0, 160);
}
async function sa(t, n = {}) {
  const s = await fetch(t, n), r = await s.text();
  let o = null, d = null;
  try {
    o = r ? JSON.parse(r) : {};
  } catch (u) {
    d = u;
  }
  return {
    ok: s.ok,
    status: s.status,
    url: t,
    data: o,
    rawText: r,
    parseError: d,
    errorSnippet: aa(o, r)
  };
}
function ra(t) {
  return fe((t?.data || []).map((n) => String(n?.id || "").trim()).filter(Boolean));
}
function kt(t) {
  return fe((t?.data || []).map((n) => String(n?.id || "").trim()).filter(Boolean));
}
function ia(t) {
  return fe((t?.models || t?.data || []).map((n) => String(n?.id || n?.name || "")).map((n) => n.split("/").pop() || "").filter(Boolean));
}
async function Ee({ urls: t, requestOptionsList: n, extractModels: s, providerLabel: r }) {
  let o = null;
  for (const d of t) for (const u of n) {
    const m = await sa(d, u);
    if (!m.ok) {
      o = m;
      continue;
    }
    if (m.parseError) {
      o = {
        ...m,
        errorSnippet: "返回的不是 JSON"
      };
      continue;
    }
    const f = s(m.data);
    if (f.length) return f;
    o = {
      ...m,
      errorSnippet: "返回成功，但模型列表为空"
    };
  }
  if (o) {
    const d = o.url ? ` (${o.url})` : "", u = o.errorSnippet ? `：${o.errorSnippet}` : "";
    throw new Error(`${r} 拉取模型失败：${o.status || "unknown"}${u}${d}`);
  }
  throw new Error(`${r} 拉取模型失败：未获取到模型列表。`);
}
async function oa(t, n = {}) {
  const s = String(t.apiKey || "").trim(), r = ce(t.baseUrl || ""), o = ce(r || Pt.claude);
  if (s && o) try {
    return await Ee({
      urls: Ct(o),
      requestOptionsList: [{
        headers: {
          "x-api-key": s,
          "anthropic-version": "2023-06-01",
          Accept: "application/json"
        },
        signal: n.signal
      }],
      extractModels: kt,
      providerLabel: "Anthropic"
    });
  } catch (d) {
    if (r) throw d;
  }
  return [...Xn];
}
async function la(t, n = {}) {
  const s = t.provider, r = ce(t.baseUrl || ""), o = String(t.apiKey || "").trim();
  if (s === "sillytavern-claude") return fe(await oa(t, n));
  if (Qn(s)) return fe(await Ke(t, ea(s), { signal: n.signal }));
  if (!o) throw new Error("请先填写 API Key。");
  if (!r) throw new Error("请先填写 Base URL。");
  return s === "google" ? await Ee({
    urls: na(r, o),
    requestOptionsList: [
      {
        headers: {
          Accept: "application/json",
          "x-goog-api-key": o
        },
        signal: n.signal
      },
      {
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${o}`
        },
        signal: n.signal
      },
      {
        headers: { Accept: "application/json" },
        signal: n.signal
      }
    ],
    extractModels: ia,
    providerLabel: "Google AI"
  }) : Zn(s) ? await Ee({
    urls: Ct(r),
    requestOptionsList: [{
      headers: {
        "x-api-key": o,
        "anthropic-version": "2023-06-01",
        Accept: "application/json"
      },
      signal: n.signal
    }],
    extractModels: kt,
    providerLabel: "Anthropic"
  }) : await Ee({
    urls: ta(r),
    requestOptionsList: [{
      headers: {
        Authorization: `Bearer ${o}`,
        Accept: "application/json"
      },
      signal: n.signal
    }],
    extractModels: ra,
    providerLabel: s === "openai-responses" ? "OpenAI Responses" : "OpenAI-Compatible"
  });
}
function da(t) {
  return t instanceof Error ? t.message : String(t || "unknown_error");
}
function ua(t = {}) {
  const { state: n, render: s, showToast: r, createRequestId: o = (e = "req") => `${e}-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`, saveConfig: d, reloadConfig: u, pullModels: m = la, describeError: f = da, getRuntimeSummaryText: y } = t;
  function g() {
    n.configFormSyncPending = !0;
  }
  function L(e, i = "main") {
    const a = String(e || "").trim() || "openai-compatible";
    return i === "delegate" ? `delegate:${a}` : a;
  }
  function X(e, i = "main") {
    return n.pullStateByProvider?.[L(e, i)] || {
      status: "idle",
      message: ""
    };
  }
  function R(e, i, a = "main") {
    n.pullStateByProvider = {
      ...n.pullStateByProvider || {},
      [L(e, a)]: i
    };
  }
  function O(e, i, a = "main") {
    n.modelOptionsByProvider = {
      ...n.modelOptionsByProvider || {},
      [L(e, a)]: Array.isArray(i) ? i : []
    };
  }
  function D(e, i = "main") {
    const a = L(e, i);
    return Array.isArray(n.modelOptionsByProvider?.[a]) ? n.modelOptionsByProvider[a] : [];
  }
  function q(e, i) {
    const a = n.config?.presets || {}, l = P(e || i || "默认");
    return a[l] ? l : i && a[i] ? i : Object.keys(a)[0] || "默认";
  }
  function K(e, i) {
    const a = q(e, De), l = i && typeof i == "object" ? i : _(), p = l.provider || "openai-compatible", S = I(l.modelConfigs || {}), b = S[p] || {}, A = Pe(p, b);
    return {
      delegatePresetName: a,
      delegateProvider: p,
      delegateModelConfigs: S,
      delegateBaseUrl: String(b.baseUrl || ""),
      delegateModel: String(b.model || ""),
      delegateApiKey: String(b.apiKey || ""),
      delegateTemperature: U(b.temperature, 1),
      delegateMaxTokens: N(b.maxTokens),
      delegateSendTemperature: Re(b),
      delegateReasoningMode: A.reasoningMode,
      delegateReasoningEffort: A.reasoningEffort,
      delegateReasoningBudgetTokens: A.reasoningBudgetTokens,
      delegateToolMode: b.toolMode || "native"
    };
  }
  function ee(e = "openai-compatible", i = {}) {
    const a = I(i || {})[e] || {}, l = Pe(e, a);
    return {
      baseUrl: String(a.baseUrl || ""),
      model: String(a.model || ""),
      apiKey: String(a.apiKey || ""),
      temperature: U(a.temperature, 1),
      maxTokens: N(a.maxTokens),
      sendTemperature: Re(a),
      ...l,
      toolMode: a.toolMode || "native"
    };
  }
  function J(e = "openai-compatible", i = {}) {
    const a = I(i || {})[e] || {}, l = Pe(e, a);
    return {
      delegateBaseUrl: String(a.baseUrl || ""),
      delegateModel: String(a.model || ""),
      delegateApiKey: String(a.apiKey || ""),
      delegateTemperature: U(a.temperature, 1),
      delegateMaxTokens: N(a.maxTokens),
      delegateSendTemperature: Re(a),
      delegateReasoningMode: l.reasoningMode,
      delegateReasoningEffort: l.reasoningEffort,
      delegateReasoningBudgetTokens: l.reasoningBudgetTokens,
      delegateToolMode: a.toolMode || "native"
    };
  }
  function C(e, i, a = n.config) {
    const l = P(e || "默认"), p = i && typeof i == "object" ? i : _(), S = p.provider || "openai-compatible", b = I(p.modelConfigs || {}), A = ee(S, b), E = q(a?.delegatePresetName, l), T = K(E, a?.delegateConfig && typeof a.delegateConfig == "object" ? a.delegateConfig : (a?.presets || {})[E] || p);
    return {
      currentPresetName: l,
      presetDraftName: l,
      provider: S,
      modelConfigs: b,
      ...A,
      tavilyApiKey: String(a?.tavilyApiKey || ""),
      tavilyBaseUrl: j(a?.tavilyBaseUrl || "https://api.tavily.com"),
      permissionMode: le(p.permissionMode),
      jsApiPermission: Y(a?.jsApiPermission),
      ...T
    };
  }
  function v() {
    if (n.configDraft) return n.configDraft;
    const e = P(n.config?.currentPresetName || "默认");
    return n.configDraft = C(e, (n.config?.presets || {})[e] || _()), n.configDraft;
  }
  function te(e, i = {}) {
    const a = v(), l = i.provider || e.querySelector("#xb-assistant-provider")?.value || a.provider || "openai-compatible", p = i.delegateProvider || e.querySelector("#xb-assistant-delegate-provider")?.value || a.delegateProvider || "openai-compatible", S = e.querySelector("#xb-assistant-base-url")?.value.trim() || "", b = e.querySelector("#xb-assistant-model")?.value.trim() || "", A = e.querySelector("#xb-assistant-delegate-base-url")?.value.trim() ?? a.delegateBaseUrl ?? "", E = e.querySelector("#xb-assistant-delegate-model")?.value.trim() ?? a.delegateModel ?? "", T = mt({
      mode: e.querySelector("#xb-assistant-reasoning-mode")?.value || a.reasoningMode,
      effort: e.querySelector("#xb-assistant-reasoning-effort")?.value || a.reasoningEffort,
      budgetTokens: e.querySelector("#xb-assistant-reasoning-budget")?.value ?? a.reasoningBudgetTokens
    }), V = mt({
      mode: e.querySelector("#xb-assistant-delegate-reasoning-mode")?.value || a.delegateReasoningMode,
      effort: e.querySelector("#xb-assistant-delegate-reasoning-effort")?.value || a.delegateReasoningEffort,
      budgetTokens: e.querySelector("#xb-assistant-delegate-reasoning-budget")?.value ?? a.delegateReasoningBudgetTokens
    }), M = {
      baseUrl: S,
      model: b,
      apiKey: e.querySelector("#xb-assistant-api-key")?.value.trim() || "",
      temperature: U(e.querySelector("#xb-assistant-temperature")?.value, a.temperature ?? 1),
      maxTokens: N(e.querySelector("#xb-assistant-max-tokens")?.value, a.maxTokens),
      sendTemperature: e.querySelector("#xb-assistant-send-temperature")?.checked ?? !!(a.sendTemperature ?? !0),
      reasoning: T,
      toolMode: oe(l) ? e.querySelector("#xb-assistant-tool-mode")?.value || a.toolMode || "native" : void 0
    }, k = {
      baseUrl: A,
      model: E,
      apiKey: e.querySelector("#xb-assistant-delegate-api-key")?.value.trim() ?? a.delegateApiKey ?? "",
      temperature: U(e.querySelector("#xb-assistant-delegate-temperature")?.value, a.delegateTemperature ?? 1),
      maxTokens: N(e.querySelector("#xb-assistant-delegate-max-tokens")?.value, a.delegateMaxTokens),
      sendTemperature: e.querySelector("#xb-assistant-delegate-send-temperature")?.checked ?? !!(a.delegateSendTemperature ?? !0),
      reasoning: V,
      toolMode: oe(p) ? e.querySelector("#xb-assistant-delegate-tool-mode")?.value || a.delegateToolMode || "native" : void 0
    }, Q = {
      ...I(a.modelConfigs || {}),
      [l]: {
        ...I(a.modelConfigs || {})[l] || {},
        ...M
      }
    }, H = {
      ...I(a.delegateModelConfigs || {}),
      [p]: {
        ...I(a.delegateModelConfigs || {})[p] || {},
        ...k
      }
    };
    return {
      ...a,
      currentPresetName: a.currentPresetName,
      presetDraftName: P(e.querySelector("#xb-assistant-preset-name")?.value),
      provider: l,
      modelConfigs: Q,
      baseUrl: M.baseUrl,
      model: M.model,
      apiKey: M.apiKey,
      temperature: M.temperature,
      maxTokens: M.maxTokens,
      sendTemperature: M.sendTemperature,
      reasoningMode: M.reasoning.mode,
      reasoningEffort: M.reasoning.effort || "",
      reasoningBudgetTokens: M.reasoning.budgetTokens,
      toolMode: M.toolMode || a.toolMode || "native",
      tavilyApiKey: e.querySelector("#xb-assistant-tavily-api-key")?.value.trim() ?? a.tavilyApiKey ?? "",
      tavilyBaseUrl: j(a.tavilyBaseUrl || "https://api.tavily.com"),
      permissionMode: le(e.querySelector("#xb-assistant-permission-mode")?.value || a.permissionMode),
      jsApiPermission: Y(e.querySelector("#xb-assistant-jsapi-permission")?.value || a.jsApiPermission),
      delegatePresetName: q(e.querySelector("#xb-assistant-delegate-preset-select")?.value || a.delegatePresetName, a.currentPresetName),
      delegateProvider: p,
      delegateModelConfigs: H,
      delegateBaseUrl: k.baseUrl,
      delegateModel: k.model,
      delegateApiKey: k.apiKey,
      delegateTemperature: k.temperature,
      delegateMaxTokens: k.maxTokens,
      delegateSendTemperature: k.sendTemperature,
      delegateReasoningMode: k.reasoning.mode,
      delegateReasoningEffort: k.reasoning.effort || "",
      delegateReasoningBudgetTokens: k.reasoning.budgetTokens,
      delegateToolMode: k.toolMode || a.delegateToolMode || "native"
    };
  }
  function c(e, i = {}) {
    return n.configDraft = te(e, i), n.configDirty = !0, n.configDraft;
  }
  function x(e = v()) {
    return {
      baseUrl: String(e.baseUrl || ""),
      model: String(e.model || ""),
      apiKey: String(e.apiKey || ""),
      temperature: U(e.temperature, 1),
      maxTokens: N(e.maxTokens),
      sendTemperature: !!(e.sendTemperature ?? !0),
      reasoning: de({
        mode: e.reasoningMode,
        effort: e.reasoningEffort,
        budgetTokens: e.reasoningBudgetTokens
      }),
      toolMode: oe(e.provider) ? e.toolMode || "native" : void 0
    };
  }
  function h(e = v()) {
    return {
      baseUrl: String(e.delegateBaseUrl || ""),
      model: String(e.delegateModel || ""),
      apiKey: String(e.delegateApiKey || ""),
      temperature: U(e.delegateTemperature, 1),
      maxTokens: N(e.delegateMaxTokens),
      sendTemperature: !!(e.delegateSendTemperature ?? !0),
      reasoning: de({
        mode: e.delegateReasoningMode,
        effort: e.delegateReasoningEffort,
        budgetTokens: e.delegateReasoningBudgetTokens
      }),
      toolMode: oe(e.delegateProvider) ? e.delegateToolMode || "native" : void 0
    };
  }
  function ne(e = v()) {
    const i = e.delegateProvider || "openai-compatible", a = I(e.delegateModelConfigs || {});
    return {
      provider: i,
      modelConfigs: {
        ...a,
        [i]: {
          ...a[i] || {},
          ...h(e)
        }
      }
    };
  }
  function Nt(e = v()) {
    return {
      provider: e.provider || "openai-compatible",
      baseUrl: e.baseUrl || "",
      model: e.model || "",
      apiKey: e.apiKey || "",
      tavilyApiKey: e.tavilyApiKey || "",
      tavilyBaseUrl: j(e.tavilyBaseUrl || "https://api.tavily.com"),
      temperature: e.sendTemperature === !1 ? void 0 : U(e.temperature, 1),
      sendTemperature: !!(e.sendTemperature ?? !0),
      maxTokens: N(e.maxTokens),
      timeoutMs: ct,
      toolMode: e.toolMode || "native",
      reasoning: Te({
        provider: e.provider,
        baseUrl: e.baseUrl,
        model: e.model,
        maxTokens: N(e.maxTokens)
      }, {
        mode: e.reasoningMode,
        effort: e.reasoningEffort,
        budgetTokens: e.reasoningBudgetTokens
      })
    };
  }
  function Ot(e = v()) {
    return {
      provider: e.delegateProvider || "openai-compatible",
      baseUrl: e.delegateBaseUrl || "",
      model: e.delegateModel || "",
      apiKey: e.delegateApiKey || "",
      tavilyApiKey: e.tavilyApiKey || "",
      tavilyBaseUrl: j(e.tavilyBaseUrl || "https://api.tavily.com"),
      temperature: e.delegateSendTemperature === !1 ? void 0 : U(e.delegateTemperature, 1),
      sendTemperature: !!(e.delegateSendTemperature ?? !0),
      maxTokens: N(e.delegateMaxTokens),
      timeoutMs: ct,
      toolMode: e.delegateToolMode || "native",
      reasoning: Te({
        provider: e.delegateProvider,
        baseUrl: e.delegateBaseUrl,
        model: e.delegateModel,
        maxTokens: N(e.delegateMaxTokens)
      }, {
        mode: e.delegateReasoningMode,
        effort: e.delegateReasoningEffort,
        budgetTokens: e.delegateReasoningBudgetTokens
      })
    };
  }
  function wt(e = {}) {
    const i = [];
    Object.entries(e.presets || {}).forEach(([S, b]) => {
      const A = b?.provider || "openai-compatible", E = b?.modelConfigs?.[A] || {}, T = Te({
        provider: A,
        baseUrl: E.baseUrl,
        model: E.model,
        maxTokens: N(E.maxTokens)
      }, E.reasoning);
      T.valid === !1 && i.push(`预设“${S}”：${T.error}`);
    });
    const a = e.delegateConfig?.provider || "openai-compatible", l = e.delegateConfig?.modelConfigs?.[a] || {}, p = Te({
      provider: a,
      baseUrl: l.baseUrl,
      model: l.model,
      maxTokens: N(l.maxTokens)
    }, l.reasoning);
    return p.valid === !1 && i.push(`分身模型：${p.error}`), i;
  }
  function xe(e = {}) {
    const i = (e.role === "delegate", v());
    return e.role === "delegate" ? Ot(i) : Nt(i);
  }
  function qt(e) {
    v(), n.configDraft = {
      ...n.configDraft,
      presetDraftName: P(e.querySelector("#xb-assistant-preset-name")?.value)
    };
  }
  function It(e = v(), i = e.provider || "openai-compatible", a = "main") {
    const l = X(i, a);
    return typeof y == "function" ? y({
      state: n,
      draft: e,
      provider: i,
      pullState: l,
      providerLabel: pt(i)
    }) : `预设「${e.currentPresetName || "默认"}」 · ${pt(i)}`;
  }
  function Je(e, i, a) {
    const l = e?.querySelector?.(i);
    if (!l) return;
    const p = String(a?.status || "idle"), S = String(a?.message || "").trim();
    l.textContent = S, l.hidden = !S, l.classList.toggle("is-loading", p === "loading"), l.classList.toggle("is-success", p === "success"), l.classList.toggle("is-error", p === "error");
  }
  function Ve(e) {
    if (!e) return;
    const i = Ae(n.configPage);
    n.configPage = i, e.querySelectorAll("[data-config-page]").forEach((a) => {
      const l = Ae(a?.dataset?.configPage) === i;
      a.classList.toggle("is-active", l), a.setAttribute("aria-selected", l ? "true" : "false");
    }), e.querySelectorAll("[data-config-page-panel]").forEach((a) => {
      const l = Ae(a?.dataset?.configPagePanel) === i;
      a.toggleAttribute("hidden", !l);
    }), e.querySelector("#xb-assistant-delete-preset")?.toggleAttribute("hidden", i === "delegate");
  }
  function $(e, i = "main") {
    const a = v(), l = i === "delegate", p = l ? "#xb-assistant-delegate-reasoning" : "#xb-assistant-reasoning", S = l ? a.delegateProvider : a.provider, b = l ? a.delegateBaseUrl : a.baseUrl, A = l ? a.delegateModel : a.model, E = {
      mode: l ? a.delegateReasoningMode : a.reasoningMode,
      effort: l ? a.delegateReasoningEffort : a.reasoningEffort,
      budgetTokens: l ? a.delegateReasoningBudgetTokens : a.reasoningBudgetTokens
    }, T = Ge({
      provider: S,
      baseUrl: b,
      model: A
    }), V = Pe(S, {
      baseUrl: b,
      model: A,
      reasoning: E
    }), M = V.reasoningMode, k = V.reasoningEffort, Q = V.reasoningBudgetTokens, H = e.querySelector(`${p}-mode`), ae = e.querySelector(`${p}-capability`), se = e.querySelector(`${p}-effort-wrap`), re = e.querySelector(`${p}-effort`), ie = e.querySelector(`${p}-budget-wrap`), Z = e.querySelector(`${p}-budget`);
    H && (B(H, Gn(T)), H.value = M), ae && (ae.textContent = T.unsupportedReason || `能力配置：${T.profileId}`), re && (B(re, Jn(T)), re.value = k), se && (se.style.display = M === "on" && T.intensity.kind === "effort" ? "" : "none"), Z && T.intensity.kind === "budget" && (Z.min = T.intensity.allowAuto ? "-1" : String(T.intensity.min), Z.max = String(T.intensity.max), Z.value = String(Q)), ie && (ie.style.display = M === "on" && T.intensity.kind === "budget" ? "" : "none");
  }
  function z(e) {
    const i = e.querySelector("#xb-assistant-runtime");
    if (!i) return;
    const a = v(), l = n.configPage === "delegate", p = l ? a.delegateProvider : a.provider;
    i.textContent = It(l ? {
      ...a,
      currentPresetName: "分身",
      provider: p
    } : a, p || "openai-compatible", l ? "delegate" : "main");
  }
  function We(e) {
    if (!n.config) return;
    Ve(e);
    const i = v(), a = i.provider || "openai-compatible", l = D(a), p = i.delegateProvider || "openai-compatible", S = D(p, "delegate"), b = e.querySelector("#xb-assistant-provider"), A = e.querySelector("#xb-assistant-base-url"), E = e.querySelector("#xb-assistant-model"), T = e.querySelector("#xb-assistant-api-key"), V = e.querySelector("#xb-assistant-temperature"), M = e.querySelector("#xb-assistant-send-temperature"), k = e.querySelector("#xb-assistant-tool-mode-wrap"), Q = e.querySelector("#xb-assistant-tool-mode"), H = e.querySelector("#xb-assistant-permission-mode"), ae = e.querySelector("#xb-assistant-jsapi-permission"), se = e.querySelector("#xb-assistant-model-pulled"), re = e.querySelector("#xb-assistant-max-tokens"), ie = e.querySelector("#xb-assistant-preset-select"), Z = e.querySelector("#xb-assistant-preset-name"), ke = e.querySelector("#xb-assistant-delegate-preset-select"), Qe = e.querySelector("#xb-assistant-delegate-provider"), Ze = e.querySelector("#xb-assistant-delegate-base-url"), et = e.querySelector("#xb-assistant-delegate-model"), tt = e.querySelector("#xb-assistant-delegate-api-key"), nt = e.querySelector("#xb-assistant-tavily-api-key"), Ne = e.querySelector("#xb-assistant-delegate-model-pulled"), at = e.querySelector("#xb-assistant-delegate-max-tokens"), st = e.querySelector("#xb-assistant-delegate-tool-mode-wrap"), Oe = e.querySelector("#xb-assistant-delegate-tool-mode");
    if (!ie || !Z) return;
    const rt = (n.config.presetNames || []).map((W) => ({
      value: W,
      label: W
    }));
    B(ie, rt), ie.value = i.currentPresetName || n.config.currentPresetName || "默认", ke && (B(ke, rt), ke.value = q(i.delegatePresetName, i.currentPresetName)), Z.value = i.presetDraftName || i.currentPresetName || "默认", b && (b.value = a), A && (A.value = i.baseUrl || ""), E && (E.value = i.model || ""), T && (T.value = i.apiKey || ""), re && (re.value = String(N(i.maxTokens))), V && (V.value = String(U(i.temperature, 1))), M && (M.checked = !!(i.sendTemperature ?? !0)), nt && (nt.value = i.tavilyApiKey || ""), k && (k.style.display = oe(a) ? "" : "none"), Q && (B(Q, gt), Q.value = i.toolMode || "native"), H && (B(H, tn), H.value = le(i.permissionMode)), ae && (B(ae, nn), ae.value = Y(i.jsApiPermission)), $(e), se && (B(se, l.map((W) => ({
      value: W,
      label: W
    })), "手动填写"), se.value = l.includes(i.model) ? i.model : ""), Qe && (Qe.value = p), Ze && (Ze.value = i.delegateBaseUrl || ""), et && (et.value = i.delegateModel || ""), tt && (tt.value = i.delegateApiKey || "");
    const it = e.querySelector("#xb-assistant-delegate-temperature"), ot = e.querySelector("#xb-assistant-delegate-send-temperature");
    at && (at.value = String(N(i.delegateMaxTokens))), it && (it.value = String(U(i.delegateTemperature, 1))), ot && (ot.checked = !!(i.delegateSendTemperature ?? !0)), st && (st.style.display = oe(p) ? "" : "none"), Oe && (B(Oe, gt), Oe.value = i.delegateToolMode || "native"), $(e, "delegate"), Ne && (B(Ne, S.map((W) => ({
      value: W,
      label: W
    })), "手动填写"), Ne.value = S.includes(i.delegateModel) ? i.delegateModel : ""), Je(e, "#xb-assistant-model-pull-status", X(a)), Je(e, "#xb-assistant-delegate-model-pull-status", X(p, "delegate")), z(e);
  }
  function _t(e) {
    if (typeof d != "function") return;
    const i = d(e);
    i && typeof i.catch == "function" && i.catch((a) => {
      r?.(f(a));
    });
  }
  function Ce(e, i, a) {
    e.querySelector(i)?.addEventListener("click", () => {
      const l = e.querySelector(a);
      l && (l.type = l.type === "password" ? "text" : "password");
    });
  }
  function Lt(e) {
    return {
      expectedUpdatedAt: Number(e?.updatedAt) || 0,
      workspaceFileName: e?.workspaceFileName || "",
      jsApiPermission: Y(e?.jsApiPermission),
      tavilyApiKey: String(e?.tavilyApiKey || ""),
      tavilyBaseUrl: j(e?.tavilyBaseUrl || "https://api.tavily.com"),
      currentPresetName: e?.currentPresetName || "默认",
      delegatePresetName: e?.delegatePresetName || e?.currentPresetName || "默认",
      delegateConfig: e?.delegateConfig || {},
      delegateConfigured: e?.delegateConfigured === !0,
      presets: e?.presets || {}
    };
  }
  function Ye(e, i = {}) {
    const a = Me(e), l = wt(a);
    if (l.length)
      return r?.(l[0]), !1;
    n.config = a;
    const p = P(i.presetName || a.currentPresetName || "默认");
    return n.configDraft = C(p, a.presets?.[p] || _(), a), g(), _t({
      requestId: o(i.requestPrefix || "save-config"),
      config: a,
      payload: Lt(a)
    }), !0;
  }
  function Se(e, i = {}) {
    const a = c(e), l = P(i.presetName || a.presetDraftName), p = P(a.currentPresetName || n.config?.currentPresetName || "默认"), S = (n.config?.presets || {})[p] || _(), b = I(a.modelConfigs || S.modelConfigs || {}), A = {
      ...S,
      provider: a.provider,
      permissionMode: le(a.permissionMode),
      modelConfigs: {
        ...b,
        [a.provider]: {
          ...b[a.provider] || {},
          ...x(a)
        }
      }
    }, E = { ...n.config?.presets || {} };
    i.renameCurrentPreset && l !== p && delete E[p], E[l] = A, Ye({
      ...n.config,
      jsApiPermission: Y(a.jsApiPermission),
      tavilyApiKey: String(a.tavilyApiKey || ""),
      tavilyBaseUrl: j(a.tavilyBaseUrl || "https://api.tavily.com"),
      currentPresetName: l,
      delegatePresetName: q(a.delegatePresetName, l),
      delegateConfig: ne(a),
      delegateConfigured: i.configureDelegate === !0 || n.config?.delegateConfigured === !0,
      presets: E
    }, {
      presetName: l,
      requestPrefix: i.requestPrefix
    });
  }
  function Xe(e, i = "") {
    const a = P(i || "默认"), l = typeof window < "u" && typeof window.prompt == "function" ? window.prompt(e, a) : a;
    return l === null ? "" : P(l);
  }
  function Rt(e) {
    const i = Xe("输入新预设名称：", `${c(e).currentPresetName || "默认"} 副本`);
    if (!i) {
      r?.("预设名称不能为空");
      return;
    }
    const a = e.querySelector("#xb-assistant-preset-name");
    a && (a.value = i, Se(e, {
      presetName: i,
      requestPrefix: "create-preset"
    }));
  }
  function Ut(e) {
    const i = c(e), a = P(i.currentPresetName || n.config?.currentPresetName || "默认"), l = Xe("输入预设名称：", i.presetDraftName || a);
    if (!l) {
      r?.("预设名称不能为空");
      return;
    }
    if (l === a) return;
    const p = e.querySelector("#xb-assistant-preset-name");
    p && (p.value = l, Se(e, {
      presetName: l,
      renameCurrentPreset: !0,
      requestPrefix: "rename-preset"
    }));
  }
  function Dt(e) {
    if (Object.keys(n.config?.presets || {}).length <= 1) {
      r?.("至少要保留一套预设");
      return;
    }
    const i = c(e), a = P(n.configDraft?.currentPresetName || n.config?.currentPresetName || "默认"), l = { ...n.config?.presets || {} };
    delete l[a];
    const p = Object.keys(l)[0] || "默认";
    Ye({
      ...n.config,
      jsApiPermission: Y(i.jsApiPermission),
      tavilyApiKey: String(i.tavilyApiKey || n.config?.tavilyApiKey || ""),
      tavilyBaseUrl: j(i.tavilyBaseUrl || n.config?.tavilyBaseUrl || "https://api.tavily.com"),
      currentPresetName: p,
      delegatePresetName: q(i.delegatePresetName, p),
      delegateConfig: ne(i),
      presets: l
    }, {
      presetName: p,
      requestPrefix: "delete-preset"
    }) && s?.();
  }
  function $t(e) {
    e?.querySelector?.("[data-xb-agent-config-retry]")?.addEventListener("click", () => {
      u?.();
    }), e?.querySelector?.("[data-xb-agent-config-reload]")?.addEventListener("click", () => {
      n.configDraft = null, n.configDirty = !1, n.configExternalChangePending = !1, g(), u?.();
    }), e?.querySelector?.("#xb-assistant-provider") && (e.querySelector("#xb-assistant-provider")?.addEventListener("change", (i) => {
      const a = i.currentTarget.value, l = v().provider, p = c(e, { provider: l });
      n.configDraft = {
        ...p,
        provider: a,
        ...ee(a, p.modelConfigs)
      }, g(), s?.();
    }), e.querySelector("#xb-assistant-preset-select")?.addEventListener("change", (i) => {
      const a = P(i.currentTarget.value), l = (n.config?.presets || {})[a] || _(), p = c(e);
      n.config = Me({
        ...n.config,
        jsApiPermission: Y(p.jsApiPermission),
        currentPresetName: a,
        delegatePresetName: q(p.delegatePresetName, a),
        delegateConfig: ne(p)
      }), n.configDraft = C(a, l, n.config), g(), s?.();
    }), e.querySelector("#xb-assistant-preset-name")?.addEventListener("input", () => {
      qt(e);
    }), e.querySelector("#xb-assistant-base-url")?.addEventListener("input", () => {
      c(e), $(e), z(e);
    }), e.querySelector("#xb-assistant-model")?.addEventListener("input", () => {
      c(e), $(e), z(e);
    }), e.querySelector("#xb-assistant-api-key")?.addEventListener("input", () => {
      c(e);
    }), e.querySelector("#xb-assistant-max-tokens")?.addEventListener("input", () => {
      c(e);
    }), e.querySelector("#xb-assistant-temperature")?.addEventListener("input", () => {
      c(e);
    }), e.querySelector("#xb-assistant-send-temperature")?.addEventListener("change", () => {
      c(e);
    }), e.querySelector("#xb-assistant-tavily-api-key")?.addEventListener("input", () => {
      c(e);
    }), e.querySelector("#xb-assistant-model-pulled")?.addEventListener("change", (i) => {
      const a = i.currentTarget.value;
      if (!a) return;
      const l = e.querySelector("#xb-assistant-model");
      l && (l.value = a), c(e), $(e), z(e);
    }), Ce(e, "#xb-assistant-toggle-key", "#xb-assistant-api-key"), Ce(e, "#xb-assistant-toggle-tavily-key", "#xb-assistant-tavily-api-key"), e.querySelector("#xb-assistant-delegate-provider")?.addEventListener("change", (i) => {
      const a = i.currentTarget.value, l = v().delegateProvider, p = c(e, { delegateProvider: l });
      n.configDraft = {
        ...p,
        delegateProvider: a,
        ...J(a, p.delegateModelConfigs)
      }, g(), s?.();
    }), e.querySelector("#xb-assistant-delegate-base-url")?.addEventListener("input", () => {
      c(e), $(e, "delegate"), z(e);
    }), e.querySelector("#xb-assistant-delegate-model")?.addEventListener("input", () => {
      c(e), $(e, "delegate"), z(e);
    }), e.querySelector("#xb-assistant-delegate-api-key")?.addEventListener("input", () => {
      c(e);
    }), e.querySelector("#xb-assistant-delegate-max-tokens")?.addEventListener("input", () => {
      c(e);
    }), e.querySelector("#xb-assistant-delegate-temperature")?.addEventListener("input", () => {
      c(e);
    }), e.querySelector("#xb-assistant-delegate-send-temperature")?.addEventListener("change", () => {
      c(e);
    }), e.querySelector("#xb-assistant-delegate-model-pulled")?.addEventListener("change", (i) => {
      const a = i.currentTarget.value;
      if (!a) return;
      const l = e.querySelector("#xb-assistant-delegate-model");
      l && (l.value = a), c(e), $(e, "delegate"), z(e);
    }), Ce(e, "#xb-assistant-delegate-toggle-key", "#xb-assistant-delegate-api-key"), e.querySelector("#xb-assistant-reasoning-mode")?.addEventListener("change", () => {
      c(e), $(e), z(e);
    }), e.querySelector("#xb-assistant-reasoning-effort")?.addEventListener("change", () => {
      c(e);
    }), e.querySelector("#xb-assistant-reasoning-budget")?.addEventListener("input", () => {
      c(e);
    }), e.querySelector("#xb-assistant-tool-mode")?.addEventListener("change", () => {
      c(e);
    }), e.querySelector("#xb-assistant-delegate-reasoning-mode")?.addEventListener("change", () => {
      c(e), $(e, "delegate"), z(e);
    }), e.querySelector("#xb-assistant-delegate-reasoning-effort")?.addEventListener("change", () => {
      c(e);
    }), e.querySelector("#xb-assistant-delegate-reasoning-budget")?.addEventListener("input", () => {
      c(e);
    }), e.querySelector("#xb-assistant-delegate-tool-mode")?.addEventListener("change", () => {
      c(e);
    }), e.querySelector("#xb-assistant-permission-mode")?.addEventListener("change", () => {
      c(e);
    }), e.querySelector("#xb-assistant-jsapi-permission")?.addEventListener("change", () => {
      c(e);
    }), e.querySelector("#xb-assistant-delegate-preset-select")?.addEventListener("change", (i) => {
      const a = q(i.currentTarget?.value, n.configDraft?.currentPresetName || n.config?.currentPresetName || "默认"), l = (n.config?.presets || {})[a] || _();
      n.configDraft = {
        ...c(e),
        ...K(a, l)
      }, g(), s?.();
    }), e.querySelectorAll("[data-config-page]").forEach((i) => {
      i.addEventListener("click", (a) => {
        c(e), n.configPage = Ae(a.currentTarget?.dataset?.configPage), Ve(e), We(e);
      });
    }), e.querySelector("#xb-assistant-pull-models")?.addEventListener("click", async () => {
      c(e), g();
      const i = xe();
      R(i.provider, {
        status: "loading",
        message: "正在拉取模型列表…"
      }), s?.();
      try {
        const a = await m(i);
        O(i.provider, a), R(i.provider, {
          status: "success",
          message: `已拉取 ${a.length} 个模型`
        });
      } catch (a) {
        O(i.provider, []), R(i.provider, {
          status: "error",
          message: f(a)
        });
      }
      g(), s?.();
    }), e.querySelector("#xb-assistant-delegate-pull-models")?.addEventListener("click", async () => {
      c(e), g();
      const i = xe({ role: "delegate" });
      R(i.provider, {
        status: "loading",
        message: "正在拉取模型列表…"
      }, "delegate"), s?.();
      try {
        const a = await m(i);
        O(i.provider, a, "delegate"), R(i.provider, {
          status: "success",
          message: `已拉取 ${a.length} 个模型`
        }, "delegate");
      } catch (a) {
        O(i.provider, [], "delegate"), R(i.provider, {
          status: "error",
          message: f(a)
        }, "delegate");
      }
      g(), s?.();
    }), e.querySelector("#xb-assistant-new-preset")?.addEventListener("click", () => {
      Rt(e);
    }), e.querySelector("#xb-assistant-rename-preset")?.addEventListener("click", () => {
      Ut(e);
    }), e.querySelector("#xb-assistant-save")?.addEventListener("click", () => {
      Se(e);
    }), e.querySelector("#xb-assistant-delegate-save")?.addEventListener("click", () => {
      Se(e, {
        requestPrefix: "save-delegate-config",
        configureDelegate: !0
      });
    }), e.querySelector("#xb-assistant-delete-preset")?.addEventListener("click", () => {
      Dt(e);
    }));
  }
  return {
    getActiveProviderConfig: xe,
    getActiveProviderConfigFromForm(e, i = {}) {
      return n.configDraft = te(e), xe(i);
    },
    syncConfigToForm: We,
    bindSettingsPanelEvents: $t
  };
}
function me(t = "") {
  return String(t || "").replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#39;");
}
function pe(t) {
  return `<svg viewBox="0 0 24 24" aria-hidden="true">${{
    add: '<path d="M12 5v14" /><path d="M5 12h14" />',
    rename: '<path d="M12 20h9" /><path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4Z" />',
    save: '<path d="M5 21h14a1 1 0 0 0 1-1V7.5L16.5 4H5a1 1 0 0 0-1 1v15a1 1 0 0 0 1 1Z" /><path d="M8 21v-7h8v7" /><path d="M8 4v5h7" />',
    saving: '<path class="xb-assistant-save-spinner" d="M12 3a9 9 0 1 1-8.2 5.3" />',
    success: '<path d="M20 6 9 17l-5-5" />',
    error: '<path d="M18 6 6 18" /><path d="M6 6l12 12" />',
    delete: '<path d="M3 6h18" /><path d="M8 6V4h8v2" /><path d="M19 6l-1 14a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1L5 6" /><path d="M10 11v6" /><path d="M14 11v6" />'
  }[t] || ""}</svg>`;
}
function ca(t = {}) {
  const n = String(t?.status || "idle");
  return n === "saving" ? "saving" : n === "success" ? "success" : n === "error" ? "error" : "save";
}
function ga(t = {}) {
  const n = String(t?.status || "idle");
  return n === "saving" ? {
    className: "xb-assistant-save-button is-saving",
    title: "正在保存配置"
  } : n === "success" ? {
    className: "xb-assistant-save-button is-success",
    title: "配置已保存"
  } : n === "error" ? {
    className: "xb-assistant-save-button is-error",
    title: me(t?.error || "保存失败")
  } : {
    className: "xb-assistant-save-button",
    title: "保存配置"
  };
}
function pa(t = {}) {
  const { configSave: n = {}, runtimeText: s = "", inlineToastText: r = "", showInlineToast: o = !0, showAssistantPermissions: d = !0, showDelegateSettings: u = !0, showTavilySettings: m = !0, activePage: f = "main", delegatePresetHint: y = "DelegateRun 分身会使用这里的独立 API 配置；可以和主助手使用不同 Provider、Base URL、模型和 Tool 调用格式。", isBusy: g = !1, canDeletePreset: L = !0, configLoadError: X = "", configExternalChangePending: R = !1 } = t, O = String(X || "").trim(), D = ga(n), q = ca(n), K = g || O || String(n?.status || "") === "saving" ? "disabled" : "", ee = g || !L ? "disabled" : "", J = f === "delegate" ? "delegate" : "main", C = J === "main", v = J === "delegate", te = d ? `
            <label>
                <span>斜杠命令权限</span>
                <select id="xb-assistant-permission-mode"></select>
            </label>
            <label>
                <span>JavaScript API 权限</span>
                <select id="xb-assistant-jsapi-permission"></select>
            </label>` : "", c = u ? `
            <div class="xb-assistant-config-tabs" role="tablist" aria-label="API 配置分页">
                <button id="xb-assistant-config-tab-main" type="button" class="xb-assistant-config-tab ${C ? "is-active" : ""}" data-config-page="main" role="tab" aria-selected="${C ? "true" : "false"}">主助手 API</button>
                <button id="xb-assistant-config-tab-delegate" type="button" class="xb-assistant-config-tab ${v ? "is-active" : ""}" data-config-page="delegate" role="tab" aria-selected="${v ? "true" : "false"}">分身 API</button>
            </div>` : "", x = u ? `
            <div class="xb-assistant-config-page" data-config-page-panel="delegate" ${v ? "" : "hidden"}>
                <p class="xb-assistant-config-note">${me(y)}</p>
                <div class="xb-assistant-preset-row">
                    <select id="xb-assistant-delegate-preset-select" class="xb-assistant-preset-field" aria-label="已存预设"></select>
                    <div class="xb-assistant-preset-tools is-single" aria-label="分身 API 预设操作">
                        <button id="xb-assistant-delegate-save" type="button" class="xb-assistant-icon-button ${D.className}" title="${D.title}" aria-label="${D.title}" ${K}>${pe(q)}</button>
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
                    <button id="xb-assistant-delegate-pull-models" type="button" class="secondary" ${g ? "disabled" : ""}>拉取模型</button>
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
            <div class="xb-assistant-config-alert is-error" data-xb-agent-config-load-error ${O ? "" : "hidden"}>
                <span data-xb-agent-config-load-error-message>${me(O)}</span>
                <button type="button" data-xb-agent-config-retry>重新读取</button>
            </div>
            <div class="xb-assistant-config-alert is-conflict" data-xb-agent-config-conflict ${O || !R ? "hidden" : ""}>
                <span>共享配置已在其他页面更新。当前未保存编辑仍保留；重新载入会放弃这些编辑。</span>
                <button type="button" data-xb-agent-config-reload>重新载入</button>
            </div>
            <fieldset class="xb-assistant-config-fields" data-xb-agent-config-fields ${O ? "disabled" : ""}>
            ${c}
            <div class="xb-assistant-config-page" data-config-page-panel="main" ${C ? "" : "hidden"}>
            <div class="xb-assistant-preset-row">
                <select id="xb-assistant-preset-select" class="xb-assistant-preset-field" aria-label="已存预设"></select>
                <input id="xb-assistant-preset-name" type="hidden" />
                <div class="xb-assistant-preset-tools" aria-label="API 预设操作">
                    <button id="xb-assistant-new-preset" type="button" class="xb-assistant-icon-button" title="新增预设" aria-label="新增预设" ${g ? "disabled" : ""}>${pe("add")}</button>
                    <button id="xb-assistant-rename-preset" type="button" class="xb-assistant-icon-button" title="重命名预设" aria-label="重命名预设" ${g ? "disabled" : ""}>${pe("rename")}</button>
                    <button id="xb-assistant-save" type="button" class="xb-assistant-icon-button ${D.className}" title="${D.title}" aria-label="${D.title}" ${K}>${pe(q)}</button>
                    <button id="xb-assistant-delete-preset" type="button" class="xb-assistant-icon-button" title="删除预设" aria-label="删除预设" ${ee}>${pe("delete")}</button>
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
                <button id="xb-assistant-pull-models" type="button" class="secondary" ${g ? "disabled" : ""}>拉取模型</button>
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
            ${m ? `<label>
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
            ${te}
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
            ${x}
            <div class="xb-assistant-runtime" id="xb-assistant-runtime">${me(s)}</div>
            </fieldset>
            ${o ? `<div class="xb-assistant-toast xb-assistant-toast-inline" id="xb-assistant-toast" aria-live="polite">${me(r)}</div>` : ""}
        </section>
    `;
}
var ma = { class: "agent-api-app" }, fa = { class: "agent-api-scroll" }, ba = { class: "agent-api-content" }, va = {
  key: 0,
  class: "agent-api-state",
  "aria-live": "polite"
}, ya = {
  key: 1,
  class: "agent-api-state is-error",
  role: "alert"
}, xa = {
  class: "agent-api-panel xb-agent-settings-surface",
  "aria-label": "Agent API 配置"
}, Sa = { "aria-live": "polite" }, ha = ["disabled"], ft = 13e4, Ta = /* @__PURE__ */ Gt({
  __name: "AgentApiApp",
  props: {
    bridge: {},
    initialState: {}
  },
  setup(t) {
    const n = t, s = structuredClone(lt(n.initialState)), r = he(s), o = he(null), d = he("idle"), u = he("连接尚未测试");
    let m = () => {
    }, f = null, y = 0;
    const g = Ht({
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
    }), L = we(() => r.value.status === "ready" && g.config !== null), X = we(() => Object.keys(g.config?.presets || {}).length), R = we(() => d.value === "testing");
    function O(c) {
      const x = c instanceof Error ? c.message : String(c || "unknown_error");
      return x === "host_request_timeout" ? "请求等待超时，请检查网络后重试。" : x === "app_inactive" ? "页面已经关闭。" : x;
    }
    function D() {
      f && clearTimeout(f), f = setTimeout(() => {
        g.configSave = {
          status: "idle",
          requestId: "",
          error: ""
        }, g.inlineToastText = "", C();
      }, 1800);
    }
    async function q(c) {
      const x = c.payload || {};
      g.configSave = {
        status: "saving",
        requestId: "",
        error: ""
      }, g.inlineToastText = "正在保存配置…", C();
      try {
        const h = (await n.bridge.request("agent-api/save", { patch: x }, 35e3)).result;
        if (h.ok !== !0 || !h.config)
          throw h.conflict && (g.configExternalChangePending = !0), new Error(h.error || "共享 Agent API 配置保存失败");
        g.config = Me(h.config), g.configDraft = null, g.configDirty = !1, g.configExternalChangePending = !1, g.configFormSyncPending = !0, g.configSave = {
          status: "success",
          requestId: "",
          error: ""
        }, g.inlineToastText = "配置已保存";
      } catch (h) {
        const ne = O(h);
        g.configSave = {
          status: "error",
          requestId: "",
          error: ne
        }, g.inlineToastText = ne;
      }
      C(), D();
    }
    async function K(c = !1) {
      const x = ++y;
      try {
        const h = await n.bridge.request("agent-api/reload", {}, 35e3);
        if (x !== y) return;
        if (c && g.configDirty) {
          g.configExternalChangePending = !0, C();
          return;
        }
        v(h.result);
      } catch (h) {
        if (x !== y) return;
        r.value = {
          status: "error",
          config: null,
          message: O(h)
        }, C();
      }
    }
    async function ee(c) {
      return (await n.bridge.request("agent-api/pull-models", { providerConfig: c }, ft)).result.models;
    }
    const J = ua({
      state: g,
      render: C,
      saveConfig: q,
      reloadConfig: K,
      pullModels: ee,
      describeError: O
    });
    function C() {
      const c = o.value;
      !c || !g.config || (c.innerHTML = pa({
        configSave: g.configSave,
        inlineToastText: g.inlineToastText,
        showAssistantPermissions: !1,
        showDelegateSettings: !1,
        showTavilySettings: !1,
        canDeletePreset: X.value > 1,
        configLoadError: r.value.status === "error" ? r.value.message : "",
        configExternalChangePending: g.configExternalChangePending
      }), J.syncConfigToForm(c), J.bindSettingsPanelEvents(c));
    }
    function v(c) {
      r.value = structuredClone(c), c.status === "ready" && c.config && (g.config = Me(c.config), g.configDraft = null, g.configDirty = !1, g.configExternalChangePending = !1, g.configFormSyncPending = !0), zt(C);
    }
    async function te() {
      const c = o.value;
      if (!c || !L.value || R.value) return;
      const x = J.getActiveProviderConfigFromForm(c);
      d.value = "testing", u.value = "正在测试当前表单中的连接…";
      try {
        const h = (await n.bridge.request("agent-api/test-connection", { providerConfig: structuredClone(lt(x)) }, ft)).result;
        d.value = "success", u.value = `${h.provider || "当前服务"} · ${h.model || "当前模型"} · ${h.latencyMs} 毫秒`;
      } catch (h) {
        d.value = "error", u.value = O(h);
      }
    }
    return Jt(() => {
      m = n.bridge.subscribe((c) => {
        if (c.type === "agent-api/state") {
          v(c.payload.state);
          return;
        }
        c.type === "agent-api/config-changed" && (g.configDirty ? (g.configExternalChangePending = !0, C()) : K(!0));
      }), v(s);
    }), Ft(() => {
      y += 1, m(), f && clearTimeout(f);
    }), (c, x) => (_e(), Ie("main", ma, [w("div", fa, [w("div", ba, [
      x[2] || (x[2] = w("header", { class: "agent-api-header" }, [w("h1", null, "Agent API 配置"), w("p", null, "共享 Agent 主预设")], -1)),
      r.value.status === "loading" ? (_e(), Ie("section", va, " 正在读取配置 ")) : r.value.status === "error" ? (_e(), Ie("section", ya, [w("div", null, [x[1] || (x[1] = w("strong", null, "配置暂时无法读取", -1)), w("span", null, qe(r.value.message), 1)]), w("button", {
        type: "button",
        onClick: x[0] || (x[0] = (h) => K())
      }, "重新读取")])) : Kt("", !0),
      Bt(w("section", xa, [w("div", {
        ref_key: "panelRoot",
        ref: o
      }, null, 512), w("div", { class: jt(["agent-api-connection", `is-${d.value}`]) }, [w("p", Sa, qe(u.value), 1), w("button", {
        type: "button",
        disabled: !L.value || R.value,
        onClick: te
      }, qe(R.value ? "测试中…" : "测试当前连接"), 9, ha)], 2)], 512), [[Vt, L.value]])
    ])])]));
  }
}), ka = Ta;
export {
  ka as default
};
