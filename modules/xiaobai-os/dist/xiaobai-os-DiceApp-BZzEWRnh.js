/* eslint-disable */
import { E as Z, H as z, K as $, M as r, P as T, Q as n, T as X, Y as u, b as V, c as Q, f as L, g as o, h as p, k as Y, l as U, m as J, o as ee, p as t, q as ae, u as O, v as q } from "./xiaobai-os-runtime-dom.esm-bundler-BcM9c-Z9.js";
import { t as te } from "./xiaobai-os-frame-bridge-5XxFerhp.js";
var x = {
  STR: {
    label: "力量",
    use: "Physical force",
    dice: 3,
    add: 0
  },
  CON: {
    label: "体质",
    use: "Endurance and bodily resistance",
    dice: 3,
    add: 0
  },
  SIZ: {
    label: "体型",
    use: "Body size and mass",
    dice: 2,
    add: 6
  },
  DEX: {
    label: "敏捷",
    use: "Coordination and reflexes",
    dice: 3,
    add: 0
  },
  APP: {
    label: "外貌",
    use: "Appearance and first impressions",
    dice: 3,
    add: 0
  },
  INT: {
    label: "智力",
    use: "Reasoning and insight",
    dice: 2,
    add: 6
  },
  POW: {
    label: "意志",
    use: "Willpower and mental resistance",
    dice: 3,
    add: 0
  },
  EDU: {
    label: "教育",
    use: "General learned knowledge",
    dice: 2,
    add: 6
  }
}, le = {
  investigation: "调查",
  social: "交涉",
  physical: "行动",
  combat: "战斗",
  practical: "实用"
}, M = {
  spot_hidden: {
    label: "侦查",
    group: "investigation",
    base: 25,
    use: "Notice concealed objects and visual clues"
  },
  listen: {
    label: "聆听",
    group: "investigation",
    base: 20,
    use: "Notice and interpret sounds"
  },
  library_use: {
    label: "图书馆使用",
    group: "investigation",
    base: 20,
    use: "Find information in records and libraries"
  },
  psychology: {
    label: "心理学",
    group: "investigation",
    base: 10,
    use: "Read motives and deception"
  },
  persuade: {
    label: "说服",
    group: "social",
    base: 10,
    use: "Convince through sustained reasoning"
  },
  fast_talk: {
    label: "话术",
    group: "social",
    base: 5,
    use: "Briefly mislead or distract with words"
  },
  charm: {
    label: "魅惑",
    group: "social",
    base: 15,
    use: "Win cooperation through personal appeal"
  },
  intimidate: {
    label: "恐吓",
    group: "social",
    base: 15,
    use: "Coerce through threats"
  },
  stealth: {
    label: "潜行",
    group: "physical",
    base: 20,
    use: "Avoid being noticed"
  },
  climb: {
    label: "攀爬",
    group: "physical",
    base: 20,
    use: "Climb walls, trees and similar obstacles"
  },
  jump: {
    label: "跳跃",
    group: "physical",
    base: 20,
    use: "Leap gaps and obstacles"
  },
  swim: {
    label: "游泳",
    group: "physical",
    base: 20,
    use: "Move through dangerous water"
  },
  dodge: {
    label: "闪避",
    group: "combat",
    base: {
      attribute: "DEX",
      divisor: 2
    },
    use: "Evade an incoming danger"
  },
  brawl: {
    label: "格斗（斗殴）",
    group: "combat",
    base: 25,
    use: "Close combat with fists or simple brawling weapons"
  },
  throw: {
    label: "投掷",
    group: "combat",
    base: 20,
    use: "Throw an object at a target"
  },
  handgun: {
    label: "射击（手枪）",
    group: "combat",
    base: 20,
    use: "Fire a handgun"
  },
  rifle_shotgun: {
    label: "射击（步枪／霰弹枪）",
    group: "combat",
    base: 25,
    use: "Fire a rifle or shotgun"
  },
  first_aid: {
    label: "急救",
    group: "practical",
    base: 30,
    use: "Give immediate emergency care"
  },
  navigate: {
    label: "导航",
    group: "practical",
    base: 10,
    use: "Find a route and maintain direction"
  },
  track: {
    label: "追踪",
    group: "practical",
    base: 10,
    use: "Follow physical tracks"
  },
  mechanical_repair: {
    label: "机械维修",
    group: "practical",
    base: 10,
    use: "Repair mechanical devices"
  },
  electrical_repair: {
    label: "电气维修",
    group: "practical",
    base: 10,
    use: "Repair electrical devices"
  },
  locksmith: {
    label: "锁匠",
    group: "practical",
    base: 1,
    use: "Open or repair locks with tools"
  },
  drive_auto: {
    label: "汽车驾驶",
    group: "practical",
    base: 20,
    use: "Handle a car in difficult conditions"
  }
}, D = {
  ...x,
  ...M,
  luck: {
    label: "幸运",
    use: "External chance rather than personal competence"
  }
}, H = Object.keys(x), B = Object.keys(M), ie = [
  40,
  30,
  30,
  20,
  20,
  20,
  10,
  10
], j = {
  invalid: "dice_coc7_sheet_invalid",
  missing: "dice_coc7_sheet_missing",
  belowBase: "dice_coc7_skill_below_base"
};
function R(a, l) {
  return typeof a == "number" && Number.isSafeInteger(a) && a >= l;
}
function P(a, l) {
  return !!a && typeof a == "object" && !Array.isArray(a) && Object.keys(a).length === l.length && l.every((e) => Object.hasOwn(a, e));
}
function W(a, l) {
  const e = M[l].base;
  return typeof e == "number" ? e : Math.floor(a.attributes[e.attribute] / e.divisor);
}
function A(a, l) {
  return l === "luck" ? a.luck : Object.hasOwn(x, l) ? a.attributes[l] : W(a, l) + a.training[l];
}
function se(a) {
  return {
    hpMax: Math.floor((a.attributes.CON + a.attributes.SIZ) / 10),
    mpMax: Math.floor(a.attributes.POW / 5),
    sanInitial: a.attributes.POW
  };
}
function F(a) {
  const l = () => {
    throw new TypeError(j.invalid);
  };
  if (!P(a, [
    "attributes",
    "luck",
    "training"
  ]) || !P(a.attributes, H) || !P(a.training, B) || !R(a.luck, 1) || !Object.values(a.attributes).every((i) => R(i, 1)) || !Object.values(a.training).every((i) => R(i, 0))) return l();
  const e = a;
  return !Number.isSafeInteger(e.attributes.CON + e.attributes.SIZ) || !B.every((i) => R(A(e, i), 1)) ? l() : {
    attributes: { ...e.attributes },
    luck: e.luck,
    training: { ...e.training }
  };
}
function K(a, l) {
  const e = a();
  if (!Number.isFinite(e) || e < 0 || e >= 1) throw new TypeError("dice_random_invalid");
  return Math.floor(e * l);
}
function ne(a = Math.random) {
  const l = (y, f) => Array.from({ length: y }, () => K(a, 6) + 1).reduce((_, E) => _ + E, f) * 5, e = Object.fromEntries(H.map((y) => [y, l(x[y].dice, x[y].add)])), i = l(3, 0), c = Object.fromEntries(B.map((y) => [y, 0])), k = [...B];
  for (const y of ie) c[k.splice(K(a, k.length), 1)[0]] = y;
  return F({
    attributes: e,
    luck: i,
    training: c
  });
}
function re(a, l, e) {
  const i = F(a);
  if (l === "luck") i.luck = e;
  else if (Object.hasOwn(x, l)) i.attributes[l] = e;
  else {
    const c = e - W(i, l);
    if (c < 0) throw new TypeError(j.belowBase);
    i.training[l] = c;
  }
  return F(i);
}
var d = {
  title: "我的属性",
  empty: "待生成属性",
  generate: "一键随机",
  edit: "手调",
  reroll: "重新随机",
  save: "保存",
  saving: "保存中…",
  cancel: "取消",
  apply: "确定",
  clear: "清空属性",
  confirmClear: "确认清空",
  clearNotice: "清空后，新 CoC 检定暂停。聊天与已掷结果保留。",
  damaged: "属性数据损坏，CoC 新检定已暂停。原数据仍保留；可清空，或生成新面板后保存替换。",
  replace: "生成替换面板",
  scope: "全局面板 · 换卡、换聊天均保留",
  quick: "快捷随机加点，不含职业建卡。",
  hpMax: "HP 上限",
  mpMax: "MP 上限",
  sanInitial: "初始 SAN",
  invalid: "请输入有效的正整数；属性与派生技能须保持有效。",
  belowBase: "技能不能低于当前基础值。",
  saveFailed: "属性未能保存，草稿已保留，请重试。",
  clearFailed: "属性未能清空，原面板已保留，请重试。",
  description: "使用你的全局属性面板，AI 选择能力和难度，程序查值掷骰。"
}, oe = {
  class: "coc-sheet",
  "aria-labelledby": "coc-sheet-title"
}, ue = { id: "coc-sheet-title" }, ce = ["disabled"], de = { class: "coc-scope" }, be = {
  key: 0,
  class: "coc-recovery",
  "data-sheet-state": "invalid"
}, ve = {
  role: "alert",
  class: "coc-error"
}, pe = ["disabled"], ye = {
  key: 1,
  class: "coc-empty"
}, he = ["disabled"], fe = { class: "coc-attributes" }, ke = [
  "disabled",
  "data-stat",
  "aria-pressed",
  "onClick"
], ge = { key: 0 }, me = {
  key: 0,
  class: "coc-derived"
}, _e = { for: "coc-stat-value" }, Ce = ["disabled"], we = ["disabled"], Se = { class: "coc-skill-grid" }, Oe = [
  "data-stat",
  "disabled",
  "aria-pressed",
  "onClick"
], Ee = {
  key: 2,
  class: "coc-draft-actions"
}, Ie = ["disabled"], $e = ["disabled"], xe = ["disabled"], Ne = ["disabled"], Te = {
  key: 1,
  class: "coc-clear-confirm"
}, Be = ["disabled"], Re = ["disabled"], qe = {
  key: 4,
  class: "coc-quick"
}, Ae = {
  key: 5,
  role: "alert",
  class: "coc-error"
}, je = /* @__PURE__ */ V({
  __name: "Coc7Sheet",
  props: {
    sheet: {},
    invalid: { type: Boolean },
    busy: { type: Boolean },
    save: { type: Function }
  },
  setup(a) {
    const l = a, e = ae(null), i = $(null), c = $(""), k = $(!1), y = $(null), f = L(() => e.value ?? l.sheet), _ = L(() => f.value ? se(f.value) : null), E = Object.entries(le).map(([h, m]) => ({
      id: h,
      label: m,
      skills: B.filter((b) => M[b].group === h)
    })), I = [...Object.keys(x), "luck"];
    function w(h) {
      !f.value || l.busy || i.value && !s() || (e.value ??= F(f.value), h && (i.value = {
        stat: h,
        text: String(A(e.value, h))
      }), X(() => y.value?.focus()), c.value = "", k.value = !1);
    }
    function s() {
      if (!i.value || !e.value) return !0;
      try {
        const h = i.value.text;
        if (!/^\d+$/.test(h)) throw new TypeError(j.invalid);
        return e.value = re(e.value, i.value.stat, Number(h)), i.value = null, c.value = "", !0;
      } catch (h) {
        return c.value = h instanceof Error && h.message === j.belowBase ? d.belowBase : d.invalid, !1;
      }
    }
    async function g() {
      l.busy || !s() || !e.value || (await l.save(e.value) ? (e.value = null, c.value = "") : c.value = d.saveFailed);
    }
    async function v() {
      if (l.busy) return;
      const h = !l.sheet && !l.invalid && !e.value;
      e.value = ne(), i.value = null, c.value = "", k.value = !1, h && await g();
    }
    function N() {
      e.value = null, i.value = null, c.value = "", k.value = !1;
    }
    async function S() {
      l.busy || (await l.save(null) ? N() : c.value = d.clearFailed);
    }
    return (h, m) => (r(), o("section", oe, [
      t("header", null, [t("h2", ue, n(u(d).title), 1), a.sheet && !e.value ? (r(), o("button", {
        key: 0,
        type: "button",
        disabled: a.busy,
        onClick: m[0] || (m[0] = (b) => w())
      }, n(u(d).edit), 9, ce)) : p("", !0)]),
      t("p", de, n(u(d).scope), 1),
      a.invalid ? (r(), o("div", be, [t("p", ve, n(u(d).damaged), 1), e.value ? p("", !0) : (r(), o("button", {
        key: 0,
        type: "button",
        "data-sheet-action": "replace",
        disabled: a.busy,
        onClick: v
      }, n(u(d).replace), 9, pe))])) : p("", !0),
      !f.value && !a.invalid ? (r(), o("div", ye, [t("span", null, n(u(d).empty), 1), t("button", {
        type: "button",
        class: "primary",
        "data-sheet-action": "generate",
        disabled: a.busy,
        onClick: v
      }, n(u(d).generate), 9, he)])) : p("", !0),
      f.value ? (r(), o(O, { key: 2 }, [
        t("div", fe, [(r(), o(O, null, T(I, (b) => t("button", {
          key: b,
          type: "button",
          disabled: a.busy,
          "data-stat": b,
          "aria-pressed": i.value?.stat === b,
          onClick: (C) => w(b)
        }, [t("span", null, [q(n(u(D)[b].label), 1), b !== "luck" ? (r(), o("small", ge, n(b), 1)) : p("", !0)]), t("strong", null, n(u(A)(f.value, b)), 1)], 8, ke)), 64))]),
        _.value ? (r(), o("dl", me, [(r(!0), o(O, null, T(_.value, (b, C) => (r(), o("div", { key: C }, [t("dt", null, n(u(d)[C]), 1), t("dd", null, n(b), 1)]))), 128))])) : p("", !0),
        i.value ? (r(), o("form", {
          key: 1,
          class: "coc-editor",
          onSubmit: U(s, ["prevent"])
        }, [
          t("label", _e, n(u(D)[i.value.stat].label), 1),
          z(t("input", {
            id: "coc-stat-value",
            ref_key: "field",
            ref: y,
            "onUpdate:modelValue": m[1] || (m[1] = (b) => i.value.text = b),
            type: "text",
            inputmode: "numeric",
            autocomplete: "off",
            disabled: a.busy,
            onKeydown: m[2] || (m[2] = Q(U((b) => i.value = null, ["stop", "prevent"]), ["esc"]))
          }, null, 40, Ce), [[ee, i.value.text]]),
          t("button", {
            type: "submit",
            disabled: a.busy
          }, n(u(d).apply), 9, we)
        ], 32)) : p("", !0),
        (r(!0), o(O, null, T(u(E), (b) => (r(), o("details", {
          key: b.id,
          class: "coc-skills"
        }, [t("summary", null, n(b.label), 1), t("div", Se, [(r(!0), o(O, null, T(b.skills, (C) => (r(), o("button", {
          key: C,
          type: "button",
          "data-stat": C,
          disabled: a.busy,
          "aria-pressed": i.value?.stat === C,
          onClick: (ia) => w(C)
        }, [t("span", null, n(u(D)[C].label), 1), t("strong", null, n(u(A)(f.value, C)), 1)], 8, Oe))), 128))])]))), 128)),
        e.value ? (r(), o("div", Ee, [
          t("button", {
            type: "button",
            "data-sheet-action": "reroll",
            disabled: a.busy,
            onClick: v
          }, n(u(d).reroll), 9, Ie),
          t("button", {
            type: "button",
            "data-sheet-action": "cancel",
            disabled: a.busy,
            onClick: N
          }, n(u(d).cancel), 9, $e),
          t("button", {
            type: "button",
            class: "primary",
            "data-sheet-action": "save",
            disabled: a.busy,
            onClick: g
          }, n(a.busy ? u(d).saving : u(d).save), 9, xe)
        ])) : p("", !0)
      ], 64)) : p("", !0),
      (a.sheet || a.invalid) && !e.value ? (r(), o(O, { key: 3 }, [k.value ? (r(), o("div", Te, [
        t("p", null, n(u(d).clearNotice), 1),
        t("button", {
          type: "button",
          disabled: a.busy,
          onClick: m[4] || (m[4] = (b) => k.value = !1)
        }, n(u(d).cancel), 9, Be),
        t("button", {
          type: "button",
          "data-sheet-action": "confirm-clear",
          disabled: a.busy,
          onClick: S
        }, n(u(d).confirmClear), 9, Re)
      ])) : (r(), o("button", {
        key: 0,
        type: "button",
        class: "coc-clear",
        "data-sheet-action": "clear",
        disabled: a.busy,
        onClick: m[3] || (m[3] = (b) => k.value = !0)
      }, n(u(d).clear), 9, Ne))], 64)) : p("", !0),
      !a.sheet && !a.invalid || e.value ? (r(), o("p", qe, n(u(d).quick), 1)) : p("", !0),
      c.value ? (r(), o("p", Ae, n(c.value), 1)) : p("", !0)
    ]));
  }
}), G = (a, l) => {
  const e = a.__vccOpts || a;
  for (const [i, c] of l) e[i] = c;
  return e;
}, Fe = /* @__PURE__ */ G(je, [["__scopeId", "data-v-9b2aa7ad"]]), Me = { class: "dice-app" }, De = {
  "aria-labelledby": "dice-action-label",
  class: "dice-feature"
}, Pe = { class: "dice-switch-row" }, Le = ["aria-checked", "disabled"], Ue = { class: "dice-sr" }, Ke = ["disabled"], Ve = { class: "dice-frequency-options" }, He = ["aria-pressed", "onClick"], We = {
  id: "dice-rule-description",
  "aria-live": "polite"
}, Ge = ["disabled"], Ze = { class: "dice-frequency-options" }, ze = ["aria-pressed", "onClick"], Xe = {
  id: "dice-frequency-description",
  "aria-live": "polite"
}, Qe = {
  "aria-labelledby": "dice-encounter-label",
  class: "dice-feature"
}, Ye = { class: "dice-switch-row" }, Je = ["aria-checked", "disabled"], ea = { class: "dice-sr" }, aa = {
  key: 0,
  class: "dice-recovery",
  "aria-live": "polite"
}, ta = "使用不支持预填充的模型时，请关闭「续写预填充」，并保留预设「实用提示词」里的「继续推进」内容（不能为空）。", la = /* @__PURE__ */ V({
  __name: "DiceApp",
  props: {
    bridge: {},
    initialState: {}
  },
  setup(a) {
    const l = a, e = $(l.initialState), i = $(!1), c = $(""), k = {
      standard: {
        label: "标准",
        description: "有风险或阻力，且成败会改变后续的行动才检定。"
      },
      active: {
        label: "积极",
        description: "日常小目标，以及效果、耗时和代价的不确定性也可检定。"
      }
    }, y = {
      d20: {
        label: "通用 D20",
        description: "不需要人物数值，由情境决定难度。"
      },
      coc7: {
        label: "CoC 第七版",
        description: d.description
      }
    };
    let f = () => {
    }, _ = !1, E = 0;
    Y(() => {
      _ = !0, f = l.bridge.subscribe((w) => {
        if (w.type === "dice/state") {
          const s = w.payload.state;
          s.chatIdentity === e.value.chatIdentity && (E++, e.value = s);
        }
      });
    }), Z(() => {
      _ = !1, f();
    });
    async function I(w, s, g = !0) {
      if (i.value) return !1;
      i.value = !0, c.value = "";
      const v = e.value.chatIdentity, N = E;
      try {
        const S = await l.bridge.request(w, {
          chatIdentity: v,
          ...s
        });
        return _ && N === E && S.result.chatIdentity === v && (e.value = S.result), _ && S.result.chatIdentity === v;
      } catch (S) {
        return _ && g && (c.value = S instanceof te && S.code === "app_request_failed" ? S.message : "操作未完成，请稍后重试。"), !1;
      } finally {
        _ && (i.value = !1);
      }
    }
    return (w, s) => (r(), o("main", Me, [
      t("section", De, [
        t("div", Pe, [s[3] || (s[3] = t("h1", { id: "dice-action-label" }, "行动检定", -1)), t("button", {
          type: "button",
          class: "dice-switch",
          role: "switch",
          "aria-labelledby": "dice-action-label",
          "aria-checked": e.value.actionChecksEnabled,
          disabled: i.value,
          onClick: s[0] || (s[0] = (g) => I("dice/set-feature", {
            feature: "actionChecksEnabled",
            enabled: !e.value.actionChecksEnabled
          }))
        }, [s[2] || (s[2] = t("span", { "aria-hidden": "true" }, null, -1)), t("span", Ue, n(e.value.actionChecksEnabled ? "关闭" : "开启"), 1)], 8, Le)]),
        s[9] || (s[9] = t("p", { class: "dice-intro" }, "当你尝试不确定的事——说服陌生人、翻越高墙、破译符文——由骰子裁决，而非 AI。一次真随机掷骰仲裁结果，故事顺从命运。", -1)),
        e.value.actionChecksEnabled ? (r(), o("fieldset", {
          key: 0,
          class: "dice-frequency",
          disabled: i.value,
          "aria-describedby": "dice-rule-description"
        }, [
          s[4] || (s[4] = t("legend", null, "检定规则", -1)),
          t("div", Ve, [(r(), o(O, null, T(y, (g, v) => t("button", {
            key: v,
            type: "button",
            class: "dice-frequency-option",
            "aria-pressed": e.value.actionCheckRule === v,
            onClick: (N) => e.value.actionCheckRule !== v && I("dice/set-rule", { rule: v })
          }, n(g.label), 9, He)), 64))]),
          t("p", We, n(y[e.value.actionCheckRule].description), 1)
        ], 8, Ke)) : p("", !0),
        e.value.actionChecksEnabled && e.value.actionCheckRule === "d20" ? (r(), o("fieldset", {
          key: 1,
          class: "dice-frequency",
          disabled: i.value,
          "aria-describedby": "dice-frequency-description"
        }, [
          s[5] || (s[5] = t("legend", null, "检定频率", -1)),
          t("div", Ze, [(r(), o(O, null, T(k, (g, v) => t("button", {
            key: v,
            type: "button",
            class: "dice-frequency-option",
            "aria-pressed": e.value.actionCheckFrequency === v,
            onClick: (N) => e.value.actionCheckFrequency !== v && I("dice/set-frequency", { frequency: v })
          }, n(g.label), 9, ze)), 64))]),
          t("p", Xe, n(k[e.value.actionCheckFrequency].description), 1)
        ], 8, Ge)) : p("", !0),
        e.value.coc7Sheet.kind === "invalid" || e.value.actionChecksEnabled && e.value.actionCheckRule === "coc7" ? (r(), J(Fe, {
          key: 2,
          sheet: e.value.coc7Sheet.kind === "ready" ? e.value.coc7Sheet.sheet : null,
          invalid: e.value.coc7Sheet.kind === "invalid",
          busy: i.value,
          save: (g) => I("dice/set-coc7-sheet", { sheet: g }, !1)
        }, null, 8, [
          "sheet",
          "invalid",
          "busy",
          "save"
        ])) : p("", !0),
        t("aside", { class: "dice-notice" }, [
          s[6] || (s[6] = t("p", null, "请勿开启酒馆的「自动续写」。", -1)),
          t("p", null, n(ta)),
          s[7] || (s[7] = t("p", null, "酒馆 1.14 / 1.15：行动检定的自动续写会发送输入框中尚未发送的文字。", -1)),
          s[8] || (s[8] = t("p", null, "功能开启期间，会自动创建「小白 OS · 行动检定显示」全局正则。", -1))
        ])
      ]),
      t("section", Qe, [
        t("div", Ye, [s[11] || (s[11] = t("h2", { id: "dice-encounter-label" }, "随机遭遇", -1)), t("button", {
          type: "button",
          class: "dice-switch",
          role: "switch",
          "aria-labelledby": "dice-encounter-label",
          "aria-checked": e.value.encountersEnabled,
          disabled: i.value,
          onClick: s[1] || (s[1] = (g) => I("dice/set-feature", {
            feature: "encountersEnabled",
            enabled: !e.value.encountersEnabled
          }))
        }, [s[10] || (s[10] = t("span", { "aria-hidden": "true" }, null, -1)), t("span", ea, n(e.value.encountersEnabled ? "关闭" : "开启"), 1)], 8, Je)]),
        s[12] || (s[12] = t("p", null, "偶尔为剧情添一点变数，也可从已开启的世界背景与剧情记忆中寻找灵感。", -1)),
        s[13] || (s[13] = t("p", { class: "dice-rates" }, [
          q("轻微 5% "),
          t("span", { "aria-hidden": "true" }, "·"),
          q(" 中等 3% "),
          t("span", { "aria-hidden": "true" }, "·"),
          q(" 重大 1%")
        ], -1)),
        s[14] || (s[14] = t("p", { class: "dice-cooldown" }, "触发后，接下来的两次用户发言不会触发新遭遇。不额外调用模型。", -1))
      ]),
      c.value ? (r(), o("section", aa, [t("p", null, n(c.value), 1)])) : p("", !0)
    ]));
  }
}), ra = /* @__PURE__ */ G(la, [["__scopeId", "data-v-da68f2e8"]]);
export {
  ra as default
};
