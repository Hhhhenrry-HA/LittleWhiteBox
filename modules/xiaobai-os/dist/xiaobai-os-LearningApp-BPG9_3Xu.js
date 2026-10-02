/* eslint-disable */
import { $ as oa, B as ua, D as re, G as Z, I as a, J as ne, L as da, N as Ae, Q as z, R as H, S as ae, T as xt, U as va, W as ca, Z as xe, _ as i, a as He, at as r, b as Y, c as qe, et as ga, g as p, h as J, i as pa, it as qt, k as Re, l as ve, m as n, nt as l, o as de, p as C, q as Pt, rt as se, s as ba, tt as ke, u as E, v as ma, w as fa, x as F, z as ka } from "./xiaobai-os-runtime-dom.esm-bundler-C2atLQPd.js";
import { i as Ut, r as ze } from "./xiaobai-os-app-navigation-5cBwNoCT.js";
import { n as ya, t as ha } from "./xiaobai-os-frame-bridge-BfVuKvnh.js";
import { t as dt } from "./xiaobai-os-MessageMarkdown-BEpRRRf3.js";
var lt = /* @__PURE__ */ new WeakMap(), Ct = [
  "select",
  "input",
  "keyup",
  "pointerup",
  "scroll"
], Ze = {
  mounted(e, c) {
    const s = c.value, t = s.cursor, u = () => {
      s.cursor = {
        start: e.selectionStart,
        end: e.selectionEnd,
        direction: e.selectionDirection,
        top: e.scrollTop,
        left: e.scrollLeft
      };
    };
    lt.set(e, u);
    for (const d of Ct) e.addEventListener(d, u, { passive: !0 });
    re(() => {
      !e.isConnected || !t || (e.setSelectionRange(t.start, t.end, t.direction), e.scrollTop = t.top, e.scrollLeft = t.left);
    });
  },
  beforeUnmount(e) {
    const c = lt.get(e);
    if (c) {
      c();
      for (const s of Ct) e.removeEventListener(s, c);
      lt.delete(e);
    }
  }
}, $a = ["disabled"], wa = {
  key: 0,
  class: "learning-choices"
}, xa = [
  "type",
  "checked",
  "onChange"
], Ca = { class: "learning-option-letter" }, Ia = {
  key: 1,
  class: "learning-order"
}, La = [
  "disabled",
  "aria-label",
  "onClick"
], Sa = [
  "disabled",
  "aria-label",
  "onClick"
], Aa = {
  key: 2,
  class: "learning-fields"
}, Ra = ["onUpdate:modelValue"], Ma = ["value"], Ea = {
  key: 3,
  class: "learning-choices"
}, Ta = ["checked", "onChange"], Na = {
  key: 0,
  class: "learning-muted"
}, Ba = {
  key: 4,
  class: "learning-fields"
}, Oa = ["onUpdate:modelValue"], qa = {
  key: 5,
  class: "learning-writing"
}, Pa = ["disabled"], Ua = /* @__PURE__ */ ae({
  __name: "AnswerInput",
  props: /* @__PURE__ */ xt({
    response: {},
    paragraphs: {},
    disabled: { type: Boolean }
  }, {
    modelValue: { required: !0 },
    modelModifiers: {}
  }),
  emits: /* @__PURE__ */ xt(["submit"], ["update:modelValue"]),
  setup(e, { emit: c }) {
    const s = e, t = c, u = va(e, "modelValue");
    function d(k) {
      s.response.kind === "choice" && !s.response.multiple ? u.value.picked = [k] : u.value.picked = u.value.picked.includes(k) ? u.value.picked.filter((h) => h !== k) : [...u.value.picked, k];
    }
    function v(k, h) {
      const m = [...u.value.order];
      [m[k], m[k + h]] = [m[k + h], m[k]], u.value.order = m;
    }
    const b = C(() => {
      const k = s.response;
      return k.kind === "text" ? !!u.value.text.trim() : k.kind === "gaps" ? k.slots.every((h) => u.value.values[h.id]?.trim()) : k.kind === "match" ? k.left.every((h) => u.value.values[h.id]) : k.kind === "order" ? !0 : u.value.picked.length > 0;
    });
    function I() {
      const k = s.response;
      !b.value || s.disabled || (k.kind === "text" ? t("submit", {
        kind: "text",
        text: u.value.text
      }) : k.kind === "gaps" ? t("submit", {
        kind: "gaps",
        values: k.slots.map((h) => ({
          id: h.id,
          text: u.value.values[h.id]
        }))
      }) : k.kind === "match" ? t("submit", {
        kind: "match",
        pairs: k.left.map((h) => ({
          left: h.id,
          right: u.value.values[h.id]
        }))
      }) : t("submit", {
        kind: k.kind,
        ids: [...k.kind === "order" ? u.value.order : u.value.picked]
      }));
    }
    return (k, h) => (a(), i("form", {
      class: "learning-answer",
      onSubmit: ve(I, ["prevent"])
    }, [n("fieldset", { disabled: e.disabled }, [
      h[3] || (h[3] = n("legend", { class: "learning-sr-only" }, "你的回答", -1)),
      e.response.kind === "choice" ? (a(), i("div", wa, [(a(!0), i(E, null, H(e.response.options, (m, w) => (a(), i("label", {
        key: m.id,
        class: se({ selected: u.value.picked.includes(m.id) })
      }, [
        n("input", {
          type: e.response.multiple ? "checkbox" : "radio",
          name: "answer-choice",
          checked: u.value.picked.includes(m.id),
          onChange: (f) => d(m.id)
        }, null, 40, xa),
        n("span", Ca, r(String.fromCharCode(65 + w)), 1),
        n("span", null, r(m.text), 1)
      ], 2))), 128))])) : e.response.kind === "order" ? (a(), i("ol", Ia, [(a(!0), i(E, null, H(u.value.order, (m, w) => (a(), i("li", { key: m }, [
        n("span", null, r(e.response.options.find((f) => f.id === m)?.text), 1),
        n("button", {
          type: "button",
          disabled: w === 0,
          "aria-label": `上移第 ${w + 1} 项`,
          onClick: (f) => v(w, -1)
        }, "↑", 8, La),
        n("button", {
          type: "button",
          disabled: w === u.value.order.length - 1,
          "aria-label": `下移第 ${w + 1} 项`,
          onClick: (f) => v(w, 1)
        }, "↓", 8, Sa)
      ]))), 128))])) : e.response.kind === "match" ? (a(), i("div", Aa, [(a(!0), i(E, null, H(e.response.left, (m) => (a(), i("label", { key: m.id }, [Y(r(m.text) + " ", 1), ne(n("select", { "onUpdate:modelValue": (w) => u.value.values[m.id] = w }, [h[1] || (h[1] = n("option", { value: "" }, "选择对应项", -1)), (a(!0), i(E, null, H(e.response.right, (w) => (a(), i("option", {
        key: w.id,
        value: w.id
      }, r(w.text), 9, Ma))), 128))], 8, Ra), [[He, u.value.values[m.id]]])]))), 128))])) : e.response.kind === "evidence" ? (a(), i("div", Ea, [(a(!0), i(E, null, H(e.paragraphs, (m) => (a(), i("label", {
        key: m.id,
        class: se({ selected: u.value.picked.includes(m.id) })
      }, [n("input", {
        type: "checkbox",
        checked: u.value.picked.includes(m.id),
        onChange: (w) => d(m.id)
      }, null, 40, Ta), n("span", null, r(m.text), 1)], 2))), 128)), e.paragraphs.length ? p("", !0) : (a(), i("p", Na, "请先展开相关文稿，再选择原文依据。"))])) : e.response.kind === "gaps" ? (a(), i("div", Ba, [(a(!0), i(E, null, H(e.response.slots, (m) => (a(), i("label", { key: m.id }, [Y(r(m.text), 1), ne(n("input", {
        "onUpdate:modelValue": (w) => u.value.values[m.id] = w,
        type: "text",
        maxlength: "4000",
        autocomplete: "off"
      }, null, 8, Oa), [[de, u.value.values[m.id]]])]))), 128))])) : (a(), i("label", qa, [h[2] || (h[2] = n("span", { class: "learning-sr-only" }, "你的回答", -1)), ne(n("textarea", {
        "onUpdate:modelValue": h[0] || (h[0] = (m) => u.value.text = m),
        rows: "6",
        maxlength: "4000",
        placeholder: "写下你的回答…"
      }, null, 512), [[de, u.value.text], [l(Ze), u.value]])])),
      n("button", {
        class: "learning-primary",
        type: "submit",
        disabled: !b.value
      }, "交给语伴 →", 8, Pa)
    ], 8, $a)], 32));
  }
}), Vt = Ua, _t = 2e3, Va = ["stroke-width"], _a = ["d"], Da = /* @__PURE__ */ ae({
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
    return (s, t) => (a(), i("svg", {
      class: "learning-icon",
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      "stroke-width": e.name === "more" ? 3.5 : 1.7,
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      "aria-hidden": "true"
    }, [n("path", { d: c[e.name] }, null, 8, _a)], 8, Va));
  }
}), K = Da, Be = Object.freeze({
  select: "引用这段",
  ask: "问语伴",
  listen: "朗读",
  dismiss: "取消引用"
});
function ja(e, c, s) {
  if (!s?.rangeCount || s.isCollapsed) return null;
  const t = s.getRangeAt(0), u = t.startContainer, d = (u instanceof Element ? u : u.parentElement)?.closest("[data-learning-text]");
  if (!d || !e.contains(d) || !d.contains(t.endContainer)) return null;
  const v = c.find((m) => m.id === d.dataset.materialId), b = v?.paragraphs.find((m) => m.id === d.dataset.paragraphId);
  if (!v || !b) return null;
  const I = t.cloneRange();
  I.selectNodeContents(d), I.setEnd(t.startContainer, t.startOffset);
  const k = I.toString().length, h = t.toString();
  return !h.trim() || [...h].length > 2e3 || b.text.slice(k, k + h.length) !== h ? null : {
    materialId: v.id,
    paragraphId: b.id,
    start: k,
    end: k + h.length,
    quote: h
  };
}
function Dt(e, c, s) {
  const t = () => {
    if (!e.value) return;
    const u = ja(e.value, c(), window.getSelection());
    u && s(u);
  };
  Ae(() => document.addEventListener("selectionchange", t)), Re(() => document.removeEventListener("selectionchange", t));
}
var Wa = { class: "learning-source" }, Ga = { key: 0 }, Fa = ["href"], Ha = {
  key: 0,
  class: "learning-listening-cover"
}, za = ["disabled"], Ya = {
  key: 1,
  class: "learning-material-body"
}, Ka = ["data-material-id", "data-paragraph-id"], Za = ["disabled", "onClick"], Ja = {
  class: "learning-audio-parts",
  "aria-label": "材料朗读分段"
}, Qa = ["disabled", "onClick"], Xa = { key: 2 }, en = /* @__PURE__ */ ae({
  __name: "MaterialReader",
  props: {
    material: {},
    disabled: { type: Boolean },
    exerciseId: {}
  },
  emits: ["action", "select"],
  setup(e, { emit: c }) {
    const s = e, t = c, u = z(null);
    Dt(u, () => [s.material], (v) => t("select", v));
    function d(v) {
      t("select", {
        materialId: s.material.id,
        paragraphId: v.id,
        start: 0,
        end: v.text.length,
        quote: v.text
      });
    }
    return (v, b) => (a(), i("article", {
      ref_key: "root",
      ref: u,
      class: "learning-material"
    }, [
      n("h2", null, r(e.material.title), 1),
      n("div", Wa, [e.material.provenance.kind === "authored" ? (a(), i("span", Ga, "语伴自编练习")) : (a(), i("a", {
        key: 1,
        href: e.material.provenance.url,
        target: "_blank",
        rel: "noopener noreferrer"
      }, r(e.material.provenance.kind === "original" ? "原文节选" : "改编自") + " · " + r(e.material.provenance.title) + " ↗", 9, Fa))]),
      e.material.hidden ? (a(), i("div", Ha, [b[1] || (b[1] = n("svg", {
        viewBox: "0 0 140 60",
        "aria-hidden": "true"
      }, [n("path", {
        d: "M8 27v6m10-14v22m10-31v40m10-26v12m10-35v58m10-47v36m10-27v18m10-37v56m10-36v16m10-29v42m10-31v20m10-16v12m10-8v4",
        stroke: "currentColor",
        "stroke-width": "3",
        "stroke-linecap": "round",
        fill: "none"
      })], -1)), n("button", {
        type: "button",
        disabled: e.disabled,
        onClick: b[0] || (b[0] = (I) => t("action", "reveal", {
          kind: "transcripts",
          id: e.material.id
        }))
      }, "看文稿", 8, za)])) : (a(), i("div", Ya, [(a(!0), i(E, null, H(e.material.paragraphs, (I) => (a(), i("div", {
        key: I.id,
        class: "learning-paragraph"
      }, [n("p", {
        tabindex: "0",
        "data-learning-text": "",
        "data-material-id": e.material.id,
        "data-paragraph-id": I.id
      }, r(I.text), 9, Ka), n("button", {
        type: "button",
        disabled: [...I.text].length > l(_t),
        onClick: (k) => d(I)
      }, r(l(Be).select), 9, Za)]))), 128))])),
      n("div", Ja, [(a(!0), i(E, null, H(e.material.parts, (I) => (a(), i("button", {
        key: I.key,
        type: "button",
        disabled: e.disabled,
        onClick: (k) => t("action", "play", {
          materialId: e.material.id,
          partKey: I.key,
          exerciseId: e.exerciseId
        })
      }, [F(K, { name: "play" }), Y(r(e.material.parts.length > 1 ? `听第 ${I.number} 段` : "播放朗读"), 1)], 8, Qa))), 128))]),
      e.material.parts.length ? (a(), i("small", Xa, "TTS 合成朗读")) : p("", !0)
    ], 512));
  }
}), It = en;
function vt(e, c, s = []) {
  const t = (u) => c.kind === "choice" || c.kind === "order" ? c.options.find((d) => d.id === u)?.text ?? u : s.find((d) => d.id === u)?.text ?? u;
  return e.kind === "text" ? e.text : e.kind === "gaps" ? e.values.map((u) => `${c.kind === "gaps" ? c.slots.find((d) => d.id === u.id)?.text ?? "" : ""} ${u.text}`).join(`
`) : e.kind === "match" ? e.pairs.map((u) => c.kind === "match" ? `${c.left.find((d) => d.id === u.left)?.text} → ${c.right.find((d) => d.id === u.right)?.text}` : "").join(`
`) : e.ids.map(t).join(e.kind === "order" ? " → " : `
`);
}
var tn = { class: "learning-feedback" }, an = { class: "learning-muted" }, nn = { key: 0 }, ln = { key: 1 }, sn = { key: 0 }, rn = { key: 1 }, on = { key: 2 }, un = {
  key: 3,
  class: "learning-muted"
}, dn = ["disabled"], vn = ["disabled"], cn = /* @__PURE__ */ ae({
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
    return (s, t) => (a(), i("section", tn, [
      t[6] || (t[6] = n("p", { class: "learning-eyebrow" }, "已保存的原答", -1)),
      n("blockquote", null, r(l(vt)(e.attempt.answer, e.response, e.paragraphs)), 1),
      n("small", an, [
        Y(r(e.attempt.help.feedback ? "得到反馈后的再练" : e.attempt.help.answer || e.attempt.help.hint || e.attempt.help.transcript ? "这次有辅助" : "未使用答案或提示"), 1),
        e.attempt.help.replays ? (a(), i("span", nn, " · 重听 " + r(e.attempt.help.replays) + " 次", 1)) : p("", !0),
        e.attempt.help.slowPlayback ? (a(), i("span", ln, " · 慢放")) : p("", !0)
      ]),
      e.feedback ? (a(), i(E, { key: 0 }, [
        n("h3", null, r(c[e.feedback.verdict]), 1),
        e.feedback.understanding ? (a(), i("p", sn, [t[2] || (t[2] = n("b", null, "理解", -1)), Y(r(e.feedback.understanding), 1)])) : p("", !0),
        e.feedback.expression ? (a(), i("p", rn, [t[3] || (t[3] = n("b", null, "表达", -1)), Y(r(e.feedback.expression), 1)])) : p("", !0),
        e.feedback.guidance ? (a(), i("p", on, [t[4] || (t[4] = n("b", null, "批注", -1)), Y(r(e.feedback.guidance), 1)])) : p("", !0),
        e.revised ? (a(), i("small", un, "这篇已有修改稿，结果以修改稿的批改为准。")) : (a(), i("button", {
          key: 4,
          type: "button",
          disabled: e.disabled,
          onClick: t[0] || (t[0] = (u) => s.$emit("action", "assess", {
            attemptId: e.attempt.id,
            review: !0,
            message: "请重新审视我的原答与题目。也请考虑其他有效表达，不只对照原来的答案键。"
          }))
        }, r(e.feedback.verdict === "disputed" ? "请语伴复核" : "有疑问，请复核"), 9, dn))
      ], 64)) : (a(), i(E, { key: 1 }, [t[5] || (t[5] = n("p", null, "原答已保存，等待语伴评估。", -1)), n("button", {
        type: "button",
        disabled: e.disabled,
        onClick: t[1] || (t[1] = (u) => s.$emit("action", "assess", {
          attemptId: e.attempt.id,
          review: !1,
          message: "请评估这条已经保存的原答。"
        }))
      }, "重试评估", 8, vn)], 64))
    ]));
  }
}), jt = cn, Wt = {
  busy: "上一件事还没做完，等它完成后再试一次吧。这次没有开始。",
  notSent: "这次没有发出去，输入的内容还在。请再试一次。",
  rejected: "这次操作未能完成，请查看最新状态后再继续。",
  unknown: "还没收到确认，操作可能仍在继续。请先查看最新状态，不要重复发送。",
  refresh: "查看最新状态"
}, Le = {
  unconfirmed: "搭子的对话与设置尚未确认保存，已收到的回复保留。",
  conflict: "搭子的对话与设置有另一份已保存的版本，请先核对。",
  failed: "暂时没能打开搭子的对话与设置，请检查保存。",
  verify: "检查搭子记录",
  adopt: "使用已保存记录",
  adoptWarning: "放弃尚未确认的对话或设置，使用已保存的搭子记录？文章与作文会保留。"
}, X = {
  title: "学习动态",
  unknownTool: "准备下一步",
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
}, gn = {
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
}, Gt = {
  unassessed: "还没练过",
  review: "待确认",
  independent: "已能独立使用",
  practised: "练过一次",
  strengthen: "再练练"
}, Ft = (e) => `${e} 次作答`, Ht = (e) => `${e} 个知识点可以温习了`, rt = {
  settings: "声音设置",
  enable: "开启语音"
}, te = {
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
}, Lt = {
  title: "还有内容没提交",
  accept: "放弃并切换"
}, St = {
  language: Lt,
  teacher: Lt,
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
  "adopt-workbench": {
    title: "使用已保存的教学对话？",
    accept: "使用已保存记录"
  },
  "adopt-teacher": {
    title: "使用已保存的搭子记录？",
    accept: "使用已保存记录"
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
}, he = {
  context: "切换后，尚未提交的输入会丢失。已提交的作答和学习记录会保留。",
  companion: "切换语伴会清空尚未发送的聊天内容，当前练习和作答会保留。",
  keepEditing: "继续编辑",
  lesson: "本次练习的材料、作答和笔记会删除；已收入学习本的记录和已获得的奖励会保留。",
  review: "这组已答的题会删除，复习时间安排不变。"
}, Se = {
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
}, ee = {
  send: "发送",
  stop: "停止回复",
  retry: "重试回复",
  assistant: "学习助手",
  assistantEmpty: "想调整学习安排，还是问问这次的批改？",
  assistantPlaceholder: "问学习助手…",
  closeAssistant: "回到读写",
  askAssessment: "问问这次批改",
  clearAssistant: "清空教学对话",
  clearCompanion: "清空搭子对话",
  clearAssistantConfirm: "清空当前语言的教学对话？文章、作文和学习记录都会保留。",
  clearCompanionConfirm: "清空和当前搭子的对话？文章、作文和学习记录都会保留。",
  assistantStorage: "学习助手的记录暂不可用，请检查保存。已收到的回复保留。",
  verify: "检查保存",
  adopt: "使用已保存记录",
  adoptConfirm: "放弃本次尚未保存的对话，使用服务器上的记录？",
  skipCompanion: "先自己学",
  listen: "听这段回复",
  saveNote: "保存笔记"
}, pn = {
  key: 0,
  class: "learning-player",
  "aria-label": "课堂朗读"
}, bn = {
  key: 0,
  role: "status"
}, mn = {
  key: 2,
  class: "learning-row"
}, fn = ["aria-label", "disabled"], kn = ["max", "value"], yn = /* @__PURE__ */ ae({
  __name: "LearningPlayer",
  props: { state: {} },
  emits: ["action"],
  setup(e, { emit: c }) {
    const s = c;
    function t(u) {
      return `${Math.floor(u / 60)}:${String(Math.floor(u % 60)).padStart(2, "0")}`;
    }
    return (u, d) => e.state.media.status !== "idle" ? (a(), i("section", pn, [
      e.state.media.message ? (a(), i("p", bn, r(e.state.media.message), 1)) : p("", !0),
      e.state.voices.enabled ? p("", !0) : (a(), i("button", {
        key: 1,
        type: "button",
        onClick: d[0] || (d[0] = (v) => s("action", "tts-settings"))
      }, r(l(rt).enable), 1)),
      e.state.media.key ? (a(), i("div", mn, [
        F(K, { name: "sound" }),
        n("span", null, r(e.state.media.status === "loading" ? "正在生成声音…" : `${t(e.state.media.position)} / ${t(e.state.media.duration)}`), 1),
        e.state.media.status === "playing" ? (a(), i("button", {
          key: 0,
          type: "button",
          "aria-label": "暂停",
          onClick: d[1] || (d[1] = (v) => s("action", "pause"))
        }, [F(K, { name: "pause" })])) : [
          "paused",
          "ended",
          "blocked"
        ].includes(e.state.media.status) ? (a(), i("button", {
          key: 1,
          type: "button",
          "aria-label": e.state.media.status === "ended" ? "再听一遍" : "继续播放",
          disabled: e.state.busy,
          onClick: d[2] || (d[2] = (v) => s("action", "resume"))
        }, [F(K, { name: "play" })], 8, fn)) : p("", !0),
        n("button", {
          type: "button",
          "aria-label": "停止",
          onClick: d[3] || (d[3] = (v) => s("action", "stop"))
        }, [F(K, { name: "stop" })]),
        e.state.media.duration ? (a(), i("button", {
          key: 2,
          type: "button",
          onClick: d[4] || (d[4] = (v) => s("action", "rate", { value: e.state.media.rate === 1 ? 0.75 : 1 }))
        }, r(e.state.media.rate) + "×", 1)) : p("", !0)
      ])) : p("", !0),
      e.state.media.duration ? (a(), i("input", {
        key: 3,
        type: "range",
        min: "0",
        max: e.state.media.duration,
        step: "0.1",
        value: e.state.media.position,
        "aria-label": "当前声音片段播放位置",
        onChange: d[5] || (d[5] = (v) => s("action", "seek", { value: Number(v.target.value) }))
      }, null, 40, kn)) : p("", !0)
    ])) : p("", !0);
  }
}), zt = yn, hn = { class: "learning-selection" }, $n = { class: "learning-row" }, wn = ["disabled"], xn = /* @__PURE__ */ ae({
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
    return (c, s) => (a(), i("div", hn, [n("blockquote", null, r(e.selection.quote), 1), n("div", $n, [
      n("button", {
        type: "button",
        onClick: s[0] || (s[0] = (t) => c.$emit("ask"))
      }, r(l(Be).ask), 1),
      n("button", {
        type: "button",
        disabled: e.disabled || [...e.selection.quote].length > 1e3,
        onClick: s[1] || (s[1] = (t) => c.$emit("say"))
      }, r(l(Be).listen), 9, wn),
      n("button", {
        type: "button",
        onClick: s[2] || (s[2] = (t) => c.$emit("dismiss"))
      }, r(l(Be).dismiss), 1)
    ])]));
  }
}), Yt = xn;
function Ye(e) {
  return {
    picked: [],
    text: "",
    values: {},
    order: e.kind === "order" ? e.options.map((c) => c.id) : []
  };
}
function At(e, c) {
  const s = Ye(c);
  return !!e.text.trim() || !!e.picked.length || Object.values(e.values).some((t) => !!t.trim()) || e.order.length !== s.order.length || e.order.some((t, u) => t !== s.order[u]);
}
function Kt(e) {
  const c = (s) => s.trim() || null;
  return {
    exam: c(e.exam),
    level: c(e.level),
    targetLevel: c(e.targetLevel),
    explanationLanguage: e.explanationLanguage,
    interests: c(e.interests)
  };
}
var Fe = () => ({
  text: "",
  cursor: void 0,
  focus: null,
  study: null,
  sent: null,
  scroll: 0,
  following: !0
});
function Cn() {
  const e = xe({}), c = xe(Fe()), s = xe(Fe()), t = xe({
    open: !1,
    form: {
      exam: "",
      level: "",
      targetLevel: "",
      explanationLanguage: "zh-CN",
      interests: ""
    },
    submitted: null
  }), u = xe({ enabled: !1 }), d = xe({
    step: 0,
    name: "",
    note: ""
  }), v = xe({
    tab: "grammar",
    reason: ""
  });
  return {
    units: e,
    chat: c,
    workbenchChat: s,
    settings: t,
    companion: u,
    setup: d,
    books: v,
    unit(b) {
      return e[b] ??= {
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
      }, e[b];
    },
    reset(b = !1, I = !1) {
      if (!I) {
        for (const k of Object.keys(e)) delete e[k];
        t.open = !1, t.submitted = null, Object.assign(s, Fe());
      }
      Object.assign(c, Fe()), u.enabled = !1, b || Object.assign(d, {
        step: 0,
        name: "",
        note: ""
      }), Object.assign(v, {
        tab: "grammar",
        reason: ""
      });
    },
    reconcile(b) {
      const I = t.submitted;
      I && b.storage === "ready" && !b.busy && b.profile && Object.entries(I.value).every(([k, h]) => b.profile.settings[k] === h) && (Object.entries(I.form).every(([k, h]) => t.form[k] === h) && (t.open = !1), t.submitted = null);
      for (const k of Object.keys(e)) {
        const h = [b.unit, b.review].find((w) => w?.id === k);
        if (!h) {
          delete e[k];
          continue;
        }
        for (const [w, f] of Object.entries(e[k].activityDrafts)) {
          const $ = h.attempts.filter((o) => o.exerciseId === w).at(-1);
          if (f.submitted && $ && $.id !== f.submitted.before) {
            delete e[k].activityDrafts[w];
            const o = e[k].activities[`exercise:${w}`];
            o && (o.retry = !1);
          }
        }
        const m = e[k].selection;
        m && h.materials.find((w) => w.id === m.materialId)?.paragraphs.find((w) => w.id === m.paragraphId)?.text.slice(m.start, m.end) !== m.quote && (e[k].selection = null);
        for (const [w, f] of Object.entries(e[k].writing)) {
          const $ = h.attempts.filter((x) => x.exerciseId === w && !x.revisesAttemptId).at(-1), o = f.submitted;
          !o || !$ || $.id === o.before || (f.text === o.text && $.answer.kind === "text" && $.answer.text === o.text.trim() ? (f.text = "", f.rewriting = !1) : f.rewriting = !0, f.submitted = null);
        }
      }
      for (const [k, h] of [[c, b.conversation], [s, b.workbenchConversation]]) {
        const m = k.sent;
        m && h.turns.some((w, f) => f + h.removedTurns >= m.after && w.purpose === "talk" && w.user === m.user) && (k.text === m.text && (k.text = "", k.focus = null), k.sent = null);
      }
    }
  };
}
var Zt = /* @__PURE__ */ Symbol("learning-ui-session");
function Jt(e, c) {
  if (e.chat.text.trim() || e.workbenchChat.text.trim() || e.settings.open && Object.entries(Kt(e.settings.form)).some(([s, t]) => c.profile?.settings[s] !== t) || e.setup.step === 1 && e.setup.name.trim() && (e.setup.name.trim() !== c.teacher?.name || e.setup.note.trim() !== c.teacher.note)) return !0;
  for (const s of [c.unit, c.review]) {
    const t = s && e.units[s.id];
    if (!(!s || !t)) {
      if (Object.values(t.writing).some((u) => !!u.text.trim()) || s.stage.stage === "revising" && s.assessments.some((u) => u.annotations?.some((d) => t.edits[d.id] && t.edits[d.id].value !== d.quote))) return !0;
      for (const u of s.exercises) {
        const d = t.activityDrafts[u.id]?.value, v = t.review.drafts[u.id];
        if (d && At(d, u.response) || v && !s.attempts.some((b) => b.exerciseId === u.id) && At(v, u.response)) return !0;
      }
    }
  }
  return !1;
}
function In(e, c, s, t) {
  return s === "teacher" ? t.teacher?.name !== c.teacher?.name && !!e.chat.text.trim() : s === "language" && t.language !== c.language && Jt(e, c);
}
function Ln(e) {
  const c = Cn();
  return da(Zt, c), Z([
    () => e.value.chatIdentity,
    () => e.value.language,
    () => e.value.companionSessionId
  ], (s, t) => c.reset(s[0] === t[0], s[0] === t[0] && s[1] === t[1])), Z(() => e.value, (s) => c.reconcile(s), { immediate: !0 }), Z(() => [e.value.unit?.id, e.value.review?.id], (s) => {
    for (const t of [c.chat, c.workbenchChat])
      t.focus?.unitId && !s.includes(t.focus.unitId) && (t.focus = null), t.study && !s.includes(t.study.unitId) && (t.study = null);
  }), Z(() => Jt(c, e.value), (s, t, u) => {
    if (!s) return;
    const d = (v) => {
      v.preventDefault(), v.returnValue = "";
    };
    window.addEventListener("beforeunload", d), u(() => window.removeEventListener("beforeunload", d));
  }, { immediate: !0 }), c;
}
function Me() {
  const e = fa(Zt);
  if (!e) throw new Error("Learning views require their application session");
  return e;
}
function Ee(e) {
  const c = Me();
  return C(() => c.unit(e()));
}
var Sn = ["onKeydown"], An = {
  role: "dialog",
  "aria-labelledby": "learning-activity-title",
  class: "learning-activity"
}, Rn = { class: "learning-activity-header" }, Mn = { id: "learning-activity-title" }, En = {
  key: 0,
  "aria-label": "完成本课的固定奖励"
}, Tn = {
  key: 0,
  class: "learning-margin-note",
  role: "status"
}, Nn = ["open"], Bn = {
  key: 3,
  class: "learning-question"
}, On = { class: "learning-help-actions" }, qn = ["disabled"], Pn = ["disabled"], Un = ["disabled"], Vn = {
  key: 0,
  class: "learning-margin-note"
}, _n = {
  key: 1,
  class: "learning-margin-note"
}, Dn = { key: 0 }, jn = { key: 1 }, Wn = { key: 2 }, Gn = ["disabled"], Fn = /* @__PURE__ */ ae({
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
    const s = e, t = c, u = z(null), d = Ee(() => s.target.unitId), v = C(() => `${s.target.kind}:${s.target.id}`);
    Z([d, v], () => {
      d.value.activities[v.value] ??= {
        scroll: 0,
        selected: null,
        retry: !1,
        materialsOpen: !1
      };
    }, { immediate: !0 });
    const b = C(() => d.value.activities[v.value]), I = z(null), k = C({
      get: () => b.value.retry,
      set: (D) => {
        b.value.retry = D;
      }
    }), h = C({
      get: () => b.value.selected,
      set: (D) => {
        b.value.selected = D;
      }
    }), m = z(null);
    function w() {
      h.value ? h.value = null : k.value ? k.value = !1 : t("close");
    }
    Ut(m, w);
    const f = C(() => d.value.activityDrafts);
    let $ = null;
    const o = C(() => s.target?.kind === "exercise" ? s.state.unit?.exercises.find((D) => D.id === s.target?.id) : void 0), x = C(() => s.state.unit?.materials.filter((D) => s.target?.kind === "material" ? D.id === s.target.id : o.value?.materialIds.includes(D.id)) ?? []), V = C(() => o.value?.id ?? s.state.unit?.exercises.find((D) => D.skill === "listening" && D.materialIds.includes(s.target?.id ?? ""))?.id ?? s.state.unit?.exercises.find((D) => D.materialIds.includes(s.target?.id ?? ""))?.id), R = C(() => x.value.filter((D) => o.value?.response.kind !== "evidence" || D.id === o.value.response.materialId).flatMap((D) => D.paragraphs)), L = C(() => s.state.unit?.attempts.filter((D) => D.exerciseId === o.value?.id).at(-1)), B = C(() => s.state.unit?.assessments.find((D) => D.attemptId === L.value?.id));
    Z(() => o.value, (D) => {
      if (!D) return;
      const P = JSON.stringify(D.response);
      f.value[D.id]?.response !== P && (f.value[D.id] = {
        response: P,
        value: Ye(D.response)
      });
    }, { immediate: !0 });
    const W = C({
      get: () => f.value[o.value.id].value,
      set: (D) => {
        f.value[o.value.id].value = D;
      }
    });
    Ae(() => {
      I.value?.focus({ preventScroll: !0 }), u.value && (u.value.scrollTop = b.value.scroll);
    }), Re(() => {
      u.value && (b.value.scroll = u.value.scrollTop);
    }), Z(() => s.state.unit?.attempts, (D) => {
      if (!$) return;
      const P = D?.filter((j) => j.exerciseId === $.id).at(-1);
      if (P && P.id !== $.before) {
        const j = s.target?.kind === "exercise" && s.target.id === $.id;
        delete f.value[$.id], $ = null, j && t("close");
      }
    });
    function _(D) {
      $ = {
        id: o.value.id,
        before: L.value?.id
      }, f.value[o.value.id].submitted = { before: L.value?.id }, t("action", "submit", {
        unitId: s.state.unit.id,
        exerciseId: o.value.id,
        answer: D
      });
    }
    return (D, P) => (a(), i("div", {
      ref_key: "layer",
      ref: m,
      class: "learning-activity-shade",
      onKeydown: qe(ve(w, ["stop", "prevent"]), ["esc"])
    }, [n("section", An, [
      n("header", Rn, [
        n("h2", Mn, r(o.value ? "练习" : x.value[0]?.title ?? "材料"), 1),
        e.state.unit ? (a(), i("small", En, "+" + r(e.state.unit.reward.amount) + " 币", 1)) : p("", !0),
        n("button", {
          ref_key: "closeButton",
          ref: I,
          type: "button",
          "aria-label": "收起课件",
          onClick: P[0] || (P[0] = (j) => t("close"))
        }, [P[18] || (P[18] = Y("收起", -1)), F(K, { name: "back" })], 512)
      ]),
      e.state.message && !e.state.busy ? (a(), i("p", Tn, r(e.state.message), 1)) : p("", !0),
      n("div", {
        ref_key: "body",
        ref: u,
        class: "learning-activity-body"
      }, [
        o.value && x.value.length ? (a(), i("details", {
          key: 0,
          class: "learning-activity-materials",
          open: b.value.materialsOpen,
          onToggle: P[3] || (P[3] = (j) => b.value.materialsOpen = j.target.open)
        }, [n("summary", null, "阅读材料 · " + r(x.value.length), 1), (a(!0), i(E, null, H(x.value, (j) => (a(), J(It, {
          key: j.id,
          material: j,
          "exercise-id": V.value,
          disabled: e.disabled,
          onAction: P[1] || (P[1] = (T, M) => t("action", T, M)),
          onSelect: P[2] || (P[2] = (T) => h.value = T)
        }, null, 8, [
          "material",
          "exercise-id",
          "disabled"
        ]))), 128))], 40, Nn)) : o.value ? p("", !0) : (a(!0), i(E, { key: 1 }, H(x.value, (j) => (a(), J(It, {
          key: j.id,
          material: j,
          "exercise-id": V.value,
          disabled: e.disabled,
          onAction: P[4] || (P[4] = (T, M) => t("action", T, M)),
          onSelect: P[5] || (P[5] = (T) => h.value = T)
        }, null, 8, [
          "material",
          "exercise-id",
          "disabled"
        ]))), 128)),
        h.value ? (a(), J(Yt, {
          key: 2,
          selection: h.value,
          disabled: e.disabled,
          onAsk: P[6] || (P[6] = (j) => t("ask", V.value, h.value)),
          onSay: P[7] || (P[7] = (j) => t("action", "say", { selection: h.value })),
          onDismiss: P[8] || (P[8] = (j) => h.value = null)
        }, null, 8, ["selection", "disabled"])) : p("", !0),
        o.value ? (a(), i("section", Bn, [
          n("h2", null, r(o.value.prompt), 1),
          n("div", On, [
            n("button", {
              type: "button",
              disabled: e.disabled || [...o.value.prompt].length > 1e3,
              onClick: P[9] || (P[9] = (j) => t("action", "say-question", { exerciseId: o.value.id }))
            }, "听题干", 8, qn),
            o.value.hasHint ? (a(), i("button", {
              key: 0,
              type: "button",
              disabled: e.disabled || o.value.hint !== null,
              onClick: P[10] || (P[10] = (j) => t("action", "reveal", {
                kind: "hints",
                id: o.value.id
              }))
            }, "提示", 8, Pn)) : p("", !0),
            n("button", {
              type: "button",
              disabled: e.disabled || o.value.solution !== null,
              onClick: P[11] || (P[11] = (j) => t("action", "reveal", {
                kind: "answers",
                id: o.value.id
              }))
            }, "解答", 8, Un),
            n("button", {
              type: "button",
              onClick: P[12] || (P[12] = (j) => t("ask", o.value.id))
            }, "问语伴")
          ]),
          o.value.hint ? (a(), i("p", Vn, r(o.value.hint), 1)) : p("", !0),
          o.value.solution ? (a(), i("div", _n, [o.value.solution.kind === "exact" ? (a(), i("p", Dn, r(l(vt)(o.value.solution.answer, o.value.response, R.value)), 1)) : o.value.solution.kind === "gaps" ? (a(), i("p", jn, r(o.value.solution.accepted.map((j) => j.forms.join(" / ")).join(`
`)), 1)) : p("", !0), o.value.solution.kind !== "semantic" ? (a(), i("p", Wn, r(o.value.solution.explanation), 1)) : (a(), i("button", {
            key: 3,
            type: "button",
            onClick: P[13] || (P[13] = (j) => t("ask", o.value.id))
          }, "请语伴讲解"))])) : p("", !0),
          (!L.value || k.value) && f.value[o.value.id] ? (a(), J(Vt, {
            key: o.value.id,
            modelValue: W.value,
            "onUpdate:modelValue": P[14] || (P[14] = (j) => W.value = j),
            response: o.value.response,
            paragraphs: R.value,
            disabled: e.disabled,
            onSubmit: _
          }, null, 8, [
            "modelValue",
            "response",
            "paragraphs",
            "disabled"
          ])) : p("", !0),
          L.value ? (a(), J(jt, {
            key: 3,
            attempt: L.value,
            feedback: B.value,
            response: o.value.response,
            paragraphs: R.value,
            disabled: e.disabled,
            revised: !!e.state.unit?.attempts.some((j) => j.revisesAttemptId === L.value?.id),
            onAction: P[15] || (P[15] = (j, T) => {
              t("action", j, T), t("close");
            })
          }, null, 8, [
            "attempt",
            "feedback",
            "response",
            "paragraphs",
            "disabled",
            "revised"
          ])) : p("", !0),
          L.value ? (a(), i("button", {
            key: 4,
            type: "button",
            disabled: e.disabled,
            onClick: P[16] || (P[16] = (j) => {
              k.value = !k.value, f.value[o.value.id] ??= {
                response: JSON.stringify(o.value.response),
                value: l(Ye)(o.value.response)
              };
            })
          }, r(k.value ? "收起再练" : "再试一次"), 9, Gn)) : p("", !0)
        ])) : p("", !0)
      ], 512),
      F(zt, {
        state: e.state,
        onAction: P[17] || (P[17] = (j, T) => t("action", j, T))
      }, null, 8, ["state"])
    ])], 40, Sn));
  }
}), Hn = Fn, zn = 864e5;
function Rt(e, c) {
  return /^(zh|ja|ko)\b/iu.test(c) ? {
    count: [...e.replace(/[\s\p{P}\p{S}]/gu, "")].length,
    unit: "字"
  } : {
    count: e.match(/[\p{L}\p{N}][\p{L}\p{N}\p{M}'’-]*/gu)?.length ?? 0,
    unit: "词"
  };
}
function Qt(e, c) {
  const s = [], t = /* @__PURE__ */ new Map();
  for (const u of c)
    if (u.quote)
      for (let d = e.indexOf(u.quote); d >= 0; d = e.indexOf(u.quote, d + 1)) {
        const v = d + u.quote.length;
        if (!s.some(([b, I]) => d < I && b < v)) {
          s.push([d, v]), t.set(u.id, d);
          break;
        }
      }
  return t;
}
function Yn(e, c) {
  const s = e.split(/(\r?\n)/u), t = [];
  s.forEach((k, h) => {
    h % 2 === 0 && k.trim() && t.push(h);
  });
  const u = [], d = [], v = /* @__PURE__ */ new Map();
  for (const k of c) v.set(k.paragraphIndex, [...v.get(k.paragraphIndex) ?? [], k]);
  for (const [k, h] of v) {
    const m = t[k];
    if (m === void 0) {
      u.push(...h.map((o) => o.id));
      continue;
    }
    const w = Qt(s[m], h), f = h.filter((o) => w.has(o.id)).sort((o, x) => w.get(x.id) - w.get(o.id));
    let $ = s[m];
    for (const o of f) {
      const x = w.get(o.id);
      $ = $.slice(0, x) + o.replacement + $.slice(x + o.quote.length), o.replacement !== o.quote && d.push(o.id);
    }
    s[m] = $, u.push(...h.filter((o) => !w.has(o.id)).map((o) => o.id));
  }
  const b = new Map(c.map((k, h) => [k.id, h])), I = (k, h) => b.get(k) - b.get(h);
  return {
    text: s.join(""),
    missing: u.sort(I),
    applied: d.sort(I)
  };
}
function Kn(e, c) {
  const s = Qt(e, c), t = c.filter((v) => s.has(v.id)).map((v) => ({
    id: v.id,
    start: s.get(v.id),
    length: v.quote.length
  })).sort((v, b) => v.start - b.start), u = [];
  let d = 0;
  for (const v of t)
    v.start > d && u.push({ text: e.slice(d, v.start) }), u.push({
      text: e.slice(v.start, v.start + v.length),
      id: v.id
    }), d = v.start + v.length;
  return (d < e.length || !u.length) && u.push({ text: e.slice(d) }), u;
}
function Zn(e, c = "xiaobai-learning-seen-units") {
  const s = /* @__PURE__ */ new Set(), t = () => {
    try {
      const u = JSON.parse(e()?.getItem(c) ?? "[]");
      return Array.isArray(u) ? u.filter((d) => typeof d == "string") : [];
    } catch {
      return [];
    }
  };
  return {
    has: (u) => s.has(u) || t().includes(u),
    mark(u) {
      s.add(u);
      try {
        e()?.setItem(c, JSON.stringify([.../* @__PURE__ */ new Set([...t(), u])].slice(-50)));
      } catch {
      }
    }
  };
}
var Jn = () => {
  try {
    return globalThis.localStorage;
  } catch {
    return null;
  }
}, Mt = Zn(Jn);
function ct(e, c = Date.now()) {
  const s = new Date(e), t = new Date(c), u = Math.round((Date.UTC(s.getFullYear(), s.getMonth(), s.getDate()) - Date.UTC(t.getFullYear(), t.getMonth(), t.getDate())) / zn);
  return !Number.isFinite(u) || u <= 0 ? "今天复习" : u === 1 ? "明天再见" : `${u} 天后再见`;
}
var Qn = { class: "learning-records-page" }, Xn = {
  key: 0,
  class: "learning-page-heading"
}, ei = {
  key: 0,
  class: "learning-muted"
}, ti = { class: "learning-muted" }, ai = {
  key: 0,
  class: "learning-muted"
}, ni = ["disabled", "onClick"], ii = ["disabled"], li = {
  key: 0,
  class: "learning-empty-note"
}, si = ["disabled", "onClick"], ri = ["title"], oi = {
  key: 1,
  class: "learning-row"
}, ui = ["disabled"], di = { class: "learning-muted" }, vi = ["disabled"], ci = /* @__PURE__ */ ae({
  __name: "LearningRecords",
  props: {
    state: {},
    disabled: { type: Boolean },
    embedded: { type: Boolean }
  },
  emits: ["action", "remove"],
  setup(e, { emit: c }) {
    const s = e, t = c;
    ze(() => s.state.record ? (t("action", "records", { offset: s.state.records.offset }), !0) : !1);
    const u = {
      deleteAnswer: "删除这次作答",
      deleteRecord: "删除记录",
      answerWarning: "这次作答和对应的反馈会删除，相关知识点的掌握情况会更新。已到账奖励保留。",
      recordWarning: "这条学习记录会删除，仅属于它的历史作答也会删除。当前练习不受影响。",
      hidden: "听力原文暂未显示，下面是你的作答和点评。"
    };
    return (d, v) => (a(), i("section", Qn, [!e.embedded || e.state.record ? (a(), i("div", Xn, [v[5] || (v[5] = n("h1", null, "学习记录", -1)), e.state.records.total ? (a(), i("span", ei, r(e.state.records.total) + " 项", 1)) : p("", !0)])) : p("", !0), e.state.record ? (a(), i(E, { key: 1 }, [
      n("button", {
        type: "button",
        onClick: v[0] || (v[0] = (b) => d.$emit("action", "records", { offset: e.state.records.offset }))
      }, "‹ 返回记录"),
      n("h2", null, r(e.state.record.label), 1),
      (a(!0), i(E, null, H(e.state.record.evidence, (b) => (a(), i("article", {
        key: b.attempt.id,
        class: "learning-record-evidence"
      }, [
        n("p", ti, r(new Date(b.attempt.submittedAt).toLocaleDateString()), 1),
        n("h3", null, r(b.exercise.prompt), 1),
        (a(!0), i(E, null, H(b.materials, (I) => (a(), i("details", { key: I.id }, [n("summary", null, r(I.title), 1), I.hidden ? (a(), i("p", ai, r(u.hidden), 1)) : (a(!0), i(E, { key: 1 }, H(I.paragraphs, (k) => (a(), i("p", { key: k.id }, r(k.text), 1))), 128))]))), 128)),
        F(jt, {
          attempt: b.attempt,
          feedback: b.assessment,
          response: b.exercise.response,
          paragraphs: b.materials.flatMap((I) => I.paragraphs),
          disabled: e.disabled,
          revised: !!e.state.unit?.attempts.some((I) => I.revisesAttemptId === b.attempt.id),
          onAction: v[1] || (v[1] = (I, k) => d.$emit("action", I, k))
        }, null, 8, [
          "attempt",
          "feedback",
          "response",
          "paragraphs",
          "disabled",
          "revised"
        ]),
        n("button", {
          type: "button",
          disabled: e.disabled,
          onClick: (I) => d.$emit("remove", "delete-attempt", { id: b.attempt.id }, u.answerWarning)
        }, r(u.deleteAnswer), 9, ni)
      ]))), 128)),
      n("button", {
        type: "button",
        disabled: e.disabled,
        onClick: v[2] || (v[2] = (b) => d.$emit("remove", "delete-item", { id: e.state.record.id }, u.recordWarning))
      }, r(u.deleteRecord), 9, ii)
    ], 64)) : (a(), i(E, { key: 2 }, [
      e.state.records.total ? p("", !0) : (a(), i("p", li, "暂无学习记录")),
      (a(!0), i(E, null, H(e.state.records.items, (b) => (a(), i("button", {
        key: b.id,
        class: "learning-record-row",
        type: "button",
        disabled: !b.readable,
        onClick: (I) => d.$emit("action", "records", {
          id: b.id,
          offset: e.state.records.offset
        })
      }, [n("span", null, [n("strong", null, r(b.label), 1), n("small", null, [Y(r(l(Ft)(b.evidenceCount)), 1), b.nextReviewAt ? (a(), i("span", {
        key: 0,
        title: b.scheduleReason ?? void 0
      }, " · " + r(l(ct)(b.nextReviewAt)) + "（" + r(new Date(b.nextReviewAt).toLocaleDateString()) + "）", 9, ri)) : p("", !0)])]), n("em", null, r(l(Gt)[b.state]), 1)], 8, si))), 128)),
      e.state.records.total > 30 ? (a(), i("div", oi, [
        n("button", {
          type: "button",
          disabled: e.state.records.offset === 0,
          onClick: v[3] || (v[3] = (b) => d.$emit("action", "records", { offset: Math.max(0, e.state.records.offset - 30) }))
        }, "上一页", 8, ui),
        n("span", di, r(e.state.records.total) + " 项", 1),
        n("button", {
          type: "button",
          disabled: e.state.records.offset + 30 >= e.state.records.total,
          onClick: v[4] || (v[4] = (b) => d.$emit("action", "records", { offset: e.state.records.offset + 30 }))
        }, "下一页", 8, vi)
      ])) : p("", !0)
    ], 64))]));
  }
}), Et = ci, gi = { class: "learning-books-page" }, pi = { class: "learning-page-heading" }, bi = {
  key: 0,
  class: "learning-due"
}, mi = { key: 0 }, fi = { key: 1 }, ki = ["disabled"], yi = {
  class: "learning-tabs",
  role: "tablist",
  "aria-label": "学习记录视图"
}, hi = ["aria-selected", "onClick"], $i = {
  key: 0,
  class: "learning-empty-note"
}, wi = { class: "learning-book-list" }, xi = ["disabled", "onClick"], Ci = ["aria-expanded", "onClick"], Ii = {
  key: 1,
  class: "learning-chip-reason"
}, Li = {
  key: 2,
  class: "learning-growth"
}, Si = {
  key: 0,
  class: "learning-empty-note"
}, Ai = { class: "learning-muted" }, Ri = { key: 0 }, Mi = { key: 0 }, Ei = { key: 1 }, Ti = { key: 2 }, Ni = /* @__PURE__ */ ae({
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
    const s = e, t = c, u = Me().books, d = ke(u, "tab"), v = [
      ["grammar", "语法本"],
      ["vocabulary", "生词本"],
      ["growth", "成长"],
      ["all", "全部记录"]
    ], b = { title: "学习本" }, I = ke(u, "reason"), k = C(() => d.value === "grammar" || d.value === "vocabulary" ? s.state.books[d.value] : []), h = C(() => s.state.growth), m = C(() => !!s.state.review && s.state.review.stage.stage !== "complete");
    return (w, f) => (a(), i("section", gi, [e.state.record ? (a(), J(Et, {
      key: 0,
      state: e.state,
      disabled: e.disabled,
      onAction: f[0] || (f[0] = ($, o) => t("action", $, o)),
      onRemove: f[1] || (f[1] = ($, o, x) => t("remove", $, o, x))
    }, null, 8, ["state", "disabled"])) : (a(), i(E, { key: 1 }, [
      n("div", pi, [n("h1", null, r(b.title), 1)]),
      e.state.dueCount || m.value ? (a(), i("div", bi, [e.state.dueCount ? (a(), i("span", mi, r(l(Ht)(e.state.dueCount)), 1)) : p("", !0), e.state.blockedReview ? (a(), i("small", fi, "有一组复习在另一个故事中进行，回到学习页可以放下它")) : m.value ? (a(), i("button", {
        key: 3,
        type: "button",
        class: "learning-primary",
        onClick: f[3] || (f[3] = ($) => t("review"))
      }, r(l(te).resumeReview), 1)) : (a(), i("button", {
        key: 2,
        type: "button",
        class: "learning-primary",
        disabled: e.disabled,
        onClick: f[2] || (f[2] = ($) => t("action", "start-review"))
      }, r(l(te).review), 9, ki))])) : p("", !0),
      n("div", yi, [(a(), i(E, null, H(v, ([$, o]) => n("button", {
        key: $,
        type: "button",
        role: "tab",
        "aria-selected": d.value === $,
        onClick: (x) => {
          d.value = $, I.value = "";
        }
      }, r(o), 9, hi)), 64))]),
      d.value === "grammar" || d.value === "vocabulary" ? (a(), i(E, { key: 1 }, [k.value.length ? p("", !0) : (a(), i("p", $i, r(d.value === "grammar" ? "批改里出现的语法问题会记到这里。" : "批改里的词汇问题、读文章时收藏的词语会记到这里。"), 1)), n("ul", wi, [(a(!0), i(E, null, H(k.value, ($) => (a(), i("li", { key: $.id }, [
        n("button", {
          type: "button",
          class: "learning-book-item",
          disabled: !$.readable,
          onClick: (o) => t("action", "records", {
            id: $.id,
            offset: e.state.records.offset
          })
        }, [n("strong", null, r($.label), 1), n("small", null, r(l(Gt)[$.state]) + " · " + r(l(Ft)($.evidenceCount)), 1)], 8, xi),
        $.nextReviewAt ? (a(), i("button", {
          key: 0,
          type: "button",
          class: "learning-chip",
          "aria-expanded": I.value === $.id,
          onClick: (o) => I.value = I.value === $.id ? "" : $.id
        }, r(l(ct)($.nextReviewAt)), 9, Ci)) : p("", !0),
        I.value === $.id ? (a(), i("small", Ii, r($.scheduleReason), 1)) : p("", !0)
      ]))), 128))])], 64)) : d.value === "growth" ? (a(), i("section", Li, [h.value.enough ? (a(), i(E, { key: 1 }, [
        n("p", Ai, [Y("来自 " + r(h.value.evidence) + " 份作答", 1), h.value.completed ? (a(), i("span", Ri, "、" + r(h.value.completed) + " 次完成", 1)) : p("", !0)]),
        h.value.steady.length ? (a(), i("div", Mi, [f[6] || (f[6] = n("h2", null, "已经稳定", -1)), n("p", null, r(h.value.steady.join("、")), 1)])) : p("", !0),
        h.value.practising.length ? (a(), i("div", Ei, [f[7] || (f[7] = n("h2", null, "最近独立做对", -1)), n("p", null, r(h.value.practising.join("、")), 1)])) : p("", !0),
        h.value.struggling.length ? (a(), i("div", Ti, [f[8] || (f[8] = n("h2", null, "还要再练", -1)), n("p", null, r(h.value.struggling.join("、")), 1)])) : p("", !0)
      ], 64)) : (a(), i("p", Si, "还需要几次练习才看得出"))])) : (a(), J(Et, {
        key: 3,
        embedded: "",
        state: e.state,
        disabled: e.disabled,
        onAction: f[4] || (f[4] = ($, o) => t("action", $, o)),
        onRemove: f[5] || (f[5] = ($, o, x) => t("remove", $, o, x))
      }, null, 8, ["state", "disabled"]))
    ], 64))]));
  }
}), Bi = Ni, Oi = {
  class: "learning-settings-card",
  "aria-label": "训练设置"
}, qi = { key: 0 }, Pi = ["disabled"], Ui = ["open"], Vi = ["value"], _i = { class: "learning-row" }, Di = ["disabled"], ji = /* @__PURE__ */ ae({
  __name: "LearningSettingsCard",
  props: {
    state: {},
    disabled: { type: Boolean },
    onboarding: { type: Boolean }
  },
  emits: ["action"],
  setup(e, { emit: c }) {
    const s = e, t = c, u = [
      ["zh-CN", "中文"],
      ["en", "English"],
      ["ja", "日本語"],
      ["ko", "한국어"]
    ], d = C(() => s.state.profile?.settings ?? null), v = Me().settings, b = v.form, I = ke(v, "open");
    function k() {
      Object.assign(b, {
        exam: d.value?.exam ?? "",
        level: d.value?.level ?? "",
        targetLevel: d.value?.targetLevel ?? "",
        explanationLanguage: d.value?.explanationLanguage ?? "zh-CN",
        interests: d.value?.interests ?? ""
      });
    }
    s.onboarding && !v.open && (k(), v.open = !0);
    const h = ($) => u.find(([o]) => o === $)?.[1] ?? new Intl.DisplayNames(["zh-CN"], { type: "language" }).of($) ?? $, m = C(() => [.../* @__PURE__ */ new Set([...u.map(([$]) => $), d.value?.explanationLanguage ?? "zh-CN"])]), w = C(() => [
      ["考试", d.value?.exam || "不备考"],
      ["水平", d.value?.level || "不确定"],
      ["目标", d.value?.targetLevel || "比现在高一级"],
      ["讲解", h(d.value?.explanationLanguage ?? "zh-CN")],
      ["兴趣", d.value?.interests || "不限"]
    ]);
    function f() {
      const $ = Kt(b);
      v.submitted = {
        value: $,
        form: { ...b }
      }, t("action", "settings", { value: $ });
    }
    return ($, o) => (a(), i("section", Oi, [I.value ? p("", !0) : (a(), i("dl", qi, [(a(!0), i(E, null, H(w.value, ([x, V]) => (a(), i("div", { key: x }, [n("dt", null, r(x), 1), n("dd", null, r(V), 1)]))), 128))])), I.value ? (a(), i("form", {
      key: 2,
      class: "learning-fields",
      onSubmit: ve(f, ["prevent"])
    }, [
      n("label", null, [o[7] || (o[7] = Y("考试", -1)), ne(n("input", {
        "onUpdate:modelValue": o[1] || (o[1] = (x) => l(b).exam = x),
        type: "text",
        maxlength: "80",
        placeholder: "不备考（例如 雅思、JLPT N2）"
      }, null, 512), [[de, l(b).exam]])]),
      n("label", null, [o[8] || (o[8] = Y("现在的水平", -1)), ne(n("input", {
        "onUpdate:modelValue": o[2] || (o[2] = (x) => l(b).level = x),
        type: "text",
        maxlength: "80",
        placeholder: "不确定"
      }, null, 512), [[de, l(b).level]])]),
      n("label", null, [o[9] || (o[9] = Y("目标", -1)), ne(n("input", {
        "onUpdate:modelValue": o[3] || (o[3] = (x) => l(b).targetLevel = x),
        type: "text",
        maxlength: "80",
        placeholder: "比现在高一级"
      }, null, 512), [[de, l(b).targetLevel]])]),
      n("details", {
        class: "learning-settings-optional",
        open: !e.onboarding
      }, [
        n("summary", null, r(l(te).optionalSettings), 1),
        n("label", null, [o[10] || (o[10] = Y("讲解语言", -1)), ne(n("select", { "onUpdate:modelValue": o[4] || (o[4] = (x) => l(b).explanationLanguage = x) }, [(a(!0), i(E, null, H(m.value, (x) => (a(), i("option", {
          key: x,
          value: x
        }, r(h(x)), 9, Vi))), 128))], 512), [[He, l(b).explanationLanguage]])]),
        n("label", null, [o[11] || (o[11] = Y("感兴趣的话题", -1)), ne(n("input", {
          "onUpdate:modelValue": o[5] || (o[5] = (x) => l(b).interests = x),
          type: "text",
          maxlength: "200",
          placeholder: "不限"
        }, null, 512), [[de, l(b).interests]])])
      ], 8, Ui),
      n("div", _i, [e.onboarding ? p("", !0) : (a(), i("button", {
        key: 0,
        type: "button",
        onClick: o[6] || (o[6] = (x) => {
          I.value = !1, l(v).submitted = null;
        })
      }, "取消")), n("button", {
        type: "submit",
        class: "learning-primary",
        disabled: e.disabled
      }, r(e.onboarding ? l(te).setupFinish : l(te).saveSettings), 9, Di)])
    ], 32)) : (a(), i("button", {
      key: 1,
      type: "button",
      disabled: e.disabled,
      onClick: o[0] || (o[0] = (x) => {
        k(), I.value = !0;
      })
    }, "调整", 8, Pi))]));
  }
}), Xt = ji, Wi = { class: "learning-profile-page" }, Gi = { class: "learning-setup-heading" }, Fi = { class: "learning-eyebrow" }, Hi = { class: "learning-language-options" }, zi = [
  "disabled",
  "aria-pressed",
  "onClick"
], Yi = { "aria-hidden": "true" }, Ki = ["disabled"], Zi = {
  key: 0,
  class: "learning-setup-empty"
}, Ji = { class: "learning-teacher-options" }, Qi = [
  "disabled",
  "aria-pressed",
  "onClick"
], Xi = { class: "learning-person-initial" }, el = {
  key: 1,
  class: "learning-selected-teacher"
}, tl = { class: "learning-person-initial" }, al = { key: 0 }, nl = ["open"], il = ["disabled"], ll = ["disabled"], sl = ["disabled"], rl = { class: "learning-setup-actions" }, ol = ["disabled"], ul = ["disabled"], dl = /* @__PURE__ */ ae({
  __name: "LearningSetup",
  props: {
    state: {},
    disabled: { type: Boolean }
  },
  emits: ["action"],
  setup(e, { emit: c }) {
    const s = c, t = Me().setup, u = ke(t, "step"), d = z(null), v = ke(t, "name"), b = ke(t, "note"), I = [
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
    async function k(h) {
      u.value = h, await re(), d.value?.focus();
    }
    return ze(() => u.value ? (k(u.value - 1), !0) : !1), (h, m) => (a(), i("section", Wi, [n("div", Gi, [n("p", Fi, r(u.value + 1) + " / " + r(l(te).setupSteps), 1), n("h1", {
      ref_key: "heading",
      ref: d,
      tabindex: "-1"
    }, r(u.value === 0 ? "选择要学习的语言" : u.value === 1 ? "选择语伴" : l(te).setupTitle), 513)]), u.value === 0 ? (a(), i(E, { key: 0 }, [n("div", Hi, [(a(), i(E, null, H(I, ([w, f, $]) => n("button", {
      key: w,
      type: "button",
      disabled: e.disabled,
      "aria-pressed": e.state.language === w,
      onClick: (o) => s("action", "language", { language: w })
    }, [
      n("span", Yi, r($), 1),
      n("strong", null, r(f), 1),
      e.state.language === w ? (a(), J(K, {
        key: 0,
        name: "check"
      })) : p("", !0)
    ], 8, zi)), 64))]), n("button", {
      type: "button",
      class: "learning-primary learning-setup-next",
      disabled: e.disabled,
      onClick: m[0] || (m[0] = (w) => k(1))
    }, [m[7] || (m[7] = Y("继续", -1)), F(K, { name: "arrow" })], 8, Ki)], 64)) : u.value === 1 ? (a(), i(E, { key: 1 }, [
      e.state.candidates.length ? p("", !0) : (a(), i("p", Zi, "当前故事里还没有认识的人物，所以没有可选的语伴。可以在下面手动填一位：名字加一句身份说明。")),
      n("div", Ji, [(a(!0), i(E, null, H(e.state.candidates, (w) => (a(), i("button", {
        key: w.name,
        type: "button",
        disabled: e.disabled,
        "aria-pressed": e.state.teacher?.name === w.name,
        onClick: (f) => s("action", "teacher", { teacher: {
          name: w.name,
          note: ""
        } })
      }, [
        n("span", Xi, r([...w.name][0]), 1),
        n("strong", null, r(w.name), 1),
        e.state.teacher?.name === w.name ? (a(), J(K, {
          key: 0,
          name: "check"
        })) : p("", !0)
      ], 8, Qi))), 128))]),
      e.state.teacher && !e.state.candidates.some((w) => w.name === e.state.teacher?.name) ? (a(), i("p", el, [
        n("span", tl, r([...e.state.teacher.name][0]), 1),
        n("span", null, [Y(r(e.state.teacher.name), 1), e.state.teacher.note ? (a(), i("small", al, r(e.state.teacher.note), 1)) : p("", !0)]),
        F(K, { name: "check" })
      ])) : p("", !0),
      n("details", {
        class: "learning-other-teacher",
        open: !e.state.candidates.length
      }, [n("summary", null, r(e.state.candidates.length ? "手动填写其他人物" : "手动填写"), 1), n("form", {
        class: "learning-fields",
        onSubmit: m[3] || (m[3] = ve((w) => s("action", "teacher", { teacher: {
          name: v.value.trim(),
          note: b.value.trim()
        } }), ["prevent"]))
      }, [
        n("label", null, [m[8] || (m[8] = Y("名字", -1)), ne(n("input", {
          "onUpdate:modelValue": m[1] || (m[1] = (w) => v.value = w),
          type: "text",
          maxlength: "80",
          placeholder: "例如 林老师",
          disabled: e.disabled
        }, null, 8, il), [[de, v.value]])]),
        n("label", null, [m[9] || (m[9] = Y("一句身份说明", -1)), ne(n("input", {
          "onUpdate:modelValue": m[2] || (m[2] = (w) => b.value = w),
          type: "text",
          maxlength: "200",
          placeholder: "例如 在东京长大的大学同学，说话直爽",
          disabled: e.disabled
        }, null, 8, ll), [[de, b.value]])]),
        n("button", {
          type: "submit",
          disabled: e.disabled || !v.value.trim()
        }, "选这位", 8, sl)
      ], 32)], 8, nl),
      n("div", rl, [n("button", {
        type: "button",
        disabled: e.disabled,
        onClick: m[4] || (m[4] = (w) => k(0))
      }, "上一步", 8, ol), n("button", {
        type: "button",
        class: "learning-primary",
        disabled: e.disabled,
        onClick: m[5] || (m[5] = (w) => k(2))
      }, [Y(r(e.state.teacher ? l(te).setupContinue : l(ee).skipCompanion), 1), F(K, { name: "arrow" })], 8, ul)])
    ], 64)) : (a(), J(Xt, {
      key: 2,
      onboarding: "",
      state: e.state,
      disabled: e.disabled,
      onAction: m[6] || (m[6] = (w, f) => s("action", w, f ?? {}))
    }, null, 8, ["state", "disabled"]))]));
  }
}), vl = dl, cl = { class: "learning-companion-control" }, gl = {
  key: 0,
  class: "learning-sr-only"
}, pl = { class: "learning-companion-options" }, bl = { class: "learning-companion-switch" }, ml = ["aria-label"], fl = { class: "learning-cost-note" }, kl = /* @__PURE__ */ ae({
  __name: "LearningCompanionControl",
  props: { name: {} },
  setup(e) {
    const c = ke(Me().companion, "enabled"), s = {
      title: "陪读",
      on: "一起学习中",
      off: "未开启",
      description: "开启后语伴会和你一起学习",
      costTitle: "费用说明",
      cost: "陪读消息和聊天一样，按你所用的 AI 服务计费。"
    };
    return (t, u) => (a(), i("details", cl, [n("summary", null, [
      n("span", {
        class: se(["learning-companion-light", { "is-on": c.value }]),
        "aria-hidden": "true"
      }, null, 2),
      Y(r(c.value ? e.name ? `${e.name} · ${s.on}` : s.on : s.title), 1),
      c.value ? p("", !0) : (a(), i("span", gl, r(s.off), 1))
    ]), n("div", pl, [n("label", bl, [n("span", null, r(s.description), 1), ne(n("input", {
      "onUpdate:modelValue": u[0] || (u[0] = (d) => c.value = d),
      type: "checkbox",
      role: "switch",
      "aria-label": s.title
    }, null, 8, ml), [[pa, c.value]])]), n("details", fl, [n("summary", null, r(s.costTitle), 1), n("small", null, r(s.cost), 1)])])]));
  }
}), ea = kl, st = {
  unconfirmed: "还没确认保存是否成功，请先查看保存结果，不要重复提交。",
  conflict: "发现另一份学习记录，请先核对再继续。",
  unloaded: "暂时打不开学习记录。",
  failed: "这次没能保存，之前保存的内容都还在，请重试。"
}, ce = {
  paid: "奖励已到账",
  retired: "钱包已重置，这份奖励不再补发",
  saving: "正在保存学习成果…",
  pending: "学习已完成，奖励待领取",
  needsWallet: "开通钱包后即可领取",
  claim: "领取奖励",
  openWallet: "开通钱包并领取",
  unknown: "学习已完成，奖励到账情况还没确认。请查看钱包状态，不需要重新做练习。"
}, yl = {
  context: "翻看学习资料",
  config: "连接 AI",
  session: "准备学习内容",
  summary: "整理之前聊过的内容",
  provider: "组织回复",
  tools: "整理学习内容",
  save: "保存学习内容",
  action: "准备学习内容"
};
function hl(e) {
  return `正在${yl[e.stage]}…`;
}
var hd = Object.freeze({
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
function Tt(e) {
  return e.split(/\r?\n/u).filter((c) => c.trim());
}
var $l = {
  class: "learning-complete",
  role: "status",
  "aria-live": "polite"
}, wl = {
  key: 0,
  class: "learning-complete-burst",
  "aria-hidden": "true"
}, xl = { class: "learning-complete-title" }, Cl = {
  key: 1,
  class: "learning-complete-amount"
}, Il = ["disabled"], Ll = /* @__PURE__ */ ae({
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
    const s = e, t = c, u = C(() => s.state.completions.find((v) => v.unitId === s.unitId)), d = C(() => {
      const v = u.value?.rewardStatus;
      return v === "paid" ? ce.paid : v === "retired" ? ce.retired : u.value ? s.state.walletOpen ? ce.pending : ce.needsWallet : ce.saving;
    });
    return (v, b) => (a(), i("section", $l, [
      e.quiet ? p("", !0) : (a(), i("div", wl, [(a(), i(E, null, H(8, (I) => n("span", {
        key: I,
        style: qt({ "--i": I })
      }, null, 4)), 64))])),
      n("p", xl, r(e.label), 1),
      u.value?.rewardStatus !== "retired" ? (a(), i("p", Cl, [n("strong", null, r(u.value?.rewardStatus === "paid" ? "+" : "") + r(u.value?.amount ?? e.amount), 1), b[1] || (b[1] = n("span", null, "小白币", -1))])) : p("", !0),
      n("small", null, r(d.value), 1),
      u.value && u.value.rewardStatus !== "paid" && u.value.rewardStatus !== "retired" ? (a(), i("button", {
        key: 2,
        type: "button",
        disabled: e.disabled || e.state.walletStorage !== "ready",
        onClick: b[0] || (b[0] = (I) => t("action", "reward", {
          unitId: e.unitId,
          openWallet: !e.state.walletOpen
        }))
      }, r(e.state.walletOpen ? l(ce).claim : l(ce).openWallet), 9, Il)) : p("", !0)
    ]));
  }
}), ta = Ll, Sl = ["aria-labelledby"], Al = { id: "learning-grading-title" }, Rl = {
  key: 0,
  class: "learning-grading-actions"
}, Ml = {
  key: 0,
  class: "learning-annotation-missing",
  role: "status"
}, El = ["disabled"], Tl = ["disabled"], Nl = ["open", "onToggle"], Bl = {
  key: 0,
  class: "learning-revised-text"
}, Ol = { class: "learning-write-saved" }, ql = { key: 0 }, Pl = {
  key: 1,
  class: "learning-graded-guidance"
}, Ul = ["onClick"], Vl = ["open", "onToggle"], _l = { key: 0 }, Dl = { key: 1 }, jl = { key: 4 }, Wl = { class: "learning-graded-text" }, Gl = { class: "learning-annotation-fixed" }, Fl = {
  key: 0,
  class: "learning-annotation-missing"
}, Hl = {
  key: 1,
  class: "learning-annotation-fixed"
}, zl = ["onClick"], Yl = { class: "learning-annotation-tag" }, Kl = {
  key: 0,
  class: "learning-annotation-suggestion"
}, Zl = ["onSubmit"], Jl = ["onUpdate:modelValue", "aria-label"], Ql = ["disabled"], Xl = { key: 2 }, es = ["onClick"], ts = {
  key: 1,
  class: "learning-working",
  role: "status"
}, as = ["disabled"], ns = ["disabled"], is = {
  key: 3,
  class: "learning-model-essay"
}, ls = /* @__PURE__ */ ae({
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
    "record",
    "ask"
  ],
  setup(e, { emit: c }) {
    const s = e, t = c, u = {
      content: "内容",
      grammar: "语法",
      vocabulary: "词汇",
      cohesion: "衔接"
    }, d = {
      error: "需要改",
      improve: "可以更好",
      alternative: "另一种说法"
    }, v = {
      grammar: "语法本",
      vocabulary: "生词本"
    }, b = {
      title: "看看哪里能写得更好",
      unplaced: "这处改动还没写进作文。请调整后再提交，或跳过修改。"
    }, I = (T) => T.itemId && (T.category === "grammar" || T.category === "vocabulary") ? v[T.category] : null, k = Ee(() => s.unit.id), h = C(() => k.value.edits), m = C(() => s.unit.stage.stage), w = C(() => new Map(s.unit.materials.flatMap((T) => T.paragraphs).map((T, M) => [T.id, M + 1]))), f = (T) => T?.answer.kind === "text" ? T.answer.text : "", $ = C(() => s.unit.stage.exercises.flatMap((T) => {
      const M = s.unit.exercises.find((q) => q.id === T.exerciseId), A = s.unit.attempts.find((q) => q.id === T.draftAttemptId);
      if (!M || !A) return [];
      const U = s.unit.assessments.find((q) => q.attemptId === A.id), N = s.unit.attempts.find((q) => q.id === T.revisionAttemptId), O = N && s.unit.assessments.find((q) => q.attemptId === N.id), G = U?.annotations ?? [];
      return [{
        row: T,
        exercise: M,
        draft: A,
        assessment: U,
        revision: N,
        review: O,
        annotations: G,
        label: M.paragraphId ? `第 ${w.value.get(M.paragraphId) ?? "?"} 段总结` : "作文",
        paragraphs: Tt(f(A)).map((q, ye) => ({
          index: ye,
          segments: Kn(q, G.filter((me) => me.paragraphIndex === ye)),
          annotations: G.filter((me) => me.paragraphIndex === ye)
        })),
        resolved: new Set(O?.resolvedAnnotationIds ?? [])
      }];
    }).sort((T, M) => +(M.annotations.length > 0) - +(T.annotations.length > 0))), o = (T) => m.value === "revising" && T.row.status === "revising", x = (T, M) => o(T) && M.severity !== "alternative";
    Z($, (T) => {
      for (const M of T.flatMap((A) => A.annotations)) h.value[M.id] ??= {
        value: M.quote,
        done: !1
      };
    }, { immediate: !0 });
    function V(T) {
      const M = h.value[T.id];
      M?.value.trim() && M.value !== T.quote && (M.done = !0);
    }
    const R = C(() => new Map($.value.filter(o).map((T) => [T.draft.id, Yn(f(T.draft), T.annotations.map((M) => ({
      id: M.id,
      paragraphIndex: M.paragraphIndex,
      quote: M.quote,
      replacement: h.value[M.id]?.done ? h.value[M.id].value : M.quote
    })))]))), L = C(() => new Set([...R.value.values()].flatMap((T) => T.missing))), B = C(() => [...R.value.values()].reduce((T, M) => T + M.applied.length, 0)), W = z("");
    Z(B, () => {
      W.value = "";
    });
    const _ = C(() => $.value.filter(o).flatMap((T) => T.annotations.filter((M) => M.severity !== "alternative")).length), D = (T, M) => {
      const A = T.annotations.find((U) => U.id === M);
      return A ? ["learning-mark", `is-${A.severity}`] : "";
    };
    function P() {
      const T = $.value.filter(o).flatMap((M) => {
        const A = R.value.get(M.draft.id);
        return !A || A.text === f(M.draft) ? [] : [{
          attemptId: M.draft.id,
          text: A.text
        }];
      });
      T.length ? t("action", "submit-revision", {
        unitId: s.unit.id,
        revisions: T
      }) : W.value = b.unplaced;
    }
    const j = C(() => s.state.pending?.unitId === s.unit.id ? s.state.pending.purpose : null);
    return (T, M) => (a(), i("section", {
      class: "learning-grading",
      "aria-labelledby": e.view === "feedback" ? "learning-grading-title" : void 0
    }, [
      e.view === "feedback" ? (a(), i(E, { key: 0 }, [
        n("h2", Al, r(b.title), 1),
        m.value === "revising" ? (a(), i("div", Rl, [
          n("small", null, "已改 " + r(B.value) + " / " + r(_.value) + " 处", 1),
          W.value ? (a(), i("small", Ml, r(W.value), 1)) : p("", !0),
          n("button", {
            type: "button",
            disabled: e.disabled,
            onClick: M[0] || (M[0] = (A) => t("confirm", "skip-revision", { unitId: e.unit.id }, "跳过这次修改？批注会保留，直接进入范文。"))
          }, "跳过修改", 8, El),
          n("button", {
            type: "button",
            class: "learning-primary",
            disabled: e.disabled || !B.value,
            onClick: P
          }, "提交修改", 8, Tl)
        ])) : p("", !0),
        (a(!0), i(E, null, H($.value, (A) => (a(), i("details", {
          key: A.exercise.id,
          class: "learning-graded",
          open: l(k).expanded[`grading:${A.draft.id}`] ?? A.annotations.length > 0,
          onToggle: (U) => l(k).expanded[`grading:${A.draft.id}`] = U.target.open
        }, [
          n("summary", null, [n("h3", null, r(A.label), 1)]),
          A.revision ? (a(), i("section", Bl, [
            n("h4", null, r(l(te).revision), 1),
            n("p", Ol, r(f(A.revision)), 1),
            A.review?.guidance ? (a(), i("p", ql, r(A.review.guidance), 1)) : p("", !0)
          ])) : p("", !0),
          A.assessment?.guidance ? (a(), i("p", Pl, r(A.assessment.guidance), 1)) : p("", !0),
          A.assessment ? (a(), i("button", {
            key: 2,
            type: "button",
            onClick: (U) => t("ask", A.exercise.id)
          }, r(l(ee).askAssessment), 9, Ul)) : p("", !0),
          A.assessment && (A.assessment.understanding || A.assessment.expression) ? (a(), i("details", {
            key: 3,
            class: "learning-graded-more",
            open: l(k).expanded[`feedback:${A.draft.id}`],
            onToggle: (U) => l(k).expanded[`feedback:${A.draft.id}`] = U.target.open
          }, [
            M[6] || (M[6] = n("summary", null, "理解与表达点评", -1)),
            A.assessment.understanding ? (a(), i("p", _l, [M[4] || (M[4] = n("b", null, "理解", -1)), Y(r(A.assessment.understanding), 1)])) : p("", !0),
            A.assessment.expression ? (a(), i("p", Dl, [M[5] || (M[5] = n("b", null, "表达", -1)), Y(r(A.assessment.expression), 1)])) : p("", !0)
          ], 40, Vl)) : p("", !0),
          A.revision ? (a(), i("h4", jl, r(l(te).original), 1)) : p("", !0),
          (a(!0), i(E, null, H(A.paragraphs, (U) => (a(), i("div", {
            key: U.index,
            class: "learning-graded-paragraph"
          }, [n("p", Wl, [(a(!0), i(E, null, H(U.segments, (N, O) => (a(), i(E, { key: O }, [N.id ? (a(), i("mark", {
            key: 0,
            class: se(D(A, N.id))
          }, r(N.text), 3)) : (a(), i(E, { key: 1 }, [Y(r(N.text), 1)], 64))], 64))), 128))]), (a(!0), i(E, null, H(U.annotations, (N) => (a(), i("div", {
            key: N.id,
            class: se(["learning-annotation", [`is-${N.severity}`, {
              "is-fixed": A.resolved.has(N.id),
              "is-edited": h.value[N.id]?.done && o(A)
            }]])
          }, [A.resolved.has(N.id) ? (a(), i(E, { key: 0 }, [n("p", Gl, "✓ " + r(l(te).resolved), 1), n("p", null, r(N.explanation), 1)], 64)) : h.value[N.id]?.done && o(A) ? (a(), i(E, { key: 1 }, [L.value.has(N.id) ? (a(), i("p", Fl, "原文里找不到“" + r(N.quote) + "”，这处改动不会写进修改稿。", 1)) : (a(), i("p", Hl, "✓ 改为“" + r(h.value[N.id].value) + "”", 1)), n("button", {
            type: "button",
            onClick: (O) => h.value[N.id].done = !1
          }, "再改", 8, zl)], 64)) : (a(), i(E, { key: 2 }, [
            n("p", Yl, [n("span", null, r(d[N.severity]), 1), Y(r(u[N.category]), 1)]),
            n("p", null, r(N.explanation), 1),
            N.suggestion ? (a(), i("p", Kl, "可以写成：" + r(N.suggestion), 1)) : p("", !0),
            x(A, N) && h.value[N.id] ? (a(), i("form", {
              key: 1,
              class: "learning-annotation-edit",
              onSubmit: ve((O) => V(N), ["prevent"])
            }, [ne(n("textarea", {
              "onUpdate:modelValue": (O) => h.value[N.id].value = O,
              rows: "2",
              "aria-label": `改写：${N.quote}`,
              maxlength: "600"
            }, null, 8, Jl), [[de, h.value[N.id].value], [l(Ze), h.value[N.id]]]), n("button", {
              type: "submit",
              disabled: !h.value[N.id].value.trim() || h.value[N.id].value === N.quote
            }, "改好了", 8, Ql)], 40, Zl)) : A.review && N.severity !== "alternative" ? (a(), i("small", Xl, "复核时这里还没改到")) : p("", !0)
          ], 64)), I(N) ? (a(), i("button", {
            key: 3,
            type: "button",
            class: "learning-annotation-book",
            onClick: (O) => t("record", N.itemId)
          }, r(I(N)) + " ↗", 9, es)) : p("", !0)], 2))), 128))]))), 128))
        ], 40, Nl))), 128))
      ], 64)) : p("", !0),
      [
        "grading",
        "reviewing",
        "model"
      ].includes(m.value) ? (a(), i("div", ts, [j.value ? (a(), i(E, { key: 0 }, [
        M[7] || (M[7] = n("span", {
          class: "learning-working-dot",
          "aria-hidden": "true"
        }, null, -1)),
        n("span", null, r(j.value === "grade" ? l(te).grading : j.value === "revision-review" ? l(te).reviewing : l(te).modelling), 1),
        n("button", {
          type: "button",
          disabled: e.pending,
          onClick: M[1] || (M[1] = (A) => t("action", "cancel"))
        }, r(l(te).stop), 9, as)
      ], 64)) : (a(), i("button", {
        key: 1,
        type: "button",
        class: "learning-primary",
        disabled: e.disabled,
        onClick: M[2] || (M[2] = (A) => t("action", "grade", { unitId: e.unit.id }))
      }, r(m.value === "grading" ? l(te).grade : l(te).continue), 9, ns))])) : p("", !0),
      e.view === "model" && m.value === "complete" ? (a(), J(ta, {
        key: 2,
        state: e.state,
        "unit-id": e.unit.id,
        amount: e.unit.reward.amount,
        label: "本篇完成",
        disabled: e.disabled,
        onAction: M[3] || (M[3] = (A, U) => t("action", A, U))
      }, null, 8, [
        "state",
        "unit-id",
        "amount",
        "disabled"
      ])) : p("", !0),
      e.view === "model" && e.unit.modelEssay ? (a(), i("section", is, [n("h3", null, [M[8] || (M[8] = Y("范文", -1)), n("small", null, r(e.unit.modelEssay.level), 1)]), (a(!0), i(E, null, H(l(Tt)(e.unit.modelEssay.text), (A, U) => (a(), i("p", { key: U }, r(A), 1))), 128))])) : p("", !0)
    ], 8, Sl));
  }
}), ss = ls, rs = ["data-exercise-id"], os = { class: "learning-write-label" }, us = [
  "aria-label",
  "placeholder",
  "rows",
  "onKeydown"
], ds = { class: "learning-write-foot" }, vs = { "aria-live": "polite" }, cs = ["disabled"], gs = { class: "learning-write-saved" }, ps = { class: "learning-write-foot" }, bs = ["disabled"], ms = /* @__PURE__ */ ae({
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
    const s = e, t = c, u = Ee(() => s.unit.id);
    Z([u, () => s.exercise.id], () => {
      u.value.writing[s.exercise.id] ??= {
        text: "",
        rewriting: !1,
        submitted: null
      };
    }, { immediate: !0 });
    const d = C(() => u.value.writing[s.exercise.id]), v = C({
      get: () => d.value.text,
      set: (R) => {
        d.value.text = R;
      }
    }), b = C({
      get: () => d.value.rewriting,
      set: (R) => {
        d.value.rewriting = R;
      }
    }), I = C(() => s.unit.attempts.filter((R) => R.exerciseId === s.exercise.id && R.revisesAttemptId === void 0).at(-1)), k = C(() => s.unit.assessments.some((R) => R.attemptId === I.value?.id && R.verdict !== "disputed")), h = C(() => I.value?.answer.kind === "text" ? I.value.answer.text : ""), m = C(() => !I.value || b.value), w = C(() => ["writing", "grading"].includes(s.unit.stage.stage) && !k.value && !s.state.pending), f = C(() => Rt(v.value, s.state.language)), $ = C(() => Rt(h.value, s.state.language)), o = C(() => s.state.workbenchConversation.summaryReviews.find((R) => R.attemptId === I.value?.id)?.text ?? "");
    function x() {
      s.disabled || !v.value.trim() || (d.value.submitted = {
        before: I.value?.id,
        text: v.value
      }, t("action", "submit", {
        unitId: s.unit.id,
        exerciseId: s.exercise.id,
        answer: {
          kind: "text",
          text: v.value.trim()
        }
      }));
    }
    function V() {
      v.value = h.value, b.value = !0;
    }
    return (R, L) => (a(), i("div", {
      class: se(["learning-write", `is-${e.tone ?? "summary"}`]),
      "data-exercise-id": e.exercise.id
    }, [
      n("p", os, r(e.label), 1),
      m.value ? (a(), i("form", {
        key: 0,
        onSubmit: ve(x, ["prevent"])
      }, [ne(n("textarea", {
        "onUpdate:modelValue": L[0] || (L[0] = (B) => v.value = B),
        "aria-label": e.label,
        placeholder: e.placeholder,
        maxlength: "4000",
        rows: e.tone === "essay" ? 8 : 3,
        onKeydown: [qe(ve(x, ["ctrl", "prevent"]), ["enter"]), qe(ve(x, ["meta", "prevent"]), ["enter"])]
      }, null, 40, us), [[de, v.value], [l(Ze), d.value]]), n("div", ds, [
        n("small", vs, r(f.value.count) + " " + r(f.value.unit), 1),
        b.value ? (a(), i("button", {
          key: 0,
          type: "button",
          onClick: L[1] || (L[1] = (B) => {
            b.value = !1, v.value = "";
          })
        }, "取消")) : p("", !0),
        n("button", {
          type: "submit",
          class: "learning-primary",
          disabled: e.disabled || !v.value.trim()
        }, r(I.value ? "保存新稿" : "提交"), 9, cs)
      ])], 32)) : I.value ? (a(), i(E, { key: 1 }, [n("p", gs, r(h.value), 1), n("div", ps, [n("small", null, "已保存 · " + r($.value.count) + " " + r($.value.unit), 1), w.value ? (a(), i("button", {
        key: 0,
        type: "button",
        disabled: e.disabled,
        onClick: V
      }, "重写", 8, bs)) : p("", !0)])], 64)) : p("", !0),
      o.value ? (a(), J(dt, {
        key: 2,
        class: "learning-markdown learning-write-reply",
        text: o.value
      }, null, 8, ["text"])) : p("", !0)
    ], 10, rs));
  }
}), aa = ms, le = {
  noWeb: "还没连接联网取材。你可以去设置，或先读一篇语伴原创。",
  unavailable: "这次没能准备好文章，可以重试，或改读原创文章。",
  retry: "重试准备",
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
}, fs = "用你的话概括这一段", ks = ["data-paragraph-id", "data-material-id"], ys = { class: "learning-reading-text" }, hs = {
  class: "learning-reading-number",
  "aria-hidden": "true"
}, $s = ["data-material-id", "data-paragraph-id"], ws = ["disabled"], xs = ["open"], Cs = { key: 0 }, Is = { class: "learning-knowledge-text" }, Ls = {
  key: 0,
  class: "learning-terms"
}, Ss = [
  "disabled",
  "aria-pressed",
  "onClick"
], As = {
  key: 2,
  class: "learning-muted learning-knowledge-pending"
}, Rs = /* @__PURE__ */ ae({
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
    const s = e, t = c, u = C(() => s.unit.explanations.find((w) => w.materialId === s.materialId && w.paragraphId === s.paragraph.id)), d = C(() => s.unit.exercises.find((w) => w.paragraphId === s.paragraph.id)), v = C(() => new Set(s.state.savedTerms)), b = (w) => v.value.has(w), I = Ee(() => s.unit.id), k = C(() => `knowledge:${s.materialId}:${s.paragraph.id}`), h = C(() => I.value.selection?.materialId === s.materialId && I.value.selection.paragraphId === s.paragraph.id ? I.value.selection : null);
    function m() {
      I.value.selection = {
        materialId: s.materialId,
        paragraphId: s.paragraph.id,
        start: 0,
        end: s.paragraph.text.length,
        quote: s.paragraph.text
      };
    }
    return (w, f) => (a(), i("section", {
      class: "learning-reading-paragraph",
      "data-paragraph-id": e.paragraph.id,
      "data-material-id": e.materialId
    }, [
      n("p", ys, [n("span", hs, r(e.number), 1), n("span", {
        "data-learning-text": "",
        "data-material-id": e.materialId,
        "data-paragraph-id": e.paragraph.id
      }, r(e.paragraph.text), 9, $s)]),
      n("button", {
        type: "button",
        class: "learning-paragraph-quote",
        disabled: [...e.paragraph.text].length > l(_t),
        onClick: m
      }, r(l(Be).select), 9, ws),
      h.value ? (a(), J(Yt, {
        key: 0,
        selection: h.value,
        disabled: e.disabled,
        onAsk: f[0] || (f[0] = ($) => t("ask", d.value?.id, h.value)),
        onSay: f[1] || (f[1] = ($) => t("action", "say", { selection: h.value })),
        onDismiss: f[2] || (f[2] = ($) => l(I).selection = null)
      }, null, 8, ["selection", "disabled"])) : p("", !0),
      u.value ? (a(), i("details", {
        key: 1,
        class: "learning-knowledge",
        open: l(I).expanded[k.value],
        onToggle: f[3] || (f[3] = ($) => l(I).expanded[k.value] = $.target.open)
      }, [
        n("summary", null, [f[5] || (f[5] = Y("本段知识", -1)), u.value.terms.length ? (a(), i("span", Cs, " · " + r(u.value.terms.length) + " 个词语", 1)) : p("", !0)]),
        n("p", Is, r(u.value.explanation), 1),
        u.value.terms.length ? (a(), i("ul", Ls, [(a(!0), i(E, null, H(u.value.terms, ($) => (a(), i("li", { key: $.text }, [n("span", null, [n("strong", null, r($.text), 1), n("small", null, r($.note), 1)]), n("button", {
          type: "button",
          disabled: e.disabled || b($.text),
          "aria-pressed": b($.text),
          onClick: (o) => t("action", "bookmark", {
            unitId: e.unit.id,
            materialId: e.materialId,
            paragraphId: e.paragraph.id,
            termText: $.text
          })
        }, r(b($.text) ? "已收藏" : "收藏"), 9, Ss)]))), 128))])) : p("", !0)
      ], 40, xs)) : (a(), i("p", As, r(e.state.preparation?.running ? l(le).notes : l(le).missingNotes), 1)),
      d.value ? (a(), J(aa, {
        key: 3,
        state: e.state,
        unit: e.unit,
        exercise: d.value,
        disabled: e.disabled,
        label: l(fs),
        placeholder: "写下这段的大意，不必逐句翻译",
        onAction: f[4] || (f[4] = ($, o) => t("action", $, o))
      }, null, 8, [
        "state",
        "unit",
        "exercise",
        "disabled",
        "label"
      ])) : p("", !0)
    ], 8, ks));
  }
}), Ms = Rs;
function Es(e, c) {
  return e === "talk" || e === "retry-chat" ? c === "workbench" ? "workbench-talk" : "talk" : e;
}
var Ts = /* @__PURE__ */ new Set([
  "language",
  "teacher",
  "forget-conversation",
  "resume",
  "rate",
  "seek",
  "verify-teacher",
  "adopt-teacher"
]), Ns = /* @__PURE__ */ new Set([
  "submit",
  "bookmark",
  "say",
  "play",
  "save-note",
  "delete-note"
]), na = /* @__PURE__ */ new Set([
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
]), Bs = /* @__PURE__ */ new Set([
  "read",
  "verify",
  "retry-save",
  "adopt-server",
  "verify-teacher",
  "adopt-teacher",
  "verify-workbench",
  "adopt-workbench",
  "verify-wallet",
  "adopt-wallet",
  "export"
]);
function ot(e, c) {
  return na.has(e) ? !1 : e === "talk" ? c.chatBusy : e === "workbench-talk" ? c.workbenchBusy : Ts.has(e) ? c.busy || c.chatBusy || c.workbenchBusy || !!c.preparation?.running : c.busy || !!c.preparation?.running && !Ns.has(e);
}
function $e(e, c) {
  return e === "talk" || e === "workbench-talk" ? !ot(e, c) && (e === "talk" ? c.chatStorage : c.workbenchStorage) === "ready" : !ot(e, c) && (na.has(e) || Bs.has(e) || (e === "teacher" ? c.chatStorage === "ready" : c.storage === "ready"));
}
var Os = ["aria-label"], qs = [
  "aria-current",
  "disabled",
  "onClick"
], Ps = { class: "learning-reading-head" }, Us = ["open"], Vs = { key: 0 }, _s = { class: "learning-source" }, Ds = ["href"], js = {
  key: 0,
  class: "learning-essay"
}, Ws = { class: "learning-essay-prompt" }, Gs = {
  key: 1,
  class: "learning-essay"
}, Fs = { class: "learning-muted" }, Hs = ["aria-label"], zs = ["aria-current"], Ys = {
  key: 2,
  class: "learning-stage-bar is-writing"
}, Ks = {
  key: 1,
  class: "learning-muted"
}, Zs = {
  key: 3,
  class: "learning-stage-bar"
}, Js = ["disabled"], Qs = ["disabled"], Xs = /* @__PURE__ */ ae({
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
    "record",
    "assistant"
  ],
  setup(e, { emit: c }) {
    const s = e, t = c, u = z(null), d = Ee(() => s.unit.id);
    Dt(u, () => s.unit.materials, (R) => {
      d.value.selection = R;
    });
    const v = C(() => s.unit.stage.stage), b = C(() => {
      if (v.value === "writing") return "reading";
      const R = d.value.reading.view;
      return R === "model" && ![
        "reviewing",
        "model",
        "complete"
      ].includes(v.value) ? "feedback" : R ?? (v.value === "complete" ? "model" : v.value === "grading" ? "reading" : "feedback");
    }), I = [
      "reading",
      "feedback",
      "model"
    ];
    async function k(R) {
      const L = u.value?.closest(".learning-scroll");
      L && (d.value.reading.scrolls[b.value] = L.scrollTop), d.value.reading.view = R, await re(), L && (L.scrollTop = d.value.reading.scrolls[R] ?? 0);
    }
    const h = [
      ["writing", "阅读与写作"],
      ["grading", "统一批改"],
      ["revising", "修改"],
      ["model", "范文"],
      ["complete", "完成"]
    ], m = C(() => ({
      writing: 0,
      grading: 1,
      revising: 2,
      reviewing: 3,
      model: 3,
      complete: 4
    })[v.value] ?? 0), w = C(() => s.unit.exercises.find((R) => !R.paragraphId)), f = C(() => s.unit.stage.exercises.filter((R) => R.status === "writing").map((R) => R.exerciseId)), $ = {
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
    }, o = C(() => {
      let R = 0;
      return s.unit.materials.map((L) => ({
        material: L,
        paragraphs: L.paragraphs.map((B) => ({
          paragraph: B,
          number: ++R
        }))
      }));
    }), x = (R, L) => t("action", R, L);
    function V(R) {
      const L = u.value?.querySelector(`[data-exercise-id="${CSS.escape(R)}"]`);
      L?.scrollIntoView({
        block: "center",
        behavior: matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth"
      }), L?.querySelector("textarea, button")?.focus({ preventScroll: !0 });
    }
    return (R, L) => (a(), i("article", {
      ref_key: "root",
      ref: u,
      class: "learning-reading"
    }, [
      v.value !== "writing" ? (a(), i("nav", {
        key: 0,
        class: "learning-reading-nav",
        "aria-label": l(te).navigation
      }, [(a(), i(E, null, H(I, (B) => n("button", {
        key: B,
        type: "button",
        "aria-current": b.value === B ? "page" : void 0,
        disabled: B === "model" && ![
          "reviewing",
          "model",
          "complete"
        ].includes(v.value),
        onClick: (W) => k(B)
      }, r(l(te)[B]), 9, qs)), 64))], 8, Os)) : p("", !0),
      b.value === "reading" ? (a(), i(E, { key: 1 }, [
        n("header", Ps, [n("details", {
          class: "learning-reading-goal",
          open: l(d).expanded.goal,
          onToggle: L[0] || (L[0] = (B) => l(d).expanded.goal = B.target.open)
        }, [
          n("summary", null, r($.goal), 1),
          n("strong", null, r(e.unit.title), 1),
          e.unit.goal ? (a(), i("p", Vs, r(e.unit.goal), 1)) : p("", !0)
        ], 40, Us), F(ea, { name: e.state.teacher?.name }, null, 8, ["name"])]),
        (a(!0), i(E, null, H(o.value, (B, W) => (a(), i("section", {
          key: B.material.id,
          class: "learning-reading-material"
        }, [
          (a(), J(ua(W === 0 ? "h1" : "h2"), { tabindex: "-1" }, {
            default: Pt(() => [Y(r(B.material.title), 1)]),
            _: 2
          }, 1024)),
          n("p", _s, [B.material.provenance.kind === "authored" ? (a(), i(E, { key: 0 }, [Y(r($.authored), 1)], 64)) : (a(), i(E, { key: 1 }, [Y(r(B.material.provenance.kind === "adapted" ? $.adapted : $.original) + " ", 1), n("a", {
            href: B.material.provenance.url,
            target: "_blank",
            rel: "noopener noreferrer"
          }, r(B.material.provenance.title), 9, Ds)], 64))]),
          (a(!0), i(E, null, H(B.paragraphs, (_) => (a(), J(Ms, {
            key: _.paragraph.id,
            state: e.state,
            unit: e.unit,
            "material-id": B.material.id,
            paragraph: _.paragraph,
            number: _.number,
            disabled: e.disabled,
            onAction: x,
            onAsk: L[1] || (L[1] = (D, P) => t("ask", D, P))
          }, null, 8, [
            "state",
            "unit",
            "material-id",
            "paragraph",
            "number",
            "disabled"
          ]))), 128))
        ]))), 128)),
        w.value ? (a(), i("section", js, [
          n("h2", null, r($.essay), 1),
          n("p", Ws, r(w.value.prompt), 1),
          F(aa, {
            state: e.state,
            unit: e.unit,
            exercise: w.value,
            disabled: e.disabled,
            label: $.essayLabel,
            placeholder: $.essayPlaceholder,
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
        ])) : (a(), i("section", Gs, [n("h2", null, r($.essay), 1), n("p", Fs, r(e.state.preparation?.running ? l(le).essay : l(le).missingEssay), 1)])),
        n("ol", {
          class: "learning-steps",
          "aria-label": $.progress
        }, [(a(), i(E, null, H(h, ([B, W], _) => n("li", {
          key: B,
          class: se({
            "is-done": _ < m.value,
            "is-current": _ === m.value
          }),
          "aria-current": _ === m.value ? "step" : void 0
        }, r(W), 11, zs)), 64))], 8, Hs),
        v.value === "writing" ? (a(), i("div", Ys, [n("span", null, r($.written) + " " + r(e.unit.stage.exercises.length - f.value.length) + " / " + r(e.unit.stage.exercises.length), 1), f.value.length ? (a(), i("button", {
          key: 0,
          type: "button",
          onClick: L[2] || (L[2] = (B) => V(f.value[0]))
        }, r($.next), 1)) : (a(), i("span", Ks, r(e.unit.preparation.essay ? l(le).missingNotes : l(le).missingEssay), 1))])) : v.value === "grading" ? (a(), i("div", Zs, [e.state.pending?.purpose === "grade" ? (a(), i(E, { key: 0 }, [
          L[10] || (L[10] = n("span", {
            class: "learning-working-dot",
            "aria-hidden": "true"
          }, null, -1)),
          n("span", null, r(l(te).grading), 1),
          n("button", {
            type: "button",
            disabled: e.pending,
            onClick: L[3] || (L[3] = (B) => t("action", "cancel"))
          }, r(l(te).stop), 9, Js)
        ], 64)) : (a(), i(E, { key: 1 }, [n("span", null, r(l(te).gradeReady), 1), n("button", {
          type: "button",
          class: "learning-primary",
          disabled: e.disabled || !l($e)("grade", e.state),
          onClick: L[4] || (L[4] = (B) => t("action", "grade", { unitId: e.unit.id }))
        }, r(l(te).grade), 9, Qs)], 64))])) : (a(), i("button", {
          key: 4,
          type: "button",
          class: "learning-primary",
          onClick: L[5] || (L[5] = (B) => k("feedback"))
        }, r(l(te).feedback), 1))
      ], 64)) : (a(), J(ss, {
        key: 2,
        view: b.value,
        state: e.state,
        unit: e.unit,
        disabled: e.disabled || !l($e)("grade", e.state),
        pending: e.pending,
        onAsk: L[6] || (L[6] = (B) => t("assistant", B)),
        onAction: x,
        onConfirm: L[7] || (L[7] = (B, W, _) => t("confirm", B, W, _)),
        onRecord: L[8] || (L[8] = (B) => t("record", B))
      }, null, 8, [
        "view",
        "state",
        "unit",
        "disabled",
        "pending"
      ])),
      b.value === "feedback" && v.value === "complete" ? (a(), i("button", {
        key: 3,
        type: "button",
        class: "learning-primary",
        onClick: L[9] || (L[9] = (B) => k("model"))
      }, r(l(te).viewModel), 1)) : p("", !0)
    ], 512));
  }
}), er = Xs, tr = ["data-learning-unit-id", "data-exercise-id"], ar = { class: "learning-review-head" }, nr = { class: "learning-muted" }, ir = ["disabled"], lr = {
  class: "learning-review-dots",
  "aria-label": "复习卡片"
}, sr = [
  "aria-label",
  "aria-current",
  "onClick"
], rr = { class: "learning-eyebrow" }, or = { class: "learning-card-verdict" }, ur = { key: 0 }, dr = { key: 1 }, vr = { key: 2 }, cr = { key: 1 }, gr = ["disabled"], pr = {
  key: 1,
  class: "learning-working",
  role: "status"
}, br = ["disabled"], mr = ["disabled"], fr = ["disabled"], kr = {
  key: 2,
  class: "learning-row"
}, yr = { class: "learning-review-results" }, hr = ["aria-current", "onClick"], $r = ["aria-expanded", "onClick"], wr = {
  key: 1,
  class: "learning-chip-reason"
}, xr = /* @__PURE__ */ ae({
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
    const s = e, t = c, u = Se.verdicts, d = C(() => s.review.stage.stage), v = (A) => s.review.attempts.filter((U) => U.exerciseId === A).at(-1), b = () => Math.max(0, s.review.exercises.findIndex((A) => !v(A.id))), I = Ee(() => s.review.id), k = C(() => I.value.review), h = C({
      get: () => k.value.index ?? b(),
      set: (A) => {
        k.value.index = A;
      }
    }), m = C(() => s.review.exercises[h.value]), w = C(() => m.value && v(m.value.id)), f = C(() => s.review.assessments.find((A) => A.attemptId === w.value?.id)), $ = C(() => s.review.materials.flatMap((A) => A.paragraphs)), o = C(() => k.value.drafts);
    Z(m, (A) => {
      A && !o.value[A.id] && (o.value[A.id] = Ye(A.response));
    }, { immediate: !0 });
    const x = C({
      get: () => o.value[m.value.id],
      set: (A) => {
        o.value[m.value.id] = A;
      }
    }), V = C(() => s.review.exercises.filter((A) => v(A.id)).length), R = C({
      get: () => k.value.openReason,
      set: (A) => {
        k.value.openReason = A;
      }
    });
    function L(A) {
      t("action", "submit", {
        unitId: s.review.id,
        exerciseId: m.value.id,
        answer: A
      });
    }
    function B() {
      const A = s.review.exercises.findIndex((U) => !v(U.id));
      A >= 0 && (h.value = A);
    }
    function W(A) {
      h.value = A, j.value = !0;
    }
    const _ = C(() => s.state.completions.find((A) => A.unitId === s.review.id)), D = C(() => _.value?.rewardStatus === "paid" || _.value?.rewardStatus === "retired");
    Z(k, (A) => {
      A.seenBefore ??= d.value === "complete" && Mt.has(s.review.id);
    }, { immediate: !0 });
    const P = C(() => k.value.seenBefore ?? !1), j = C({
      get: () => k.value.expanded,
      set: (A) => {
        k.value.expanded = A;
      }
    });
    Z([d, () => s.review.id], ([A, U]) => {
      A === "complete" && Mt.mark(U);
    }, { immediate: !0 });
    const T = C(() => P.value && D.value && !j.value), M = (A) => [...s.state.books.grammar, ...s.state.books.vocabulary].find((U) => U.id === A);
    return (A, U) => (a(), i("section", {
      class: "learning-review",
      "data-learning-unit-id": e.review.id,
      "data-exercise-id": m.value?.id,
      "aria-labelledby": "learning-review-title"
    }, [
      n("header", ar, [
        U[8] || (U[8] = n("h2", { id: "learning-review-title" }, "今日复习", -1)),
        n("span", nr, r(V.value) + " / " + r(e.review.exercises.length), 1),
        d.value === "answering" ? (a(), i("button", {
          key: 0,
          type: "button",
          disabled: e.disabled || !l($e)("abandon-review", e.state),
          onClick: U[0] || (U[0] = (N) => t("confirm", "abandon-review", {}, l(he).review))
        }, "放下", 8, ir)) : p("", !0)
      ]),
      n("nav", lr, [(a(!0), i(E, null, H(e.review.exercises, (N, O) => (a(), i("button", {
        key: N.id,
        type: "button",
        "aria-label": `第 ${O + 1} 张`,
        "aria-current": O === h.value,
        class: se({ "is-answered": !!v(N.id) }),
        onClick: (G) => W(O)
      }, null, 10, sr))), 128))]),
      m.value && !T.value ? (a(), i("div", {
        key: `${m.value.id}:${w.value ? "back" : "front"}`,
        class: se(["learning-card", { "is-back": !!w.value }])
      }, [
        n("p", rr, r(w.value ? l(Se).answer : `第 ${h.value + 1} 张`), 1),
        n("h3", null, r(m.value.prompt), 1),
        w.value ? (a(), i(E, { key: 1 }, [
          n("blockquote", null, r(l(vt)(w.value.answer, m.value.response, $.value)), 1),
          f.value ? (a(), i(E, { key: 0 }, [
            n("p", or, r(l(u)[f.value.verdict]), 1),
            f.value.understanding ? (a(), i("p", ur, r(f.value.understanding), 1)) : p("", !0),
            f.value.expression ? (a(), i("p", dr, r(f.value.expression), 1)) : p("", !0),
            f.value.guidance ? (a(), i("p", vr, r(f.value.guidance), 1)) : p("", !0)
          ], 64)) : (a(), i("small", cr, r(l(Se).saved), 1)),
          V.value < e.review.exercises.length ? (a(), i("button", {
            key: 2,
            type: "button",
            class: "learning-primary",
            onClick: B
          }, "下一张")) : p("", !0)
        ], 64)) : (a(), J(Vt, {
          key: 0,
          modelValue: x.value,
          "onUpdate:modelValue": U[1] || (U[1] = (N) => x.value = N),
          response: m.value.response,
          paragraphs: $.value,
          disabled: e.disabled,
          onSubmit: L
        }, null, 8, [
          "modelValue",
          "response",
          "paragraphs",
          "disabled"
        ])),
        n("button", {
          type: "button",
          class: "learning-review-ask",
          "data-action": "ask",
          disabled: e.pending || !l($e)("talk", e.state),
          onClick: U[2] || (U[2] = (N) => t("ask", m.value.id, e.review.id))
        }, r(l(Se).ask), 9, gr)
      ], 2)) : p("", !0),
      d.value === "grading" ? (a(), i("div", pr, [e.state.pending?.purpose === "review-assess" ? (a(), i(E, { key: 0 }, [
        U[9] || (U[9] = n("span", {
          class: "learning-working-dot",
          "aria-hidden": "true"
        }, null, -1)),
        U[10] || (U[10] = n("span", null, "正在批改这组复习…", -1)),
        n("button", {
          type: "button",
          disabled: e.pending,
          onClick: U[3] || (U[3] = (N) => t("action", "cancel"))
        }, "停止", 8, br)
      ], 64)) : (a(), i(E, { key: 1 }, [
        n("span", null, r(l(Se).ready), 1),
        n("button", {
          type: "button",
          disabled: e.disabled || !l($e)("abandon-review", e.state),
          onClick: U[4] || (U[4] = (N) => t("confirm", "abandon-review", {}, l(he).review))
        }, "放下", 8, mr),
        n("button", {
          type: "button",
          disabled: e.disabled || !l($e)("grade", e.state),
          onClick: U[5] || (U[5] = (N) => t("action", "grade", { unitId: e.review.id }))
        }, r(l(Se).grade), 9, fr)
      ], 64))])) : p("", !0),
      d.value === "complete" && T.value ? (a(), i("div", kr, [U[11] || (U[11] = n("span", { class: "learning-muted" }, "这组复习已完成", -1)), n("button", {
        type: "button",
        "aria-expanded": !1,
        onClick: U[6] || (U[6] = (N) => j.value = !0)
      }, "查看结果")])) : d.value === "complete" ? (a(), i(E, { key: 3 }, [n("ul", yr, [(a(!0), i(E, null, H(e.review.exercises, (N, O) => (a(), i("li", { key: N.id }, [
        n("button", {
          type: "button",
          class: "learning-review-result",
          "aria-current": O === h.value,
          onClick: (G) => W(O)
        }, [n("strong", null, r(M(N.itemId)?.label ?? N.prompt), 1), n("small", null, r(l(u)[e.review.assessments.find((G) => G.attemptId === v(N.id)?.id)?.verdict ?? "disputed"]), 1)], 8, hr),
        M(N.itemId)?.nextReviewAt ? (a(), i("button", {
          key: 0,
          type: "button",
          class: "learning-chip",
          "aria-expanded": R.value === N.id,
          onClick: (G) => R.value = R.value === N.id ? "" : N.id
        }, r(l(ct)(M(N.itemId).nextReviewAt)), 9, $r)) : p("", !0),
        R.value === N.id ? (a(), i("small", wr, r(M(N.itemId)?.scheduleReason), 1)) : p("", !0)
      ]))), 128))]), F(ta, {
        state: e.state,
        "unit-id": e.review.id,
        amount: e.review.reward.amount,
        label: "复习完成",
        disabled: e.disabled,
        quiet: P.value,
        onAction: U[7] || (U[7] = (N, O) => t("action", N, O))
      }, null, 8, [
        "state",
        "unit-id",
        "amount",
        "disabled",
        "quiet"
      ])], 64)) : p("", !0)
    ], 8, tr));
  }
}), Cr = xr, Ir = {
  key: 0,
  class: "learning-source-choice",
  "aria-live": "polite"
}, Lr = { class: "learning-row" }, Sr = ["disabled"], Ar = ["disabled"], Rr = ["disabled"], Mr = ["disabled"], Er = ["disabled"], Tr = {
  key: 1,
  class: "learning-preparation",
  "aria-live": "polite"
}, Nr = {
  key: 0,
  class: "learning-turn-notice"
}, Br = { class: "learning-row" }, Or = ["disabled"], qr = /* @__PURE__ */ ae({
  __name: "LearningPreparation",
  props: {
    state: {},
    disabled: { type: Boolean },
    pending: { type: Boolean }
  },
  emits: ["action"],
  setup(e, { emit: c }) {
    const s = c;
    return (t, u) => e.state.sourceChoice ? (a(), i("section", Ir, [
      n("p", null, r(e.state.sourceChoice === "unconfigured" ? l(le).noWeb : e.state.preparation?.message || l(le).unavailable), 1),
      n("div", Lr, [
        e.state.sourceChoice === "unavailable" ? (a(), i("button", {
          key: 0,
          type: "button",
          class: "learning-primary",
          disabled: e.disabled,
          onClick: u[0] || (u[0] = (d) => s("action", "retry-source"))
        }, r(l(le).retry), 9, Sr)) : (a(), i("button", {
          key: 1,
          type: "button",
          class: "learning-primary",
          disabled: e.pending,
          onClick: u[1] || (u[1] = (d) => s("action", "research-settings"))
        }, r(l(le).settings), 9, Ar)),
        e.state.preparation?.source !== "authored" ? (a(), i("button", {
          key: 2,
          type: "button",
          disabled: e.disabled,
          onClick: u[2] || (u[2] = (d) => s("action", "choose-original"))
        }, r(l(le).original), 9, Rr)) : p("", !0),
        n("button", {
          type: "button",
          disabled: e.pending,
          onClick: u[3] || (u[3] = (d) => s("action", "dismiss-source"))
        }, r(e.state.unit ? l(le).existing : l(le).dismiss), 9, Mr)
      ]),
      e.state.sourceChoice === "unavailable" && e.state.preparation?.source !== "authored" ? (a(), i("button", {
        key: 0,
        type: "button",
        disabled: e.pending,
        onClick: u[4] || (u[4] = (d) => s("action", "research-settings"))
      }, r(l(le).settings), 9, Er)) : p("", !0)
    ])) : !e.state.preparation?.running && (e.state.preparation || e.state.unit?.kind === "reading-writing" && !e.state.unit.preparation.ready) ? (a(), i("section", Tr, [e.state.preparation?.message ? (a(), i("p", Nr, r(e.state.preparation.message), 1)) : p("", !0), n("div", Br, [e.state.unit?.kind === "reading-writing" && !e.state.unit.preparation.ready ? (a(), i("button", {
      key: 0,
      type: "button",
      disabled: e.disabled,
      onClick: u[5] || (u[5] = (d) => s("action", "resume-preparation", { unitId: e.state.unit.id }))
    }, r(l(le).resume), 9, Or)) : p("", !0)])])) : p("", !0);
  }
}), ut = qr, Pr = { class: "learning-workbench" }, Ur = {
  key: 1,
  class: "learning-due"
}, Vr = {
  key: 0,
  class: "learning-working",
  role: "status"
}, _r = ["disabled"], Dr = ["disabled"], jr = {
  key: 2,
  class: "learning-row"
}, Wr = ["disabled"], Gr = ["data-learning-unit-id"], Fr = { class: "learning-eyebrow" }, Hr = { tabindex: "-1" }, zr = {
  key: 0,
  class: "learning-muted"
}, Yr = ["onClick"], Kr = ["onClick"], Zr = { class: "learning-row" }, Jr = ["disabled"], Qr = {
  key: 6,
  class: "learning-start"
}, Xr = ["disabled"], eo = {
  key: 0,
  tabindex: "-1"
}, to = { key: 1 }, ao = ["aria-label"], no = { class: "learning-start-reading" }, io = ["disabled"], lo = ["disabled"], so = /* @__PURE__ */ ae({
  __name: "LearningWorkbench",
  props: {
    state: {},
    disabled: { type: Boolean },
    pending: { type: Boolean },
    preparationInProcess: { type: Boolean }
  },
  emits: [
    "action",
    "confirm",
    "present",
    "go",
    "ask",
    "assistant",
    "record"
  ],
  setup(e, { emit: c }) {
    const s = e, t = ($) => s.disabled || !$e($, s.state), u = c, d = C(() => !!s.state.review && s.state.review.stage.stage !== "complete"), v = C(() => s.state.unit), b = C(() => !v.value || s.state.completions.some(($) => $.unitId === v.value?.id)), I = C(() => s.state.busy && !s.state.pending), k = {
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
    }, h = C(() => [
      new Intl.DisplayNames(["zh-CN"], { type: "language" }).of(s.state.language),
      s.state.profile?.settings.exam,
      [s.state.profile?.settings.level, s.state.profile?.settings.targetLevel].filter(Boolean).join(" → ")
    ].filter(Boolean).join(" · "));
    function m($) {
      u("action", "prepare", {
        kind: $,
        message: $ === "reading-writing" ? "请按我的训练设置准备一篇读写训练。" : "请按我现在的情况准备一节专项小课。"
      });
    }
    const w = ($, o) => u("action", $, o), f = ($, o, x) => u("confirm", $, o, x);
    return ($, o) => (a(), i("div", Pr, [
      !e.preparationInProcess && (!e.state.sourceChoice || !b.value) ? (a(), J(ut, {
        key: 0,
        state: e.state,
        disabled: e.disabled,
        pending: e.pending,
        onAction: w
      }, null, 8, [
        "state",
        "disabled",
        "pending"
      ])) : p("", !0),
      e.state.dueCount && !d.value ? (a(), i("div", Ur, [n("span", null, r(l(Ht)(e.state.dueCount)), 1), e.state.pending?.purpose === "review-prepare" ? (a(), i("span", Vr, [
        o[13] || (o[13] = n("span", {
          class: "learning-working-dot",
          "aria-hidden": "true"
        }, null, -1)),
        o[14] || (o[14] = n("span", null, "正在出题…", -1)),
        n("button", {
          type: "button",
          disabled: e.pending,
          onClick: o[0] || (o[0] = (x) => u("action", "cancel"))
        }, "停止", 8, _r)
      ])) : e.state.blockedReview ? p("", !0) : (a(), i("button", {
        key: 1,
        type: "button",
        class: "learning-primary",
        disabled: t("start-review"),
        onClick: o[1] || (o[1] = (x) => u("action", "start-review"))
      }, r(k.review), 9, Dr))])) : p("", !0),
      e.state.blockedReview ? (a(), i("div", jr, [o[15] || (o[15] = n("p", { class: "learning-muted" }, "有一组复习在另一个故事中进行。回到那个故事可以接着做；也可以放下它，在这里重新出题。", -1)), n("button", {
        type: "button",
        disabled: t("abandon-review"),
        onClick: o[2] || (o[2] = (x) => f("abandon-review", {}, l(he).review))
      }, "放下", 8, Wr)])) : p("", !0),
      e.state.review ? (a(), J(Cr, {
        key: 3,
        state: e.state,
        review: e.state.review,
        disabled: e.disabled,
        pending: e.pending,
        onAction: w,
        onConfirm: f,
        onAsk: o[3] || (o[3] = (x, V) => u("ask", x, void 0, V))
      }, null, 8, [
        "state",
        "review",
        "disabled",
        "pending"
      ])) : p("", !0),
      v.value?.kind === "reading-writing" ? (a(), J(er, {
        key: 4,
        "data-learning-unit-id": v.value.id,
        state: e.state,
        unit: v.value,
        disabled: e.disabled,
        pending: e.pending,
        onAction: w,
        onConfirm: f,
        onAsk: o[4] || (o[4] = (x, V) => u("ask", x, V, v.value.id)),
        onAssistant: o[5] || (o[5] = (x) => u("assistant", x, v.value.id)),
        onRecord: o[6] || (o[6] = (x) => u("record", x))
      }, null, 8, [
        "data-learning-unit-id",
        "state",
        "unit",
        "disabled",
        "pending"
      ])) : v.value ? (a(), i("section", {
        key: 5,
        class: "learning-lesson",
        "data-learning-unit-id": v.value.id
      }, [
        n("p", Fr, "专项小课 · 完成可得 " + r(v.value.reward.amount) + " 小白币", 1),
        n("h1", Hr, r(v.value.title), 1),
        v.value.goal ? (a(), i("p", zr, r(v.value.goal), 1)) : p("", !0),
        (a(!0), i(E, null, H(v.value.materials, (x) => (a(), i("button", {
          key: x.id,
          type: "button",
          class: "learning-activity-link",
          onClick: (V) => u("present", {
            unitId: v.value.id,
            kind: "material",
            id: x.id,
            title: x.title
          })
        }, [
          F(K, { name: "book" }),
          n("span", null, r(x.title), 1),
          F(K, { name: "arrow" })
        ], 8, Yr))), 128)),
        (a(!0), i(E, null, H(v.value.exercises, (x) => (a(), i("button", {
          key: x.id,
          type: "button",
          class: "learning-activity-link",
          onClick: (V) => u("present", {
            unitId: v.value.id,
            kind: "exercise",
            id: x.id,
            title: x.prompt
          })
        }, [
          F(K, { name: v.value.stage.exercises.find((V) => V.exerciseId === x.id)?.status === "done" ? "check" : "records" }, null, 8, ["name"]),
          n("span", null, r(x.prompt), 1),
          F(K, { name: "arrow" })
        ], 8, Kr))), 128)),
        n("div", Zr, [n("button", {
          type: "button",
          disabled: t("complete"),
          onClick: o[7] || (o[7] = (x) => u("action", "complete"))
        }, r(k.complete), 9, Jr), n("button", {
          type: "button",
          onClick: o[8] || (o[8] = (x) => u("go", "materials"))
        }, r(k.notes), 1)])
      ], 8, Gr)) : p("", !0),
      b.value ? (a(), i("section", Qr, [e.state.blockedUnit ? (a(), i(E, { key: 0 }, [
        o[16] || (o[16] = n("h1", { tabindex: "-1" }, "当前课件在另一个故事中", -1)),
        o[17] || (o[17] = n("p", { class: "learning-muted" }, "回到那个故事可以继续；也可以放下它，在这里重新开始。", -1)),
        n("button", {
          type: "button",
          disabled: t("abandon"),
          onClick: o[9] || (o[9] = (x) => f("abandon", {}, l(he).lesson))
        }, "放下并重新开始", 8, Xr)
      ], 64)) : (a(), i(E, { key: 1 }, [
        v.value ? (a(), i("h2", to, r(k.next), 1)) : (a(), i("h1", eo, r(k.reading), 1)),
        v.value ? p("", !0) : (a(), i("button", {
          key: 2,
          type: "button",
          class: "learning-start-preference",
          "aria-label": `${k.settings}：${h.value}`,
          onClick: o[10] || (o[10] = (x) => u("go", "settings"))
        }, [n("span", null, [n("strong", null, r(k.settings), 1), n("small", null, r(h.value), 1)]), F(K, { name: "arrow" })], 8, ao)),
        e.state.sourceChoice && !e.preparationInProcess ? (a(), J(ut, {
          key: 3,
          state: e.state,
          disabled: e.disabled,
          pending: e.pending,
          onAction: w
        }, null, 8, [
          "state",
          "disabled",
          "pending"
        ])) : p("", !0),
        !I.value && !e.state.sourceChoice ? (a(), i(E, { key: 4 }, [n("section", no, [
          F(K, { name: "workbook" }),
          n("p", null, r(k.readingHint), 1),
          n("button", {
            type: "button",
            class: "learning-primary",
            disabled: t("prepare"),
            onClick: o[11] || (o[11] = (x) => m("reading-writing"))
          }, [Y(r(k.start), 1), F(K, { name: "arrow" })], 8, io)
        ]), n("button", {
          type: "button",
          class: "learning-start-secondary",
          disabled: t("prepare"),
          onClick: o[12] || (o[12] = (x) => m("lesson"))
        }, [
          F(K, { name: "records" }),
          n("span", null, [n("strong", null, r(k.lesson), 1), n("small", null, r(k.lessonHint), 1)]),
          F(K, { name: "arrow" })
        ], 8, lo)], 64)) : p("", !0)
      ], 64))])) : p("", !0)
    ]));
  }
}), ro = so;
function Nt(e) {
  try {
    return JSON.parse(e);
  } catch {
    return {};
  }
}
function oo(e) {
  const c = [];
  for (const s of e.messages) s.role === "assistant" ? c.push({
    message: s,
    results: []
  }) : s.role === "tool" && c.at(-1)?.results.push(s);
  return c.map(({ message: s, results: t }, u) => ({
    index: u + 1,
    text: s.toolCalls?.length ? s.content : "",
    receivedChars: s.receivedChars,
    thinking: s.hasReasoning,
    streaming: !!s.streaming,
    tools: (s.toolCalls ?? []).map((d) => {
      const v = t.find((h) => h.toolCallId === d.id), b = Nt(v?.content ?? ""), I = e.status === "running", k = v?.error || b.ok === !1 ? "failed" : v?.content && !v.streaming ? "done" : !I || s.error ? "cancelled" : v?.streaming ? "running" : "preparing";
      return {
        id: d.id,
        name: d.name,
        status: k,
        input: Nt(d.arguments),
        result: b
      };
    })
  }));
}
var uo = {
  invalid_arguments: "这次没能正确选择或读取文章来源，可以重试准备。",
  learning_search_failed: "暂时连不上搜索服务，请检查联网取材设置后重试。",
  learning_search_timeout: "搜索文章等了太久，可以重试或先读原创文章。",
  learning_search_not_configured: "还没连接联网取材，请先设置，或改读原创文章。",
  learning_extract_http_failed: "联网服务没能读取正文，请检查联网取材设置后重试。",
  learning_extract_timeout: "读取正文等了太久，可以重试或改读原创文章。",
  learning_extract_failed: "读取正文时连接中断，请检查联网取材连接后重试。",
  learning_extract_invalid_response: "联网服务返回的内容无法作为正文读取，可以重试或改读原创文章。",
  learning_source_unavailable: "这个网页没有读到可用正文，可以换一个来源或改读原创文章。",
  learning_source_too_large: "这个网页内容太多，未能读入。可以换一个来源或改读原创文章。",
  learning_research_failed: "这次联网取材没有完成，可以重试或改读原创文章。"
};
function vo(e, c) {
  if (e === "learning_extract_http_failed") {
    if (c === 401 || c === 403) return "联网服务拒绝读取正文，请检查联网取材的密钥和权限。";
    if (c === 404 || c === 405) return "当前联网地址不支持读取正文，请检查联网取材地址，或改读原创文章。";
    if (c === 429) return "联网服务暂时限制了请求，请稍后重试，并检查剩余额度。";
    if (c && c >= 500) return "联网服务暂时不可用，请稍后重试，或先读原创文章。";
  }
  return uo[e];
}
var co = ["aria-label"], go = { class: "learning-process-header" }, po = ["aria-expanded"], bo = { "aria-hidden": "true" }, mo = ["disabled", "aria-label"], fo = ["aria-label"], ko = ["data-status"], yo = {
  class: "learning-process-dot",
  "aria-hidden": "true"
}, ho = { key: 0 }, $o = { class: "learning-process-result" }, wo = {
  key: 1,
  class: "learning-process-status",
  role: "status",
  "aria-live": "polite"
}, xo = {
  key: 0,
  class: "learning-working-dot",
  "aria-hidden": "true"
}, Co = {
  key: 2,
  class: "learning-process-recovery"
}, Io = /* @__PURE__ */ ae({
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
    const s = e, t = c, u = C(() => oo(s.turn)), d = C(() => u.value.flatMap((o) => o.tools)), v = C(() => s.turn.status === "running"), b = C(() => le.taskTitles[s.turn.purpose]), I = z(null), k = ca(), h = C(() => I.value ?? (v.value || s.turn.status === "failed" || !!k.default)), m = z(null), w = C(() => s.turn.progress?.round ?? u.value.at(-1)?.index), f = C(() => {
      if (!v.value) return X.outcomes[s.turn.status];
      const o = u.value.at(-1), x = o?.tools.find((V) => V.status === "running" || V.status === "preparing");
      if (x) return `${X.tools[x.name] ?? X.unknownTool} · ${X[x.status]}`;
      if (s.turn.progress?.stage === "provider" && o?.streaming) {
        if (o.receivedChars) return X.received(o.receivedChars);
        if (o.thinking) return X.thinking;
      }
      return hl(s.turn.progress ?? { stage: "provider" });
    });
    function $(o) {
      const x = [];
      o.result.error && x.push(vo(o.result.error, o.result.httpStatus));
      const V = o.result.section ?? o.input.section;
      V && X.sections[V] && x.push(X.sections[V]), o.result.resultsCount !== void 0 && x.push(X.results(o.result.resultsCount)), o.result.paragraphCount !== void 0 && x.push(X.paragraphs(o.result.paragraphCount)), o.result.dataCount !== void 0 && x.push(X.entries(o.result.dataCount)), o.result.failedCount && x.push(X.sourcesFailed(o.result.failedCount)), o.name === "LearningLessonEdit" && (o.input.materialsCount && x.push(X.proposedMaterials(o.input.materialsCount)), o.input.exercisesCount && x.push(X.proposedExercises(o.input.exercisesCount))), o.result.errorsCount && x.push(X.issues(o.result.errorsCount));
      const R = (o.result.errorFields ?? []).map((L) => gn[L]).filter(Boolean);
      return R.length && x.push(X.checkFields([...new Set(R)].join("、"))), x.join(" · ");
    }
    return Z(v, () => {
      I.value = null;
    }), Z(() => s.turn.messages, async () => {
      const o = m.value, x = !o || o.scrollHeight - o.scrollTop - o.clientHeight < 48;
      await re(), x && m.value && (m.value.scrollTop = m.value.scrollHeight);
    }), (o, x) => v.value || d.value.length || o.$slots.default ? (a(), i("section", {
      key: 0,
      class: se(["learning-process", { "is-running": v.value }]),
      "aria-label": l(X).title
    }, [
      n("header", go, [n("button", {
        type: "button",
        class: "learning-process-toggle",
        "aria-expanded": h.value,
        onClick: x[0] || (x[0] = (V) => I.value = !h.value)
      }, [
        n("span", bo, r(h.value ? "⌄" : "›"), 1),
        n("strong", null, r(b.value ?? l(X).title), 1),
        n("small", null, r(v.value && w.value ? l(X).round(w.value) : l(X).history(d.value.length)), 1)
      ], 8, po), v.value && e.stoppable ? (a(), i("button", {
        key: 0,
        type: "button",
        class: "learning-process-stop",
        disabled: e.disabled,
        "aria-label": l(X).stop,
        onClick: x[1] || (x[1] = (V) => t("stop"))
      }, "■", 8, mo)) : p("", !0)]),
      h.value ? (a(), i("div", {
        key: 0,
        ref_key: "body",
        ref: m,
        class: "learning-process-body"
      }, [(a(!0), i(E, null, H(u.value, (V) => (a(), i(E, { key: V.index }, [V.text ? (a(), J(dt, {
        key: 0,
        class: "learning-markdown learning-process-narration",
        text: V.text
      }, null, 8, ["text"])) : p("", !0), V.tools.length ? (a(), i("ol", {
        key: 1,
        class: "learning-process-steps",
        "aria-label": l(X).round(V.index)
      }, [(a(!0), i(E, null, H(V.tools, (R) => (a(), i("li", {
        key: R.id,
        "data-status": R.status
      }, [
        n("span", yo, r(R.status === "done" ? "✓" : R.status === "failed" ? "!" : "·"), 1),
        n("div", null, [n("span", null, r(l(X).tools[R.name] ?? l(X).unknownTool), 1), $(R) ? (a(), i("small", ho, r($(R)), 1)) : p("", !0)]),
        n("small", $o, r(l(X)[R.status]), 1)
      ], 8, ko))), 128))], 8, fo)) : p("", !0)], 64))), 128))], 512)) : p("", !0),
      v.value || !o.$slots.default && e.turn.status === "finished" && (!b.value || h.value) ? (a(), i("p", wo, [v.value ? (a(), i("span", xo)) : p("", !0), Y(r(f.value), 1)])) : p("", !0),
      o.$slots.default ? (a(), i("div", Co, [ka(o.$slots, "default")])) : p("", !0)
    ], 10, co)) : p("", !0);
  }
}), ia = Io;
function Oe(e, c, s) {
  return e.notice === "history-save" && c !== "ready" || e.notice === "learning-save" && s !== "ready" ? "" : e.message;
}
function fe(e) {
  return e.kind === "reading-article" || e.kind === "reading-notes" || e.kind === "reading-essay";
}
function Ke(e) {
  return e.kind === "talk" || e.kind === "companion";
}
var Bt = {
  initial: "我想跟你学这门语言，先聊聊吧。",
  returning: "我来继续学语言了，先聊聊今天从哪里开始吧。"
}, Lo = { class: "learning-messages" }, So = /* @__PURE__ */ ae({
  __name: "LearningMessages",
  props: {
    turn: {},
    disabled: { type: Boolean }
  },
  emits: ["stop"],
  setup(e, { emit: c }) {
    const s = e, t = c, u = C(() => s.turn.messages.filter((d) => d.role === "assistant" && !d.toolCalls?.length && d.content));
    return (d, v) => (a(), i("div", Lo, [F(ia, {
      turn: e.turn,
      stoppable: "",
      disabled: e.disabled,
      onStop: v[0] || (v[0] = (b) => t("stop"))
    }, null, 8, ["turn", "disabled"]), (a(!0), i(E, null, H(u.value, (b, I) => (a(), i("div", {
      key: I,
      class: se(["learning-output", { "is-streaming": b.streaming }])
    }, [F(dt, {
      class: "learning-markdown",
      text: b.content
    }, null, 8, ["text"])], 2))), 128))]));
  }
}), Ao = So, Ro = { class: "learning-conversation" }, Mo = { class: "learning-conversation-heading" }, Eo = {
  class: "learning-person-initial",
  "aria-hidden": "true"
}, To = ["disabled"], No = ["aria-label"], Bo = ["aria-label"], Oo = {
  key: 0,
  class: "learning-history-notice"
}, qo = {
  key: 0,
  class: "learning-conversation-user"
}, Po = {
  key: 1,
  class: "learning-turn-recovery"
}, Uo = ["disabled", "onClick"], Vo = ["disabled", "onClick"], _o = {
  key: 3,
  class: "learning-conversation-tools"
}, Do = ["disabled"], jo = ["disabled"], Wo = {
  key: 1,
  class: "learning-working",
  role: "status"
}, Go = {
  key: 2,
  class: "learning-turn-notice is-error",
  role: "status"
}, Fo = {
  key: 3,
  class: "learning-conversation-empty"
}, Ho = ["disabled"], zo = { class: "learning-composer-surface" }, Yo = {
  key: 0,
  class: "learning-composer-quote"
}, Ko = { class: "learning-composer-row" }, Zo = [
  "disabled",
  "maxlength",
  "aria-label",
  "placeholder"
], Jo = [
  "type",
  "disabled",
  "aria-label",
  "title"
], Qo = /* @__PURE__ */ ae({
  __name: "LearningConversation",
  props: {
    target: {},
    state: {},
    disabled: { type: Boolean },
    pending: { type: Boolean }
  },
  emits: [
    "action",
    "present",
    "profile",
    "close"
  ],
  setup(e, { expose: c, emit: s }) {
    const t = e, u = C(() => t.target === "workbench" ? t.state.workbenchConversation : t.state.conversation), d = C(() => t.target === "workbench" ? t.state.workbenchBusy : t.state.chatBusy), v = C(() => t.target === "workbench" ? t.state.workbenchMessage : t.state.chatMessage), b = C(() => t.target === "workbench" ? t.state.workbenchStorage : t.state.chatStorage), I = C(() => t.target === "workbench" ? t.state.reply : t.state.companionReply), k = C(() => t.target === "workbench" ? ee.assistant : t.state.teacher?.name ?? "语伴"), h = C(() => u.value.turns.map((O, G) => ({
      turn: O,
      index: G
    })).filter(({ turn: O }) => !fe({ kind: O.purpose ?? "talk" }) || O.status === "running")), m = {
      conversation: "和语伴聊天",
      history: "更早的聊天已收起",
      empty: "今天想聊什么？",
      select: "先选一位语伴",
      opening: "打个招呼"
    }, w = /* @__PURE__ */ new Set([
      "prepare",
      "complete",
      "grade",
      "revision-review",
      "model-essay",
      "review-prepare",
      "review-assess",
      "companion"
    ]), f = s, $ = Me(), o = t.target === "workbench" ? $.workbenchChat : $.chat, x = (O, G = {}) => f("action", O, {
      ...G,
      target: t.target
    }), V = ke(o, "text"), R = z(null), L = z(null), B = z(null), W = ke(o, "focus");
    let _ = null, D = 0;
    function P() {
      const O = B.value;
      O && (o.scroll = O.scrollTop, o.following = O.scrollHeight - O.scrollTop - O.clientHeight < 70);
    }
    async function j() {
      await re(), o.following && B.value && (B.value.scrollTop = B.value.scrollHeight);
    }
    function T() {
      const O = R.value;
      O?.clientWidth && (O.style.height = "auto", O.style.height = `${O.scrollHeight}px`, j());
    }
    Z(V, T, { flush: "post" }), Z(R, (O) => {
      if (_?.disconnect(), cancelAnimationFrame(D), !O) return;
      let G = 0;
      _ = new ResizeObserver(([q]) => {
        q.contentRect.width !== G && (G = q.contentRect.width, cancelAnimationFrame(D), D = requestAnimationFrame(T));
      }), _.observe(O.parentElement);
    }, { flush: "post" }), Ae(() => {
      B.value && (B.value.scrollTop = o.scroll), j();
    }), Re(() => {
      B.value && (o.scroll = B.value.scrollTop), _?.disconnect(), cancelAnimationFrame(D);
    });
    function M() {
      if (t.disabled || !V.value.trim()) return;
      const O = V.value.trim();
      o.sent = {
        text: V.value,
        user: W.value?.selection ? `${O}

${W.value.selection.quote}` : O,
        after: u.value.turns.length + u.value.removedTurns
      }, o.following = !0, x("talk", {
        message: O,
        ...W.value ?? o.study ?? {}
      });
    }
    function A(O) {
      O.key !== "Enter" || O.shiftKey || O.isComposing || O.keyCode === 229 || (O.preventDefault(), M());
    }
    Z([() => u.value.turns, () => d.value], j);
    function U(O) {
      if (O.kind === "replacement") return !t.disabled && t.state.currentUnitId === O.unitId;
      const G = [t.state.unit, t.state.review].find((q) => q?.id === O.unitId);
      return !!G && (O.kind === "exercise" ? G.exercises : G.materials).some((q) => q.id === O.id);
    }
    const N = C(() => t.state.unit?.id === I.value?.unitId ? t.state.unit : null);
    return c({
      async ask(O, G, q = t.state.unit?.id) {
        W.value = {
          unitId: q,
          exerciseId: O,
          selection: G,
          help: !!O && !G
        }, o.study = q ? {
          unitId: q,
          exerciseId: O
        } : null, await re(), R.value?.focus();
      },
      focusHeading: () => L.value?.focus({ preventScroll: !0 })
    }), (O, G) => (a(), i("section", Ro, [
      n("header", Mo, [
        n("span", Eo, r(e.target === "workbench" ? "a" : [...k.value][0]), 1),
        n("h1", {
          ref_key: "heading",
          ref: L,
          tabindex: "-1"
        }, r(k.value), 513),
        e.target === "companion" ? (a(), i("button", {
          key: 0,
          type: "button",
          disabled: e.disabled,
          "aria-label": "更换学习语言和语伴",
          onClick: G[0] || (G[0] = (q) => f("profile"))
        }, r(new Intl.DisplayNames(["zh-CN"], { type: "language" }).of(e.state.language)), 9, To)) : (a(), i("button", {
          key: 1,
          type: "button",
          "aria-label": l(ee).closeAssistant,
          onClick: G[1] || (G[1] = (q) => f("close"))
        }, [F(K, { name: "close" })], 8, No))
      ]),
      n("div", {
        ref_key: "scroller",
        ref: B,
        class: "learning-conversation-turns",
        "aria-label": e.target === "workbench" ? l(ee).assistant : m.conversation,
        onScroll: P
      }, [
        u.value.removedTurns ? (a(), i("p", Oo, r(m.history), 1)) : p("", !0),
        (a(!0), i(E, null, H(h.value, ({ turn: q, index: ye }, me) => (a(), i("div", {
          key: u.value.removedTurns + ye,
          class: "learning-conversation-turn"
        }, [
          q.user && !l(w).has(q.purpose) && !l(fe)({ kind: q.purpose ?? "talk" }) ? (a(), i("p", qo, r(q.user), 1)) : p("", !0),
          F(Ao, {
            turn: q,
            disabled: e.pending,
            onStop: (ge) => x(l(Ke)({ kind: q.purpose ?? "talk" }) ? "cancel-chat" : l(fe)({ kind: q.purpose ?? "talk" }) ? "cancel-preparation" : "cancel")
          }, null, 8, [
            "turn",
            "disabled",
            "onStop"
          ]),
          l(Oe)(q, b.value, e.state.storage) || q.retryable ? (a(), i("div", Po, [l(Oe)(q, b.value, e.state.storage) ? (a(), i("p", {
            key: 0,
            class: se(["learning-turn-notice", { "is-error": q.status === "failed" }]),
            role: "status"
          }, r(l(Oe)(q, b.value, e.state.storage)), 3)) : p("", !0), q.retryable ? (a(), i("button", {
            key: 1,
            type: "button",
            disabled: e.disabled || e.pending,
            onClick: (ge) => x("retry-chat", { id: q.id })
          }, r(l(ee).retry), 9, Uo)) : p("", !0)])) : p("", !0),
          q.presentation ? (a(), i("button", {
            key: 2,
            type: "button",
            class: "learning-activity-link",
            disabled: !U(q.presentation),
            onClick: (ge) => f("present", q.presentation)
          }, [
            F(K, { name: q.presentation.kind === "material" ? "book" : "records" }, null, 8, ["name"]),
            n("span", null, r(q.presentation.title), 1),
            F(K, { name: "arrow" })
          ], 8, Vo)) : p("", !0),
          me === h.value.length - 1 && I.value?.text === q.teacher ? (a(), i("div", _o, [[...q.teacher].length <= 1e3 ? (a(), i("button", {
            key: 0,
            type: "button",
            disabled: e.disabled,
            onClick: G[2] || (G[2] = (ge) => x("say-reply"))
          }, [F(K, { name: "sound" }), Y(r(l(ee).listen), 1)], 8, Do)) : p("", !0), I.value.exerciseId && N.value && [...q.teacher].length <= 4e3 ? (a(), i("button", {
            key: 1,
            type: "button",
            disabled: e.disabled || N.value.notes.some((ge) => ge.text === q.teacher),
            onClick: G[3] || (G[3] = (ge) => x("save-note", { unitId: N.value.id }))
          }, r(l(ee).saveNote), 9, jo)) : p("", !0)])) : p("", !0)
        ]))), 128)),
        d.value && !u.value.turns.some((q) => q.status === "running" && l(Ke)({ kind: q.purpose ?? "talk" })) ? (a(), i("div", Wo, [G[9] || (G[9] = n("span", {
          class: "learning-working-dot",
          "aria-hidden": "true"
        }, null, -1)), n("span", null, r(v.value), 1)])) : !d.value && v.value && b.value === "ready" ? (a(), i("p", Go, r(v.value), 1)) : p("", !0),
        !h.value.length && !d.value ? (a(), i("div", Fo, [
          F(K, { name: "chat" }),
          n("p", null, r(e.target === "workbench" ? l(ee).assistantEmpty : e.state.teacher ? m.empty : m.select), 1),
          e.target === "companion" && !e.state.teacher ? (a(), i("button", {
            key: 0,
            class: "learning-primary",
            type: "button",
            onClick: G[4] || (G[4] = (q) => f("profile"))
          }, r(m.select), 1)) : e.target === "companion" ? (a(), i("button", {
            key: 1,
            type: "button",
            disabled: e.disabled,
            onClick: G[5] || (G[5] = (q) => x("talk", { message: e.state.profile ? l(Bt).returning : l(Bt).initial }))
          }, r(m.opening), 9, Ho)) : p("", !0)
        ])) : p("", !0)
      ], 40, Bo),
      e.target === "workbench" || e.state.teacher ? (a(), i("form", {
        key: 0,
        class: "learning-conversation-compose",
        onSubmit: ve(M, ["prevent"])
      }, [n("div", zo, [W.value ? (a(), i("div", Yo, [n("span", null, r(W.value.selection?.quote ?? "请教这道题"), 1), n("button", {
        type: "button",
        "aria-label": "取消引用",
        onClick: G[6] || (G[6] = (q) => W.value = null)
      }, "×")])) : p("", !0), n("div", Ko, [ne(n("textarea", {
        ref_key: "composer",
        ref: R,
        "onUpdate:modelValue": G[7] || (G[7] = (q) => V.value = q),
        rows: "1",
        disabled: b.value !== "ready",
        maxlength: W.value?.selection ? 1800 : W.value?.exerciseId ? 2e3 : 4e3,
        "aria-label": e.target === "workbench" ? l(ee).assistantPlaceholder : "和语伴说",
        placeholder: e.target === "workbench" ? l(ee).assistantPlaceholder : "和语伴说…",
        onKeydown: A
      }, null, 40, Zo), [[de, V.value], [l(Ze), l(o)]]), n("button", {
        type: d.value ? "button" : "submit",
        class: se(d.value ? "learning-composer-stop" : "learning-primary"),
        disabled: d.value ? e.pending : e.disabled || !V.value.trim(),
        "aria-label": d.value ? l(ee).stop : l(ee).send,
        title: d.value ? l(ee).stop : l(ee).send,
        onClick: G[8] || (G[8] = ve((q) => d.value ? x("cancel-chat") : M(), ["prevent"]))
      }, [F(K, { name: d.value ? "stop" : "send" }, null, 8, ["name"])], 10, Jo)])])], 32)) : p("", !0)
    ]));
  }
}), Ot = Qo;
function Xo(e) {
  const c = oa(structuredClone(ga(e.initialState))), s = z(!1), t = z(null), u = C(() => t.value ? Wt[t.value] : ""), d = C(() => t.value === "unknown" || t.value === "rejected");
  let v = !1, b = 0, I = () => {
  };
  const k = (f) => !s.value && $e(f, c.value), h = C(() => k("submit")), m = C(() => k("talk"));
  async function w(f, $ = {}) {
    if (s.value) return;
    if (ot(Es(f, $.target), c.value)) {
      t.value = "busy";
      return;
    }
    s.value = !0, t.value = null;
    const o = c.value.chatIdentity, x = b;
    let V = !1;
    try {
      const R = JSON.parse(JSON.stringify({
        chatIdentity: o,
        ...$
      }));
      V = !0;
      const L = await e.bridge.request(`learning/${f}`, R, 35e3);
      return !v || c.value.chatIdentity !== o ? void 0 : (b === x && L.result.state.chatIdentity === o && (c.value = L.result.state), L.result.rejected && (t.value = L.result.rejected), L.result);
    } catch (R) {
      v && c.value.chatIdentity === o && (t.value = !V || R instanceof ha && R.code === "host_request_not_sent" ? "notSent" : R instanceof ya ? "rejected" : "unknown");
    } finally {
      v && (s.value = !1);
    }
  }
  return Ae(() => {
    v = !0, I = e.bridge.subscribe((f) => {
      if (f.type === "learning/media") {
        c.value = {
          ...c.value,
          media: f.payload.media
        };
        return;
      }
      if (f.type !== "learning/state") return;
      const $ = f.payload.state;
      $.chatIdentity === c.value.chatIdentity && (b++, c.value = $);
    });
  }), Re(() => {
    v = !1, I();
  }), {
    state: c,
    pending: s,
    writable: h,
    canChat: m,
    canRequest: k,
    localIssue: t,
    localMessage: u,
    needsRefresh: d,
    request: w
  };
}
function eu(e = Math.random) {
  return Math.round(3 * 6e4 + Math.min(Math.max(e(), 0), 1) * 9 * 6e4);
}
function tu(e) {
  let c = !1, s, t = 0;
  function u() {
    s !== void 0 && (e.clearTimer(s), s = void 0);
  }
  function d() {
    if (!c) return;
    const v = t;
    s = e.setTimer(() => {
      v === t && (s = void 0, c && (e.opportunity(), d()));
    }, eu(e.random));
  }
  return {
    update(v) {
      c !== v && (c = v, t++, u(), d());
    },
    dispose() {
      c = !1, t++, u();
    }
  };
}
function au(e) {
  const c = z(!1), s = z(!1), t = z(!1), u = z(!1), d = z("");
  let v, b;
  const I = C(() => e.preference.enabled && e.reading.value && c.value && !e.blocked.value && !!e.state.value.teacher && e.state.value.storage === "ready"), k = C(() => I.value && !s.value && !t.value && !u.value && !e.pending.value && !e.state.value.busy && !e.state.value.chatBusy && !e.state.value.companionBusy);
  function h() {
    const L = e.root.value?.querySelector(".learning-scroll")?.getBoundingClientRect(), B = L?.top ?? 0, W = [...e.root.value?.querySelectorAll("[data-material-id][data-paragraph-id]") ?? []].find((_) => _.getBoundingClientRect().bottom > B + 60 && _.getBoundingClientRect().top < (L?.bottom ?? 0));
    return W ? {
      materialId: W.dataset.materialId,
      paragraphId: W.dataset.paragraphId
    } : null;
  }
  const m = tu({
    setTimer: (L, B) => setTimeout(L, B),
    clearTimer: (L) => clearTimeout(L),
    opportunity: () => {
      const L = h();
      L && e.request("companion", L);
    }
  });
  Z(k, (L) => m.update(L), { immediate: !0 }), Z([
    I,
    s,
    t,
    u,
    e.pending,
    () => e.state.value.companionBusy
  ], ([L, B, W, _, D, P]) => {
    P && !D && (!L || B || W || _) && e.request("cancel-companion");
  });
  function w() {
    const L = document.activeElement;
    s.value = L instanceof HTMLElement && !!e.root.value?.contains(L) && L.matches("textarea, input:not([type=checkbox],[type=radio],[type=range]), [contenteditable=true]");
  }
  const f = () => queueMicrotask(w);
  function $() {
    const L = document.getSelection();
    t.value = !!L && !L.isCollapsed && !!e.root.value?.contains(L.anchorNode);
  }
  function o() {
    clearTimeout(v), u.value = !0, v = setTimeout(() => {
      u.value = !1;
    }, 3e4);
  }
  function x(L) {
    !(L.target instanceof HTMLElement) || !L.target.matches("textarea, input:not([type=checkbox],[type=radio],[type=range]), [contenteditable=true]") || o();
  }
  function V() {
    c.value = document.visibilityState === "visible", c.value || (clearTimeout(v), u.value = !1, R()), w();
  }
  function R() {
    clearTimeout(b), d.value = "";
  }
  return Z(() => e.state.value.remark?.text ?? "", (L) => {
    R(), L && e.reading.value && c.value && !s.value && !t.value && !u.value && !e.blocked.value && (d.value = L, b = setTimeout(R, 1e4));
  }), Z([
    e.reading,
    e.blocked,
    s,
    t,
    u
  ], ([L, B, W, _, D]) => {
    (!L || B || W || _ || D) && R();
  }), Ae(() => {
    V(), document.addEventListener("visibilitychange", V), document.addEventListener("selectionchange", $), e.root.value?.addEventListener("pointerdown", o), e.root.value?.addEventListener("focusin", f), e.root.value?.addEventListener("focusout", f), e.root.value?.addEventListener("input", x);
  }), Re(() => {
    m.dispose(), clearTimeout(v), R(), document.removeEventListener("visibilitychange", V), document.removeEventListener("selectionchange", $), e.root.value?.removeEventListener("pointerdown", o), e.root.value?.removeEventListener("focusin", f), e.root.value?.removeEventListener("focusout", f), e.root.value?.removeEventListener("input", x);
  }), {
    bubble: d,
    dismiss: R
  };
}
var nu = { class: "learning-toolbar" }, iu = {
  key: 0,
  class: "learning-unread-dot",
  "aria-hidden": "true"
}, lu = {
  key: 1,
  class: "learning-layout-control"
}, su = ["min", "max"], ru = ["aria-label", "aria-expanded"], ou = { "aria-label": "学习资料与设置" }, uu = { "aria-label": "学习资料与设置" }, du = ["onClick"], vu = {
  key: 0,
  class: "learning-notice",
  role: "status",
  "aria-live": "polite"
}, cu = { class: "learning-row" }, gu = ["disabled"], pu = ["disabled"], bu = ["disabled"], mu = ["disabled"], fu = {
  key: 1,
  class: "learning-notice",
  role: "status",
  "aria-live": "polite"
}, ku = { class: "learning-row" }, yu = ["disabled"], hu = ["disabled"], $u = {
  key: 2,
  class: "learning-notice",
  role: "status"
}, wu = ["disabled"], xu = ["disabled"], Cu = ["inert", "aria-hidden"], Iu = {
  key: 2,
  class: "learning-working",
  role: "status"
}, Lu = ["disabled"], Su = {
  key: 5,
  class: "learning-materials-page"
}, Au = {
  key: 0,
  class: "learning-empty-note"
}, Ru = { class: "learning-materials-title" }, Mu = ["onClick"], Eu = ["onClick"], Tu = {
  key: 0,
  class: "learning-notes"
}, Nu = { key: 0 }, Bu = ["disabled", "onClick"], Ou = {
  key: 7,
  class: "learning-harvest-page"
}, qu = {
  key: 0,
  class: "learning-empty-note"
}, Pu = { key: 0 }, Uu = { class: "learning-muted" }, Vu = ["disabled", "onClick"], _u = ["disabled"], Du = ["disabled"], ju = {
  key: 3,
  class: "learning-row"
}, Wu = ["disabled"], Gu = ["disabled"], Fu = {
  key: 8,
  class: "learning-settings-page"
}, Hu = ["value", "disabled"], zu = ["value"], Yu = {
  key: 0,
  class: "learning-settings-goal"
}, Ku = {
  key: 0,
  class: "learning-muted"
}, Zu = ["value", "disabled"], Ju = ["disabled"], Qu = ["disabled"], Xu = ["disabled"], ed = ["disabled"], td = ["disabled"], ad = ["disabled"], nd = ["disabled"], id = ["disabled"], ld = ["inert", "aria-hidden"], sd = ["aria-label"], rd = { class: "learning-person-initial" }, od = {
  key: 0,
  class: "learning-unread-dot",
  "aria-hidden": "true"
}, ud = ["aria-label"], dd = {
  key: 0,
  class: "learning-unread-dot",
  "aria-hidden": "true"
}, vd = {
  role: "alertdialog",
  "aria-labelledby": "learning-confirm-title",
  class: "learning-confirm"
}, cd = { id: "learning-confirm-title" }, gd = { class: "learning-row" }, pd = ["disabled"], bd = /* @__PURE__ */ ae({
  __name: "LearningApp",
  props: {
    bridge: {},
    initialState: {}
  },
  setup(e) {
    const c = e, s = {
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
    }, { state: t, pending: u, writable: d, canChat: v, canRequest: b, localMessage: I, needsRefresh: k, request: h } = Xo(c), m = Ln(t);
    async function w(S, g = {}, y = !1) {
      if (!y && In(m, t.value, S, g)) {
        ue(S, g, S === "teacher" ? he.companion : he.context);
        return;
      }
      return h(S, g);
    }
    const f = z(t.value.profile ? "home" : "profile"), $ = [], o = z(null), x = z(!1);
    ze(() => o.value?.open ? (o.value.open = !1, !0) : !1, () => x.value);
    const V = z(null), R = z(null), L = z(!1), B = z(null), W = z(null), _ = z(null), D = {}, P = z(null), j = z(0), T = C(() => j.value >= 760 && !!t.value.teacher), M = z("work"), A = z(!0), U = z(!1), N = z(62), O = C(() => Math.max(42, Math.ceil(320 / Math.max(j.value, 1) * 100))), G = C(() => Math.min(68, Math.floor((1 - 320 / Math.max(j.value, 1)) * 100))), q = C({
      get: () => T.value ? Math.min(G.value, Math.max(O.value, N.value)) : N.value,
      set: (S) => {
        N.value = S;
      }
    }), ye = z(!1);
    let me, ge;
    const Je = () => {
      ye.value = ge?.matches ?? !1;
    };
    Ae(() => {
      ge = matchMedia("(prefers-reduced-motion: reduce)"), Je(), ge.addEventListener("change", Je), !(!P.value || typeof ResizeObserver > "u") && (me = new ResizeObserver(([S]) => {
        j.value = S?.contentRect.width ?? 0;
      }), me.observe(P.value));
    }), Re(() => {
      me?.disconnect(), ge?.removeEventListener("change", Je);
    });
    const pe = C(() => T.value || M.value === "work"), Pe = C(() => !!t.value.teacher && (T.value || M.value === "chat"));
    Z([
      pe,
      Pe,
      ye
    ], async ([S, g, y], Q, Ge) => {
      let Ne = !0, $t;
      if (Ge(() => {
        Ne = !1, clearTimeout($t);
      }), S && (A.value = !0), g && (U.value = !0), await re(), !Ne) return;
      S && _.value && (_.value.scrollTop = D[f.value] ?? 0);
      const wt = () => {
        A.value = S, U.value = g;
      };
      T.value || y ? wt() : $t = setTimeout(wt, 320);
    }, { immediate: !0 });
    function Ue() {
      pe.value && _.value && !L.value && (D[f.value] = _.value.scrollTop), Te();
    }
    async function Te(S) {
      const g = S?.target instanceof Element ? S.target : null;
      if (await re(), !pe.value || f.value !== "home" || !_.value) return;
      const y = _.value.getBoundingClientRect(), Q = g?.closest("[data-learning-unit-id]") ?? [..._.value.querySelectorAll("[data-learning-unit-id]")].find((Ge) => {
        const Ne = Ge.getBoundingClientRect();
        return Ne.bottom > y.top + 48 && Ne.top < y.bottom;
      });
      Q?.dataset.learningUnitId && (m.chat.study = {
        unitId: Q.dataset.learningUnitId,
        exerciseId: Q.dataset.exerciseId
      });
    }
    Z([
      _,
      f,
      pe
    ], () => {
      Te();
    }, { flush: "post" });
    const Qe = C(() => {
      const { turns: S, removedTurns: g } = t.value.conversation;
      let y = S.length - 1;
      for (; y >= 0 && fe({ kind: S[y].purpose ?? "talk" }); ) y--;
      return y < 0 ? 0 : g + y + 1;
    }), Xe = z(Qe.value);
    Z([Qe, Pe], ([S, g]) => {
      (g || S < Xe.value) && (Xe.value = S);
    }, { immediate: !0 });
    const gt = C(() => Qe.value > Xe.value), oe = C(() => {
      const S = t.value.workbenchConversation.turns;
      let g = S.length - 1;
      for (; g >= 0 && Ke({ kind: S[g].purpose ?? "talk" }); ) g--;
      let y = S.length - 1;
      for (; y >= 0 && (S[y].status !== "running" || Ke({ kind: S[y].purpose ?? "talk" })); ) y--;
      if (y >= 0) g = y;
      else if (g >= 0 && t.value.preparation && fe({ kind: S[g].purpose ?? "talk" })) {
        let Q = S.length - 1;
        for (; Q >= 0 && S[Q].purpose !== `reading-${t.value.preparation.phase}`; ) Q--;
        Q >= 0 && (g = Q);
      }
      return g < 0 ? null : {
        turn: t.value.workbenchConversation.turns[g],
        key: `${t.value.chatIdentity}:${t.value.language}:${t.value.workbenchConversation.removedTurns + g}`
      };
    });
    async function pt() {
      t.value.teacher && (await Te(), Ue(), M.value = "chat", U.value = !0, await re(), M.value === "chat" && V.value?.focusHeading());
    }
    async function Ve() {
      A.value = !0, M.value = "work", await re(), _.value && (_.value.scrollTop = D[f.value] ?? 0);
      const S = _.value?.querySelector("h1, h2");
      S && (S.tabIndex = -1, S.focus({ preventScroll: !0 }));
    }
    let bt = 0;
    Z(() => !!t.value.record, async (S, g) => {
      f.value !== "books" || S === g || (S && (bt = _.value?.scrollTop ?? 0), await re(), f.value === "books" && _.value && (_.value.scrollTop = S ? 0 : bt));
    });
    const ie = z(null), mt = z(null);
    Ut(mt, () => {
      ie.value = null;
    });
    const _e = z(t.value.profile?.voice?.voiceId ?? t.value.voices.defaultVoice), De = z(t.value.profile?.voice?.language ?? t.value.language), je = z(t.value.profile?.voice?.speed ?? 1), we = z(0), la = C(() => t.value.completions.slice(we.value * 20, (we.value + 1) * 20));
    Z([() => t.value.language, () => t.value.profile?.voice], ([S, g]) => {
      _e.value = g?.voiceId ?? t.value.voices.defaultVoice, De.value = g?.language ?? S, je.value = g?.speed ?? 1;
    }), Z([
      () => t.value.chatIdentity,
      () => t.value.language,
      () => t.value.teacher?.name
    ], () => {
      W.value = null, ie.value = null, we.value = 0;
    }), Z(() => !!t.value.teacher, (S) => {
      S || (M.value = "work");
    }), Z(() => t.value.currentUnitId, (S) => {
      ie.value?.action === "replace-lesson" && ie.value.input.unitId !== S && (ie.value = null);
    }), Z(() => t.value.unit, (S) => {
      const g = W.value;
      g && (S?.id !== g.unitId || !(g.kind === "exercise" ? S.exercises : S.materials).some((y) => y.id === g.id)) && et();
    });
    for (const S of ["conversation", "workbenchConversation"]) Z(() => {
      const g = t.value[S].turns.at(-1)?.presentation;
      return g ? `${t.value[S].turns.length + t.value[S].removedTurns}:${g.unitId}:${g.kind}:${g.id}` : "";
    }, (g) => {
      const y = t.value[S].turns.at(-1)?.presentation;
      g && y && Ie(y, !0);
    });
    const Ce = z(!1);
    Z([pe, f], ([S, g]) => {
      S && g === "home" && (Ce.value = !1);
    });
    async function Ie(S, g = !1) {
      if (S.kind === "replacement") {
        if (t.value.currentUnitId !== S.unitId || t.value.storage !== "ready") return;
        ue("replace-lesson", {
          unitId: S.unitId,
          message: S.message,
          kind: S.unitKind
        }, s.replaceWarning);
        return;
      }
      if (t.value.review?.id === S.unitId) {
        if (g) {
          (!pe.value || f.value !== "home") && (Ce.value = !0);
          return;
        }
        const y = m.unit(S.unitId).review;
        S.kind === "exercise" && (y.index = t.value.review.exercises.findIndex((Q) => Q.id === S.id)), y.expanded = !0, await nt();
        return;
      }
      if (t.value.unit?.id === S.unitId) {
        if (t.value.unit.kind === "reading-writing") {
          if (g) {
            (!pe.value || f.value !== "home") && (Ce.value = !0);
            return;
          }
          m.unit(S.unitId).reading.view = "reading", await be("home");
          const y = S.kind === "exercise" ? `[data-exercise-id="${CSS.escape(S.id)}"]` : `[data-material-id="${CSS.escape(S.id)}"][data-paragraph-id]`;
          _.value?.querySelector(y)?.scrollIntoView({
            block: "start",
            behavior: matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth"
          });
          return;
        }
        W.value = S;
      }
    }
    function et() {
      W.value = null, w("stop");
    }
    async function tt(S, g) {
      L.value || Ue(), L.value = !0, await Ve(), await re(), S ? await R.value?.ask(S, void 0, g) : R.value?.focusHeading();
    }
    async function at() {
      L.value = !1, await re(), _.value && (_.value.scrollTop = D[f.value] ?? 0), B.value?.focus({ preventScroll: !0 });
    }
    async function ft(S, g, y) {
      if (!t.value.teacher) {
        await tt(S, y), g && await R.value?.ask(S, g, y);
        return;
      }
      et(), Ue(), M.value = "chat", U.value = !0, await re(), await V.value?.ask(S, g, y);
    }
    async function be(S, g = !1) {
      if (L.value = !1, S !== f.value && !g) if (S === "home") $.length = 0;
      else {
        const y = $.indexOf(S);
        y >= 0 ? $.splice(y) : $.push(f.value);
      }
      if (_.value && (D[f.value] = _.value.scrollTop), o.value && (o.value.open = !1), f.value = S, await Ve(), await re(), _.value) {
        _.value.scrollTop = D[S] ?? 0;
        const y = [..._.value.querySelectorAll("h1, h2")].find((Q) => Q.offsetParent !== null);
        y && (y.tabIndex = -1, y.focus({ preventScroll: !0 }));
      }
    }
    function kt() {
      m.setup.step = 0, be("profile");
    }
    async function nt() {
      await be("home"), _.value && (_.value.scrollTop = 0);
      const S = _.value?.querySelector("#learning-review-title");
      S && (S.tabIndex = -1, S.focus({ preventScroll: !0 }));
    }
    async function We(S, g = {}, y = !1) {
      if (S === "prepare" && !t.value.profile) {
        m.setup.step = 2, await be("profile");
        return;
      }
      S === "start-review" && await nt();
      const Q = t.value.unit;
      Q?.kind === "reading-writing" && g.unitId === Q.id && [
        "grade",
        "submit-revision",
        "skip-revision"
      ].includes(S) && (m.unit(Q.id).reading.view = S !== "grade" || [
        "reviewing",
        "model",
        "complete"
      ].includes(Q.stage.stage) ? "model" : "feedback", await be("home"), _.value && (_.value.scrollTop = 0)), await w(S, g, y);
    }
    Z(() => m.settings.submitted, (S, g) => {
      !S && g && !m.settings.open && f.value === "profile" && m.setup.step === 2 && t.value.storage === "ready" && !t.value.busy && t.value.profile && Object.entries(g.value).every(([y, Q]) => t.value.profile.settings[y] === Q) && be("home");
    }), Z(() => t.value.busy, (S) => {
      const g = t.value.unit;
      !S && g?.stage.stage === "revising" && m.unit(g.id).reading.view === "model" && (m.unit(g.id).reading.view = "feedback");
    });
    const yt = ze(() => o.value?.open ? (o.value.open = !1, !0) : L.value && pe.value ? (at(), !0) : !T.value && M.value === "chat" ? (Ve(), !0) : f.value === "home" || !$.length && f.value === "profile" && !t.value.teacher ? !1 : (be($.pop() ?? "home", !0), !0));
    function ue(S, g, y) {
      ie.value = {
        action: S,
        input: g,
        text: y
      };
    }
    async function sa(S) {
      await w("records", {
        id: S,
        offset: t.value.records.offset
      }), t.value.record?.id === S && await be("books");
    }
    const { bubble: ht, dismiss: it } = au({
      root: P,
      state: t,
      pending: u,
      preference: m.companion,
      reading: C(() => pe.value && f.value === "home" && t.value.unit?.kind === "reading-writing" && [
        "writing",
        "grading",
        "complete"
      ].includes(t.value.unit.stage.stage)),
      blocked: C(() => L.value || !!W.value || !!ie.value || x.value),
      request: w
    });
    async function ra() {
      const S = await w("export");
      if (!S?.document) return;
      const g = URL.createObjectURL(new Blob([JSON.stringify(S.document, null, 2)], { type: "application/json" })), y = document.createElement("a");
      y.href = g, y.download = "LittleWhiteBox_Learning.json", y.click(), setTimeout(() => URL.revokeObjectURL(g), 1e3);
    }
    return (S, g) => (a(), i("section", {
      ref_key: "root",
      ref: P,
      class: "learning-app",
      style: qt({
        "--learning-switch-ms": `${l(320)}ms`,
        "--learning-work-share": `${q.value}%`
      }),
      "aria-label": "语伴语言学习"
    }, [
      n("header", nu, [
        f.value !== "home" && (l(t).teacher || $.length) && (T.value || M.value === "work") ? (a(), i("button", {
          key: 0,
          type: "button",
          class: "learning-toolbar-back",
          "aria-label": "返回上一页",
          onClick: g[0] || (g[0] = (...y) => l(yt) && l(yt)(...y))
        }, [F(K, { name: "back" })])) : p("", !0),
        n("button", {
          type: "button",
          class: "learning-wordmark",
          onClick: g[1] || (g[1] = (y) => be("home"))
        }, [
          g[37] || (g[37] = n("span", {
            class: "learning-brand-mark",
            "aria-hidden": "true"
          }, [Y("a"), n("span", null, "あ")], -1)),
          g[38] || (g[38] = Y("语伴", -1)),
          Ce.value && (T.value || M.value === "work") ? (a(), i("span", iu)) : p("", !0)
        ]),
        T.value && l(t).teacher ? (a(), i("label", lu, [
          F(K, { name: "workbook" }),
          ne(n("input", {
            "onUpdate:modelValue": g[2] || (g[2] = (y) => q.value = y),
            type: "range",
            min: O.value,
            max: G.value,
            step: "1",
            "aria-label": "阅读区宽度比例"
          }, null, 8, su), [[
            de,
            q.value,
            void 0,
            { number: !0 }
          ]]),
          F(K, { name: "chat" })
        ])) : p("", !0),
        n("button", {
          ref_key: "assistantButton",
          ref: B,
          type: "button",
          class: "learning-assistant-button",
          "aria-label": l(ee).assistant,
          "aria-expanded": L.value,
          onClick: g[3] || (g[3] = (y) => L.value ? at() : tt())
        }, [F(K, { name: "chat" }), n("span", null, r(l(ee).assistant), 1)], 8, ru),
        n("details", {
          ref_key: "menu",
          ref: o,
          class: "learning-menu",
          onToggle: g[4] || (g[4] = (y) => x.value = !!o.value?.open),
          onKeydown: g[5] || (g[5] = qe(ve((y) => o.value.open = !1, ["stop", "prevent"]), ["esc"]))
        }, [n("summary", ou, [F(K, { name: "more" })]), n("nav", uu, [(a(), i(E, null, H([
          ["books", "语法本与生词本"],
          ["materials", "课件与笔记"],
          ["harvest", "我的收获"],
          ["settings", "设置"]
        ], ([y, Q]) => n("button", {
          key: y,
          type: "button",
          onClick: (Ge) => be(y)
        }, r(Q), 9, du)), 64))])], 544)
      ]),
      l(I) || !l(t).busy && (l(t).message || l(t).storage !== "ready") ? (a(), i("div", vu, [Y(r(l(I) || l(t).message || (l(t).storage === "unconfirmed" ? l(st).unconfirmed : l(t).storage === "conflict" ? l(st).conflict : l(st).unloaded)) + " ", 1), n("div", cu, [
        l(t).storage === "unconfirmed" || l(t).storage === "conflict" ? (a(), i("button", {
          key: 0,
          type: "button",
          disabled: l(u),
          onClick: g[6] || (g[6] = (y) => w("verify"))
        }, r(s.verify), 9, gu)) : p("", !0),
        l(t).storage === "unconfirmed" ? (a(), i("button", {
          key: 1,
          type: "button",
          disabled: l(u),
          onClick: g[7] || (g[7] = (y) => w("retry-save"))
        }, r(s.retry), 9, pu)) : p("", !0),
        l(t).storage === "conflict" ? (a(), i("button", {
          key: 2,
          type: "button",
          disabled: l(u),
          onClick: g[8] || (g[8] = (y) => ue("adopt-server", {}, s.adoptWarning))
        }, r(s.adopt), 9, bu)) : p("", !0),
        l(t).storage === "unloaded" || l(k) ? (a(), i("button", {
          key: 3,
          type: "button",
          disabled: l(u),
          onClick: g[9] || (g[9] = (y) => w("read"))
        }, r(l(Wt).refresh), 9, mu)) : p("", !0)
      ])])) : p("", !0),
      [
        "unconfirmed",
        "conflict",
        "failed"
      ].includes(l(t).chatStorage) ? (a(), i("div", fu, [Y(r(l(t).chatStorage === "unconfirmed" ? l(Le).unconfirmed : l(t).chatStorage === "conflict" ? l(Le).conflict : l(Le).failed) + " ", 1), n("div", ku, [n("button", {
        type: "button",
        disabled: !l(b)("verify-teacher"),
        onClick: g[10] || (g[10] = (y) => w("verify-teacher"))
      }, r(l(Le).verify), 9, yu), l(t).chatStorage !== "failed" ? (a(), i("button", {
        key: 0,
        type: "button",
        disabled: !l(b)("adopt-teacher"),
        onClick: g[11] || (g[11] = (y) => ue("adopt-teacher", {}, l(Le).adoptWarning))
      }, r(l(Le).adopt), 9, hu)) : p("", !0)])])) : p("", !0),
      [
        "unconfirmed",
        "conflict",
        "failed"
      ].includes(l(t).workbenchStorage) ? (a(), i("div", $u, [
        Y(r(l(ee).assistantStorage) + " ", 1),
        n("button", {
          type: "button",
          disabled: l(u),
          onClick: g[12] || (g[12] = (y) => w("verify-workbench"))
        }, r(l(ee).verify), 9, wu),
        l(t).workbenchStorage === "conflict" ? (a(), i("button", {
          key: 0,
          type: "button",
          disabled: l(u),
          onClick: g[13] || (g[13] = (y) => ue("adopt-workbench", {}, l(ee).adoptConfirm))
        }, r(l(ee).adopt), 9, xu)) : p("", !0)
      ])) : p("", !0),
      n("div", { class: se(["learning-stage", {
        "is-wide": T.value,
        "is-chat": !T.value && M.value === "chat"
      }]) }, [
        n("div", {
          class: "learning-pane is-work",
          inert: !pe.value,
          "aria-hidden": !pe.value
        }, [A.value && L.value ? (a(), J(Ot, {
          key: 0,
          ref_key: "assistant",
          ref: R,
          target: "workbench",
          state: l(t),
          disabled: !l(b)("workbench-talk"),
          pending: l(u),
          onAction: w,
          onPresent: Ie,
          onClose: at
        }, null, 8, [
          "state",
          "disabled",
          "pending"
        ])) : p("", !0), ne(n("div", {
          ref_key: "scroller",
          ref: _,
          class: "learning-scroll",
          onScrollPassive: Ue,
          onClick: Te,
          onFocusin: Te
        }, [A.value && !L.value ? (a(), i(E, { key: 0 }, [
          oe.value ? (a(), J(ia, {
            key: oe.value.key,
            turn: oe.value.turn,
            stoppable: "",
            disabled: l(u),
            onStop: g[14] || (g[14] = (y) => w(l(fe)({ kind: oe.value.turn.purpose ?? "talk" }) ? "cancel-preparation" : "cancel"))
          }, ma({ _: 2 }, [l(t).storage === "ready" && l(fe)({ kind: oe.value.turn.purpose ?? "talk" }) && !l(t).preparation?.running && (l(t).preparation || l(t).sourceChoice) ? {
            name: "default",
            fn: Pt(() => [F(ut, {
              state: l(t),
              disabled: !l(d),
              pending: l(u),
              onAction: We
            }, null, 8, [
              "state",
              "disabled",
              "pending"
            ])]),
            key: "0"
          } : void 0]), 1032, ["turn", "disabled"])) : p("", !0),
          oe.value && !l(fe)({ kind: oe.value.turn.purpose ?? "talk" }) && l(Oe)(oe.value.turn, l(t).workbenchStorage, l(t).storage) ? (a(), i("p", {
            key: 1,
            class: se(["learning-turn-notice", { "is-error": oe.value.turn.status === "failed" }]),
            role: "status"
          }, r(l(Oe)(oe.value.turn, l(t).workbenchStorage, l(t).storage)), 3)) : p("", !0),
          l(t).busy && oe.value?.turn.status !== "running" ? (a(), i("div", Iu, [
            g[39] || (g[39] = n("span", {
              class: "learning-working-dot",
              "aria-hidden": "true"
            }, null, -1)),
            n("span", null, r(l(t).message || s.working), 1),
            n("button", {
              type: "button",
              disabled: l(u),
              onClick: g[15] || (g[15] = (y) => w("cancel"))
            }, "停止", 8, Lu)
          ])) : p("", !0),
          f.value === "home" ? (a(), J(ro, {
            key: 3,
            state: l(t),
            disabled: !l(d),
            pending: l(u),
            "preparation-in-process": !!oe.value && l(fe)({ kind: oe.value.turn.purpose ?? "talk" }),
            onAction: We,
            onConfirm: ue,
            onPresent: Ie,
            onGo: be,
            onAsk: ft,
            onAssistant: tt,
            onRecord: sa
          }, null, 8, [
            "state",
            "disabled",
            "pending",
            "preparation-in-process"
          ])) : p("", !0),
          f.value === "profile" ? (a(), J(vl, {
            key: 4,
            state: l(t),
            disabled: !l(b)("language"),
            onAction: w
          }, null, 8, ["state", "disabled"])) : p("", !0),
          f.value === "materials" ? (a(), i("section", Su, [
            g[40] || (g[40] = n("h1", null, "课件与笔记", -1)),
            l(t).unit ? p("", !0) : (a(), i("p", Au, r(l(t).blockedUnit ? "当前课件在另一个故事中" : "还没有课件"), 1)),
            l(t).unit ? (a(), i(E, { key: 1 }, [
              n("p", Ru, r(l(t).unit.title), 1),
              (a(!0), i(E, null, H(l(t).unit.materials, (y) => (a(), i("button", {
                key: y.id,
                type: "button",
                class: "learning-activity-link",
                onClick: (Q) => Ie({
                  unitId: l(t).unit.id,
                  kind: "material",
                  id: y.id,
                  title: y.title
                })
              }, [
                F(K, { name: "book" }),
                n("span", null, r(y.title), 1),
                F(K, { name: "arrow" })
              ], 8, Mu))), 128)),
              (a(!0), i(E, null, H(l(t).unit.exercises, (y) => (a(), i("button", {
                key: y.id,
                type: "button",
                class: "learning-activity-link",
                onClick: (Q) => Ie({
                  unitId: l(t).unit.id,
                  kind: "exercise",
                  id: y.id,
                  title: y.prompt
                })
              }, [
                F(K, { name: "records" }),
                n("span", null, r(y.prompt), 1),
                F(K, { name: "arrow" })
              ], 8, Eu))), 128)),
              l(t).unit.notes.length ? (a(), i("section", Tu, [(a(!0), i(E, null, H(l(t).unit.notes, (y) => (a(), i("article", { key: y.id }, [
                y.selection ? (a(), i("blockquote", Nu, r(y.selection.quote), 1)) : p("", !0),
                n("p", null, r(y.text), 1),
                n("button", {
                  type: "button",
                  disabled: !l(d),
                  onClick: (Q) => w("delete-note", { id: y.id })
                }, "删除笔记", 8, Bu)
              ]))), 128))])) : p("", !0)
            ], 64)) : p("", !0)
          ])) : p("", !0),
          f.value === "books" ? (a(), J(Bi, {
            key: 6,
            state: l(t),
            disabled: !l(b)("start-review"),
            onAction: We,
            onReview: nt,
            onRemove: ue
          }, null, 8, ["state", "disabled"])) : p("", !0),
          f.value === "harvest" ? (a(), i("section", Ou, [
            g[42] || (g[42] = n("div", { class: "learning-page-heading" }, [n("h1", null, "我的收获")], -1)),
            l(t).completions.length ? p("", !0) : (a(), i("p", qu, "还没有完成的课程")),
            (a(!0), i(E, null, H(la.value, (y) => (a(), i("article", {
              key: y.unitId,
              class: "learning-harvest-entry"
            }, [
              n("small", null, r(new Date(y.completedAt).toLocaleDateString()), 1),
              y.rewardStatus !== "retired" ? (a(), i("h2", Pu, [Y(r(y.rewardStatus === "paid" ? "+" : "") + r(y.amount), 1), g[41] || (g[41] = n("span", null, "小白币", -1))])) : p("", !0),
              n("p", null, r(y.summary), 1),
              n("p", Uu, r(y.rewardStatus === "paid" ? l(ce).paid : y.rewardStatus === "retired" ? l(ce).retired : l(ce).pending), 1),
              y.rewardStatus !== "paid" && y.rewardStatus !== "retired" ? (a(), i("button", {
                key: 1,
                type: "button",
                disabled: !l(d) || l(t).walletStorage !== "ready",
                onClick: (Q) => w("reward", {
                  unitId: y.unitId,
                  openWallet: !l(t).walletOpen
                })
              }, r(l(t).walletOpen ? l(ce).claim : l(ce).openWallet), 9, Vu)) : p("", !0)
            ]))), 128)),
            l(t).walletStorage === "unconfirmed" || l(t).walletStorage === "conflict" || l(t).walletStorage === "failed" ? (a(), i("button", {
              key: 1,
              type: "button",
              disabled: l(u) || l(t).busy,
              onClick: g[16] || (g[16] = (y) => w("verify-wallet"))
            }, r(s.verifyWallet), 9, _u)) : p("", !0),
            l(t).walletStorage === "conflict" ? (a(), i("button", {
              key: 2,
              type: "button",
              disabled: l(u) || l(t).busy,
              onClick: g[17] || (g[17] = (y) => ue("adopt-wallet", {}, s.adoptWalletWarning))
            }, r(s.adoptWallet), 9, Du)) : p("", !0),
            l(t).completions.length > 20 ? (a(), i("div", ju, [n("button", {
              type: "button",
              disabled: we.value === 0,
              onClick: g[18] || (g[18] = (y) => we.value--)
            }, "上一页", 8, Wu), n("button", {
              type: "button",
              disabled: (we.value + 1) * 20 >= l(t).completions.length,
              onClick: g[19] || (g[19] = (y) => we.value++)
            }, "下一页", 8, Gu)])) : p("", !0)
          ])) : p("", !0),
          f.value === "settings" ? (a(), i("section", Fu, [
            g[52] || (g[52] = n("h1", null, "学习设置", -1)),
            n("label", null, [g[43] || (g[43] = Y("当前语言", -1)), n("select", {
              value: l(t).language,
              disabled: !l(b)("language"),
              onChange: g[20] || (g[20] = (y) => {
                w("language", { language: y.target.value }), y.target.value = l(t).language;
              })
            }, [(a(!0), i(E, null, H([.../* @__PURE__ */ new Set([l(t).language, ...l(t).languages])], (y) => (a(), i("option", {
              key: y,
              value: y
            }, r(new Intl.DisplayNames(["zh-CN"], { type: "language" }).of(y)), 9, zu))), 128))], 40, Hu)]),
            n("button", {
              type: "button",
              onClick: kt
            }, "更换语言和语伴 →"),
            F(ea),
            n("section", null, [
              g[44] || (g[44] = n("h2", null, "训练设置", -1)),
              l(t).profile?.goal.description ? (a(), i("p", Yu, r(l(t).profile.goal.description), 1)) : p("", !0),
              F(Xt, {
                state: l(t),
                disabled: !l(b)("settings"),
                onAction: w
              }, null, 8, ["state", "disabled"])
            ]),
            n("section", null, [
              g[49] || (g[49] = n("h2", null, "语伴的声音", -1)),
              l(t).voices.enabled ? (a(), i("form", {
                key: 1,
                onSubmit: g[24] || (g[24] = ve((y) => w("voice", { voice: {
                  voiceId: _e.value,
                  language: De.value,
                  speed: Number(je.value)
                } }), ["prevent"]))
              }, [
                n("label", null, [g[45] || (g[45] = Y("音色", -1)), ne(n("select", { "onUpdate:modelValue": g[21] || (g[21] = (y) => _e.value = y) }, [(a(!0), i(E, null, H(l(t).voices.voices, (y) => (a(), i("option", {
                  key: y.id,
                  value: y.id,
                  disabled: !y.available
                }, r(y.name) + r(y.available ? "" : "（暂不可用）"), 9, Zu))), 128))], 512), [[He, _e.value]])]),
                n("label", null, [g[46] || (g[46] = Y("发音语言", -1)), ne(n("input", {
                  "onUpdate:modelValue": g[22] || (g[22] = (y) => De.value = y),
                  type: "text",
                  maxlength: "80",
                  placeholder: "en / ja"
                }, null, 512), [[de, De.value]])]),
                n("label", null, [g[48] || (g[48] = Y("语速", -1)), ne(n("select", { "onUpdate:modelValue": g[23] || (g[23] = (y) => je.value = y) }, [...g[47] || (g[47] = [
                  n("option", { value: 0.75 }, "0.75×", -1),
                  n("option", { value: 1 }, "1×", -1),
                  n("option", { value: 1.25 }, "1.25×", -1)
                ])], 512), [[He, je.value]])]),
                n("button", {
                  type: "submit",
                  disabled: !l(b)("voice") || !l(t).profile
                }, "保存声音设置", 8, Ju)
              ], 32)) : (a(), i("p", Ku, r(s.voiceDisabled), 1)),
              n("button", {
                type: "button",
                onClick: g[25] || (g[25] = (y) => w("tts-settings"))
              }, r(l(t).voices.enabled ? l(rt).settings : l(rt).enable), 1),
              g[50] || (g[50] = n("small", null, "已听过的题保留原声音，新偏好用于之后的题目。", -1))
            ]),
            n("section", null, [
              g[51] || (g[51] = n("h2", null, "学习数据", -1)),
              n("button", {
                type: "button",
                disabled: !l(b)("forget-conversation"),
                onClick: g[26] || (g[26] = (y) => ue("forget-conversation", { target: "companion" }, l(ee).clearCompanionConfirm))
              }, r(l(ee).clearCompanion), 9, Qu),
              n("button", {
                type: "button",
                disabled: !l(b)("forget-conversation"),
                onClick: g[27] || (g[27] = (y) => ue("forget-conversation", { target: "workbench" }, l(ee).clearAssistantConfirm))
              }, r(l(ee).clearAssistant), 9, Xu),
              n("button", {
                type: "button",
                disabled: !l(b)("export"),
                onClick: ra
              }, "导出学习数据", 8, ed),
              n("button", {
                type: "button",
                disabled: !l(b)("read"),
                onClick: g[28] || (g[28] = (y) => w("read"))
              }, "重新加载", 8, td),
              l(t).unit || l(t).blockedUnit ? (a(), i("button", {
                key: 0,
                type: "button",
                disabled: !l(b)("abandon"),
                onClick: g[29] || (g[29] = (y) => ue("abandon", {}, l(he).lesson))
              }, "放下当前练习", 8, ad)) : p("", !0),
              n("button", {
                type: "button",
                class: "learning-danger",
                disabled: !l(b)("delete-language") || !l(t).profile,
                onClick: g[30] || (g[30] = (y) => ue("delete-language", {}, "删除当前语言的全部学习数据？未领取奖励也将放弃，已到账流水保留。"))
              }, "删除当前语言", 8, nd),
              n("button", {
                type: "button",
                class: "learning-danger",
                disabled: !l(b)("clear"),
                onClick: g[31] || (g[31] = (y) => ue("clear", {}, "清空所有语言的目标、课程和记录？未领取奖励也将放弃。已到账流水不撤销。"))
              }, "清空全部学习数据", 8, id)
            ])
          ])) : p("", !0)
        ], 64)) : p("", !0)], 544), [[ba, !L.value]])], 8, Cu),
        l(t).teacher ? (a(), i("div", {
          key: 0,
          class: "learning-pane is-chat",
          inert: !Pe.value,
          "aria-hidden": !Pe.value
        }, [U.value ? (a(), J(Ot, {
          key: 0,
          ref_key: "conversation",
          ref: V,
          target: "companion",
          state: l(t),
          disabled: !l(v),
          pending: l(u),
          onAction: w,
          onPresent: Ie,
          onProfile: kt
        }, null, 8, [
          "state",
          "disabled",
          "pending"
        ])) : p("", !0)], 8, ld)) : p("", !0),
        !T.value && M.value === "work" && l(t).teacher ? (a(), i("button", {
          key: 1,
          type: "button",
          class: "learning-float is-companion",
          "aria-label": gt.value ? `和${l(t).teacher.name}聊天，有新消息` : `和${l(t).teacher.name}聊天`,
          onClick: pt
        }, [n("span", rd, r([...l(t).teacher.name][0]), 1), gt.value ? (a(), i("span", od)) : p("", !0)], 8, sd)) : p("", !0),
        !T.value && M.value === "chat" ? (a(), i("button", {
          key: 2,
          type: "button",
          class: "learning-float is-workbook",
          "aria-label": Ce.value ? "回到练习本，有新指引" : "回到练习本",
          onClick: Ve
        }, [F(K, { name: "workbook" }), Ce.value ? (a(), i("span", dd)) : p("", !0)], 8, ud)) : p("", !0),
        l(ht) ? (a(), i("aside", {
          key: 3,
          class: se(["learning-companion-bubble", { "is-wide": T.value }]),
          "aria-live": "polite"
        }, [n("button", {
          type: "button",
          onClick: g[32] || (g[32] = (y) => {
            pt(), l(it)();
          })
        }, r(l(ht)), 1), n("button", {
          type: "button",
          "aria-label": "收起这句话",
          onClick: g[33] || (g[33] = (...y) => l(it) && l(it)(...y))
        }, [F(K, { name: "close" })])], 2)) : p("", !0)
      ], 2),
      W.value ? p("", !0) : (a(), J(zt, {
        key: 3,
        state: l(t),
        onAction: w
      }, null, 8, ["state"])),
      l(t).unit && W.value ? (a(), J(Hn, {
        key: `${l(t).chatIdentity}:${l(t).language}:${l(t).unit.id}:${W.value.kind}:${W.value.id}`,
        state: l(t),
        target: W.value,
        disabled: !l(d),
        onAction: w,
        onClose: et,
        onAsk: ft
      }, null, 8, [
        "state",
        "target",
        "disabled"
      ])) : p("", !0),
      ie.value ? (a(), i("div", {
        key: 5,
        ref_key: "confirmLayer",
        ref: mt,
        class: "learning-confirm-shade",
        onKeydown: g[36] || (g[36] = qe(ve((y) => ie.value = null, ["stop", "prevent"]), ["esc"]))
      }, [n("section", vd, [
        n("h2", cd, r(l(St)[ie.value.action].title), 1),
        n("p", null, r(ie.value.text), 1),
        n("div", gd, [n("button", {
          autofocus: "",
          type: "button",
          onClick: g[34] || (g[34] = (y) => ie.value = null)
        }, r(["language", "teacher"].includes(ie.value.action) ? l(he).keepEditing : s.cancel), 1), n("button", {
          type: "button",
          class: "learning-primary",
          disabled: !l(b)(ie.value.action),
          onClick: g[35] || (g[35] = (y) => {
            We(ie.value.action, ie.value.input, !0), ie.value = null;
          })
        }, r(l(St)[ie.value.action].accept), 9, pd)])
      ])], 544)) : p("", !0)
    ], 4));
  }
}), $d = bd;
export {
  $d as default
};
