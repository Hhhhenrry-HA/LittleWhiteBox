/* eslint-disable */
import { B as h, D as f, E as y, Z as g, b as _, dt as k, rt as w, s as E, v as C, x as P, y as I } from "./xiaobai-os-app-navigation-DbF27MCy.js";
import { _ as j, t as B } from "./xiaobai-os-MapBrowser-CzT6eKeq.js";
var L = {
  key: 0,
  class: "map-notice",
  role: "status"
}, M = /* @__PURE__ */ y({
  __name: "MapProjection",
  props: {
    map: {},
    chatIdentity: {},
    message: {}
  },
  setup(a) {
    return (n, o) => (h(), I(B, {
      compact: "",
      class: "map-projection-view",
      map: a.map,
      "chat-identity": a.chatIdentity
    }, {
      feedback: g(() => [a.message ? (h(), P("aside", L, [C("p", null, k(a.message), 1)])) : _("", !0)]),
      _: 1
    }, 8, ["map", "chat-identity"]));
  }
}), b = M;
function O(a) {
  a.replaceChildren();
  const n = a.attachShadow({ mode: "open" }), o = document.createElement("link");
  o.rel = "stylesheet", o.href = new URL(
    /* @vite-ignore */
    "xiaobai-os-app.css",
    import.meta.url
  ).href;
  const t = document.createElement("div");
  t.className = "map-projection-root", n.append(o, t);
  const s = w({
    map: null,
    chatIdentity: "",
    message: ""
  });
  let r = "";
  const c = E({ render: () => f(b, s) });
  let i = !0;
  const m = () => {
    i && (i = !1, c.unmount());
  }, p = () => {
    m(), t.setAttribute("role", "alert"), t.textContent = j.loadFailed;
  }, l = [
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
  ], d = (e) => e.stopPropagation();
  for (const e of l) t.addEventListener(e, d);
  return o.addEventListener("error", p), c.mount(t), {
    update(e, v) {
      t.classList.toggle("theme-dark", v === "dark");
      const u = JSON.stringify(e.map);
      u !== r && (s.map = e.map, r = u), s.chatIdentity = e.chatIdentity, s.message = e.message;
    },
    dispose() {
      o.removeEventListener("error", p);
      for (const e of l) t.removeEventListener(e, d);
      m(), n.replaceChildren();
    }
  };
}
export {
  O as mountMapProjection
};
