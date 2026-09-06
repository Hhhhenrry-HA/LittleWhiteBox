/* eslint-disable */
import { A as ne, B as Q, C as le, E as U, H as u, I as q, L as ie, N as D, R as se, T as a, _ as A, a as E, b as K, c as F, d as e, f as Z, g as I, i as G, j, l as M, m as n, o as Y, p as k, s as _, u as R, v as O, x as re, y as ee, z as s } from "./xiaobai-os-runtime-dom.esm-bundler-DwdCK5Jt.js";
var ue = ["disabled"], de = {
  key: 0,
  class: "learning-choices"
}, oe = [
  "type",
  "checked",
  "onChange"
], ve = { class: "learning-option-letter" }, be = {
  key: 1,
  class: "learning-order"
}, ge = [
  "disabled",
  "aria-label",
  "onClick"
], me = [
  "disabled",
  "aria-label",
  "onClick"
], ye = {
  key: 2,
  class: "learning-fields"
}, ke = ["onUpdate:modelValue"], ce = ["value"], pe = {
  key: 3,
  class: "learning-choices"
}, fe = ["checked", "onChange"], $e = {
  key: 0,
  class: "learning-muted"
}, he = {
  key: 4,
  class: "learning-fields"
}, Ce = ["onUpdate:modelValue"], xe = {
  key: 5,
  class: "learning-writing"
}, we = ["disabled"], Ie = /* @__PURE__ */ O({
  __name: "AnswerInput",
  props: /* @__PURE__ */ ee({
    response: {},
    paragraphs: {},
    disabled: { type: Boolean }
  }, {
    modelValue: { required: !0 },
    modelModifiers: {}
  }),
  emits: /* @__PURE__ */ ee(["submit"], ["update:modelValue"]),
  setup(t, { emit: i }) {
    const y = t, v = i, d = ne(t, "modelValue");
    function g(o) {
      y.response.kind === "choice" && !y.response.multiple ? d.value.picked = [o] : d.value.picked = d.value.picked.includes(o) ? d.value.picked.filter((C) => C !== o) : [...d.value.picked, o];
    }
    function $(o, C) {
      const f = [...d.value.order];
      [f[o], f[o + C]] = [f[o + C], f[o]], d.value.order = f;
    }
    const p = R(() => {
      const o = y.response;
      return o.kind === "text" ? !!d.value.text.trim() : o.kind === "gaps" ? o.slots.every((C) => d.value.values[C.id]?.trim()) : o.kind === "match" ? o.left.every((C) => d.value.values[C.id]) : o.kind === "order" ? !0 : d.value.picked.length > 0;
    });
    function m() {
      const o = y.response;
      !p.value || y.disabled || (o.kind === "text" ? v("submit", {
        kind: "text",
        text: d.value.text
      }) : o.kind === "gaps" ? v("submit", {
        kind: "gaps",
        values: o.slots.map((C) => ({
          id: C.id,
          text: d.value.values[C.id]
        }))
      }) : o.kind === "match" ? v("submit", {
        kind: "match",
        pairs: o.left.map((C) => ({
          left: C.id,
          right: d.value.values[C.id]
        }))
      }) : v("submit", {
        kind: o.kind,
        ids: [...o.kind === "order" ? d.value.order : d.value.picked]
      }));
    }
    return (o, C) => (a(), n("form", {
      class: "learning-answer",
      onSubmit: F(m, ["prevent"])
    }, [e("fieldset", { disabled: t.disabled }, [
      C[3] || (C[3] = e("legend", { class: "learning-sr-only" }, "你的回答", -1)),
      t.response.kind === "choice" ? (a(), n("div", de, [(a(!0), n(M, null, U(t.response.options, (f, L) => (a(), n("label", {
        key: f.id,
        class: Q({ selected: d.value.picked.includes(f.id) })
      }, [
        e("input", {
          type: t.response.multiple ? "checkbox" : "radio",
          name: "answer-choice",
          checked: d.value.picked.includes(f.id),
          onChange: (c) => g(f.id)
        }, null, 40, oe),
        e("span", ve, u(String.fromCharCode(65 + L)), 1),
        e("span", null, u(f.text), 1)
      ], 2))), 128))])) : t.response.kind === "order" ? (a(), n("ol", be, [(a(!0), n(M, null, U(d.value.order, (f, L) => (a(), n("li", { key: f }, [
        e("span", null, u(t.response.options.find((c) => c.id === f)?.text), 1),
        e("button", {
          type: "button",
          disabled: L === 0,
          "aria-label": `上移第 ${L + 1} 项`,
          onClick: (c) => $(L, -1)
        }, "↑", 8, ge),
        e("button", {
          type: "button",
          disabled: L === d.value.order.length - 1,
          "aria-label": `下移第 ${L + 1} 项`,
          onClick: (c) => $(L, 1)
        }, "↓", 8, me)
      ]))), 128))])) : t.response.kind === "match" ? (a(), n("div", ye, [(a(!0), n(M, null, U(t.response.left, (f) => (a(), n("label", { key: f.id }, [I(u(f.text) + " ", 1), D(e("select", { "onUpdate:modelValue": (L) => d.value.values[f.id] = L }, [C[1] || (C[1] = e("option", { value: "" }, "选择对应项", -1)), (a(!0), n(M, null, U(t.response.right, (L) => (a(), n("option", {
        key: L.id,
        value: L.id
      }, u(L.text), 9, ce))), 128))], 8, ke), [[G, d.value.values[f.id]]])]))), 128))])) : t.response.kind === "evidence" ? (a(), n("div", pe, [(a(!0), n(M, null, U(t.paragraphs, (f) => (a(), n("label", {
        key: f.id,
        class: Q({ selected: d.value.picked.includes(f.id) })
      }, [e("input", {
        type: "checkbox",
        checked: d.value.picked.includes(f.id),
        onChange: (L) => g(f.id)
      }, null, 40, fe), e("span", null, u(f.text), 1)], 2))), 128)), t.paragraphs.length ? k("", !0) : (a(), n("p", $e, "请先展开相关文稿，再选择原文依据。"))])) : t.response.kind === "gaps" ? (a(), n("div", he, [(a(!0), n(M, null, U(t.response.slots, (f) => (a(), n("label", { key: f.id }, [I(u(f.text), 1), D(e("input", {
        "onUpdate:modelValue": (L) => d.value.values[f.id] = L,
        type: "text",
        maxlength: "4000",
        autocomplete: "off"
      }, null, 8, Ce), [[E, d.value.values[f.id]]])]))), 128))])) : (a(), n("label", xe, [C[2] || (C[2] = e("span", { class: "learning-sr-only" }, "你的回答", -1)), D(e("textarea", {
        "onUpdate:modelValue": C[0] || (C[0] = (f) => d.value.text = f),
        rows: "6",
        maxlength: "4000",
        placeholder: "写下你的回答…"
      }, null, 512), [[E, d.value.text]])])),
      e("button", {
        class: "learning-primary",
        type: "submit",
        disabled: !p.value
      }, "交给老师 →", 8, we)
    ], 8, ue)], 32));
  }
}), Le = Ie, Me = ["stroke-width"], Se = ["d"], Ae = /* @__PURE__ */ O({
  __name: "LearningIcon",
  props: { name: {} },
  setup(t) {
    const i = {
      home: "m3 10 9-7 9 7v10a1 1 0 0 1-1 1h-5v-7H9v7H4a1 1 0 0 1-1-1Z",
      book: "M12 5v16M3 4c4-1 6 0 9 1 3-1 5-2 9-1v15c-4-1-6 0-9 2-3-2-5-3-9-2Z",
      records: "M7 3h10a2 2 0 0 1 2 2v16H5V5a2 2 0 0 1 2-2ZM9 8h6M9 12h6M9 16h3",
      reward: "m12 3 3 6 6 1-4 5 1 6-6-3-6 3 1-6-4-5 6-1Z",
      arrow: "M4 12h16m-6-6 6 6-6 6",
      back: "m14 5-7 7 7 7",
      check: "m5 12 4 4L19 6",
      play: "m8 4 12 8-12 8Z",
      pause: "M8 5v14M16 5v14",
      stop: "M6 6h12v12H6Z",
      sound: "m11 4-6 5H2v6h3l6 5ZM16 8a6 6 0 0 1 0 8m3-11a10 10 0 0 1 0 14",
      chat: "M5 3h14a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H9l-6 4V5a2 2 0 0 1 2-2ZM7 8h10M7 12h6",
      more: "M5 12h.01M12 12h.01M19 12h.01",
      close: "m6 6 12 12M6 18 18 6",
      globe: "M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0ZM3 12h18M12 3c5 5 5 13 0 18-5-5-5-13 0-18Z"
    };
    return (y, v) => (a(), n("svg", {
      class: "learning-icon",
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      "stroke-width": t.name === "more" ? 3.5 : 1.7,
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      "aria-hidden": "true"
    }, [e("path", { d: i[t.name] }, null, 8, Se)], 8, Me));
  }
}), V = Ae, Ve = { class: "learning-material" }, qe = { class: "learning-source" }, Ue = { key: 0 }, Te = ["href"], Ne = {
  key: 0,
  class: "learning-listening-cover"
}, Be = ["disabled"], Re = {
  key: 1,
  class: "learning-material-body"
}, De = ["onMouseup", "onKeyup"], je = ["disabled", "onClick"], He = {
  class: "learning-audio-parts",
  "aria-label": "材料朗读分段"
}, Oe = ["disabled", "onClick"], Ze = { key: 2 }, Ee = /* @__PURE__ */ O({
  __name: "MaterialReader",
  props: {
    material: {},
    disabled: { type: Boolean },
    exerciseId: {}
  },
  emits: ["action", "select"],
  setup(t, { emit: i }) {
    const y = t, v = i;
    function d($) {
      v("select", {
        materialId: y.material.id,
        paragraphId: $.id,
        start: 0,
        end: $.text.length,
        quote: $.text
      });
    }
    function g($, p) {
      const m = window.getSelection();
      if (!m?.rangeCount || m.isCollapsed) return;
      const o = m.getRangeAt(0), C = $.currentTarget;
      if (!C.contains(o.startContainer) || !C.contains(o.endContainer)) return;
      const f = o.cloneRange();
      f.selectNodeContents(C), f.setEnd(o.startContainer, o.startOffset);
      const L = o.toString(), c = f.toString().length;
      L && [...L].length <= 2e3 && p.text.slice(c, c + L.length) === L && v("select", {
        materialId: y.material.id,
        paragraphId: p.id,
        start: c,
        end: c + L.length,
        quote: L
      });
    }
    return ($, p) => (a(), n("article", Ve, [
      e("h2", null, u(t.material.title), 1),
      e("div", qe, [t.material.provenance.kind === "authored" ? (a(), n("span", Ue, "老师自编练习")) : (a(), n("a", {
        key: 1,
        href: t.material.provenance.url,
        target: "_blank",
        rel: "noopener noreferrer"
      }, u(t.material.provenance.kind === "original" ? "原文节选" : "改编自") + " · " + u(t.material.provenance.title) + " ↗", 9, Te))]),
      t.material.hidden ? (a(), n("div", Ne, [p[1] || (p[1] = e("svg", {
        viewBox: "0 0 140 60",
        "aria-hidden": "true"
      }, [e("path", {
        d: "M8 27v6m10-14v22m10-31v40m10-26v12m10-35v58m10-47v36m10-27v18m10-37v56m10-36v16m10-29v42m10-31v20m10-16v12m10-8v4",
        stroke: "currentColor",
        "stroke-width": "3",
        "stroke-linecap": "round",
        fill: "none"
      })], -1)), e("button", {
        type: "button",
        disabled: t.disabled,
        onClick: p[0] || (p[0] = (m) => v("action", "reveal", {
          kind: "transcripts",
          id: t.material.id
        }))
      }, "看文稿", 8, Be)])) : (a(), n("div", Re, [(a(!0), n(M, null, U(t.material.paragraphs, (m) => (a(), n("div", {
        key: m.id,
        class: "learning-paragraph"
      }, [e("p", {
        tabindex: "0",
        onMouseup: (o) => g(o, m),
        onKeyup: (o) => g(o, m)
      }, u(m.text), 41, De), e("button", {
        type: "button",
        disabled: t.disabled || [...m.text].length > 2e3,
        "aria-label": "选这段提问",
        onClick: (o) => d(m)
      }, "选段", 8, je)]))), 128))])),
      e("div", He, [(a(!0), n(M, null, U(t.material.parts, (m) => (a(), n("button", {
        key: m.key,
        type: "button",
        disabled: t.disabled,
        onClick: (o) => v("action", "play", {
          materialId: t.material.id,
          partKey: m.key,
          exerciseId: t.exerciseId
        })
      }, [A(V, { name: "play" }), I(u(t.material.parts.length > 1 ? `听第 ${m.number} 段` : "播放朗读"), 1)], 8, Oe))), 128))]),
      t.material.parts.length ? (a(), n("small", Ze, "TTS 合成朗读")) : k("", !0)
    ]));
  }
}), Pe = Ee;
function te(t, i, y = []) {
  const v = (d) => i.kind === "choice" || i.kind === "order" ? i.options.find((g) => g.id === d)?.text ?? d : y.find((g) => g.id === d)?.text ?? d;
  return t.kind === "text" ? t.text : t.kind === "gaps" ? t.values.map((d) => `${i.kind === "gaps" ? i.slots.find((g) => g.id === d.id)?.text ?? "" : ""} ${d.text}`).join(`
`) : t.kind === "match" ? t.pairs.map((d) => i.kind === "match" ? `${i.left.find((g) => g.id === d.left)?.text} → ${i.right.find((g) => g.id === d.right)?.text}` : "").join(`
`) : t.ids.map(v).join(t.kind === "order" ? " → " : `
`);
}
var ze = { class: "learning-feedback" }, Ke = { class: "learning-muted" }, Fe = { key: 0 }, Je = { key: 1 }, We = { key: 0 }, Qe = { key: 1 }, Ge = { key: 2 }, Xe = ["disabled"], Ye = ["disabled"], _e = /* @__PURE__ */ O({
  __name: "AttemptFeedback",
  props: {
    attempt: {},
    feedback: {},
    response: {},
    paragraphs: {},
    disabled: { type: Boolean }
  },
  emits: ["action"],
  setup(t) {
    const i = {
      correct: "答对了",
      partial: "已经掌握一部分",
      incorrect: "一起把这里弄懂",
      disputed: "这处还需复核"
    };
    return (y, v) => (a(), n("section", ze, [
      v[6] || (v[6] = e("p", { class: "learning-eyebrow" }, "已保存的原答", -1)),
      e("blockquote", null, u(s(te)(t.attempt.answer, t.response, t.paragraphs)), 1),
      e("small", Ke, [
        I(u(t.attempt.help.feedback ? "得到反馈后的再练" : t.attempt.help.answer || t.attempt.help.hint || t.attempt.help.transcript ? "这次有辅助" : "未使用答案或提示"), 1),
        t.attempt.help.replays ? (a(), n("span", Fe, " · 重听 " + u(t.attempt.help.replays) + " 次", 1)) : k("", !0),
        t.attempt.help.slowPlayback ? (a(), n("span", Je, " · 慢放")) : k("", !0)
      ]),
      t.feedback ? (a(), n(M, { key: 0 }, [
        e("h3", null, u(i[t.feedback.verdict]), 1),
        t.feedback.understanding ? (a(), n("p", We, [v[2] || (v[2] = e("b", null, "理解", -1)), I(u(t.feedback.understanding), 1)])) : k("", !0),
        t.feedback.expression ? (a(), n("p", Qe, [v[3] || (v[3] = e("b", null, "表达", -1)), I(u(t.feedback.expression), 1)])) : k("", !0),
        t.feedback.guidance ? (a(), n("p", Ge, [v[4] || (v[4] = e("b", null, "批注", -1)), I(u(t.feedback.guidance), 1)])) : k("", !0),
        e("button", {
          type: "button",
          disabled: t.disabled,
          onClick: v[0] || (v[0] = (d) => y.$emit("action", "assess", {
            attemptId: t.attempt.id,
            review: !0,
            message: "请重新审视我的原答与题目。也请考虑其他有效表达，不只对照原来的答案键。"
          }))
        }, u(t.feedback.verdict === "disputed" ? "请老师复核" : "有疑问，请复核"), 9, Xe)
      ], 64)) : (a(), n(M, { key: 1 }, [v[5] || (v[5] = e("p", null, "原答已保存，等待老师评估。", -1)), e("button", {
        type: "button",
        disabled: t.disabled,
        onClick: v[1] || (v[1] = (d) => y.$emit("action", "assess", {
          attemptId: t.attempt.id,
          review: !1,
          message: "请评估这条已经保存的原答。"
        }))
      }, "重试评估", 8, Ye)], 64))
    ]));
  }
}), ae = _e;
function et(t) {
  return {
    picked: [],
    text: "",
    values: {},
    order: t.kind === "order" ? t.options.map((i) => i.id) : []
  };
}
var tt = {
  key: 0,
  class: "learning-classroom"
}, at = { class: "learning-lesson-header" }, nt = { class: "learning-lesson-goal" }, lt = { class: "learning-muted" }, it = {
  key: 0,
  class: "learning-question-nav",
  "aria-label": "题目导航"
}, st = [
  "disabled",
  "aria-current",
  "onClick"
], rt = {
  class: "learning-pane-nav",
  "aria-label": "课堂内容"
}, ut = ["disabled", "aria-pressed"], dt = ["aria-pressed"], ot = { class: "learning-materials-pane" }, vt = { class: "learning-question" }, bt = { class: "learning-eyebrow" }, gt = { class: "learning-help-actions" }, mt = ["disabled"], yt = ["disabled"], kt = ["disabled"], ct = {
  key: 0,
  class: "learning-margin-note"
}, pt = {
  key: 1,
  class: "learning-margin-note"
}, ft = { key: 0 }, $t = { key: 1 }, ht = ["disabled"], Ct = {
  key: 4,
  class: "learning-row"
}, xt = ["disabled"], wt = ["disabled"], It = ["disabled"], Lt = {
  key: 0,
  class: "learning-harvest-inline"
}, Mt = ["open"], St = { class: "learning-tutor-identity" }, At = { class: "learning-person-initial" }, Vt = {
  key: 0,
  class: "learning-selection"
}, qt = { class: "learning-row" }, Ut = ["disabled"], Tt = ["maxlength"], Nt = ["disabled"], Bt = {
  key: 1,
  class: "learning-teacher-reply"
}, Rt = { class: "learning-eyebrow" }, Dt = ["disabled"], jt = ["disabled"], Ht = {
  key: 0,
  class: "learning-notes"
}, Ot = { key: 0 }, Zt = ["disabled", "onClick"], Et = /* @__PURE__ */ O({
  __name: "LearningLesson",
  props: {
    state: {},
    disabled: { type: Boolean }
  },
  emits: ["action"],
  setup(t, { emit: i }) {
    const y = t, v = i, d = q(0), g = q(!1), $ = q(""), p = q(null), m = q("material"), o = q(null);
    let C = {};
    const f = q(!1), L = q(null), c = R(() => y.state.unit?.exercises[d.value]), N = R(() => y.state.unit?.attempts.filter((r) => r.exerciseId === c.value?.id).at(-1)), x = R(() => y.state.unit?.assessments.find((r) => r.attemptId === N.value?.id)), h = q({});
    j([() => c.value?.id, () => N.value?.id], ([r, b]) => {
      r && (!h.value[r] || h.value[r].attemptId !== b) && (h.value[r] = {
        attemptId: b,
        value: et(c.value.response)
      });
    }, { immediate: !0 });
    const T = R({
      get: () => h.value[c.value.id].value,
      set(r) {
        h.value[c.value.id] = {
          attemptId: N.value?.id,
          value: r
        };
      }
    }), B = R(() => y.state.unit?.materials.filter((r) => c.value?.materialIds.includes(r.id)) ?? []), z = R(() => B.value.filter((r) => c.value?.response.kind !== "evidence" || r.id === c.value.response.materialId).flatMap((r) => r.paragraphs)), P = R(() => y.state.completions.find((r) => r.unitId === y.state.unit?.id)), X = R(() => y.state.unit?.exercises.every((r) => y.state.unit?.attempts.some((b) => b.exerciseId === r.id)));
    j(() => y.state.unit?.id, () => {
      d.value = 0, g.value = !1, p.value = null, $.value = "";
    }), j(d, () => {
      g.value = !1, p.value = null, C = {}, v("action", "stop");
    }), j(p, async (r) => {
      r && (f.value = !0, await K(), L.value?.scrollIntoView({ block: "nearest" }));
    }), j(() => y.state.reply, (r) => {
      r?.exerciseId === c.value?.id && (f.value = !0);
    }), j(() => N.value?.id, () => {
      g.value = !1;
    });
    const J = {
      reading: "阅读理解",
      listening: "听力练习",
      vocabulary: "词汇运用",
      grammar: "语法练习",
      writing: "表达练习"
    };
    async function S(r) {
      if (m.value === r) return;
      const b = o.value?.closest(".learning-scroll"), w = b && o.value ? o.value.getBoundingClientRect().top - b.getBoundingClientRect().top + b.scrollTop : 0;
      b && (C[m.value] = b.scrollTop), m.value = r, await K(), o.value?.querySelector(".learning-pane-nav button[aria-pressed=true]")?.focus({ preventScroll: !0 }), b && (b.scrollTop = C[r] ?? w);
    }
    function l() {
      !c.value || !$.value.trim() || v("action", "explain", {
        exerciseId: c.value.id,
        message: $.value,
        ...p.value ? { selection: p.value } : {}
      });
    }
    return (r, b) => t.state.unit && c.value ? (a(), n("div", tt, [e("header", at, [
      e("h1", null, u(t.state.unit.title), 1),
      e("details", nt, [e("summary", null, [b[21] || (b[21] = I("本课目标", -1)), e("span", null, [A(V, { name: "reward" }), I(u(t.state.unit.reward.amount) + " 币", 1)])]), e("p", lt, u(t.state.unit.goal), 1)]),
      t.state.unit.exercises.length > 1 ? (a(), n("nav", it, [(a(!0), n(M, null, U(t.state.unit.exercises, (w, H) => (a(), n("button", {
        key: w.id,
        type: "button",
        disabled: t.disabled,
        "aria-current": H === d.value ? "step" : void 0,
        onClick: (W) => d.value = H
      }, [I(u(String(H + 1).padStart(2, "0")), 1), t.state.unit.attempts.some((W) => W.exerciseId === w.id) ? (a(), Z(V, {
        key: 0,
        name: "check",
        "aria-label": "已作答"
      })) : k("", !0)], 8, st))), 128))])) : k("", !0)
    ]), e("div", { class: Q(["learning-classroom-columns", `learning-pane-${B.value.length ? m.value : "question"}`]) }, [e("div", {
      ref_key: "course",
      ref: o,
      class: "learning-course"
    }, [
      e("nav", rt, [e("button", {
        type: "button",
        disabled: !B.value.length,
        "aria-pressed": m.value === "material" && !!B.value.length,
        onClick: b[0] || (b[0] = (w) => S("material"))
      }, [A(V, { name: "book" }), b[22] || (b[22] = I("材料", -1))], 8, ut), e("button", {
        type: "button",
        "aria-pressed": m.value === "question" || !B.value.length,
        onClick: b[1] || (b[1] = (w) => S("question"))
      }, [A(V, { name: "records" }), b[23] || (b[23] = I("练习", -1))], 8, dt)]),
      e("div", ot, [(a(!0), n(M, null, U(B.value, (w) => (a(), Z(Pe, {
        key: w.id,
        material: w,
        "exercise-id": c.value.id,
        disabled: t.disabled,
        onAction: b[2] || (b[2] = (H, W) => v("action", H, W)),
        onSelect: b[3] || (b[3] = (H) => p.value = H)
      }, null, 8, [
        "material",
        "exercise-id",
        "disabled"
      ]))), 128)), e("button", {
        type: "button",
        class: "learning-primary learning-start-answer",
        onClick: b[4] || (b[4] = (w) => S("question"))
      }, [b[24] || (b[24] = I("去做这一题", -1)), A(V, { name: "arrow" })])]),
      e("section", vt, [
        e("p", bt, u(J[c.value.skill]) + " · " + u(d.value + 1) + " / " + u(t.state.unit.exercises.length), 1),
        e("h2", null, u(c.value.prompt), 1),
        e("div", gt, [
          e("button", {
            type: "button",
            disabled: t.disabled || [...c.value.prompt].length > 1e3,
            onClick: b[5] || (b[5] = (w) => v("action", "say-question", { exerciseId: c.value.id }))
          }, "听题干", 8, mt),
          c.value.hasHint ? (a(), n("button", {
            key: 0,
            type: "button",
            disabled: t.disabled || c.value.hint !== null,
            onClick: b[6] || (b[6] = (w) => v("action", "reveal", {
              kind: "hints",
              id: c.value.id
            }))
          }, "提示", 8, yt)) : k("", !0),
          e("button", {
            type: "button",
            disabled: t.disabled || c.value.solution !== null,
            onClick: b[7] || (b[7] = (w) => v("action", "reveal", {
              kind: "answers",
              id: c.value.id
            }))
          }, "解答", 8, kt)
        ]),
        c.value.hint ? (a(), n("p", ct, u(c.value.hint), 1)) : k("", !0),
        c.value.solution ? (a(), n("div", pt, [c.value.solution.kind === "exact" ? (a(), n("p", ft, u(s(te)(c.value.solution.answer, c.value.response, z.value)), 1)) : c.value.solution.kind === "gaps" ? (a(), n("p", $t, u(c.value.solution.accepted.map((w) => w.forms.join(" / ")).join(`
`)), 1)) : k("", !0), c.value.solution.kind === "exact" || c.value.solution.kind === "gaps" ? (a(), n(M, { key: 2 }, [I(u(c.value.solution.explanation), 1)], 64)) : (a(), n(M, { key: 3 }, [b[25] || (b[25] = I(" 这是一道开放题，老师会根据你的表达评估。 ", -1)), e("button", {
          type: "button",
          disabled: t.disabled,
          onClick: b[8] || (b[8] = (w) => v("action", "explain", {
            exerciseId: c.value.id,
            message: "请讲解这道题，给我一个适合当前水平的参考表达。"
          }))
        }, "请老师示范", 8, ht)], 64))])) : k("", !0),
        !N.value || g.value ? (a(), Z(Le, {
          key: c.value.id,
          modelValue: T.value,
          "onUpdate:modelValue": b[9] || (b[9] = (w) => T.value = w),
          response: c.value.response,
          paragraphs: z.value,
          disabled: t.disabled,
          onSubmit: b[10] || (b[10] = (w) => v("action", "submit", {
            unitId: t.state.unit.id,
            exerciseId: c.value.id,
            answer: w
          }))
        }, null, 8, [
          "modelValue",
          "response",
          "paragraphs",
          "disabled"
        ])) : k("", !0),
        N.value ? (a(), Z(ae, {
          key: 3,
          attempt: N.value,
          feedback: x.value,
          response: c.value.response,
          paragraphs: z.value,
          disabled: t.disabled,
          onAction: b[11] || (b[11] = (w, H) => v("action", w, H))
        }, null, 8, [
          "attempt",
          "feedback",
          "response",
          "paragraphs",
          "disabled"
        ])) : k("", !0),
        N.value ? (a(), n("div", Ct, [e("button", {
          type: "button",
          disabled: t.disabled,
          onClick: b[12] || (b[12] = (w) => g.value = !g.value)
        }, u(g.value ? "收起再练" : "再试一次"), 9, xt), d.value + 1 < t.state.unit.exercises.length ? (a(), n("button", {
          key: 0,
          class: "learning-primary",
          type: "button",
          disabled: t.disabled,
          onClick: b[13] || (b[13] = (w) => d.value++)
        }, "下一题 →", 8, wt)) : !P.value && X.value && !t.state.busy ? (a(), n("button", {
          key: 1,
          type: "button",
          disabled: t.disabled,
          onClick: b[14] || (b[14] = (w) => v("action", "complete"))
        }, "请老师结课", 8, It)) : k("", !0)])) : k("", !0)
      ]),
      P.value ? (a(), n("section", Lt, [
        b[26] || (b[26] = e("p", { class: "learning-eyebrow" }, "本课已完成", -1)),
        e("p", null, u(P.value.summary), 1),
        e("strong", null, u(P.value.paid ? `+${P.value.amount} 小白币 · 已到账` : "学习已完成，到账状态见「收获」"), 1)
      ])) : k("", !0)
    ], 512), e("aside", {
      ref_key: "tutor",
      ref: L,
      class: "learning-tutor"
    }, [e("details", {
      open: f.value,
      onToggle: b[20] || (b[20] = (w) => f.value = w.target.open)
    }, [
      e("summary", null, [e("span", St, [e("span", At, u([...t.state.teacher?.name ?? "师"][0]), 1), e("span", null, u(t.state.teacher?.name), 1)]), e("span", null, [A(V, { name: "chat" }), b[27] || (b[27] = I("问老师", -1))])]),
      p.value ? (a(), n("div", Vt, [e("blockquote", null, u(p.value.quote), 1), e("div", qt, [e("button", {
        type: "button",
        onClick: b[15] || (b[15] = (w) => p.value = null)
      }, "取消选段"), e("button", {
        type: "button",
        disabled: t.disabled || [...p.value.quote].length > 1e3,
        onClick: b[16] || (b[16] = (w) => v("action", "say", { selection: p.value }))
      }, "朗读选段", 8, Ut)])])) : k("", !0),
      e("form", { onSubmit: F(l, ["prevent"]) }, [e("label", null, [b[28] || (b[28] = I("哪里还不明白？", -1)), D(e("textarea", {
        "onUpdate:modelValue": b[17] || (b[17] = (w) => $.value = w),
        rows: "3",
        maxlength: p.value ? 1800 : 2e3,
        placeholder: "解释这个用法，或者帮我换个例子…"
      }, null, 8, Tt), [[E, $.value]])]), e("button", {
        class: "learning-primary",
        type: "submit",
        disabled: t.disabled || !$.value.trim()
      }, "问老师", 8, Nt)], 32),
      b[29] || (b[29] = e("small", { class: "learning-muted" }, "提问将调用模型", -1)),
      t.state.reply ? (a(), n("div", Bt, [
        e("p", Rt, u(t.state.teacher?.name), 1),
        e("p", null, u(t.state.reply.text), 1),
        [...t.state.reply.text].length <= 1e3 ? (a(), n("button", {
          key: 0,
          type: "button",
          disabled: t.disabled,
          onClick: b[18] || (b[18] = (w) => v("action", "say-reply"))
        }, "听老师说", 8, Dt)) : k("", !0),
        t.state.reply.exerciseId ? (a(), n("button", {
          key: 1,
          type: "button",
          disabled: t.disabled || [...t.state.reply.text].length > 4e3 || t.state.unit.notes.some((w) => w.text === t.state.reply.text),
          onClick: b[19] || (b[19] = (w) => v("action", "save-note"))
        }, "保存笔记", 8, jt)) : k("", !0)
      ])) : k("", !0)
    ], 40, Mt), t.state.unit.notes.length ? (a(), n("details", Ht, [
      e("summary", null, "本课笔记 · " + u(t.state.unit.notes.length), 1),
      (a(!0), n(M, null, U(t.state.unit.notes, (w) => (a(), n("article", { key: w.id }, [
        w.selection ? (a(), n("blockquote", Ot, u(w.selection.quote), 1)) : k("", !0),
        e("p", null, u(w.text), 1),
        e("button", {
          type: "button",
          disabled: t.disabled,
          onClick: (H) => v("action", "delete-note", { id: w.id })
        }, "移除笔记", 8, Zt)
      ]))), 128)),
      b[30] || (b[30] = e("small", null, "随本课保留，换课前可以导出学习数据留存。", -1))
    ])) : k("", !0)], 512)], 2)])) : k("", !0);
  }
}), Pt = Et, zt = { class: "learning-profile-page" }, Kt = {
  class: "learning-setup-progress",
  "aria-label": "学习设置步骤"
}, Ft = [
  "disabled",
  "aria-current",
  "onClick"
], Jt = { class: "learning-setup-heading" }, Wt = { class: "learning-language-options" }, Qt = [
  "disabled",
  "aria-pressed",
  "onClick"
], Gt = { "aria-hidden": "true" }, Xt = {
  key: 0,
  class: "learning-muted"
}, Yt = ["disabled"], _t = { class: "learning-teacher-options" }, ea = [
  "disabled",
  "aria-pressed",
  "onClick"
], ta = { class: "learning-person-initial" }, aa = {
  key: 0,
  class: "learning-selected-teacher"
}, na = { class: "learning-person-initial" }, la = ["open"], ia = ["disabled"], sa = ["disabled"], ra = { class: "learning-setup-actions" }, ua = ["disabled"], da = ["disabled"], oa = { class: "learning-profile-context" }, va = ["disabled"], ba = {
  key: 0,
  class: "learning-teacher-reply",
  role: "status"
}, ga = { class: "learning-explanation-language" }, ma = ["value"], ya = { class: "learning-setup-actions" }, ka = ["disabled"], ca = ["disabled"], pa = /* @__PURE__ */ O({
  __name: "LearningProfile",
  props: {
    state: {},
    disabled: { type: Boolean }
  },
  emits: ["action"],
  setup(t, { emit: i }) {
    const y = t, v = i, d = q(y.state.profile && y.state.teacher ? 2 : 0), g = q(null), $ = q(""), p = q(""), m = q(""), o = q("zh-CN");
    j(() => JSON.stringify([y.state.language, y.state.profile && {
      selfAssessment: y.state.profile.selfAssessment,
      goal: y.state.profile.goal,
      explanationLanguage: y.state.profile.explanationLanguage
    }]), () => {
      const N = y.state.profile;
      p.value = N?.selfAssessment ?? "", m.value = N?.goal.description ?? "", o.value = N?.explanationLanguage ?? "zh-CN";
    }, { immediate: !0 });
    const C = [
      [
        "en",
        "英语",
        "Aa"
      ],
      [
        "ja",
        "日语",
        "あ"
      ],
      [
        "ko",
        "韩语",
        "한"
      ],
      [
        "fr",
        "法语",
        "Ç"
      ],
      [
        "de",
        "德语",
        "ß"
      ],
      [
        "es",
        "西班牙语",
        "Ñ"
      ],
      [
        "zh-CN",
        "中文",
        "文"
      ]
    ], f = R(() => new Intl.DisplayNames(["zh-CN"], { type: "language" }).of(y.state.language));
    async function L(N) {
      d.value = N, await K(), g.value?.focus();
    }
    function c() {
      v("action", "profile", { message: JSON.stringify({
        language: y.state.language,
        explanationLanguage: o.value,
        selfAssessment: p.value,
        goal: { description: m.value }
      }) });
    }
    return (N, x) => (a(), n("section", zt, [
      e("nav", Kt, [(a(), n(M, null, U([
        "语言",
        "老师",
        "目标"
      ], (h, T) => e("button", {
        key: h,
        type: "button",
        disabled: t.disabled || T === 2 && !t.state.teacher,
        "aria-current": d.value === T ? "step" : void 0,
        onClick: (B) => L(T)
      }, [e("span", null, u(T + 1), 1), I(u(h), 1)], 8, Ft)), 64))]),
      e("div", Jt, [e("h1", {
        ref_key: "heading",
        ref: g,
        tabindex: "-1"
      }, u([
        "选择语言",
        "选择老师",
        "学习目标"
      ][d.value]), 513)]),
      d.value === 0 ? (a(), n(M, { key: 0 }, [
        e("div", Wt, [(a(), n(M, null, U(C, ([h, T, B]) => e("button", {
          key: h,
          type: "button",
          disabled: t.disabled,
          "aria-pressed": t.state.language === h,
          onClick: (z) => v("action", "language", { language: h })
        }, [
          e("span", Gt, u(B), 1),
          e("strong", null, u(T), 1),
          t.state.language === h ? (a(), Z(V, {
            key: 0,
            name: "check"
          })) : k("", !0)
        ], 8, Qt)), 64))]),
        C.some(([h]) => h === t.state.language) ? k("", !0) : (a(), n("p", Xt, "当前选择：" + u(f.value), 1)),
        e("button", {
          type: "button",
          class: "learning-primary learning-setup-next",
          disabled: t.disabled,
          onClick: x[0] || (x[0] = (h) => L(1))
        }, [x[10] || (x[10] = I("继续", -1)), A(V, { name: "arrow" })], 8, Yt)
      ], 64)) : d.value === 1 ? (a(), n(M, { key: 1 }, [
        e("div", _t, [(a(!0), n(M, null, U(t.state.candidates, (h) => (a(), n("button", {
          key: h.name,
          type: "button",
          disabled: t.disabled,
          "aria-pressed": t.state.teacher?.name === h.name,
          onClick: (T) => v("action", "teacher", { teacher: {
            name: h.name,
            note: ""
          } })
        }, [
          e("span", ta, u([...h.name][0]), 1),
          e("strong", null, u(h.name), 1),
          t.state.teacher?.name === h.name ? (a(), Z(V, {
            key: 0,
            name: "check"
          })) : k("", !0)
        ], 8, ea))), 128))]),
        t.state.teacher && !t.state.candidates.some((h) => h.name === t.state.teacher?.name) ? (a(), n("p", aa, [
          e("span", na, u([...t.state.teacher.name][0]), 1),
          I(u(t.state.teacher.name), 1),
          A(V, { name: "check" })
        ])) : k("", !0),
        e("details", {
          class: "learning-other-teacher",
          open: !t.state.candidates.length && !t.state.teacher
        }, [x[11] || (x[11] = e("summary", null, "选择其他人物", -1)), e("form", {
          class: "learning-row",
          onSubmit: x[2] || (x[2] = F((h) => v("action", "teacher", { teacher: {
            name: $.value.trim(),
            note: ""
          } }), ["prevent"]))
        }, [D(e("input", {
          "onUpdate:modelValue": x[1] || (x[1] = (h) => $.value = h),
          type: "text",
          "aria-label": "其他人物名字",
          maxlength: "80",
          placeholder: "输入人物名字",
          disabled: t.disabled
        }, null, 8, ia), [[E, $.value]]), e("button", {
          type: "submit",
          disabled: t.disabled || !$.value.trim()
        }, "选这位", 8, sa)], 32)], 8, la),
        e("div", ra, [e("button", {
          type: "button",
          disabled: t.disabled,
          onClick: x[3] || (x[3] = (h) => L(0))
        }, "上一步", 8, ua), e("button", {
          type: "button",
          class: "learning-primary",
          disabled: t.disabled || !t.state.teacher,
          onClick: x[4] || (x[4] = (h) => L(2))
        }, [x[12] || (x[12] = I("继续", -1)), A(V, { name: "arrow" })], 8, da)])
      ], 64)) : (a(), n(M, { key: 2 }, [
        e("div", oa, [
          e("span", null, u(f.value), 1),
          e("span", null, u(t.state.teacher?.name ?? "尚未选择老师"), 1),
          e("button", {
            type: "button",
            disabled: t.disabled,
            onClick: x[5] || (x[5] = (h) => L(0))
          }, "更换", 8, va)
        ]),
        t.state.reply?.action === "profile" ? (a(), n("div", ba, [e("strong", null, u(t.state.teacher?.name), 1), e("p", null, u(t.state.reply.text), 1)])) : k("", !0),
        e("form", {
          class: "learning-profile-form",
          onSubmit: F(c, ["prevent"])
        }, [
          e("label", null, [x[13] || (x[13] = e("span", null, "目前的水平", -1)), D(e("textarea", {
            "onUpdate:modelValue": x[6] || (x[6] = (h) => p.value = h),
            rows: "2",
            maxlength: "800",
            placeholder: "例如：有高中基础，阅读还行，听力跟不上。"
          }, null, 512), [[E, p.value]])]),
          e("label", null, [x[14] || (x[14] = e("span", null, "想达到的目标", -1)), D(e("textarea", {
            "onUpdate:modelValue": x[7] || (x[7] = (h) => m.value = h),
            rows: "2",
            maxlength: "800",
            placeholder: "例如：准备英语四级，希望能读懂新闻。"
          }, null, 512), [[E, m.value]])]),
          e("details", ga, [e("summary", null, "讲解语言 · " + u(C.find(([h]) => h === o.value)?.[1] ?? o.value), 1), e("label", null, [x[15] || (x[15] = I("老师用什么语言讲解", -1)), D(e("select", { "onUpdate:modelValue": x[8] || (x[8] = (h) => o.value = h) }, [(a(), n(M, null, U(C, ([h, T]) => e("option", {
            key: h,
            value: h
          }, u(T), 9, ma)), 64))], 512), [[G, o.value]])])]),
          e("div", ya, [e("button", {
            type: "button",
            disabled: t.disabled,
            onClick: x[9] || (x[9] = (h) => L(1))
          }, "上一步", 8, ka), e("button", {
            type: "submit",
            class: "learning-primary",
            disabled: t.disabled || !t.state.teacher || !p.value.trim() || !m.value.trim()
          }, [I(u(t.state.message && !t.state.busy ? "重试保存" : "保存目标"), 1), A(V, { name: "arrow" })], 8, ca)]),
          x[16] || (x[16] = e("small", null, "保存目标将调用模型", -1))
        ], 32)
      ], 64))
    ]));
  }
}), fa = pa, $a = { class: "learning-records-page" }, ha = { class: "learning-page-heading" }, Ca = {
  key: 0,
  class: "learning-muted"
}, xa = { class: "learning-muted" }, wa = {
  key: 0,
  class: "learning-muted"
}, Ia = ["disabled", "onClick"], La = ["disabled"], Ma = {
  key: 0,
  class: "learning-empty-note"
}, Sa = ["disabled", "onClick"], Aa = { key: 0 }, Va = {
  key: 1,
  class: "learning-row"
}, qa = ["disabled"], Ua = { class: "learning-muted" }, Ta = ["disabled"], Na = /* @__PURE__ */ O({
  __name: "LearningRecords",
  props: {
    state: {},
    disabled: { type: Boolean }
  },
  emits: ["action", "remove"],
  setup(t) {
    const i = {
      unassessed: "尚待练习",
      review: "待复核",
      independent: "已能独立使用",
      practised: "练过一次",
      strengthen: "再练练"
    };
    return (y, v) => (a(), n("section", $a, [e("div", ha, [v[5] || (v[5] = e("h1", null, "学习记录", -1)), t.state.records.total ? (a(), n("span", Ca, u(t.state.records.total) + " 项", 1)) : k("", !0)]), t.state.record ? (a(), n(M, { key: 0 }, [
      e("button", {
        type: "button",
        onClick: v[0] || (v[0] = (d) => y.$emit("action", "records", { offset: t.state.records.offset }))
      }, "‹ 返回记录"),
      e("h2", null, u(t.state.record.label), 1),
      (a(!0), n(M, null, U(t.state.record.evidence, (d) => (a(), n("article", {
        key: d.attempt.id,
        class: "learning-record-evidence"
      }, [
        e("p", xa, u(new Date(d.attempt.submittedAt).toLocaleDateString()), 1),
        e("h3", null, u(d.exercise.prompt), 1),
        (a(!0), n(M, null, U(d.materials, (g) => (a(), n("details", { key: g.id }, [e("summary", null, u(g.title), 1), g.hidden ? (a(), n("p", wa, "听力文稿尚未展开；原答和反馈如下。")) : (a(!0), n(M, { key: 1 }, U(g.paragraphs, ($) => (a(), n("p", { key: $.id }, u($.text), 1))), 128))]))), 128)),
        A(ae, {
          attempt: d.attempt,
          feedback: d.assessment,
          response: d.exercise.response,
          paragraphs: d.materials.flatMap((g) => g.paragraphs),
          disabled: t.disabled,
          onAction: v[1] || (v[1] = (g, $) => y.$emit("action", g, $))
        }, null, 8, [
          "attempt",
          "feedback",
          "response",
          "paragraphs",
          "disabled"
        ]),
        e("button", {
          type: "button",
          disabled: t.disabled,
          onClick: (g) => y.$emit("remove", "delete-attempt", { id: d.attempt.id }, "删除这条原答和依赖它的反馈？相关学习项会重新计算，不撤回已到账奖励。")
        }, "删除这条原答", 8, Ia)
      ]))), 128)),
      e("button", {
        type: "button",
        disabled: t.disabled,
        onClick: v[2] || (v[2] = (d) => y.$emit("remove", "delete-item", { id: t.state.record.id }, "删除这个学习项及其不再被引用的证据？当前课程不会被删除。"))
      }, "删除学习项", 8, La)
    ], 64)) : (a(), n(M, { key: 1 }, [
      t.state.records.total ? k("", !0) : (a(), n("p", Ma, "暂无学习记录")),
      (a(!0), n(M, null, U(t.state.records.items, (d) => (a(), n("button", {
        key: d.id,
        class: "learning-record-row",
        type: "button",
        disabled: !d.readable,
        onClick: (g) => y.$emit("action", "records", {
          id: d.id,
          offset: t.state.records.offset
        })
      }, [e("span", null, [e("strong", null, u(d.label), 1), e("small", null, [I(u(d.evidenceCount) + " 份作答依据", 1), d.nextReviewAt ? (a(), n("span", Aa, " · 建议 " + u(new Date(d.nextReviewAt).toLocaleDateString()) + " 再练", 1)) : k("", !0)])]), e("em", null, u(i[d.state]), 1)], 8, Sa))), 128)),
      t.state.records.total > 30 ? (a(), n("div", Va, [
        e("button", {
          type: "button",
          disabled: t.state.records.offset === 0,
          onClick: v[3] || (v[3] = (d) => y.$emit("action", "records", { offset: Math.max(0, t.state.records.offset - 30) }))
        }, "上一页", 8, qa),
        e("span", Ua, u(t.state.records.total) + " 项", 1),
        e("button", {
          type: "button",
          disabled: t.state.records.offset + 30 >= t.state.records.total,
          onClick: v[4] || (v[4] = (d) => y.$emit("action", "records", { offset: t.state.records.offset + 30 }))
        }, "下一页", 8, Ta)
      ])) : k("", !0)
    ], 64))]));
  }
}), Ba = Na, Ra = { class: "learning-desk" }, Da = { class: "learning-person-initial" }, ja = { class: "learning-language-badge" }, Ha = { class: "learning-current-course" }, Oa = {
  class: "learning-course-mark",
  "aria-hidden": "true"
}, Za = {
  key: 0,
  class: "learning-course-goal"
}, Ea = { class: "learning-course-progress" }, Pa = ["value", "max"], za = ["disabled"], Ka = {
  key: 4,
  class: "learning-request-cost"
}, Fa = {
  key: 0,
  class: "learning-margin-note"
}, Ja = { class: "learning-next-lesson" }, Wa = { class: "learning-row" }, Qa = ["disabled"], Ga = ["disabled"], Xa = ["open"], Ya = ["disabled"], _a = /* @__PURE__ */ O({
  __name: "LearningDesk",
  props: {
    state: {},
    disabled: { type: Boolean }
  },
  emits: [
    "navigate",
    "prepare",
    "action"
  ],
  setup(t) {
    const i = t, y = q(""), v = q(!i.state.unit);
    j(() => i.state.reply, (p) => {
      p?.action === "prepare" && (v.value = !0);
    });
    const d = R(() => new Intl.DisplayNames(["zh-CN"], { type: "language" }).of(i.state.language)), g = R(() => i.state.unit?.exercises.filter((p) => i.state.unit.attempts.some((m) => m.exerciseId === p.id)).length ?? 0), $ = R(() => i.state.completions.some((p) => p.unitId === i.state.unit?.id));
    return (p, m) => (a(), n("section", Ra, [
      e("button", {
        class: "learning-teacher-line",
        type: "button",
        onClick: m[0] || (m[0] = (o) => p.$emit("navigate", "profile"))
      }, [
        e("span", Da, u([...t.state.teacher?.name ?? "？"][0]), 1),
        e("strong", null, u(t.state.teacher?.name ?? "选择老师"), 1),
        e("span", ja, [I(u(d.value), 1), A(V, { name: "arrow" })])
      ]),
      e("section", Ha, [
        e("div", Oa, [A(V, { name: "book" })]),
        e("h1", null, u(t.state.unit?.title ?? "准备第一课"), 1),
        t.state.unit ? (a(), n("p", Za, u(t.state.unit.goal), 1)) : k("", !0),
        t.state.unit ? (a(), n(M, { key: 1 }, [
          e("div", Ea, [e("span", null, u($.value ? "已完成" : `${g.value} / ${t.state.unit.exercises.length} 题`), 1), e("span", null, [A(V, { name: "reward" }), I(u(t.state.unit.reward.amount) + " 币", 1)])]),
          e("progress", {
            value: g.value,
            max: t.state.unit.exercises.length,
            "aria-label": "本课作答进度"
          }, null, 8, Pa),
          e("button", {
            type: "button",
            class: "learning-primary learning-course-start",
            onClick: m[1] || (m[1] = (o) => p.$emit("navigate", "lesson"))
          }, [I(u($.value ? "回顾这一课" : g.value ? "继续学习" : "进入课堂"), 1), A(V, { name: "arrow" })])
        ], 64)) : !t.state.profile || !t.state.teacher ? (a(), n("button", {
          key: 2,
          type: "button",
          class: "learning-primary learning-course-start",
          onClick: m[2] || (m[2] = (o) => p.$emit("navigate", "profile"))
        }, [m[9] || (m[9] = I("设置学习目标", -1)), A(V, { name: "arrow" })])) : (a(), n("button", {
          key: 3,
          type: "button",
          class: "learning-primary learning-course-start",
          disabled: t.disabled,
          onClick: m[3] || (m[3] = (o) => p.$emit("prepare", y.value, !1))
        }, [m[10] || (m[10] = I("请老师备课", -1)), A(V, { name: "arrow" })], 8, za)),
        !t.state.unit && t.state.profile && t.state.teacher ? (a(), n("small", Ka, "备课将调用模型")) : k("", !0)
      ]),
      t.state.blockedUnit ? (a(), n("p", Fa, "上一课属于其他故事。回到原聊天可继续，也可以在这里换一课。")) : k("", !0),
      t.state.profile && t.state.teacher ? (a(), n(M, { key: 1 }, [e("details", Ja, [
        e("summary", null, [I(u(t.state.unit || t.state.blockedUnit ? "换一课" : "指定练习内容"), 1), m[11] || (m[11] = e("span", null, "＋", -1))]),
        e("label", null, [m[12] || (m[12] = I("练习内容", -1)), D(e("textarea", {
          "onUpdate:modelValue": m[4] || (m[4] = (o) => y.value = o),
          rows: "2",
          maxlength: "2000",
          placeholder: "四级阅读、新闻听力……"
        }, null, 512), [[E, y.value]])]),
        e("div", Wa, [e("button", {
          type: "button",
          class: "learning-primary",
          disabled: t.disabled,
          onClick: m[5] || (m[5] = (o) => p.$emit("prepare", y.value, !1))
        }, "准备" + u(t.state.unit ? "新" : "这一") + "课", 9, Qa), e("button", {
          type: "button",
          disabled: t.disabled,
          onClick: m[6] || (m[6] = (o) => p.$emit("prepare", y.value, !0))
        }, "今天轻松一点", 8, Ga)]),
        m[13] || (m[13] = e("small", { class: "learning-request-cost" }, "备课将调用模型", -1))
      ]), t.state.reply?.action === "prepare" ? (a(), n("details", {
        key: 0,
        class: "learning-teacher-reply",
        open: v.value,
        onToggle: m[8] || (m[8] = (o) => v.value = o.target.open)
      }, [
        e("summary", null, u(t.state.teacher.name) + " · 备课留言", 1),
        e("p", null, u(t.state.reply.text), 1),
        [...t.state.reply.text].length <= 1e3 ? (a(), n("button", {
          key: 0,
          type: "button",
          disabled: t.disabled,
          onClick: m[7] || (m[7] = (o) => p.$emit("action", "say-reply"))
        }, [A(V, { name: "sound" }), m[14] || (m[14] = I("听老师说", -1))], 8, Ya)) : k("", !0)
      ], 40, Xa)) : k("", !0)], 64)) : k("", !0)
    ]));
  }
}), en = _a;
function tn(t) {
  const i = ie(structuredClone(se(t.initialState))), y = q(!1), v = q("");
  let d = !1, g = 0, $ = () => {
  };
  const p = R(() => !y.value && !i.value.busy && i.value.storage === "ready");
  async function m(o, C = {}) {
    if (y.value) return;
    y.value = !0, v.value = "";
    const f = i.value.chatIdentity, L = g;
    try {
      const c = await t.bridge.request(`learning/${o}`, {
        chatIdentity: f,
        ...C
      }, 35e3);
      return !d || i.value.chatIdentity !== f ? void 0 : (g === L && c.result.state.chatIdentity === f && (i.value = c.result.state), c.result);
    } catch {
      d && i.value.chatIdentity === f && (v.value = "暂未收到操作结果。请先读取已保存内容，不要重复提交或生成。");
    } finally {
      d && (y.value = !1);
    }
  }
  return le(() => {
    d = !0, $ = t.bridge.subscribe((o) => {
      if (o.type === "learning/media") {
        i.value = {
          ...i.value,
          media: o.payload.media
        };
        return;
      }
      if (o.type !== "learning/state") return;
      const C = o.payload.state;
      C.chatIdentity === i.value.chatIdentity && (g++, i.value = C, v.value = "");
    });
  }), re(() => {
    d = !1, $();
  }), {
    state: i,
    pending: y,
    writable: p,
    localMessage: v,
    request: m
  };
}
var an = {
  class: "learning-app",
  "aria-label": "语伴语言学习"
}, nn = ["inert"], ln = ["inert"], sn = ["disabled"], rn = {
  key: 2,
  class: "learning-row"
}, un = ["disabled"], dn = ["disabled"], on = ["disabled"], vn = ["disabled"], bn = ["inert"], gn = {
  key: 1,
  class: "learning-empty-page"
}, mn = {
  key: 3,
  class: "learning-harvest-page"
}, yn = {
  key: 0,
  class: "learning-empty-note"
}, kn = { class: "learning-muted" }, cn = ["disabled", "onClick"], pn = ["disabled"], fn = ["disabled"], $n = {
  key: 3,
  class: "learning-row"
}, hn = ["disabled"], Cn = ["disabled"], xn = {
  key: 4,
  class: "learning-settings-page"
}, wn = ["value", "disabled"], In = ["value"], Ln = {
  key: 0,
  class: "learning-muted"
}, Mn = ["value", "disabled"], Sn = ["disabled"], An = ["disabled"], Vn = ["disabled"], qn = ["disabled"], Un = ["disabled"], Tn = ["disabled"], Nn = ["inert"], Bn = {
  key: 0,
  role: "status"
}, Rn = { class: "learning-row" }, Dn = ["aria-label", "disabled"], jn = ["max", "value"], Hn = ["inert"], On = ["aria-current", "onClick"], Zn = {
  role: "alertdialog",
  "aria-modal": "true",
  "aria-labelledby": "learning-confirm-title",
  class: "learning-confirm"
}, En = { class: "learning-row" }, Pn = /* @__PURE__ */ O({
  __name: "LearningApp",
  props: {
    bridge: {},
    initialState: {}
  },
  setup(t) {
    const { state: i, pending: y, writable: v, localMessage: d, request: g } = tn(t), $ = q(i.value.profile && i.value.teacher ? "desk" : "profile"), p = q(null), m = {}, o = q(null), C = q(null);
    let f = null;
    const L = q(i.value.profile?.voice?.voiceId ?? i.value.voices.defaultVoice), c = q(i.value.profile?.voice?.language ?? i.value.language), N = q(i.value.profile?.voice?.speed ?? 1), x = q(0), h = R(() => i.value.completions.slice(x.value * 20, (x.value + 1) * 20));
    j([() => i.value.language, () => i.value.profile?.voice], ([S, l]) => {
      L.value = l?.voiceId ?? i.value.voices.defaultVoice, c.value = l?.language ?? S, N.value = l?.speed ?? 1;
    }), j(() => i.value.unit?.id, (S, l) => {
      S && S !== l && T("lesson");
    }), j(() => !!i.value.profile, (S, l) => {
      S && !l && T("desk");
    }), j(() => i.value.language, () => {
      x.value = 0;
    });
    async function T(S) {
      if (p.value && (m[$.value] = p.value.scrollTop), $.value === "lesson" && S !== "lesson" && g("stop"), $.value = S, await K(), p.value) {
        p.value.scrollTop = m[S] ?? 0;
        const l = [...p.value.querySelectorAll("h1")].find((r) => r.offsetParent !== null);
        l && (l.tabIndex = -1, l.focus({ preventScroll: !0 }));
      }
    }
    async function B(S, l, r) {
      f = document.activeElement instanceof HTMLElement ? document.activeElement : null, o.value = {
        action: S,
        input: l,
        text: r
      }, await K(), C.value?.focus();
    }
    j(o, async (S) => {
      S || (await K(), f?.focus({ preventScroll: !0 }));
    });
    function z(S) {
      const l = S.currentTarget.querySelectorAll("button");
      S.shiftKey && document.activeElement === l[0] ? (S.preventDefault(), l[l.length - 1]?.focus()) : !S.shiftKey && document.activeElement === l[l.length - 1] && (S.preventDefault(), l[0]?.focus());
    }
    function P(S = "", l = !1) {
      const r = {
        replaceCurrent: !!i.value.unit || i.value.blockedUnit,
        message: S.trim() || (l ? "今天想轻松做一次短练。请按我的目标和实际水平安排，也可以复习合适的知识点。" : "请按我的目标和实际水平准备下一课，选择有帮助的真实材料或练习，也照顾值得复习的知识点。")
      };
      r.replaceCurrent ? B("prepare", r, "准备新课会替换当前课件和本课笔记。已保留的学习证据及奖励资格不受影响；需要完整留存本课，可以先导出学习数据。") : g("prepare", r);
    }
    async function X() {
      const S = await g("export");
      if (!S?.document) return;
      const l = URL.createObjectURL(new Blob([JSON.stringify(S.document, null, 2)], { type: "application/json" })), r = document.createElement("a");
      r.href = l, r.download = "LittleWhiteBox_Learning.json", r.click(), setTimeout(() => URL.revokeObjectURL(l), 1e3);
    }
    function J(S) {
      return `${Math.floor(S / 60)}:${String(Math.floor(S % 60)).padStart(2, "0")}`;
    }
    return (S, l) => (a(), n("section", an, [
      e("header", {
        class: "learning-toolbar",
        inert: !!o.value
      }, [
        $.value === "settings" || $.value === "profile" ? (a(), n("button", {
          key: 0,
          type: "button",
          class: "learning-toolbar-back",
          "aria-label": "返回学习首页",
          onClick: l[0] || (l[0] = (r) => T("desk"))
        }, [A(V, { name: "back" })])) : k("", !0),
        e("button", {
          type: "button",
          class: "learning-wordmark",
          onClick: l[1] || (l[1] = (r) => T("desk"))
        }, [...l[32] || (l[32] = [e("span", {
          class: "learning-brand-mark",
          "aria-hidden": "true"
        }, [I("a"), e("span", null, "あ")], -1), I("语伴", -1)])]),
        e("button", {
          type: "button",
          class: "learning-toolbar-more",
          "aria-label": "语伴设置",
          onClick: l[2] || (l[2] = (r) => T("settings"))
        }, [A(V, { name: "more" })])
      ], 8, nn),
      s(i).busy || s(i).message || s(d) || s(i).storage !== "ready" ? (a(), n("div", {
        key: 0,
        class: Q(["learning-notice", { "is-working": s(i).busy }]),
        role: "status",
        "aria-live": "polite",
        inert: !!o.value
      }, [s(i).busy ? (a(), n(M, { key: 0 }, [
        l[33] || (l[33] = e("span", { class: "learning-working-dot" }, null, -1)),
        I(u(s(i).message || "正在处理学习操作…"), 1),
        e("button", {
          type: "button",
          disabled: s(y),
          onClick: l[3] || (l[3] = (r) => s(g)("cancel"))
        }, "停止", 8, sn)
      ], 64)) : (a(), n(M, { key: 1 }, [I(u(s(d) || s(i).message || (s(i).storage === "unconfirmed" ? "上次保存尚未确认，请先核实。" : s(i).storage === "conflict" ? "学习文件出现另一版本，请先核实。" : "暂时无法读取学习文件。")), 1)], 64)), s(i).busy ? k("", !0) : (a(), n("div", rn, [
        s(i).storage === "unconfirmed" || s(i).storage === "conflict" ? (a(), n("button", {
          key: 0,
          type: "button",
          disabled: s(y),
          onClick: l[4] || (l[4] = (r) => s(g)("verify"))
        }, "核实保存", 8, un)) : k("", !0),
        s(i).storage === "unconfirmed" ? (a(), n("button", {
          key: 1,
          type: "button",
          disabled: s(y),
          onClick: l[5] || (l[5] = (r) => s(g)("retry-save"))
        }, "重试原保存", 8, dn)) : k("", !0),
        s(i).storage === "conflict" ? (a(), n("button", {
          key: 2,
          type: "button",
          disabled: s(y),
          onClick: l[6] || (l[6] = (r) => B("adopt-server", {}, "采用服务器上的学习文件？未确认的本次修改将不再作为候选保留。"))
        }, "采用服务器版本", 8, on)) : k("", !0),
        s(i).storage === "unloaded" || s(d) ? (a(), n("button", {
          key: 3,
          type: "button",
          disabled: s(y),
          onClick: l[7] || (l[7] = (r) => s(g)("read"))
        }, "重试读取", 8, vn)) : k("", !0)
      ]))], 10, ln)) : k("", !0),
      e("div", {
        ref_key: "scroller",
        ref: p,
        class: "learning-scroll",
        inert: !!o.value
      }, [
        D(A(en, {
          state: s(i),
          disabled: !s(v),
          onNavigate: T,
          onPrepare: P,
          onAction: s(g)
        }, null, 8, [
          "state",
          "disabled",
          "onAction"
        ]), [[Y, $.value === "desk"]]),
        D(A(fa, {
          state: s(i),
          disabled: !s(v),
          onAction: s(g)
        }, null, 8, [
          "state",
          "disabled",
          "onAction"
        ]), [[Y, $.value === "profile"]]),
        s(i).unit ? D((a(), Z(Pt, {
          key: `${s(i).chatIdentity}:${s(i).language}:${s(i).unit.id}`,
          state: s(i),
          disabled: !s(v),
          onAction: s(g)
        }, null, 8, [
          "state",
          "disabled",
          "onAction"
        ])), [[Y, $.value === "lesson"]]) : k("", !0),
        $.value === "lesson" && !s(i).unit ? (a(), n("section", gn, [
          A(V, { name: "book" }),
          l[35] || (l[35] = e("h1", null, "还没有课程", -1)),
          e("button", {
            class: "learning-primary",
            type: "button",
            onClick: l[8] || (l[8] = (r) => T("desk"))
          }, [l[34] || (l[34] = I("去备课", -1)), A(V, { name: "arrow" })])
        ])) : k("", !0),
        $.value === "records" ? (a(), Z(Ba, {
          key: 2,
          state: s(i),
          disabled: !s(v),
          onAction: s(g),
          onRemove: B
        }, null, 8, [
          "state",
          "disabled",
          "onAction"
        ])) : k("", !0),
        $.value === "harvest" ? (a(), n("section", mn, [
          l[37] || (l[37] = e("div", { class: "learning-page-heading" }, [e("h1", null, "我的收获")], -1)),
          s(i).completions.length ? k("", !0) : (a(), n("p", yn, "还没有完成的课程")),
          (a(!0), n(M, null, U(h.value, (r) => (a(), n("article", {
            key: r.unitId,
            class: "learning-harvest-entry"
          }, [
            e("small", null, u(new Date(r.completedAt).toLocaleDateString()), 1),
            e("h2", null, [I("+" + u(r.amount), 1), l[36] || (l[36] = e("span", null, "小白币", -1))]),
            e("p", null, u(r.summary), 1),
            e("p", kn, u(r.paid ? "已到账" : r.originHere ? "学习已完成，等待到账" : "请回到开课的原聊天领取"), 1),
            !r.paid && r.originHere ? (a(), n("button", {
              key: 0,
              type: "button",
              disabled: !s(v),
              onClick: (b) => s(g)("reward", {
                unitId: r.unitId,
                openWallet: !s(i).walletOpen
              })
            }, u(s(i).walletOpen ? "核实并补领" : "开通钱包并领取"), 9, cn)) : k("", !0)
          ]))), 128)),
          s(i).chatStorage === "unconfirmed" || s(i).chatStorage === "conflict" || s(i).chatStorage === "failed" ? (a(), n("button", {
            key: 1,
            type: "button",
            disabled: s(y) || s(i).busy,
            onClick: l[9] || (l[9] = (r) => s(g)("verify-wallet"))
          }, "核实账本保存", 8, pn)) : k("", !0),
          s(i).chatStorage === "conflict" ? (a(), n("button", {
            key: 2,
            type: "button",
            disabled: s(y) || s(i).busy,
            onClick: l[10] || (l[10] = (r) => B("adopt-wallet", {}, "采用服务器上的聊天账本？本次未确认的候选将被放下，之后可凭已保存的学习完成记录核实并补领。"))
          }, "采用服务器账本", 8, fn)) : k("", !0),
          s(i).completions.length > 20 ? (a(), n("div", $n, [e("button", {
            type: "button",
            disabled: x.value === 0,
            onClick: l[11] || (l[11] = (r) => x.value--)
          }, "上一页", 8, hn), e("button", {
            type: "button",
            disabled: (x.value + 1) * 20 >= s(i).completions.length,
            onClick: l[12] || (l[12] = (r) => x.value++)
          }, "下一页", 8, Cn)])) : k("", !0)
        ])) : k("", !0),
        $.value === "settings" ? (a(), n("section", xn, [
          l[46] || (l[46] = e("h1", null, "学习设置", -1)),
          e("label", null, [l[38] || (l[38] = I("当前语言", -1)), e("select", {
            value: s(i).language,
            disabled: !s(v),
            onChange: l[13] || (l[13] = (r) => s(g)("language", { language: r.target.value }))
          }, [(a(!0), n(M, null, U([.../* @__PURE__ */ new Set([s(i).language, ...s(i).languages])], (r) => (a(), n("option", {
            key: r,
            value: r
          }, u(new Intl.DisplayNames(["zh-CN"], { type: "language" }).of(r)), 9, In))), 128))], 40, wn)]),
          e("button", {
            type: "button",
            onClick: l[14] || (l[14] = (r) => T("profile"))
          }, "语言、老师与目标 →"),
          e("section", null, [
            l[43] || (l[43] = e("h2", null, "老师的声音", -1)),
            s(i).voices.enabled ? (a(), n("form", {
              key: 1,
              onSubmit: l[19] || (l[19] = F((r) => s(g)("voice", { voice: {
                voiceId: L.value,
                language: c.value,
                speed: Number(N.value)
              } }), ["prevent"]))
            }, [
              e("label", null, [l[39] || (l[39] = I("音色", -1)), D(e("select", { "onUpdate:modelValue": l[15] || (l[15] = (r) => L.value = r) }, [(a(!0), n(M, null, U(s(i).voices.voices, (r) => (a(), n("option", {
                key: r.id,
                value: r.id,
                disabled: !r.available
              }, u(r.name) + u(r.available ? "" : "（暂不可用）"), 9, Mn))), 128))], 512), [[G, L.value]])]),
              e("label", null, [l[40] || (l[40] = I("发音语言", -1)), D(e("input", {
                "onUpdate:modelValue": l[16] || (l[16] = (r) => c.value = r),
                type: "text",
                maxlength: "80",
                placeholder: "en / ja"
              }, null, 512), [[E, c.value]])]),
              e("label", null, [l[42] || (l[42] = I("合成语速", -1)), D(e("select", { "onUpdate:modelValue": l[17] || (l[17] = (r) => N.value = r) }, [...l[41] || (l[41] = [
                e("option", { value: 0.75 }, "0.75×", -1),
                e("option", { value: 1 }, "1×", -1),
                e("option", { value: 1.25 }, "1.25×", -1)
              ])], 512), [[G, N.value]])]),
              e("button", {
                type: "submit",
                disabled: !s(v) || !s(i).profile
              }, "保存声音偏好", 8, Sn),
              e("button", {
                type: "button",
                onClick: l[18] || (l[18] = (r) => s(g)("tts-settings"))
              }, "打开 TTS 设置")
            ], 32)) : (a(), n("p", Ln, "使用语音前，请先开启 TTS 模块。文字学习不受影响。")),
            l[44] || (l[44] = e("small", null, "已听过的题保留原声音，新偏好用于之后的题目。", -1))
          ]),
          e("section", null, [
            l[45] || (l[45] = e("h2", null, "学习数据", -1)),
            e("button", {
              type: "button",
              disabled: !s(v),
              onClick: X
            }, "导出学习数据", 8, An),
            e("button", {
              type: "button",
              disabled: s(y) || s(i).busy,
              onClick: l[20] || (l[20] = (r) => s(g)("read"))
            }, "重新读取保存内容", 8, Vn),
            s(i).unit || s(i).blockedUnit ? (a(), n("button", {
              key: 0,
              type: "button",
              disabled: !s(v),
              onClick: l[21] || (l[21] = (r) => B("abandon", {}, "放下当前这一课？本课课件、原答和笔记会移除；已被学习项保留的证据和完成奖励资格仍保留。"))
            }, "放下当前课件", 8, qn)) : k("", !0),
            e("button", {
              type: "button",
              class: "learning-danger",
              disabled: !s(v) || !s(i).profile,
              onClick: l[22] || (l[22] = (r) => B("delete-language", {}, "删除当前语言的全部学习数据？未领取奖励也将放弃，已到账流水保留。"))
            }, "删除当前语言", 8, Un),
            e("button", {
              type: "button",
              class: "learning-danger",
              disabled: !s(v),
              onClick: l[23] || (l[23] = (r) => B("clear", {}, "清空所有语言的目标、课程和记录？未领取奖励也将放弃。已到账流水不撤销。"))
            }, "清空全部学习数据", 8, Tn)
          ])
        ])) : k("", !0)
      ], 8, bn),
      s(i).media.status !== "idle" ? (a(), n("section", {
        key: 1,
        class: "learning-player",
        "aria-label": "课堂朗读",
        inert: !!o.value
      }, [
        s(i).media.message ? (a(), n("p", Bn, u(s(i).media.message), 1)) : k("", !0),
        e("div", Rn, [
          A(V, { name: "sound" }),
          e("span", null, u(s(i).media.status === "loading" ? "正在生成声音…" : `${J(s(i).media.position)} / ${J(s(i).media.duration)}`), 1),
          s(i).media.status === "playing" ? (a(), n("button", {
            key: 0,
            type: "button",
            "aria-label": "暂停",
            onClick: l[24] || (l[24] = (r) => s(g)("pause"))
          }, [A(V, { name: "pause" })])) : [
            "paused",
            "ended",
            "blocked"
          ].includes(s(i).media.status) ? (a(), n("button", {
            key: 1,
            type: "button",
            "aria-label": s(i).media.status === "ended" ? "再听一遍" : "继续播放",
            disabled: s(i).busy,
            onClick: l[25] || (l[25] = (r) => s(g)("resume"))
          }, [A(V, { name: "play" })], 8, Dn)) : k("", !0),
          e("button", {
            type: "button",
            "aria-label": "停止",
            onClick: l[26] || (l[26] = (r) => s(g)("stop"))
          }, [A(V, { name: "stop" })]),
          s(i).media.duration ? (a(), n("button", {
            key: 2,
            type: "button",
            onClick: l[27] || (l[27] = (r) => s(g)("rate", { value: s(i).media.rate === 1 ? 0.75 : 1 }))
          }, u(s(i).media.rate) + "×", 1)) : k("", !0)
        ]),
        s(i).media.duration ? (a(), n("input", {
          key: 1,
          type: "range",
          min: "0",
          max: s(i).media.duration,
          step: "0.1",
          value: s(i).media.position,
          "aria-label": "当前声音片段播放位置",
          onChange: l[28] || (l[28] = (r) => s(g)("seek", { value: Number(r.target.value) }))
        }, null, 40, jn)) : k("", !0)
      ], 8, Nn)) : k("", !0),
      e("nav", {
        class: "learning-bottom-nav",
        "aria-label": "语伴页面",
        inert: !!o.value
      }, [(a(), n(M, null, U([
        [
          "desk",
          "学习",
          "home"
        ],
        [
          "lesson",
          "课堂",
          "book"
        ],
        [
          "records",
          "记录",
          "records"
        ],
        [
          "harvest",
          "收获",
          "reward"
        ]
      ], ([r, b, w]) => e("button", {
        key: r,
        type: "button",
        "aria-current": $.value === r ? "page" : void 0,
        onClick: (H) => T(r)
      }, [A(V, { name: w }, null, 8, ["name"]), e("span", null, u(b), 1)], 8, On)), 64))], 8, Hn),
      o.value ? (a(), n("div", {
        key: 2,
        class: "learning-confirm-shade",
        onKeydown: [l[31] || (l[31] = _(F((r) => o.value = null, ["stop", "prevent"]), ["esc"])), _(z, ["tab"])]
      }, [e("section", Zn, [
        l[47] || (l[47] = e("h2", { id: "learning-confirm-title" }, "确认这次操作", -1)),
        e("p", null, u(o.value.text), 1),
        e("div", En, [e("button", {
          ref_key: "confirmButton",
          ref: C,
          type: "button",
          onClick: l[29] || (l[29] = (r) => o.value = null)
        }, "先不改", 512), e("button", {
          type: "button",
          class: "learning-primary",
          onClick: l[30] || (l[30] = (r) => {
            s(g)(o.value.action, o.value.input), o.value = null;
          })
        }, "确认")])
      ])], 32)) : k("", !0)
    ]));
  }
}), Kn = Pn;
export {
  Kn as default
};
