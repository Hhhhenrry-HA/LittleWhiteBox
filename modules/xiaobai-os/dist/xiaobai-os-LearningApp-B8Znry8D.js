/* eslint-disable */
import { $ as r, C as Wt, E as oe, F as t, G as ee, H as Y, I as Ft, J as fe, L as D, M as ye, O as ke, Q as ve, V as Gt, W as Ht, X as zt, Y as H, Z as Yt, _ as i, a as Te, b as F, c as be, et as ne, g, h as K, i as Kt, l as ae, m as a, nt as s, o as le, p as I, tt as kt, u as A, w as st, x as Q, y as G, z as Zt } from "./xiaobai-os-runtime-dom.esm-bundler-DgjJUtuO.js";
import { n as Ee, r as ht } from "./xiaobai-os-app-navigation-DS43A6sJ.js";
import { n as Jt, t as Qt } from "./xiaobai-os-frame-bridge-BfVuKvnh.js";
import { t as He } from "./xiaobai-os-MessageMarkdown-bs_FqyUr.js";
var We = /* @__PURE__ */ new WeakMap(), rt = [
  "select",
  "input",
  "keyup",
  "pointerup",
  "scroll"
], Oe = {
  mounted(e, m) {
    const l = m.value, n = l.cursor, o = () => {
      l.cursor = {
        start: e.selectionStart,
        end: e.selectionEnd,
        direction: e.selectionDirection,
        top: e.scrollTop,
        left: e.scrollLeft
      };
    };
    We.set(e, o);
    for (const u of rt) e.addEventListener(u, o, { passive: !0 });
    oe(() => {
      !e.isConnected || !n || (e.setSelectionRange(n.start, n.end, n.direction), e.scrollTop = n.top, e.scrollLeft = n.left);
    });
  },
  beforeUnmount(e) {
    const m = We.get(e);
    if (m) {
      m();
      for (const l of rt) e.removeEventListener(l, m);
      We.delete(e);
    }
  }
}, Xt = ["disabled"], _t = {
  key: 0,
  class: "learning-choices"
}, ea = [
  "type",
  "checked",
  "onChange"
], ta = { class: "learning-option-letter" }, aa = {
  key: 1,
  class: "learning-order"
}, na = [
  "disabled",
  "aria-label",
  "onClick"
], ia = [
  "disabled",
  "aria-label",
  "onClick"
], la = {
  key: 2,
  class: "learning-fields"
}, sa = ["onUpdate:modelValue"], ra = ["value"], oa = {
  key: 3,
  class: "learning-choices"
}, ua = ["checked", "onChange"], da = {
  key: 0,
  class: "learning-muted"
}, va = {
  key: 4,
  class: "learning-fields"
}, ca = ["onUpdate:modelValue"], ga = {
  key: 5,
  class: "learning-writing"
}, ma = ["disabled"], pa = /* @__PURE__ */ Q({
  __name: "AnswerInput",
  props: /* @__PURE__ */ st({
    response: {},
    paragraphs: {},
    disabled: { type: Boolean }
  }, {
    modelValue: { required: !0 },
    modelModifiers: {}
  }),
  emits: /* @__PURE__ */ st(["submit"], ["update:modelValue"]),
  setup(e, { emit: m }) {
    const l = e, n = m, o = Gt(e, "modelValue");
    function u(b) {
      l.response.kind === "choice" && !l.response.multiple ? o.value.picked = [b] : o.value.picked = o.value.picked.includes(b) ? o.value.picked.filter((f) => f !== b) : [...o.value.picked, b];
    }
    function c(b, f) {
      const k = [...o.value.order];
      [k[b], k[b + f]] = [k[b + f], k[b]], o.value.order = k;
    }
    const y = I(() => {
      const b = l.response;
      return b.kind === "text" ? !!o.value.text.trim() : b.kind === "gaps" ? b.slots.every((f) => o.value.values[f.id]?.trim()) : b.kind === "match" ? b.left.every((f) => o.value.values[f.id]) : b.kind === "order" ? !0 : o.value.picked.length > 0;
    });
    function w() {
      const b = l.response;
      !y.value || l.disabled || (b.kind === "text" ? n("submit", {
        kind: "text",
        text: o.value.text
      }) : b.kind === "gaps" ? n("submit", {
        kind: "gaps",
        values: b.slots.map((f) => ({
          id: f.id,
          text: o.value.values[f.id]
        }))
      }) : b.kind === "match" ? n("submit", {
        kind: "match",
        pairs: b.left.map((f) => ({
          left: f.id,
          right: o.value.values[f.id]
        }))
      }) : n("submit", {
        kind: b.kind,
        ids: [...b.kind === "order" ? o.value.order : o.value.picked]
      }));
    }
    return (b, f) => (t(), i("form", {
      class: "learning-answer",
      onSubmit: ae(w, ["prevent"])
    }, [a("fieldset", { disabled: e.disabled }, [
      f[3] || (f[3] = a("legend", { class: "learning-sr-only" }, "你的回答", -1)),
      e.response.kind === "choice" ? (t(), i("div", _t, [(t(!0), i(A, null, D(e.response.options, (k, h) => (t(), i("label", {
        key: k.id,
        class: ne({ selected: o.value.picked.includes(k.id) })
      }, [
        a("input", {
          type: e.response.multiple ? "checkbox" : "radio",
          name: "answer-choice",
          checked: o.value.picked.includes(k.id),
          onChange: ($) => u(k.id)
        }, null, 40, ea),
        a("span", ta, s(String.fromCharCode(65 + h)), 1),
        a("span", null, s(k.text), 1)
      ], 2))), 128))])) : e.response.kind === "order" ? (t(), i("ol", aa, [(t(!0), i(A, null, D(o.value.order, (k, h) => (t(), i("li", { key: k }, [
        a("span", null, s(e.response.options.find(($) => $.id === k)?.text), 1),
        a("button", {
          type: "button",
          disabled: h === 0,
          "aria-label": `上移第 ${h + 1} 项`,
          onClick: ($) => c(h, -1)
        }, "↑", 8, na),
        a("button", {
          type: "button",
          disabled: h === o.value.order.length - 1,
          "aria-label": `下移第 ${h + 1} 项`,
          onClick: ($) => c(h, 1)
        }, "↓", 8, ia)
      ]))), 128))])) : e.response.kind === "match" ? (t(), i("div", la, [(t(!0), i(A, null, D(e.response.left, (k) => (t(), i("label", { key: k.id }, [G(s(k.text) + " ", 1), ee(a("select", { "onUpdate:modelValue": (h) => o.value.values[k.id] = h }, [f[1] || (f[1] = a("option", { value: "" }, "选择对应项", -1)), (t(!0), i(A, null, D(e.response.right, (h) => (t(), i("option", {
        key: h.id,
        value: h.id
      }, s(h.text), 9, ra))), 128))], 8, sa), [[Te, o.value.values[k.id]]])]))), 128))])) : e.response.kind === "evidence" ? (t(), i("div", oa, [(t(!0), i(A, null, D(e.paragraphs, (k) => (t(), i("label", {
        key: k.id,
        class: ne({ selected: o.value.picked.includes(k.id) })
      }, [a("input", {
        type: "checkbox",
        checked: o.value.picked.includes(k.id),
        onChange: (h) => u(k.id)
      }, null, 40, ua), a("span", null, s(k.text), 1)], 2))), 128)), e.paragraphs.length ? g("", !0) : (t(), i("p", da, "请先展开相关文稿，再选择原文依据。"))])) : e.response.kind === "gaps" ? (t(), i("div", va, [(t(!0), i(A, null, D(e.response.slots, (k) => (t(), i("label", { key: k.id }, [G(s(k.text), 1), ee(a("input", {
        "onUpdate:modelValue": (h) => o.value.values[k.id] = h,
        type: "text",
        maxlength: "4000",
        autocomplete: "off"
      }, null, 8, ca), [[le, o.value.values[k.id]]])]))), 128))])) : (t(), i("label", ga, [f[2] || (f[2] = a("span", { class: "learning-sr-only" }, "你的回答", -1)), ee(a("textarea", {
        "onUpdate:modelValue": f[0] || (f[0] = (k) => o.value.text = k),
        rows: "6",
        maxlength: "4000",
        placeholder: "写下你的回答…"
      }, null, 512), [[le, o.value.text], [r(Oe), o.value]])])),
      a("button", {
        class: "learning-primary",
        type: "submit",
        disabled: !y.value
      }, "交给语伴 →", 8, ma)
    ], 8, Xt)], 32));
  }
}), $t = pa, wt = 2e3, ba = ["stroke-width"], fa = ["d"], ya = /* @__PURE__ */ Q({
  __name: "LearningIcon",
  props: { name: {} },
  setup(e) {
    const m = {
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
    }, [a("path", { d: m[e.name] }, null, 8, fa)], 8, ba));
  }
}), z = ya, Ie = Object.freeze({
  select: "引用这段",
  ask: "问语伴",
  listen: "朗读",
  dismiss: "取消引用"
});
function ka(e, m, l) {
  if (!l?.rangeCount || l.isCollapsed) return null;
  const n = l.getRangeAt(0), o = n.startContainer, u = (o instanceof Element ? o : o.parentElement)?.closest("[data-learning-text]");
  if (!u || !e.contains(u) || !u.contains(n.endContainer)) return null;
  const c = m.find((k) => k.id === u.dataset.materialId), y = c?.paragraphs.find((k) => k.id === u.dataset.paragraphId);
  if (!c || !y) return null;
  const w = n.cloneRange();
  w.selectNodeContents(u), w.setEnd(n.startContainer, n.startOffset);
  const b = w.toString().length, f = n.toString();
  return !f.trim() || [...f].length > 2e3 || y.text.slice(b, b + f.length) !== f ? null : {
    materialId: c.id,
    paragraphId: y.id,
    start: b,
    end: b + f.length,
    quote: f
  };
}
function xt(e, m, l) {
  const n = () => {
    if (!e.value) return;
    const o = ka(e.value, m(), window.getSelection());
    o && l(o);
  };
  ye(() => document.addEventListener("selectionchange", n)), ke(() => document.removeEventListener("selectionchange", n));
}
var ha = { class: "learning-source" }, $a = { key: 0 }, wa = ["href"], xa = {
  key: 0,
  class: "learning-listening-cover"
}, Ca = ["disabled"], Ia = {
  key: 1,
  class: "learning-material-body"
}, La = ["data-material-id", "data-paragraph-id"], Sa = ["disabled", "onClick"], Aa = {
  class: "learning-audio-parts",
  "aria-label": "材料朗读分段"
}, Ra = ["disabled", "onClick"], Ma = { key: 2 }, Ta = /* @__PURE__ */ Q({
  __name: "MaterialReader",
  props: {
    material: {},
    disabled: { type: Boolean },
    exerciseId: {}
  },
  emits: ["action", "select"],
  setup(e, { emit: m }) {
    const l = e, n = m, o = H(null);
    xt(o, () => [l.material], (c) => n("select", c));
    function u(c) {
      n("select", {
        materialId: l.material.id,
        paragraphId: c.id,
        start: 0,
        end: c.text.length,
        quote: c.text
      });
    }
    return (c, y) => (t(), i("article", {
      ref_key: "root",
      ref: o,
      class: "learning-material"
    }, [
      a("h2", null, s(e.material.title), 1),
      a("div", ha, [e.material.provenance.kind === "authored" ? (t(), i("span", $a, "语伴自编练习")) : (t(), i("a", {
        key: 1,
        href: e.material.provenance.url,
        target: "_blank",
        rel: "noopener noreferrer"
      }, s(e.material.provenance.kind === "original" ? "原文节选" : "改编自") + " · " + s(e.material.provenance.title) + " ↗", 9, wa))]),
      e.material.hidden ? (t(), i("div", xa, [y[1] || (y[1] = a("svg", {
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
        onClick: y[0] || (y[0] = (w) => n("action", "reveal", {
          kind: "transcripts",
          id: e.material.id
        }))
      }, "看文稿", 8, Ca)])) : (t(), i("div", Ia, [(t(!0), i(A, null, D(e.material.paragraphs, (w) => (t(), i("div", {
        key: w.id,
        class: "learning-paragraph"
      }, [a("p", {
        tabindex: "0",
        "data-learning-text": "",
        "data-material-id": e.material.id,
        "data-paragraph-id": w.id
      }, s(w.text), 9, La), a("button", {
        type: "button",
        disabled: [...w.text].length > r(wt),
        onClick: (b) => u(w)
      }, s(r(Ie).select), 9, Sa)]))), 128))])),
      a("div", Aa, [(t(!0), i(A, null, D(e.material.parts, (w) => (t(), i("button", {
        key: w.key,
        type: "button",
        disabled: e.disabled,
        onClick: (b) => n("action", "play", {
          materialId: e.material.id,
          partKey: w.key,
          exerciseId: e.exerciseId
        })
      }, [F(z, { name: "play" }), G(s(e.material.parts.length > 1 ? `听第 ${w.number} 段` : "播放朗读"), 1)], 8, Ra))), 128))]),
      e.material.parts.length ? (t(), i("small", Ma, "TTS 合成朗读")) : g("", !0)
    ], 512));
  }
}), ot = Ta;
function ze(e, m, l = []) {
  const n = (o) => m.kind === "choice" || m.kind === "order" ? m.options.find((u) => u.id === o)?.text ?? o : l.find((u) => u.id === o)?.text ?? o;
  return e.kind === "text" ? e.text : e.kind === "gaps" ? e.values.map((o) => `${m.kind === "gaps" ? m.slots.find((u) => u.id === o.id)?.text ?? "" : ""} ${o.text}`).join(`
`) : e.kind === "match" ? e.pairs.map((o) => m.kind === "match" ? `${m.left.find((u) => u.id === o.left)?.text} → ${m.right.find((u) => u.id === o.right)?.text}` : "").join(`
`) : e.ids.map(n).join(e.kind === "order" ? " → " : `
`);
}
var Ea = { class: "learning-feedback" }, Na = { class: "learning-muted" }, Ba = { key: 0 }, Oa = { key: 1 }, qa = { key: 0 }, Va = { key: 1 }, Pa = { key: 2 }, Ua = {
  key: 3,
  class: "learning-muted"
}, ja = ["disabled"], Da = ["disabled"], Wa = /* @__PURE__ */ Q({
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
    const m = {
      correct: "答对了",
      partial: "已经掌握一部分",
      incorrect: "一起把这里弄懂",
      disputed: "这处还需复核"
    };
    return (l, n) => (t(), i("section", Ea, [
      n[6] || (n[6] = a("p", { class: "learning-eyebrow" }, "已保存的原答", -1)),
      a("blockquote", null, s(r(ze)(e.attempt.answer, e.response, e.paragraphs)), 1),
      a("small", Na, [
        G(s(e.attempt.help.feedback ? "得到反馈后的再练" : e.attempt.help.answer || e.attempt.help.hint || e.attempt.help.transcript ? "这次有辅助" : "未使用答案或提示"), 1),
        e.attempt.help.replays ? (t(), i("span", Ba, " · 重听 " + s(e.attempt.help.replays) + " 次", 1)) : g("", !0),
        e.attempt.help.slowPlayback ? (t(), i("span", Oa, " · 慢放")) : g("", !0)
      ]),
      e.feedback ? (t(), i(A, { key: 0 }, [
        a("h3", null, s(m[e.feedback.verdict]), 1),
        e.feedback.understanding ? (t(), i("p", qa, [n[2] || (n[2] = a("b", null, "理解", -1)), G(s(e.feedback.understanding), 1)])) : g("", !0),
        e.feedback.expression ? (t(), i("p", Va, [n[3] || (n[3] = a("b", null, "表达", -1)), G(s(e.feedback.expression), 1)])) : g("", !0),
        e.feedback.guidance ? (t(), i("p", Pa, [n[4] || (n[4] = a("b", null, "批注", -1)), G(s(e.feedback.guidance), 1)])) : g("", !0),
        e.revised ? (t(), i("small", Ua, "这篇已有修改稿，结果以修改稿的批改为准。")) : (t(), i("button", {
          key: 4,
          type: "button",
          disabled: e.disabled,
          onClick: n[0] || (n[0] = (o) => l.$emit("action", "assess", {
            attemptId: e.attempt.id,
            review: !0,
            message: "请重新审视我的原答与题目。也请考虑其他有效表达，不只对照原来的答案键。"
          }))
        }, s(e.feedback.verdict === "disputed" ? "请语伴复核" : "有疑问，请复核"), 9, ja))
      ], 64)) : (t(), i(A, { key: 1 }, [n[5] || (n[5] = a("p", null, "原答已保存，等待语伴评估。", -1)), a("button", {
        type: "button",
        disabled: e.disabled,
        onClick: n[1] || (n[1] = (o) => l.$emit("action", "assess", {
          attemptId: e.attempt.id,
          review: !1,
          message: "请评估这条已经保存的原答。"
        }))
      }, "重试评估", 8, Da)], 64))
    ]));
  }
}), Ct = Wa, It = {
  busy: "上一件事还没做完，等它完成后再试一次吧。这次没有开始。",
  notSent: "这次没有发出去，输入的内容还在。请再试一次。",
  rejected: "这次操作未能完成，请查看最新状态后再继续。",
  unknown: "还没收到确认，操作可能仍在继续。请先查看最新状态，不要重复发送。",
  refresh: "查看最新状态"
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
}, Fa = {
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
}, Lt = {
  unassessed: "还没练过",
  review: "待确认",
  independent: "已能独立使用",
  practised: "练过一次",
  strengthen: "再练练"
}, St = (e) => `${e} 次作答`, At = (e) => `${e} 个知识点可以温习了`, Ge = {
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
}, ut = {
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
}, Ga = {
  key: 0,
  class: "learning-player",
  "aria-label": "课堂朗读"
}, Ha = {
  key: 0,
  role: "status"
}, za = {
  key: 2,
  class: "learning-row"
}, Ya = ["aria-label", "disabled"], Ka = ["max", "value"], Za = /* @__PURE__ */ Q({
  __name: "LearningPlayer",
  props: { state: {} },
  emits: ["action"],
  setup(e, { emit: m }) {
    const l = m;
    function n(o) {
      return `${Math.floor(o / 60)}:${String(Math.floor(o % 60)).padStart(2, "0")}`;
    }
    return (o, u) => e.state.media.status !== "idle" ? (t(), i("section", Ga, [
      e.state.media.message ? (t(), i("p", Ha, s(e.state.media.message), 1)) : g("", !0),
      e.state.voices.enabled ? g("", !0) : (t(), i("button", {
        key: 1,
        type: "button",
        onClick: u[0] || (u[0] = (c) => l("action", "tts-settings"))
      }, s(r(Ge).enable), 1)),
      e.state.media.key ? (t(), i("div", za, [
        F(z, { name: "sound" }),
        a("span", null, s(e.state.media.status === "loading" ? "正在生成声音…" : `${n(e.state.media.position)} / ${n(e.state.media.duration)}`), 1),
        e.state.media.status === "playing" ? (t(), i("button", {
          key: 0,
          type: "button",
          "aria-label": "暂停",
          onClick: u[1] || (u[1] = (c) => l("action", "pause"))
        }, [F(z, { name: "pause" })])) : [
          "paused",
          "ended",
          "blocked"
        ].includes(e.state.media.status) ? (t(), i("button", {
          key: 1,
          type: "button",
          "aria-label": e.state.media.status === "ended" ? "再听一遍" : "继续播放",
          disabled: e.state.busy,
          onClick: u[2] || (u[2] = (c) => l("action", "resume"))
        }, [F(z, { name: "play" })], 8, Ya)) : g("", !0),
        a("button", {
          type: "button",
          "aria-label": "停止",
          onClick: u[3] || (u[3] = (c) => l("action", "stop"))
        }, [F(z, { name: "stop" })]),
        e.state.media.duration ? (t(), i("button", {
          key: 2,
          type: "button",
          onClick: u[4] || (u[4] = (c) => l("action", "rate", { value: e.state.media.rate === 1 ? 0.75 : 1 }))
        }, s(e.state.media.rate) + "×", 1)) : g("", !0)
      ])) : g("", !0),
      e.state.media.duration ? (t(), i("input", {
        key: 3,
        type: "range",
        min: "0",
        max: e.state.media.duration,
        step: "0.1",
        value: e.state.media.position,
        "aria-label": "当前声音片段播放位置",
        onChange: u[5] || (u[5] = (c) => l("action", "seek", { value: Number(c.target.value) }))
      }, null, 40, Ka)) : g("", !0)
    ])) : g("", !0);
  }
}), Rt = Za, Ja = { class: "learning-selection" }, Qa = { class: "learning-row" }, Xa = ["disabled"], _a = /* @__PURE__ */ Q({
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
    return (m, l) => (t(), i("div", Ja, [a("blockquote", null, s(e.selection.quote), 1), a("div", Qa, [
      a("button", {
        type: "button",
        onClick: l[0] || (l[0] = (n) => m.$emit("ask"))
      }, s(r(Ie).ask), 1),
      a("button", {
        type: "button",
        disabled: e.disabled || [...e.selection.quote].length > 1e3,
        onClick: l[1] || (l[1] = (n) => m.$emit("say"))
      }, s(r(Ie).listen), 9, Xa),
      a("button", {
        type: "button",
        onClick: l[2] || (l[2] = (n) => m.$emit("dismiss"))
      }, s(r(Ie).dismiss), 1)
    ])]));
  }
}), Mt = _a;
function Ne(e) {
  return {
    picked: [],
    text: "",
    values: {},
    order: e.kind === "order" ? e.options.map((m) => m.id) : []
  };
}
function dt(e, m) {
  const l = Ne(m);
  return !!e.text.trim() || !!e.picked.length || Object.values(e.values).some((n) => !!n.trim()) || e.order.length !== l.order.length || e.order.some((n, o) => n !== l.order[o]);
}
function Tt(e) {
  const m = (l) => l.trim() || null;
  return {
    exam: m(e.exam),
    level: m(e.level),
    targetLevel: m(e.targetLevel),
    explanationLanguage: e.explanationLanguage,
    interests: m(e.interests)
  };
}
var vt = () => ({
  text: "",
  cursor: void 0,
  focus: null,
  sent: null,
  scroll: 0,
  following: !0
});
function en() {
  const e = fe({}), m = fe(vt()), l = fe({
    open: !1,
    form: {
      exam: "",
      level: "",
      targetLevel: "",
      explanationLanguage: "zh-CN",
      interests: ""
    },
    submitted: null
  }), n = fe({ enabled: !1 }), o = fe({
    step: 0,
    name: "",
    note: ""
  }), u = fe({
    tab: "grammar",
    reason: ""
  });
  return {
    units: e,
    chat: m,
    settings: l,
    companion: n,
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
      Object.assign(m, vt()), l.open = !1, l.submitted = null, n.enabled = !1, c || Object.assign(o, {
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
      y && c.storage === "ready" && !c.busy && c.profile && Object.entries(y.value).every(([b, f]) => c.profile.settings[b] === f) && (Object.entries(y.form).every(([b, f]) => l.form[b] === f) && (l.open = !1), l.submitted = null);
      for (const b of Object.keys(e)) {
        const f = [c.unit, c.review].find((h) => h?.id === b);
        if (!f) {
          delete e[b];
          continue;
        }
        for (const [h, $] of Object.entries(e[b].activityDrafts)) {
          const v = f.attempts.filter((d) => d.exerciseId === h).at(-1);
          if ($.submitted && v && v.id !== $.submitted.before) {
            delete e[b].activityDrafts[h];
            const d = e[b].activities[`exercise:${h}`];
            d && (d.retry = !1);
          }
        }
        const k = e[b].selection;
        k && f.materials.find((h) => h.id === k.materialId)?.paragraphs.find((h) => h.id === k.paragraphId)?.text.slice(k.start, k.end) !== k.quote && (e[b].selection = null);
        for (const [h, $] of Object.entries(e[b].writing)) {
          const v = f.attempts.filter((C) => C.exerciseId === h && !C.revisesAttemptId).at(-1), d = $.submitted;
          !d || !v || v.id === d.before || ($.text === d.text && v.answer.kind === "text" && v.answer.text === d.text.trim() ? ($.text = "", $.rewriting = !1) : $.rewriting = !0, $.submitted = null);
        }
      }
      const w = m.sent;
      w && c.conversation.turns.some((b, f) => f + c.conversation.removedTurns >= w.after && (b.purpose === "talk" || b.purpose === "explain") && b.user === w.user) && (m.text === w.text && (m.text = "", m.focus = null), m.sent = null);
    }
  };
}
var Et = /* @__PURE__ */ Symbol("learning-ui-session");
function tn(e, m) {
  if (e.chat.text.trim() || e.settings.open && Object.entries(Tt(e.settings.form)).some(([l, n]) => m.profile?.settings[l] !== n) || e.setup.step === 1 && e.setup.name.trim() && (e.setup.name.trim() !== m.teacher?.name || e.setup.note.trim() !== m.teacher.note)) return !0;
  for (const l of [m.unit, m.review]) {
    const n = l && e.units[l.id];
    if (!(!l || !n)) {
      if (Object.values(n.writing).some((o) => !!o.text.trim()) || l.stage.stage === "revising" && l.assessments.some((o) => o.annotations?.some((u) => n.edits[u.id] && n.edits[u.id].value !== u.quote))) return !0;
      for (const o of l.exercises) {
        const u = n.activityDrafts[o.id]?.value, c = n.review.drafts[o.id];
        if (u && dt(u, o.response) || c && !l.attempts.some((y) => y.exerciseId === o.id) && dt(c, o.response)) return !0;
      }
    }
  }
  return !1;
}
function an(e) {
  const m = en();
  return Ft(Et, m), Y([
    () => e.value.chatIdentity,
    () => e.value.language,
    () => e.value.teacher?.name
  ], (l, n) => m.reset(l[0] === n[0])), Y(() => e.value, (l) => m.reconcile(l), { immediate: !0 }), Y(() => e.value.currentUnitId, () => {
    m.chat.focus = null;
  }), Y(() => tn(m, e.value), (l, n, o) => {
    if (!l) return;
    const u = (c) => {
      c.preventDefault(), c.returnValue = "";
    };
    window.addEventListener("beforeunload", u), o(() => window.removeEventListener("beforeunload", u));
  }, { immediate: !0 }), m;
}
function he() {
  const e = Wt(Et);
  if (!e) throw new Error("Learning views require their application session");
  return e;
}
function $e(e) {
  const m = he();
  return I(() => m.unit(e()));
}
var nn = ["onKeydown"], ln = {
  role: "dialog",
  "aria-labelledby": "learning-activity-title",
  class: "learning-activity"
}, sn = { class: "learning-activity-header" }, rn = { id: "learning-activity-title" }, on = {
  key: 0,
  "aria-label": "完成本课的固定奖励"
}, un = {
  key: 0,
  class: "learning-margin-note",
  role: "status"
}, dn = ["open"], vn = {
  key: 3,
  class: "learning-question"
}, cn = { class: "learning-help-actions" }, gn = ["disabled"], mn = ["disabled"], pn = ["disabled"], bn = {
  key: 0,
  class: "learning-margin-note"
}, fn = {
  key: 1,
  class: "learning-margin-note"
}, yn = { key: 0 }, kn = { key: 1 }, hn = { key: 2 }, $n = ["disabled"], wn = /* @__PURE__ */ Q({
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
  setup(e, { emit: m }) {
    const l = e, n = m, o = H(null), u = $e(() => l.target.unitId), c = I(() => `${l.target.kind}:${l.target.id}`);
    Y([u, c], () => {
      u.value.activities[c.value] ??= {
        scroll: 0,
        selected: null,
        retry: !1,
        materialsOpen: !1
      };
    }, { immediate: !0 });
    const y = I(() => u.value.activities[c.value]), w = H(null), b = I({
      get: () => y.value.retry,
      set: (R) => {
        y.value.retry = R;
      }
    }), f = I({
      get: () => y.value.selected,
      set: (R) => {
        y.value.selected = R;
      }
    }), k = H(null);
    function h() {
      f.value ? f.value = null : b.value ? b.value = !1 : n("close");
    }
    ht(k, h);
    const $ = I(() => u.value.activityDrafts);
    let v = null;
    const d = I(() => l.target?.kind === "exercise" ? l.state.unit?.exercises.find((R) => R.id === l.target?.id) : void 0), C = I(() => l.state.unit?.materials.filter((R) => l.target?.kind === "material" ? R.id === l.target.id : d.value?.materialIds.includes(R.id)) ?? []), E = I(() => d.value?.id ?? l.state.unit?.exercises.find((R) => R.skill === "listening" && R.materialIds.includes(l.target?.id ?? ""))?.id ?? l.state.unit?.exercises.find((R) => R.materialIds.includes(l.target?.id ?? ""))?.id), M = I(() => C.value.filter((R) => d.value?.response.kind !== "evidence" || R.id === d.value.response.materialId).flatMap((R) => R.paragraphs)), T = I(() => l.state.unit?.attempts.filter((R) => R.exerciseId === d.value?.id).at(-1)), j = I(() => l.state.unit?.assessments.find((R) => R.attemptId === T.value?.id));
    Y(() => d.value, (R) => {
      if (!R) return;
      const P = JSON.stringify(R.response);
      $.value[R.id]?.response !== P && ($.value[R.id] = {
        response: P,
        value: Ne(R.response)
      });
    }, { immediate: !0 });
    const q = I({
      get: () => $.value[d.value.id].value,
      set: (R) => {
        $.value[d.value.id].value = R;
      }
    });
    ye(() => {
      w.value?.focus({ preventScroll: !0 }), o.value && (o.value.scrollTop = y.value.scroll);
    }), ke(() => {
      o.value && (y.value.scroll = o.value.scrollTop);
    }), Y(() => l.state.unit?.attempts, (R) => {
      if (!v) return;
      const P = R?.filter((W) => W.exerciseId === v.id).at(-1);
      if (P && P.id !== v.before) {
        const W = l.target?.kind === "exercise" && l.target.id === v.id;
        delete $.value[v.id], v = null, W && n("close");
      }
    });
    function V(R) {
      v = {
        id: d.value.id,
        before: T.value?.id
      }, $.value[d.value.id].submitted = { before: T.value?.id }, n("action", "submit", {
        unitId: l.state.unit.id,
        exerciseId: d.value.id,
        answer: R
      });
    }
    return (R, P) => (t(), i("div", {
      ref_key: "layer",
      ref: k,
      class: "learning-activity-shade",
      onKeydown: be(ae(h, ["stop", "prevent"]), ["esc"])
    }, [a("section", ln, [
      a("header", sn, [
        a("h2", rn, s(d.value ? "练习" : C.value[0]?.title ?? "材料"), 1),
        e.state.unit ? (t(), i("small", on, "+" + s(e.state.unit.reward.amount) + " 币", 1)) : g("", !0),
        a("button", {
          ref_key: "closeButton",
          ref: w,
          type: "button",
          "aria-label": "收起课件",
          onClick: P[0] || (P[0] = (W) => n("close"))
        }, [P[18] || (P[18] = G("收起", -1)), F(z, { name: "back" })], 512)
      ]),
      e.state.message && !e.state.busy ? (t(), i("p", un, s(e.state.message), 1)) : g("", !0),
      a("div", {
        ref_key: "body",
        ref: o,
        class: "learning-activity-body"
      }, [
        d.value && C.value.length ? (t(), i("details", {
          key: 0,
          class: "learning-activity-materials",
          open: y.value.materialsOpen,
          onToggle: P[3] || (P[3] = (W) => y.value.materialsOpen = W.target.open)
        }, [a("summary", null, "阅读材料 · " + s(C.value.length), 1), (t(!0), i(A, null, D(C.value, (W) => (t(), K(ot, {
          key: W.id,
          material: W,
          "exercise-id": E.value,
          disabled: e.disabled,
          onAction: P[1] || (P[1] = (B, O) => n("action", B, O)),
          onSelect: P[2] || (P[2] = (B) => f.value = B)
        }, null, 8, [
          "material",
          "exercise-id",
          "disabled"
        ]))), 128))], 40, dn)) : d.value ? g("", !0) : (t(!0), i(A, { key: 1 }, D(C.value, (W) => (t(), K(ot, {
          key: W.id,
          material: W,
          "exercise-id": E.value,
          disabled: e.disabled,
          onAction: P[4] || (P[4] = (B, O) => n("action", B, O)),
          onSelect: P[5] || (P[5] = (B) => f.value = B)
        }, null, 8, [
          "material",
          "exercise-id",
          "disabled"
        ]))), 128)),
        f.value ? (t(), K(Mt, {
          key: 2,
          selection: f.value,
          disabled: e.disabled,
          onAsk: P[6] || (P[6] = (W) => n("ask", E.value, f.value)),
          onSay: P[7] || (P[7] = (W) => n("action", "say", { selection: f.value })),
          onDismiss: P[8] || (P[8] = (W) => f.value = null)
        }, null, 8, ["selection", "disabled"])) : g("", !0),
        d.value ? (t(), i("section", vn, [
          a("h2", null, s(d.value.prompt), 1),
          a("div", cn, [
            a("button", {
              type: "button",
              disabled: e.disabled || [...d.value.prompt].length > 1e3,
              onClick: P[9] || (P[9] = (W) => n("action", "say-question", { exerciseId: d.value.id }))
            }, "听题干", 8, gn),
            d.value.hasHint ? (t(), i("button", {
              key: 0,
              type: "button",
              disabled: e.disabled || d.value.hint !== null,
              onClick: P[10] || (P[10] = (W) => n("action", "reveal", {
                kind: "hints",
                id: d.value.id
              }))
            }, "提示", 8, mn)) : g("", !0),
            a("button", {
              type: "button",
              disabled: e.disabled || d.value.solution !== null,
              onClick: P[11] || (P[11] = (W) => n("action", "reveal", {
                kind: "answers",
                id: d.value.id
              }))
            }, "解答", 8, pn),
            a("button", {
              type: "button",
              onClick: P[12] || (P[12] = (W) => n("ask", d.value.id))
            }, "问语伴")
          ]),
          d.value.hint ? (t(), i("p", bn, s(d.value.hint), 1)) : g("", !0),
          d.value.solution ? (t(), i("div", fn, [d.value.solution.kind === "exact" ? (t(), i("p", yn, s(r(ze)(d.value.solution.answer, d.value.response, M.value)), 1)) : d.value.solution.kind === "gaps" ? (t(), i("p", kn, s(d.value.solution.accepted.map((W) => W.forms.join(" / ")).join(`
`)), 1)) : g("", !0), d.value.solution.kind !== "semantic" ? (t(), i("p", hn, s(d.value.solution.explanation), 1)) : (t(), i("button", {
            key: 3,
            type: "button",
            onClick: P[13] || (P[13] = (W) => n("ask", d.value.id))
          }, "请语伴讲解"))])) : g("", !0),
          (!T.value || b.value) && $.value[d.value.id] ? (t(), K($t, {
            key: d.value.id,
            modelValue: q.value,
            "onUpdate:modelValue": P[14] || (P[14] = (W) => q.value = W),
            response: d.value.response,
            paragraphs: M.value,
            disabled: e.disabled,
            onSubmit: V
          }, null, 8, [
            "modelValue",
            "response",
            "paragraphs",
            "disabled"
          ])) : g("", !0),
          T.value ? (t(), K(Ct, {
            key: 3,
            attempt: T.value,
            feedback: j.value,
            response: d.value.response,
            paragraphs: M.value,
            disabled: e.disabled,
            revised: !!e.state.unit?.attempts.some((W) => W.revisesAttemptId === T.value?.id),
            onAction: P[15] || (P[15] = (W, B) => {
              n("action", W, B), n("close");
            })
          }, null, 8, [
            "attempt",
            "feedback",
            "response",
            "paragraphs",
            "disabled",
            "revised"
          ])) : g("", !0),
          T.value ? (t(), i("button", {
            key: 4,
            type: "button",
            disabled: e.disabled,
            onClick: P[16] || (P[16] = (W) => {
              b.value = !b.value, $.value[d.value.id] ??= {
                response: JSON.stringify(d.value.response),
                value: r(Ne)(d.value.response)
              };
            })
          }, s(b.value ? "收起再练" : "再试一次"), 9, $n)) : g("", !0)
        ])) : g("", !0)
      ], 512),
      F(Rt, {
        state: e.state,
        onAction: P[17] || (P[17] = (W, B) => n("action", W, B))
      }, null, 8, ["state"])
    ])], 40, nn));
  }
}), xn = wn, Cn = 864e5;
function ct(e, m) {
  return /^(zh|ja|ko)\b/iu.test(m) ? {
    count: [...e.replace(/[\s\p{P}\p{S}]/gu, "")].length,
    unit: "字"
  } : {
    count: e.match(/[\p{L}\p{N}][\p{L}\p{N}\p{M}'’-]*/gu)?.length ?? 0,
    unit: "词"
  };
}
function Nt(e, m) {
  const l = [], n = /* @__PURE__ */ new Map();
  for (const o of m)
    if (o.quote)
      for (let u = e.indexOf(o.quote); u >= 0; u = e.indexOf(o.quote, u + 1)) {
        const c = u + o.quote.length;
        if (!l.some(([y, w]) => u < w && y < c)) {
          l.push([u, c]), n.set(o.id, u);
          break;
        }
      }
  return n;
}
function In(e, m) {
  const l = e.split(/(\r?\n)/u), n = [];
  l.forEach((b, f) => {
    f % 2 === 0 && b.trim() && n.push(f);
  });
  const o = [], u = [], c = /* @__PURE__ */ new Map();
  for (const b of m) c.set(b.paragraphIndex, [...c.get(b.paragraphIndex) ?? [], b]);
  for (const [b, f] of c) {
    const k = n[b];
    if (k === void 0) {
      o.push(...f.map((d) => d.id));
      continue;
    }
    const h = Nt(l[k], f), $ = f.filter((d) => h.has(d.id)).sort((d, C) => h.get(C.id) - h.get(d.id));
    let v = l[k];
    for (const d of $) {
      const C = h.get(d.id);
      v = v.slice(0, C) + d.replacement + v.slice(C + d.quote.length), d.replacement !== d.quote && u.push(d.id);
    }
    l[k] = v, o.push(...f.filter((d) => !h.has(d.id)).map((d) => d.id));
  }
  const y = new Map(m.map((b, f) => [b.id, f])), w = (b, f) => y.get(b) - y.get(f);
  return {
    text: l.join(""),
    missing: o.sort(w),
    applied: u.sort(w)
  };
}
function Ln(e, m) {
  const l = Nt(e, m), n = m.filter((c) => l.has(c.id)).map((c) => ({
    id: c.id,
    start: l.get(c.id),
    length: c.quote.length
  })).sort((c, y) => c.start - y.start), o = [];
  let u = 0;
  for (const c of n)
    c.start > u && o.push({ text: e.slice(u, c.start) }), o.push({
      text: e.slice(c.start, c.start + c.length),
      id: c.id
    }), u = c.start + c.length;
  return (u < e.length || !o.length) && o.push({ text: e.slice(u) }), o;
}
function Sn(e, m = "xiaobai-learning-seen-units") {
  const l = /* @__PURE__ */ new Set(), n = () => {
    try {
      const o = JSON.parse(e()?.getItem(m) ?? "[]");
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
        e()?.setItem(m, JSON.stringify([.../* @__PURE__ */ new Set([...n(), o])].slice(-50)));
      } catch {
      }
    }
  };
}
var An = () => {
  try {
    return globalThis.localStorage;
  } catch {
    return null;
  }
}, gt = Sn(An);
function Ye(e, m = Date.now()) {
  const l = new Date(e), n = new Date(m), o = Math.round((Date.UTC(l.getFullYear(), l.getMonth(), l.getDate()) - Date.UTC(n.getFullYear(), n.getMonth(), n.getDate())) / Cn);
  return !Number.isFinite(o) || o <= 0 ? "今天复习" : o === 1 ? "明天再见" : `${o} 天后再见`;
}
var Rn = { class: "learning-records-page" }, Mn = {
  key: 0,
  class: "learning-page-heading"
}, Tn = {
  key: 0,
  class: "learning-muted"
}, En = { class: "learning-muted" }, Nn = {
  key: 0,
  class: "learning-muted"
}, Bn = ["disabled", "onClick"], On = ["disabled"], qn = {
  key: 0,
  class: "learning-empty-note"
}, Vn = ["disabled", "onClick"], Pn = ["title"], Un = {
  key: 1,
  class: "learning-row"
}, jn = ["disabled"], Dn = { class: "learning-muted" }, Wn = ["disabled"], Fn = /* @__PURE__ */ Q({
  __name: "LearningRecords",
  props: {
    state: {},
    disabled: { type: Boolean },
    embedded: { type: Boolean }
  },
  emits: ["action", "remove"],
  setup(e, { emit: m }) {
    const l = e, n = m;
    Ee(() => l.state.record ? (n("action", "records", { offset: l.state.records.offset }), !0) : !1);
    const o = {
      deleteAnswer: "删除这次作答",
      deleteRecord: "删除记录",
      answerWarning: "这次作答和对应的反馈会删除，相关知识点的掌握情况会更新。已到账奖励保留。",
      recordWarning: "这条学习记录会删除，仅属于它的历史作答也会删除。当前练习不受影响。",
      hidden: "听力原文暂未显示，下面是你的作答和点评。"
    };
    return (u, c) => (t(), i("section", Rn, [!e.embedded || e.state.record ? (t(), i("div", Mn, [c[5] || (c[5] = a("h1", null, "学习记录", -1)), e.state.records.total ? (t(), i("span", Tn, s(e.state.records.total) + " 项", 1)) : g("", !0)])) : g("", !0), e.state.record ? (t(), i(A, { key: 1 }, [
      a("button", {
        type: "button",
        onClick: c[0] || (c[0] = (y) => u.$emit("action", "records", { offset: e.state.records.offset }))
      }, "‹ 返回记录"),
      a("h2", null, s(e.state.record.label), 1),
      (t(!0), i(A, null, D(e.state.record.evidence, (y) => (t(), i("article", {
        key: y.attempt.id,
        class: "learning-record-evidence"
      }, [
        a("p", En, s(new Date(y.attempt.submittedAt).toLocaleDateString()), 1),
        a("h3", null, s(y.exercise.prompt), 1),
        (t(!0), i(A, null, D(y.materials, (w) => (t(), i("details", { key: w.id }, [a("summary", null, s(w.title), 1), w.hidden ? (t(), i("p", Nn, s(o.hidden), 1)) : (t(!0), i(A, { key: 1 }, D(w.paragraphs, (b) => (t(), i("p", { key: b.id }, s(b.text), 1))), 128))]))), 128)),
        F(Ct, {
          attempt: y.attempt,
          feedback: y.assessment,
          response: y.exercise.response,
          paragraphs: y.materials.flatMap((w) => w.paragraphs),
          disabled: e.disabled,
          revised: !!e.state.unit?.attempts.some((w) => w.revisesAttemptId === y.attempt.id),
          onAction: c[1] || (c[1] = (w, b) => u.$emit("action", w, b))
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
          onClick: (w) => u.$emit("remove", "delete-attempt", { id: y.attempt.id }, o.answerWarning)
        }, s(o.deleteAnswer), 9, Bn)
      ]))), 128)),
      a("button", {
        type: "button",
        disabled: e.disabled,
        onClick: c[2] || (c[2] = (y) => u.$emit("remove", "delete-item", { id: e.state.record.id }, o.recordWarning))
      }, s(o.deleteRecord), 9, On)
    ], 64)) : (t(), i(A, { key: 2 }, [
      e.state.records.total ? g("", !0) : (t(), i("p", qn, "暂无学习记录")),
      (t(!0), i(A, null, D(e.state.records.items, (y) => (t(), i("button", {
        key: y.id,
        class: "learning-record-row",
        type: "button",
        disabled: !y.readable,
        onClick: (w) => u.$emit("action", "records", {
          id: y.id,
          offset: e.state.records.offset
        })
      }, [a("span", null, [a("strong", null, s(y.label), 1), a("small", null, [G(s(r(St)(y.evidenceCount)), 1), y.nextReviewAt ? (t(), i("span", {
        key: 0,
        title: y.scheduleReason ?? void 0
      }, " · " + s(r(Ye)(y.nextReviewAt)) + "（" + s(new Date(y.nextReviewAt).toLocaleDateString()) + "）", 9, Pn)) : g("", !0)])]), a("em", null, s(r(Lt)[y.state]), 1)], 8, Vn))), 128)),
      e.state.records.total > 30 ? (t(), i("div", Un, [
        a("button", {
          type: "button",
          disabled: e.state.records.offset === 0,
          onClick: c[3] || (c[3] = (y) => u.$emit("action", "records", { offset: Math.max(0, e.state.records.offset - 30) }))
        }, "上一页", 8, jn),
        a("span", Dn, s(e.state.records.total) + " 项", 1),
        a("button", {
          type: "button",
          disabled: e.state.records.offset + 30 >= e.state.records.total,
          onClick: c[4] || (c[4] = (y) => u.$emit("action", "records", { offset: e.state.records.offset + 30 }))
        }, "下一页", 8, Wn)
      ])) : g("", !0)
    ], 64))]));
  }
}), mt = Fn, Gn = { class: "learning-books-page" }, Hn = { class: "learning-page-heading" }, zn = {
  key: 0,
  class: "learning-due"
}, Yn = { key: 0 }, Kn = { key: 1 }, Zn = ["disabled"], Jn = {
  class: "learning-tabs",
  role: "tablist",
  "aria-label": "学习记录视图"
}, Qn = ["aria-selected", "onClick"], Xn = {
  key: 0,
  class: "learning-empty-note"
}, _n = { class: "learning-book-list" }, ei = ["disabled", "onClick"], ti = ["aria-expanded", "onClick"], ai = {
  key: 1,
  class: "learning-chip-reason"
}, ni = {
  key: 2,
  class: "learning-growth"
}, ii = {
  key: 0,
  class: "learning-empty-note"
}, li = { class: "learning-muted" }, si = { key: 0 }, ri = { key: 0 }, oi = { key: 1 }, ui = { key: 2 }, di = /* @__PURE__ */ Q({
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
  setup(e, { emit: m }) {
    const l = e, n = m, o = he().books, u = ve(o, "tab"), c = [
      ["grammar", "语法本"],
      ["vocabulary", "生词本"],
      ["growth", "成长"],
      ["all", "全部记录"]
    ], y = { title: "学习本" }, w = ve(o, "reason"), b = I(() => u.value === "grammar" || u.value === "vocabulary" ? l.state.books[u.value] : []), f = I(() => l.state.growth), k = I(() => !!l.state.review && l.state.review.stage.stage !== "complete");
    return (h, $) => (t(), i("section", Gn, [e.state.record ? (t(), K(mt, {
      key: 0,
      state: e.state,
      disabled: e.disabled,
      onAction: $[0] || ($[0] = (v, d) => n("action", v, d)),
      onRemove: $[1] || ($[1] = (v, d, C) => n("remove", v, d, C))
    }, null, 8, ["state", "disabled"])) : (t(), i(A, { key: 1 }, [
      a("div", Hn, [a("h1", null, s(y.title), 1)]),
      e.state.dueCount || k.value ? (t(), i("div", zn, [e.state.dueCount ? (t(), i("span", Yn, s(r(At)(e.state.dueCount)), 1)) : g("", !0), e.state.blockedReview ? (t(), i("small", Kn, "有一组复习在另一个故事中进行，回到学习页可以放下它")) : k.value ? (t(), i("button", {
        key: 3,
        type: "button",
        class: "learning-primary",
        onClick: $[3] || ($[3] = (v) => n("review"))
      }, s(r(J).resumeReview), 1)) : (t(), i("button", {
        key: 2,
        type: "button",
        class: "learning-primary",
        disabled: e.disabled,
        onClick: $[2] || ($[2] = (v) => n("action", "start-review"))
      }, s(r(J).review), 9, Zn))])) : g("", !0),
      a("div", Jn, [(t(), i(A, null, D(c, ([v, d]) => a("button", {
        key: v,
        type: "button",
        role: "tab",
        "aria-selected": u.value === v,
        onClick: (C) => {
          u.value = v, w.value = "";
        }
      }, s(d), 9, Qn)), 64))]),
      u.value === "grammar" || u.value === "vocabulary" ? (t(), i(A, { key: 1 }, [b.value.length ? g("", !0) : (t(), i("p", Xn, s(u.value === "grammar" ? "批改里出现的语法问题会记到这里。" : "批改里的词汇问题、读文章时收藏的词语会记到这里。"), 1)), a("ul", _n, [(t(!0), i(A, null, D(b.value, (v) => (t(), i("li", { key: v.id }, [
        a("button", {
          type: "button",
          class: "learning-book-item",
          disabled: !v.readable,
          onClick: (d) => n("action", "records", {
            id: v.id,
            offset: e.state.records.offset
          })
        }, [a("strong", null, s(v.label), 1), a("small", null, s(r(Lt)[v.state]) + " · " + s(r(St)(v.evidenceCount)), 1)], 8, ei),
        v.nextReviewAt ? (t(), i("button", {
          key: 0,
          type: "button",
          class: "learning-chip",
          "aria-expanded": w.value === v.id,
          onClick: (d) => w.value = w.value === v.id ? "" : v.id
        }, s(r(Ye)(v.nextReviewAt)), 9, ti)) : g("", !0),
        w.value === v.id ? (t(), i("small", ai, s(v.scheduleReason), 1)) : g("", !0)
      ]))), 128))])], 64)) : u.value === "growth" ? (t(), i("section", ni, [f.value.enough ? (t(), i(A, { key: 1 }, [
        a("p", li, [G("来自 " + s(f.value.evidence) + " 份作答", 1), f.value.completed ? (t(), i("span", si, "、" + s(f.value.completed) + " 次完成", 1)) : g("", !0)]),
        f.value.steady.length ? (t(), i("div", ri, [$[6] || ($[6] = a("h2", null, "已经稳定", -1)), a("p", null, s(f.value.steady.join("、")), 1)])) : g("", !0),
        f.value.practising.length ? (t(), i("div", oi, [$[7] || ($[7] = a("h2", null, "最近独立做对", -1)), a("p", null, s(f.value.practising.join("、")), 1)])) : g("", !0),
        f.value.struggling.length ? (t(), i("div", ui, [$[8] || ($[8] = a("h2", null, "还要再练", -1)), a("p", null, s(f.value.struggling.join("、")), 1)])) : g("", !0)
      ], 64)) : (t(), i("p", ii, "还需要几次练习才看得出"))])) : (t(), K(mt, {
        key: 3,
        embedded: "",
        state: e.state,
        disabled: e.disabled,
        onAction: $[4] || ($[4] = (v, d) => n("action", v, d)),
        onRemove: $[5] || ($[5] = (v, d, C) => n("remove", v, d, C))
      }, null, 8, ["state", "disabled"]))
    ], 64))]));
  }
}), vi = di, ci = {
  class: "learning-settings-card",
  "aria-label": "训练设置"
}, gi = { key: 0 }, mi = ["disabled"], pi = ["open"], bi = ["value"], fi = { class: "learning-row" }, yi = ["disabled"], ki = /* @__PURE__ */ Q({
  __name: "LearningSettingsCard",
  props: {
    state: {},
    disabled: { type: Boolean },
    onboarding: { type: Boolean }
  },
  emits: ["action"],
  setup(e, { emit: m }) {
    const l = e, n = m, o = [
      ["zh-CN", "中文"],
      ["en", "English"],
      ["ja", "日本語"],
      ["ko", "한국어"]
    ], u = I(() => l.state.profile?.settings ?? null), c = he().settings, y = c.form, w = ve(c, "open");
    function b() {
      Object.assign(y, {
        exam: u.value?.exam ?? "",
        level: u.value?.level ?? "",
        targetLevel: u.value?.targetLevel ?? "",
        explanationLanguage: u.value?.explanationLanguage ?? "zh-CN",
        interests: u.value?.interests ?? ""
      });
    }
    l.onboarding && !c.open && (b(), c.open = !0);
    const f = (v) => o.find(([d]) => d === v)?.[1] ?? new Intl.DisplayNames(["zh-CN"], { type: "language" }).of(v) ?? v, k = I(() => [.../* @__PURE__ */ new Set([...o.map(([v]) => v), u.value?.explanationLanguage ?? "zh-CN"])]), h = I(() => [
      ["考试", u.value?.exam || "不备考"],
      ["水平", u.value?.level || "不确定"],
      ["目标", u.value?.targetLevel || "比现在高一级"],
      ["讲解", f(u.value?.explanationLanguage ?? "zh-CN")],
      ["兴趣", u.value?.interests || "不限"]
    ]);
    function $() {
      const v = Tt(y);
      c.submitted = {
        value: v,
        form: { ...y }
      }, n("action", "settings", { value: v });
    }
    return (v, d) => (t(), i("section", ci, [w.value ? g("", !0) : (t(), i("dl", gi, [(t(!0), i(A, null, D(h.value, ([C, E]) => (t(), i("div", { key: C }, [a("dt", null, s(C), 1), a("dd", null, s(E), 1)]))), 128))])), w.value ? (t(), i("form", {
      key: 2,
      class: "learning-fields",
      onSubmit: ae($, ["prevent"])
    }, [
      a("label", null, [d[7] || (d[7] = G("考试", -1)), ee(a("input", {
        "onUpdate:modelValue": d[1] || (d[1] = (C) => r(y).exam = C),
        type: "text",
        maxlength: "80",
        placeholder: "不备考（例如 雅思、JLPT N2）"
      }, null, 512), [[le, r(y).exam]])]),
      a("label", null, [d[8] || (d[8] = G("现在的水平", -1)), ee(a("input", {
        "onUpdate:modelValue": d[2] || (d[2] = (C) => r(y).level = C),
        type: "text",
        maxlength: "80",
        placeholder: "不确定"
      }, null, 512), [[le, r(y).level]])]),
      a("label", null, [d[9] || (d[9] = G("目标", -1)), ee(a("input", {
        "onUpdate:modelValue": d[3] || (d[3] = (C) => r(y).targetLevel = C),
        type: "text",
        maxlength: "80",
        placeholder: "比现在高一级"
      }, null, 512), [[le, r(y).targetLevel]])]),
      a("details", {
        class: "learning-settings-optional",
        open: !e.onboarding
      }, [
        a("summary", null, s(r(J).optionalSettings), 1),
        a("label", null, [d[10] || (d[10] = G("讲解语言", -1)), ee(a("select", { "onUpdate:modelValue": d[4] || (d[4] = (C) => r(y).explanationLanguage = C) }, [(t(!0), i(A, null, D(k.value, (C) => (t(), i("option", {
          key: C,
          value: C
        }, s(f(C)), 9, bi))), 128))], 512), [[Te, r(y).explanationLanguage]])]),
        a("label", null, [d[11] || (d[11] = G("感兴趣的话题", -1)), ee(a("input", {
          "onUpdate:modelValue": d[5] || (d[5] = (C) => r(y).interests = C),
          type: "text",
          maxlength: "200",
          placeholder: "不限"
        }, null, 512), [[le, r(y).interests]])])
      ], 8, pi),
      a("div", fi, [e.onboarding ? g("", !0) : (t(), i("button", {
        key: 0,
        type: "button",
        onClick: d[6] || (d[6] = (C) => {
          w.value = !1, r(c).submitted = null;
        })
      }, "取消")), a("button", {
        type: "submit",
        class: "learning-primary",
        disabled: e.disabled
      }, s(e.onboarding ? r(J).setupFinish : r(J).saveSettings), 9, yi)])
    ], 32)) : (t(), i("button", {
      key: 1,
      type: "button",
      disabled: e.disabled,
      onClick: d[0] || (d[0] = (C) => {
        b(), w.value = !0;
      })
    }, "调整", 8, mi))]));
  }
}), Bt = ki, hi = { class: "learning-profile-page" }, $i = { class: "learning-setup-heading" }, wi = { class: "learning-eyebrow" }, xi = { class: "learning-language-options" }, Ci = [
  "disabled",
  "aria-pressed",
  "onClick"
], Ii = { "aria-hidden": "true" }, Li = ["disabled"], Si = {
  key: 0,
  class: "learning-setup-empty"
}, Ai = { class: "learning-teacher-options" }, Ri = [
  "disabled",
  "aria-pressed",
  "onClick"
], Mi = { class: "learning-person-initial" }, Ti = {
  key: 1,
  class: "learning-selected-teacher"
}, Ei = { class: "learning-person-initial" }, Ni = { key: 0 }, Bi = ["open"], Oi = ["disabled"], qi = ["disabled"], Vi = ["disabled"], Pi = { class: "learning-setup-actions" }, Ui = ["disabled"], ji = ["disabled"], Di = /* @__PURE__ */ Q({
  __name: "LearningSetup",
  props: {
    state: {},
    disabled: { type: Boolean }
  },
  emits: ["action"],
  setup(e, { emit: m }) {
    const l = m, n = he().setup, o = ve(n, "step"), u = H(null), c = ve(n, "name"), y = ve(n, "note"), w = [
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
    async function b(f) {
      o.value = f, await oe(), u.value?.focus();
    }
    return Ee(() => o.value ? (b(o.value - 1), !0) : !1), (f, k) => (t(), i("section", hi, [a("div", $i, [a("p", wi, s(o.value + 1) + " / " + s(r(J).setupSteps), 1), a("h1", {
      ref_key: "heading",
      ref: u,
      tabindex: "-1"
    }, s(o.value === 0 ? "选择要学习的语言" : o.value === 1 ? "选择语伴" : r(J).setupTitle), 513)]), o.value === 0 ? (t(), i(A, { key: 0 }, [a("div", xi, [(t(), i(A, null, D(w, ([h, $, v]) => a("button", {
      key: h,
      type: "button",
      disabled: e.disabled,
      "aria-pressed": e.state.language === h,
      onClick: (d) => l("action", "language", { language: h })
    }, [
      a("span", Ii, s(v), 1),
      a("strong", null, s($), 1),
      e.state.language === h ? (t(), K(z, {
        key: 0,
        name: "check"
      })) : g("", !0)
    ], 8, Ci)), 64))]), a("button", {
      type: "button",
      class: "learning-primary learning-setup-next",
      disabled: e.disabled,
      onClick: k[0] || (k[0] = (h) => b(1))
    }, [k[7] || (k[7] = G("继续", -1)), F(z, { name: "arrow" })], 8, Li)], 64)) : o.value === 1 ? (t(), i(A, { key: 1 }, [
      e.state.candidates.length ? g("", !0) : (t(), i("p", Si, "当前故事里还没有认识的人物，所以没有可选的语伴。可以在下面手动填一位：名字加一句身份说明。")),
      a("div", Ai, [(t(!0), i(A, null, D(e.state.candidates, (h) => (t(), i("button", {
        key: h.name,
        type: "button",
        disabled: e.disabled,
        "aria-pressed": e.state.teacher?.name === h.name,
        onClick: ($) => l("action", "teacher", { teacher: {
          name: h.name,
          note: ""
        } })
      }, [
        a("span", Mi, s([...h.name][0]), 1),
        a("strong", null, s(h.name), 1),
        e.state.teacher?.name === h.name ? (t(), K(z, {
          key: 0,
          name: "check"
        })) : g("", !0)
      ], 8, Ri))), 128))]),
      e.state.teacher && !e.state.candidates.some((h) => h.name === e.state.teacher?.name) ? (t(), i("p", Ti, [
        a("span", Ei, s([...e.state.teacher.name][0]), 1),
        a("span", null, [G(s(e.state.teacher.name), 1), e.state.teacher.note ? (t(), i("small", Ni, s(e.state.teacher.note), 1)) : g("", !0)]),
        F(z, { name: "check" })
      ])) : g("", !0),
      a("details", {
        class: "learning-other-teacher",
        open: !e.state.candidates.length
      }, [a("summary", null, s(e.state.candidates.length ? "手动填写其他人物" : "手动填写"), 1), a("form", {
        class: "learning-fields",
        onSubmit: k[3] || (k[3] = ae((h) => l("action", "teacher", { teacher: {
          name: c.value.trim(),
          note: y.value.trim()
        } }), ["prevent"]))
      }, [
        a("label", null, [k[8] || (k[8] = G("名字", -1)), ee(a("input", {
          "onUpdate:modelValue": k[1] || (k[1] = (h) => c.value = h),
          type: "text",
          maxlength: "80",
          placeholder: "例如 林老师",
          disabled: e.disabled
        }, null, 8, Oi), [[le, c.value]])]),
        a("label", null, [k[9] || (k[9] = G("一句身份说明", -1)), ee(a("input", {
          "onUpdate:modelValue": k[2] || (k[2] = (h) => y.value = h),
          type: "text",
          maxlength: "200",
          placeholder: "例如 在东京长大的大学同学，说话直爽",
          disabled: e.disabled
        }, null, 8, qi), [[le, y.value]])]),
        a("button", {
          type: "submit",
          disabled: e.disabled || !c.value.trim()
        }, "选这位", 8, Vi)
      ], 32)], 8, Bi),
      a("div", Pi, [a("button", {
        type: "button",
        disabled: e.disabled,
        onClick: k[4] || (k[4] = (h) => b(0))
      }, "上一步", 8, Ui), a("button", {
        type: "button",
        class: "learning-primary",
        disabled: e.disabled || !e.state.teacher,
        onClick: k[5] || (k[5] = (h) => b(2))
      }, [G(s(r(J).setupContinue), 1), F(z, { name: "arrow" })], 8, ji)])
    ], 64)) : (t(), K(Bt, {
      key: 2,
      onboarding: "",
      state: e.state,
      disabled: e.disabled || !e.state.teacher,
      onAction: k[6] || (k[6] = (h, $) => l("action", h, $ ?? {}))
    }, null, 8, ["state", "disabled"]))]));
  }
}), Wi = Di, Fi = { class: "learning-companion-control" }, Gi = {
  key: 0,
  class: "learning-sr-only"
}, Hi = { class: "learning-companion-options" }, zi = { class: "learning-companion-switch" }, Yi = ["aria-label"], Ki = { class: "learning-cost-note" }, Zi = /* @__PURE__ */ Q({
  __name: "LearningCompanionControl",
  props: { name: {} },
  setup(e) {
    const m = ve(he().companion, "enabled"), l = {
      title: "陪读",
      on: "一起学习中",
      off: "未开启",
      description: "开启后语伴会和你一起学习",
      costTitle: "费用说明",
      cost: "陪读消息和聊天一样，按你所用的 AI 服务计费。"
    };
    return (n, o) => (t(), i("details", Fi, [a("summary", null, [
      a("span", {
        class: ne(["learning-companion-light", { "is-on": m.value }]),
        "aria-hidden": "true"
      }, null, 2),
      G(s(m.value ? e.name ? `${e.name} · ${l.on}` : l.on : l.title), 1),
      m.value ? g("", !0) : (t(), i("span", Gi, s(l.off), 1))
    ]), a("div", Hi, [a("label", zi, [a("span", null, s(l.description), 1), ee(a("input", {
      "onUpdate:modelValue": o[0] || (o[0] = (u) => m.value = u),
      type: "checkbox",
      role: "switch",
      "aria-label": l.title
    }, null, 8, Yi), [[Kt, m.value]])]), a("details", Ki, [a("summary", null, s(l.costTitle), 1), a("small", null, s(l.cost), 1)])])]));
  }
}), Ot = Zi, Fe = {
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
}, Ji = {
  context: "翻看学习资料",
  config: "连接语伴",
  session: "准备学习内容",
  summary: "整理之前聊过的内容",
  provider: "组织回复",
  tools: "整理学习内容",
  save: "保存学习内容",
  action: "准备学习内容"
};
function Qi(e) {
  return `正在${Ji[e.stage]}…`;
}
var Lu = Object.freeze({
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
function pt(e) {
  return e.split(/\r?\n/u).filter((m) => m.trim());
}
var Xi = {
  class: "learning-complete",
  role: "status",
  "aria-live": "polite"
}, _i = {
  key: 0,
  class: "learning-complete-burst",
  "aria-hidden": "true"
}, el = { class: "learning-complete-title" }, tl = {
  key: 1,
  class: "learning-complete-amount"
}, al = ["disabled"], nl = /* @__PURE__ */ Q({
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
  setup(e, { emit: m }) {
    const l = e, n = m, o = I(() => l.state.completions.find((c) => c.unitId === l.unitId)), u = I(() => {
      const c = o.value?.rewardStatus;
      return c === "paid" ? re.paid : c === "retired" ? re.retired : o.value ? l.state.walletOpen ? re.pending : re.needsWallet : re.saving;
    });
    return (c, y) => (t(), i("section", Xi, [
      e.quiet ? g("", !0) : (t(), i("div", _i, [(t(), i(A, null, D(8, (w) => a("span", {
        key: w,
        style: kt({ "--i": w })
      }, null, 4)), 64))])),
      a("p", el, s(e.label), 1),
      o.value?.rewardStatus !== "retired" ? (t(), i("p", tl, [a("strong", null, s(o.value?.rewardStatus === "paid" ? "+" : "") + s(o.value?.amount ?? e.amount), 1), y[1] || (y[1] = a("span", null, "小白币", -1))])) : g("", !0),
      a("small", null, s(u.value), 1),
      o.value && o.value.rewardStatus !== "paid" && o.value.rewardStatus !== "retired" ? (t(), i("button", {
        key: 2,
        type: "button",
        disabled: e.disabled || e.state.walletStorage !== "ready",
        onClick: y[0] || (y[0] = (w) => n("action", "reward", {
          unitId: e.unitId,
          openWallet: !e.state.walletOpen
        }))
      }, s(e.state.walletOpen ? r(re).claim : r(re).openWallet), 9, al)) : g("", !0)
    ]));
  }
}), qt = nl, il = ["aria-labelledby"], ll = { id: "learning-grading-title" }, sl = {
  key: 0,
  class: "learning-grading-actions"
}, rl = {
  key: 0,
  class: "learning-annotation-missing",
  role: "status"
}, ol = ["disabled"], ul = ["disabled"], dl = ["open", "onToggle"], vl = {
  key: 0,
  class: "learning-revised-text"
}, cl = { class: "learning-write-saved" }, gl = { key: 0 }, ml = {
  key: 1,
  class: "learning-graded-guidance"
}, pl = ["open", "onToggle"], bl = { key: 0 }, fl = { key: 1 }, yl = { key: 3 }, kl = { class: "learning-graded-text" }, hl = { class: "learning-annotation-fixed" }, $l = {
  key: 0,
  class: "learning-annotation-missing"
}, wl = {
  key: 1,
  class: "learning-annotation-fixed"
}, xl = ["onClick"], Cl = { class: "learning-annotation-tag" }, Il = {
  key: 0,
  class: "learning-annotation-suggestion"
}, Ll = ["onSubmit"], Sl = ["onUpdate:modelValue", "aria-label"], Al = ["disabled"], Rl = { key: 2 }, Ml = ["onClick"], Tl = {
  key: 1,
  class: "learning-working",
  role: "status"
}, El = ["disabled"], Nl = ["disabled"], Bl = {
  key: 3,
  class: "learning-model-essay"
}, Ol = /* @__PURE__ */ Q({
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
  setup(e, { emit: m }) {
    const l = e, n = m, o = {
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
    }, w = (B) => B.itemId && (B.category === "grammar" || B.category === "vocabulary") ? c[B.category] : null, b = $e(() => l.unit.id), f = I(() => b.value.edits), k = I(() => l.unit.stage.stage), h = I(() => new Map(l.unit.materials.flatMap((B) => B.paragraphs).map((B, O) => [B.id, O + 1]))), $ = (B) => B?.answer.kind === "text" ? B.answer.text : "", v = I(() => l.unit.stage.exercises.flatMap((B) => {
      const O = l.unit.exercises.find((_) => _.id === B.exerciseId), L = l.unit.attempts.find((_) => _.id === B.draftAttemptId);
      if (!O || !L) return [];
      const U = l.unit.assessments.find((_) => _.attemptId === L.id), N = l.unit.attempts.find((_) => _.id === B.revisionAttemptId), X = N && l.unit.assessments.find((_) => _.attemptId === N.id), ce = U?.annotations ?? [];
      return [{
        row: B,
        exercise: O,
        draft: L,
        assessment: U,
        revision: N,
        review: X,
        annotations: ce,
        label: O.paragraphId ? `第 ${h.value.get(O.paragraphId) ?? "?"} 段总结` : "作文",
        paragraphs: pt($(L)).map((_, ge) => ({
          index: ge,
          segments: Ln(_, ce.filter((me) => me.paragraphIndex === ge)),
          annotations: ce.filter((me) => me.paragraphIndex === ge)
        })),
        resolved: new Set(X?.resolvedAnnotationIds ?? [])
      }];
    }).sort((B, O) => +(O.annotations.length > 0) - +(B.annotations.length > 0))), d = (B) => k.value === "revising" && B.row.status === "revising", C = (B, O) => d(B) && O.severity !== "alternative";
    Y(v, (B) => {
      for (const O of B.flatMap((L) => L.annotations)) f.value[O.id] ??= {
        value: O.quote,
        done: !1
      };
    }, { immediate: !0 });
    function E(B) {
      const O = f.value[B.id];
      O?.value.trim() && O.value !== B.quote && (O.done = !0);
    }
    const M = I(() => new Map(v.value.filter(d).map((B) => [B.draft.id, In($(B.draft), B.annotations.map((O) => ({
      id: O.id,
      paragraphIndex: O.paragraphIndex,
      quote: O.quote,
      replacement: f.value[O.id]?.done ? f.value[O.id].value : O.quote
    })))]))), T = I(() => new Set([...M.value.values()].flatMap((B) => B.missing))), j = I(() => [...M.value.values()].reduce((B, O) => B + O.applied.length, 0)), q = H("");
    Y(j, () => {
      q.value = "";
    });
    const V = I(() => v.value.filter(d).flatMap((B) => B.annotations.filter((O) => O.severity !== "alternative")).length), R = (B, O) => {
      const L = B.annotations.find((U) => U.id === O);
      return L ? ["learning-mark", `is-${L.severity}`] : "";
    };
    function P() {
      const B = v.value.filter(d).flatMap((O) => {
        const L = M.value.get(O.draft.id);
        return !L || L.text === $(O.draft) ? [] : [{
          attemptId: O.draft.id,
          text: L.text
        }];
      });
      B.length ? n("action", "submit-revision", {
        unitId: l.unit.id,
        revisions: B
      }) : q.value = y.unplaced;
    }
    const W = I(() => l.state.pending?.unitId === l.unit.id ? l.state.pending.purpose : null);
    return (B, O) => (t(), i("section", {
      class: "learning-grading",
      "aria-labelledby": e.view === "feedback" ? "learning-grading-title" : void 0
    }, [
      e.view === "feedback" ? (t(), i(A, { key: 0 }, [
        a("h2", ll, s(y.title), 1),
        k.value === "revising" ? (t(), i("div", sl, [
          a("small", null, "已改 " + s(j.value) + " / " + s(V.value) + " 处", 1),
          q.value ? (t(), i("small", rl, s(q.value), 1)) : g("", !0),
          a("button", {
            type: "button",
            disabled: e.disabled,
            onClick: O[0] || (O[0] = (L) => n("confirm", "skip-revision", { unitId: e.unit.id }, "跳过这次修改？批注会保留，直接进入范文。"))
          }, "跳过修改", 8, ol),
          a("button", {
            type: "button",
            class: "learning-primary",
            disabled: e.disabled || !j.value,
            onClick: P
          }, "提交修改", 8, ul)
        ])) : g("", !0),
        (t(!0), i(A, null, D(v.value, (L) => (t(), i("details", {
          key: L.exercise.id,
          class: "learning-graded",
          open: r(b).expanded[`grading:${L.draft.id}`] ?? L.annotations.length > 0,
          onToggle: (U) => r(b).expanded[`grading:${L.draft.id}`] = U.target.open
        }, [
          a("summary", null, [a("h3", null, s(L.label), 1)]),
          L.revision ? (t(), i("section", vl, [
            a("h4", null, s(r(J).revision), 1),
            a("p", cl, s($(L.revision)), 1),
            L.review?.guidance ? (t(), i("p", gl, s(L.review.guidance), 1)) : g("", !0)
          ])) : g("", !0),
          L.assessment?.guidance ? (t(), i("p", ml, s(L.assessment.guidance), 1)) : g("", !0),
          L.assessment && (L.assessment.understanding || L.assessment.expression) ? (t(), i("details", {
            key: 2,
            class: "learning-graded-more",
            open: r(b).expanded[`feedback:${L.draft.id}`],
            onToggle: (U) => r(b).expanded[`feedback:${L.draft.id}`] = U.target.open
          }, [
            O[6] || (O[6] = a("summary", null, "理解与表达点评", -1)),
            L.assessment.understanding ? (t(), i("p", bl, [O[4] || (O[4] = a("b", null, "理解", -1)), G(s(L.assessment.understanding), 1)])) : g("", !0),
            L.assessment.expression ? (t(), i("p", fl, [O[5] || (O[5] = a("b", null, "表达", -1)), G(s(L.assessment.expression), 1)])) : g("", !0)
          ], 40, pl)) : g("", !0),
          L.revision ? (t(), i("h4", yl, s(r(J).original), 1)) : g("", !0),
          (t(!0), i(A, null, D(L.paragraphs, (U) => (t(), i("div", {
            key: U.index,
            class: "learning-graded-paragraph"
          }, [a("p", kl, [(t(!0), i(A, null, D(U.segments, (N, X) => (t(), i(A, { key: X }, [N.id ? (t(), i("mark", {
            key: 0,
            class: ne(R(L, N.id))
          }, s(N.text), 3)) : (t(), i(A, { key: 1 }, [G(s(N.text), 1)], 64))], 64))), 128))]), (t(!0), i(A, null, D(U.annotations, (N) => (t(), i("div", {
            key: N.id,
            class: ne(["learning-annotation", [`is-${N.severity}`, {
              "is-fixed": L.resolved.has(N.id),
              "is-edited": f.value[N.id]?.done && d(L)
            }]])
          }, [L.resolved.has(N.id) ? (t(), i(A, { key: 0 }, [a("p", hl, "✓ " + s(r(J).resolved), 1), a("p", null, s(N.explanation), 1)], 64)) : f.value[N.id]?.done && d(L) ? (t(), i(A, { key: 1 }, [T.value.has(N.id) ? (t(), i("p", $l, "原文里找不到“" + s(N.quote) + "”，这处改动不会写进修改稿。", 1)) : (t(), i("p", wl, "✓ 改为“" + s(f.value[N.id].value) + "”", 1)), a("button", {
            type: "button",
            onClick: (X) => f.value[N.id].done = !1
          }, "再改", 8, xl)], 64)) : (t(), i(A, { key: 2 }, [
            a("p", Cl, [a("span", null, s(u[N.severity]), 1), G(s(o[N.category]), 1)]),
            a("p", null, s(N.explanation), 1),
            N.suggestion ? (t(), i("p", Il, "可以写成：" + s(N.suggestion), 1)) : g("", !0),
            C(L, N) && f.value[N.id] ? (t(), i("form", {
              key: 1,
              class: "learning-annotation-edit",
              onSubmit: ae((X) => E(N), ["prevent"])
            }, [ee(a("textarea", {
              "onUpdate:modelValue": (X) => f.value[N.id].value = X,
              rows: "2",
              "aria-label": `改写：${N.quote}`,
              maxlength: "600"
            }, null, 8, Sl), [[le, f.value[N.id].value], [r(Oe), f.value[N.id]]]), a("button", {
              type: "submit",
              disabled: !f.value[N.id].value.trim() || f.value[N.id].value === N.quote
            }, "改好了", 8, Al)], 40, Ll)) : L.review && N.severity !== "alternative" ? (t(), i("small", Rl, "复核时这里还没改到")) : g("", !0)
          ], 64)), w(N) ? (t(), i("button", {
            key: 3,
            type: "button",
            class: "learning-annotation-book",
            onClick: (X) => n("record", N.itemId)
          }, s(w(N)) + " ↗", 9, Ml)) : g("", !0)], 2))), 128))]))), 128))
        ], 40, dl))), 128))
      ], 64)) : g("", !0),
      [
        "grading",
        "reviewing",
        "model"
      ].includes(k.value) ? (t(), i("div", Tl, [W.value ? (t(), i(A, { key: 0 }, [
        O[7] || (O[7] = a("span", {
          class: "learning-working-dot",
          "aria-hidden": "true"
        }, null, -1)),
        a("span", null, s(W.value === "grade" ? r(J).grading : W.value === "revision-review" ? r(J).reviewing : r(J).modelling), 1),
        a("button", {
          type: "button",
          disabled: e.pending,
          onClick: O[1] || (O[1] = (L) => n("action", "cancel"))
        }, s(r(J).stop), 9, El)
      ], 64)) : (t(), i("button", {
        key: 1,
        type: "button",
        class: "learning-primary",
        disabled: e.disabled,
        onClick: O[2] || (O[2] = (L) => n("action", "grade", { unitId: e.unit.id }))
      }, s(k.value === "grading" ? r(J).grade : r(J).continue), 9, Nl))])) : g("", !0),
      e.view === "model" && k.value === "complete" ? (t(), K(qt, {
        key: 2,
        state: e.state,
        "unit-id": e.unit.id,
        amount: e.unit.reward.amount,
        label: "本篇完成",
        disabled: e.disabled,
        onAction: O[3] || (O[3] = (L, U) => n("action", L, U))
      }, null, 8, [
        "state",
        "unit-id",
        "amount",
        "disabled"
      ])) : g("", !0),
      e.view === "model" && e.unit.modelEssay ? (t(), i("section", Bl, [a("h3", null, [O[8] || (O[8] = G("范文", -1)), a("small", null, s(e.unit.modelEssay.level), 1)]), (t(!0), i(A, null, D(r(pt)(e.unit.modelEssay.text), (L, U) => (t(), i("p", { key: U }, s(L), 1))), 128))])) : g("", !0)
    ], 8, il));
  }
}), ql = Ol, Vl = ["data-exercise-id"], Pl = { class: "learning-write-label" }, Ul = [
  "aria-label",
  "placeholder",
  "rows",
  "onKeydown"
], jl = { class: "learning-write-foot" }, Dl = { "aria-live": "polite" }, Wl = ["disabled"], Fl = { class: "learning-write-saved" }, Gl = { class: "learning-write-foot" }, Hl = ["disabled"], zl = /* @__PURE__ */ Q({
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
  setup(e, { emit: m }) {
    const l = e, n = m, o = $e(() => l.unit.id);
    Y([o, () => l.exercise.id], () => {
      o.value.writing[l.exercise.id] ??= {
        text: "",
        rewriting: !1,
        submitted: null
      };
    }, { immediate: !0 });
    const u = I(() => o.value.writing[l.exercise.id]), c = I({
      get: () => u.value.text,
      set: (M) => {
        u.value.text = M;
      }
    }), y = I({
      get: () => u.value.rewriting,
      set: (M) => {
        u.value.rewriting = M;
      }
    }), w = I(() => l.unit.attempts.filter((M) => M.exerciseId === l.exercise.id && M.revisesAttemptId === void 0).at(-1)), b = I(() => l.unit.assessments.some((M) => M.attemptId === w.value?.id && M.verdict !== "disputed")), f = I(() => w.value?.answer.kind === "text" ? w.value.answer.text : ""), k = I(() => !w.value || y.value), h = I(() => ["writing", "grading"].includes(l.unit.stage.stage) && !b.value && !l.state.pending), $ = I(() => ct(c.value, l.state.language)), v = I(() => ct(f.value, l.state.language)), d = I(() => l.state.conversation.summaryReviews.find((M) => M.attemptId === w.value?.id)?.text ?? "");
    function C() {
      l.disabled || !c.value.trim() || (u.value.submitted = {
        before: w.value?.id,
        text: c.value
      }, n("action", "submit", {
        unitId: l.unit.id,
        exerciseId: l.exercise.id,
        answer: {
          kind: "text",
          text: c.value.trim()
        }
      }));
    }
    function E() {
      c.value = f.value, y.value = !0;
    }
    return (M, T) => (t(), i("div", {
      class: ne(["learning-write", `is-${e.tone ?? "summary"}`]),
      "data-exercise-id": e.exercise.id
    }, [
      a("p", Pl, s(e.label), 1),
      k.value ? (t(), i("form", {
        key: 0,
        onSubmit: ae(C, ["prevent"])
      }, [ee(a("textarea", {
        "onUpdate:modelValue": T[0] || (T[0] = (j) => c.value = j),
        "aria-label": e.label,
        placeholder: e.placeholder,
        maxlength: "4000",
        rows: e.tone === "essay" ? 8 : 3,
        onKeydown: [be(ae(C, ["ctrl", "prevent"]), ["enter"]), be(ae(C, ["meta", "prevent"]), ["enter"])]
      }, null, 40, Ul), [[le, c.value], [r(Oe), u.value]]), a("div", jl, [
        a("small", Dl, s($.value.count) + " " + s($.value.unit), 1),
        y.value ? (t(), i("button", {
          key: 0,
          type: "button",
          onClick: T[1] || (T[1] = (j) => {
            y.value = !1, c.value = "";
          })
        }, "取消")) : g("", !0),
        a("button", {
          type: "submit",
          class: "learning-primary",
          disabled: e.disabled || !c.value.trim()
        }, s(w.value ? "保存新稿" : "提交"), 9, Wl)
      ])], 32)) : w.value ? (t(), i(A, { key: 1 }, [a("p", Fl, s(f.value), 1), a("div", Gl, [a("small", null, "已保存 · " + s(v.value.count) + " " + s(v.value.unit), 1), h.value ? (t(), i("button", {
        key: 0,
        type: "button",
        disabled: e.disabled,
        onClick: E
      }, "重写", 8, Hl)) : g("", !0)])], 64)) : g("", !0),
      d.value ? (t(), K(He, {
        key: 2,
        class: "learning-markdown learning-write-reply",
        text: d.value
      }, null, 8, ["text"])) : g("", !0)
    ], 10, Vl));
  }
}), Vt = zl, ie = {
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
}, Yl = "用你的话概括这一段", Kl = ["data-paragraph-id", "data-material-id"], Zl = { class: "learning-reading-text" }, Jl = {
  class: "learning-reading-number",
  "aria-hidden": "true"
}, Ql = ["data-material-id", "data-paragraph-id"], Xl = ["disabled"], _l = ["open"], es = { key: 0 }, ts = { class: "learning-knowledge-text" }, as = {
  key: 0,
  class: "learning-terms"
}, ns = [
  "disabled",
  "aria-pressed",
  "onClick"
], is = {
  key: 2,
  class: "learning-muted learning-knowledge-pending"
}, ls = /* @__PURE__ */ Q({
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
  setup(e, { emit: m }) {
    const l = e, n = m, o = I(() => l.unit.explanations.find((h) => h.materialId === l.materialId && h.paragraphId === l.paragraph.id)), u = I(() => l.unit.exercises.find((h) => h.paragraphId === l.paragraph.id)), c = I(() => new Set(l.state.savedTerms)), y = (h) => c.value.has(h), w = $e(() => l.unit.id), b = I(() => `knowledge:${l.materialId}:${l.paragraph.id}`), f = I(() => w.value.selection?.materialId === l.materialId && w.value.selection.paragraphId === l.paragraph.id ? w.value.selection : null);
    function k() {
      w.value.selection = {
        materialId: l.materialId,
        paragraphId: l.paragraph.id,
        start: 0,
        end: l.paragraph.text.length,
        quote: l.paragraph.text
      };
    }
    return (h, $) => (t(), i("section", {
      class: "learning-reading-paragraph",
      "data-paragraph-id": e.paragraph.id,
      "data-material-id": e.materialId
    }, [
      a("p", Zl, [a("span", Jl, s(e.number), 1), a("span", {
        "data-learning-text": "",
        "data-material-id": e.materialId,
        "data-paragraph-id": e.paragraph.id
      }, s(e.paragraph.text), 9, Ql)]),
      a("button", {
        type: "button",
        class: "learning-paragraph-quote",
        disabled: [...e.paragraph.text].length > r(wt),
        onClick: k
      }, s(r(Ie).select), 9, Xl),
      f.value ? (t(), K(Mt, {
        key: 0,
        selection: f.value,
        disabled: e.disabled,
        onAsk: $[0] || ($[0] = (v) => n("ask", u.value?.id, f.value)),
        onSay: $[1] || ($[1] = (v) => n("action", "say", { selection: f.value })),
        onDismiss: $[2] || ($[2] = (v) => r(w).selection = null)
      }, null, 8, ["selection", "disabled"])) : g("", !0),
      o.value ? (t(), i("details", {
        key: 1,
        class: "learning-knowledge",
        open: r(w).expanded[b.value],
        onToggle: $[3] || ($[3] = (v) => r(w).expanded[b.value] = v.target.open)
      }, [
        a("summary", null, [$[5] || ($[5] = G("本段知识", -1)), o.value.terms.length ? (t(), i("span", es, " · " + s(o.value.terms.length) + " 个词语", 1)) : g("", !0)]),
        a("p", ts, s(o.value.explanation), 1),
        o.value.terms.length ? (t(), i("ul", as, [(t(!0), i(A, null, D(o.value.terms, (v) => (t(), i("li", { key: v.text }, [a("span", null, [a("strong", null, s(v.text), 1), a("small", null, s(v.note), 1)]), a("button", {
          type: "button",
          disabled: e.disabled || y(v.text),
          "aria-pressed": y(v.text),
          onClick: (d) => n("action", "bookmark", {
            unitId: e.unit.id,
            materialId: e.materialId,
            paragraphId: e.paragraph.id,
            termText: v.text
          })
        }, s(y(v.text) ? "已收藏" : "收藏"), 9, ns)]))), 128))])) : g("", !0)
      ], 40, _l)) : (t(), i("p", is, s(e.state.preparation?.running ? r(ie).notes : r(ie).missingNotes), 1)),
      u.value ? (t(), K(Vt, {
        key: 3,
        state: e.state,
        unit: e.unit,
        exercise: u.value,
        disabled: e.disabled,
        label: r(Yl),
        placeholder: "写下这段的大意，不必逐句翻译",
        onAction: $[4] || ($[4] = (v, d) => n("action", v, d))
      }, null, 8, [
        "state",
        "unit",
        "exercise",
        "disabled",
        "label"
      ])) : g("", !0)
    ], 8, Kl));
  }
}), ss = ls, rs = ["aria-label"], os = [
  "aria-current",
  "disabled",
  "onClick"
], us = { class: "learning-reading-head" }, ds = ["open"], vs = { key: 0 }, cs = { class: "learning-source" }, gs = ["href"], ms = {
  key: 0,
  class: "learning-essay"
}, ps = { class: "learning-essay-prompt" }, bs = {
  key: 1,
  class: "learning-essay"
}, fs = { class: "learning-muted" }, ys = ["aria-label"], ks = ["aria-current"], hs = {
  key: 2,
  class: "learning-stage-bar is-writing"
}, $s = {
  key: 1,
  class: "learning-muted"
}, ws = {
  key: 3,
  class: "learning-stage-bar"
}, xs = ["disabled"], Cs = ["disabled"], Is = /* @__PURE__ */ Q({
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
  setup(e, { emit: m }) {
    const l = e, n = m, o = H(null), u = $e(() => l.unit.id);
    xt(o, () => l.unit.materials, (M) => {
      u.value.selection = M;
    });
    const c = I(() => l.unit.stage.stage), y = I(() => {
      if (c.value === "writing") return "reading";
      const M = u.value.reading.view;
      return M === "model" && ![
        "reviewing",
        "model",
        "complete"
      ].includes(c.value) ? "feedback" : M ?? (c.value === "complete" ? "model" : c.value === "grading" ? "reading" : "feedback");
    }), w = [
      "reading",
      "feedback",
      "model"
    ];
    async function b(M) {
      const T = o.value?.closest(".learning-scroll");
      T && (u.value.reading.scrolls[y.value] = T.scrollTop), u.value.reading.view = M, await oe(), T && (T.scrollTop = u.value.reading.scrolls[M] ?? 0);
    }
    const f = [
      ["writing", "阅读与写作"],
      ["grading", "统一批改"],
      ["revising", "修改"],
      ["model", "范文"],
      ["complete", "完成"]
    ], k = I(() => ({
      writing: 0,
      grading: 1,
      revising: 2,
      reviewing: 3,
      model: 3,
      complete: 4
    })[c.value] ?? 0), h = I(() => l.unit.exercises.find((M) => !M.paragraphId)), $ = I(() => l.unit.stage.exercises.filter((M) => M.status === "writing").map((M) => M.exerciseId)), v = {
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
      let M = 0;
      return l.unit.materials.map((T) => ({
        material: T,
        paragraphs: T.paragraphs.map((j) => ({
          paragraph: j,
          number: ++M
        }))
      }));
    }), C = (M, T) => n("action", M, T);
    function E(M) {
      const T = o.value?.querySelector(`[data-exercise-id="${CSS.escape(M)}"]`);
      T?.scrollIntoView({
        block: "center",
        behavior: matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth"
      }), T?.querySelector("textarea, button")?.focus({ preventScroll: !0 });
    }
    return (M, T) => (t(), i("article", {
      ref_key: "root",
      ref: o,
      class: "learning-reading"
    }, [
      c.value !== "writing" ? (t(), i("nav", {
        key: 0,
        class: "learning-reading-nav",
        "aria-label": r(J).navigation
      }, [(t(), i(A, null, D(w, (j) => a("button", {
        key: j,
        type: "button",
        "aria-current": y.value === j ? "page" : void 0,
        disabled: j === "model" && ![
          "reviewing",
          "model",
          "complete"
        ].includes(c.value),
        onClick: (q) => b(j)
      }, s(r(J)[j]), 9, os)), 64))], 8, rs)) : g("", !0),
      y.value === "reading" ? (t(), i(A, { key: 1 }, [
        a("header", us, [a("details", {
          class: "learning-reading-goal",
          open: r(u).expanded.goal,
          onToggle: T[0] || (T[0] = (j) => r(u).expanded.goal = j.target.open)
        }, [
          a("summary", null, s(v.goal), 1),
          a("strong", null, s(e.unit.title), 1),
          e.unit.goal ? (t(), i("p", vs, s(e.unit.goal), 1)) : g("", !0)
        ], 40, ds), F(Ot, { name: e.state.teacher?.name }, null, 8, ["name"])]),
        (t(!0), i(A, null, D(d.value, (j, q) => (t(), i("section", {
          key: j.material.id,
          class: "learning-reading-material"
        }, [
          (t(), K(Zt(q === 0 ? "h1" : "h2"), { tabindex: "-1" }, {
            default: Ht(() => [G(s(j.material.title), 1)]),
            _: 2
          }, 1024)),
          a("p", cs, [j.material.provenance.kind === "authored" ? (t(), i(A, { key: 0 }, [G(s(v.authored), 1)], 64)) : (t(), i(A, { key: 1 }, [G(s(j.material.provenance.kind === "adapted" ? v.adapted : v.original) + " ", 1), a("a", {
            href: j.material.provenance.url,
            target: "_blank",
            rel: "noopener noreferrer"
          }, s(j.material.provenance.title), 9, gs)], 64))]),
          (t(!0), i(A, null, D(j.paragraphs, (V) => (t(), K(ss, {
            key: V.paragraph.id,
            state: e.state,
            unit: e.unit,
            "material-id": j.material.id,
            paragraph: V.paragraph,
            number: V.number,
            disabled: e.disabled,
            onAction: C,
            onAsk: T[1] || (T[1] = (R, P) => n("ask", R, P))
          }, null, 8, [
            "state",
            "unit",
            "material-id",
            "paragraph",
            "number",
            "disabled"
          ]))), 128))
        ]))), 128)),
        h.value ? (t(), i("section", ms, [
          a("h2", null, s(v.essay), 1),
          a("p", ps, s(h.value.prompt), 1),
          F(Vt, {
            state: e.state,
            unit: e.unit,
            exercise: h.value,
            disabled: e.disabled,
            label: v.essayLabel,
            placeholder: v.essayPlaceholder,
            tone: "essay",
            onAction: C
          }, null, 8, [
            "state",
            "unit",
            "exercise",
            "disabled",
            "label",
            "placeholder"
          ])
        ])) : (t(), i("section", bs, [a("h2", null, s(v.essay), 1), a("p", fs, s(e.state.preparation?.running ? r(ie).essay : r(ie).missingEssay), 1)])),
        a("ol", {
          class: "learning-steps",
          "aria-label": v.progress
        }, [(t(), i(A, null, D(f, ([j, q], V) => a("li", {
          key: j,
          class: ne({
            "is-done": V < k.value,
            "is-current": V === k.value
          }),
          "aria-current": V === k.value ? "step" : void 0
        }, s(q), 11, ks)), 64))], 8, ys),
        c.value === "writing" ? (t(), i("div", hs, [a("span", null, s(v.written) + " " + s(e.unit.stage.exercises.length - $.value.length) + " / " + s(e.unit.stage.exercises.length), 1), $.value.length ? (t(), i("button", {
          key: 0,
          type: "button",
          onClick: T[2] || (T[2] = (j) => E($.value[0]))
        }, s(v.next), 1)) : (t(), i("span", $s, s(e.unit.preparation.essay ? r(ie).missingNotes : r(ie).missingEssay), 1))])) : c.value === "grading" ? (t(), i("div", ws, [e.state.pending?.purpose === "grade" ? (t(), i(A, { key: 0 }, [
          T[9] || (T[9] = a("span", {
            class: "learning-working-dot",
            "aria-hidden": "true"
          }, null, -1)),
          a("span", null, s(r(J).grading), 1),
          a("button", {
            type: "button",
            disabled: e.pending,
            onClick: T[3] || (T[3] = (j) => n("action", "cancel"))
          }, s(r(J).stop), 9, xs)
        ], 64)) : (t(), i(A, { key: 1 }, [a("span", null, s(r(J).gradeReady), 1), a("button", {
          type: "button",
          class: "learning-primary",
          disabled: e.disabled,
          onClick: T[4] || (T[4] = (j) => n("action", "grade", { unitId: e.unit.id }))
        }, s(r(J).grade), 9, Cs)], 64))])) : (t(), i("button", {
          key: 4,
          type: "button",
          class: "learning-primary",
          onClick: T[5] || (T[5] = (j) => b("feedback"))
        }, s(r(J).feedback), 1))
      ], 64)) : (t(), K(ql, {
        key: 2,
        view: y.value,
        state: e.state,
        unit: e.unit,
        disabled: e.disabled,
        pending: e.pending,
        onAction: C,
        onConfirm: T[6] || (T[6] = (j, q, V) => n("confirm", j, q, V)),
        onRecord: T[7] || (T[7] = (j) => n("record", j))
      }, null, 8, [
        "view",
        "state",
        "unit",
        "disabled",
        "pending"
      ])),
      y.value === "feedback" && c.value === "complete" ? (t(), i("button", {
        key: 3,
        type: "button",
        class: "learning-primary",
        onClick: T[8] || (T[8] = (j) => b("model"))
      }, s(r(J).viewModel), 1)) : g("", !0)
    ], 512));
  }
}), Ls = Is, Ss = {
  class: "learning-review",
  "aria-labelledby": "learning-review-title"
}, As = { class: "learning-review-head" }, Rs = { class: "learning-muted" }, Ms = ["disabled"], Ts = {
  class: "learning-review-dots",
  "aria-label": "复习卡片"
}, Es = [
  "aria-label",
  "aria-current",
  "onClick"
], Ns = { class: "learning-eyebrow" }, Bs = { class: "learning-card-verdict" }, Os = { key: 0 }, qs = { key: 1 }, Vs = {
  key: 1,
  class: "learning-working",
  role: "status"
}, Ps = ["disabled"], Us = ["disabled"], js = ["disabled"], Ds = {
  key: 2,
  class: "learning-row"
}, Ws = { class: "learning-review-results" }, Fs = ["aria-expanded", "onClick"], Gs = {
  key: 1,
  class: "learning-chip-reason"
}, Hs = /* @__PURE__ */ Q({
  __name: "LearningReview",
  props: {
    state: {},
    review: {},
    disabled: { type: Boolean },
    pending: { type: Boolean }
  },
  emits: ["action", "confirm"],
  setup(e, { emit: m }) {
    const l = e, n = m, o = {
      correct: "答对了",
      partial: "对了一部分",
      incorrect: "还没想起来",
      disputed: "等待复核"
    }, u = {
      answer: "你的作答",
      saved: "已保存，答完这组再一起看看。",
      ready: "这组答完了",
      grade: "批改这组"
    }, c = I(() => l.review.stage.stage), y = (L) => l.review.attempts.filter((U) => U.exerciseId === L).at(-1), w = () => Math.max(0, l.review.exercises.findIndex((L) => !y(L.id))), b = $e(() => l.review.id), f = I(() => b.value.review), k = I({
      get: () => f.value.index ?? w(),
      set: (L) => {
        f.value.index = L;
      }
    }), h = I(() => l.review.exercises[k.value]), $ = I(() => h.value && y(h.value.id)), v = I(() => l.review.assessments.find((L) => L.attemptId === $.value?.id)), d = I(() => l.review.materials.flatMap((L) => L.paragraphs)), C = I(() => f.value.drafts);
    Y(h, (L) => {
      L && !C.value[L.id] && (C.value[L.id] = Ne(L.response));
    }, { immediate: !0 });
    const E = I({
      get: () => C.value[h.value.id],
      set: (L) => {
        C.value[h.value.id] = L;
      }
    }), M = I(() => l.review.exercises.filter((L) => y(L.id)).length), T = I({
      get: () => f.value.openReason,
      set: (L) => {
        f.value.openReason = L;
      }
    });
    function j(L) {
      n("action", "submit", {
        unitId: l.review.id,
        exerciseId: h.value.id,
        answer: L
      });
    }
    function q() {
      const L = l.review.exercises.findIndex((U) => !y(U.id));
      L >= 0 && (k.value = L);
    }
    const V = I(() => l.state.completions.find((L) => L.unitId === l.review.id)), R = I(() => V.value?.rewardStatus === "paid" || V.value?.rewardStatus === "retired");
    Y(f, (L) => {
      L.seenBefore ??= c.value === "complete" && gt.has(l.review.id);
    }, { immediate: !0 });
    const P = I(() => f.value.seenBefore ?? !1), W = I({
      get: () => f.value.expanded,
      set: (L) => {
        f.value.expanded = L;
      }
    });
    Y([c, () => l.review.id], ([L, U]) => {
      L === "complete" && gt.mark(U);
    }, { immediate: !0 });
    const B = I(() => P.value && R.value && !W.value), O = (L) => [...l.state.books.grammar, ...l.state.books.vocabulary].find((U) => U.id === L);
    return (L, U) => (t(), i("section", Ss, [
      a("header", As, [
        U[7] || (U[7] = a("h2", { id: "learning-review-title" }, "今日复习", -1)),
        a("span", Rs, s(M.value) + " / " + s(e.review.exercises.length), 1),
        c.value === "answering" ? (t(), i("button", {
          key: 0,
          type: "button",
          disabled: e.disabled,
          onClick: U[0] || (U[0] = (N) => n("confirm", "abandon-review", {}, r(Se).review))
        }, "放下", 8, Ms)) : g("", !0)
      ]),
      a("nav", Ts, [(t(!0), i(A, null, D(e.review.exercises, (N, X) => (t(), i("button", {
        key: N.id,
        type: "button",
        "aria-label": `第 ${X + 1} 张`,
        "aria-current": X === k.value,
        class: ne({ "is-answered": !!y(N.id) }),
        onClick: (ce) => k.value = X
      }, null, 10, Es))), 128))]),
      c.value !== "complete" && h.value ? (t(), i("div", {
        key: `${h.value.id}:${$.value ? "back" : "front"}`,
        class: ne(["learning-card", { "is-back": !!$.value }])
      }, [
        a("p", Ns, s($.value ? u.answer : `第 ${k.value + 1} 张`), 1),
        a("h3", null, s(h.value.prompt), 1),
        $.value ? (t(), i(A, { key: 1 }, [
          a("blockquote", null, s(r(ze)($.value.answer, h.value.response, d.value)), 1),
          v.value ? (t(), i(A, { key: 0 }, [a("p", Bs, s(o[v.value.verdict]), 1), v.value.guidance ? (t(), i("p", Os, s(v.value.guidance), 1)) : g("", !0)], 64)) : (t(), i("small", qs, s(u.saved), 1)),
          M.value < e.review.exercises.length ? (t(), i("button", {
            key: 2,
            type: "button",
            class: "learning-primary",
            onClick: q
          }, "下一张")) : g("", !0)
        ], 64)) : (t(), K($t, {
          key: 0,
          modelValue: E.value,
          "onUpdate:modelValue": U[1] || (U[1] = (N) => E.value = N),
          response: h.value.response,
          paragraphs: d.value,
          disabled: e.disabled,
          onSubmit: j
        }, null, 8, [
          "modelValue",
          "response",
          "paragraphs",
          "disabled"
        ]))
      ], 2)) : g("", !0),
      c.value === "grading" ? (t(), i("div", Vs, [e.state.pending?.purpose === "review-assess" ? (t(), i(A, { key: 0 }, [
        U[8] || (U[8] = a("span", {
          class: "learning-working-dot",
          "aria-hidden": "true"
        }, null, -1)),
        U[9] || (U[9] = a("span", null, "正在批改这组复习…", -1)),
        a("button", {
          type: "button",
          disabled: e.pending,
          onClick: U[2] || (U[2] = (N) => n("action", "cancel"))
        }, "停止", 8, Ps)
      ], 64)) : (t(), i(A, { key: 1 }, [
        a("span", null, s(u.ready), 1),
        a("button", {
          type: "button",
          disabled: e.disabled,
          onClick: U[3] || (U[3] = (N) => n("confirm", "abandon-review", {}, r(Se).review))
        }, "放下", 8, Us),
        a("button", {
          type: "button",
          disabled: e.disabled,
          onClick: U[4] || (U[4] = (N) => n("action", "grade", { unitId: e.review.id }))
        }, s(u.grade), 9, js)
      ], 64))])) : g("", !0),
      c.value === "complete" && B.value ? (t(), i("div", Ds, [U[10] || (U[10] = a("span", { class: "learning-muted" }, "这组复习已完成", -1)), a("button", {
        type: "button",
        "aria-expanded": !1,
        onClick: U[5] || (U[5] = (N) => W.value = !0)
      }, "查看结果")])) : c.value === "complete" ? (t(), i(A, { key: 3 }, [a("ul", Ws, [(t(!0), i(A, null, D(e.review.exercises, (N) => (t(), i("li", { key: N.id }, [
        a("span", null, [a("strong", null, s(O(N.itemId)?.label ?? N.prompt), 1), a("small", null, s(o[e.review.assessments.find((X) => X.attemptId === y(N.id)?.id)?.verdict ?? "disputed"]), 1)]),
        O(N.itemId)?.nextReviewAt ? (t(), i("button", {
          key: 0,
          type: "button",
          class: "learning-chip",
          "aria-expanded": T.value === N.id,
          onClick: (X) => T.value = T.value === N.id ? "" : N.id
        }, s(r(Ye)(O(N.itemId).nextReviewAt)), 9, Fs)) : g("", !0),
        T.value === N.id ? (t(), i("small", Gs, s(O(N.itemId)?.scheduleReason), 1)) : g("", !0)
      ]))), 128))]), F(qt, {
        state: e.state,
        "unit-id": e.review.id,
        amount: e.review.reward.amount,
        label: "复习完成",
        disabled: e.disabled,
        quiet: P.value,
        onAction: U[6] || (U[6] = (N, X) => n("action", N, X))
      }, null, 8, [
        "state",
        "unit-id",
        "amount",
        "disabled",
        "quiet"
      ])], 64)) : g("", !0)
    ]));
  }
}), zs = Hs, Ys = {
  key: 0,
  class: "learning-source-choice",
  "aria-live": "polite"
}, Ks = { class: "learning-row" }, Zs = ["disabled"], Js = ["disabled"], Qs = ["disabled"], Xs = {
  key: 1,
  class: "learning-preparation",
  "aria-live": "polite"
}, _s = {
  key: 0,
  class: "learning-turn-notice"
}, er = { class: "learning-row" }, tr = ["disabled"], ar = /* @__PURE__ */ Q({
  __name: "LearningPreparation",
  props: {
    state: {},
    disabled: { type: Boolean },
    pending: { type: Boolean }
  },
  emits: ["action"],
  setup(e, { emit: m }) {
    const l = m;
    return (n, o) => e.state.sourceChoice ? (t(), i("section", Ys, [a("p", null, s(r(ie).noWeb), 1), a("div", Ks, [
      a("button", {
        type: "button",
        class: "learning-primary",
        disabled: e.pending,
        onClick: o[0] || (o[0] = (u) => l("action", "research-settings"))
      }, s(r(ie).settings), 9, Zs),
      a("button", {
        type: "button",
        disabled: e.disabled,
        onClick: o[1] || (o[1] = (u) => l("action", "choose-original"))
      }, s(r(ie).original), 9, Js),
      a("button", {
        type: "button",
        disabled: e.pending,
        onClick: o[2] || (o[2] = (u) => l("action", "dismiss-source"))
      }, s(e.state.unit ? r(ie).existing : r(ie).dismiss), 9, Qs)
    ])])) : !e.state.preparation?.running && (e.state.preparation || e.state.unit?.kind === "reading-writing" && !e.state.unit.preparation.ready) ? (t(), i("section", Xs, [e.state.preparation?.message ? (t(), i("p", _s, s(e.state.preparation.message), 1)) : g("", !0), a("div", er, [e.state.unit?.kind === "reading-writing" && !e.state.unit.preparation.ready ? (t(), i("button", {
      key: 0,
      type: "button",
      disabled: e.disabled,
      onClick: o[3] || (o[3] = (u) => l("action", "resume-preparation", { unitId: e.state.unit.id }))
    }, s(r(ie).resume), 9, tr)) : g("", !0)])])) : g("", !0);
  }
}), bt = ar, nr = { class: "learning-workbench" }, ir = {
  key: 1,
  class: "learning-due"
}, lr = {
  key: 0,
  class: "learning-working",
  role: "status"
}, sr = ["disabled"], rr = ["disabled"], or = {
  key: 2,
  class: "learning-row"
}, ur = ["disabled"], dr = {
  key: 5,
  class: "learning-lesson"
}, vr = { class: "learning-eyebrow" }, cr = { tabindex: "-1" }, gr = {
  key: 0,
  class: "learning-muted"
}, mr = ["onClick"], pr = ["onClick"], br = { class: "learning-row" }, fr = ["disabled"], yr = {
  key: 6,
  class: "learning-start"
}, kr = ["disabled"], hr = {
  key: 0,
  tabindex: "-1"
}, $r = { key: 1 }, wr = ["aria-label"], xr = { class: "learning-start-reading" }, Cr = ["disabled"], Ir = ["disabled"], Lr = /* @__PURE__ */ Q({
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
  setup(e, { emit: m }) {
    const l = e, n = m, o = I(() => !!l.state.review && l.state.review.stage.stage !== "complete"), u = I(() => l.state.unit), c = I(() => !u.value || l.state.completions.some(($) => $.unitId === u.value?.id)), y = I(() => l.state.busy && !l.state.pending), w = {
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
    }, b = I(() => [
      new Intl.DisplayNames(["zh-CN"], { type: "language" }).of(l.state.language),
      l.state.profile?.settings.exam,
      [l.state.profile?.settings.level, l.state.profile?.settings.targetLevel].filter(Boolean).join(" → ")
    ].filter(Boolean).join(" · "));
    function f($) {
      n("action", "prepare", {
        kind: $,
        message: $ === "reading-writing" ? "请按我的训练设置准备一篇读写训练。" : "请按我现在的情况准备一节专项小课。"
      });
    }
    const k = ($, v) => n("action", $, v), h = ($, v, d) => n("confirm", $, v, d);
    return ($, v) => (t(), i("div", nr, [
      !e.state.sourceChoice || !c.value ? (t(), K(bt, {
        key: 0,
        state: e.state,
        disabled: e.disabled,
        pending: e.pending,
        onAction: k
      }, null, 8, [
        "state",
        "disabled",
        "pending"
      ])) : g("", !0),
      e.state.dueCount && !o.value ? (t(), i("div", ir, [a("span", null, s(r(At)(e.state.dueCount)), 1), e.state.pending?.purpose === "review-prepare" ? (t(), i("span", lr, [
        v[12] || (v[12] = a("span", {
          class: "learning-working-dot",
          "aria-hidden": "true"
        }, null, -1)),
        v[13] || (v[13] = a("span", null, "正在出题…", -1)),
        a("button", {
          type: "button",
          disabled: e.pending,
          onClick: v[0] || (v[0] = (d) => n("action", "cancel"))
        }, "停止", 8, sr)
      ])) : e.state.blockedReview ? g("", !0) : (t(), i("button", {
        key: 1,
        type: "button",
        class: "learning-primary",
        disabled: e.disabled,
        onClick: v[1] || (v[1] = (d) => n("action", "start-review"))
      }, s(w.review), 9, rr))])) : g("", !0),
      e.state.blockedReview ? (t(), i("div", or, [v[14] || (v[14] = a("p", { class: "learning-muted" }, "有一组复习在另一个故事中进行。回到那个故事可以接着做；也可以放下它，在这里重新出题。", -1)), a("button", {
        type: "button",
        disabled: e.disabled,
        onClick: v[2] || (v[2] = (d) => h("abandon-review", {}, r(Se).review))
      }, "放下", 8, ur)])) : g("", !0),
      e.state.review ? (t(), K(zs, {
        key: 3,
        state: e.state,
        review: e.state.review,
        disabled: e.disabled,
        pending: e.pending,
        onAction: k,
        onConfirm: h
      }, null, 8, [
        "state",
        "review",
        "disabled",
        "pending"
      ])) : g("", !0),
      u.value?.kind === "reading-writing" ? (t(), K(Ls, {
        key: 4,
        state: e.state,
        unit: u.value,
        disabled: e.disabled,
        pending: e.pending,
        onAction: k,
        onConfirm: h,
        onAsk: v[3] || (v[3] = (d, C) => n("ask", d, C)),
        onRecord: v[4] || (v[4] = (d) => n("record", d))
      }, null, 8, [
        "state",
        "unit",
        "disabled",
        "pending"
      ])) : u.value ? (t(), i("section", dr, [
        a("p", vr, "专项小课 · 完成可得 " + s(u.value.reward.amount) + " 小白币", 1),
        a("h1", cr, s(u.value.title), 1),
        u.value.goal ? (t(), i("p", gr, s(u.value.goal), 1)) : g("", !0),
        (t(!0), i(A, null, D(u.value.materials, (d) => (t(), i("button", {
          key: d.id,
          type: "button",
          class: "learning-activity-link",
          onClick: (C) => n("present", {
            unitId: u.value.id,
            kind: "material",
            id: d.id,
            title: d.title
          })
        }, [
          F(z, { name: "book" }),
          a("span", null, s(d.title), 1),
          F(z, { name: "arrow" })
        ], 8, mr))), 128)),
        (t(!0), i(A, null, D(u.value.exercises, (d) => (t(), i("button", {
          key: d.id,
          type: "button",
          class: "learning-activity-link",
          onClick: (C) => n("present", {
            unitId: u.value.id,
            kind: "exercise",
            id: d.id,
            title: d.prompt
          })
        }, [
          F(z, { name: u.value.stage.exercises.find((C) => C.exerciseId === d.id)?.status === "done" ? "check" : "records" }, null, 8, ["name"]),
          a("span", null, s(d.prompt), 1),
          F(z, { name: "arrow" })
        ], 8, pr))), 128)),
        a("div", br, [a("button", {
          type: "button",
          disabled: e.disabled,
          onClick: v[5] || (v[5] = (d) => n("action", "complete"))
        }, s(w.complete), 9, fr), a("button", {
          type: "button",
          onClick: v[6] || (v[6] = (d) => n("go", "materials"))
        }, s(w.notes), 1)])
      ])) : g("", !0),
      c.value ? (t(), i("section", yr, [e.state.blockedUnit ? (t(), i(A, { key: 0 }, [
        v[15] || (v[15] = a("h1", { tabindex: "-1" }, "当前课件在另一个故事中", -1)),
        v[16] || (v[16] = a("p", { class: "learning-muted" }, "回到那个故事可以继续；也可以放下它，在这里重新开始。", -1)),
        a("button", {
          type: "button",
          disabled: e.disabled,
          onClick: v[7] || (v[7] = (d) => h("abandon", {}, r(Se).lesson))
        }, "放下并重新开始", 8, kr)
      ], 64)) : (t(), i(A, { key: 1 }, [
        u.value ? (t(), i("h2", $r, s(w.next), 1)) : (t(), i("h1", hr, s(e.state.teacher ? w.reading : w.selectFirst), 1)),
        e.state.teacher && !u.value ? (t(), i("button", {
          key: 2,
          type: "button",
          class: "learning-start-preference",
          "aria-label": `${w.settings}：${b.value}`,
          onClick: v[8] || (v[8] = (d) => n("go", "settings"))
        }, [a("span", null, [a("strong", null, s(w.settings), 1), a("small", null, s(b.value), 1)]), F(z, { name: "arrow" })], 8, wr)) : g("", !0),
        e.state.sourceChoice ? (t(), K(bt, {
          key: 3,
          state: e.state,
          disabled: e.disabled,
          pending: e.pending,
          onAction: k
        }, null, 8, [
          "state",
          "disabled",
          "pending"
        ])) : g("", !0),
        e.state.teacher && !y.value && !e.state.sourceChoice ? (t(), i(A, { key: 4 }, [a("section", xr, [
          F(z, { name: "workbook" }),
          a("p", null, s(w.readingHint), 1),
          a("button", {
            type: "button",
            class: "learning-primary",
            disabled: e.disabled,
            onClick: v[9] || (v[9] = (d) => f("reading-writing"))
          }, [G(s(w.start), 1), F(z, { name: "arrow" })], 8, Cr)
        ]), a("button", {
          type: "button",
          class: "learning-start-secondary",
          disabled: e.disabled,
          onClick: v[10] || (v[10] = (d) => f("lesson"))
        }, [
          F(z, { name: "records" }),
          a("span", null, [a("strong", null, s(w.lesson), 1), a("small", null, s(w.lessonHint), 1)]),
          F(z, { name: "arrow" })
        ], 8, Ir)], 64)) : e.state.teacher ? g("", !0) : (t(), i("button", {
          key: 5,
          type: "button",
          class: "learning-primary",
          onClick: v[11] || (v[11] = (d) => n("go", "profile"))
        }, s(w.select), 1))
      ], 64))])) : g("", !0)
    ]));
  }
}), Sr = Lr;
function ft(e) {
  try {
    return JSON.parse(e);
  } catch {
    return {};
  }
}
function Ar(e) {
  const m = [];
  for (const l of e.messages) l.role === "assistant" ? m.push({
    message: l,
    results: []
  }) : l.role === "tool" && m.at(-1)?.results.push(l);
  return m.map(({ message: l, results: n }, o) => ({
    index: o + 1,
    text: l.toolCalls?.length ? l.content : "",
    receivedChars: l.receivedChars,
    thinking: l.hasReasoning,
    streaming: !!l.streaming,
    tools: (l.toolCalls ?? []).map((u) => {
      const c = n.find((f) => f.toolCallId === u.id), y = ft(c?.content ?? ""), w = e.status === "running", b = c?.error || y.ok === !1 ? "failed" : c?.content && !c.streaming ? "done" : !w || l.error ? "cancelled" : c?.streaming ? "running" : "preparing";
      return {
        id: u.id,
        name: u.name,
        status: b,
        input: ft(u.arguments),
        result: y
      };
    })
  }));
}
var Rr = ["aria-label"], Mr = { class: "learning-process-header" }, Tr = ["aria-expanded"], Er = { "aria-hidden": "true" }, Nr = ["disabled", "aria-label"], Br = ["aria-label"], Or = ["data-status"], qr = {
  class: "learning-process-dot",
  "aria-hidden": "true"
}, Vr = { key: 0 }, Pr = { class: "learning-process-result" }, Ur = {
  key: 1,
  class: "learning-process-status",
  role: "status",
  "aria-live": "polite"
}, jr = {
  key: 0,
  class: "learning-working-dot",
  "aria-hidden": "true"
}, Dr = /* @__PURE__ */ Q({
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
  setup(e, { emit: m }) {
    const l = e, n = m, o = I(() => Ar(l.turn)), u = I(() => o.value.flatMap((v) => v.tools)), c = I(() => l.turn.status === "running"), y = I(() => ie.taskTitles[l.turn.purpose]), w = H(null), b = I(() => w.value ?? (c.value || l.turn.status === "failed")), f = H(null), k = I(() => l.turn.progress?.round ?? o.value.at(-1)?.index), h = I(() => {
      if (!c.value) return Z.outcomes[l.turn.status];
      const v = o.value.at(-1), d = v?.tools.find((C) => C.status === "running" || C.status === "preparing");
      if (d) return `${Z.tools[d.name] ?? Z.title} · ${Z[d.status]}`;
      if (l.turn.progress?.stage === "provider" && v?.streaming) {
        if (v.receivedChars) return Z.received(v.receivedChars);
        if (v.thinking) return Z.thinking;
      }
      return Qi(l.turn.progress ?? { stage: "provider" });
    });
    function $(v) {
      const d = [], C = v.result.section ?? v.input.section;
      C && Z.sections[C] && d.push(Z.sections[C]), v.result.resultsCount !== void 0 && d.push(Z.results(v.result.resultsCount)), v.result.paragraphCount !== void 0 && d.push(Z.paragraphs(v.result.paragraphCount)), v.result.dataCount !== void 0 && d.push(Z.entries(v.result.dataCount)), v.result.failedCount && d.push(Z.sourcesFailed(v.result.failedCount)), v.name === "LearningLessonEdit" && (v.input.materialsCount && d.push(Z.proposedMaterials(v.input.materialsCount)), v.input.exercisesCount && d.push(Z.proposedExercises(v.input.exercisesCount))), v.result.errorsCount && d.push(Z.issues(v.result.errorsCount));
      const E = (v.result.errorFields ?? []).map((M) => Fa[M]).filter(Boolean);
      return E.length && d.push(Z.checkFields([...new Set(E)].join("、"))), d.join(" · ");
    }
    return Y(c, () => {
      w.value = null;
    }), Y(() => l.turn.messages, async () => {
      const v = f.value, d = !v || v.scrollHeight - v.scrollTop - v.clientHeight < 48;
      await oe(), d && f.value && (f.value.scrollTop = f.value.scrollHeight);
    }), (v, d) => c.value || u.value.length ? (t(), i("section", {
      key: 0,
      class: ne(["learning-process", { "is-running": c.value }]),
      "aria-label": r(Z).title
    }, [
      a("header", Mr, [a("button", {
        type: "button",
        class: "learning-process-toggle",
        "aria-expanded": b.value,
        onClick: d[0] || (d[0] = (C) => w.value = !b.value)
      }, [
        a("span", Er, s(b.value ? "⌄" : "›"), 1),
        a("strong", null, s(y.value ?? r(Z).title), 1),
        a("small", null, s(c.value && k.value ? r(Z).round(k.value) : r(Z).history(u.value.length)), 1)
      ], 8, Tr), c.value && e.stoppable ? (t(), i("button", {
        key: 0,
        type: "button",
        class: "learning-process-stop",
        disabled: e.disabled,
        "aria-label": r(Z).stop,
        onClick: d[1] || (d[1] = (C) => n("stop"))
      }, "■", 8, Nr)) : g("", !0)]),
      b.value ? (t(), i("div", {
        key: 0,
        ref_key: "body",
        ref: f,
        class: "learning-process-body"
      }, [(t(!0), i(A, null, D(o.value, (C) => (t(), i(A, { key: C.index }, [C.text ? (t(), K(He, {
        key: 0,
        class: "learning-markdown learning-process-narration",
        text: C.text
      }, null, 8, ["text"])) : g("", !0), C.tools.length ? (t(), i("ol", {
        key: 1,
        class: "learning-process-steps",
        "aria-label": r(Z).round(C.index)
      }, [(t(!0), i(A, null, D(C.tools, (E) => (t(), i("li", {
        key: E.id,
        "data-status": E.status
      }, [
        a("span", qr, s(E.status === "done" ? "✓" : E.status === "failed" ? "!" : "·"), 1),
        a("div", null, [a("span", null, s(r(Z).tools[E.name] ?? r(Z).title), 1), $(E) ? (t(), i("small", Vr, s($(E)), 1)) : g("", !0)]),
        a("small", Pr, s(r(Z)[E.status]), 1)
      ], 8, Or))), 128))], 8, Br)) : g("", !0)], 64))), 128))], 512)) : g("", !0),
      !y.value || c.value || b.value ? (t(), i("p", Ur, [c.value ? (t(), i("span", jr)) : g("", !0), G(s(h.value), 1)])) : g("", !0)
    ], 10, Rr)) : g("", !0);
  }
}), Pt = Dr;
function Le(e) {
  return e.kind === "reading-article" || e.kind === "reading-notes" || e.kind === "reading-essay";
}
function Be(e) {
  return e.kind === "talk" || e.kind === "explain" || e.kind === "companion";
}
var yt = {
  initial: "我想跟你学这门语言，先聊聊吧。",
  returning: "我来继续学语言了，先聊聊今天从哪里开始吧。"
}, Wr = { class: "learning-messages" }, Fr = /* @__PURE__ */ Q({
  __name: "LearningMessages",
  props: {
    turn: {},
    disabled: { type: Boolean }
  },
  emits: ["stop"],
  setup(e, { emit: m }) {
    const l = e, n = m, o = I(() => l.turn.messages.filter((u) => u.role === "assistant" && !u.toolCalls?.length && u.content));
    return (u, c) => (t(), i("div", Wr, [F(Pt, {
      turn: e.turn,
      stoppable: "",
      disabled: e.disabled,
      onStop: c[0] || (c[0] = (y) => n("stop"))
    }, null, 8, ["turn", "disabled"]), (t(!0), i(A, null, D(o.value, (y, w) => (t(), i("div", {
      key: w,
      class: ne(["learning-output", { "is-streaming": y.streaming }])
    }, [F(He, {
      class: "learning-markdown",
      text: y.content
    }, null, 8, ["text"])], 2))), 128))]));
  }
}), Gr = Fr, Hr = { class: "learning-conversation" }, zr = { class: "learning-conversation-heading" }, Yr = { class: "learning-person-initial" }, Kr = ["disabled"], Zr = ["aria-label"], Jr = {
  key: 0,
  class: "learning-history-notice"
}, Qr = {
  key: 0,
  class: "learning-conversation-user"
}, Xr = ["disabled", "onClick"], _r = {
  key: 3,
  class: "learning-conversation-tools"
}, eo = ["disabled"], to = ["disabled"], ao = {
  key: 1,
  class: "learning-working",
  role: "status"
}, no = {
  key: 2,
  class: "learning-turn-notice is-error",
  role: "status"
}, io = {
  key: 3,
  class: "learning-conversation-empty"
}, lo = ["disabled"], so = { class: "learning-composer-surface" }, ro = {
  key: 0,
  class: "learning-composer-quote"
}, oo = { class: "learning-composer-row" }, uo = ["maxlength", "onKeydown"], vo = [
  "type",
  "disabled",
  "aria-label",
  "title"
], co = /* @__PURE__ */ Q({
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
  setup(e, { expose: m, emit: l }) {
    const n = e, o = I(() => n.state.conversation.turns.map((q, V) => ({
      turn: q,
      index: V
    })).filter(({ turn: q }) => !Le({ kind: q.purpose ?? "talk" }) || q.status === "running")), u = {
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
    ]), y = l, w = he().chat, b = ve(w, "text"), f = H(null), k = H(null), h = H(null), $ = ve(w, "focus");
    let v = null, d = 0;
    function C() {
      const q = h.value;
      q && (w.scroll = q.scrollTop, w.following = q.scrollHeight - q.scrollTop - q.clientHeight < 70);
    }
    async function E() {
      await oe(), w.following && h.value && (h.value.scrollTop = h.value.scrollHeight);
    }
    function M() {
      const q = f.value;
      q?.clientWidth && (q.style.height = "auto", q.style.height = `${q.scrollHeight}px`, E());
    }
    Y(b, M, { flush: "post" }), Y(f, (q) => {
      if (v?.disconnect(), cancelAnimationFrame(d), !q) return;
      let V = 0;
      v = new ResizeObserver(([R]) => {
        R.contentRect.width !== V && (V = R.contentRect.width, cancelAnimationFrame(d), d = requestAnimationFrame(M));
      }), v.observe(q.parentElement);
    }, { flush: "post" }), ye(() => {
      h.value && (h.value.scrollTop = w.scroll), E();
    }), ke(() => {
      h.value && (w.scroll = h.value.scrollTop), v?.disconnect(), cancelAnimationFrame(d);
    });
    function T() {
      if (n.disabled || !b.value.trim()) return;
      const q = b.value.trim();
      w.sent = {
        text: b.value,
        user: $.value?.selection ? `${q}

${$.value.selection.quote}` : q,
        after: n.state.conversation.turns.length + n.state.conversation.removedTurns
      }, w.following = !0, y("action", $.value ? "explain" : "talk", {
        message: q,
        ...$.value ?? {}
      });
    }
    Y([() => n.state.conversation.turns, () => n.state.chatBusy], E);
    function j(q) {
      return q.kind === "replacement" ? !n.disabled && n.state.currentUnitId === q.unitId : n.state.unit?.id === q.unitId && (q.kind === "exercise" ? n.state.unit.exercises : n.state.unit.materials).some((V) => V.id === q.id);
    }
    return m({
      async ask(q, V) {
        $.value = {
          exerciseId: q,
          selection: V
        }, await oe(), f.value?.focus();
      },
      focusHeading: () => k.value?.focus({ preventScroll: !0 })
    }), (q, V) => (t(), i("section", Hr, [
      a("header", zr, [
        a("span", Yr, s([...e.state.teacher?.name ?? "伴"][0]), 1),
        a("h1", {
          ref_key: "heading",
          ref: k,
          tabindex: "-1"
        }, s(e.state.teacher?.name ?? "语伴"), 513),
        a("button", {
          type: "button",
          disabled: e.disabled,
          "aria-label": "更换学习语言和语伴",
          onClick: V[0] || (V[0] = (R) => y("profile"))
        }, s(new Intl.DisplayNames(["zh-CN"], { type: "language" }).of(e.state.language)), 9, Kr)
      ]),
      a("div", {
        ref_key: "scroller",
        ref: h,
        class: "learning-conversation-turns",
        "aria-label": u.conversation,
        onScroll: C
      }, [
        e.state.conversation.removedTurns ? (t(), i("p", Jr, s(u.history), 1)) : g("", !0),
        (t(!0), i(A, null, D(o.value, ({ turn: R, index: P }, W) => (t(), i("div", {
          key: e.state.conversation.removedTurns + P,
          class: "learning-conversation-turn"
        }, [
          R.user && !r(c).has(R.purpose) && !r(Le)({ kind: R.purpose ?? "talk" }) ? (t(), i("p", Qr, s(R.user), 1)) : g("", !0),
          F(Gr, {
            turn: R,
            disabled: e.pending,
            onStop: (B) => y("action", r(Be)({ kind: R.purpose ?? "talk" }) ? "cancel-chat" : r(Le)({ kind: R.purpose ?? "talk" }) ? "cancel-preparation" : "cancel")
          }, null, 8, [
            "turn",
            "disabled",
            "onStop"
          ]),
          R.message ? (t(), i("p", {
            key: 1,
            class: ne(["learning-turn-notice", { "is-error": R.status === "failed" }]),
            role: "status"
          }, s(R.message), 3)) : g("", !0),
          R.presentation ? (t(), i("button", {
            key: 2,
            type: "button",
            class: "learning-activity-link",
            disabled: !j(R.presentation),
            onClick: (B) => y("present", R.presentation)
          }, [
            F(z, { name: R.presentation.kind === "material" ? "book" : "records" }, null, 8, ["name"]),
            a("span", null, s(R.presentation.title), 1),
            F(z, { name: "arrow" })
          ], 8, Xr)) : g("", !0),
          W === o.value.length - 1 && e.state.reply?.text === R.teacher ? (t(), i("div", _r, [[...R.teacher].length <= 1e3 ? (t(), i("button", {
            key: 0,
            type: "button",
            disabled: e.disabled,
            onClick: V[1] || (V[1] = (B) => y("action", "say-reply"))
          }, [F(z, { name: "sound" }), V[8] || (V[8] = G("听语伴说", -1))], 8, eo)) : g("", !0), e.state.reply.exerciseId && [...R.teacher].length <= 4e3 ? (t(), i("button", {
            key: 1,
            type: "button",
            disabled: e.disabled || e.state.unit?.notes.some((B) => B.text === R.teacher),
            onClick: V[2] || (V[2] = (B) => y("action", "save-note"))
          }, "保存笔记", 8, to)) : g("", !0)])) : g("", !0)
        ]))), 128)),
        e.state.chatBusy && !e.state.conversation.turns.some((R) => R.status === "running" && r(Be)({ kind: R.purpose ?? "talk" })) ? (t(), i("div", ao, [V[9] || (V[9] = a("span", {
          class: "learning-working-dot",
          "aria-hidden": "true"
        }, null, -1)), a("span", null, s(e.state.chatMessage), 1)])) : !e.state.chatBusy && e.state.chatMessage ? (t(), i("p", no, s(e.state.chatMessage), 1)) : g("", !0),
        !o.value.length && !e.state.chatBusy ? (t(), i("div", io, [
          F(z, { name: "chat" }),
          a("p", null, s(e.state.teacher ? u.empty : u.select), 1),
          e.state.teacher ? (t(), i("button", {
            key: 1,
            type: "button",
            disabled: e.disabled,
            onClick: V[4] || (V[4] = (R) => y("action", "talk", { message: e.state.profile ? r(yt).returning : r(yt).initial }))
          }, s(u.opening), 9, lo)) : (t(), i("button", {
            key: 0,
            class: "learning-primary",
            type: "button",
            onClick: V[3] || (V[3] = (R) => y("profile"))
          }, s(u.select), 1))
        ])) : g("", !0)
      ], 40, Zr),
      e.state.teacher ? (t(), i("form", {
        key: 0,
        class: "learning-conversation-compose",
        onSubmit: ae(T, ["prevent"])
      }, [a("div", so, [$.value ? (t(), i("div", ro, [a("span", null, s($.value.selection?.quote ?? "请教这道题"), 1), a("button", {
        type: "button",
        "aria-label": "取消引用",
        onClick: V[5] || (V[5] = (R) => $.value = null)
      }, "×")])) : g("", !0), a("div", oo, [ee(a("textarea", {
        ref_key: "composer",
        ref: f,
        "onUpdate:modelValue": V[6] || (V[6] = (R) => b.value = R),
        rows: "1",
        maxlength: $.value?.selection ? 1800 : $.value?.exerciseId ? 2e3 : 4e3,
        "aria-label": "和语伴说",
        placeholder: "和语伴说…",
        onKeydown: [be(ae(T, ["ctrl", "prevent"]), ["enter"]), be(ae(T, ["meta", "prevent"]), ["enter"])]
      }, null, 40, uo), [[le, b.value], [r(Oe), r(w)]]), a("button", {
        type: e.state.chatBusy ? "button" : "submit",
        class: ne(e.state.chatBusy ? "learning-composer-stop" : "learning-primary"),
        disabled: e.state.chatBusy ? e.pending : e.disabled || !b.value.trim(),
        "aria-label": e.state.chatBusy ? "停止回复" : "发送给语伴",
        title: e.state.chatBusy ? "停止回复" : "发送给语伴",
        onClick: V[7] || (V[7] = ae((R) => e.state.chatBusy ? y("action", "cancel-chat") : T(), ["prevent"]))
      }, [F(z, { name: e.state.chatBusy ? "stop" : "send" }, null, 8, ["name"])], 10, vo)])])], 32)) : g("", !0)
    ]));
  }
}), go = co;
function mo(e) {
  const m = zt(structuredClone(Yt(e.initialState))), l = H(!1), n = H(null), o = I(() => n.value ? It[n.value] : ""), u = I(() => n.value === "unknown" || n.value === "rejected");
  let c = !1, y = 0, w = () => {
  };
  const b = I(() => !l.value && !m.value.busy && m.value.storage === "ready"), f = I(() => !l.value && !m.value.chatBusy && m.value.storage === "ready");
  async function k(h, $ = {}) {
    if (l.value) return;
    l.value = !0, n.value = null;
    const v = m.value.chatIdentity, d = y;
    let C = !1;
    try {
      const E = JSON.parse(JSON.stringify({
        chatIdentity: v,
        ...$
      }));
      C = !0;
      const M = await e.bridge.request(`learning/${h}`, E, 35e3);
      return !c || m.value.chatIdentity !== v ? void 0 : (y === d && M.result.state.chatIdentity === v && (m.value = M.result.state), M.result.rejected && (n.value = M.result.rejected), M.result);
    } catch (E) {
      c && m.value.chatIdentity === v && (n.value = !C || E instanceof Qt && E.code === "host_request_not_sent" ? "notSent" : E instanceof Jt ? "rejected" : "unknown");
    } finally {
      c && (l.value = !1);
    }
  }
  return ye(() => {
    c = !0, w = e.bridge.subscribe((h) => {
      if (h.type === "learning/media") {
        m.value = {
          ...m.value,
          media: h.payload.media
        };
        return;
      }
      if (h.type !== "learning/state") return;
      const $ = h.payload.state;
      $.chatIdentity === m.value.chatIdentity && (y++, m.value = $);
    });
  }), ke(() => {
    c = !1, w();
  }), {
    state: m,
    pending: l,
    writable: b,
    canChat: f,
    localIssue: n,
    localMessage: o,
    needsRefresh: u,
    request: k
  };
}
function po(e = Math.random) {
  return Math.round(3 * 6e4 + Math.min(Math.max(e(), 0), 1) * 9 * 6e4);
}
function bo(e) {
  let m = !1, l, n = 0;
  function o() {
    l !== void 0 && (e.clearTimer(l), l = void 0);
  }
  function u() {
    if (!m) return;
    const c = n;
    l = e.setTimer(() => {
      c === n && (l = void 0, m && (e.opportunity(), u()));
    }, po(e.random));
  }
  return {
    update(c) {
      m !== c && (m = c, n++, o(), u());
    },
    dispose() {
      m = !1, n++, o();
    }
  };
}
function fo(e) {
  const m = H(!1), l = H(!1), n = H(!1), o = H("");
  let u, c;
  const y = I(() => e.preference.enabled && e.reading.value && m.value && !e.blocked.value && !!e.state.value.teacher && e.state.value.storage === "ready"), w = I(() => y.value && !l.value && !n.value && !e.pending.value && !e.state.value.busy && !e.state.value.chatBusy && !e.state.value.companionBusy);
  function b() {
    const C = e.root.value?.querySelector(".learning-scroll")?.getBoundingClientRect(), E = C?.top ?? 0, M = [...e.root.value?.querySelectorAll("[data-material-id][data-paragraph-id]") ?? []].find((T) => T.getBoundingClientRect().bottom > E + 60 && T.getBoundingClientRect().top < (C?.bottom ?? 0));
    return M ? {
      materialId: M.dataset.materialId,
      paragraphId: M.dataset.paragraphId
    } : null;
  }
  const f = bo({
    setTimer: (C, E) => setTimeout(C, E),
    clearTimer: (C) => clearTimeout(C),
    opportunity: () => {
      const C = b();
      C && e.request("companion", C);
    }
  });
  Y(w, (C) => f.update(C), { immediate: !0 }), Y([
    y,
    l,
    n,
    e.pending,
    () => e.state.value.companionBusy
  ], ([C, E, M, T, j]) => {
    j && !T && (!C || E || M) && e.request("cancel-companion");
  });
  function k() {
    const C = document.activeElement;
    l.value = C instanceof HTMLElement && !!e.root.value?.contains(C) && C.matches("textarea, input:not([type=checkbox],[type=radio],[type=range]), [contenteditable=true]");
  }
  const h = () => queueMicrotask(k);
  function $(C) {
    !(C.target instanceof HTMLElement) || !C.target.matches("textarea, input:not([type=checkbox],[type=radio],[type=range]), [contenteditable=true]") || (clearTimeout(u), n.value = !0, u = setTimeout(() => {
      n.value = !1;
    }, 3e4));
  }
  function v() {
    m.value = document.visibilityState === "visible", m.value || (clearTimeout(u), n.value = !1, d()), k();
  }
  function d() {
    clearTimeout(c), o.value = "";
  }
  return Y(() => e.state.value.remark?.text ?? "", (C) => {
    d(), C && e.reading.value && m.value && !l.value && !e.blocked.value && (o.value = C, c = setTimeout(d, 1e4));
  }), Y([
    e.reading,
    e.blocked,
    l
  ], ([C, E, M]) => {
    (!C || E || M) && d();
  }), ye(() => {
    v(), document.addEventListener("visibilitychange", v), e.root.value?.addEventListener("focusin", h), e.root.value?.addEventListener("focusout", h), e.root.value?.addEventListener("input", $);
  }), ke(() => {
    f.dispose(), clearTimeout(u), d(), document.removeEventListener("visibilitychange", v), e.root.value?.removeEventListener("focusin", h), e.root.value?.removeEventListener("focusout", h), e.root.value?.removeEventListener("input", $);
  }), {
    bubble: o,
    dismiss: d
  };
}
var yo = { class: "learning-toolbar" }, ko = {
  key: 0,
  class: "learning-unread-dot",
  "aria-hidden": "true"
}, ho = {
  key: 1,
  class: "learning-layout-control"
}, $o = ["min", "max"], wo = { "aria-label": "学习资料与设置" }, xo = { "aria-label": "学习资料与设置" }, Co = ["onClick"], Io = {
  key: 0,
  class: "learning-notice",
  role: "status",
  "aria-live": "polite"
}, Lo = { class: "learning-row" }, So = ["disabled"], Ao = ["disabled"], Ro = ["disabled"], Mo = ["disabled"], To = ["inert", "aria-hidden"], Eo = {
  key: 1,
  class: "learning-working",
  role: "status"
}, No = ["disabled"], Bo = {
  key: 4,
  class: "learning-materials-page"
}, Oo = {
  key: 0,
  class: "learning-empty-note"
}, qo = { class: "learning-materials-title" }, Vo = ["onClick"], Po = ["onClick"], Uo = {
  key: 0,
  class: "learning-notes"
}, jo = { key: 0 }, Do = ["disabled", "onClick"], Wo = {
  key: 6,
  class: "learning-harvest-page"
}, Fo = {
  key: 0,
  class: "learning-empty-note"
}, Go = { key: 0 }, Ho = { class: "learning-muted" }, zo = ["disabled", "onClick"], Yo = ["disabled"], Ko = ["disabled"], Zo = {
  key: 3,
  class: "learning-row"
}, Jo = ["disabled"], Qo = ["disabled"], Xo = {
  key: 7,
  class: "learning-settings-page"
}, _o = ["value", "disabled"], eu = ["value"], tu = {
  key: 0,
  class: "learning-settings-goal"
}, au = {
  key: 0,
  class: "learning-muted"
}, nu = ["value", "disabled"], iu = ["disabled"], lu = ["disabled"], su = ["disabled"], ru = ["disabled"], ou = ["disabled"], uu = ["disabled"], du = ["disabled"], vu = ["inert", "aria-hidden"], cu = ["aria-label"], gu = { class: "learning-person-initial" }, mu = {
  key: 0,
  class: "learning-unread-dot",
  "aria-hidden": "true"
}, pu = ["aria-label"], bu = {
  key: 0,
  class: "learning-unread-dot",
  "aria-hidden": "true"
}, fu = {
  role: "alertdialog",
  "aria-labelledby": "learning-confirm-title",
  class: "learning-confirm"
}, yu = { id: "learning-confirm-title" }, ku = { class: "learning-row" }, hu = ["disabled"], $u = /* @__PURE__ */ Q({
  __name: "LearningApp",
  props: {
    bridge: {},
    initialState: {}
  },
  setup(e) {
    const m = e, l = {
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
    }, { state: n, pending: o, writable: u, canChat: c, localMessage: y, needsRefresh: w, request: b } = mo(m), f = an(n), k = H(n.value.teacher ? "home" : "profile"), h = [], $ = H(null), v = H(!1);
    Ee(() => $.value?.open ? ($.value.open = !1, !0) : !1, () => v.value);
    const d = H(null), C = H(null), E = H(null), M = {}, T = H(null), j = H(0), q = I(() => j.value >= 760), V = H("work"), R = H(!0), P = H(!1), W = H(62), B = I(() => Math.max(42, Math.ceil(320 / Math.max(j.value, 1) * 100))), O = I(() => Math.min(68, Math.floor((1 - 320 / Math.max(j.value, 1)) * 100))), L = I({
      get: () => q.value ? Math.min(O.value, Math.max(B.value, W.value)) : W.value,
      set: (S) => {
        W.value = S;
      }
    }), U = H(!1);
    let N, X;
    const ce = () => {
      U.value = X?.matches ?? !1;
    };
    ye(() => {
      X = matchMedia("(prefers-reduced-motion: reduce)"), ce(), X.addEventListener("change", ce), !(!T.value || typeof ResizeObserver > "u") && (N = new ResizeObserver(([S]) => {
        j.value = S?.contentRect.width ?? 0;
      }), N.observe(T.value));
    }), ke(() => {
      N?.disconnect(), X?.removeEventListener("change", ce);
    });
    const _ = I(() => q.value || V.value === "work"), ge = I(() => !!n.value.teacher && (q.value || V.value === "chat"));
    Y([
      _,
      ge,
      U
    ], async ([S, p, x], ue, at) => {
      let nt = !0, it;
      if (at(() => {
        nt = !1, clearTimeout(it);
      }), S && (R.value = !0), p && (P.value = !0), await oe(), !nt) return;
      S && E.value && (E.value.scrollTop = M[k.value] ?? 0);
      const lt = () => {
        R.value = S, P.value = p;
      };
      q.value || x ? lt() : it = setTimeout(lt, 320);
    }, { immediate: !0 });
    function me() {
      _.value && E.value && (M[k.value] = E.value.scrollTop);
    }
    const qe = I(() => {
      const { turns: S, removedTurns: p } = n.value.conversation;
      let x = S.length - 1;
      for (; x >= 0 && Le({ kind: S[x].purpose ?? "talk" }); ) x--;
      return x < 0 ? 0 : p + x + 1;
    }), Ve = H(qe.value);
    Y([qe, ge], ([S, p]) => {
      (p || S < Ve.value) && (Ve.value = S);
    }, { immediate: !0 });
    const Ke = I(() => qe.value > Ve.value), we = I(() => {
      const S = n.value.conversation.turns;
      let p = S.length - 1;
      for (; p >= 0 && Be({ kind: S[p].purpose ?? "talk" }); ) p--;
      let x = S.length - 1;
      for (; x >= 0 && (S[x].status !== "running" || Be({ kind: S[x].purpose ?? "talk" })); ) x--;
      return x >= 0 && (p = x), p < 0 ? null : {
        turn: n.value.conversation.turns[p],
        key: `${n.value.chatIdentity}:${n.value.language}:${n.value.conversation.removedTurns + p}`
      };
    });
    async function Ze() {
      n.value.teacher && (me(), V.value = "chat", P.value = !0, await oe(), V.value === "chat" && d.value?.focusHeading());
    }
    async function Pe() {
      R.value = !0, V.value = "work", await oe(), E.value && (E.value.scrollTop = M[k.value] ?? 0);
      const S = E.value?.querySelector("h1, h2");
      S && (S.tabIndex = -1, S.focus({ preventScroll: !0 }));
    }
    let Je = 0;
    Y(() => !!n.value.record, async (S, p) => {
      k.value !== "books" || S === p || (S && (Je = E.value?.scrollTop ?? 0), await oe(), k.value === "books" && E.value && (E.value.scrollTop = S ? 0 : Je));
    });
    const te = H(null), Qe = H(null);
    ht(Qe, () => {
      te.value = null;
    });
    const Ae = H(n.value.profile?.voice?.voiceId ?? n.value.voices.defaultVoice), Re = H(n.value.profile?.voice?.language ?? n.value.language), Me = H(n.value.profile?.voice?.speed ?? 1), pe = H(0), Ut = I(() => n.value.completions.slice(pe.value * 20, (pe.value + 1) * 20));
    Y([() => n.value.language, () => n.value.profile?.voice], ([S, p]) => {
      Ae.value = p?.voiceId ?? n.value.voices.defaultVoice, Re.value = p?.language ?? S, Me.value = p?.speed ?? 1;
    }), Y([
      () => n.value.chatIdentity,
      () => n.value.language,
      () => n.value.teacher?.name
    ], () => {
      C.value = null, te.value = null, pe.value = 0;
    }), Y(() => !!n.value.teacher, (S) => {
      S || (V.value = "work");
    }), Y(() => n.value.currentUnitId, (S) => {
      te.value?.action === "replace-lesson" && te.value.input.unitId !== S && (te.value = null);
    }), Y(() => n.value.unit, (S) => {
      const p = C.value;
      p && (S?.id !== p.unitId || !(p.kind === "exercise" ? S.exercises : S.materials).some((x) => x.id === p.id)) && Ue();
    }), Y(() => {
      const S = n.value.conversation.turns.at(-1)?.presentation;
      return S ? `${n.value.conversation.turns.length + n.value.conversation.removedTurns}:${S.unitId}:${S.kind}:${S.id}` : "";
    }, (S) => {
      const p = n.value.conversation.turns.at(-1)?.presentation;
      S && p && Ce(p, !0);
    });
    const xe = H(!1);
    Y([_, k], ([S, p]) => {
      S && p === "home" && (xe.value = !1);
    });
    async function Ce(S, p = !1) {
      if (S.kind === "replacement") {
        if (n.value.currentUnitId !== S.unitId || n.value.storage !== "ready") return;
        de("replace-lesson", {
          unitId: S.unitId,
          message: S.message,
          kind: S.unitKind
        }, l.replaceWarning);
        return;
      }
      if (n.value.unit?.id === S.unitId) {
        if (n.value.unit.kind === "reading-writing") {
          if (p) {
            (!_.value || k.value !== "home") && (xe.value = !0);
            return;
          }
          f.unit(S.unitId).reading.view = "reading", await se("home");
          const x = S.kind === "exercise" ? `[data-exercise-id="${CSS.escape(S.id)}"]` : `[data-material-id="${CSS.escape(S.id)}"][data-paragraph-id]`;
          E.value?.querySelector(x)?.scrollIntoView({
            block: "start",
            behavior: matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth"
          });
          return;
        }
        C.value = S;
      }
    }
    function Ue() {
      C.value = null, b("stop");
    }
    async function Xe(S, p) {
      Ue(), me(), V.value = "chat", P.value = !0, await oe(), await d.value?.ask(S, p);
    }
    async function se(S, p = !1) {
      if (S !== k.value && !p) if (S === "home") h.length = 0;
      else {
        const x = h.indexOf(S);
        x >= 0 ? h.splice(x) : h.push(k.value);
      }
      if (E.value && (M[k.value] = E.value.scrollTop), $.value && ($.value.open = !1), k.value = S, await Pe(), await oe(), E.value) {
        E.value.scrollTop = M[S] ?? 0;
        const x = [...E.value.querySelectorAll("h1, h2")].find((ue) => ue.offsetParent !== null);
        x && (x.tabIndex = -1, x.focus({ preventScroll: !0 }));
      }
    }
    async function _e() {
      await se("home"), E.value && (E.value.scrollTop = 0);
      const S = E.value?.querySelector("#learning-review-title");
      S && (S.tabIndex = -1, S.focus({ preventScroll: !0 }));
    }
    async function je(S, p = {}) {
      if (S === "prepare" && !n.value.profile) {
        f.setup.step = n.value.teacher ? 2 : 0, await se("profile");
        return;
      }
      S === "start-review" && await _e();
      const x = n.value.unit;
      x?.kind === "reading-writing" && p.unitId === x.id && [
        "grade",
        "submit-revision",
        "skip-revision"
      ].includes(S) && (f.unit(x.id).reading.view = S !== "grade" || [
        "reviewing",
        "model",
        "complete"
      ].includes(x.stage.stage) ? "model" : "feedback", await se("home"), E.value && (E.value.scrollTop = 0)), await b(S, p);
    }
    Y(() => f.settings.submitted, (S, p) => {
      !S && p && !f.settings.open && k.value === "profile" && f.setup.step === 2 && n.value.storage === "ready" && !n.value.busy && n.value.profile && Object.entries(p.value).every(([x, ue]) => n.value.profile.settings[x] === ue) && se("home");
    }), Y(() => n.value.busy, (S) => {
      const p = n.value.unit;
      !S && p?.stage.stage === "revising" && f.unit(p.id).reading.view === "model" && (f.unit(p.id).reading.view = "feedback");
    });
    const et = Ee(() => $.value?.open ? ($.value.open = !1, !0) : !q.value && V.value === "chat" ? (Pe(), !0) : k.value === "home" || !h.length && k.value === "profile" && !n.value.teacher ? !1 : (se(h.pop() ?? "home", !0), !0));
    function de(S, p, x) {
      te.value = {
        action: S,
        input: p,
        text: x
      };
    }
    async function jt(S) {
      await b("records", {
        id: S,
        offset: n.value.records.offset
      }), n.value.record?.id === S && await se("books");
    }
    const { bubble: tt, dismiss: De } = fo({
      root: T,
      state: n,
      pending: o,
      preference: f.companion,
      reading: I(() => _.value && k.value === "home" && n.value.unit?.kind === "reading-writing" && [
        "writing",
        "grading",
        "complete"
      ].includes(n.value.unit.stage.stage)),
      blocked: I(() => !!C.value || !!te.value || v.value),
      request: b
    });
    async function Dt() {
      const S = await b("export");
      if (!S?.document) return;
      const p = URL.createObjectURL(new Blob([JSON.stringify(S.document, null, 2)], { type: "application/json" })), x = document.createElement("a");
      x.href = p, x.download = "LittleWhiteBox_Learning.json", x.click(), setTimeout(() => URL.revokeObjectURL(p), 1e3);
    }
    return (S, p) => (t(), i("section", {
      ref_key: "root",
      ref: T,
      class: "learning-app",
      style: kt({
        "--learning-switch-ms": `${r(320)}ms`,
        "--learning-work-share": `${L.value}%`
      }),
      "aria-label": "语伴语言学习"
    }, [
      a("header", yo, [
        k.value !== "home" && (r(n).teacher || h.length) && (q.value || V.value === "work") ? (t(), i("button", {
          key: 0,
          type: "button",
          class: "learning-toolbar-back",
          "aria-label": "返回上一页",
          onClick: p[0] || (p[0] = (...x) => r(et) && r(et)(...x))
        }, [F(z, { name: "back" })])) : g("", !0),
        a("button", {
          type: "button",
          class: "learning-wordmark",
          onClick: p[1] || (p[1] = (x) => se("home"))
        }, [
          p[33] || (p[33] = a("span", {
            class: "learning-brand-mark",
            "aria-hidden": "true"
          }, [G("a"), a("span", null, "あ")], -1)),
          p[34] || (p[34] = G("语伴", -1)),
          xe.value && (q.value || V.value === "work") ? (t(), i("span", ko)) : g("", !0)
        ]),
        q.value && r(n).teacher ? (t(), i("label", ho, [
          F(z, { name: "workbook" }),
          ee(a("input", {
            "onUpdate:modelValue": p[2] || (p[2] = (x) => L.value = x),
            type: "range",
            min: B.value,
            max: O.value,
            step: "1",
            "aria-label": "阅读区宽度比例"
          }, null, 8, $o), [[
            le,
            L.value,
            void 0,
            { number: !0 }
          ]]),
          F(z, { name: "chat" })
        ])) : g("", !0),
        a("details", {
          ref_key: "menu",
          ref: $,
          class: "learning-menu",
          onToggle: p[3] || (p[3] = (x) => v.value = !!$.value?.open),
          onKeydown: p[4] || (p[4] = be(ae((x) => $.value.open = !1, ["stop", "prevent"]), ["esc"]))
        }, [a("summary", wo, [F(z, { name: "more" })]), a("nav", xo, [(t(), i(A, null, D([
          ["books", "语法本与生词本"],
          ["materials", "课件与笔记"],
          ["harvest", "我的收获"],
          ["settings", "设置"]
        ], ([x, ue]) => a("button", {
          key: x,
          type: "button",
          onClick: (at) => se(x)
        }, s(ue), 9, Co)), 64))])], 544)
      ]),
      r(y) || !r(n).busy && (r(n).message || r(n).storage !== "ready") ? (t(), i("div", Io, [G(s(r(y) || r(n).message || (r(n).storage === "unconfirmed" ? r(Fe).unconfirmed : r(n).storage === "conflict" ? r(Fe).conflict : r(Fe).unloaded)) + " ", 1), a("div", Lo, [
        r(n).storage === "unconfirmed" || r(n).storage === "conflict" ? (t(), i("button", {
          key: 0,
          type: "button",
          disabled: r(o),
          onClick: p[5] || (p[5] = (x) => r(b)("verify"))
        }, s(l.verify), 9, So)) : g("", !0),
        r(n).storage === "unconfirmed" ? (t(), i("button", {
          key: 1,
          type: "button",
          disabled: r(o),
          onClick: p[6] || (p[6] = (x) => r(b)("retry-save"))
        }, s(l.retry), 9, Ao)) : g("", !0),
        r(n).storage === "conflict" ? (t(), i("button", {
          key: 2,
          type: "button",
          disabled: r(o),
          onClick: p[7] || (p[7] = (x) => de("adopt-server", {}, l.adoptWarning))
        }, s(l.adopt), 9, Ro)) : g("", !0),
        r(n).storage === "unloaded" || r(w) ? (t(), i("button", {
          key: 3,
          type: "button",
          disabled: r(o),
          onClick: p[8] || (p[8] = (x) => r(b)("read"))
        }, s(r(It).refresh), 9, Mo)) : g("", !0)
      ])])) : g("", !0),
      a("div", { class: ne(["learning-stage", {
        "is-wide": q.value,
        "is-chat": !q.value && V.value === "chat"
      }]) }, [
        a("div", {
          class: "learning-pane is-work",
          inert: !_.value,
          "aria-hidden": !_.value
        }, [a("div", {
          ref_key: "scroller",
          ref: E,
          class: "learning-scroll",
          onScrollPassive: me
        }, [R.value ? (t(), i(A, { key: 0 }, [
          we.value ? (t(), K(Pt, {
            key: we.value.key,
            turn: we.value.turn,
            stoppable: "",
            disabled: r(o),
            onStop: p[9] || (p[9] = (x) => r(b)(r(Le)({ kind: we.value.turn.purpose ?? "talk" }) ? "cancel-preparation" : "cancel"))
          }, null, 8, ["turn", "disabled"])) : g("", !0),
          r(n).busy && we.value?.turn.status !== "running" ? (t(), i("div", Eo, [
            p[35] || (p[35] = a("span", {
              class: "learning-working-dot",
              "aria-hidden": "true"
            }, null, -1)),
            a("span", null, s(r(n).message || l.working), 1),
            a("button", {
              type: "button",
              disabled: r(o),
              onClick: p[10] || (p[10] = (x) => r(b)("cancel"))
            }, "停止", 8, No)
          ])) : g("", !0),
          k.value === "home" ? (t(), K(Sr, {
            key: 2,
            state: r(n),
            disabled: !r(u),
            pending: r(o),
            onAction: je,
            onConfirm: de,
            onPresent: Ce,
            onGo: se,
            onAsk: Xe,
            onRecord: jt
          }, null, 8, [
            "state",
            "disabled",
            "pending"
          ])) : g("", !0),
          k.value === "profile" ? (t(), K(Wi, {
            key: 3,
            state: r(n),
            disabled: !r(u),
            onAction: r(b)
          }, null, 8, [
            "state",
            "disabled",
            "onAction"
          ])) : g("", !0),
          k.value === "materials" ? (t(), i("section", Bo, [
            p[36] || (p[36] = a("h1", null, "课件与笔记", -1)),
            r(n).unit ? g("", !0) : (t(), i("p", Oo, s(r(n).blockedUnit ? "当前课件在另一个故事中" : "还没有课件"), 1)),
            r(n).unit ? (t(), i(A, { key: 1 }, [
              a("p", qo, s(r(n).unit.title), 1),
              (t(!0), i(A, null, D(r(n).unit.materials, (x) => (t(), i("button", {
                key: x.id,
                type: "button",
                class: "learning-activity-link",
                onClick: (ue) => Ce({
                  unitId: r(n).unit.id,
                  kind: "material",
                  id: x.id,
                  title: x.title
                })
              }, [
                F(z, { name: "book" }),
                a("span", null, s(x.title), 1),
                F(z, { name: "arrow" })
              ], 8, Vo))), 128)),
              (t(!0), i(A, null, D(r(n).unit.exercises, (x) => (t(), i("button", {
                key: x.id,
                type: "button",
                class: "learning-activity-link",
                onClick: (ue) => Ce({
                  unitId: r(n).unit.id,
                  kind: "exercise",
                  id: x.id,
                  title: x.prompt
                })
              }, [
                F(z, { name: "records" }),
                a("span", null, s(x.prompt), 1),
                F(z, { name: "arrow" })
              ], 8, Po))), 128)),
              r(n).unit.notes.length ? (t(), i("section", Uo, [(t(!0), i(A, null, D(r(n).unit.notes, (x) => (t(), i("article", { key: x.id }, [
                x.selection ? (t(), i("blockquote", jo, s(x.selection.quote), 1)) : g("", !0),
                a("p", null, s(x.text), 1),
                a("button", {
                  type: "button",
                  disabled: !r(u),
                  onClick: (ue) => r(b)("delete-note", { id: x.id })
                }, "删除笔记", 8, Do)
              ]))), 128))])) : g("", !0)
            ], 64)) : g("", !0)
          ])) : g("", !0),
          k.value === "books" ? (t(), K(vi, {
            key: 5,
            state: r(n),
            disabled: !r(u),
            onAction: je,
            onReview: _e,
            onRemove: de
          }, null, 8, ["state", "disabled"])) : g("", !0),
          k.value === "harvest" ? (t(), i("section", Wo, [
            p[38] || (p[38] = a("div", { class: "learning-page-heading" }, [a("h1", null, "我的收获")], -1)),
            r(n).completions.length ? g("", !0) : (t(), i("p", Fo, "还没有完成的课程")),
            (t(!0), i(A, null, D(Ut.value, (x) => (t(), i("article", {
              key: x.unitId,
              class: "learning-harvest-entry"
            }, [
              a("small", null, s(new Date(x.completedAt).toLocaleDateString()), 1),
              x.rewardStatus !== "retired" ? (t(), i("h2", Go, [G(s(x.rewardStatus === "paid" ? "+" : "") + s(x.amount), 1), p[37] || (p[37] = a("span", null, "小白币", -1))])) : g("", !0),
              a("p", null, s(x.summary), 1),
              a("p", Ho, s(x.rewardStatus === "paid" ? r(re).paid : x.rewardStatus === "retired" ? r(re).retired : r(re).pending), 1),
              x.rewardStatus !== "paid" && x.rewardStatus !== "retired" ? (t(), i("button", {
                key: 1,
                type: "button",
                disabled: !r(u) || r(n).walletStorage !== "ready",
                onClick: (ue) => r(b)("reward", {
                  unitId: x.unitId,
                  openWallet: !r(n).walletOpen
                })
              }, s(r(n).walletOpen ? r(re).claim : r(re).openWallet), 9, zo)) : g("", !0)
            ]))), 128)),
            r(n).walletStorage === "unconfirmed" || r(n).walletStorage === "conflict" || r(n).walletStorage === "failed" ? (t(), i("button", {
              key: 1,
              type: "button",
              disabled: r(o) || r(n).busy,
              onClick: p[11] || (p[11] = (x) => r(b)("verify-wallet"))
            }, s(l.verifyWallet), 9, Yo)) : g("", !0),
            r(n).walletStorage === "conflict" ? (t(), i("button", {
              key: 2,
              type: "button",
              disabled: r(o) || r(n).busy,
              onClick: p[12] || (p[12] = (x) => de("adopt-wallet", {}, l.adoptWalletWarning))
            }, s(l.adoptWallet), 9, Ko)) : g("", !0),
            r(n).completions.length > 20 ? (t(), i("div", Zo, [a("button", {
              type: "button",
              disabled: pe.value === 0,
              onClick: p[13] || (p[13] = (x) => pe.value--)
            }, "上一页", 8, Jo), a("button", {
              type: "button",
              disabled: (pe.value + 1) * 20 >= r(n).completions.length,
              onClick: p[14] || (p[14] = (x) => pe.value++)
            }, "下一页", 8, Qo)])) : g("", !0)
          ])) : g("", !0),
          k.value === "settings" ? (t(), i("section", Xo, [
            p[48] || (p[48] = a("h1", null, "学习设置", -1)),
            a("label", null, [p[39] || (p[39] = G("当前语言", -1)), a("select", {
              value: r(n).language,
              disabled: !r(u),
              onChange: p[15] || (p[15] = (x) => r(b)("language", { language: x.target.value }))
            }, [(t(!0), i(A, null, D([.../* @__PURE__ */ new Set([r(n).language, ...r(n).languages])], (x) => (t(), i("option", {
              key: x,
              value: x
            }, s(new Intl.DisplayNames(["zh-CN"], { type: "language" }).of(x)), 9, eu))), 128))], 40, _o)]),
            a("button", {
              type: "button",
              onClick: p[16] || (p[16] = (x) => se("profile"))
            }, "更换语言和语伴 →"),
            F(Ot),
            a("section", null, [
              p[40] || (p[40] = a("h2", null, "训练设置", -1)),
              r(n).profile?.goal.description ? (t(), i("p", tu, s(r(n).profile.goal.description), 1)) : g("", !0),
              F(Bt, {
                state: r(n),
                disabled: !r(u),
                onAction: r(b)
              }, null, 8, [
                "state",
                "disabled",
                "onAction"
              ])
            ]),
            a("section", null, [
              p[45] || (p[45] = a("h2", null, "语伴的声音", -1)),
              r(n).voices.enabled ? (t(), i("form", {
                key: 1,
                onSubmit: p[20] || (p[20] = ae((x) => r(b)("voice", { voice: {
                  voiceId: Ae.value,
                  language: Re.value,
                  speed: Number(Me.value)
                } }), ["prevent"]))
              }, [
                a("label", null, [p[41] || (p[41] = G("音色", -1)), ee(a("select", { "onUpdate:modelValue": p[17] || (p[17] = (x) => Ae.value = x) }, [(t(!0), i(A, null, D(r(n).voices.voices, (x) => (t(), i("option", {
                  key: x.id,
                  value: x.id,
                  disabled: !x.available
                }, s(x.name) + s(x.available ? "" : "（暂不可用）"), 9, nu))), 128))], 512), [[Te, Ae.value]])]),
                a("label", null, [p[42] || (p[42] = G("发音语言", -1)), ee(a("input", {
                  "onUpdate:modelValue": p[18] || (p[18] = (x) => Re.value = x),
                  type: "text",
                  maxlength: "80",
                  placeholder: "en / ja"
                }, null, 512), [[le, Re.value]])]),
                a("label", null, [p[44] || (p[44] = G("语速", -1)), ee(a("select", { "onUpdate:modelValue": p[19] || (p[19] = (x) => Me.value = x) }, [...p[43] || (p[43] = [
                  a("option", { value: 0.75 }, "0.75×", -1),
                  a("option", { value: 1 }, "1×", -1),
                  a("option", { value: 1.25 }, "1.25×", -1)
                ])], 512), [[Te, Me.value]])]),
                a("button", {
                  type: "submit",
                  disabled: !r(u) || !r(n).profile
                }, "保存声音设置", 8, iu)
              ], 32)) : (t(), i("p", au, s(l.voiceDisabled), 1)),
              a("button", {
                type: "button",
                onClick: p[21] || (p[21] = (x) => r(b)("tts-settings"))
              }, s(r(n).voices.enabled ? r(Ge).settings : r(Ge).enable), 1),
              p[46] || (p[46] = a("small", null, "已听过的题保留原声音，新偏好用于之后的题目。", -1))
            ]),
            a("section", null, [
              p[47] || (p[47] = a("h2", null, "学习数据", -1)),
              a("button", {
                type: "button",
                disabled: r(o) || r(n).busy,
                onClick: p[22] || (p[22] = (x) => de("forget-conversation", {}, "清空和当前语伴的对话？目标、课件、学习记录和奖励都会保留。"))
              }, "清空对话记录", 8, lu),
              a("button", {
                type: "button",
                disabled: !r(u),
                onClick: Dt
              }, "导出学习数据", 8, su),
              a("button", {
                type: "button",
                disabled: r(o) || r(n).busy,
                onClick: p[23] || (p[23] = (x) => r(b)("read"))
              }, "重新加载", 8, ru),
              r(n).unit || r(n).blockedUnit ? (t(), i("button", {
                key: 0,
                type: "button",
                disabled: !r(u),
                onClick: p[24] || (p[24] = (x) => de("abandon", {}, r(Se).lesson))
              }, "放下当前练习", 8, ou)) : g("", !0),
              a("button", {
                type: "button",
                class: "learning-danger",
                disabled: !r(u) || !r(n).profile,
                onClick: p[25] || (p[25] = (x) => de("delete-language", {}, "删除当前语言的全部学习数据？未领取奖励也将放弃，已到账流水保留。"))
              }, "删除当前语言", 8, uu),
              a("button", {
                type: "button",
                class: "learning-danger",
                disabled: !r(u),
                onClick: p[26] || (p[26] = (x) => de("clear", {}, "清空所有语言的目标、课程和记录？未领取奖励也将放弃。已到账流水不撤销。"))
              }, "清空全部学习数据", 8, du)
            ])
          ])) : g("", !0)
        ], 64)) : g("", !0)], 544)], 8, To),
        r(n).teacher ? (t(), i("div", {
          key: 0,
          class: "learning-pane is-chat",
          inert: !ge.value,
          "aria-hidden": !ge.value
        }, [P.value ? (t(), K(go, {
          key: 0,
          ref_key: "conversation",
          ref: d,
          state: r(n),
          disabled: !r(c),
          pending: r(o),
          onAction: r(b),
          onPresent: Ce,
          onProfile: p[27] || (p[27] = (x) => se("profile"))
        }, null, 8, [
          "state",
          "disabled",
          "pending",
          "onAction"
        ])) : g("", !0)], 8, vu)) : g("", !0),
        !q.value && V.value === "work" && r(n).teacher ? (t(), i("button", {
          key: 1,
          type: "button",
          class: "learning-float is-companion",
          "aria-label": Ke.value ? `和${r(n).teacher.name}聊天，有新消息` : `和${r(n).teacher.name}聊天`,
          onClick: Ze
        }, [a("span", gu, s([...r(n).teacher.name][0]), 1), Ke.value ? (t(), i("span", mu)) : g("", !0)], 8, cu)) : g("", !0),
        !q.value && V.value === "chat" ? (t(), i("button", {
          key: 2,
          type: "button",
          class: "learning-float is-workbook",
          "aria-label": xe.value ? "回到练习本，有新指引" : "回到练习本",
          onClick: Pe
        }, [F(z, { name: "workbook" }), xe.value ? (t(), i("span", bu)) : g("", !0)], 8, pu)) : g("", !0),
        r(tt) ? (t(), i("aside", {
          key: 3,
          class: ne(["learning-companion-bubble", { "is-wide": q.value }]),
          "aria-live": "polite"
        }, [a("button", {
          type: "button",
          onClick: p[28] || (p[28] = (x) => {
            Ze(), r(De)();
          })
        }, s(r(tt)), 1), a("button", {
          type: "button",
          "aria-label": "收起这句话",
          onClick: p[29] || (p[29] = (...x) => r(De) && r(De)(...x))
        }, [F(z, { name: "close" })])], 2)) : g("", !0)
      ], 2),
      C.value ? g("", !0) : (t(), K(Rt, {
        key: 1,
        state: r(n),
        onAction: r(b)
      }, null, 8, ["state", "onAction"])),
      r(n).unit && C.value ? (t(), K(xn, {
        key: `${r(n).chatIdentity}:${r(n).language}:${r(n).unit.id}:${C.value.kind}:${C.value.id}`,
        state: r(n),
        target: C.value,
        disabled: !r(u),
        onAction: r(b),
        onClose: Ue,
        onAsk: Xe
      }, null, 8, [
        "state",
        "target",
        "disabled",
        "onAction"
      ])) : g("", !0),
      te.value ? (t(), i("div", {
        key: 3,
        ref_key: "confirmLayer",
        ref: Qe,
        class: "learning-confirm-shade",
        onKeydown: p[32] || (p[32] = be(ae((x) => te.value = null, ["stop", "prevent"]), ["esc"]))
      }, [a("section", fu, [
        a("h2", yu, s(r(ut)[te.value.action].title), 1),
        a("p", null, s(te.value.text), 1),
        a("div", ku, [a("button", {
          autofocus: "",
          type: "button",
          onClick: p[30] || (p[30] = (x) => te.value = null)
        }, s(l.cancel), 1), a("button", {
          type: "button",
          class: "learning-primary",
          disabled: r(o) || r(n).busy,
          onClick: p[31] || (p[31] = (x) => {
            je(te.value.action, te.value.input), te.value = null;
          })
        }, s(r(ut)[te.value.action].accept), 9, hu)])
      ])], 544)) : g("", !0)
    ], 4));
  }
}), Su = $u;
export {
  Su as default
};
