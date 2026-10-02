/* eslint-disable */
import { E as c, I as u, Q as f, S as _, c as m, f as v, h, l as t, m as l, p as y, w as g, z as b } from "./xiaobai-os-runtime-dom.esm-bundler-C2atLQPd.js";
import { i as w, t as A } from "./xiaobai-os-app-navigation-5cBwNoCT.js";
var k = ["onKeydown"], B = /* @__PURE__ */ _({
  inheritAttrs: !1,
  __name: "AppDialog",
  props: { busy: { type: Boolean } },
  emits: ["close"],
  setup(i, { emit: r }) {
    const n = i, p = r, d = g(A, null), s = y(() => d?.root.value?.firstElementChild ?? null), o = f(null);
    function e() {
      n.busy || p("close");
    }
    return w(o, e), (a, K) => (u(), h(v, {
      to: s.value ?? "body",
      disabled: !s.value
    }, [l("div", {
      ref_key: "shade",
      ref: o,
      class: "os-app-dialog-shade",
      onClick: t(e, ["self"]),
      onKeydown: m(t(e, ["stop", "prevent"]), ["esc"])
    }, [l("section", c(a.$attrs, {
      role: "dialog",
      tabindex: "-1"
    }), [b(a.$slots, "default")], 16)], 40, k)], 8, ["to", "disabled"]));
  }
}), E = B;
export {
  E as t
};
