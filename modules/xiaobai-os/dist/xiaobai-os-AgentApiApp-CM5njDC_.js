/* eslint-disable */
import { B as Kt, C as Ht, I as zt, P as Wt, U as Le, at as Te, b as _e, ft as Ie, it as Gt, k as Jt, m as Vt, st as dt, tt as Xt, ut as Yt, w as De, x as w } from "./xiaobai-os-frame-bridge-CrPFvkI3.js";
import { a as fe, i as Pe, n as Qt, o as Zt, r as xt, t as es } from "./xiaobai-os-reasoning-capabilities-jekAYzl_.js";
var Q = Object.freeze([{
  id: "tavily",
  label: "Tavily",
  baseUrl: "https://api.tavily.com"
}, {
  id: "exa",
  label: "Exa",
  baseUrl: "https://api.exa.ai"
}]), St = "tavily", Ue = Object.freeze({
  provider: "联网渠道（全局）",
  key: "API Key",
  show: "显示"
});
function ts(t) {
  return Q.some((s) => s.id === t) ? t : St;
}
function ht(t = "") {
  return String(t || "").trim();
}
function me(t = "", s = St) {
  return String(t || "").trim().replace(/\/+$/, "") || Q.find((n) => n.id === s).baseUrl;
}
function K(t = {}, s = {}) {
  return {
    webProvider: ts(t.webProvider ?? s.webProvider),
    ...Object.fromEntries(Q.flatMap(({ id: n }) => [[`${n}ApiKey`, ht(t[`${n}ApiKey`] ?? s[`${n}ApiKey`])], [`${n}BaseUrl`, me(t[`${n}BaseUrl`] ?? s[`${n}BaseUrl`], n)]]))
  };
}
var ss = "agent-core-no-auth";
function Tt(t) {
  return String(t ?? "").trim();
}
function Ce(t, s) {
  const n = Tt(s);
  if (t === "google") return {
    apiKey: n,
    headers: { "x-goog-api-key": n },
    sdkOptions: {
      apiKey: n,
      vertexai: !1
    }
  };
  if (t === "anthropic") return {
    apiKey: n,
    headers: n ? { "x-api-key": n } : {},
    sdkOptions: {
      apiKey: n,
      authToken: null,
      ...n ? {} : { defaultHeaders: {
        "X-Api-Key": null,
        Authorization: null
      } }
    }
  };
  const i = n ? { Authorization: `Bearer ${n}` } : {}, o = {
    "Content-Type": "application/json",
    Accept: "application/json",
    ...i
  };
  return {
    apiKey: n,
    headers: i,
    requestHeaders: o,
    sdkOptions: {
      apiKey: n || ss,
      adminAPIKey: null,
      defaultHeaders: {
        Authorization: null,
        "api-key": null,
        ...o
      },
      fetch: (d, u) => globalThis.fetch(d, {
        ...u,
        headers: o
      })
    }
  };
}
var Ee = "x-api-key", as = Object.freeze([{
  value: Ee,
  label: "x-api-key"
}, {
  value: "bearer",
  label: "Bearer"
}]);
function W(t) {
  return t === "anthropic" || t === "sillytavern-claude";
}
function D(t) {
  return t === "bearer" ? t : Ee;
}
var Pt = "openai-compatible", Fe = "默认", At = "default", ns = "deny", G = 32e3, rs = Object.freeze([{
  value: "default",
  label: "默认权限"
}, {
  value: "full",
  label: "完全权限"
}]), is = Object.freeze([{
  value: "deny",
  label: "禁止"
}, {
  value: "allow",
  label: "允许"
}]), Be = {
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
    modelListAuth: Ee,
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
    modelListAuth: Ee,
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
function kt() {
  return JSON.parse(JSON.stringify(Be));
}
function L() {
  return {
    provider: Pt,
    modelConfigs: kt(),
    permissionMode: At
  };
}
function Mt(t = L()) {
  const s = t && typeof t == "object" ? t : L();
  return {
    provider: Ke(s.provider),
    modelConfigs: $(s.modelConfigs || {})
  };
}
function de(t) {
  return t === "full" ? "full" : At;
}
function Y(t) {
  return t === "allow" ? "allow" : ns;
}
function q(t, s = G) {
  const n = Number(t);
  if (!Number.isFinite(n) || n <= 0) {
    const i = Number(s);
    return Number.isFinite(i) && i > 0 ? Math.floor(i) : G;
  }
  return Math.min(Number.MAX_SAFE_INTEGER, Math.floor(n));
}
function P(t) {
  return String(t || "").trim() || "默认";
}
function $(t = {}) {
  const s = kt();
  return Object.keys(Be).forEach((n) => {
    const i = t && typeof t[n] == "object" ? t[n] : {}, o = Be[n];
    s[n] = {
      baseUrl: String(i.baseUrl ?? o.baseUrl ?? ""),
      model: String(i.model ?? o.model ?? ""),
      apiKey: Tt(i.apiKey ?? o.apiKey),
      ...W(n) ? { modelListAuth: D(i.modelListAuth) } : {},
      temperature: i.temperature ?? o.temperature,
      maxTokens: q(i.maxTokens, o.maxTokens),
      sendTemperature: typeof i.sendTemperature == "boolean" ? i.sendTemperature : o.sendTemperature,
      ..."toolMode" in o ? { toolMode: String(i.toolMode || o.toolMode || "native") } : {},
      reasoning: fe(i.reasoning)
    };
  }), s;
}
function Ke(t) {
  return typeof t == "string" && t.trim() ? t : Pt;
}
function He(t = {}, s) {
  return t && typeof t.presets == "object" && t.presets ? t.presets : t?.modelConfigs ? { [s]: {
    provider: t.provider || "openai-compatible",
    modelConfigs: t.modelConfigs,
    permissionMode: t.permissionMode
  } } : {};
}
function os(t = {}, s) {
  const n = {}, i = He(t, s);
  return Object.entries(i).forEach(([o, d]) => {
    if (!d || typeof d != "object") return;
    const u = P(o);
    n[u] = {
      provider: Ke(d.provider),
      modelConfigs: $(d.modelConfigs || {}),
      permissionMode: de(d.permissionMode)
    };
  }), Object.keys(n).length || (n[Fe] = L()), n;
}
function ls(t, s) {
  const n = P(s);
  return t[n] ? n : Object.keys(t)[0];
}
function ds(t, s, n) {
  const i = P(s || n);
  return t[i] ? i : t[n] ? n : Object.keys(t)[0];
}
function Ct(t = {}, s = L()) {
  const n = Mt(s), i = t && typeof t == "object" ? t : {};
  return {
    provider: Ke(i.provider || n.provider),
    modelConfigs: $(i.modelConfigs || n.modelConfigs)
  };
}
function us(t = {}, s = {}, n = Fe, i = n) {
  if (t?.delegateConfigured === !1) return !1;
  if (i !== n) return !0;
  const o = t?.delegateConfig;
  if (!o || typeof o != "object" || Array.isArray(o) || !(typeof o.provider == "string" && o.provider.trim() || o.modelConfigs && typeof o.modelConfigs == "object" && Object.keys(o.modelConfigs).length)) return !1;
  if (t?.delegateConfigured === !0) return !0;
  const d = s[n] || L(), u = Mt(d), g = Ct(o, d);
  return JSON.stringify(g) !== JSON.stringify(u);
}
function cs(t = {}, s, n, i, o) {
  const d = o(t?.[i]);
  if (d) return d;
  const u = He(t, s), g = [
    n,
    s,
    t?.currentPresetName,
    t?.delegatePresetName,
    ...Object.keys(u || {})
  ].map(P), f = /* @__PURE__ */ new Set();
  for (const y of g) {
    if (f.has(y)) continue;
    f.add(y);
    const p = o(u?.[y]?.[i]);
    if (p) return p;
  }
  return o(t?.delegateConfig?.[i]);
}
function gs(t = {}, s, n) {
  const i = (g) => String(g || "").trim();
  if (i(t?.tavilyBaseUrl)) return me(t.tavilyBaseUrl);
  const o = He(t, s), d = [
    n,
    s,
    t?.currentPresetName,
    t?.delegatePresetName,
    ...Object.keys(o || {})
  ].map(P), u = /* @__PURE__ */ new Set();
  for (const g of d) {
    if (u.has(g)) continue;
    u.add(g);
    const f = o?.[g]?.tavilyBaseUrl;
    if (i(f)) return me(f);
  }
  return i(t?.delegateConfig?.tavilyBaseUrl) ? me(t.delegateConfig.tavilyBaseUrl) : me();
}
function ps(t = {}, s, n) {
  return {
    tavilyApiKey: cs(t, s, n, "tavilyApiKey", ht),
    tavilyBaseUrl: gs(t, s, n)
  };
}
function qe(t = {}) {
  const s = P(t.currentPresetName || t.presetDraftName || "默认"), n = os(t, s), i = ls(n, t.currentPresetName), o = ds(n, t.delegatePresetName, i), d = n[i] || L(), u = n[o] || d, g = Ct(t.delegateConfig, u), f = us(t, n, i, o), y = K(t, ps(t, s, i));
  return {
    workspaceFileName: String(t.workspaceFileName || ""),
    updatedAt: Number(t.updatedAt) || 0,
    jsApiPermission: Y(t.jsApiPermission),
    currentPresetName: i,
    delegatePresetName: o,
    delegateConfig: g,
    delegateConfigured: f,
    presetDraftName: P(t.presetDraftName || i),
    presetNames: Object.keys(n),
    presets: n,
    provider: d.provider,
    modelConfigs: d.modelConfigs,
    permissionMode: de(d.permissionMode),
    ...y
  };
}
async function ms(t, s) {
  const n = t.body?.getReader?.();
  if (!n) throw new Error("host_chat_completions_stream_missing_body");
  const i = new TextDecoder();
  let o = "";
  const d = /\r?\n\r?\n/, u = (f) => {
    const y = f.split(/\r?\n/).filter((p) => p.startsWith("data:")).map((p) => p.slice(5).trimStart()).join(`
`).trim();
    !y || y === "[DONE]" || s(JSON.parse(y));
  };
  for (; ; ) {
    const { done: f, value: y } = await n.read();
    if (f) break;
    for (o += i.decode(y, { stream: !0 }); ; ) {
      const p = o.match(d);
      if (!p || typeof p.index != "number") break;
      const U = o.slice(0, p.index);
      o = o.slice(p.index + p[0].length), u(U);
    }
  }
  const g = o.trim();
  g && u(g);
}
var ge = "openai", Et = "claude", qt = "makersuite", fs = "/api/backends/chat-completions/status", bs = "/api/backends/chat-completions/generate", Nt = Object.freeze({
  [Et]: "https://api.anthropic.com/v1",
  [qt]: "https://generativelanguage.googleapis.com"
}), ye = Zt;
function vs(t) {
  return String(t || "").trim().replace(/\/+$/, "");
}
function ys(t, s) {
  const n = vs(t);
  return s === "claude" ? !n || /\/v\d[\w.-]*$/i.test(n) ? n : `${n}/v1` : s === "makersuite" ? n.replace(/\/v\d[\w.-]*$/i, "") : n;
}
async function wt(t = ye) {
  if (typeof t != "function") throw new Error("宿主请求头未注册，无法调用酒馆后端。");
  return {
    "Content-Type": "application/json",
    ...await Promise.resolve(t() || {}),
    Accept: "application/json"
  };
}
function xs(t = {}) {
  const s = {};
  return Object.entries(t || {}).forEach(([n, i]) => {
    s[n] = /authorization|cookie|csrf|token|api[-_]?key/i.test(n) ? "[redacted]" : i;
  }), s;
}
async function ze(t = {}, s = !1, n = ye) {
  const i = await wt(n), o = {
    url: bs,
    method: "POST",
    headers: xs(i),
    body: {
      ...t,
      stream: !!s
    }
  };
  return Object.defineProperty(o, "rawHeaders", {
    value: i,
    enumerable: !1
  }), o;
}
async function Ss(t = {}, s = !1) {
  return await ze(t, s);
}
function hs(t = "") {
  return /^\s*(?:<!DOCTYPE\s+html\b|<html\b)/i.test(String(t || ""));
}
function Ts(t = "") {
  return /invalid csrf token/i.test(String(t || ""));
}
function Ps() {
  return "酒馆当前页面的 CSRF token 已失效，请按 F5 刷新并重新进入酒馆后再试。";
}
function ut(t = "", s = 10) {
  const n = Number.parseInt(String(t || ""), s);
  return Number.isInteger(n) && n >= 0 && n <= 1114111 ? String.fromCodePoint(n) : "";
}
function ct(t = "") {
  return String(t || "").replace(/&nbsp;|&#160;/gi, " ").replace(/&amp;/gi, "&").replace(/&lt;/gi, "<").replace(/&gt;/gi, ">").replace(/&quot;/gi, '"').replace(/&#39;|&apos;/gi, "'").replace(/&#x([0-9a-f]+);?/gi, (s, n) => ut(n, 16)).replace(/&#([0-9]+);?/g, (s, n) => ut(n));
}
function As(t = "") {
  const s = String(t || ""), n = ct((s.match(/<title\b[^>]*>([\s\S]*?)<\/title>/i) || [])[1] || "").replace(/\s+/g, " ").trim(), i = ct(s.replace(/<script\b[\s\S]*?<\/script>/gi, " ").replace(/<style\b[\s\S]*?<\/style>/gi, " ").replace(/<[^>]+>/g, " ")).replace(/\s+/g, " ").trim(), o = n || i;
  return o.length > 240 ? `${o.slice(0, 237)}...` : o;
}
function ks(t = null) {
  const s = Number(t?.status), n = String(t?.statusText || "").trim();
  let i = "";
  try {
    i = String(t?.headers?.get?.("content-type") || "").trim();
  } catch {
    i = "";
  }
  return {
    status: Number.isFinite(s) && s > 0 ? s : 0,
    statusText: n,
    contentType: i
  };
}
function Ms(t = {}) {
  return t.status ? `HTTP ${t.status}${t.statusText ? ` ${t.statusText}` : ""}` : "";
}
function Cs(t = "") {
  const s = String(t || "").trim();
  if (!s || s[0] !== "{" && s[0] !== "[") return "";
  try {
    const n = JSON.parse(s), i = n?.error?.message;
    if (typeof i == "string" && i.trim()) return i.trim();
    if (typeof n?.message == "string" && n.message.trim()) return n.message.trim();
  } catch {
    return "";
  }
  return "";
}
function ue(t = "", s = "", n = null) {
  if (Ts(t)) return Ps();
  const i = ks(n);
  if (hs(t) || /\btext\/html\b/i.test(i.contentType)) {
    const o = Ms(i), d = As(t);
    return [
      "酒馆后端返回了非 JSON 的 HTML 页面",
      o ? `（${o}）` : "",
      d ? `：${d}` : ""
    ].join("");
  }
  return Cs(t) || String(t || s || "").trim();
}
function Es(t = {}, s = ge) {
  const n = ys(t.baseUrl, s), i = String(t.apiKey || "").trim(), o = Nt[s] || "", d = n || (i ? o : ""), u = { chat_completion_source: s || "openai" };
  return d && (u.reverse_proxy = d), i && (u.proxy_password = i), u;
}
function qs(t = {}, s = ge) {
  return Es(t, s);
}
function We(t) {
  const s = t || globalThis.fetch;
  if (typeof s != "function") throw new Error("当前运行环境没有可用的 fetch，无法调用酒馆后端。");
  return s;
}
async function Ns(t = {}, s = ge, n = {}, i = {}) {
  const o = await We(i.fetch)(fs, {
    method: "POST",
    headers: await wt(i.requestHeadersProvider),
    body: JSON.stringify(qs(t, s)),
    signal: n.signal
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
  const g = Array.isArray(u?.data) ? u.data.map((f) => String(f?.id || f?.name || "").trim()).filter(Boolean) : [];
  return [...new Set(g)];
}
async function Ge(t = {}, s = ge, n = {}) {
  return await Ns(t, s, n, { requestHeadersProvider: ye });
}
async function ws(t = {}, s = {}) {
  return await Ge(t, ge, s);
}
async function Os(t = {}, s = {}, n = {}) {
  const i = await ze(t, !1, n.requestHeadersProvider);
  typeof s.onRequest == "function" && s.onRequest(i);
  const o = await We(n.fetch)(i.url, {
    method: i.method,
    headers: i.rawHeaders || i.headers,
    body: JSON.stringify(i.body),
    signal: s.signal
  }), d = await o.text();
  let u = null;
  try {
    u = d ? JSON.parse(d) : {};
  } catch (g) {
    const f = /* @__PURE__ */ new Error(`酒馆后端生成失败：${ue(d, String(g?.message || g), o)}`);
    throw f.status = o.status, f.body = d, f;
  }
  if (!o.ok || u?.error) {
    const g = ue(u?.error?.message || u?.message || d, `HTTP ${o.status}`, o), f = /* @__PURE__ */ new Error(`酒馆后端生成失败：${g}`);
    throw f.status = o.status, f.error = u?.error, f;
  }
  return u;
}
async function $s(t = {}, s = {}) {
  return await Os(t, s, { requestHeadersProvider: ye });
}
async function Ls(t = {}, s, n = {}, i = {}) {
  const o = await ze(t, !0, i.requestHeadersProvider);
  typeof n.onRequest == "function" && n.onRequest(o);
  const d = await We(i.fetch)(o.url, {
    method: o.method,
    headers: o.rawHeaders || o.headers,
    body: JSON.stringify(o.body),
    signal: n.signal
  });
  if (!d.ok) {
    const u = await d.text().catch(() => ""), g = new Error(ue(u, `酒馆后端流式生成失败：HTTP ${d.status}`, d));
    throw g.status = d.status, g.body = u, g;
  }
  typeof n.onResponseAccepted == "function" && n.onResponseAccepted(), await ms(d, (u) => {
    if (u?.error) {
      const g = ue(u.error?.message || u.message || JSON.stringify(u.error), "酒馆后端流式生成失败");
      throw new Error(g);
    }
    s(u);
  });
}
async function _s(t = {}, s, n = {}) {
  return await Ls(t, s, n, { requestHeadersProvider: ye });
}
var fa = Object.freeze([
  "buildHostChatCompletionGenerateRequest",
  "createHostChatCompletion",
  "streamHostChatCompletion"
]), ba = Object.freeze({
  buildHostChatCompletionGenerateRequest: Ss,
  fetchHostChatCompletionsModels: Ge,
  fetchHostOpenAICompatibleModels: ws,
  createHostChatCompletion: $s,
  streamHostChatCompletion: _s
}), gt = 900 * 1e3, pt = Object.freeze([{
  value: "native",
  label: "原生 Tool Calling"
}, {
  value: "tagged-json",
  label: "Tagged JSON 兼容模式"
}]), Is = Object.freeze([
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
function Ds(t = "") {
  return t === "sillytavern-openai-compatible" || t === "sillytavern-claude" || t === "sillytavern-google";
}
function I(t, s = 1) {
  const n = typeof t == "string" && !t.trim() ? s : t, i = Number(n);
  return Number.isFinite(i) ? Math.max(0, Math.min(2, i)) : I(s, 1);
}
function Re(t = {}) {
  return t.sendTemperature !== !1;
}
function mt(t = "", s = {}) {
  return s && typeof s == "object" && s[t] ? s[t] : Is.find((n) => n.value === t)?.label || t || "未配置";
}
function Us() {
  return `<div class="xb-assistant-web-settings"><label><span>${Ue.provider}</span>
        <select id="xb-assistant-web-provider">${Q.map(({ id: t, label: s }) => `<option value="${t}">${s}</option>`).join("")}</select>
    </label>${Q.map(({ id: t, label: s }) => `<label id="xb-assistant-${t}-key-wrap">
        <span>${s} ${Ue.key}</span>
        <div class="xb-assistant-inline-input">
            <input id="xb-assistant-${t}-api-key" type="password" autocomplete="off" />
            <button id="xb-assistant-toggle-${t}-key" type="button" class="secondary ghost">${Ue.show}</button>
        </div>
    </label>`).join("")}</div>`;
}
function Rs(t, s) {
  return K({
    webProvider: t.querySelector("#xb-assistant-web-provider")?.value,
    ...Object.fromEntries(Q.map(({ id: n }) => [`${n}ApiKey`, t.querySelector(`#xb-assistant-${n}-api-key`)?.value]))
  }, s);
}
function ft(t, s) {
  const n = K(s), i = t.querySelector("#xb-assistant-web-provider");
  i && (i.value = n.webProvider);
  for (const { id: o } of Q) {
    const d = t.querySelector(`#xb-assistant-${o}-key-wrap`), u = t.querySelector(`#xb-assistant-${o}-api-key`);
    d && (d.style.display = n.webProvider === o ? "" : "none"), u && (u.value = n[`${o}ApiKey`]);
  }
}
var Bs = { chat: { exclude: [
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
] } }, js = Object.freeze([
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
function B(t, s, n = "") {
  if (t.replaceChildren(), n) {
    const i = document.createElement("option");
    i.value = "", i.textContent = n, t.appendChild(i);
  }
  s.forEach((i) => {
    const o = document.createElement("option");
    o.value = i.value, o.textContent = i.label, o.disabled = i.disabled === !0, t.appendChild(o);
  });
}
function Ae(t = "", s = {}) {
  const n = fe(s.reasoning), i = xt({
    provider: t,
    baseUrl: s.baseUrl,
    model: s.model
  }), o = {
    reasoningMode: n.mode,
    reasoningEffort: "",
    reasoningBudgetTokens: void 0
  };
  if (i.intensity.kind === "effort") o.reasoningEffort = i.intensity.values.includes(n.effort) ? n.effort : i.intensity.defaultValue;
  else if (i.intensity.kind === "budget") {
    const d = n.budgetTokens, u = i.intensity.allowAuto && d === -1, g = Number.isInteger(d) && d >= i.intensity.min && d <= i.intensity.max;
    o.reasoningBudgetTokens = u || g ? d : i.intensity.defaultValue;
  }
  return o;
}
function bt(t = {}) {
  return fe(t);
}
function be(t = []) {
  const s = [...new Set(t.filter(Boolean).map((o) => String(o).trim()).filter(Boolean))], n = Bs.chat, i = s.filter((o) => {
    const d = o.toLowerCase();
    return !n.exclude.some((u) => d.includes(u));
  });
  return i.length ? i : s;
}
function ke(t = "") {
  return t === "delegate" ? "delegate" : "main";
}
function ce(t) {
  return String(t || "").trim().replace(/\/+$/, "");
}
function le(t = "") {
  return t === "openai-compatible" || t === "sillytavern-openai-compatible";
}
function Fs(t = "") {
  return t === "sillytavern-claude" ? Et : t === "sillytavern-google" ? qt : ge;
}
function ve(t = []) {
  return [...new Set(t.filter(Boolean).map((s) => String(s).trim()).filter(Boolean))];
}
function Ks(t) {
  const s = ce(t);
  if (!s) return [];
  if (s.endsWith("/v1")) {
    const n = s.slice(0, -3);
    return ve([
      `${s}/models`,
      `${n}/v1/models`,
      `${n}/models`
    ]);
  }
  return ve([`${s}/v1/models`, `${s}/models`]);
}
function Hs(t) {
  const s = ce(t);
  if (!s) return [];
  if (s.endsWith("/v1")) {
    const n = s.slice(0, -3);
    return ve([
      `${s}/models`,
      `${n}/v1/models`,
      `${n}/models`
    ]);
  }
  return ve([`${s}/v1/models`, `${s}/models`]);
}
function zs(t, s) {
  const n = ce(t);
  if (!n) return [];
  const i = n.endsWith("/v1beta") ? n.slice(0, -7) : n, o = s ? `?key=${encodeURIComponent(s)}` : "";
  return ve([
    `${n}/models${o}`,
    `${n}/models`,
    `${i}/v1beta/models${o}`,
    `${i}/v1beta/models`,
    `${i}/models${o}`,
    `${i}/models`
  ]);
}
function Ws(t, s) {
  const n = [
    t?.error?.message,
    t?.message,
    t?.detail,
    t?.details,
    t?.error
  ].find((i) => typeof i == "string" && i.trim());
  return n ? n.trim() : String(s || "").trim().slice(0, 160);
}
async function Gs(t, s = {}) {
  const n = await fetch(t, s), i = await n.text();
  let o = null, d = null;
  try {
    o = i ? JSON.parse(i) : {};
  } catch (u) {
    d = u;
  }
  return {
    ok: n.ok,
    status: n.status,
    url: t,
    data: o,
    rawText: i,
    parseError: d,
    errorSnippet: Ws(o, i)
  };
}
function Js(t) {
  return be((t?.data || []).map((s) => String(s?.id || "").trim()).filter(Boolean));
}
function Vs(t) {
  return be((t?.data || []).map((s) => String(s?.id || "").trim()).filter(Boolean));
}
function Xs(t) {
  return be((t?.models || t?.data || []).map((s) => String(s?.id || s?.name || "")).map((s) => s.split("/").pop() || "").filter(Boolean));
}
async function je({ urls: t, requestOptionsList: s, extractModels: n, providerLabel: i }) {
  let o = null;
  e: for (const d of t) for (const u of s) {
    const g = await Gs(d, u);
    if (!g.ok) {
      if (o = g, g.status === 401 || g.status === 403) break e;
      continue;
    }
    if (g.parseError) {
      o = {
        ...g,
        errorSnippet: "返回的不是 JSON"
      };
      continue;
    }
    const f = n(g.data);
    if (f.length) return f;
    o = {
      ...g,
      errorSnippet: "返回成功，但模型列表为空"
    };
  }
  if (o) {
    const d = o.url ? ` (${o.url})` : "", u = o.errorSnippet ? `：${o.errorSnippet}` : "";
    throw new Error(`${i} 拉取模型失败：${o.status || "unknown"}${u}${d}`);
  }
  throw new Error(`${i} 拉取模型失败：未获取到模型列表。`);
}
async function Ot(t, s, n = {}) {
  const i = D(s.modelListAuth) === "bearer" ? "openai-compatible" : "anthropic";
  return await je({
    urls: Hs(t),
    requestOptionsList: [{
      headers: {
        ...Ce(i, s.apiKey).headers,
        "anthropic-version": "2023-06-01",
        Accept: "application/json"
      },
      signal: n.signal
    }],
    extractModels: Vs,
    providerLabel: "Anthropic"
  });
}
async function Ys(t, s = {}) {
  const n = Ce("anthropic", t.apiKey), i = ce(t.baseUrl || ""), o = ce(i || Nt.claude);
  if (o && (n.apiKey || i)) try {
    return await Ot(o, t, s);
  } catch (d) {
    if (i) throw d;
  }
  return [...js];
}
async function Qs(t, s = {}) {
  const n = t.provider, i = ce(t.baseUrl || ""), o = Ce(n, t.apiKey), { apiKey: d } = o;
  if (n === "sillytavern-claude") return be(await Ys(t, s));
  if (Ds(n)) return be(await Ge(t, Fs(n), { signal: s.signal }));
  if (!i) throw new Error("请先填写 Base URL。");
  return n === "google" ? await je({
    urls: zs(i, d),
    requestOptionsList: [{
      headers: {
        Accept: "application/json",
        ...o.headers
      },
      signal: s.signal
    }, ...d ? [{
      headers: {
        Accept: "application/json",
        ...Ce("openai-compatible", d).headers
      },
      signal: s.signal
    }] : []],
    extractModels: Xs,
    providerLabel: "Google AI"
  }) : W(n) ? await Ot(i, t, s) : await je({
    urls: Ks(i),
    requestOptionsList: [{
      headers: {
        ...o.headers,
        Accept: "application/json"
      },
      signal: s.signal
    }],
    extractModels: Js,
    providerLabel: n === "openai-responses" ? "OpenAI Responses" : "OpenAI-Compatible"
  });
}
function Zs(t) {
  return t instanceof Error ? t.message : String(t || "unknown_error");
}
function ea(t = {}) {
  const { state: s, render: n, showToast: i, createRequestId: o = (e = "req") => `${e}-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`, saveConfig: d, pullModels: u = Qs, describeError: g = Zs, getRuntimeSummaryText: f } = t;
  function y() {
    s.configFormSyncPending = !0;
  }
  function p(e, r = "main") {
    const a = String(e || "").trim() || "openai-compatible";
    return r === "delegate" ? `delegate:${a}` : a;
  }
  function U(e, r = "main") {
    return s.pullStateByProvider?.[p(e, r)] || {
      status: "idle",
      message: ""
    };
  }
  function j(e, r, a = "main") {
    s.pullStateByProvider = {
      ...s.pullStateByProvider || {},
      [p(e, a)]: r
    };
  }
  function _(e, r, a = "main") {
    s.modelOptionsByProvider = {
      ...s.modelOptionsByProvider || {},
      [p(e, a)]: Array.isArray(r) ? r : []
    };
  }
  function N(e, r = "main") {
    const a = p(e, r);
    return Array.isArray(s.modelOptionsByProvider?.[a]) ? s.modelOptionsByProvider[a] : [];
  }
  function O(e, r) {
    const a = s.config?.presets || {}, l = P(e || r || "默认");
    return a[l] ? l : r && a[r] ? r : Object.keys(a)[0] || "默认";
  }
  function Z(e, r) {
    const a = O(e, Fe), l = r && typeof r == "object" ? r : L(), c = l.provider || "openai-compatible", S = $(l.modelConfigs || {}), v = S[c] || {}, k = Ae(c, v);
    return {
      delegatePresetName: a,
      delegateProvider: c,
      delegateModelConfigs: S,
      delegateBaseUrl: String(v.baseUrl || ""),
      delegateModel: String(v.model || ""),
      delegateApiKey: String(v.apiKey || ""),
      delegateModelListAuth: D(v.modelListAuth),
      delegateTemperature: I(v.temperature, 1),
      delegateMaxTokens: q(v.maxTokens),
      delegateSendTemperature: Re(v),
      delegateReasoningMode: k.reasoningMode,
      delegateReasoningEffort: k.reasoningEffort,
      delegateReasoningBudgetTokens: k.reasoningBudgetTokens,
      delegateToolMode: v.toolMode || "native"
    };
  }
  function se(e = "openai-compatible", r = {}) {
    const a = $(r || {})[e] || {}, l = Ae(e, a);
    return {
      baseUrl: String(a.baseUrl || ""),
      model: String(a.model || ""),
      apiKey: String(a.apiKey || ""),
      modelListAuth: D(a.modelListAuth),
      temperature: I(a.temperature, 1),
      maxTokens: q(a.maxTokens),
      sendTemperature: Re(a),
      ...l,
      toolMode: a.toolMode || "native"
    };
  }
  function ae(e = "openai-compatible", r = {}) {
    const a = $(r || {})[e] || {}, l = Ae(e, a);
    return {
      delegateBaseUrl: String(a.baseUrl || ""),
      delegateModel: String(a.model || ""),
      delegateApiKey: String(a.apiKey || ""),
      delegateModelListAuth: D(a.modelListAuth),
      delegateTemperature: I(a.temperature, 1),
      delegateMaxTokens: q(a.maxTokens),
      delegateSendTemperature: Re(a),
      delegateReasoningMode: l.reasoningMode,
      delegateReasoningEffort: l.reasoningEffort,
      delegateReasoningBudgetTokens: l.reasoningBudgetTokens,
      delegateToolMode: a.toolMode || "native"
    };
  }
  function R(e, r, a = s.config) {
    const l = P(e || "默认"), c = r && typeof r == "object" ? r : L(), S = c.provider || "openai-compatible", v = $(c.modelConfigs || {}), k = se(S, v), M = O(a?.delegatePresetName, l), T = Z(M, a?.delegateConfig && typeof a.delegateConfig == "object" ? a.delegateConfig : (a?.presets || {})[M] || c);
    return {
      currentPresetName: l,
      presetDraftName: l,
      provider: S,
      modelConfigs: v,
      ...k,
      ...K(a),
      permissionMode: de(c.permissionMode),
      jsApiPermission: Y(a?.jsApiPermission),
      ...T
    };
  }
  function x() {
    if (s.configDraft) return s.configDraft;
    const e = P(s.config?.currentPresetName || "默认");
    return s.configDraft = R(e, (s.config?.presets || {})[e] || L()), s.configDraft;
  }
  function J(e, r = {}) {
    const a = x(), l = r.provider || e.querySelector("#xb-assistant-provider")?.value || a.provider || "openai-compatible", c = r.delegateProvider || e.querySelector("#xb-assistant-delegate-provider")?.value || a.delegateProvider || "openai-compatible", S = e.querySelector("#xb-assistant-base-url")?.value.trim() || "", v = e.querySelector("#xb-assistant-model")?.value.trim() || "", k = e.querySelector("#xb-assistant-delegate-base-url")?.value.trim() ?? a.delegateBaseUrl ?? "", M = e.querySelector("#xb-assistant-delegate-model")?.value.trim() ?? a.delegateModel ?? "", T = bt({
      mode: e.querySelector("#xb-assistant-reasoning-mode")?.value || a.reasoningMode,
      effort: e.querySelector("#xb-assistant-reasoning-effort")?.value || a.reasoningEffort,
      budgetTokens: e.querySelector("#xb-assistant-reasoning-budget")?.value ?? a.reasoningBudgetTokens
    }), V = bt({
      mode: e.querySelector("#xb-assistant-delegate-reasoning-mode")?.value || a.delegateReasoningMode,
      effort: e.querySelector("#xb-assistant-delegate-reasoning-effort")?.value || a.delegateReasoningEffort,
      budgetTokens: e.querySelector("#xb-assistant-delegate-reasoning-budget")?.value ?? a.delegateReasoningBudgetTokens
    }), A = {
      baseUrl: S,
      model: v,
      apiKey: e.querySelector("#xb-assistant-api-key")?.value.trim() || "",
      ...W(l) ? { modelListAuth: D(e.querySelector("#xb-assistant-model-list-auth")?.value ?? a.modelListAuth) } : {},
      temperature: I(e.querySelector("#xb-assistant-temperature")?.value, a.temperature ?? 1),
      maxTokens: q(e.querySelector("#xb-assistant-max-tokens")?.value, a.maxTokens),
      sendTemperature: e.querySelector("#xb-assistant-send-temperature")?.checked ?? !!(a.sendTemperature ?? !0),
      reasoning: T,
      toolMode: le(l) ? e.querySelector("#xb-assistant-tool-mode")?.value || a.toolMode || "native" : void 0
    }, E = {
      baseUrl: k,
      model: M,
      apiKey: e.querySelector("#xb-assistant-delegate-api-key")?.value.trim() ?? a.delegateApiKey ?? "",
      ...W(c) ? { modelListAuth: D(e.querySelector("#xb-assistant-delegate-model-list-auth")?.value ?? a.delegateModelListAuth) } : {},
      temperature: I(e.querySelector("#xb-assistant-delegate-temperature")?.value, a.delegateTemperature ?? 1),
      maxTokens: q(e.querySelector("#xb-assistant-delegate-max-tokens")?.value, a.delegateMaxTokens),
      sendTemperature: e.querySelector("#xb-assistant-delegate-send-temperature")?.checked ?? !!(a.delegateSendTemperature ?? !0),
      reasoning: V,
      toolMode: le(c) ? e.querySelector("#xb-assistant-delegate-tool-mode")?.value || a.delegateToolMode || "native" : void 0
    }, ee = {
      ...$(a.modelConfigs || {}),
      [l]: {
        ...$(a.modelConfigs || {})[l] || {},
        ...A
      }
    }, z = {
      ...$(a.delegateModelConfigs || {}),
      [c]: {
        ...$(a.delegateModelConfigs || {})[c] || {},
        ...E
      }
    };
    return {
      ...a,
      currentPresetName: a.currentPresetName,
      presetDraftName: P(e.querySelector("#xb-assistant-preset-name")?.value),
      provider: l,
      modelConfigs: ee,
      baseUrl: A.baseUrl,
      model: A.model,
      apiKey: A.apiKey,
      modelListAuth: A.modelListAuth,
      temperature: A.temperature,
      maxTokens: A.maxTokens,
      sendTemperature: A.sendTemperature,
      reasoningMode: A.reasoning.mode,
      reasoningEffort: A.reasoning.effort || "",
      reasoningBudgetTokens: A.reasoning.budgetTokens,
      toolMode: A.toolMode || a.toolMode || "native",
      ...Rs(e, a),
      permissionMode: de(e.querySelector("#xb-assistant-permission-mode")?.value || a.permissionMode),
      jsApiPermission: Y(e.querySelector("#xb-assistant-jsapi-permission")?.value || a.jsApiPermission),
      delegatePresetName: O(e.querySelector("#xb-assistant-delegate-preset-select")?.value || a.delegatePresetName, a.currentPresetName),
      delegateProvider: c,
      delegateModelConfigs: z,
      delegateBaseUrl: E.baseUrl,
      delegateModel: E.model,
      delegateApiKey: E.apiKey,
      delegateModelListAuth: E.modelListAuth,
      delegateTemperature: E.temperature,
      delegateMaxTokens: E.maxTokens,
      delegateSendTemperature: E.sendTemperature,
      delegateReasoningMode: E.reasoning.mode,
      delegateReasoningEffort: E.reasoning.effort || "",
      delegateReasoningBudgetTokens: E.reasoning.budgetTokens,
      delegateToolMode: E.toolMode || a.delegateToolMode || "native"
    };
  }
  function m(e, r = {}) {
    return s.configDraft = J(e, r), s.configDirty = !0, s.configDraft;
  }
  function b(e = x()) {
    return {
      baseUrl: String(e.baseUrl || ""),
      model: String(e.model || ""),
      apiKey: String(e.apiKey || ""),
      ...W(e.provider) ? { modelListAuth: D(e.modelListAuth) } : {},
      temperature: I(e.temperature, 1),
      maxTokens: q(e.maxTokens),
      sendTemperature: !!(e.sendTemperature ?? !0),
      reasoning: fe({
        mode: e.reasoningMode,
        effort: e.reasoningEffort,
        budgetTokens: e.reasoningBudgetTokens
      }),
      toolMode: le(e.provider) ? e.toolMode || "native" : void 0
    };
  }
  function h(e = x()) {
    return {
      baseUrl: String(e.delegateBaseUrl || ""),
      model: String(e.delegateModel || ""),
      apiKey: String(e.delegateApiKey || ""),
      ...W(e.delegateProvider) ? { modelListAuth: D(e.delegateModelListAuth) } : {},
      temperature: I(e.delegateTemperature, 1),
      maxTokens: q(e.delegateMaxTokens),
      sendTemperature: !!(e.delegateSendTemperature ?? !0),
      reasoning: fe({
        mode: e.delegateReasoningMode,
        effort: e.delegateReasoningEffort,
        budgetTokens: e.delegateReasoningBudgetTokens
      }),
      toolMode: le(e.delegateProvider) ? e.delegateToolMode || "native" : void 0
    };
  }
  function C(e = x()) {
    const r = e.delegateProvider || "openai-compatible", a = $(e.delegateModelConfigs || {});
    return {
      provider: r,
      modelConfigs: {
        ...a,
        [r]: {
          ...a[r] || {},
          ...h(e)
        }
      }
    };
  }
  function xe(e = x()) {
    return {
      provider: e.provider || "openai-compatible",
      baseUrl: e.baseUrl || "",
      model: e.model || "",
      apiKey: e.apiKey || "",
      ...W(e.provider) ? { modelListAuth: D(e.modelListAuth) } : {},
      ...K(e),
      temperature: e.sendTemperature === !1 ? void 0 : I(e.temperature, 1),
      sendTemperature: !!(e.sendTemperature ?? !0),
      maxTokens: q(e.maxTokens),
      timeoutMs: gt,
      toolMode: e.toolMode || "native",
      reasoning: Pe({
        provider: e.provider,
        baseUrl: e.baseUrl,
        model: e.model,
        maxTokens: q(e.maxTokens)
      }, {
        mode: e.reasoningMode,
        effort: e.reasoningEffort,
        budgetTokens: e.reasoningBudgetTokens
      })
    };
  }
  function $t(e = x()) {
    return {
      provider: e.delegateProvider || "openai-compatible",
      baseUrl: e.delegateBaseUrl || "",
      model: e.delegateModel || "",
      apiKey: e.delegateApiKey || "",
      ...W(e.delegateProvider) ? { modelListAuth: D(e.delegateModelListAuth) } : {},
      ...K(e),
      temperature: e.delegateSendTemperature === !1 ? void 0 : I(e.delegateTemperature, 1),
      sendTemperature: !!(e.delegateSendTemperature ?? !0),
      maxTokens: q(e.delegateMaxTokens),
      timeoutMs: gt,
      toolMode: e.delegateToolMode || "native",
      reasoning: Pe({
        provider: e.delegateProvider,
        baseUrl: e.delegateBaseUrl,
        model: e.delegateModel,
        maxTokens: q(e.delegateMaxTokens)
      }, {
        mode: e.delegateReasoningMode,
        effort: e.delegateReasoningEffort,
        budgetTokens: e.delegateReasoningBudgetTokens
      })
    };
  }
  function Lt(e = {}) {
    const r = [];
    Object.entries(e.presets || {}).forEach(([S, v]) => {
      const k = v?.provider || "openai-compatible", M = v?.modelConfigs?.[k] || {}, T = Pe({
        provider: k,
        baseUrl: M.baseUrl,
        model: M.model,
        maxTokens: q(M.maxTokens)
      }, M.reasoning);
      T.valid === !1 && r.push(`预设“${S}”：${T.error}`);
    });
    const a = e.delegateConfig?.provider || "openai-compatible", l = e.delegateConfig?.modelConfigs?.[a] || {}, c = Pe({
      provider: a,
      baseUrl: l.baseUrl,
      model: l.model,
      maxTokens: q(l.maxTokens)
    }, l.reasoning);
    return c.valid === !1 && r.push(`分身模型：${c.error}`), r;
  }
  function Se(e = {}) {
    const r = (e.role === "delegate", x());
    return e.role === "delegate" ? $t(r) : xe(r);
  }
  function _t(e) {
    x(), s.configDraft = {
      ...s.configDraft,
      presetDraftName: P(e.querySelector("#xb-assistant-preset-name")?.value)
    };
  }
  function It(e = x(), r = e.provider || "openai-compatible", a = "main") {
    const l = U(r, a);
    return typeof f == "function" ? f({
      state: s,
      draft: e,
      provider: r,
      pullState: l,
      providerLabel: mt(r)
    }) : `预设「${e.currentPresetName || "默认"}」 · ${mt(r)}`;
  }
  function Je(e, r, a) {
    const l = e?.querySelector?.(r);
    if (!l) return;
    const c = String(a?.status || "idle"), S = String(a?.message || "").trim();
    l.textContent = S, l.hidden = !S, l.classList.toggle("is-loading", c === "loading"), l.classList.toggle("is-success", c === "success"), l.classList.toggle("is-error", c === "error");
  }
  function Ve(e) {
    if (!e) return;
    const r = ke(s.configPage);
    s.configPage = r, e.querySelectorAll("[data-config-page]").forEach((a) => {
      const l = ke(a?.dataset?.configPage) === r;
      a.classList.toggle("is-active", l), a.setAttribute("aria-selected", l ? "true" : "false");
    }), e.querySelectorAll("[data-config-page-panel]").forEach((a) => {
      const l = ke(a?.dataset?.configPagePanel) === r;
      a.toggleAttribute("hidden", !l);
    }), e.querySelector("#xb-assistant-delete-preset")?.toggleAttribute("hidden", r === "delegate");
  }
  function F(e, r = "main") {
    const a = x(), l = r === "delegate", c = l ? "#xb-assistant-delegate-reasoning" : "#xb-assistant-reasoning", S = l ? a.delegateProvider : a.provider, v = l ? a.delegateBaseUrl : a.baseUrl, k = l ? a.delegateModel : a.model, M = {
      mode: l ? a.delegateReasoningMode : a.reasoningMode,
      effort: l ? a.delegateReasoningEffort : a.reasoningEffort,
      budgetTokens: l ? a.delegateReasoningBudgetTokens : a.reasoningBudgetTokens
    }, T = xt({
      provider: S,
      baseUrl: v,
      model: k
    }), V = Ae(S, {
      baseUrl: v,
      model: k,
      reasoning: M
    }), A = V.reasoningMode, E = V.reasoningEffort, ee = V.reasoningBudgetTokens, z = e.querySelector(`${c}-mode`), ne = e.querySelector(`${c}-capability`), re = e.querySelector(`${c}-effort-wrap`), ie = e.querySelector(`${c}-effort`), oe = e.querySelector(`${c}-budget-wrap`), te = e.querySelector(`${c}-budget`);
    z && (B(z, Qt(T)), z.value = A), ne && (ne.textContent = T.unsupportedReason || `能力配置：${T.profileId}`), ie && (B(ie, es(T)), ie.value = E), re && (re.style.display = A === "on" && T.intensity.kind === "effort" ? "" : "none"), te && T.intensity.kind === "budget" && (te.min = T.intensity.allowAuto ? "-1" : String(T.intensity.min), te.max = String(T.intensity.max), te.value = String(ee)), oe && (oe.style.display = A === "on" && T.intensity.kind === "budget" ? "" : "none");
  }
  function H(e) {
    const r = e.querySelector("#xb-assistant-runtime");
    if (!r) return;
    const a = x(), l = s.configPage === "delegate", c = l ? a.delegateProvider : a.provider;
    r.textContent = It(l ? {
      ...a,
      currentPresetName: "分身",
      provider: c
    } : a, c || "openai-compatible", l ? "delegate" : "main");
  }
  function Xe(e, r, a, l = "main") {
    const c = l === "delegate" ? "#xb-assistant-delegate" : "#xb-assistant", S = e.querySelector(`${c}-model-list-auth-wrap`), v = e.querySelector(`${c}-model-list-auth`);
    S && (S.style.display = W(r) ? "" : "none"), v && (B(v, as), v.value = D(a));
  }
  function Ye(e) {
    if (!s.config) return;
    Ve(e);
    const r = x(), a = r.provider || "openai-compatible", l = N(a), c = r.delegateProvider || "openai-compatible", S = N(c, "delegate"), v = e.querySelector("#xb-assistant-provider"), k = e.querySelector("#xb-assistant-base-url"), M = e.querySelector("#xb-assistant-model"), T = e.querySelector("#xb-assistant-api-key"), V = e.querySelector("#xb-assistant-temperature"), A = e.querySelector("#xb-assistant-send-temperature"), E = e.querySelector("#xb-assistant-tool-mode-wrap"), ee = e.querySelector("#xb-assistant-tool-mode"), z = e.querySelector("#xb-assistant-permission-mode"), ne = e.querySelector("#xb-assistant-jsapi-permission"), re = e.querySelector("#xb-assistant-model-pulled"), ie = e.querySelector("#xb-assistant-max-tokens"), oe = e.querySelector("#xb-assistant-preset-select"), te = e.querySelector("#xb-assistant-preset-name"), we = e.querySelector("#xb-assistant-delegate-preset-select"), et = e.querySelector("#xb-assistant-delegate-provider"), tt = e.querySelector("#xb-assistant-delegate-base-url"), st = e.querySelector("#xb-assistant-delegate-model"), at = e.querySelector("#xb-assistant-delegate-api-key"), Oe = e.querySelector("#xb-assistant-delegate-model-pulled"), nt = e.querySelector("#xb-assistant-delegate-max-tokens"), rt = e.querySelector("#xb-assistant-delegate-tool-mode-wrap"), $e = e.querySelector("#xb-assistant-delegate-tool-mode");
    if (!oe || !te) return;
    const it = (s.config.presetNames || []).map((X) => ({
      value: X,
      label: X
    }));
    B(oe, it), oe.value = r.currentPresetName || s.config.currentPresetName || "默认", we && (B(we, it), we.value = O(r.delegatePresetName, r.currentPresetName)), te.value = r.presetDraftName || r.currentPresetName || "默认", v && (v.value = a), k && (k.value = r.baseUrl || ""), M && (M.value = r.model || ""), T && (T.value = r.apiKey || ""), Xe(e, a, r.modelListAuth), ie && (ie.value = String(q(r.maxTokens))), V && (V.value = String(I(r.temperature, 1))), A && (A.checked = !!(r.sendTemperature ?? !0)), ft(e, r), E && (E.style.display = le(a) ? "" : "none"), ee && (B(ee, pt), ee.value = r.toolMode || "native"), z && (B(z, rs), z.value = de(r.permissionMode)), ne && (B(ne, is), ne.value = Y(r.jsApiPermission)), F(e), re && (B(re, l.map((X) => ({
      value: X,
      label: X
    })), "手动填写"), re.value = l.includes(r.model) ? r.model : ""), et && (et.value = c), tt && (tt.value = r.delegateBaseUrl || ""), st && (st.value = r.delegateModel || ""), at && (at.value = r.delegateApiKey || ""), Xe(e, c, r.delegateModelListAuth, "delegate");
    const ot = e.querySelector("#xb-assistant-delegate-temperature"), lt = e.querySelector("#xb-assistant-delegate-send-temperature");
    nt && (nt.value = String(q(r.delegateMaxTokens))), ot && (ot.value = String(I(r.delegateTemperature, 1))), lt && (lt.checked = !!(r.delegateSendTemperature ?? !0)), rt && (rt.style.display = le(c) ? "" : "none"), $e && (B($e, pt), $e.value = r.delegateToolMode || "native"), F(e, "delegate"), Oe && (B(Oe, S.map((X) => ({
      value: X,
      label: X
    })), "手动填写"), Oe.value = S.includes(r.delegateModel) ? r.delegateModel : ""), Je(e, "#xb-assistant-model-pull-status", U(a)), Je(e, "#xb-assistant-delegate-model-pull-status", U(c, "delegate")), H(e);
  }
  function Dt(e) {
    if (typeof d != "function") return;
    const r = d(e);
    r && typeof r.catch == "function" && r.catch((a) => {
      i?.(g(a));
    });
  }
  function Ne(e, r, a) {
    e.querySelector(r)?.addEventListener("click", () => {
      const l = e.querySelector(a);
      l && (l.type = l.type === "password" ? "text" : "password");
    });
  }
  function Ut(e) {
    return {
      workspaceFileName: e?.workspaceFileName || "",
      jsApiPermission: Y(e?.jsApiPermission),
      ...K(e),
      currentPresetName: e?.currentPresetName || "默认",
      delegatePresetName: e?.delegatePresetName || e?.currentPresetName || "默认",
      delegateConfig: e?.delegateConfig || {},
      delegateConfigured: e?.delegateConfigured === !0,
      presets: e?.presets || {}
    };
  }
  function Qe(e, r = {}) {
    const a = qe(e), l = Lt(a);
    if (l.length)
      return i?.(l[0]), !1;
    s.config = a;
    const c = P(r.presetName || a.currentPresetName || "默认");
    return s.configDraft = R(c, a.presets?.[c] || L(), a), y(), Dt({
      requestId: o(r.requestPrefix || "save-config"),
      config: a,
      payload: Ut(a)
    }), !0;
  }
  function he(e, r = {}) {
    const a = m(e), l = P(r.presetName || a.presetDraftName), c = P(a.currentPresetName || s.config?.currentPresetName || "默认"), S = (s.config?.presets || {})[c] || L(), v = $(a.modelConfigs || S.modelConfigs || {}), k = {
      ...S,
      provider: a.provider,
      permissionMode: de(a.permissionMode),
      modelConfigs: {
        ...v,
        [a.provider]: {
          ...v[a.provider] || {},
          ...b(a)
        }
      }
    }, M = { ...s.config?.presets || {} };
    r.renameCurrentPreset && l !== c && delete M[c], M[l] = k, Qe({
      ...s.config,
      jsApiPermission: Y(a.jsApiPermission),
      ...K(a),
      currentPresetName: l,
      delegatePresetName: O(a.delegatePresetName, l),
      delegateConfig: C(a),
      delegateConfigured: r.configureDelegate === !0 || s.config?.delegateConfigured === !0,
      presets: M
    }, {
      presetName: l,
      requestPrefix: r.requestPrefix
    });
  }
  function Ze(e, r = "") {
    const a = P(r || "默认"), l = typeof window < "u" && typeof window.prompt == "function" ? window.prompt(e, a) : a;
    return l === null ? "" : P(l);
  }
  function Rt(e) {
    const r = Ze("输入新预设名称：", `${m(e).currentPresetName || "默认"} 副本`);
    if (!r) {
      i?.("预设名称不能为空");
      return;
    }
    const a = e.querySelector("#xb-assistant-preset-name");
    a && (a.value = r, he(e, {
      presetName: r,
      requestPrefix: "create-preset"
    }));
  }
  function Bt(e) {
    const r = m(e), a = P(r.currentPresetName || s.config?.currentPresetName || "默认"), l = Ze("输入预设名称：", r.presetDraftName || a);
    if (!l) {
      i?.("预设名称不能为空");
      return;
    }
    if (l === a) return;
    const c = e.querySelector("#xb-assistant-preset-name");
    c && (c.value = l, he(e, {
      presetName: l,
      renameCurrentPreset: !0,
      requestPrefix: "rename-preset"
    }));
  }
  function jt(e) {
    if (Object.keys(s.config?.presets || {}).length <= 1) {
      i?.("至少要保留一套预设");
      return;
    }
    const r = m(e), a = P(s.configDraft?.currentPresetName || s.config?.currentPresetName || "默认"), l = { ...s.config?.presets || {} };
    delete l[a];
    const c = Object.keys(l)[0] || "默认";
    Qe({
      ...s.config,
      jsApiPermission: Y(r.jsApiPermission),
      ...K(r),
      currentPresetName: c,
      delegatePresetName: O(r.delegatePresetName, c),
      delegateConfig: C(r),
      presets: l
    }, {
      presetName: c,
      requestPrefix: "delete-preset"
    }) && n?.();
  }
  function Ft(e) {
    if (e?.querySelector?.("#xb-assistant-provider")) {
      e.querySelector("#xb-assistant-provider")?.addEventListener("change", (r) => {
        const a = r.currentTarget.value, l = x().provider, c = m(e, { provider: l });
        s.configDraft = {
          ...c,
          provider: a,
          ...se(a, c.modelConfigs)
        }, y(), n?.();
      }), e.querySelector("#xb-assistant-preset-select")?.addEventListener("change", (r) => {
        const a = P(r.currentTarget.value), l = (s.config?.presets || {})[a] || L(), c = m(e);
        s.config = qe({
          ...s.config,
          ...K(c),
          jsApiPermission: Y(c.jsApiPermission),
          currentPresetName: a,
          delegatePresetName: O(c.delegatePresetName, a),
          delegateConfig: C(c)
        }), s.configDraft = R(a, l, s.config), y(), n?.();
      }), e.querySelector("#xb-assistant-preset-name")?.addEventListener("input", () => {
        _t(e);
      }), e.querySelector("#xb-assistant-base-url")?.addEventListener("input", () => {
        m(e), F(e), H(e);
      }), e.querySelector("#xb-assistant-model")?.addEventListener("input", () => {
        m(e), F(e), H(e);
      }), e.querySelector("#xb-assistant-api-key")?.addEventListener("input", () => {
        m(e);
      });
      for (const r of ["#xb-assistant", "#xb-assistant-delegate"]) e.querySelector(`${r}-model-list-auth`)?.addEventListener("change", () => {
        m(e);
      });
      e.querySelector("#xb-assistant-max-tokens")?.addEventListener("input", () => {
        m(e);
      }), e.querySelector("#xb-assistant-temperature")?.addEventListener("input", () => {
        m(e);
      }), e.querySelector("#xb-assistant-send-temperature")?.addEventListener("change", () => {
        m(e);
      }), e.querySelector("#xb-assistant-web-provider")?.addEventListener("change", () => {
        ft(e, m(e));
      });
      for (const { id: r } of Q)
        e.querySelector(`#xb-assistant-${r}-api-key`)?.addEventListener("input", () => m(e)), Ne(e, `#xb-assistant-toggle-${r}-key`, `#xb-assistant-${r}-api-key`);
      e.querySelector("#xb-assistant-model-pulled")?.addEventListener("change", (r) => {
        const a = r.currentTarget.value;
        if (!a) return;
        const l = e.querySelector("#xb-assistant-model");
        l && (l.value = a), m(e), F(e), H(e);
      }), Ne(e, "#xb-assistant-toggle-key", "#xb-assistant-api-key"), e.querySelector("#xb-assistant-delegate-provider")?.addEventListener("change", (r) => {
        const a = r.currentTarget.value, l = x().delegateProvider, c = m(e, { delegateProvider: l });
        s.configDraft = {
          ...c,
          delegateProvider: a,
          ...ae(a, c.delegateModelConfigs)
        }, y(), n?.();
      }), e.querySelector("#xb-assistant-delegate-base-url")?.addEventListener("input", () => {
        m(e), F(e, "delegate"), H(e);
      }), e.querySelector("#xb-assistant-delegate-model")?.addEventListener("input", () => {
        m(e), F(e, "delegate"), H(e);
      }), e.querySelector("#xb-assistant-delegate-api-key")?.addEventListener("input", () => {
        m(e);
      }), e.querySelector("#xb-assistant-delegate-max-tokens")?.addEventListener("input", () => {
        m(e);
      }), e.querySelector("#xb-assistant-delegate-temperature")?.addEventListener("input", () => {
        m(e);
      }), e.querySelector("#xb-assistant-delegate-send-temperature")?.addEventListener("change", () => {
        m(e);
      }), e.querySelector("#xb-assistant-delegate-model-pulled")?.addEventListener("change", (r) => {
        const a = r.currentTarget.value;
        if (!a) return;
        const l = e.querySelector("#xb-assistant-delegate-model");
        l && (l.value = a), m(e), F(e, "delegate"), H(e);
      }), Ne(e, "#xb-assistant-delegate-toggle-key", "#xb-assistant-delegate-api-key"), e.querySelector("#xb-assistant-reasoning-mode")?.addEventListener("change", () => {
        m(e), F(e), H(e);
      }), e.querySelector("#xb-assistant-reasoning-effort")?.addEventListener("change", () => {
        m(e);
      }), e.querySelector("#xb-assistant-reasoning-budget")?.addEventListener("input", () => {
        m(e);
      }), e.querySelector("#xb-assistant-tool-mode")?.addEventListener("change", () => {
        m(e);
      }), e.querySelector("#xb-assistant-delegate-reasoning-mode")?.addEventListener("change", () => {
        m(e), F(e, "delegate"), H(e);
      }), e.querySelector("#xb-assistant-delegate-reasoning-effort")?.addEventListener("change", () => {
        m(e);
      }), e.querySelector("#xb-assistant-delegate-reasoning-budget")?.addEventListener("input", () => {
        m(e);
      }), e.querySelector("#xb-assistant-delegate-tool-mode")?.addEventListener("change", () => {
        m(e);
      }), e.querySelector("#xb-assistant-permission-mode")?.addEventListener("change", () => {
        m(e);
      }), e.querySelector("#xb-assistant-jsapi-permission")?.addEventListener("change", () => {
        m(e);
      }), e.querySelector("#xb-assistant-delegate-preset-select")?.addEventListener("change", (r) => {
        const a = O(r.currentTarget?.value, s.configDraft?.currentPresetName || s.config?.currentPresetName || "默认"), l = (s.config?.presets || {})[a] || L();
        s.configDraft = {
          ...m(e),
          ...Z(a, l)
        }, y(), n?.();
      }), e.querySelectorAll("[data-config-page]").forEach((r) => {
        r.addEventListener("click", (a) => {
          m(e), s.configPage = ke(a.currentTarget?.dataset?.configPage), Ve(e), Ye(e);
        });
      }), e.querySelector("#xb-assistant-pull-models")?.addEventListener("click", async () => {
        m(e), y();
        const r = Se();
        j(r.provider, {
          status: "loading",
          message: "正在拉取模型列表…"
        }), n?.();
        try {
          const a = await u(r);
          _(r.provider, a), j(r.provider, {
            status: "success",
            message: `已拉取 ${a.length} 个模型`
          });
        } catch (a) {
          _(r.provider, []), j(r.provider, {
            status: "error",
            message: g(a)
          });
        }
        y(), n?.();
      }), e.querySelector("#xb-assistant-delegate-pull-models")?.addEventListener("click", async () => {
        m(e), y();
        const r = Se({ role: "delegate" });
        j(r.provider, {
          status: "loading",
          message: "正在拉取模型列表…"
        }, "delegate"), n?.();
        try {
          const a = await u(r);
          _(r.provider, a, "delegate"), j(r.provider, {
            status: "success",
            message: `已拉取 ${a.length} 个模型`
          }, "delegate");
        } catch (a) {
          _(r.provider, [], "delegate"), j(r.provider, {
            status: "error",
            message: g(a)
          }, "delegate");
        }
        y(), n?.();
      }), e.querySelector("#xb-assistant-new-preset")?.addEventListener("click", () => {
        Rt(e);
      }), e.querySelector("#xb-assistant-rename-preset")?.addEventListener("click", () => {
        Bt(e);
      }), e.querySelector("#xb-assistant-save")?.addEventListener("click", () => {
        he(e);
      }), e.querySelector("#xb-assistant-delegate-save")?.addEventListener("click", () => {
        he(e, {
          requestPrefix: "save-delegate-config",
          configureDelegate: !0
        });
      }), e.querySelector("#xb-assistant-delete-preset")?.addEventListener("click", () => {
        jt(e);
      });
    }
  }
  return {
    getActiveProviderConfig: Se,
    getActiveProviderConfigFromForm(e, r = {}) {
      return s.configDraft = J(e), Se(r);
    },
    syncConfigToForm: Ye,
    bindSettingsPanelEvents: Ft
  };
}
function Me(t = "") {
  return String(t || "").replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#39;");
}
function vt(t = "main") {
  const s = t === "delegate" ? "xb-assistant-delegate" : "xb-assistant";
  return `<label id="${s}-model-list-auth-wrap" style="display: none">
        <span>模型列表鉴权</span>
        <select id="${s}-model-list-auth"></select>
    </label>`;
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
function ta(t = {}) {
  const s = String(t?.status || "idle");
  return s === "saving" ? "saving" : s === "success" ? "success" : s === "error" ? "error" : "save";
}
function sa(t = {}) {
  const s = String(t?.status || "idle");
  return s === "saving" ? {
    className: "xb-assistant-save-button is-saving",
    title: "正在保存配置"
  } : s === "success" ? {
    className: "xb-assistant-save-button is-success",
    title: "配置已保存"
  } : s === "error" ? {
    className: "xb-assistant-save-button is-error",
    title: Me(t?.error || "保存失败")
  } : {
    className: "xb-assistant-save-button",
    title: "保存配置"
  };
}
function aa(t = {}) {
  const { configSave: s = {}, runtimeText: n = "", inlineToastText: i = "", showInlineToast: o = !0, showAssistantPermissions: d = !0, showDelegateSettings: u = !0, showWebSettings: g = !0, activePage: f = "main", delegatePresetHint: y = "DelegateRun 分身会使用这里的独立 API 配置；可以和主助手使用不同 Provider、Base URL、模型和 Tool 调用格式。", isBusy: p = !1, canDeletePreset: U = !0, configLoadError: j = "" } = t, _ = String(j || "").trim(), N = sa(s), O = ta(s), Z = p || _ || String(s?.status || "") === "saving" ? "disabled" : "", se = p || !U ? "disabled" : "", ae = f === "delegate" ? "delegate" : "main", R = ae === "main", x = ae === "delegate", J = d ? `
            <label>
                <span>斜杠命令权限</span>
                <select id="xb-assistant-permission-mode"></select>
            </label>
            <label>
                <span>JavaScript API 权限</span>
                <select id="xb-assistant-jsapi-permission"></select>
            </label>` : "", m = u ? `
            <div class="xb-assistant-config-tabs" role="tablist" aria-label="API 配置分页">
                <button id="xb-assistant-config-tab-main" type="button" class="xb-assistant-config-tab ${R ? "is-active" : ""}" data-config-page="main" role="tab" aria-selected="${R ? "true" : "false"}">主助手 API</button>
                <button id="xb-assistant-config-tab-delegate" type="button" class="xb-assistant-config-tab ${x ? "is-active" : ""}" data-config-page="delegate" role="tab" aria-selected="${x ? "true" : "false"}">分身 API</button>
            </div>` : "", b = u ? `
            <div class="xb-assistant-config-page" data-config-page-panel="delegate" ${x ? "" : "hidden"}>
                <p class="xb-assistant-config-note">${Me(y)}</p>
                <div class="xb-assistant-preset-row">
                    <select id="xb-assistant-delegate-preset-select" class="xb-assistant-preset-field" aria-label="已存预设"></select>
                    <div class="xb-assistant-preset-tools is-single" aria-label="分身 API 预设操作">
                        <button id="xb-assistant-delegate-save" type="button" class="xb-assistant-icon-button ${N.className}" title="${N.title}" aria-label="${N.title}" ${Z}>${pe(O)}</button>
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
                ${vt("delegate")}
                <div class="xb-assistant-inline-input xb-assistant-model-row">
                    <label class="xb-assistant-grow">
                        <span>已拉取模型</span>
                        <select id="xb-assistant-delegate-model-pulled">
                            <option value="">手动填写</option>
                        </select>
                    </label>
                    <button id="xb-assistant-delegate-pull-models" type="button" class="secondary" ${p ? "disabled" : ""}>拉取模型</button>
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
            <fieldset class="xb-assistant-config-fields" data-xb-agent-config-fields ${_ ? "disabled" : ""}>
            ${m}
            <div class="xb-assistant-config-page" data-config-page-panel="main" ${R ? "" : "hidden"}>
            <div class="xb-assistant-preset-row">
                <select id="xb-assistant-preset-select" class="xb-assistant-preset-field" aria-label="已存预设"></select>
                <input id="xb-assistant-preset-name" type="hidden" />
                <div class="xb-assistant-preset-tools" aria-label="API 预设操作">
                    <button id="xb-assistant-new-preset" type="button" class="xb-assistant-icon-button" title="新增预设" aria-label="新增预设" ${p ? "disabled" : ""}>${pe("add")}</button>
                    <button id="xb-assistant-rename-preset" type="button" class="xb-assistant-icon-button" title="重命名预设" aria-label="重命名预设" ${p ? "disabled" : ""}>${pe("rename")}</button>
                    <button id="xb-assistant-save" type="button" class="xb-assistant-icon-button ${N.className}" title="${N.title}" aria-label="${N.title}" ${Z}>${pe(O)}</button>
                    <button id="xb-assistant-delete-preset" type="button" class="xb-assistant-icon-button" title="删除预设" aria-label="删除预设" ${se}>${pe("delete")}</button>
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
            ${vt()}
            <div class="xb-assistant-inline-input xb-assistant-model-row">
                <label class="xb-assistant-grow">
                    <span>已拉取模型</span>
                    <select id="xb-assistant-model-pulled">
                        <option value="">手动填写</option>
                    </select>
                </label>
                <button id="xb-assistant-pull-models" type="button" class="secondary" ${p ? "disabled" : ""}>拉取模型</button>
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
            ${g ? Us() : ""}
            <label id="xb-assistant-tool-mode-wrap">
                <span>Tool 调用格式</span>
                <select id="xb-assistant-tool-mode"></select>
            </label>
            ${J}
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
            ${b}
            <div class="xb-assistant-runtime" id="xb-assistant-runtime">${Me(n)}</div>
            </fieldset>
            ${o ? `<div class="xb-assistant-toast xb-assistant-toast-inline" id="xb-assistant-toast" aria-live="polite">${Me(_ || i)}</div>` : ""}
        </section>
    `;
}
var na = { class: "agent-api-app" }, ra = { class: "agent-api-scroll" }, ia = { class: "agent-api-content" }, oa = {
  key: 0,
  class: "agent-api-state",
  "aria-live": "polite"
}, la = {
  key: 1,
  class: "agent-api-state is-error",
  role: "alert"
}, da = {
  class: "agent-api-panel xb-agent-settings-surface",
  "aria-label": "API 设置"
}, ua = { "aria-live": "polite" }, ca = ["disabled"], yt = 13e4, ga = /* @__PURE__ */ Jt({
  __name: "AgentApiApp",
  props: {
    bridge: {},
    initialState: {}
  },
  setup(t) {
    const s = t, n = structuredClone(dt(s.initialState)), i = Te(n), o = Te(null), d = Te("idle"), u = Te("连接尚未测试");
    let g = () => {
    }, f = null, y = 0;
    const p = Gt({
      config: null,
      configDraft: null,
      configDirty: !1,
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
    }), U = _e(() => i.value.status === "ready" && p.config !== null), j = _e(() => Object.keys(p.config?.presets || {}).length), _ = _e(() => d.value === "testing");
    function N(b) {
      const h = b instanceof Error ? b.message : String(b || "unknown_error");
      return h === "host_request_timeout" ? "暂时没收到结果，请检查网络后重试。" : h === "app_inactive" ? "页面已经关闭。" : h;
    }
    function O() {
      f && clearTimeout(f), f = setTimeout(() => {
        p.configSave = {
          status: "idle",
          requestId: "",
          error: ""
        }, p.inlineToastText = "", x();
      }, 1800);
    }
    async function Z(b) {
      const h = b.payload || {};
      p.configSave = {
        status: "saving",
        requestId: "",
        error: ""
      }, p.inlineToastText = "正在保存设置…", x();
      try {
        const C = (await s.bridge.request("agent-api/save", { patch: h }, 35e3)).result;
        if (C.ok !== !0 || !C.config) throw new Error(C.error || "模型设置保存失败");
        p.config = qe(C.config), p.configDraft = null, p.configDirty = !1, p.configFormSyncPending = !0, p.configSave = {
          status: "success",
          requestId: "",
          error: ""
        }, p.inlineToastText = "设置已保存";
      } catch (C) {
        const xe = N(C);
        p.configSave = {
          status: "error",
          requestId: "",
          error: xe
        }, p.inlineToastText = xe;
      }
      x(), O();
    }
    async function se() {
      const b = ++y;
      try {
        const h = await s.bridge.request("agent-api/reload", {}, 35e3);
        if (b !== y) return;
        J(h.result);
      } catch (h) {
        if (b !== y) return;
        i.value = {
          status: "error",
          config: null,
          message: N(h)
        }, x();
      }
    }
    async function ae(b) {
      return (await s.bridge.request("agent-api/pull-models", { providerConfig: b }, yt)).result.models;
    }
    const R = ea({
      state: p,
      render: x,
      saveConfig: Z,
      pullModels: ae,
      describeError: N
    });
    function x() {
      const b = o.value;
      !b || !p.config || (b.innerHTML = aa({
        configSave: p.configSave,
        inlineToastText: p.inlineToastText,
        showAssistantPermissions: !1,
        showDelegateSettings: !1,
        showWebSettings: !0,
        canDeletePreset: j.value > 1
      }), R.syncConfigToForm(b), R.bindSettingsPanelEvents(b));
    }
    function J(b) {
      i.value = structuredClone(b), b.status === "ready" && b.config && (p.config = qe(b.config), p.configDraft = null, p.configDirty = !1, p.configFormSyncPending = !0), Wt(x);
    }
    async function m() {
      const b = o.value;
      if (!b || !U.value || _.value) return;
      const h = R.getActiveProviderConfigFromForm(b);
      d.value = "testing", u.value = "正在测试当前填写的连接…";
      try {
        const C = (await s.bridge.request("agent-api/test-connection", { providerConfig: structuredClone(dt(h)) }, yt)).result;
        d.value = "success", u.value = `${C.provider || "当前服务"} · ${C.model || "当前模型"} · ${C.latencyMs} 毫秒`;
      } catch (C) {
        d.value = "error", u.value = N(C);
      }
    }
    return Kt(() => {
      g = s.bridge.subscribe((b) => {
        b.type === "agent-api/state" && J(b.payload.state);
      }), J(n);
    }), zt(() => {
      y += 1, g(), f && clearTimeout(f);
    }), (b, h) => (Le(), De("main", na, [w("div", ra, [w("div", ia, [
      h[2] || (h[2] = w("header", { class: "agent-api-header" }, [w("h1", null, "API 设置"), w("p", null, "与小白助手等功能共用主预设")], -1)),
      i.value.status === "loading" ? (Le(), De("section", oa, " 正在加载设置 ")) : i.value.status === "error" ? (Le(), De("section", la, [w("div", null, [h[1] || (h[1] = w("strong", null, "设置暂时无法加载", -1)), w("span", null, Ie(i.value.message), 1)]), w("button", {
        type: "button",
        onClick: h[0] || (h[0] = (C) => se())
      }, "重新加载")])) : Ht("", !0),
      Xt(w("section", da, [w("div", {
        ref_key: "panelRoot",
        ref: o
      }, null, 512), w("div", { class: Yt(["agent-api-connection", `is-${d.value}`]) }, [w("p", ua, Ie(u.value), 1), w("button", {
        type: "button",
        disabled: !U.value || _.value,
        onClick: m
      }, Ie(_.value ? "测试中…" : "测试当前连接"), 9, ca)], 2)], 512), [[Vt, U.value]])
    ])])]));
  }
}), va = ga;
export {
  va as default
};
