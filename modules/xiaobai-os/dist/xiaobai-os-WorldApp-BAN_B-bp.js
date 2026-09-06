/* eslint-disable */
import { B as G, C as j, E as z, H as c, I as _, L as H, N as L, R as N, T as r, _ as W, b as A, c as D, d as a, g as P, h as F, k as J, l as O, m as s, o as R, p as $, s as Q, u as k, v as T, x as X, z as t } from "./xiaobai-os-runtime-dom.esm-bundler-DwdCK5Jt.js";
var Y = { class: "world-article" }, ee = { tabindex: "-1" }, te = {
  key: 0,
  class: "world-article-update",
  role: "status"
}, ae = { key: 1 }, le = { class: "world-article-body" }, re = /* @__PURE__ */ T({
  __name: "NewsArticle",
  props: {
    article: {},
    update: {}
  },
  emits: ["latest"],
  setup(d) {
    const e = d, u = k(() => e.article.body.split(/\n\s*\n|\n/).map((i) => i.trim()).filter(Boolean));
    return (i, o) => (r(), s("article", Y, [
      a("h1", ee, c(d.article.title), 1),
      d.update !== "same" ? (r(), s("div", te, [d.update === "updated" ? (r(), s(O, { key: 0 }, [o[1] || (o[1] = a("span", null, "这篇见闻有了新内容", -1)), a("button", {
        type: "button",
        onClick: o[0] || (o[0] = (n) => i.$emit("latest"))
      }, "阅读新版")], 64)) : (r(), s("span", ae, "这篇已不在当前列表，仍可读完。"))])) : $("", !0),
      a("div", le, [(r(!0), s(O, null, z(u.value, (n, m) => (r(), s("p", { key: m }, c(n), 1))), 128))])
    ]));
  }
}), se = re, oe = { class: "world-opening" }, ie = { class: "world-horizon" }, ne = ["src"], de = [
  "aria-expanded",
  "aria-controls",
  "aria-label"
], ue = { class: "world-overview-preview" }, ce = { class: "world-overview-link" }, ve = ["id"], pe = /* @__PURE__ */ T({
  __name: "WorldOpening",
  props: { overview: {} },
  setup(d) {
    const e = _(!1), u = J(), i = new URL("data:image/svg+xml,%3csvg%20xmlns='http://www.w3.org/2000/svg'%20viewBox='0%200%20780%20340'%20fill='none'%3e%3cdefs%3e%3clinearGradient%20id='sky'%20x1='80'%20y1='0'%20x2='610'%20y2='300'%20gradientUnits='userSpaceOnUse'%3e%3cstop%20stop-color='%23102f3b'/%3e%3cstop%20offset='.48'%20stop-color='%233b787d'/%3e%3cstop%20offset='1'%20stop-color='%23b6d6be'/%3e%3c/linearGradient%3e%3cradialGradient%20id='light'%20cx='0'%20cy='0'%20r='1'%20gradientTransform='translate(574%20152)%20rotate(90)%20scale(160%20350)'%20gradientUnits='userSpaceOnUse'%3e%3cstop%20stop-color='%23fff2c5'%20stop-opacity='.93'/%3e%3cstop%20offset='.5'%20stop-color='%23d6e8c9'%20stop-opacity='.4'/%3e%3cstop%20offset='1'%20stop-color='%23b1d6c7'%20stop-opacity='0'/%3e%3c/radialGradient%3e%3clinearGradient%20id='far'%20x1='540'%20y1='158'%20x2='530'%20y2='340'%20gradientUnits='userSpaceOnUse'%3e%3cstop%20stop-color='%23528f90'/%3e%3cstop%20offset='1'%20stop-color='%23254e5b'/%3e%3c/linearGradient%3e%3clinearGradient%20id='near'%20x1='135'%20y1='175'%20x2='360'%20y2='340'%20gradientUnits='userSpaceOnUse'%3e%3cstop%20stop-color='%23153e4b'/%3e%3cstop%20offset='1'%20stop-color='%230c2b38'/%3e%3c/linearGradient%3e%3clinearGradient%20id='rim'%20x1='30'%20y1='214'%20x2='754'%20y2='209'%20gradientUnits='userSpaceOnUse'%3e%3cstop%20stop-color='%23aad2c4'%20stop-opacity='0'/%3e%3cstop%20offset='.66'%20stop-color='%23e3edcf'%20stop-opacity='.8'/%3e%3cstop%20offset='1'%20stop-color='%23cde4c9'%20stop-opacity='0'/%3e%3c/linearGradient%3e%3c/defs%3e%3cpath%20fill='url(%23sky)'%20d='M0%200h780v340H0z'/%3e%3cpath%20fill='url(%23light)'%20d='M0%200h780v340H0z'/%3e%3cpath%20d='M0%20183C182%20159%20357%20192%20494%20170s193-34%20286-20v190H0Z'%20fill='%23a2c7ba'%20fill-opacity='.3'/%3e%3cpath%20d='M0%20222c168-46%20240-9%20378-7%20181%202%20260-68%20402-32v157H0Z'%20fill='url(%23far)'/%3e%3cpath%20d='M0%20270c144-108%20290-18%20431-45%20141-26%20248-44%20349-7'%20stroke='url(%23rim)'%20stroke-width='1.4'/%3e%3cpath%20d='M0%20260c125-74%20241-35%20355-3%20153%2042%20302%205%20425-34v117H0Z'%20fill='url(%23near)'/%3e%3cpath%20d='M360%20253c156%2030%20276%205%20420-30'%20stroke='%239fc9bc'%20stroke-opacity='.25'/%3e%3c/svg%3e", "" + import.meta.url).href;
    return (o, n) => (r(), s("div", oe, [a("div", ie, [a("img", {
      src: t(i),
      alt: "",
      draggable: "false",
      class: "world-horizon-art"
    }, null, 8, ne), d.overview ? (r(), s("button", {
      key: 0,
      type: "button",
      class: "world-overview-toggle",
      "aria-expanded": e.value,
      "aria-controls": t(u),
      "aria-label": e.value ? "收起世界近况" : "查看世界近况",
      onClick: n[0] || (n[0] = (m) => e.value = !e.value)
    }, [a("span", ue, c(d.overview), 1), a("span", ce, [P(c(e.value ? "收起近况" : "世界近况") + " ", 1), (r(), s("svg", {
      viewBox: "0 0 24 24",
      "aria-hidden": "true",
      class: G({ "is-expanded": e.value })
    }, [...n[1] || (n[1] = [a("path", { d: "m7 10 5 5 5-5" }, null, -1)])], 2))])], 8, de)) : $("", !0)]), d.overview ? L((r(), s("div", {
      key: 0,
      id: t(u),
      class: "world-overview-full",
      role: "region",
      "aria-label": "世界近况"
    }, [a("p", null, c(d.overview), 1)], 8, ve)), [[R, e.value]]) : $("", !0)]));
  }
}), fe = pe;
function we(d) {
  const e = H(structuredClone(N(d.initialState))), u = _(!1), i = _(""), o = _(!1);
  let n = !1, m = 0, b = () => {
  };
  function f(y) {
    e.value = structuredClone(N(y)), i.value = "", o.value = !1;
  }
  const x = k(() => !u.value && e.value.writeState === "ready"), S = k(() => e.value.maintenance === "running"), w = k(() => e.value.writeState !== "ready" ? e.value.message : i.value || e.value.message), M = k(() => o.value || e.value.maintenance === "error" || [
    "failed",
    "unconfirmed",
    "conflict"
  ].includes(e.value.writeState));
  async function I(y, h = {}) {
    if (u.value) return;
    u.value = !0, i.value = "", o.value = !1;
    const C = e.value.chatIdentity, U = m;
    try {
      const g = await d.bridge.request(`world/${y}`, {
        chatIdentity: C,
        ...h
      }, 35e3);
      if (!n || e.value.chatIdentity !== C) return;
      U === m && g.result.state.chatIdentity === C && f(g.result.state), g.result.message && (i.value = g.result.message);
    } catch (g) {
      if (!n || e.value.chatIdentity !== C) return;
      const B = g instanceof Error ? g.message : "";
      i.value = B === "host_request_timeout" ? "等待结果超时，操作可能仍在进行。请稍后重试读取，避免重复生成。" : B.startsWith("请先在 API") ? "请先在 API 应用中配置可用的模型。" : "操作未完成，请检查保存状态或稍后重试。", o.value = !0;
    } finally {
      n && (u.value = !1);
    }
  }
  return j(() => {
    n = !0, b = d.bridge.subscribe((y) => {
      if (y.type === "world/state") {
        const h = y.payload.state;
        h.chatIdentity === e.value.chatIdentity && (m++, f(h));
      } else y.type === "world/error" && (o.value = !0, i.value = "暂时无法读取世界内容，请重试读取。");
    });
  }), X(() => {
    n = !1, b();
  }), {
    state: e,
    pending: u,
    writable: x,
    refreshing: S,
    notice: w,
    error: M,
    request: I
  };
}
var be = { class: "world-toolbar" }, ye = { class: "world-tools" }, ge = ["disabled", "title"], me = ["onKeydown"], he = { class: "world-menu-sheet" }, ke = ["disabled"], _e = { class: "world-menu-value" }, xe = ["checked", "disabled"], Se = ["disabled"], Ce = ["disabled"], $e = ["disabled"], Me = {
  key: 0,
  class: "world-news-list",
  "aria-label": "各处见闻"
}, Ie = { class: "world-section-heading" }, Be = ["data-article-id", "onClick"], Ne = { class: "world-item-text" }, Ue = { class: "world-item-summary" }, Ae = {
  key: 1,
  class: "world-empty"
}, Ge = ["disabled"], Oe = /* @__PURE__ */ T({
  __name: "WorldApp",
  props: {
    bridge: {},
    initialState: {}
  },
  setup(d) {
    const { state: e, pending: u, writable: i, refreshing: o, notice: n, error: m, request: b } = we(d), f = H(null), x = _(null), S = _(null), w = _(null), M = _(null);
    let I = 0, y = "";
    const h = k(() => e.value.world.news.find((v) => v.id === f.value?.id)), C = k(() => h.value ? JSON.stringify(h.value) === JSON.stringify(f.value) ? "same" : "updated" : "removed"), U = k(() => !!e.value.world.overview || e.value.world.news.length > 0), g = k(() => i.value && !o.value);
    async function B(v) {
      I = x.value?.scrollTop ?? 0, y = v.id, f.value = structuredClone(N(v)), await A(), S.value?.querySelector("h1")?.focus({ preventScroll: !0 });
    }
    async function q() {
      f.value = null, await A(), x.value && (x.value.scrollTop = I, ([...x.value.querySelectorAll("[data-article-id]")].find((v) => v.dataset.articleId === y) ?? M.value)?.focus({ preventScroll: !0 }));
    }
    async function V() {
      h.value && (f.value = structuredClone(N(h.value)), await A(), S.value && (S.value.scrollTop = 0), S.value?.querySelector("h1")?.focus({ preventScroll: !0 }));
    }
    function E() {
      w.value && (w.value.open = !1, w.value.querySelector("summary")?.focus());
    }
    function K(v) {
      w.value && v.target instanceof Node && !w.value.contains(v.target) && (w.value.open = !1);
    }
    function Z(v) {
      w.value && (!(v.relatedTarget instanceof Node) || !w.value.contains(v.relatedTarget)) && (w.value.open = !1);
    }
    return (v, l) => (r(), s("section", {
      class: "world-app",
      "aria-label": "世界新闻",
      onPointerdown: K
    }, [
      a("header", be, [f.value ? (r(), s("button", {
        key: 0,
        type: "button",
        class: "world-back",
        onClick: q
      }, [...l[7] || (l[7] = [a("svg", {
        viewBox: "0 0 24 24",
        "aria-hidden": "true"
      }, [a("path", { d: "m14 6-6 6 6 6" })], -1), a("span", null, "见闻", -1)])])) : (r(), s("h1", {
        key: 1,
        ref_key: "title",
        ref: M,
        class: "world-toolbar-title",
        tabindex: "-1"
      }, "世界", 512)), a("div", ye, [a("button", {
        type: "button",
        class: "world-icon-button",
        disabled: !g.value,
        "aria-label": "刷新新闻",
        title: t(o) ? "正在更新世界近况" : "刷新新闻，会使用模型",
        onClick: l[0] || (l[0] = (p) => t(b)("refresh"))
      }, [(r(), s("svg", {
        viewBox: "0 0 24 24",
        fill: "none",
        stroke: "currentColor",
        "stroke-width": "1.6",
        "aria-hidden": "true",
        class: G({ "world-spinning": t(o) })
      }, [...l[8] || (l[8] = [a("path", {
        d: "M20 10a8 8 0 1 0-1 6M20 4v6h-6",
        "stroke-linecap": "round",
        "stroke-linejoin": "round"
      }, null, -1)])], 2))], 8, ge), a("details", {
        ref_key: "menu",
        ref: w,
        class: "world-menu",
        onKeydown: Q(D(E, ["stop", "prevent"]), ["esc"]),
        onFocusout: Z
      }, [l[13] || (l[13] = F('<summary aria-label="新闻设置" title="新闻设置"><svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><circle cx="5" cy="12" r="1.7"></circle><circle cx="12" cy="12" r="1.7"></circle><circle cx="19" cy="12" r="1.7"></circle></svg></summary>', 1)), a("div", he, [
        l[10] || (l[10] = a("span", { class: "world-menu-heading" }, "订阅与背景", -1)),
        a("button", {
          type: "button",
          disabled: !t(i),
          onClick: l[1] || (l[1] = (p) => t(b)("subscribe", { enabled: !t(e).world.subscribed }))
        }, [a("span", null, c(t(e).world.subscribed ? "取消订阅" : "订阅新闻"), 1), a("span", _e, c(t(e).world.subscribed ? "已订阅" : "未订阅"), 1)], 8, ke),
        l[11] || (l[11] = a("p", null, "订阅后随剧情更新新闻，会使用模型。取消后保留已有内容。", -1)),
        a("label", null, [l[9] || (l[9] = a("span", null, "作为剧情背景", -1)), a("input", {
          type: "checkbox",
          checked: t(e).world.injectToStory,
          disabled: !t(i),
          onChange: l[2] || (l[2] = (p) => t(b)("background", { enabled: p.target.checked }))
        }, null, 40, xe)]),
        l[12] || (l[12] = a("p", null, "将概况与短摘要提供给后续剧情。独立于订阅开关。", -1))
      ])], 40, me)])]),
      t(n) ? (r(), s("div", {
        key: 0,
        class: G(["world-notice", { "is-error": t(m) }]),
        role: "status",
        "aria-live": "polite"
      }, [a("span", null, c(t(n)), 1), t(e).writeState === "unconfirmed" || t(e).pendingSave && t(e).writeState === "failed" ? (r(), s("button", {
        key: 0,
        disabled: t(u),
        type: "button",
        onClick: l[3] || (l[3] = (p) => t(b)("confirm-save"))
      }, "核实保存", 8, Se)) : t(e).writeState === "conflict" ? (r(), s("button", {
        key: 1,
        disabled: t(u),
        type: "button",
        onClick: l[4] || (l[4] = (p) => t(b)("adopt-server-state"))
      }, "读取服务器版本", 8, Ce)) : t(e).writeState === "failed" || t(m) ? (r(), s("button", {
        key: 2,
        disabled: t(u) || t(e).writeState === "saving",
        type: "button",
        onClick: l[5] || (l[5] = (p) => t(b)(t(e).maintenance === "error" && t(e).writeState === "ready" ? "refresh" : "read"))
      }, c(t(e).maintenance === "error" && t(e).writeState === "ready" ? "重试更新" : "重试读取"), 9, $e)) : $("", !0)], 2)) : $("", !0),
      L(a("div", {
        ref_key: "listing",
        ref: x,
        class: "world-scroll world-listing"
      }, [W(fe, { overview: t(e).world.overview }, null, 8, ["overview"]), t(e).world.news.length ? (r(), s("section", Me, [a("div", Ie, [l[14] || (l[14] = a("span", null, "各处见闻", -1)), a("span", null, c(t(e).world.news.length) + " 则", 1)]), (r(!0), s(O, null, z(t(e).world.news, (p) => (r(), s("article", {
        key: p.id,
        class: "world-news-item"
      }, [a("button", {
        type: "button",
        "data-article-id": p.id,
        onClick: (Te) => B(p)
      }, [a("span", Ne, [a("h2", null, c(p.title), 1), a("span", Ue, c(p.summary), 1)]), l[15] || (l[15] = a("svg", {
        class: "world-item-arrow",
        viewBox: "0 0 24 24",
        "aria-hidden": "true"
      }, [a("path", { d: "m9 6 6 6-6 6" })], -1))], 8, Be)]))), 128))])) : (r(), s("section", Ae, [
        a("h2", null, c(t(o) ? "正在收集远方的见闻" : t(e).world.subscribed ? "见闻还在路上" : U.value ? "继续看看各处的消息" : "远方，也有故事"), 1),
        a("p", null, c(t(e).world.subscribed ? `已订阅，新闻会随剧情持续更新。
有了新的见闻，就会出现在这里。` : `认识镜头之外的人与事。
订阅后，新的见闻会随剧情陆续到来。`), 1),
        a("button", {
          type: "button",
          class: "world-primary",
          disabled: !g.value,
          onClick: l[6] || (l[6] = (p) => t(e).world.subscribed ? t(b)("refresh") : t(b)("subscribe", { enabled: !0 }))
        }, c(t(o) ? "正在更新…" : t(u) ? "正在处理…" : t(e).world.subscribed ? "获取新闻" : "订阅新闻"), 9, Ge),
        l[16] || (l[16] = a("small", null, "获取及维护新闻会使用已配置的模型", -1))
      ]))], 512), [[R, !f.value]]),
      f.value ? (r(), s("div", {
        key: 1,
        ref_key: "articlePage",
        ref: S,
        class: "world-scroll world-reading"
      }, [W(se, {
        article: f.value,
        update: C.value,
        onLatest: V
      }, null, 8, ["article", "update"]), a("button", {
        type: "button",
        class: "world-bottom-back",
        onClick: q
      }, [...l[17] || (l[17] = [a("svg", {
        viewBox: "0 0 24 24",
        "aria-hidden": "true"
      }, [a("path", { d: "m14 6-6 6 6 6" })], -1), P(" 返回见闻 ", -1)])])], 512)) : $("", !0)
    ], 32));
  }
}), We = Oe;
export {
  We as default
};
