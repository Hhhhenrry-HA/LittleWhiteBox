/* eslint-disable */
import { i as g } from "./xiaobai-os-reasoning-capabilities-jekAYzl_.js";
function _(n = {}, t = [], o = g(n, n.reasoning)) {
  return n.provider === "openai-compatible" && n.toolMode !== "tagged-json" && Array.isArray(t) && t.length > 0 && o.profileId === "deepseek-thinking" && o.mode !== "off";
}
function v(n = []) {
  for (let t = n.length - 1; t >= 0; t -= 1) if (n[t]?.role === "user") return t;
  return -1;
}
function T(n, t, o) {
  return t > o && Array.isArray(n?.tool_calls) && n.tool_calls.some((i) => String(i?.function?.name || "").trim());
}
var h = 3.35, A = new TextEncoder();
function m(n = [], t = [], o = {}) {
  const i = _(o, t), p = ["openai-compatible", "sillytavern-openai-compatible"].includes(o.provider) && !(o.toolMode === "tagged-json" && t.length), y = v(n);
  return n.map((e, f) => {
    const l = e.role === "assistant" ? e.providerPayload : null, c = ["google", "sillytavern-google"].includes(o.provider) ? l?.googleContents || l?.googleContent : ["anthropic", "sillytavern-claude"].includes(o.provider) ? l?.anthropicContent : o.provider === "openai-responses" ? l?.openAIResponseOutput : null;
    if (c) return {
      role: e.role,
      content: JSON.stringify(c)
    };
    const a = e.role === "assistant" ? e.providerPayload?.openaiCompatibleMessage : null, s = typeof a?.reasoning_content == "string" && (i || p && T(a, f, y)) ? a.reasoning_content : "", u = s ? { reasoning_content: s } : {}, d = Array.isArray(e.content) ? e.content.map((r) => !r || typeof r != "object" ? "" : r.type === "text" ? r.text || "" : r.type === "image_url" ? `[image:${r.name || r.mimeType || "image"}]` : "").filter(Boolean).join(`
`) : e.content || "";
    return e.role === "assistant" && Array.isArray(e.tool_calls) && e.tool_calls.length ? {
      role: "assistant",
      content: [d, e.tool_calls.map((r) => JSON.stringify({
        id: r.id,
        name: r.function?.name || "",
        arguments: r.function?.arguments || "{}"
      })).join(`
`)].filter(Boolean).join(`
`),
      ...u
    } : e.role === "tool" ? {
      role: "tool",
      content: [e.tool_call_id || "", e.content || ""].filter(Boolean).join(`
`)
    } : {
      role: e.role,
      content: d,
      ...u
    };
  });
}
function x(n = [], t = [], o = {}) {
  return [...m(n, t, o), {
    role: "system",
    content: t.length ? `TOOLS
${JSON.stringify(t)}` : ""
  }].filter((i) => i.content || i.reasoning_content);
}
function O(n = "") {
  return Math.ceil(A.encode(String(n || "")).length / h);
}
function E({ messages: n = [], tools: t = [], providerConfig: o = {} } = {}) {
  return O(JSON.stringify(x(n, t, o)));
}
export {
  O as n,
  E as t
};
