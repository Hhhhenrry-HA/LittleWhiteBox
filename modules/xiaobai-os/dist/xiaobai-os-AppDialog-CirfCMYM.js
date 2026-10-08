/* eslint-disable */
import { A as c, B as u, E as f, O as _, U as v, _ as y, f as g, g as h, i as m, nt as b, p as o, t as A, v as l, y as B } from "./xiaobai-os-app-navigation-DbF27MCy.js";
var k = ["onKeydown"], w = /* @__PURE__ */ f({
  inheritAttrs: !1,
  __name: "AppDialog",
  props: { busy: { type: Boolean } },
  emits: ["close"],
  setup(n, { emit: i }) {
    const r = n, p = i, d = _(A, null), s = y(() => d?.root.value?.firstElementChild ?? null), a = b(null);
    function e() {
      r.busy || p("close");
    }
    return m(a, e), (t, K) => (u(), B(h, {
      to: s.value ?? "body",
      disabled: !s.value
    }, [l("div", {
      ref_key: "shade",
      ref: a,
      class: "os-app-dialog-shade",
      onClick: o(e, ["self"]),
      onKeydown: g(o(e, ["stop", "prevent"]), ["esc"])
    }, [l("section", c(t.$attrs, {
      role: "dialog",
      tabindex: "-1"
    }), [v(t.$slots, "default")], 16)], 40, k)], 8, ["to", "disabled"]));
  }
}), D = w;
export {
  D as t
};
