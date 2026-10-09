/* eslint-disable */
import { B as v, D as f, E as _, Z as k, b as w, dt as E, rt as j, s as x, v as C, x as P, y as b } from "./xiaobai-os-app-navigation-DbF27MCy.js";
import { T as I, t as M, w as N } from "./xiaobai-os-MapBrowser-COaYif7n.js";
var A = {
  key: 0,
  class: "map-notice",
  role: "status"
}, B = /* @__PURE__ */ _({
  __name: "MapProjection",
  props: {
    map: {},
    chatIdentity: {},
    message: {}
  },
  setup(t) {
    return (s, i) => (v(), b(M, {
      compact: "",
      class: "map-projection-view",
      map: t.map,
      "chat-identity": t.chatIdentity
    }, {
      feedback: k(() => [t.message ? (v(), P("aside", A, [C("p", null, E(t.message), 1)])) : w("", !0)]),
      _: 1
    }, 8, ["map", "chat-identity"]));
  }
}), L = B, O = ":host{--map-projection-height:clamp(260px,50cqw,280px)}.map-projection-root{display:none}.map-projection-loading{box-sizing:border-box;height:var(--map-projection-height);font:inherit;color:inherit;text-align:center;place-items:center;padding:16px;display:grid}";
function V(t) {
  t.replaceChildren();
  const s = t.attachShadow({ mode: "open" }), i = document.createElement("style");
  i.textContent = O;
  const a = document.createElement("link");
  a.rel = "stylesheet", a.href = new URL(
    /* @vite-ignore */
    "xiaobai-os-app.css",
    import.meta.url
  ).href;
  const o = document.createElement("div");
  o.className = "map-projection-root";
  const n = document.createElement("div");
  n.className = "map-projection-loading", n.setAttribute("role", "status"), n.textContent = N.loading, s.append(i, a, n, o);
  const r = j({
    map: null,
    chatIdentity: "",
    message: ""
  });
  let c = "";
  const p = x({ render: () => f(L, r) });
  let m = !0;
  const l = () => {
    m && (m = !1, p.unmount());
  }, d = () => {
    l(), o.remove(), a.remove(), n.setAttribute("role", "alert"), n.textContent = I.loadFailed;
  }, u = [
    "keydown",
    "keyup",
    "keypress",
    "pointerdown",
    "pointermove",
    "pointerup",
    "mousedown",
    "mousemove",
    "mouseup",
    "touchstart",
    "touchmove",
    "touchend",
    "click",
    "dblclick",
    "wheel",
    "contextmenu"
  ], h = (e) => e.stopPropagation();
  for (const e of u) o.addEventListener(e, h);
  return a.addEventListener("error", d), p.mount(o), {
    update(e, y) {
      o.classList.toggle("theme-dark", y === "dark");
      const g = JSON.stringify(e.map);
      g !== c && (r.map = e.map, c = g), r.chatIdentity = e.chatIdentity, r.message = e.message;
    },
    dispose() {
      a.removeEventListener("error", d);
      for (const e of u) o.removeEventListener(e, h);
      l(), s.replaceChildren();
    }
  };
}
export {
  V as mountMapProjection
};
