/* eslint-disable */
import { B as u, C as l, I as d, S as m, U as o, at as _, et as v, ft as n, k as f, lt as y, r as g, u as h, w as p, x as k } from "./xiaobai-os-frame-bridge-CrPFvkI3.js";
import { p as B, t as b } from "./xiaobai-os-MapBrowser-CSDGp-Hv.js";
var j = {
  key: 0,
  class: "map-notice",
  role: "status"
}, w = {
  key: 1,
  class: "map-projection-loading",
  role: "status"
}, M = /* @__PURE__ */ f({
  __name: "MapProjection",
  setup(r) {
    const e = _(null), a = g(), i = a.subscribe((t) => {
      if (t.type !== "map/projection-state") return;
      const s = t.payload;
      document.documentElement.classList.toggle("theme-dark", s.theme === "dark"), e.value = s.state;
    });
    return u(a.start), d(() => {
      i(), a.dispose();
    }), (t, s) => e.value ? (o(), m(b, {
      key: 0,
      compact: "",
      class: "map-projection-view",
      map: e.value.map,
      "chat-identity": e.value.chatIdentity
    }, {
      feedback: v(() => [e.value.message ? (o(), p("aside", j, [k("p", null, n(e.value.message), 1)])) : l("", !0)]),
      _: 1
    }, 8, ["map", "chat-identity"])) : (o(), p("div", w, n(y(B).loading), 1));
  }
}), C = M, c = h(C);
c.mount("#app");
window.addEventListener("pagehide", (r) => {
  r.persisted || c.unmount();
});
