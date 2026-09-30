/* eslint-disable */
import { $ as r, C as Ut, E as oe, F as t, G as X, H as z, I as Dt, J as be, L as j, M as fe, O as ye, Q as ve, V as jt, W as Pt, X as Wt, Y as H, Z as Ft, _ as i, a as Me, b as P, c as pe, et as ne, g as b, h as Y, i as Ht, l as ae, m as a, nt as s, o as ie, p as I, tt as bt, u as M, w as nt, x as _, y as F, z as Gt } from "./xiaobai-os-runtime-dom.esm-bundler-DgjJUtuO.js";
import { n as Re, r as ft } from "./xiaobai-os-app-navigation-DS43A6sJ.js";
import { t as We } from "./xiaobai-os-MessageMarkdown-bs_FqyUr.js";
var Ue = /* @__PURE__ */ new WeakMap(), it = [
  "select",
  "input",
  "keyup",
  "pointerup",
  "scroll"
], Be = {
  mounted(e, f) {
    const l = f.value, n = l.cursor, o = () => {
      l.cursor = {
        start: e.selectionStart,
        end: e.selectionEnd,
        direction: e.selectionDirection,
        top: e.scrollTop,
        left: e.scrollLeft
      };
    };
    Ue.set(e, o);
    for (const u of it) e.addEventListener(u, o, { passive: !0 });
    oe(() => {
      !e.isConnected || !n || (e.setSelectionRange(n.start, n.end, n.direction), e.scrollTop = n.top, e.scrollLeft = n.left);
    });
  },
  beforeUnmount(e) {
    const f = Ue.get(e);
    if (f) {
      f();
      for (const l of it) e.removeEventListener(l, f);
      Ue.delete(e);
    }
  }
}, zt = ["disabled"], Kt = {
  key: 0,
  class: "learning-choices"
}, Yt = [
  "type",
  "checked",
  "onChange"
], Zt = { class: "learning-option-letter" }, Jt = {
  key: 1,
  class: "learning-order"
}, _t = [
  "disabled",
  "aria-label",
  "onClick"
], Qt = [
  "disabled",
  "aria-label",
  "onClick"
], Xt = {
  key: 2,
  class: "learning-fields"
}, ea = ["onUpdate:modelValue"], ta = ["value"], aa = {
  key: 3,
  class: "learning-choices"
}, na = ["checked", "onChange"], ia = {
  key: 0,
  class: "learning-muted"
}, la = {
  key: 4,
  class: "learning-fields"
}, sa = ["onUpdate:modelValue"], ra = {
  key: 5,
  class: "learning-writing"
}, oa = ["disabled"], ua = /* @__PURE__ */ _({
  __name: "AnswerInput",
  props: /* @__PURE__ */ nt({
    response: {},
    paragraphs: {},
    disabled: { type: Boolean }
  }, {
    modelValue: { required: !0 },
    modelModifiers: {}
  }),
  emits: /* @__PURE__ */ nt(["submit"], ["update:modelValue"]),
  setup(e, { emit: f }) {
    const l = e, n = f, o = jt(e, "modelValue");
    function u(h) {
      l.response.kind === "choice" && !l.response.multiple ? o.value.picked = [h] : o.value.picked = o.value.picked.includes(h) ? o.value.picked.filter((m) => m !== h) : [...o.value.picked, h];
    }
    function d(h, m) {
      const w = [...o.value.order];
      [w[h], w[h + m]] = [w[h + m], w[h]], o.value.order = w;
    }
    const p = I(() => {
      const h = l.response;
      return h.kind === "text" ? !!o.value.text.trim() : h.kind === "gaps" ? h.slots.every((m) => o.value.values[m.id]?.trim()) : h.kind === "match" ? h.left.every((m) => o.value.values[m.id]) : h.kind === "order" ? !0 : o.value.picked.length > 0;
    });
    function $() {
      const h = l.response;
      !p.value || l.disabled || (h.kind === "text" ? n("submit", {
        kind: "text",
        text: o.value.text
      }) : h.kind === "gaps" ? n("submit", {
        kind: "gaps",
        values: h.slots.map((m) => ({
          id: m.id,
          text: o.value.values[m.id]
        }))
      }) : h.kind === "match" ? n("submit", {
        kind: "match",
        pairs: h.left.map((m) => ({
          left: m.id,
          right: o.value.values[m.id]
        }))
      }) : n("submit", {
        kind: h.kind,
        ids: [...h.kind === "order" ? o.value.order : o.value.picked]
      }));
    }
    return (h, m) => (t(), i("form", {
      class: "learning-answer",
      onSubmit: ae($, ["prevent"])
    }, [a("fieldset", { disabled: e.disabled }, [
      m[3] || (m[3] = a("legend", { class: "learning-sr-only" }, "你的回答", -1)),
      e.response.kind === "choice" ? (t(), i("div", Kt, [(t(!0), i(M, null, j(e.response.options, (w, k) => (t(), i("label", {
        key: w.id,
        class: ne({ selected: o.value.picked.includes(w.id) })
      }, [
        a("input", {
          type: e.response.multiple ? "checkbox" : "radio",
          name: "answer-choice",
          checked: o.value.picked.includes(w.id),
          onChange: (g) => u(w.id)
        }, null, 40, Yt),
        a("span", Zt, s(String.fromCharCode(65 + k)), 1),
        a("span", null, s(w.text), 1)
      ], 2))), 128))])) : e.response.kind === "order" ? (t(), i("ol", Jt, [(t(!0), i(M, null, j(o.value.order, (w, k) => (t(), i("li", { key: w }, [
        a("span", null, s(e.response.options.find((g) => g.id === w)?.text), 1),
        a("button", {
          type: "button",
          disabled: k === 0,
          "aria-label": `上移第 ${k + 1} 项`,
          onClick: (g) => d(k, -1)
        }, "↑", 8, _t),
        a("button", {
          type: "button",
          disabled: k === o.value.order.length - 1,
          "aria-label": `下移第 ${k + 1} 项`,
          onClick: (g) => d(k, 1)
        }, "↓", 8, Qt)
      ]))), 128))])) : e.response.kind === "match" ? (t(), i("div", Xt, [(t(!0), i(M, null, j(e.response.left, (w) => (t(), i("label", { key: w.id }, [F(s(w.text) + " ", 1), X(a("select", { "onUpdate:modelValue": (k) => o.value.values[w.id] = k }, [m[1] || (m[1] = a("option", { value: "" }, "选择对应项", -1)), (t(!0), i(M, null, j(e.response.right, (k) => (t(), i("option", {
        key: k.id,
        value: k.id
      }, s(k.text), 9, ta))), 128))], 8, ea), [[Me, o.value.values[w.id]]])]))), 128))])) : e.response.kind === "evidence" ? (t(), i("div", aa, [(t(!0), i(M, null, j(e.paragraphs, (w) => (t(), i("label", {
        key: w.id,
        class: ne({ selected: o.value.picked.includes(w.id) })
      }, [a("input", {
        type: "checkbox",
        checked: o.value.picked.includes(w.id),
        onChange: (k) => u(w.id)
      }, null, 40, na), a("span", null, s(w.text), 1)], 2))), 128)), e.paragraphs.length ? b("", !0) : (t(), i("p", ia, "请先展开相关文稿，再选择原文依据。"))])) : e.response.kind === "gaps" ? (t(), i("div", la, [(t(!0), i(M, null, j(e.response.slots, (w) => (t(), i("label", { key: w.id }, [F(s(w.text), 1), X(a("input", {
        "onUpdate:modelValue": (k) => o.value.values[w.id] = k,
        type: "text",
        maxlength: "4000",
        autocomplete: "off"
      }, null, 8, sa), [[ie, o.value.values[w.id]]])]))), 128))])) : (t(), i("label", ra, [m[2] || (m[2] = a("span", { class: "learning-sr-only" }, "你的回答", -1)), X(a("textarea", {
        "onUpdate:modelValue": m[0] || (m[0] = (w) => o.value.text = w),
        rows: "6",
        maxlength: "4000",
        placeholder: "写下你的回答…"
      }, null, 512), [[ie, o.value.text], [r(Be), o.value]])])),
      a("button", {
        class: "learning-primary",
        type: "submit",
        disabled: !p.value
      }, "交给语伴 →", 8, oa)
    ], 8, zt)], 32));
  }
}), yt = ua, kt = 2e3, da = ["stroke-width"], va = ["d"], ca = /* @__PURE__ */ _({
  __name: "LearningIcon",
  props: { name: {} },
  setup(e) {
    const f = {
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
    }, [a("path", { d: f[e.name] }, null, 8, va)], 8, da));
  }
}), G = ca, xe = Object.freeze({
  select: "引用这段",
  ask: "问语伴",
  listen: "朗读",
  dismiss: "取消引用"
});
function ga(e, f, l) {
  if (!l?.rangeCount || l.isCollapsed) return null;
  const n = l.getRangeAt(0), o = n.startContainer, u = (o instanceof Element ? o : o.parentElement)?.closest("[data-learning-text]");
  if (!u || !e.contains(u) || !u.contains(n.endContainer)) return null;
  const d = f.find((w) => w.id === u.dataset.materialId), p = d?.paragraphs.find((w) => w.id === u.dataset.paragraphId);
  if (!d || !p) return null;
  const $ = n.cloneRange();
  $.selectNodeContents(u), $.setEnd(n.startContainer, n.startOffset);
  const h = $.toString().length, m = n.toString();
  return !m.trim() || [...m].length > 2e3 || p.text.slice(h, h + m.length) !== m ? null : {
    materialId: d.id,
    paragraphId: p.id,
    start: h,
    end: h + m.length,
    quote: m
  };
}
function ht(e, f, l) {
  const n = () => {
    if (!e.value) return;
    const o = ga(e.value, f(), window.getSelection());
    o && l(o);
  };
  fe(() => document.addEventListener("selectionchange", n)), ye(() => document.removeEventListener("selectionchange", n));
}
var ma = { class: "learning-source" }, pa = { key: 0 }, ba = ["href"], fa = {
  key: 0,
  class: "learning-listening-cover"
}, ya = ["disabled"], ka = {
  key: 1,
  class: "learning-material-body"
}, ha = ["data-material-id", "data-paragraph-id"], $a = ["disabled", "onClick"], wa = {
  class: "learning-audio-parts",
  "aria-label": "材料朗读分段"
}, xa = ["disabled", "onClick"], Ca = { key: 2 }, Ia = /* @__PURE__ */ _({
  __name: "MaterialReader",
  props: {
    material: {},
    disabled: { type: Boolean },
    exerciseId: {}
  },
  emits: ["action", "select"],
  setup(e, { emit: f }) {
    const l = e, n = f, o = H(null);
    ht(o, () => [l.material], (d) => n("select", d));
    function u(d) {
      n("select", {
        materialId: l.material.id,
        paragraphId: d.id,
        start: 0,
        end: d.text.length,
        quote: d.text
      });
    }
    return (d, p) => (t(), i("article", {
      ref_key: "root",
      ref: o,
      class: "learning-material"
    }, [
      a("h2", null, s(e.material.title), 1),
      a("div", ma, [e.material.provenance.kind === "authored" ? (t(), i("span", pa, "语伴自编练习")) : (t(), i("a", {
        key: 1,
        href: e.material.provenance.url,
        target: "_blank",
        rel: "noopener noreferrer"
      }, s(e.material.provenance.kind === "original" ? "原文节选" : "改编自") + " · " + s(e.material.provenance.title) + " ↗", 9, ba))]),
      e.material.hidden ? (t(), i("div", fa, [p[1] || (p[1] = a("svg", {
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
        onClick: p[0] || (p[0] = ($) => n("action", "reveal", {
          kind: "transcripts",
          id: e.material.id
        }))
      }, "看文稿", 8, ya)])) : (t(), i("div", ka, [(t(!0), i(M, null, j(e.material.paragraphs, ($) => (t(), i("div", {
        key: $.id,
        class: "learning-paragraph"
      }, [a("p", {
        tabindex: "0",
        "data-learning-text": "",
        "data-material-id": e.material.id,
        "data-paragraph-id": $.id
      }, s($.text), 9, ha), a("button", {
        type: "button",
        disabled: [...$.text].length > r(kt),
        onClick: (h) => u($)
      }, s(r(xe).select), 9, $a)]))), 128))])),
      a("div", wa, [(t(!0), i(M, null, j(e.material.parts, ($) => (t(), i("button", {
        key: $.key,
        type: "button",
        disabled: e.disabled,
        onClick: (h) => n("action", "play", {
          materialId: e.material.id,
          partKey: $.key,
          exerciseId: e.exerciseId
        })
      }, [P(G, { name: "play" }), F(s(e.material.parts.length > 1 ? `听第 ${$.number} 段` : "播放朗读"), 1)], 8, xa))), 128))]),
      e.material.parts.length ? (t(), i("small", Ca, "TTS 合成朗读")) : b("", !0)
    ], 512));
  }
}), lt = Ia;
function Fe(e, f, l = []) {
  const n = (o) => f.kind === "choice" || f.kind === "order" ? f.options.find((u) => u.id === o)?.text ?? o : l.find((u) => u.id === o)?.text ?? o;
  return e.kind === "text" ? e.text : e.kind === "gaps" ? e.values.map((o) => `${f.kind === "gaps" ? f.slots.find((u) => u.id === o.id)?.text ?? "" : ""} ${o.text}`).join(`
`) : e.kind === "match" ? e.pairs.map((o) => f.kind === "match" ? `${f.left.find((u) => u.id === o.left)?.text} → ${f.right.find((u) => u.id === o.right)?.text}` : "").join(`
`) : e.ids.map(n).join(e.kind === "order" ? " → " : `
`);
}
var La = { class: "learning-feedback" }, Sa = { class: "learning-muted" }, Aa = { key: 0 }, Ma = { key: 1 }, Ra = { key: 0 }, Ta = { key: 1 }, Ba = { key: 2 }, Ea = {
  key: 3,
  class: "learning-muted"
}, Na = ["disabled"], Oa = ["disabled"], qa = /* @__PURE__ */ _({
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
    const f = {
      correct: "答对了",
      partial: "已经掌握一部分",
      incorrect: "一起把这里弄懂",
      disputed: "这处还需复核"
    };
    return (l, n) => (t(), i("section", La, [
      n[6] || (n[6] = a("p", { class: "learning-eyebrow" }, "已保存的原答", -1)),
      a("blockquote", null, s(r(Fe)(e.attempt.answer, e.response, e.paragraphs)), 1),
      a("small", Sa, [
        F(s(e.attempt.help.feedback ? "得到反馈后的再练" : e.attempt.help.answer || e.attempt.help.hint || e.attempt.help.transcript ? "这次有辅助" : "未使用答案或提示"), 1),
        e.attempt.help.replays ? (t(), i("span", Aa, " · 重听 " + s(e.attempt.help.replays) + " 次", 1)) : b("", !0),
        e.attempt.help.slowPlayback ? (t(), i("span", Ma, " · 慢放")) : b("", !0)
      ]),
      e.feedback ? (t(), i(M, { key: 0 }, [
        a("h3", null, s(f[e.feedback.verdict]), 1),
        e.feedback.understanding ? (t(), i("p", Ra, [n[2] || (n[2] = a("b", null, "理解", -1)), F(s(e.feedback.understanding), 1)])) : b("", !0),
        e.feedback.expression ? (t(), i("p", Ta, [n[3] || (n[3] = a("b", null, "表达", -1)), F(s(e.feedback.expression), 1)])) : b("", !0),
        e.feedback.guidance ? (t(), i("p", Ba, [n[4] || (n[4] = a("b", null, "批注", -1)), F(s(e.feedback.guidance), 1)])) : b("", !0),
        e.revised ? (t(), i("small", Ea, "这篇已有修改稿，结果以修改稿的批改为准。")) : (t(), i("button", {
          key: 4,
          type: "button",
          disabled: e.disabled,
          onClick: n[0] || (n[0] = (o) => l.$emit("action", "assess", {
            attemptId: e.attempt.id,
            review: !0,
            message: "请重新审视我的原答与题目。也请考虑其他有效表达，不只对照原来的答案键。"
          }))
        }, s(e.feedback.verdict === "disputed" ? "请语伴复核" : "有疑问，请复核"), 9, Na))
      ], 64)) : (t(), i(M, { key: 1 }, [n[5] || (n[5] = a("p", null, "原答已保存，等待语伴评估。", -1)), a("button", {
        type: "button",
        disabled: e.disabled,
        onClick: n[1] || (n[1] = (o) => l.$emit("action", "assess", {
          attemptId: e.attempt.id,
          review: !1,
          message: "请评估这条已经保存的原答。"
        }))
      }, "重试评估", 8, Oa)], 64))
    ]));
  }
}), $t = qa, Z = {
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
}, Va = {
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
}, wt = {
  unassessed: "还没练过",
  review: "待确认",
  independent: "已能独立使用",
  practised: "练过一次",
  strengthen: "再练练"
}, xt = (e) => `${e} 次作答`, Ct = (e) => `${e} 个知识点可以温习了`, je = {
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
}, st = {
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
}, Ce = {
  lesson: "本次练习的材料、作答和笔记会删除；已收入学习本的记录和已获得的奖励会保留。",
  review: "这组已答的题会删除，复习时间安排不变。"
}, Ua = {
  key: 0,
  class: "learning-player",
  "aria-label": "课堂朗读"
}, Da = {
  key: 0,
  role: "status"
}, ja = {
  key: 2,
  class: "learning-row"
}, Pa = ["aria-label", "disabled"], Wa = ["max", "value"], Fa = /* @__PURE__ */ _({
  __name: "LearningPlayer",
  props: { state: {} },
  emits: ["action"],
  setup(e, { emit: f }) {
    const l = f;
    function n(o) {
      return `${Math.floor(o / 60)}:${String(Math.floor(o % 60)).padStart(2, "0")}`;
    }
    return (o, u) => e.state.media.status !== "idle" ? (t(), i("section", Ua, [
      e.state.media.message ? (t(), i("p", Da, s(e.state.media.message), 1)) : b("", !0),
      e.state.voices.enabled ? b("", !0) : (t(), i("button", {
        key: 1,
        type: "button",
        onClick: u[0] || (u[0] = (d) => l("action", "tts-settings"))
      }, s(r(je).enable), 1)),
      e.state.media.key ? (t(), i("div", ja, [
        P(G, { name: "sound" }),
        a("span", null, s(e.state.media.status === "loading" ? "正在生成声音…" : `${n(e.state.media.position)} / ${n(e.state.media.duration)}`), 1),
        e.state.media.status === "playing" ? (t(), i("button", {
          key: 0,
          type: "button",
          "aria-label": "暂停",
          onClick: u[1] || (u[1] = (d) => l("action", "pause"))
        }, [P(G, { name: "pause" })])) : [
          "paused",
          "ended",
          "blocked"
        ].includes(e.state.media.status) ? (t(), i("button", {
          key: 1,
          type: "button",
          "aria-label": e.state.media.status === "ended" ? "再听一遍" : "继续播放",
          disabled: e.state.busy,
          onClick: u[2] || (u[2] = (d) => l("action", "resume"))
        }, [P(G, { name: "play" })], 8, Pa)) : b("", !0),
        a("button", {
          type: "button",
          "aria-label": "停止",
          onClick: u[3] || (u[3] = (d) => l("action", "stop"))
        }, [P(G, { name: "stop" })]),
        e.state.media.duration ? (t(), i("button", {
          key: 2,
          type: "button",
          onClick: u[4] || (u[4] = (d) => l("action", "rate", { value: e.state.media.rate === 1 ? 0.75 : 1 }))
        }, s(e.state.media.rate) + "×", 1)) : b("", !0)
      ])) : b("", !0),
      e.state.media.duration ? (t(), i("input", {
        key: 3,
        type: "range",
        min: "0",
        max: e.state.media.duration,
        step: "0.1",
        value: e.state.media.position,
        "aria-label": "当前声音片段播放位置",
        onChange: u[5] || (u[5] = (d) => l("action", "seek", { value: Number(d.target.value) }))
      }, null, 40, Wa)) : b("", !0)
    ])) : b("", !0);
  }
}), It = Fa, Ha = { class: "learning-selection" }, Ga = { class: "learning-row" }, za = ["disabled"], Ka = /* @__PURE__ */ _({
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
    return (f, l) => (t(), i("div", Ha, [a("blockquote", null, s(e.selection.quote), 1), a("div", Ga, [
      a("button", {
        type: "button",
        onClick: l[0] || (l[0] = (n) => f.$emit("ask"))
      }, s(r(xe).ask), 1),
      a("button", {
        type: "button",
        disabled: e.disabled || [...e.selection.quote].length > 1e3,
        onClick: l[1] || (l[1] = (n) => f.$emit("say"))
      }, s(r(xe).listen), 9, za),
      a("button", {
        type: "button",
        onClick: l[2] || (l[2] = (n) => f.$emit("dismiss"))
      }, s(r(xe).dismiss), 1)
    ])]));
  }
}), Lt = Ka;
function Te(e) {
  return {
    picked: [],
    text: "",
    values: {},
    order: e.kind === "order" ? e.options.map((f) => f.id) : []
  };
}
function rt(e, f) {
  const l = Te(f);
  return !!e.text.trim() || !!e.picked.length || Object.values(e.values).some((n) => !!n.trim()) || e.order.length !== l.order.length || e.order.some((n, o) => n !== l.order[o]);
}
function St(e) {
  const f = (l) => l.trim() || null;
  return {
    exam: f(e.exam),
    level: f(e.level),
    targetLevel: f(e.targetLevel),
    explanationLanguage: e.explanationLanguage,
    interests: f(e.interests)
  };
}
var ot = () => ({
  text: "",
  cursor: void 0,
  focus: null,
  sent: null,
  scroll: 0,
  following: !0
});
function Ya() {
  const e = be({}), f = be(ot()), l = be({
    open: !1,
    form: {
      exam: "",
      level: "",
      targetLevel: "",
      explanationLanguage: "zh-CN",
      interests: ""
    },
    submitted: null
  }), n = be({ enabled: !1 }), o = be({
    step: 0,
    name: "",
    note: ""
  }), u = be({
    tab: "grammar",
    reason: ""
  });
  return {
    units: e,
    chat: f,
    settings: l,
    companion: n,
    setup: o,
    books: u,
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
    reset(d = !1) {
      for (const p of Object.keys(e)) delete e[p];
      Object.assign(f, ot()), l.open = !1, l.submitted = null, n.enabled = !1, d || Object.assign(o, {
        step: 0,
        name: "",
        note: ""
      }), Object.assign(u, {
        tab: "grammar",
        reason: ""
      });
    },
    reconcile(d) {
      const p = l.submitted;
      p && d.storage === "ready" && !d.busy && d.profile && Object.entries(p.value).every(([h, m]) => d.profile.settings[h] === m) && (Object.entries(p.form).every(([h, m]) => l.form[h] === m) && (l.open = !1), l.submitted = null);
      for (const h of Object.keys(e)) {
        const m = [d.unit, d.review].find((k) => k?.id === h);
        if (!m) {
          delete e[h];
          continue;
        }
        for (const [k, g] of Object.entries(e[h].activityDrafts)) {
          const v = m.attempts.filter((c) => c.exerciseId === k).at(-1);
          if (g.submitted && v && v.id !== g.submitted.before) {
            delete e[h].activityDrafts[k];
            const c = e[h].activities[`exercise:${k}`];
            c && (c.retry = !1);
          }
        }
        const w = e[h].selection;
        w && m.materials.find((k) => k.id === w.materialId)?.paragraphs.find((k) => k.id === w.paragraphId)?.text.slice(w.start, w.end) !== w.quote && (e[h].selection = null);
        for (const [k, g] of Object.entries(e[h].writing)) {
          const v = m.attempts.filter((x) => x.exerciseId === k && !x.revisesAttemptId).at(-1), c = g.submitted;
          !c || !v || v.id === c.before || (g.text === c.text && v.answer.kind === "text" && v.answer.text === c.text.trim() ? (g.text = "", g.rewriting = !1) : g.rewriting = !0, g.submitted = null);
        }
      }
      const $ = f.sent;
      $ && d.conversation.turns.some((h, m) => m + d.conversation.removedTurns >= $.after && (h.purpose === "talk" || h.purpose === "explain") && h.user === $.user) && (f.text === $.text && (f.text = "", f.focus = null), f.sent = null);
    }
  };
}
var At = /* @__PURE__ */ Symbol("learning-ui-session");
function Za(e, f) {
  if (e.chat.text.trim() || e.settings.open && Object.entries(St(e.settings.form)).some(([l, n]) => f.profile?.settings[l] !== n) || e.setup.step === 1 && e.setup.name.trim() && (e.setup.name.trim() !== f.teacher?.name || e.setup.note.trim() !== f.teacher.note)) return !0;
  for (const l of [f.unit, f.review]) {
    const n = l && e.units[l.id];
    if (!(!l || !n)) {
      if (Object.values(n.writing).some((o) => !!o.text.trim()) || l.stage.stage === "revising" && l.assessments.some((o) => o.annotations?.some((u) => n.edits[u.id] && n.edits[u.id].value !== u.quote))) return !0;
      for (const o of l.exercises) {
        const u = n.activityDrafts[o.id]?.value, d = n.review.drafts[o.id];
        if (u && rt(u, o.response) || d && !l.attempts.some((p) => p.exerciseId === o.id) && rt(d, o.response)) return !0;
      }
    }
  }
  return !1;
}
function Ja(e) {
  const f = Ya();
  return Dt(At, f), z([
    () => e.value.chatIdentity,
    () => e.value.language,
    () => e.value.teacher?.name
  ], (l, n) => f.reset(l[0] === n[0])), z(() => e.value, (l) => f.reconcile(l), { immediate: !0 }), z(() => e.value.currentUnitId, () => {
    f.chat.focus = null;
  }), z(() => Za(f, e.value), (l, n, o) => {
    if (!l) return;
    const u = (d) => {
      d.preventDefault(), d.returnValue = "";
    };
    window.addEventListener("beforeunload", u), o(() => window.removeEventListener("beforeunload", u));
  }, { immediate: !0 }), f;
}
function ke() {
  const e = Ut(At);
  if (!e) throw new Error("Learning views require their application session");
  return e;
}
function he(e) {
  const f = ke();
  return I(() => f.unit(e()));
}
var _a = ["onKeydown"], Qa = {
  role: "dialog",
  "aria-labelledby": "learning-activity-title",
  class: "learning-activity"
}, Xa = { class: "learning-activity-header" }, en = { id: "learning-activity-title" }, tn = {
  key: 0,
  "aria-label": "完成本课的固定奖励"
}, an = {
  key: 0,
  class: "learning-margin-note",
  role: "status"
}, nn = ["open"], ln = {
  key: 3,
  class: "learning-question"
}, sn = { class: "learning-help-actions" }, rn = ["disabled"], on = ["disabled"], un = ["disabled"], dn = {
  key: 0,
  class: "learning-margin-note"
}, vn = {
  key: 1,
  class: "learning-margin-note"
}, cn = { key: 0 }, gn = { key: 1 }, mn = { key: 2 }, pn = ["disabled"], bn = /* @__PURE__ */ _({
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
  setup(e, { emit: f }) {
    const l = e, n = f, o = H(null), u = he(() => l.target.unitId), d = I(() => `${l.target.kind}:${l.target.id}`);
    z([u, d], () => {
      u.value.activities[d.value] ??= {
        scroll: 0,
        selected: null,
        retry: !1,
        materialsOpen: !1
      };
    }, { immediate: !0 });
    const p = I(() => u.value.activities[d.value]), $ = H(null), h = I({
      get: () => p.value.retry,
      set: (D) => {
        p.value.retry = D;
      }
    }), m = I({
      get: () => p.value.selected,
      set: (D) => {
        p.value.selected = D;
      }
    }), w = H(null);
    function k() {
      m.value ? m.value = null : h.value ? h.value = !1 : n("close");
    }
    ft(w, k);
    const g = I(() => u.value.activityDrafts);
    let v = null;
    const c = I(() => l.target?.kind === "exercise" ? l.state.unit?.exercises.find((D) => D.id === l.target?.id) : void 0), x = I(() => l.state.unit?.materials.filter((D) => l.target?.kind === "material" ? D.id === l.target.id : c.value?.materialIds.includes(D.id)) ?? []), K = I(() => c.value?.id ?? l.state.unit?.exercises.find((D) => D.skill === "listening" && D.materialIds.includes(l.target?.id ?? ""))?.id ?? l.state.unit?.exercises.find((D) => D.materialIds.includes(l.target?.id ?? ""))?.id), E = I(() => x.value.filter((D) => c.value?.response.kind !== "evidence" || D.id === c.value.response.materialId).flatMap((D) => D.paragraphs)), T = I(() => l.state.unit?.attempts.filter((D) => D.exerciseId === c.value?.id).at(-1)), S = I(() => l.state.unit?.assessments.find((D) => D.attemptId === T.value?.id));
    z(() => c.value, (D) => {
      if (!D) return;
      const N = JSON.stringify(D.response);
      g.value[D.id]?.response !== N && (g.value[D.id] = {
        response: N,
        value: Te(D.response)
      });
    }, { immediate: !0 });
    const q = I({
      get: () => g.value[c.value.id].value,
      set: (D) => {
        g.value[c.value.id].value = D;
      }
    });
    fe(() => {
      $.value?.focus({ preventScroll: !0 }), o.value && (o.value.scrollTop = p.value.scroll);
    }), ye(() => {
      o.value && (p.value.scroll = o.value.scrollTop);
    }), z(() => l.state.unit?.attempts, (D) => {
      if (!v) return;
      const N = D?.filter((W) => W.exerciseId === v.id).at(-1);
      if (N && N.id !== v.before) {
        const W = l.target?.kind === "exercise" && l.target.id === v.id;
        delete g.value[v.id], v = null, W && n("close");
      }
    });
    function V(D) {
      v = {
        id: c.value.id,
        before: T.value?.id
      }, g.value[c.value.id].submitted = { before: T.value?.id }, n("action", "submit", {
        unitId: l.state.unit.id,
        exerciseId: c.value.id,
        answer: D
      });
    }
    return (D, N) => (t(), i("div", {
      ref_key: "layer",
      ref: w,
      class: "learning-activity-shade",
      onKeydown: pe(ae(k, ["stop", "prevent"]), ["esc"])
    }, [a("section", Qa, [
      a("header", Xa, [
        a("h2", en, s(c.value ? "练习" : x.value[0]?.title ?? "材料"), 1),
        e.state.unit ? (t(), i("small", tn, "+" + s(e.state.unit.reward.amount) + " 币", 1)) : b("", !0),
        a("button", {
          ref_key: "closeButton",
          ref: $,
          type: "button",
          "aria-label": "收起课件",
          onClick: N[0] || (N[0] = (W) => n("close"))
        }, [N[18] || (N[18] = F("收起", -1)), P(G, { name: "back" })], 512)
      ]),
      e.state.message && !e.state.busy ? (t(), i("p", an, s(e.state.message), 1)) : b("", !0),
      a("div", {
        ref_key: "body",
        ref: o,
        class: "learning-activity-body"
      }, [
        c.value && x.value.length ? (t(), i("details", {
          key: 0,
          class: "learning-activity-materials",
          open: p.value.materialsOpen,
          onToggle: N[3] || (N[3] = (W) => p.value.materialsOpen = W.target.open)
        }, [a("summary", null, "阅读材料 · " + s(x.value.length), 1), (t(!0), i(M, null, j(x.value, (W) => (t(), Y(lt, {
          key: W.id,
          material: W,
          "exercise-id": K.value,
          disabled: e.disabled,
          onAction: N[1] || (N[1] = (O, B) => n("action", O, B)),
          onSelect: N[2] || (N[2] = (O) => m.value = O)
        }, null, 8, [
          "material",
          "exercise-id",
          "disabled"
        ]))), 128))], 40, nn)) : c.value ? b("", !0) : (t(!0), i(M, { key: 1 }, j(x.value, (W) => (t(), Y(lt, {
          key: W.id,
          material: W,
          "exercise-id": K.value,
          disabled: e.disabled,
          onAction: N[4] || (N[4] = (O, B) => n("action", O, B)),
          onSelect: N[5] || (N[5] = (O) => m.value = O)
        }, null, 8, [
          "material",
          "exercise-id",
          "disabled"
        ]))), 128)),
        m.value ? (t(), Y(Lt, {
          key: 2,
          selection: m.value,
          disabled: e.disabled,
          onAsk: N[6] || (N[6] = (W) => n("ask", K.value, m.value)),
          onSay: N[7] || (N[7] = (W) => n("action", "say", { selection: m.value })),
          onDismiss: N[8] || (N[8] = (W) => m.value = null)
        }, null, 8, ["selection", "disabled"])) : b("", !0),
        c.value ? (t(), i("section", ln, [
          a("h2", null, s(c.value.prompt), 1),
          a("div", sn, [
            a("button", {
              type: "button",
              disabled: e.disabled || [...c.value.prompt].length > 1e3,
              onClick: N[9] || (N[9] = (W) => n("action", "say-question", { exerciseId: c.value.id }))
            }, "听题干", 8, rn),
            c.value.hasHint ? (t(), i("button", {
              key: 0,
              type: "button",
              disabled: e.disabled || c.value.hint !== null,
              onClick: N[10] || (N[10] = (W) => n("action", "reveal", {
                kind: "hints",
                id: c.value.id
              }))
            }, "提示", 8, on)) : b("", !0),
            a("button", {
              type: "button",
              disabled: e.disabled || c.value.solution !== null,
              onClick: N[11] || (N[11] = (W) => n("action", "reveal", {
                kind: "answers",
                id: c.value.id
              }))
            }, "解答", 8, un),
            a("button", {
              type: "button",
              onClick: N[12] || (N[12] = (W) => n("ask", c.value.id))
            }, "问语伴")
          ]),
          c.value.hint ? (t(), i("p", dn, s(c.value.hint), 1)) : b("", !0),
          c.value.solution ? (t(), i("div", vn, [c.value.solution.kind === "exact" ? (t(), i("p", cn, s(r(Fe)(c.value.solution.answer, c.value.response, E.value)), 1)) : c.value.solution.kind === "gaps" ? (t(), i("p", gn, s(c.value.solution.accepted.map((W) => W.forms.join(" / ")).join(`
`)), 1)) : b("", !0), c.value.solution.kind !== "semantic" ? (t(), i("p", mn, s(c.value.solution.explanation), 1)) : (t(), i("button", {
            key: 3,
            type: "button",
            onClick: N[13] || (N[13] = (W) => n("ask", c.value.id))
          }, "请语伴讲解"))])) : b("", !0),
          (!T.value || h.value) && g.value[c.value.id] ? (t(), Y(yt, {
            key: c.value.id,
            modelValue: q.value,
            "onUpdate:modelValue": N[14] || (N[14] = (W) => q.value = W),
            response: c.value.response,
            paragraphs: E.value,
            disabled: e.disabled,
            onSubmit: V
          }, null, 8, [
            "modelValue",
            "response",
            "paragraphs",
            "disabled"
          ])) : b("", !0),
          T.value ? (t(), Y($t, {
            key: 3,
            attempt: T.value,
            feedback: S.value,
            response: c.value.response,
            paragraphs: E.value,
            disabled: e.disabled,
            revised: !!e.state.unit?.attempts.some((W) => W.revisesAttemptId === T.value?.id),
            onAction: N[15] || (N[15] = (W, O) => {
              n("action", W, O), n("close");
            })
          }, null, 8, [
            "attempt",
            "feedback",
            "response",
            "paragraphs",
            "disabled",
            "revised"
          ])) : b("", !0),
          T.value ? (t(), i("button", {
            key: 4,
            type: "button",
            disabled: e.disabled,
            onClick: N[16] || (N[16] = (W) => {
              h.value = !h.value, g.value[c.value.id] ??= {
                response: JSON.stringify(c.value.response),
                value: r(Te)(c.value.response)
              };
            })
          }, s(h.value ? "收起再练" : "再试一次"), 9, pn)) : b("", !0)
        ])) : b("", !0)
      ], 512),
      P(It, {
        state: e.state,
        onAction: N[17] || (N[17] = (W, O) => n("action", W, O))
      }, null, 8, ["state"])
    ])], 40, _a));
  }
}), fn = bn, yn = 864e5;
function ut(e, f) {
  return /^(zh|ja|ko)\b/iu.test(f) ? {
    count: [...e.replace(/[\s\p{P}\p{S}]/gu, "")].length,
    unit: "字"
  } : {
    count: e.match(/[\p{L}\p{N}][\p{L}\p{N}\p{M}'’-]*/gu)?.length ?? 0,
    unit: "词"
  };
}
function Mt(e, f) {
  const l = [], n = /* @__PURE__ */ new Map();
  for (const o of f)
    if (o.quote)
      for (let u = e.indexOf(o.quote); u >= 0; u = e.indexOf(o.quote, u + 1)) {
        const d = u + o.quote.length;
        if (!l.some(([p, $]) => u < $ && p < d)) {
          l.push([u, d]), n.set(o.id, u);
          break;
        }
      }
  return n;
}
function kn(e, f) {
  const l = e.split(/(\r?\n)/u), n = [];
  l.forEach((h, m) => {
    m % 2 === 0 && h.trim() && n.push(m);
  });
  const o = [], u = [], d = /* @__PURE__ */ new Map();
  for (const h of f) d.set(h.paragraphIndex, [...d.get(h.paragraphIndex) ?? [], h]);
  for (const [h, m] of d) {
    const w = n[h];
    if (w === void 0) {
      o.push(...m.map((c) => c.id));
      continue;
    }
    const k = Mt(l[w], m), g = m.filter((c) => k.has(c.id)).sort((c, x) => k.get(x.id) - k.get(c.id));
    let v = l[w];
    for (const c of g) {
      const x = k.get(c.id);
      v = v.slice(0, x) + c.replacement + v.slice(x + c.quote.length), c.replacement !== c.quote && u.push(c.id);
    }
    l[w] = v, o.push(...m.filter((c) => !k.has(c.id)).map((c) => c.id));
  }
  const p = new Map(f.map((h, m) => [h.id, m])), $ = (h, m) => p.get(h) - p.get(m);
  return {
    text: l.join(""),
    missing: o.sort($),
    applied: u.sort($)
  };
}
function hn(e, f) {
  const l = Mt(e, f), n = f.filter((d) => l.has(d.id)).map((d) => ({
    id: d.id,
    start: l.get(d.id),
    length: d.quote.length
  })).sort((d, p) => d.start - p.start), o = [];
  let u = 0;
  for (const d of n)
    d.start > u && o.push({ text: e.slice(u, d.start) }), o.push({
      text: e.slice(d.start, d.start + d.length),
      id: d.id
    }), u = d.start + d.length;
  return (u < e.length || !o.length) && o.push({ text: e.slice(u) }), o;
}
function $n(e, f = "xiaobai-learning-seen-units") {
  const l = /* @__PURE__ */ new Set(), n = () => {
    try {
      const o = JSON.parse(e()?.getItem(f) ?? "[]");
      return Array.isArray(o) ? o.filter((u) => typeof u == "string") : [];
    } catch {
      return [];
    }
  };
  return {
    has: (o) => l.has(o) || n().includes(o),
    mark(o) {
      l.add(o);
      try {
        e()?.setItem(f, JSON.stringify([.../* @__PURE__ */ new Set([...n(), o])].slice(-50)));
      } catch {
      }
    }
  };
}
var wn = () => {
  try {
    return globalThis.localStorage;
  } catch {
    return null;
  }
}, dt = $n(wn);
function He(e, f = Date.now()) {
  const l = new Date(e), n = new Date(f), o = Math.round((Date.UTC(l.getFullYear(), l.getMonth(), l.getDate()) - Date.UTC(n.getFullYear(), n.getMonth(), n.getDate())) / yn);
  return !Number.isFinite(o) || o <= 0 ? "今天复习" : o === 1 ? "明天再见" : `${o} 天后再见`;
}
var xn = { class: "learning-records-page" }, Cn = {
  key: 0,
  class: "learning-page-heading"
}, In = {
  key: 0,
  class: "learning-muted"
}, Ln = { class: "learning-muted" }, Sn = {
  key: 0,
  class: "learning-muted"
}, An = ["disabled", "onClick"], Mn = ["disabled"], Rn = {
  key: 0,
  class: "learning-empty-note"
}, Tn = ["disabled", "onClick"], Bn = ["title"], En = {
  key: 1,
  class: "learning-row"
}, Nn = ["disabled"], On = { class: "learning-muted" }, qn = ["disabled"], Vn = /* @__PURE__ */ _({
  __name: "LearningRecords",
  props: {
    state: {},
    disabled: { type: Boolean },
    embedded: { type: Boolean }
  },
  emits: ["action", "remove"],
  setup(e, { emit: f }) {
    const l = e, n = f;
    Re(() => l.state.record ? (n("action", "records", { offset: l.state.records.offset }), !0) : !1);
    const o = {
      deleteAnswer: "删除这次作答",
      deleteRecord: "删除记录",
      answerWarning: "这次作答和对应的反馈会删除，相关知识点的掌握情况会更新。已到账奖励保留。",
      recordWarning: "这条学习记录会删除，仅属于它的历史作答也会删除。当前练习不受影响。",
      hidden: "听力原文暂未显示，下面是你的作答和点评。"
    };
    return (u, d) => (t(), i("section", xn, [!e.embedded || e.state.record ? (t(), i("div", Cn, [d[5] || (d[5] = a("h1", null, "学习记录", -1)), e.state.records.total ? (t(), i("span", In, s(e.state.records.total) + " 项", 1)) : b("", !0)])) : b("", !0), e.state.record ? (t(), i(M, { key: 1 }, [
      a("button", {
        type: "button",
        onClick: d[0] || (d[0] = (p) => u.$emit("action", "records", { offset: e.state.records.offset }))
      }, "‹ 返回记录"),
      a("h2", null, s(e.state.record.label), 1),
      (t(!0), i(M, null, j(e.state.record.evidence, (p) => (t(), i("article", {
        key: p.attempt.id,
        class: "learning-record-evidence"
      }, [
        a("p", Ln, s(new Date(p.attempt.submittedAt).toLocaleDateString()), 1),
        a("h3", null, s(p.exercise.prompt), 1),
        (t(!0), i(M, null, j(p.materials, ($) => (t(), i("details", { key: $.id }, [a("summary", null, s($.title), 1), $.hidden ? (t(), i("p", Sn, s(o.hidden), 1)) : (t(!0), i(M, { key: 1 }, j($.paragraphs, (h) => (t(), i("p", { key: h.id }, s(h.text), 1))), 128))]))), 128)),
        P($t, {
          attempt: p.attempt,
          feedback: p.assessment,
          response: p.exercise.response,
          paragraphs: p.materials.flatMap(($) => $.paragraphs),
          disabled: e.disabled,
          revised: !!e.state.unit?.attempts.some(($) => $.revisesAttemptId === p.attempt.id),
          onAction: d[1] || (d[1] = ($, h) => u.$emit("action", $, h))
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
          onClick: ($) => u.$emit("remove", "delete-attempt", { id: p.attempt.id }, o.answerWarning)
        }, s(o.deleteAnswer), 9, An)
      ]))), 128)),
      a("button", {
        type: "button",
        disabled: e.disabled,
        onClick: d[2] || (d[2] = (p) => u.$emit("remove", "delete-item", { id: e.state.record.id }, o.recordWarning))
      }, s(o.deleteRecord), 9, Mn)
    ], 64)) : (t(), i(M, { key: 2 }, [
      e.state.records.total ? b("", !0) : (t(), i("p", Rn, "暂无学习记录")),
      (t(!0), i(M, null, j(e.state.records.items, (p) => (t(), i("button", {
        key: p.id,
        class: "learning-record-row",
        type: "button",
        disabled: !p.readable,
        onClick: ($) => u.$emit("action", "records", {
          id: p.id,
          offset: e.state.records.offset
        })
      }, [a("span", null, [a("strong", null, s(p.label), 1), a("small", null, [F(s(r(xt)(p.evidenceCount)), 1), p.nextReviewAt ? (t(), i("span", {
        key: 0,
        title: p.scheduleReason ?? void 0
      }, " · " + s(r(He)(p.nextReviewAt)) + "（" + s(new Date(p.nextReviewAt).toLocaleDateString()) + "）", 9, Bn)) : b("", !0)])]), a("em", null, s(r(wt)[p.state]), 1)], 8, Tn))), 128)),
      e.state.records.total > 30 ? (t(), i("div", En, [
        a("button", {
          type: "button",
          disabled: e.state.records.offset === 0,
          onClick: d[3] || (d[3] = (p) => u.$emit("action", "records", { offset: Math.max(0, e.state.records.offset - 30) }))
        }, "上一页", 8, Nn),
        a("span", On, s(e.state.records.total) + " 项", 1),
        a("button", {
          type: "button",
          disabled: e.state.records.offset + 30 >= e.state.records.total,
          onClick: d[4] || (d[4] = (p) => u.$emit("action", "records", { offset: e.state.records.offset + 30 }))
        }, "下一页", 8, qn)
      ])) : b("", !0)
    ], 64))]));
  }
}), vt = Vn, Un = { class: "learning-books-page" }, Dn = { class: "learning-page-heading" }, jn = {
  key: 0,
  class: "learning-due"
}, Pn = { key: 0 }, Wn = { key: 1 }, Fn = ["disabled"], Hn = {
  class: "learning-tabs",
  role: "tablist",
  "aria-label": "学习记录视图"
}, Gn = ["aria-selected", "onClick"], zn = {
  key: 0,
  class: "learning-empty-note"
}, Kn = { class: "learning-book-list" }, Yn = ["disabled", "onClick"], Zn = ["aria-expanded", "onClick"], Jn = {
  key: 1,
  class: "learning-chip-reason"
}, _n = {
  key: 2,
  class: "learning-growth"
}, Qn = {
  key: 0,
  class: "learning-empty-note"
}, Xn = { class: "learning-muted" }, ei = { key: 0 }, ti = { key: 0 }, ai = { key: 1 }, ni = { key: 2 }, ii = /* @__PURE__ */ _({
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
  setup(e, { emit: f }) {
    const l = e, n = f, o = ke().books, u = ve(o, "tab"), d = [
      ["grammar", "语法本"],
      ["vocabulary", "生词本"],
      ["growth", "成长"],
      ["all", "全部记录"]
    ], p = { title: "学习本" }, $ = ve(o, "reason"), h = I(() => u.value === "grammar" || u.value === "vocabulary" ? l.state.books[u.value] : []), m = I(() => l.state.growth), w = I(() => !!l.state.review && l.state.review.stage.stage !== "complete");
    return (k, g) => (t(), i("section", Un, [e.state.record ? (t(), Y(vt, {
      key: 0,
      state: e.state,
      disabled: e.disabled,
      onAction: g[0] || (g[0] = (v, c) => n("action", v, c)),
      onRemove: g[1] || (g[1] = (v, c, x) => n("remove", v, c, x))
    }, null, 8, ["state", "disabled"])) : (t(), i(M, { key: 1 }, [
      a("div", Dn, [a("h1", null, s(p.title), 1)]),
      e.state.dueCount || w.value ? (t(), i("div", jn, [e.state.dueCount ? (t(), i("span", Pn, s(r(Ct)(e.state.dueCount)), 1)) : b("", !0), e.state.blockedReview ? (t(), i("small", Wn, "有一组复习在另一个故事中进行，回到学习页可以放下它")) : w.value ? (t(), i("button", {
        key: 3,
        type: "button",
        class: "learning-primary",
        onClick: g[3] || (g[3] = (v) => n("review"))
      }, s(r(J).resumeReview), 1)) : (t(), i("button", {
        key: 2,
        type: "button",
        class: "learning-primary",
        disabled: e.disabled,
        onClick: g[2] || (g[2] = (v) => n("action", "start-review"))
      }, s(r(J).review), 9, Fn))])) : b("", !0),
      a("div", Hn, [(t(), i(M, null, j(d, ([v, c]) => a("button", {
        key: v,
        type: "button",
        role: "tab",
        "aria-selected": u.value === v,
        onClick: (x) => {
          u.value = v, $.value = "";
        }
      }, s(c), 9, Gn)), 64))]),
      u.value === "grammar" || u.value === "vocabulary" ? (t(), i(M, { key: 1 }, [h.value.length ? b("", !0) : (t(), i("p", zn, s(u.value === "grammar" ? "批改里出现的语法问题会记到这里。" : "批改里的词汇问题、读文章时收藏的词语会记到这里。"), 1)), a("ul", Kn, [(t(!0), i(M, null, j(h.value, (v) => (t(), i("li", { key: v.id }, [
        a("button", {
          type: "button",
          class: "learning-book-item",
          disabled: !v.readable,
          onClick: (c) => n("action", "records", {
            id: v.id,
            offset: e.state.records.offset
          })
        }, [a("strong", null, s(v.label), 1), a("small", null, s(r(wt)[v.state]) + " · " + s(r(xt)(v.evidenceCount)), 1)], 8, Yn),
        v.nextReviewAt ? (t(), i("button", {
          key: 0,
          type: "button",
          class: "learning-chip",
          "aria-expanded": $.value === v.id,
          onClick: (c) => $.value = $.value === v.id ? "" : v.id
        }, s(r(He)(v.nextReviewAt)), 9, Zn)) : b("", !0),
        $.value === v.id ? (t(), i("small", Jn, s(v.scheduleReason), 1)) : b("", !0)
      ]))), 128))])], 64)) : u.value === "growth" ? (t(), i("section", _n, [m.value.enough ? (t(), i(M, { key: 1 }, [
        a("p", Xn, [F("来自 " + s(m.value.evidence) + " 份作答", 1), m.value.completed ? (t(), i("span", ei, "、" + s(m.value.completed) + " 次完成", 1)) : b("", !0)]),
        m.value.steady.length ? (t(), i("div", ti, [g[6] || (g[6] = a("h2", null, "已经稳定", -1)), a("p", null, s(m.value.steady.join("、")), 1)])) : b("", !0),
        m.value.practising.length ? (t(), i("div", ai, [g[7] || (g[7] = a("h2", null, "最近独立做对", -1)), a("p", null, s(m.value.practising.join("、")), 1)])) : b("", !0),
        m.value.struggling.length ? (t(), i("div", ni, [g[8] || (g[8] = a("h2", null, "还要再练", -1)), a("p", null, s(m.value.struggling.join("、")), 1)])) : b("", !0)
      ], 64)) : (t(), i("p", Qn, "还需要几次练习才看得出"))])) : (t(), Y(vt, {
        key: 3,
        embedded: "",
        state: e.state,
        disabled: e.disabled,
        onAction: g[4] || (g[4] = (v, c) => n("action", v, c)),
        onRemove: g[5] || (g[5] = (v, c, x) => n("remove", v, c, x))
      }, null, 8, ["state", "disabled"]))
    ], 64))]));
  }
}), li = ii, si = {
  class: "learning-settings-card",
  "aria-label": "训练设置"
}, ri = { key: 0 }, oi = ["disabled"], ui = ["open"], di = ["value"], vi = { class: "learning-row" }, ci = ["disabled"], gi = /* @__PURE__ */ _({
  __name: "LearningSettingsCard",
  props: {
    state: {},
    disabled: { type: Boolean },
    onboarding: { type: Boolean }
  },
  emits: ["action"],
  setup(e, { emit: f }) {
    const l = e, n = f, o = [
      ["zh-CN", "中文"],
      ["en", "English"],
      ["ja", "日本語"],
      ["ko", "한국어"]
    ], u = I(() => l.state.profile?.settings ?? null), d = ke().settings, p = d.form, $ = ve(d, "open");
    function h() {
      Object.assign(p, {
        exam: u.value?.exam ?? "",
        level: u.value?.level ?? "",
        targetLevel: u.value?.targetLevel ?? "",
        explanationLanguage: u.value?.explanationLanguage ?? "zh-CN",
        interests: u.value?.interests ?? ""
      });
    }
    l.onboarding && !d.open && (h(), d.open = !0);
    const m = (v) => o.find(([c]) => c === v)?.[1] ?? new Intl.DisplayNames(["zh-CN"], { type: "language" }).of(v) ?? v, w = I(() => [.../* @__PURE__ */ new Set([...o.map(([v]) => v), u.value?.explanationLanguage ?? "zh-CN"])]), k = I(() => [
      ["考试", u.value?.exam || "不备考"],
      ["水平", u.value?.level || "不确定"],
      ["目标", u.value?.targetLevel || "比现在高一级"],
      ["讲解", m(u.value?.explanationLanguage ?? "zh-CN")],
      ["兴趣", u.value?.interests || "不限"]
    ]);
    function g() {
      const v = St(p);
      d.submitted = {
        value: v,
        form: { ...p }
      }, n("action", "settings", { value: v });
    }
    return (v, c) => (t(), i("section", si, [$.value ? b("", !0) : (t(), i("dl", ri, [(t(!0), i(M, null, j(k.value, ([x, K]) => (t(), i("div", { key: x }, [a("dt", null, s(x), 1), a("dd", null, s(K), 1)]))), 128))])), $.value ? (t(), i("form", {
      key: 2,
      class: "learning-fields",
      onSubmit: ae(g, ["prevent"])
    }, [
      a("label", null, [c[7] || (c[7] = F("考试", -1)), X(a("input", {
        "onUpdate:modelValue": c[1] || (c[1] = (x) => r(p).exam = x),
        type: "text",
        maxlength: "80",
        placeholder: "不备考（例如 雅思、JLPT N2）"
      }, null, 512), [[ie, r(p).exam]])]),
      a("label", null, [c[8] || (c[8] = F("现在的水平", -1)), X(a("input", {
        "onUpdate:modelValue": c[2] || (c[2] = (x) => r(p).level = x),
        type: "text",
        maxlength: "80",
        placeholder: "不确定"
      }, null, 512), [[ie, r(p).level]])]),
      a("label", null, [c[9] || (c[9] = F("目标", -1)), X(a("input", {
        "onUpdate:modelValue": c[3] || (c[3] = (x) => r(p).targetLevel = x),
        type: "text",
        maxlength: "80",
        placeholder: "比现在高一级"
      }, null, 512), [[ie, r(p).targetLevel]])]),
      a("details", {
        class: "learning-settings-optional",
        open: !e.onboarding
      }, [
        a("summary", null, s(r(J).optionalSettings), 1),
        a("label", null, [c[10] || (c[10] = F("讲解语言", -1)), X(a("select", { "onUpdate:modelValue": c[4] || (c[4] = (x) => r(p).explanationLanguage = x) }, [(t(!0), i(M, null, j(w.value, (x) => (t(), i("option", {
          key: x,
          value: x
        }, s(m(x)), 9, di))), 128))], 512), [[Me, r(p).explanationLanguage]])]),
        a("label", null, [c[11] || (c[11] = F("感兴趣的话题", -1)), X(a("input", {
          "onUpdate:modelValue": c[5] || (c[5] = (x) => r(p).interests = x),
          type: "text",
          maxlength: "200",
          placeholder: "不限"
        }, null, 512), [[ie, r(p).interests]])])
      ], 8, ui),
      a("div", vi, [e.onboarding ? b("", !0) : (t(), i("button", {
        key: 0,
        type: "button",
        onClick: c[6] || (c[6] = (x) => {
          $.value = !1, r(d).submitted = null;
        })
      }, "取消")), a("button", {
        type: "submit",
        class: "learning-primary",
        disabled: e.disabled
      }, s(e.onboarding ? r(J).setupFinish : r(J).saveSettings), 9, ci)])
    ], 32)) : (t(), i("button", {
      key: 1,
      type: "button",
      disabled: e.disabled,
      onClick: c[0] || (c[0] = (x) => {
        h(), $.value = !0;
      })
    }, "调整", 8, oi))]));
  }
}), Rt = gi, mi = { class: "learning-profile-page" }, pi = { class: "learning-setup-heading" }, bi = { class: "learning-eyebrow" }, fi = { class: "learning-language-options" }, yi = [
  "disabled",
  "aria-pressed",
  "onClick"
], ki = { "aria-hidden": "true" }, hi = ["disabled"], $i = {
  key: 0,
  class: "learning-setup-empty"
}, wi = { class: "learning-teacher-options" }, xi = [
  "disabled",
  "aria-pressed",
  "onClick"
], Ci = { class: "learning-person-initial" }, Ii = {
  key: 1,
  class: "learning-selected-teacher"
}, Li = { class: "learning-person-initial" }, Si = { key: 0 }, Ai = ["open"], Mi = ["disabled"], Ri = ["disabled"], Ti = ["disabled"], Bi = { class: "learning-setup-actions" }, Ei = ["disabled"], Ni = ["disabled"], Oi = /* @__PURE__ */ _({
  __name: "LearningSetup",
  props: {
    state: {},
    disabled: { type: Boolean }
  },
  emits: ["action"],
  setup(e, { emit: f }) {
    const l = f, n = ke().setup, o = ve(n, "step"), u = H(null), d = ve(n, "name"), p = ve(n, "note"), $ = [
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
    async function h(m) {
      o.value = m, await oe(), u.value?.focus();
    }
    return Re(() => o.value ? (h(o.value - 1), !0) : !1), (m, w) => (t(), i("section", mi, [a("div", pi, [a("p", bi, s(o.value + 1) + " / " + s(r(J).setupSteps), 1), a("h1", {
      ref_key: "heading",
      ref: u,
      tabindex: "-1"
    }, s(o.value === 0 ? "选择要学习的语言" : o.value === 1 ? "选择语伴" : r(J).setupTitle), 513)]), o.value === 0 ? (t(), i(M, { key: 0 }, [a("div", fi, [(t(), i(M, null, j($, ([k, g, v]) => a("button", {
      key: k,
      type: "button",
      disabled: e.disabled,
      "aria-pressed": e.state.language === k,
      onClick: (c) => l("action", "language", { language: k })
    }, [
      a("span", ki, s(v), 1),
      a("strong", null, s(g), 1),
      e.state.language === k ? (t(), Y(G, {
        key: 0,
        name: "check"
      })) : b("", !0)
    ], 8, yi)), 64))]), a("button", {
      type: "button",
      class: "learning-primary learning-setup-next",
      disabled: e.disabled,
      onClick: w[0] || (w[0] = (k) => h(1))
    }, [w[7] || (w[7] = F("继续", -1)), P(G, { name: "arrow" })], 8, hi)], 64)) : o.value === 1 ? (t(), i(M, { key: 1 }, [
      e.state.candidates.length ? b("", !0) : (t(), i("p", $i, "当前故事里还没有认识的人物，所以没有可选的语伴。可以在下面手动填一位：名字加一句身份说明。")),
      a("div", wi, [(t(!0), i(M, null, j(e.state.candidates, (k) => (t(), i("button", {
        key: k.name,
        type: "button",
        disabled: e.disabled,
        "aria-pressed": e.state.teacher?.name === k.name,
        onClick: (g) => l("action", "teacher", { teacher: {
          name: k.name,
          note: ""
        } })
      }, [
        a("span", Ci, s([...k.name][0]), 1),
        a("strong", null, s(k.name), 1),
        e.state.teacher?.name === k.name ? (t(), Y(G, {
          key: 0,
          name: "check"
        })) : b("", !0)
      ], 8, xi))), 128))]),
      e.state.teacher && !e.state.candidates.some((k) => k.name === e.state.teacher?.name) ? (t(), i("p", Ii, [
        a("span", Li, s([...e.state.teacher.name][0]), 1),
        a("span", null, [F(s(e.state.teacher.name), 1), e.state.teacher.note ? (t(), i("small", Si, s(e.state.teacher.note), 1)) : b("", !0)]),
        P(G, { name: "check" })
      ])) : b("", !0),
      a("details", {
        class: "learning-other-teacher",
        open: !e.state.candidates.length
      }, [a("summary", null, s(e.state.candidates.length ? "手动填写其他人物" : "手动填写"), 1), a("form", {
        class: "learning-fields",
        onSubmit: w[3] || (w[3] = ae((k) => l("action", "teacher", { teacher: {
          name: d.value.trim(),
          note: p.value.trim()
        } }), ["prevent"]))
      }, [
        a("label", null, [w[8] || (w[8] = F("名字", -1)), X(a("input", {
          "onUpdate:modelValue": w[1] || (w[1] = (k) => d.value = k),
          type: "text",
          maxlength: "80",
          placeholder: "例如 林老师",
          disabled: e.disabled
        }, null, 8, Mi), [[ie, d.value]])]),
        a("label", null, [w[9] || (w[9] = F("一句身份说明", -1)), X(a("input", {
          "onUpdate:modelValue": w[2] || (w[2] = (k) => p.value = k),
          type: "text",
          maxlength: "200",
          placeholder: "例如 在东京长大的大学同学，说话直爽",
          disabled: e.disabled
        }, null, 8, Ri), [[ie, p.value]])]),
        a("button", {
          type: "submit",
          disabled: e.disabled || !d.value.trim()
        }, "选这位", 8, Ti)
      ], 32)], 8, Ai),
      a("div", Bi, [a("button", {
        type: "button",
        disabled: e.disabled,
        onClick: w[4] || (w[4] = (k) => h(0))
      }, "上一步", 8, Ei), a("button", {
        type: "button",
        class: "learning-primary",
        disabled: e.disabled || !e.state.teacher,
        onClick: w[5] || (w[5] = (k) => h(2))
      }, [F(s(r(J).setupContinue), 1), P(G, { name: "arrow" })], 8, Ni)])
    ], 64)) : (t(), Y(Rt, {
      key: 2,
      onboarding: "",
      state: e.state,
      disabled: e.disabled || !e.state.teacher,
      onAction: w[6] || (w[6] = (k, g) => l("action", k, g ?? {}))
    }, null, 8, ["state", "disabled"]))]));
  }
}), qi = Oi, Vi = { class: "learning-companion-control" }, Ui = {
  key: 0,
  class: "learning-sr-only"
}, Di = { class: "learning-companion-options" }, ji = { class: "learning-companion-switch" }, Pi = ["aria-label"], Wi = { class: "learning-cost-note" }, Fi = /* @__PURE__ */ _({
  __name: "LearningCompanionControl",
  props: { name: {} },
  setup(e) {
    const f = ve(ke().companion, "enabled"), l = {
      title: "陪读",
      on: "一起学习中",
      off: "未开启",
      description: "开启后语伴会和你一起学习",
      costTitle: "费用说明",
      cost: "陪读消息和聊天一样，按你所用的 AI 服务计费。"
    };
    return (n, o) => (t(), i("details", Vi, [a("summary", null, [
      a("span", {
        class: ne(["learning-companion-light", { "is-on": f.value }]),
        "aria-hidden": "true"
      }, null, 2),
      F(s(f.value ? e.name ? `${e.name} · ${l.on}` : l.on : l.title), 1),
      f.value ? b("", !0) : (t(), i("span", Ui, s(l.off), 1))
    ]), a("div", Di, [a("label", ji, [a("span", null, s(l.description), 1), X(a("input", {
      "onUpdate:modelValue": o[0] || (o[0] = (u) => f.value = u),
      type: "checkbox",
      role: "switch",
      "aria-label": l.title
    }, null, 8, Pi), [[Ht, f.value]])]), a("details", Wi, [a("summary", null, s(l.costTitle), 1), a("small", null, s(l.cost), 1)])])]));
  }
}), Tt = Fi, De = {
  unconfirmed: "还没确认保存是否成功，请先查看保存结果，不要重复提交。",
  conflict: "发现另一份学习记录，请先核对再继续。",
  unloaded: "暂时打不开学习记录。",
  failed: "这次没能保存，之前保存的内容都还在，请重试。"
}, re = {
  paid: "奖励已到账",
  retired: "钱包已重置，这份奖励不再补发",
  saving: "正在保存学习成果…",
  pending: "学习已完成，奖励待领取",
  needsWallet: "开通钱包后即可领取",
  claim: "领取奖励",
  openWallet: "开通钱包并领取",
  unknown: "学习已完成，奖励到账情况还没确认。请查看钱包状态，不需要重新做练习。"
}, Hi = {
  context: "翻看学习资料",
  config: "连接语伴",
  session: "准备学习内容",
  summary: "整理之前聊过的内容",
  provider: "组织回复",
  tools: "整理学习内容",
  save: "保存学习内容",
  action: "准备学习内容"
};
function Gi(e) {
  return `正在${Hi[e.stage]}…`;
}
var iu = Object.freeze({
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
function ct(e) {
  return e.split(/\r?\n/u).filter((f) => f.trim());
}
var zi = {
  class: "learning-complete",
  role: "status",
  "aria-live": "polite"
}, Ki = {
  key: 0,
  class: "learning-complete-burst",
  "aria-hidden": "true"
}, Yi = { class: "learning-complete-title" }, Zi = {
  key: 1,
  class: "learning-complete-amount"
}, Ji = ["disabled"], _i = /* @__PURE__ */ _({
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
  setup(e, { emit: f }) {
    const l = e, n = f, o = I(() => l.state.completions.find((d) => d.unitId === l.unitId)), u = I(() => {
      const d = o.value?.rewardStatus;
      return d === "paid" ? re.paid : d === "retired" ? re.retired : o.value ? l.state.walletOpen ? re.pending : re.needsWallet : re.saving;
    });
    return (d, p) => (t(), i("section", zi, [
      e.quiet ? b("", !0) : (t(), i("div", Ki, [(t(), i(M, null, j(8, ($) => a("span", {
        key: $,
        style: bt({ "--i": $ })
      }, null, 4)), 64))])),
      a("p", Yi, s(e.label), 1),
      o.value?.rewardStatus !== "retired" ? (t(), i("p", Zi, [a("strong", null, s(o.value?.rewardStatus === "paid" ? "+" : "") + s(o.value?.amount ?? e.amount), 1), p[1] || (p[1] = a("span", null, "小白币", -1))])) : b("", !0),
      a("small", null, s(u.value), 1),
      o.value && o.value.rewardStatus !== "paid" && o.value.rewardStatus !== "retired" ? (t(), i("button", {
        key: 2,
        type: "button",
        disabled: e.disabled || e.state.walletStorage !== "ready",
        onClick: p[0] || (p[0] = ($) => n("action", "reward", {
          unitId: e.unitId,
          openWallet: !e.state.walletOpen
        }))
      }, s(e.state.walletOpen ? r(re).claim : r(re).openWallet), 9, Ji)) : b("", !0)
    ]));
  }
}), Bt = _i, Qi = ["aria-labelledby"], Xi = { id: "learning-grading-title" }, el = {
  key: 0,
  class: "learning-grading-actions"
}, tl = {
  key: 0,
  class: "learning-annotation-missing",
  role: "status"
}, al = ["disabled"], nl = ["disabled"], il = ["open", "onToggle"], ll = {
  key: 0,
  class: "learning-revised-text"
}, sl = { class: "learning-write-saved" }, rl = { key: 0 }, ol = {
  key: 1,
  class: "learning-graded-guidance"
}, ul = ["open", "onToggle"], dl = { key: 0 }, vl = { key: 1 }, cl = { key: 3 }, gl = { class: "learning-graded-text" }, ml = { class: "learning-annotation-fixed" }, pl = {
  key: 0,
  class: "learning-annotation-missing"
}, bl = {
  key: 1,
  class: "learning-annotation-fixed"
}, fl = ["onClick"], yl = { class: "learning-annotation-tag" }, kl = {
  key: 0,
  class: "learning-annotation-suggestion"
}, hl = ["onSubmit"], $l = ["onUpdate:modelValue", "aria-label"], wl = ["disabled"], xl = { key: 2 }, Cl = ["onClick"], Il = {
  key: 1,
  class: "learning-working",
  role: "status"
}, Ll = ["disabled"], Sl = ["disabled"], Al = {
  key: 3,
  class: "learning-model-essay"
}, Ml = /* @__PURE__ */ _({
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
  setup(e, { emit: f }) {
    const l = e, n = f, o = {
      content: "内容",
      grammar: "语法",
      vocabulary: "词汇",
      cohesion: "衔接"
    }, u = {
      error: "需要改",
      improve: "可以更好",
      alternative: "另一种说法"
    }, d = {
      grammar: "语法本",
      vocabulary: "生词本"
    }, p = {
      title: "看看哪里能写得更好",
      unplaced: "这处改动还没写进作文。请调整后再提交，或跳过修改。"
    }, $ = (O) => O.itemId && (O.category === "grammar" || O.category === "vocabulary") ? d[O.category] : null, h = he(() => l.unit.id), m = I(() => h.value.edits), w = I(() => l.unit.stage.stage), k = I(() => new Map(l.unit.materials.flatMap((O) => O.paragraphs).map((O, B) => [O.id, B + 1]))), g = (O) => O?.answer.kind === "text" ? O.answer.text : "", v = I(() => l.unit.stage.exercises.flatMap((O) => {
      const B = l.unit.exercises.find((ee) => ee.id === O.exerciseId), L = l.unit.attempts.find((ee) => ee.id === O.draftAttemptId);
      if (!B || !L) return [];
      const U = l.unit.assessments.find((ee) => ee.attemptId === L.id), R = l.unit.attempts.find((ee) => ee.id === O.revisionAttemptId), Q = R && l.unit.assessments.find((ee) => ee.attemptId === R.id), le = U?.annotations ?? [];
      return [{
        row: O,
        exercise: B,
        draft: L,
        assessment: U,
        revision: R,
        review: Q,
        annotations: le,
        label: B.paragraphId ? `第 ${k.value.get(B.paragraphId) ?? "?"} 段总结` : "作文",
        paragraphs: ct(g(L)).map((ee, ce) => ({
          index: ce,
          segments: hn(ee, le.filter((ge) => ge.paragraphIndex === ce)),
          annotations: le.filter((ge) => ge.paragraphIndex === ce)
        })),
        resolved: new Set(Q?.resolvedAnnotationIds ?? [])
      }];
    }).sort((O, B) => +(B.annotations.length > 0) - +(O.annotations.length > 0))), c = (O) => w.value === "revising" && O.row.status === "revising", x = (O, B) => c(O) && B.severity !== "alternative";
    z(v, (O) => {
      for (const B of O.flatMap((L) => L.annotations)) m.value[B.id] ??= {
        value: B.quote,
        done: !1
      };
    }, { immediate: !0 });
    function K(O) {
      const B = m.value[O.id];
      B?.value.trim() && B.value !== O.quote && (B.done = !0);
    }
    const E = I(() => new Map(v.value.filter(c).map((O) => [O.draft.id, kn(g(O.draft), O.annotations.map((B) => ({
      id: B.id,
      paragraphIndex: B.paragraphIndex,
      quote: B.quote,
      replacement: m.value[B.id]?.done ? m.value[B.id].value : B.quote
    })))]))), T = I(() => new Set([...E.value.values()].flatMap((O) => O.missing))), S = I(() => [...E.value.values()].reduce((O, B) => O + B.applied.length, 0)), q = H("");
    z(S, () => {
      q.value = "";
    });
    const V = I(() => v.value.filter(c).flatMap((O) => O.annotations.filter((B) => B.severity !== "alternative")).length), D = (O, B) => {
      const L = O.annotations.find((U) => U.id === B);
      return L ? ["learning-mark", `is-${L.severity}`] : "";
    };
    function N() {
      const O = v.value.filter(c).flatMap((B) => {
        const L = E.value.get(B.draft.id);
        return !L || L.text === g(B.draft) ? [] : [{
          attemptId: B.draft.id,
          text: L.text
        }];
      });
      O.length ? n("action", "submit-revision", {
        unitId: l.unit.id,
        revisions: O
      }) : q.value = p.unplaced;
    }
    const W = I(() => l.state.pending?.unitId === l.unit.id ? l.state.pending.purpose : null);
    return (O, B) => (t(), i("section", {
      class: "learning-grading",
      "aria-labelledby": e.view === "feedback" ? "learning-grading-title" : void 0
    }, [
      e.view === "feedback" ? (t(), i(M, { key: 0 }, [
        a("h2", Xi, s(p.title), 1),
        w.value === "revising" ? (t(), i("div", el, [
          a("small", null, "已改 " + s(S.value) + " / " + s(V.value) + " 处", 1),
          q.value ? (t(), i("small", tl, s(q.value), 1)) : b("", !0),
          a("button", {
            type: "button",
            disabled: e.disabled,
            onClick: B[0] || (B[0] = (L) => n("confirm", "skip-revision", { unitId: e.unit.id }, "跳过这次修改？批注会保留，直接进入范文。"))
          }, "跳过修改", 8, al),
          a("button", {
            type: "button",
            class: "learning-primary",
            disabled: e.disabled || !S.value,
            onClick: N
          }, "提交修改", 8, nl)
        ])) : b("", !0),
        (t(!0), i(M, null, j(v.value, (L) => (t(), i("details", {
          key: L.exercise.id,
          class: "learning-graded",
          open: r(h).expanded[`grading:${L.draft.id}`] ?? L.annotations.length > 0,
          onToggle: (U) => r(h).expanded[`grading:${L.draft.id}`] = U.target.open
        }, [
          a("summary", null, [a("h3", null, s(L.label), 1)]),
          L.revision ? (t(), i("section", ll, [
            a("h4", null, s(r(J).revision), 1),
            a("p", sl, s(g(L.revision)), 1),
            L.review?.guidance ? (t(), i("p", rl, s(L.review.guidance), 1)) : b("", !0)
          ])) : b("", !0),
          L.assessment?.guidance ? (t(), i("p", ol, s(L.assessment.guidance), 1)) : b("", !0),
          L.assessment && (L.assessment.understanding || L.assessment.expression) ? (t(), i("details", {
            key: 2,
            class: "learning-graded-more",
            open: r(h).expanded[`feedback:${L.draft.id}`],
            onToggle: (U) => r(h).expanded[`feedback:${L.draft.id}`] = U.target.open
          }, [
            B[6] || (B[6] = a("summary", null, "理解与表达点评", -1)),
            L.assessment.understanding ? (t(), i("p", dl, [B[4] || (B[4] = a("b", null, "理解", -1)), F(s(L.assessment.understanding), 1)])) : b("", !0),
            L.assessment.expression ? (t(), i("p", vl, [B[5] || (B[5] = a("b", null, "表达", -1)), F(s(L.assessment.expression), 1)])) : b("", !0)
          ], 40, ul)) : b("", !0),
          L.revision ? (t(), i("h4", cl, s(r(J).original), 1)) : b("", !0),
          (t(!0), i(M, null, j(L.paragraphs, (U) => (t(), i("div", {
            key: U.index,
            class: "learning-graded-paragraph"
          }, [a("p", gl, [(t(!0), i(M, null, j(U.segments, (R, Q) => (t(), i(M, { key: Q }, [R.id ? (t(), i("mark", {
            key: 0,
            class: ne(D(L, R.id))
          }, s(R.text), 3)) : (t(), i(M, { key: 1 }, [F(s(R.text), 1)], 64))], 64))), 128))]), (t(!0), i(M, null, j(U.annotations, (R) => (t(), i("div", {
            key: R.id,
            class: ne(["learning-annotation", [`is-${R.severity}`, {
              "is-fixed": L.resolved.has(R.id),
              "is-edited": m.value[R.id]?.done && c(L)
            }]])
          }, [L.resolved.has(R.id) ? (t(), i(M, { key: 0 }, [a("p", ml, "✓ " + s(r(J).resolved), 1), a("p", null, s(R.explanation), 1)], 64)) : m.value[R.id]?.done && c(L) ? (t(), i(M, { key: 1 }, [T.value.has(R.id) ? (t(), i("p", pl, "原文里找不到“" + s(R.quote) + "”，这处改动不会写进修改稿。", 1)) : (t(), i("p", bl, "✓ 改为“" + s(m.value[R.id].value) + "”", 1)), a("button", {
            type: "button",
            onClick: (Q) => m.value[R.id].done = !1
          }, "再改", 8, fl)], 64)) : (t(), i(M, { key: 2 }, [
            a("p", yl, [a("span", null, s(u[R.severity]), 1), F(s(o[R.category]), 1)]),
            a("p", null, s(R.explanation), 1),
            R.suggestion ? (t(), i("p", kl, "可以写成：" + s(R.suggestion), 1)) : b("", !0),
            x(L, R) && m.value[R.id] ? (t(), i("form", {
              key: 1,
              class: "learning-annotation-edit",
              onSubmit: ae((Q) => K(R), ["prevent"])
            }, [X(a("textarea", {
              "onUpdate:modelValue": (Q) => m.value[R.id].value = Q,
              rows: "2",
              "aria-label": `改写：${R.quote}`,
              maxlength: "600"
            }, null, 8, $l), [[ie, m.value[R.id].value], [r(Be), m.value[R.id]]]), a("button", {
              type: "submit",
              disabled: !m.value[R.id].value.trim() || m.value[R.id].value === R.quote
            }, "改好了", 8, wl)], 40, hl)) : L.review && R.severity !== "alternative" ? (t(), i("small", xl, "复核时这里还没改到")) : b("", !0)
          ], 64)), $(R) ? (t(), i("button", {
            key: 3,
            type: "button",
            class: "learning-annotation-book",
            onClick: (Q) => n("record", R.itemId)
          }, s($(R)) + " ↗", 9, Cl)) : b("", !0)], 2))), 128))]))), 128))
        ], 40, il))), 128))
      ], 64)) : b("", !0),
      [
        "grading",
        "reviewing",
        "model"
      ].includes(w.value) ? (t(), i("div", Il, [W.value ? (t(), i(M, { key: 0 }, [
        B[7] || (B[7] = a("span", {
          class: "learning-working-dot",
          "aria-hidden": "true"
        }, null, -1)),
        a("span", null, s(W.value === "grade" ? r(J).grading : W.value === "revision-review" ? r(J).reviewing : r(J).modelling), 1),
        a("button", {
          type: "button",
          disabled: e.pending,
          onClick: B[1] || (B[1] = (L) => n("action", "cancel"))
        }, s(r(J).stop), 9, Ll)
      ], 64)) : (t(), i("button", {
        key: 1,
        type: "button",
        class: "learning-primary",
        disabled: e.disabled,
        onClick: B[2] || (B[2] = (L) => n("action", "grade", { unitId: e.unit.id }))
      }, s(w.value === "grading" ? r(J).grade : r(J).continue), 9, Sl))])) : b("", !0),
      e.view === "model" && w.value === "complete" ? (t(), Y(Bt, {
        key: 2,
        state: e.state,
        "unit-id": e.unit.id,
        amount: e.unit.reward.amount,
        label: "本篇完成",
        disabled: e.disabled,
        onAction: B[3] || (B[3] = (L, U) => n("action", L, U))
      }, null, 8, [
        "state",
        "unit-id",
        "amount",
        "disabled"
      ])) : b("", !0),
      e.view === "model" && e.unit.modelEssay ? (t(), i("section", Al, [a("h3", null, [B[8] || (B[8] = F("范文", -1)), a("small", null, s(e.unit.modelEssay.level), 1)]), (t(!0), i(M, null, j(r(ct)(e.unit.modelEssay.text), (L, U) => (t(), i("p", { key: U }, s(L), 1))), 128))])) : b("", !0)
    ], 8, Qi));
  }
}), Rl = Ml, Tl = ["data-exercise-id"], Bl = { class: "learning-write-label" }, El = [
  "aria-label",
  "placeholder",
  "rows",
  "onKeydown"
], Nl = { class: "learning-write-foot" }, Ol = { "aria-live": "polite" }, ql = ["disabled"], Vl = { class: "learning-write-saved" }, Ul = { class: "learning-write-foot" }, Dl = ["disabled"], jl = /* @__PURE__ */ _({
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
  setup(e, { emit: f }) {
    const l = e, n = f, o = he(() => l.unit.id);
    z([o, () => l.exercise.id], () => {
      o.value.writing[l.exercise.id] ??= {
        text: "",
        rewriting: !1,
        submitted: null
      };
    }, { immediate: !0 });
    const u = I(() => o.value.writing[l.exercise.id]), d = I({
      get: () => u.value.text,
      set: (E) => {
        u.value.text = E;
      }
    }), p = I({
      get: () => u.value.rewriting,
      set: (E) => {
        u.value.rewriting = E;
      }
    }), $ = I(() => l.unit.attempts.filter((E) => E.exerciseId === l.exercise.id && E.revisesAttemptId === void 0).at(-1)), h = I(() => l.unit.assessments.some((E) => E.attemptId === $.value?.id && E.verdict !== "disputed")), m = I(() => $.value?.answer.kind === "text" ? $.value.answer.text : ""), w = I(() => !$.value || p.value), k = I(() => ["writing", "grading"].includes(l.unit.stage.stage) && !h.value && !l.state.pending), g = I(() => ut(d.value, l.state.language)), v = I(() => ut(m.value, l.state.language)), c = I(() => l.state.conversation.summaryReviews.find((E) => E.attemptId === $.value?.id)?.text ?? "");
    function x() {
      l.disabled || !d.value.trim() || (u.value.submitted = {
        before: $.value?.id,
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
    function K() {
      d.value = m.value, p.value = !0;
    }
    return (E, T) => (t(), i("div", {
      class: ne(["learning-write", `is-${e.tone ?? "summary"}`]),
      "data-exercise-id": e.exercise.id
    }, [
      a("p", Bl, s(e.label), 1),
      w.value ? (t(), i("form", {
        key: 0,
        onSubmit: ae(x, ["prevent"])
      }, [X(a("textarea", {
        "onUpdate:modelValue": T[0] || (T[0] = (S) => d.value = S),
        "aria-label": e.label,
        placeholder: e.placeholder,
        maxlength: "4000",
        rows: e.tone === "essay" ? 8 : 3,
        onKeydown: [pe(ae(x, ["ctrl", "prevent"]), ["enter"]), pe(ae(x, ["meta", "prevent"]), ["enter"])]
      }, null, 40, El), [[ie, d.value], [r(Be), u.value]]), a("div", Nl, [
        a("small", Ol, s(g.value.count) + " " + s(g.value.unit), 1),
        p.value ? (t(), i("button", {
          key: 0,
          type: "button",
          onClick: T[1] || (T[1] = (S) => {
            p.value = !1, d.value = "";
          })
        }, "取消")) : b("", !0),
        a("button", {
          type: "submit",
          class: "learning-primary",
          disabled: e.disabled || !d.value.trim()
        }, s($.value ? "保存新稿" : "提交"), 9, ql)
      ])], 32)) : $.value ? (t(), i(M, { key: 1 }, [a("p", Vl, s(m.value), 1), a("div", Ul, [a("small", null, "已保存 · " + s(v.value.count) + " " + s(v.value.unit), 1), k.value ? (t(), i("button", {
        key: 0,
        type: "button",
        disabled: e.disabled,
        onClick: K
      }, "重写", 8, Dl)) : b("", !0)])], 64)) : b("", !0),
      c.value ? (t(), Y(We, {
        key: 2,
        class: "learning-markdown learning-write-reply",
        text: c.value
      }, null, 8, ["text"])) : b("", !0)
    ], 10, Tl));
  }
}), Et = jl, Pl = ["data-paragraph-id", "data-material-id"], Wl = { class: "learning-reading-text" }, Fl = {
  class: "learning-reading-number",
  "aria-hidden": "true"
}, Hl = ["data-material-id", "data-paragraph-id"], Gl = ["disabled"], zl = ["open"], Kl = { key: 0 }, Yl = { class: "learning-knowledge-text" }, Zl = {
  key: 0,
  class: "learning-terms"
}, Jl = [
  "disabled",
  "aria-pressed",
  "onClick"
], _l = /* @__PURE__ */ _({
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
  setup(e, { emit: f }) {
    const l = e, n = f, o = I(() => l.unit.explanations.find((k) => k.materialId === l.materialId && k.paragraphId === l.paragraph.id)), u = I(() => l.unit.exercises.find((k) => k.paragraphId === l.paragraph.id)), d = I(() => new Set(l.state.savedTerms)), p = (k) => d.value.has(k), $ = he(() => l.unit.id), h = I(() => `knowledge:${l.materialId}:${l.paragraph.id}`), m = I(() => $.value.selection?.materialId === l.materialId && $.value.selection.paragraphId === l.paragraph.id ? $.value.selection : null);
    function w() {
      $.value.selection = {
        materialId: l.materialId,
        paragraphId: l.paragraph.id,
        start: 0,
        end: l.paragraph.text.length,
        quote: l.paragraph.text
      };
    }
    return (k, g) => (t(), i("section", {
      class: "learning-reading-paragraph",
      "data-paragraph-id": e.paragraph.id,
      "data-material-id": e.materialId
    }, [
      a("p", Wl, [a("span", Fl, s(e.number), 1), a("span", {
        "data-learning-text": "",
        "data-material-id": e.materialId,
        "data-paragraph-id": e.paragraph.id
      }, s(e.paragraph.text), 9, Hl)]),
      a("button", {
        type: "button",
        class: "learning-paragraph-quote",
        disabled: [...e.paragraph.text].length > r(kt),
        onClick: w
      }, s(r(xe).select), 9, Gl),
      m.value ? (t(), Y(Lt, {
        key: 0,
        selection: m.value,
        disabled: e.disabled,
        onAsk: g[0] || (g[0] = (v) => n("ask", u.value?.id, m.value)),
        onSay: g[1] || (g[1] = (v) => n("action", "say", { selection: m.value })),
        onDismiss: g[2] || (g[2] = (v) => r($).selection = null)
      }, null, 8, ["selection", "disabled"])) : b("", !0),
      o.value ? (t(), i("details", {
        key: 1,
        class: "learning-knowledge",
        open: r($).expanded[h.value],
        onToggle: g[3] || (g[3] = (v) => r($).expanded[h.value] = v.target.open)
      }, [
        a("summary", null, [g[5] || (g[5] = F("本段知识", -1)), o.value.terms.length ? (t(), i("span", Kl, " · " + s(o.value.terms.length) + " 个词语", 1)) : b("", !0)]),
        a("p", Yl, s(o.value.explanation), 1),
        o.value.terms.length ? (t(), i("ul", Zl, [(t(!0), i(M, null, j(o.value.terms, (v) => (t(), i("li", { key: v.text }, [a("span", null, [a("strong", null, s(v.text), 1), a("small", null, s(v.note), 1)]), a("button", {
          type: "button",
          disabled: e.disabled || p(v.text),
          "aria-pressed": p(v.text),
          onClick: (c) => n("action", "bookmark", {
            unitId: e.unit.id,
            materialId: e.materialId,
            paragraphId: e.paragraph.id,
            termText: v.text
          })
        }, s(p(v.text) ? "已收藏" : "收藏"), 9, Jl)]))), 128))])) : b("", !0)
      ], 40, zl)) : b("", !0),
      u.value ? (t(), Y(Et, {
        key: 2,
        state: e.state,
        unit: e.unit,
        exercise: u.value,
        disabled: e.disabled,
        label: "用你的话概括这一段",
        placeholder: "写下这段的大意，不必逐句翻译",
        onAction: g[4] || (g[4] = (v, c) => n("action", v, c))
      }, null, 8, [
        "state",
        "unit",
        "exercise",
        "disabled"
      ])) : b("", !0)
    ], 8, Pl));
  }
}), Ql = _l, Xl = ["aria-label"], es = [
  "aria-current",
  "disabled",
  "onClick"
], ts = { class: "learning-reading-head" }, as = ["open"], ns = { key: 0 }, is = { class: "learning-source" }, ls = ["href"], ss = {
  key: 0,
  class: "learning-essay"
}, rs = { class: "learning-essay-prompt" }, os = ["aria-label"], us = ["aria-current"], ds = {
  key: 1,
  class: "learning-stage-bar is-writing"
}, vs = {
  key: 2,
  class: "learning-stage-bar"
}, cs = ["disabled"], gs = ["disabled"], ms = /* @__PURE__ */ _({
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
  setup(e, { emit: f }) {
    const l = e, n = f, o = H(null), u = he(() => l.unit.id);
    ht(o, () => l.unit.materials, (E) => {
      u.value.selection = E;
    });
    const d = I(() => l.unit.stage.stage), p = I(() => {
      if (d.value === "writing") return "reading";
      const E = u.value.reading.view;
      return E === "model" && ![
        "reviewing",
        "model",
        "complete"
      ].includes(d.value) ? "feedback" : E ?? (d.value === "complete" ? "model" : d.value === "grading" ? "reading" : "feedback");
    }), $ = [
      "reading",
      "feedback",
      "model"
    ];
    async function h(E) {
      const T = o.value?.closest(".learning-scroll");
      T && (u.value.reading.scrolls[p.value] = T.scrollTop), u.value.reading.view = E, await oe(), T && (T.scrollTop = u.value.reading.scrolls[E] ?? 0);
    }
    const m = [
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
    })[d.value] ?? 0), k = I(() => l.unit.exercises.find((E) => !E.paragraphId)), g = I(() => l.unit.stage.exercises.filter((E) => E.status === "writing").map((E) => E.exerciseId)), v = {
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
    }, c = I(() => {
      let E = 0;
      return l.unit.materials.map((T) => ({
        material: T,
        paragraphs: T.paragraphs.map((S) => ({
          paragraph: S,
          number: ++E
        }))
      }));
    }), x = (E, T) => n("action", E, T);
    function K(E) {
      const T = o.value?.querySelector(`[data-exercise-id="${CSS.escape(E)}"]`);
      T?.scrollIntoView({
        block: "center",
        behavior: matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth"
      }), T?.querySelector("textarea, button")?.focus({ preventScroll: !0 });
    }
    return (E, T) => (t(), i("article", {
      ref_key: "root",
      ref: o,
      class: "learning-reading"
    }, [
      d.value !== "writing" ? (t(), i("nav", {
        key: 0,
        class: "learning-reading-nav",
        "aria-label": r(J).navigation
      }, [(t(), i(M, null, j($, (S) => a("button", {
        key: S,
        type: "button",
        "aria-current": p.value === S ? "page" : void 0,
        disabled: S === "model" && ![
          "reviewing",
          "model",
          "complete"
        ].includes(d.value),
        onClick: (q) => h(S)
      }, s(r(J)[S]), 9, es)), 64))], 8, Xl)) : b("", !0),
      p.value === "reading" ? (t(), i(M, { key: 1 }, [
        a("header", ts, [a("details", {
          class: "learning-reading-goal",
          open: r(u).expanded.goal,
          onToggle: T[0] || (T[0] = (S) => r(u).expanded.goal = S.target.open)
        }, [
          a("summary", null, s(v.goal), 1),
          a("strong", null, s(e.unit.title), 1),
          e.unit.goal ? (t(), i("p", ns, s(e.unit.goal), 1)) : b("", !0)
        ], 40, as), P(Tt, { name: e.state.teacher?.name }, null, 8, ["name"])]),
        (t(!0), i(M, null, j(c.value, (S, q) => (t(), i("section", {
          key: S.material.id,
          class: "learning-reading-material"
        }, [
          (t(), Y(Gt(q === 0 ? "h1" : "h2"), { tabindex: "-1" }, {
            default: Pt(() => [F(s(S.material.title), 1)]),
            _: 2
          }, 1024)),
          a("p", is, [S.material.provenance.kind === "authored" ? (t(), i(M, { key: 0 }, [F(s(v.authored), 1)], 64)) : (t(), i(M, { key: 1 }, [F(s(S.material.provenance.kind === "adapted" ? v.adapted : v.original) + " ", 1), a("a", {
            href: S.material.provenance.url,
            target: "_blank",
            rel: "noopener noreferrer"
          }, s(S.material.provenance.title), 9, ls)], 64))]),
          (t(!0), i(M, null, j(S.paragraphs, (V) => (t(), Y(Ql, {
            key: V.paragraph.id,
            state: e.state,
            unit: e.unit,
            "material-id": S.material.id,
            paragraph: V.paragraph,
            number: V.number,
            disabled: e.disabled,
            onAction: x,
            onAsk: T[1] || (T[1] = (D, N) => n("ask", D, N))
          }, null, 8, [
            "state",
            "unit",
            "material-id",
            "paragraph",
            "number",
            "disabled"
          ]))), 128))
        ]))), 128)),
        k.value ? (t(), i("section", ss, [
          a("h2", null, s(v.essay), 1),
          a("p", rs, s(k.value.prompt), 1),
          P(Et, {
            state: e.state,
            unit: e.unit,
            exercise: k.value,
            disabled: e.disabled,
            label: v.essayLabel,
            placeholder: v.essayPlaceholder,
            tone: "essay",
            onAction: x
          }, null, 8, [
            "state",
            "unit",
            "exercise",
            "disabled",
            "label",
            "placeholder"
          ])
        ])) : b("", !0),
        a("ol", {
          class: "learning-steps",
          "aria-label": v.progress
        }, [(t(), i(M, null, j(m, ([S, q], V) => a("li", {
          key: S,
          class: ne({
            "is-done": V < w.value,
            "is-current": V === w.value
          }),
          "aria-current": V === w.value ? "step" : void 0
        }, s(q), 11, us)), 64))], 8, os),
        d.value === "writing" ? (t(), i("div", ds, [a("span", null, s(v.written) + " " + s(e.unit.stage.exercises.length - g.value.length) + " / " + s(e.unit.stage.exercises.length), 1), a("button", {
          type: "button",
          onClick: T[2] || (T[2] = (S) => K(g.value[0]))
        }, s(v.next), 1)])) : d.value === "grading" ? (t(), i("div", vs, [e.state.pending?.purpose === "grade" ? (t(), i(M, { key: 0 }, [
          T[9] || (T[9] = a("span", {
            class: "learning-working-dot",
            "aria-hidden": "true"
          }, null, -1)),
          a("span", null, s(r(J).grading), 1),
          a("button", {
            type: "button",
            disabled: e.pending,
            onClick: T[3] || (T[3] = (S) => n("action", "cancel"))
          }, s(r(J).stop), 9, cs)
        ], 64)) : (t(), i(M, { key: 1 }, [a("span", null, s(r(J).gradeReady), 1), a("button", {
          type: "button",
          class: "learning-primary",
          disabled: e.disabled,
          onClick: T[4] || (T[4] = (S) => n("action", "grade", { unitId: e.unit.id }))
        }, s(r(J).grade), 9, gs)], 64))])) : (t(), i("button", {
          key: 3,
          type: "button",
          class: "learning-primary",
          onClick: T[5] || (T[5] = (S) => h("feedback"))
        }, s(r(J).feedback), 1))
      ], 64)) : (t(), Y(Rl, {
        key: 2,
        view: p.value,
        state: e.state,
        unit: e.unit,
        disabled: e.disabled,
        pending: e.pending,
        onAction: x,
        onConfirm: T[6] || (T[6] = (S, q, V) => n("confirm", S, q, V)),
        onRecord: T[7] || (T[7] = (S) => n("record", S))
      }, null, 8, [
        "view",
        "state",
        "unit",
        "disabled",
        "pending"
      ])),
      p.value === "feedback" && d.value === "complete" ? (t(), i("button", {
        key: 3,
        type: "button",
        class: "learning-primary",
        onClick: T[8] || (T[8] = (S) => h("model"))
      }, s(r(J).viewModel), 1)) : b("", !0)
    ], 512));
  }
}), ps = ms, bs = {
  class: "learning-review",
  "aria-labelledby": "learning-review-title"
}, fs = { class: "learning-review-head" }, ys = { class: "learning-muted" }, ks = ["disabled"], hs = {
  class: "learning-review-dots",
  "aria-label": "复习卡片"
}, $s = [
  "aria-label",
  "aria-current",
  "onClick"
], ws = { class: "learning-eyebrow" }, xs = { class: "learning-card-verdict" }, Cs = { key: 0 }, Is = { key: 1 }, Ls = {
  key: 1,
  class: "learning-working",
  role: "status"
}, Ss = ["disabled"], As = ["disabled"], Ms = ["disabled"], Rs = {
  key: 2,
  class: "learning-row"
}, Ts = { class: "learning-review-results" }, Bs = ["aria-expanded", "onClick"], Es = {
  key: 1,
  class: "learning-chip-reason"
}, Ns = /* @__PURE__ */ _({
  __name: "LearningReview",
  props: {
    state: {},
    review: {},
    disabled: { type: Boolean },
    pending: { type: Boolean }
  },
  emits: ["action", "confirm"],
  setup(e, { emit: f }) {
    const l = e, n = f, o = {
      correct: "答对了",
      partial: "对了一部分",
      incorrect: "还没想起来",
      disputed: "等待复核"
    }, u = {
      answer: "你的作答",
      saved: "已保存，答完这组再一起看看。",
      ready: "这组答完了",
      grade: "批改这组"
    }, d = I(() => l.review.stage.stage), p = (L) => l.review.attempts.filter((U) => U.exerciseId === L).at(-1), $ = () => Math.max(0, l.review.exercises.findIndex((L) => !p(L.id))), h = he(() => l.review.id), m = I(() => h.value.review), w = I({
      get: () => m.value.index ?? $(),
      set: (L) => {
        m.value.index = L;
      }
    }), k = I(() => l.review.exercises[w.value]), g = I(() => k.value && p(k.value.id)), v = I(() => l.review.assessments.find((L) => L.attemptId === g.value?.id)), c = I(() => l.review.materials.flatMap((L) => L.paragraphs)), x = I(() => m.value.drafts);
    z(k, (L) => {
      L && !x.value[L.id] && (x.value[L.id] = Te(L.response));
    }, { immediate: !0 });
    const K = I({
      get: () => x.value[k.value.id],
      set: (L) => {
        x.value[k.value.id] = L;
      }
    }), E = I(() => l.review.exercises.filter((L) => p(L.id)).length), T = I({
      get: () => m.value.openReason,
      set: (L) => {
        m.value.openReason = L;
      }
    });
    function S(L) {
      n("action", "submit", {
        unitId: l.review.id,
        exerciseId: k.value.id,
        answer: L
      });
    }
    function q() {
      const L = l.review.exercises.findIndex((U) => !p(U.id));
      L >= 0 && (w.value = L);
    }
    const V = I(() => l.state.completions.find((L) => L.unitId === l.review.id)), D = I(() => V.value?.rewardStatus === "paid" || V.value?.rewardStatus === "retired");
    z(m, (L) => {
      L.seenBefore ??= d.value === "complete" && dt.has(l.review.id);
    }, { immediate: !0 });
    const N = I(() => m.value.seenBefore ?? !1), W = I({
      get: () => m.value.expanded,
      set: (L) => {
        m.value.expanded = L;
      }
    });
    z([d, () => l.review.id], ([L, U]) => {
      L === "complete" && dt.mark(U);
    }, { immediate: !0 });
    const O = I(() => N.value && D.value && !W.value), B = (L) => [...l.state.books.grammar, ...l.state.books.vocabulary].find((U) => U.id === L);
    return (L, U) => (t(), i("section", bs, [
      a("header", fs, [
        U[7] || (U[7] = a("h2", { id: "learning-review-title" }, "今日复习", -1)),
        a("span", ys, s(E.value) + " / " + s(e.review.exercises.length), 1),
        d.value === "answering" ? (t(), i("button", {
          key: 0,
          type: "button",
          disabled: e.disabled,
          onClick: U[0] || (U[0] = (R) => n("confirm", "abandon-review", {}, r(Ce).review))
        }, "放下", 8, ks)) : b("", !0)
      ]),
      a("nav", hs, [(t(!0), i(M, null, j(e.review.exercises, (R, Q) => (t(), i("button", {
        key: R.id,
        type: "button",
        "aria-label": `第 ${Q + 1} 张`,
        "aria-current": Q === w.value,
        class: ne({ "is-answered": !!p(R.id) }),
        onClick: (le) => w.value = Q
      }, null, 10, $s))), 128))]),
      d.value !== "complete" && k.value ? (t(), i("div", {
        key: `${k.value.id}:${g.value ? "back" : "front"}`,
        class: ne(["learning-card", { "is-back": !!g.value }])
      }, [
        a("p", ws, s(g.value ? u.answer : `第 ${w.value + 1} 张`), 1),
        a("h3", null, s(k.value.prompt), 1),
        g.value ? (t(), i(M, { key: 1 }, [
          a("blockquote", null, s(r(Fe)(g.value.answer, k.value.response, c.value)), 1),
          v.value ? (t(), i(M, { key: 0 }, [a("p", xs, s(o[v.value.verdict]), 1), v.value.guidance ? (t(), i("p", Cs, s(v.value.guidance), 1)) : b("", !0)], 64)) : (t(), i("small", Is, s(u.saved), 1)),
          E.value < e.review.exercises.length ? (t(), i("button", {
            key: 2,
            type: "button",
            class: "learning-primary",
            onClick: q
          }, "下一张")) : b("", !0)
        ], 64)) : (t(), Y(yt, {
          key: 0,
          modelValue: K.value,
          "onUpdate:modelValue": U[1] || (U[1] = (R) => K.value = R),
          response: k.value.response,
          paragraphs: c.value,
          disabled: e.disabled,
          onSubmit: S
        }, null, 8, [
          "modelValue",
          "response",
          "paragraphs",
          "disabled"
        ]))
      ], 2)) : b("", !0),
      d.value === "grading" ? (t(), i("div", Ls, [e.state.pending?.purpose === "review-assess" ? (t(), i(M, { key: 0 }, [
        U[8] || (U[8] = a("span", {
          class: "learning-working-dot",
          "aria-hidden": "true"
        }, null, -1)),
        U[9] || (U[9] = a("span", null, "正在批改这组复习…", -1)),
        a("button", {
          type: "button",
          disabled: e.pending,
          onClick: U[2] || (U[2] = (R) => n("action", "cancel"))
        }, "停止", 8, Ss)
      ], 64)) : (t(), i(M, { key: 1 }, [
        a("span", null, s(u.ready), 1),
        a("button", {
          type: "button",
          disabled: e.disabled,
          onClick: U[3] || (U[3] = (R) => n("confirm", "abandon-review", {}, r(Ce).review))
        }, "放下", 8, As),
        a("button", {
          type: "button",
          disabled: e.disabled,
          onClick: U[4] || (U[4] = (R) => n("action", "grade", { unitId: e.review.id }))
        }, s(u.grade), 9, Ms)
      ], 64))])) : b("", !0),
      d.value === "complete" && O.value ? (t(), i("div", Rs, [U[10] || (U[10] = a("span", { class: "learning-muted" }, "这组复习已完成", -1)), a("button", {
        type: "button",
        "aria-expanded": !1,
        onClick: U[5] || (U[5] = (R) => W.value = !0)
      }, "查看结果")])) : d.value === "complete" ? (t(), i(M, { key: 3 }, [a("ul", Ts, [(t(!0), i(M, null, j(e.review.exercises, (R) => (t(), i("li", { key: R.id }, [
        a("span", null, [a("strong", null, s(B(R.itemId)?.label ?? R.prompt), 1), a("small", null, s(o[e.review.assessments.find((Q) => Q.attemptId === p(R.id)?.id)?.verdict ?? "disputed"]), 1)]),
        B(R.itemId)?.nextReviewAt ? (t(), i("button", {
          key: 0,
          type: "button",
          class: "learning-chip",
          "aria-expanded": T.value === R.id,
          onClick: (Q) => T.value = T.value === R.id ? "" : R.id
        }, s(r(He)(B(R.itemId).nextReviewAt)), 9, Bs)) : b("", !0),
        T.value === R.id ? (t(), i("small", Es, s(B(R.itemId)?.scheduleReason), 1)) : b("", !0)
      ]))), 128))]), P(Bt, {
        state: e.state,
        "unit-id": e.review.id,
        amount: e.review.reward.amount,
        label: "复习完成",
        disabled: e.disabled,
        quiet: N.value,
        onAction: U[6] || (U[6] = (R, Q) => n("action", R, Q))
      }, null, 8, [
        "state",
        "unit-id",
        "amount",
        "disabled",
        "quiet"
      ])], 64)) : b("", !0)
    ]));
  }
}), Os = Ns, qs = { class: "learning-workbench" }, Vs = {
  key: 0,
  class: "learning-due"
}, Us = {
  key: 0,
  class: "learning-working",
  role: "status"
}, Ds = ["disabled"], js = ["disabled"], Ps = {
  key: 1,
  class: "learning-row"
}, Ws = ["disabled"], Fs = {
  key: 4,
  class: "learning-lesson"
}, Hs = { class: "learning-eyebrow" }, Gs = { tabindex: "-1" }, zs = {
  key: 0,
  class: "learning-muted"
}, Ks = ["onClick"], Ys = ["onClick"], Zs = { class: "learning-row" }, Js = ["disabled"], _s = {
  key: 5,
  class: "learning-start"
}, Qs = ["disabled"], Xs = {
  key: 0,
  tabindex: "-1"
}, er = { key: 1 }, tr = ["aria-label"], ar = { class: "learning-start-reading" }, nr = ["disabled"], ir = ["disabled"], lr = /* @__PURE__ */ _({
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
  setup(e, { emit: f }) {
    const l = e, n = f, o = I(() => !!l.state.review && l.state.review.stage.stage !== "complete"), u = I(() => l.state.unit), d = I(() => l.state.busy && !l.state.pending), p = {
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
    }, $ = I(() => [
      new Intl.DisplayNames(["zh-CN"], { type: "language" }).of(l.state.language),
      l.state.profile?.settings.exam,
      [l.state.profile?.settings.level, l.state.profile?.settings.targetLevel].filter(Boolean).join(" → ")
    ].filter(Boolean).join(" · "));
    function h(k) {
      n("action", "prepare", {
        kind: k,
        message: k === "reading-writing" ? "请按我的训练设置准备一篇读写训练。" : "请按我现在的情况准备一节专项小课。"
      });
    }
    const m = (k, g) => n("action", k, g), w = (k, g, v) => n("confirm", k, g, v);
    return (k, g) => (t(), i("div", qs, [
      e.state.dueCount && !o.value ? (t(), i("div", Vs, [a("span", null, s(r(Ct)(e.state.dueCount)), 1), e.state.pending?.purpose === "review-prepare" ? (t(), i("span", Us, [
        g[12] || (g[12] = a("span", {
          class: "learning-working-dot",
          "aria-hidden": "true"
        }, null, -1)),
        g[13] || (g[13] = a("span", null, "正在出题…", -1)),
        a("button", {
          type: "button",
          disabled: e.pending,
          onClick: g[0] || (g[0] = (v) => n("action", "cancel"))
        }, "停止", 8, Ds)
      ])) : e.state.blockedReview ? b("", !0) : (t(), i("button", {
        key: 1,
        type: "button",
        class: "learning-primary",
        disabled: e.disabled,
        onClick: g[1] || (g[1] = (v) => n("action", "start-review"))
      }, s(p.review), 9, js))])) : b("", !0),
      e.state.blockedReview ? (t(), i("div", Ps, [g[14] || (g[14] = a("p", { class: "learning-muted" }, "有一组复习在另一个故事中进行。回到那个故事可以接着做；也可以放下它，在这里重新出题。", -1)), a("button", {
        type: "button",
        disabled: e.disabled,
        onClick: g[2] || (g[2] = (v) => w("abandon-review", {}, r(Ce).review))
      }, "放下", 8, Ws)])) : b("", !0),
      e.state.review ? (t(), Y(Os, {
        key: 2,
        state: e.state,
        review: e.state.review,
        disabled: e.disabled,
        pending: e.pending,
        onAction: m,
        onConfirm: w
      }, null, 8, [
        "state",
        "review",
        "disabled",
        "pending"
      ])) : b("", !0),
      u.value?.kind === "reading-writing" ? (t(), Y(ps, {
        key: 3,
        state: e.state,
        unit: u.value,
        disabled: e.disabled,
        pending: e.pending,
        onAction: m,
        onConfirm: w,
        onAsk: g[3] || (g[3] = (v, c) => n("ask", v, c)),
        onRecord: g[4] || (g[4] = (v) => n("record", v))
      }, null, 8, [
        "state",
        "unit",
        "disabled",
        "pending"
      ])) : u.value ? (t(), i("section", Fs, [
        a("p", Hs, "专项小课 · 完成可得 " + s(u.value.reward.amount) + " 小白币", 1),
        a("h1", Gs, s(u.value.title), 1),
        u.value.goal ? (t(), i("p", zs, s(u.value.goal), 1)) : b("", !0),
        (t(!0), i(M, null, j(u.value.materials, (v) => (t(), i("button", {
          key: v.id,
          type: "button",
          class: "learning-activity-link",
          onClick: (c) => n("present", {
            unitId: u.value.id,
            kind: "material",
            id: v.id,
            title: v.title
          })
        }, [
          P(G, { name: "book" }),
          a("span", null, s(v.title), 1),
          P(G, { name: "arrow" })
        ], 8, Ks))), 128)),
        (t(!0), i(M, null, j(u.value.exercises, (v) => (t(), i("button", {
          key: v.id,
          type: "button",
          class: "learning-activity-link",
          onClick: (c) => n("present", {
            unitId: u.value.id,
            kind: "exercise",
            id: v.id,
            title: v.prompt
          })
        }, [
          P(G, { name: u.value.stage.exercises.find((c) => c.exerciseId === v.id)?.status === "done" ? "check" : "records" }, null, 8, ["name"]),
          a("span", null, s(v.prompt), 1),
          P(G, { name: "arrow" })
        ], 8, Ys))), 128)),
        a("div", Zs, [a("button", {
          type: "button",
          disabled: e.disabled,
          onClick: g[5] || (g[5] = (v) => n("action", "complete"))
        }, s(p.complete), 9, Js), a("button", {
          type: "button",
          onClick: g[6] || (g[6] = (v) => n("go", "materials"))
        }, s(p.notes), 1)])
      ])) : b("", !0),
      !u.value || e.state.completions.some((v) => v.unitId === u.value?.id) ? (t(), i("section", _s, [e.state.blockedUnit ? (t(), i(M, { key: 0 }, [
        g[15] || (g[15] = a("h1", { tabindex: "-1" }, "当前课件在另一个故事中", -1)),
        g[16] || (g[16] = a("p", { class: "learning-muted" }, "回到那个故事可以继续；也可以放下它，在这里重新开始。", -1)),
        a("button", {
          type: "button",
          disabled: e.disabled,
          onClick: g[7] || (g[7] = (v) => w("abandon", {}, r(Ce).lesson))
        }, "放下并重新开始", 8, Qs)
      ], 64)) : (t(), i(M, { key: 1 }, [
        u.value ? (t(), i("h2", er, s(p.next), 1)) : (t(), i("h1", Xs, s(e.state.teacher ? p.reading : p.selectFirst), 1)),
        e.state.teacher && !u.value ? (t(), i("button", {
          key: 2,
          type: "button",
          class: "learning-start-preference",
          "aria-label": `${p.settings}：${$.value}`,
          onClick: g[8] || (g[8] = (v) => n("go", "settings"))
        }, [a("span", null, [a("strong", null, s(p.settings), 1), a("small", null, s($.value), 1)]), P(G, { name: "arrow" })], 8, tr)) : b("", !0),
        e.state.teacher && !d.value ? (t(), i(M, { key: 3 }, [a("section", ar, [
          P(G, { name: "workbook" }),
          a("p", null, s(p.readingHint), 1),
          a("button", {
            type: "button",
            class: "learning-primary",
            disabled: e.disabled,
            onClick: g[9] || (g[9] = (v) => h("reading-writing"))
          }, [F(s(p.start), 1), P(G, { name: "arrow" })], 8, nr)
        ]), a("button", {
          type: "button",
          class: "learning-start-secondary",
          disabled: e.disabled,
          onClick: g[10] || (g[10] = (v) => h("lesson"))
        }, [
          P(G, { name: "records" }),
          a("span", null, [a("strong", null, s(p.lesson), 1), a("small", null, s(p.lessonHint), 1)]),
          P(G, { name: "arrow" })
        ], 8, ir)], 64)) : e.state.teacher ? b("", !0) : (t(), i("button", {
          key: 4,
          type: "button",
          class: "learning-primary",
          onClick: g[11] || (g[11] = (v) => n("go", "profile"))
        }, s(p.select), 1))
      ], 64))])) : b("", !0)
    ]));
  }
}), sr = lr;
function gt(e) {
  try {
    return JSON.parse(e);
  } catch {
    return {};
  }
}
function rr(e) {
  const f = [];
  for (const l of e.messages) l.role === "assistant" ? f.push({
    message: l,
    results: []
  }) : l.role === "tool" && f.at(-1)?.results.push(l);
  return f.map(({ message: l, results: n }, o) => ({
    index: o + 1,
    text: l.toolCalls?.length ? l.content : "",
    receivedChars: l.receivedChars,
    thinking: l.hasReasoning,
    streaming: !!l.streaming,
    tools: (l.toolCalls ?? []).map((u) => {
      const d = n.find((m) => m.toolCallId === u.id), p = gt(d?.content ?? ""), $ = e.status === "running", h = d?.error || p.ok === !1 ? "failed" : d?.content && !d.streaming ? "done" : !$ || l.error ? "cancelled" : d?.streaming ? "running" : "preparing";
      return {
        id: u.id,
        name: u.name,
        status: h,
        input: gt(u.arguments),
        result: p
      };
    })
  }));
}
var or = ["aria-label"], ur = { class: "learning-process-header" }, dr = ["aria-expanded"], vr = { "aria-hidden": "true" }, cr = ["disabled", "aria-label"], gr = ["aria-label"], mr = ["data-status"], pr = {
  class: "learning-process-dot",
  "aria-hidden": "true"
}, br = { key: 0 }, fr = { class: "learning-process-result" }, yr = {
  class: "learning-process-status",
  role: "status",
  "aria-live": "polite"
}, kr = {
  key: 0,
  class: "learning-working-dot",
  "aria-hidden": "true"
}, hr = /* @__PURE__ */ _({
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
  setup(e, { emit: f }) {
    const l = e, n = f, o = I(() => rr(l.turn)), u = I(() => o.value.flatMap((g) => g.tools)), d = I(() => l.turn.status === "running"), p = H(null), $ = I(() => p.value ?? (d.value || l.turn.status === "failed")), h = H(null), m = I(() => l.turn.progress?.round ?? o.value.at(-1)?.index), w = I(() => {
      if (!d.value) return Z.outcomes[l.turn.status];
      const g = o.value.at(-1), v = g?.tools.find((c) => c.status === "running" || c.status === "preparing");
      if (v) return `${Z.tools[v.name] ?? Z.title} · ${Z[v.status]}`;
      if (l.turn.progress?.stage === "provider" && g?.streaming) {
        if (g.receivedChars) return Z.received(g.receivedChars);
        if (g.thinking) return Z.thinking;
      }
      return Gi(l.turn.progress ?? { stage: "provider" });
    });
    function k(g) {
      const v = [], c = g.result.section ?? g.input.section;
      c && Z.sections[c] && v.push(Z.sections[c]), g.result.resultsCount !== void 0 && v.push(Z.results(g.result.resultsCount)), g.result.paragraphCount !== void 0 && v.push(Z.paragraphs(g.result.paragraphCount)), g.result.dataCount !== void 0 && v.push(Z.entries(g.result.dataCount)), g.result.failedCount && v.push(Z.sourcesFailed(g.result.failedCount)), g.name === "LearningLessonEdit" && (g.input.materialsCount && v.push(Z.proposedMaterials(g.input.materialsCount)), g.input.exercisesCount && v.push(Z.proposedExercises(g.input.exercisesCount))), g.result.errorsCount && v.push(Z.issues(g.result.errorsCount));
      const x = (g.result.errorFields ?? []).map((K) => Va[K]).filter(Boolean);
      return x.length && v.push(Z.checkFields([...new Set(x)].join("、"))), v.join(" · ");
    }
    return z(d, () => {
      p.value = null;
    }), z(() => l.turn.messages, async () => {
      const g = h.value, v = !g || g.scrollHeight - g.scrollTop - g.clientHeight < 48;
      await oe(), v && h.value && (h.value.scrollTop = h.value.scrollHeight);
    }), (g, v) => d.value || u.value.length ? (t(), i("section", {
      key: 0,
      class: ne(["learning-process", { "is-running": d.value }]),
      "aria-label": r(Z).title
    }, [
      a("header", ur, [a("button", {
        type: "button",
        class: "learning-process-toggle",
        "aria-expanded": $.value,
        onClick: v[0] || (v[0] = (c) => p.value = !$.value)
      }, [
        a("span", vr, s($.value ? "⌄" : "›"), 1),
        a("strong", null, s(r(Z).title), 1),
        a("small", null, s(d.value && m.value ? r(Z).round(m.value) : r(Z).history(u.value.length)), 1)
      ], 8, dr), d.value && e.stoppable ? (t(), i("button", {
        key: 0,
        type: "button",
        class: "learning-process-stop",
        disabled: e.disabled,
        "aria-label": r(Z).stop,
        onClick: v[1] || (v[1] = (c) => n("stop"))
      }, "■", 8, cr)) : b("", !0)]),
      $.value ? (t(), i("div", {
        key: 0,
        ref_key: "body",
        ref: h,
        class: "learning-process-body"
      }, [(t(!0), i(M, null, j(o.value, (c) => (t(), i(M, { key: c.index }, [c.text ? (t(), Y(We, {
        key: 0,
        class: "learning-markdown learning-process-narration",
        text: c.text
      }, null, 8, ["text"])) : b("", !0), c.tools.length ? (t(), i("ol", {
        key: 1,
        class: "learning-process-steps",
        "aria-label": r(Z).round(c.index)
      }, [(t(!0), i(M, null, j(c.tools, (x) => (t(), i("li", {
        key: x.id,
        "data-status": x.status
      }, [
        a("span", pr, s(x.status === "done" ? "✓" : x.status === "failed" ? "!" : "·"), 1),
        a("div", null, [a("span", null, s(r(Z).tools[x.name] ?? r(Z).title), 1), k(x) ? (t(), i("small", br, s(k(x)), 1)) : b("", !0)]),
        a("small", fr, s(r(Z)[x.status]), 1)
      ], 8, mr))), 128))], 8, gr)) : b("", !0)], 64))), 128))], 512)) : b("", !0),
      a("p", yr, [d.value ? (t(), i("span", kr)) : b("", !0), F(s(w.value), 1)])
    ], 10, or)) : b("", !0);
  }
}), Nt = hr;
function Pe(e) {
  return e.kind === "talk" || e.kind === "explain" || e.kind === "companion";
}
var mt = {
  initial: "我想跟你学这门语言，先聊聊吧。",
  returning: "我来继续学语言了，先聊聊今天从哪里开始吧。"
}, $r = { class: "learning-messages" }, wr = /* @__PURE__ */ _({
  __name: "LearningMessages",
  props: {
    turn: {},
    disabled: { type: Boolean }
  },
  emits: ["stop"],
  setup(e, { emit: f }) {
    const l = e, n = f, o = I(() => l.turn.messages.filter((u) => u.role === "assistant" && !u.toolCalls?.length && u.content));
    return (u, d) => (t(), i("div", $r, [P(Nt, {
      turn: e.turn,
      stoppable: "",
      disabled: e.disabled,
      onStop: d[0] || (d[0] = (p) => n("stop"))
    }, null, 8, ["turn", "disabled"]), (t(!0), i(M, null, j(o.value, (p, $) => (t(), i("div", {
      key: $,
      class: ne(["learning-output", { "is-streaming": p.streaming }])
    }, [P(We, {
      class: "learning-markdown",
      text: p.content
    }, null, 8, ["text"])], 2))), 128))]));
  }
}), xr = wr, Cr = { class: "learning-conversation" }, Ir = { class: "learning-conversation-heading" }, Lr = { class: "learning-person-initial" }, Sr = ["disabled"], Ar = ["aria-label"], Mr = {
  key: 0,
  class: "learning-history-notice"
}, Rr = {
  key: 0,
  class: "learning-conversation-user"
}, Tr = ["disabled", "onClick"], Br = {
  key: 3,
  class: "learning-conversation-tools"
}, Er = ["disabled"], Nr = ["disabled"], Or = {
  key: 1,
  class: "learning-working",
  role: "status"
}, qr = {
  key: 2,
  class: "learning-turn-notice is-error",
  role: "status"
}, Vr = {
  key: 3,
  class: "learning-conversation-empty"
}, Ur = ["disabled"], Dr = { class: "learning-composer-surface" }, jr = {
  key: 0,
  class: "learning-composer-quote"
}, Pr = { class: "learning-composer-row" }, Wr = ["maxlength", "onKeydown"], Fr = [
  "type",
  "disabled",
  "aria-label",
  "title"
], Hr = /* @__PURE__ */ _({
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
  setup(e, { expose: f, emit: l }) {
    const n = e, o = {
      conversation: "和语伴聊天",
      history: "更早的聊天已收起",
      empty: "今天想聊什么？",
      select: "先选一位语伴",
      opening: "打个招呼"
    }, u = /* @__PURE__ */ new Set([
      "prepare",
      "complete",
      "grade",
      "revision-review",
      "model-essay",
      "review-prepare",
      "review-assess",
      "companion"
    ]), d = l, p = ke().chat, $ = ve(p, "text"), h = H(null), m = H(null), w = H(null), k = ve(p, "focus");
    let g = null, v = 0;
    function c() {
      const S = w.value;
      S && (p.scroll = S.scrollTop, p.following = S.scrollHeight - S.scrollTop - S.clientHeight < 70);
    }
    async function x() {
      await oe(), p.following && w.value && (w.value.scrollTop = w.value.scrollHeight);
    }
    function K() {
      const S = h.value;
      S?.clientWidth && (S.style.height = "auto", S.style.height = `${S.scrollHeight}px`, x());
    }
    z($, K, { flush: "post" }), z(h, (S) => {
      if (g?.disconnect(), cancelAnimationFrame(v), !S) return;
      let q = 0;
      g = new ResizeObserver(([V]) => {
        V.contentRect.width !== q && (q = V.contentRect.width, cancelAnimationFrame(v), v = requestAnimationFrame(K));
      }), g.observe(S.parentElement);
    }, { flush: "post" }), fe(() => {
      w.value && (w.value.scrollTop = p.scroll), x();
    }), ye(() => {
      w.value && (p.scroll = w.value.scrollTop), g?.disconnect(), cancelAnimationFrame(v);
    });
    function E() {
      if (n.disabled || !$.value.trim()) return;
      const S = $.value.trim();
      p.sent = {
        text: $.value,
        user: k.value?.selection ? `${S}

${k.value.selection.quote}` : S,
        after: n.state.conversation.turns.length + n.state.conversation.removedTurns
      }, p.following = !0, d("action", k.value ? "explain" : "talk", {
        message: S,
        ...k.value ?? {}
      });
    }
    z([() => n.state.conversation.turns, () => n.state.chatBusy], x);
    function T(S) {
      return S.kind === "replacement" ? !n.disabled && n.state.currentUnitId === S.unitId : n.state.unit?.id === S.unitId && (S.kind === "exercise" ? n.state.unit.exercises : n.state.unit.materials).some((q) => q.id === S.id);
    }
    return f({
      async ask(S, q) {
        k.value = {
          exerciseId: S,
          selection: q
        }, await oe(), h.value?.focus();
      },
      focusHeading: () => m.value?.focus({ preventScroll: !0 })
    }), (S, q) => (t(), i("section", Cr, [
      a("header", Ir, [
        a("span", Lr, s([...e.state.teacher?.name ?? "伴"][0]), 1),
        a("h1", {
          ref_key: "heading",
          ref: m,
          tabindex: "-1"
        }, s(e.state.teacher?.name ?? "语伴"), 513),
        a("button", {
          type: "button",
          disabled: e.disabled,
          "aria-label": "更换学习语言和语伴",
          onClick: q[0] || (q[0] = (V) => d("profile"))
        }, s(new Intl.DisplayNames(["zh-CN"], { type: "language" }).of(e.state.language)), 9, Sr)
      ]),
      a("div", {
        ref_key: "scroller",
        ref: w,
        class: "learning-conversation-turns",
        "aria-label": o.conversation,
        onScroll: c
      }, [
        e.state.conversation.removedTurns ? (t(), i("p", Mr, s(o.history), 1)) : b("", !0),
        (t(!0), i(M, null, j(e.state.conversation.turns, (V, D) => (t(), i("div", {
          key: D,
          class: "learning-conversation-turn"
        }, [
          V.user && !r(u).has(V.purpose) ? (t(), i("p", Rr, s(V.user), 1)) : b("", !0),
          P(xr, {
            turn: V,
            disabled: e.pending,
            onStop: (N) => d("action", r(Pe)({ kind: V.purpose ?? "talk" }) ? "cancel-chat" : "cancel")
          }, null, 8, [
            "turn",
            "disabled",
            "onStop"
          ]),
          V.message ? (t(), i("p", {
            key: 1,
            class: ne(["learning-turn-notice", { "is-error": V.status === "failed" }]),
            role: "status"
          }, s(V.message), 3)) : b("", !0),
          V.presentation ? (t(), i("button", {
            key: 2,
            type: "button",
            class: "learning-activity-link",
            disabled: !T(V.presentation),
            onClick: (N) => d("present", V.presentation)
          }, [
            P(G, { name: V.presentation.kind === "material" ? "book" : "records" }, null, 8, ["name"]),
            a("span", null, s(V.presentation.title), 1),
            P(G, { name: "arrow" })
          ], 8, Tr)) : b("", !0),
          D === e.state.conversation.turns.length - 1 && e.state.reply?.text === V.teacher ? (t(), i("div", Br, [[...V.teacher].length <= 1e3 ? (t(), i("button", {
            key: 0,
            type: "button",
            disabled: e.disabled,
            onClick: q[1] || (q[1] = (N) => d("action", "say-reply"))
          }, [P(G, { name: "sound" }), q[8] || (q[8] = F("听语伴说", -1))], 8, Er)) : b("", !0), e.state.reply.exerciseId && [...V.teacher].length <= 4e3 ? (t(), i("button", {
            key: 1,
            type: "button",
            disabled: e.disabled || e.state.unit?.notes.some((N) => N.text === V.teacher),
            onClick: q[2] || (q[2] = (N) => d("action", "save-note"))
          }, "保存笔记", 8, Nr)) : b("", !0)])) : b("", !0)
        ]))), 128)),
        e.state.chatBusy && !e.state.conversation.turns.some((V) => V.status === "running" && r(Pe)({ kind: V.purpose ?? "talk" })) ? (t(), i("div", Or, [q[9] || (q[9] = a("span", {
          class: "learning-working-dot",
          "aria-hidden": "true"
        }, null, -1)), a("span", null, s(e.state.chatMessage), 1)])) : !e.state.chatBusy && e.state.chatMessage ? (t(), i("p", qr, s(e.state.chatMessage), 1)) : b("", !0),
        !e.state.conversation.turns.length && !e.state.chatBusy ? (t(), i("div", Vr, [
          P(G, { name: "chat" }),
          a("p", null, s(e.state.teacher ? o.empty : o.select), 1),
          e.state.teacher ? (t(), i("button", {
            key: 1,
            type: "button",
            disabled: e.disabled,
            onClick: q[4] || (q[4] = (V) => d("action", "talk", { message: e.state.profile ? r(mt).returning : r(mt).initial }))
          }, s(o.opening), 9, Ur)) : (t(), i("button", {
            key: 0,
            class: "learning-primary",
            type: "button",
            onClick: q[3] || (q[3] = (V) => d("profile"))
          }, s(o.select), 1))
        ])) : b("", !0)
      ], 40, Ar),
      e.state.teacher ? (t(), i("form", {
        key: 0,
        class: "learning-conversation-compose",
        onSubmit: ae(E, ["prevent"])
      }, [a("div", Dr, [k.value ? (t(), i("div", jr, [a("span", null, s(k.value.selection?.quote ?? "请教这道题"), 1), a("button", {
        type: "button",
        "aria-label": "取消引用",
        onClick: q[5] || (q[5] = (V) => k.value = null)
      }, "×")])) : b("", !0), a("div", Pr, [X(a("textarea", {
        ref_key: "composer",
        ref: h,
        "onUpdate:modelValue": q[6] || (q[6] = (V) => $.value = V),
        rows: "1",
        maxlength: k.value?.selection ? 1800 : k.value?.exerciseId ? 2e3 : 4e3,
        "aria-label": "和语伴说",
        placeholder: "和语伴说…",
        onKeydown: [pe(ae(E, ["ctrl", "prevent"]), ["enter"]), pe(ae(E, ["meta", "prevent"]), ["enter"])]
      }, null, 40, Wr), [[ie, $.value], [r(Be), r(p)]]), a("button", {
        type: e.state.chatBusy ? "button" : "submit",
        class: ne(e.state.chatBusy ? "learning-composer-stop" : "learning-primary"),
        disabled: e.state.chatBusy ? e.pending : e.disabled || !$.value.trim(),
        "aria-label": e.state.chatBusy ? "停止回复" : "发送给语伴",
        title: e.state.chatBusy ? "停止回复" : "发送给语伴",
        onClick: q[7] || (q[7] = ae((V) => e.state.chatBusy ? d("action", "cancel-chat") : E(), ["prevent"]))
      }, [P(G, { name: e.state.chatBusy ? "stop" : "send" }, null, 8, ["name"])], 10, Fr)])])], 32)) : b("", !0)
    ]));
  }
}), Gr = Hr, pt = {
  busy: "上一件事还没做完，等它完成后再试一次吧。这次没有开始。",
  unknown: "暂时没收到结果。请先重新加载，确认内容是否已保存，再决定是否重试。"
};
function zr(e) {
  const f = Wt(structuredClone(Ft(e.initialState))), l = H(!1), n = H("");
  let o = !1, u = 0, d = () => {
  };
  const p = I(() => !l.value && !f.value.busy && f.value.storage === "ready"), $ = I(() => !l.value && !f.value.chatBusy && f.value.storage === "ready");
  async function h(m, w = {}) {
    if (l.value) return;
    l.value = !0, n.value = "";
    const k = f.value.chatIdentity, g = u;
    try {
      const v = await e.bridge.request(`learning/${m}`, {
        chatIdentity: k,
        ...w
      }, 35e3);
      return !o || f.value.chatIdentity !== k ? void 0 : (u === g && v.result.state.chatIdentity === k && (f.value = v.result.state), v.result.rejected && (n.value = pt[v.result.rejected]), v.result);
    } catch {
      o && f.value.chatIdentity === k && (n.value = pt.unknown);
    } finally {
      o && (l.value = !1);
    }
  }
  return fe(() => {
    o = !0, d = e.bridge.subscribe((m) => {
      if (m.type === "learning/media") {
        f.value = {
          ...f.value,
          media: m.payload.media
        };
        return;
      }
      if (m.type !== "learning/state") return;
      const w = m.payload.state;
      w.chatIdentity === f.value.chatIdentity && (u++, f.value = w, n.value = "");
    });
  }), ye(() => {
    o = !1, d();
  }), {
    state: f,
    pending: l,
    writable: p,
    canChat: $,
    localMessage: n,
    request: h
  };
}
function Kr(e = Math.random) {
  return Math.round(3 * 6e4 + Math.min(Math.max(e(), 0), 1) * 9 * 6e4);
}
function Yr(e) {
  let f = !1, l, n = 0;
  function o() {
    l !== void 0 && (e.clearTimer(l), l = void 0);
  }
  function u() {
    if (!f) return;
    const d = n;
    l = e.setTimer(() => {
      d === n && (l = void 0, f && (e.opportunity(), u()));
    }, Kr(e.random));
  }
  return {
    update(d) {
      f !== d && (f = d, n++, o(), u());
    },
    dispose() {
      f = !1, n++, o();
    }
  };
}
function Zr(e) {
  const f = H(!1), l = H(!1), n = H(!1), o = H("");
  let u, d;
  const p = I(() => e.preference.enabled && e.reading.value && f.value && !e.blocked.value && !!e.state.value.teacher && e.state.value.storage === "ready"), $ = I(() => p.value && !l.value && !n.value && !e.pending.value && !e.state.value.busy && !e.state.value.chatBusy && !e.state.value.companionBusy);
  function h() {
    const x = e.root.value?.querySelector(".learning-scroll")?.getBoundingClientRect(), K = x?.top ?? 0, E = [...e.root.value?.querySelectorAll("[data-material-id][data-paragraph-id]") ?? []].find((T) => T.getBoundingClientRect().bottom > K + 60 && T.getBoundingClientRect().top < (x?.bottom ?? 0));
    return E ? {
      materialId: E.dataset.materialId,
      paragraphId: E.dataset.paragraphId
    } : null;
  }
  const m = Yr({
    setTimer: (x, K) => setTimeout(x, K),
    clearTimer: (x) => clearTimeout(x),
    opportunity: () => {
      const x = h();
      x && e.request("companion", x);
    }
  });
  z($, (x) => m.update(x), { immediate: !0 }), z([
    p,
    l,
    n,
    e.pending,
    () => e.state.value.companionBusy
  ], ([x, K, E, T, S]) => {
    S && !T && (!x || K || E) && e.request("cancel-companion");
  });
  function w() {
    const x = document.activeElement;
    l.value = x instanceof HTMLElement && !!e.root.value?.contains(x) && x.matches("textarea, input:not([type=checkbox],[type=radio],[type=range]), [contenteditable=true]");
  }
  const k = () => queueMicrotask(w);
  function g(x) {
    !(x.target instanceof HTMLElement) || !x.target.matches("textarea, input:not([type=checkbox],[type=radio],[type=range]), [contenteditable=true]") || (clearTimeout(u), n.value = !0, u = setTimeout(() => {
      n.value = !1;
    }, 3e4));
  }
  function v() {
    f.value = document.visibilityState === "visible", f.value || (clearTimeout(u), n.value = !1, c()), w();
  }
  function c() {
    clearTimeout(d), o.value = "";
  }
  return z(() => e.state.value.remark?.text ?? "", (x) => {
    c(), x && e.reading.value && f.value && !l.value && !e.blocked.value && (o.value = x, d = setTimeout(c, 1e4));
  }), z([
    e.reading,
    e.blocked,
    l
  ], ([x, K, E]) => {
    (!x || K || E) && c();
  }), fe(() => {
    v(), document.addEventListener("visibilitychange", v), e.root.value?.addEventListener("focusin", k), e.root.value?.addEventListener("focusout", k), e.root.value?.addEventListener("input", g);
  }), ye(() => {
    m.dispose(), clearTimeout(u), c(), document.removeEventListener("visibilitychange", v), e.root.value?.removeEventListener("focusin", k), e.root.value?.removeEventListener("focusout", k), e.root.value?.removeEventListener("input", g);
  }), {
    bubble: o,
    dismiss: c
  };
}
var Jr = { class: "learning-toolbar" }, _r = {
  key: 0,
  class: "learning-unread-dot",
  "aria-hidden": "true"
}, Qr = {
  key: 1,
  class: "learning-layout-control"
}, Xr = ["min", "max"], eo = { "aria-label": "学习资料与设置" }, to = { "aria-label": "学习资料与设置" }, ao = ["onClick"], no = {
  key: 0,
  class: "learning-notice",
  role: "status",
  "aria-live": "polite"
}, io = { class: "learning-row" }, lo = ["disabled"], so = ["disabled"], ro = ["disabled"], oo = ["disabled"], uo = ["inert", "aria-hidden"], vo = {
  key: 1,
  class: "learning-working",
  role: "status"
}, co = ["disabled"], go = {
  key: 4,
  class: "learning-materials-page"
}, mo = {
  key: 0,
  class: "learning-empty-note"
}, po = { class: "learning-materials-title" }, bo = ["onClick"], fo = ["onClick"], yo = {
  key: 0,
  class: "learning-notes"
}, ko = { key: 0 }, ho = ["disabled", "onClick"], $o = {
  key: 6,
  class: "learning-harvest-page"
}, wo = {
  key: 0,
  class: "learning-empty-note"
}, xo = { key: 0 }, Co = { class: "learning-muted" }, Io = ["disabled", "onClick"], Lo = ["disabled"], So = ["disabled"], Ao = {
  key: 3,
  class: "learning-row"
}, Mo = ["disabled"], Ro = ["disabled"], To = {
  key: 7,
  class: "learning-settings-page"
}, Bo = ["value", "disabled"], Eo = ["value"], No = {
  key: 0,
  class: "learning-settings-goal"
}, Oo = {
  key: 0,
  class: "learning-muted"
}, qo = ["value", "disabled"], Vo = ["disabled"], Uo = ["disabled"], Do = ["disabled"], jo = ["disabled"], Po = ["disabled"], Wo = ["disabled"], Fo = ["disabled"], Ho = ["inert", "aria-hidden"], Go = ["aria-label"], zo = { class: "learning-person-initial" }, Ko = {
  key: 0,
  class: "learning-unread-dot",
  "aria-hidden": "true"
}, Yo = ["aria-label"], Zo = {
  key: 0,
  class: "learning-unread-dot",
  "aria-hidden": "true"
}, Jo = {
  role: "alertdialog",
  "aria-labelledby": "learning-confirm-title",
  class: "learning-confirm"
}, _o = { id: "learning-confirm-title" }, Qo = { class: "learning-row" }, Xo = ["disabled"], eu = /* @__PURE__ */ _({
  __name: "LearningApp",
  props: {
    bridge: {},
    initialState: {}
  },
  setup(e) {
    const f = e, l = {
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
    }, { state: n, pending: o, writable: u, canChat: d, localMessage: p, request: $ } = zr(f), h = Ja(n), m = H(n.value.teacher ? "home" : "profile"), w = [], k = H(null), g = H(!1);
    Re(() => k.value?.open ? (k.value.open = !1, !0) : !1, () => g.value);
    const v = H(null), c = H(null), x = H(null), K = {}, E = H(null), T = H(0), S = I(() => T.value >= 760), q = H("work"), V = H(!0), D = H(!1), N = H(62), W = I(() => Math.max(42, Math.ceil(320 / Math.max(T.value, 1) * 100))), O = I(() => Math.min(68, Math.floor((1 - 320 / Math.max(T.value, 1)) * 100))), B = I({
      get: () => S.value ? Math.min(O.value, Math.max(W.value, N.value)) : N.value,
      set: (A) => {
        N.value = A;
      }
    }), L = H(!1);
    let U, R;
    const Q = () => {
      L.value = R?.matches ?? !1;
    };
    fe(() => {
      R = matchMedia("(prefers-reduced-motion: reduce)"), Q(), R.addEventListener("change", Q), !(!E.value || typeof ResizeObserver > "u") && (U = new ResizeObserver(([A]) => {
        T.value = A?.contentRect.width ?? 0;
      }), U.observe(E.value));
    }), ye(() => {
      U?.disconnect(), R?.removeEventListener("change", Q);
    });
    const le = I(() => S.value || q.value === "work"), ee = I(() => !!n.value.teacher && (S.value || q.value === "chat"));
    z([
      le,
      ee,
      L
    ], async ([A, y, C], ue, Xe) => {
      let et = !0, tt;
      if (Xe(() => {
        et = !1, clearTimeout(tt);
      }), A && (V.value = !0), y && (D.value = !0), await oe(), !et) return;
      A && x.value && (x.value.scrollTop = K[m.value] ?? 0);
      const at = () => {
        V.value = A, D.value = y;
      };
      S.value || C ? at() : tt = setTimeout(at, 320);
    }, { immediate: !0 });
    function ce() {
      le.value && x.value && (K[m.value] = x.value.scrollTop);
    }
    const ge = I(() => n.value.conversation.turns.length + n.value.conversation.removedTurns), Ee = H(ge.value);
    z([ge, ee], ([A, y]) => {
      (y || A < Ee.value) && (Ee.value = A);
    }, { immediate: !0 });
    const Ge = I(() => ge.value > Ee.value), Ie = I(() => {
      const A = n.value.conversation.turns;
      let y = A.length - 1;
      for (; y >= 0 && Pe({ kind: A[y].purpose ?? "talk" }); ) y--;
      return y < 0 ? null : {
        turn: n.value.conversation.turns[y],
        key: `${n.value.chatIdentity}:${n.value.language}:${n.value.conversation.removedTurns + y}`
      };
    });
    async function ze() {
      n.value.teacher && (ce(), q.value = "chat", D.value = !0, await oe(), q.value === "chat" && v.value?.focusHeading());
    }
    async function Ne() {
      V.value = !0, q.value = "work", await oe(), x.value && (x.value.scrollTop = K[m.value] ?? 0);
      const A = x.value?.querySelector("h1, h2");
      A && (A.tabIndex = -1, A.focus({ preventScroll: !0 }));
    }
    let Ke = 0;
    z(() => !!n.value.record, async (A, y) => {
      m.value !== "books" || A === y || (A && (Ke = x.value?.scrollTop ?? 0), await oe(), m.value === "books" && x.value && (x.value.scrollTop = A ? 0 : Ke));
    });
    const te = H(null), Ye = H(null);
    ft(Ye, () => {
      te.value = null;
    });
    const Le = H(n.value.profile?.voice?.voiceId ?? n.value.voices.defaultVoice), Se = H(n.value.profile?.voice?.language ?? n.value.language), Ae = H(n.value.profile?.voice?.speed ?? 1), me = H(0), Ot = I(() => n.value.completions.slice(me.value * 20, (me.value + 1) * 20));
    z([() => n.value.language, () => n.value.profile?.voice], ([A, y]) => {
      Le.value = y?.voiceId ?? n.value.voices.defaultVoice, Se.value = y?.language ?? A, Ae.value = y?.speed ?? 1;
    }), z([
      () => n.value.chatIdentity,
      () => n.value.language,
      () => n.value.teacher?.name
    ], () => {
      c.value = null, te.value = null, me.value = 0;
    }), z(() => !!n.value.teacher, (A) => {
      A || (q.value = "work");
    }), z(() => n.value.currentUnitId, (A) => {
      te.value?.action === "replace-lesson" && te.value.input.unitId !== A && (te.value = null);
    }), z(() => n.value.unit, (A) => {
      const y = c.value;
      y && (A?.id !== y.unitId || !(y.kind === "exercise" ? A.exercises : A.materials).some((C) => C.id === y.id)) && Oe();
    }), z(() => {
      const A = n.value.conversation.turns.at(-1)?.presentation;
      return A ? `${n.value.conversation.turns.length + n.value.conversation.removedTurns}:${A.unitId}:${A.kind}:${A.id}` : "";
    }, (A) => {
      const y = n.value.conversation.turns.at(-1)?.presentation;
      A && y && we(y, !0);
    });
    const $e = H(!1);
    z([le, m], ([A, y]) => {
      A && y === "home" && ($e.value = !1);
    });
    async function we(A, y = !1) {
      if (A.kind === "replacement") {
        if (n.value.currentUnitId !== A.unitId || n.value.storage !== "ready") return;
        de("replace-lesson", {
          unitId: A.unitId,
          message: A.message,
          kind: A.unitKind
        }, l.replaceWarning);
        return;
      }
      if (n.value.unit?.id === A.unitId) {
        if (n.value.unit.kind === "reading-writing") {
          if (y) {
            (!le.value || m.value !== "home") && ($e.value = !0);
            return;
          }
          h.unit(A.unitId).reading.view = "reading", await se("home");
          const C = A.kind === "exercise" ? `[data-exercise-id="${CSS.escape(A.id)}"]` : `[data-material-id="${CSS.escape(A.id)}"][data-paragraph-id]`;
          x.value?.querySelector(C)?.scrollIntoView({
            block: "start",
            behavior: matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth"
          });
          return;
        }
        c.value = A;
      }
    }
    function Oe() {
      c.value = null, $("stop");
    }
    async function Ze(A, y) {
      Oe(), ce(), q.value = "chat", D.value = !0, await oe(), await v.value?.ask(A, y);
    }
    async function se(A, y = !1) {
      if (A !== m.value && !y) if (A === "home") w.length = 0;
      else {
        const C = w.indexOf(A);
        C >= 0 ? w.splice(C) : w.push(m.value);
      }
      if (x.value && (K[m.value] = x.value.scrollTop), k.value && (k.value.open = !1), m.value = A, await Ne(), await oe(), x.value) {
        x.value.scrollTop = K[A] ?? 0;
        const C = [...x.value.querySelectorAll("h1, h2")].find((ue) => ue.offsetParent !== null);
        C && (C.tabIndex = -1, C.focus({ preventScroll: !0 }));
      }
    }
    async function Je() {
      await se("home"), x.value && (x.value.scrollTop = 0);
      const A = x.value?.querySelector("#learning-review-title");
      A && (A.tabIndex = -1, A.focus({ preventScroll: !0 }));
    }
    async function qe(A, y = {}) {
      if (A === "prepare" && !n.value.profile) {
        h.setup.step = n.value.teacher ? 2 : 0, await se("profile");
        return;
      }
      A === "start-review" && await Je();
      const C = n.value.unit;
      C?.kind === "reading-writing" && y.unitId === C.id && [
        "grade",
        "submit-revision",
        "skip-revision"
      ].includes(A) && (h.unit(C.id).reading.view = A !== "grade" || [
        "reviewing",
        "model",
        "complete"
      ].includes(C.stage.stage) ? "model" : "feedback", await se("home"), x.value && (x.value.scrollTop = 0)), await $(A, y);
    }
    z(() => h.settings.submitted, (A, y) => {
      !A && y && !h.settings.open && m.value === "profile" && h.setup.step === 2 && n.value.storage === "ready" && !n.value.busy && n.value.profile && Object.entries(y.value).every(([C, ue]) => n.value.profile.settings[C] === ue) && se("home");
    }), z(() => n.value.busy, (A) => {
      const y = n.value.unit;
      !A && y?.stage.stage === "revising" && h.unit(y.id).reading.view === "model" && (h.unit(y.id).reading.view = "feedback");
    });
    const _e = Re(() => k.value?.open ? (k.value.open = !1, !0) : !S.value && q.value === "chat" ? (Ne(), !0) : m.value === "home" || !w.length && m.value === "profile" && !n.value.teacher ? !1 : (se(w.pop() ?? "home", !0), !0));
    function de(A, y, C) {
      te.value = {
        action: A,
        input: y,
        text: C
      };
    }
    async function qt(A) {
      await $("records", {
        id: A,
        offset: n.value.records.offset
      }), n.value.record?.id === A && await se("books");
    }
    const { bubble: Qe, dismiss: Ve } = Zr({
      root: E,
      state: n,
      pending: o,
      preference: h.companion,
      reading: I(() => le.value && m.value === "home" && n.value.unit?.kind === "reading-writing" && [
        "writing",
        "grading",
        "complete"
      ].includes(n.value.unit.stage.stage)),
      blocked: I(() => !!c.value || !!te.value || g.value),
      request: $
    });
    async function Vt() {
      const A = await $("export");
      if (!A?.document) return;
      const y = URL.createObjectURL(new Blob([JSON.stringify(A.document, null, 2)], { type: "application/json" })), C = document.createElement("a");
      C.href = y, C.download = "LittleWhiteBox_Learning.json", C.click(), setTimeout(() => URL.revokeObjectURL(y), 1e3);
    }
    return (A, y) => (t(), i("section", {
      ref_key: "root",
      ref: E,
      class: "learning-app",
      style: bt({
        "--learning-switch-ms": `${r(320)}ms`,
        "--learning-work-share": `${B.value}%`
      }),
      "aria-label": "语伴语言学习"
    }, [
      a("header", Jr, [
        m.value !== "home" && (r(n).teacher || w.length) && (S.value || q.value === "work") ? (t(), i("button", {
          key: 0,
          type: "button",
          class: "learning-toolbar-back",
          "aria-label": "返回上一页",
          onClick: y[0] || (y[0] = (...C) => r(_e) && r(_e)(...C))
        }, [P(G, { name: "back" })])) : b("", !0),
        a("button", {
          type: "button",
          class: "learning-wordmark",
          onClick: y[1] || (y[1] = (C) => se("home"))
        }, [
          y[33] || (y[33] = a("span", {
            class: "learning-brand-mark",
            "aria-hidden": "true"
          }, [F("a"), a("span", null, "あ")], -1)),
          y[34] || (y[34] = F("语伴", -1)),
          $e.value && (S.value || q.value === "work") ? (t(), i("span", _r)) : b("", !0)
        ]),
        S.value && r(n).teacher ? (t(), i("label", Qr, [
          P(G, { name: "workbook" }),
          X(a("input", {
            "onUpdate:modelValue": y[2] || (y[2] = (C) => B.value = C),
            type: "range",
            min: W.value,
            max: O.value,
            step: "1",
            "aria-label": "阅读区宽度比例"
          }, null, 8, Xr), [[
            ie,
            B.value,
            void 0,
            { number: !0 }
          ]]),
          P(G, { name: "chat" })
        ])) : b("", !0),
        a("details", {
          ref_key: "menu",
          ref: k,
          class: "learning-menu",
          onToggle: y[3] || (y[3] = (C) => g.value = !!k.value?.open),
          onKeydown: y[4] || (y[4] = pe(ae((C) => k.value.open = !1, ["stop", "prevent"]), ["esc"]))
        }, [a("summary", eo, [P(G, { name: "more" })]), a("nav", to, [(t(), i(M, null, j([
          ["books", "语法本与生词本"],
          ["materials", "课件与笔记"],
          ["harvest", "我的收获"],
          ["settings", "设置"]
        ], ([C, ue]) => a("button", {
          key: C,
          type: "button",
          onClick: (Xe) => se(C)
        }, s(ue), 9, ao)), 64))])], 544)
      ]),
      !r(n).busy && (r(n).message || r(p) || r(n).storage !== "ready") ? (t(), i("div", no, [F(s(r(p) || r(n).message || (r(n).storage === "unconfirmed" ? r(De).unconfirmed : r(n).storage === "conflict" ? r(De).conflict : r(De).unloaded)) + " ", 1), a("div", io, [
        r(n).storage === "unconfirmed" || r(n).storage === "conflict" ? (t(), i("button", {
          key: 0,
          type: "button",
          disabled: r(o),
          onClick: y[5] || (y[5] = (C) => r($)("verify"))
        }, s(l.verify), 9, lo)) : b("", !0),
        r(n).storage === "unconfirmed" ? (t(), i("button", {
          key: 1,
          type: "button",
          disabled: r(o),
          onClick: y[6] || (y[6] = (C) => r($)("retry-save"))
        }, s(l.retry), 9, so)) : b("", !0),
        r(n).storage === "conflict" ? (t(), i("button", {
          key: 2,
          type: "button",
          disabled: r(o),
          onClick: y[7] || (y[7] = (C) => de("adopt-server", {}, l.adoptWarning))
        }, s(l.adopt), 9, ro)) : b("", !0),
        r(n).storage === "unloaded" || r(p) ? (t(), i("button", {
          key: 3,
          type: "button",
          disabled: r(o),
          onClick: y[8] || (y[8] = (C) => r($)("read"))
        }, "重新加载", 8, oo)) : b("", !0)
      ])])) : b("", !0),
      a("div", { class: ne(["learning-stage", {
        "is-wide": S.value,
        "is-chat": !S.value && q.value === "chat"
      }]) }, [
        a("div", {
          class: "learning-pane is-work",
          inert: !le.value,
          "aria-hidden": !le.value
        }, [a("div", {
          ref_key: "scroller",
          ref: x,
          class: "learning-scroll",
          onScrollPassive: ce
        }, [V.value ? (t(), i(M, { key: 0 }, [
          Ie.value ? (t(), Y(Nt, {
            key: Ie.value.key,
            turn: Ie.value.turn,
            stoppable: "",
            disabled: r(o),
            onStop: y[9] || (y[9] = (C) => r($)("cancel"))
          }, null, 8, ["turn", "disabled"])) : b("", !0),
          r(n).busy && Ie.value?.turn.status !== "running" ? (t(), i("div", vo, [
            y[35] || (y[35] = a("span", {
              class: "learning-working-dot",
              "aria-hidden": "true"
            }, null, -1)),
            a("span", null, s(r(n).message || l.working), 1),
            a("button", {
              type: "button",
              disabled: r(o),
              onClick: y[10] || (y[10] = (C) => r($)("cancel"))
            }, "停止", 8, co)
          ])) : b("", !0),
          m.value === "home" ? (t(), Y(sr, {
            key: 2,
            state: r(n),
            disabled: !r(u),
            pending: r(o),
            onAction: qe,
            onConfirm: de,
            onPresent: we,
            onGo: se,
            onAsk: Ze,
            onRecord: qt
          }, null, 8, [
            "state",
            "disabled",
            "pending"
          ])) : b("", !0),
          m.value === "profile" ? (t(), Y(qi, {
            key: 3,
            state: r(n),
            disabled: !r(u),
            onAction: r($)
          }, null, 8, [
            "state",
            "disabled",
            "onAction"
          ])) : b("", !0),
          m.value === "materials" ? (t(), i("section", go, [
            y[36] || (y[36] = a("h1", null, "课件与笔记", -1)),
            r(n).unit ? b("", !0) : (t(), i("p", mo, s(r(n).blockedUnit ? "当前课件在另一个故事中" : "还没有课件"), 1)),
            r(n).unit ? (t(), i(M, { key: 1 }, [
              a("p", po, s(r(n).unit.title), 1),
              (t(!0), i(M, null, j(r(n).unit.materials, (C) => (t(), i("button", {
                key: C.id,
                type: "button",
                class: "learning-activity-link",
                onClick: (ue) => we({
                  unitId: r(n).unit.id,
                  kind: "material",
                  id: C.id,
                  title: C.title
                })
              }, [
                P(G, { name: "book" }),
                a("span", null, s(C.title), 1),
                P(G, { name: "arrow" })
              ], 8, bo))), 128)),
              (t(!0), i(M, null, j(r(n).unit.exercises, (C) => (t(), i("button", {
                key: C.id,
                type: "button",
                class: "learning-activity-link",
                onClick: (ue) => we({
                  unitId: r(n).unit.id,
                  kind: "exercise",
                  id: C.id,
                  title: C.prompt
                })
              }, [
                P(G, { name: "records" }),
                a("span", null, s(C.prompt), 1),
                P(G, { name: "arrow" })
              ], 8, fo))), 128)),
              r(n).unit.notes.length ? (t(), i("section", yo, [(t(!0), i(M, null, j(r(n).unit.notes, (C) => (t(), i("article", { key: C.id }, [
                C.selection ? (t(), i("blockquote", ko, s(C.selection.quote), 1)) : b("", !0),
                a("p", null, s(C.text), 1),
                a("button", {
                  type: "button",
                  disabled: !r(u),
                  onClick: (ue) => r($)("delete-note", { id: C.id })
                }, "删除笔记", 8, ho)
              ]))), 128))])) : b("", !0)
            ], 64)) : b("", !0)
          ])) : b("", !0),
          m.value === "books" ? (t(), Y(li, {
            key: 5,
            state: r(n),
            disabled: !r(u),
            onAction: qe,
            onReview: Je,
            onRemove: de
          }, null, 8, ["state", "disabled"])) : b("", !0),
          m.value === "harvest" ? (t(), i("section", $o, [
            y[38] || (y[38] = a("div", { class: "learning-page-heading" }, [a("h1", null, "我的收获")], -1)),
            r(n).completions.length ? b("", !0) : (t(), i("p", wo, "还没有完成的课程")),
            (t(!0), i(M, null, j(Ot.value, (C) => (t(), i("article", {
              key: C.unitId,
              class: "learning-harvest-entry"
            }, [
              a("small", null, s(new Date(C.completedAt).toLocaleDateString()), 1),
              C.rewardStatus !== "retired" ? (t(), i("h2", xo, [F(s(C.rewardStatus === "paid" ? "+" : "") + s(C.amount), 1), y[37] || (y[37] = a("span", null, "小白币", -1))])) : b("", !0),
              a("p", null, s(C.summary), 1),
              a("p", Co, s(C.rewardStatus === "paid" ? r(re).paid : C.rewardStatus === "retired" ? r(re).retired : r(re).pending), 1),
              C.rewardStatus !== "paid" && C.rewardStatus !== "retired" ? (t(), i("button", {
                key: 1,
                type: "button",
                disabled: !r(u) || r(n).walletStorage !== "ready",
                onClick: (ue) => r($)("reward", {
                  unitId: C.unitId,
                  openWallet: !r(n).walletOpen
                })
              }, s(r(n).walletOpen ? r(re).claim : r(re).openWallet), 9, Io)) : b("", !0)
            ]))), 128)),
            r(n).walletStorage === "unconfirmed" || r(n).walletStorage === "conflict" || r(n).walletStorage === "failed" ? (t(), i("button", {
              key: 1,
              type: "button",
              disabled: r(o) || r(n).busy,
              onClick: y[11] || (y[11] = (C) => r($)("verify-wallet"))
            }, s(l.verifyWallet), 9, Lo)) : b("", !0),
            r(n).walletStorage === "conflict" ? (t(), i("button", {
              key: 2,
              type: "button",
              disabled: r(o) || r(n).busy,
              onClick: y[12] || (y[12] = (C) => de("adopt-wallet", {}, l.adoptWalletWarning))
            }, s(l.adoptWallet), 9, So)) : b("", !0),
            r(n).completions.length > 20 ? (t(), i("div", Ao, [a("button", {
              type: "button",
              disabled: me.value === 0,
              onClick: y[13] || (y[13] = (C) => me.value--)
            }, "上一页", 8, Mo), a("button", {
              type: "button",
              disabled: (me.value + 1) * 20 >= r(n).completions.length,
              onClick: y[14] || (y[14] = (C) => me.value++)
            }, "下一页", 8, Ro)])) : b("", !0)
          ])) : b("", !0),
          m.value === "settings" ? (t(), i("section", To, [
            y[48] || (y[48] = a("h1", null, "学习设置", -1)),
            a("label", null, [y[39] || (y[39] = F("当前语言", -1)), a("select", {
              value: r(n).language,
              disabled: !r(u),
              onChange: y[15] || (y[15] = (C) => r($)("language", { language: C.target.value }))
            }, [(t(!0), i(M, null, j([.../* @__PURE__ */ new Set([r(n).language, ...r(n).languages])], (C) => (t(), i("option", {
              key: C,
              value: C
            }, s(new Intl.DisplayNames(["zh-CN"], { type: "language" }).of(C)), 9, Eo))), 128))], 40, Bo)]),
            a("button", {
              type: "button",
              onClick: y[16] || (y[16] = (C) => se("profile"))
            }, "更换语言和语伴 →"),
            P(Tt),
            a("section", null, [
              y[40] || (y[40] = a("h2", null, "训练设置", -1)),
              r(n).profile?.goal.description ? (t(), i("p", No, s(r(n).profile.goal.description), 1)) : b("", !0),
              P(Rt, {
                state: r(n),
                disabled: !r(u),
                onAction: r($)
              }, null, 8, [
                "state",
                "disabled",
                "onAction"
              ])
            ]),
            a("section", null, [
              y[45] || (y[45] = a("h2", null, "语伴的声音", -1)),
              r(n).voices.enabled ? (t(), i("form", {
                key: 1,
                onSubmit: y[20] || (y[20] = ae((C) => r($)("voice", { voice: {
                  voiceId: Le.value,
                  language: Se.value,
                  speed: Number(Ae.value)
                } }), ["prevent"]))
              }, [
                a("label", null, [y[41] || (y[41] = F("音色", -1)), X(a("select", { "onUpdate:modelValue": y[17] || (y[17] = (C) => Le.value = C) }, [(t(!0), i(M, null, j(r(n).voices.voices, (C) => (t(), i("option", {
                  key: C.id,
                  value: C.id,
                  disabled: !C.available
                }, s(C.name) + s(C.available ? "" : "（暂不可用）"), 9, qo))), 128))], 512), [[Me, Le.value]])]),
                a("label", null, [y[42] || (y[42] = F("发音语言", -1)), X(a("input", {
                  "onUpdate:modelValue": y[18] || (y[18] = (C) => Se.value = C),
                  type: "text",
                  maxlength: "80",
                  placeholder: "en / ja"
                }, null, 512), [[ie, Se.value]])]),
                a("label", null, [y[44] || (y[44] = F("语速", -1)), X(a("select", { "onUpdate:modelValue": y[19] || (y[19] = (C) => Ae.value = C) }, [...y[43] || (y[43] = [
                  a("option", { value: 0.75 }, "0.75×", -1),
                  a("option", { value: 1 }, "1×", -1),
                  a("option", { value: 1.25 }, "1.25×", -1)
                ])], 512), [[Me, Ae.value]])]),
                a("button", {
                  type: "submit",
                  disabled: !r(u) || !r(n).profile
                }, "保存声音设置", 8, Vo)
              ], 32)) : (t(), i("p", Oo, s(l.voiceDisabled), 1)),
              a("button", {
                type: "button",
                onClick: y[21] || (y[21] = (C) => r($)("tts-settings"))
              }, s(r(n).voices.enabled ? r(je).settings : r(je).enable), 1),
              y[46] || (y[46] = a("small", null, "已听过的题保留原声音，新偏好用于之后的题目。", -1))
            ]),
            a("section", null, [
              y[47] || (y[47] = a("h2", null, "学习数据", -1)),
              a("button", {
                type: "button",
                disabled: r(o) || r(n).busy,
                onClick: y[22] || (y[22] = (C) => de("forget-conversation", {}, "清空和当前语伴的对话？目标、课件、学习记录和奖励都会保留。"))
              }, "清空对话记录", 8, Uo),
              a("button", {
                type: "button",
                disabled: !r(u),
                onClick: Vt
              }, "导出学习数据", 8, Do),
              a("button", {
                type: "button",
                disabled: r(o) || r(n).busy,
                onClick: y[23] || (y[23] = (C) => r($)("read"))
              }, "重新加载", 8, jo),
              r(n).unit || r(n).blockedUnit ? (t(), i("button", {
                key: 0,
                type: "button",
                disabled: !r(u),
                onClick: y[24] || (y[24] = (C) => de("abandon", {}, r(Ce).lesson))
              }, "放下当前练习", 8, Po)) : b("", !0),
              a("button", {
                type: "button",
                class: "learning-danger",
                disabled: !r(u) || !r(n).profile,
                onClick: y[25] || (y[25] = (C) => de("delete-language", {}, "删除当前语言的全部学习数据？未领取奖励也将放弃，已到账流水保留。"))
              }, "删除当前语言", 8, Wo),
              a("button", {
                type: "button",
                class: "learning-danger",
                disabled: !r(u),
                onClick: y[26] || (y[26] = (C) => de("clear", {}, "清空所有语言的目标、课程和记录？未领取奖励也将放弃。已到账流水不撤销。"))
              }, "清空全部学习数据", 8, Fo)
            ])
          ])) : b("", !0)
        ], 64)) : b("", !0)], 544)], 8, uo),
        r(n).teacher ? (t(), i("div", {
          key: 0,
          class: "learning-pane is-chat",
          inert: !ee.value,
          "aria-hidden": !ee.value
        }, [D.value ? (t(), Y(Gr, {
          key: 0,
          ref_key: "conversation",
          ref: v,
          state: r(n),
          disabled: !r(d),
          pending: r(o),
          onAction: r($),
          onPresent: we,
          onProfile: y[27] || (y[27] = (C) => se("profile"))
        }, null, 8, [
          "state",
          "disabled",
          "pending",
          "onAction"
        ])) : b("", !0)], 8, Ho)) : b("", !0),
        !S.value && q.value === "work" && r(n).teacher ? (t(), i("button", {
          key: 1,
          type: "button",
          class: "learning-float is-companion",
          "aria-label": Ge.value ? `和${r(n).teacher.name}聊天，有新消息` : `和${r(n).teacher.name}聊天`,
          onClick: ze
        }, [a("span", zo, s([...r(n).teacher.name][0]), 1), Ge.value ? (t(), i("span", Ko)) : b("", !0)], 8, Go)) : b("", !0),
        !S.value && q.value === "chat" ? (t(), i("button", {
          key: 2,
          type: "button",
          class: "learning-float is-workbook",
          "aria-label": $e.value ? "回到练习本，有新指引" : "回到练习本",
          onClick: Ne
        }, [P(G, { name: "workbook" }), $e.value ? (t(), i("span", Zo)) : b("", !0)], 8, Yo)) : b("", !0),
        r(Qe) ? (t(), i("aside", {
          key: 3,
          class: ne(["learning-companion-bubble", { "is-wide": S.value }]),
          "aria-live": "polite"
        }, [a("button", {
          type: "button",
          onClick: y[28] || (y[28] = (C) => {
            ze(), r(Ve)();
          })
        }, s(r(Qe)), 1), a("button", {
          type: "button",
          "aria-label": "收起这句话",
          onClick: y[29] || (y[29] = (...C) => r(Ve) && r(Ve)(...C))
        }, [P(G, { name: "close" })])], 2)) : b("", !0)
      ], 2),
      c.value ? b("", !0) : (t(), Y(It, {
        key: 1,
        state: r(n),
        onAction: r($)
      }, null, 8, ["state", "onAction"])),
      r(n).unit && c.value ? (t(), Y(fn, {
        key: `${r(n).chatIdentity}:${r(n).language}:${r(n).unit.id}:${c.value.kind}:${c.value.id}`,
        state: r(n),
        target: c.value,
        disabled: !r(u),
        onAction: r($),
        onClose: Oe,
        onAsk: Ze
      }, null, 8, [
        "state",
        "target",
        "disabled",
        "onAction"
      ])) : b("", !0),
      te.value ? (t(), i("div", {
        key: 3,
        ref_key: "confirmLayer",
        ref: Ye,
        class: "learning-confirm-shade",
        onKeydown: y[32] || (y[32] = pe(ae((C) => te.value = null, ["stop", "prevent"]), ["esc"]))
      }, [a("section", Jo, [
        a("h2", _o, s(r(st)[te.value.action].title), 1),
        a("p", null, s(te.value.text), 1),
        a("div", Qo, [a("button", {
          autofocus: "",
          type: "button",
          onClick: y[30] || (y[30] = (C) => te.value = null)
        }, s(l.cancel), 1), a("button", {
          type: "button",
          class: "learning-primary",
          disabled: r(o) || r(n).busy,
          onClick: y[31] || (y[31] = (C) => {
            qe(te.value.action, te.value.input), te.value = null;
          })
        }, s(r(st)[te.value.action].accept), 9, Xo)])
      ])], 544)) : b("", !0)
    ], 4));
  }
}), lu = eu;
export {
  lu as default
};
