/* eslint-disable */
import { K as c, N as u, S as f, U as _, at as v, b as y, g as t, h, i as g, j as m, k as b, s as k, x as l, y as A } from "./xiaobai-os-frame-bridge-CrPFvkI3.js";
var K = ["onKeydown"], w = /* @__PURE__ */ b({
  inheritAttrs: !1,
  __name: "AppDialog",
  props: { busy: { type: Boolean } },
  emits: ["close"],
  setup(i, { emit: n }) {
    const r = i, p = n, d = m(g, null), s = y(() => d?.root.value?.firstElementChild ?? null), a = v(null);
    function e() {
      r.busy || p("close");
    }
    return k(a, e), (o, B) => (_(), f(A, {
      to: s.value ?? "body",
      disabled: !s.value
    }, [l("div", {
      ref_key: "shade",
      ref: a,
      class: "os-app-dialog-shade",
      onClick: t(e, ["self"]),
      onKeydown: h(t(e, ["stop", "prevent"]), ["esc"])
    }, [l("section", u(o.$attrs, {
      role: "dialog",
      tabindex: "-1"
    }), [c(o.$slots, "default")], 16)], 40, K)], 8, ["to", "disabled"]));
  }
}), D = w;
export {
  D as t
};
