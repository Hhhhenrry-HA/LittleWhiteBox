/* eslint-disable */
import { E as X, K as I, M as d, P as T, Q as n, V as J, X as U, Y as s, b as K, f as V, g as u, h as C, k as W, m as z, p as e, q as Z, u as $, v as q } from "./xiaobai-os-runtime-dom.esm-bundler-BcM9c-Z9.js";
import { t as ee } from "./xiaobai-os-frame-bridge-5XxFerhp.js";
import { t as ae } from "./xiaobai-os-AppDialog-CI-E933W.js";
var B = {
  body: { label: "体魄" },
  will: { label: "意志" },
  appearance: { label: "外表" }
}, G = {
  athletics: { label: "运动" },
  melee: { label: "近战" },
  shooting: { label: "射击" },
  awareness: { label: "侦察" },
  survival: { label: "求生" },
  medicine: { label: "医学" },
  knowledge: { label: "常识学" },
  social: { label: "社交" },
  mechanics: { label: "机工" },
  concealment: { label: "隐匿" }
}, R = {
  ...B,
  ...G
}, te = Object.keys(B), le = Object.keys(G), _ = {
  min: 20,
  max: 80,
  step: 5
}, S = {
  attributes: {
    ids: te,
    allocation: [
      70,
      50,
      30
    ]
  },
  skills: {
    ids: le,
    allocation: [
      80,
      70,
      60,
      60,
      50,
      50,
      40,
      40,
      30,
      20
    ]
  }
}, F = {
  invalid: "dice_coc7_sheet_invalid",
  missing: "dice_coc7_sheet_missing"
};
function M(t) {
  return S[t].allocation.reduce((l, a) => l + a, 0);
}
function A(t, l) {
  return M(l) - Object.values(t[l]).reduce((a, c) => a + c, 0);
}
function P(t, l) {
  return Object.hasOwn(B, l) ? t.attributes[l] : t.skills[l];
}
function H(t, l) {
  return !!t && typeof t == "object" && !Array.isArray(t) && Object.keys(t).length === l.length && l.every((a) => Object.hasOwn(t, a));
}
function L(t) {
  const l = () => {
    throw new TypeError(F.invalid);
  };
  if (!H(t, Object.keys(S))) return l();
  for (const c of Object.keys(S)) {
    const o = t[c];
    if (!H(o, S[c].ids) || !Object.values(o).every((v) => typeof v == "number" && Number.isInteger(v) && v >= _.min && v <= _.max && v % _.step === 0) || Object.values(o).reduce((v, k) => v + k, 0) !== M(c)) return l();
  }
  const a = t;
  return {
    attributes: { ...a.attributes },
    skills: { ...a.skills }
  };
}
function ie(t) {
  if (t === null) return { kind: "empty" };
  try {
    return {
      kind: "ready",
      sheet: L(t)
    };
  } catch (l) {
    if (!(l instanceof TypeError) || l.message !== F.invalid) throw l;
    return { kind: "invalid" };
  }
}
function N(t, l) {
  return Object.fromEntries(S[t].ids.map((a) => [a, l()]));
}
function se() {
  return {
    attributes: N("attributes", () => _.min),
    skills: N("skills", () => _.min)
  };
}
function D(t, l, a) {
  const c = Object.hasOwn(B, l) ? "attributes" : "skills", o = P(t, l) + a * _.step;
  return (a === -1 || a === 1) && o >= _.min && o <= _.max && (a < 0 || A(t, c) >= _.step);
}
function ne(t, l, a) {
  if (!D(t, l, a)) throw new TypeError(F.invalid);
  const c = Object.hasOwn(B, l) ? "attributes" : "skills";
  return {
    ...t,
    [c]: {
      ...t[c],
      [l]: P(t, l) + a * _.step
    }
  };
}
function re(t = Math.random) {
  const l = (a) => {
    const c = [...S[a].allocation];
    return N(a, () => {
      const o = t();
      if (!Number.isFinite(o) || o < 0 || o >= 1) throw new TypeError("dice_random_invalid");
      return c.splice(Math.floor(o * c.length), 1)[0];
    });
  };
  return L({
    attributes: l("attributes"),
    skills: l("skills")
  });
}
var r = {
  title: "人物属性",
  rule: "D100 属性鉴定",
  generate: "一键随机",
  close: "关闭人物属性",
  saved: "已保存",
  repair: "需重新分配",
  repairNotice: "人物属性需重新分配，新检定已暂停。",
  save: "保存",
  saving: "保存中…",
  cancel: "取消修改",
  clear: "清空属性",
  confirmClear: "确认清空",
  clearNotice: "清空后，新的属性鉴定暂停。聊天与已掷结果保留。",
  damaged: "原面板不符合当前分配规则。保存新分配或确认清空前，原数据保留；历史骰子不变。",
  scope: "全局保存",
  attributes: "属性",
  skills: "技能",
  remaining: "剩余",
  allocated: "已分配",
  unassigned: "待分配",
  unsaved: "未保存",
  decrease: "减少",
  increase: "增加",
  limits: `每项 ${_.min}–${_.max} · 每次 ${_.step} 点`,
  incomplete: "请分配完属性和技能点数后保存。",
  saveFailed: "属性未能保存，草稿已保留，请重试。",
  clearFailed: "属性未能清空，原面板已保留，请重试。",
  description: "仅检定你扮演的角色，使用全局人物能力，按属性或技能掷百分骰。"
}, ce = {
  body: "施力、耐力、身体抵抗",
  will: "专注、决心、精神抵抗",
  appearance: "外表带来的吸引力、印象与影响",
  athletics: "攀爬、游泳、平衡、闪避",
  melee: "徒手与近身武器",
  shooting: "弓弩、枪械、投掷",
  awareness: "观察、聆听、搜索",
  survival: "辨向、追踪、野外生存",
  medicine: "急救、诊断、治疗",
  knowledge: "知识辨识、资料研究",
  social: "交涉、欺骗、察言观色",
  mechanics: "器具操作、制作维修、锁具",
  concealment: "潜行、藏身、扒窃"
}, oe = ["aria-expanded", "disabled"], de = {
  key: 0,
  role: "alert",
  class: "coc-entry-warning",
  "data-sheet-state": "invalid"
}, ue = {
  class: "coc-sheet",
  "aria-labelledby": "coc-sheet-title"
}, ve = { class: "coc-header" }, be = { id: "coc-sheet-title" }, ye = ["aria-label", "disabled"], he = {
  class: "coc-budgets",
  "aria-live": "polite"
}, pe = ["data-budget"], fe = { class: "coc-scroll" }, ke = {
  key: 0,
  role: "alert",
  class: "coc-error"
}, _e = { class: "coc-limits" }, me = ["aria-labelledby"], Ce = ["id"], ge = { class: "coc-grid" }, we = ["data-stat"], Oe = { class: "coc-stat-name" }, Se = ["id"], $e = ["aria-labelledby"], Ee = [
  "aria-label",
  "disabled",
  "onClick"
], Ie = ["aria-labelledby"], xe = [
  "aria-label",
  "disabled",
  "onClick"
], je = ["disabled"], Te = {
  key: 1,
  class: "coc-clear-confirm"
}, Be = ["disabled"], qe = ["disabled"], Ae = { class: "coc-footer" }, Re = {
  key: 0,
  role: "alert",
  class: "coc-error"
}, Ne = { class: "coc-draft-actions" }, De = ["disabled"], Fe = {
  key: 0,
  class: "coc-saved",
  role: "status"
}, Me = ["disabled"], Pe = ["disabled"], Le = /* @__PURE__ */ K({
  __name: "Coc7Sheet",
  props: {
    sheet: {},
    invalid: { type: Boolean },
    busy: { type: Boolean },
    save: { type: Function }
  },
  setup(t) {
    const l = t, a = Z(null), c = I(!1), o = I(""), v = I(!1), k = V(() => a.value ?? l.sheet ?? se()), x = V(() => ie(k.value).kind === "ready"), g = Object.keys(S).map((b) => ({
      id: b,
      label: r[b],
      ids: S[b].ids,
      budget: M(b)
    }));
    function E(b) {
      a.value = b, o.value = "", v.value = !1;
    }
    function w() {
      l.busy || (c.value = !1, v.value = !1);
    }
    function O(b, p) {
      l.busy || E(ne(k.value, b, p));
    }
    function i() {
      l.busy || E(re());
    }
    async function m() {
      if (!(l.busy || !a.value)) {
        if (!x.value) {
          o.value = r.incomplete;
          return;
        }
        await l.save(L(a.value)) ? (a.value = null, o.value = "") : o.value = r.saveFailed;
      }
    }
    function h() {
      a.value = null, o.value = "", v.value = !1;
    }
    async function j() {
      l.busy || (await l.save(null) ? h() : o.value = r.clearFailed);
    }
    return (b, p) => (d(), u($, null, [
      e("button", {
        type: "button",
        class: "coc-entry",
        "data-sheet-action": "open",
        "aria-haspopup": "dialog",
        "aria-expanded": c.value,
        disabled: t.busy,
        onClick: p[0] || (p[0] = (y) => c.value = !0)
      }, [
        p[3] || (p[3] = e("svg", {
          class: "coc-entry-icon",
          viewBox: "0 0 24 24",
          fill: "none",
          stroke: "currentColor",
          "stroke-width": "1.6",
          "aria-hidden": "true"
        }, [e("circle", {
          cx: "12",
          cy: "8",
          r: "3.5"
        }), e("path", { d: "M5 21v-2a7 7 0 0 1 14 0v2M3 3h3M18 3h3M3 3v4M21 3v4" })], -1)),
        e("span", null, n(s(r).title), 1),
        e("small", { class: U({ "needs-repair": t.invalid }) }, n(a.value ? s(r).unsaved : t.invalid ? s(r).repair : t.sheet ? s(r).saved : s(r).unassigned), 3),
        p[4] || (p[4] = e("svg", {
          class: "coc-entry-arrow",
          viewBox: "0 0 16 16",
          fill: "none",
          stroke: "currentColor",
          "stroke-width": "1.5",
          "aria-hidden": "true"
        }, [e("path", { d: "m6 3 5 5-5 5" })], -1))
      ], 8, oe),
      t.invalid ? (d(), u("p", de, n(s(r).repairNotice), 1)) : C("", !0),
      c.value ? (d(), z(ae, {
        key: 1,
        class: "coc-dialog",
        "aria-labelledby": "coc-sheet-title",
        busy: t.busy,
        onClose: w
      }, {
        default: J(() => [e("section", ue, [
          e("header", ve, [e("div", null, [e("h2", be, n(s(r).title), 1), e("small", null, n(s(r).scope), 1)]), e("button", {
            type: "button",
            class: "coc-close",
            "data-sheet-action": "close",
            "aria-label": s(r).close,
            disabled: t.busy,
            autofocus: "",
            onClick: w
          }, [...p[5] || (p[5] = [e("svg", {
            viewBox: "0 0 20 20",
            fill: "none",
            stroke: "currentColor",
            "stroke-width": "1.6",
            "aria-hidden": "true"
          }, [e("path", { d: "m5 5 10 10M15 5 5 15" })], -1)])], 8, ye)]),
          e("div", he, [(d(!0), u($, null, T(s(g), (y) => (d(), u("div", {
            key: y.id,
            "data-budget": y.id
          }, [
            e("span", null, [q(n(y.label), 1), e("small", null, n(s(r).remaining), 1)]),
            e("strong", { class: U({ complete: s(A)(k.value, y.id) === 0 }) }, n(s(A)(k.value, y.id)), 3),
            e("small", null, n(s(r).allocated) + " " + n(y.budget - s(A)(k.value, y.id)) + " / " + n(y.budget), 1)
          ], 8, pe))), 128))]),
          e("div", fe, [
            t.invalid ? (d(), u("p", ke, n(s(r).damaged), 1)) : C("", !0),
            e("p", _e, n(s(r).limits), 1),
            (d(!0), u($, null, T(s(g), (y) => (d(), u("section", {
              key: y.id,
              class: "coc-group",
              "aria-labelledby": "coc-" + y.id
            }, [e("h3", { id: "coc-" + y.id }, n(y.label), 9, Ce), e("div", ge, [(d(!0), u($, null, T(y.ids, (f) => (d(), u("div", {
              key: f,
              class: "coc-stat",
              "data-stat": f
            }, [e("div", Oe, [e("span", { id: "coc-label-" + f }, n(s(R)[f].label), 9, Se), e("small", null, n(s(ce)[f]), 1)]), e("div", {
              class: "coc-stepper",
              role: "group",
              "aria-labelledby": "coc-label-" + f
            }, [
              e("button", {
                type: "button",
                "data-step": "decrease",
                "aria-label": s(r).decrease + s(R)[f].label,
                disabled: t.busy || !s(D)(k.value, f, -1),
                onClick: (Q) => O(f, -1)
              }, "−", 8, Ee),
              e("output", { "aria-labelledby": "coc-label-" + f }, n(s(P)(k.value, f)), 9, Ie),
              e("button", {
                type: "button",
                "data-step": "increase",
                "aria-label": s(r).increase + s(R)[f].label,
                disabled: t.busy || !s(D)(k.value, f, 1),
                onClick: (Q) => O(f, 1)
              }, "+", 8, xe)
            ], 8, $e)], 8, we))), 128))])], 8, me))), 128)),
            t.sheet || t.invalid ? (d(), u($, { key: 1 }, [v.value ? (d(), u("div", Te, [
              e("p", null, n(s(r).clearNotice), 1),
              e("button", {
                type: "button",
                disabled: t.busy,
                onClick: p[2] || (p[2] = (y) => v.value = !1)
              }, n(s(r).cancel), 9, Be),
              e("button", {
                type: "button",
                "data-sheet-action": "confirm-clear",
                disabled: t.busy,
                onClick: j
              }, n(s(r).confirmClear), 9, qe)
            ])) : (d(), u("button", {
              key: 0,
              type: "button",
              class: "coc-clear",
              "data-sheet-action": "clear",
              disabled: t.busy,
              onClick: p[1] || (p[1] = (y) => v.value = !0)
            }, n(s(r).clear), 9, je))], 64)) : C("", !0)
          ]),
          e("footer", Ae, [o.value ? (d(), u("p", Re, n(o.value), 1)) : C("", !0), e("div", Ne, [
            e("button", {
              type: "button",
              class: "coc-random",
              "data-sheet-action": "generate",
              disabled: t.busy,
              onClick: i
            }, n(s(r).generate), 9, De),
            !a.value && t.sheet ? (d(), u("span", Fe, n(s(r).saved), 1)) : C("", !0),
            a.value ? (d(), u("button", {
              key: 1,
              type: "button",
              "data-sheet-action": "cancel",
              disabled: t.busy,
              onClick: h
            }, n(s(r).cancel), 9, Me)) : C("", !0),
            e("button", {
              type: "button",
              class: "primary",
              "data-sheet-action": "save",
              disabled: t.busy || !a.value || !x.value,
              onClick: m
            }, n(t.busy ? s(r).saving : s(r).save), 9, Pe)
          ])])
        ])]),
        _: 1
      }, 8, ["busy"])) : C("", !0)
    ], 64));
  }
}), Y = (t, l) => {
  const a = t.__vccOpts || t;
  for (const [c, o] of l) a[c] = o;
  return a;
}, Ue = /* @__PURE__ */ Y(Le, [["__scopeId", "data-v-335b87cd"]]), Ve = { class: "dice-app" }, He = {
  "aria-labelledby": "dice-action-label",
  class: "dice-feature"
}, Ke = { class: "dice-switch-row" }, ze = ["aria-checked", "disabled"], Ge = { class: "dice-sr" }, Ye = ["disabled"], Qe = { class: "dice-frequency-options" }, Xe = ["aria-pressed", "onClick"], Je = {
  id: "dice-rule-description",
  "aria-live": "polite"
}, We = ["disabled"], Ze = { class: "dice-frequency-options" }, ea = ["aria-pressed", "onClick"], aa = {
  id: "dice-frequency-description",
  "aria-live": "polite"
}, ta = {
  "aria-labelledby": "dice-encounter-label",
  class: "dice-feature"
}, la = { class: "dice-switch-row" }, ia = ["aria-checked", "disabled"], sa = { class: "dice-sr" }, na = {
  key: 0,
  class: "dice-recovery",
  "aria-live": "polite"
}, ra = "使用不支持预填充的模型时，请关闭「续写预填充」，并保留预设「实用提示词」里的「继续推进」内容（不能为空）。", ca = /* @__PURE__ */ K({
  __name: "DiceApp",
  props: {
    bridge: {},
    initialState: {}
  },
  setup(t) {
    const l = t, a = I(l.initialState), c = I(!1), o = I(""), v = {
      standard: {
        label: "标准",
        description: "有风险或阻力，且成败会改变后续的行动才检定。"
      },
      active: {
        label: "积极",
        description: "日常小目标，以及效果、耗时和代价的不确定性也可检定。"
      }
    }, k = {
      d20: {
        label: "通用 D20",
        description: "不需要人物数值，由情境决定难度。"
      },
      coc7: {
        label: r.rule,
        description: r.description
      }
    };
    let x = () => {
    }, g = !1, E = 0;
    W(() => {
      g = !0, x = l.bridge.subscribe((O) => {
        if (O.type === "dice/state") {
          const i = O.payload.state;
          i.chatIdentity === a.value.chatIdentity && (E++, a.value = i);
        }
      });
    }), X(() => {
      g = !1, x();
    });
    async function w(O, i, m = !0) {
      if (c.value) return !1;
      c.value = !0, o.value = "";
      const h = a.value.chatIdentity, j = E;
      try {
        const b = await l.bridge.request(O, {
          chatIdentity: h,
          ...i
        });
        return g && j === E && b.result.chatIdentity === h && (a.value = b.result), g && b.result.chatIdentity === h;
      } catch (b) {
        return g && m && (o.value = b instanceof ee && b.code === "app_request_failed" ? b.message : "操作未完成，请稍后重试。"), !1;
      } finally {
        g && (c.value = !1);
      }
    }
    return (O, i) => (d(), u("main", Ve, [
      e("section", He, [
        e("div", Ke, [i[3] || (i[3] = e("h1", { id: "dice-action-label" }, "行动检定", -1)), e("button", {
          type: "button",
          class: "dice-switch",
          role: "switch",
          "aria-labelledby": "dice-action-label",
          "aria-checked": a.value.actionChecksEnabled,
          disabled: c.value,
          onClick: i[0] || (i[0] = (m) => w("dice/set-feature", {
            feature: "actionChecksEnabled",
            enabled: !a.value.actionChecksEnabled
          }))
        }, [i[2] || (i[2] = e("span", { "aria-hidden": "true" }, null, -1)), e("span", Ge, n(a.value.actionChecksEnabled ? "关闭" : "开启"), 1)], 8, ze)]),
        i[9] || (i[9] = e("p", { class: "dice-intro" }, "当你尝试不确定的事——说服陌生人、翻越高墙、破译符文——由骰子裁决，而非 AI。一次真随机掷骰仲裁结果，故事顺从命运。", -1)),
        a.value.actionChecksEnabled ? (d(), u("fieldset", {
          key: 0,
          class: "dice-frequency",
          disabled: c.value,
          "aria-describedby": "dice-rule-description"
        }, [
          i[4] || (i[4] = e("legend", null, "检定规则", -1)),
          e("div", Qe, [(d(), u($, null, T(k, (m, h) => e("button", {
            key: h,
            type: "button",
            class: "dice-frequency-option",
            "aria-pressed": a.value.actionCheckRule === h,
            onClick: (j) => a.value.actionCheckRule !== h && w("dice/set-rule", { rule: h })
          }, n(m.label), 9, Xe)), 64))]),
          e("p", Je, n(k[a.value.actionCheckRule].description), 1)
        ], 8, Ye)) : C("", !0),
        a.value.actionChecksEnabled && a.value.actionCheckRule === "d20" ? (d(), u("fieldset", {
          key: 1,
          class: "dice-frequency",
          disabled: c.value,
          "aria-describedby": "dice-frequency-description"
        }, [
          i[5] || (i[5] = e("legend", null, "检定频率", -1)),
          e("div", Ze, [(d(), u($, null, T(v, (m, h) => e("button", {
            key: h,
            type: "button",
            class: "dice-frequency-option",
            "aria-pressed": a.value.actionCheckFrequency === h,
            onClick: (j) => a.value.actionCheckFrequency !== h && w("dice/set-frequency", { frequency: h })
          }, n(m.label), 9, ea)), 64))]),
          e("p", aa, n(v[a.value.actionCheckFrequency].description), 1)
        ], 8, We)) : C("", !0),
        a.value.coc7Sheet.kind === "invalid" || a.value.actionChecksEnabled && a.value.actionCheckRule === "coc7" ? (d(), z(Ue, {
          key: 2,
          sheet: a.value.coc7Sheet.kind === "ready" ? a.value.coc7Sheet.sheet : null,
          invalid: a.value.coc7Sheet.kind === "invalid",
          busy: c.value,
          save: (m) => w("dice/set-coc7-sheet", { sheet: m }, !1)
        }, null, 8, [
          "sheet",
          "invalid",
          "busy",
          "save"
        ])) : C("", !0),
        e("aside", { class: "dice-notice" }, [
          i[6] || (i[6] = e("p", null, "请勿开启酒馆的「自动续写」。", -1)),
          e("p", null, n(ra)),
          i[7] || (i[7] = e("p", null, "酒馆 1.14 / 1.15：行动检定的自动续写会发送输入框中尚未发送的文字。", -1)),
          i[8] || (i[8] = e("p", null, "功能开启期间，会自动创建「小白 OS · 行动检定显示」全局正则。", -1))
        ])
      ]),
      e("section", ta, [
        e("div", la, [i[11] || (i[11] = e("h2", { id: "dice-encounter-label" }, "随机遭遇", -1)), e("button", {
          type: "button",
          class: "dice-switch",
          role: "switch",
          "aria-labelledby": "dice-encounter-label",
          "aria-checked": a.value.encountersEnabled,
          disabled: c.value,
          onClick: i[1] || (i[1] = (m) => w("dice/set-feature", {
            feature: "encountersEnabled",
            enabled: !a.value.encountersEnabled
          }))
        }, [i[10] || (i[10] = e("span", { "aria-hidden": "true" }, null, -1)), e("span", sa, n(a.value.encountersEnabled ? "关闭" : "开启"), 1)], 8, ia)]),
        i[12] || (i[12] = e("p", null, "偶尔为剧情添一点变数，也可从已开启的世界背景与剧情记忆中寻找灵感。", -1)),
        i[13] || (i[13] = e("p", { class: "dice-rates" }, [
          q("轻微 5% "),
          e("span", { "aria-hidden": "true" }, "·"),
          q(" 中等 3% "),
          e("span", { "aria-hidden": "true" }, "·"),
          q(" 重大 1%")
        ], -1)),
        i[14] || (i[14] = e("p", { class: "dice-cooldown" }, "触发后，接下来的两次用户发言不会触发新遭遇。不额外调用模型。", -1))
      ]),
      o.value ? (d(), u("section", na, [e("p", null, n(o.value), 1)])) : C("", !0)
    ]));
  }
}), va = /* @__PURE__ */ Y(ca, [["__scopeId", "data-v-bd1d730a"]]);
export {
  va as default
};
