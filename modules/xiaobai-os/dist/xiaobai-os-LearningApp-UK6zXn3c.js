/* eslint-disable */
import { $ as r, C as jt, E as ue, F as t, G as _, H as Y, I as Wt, J as fe, L as D, M as ye, O as ke, Q as ce, V as Ft, W as Gt, X as Ht, Y as H, Z as zt, _ as n, a as Te, b as F, c as be, et as ne, g as m, h as K, i as Yt, l as ae, m as a, nt as s, o as le, p as I, tt as kt, u as M, w as lt, x as Q, y as G, z as Kt } from "./xiaobai-os-runtime-dom.esm-bundler-DgjJUtuO.js";
import { n as Ee, r as ht } from "./xiaobai-os-app-navigation-DS43A6sJ.js";
import { t as Ge } from "./xiaobai-os-MessageMarkdown-bs_FqyUr.js";
var je = /* @__PURE__ */ new WeakMap(), st = [
  "select",
  "input",
  "keyup",
  "pointerup",
  "scroll"
], Oe = {
  mounted(e, p) {
    const l = p.value, i = l.cursor, o = () => {
      l.cursor = {
        start: e.selectionStart,
        end: e.selectionEnd,
        direction: e.selectionDirection,
        top: e.scrollTop,
        left: e.scrollLeft
      };
    };
    je.set(e, o);
    for (const u of st) e.addEventListener(u, o, { passive: !0 });
    ue(() => {
      !e.isConnected || !i || (e.setSelectionRange(i.start, i.end, i.direction), e.scrollTop = i.top, e.scrollLeft = i.left);
    });
  },
  beforeUnmount(e) {
    const p = je.get(e);
    if (p) {
      p();
      for (const l of st) e.removeEventListener(l, p);
      je.delete(e);
    }
  }
}, Zt = ["disabled"], Jt = {
  key: 0,
  class: "learning-choices"
}, Qt = [
  "type",
  "checked",
  "onChange"
], Xt = { class: "learning-option-letter" }, _t = {
  key: 1,
  class: "learning-order"
}, ea = [
  "disabled",
  "aria-label",
  "onClick"
], ta = [
  "disabled",
  "aria-label",
  "onClick"
], aa = {
  key: 2,
  class: "learning-fields"
}, na = ["onUpdate:modelValue"], ia = ["value"], la = {
  key: 3,
  class: "learning-choices"
}, sa = ["checked", "onChange"], ra = {
  key: 0,
  class: "learning-muted"
}, oa = {
  key: 4,
  class: "learning-fields"
}, ua = ["onUpdate:modelValue"], da = {
  key: 5,
  class: "learning-writing"
}, va = ["disabled"], ca = /* @__PURE__ */ Q({
  __name: "AnswerInput",
  props: /* @__PURE__ */ lt({
    response: {},
    paragraphs: {},
    disabled: { type: Boolean }
  }, {
    modelValue: { required: !0 },
    modelModifiers: {}
  }),
  emits: /* @__PURE__ */ lt(["submit"], ["update:modelValue"]),
  setup(e, { emit: p }) {
    const l = e, i = p, o = Ft(e, "modelValue");
    function u(k) {
      l.response.kind === "choice" && !l.response.multiple ? o.value.picked = [k] : o.value.picked = o.value.picked.includes(k) ? o.value.picked.filter((g) => g !== k) : [...o.value.picked, k];
    }
    function c(k, g) {
      const w = [...o.value.order];
      [w[k], w[k + g]] = [w[k + g], w[k]], o.value.order = w;
    }
    const y = I(() => {
      const k = l.response;
      return k.kind === "text" ? !!o.value.text.trim() : k.kind === "gaps" ? k.slots.every((g) => o.value.values[g.id]?.trim()) : k.kind === "match" ? k.left.every((g) => o.value.values[g.id]) : k.kind === "order" ? !0 : o.value.picked.length > 0;
    });
    function f() {
      const k = l.response;
      !y.value || l.disabled || (k.kind === "text" ? i("submit", {
        kind: "text",
        text: o.value.text
      }) : k.kind === "gaps" ? i("submit", {
        kind: "gaps",
        values: k.slots.map((g) => ({
          id: g.id,
          text: o.value.values[g.id]
        }))
      }) : k.kind === "match" ? i("submit", {
        kind: "match",
        pairs: k.left.map((g) => ({
          left: g.id,
          right: o.value.values[g.id]
        }))
      }) : i("submit", {
        kind: k.kind,
        ids: [...k.kind === "order" ? o.value.order : o.value.picked]
      }));
    }
    return (k, g) => (t(), n("form", {
      class: "learning-answer",
      onSubmit: ae(f, ["prevent"])
    }, [a("fieldset", { disabled: e.disabled }, [
      g[3] || (g[3] = a("legend", { class: "learning-sr-only" }, "你的回答", -1)),
      e.response.kind === "choice" ? (t(), n("div", Jt, [(t(!0), n(M, null, D(e.response.options, (w, h) => (t(), n("label", {
        key: w.id,
        class: ne({ selected: o.value.picked.includes(w.id) })
      }, [
        a("input", {
          type: e.response.multiple ? "checkbox" : "radio",
          name: "answer-choice",
          checked: o.value.picked.includes(w.id),
          onChange: (C) => u(w.id)
        }, null, 40, Qt),
        a("span", Xt, s(String.fromCharCode(65 + h)), 1),
        a("span", null, s(w.text), 1)
      ], 2))), 128))])) : e.response.kind === "order" ? (t(), n("ol", _t, [(t(!0), n(M, null, D(o.value.order, (w, h) => (t(), n("li", { key: w }, [
        a("span", null, s(e.response.options.find((C) => C.id === w)?.text), 1),
        a("button", {
          type: "button",
          disabled: h === 0,
          "aria-label": `上移第 ${h + 1} 项`,
          onClick: (C) => c(h, -1)
        }, "↑", 8, ea),
        a("button", {
          type: "button",
          disabled: h === o.value.order.length - 1,
          "aria-label": `下移第 ${h + 1} 项`,
          onClick: (C) => c(h, 1)
        }, "↓", 8, ta)
      ]))), 128))])) : e.response.kind === "match" ? (t(), n("div", aa, [(t(!0), n(M, null, D(e.response.left, (w) => (t(), n("label", { key: w.id }, [G(s(w.text) + " ", 1), _(a("select", { "onUpdate:modelValue": (h) => o.value.values[w.id] = h }, [g[1] || (g[1] = a("option", { value: "" }, "选择对应项", -1)), (t(!0), n(M, null, D(e.response.right, (h) => (t(), n("option", {
        key: h.id,
        value: h.id
      }, s(h.text), 9, ia))), 128))], 8, na), [[Te, o.value.values[w.id]]])]))), 128))])) : e.response.kind === "evidence" ? (t(), n("div", la, [(t(!0), n(M, null, D(e.paragraphs, (w) => (t(), n("label", {
        key: w.id,
        class: ne({ selected: o.value.picked.includes(w.id) })
      }, [a("input", {
        type: "checkbox",
        checked: o.value.picked.includes(w.id),
        onChange: (h) => u(w.id)
      }, null, 40, sa), a("span", null, s(w.text), 1)], 2))), 128)), e.paragraphs.length ? m("", !0) : (t(), n("p", ra, "请先展开相关文稿，再选择原文依据。"))])) : e.response.kind === "gaps" ? (t(), n("div", oa, [(t(!0), n(M, null, D(e.response.slots, (w) => (t(), n("label", { key: w.id }, [G(s(w.text), 1), _(a("input", {
        "onUpdate:modelValue": (h) => o.value.values[w.id] = h,
        type: "text",
        maxlength: "4000",
        autocomplete: "off"
      }, null, 8, ua), [[le, o.value.values[w.id]]])]))), 128))])) : (t(), n("label", da, [g[2] || (g[2] = a("span", { class: "learning-sr-only" }, "你的回答", -1)), _(a("textarea", {
        "onUpdate:modelValue": g[0] || (g[0] = (w) => o.value.text = w),
        rows: "6",
        maxlength: "4000",
        placeholder: "写下你的回答…"
      }, null, 512), [[le, o.value.text], [r(Oe), o.value]])])),
      a("button", {
        class: "learning-primary",
        type: "submit",
        disabled: !y.value
      }, "交给语伴 →", 8, va)
    ], 8, Zt)], 32));
  }
}), $t = ca, wt = 2e3, ga = ["stroke-width"], ma = ["d"], pa = /* @__PURE__ */ Q({
  __name: "LearningIcon",
  props: { name: {} },
  setup(e) {
    const p = {
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
    return (l, i) => (t(), n("svg", {
      class: "learning-icon",
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      "stroke-width": e.name === "more" ? 3.5 : 1.7,
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      "aria-hidden": "true"
    }, [a("path", { d: p[e.name] }, null, 8, ma)], 8, ga));
  }
}), z = pa, Ie = Object.freeze({
  select: "引用这段",
  ask: "问语伴",
  listen: "朗读",
  dismiss: "取消引用"
});
function ba(e, p, l) {
  if (!l?.rangeCount || l.isCollapsed) return null;
  const i = l.getRangeAt(0), o = i.startContainer, u = (o instanceof Element ? o : o.parentElement)?.closest("[data-learning-text]");
  if (!u || !e.contains(u) || !u.contains(i.endContainer)) return null;
  const c = p.find((w) => w.id === u.dataset.materialId), y = c?.paragraphs.find((w) => w.id === u.dataset.paragraphId);
  if (!c || !y) return null;
  const f = i.cloneRange();
  f.selectNodeContents(u), f.setEnd(i.startContainer, i.startOffset);
  const k = f.toString().length, g = i.toString();
  return !g.trim() || [...g].length > 2e3 || y.text.slice(k, k + g.length) !== g ? null : {
    materialId: c.id,
    paragraphId: y.id,
    start: k,
    end: k + g.length,
    quote: g
  };
}
function xt(e, p, l) {
  const i = () => {
    if (!e.value) return;
    const o = ba(e.value, p(), window.getSelection());
    o && l(o);
  };
  ye(() => document.addEventListener("selectionchange", i)), ke(() => document.removeEventListener("selectionchange", i));
}
var fa = { class: "learning-source" }, ya = { key: 0 }, ka = ["href"], ha = {
  key: 0,
  class: "learning-listening-cover"
}, $a = ["disabled"], wa = {
  key: 1,
  class: "learning-material-body"
}, xa = ["data-material-id", "data-paragraph-id"], Ca = ["disabled", "onClick"], Ia = {
  class: "learning-audio-parts",
  "aria-label": "材料朗读分段"
}, La = ["disabled", "onClick"], Sa = { key: 2 }, Aa = /* @__PURE__ */ Q({
  __name: "MaterialReader",
  props: {
    material: {},
    disabled: { type: Boolean },
    exerciseId: {}
  },
  emits: ["action", "select"],
  setup(e, { emit: p }) {
    const l = e, i = p, o = H(null);
    xt(o, () => [l.material], (c) => i("select", c));
    function u(c) {
      i("select", {
        materialId: l.material.id,
        paragraphId: c.id,
        start: 0,
        end: c.text.length,
        quote: c.text
      });
    }
    return (c, y) => (t(), n("article", {
      ref_key: "root",
      ref: o,
      class: "learning-material"
    }, [
      a("h2", null, s(e.material.title), 1),
      a("div", fa, [e.material.provenance.kind === "authored" ? (t(), n("span", ya, "语伴自编练习")) : (t(), n("a", {
        key: 1,
        href: e.material.provenance.url,
        target: "_blank",
        rel: "noopener noreferrer"
      }, s(e.material.provenance.kind === "original" ? "原文节选" : "改编自") + " · " + s(e.material.provenance.title) + " ↗", 9, ka))]),
      e.material.hidden ? (t(), n("div", ha, [y[1] || (y[1] = a("svg", {
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
        onClick: y[0] || (y[0] = (f) => i("action", "reveal", {
          kind: "transcripts",
          id: e.material.id
        }))
      }, "看文稿", 8, $a)])) : (t(), n("div", wa, [(t(!0), n(M, null, D(e.material.paragraphs, (f) => (t(), n("div", {
        key: f.id,
        class: "learning-paragraph"
      }, [a("p", {
        tabindex: "0",
        "data-learning-text": "",
        "data-material-id": e.material.id,
        "data-paragraph-id": f.id
      }, s(f.text), 9, xa), a("button", {
        type: "button",
        disabled: [...f.text].length > r(wt),
        onClick: (k) => u(f)
      }, s(r(Ie).select), 9, Ca)]))), 128))])),
      a("div", Ia, [(t(!0), n(M, null, D(e.material.parts, (f) => (t(), n("button", {
        key: f.key,
        type: "button",
        disabled: e.disabled,
        onClick: (k) => i("action", "play", {
          materialId: e.material.id,
          partKey: f.key,
          exerciseId: e.exerciseId
        })
      }, [F(z, { name: "play" }), G(s(e.material.parts.length > 1 ? `听第 ${f.number} 段` : "播放朗读"), 1)], 8, La))), 128))]),
      e.material.parts.length ? (t(), n("small", Sa, "TTS 合成朗读")) : m("", !0)
    ], 512));
  }
}), rt = Aa;
function He(e, p, l = []) {
  const i = (o) => p.kind === "choice" || p.kind === "order" ? p.options.find((u) => u.id === o)?.text ?? o : l.find((u) => u.id === o)?.text ?? o;
  return e.kind === "text" ? e.text : e.kind === "gaps" ? e.values.map((o) => `${p.kind === "gaps" ? p.slots.find((u) => u.id === o.id)?.text ?? "" : ""} ${o.text}`).join(`
`) : e.kind === "match" ? e.pairs.map((o) => p.kind === "match" ? `${p.left.find((u) => u.id === o.left)?.text} → ${p.right.find((u) => u.id === o.right)?.text}` : "").join(`
`) : e.ids.map(i).join(e.kind === "order" ? " → " : `
`);
}
var Ma = { class: "learning-feedback" }, Ra = { class: "learning-muted" }, Ta = { key: 0 }, Ea = { key: 1 }, Ba = { key: 0 }, Na = { key: 1 }, Oa = { key: 2 }, qa = {
  key: 3,
  class: "learning-muted"
}, Va = ["disabled"], Pa = ["disabled"], Ua = /* @__PURE__ */ Q({
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
    const p = {
      correct: "答对了",
      partial: "已经掌握一部分",
      incorrect: "一起把这里弄懂",
      disputed: "这处还需复核"
    };
    return (l, i) => (t(), n("section", Ma, [
      i[6] || (i[6] = a("p", { class: "learning-eyebrow" }, "已保存的原答", -1)),
      a("blockquote", null, s(r(He)(e.attempt.answer, e.response, e.paragraphs)), 1),
      a("small", Ra, [
        G(s(e.attempt.help.feedback ? "得到反馈后的再练" : e.attempt.help.answer || e.attempt.help.hint || e.attempt.help.transcript ? "这次有辅助" : "未使用答案或提示"), 1),
        e.attempt.help.replays ? (t(), n("span", Ta, " · 重听 " + s(e.attempt.help.replays) + " 次", 1)) : m("", !0),
        e.attempt.help.slowPlayback ? (t(), n("span", Ea, " · 慢放")) : m("", !0)
      ]),
      e.feedback ? (t(), n(M, { key: 0 }, [
        a("h3", null, s(p[e.feedback.verdict]), 1),
        e.feedback.understanding ? (t(), n("p", Ba, [i[2] || (i[2] = a("b", null, "理解", -1)), G(s(e.feedback.understanding), 1)])) : m("", !0),
        e.feedback.expression ? (t(), n("p", Na, [i[3] || (i[3] = a("b", null, "表达", -1)), G(s(e.feedback.expression), 1)])) : m("", !0),
        e.feedback.guidance ? (t(), n("p", Oa, [i[4] || (i[4] = a("b", null, "批注", -1)), G(s(e.feedback.guidance), 1)])) : m("", !0),
        e.revised ? (t(), n("small", qa, "这篇已有修改稿，结果以修改稿的批改为准。")) : (t(), n("button", {
          key: 4,
          type: "button",
          disabled: e.disabled,
          onClick: i[0] || (i[0] = (o) => l.$emit("action", "assess", {
            attemptId: e.attempt.id,
            review: !0,
            message: "请重新审视我的原答与题目。也请考虑其他有效表达，不只对照原来的答案键。"
          }))
        }, s(e.feedback.verdict === "disputed" ? "请语伴复核" : "有疑问，请复核"), 9, Va))
      ], 64)) : (t(), n(M, { key: 1 }, [i[5] || (i[5] = a("p", null, "原答已保存，等待语伴评估。", -1)), a("button", {
        type: "button",
        disabled: e.disabled,
        onClick: i[1] || (i[1] = (o) => l.$emit("action", "assess", {
          attemptId: e.attempt.id,
          review: !1,
          message: "请评估这条已经保存的原答。"
        }))
      }, "重试评估", 8, Pa)], 64))
    ]));
  }
}), Ct = Ua, Z = {
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
}, Da = {
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
}, It = {
  unassessed: "还没练过",
  review: "待确认",
  independent: "已能独立使用",
  practised: "练过一次",
  strengthen: "再练练"
}, Lt = (e) => `${e} 次作答`, St = (e) => `${e} 个知识点可以温习了`, Fe = {
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
}, ot = {
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
}, Se = {
  lesson: "本次练习的材料、作答和笔记会删除；已收入学习本的记录和已获得的奖励会保留。",
  review: "这组已答的题会删除，复习时间安排不变。"
}, ja = {
  key: 0,
  class: "learning-player",
  "aria-label": "课堂朗读"
}, Wa = {
  key: 0,
  role: "status"
}, Fa = {
  key: 2,
  class: "learning-row"
}, Ga = ["aria-label", "disabled"], Ha = ["max", "value"], za = /* @__PURE__ */ Q({
  __name: "LearningPlayer",
  props: { state: {} },
  emits: ["action"],
  setup(e, { emit: p }) {
    const l = p;
    function i(o) {
      return `${Math.floor(o / 60)}:${String(Math.floor(o % 60)).padStart(2, "0")}`;
    }
    return (o, u) => e.state.media.status !== "idle" ? (t(), n("section", ja, [
      e.state.media.message ? (t(), n("p", Wa, s(e.state.media.message), 1)) : m("", !0),
      e.state.voices.enabled ? m("", !0) : (t(), n("button", {
        key: 1,
        type: "button",
        onClick: u[0] || (u[0] = (c) => l("action", "tts-settings"))
      }, s(r(Fe).enable), 1)),
      e.state.media.key ? (t(), n("div", Fa, [
        F(z, { name: "sound" }),
        a("span", null, s(e.state.media.status === "loading" ? "正在生成声音…" : `${i(e.state.media.position)} / ${i(e.state.media.duration)}`), 1),
        e.state.media.status === "playing" ? (t(), n("button", {
          key: 0,
          type: "button",
          "aria-label": "暂停",
          onClick: u[1] || (u[1] = (c) => l("action", "pause"))
        }, [F(z, { name: "pause" })])) : [
          "paused",
          "ended",
          "blocked"
        ].includes(e.state.media.status) ? (t(), n("button", {
          key: 1,
          type: "button",
          "aria-label": e.state.media.status === "ended" ? "再听一遍" : "继续播放",
          disabled: e.state.busy,
          onClick: u[2] || (u[2] = (c) => l("action", "resume"))
        }, [F(z, { name: "play" })], 8, Ga)) : m("", !0),
        a("button", {
          type: "button",
          "aria-label": "停止",
          onClick: u[3] || (u[3] = (c) => l("action", "stop"))
        }, [F(z, { name: "stop" })]),
        e.state.media.duration ? (t(), n("button", {
          key: 2,
          type: "button",
          onClick: u[4] || (u[4] = (c) => l("action", "rate", { value: e.state.media.rate === 1 ? 0.75 : 1 }))
        }, s(e.state.media.rate) + "×", 1)) : m("", !0)
      ])) : m("", !0),
      e.state.media.duration ? (t(), n("input", {
        key: 3,
        type: "range",
        min: "0",
        max: e.state.media.duration,
        step: "0.1",
        value: e.state.media.position,
        "aria-label": "当前声音片段播放位置",
        onChange: u[5] || (u[5] = (c) => l("action", "seek", { value: Number(c.target.value) }))
      }, null, 40, Ha)) : m("", !0)
    ])) : m("", !0);
  }
}), At = za, Ya = { class: "learning-selection" }, Ka = { class: "learning-row" }, Za = ["disabled"], Ja = /* @__PURE__ */ Q({
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
    return (p, l) => (t(), n("div", Ya, [a("blockquote", null, s(e.selection.quote), 1), a("div", Ka, [
      a("button", {
        type: "button",
        onClick: l[0] || (l[0] = (i) => p.$emit("ask"))
      }, s(r(Ie).ask), 1),
      a("button", {
        type: "button",
        disabled: e.disabled || [...e.selection.quote].length > 1e3,
        onClick: l[1] || (l[1] = (i) => p.$emit("say"))
      }, s(r(Ie).listen), 9, Za),
      a("button", {
        type: "button",
        onClick: l[2] || (l[2] = (i) => p.$emit("dismiss"))
      }, s(r(Ie).dismiss), 1)
    ])]));
  }
}), Mt = Ja;
function Be(e) {
  return {
    picked: [],
    text: "",
    values: {},
    order: e.kind === "order" ? e.options.map((p) => p.id) : []
  };
}
function ut(e, p) {
  const l = Be(p);
  return !!e.text.trim() || !!e.picked.length || Object.values(e.values).some((i) => !!i.trim()) || e.order.length !== l.order.length || e.order.some((i, o) => i !== l.order[o]);
}
function Rt(e) {
  const p = (l) => l.trim() || null;
  return {
    exam: p(e.exam),
    level: p(e.level),
    targetLevel: p(e.targetLevel),
    explanationLanguage: e.explanationLanguage,
    interests: p(e.interests)
  };
}
var dt = () => ({
  text: "",
  cursor: void 0,
  focus: null,
  sent: null,
  scroll: 0,
  following: !0
});
function Qa() {
  const e = fe({}), p = fe(dt()), l = fe({
    open: !1,
    form: {
      exam: "",
      level: "",
      targetLevel: "",
      explanationLanguage: "zh-CN",
      interests: ""
    },
    submitted: null
  }), i = fe({ enabled: !1 }), o = fe({
    step: 0,
    name: "",
    note: ""
  }), u = fe({
    tab: "grammar",
    reason: ""
  });
  return {
    units: e,
    chat: p,
    settings: l,
    companion: i,
    setup: o,
    books: u,
    unit(c) {
      return e[c] ??= {
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
      }, e[c];
    },
    reset(c = !1) {
      for (const y of Object.keys(e)) delete e[y];
      Object.assign(p, dt()), l.open = !1, l.submitted = null, i.enabled = !1, c || Object.assign(o, {
        step: 0,
        name: "",
        note: ""
      }), Object.assign(u, {
        tab: "grammar",
        reason: ""
      });
    },
    reconcile(c) {
      const y = l.submitted;
      y && c.storage === "ready" && !c.busy && c.profile && Object.entries(y.value).every(([k, g]) => c.profile.settings[k] === g) && (Object.entries(y.form).every(([k, g]) => l.form[k] === g) && (l.open = !1), l.submitted = null);
      for (const k of Object.keys(e)) {
        const g = [c.unit, c.review].find((h) => h?.id === k);
        if (!g) {
          delete e[k];
          continue;
        }
        for (const [h, C] of Object.entries(e[k].activityDrafts)) {
          const v = g.attempts.filter((d) => d.exerciseId === h).at(-1);
          if (C.submitted && v && v.id !== C.submitted.before) {
            delete e[k].activityDrafts[h];
            const d = e[k].activities[`exercise:${h}`];
            d && (d.retry = !1);
          }
        }
        const w = e[k].selection;
        w && g.materials.find((h) => h.id === w.materialId)?.paragraphs.find((h) => h.id === w.paragraphId)?.text.slice(w.start, w.end) !== w.quote && (e[k].selection = null);
        for (const [h, C] of Object.entries(e[k].writing)) {
          const v = g.attempts.filter(($) => $.exerciseId === h && !$.revisesAttemptId).at(-1), d = C.submitted;
          !d || !v || v.id === d.before || (C.text === d.text && v.answer.kind === "text" && v.answer.text === d.text.trim() ? (C.text = "", C.rewriting = !1) : C.rewriting = !0, C.submitted = null);
        }
      }
      const f = p.sent;
      f && c.conversation.turns.some((k, g) => g + c.conversation.removedTurns >= f.after && (k.purpose === "talk" || k.purpose === "explain") && k.user === f.user) && (p.text === f.text && (p.text = "", p.focus = null), p.sent = null);
    }
  };
}
var Tt = /* @__PURE__ */ Symbol("learning-ui-session");
function Xa(e, p) {
  if (e.chat.text.trim() || e.settings.open && Object.entries(Rt(e.settings.form)).some(([l, i]) => p.profile?.settings[l] !== i) || e.setup.step === 1 && e.setup.name.trim() && (e.setup.name.trim() !== p.teacher?.name || e.setup.note.trim() !== p.teacher.note)) return !0;
  for (const l of [p.unit, p.review]) {
    const i = l && e.units[l.id];
    if (!(!l || !i)) {
      if (Object.values(i.writing).some((o) => !!o.text.trim()) || l.stage.stage === "revising" && l.assessments.some((o) => o.annotations?.some((u) => i.edits[u.id] && i.edits[u.id].value !== u.quote))) return !0;
      for (const o of l.exercises) {
        const u = i.activityDrafts[o.id]?.value, c = i.review.drafts[o.id];
        if (u && ut(u, o.response) || c && !l.attempts.some((y) => y.exerciseId === o.id) && ut(c, o.response)) return !0;
      }
    }
  }
  return !1;
}
function _a(e) {
  const p = Qa();
  return Wt(Tt, p), Y([
    () => e.value.chatIdentity,
    () => e.value.language,
    () => e.value.teacher?.name
  ], (l, i) => p.reset(l[0] === i[0])), Y(() => e.value, (l) => p.reconcile(l), { immediate: !0 }), Y(() => e.value.currentUnitId, () => {
    p.chat.focus = null;
  }), Y(() => Xa(p, e.value), (l, i, o) => {
    if (!l) return;
    const u = (c) => {
      c.preventDefault(), c.returnValue = "";
    };
    window.addEventListener("beforeunload", u), o(() => window.removeEventListener("beforeunload", u));
  }, { immediate: !0 }), p;
}
function he() {
  const e = jt(Tt);
  if (!e) throw new Error("Learning views require their application session");
  return e;
}
function $e(e) {
  const p = he();
  return I(() => p.unit(e()));
}
var en = ["onKeydown"], tn = {
  role: "dialog",
  "aria-labelledby": "learning-activity-title",
  class: "learning-activity"
}, an = { class: "learning-activity-header" }, nn = { id: "learning-activity-title" }, ln = {
  key: 0,
  "aria-label": "完成本课的固定奖励"
}, sn = {
  key: 0,
  class: "learning-margin-note",
  role: "status"
}, rn = ["open"], on = {
  key: 3,
  class: "learning-question"
}, un = { class: "learning-help-actions" }, dn = ["disabled"], vn = ["disabled"], cn = ["disabled"], gn = {
  key: 0,
  class: "learning-margin-note"
}, mn = {
  key: 1,
  class: "learning-margin-note"
}, pn = { key: 0 }, bn = { key: 1 }, fn = { key: 2 }, yn = ["disabled"], kn = /* @__PURE__ */ Q({
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
  setup(e, { emit: p }) {
    const l = e, i = p, o = H(null), u = $e(() => l.target.unitId), c = I(() => `${l.target.kind}:${l.target.id}`);
    Y([u, c], () => {
      u.value.activities[c.value] ??= {
        scroll: 0,
        selected: null,
        retry: !1,
        materialsOpen: !1
      };
    }, { immediate: !0 });
    const y = I(() => u.value.activities[c.value]), f = H(null), k = I({
      get: () => y.value.retry,
      set: (A) => {
        y.value.retry = A;
      }
    }), g = I({
      get: () => y.value.selected,
      set: (A) => {
        y.value.selected = A;
      }
    }), w = H(null);
    function h() {
      g.value ? g.value = null : k.value ? k.value = !1 : i("close");
    }
    ht(w, h);
    const C = I(() => u.value.activityDrafts);
    let v = null;
    const d = I(() => l.target?.kind === "exercise" ? l.state.unit?.exercises.find((A) => A.id === l.target?.id) : void 0), $ = I(() => l.state.unit?.materials.filter((A) => l.target?.kind === "material" ? A.id === l.target.id : d.value?.materialIds.includes(A.id)) ?? []), j = I(() => d.value?.id ?? l.state.unit?.exercises.find((A) => A.skill === "listening" && A.materialIds.includes(l.target?.id ?? ""))?.id ?? l.state.unit?.exercises.find((A) => A.materialIds.includes(l.target?.id ?? ""))?.id), N = I(() => $.value.filter((A) => d.value?.response.kind !== "evidence" || A.id === d.value.response.materialId).flatMap((A) => A.paragraphs)), R = I(() => l.state.unit?.attempts.filter((A) => A.exerciseId === d.value?.id).at(-1)), q = I(() => l.state.unit?.assessments.find((A) => A.attemptId === R.value?.id));
    Y(() => d.value, (A) => {
      if (!A) return;
      const V = JSON.stringify(A.response);
      C.value[A.id]?.response !== V && (C.value[A.id] = {
        response: V,
        value: Be(A.response)
      });
    }, { immediate: !0 });
    const O = I({
      get: () => C.value[d.value.id].value,
      set: (A) => {
        C.value[d.value.id].value = A;
      }
    });
    ye(() => {
      f.value?.focus({ preventScroll: !0 }), o.value && (o.value.scrollTop = y.value.scroll);
    }), ke(() => {
      o.value && (y.value.scroll = o.value.scrollTop);
    }), Y(() => l.state.unit?.attempts, (A) => {
      if (!v) return;
      const V = A?.filter((W) => W.exerciseId === v.id).at(-1);
      if (V && V.id !== v.before) {
        const W = l.target?.kind === "exercise" && l.target.id === v.id;
        delete C.value[v.id], v = null, W && i("close");
      }
    });
    function P(A) {
      v = {
        id: d.value.id,
        before: R.value?.id
      }, C.value[d.value.id].submitted = { before: R.value?.id }, i("action", "submit", {
        unitId: l.state.unit.id,
        exerciseId: d.value.id,
        answer: A
      });
    }
    return (A, V) => (t(), n("div", {
      ref_key: "layer",
      ref: w,
      class: "learning-activity-shade",
      onKeydown: be(ae(h, ["stop", "prevent"]), ["esc"])
    }, [a("section", tn, [
      a("header", an, [
        a("h2", nn, s(d.value ? "练习" : $.value[0]?.title ?? "材料"), 1),
        e.state.unit ? (t(), n("small", ln, "+" + s(e.state.unit.reward.amount) + " 币", 1)) : m("", !0),
        a("button", {
          ref_key: "closeButton",
          ref: f,
          type: "button",
          "aria-label": "收起课件",
          onClick: V[0] || (V[0] = (W) => i("close"))
        }, [V[18] || (V[18] = G("收起", -1)), F(z, { name: "back" })], 512)
      ]),
      e.state.message && !e.state.busy ? (t(), n("p", sn, s(e.state.message), 1)) : m("", !0),
      a("div", {
        ref_key: "body",
        ref: o,
        class: "learning-activity-body"
      }, [
        d.value && $.value.length ? (t(), n("details", {
          key: 0,
          class: "learning-activity-materials",
          open: y.value.materialsOpen,
          onToggle: V[3] || (V[3] = (W) => y.value.materialsOpen = W.target.open)
        }, [a("summary", null, "阅读材料 · " + s($.value.length), 1), (t(!0), n(M, null, D($.value, (W) => (t(), K(rt, {
          key: W.id,
          material: W,
          "exercise-id": j.value,
          disabled: e.disabled,
          onAction: V[1] || (V[1] = (E, B) => i("action", E, B)),
          onSelect: V[2] || (V[2] = (E) => g.value = E)
        }, null, 8, [
          "material",
          "exercise-id",
          "disabled"
        ]))), 128))], 40, rn)) : d.value ? m("", !0) : (t(!0), n(M, { key: 1 }, D($.value, (W) => (t(), K(rt, {
          key: W.id,
          material: W,
          "exercise-id": j.value,
          disabled: e.disabled,
          onAction: V[4] || (V[4] = (E, B) => i("action", E, B)),
          onSelect: V[5] || (V[5] = (E) => g.value = E)
        }, null, 8, [
          "material",
          "exercise-id",
          "disabled"
        ]))), 128)),
        g.value ? (t(), K(Mt, {
          key: 2,
          selection: g.value,
          disabled: e.disabled,
          onAsk: V[6] || (V[6] = (W) => i("ask", j.value, g.value)),
          onSay: V[7] || (V[7] = (W) => i("action", "say", { selection: g.value })),
          onDismiss: V[8] || (V[8] = (W) => g.value = null)
        }, null, 8, ["selection", "disabled"])) : m("", !0),
        d.value ? (t(), n("section", on, [
          a("h2", null, s(d.value.prompt), 1),
          a("div", un, [
            a("button", {
              type: "button",
              disabled: e.disabled || [...d.value.prompt].length > 1e3,
              onClick: V[9] || (V[9] = (W) => i("action", "say-question", { exerciseId: d.value.id }))
            }, "听题干", 8, dn),
            d.value.hasHint ? (t(), n("button", {
              key: 0,
              type: "button",
              disabled: e.disabled || d.value.hint !== null,
              onClick: V[10] || (V[10] = (W) => i("action", "reveal", {
                kind: "hints",
                id: d.value.id
              }))
            }, "提示", 8, vn)) : m("", !0),
            a("button", {
              type: "button",
              disabled: e.disabled || d.value.solution !== null,
              onClick: V[11] || (V[11] = (W) => i("action", "reveal", {
                kind: "answers",
                id: d.value.id
              }))
            }, "解答", 8, cn),
            a("button", {
              type: "button",
              onClick: V[12] || (V[12] = (W) => i("ask", d.value.id))
            }, "问语伴")
          ]),
          d.value.hint ? (t(), n("p", gn, s(d.value.hint), 1)) : m("", !0),
          d.value.solution ? (t(), n("div", mn, [d.value.solution.kind === "exact" ? (t(), n("p", pn, s(r(He)(d.value.solution.answer, d.value.response, N.value)), 1)) : d.value.solution.kind === "gaps" ? (t(), n("p", bn, s(d.value.solution.accepted.map((W) => W.forms.join(" / ")).join(`
`)), 1)) : m("", !0), d.value.solution.kind !== "semantic" ? (t(), n("p", fn, s(d.value.solution.explanation), 1)) : (t(), n("button", {
            key: 3,
            type: "button",
            onClick: V[13] || (V[13] = (W) => i("ask", d.value.id))
          }, "请语伴讲解"))])) : m("", !0),
          (!R.value || k.value) && C.value[d.value.id] ? (t(), K($t, {
            key: d.value.id,
            modelValue: O.value,
            "onUpdate:modelValue": V[14] || (V[14] = (W) => O.value = W),
            response: d.value.response,
            paragraphs: N.value,
            disabled: e.disabled,
            onSubmit: P
          }, null, 8, [
            "modelValue",
            "response",
            "paragraphs",
            "disabled"
          ])) : m("", !0),
          R.value ? (t(), K(Ct, {
            key: 3,
            attempt: R.value,
            feedback: q.value,
            response: d.value.response,
            paragraphs: N.value,
            disabled: e.disabled,
            revised: !!e.state.unit?.attempts.some((W) => W.revisesAttemptId === R.value?.id),
            onAction: V[15] || (V[15] = (W, E) => {
              i("action", W, E), i("close");
            })
          }, null, 8, [
            "attempt",
            "feedback",
            "response",
            "paragraphs",
            "disabled",
            "revised"
          ])) : m("", !0),
          R.value ? (t(), n("button", {
            key: 4,
            type: "button",
            disabled: e.disabled,
            onClick: V[16] || (V[16] = (W) => {
              k.value = !k.value, C.value[d.value.id] ??= {
                response: JSON.stringify(d.value.response),
                value: r(Be)(d.value.response)
              };
            })
          }, s(k.value ? "收起再练" : "再试一次"), 9, yn)) : m("", !0)
        ])) : m("", !0)
      ], 512),
      F(At, {
        state: e.state,
        onAction: V[17] || (V[17] = (W, E) => i("action", W, E))
      }, null, 8, ["state"])
    ])], 40, en));
  }
}), hn = kn, $n = 864e5;
function vt(e, p) {
  return /^(zh|ja|ko)\b/iu.test(p) ? {
    count: [...e.replace(/[\s\p{P}\p{S}]/gu, "")].length,
    unit: "字"
  } : {
    count: e.match(/[\p{L}\p{N}][\p{L}\p{N}\p{M}'’-]*/gu)?.length ?? 0,
    unit: "词"
  };
}
function Et(e, p) {
  const l = [], i = /* @__PURE__ */ new Map();
  for (const o of p)
    if (o.quote)
      for (let u = e.indexOf(o.quote); u >= 0; u = e.indexOf(o.quote, u + 1)) {
        const c = u + o.quote.length;
        if (!l.some(([y, f]) => u < f && y < c)) {
          l.push([u, c]), i.set(o.id, u);
          break;
        }
      }
  return i;
}
function wn(e, p) {
  const l = e.split(/(\r?\n)/u), i = [];
  l.forEach((k, g) => {
    g % 2 === 0 && k.trim() && i.push(g);
  });
  const o = [], u = [], c = /* @__PURE__ */ new Map();
  for (const k of p) c.set(k.paragraphIndex, [...c.get(k.paragraphIndex) ?? [], k]);
  for (const [k, g] of c) {
    const w = i[k];
    if (w === void 0) {
      o.push(...g.map((d) => d.id));
      continue;
    }
    const h = Et(l[w], g), C = g.filter((d) => h.has(d.id)).sort((d, $) => h.get($.id) - h.get(d.id));
    let v = l[w];
    for (const d of C) {
      const $ = h.get(d.id);
      v = v.slice(0, $) + d.replacement + v.slice($ + d.quote.length), d.replacement !== d.quote && u.push(d.id);
    }
    l[w] = v, o.push(...g.filter((d) => !h.has(d.id)).map((d) => d.id));
  }
  const y = new Map(p.map((k, g) => [k.id, g])), f = (k, g) => y.get(k) - y.get(g);
  return {
    text: l.join(""),
    missing: o.sort(f),
    applied: u.sort(f)
  };
}
function xn(e, p) {
  const l = Et(e, p), i = p.filter((c) => l.has(c.id)).map((c) => ({
    id: c.id,
    start: l.get(c.id),
    length: c.quote.length
  })).sort((c, y) => c.start - y.start), o = [];
  let u = 0;
  for (const c of i)
    c.start > u && o.push({ text: e.slice(u, c.start) }), o.push({
      text: e.slice(c.start, c.start + c.length),
      id: c.id
    }), u = c.start + c.length;
  return (u < e.length || !o.length) && o.push({ text: e.slice(u) }), o;
}
function Cn(e, p = "xiaobai-learning-seen-units") {
  const l = /* @__PURE__ */ new Set(), i = () => {
    try {
      const o = JSON.parse(e()?.getItem(p) ?? "[]");
      return Array.isArray(o) ? o.filter((u) => typeof u == "string") : [];
    } catch {
      return [];
    }
  };
  return {
    has: (o) => l.has(o) || i().includes(o),
    mark(o) {
      l.add(o);
      try {
        e()?.setItem(p, JSON.stringify([.../* @__PURE__ */ new Set([...i(), o])].slice(-50)));
      } catch {
      }
    }
  };
}
var In = () => {
  try {
    return globalThis.localStorage;
  } catch {
    return null;
  }
}, ct = Cn(In);
function ze(e, p = Date.now()) {
  const l = new Date(e), i = new Date(p), o = Math.round((Date.UTC(l.getFullYear(), l.getMonth(), l.getDate()) - Date.UTC(i.getFullYear(), i.getMonth(), i.getDate())) / $n);
  return !Number.isFinite(o) || o <= 0 ? "今天复习" : o === 1 ? "明天再见" : `${o} 天后再见`;
}
var Ln = { class: "learning-records-page" }, Sn = {
  key: 0,
  class: "learning-page-heading"
}, An = {
  key: 0,
  class: "learning-muted"
}, Mn = { class: "learning-muted" }, Rn = {
  key: 0,
  class: "learning-muted"
}, Tn = ["disabled", "onClick"], En = ["disabled"], Bn = {
  key: 0,
  class: "learning-empty-note"
}, Nn = ["disabled", "onClick"], On = ["title"], qn = {
  key: 1,
  class: "learning-row"
}, Vn = ["disabled"], Pn = { class: "learning-muted" }, Un = ["disabled"], Dn = /* @__PURE__ */ Q({
  __name: "LearningRecords",
  props: {
    state: {},
    disabled: { type: Boolean },
    embedded: { type: Boolean }
  },
  emits: ["action", "remove"],
  setup(e, { emit: p }) {
    const l = e, i = p;
    Ee(() => l.state.record ? (i("action", "records", { offset: l.state.records.offset }), !0) : !1);
    const o = {
      deleteAnswer: "删除这次作答",
      deleteRecord: "删除记录",
      answerWarning: "这次作答和对应的反馈会删除，相关知识点的掌握情况会更新。已到账奖励保留。",
      recordWarning: "这条学习记录会删除，仅属于它的历史作答也会删除。当前练习不受影响。",
      hidden: "听力原文暂未显示，下面是你的作答和点评。"
    };
    return (u, c) => (t(), n("section", Ln, [!e.embedded || e.state.record ? (t(), n("div", Sn, [c[5] || (c[5] = a("h1", null, "学习记录", -1)), e.state.records.total ? (t(), n("span", An, s(e.state.records.total) + " 项", 1)) : m("", !0)])) : m("", !0), e.state.record ? (t(), n(M, { key: 1 }, [
      a("button", {
        type: "button",
        onClick: c[0] || (c[0] = (y) => u.$emit("action", "records", { offset: e.state.records.offset }))
      }, "‹ 返回记录"),
      a("h2", null, s(e.state.record.label), 1),
      (t(!0), n(M, null, D(e.state.record.evidence, (y) => (t(), n("article", {
        key: y.attempt.id,
        class: "learning-record-evidence"
      }, [
        a("p", Mn, s(new Date(y.attempt.submittedAt).toLocaleDateString()), 1),
        a("h3", null, s(y.exercise.prompt), 1),
        (t(!0), n(M, null, D(y.materials, (f) => (t(), n("details", { key: f.id }, [a("summary", null, s(f.title), 1), f.hidden ? (t(), n("p", Rn, s(o.hidden), 1)) : (t(!0), n(M, { key: 1 }, D(f.paragraphs, (k) => (t(), n("p", { key: k.id }, s(k.text), 1))), 128))]))), 128)),
        F(Ct, {
          attempt: y.attempt,
          feedback: y.assessment,
          response: y.exercise.response,
          paragraphs: y.materials.flatMap((f) => f.paragraphs),
          disabled: e.disabled,
          revised: !!e.state.unit?.attempts.some((f) => f.revisesAttemptId === y.attempt.id),
          onAction: c[1] || (c[1] = (f, k) => u.$emit("action", f, k))
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
          onClick: (f) => u.$emit("remove", "delete-attempt", { id: y.attempt.id }, o.answerWarning)
        }, s(o.deleteAnswer), 9, Tn)
      ]))), 128)),
      a("button", {
        type: "button",
        disabled: e.disabled,
        onClick: c[2] || (c[2] = (y) => u.$emit("remove", "delete-item", { id: e.state.record.id }, o.recordWarning))
      }, s(o.deleteRecord), 9, En)
    ], 64)) : (t(), n(M, { key: 2 }, [
      e.state.records.total ? m("", !0) : (t(), n("p", Bn, "暂无学习记录")),
      (t(!0), n(M, null, D(e.state.records.items, (y) => (t(), n("button", {
        key: y.id,
        class: "learning-record-row",
        type: "button",
        disabled: !y.readable,
        onClick: (f) => u.$emit("action", "records", {
          id: y.id,
          offset: e.state.records.offset
        })
      }, [a("span", null, [a("strong", null, s(y.label), 1), a("small", null, [G(s(r(Lt)(y.evidenceCount)), 1), y.nextReviewAt ? (t(), n("span", {
        key: 0,
        title: y.scheduleReason ?? void 0
      }, " · " + s(r(ze)(y.nextReviewAt)) + "（" + s(new Date(y.nextReviewAt).toLocaleDateString()) + "）", 9, On)) : m("", !0)])]), a("em", null, s(r(It)[y.state]), 1)], 8, Nn))), 128)),
      e.state.records.total > 30 ? (t(), n("div", qn, [
        a("button", {
          type: "button",
          disabled: e.state.records.offset === 0,
          onClick: c[3] || (c[3] = (y) => u.$emit("action", "records", { offset: Math.max(0, e.state.records.offset - 30) }))
        }, "上一页", 8, Vn),
        a("span", Pn, s(e.state.records.total) + " 项", 1),
        a("button", {
          type: "button",
          disabled: e.state.records.offset + 30 >= e.state.records.total,
          onClick: c[4] || (c[4] = (y) => u.$emit("action", "records", { offset: e.state.records.offset + 30 }))
        }, "下一页", 8, Un)
      ])) : m("", !0)
    ], 64))]));
  }
}), gt = Dn, jn = { class: "learning-books-page" }, Wn = { class: "learning-page-heading" }, Fn = {
  key: 0,
  class: "learning-due"
}, Gn = { key: 0 }, Hn = { key: 1 }, zn = ["disabled"], Yn = {
  class: "learning-tabs",
  role: "tablist",
  "aria-label": "学习记录视图"
}, Kn = ["aria-selected", "onClick"], Zn = {
  key: 0,
  class: "learning-empty-note"
}, Jn = { class: "learning-book-list" }, Qn = ["disabled", "onClick"], Xn = ["aria-expanded", "onClick"], _n = {
  key: 1,
  class: "learning-chip-reason"
}, ei = {
  key: 2,
  class: "learning-growth"
}, ti = {
  key: 0,
  class: "learning-empty-note"
}, ai = { class: "learning-muted" }, ni = { key: 0 }, ii = { key: 0 }, li = { key: 1 }, si = { key: 2 }, ri = /* @__PURE__ */ Q({
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
  setup(e, { emit: p }) {
    const l = e, i = p, o = he().books, u = ce(o, "tab"), c = [
      ["grammar", "语法本"],
      ["vocabulary", "生词本"],
      ["growth", "成长"],
      ["all", "全部记录"]
    ], y = { title: "学习本" }, f = ce(o, "reason"), k = I(() => u.value === "grammar" || u.value === "vocabulary" ? l.state.books[u.value] : []), g = I(() => l.state.growth), w = I(() => !!l.state.review && l.state.review.stage.stage !== "complete");
    return (h, C) => (t(), n("section", jn, [e.state.record ? (t(), K(gt, {
      key: 0,
      state: e.state,
      disabled: e.disabled,
      onAction: C[0] || (C[0] = (v, d) => i("action", v, d)),
      onRemove: C[1] || (C[1] = (v, d, $) => i("remove", v, d, $))
    }, null, 8, ["state", "disabled"])) : (t(), n(M, { key: 1 }, [
      a("div", Wn, [a("h1", null, s(y.title), 1)]),
      e.state.dueCount || w.value ? (t(), n("div", Fn, [e.state.dueCount ? (t(), n("span", Gn, s(r(St)(e.state.dueCount)), 1)) : m("", !0), e.state.blockedReview ? (t(), n("small", Hn, "有一组复习在另一个故事中进行，回到学习页可以放下它")) : w.value ? (t(), n("button", {
        key: 3,
        type: "button",
        class: "learning-primary",
        onClick: C[3] || (C[3] = (v) => i("review"))
      }, s(r(J).resumeReview), 1)) : (t(), n("button", {
        key: 2,
        type: "button",
        class: "learning-primary",
        disabled: e.disabled,
        onClick: C[2] || (C[2] = (v) => i("action", "start-review"))
      }, s(r(J).review), 9, zn))])) : m("", !0),
      a("div", Yn, [(t(), n(M, null, D(c, ([v, d]) => a("button", {
        key: v,
        type: "button",
        role: "tab",
        "aria-selected": u.value === v,
        onClick: ($) => {
          u.value = v, f.value = "";
        }
      }, s(d), 9, Kn)), 64))]),
      u.value === "grammar" || u.value === "vocabulary" ? (t(), n(M, { key: 1 }, [k.value.length ? m("", !0) : (t(), n("p", Zn, s(u.value === "grammar" ? "批改里出现的语法问题会记到这里。" : "批改里的词汇问题、读文章时收藏的词语会记到这里。"), 1)), a("ul", Jn, [(t(!0), n(M, null, D(k.value, (v) => (t(), n("li", { key: v.id }, [
        a("button", {
          type: "button",
          class: "learning-book-item",
          disabled: !v.readable,
          onClick: (d) => i("action", "records", {
            id: v.id,
            offset: e.state.records.offset
          })
        }, [a("strong", null, s(v.label), 1), a("small", null, s(r(It)[v.state]) + " · " + s(r(Lt)(v.evidenceCount)), 1)], 8, Qn),
        v.nextReviewAt ? (t(), n("button", {
          key: 0,
          type: "button",
          class: "learning-chip",
          "aria-expanded": f.value === v.id,
          onClick: (d) => f.value = f.value === v.id ? "" : v.id
        }, s(r(ze)(v.nextReviewAt)), 9, Xn)) : m("", !0),
        f.value === v.id ? (t(), n("small", _n, s(v.scheduleReason), 1)) : m("", !0)
      ]))), 128))])], 64)) : u.value === "growth" ? (t(), n("section", ei, [g.value.enough ? (t(), n(M, { key: 1 }, [
        a("p", ai, [G("来自 " + s(g.value.evidence) + " 份作答", 1), g.value.completed ? (t(), n("span", ni, "、" + s(g.value.completed) + " 次完成", 1)) : m("", !0)]),
        g.value.steady.length ? (t(), n("div", ii, [C[6] || (C[6] = a("h2", null, "已经稳定", -1)), a("p", null, s(g.value.steady.join("、")), 1)])) : m("", !0),
        g.value.practising.length ? (t(), n("div", li, [C[7] || (C[7] = a("h2", null, "最近独立做对", -1)), a("p", null, s(g.value.practising.join("、")), 1)])) : m("", !0),
        g.value.struggling.length ? (t(), n("div", si, [C[8] || (C[8] = a("h2", null, "还要再练", -1)), a("p", null, s(g.value.struggling.join("、")), 1)])) : m("", !0)
      ], 64)) : (t(), n("p", ti, "还需要几次练习才看得出"))])) : (t(), K(gt, {
        key: 3,
        embedded: "",
        state: e.state,
        disabled: e.disabled,
        onAction: C[4] || (C[4] = (v, d) => i("action", v, d)),
        onRemove: C[5] || (C[5] = (v, d, $) => i("remove", v, d, $))
      }, null, 8, ["state", "disabled"]))
    ], 64))]));
  }
}), oi = ri, ui = {
  class: "learning-settings-card",
  "aria-label": "训练设置"
}, di = { key: 0 }, vi = ["disabled"], ci = ["open"], gi = ["value"], mi = { class: "learning-row" }, pi = ["disabled"], bi = /* @__PURE__ */ Q({
  __name: "LearningSettingsCard",
  props: {
    state: {},
    disabled: { type: Boolean },
    onboarding: { type: Boolean }
  },
  emits: ["action"],
  setup(e, { emit: p }) {
    const l = e, i = p, o = [
      ["zh-CN", "中文"],
      ["en", "English"],
      ["ja", "日本語"],
      ["ko", "한국어"]
    ], u = I(() => l.state.profile?.settings ?? null), c = he().settings, y = c.form, f = ce(c, "open");
    function k() {
      Object.assign(y, {
        exam: u.value?.exam ?? "",
        level: u.value?.level ?? "",
        targetLevel: u.value?.targetLevel ?? "",
        explanationLanguage: u.value?.explanationLanguage ?? "zh-CN",
        interests: u.value?.interests ?? ""
      });
    }
    l.onboarding && !c.open && (k(), c.open = !0);
    const g = (v) => o.find(([d]) => d === v)?.[1] ?? new Intl.DisplayNames(["zh-CN"], { type: "language" }).of(v) ?? v, w = I(() => [.../* @__PURE__ */ new Set([...o.map(([v]) => v), u.value?.explanationLanguage ?? "zh-CN"])]), h = I(() => [
      ["考试", u.value?.exam || "不备考"],
      ["水平", u.value?.level || "不确定"],
      ["目标", u.value?.targetLevel || "比现在高一级"],
      ["讲解", g(u.value?.explanationLanguage ?? "zh-CN")],
      ["兴趣", u.value?.interests || "不限"]
    ]);
    function C() {
      const v = Rt(y);
      c.submitted = {
        value: v,
        form: { ...y }
      }, i("action", "settings", { value: v });
    }
    return (v, d) => (t(), n("section", ui, [f.value ? m("", !0) : (t(), n("dl", di, [(t(!0), n(M, null, D(h.value, ([$, j]) => (t(), n("div", { key: $ }, [a("dt", null, s($), 1), a("dd", null, s(j), 1)]))), 128))])), f.value ? (t(), n("form", {
      key: 2,
      class: "learning-fields",
      onSubmit: ae(C, ["prevent"])
    }, [
      a("label", null, [d[7] || (d[7] = G("考试", -1)), _(a("input", {
        "onUpdate:modelValue": d[1] || (d[1] = ($) => r(y).exam = $),
        type: "text",
        maxlength: "80",
        placeholder: "不备考（例如 雅思、JLPT N2）"
      }, null, 512), [[le, r(y).exam]])]),
      a("label", null, [d[8] || (d[8] = G("现在的水平", -1)), _(a("input", {
        "onUpdate:modelValue": d[2] || (d[2] = ($) => r(y).level = $),
        type: "text",
        maxlength: "80",
        placeholder: "不确定"
      }, null, 512), [[le, r(y).level]])]),
      a("label", null, [d[9] || (d[9] = G("目标", -1)), _(a("input", {
        "onUpdate:modelValue": d[3] || (d[3] = ($) => r(y).targetLevel = $),
        type: "text",
        maxlength: "80",
        placeholder: "比现在高一级"
      }, null, 512), [[le, r(y).targetLevel]])]),
      a("details", {
        class: "learning-settings-optional",
        open: !e.onboarding
      }, [
        a("summary", null, s(r(J).optionalSettings), 1),
        a("label", null, [d[10] || (d[10] = G("讲解语言", -1)), _(a("select", { "onUpdate:modelValue": d[4] || (d[4] = ($) => r(y).explanationLanguage = $) }, [(t(!0), n(M, null, D(w.value, ($) => (t(), n("option", {
          key: $,
          value: $
        }, s(g($)), 9, gi))), 128))], 512), [[Te, r(y).explanationLanguage]])]),
        a("label", null, [d[11] || (d[11] = G("感兴趣的话题", -1)), _(a("input", {
          "onUpdate:modelValue": d[5] || (d[5] = ($) => r(y).interests = $),
          type: "text",
          maxlength: "200",
          placeholder: "不限"
        }, null, 512), [[le, r(y).interests]])])
      ], 8, ci),
      a("div", mi, [e.onboarding ? m("", !0) : (t(), n("button", {
        key: 0,
        type: "button",
        onClick: d[6] || (d[6] = ($) => {
          f.value = !1, r(c).submitted = null;
        })
      }, "取消")), a("button", {
        type: "submit",
        class: "learning-primary",
        disabled: e.disabled
      }, s(e.onboarding ? r(J).setupFinish : r(J).saveSettings), 9, pi)])
    ], 32)) : (t(), n("button", {
      key: 1,
      type: "button",
      disabled: e.disabled,
      onClick: d[0] || (d[0] = ($) => {
        k(), f.value = !0;
      })
    }, "调整", 8, vi))]));
  }
}), Bt = bi, fi = { class: "learning-profile-page" }, yi = { class: "learning-setup-heading" }, ki = { class: "learning-eyebrow" }, hi = { class: "learning-language-options" }, $i = [
  "disabled",
  "aria-pressed",
  "onClick"
], wi = { "aria-hidden": "true" }, xi = ["disabled"], Ci = {
  key: 0,
  class: "learning-setup-empty"
}, Ii = { class: "learning-teacher-options" }, Li = [
  "disabled",
  "aria-pressed",
  "onClick"
], Si = { class: "learning-person-initial" }, Ai = {
  key: 1,
  class: "learning-selected-teacher"
}, Mi = { class: "learning-person-initial" }, Ri = { key: 0 }, Ti = ["open"], Ei = ["disabled"], Bi = ["disabled"], Ni = ["disabled"], Oi = { class: "learning-setup-actions" }, qi = ["disabled"], Vi = ["disabled"], Pi = /* @__PURE__ */ Q({
  __name: "LearningSetup",
  props: {
    state: {},
    disabled: { type: Boolean }
  },
  emits: ["action"],
  setup(e, { emit: p }) {
    const l = p, i = he().setup, o = ce(i, "step"), u = H(null), c = ce(i, "name"), y = ce(i, "note"), f = [
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
    async function k(g) {
      o.value = g, await ue(), u.value?.focus();
    }
    return Ee(() => o.value ? (k(o.value - 1), !0) : !1), (g, w) => (t(), n("section", fi, [a("div", yi, [a("p", ki, s(o.value + 1) + " / " + s(r(J).setupSteps), 1), a("h1", {
      ref_key: "heading",
      ref: u,
      tabindex: "-1"
    }, s(o.value === 0 ? "选择要学习的语言" : o.value === 1 ? "选择语伴" : r(J).setupTitle), 513)]), o.value === 0 ? (t(), n(M, { key: 0 }, [a("div", hi, [(t(), n(M, null, D(f, ([h, C, v]) => a("button", {
      key: h,
      type: "button",
      disabled: e.disabled,
      "aria-pressed": e.state.language === h,
      onClick: (d) => l("action", "language", { language: h })
    }, [
      a("span", wi, s(v), 1),
      a("strong", null, s(C), 1),
      e.state.language === h ? (t(), K(z, {
        key: 0,
        name: "check"
      })) : m("", !0)
    ], 8, $i)), 64))]), a("button", {
      type: "button",
      class: "learning-primary learning-setup-next",
      disabled: e.disabled,
      onClick: w[0] || (w[0] = (h) => k(1))
    }, [w[7] || (w[7] = G("继续", -1)), F(z, { name: "arrow" })], 8, xi)], 64)) : o.value === 1 ? (t(), n(M, { key: 1 }, [
      e.state.candidates.length ? m("", !0) : (t(), n("p", Ci, "当前故事里还没有认识的人物，所以没有可选的语伴。可以在下面手动填一位：名字加一句身份说明。")),
      a("div", Ii, [(t(!0), n(M, null, D(e.state.candidates, (h) => (t(), n("button", {
        key: h.name,
        type: "button",
        disabled: e.disabled,
        "aria-pressed": e.state.teacher?.name === h.name,
        onClick: (C) => l("action", "teacher", { teacher: {
          name: h.name,
          note: ""
        } })
      }, [
        a("span", Si, s([...h.name][0]), 1),
        a("strong", null, s(h.name), 1),
        e.state.teacher?.name === h.name ? (t(), K(z, {
          key: 0,
          name: "check"
        })) : m("", !0)
      ], 8, Li))), 128))]),
      e.state.teacher && !e.state.candidates.some((h) => h.name === e.state.teacher?.name) ? (t(), n("p", Ai, [
        a("span", Mi, s([...e.state.teacher.name][0]), 1),
        a("span", null, [G(s(e.state.teacher.name), 1), e.state.teacher.note ? (t(), n("small", Ri, s(e.state.teacher.note), 1)) : m("", !0)]),
        F(z, { name: "check" })
      ])) : m("", !0),
      a("details", {
        class: "learning-other-teacher",
        open: !e.state.candidates.length
      }, [a("summary", null, s(e.state.candidates.length ? "手动填写其他人物" : "手动填写"), 1), a("form", {
        class: "learning-fields",
        onSubmit: w[3] || (w[3] = ae((h) => l("action", "teacher", { teacher: {
          name: c.value.trim(),
          note: y.value.trim()
        } }), ["prevent"]))
      }, [
        a("label", null, [w[8] || (w[8] = G("名字", -1)), _(a("input", {
          "onUpdate:modelValue": w[1] || (w[1] = (h) => c.value = h),
          type: "text",
          maxlength: "80",
          placeholder: "例如 林老师",
          disabled: e.disabled
        }, null, 8, Ei), [[le, c.value]])]),
        a("label", null, [w[9] || (w[9] = G("一句身份说明", -1)), _(a("input", {
          "onUpdate:modelValue": w[2] || (w[2] = (h) => y.value = h),
          type: "text",
          maxlength: "200",
          placeholder: "例如 在东京长大的大学同学，说话直爽",
          disabled: e.disabled
        }, null, 8, Bi), [[le, y.value]])]),
        a("button", {
          type: "submit",
          disabled: e.disabled || !c.value.trim()
        }, "选这位", 8, Ni)
      ], 32)], 8, Ti),
      a("div", Oi, [a("button", {
        type: "button",
        disabled: e.disabled,
        onClick: w[4] || (w[4] = (h) => k(0))
      }, "上一步", 8, qi), a("button", {
        type: "button",
        class: "learning-primary",
        disabled: e.disabled || !e.state.teacher,
        onClick: w[5] || (w[5] = (h) => k(2))
      }, [G(s(r(J).setupContinue), 1), F(z, { name: "arrow" })], 8, Vi)])
    ], 64)) : (t(), K(Bt, {
      key: 2,
      onboarding: "",
      state: e.state,
      disabled: e.disabled || !e.state.teacher,
      onAction: w[6] || (w[6] = (h, C) => l("action", h, C ?? {}))
    }, null, 8, ["state", "disabled"]))]));
  }
}), Ui = Pi, Di = { class: "learning-companion-control" }, ji = {
  key: 0,
  class: "learning-sr-only"
}, Wi = { class: "learning-companion-options" }, Fi = { class: "learning-companion-switch" }, Gi = ["aria-label"], Hi = { class: "learning-cost-note" }, zi = /* @__PURE__ */ Q({
  __name: "LearningCompanionControl",
  props: { name: {} },
  setup(e) {
    const p = ce(he().companion, "enabled"), l = {
      title: "陪读",
      on: "一起学习中",
      off: "未开启",
      description: "开启后语伴会和你一起学习",
      costTitle: "费用说明",
      cost: "陪读消息和聊天一样，按你所用的 AI 服务计费。"
    };
    return (i, o) => (t(), n("details", Di, [a("summary", null, [
      a("span", {
        class: ne(["learning-companion-light", { "is-on": p.value }]),
        "aria-hidden": "true"
      }, null, 2),
      G(s(p.value ? e.name ? `${e.name} · ${l.on}` : l.on : l.title), 1),
      p.value ? m("", !0) : (t(), n("span", ji, s(l.off), 1))
    ]), a("div", Wi, [a("label", Fi, [a("span", null, s(l.description), 1), _(a("input", {
      "onUpdate:modelValue": o[0] || (o[0] = (u) => p.value = u),
      type: "checkbox",
      role: "switch",
      "aria-label": l.title
    }, null, 8, Gi), [[Yt, p.value]])]), a("details", Hi, [a("summary", null, s(l.costTitle), 1), a("small", null, s(l.cost), 1)])])]));
  }
}), Nt = zi, We = {
  unconfirmed: "还没确认保存是否成功，请先查看保存结果，不要重复提交。",
  conflict: "发现另一份学习记录，请先核对再继续。",
  unloaded: "暂时打不开学习记录。",
  failed: "这次没能保存，之前保存的内容都还在，请重试。"
}, oe = {
  paid: "奖励已到账",
  retired: "钱包已重置，这份奖励不再补发",
  saving: "正在保存学习成果…",
  pending: "学习已完成，奖励待领取",
  needsWallet: "开通钱包后即可领取",
  claim: "领取奖励",
  openWallet: "开通钱包并领取",
  unknown: "学习已完成，奖励到账情况还没确认。请查看钱包状态，不需要重新做练习。"
}, Yi = {
  context: "翻看学习资料",
  config: "连接语伴",
  session: "准备学习内容",
  summary: "整理之前聊过的内容",
  provider: "组织回复",
  tools: "整理学习内容",
  save: "保存学习内容",
  action: "准备学习内容"
};
function Ki(e) {
  return `正在${Yi[e.stage]}…`;
}
var wu = Object.freeze({
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
function mt(e) {
  return e.split(/\r?\n/u).filter((p) => p.trim());
}
var Zi = {
  class: "learning-complete",
  role: "status",
  "aria-live": "polite"
}, Ji = {
  key: 0,
  class: "learning-complete-burst",
  "aria-hidden": "true"
}, Qi = { class: "learning-complete-title" }, Xi = {
  key: 1,
  class: "learning-complete-amount"
}, _i = ["disabled"], el = /* @__PURE__ */ Q({
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
  setup(e, { emit: p }) {
    const l = e, i = p, o = I(() => l.state.completions.find((c) => c.unitId === l.unitId)), u = I(() => {
      const c = o.value?.rewardStatus;
      return c === "paid" ? oe.paid : c === "retired" ? oe.retired : o.value ? l.state.walletOpen ? oe.pending : oe.needsWallet : oe.saving;
    });
    return (c, y) => (t(), n("section", Zi, [
      e.quiet ? m("", !0) : (t(), n("div", Ji, [(t(), n(M, null, D(8, (f) => a("span", {
        key: f,
        style: kt({ "--i": f })
      }, null, 4)), 64))])),
      a("p", Qi, s(e.label), 1),
      o.value?.rewardStatus !== "retired" ? (t(), n("p", Xi, [a("strong", null, s(o.value?.rewardStatus === "paid" ? "+" : "") + s(o.value?.amount ?? e.amount), 1), y[1] || (y[1] = a("span", null, "小白币", -1))])) : m("", !0),
      a("small", null, s(u.value), 1),
      o.value && o.value.rewardStatus !== "paid" && o.value.rewardStatus !== "retired" ? (t(), n("button", {
        key: 2,
        type: "button",
        disabled: e.disabled || e.state.walletStorage !== "ready",
        onClick: y[0] || (y[0] = (f) => i("action", "reward", {
          unitId: e.unitId,
          openWallet: !e.state.walletOpen
        }))
      }, s(e.state.walletOpen ? r(oe).claim : r(oe).openWallet), 9, _i)) : m("", !0)
    ]));
  }
}), Ot = el, tl = ["aria-labelledby"], al = { id: "learning-grading-title" }, nl = {
  key: 0,
  class: "learning-grading-actions"
}, il = {
  key: 0,
  class: "learning-annotation-missing",
  role: "status"
}, ll = ["disabled"], sl = ["disabled"], rl = ["open", "onToggle"], ol = {
  key: 0,
  class: "learning-revised-text"
}, ul = { class: "learning-write-saved" }, dl = { key: 0 }, vl = {
  key: 1,
  class: "learning-graded-guidance"
}, cl = ["open", "onToggle"], gl = { key: 0 }, ml = { key: 1 }, pl = { key: 3 }, bl = { class: "learning-graded-text" }, fl = { class: "learning-annotation-fixed" }, yl = {
  key: 0,
  class: "learning-annotation-missing"
}, kl = {
  key: 1,
  class: "learning-annotation-fixed"
}, hl = ["onClick"], $l = { class: "learning-annotation-tag" }, wl = {
  key: 0,
  class: "learning-annotation-suggestion"
}, xl = ["onSubmit"], Cl = ["onUpdate:modelValue", "aria-label"], Il = ["disabled"], Ll = { key: 2 }, Sl = ["onClick"], Al = {
  key: 1,
  class: "learning-working",
  role: "status"
}, Ml = ["disabled"], Rl = ["disabled"], Tl = {
  key: 3,
  class: "learning-model-essay"
}, El = /* @__PURE__ */ Q({
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
  setup(e, { emit: p }) {
    const l = e, i = p, o = {
      content: "内容",
      grammar: "语法",
      vocabulary: "词汇",
      cohesion: "衔接"
    }, u = {
      error: "需要改",
      improve: "可以更好",
      alternative: "另一种说法"
    }, c = {
      grammar: "语法本",
      vocabulary: "生词本"
    }, y = {
      title: "看看哪里能写得更好",
      unplaced: "这处改动还没写进作文。请调整后再提交，或跳过修改。"
    }, f = (E) => E.itemId && (E.category === "grammar" || E.category === "vocabulary") ? c[E.category] : null, k = $e(() => l.unit.id), g = I(() => k.value.edits), w = I(() => l.unit.stage.stage), h = I(() => new Map(l.unit.materials.flatMap((E) => E.paragraphs).map((E, B) => [E.id, B + 1]))), C = (E) => E?.answer.kind === "text" ? E.answer.text : "", v = I(() => l.unit.stage.exercises.flatMap((E) => {
      const B = l.unit.exercises.find((ee) => ee.id === E.exerciseId), L = l.unit.attempts.find((ee) => ee.id === E.draftAttemptId);
      if (!B || !L) return [];
      const U = l.unit.assessments.find((ee) => ee.attemptId === L.id), T = l.unit.attempts.find((ee) => ee.id === E.revisionAttemptId), X = T && l.unit.assessments.find((ee) => ee.attemptId === T.id), se = U?.annotations ?? [];
      return [{
        row: E,
        exercise: B,
        draft: L,
        assessment: U,
        revision: T,
        review: X,
        annotations: se,
        label: B.paragraphId ? `第 ${h.value.get(B.paragraphId) ?? "?"} 段总结` : "作文",
        paragraphs: mt(C(L)).map((ee, ge) => ({
          index: ge,
          segments: xn(ee, se.filter((me) => me.paragraphIndex === ge)),
          annotations: se.filter((me) => me.paragraphIndex === ge)
        })),
        resolved: new Set(X?.resolvedAnnotationIds ?? [])
      }];
    }).sort((E, B) => +(B.annotations.length > 0) - +(E.annotations.length > 0))), d = (E) => w.value === "revising" && E.row.status === "revising", $ = (E, B) => d(E) && B.severity !== "alternative";
    Y(v, (E) => {
      for (const B of E.flatMap((L) => L.annotations)) g.value[B.id] ??= {
        value: B.quote,
        done: !1
      };
    }, { immediate: !0 });
    function j(E) {
      const B = g.value[E.id];
      B?.value.trim() && B.value !== E.quote && (B.done = !0);
    }
    const N = I(() => new Map(v.value.filter(d).map((E) => [E.draft.id, wn(C(E.draft), E.annotations.map((B) => ({
      id: B.id,
      paragraphIndex: B.paragraphIndex,
      quote: B.quote,
      replacement: g.value[B.id]?.done ? g.value[B.id].value : B.quote
    })))]))), R = I(() => new Set([...N.value.values()].flatMap((E) => E.missing))), q = I(() => [...N.value.values()].reduce((E, B) => E + B.applied.length, 0)), O = H("");
    Y(q, () => {
      O.value = "";
    });
    const P = I(() => v.value.filter(d).flatMap((E) => E.annotations.filter((B) => B.severity !== "alternative")).length), A = (E, B) => {
      const L = E.annotations.find((U) => U.id === B);
      return L ? ["learning-mark", `is-${L.severity}`] : "";
    };
    function V() {
      const E = v.value.filter(d).flatMap((B) => {
        const L = N.value.get(B.draft.id);
        return !L || L.text === C(B.draft) ? [] : [{
          attemptId: B.draft.id,
          text: L.text
        }];
      });
      E.length ? i("action", "submit-revision", {
        unitId: l.unit.id,
        revisions: E
      }) : O.value = y.unplaced;
    }
    const W = I(() => l.state.pending?.unitId === l.unit.id ? l.state.pending.purpose : null);
    return (E, B) => (t(), n("section", {
      class: "learning-grading",
      "aria-labelledby": e.view === "feedback" ? "learning-grading-title" : void 0
    }, [
      e.view === "feedback" ? (t(), n(M, { key: 0 }, [
        a("h2", al, s(y.title), 1),
        w.value === "revising" ? (t(), n("div", nl, [
          a("small", null, "已改 " + s(q.value) + " / " + s(P.value) + " 处", 1),
          O.value ? (t(), n("small", il, s(O.value), 1)) : m("", !0),
          a("button", {
            type: "button",
            disabled: e.disabled,
            onClick: B[0] || (B[0] = (L) => i("confirm", "skip-revision", { unitId: e.unit.id }, "跳过这次修改？批注会保留，直接进入范文。"))
          }, "跳过修改", 8, ll),
          a("button", {
            type: "button",
            class: "learning-primary",
            disabled: e.disabled || !q.value,
            onClick: V
          }, "提交修改", 8, sl)
        ])) : m("", !0),
        (t(!0), n(M, null, D(v.value, (L) => (t(), n("details", {
          key: L.exercise.id,
          class: "learning-graded",
          open: r(k).expanded[`grading:${L.draft.id}`] ?? L.annotations.length > 0,
          onToggle: (U) => r(k).expanded[`grading:${L.draft.id}`] = U.target.open
        }, [
          a("summary", null, [a("h3", null, s(L.label), 1)]),
          L.revision ? (t(), n("section", ol, [
            a("h4", null, s(r(J).revision), 1),
            a("p", ul, s(C(L.revision)), 1),
            L.review?.guidance ? (t(), n("p", dl, s(L.review.guidance), 1)) : m("", !0)
          ])) : m("", !0),
          L.assessment?.guidance ? (t(), n("p", vl, s(L.assessment.guidance), 1)) : m("", !0),
          L.assessment && (L.assessment.understanding || L.assessment.expression) ? (t(), n("details", {
            key: 2,
            class: "learning-graded-more",
            open: r(k).expanded[`feedback:${L.draft.id}`],
            onToggle: (U) => r(k).expanded[`feedback:${L.draft.id}`] = U.target.open
          }, [
            B[6] || (B[6] = a("summary", null, "理解与表达点评", -1)),
            L.assessment.understanding ? (t(), n("p", gl, [B[4] || (B[4] = a("b", null, "理解", -1)), G(s(L.assessment.understanding), 1)])) : m("", !0),
            L.assessment.expression ? (t(), n("p", ml, [B[5] || (B[5] = a("b", null, "表达", -1)), G(s(L.assessment.expression), 1)])) : m("", !0)
          ], 40, cl)) : m("", !0),
          L.revision ? (t(), n("h4", pl, s(r(J).original), 1)) : m("", !0),
          (t(!0), n(M, null, D(L.paragraphs, (U) => (t(), n("div", {
            key: U.index,
            class: "learning-graded-paragraph"
          }, [a("p", bl, [(t(!0), n(M, null, D(U.segments, (T, X) => (t(), n(M, { key: X }, [T.id ? (t(), n("mark", {
            key: 0,
            class: ne(A(L, T.id))
          }, s(T.text), 3)) : (t(), n(M, { key: 1 }, [G(s(T.text), 1)], 64))], 64))), 128))]), (t(!0), n(M, null, D(U.annotations, (T) => (t(), n("div", {
            key: T.id,
            class: ne(["learning-annotation", [`is-${T.severity}`, {
              "is-fixed": L.resolved.has(T.id),
              "is-edited": g.value[T.id]?.done && d(L)
            }]])
          }, [L.resolved.has(T.id) ? (t(), n(M, { key: 0 }, [a("p", fl, "✓ " + s(r(J).resolved), 1), a("p", null, s(T.explanation), 1)], 64)) : g.value[T.id]?.done && d(L) ? (t(), n(M, { key: 1 }, [R.value.has(T.id) ? (t(), n("p", yl, "原文里找不到“" + s(T.quote) + "”，这处改动不会写进修改稿。", 1)) : (t(), n("p", kl, "✓ 改为“" + s(g.value[T.id].value) + "”", 1)), a("button", {
            type: "button",
            onClick: (X) => g.value[T.id].done = !1
          }, "再改", 8, hl)], 64)) : (t(), n(M, { key: 2 }, [
            a("p", $l, [a("span", null, s(u[T.severity]), 1), G(s(o[T.category]), 1)]),
            a("p", null, s(T.explanation), 1),
            T.suggestion ? (t(), n("p", wl, "可以写成：" + s(T.suggestion), 1)) : m("", !0),
            $(L, T) && g.value[T.id] ? (t(), n("form", {
              key: 1,
              class: "learning-annotation-edit",
              onSubmit: ae((X) => j(T), ["prevent"])
            }, [_(a("textarea", {
              "onUpdate:modelValue": (X) => g.value[T.id].value = X,
              rows: "2",
              "aria-label": `改写：${T.quote}`,
              maxlength: "600"
            }, null, 8, Cl), [[le, g.value[T.id].value], [r(Oe), g.value[T.id]]]), a("button", {
              type: "submit",
              disabled: !g.value[T.id].value.trim() || g.value[T.id].value === T.quote
            }, "改好了", 8, Il)], 40, xl)) : L.review && T.severity !== "alternative" ? (t(), n("small", Ll, "复核时这里还没改到")) : m("", !0)
          ], 64)), f(T) ? (t(), n("button", {
            key: 3,
            type: "button",
            class: "learning-annotation-book",
            onClick: (X) => i("record", T.itemId)
          }, s(f(T)) + " ↗", 9, Sl)) : m("", !0)], 2))), 128))]))), 128))
        ], 40, rl))), 128))
      ], 64)) : m("", !0),
      [
        "grading",
        "reviewing",
        "model"
      ].includes(w.value) ? (t(), n("div", Al, [W.value ? (t(), n(M, { key: 0 }, [
        B[7] || (B[7] = a("span", {
          class: "learning-working-dot",
          "aria-hidden": "true"
        }, null, -1)),
        a("span", null, s(W.value === "grade" ? r(J).grading : W.value === "revision-review" ? r(J).reviewing : r(J).modelling), 1),
        a("button", {
          type: "button",
          disabled: e.pending,
          onClick: B[1] || (B[1] = (L) => i("action", "cancel"))
        }, s(r(J).stop), 9, Ml)
      ], 64)) : (t(), n("button", {
        key: 1,
        type: "button",
        class: "learning-primary",
        disabled: e.disabled,
        onClick: B[2] || (B[2] = (L) => i("action", "grade", { unitId: e.unit.id }))
      }, s(w.value === "grading" ? r(J).grade : r(J).continue), 9, Rl))])) : m("", !0),
      e.view === "model" && w.value === "complete" ? (t(), K(Ot, {
        key: 2,
        state: e.state,
        "unit-id": e.unit.id,
        amount: e.unit.reward.amount,
        label: "本篇完成",
        disabled: e.disabled,
        onAction: B[3] || (B[3] = (L, U) => i("action", L, U))
      }, null, 8, [
        "state",
        "unit-id",
        "amount",
        "disabled"
      ])) : m("", !0),
      e.view === "model" && e.unit.modelEssay ? (t(), n("section", Tl, [a("h3", null, [B[8] || (B[8] = G("范文", -1)), a("small", null, s(e.unit.modelEssay.level), 1)]), (t(!0), n(M, null, D(r(mt)(e.unit.modelEssay.text), (L, U) => (t(), n("p", { key: U }, s(L), 1))), 128))])) : m("", !0)
    ], 8, tl));
  }
}), Bl = El, Nl = ["data-exercise-id"], Ol = { class: "learning-write-label" }, ql = [
  "aria-label",
  "placeholder",
  "rows",
  "onKeydown"
], Vl = { class: "learning-write-foot" }, Pl = { "aria-live": "polite" }, Ul = ["disabled"], Dl = { class: "learning-write-saved" }, jl = { class: "learning-write-foot" }, Wl = ["disabled"], Fl = /* @__PURE__ */ Q({
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
  setup(e, { emit: p }) {
    const l = e, i = p, o = $e(() => l.unit.id);
    Y([o, () => l.exercise.id], () => {
      o.value.writing[l.exercise.id] ??= {
        text: "",
        rewriting: !1,
        submitted: null
      };
    }, { immediate: !0 });
    const u = I(() => o.value.writing[l.exercise.id]), c = I({
      get: () => u.value.text,
      set: (N) => {
        u.value.text = N;
      }
    }), y = I({
      get: () => u.value.rewriting,
      set: (N) => {
        u.value.rewriting = N;
      }
    }), f = I(() => l.unit.attempts.filter((N) => N.exerciseId === l.exercise.id && N.revisesAttemptId === void 0).at(-1)), k = I(() => l.unit.assessments.some((N) => N.attemptId === f.value?.id && N.verdict !== "disputed")), g = I(() => f.value?.answer.kind === "text" ? f.value.answer.text : ""), w = I(() => !f.value || y.value), h = I(() => ["writing", "grading"].includes(l.unit.stage.stage) && !k.value && !l.state.pending), C = I(() => vt(c.value, l.state.language)), v = I(() => vt(g.value, l.state.language)), d = I(() => l.state.conversation.summaryReviews.find((N) => N.attemptId === f.value?.id)?.text ?? "");
    function $() {
      l.disabled || !c.value.trim() || (u.value.submitted = {
        before: f.value?.id,
        text: c.value
      }, i("action", "submit", {
        unitId: l.unit.id,
        exerciseId: l.exercise.id,
        answer: {
          kind: "text",
          text: c.value.trim()
        }
      }));
    }
    function j() {
      c.value = g.value, y.value = !0;
    }
    return (N, R) => (t(), n("div", {
      class: ne(["learning-write", `is-${e.tone ?? "summary"}`]),
      "data-exercise-id": e.exercise.id
    }, [
      a("p", Ol, s(e.label), 1),
      w.value ? (t(), n("form", {
        key: 0,
        onSubmit: ae($, ["prevent"])
      }, [_(a("textarea", {
        "onUpdate:modelValue": R[0] || (R[0] = (q) => c.value = q),
        "aria-label": e.label,
        placeholder: e.placeholder,
        maxlength: "4000",
        rows: e.tone === "essay" ? 8 : 3,
        onKeydown: [be(ae($, ["ctrl", "prevent"]), ["enter"]), be(ae($, ["meta", "prevent"]), ["enter"])]
      }, null, 40, ql), [[le, c.value], [r(Oe), u.value]]), a("div", Vl, [
        a("small", Pl, s(C.value.count) + " " + s(C.value.unit), 1),
        y.value ? (t(), n("button", {
          key: 0,
          type: "button",
          onClick: R[1] || (R[1] = (q) => {
            y.value = !1, c.value = "";
          })
        }, "取消")) : m("", !0),
        a("button", {
          type: "submit",
          class: "learning-primary",
          disabled: e.disabled || !c.value.trim()
        }, s(f.value ? "保存新稿" : "提交"), 9, Ul)
      ])], 32)) : f.value ? (t(), n(M, { key: 1 }, [a("p", Dl, s(g.value), 1), a("div", jl, [a("small", null, "已保存 · " + s(v.value.count) + " " + s(v.value.unit), 1), h.value ? (t(), n("button", {
        key: 0,
        type: "button",
        disabled: e.disabled,
        onClick: j
      }, "重写", 8, Wl)) : m("", !0)])], 64)) : m("", !0),
      d.value ? (t(), K(Ge, {
        key: 2,
        class: "learning-markdown learning-write-reply",
        text: d.value
      }, null, 8, ["text"])) : m("", !0)
    ], 10, Nl));
  }
}), qt = Fl, ie = {
  noWeb: "还没连接联网取材。你可以去设置，或先读一篇语伴原创。",
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
}, Gl = "用你的话概括这一段", Hl = ["data-paragraph-id", "data-material-id"], zl = { class: "learning-reading-text" }, Yl = {
  class: "learning-reading-number",
  "aria-hidden": "true"
}, Kl = ["data-material-id", "data-paragraph-id"], Zl = ["disabled"], Jl = ["open"], Ql = { key: 0 }, Xl = { class: "learning-knowledge-text" }, _l = {
  key: 0,
  class: "learning-terms"
}, es = [
  "disabled",
  "aria-pressed",
  "onClick"
], ts = {
  key: 2,
  class: "learning-muted learning-knowledge-pending"
}, as = /* @__PURE__ */ Q({
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
  setup(e, { emit: p }) {
    const l = e, i = p, o = I(() => l.unit.explanations.find((h) => h.materialId === l.materialId && h.paragraphId === l.paragraph.id)), u = I(() => l.unit.exercises.find((h) => h.paragraphId === l.paragraph.id)), c = I(() => new Set(l.state.savedTerms)), y = (h) => c.value.has(h), f = $e(() => l.unit.id), k = I(() => `knowledge:${l.materialId}:${l.paragraph.id}`), g = I(() => f.value.selection?.materialId === l.materialId && f.value.selection.paragraphId === l.paragraph.id ? f.value.selection : null);
    function w() {
      f.value.selection = {
        materialId: l.materialId,
        paragraphId: l.paragraph.id,
        start: 0,
        end: l.paragraph.text.length,
        quote: l.paragraph.text
      };
    }
    return (h, C) => (t(), n("section", {
      class: "learning-reading-paragraph",
      "data-paragraph-id": e.paragraph.id,
      "data-material-id": e.materialId
    }, [
      a("p", zl, [a("span", Yl, s(e.number), 1), a("span", {
        "data-learning-text": "",
        "data-material-id": e.materialId,
        "data-paragraph-id": e.paragraph.id
      }, s(e.paragraph.text), 9, Kl)]),
      a("button", {
        type: "button",
        class: "learning-paragraph-quote",
        disabled: [...e.paragraph.text].length > r(wt),
        onClick: w
      }, s(r(Ie).select), 9, Zl),
      g.value ? (t(), K(Mt, {
        key: 0,
        selection: g.value,
        disabled: e.disabled,
        onAsk: C[0] || (C[0] = (v) => i("ask", u.value?.id, g.value)),
        onSay: C[1] || (C[1] = (v) => i("action", "say", { selection: g.value })),
        onDismiss: C[2] || (C[2] = (v) => r(f).selection = null)
      }, null, 8, ["selection", "disabled"])) : m("", !0),
      o.value ? (t(), n("details", {
        key: 1,
        class: "learning-knowledge",
        open: r(f).expanded[k.value],
        onToggle: C[3] || (C[3] = (v) => r(f).expanded[k.value] = v.target.open)
      }, [
        a("summary", null, [C[5] || (C[5] = G("本段知识", -1)), o.value.terms.length ? (t(), n("span", Ql, " · " + s(o.value.terms.length) + " 个词语", 1)) : m("", !0)]),
        a("p", Xl, s(o.value.explanation), 1),
        o.value.terms.length ? (t(), n("ul", _l, [(t(!0), n(M, null, D(o.value.terms, (v) => (t(), n("li", { key: v.text }, [a("span", null, [a("strong", null, s(v.text), 1), a("small", null, s(v.note), 1)]), a("button", {
          type: "button",
          disabled: e.disabled || y(v.text),
          "aria-pressed": y(v.text),
          onClick: (d) => i("action", "bookmark", {
            unitId: e.unit.id,
            materialId: e.materialId,
            paragraphId: e.paragraph.id,
            termText: v.text
          })
        }, s(y(v.text) ? "已收藏" : "收藏"), 9, es)]))), 128))])) : m("", !0)
      ], 40, Jl)) : (t(), n("p", ts, s(e.state.preparation?.running ? r(ie).notes : r(ie).missingNotes), 1)),
      u.value ? (t(), K(qt, {
        key: 3,
        state: e.state,
        unit: e.unit,
        exercise: u.value,
        disabled: e.disabled,
        label: r(Gl),
        placeholder: "写下这段的大意，不必逐句翻译",
        onAction: C[4] || (C[4] = (v, d) => i("action", v, d))
      }, null, 8, [
        "state",
        "unit",
        "exercise",
        "disabled",
        "label"
      ])) : m("", !0)
    ], 8, Hl));
  }
}), ns = as, is = ["aria-label"], ls = [
  "aria-current",
  "disabled",
  "onClick"
], ss = { class: "learning-reading-head" }, rs = ["open"], os = { key: 0 }, us = { class: "learning-source" }, ds = ["href"], vs = {
  key: 0,
  class: "learning-essay"
}, cs = { class: "learning-essay-prompt" }, gs = {
  key: 1,
  class: "learning-essay"
}, ms = { class: "learning-muted" }, ps = ["aria-label"], bs = ["aria-current"], fs = {
  key: 2,
  class: "learning-stage-bar is-writing"
}, ys = {
  key: 1,
  class: "learning-muted"
}, ks = {
  key: 3,
  class: "learning-stage-bar"
}, hs = ["disabled"], $s = ["disabled"], ws = /* @__PURE__ */ Q({
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
  setup(e, { emit: p }) {
    const l = e, i = p, o = H(null), u = $e(() => l.unit.id);
    xt(o, () => l.unit.materials, (N) => {
      u.value.selection = N;
    });
    const c = I(() => l.unit.stage.stage), y = I(() => {
      if (c.value === "writing") return "reading";
      const N = u.value.reading.view;
      return N === "model" && ![
        "reviewing",
        "model",
        "complete"
      ].includes(c.value) ? "feedback" : N ?? (c.value === "complete" ? "model" : c.value === "grading" ? "reading" : "feedback");
    }), f = [
      "reading",
      "feedback",
      "model"
    ];
    async function k(N) {
      const R = o.value?.closest(".learning-scroll");
      R && (u.value.reading.scrolls[y.value] = R.scrollTop), u.value.reading.view = N, await ue(), R && (R.scrollTop = u.value.reading.scrolls[N] ?? 0);
    }
    const g = [
      ["writing", "阅读与写作"],
      ["grading", "统一批改"],
      ["revising", "修改"],
      ["model", "范文"],
      ["complete", "完成"]
    ], w = I(() => ({
      writing: 0,
      grading: 1,
      revising: 2,
      reviewing: 3,
      model: 3,
      complete: 4
    })[c.value] ?? 0), h = I(() => l.unit.exercises.find((N) => !N.paragraphId)), C = I(() => l.unit.stage.exercises.filter((N) => N.status === "writing").map((N) => N.exerciseId)), v = {
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
    }, d = I(() => {
      let N = 0;
      return l.unit.materials.map((R) => ({
        material: R,
        paragraphs: R.paragraphs.map((q) => ({
          paragraph: q,
          number: ++N
        }))
      }));
    }), $ = (N, R) => i("action", N, R);
    function j(N) {
      const R = o.value?.querySelector(`[data-exercise-id="${CSS.escape(N)}"]`);
      R?.scrollIntoView({
        block: "center",
        behavior: matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth"
      }), R?.querySelector("textarea, button")?.focus({ preventScroll: !0 });
    }
    return (N, R) => (t(), n("article", {
      ref_key: "root",
      ref: o,
      class: "learning-reading"
    }, [
      c.value !== "writing" ? (t(), n("nav", {
        key: 0,
        class: "learning-reading-nav",
        "aria-label": r(J).navigation
      }, [(t(), n(M, null, D(f, (q) => a("button", {
        key: q,
        type: "button",
        "aria-current": y.value === q ? "page" : void 0,
        disabled: q === "model" && ![
          "reviewing",
          "model",
          "complete"
        ].includes(c.value),
        onClick: (O) => k(q)
      }, s(r(J)[q]), 9, ls)), 64))], 8, is)) : m("", !0),
      y.value === "reading" ? (t(), n(M, { key: 1 }, [
        a("header", ss, [a("details", {
          class: "learning-reading-goal",
          open: r(u).expanded.goal,
          onToggle: R[0] || (R[0] = (q) => r(u).expanded.goal = q.target.open)
        }, [
          a("summary", null, s(v.goal), 1),
          a("strong", null, s(e.unit.title), 1),
          e.unit.goal ? (t(), n("p", os, s(e.unit.goal), 1)) : m("", !0)
        ], 40, rs), F(Nt, { name: e.state.teacher?.name }, null, 8, ["name"])]),
        (t(!0), n(M, null, D(d.value, (q, O) => (t(), n("section", {
          key: q.material.id,
          class: "learning-reading-material"
        }, [
          (t(), K(Kt(O === 0 ? "h1" : "h2"), { tabindex: "-1" }, {
            default: Gt(() => [G(s(q.material.title), 1)]),
            _: 2
          }, 1024)),
          a("p", us, [q.material.provenance.kind === "authored" ? (t(), n(M, { key: 0 }, [G(s(v.authored), 1)], 64)) : (t(), n(M, { key: 1 }, [G(s(q.material.provenance.kind === "adapted" ? v.adapted : v.original) + " ", 1), a("a", {
            href: q.material.provenance.url,
            target: "_blank",
            rel: "noopener noreferrer"
          }, s(q.material.provenance.title), 9, ds)], 64))]),
          (t(!0), n(M, null, D(q.paragraphs, (P) => (t(), K(ns, {
            key: P.paragraph.id,
            state: e.state,
            unit: e.unit,
            "material-id": q.material.id,
            paragraph: P.paragraph,
            number: P.number,
            disabled: e.disabled,
            onAction: $,
            onAsk: R[1] || (R[1] = (A, V) => i("ask", A, V))
          }, null, 8, [
            "state",
            "unit",
            "material-id",
            "paragraph",
            "number",
            "disabled"
          ]))), 128))
        ]))), 128)),
        h.value ? (t(), n("section", vs, [
          a("h2", null, s(v.essay), 1),
          a("p", cs, s(h.value.prompt), 1),
          F(qt, {
            state: e.state,
            unit: e.unit,
            exercise: h.value,
            disabled: e.disabled,
            label: v.essayLabel,
            placeholder: v.essayPlaceholder,
            tone: "essay",
            onAction: $
          }, null, 8, [
            "state",
            "unit",
            "exercise",
            "disabled",
            "label",
            "placeholder"
          ])
        ])) : (t(), n("section", gs, [a("h2", null, s(v.essay), 1), a("p", ms, s(e.state.preparation?.running ? r(ie).essay : r(ie).missingEssay), 1)])),
        a("ol", {
          class: "learning-steps",
          "aria-label": v.progress
        }, [(t(), n(M, null, D(g, ([q, O], P) => a("li", {
          key: q,
          class: ne({
            "is-done": P < w.value,
            "is-current": P === w.value
          }),
          "aria-current": P === w.value ? "step" : void 0
        }, s(O), 11, bs)), 64))], 8, ps),
        c.value === "writing" ? (t(), n("div", fs, [a("span", null, s(v.written) + " " + s(e.unit.stage.exercises.length - C.value.length) + " / " + s(e.unit.stage.exercises.length), 1), C.value.length ? (t(), n("button", {
          key: 0,
          type: "button",
          onClick: R[2] || (R[2] = (q) => j(C.value[0]))
        }, s(v.next), 1)) : (t(), n("span", ys, s(e.unit.preparation.essay ? r(ie).missingNotes : r(ie).missingEssay), 1))])) : c.value === "grading" ? (t(), n("div", ks, [e.state.pending?.purpose === "grade" ? (t(), n(M, { key: 0 }, [
          R[9] || (R[9] = a("span", {
            class: "learning-working-dot",
            "aria-hidden": "true"
          }, null, -1)),
          a("span", null, s(r(J).grading), 1),
          a("button", {
            type: "button",
            disabled: e.pending,
            onClick: R[3] || (R[3] = (q) => i("action", "cancel"))
          }, s(r(J).stop), 9, hs)
        ], 64)) : (t(), n(M, { key: 1 }, [a("span", null, s(r(J).gradeReady), 1), a("button", {
          type: "button",
          class: "learning-primary",
          disabled: e.disabled,
          onClick: R[4] || (R[4] = (q) => i("action", "grade", { unitId: e.unit.id }))
        }, s(r(J).grade), 9, $s)], 64))])) : (t(), n("button", {
          key: 4,
          type: "button",
          class: "learning-primary",
          onClick: R[5] || (R[5] = (q) => k("feedback"))
        }, s(r(J).feedback), 1))
      ], 64)) : (t(), K(Bl, {
        key: 2,
        view: y.value,
        state: e.state,
        unit: e.unit,
        disabled: e.disabled,
        pending: e.pending,
        onAction: $,
        onConfirm: R[6] || (R[6] = (q, O, P) => i("confirm", q, O, P)),
        onRecord: R[7] || (R[7] = (q) => i("record", q))
      }, null, 8, [
        "view",
        "state",
        "unit",
        "disabled",
        "pending"
      ])),
      y.value === "feedback" && c.value === "complete" ? (t(), n("button", {
        key: 3,
        type: "button",
        class: "learning-primary",
        onClick: R[8] || (R[8] = (q) => k("model"))
      }, s(r(J).viewModel), 1)) : m("", !0)
    ], 512));
  }
}), xs = ws, Cs = {
  class: "learning-review",
  "aria-labelledby": "learning-review-title"
}, Is = { class: "learning-review-head" }, Ls = { class: "learning-muted" }, Ss = ["disabled"], As = {
  class: "learning-review-dots",
  "aria-label": "复习卡片"
}, Ms = [
  "aria-label",
  "aria-current",
  "onClick"
], Rs = { class: "learning-eyebrow" }, Ts = { class: "learning-card-verdict" }, Es = { key: 0 }, Bs = { key: 1 }, Ns = {
  key: 1,
  class: "learning-working",
  role: "status"
}, Os = ["disabled"], qs = ["disabled"], Vs = ["disabled"], Ps = {
  key: 2,
  class: "learning-row"
}, Us = { class: "learning-review-results" }, Ds = ["aria-expanded", "onClick"], js = {
  key: 1,
  class: "learning-chip-reason"
}, Ws = /* @__PURE__ */ Q({
  __name: "LearningReview",
  props: {
    state: {},
    review: {},
    disabled: { type: Boolean },
    pending: { type: Boolean }
  },
  emits: ["action", "confirm"],
  setup(e, { emit: p }) {
    const l = e, i = p, o = {
      correct: "答对了",
      partial: "对了一部分",
      incorrect: "还没想起来",
      disputed: "等待复核"
    }, u = {
      answer: "你的作答",
      saved: "已保存，答完这组再一起看看。",
      ready: "这组答完了",
      grade: "批改这组"
    }, c = I(() => l.review.stage.stage), y = (L) => l.review.attempts.filter((U) => U.exerciseId === L).at(-1), f = () => Math.max(0, l.review.exercises.findIndex((L) => !y(L.id))), k = $e(() => l.review.id), g = I(() => k.value.review), w = I({
      get: () => g.value.index ?? f(),
      set: (L) => {
        g.value.index = L;
      }
    }), h = I(() => l.review.exercises[w.value]), C = I(() => h.value && y(h.value.id)), v = I(() => l.review.assessments.find((L) => L.attemptId === C.value?.id)), d = I(() => l.review.materials.flatMap((L) => L.paragraphs)), $ = I(() => g.value.drafts);
    Y(h, (L) => {
      L && !$.value[L.id] && ($.value[L.id] = Be(L.response));
    }, { immediate: !0 });
    const j = I({
      get: () => $.value[h.value.id],
      set: (L) => {
        $.value[h.value.id] = L;
      }
    }), N = I(() => l.review.exercises.filter((L) => y(L.id)).length), R = I({
      get: () => g.value.openReason,
      set: (L) => {
        g.value.openReason = L;
      }
    });
    function q(L) {
      i("action", "submit", {
        unitId: l.review.id,
        exerciseId: h.value.id,
        answer: L
      });
    }
    function O() {
      const L = l.review.exercises.findIndex((U) => !y(U.id));
      L >= 0 && (w.value = L);
    }
    const P = I(() => l.state.completions.find((L) => L.unitId === l.review.id)), A = I(() => P.value?.rewardStatus === "paid" || P.value?.rewardStatus === "retired");
    Y(g, (L) => {
      L.seenBefore ??= c.value === "complete" && ct.has(l.review.id);
    }, { immediate: !0 });
    const V = I(() => g.value.seenBefore ?? !1), W = I({
      get: () => g.value.expanded,
      set: (L) => {
        g.value.expanded = L;
      }
    });
    Y([c, () => l.review.id], ([L, U]) => {
      L === "complete" && ct.mark(U);
    }, { immediate: !0 });
    const E = I(() => V.value && A.value && !W.value), B = (L) => [...l.state.books.grammar, ...l.state.books.vocabulary].find((U) => U.id === L);
    return (L, U) => (t(), n("section", Cs, [
      a("header", Is, [
        U[7] || (U[7] = a("h2", { id: "learning-review-title" }, "今日复习", -1)),
        a("span", Ls, s(N.value) + " / " + s(e.review.exercises.length), 1),
        c.value === "answering" ? (t(), n("button", {
          key: 0,
          type: "button",
          disabled: e.disabled,
          onClick: U[0] || (U[0] = (T) => i("confirm", "abandon-review", {}, r(Se).review))
        }, "放下", 8, Ss)) : m("", !0)
      ]),
      a("nav", As, [(t(!0), n(M, null, D(e.review.exercises, (T, X) => (t(), n("button", {
        key: T.id,
        type: "button",
        "aria-label": `第 ${X + 1} 张`,
        "aria-current": X === w.value,
        class: ne({ "is-answered": !!y(T.id) }),
        onClick: (se) => w.value = X
      }, null, 10, Ms))), 128))]),
      c.value !== "complete" && h.value ? (t(), n("div", {
        key: `${h.value.id}:${C.value ? "back" : "front"}`,
        class: ne(["learning-card", { "is-back": !!C.value }])
      }, [
        a("p", Rs, s(C.value ? u.answer : `第 ${w.value + 1} 张`), 1),
        a("h3", null, s(h.value.prompt), 1),
        C.value ? (t(), n(M, { key: 1 }, [
          a("blockquote", null, s(r(He)(C.value.answer, h.value.response, d.value)), 1),
          v.value ? (t(), n(M, { key: 0 }, [a("p", Ts, s(o[v.value.verdict]), 1), v.value.guidance ? (t(), n("p", Es, s(v.value.guidance), 1)) : m("", !0)], 64)) : (t(), n("small", Bs, s(u.saved), 1)),
          N.value < e.review.exercises.length ? (t(), n("button", {
            key: 2,
            type: "button",
            class: "learning-primary",
            onClick: O
          }, "下一张")) : m("", !0)
        ], 64)) : (t(), K($t, {
          key: 0,
          modelValue: j.value,
          "onUpdate:modelValue": U[1] || (U[1] = (T) => j.value = T),
          response: h.value.response,
          paragraphs: d.value,
          disabled: e.disabled,
          onSubmit: q
        }, null, 8, [
          "modelValue",
          "response",
          "paragraphs",
          "disabled"
        ]))
      ], 2)) : m("", !0),
      c.value === "grading" ? (t(), n("div", Ns, [e.state.pending?.purpose === "review-assess" ? (t(), n(M, { key: 0 }, [
        U[8] || (U[8] = a("span", {
          class: "learning-working-dot",
          "aria-hidden": "true"
        }, null, -1)),
        U[9] || (U[9] = a("span", null, "正在批改这组复习…", -1)),
        a("button", {
          type: "button",
          disabled: e.pending,
          onClick: U[2] || (U[2] = (T) => i("action", "cancel"))
        }, "停止", 8, Os)
      ], 64)) : (t(), n(M, { key: 1 }, [
        a("span", null, s(u.ready), 1),
        a("button", {
          type: "button",
          disabled: e.disabled,
          onClick: U[3] || (U[3] = (T) => i("confirm", "abandon-review", {}, r(Se).review))
        }, "放下", 8, qs),
        a("button", {
          type: "button",
          disabled: e.disabled,
          onClick: U[4] || (U[4] = (T) => i("action", "grade", { unitId: e.review.id }))
        }, s(u.grade), 9, Vs)
      ], 64))])) : m("", !0),
      c.value === "complete" && E.value ? (t(), n("div", Ps, [U[10] || (U[10] = a("span", { class: "learning-muted" }, "这组复习已完成", -1)), a("button", {
        type: "button",
        "aria-expanded": !1,
        onClick: U[5] || (U[5] = (T) => W.value = !0)
      }, "查看结果")])) : c.value === "complete" ? (t(), n(M, { key: 3 }, [a("ul", Us, [(t(!0), n(M, null, D(e.review.exercises, (T) => (t(), n("li", { key: T.id }, [
        a("span", null, [a("strong", null, s(B(T.itemId)?.label ?? T.prompt), 1), a("small", null, s(o[e.review.assessments.find((X) => X.attemptId === y(T.id)?.id)?.verdict ?? "disputed"]), 1)]),
        B(T.itemId)?.nextReviewAt ? (t(), n("button", {
          key: 0,
          type: "button",
          class: "learning-chip",
          "aria-expanded": R.value === T.id,
          onClick: (X) => R.value = R.value === T.id ? "" : T.id
        }, s(r(ze)(B(T.itemId).nextReviewAt)), 9, Ds)) : m("", !0),
        R.value === T.id ? (t(), n("small", js, s(B(T.itemId)?.scheduleReason), 1)) : m("", !0)
      ]))), 128))]), F(Ot, {
        state: e.state,
        "unit-id": e.review.id,
        amount: e.review.reward.amount,
        label: "复习完成",
        disabled: e.disabled,
        quiet: V.value,
        onAction: U[6] || (U[6] = (T, X) => i("action", T, X))
      }, null, 8, [
        "state",
        "unit-id",
        "amount",
        "disabled",
        "quiet"
      ])], 64)) : m("", !0)
    ]));
  }
}), Fs = Ws, Gs = {
  key: 0,
  class: "learning-source-choice",
  "aria-live": "polite"
}, Hs = { class: "learning-row" }, zs = ["disabled"], Ys = ["disabled"], Ks = ["disabled"], Zs = {
  key: 1,
  class: "learning-preparation",
  "aria-live": "polite"
}, Js = {
  key: 0,
  class: "learning-turn-notice"
}, Qs = { class: "learning-row" }, Xs = ["disabled"], _s = /* @__PURE__ */ Q({
  __name: "LearningPreparation",
  props: {
    state: {},
    disabled: { type: Boolean },
    pending: { type: Boolean }
  },
  emits: ["action"],
  setup(e, { emit: p }) {
    const l = p;
    return (i, o) => e.state.sourceChoice ? (t(), n("section", Gs, [a("p", null, s(r(ie).noWeb), 1), a("div", Hs, [
      a("button", {
        type: "button",
        class: "learning-primary",
        disabled: e.pending,
        onClick: o[0] || (o[0] = (u) => l("action", "research-settings"))
      }, s(r(ie).settings), 9, zs),
      a("button", {
        type: "button",
        disabled: e.disabled,
        onClick: o[1] || (o[1] = (u) => l("action", "choose-original"))
      }, s(r(ie).original), 9, Ys),
      a("button", {
        type: "button",
        disabled: e.pending,
        onClick: o[2] || (o[2] = (u) => l("action", "dismiss-source"))
      }, s(e.state.unit ? r(ie).existing : r(ie).dismiss), 9, Ks)
    ])])) : !e.state.preparation?.running && (e.state.preparation || e.state.unit?.kind === "reading-writing" && !e.state.unit.preparation.ready) ? (t(), n("section", Zs, [e.state.preparation?.message ? (t(), n("p", Js, s(e.state.preparation.message), 1)) : m("", !0), a("div", Qs, [e.state.unit?.kind === "reading-writing" && !e.state.unit.preparation.ready ? (t(), n("button", {
      key: 0,
      type: "button",
      disabled: e.disabled,
      onClick: o[3] || (o[3] = (u) => l("action", "resume-preparation", { unitId: e.state.unit.id }))
    }, s(r(ie).resume), 9, Xs)) : m("", !0)])])) : m("", !0);
  }
}), pt = _s, er = { class: "learning-workbench" }, tr = {
  key: 1,
  class: "learning-due"
}, ar = {
  key: 0,
  class: "learning-working",
  role: "status"
}, nr = ["disabled"], ir = ["disabled"], lr = {
  key: 2,
  class: "learning-row"
}, sr = ["disabled"], rr = {
  key: 5,
  class: "learning-lesson"
}, or = { class: "learning-eyebrow" }, ur = { tabindex: "-1" }, dr = {
  key: 0,
  class: "learning-muted"
}, vr = ["onClick"], cr = ["onClick"], gr = { class: "learning-row" }, mr = ["disabled"], pr = {
  key: 6,
  class: "learning-start"
}, br = ["disabled"], fr = {
  key: 0,
  tabindex: "-1"
}, yr = { key: 1 }, kr = ["aria-label"], hr = { class: "learning-start-reading" }, $r = ["disabled"], wr = ["disabled"], xr = /* @__PURE__ */ Q({
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
  setup(e, { emit: p }) {
    const l = e, i = p, o = I(() => !!l.state.review && l.state.review.stage.stage !== "complete"), u = I(() => l.state.unit), c = I(() => !u.value || l.state.completions.some((C) => C.unitId === u.value?.id)), y = I(() => l.state.busy && !l.state.pending), f = {
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
    }, k = I(() => [
      new Intl.DisplayNames(["zh-CN"], { type: "language" }).of(l.state.language),
      l.state.profile?.settings.exam,
      [l.state.profile?.settings.level, l.state.profile?.settings.targetLevel].filter(Boolean).join(" → ")
    ].filter(Boolean).join(" · "));
    function g(C) {
      i("action", "prepare", {
        kind: C,
        message: C === "reading-writing" ? "请按我的训练设置准备一篇读写训练。" : "请按我现在的情况准备一节专项小课。"
      });
    }
    const w = (C, v) => i("action", C, v), h = (C, v, d) => i("confirm", C, v, d);
    return (C, v) => (t(), n("div", er, [
      !e.state.sourceChoice || !c.value ? (t(), K(pt, {
        key: 0,
        state: e.state,
        disabled: e.disabled,
        pending: e.pending,
        onAction: w
      }, null, 8, [
        "state",
        "disabled",
        "pending"
      ])) : m("", !0),
      e.state.dueCount && !o.value ? (t(), n("div", tr, [a("span", null, s(r(St)(e.state.dueCount)), 1), e.state.pending?.purpose === "review-prepare" ? (t(), n("span", ar, [
        v[12] || (v[12] = a("span", {
          class: "learning-working-dot",
          "aria-hidden": "true"
        }, null, -1)),
        v[13] || (v[13] = a("span", null, "正在出题…", -1)),
        a("button", {
          type: "button",
          disabled: e.pending,
          onClick: v[0] || (v[0] = (d) => i("action", "cancel"))
        }, "停止", 8, nr)
      ])) : e.state.blockedReview ? m("", !0) : (t(), n("button", {
        key: 1,
        type: "button",
        class: "learning-primary",
        disabled: e.disabled,
        onClick: v[1] || (v[1] = (d) => i("action", "start-review"))
      }, s(f.review), 9, ir))])) : m("", !0),
      e.state.blockedReview ? (t(), n("div", lr, [v[14] || (v[14] = a("p", { class: "learning-muted" }, "有一组复习在另一个故事中进行。回到那个故事可以接着做；也可以放下它，在这里重新出题。", -1)), a("button", {
        type: "button",
        disabled: e.disabled,
        onClick: v[2] || (v[2] = (d) => h("abandon-review", {}, r(Se).review))
      }, "放下", 8, sr)])) : m("", !0),
      e.state.review ? (t(), K(Fs, {
        key: 3,
        state: e.state,
        review: e.state.review,
        disabled: e.disabled,
        pending: e.pending,
        onAction: w,
        onConfirm: h
      }, null, 8, [
        "state",
        "review",
        "disabled",
        "pending"
      ])) : m("", !0),
      u.value?.kind === "reading-writing" ? (t(), K(xs, {
        key: 4,
        state: e.state,
        unit: u.value,
        disabled: e.disabled,
        pending: e.pending,
        onAction: w,
        onConfirm: h,
        onAsk: v[3] || (v[3] = (d, $) => i("ask", d, $)),
        onRecord: v[4] || (v[4] = (d) => i("record", d))
      }, null, 8, [
        "state",
        "unit",
        "disabled",
        "pending"
      ])) : u.value ? (t(), n("section", rr, [
        a("p", or, "专项小课 · 完成可得 " + s(u.value.reward.amount) + " 小白币", 1),
        a("h1", ur, s(u.value.title), 1),
        u.value.goal ? (t(), n("p", dr, s(u.value.goal), 1)) : m("", !0),
        (t(!0), n(M, null, D(u.value.materials, (d) => (t(), n("button", {
          key: d.id,
          type: "button",
          class: "learning-activity-link",
          onClick: ($) => i("present", {
            unitId: u.value.id,
            kind: "material",
            id: d.id,
            title: d.title
          })
        }, [
          F(z, { name: "book" }),
          a("span", null, s(d.title), 1),
          F(z, { name: "arrow" })
        ], 8, vr))), 128)),
        (t(!0), n(M, null, D(u.value.exercises, (d) => (t(), n("button", {
          key: d.id,
          type: "button",
          class: "learning-activity-link",
          onClick: ($) => i("present", {
            unitId: u.value.id,
            kind: "exercise",
            id: d.id,
            title: d.prompt
          })
        }, [
          F(z, { name: u.value.stage.exercises.find(($) => $.exerciseId === d.id)?.status === "done" ? "check" : "records" }, null, 8, ["name"]),
          a("span", null, s(d.prompt), 1),
          F(z, { name: "arrow" })
        ], 8, cr))), 128)),
        a("div", gr, [a("button", {
          type: "button",
          disabled: e.disabled,
          onClick: v[5] || (v[5] = (d) => i("action", "complete"))
        }, s(f.complete), 9, mr), a("button", {
          type: "button",
          onClick: v[6] || (v[6] = (d) => i("go", "materials"))
        }, s(f.notes), 1)])
      ])) : m("", !0),
      c.value ? (t(), n("section", pr, [e.state.blockedUnit ? (t(), n(M, { key: 0 }, [
        v[15] || (v[15] = a("h1", { tabindex: "-1" }, "当前课件在另一个故事中", -1)),
        v[16] || (v[16] = a("p", { class: "learning-muted" }, "回到那个故事可以继续；也可以放下它，在这里重新开始。", -1)),
        a("button", {
          type: "button",
          disabled: e.disabled,
          onClick: v[7] || (v[7] = (d) => h("abandon", {}, r(Se).lesson))
        }, "放下并重新开始", 8, br)
      ], 64)) : (t(), n(M, { key: 1 }, [
        u.value ? (t(), n("h2", yr, s(f.next), 1)) : (t(), n("h1", fr, s(e.state.teacher ? f.reading : f.selectFirst), 1)),
        e.state.teacher && !u.value ? (t(), n("button", {
          key: 2,
          type: "button",
          class: "learning-start-preference",
          "aria-label": `${f.settings}：${k.value}`,
          onClick: v[8] || (v[8] = (d) => i("go", "settings"))
        }, [a("span", null, [a("strong", null, s(f.settings), 1), a("small", null, s(k.value), 1)]), F(z, { name: "arrow" })], 8, kr)) : m("", !0),
        e.state.sourceChoice ? (t(), K(pt, {
          key: 3,
          state: e.state,
          disabled: e.disabled,
          pending: e.pending,
          onAction: w
        }, null, 8, [
          "state",
          "disabled",
          "pending"
        ])) : m("", !0),
        e.state.teacher && !y.value && !e.state.sourceChoice ? (t(), n(M, { key: 4 }, [a("section", hr, [
          F(z, { name: "workbook" }),
          a("p", null, s(f.readingHint), 1),
          a("button", {
            type: "button",
            class: "learning-primary",
            disabled: e.disabled,
            onClick: v[9] || (v[9] = (d) => g("reading-writing"))
          }, [G(s(f.start), 1), F(z, { name: "arrow" })], 8, $r)
        ]), a("button", {
          type: "button",
          class: "learning-start-secondary",
          disabled: e.disabled,
          onClick: v[10] || (v[10] = (d) => g("lesson"))
        }, [
          F(z, { name: "records" }),
          a("span", null, [a("strong", null, s(f.lesson), 1), a("small", null, s(f.lessonHint), 1)]),
          F(z, { name: "arrow" })
        ], 8, wr)], 64)) : e.state.teacher ? m("", !0) : (t(), n("button", {
          key: 5,
          type: "button",
          class: "learning-primary",
          onClick: v[11] || (v[11] = (d) => i("go", "profile"))
        }, s(f.select), 1))
      ], 64))])) : m("", !0)
    ]));
  }
}), Cr = xr;
function bt(e) {
  try {
    return JSON.parse(e);
  } catch {
    return {};
  }
}
function Ir(e) {
  const p = [];
  for (const l of e.messages) l.role === "assistant" ? p.push({
    message: l,
    results: []
  }) : l.role === "tool" && p.at(-1)?.results.push(l);
  return p.map(({ message: l, results: i }, o) => ({
    index: o + 1,
    text: l.toolCalls?.length ? l.content : "",
    receivedChars: l.receivedChars,
    thinking: l.hasReasoning,
    streaming: !!l.streaming,
    tools: (l.toolCalls ?? []).map((u) => {
      const c = i.find((g) => g.toolCallId === u.id), y = bt(c?.content ?? ""), f = e.status === "running", k = c?.error || y.ok === !1 ? "failed" : c?.content && !c.streaming ? "done" : !f || l.error ? "cancelled" : c?.streaming ? "running" : "preparing";
      return {
        id: u.id,
        name: u.name,
        status: k,
        input: bt(u.arguments),
        result: y
      };
    })
  }));
}
var Lr = ["aria-label"], Sr = { class: "learning-process-header" }, Ar = ["aria-expanded"], Mr = { "aria-hidden": "true" }, Rr = ["disabled", "aria-label"], Tr = ["aria-label"], Er = ["data-status"], Br = {
  class: "learning-process-dot",
  "aria-hidden": "true"
}, Nr = { key: 0 }, Or = { class: "learning-process-result" }, qr = {
  key: 1,
  class: "learning-process-status",
  role: "status",
  "aria-live": "polite"
}, Vr = {
  key: 0,
  class: "learning-working-dot",
  "aria-hidden": "true"
}, Pr = /* @__PURE__ */ Q({
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
  setup(e, { emit: p }) {
    const l = e, i = p, o = I(() => Ir(l.turn)), u = I(() => o.value.flatMap((v) => v.tools)), c = I(() => l.turn.status === "running"), y = I(() => ie.taskTitles[l.turn.purpose]), f = H(null), k = I(() => f.value ?? (c.value || l.turn.status === "failed")), g = H(null), w = I(() => l.turn.progress?.round ?? o.value.at(-1)?.index), h = I(() => {
      if (!c.value) return Z.outcomes[l.turn.status];
      const v = o.value.at(-1), d = v?.tools.find(($) => $.status === "running" || $.status === "preparing");
      if (d) return `${Z.tools[d.name] ?? Z.title} · ${Z[d.status]}`;
      if (l.turn.progress?.stage === "provider" && v?.streaming) {
        if (v.receivedChars) return Z.received(v.receivedChars);
        if (v.thinking) return Z.thinking;
      }
      return Ki(l.turn.progress ?? { stage: "provider" });
    });
    function C(v) {
      const d = [], $ = v.result.section ?? v.input.section;
      $ && Z.sections[$] && d.push(Z.sections[$]), v.result.resultsCount !== void 0 && d.push(Z.results(v.result.resultsCount)), v.result.paragraphCount !== void 0 && d.push(Z.paragraphs(v.result.paragraphCount)), v.result.dataCount !== void 0 && d.push(Z.entries(v.result.dataCount)), v.result.failedCount && d.push(Z.sourcesFailed(v.result.failedCount)), v.name === "LearningLessonEdit" && (v.input.materialsCount && d.push(Z.proposedMaterials(v.input.materialsCount)), v.input.exercisesCount && d.push(Z.proposedExercises(v.input.exercisesCount))), v.result.errorsCount && d.push(Z.issues(v.result.errorsCount));
      const j = (v.result.errorFields ?? []).map((N) => Da[N]).filter(Boolean);
      return j.length && d.push(Z.checkFields([...new Set(j)].join("、"))), d.join(" · ");
    }
    return Y(c, () => {
      f.value = null;
    }), Y(() => l.turn.messages, async () => {
      const v = g.value, d = !v || v.scrollHeight - v.scrollTop - v.clientHeight < 48;
      await ue(), d && g.value && (g.value.scrollTop = g.value.scrollHeight);
    }), (v, d) => c.value || u.value.length ? (t(), n("section", {
      key: 0,
      class: ne(["learning-process", { "is-running": c.value }]),
      "aria-label": r(Z).title
    }, [
      a("header", Sr, [a("button", {
        type: "button",
        class: "learning-process-toggle",
        "aria-expanded": k.value,
        onClick: d[0] || (d[0] = ($) => f.value = !k.value)
      }, [
        a("span", Mr, s(k.value ? "⌄" : "›"), 1),
        a("strong", null, s(y.value ?? r(Z).title), 1),
        a("small", null, s(c.value && w.value ? r(Z).round(w.value) : r(Z).history(u.value.length)), 1)
      ], 8, Ar), c.value && e.stoppable ? (t(), n("button", {
        key: 0,
        type: "button",
        class: "learning-process-stop",
        disabled: e.disabled,
        "aria-label": r(Z).stop,
        onClick: d[1] || (d[1] = ($) => i("stop"))
      }, "■", 8, Rr)) : m("", !0)]),
      k.value ? (t(), n("div", {
        key: 0,
        ref_key: "body",
        ref: g,
        class: "learning-process-body"
      }, [(t(!0), n(M, null, D(o.value, ($) => (t(), n(M, { key: $.index }, [$.text ? (t(), K(Ge, {
        key: 0,
        class: "learning-markdown learning-process-narration",
        text: $.text
      }, null, 8, ["text"])) : m("", !0), $.tools.length ? (t(), n("ol", {
        key: 1,
        class: "learning-process-steps",
        "aria-label": r(Z).round($.index)
      }, [(t(!0), n(M, null, D($.tools, (j) => (t(), n("li", {
        key: j.id,
        "data-status": j.status
      }, [
        a("span", Br, s(j.status === "done" ? "✓" : j.status === "failed" ? "!" : "·"), 1),
        a("div", null, [a("span", null, s(r(Z).tools[j.name] ?? r(Z).title), 1), C(j) ? (t(), n("small", Nr, s(C(j)), 1)) : m("", !0)]),
        a("small", Or, s(r(Z)[j.status]), 1)
      ], 8, Er))), 128))], 8, Tr)) : m("", !0)], 64))), 128))], 512)) : m("", !0),
      !y.value || c.value || k.value ? (t(), n("p", qr, [c.value ? (t(), n("span", Vr)) : m("", !0), G(s(h.value), 1)])) : m("", !0)
    ], 10, Lr)) : m("", !0);
  }
}), Vt = Pr;
function Le(e) {
  return e.kind === "reading-article" || e.kind === "reading-notes" || e.kind === "reading-essay";
}
function Ne(e) {
  return e.kind === "talk" || e.kind === "explain" || e.kind === "companion";
}
var ft = {
  initial: "我想跟你学这门语言，先聊聊吧。",
  returning: "我来继续学语言了，先聊聊今天从哪里开始吧。"
}, Ur = { class: "learning-messages" }, Dr = /* @__PURE__ */ Q({
  __name: "LearningMessages",
  props: {
    turn: {},
    disabled: { type: Boolean }
  },
  emits: ["stop"],
  setup(e, { emit: p }) {
    const l = e, i = p, o = I(() => l.turn.messages.filter((u) => u.role === "assistant" && !u.toolCalls?.length && u.content));
    return (u, c) => (t(), n("div", Ur, [F(Vt, {
      turn: e.turn,
      stoppable: "",
      disabled: e.disabled,
      onStop: c[0] || (c[0] = (y) => i("stop"))
    }, null, 8, ["turn", "disabled"]), (t(!0), n(M, null, D(o.value, (y, f) => (t(), n("div", {
      key: f,
      class: ne(["learning-output", { "is-streaming": y.streaming }])
    }, [F(Ge, {
      class: "learning-markdown",
      text: y.content
    }, null, 8, ["text"])], 2))), 128))]));
  }
}), jr = Dr, Wr = { class: "learning-conversation" }, Fr = { class: "learning-conversation-heading" }, Gr = { class: "learning-person-initial" }, Hr = ["disabled"], zr = ["aria-label"], Yr = {
  key: 0,
  class: "learning-history-notice"
}, Kr = {
  key: 0,
  class: "learning-conversation-user"
}, Zr = ["disabled", "onClick"], Jr = {
  key: 3,
  class: "learning-conversation-tools"
}, Qr = ["disabled"], Xr = ["disabled"], _r = {
  key: 1,
  class: "learning-working",
  role: "status"
}, eo = {
  key: 2,
  class: "learning-turn-notice is-error",
  role: "status"
}, to = {
  key: 3,
  class: "learning-conversation-empty"
}, ao = ["disabled"], no = { class: "learning-composer-surface" }, io = {
  key: 0,
  class: "learning-composer-quote"
}, lo = { class: "learning-composer-row" }, so = ["maxlength", "onKeydown"], ro = [
  "type",
  "disabled",
  "aria-label",
  "title"
], oo = /* @__PURE__ */ Q({
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
  setup(e, { expose: p, emit: l }) {
    const i = e, o = I(() => i.state.conversation.turns.map((O, P) => ({
      turn: O,
      index: P
    })).filter(({ turn: O }) => !Le({ kind: O.purpose ?? "talk" }) || O.status === "running")), u = {
      conversation: "和语伴聊天",
      history: "更早的聊天已收起",
      empty: "今天想聊什么？",
      select: "先选一位语伴",
      opening: "打个招呼"
    }, c = /* @__PURE__ */ new Set([
      "prepare",
      "complete",
      "grade",
      "revision-review",
      "model-essay",
      "review-prepare",
      "review-assess",
      "companion"
    ]), y = l, f = he().chat, k = ce(f, "text"), g = H(null), w = H(null), h = H(null), C = ce(f, "focus");
    let v = null, d = 0;
    function $() {
      const O = h.value;
      O && (f.scroll = O.scrollTop, f.following = O.scrollHeight - O.scrollTop - O.clientHeight < 70);
    }
    async function j() {
      await ue(), f.following && h.value && (h.value.scrollTop = h.value.scrollHeight);
    }
    function N() {
      const O = g.value;
      O?.clientWidth && (O.style.height = "auto", O.style.height = `${O.scrollHeight}px`, j());
    }
    Y(k, N, { flush: "post" }), Y(g, (O) => {
      if (v?.disconnect(), cancelAnimationFrame(d), !O) return;
      let P = 0;
      v = new ResizeObserver(([A]) => {
        A.contentRect.width !== P && (P = A.contentRect.width, cancelAnimationFrame(d), d = requestAnimationFrame(N));
      }), v.observe(O.parentElement);
    }, { flush: "post" }), ye(() => {
      h.value && (h.value.scrollTop = f.scroll), j();
    }), ke(() => {
      h.value && (f.scroll = h.value.scrollTop), v?.disconnect(), cancelAnimationFrame(d);
    });
    function R() {
      if (i.disabled || !k.value.trim()) return;
      const O = k.value.trim();
      f.sent = {
        text: k.value,
        user: C.value?.selection ? `${O}

${C.value.selection.quote}` : O,
        after: i.state.conversation.turns.length + i.state.conversation.removedTurns
      }, f.following = !0, y("action", C.value ? "explain" : "talk", {
        message: O,
        ...C.value ?? {}
      });
    }
    Y([() => i.state.conversation.turns, () => i.state.chatBusy], j);
    function q(O) {
      return O.kind === "replacement" ? !i.disabled && i.state.currentUnitId === O.unitId : i.state.unit?.id === O.unitId && (O.kind === "exercise" ? i.state.unit.exercises : i.state.unit.materials).some((P) => P.id === O.id);
    }
    return p({
      async ask(O, P) {
        C.value = {
          exerciseId: O,
          selection: P
        }, await ue(), g.value?.focus();
      },
      focusHeading: () => w.value?.focus({ preventScroll: !0 })
    }), (O, P) => (t(), n("section", Wr, [
      a("header", Fr, [
        a("span", Gr, s([...e.state.teacher?.name ?? "伴"][0]), 1),
        a("h1", {
          ref_key: "heading",
          ref: w,
          tabindex: "-1"
        }, s(e.state.teacher?.name ?? "语伴"), 513),
        a("button", {
          type: "button",
          disabled: e.disabled,
          "aria-label": "更换学习语言和语伴",
          onClick: P[0] || (P[0] = (A) => y("profile"))
        }, s(new Intl.DisplayNames(["zh-CN"], { type: "language" }).of(e.state.language)), 9, Hr)
      ]),
      a("div", {
        ref_key: "scroller",
        ref: h,
        class: "learning-conversation-turns",
        "aria-label": u.conversation,
        onScroll: $
      }, [
        e.state.conversation.removedTurns ? (t(), n("p", Yr, s(u.history), 1)) : m("", !0),
        (t(!0), n(M, null, D(o.value, ({ turn: A, index: V }, W) => (t(), n("div", {
          key: e.state.conversation.removedTurns + V,
          class: "learning-conversation-turn"
        }, [
          A.user && !r(c).has(A.purpose) && !r(Le)({ kind: A.purpose ?? "talk" }) ? (t(), n("p", Kr, s(A.user), 1)) : m("", !0),
          F(jr, {
            turn: A,
            disabled: e.pending,
            onStop: (E) => y("action", r(Ne)({ kind: A.purpose ?? "talk" }) ? "cancel-chat" : r(Le)({ kind: A.purpose ?? "talk" }) ? "cancel-preparation" : "cancel")
          }, null, 8, [
            "turn",
            "disabled",
            "onStop"
          ]),
          A.message ? (t(), n("p", {
            key: 1,
            class: ne(["learning-turn-notice", { "is-error": A.status === "failed" }]),
            role: "status"
          }, s(A.message), 3)) : m("", !0),
          A.presentation ? (t(), n("button", {
            key: 2,
            type: "button",
            class: "learning-activity-link",
            disabled: !q(A.presentation),
            onClick: (E) => y("present", A.presentation)
          }, [
            F(z, { name: A.presentation.kind === "material" ? "book" : "records" }, null, 8, ["name"]),
            a("span", null, s(A.presentation.title), 1),
            F(z, { name: "arrow" })
          ], 8, Zr)) : m("", !0),
          W === o.value.length - 1 && e.state.reply?.text === A.teacher ? (t(), n("div", Jr, [[...A.teacher].length <= 1e3 ? (t(), n("button", {
            key: 0,
            type: "button",
            disabled: e.disabled,
            onClick: P[1] || (P[1] = (E) => y("action", "say-reply"))
          }, [F(z, { name: "sound" }), P[8] || (P[8] = G("听语伴说", -1))], 8, Qr)) : m("", !0), e.state.reply.exerciseId && [...A.teacher].length <= 4e3 ? (t(), n("button", {
            key: 1,
            type: "button",
            disabled: e.disabled || e.state.unit?.notes.some((E) => E.text === A.teacher),
            onClick: P[2] || (P[2] = (E) => y("action", "save-note"))
          }, "保存笔记", 8, Xr)) : m("", !0)])) : m("", !0)
        ]))), 128)),
        e.state.chatBusy && !e.state.conversation.turns.some((A) => A.status === "running" && r(Ne)({ kind: A.purpose ?? "talk" })) ? (t(), n("div", _r, [P[9] || (P[9] = a("span", {
          class: "learning-working-dot",
          "aria-hidden": "true"
        }, null, -1)), a("span", null, s(e.state.chatMessage), 1)])) : !e.state.chatBusy && e.state.chatMessage ? (t(), n("p", eo, s(e.state.chatMessage), 1)) : m("", !0),
        !o.value.length && !e.state.chatBusy ? (t(), n("div", to, [
          F(z, { name: "chat" }),
          a("p", null, s(e.state.teacher ? u.empty : u.select), 1),
          e.state.teacher ? (t(), n("button", {
            key: 1,
            type: "button",
            disabled: e.disabled,
            onClick: P[4] || (P[4] = (A) => y("action", "talk", { message: e.state.profile ? r(ft).returning : r(ft).initial }))
          }, s(u.opening), 9, ao)) : (t(), n("button", {
            key: 0,
            class: "learning-primary",
            type: "button",
            onClick: P[3] || (P[3] = (A) => y("profile"))
          }, s(u.select), 1))
        ])) : m("", !0)
      ], 40, zr),
      e.state.teacher ? (t(), n("form", {
        key: 0,
        class: "learning-conversation-compose",
        onSubmit: ae(R, ["prevent"])
      }, [a("div", no, [C.value ? (t(), n("div", io, [a("span", null, s(C.value.selection?.quote ?? "请教这道题"), 1), a("button", {
        type: "button",
        "aria-label": "取消引用",
        onClick: P[5] || (P[5] = (A) => C.value = null)
      }, "×")])) : m("", !0), a("div", lo, [_(a("textarea", {
        ref_key: "composer",
        ref: g,
        "onUpdate:modelValue": P[6] || (P[6] = (A) => k.value = A),
        rows: "1",
        maxlength: C.value?.selection ? 1800 : C.value?.exerciseId ? 2e3 : 4e3,
        "aria-label": "和语伴说",
        placeholder: "和语伴说…",
        onKeydown: [be(ae(R, ["ctrl", "prevent"]), ["enter"]), be(ae(R, ["meta", "prevent"]), ["enter"])]
      }, null, 40, so), [[le, k.value], [r(Oe), r(f)]]), a("button", {
        type: e.state.chatBusy ? "button" : "submit",
        class: ne(e.state.chatBusy ? "learning-composer-stop" : "learning-primary"),
        disabled: e.state.chatBusy ? e.pending : e.disabled || !k.value.trim(),
        "aria-label": e.state.chatBusy ? "停止回复" : "发送给语伴",
        title: e.state.chatBusy ? "停止回复" : "发送给语伴",
        onClick: P[7] || (P[7] = ae((A) => e.state.chatBusy ? y("action", "cancel-chat") : R(), ["prevent"]))
      }, [F(z, { name: e.state.chatBusy ? "stop" : "send" }, null, 8, ["name"])], 10, ro)])])], 32)) : m("", !0)
    ]));
  }
}), uo = oo, yt = {
  busy: "上一件事还没做完，等它完成后再试一次吧。这次没有开始。",
  unknown: "暂时没收到结果。请先重新加载，确认内容是否已保存，再决定是否重试。"
};
function vo(e) {
  const p = Ht(structuredClone(zt(e.initialState))), l = H(!1), i = H("");
  let o = !1, u = 0, c = () => {
  };
  const y = I(() => !l.value && !p.value.busy && p.value.storage === "ready"), f = I(() => !l.value && !p.value.chatBusy && p.value.storage === "ready");
  async function k(g, w = {}) {
    if (l.value) return;
    l.value = !0, i.value = "";
    const h = p.value.chatIdentity, C = u;
    try {
      const v = await e.bridge.request(`learning/${g}`, {
        chatIdentity: h,
        ...w
      }, 35e3);
      return !o || p.value.chatIdentity !== h ? void 0 : (u === C && v.result.state.chatIdentity === h && (p.value = v.result.state), v.result.rejected && (i.value = yt[v.result.rejected]), v.result);
    } catch {
      o && p.value.chatIdentity === h && (i.value = yt.unknown);
    } finally {
      o && (l.value = !1);
    }
  }
  return ye(() => {
    o = !0, c = e.bridge.subscribe((g) => {
      if (g.type === "learning/media") {
        p.value = {
          ...p.value,
          media: g.payload.media
        };
        return;
      }
      if (g.type !== "learning/state") return;
      const w = g.payload.state;
      w.chatIdentity === p.value.chatIdentity && (u++, p.value = w, i.value = "");
    });
  }), ke(() => {
    o = !1, c();
  }), {
    state: p,
    pending: l,
    writable: y,
    canChat: f,
    localMessage: i,
    request: k
  };
}
function co(e = Math.random) {
  return Math.round(3 * 6e4 + Math.min(Math.max(e(), 0), 1) * 9 * 6e4);
}
function go(e) {
  let p = !1, l, i = 0;
  function o() {
    l !== void 0 && (e.clearTimer(l), l = void 0);
  }
  function u() {
    if (!p) return;
    const c = i;
    l = e.setTimer(() => {
      c === i && (l = void 0, p && (e.opportunity(), u()));
    }, co(e.random));
  }
  return {
    update(c) {
      p !== c && (p = c, i++, o(), u());
    },
    dispose() {
      p = !1, i++, o();
    }
  };
}
function mo(e) {
  const p = H(!1), l = H(!1), i = H(!1), o = H("");
  let u, c;
  const y = I(() => e.preference.enabled && e.reading.value && p.value && !e.blocked.value && !!e.state.value.teacher && e.state.value.storage === "ready"), f = I(() => y.value && !l.value && !i.value && !e.pending.value && !e.state.value.busy && !e.state.value.chatBusy && !e.state.value.companionBusy);
  function k() {
    const $ = e.root.value?.querySelector(".learning-scroll")?.getBoundingClientRect(), j = $?.top ?? 0, N = [...e.root.value?.querySelectorAll("[data-material-id][data-paragraph-id]") ?? []].find((R) => R.getBoundingClientRect().bottom > j + 60 && R.getBoundingClientRect().top < ($?.bottom ?? 0));
    return N ? {
      materialId: N.dataset.materialId,
      paragraphId: N.dataset.paragraphId
    } : null;
  }
  const g = go({
    setTimer: ($, j) => setTimeout($, j),
    clearTimer: ($) => clearTimeout($),
    opportunity: () => {
      const $ = k();
      $ && e.request("companion", $);
    }
  });
  Y(f, ($) => g.update($), { immediate: !0 }), Y([
    y,
    l,
    i,
    e.pending,
    () => e.state.value.companionBusy
  ], ([$, j, N, R, q]) => {
    q && !R && (!$ || j || N) && e.request("cancel-companion");
  });
  function w() {
    const $ = document.activeElement;
    l.value = $ instanceof HTMLElement && !!e.root.value?.contains($) && $.matches("textarea, input:not([type=checkbox],[type=radio],[type=range]), [contenteditable=true]");
  }
  const h = () => queueMicrotask(w);
  function C($) {
    !($.target instanceof HTMLElement) || !$.target.matches("textarea, input:not([type=checkbox],[type=radio],[type=range]), [contenteditable=true]") || (clearTimeout(u), i.value = !0, u = setTimeout(() => {
      i.value = !1;
    }, 3e4));
  }
  function v() {
    p.value = document.visibilityState === "visible", p.value || (clearTimeout(u), i.value = !1, d()), w();
  }
  function d() {
    clearTimeout(c), o.value = "";
  }
  return Y(() => e.state.value.remark?.text ?? "", ($) => {
    d(), $ && e.reading.value && p.value && !l.value && !e.blocked.value && (o.value = $, c = setTimeout(d, 1e4));
  }), Y([
    e.reading,
    e.blocked,
    l
  ], ([$, j, N]) => {
    (!$ || j || N) && d();
  }), ye(() => {
    v(), document.addEventListener("visibilitychange", v), e.root.value?.addEventListener("focusin", h), e.root.value?.addEventListener("focusout", h), e.root.value?.addEventListener("input", C);
  }), ke(() => {
    g.dispose(), clearTimeout(u), d(), document.removeEventListener("visibilitychange", v), e.root.value?.removeEventListener("focusin", h), e.root.value?.removeEventListener("focusout", h), e.root.value?.removeEventListener("input", C);
  }), {
    bubble: o,
    dismiss: d
  };
}
var po = { class: "learning-toolbar" }, bo = {
  key: 0,
  class: "learning-unread-dot",
  "aria-hidden": "true"
}, fo = {
  key: 1,
  class: "learning-layout-control"
}, yo = ["min", "max"], ko = { "aria-label": "学习资料与设置" }, ho = { "aria-label": "学习资料与设置" }, $o = ["onClick"], wo = {
  key: 0,
  class: "learning-notice",
  role: "status",
  "aria-live": "polite"
}, xo = { class: "learning-row" }, Co = ["disabled"], Io = ["disabled"], Lo = ["disabled"], So = ["disabled"], Ao = ["inert", "aria-hidden"], Mo = {
  key: 1,
  class: "learning-working",
  role: "status"
}, Ro = ["disabled"], To = {
  key: 4,
  class: "learning-materials-page"
}, Eo = {
  key: 0,
  class: "learning-empty-note"
}, Bo = { class: "learning-materials-title" }, No = ["onClick"], Oo = ["onClick"], qo = {
  key: 0,
  class: "learning-notes"
}, Vo = { key: 0 }, Po = ["disabled", "onClick"], Uo = {
  key: 6,
  class: "learning-harvest-page"
}, Do = {
  key: 0,
  class: "learning-empty-note"
}, jo = { key: 0 }, Wo = { class: "learning-muted" }, Fo = ["disabled", "onClick"], Go = ["disabled"], Ho = ["disabled"], zo = {
  key: 3,
  class: "learning-row"
}, Yo = ["disabled"], Ko = ["disabled"], Zo = {
  key: 7,
  class: "learning-settings-page"
}, Jo = ["value", "disabled"], Qo = ["value"], Xo = {
  key: 0,
  class: "learning-settings-goal"
}, _o = {
  key: 0,
  class: "learning-muted"
}, eu = ["value", "disabled"], tu = ["disabled"], au = ["disabled"], nu = ["disabled"], iu = ["disabled"], lu = ["disabled"], su = ["disabled"], ru = ["disabled"], ou = ["inert", "aria-hidden"], uu = ["aria-label"], du = { class: "learning-person-initial" }, vu = {
  key: 0,
  class: "learning-unread-dot",
  "aria-hidden": "true"
}, cu = ["aria-label"], gu = {
  key: 0,
  class: "learning-unread-dot",
  "aria-hidden": "true"
}, mu = {
  role: "alertdialog",
  "aria-labelledby": "learning-confirm-title",
  class: "learning-confirm"
}, pu = { id: "learning-confirm-title" }, bu = { class: "learning-row" }, fu = ["disabled"], yu = /* @__PURE__ */ Q({
  __name: "LearningApp",
  props: {
    bridge: {},
    initialState: {}
  },
  setup(e) {
    const p = e, l = {
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
    }, { state: i, pending: o, writable: u, canChat: c, localMessage: y, request: f } = vo(p), k = _a(i), g = H(i.value.teacher ? "home" : "profile"), w = [], h = H(null), C = H(!1);
    Ee(() => h.value?.open ? (h.value.open = !1, !0) : !1, () => C.value);
    const v = H(null), d = H(null), $ = H(null), j = {}, N = H(null), R = H(0), q = I(() => R.value >= 760), O = H("work"), P = H(!0), A = H(!1), V = H(62), W = I(() => Math.max(42, Math.ceil(320 / Math.max(R.value, 1) * 100))), E = I(() => Math.min(68, Math.floor((1 - 320 / Math.max(R.value, 1)) * 100))), B = I({
      get: () => q.value ? Math.min(E.value, Math.max(W.value, V.value)) : V.value,
      set: (S) => {
        V.value = S;
      }
    }), L = H(!1);
    let U, T;
    const X = () => {
      L.value = T?.matches ?? !1;
    };
    ye(() => {
      T = matchMedia("(prefers-reduced-motion: reduce)"), X(), T.addEventListener("change", X), !(!N.value || typeof ResizeObserver > "u") && (U = new ResizeObserver(([S]) => {
        R.value = S?.contentRect.width ?? 0;
      }), U.observe(N.value));
    }), ke(() => {
      U?.disconnect(), T?.removeEventListener("change", X);
    });
    const se = I(() => q.value || O.value === "work"), ee = I(() => !!i.value.teacher && (q.value || O.value === "chat"));
    Y([
      se,
      ee,
      L
    ], async ([S, b, x], de, tt) => {
      let at = !0, nt;
      if (tt(() => {
        at = !1, clearTimeout(nt);
      }), S && (P.value = !0), b && (A.value = !0), await ue(), !at) return;
      S && $.value && ($.value.scrollTop = j[g.value] ?? 0);
      const it = () => {
        P.value = S, A.value = b;
      };
      q.value || x ? it() : nt = setTimeout(it, 320);
    }, { immediate: !0 });
    function ge() {
      se.value && $.value && (j[g.value] = $.value.scrollTop);
    }
    const me = I(() => {
      const { turns: S, removedTurns: b } = i.value.conversation;
      let x = S.length - 1;
      for (; x >= 0 && Le({ kind: S[x].purpose ?? "talk" }); ) x--;
      return x < 0 ? 0 : b + x + 1;
    }), qe = H(me.value);
    Y([me, ee], ([S, b]) => {
      (b || S < qe.value) && (qe.value = S);
    }, { immediate: !0 });
    const Ye = I(() => me.value > qe.value), we = I(() => {
      const S = i.value.conversation.turns;
      let b = S.length - 1;
      for (; b >= 0 && Ne({ kind: S[b].purpose ?? "talk" }); ) b--;
      let x = S.length - 1;
      for (; x >= 0 && (S[x].status !== "running" || Ne({ kind: S[x].purpose ?? "talk" })); ) x--;
      return x >= 0 && (b = x), b < 0 ? null : {
        turn: i.value.conversation.turns[b],
        key: `${i.value.chatIdentity}:${i.value.language}:${i.value.conversation.removedTurns + b}`
      };
    });
    async function Ke() {
      i.value.teacher && (ge(), O.value = "chat", A.value = !0, await ue(), O.value === "chat" && v.value?.focusHeading());
    }
    async function Ve() {
      P.value = !0, O.value = "work", await ue(), $.value && ($.value.scrollTop = j[g.value] ?? 0);
      const S = $.value?.querySelector("h1, h2");
      S && (S.tabIndex = -1, S.focus({ preventScroll: !0 }));
    }
    let Ze = 0;
    Y(() => !!i.value.record, async (S, b) => {
      g.value !== "books" || S === b || (S && (Ze = $.value?.scrollTop ?? 0), await ue(), g.value === "books" && $.value && ($.value.scrollTop = S ? 0 : Ze));
    });
    const te = H(null), Je = H(null);
    ht(Je, () => {
      te.value = null;
    });
    const Ae = H(i.value.profile?.voice?.voiceId ?? i.value.voices.defaultVoice), Me = H(i.value.profile?.voice?.language ?? i.value.language), Re = H(i.value.profile?.voice?.speed ?? 1), pe = H(0), Pt = I(() => i.value.completions.slice(pe.value * 20, (pe.value + 1) * 20));
    Y([() => i.value.language, () => i.value.profile?.voice], ([S, b]) => {
      Ae.value = b?.voiceId ?? i.value.voices.defaultVoice, Me.value = b?.language ?? S, Re.value = b?.speed ?? 1;
    }), Y([
      () => i.value.chatIdentity,
      () => i.value.language,
      () => i.value.teacher?.name
    ], () => {
      d.value = null, te.value = null, pe.value = 0;
    }), Y(() => !!i.value.teacher, (S) => {
      S || (O.value = "work");
    }), Y(() => i.value.currentUnitId, (S) => {
      te.value?.action === "replace-lesson" && te.value.input.unitId !== S && (te.value = null);
    }), Y(() => i.value.unit, (S) => {
      const b = d.value;
      b && (S?.id !== b.unitId || !(b.kind === "exercise" ? S.exercises : S.materials).some((x) => x.id === b.id)) && Pe();
    }), Y(() => {
      const S = i.value.conversation.turns.at(-1)?.presentation;
      return S ? `${i.value.conversation.turns.length + i.value.conversation.removedTurns}:${S.unitId}:${S.kind}:${S.id}` : "";
    }, (S) => {
      const b = i.value.conversation.turns.at(-1)?.presentation;
      S && b && Ce(b, !0);
    });
    const xe = H(!1);
    Y([se, g], ([S, b]) => {
      S && b === "home" && (xe.value = !1);
    });
    async function Ce(S, b = !1) {
      if (S.kind === "replacement") {
        if (i.value.currentUnitId !== S.unitId || i.value.storage !== "ready") return;
        ve("replace-lesson", {
          unitId: S.unitId,
          message: S.message,
          kind: S.unitKind
        }, l.replaceWarning);
        return;
      }
      if (i.value.unit?.id === S.unitId) {
        if (i.value.unit.kind === "reading-writing") {
          if (b) {
            (!se.value || g.value !== "home") && (xe.value = !0);
            return;
          }
          k.unit(S.unitId).reading.view = "reading", await re("home");
          const x = S.kind === "exercise" ? `[data-exercise-id="${CSS.escape(S.id)}"]` : `[data-material-id="${CSS.escape(S.id)}"][data-paragraph-id]`;
          $.value?.querySelector(x)?.scrollIntoView({
            block: "start",
            behavior: matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth"
          });
          return;
        }
        d.value = S;
      }
    }
    function Pe() {
      d.value = null, f("stop");
    }
    async function Qe(S, b) {
      Pe(), ge(), O.value = "chat", A.value = !0, await ue(), await v.value?.ask(S, b);
    }
    async function re(S, b = !1) {
      if (S !== g.value && !b) if (S === "home") w.length = 0;
      else {
        const x = w.indexOf(S);
        x >= 0 ? w.splice(x) : w.push(g.value);
      }
      if ($.value && (j[g.value] = $.value.scrollTop), h.value && (h.value.open = !1), g.value = S, await Ve(), await ue(), $.value) {
        $.value.scrollTop = j[S] ?? 0;
        const x = [...$.value.querySelectorAll("h1, h2")].find((de) => de.offsetParent !== null);
        x && (x.tabIndex = -1, x.focus({ preventScroll: !0 }));
      }
    }
    async function Xe() {
      await re("home"), $.value && ($.value.scrollTop = 0);
      const S = $.value?.querySelector("#learning-review-title");
      S && (S.tabIndex = -1, S.focus({ preventScroll: !0 }));
    }
    async function Ue(S, b = {}) {
      if (S === "prepare" && !i.value.profile) {
        k.setup.step = i.value.teacher ? 2 : 0, await re("profile");
        return;
      }
      S === "start-review" && await Xe();
      const x = i.value.unit;
      x?.kind === "reading-writing" && b.unitId === x.id && [
        "grade",
        "submit-revision",
        "skip-revision"
      ].includes(S) && (k.unit(x.id).reading.view = S !== "grade" || [
        "reviewing",
        "model",
        "complete"
      ].includes(x.stage.stage) ? "model" : "feedback", await re("home"), $.value && ($.value.scrollTop = 0)), await f(S, b);
    }
    Y(() => k.settings.submitted, (S, b) => {
      !S && b && !k.settings.open && g.value === "profile" && k.setup.step === 2 && i.value.storage === "ready" && !i.value.busy && i.value.profile && Object.entries(b.value).every(([x, de]) => i.value.profile.settings[x] === de) && re("home");
    }), Y(() => i.value.busy, (S) => {
      const b = i.value.unit;
      !S && b?.stage.stage === "revising" && k.unit(b.id).reading.view === "model" && (k.unit(b.id).reading.view = "feedback");
    });
    const _e = Ee(() => h.value?.open ? (h.value.open = !1, !0) : !q.value && O.value === "chat" ? (Ve(), !0) : g.value === "home" || !w.length && g.value === "profile" && !i.value.teacher ? !1 : (re(w.pop() ?? "home", !0), !0));
    function ve(S, b, x) {
      te.value = {
        action: S,
        input: b,
        text: x
      };
    }
    async function Ut(S) {
      await f("records", {
        id: S,
        offset: i.value.records.offset
      }), i.value.record?.id === S && await re("books");
    }
    const { bubble: et, dismiss: De } = mo({
      root: N,
      state: i,
      pending: o,
      preference: k.companion,
      reading: I(() => se.value && g.value === "home" && i.value.unit?.kind === "reading-writing" && [
        "writing",
        "grading",
        "complete"
      ].includes(i.value.unit.stage.stage)),
      blocked: I(() => !!d.value || !!te.value || C.value),
      request: f
    });
    async function Dt() {
      const S = await f("export");
      if (!S?.document) return;
      const b = URL.createObjectURL(new Blob([JSON.stringify(S.document, null, 2)], { type: "application/json" })), x = document.createElement("a");
      x.href = b, x.download = "LittleWhiteBox_Learning.json", x.click(), setTimeout(() => URL.revokeObjectURL(b), 1e3);
    }
    return (S, b) => (t(), n("section", {
      ref_key: "root",
      ref: N,
      class: "learning-app",
      style: kt({
        "--learning-switch-ms": `${r(320)}ms`,
        "--learning-work-share": `${B.value}%`
      }),
      "aria-label": "语伴语言学习"
    }, [
      a("header", po, [
        g.value !== "home" && (r(i).teacher || w.length) && (q.value || O.value === "work") ? (t(), n("button", {
          key: 0,
          type: "button",
          class: "learning-toolbar-back",
          "aria-label": "返回上一页",
          onClick: b[0] || (b[0] = (...x) => r(_e) && r(_e)(...x))
        }, [F(z, { name: "back" })])) : m("", !0),
        a("button", {
          type: "button",
          class: "learning-wordmark",
          onClick: b[1] || (b[1] = (x) => re("home"))
        }, [
          b[33] || (b[33] = a("span", {
            class: "learning-brand-mark",
            "aria-hidden": "true"
          }, [G("a"), a("span", null, "あ")], -1)),
          b[34] || (b[34] = G("语伴", -1)),
          xe.value && (q.value || O.value === "work") ? (t(), n("span", bo)) : m("", !0)
        ]),
        q.value && r(i).teacher ? (t(), n("label", fo, [
          F(z, { name: "workbook" }),
          _(a("input", {
            "onUpdate:modelValue": b[2] || (b[2] = (x) => B.value = x),
            type: "range",
            min: W.value,
            max: E.value,
            step: "1",
            "aria-label": "阅读区宽度比例"
          }, null, 8, yo), [[
            le,
            B.value,
            void 0,
            { number: !0 }
          ]]),
          F(z, { name: "chat" })
        ])) : m("", !0),
        a("details", {
          ref_key: "menu",
          ref: h,
          class: "learning-menu",
          onToggle: b[3] || (b[3] = (x) => C.value = !!h.value?.open),
          onKeydown: b[4] || (b[4] = be(ae((x) => h.value.open = !1, ["stop", "prevent"]), ["esc"]))
        }, [a("summary", ko, [F(z, { name: "more" })]), a("nav", ho, [(t(), n(M, null, D([
          ["books", "语法本与生词本"],
          ["materials", "课件与笔记"],
          ["harvest", "我的收获"],
          ["settings", "设置"]
        ], ([x, de]) => a("button", {
          key: x,
          type: "button",
          onClick: (tt) => re(x)
        }, s(de), 9, $o)), 64))])], 544)
      ]),
      !r(i).busy && (r(i).message || r(y) || r(i).storage !== "ready") ? (t(), n("div", wo, [G(s(r(y) || r(i).message || (r(i).storage === "unconfirmed" ? r(We).unconfirmed : r(i).storage === "conflict" ? r(We).conflict : r(We).unloaded)) + " ", 1), a("div", xo, [
        r(i).storage === "unconfirmed" || r(i).storage === "conflict" ? (t(), n("button", {
          key: 0,
          type: "button",
          disabled: r(o),
          onClick: b[5] || (b[5] = (x) => r(f)("verify"))
        }, s(l.verify), 9, Co)) : m("", !0),
        r(i).storage === "unconfirmed" ? (t(), n("button", {
          key: 1,
          type: "button",
          disabled: r(o),
          onClick: b[6] || (b[6] = (x) => r(f)("retry-save"))
        }, s(l.retry), 9, Io)) : m("", !0),
        r(i).storage === "conflict" ? (t(), n("button", {
          key: 2,
          type: "button",
          disabled: r(o),
          onClick: b[7] || (b[7] = (x) => ve("adopt-server", {}, l.adoptWarning))
        }, s(l.adopt), 9, Lo)) : m("", !0),
        r(i).storage === "unloaded" || r(y) ? (t(), n("button", {
          key: 3,
          type: "button",
          disabled: r(o),
          onClick: b[8] || (b[8] = (x) => r(f)("read"))
        }, "重新加载", 8, So)) : m("", !0)
      ])])) : m("", !0),
      a("div", { class: ne(["learning-stage", {
        "is-wide": q.value,
        "is-chat": !q.value && O.value === "chat"
      }]) }, [
        a("div", {
          class: "learning-pane is-work",
          inert: !se.value,
          "aria-hidden": !se.value
        }, [a("div", {
          ref_key: "scroller",
          ref: $,
          class: "learning-scroll",
          onScrollPassive: ge
        }, [P.value ? (t(), n(M, { key: 0 }, [
          we.value ? (t(), K(Vt, {
            key: we.value.key,
            turn: we.value.turn,
            stoppable: "",
            disabled: r(o),
            onStop: b[9] || (b[9] = (x) => r(f)(r(Le)({ kind: we.value.turn.purpose ?? "talk" }) ? "cancel-preparation" : "cancel"))
          }, null, 8, ["turn", "disabled"])) : m("", !0),
          r(i).busy && we.value?.turn.status !== "running" ? (t(), n("div", Mo, [
            b[35] || (b[35] = a("span", {
              class: "learning-working-dot",
              "aria-hidden": "true"
            }, null, -1)),
            a("span", null, s(r(i).message || l.working), 1),
            a("button", {
              type: "button",
              disabled: r(o),
              onClick: b[10] || (b[10] = (x) => r(f)("cancel"))
            }, "停止", 8, Ro)
          ])) : m("", !0),
          g.value === "home" ? (t(), K(Cr, {
            key: 2,
            state: r(i),
            disabled: !r(u),
            pending: r(o),
            onAction: Ue,
            onConfirm: ve,
            onPresent: Ce,
            onGo: re,
            onAsk: Qe,
            onRecord: Ut
          }, null, 8, [
            "state",
            "disabled",
            "pending"
          ])) : m("", !0),
          g.value === "profile" ? (t(), K(Ui, {
            key: 3,
            state: r(i),
            disabled: !r(u),
            onAction: r(f)
          }, null, 8, [
            "state",
            "disabled",
            "onAction"
          ])) : m("", !0),
          g.value === "materials" ? (t(), n("section", To, [
            b[36] || (b[36] = a("h1", null, "课件与笔记", -1)),
            r(i).unit ? m("", !0) : (t(), n("p", Eo, s(r(i).blockedUnit ? "当前课件在另一个故事中" : "还没有课件"), 1)),
            r(i).unit ? (t(), n(M, { key: 1 }, [
              a("p", Bo, s(r(i).unit.title), 1),
              (t(!0), n(M, null, D(r(i).unit.materials, (x) => (t(), n("button", {
                key: x.id,
                type: "button",
                class: "learning-activity-link",
                onClick: (de) => Ce({
                  unitId: r(i).unit.id,
                  kind: "material",
                  id: x.id,
                  title: x.title
                })
              }, [
                F(z, { name: "book" }),
                a("span", null, s(x.title), 1),
                F(z, { name: "arrow" })
              ], 8, No))), 128)),
              (t(!0), n(M, null, D(r(i).unit.exercises, (x) => (t(), n("button", {
                key: x.id,
                type: "button",
                class: "learning-activity-link",
                onClick: (de) => Ce({
                  unitId: r(i).unit.id,
                  kind: "exercise",
                  id: x.id,
                  title: x.prompt
                })
              }, [
                F(z, { name: "records" }),
                a("span", null, s(x.prompt), 1),
                F(z, { name: "arrow" })
              ], 8, Oo))), 128)),
              r(i).unit.notes.length ? (t(), n("section", qo, [(t(!0), n(M, null, D(r(i).unit.notes, (x) => (t(), n("article", { key: x.id }, [
                x.selection ? (t(), n("blockquote", Vo, s(x.selection.quote), 1)) : m("", !0),
                a("p", null, s(x.text), 1),
                a("button", {
                  type: "button",
                  disabled: !r(u),
                  onClick: (de) => r(f)("delete-note", { id: x.id })
                }, "删除笔记", 8, Po)
              ]))), 128))])) : m("", !0)
            ], 64)) : m("", !0)
          ])) : m("", !0),
          g.value === "books" ? (t(), K(oi, {
            key: 5,
            state: r(i),
            disabled: !r(u),
            onAction: Ue,
            onReview: Xe,
            onRemove: ve
          }, null, 8, ["state", "disabled"])) : m("", !0),
          g.value === "harvest" ? (t(), n("section", Uo, [
            b[38] || (b[38] = a("div", { class: "learning-page-heading" }, [a("h1", null, "我的收获")], -1)),
            r(i).completions.length ? m("", !0) : (t(), n("p", Do, "还没有完成的课程")),
            (t(!0), n(M, null, D(Pt.value, (x) => (t(), n("article", {
              key: x.unitId,
              class: "learning-harvest-entry"
            }, [
              a("small", null, s(new Date(x.completedAt).toLocaleDateString()), 1),
              x.rewardStatus !== "retired" ? (t(), n("h2", jo, [G(s(x.rewardStatus === "paid" ? "+" : "") + s(x.amount), 1), b[37] || (b[37] = a("span", null, "小白币", -1))])) : m("", !0),
              a("p", null, s(x.summary), 1),
              a("p", Wo, s(x.rewardStatus === "paid" ? r(oe).paid : x.rewardStatus === "retired" ? r(oe).retired : r(oe).pending), 1),
              x.rewardStatus !== "paid" && x.rewardStatus !== "retired" ? (t(), n("button", {
                key: 1,
                type: "button",
                disabled: !r(u) || r(i).walletStorage !== "ready",
                onClick: (de) => r(f)("reward", {
                  unitId: x.unitId,
                  openWallet: !r(i).walletOpen
                })
              }, s(r(i).walletOpen ? r(oe).claim : r(oe).openWallet), 9, Fo)) : m("", !0)
            ]))), 128)),
            r(i).walletStorage === "unconfirmed" || r(i).walletStorage === "conflict" || r(i).walletStorage === "failed" ? (t(), n("button", {
              key: 1,
              type: "button",
              disabled: r(o) || r(i).busy,
              onClick: b[11] || (b[11] = (x) => r(f)("verify-wallet"))
            }, s(l.verifyWallet), 9, Go)) : m("", !0),
            r(i).walletStorage === "conflict" ? (t(), n("button", {
              key: 2,
              type: "button",
              disabled: r(o) || r(i).busy,
              onClick: b[12] || (b[12] = (x) => ve("adopt-wallet", {}, l.adoptWalletWarning))
            }, s(l.adoptWallet), 9, Ho)) : m("", !0),
            r(i).completions.length > 20 ? (t(), n("div", zo, [a("button", {
              type: "button",
              disabled: pe.value === 0,
              onClick: b[13] || (b[13] = (x) => pe.value--)
            }, "上一页", 8, Yo), a("button", {
              type: "button",
              disabled: (pe.value + 1) * 20 >= r(i).completions.length,
              onClick: b[14] || (b[14] = (x) => pe.value++)
            }, "下一页", 8, Ko)])) : m("", !0)
          ])) : m("", !0),
          g.value === "settings" ? (t(), n("section", Zo, [
            b[48] || (b[48] = a("h1", null, "学习设置", -1)),
            a("label", null, [b[39] || (b[39] = G("当前语言", -1)), a("select", {
              value: r(i).language,
              disabled: !r(u),
              onChange: b[15] || (b[15] = (x) => r(f)("language", { language: x.target.value }))
            }, [(t(!0), n(M, null, D([.../* @__PURE__ */ new Set([r(i).language, ...r(i).languages])], (x) => (t(), n("option", {
              key: x,
              value: x
            }, s(new Intl.DisplayNames(["zh-CN"], { type: "language" }).of(x)), 9, Qo))), 128))], 40, Jo)]),
            a("button", {
              type: "button",
              onClick: b[16] || (b[16] = (x) => re("profile"))
            }, "更换语言和语伴 →"),
            F(Nt),
            a("section", null, [
              b[40] || (b[40] = a("h2", null, "训练设置", -1)),
              r(i).profile?.goal.description ? (t(), n("p", Xo, s(r(i).profile.goal.description), 1)) : m("", !0),
              F(Bt, {
                state: r(i),
                disabled: !r(u),
                onAction: r(f)
              }, null, 8, [
                "state",
                "disabled",
                "onAction"
              ])
            ]),
            a("section", null, [
              b[45] || (b[45] = a("h2", null, "语伴的声音", -1)),
              r(i).voices.enabled ? (t(), n("form", {
                key: 1,
                onSubmit: b[20] || (b[20] = ae((x) => r(f)("voice", { voice: {
                  voiceId: Ae.value,
                  language: Me.value,
                  speed: Number(Re.value)
                } }), ["prevent"]))
              }, [
                a("label", null, [b[41] || (b[41] = G("音色", -1)), _(a("select", { "onUpdate:modelValue": b[17] || (b[17] = (x) => Ae.value = x) }, [(t(!0), n(M, null, D(r(i).voices.voices, (x) => (t(), n("option", {
                  key: x.id,
                  value: x.id,
                  disabled: !x.available
                }, s(x.name) + s(x.available ? "" : "（暂不可用）"), 9, eu))), 128))], 512), [[Te, Ae.value]])]),
                a("label", null, [b[42] || (b[42] = G("发音语言", -1)), _(a("input", {
                  "onUpdate:modelValue": b[18] || (b[18] = (x) => Me.value = x),
                  type: "text",
                  maxlength: "80",
                  placeholder: "en / ja"
                }, null, 512), [[le, Me.value]])]),
                a("label", null, [b[44] || (b[44] = G("语速", -1)), _(a("select", { "onUpdate:modelValue": b[19] || (b[19] = (x) => Re.value = x) }, [...b[43] || (b[43] = [
                  a("option", { value: 0.75 }, "0.75×", -1),
                  a("option", { value: 1 }, "1×", -1),
                  a("option", { value: 1.25 }, "1.25×", -1)
                ])], 512), [[Te, Re.value]])]),
                a("button", {
                  type: "submit",
                  disabled: !r(u) || !r(i).profile
                }, "保存声音设置", 8, tu)
              ], 32)) : (t(), n("p", _o, s(l.voiceDisabled), 1)),
              a("button", {
                type: "button",
                onClick: b[21] || (b[21] = (x) => r(f)("tts-settings"))
              }, s(r(i).voices.enabled ? r(Fe).settings : r(Fe).enable), 1),
              b[46] || (b[46] = a("small", null, "已听过的题保留原声音，新偏好用于之后的题目。", -1))
            ]),
            a("section", null, [
              b[47] || (b[47] = a("h2", null, "学习数据", -1)),
              a("button", {
                type: "button",
                disabled: r(o) || r(i).busy,
                onClick: b[22] || (b[22] = (x) => ve("forget-conversation", {}, "清空和当前语伴的对话？目标、课件、学习记录和奖励都会保留。"))
              }, "清空对话记录", 8, au),
              a("button", {
                type: "button",
                disabled: !r(u),
                onClick: Dt
              }, "导出学习数据", 8, nu),
              a("button", {
                type: "button",
                disabled: r(o) || r(i).busy,
                onClick: b[23] || (b[23] = (x) => r(f)("read"))
              }, "重新加载", 8, iu),
              r(i).unit || r(i).blockedUnit ? (t(), n("button", {
                key: 0,
                type: "button",
                disabled: !r(u),
                onClick: b[24] || (b[24] = (x) => ve("abandon", {}, r(Se).lesson))
              }, "放下当前练习", 8, lu)) : m("", !0),
              a("button", {
                type: "button",
                class: "learning-danger",
                disabled: !r(u) || !r(i).profile,
                onClick: b[25] || (b[25] = (x) => ve("delete-language", {}, "删除当前语言的全部学习数据？未领取奖励也将放弃，已到账流水保留。"))
              }, "删除当前语言", 8, su),
              a("button", {
                type: "button",
                class: "learning-danger",
                disabled: !r(u),
                onClick: b[26] || (b[26] = (x) => ve("clear", {}, "清空所有语言的目标、课程和记录？未领取奖励也将放弃。已到账流水不撤销。"))
              }, "清空全部学习数据", 8, ru)
            ])
          ])) : m("", !0)
        ], 64)) : m("", !0)], 544)], 8, Ao),
        r(i).teacher ? (t(), n("div", {
          key: 0,
          class: "learning-pane is-chat",
          inert: !ee.value,
          "aria-hidden": !ee.value
        }, [A.value ? (t(), K(uo, {
          key: 0,
          ref_key: "conversation",
          ref: v,
          state: r(i),
          disabled: !r(c),
          pending: r(o),
          onAction: r(f),
          onPresent: Ce,
          onProfile: b[27] || (b[27] = (x) => re("profile"))
        }, null, 8, [
          "state",
          "disabled",
          "pending",
          "onAction"
        ])) : m("", !0)], 8, ou)) : m("", !0),
        !q.value && O.value === "work" && r(i).teacher ? (t(), n("button", {
          key: 1,
          type: "button",
          class: "learning-float is-companion",
          "aria-label": Ye.value ? `和${r(i).teacher.name}聊天，有新消息` : `和${r(i).teacher.name}聊天`,
          onClick: Ke
        }, [a("span", du, s([...r(i).teacher.name][0]), 1), Ye.value ? (t(), n("span", vu)) : m("", !0)], 8, uu)) : m("", !0),
        !q.value && O.value === "chat" ? (t(), n("button", {
          key: 2,
          type: "button",
          class: "learning-float is-workbook",
          "aria-label": xe.value ? "回到练习本，有新指引" : "回到练习本",
          onClick: Ve
        }, [F(z, { name: "workbook" }), xe.value ? (t(), n("span", gu)) : m("", !0)], 8, cu)) : m("", !0),
        r(et) ? (t(), n("aside", {
          key: 3,
          class: ne(["learning-companion-bubble", { "is-wide": q.value }]),
          "aria-live": "polite"
        }, [a("button", {
          type: "button",
          onClick: b[28] || (b[28] = (x) => {
            Ke(), r(De)();
          })
        }, s(r(et)), 1), a("button", {
          type: "button",
          "aria-label": "收起这句话",
          onClick: b[29] || (b[29] = (...x) => r(De) && r(De)(...x))
        }, [F(z, { name: "close" })])], 2)) : m("", !0)
      ], 2),
      d.value ? m("", !0) : (t(), K(At, {
        key: 1,
        state: r(i),
        onAction: r(f)
      }, null, 8, ["state", "onAction"])),
      r(i).unit && d.value ? (t(), K(hn, {
        key: `${r(i).chatIdentity}:${r(i).language}:${r(i).unit.id}:${d.value.kind}:${d.value.id}`,
        state: r(i),
        target: d.value,
        disabled: !r(u),
        onAction: r(f),
        onClose: Pe,
        onAsk: Qe
      }, null, 8, [
        "state",
        "target",
        "disabled",
        "onAction"
      ])) : m("", !0),
      te.value ? (t(), n("div", {
        key: 3,
        ref_key: "confirmLayer",
        ref: Je,
        class: "learning-confirm-shade",
        onKeydown: b[32] || (b[32] = be(ae((x) => te.value = null, ["stop", "prevent"]), ["esc"]))
      }, [a("section", mu, [
        a("h2", pu, s(r(ot)[te.value.action].title), 1),
        a("p", null, s(te.value.text), 1),
        a("div", bu, [a("button", {
          autofocus: "",
          type: "button",
          onClick: b[30] || (b[30] = (x) => te.value = null)
        }, s(l.cancel), 1), a("button", {
          type: "button",
          class: "learning-primary",
          disabled: r(o) || r(i).busy,
          onClick: b[31] || (b[31] = (x) => {
            Ue(te.value.action, te.value.input), te.value = null;
          })
        }, s(r(ot)[te.value.action].accept), 9, fu)])
      ])], 544)) : m("", !0)
    ], 4));
  }
}), xu = yu;
export {
  xu as default
};
