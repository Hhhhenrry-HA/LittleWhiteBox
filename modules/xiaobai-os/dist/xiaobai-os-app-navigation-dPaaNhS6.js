/* eslint-disable */
import { C as f, E as v, U as d } from "./xiaobai-os-runtime-dom.esm-bundler-BeaorYpU.js";
var m = /* @__PURE__ */ Symbol("app-navigation");
function l(e) {
  return e.isConnected && !e.matches(":disabled") && !e.closest("[inert]") && e.getClientRects().length > 0 && getComputedStyle(e).visibility !== "hidden";
}
function p(e) {
  for (const c of [
    "[autofocus]",
    'button, [href], input, textarea, select, summary, [tabindex]:not([tabindex="-1"])',
    '[tabindex="-1"]'
  ]) for (const t of e.querySelectorAll(c))
    if (l(t) && (t.focus({ preventScroll: !0 }), t.ownerDocument.activeElement === t))
      return;
  e.focus({ preventScroll: !0 });
}
function i(e, c = null) {
  const t = e?.root.value;
  queueMicrotask(() => {
    v(() => {
      if (t && (!t.isConnected || e?.root.value !== t)) return;
      const n = document.activeElement;
      if (n instanceof HTMLElement && n !== document.body && l(n)) return;
      const o = e?.layers.value.at(-1);
      c instanceof HTMLElement && l(c) && (!t || t.contains(c)) && (!o || o.contains(c)) && (c.focus({ preventScroll: !0 }), document.activeElement === c) || (o ? p(o) : t?.focus({ preventScroll: !0 }));
    });
  });
}
function y(e, c = () => !0) {
  const t = f(m, null), n = (o = null) => {
    const u = e();
    return u && i(t, o), u;
  };
  return d(c, (o, u, r) => {
    if (o && t) {
      const a = document.activeElement, s = t.stack.add(() => n(a));
      r(() => {
        s(), i(t, a);
      });
    }
  }, {
    immediate: !0,
    flush: "sync"
  }), () => t ? t.stack.back() : n();
}
function E(e, c, t = () => !0) {
  const n = f(m, null);
  y(() => (c(), !0), () => !!e.value), d(() => t() ? e.value : null, async (o, u, r) => {
    if (!o) return;
    const a = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    n && (n.layers.value = [...n.layers.value, o]), r(() => {
      n && (n.layers.value = n.layers.value.filter((s) => s !== o)), i(n, a);
    }), await v(), !(!o.isConnected || n && n.layers.value.at(-1) !== o) && p(o);
  }, { flush: "post" });
}
export {
  y as n,
  E as r,
  m as t
};
