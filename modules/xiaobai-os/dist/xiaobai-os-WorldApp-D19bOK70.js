/* eslint-disable */
import { B as M, C as J, E as P, H as o, I as C, L as R, N as O, R as B, T as a, _ as U, b as L, c as F, d as e, g as N, l as E, m as s, o as H, p as I, s as G, u as f, v as V, x as Q, z as l } from "./xiaobai-os-runtime-dom.esm-bundler-DwdCK5Jt.js";
var X = { class: "world-article" }, Y = { tabindex: "-1" }, Z = {
  key: 0,
  class: "world-article-update",
  role: "status"
}, ee = { key: 1 }, te = { class: "world-standfirst" }, le = { class: "world-article-body" }, re = /* @__PURE__ */ V({
  __name: "NewsArticle",
  props: {
    article: {},
    update: {}
  },
  emits: ["latest"],
  setup(p) {
    const r = p, u = f(() => r.article.body.split(/\n\s*\n|\n/).map((i) => i.trim()).filter(Boolean));
    return (i, n) => (a(), s("article", X, [
      n[2] || (n[2] = e("p", { class: "world-eyebrow" }, "世界小刊 · 见闻", -1)),
      e("h1", Y, o(p.article.title), 1),
      p.update !== "same" ? (a(), s("div", Z, [p.update === "updated" ? (a(), s(E, { key: 0 }, [n[1] || (n[1] = e("span", null, "这篇见闻有了新内容", -1)), e("button", {
        type: "button",
        onClick: n[0] || (n[0] = (w) => i.$emit("latest"))
      }, "阅读新版 ↗")], 64)) : (a(), s("span", ee, "这篇已退出本期，仍可读完当前内容。"))])) : I("", !0),
      e("p", te, o(p.article.summary), 1),
      e("div", le, [(a(!0), s(E, null, P(u.value, (w, k) => (a(), s("p", { key: k }, o(w), 1))), 128))]),
      n[3] || (n[3] = e("p", {
        class: "world-endmark",
        "aria-label": "全文完"
      }, "◇", -1))
    ]));
  }
}), ae = re;
function se(p) {
  const r = R(structuredClone(B(p.initialState))), u = C(!1), i = C(""), n = C(!1);
  let w = !1, k = 0, c = () => {
  };
  function v(b) {
    r.value = structuredClone(B(b)), i.value = "", n.value = !1;
  }
  const g = f(() => !u.value && r.value.writeState === "ready"), h = f(() => r.value.maintenance === "running"), $ = f(() => r.value.writeState !== "ready" ? r.value.message : i.value || r.value.message), S = f(() => n.value || r.value.maintenance === "error" || [
    "failed",
    "unconfirmed",
    "conflict"
  ].includes(r.value.writeState));
  async function q(b, m = {}) {
    if (u.value) return;
    u.value = !0, i.value = "", n.value = !1;
    const x = r.value.chatIdentity, T = k;
    try {
      const y = await p.bridge.request(`world/${b}`, {
        chatIdentity: x,
        ...m
      }, 35e3);
      if (!w || r.value.chatIdentity !== x) return;
      T === k && y.result.state.chatIdentity === x && v(y.result.state), y.result.message && (i.value = y.result.message);
    } catch (y) {
      if (!w || r.value.chatIdentity !== x) return;
      const A = y instanceof Error ? y.message : "";
      i.value = A === "host_request_timeout" ? "等待结果超时，操作可能仍在进行。请稍后重试读取，避免重复生成。" : A.startsWith("请先在 API") ? "请先在 API 应用中配置可用的模型。" : "操作未完成，请检查保存状态或稍后重试。", n.value = !0;
    } finally {
      w && (u.value = !1);
    }
  }
  return J(() => {
    w = !0, c = p.bridge.subscribe((b) => {
      if (b.type === "world/state") {
        const m = b.payload.state;
        m.chatIdentity === r.value.chatIdentity && (k++, v(m));
      } else b.type === "world/error" && (n.value = !0, i.value = "暂时无法读取世界内容，请重试读取。");
    });
  }), Q(() => {
    w = !1, c();
  }), {
    state: r,
    pending: u,
    writable: g,
    refreshing: h,
    notice: $,
    error: S,
    request: q
  };
}
var ne = {
  class: "world-app",
  "aria-label": "世界新闻"
}, oe = { class: "world-toolbar" }, ie = {
  key: 1,
  class: "world-toolbar-title"
}, de = { class: "world-tools" }, ue = ["disabled", "title"], ve = ["onKeydown"], pe = { class: "world-menu-sheet" }, we = ["disabled"], ce = { class: "world-menu-value" }, be = ["checked", "disabled"], ye = ["disabled"], fe = ["disabled"], me = ["disabled"], ke = { class: "world-masthead" }, ge = { class: "world-edition-line" }, he = {
  key: 0,
  class: "world-overview",
  "aria-label": "世界近况"
}, Se = ["aria-expanded"], _e = {
  key: 1,
  class: "world-news-list"
}, Ce = ["data-article-id", "onClick"], $e = {
  class: "world-item-number",
  "aria-hidden": "true"
}, xe = { class: "world-item-text" }, Ie = { class: "world-item-summary" }, Ae = {
  key: 2,
  class: "world-empty"
}, Ne = ["disabled"], qe = /* @__PURE__ */ V({
  __name: "WorldApp",
  props: {
    bridge: {},
    initialState: {}
  },
  setup(p) {
    const { state: r, pending: u, writable: i, refreshing: n, notice: w, error: k, request: c } = se(p), v = R(null), g = C(null), h = C(null), $ = C(null), S = C(!1);
    let q = 0, b = "";
    const m = f(() => r.value.world.news.find((_) => _.id === v.value?.id)), x = f(() => m.value ? JSON.stringify(m.value) === JSON.stringify(v.value) ? "same" : "updated" : "removed"), T = f(() => !!r.value.world.overview || r.value.world.news.length > 0), y = f(() => i.value && !n.value), A = f(() => [...r.value.world.overview].length > 100);
    async function K(_) {
      q = g.value?.scrollTop ?? 0, b = _.id, v.value = structuredClone(B(_)), await L(), h.value?.querySelector("h1")?.focus({ preventScroll: !0 });
    }
    async function W() {
      v.value = null, await L(), g.value && (g.value.scrollTop = q, ([...g.value.querySelectorAll("[data-article-id]")].find((_) => _.dataset.articleId === b) ?? g.value.querySelector("h1"))?.focus({ preventScroll: !0 }));
    }
    async function j() {
      m.value && (v.value = structuredClone(B(m.value)), await L(), h.value && (h.value.scrollTop = 0), h.value?.querySelector("h1")?.focus({ preventScroll: !0 }));
    }
    function D() {
      $.value && ($.value.open = !1, $.value.querySelector("summary")?.focus());
    }
    return (_, t) => (a(), s("section", ne, [
      e("header", oe, [v.value ? (a(), s("button", {
        key: 0,
        type: "button",
        class: "world-back",
        onClick: W
      }, [...t[8] || (t[8] = [N("‹ ", -1), e("span", null, "本期", -1)])])) : (a(), s("span", ie, "世界")), e("div", de, [e("button", {
        type: "button",
        class: "world-icon-button",
        disabled: !y.value,
        "aria-label": "刷新新闻",
        title: l(n) ? "正在更新世界近况" : "刷新新闻，会使用模型",
        onClick: t[0] || (t[0] = (d) => l(c)("refresh"))
      }, [(a(), s("svg", {
        viewBox: "0 0 24 24",
        fill: "none",
        stroke: "currentColor",
        "stroke-width": "1.6",
        "aria-hidden": "true",
        class: M({ "world-spinning": l(n) })
      }, [...t[9] || (t[9] = [e("path", {
        d: "M20 10a8 8 0 1 0-1 6M20 4v6h-6",
        "stroke-linecap": "round",
        "stroke-linejoin": "round"
      }, null, -1)])], 2))], 8, ue), e("details", {
        ref_key: "menu",
        ref: $,
        class: "world-menu",
        onKeydown: G(F(D, ["stop", "prevent"]), ["esc"])
      }, [t[14] || (t[14] = e("summary", {
        "aria-label": "新闻设置",
        title: "新闻设置"
      }, "···", -1)), e("div", pe, [
        t[11] || (t[11] = e("span", { class: "world-menu-heading" }, "订阅与背景", -1)),
        e("button", {
          type: "button",
          disabled: !l(i),
          onClick: t[1] || (t[1] = (d) => l(c)("subscribe", { enabled: !l(r).world.subscribed }))
        }, [e("span", null, o(l(r).world.subscribed ? "取消订阅" : "订阅新闻"), 1), e("span", ce, o(l(r).world.subscribed ? "已订阅" : "未订阅"), 1)], 8, we),
        t[12] || (t[12] = e("p", null, "订阅后随剧情维护新闻，会使用模型。取消后保留本期内容。", -1)),
        e("label", null, [t[10] || (t[10] = e("span", null, "作为剧情背景", -1)), e("input", {
          type: "checkbox",
          checked: l(r).world.injectToStory,
          disabled: !l(i),
          onChange: t[2] || (t[2] = (d) => l(c)("background", { enabled: d.target.checked }))
        }, null, 40, be)]),
        t[13] || (t[13] = e("p", null, "将概况与短摘要提供给后续剧情。独立于订阅开关。", -1))
      ])], 40, ve)])]),
      l(w) ? (a(), s("div", {
        key: 0,
        class: M(["world-notice", { "is-error": l(k) }]),
        role: "status",
        "aria-live": "polite"
      }, [e("span", null, o(l(w)), 1), l(r).writeState === "unconfirmed" || l(r).pendingSave && l(r).writeState === "failed" ? (a(), s("button", {
        key: 0,
        disabled: l(u),
        type: "button",
        onClick: t[3] || (t[3] = (d) => l(c)("confirm-save"))
      }, "核实保存", 8, ye)) : l(r).writeState === "conflict" ? (a(), s("button", {
        key: 1,
        disabled: l(u),
        type: "button",
        onClick: t[4] || (t[4] = (d) => l(c)("adopt-server-state"))
      }, "读取服务器版本", 8, fe)) : l(r).writeState === "failed" || l(k) ? (a(), s("button", {
        key: 2,
        disabled: l(u) || l(r).writeState === "saving",
        type: "button",
        onClick: t[5] || (t[5] = (d) => l(c)(l(r).maintenance === "error" && l(r).writeState === "ready" ? "refresh" : "read"))
      }, o(l(r).maintenance === "error" && l(r).writeState === "ready" ? "重试更新" : "重试读取"), 9, me)) : I("", !0)], 2)) : I("", !0),
      O(e("div", {
        ref_key: "listing",
        ref: g,
        class: "world-scroll world-listing"
      }, [
        e("div", ke, [
          t[16] || (t[16] = e("p", { class: "world-eyebrow" }, "镜头之外 · 万事有声", -1)),
          t[17] || (t[17] = e("h1", { tabindex: "-1" }, [N("世界小刊"), e("span", {
            class: "world-seal",
            "aria-hidden": "true"
          }, [
            N("见"),
            e("br"),
            N("闻")
          ])], -1)),
          e("div", ge, [t[15] || (t[15] = e("span", null, "此时，此地之外", -1)), e("span", null, o(l(r).world.subscribed ? "已订阅" : "随心翻阅"), 1)])
        ]),
        l(r).world.overview ? (a(), s("section", he, [
          t[18] || (t[18] = e("h2", null, "世界近况", -1)),
          e("p", { class: M({ "is-folded": A.value && !S.value }) }, o(l(r).world.overview), 3),
          A.value ? (a(), s("button", {
            key: 0,
            type: "button",
            "aria-expanded": S.value,
            onClick: t[6] || (t[6] = (d) => S.value = !S.value)
          }, o(S.value ? "收起近况 −" : "展开近况 +"), 9, Se)) : I("", !0)
        ])) : I("", !0),
        l(r).world.news.length ? (a(), s("div", _e, [(a(!0), s(E, null, P(l(r).world.news, (d, z) => (a(), s("article", {
          key: d.id,
          class: M(["world-news-item", { "is-lead": z === 0 }])
        }, [e("button", {
          type: "button",
          "data-article-id": d.id,
          onClick: (Me) => K(d)
        }, [
          e("span", $e, o(String(z + 1).padStart(2, "0")), 1),
          e("span", xe, [e("h2", null, o(d.title), 1), e("span", Ie, o(d.summary), 1)]),
          t[19] || (t[19] = e("span", {
            class: "world-item-arrow",
            "aria-hidden": "true"
          }, "↗", -1))
        ], 8, Ce)], 2))), 128)), t[20] || (t[20] = e("p", { class: "world-colophon" }, [
          N("世界依然在发生。"),
          e("br"),
          e("span", null, "下次翻开，也许又有新的见闻。")
        ], -1))])) : (a(), s("section", Ae, [
          t[21] || (t[21] = e("svg", {
            viewBox: "0 0 136 110",
            fill: "none",
            "aria-hidden": "true"
          }, [
            e("path", {
              d: "m22 20 42-8 48 13v67L64 80l-42 8z",
              fill: "var(--world-paper-raised)",
              stroke: "currentColor",
              "stroke-width": "1.2"
            }),
            e("path", {
              d: "M64 12v68M32 35l22-4M32 43l22-4m-22 18 22-4m-22 10 22-4m20-24 27 7m-27 3 27 7m-27 13 27 7",
              stroke: "currentColor",
              "stroke-opacity": ".4"
            }),
            e("path", {
              d: "m75 18 12 3v20l-6-6-6 3z",
              fill: "var(--world-red)"
            })
          ], -1)),
          e("h2", null, o(l(n) ? "正在收集远方的见闻" : l(r).world.subscribed ? "让世界慢慢展开" : T.value ? "世界近况已在这里" : `你的故事之外，
世界也有故事`), 1),
          e("p", null, o(l(r).world.subscribed ? "已订阅。故事开场后，新闻会随剧情持续维护。" : `风物、人情，还有远方正在发生的小事。
订阅新闻，让这片世界有自己的生活。`), 1),
          e("button", {
            type: "button",
            class: "world-primary",
            disabled: !y.value,
            onClick: t[7] || (t[7] = (d) => l(r).world.subscribed ? l(c)("refresh") : l(c)("subscribe", { enabled: !0 }))
          }, o(l(n) ? "正在更新…" : l(u) ? "正在处理…" : l(r).world.subscribed ? "获取新闻" : "订阅新闻"), 9, Ne),
          t[22] || (t[22] = e("small", null, "获取及维护新闻会使用已配置的模型", -1))
        ]))
      ], 512), [[H, !v.value]]),
      v.value ? (a(), s("div", {
        key: 1,
        ref_key: "articlePage",
        ref: h,
        class: "world-scroll world-reading"
      }, [U(ae, {
        article: v.value,
        update: x.value,
        onLatest: j
      }, null, 8, ["article", "update"]), e("button", {
        type: "button",
        class: "world-bottom-back",
        onClick: W
      }, "‹ 返回本期")], 512)) : I("", !0)
    ]));
  }
}), Te = qe;
export {
  Te as default
};
