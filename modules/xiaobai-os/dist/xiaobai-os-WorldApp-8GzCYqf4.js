/* eslint-disable */
import { B as A, C as G, E as z, H as y, I as k, L, N as H, R as T, T as r, _ as U, b as q, c as K, d as a, g as Z, h as j, k as D, l as W, m as s, o as F, p as I, s as J, u as _, v as O, x as Q, z as e } from "./xiaobai-os-runtime-dom.esm-bundler-DwdCK5Jt.js";
var X = { class: "world-article" }, Y = { tabindex: "-1" }, ee = {
  key: 0,
  class: "world-article-update",
  role: "status"
}, te = { key: 1 }, ae = { class: "world-article-body" }, le = /* @__PURE__ */ O({
  __name: "NewsArticle",
  props: {
    article: {},
    update: {}
  },
  emits: ["latest"],
  setup(u) {
    const t = u, d = _(() => t.article.body.split(/\n\s*\n|\n/).map((i) => i.trim()).filter(Boolean));
    return (i, o) => (r(), s("article", X, [
      a("h1", Y, y(u.article.title), 1),
      u.update !== "same" ? (r(), s("div", ee, [u.update === "updated" ? (r(), s(W, { key: 0 }, [o[1] || (o[1] = a("span", null, "这篇见闻有了新内容", -1)), a("button", {
        type: "button",
        onClick: o[0] || (o[0] = (n) => i.$emit("latest"))
      }, "阅读新版")], 64)) : (r(), s("span", te, "这篇已不在当前列表，仍可读完。"))])) : I("", !0),
      a("div", ae, [(r(!0), s(W, null, z(d.value, (n, g) => (r(), s("p", { key: g }, y(n), 1))), 128))])
    ]));
  }
}), re = le, se = { class: "world-opening" }, oe = { class: "world-horizon" }, ie = ["src"], ne = {
  key: 0,
  class: "world-overview"
}, de = ["id"], ue = [
  "aria-expanded",
  "aria-controls",
  "aria-label"
], ce = /* @__PURE__ */ O({
  __name: "WorldOpening",
  props: { overview: {} },
  setup(u) {
    const t = k(!1), d = D(), i = new URL("data:image/svg+xml,%3csvg%20xmlns='http://www.w3.org/2000/svg'%20viewBox='0%200%201000%20280'%20fill='none'%3e%3cstyle%3e%20:root%20{%20--sky-top:%20%23dcedff;%20--sky-bottom:%20%23f5faff;%20--sea-top:%20%23b5d9f2;%20--sea-bottom:%20%23e4f1fa;%20--light:%20%23fffdf1;%20--near:%20%23759dc1;%20--far:%20%238bb6d3;%20--glint:%20%23fff;%20}%20@media%20(prefers-color-scheme:%20dark)%20{%20:root%20{%20--sky-top:%20%23172a43;%20--sky-bottom:%20%23304e74;%20--sea-top:%20%23416185;%20--sea-bottom:%20%23243b56;%20--light:%20%23dcecff;%20--near:%20%23233d5d;%20--far:%20%23345573;%20--glint:%20%2389b9e1;%20}%20}%20%3c/style%3e%3cdefs%3e%3clinearGradient%20id='sky'%20x1='500'%20y1='0'%20x2='500'%20y2='280'%20gradientUnits='userSpaceOnUse'%3e%3cstop%20stop-color='var(--sky-top)'/%3e%3cstop%20offset='1'%20stop-color='var(--sky-bottom)'/%3e%3c/linearGradient%3e%3clinearGradient%20id='sea'%20x1='500'%20y1='172'%20x2='500'%20y2='280'%20gradientUnits='userSpaceOnUse'%3e%3cstop%20stop-color='var(--sea-top)'/%3e%3cstop%20offset='1'%20stop-color='var(--sea-bottom)'/%3e%3c/linearGradient%3e%3c/defs%3e%3cpath%20fill='url(%23sky)'%20d='M0%200h1000v280H0z'/%3e%3ccircle%20cx='735'%20cy='81'%20r='27'%20fill='var(--light)'/%3e%3cpath%20d='M0%20174c193-10%20338%202%20510-5s336-5%20490%204v107H0Z'%20fill='url(%23sea)'/%3e%3cpath%20d='M0%20173c202-9%20353%203%20509-4s335-5%20491%204'%20stroke='var(--glint)'%20stroke-width='1.5'/%3e%3cpath%20d='M0%20260c91-17%20130-56%20225-57%20131-1%20176%2077%20323%2077H0Z'%20fill='var(--near)'/%3e%3cpath%20d='M695%20280c119-44%20196-30%20305-71v71Z'%20fill='var(--far)'/%3e%3cpath%20d='m661%20200%20153%201m-188%2016h216m-235%2018h279'%20stroke='var(--glint)'%20stroke-opacity='.55'/%3e%3c/svg%3e", "" + import.meta.url).href;
    return (o, n) => (r(), s("div", se, [a("div", oe, [a("img", {
      src: e(i),
      alt: "",
      draggable: "false",
      class: "world-horizon-art"
    }, null, 8, ie)]), u.overview ? (r(), s("div", ne, [a("p", {
      id: e(d),
      class: A(["world-overview-text", { "is-expanded": t.value }])
    }, y(u.overview), 11, de), a("button", {
      type: "button",
      class: "world-overview-toggle",
      "aria-expanded": t.value,
      "aria-controls": e(d),
      "aria-label": t.value ? "收起世界近况" : "查看世界近况",
      onClick: n[0] || (n[0] = (g) => t.value = !t.value)
    }, [(r(), s("svg", {
      viewBox: "0 0 24 24",
      "aria-hidden": "true",
      class: A({ "is-expanded": t.value })
    }, [...n[1] || (n[1] = [a("path", { d: "m7 10 5 5 5-5" }, null, -1)])], 2))], 8, ue)])) : I("", !0)]));
  }
}), ve = ce;
function pe(u) {
  const t = L(structuredClone(T(u.initialState))), d = k(!1), i = k(""), o = k(!1);
  let n = !1, g = 0, w = () => {
  };
  function p(b) {
    t.value = structuredClone(T(b)), i.value = "", o.value = !1;
  }
  const x = _(() => !d.value && t.value.writeState === "ready"), S = _(() => t.value.maintenance === "running"), f = _(() => t.value.writeState !== "ready" ? t.value.message : i.value || t.value.message), M = _(() => o.value || t.value.maintenance === "error" || [
    "failed",
    "unconfirmed",
    "conflict"
  ].includes(t.value.writeState));
  async function N(b, m = {}) {
    if (d.value) return;
    d.value = !0, i.value = "", o.value = !1;
    const C = t.value.chatIdentity, B = g;
    try {
      const h = await u.bridge.request(`world/${b}`, {
        chatIdentity: C,
        ...m
      }, 35e3);
      if (!n || t.value.chatIdentity !== C) return;
      B === g && h.result.state.chatIdentity === C && p(h.result.state), h.result.message && (i.value = h.result.message);
    } catch (h) {
      if (!n || t.value.chatIdentity !== C) return;
      const $ = h instanceof Error ? h.message : "";
      i.value = $ === "host_request_timeout" ? "等待结果超时，操作可能仍在进行。请稍后重试读取，避免重复生成。" : $.startsWith("请先在 API") ? "请先在 API 应用中配置可用的模型。" : "操作未完成，请检查保存状态或稍后重试。", o.value = !0;
    } finally {
      n && (d.value = !1);
    }
  }
  return G(() => {
    n = !0, w = u.bridge.subscribe((b) => {
      if (b.type === "world/state") {
        const m = b.payload.state;
        m.chatIdentity === t.value.chatIdentity && (g++, p(m));
      } else b.type === "world/error" && (o.value = !0, i.value = "暂时无法读取世界内容，请重试读取。");
    });
  }), Q(() => {
    n = !1, w();
  }), {
    state: t,
    pending: d,
    writable: x,
    refreshing: S,
    notice: f,
    error: M,
    request: N
  };
}
var fe = { class: "world-toolbar" }, we = { class: "world-tools" }, be = ["disabled", "title"], ye = ["onKeydown"], ge = { class: "world-menu-sheet" }, me = ["disabled"], he = ["checked", "disabled"], ke = ["disabled"], _e = ["disabled"], xe = ["disabled"], Se = {
  key: 0,
  class: "world-news-list",
  "aria-label": "各处见闻"
}, Ce = ["data-article-id", "onClick"], $e = { class: "world-item-text" }, Ie = { class: "world-item-summary" }, Me = {
  key: 1,
  class: "world-empty"
}, Ne = ["disabled"], Be = /* @__PURE__ */ O({
  __name: "WorldApp",
  props: {
    bridge: {},
    initialState: {}
  },
  setup(u) {
    const { state: t, pending: d, writable: i, refreshing: o, notice: n, error: g, request: w } = pe(u), p = L(null), x = k(null), S = k(null), f = k(null), M = k(null);
    let N = 0, b = "";
    const m = _(() => t.value.world.news.find((c) => c.id === p.value?.id)), C = _(() => m.value ? JSON.stringify(m.value) === JSON.stringify(p.value) ? "same" : "updated" : "removed"), B = _(() => i.value && !o.value);
    async function h(c) {
      N = x.value?.scrollTop ?? 0, b = c.id, p.value = structuredClone(T(c)), await q(), S.value?.querySelector("h1")?.focus({ preventScroll: !0 });
    }
    async function $() {
      p.value = null, await q(), x.value && (x.value.scrollTop = N, ([...x.value.querySelectorAll("[data-article-id]")].find((c) => c.dataset.articleId === b) ?? M.value)?.focus({ preventScroll: !0 }));
    }
    async function P() {
      m.value && (p.value = structuredClone(T(m.value)), await q(), S.value && (S.value.scrollTop = 0), S.value?.querySelector("h1")?.focus({ preventScroll: !0 }));
    }
    function R() {
      f.value && (f.value.open = !1, f.value.querySelector("summary")?.focus());
    }
    function V(c) {
      f.value && c.target instanceof Node && !f.value.contains(c.target) && (f.value.open = !1);
    }
    function E(c) {
      f.value && (!(c.relatedTarget instanceof Node) || !f.value.contains(c.relatedTarget)) && (f.value.open = !1);
    }
    return (c, l) => (r(), s("section", {
      class: "world-app",
      "aria-label": "世界新闻",
      onPointerdown: V
    }, [
      a("header", fe, [p.value ? (r(), s("button", {
        key: 0,
        type: "button",
        class: "world-back",
        onClick: $
      }, [...l[7] || (l[7] = [a("svg", {
        viewBox: "0 0 24 24",
        "aria-hidden": "true"
      }, [a("path", { d: "m14 6-6 6 6 6" })], -1), a("span", null, "见闻", -1)])])) : (r(), s("h1", {
        key: 1,
        ref_key: "title",
        ref: M,
        class: "world-toolbar-title",
        tabindex: "-1"
      }, "世界", 512)), a("div", we, [a("button", {
        type: "button",
        class: "world-icon-button",
        disabled: !B.value,
        "aria-label": "刷新新闻",
        title: e(o) ? "正在更新世界近况" : "刷新新闻，会使用模型",
        onClick: l[0] || (l[0] = (v) => e(w)("refresh"))
      }, [(r(), s("svg", {
        viewBox: "0 0 24 24",
        fill: "none",
        stroke: "currentColor",
        "stroke-width": "1.6",
        "aria-hidden": "true",
        class: A({ "world-spinning": e(o) })
      }, [...l[8] || (l[8] = [a("path", {
        d: "M20 10a8 8 0 1 0-1 6M20 4v6h-6",
        "stroke-linecap": "round",
        "stroke-linejoin": "round"
      }, null, -1)])], 2))], 8, be), a("details", {
        ref_key: "menu",
        ref: f,
        class: "world-menu",
        onKeydown: J(K(R, ["stop", "prevent"]), ["esc"]),
        onFocusout: E
      }, [l[12] || (l[12] = j('<summary aria-label="新闻设置" title="新闻设置"><svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><circle cx="5" cy="12" r="1.7"></circle><circle cx="12" cy="12" r="1.7"></circle><circle cx="19" cy="12" r="1.7"></circle></svg></summary>', 1)), a("div", ge, [
        a("button", {
          type: "button",
          disabled: !e(i),
          onClick: l[1] || (l[1] = (v) => e(w)("subscribe", { enabled: !e(t).world.subscribed }))
        }, [a("span", null, y(e(t).world.subscribed ? "取消订阅" : "订阅新闻"), 1)], 8, me),
        l[10] || (l[10] = a("p", null, "随剧情更新，将调用模型。取消订阅后保留新闻。", -1)),
        a("label", null, [l[9] || (l[9] = a("span", null, "作为剧情背景", -1)), a("input", {
          type: "checkbox",
          checked: e(t).world.injectToStory,
          disabled: !e(i),
          onChange: l[2] || (l[2] = (v) => e(w)("background", { enabled: v.target.checked }))
        }, null, 40, he)]),
        l[11] || (l[11] = a("p", null, "将近况提供给后续剧情。", -1))
      ])], 40, ye)])]),
      e(n) ? (r(), s("div", {
        key: 0,
        class: A(["world-notice", { "is-error": e(g) }]),
        role: "status",
        "aria-live": "polite"
      }, [a("span", null, y(e(n)), 1), e(t).writeState === "unconfirmed" || e(t).pendingSave && e(t).writeState === "failed" ? (r(), s("button", {
        key: 0,
        disabled: e(d),
        type: "button",
        onClick: l[3] || (l[3] = (v) => e(w)("confirm-save"))
      }, "核实保存", 8, ke)) : e(t).writeState === "conflict" ? (r(), s("button", {
        key: 1,
        disabled: e(d),
        type: "button",
        onClick: l[4] || (l[4] = (v) => e(w)("adopt-server-state"))
      }, "读取服务器版本", 8, _e)) : e(t).writeState === "failed" || e(g) ? (r(), s("button", {
        key: 2,
        disabled: e(d) || e(t).writeState === "saving",
        type: "button",
        onClick: l[5] || (l[5] = (v) => e(w)(e(t).maintenance === "error" && e(t).writeState === "ready" ? "refresh" : "read"))
      }, y(e(t).maintenance === "error" && e(t).writeState === "ready" ? "重试更新" : "重试读取"), 9, xe)) : I("", !0)], 2)) : I("", !0),
      H(a("div", {
        ref_key: "listing",
        ref: x,
        class: "world-scroll world-listing"
      }, [U(ve, { overview: e(t).world.overview }, null, 8, ["overview"]), e(t).world.news.length ? (r(), s("section", Se, [(r(!0), s(W, null, z(e(t).world.news, (v) => (r(), s("article", {
        key: v.id,
        class: "world-news-item"
      }, [a("button", {
        type: "button",
        "data-article-id": v.id,
        onClick: (Ae) => h(v)
      }, [a("span", $e, [a("h2", null, y(v.title), 1), a("span", Ie, y(v.summary), 1)])], 8, Ce)]))), 128))])) : (r(), s("section", Me, [
        a("h2", null, y(e(o) ? "正在更新新闻" : e(t).world.subscribed ? "已订阅，等待新闻" : "暂无新闻"), 1),
        a("button", {
          type: "button",
          class: "world-primary",
          disabled: !B.value,
          onClick: l[6] || (l[6] = (v) => e(t).world.subscribed ? e(w)("refresh") : e(w)("subscribe", { enabled: !0 }))
        }, y(e(o) ? "正在更新…" : e(d) ? "正在处理…" : e(t).world.subscribed ? "获取新闻" : "订阅新闻"), 9, Ne),
        l[13] || (l[13] = a("small", null, "获取及更新将调用模型", -1))
      ]))], 512), [[F, !p.value]]),
      p.value ? (r(), s("div", {
        key: 1,
        ref_key: "articlePage",
        ref: S,
        class: "world-scroll world-reading"
      }, [U(re, {
        article: p.value,
        update: C.value,
        onLatest: P
      }, null, 8, ["article", "update"]), a("button", {
        type: "button",
        class: "world-bottom-back",
        onClick: $
      }, [...l[14] || (l[14] = [a("svg", {
        viewBox: "0 0 24 24",
        "aria-hidden": "true"
      }, [a("path", { d: "m14 6-6 6 6 6" })], -1), Z(" 返回见闻 ", -1)])])], 512)) : I("", !0)
    ], 32));
  }
}), qe = Be;
export {
  qe as default
};
