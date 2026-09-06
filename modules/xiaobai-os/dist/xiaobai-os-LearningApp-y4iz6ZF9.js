/* eslint-disable */
import { A as ee, B as Q, C as te, E as A, H as u, I as V, L as ae, N as U, R as le, T as n, _ as ne, a as D, b as F, c as z, d as e, f as O, g as S, i as K, j as N, l as w, m as i, o as G, p, s as X, u as R, v as j, x as ie, y as Y, z as s } from "./xiaobai-os-runtime-dom.esm-bundler-DwdCK5Jt.js";
var se = ["disabled"], re = {
  key: 0,
  class: "learning-choices"
}, ue = [
  "type",
  "checked",
  "onChange"
], de = { class: "learning-option-letter" }, oe = {
  key: 1,
  class: "learning-order"
}, ve = [
  "disabled",
  "aria-label",
  "onClick"
], be = [
  "disabled",
  "aria-label",
  "onClick"
], ge = {
  key: 2,
  class: "learning-fields"
}, me = ["onUpdate:modelValue"], ye = ["value"], ke = {
  key: 3,
  class: "learning-choices"
}, pe = ["checked", "onChange"], fe = {
  key: 0,
  class: "learning-muted"
}, $e = {
  key: 4,
  class: "learning-fields"
}, ce = ["onUpdate:modelValue"], Ce = {
  key: 5,
  class: "learning-writing"
}, xe = ["disabled"], he = /* @__PURE__ */ j({
  __name: "AnswerInput",
  props: /* @__PURE__ */ Y({
    response: {},
    paragraphs: {},
    disabled: { type: Boolean }
  }, {
    modelValue: { required: !0 },
    modelModifiers: {}
  }),
  emits: /* @__PURE__ */ Y(["submit"], ["update:modelValue"]),
  setup(a, { emit: l }) {
    const f = a, d = l, r = ee(a, "modelValue");
    function b(y) {
      f.response.kind === "choice" && !f.response.multiple ? r.value.picked = [y] : r.value.picked = r.value.picked.includes(y) ? r.value.picked.filter(($) => $ !== y) : [...r.value.picked, y];
    }
    function C(y, $) {
      const o = [...r.value.order];
      [o[y], o[y + $]] = [o[y + $], o[y]], r.value.order = o;
    }
    const c = R(() => {
      const y = f.response;
      return y.kind === "text" ? !!r.value.text.trim() : y.kind === "gaps" ? y.slots.every(($) => r.value.values[$.id]?.trim()) : y.kind === "match" ? y.left.every(($) => r.value.values[$.id]) : y.kind === "order" ? !0 : r.value.picked.length > 0;
    });
    function g() {
      const y = f.response;
      !c.value || f.disabled || (y.kind === "text" ? d("submit", {
        kind: "text",
        text: r.value.text
      }) : y.kind === "gaps" ? d("submit", {
        kind: "gaps",
        values: y.slots.map(($) => ({
          id: $.id,
          text: r.value.values[$.id]
        }))
      }) : y.kind === "match" ? d("submit", {
        kind: "match",
        pairs: y.left.map(($) => ({
          left: $.id,
          right: r.value.values[$.id]
        }))
      }) : d("submit", {
        kind: y.kind,
        ids: [...y.kind === "order" ? r.value.order : r.value.picked]
      }));
    }
    return (y, $) => (n(), i("form", {
      class: "learning-answer",
      onSubmit: z(g, ["prevent"])
    }, [e("fieldset", { disabled: a.disabled }, [
      $[3] || ($[3] = e("legend", { class: "learning-eyebrow" }, "你的回答", -1)),
      a.response.kind === "choice" ? (n(), i("div", re, [(n(!0), i(w, null, A(a.response.options, (o, k) => (n(), i("label", {
        key: o.id,
        class: Q({ selected: r.value.picked.includes(o.id) })
      }, [
        e("input", {
          type: a.response.multiple ? "checkbox" : "radio",
          name: "answer-choice",
          checked: r.value.picked.includes(o.id),
          onChange: (L) => b(o.id)
        }, null, 40, ue),
        e("span", de, u(String.fromCharCode(65 + k)), 1),
        e("span", null, u(o.text), 1)
      ], 2))), 128))])) : a.response.kind === "order" ? (n(), i("ol", oe, [(n(!0), i(w, null, A(r.value.order, (o, k) => (n(), i("li", { key: o }, [
        e("span", null, u(a.response.options.find((L) => L.id === o)?.text), 1),
        e("button", {
          type: "button",
          disabled: k === 0,
          "aria-label": `上移第 ${k + 1} 项`,
          onClick: (L) => C(k, -1)
        }, "↑", 8, ve),
        e("button", {
          type: "button",
          disabled: k === r.value.order.length - 1,
          "aria-label": `下移第 ${k + 1} 项`,
          onClick: (L) => C(k, 1)
        }, "↓", 8, be)
      ]))), 128))])) : a.response.kind === "match" ? (n(), i("div", ge, [(n(!0), i(w, null, A(a.response.left, (o) => (n(), i("label", { key: o.id }, [S(u(o.text) + " ", 1), U(e("select", { "onUpdate:modelValue": (k) => r.value.values[o.id] = k }, [$[1] || ($[1] = e("option", { value: "" }, "选择对应项", -1)), (n(!0), i(w, null, A(a.response.right, (k) => (n(), i("option", {
        key: k.id,
        value: k.id
      }, u(k.text), 9, ye))), 128))], 8, me), [[K, r.value.values[o.id]]])]))), 128))])) : a.response.kind === "evidence" ? (n(), i("div", ke, [(n(!0), i(w, null, A(a.paragraphs, (o) => (n(), i("label", {
        key: o.id,
        class: Q({ selected: r.value.picked.includes(o.id) })
      }, [e("input", {
        type: "checkbox",
        checked: r.value.picked.includes(o.id),
        onChange: (k) => b(o.id)
      }, null, 40, pe), e("span", null, u(o.text), 1)], 2))), 128)), a.paragraphs.length ? p("", !0) : (n(), i("p", fe, "请先展开相关文稿，再选择原文依据。"))])) : a.response.kind === "gaps" ? (n(), i("div", $e, [(n(!0), i(w, null, A(a.response.slots, (o) => (n(), i("label", { key: o.id }, [S(u(o.text), 1), U(e("input", {
        "onUpdate:modelValue": (k) => r.value.values[o.id] = k,
        type: "text",
        maxlength: "4000",
        autocomplete: "off"
      }, null, 8, ce), [[D, r.value.values[o.id]]])]))), 128))])) : (n(), i("label", Ce, [$[2] || ($[2] = e("span", { class: "learning-muted" }, "用你自己的表达就好。", -1)), U(e("textarea", {
        "onUpdate:modelValue": $[0] || ($[0] = (o) => r.value.text = o),
        rows: "6",
        maxlength: "4000",
        placeholder: "在这里写下你的回答…"
      }, null, 512), [[D, r.value.text]])])),
      e("button", {
        class: "learning-primary",
        type: "submit",
        disabled: !c.value
      }, "交给老师 →", 8, xe)
    ], 8, se)], 32));
  }
}), we = he, Ie = { class: "learning-material" }, Se = { class: "learning-eyebrow" }, Le = { class: "learning-source" }, Ae = { key: 0 }, Ve = ["href"], Ue = {
  key: 0,
  class: "learning-listening-cover"
}, Me = ["disabled"], Re = {
  key: 1,
  class: "learning-material-body"
}, qe = ["onMouseup", "onKeyup"], Ne = ["disabled", "onClick"], Be = {
  class: "learning-audio-parts",
  "aria-label": "材料朗读分段"
}, Te = ["disabled", "onClick"], De = /* @__PURE__ */ j({
  __name: "MaterialReader",
  props: {
    material: {},
    disabled: { type: Boolean },
    exerciseId: {},
    listening: { type: Boolean }
  },
  emits: ["action", "select"],
  setup(a, { emit: l }) {
    const f = a, d = l;
    function r(C) {
      d("select", {
        materialId: f.material.id,
        paragraphId: C.id,
        start: 0,
        end: C.text.length,
        quote: C.text
      });
    }
    function b(C, c) {
      const g = window.getSelection();
      if (!g?.rangeCount || g.isCollapsed) return;
      const y = g.getRangeAt(0), $ = C.currentTarget;
      if (!$.contains(y.startContainer) || !$.contains(y.endContainer)) return;
      const o = y.cloneRange();
      o.selectNodeContents($), o.setEnd(y.startContainer, y.startOffset);
      const k = y.toString(), L = o.toString().length;
      k && [...k].length <= 2e3 && c.text.slice(L, L + k.length) === k && d("select", {
        materialId: f.material.id,
        paragraphId: c.id,
        start: L,
        end: L + k.length,
        quote: k
      });
    }
    return (C, c) => (n(), i("article", Ie, [
      e("p", Se, u(a.listening ? "Listening · 听力材料" : "Reading · 阅读材料"), 1),
      e("h2", null, u(a.material.title), 1),
      e("div", Le, [a.material.provenance.kind === "authored" ? (n(), i("span", Ae, "老师自编练习")) : (n(), i("a", {
        key: 1,
        href: a.material.provenance.url,
        target: "_blank",
        rel: "noopener noreferrer"
      }, u(a.material.provenance.kind === "original" ? "原文节选" : "改编自") + " · " + u(a.material.provenance.title) + " ↗", 9, Ve))]),
      a.material.hidden ? (n(), i("div", Ue, [
        c[1] || (c[1] = e("svg", {
          viewBox: "0 0 140 60",
          "aria-hidden": "true"
        }, [e("path", {
          d: "M8 27v6m10-14v22m10-31v40m10-26v12m10-35v58m10-47v36m10-27v18m10-37v56m10-36v16m10-29v42m10-31v20m10-16v12m10-8v4",
          stroke: "currentColor",
          "stroke-width": "3",
          "stroke-linecap": "round",
          fill: "none"
        })], -1)),
        c[2] || (c[2] = e("p", null, "先用耳朵，认识这段话。", -1)),
        c[3] || (c[3] = e("small", null, "需要时可以看文稿，这次练习会记为有辅助。", -1)),
        e("button", {
          type: "button",
          disabled: a.disabled,
          onClick: c[0] || (c[0] = (g) => d("action", "reveal", {
            kind: "transcripts",
            id: a.material.id
          }))
        }, "看文稿", 8, Me)
      ])) : (n(), i("div", Re, [(n(!0), i(w, null, A(a.material.paragraphs, (g) => (n(), i("div", {
        key: g.id,
        class: "learning-paragraph"
      }, [e("p", {
        tabindex: "0",
        onMouseup: (y) => b(y, g),
        onKeyup: (y) => b(y, g)
      }, u(g.text), 41, qe), e("button", {
        type: "button",
        disabled: a.disabled || [...g.text].length > 2e3,
        "aria-label": "选这段提问",
        onClick: (y) => r(g)
      }, "选段", 8, Ne)]))), 128))])),
      e("div", Be, [(n(!0), i(w, null, A(a.material.parts, (g) => (n(), i("button", {
        key: g.key,
        type: "button",
        disabled: a.disabled,
        onClick: (y) => d("action", "play", {
          materialId: a.material.id,
          partKey: g.key,
          exerciseId: a.exerciseId
        })
      }, " ▷ " + u(a.material.parts.length > 1 ? `听第 ${g.number} 段` : "听这段"), 9, Te))), 128))]),
      c[4] || (c[4] = e("small", null, "声音为 TTS 合成朗读，不是来源网站的原声。", -1))
    ]));
  }
}), je = De;
function Z(a, l, f = []) {
  const d = (r) => l.kind === "choice" || l.kind === "order" ? l.options.find((b) => b.id === r)?.text ?? r : f.find((b) => b.id === r)?.text ?? r;
  return a.kind === "text" ? a.text : a.kind === "gaps" ? a.values.map((r) => `${l.kind === "gaps" ? l.slots.find((b) => b.id === r.id)?.text ?? "" : ""} ${r.text}`).join(`
`) : a.kind === "match" ? a.pairs.map((r) => l.kind === "match" ? `${l.left.find((b) => b.id === r.left)?.text} → ${l.right.find((b) => b.id === r.right)?.text}` : "").join(`
`) : a.ids.map(d).join(a.kind === "order" ? " → " : `
`);
}
var Ee = { class: "learning-feedback" }, Oe = { class: "learning-muted" }, ze = { key: 0 }, Ke = { key: 1 }, Pe = { key: 0 }, He = { key: 1 }, Fe = { key: 2 }, Je = ["disabled"], We = ["disabled"], Qe = /* @__PURE__ */ j({
  __name: "AttemptFeedback",
  props: {
    attempt: {},
    feedback: {},
    response: {},
    paragraphs: {},
    disabled: { type: Boolean }
  },
  emits: ["action"],
  setup(a) {
    const l = {
      correct: "答对了",
      partial: "已经掌握一部分",
      incorrect: "一起把这里弄懂",
      disputed: "这处还需复核"
    };
    return (f, d) => (n(), i("section", Ee, [
      d[6] || (d[6] = e("p", { class: "learning-eyebrow" }, "已保存的原答", -1)),
      e("blockquote", null, u(s(Z)(a.attempt.answer, a.response, a.paragraphs)), 1),
      e("small", Oe, [
        S(u(a.attempt.help.feedback ? "得到反馈后的再练" : a.attempt.help.answer || a.attempt.help.hint || a.attempt.help.transcript ? "这次有辅助" : "未使用答案或提示"), 1),
        a.attempt.help.replays ? (n(), i("span", ze, " · 重听 " + u(a.attempt.help.replays) + " 次", 1)) : p("", !0),
        a.attempt.help.slowPlayback ? (n(), i("span", Ke, " · 慢放")) : p("", !0)
      ]),
      a.feedback ? (n(), i(w, { key: 0 }, [
        e("h3", null, u(l[a.feedback.verdict]), 1),
        a.feedback.understanding ? (n(), i("p", Pe, [d[2] || (d[2] = e("b", null, "理解", -1)), S(u(a.feedback.understanding), 1)])) : p("", !0),
        a.feedback.expression ? (n(), i("p", He, [d[3] || (d[3] = e("b", null, "表达", -1)), S(u(a.feedback.expression), 1)])) : p("", !0),
        a.feedback.guidance ? (n(), i("p", Fe, [d[4] || (d[4] = e("b", null, "批注", -1)), S(u(a.feedback.guidance), 1)])) : p("", !0),
        e("button", {
          type: "button",
          disabled: a.disabled,
          onClick: d[0] || (d[0] = (r) => f.$emit("action", "assess", {
            attemptId: a.attempt.id,
            review: !0,
            message: "请重新审视我的原答与题目。也请考虑其他有效表达，不只对照原来的答案键。"
          }))
        }, u(a.feedback.verdict === "disputed" ? "请老师复核" : "有疑问，请复核"), 9, Je)
      ], 64)) : (n(), i(w, { key: 1 }, [d[5] || (d[5] = e("p", null, "原答已保存，等待老师评估。", -1)), e("button", {
        type: "button",
        disabled: a.disabled,
        onClick: d[1] || (d[1] = (r) => f.$emit("action", "assess", {
          attemptId: a.attempt.id,
          review: !1,
          message: "请评估这条已经保存的原答。"
        }))
      }, "重试评估", 8, We)], 64))
    ]));
  }
}), _ = Qe;
function Ge(a) {
  return {
    picked: [],
    text: "",
    values: {},
    order: a.kind === "order" ? a.options.map((l) => l.id) : []
  };
}
var Xe = {
  key: 0,
  class: "learning-classroom"
}, Ye = { class: "learning-lesson-header" }, Ze = { class: "learning-eyebrow" }, _e = { class: "learning-muted" }, et = {
  class: "learning-question-nav",
  "aria-label": "题目导航"
}, tt = [
  "disabled",
  "aria-current",
  "onClick"
], at = {
  key: 0,
  "aria-label": "已作答"
}, lt = { class: "learning-classroom-columns" }, nt = { class: "learning-course" }, it = { class: "learning-question" }, st = { class: "learning-eyebrow" }, rt = { class: "learning-help-actions" }, ut = ["disabled"], dt = ["disabled"], ot = ["disabled"], vt = {
  key: 0,
  class: "learning-margin-note"
}, bt = {
  key: 1,
  class: "learning-margin-note"
}, gt = { key: 0 }, mt = { key: 1 }, yt = ["disabled"], kt = {
  key: 4,
  class: "learning-row"
}, pt = ["disabled"], ft = ["disabled"], $t = ["disabled"], ct = {
  key: 0,
  class: "learning-harvest-inline"
}, Ct = { class: "learning-tutor" }, xt = ["open"], ht = {
  key: 0,
  class: "learning-selection"
}, wt = { class: "learning-row" }, It = ["disabled"], St = ["maxlength"], Lt = ["disabled"], At = {
  key: 0,
  class: "learning-teacher-reply"
}, Vt = { class: "learning-eyebrow" }, Ut = ["disabled"], Mt = ["disabled"], Rt = {
  key: 1,
  class: "learning-notes"
}, qt = { key: 0 }, Nt = ["disabled", "onClick"], Bt = /* @__PURE__ */ j({
  __name: "LearningLesson",
  props: {
    state: {},
    disabled: { type: Boolean }
  },
  emits: ["action"],
  setup(a, { emit: l }) {
    const f = a, d = l, r = V(0), b = V(!1), C = V(""), c = V(null), g = R(() => f.state.unit?.exercises[r.value]), y = R(() => f.state.unit?.attempts.filter((h) => h.exerciseId === g.value?.id).at(-1)), $ = R(() => f.state.unit?.assessments.find((h) => h.attemptId === y.value?.id)), o = V({});
    N([() => g.value?.id, () => y.value?.id], ([h, m]) => {
      h && (!o.value[h] || o.value[h].attemptId !== m) && (o.value[h] = {
        attemptId: m,
        value: Ge(g.value.response)
      });
    }, { immediate: !0 });
    const k = R({
      get: () => o.value[g.value.id].value,
      set(h) {
        o.value[g.value.id] = {
          attemptId: y.value?.id,
          value: h
        };
      }
    }), L = R(() => f.state.unit?.materials.filter((h) => g.value?.materialIds.includes(h.id)) ?? []), T = R(() => L.value.filter((h) => g.value?.response.kind !== "evidence" || h.id === g.value.response.materialId).flatMap((h) => h.paragraphs)), q = R(() => f.state.completions.find((h) => h.unitId === f.state.unit?.id)), B = R(() => f.state.unit?.exercises.every((h) => f.state.unit?.attempts.some((m) => m.exerciseId === h.id)));
    N(() => f.state.unit?.id, () => {
      r.value = 0, b.value = !1, c.value = null, C.value = "";
    }), N(r, () => {
      b.value = !1, c.value = null, d("action", "stop");
    }), N(() => y.value?.id, () => {
      b.value = !1;
    });
    const P = {
      reading: "阅读理解",
      listening: "听力练习",
      vocabulary: "词汇运用",
      grammar: "语法练习",
      writing: "表达练习"
    };
    function H() {
      !g.value || !C.value.trim() || d("action", "explain", {
        exerciseId: g.value.id,
        message: C.value,
        ...c.value ? { selection: c.value } : {}
      });
    }
    return (h, m) => a.state.unit && g.value ? (n(), i("div", Xe, [e("header", Ye, [
      e("p", Ze, [m[17] || (m[17] = S("今日这一课 ", -1)), e("span", null, "完成奖励 " + u(a.state.unit.reward.amount) + " 币", 1)]),
      e("h1", null, u(a.state.unit.title), 1),
      e("p", _e, u(a.state.unit.goal), 1),
      e("nav", et, [(n(!0), i(w, null, A(a.state.unit.exercises, (x, M) => (n(), i("button", {
        key: x.id,
        type: "button",
        disabled: a.disabled,
        "aria-current": M === r.value ? "step" : void 0,
        onClick: (E) => r.value = M
      }, [S(u(String(M + 1).padStart(2, "0")), 1), a.state.unit.attempts.some((E) => E.exerciseId === x.id) ? (n(), i("span", at, " ·")) : p("", !0)], 8, tt))), 128))])
    ]), e("div", lt, [e("div", nt, [
      (n(!0), i(w, null, A(L.value, (x) => (n(), O(je, {
        key: x.id,
        material: x,
        "exercise-id": g.value.id,
        disabled: a.disabled,
        listening: g.value.skill === "listening",
        onAction: m[0] || (m[0] = (M, E) => d("action", M, E)),
        onSelect: m[1] || (m[1] = (M) => c.value = M)
      }, null, 8, [
        "material",
        "exercise-id",
        "disabled",
        "listening"
      ]))), 128)),
      e("section", it, [
        e("p", st, u(P[g.value.skill]) + " · " + u(r.value + 1) + " / " + u(a.state.unit.exercises.length), 1),
        e("h2", null, u(g.value.prompt), 1),
        e("div", rt, [
          e("button", {
            type: "button",
            disabled: a.disabled || [...g.value.prompt].length > 1e3,
            onClick: m[2] || (m[2] = (x) => d("action", "say-question", { exerciseId: g.value.id }))
          }, "听题干", 8, ut),
          g.value.hasHint ? (n(), i("button", {
            key: 0,
            type: "button",
            disabled: a.disabled || g.value.hint !== null,
            onClick: m[3] || (m[3] = (x) => d("action", "reveal", {
              kind: "hints",
              id: g.value.id
            }))
          }, "给我一点提示", 8, dt)) : p("", !0),
          e("button", {
            type: "button",
            disabled: a.disabled || g.value.solution !== null,
            onClick: m[4] || (m[4] = (x) => d("action", "reveal", {
              kind: "answers",
              id: g.value.id
            }))
          }, "看看解答", 8, ot)
        ]),
        g.value.hint ? (n(), i("p", vt, u(g.value.hint), 1)) : p("", !0),
        g.value.solution ? (n(), i("div", bt, [g.value.solution.kind === "exact" ? (n(), i("p", gt, u(s(Z)(g.value.solution.answer, g.value.response, T.value)), 1)) : g.value.solution.kind === "gaps" ? (n(), i("p", mt, u(g.value.solution.accepted.map((x) => x.forms.join(" / ")).join(`
`)), 1)) : p("", !0), g.value.solution.kind === "exact" || g.value.solution.kind === "gaps" ? (n(), i(w, { key: 2 }, [S(u(g.value.solution.explanation), 1)], 64)) : (n(), i(w, { key: 3 }, [m[18] || (m[18] = S(" 这是一道开放题，老师会根据你的表达评估。 ", -1)), e("button", {
          type: "button",
          disabled: a.disabled,
          onClick: m[5] || (m[5] = (x) => d("action", "explain", {
            exerciseId: g.value.id,
            message: "请讲解这道题，给我一个适合当前水平的参考表达。"
          }))
        }, "请老师示范", 8, yt)], 64))])) : p("", !0),
        !y.value || b.value ? (n(), O(we, {
          key: g.value.id,
          modelValue: k.value,
          "onUpdate:modelValue": m[6] || (m[6] = (x) => k.value = x),
          response: g.value.response,
          paragraphs: T.value,
          disabled: a.disabled,
          onSubmit: m[7] || (m[7] = (x) => d("action", "submit", {
            unitId: a.state.unit.id,
            exerciseId: g.value.id,
            answer: x
          }))
        }, null, 8, [
          "modelValue",
          "response",
          "paragraphs",
          "disabled"
        ])) : p("", !0),
        y.value ? (n(), O(_, {
          key: 3,
          attempt: y.value,
          feedback: $.value,
          response: g.value.response,
          paragraphs: T.value,
          disabled: a.disabled,
          onAction: m[8] || (m[8] = (x, M) => d("action", x, M))
        }, null, 8, [
          "attempt",
          "feedback",
          "response",
          "paragraphs",
          "disabled"
        ])) : p("", !0),
        y.value ? (n(), i("div", kt, [e("button", {
          type: "button",
          disabled: a.disabled,
          onClick: m[9] || (m[9] = (x) => b.value = !b.value)
        }, u(b.value ? "收起再练" : "再试一次"), 9, pt), r.value + 1 < a.state.unit.exercises.length ? (n(), i("button", {
          key: 0,
          class: "learning-primary",
          type: "button",
          disabled: a.disabled,
          onClick: m[10] || (m[10] = (x) => r.value++)
        }, "下一题 →", 8, ft)) : !q.value && B.value && !a.state.busy ? (n(), i("button", {
          key: 1,
          type: "button",
          disabled: a.disabled,
          onClick: m[11] || (m[11] = (x) => d("action", "complete"))
        }, "请老师看看能否收课", 8, $t)) : p("", !0)])) : p("", !0)
      ]),
      q.value ? (n(), i("section", ct, [
        m[19] || (m[19] = e("p", { class: "learning-eyebrow" }, "这一课，已有收获", -1)),
        e("p", null, u(q.value.summary), 1),
        e("strong", null, u(q.value.paid ? `+${q.value.amount} 小白币 · 已到账` : "学习已完成，到账状态见「收获」"), 1),
        m[20] || (m[20] = e("small", null, "可以继续追问，不会重复发奖。", -1))
      ])) : p("", !0)
    ]), e("aside", Ct, [
      e("details", { open: !!c.value }, [
        e("summary", null, [e("span", null, u(a.state.teacher?.name) + "的批注", 1), m[21] || (m[21] = e("span", null, "问老师 ↗", -1))]),
        c.value ? (n(), i("div", ht, [e("blockquote", null, u(c.value.quote), 1), e("div", wt, [e("button", {
          type: "button",
          onClick: m[12] || (m[12] = (x) => c.value = null)
        }, "取消选段"), e("button", {
          type: "button",
          disabled: a.disabled || [...c.value.quote].length > 1e3,
          onClick: m[13] || (m[13] = (x) => d("action", "say", { selection: c.value }))
        }, "朗读选段", 8, It)])])) : p("", !0),
        e("form", { onSubmit: z(H, ["prevent"]) }, [e("label", null, [m[22] || (m[22] = S("哪里还不明白？", -1)), U(e("textarea", {
          "onUpdate:modelValue": m[14] || (m[14] = (x) => C.value = x),
          rows: "3",
          maxlength: c.value ? 1800 : 2e3,
          placeholder: "解释这个用法，或者帮我换个例子…"
        }, null, 8, St), [[D, C.value]])]), e("button", {
          class: "learning-primary",
          type: "submit",
          disabled: a.disabled || !C.value.trim()
        }, "问老师", 8, Lt)], 32),
        m[23] || (m[23] = e("small", { class: "learning-muted" }, "提问会使用模型；选段和阅读不会。", -1))
      ], 8, xt),
      a.state.reply ? (n(), i("div", At, [
        e("p", Vt, u(a.state.teacher?.name) + " · 老师", 1),
        e("p", null, u(a.state.reply.text), 1),
        [...a.state.reply.text].length <= 1e3 ? (n(), i("button", {
          key: 0,
          type: "button",
          disabled: a.disabled,
          onClick: m[15] || (m[15] = (x) => d("action", "say-reply"))
        }, "听老师说", 8, Ut)) : p("", !0),
        a.state.reply.exerciseId ? (n(), i("button", {
          key: 1,
          type: "button",
          disabled: a.disabled || [...a.state.reply.text].length > 4e3 || a.state.unit.notes.some((x) => x.text === a.state.reply.text),
          onClick: m[16] || (m[16] = (x) => d("action", "save-note"))
        }, "留在本课笔记里", 8, Mt)) : p("", !0)
      ])) : p("", !0),
      a.state.unit.notes.length ? (n(), i("details", Rt, [
        e("summary", null, "本课笔记 · " + u(a.state.unit.notes.length), 1),
        (n(!0), i(w, null, A(a.state.unit.notes, (x) => (n(), i("article", { key: x.id }, [
          x.selection ? (n(), i("blockquote", qt, u(x.selection.quote), 1)) : p("", !0),
          e("p", null, u(x.text), 1),
          e("button", {
            type: "button",
            disabled: a.disabled,
            onClick: (M) => d("action", "delete-note", { id: x.id })
          }, "移除笔记", 8, Nt)
        ]))), 128)),
        m[24] || (m[24] = e("small", null, "随本课保留，换课前可以导出学习数据留存。", -1))
      ])) : p("", !0)
    ])])])) : p("", !0);
  }
}), Tt = Bt, Dt = { class: "learning-profile-page" }, jt = { class: "learning-language-choice" }, Et = ["value", "disabled"], Ot = ["value"], zt = ["value"], Kt = { class: "learning-choose-teacher" }, Pt = { class: "learning-muted" }, Ht = { class: "learning-teacher-options" }, Ft = [
  "disabled",
  "aria-pressed",
  "onClick"
], Jt = { class: "learning-person-initial" }, Wt = ["disabled"], Qt = ["disabled"], Gt = ["value"], Xt = ["disabled"], Yt = {
  key: 0,
  class: "learning-teacher-reply"
}, Zt = { class: "learning-eyebrow" }, _t = /* @__PURE__ */ j({
  __name: "LearningProfile",
  props: {
    state: {},
    disabled: { type: Boolean }
  },
  emits: ["action"],
  setup(a, { emit: l }) {
    const f = a, d = l, r = V(""), b = V(""), C = V(""), c = V("zh-CN");
    N(() => JSON.stringify([f.state.language, f.state.profile && {
      selfAssessment: f.state.profile.selfAssessment,
      goal: f.state.profile.goal,
      explanationLanguage: f.state.profile.explanationLanguage
    }]), () => {
      const $ = f.state.profile;
      b.value = $?.selfAssessment ?? "", C.value = $?.goal.description ?? "", c.value = $?.explanationLanguage ?? "zh-CN";
    }, { immediate: !0 });
    const g = [
      ["en", "英语"],
      ["ja", "日语"],
      ["ko", "韩语"],
      ["fr", "法语"],
      ["de", "德语"],
      ["es", "西班牙语"],
      ["zh-CN", "中文"]
    ];
    function y() {
      d("action", "profile", { message: JSON.stringify({
        language: f.state.language,
        explanationLanguage: c.value,
        selfAssessment: b.value,
        goal: { description: C.value }
      }) });
    }
    return ($, o) => (n(), i("section", Dt, [
      o[12] || (o[12] = e("p", { class: "learning-eyebrow" }, "先认识你，再一起学", -1)),
      e("h1", null, u(a.state.profile ? "调整学习方向" : "从你现在的位置开始。"), 1),
      o[13] || (o[13] = e("p", { class: "learning-muted" }, "不用准确评定等级。告诉老师你会什么，想做到什么。", -1)),
      e("label", jt, [o[6] || (o[6] = S("我想学", -1)), e("select", {
        value: a.state.language,
        disabled: a.disabled,
        onChange: o[0] || (o[0] = (k) => d("action", "language", { language: k.target.value }))
      }, [(n(), i(w, null, A(g, ([k, L]) => e("option", {
        key: k,
        value: k
      }, u(L), 9, Ot)), 64)), g.some(([k]) => k === a.state.language) ? p("", !0) : (n(), i("option", {
        key: 0,
        value: a.state.language
      }, u(a.state.language), 9, zt))], 40, Et)]),
      e("section", Kt, [
        o[7] || (o[7] = e("h2", null, "谁来陪你学？", -1)),
        e("p", Pt, u(a.state.teacher ? `现在是 ${a.state.teacher.name}。老师选择只属于当前聊天。` : "从已知人物里选一位老师。"), 1),
        e("div", Ht, [(n(!0), i(w, null, A(a.state.candidates, (k) => (n(), i("button", {
          key: k.name,
          type: "button",
          disabled: a.disabled,
          "aria-pressed": a.state.teacher?.name === k.name,
          onClick: (L) => d("action", "teacher", { teacher: {
            name: k.name,
            note: ""
          } })
        }, [e("span", Jt, u([...k.name][0]), 1), S(u(k.name), 1)], 8, Ft))), 128))]),
        e("form", {
          class: "learning-row",
          onSubmit: o[2] || (o[2] = z((k) => d("action", "teacher", { teacher: {
            name: r.value.trim(),
            note: ""
          } }), ["prevent"]))
        }, [U(e("input", {
          "onUpdate:modelValue": o[1] || (o[1] = (k) => r.value = k),
          type: "text",
          "aria-label": "其他人物名字",
          maxlength: "80",
          placeholder: "名单里没有？填写人物名字",
          disabled: a.disabled
        }, null, 8, Wt), [[D, r.value]]), e("button", {
          type: "submit",
          disabled: a.disabled || !r.value.trim()
        }, "选这位", 8, Qt)], 32)
      ]),
      e("form", {
        class: "learning-profile-form",
        onSubmit: z(y, ["prevent"])
      }, [
        e("label", null, [o[8] || (o[8] = e("span", null, "现在的我", -1)), U(e("textarea", {
          "onUpdate:modelValue": o[3] || (o[3] = (k) => b.value = k),
          rows: "3",
          maxlength: "800",
          placeholder: "比如：有高中英语基础，阅读还行，听力容易跟不上。"
        }, null, 512), [[D, b.value]])]),
        e("label", null, [o[9] || (o[9] = e("span", null, "我想走到哪里", -1)), U(e("textarea", {
          "onUpdate:modelValue": o[4] || (o[4] = (k) => C.value = k),
          rows: "3",
          maxlength: "800",
          placeholder: "比如：准备英语四级，希望能理解新闻并写出清楚的短文。也可以补充考试日期。"
        }, null, 512), [[D, C.value]])]),
        e("label", null, [o[10] || (o[10] = S("希望老师用什么语言讲解", -1)), U(e("select", { "onUpdate:modelValue": o[5] || (o[5] = (k) => c.value = k) }, [(n(), i(w, null, A(g, ([k, L]) => e("option", {
          key: k,
          value: k
        }, u(L), 9, Gt)), 64))], 512), [[K, c.value]])]),
        e("button", {
          type: "submit",
          class: "learning-primary",
          disabled: a.disabled || !a.state.teacher || !b.value.trim() || !C.value.trim()
        }, "请老师记住我的目标 →", 8, Xt),
        o[11] || (o[11] = e("small", null, "这一步会使用模型。目标与学习记录跟随用户，不随角色卡丢失。", -1))
      ], 32),
      a.state.reply ? (n(), i("div", Yt, [e("p", Zt, u(a.state.teacher?.name), 1), e("p", null, u(a.state.reply.text), 1)])) : p("", !0)
    ]));
  }
}), ea = _t, ta = { class: "learning-records-page" }, aa = { class: "learning-muted" }, la = {
  key: 0,
  class: "learning-muted"
}, na = ["disabled", "onClick"], ia = ["disabled"], sa = {
  key: 0,
  class: "learning-empty-note"
}, ra = ["disabled", "onClick"], ua = { key: 0 }, da = { class: "learning-row" }, oa = ["disabled"], va = { class: "learning-muted" }, ba = ["disabled"], ga = /* @__PURE__ */ j({
  __name: "LearningRecords",
  props: {
    state: {},
    disabled: { type: Boolean }
  },
  emits: ["action", "remove"],
  setup(a) {
    const l = {
      unassessed: "尚待练习",
      review: "待复核",
      independent: "已能独立使用",
      practised: "练过一次",
      strengthen: "再练练"
    };
    return (f, d) => (n(), i("section", ta, [
      d[5] || (d[5] = e("p", { class: "learning-eyebrow" }, "不是分数，是走过的路", -1)),
      d[6] || (d[6] = e("h1", null, "学习记录", -1)),
      a.state.record ? (n(), i(w, { key: 0 }, [
        e("button", {
          type: "button",
          onClick: d[0] || (d[0] = (r) => f.$emit("action", "records", { offset: a.state.records.offset }))
        }, "‹ 返回记录"),
        e("h2", null, u(a.state.record.label), 1),
        (n(!0), i(w, null, A(a.state.record.evidence, (r) => (n(), i("article", {
          key: r.attempt.id,
          class: "learning-record-evidence"
        }, [
          e("p", aa, u(new Date(r.attempt.submittedAt).toLocaleDateString()), 1),
          e("h3", null, u(r.exercise.prompt), 1),
          (n(!0), i(w, null, A(r.materials, (b) => (n(), i("details", { key: b.id }, [e("summary", null, u(b.title), 1), b.hidden ? (n(), i("p", la, "听力文稿尚未展开；原答和反馈如下。")) : (n(!0), i(w, { key: 1 }, A(b.paragraphs, (C) => (n(), i("p", { key: C.id }, u(C.text), 1))), 128))]))), 128)),
          ne(_, {
            attempt: r.attempt,
            feedback: r.assessment,
            response: r.exercise.response,
            paragraphs: r.materials.flatMap((b) => b.paragraphs),
            disabled: a.disabled,
            onAction: d[1] || (d[1] = (b, C) => f.$emit("action", b, C))
          }, null, 8, [
            "attempt",
            "feedback",
            "response",
            "paragraphs",
            "disabled"
          ]),
          e("button", {
            type: "button",
            disabled: a.disabled,
            onClick: (b) => f.$emit("remove", "delete-attempt", { id: r.attempt.id }, "删除这条原答和依赖它的反馈？相关学习项会重新计算，不撤回已到账奖励。")
          }, "删除这条原答", 8, na)
        ]))), 128)),
        e("button", {
          type: "button",
          disabled: a.disabled,
          onClick: d[2] || (d[2] = (r) => f.$emit("remove", "delete-item", { id: a.state.record.id }, "删除这个学习项及其不再被引用的证据？当前课程不会被删除。"))
        }, "删除学习项", 8, ia)
      ], 64)) : (n(), i(w, { key: 1 }, [
        a.state.records.total ? p("", !0) : (n(), i("p", sa, "真实练习之后，老师会把值得再练的知识点留在这里。一次做对，不急着贴上“掌握”的标签。")),
        (n(!0), i(w, null, A(a.state.records.items, (r) => (n(), i("button", {
          key: r.id,
          class: "learning-record-row",
          type: "button",
          disabled: !r.readable,
          onClick: (b) => f.$emit("action", "records", {
            id: r.id,
            offset: a.state.records.offset
          })
        }, [e("span", null, [e("strong", null, u(r.label), 1), e("small", null, [S(u(r.evidenceCount) + " 份作答依据", 1), r.nextReviewAt ? (n(), i("span", ua, " · 建议 " + u(new Date(r.nextReviewAt).toLocaleDateString()) + " 再练", 1)) : p("", !0)])]), e("em", null, u(l[r.state]), 1)], 8, ra))), 128)),
        e("div", da, [
          e("button", {
            type: "button",
            disabled: a.state.records.offset === 0,
            onClick: d[3] || (d[3] = (r) => f.$emit("action", "records", { offset: Math.max(0, a.state.records.offset - 30) }))
          }, "上一页", 8, oa),
          e("span", va, u(a.state.records.total) + " 项", 1),
          e("button", {
            type: "button",
            disabled: a.state.records.offset + 30 >= a.state.records.total,
            onClick: d[4] || (d[4] = (r) => f.$emit("action", "records", { offset: a.state.records.offset + 30 }))
          }, "下一页", 8, ba)
        ])
      ], 64))
    ]));
  }
}), ma = ga;
function ya(a) {
  const l = ae(structuredClone(le(a.initialState))), f = V(!1), d = V("");
  let r = !1, b = 0, C = () => {
  };
  const c = R(() => !f.value && !l.value.busy && l.value.storage === "ready");
  async function g(y, $ = {}) {
    if (f.value) return;
    f.value = !0, d.value = "";
    const o = l.value.chatIdentity, k = b;
    try {
      const L = await a.bridge.request(`learning/${y}`, {
        chatIdentity: o,
        ...$
      }, 35e3);
      return !r || l.value.chatIdentity !== o ? void 0 : (b === k && L.result.state.chatIdentity === o && (l.value = L.result.state), L.result);
    } catch {
      r && l.value.chatIdentity === o && (d.value = "暂未收到操作结果。请先读取已保存内容，不要重复提交或生成。");
    } finally {
      r && (f.value = !1);
    }
  }
  return te(() => {
    r = !0, C = a.bridge.subscribe((y) => {
      if (y.type === "learning/media") {
        l.value = {
          ...l.value,
          media: y.payload.media
        };
        return;
      }
      if (y.type !== "learning/state") return;
      const $ = y.payload.state;
      $.chatIdentity === l.value.chatIdentity && (b++, l.value = $, d.value = "");
    });
  }), ie(() => {
    r = !1, C();
  }), {
    state: l,
    pending: f,
    writable: c,
    localMessage: d,
    request: g
  };
}
var ka = {
  class: "learning-app",
  "aria-label": "语伴语言学习"
}, pa = ["inert"], fa = {
  key: 0,
  class: "learning-notice",
  role: "status",
  "aria-live": "polite"
}, $a = ["disabled"], ca = {
  key: 2,
  class: "learning-row"
}, Ca = ["disabled"], xa = ["disabled"], ha = ["disabled"], wa = ["disabled"], Ia = ["inert"], Sa = { class: "learning-desk" }, La = { class: "learning-desk-heading" }, Aa = { class: "learning-eyebrow" }, Va = { class: "learning-teacher-line" }, Ua = { class: "learning-person-initial" }, Ma = {
  key: 0,
  class: "learning-desk-start"
}, Ra = { class: "learning-goal" }, qa = {
  key: 1,
  class: "learning-margin-note"
}, Na = { class: "learning-next-lesson" }, Ba = {
  key: 0,
  class: "learning-teacher-reply",
  "aria-live": "polite"
}, Ta = { class: "learning-eyebrow" }, Da = ["disabled"], ja = { class: "learning-row" }, Ea = ["disabled"], Oa = ["disabled"], za = {
  key: 2,
  class: "learning-empty-page"
}, Ka = {
  key: 4,
  class: "learning-harvest-page"
}, Pa = {
  key: 0,
  class: "learning-empty-note"
}, Ha = { class: "learning-muted" }, Fa = ["disabled", "onClick"], Ja = ["disabled"], Wa = ["disabled"], Qa = {
  key: 3,
  class: "learning-row"
}, Ga = ["disabled"], Xa = ["disabled"], Ya = {
  key: 5,
  class: "learning-settings-page"
}, Za = ["value", "disabled"], _a = ["value"], el = {
  key: 0,
  class: "learning-muted"
}, tl = ["value", "disabled"], al = ["disabled"], ll = ["disabled"], nl = ["disabled"], il = ["disabled"], sl = ["disabled"], rl = ["disabled"], ul = {
  key: 1,
  class: "learning-player",
  "aria-label": "课堂朗读"
}, dl = {
  key: 0,
  role: "status"
}, ol = { class: "learning-row" }, vl = ["disabled"], bl = ["max", "value"], gl = {
  class: "learning-bottom-nav",
  "aria-label": "语伴页面"
}, ml = ["aria-current", "onClick"], yl = {
  role: "alertdialog",
  "aria-modal": "true",
  "aria-labelledby": "learning-confirm-title",
  class: "learning-confirm"
}, kl = { class: "learning-row" }, pl = /* @__PURE__ */ j({
  __name: "LearningApp",
  props: {
    bridge: {},
    initialState: {}
  },
  setup(a) {
    const { state: l, pending: f, writable: d, localMessage: r, request: b } = ya(a), C = V(l.value.profile && l.value.teacher ? "desk" : "profile"), c = V(null), g = {}, y = V(""), $ = V(null), o = V(null);
    let k = null;
    const L = V(l.value.profile?.voice?.voiceId ?? l.value.voices.defaultVoice), T = V(l.value.profile?.voice?.language ?? l.value.language), q = V(l.value.profile?.voice?.speed ?? 1), B = V(0), P = R(() => l.value.completions.slice(B.value * 20, (B.value + 1) * 20)), H = R(() => new Intl.DisplayNames(["zh-CN"], { type: "language" }).of(l.value.language) ?? l.value.language);
    N([() => l.value.language, () => l.value.profile?.voice], ([I, t]) => {
      L.value = t?.voiceId ?? l.value.voices.defaultVoice, T.value = t?.language ?? I, q.value = t?.speed ?? 1;
    }), N(() => l.value.unit?.id, (I, t) => {
      I && I !== t && h("lesson");
    }), N(() => !!l.value.profile, (I, t) => {
      I && !t && h("desk");
    }), N(() => l.value.language, () => {
      B.value = 0;
    });
    async function h(I) {
      if (c.value && (g[C.value] = c.value.scrollTop), C.value === "lesson" && I !== "lesson" && b("stop"), C.value = I, await F(), c.value) {
        c.value.scrollTop = g[I] ?? 0;
        const t = [...c.value.querySelectorAll("h1")].find((v) => v.offsetParent !== null);
        t && (t.tabIndex = -1, t.focus({ preventScroll: !0 }));
      }
    }
    async function m(I, t, v) {
      k = document.activeElement instanceof HTMLElement ? document.activeElement : null, $.value = {
        action: I,
        input: t,
        text: v
      }, await F(), o.value?.focus();
    }
    N($, async (I) => {
      I || (await F(), k?.focus({ preventScroll: !0 }));
    });
    function x(I) {
      const t = I.currentTarget.querySelectorAll("button");
      I.shiftKey && document.activeElement === t[0] ? (I.preventDefault(), t[t.length - 1]?.focus()) : !I.shiftKey && document.activeElement === t[t.length - 1] && (I.preventDefault(), t[0]?.focus());
    }
    function M(I = !1) {
      const t = {
        replaceCurrent: !!l.value.unit || l.value.blockedUnit,
        message: y.value.trim() || (I ? "今天想轻松做一次短练。请按我的目标和实际水平安排，也可以复习合适的知识点。" : "请按我的目标和实际水平准备下一课，选择有帮助的真实材料或练习，也照顾值得复习的知识点。")
      };
      t.replaceCurrent ? m("prepare", t, "准备新课会替换当前课件和本课笔记。已保留的学习证据及奖励资格不受影响；需要完整留存本课，可以先导出学习数据。") : b("prepare", t);
    }
    async function E() {
      const I = await b("export");
      if (!I?.document) return;
      const t = URL.createObjectURL(new Blob([JSON.stringify(I.document, null, 2)], { type: "application/json" })), v = document.createElement("a");
      v.href = t, v.download = "LittleWhiteBox_Learning.json", v.click(), setTimeout(() => URL.revokeObjectURL(t), 1e3);
    }
    function J(I) {
      return `${Math.floor(I / 60)}:${String(Math.floor(I % 60)).padStart(2, "0")}`;
    }
    return (I, t) => (n(), i("section", ka, [
      e("header", {
        class: "learning-toolbar",
        inert: !!$.value
      }, [e("button", {
        type: "button",
        class: "learning-wordmark",
        onClick: t[0] || (t[0] = (v) => h("desk"))
      }, [...t[38] || (t[38] = [S("语伴", -1), e("span", null, "一起，把语言用起来", -1)])]), e("button", {
        type: "button",
        "aria-label": "语伴设置",
        onClick: t[1] || (t[1] = (v) => h("settings"))
      }, "···")], 8, pa),
      s(l).busy || s(l).message || s(r) || s(l).storage !== "ready" ? (n(), i("div", fa, [s(l).busy ? (n(), i(w, { key: 0 }, [
        t[39] || (t[39] = e("span", { class: "learning-working-dot" }, null, -1)),
        t[40] || (t[40] = S("正在处理，请稍等。", -1)),
        e("button", {
          type: "button",
          disabled: s(f),
          onClick: t[2] || (t[2] = (v) => s(b)("cancel"))
        }, "停止", 8, $a)
      ], 64)) : (n(), i(w, { key: 1 }, [S(u(s(r) || s(l).message || (s(l).storage === "unconfirmed" ? "上次保存尚未确认，请先核实。" : s(l).storage === "conflict" ? "学习文件出现另一版本，请先核实。" : "暂时无法读取学习文件。")), 1)], 64)), s(l).busy ? p("", !0) : (n(), i("div", ca, [
        s(l).storage === "unconfirmed" || s(l).storage === "conflict" ? (n(), i("button", {
          key: 0,
          type: "button",
          disabled: s(f),
          onClick: t[3] || (t[3] = (v) => s(b)("verify"))
        }, "核实保存", 8, Ca)) : p("", !0),
        s(l).storage === "unconfirmed" ? (n(), i("button", {
          key: 1,
          type: "button",
          disabled: s(f),
          onClick: t[4] || (t[4] = (v) => s(b)("retry-save"))
        }, "重试原保存", 8, xa)) : p("", !0),
        s(l).storage === "conflict" ? (n(), i("button", {
          key: 2,
          type: "button",
          disabled: s(f),
          onClick: t[5] || (t[5] = (v) => m("adopt-server", {}, "采用服务器上的学习文件？未确认的本次修改将不再作为候选保留。"))
        }, "采用服务器版本", 8, ha)) : p("", !0),
        s(l).storage === "unloaded" || s(r) ? (n(), i("button", {
          key: 3,
          type: "button",
          disabled: s(f),
          onClick: t[6] || (t[6] = (v) => s(b)("read"))
        }, "重试读取", 8, wa)) : p("", !0)
      ]))])) : p("", !0),
      e("div", {
        ref_key: "scroller",
        ref: c,
        class: "learning-scroll",
        inert: !!$.value
      }, [
        U(e("div", Sa, [
          e("div", La, [
            e("p", Aa, "你的语言书桌 · " + u(H.value), 1),
            t[41] || (t[41] = e("h1", { tabindex: "-1" }, [
              S("今天，"),
              e("br"),
              S("多会一点点。")
            ], -1)),
            t[42] || (t[42] = e("span", {
              class: "learning-desk-seal",
              "aria-hidden": "true"
            }, [
              S("语"),
              e("br"),
              S("伴")
            ], -1))
          ]),
          e("div", Va, [
            e("span", Ua, u([...s(l).teacher?.name ?? "？"][0]), 1),
            e("div", null, [e("strong", null, u(s(l).teacher?.name ?? "选择一位老师"), 1), e("p", null, u(s(l).teacher ? "熟悉你，也认真对待你的目标。" : "让你熟悉的人物，陪你把语言学好。"), 1)]),
            e("button", {
              type: "button",
              onClick: t[7] || (t[7] = (v) => h("profile"))
            }, "调整")
          ]),
          !s(l).profile || !s(l).teacher ? (n(), i("section", Ma, [
            t[43] || (t[43] = e("h2", null, "先认识你，再开始。", -1)),
            t[44] || (t[44] = e("p", null, "选老师，聊聊你的真实水平和想去的方向。无需测试分数，也不需要完美开场。", -1)),
            e("button", {
              type: "button",
              class: "learning-primary",
              onClick: t[8] || (t[8] = (v) => h("profile"))
            }, "告诉老师我的目标 →")
          ])) : (n(), i(w, { key: 1 }, [
            e("section", Ra, [t[45] || (t[45] = e("p", { class: "learning-eyebrow" }, "正在走向", -1)), e("p", null, u(s(l).profile.goal.description), 1)]),
            s(l).unit ? (n(), i("button", {
              key: 0,
              type: "button",
              class: "learning-resume",
              onClick: t[9] || (t[9] = (v) => h("lesson"))
            }, [e("span", null, [
              t[46] || (t[46] = e("small", null, "书签还在这里", -1)),
              e("strong", null, u(s(l).unit.title), 1),
              e("small", null, u(s(l).unit.attempts.length ? "带着已经练过的，接着往下走。" : "课件已准备好，随时开始。"), 1)
            ]), t[47] || (t[47] = e("span", { "aria-hidden": "true" }, "↗", -1))])) : p("", !0),
            s(l).blockedUnit ? (n(), i("p", qa, "上一课的素材属于其他故事。回到原聊天可以继续；也可以明确换一课，原有学习证据会保留。")) : p("", !0),
            e("section", Na, [
              e("h2", null, u(s(l).unit || s(l).blockedUnit ? "下一课，想练什么？" : "把第一课交给老师。"), 1),
              t[48] || (t[48] = e("p", { class: "learning-muted" }, "新闻、考试训练，或一个总卡住的用法。老师会按你的目标选材。", -1)),
              s(l).reply?.action === "prepare" ? (n(), i("div", Ba, [
                e("p", Ta, u(s(l).teacher?.name) + " · 备课留言", 1),
                e("p", null, u(s(l).reply.text), 1),
                [...s(l).reply.text].length <= 1e3 ? (n(), i("button", {
                  key: 0,
                  type: "button",
                  disabled: !s(d),
                  onClick: t[10] || (t[10] = (v) => s(b)("say-reply"))
                }, "听老师说", 8, Da)) : p("", !0)
              ])) : p("", !0),
              U(e("textarea", {
                "onUpdate:modelValue": t[11] || (t[11] = (v) => y.value = v),
                rows: "2",
                maxlength: "2000",
                "aria-label": "这次的学习想法",
                placeholder: "有特别想练的，可以告诉老师；不填也没关系。"
              }, null, 512), [[D, y.value]]),
              e("div", ja, [e("button", {
                type: "button",
                class: "learning-primary",
                disabled: !s(d),
                onClick: t[12] || (t[12] = (v) => M())
              }, "准备" + u(s(l).unit ? "新" : "这一") + "课 →", 9, Ea), e("button", {
                type: "button",
                disabled: !s(d),
                onClick: t[13] || (t[13] = (v) => M(!0))
              }, "今天轻松一点", 8, Oa)]),
              t[49] || (t[49] = e("small", null, "出题会使用模型；老师需要时会联网选材。", -1))
            ]),
            t[50] || (t[50] = e("p", { class: "learning-desk-footer" }, [
              S("短练 20 · 常规 40 · 深练 60 小白币"),
              e("br"),
              e("span", null, "完成就有收获，做错也不会扣奖励。")
            ], -1))
          ], 64))
        ], 512), [[G, C.value === "desk"]]),
        C.value === "profile" ? (n(), O(ea, {
          key: 0,
          state: s(l),
          disabled: !s(d),
          onAction: s(b)
        }, null, 8, [
          "state",
          "disabled",
          "onAction"
        ])) : p("", !0),
        s(l).unit ? U((n(), O(Tt, {
          key: `${s(l).chatIdentity}:${s(l).language}:${s(l).unit.id}`,
          state: s(l),
          disabled: !s(d),
          onAction: s(b)
        }, null, 8, [
          "state",
          "disabled",
          "onAction"
        ])), [[G, C.value === "lesson"]]) : p("", !0),
        C.value === "lesson" && !s(l).unit ? (n(), i("section", za, [
          t[51] || (t[51] = e("h1", null, "书页还空着", -1)),
          t[52] || (t[52] = e("p", null, "先让老师准备一课，打开和阅读本身不会请求模型。", -1)),
          e("button", {
            class: "learning-primary",
            type: "button",
            onClick: t[14] || (t[14] = (v) => h("desk"))
          }, "回到书桌")
        ])) : p("", !0),
        C.value === "records" ? (n(), O(ma, {
          key: 3,
          state: s(l),
          disabled: !s(d),
          onAction: s(b),
          onRemove: m
        }, null, 8, [
          "state",
          "disabled",
          "onAction"
        ])) : p("", !0),
        C.value === "harvest" ? (n(), i("section", Ka, [
          t[54] || (t[54] = e("p", { class: "learning-eyebrow" }, "每一次认真，都算数", -1)),
          t[55] || (t[55] = e("h1", null, "我的收获", -1)),
          s(l).completions.length ? p("", !0) : (n(), i("p", Pa, "跟老师练完一个小目标，成果就会留在这里。没有连签，也没有欠下的功课。")),
          (n(!0), i(w, null, A(P.value, (v) => (n(), i("article", {
            key: v.unitId,
            class: "learning-harvest-entry"
          }, [
            e("small", null, u(new Date(v.completedAt).toLocaleDateString()), 1),
            e("h2", null, [S("+" + u(v.amount), 1), t[53] || (t[53] = e("span", null, "小白币", -1))]),
            e("p", null, u(v.summary), 1),
            e("p", Ha, u(v.paid ? "已到账" : v.originHere ? "学习已完成，等待到账" : "请回到开课的原聊天领取"), 1),
            !v.paid && v.originHere ? (n(), i("button", {
              key: 0,
              type: "button",
              disabled: !s(d),
              onClick: (W) => s(b)("reward", {
                unitId: v.unitId,
                openWallet: !s(l).walletOpen
              })
            }, u(s(l).walletOpen ? "核实并补领" : "开通钱包并领取"), 9, Fa)) : p("", !0)
          ]))), 128)),
          s(l).chatStorage === "unconfirmed" || s(l).chatStorage === "conflict" || s(l).chatStorage === "failed" ? (n(), i("button", {
            key: 1,
            type: "button",
            disabled: s(f) || s(l).busy,
            onClick: t[15] || (t[15] = (v) => s(b)("verify-wallet"))
          }, "核实账本保存", 8, Ja)) : p("", !0),
          s(l).chatStorage === "conflict" ? (n(), i("button", {
            key: 2,
            type: "button",
            disabled: s(f) || s(l).busy,
            onClick: t[16] || (t[16] = (v) => m("adopt-wallet", {}, "采用服务器上的聊天账本？本次未确认的候选将被放下，之后可凭已保存的学习完成记录核实并补领。"))
          }, "采用服务器账本", 8, Wa)) : p("", !0),
          s(l).completions.length > 20 ? (n(), i("div", Qa, [e("button", {
            type: "button",
            disabled: B.value === 0,
            onClick: t[17] || (t[17] = (v) => B.value--)
          }, "上一页", 8, Ga), e("button", {
            type: "button",
            disabled: (B.value + 1) * 20 >= s(l).completions.length,
            onClick: t[18] || (t[18] = (v) => B.value++)
          }, "下一页", 8, Xa)])) : p("", !0),
          t[56] || (t[56] = e("small", { class: "learning-muted" }, "钱包开户赠礼是另一笔流水，不计入学习奖励。", -1))
        ])) : p("", !0),
        C.value === "settings" ? (n(), i("section", Ya, [
          t[66] || (t[66] = e("p", { class: "learning-eyebrow" }, "让这里，更适合你", -1)),
          t[67] || (t[67] = e("h1", null, "书桌设置", -1)),
          e("label", null, [t[57] || (t[57] = S("当前语言", -1)), e("select", {
            value: s(l).language,
            disabled: !s(d),
            onChange: t[19] || (t[19] = (v) => s(b)("language", { language: v.target.value }))
          }, [(n(!0), i(w, null, A([.../* @__PURE__ */ new Set([s(l).language, ...s(l).languages])], (v) => (n(), i("option", {
            key: v,
            value: v
          }, u(new Intl.DisplayNames(["zh-CN"], { type: "language" }).of(v)), 9, _a))), 128))], 40, Za)]),
          e("button", {
            type: "button",
            onClick: t[20] || (t[20] = (v) => h("profile"))
          }, "学习新语言 / 调整老师与目标 →"),
          e("section", null, [
            t[62] || (t[62] = e("h2", null, "老师的声音", -1)),
            s(l).voices.enabled ? (n(), i("form", {
              key: 1,
              onSubmit: t[25] || (t[25] = z((v) => s(b)("voice", { voice: {
                voiceId: L.value,
                language: T.value,
                speed: Number(q.value)
              } }), ["prevent"]))
            }, [
              e("label", null, [t[58] || (t[58] = S("音色", -1)), U(e("select", { "onUpdate:modelValue": t[21] || (t[21] = (v) => L.value = v) }, [(n(!0), i(w, null, A(s(l).voices.voices, (v) => (n(), i("option", {
                key: v.id,
                value: v.id,
                disabled: !v.available
              }, u(v.name) + u(v.available ? "" : "（暂不可用）"), 9, tl))), 128))], 512), [[K, L.value]])]),
              e("label", null, [t[59] || (t[59] = S("发音语言", -1)), U(e("input", {
                "onUpdate:modelValue": t[22] || (t[22] = (v) => T.value = v),
                type: "text",
                maxlength: "80",
                placeholder: "en / ja"
              }, null, 512), [[D, T.value]])]),
              e("label", null, [t[61] || (t[61] = S("合成语速", -1)), U(e("select", { "onUpdate:modelValue": t[23] || (t[23] = (v) => q.value = v) }, [...t[60] || (t[60] = [
                e("option", { value: 0.75 }, "0.75×", -1),
                e("option", { value: 1 }, "1×", -1),
                e("option", { value: 1.25 }, "1.25×", -1)
              ])], 512), [[K, q.value]])]),
              e("button", {
                type: "submit",
                disabled: !s(d) || !s(l).profile
              }, "保存声音偏好", 8, al),
              e("button", {
                type: "button",
                onClick: t[24] || (t[24] = (v) => s(b)("tts-settings"))
              }, "打开 TTS 设置")
            ], 32)) : (n(), i("p", el, "使用语音前，请先开启 TTS 模块。文字学习不受影响。")),
            t[63] || (t[63] = e("small", null, "新偏好用于之后的听力题。开始听过的题保留原音色与语言；慢放和重听如实记录。首版不录音。", -1))
          ]),
          e("section", null, [
            t[64] || (t[64] = e("h2", null, "自己的学习资产", -1)),
            t[65] || (t[65] = e("p", { class: "learning-muted" }, "导出包含所有语言的目标、练习和记录。数据只随明确操作删除。", -1)),
            e("button", {
              type: "button",
              disabled: !s(d),
              onClick: E
            }, "导出学习数据", 8, ll),
            e("button", {
              type: "button",
              disabled: s(f) || s(l).busy,
              onClick: t[26] || (t[26] = (v) => s(b)("read"))
            }, "重新读取保存内容", 8, nl),
            s(l).unit || s(l).blockedUnit ? (n(), i("button", {
              key: 0,
              type: "button",
              disabled: !s(d),
              onClick: t[27] || (t[27] = (v) => m("abandon", {}, "放下当前这一课？本课课件、原答和笔记会移除；已被学习项保留的证据和完成奖励资格仍保留。"))
            }, "放下当前课件", 8, il)) : p("", !0),
            e("button", {
              type: "button",
              class: "learning-danger",
              disabled: !s(d) || !s(l).profile,
              onClick: t[28] || (t[28] = (v) => m("delete-language", {}, "删除当前语言的全部学习数据？未领取奖励也将放弃，已到账流水保留。"))
            }, "删除当前语言", 8, sl),
            e("button", {
              type: "button",
              class: "learning-danger",
              disabled: !s(d),
              onClick: t[29] || (t[29] = (v) => m("clear", {}, "清空所有语言的目标、课程和记录？未领取奖励也将放弃。已到账流水不撤销。"))
            }, "清空全部学习数据", 8, rl)
          ])
        ])) : p("", !0)
      ], 8, Ia),
      s(l).media.status !== "idle" ? (n(), i("section", ul, [
        s(l).media.message ? (n(), i("p", dl, u(s(l).media.message), 1)) : p("", !0),
        e("div", ol, [
          e("span", null, u(s(l).media.status === "loading" ? "正在生成声音…" : `${J(s(l).media.position)} / ${J(s(l).media.duration)}`), 1),
          s(l).media.status === "playing" ? (n(), i("button", {
            key: 0,
            type: "button",
            onClick: t[30] || (t[30] = (v) => s(b)("pause"))
          }, "暂停")) : [
            "paused",
            "ended",
            "blocked"
          ].includes(s(l).media.status) ? (n(), i("button", {
            key: 1,
            type: "button",
            disabled: s(l).busy,
            onClick: t[31] || (t[31] = (v) => s(b)("resume"))
          }, u(s(l).media.status === "ended" ? "再听一遍" : "继续播放"), 9, vl)) : p("", !0),
          e("button", {
            type: "button",
            onClick: t[32] || (t[32] = (v) => s(b)("stop"))
          }, "停止"),
          s(l).media.duration ? (n(), i("button", {
            key: 2,
            type: "button",
            onClick: t[33] || (t[33] = (v) => s(b)("rate", { value: s(l).media.rate === 1 ? 0.75 : 1 }))
          }, u(s(l).media.rate) + "×", 1)) : p("", !0)
        ]),
        s(l).media.duration ? (n(), i("input", {
          key: 1,
          type: "range",
          min: "0",
          max: s(l).media.duration,
          step: "0.1",
          value: s(l).media.position,
          "aria-label": "当前声音片段播放位置",
          onChange: t[34] || (t[34] = (v) => s(b)("seek", { value: Number(v.target.value) }))
        }, null, 40, bl)) : p("", !0)
      ])) : p("", !0),
      e("nav", gl, [(n(), i(w, null, A([
        ["desk", "书桌"],
        ["lesson", "课堂"],
        ["records", "记录"],
        ["harvest", "收获"]
      ], ([v, W]) => e("button", {
        key: v,
        type: "button",
        "aria-current": C.value === v ? "page" : void 0,
        onClick: (fl) => h(v)
      }, u(W), 9, ml)), 64))]),
      $.value ? (n(), i("div", {
        key: 2,
        class: "learning-confirm-shade",
        onKeydown: [t[37] || (t[37] = X(z((v) => $.value = null, ["stop", "prevent"]), ["esc"])), X(x, ["tab"])]
      }, [e("section", yl, [
        t[68] || (t[68] = e("h2", { id: "learning-confirm-title" }, "确认这次操作", -1)),
        e("p", null, u($.value.text), 1),
        e("div", kl, [e("button", {
          ref_key: "confirmButton",
          ref: o,
          type: "button",
          onClick: t[35] || (t[35] = (v) => $.value = null)
        }, "先不改", 512), e("button", {
          type: "button",
          class: "learning-primary",
          onClick: t[36] || (t[36] = (v) => {
            s(b)($.value.action, $.value.input), $.value = null;
          })
        }, "确认")])
      ])], 32)) : p("", !0)
    ]));
  }
}), cl = pl;
export {
  cl as default
};
