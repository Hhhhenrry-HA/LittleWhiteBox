/* eslint-disable */
import { E as G, H as X, K as $, M as n, P as N, Q as r, T as z, Y as u, b as V, c as Q, f as L, g as o, h as p, k as Y, l as U, m as J, o as ee, p as t, q as ae, u as O, v as A } from "./xiaobai-os-runtime-dom.esm-bundler-BcM9c-Z9.js";
import { t as te } from "./xiaobai-os-frame-bridge-5XxFerhp.js";
var x = {
  STR: {
    label: "力量",
    dice: 3,
    add: 0
  },
  CON: {
    label: "体质",
    dice: 3,
    add: 0
  },
  SIZ: {
    label: "体型",
    dice: 2,
    add: 6
  },
  DEX: {
    label: "敏捷",
    dice: 3,
    add: 0
  },
  APP: {
    label: "外貌",
    dice: 3,
    add: 0
  },
  INT: {
    label: "智力",
    dice: 2,
    add: 6
  },
  POW: {
    label: "意志",
    dice: 3,
    add: 0
  },
  EDU: {
    label: "教育",
    dice: 2,
    add: 6
  }
}, le = {
  investigation: "调查",
  social: "交涉",
  physical: "行动",
  combat: "战斗",
  practical: "实用"
}, D = {
  spot_hidden: {
    label: "侦查",
    group: "investigation",
    base: 25
  },
  listen: {
    label: "聆听",
    group: "investigation",
    base: 20
  },
  library_use: {
    label: "图书馆使用",
    group: "investigation",
    base: 20
  },
  psychology: {
    label: "心理学",
    group: "investigation",
    base: 10
  },
  persuade: {
    label: "说服",
    group: "social",
    base: 10
  },
  fast_talk: {
    label: "话术",
    group: "social",
    base: 5
  },
  charm: {
    label: "魅惑",
    group: "social",
    base: 15
  },
  intimidate: {
    label: "恐吓",
    group: "social",
    base: 15
  },
  stealth: {
    label: "潜行",
    group: "physical",
    base: 20
  },
  climb: {
    label: "攀爬",
    group: "physical",
    base: 20
  },
  jump: {
    label: "跳跃",
    group: "physical",
    base: 20
  },
  swim: {
    label: "游泳",
    group: "physical",
    base: 20
  },
  dodge: {
    label: "闪避",
    group: "combat",
    base: {
      attribute: "DEX",
      divisor: 2
    }
  },
  brawl: {
    label: "格斗（斗殴）",
    group: "combat",
    base: 25
  },
  throw: {
    label: "投掷",
    group: "combat",
    base: 20
  },
  handgun: {
    label: "射击（手枪）",
    group: "combat",
    base: 20
  },
  rifle_shotgun: {
    label: "射击（步枪／霰弹枪）",
    group: "combat",
    base: 25
  },
  first_aid: {
    label: "急救",
    group: "practical",
    base: 30
  },
  navigate: {
    label: "导航",
    group: "practical",
    base: 10
  },
  track: {
    label: "追踪",
    group: "practical",
    base: 10
  },
  mechanical_repair: {
    label: "机械维修",
    group: "practical",
    base: 10
  },
  electrical_repair: {
    label: "电气维修",
    group: "practical",
    base: 10
  },
  locksmith: {
    label: "锁匠",
    group: "practical",
    base: 1
  },
  drive_auto: {
    label: "汽车驾驶",
    group: "practical",
    base: 20
  }
}, F = {
  ...x,
  ...D,
  luck: { label: "幸运" }
}, H = Object.keys(x), q = Object.keys(D), ie = [
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
function B(a, l) {
  return typeof a == "number" && Number.isSafeInteger(a) && a >= l;
}
function P(a, l) {
  return !!a && typeof a == "object" && !Array.isArray(a) && Object.keys(a).length === l.length && l.every((e) => Object.hasOwn(a, e));
}
function W(a, l) {
  const e = D[l].base;
  return typeof e == "number" ? e : Math.floor(a.attributes[e.attribute] / e.divisor);
}
function R(a, l) {
  return l === "luck" ? a.luck : Object.hasOwn(x, l) ? a.attributes[l] : W(a, l) + a.training[l];
}
function se(a) {
  return {
    hpMax: Math.floor((a.attributes.CON + a.attributes.SIZ) / 10),
    mpMax: Math.floor(a.attributes.POW / 5),
    sanInitial: a.attributes.POW
  };
}
function M(a) {
  const l = () => {
    throw new TypeError(j.invalid);
  };
  if (!P(a, [
    "attributes",
    "luck",
    "training"
  ]) || !P(a.attributes, H) || !P(a.training, q) || !B(a.luck, 1) || !Object.values(a.attributes).every((i) => B(i, 1)) || !Object.values(a.training).every((i) => B(i, 0))) return l();
  const e = a;
  return !Number.isSafeInteger(e.attributes.CON + e.attributes.SIZ) || !q.every((i) => B(R(e, i), 1)) ? l() : {
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
function re(a = Math.random) {
  const l = (y, h) => Array.from({ length: y }, () => K(a, 6) + 1).reduce((C, E) => C + E, h) * 5, e = Object.fromEntries(H.map((y) => [y, l(x[y].dice, x[y].add)])), i = l(3, 0), c = Object.fromEntries(q.map((y) => [y, 0])), k = [...q];
  for (const y of ie) c[k.splice(K(a, k.length), 1)[0]] = y;
  return M({
    attributes: e,
    luck: i,
    training: c
  });
}
function ne(a, l, e) {
  const i = M(a);
  if (l === "luck") i.luck = e;
  else if (Object.hasOwn(x, l)) i.attributes[l] = e;
  else {
    const c = e - W(i, l);
    if (c < 0) throw new TypeError(j.belowBase);
    i.training[l] = c;
  }
  return M(i);
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
}, fe = ["disabled"], he = { class: "coc-attributes" }, ke = [
  "disabled",
  "data-stat",
  "aria-pressed",
  "onClick"
], _e = { key: 0 }, ge = {
  key: 0,
  class: "coc-derived"
}, Ce = { for: "coc-stat-value" }, me = ["disabled"], we = ["disabled"], Se = { class: "coc-skill-grid" }, Oe = [
  "data-stat",
  "disabled",
  "aria-pressed",
  "onClick"
], Ee = {
  key: 2,
  class: "coc-draft-actions"
}, Ie = ["disabled"], $e = ["disabled"], xe = ["disabled"], Te = ["disabled"], Ne = {
  key: 1,
  class: "coc-clear-confirm"
}, qe = ["disabled"], Be = ["disabled"], Ae = {
  key: 4,
  class: "coc-quick"
}, Re = {
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
    const l = a, e = ae(null), i = $(null), c = $(""), k = $(!1), y = $(null), h = L(() => e.value ?? l.sheet), C = L(() => h.value ? se(h.value) : null), E = Object.entries(le).map(([f, g]) => ({
      id: f,
      label: g,
      skills: q.filter((b) => D[b].group === f)
    })), I = [...Object.keys(x), "luck"];
    function w(f) {
      !h.value || l.busy || i.value && !s() || (e.value ??= M(h.value), f && (i.value = {
        stat: f,
        text: String(R(e.value, f))
      }), z(() => y.value?.focus()), c.value = "", k.value = !1);
    }
    function s() {
      if (!i.value || !e.value) return !0;
      try {
        const f = i.value.text;
        if (!/^\d+$/.test(f)) throw new TypeError(j.invalid);
        return e.value = ne(e.value, i.value.stat, Number(f)), i.value = null, c.value = "", !0;
      } catch (f) {
        return c.value = f instanceof Error && f.message === j.belowBase ? d.belowBase : d.invalid, !1;
      }
    }
    async function _() {
      l.busy || !s() || !e.value || (await l.save(e.value) ? (e.value = null, c.value = "") : c.value = d.saveFailed);
    }
    async function v() {
      if (l.busy) return;
      const f = !l.sheet && !l.invalid && !e.value;
      e.value = re(), i.value = null, c.value = "", k.value = !1, f && await _();
    }
    function T() {
      e.value = null, i.value = null, c.value = "", k.value = !1;
    }
    async function S() {
      l.busy || (await l.save(null) ? T() : c.value = d.clearFailed);
    }
    return (f, g) => (n(), o("section", oe, [
      t("header", null, [t("h2", ue, r(u(d).title), 1), a.sheet && !e.value ? (n(), o("button", {
        key: 0,
        type: "button",
        disabled: a.busy,
        onClick: g[0] || (g[0] = (b) => w())
      }, r(u(d).edit), 9, ce)) : p("", !0)]),
      t("p", de, r(u(d).scope), 1),
      a.invalid ? (n(), o("div", be, [t("p", ve, r(u(d).damaged), 1), e.value ? p("", !0) : (n(), o("button", {
        key: 0,
        type: "button",
        "data-sheet-action": "replace",
        disabled: a.busy,
        onClick: v
      }, r(u(d).replace), 9, pe))])) : p("", !0),
      !h.value && !a.invalid ? (n(), o("div", ye, [t("span", null, r(u(d).empty), 1), t("button", {
        type: "button",
        class: "primary",
        "data-sheet-action": "generate",
        disabled: a.busy,
        onClick: v
      }, r(u(d).generate), 9, fe)])) : p("", !0),
      h.value ? (n(), o(O, { key: 2 }, [
        t("div", he, [(n(), o(O, null, N(I, (b) => t("button", {
          key: b,
          type: "button",
          disabled: a.busy,
          "data-stat": b,
          "aria-pressed": i.value?.stat === b,
          onClick: (m) => w(b)
        }, [t("span", null, [A(r(u(F)[b].label), 1), b !== "luck" ? (n(), o("small", _e, r(b), 1)) : p("", !0)]), t("strong", null, r(u(R)(h.value, b)), 1)], 8, ke)), 64))]),
        C.value ? (n(), o("dl", ge, [(n(!0), o(O, null, N(C.value, (b, m) => (n(), o("div", { key: m }, [t("dt", null, r(u(d)[m]), 1), t("dd", null, r(b), 1)]))), 128))])) : p("", !0),
        i.value ? (n(), o("form", {
          key: 1,
          class: "coc-editor",
          onSubmit: U(s, ["prevent"])
        }, [
          t("label", Ce, r(u(F)[i.value.stat].label), 1),
          X(t("input", {
            id: "coc-stat-value",
            ref_key: "field",
            ref: y,
            "onUpdate:modelValue": g[1] || (g[1] = (b) => i.value.text = b),
            type: "text",
            inputmode: "numeric",
            autocomplete: "off",
            disabled: a.busy,
            onKeydown: g[2] || (g[2] = Q(U((b) => i.value = null, ["stop", "prevent"]), ["esc"]))
          }, null, 40, me), [[ee, i.value.text]]),
          t("button", {
            type: "submit",
            disabled: a.busy
          }, r(u(d).apply), 9, we)
        ], 32)) : p("", !0),
        (n(!0), o(O, null, N(u(E), (b) => (n(), o("details", {
          key: b.id,
          class: "coc-skills"
        }, [t("summary", null, r(b.label), 1), t("div", Se, [(n(!0), o(O, null, N(b.skills, (m) => (n(), o("button", {
          key: m,
          type: "button",
          "data-stat": m,
          disabled: a.busy,
          "aria-pressed": i.value?.stat === m,
          onClick: (ia) => w(m)
        }, [t("span", null, r(u(F)[m].label), 1), t("strong", null, r(u(R)(h.value, m)), 1)], 8, Oe))), 128))])]))), 128)),
        e.value ? (n(), o("div", Ee, [
          t("button", {
            type: "button",
            "data-sheet-action": "reroll",
            disabled: a.busy,
            onClick: v
          }, r(u(d).reroll), 9, Ie),
          t("button", {
            type: "button",
            "data-sheet-action": "cancel",
            disabled: a.busy,
            onClick: T
          }, r(u(d).cancel), 9, $e),
          t("button", {
            type: "button",
            class: "primary",
            "data-sheet-action": "save",
            disabled: a.busy,
            onClick: _
          }, r(a.busy ? u(d).saving : u(d).save), 9, xe)
        ])) : p("", !0)
      ], 64)) : p("", !0),
      (a.sheet || a.invalid) && !e.value ? (n(), o(O, { key: 3 }, [k.value ? (n(), o("div", Ne, [
        t("p", null, r(u(d).clearNotice), 1),
        t("button", {
          type: "button",
          disabled: a.busy,
          onClick: g[4] || (g[4] = (b) => k.value = !1)
        }, r(u(d).cancel), 9, qe),
        t("button", {
          type: "button",
          "data-sheet-action": "confirm-clear",
          disabled: a.busy,
          onClick: S
        }, r(u(d).confirmClear), 9, Be)
      ])) : (n(), o("button", {
        key: 0,
        type: "button",
        class: "coc-clear",
        "data-sheet-action": "clear",
        disabled: a.busy,
        onClick: g[3] || (g[3] = (b) => k.value = !0)
      }, r(u(d).clear), 9, Te))], 64)) : p("", !0),
      !a.sheet && !a.invalid || e.value ? (n(), o("p", Ae, r(u(d).quick), 1)) : p("", !0),
      c.value ? (n(), o("p", Re, r(c.value), 1)) : p("", !0)
    ]));
  }
}), Z = (a, l) => {
  const e = a.__vccOpts || a;
  for (const [i, c] of l) e[i] = c;
  return e;
}, Me = /* @__PURE__ */ Z(je, [["__scopeId", "data-v-9b2aa7ad"]]), De = { class: "dice-app" }, Fe = {
  "aria-labelledby": "dice-action-label",
  class: "dice-feature"
}, Pe = { class: "dice-switch-row" }, Le = ["aria-checked", "disabled"], Ue = { class: "dice-sr" }, Ke = ["disabled"], Ve = { class: "dice-frequency-options" }, He = ["aria-pressed", "onClick"], We = {
  id: "dice-rule-description",
  "aria-live": "polite"
}, Ze = ["disabled"], Ge = { class: "dice-frequency-options" }, Xe = ["aria-pressed", "onClick"], ze = {
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
    let h = () => {
    }, C = !1, E = 0;
    Y(() => {
      C = !0, h = l.bridge.subscribe((w) => {
        if (w.type === "dice/state") {
          const s = w.payload.state;
          s.chatIdentity === e.value.chatIdentity && (E++, e.value = s);
        }
      });
    }), G(() => {
      C = !1, h();
    });
    async function I(w, s, _ = !0) {
      if (i.value) return !1;
      i.value = !0, c.value = "";
      const v = e.value.chatIdentity, T = E;
      try {
        const S = await l.bridge.request(w, {
          chatIdentity: v,
          ...s
        });
        return C && T === E && S.result.chatIdentity === v && (e.value = S.result), C && S.result.chatIdentity === v;
      } catch (S) {
        return C && _ && (c.value = S instanceof te && S.code === "app_request_failed" ? S.message : "操作未完成，请稍后重试。"), !1;
      } finally {
        C && (i.value = !1);
      }
    }
    return (w, s) => (n(), o("main", De, [
      t("section", Fe, [
        t("div", Pe, [s[3] || (s[3] = t("h1", { id: "dice-action-label" }, "行动检定", -1)), t("button", {
          type: "button",
          class: "dice-switch",
          role: "switch",
          "aria-labelledby": "dice-action-label",
          "aria-checked": e.value.actionChecksEnabled,
          disabled: i.value,
          onClick: s[0] || (s[0] = (_) => I("dice/set-feature", {
            feature: "actionChecksEnabled",
            enabled: !e.value.actionChecksEnabled
          }))
        }, [s[2] || (s[2] = t("span", { "aria-hidden": "true" }, null, -1)), t("span", Ue, r(e.value.actionChecksEnabled ? "关闭" : "开启"), 1)], 8, Le)]),
        s[9] || (s[9] = t("p", { class: "dice-intro" }, "当你尝试不确定的事——说服陌生人、翻越高墙、破译符文——由骰子裁决，而非 AI。一次真随机掷骰仲裁结果，故事顺从命运。", -1)),
        e.value.actionChecksEnabled ? (n(), o("fieldset", {
          key: 0,
          class: "dice-frequency",
          disabled: i.value,
          "aria-describedby": "dice-rule-description"
        }, [
          s[4] || (s[4] = t("legend", null, "检定规则", -1)),
          t("div", Ve, [(n(), o(O, null, N(y, (_, v) => t("button", {
            key: v,
            type: "button",
            class: "dice-frequency-option",
            "aria-pressed": e.value.actionCheckRule === v,
            onClick: (T) => e.value.actionCheckRule !== v && I("dice/set-rule", { rule: v })
          }, r(_.label), 9, He)), 64))]),
          t("p", We, r(y[e.value.actionCheckRule].description), 1)
        ], 8, Ke)) : p("", !0),
        e.value.actionChecksEnabled && e.value.actionCheckRule === "d20" ? (n(), o("fieldset", {
          key: 1,
          class: "dice-frequency",
          disabled: i.value,
          "aria-describedby": "dice-frequency-description"
        }, [
          s[5] || (s[5] = t("legend", null, "检定频率", -1)),
          t("div", Ge, [(n(), o(O, null, N(k, (_, v) => t("button", {
            key: v,
            type: "button",
            class: "dice-frequency-option",
            "aria-pressed": e.value.actionCheckFrequency === v,
            onClick: (T) => e.value.actionCheckFrequency !== v && I("dice/set-frequency", { frequency: v })
          }, r(_.label), 9, Xe)), 64))]),
          t("p", ze, r(k[e.value.actionCheckFrequency].description), 1)
        ], 8, Ze)) : p("", !0),
        e.value.coc7Sheet.kind === "invalid" || e.value.actionChecksEnabled && e.value.actionCheckRule === "coc7" ? (n(), J(Me, {
          key: 2,
          sheet: e.value.coc7Sheet.kind === "ready" ? e.value.coc7Sheet.sheet : null,
          invalid: e.value.coc7Sheet.kind === "invalid",
          busy: i.value,
          save: (_) => I("dice/set-coc7-sheet", { sheet: _ }, !1)
        }, null, 8, [
          "sheet",
          "invalid",
          "busy",
          "save"
        ])) : p("", !0),
        t("aside", { class: "dice-notice" }, [
          s[6] || (s[6] = t("p", null, "请勿开启酒馆的「自动续写」。", -1)),
          t("p", null, r(ta)),
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
          onClick: s[1] || (s[1] = (_) => I("dice/set-feature", {
            feature: "encountersEnabled",
            enabled: !e.value.encountersEnabled
          }))
        }, [s[10] || (s[10] = t("span", { "aria-hidden": "true" }, null, -1)), t("span", ea, r(e.value.encountersEnabled ? "关闭" : "开启"), 1)], 8, Je)]),
        s[12] || (s[12] = t("p", null, "偶尔为剧情添一点变数，也可从已开启的世界背景与剧情记忆中寻找灵感。", -1)),
        s[13] || (s[13] = t("p", { class: "dice-rates" }, [
          A("轻微 5% "),
          t("span", { "aria-hidden": "true" }, "·"),
          A(" 中等 3% "),
          t("span", { "aria-hidden": "true" }, "·"),
          A(" 重大 1%")
        ], -1)),
        s[14] || (s[14] = t("p", { class: "dice-cooldown" }, "触发后，接下来的两次用户发言不会触发新遭遇。不额外调用模型。", -1))
      ]),
      c.value ? (n(), o("section", aa, [t("p", null, r(c.value), 1)])) : p("", !0)
    ]));
  }
}), na = /* @__PURE__ */ Z(la, [["__scopeId", "data-v-da68f2e8"]]);
export {
  na as default
};
