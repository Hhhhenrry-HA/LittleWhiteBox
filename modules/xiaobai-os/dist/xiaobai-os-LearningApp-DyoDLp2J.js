/* eslint-disable */
import { $ as r, C as _t, E as re, F as t, G as te, H, I as ea, J as he, L as D, M as xe, O as Ce, Q as ge, V as ta, W as aa, X as na, Y as G, Z as ia, _ as i, a as Ue, b as W, c as ye, et as le, g as m, h as Y, i as la, l as ie, m as a, nt as s, o as oe, p as L, tt as St, u as E, w as gt, x as Q, y as F, z as sa } from "./xiaobai-os-runtime-dom.esm-bundler-DgjJUtuO.js";
import { n as Ve, r as At } from "./xiaobai-os-app-navigation-DS43A6sJ.js";
import { n as ra, t as oa } from "./xiaobai-os-frame-bridge-BfVuKvnh.js";
import { t as et } from "./xiaobai-os-MessageMarkdown-bs_FqyUr.js";
var Qe = /* @__PURE__ */ new WeakMap(), mt = [
  "select",
  "input",
  "keyup",
  "pointerup",
  "scroll"
], We = {
  mounted(e, c) {
    const l = c.value, n = l.cursor, o = () => {
      l.cursor = {
        start: e.selectionStart,
        end: e.selectionEnd,
        direction: e.selectionDirection,
        top: e.scrollTop,
        left: e.scrollLeft
      };
    };
    Qe.set(e, o);
    for (const v of mt) e.addEventListener(v, o, { passive: !0 });
    re(() => {
      !e.isConnected || !n || (e.setSelectionRange(n.start, n.end, n.direction), e.scrollTop = n.top, e.scrollLeft = n.left);
    });
  },
  beforeUnmount(e) {
    const c = Qe.get(e);
    if (c) {
      c();
      for (const l of mt) e.removeEventListener(l, c);
      Qe.delete(e);
    }
  }
}, ua = ["disabled"], da = {
  key: 0,
  class: "learning-choices"
}, va = [
  "type",
  "checked",
  "onChange"
], ca = { class: "learning-option-letter" }, ga = {
  key: 1,
  class: "learning-order"
}, ma = [
  "disabled",
  "aria-label",
  "onClick"
], pa = [
  "disabled",
  "aria-label",
  "onClick"
], ba = {
  key: 2,
  class: "learning-fields"
}, fa = ["onUpdate:modelValue"], ya = ["value"], ka = {
  key: 3,
  class: "learning-choices"
}, ha = ["checked", "onChange"], $a = {
  key: 0,
  class: "learning-muted"
}, wa = {
  key: 4,
  class: "learning-fields"
}, xa = ["onUpdate:modelValue"], Ca = {
  key: 5,
  class: "learning-writing"
}, Ia = ["disabled"], La = /* @__PURE__ */ Q({
  __name: "AnswerInput",
  props: /* @__PURE__ */ gt({
    response: {},
    paragraphs: {},
    disabled: { type: Boolean }
  }, {
    modelValue: { required: !0 },
    modelModifiers: {}
  }),
  emits: /* @__PURE__ */ gt(["submit"], ["update:modelValue"]),
  setup(e, { emit: c }) {
    const l = e, n = c, o = ta(e, "modelValue");
    function v(f) {
      l.response.kind === "choice" && !l.response.multiple ? o.value.picked = [f] : o.value.picked = o.value.picked.includes(f) ? o.value.picked.filter((k) => k !== f) : [...o.value.picked, f];
    }
    function d(f, k) {
      const $ = [...o.value.order];
      [$[f], $[f + k]] = [$[f + k], $[f]], o.value.order = $;
    }
    const b = L(() => {
      const f = l.response;
      return f.kind === "text" ? !!o.value.text.trim() : f.kind === "gaps" ? f.slots.every((k) => o.value.values[k.id]?.trim()) : f.kind === "match" ? f.left.every((k) => o.value.values[k.id]) : f.kind === "order" ? !0 : o.value.picked.length > 0;
    });
    function C() {
      const f = l.response;
      !b.value || l.disabled || (f.kind === "text" ? n("submit", {
        kind: "text",
        text: o.value.text
      }) : f.kind === "gaps" ? n("submit", {
        kind: "gaps",
        values: f.slots.map((k) => ({
          id: k.id,
          text: o.value.values[k.id]
        }))
      }) : f.kind === "match" ? n("submit", {
        kind: "match",
        pairs: f.left.map((k) => ({
          left: k.id,
          right: o.value.values[k.id]
        }))
      }) : n("submit", {
        kind: f.kind,
        ids: [...f.kind === "order" ? o.value.order : o.value.picked]
      }));
    }
    return (f, k) => (t(), i("form", {
      class: "learning-answer",
      onSubmit: ie(C, ["prevent"])
    }, [a("fieldset", { disabled: e.disabled }, [
      k[3] || (k[3] = a("legend", { class: "learning-sr-only" }, "你的回答", -1)),
      e.response.kind === "choice" ? (t(), i("div", da, [(t(!0), i(E, null, D(e.response.options, ($, h) => (t(), i("label", {
        key: $.id,
        class: le({ selected: o.value.picked.includes($.id) })
      }, [
        a("input", {
          type: e.response.multiple ? "checkbox" : "radio",
          name: "answer-choice",
          checked: o.value.picked.includes($.id),
          onChange: (y) => v($.id)
        }, null, 40, va),
        a("span", ca, s(String.fromCharCode(65 + h)), 1),
        a("span", null, s($.text), 1)
      ], 2))), 128))])) : e.response.kind === "order" ? (t(), i("ol", ga, [(t(!0), i(E, null, D(o.value.order, ($, h) => (t(), i("li", { key: $ }, [
        a("span", null, s(e.response.options.find((y) => y.id === $)?.text), 1),
        a("button", {
          type: "button",
          disabled: h === 0,
          "aria-label": `上移第 ${h + 1} 项`,
          onClick: (y) => d(h, -1)
        }, "↑", 8, ma),
        a("button", {
          type: "button",
          disabled: h === o.value.order.length - 1,
          "aria-label": `下移第 ${h + 1} 项`,
          onClick: (y) => d(h, 1)
        }, "↓", 8, pa)
      ]))), 128))])) : e.response.kind === "match" ? (t(), i("div", ba, [(t(!0), i(E, null, D(e.response.left, ($) => (t(), i("label", { key: $.id }, [F(s($.text) + " ", 1), te(a("select", { "onUpdate:modelValue": (h) => o.value.values[$.id] = h }, [k[1] || (k[1] = a("option", { value: "" }, "选择对应项", -1)), (t(!0), i(E, null, D(e.response.right, (h) => (t(), i("option", {
        key: h.id,
        value: h.id
      }, s(h.text), 9, ya))), 128))], 8, fa), [[Ue, o.value.values[$.id]]])]))), 128))])) : e.response.kind === "evidence" ? (t(), i("div", ka, [(t(!0), i(E, null, D(e.paragraphs, ($) => (t(), i("label", {
        key: $.id,
        class: le({ selected: o.value.picked.includes($.id) })
      }, [a("input", {
        type: "checkbox",
        checked: o.value.picked.includes($.id),
        onChange: (h) => v($.id)
      }, null, 40, ha), a("span", null, s($.text), 1)], 2))), 128)), e.paragraphs.length ? m("", !0) : (t(), i("p", $a, "请先展开相关文稿，再选择原文依据。"))])) : e.response.kind === "gaps" ? (t(), i("div", wa, [(t(!0), i(E, null, D(e.response.slots, ($) => (t(), i("label", { key: $.id }, [F(s($.text), 1), te(a("input", {
        "onUpdate:modelValue": (h) => o.value.values[$.id] = h,
        type: "text",
        maxlength: "4000",
        autocomplete: "off"
      }, null, 8, xa), [[oe, o.value.values[$.id]]])]))), 128))])) : (t(), i("label", Ca, [k[2] || (k[2] = a("span", { class: "learning-sr-only" }, "你的回答", -1)), te(a("textarea", {
        "onUpdate:modelValue": k[0] || (k[0] = ($) => o.value.text = $),
        rows: "6",
        maxlength: "4000",
        placeholder: "写下你的回答…"
      }, null, 512), [[oe, o.value.text], [r(We), o.value]])])),
      a("button", {
        class: "learning-primary",
        type: "submit",
        disabled: !b.value
      }, "交给语伴 →", 8, Ia)
    ], 8, ua)], 32));
  }
}), Rt = La, Mt = 2e3, Sa = ["stroke-width"], Aa = ["d"], Ra = /* @__PURE__ */ Q({
  __name: "LearningIcon",
  props: { name: {} },
  setup(e) {
    const c = {
      home: "m3 10 9-7 9 7v10a1 1 0 0 1-1 1h-5v-7H9v7H4a1 1 0 0 1-1-1Z",
      book: "M12 5v16M3 4c4-1 6 0 9 1 3-1 5-2 9-1v15c-4-1-6 0-9 2-3-2-5-3-9-2Z",
      workbook: "M6 3h12a1 1 0 0 1 1 1v16a1 1 0 0 1-1 1H6a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2ZM8 3v18M11 8h5M11 12h5",
      records: "M7 3h10a2 2 0 0 1 2 2v16H5V5a2 2 0 0 1 2-2ZM9 8h6M9 12h6M9 16h3",
      reward: "m12 3 3 6 6 1-4 5 1 6-6-3-6 3 1-6-4-5 6-1Z",
      arrow: "M4 12h16m-6-6 6 6-6 6",
      send: "M12 20V4m-6 6 6-6 6 6",
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
    return (l, n) => (t(), i("svg", {
      class: "learning-icon",
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      "stroke-width": e.name === "more" ? 3.5 : 1.7,
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      "aria-hidden": "true"
    }, [a("path", { d: c[e.name] }, null, 8, Aa)], 8, Sa));
  }
}), z = Ra, Ee = Object.freeze({
  select: "引用这段",
  ask: "问语伴",
  listen: "朗读",
  dismiss: "取消引用"
});
function Ma(e, c, l) {
  if (!l?.rangeCount || l.isCollapsed) return null;
  const n = l.getRangeAt(0), o = n.startContainer, v = (o instanceof Element ? o : o.parentElement)?.closest("[data-learning-text]");
  if (!v || !e.contains(v) || !v.contains(n.endContainer)) return null;
  const d = c.find(($) => $.id === v.dataset.materialId), b = d?.paragraphs.find(($) => $.id === v.dataset.paragraphId);
  if (!d || !b) return null;
  const C = n.cloneRange();
  C.selectNodeContents(v), C.setEnd(n.startContainer, n.startOffset);
  const f = C.toString().length, k = n.toString();
  return !k.trim() || [...k].length > 2e3 || b.text.slice(f, f + k.length) !== k ? null : {
    materialId: d.id,
    paragraphId: b.id,
    start: f,
    end: f + k.length,
    quote: k
  };
}
function Et(e, c, l) {
  const n = () => {
    if (!e.value) return;
    const o = Ma(e.value, c(), window.getSelection());
    o && l(o);
  };
  xe(() => document.addEventListener("selectionchange", n)), Ce(() => document.removeEventListener("selectionchange", n));
}
var Ea = { class: "learning-source" }, Ta = { key: 0 }, Na = ["href"], Ba = {
  key: 0,
  class: "learning-listening-cover"
}, Oa = ["disabled"], qa = {
  key: 1,
  class: "learning-material-body"
}, Pa = ["data-material-id", "data-paragraph-id"], Ua = ["disabled", "onClick"], Va = {
  class: "learning-audio-parts",
  "aria-label": "材料朗读分段"
}, ja = ["disabled", "onClick"], Da = { key: 2 }, Wa = /* @__PURE__ */ Q({
  __name: "MaterialReader",
  props: {
    material: {},
    disabled: { type: Boolean },
    exerciseId: {}
  },
  emits: ["action", "select"],
  setup(e, { emit: c }) {
    const l = e, n = c, o = G(null);
    Et(o, () => [l.material], (d) => n("select", d));
    function v(d) {
      n("select", {
        materialId: l.material.id,
        paragraphId: d.id,
        start: 0,
        end: d.text.length,
        quote: d.text
      });
    }
    return (d, b) => (t(), i("article", {
      ref_key: "root",
      ref: o,
      class: "learning-material"
    }, [
      a("h2", null, s(e.material.title), 1),
      a("div", Ea, [e.material.provenance.kind === "authored" ? (t(), i("span", Ta, "语伴自编练习")) : (t(), i("a", {
        key: 1,
        href: e.material.provenance.url,
        target: "_blank",
        rel: "noopener noreferrer"
      }, s(e.material.provenance.kind === "original" ? "原文节选" : "改编自") + " · " + s(e.material.provenance.title) + " ↗", 9, Na))]),
      e.material.hidden ? (t(), i("div", Ba, [b[1] || (b[1] = a("svg", {
        viewBox: "0 0 140 60",
        "aria-hidden": "true"
      }, [a("path", {
        d: "M8 27v6m10-14v22m10-31v40m10-26v12m10-35v58m10-47v36m10-27v18m10-37v56m10-36v16m10-29v42m10-31v20m10-16v12m10-8v4",
        stroke: "currentColor",
        "stroke-width": "3",
        "stroke-linecap": "round",
        fill: "none"
      })], -1)), a("button", {
        type: "button",
        disabled: e.disabled,
        onClick: b[0] || (b[0] = (C) => n("action", "reveal", {
          kind: "transcripts",
          id: e.material.id
        }))
      }, "看文稿", 8, Oa)])) : (t(), i("div", qa, [(t(!0), i(E, null, D(e.material.paragraphs, (C) => (t(), i("div", {
        key: C.id,
        class: "learning-paragraph"
      }, [a("p", {
        tabindex: "0",
        "data-learning-text": "",
        "data-material-id": e.material.id,
        "data-paragraph-id": C.id
      }, s(C.text), 9, Pa), a("button", {
        type: "button",
        disabled: [...C.text].length > r(Mt),
        onClick: (f) => v(C)
      }, s(r(Ee).select), 9, Ua)]))), 128))])),
      a("div", Va, [(t(!0), i(E, null, D(e.material.parts, (C) => (t(), i("button", {
        key: C.key,
        type: "button",
        disabled: e.disabled,
        onClick: (f) => n("action", "play", {
          materialId: e.material.id,
          partKey: C.key,
          exerciseId: e.exerciseId
        })
      }, [W(z, { name: "play" }), F(s(e.material.parts.length > 1 ? `听第 ${C.number} 段` : "播放朗读"), 1)], 8, ja))), 128))]),
      e.material.parts.length ? (t(), i("small", Da, "TTS 合成朗读")) : m("", !0)
    ], 512));
  }
}), pt = Wa;
function tt(e, c, l = []) {
  const n = (o) => c.kind === "choice" || c.kind === "order" ? c.options.find((v) => v.id === o)?.text ?? o : l.find((v) => v.id === o)?.text ?? o;
  return e.kind === "text" ? e.text : e.kind === "gaps" ? e.values.map((o) => `${c.kind === "gaps" ? c.slots.find((v) => v.id === o.id)?.text ?? "" : ""} ${o.text}`).join(`
`) : e.kind === "match" ? e.pairs.map((o) => c.kind === "match" ? `${c.left.find((v) => v.id === o.left)?.text} → ${c.right.find((v) => v.id === o.right)?.text}` : "").join(`
`) : e.ids.map(n).join(e.kind === "order" ? " → " : `
`);
}
var Fa = { class: "learning-feedback" }, Ga = { class: "learning-muted" }, Ha = { key: 0 }, za = { key: 1 }, Ya = { key: 0 }, Ka = { key: 1 }, Za = { key: 2 }, Ja = {
  key: 3,
  class: "learning-muted"
}, Qa = ["disabled"], Xa = ["disabled"], _a = /* @__PURE__ */ Q({
  __name: "AttemptFeedback",
  props: {
    attempt: {},
    feedback: {},
    response: {},
    paragraphs: {},
    disabled: { type: Boolean },
    revised: { type: Boolean }
  },
  emits: ["action"],
  setup(e) {
    const c = {
      correct: "答对了",
      partial: "已经掌握一部分",
      incorrect: "一起把这里弄懂",
      disputed: "这处还需复核"
    };
    return (l, n) => (t(), i("section", Fa, [
      n[6] || (n[6] = a("p", { class: "learning-eyebrow" }, "已保存的原答", -1)),
      a("blockquote", null, s(r(tt)(e.attempt.answer, e.response, e.paragraphs)), 1),
      a("small", Ga, [
        F(s(e.attempt.help.feedback ? "得到反馈后的再练" : e.attempt.help.answer || e.attempt.help.hint || e.attempt.help.transcript ? "这次有辅助" : "未使用答案或提示"), 1),
        e.attempt.help.replays ? (t(), i("span", Ha, " · 重听 " + s(e.attempt.help.replays) + " 次", 1)) : m("", !0),
        e.attempt.help.slowPlayback ? (t(), i("span", za, " · 慢放")) : m("", !0)
      ]),
      e.feedback ? (t(), i(E, { key: 0 }, [
        a("h3", null, s(c[e.feedback.verdict]), 1),
        e.feedback.understanding ? (t(), i("p", Ya, [n[2] || (n[2] = a("b", null, "理解", -1)), F(s(e.feedback.understanding), 1)])) : m("", !0),
        e.feedback.expression ? (t(), i("p", Ka, [n[3] || (n[3] = a("b", null, "表达", -1)), F(s(e.feedback.expression), 1)])) : m("", !0),
        e.feedback.guidance ? (t(), i("p", Za, [n[4] || (n[4] = a("b", null, "批注", -1)), F(s(e.feedback.guidance), 1)])) : m("", !0),
        e.revised ? (t(), i("small", Ja, "这篇已有修改稿，结果以修改稿的批改为准。")) : (t(), i("button", {
          key: 4,
          type: "button",
          disabled: e.disabled,
          onClick: n[0] || (n[0] = (o) => l.$emit("action", "assess", {
            attemptId: e.attempt.id,
            review: !0,
            message: "请重新审视我的原答与题目。也请考虑其他有效表达，不只对照原来的答案键。"
          }))
        }, s(e.feedback.verdict === "disputed" ? "请语伴复核" : "有疑问，请复核"), 9, Qa))
      ], 64)) : (t(), i(E, { key: 1 }, [n[5] || (n[5] = a("p", null, "原答已保存，等待语伴评估。", -1)), a("button", {
        type: "button",
        disabled: e.disabled,
        onClick: n[1] || (n[1] = (o) => l.$emit("action", "assess", {
          attemptId: e.attempt.id,
          review: !1,
          message: "请评估这条已经保存的原答。"
        }))
      }, "重试评估", 8, Xa)], 64))
    ]));
  }
}), Tt = _a, Nt = {
  busy: "上一件事还没做完，等它完成后再试一次吧。这次没有开始。",
  notSent: "这次没有发出去，输入的内容还在。请再试一次。",
  rejected: "这次操作未能完成，请查看最新状态后再继续。",
  unknown: "还没收到确认，操作可能仍在继续。请先查看最新状态，不要重复发送。",
  refresh: "查看最新状态"
}, $e = {
  unconfirmed: "还没确认语伴设置是否保存成功。先核实一下，不必重新选择。",
  conflict: "语伴设置有另一份已保存的版本，请先核对。",
  failed: "语伴设置暂时无法读取，请重试。",
  verify: "核实语伴设置",
  adopt: "使用已保存设置",
  adoptWarning: "放弃这次尚未确认的更换，使用已保存的语伴设置。学习记录会保留。"
}, Z = {
  title: "学习动态",
  stop: "停止本次操作",
  round: (e) => `第 ${e} 轮`,
  history: (e) => `${e} 个步骤`,
  received: (e) => `已收到 ${e} 字，正在整理`,
  preparing: "准备中",
  running: "进行中",
  done: "完成",
  failed: "未完成",
  cancelled: "已停止",
  thinking: "正在思考…",
  issues: (e) => `${e} 项内容未通过检查`,
  checkFields: (e) => `需要调整：${e}`,
  results: (e) => `找到 ${e} 个来源`,
  paragraphs: (e) => `读到 ${e} 段正文`,
  entries: (e) => `读到 ${e} 条记录`,
  sourcesFailed: (e) => `${e} 个来源未能读取`,
  proposedMaterials: (e) => `${e} 篇材料`,
  proposedExercises: (e) => `${e} 道练习`,
  outcomes: {
    finished: "本次已完成",
    failed: "本次未完成",
    cancelled: "本次已停止",
    unconfirmed: "等待确认保存",
    conflict: "需要核对保存结果"
  },
  tools: {
    LearningRead: "查看学习记录",
    LearningContextRead: "查看相关资料",
    LearningSearch: "寻找文章",
    LearningExtract: "阅读原文",
    LearningProfileEdit: "调整学习目标",
    LearningLessonEdit: "准备练习",
    LearningRequest: "安排练习",
    LearningModelEssay: "准备范文",
    LearningArticle: "整理阅读正文",
    LearningReadingNotes: "整理本段知识",
    LearningEssayTask: "准备写作题",
    LearningAssess: "批改作答",
    LearningHelp: "确认讲解范围",
    LearningPresent: "打开练习",
    LearningComplete: "整理学习收获"
  },
  sections: {
    overview: "学习概况",
    training: "本次阅读材料",
    unit: "本次练习",
    materials: "阅读材料",
    exercises: "练习题",
    attempts: "你的作答",
    notes: "笔记",
    listening: "听力记录",
    items: "知识点",
    review: "到期复习",
    evidence: "学习记录",
    completions: "已完成练习",
    sources: "文章来源"
  }
}, en = {
  language: "学习语言",
  explanationLanguage: "讲解语言",
  goal: "学习目标",
  title: "标题",
  kind: "练习形式",
  tier: "练习规模",
  materials: "阅读材料",
  materialKeys: "材料关联",
  exercises: "练习题",
  paragraphId: "段落关联",
  explanations: "段落讲解",
  response: "作答形式",
  options: "选项",
  rule: "评改规则",
  answer: "参考答案",
  attemptId: "作答关联",
  unitId: "练习关联",
  verdict: "评改结论",
  annotations: "批注",
  exerciseIds: "题目关联",
  materialIds: "材料关联",
  instruction: "操作依据",
  action: "本次操作"
}, Bt = {
  unassessed: "还没练过",
  review: "待确认",
  independent: "已能独立使用",
  practised: "练过一次",
  strengthen: "再练练"
}, Ot = (e) => `${e} 次作答`, qt = (e) => `${e} 个知识点可以温习了`, _e = {
  settings: "声音设置",
  enable: "开启语音"
}, J = {
  navigation: "本篇学习",
  reading: "阅读与写作",
  feedback: "批改与修改",
  model: "范文",
  grading: "正在看你的作品…",
  reviewing: "正在复核修改稿…",
  modelling: "正在写范文…",
  gradeReady: "这一篇写好了",
  grade: "提交批改",
  continue: "继续",
  stop: "停止",
  viewModel: "查看范文",
  review: "开始复习",
  resumeReview: "继续复习",
  original: "原稿与批注",
  revision: "修改稿",
  resolved: "这处已改对",
  setupTitle: "这次想学到哪里",
  setupSteps: 3,
  setupContinue: "继续",
  setupFinish: "确认目标",
  optionalSettings: "讲解语言与兴趣",
  saveSettings: "保存设置"
}, bt = {
  title: "还有内容没提交",
  accept: "放弃并切换"
}, ft = {
  language: bt,
  teacher: bt,
  "replace-lesson": {
    title: "换一篇练习？",
    accept: "换一篇"
  },
  abandon: {
    title: "放下这次练习？",
    accept: "放下练习"
  },
  "abandon-review": {
    title: "放下这组复习？",
    accept: "放下复习"
  },
  "skip-revision": {
    title: "跳过修改？",
    accept: "查看范文"
  },
  "adopt-server": {
    title: "使用已保存的学习记录？",
    accept: "使用已保存记录"
  },
  "adopt-wallet": {
    title: "使用已保存的钱包？",
    accept: "使用已保存钱包"
  },
  "adopt-teacher": {
    title: "使用已保存的语伴设置？",
    accept: "使用已保存设置"
  },
  "forget-conversation": {
    title: "清空这段对话？",
    accept: "清空对话"
  },
  "delete-language": {
    title: "删除这门语言的学习数据？",
    accept: "删除学习数据"
  },
  clear: {
    title: "清空所有学习数据？",
    accept: "清空学习数据"
  },
  "delete-item": {
    title: "删除这条学习记录？",
    accept: "删除记录"
  },
  "delete-attempt": {
    title: "删除这次作答？",
    accept: "删除作答"
  }
}, me = {
  context: "切换后，尚未提交的输入会丢失。已提交的作答和学习记录会保留。",
  companion: "切换语伴会清空尚未发送的聊天内容，当前练习和作答会保留。",
  keepEditing: "继续编辑",
  lesson: "本次练习的材料、作答和笔记会删除；已收入学习本的记录和已获得的奖励会保留。",
  review: "这组已答的题会删除，复习时间安排不变。"
}, we = {
  answer: "你的作答",
  saved: "已保存，答完这组再一起看看。",
  ready: "这组答完了",
  grade: "批改这组",
  ask: "问语伴",
  verdicts: {
    correct: "答对了",
    partial: "对了一部分",
    incorrect: "还没想起来",
    disputed: "等待复核"
  }
}, tn = {
  key: 0,
  class: "learning-player",
  "aria-label": "课堂朗读"
}, an = {
  key: 0,
  role: "status"
}, nn = {
  key: 2,
  class: "learning-row"
}, ln = ["aria-label", "disabled"], sn = ["max", "value"], rn = /* @__PURE__ */ Q({
  __name: "LearningPlayer",
  props: { state: {} },
  emits: ["action"],
  setup(e, { emit: c }) {
    const l = c;
    function n(o) {
      return `${Math.floor(o / 60)}:${String(Math.floor(o % 60)).padStart(2, "0")}`;
    }
    return (o, v) => e.state.media.status !== "idle" ? (t(), i("section", tn, [
      e.state.media.message ? (t(), i("p", an, s(e.state.media.message), 1)) : m("", !0),
      e.state.voices.enabled ? m("", !0) : (t(), i("button", {
        key: 1,
        type: "button",
        onClick: v[0] || (v[0] = (d) => l("action", "tts-settings"))
      }, s(r(_e).enable), 1)),
      e.state.media.key ? (t(), i("div", nn, [
        W(z, { name: "sound" }),
        a("span", null, s(e.state.media.status === "loading" ? "正在生成声音…" : `${n(e.state.media.position)} / ${n(e.state.media.duration)}`), 1),
        e.state.media.status === "playing" ? (t(), i("button", {
          key: 0,
          type: "button",
          "aria-label": "暂停",
          onClick: v[1] || (v[1] = (d) => l("action", "pause"))
        }, [W(z, { name: "pause" })])) : [
          "paused",
          "ended",
          "blocked"
        ].includes(e.state.media.status) ? (t(), i("button", {
          key: 1,
          type: "button",
          "aria-label": e.state.media.status === "ended" ? "再听一遍" : "继续播放",
          disabled: e.state.busy,
          onClick: v[2] || (v[2] = (d) => l("action", "resume"))
        }, [W(z, { name: "play" })], 8, ln)) : m("", !0),
        a("button", {
          type: "button",
          "aria-label": "停止",
          onClick: v[3] || (v[3] = (d) => l("action", "stop"))
        }, [W(z, { name: "stop" })]),
        e.state.media.duration ? (t(), i("button", {
          key: 2,
          type: "button",
          onClick: v[4] || (v[4] = (d) => l("action", "rate", { value: e.state.media.rate === 1 ? 0.75 : 1 }))
        }, s(e.state.media.rate) + "×", 1)) : m("", !0)
      ])) : m("", !0),
      e.state.media.duration ? (t(), i("input", {
        key: 3,
        type: "range",
        min: "0",
        max: e.state.media.duration,
        step: "0.1",
        value: e.state.media.position,
        "aria-label": "当前声音片段播放位置",
        onChange: v[5] || (v[5] = (d) => l("action", "seek", { value: Number(d.target.value) }))
      }, null, 40, sn)) : m("", !0)
    ])) : m("", !0);
  }
}), Pt = rn, on = { class: "learning-selection" }, un = { class: "learning-row" }, dn = ["disabled"], vn = /* @__PURE__ */ Q({
  __name: "LearningSelectionActions",
  props: {
    selection: {},
    disabled: { type: Boolean }
  },
  emits: [
    "ask",
    "say",
    "dismiss"
  ],
  setup(e) {
    return (c, l) => (t(), i("div", on, [a("blockquote", null, s(e.selection.quote), 1), a("div", un, [
      a("button", {
        type: "button",
        onClick: l[0] || (l[0] = (n) => c.$emit("ask"))
      }, s(r(Ee).ask), 1),
      a("button", {
        type: "button",
        disabled: e.disabled || [...e.selection.quote].length > 1e3,
        onClick: l[1] || (l[1] = (n) => c.$emit("say"))
      }, s(r(Ee).listen), 9, dn),
      a("button", {
        type: "button",
        onClick: l[2] || (l[2] = (n) => c.$emit("dismiss"))
      }, s(r(Ee).dismiss), 1)
    ])]));
  }
}), Ut = vn;
function je(e) {
  return {
    picked: [],
    text: "",
    values: {},
    order: e.kind === "order" ? e.options.map((c) => c.id) : []
  };
}
function yt(e, c) {
  const l = je(c);
  return !!e.text.trim() || !!e.picked.length || Object.values(e.values).some((n) => !!n.trim()) || e.order.length !== l.order.length || e.order.some((n, o) => n !== l.order[o]);
}
function Vt(e) {
  const c = (l) => l.trim() || null;
  return {
    exam: c(e.exam),
    level: c(e.level),
    targetLevel: c(e.targetLevel),
    explanationLanguage: e.explanationLanguage,
    interests: c(e.interests)
  };
}
var kt = () => ({
  text: "",
  cursor: void 0,
  focus: null,
  study: null,
  sent: null,
  scroll: 0,
  following: !0
});
function cn() {
  const e = he({}), c = he(kt()), l = he({
    open: !1,
    form: {
      exam: "",
      level: "",
      targetLevel: "",
      explanationLanguage: "zh-CN",
      interests: ""
    },
    submitted: null
  }), n = he({ enabled: !1 }), o = he({
    step: 0,
    name: "",
    note: ""
  }), v = he({
    tab: "grammar",
    reason: ""
  });
  return {
    units: e,
    chat: c,
    settings: l,
    companion: n,
    setup: o,
    books: v,
    unit(d) {
      return e[d] ??= {
        reading: {
          view: null,
          scrolls: {}
        },
        writing: {},
        edits: {},
        expanded: {},
        selection: null,
        activities: {},
        activityDrafts: {},
        review: {
          index: null,
          drafts: {},
          openReason: "",
          expanded: !1,
          seenBefore: null
        }
      }, e[d];
    },
    reset(d = !1, b = !1) {
      if (!b) {
        for (const C of Object.keys(e)) delete e[C];
        l.open = !1, l.submitted = null;
      }
      Object.assign(c, kt()), n.enabled = !1, d || Object.assign(o, {
        step: 0,
        name: "",
        note: ""
      }), Object.assign(v, {
        tab: "grammar",
        reason: ""
      });
    },
    reconcile(d) {
      const b = l.submitted;
      b && d.storage === "ready" && !d.busy && d.profile && Object.entries(b.value).every(([f, k]) => d.profile.settings[f] === k) && (Object.entries(b.form).every(([f, k]) => l.form[f] === k) && (l.open = !1), l.submitted = null);
      for (const f of Object.keys(e)) {
        const k = [d.unit, d.review].find((h) => h?.id === f);
        if (!k) {
          delete e[f];
          continue;
        }
        for (const [h, y] of Object.entries(e[f].activityDrafts)) {
          const g = k.attempts.filter((u) => u.exerciseId === h).at(-1);
          if (y.submitted && g && g.id !== y.submitted.before) {
            delete e[f].activityDrafts[h];
            const u = e[f].activities[`exercise:${h}`];
            u && (u.retry = !1);
          }
        }
        const $ = e[f].selection;
        $ && k.materials.find((h) => h.id === $.materialId)?.paragraphs.find((h) => h.id === $.paragraphId)?.text.slice($.start, $.end) !== $.quote && (e[f].selection = null);
        for (const [h, y] of Object.entries(e[f].writing)) {
          const g = k.attempts.filter((w) => w.exerciseId === h && !w.revisesAttemptId).at(-1), u = y.submitted;
          !u || !g || g.id === u.before || (y.text === u.text && g.answer.kind === "text" && g.answer.text === u.text.trim() ? (y.text = "", y.rewriting = !1) : y.rewriting = !0, y.submitted = null);
        }
      }
      const C = c.sent;
      C && d.conversation.turns.some((f, k) => k + d.conversation.removedTurns >= C.after && (f.purpose === "talk" || f.purpose === "explain") && f.user === C.user) && (c.text === C.text && (c.text = "", c.focus = null), c.sent = null);
    }
  };
}
var jt = /* @__PURE__ */ Symbol("learning-ui-session");
function Dt(e, c) {
  if (e.chat.text.trim() || e.settings.open && Object.entries(Vt(e.settings.form)).some(([l, n]) => c.profile?.settings[l] !== n) || e.setup.step === 1 && e.setup.name.trim() && (e.setup.name.trim() !== c.teacher?.name || e.setup.note.trim() !== c.teacher.note)) return !0;
  for (const l of [c.unit, c.review]) {
    const n = l && e.units[l.id];
    if (!(!l || !n)) {
      if (Object.values(n.writing).some((o) => !!o.text.trim()) || l.stage.stage === "revising" && l.assessments.some((o) => o.annotations?.some((v) => n.edits[v.id] && n.edits[v.id].value !== v.quote))) return !0;
      for (const o of l.exercises) {
        const v = n.activityDrafts[o.id]?.value, d = n.review.drafts[o.id];
        if (v && yt(v, o.response) || d && !l.attempts.some((b) => b.exerciseId === o.id) && yt(d, o.response)) return !0;
      }
    }
  }
  return !1;
}
function gn(e, c, l, n) {
  return l === "teacher" ? n.teacher?.name !== c.teacher?.name && !!e.chat.text.trim() : l === "language" && n.language !== c.language && Dt(e, c);
}
function mn(e) {
  const c = cn();
  return ea(jt, c), H([
    () => e.value.chatIdentity,
    () => e.value.language,
    () => e.value.teacher?.name
  ], (l, n) => c.reset(l[0] === n[0], l[0] === n[0] && l[1] === n[1])), H(() => e.value, (l) => c.reconcile(l), { immediate: !0 }), H(() => [e.value.unit?.id, e.value.review?.id], (l) => {
    c.chat.focus?.unitId && !l.includes(c.chat.focus.unitId) && (c.chat.focus = null), c.chat.study && !l.includes(c.chat.study.unitId) && (c.chat.study = null);
  }), H(() => Dt(c, e.value), (l, n, o) => {
    if (!l) return;
    const v = (d) => {
      d.preventDefault(), d.returnValue = "";
    };
    window.addEventListener("beforeunload", v), o(() => window.removeEventListener("beforeunload", v));
  }, { immediate: !0 }), c;
}
function Ie() {
  const e = _t(jt);
  if (!e) throw new Error("Learning views require their application session");
  return e;
}
function Le(e) {
  const c = Ie();
  return L(() => c.unit(e()));
}
var pn = ["onKeydown"], bn = {
  role: "dialog",
  "aria-labelledby": "learning-activity-title",
  class: "learning-activity"
}, fn = { class: "learning-activity-header" }, yn = { id: "learning-activity-title" }, kn = {
  key: 0,
  "aria-label": "完成本课的固定奖励"
}, hn = {
  key: 0,
  class: "learning-margin-note",
  role: "status"
}, $n = ["open"], wn = {
  key: 3,
  class: "learning-question"
}, xn = { class: "learning-help-actions" }, Cn = ["disabled"], In = ["disabled"], Ln = ["disabled"], Sn = {
  key: 0,
  class: "learning-margin-note"
}, An = {
  key: 1,
  class: "learning-margin-note"
}, Rn = { key: 0 }, Mn = { key: 1 }, En = { key: 2 }, Tn = ["disabled"], Nn = /* @__PURE__ */ Q({
  __name: "LearningActivity",
  props: {
    state: {},
    target: {},
    disabled: { type: Boolean }
  },
  emits: [
    "action",
    "close",
    "ask"
  ],
  setup(e, { emit: c }) {
    const l = e, n = c, o = G(null), v = Le(() => l.target.unitId), d = L(() => `${l.target.kind}:${l.target.id}`);
    H([v, d], () => {
      v.value.activities[d.value] ??= {
        scroll: 0,
        selected: null,
        retry: !1,
        materialsOpen: !1
      };
    }, { immediate: !0 });
    const b = L(() => v.value.activities[d.value]), C = G(null), f = L({
      get: () => b.value.retry,
      set: (M) => {
        b.value.retry = M;
      }
    }), k = L({
      get: () => b.value.selected,
      set: (M) => {
        b.value.selected = M;
      }
    }), $ = G(null);
    function h() {
      k.value ? k.value = null : f.value ? f.value = !1 : n("close");
    }
    At($, h);
    const y = L(() => v.value.activityDrafts);
    let g = null;
    const u = L(() => l.target?.kind === "exercise" ? l.state.unit?.exercises.find((M) => M.id === l.target?.id) : void 0), w = L(() => l.state.unit?.materials.filter((M) => l.target?.kind === "material" ? M.id === l.target.id : u.value?.materialIds.includes(M.id)) ?? []), P = L(() => u.value?.id ?? l.state.unit?.exercises.find((M) => M.skill === "listening" && M.materialIds.includes(l.target?.id ?? ""))?.id ?? l.state.unit?.exercises.find((M) => M.materialIds.includes(l.target?.id ?? ""))?.id), T = L(() => w.value.filter((M) => u.value?.response.kind !== "evidence" || M.id === u.value.response.materialId).flatMap((M) => M.paragraphs)), A = L(() => l.state.unit?.attempts.filter((M) => M.exerciseId === u.value?.id).at(-1)), V = L(() => l.state.unit?.assessments.find((M) => M.attemptId === A.value?.id));
    H(() => u.value, (M) => {
      if (!M) return;
      const I = JSON.stringify(M.response);
      y.value[M.id]?.response !== I && (y.value[M.id] = {
        response: I,
        value: je(M.response)
      });
    }, { immediate: !0 });
    const K = L({
      get: () => y.value[u.value.id].value,
      set: (M) => {
        y.value[u.value.id].value = M;
      }
    });
    xe(() => {
      C.value?.focus({ preventScroll: !0 }), o.value && (o.value.scrollTop = b.value.scroll);
    }), Ce(() => {
      o.value && (b.value.scroll = o.value.scrollTop);
    }), H(() => l.state.unit?.attempts, (M) => {
      if (!g) return;
      const I = M?.filter((j) => j.exerciseId === g.id).at(-1);
      if (I && I.id !== g.before) {
        const j = l.target?.kind === "exercise" && l.target.id === g.id;
        delete y.value[g.id], g = null, j && n("close");
      }
    });
    function q(M) {
      g = {
        id: u.value.id,
        before: A.value?.id
      }, y.value[u.value.id].submitted = { before: A.value?.id }, n("action", "submit", {
        unitId: l.state.unit.id,
        exerciseId: u.value.id,
        answer: M
      });
    }
    return (M, I) => (t(), i("div", {
      ref_key: "layer",
      ref: $,
      class: "learning-activity-shade",
      onKeydown: ye(ie(h, ["stop", "prevent"]), ["esc"])
    }, [a("section", bn, [
      a("header", fn, [
        a("h2", yn, s(u.value ? "练习" : w.value[0]?.title ?? "材料"), 1),
        e.state.unit ? (t(), i("small", kn, "+" + s(e.state.unit.reward.amount) + " 币", 1)) : m("", !0),
        a("button", {
          ref_key: "closeButton",
          ref: C,
          type: "button",
          "aria-label": "收起课件",
          onClick: I[0] || (I[0] = (j) => n("close"))
        }, [I[18] || (I[18] = F("收起", -1)), W(z, { name: "back" })], 512)
      ]),
      e.state.message && !e.state.busy ? (t(), i("p", hn, s(e.state.message), 1)) : m("", !0),
      a("div", {
        ref_key: "body",
        ref: o,
        class: "learning-activity-body"
      }, [
        u.value && w.value.length ? (t(), i("details", {
          key: 0,
          class: "learning-activity-materials",
          open: b.value.materialsOpen,
          onToggle: I[3] || (I[3] = (j) => b.value.materialsOpen = j.target.open)
        }, [a("summary", null, "阅读材料 · " + s(w.value.length), 1), (t(!0), i(E, null, D(w.value, (j) => (t(), Y(pt, {
          key: j.id,
          material: j,
          "exercise-id": P.value,
          disabled: e.disabled,
          onAction: I[1] || (I[1] = (O, N) => n("action", O, N)),
          onSelect: I[2] || (I[2] = (O) => k.value = O)
        }, null, 8, [
          "material",
          "exercise-id",
          "disabled"
        ]))), 128))], 40, $n)) : u.value ? m("", !0) : (t(!0), i(E, { key: 1 }, D(w.value, (j) => (t(), Y(pt, {
          key: j.id,
          material: j,
          "exercise-id": P.value,
          disabled: e.disabled,
          onAction: I[4] || (I[4] = (O, N) => n("action", O, N)),
          onSelect: I[5] || (I[5] = (O) => k.value = O)
        }, null, 8, [
          "material",
          "exercise-id",
          "disabled"
        ]))), 128)),
        k.value ? (t(), Y(Ut, {
          key: 2,
          selection: k.value,
          disabled: e.disabled,
          onAsk: I[6] || (I[6] = (j) => n("ask", P.value, k.value)),
          onSay: I[7] || (I[7] = (j) => n("action", "say", { selection: k.value })),
          onDismiss: I[8] || (I[8] = (j) => k.value = null)
        }, null, 8, ["selection", "disabled"])) : m("", !0),
        u.value ? (t(), i("section", wn, [
          a("h2", null, s(u.value.prompt), 1),
          a("div", xn, [
            a("button", {
              type: "button",
              disabled: e.disabled || [...u.value.prompt].length > 1e3,
              onClick: I[9] || (I[9] = (j) => n("action", "say-question", { exerciseId: u.value.id }))
            }, "听题干", 8, Cn),
            u.value.hasHint ? (t(), i("button", {
              key: 0,
              type: "button",
              disabled: e.disabled || u.value.hint !== null,
              onClick: I[10] || (I[10] = (j) => n("action", "reveal", {
                kind: "hints",
                id: u.value.id
              }))
            }, "提示", 8, In)) : m("", !0),
            a("button", {
              type: "button",
              disabled: e.disabled || u.value.solution !== null,
              onClick: I[11] || (I[11] = (j) => n("action", "reveal", {
                kind: "answers",
                id: u.value.id
              }))
            }, "解答", 8, Ln),
            a("button", {
              type: "button",
              onClick: I[12] || (I[12] = (j) => n("ask", u.value.id))
            }, "问语伴")
          ]),
          u.value.hint ? (t(), i("p", Sn, s(u.value.hint), 1)) : m("", !0),
          u.value.solution ? (t(), i("div", An, [u.value.solution.kind === "exact" ? (t(), i("p", Rn, s(r(tt)(u.value.solution.answer, u.value.response, T.value)), 1)) : u.value.solution.kind === "gaps" ? (t(), i("p", Mn, s(u.value.solution.accepted.map((j) => j.forms.join(" / ")).join(`
`)), 1)) : m("", !0), u.value.solution.kind !== "semantic" ? (t(), i("p", En, s(u.value.solution.explanation), 1)) : (t(), i("button", {
            key: 3,
            type: "button",
            onClick: I[13] || (I[13] = (j) => n("ask", u.value.id))
          }, "请语伴讲解"))])) : m("", !0),
          (!A.value || f.value) && y.value[u.value.id] ? (t(), Y(Rt, {
            key: u.value.id,
            modelValue: K.value,
            "onUpdate:modelValue": I[14] || (I[14] = (j) => K.value = j),
            response: u.value.response,
            paragraphs: T.value,
            disabled: e.disabled,
            onSubmit: q
          }, null, 8, [
            "modelValue",
            "response",
            "paragraphs",
            "disabled"
          ])) : m("", !0),
          A.value ? (t(), Y(Tt, {
            key: 3,
            attempt: A.value,
            feedback: V.value,
            response: u.value.response,
            paragraphs: T.value,
            disabled: e.disabled,
            revised: !!e.state.unit?.attempts.some((j) => j.revisesAttemptId === A.value?.id),
            onAction: I[15] || (I[15] = (j, O) => {
              n("action", j, O), n("close");
            })
          }, null, 8, [
            "attempt",
            "feedback",
            "response",
            "paragraphs",
            "disabled",
            "revised"
          ])) : m("", !0),
          A.value ? (t(), i("button", {
            key: 4,
            type: "button",
            disabled: e.disabled,
            onClick: I[16] || (I[16] = (j) => {
              f.value = !f.value, y.value[u.value.id] ??= {
                response: JSON.stringify(u.value.response),
                value: r(je)(u.value.response)
              };
            })
          }, s(f.value ? "收起再练" : "再试一次"), 9, Tn)) : m("", !0)
        ])) : m("", !0)
      ], 512),
      W(Pt, {
        state: e.state,
        onAction: I[17] || (I[17] = (j, O) => n("action", j, O))
      }, null, 8, ["state"])
    ])], 40, pn));
  }
}), Bn = Nn, On = 864e5;
function ht(e, c) {
  return /^(zh|ja|ko)\b/iu.test(c) ? {
    count: [...e.replace(/[\s\p{P}\p{S}]/gu, "")].length,
    unit: "字"
  } : {
    count: e.match(/[\p{L}\p{N}][\p{L}\p{N}\p{M}'’-]*/gu)?.length ?? 0,
    unit: "词"
  };
}
function Wt(e, c) {
  const l = [], n = /* @__PURE__ */ new Map();
  for (const o of c)
    if (o.quote)
      for (let v = e.indexOf(o.quote); v >= 0; v = e.indexOf(o.quote, v + 1)) {
        const d = v + o.quote.length;
        if (!l.some(([b, C]) => v < C && b < d)) {
          l.push([v, d]), n.set(o.id, v);
          break;
        }
      }
  return n;
}
function qn(e, c) {
  const l = e.split(/(\r?\n)/u), n = [];
  l.forEach((f, k) => {
    k % 2 === 0 && f.trim() && n.push(k);
  });
  const o = [], v = [], d = /* @__PURE__ */ new Map();
  for (const f of c) d.set(f.paragraphIndex, [...d.get(f.paragraphIndex) ?? [], f]);
  for (const [f, k] of d) {
    const $ = n[f];
    if ($ === void 0) {
      o.push(...k.map((u) => u.id));
      continue;
    }
    const h = Wt(l[$], k), y = k.filter((u) => h.has(u.id)).sort((u, w) => h.get(w.id) - h.get(u.id));
    let g = l[$];
    for (const u of y) {
      const w = h.get(u.id);
      g = g.slice(0, w) + u.replacement + g.slice(w + u.quote.length), u.replacement !== u.quote && v.push(u.id);
    }
    l[$] = g, o.push(...k.filter((u) => !h.has(u.id)).map((u) => u.id));
  }
  const b = new Map(c.map((f, k) => [f.id, k])), C = (f, k) => b.get(f) - b.get(k);
  return {
    text: l.join(""),
    missing: o.sort(C),
    applied: v.sort(C)
  };
}
function Pn(e, c) {
  const l = Wt(e, c), n = c.filter((d) => l.has(d.id)).map((d) => ({
    id: d.id,
    start: l.get(d.id),
    length: d.quote.length
  })).sort((d, b) => d.start - b.start), o = [];
  let v = 0;
  for (const d of n)
    d.start > v && o.push({ text: e.slice(v, d.start) }), o.push({
      text: e.slice(d.start, d.start + d.length),
      id: d.id
    }), v = d.start + d.length;
  return (v < e.length || !o.length) && o.push({ text: e.slice(v) }), o;
}
function Un(e, c = "xiaobai-learning-seen-units") {
  const l = /* @__PURE__ */ new Set(), n = () => {
    try {
      const o = JSON.parse(e()?.getItem(c) ?? "[]");
      return Array.isArray(o) ? o.filter((v) => typeof v == "string") : [];
    } catch {
      return [];
    }
  };
  return {
    has: (o) => l.has(o) || n().includes(o),
    mark(o) {
      l.add(o);
      try {
        e()?.setItem(c, JSON.stringify([.../* @__PURE__ */ new Set([...n(), o])].slice(-50)));
      } catch {
      }
    }
  };
}
var Vn = () => {
  try {
    return globalThis.localStorage;
  } catch {
    return null;
  }
}, $t = Un(Vn);
function at(e, c = Date.now()) {
  const l = new Date(e), n = new Date(c), o = Math.round((Date.UTC(l.getFullYear(), l.getMonth(), l.getDate()) - Date.UTC(n.getFullYear(), n.getMonth(), n.getDate())) / On);
  return !Number.isFinite(o) || o <= 0 ? "今天复习" : o === 1 ? "明天再见" : `${o} 天后再见`;
}
var jn = { class: "learning-records-page" }, Dn = {
  key: 0,
  class: "learning-page-heading"
}, Wn = {
  key: 0,
  class: "learning-muted"
}, Fn = { class: "learning-muted" }, Gn = {
  key: 0,
  class: "learning-muted"
}, Hn = ["disabled", "onClick"], zn = ["disabled"], Yn = {
  key: 0,
  class: "learning-empty-note"
}, Kn = ["disabled", "onClick"], Zn = ["title"], Jn = {
  key: 1,
  class: "learning-row"
}, Qn = ["disabled"], Xn = { class: "learning-muted" }, _n = ["disabled"], ei = /* @__PURE__ */ Q({
  __name: "LearningRecords",
  props: {
    state: {},
    disabled: { type: Boolean },
    embedded: { type: Boolean }
  },
  emits: ["action", "remove"],
  setup(e, { emit: c }) {
    const l = e, n = c;
    Ve(() => l.state.record ? (n("action", "records", { offset: l.state.records.offset }), !0) : !1);
    const o = {
      deleteAnswer: "删除这次作答",
      deleteRecord: "删除记录",
      answerWarning: "这次作答和对应的反馈会删除，相关知识点的掌握情况会更新。已到账奖励保留。",
      recordWarning: "这条学习记录会删除，仅属于它的历史作答也会删除。当前练习不受影响。",
      hidden: "听力原文暂未显示，下面是你的作答和点评。"
    };
    return (v, d) => (t(), i("section", jn, [!e.embedded || e.state.record ? (t(), i("div", Dn, [d[5] || (d[5] = a("h1", null, "学习记录", -1)), e.state.records.total ? (t(), i("span", Wn, s(e.state.records.total) + " 项", 1)) : m("", !0)])) : m("", !0), e.state.record ? (t(), i(E, { key: 1 }, [
      a("button", {
        type: "button",
        onClick: d[0] || (d[0] = (b) => v.$emit("action", "records", { offset: e.state.records.offset }))
      }, "‹ 返回记录"),
      a("h2", null, s(e.state.record.label), 1),
      (t(!0), i(E, null, D(e.state.record.evidence, (b) => (t(), i("article", {
        key: b.attempt.id,
        class: "learning-record-evidence"
      }, [
        a("p", Fn, s(new Date(b.attempt.submittedAt).toLocaleDateString()), 1),
        a("h3", null, s(b.exercise.prompt), 1),
        (t(!0), i(E, null, D(b.materials, (C) => (t(), i("details", { key: C.id }, [a("summary", null, s(C.title), 1), C.hidden ? (t(), i("p", Gn, s(o.hidden), 1)) : (t(!0), i(E, { key: 1 }, D(C.paragraphs, (f) => (t(), i("p", { key: f.id }, s(f.text), 1))), 128))]))), 128)),
        W(Tt, {
          attempt: b.attempt,
          feedback: b.assessment,
          response: b.exercise.response,
          paragraphs: b.materials.flatMap((C) => C.paragraphs),
          disabled: e.disabled,
          revised: !!e.state.unit?.attempts.some((C) => C.revisesAttemptId === b.attempt.id),
          onAction: d[1] || (d[1] = (C, f) => v.$emit("action", C, f))
        }, null, 8, [
          "attempt",
          "feedback",
          "response",
          "paragraphs",
          "disabled",
          "revised"
        ]),
        a("button", {
          type: "button",
          disabled: e.disabled,
          onClick: (C) => v.$emit("remove", "delete-attempt", { id: b.attempt.id }, o.answerWarning)
        }, s(o.deleteAnswer), 9, Hn)
      ]))), 128)),
      a("button", {
        type: "button",
        disabled: e.disabled,
        onClick: d[2] || (d[2] = (b) => v.$emit("remove", "delete-item", { id: e.state.record.id }, o.recordWarning))
      }, s(o.deleteRecord), 9, zn)
    ], 64)) : (t(), i(E, { key: 2 }, [
      e.state.records.total ? m("", !0) : (t(), i("p", Yn, "暂无学习记录")),
      (t(!0), i(E, null, D(e.state.records.items, (b) => (t(), i("button", {
        key: b.id,
        class: "learning-record-row",
        type: "button",
        disabled: !b.readable,
        onClick: (C) => v.$emit("action", "records", {
          id: b.id,
          offset: e.state.records.offset
        })
      }, [a("span", null, [a("strong", null, s(b.label), 1), a("small", null, [F(s(r(Ot)(b.evidenceCount)), 1), b.nextReviewAt ? (t(), i("span", {
        key: 0,
        title: b.scheduleReason ?? void 0
      }, " · " + s(r(at)(b.nextReviewAt)) + "（" + s(new Date(b.nextReviewAt).toLocaleDateString()) + "）", 9, Zn)) : m("", !0)])]), a("em", null, s(r(Bt)[b.state]), 1)], 8, Kn))), 128)),
      e.state.records.total > 30 ? (t(), i("div", Jn, [
        a("button", {
          type: "button",
          disabled: e.state.records.offset === 0,
          onClick: d[3] || (d[3] = (b) => v.$emit("action", "records", { offset: Math.max(0, e.state.records.offset - 30) }))
        }, "上一页", 8, Qn),
        a("span", Xn, s(e.state.records.total) + " 项", 1),
        a("button", {
          type: "button",
          disabled: e.state.records.offset + 30 >= e.state.records.total,
          onClick: d[4] || (d[4] = (b) => v.$emit("action", "records", { offset: e.state.records.offset + 30 }))
        }, "下一页", 8, _n)
      ])) : m("", !0)
    ], 64))]));
  }
}), wt = ei, ti = { class: "learning-books-page" }, ai = { class: "learning-page-heading" }, ni = {
  key: 0,
  class: "learning-due"
}, ii = { key: 0 }, li = { key: 1 }, si = ["disabled"], ri = {
  class: "learning-tabs",
  role: "tablist",
  "aria-label": "学习记录视图"
}, oi = ["aria-selected", "onClick"], ui = {
  key: 0,
  class: "learning-empty-note"
}, di = { class: "learning-book-list" }, vi = ["disabled", "onClick"], ci = ["aria-expanded", "onClick"], gi = {
  key: 1,
  class: "learning-chip-reason"
}, mi = {
  key: 2,
  class: "learning-growth"
}, pi = {
  key: 0,
  class: "learning-empty-note"
}, bi = { class: "learning-muted" }, fi = { key: 0 }, yi = { key: 0 }, ki = { key: 1 }, hi = { key: 2 }, $i = /* @__PURE__ */ Q({
  __name: "LearningBooks",
  props: {
    state: {},
    disabled: { type: Boolean }
  },
  emits: [
    "action",
    "review",
    "remove"
  ],
  setup(e, { emit: c }) {
    const l = e, n = c, o = Ie().books, v = ge(o, "tab"), d = [
      ["grammar", "语法本"],
      ["vocabulary", "生词本"],
      ["growth", "成长"],
      ["all", "全部记录"]
    ], b = { title: "学习本" }, C = ge(o, "reason"), f = L(() => v.value === "grammar" || v.value === "vocabulary" ? l.state.books[v.value] : []), k = L(() => l.state.growth), $ = L(() => !!l.state.review && l.state.review.stage.stage !== "complete");
    return (h, y) => (t(), i("section", ti, [e.state.record ? (t(), Y(wt, {
      key: 0,
      state: e.state,
      disabled: e.disabled,
      onAction: y[0] || (y[0] = (g, u) => n("action", g, u)),
      onRemove: y[1] || (y[1] = (g, u, w) => n("remove", g, u, w))
    }, null, 8, ["state", "disabled"])) : (t(), i(E, { key: 1 }, [
      a("div", ai, [a("h1", null, s(b.title), 1)]),
      e.state.dueCount || $.value ? (t(), i("div", ni, [e.state.dueCount ? (t(), i("span", ii, s(r(qt)(e.state.dueCount)), 1)) : m("", !0), e.state.blockedReview ? (t(), i("small", li, "有一组复习在另一个故事中进行，回到学习页可以放下它")) : $.value ? (t(), i("button", {
        key: 3,
        type: "button",
        class: "learning-primary",
        onClick: y[3] || (y[3] = (g) => n("review"))
      }, s(r(J).resumeReview), 1)) : (t(), i("button", {
        key: 2,
        type: "button",
        class: "learning-primary",
        disabled: e.disabled,
        onClick: y[2] || (y[2] = (g) => n("action", "start-review"))
      }, s(r(J).review), 9, si))])) : m("", !0),
      a("div", ri, [(t(), i(E, null, D(d, ([g, u]) => a("button", {
        key: g,
        type: "button",
        role: "tab",
        "aria-selected": v.value === g,
        onClick: (w) => {
          v.value = g, C.value = "";
        }
      }, s(u), 9, oi)), 64))]),
      v.value === "grammar" || v.value === "vocabulary" ? (t(), i(E, { key: 1 }, [f.value.length ? m("", !0) : (t(), i("p", ui, s(v.value === "grammar" ? "批改里出现的语法问题会记到这里。" : "批改里的词汇问题、读文章时收藏的词语会记到这里。"), 1)), a("ul", di, [(t(!0), i(E, null, D(f.value, (g) => (t(), i("li", { key: g.id }, [
        a("button", {
          type: "button",
          class: "learning-book-item",
          disabled: !g.readable,
          onClick: (u) => n("action", "records", {
            id: g.id,
            offset: e.state.records.offset
          })
        }, [a("strong", null, s(g.label), 1), a("small", null, s(r(Bt)[g.state]) + " · " + s(r(Ot)(g.evidenceCount)), 1)], 8, vi),
        g.nextReviewAt ? (t(), i("button", {
          key: 0,
          type: "button",
          class: "learning-chip",
          "aria-expanded": C.value === g.id,
          onClick: (u) => C.value = C.value === g.id ? "" : g.id
        }, s(r(at)(g.nextReviewAt)), 9, ci)) : m("", !0),
        C.value === g.id ? (t(), i("small", gi, s(g.scheduleReason), 1)) : m("", !0)
      ]))), 128))])], 64)) : v.value === "growth" ? (t(), i("section", mi, [k.value.enough ? (t(), i(E, { key: 1 }, [
        a("p", bi, [F("来自 " + s(k.value.evidence) + " 份作答", 1), k.value.completed ? (t(), i("span", fi, "、" + s(k.value.completed) + " 次完成", 1)) : m("", !0)]),
        k.value.steady.length ? (t(), i("div", yi, [y[6] || (y[6] = a("h2", null, "已经稳定", -1)), a("p", null, s(k.value.steady.join("、")), 1)])) : m("", !0),
        k.value.practising.length ? (t(), i("div", ki, [y[7] || (y[7] = a("h2", null, "最近独立做对", -1)), a("p", null, s(k.value.practising.join("、")), 1)])) : m("", !0),
        k.value.struggling.length ? (t(), i("div", hi, [y[8] || (y[8] = a("h2", null, "还要再练", -1)), a("p", null, s(k.value.struggling.join("、")), 1)])) : m("", !0)
      ], 64)) : (t(), i("p", pi, "还需要几次练习才看得出"))])) : (t(), Y(wt, {
        key: 3,
        embedded: "",
        state: e.state,
        disabled: e.disabled,
        onAction: y[4] || (y[4] = (g, u) => n("action", g, u)),
        onRemove: y[5] || (y[5] = (g, u, w) => n("remove", g, u, w))
      }, null, 8, ["state", "disabled"]))
    ], 64))]));
  }
}), wi = $i, xi = {
  class: "learning-settings-card",
  "aria-label": "训练设置"
}, Ci = { key: 0 }, Ii = ["disabled"], Li = ["open"], Si = ["value"], Ai = { class: "learning-row" }, Ri = ["disabled"], Mi = /* @__PURE__ */ Q({
  __name: "LearningSettingsCard",
  props: {
    state: {},
    disabled: { type: Boolean },
    onboarding: { type: Boolean }
  },
  emits: ["action"],
  setup(e, { emit: c }) {
    const l = e, n = c, o = [
      ["zh-CN", "中文"],
      ["en", "English"],
      ["ja", "日本語"],
      ["ko", "한국어"]
    ], v = L(() => l.state.profile?.settings ?? null), d = Ie().settings, b = d.form, C = ge(d, "open");
    function f() {
      Object.assign(b, {
        exam: v.value?.exam ?? "",
        level: v.value?.level ?? "",
        targetLevel: v.value?.targetLevel ?? "",
        explanationLanguage: v.value?.explanationLanguage ?? "zh-CN",
        interests: v.value?.interests ?? ""
      });
    }
    l.onboarding && !d.open && (f(), d.open = !0);
    const k = (g) => o.find(([u]) => u === g)?.[1] ?? new Intl.DisplayNames(["zh-CN"], { type: "language" }).of(g) ?? g, $ = L(() => [.../* @__PURE__ */ new Set([...o.map(([g]) => g), v.value?.explanationLanguage ?? "zh-CN"])]), h = L(() => [
      ["考试", v.value?.exam || "不备考"],
      ["水平", v.value?.level || "不确定"],
      ["目标", v.value?.targetLevel || "比现在高一级"],
      ["讲解", k(v.value?.explanationLanguage ?? "zh-CN")],
      ["兴趣", v.value?.interests || "不限"]
    ]);
    function y() {
      const g = Vt(b);
      d.submitted = {
        value: g,
        form: { ...b }
      }, n("action", "settings", { value: g });
    }
    return (g, u) => (t(), i("section", xi, [C.value ? m("", !0) : (t(), i("dl", Ci, [(t(!0), i(E, null, D(h.value, ([w, P]) => (t(), i("div", { key: w }, [a("dt", null, s(w), 1), a("dd", null, s(P), 1)]))), 128))])), C.value ? (t(), i("form", {
      key: 2,
      class: "learning-fields",
      onSubmit: ie(y, ["prevent"])
    }, [
      a("label", null, [u[7] || (u[7] = F("考试", -1)), te(a("input", {
        "onUpdate:modelValue": u[1] || (u[1] = (w) => r(b).exam = w),
        type: "text",
        maxlength: "80",
        placeholder: "不备考（例如 雅思、JLPT N2）"
      }, null, 512), [[oe, r(b).exam]])]),
      a("label", null, [u[8] || (u[8] = F("现在的水平", -1)), te(a("input", {
        "onUpdate:modelValue": u[2] || (u[2] = (w) => r(b).level = w),
        type: "text",
        maxlength: "80",
        placeholder: "不确定"
      }, null, 512), [[oe, r(b).level]])]),
      a("label", null, [u[9] || (u[9] = F("目标", -1)), te(a("input", {
        "onUpdate:modelValue": u[3] || (u[3] = (w) => r(b).targetLevel = w),
        type: "text",
        maxlength: "80",
        placeholder: "比现在高一级"
      }, null, 512), [[oe, r(b).targetLevel]])]),
      a("details", {
        class: "learning-settings-optional",
        open: !e.onboarding
      }, [
        a("summary", null, s(r(J).optionalSettings), 1),
        a("label", null, [u[10] || (u[10] = F("讲解语言", -1)), te(a("select", { "onUpdate:modelValue": u[4] || (u[4] = (w) => r(b).explanationLanguage = w) }, [(t(!0), i(E, null, D($.value, (w) => (t(), i("option", {
          key: w,
          value: w
        }, s(k(w)), 9, Si))), 128))], 512), [[Ue, r(b).explanationLanguage]])]),
        a("label", null, [u[11] || (u[11] = F("感兴趣的话题", -1)), te(a("input", {
          "onUpdate:modelValue": u[5] || (u[5] = (w) => r(b).interests = w),
          type: "text",
          maxlength: "200",
          placeholder: "不限"
        }, null, 512), [[oe, r(b).interests]])])
      ], 8, Li),
      a("div", Ai, [e.onboarding ? m("", !0) : (t(), i("button", {
        key: 0,
        type: "button",
        onClick: u[6] || (u[6] = (w) => {
          C.value = !1, r(d).submitted = null;
        })
      }, "取消")), a("button", {
        type: "submit",
        class: "learning-primary",
        disabled: e.disabled
      }, s(e.onboarding ? r(J).setupFinish : r(J).saveSettings), 9, Ri)])
    ], 32)) : (t(), i("button", {
      key: 1,
      type: "button",
      disabled: e.disabled,
      onClick: u[0] || (u[0] = (w) => {
        f(), C.value = !0;
      })
    }, "调整", 8, Ii))]));
  }
}), Ft = Mi, Ei = { class: "learning-profile-page" }, Ti = { class: "learning-setup-heading" }, Ni = { class: "learning-eyebrow" }, Bi = { class: "learning-language-options" }, Oi = [
  "disabled",
  "aria-pressed",
  "onClick"
], qi = { "aria-hidden": "true" }, Pi = ["disabled"], Ui = {
  key: 0,
  class: "learning-setup-empty"
}, Vi = { class: "learning-teacher-options" }, ji = [
  "disabled",
  "aria-pressed",
  "onClick"
], Di = { class: "learning-person-initial" }, Wi = {
  key: 1,
  class: "learning-selected-teacher"
}, Fi = { class: "learning-person-initial" }, Gi = { key: 0 }, Hi = ["open"], zi = ["disabled"], Yi = ["disabled"], Ki = ["disabled"], Zi = { class: "learning-setup-actions" }, Ji = ["disabled"], Qi = ["disabled"], Xi = /* @__PURE__ */ Q({
  __name: "LearningSetup",
  props: {
    state: {},
    disabled: { type: Boolean }
  },
  emits: ["action"],
  setup(e, { emit: c }) {
    const l = c, n = Ie().setup, o = ge(n, "step"), v = G(null), d = ge(n, "name"), b = ge(n, "note"), C = [
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
    ];
    async function f(k) {
      o.value = k, await re(), v.value?.focus();
    }
    return Ve(() => o.value ? (f(o.value - 1), !0) : !1), (k, $) => (t(), i("section", Ei, [a("div", Ti, [a("p", Ni, s(o.value + 1) + " / " + s(r(J).setupSteps), 1), a("h1", {
      ref_key: "heading",
      ref: v,
      tabindex: "-1"
    }, s(o.value === 0 ? "选择要学习的语言" : o.value === 1 ? "选择语伴" : r(J).setupTitle), 513)]), o.value === 0 ? (t(), i(E, { key: 0 }, [a("div", Bi, [(t(), i(E, null, D(C, ([h, y, g]) => a("button", {
      key: h,
      type: "button",
      disabled: e.disabled,
      "aria-pressed": e.state.language === h,
      onClick: (u) => l("action", "language", { language: h })
    }, [
      a("span", qi, s(g), 1),
      a("strong", null, s(y), 1),
      e.state.language === h ? (t(), Y(z, {
        key: 0,
        name: "check"
      })) : m("", !0)
    ], 8, Oi)), 64))]), a("button", {
      type: "button",
      class: "learning-primary learning-setup-next",
      disabled: e.disabled,
      onClick: $[0] || ($[0] = (h) => f(1))
    }, [$[7] || ($[7] = F("继续", -1)), W(z, { name: "arrow" })], 8, Pi)], 64)) : o.value === 1 ? (t(), i(E, { key: 1 }, [
      e.state.candidates.length ? m("", !0) : (t(), i("p", Ui, "当前故事里还没有认识的人物，所以没有可选的语伴。可以在下面手动填一位：名字加一句身份说明。")),
      a("div", Vi, [(t(!0), i(E, null, D(e.state.candidates, (h) => (t(), i("button", {
        key: h.name,
        type: "button",
        disabled: e.disabled,
        "aria-pressed": e.state.teacher?.name === h.name,
        onClick: (y) => l("action", "teacher", { teacher: {
          name: h.name,
          note: ""
        } })
      }, [
        a("span", Di, s([...h.name][0]), 1),
        a("strong", null, s(h.name), 1),
        e.state.teacher?.name === h.name ? (t(), Y(z, {
          key: 0,
          name: "check"
        })) : m("", !0)
      ], 8, ji))), 128))]),
      e.state.teacher && !e.state.candidates.some((h) => h.name === e.state.teacher?.name) ? (t(), i("p", Wi, [
        a("span", Fi, s([...e.state.teacher.name][0]), 1),
        a("span", null, [F(s(e.state.teacher.name), 1), e.state.teacher.note ? (t(), i("small", Gi, s(e.state.teacher.note), 1)) : m("", !0)]),
        W(z, { name: "check" })
      ])) : m("", !0),
      a("details", {
        class: "learning-other-teacher",
        open: !e.state.candidates.length
      }, [a("summary", null, s(e.state.candidates.length ? "手动填写其他人物" : "手动填写"), 1), a("form", {
        class: "learning-fields",
        onSubmit: $[3] || ($[3] = ie((h) => l("action", "teacher", { teacher: {
          name: d.value.trim(),
          note: b.value.trim()
        } }), ["prevent"]))
      }, [
        a("label", null, [$[8] || ($[8] = F("名字", -1)), te(a("input", {
          "onUpdate:modelValue": $[1] || ($[1] = (h) => d.value = h),
          type: "text",
          maxlength: "80",
          placeholder: "例如 林老师",
          disabled: e.disabled
        }, null, 8, zi), [[oe, d.value]])]),
        a("label", null, [$[9] || ($[9] = F("一句身份说明", -1)), te(a("input", {
          "onUpdate:modelValue": $[2] || ($[2] = (h) => b.value = h),
          type: "text",
          maxlength: "200",
          placeholder: "例如 在东京长大的大学同学，说话直爽",
          disabled: e.disabled
        }, null, 8, Yi), [[oe, b.value]])]),
        a("button", {
          type: "submit",
          disabled: e.disabled || !d.value.trim()
        }, "选这位", 8, Ki)
      ], 32)], 8, Hi),
      a("div", Zi, [a("button", {
        type: "button",
        disabled: e.disabled,
        onClick: $[4] || ($[4] = (h) => f(0))
      }, "上一步", 8, Ji), a("button", {
        type: "button",
        class: "learning-primary",
        disabled: e.disabled || !e.state.teacher,
        onClick: $[5] || ($[5] = (h) => f(2))
      }, [F(s(r(J).setupContinue), 1), W(z, { name: "arrow" })], 8, Qi)])
    ], 64)) : (t(), Y(Ft, {
      key: 2,
      onboarding: "",
      state: e.state,
      disabled: e.disabled || !e.state.teacher,
      onAction: $[6] || ($[6] = (h, y) => l("action", h, y ?? {}))
    }, null, 8, ["state", "disabled"]))]));
  }
}), _i = Xi, el = { class: "learning-companion-control" }, tl = {
  key: 0,
  class: "learning-sr-only"
}, al = { class: "learning-companion-options" }, nl = { class: "learning-companion-switch" }, il = ["aria-label"], ll = { class: "learning-cost-note" }, sl = /* @__PURE__ */ Q({
  __name: "LearningCompanionControl",
  props: { name: {} },
  setup(e) {
    const c = ge(Ie().companion, "enabled"), l = {
      title: "陪读",
      on: "一起学习中",
      off: "未开启",
      description: "开启后语伴会和你一起学习",
      costTitle: "费用说明",
      cost: "陪读消息和聊天一样，按你所用的 AI 服务计费。"
    };
    return (n, o) => (t(), i("details", el, [a("summary", null, [
      a("span", {
        class: le(["learning-companion-light", { "is-on": c.value }]),
        "aria-hidden": "true"
      }, null, 2),
      F(s(c.value ? e.name ? `${e.name} · ${l.on}` : l.on : l.title), 1),
      c.value ? m("", !0) : (t(), i("span", tl, s(l.off), 1))
    ]), a("div", al, [a("label", nl, [a("span", null, s(l.description), 1), te(a("input", {
      "onUpdate:modelValue": o[0] || (o[0] = (v) => c.value = v),
      type: "checkbox",
      role: "switch",
      "aria-label": l.title
    }, null, 8, il), [[la, c.value]])]), a("details", ll, [a("summary", null, s(l.costTitle), 1), a("small", null, s(l.cost), 1)])])]));
  }
}), Gt = sl, Xe = {
  unconfirmed: "还没确认保存是否成功，请先查看保存结果，不要重复提交。",
  conflict: "发现另一份学习记录，请先核对再继续。",
  unloaded: "暂时打不开学习记录。",
  failed: "这次没能保存，之前保存的内容都还在，请重试。"
}, de = {
  paid: "奖励已到账",
  retired: "钱包已重置，这份奖励不再补发",
  saving: "正在保存学习成果…",
  pending: "学习已完成，奖励待领取",
  needsWallet: "开通钱包后即可领取",
  claim: "领取奖励",
  openWallet: "开通钱包并领取",
  unknown: "学习已完成，奖励到账情况还没确认。请查看钱包状态，不需要重新做练习。"
}, rl = {
  context: "翻看学习资料",
  config: "连接语伴",
  session: "准备学习内容",
  summary: "整理之前聊过的内容",
  provider: "组织回复",
  tools: "整理学习内容",
  save: "保存学习内容",
  action: "准备学习内容"
};
function ol(e) {
  return `正在${rl[e.stage]}…`;
}
var Ju = Object.freeze({
  materialText: 6e3,
  prompt: 1200,
  explanation: 2e3,
  answer: 4e3,
  name: 80,
  goal: 800,
  itemChanges: 5,
  evidence: 3,
  options: 6,
  pairs: 8,
  gaps: 6,
  readDefault: 20,
  readMax: 50,
  dataMessage: 24e3,
  paragraphChunk: 2e3,
  acceptedForms: 12,
  annotations: 40,
  terms: 12,
  quote: 600,
  reviewItems: 20
});
function xt(e) {
  return e.split(/\r?\n/u).filter((c) => c.trim());
}
var ul = {
  class: "learning-complete",
  role: "status",
  "aria-live": "polite"
}, dl = {
  key: 0,
  class: "learning-complete-burst",
  "aria-hidden": "true"
}, vl = { class: "learning-complete-title" }, cl = {
  key: 1,
  class: "learning-complete-amount"
}, gl = ["disabled"], ml = /* @__PURE__ */ Q({
  __name: "LearningCompletion",
  props: {
    state: {},
    unitId: {},
    amount: {},
    label: {},
    disabled: { type: Boolean },
    quiet: { type: Boolean }
  },
  emits: ["action"],
  setup(e, { emit: c }) {
    const l = e, n = c, o = L(() => l.state.completions.find((d) => d.unitId === l.unitId)), v = L(() => {
      const d = o.value?.rewardStatus;
      return d === "paid" ? de.paid : d === "retired" ? de.retired : o.value ? l.state.walletOpen ? de.pending : de.needsWallet : de.saving;
    });
    return (d, b) => (t(), i("section", ul, [
      e.quiet ? m("", !0) : (t(), i("div", dl, [(t(), i(E, null, D(8, (C) => a("span", {
        key: C,
        style: St({ "--i": C })
      }, null, 4)), 64))])),
      a("p", vl, s(e.label), 1),
      o.value?.rewardStatus !== "retired" ? (t(), i("p", cl, [a("strong", null, s(o.value?.rewardStatus === "paid" ? "+" : "") + s(o.value?.amount ?? e.amount), 1), b[1] || (b[1] = a("span", null, "小白币", -1))])) : m("", !0),
      a("small", null, s(v.value), 1),
      o.value && o.value.rewardStatus !== "paid" && o.value.rewardStatus !== "retired" ? (t(), i("button", {
        key: 2,
        type: "button",
        disabled: e.disabled || e.state.walletStorage !== "ready",
        onClick: b[0] || (b[0] = (C) => n("action", "reward", {
          unitId: e.unitId,
          openWallet: !e.state.walletOpen
        }))
      }, s(e.state.walletOpen ? r(de).claim : r(de).openWallet), 9, gl)) : m("", !0)
    ]));
  }
}), Ht = ml, pl = ["aria-labelledby"], bl = { id: "learning-grading-title" }, fl = {
  key: 0,
  class: "learning-grading-actions"
}, yl = {
  key: 0,
  class: "learning-annotation-missing",
  role: "status"
}, kl = ["disabled"], hl = ["disabled"], $l = ["open", "onToggle"], wl = {
  key: 0,
  class: "learning-revised-text"
}, xl = { class: "learning-write-saved" }, Cl = { key: 0 }, Il = {
  key: 1,
  class: "learning-graded-guidance"
}, Ll = ["open", "onToggle"], Sl = { key: 0 }, Al = { key: 1 }, Rl = { key: 3 }, Ml = { class: "learning-graded-text" }, El = { class: "learning-annotation-fixed" }, Tl = {
  key: 0,
  class: "learning-annotation-missing"
}, Nl = {
  key: 1,
  class: "learning-annotation-fixed"
}, Bl = ["onClick"], Ol = { class: "learning-annotation-tag" }, ql = {
  key: 0,
  class: "learning-annotation-suggestion"
}, Pl = ["onSubmit"], Ul = ["onUpdate:modelValue", "aria-label"], Vl = ["disabled"], jl = { key: 2 }, Dl = ["onClick"], Wl = {
  key: 1,
  class: "learning-working",
  role: "status"
}, Fl = ["disabled"], Gl = ["disabled"], Hl = {
  key: 3,
  class: "learning-model-essay"
}, zl = /* @__PURE__ */ Q({
  __name: "LearningGrading",
  props: {
    state: {},
    unit: {},
    disabled: { type: Boolean },
    pending: { type: Boolean },
    view: {}
  },
  emits: [
    "action",
    "confirm",
    "record"
  ],
  setup(e, { emit: c }) {
    const l = e, n = c, o = {
      content: "内容",
      grammar: "语法",
      vocabulary: "词汇",
      cohesion: "衔接"
    }, v = {
      error: "需要改",
      improve: "可以更好",
      alternative: "另一种说法"
    }, d = {
      grammar: "语法本",
      vocabulary: "生词本"
    }, b = {
      title: "看看哪里能写得更好",
      unplaced: "这处改动还没写进作文。请调整后再提交，或跳过修改。"
    }, C = (O) => O.itemId && (O.category === "grammar" || O.category === "vocabulary") ? d[O.category] : null, f = Le(() => l.unit.id), k = L(() => f.value.edits), $ = L(() => l.unit.stage.stage), h = L(() => new Map(l.unit.materials.flatMap((O) => O.paragraphs).map((O, N) => [O.id, N + 1]))), y = (O) => O?.answer.kind === "text" ? O.answer.text : "", g = L(() => l.unit.stage.exercises.flatMap((O) => {
      const N = l.unit.exercises.find((ae) => ae.id === O.exerciseId), R = l.unit.attempts.find((ae) => ae.id === O.draftAttemptId);
      if (!N || !R) return [];
      const U = l.unit.assessments.find((ae) => ae.attemptId === R.id), B = l.unit.attempts.find((ae) => ae.id === O.revisionAttemptId), X = B && l.unit.assessments.find((ae) => ae.attemptId === B.id), ue = U?.annotations ?? [];
      return [{
        row: O,
        exercise: N,
        draft: R,
        assessment: U,
        revision: B,
        review: X,
        annotations: ue,
        label: N.paragraphId ? `第 ${h.value.get(N.paragraphId) ?? "?"} 段总结` : "作文",
        paragraphs: xt(y(R)).map((ae, be) => ({
          index: be,
          segments: Pn(ae, ue.filter((se) => se.paragraphIndex === be)),
          annotations: ue.filter((se) => se.paragraphIndex === be)
        })),
        resolved: new Set(X?.resolvedAnnotationIds ?? [])
      }];
    }).sort((O, N) => +(N.annotations.length > 0) - +(O.annotations.length > 0))), u = (O) => $.value === "revising" && O.row.status === "revising", w = (O, N) => u(O) && N.severity !== "alternative";
    H(g, (O) => {
      for (const N of O.flatMap((R) => R.annotations)) k.value[N.id] ??= {
        value: N.quote,
        done: !1
      };
    }, { immediate: !0 });
    function P(O) {
      const N = k.value[O.id];
      N?.value.trim() && N.value !== O.quote && (N.done = !0);
    }
    const T = L(() => new Map(g.value.filter(u).map((O) => [O.draft.id, qn(y(O.draft), O.annotations.map((N) => ({
      id: N.id,
      paragraphIndex: N.paragraphIndex,
      quote: N.quote,
      replacement: k.value[N.id]?.done ? k.value[N.id].value : N.quote
    })))]))), A = L(() => new Set([...T.value.values()].flatMap((O) => O.missing))), V = L(() => [...T.value.values()].reduce((O, N) => O + N.applied.length, 0)), K = G("");
    H(V, () => {
      K.value = "";
    });
    const q = L(() => g.value.filter(u).flatMap((O) => O.annotations.filter((N) => N.severity !== "alternative")).length), M = (O, N) => {
      const R = O.annotations.find((U) => U.id === N);
      return R ? ["learning-mark", `is-${R.severity}`] : "";
    };
    function I() {
      const O = g.value.filter(u).flatMap((N) => {
        const R = T.value.get(N.draft.id);
        return !R || R.text === y(N.draft) ? [] : [{
          attemptId: N.draft.id,
          text: R.text
        }];
      });
      O.length ? n("action", "submit-revision", {
        unitId: l.unit.id,
        revisions: O
      }) : K.value = b.unplaced;
    }
    const j = L(() => l.state.pending?.unitId === l.unit.id ? l.state.pending.purpose : null);
    return (O, N) => (t(), i("section", {
      class: "learning-grading",
      "aria-labelledby": e.view === "feedback" ? "learning-grading-title" : void 0
    }, [
      e.view === "feedback" ? (t(), i(E, { key: 0 }, [
        a("h2", bl, s(b.title), 1),
        $.value === "revising" ? (t(), i("div", fl, [
          a("small", null, "已改 " + s(V.value) + " / " + s(q.value) + " 处", 1),
          K.value ? (t(), i("small", yl, s(K.value), 1)) : m("", !0),
          a("button", {
            type: "button",
            disabled: e.disabled,
            onClick: N[0] || (N[0] = (R) => n("confirm", "skip-revision", { unitId: e.unit.id }, "跳过这次修改？批注会保留，直接进入范文。"))
          }, "跳过修改", 8, kl),
          a("button", {
            type: "button",
            class: "learning-primary",
            disabled: e.disabled || !V.value,
            onClick: I
          }, "提交修改", 8, hl)
        ])) : m("", !0),
        (t(!0), i(E, null, D(g.value, (R) => (t(), i("details", {
          key: R.exercise.id,
          class: "learning-graded",
          open: r(f).expanded[`grading:${R.draft.id}`] ?? R.annotations.length > 0,
          onToggle: (U) => r(f).expanded[`grading:${R.draft.id}`] = U.target.open
        }, [
          a("summary", null, [a("h3", null, s(R.label), 1)]),
          R.revision ? (t(), i("section", wl, [
            a("h4", null, s(r(J).revision), 1),
            a("p", xl, s(y(R.revision)), 1),
            R.review?.guidance ? (t(), i("p", Cl, s(R.review.guidance), 1)) : m("", !0)
          ])) : m("", !0),
          R.assessment?.guidance ? (t(), i("p", Il, s(R.assessment.guidance), 1)) : m("", !0),
          R.assessment && (R.assessment.understanding || R.assessment.expression) ? (t(), i("details", {
            key: 2,
            class: "learning-graded-more",
            open: r(f).expanded[`feedback:${R.draft.id}`],
            onToggle: (U) => r(f).expanded[`feedback:${R.draft.id}`] = U.target.open
          }, [
            N[6] || (N[6] = a("summary", null, "理解与表达点评", -1)),
            R.assessment.understanding ? (t(), i("p", Sl, [N[4] || (N[4] = a("b", null, "理解", -1)), F(s(R.assessment.understanding), 1)])) : m("", !0),
            R.assessment.expression ? (t(), i("p", Al, [N[5] || (N[5] = a("b", null, "表达", -1)), F(s(R.assessment.expression), 1)])) : m("", !0)
          ], 40, Ll)) : m("", !0),
          R.revision ? (t(), i("h4", Rl, s(r(J).original), 1)) : m("", !0),
          (t(!0), i(E, null, D(R.paragraphs, (U) => (t(), i("div", {
            key: U.index,
            class: "learning-graded-paragraph"
          }, [a("p", Ml, [(t(!0), i(E, null, D(U.segments, (B, X) => (t(), i(E, { key: X }, [B.id ? (t(), i("mark", {
            key: 0,
            class: le(M(R, B.id))
          }, s(B.text), 3)) : (t(), i(E, { key: 1 }, [F(s(B.text), 1)], 64))], 64))), 128))]), (t(!0), i(E, null, D(U.annotations, (B) => (t(), i("div", {
            key: B.id,
            class: le(["learning-annotation", [`is-${B.severity}`, {
              "is-fixed": R.resolved.has(B.id),
              "is-edited": k.value[B.id]?.done && u(R)
            }]])
          }, [R.resolved.has(B.id) ? (t(), i(E, { key: 0 }, [a("p", El, "✓ " + s(r(J).resolved), 1), a("p", null, s(B.explanation), 1)], 64)) : k.value[B.id]?.done && u(R) ? (t(), i(E, { key: 1 }, [A.value.has(B.id) ? (t(), i("p", Tl, "原文里找不到“" + s(B.quote) + "”，这处改动不会写进修改稿。", 1)) : (t(), i("p", Nl, "✓ 改为“" + s(k.value[B.id].value) + "”", 1)), a("button", {
            type: "button",
            onClick: (X) => k.value[B.id].done = !1
          }, "再改", 8, Bl)], 64)) : (t(), i(E, { key: 2 }, [
            a("p", Ol, [a("span", null, s(v[B.severity]), 1), F(s(o[B.category]), 1)]),
            a("p", null, s(B.explanation), 1),
            B.suggestion ? (t(), i("p", ql, "可以写成：" + s(B.suggestion), 1)) : m("", !0),
            w(R, B) && k.value[B.id] ? (t(), i("form", {
              key: 1,
              class: "learning-annotation-edit",
              onSubmit: ie((X) => P(B), ["prevent"])
            }, [te(a("textarea", {
              "onUpdate:modelValue": (X) => k.value[B.id].value = X,
              rows: "2",
              "aria-label": `改写：${B.quote}`,
              maxlength: "600"
            }, null, 8, Ul), [[oe, k.value[B.id].value], [r(We), k.value[B.id]]]), a("button", {
              type: "submit",
              disabled: !k.value[B.id].value.trim() || k.value[B.id].value === B.quote
            }, "改好了", 8, Vl)], 40, Pl)) : R.review && B.severity !== "alternative" ? (t(), i("small", jl, "复核时这里还没改到")) : m("", !0)
          ], 64)), C(B) ? (t(), i("button", {
            key: 3,
            type: "button",
            class: "learning-annotation-book",
            onClick: (X) => n("record", B.itemId)
          }, s(C(B)) + " ↗", 9, Dl)) : m("", !0)], 2))), 128))]))), 128))
        ], 40, $l))), 128))
      ], 64)) : m("", !0),
      [
        "grading",
        "reviewing",
        "model"
      ].includes($.value) ? (t(), i("div", Wl, [j.value ? (t(), i(E, { key: 0 }, [
        N[7] || (N[7] = a("span", {
          class: "learning-working-dot",
          "aria-hidden": "true"
        }, null, -1)),
        a("span", null, s(j.value === "grade" ? r(J).grading : j.value === "revision-review" ? r(J).reviewing : r(J).modelling), 1),
        a("button", {
          type: "button",
          disabled: e.pending,
          onClick: N[1] || (N[1] = (R) => n("action", "cancel"))
        }, s(r(J).stop), 9, Fl)
      ], 64)) : (t(), i("button", {
        key: 1,
        type: "button",
        class: "learning-primary",
        disabled: e.disabled,
        onClick: N[2] || (N[2] = (R) => n("action", "grade", { unitId: e.unit.id }))
      }, s($.value === "grading" ? r(J).grade : r(J).continue), 9, Gl))])) : m("", !0),
      e.view === "model" && $.value === "complete" ? (t(), Y(Ht, {
        key: 2,
        state: e.state,
        "unit-id": e.unit.id,
        amount: e.unit.reward.amount,
        label: "本篇完成",
        disabled: e.disabled,
        onAction: N[3] || (N[3] = (R, U) => n("action", R, U))
      }, null, 8, [
        "state",
        "unit-id",
        "amount",
        "disabled"
      ])) : m("", !0),
      e.view === "model" && e.unit.modelEssay ? (t(), i("section", Hl, [a("h3", null, [N[8] || (N[8] = F("范文", -1)), a("small", null, s(e.unit.modelEssay.level), 1)]), (t(!0), i(E, null, D(r(xt)(e.unit.modelEssay.text), (R, U) => (t(), i("p", { key: U }, s(R), 1))), 128))])) : m("", !0)
    ], 8, pl));
  }
}), Yl = zl, Kl = ["data-exercise-id"], Zl = { class: "learning-write-label" }, Jl = [
  "aria-label",
  "placeholder",
  "rows",
  "onKeydown"
], Ql = { class: "learning-write-foot" }, Xl = { "aria-live": "polite" }, _l = ["disabled"], es = { class: "learning-write-saved" }, ts = { class: "learning-write-foot" }, as = ["disabled"], ns = /* @__PURE__ */ Q({
  __name: "LearningWriteBox",
  props: {
    state: {},
    unit: {},
    exercise: {},
    disabled: { type: Boolean },
    label: {},
    placeholder: {},
    tone: {}
  },
  emits: ["action"],
  setup(e, { emit: c }) {
    const l = e, n = c, o = Le(() => l.unit.id);
    H([o, () => l.exercise.id], () => {
      o.value.writing[l.exercise.id] ??= {
        text: "",
        rewriting: !1,
        submitted: null
      };
    }, { immediate: !0 });
    const v = L(() => o.value.writing[l.exercise.id]), d = L({
      get: () => v.value.text,
      set: (T) => {
        v.value.text = T;
      }
    }), b = L({
      get: () => v.value.rewriting,
      set: (T) => {
        v.value.rewriting = T;
      }
    }), C = L(() => l.unit.attempts.filter((T) => T.exerciseId === l.exercise.id && T.revisesAttemptId === void 0).at(-1)), f = L(() => l.unit.assessments.some((T) => T.attemptId === C.value?.id && T.verdict !== "disputed")), k = L(() => C.value?.answer.kind === "text" ? C.value.answer.text : ""), $ = L(() => !C.value || b.value), h = L(() => ["writing", "grading"].includes(l.unit.stage.stage) && !f.value && !l.state.pending), y = L(() => ht(d.value, l.state.language)), g = L(() => ht(k.value, l.state.language)), u = L(() => l.state.conversation.summaryReviews.find((T) => T.attemptId === C.value?.id)?.text ?? "");
    function w() {
      l.disabled || !d.value.trim() || (v.value.submitted = {
        before: C.value?.id,
        text: d.value
      }, n("action", "submit", {
        unitId: l.unit.id,
        exerciseId: l.exercise.id,
        answer: {
          kind: "text",
          text: d.value.trim()
        }
      }));
    }
    function P() {
      d.value = k.value, b.value = !0;
    }
    return (T, A) => (t(), i("div", {
      class: le(["learning-write", `is-${e.tone ?? "summary"}`]),
      "data-exercise-id": e.exercise.id
    }, [
      a("p", Zl, s(e.label), 1),
      $.value ? (t(), i("form", {
        key: 0,
        onSubmit: ie(w, ["prevent"])
      }, [te(a("textarea", {
        "onUpdate:modelValue": A[0] || (A[0] = (V) => d.value = V),
        "aria-label": e.label,
        placeholder: e.placeholder,
        maxlength: "4000",
        rows: e.tone === "essay" ? 8 : 3,
        onKeydown: [ye(ie(w, ["ctrl", "prevent"]), ["enter"]), ye(ie(w, ["meta", "prevent"]), ["enter"])]
      }, null, 40, Jl), [[oe, d.value], [r(We), v.value]]), a("div", Ql, [
        a("small", Xl, s(y.value.count) + " " + s(y.value.unit), 1),
        b.value ? (t(), i("button", {
          key: 0,
          type: "button",
          onClick: A[1] || (A[1] = (V) => {
            b.value = !1, d.value = "";
          })
        }, "取消")) : m("", !0),
        a("button", {
          type: "submit",
          class: "learning-primary",
          disabled: e.disabled || !d.value.trim()
        }, s(C.value ? "保存新稿" : "提交"), 9, _l)
      ])], 32)) : C.value ? (t(), i(E, { key: 1 }, [a("p", es, s(k.value), 1), a("div", ts, [a("small", null, "已保存 · " + s(g.value.count) + " " + s(g.value.unit), 1), h.value ? (t(), i("button", {
        key: 0,
        type: "button",
        disabled: e.disabled,
        onClick: P
      }, "重写", 8, as)) : m("", !0)])], 64)) : m("", !0),
      u.value ? (t(), Y(et, {
        key: 2,
        class: "learning-markdown learning-write-reply",
        text: u.value
      }, null, 8, ["text"])) : m("", !0)
    ], 10, Kl));
  }
}), zt = ns, ne = {
  noWeb: "还没连接联网取材。你可以去设置，或先读一篇语伴原创。",
  unavailable: "这次没能准备好文章，可以重新找一篇，或改读语伴原创。",
  retry: "重新找一篇",
  settings: "设置联网取材",
  original: "读语伴原创",
  existing: "继续已有课文",
  dismiss: "暂不开始",
  notes: "正在整理本段知识…",
  essay: "正在准备写作题…",
  stopped: "准备已暂停，已保存的内容都在。",
  incomplete: "这部分还没准备好，已保存的内容不受影响。",
  resume: "继续准备",
  missingNotes: "本段知识待补充",
  missingEssay: "写作题待补充",
  notesRequest: "请补充这些段落的学习知识。",
  essayRequest: "请为这篇文章准备主题写作题。",
  taskTitles: {
    "reading-article": "准备阅读文章",
    "reading-notes": "整理本段知识",
    "reading-essay": "准备写作题"
  }
}, is = "用你的话概括这一段", ls = ["data-paragraph-id", "data-material-id"], ss = { class: "learning-reading-text" }, rs = {
  class: "learning-reading-number",
  "aria-hidden": "true"
}, os = ["data-material-id", "data-paragraph-id"], us = ["disabled"], ds = ["open"], vs = { key: 0 }, cs = { class: "learning-knowledge-text" }, gs = {
  key: 0,
  class: "learning-terms"
}, ms = [
  "disabled",
  "aria-pressed",
  "onClick"
], ps = {
  key: 2,
  class: "learning-muted learning-knowledge-pending"
}, bs = /* @__PURE__ */ Q({
  __name: "ReadingParagraph",
  props: {
    state: {},
    unit: {},
    materialId: {},
    paragraph: {},
    number: {},
    disabled: { type: Boolean }
  },
  emits: ["action", "ask"],
  setup(e, { emit: c }) {
    const l = e, n = c, o = L(() => l.unit.explanations.find((h) => h.materialId === l.materialId && h.paragraphId === l.paragraph.id)), v = L(() => l.unit.exercises.find((h) => h.paragraphId === l.paragraph.id)), d = L(() => new Set(l.state.savedTerms)), b = (h) => d.value.has(h), C = Le(() => l.unit.id), f = L(() => `knowledge:${l.materialId}:${l.paragraph.id}`), k = L(() => C.value.selection?.materialId === l.materialId && C.value.selection.paragraphId === l.paragraph.id ? C.value.selection : null);
    function $() {
      C.value.selection = {
        materialId: l.materialId,
        paragraphId: l.paragraph.id,
        start: 0,
        end: l.paragraph.text.length,
        quote: l.paragraph.text
      };
    }
    return (h, y) => (t(), i("section", {
      class: "learning-reading-paragraph",
      "data-paragraph-id": e.paragraph.id,
      "data-material-id": e.materialId
    }, [
      a("p", ss, [a("span", rs, s(e.number), 1), a("span", {
        "data-learning-text": "",
        "data-material-id": e.materialId,
        "data-paragraph-id": e.paragraph.id
      }, s(e.paragraph.text), 9, os)]),
      a("button", {
        type: "button",
        class: "learning-paragraph-quote",
        disabled: [...e.paragraph.text].length > r(Mt),
        onClick: $
      }, s(r(Ee).select), 9, us),
      k.value ? (t(), Y(Ut, {
        key: 0,
        selection: k.value,
        disabled: e.disabled,
        onAsk: y[0] || (y[0] = (g) => n("ask", v.value?.id, k.value)),
        onSay: y[1] || (y[1] = (g) => n("action", "say", { selection: k.value })),
        onDismiss: y[2] || (y[2] = (g) => r(C).selection = null)
      }, null, 8, ["selection", "disabled"])) : m("", !0),
      o.value ? (t(), i("details", {
        key: 1,
        class: "learning-knowledge",
        open: r(C).expanded[f.value],
        onToggle: y[3] || (y[3] = (g) => r(C).expanded[f.value] = g.target.open)
      }, [
        a("summary", null, [y[5] || (y[5] = F("本段知识", -1)), o.value.terms.length ? (t(), i("span", vs, " · " + s(o.value.terms.length) + " 个词语", 1)) : m("", !0)]),
        a("p", cs, s(o.value.explanation), 1),
        o.value.terms.length ? (t(), i("ul", gs, [(t(!0), i(E, null, D(o.value.terms, (g) => (t(), i("li", { key: g.text }, [a("span", null, [a("strong", null, s(g.text), 1), a("small", null, s(g.note), 1)]), a("button", {
          type: "button",
          disabled: e.disabled || b(g.text),
          "aria-pressed": b(g.text),
          onClick: (u) => n("action", "bookmark", {
            unitId: e.unit.id,
            materialId: e.materialId,
            paragraphId: e.paragraph.id,
            termText: g.text
          })
        }, s(b(g.text) ? "已收藏" : "收藏"), 9, ms)]))), 128))])) : m("", !0)
      ], 40, ds)) : (t(), i("p", ps, s(e.state.preparation?.running ? r(ne).notes : r(ne).missingNotes), 1)),
      v.value ? (t(), Y(zt, {
        key: 3,
        state: e.state,
        unit: e.unit,
        exercise: v.value,
        disabled: e.disabled,
        label: r(is),
        placeholder: "写下这段的大意，不必逐句翻译",
        onAction: y[4] || (y[4] = (g, u) => n("action", g, u))
      }, null, 8, [
        "state",
        "unit",
        "exercise",
        "disabled",
        "label"
      ])) : m("", !0)
    ], 8, ls));
  }
}), fs = bs, ys = /* @__PURE__ */ new Set([
  "language",
  "teacher",
  "forget-conversation",
  "resume",
  "rate",
  "seek",
  "verify-teacher",
  "adopt-teacher"
]), ks = /* @__PURE__ */ new Set([
  "submit",
  "bookmark",
  "say",
  "play",
  "save-note",
  "delete-note"
]), Yt = /* @__PURE__ */ new Set([
  "records",
  "export",
  "pause",
  "stop",
  "cancel",
  "cancel-chat",
  "cancel-companion",
  "cancel-preparation",
  "tts-settings",
  "research-settings",
  "dismiss-source"
]), hs = /* @__PURE__ */ new Set([
  "read",
  "verify",
  "retry-save",
  "adopt-server",
  "verify-teacher",
  "adopt-teacher",
  "verify-wallet",
  "adopt-wallet",
  "export"
]);
function Kt(e, c) {
  return Yt.has(e) ? !1 : e === "talk" || e === "explain" ? c.chatBusy : ys.has(e) ? c.busy || c.chatBusy || !!c.preparation?.running : c.busy || !!c.preparation?.running && !ks.has(e);
}
function pe(e, c) {
  return !Kt(e, c) && (Yt.has(e) || hs.has(e) || c.storage === "ready" && c.chatStorage === "ready");
}
var $s = ["aria-label"], ws = [
  "aria-current",
  "disabled",
  "onClick"
], xs = { class: "learning-reading-head" }, Cs = ["open"], Is = { key: 0 }, Ls = { class: "learning-source" }, Ss = ["href"], As = {
  key: 0,
  class: "learning-essay"
}, Rs = { class: "learning-essay-prompt" }, Ms = {
  key: 1,
  class: "learning-essay"
}, Es = { class: "learning-muted" }, Ts = ["aria-label"], Ns = ["aria-current"], Bs = {
  key: 2,
  class: "learning-stage-bar is-writing"
}, Os = {
  key: 1,
  class: "learning-muted"
}, qs = {
  key: 3,
  class: "learning-stage-bar"
}, Ps = ["disabled"], Us = ["disabled"], Vs = /* @__PURE__ */ Q({
  __name: "LearningReading",
  props: {
    state: {},
    unit: {},
    disabled: { type: Boolean },
    pending: { type: Boolean }
  },
  emits: [
    "action",
    "confirm",
    "ask",
    "record"
  ],
  setup(e, { emit: c }) {
    const l = e, n = c, o = G(null), v = Le(() => l.unit.id);
    Et(o, () => l.unit.materials, (T) => {
      v.value.selection = T;
    });
    const d = L(() => l.unit.stage.stage), b = L(() => {
      if (d.value === "writing") return "reading";
      const T = v.value.reading.view;
      return T === "model" && ![
        "reviewing",
        "model",
        "complete"
      ].includes(d.value) ? "feedback" : T ?? (d.value === "complete" ? "model" : d.value === "grading" ? "reading" : "feedback");
    }), C = [
      "reading",
      "feedback",
      "model"
    ];
    async function f(T) {
      const A = o.value?.closest(".learning-scroll");
      A && (v.value.reading.scrolls[b.value] = A.scrollTop), v.value.reading.view = T, await re(), A && (A.scrollTop = v.value.reading.scrolls[T] ?? 0);
    }
    const k = [
      ["writing", "阅读与写作"],
      ["grading", "统一批改"],
      ["revising", "修改"],
      ["model", "范文"],
      ["complete", "完成"]
    ], $ = L(() => ({
      writing: 0,
      grading: 1,
      revising: 2,
      reviewing: 3,
      model: 3,
      complete: 4
    })[d.value] ?? 0), h = L(() => l.unit.exercises.find((T) => !T.paragraphId)), y = L(() => l.unit.stage.exercises.filter((T) => T.status === "writing").map((T) => T.exerciseId)), g = {
      goal: "本篇目标",
      progress: "学习进度",
      essay: "主题写作",
      essayLabel: "你的作文",
      essayPlaceholder: "写下你的看法和理由",
      authored: "语伴原创",
      adapted: "改写自",
      original: "原文",
      written: "已写",
      next: "继续写作"
    }, u = L(() => {
      let T = 0;
      return l.unit.materials.map((A) => ({
        material: A,
        paragraphs: A.paragraphs.map((V) => ({
          paragraph: V,
          number: ++T
        }))
      }));
    }), w = (T, A) => n("action", T, A);
    function P(T) {
      const A = o.value?.querySelector(`[data-exercise-id="${CSS.escape(T)}"]`);
      A?.scrollIntoView({
        block: "center",
        behavior: matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth"
      }), A?.querySelector("textarea, button")?.focus({ preventScroll: !0 });
    }
    return (T, A) => (t(), i("article", {
      ref_key: "root",
      ref: o,
      class: "learning-reading"
    }, [
      d.value !== "writing" ? (t(), i("nav", {
        key: 0,
        class: "learning-reading-nav",
        "aria-label": r(J).navigation
      }, [(t(), i(E, null, D(C, (V) => a("button", {
        key: V,
        type: "button",
        "aria-current": b.value === V ? "page" : void 0,
        disabled: V === "model" && ![
          "reviewing",
          "model",
          "complete"
        ].includes(d.value),
        onClick: (K) => f(V)
      }, s(r(J)[V]), 9, ws)), 64))], 8, $s)) : m("", !0),
      b.value === "reading" ? (t(), i(E, { key: 1 }, [
        a("header", xs, [a("details", {
          class: "learning-reading-goal",
          open: r(v).expanded.goal,
          onToggle: A[0] || (A[0] = (V) => r(v).expanded.goal = V.target.open)
        }, [
          a("summary", null, s(g.goal), 1),
          a("strong", null, s(e.unit.title), 1),
          e.unit.goal ? (t(), i("p", Is, s(e.unit.goal), 1)) : m("", !0)
        ], 40, Cs), W(Gt, { name: e.state.teacher?.name }, null, 8, ["name"])]),
        (t(!0), i(E, null, D(u.value, (V, K) => (t(), i("section", {
          key: V.material.id,
          class: "learning-reading-material"
        }, [
          (t(), Y(sa(K === 0 ? "h1" : "h2"), { tabindex: "-1" }, {
            default: aa(() => [F(s(V.material.title), 1)]),
            _: 2
          }, 1024)),
          a("p", Ls, [V.material.provenance.kind === "authored" ? (t(), i(E, { key: 0 }, [F(s(g.authored), 1)], 64)) : (t(), i(E, { key: 1 }, [F(s(V.material.provenance.kind === "adapted" ? g.adapted : g.original) + " ", 1), a("a", {
            href: V.material.provenance.url,
            target: "_blank",
            rel: "noopener noreferrer"
          }, s(V.material.provenance.title), 9, Ss)], 64))]),
          (t(!0), i(E, null, D(V.paragraphs, (q) => (t(), Y(fs, {
            key: q.paragraph.id,
            state: e.state,
            unit: e.unit,
            "material-id": V.material.id,
            paragraph: q.paragraph,
            number: q.number,
            disabled: e.disabled,
            onAction: w,
            onAsk: A[1] || (A[1] = (M, I) => n("ask", M, I))
          }, null, 8, [
            "state",
            "unit",
            "material-id",
            "paragraph",
            "number",
            "disabled"
          ]))), 128))
        ]))), 128)),
        h.value ? (t(), i("section", As, [
          a("h2", null, s(g.essay), 1),
          a("p", Rs, s(h.value.prompt), 1),
          W(zt, {
            state: e.state,
            unit: e.unit,
            exercise: h.value,
            disabled: e.disabled,
            label: g.essayLabel,
            placeholder: g.essayPlaceholder,
            tone: "essay",
            onAction: w
          }, null, 8, [
            "state",
            "unit",
            "exercise",
            "disabled",
            "label",
            "placeholder"
          ])
        ])) : (t(), i("section", Ms, [a("h2", null, s(g.essay), 1), a("p", Es, s(e.state.preparation?.running ? r(ne).essay : r(ne).missingEssay), 1)])),
        a("ol", {
          class: "learning-steps",
          "aria-label": g.progress
        }, [(t(), i(E, null, D(k, ([V, K], q) => a("li", {
          key: V,
          class: le({
            "is-done": q < $.value,
            "is-current": q === $.value
          }),
          "aria-current": q === $.value ? "step" : void 0
        }, s(K), 11, Ns)), 64))], 8, Ts),
        d.value === "writing" ? (t(), i("div", Bs, [a("span", null, s(g.written) + " " + s(e.unit.stage.exercises.length - y.value.length) + " / " + s(e.unit.stage.exercises.length), 1), y.value.length ? (t(), i("button", {
          key: 0,
          type: "button",
          onClick: A[2] || (A[2] = (V) => P(y.value[0]))
        }, s(g.next), 1)) : (t(), i("span", Os, s(e.unit.preparation.essay ? r(ne).missingNotes : r(ne).missingEssay), 1))])) : d.value === "grading" ? (t(), i("div", qs, [e.state.pending?.purpose === "grade" ? (t(), i(E, { key: 0 }, [
          A[9] || (A[9] = a("span", {
            class: "learning-working-dot",
            "aria-hidden": "true"
          }, null, -1)),
          a("span", null, s(r(J).grading), 1),
          a("button", {
            type: "button",
            disabled: e.pending,
            onClick: A[3] || (A[3] = (V) => n("action", "cancel"))
          }, s(r(J).stop), 9, Ps)
        ], 64)) : (t(), i(E, { key: 1 }, [a("span", null, s(r(J).gradeReady), 1), a("button", {
          type: "button",
          class: "learning-primary",
          disabled: e.disabled || !r(pe)("grade", e.state),
          onClick: A[4] || (A[4] = (V) => n("action", "grade", { unitId: e.unit.id }))
        }, s(r(J).grade), 9, Us)], 64))])) : (t(), i("button", {
          key: 4,
          type: "button",
          class: "learning-primary",
          onClick: A[5] || (A[5] = (V) => f("feedback"))
        }, s(r(J).feedback), 1))
      ], 64)) : (t(), Y(Yl, {
        key: 2,
        view: b.value,
        state: e.state,
        unit: e.unit,
        disabled: e.disabled || !r(pe)("grade", e.state),
        pending: e.pending,
        onAction: w,
        onConfirm: A[6] || (A[6] = (V, K, q) => n("confirm", V, K, q)),
        onRecord: A[7] || (A[7] = (V) => n("record", V))
      }, null, 8, [
        "view",
        "state",
        "unit",
        "disabled",
        "pending"
      ])),
      b.value === "feedback" && d.value === "complete" ? (t(), i("button", {
        key: 3,
        type: "button",
        class: "learning-primary",
        onClick: A[8] || (A[8] = (V) => f("model"))
      }, s(r(J).viewModel), 1)) : m("", !0)
    ], 512));
  }
}), js = Vs, Ds = ["data-learning-unit-id", "data-exercise-id"], Ws = { class: "learning-review-head" }, Fs = { class: "learning-muted" }, Gs = ["disabled"], Hs = {
  class: "learning-review-dots",
  "aria-label": "复习卡片"
}, zs = [
  "aria-label",
  "aria-current",
  "onClick"
], Ys = { class: "learning-eyebrow" }, Ks = { class: "learning-card-verdict" }, Zs = { key: 0 }, Js = { key: 1 }, Qs = { key: 2 }, Xs = { key: 1 }, _s = ["disabled"], er = {
  key: 1,
  class: "learning-working",
  role: "status"
}, tr = ["disabled"], ar = ["disabled"], nr = ["disabled"], ir = {
  key: 2,
  class: "learning-row"
}, lr = { class: "learning-review-results" }, sr = ["aria-current", "onClick"], rr = ["aria-expanded", "onClick"], or = {
  key: 1,
  class: "learning-chip-reason"
}, ur = /* @__PURE__ */ Q({
  __name: "LearningReview",
  props: {
    state: {},
    review: {},
    disabled: { type: Boolean },
    pending: { type: Boolean }
  },
  emits: [
    "action",
    "confirm",
    "ask"
  ],
  setup(e, { emit: c }) {
    const l = e, n = c, o = we.verdicts, v = L(() => l.review.stage.stage), d = (R) => l.review.attempts.filter((U) => U.exerciseId === R).at(-1), b = () => Math.max(0, l.review.exercises.findIndex((R) => !d(R.id))), C = Le(() => l.review.id), f = L(() => C.value.review), k = L({
      get: () => f.value.index ?? b(),
      set: (R) => {
        f.value.index = R;
      }
    }), $ = L(() => l.review.exercises[k.value]), h = L(() => $.value && d($.value.id)), y = L(() => l.review.assessments.find((R) => R.attemptId === h.value?.id)), g = L(() => l.review.materials.flatMap((R) => R.paragraphs)), u = L(() => f.value.drafts);
    H($, (R) => {
      R && !u.value[R.id] && (u.value[R.id] = je(R.response));
    }, { immediate: !0 });
    const w = L({
      get: () => u.value[$.value.id],
      set: (R) => {
        u.value[$.value.id] = R;
      }
    }), P = L(() => l.review.exercises.filter((R) => d(R.id)).length), T = L({
      get: () => f.value.openReason,
      set: (R) => {
        f.value.openReason = R;
      }
    });
    function A(R) {
      n("action", "submit", {
        unitId: l.review.id,
        exerciseId: $.value.id,
        answer: R
      });
    }
    function V() {
      const R = l.review.exercises.findIndex((U) => !d(U.id));
      R >= 0 && (k.value = R);
    }
    function K(R) {
      k.value = R, j.value = !0;
    }
    const q = L(() => l.state.completions.find((R) => R.unitId === l.review.id)), M = L(() => q.value?.rewardStatus === "paid" || q.value?.rewardStatus === "retired");
    H(f, (R) => {
      R.seenBefore ??= v.value === "complete" && $t.has(l.review.id);
    }, { immediate: !0 });
    const I = L(() => f.value.seenBefore ?? !1), j = L({
      get: () => f.value.expanded,
      set: (R) => {
        f.value.expanded = R;
      }
    });
    H([v, () => l.review.id], ([R, U]) => {
      R === "complete" && $t.mark(U);
    }, { immediate: !0 });
    const O = L(() => I.value && M.value && !j.value), N = (R) => [...l.state.books.grammar, ...l.state.books.vocabulary].find((U) => U.id === R);
    return (R, U) => (t(), i("section", {
      class: "learning-review",
      "data-learning-unit-id": e.review.id,
      "data-exercise-id": $.value?.id,
      "aria-labelledby": "learning-review-title"
    }, [
      a("header", Ws, [
        U[8] || (U[8] = a("h2", { id: "learning-review-title" }, "今日复习", -1)),
        a("span", Fs, s(P.value) + " / " + s(e.review.exercises.length), 1),
        v.value === "answering" ? (t(), i("button", {
          key: 0,
          type: "button",
          disabled: e.disabled || !r(pe)("abandon-review", e.state),
          onClick: U[0] || (U[0] = (B) => n("confirm", "abandon-review", {}, r(me).review))
        }, "放下", 8, Gs)) : m("", !0)
      ]),
      a("nav", Hs, [(t(!0), i(E, null, D(e.review.exercises, (B, X) => (t(), i("button", {
        key: B.id,
        type: "button",
        "aria-label": `第 ${X + 1} 张`,
        "aria-current": X === k.value,
        class: le({ "is-answered": !!d(B.id) }),
        onClick: (ue) => K(X)
      }, null, 10, zs))), 128))]),
      $.value && !O.value ? (t(), i("div", {
        key: `${$.value.id}:${h.value ? "back" : "front"}`,
        class: le(["learning-card", { "is-back": !!h.value }])
      }, [
        a("p", Ys, s(h.value ? r(we).answer : `第 ${k.value + 1} 张`), 1),
        a("h3", null, s($.value.prompt), 1),
        h.value ? (t(), i(E, { key: 1 }, [
          a("blockquote", null, s(r(tt)(h.value.answer, $.value.response, g.value)), 1),
          y.value ? (t(), i(E, { key: 0 }, [
            a("p", Ks, s(r(o)[y.value.verdict]), 1),
            y.value.understanding ? (t(), i("p", Zs, s(y.value.understanding), 1)) : m("", !0),
            y.value.expression ? (t(), i("p", Js, s(y.value.expression), 1)) : m("", !0),
            y.value.guidance ? (t(), i("p", Qs, s(y.value.guidance), 1)) : m("", !0)
          ], 64)) : (t(), i("small", Xs, s(r(we).saved), 1)),
          P.value < e.review.exercises.length ? (t(), i("button", {
            key: 2,
            type: "button",
            class: "learning-primary",
            onClick: V
          }, "下一张")) : m("", !0)
        ], 64)) : (t(), Y(Rt, {
          key: 0,
          modelValue: w.value,
          "onUpdate:modelValue": U[1] || (U[1] = (B) => w.value = B),
          response: $.value.response,
          paragraphs: g.value,
          disabled: e.disabled,
          onSubmit: A
        }, null, 8, [
          "modelValue",
          "response",
          "paragraphs",
          "disabled"
        ])),
        a("button", {
          type: "button",
          class: "learning-review-ask",
          "data-action": "ask",
          disabled: e.pending || !r(pe)("explain", e.state),
          onClick: U[2] || (U[2] = (B) => n("ask", $.value.id, e.review.id))
        }, s(r(we).ask), 9, _s)
      ], 2)) : m("", !0),
      v.value === "grading" ? (t(), i("div", er, [e.state.pending?.purpose === "review-assess" ? (t(), i(E, { key: 0 }, [
        U[9] || (U[9] = a("span", {
          class: "learning-working-dot",
          "aria-hidden": "true"
        }, null, -1)),
        U[10] || (U[10] = a("span", null, "正在批改这组复习…", -1)),
        a("button", {
          type: "button",
          disabled: e.pending,
          onClick: U[3] || (U[3] = (B) => n("action", "cancel"))
        }, "停止", 8, tr)
      ], 64)) : (t(), i(E, { key: 1 }, [
        a("span", null, s(r(we).ready), 1),
        a("button", {
          type: "button",
          disabled: e.disabled || !r(pe)("abandon-review", e.state),
          onClick: U[4] || (U[4] = (B) => n("confirm", "abandon-review", {}, r(me).review))
        }, "放下", 8, ar),
        a("button", {
          type: "button",
          disabled: e.disabled || !r(pe)("grade", e.state),
          onClick: U[5] || (U[5] = (B) => n("action", "grade", { unitId: e.review.id }))
        }, s(r(we).grade), 9, nr)
      ], 64))])) : m("", !0),
      v.value === "complete" && O.value ? (t(), i("div", ir, [U[11] || (U[11] = a("span", { class: "learning-muted" }, "这组复习已完成", -1)), a("button", {
        type: "button",
        "aria-expanded": !1,
        onClick: U[6] || (U[6] = (B) => j.value = !0)
      }, "查看结果")])) : v.value === "complete" ? (t(), i(E, { key: 3 }, [a("ul", lr, [(t(!0), i(E, null, D(e.review.exercises, (B, X) => (t(), i("li", { key: B.id }, [
        a("button", {
          type: "button",
          class: "learning-review-result",
          "aria-current": X === k.value,
          onClick: (ue) => K(X)
        }, [a("strong", null, s(N(B.itemId)?.label ?? B.prompt), 1), a("small", null, s(r(o)[e.review.assessments.find((ue) => ue.attemptId === d(B.id)?.id)?.verdict ?? "disputed"]), 1)], 8, sr),
        N(B.itemId)?.nextReviewAt ? (t(), i("button", {
          key: 0,
          type: "button",
          class: "learning-chip",
          "aria-expanded": T.value === B.id,
          onClick: (ue) => T.value = T.value === B.id ? "" : B.id
        }, s(r(at)(N(B.itemId).nextReviewAt)), 9, rr)) : m("", !0),
        T.value === B.id ? (t(), i("small", or, s(N(B.itemId)?.scheduleReason), 1)) : m("", !0)
      ]))), 128))]), W(Ht, {
        state: e.state,
        "unit-id": e.review.id,
        amount: e.review.reward.amount,
        label: "复习完成",
        disabled: e.disabled,
        quiet: I.value,
        onAction: U[7] || (U[7] = (B, X) => n("action", B, X))
      }, null, 8, [
        "state",
        "unit-id",
        "amount",
        "disabled",
        "quiet"
      ])], 64)) : m("", !0)
    ], 8, Ds));
  }
}), dr = ur, vr = {
  key: 0,
  class: "learning-source-choice",
  "aria-live": "polite"
}, cr = { class: "learning-row" }, gr = ["disabled"], mr = ["disabled"], pr = ["disabled"], br = ["disabled"], fr = ["disabled"], yr = {
  key: 1,
  class: "learning-preparation",
  "aria-live": "polite"
}, kr = {
  key: 0,
  class: "learning-turn-notice"
}, hr = { class: "learning-row" }, $r = ["disabled"], wr = /* @__PURE__ */ Q({
  __name: "LearningPreparation",
  props: {
    state: {},
    disabled: { type: Boolean },
    pending: { type: Boolean }
  },
  emits: ["action"],
  setup(e, { emit: c }) {
    const l = c;
    return (n, o) => e.state.sourceChoice ? (t(), i("section", vr, [
      a("p", null, s(e.state.sourceChoice === "unconfigured" ? r(ne).noWeb : e.state.preparation?.message || r(ne).unavailable), 1),
      a("div", cr, [
        e.state.sourceChoice === "unavailable" ? (t(), i("button", {
          key: 0,
          type: "button",
          class: "learning-primary",
          disabled: e.disabled,
          onClick: o[0] || (o[0] = (v) => l("action", "retry-source"))
        }, s(r(ne).retry), 9, gr)) : (t(), i("button", {
          key: 1,
          type: "button",
          class: "learning-primary",
          disabled: e.pending,
          onClick: o[1] || (o[1] = (v) => l("action", "research-settings"))
        }, s(r(ne).settings), 9, mr)),
        a("button", {
          type: "button",
          disabled: e.disabled,
          onClick: o[2] || (o[2] = (v) => l("action", "choose-original"))
        }, s(r(ne).original), 9, pr),
        a("button", {
          type: "button",
          disabled: e.pending,
          onClick: o[3] || (o[3] = (v) => l("action", "dismiss-source"))
        }, s(e.state.unit ? r(ne).existing : r(ne).dismiss), 9, br)
      ]),
      e.state.sourceChoice === "unavailable" ? (t(), i("button", {
        key: 0,
        type: "button",
        disabled: e.pending,
        onClick: o[4] || (o[4] = (v) => l("action", "research-settings"))
      }, s(r(ne).settings), 9, fr)) : m("", !0)
    ])) : !e.state.preparation?.running && (e.state.preparation || e.state.unit?.kind === "reading-writing" && !e.state.unit.preparation.ready) ? (t(), i("section", yr, [e.state.preparation?.message ? (t(), i("p", kr, s(e.state.preparation.message), 1)) : m("", !0), a("div", hr, [e.state.unit?.kind === "reading-writing" && !e.state.unit.preparation.ready ? (t(), i("button", {
      key: 0,
      type: "button",
      disabled: e.disabled,
      onClick: o[5] || (o[5] = (v) => l("action", "resume-preparation", { unitId: e.state.unit.id }))
    }, s(r(ne).resume), 9, $r)) : m("", !0)])])) : m("", !0);
  }
}), Ct = wr, xr = { class: "learning-workbench" }, Cr = {
  key: 1,
  class: "learning-due"
}, Ir = {
  key: 0,
  class: "learning-working",
  role: "status"
}, Lr = ["disabled"], Sr = ["disabled"], Ar = {
  key: 2,
  class: "learning-row"
}, Rr = ["disabled"], Mr = ["data-learning-unit-id"], Er = { class: "learning-eyebrow" }, Tr = { tabindex: "-1" }, Nr = {
  key: 0,
  class: "learning-muted"
}, Br = ["onClick"], Or = ["onClick"], qr = { class: "learning-row" }, Pr = ["disabled"], Ur = {
  key: 6,
  class: "learning-start"
}, Vr = ["disabled"], jr = {
  key: 0,
  tabindex: "-1"
}, Dr = { key: 1 }, Wr = ["aria-label"], Fr = { class: "learning-start-reading" }, Gr = ["disabled"], Hr = ["disabled"], zr = /* @__PURE__ */ Q({
  __name: "LearningWorkbench",
  props: {
    state: {},
    disabled: { type: Boolean },
    pending: { type: Boolean }
  },
  emits: [
    "action",
    "confirm",
    "present",
    "go",
    "ask",
    "record"
  ],
  setup(e, { emit: c }) {
    const l = e, n = (g) => l.disabled || !pe(g, l.state), o = c, v = L(() => !!l.state.review && l.state.review.stage.stage !== "complete"), d = L(() => l.state.unit), b = L(() => !d.value || l.state.completions.some((g) => g.unitId === d.value?.id)), C = L(() => l.state.busy && !l.state.pending), f = {
      start: "开始读写",
      reading: "读写练习",
      readingHint: "读一篇文章，写下你的看法",
      lesson: "专项练习",
      lessonHint: "练语法、词汇或听力",
      select: "选择语伴",
      selectFirst: "先选一位语伴",
      next: "接下来",
      settings: "学习设置",
      complete: "完成练习",
      notes: "笔记",
      review: "开始复习"
    }, k = L(() => [
      new Intl.DisplayNames(["zh-CN"], { type: "language" }).of(l.state.language),
      l.state.profile?.settings.exam,
      [l.state.profile?.settings.level, l.state.profile?.settings.targetLevel].filter(Boolean).join(" → ")
    ].filter(Boolean).join(" · "));
    function $(g) {
      o("action", "prepare", {
        kind: g,
        message: g === "reading-writing" ? "请按我的训练设置准备一篇读写训练。" : "请按我现在的情况准备一节专项小课。"
      });
    }
    const h = (g, u) => o("action", g, u), y = (g, u, w) => o("confirm", g, u, w);
    return (g, u) => (t(), i("div", xr, [
      !e.state.sourceChoice || !b.value ? (t(), Y(Ct, {
        key: 0,
        state: e.state,
        disabled: e.disabled,
        pending: e.pending,
        onAction: h
      }, null, 8, [
        "state",
        "disabled",
        "pending"
      ])) : m("", !0),
      e.state.dueCount && !v.value ? (t(), i("div", Cr, [a("span", null, s(r(qt)(e.state.dueCount)), 1), e.state.pending?.purpose === "review-prepare" ? (t(), i("span", Ir, [
        u[13] || (u[13] = a("span", {
          class: "learning-working-dot",
          "aria-hidden": "true"
        }, null, -1)),
        u[14] || (u[14] = a("span", null, "正在出题…", -1)),
        a("button", {
          type: "button",
          disabled: e.pending,
          onClick: u[0] || (u[0] = (w) => o("action", "cancel"))
        }, "停止", 8, Lr)
      ])) : e.state.blockedReview ? m("", !0) : (t(), i("button", {
        key: 1,
        type: "button",
        class: "learning-primary",
        disabled: n("start-review"),
        onClick: u[1] || (u[1] = (w) => o("action", "start-review"))
      }, s(f.review), 9, Sr))])) : m("", !0),
      e.state.blockedReview ? (t(), i("div", Ar, [u[15] || (u[15] = a("p", { class: "learning-muted" }, "有一组复习在另一个故事中进行。回到那个故事可以接着做；也可以放下它，在这里重新出题。", -1)), a("button", {
        type: "button",
        disabled: n("abandon-review"),
        onClick: u[2] || (u[2] = (w) => y("abandon-review", {}, r(me).review))
      }, "放下", 8, Rr)])) : m("", !0),
      e.state.review ? (t(), Y(dr, {
        key: 3,
        state: e.state,
        review: e.state.review,
        disabled: e.disabled,
        pending: e.pending,
        onAction: h,
        onConfirm: y,
        onAsk: u[3] || (u[3] = (w, P) => o("ask", w, void 0, P))
      }, null, 8, [
        "state",
        "review",
        "disabled",
        "pending"
      ])) : m("", !0),
      d.value?.kind === "reading-writing" ? (t(), Y(js, {
        key: 4,
        "data-learning-unit-id": d.value.id,
        state: e.state,
        unit: d.value,
        disabled: e.disabled,
        pending: e.pending,
        onAction: h,
        onConfirm: y,
        onAsk: u[4] || (u[4] = (w, P) => o("ask", w, P, d.value.id)),
        onRecord: u[5] || (u[5] = (w) => o("record", w))
      }, null, 8, [
        "data-learning-unit-id",
        "state",
        "unit",
        "disabled",
        "pending"
      ])) : d.value ? (t(), i("section", {
        key: 5,
        class: "learning-lesson",
        "data-learning-unit-id": d.value.id
      }, [
        a("p", Er, "专项小课 · 完成可得 " + s(d.value.reward.amount) + " 小白币", 1),
        a("h1", Tr, s(d.value.title), 1),
        d.value.goal ? (t(), i("p", Nr, s(d.value.goal), 1)) : m("", !0),
        (t(!0), i(E, null, D(d.value.materials, (w) => (t(), i("button", {
          key: w.id,
          type: "button",
          class: "learning-activity-link",
          onClick: (P) => o("present", {
            unitId: d.value.id,
            kind: "material",
            id: w.id,
            title: w.title
          })
        }, [
          W(z, { name: "book" }),
          a("span", null, s(w.title), 1),
          W(z, { name: "arrow" })
        ], 8, Br))), 128)),
        (t(!0), i(E, null, D(d.value.exercises, (w) => (t(), i("button", {
          key: w.id,
          type: "button",
          class: "learning-activity-link",
          onClick: (P) => o("present", {
            unitId: d.value.id,
            kind: "exercise",
            id: w.id,
            title: w.prompt
          })
        }, [
          W(z, { name: d.value.stage.exercises.find((P) => P.exerciseId === w.id)?.status === "done" ? "check" : "records" }, null, 8, ["name"]),
          a("span", null, s(w.prompt), 1),
          W(z, { name: "arrow" })
        ], 8, Or))), 128)),
        a("div", qr, [a("button", {
          type: "button",
          disabled: n("complete"),
          onClick: u[6] || (u[6] = (w) => o("action", "complete"))
        }, s(f.complete), 9, Pr), a("button", {
          type: "button",
          onClick: u[7] || (u[7] = (w) => o("go", "materials"))
        }, s(f.notes), 1)])
      ], 8, Mr)) : m("", !0),
      b.value ? (t(), i("section", Ur, [e.state.blockedUnit ? (t(), i(E, { key: 0 }, [
        u[16] || (u[16] = a("h1", { tabindex: "-1" }, "当前课件在另一个故事中", -1)),
        u[17] || (u[17] = a("p", { class: "learning-muted" }, "回到那个故事可以继续；也可以放下它，在这里重新开始。", -1)),
        a("button", {
          type: "button",
          disabled: n("abandon"),
          onClick: u[8] || (u[8] = (w) => y("abandon", {}, r(me).lesson))
        }, "放下并重新开始", 8, Vr)
      ], 64)) : (t(), i(E, { key: 1 }, [
        d.value ? (t(), i("h2", Dr, s(f.next), 1)) : (t(), i("h1", jr, s(e.state.teacher ? f.reading : f.selectFirst), 1)),
        e.state.teacher && !d.value ? (t(), i("button", {
          key: 2,
          type: "button",
          class: "learning-start-preference",
          "aria-label": `${f.settings}：${k.value}`,
          onClick: u[9] || (u[9] = (w) => o("go", "settings"))
        }, [a("span", null, [a("strong", null, s(f.settings), 1), a("small", null, s(k.value), 1)]), W(z, { name: "arrow" })], 8, Wr)) : m("", !0),
        e.state.sourceChoice ? (t(), Y(Ct, {
          key: 3,
          state: e.state,
          disabled: e.disabled,
          pending: e.pending,
          onAction: h
        }, null, 8, [
          "state",
          "disabled",
          "pending"
        ])) : m("", !0),
        e.state.teacher && !C.value && !e.state.sourceChoice ? (t(), i(E, { key: 4 }, [a("section", Fr, [
          W(z, { name: "workbook" }),
          a("p", null, s(f.readingHint), 1),
          a("button", {
            type: "button",
            class: "learning-primary",
            disabled: n("prepare"),
            onClick: u[10] || (u[10] = (w) => $("reading-writing"))
          }, [F(s(f.start), 1), W(z, { name: "arrow" })], 8, Gr)
        ]), a("button", {
          type: "button",
          class: "learning-start-secondary",
          disabled: n("prepare"),
          onClick: u[11] || (u[11] = (w) => $("lesson"))
        }, [
          W(z, { name: "records" }),
          a("span", null, [a("strong", null, s(f.lesson), 1), a("small", null, s(f.lessonHint), 1)]),
          W(z, { name: "arrow" })
        ], 8, Hr)], 64)) : e.state.teacher ? m("", !0) : (t(), i("button", {
          key: 5,
          type: "button",
          class: "learning-primary",
          onClick: u[12] || (u[12] = (w) => o("go", "profile"))
        }, s(f.select), 1))
      ], 64))])) : m("", !0)
    ]));
  }
}), Yr = zr;
function It(e) {
  try {
    return JSON.parse(e);
  } catch {
    return {};
  }
}
function Kr(e) {
  const c = [];
  for (const l of e.messages) l.role === "assistant" ? c.push({
    message: l,
    results: []
  }) : l.role === "tool" && c.at(-1)?.results.push(l);
  return c.map(({ message: l, results: n }, o) => ({
    index: o + 1,
    text: l.toolCalls?.length ? l.content : "",
    receivedChars: l.receivedChars,
    thinking: l.hasReasoning,
    streaming: !!l.streaming,
    tools: (l.toolCalls ?? []).map((v) => {
      const d = n.find((k) => k.toolCallId === v.id), b = It(d?.content ?? ""), C = e.status === "running", f = d?.error || b.ok === !1 ? "failed" : d?.content && !d.streaming ? "done" : !C || l.error ? "cancelled" : d?.streaming ? "running" : "preparing";
      return {
        id: v.id,
        name: v.name,
        status: f,
        input: It(v.arguments),
        result: b
      };
    })
  }));
}
var Zr = ["aria-label"], Jr = { class: "learning-process-header" }, Qr = ["aria-expanded"], Xr = { "aria-hidden": "true" }, _r = ["disabled", "aria-label"], eo = ["aria-label"], to = ["data-status"], ao = {
  class: "learning-process-dot",
  "aria-hidden": "true"
}, no = { key: 0 }, io = { class: "learning-process-result" }, lo = {
  key: 1,
  class: "learning-process-status",
  role: "status",
  "aria-live": "polite"
}, so = {
  key: 0,
  class: "learning-working-dot",
  "aria-hidden": "true"
}, ro = /* @__PURE__ */ Q({
  __name: "LearningProcess",
  props: {
    turn: {},
    stoppable: {
      type: Boolean,
      default: !1
    },
    disabled: {
      type: Boolean,
      default: !1
    }
  },
  emits: ["stop"],
  setup(e, { emit: c }) {
    const l = e, n = c, o = L(() => Kr(l.turn)), v = L(() => o.value.flatMap((g) => g.tools)), d = L(() => l.turn.status === "running"), b = L(() => ne.taskTitles[l.turn.purpose]), C = G(null), f = L(() => C.value ?? (d.value || l.turn.status === "failed")), k = G(null), $ = L(() => l.turn.progress?.round ?? o.value.at(-1)?.index), h = L(() => {
      if (!d.value) return Z.outcomes[l.turn.status];
      const g = o.value.at(-1), u = g?.tools.find((w) => w.status === "running" || w.status === "preparing");
      if (u) return `${Z.tools[u.name] ?? Z.title} · ${Z[u.status]}`;
      if (l.turn.progress?.stage === "provider" && g?.streaming) {
        if (g.receivedChars) return Z.received(g.receivedChars);
        if (g.thinking) return Z.thinking;
      }
      return ol(l.turn.progress ?? { stage: "provider" });
    });
    function y(g) {
      const u = [], w = g.result.section ?? g.input.section;
      w && Z.sections[w] && u.push(Z.sections[w]), g.result.resultsCount !== void 0 && u.push(Z.results(g.result.resultsCount)), g.result.paragraphCount !== void 0 && u.push(Z.paragraphs(g.result.paragraphCount)), g.result.dataCount !== void 0 && u.push(Z.entries(g.result.dataCount)), g.result.failedCount && u.push(Z.sourcesFailed(g.result.failedCount)), g.name === "LearningLessonEdit" && (g.input.materialsCount && u.push(Z.proposedMaterials(g.input.materialsCount)), g.input.exercisesCount && u.push(Z.proposedExercises(g.input.exercisesCount))), g.result.errorsCount && u.push(Z.issues(g.result.errorsCount));
      const P = (g.result.errorFields ?? []).map((T) => en[T]).filter(Boolean);
      return P.length && u.push(Z.checkFields([...new Set(P)].join("、"))), u.join(" · ");
    }
    return H(d, () => {
      C.value = null;
    }), H(() => l.turn.messages, async () => {
      const g = k.value, u = !g || g.scrollHeight - g.scrollTop - g.clientHeight < 48;
      await re(), u && k.value && (k.value.scrollTop = k.value.scrollHeight);
    }), (g, u) => d.value || v.value.length ? (t(), i("section", {
      key: 0,
      class: le(["learning-process", { "is-running": d.value }]),
      "aria-label": r(Z).title
    }, [
      a("header", Jr, [a("button", {
        type: "button",
        class: "learning-process-toggle",
        "aria-expanded": f.value,
        onClick: u[0] || (u[0] = (w) => C.value = !f.value)
      }, [
        a("span", Xr, s(f.value ? "⌄" : "›"), 1),
        a("strong", null, s(b.value ?? r(Z).title), 1),
        a("small", null, s(d.value && $.value ? r(Z).round($.value) : r(Z).history(v.value.length)), 1)
      ], 8, Qr), d.value && e.stoppable ? (t(), i("button", {
        key: 0,
        type: "button",
        class: "learning-process-stop",
        disabled: e.disabled,
        "aria-label": r(Z).stop,
        onClick: u[1] || (u[1] = (w) => n("stop"))
      }, "■", 8, _r)) : m("", !0)]),
      f.value ? (t(), i("div", {
        key: 0,
        ref_key: "body",
        ref: k,
        class: "learning-process-body"
      }, [(t(!0), i(E, null, D(o.value, (w) => (t(), i(E, { key: w.index }, [w.text ? (t(), Y(et, {
        key: 0,
        class: "learning-markdown learning-process-narration",
        text: w.text
      }, null, 8, ["text"])) : m("", !0), w.tools.length ? (t(), i("ol", {
        key: 1,
        class: "learning-process-steps",
        "aria-label": r(Z).round(w.index)
      }, [(t(!0), i(E, null, D(w.tools, (P) => (t(), i("li", {
        key: P.id,
        "data-status": P.status
      }, [
        a("span", ao, s(P.status === "done" ? "✓" : P.status === "failed" ? "!" : "·"), 1),
        a("div", null, [a("span", null, s(r(Z).tools[P.name] ?? r(Z).title), 1), y(P) ? (t(), i("small", no, s(y(P)), 1)) : m("", !0)]),
        a("small", io, s(r(Z)[P.status]), 1)
      ], 8, to))), 128))], 8, eo)) : m("", !0)], 64))), 128))], 512)) : m("", !0),
      !b.value || d.value || f.value ? (t(), i("p", lo, [d.value ? (t(), i("span", so)) : m("", !0), F(s(h.value), 1)])) : m("", !0)
    ], 10, Zr)) : m("", !0);
  }
}), Zt = ro;
function Te(e) {
  return e.kind === "reading-article" || e.kind === "reading-notes" || e.kind === "reading-essay";
}
function De(e) {
  return e.kind === "talk" || e.kind === "explain" || e.kind === "companion";
}
var Lt = {
  initial: "我想跟你学这门语言，先聊聊吧。",
  returning: "我来继续学语言了，先聊聊今天从哪里开始吧。"
}, oo = { class: "learning-messages" }, uo = /* @__PURE__ */ Q({
  __name: "LearningMessages",
  props: {
    turn: {},
    disabled: { type: Boolean }
  },
  emits: ["stop"],
  setup(e, { emit: c }) {
    const l = e, n = c, o = L(() => l.turn.messages.filter((v) => v.role === "assistant" && !v.toolCalls?.length && v.content));
    return (v, d) => (t(), i("div", oo, [W(Zt, {
      turn: e.turn,
      stoppable: "",
      disabled: e.disabled,
      onStop: d[0] || (d[0] = (b) => n("stop"))
    }, null, 8, ["turn", "disabled"]), (t(!0), i(E, null, D(o.value, (b, C) => (t(), i("div", {
      key: C,
      class: le(["learning-output", { "is-streaming": b.streaming }])
    }, [W(et, {
      class: "learning-markdown",
      text: b.content
    }, null, 8, ["text"])], 2))), 128))]));
  }
}), vo = uo, co = { class: "learning-conversation" }, go = { class: "learning-conversation-heading" }, mo = { class: "learning-person-initial" }, po = ["disabled"], bo = ["aria-label"], fo = {
  key: 0,
  class: "learning-history-notice"
}, yo = {
  key: 0,
  class: "learning-conversation-user"
}, ko = ["disabled", "onClick"], ho = {
  key: 3,
  class: "learning-conversation-tools"
}, $o = ["disabled"], wo = ["disabled"], xo = {
  key: 1,
  class: "learning-working",
  role: "status"
}, Co = {
  key: 2,
  class: "learning-turn-notice is-error",
  role: "status"
}, Io = {
  key: 3,
  class: "learning-conversation-empty"
}, Lo = ["disabled"], So = { class: "learning-composer-surface" }, Ao = {
  key: 0,
  class: "learning-composer-quote"
}, Ro = { class: "learning-composer-row" }, Mo = [
  "disabled",
  "maxlength",
  "onKeydown"
], Eo = [
  "type",
  "disabled",
  "aria-label",
  "title"
], To = /* @__PURE__ */ Q({
  __name: "LearningConversation",
  props: {
    state: {},
    disabled: { type: Boolean },
    pending: { type: Boolean }
  },
  emits: [
    "action",
    "present",
    "profile"
  ],
  setup(e, { expose: c, emit: l }) {
    const n = e, o = L(() => n.state.conversation.turns.map((q, M) => ({
      turn: q,
      index: M
    })).filter(({ turn: q }) => !Te({ kind: q.purpose ?? "talk" }) || q.status === "running")), v = {
      conversation: "和语伴聊天",
      history: "更早的聊天已收起",
      empty: "今天想聊什么？",
      select: "先选一位语伴",
      opening: "打个招呼"
    }, d = /* @__PURE__ */ new Set([
      "prepare",
      "complete",
      "grade",
      "revision-review",
      "model-essay",
      "review-prepare",
      "review-assess",
      "companion"
    ]), b = l, C = Ie().chat, f = ge(C, "text"), k = G(null), $ = G(null), h = G(null), y = ge(C, "focus");
    let g = null, u = 0;
    function w() {
      const q = h.value;
      q && (C.scroll = q.scrollTop, C.following = q.scrollHeight - q.scrollTop - q.clientHeight < 70);
    }
    async function P() {
      await re(), C.following && h.value && (h.value.scrollTop = h.value.scrollHeight);
    }
    function T() {
      const q = k.value;
      q?.clientWidth && (q.style.height = "auto", q.style.height = `${q.scrollHeight}px`, P());
    }
    H(f, T, { flush: "post" }), H(k, (q) => {
      if (g?.disconnect(), cancelAnimationFrame(u), !q) return;
      let M = 0;
      g = new ResizeObserver(([I]) => {
        I.contentRect.width !== M && (M = I.contentRect.width, cancelAnimationFrame(u), u = requestAnimationFrame(T));
      }), g.observe(q.parentElement);
    }, { flush: "post" }), xe(() => {
      h.value && (h.value.scrollTop = C.scroll), P();
    }), Ce(() => {
      h.value && (C.scroll = h.value.scrollTop), g?.disconnect(), cancelAnimationFrame(u);
    });
    function A() {
      if (n.disabled || !f.value.trim()) return;
      const q = f.value.trim();
      C.sent = {
        text: f.value,
        user: y.value?.selection ? `${q}

${y.value.selection.quote}` : q,
        after: n.state.conversation.turns.length + n.state.conversation.removedTurns
      }, C.following = !0, b("action", y.value ? "explain" : "talk", {
        message: q,
        ...y.value ?? C.study ?? {}
      });
    }
    H([() => n.state.conversation.turns, () => n.state.chatBusy], P);
    function V(q) {
      if (q.kind === "replacement") return !n.disabled && n.state.currentUnitId === q.unitId;
      const M = [n.state.unit, n.state.review].find((I) => I?.id === q.unitId);
      return !!M && (q.kind === "exercise" ? M.exercises : M.materials).some((I) => I.id === q.id);
    }
    const K = L(() => n.state.unit?.id === n.state.reply?.unitId ? n.state.unit : null);
    return c({
      async ask(q, M, I = n.state.unit?.id) {
        y.value = {
          unitId: I,
          exerciseId: q,
          selection: M
        }, C.study = I ? {
          unitId: I,
          exerciseId: q
        } : null, await re(), k.value?.focus();
      },
      focusHeading: () => $.value?.focus({ preventScroll: !0 })
    }), (q, M) => (t(), i("section", co, [
      a("header", go, [
        a("span", mo, s([...e.state.teacher?.name ?? "伴"][0]), 1),
        a("h1", {
          ref_key: "heading",
          ref: $,
          tabindex: "-1"
        }, s(e.state.teacher?.name ?? "语伴"), 513),
        a("button", {
          type: "button",
          disabled: e.disabled,
          "aria-label": "更换学习语言和语伴",
          onClick: M[0] || (M[0] = (I) => b("profile"))
        }, s(new Intl.DisplayNames(["zh-CN"], { type: "language" }).of(e.state.language)), 9, po)
      ]),
      a("div", {
        ref_key: "scroller",
        ref: h,
        class: "learning-conversation-turns",
        "aria-label": v.conversation,
        onScroll: w
      }, [
        e.state.conversation.removedTurns ? (t(), i("p", fo, s(v.history), 1)) : m("", !0),
        (t(!0), i(E, null, D(o.value, ({ turn: I, index: j }, O) => (t(), i("div", {
          key: e.state.conversation.removedTurns + j,
          class: "learning-conversation-turn"
        }, [
          I.user && !r(d).has(I.purpose) && !r(Te)({ kind: I.purpose ?? "talk" }) ? (t(), i("p", yo, s(I.user), 1)) : m("", !0),
          W(vo, {
            turn: I,
            disabled: e.pending,
            onStop: (N) => b("action", r(De)({ kind: I.purpose ?? "talk" }) ? "cancel-chat" : r(Te)({ kind: I.purpose ?? "talk" }) ? "cancel-preparation" : "cancel")
          }, null, 8, [
            "turn",
            "disabled",
            "onStop"
          ]),
          I.message ? (t(), i("p", {
            key: 1,
            class: le(["learning-turn-notice", { "is-error": I.status === "failed" }]),
            role: "status"
          }, s(I.message), 3)) : m("", !0),
          I.presentation ? (t(), i("button", {
            key: 2,
            type: "button",
            class: "learning-activity-link",
            disabled: !V(I.presentation),
            onClick: (N) => b("present", I.presentation)
          }, [
            W(z, { name: I.presentation.kind === "material" ? "book" : "records" }, null, 8, ["name"]),
            a("span", null, s(I.presentation.title), 1),
            W(z, { name: "arrow" })
          ], 8, ko)) : m("", !0),
          O === o.value.length - 1 && e.state.reply?.text === I.teacher ? (t(), i("div", ho, [[...I.teacher].length <= 1e3 ? (t(), i("button", {
            key: 0,
            type: "button",
            disabled: e.disabled,
            onClick: M[1] || (M[1] = (N) => b("action", "say-reply"))
          }, [W(z, { name: "sound" }), M[8] || (M[8] = F("听语伴说", -1))], 8, $o)) : m("", !0), e.state.reply.exerciseId && K.value && [...I.teacher].length <= 4e3 ? (t(), i("button", {
            key: 1,
            type: "button",
            disabled: e.disabled || K.value.notes.some((N) => N.text === I.teacher),
            onClick: M[2] || (M[2] = (N) => b("action", "save-note", { unitId: K.value.id }))
          }, "保存笔记", 8, wo)) : m("", !0)])) : m("", !0)
        ]))), 128)),
        e.state.chatBusy && !e.state.conversation.turns.some((I) => I.status === "running" && r(De)({ kind: I.purpose ?? "talk" })) ? (t(), i("div", xo, [M[9] || (M[9] = a("span", {
          class: "learning-working-dot",
          "aria-hidden": "true"
        }, null, -1)), a("span", null, s(e.state.chatMessage), 1)])) : !e.state.chatBusy && e.state.chatMessage ? (t(), i("p", Co, s(e.state.chatMessage), 1)) : m("", !0),
        !o.value.length && !e.state.chatBusy ? (t(), i("div", Io, [
          W(z, { name: "chat" }),
          a("p", null, s(e.state.teacher ? v.empty : v.select), 1),
          e.state.teacher ? (t(), i("button", {
            key: 1,
            type: "button",
            disabled: e.disabled,
            onClick: M[4] || (M[4] = (I) => b("action", "talk", { message: e.state.profile ? r(Lt).returning : r(Lt).initial }))
          }, s(v.opening), 9, Lo)) : (t(), i("button", {
            key: 0,
            class: "learning-primary",
            type: "button",
            onClick: M[3] || (M[3] = (I) => b("profile"))
          }, s(v.select), 1))
        ])) : m("", !0)
      ], 40, bo),
      e.state.teacher ? (t(), i("form", {
        key: 0,
        class: "learning-conversation-compose",
        onSubmit: ie(A, ["prevent"])
      }, [a("div", So, [y.value ? (t(), i("div", Ao, [a("span", null, s(y.value.selection?.quote ?? "请教这道题"), 1), a("button", {
        type: "button",
        "aria-label": "取消引用",
        onClick: M[5] || (M[5] = (I) => y.value = null)
      }, "×")])) : m("", !0), a("div", Ro, [te(a("textarea", {
        ref_key: "composer",
        ref: k,
        "onUpdate:modelValue": M[6] || (M[6] = (I) => f.value = I),
        rows: "1",
        disabled: e.state.chatStorage !== "ready",
        maxlength: y.value?.selection ? 1800 : y.value?.exerciseId ? 2e3 : 4e3,
        "aria-label": "和语伴说",
        placeholder: "和语伴说…",
        onKeydown: [ye(ie(A, ["ctrl", "prevent"]), ["enter"]), ye(ie(A, ["meta", "prevent"]), ["enter"])]
      }, null, 40, Mo), [[oe, f.value], [r(We), r(C)]]), a("button", {
        type: e.state.chatBusy ? "button" : "submit",
        class: le(e.state.chatBusy ? "learning-composer-stop" : "learning-primary"),
        disabled: e.state.chatBusy ? e.pending : e.disabled || !f.value.trim(),
        "aria-label": e.state.chatBusy ? "停止回复" : "发送给语伴",
        title: e.state.chatBusy ? "停止回复" : "发送给语伴",
        onClick: M[7] || (M[7] = ie((I) => e.state.chatBusy ? b("action", "cancel-chat") : A(), ["prevent"]))
      }, [W(z, { name: e.state.chatBusy ? "stop" : "send" }, null, 8, ["name"])], 10, Eo)])])], 32)) : m("", !0)
    ]));
  }
}), No = To;
function Bo(e) {
  const c = na(structuredClone(ia(e.initialState))), l = G(!1), n = G(null), o = L(() => n.value ? Nt[n.value] : ""), v = L(() => n.value === "unknown" || n.value === "rejected");
  let d = !1, b = 0, C = () => {
  };
  const f = (y) => !l.value && pe(y, c.value), k = L(() => f("submit")), $ = L(() => f("talk"));
  async function h(y, g = {}) {
    if (l.value) return;
    if (Kt(y, c.value)) {
      n.value = "busy";
      return;
    }
    l.value = !0, n.value = null;
    const u = c.value.chatIdentity, w = b;
    let P = !1;
    try {
      const T = JSON.parse(JSON.stringify({
        chatIdentity: u,
        ...g
      }));
      P = !0;
      const A = await e.bridge.request(`learning/${y}`, T, 35e3);
      return !d || c.value.chatIdentity !== u ? void 0 : (b === w && A.result.state.chatIdentity === u && (c.value = A.result.state), A.result.rejected && (n.value = A.result.rejected), A.result);
    } catch (T) {
      d && c.value.chatIdentity === u && (n.value = !P || T instanceof oa && T.code === "host_request_not_sent" ? "notSent" : T instanceof ra ? "rejected" : "unknown");
    } finally {
      d && (l.value = !1);
    }
  }
  return xe(() => {
    d = !0, C = e.bridge.subscribe((y) => {
      if (y.type === "learning/media") {
        c.value = {
          ...c.value,
          media: y.payload.media
        };
        return;
      }
      if (y.type !== "learning/state") return;
      const g = y.payload.state;
      g.chatIdentity === c.value.chatIdentity && (b++, c.value = g);
    });
  }), Ce(() => {
    d = !1, C();
  }), {
    state: c,
    pending: l,
    writable: k,
    canChat: $,
    canRequest: f,
    localIssue: n,
    localMessage: o,
    needsRefresh: v,
    request: h
  };
}
function Oo(e = Math.random) {
  return Math.round(3 * 6e4 + Math.min(Math.max(e(), 0), 1) * 9 * 6e4);
}
function qo(e) {
  let c = !1, l, n = 0;
  function o() {
    l !== void 0 && (e.clearTimer(l), l = void 0);
  }
  function v() {
    if (!c) return;
    const d = n;
    l = e.setTimer(() => {
      d === n && (l = void 0, c && (e.opportunity(), v()));
    }, Oo(e.random));
  }
  return {
    update(d) {
      c !== d && (c = d, n++, o(), v());
    },
    dispose() {
      c = !1, n++, o();
    }
  };
}
function Po(e) {
  const c = G(!1), l = G(!1), n = G(!1), o = G("");
  let v, d;
  const b = L(() => e.preference.enabled && e.reading.value && c.value && !e.blocked.value && !!e.state.value.teacher && e.state.value.storage === "ready"), C = L(() => b.value && !l.value && !n.value && !e.pending.value && !e.state.value.busy && !e.state.value.chatBusy && !e.state.value.companionBusy);
  function f() {
    const w = e.root.value?.querySelector(".learning-scroll")?.getBoundingClientRect(), P = w?.top ?? 0, T = [...e.root.value?.querySelectorAll("[data-material-id][data-paragraph-id]") ?? []].find((A) => A.getBoundingClientRect().bottom > P + 60 && A.getBoundingClientRect().top < (w?.bottom ?? 0));
    return T ? {
      materialId: T.dataset.materialId,
      paragraphId: T.dataset.paragraphId
    } : null;
  }
  const k = qo({
    setTimer: (w, P) => setTimeout(w, P),
    clearTimer: (w) => clearTimeout(w),
    opportunity: () => {
      const w = f();
      w && e.request("companion", w);
    }
  });
  H(C, (w) => k.update(w), { immediate: !0 }), H([
    b,
    l,
    n,
    e.pending,
    () => e.state.value.companionBusy
  ], ([w, P, T, A, V]) => {
    V && !A && (!w || P || T) && e.request("cancel-companion");
  });
  function $() {
    const w = document.activeElement;
    l.value = w instanceof HTMLElement && !!e.root.value?.contains(w) && w.matches("textarea, input:not([type=checkbox],[type=radio],[type=range]), [contenteditable=true]");
  }
  const h = () => queueMicrotask($);
  function y(w) {
    !(w.target instanceof HTMLElement) || !w.target.matches("textarea, input:not([type=checkbox],[type=radio],[type=range]), [contenteditable=true]") || (clearTimeout(v), n.value = !0, v = setTimeout(() => {
      n.value = !1;
    }, 3e4));
  }
  function g() {
    c.value = document.visibilityState === "visible", c.value || (clearTimeout(v), n.value = !1, u()), $();
  }
  function u() {
    clearTimeout(d), o.value = "";
  }
  return H(() => e.state.value.remark?.text ?? "", (w) => {
    u(), w && e.reading.value && c.value && !l.value && !e.blocked.value && (o.value = w, d = setTimeout(u, 1e4));
  }), H([
    e.reading,
    e.blocked,
    l
  ], ([w, P, T]) => {
    (!w || P || T) && u();
  }), xe(() => {
    g(), document.addEventListener("visibilitychange", g), e.root.value?.addEventListener("focusin", h), e.root.value?.addEventListener("focusout", h), e.root.value?.addEventListener("input", y);
  }), Ce(() => {
    k.dispose(), clearTimeout(v), u(), document.removeEventListener("visibilitychange", g), e.root.value?.removeEventListener("focusin", h), e.root.value?.removeEventListener("focusout", h), e.root.value?.removeEventListener("input", y);
  }), {
    bubble: o,
    dismiss: u
  };
}
var Uo = { class: "learning-toolbar" }, Vo = {
  key: 0,
  class: "learning-unread-dot",
  "aria-hidden": "true"
}, jo = {
  key: 1,
  class: "learning-layout-control"
}, Do = ["min", "max"], Wo = { "aria-label": "学习资料与设置" }, Fo = { "aria-label": "学习资料与设置" }, Go = ["onClick"], Ho = {
  key: 0,
  class: "learning-notice",
  role: "status",
  "aria-live": "polite"
}, zo = { class: "learning-row" }, Yo = ["disabled"], Ko = ["disabled"], Zo = ["disabled"], Jo = ["disabled"], Qo = {
  key: 1,
  class: "learning-notice",
  role: "status",
  "aria-live": "polite"
}, Xo = { class: "learning-row" }, _o = ["disabled"], eu = ["disabled"], tu = ["inert", "aria-hidden"], au = {
  key: 1,
  class: "learning-working",
  role: "status"
}, nu = ["disabled"], iu = {
  key: 4,
  class: "learning-materials-page"
}, lu = {
  key: 0,
  class: "learning-empty-note"
}, su = { class: "learning-materials-title" }, ru = ["onClick"], ou = ["onClick"], uu = {
  key: 0,
  class: "learning-notes"
}, du = { key: 0 }, vu = ["disabled", "onClick"], cu = {
  key: 6,
  class: "learning-harvest-page"
}, gu = {
  key: 0,
  class: "learning-empty-note"
}, mu = { key: 0 }, pu = { class: "learning-muted" }, bu = ["disabled", "onClick"], fu = ["disabled"], yu = ["disabled"], ku = {
  key: 3,
  class: "learning-row"
}, hu = ["disabled"], $u = ["disabled"], wu = {
  key: 7,
  class: "learning-settings-page"
}, xu = ["value", "disabled"], Cu = ["value"], Iu = {
  key: 0,
  class: "learning-settings-goal"
}, Lu = {
  key: 0,
  class: "learning-muted"
}, Su = ["value", "disabled"], Au = ["disabled"], Ru = ["disabled"], Mu = ["disabled"], Eu = ["disabled"], Tu = ["disabled"], Nu = ["disabled"], Bu = ["disabled"], Ou = ["inert", "aria-hidden"], qu = ["aria-label"], Pu = { class: "learning-person-initial" }, Uu = {
  key: 0,
  class: "learning-unread-dot",
  "aria-hidden": "true"
}, Vu = ["aria-label"], ju = {
  key: 0,
  class: "learning-unread-dot",
  "aria-hidden": "true"
}, Du = {
  role: "alertdialog",
  "aria-labelledby": "learning-confirm-title",
  class: "learning-confirm"
}, Wu = { id: "learning-confirm-title" }, Fu = { class: "learning-row" }, Gu = ["disabled"], Hu = /* @__PURE__ */ Q({
  __name: "LearningApp",
  props: {
    bridge: {},
    initialState: {}
  },
  setup(e) {
    const c = e, l = {
      cancel: "取消",
      working: "正在准备学习内容…",
      verify: "查看保存结果",
      retry: "重新保存",
      adopt: "使用已保存记录",
      adoptWarning: "这次尚未保存成功的修改将被放弃，改用已保存的学习记录。",
      replaceWarning: "新练习准备好后，会替换这次的材料、作答和笔记。学习本中的记录和已获得的奖励会保留。",
      verifyWallet: "查看钱包状态",
      adoptWallet: "使用已保存钱包",
      adoptWalletWarning: "这次尚未保存成功的钱包修改将被放弃，改用已保存的钱包。",
      voiceDisabled: "还没有开启语音，文字学习不受影响。"
    }, { state: n, pending: o, writable: v, canChat: d, canRequest: b, localMessage: C, needsRefresh: f, request: k } = Bo(c), $ = mn(n);
    async function h(S, p = {}, x = !1) {
      if (!x && gn($, n.value, S, p)) {
        ce(S, p, S === "teacher" ? me.companion : me.context);
        return;
      }
      return k(S, p);
    }
    const y = G(n.value.teacher ? "home" : "profile"), g = [], u = G(null), w = G(!1);
    Ve(() => u.value?.open ? (u.value.open = !1, !0) : !1, () => w.value);
    const P = G(null), T = G(null), A = G(null), V = {}, K = G(null), q = G(0), M = L(() => q.value >= 760), I = G("work"), j = G(!0), O = G(!1), N = G(62), R = L(() => Math.max(42, Math.ceil(320 / Math.max(q.value, 1) * 100))), U = L(() => Math.min(68, Math.floor((1 - 320 / Math.max(q.value, 1)) * 100))), B = L({
      get: () => M.value ? Math.min(U.value, Math.max(R.value, N.value)) : N.value,
      set: (S) => {
        N.value = S;
      }
    }), X = G(!1);
    let ue, ae;
    const be = () => {
      X.value = ae?.matches ?? !1;
    };
    xe(() => {
      ae = matchMedia("(prefers-reduced-motion: reduce)"), be(), ae.addEventListener("change", be), !(!K.value || typeof ResizeObserver > "u") && (ue = new ResizeObserver(([S]) => {
        q.value = S?.contentRect.width ?? 0;
      }), ue.observe(K.value));
    }), Ce(() => {
      ue?.disconnect(), ae?.removeEventListener("change", be);
    });
    const se = L(() => M.value || I.value === "work"), Ne = L(() => !!n.value.teacher && (M.value || I.value === "chat"));
    H([
      se,
      Ne,
      X
    ], async ([S, p, x], _, Pe) => {
      let Me = !0, vt;
      if (Pe(() => {
        Me = !1, clearTimeout(vt);
      }), S && (j.value = !0), p && (O.value = !0), await re(), !Me) return;
      S && A.value && (A.value.scrollTop = V[y.value] ?? 0);
      const ct = () => {
        j.value = S, O.value = p;
      };
      M.value || x ? ct() : vt = setTimeout(ct, 320);
    }, { immediate: !0 });
    function Fe() {
      se.value && A.value && (V[y.value] = A.value.scrollTop), Se();
    }
    async function Se(S) {
      const p = S?.target instanceof Element ? S.target : null;
      if (await re(), !se.value || y.value !== "home" || !A.value) return;
      const x = A.value.getBoundingClientRect(), _ = p?.closest("[data-learning-unit-id]") ?? [...A.value.querySelectorAll("[data-learning-unit-id]")].find((Pe) => {
        const Me = Pe.getBoundingClientRect();
        return Me.bottom > x.top + 48 && Me.top < x.bottom;
      });
      _?.dataset.learningUnitId && ($.chat.study = {
        unitId: _.dataset.learningUnitId,
        exerciseId: _.dataset.exerciseId
      });
    }
    H([
      A,
      y,
      se
    ], () => {
      Se();
    }, { flush: "post" });
    const Ge = L(() => {
      const { turns: S, removedTurns: p } = n.value.conversation;
      let x = S.length - 1;
      for (; x >= 0 && Te({ kind: S[x].purpose ?? "talk" }); ) x--;
      return x < 0 ? 0 : p + x + 1;
    }), He = G(Ge.value);
    H([Ge, Ne], ([S, p]) => {
      (p || S < He.value) && (He.value = S);
    }, { immediate: !0 });
    const nt = L(() => Ge.value > He.value), Ae = L(() => {
      const S = n.value.conversation.turns;
      let p = S.length - 1;
      for (; p >= 0 && De({ kind: S[p].purpose ?? "talk" }); ) p--;
      let x = S.length - 1;
      for (; x >= 0 && (S[x].status !== "running" || De({ kind: S[x].purpose ?? "talk" })); ) x--;
      return x >= 0 && (p = x), p < 0 ? null : {
        turn: n.value.conversation.turns[p],
        key: `${n.value.chatIdentity}:${n.value.language}:${n.value.conversation.removedTurns + p}`
      };
    });
    async function it() {
      n.value.teacher && (await Se(), Fe(), I.value = "chat", O.value = !0, await re(), I.value === "chat" && P.value?.focusHeading());
    }
    async function ze() {
      j.value = !0, I.value = "work", await re(), A.value && (A.value.scrollTop = V[y.value] ?? 0);
      const S = A.value?.querySelector("h1, h2");
      S && (S.tabIndex = -1, S.focus({ preventScroll: !0 }));
    }
    let lt = 0;
    H(() => !!n.value.record, async (S, p) => {
      y.value !== "books" || S === p || (S && (lt = A.value?.scrollTop ?? 0), await re(), y.value === "books" && A.value && (A.value.scrollTop = S ? 0 : lt));
    });
    const ee = G(null), st = G(null);
    At(st, () => {
      ee.value = null;
    });
    const Be = G(n.value.profile?.voice?.voiceId ?? n.value.voices.defaultVoice), Oe = G(n.value.profile?.voice?.language ?? n.value.language), qe = G(n.value.profile?.voice?.speed ?? 1), fe = G(0), Jt = L(() => n.value.completions.slice(fe.value * 20, (fe.value + 1) * 20));
    H([() => n.value.language, () => n.value.profile?.voice], ([S, p]) => {
      Be.value = p?.voiceId ?? n.value.voices.defaultVoice, Oe.value = p?.language ?? S, qe.value = p?.speed ?? 1;
    }), H([
      () => n.value.chatIdentity,
      () => n.value.language,
      () => n.value.teacher?.name
    ], () => {
      T.value = null, ee.value = null, fe.value = 0;
    }), H(() => !!n.value.teacher, (S) => {
      S || (I.value = "work");
    }), H(() => n.value.currentUnitId, (S) => {
      ee.value?.action === "replace-lesson" && ee.value.input.unitId !== S && (ee.value = null);
    }), H(() => n.value.unit, (S) => {
      const p = T.value;
      p && (S?.id !== p.unitId || !(p.kind === "exercise" ? S.exercises : S.materials).some((x) => x.id === p.id)) && Ye();
    }), H(() => {
      const S = n.value.conversation.turns.at(-1)?.presentation;
      return S ? `${n.value.conversation.turns.length + n.value.conversation.removedTurns}:${S.unitId}:${S.kind}:${S.id}` : "";
    }, (S) => {
      const p = n.value.conversation.turns.at(-1)?.presentation;
      S && p && Re(p, !0);
    });
    const ke = G(!1);
    H([se, y], ([S, p]) => {
      S && p === "home" && (ke.value = !1);
    });
    async function Re(S, p = !1) {
      if (S.kind === "replacement") {
        if (n.value.currentUnitId !== S.unitId || n.value.storage !== "ready") return;
        ce("replace-lesson", {
          unitId: S.unitId,
          message: S.message,
          kind: S.unitKind
        }, l.replaceWarning);
        return;
      }
      if (n.value.review?.id === S.unitId) {
        if (p) {
          (!se.value || y.value !== "home") && (ke.value = !0);
          return;
        }
        const x = $.unit(S.unitId).review;
        S.kind === "exercise" && (x.index = n.value.review.exercises.findIndex((_) => _.id === S.id)), x.expanded = !0, await Ke();
        return;
      }
      if (n.value.unit?.id === S.unitId) {
        if (n.value.unit.kind === "reading-writing") {
          if (p) {
            (!se.value || y.value !== "home") && (ke.value = !0);
            return;
          }
          $.unit(S.unitId).reading.view = "reading", await ve("home");
          const x = S.kind === "exercise" ? `[data-exercise-id="${CSS.escape(S.id)}"]` : `[data-material-id="${CSS.escape(S.id)}"][data-paragraph-id]`;
          A.value?.querySelector(x)?.scrollIntoView({
            block: "start",
            behavior: matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth"
          });
          return;
        }
        T.value = S;
      }
    }
    function Ye() {
      T.value = null, h("stop");
    }
    async function rt(S, p, x) {
      Ye(), Fe(), I.value = "chat", O.value = !0, await re(), await P.value?.ask(S, p, x);
    }
    async function ve(S, p = !1) {
      if (S !== y.value && !p) if (S === "home") g.length = 0;
      else {
        const x = g.indexOf(S);
        x >= 0 ? g.splice(x) : g.push(y.value);
      }
      if (A.value && (V[y.value] = A.value.scrollTop), u.value && (u.value.open = !1), y.value = S, await ze(), await re(), A.value) {
        A.value.scrollTop = V[S] ?? 0;
        const x = [...A.value.querySelectorAll("h1, h2")].find((_) => _.offsetParent !== null);
        x && (x.tabIndex = -1, x.focus({ preventScroll: !0 }));
      }
    }
    function ot() {
      $.setup.step = 0, ve("profile");
    }
    async function Ke() {
      await ve("home"), A.value && (A.value.scrollTop = 0);
      const S = A.value?.querySelector("#learning-review-title");
      S && (S.tabIndex = -1, S.focus({ preventScroll: !0 }));
    }
    async function Ze(S, p = {}, x = !1) {
      if (S === "prepare" && !n.value.profile) {
        $.setup.step = n.value.teacher ? 2 : 0, await ve("profile");
        return;
      }
      S === "start-review" && await Ke();
      const _ = n.value.unit;
      _?.kind === "reading-writing" && p.unitId === _.id && [
        "grade",
        "submit-revision",
        "skip-revision"
      ].includes(S) && ($.unit(_.id).reading.view = S !== "grade" || [
        "reviewing",
        "model",
        "complete"
      ].includes(_.stage.stage) ? "model" : "feedback", await ve("home"), A.value && (A.value.scrollTop = 0)), await h(S, p, x);
    }
    H(() => $.settings.submitted, (S, p) => {
      !S && p && !$.settings.open && y.value === "profile" && $.setup.step === 2 && n.value.storage === "ready" && !n.value.busy && n.value.profile && Object.entries(p.value).every(([x, _]) => n.value.profile.settings[x] === _) && ve("home");
    }), H(() => n.value.busy, (S) => {
      const p = n.value.unit;
      !S && p?.stage.stage === "revising" && $.unit(p.id).reading.view === "model" && ($.unit(p.id).reading.view = "feedback");
    });
    const ut = Ve(() => u.value?.open ? (u.value.open = !1, !0) : !M.value && I.value === "chat" ? (ze(), !0) : y.value === "home" || !g.length && y.value === "profile" && !n.value.teacher ? !1 : (ve(g.pop() ?? "home", !0), !0));
    function ce(S, p, x) {
      ee.value = {
        action: S,
        input: p,
        text: x
      };
    }
    async function Qt(S) {
      await h("records", {
        id: S,
        offset: n.value.records.offset
      }), n.value.record?.id === S && await ve("books");
    }
    const { bubble: dt, dismiss: Je } = Po({
      root: K,
      state: n,
      pending: o,
      preference: $.companion,
      reading: L(() => se.value && y.value === "home" && n.value.unit?.kind === "reading-writing" && [
        "writing",
        "grading",
        "complete"
      ].includes(n.value.unit.stage.stage)),
      blocked: L(() => !!T.value || !!ee.value || w.value),
      request: h
    });
    async function Xt() {
      const S = await h("export");
      if (!S?.document) return;
      const p = URL.createObjectURL(new Blob([JSON.stringify(S.document, null, 2)], { type: "application/json" })), x = document.createElement("a");
      x.href = p, x.download = "LittleWhiteBox_Learning.json", x.click(), setTimeout(() => URL.revokeObjectURL(p), 1e3);
    }
    return (S, p) => (t(), i("section", {
      ref_key: "root",
      ref: K,
      class: "learning-app",
      style: St({
        "--learning-switch-ms": `${r(320)}ms`,
        "--learning-work-share": `${B.value}%`
      }),
      "aria-label": "语伴语言学习"
    }, [
      a("header", Uo, [
        y.value !== "home" && (r(n).teacher || g.length) && (M.value || I.value === "work") ? (t(), i("button", {
          key: 0,
          type: "button",
          class: "learning-toolbar-back",
          "aria-label": "返回上一页",
          onClick: p[0] || (p[0] = (...x) => r(ut) && r(ut)(...x))
        }, [W(z, { name: "back" })])) : m("", !0),
        a("button", {
          type: "button",
          class: "learning-wordmark",
          onClick: p[1] || (p[1] = (x) => ve("home"))
        }, [
          p[33] || (p[33] = a("span", {
            class: "learning-brand-mark",
            "aria-hidden": "true"
          }, [F("a"), a("span", null, "あ")], -1)),
          p[34] || (p[34] = F("语伴", -1)),
          ke.value && (M.value || I.value === "work") ? (t(), i("span", Vo)) : m("", !0)
        ]),
        M.value && r(n).teacher ? (t(), i("label", jo, [
          W(z, { name: "workbook" }),
          te(a("input", {
            "onUpdate:modelValue": p[2] || (p[2] = (x) => B.value = x),
            type: "range",
            min: R.value,
            max: U.value,
            step: "1",
            "aria-label": "阅读区宽度比例"
          }, null, 8, Do), [[
            oe,
            B.value,
            void 0,
            { number: !0 }
          ]]),
          W(z, { name: "chat" })
        ])) : m("", !0),
        a("details", {
          ref_key: "menu",
          ref: u,
          class: "learning-menu",
          onToggle: p[3] || (p[3] = (x) => w.value = !!u.value?.open),
          onKeydown: p[4] || (p[4] = ye(ie((x) => u.value.open = !1, ["stop", "prevent"]), ["esc"]))
        }, [a("summary", Wo, [W(z, { name: "more" })]), a("nav", Fo, [(t(), i(E, null, D([
          ["books", "语法本与生词本"],
          ["materials", "课件与笔记"],
          ["harvest", "我的收获"],
          ["settings", "设置"]
        ], ([x, _]) => a("button", {
          key: x,
          type: "button",
          onClick: (Pe) => ve(x)
        }, s(_), 9, Go)), 64))])], 544)
      ]),
      r(C) || !r(n).busy && (r(n).message || r(n).storage !== "ready") ? (t(), i("div", Ho, [F(s(r(C) || r(n).message || (r(n).storage === "unconfirmed" ? r(Xe).unconfirmed : r(n).storage === "conflict" ? r(Xe).conflict : r(Xe).unloaded)) + " ", 1), a("div", zo, [
        r(n).storage === "unconfirmed" || r(n).storage === "conflict" ? (t(), i("button", {
          key: 0,
          type: "button",
          disabled: r(o),
          onClick: p[5] || (p[5] = (x) => h("verify"))
        }, s(l.verify), 9, Yo)) : m("", !0),
        r(n).storage === "unconfirmed" ? (t(), i("button", {
          key: 1,
          type: "button",
          disabled: r(o),
          onClick: p[6] || (p[6] = (x) => h("retry-save"))
        }, s(l.retry), 9, Ko)) : m("", !0),
        r(n).storage === "conflict" ? (t(), i("button", {
          key: 2,
          type: "button",
          disabled: r(o),
          onClick: p[7] || (p[7] = (x) => ce("adopt-server", {}, l.adoptWarning))
        }, s(l.adopt), 9, Zo)) : m("", !0),
        r(n).storage === "unloaded" || r(f) ? (t(), i("button", {
          key: 3,
          type: "button",
          disabled: r(o),
          onClick: p[8] || (p[8] = (x) => h("read"))
        }, s(r(Nt).refresh), 9, Jo)) : m("", !0)
      ])])) : m("", !0),
      [
        "unconfirmed",
        "conflict",
        "failed"
      ].includes(r(n).chatStorage) ? (t(), i("div", Qo, [F(s(r(n).chatStorage === "unconfirmed" ? r($e).unconfirmed : r(n).chatStorage === "conflict" ? r($e).conflict : r($e).failed) + " ", 1), a("div", Xo, [a("button", {
        type: "button",
        disabled: !r(b)("verify-teacher"),
        onClick: p[9] || (p[9] = (x) => h("verify-teacher"))
      }, s(r($e).verify), 9, _o), r(n).chatStorage !== "failed" ? (t(), i("button", {
        key: 0,
        type: "button",
        disabled: !r(b)("adopt-teacher"),
        onClick: p[10] || (p[10] = (x) => ce("adopt-teacher", {}, r($e).adoptWarning))
      }, s(r($e).adopt), 9, eu)) : m("", !0)])])) : m("", !0),
      a("div", { class: le(["learning-stage", {
        "is-wide": M.value,
        "is-chat": !M.value && I.value === "chat"
      }]) }, [
        a("div", {
          class: "learning-pane is-work",
          inert: !se.value,
          "aria-hidden": !se.value
        }, [a("div", {
          ref_key: "scroller",
          ref: A,
          class: "learning-scroll",
          onScrollPassive: Fe,
          onClick: Se,
          onFocusin: Se
        }, [j.value ? (t(), i(E, { key: 0 }, [
          Ae.value ? (t(), Y(Zt, {
            key: Ae.value.key,
            turn: Ae.value.turn,
            stoppable: "",
            disabled: r(o),
            onStop: p[11] || (p[11] = (x) => h(r(Te)({ kind: Ae.value.turn.purpose ?? "talk" }) ? "cancel-preparation" : "cancel"))
          }, null, 8, ["turn", "disabled"])) : m("", !0),
          r(n).busy && Ae.value?.turn.status !== "running" ? (t(), i("div", au, [
            p[35] || (p[35] = a("span", {
              class: "learning-working-dot",
              "aria-hidden": "true"
            }, null, -1)),
            a("span", null, s(r(n).message || l.working), 1),
            a("button", {
              type: "button",
              disabled: r(o),
              onClick: p[12] || (p[12] = (x) => h("cancel"))
            }, "停止", 8, nu)
          ])) : m("", !0),
          y.value === "home" ? (t(), Y(Yr, {
            key: 2,
            state: r(n),
            disabled: !r(v),
            pending: r(o),
            onAction: Ze,
            onConfirm: ce,
            onPresent: Re,
            onGo: ve,
            onAsk: rt,
            onRecord: Qt
          }, null, 8, [
            "state",
            "disabled",
            "pending"
          ])) : m("", !0),
          y.value === "profile" ? (t(), Y(_i, {
            key: 3,
            state: r(n),
            disabled: !r(b)("language"),
            onAction: h
          }, null, 8, ["state", "disabled"])) : m("", !0),
          y.value === "materials" ? (t(), i("section", iu, [
            p[36] || (p[36] = a("h1", null, "课件与笔记", -1)),
            r(n).unit ? m("", !0) : (t(), i("p", lu, s(r(n).blockedUnit ? "当前课件在另一个故事中" : "还没有课件"), 1)),
            r(n).unit ? (t(), i(E, { key: 1 }, [
              a("p", su, s(r(n).unit.title), 1),
              (t(!0), i(E, null, D(r(n).unit.materials, (x) => (t(), i("button", {
                key: x.id,
                type: "button",
                class: "learning-activity-link",
                onClick: (_) => Re({
                  unitId: r(n).unit.id,
                  kind: "material",
                  id: x.id,
                  title: x.title
                })
              }, [
                W(z, { name: "book" }),
                a("span", null, s(x.title), 1),
                W(z, { name: "arrow" })
              ], 8, ru))), 128)),
              (t(!0), i(E, null, D(r(n).unit.exercises, (x) => (t(), i("button", {
                key: x.id,
                type: "button",
                class: "learning-activity-link",
                onClick: (_) => Re({
                  unitId: r(n).unit.id,
                  kind: "exercise",
                  id: x.id,
                  title: x.prompt
                })
              }, [
                W(z, { name: "records" }),
                a("span", null, s(x.prompt), 1),
                W(z, { name: "arrow" })
              ], 8, ou))), 128)),
              r(n).unit.notes.length ? (t(), i("section", uu, [(t(!0), i(E, null, D(r(n).unit.notes, (x) => (t(), i("article", { key: x.id }, [
                x.selection ? (t(), i("blockquote", du, s(x.selection.quote), 1)) : m("", !0),
                a("p", null, s(x.text), 1),
                a("button", {
                  type: "button",
                  disabled: !r(v),
                  onClick: (_) => h("delete-note", { id: x.id })
                }, "删除笔记", 8, vu)
              ]))), 128))])) : m("", !0)
            ], 64)) : m("", !0)
          ])) : m("", !0),
          y.value === "books" ? (t(), Y(wi, {
            key: 5,
            state: r(n),
            disabled: !r(b)("start-review"),
            onAction: Ze,
            onReview: Ke,
            onRemove: ce
          }, null, 8, ["state", "disabled"])) : m("", !0),
          y.value === "harvest" ? (t(), i("section", cu, [
            p[38] || (p[38] = a("div", { class: "learning-page-heading" }, [a("h1", null, "我的收获")], -1)),
            r(n).completions.length ? m("", !0) : (t(), i("p", gu, "还没有完成的课程")),
            (t(!0), i(E, null, D(Jt.value, (x) => (t(), i("article", {
              key: x.unitId,
              class: "learning-harvest-entry"
            }, [
              a("small", null, s(new Date(x.completedAt).toLocaleDateString()), 1),
              x.rewardStatus !== "retired" ? (t(), i("h2", mu, [F(s(x.rewardStatus === "paid" ? "+" : "") + s(x.amount), 1), p[37] || (p[37] = a("span", null, "小白币", -1))])) : m("", !0),
              a("p", null, s(x.summary), 1),
              a("p", pu, s(x.rewardStatus === "paid" ? r(de).paid : x.rewardStatus === "retired" ? r(de).retired : r(de).pending), 1),
              x.rewardStatus !== "paid" && x.rewardStatus !== "retired" ? (t(), i("button", {
                key: 1,
                type: "button",
                disabled: !r(v) || r(n).walletStorage !== "ready",
                onClick: (_) => h("reward", {
                  unitId: x.unitId,
                  openWallet: !r(n).walletOpen
                })
              }, s(r(n).walletOpen ? r(de).claim : r(de).openWallet), 9, bu)) : m("", !0)
            ]))), 128)),
            r(n).walletStorage === "unconfirmed" || r(n).walletStorage === "conflict" || r(n).walletStorage === "failed" ? (t(), i("button", {
              key: 1,
              type: "button",
              disabled: r(o) || r(n).busy,
              onClick: p[13] || (p[13] = (x) => h("verify-wallet"))
            }, s(l.verifyWallet), 9, fu)) : m("", !0),
            r(n).walletStorage === "conflict" ? (t(), i("button", {
              key: 2,
              type: "button",
              disabled: r(o) || r(n).busy,
              onClick: p[14] || (p[14] = (x) => ce("adopt-wallet", {}, l.adoptWalletWarning))
            }, s(l.adoptWallet), 9, yu)) : m("", !0),
            r(n).completions.length > 20 ? (t(), i("div", ku, [a("button", {
              type: "button",
              disabled: fe.value === 0,
              onClick: p[15] || (p[15] = (x) => fe.value--)
            }, "上一页", 8, hu), a("button", {
              type: "button",
              disabled: (fe.value + 1) * 20 >= r(n).completions.length,
              onClick: p[16] || (p[16] = (x) => fe.value++)
            }, "下一页", 8, $u)])) : m("", !0)
          ])) : m("", !0),
          y.value === "settings" ? (t(), i("section", wu, [
            p[48] || (p[48] = a("h1", null, "学习设置", -1)),
            a("label", null, [p[39] || (p[39] = F("当前语言", -1)), a("select", {
              value: r(n).language,
              disabled: !r(b)("language"),
              onChange: p[17] || (p[17] = (x) => {
                h("language", { language: x.target.value }), x.target.value = r(n).language;
              })
            }, [(t(!0), i(E, null, D([.../* @__PURE__ */ new Set([r(n).language, ...r(n).languages])], (x) => (t(), i("option", {
              key: x,
              value: x
            }, s(new Intl.DisplayNames(["zh-CN"], { type: "language" }).of(x)), 9, Cu))), 128))], 40, xu)]),
            a("button", {
              type: "button",
              onClick: ot
            }, "更换语言和语伴 →"),
            W(Gt),
            a("section", null, [
              p[40] || (p[40] = a("h2", null, "训练设置", -1)),
              r(n).profile?.goal.description ? (t(), i("p", Iu, s(r(n).profile.goal.description), 1)) : m("", !0),
              W(Ft, {
                state: r(n),
                disabled: !r(b)("settings"),
                onAction: h
              }, null, 8, ["state", "disabled"])
            ]),
            a("section", null, [
              p[45] || (p[45] = a("h2", null, "语伴的声音", -1)),
              r(n).voices.enabled ? (t(), i("form", {
                key: 1,
                onSubmit: p[21] || (p[21] = ie((x) => h("voice", { voice: {
                  voiceId: Be.value,
                  language: Oe.value,
                  speed: Number(qe.value)
                } }), ["prevent"]))
              }, [
                a("label", null, [p[41] || (p[41] = F("音色", -1)), te(a("select", { "onUpdate:modelValue": p[18] || (p[18] = (x) => Be.value = x) }, [(t(!0), i(E, null, D(r(n).voices.voices, (x) => (t(), i("option", {
                  key: x.id,
                  value: x.id,
                  disabled: !x.available
                }, s(x.name) + s(x.available ? "" : "（暂不可用）"), 9, Su))), 128))], 512), [[Ue, Be.value]])]),
                a("label", null, [p[42] || (p[42] = F("发音语言", -1)), te(a("input", {
                  "onUpdate:modelValue": p[19] || (p[19] = (x) => Oe.value = x),
                  type: "text",
                  maxlength: "80",
                  placeholder: "en / ja"
                }, null, 512), [[oe, Oe.value]])]),
                a("label", null, [p[44] || (p[44] = F("语速", -1)), te(a("select", { "onUpdate:modelValue": p[20] || (p[20] = (x) => qe.value = x) }, [...p[43] || (p[43] = [
                  a("option", { value: 0.75 }, "0.75×", -1),
                  a("option", { value: 1 }, "1×", -1),
                  a("option", { value: 1.25 }, "1.25×", -1)
                ])], 512), [[Ue, qe.value]])]),
                a("button", {
                  type: "submit",
                  disabled: !r(b)("voice") || !r(n).profile
                }, "保存声音设置", 8, Au)
              ], 32)) : (t(), i("p", Lu, s(l.voiceDisabled), 1)),
              a("button", {
                type: "button",
                onClick: p[22] || (p[22] = (x) => h("tts-settings"))
              }, s(r(n).voices.enabled ? r(_e).settings : r(_e).enable), 1),
              p[46] || (p[46] = a("small", null, "已听过的题保留原声音，新偏好用于之后的题目。", -1))
            ]),
            a("section", null, [
              p[47] || (p[47] = a("h2", null, "学习数据", -1)),
              a("button", {
                type: "button",
                disabled: !r(b)("forget-conversation"),
                onClick: p[23] || (p[23] = (x) => ce("forget-conversation", {}, "清空和当前语伴的对话？目标、课件、学习记录和奖励都会保留。"))
              }, "清空对话记录", 8, Ru),
              a("button", {
                type: "button",
                disabled: !r(b)("export"),
                onClick: Xt
              }, "导出学习数据", 8, Mu),
              a("button", {
                type: "button",
                disabled: !r(b)("read"),
                onClick: p[24] || (p[24] = (x) => h("read"))
              }, "重新加载", 8, Eu),
              r(n).unit || r(n).blockedUnit ? (t(), i("button", {
                key: 0,
                type: "button",
                disabled: !r(b)("abandon"),
                onClick: p[25] || (p[25] = (x) => ce("abandon", {}, r(me).lesson))
              }, "放下当前练习", 8, Tu)) : m("", !0),
              a("button", {
                type: "button",
                class: "learning-danger",
                disabled: !r(b)("delete-language") || !r(n).profile,
                onClick: p[26] || (p[26] = (x) => ce("delete-language", {}, "删除当前语言的全部学习数据？未领取奖励也将放弃，已到账流水保留。"))
              }, "删除当前语言", 8, Nu),
              a("button", {
                type: "button",
                class: "learning-danger",
                disabled: !r(b)("clear"),
                onClick: p[27] || (p[27] = (x) => ce("clear", {}, "清空所有语言的目标、课程和记录？未领取奖励也将放弃。已到账流水不撤销。"))
              }, "清空全部学习数据", 8, Bu)
            ])
          ])) : m("", !0)
        ], 64)) : m("", !0)], 544)], 8, tu),
        r(n).teacher ? (t(), i("div", {
          key: 0,
          class: "learning-pane is-chat",
          inert: !Ne.value,
          "aria-hidden": !Ne.value
        }, [O.value ? (t(), Y(No, {
          key: 0,
          ref_key: "conversation",
          ref: P,
          state: r(n),
          disabled: !r(d),
          pending: r(o),
          onAction: h,
          onPresent: Re,
          onProfile: ot
        }, null, 8, [
          "state",
          "disabled",
          "pending"
        ])) : m("", !0)], 8, Ou)) : m("", !0),
        !M.value && I.value === "work" && r(n).teacher ? (t(), i("button", {
          key: 1,
          type: "button",
          class: "learning-float is-companion",
          "aria-label": nt.value ? `和${r(n).teacher.name}聊天，有新消息` : `和${r(n).teacher.name}聊天`,
          onClick: it
        }, [a("span", Pu, s([...r(n).teacher.name][0]), 1), nt.value ? (t(), i("span", Uu)) : m("", !0)], 8, qu)) : m("", !0),
        !M.value && I.value === "chat" ? (t(), i("button", {
          key: 2,
          type: "button",
          class: "learning-float is-workbook",
          "aria-label": ke.value ? "回到练习本，有新指引" : "回到练习本",
          onClick: ze
        }, [W(z, { name: "workbook" }), ke.value ? (t(), i("span", ju)) : m("", !0)], 8, Vu)) : m("", !0),
        r(dt) ? (t(), i("aside", {
          key: 3,
          class: le(["learning-companion-bubble", { "is-wide": M.value }]),
          "aria-live": "polite"
        }, [a("button", {
          type: "button",
          onClick: p[28] || (p[28] = (x) => {
            it(), r(Je)();
          })
        }, s(r(dt)), 1), a("button", {
          type: "button",
          "aria-label": "收起这句话",
          onClick: p[29] || (p[29] = (...x) => r(Je) && r(Je)(...x))
        }, [W(z, { name: "close" })])], 2)) : m("", !0)
      ], 2),
      T.value ? m("", !0) : (t(), Y(Pt, {
        key: 2,
        state: r(n),
        onAction: h
      }, null, 8, ["state"])),
      r(n).unit && T.value ? (t(), Y(Bn, {
        key: `${r(n).chatIdentity}:${r(n).language}:${r(n).unit.id}:${T.value.kind}:${T.value.id}`,
        state: r(n),
        target: T.value,
        disabled: !r(v),
        onAction: h,
        onClose: Ye,
        onAsk: rt
      }, null, 8, [
        "state",
        "target",
        "disabled"
      ])) : m("", !0),
      ee.value ? (t(), i("div", {
        key: 4,
        ref_key: "confirmLayer",
        ref: st,
        class: "learning-confirm-shade",
        onKeydown: p[32] || (p[32] = ye(ie((x) => ee.value = null, ["stop", "prevent"]), ["esc"]))
      }, [a("section", Du, [
        a("h2", Wu, s(r(ft)[ee.value.action].title), 1),
        a("p", null, s(ee.value.text), 1),
        a("div", Fu, [a("button", {
          autofocus: "",
          type: "button",
          onClick: p[30] || (p[30] = (x) => ee.value = null)
        }, s(["language", "teacher"].includes(ee.value.action) ? r(me).keepEditing : l.cancel), 1), a("button", {
          type: "button",
          class: "learning-primary",
          disabled: !r(b)(ee.value.action),
          onClick: p[31] || (p[31] = (x) => {
            Ze(ee.value.action, ee.value.input, !0), ee.value = null;
          })
        }, s(r(ft)[ee.value.action].accept), 9, Gu)])
      ])], 544)) : m("", !0)
    ], 4));
  }
}), Qu = Hu;
export {
  Qu as default
};
