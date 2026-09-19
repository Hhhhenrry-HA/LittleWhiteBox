/* eslint-disable */
import { C as w, E as I, K as h, gt as d, h as x, j as E, k as o, l as _, p as k, r as g, s as a, u as c } from "./xiaobai-os-runtime-core.esm-bundler-x_Eikhco.js";
import { t as B } from "./xiaobai-os-frame-bridge-5XxFerhp.js";
var D = { class: "dice-app" }, R = {
  "aria-labelledby": "dice-action-label",
  class: "dice-feature"
}, A = { class: "dice-switch-row" }, F = ["aria-checked", "disabled"], S = { class: "dice-sr" }, $ = ["disabled"], N = { class: "dice-frequency-options" }, V = ["aria-pressed", "onClick"], O = {
  id: "dice-rule-description",
  "aria-live": "polite"
}, j = ["disabled"], H = { class: "dice-frequency-options" }, K = ["aria-pressed", "onClick"], L = {
  id: "dice-frequency-description",
  "aria-live": "polite"
}, M = {
  "aria-labelledby": "dice-encounter-label",
  class: "dice-feature"
}, T = { class: "dice-switch-row" }, U = ["aria-checked", "disabled"], z = { class: "dice-sr" }, G = {
  key: 0,
  class: "dice-recovery",
  "aria-live": "polite"
}, J = /* @__PURE__ */ x({
  __name: "DiceApp",
  props: {
    bridge: {},
    initialState: {}
  },
  setup(b) {
    const u = b, t = h(u.initialState), s = h(!1), r = h(""), C = {
      standard: {
        label: "标准",
        description: "有风险或阻力，且成败会改变后续的行动才检定。"
      },
      active: {
        label: "积极",
        description: "日常小目标，以及效果、耗时和代价的不确定性也可检定。"
      }
    }, m = {
      d20: {
        label: "通用 D20",
        description: "不需要人物数值，由情境决定难度。"
      },
      coc7: {
        label: "CoC 第七版",
        description: "使用已知的 CoC 技能、属性数值，支持奖惩骰与双方对抗。"
      }
    };
    let q = () => {
    }, p = !1, f = 0;
    I(() => {
      p = !0, q = u.bridge.subscribe((v) => {
        if (v.type === "dice/state") {
          const e = v.payload.state;
          e.chatIdentity === t.value.chatIdentity && (f++, t.value = e);
        }
      });
    }), w(() => {
      p = !1, q();
    });
    async function y(v, e) {
      if (s.value) return;
      s.value = !0, r.value = "";
      const l = t.value.chatIdentity, i = f;
      try {
        const n = await u.bridge.request(v, {
          chatIdentity: l,
          ...e
        });
        p && i === f && n.result.chatIdentity === l && (t.value = n.result);
      } catch (n) {
        p && (r.value = n instanceof B && n.code === "app_request_failed" ? n.message : "操作未完成，请稍后重试。");
      } finally {
        p && (s.value = !1);
      }
    }
    return (v, e) => (o(), c("main", D, [
      a("section", R, [
        a("div", A, [e[3] || (e[3] = a("h1", { id: "dice-action-label" }, "行动检定", -1)), a("button", {
          type: "button",
          class: "dice-switch",
          role: "switch",
          "aria-labelledby": "dice-action-label",
          "aria-checked": t.value.actionChecksEnabled,
          disabled: s.value,
          onClick: e[0] || (e[0] = (l) => y("dice/set-feature", {
            feature: "actionChecksEnabled",
            enabled: !t.value.actionChecksEnabled
          }))
        }, [e[2] || (e[2] = a("span", { "aria-hidden": "true" }, null, -1)), a("span", S, d(t.value.actionChecksEnabled ? "关闭" : "开启"), 1)], 8, F)]),
        e[6] || (e[6] = a("p", { class: "dice-intro" }, "当你尝试不确定的事——说服陌生人、翻越高墙、破译符文——由骰子裁决，而非 AI。一次真随机掷骰仲裁结果，故事顺从命运。", -1)),
        t.value.actionChecksEnabled ? (o(), c("fieldset", {
          key: 0,
          class: "dice-frequency",
          disabled: s.value || t.value.checkBusy,
          "aria-describedby": "dice-rule-description"
        }, [
          e[4] || (e[4] = a("legend", null, "检定规则", -1)),
          a("div", N, [(o(), c(g, null, E(m, (l, i) => a("button", {
            key: i,
            type: "button",
            class: "dice-frequency-option",
            "aria-pressed": t.value.actionCheckRule === i,
            onClick: (n) => t.value.actionCheckRule !== i && y("dice/set-rule", { rule: i })
          }, d(l.label), 9, V)), 64))]),
          a("p", O, d(m[t.value.actionCheckRule].description), 1)
        ], 8, $)) : _("", !0),
        t.value.actionChecksEnabled && t.value.actionCheckRule === "d20" ? (o(), c("fieldset", {
          key: 1,
          class: "dice-frequency",
          disabled: s.value,
          "aria-describedby": "dice-frequency-description"
        }, [
          e[5] || (e[5] = a("legend", null, "检定频率", -1)),
          a("div", H, [(o(), c(g, null, E(C, (l, i) => a("button", {
            key: i,
            type: "button",
            class: "dice-frequency-option",
            "aria-pressed": t.value.actionCheckFrequency === i,
            onClick: (n) => t.value.actionCheckFrequency !== i && y("dice/set-frequency", { frequency: i })
          }, d(l.label), 9, K)), 64))]),
          a("p", L, d(C[t.value.actionCheckFrequency].description), 1)
        ], 8, j)) : _("", !0),
        e[7] || (e[7] = a("aside", { class: "dice-notice" }, [
          a("p", null, "请勿开启酒馆的「自动续写」。"),
          a("p", null, "酒馆 1.14 / 1.15：行动检定的自动续写会发送输入框中尚未发送的文字。"),
          a("p", null, "功能开启期间，会自动创建「小白 OS · 行动检定显示」全局正则。")
        ], -1))
      ]),
      a("section", M, [
        a("div", T, [e[9] || (e[9] = a("h2", { id: "dice-encounter-label" }, "随机遭遇", -1)), a("button", {
          type: "button",
          class: "dice-switch",
          role: "switch",
          "aria-labelledby": "dice-encounter-label",
          "aria-checked": t.value.encountersEnabled,
          disabled: s.value,
          onClick: e[1] || (e[1] = (l) => y("dice/set-feature", {
            feature: "encountersEnabled",
            enabled: !t.value.encountersEnabled
          }))
        }, [e[8] || (e[8] = a("span", { "aria-hidden": "true" }, null, -1)), a("span", z, d(t.value.encountersEnabled ? "关闭" : "开启"), 1)], 8, U)]),
        e[10] || (e[10] = a("p", null, "偶尔为剧情添一点变数，也可从已开启的世界背景与剧情记忆中寻找灵感。", -1)),
        e[11] || (e[11] = a("p", { class: "dice-rates" }, [
          k("轻微 5% "),
          a("span", { "aria-hidden": "true" }, "·"),
          k(" 中等 3% "),
          a("span", { "aria-hidden": "true" }, "·"),
          k(" 重大 1%")
        ], -1)),
        e[12] || (e[12] = a("p", { class: "dice-cooldown" }, "触发后，接下来的两次用户发言不会触发新遭遇。不额外调用模型。", -1))
      ]),
      r.value ? (o(), c("section", G, [a("p", null, d(r.value), 1)])) : _("", !0)
    ]));
  }
}), P = (b, u) => {
  const t = b.__vccOpts || b;
  for (const [s, r] of u) t[s] = r;
  return t;
}, X = /* @__PURE__ */ P(J, [["__scopeId", "data-v-dfc5b7e2"]]);
export {
  X as default
};
