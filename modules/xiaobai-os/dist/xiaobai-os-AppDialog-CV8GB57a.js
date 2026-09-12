/* eslint-disable */
import { A as c, N as u, S as f, U as _, b as m, c as v, d as y, f as h, l as t, m as g, p as l, w as b } from "./xiaobai-os-runtime-dom.esm-bundler-ASdQr4iS.js";
import { r as A, t as w } from "./xiaobai-os-app-navigation-DrBJz_Kq.js";
var k = ["onKeydown"], B = /* @__PURE__ */ m({
  inheritAttrs: !1,
  __name: "AppDialog",
  props: { busy: { type: Boolean } },
  emits: ["close"],
  setup(r, { emit: i }) {
    const n = r, p = i, d = f(w, null), s = h(() => d?.root.value?.firstElementChild ?? null), o = _(null);
    function e() {
      n.busy || p("close");
    }
    return A(o, e), (a, K) => (c(), g(y, {
      to: s.value ?? "body",
      disabled: !s.value
    }, [l("div", {
      ref_key: "shade",
      ref: o,
      class: "os-app-dialog-shade",
      onClick: t(e, ["self"]),
      onKeydown: v(t(e, ["stop", "prevent"]), ["esc"])
    }, [l("section", b(a.$attrs, {
      role: "dialog",
      tabindex: "-1"
    }), [u(a.$slots, "default")], 16)], 40, k)], 8, ["to", "disabled"]));
  }
}), N = B;
export {
  N as t
};
