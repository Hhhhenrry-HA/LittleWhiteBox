/* eslint-disable */
import { B as Re, C as g, D as H, G as j, I as Me, K as da, M as St, O as W, P as re, Q as K, S as Z, T as va, U as a, W as ca, X as ga, Z as pa, _ as E, at as F, b as S, ct as ke, d as ba, dt as Dt, et as Ut, f as Ye, ft as r, g as oe, h as Se, it as xe, j as ma, k as te, lt as l, m as fa, n as ka, o as Ke, ot as ya, p as ve, q as ha, s as vt, st as $a, t as wa, tt as ne, ut as se, w as i, x as n } from "./xiaobai-os-frame-bridge-CrPFvkI3.js";
import { t as ct } from "./xiaobai-os-MessageMarkdown-CFMtVfNA.js";
var st = /* @__PURE__ */ new WeakMap(), At = [
  "select",
  "input",
  "keyup",
  "pointerup",
  "scroll"
], Je = {
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
    st.set(e, u);
    for (const d of At) e.addEventListener(d, u, { passive: !0 });
    re(() => {
      !e.isConnected || !t || (e.setSelectionRange(t.start, t.end, t.direction), e.scrollTop = t.top, e.scrollLeft = t.left);
    });
  },
  beforeUnmount(e) {
    const c = st.get(e);
    if (c) {
      c();
      for (const s of At) e.removeEventListener(s, c);
      st.delete(e);
    }
  }
}, xa = ["disabled"], Ca = {
  key: 0,
  class: "learning-choices"
}, Ia = [
  "type",
  "checked",
  "onChange"
], La = { class: "learning-option-letter" }, Sa = {
  key: 1,
  class: "learning-order"
}, Aa = [
  "disabled",
  "aria-label",
  "onClick"
], Ra = [
  "disabled",
  "aria-label",
  "onClick"
], Ma = {
  key: 2,
  class: "learning-fields"
}, Ea = ["onUpdate:modelValue"], Ta = ["value"], Na = {
  key: 3,
  class: "learning-choices"
}, Ba = ["checked", "onChange"], Oa = {
  key: 0,
  class: "learning-muted"
}, qa = {
  key: 4,
  class: "learning-fields"
}, Pa = ["onUpdate:modelValue"], Va = {
  key: 5,
  class: "learning-writing"
}, _a = ["disabled"], Da = /* @__PURE__ */ te({
  __name: "AnswerInput",
  props: /* @__PURE__ */ St({
    response: {},
    paragraphs: {},
    disabled: { type: Boolean }
  }, {
    modelValue: { required: !0 },
    modelModifiers: {}
  }),
  emits: /* @__PURE__ */ St(["submit"], ["update:modelValue"]),
  setup(e, { emit: c }) {
    const s = e, t = c, u = ga(e, "modelValue");
    function d(k) {
      s.response.kind === "choice" && !s.response.multiple ? u.value.picked = [k] : u.value.picked = u.value.picked.includes(k) ? u.value.picked.filter(($) => $ !== k) : [...u.value.picked, k];
    }
    function v(k, $) {
      const m = [...u.value.order];
      [m[k], m[k + $]] = [m[k + $], m[k]], u.value.order = m;
    }
    const b = S(() => {
      const k = s.response;
      return k.kind === "text" ? !!u.value.text.trim() : k.kind === "gaps" ? k.slots.every(($) => u.value.values[$.id]?.trim()) : k.kind === "match" ? k.left.every(($) => u.value.values[$.id]) : k.kind === "order" ? !0 : u.value.picked.length > 0;
    });
    function C() {
      const k = s.response;
      !b.value || s.disabled || (k.kind === "text" ? t("submit", {
        kind: "text",
        text: u.value.text
      }) : k.kind === "gaps" ? t("submit", {
        kind: "gaps",
        values: k.slots.map(($) => ({
          id: $.id,
          text: u.value.values[$.id]
        }))
      }) : k.kind === "match" ? t("submit", {
        kind: "match",
        pairs: k.left.map(($) => ({
          left: $.id,
          right: u.value.values[$.id]
        }))
      }) : t("submit", {
        kind: k.kind,
        ids: [...k.kind === "order" ? u.value.order : u.value.picked]
      }));
    }
    return (k, $) => (a(), i("form", {
      class: "learning-answer",
      onSubmit: oe(C, ["prevent"])
    }, [n("fieldset", { disabled: e.disabled }, [
      $[3] || ($[3] = n("legend", { class: "learning-sr-only" }, "你的回答", -1)),
      e.response.kind === "choice" ? (a(), i("div", Ca, [(a(!0), i(E, null, j(e.response.options, (m, y) => (a(), i("label", {
        key: m.id,
        class: se({ selected: u.value.picked.includes(m.id) })
      }, [
        n("input", {
          type: e.response.multiple ? "checkbox" : "radio",
          name: "answer-choice",
          checked: u.value.picked.includes(m.id),
          onChange: (f) => d(m.id)
        }, null, 40, Ia),
        n("span", La, r(String.fromCharCode(65 + y)), 1),
        n("span", null, r(m.text), 1)
      ], 2))), 128))])) : e.response.kind === "order" ? (a(), i("ol", Sa, [(a(!0), i(E, null, j(u.value.order, (m, y) => (a(), i("li", { key: m }, [
        n("span", null, r(e.response.options.find((f) => f.id === m)?.text), 1),
        n("button", {
          type: "button",
          disabled: y === 0,
          "aria-label": `上移第 ${y + 1} 项`,
          onClick: (f) => v(y, -1)
        }, "↑", 8, Aa),
        n("button", {
          type: "button",
          disabled: y === u.value.order.length - 1,
          "aria-label": `下移第 ${y + 1} 项`,
          onClick: (f) => v(y, 1)
        }, "↓", 8, Ra)
      ]))), 128))])) : e.response.kind === "match" ? (a(), i("div", Ma, [(a(!0), i(E, null, j(e.response.left, (m) => (a(), i("label", { key: m.id }, [H(r(m.text) + " ", 1), ne(n("select", { "onUpdate:modelValue": (y) => u.value.values[m.id] = y }, [$[1] || ($[1] = n("option", { value: "" }, "选择对应项", -1)), (a(!0), i(E, null, j(e.response.right, (y) => (a(), i("option", {
        key: y.id,
        value: y.id
      }, r(y.text), 9, Ta))), 128))], 8, Ea), [[Ye, u.value.values[m.id]]])]))), 128))])) : e.response.kind === "evidence" ? (a(), i("div", Na, [(a(!0), i(E, null, j(e.paragraphs, (m) => (a(), i("label", {
        key: m.id,
        class: se({ selected: u.value.picked.includes(m.id) })
      }, [n("input", {
        type: "checkbox",
        checked: u.value.picked.includes(m.id),
        onChange: (y) => d(m.id)
      }, null, 40, Ba), n("span", null, r(m.text), 1)], 2))), 128)), e.paragraphs.length ? g("", !0) : (a(), i("p", Oa, "请先展开相关文稿，再选择原文依据。"))])) : e.response.kind === "gaps" ? (a(), i("div", qa, [(a(!0), i(E, null, j(e.response.slots, (m) => (a(), i("label", { key: m.id }, [H(r(m.text), 1), ne(n("input", {
        "onUpdate:modelValue": (y) => u.value.values[m.id] = y,
        type: "text",
        maxlength: "4000",
        autocomplete: "off"
      }, null, 8, Pa), [[ve, u.value.values[m.id]]])]))), 128))])) : (a(), i("label", Va, [$[2] || ($[2] = n("span", { class: "learning-sr-only" }, "你的回答", -1)), ne(n("textarea", {
        "onUpdate:modelValue": $[0] || ($[0] = (m) => u.value.text = m),
        rows: "6",
        maxlength: "4000",
        placeholder: "写下你的回答…"
      }, null, 512), [[ve, u.value.text], [l(Je), u.value]])])),
      n("button", {
        class: "learning-primary",
        type: "submit",
        disabled: !b.value
      }, "交给语伴 →", 8, _a)
    ], 8, xa)], 32));
  }
}), gt = Da, jt = 2e3, Ua = ["stroke-width"], ja = ["d"], Wa = /* @__PURE__ */ te({
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
    }, [n("path", { d: c[e.name] }, null, 8, ja)], 8, Ua));
  }
}), Y = Wa, qe = Object.freeze({
  select: "引用这段",
  ask: "问语伴",
  listen: "朗读",
  dismiss: "取消引用"
});
function Ga(e, c, s) {
  if (!s?.rangeCount || s.isCollapsed) return null;
  const t = s.getRangeAt(0), u = t.startContainer, d = (u instanceof Element ? u : u.parentElement)?.closest("[data-learning-text]");
  if (!d || !e.contains(d) || !d.contains(t.endContainer)) return null;
  const v = c.find((m) => m.id === d.dataset.materialId), b = v?.paragraphs.find((m) => m.id === d.dataset.paragraphId);
  if (!v || !b) return null;
  const C = t.cloneRange();
  C.selectNodeContents(d), C.setEnd(t.startContainer, t.startOffset);
  const k = C.toString().length, $ = t.toString();
  return !$.trim() || [...$].length > 2e3 || b.text.slice(k, k + $.length) !== $ ? null : {
    materialId: v.id,
    paragraphId: b.id,
    start: k,
    end: k + $.length,
    quote: $
  };
}
function Wt(e, c, s) {
  const t = () => {
    if (!e.value) return;
    const u = Ga(e.value, c(), window.getSelection());
    u && s(u);
  };
  Re(() => document.addEventListener("selectionchange", t)), Me(() => document.removeEventListener("selectionchange", t));
}
var Fa = { class: "learning-source" }, Ha = { key: 0 }, za = ["href"], Ya = {
  key: 0,
  class: "learning-listening-cover"
}, Ka = ["disabled"], Za = {
  key: 1,
  class: "learning-material-body"
}, Ja = ["data-material-id", "data-paragraph-id"], Qa = ["disabled", "onClick"], Xa = {
  class: "learning-audio-parts",
  "aria-label": "材料朗读分段"
}, en = ["disabled", "onClick"], tn = { key: 2 }, an = /* @__PURE__ */ te({
  __name: "MaterialReader",
  props: {
    material: {},
    disabled: { type: Boolean },
    exerciseId: {}
  },
  emits: ["action", "select"],
  setup(e, { emit: c }) {
    const s = e, t = c, u = F(null);
    Wt(u, () => [s.material], (v) => t("select", v));
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
      n("div", Fa, [e.material.provenance.kind === "authored" ? (a(), i("span", Ha, "语伴自编练习")) : (a(), i("a", {
        key: 1,
        href: e.material.provenance.url,
        target: "_blank",
        rel: "noopener noreferrer"
      }, r(e.material.provenance.kind === "original" ? "原文节选" : "改编自") + " · " + r(e.material.provenance.title) + " ↗", 9, za))]),
      e.material.hidden ? (a(), i("div", Ya, [b[1] || (b[1] = n("svg", {
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
        onClick: b[0] || (b[0] = (C) => t("action", "reveal", {
          kind: "transcripts",
          id: e.material.id
        }))
      }, "看文稿", 8, Ka)])) : (a(), i("div", Za, [(a(!0), i(E, null, j(e.material.paragraphs, (C) => (a(), i("div", {
        key: C.id,
        class: "learning-paragraph"
      }, [n("p", {
        tabindex: "0",
        "data-learning-text": "",
        "data-material-id": e.material.id,
        "data-paragraph-id": C.id
      }, r(C.text), 9, Ja), n("button", {
        type: "button",
        disabled: [...C.text].length > l(jt),
        onClick: (k) => d(C)
      }, r(l(qe).select), 9, Qa)]))), 128))])),
      n("div", Xa, [(a(!0), i(E, null, j(e.material.parts, (C) => (a(), i("button", {
        key: C.key,
        type: "button",
        disabled: e.disabled,
        onClick: (k) => t("action", "play", {
          materialId: e.material.id,
          partKey: C.key,
          exerciseId: e.exerciseId
        })
      }, [W(Y, { name: "play" }), H(r(e.material.parts.length > 1 ? `听第 ${C.number} 段` : "播放朗读"), 1)], 8, en))), 128))]),
      e.material.parts.length ? (a(), i("small", tn, "TTS 合成朗读")) : g("", !0)
    ], 512));
  }
}), Rt = an;
function pt(e, c, s = []) {
  const t = (u) => c.kind === "choice" || c.kind === "order" ? c.options.find((d) => d.id === u)?.text ?? u : s.find((d) => d.id === u)?.text ?? u;
  return e.kind === "text" ? e.text : e.kind === "gaps" ? e.values.map((u) => `${c.kind === "gaps" ? c.slots.find((d) => d.id === u.id)?.text ?? "" : ""} ${u.text}`).join(`
`) : e.kind === "match" ? e.pairs.map((u) => c.kind === "match" ? `${c.left.find((d) => d.id === u.left)?.text} → ${c.right.find((d) => d.id === u.right)?.text}` : "").join(`
`) : e.ids.map(t).join(e.kind === "order" ? " → " : `
`);
}
var nn = { class: "learning-feedback" }, ln = { class: "learning-muted" }, sn = { key: 0 }, rn = { key: 1 }, on = { key: 0 }, un = { key: 1 }, dn = { key: 2 }, vn = {
  key: 3,
  class: "learning-muted"
}, cn = ["disabled"], gn = ["disabled"], pn = /* @__PURE__ */ te({
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
    return (s, t) => (a(), i("section", nn, [
      t[6] || (t[6] = n("p", { class: "learning-eyebrow" }, "已保存的原答", -1)),
      n("blockquote", null, r(l(pt)(e.attempt.answer, e.response, e.paragraphs)), 1),
      n("small", ln, [
        H(r(e.attempt.help.feedback ? "得到反馈后的再练" : e.attempt.help.answer || e.attempt.help.hint || e.attempt.help.transcript ? "这次有辅助" : "未使用答案或提示"), 1),
        e.attempt.help.replays ? (a(), i("span", sn, " · 重听 " + r(e.attempt.help.replays) + " 次", 1)) : g("", !0),
        e.attempt.help.slowPlayback ? (a(), i("span", rn, " · 慢放")) : g("", !0)
      ]),
      e.feedback ? (a(), i(E, { key: 0 }, [
        n("h3", null, r(c[e.feedback.verdict]), 1),
        e.feedback.understanding ? (a(), i("p", on, [t[2] || (t[2] = n("b", null, "理解", -1)), H(r(e.feedback.understanding), 1)])) : g("", !0),
        e.feedback.expression ? (a(), i("p", un, [t[3] || (t[3] = n("b", null, "表达", -1)), H(r(e.feedback.expression), 1)])) : g("", !0),
        e.feedback.guidance ? (a(), i("p", dn, [t[4] || (t[4] = n("b", null, "批注", -1)), H(r(e.feedback.guidance), 1)])) : g("", !0),
        e.revised ? (a(), i("small", vn, "这篇已有修改稿，结果以修改稿的批改为准。")) : (a(), i("button", {
          key: 4,
          type: "button",
          disabled: e.disabled,
          onClick: t[0] || (t[0] = (u) => s.$emit("action", "assess", {
            attemptId: e.attempt.id,
            review: !0,
            message: "请重新审视我的原答与题目。也请考虑其他有效表达，不只对照原来的答案键。"
          }))
        }, r(e.feedback.verdict === "disputed" ? "请语伴复核" : "有疑问，请复核"), 9, cn))
      ], 64)) : (a(), i(E, { key: 1 }, [t[5] || (t[5] = n("p", null, "原答已保存，等待语伴评估。", -1)), n("button", {
        type: "button",
        disabled: e.disabled,
        onClick: t[1] || (t[1] = (u) => s.$emit("action", "assess", {
          attemptId: e.attempt.id,
          review: !1,
          message: "请评估这条已经保存的原答。"
        }))
      }, "重试评估", 8, gn)], 64))
    ]));
  }
}), bt = pn, Gt = {
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
}, Q = {
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
  "not-run": "未执行",
  thinking: "正在思考…",
  issues: (e) => `${e} 项内容未通过检查`,
  checkFields: (e) => `需要调整：${e}`,
  results: (e) => `找到 ${e} 个候选网页`,
  extracted: (e) => `取回 ${e} 个网页的文字，待选材`,
  paragraphs: (e) => `读到 ${e} 段文字`,
  entries: (e) => `读到 ${e} 条记录`,
  sourcesFailed: (e) => `${e} 个网页未能用于本次取材`,
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
    LearningExtract: "读取网页",
    LearningProfileEdit: "调整学习目标",
    LearningLessonEdit: "准备练习",
    LearningRequest: "安排练习",
    LearningModelEssay: "准备范文",
    LearningArticle: "整理阅读正文",
    LearningReadingNotes: "整理本段知识",
    LearningEssayTask: "准备写作题",
    LearningAssess: "批改作答",
    LearningPresent: "打开练习",
    LearningReveal: "展示学习帮助",
    LearningSubmit: "保存原答",
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
}, bn = {
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
}, Ft = {
  unassessed: "还没练过",
  review: "待确认",
  independent: "已能独立使用",
  practised: "练过一次",
  strengthen: "再练练"
}, Ht = (e) => `${e} 次作答`, zt = (e) => `${e} 个知识点可以温习了`, ot = {
  settings: "声音设置",
  enable: "开启语音"
}, ee = {
  navigation: "本篇学习",
  reading: "阅读与写作",
  feedback: "批改与修改",
  model: "范文",
  completed: "本篇完成",
  grading: "正在看你的作品…",
  reviewing: "正在复核修改稿…",
  modelling: "正在写范文…",
  grade: "批改已提交的作答",
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
}, Mt = {
  title: "还有内容没提交",
  accept: "放弃并切换"
}, Et = {
  language: Mt,
  teacher: Mt,
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
}, $e = {
  context: "切换后，尚未提交的输入会丢失。已提交的作答和学习记录会保留。",
  companion: "切换语伴会清空尚未发送的聊天内容，当前练习和作答会保留。",
  keepEditing: "继续编辑",
  lesson: "本次练习的材料、作答和笔记会删除；已收入学习本的记录和已获得的奖励会保留。",
  review: "这组已答的题会删除，复习时间安排不变。"
}, ye = {
  answer: "你的作答",
  saved: "已保存，答完这组再一起看看。",
  ready: "这组答完了",
  grade: "批改这组",
  ask: "问语伴",
  retry: "再试一次",
  cancelRetry: "取消重答",
  verdicts: {
    correct: "答对了",
    partial: "对了一部分",
    incorrect: "还没想起来",
    disputed: "等待复核"
  }
}, X = {
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
}, He = {
  title: "替换当前练习？",
  detail: "新内容保存成功后，替换这份课件、作答和笔记。学习本中的记录和已获得的奖励保留。",
  decline: "保留当前练习",
  accept: "替换并继续"
}, mn = {
  key: 0,
  class: "learning-player",
  "aria-label": "课堂朗读"
}, fn = {
  key: 0,
  role: "status"
}, kn = {
  key: 2,
  class: "learning-row"
}, yn = ["aria-label", "disabled"], hn = ["max", "value"], $n = /* @__PURE__ */ te({
  __name: "LearningPlayer",
  props: { state: {} },
  emits: ["action"],
  setup(e, { emit: c }) {
    const s = c;
    function t(u) {
      return `${Math.floor(u / 60)}:${String(Math.floor(u % 60)).padStart(2, "0")}`;
    }
    return (u, d) => e.state.media.status !== "idle" ? (a(), i("section", mn, [
      e.state.media.message ? (a(), i("p", fn, r(e.state.media.message), 1)) : g("", !0),
      e.state.voices.enabled ? g("", !0) : (a(), i("button", {
        key: 1,
        type: "button",
        onClick: d[0] || (d[0] = (v) => s("action", "tts-settings"))
      }, r(l(ot).enable), 1)),
      e.state.media.key ? (a(), i("div", kn, [
        W(Y, { name: "sound" }),
        n("span", null, r(e.state.media.status === "loading" ? "正在生成声音…" : `${t(e.state.media.position)} / ${t(e.state.media.duration)}`), 1),
        e.state.media.status === "playing" ? (a(), i("button", {
          key: 0,
          type: "button",
          "aria-label": "暂停",
          onClick: d[1] || (d[1] = (v) => s("action", "pause"))
        }, [W(Y, { name: "pause" })])) : [
          "paused",
          "ended",
          "blocked"
        ].includes(e.state.media.status) ? (a(), i("button", {
          key: 1,
          type: "button",
          "aria-label": e.state.media.status === "ended" ? "再听一遍" : "继续播放",
          disabled: e.state.busy,
          onClick: d[2] || (d[2] = (v) => s("action", "resume"))
        }, [W(Y, { name: "play" })], 8, yn)) : g("", !0),
        n("button", {
          type: "button",
          "aria-label": "停止",
          onClick: d[3] || (d[3] = (v) => s("action", "stop"))
        }, [W(Y, { name: "stop" })]),
        e.state.media.duration ? (a(), i("button", {
          key: 2,
          type: "button",
          onClick: d[4] || (d[4] = (v) => s("action", "rate", { value: e.state.media.rate === 1 ? 0.75 : 1 }))
        }, r(e.state.media.rate) + "×", 1)) : g("", !0)
      ])) : g("", !0),
      e.state.media.duration ? (a(), i("input", {
        key: 3,
        type: "range",
        min: "0",
        max: e.state.media.duration,
        step: "0.1",
        value: e.state.media.position,
        "aria-label": "当前声音片段播放位置",
        onChange: d[5] || (d[5] = (v) => s("action", "seek", { value: Number(v.target.value) }))
      }, null, 40, hn)) : g("", !0)
    ])) : g("", !0);
  }
}), Yt = $n, wn = { class: "learning-selection" }, xn = { class: "learning-row" }, Cn = ["disabled"], In = /* @__PURE__ */ te({
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
    return (c, s) => (a(), i("div", wn, [n("blockquote", null, r(e.selection.quote), 1), n("div", xn, [
      n("button", {
        type: "button",
        onClick: s[0] || (s[0] = (t) => c.$emit("ask"))
      }, r(l(qe).ask), 1),
      n("button", {
        type: "button",
        disabled: e.disabled || [...e.selection.quote].length > 1e3,
        onClick: s[1] || (s[1] = (t) => c.$emit("say"))
      }, r(l(qe).listen), 9, Cn),
      n("button", {
        type: "button",
        onClick: s[2] || (s[2] = (t) => c.$emit("dismiss"))
      }, r(l(qe).dismiss), 1)
    ])]));
  }
}), Kt = In;
function Ae(e) {
  return {
    picked: [],
    text: "",
    values: {},
    order: e.kind === "order" ? e.options.map((c) => c.id) : []
  };
}
function Tt(e, c) {
  const s = Ae(c);
  return !!e.text.trim() || !!e.picked.length || Object.values(e.values).some((t) => !!t.trim()) || e.order.length !== s.order.length || e.order.some((t, u) => t !== s.order[u]);
}
function Zt(e) {
  return e.stage.exercises.flatMap((c) => {
    const s = e.exercises.find((C) => C.id === c.exerciseId), t = e.attempts.find((C) => C.id === c.revisionAttemptId), u = t && e.assessments.some((C) => C.attemptId === t.id && C.verdict !== "disputed"), d = u ? t : e.attempts.find((C) => C.id === (t?.revisesAttemptId ?? c.draftAttemptId));
    if (!s || s.response.kind !== "text" || !d) return [];
    const v = e.assessments.find((C) => C.attemptId === d.id), b = u ? void 0 : t;
    return [{
      row: c,
      exercise: s,
      draft: d,
      assessment: v,
      revision: b,
      review: b && e.assessments.find((C) => C.attemptId === b.id),
      annotations: v?.annotations ?? []
    }];
  });
}
function Jt(e) {
  const c = (s) => s.trim() || null;
  return {
    exam: c(e.exam),
    level: c(e.level),
    targetLevel: c(e.targetLevel),
    explanationLanguage: e.explanationLanguage,
    interests: c(e.interests)
  };
}
var ze = () => ({
  text: "",
  cursor: void 0,
  focus: null,
  study: null,
  sent: null,
  scroll: 0,
  following: !0
});
function Ln() {
  const e = xe({}), c = xe(ze()), s = xe(ze()), t = xe({
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
    reset(b = !1, C = !1) {
      if (!C) {
        for (const k of Object.keys(e)) delete e[k];
        t.open = !1, t.submitted = null, Object.assign(s, ze());
      }
      Object.assign(c, ze()), u.enabled = !1, b || Object.assign(d, {
        step: 0,
        name: "",
        note: ""
      }), Object.assign(v, {
        tab: "grammar",
        reason: ""
      });
    },
    reconcile(b) {
      const C = t.submitted;
      C && b.storage === "ready" && !b.busy && b.profile && Object.entries(C.value).every(([k, $]) => b.profile.settings[k] === $) && (Object.entries(C.form).every(([k, $]) => t.form[k] === $) && (t.open = !1), t.submitted = null);
      for (const k of Object.keys(e)) {
        const $ = [b.unit, b.review].find((y) => y?.id === k);
        if (!$) {
          delete e[k];
          continue;
        }
        for (const [y, f] of Object.entries(e[k].review.drafts)) {
          const w = $.attempts.filter((o) => o.exerciseId === y).at(-1);
          f.submitted && w && w.id !== f.submitted.before && delete e[k].review.drafts[y];
        }
        for (const [y, f] of Object.entries(e[k].activityDrafts)) {
          const w = $.attempts.filter((o) => o.exerciseId === y).at(-1);
          if (f.submitted && w && w.id !== f.submitted.before) {
            delete e[k].activityDrafts[y];
            const o = e[k].activities[`exercise:${y}`];
            o && (o.retry = !1);
          }
        }
        const m = e[k].selection;
        m && $.materials.find((y) => y.id === m.materialId)?.paragraphs.find((y) => y.id === m.paragraphId)?.text.slice(m.start, m.end) !== m.quote && (e[k].selection = null);
        for (const [y, f] of Object.entries(e[k].writing)) {
          const w = $.attempts.filter((x) => x.exerciseId === y && !x.revisesAttemptId).at(-1), o = f.submitted;
          !o || !w || w.id === o.before || (f.text === o.text && w.answer.kind === "text" && w.answer.text === o.text.trim() ? (f.text = "", f.rewriting = !1) : f.rewriting = !0, f.submitted = null);
        }
      }
      for (const [k, $] of [[c, b.conversation], [s, b.workbenchConversation]]) {
        const m = k.sent;
        m && $.turns.some((y, f) => f + $.removedTurns >= m.after && y.purpose === "talk" && y.user === m.user) && (k.text === m.text && (k.text = "", k.focus = null), k.sent = null);
      }
    }
  };
}
var Qt = /* @__PURE__ */ Symbol("learning-ui-session");
function Xt(e, c) {
  if (e.chat.text.trim() || e.workbenchChat.text.trim() || e.settings.open && Object.entries(Jt(e.settings.form)).some(([s, t]) => c.profile?.settings[s] !== t) || e.setup.step === 1 && e.setup.name.trim() && (e.setup.name.trim() !== c.teacher?.name || e.setup.note.trim() !== c.teacher.note)) return !0;
  for (const s of [c.unit, c.review]) {
    const t = s && e.units[s.id];
    if (!(!s || !t)) {
      if (Object.values(t.writing).some((u) => !!u.text.trim()) || Object.keys(t.edits).length && Zt(s).some((u) => u.row.status === "revising" && u.annotations.some((d) => t.edits[d.id] && t.edits[d.id].value !== d.quote))) return !0;
      for (const u of s.exercises) {
        const d = t.activityDrafts[u.id]?.value, v = t.review.drafts[u.id];
        if (d && Tt(d, u.response) || v && (v.retry || !s.attempts.some((b) => b.exerciseId === u.id)) && Tt(v.value, u.response)) return !0;
      }
    }
  }
  return !1;
}
function Sn(e, c, s, t) {
  return s === "teacher" ? t.teacher?.name !== c.teacher?.name && !!e.chat.text.trim() : s === "language" && t.language !== c.language && Xt(e, c);
}
function An(e) {
  const c = Ln();
  return ca(Qt, c), K([
    () => e.value.chatIdentity,
    () => e.value.language,
    () => e.value.companionSessionId
  ], (s, t) => c.reset(s[0] === t[0], s[0] === t[0] && s[1] === t[1])), K(() => e.value, (s) => c.reconcile(s), { immediate: !0 }), K(() => [e.value.unit?.id, e.value.review?.id], (s) => {
    for (const t of [c.chat, c.workbenchChat])
      t.focus?.unitId && !s.includes(t.focus.unitId) && (t.focus = null), t.study && !s.includes(t.study.unitId) && (t.study = null);
  }), K(() => Xt(c, e.value), (s, t, u) => {
    if (!s) return;
    const d = (v) => {
      v.preventDefault(), v.returnValue = "";
    };
    window.addEventListener("beforeunload", d), u(() => window.removeEventListener("beforeunload", d));
  }, { immediate: !0 }), c;
}
function Ee() {
  const e = ma(Qt);
  if (!e) throw new Error("Learning views require their application session");
  return e;
}
function Te(e) {
  const c = Ee();
  return S(() => c.unit(e()));
}
var Rn = ["onKeydown"], Mn = {
  role: "dialog",
  "aria-labelledby": "learning-activity-title",
  class: "learning-activity"
}, En = { class: "learning-activity-header" }, Tn = { id: "learning-activity-title" }, Nn = {
  key: 0,
  "aria-label": "完成本课的固定奖励"
}, Bn = {
  key: 0,
  class: "learning-margin-note",
  role: "status"
}, On = ["open"], qn = {
  key: 3,
  class: "learning-question"
}, Pn = { class: "learning-help-actions" }, Vn = ["disabled"], _n = ["disabled"], Dn = ["disabled"], Un = {
  key: 0,
  class: "learning-margin-note"
}, jn = {
  key: 1,
  class: "learning-margin-note"
}, Wn = { key: 0 }, Gn = { key: 1 }, Fn = { key: 2 }, Hn = ["disabled"], zn = /* @__PURE__ */ te({
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
    const s = e, t = c, u = F(null), d = Te(() => s.target.unitId), v = S(() => `${s.target.kind}:${s.target.id}`);
    K([d, v], () => {
      d.value.activities[v.value] ??= {
        scroll: 0,
        selected: null,
        retry: !1,
        materialsOpen: !1
      };
    }, { immediate: !0 });
    const b = S(() => d.value.activities[v.value]), C = F(null), k = S({
      get: () => b.value.retry,
      set: (A) => {
        b.value.retry = A;
      }
    }), $ = S({
      get: () => b.value.selected,
      set: (A) => {
        b.value.selected = A;
      }
    }), m = F(null);
    function y() {
      $.value ? $.value = null : k.value ? k.value = !1 : t("close");
    }
    vt(m, y);
    const f = S(() => d.value.activityDrafts);
    let w = null;
    const o = S(() => s.target?.kind === "exercise" ? s.state.unit?.exercises.find((A) => A.id === s.target?.id) : void 0), x = S(() => s.state.unit?.materials.filter((A) => s.target?.kind === "material" ? A.id === s.target.id : o.value?.materialIds.includes(A.id)) ?? []), N = S(() => o.value?.id ?? s.state.unit?.exercises.find((A) => A.skill === "listening" && A.materialIds.includes(s.target?.id ?? ""))?.id ?? s.state.unit?.exercises.find((A) => A.materialIds.includes(s.target?.id ?? ""))?.id), U = S(() => x.value.filter((A) => o.value?.response.kind !== "evidence" || A.id === o.value.response.materialId).flatMap((A) => A.paragraphs)), T = S(() => s.state.unit?.attempts.filter((A) => A.exerciseId === o.value?.id).at(-1)), J = S(() => s.state.unit?.assessments.find((A) => A.attemptId === T.value?.id));
    K(() => o.value, (A) => {
      if (!A) return;
      const I = JSON.stringify(A.response);
      f.value[A.id]?.response !== I && (f.value[A.id] = {
        response: I,
        value: Ae(A.response)
      });
    }, { immediate: !0 });
    const z = S({
      get: () => f.value[o.value.id].value,
      set: (A) => {
        f.value[o.value.id].value = A;
      }
    });
    Re(() => {
      C.value?.focus({ preventScroll: !0 }), u.value && (u.value.scrollTop = b.value.scroll);
    }), Me(() => {
      u.value && (b.value.scroll = u.value.scrollTop);
    }), K(() => s.state.unit?.attempts, (A) => {
      if (!w) return;
      const I = A?.filter((q) => q.exerciseId === w.id).at(-1);
      if (I && I.id !== w.before) {
        const q = s.target?.kind === "exercise" && s.target.id === w.id;
        delete f.value[w.id], w = null, q && t("close");
      }
    });
    function M(A) {
      w = {
        id: o.value.id,
        before: T.value?.id
      }, f.value[o.value.id].submitted = { before: T.value?.id }, t("action", "submit", {
        unitId: s.state.unit.id,
        exerciseId: o.value.id,
        answer: A
      });
    }
    return (A, I) => (a(), i("div", {
      ref_key: "layer",
      ref: m,
      class: "learning-activity-shade",
      onKeydown: Se(oe(y, ["stop", "prevent"]), ["esc"])
    }, [n("section", Mn, [
      n("header", En, [
        n("h2", Tn, r(o.value ? "练习" : x.value[0]?.title ?? "材料"), 1),
        e.state.unit ? (a(), i("small", Nn, "+" + r(e.state.unit.reward.amount) + " 币", 1)) : g("", !0),
        n("button", {
          ref_key: "closeButton",
          ref: C,
          type: "button",
          "aria-label": "收起课件",
          onClick: I[0] || (I[0] = (q) => t("close"))
        }, [I[18] || (I[18] = H("收起", -1)), W(Y, { name: "back" })], 512)
      ]),
      e.state.message && !e.state.busy ? (a(), i("p", Bn, r(e.state.message), 1)) : g("", !0),
      n("div", {
        ref_key: "body",
        ref: u,
        class: "learning-activity-body"
      }, [
        o.value && x.value.length ? (a(), i("details", {
          key: 0,
          class: "learning-activity-materials",
          open: b.value.materialsOpen,
          onToggle: I[3] || (I[3] = (q) => b.value.materialsOpen = q.target.open)
        }, [n("summary", null, "阅读材料 · " + r(x.value.length), 1), (a(!0), i(E, null, j(x.value, (q) => (a(), Z(Rt, {
          key: q.id,
          material: q,
          "exercise-id": N.value,
          disabled: e.disabled,
          onAction: I[1] || (I[1] = (G, B) => t("action", G, B)),
          onSelect: I[2] || (I[2] = (G) => $.value = G)
        }, null, 8, [
          "material",
          "exercise-id",
          "disabled"
        ]))), 128))], 40, On)) : o.value ? g("", !0) : (a(!0), i(E, { key: 1 }, j(x.value, (q) => (a(), Z(Rt, {
          key: q.id,
          material: q,
          "exercise-id": N.value,
          disabled: e.disabled,
          onAction: I[4] || (I[4] = (G, B) => t("action", G, B)),
          onSelect: I[5] || (I[5] = (G) => $.value = G)
        }, null, 8, [
          "material",
          "exercise-id",
          "disabled"
        ]))), 128)),
        $.value ? (a(), Z(Kt, {
          key: 2,
          selection: $.value,
          disabled: e.disabled,
          onAsk: I[6] || (I[6] = (q) => t("ask", N.value, $.value)),
          onSay: I[7] || (I[7] = (q) => t("action", "say", { selection: $.value })),
          onDismiss: I[8] || (I[8] = (q) => $.value = null)
        }, null, 8, ["selection", "disabled"])) : g("", !0),
        o.value ? (a(), i("section", qn, [
          n("h2", null, r(o.value.prompt), 1),
          n("div", Pn, [
            n("button", {
              type: "button",
              disabled: e.disabled || [...o.value.prompt].length > 1e3,
              onClick: I[9] || (I[9] = (q) => t("action", "say-question", { exerciseId: o.value.id }))
            }, "听题干", 8, Vn),
            o.value.hasHint ? (a(), i("button", {
              key: 0,
              type: "button",
              disabled: e.disabled || o.value.hint !== null,
              onClick: I[10] || (I[10] = (q) => t("action", "reveal", {
                kind: "hints",
                id: o.value.id
              }))
            }, "提示", 8, _n)) : g("", !0),
            n("button", {
              type: "button",
              disabled: e.disabled || o.value.solution !== null,
              onClick: I[11] || (I[11] = (q) => t("action", "reveal", {
                kind: "answers",
                id: o.value.id
              }))
            }, "解答", 8, Dn),
            n("button", {
              type: "button",
              onClick: I[12] || (I[12] = (q) => t("ask", o.value.id))
            }, "问语伴")
          ]),
          o.value.hint ? (a(), i("p", Un, r(o.value.hint), 1)) : g("", !0),
          o.value.solution ? (a(), i("div", jn, [o.value.solution.kind === "exact" ? (a(), i("p", Wn, r(l(pt)(o.value.solution.answer, o.value.response, U.value)), 1)) : o.value.solution.kind === "gaps" ? (a(), i("p", Gn, r(o.value.solution.accepted.map((q) => q.forms.join(" / ")).join(`
`)), 1)) : g("", !0), o.value.solution.kind !== "semantic" ? (a(), i("p", Fn, r(o.value.solution.explanation), 1)) : (a(), i("button", {
            key: 3,
            type: "button",
            onClick: I[13] || (I[13] = (q) => t("ask", o.value.id))
          }, "请语伴讲解"))])) : g("", !0),
          (!T.value || k.value) && f.value[o.value.id] ? (a(), Z(gt, {
            key: o.value.id,
            modelValue: z.value,
            "onUpdate:modelValue": I[14] || (I[14] = (q) => z.value = q),
            response: o.value.response,
            paragraphs: U.value,
            disabled: e.disabled,
            onSubmit: M
          }, null, 8, [
            "modelValue",
            "response",
            "paragraphs",
            "disabled"
          ])) : g("", !0),
          T.value ? (a(), Z(bt, {
            key: 3,
            attempt: T.value,
            feedback: J.value,
            response: o.value.response,
            paragraphs: U.value,
            disabled: e.disabled,
            revised: !!e.state.unit?.attempts.some((q) => q.revisesAttemptId === T.value?.id),
            onAction: I[15] || (I[15] = (q, G) => {
              t("action", q, G), t("close");
            })
          }, null, 8, [
            "attempt",
            "feedback",
            "response",
            "paragraphs",
            "disabled",
            "revised"
          ])) : g("", !0),
          T.value ? (a(), i("button", {
            key: 4,
            type: "button",
            disabled: e.disabled,
            onClick: I[16] || (I[16] = (q) => {
              k.value = !k.value, f.value[o.value.id] ??= {
                response: JSON.stringify(o.value.response),
                value: l(Ae)(o.value.response)
              };
            })
          }, r(k.value ? "收起再练" : "再试一次"), 9, Hn)) : g("", !0)
        ])) : g("", !0)
      ], 512),
      W(Yt, {
        state: e.state,
        onAction: I[17] || (I[17] = (q, G) => t("action", q, G))
      }, null, 8, ["state"])
    ])], 40, Rn));
  }
}), Yn = zn, Kn = {
  role: "alertdialog",
  "aria-labelledby": "learning-approval-title",
  "aria-describedby": "learning-approval-detail",
  class: "learning-confirm"
}, Zn = { id: "learning-approval-title" }, Jn = { id: "learning-approval-detail" }, Qn = { class: "learning-row" }, Xn = ["disabled"], ei = ["disabled"], ti = /* @__PURE__ */ te({
  __name: "LearningApproval",
  props: {
    approval: {},
    pending: { type: Boolean }
  },
  emits: ["action"],
  setup(e, { emit: c }) {
    const s = e, t = c, u = F(null), d = (v) => t("action", "approve-operation", {
      id: s.approval.id,
      approved: v
    });
    return vt(u, () => d(!1)), (v, b) => (a(), i("div", {
      ref_key: "layer",
      ref: u,
      class: "learning-confirm-shade",
      onKeydown: b[2] || (b[2] = Se(oe((C) => d(!1), ["stop", "prevent"]), ["esc"]))
    }, [n("section", Kn, [
      n("h2", Zn, r(l(He).title), 1),
      n("p", null, r(e.approval.title), 1),
      n("p", Jn, r(l(He).detail), 1),
      n("div", Qn, [n("button", {
        autofocus: "",
        type: "button",
        disabled: e.pending,
        onClick: b[0] || (b[0] = (C) => d(!1))
      }, r(l(He).decline), 9, Xn), n("button", {
        type: "button",
        class: "learning-primary",
        disabled: e.pending,
        onClick: b[1] || (b[1] = (C) => d(!0))
      }, r(l(He).accept), 9, ei)])
    ])], 544));
  }
}), ai = ti;
function ni(e, c) {
  return /^(zh|ja|ko)\b/iu.test(c) ? {
    count: [...e.replace(/[\s\p{P}\p{S}]/gu, "")].length,
    unit: "characters"
  } : {
    count: e.match(/[\p{L}\p{N}][\p{L}\p{N}\p{M}'’-]*/gu)?.length ?? 0,
    unit: "words"
  };
}
var ii = 864e5;
function Nt(e, c) {
  const s = ni(e, c);
  return {
    count: s.count,
    unit: s.unit === "characters" ? "字" : "词"
  };
}
function ea(e, c) {
  const s = [], t = /* @__PURE__ */ new Map();
  for (const u of c)
    if (u.quote)
      for (let d = e.indexOf(u.quote); d >= 0; d = e.indexOf(u.quote, d + 1)) {
        const v = d + u.quote.length;
        if (!s.some(([b, C]) => d < C && b < v)) {
          s.push([d, v]), t.set(u.id, d);
          break;
        }
      }
  return t;
}
function li(e, c) {
  const s = e.split(/(\r?\n)/u), t = [];
  s.forEach((k, $) => {
    $ % 2 === 0 && k.trim() && t.push($);
  });
  const u = [], d = [], v = /* @__PURE__ */ new Map();
  for (const k of c) v.set(k.paragraphIndex, [...v.get(k.paragraphIndex) ?? [], k]);
  for (const [k, $] of v) {
    const m = t[k];
    if (m === void 0) {
      u.push(...$.map((o) => o.id));
      continue;
    }
    const y = ea(s[m], $), f = $.filter((o) => y.has(o.id)).sort((o, x) => y.get(x.id) - y.get(o.id));
    let w = s[m];
    for (const o of f) {
      const x = y.get(o.id);
      w = w.slice(0, x) + o.replacement + w.slice(x + o.quote.length), o.replacement !== o.quote && d.push(o.id);
    }
    s[m] = w, u.push(...$.filter((o) => !y.has(o.id)).map((o) => o.id));
  }
  const b = new Map(c.map((k, $) => [k.id, $])), C = (k, $) => b.get(k) - b.get($);
  return {
    text: s.join(""),
    missing: u.sort(C),
    applied: d.sort(C)
  };
}
function si(e, c) {
  const s = ea(e, c), t = c.filter((v) => s.has(v.id)).map((v) => ({
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
function ri(e, c = "xiaobai-learning-seen-units") {
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
var oi = () => {
  try {
    return globalThis.localStorage;
  } catch {
    return null;
  }
}, Bt = ri(oi);
function mt(e, c = Date.now()) {
  const s = new Date(e), t = new Date(c), u = Math.round((Date.UTC(s.getFullYear(), s.getMonth(), s.getDate()) - Date.UTC(t.getFullYear(), t.getMonth(), t.getDate())) / ii);
  return !Number.isFinite(u) || u <= 0 ? "今天复习" : u === 1 ? "明天再见" : `${u} 天后再见`;
}
var ui = { class: "learning-records-page" }, di = {
  key: 0,
  class: "learning-page-heading"
}, vi = {
  key: 0,
  class: "learning-muted"
}, ci = { class: "learning-muted" }, gi = {
  key: 0,
  class: "learning-muted"
}, pi = ["disabled", "onClick"], bi = ["disabled"], mi = {
  key: 0,
  class: "learning-empty-note"
}, fi = ["disabled", "onClick"], ki = ["title"], yi = {
  key: 1,
  class: "learning-row"
}, hi = ["disabled"], $i = { class: "learning-muted" }, wi = ["disabled"], xi = /* @__PURE__ */ te({
  __name: "LearningRecords",
  props: {
    state: {},
    disabled: { type: Boolean },
    embedded: { type: Boolean }
  },
  emits: ["action", "remove"],
  setup(e, { emit: c }) {
    const s = e, t = c;
    Ke(() => s.state.record ? (t("action", "records", { offset: s.state.records.offset }), !0) : !1);
    const u = {
      deleteAnswer: "删除这次作答",
      deleteRecord: "删除记录",
      answerWarning: "这次作答和对应的反馈会删除，相关知识点的掌握情况会更新。已到账奖励保留。",
      recordWarning: "这条学习记录会删除，仅属于它的历史作答也会删除。当前练习不受影响。",
      hidden: "听力原文暂未显示，下面是你的作答和点评。"
    };
    return (d, v) => (a(), i("section", ui, [!e.embedded || e.state.record ? (a(), i("div", di, [v[5] || (v[5] = n("h1", null, "学习记录", -1)), e.state.records.total ? (a(), i("span", vi, r(e.state.records.total) + " 项", 1)) : g("", !0)])) : g("", !0), e.state.record ? (a(), i(E, { key: 1 }, [
      n("button", {
        type: "button",
        onClick: v[0] || (v[0] = (b) => d.$emit("action", "records", { offset: e.state.records.offset }))
      }, "‹ 返回记录"),
      n("h2", null, r(e.state.record.label), 1),
      (a(!0), i(E, null, j(e.state.record.evidence, (b) => (a(), i("article", {
        key: b.attempt.id,
        class: "learning-record-evidence"
      }, [
        n("p", ci, r(new Date(b.attempt.submittedAt).toLocaleDateString()), 1),
        n("h3", null, r(b.exercise.prompt), 1),
        (a(!0), i(E, null, j(b.materials, (C) => (a(), i("details", { key: C.id }, [n("summary", null, r(C.title), 1), C.hidden ? (a(), i("p", gi, r(u.hidden), 1)) : (a(!0), i(E, { key: 1 }, j(C.paragraphs, (k) => (a(), i("p", { key: k.id }, r(k.text), 1))), 128))]))), 128)),
        W(bt, {
          attempt: b.attempt,
          feedback: b.assessment,
          response: b.exercise.response,
          paragraphs: b.materials.flatMap((C) => C.paragraphs),
          disabled: e.disabled,
          revised: !!e.state.unit?.attempts.some((C) => C.revisesAttemptId === b.attempt.id),
          onAction: v[1] || (v[1] = (C, k) => d.$emit("action", C, k))
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
          onClick: (C) => d.$emit("remove", "delete-attempt", { id: b.attempt.id }, u.answerWarning)
        }, r(u.deleteAnswer), 9, pi)
      ]))), 128)),
      n("button", {
        type: "button",
        disabled: e.disabled,
        onClick: v[2] || (v[2] = (b) => d.$emit("remove", "delete-item", { id: e.state.record.id }, u.recordWarning))
      }, r(u.deleteRecord), 9, bi)
    ], 64)) : (a(), i(E, { key: 2 }, [
      e.state.records.total ? g("", !0) : (a(), i("p", mi, "暂无学习记录")),
      (a(!0), i(E, null, j(e.state.records.items, (b) => (a(), i("button", {
        key: b.id,
        class: "learning-record-row",
        type: "button",
        disabled: !b.readable,
        onClick: (C) => d.$emit("action", "records", {
          id: b.id,
          offset: e.state.records.offset
        })
      }, [n("span", null, [n("strong", null, r(b.label), 1), n("small", null, [H(r(l(Ht)(b.evidenceCount)), 1), b.nextReviewAt ? (a(), i("span", {
        key: 0,
        title: b.scheduleReason ?? void 0
      }, " · " + r(l(mt)(b.nextReviewAt)) + "（" + r(new Date(b.nextReviewAt).toLocaleDateString()) + "）", 9, ki)) : g("", !0)])]), n("em", null, r(l(Ft)[b.state]), 1)], 8, fi))), 128)),
      e.state.records.total > 30 ? (a(), i("div", yi, [
        n("button", {
          type: "button",
          disabled: e.state.records.offset === 0,
          onClick: v[3] || (v[3] = (b) => d.$emit("action", "records", { offset: Math.max(0, e.state.records.offset - 30) }))
        }, "上一页", 8, hi),
        n("span", $i, r(e.state.records.total) + " 项", 1),
        n("button", {
          type: "button",
          disabled: e.state.records.offset + 30 >= e.state.records.total,
          onClick: v[4] || (v[4] = (b) => d.$emit("action", "records", { offset: e.state.records.offset + 30 }))
        }, "下一页", 8, wi)
      ])) : g("", !0)
    ], 64))]));
  }
}), Ot = xi, Ci = { class: "learning-books-page" }, Ii = { class: "learning-page-heading" }, Li = {
  key: 0,
  class: "learning-due"
}, Si = { key: 0 }, Ai = { key: 1 }, Ri = ["disabled"], Mi = {
  class: "learning-tabs",
  role: "tablist",
  "aria-label": "学习记录视图"
}, Ei = ["aria-selected", "onClick"], Ti = {
  key: 0,
  class: "learning-empty-note"
}, Ni = { class: "learning-book-list" }, Bi = ["disabled", "onClick"], Oi = ["aria-expanded", "onClick"], qi = {
  key: 1,
  class: "learning-chip-reason"
}, Pi = {
  key: 2,
  class: "learning-growth"
}, Vi = {
  key: 0,
  class: "learning-empty-note"
}, _i = { class: "learning-muted" }, Di = { key: 0 }, Ui = { key: 0 }, ji = { key: 1 }, Wi = { key: 2 }, Gi = /* @__PURE__ */ te({
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
    const s = e, t = c, u = Ee().books, d = ke(u, "tab"), v = [
      ["grammar", "语法本"],
      ["vocabulary", "生词本"],
      ["growth", "成长"],
      ["all", "全部记录"]
    ], b = { title: "学习本" }, C = ke(u, "reason"), k = S(() => d.value === "grammar" || d.value === "vocabulary" ? s.state.books[d.value] : []), $ = S(() => s.state.growth), m = S(() => !!s.state.review && s.state.review.stage.stage !== "complete");
    return (y, f) => (a(), i("section", Ci, [e.state.record ? (a(), Z(Ot, {
      key: 0,
      state: e.state,
      disabled: e.disabled,
      onAction: f[0] || (f[0] = (w, o) => t("action", w, o)),
      onRemove: f[1] || (f[1] = (w, o, x) => t("remove", w, o, x))
    }, null, 8, ["state", "disabled"])) : (a(), i(E, { key: 1 }, [
      n("div", Ii, [n("h1", null, r(b.title), 1)]),
      e.state.dueCount || m.value ? (a(), i("div", Li, [e.state.dueCount ? (a(), i("span", Si, r(l(zt)(e.state.dueCount)), 1)) : g("", !0), e.state.blockedReview ? (a(), i("small", Ai, "有一组复习在另一个故事中进行，回到学习页可以放下它")) : m.value ? (a(), i("button", {
        key: 3,
        type: "button",
        class: "learning-primary",
        onClick: f[3] || (f[3] = (w) => t("review"))
      }, r(l(ee).resumeReview), 1)) : (a(), i("button", {
        key: 2,
        type: "button",
        class: "learning-primary",
        disabled: e.disabled,
        onClick: f[2] || (f[2] = (w) => t("action", "start-review"))
      }, r(l(ee).review), 9, Ri))])) : g("", !0),
      n("div", Mi, [(a(), i(E, null, j(v, ([w, o]) => n("button", {
        key: w,
        type: "button",
        role: "tab",
        "aria-selected": d.value === w,
        onClick: (x) => {
          d.value = w, C.value = "";
        }
      }, r(o), 9, Ei)), 64))]),
      d.value === "grammar" || d.value === "vocabulary" ? (a(), i(E, { key: 1 }, [k.value.length ? g("", !0) : (a(), i("p", Ti, r(d.value === "grammar" ? "批改里出现的语法问题会记到这里。" : "批改里的词汇问题、读文章时收藏的词语会记到这里。"), 1)), n("ul", Ni, [(a(!0), i(E, null, j(k.value, (w) => (a(), i("li", { key: w.id }, [
        n("button", {
          type: "button",
          class: "learning-book-item",
          disabled: !w.readable,
          onClick: (o) => t("action", "records", {
            id: w.id,
            offset: e.state.records.offset
          })
        }, [n("strong", null, r(w.label), 1), n("small", null, r(l(Ft)[w.state]) + " · " + r(l(Ht)(w.evidenceCount)), 1)], 8, Bi),
        w.nextReviewAt ? (a(), i("button", {
          key: 0,
          type: "button",
          class: "learning-chip",
          "aria-expanded": C.value === w.id,
          onClick: (o) => C.value = C.value === w.id ? "" : w.id
        }, r(l(mt)(w.nextReviewAt)), 9, Oi)) : g("", !0),
        C.value === w.id ? (a(), i("small", qi, r(w.scheduleReason), 1)) : g("", !0)
      ]))), 128))])], 64)) : d.value === "growth" ? (a(), i("section", Pi, [$.value.enough ? (a(), i(E, { key: 1 }, [
        n("p", _i, [H("来自 " + r($.value.evidence) + " 份作答", 1), $.value.completed ? (a(), i("span", Di, "、" + r($.value.completed) + " 次完成", 1)) : g("", !0)]),
        $.value.steady.length ? (a(), i("div", Ui, [f[6] || (f[6] = n("h2", null, "已经稳定", -1)), n("p", null, r($.value.steady.join("、")), 1)])) : g("", !0),
        $.value.practising.length ? (a(), i("div", ji, [f[7] || (f[7] = n("h2", null, "最近独立做对", -1)), n("p", null, r($.value.practising.join("、")), 1)])) : g("", !0),
        $.value.struggling.length ? (a(), i("div", Wi, [f[8] || (f[8] = n("h2", null, "还要再练", -1)), n("p", null, r($.value.struggling.join("、")), 1)])) : g("", !0)
      ], 64)) : (a(), i("p", Vi, "还需要几次练习才看得出"))])) : (a(), Z(Ot, {
        key: 3,
        embedded: "",
        state: e.state,
        disabled: e.disabled,
        onAction: f[4] || (f[4] = (w, o) => t("action", w, o)),
        onRemove: f[5] || (f[5] = (w, o, x) => t("remove", w, o, x))
      }, null, 8, ["state", "disabled"]))
    ], 64))]));
  }
}), Fi = Gi, Hi = {
  class: "learning-settings-card",
  "aria-label": "训练设置"
}, zi = { key: 0 }, Yi = ["disabled"], Ki = ["open"], Zi = ["value"], Ji = { class: "learning-row" }, Qi = ["disabled"], Xi = /* @__PURE__ */ te({
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
    ], d = S(() => s.state.profile?.settings ?? null), v = Ee().settings, b = v.form, C = ke(v, "open");
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
    const $ = (w) => u.find(([o]) => o === w)?.[1] ?? new Intl.DisplayNames(["zh-CN"], { type: "language" }).of(w) ?? w, m = S(() => [.../* @__PURE__ */ new Set([...u.map(([w]) => w), d.value?.explanationLanguage ?? "zh-CN"])]), y = S(() => [
      ["考试", d.value?.exam || "不备考"],
      ["水平", d.value?.level || "不确定"],
      ["目标", d.value?.targetLevel || "比现在高一级"],
      ["讲解", $(d.value?.explanationLanguage ?? "zh-CN")],
      ["兴趣", d.value?.interests || "不限"]
    ]);
    function f() {
      const w = Jt(b);
      v.submitted = {
        value: w,
        form: { ...b }
      }, t("action", "settings", { value: w });
    }
    return (w, o) => (a(), i("section", Hi, [C.value ? g("", !0) : (a(), i("dl", zi, [(a(!0), i(E, null, j(y.value, ([x, N]) => (a(), i("div", { key: x }, [n("dt", null, r(x), 1), n("dd", null, r(N), 1)]))), 128))])), C.value ? (a(), i("form", {
      key: 2,
      class: "learning-fields",
      onSubmit: oe(f, ["prevent"])
    }, [
      n("label", null, [o[7] || (o[7] = H("考试", -1)), ne(n("input", {
        "onUpdate:modelValue": o[1] || (o[1] = (x) => l(b).exam = x),
        type: "text",
        maxlength: "80",
        placeholder: "不备考（例如 雅思、JLPT N2）"
      }, null, 512), [[ve, l(b).exam]])]),
      n("label", null, [o[8] || (o[8] = H("现在的水平", -1)), ne(n("input", {
        "onUpdate:modelValue": o[2] || (o[2] = (x) => l(b).level = x),
        type: "text",
        maxlength: "80",
        placeholder: "不确定"
      }, null, 512), [[ve, l(b).level]])]),
      n("label", null, [o[9] || (o[9] = H("目标", -1)), ne(n("input", {
        "onUpdate:modelValue": o[3] || (o[3] = (x) => l(b).targetLevel = x),
        type: "text",
        maxlength: "80",
        placeholder: "比现在高一级"
      }, null, 512), [[ve, l(b).targetLevel]])]),
      n("details", {
        class: "learning-settings-optional",
        open: !e.onboarding
      }, [
        n("summary", null, r(l(ee).optionalSettings), 1),
        n("label", null, [o[10] || (o[10] = H("讲解语言", -1)), ne(n("select", { "onUpdate:modelValue": o[4] || (o[4] = (x) => l(b).explanationLanguage = x) }, [(a(!0), i(E, null, j(m.value, (x) => (a(), i("option", {
          key: x,
          value: x
        }, r($(x)), 9, Zi))), 128))], 512), [[Ye, l(b).explanationLanguage]])]),
        n("label", null, [o[11] || (o[11] = H("感兴趣的话题", -1)), ne(n("input", {
          "onUpdate:modelValue": o[5] || (o[5] = (x) => l(b).interests = x),
          type: "text",
          maxlength: "200",
          placeholder: "不限"
        }, null, 512), [[ve, l(b).interests]])])
      ], 8, Ki),
      n("div", Ji, [e.onboarding ? g("", !0) : (a(), i("button", {
        key: 0,
        type: "button",
        onClick: o[6] || (o[6] = (x) => {
          C.value = !1, l(v).submitted = null;
        })
      }, "取消")), n("button", {
        type: "submit",
        class: "learning-primary",
        disabled: e.disabled
      }, r(e.onboarding ? l(ee).setupFinish : l(ee).saveSettings), 9, Qi)])
    ], 32)) : (a(), i("button", {
      key: 1,
      type: "button",
      disabled: e.disabled,
      onClick: o[0] || (o[0] = (x) => {
        k(), C.value = !0;
      })
    }, "调整", 8, Yi))]));
  }
}), ta = Xi, el = { class: "learning-profile-page" }, tl = { class: "learning-setup-heading" }, al = { class: "learning-eyebrow" }, nl = { class: "learning-language-options" }, il = [
  "disabled",
  "aria-pressed",
  "onClick"
], ll = { "aria-hidden": "true" }, sl = ["disabled"], rl = {
  key: 0,
  class: "learning-setup-empty"
}, ol = { class: "learning-teacher-options" }, ul = [
  "disabled",
  "aria-pressed",
  "onClick"
], dl = { class: "learning-person-initial" }, vl = {
  key: 1,
  class: "learning-selected-teacher"
}, cl = { class: "learning-person-initial" }, gl = { key: 0 }, pl = ["open"], bl = ["disabled"], ml = ["disabled"], fl = ["disabled"], kl = { class: "learning-setup-actions" }, yl = ["disabled"], hl = ["disabled"], $l = /* @__PURE__ */ te({
  __name: "LearningSetup",
  props: {
    state: {},
    disabled: { type: Boolean }
  },
  emits: ["action"],
  setup(e, { emit: c }) {
    const s = c, t = Ee().setup, u = ke(t, "step"), d = F(null), v = ke(t, "name"), b = ke(t, "note"), C = [
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
    async function k($) {
      u.value = $, await re(), d.value?.focus();
    }
    return Ke(() => u.value ? (k(u.value - 1), !0) : !1), ($, m) => (a(), i("section", el, [n("div", tl, [n("p", al, r(u.value + 1) + " / " + r(l(ee).setupSteps), 1), n("h1", {
      ref_key: "heading",
      ref: d,
      tabindex: "-1"
    }, r(u.value === 0 ? "选择要学习的语言" : u.value === 1 ? "选择语伴" : l(ee).setupTitle), 513)]), u.value === 0 ? (a(), i(E, { key: 0 }, [n("div", nl, [(a(), i(E, null, j(C, ([y, f, w]) => n("button", {
      key: y,
      type: "button",
      disabled: e.disabled,
      "aria-pressed": e.state.language === y,
      onClick: (o) => s("action", "language", { language: y })
    }, [
      n("span", ll, r(w), 1),
      n("strong", null, r(f), 1),
      e.state.language === y ? (a(), Z(Y, {
        key: 0,
        name: "check"
      })) : g("", !0)
    ], 8, il)), 64))]), n("button", {
      type: "button",
      class: "learning-primary learning-setup-next",
      disabled: e.disabled,
      onClick: m[0] || (m[0] = (y) => k(1))
    }, [m[7] || (m[7] = H("继续", -1)), W(Y, { name: "arrow" })], 8, sl)], 64)) : u.value === 1 ? (a(), i(E, { key: 1 }, [
      e.state.candidates.length ? g("", !0) : (a(), i("p", rl, "当前故事里还没有认识的人物，所以没有可选的语伴。可以在下面手动填一位：名字加一句身份说明。")),
      n("div", ol, [(a(!0), i(E, null, j(e.state.candidates, (y) => (a(), i("button", {
        key: y.name,
        type: "button",
        disabled: e.disabled,
        "aria-pressed": e.state.teacher?.name === y.name,
        onClick: (f) => s("action", "teacher", { teacher: {
          name: y.name,
          note: ""
        } })
      }, [
        n("span", dl, r([...y.name][0]), 1),
        n("strong", null, r(y.name), 1),
        e.state.teacher?.name === y.name ? (a(), Z(Y, {
          key: 0,
          name: "check"
        })) : g("", !0)
      ], 8, ul))), 128))]),
      e.state.teacher && !e.state.candidates.some((y) => y.name === e.state.teacher?.name) ? (a(), i("p", vl, [
        n("span", cl, r([...e.state.teacher.name][0]), 1),
        n("span", null, [H(r(e.state.teacher.name), 1), e.state.teacher.note ? (a(), i("small", gl, r(e.state.teacher.note), 1)) : g("", !0)]),
        W(Y, { name: "check" })
      ])) : g("", !0),
      n("details", {
        class: "learning-other-teacher",
        open: !e.state.candidates.length
      }, [n("summary", null, r(e.state.candidates.length ? "手动填写其他人物" : "手动填写"), 1), n("form", {
        class: "learning-fields",
        onSubmit: m[3] || (m[3] = oe((y) => s("action", "teacher", { teacher: {
          name: v.value.trim(),
          note: b.value.trim()
        } }), ["prevent"]))
      }, [
        n("label", null, [m[8] || (m[8] = H("名字", -1)), ne(n("input", {
          "onUpdate:modelValue": m[1] || (m[1] = (y) => v.value = y),
          type: "text",
          maxlength: "80",
          placeholder: "例如 林老师",
          disabled: e.disabled
        }, null, 8, bl), [[ve, v.value]])]),
        n("label", null, [m[9] || (m[9] = H("一句身份说明", -1)), ne(n("input", {
          "onUpdate:modelValue": m[2] || (m[2] = (y) => b.value = y),
          type: "text",
          maxlength: "200",
          placeholder: "例如 在东京长大的邻居，说话直爽",
          disabled: e.disabled
        }, null, 8, ml), [[ve, b.value]])]),
        n("button", {
          type: "submit",
          disabled: e.disabled || !v.value.trim()
        }, "选这位", 8, fl)
      ], 32)], 8, pl),
      n("div", kl, [n("button", {
        type: "button",
        disabled: e.disabled,
        onClick: m[4] || (m[4] = (y) => k(0))
      }, "上一步", 8, yl), n("button", {
        type: "button",
        class: "learning-primary",
        disabled: e.disabled,
        onClick: m[5] || (m[5] = (y) => k(2))
      }, [H(r(e.state.teacher ? l(ee).setupContinue : l(X).skipCompanion), 1), W(Y, { name: "arrow" })], 8, hl)])
    ], 64)) : (a(), Z(ta, {
      key: 2,
      onboarding: "",
      state: e.state,
      disabled: e.disabled,
      onAction: m[6] || (m[6] = (y, f) => s("action", y, f ?? {}))
    }, null, 8, ["state", "disabled"]))]));
  }
}), wl = $l, xl = { class: "learning-companion-control" }, Cl = {
  key: 0,
  class: "learning-sr-only"
}, Il = { class: "learning-companion-options" }, Ll = { class: "learning-companion-switch" }, Sl = ["aria-label"], Al = { class: "learning-cost-note" }, Rl = /* @__PURE__ */ te({
  __name: "LearningCompanionControl",
  props: { name: {} },
  setup(e) {
    const c = ke(Ee().companion, "enabled"), s = {
      title: "陪读",
      on: "陪你学习中",
      off: "未开启",
      description: "开启后，你安静阅读时语伴会偶尔搭句话",
      costTitle: "费用说明",
      cost: "陪读消息和聊天一样，按你所用的 AI 服务计费。"
    };
    return (t, u) => (a(), i("details", xl, [n("summary", null, [
      n("span", {
        class: se(["learning-companion-light", { "is-on": c.value }]),
        "aria-hidden": "true"
      }, null, 2),
      H(r(c.value ? e.name ? `${e.name} · ${s.on}` : s.on : s.title), 1),
      c.value ? g("", !0) : (a(), i("span", Cl, r(s.off), 1))
    ]), n("div", Il, [n("label", Ll, [n("span", null, r(s.description), 1), ne(n("input", {
      "onUpdate:modelValue": u[0] || (u[0] = (d) => c.value = d),
      type: "checkbox",
      role: "switch",
      "aria-label": s.title
    }, null, 8, Sl), [[ba, c.value]])]), n("details", Al, [n("summary", null, r(s.costTitle), 1), n("small", null, r(s.cost), 1)])])]));
  }
}), aa = Rl, rt = {
  unconfirmed: "还没确认保存是否成功，请先查看保存结果，不要重复提交。",
  conflict: "发现另一份学习记录，请先核对再继续。",
  unloaded: "暂时打不开学习记录。",
  failed: "这次没能保存，之前保存的内容都还在，请重试。"
}, ge = {
  paid: "奖励已到账",
  retired: "钱包已重置，这份奖励不再补发",
  saving: "正在保存学习成果…",
  pending: "学习已完成，奖励待领取",
  needsWallet: "开通钱包后即可领取",
  claim: "领取奖励",
  openWallet: "开通钱包并领取",
  unknown: "学习已完成，奖励到账情况还没确认。请查看钱包状态，不需要重新做练习。"
}, Ml = {
  context: "翻看学习资料",
  config: "连接 AI",
  session: "准备学习内容",
  summary: "整理之前聊过的内容",
  provider: "组织回复",
  tools: "整理学习内容",
  save: "保存学习内容",
  action: "准备学习内容"
};
function El(e) {
  return `正在${Ml[e.stage]}…`;
}
var Md = Object.freeze({
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
function qt(e) {
  return e.split(/\r?\n/u).filter((c) => c.trim());
}
var Tl = ["aria-labelledby"], Nl = { id: "learning-grading-title" }, Bl = {
  key: 0,
  class: "learning-grading-actions"
}, Ol = {
  key: 0,
  class: "learning-annotation-missing",
  role: "status"
}, ql = ["disabled"], Pl = ["disabled"], Vl = ["open", "onToggle"], _l = {
  key: 0,
  class: "learning-revised-text"
}, Dl = { class: "learning-write-saved" }, Ul = { key: 0 }, jl = {
  key: 1,
  class: "learning-graded-guidance"
}, Wl = ["onClick"], Gl = ["open", "onToggle"], Fl = { key: 0 }, Hl = { key: 1 }, zl = { key: 4 }, Yl = { class: "learning-graded-text" }, Kl = { class: "learning-annotation-fixed" }, Zl = {
  key: 0,
  class: "learning-annotation-missing"
}, Jl = {
  key: 1,
  class: "learning-annotation-fixed"
}, Ql = ["onClick"], Xl = { class: "learning-annotation-tag" }, es = {
  key: 0,
  class: "learning-annotation-suggestion"
}, ts = ["onSubmit"], as = ["onUpdate:modelValue", "aria-label"], ns = ["disabled"], is = { key: 2 }, ls = ["onClick"], ss = {
  key: 1,
  class: "learning-working",
  role: "status"
}, rs = ["disabled"], os = ["disabled"], us = {
  key: 2,
  class: "learning-model-essay"
}, ds = /* @__PURE__ */ te({
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
    }, C = (B) => B.itemId && (B.category === "grammar" || B.category === "vocabulary") ? v[B.category] : null, k = Te(() => s.unit.id), $ = S(() => k.value.edits), m = S(() => s.unit.stage.stage), y = S(() => new Map(s.unit.materials.flatMap((B) => B.paragraphs).map((B, V) => [B.id, V + 1]))), f = (B) => B?.answer.kind === "text" ? B.answer.text : "", w = S(() => Zt(s.unit).map((B) => {
      const { exercise: V, draft: D, review: P, annotations: L } = B;
      return {
        ...B,
        label: V.paragraphId ? `第 ${y.value.get(V.paragraphId) ?? "?"} 段总结` : V.prompt,
        paragraphs: qt(f(D)).map((O, _) => ({
          index: _,
          segments: si(O, L.filter((ue) => ue.paragraphIndex === _)),
          annotations: L.filter((ue) => ue.paragraphIndex === _)
        })),
        resolved: new Set(P?.resolvedAnnotationIds ?? [])
      };
    }).sort((B, V) => +(V.annotations.length > 0) - +(B.annotations.length > 0))), o = (B) => B.row.status === "revising", x = (B, V) => o(B) && V.severity !== "alternative";
    K(w, (B) => {
      for (const V of B.flatMap((D) => D.annotations)) $.value[V.id] ??= {
        value: V.quote,
        done: !1
      };
    }, { immediate: !0 });
    function N(B) {
      const V = $.value[B.id];
      V?.value.trim() && V.value !== B.quote && (V.done = !0);
    }
    const U = S(() => new Map(w.value.filter(o).map((B) => [B.draft.id, li(f(B.draft), B.annotations.map((V) => ({
      id: V.id,
      paragraphIndex: V.paragraphIndex,
      quote: V.quote,
      replacement: $.value[V.id]?.done ? $.value[V.id].value : V.quote
    })))]))), T = S(() => new Set([...U.value.values()].flatMap((B) => B.missing))), J = S(() => [...U.value.values()].reduce((B, V) => B + V.applied.length, 0)), z = F("");
    K(J, () => {
      z.value = "";
    });
    const M = S(() => w.value.filter(o).flatMap((B) => B.annotations.filter((V) => V.severity !== "alternative")).length), A = (B, V) => {
      const D = B.annotations.find((P) => P.id === V);
      return D ? ["learning-mark", `is-${D.severity}`] : "";
    };
    function I() {
      const B = w.value.filter(o).flatMap((V) => {
        const D = U.value.get(V.draft.id);
        return !D || D.text === f(V.draft) ? [] : [{
          attemptId: V.draft.id,
          text: D.text
        }];
      });
      B.length ? t("action", "submit-revision", {
        unitId: s.unit.id,
        revisions: B
      }) : z.value = b.unplaced;
    }
    const q = S(() => s.state.pending?.unitId === s.unit.id ? s.state.pending.purpose : null), G = S(() => w.value.some((B) => B.row.status === "grading" || B.row.status === "reviewing"));
    return (B, V) => (a(), i("section", {
      class: "learning-grading",
      "aria-labelledby": e.view === "feedback" ? "learning-grading-title" : void 0
    }, [
      e.view === "feedback" ? (a(), i(E, { key: 0 }, [
        n("h2", Nl, r(b.title), 1),
        w.value.some(o) ? (a(), i("div", Bl, [
          n("small", null, "已改 " + r(J.value) + " / " + r(M.value) + " 处", 1),
          z.value ? (a(), i("small", Ol, r(z.value), 1)) : g("", !0),
          n("button", {
            type: "button",
            disabled: e.disabled,
            onClick: V[0] || (V[0] = (D) => t("confirm", "skip-revision", { unitId: e.unit.id }, "跳过这次修改？批注会保留，直接进入范文。"))
          }, "跳过修改", 8, ql),
          n("button", {
            type: "button",
            class: "learning-primary",
            disabled: e.disabled || !J.value,
            onClick: I
          }, "提交修改", 8, Pl)
        ])) : g("", !0),
        (a(!0), i(E, null, j(w.value, (D) => (a(), i("details", {
          key: D.exercise.id,
          class: "learning-graded",
          open: l(k).expanded[`grading:${D.draft.id}`] ?? D.annotations.length > 0,
          onToggle: (P) => l(k).expanded[`grading:${D.draft.id}`] = P.target.open
        }, [
          n("summary", null, [n("h3", null, r(D.label), 1)]),
          D.revision ? (a(), i("section", _l, [
            n("h4", null, r(l(ee).revision), 1),
            n("p", Dl, r(f(D.revision)), 1),
            D.review?.guidance ? (a(), i("p", Ul, r(D.review.guidance), 1)) : g("", !0)
          ])) : g("", !0),
          D.assessment?.guidance ? (a(), i("p", jl, r(D.assessment.guidance), 1)) : g("", !0),
          D.assessment ? (a(), i("button", {
            key: 2,
            type: "button",
            onClick: (P) => t("ask", D.exercise.id)
          }, r(l(X).askAssessment), 9, Wl)) : g("", !0),
          D.assessment && (D.assessment.understanding || D.assessment.expression) ? (a(), i("details", {
            key: 3,
            class: "learning-graded-more",
            open: l(k).expanded[`feedback:${D.draft.id}`],
            onToggle: (P) => l(k).expanded[`feedback:${D.draft.id}`] = P.target.open
          }, [
            V[5] || (V[5] = n("summary", null, "理解与表达点评", -1)),
            D.assessment.understanding ? (a(), i("p", Fl, [V[3] || (V[3] = n("b", null, "理解", -1)), H(r(D.assessment.understanding), 1)])) : g("", !0),
            D.assessment.expression ? (a(), i("p", Hl, [V[4] || (V[4] = n("b", null, "表达", -1)), H(r(D.assessment.expression), 1)])) : g("", !0)
          ], 40, Gl)) : g("", !0),
          D.revision ? (a(), i("h4", zl, r(l(ee).original), 1)) : g("", !0),
          (a(!0), i(E, null, j(D.paragraphs, (P) => (a(), i("div", {
            key: P.index,
            class: "learning-graded-paragraph"
          }, [n("p", Yl, [(a(!0), i(E, null, j(P.segments, (L, O) => (a(), i(E, { key: O }, [L.id ? (a(), i("mark", {
            key: 0,
            class: se(A(D, L.id))
          }, r(L.text), 3)) : (a(), i(E, { key: 1 }, [H(r(L.text), 1)], 64))], 64))), 128))]), (a(!0), i(E, null, j(P.annotations, (L) => (a(), i("div", {
            key: L.id,
            class: se(["learning-annotation", [`is-${L.severity}`, {
              "is-fixed": D.resolved.has(L.id),
              "is-edited": $.value[L.id]?.done && o(D)
            }]])
          }, [D.resolved.has(L.id) ? (a(), i(E, { key: 0 }, [n("p", Kl, "✓ " + r(l(ee).resolved), 1), n("p", null, r(L.explanation), 1)], 64)) : $.value[L.id]?.done && o(D) ? (a(), i(E, { key: 1 }, [T.value.has(L.id) ? (a(), i("p", Zl, "原文里找不到“" + r(L.quote) + "”，这处改动不会写进修改稿。", 1)) : (a(), i("p", Jl, "✓ 改为“" + r($.value[L.id].value) + "”", 1)), n("button", {
            type: "button",
            onClick: (O) => $.value[L.id].done = !1
          }, "再改", 8, Ql)], 64)) : (a(), i(E, { key: 2 }, [
            n("p", Xl, [n("span", null, r(d[L.severity]), 1), H(r(u[L.category]), 1)]),
            n("p", null, r(L.explanation), 1),
            L.suggestion ? (a(), i("p", es, "可以写成：" + r(L.suggestion), 1)) : g("", !0),
            x(D, L) && $.value[L.id] ? (a(), i("form", {
              key: 1,
              class: "learning-annotation-edit",
              onSubmit: oe((O) => N(L), ["prevent"])
            }, [ne(n("textarea", {
              "onUpdate:modelValue": (O) => $.value[L.id].value = O,
              rows: "2",
              "aria-label": `改写：${L.quote}`,
              maxlength: "600"
            }, null, 8, as), [[ve, $.value[L.id].value], [l(Je), $.value[L.id]]]), n("button", {
              type: "submit",
              disabled: !$.value[L.id].value.trim() || $.value[L.id].value === L.quote
            }, "改好了", 8, ns)], 40, ts)) : D.review && L.severity !== "alternative" ? (a(), i("small", is, "复核时这里还没改到")) : g("", !0)
          ], 64)), C(L) ? (a(), i("button", {
            key: 3,
            type: "button",
            class: "learning-annotation-book",
            onClick: (O) => t("record", L.itemId)
          }, r(C(L)) + " ↗", 9, ls)) : g("", !0)], 2))), 128))]))), 128))
        ], 40, Vl))), 128))
      ], 64)) : g("", !0),
      G.value || m.value === "model" ? (a(), i("div", ss, [q.value ? (a(), i(E, { key: 0 }, [
        V[6] || (V[6] = n("span", {
          class: "learning-working-dot",
          "aria-hidden": "true"
        }, null, -1)),
        n("span", null, r(q.value === "grade" ? l(ee).grading : q.value === "revision-review" ? l(ee).reviewing : l(ee).modelling), 1),
        n("button", {
          type: "button",
          disabled: e.pending,
          onClick: V[1] || (V[1] = (D) => t("action", "cancel"))
        }, r(l(ee).stop), 9, rs)
      ], 64)) : (a(), i("button", {
        key: 1,
        type: "button",
        class: "learning-primary",
        disabled: e.disabled,
        onClick: V[2] || (V[2] = (D) => t("action", "grade", { unitId: e.unit.id }))
      }, r(m.value === "grading" ? l(ee).grade : l(ee).continue), 9, os))])) : g("", !0),
      e.view === "model" && e.unit.modelEssay ? (a(), i("section", us, [n("h3", null, [V[7] || (V[7] = H("范文", -1)), n("small", null, r(e.unit.modelEssay.level), 1)]), (a(!0), i(E, null, j(l(qt)(e.unit.modelEssay.text), (D, P) => (a(), i("p", { key: P }, r(D), 1))), 128))])) : g("", !0)
    ], 8, Tl));
  }
}), vs = ds, cs = {
  class: "learning-complete",
  role: "status",
  "aria-live": "polite"
}, gs = {
  key: 0,
  class: "learning-complete-burst",
  "aria-hidden": "true"
}, ps = { class: "learning-complete-title" }, bs = {
  key: 1,
  class: "learning-complete-amount"
}, ms = ["disabled"], fs = /* @__PURE__ */ te({
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
    const s = e, t = c, u = S(() => s.state.completions.find((v) => v.unitId === s.unitId)), d = S(() => {
      const v = u.value?.rewardStatus;
      return v === "paid" ? ge.paid : v === "retired" ? ge.retired : u.value ? s.state.walletOpen ? ge.pending : ge.needsWallet : ge.saving;
    });
    return (v, b) => (a(), i("section", cs, [
      e.quiet ? g("", !0) : (a(), i("div", gs, [(a(), i(E, null, j(8, (C) => n("span", {
        key: C,
        style: Dt({ "--i": C })
      }, null, 4)), 64))])),
      n("p", ps, r(e.label), 1),
      u.value?.rewardStatus !== "retired" ? (a(), i("p", bs, [n("strong", null, r(u.value?.rewardStatus === "paid" ? "+" : "") + r(u.value?.amount ?? e.amount), 1), b[1] || (b[1] = n("span", null, "小白币", -1))])) : g("", !0),
      n("small", null, r(d.value), 1),
      u.value && u.value.rewardStatus !== "paid" && u.value.rewardStatus !== "retired" ? (a(), i("button", {
        key: 2,
        type: "button",
        disabled: e.disabled || e.state.walletStorage !== "ready",
        onClick: b[0] || (b[0] = (C) => t("action", "reward", {
          unitId: e.unitId,
          openWallet: !e.state.walletOpen
        }))
      }, r(e.state.walletOpen ? l(ge).claim : l(ge).openWallet), 9, ms)) : g("", !0)
    ]));
  }
}), na = fs, ks = ["data-exercise-id"], ys = { class: "learning-write-label" }, hs = [
  "aria-label",
  "placeholder",
  "rows",
  "onKeydown"
], $s = { class: "learning-write-foot" }, ws = { "aria-live": "polite" }, xs = ["disabled"], Cs = { class: "learning-write-saved" }, Is = { class: "learning-write-foot" }, Ls = ["disabled"], Ss = /* @__PURE__ */ te({
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
    const s = e, t = c, u = Te(() => s.unit.id);
    K([u, () => s.exercise.id], () => {
      u.value.writing[s.exercise.id] ??= {
        text: "",
        rewriting: !1,
        submitted: null
      };
    }, { immediate: !0 });
    const d = S(() => u.value.writing[s.exercise.id]), v = S({
      get: () => d.value.text,
      set: (x) => {
        d.value.text = x;
      }
    }), b = S({
      get: () => d.value.rewriting,
      set: (x) => {
        d.value.rewriting = x;
      }
    }), C = S(() => s.unit.attempts.filter((x) => x.exerciseId === s.exercise.id && x.revisesAttemptId === void 0).at(-1)), k = S(() => C.value?.answer.kind === "text" ? C.value.answer.text : ""), $ = S(() => !C.value || b.value), m = S(() => Nt(v.value, s.state.language)), y = S(() => Nt(k.value, s.state.language)), f = S(() => s.state.workbenchConversation.summaryReviews.find((x) => x.attemptId === C.value?.id)?.text ?? "");
    function w() {
      s.disabled || !v.value.trim() || (d.value.submitted = {
        before: C.value?.id,
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
    function o() {
      v.value = k.value, b.value = !0;
    }
    return (x, N) => (a(), i("div", {
      class: se(["learning-write", `is-${e.tone ?? "summary"}`]),
      "data-exercise-id": e.exercise.id
    }, [
      n("p", ys, r(e.label), 1),
      $.value ? (a(), i("form", {
        key: 0,
        onSubmit: oe(w, ["prevent"])
      }, [ne(n("textarea", {
        "onUpdate:modelValue": N[0] || (N[0] = (U) => v.value = U),
        "aria-label": e.label,
        placeholder: e.placeholder,
        maxlength: "4000",
        rows: e.tone === "essay" ? 8 : 3,
        onKeydown: [Se(oe(w, ["ctrl", "prevent"]), ["enter"]), Se(oe(w, ["meta", "prevent"]), ["enter"])]
      }, null, 40, hs), [[ve, v.value], [l(Je), d.value]]), n("div", $s, [
        n("small", ws, r(m.value.count) + " " + r(m.value.unit), 1),
        b.value ? (a(), i("button", {
          key: 0,
          type: "button",
          onClick: N[1] || (N[1] = (U) => {
            b.value = !1, v.value = "";
          })
        }, "取消")) : g("", !0),
        n("button", {
          type: "submit",
          class: "learning-primary",
          disabled: e.disabled || !v.value.trim()
        }, r(C.value ? "保存新稿" : "提交"), 9, xs)
      ])], 32)) : C.value ? (a(), i(E, { key: 1 }, [n("p", Cs, r(k.value), 1), n("div", Is, [n("small", null, "已保存 · " + r(y.value.count) + " " + r(y.value.unit), 1), n("button", {
        type: "button",
        disabled: e.disabled,
        onClick: o
      }, "重写", 8, Ls)])], 64)) : g("", !0),
      f.value ? (a(), Z(ct, {
        key: 2,
        class: "learning-markdown learning-write-reply",
        text: f.value
      }, null, 8, ["text"])) : g("", !0)
    ], 10, ks));
  }
}), ia = Ss, le = {
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
  taskTitles: { prepare: "准备学习内容" }
}, As = "用你的话概括这一段", Rs = ["data-paragraph-id", "data-material-id"], Ms = { class: "learning-reading-text" }, Es = {
  class: "learning-reading-number",
  "aria-hidden": "true"
}, Ts = ["data-material-id", "data-paragraph-id"], Ns = ["disabled"], Bs = ["open"], Os = { key: 0 }, qs = { class: "learning-knowledge-text" }, Ps = {
  key: 0,
  class: "learning-terms"
}, Vs = [
  "disabled",
  "aria-pressed",
  "onClick"
], _s = {
  key: 2,
  class: "learning-muted learning-knowledge-pending"
}, Ds = /* @__PURE__ */ te({
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
    const s = e, t = c, u = S(() => s.unit.explanations.find((y) => y.materialId === s.materialId && y.paragraphId === s.paragraph.id)), d = S(() => s.unit.exercises.find((y) => y.paragraphId === s.paragraph.id)), v = S(() => new Set(s.state.savedTerms)), b = (y) => v.value.has(y), C = Te(() => s.unit.id), k = S(() => `knowledge:${s.materialId}:${s.paragraph.id}`), $ = S(() => C.value.selection?.materialId === s.materialId && C.value.selection.paragraphId === s.paragraph.id ? C.value.selection : null);
    function m() {
      C.value.selection = {
        materialId: s.materialId,
        paragraphId: s.paragraph.id,
        start: 0,
        end: s.paragraph.text.length,
        quote: s.paragraph.text
      };
    }
    return (y, f) => (a(), i("section", {
      class: "learning-reading-paragraph",
      "data-paragraph-id": e.paragraph.id,
      "data-material-id": e.materialId
    }, [
      n("p", Ms, [n("span", Es, r(e.number), 1), n("span", {
        "data-learning-text": "",
        "data-material-id": e.materialId,
        "data-paragraph-id": e.paragraph.id
      }, r(e.paragraph.text), 9, Ts)]),
      n("button", {
        type: "button",
        class: "learning-paragraph-quote",
        disabled: [...e.paragraph.text].length > l(jt),
        onClick: m
      }, r(l(qe).select), 9, Ns),
      $.value ? (a(), Z(Kt, {
        key: 0,
        selection: $.value,
        disabled: e.disabled,
        onAsk: f[0] || (f[0] = (w) => t("ask", d.value?.id, $.value)),
        onSay: f[1] || (f[1] = (w) => t("action", "say", { selection: $.value })),
        onDismiss: f[2] || (f[2] = (w) => l(C).selection = null)
      }, null, 8, ["selection", "disabled"])) : g("", !0),
      u.value ? (a(), i("details", {
        key: 1,
        class: "learning-knowledge",
        open: l(C).expanded[k.value],
        onToggle: f[3] || (f[3] = (w) => l(C).expanded[k.value] = w.target.open)
      }, [
        n("summary", null, [f[5] || (f[5] = H("本段知识", -1)), u.value.terms.length ? (a(), i("span", Os, " · " + r(u.value.terms.length) + " 个词语", 1)) : g("", !0)]),
        n("p", qs, r(u.value.explanation), 1),
        u.value.terms.length ? (a(), i("ul", Ps, [(a(!0), i(E, null, j(u.value.terms, (w) => (a(), i("li", { key: w.text }, [n("span", null, [n("strong", null, r(w.text), 1), n("small", null, r(w.note), 1)]), n("button", {
          type: "button",
          disabled: e.disabled || b(w.text),
          "aria-pressed": b(w.text),
          onClick: (o) => t("action", "bookmark", {
            unitId: e.unit.id,
            materialId: e.materialId,
            paragraphId: e.paragraph.id,
            termText: w.text
          })
        }, r(b(w.text) ? "已收藏" : "收藏"), 9, Vs)]))), 128))])) : g("", !0)
      ], 40, Bs)) : (a(), i("p", _s, r(e.state.preparation?.running ? l(le).notes : l(le).missingNotes), 1)),
      d.value ? (a(), Z(ia, {
        key: 3,
        state: e.state,
        unit: e.unit,
        exercise: d.value,
        disabled: e.disabled,
        label: l(As),
        placeholder: "写下这段的大意，不必逐句翻译",
        onAction: f[4] || (f[4] = (w, o) => t("action", w, o))
      }, null, 8, [
        "state",
        "unit",
        "exercise",
        "disabled",
        "label"
      ])) : g("", !0)
    ], 8, Rs));
  }
}), Us = Ds;
function js(e, c) {
  return e === "talk" || e === "retry-chat" ? c === "workbench" ? "workbench-talk" : "talk" : e;
}
var Ws = /* @__PURE__ */ new Set([
  "language",
  "teacher",
  "forget-conversation",
  "resume",
  "rate",
  "seek",
  "verify-teacher",
  "adopt-teacher"
]), Gs = /* @__PURE__ */ new Set([
  "submit",
  "bookmark",
  "say",
  "play",
  "save-note",
  "delete-note"
]), la = /* @__PURE__ */ new Set([
  "approve-operation",
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
]), Fs = /* @__PURE__ */ new Set([
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
function ut(e, c) {
  return la.has(e) ? !1 : e === "talk" ? c.chatBusy : e === "workbench-talk" ? c.workbenchBusy : Ws.has(e) ? c.busy || c.chatBusy || c.workbenchBusy || !!c.preparation?.running : c.busy || !!c.preparation?.running && !Gs.has(e);
}
function fe(e, c) {
  return e === "talk" || e === "workbench-talk" ? !ut(e, c) && (e === "talk" ? c.chatStorage : c.workbenchStorage) === "ready" : !ut(e, c) && (la.has(e) || Fs.has(e) || (e === "teacher" ? c.chatStorage === "ready" : c.storage === "ready"));
}
var Hs = ["aria-label"], zs = [
  "aria-current",
  "disabled",
  "onClick"
], Ys = { class: "learning-reading-head" }, Ks = ["open"], Zs = { key: 0 }, Js = { class: "learning-source" }, Qs = ["href"], Xs = { class: "learning-essay-prompt" }, er = {
  key: 0,
  class: "learning-essay"
}, tr = { class: "learning-muted" }, ar = ["data-exercise-id"], nr = ["aria-label"], ir = ["aria-current"], lr = {
  key: 1,
  class: "learning-stage-bar is-writing"
}, sr = {
  key: 1,
  class: "learning-muted"
}, rr = {
  key: 2,
  class: "learning-stage-bar"
}, or = ["disabled"], ur = ["disabled"], dr = /* @__PURE__ */ te({
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
    const s = e, t = c, u = F(null), d = Te(() => s.unit.id);
    Wt(u, () => s.unit.materials, (M) => {
      d.value.selection = M;
    });
    const v = S(() => s.unit.stage.stage), b = S(() => d.value.reading.view ?? (v.value === "complete" ? "model" : ["writing", "grading"].includes(v.value) ? "reading" : "feedback")), C = [
      "reading",
      "feedback",
      "model"
    ];
    async function k(M) {
      const A = u.value?.closest(".learning-scroll");
      A && (d.value.reading.scrolls[b.value] = A.scrollTop), d.value.reading.view = M, await re(), A && (A.scrollTop = d.value.reading.scrolls[M] ?? 0);
    }
    const $ = [
      ["writing", "阅读与写作"],
      ["grading", "统一批改"],
      ["revising", "修改"],
      ["model", "范文"],
      ["complete", "完成"]
    ], m = S(() => ({
      writing: 0,
      grading: 1,
      revising: 2,
      reviewing: 3,
      model: 3,
      complete: 4
    })[v.value] ?? 0), y = S(() => s.unit.exercises.filter((M) => !M.paragraphId && M.skill === "writing" && M.response.kind === "text")), f = S(() => s.unit.exercises.filter((M) => !M.paragraphId && !y.value.includes(M)));
    K([f, () => f.value.map((M) => d.value.activityDrafts[M.id])], ([M]) => {
      for (const A of M) {
        const I = JSON.stringify(A.response);
        d.value.activityDrafts[A.id]?.response !== I && (d.value.activityDrafts[A.id] = {
          response: I,
          value: Ae(A.response)
        });
      }
    }, { immediate: !0 });
    const w = S(() => f.value.flatMap((M) => {
      const A = s.unit.attempts.filter((I) => I.exerciseId === M.id).at(-1);
      return A ? [{
        exercise: M,
        attempt: A,
        feedback: s.unit.assessments.find((I) => I.attemptId === A.id)
      }] : [];
    })), o = S(() => s.unit.stage.exercises.some((M) => M.status === "grading" || M.status === "reviewing")), x = S(() => s.unit.stage.exercises.filter((M) => M.status === "writing").map((M) => M.exerciseId)), N = {
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
    }, U = S(() => {
      let M = 0;
      return s.unit.materials.map((A) => ({
        material: A,
        paragraphs: A.paragraphs.map((I) => ({
          paragraph: I,
          number: ++M
        }))
      }));
    }), T = (M, A) => t("action", M, A);
    function J(M, A) {
      d.value.activityDrafts[M].submitted = { before: s.unit.attempts.filter((I) => I.exerciseId === M).at(-1)?.id }, T("submit", {
        unitId: s.unit.id,
        exerciseId: M,
        answer: A
      });
    }
    function z(M) {
      const A = u.value?.querySelector(`[data-exercise-id="${CSS.escape(M)}"]`);
      A?.scrollIntoView({
        block: "center",
        behavior: matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth"
      }), A?.querySelector("textarea, button")?.focus({ preventScroll: !0 });
    }
    return (M, A) => (a(), i("article", {
      ref_key: "root",
      ref: u,
      class: "learning-reading"
    }, [
      n("nav", {
        class: "learning-reading-nav",
        "aria-label": l(ee).navigation
      }, [(a(), i(E, null, j(C, (I) => n("button", {
        key: I,
        type: "button",
        "aria-current": b.value === I ? "page" : void 0,
        disabled: I === "model" && !e.unit.modelEssay,
        onClick: (q) => k(I)
      }, r(l(ee)[I]), 9, zs)), 64))], 8, Hs),
      e.state.completions.some((I) => I.unitId === e.unit.id) ? (a(), Z(na, {
        key: 0,
        state: e.state,
        "unit-id": e.unit.id,
        amount: e.unit.reward.amount,
        label: l(ee).completed,
        disabled: e.disabled,
        onAction: T
      }, null, 8, [
        "state",
        "unit-id",
        "amount",
        "label",
        "disabled"
      ])) : g("", !0),
      b.value === "reading" ? (a(), i(E, { key: 1 }, [
        n("header", Ys, [n("details", {
          class: "learning-reading-goal",
          open: l(d).expanded.goal,
          onToggle: A[0] || (A[0] = (I) => l(d).expanded.goal = I.target.open)
        }, [
          n("summary", null, r(N.goal), 1),
          n("strong", null, r(e.unit.title), 1),
          e.unit.goal ? (a(), i("p", Zs, r(e.unit.goal), 1)) : g("", !0)
        ], 40, Ks), W(aa, { name: e.state.teacher?.name }, null, 8, ["name"])]),
        (a(!0), i(E, null, j(U.value, (I, q) => (a(), i("section", {
          key: I.material.id,
          class: "learning-reading-material"
        }, [
          (a(), Z(ha(q === 0 ? "h1" : "h2"), { tabindex: "-1" }, {
            default: Ut(() => [H(r(I.material.title), 1)]),
            _: 2
          }, 1024)),
          n("p", Js, [I.material.provenance.kind === "authored" ? (a(), i(E, { key: 0 }, [H(r(N.authored), 1)], 64)) : (a(), i(E, { key: 1 }, [H(r(I.material.provenance.kind === "adapted" ? N.adapted : N.original) + " ", 1), n("a", {
            href: I.material.provenance.url,
            target: "_blank",
            rel: "noopener noreferrer"
          }, r(I.material.provenance.title), 9, Qs)], 64))]),
          (a(!0), i(E, null, j(I.paragraphs, (G) => (a(), Z(Us, {
            key: G.paragraph.id,
            state: e.state,
            unit: e.unit,
            "material-id": I.material.id,
            paragraph: G.paragraph,
            number: G.number,
            disabled: e.disabled,
            onAction: T,
            onAsk: A[1] || (A[1] = (B, V) => t("ask", B, V))
          }, null, 8, [
            "state",
            "unit",
            "material-id",
            "paragraph",
            "number",
            "disabled"
          ]))), 128))
        ]))), 128)),
        (a(!0), i(E, null, j(y.value, (I) => (a(), i("section", {
          key: I.id,
          class: "learning-essay"
        }, [
          n("h2", null, r(N.essay), 1),
          n("p", Xs, r(I.prompt), 1),
          W(ia, {
            state: e.state,
            unit: e.unit,
            exercise: I,
            disabled: e.disabled,
            label: N.essayLabel,
            placeholder: N.essayPlaceholder,
            tone: "essay",
            onAction: T
          }, null, 8, [
            "state",
            "unit",
            "exercise",
            "disabled",
            "label",
            "placeholder"
          ])
        ]))), 128)),
        y.value.length ? g("", !0) : (a(), i("section", er, [n("h2", null, r(N.essay), 1), n("p", tr, r(e.state.preparation?.running ? l(le).essay : l(le).missingEssay), 1)])),
        (a(!0), i(E, null, j(f.value, (I) => (a(), i("section", {
          key: I.id,
          class: "learning-essay",
          "data-exercise-id": I.id
        }, [
          n("h2", null, r(I.prompt), 1),
          l(d).activityDrafts[I.id] ? (a(), Z(gt, {
            key: 0,
            modelValue: l(d).activityDrafts[I.id].value,
            "onUpdate:modelValue": (q) => l(d).activityDrafts[I.id].value = q,
            response: I.response,
            paragraphs: e.unit.materials.filter((q) => I.materialIds.includes(q.id)).flatMap((q) => q.paragraphs),
            disabled: e.disabled,
            onSubmit: (q) => J(I.id, q)
          }, null, 8, [
            "modelValue",
            "onUpdate:modelValue",
            "response",
            "paragraphs",
            "disabled",
            "onSubmit"
          ])) : g("", !0),
          (a(!0), i(E, null, j(w.value.filter((q) => q.exercise.id === I.id), (q) => (a(), Z(bt, {
            key: q.attempt.id,
            attempt: q.attempt,
            feedback: q.feedback,
            response: I.response,
            paragraphs: e.unit.materials.flatMap((G) => G.paragraphs),
            disabled: e.disabled,
            onAction: T
          }, null, 8, [
            "attempt",
            "feedback",
            "response",
            "paragraphs",
            "disabled"
          ]))), 128))
        ], 8, ar))), 128)),
        n("ol", {
          class: "learning-steps",
          "aria-label": N.progress
        }, [(a(), i(E, null, j($, ([I, q], G) => n("li", {
          key: I,
          class: se({
            "is-done": G < m.value,
            "is-current": G === m.value
          }),
          "aria-current": G === m.value ? "step" : void 0
        }, r(q), 11, ir)), 64))], 8, nr),
        v.value === "writing" ? (a(), i("div", lr, [n("span", null, r(N.written) + " " + r(e.unit.stage.exercises.length - x.value.length) + " / " + r(e.unit.stage.exercises.length), 1), x.value.length ? (a(), i("button", {
          key: 0,
          type: "button",
          onClick: A[2] || (A[2] = (I) => z(x.value[0]))
        }, r(N.next), 1)) : (a(), i("span", sr, r(e.unit.preparation.essay ? l(le).missingNotes : l(le).missingEssay), 1))])) : g("", !0),
        o.value ? (a(), i("div", rr, [e.state.pending?.purpose === "grade" ? (a(), i(E, { key: 0 }, [
          A[10] || (A[10] = n("span", {
            class: "learning-working-dot",
            "aria-hidden": "true"
          }, null, -1)),
          n("span", null, r(l(ee).grading), 1),
          n("button", {
            type: "button",
            disabled: e.pending,
            onClick: A[3] || (A[3] = (I) => t("action", "cancel"))
          }, r(l(ee).stop), 9, or)
        ], 64)) : (a(), i("button", {
          key: 1,
          type: "button",
          class: "learning-primary",
          disabled: e.disabled || !l(fe)("grade", e.state),
          onClick: A[4] || (A[4] = (I) => t("action", "grade", { unitId: e.unit.id }))
        }, r(l(ee).grade), 9, ur))])) : e.unit.assessments.length ? (a(), i("button", {
          key: 3,
          type: "button",
          class: "learning-primary",
          onClick: A[5] || (A[5] = (I) => k("feedback"))
        }, r(l(ee).feedback), 1)) : g("", !0)
      ], 64)) : (a(), Z(vs, {
        key: 2,
        view: b.value,
        state: e.state,
        unit: e.unit,
        disabled: e.disabled || !l(fe)("grade", e.state),
        pending: e.pending,
        onAsk: A[6] || (A[6] = (I) => t("assistant", I)),
        onAction: T,
        onConfirm: A[7] || (A[7] = (I, q, G) => t("confirm", I, q, G)),
        onRecord: A[8] || (A[8] = (I) => t("record", I))
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
        onClick: A[9] || (A[9] = (I) => k("model"))
      }, r(l(ee).viewModel), 1)) : g("", !0)
    ], 512));
  }
}), vr = dr, cr = ["data-learning-unit-id", "data-exercise-id"], gr = { class: "learning-review-head" }, pr = { class: "learning-muted" }, br = ["disabled"], mr = {
  class: "learning-review-dots",
  "aria-label": "复习卡片"
}, fr = [
  "aria-label",
  "aria-current",
  "onClick"
], kr = { class: "learning-eyebrow" }, yr = { class: "learning-card-verdict" }, hr = { key: 0 }, $r = { key: 1 }, wr = { key: 2 }, xr = { key: 1 }, Cr = ["disabled"], Ir = ["disabled"], Lr = {
  key: 1,
  class: "learning-working",
  role: "status"
}, Sr = ["disabled"], Ar = ["disabled"], Rr = ["disabled"], Mr = {
  key: 2,
  class: "learning-row"
}, Er = { class: "learning-review-results" }, Tr = ["aria-current", "onClick"], Nr = ["aria-expanded", "onClick"], Br = {
  key: 1,
  class: "learning-chip-reason"
}, Or = /* @__PURE__ */ te({
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
    const s = e, t = c, u = ye.verdicts, d = S(() => s.review.stage.stage), v = (P) => s.review.attempts.filter((L) => L.exerciseId === P).at(-1), b = () => Math.max(0, s.review.exercises.findIndex((P) => !v(P.id))), C = Te(() => s.review.id), k = S(() => C.value.review), $ = S({
      get: () => k.value.index ?? b(),
      set: (P) => {
        k.value.index = P;
      }
    }), m = S(() => s.review.exercises[$.value]), y = S(() => m.value && v(m.value.id)), f = S(() => s.review.assessments.find((P) => P.attemptId === y.value?.id)), w = S(() => s.review.materials.flatMap((P) => P.paragraphs)), o = S(() => k.value.drafts);
    K([m, () => m.value && o.value[m.value.id]], ([P]) => {
      P && !o.value[P.id] && (o.value[P.id] = {
        value: Ae(P.response),
        retry: !1
      });
    }, { immediate: !0 });
    const x = S({
      get: () => o.value[m.value.id].value,
      set: (P) => {
        o.value[m.value.id].value = P;
      }
    }), N = S(() => !!m.value && !!o.value[m.value.id]?.retry), U = S(() => s.review.exercises.filter((P) => v(P.id)).length), T = S({
      get: () => k.value.openReason,
      set: (P) => {
        k.value.openReason = P;
      }
    });
    function J(P) {
      o.value[m.value.id].submitted = { before: y.value?.id }, t("action", "submit", {
        unitId: s.review.id,
        exerciseId: m.value.id,
        answer: P
      });
    }
    function z() {
      const P = m.value;
      o.value[P.id] = {
        value: Ae(P.response),
        retry: !N.value
      };
    }
    function M() {
      const P = s.review.exercises.findIndex((L) => !v(L.id));
      P >= 0 && ($.value = P);
    }
    function A(P) {
      $.value = P, B.value = !0;
    }
    const I = S(() => s.state.completions.find((P) => P.unitId === s.review.id)), q = S(() => I.value?.rewardStatus === "paid" || I.value?.rewardStatus === "retired");
    K(k, (P) => {
      P.seenBefore ??= d.value === "complete" && Bt.has(s.review.id);
    }, { immediate: !0 });
    const G = S(() => k.value.seenBefore ?? !1), B = S({
      get: () => k.value.expanded,
      set: (P) => {
        k.value.expanded = P;
      }
    });
    K([d, () => s.review.id], ([P, L]) => {
      P === "complete" && Bt.mark(L);
    }, { immediate: !0 });
    const V = S(() => G.value && q.value && !B.value), D = (P) => [...s.state.books.grammar, ...s.state.books.vocabulary].find((L) => L.id === P);
    return (P, L) => (a(), i("section", {
      class: "learning-review",
      "data-learning-unit-id": e.review.id,
      "data-exercise-id": m.value?.id,
      "aria-labelledby": "learning-review-title"
    }, [
      n("header", gr, [
        L[8] || (L[8] = n("h2", { id: "learning-review-title" }, "今日复习", -1)),
        n("span", pr, r(U.value) + " / " + r(e.review.exercises.length), 1),
        d.value === "answering" ? (a(), i("button", {
          key: 0,
          type: "button",
          disabled: e.disabled || !l(fe)("abandon-review", e.state),
          onClick: L[0] || (L[0] = (O) => t("confirm", "abandon-review", {}, l($e).review))
        }, "放下", 8, br)) : g("", !0)
      ]),
      n("nav", mr, [(a(!0), i(E, null, j(e.review.exercises, (O, _) => (a(), i("button", {
        key: O.id,
        type: "button",
        "aria-label": `第 ${_ + 1} 张`,
        "aria-current": _ === $.value,
        class: se({ "is-answered": !!v(O.id) }),
        onClick: (ue) => A(_)
      }, null, 10, fr))), 128))]),
      m.value && !V.value ? (a(), i("div", {
        key: `${m.value.id}:${y.value && !N.value ? "back" : "front"}`,
        class: se(["learning-card", { "is-back": !!y.value && !N.value }])
      }, [
        n("p", kr, r(y.value ? l(ye).answer : `第 ${$.value + 1} 张`), 1),
        n("h3", null, r(m.value.prompt), 1),
        !y.value || N.value ? (a(), Z(gt, {
          key: 0,
          modelValue: x.value,
          "onUpdate:modelValue": L[1] || (L[1] = (O) => x.value = O),
          response: m.value.response,
          paragraphs: w.value,
          disabled: e.disabled || !l(fe)("submit", e.state),
          onSubmit: J
        }, null, 8, [
          "modelValue",
          "response",
          "paragraphs",
          "disabled"
        ])) : (a(), i(E, { key: 1 }, [
          n("blockquote", null, r(l(pt)(y.value.answer, m.value.response, w.value)), 1),
          f.value ? (a(), i(E, { key: 0 }, [
            n("p", yr, r(l(u)[f.value.verdict]), 1),
            f.value.understanding ? (a(), i("p", hr, r(f.value.understanding), 1)) : g("", !0),
            f.value.expression ? (a(), i("p", $r, r(f.value.expression), 1)) : g("", !0),
            f.value.guidance ? (a(), i("p", wr, r(f.value.guidance), 1)) : g("", !0)
          ], 64)) : (a(), i("small", xr, r(l(ye).saved), 1)),
          U.value < e.review.exercises.length ? (a(), i("button", {
            key: 2,
            type: "button",
            class: "learning-primary",
            onClick: M
          }, "下一张")) : g("", !0)
        ], 64)),
        y.value ? (a(), i("button", {
          key: 2,
          type: "button",
          disabled: e.disabled || !l(fe)("submit", e.state),
          onClick: z
        }, r(N.value ? l(ye).cancelRetry : l(ye).retry), 9, Cr)) : g("", !0),
        n("button", {
          type: "button",
          class: "learning-review-ask",
          "data-action": "ask",
          disabled: e.pending || !l(fe)("talk", e.state),
          onClick: L[2] || (L[2] = (O) => t("ask", m.value.id, e.review.id))
        }, r(l(ye).ask), 9, Ir)
      ], 2)) : g("", !0),
      d.value === "grading" ? (a(), i("div", Lr, [e.state.pending?.purpose === "review-assess" ? (a(), i(E, { key: 0 }, [
        L[9] || (L[9] = n("span", {
          class: "learning-working-dot",
          "aria-hidden": "true"
        }, null, -1)),
        L[10] || (L[10] = n("span", null, "正在批改这组复习…", -1)),
        n("button", {
          type: "button",
          disabled: e.pending,
          onClick: L[3] || (L[3] = (O) => t("action", "cancel"))
        }, "停止", 8, Sr)
      ], 64)) : (a(), i(E, { key: 1 }, [
        n("span", null, r(l(ye).ready), 1),
        n("button", {
          type: "button",
          disabled: e.disabled || !l(fe)("abandon-review", e.state),
          onClick: L[4] || (L[4] = (O) => t("confirm", "abandon-review", {}, l($e).review))
        }, "放下", 8, Ar),
        n("button", {
          type: "button",
          disabled: e.disabled || !l(fe)("grade", e.state),
          onClick: L[5] || (L[5] = (O) => t("action", "grade", { unitId: e.review.id }))
        }, r(l(ye).grade), 9, Rr)
      ], 64))])) : g("", !0),
      d.value === "complete" && V.value ? (a(), i("div", Mr, [L[11] || (L[11] = n("span", { class: "learning-muted" }, "这组复习已完成", -1)), n("button", {
        type: "button",
        "aria-expanded": !1,
        onClick: L[6] || (L[6] = (O) => B.value = !0)
      }, "查看结果")])) : d.value === "complete" ? (a(), i(E, { key: 3 }, [n("ul", Er, [(a(!0), i(E, null, j(e.review.exercises, (O, _) => (a(), i("li", { key: O.id }, [
        n("button", {
          type: "button",
          class: "learning-review-result",
          "aria-current": _ === $.value,
          onClick: (ue) => A(_)
        }, [n("strong", null, r(D(O.itemId)?.label ?? O.prompt), 1), n("small", null, r(l(u)[e.review.assessments.find((ue) => ue.attemptId === v(O.id)?.id)?.verdict ?? "disputed"]), 1)], 8, Tr),
        D(O.itemId)?.nextReviewAt ? (a(), i("button", {
          key: 0,
          type: "button",
          class: "learning-chip",
          "aria-expanded": T.value === O.id,
          onClick: (ue) => T.value = T.value === O.id ? "" : O.id
        }, r(l(mt)(D(O.itemId).nextReviewAt)), 9, Nr)) : g("", !0),
        T.value === O.id ? (a(), i("small", Br, r(D(O.itemId)?.scheduleReason), 1)) : g("", !0)
      ]))), 128))]), W(na, {
        state: e.state,
        "unit-id": e.review.id,
        amount: e.review.reward.amount,
        label: "复习完成",
        disabled: e.disabled,
        quiet: G.value,
        onAction: L[7] || (L[7] = (O, _) => t("action", O, _))
      }, null, 8, [
        "state",
        "unit-id",
        "amount",
        "disabled",
        "quiet"
      ])], 64)) : g("", !0)
    ], 8, cr));
  }
}), qr = Or, Pr = {
  key: 0,
  class: "learning-source-choice",
  "aria-live": "polite"
}, Vr = { class: "learning-row" }, _r = ["disabled"], Dr = ["disabled"], Ur = ["disabled"], jr = ["disabled"], Wr = ["disabled"], Gr = {
  key: 1,
  class: "learning-preparation",
  "aria-live": "polite"
}, Fr = {
  key: 0,
  class: "learning-turn-notice"
}, Hr = { class: "learning-row" }, zr = ["disabled"], Yr = /* @__PURE__ */ te({
  __name: "LearningPreparation",
  props: {
    state: {},
    disabled: { type: Boolean },
    pending: { type: Boolean }
  },
  emits: ["action"],
  setup(e, { emit: c }) {
    const s = c;
    return (t, u) => e.state.sourceChoice ? (a(), i("section", Pr, [
      n("p", null, r(e.state.sourceChoice === "unconfigured" ? l(le).noWeb : e.state.preparation?.message || l(le).unavailable), 1),
      n("div", Vr, [
        e.state.sourceChoice === "unavailable" ? (a(), i("button", {
          key: 0,
          type: "button",
          class: "learning-primary",
          disabled: e.disabled,
          onClick: u[0] || (u[0] = (d) => s("action", "retry-source"))
        }, r(l(le).retry), 9, _r)) : (a(), i("button", {
          key: 1,
          type: "button",
          class: "learning-primary",
          disabled: e.pending,
          onClick: u[1] || (u[1] = (d) => s("action", "research-settings"))
        }, r(l(le).settings), 9, Dr)),
        e.state.preparation?.source !== "authored" ? (a(), i("button", {
          key: 2,
          type: "button",
          disabled: e.disabled,
          onClick: u[2] || (u[2] = (d) => s("action", "choose-original"))
        }, r(l(le).original), 9, Ur)) : g("", !0),
        n("button", {
          type: "button",
          disabled: e.pending,
          onClick: u[3] || (u[3] = (d) => s("action", "dismiss-source"))
        }, r(e.state.unit ? l(le).existing : l(le).dismiss), 9, jr)
      ]),
      e.state.sourceChoice === "unavailable" && e.state.preparation?.source !== "authored" ? (a(), i("button", {
        key: 0,
        type: "button",
        disabled: e.pending,
        onClick: u[4] || (u[4] = (d) => s("action", "research-settings"))
      }, r(l(le).settings), 9, Wr)) : g("", !0)
    ])) : !e.state.preparation?.running && (e.state.preparation || e.state.unit?.kind === "reading-writing" && !e.state.unit.preparation.ready) ? (a(), i("section", Gr, [e.state.preparation?.message ? (a(), i("p", Fr, r(e.state.preparation.message), 1)) : g("", !0), n("div", Hr, [e.state.unit?.kind === "reading-writing" && !e.state.unit.preparation.ready ? (a(), i("button", {
      key: 0,
      type: "button",
      disabled: e.disabled,
      onClick: u[5] || (u[5] = (d) => s("action", "resume-preparation", { unitId: e.state.unit.id }))
    }, r(l(le).resume), 9, zr)) : g("", !0)])])) : g("", !0);
  }
}), dt = Yr, Kr = { class: "learning-workbench" }, Zr = {
  key: 1,
  class: "learning-due"
}, Jr = {
  key: 0,
  class: "learning-working",
  role: "status"
}, Qr = ["disabled"], Xr = ["disabled"], eo = {
  key: 2,
  class: "learning-row"
}, to = ["disabled"], ao = ["data-learning-unit-id"], no = { class: "learning-eyebrow" }, io = { tabindex: "-1" }, lo = {
  key: 0,
  class: "learning-muted"
}, so = ["onClick"], ro = ["onClick"], oo = { class: "learning-row" }, uo = ["disabled"], vo = {
  key: 6,
  class: "learning-start"
}, co = ["disabled"], go = {
  key: 0,
  tabindex: "-1"
}, po = { key: 1 }, bo = ["aria-label"], mo = { class: "learning-start-reading" }, fo = ["disabled"], ko = ["disabled"], yo = /* @__PURE__ */ te({
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
    const s = e, t = (w) => s.disabled || !fe(w, s.state), u = c, d = S(() => !!s.state.review && s.state.review.stage.stage !== "complete"), v = S(() => s.state.unit), b = S(() => !v.value || s.state.completions.some((w) => w.unitId === v.value?.id)), C = S(() => s.state.busy && !s.state.pending), k = {
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
    }, $ = S(() => [
      new Intl.DisplayNames(["zh-CN"], { type: "language" }).of(s.state.language),
      s.state.profile?.settings.exam,
      [s.state.profile?.settings.level, s.state.profile?.settings.targetLevel].filter(Boolean).join(" → ")
    ].filter(Boolean).join(" · "));
    function m(w) {
      u("action", "prepare", {
        kind: w,
        message: w === "reading-writing" ? "请按我的训练设置准备一篇读写训练。" : "请按我现在的情况准备一节专项小课。"
      });
    }
    const y = (w, o) => u("action", w, o), f = (w, o, x) => u("confirm", w, o, x);
    return (w, o) => (a(), i("div", Kr, [
      !e.preparationInProcess && (!e.state.sourceChoice || !b.value) ? (a(), Z(dt, {
        key: 0,
        state: e.state,
        disabled: e.disabled,
        pending: e.pending,
        onAction: y
      }, null, 8, [
        "state",
        "disabled",
        "pending"
      ])) : g("", !0),
      e.state.dueCount && !d.value ? (a(), i("div", Zr, [n("span", null, r(l(zt)(e.state.dueCount)), 1), e.state.pending?.purpose === "review-prepare" ? (a(), i("span", Jr, [
        o[13] || (o[13] = n("span", {
          class: "learning-working-dot",
          "aria-hidden": "true"
        }, null, -1)),
        o[14] || (o[14] = n("span", null, "正在出题…", -1)),
        n("button", {
          type: "button",
          disabled: e.pending,
          onClick: o[0] || (o[0] = (x) => u("action", "cancel"))
        }, "停止", 8, Qr)
      ])) : e.state.blockedReview ? g("", !0) : (a(), i("button", {
        key: 1,
        type: "button",
        class: "learning-primary",
        disabled: t("start-review"),
        onClick: o[1] || (o[1] = (x) => u("action", "start-review"))
      }, r(k.review), 9, Xr))])) : g("", !0),
      e.state.blockedReview ? (a(), i("div", eo, [o[15] || (o[15] = n("p", { class: "learning-muted" }, "有一组复习在另一个故事中进行。回到那个故事可以接着做；也可以放下它，在这里重新出题。", -1)), n("button", {
        type: "button",
        disabled: t("abandon-review"),
        onClick: o[2] || (o[2] = (x) => f("abandon-review", {}, l($e).review))
      }, "放下", 8, to)])) : g("", !0),
      e.state.review ? (a(), Z(qr, {
        key: 3,
        state: e.state,
        review: e.state.review,
        disabled: e.disabled,
        pending: e.pending,
        onAction: y,
        onConfirm: f,
        onAsk: o[3] || (o[3] = (x, N) => u("ask", x, void 0, N))
      }, null, 8, [
        "state",
        "review",
        "disabled",
        "pending"
      ])) : g("", !0),
      v.value?.kind === "reading-writing" ? (a(), Z(vr, {
        key: 4,
        "data-learning-unit-id": v.value.id,
        state: e.state,
        unit: v.value,
        disabled: e.disabled,
        pending: e.pending,
        onAction: y,
        onConfirm: f,
        onAsk: o[4] || (o[4] = (x, N) => u("ask", x, N, v.value.id)),
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
        n("p", no, "专项小课 · 完成可得 " + r(v.value.reward.amount) + " 小白币", 1),
        n("h1", io, r(v.value.title), 1),
        v.value.goal ? (a(), i("p", lo, r(v.value.goal), 1)) : g("", !0),
        (a(!0), i(E, null, j(v.value.materials, (x) => (a(), i("button", {
          key: x.id,
          type: "button",
          class: "learning-activity-link",
          onClick: (N) => u("present", {
            unitId: v.value.id,
            kind: "material",
            id: x.id,
            title: x.title
          })
        }, [
          W(Y, { name: "book" }),
          n("span", null, r(x.title), 1),
          W(Y, { name: "arrow" })
        ], 8, so))), 128)),
        (a(!0), i(E, null, j(v.value.exercises, (x) => (a(), i("button", {
          key: x.id,
          type: "button",
          class: "learning-activity-link",
          onClick: (N) => u("present", {
            unitId: v.value.id,
            kind: "exercise",
            id: x.id,
            title: x.prompt
          })
        }, [
          W(Y, { name: v.value.stage.exercises.find((N) => N.exerciseId === x.id)?.status === "done" ? "check" : "records" }, null, 8, ["name"]),
          n("span", null, r(x.prompt), 1),
          W(Y, { name: "arrow" })
        ], 8, ro))), 128)),
        n("div", oo, [n("button", {
          type: "button",
          disabled: t("complete"),
          onClick: o[7] || (o[7] = (x) => u("action", "complete"))
        }, r(k.complete), 9, uo), n("button", {
          type: "button",
          onClick: o[8] || (o[8] = (x) => u("go", "materials"))
        }, r(k.notes), 1)])
      ], 8, ao)) : g("", !0),
      b.value ? (a(), i("section", vo, [e.state.blockedUnit ? (a(), i(E, { key: 0 }, [
        o[16] || (o[16] = n("h1", { tabindex: "-1" }, "当前课件在另一个故事中", -1)),
        o[17] || (o[17] = n("p", { class: "learning-muted" }, "回到那个故事可以继续；也可以放下它，在这里重新开始。", -1)),
        n("button", {
          type: "button",
          disabled: t("abandon"),
          onClick: o[9] || (o[9] = (x) => f("abandon", {}, l($e).lesson))
        }, "放下并重新开始", 8, co)
      ], 64)) : (a(), i(E, { key: 1 }, [
        v.value ? (a(), i("h2", po, r(k.next), 1)) : (a(), i("h1", go, r(k.reading), 1)),
        v.value ? g("", !0) : (a(), i("button", {
          key: 2,
          type: "button",
          class: "learning-start-preference",
          "aria-label": `${k.settings}：${$.value}`,
          onClick: o[10] || (o[10] = (x) => u("go", "settings"))
        }, [n("span", null, [n("strong", null, r(k.settings), 1), n("small", null, r($.value), 1)]), W(Y, { name: "arrow" })], 8, bo)),
        e.state.sourceChoice && !e.preparationInProcess ? (a(), Z(dt, {
          key: 3,
          state: e.state,
          disabled: e.disabled,
          pending: e.pending,
          onAction: y
        }, null, 8, [
          "state",
          "disabled",
          "pending"
        ])) : g("", !0),
        !C.value && !e.state.sourceChoice ? (a(), i(E, { key: 4 }, [n("section", mo, [
          W(Y, { name: "workbook" }),
          n("p", null, r(k.readingHint), 1),
          n("button", {
            type: "button",
            class: "learning-primary",
            disabled: t("prepare"),
            onClick: o[11] || (o[11] = (x) => m("reading-writing"))
          }, [H(r(k.start), 1), W(Y, { name: "arrow" })], 8, fo)
        ]), n("button", {
          type: "button",
          class: "learning-start-secondary",
          disabled: t("prepare"),
          onClick: o[12] || (o[12] = (x) => m("lesson"))
        }, [
          W(Y, { name: "records" }),
          n("span", null, [n("strong", null, r(k.lesson), 1), n("small", null, r(k.lessonHint), 1)]),
          W(Y, { name: "arrow" })
        ], 8, ko)], 64)) : g("", !0)
      ], 64))])) : g("", !0)
    ]));
  }
}), ho = yo;
function Pt(e) {
  try {
    return JSON.parse(e);
  } catch {
    return {};
  }
}
function $o(e) {
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
      const v = t.find(($) => $.toolCallId === d.id), b = Pt(v?.content ?? ""), C = e.status === "running", k = v?.error || b.ok === !1 ? "failed" : v?.content && !v.streaming ? "done" : !C || s.error ? v ? "cancelled" : "not-run" : v?.streaming ? "running" : "preparing";
      return {
        id: d.id,
        name: d.name,
        status: k,
        input: Pt(d.arguments),
        result: b
      };
    })
  }));
}
var wo = {
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
function xo(e, c) {
  if (e === "learning_extract_http_failed" || e === "learning_search_failed") {
    if (c === 401) return "联网取材的验证没有通过，请检查联网密钥是否有效。";
    if (c === 403) return "联网服务拒绝了这次请求，请检查账号或接口权限；不一定是密钥填错。";
    if (c === 404 || c === 405) return e === "learning_extract_http_failed" ? "当前联网地址不支持读取正文，请检查联网取材地址，或改读原创文章。" : "当前联网地址不支持搜索，请检查联网取材地址，或改读原创文章。";
    if (c === 429) return "联网服务暂时限制了请求，请稍后重试，并检查剩余额度。";
    if (c && c >= 500) return "联网服务暂时不可用，请稍后重试，或先读原创文章。";
  }
  return wo[e];
}
var Co = ["aria-label"], Io = { class: "learning-process-header" }, Lo = ["aria-expanded"], So = { "aria-hidden": "true" }, Ao = ["disabled", "aria-label"], Ro = ["aria-label"], Mo = ["data-status"], Eo = {
  class: "learning-process-dot",
  "aria-hidden": "true"
}, To = { key: 0 }, No = { class: "learning-process-result" }, Bo = {
  key: 1,
  class: "learning-process-status",
  role: "status",
  "aria-live": "polite"
}, Oo = {
  key: 0,
  class: "learning-working-dot",
  "aria-hidden": "true"
}, qo = {
  key: 2,
  class: "learning-process-recovery"
}, Po = /* @__PURE__ */ te({
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
    const s = e, t = c, u = S(() => $o(s.turn)), d = S(() => u.value.flatMap((o) => o.tools)), v = S(() => s.turn.status === "running"), b = S(() => le.taskTitles[s.turn.purpose]), C = F(null), k = pa(), $ = S(() => C.value ?? (v.value || s.turn.status === "failed" || !!k.default)), m = F(null), y = S(() => s.turn.progress?.round ?? u.value.at(-1)?.index), f = S(() => {
      if (!v.value) return Q.outcomes[s.turn.status];
      const o = u.value.at(-1), x = o?.tools.find((N) => N.status === "running" || N.status === "preparing");
      if (x) return `${Q.tools[x.name] ?? Q.unknownTool} · ${Q[x.status]}`;
      if (s.turn.progress?.stage === "provider" && o?.streaming) {
        if (o.receivedChars) return Q.received(o.receivedChars);
        if (o.thinking) return Q.thinking;
      }
      return El(s.turn.progress ?? { stage: "provider" });
    });
    function w(o) {
      const x = [];
      o.result.error && x.push(xo(o.result.error, o.result.httpStatus));
      const N = o.result.section ?? o.input.section;
      N && Q.sections[N] && x.push(Q.sections[N]), o.result.resultsCount !== void 0 && (!o.result.error || o.result.resultsCount > 0) && x.push(o.name === "LearningExtract" ? Q.extracted(o.result.resultsCount) : Q.results(o.result.resultsCount)), o.result.paragraphCount !== void 0 && x.push(Q.paragraphs(o.result.paragraphCount)), o.result.dataCount !== void 0 && x.push(Q.entries(o.result.dataCount)), o.result.failedCount && (!o.result.error || o.result.failedCount > 1) && x.push(Q.sourcesFailed(o.result.failedCount)), o.name === "LearningLessonEdit" && (o.input.materialsCount && x.push(Q.proposedMaterials(o.input.materialsCount)), o.input.exercisesCount && x.push(Q.proposedExercises(o.input.exercisesCount))), o.result.errorsCount && x.push(Q.issues(o.result.errorsCount));
      const U = (o.result.errorFields ?? []).map((T) => bn[T]).filter(Boolean);
      return U.length && x.push(Q.checkFields([...new Set(U)].join("、"))), x.join(" · ");
    }
    return K(v, () => {
      C.value = null;
    }), K(() => s.turn.messages, async () => {
      const o = m.value, x = !o || o.scrollHeight - o.scrollTop - o.clientHeight < 48;
      await re(), x && m.value && (m.value.scrollTop = m.value.scrollHeight);
    }), (o, x) => v.value || d.value.length || o.$slots.default ? (a(), i("section", {
      key: 0,
      class: se(["learning-process", { "is-running": v.value }]),
      "aria-label": l(Q).title
    }, [
      n("header", Io, [n("button", {
        type: "button",
        class: "learning-process-toggle",
        "aria-expanded": $.value,
        onClick: x[0] || (x[0] = (N) => C.value = !$.value)
      }, [
        n("span", So, r($.value ? "⌄" : "›"), 1),
        n("strong", null, r(b.value ?? l(Q).title), 1),
        n("small", null, r(v.value && y.value ? l(Q).round(y.value) : l(Q).history(d.value.length)), 1)
      ], 8, Lo), v.value && e.stoppable ? (a(), i("button", {
        key: 0,
        type: "button",
        class: "learning-process-stop",
        disabled: e.disabled,
        "aria-label": l(Q).stop,
        onClick: x[1] || (x[1] = (N) => t("stop"))
      }, "■", 8, Ao)) : g("", !0)]),
      $.value ? (a(), i("div", {
        key: 0,
        ref_key: "body",
        ref: m,
        class: "learning-process-body"
      }, [(a(!0), i(E, null, j(u.value, (N) => (a(), i(E, { key: N.index }, [N.text ? (a(), Z(ct, {
        key: 0,
        class: "learning-markdown learning-process-narration",
        text: N.text
      }, null, 8, ["text"])) : g("", !0), N.tools.length ? (a(), i("ol", {
        key: 1,
        class: "learning-process-steps",
        "aria-label": l(Q).round(N.index)
      }, [(a(!0), i(E, null, j(N.tools, (U) => (a(), i("li", {
        key: U.id,
        "data-status": U.status
      }, [
        n("span", Eo, r(U.status === "done" ? "✓" : U.status === "failed" ? "!" : "·"), 1),
        n("div", null, [n("span", null, r(l(Q).tools[U.name] ?? l(Q).unknownTool), 1), w(U) ? (a(), i("small", To, r(w(U)), 1)) : g("", !0)]),
        n("small", No, r(l(Q)[U.status]), 1)
      ], 8, Mo))), 128))], 8, Ro)) : g("", !0)], 64))), 128))], 512)) : g("", !0),
      v.value || !o.$slots.default && e.turn.status === "finished" && (!b.value || $.value) ? (a(), i("p", Bo, [v.value ? (a(), i("span", Oo)) : g("", !0), H(r(f.value), 1)])) : g("", !0),
      o.$slots.default ? (a(), i("div", qo, [da(o.$slots, "default")])) : g("", !0)
    ], 10, Co)) : g("", !0);
  }
}), sa = Po;
function Pe(e, c, s) {
  return e.notice === "history-save" && c !== "ready" || e.notice === "learning-save" && s !== "ready" ? "" : e.message;
}
function he(e) {
  return e.kind === "prepare";
}
function Ze(e) {
  return e.kind === "talk" || e.kind === "companion";
}
var Vt = {
  initial: "我想跟你学这门语言，先聊聊吧。",
  returning: "我来继续学语言了，先聊聊今天从哪里开始吧。"
}, Vo = { class: "learning-messages" }, _o = /* @__PURE__ */ te({
  __name: "LearningMessages",
  props: {
    turn: {},
    disabled: { type: Boolean }
  },
  emits: ["stop"],
  setup(e, { emit: c }) {
    const s = e, t = c, u = S(() => s.turn.messages.filter((d) => d.role === "assistant" && !d.toolCalls?.length && d.content));
    return (d, v) => (a(), i("div", Vo, [W(sa, {
      turn: e.turn,
      stoppable: "",
      disabled: e.disabled,
      onStop: v[0] || (v[0] = (b) => t("stop"))
    }, null, 8, ["turn", "disabled"]), (a(!0), i(E, null, j(u.value, (b, C) => (a(), i("div", {
      key: C,
      class: se(["learning-output", { "is-streaming": b.streaming }])
    }, [W(ct, {
      class: "learning-markdown",
      text: b.content
    }, null, 8, ["text"])], 2))), 128))]));
  }
}), Do = _o, Uo = { class: "learning-conversation" }, jo = { class: "learning-conversation-heading" }, Wo = {
  class: "learning-person-initial",
  "aria-hidden": "true"
}, Go = ["disabled"], Fo = ["aria-label"], Ho = ["aria-label"], zo = {
  key: 0,
  class: "learning-history-notice"
}, Yo = {
  key: 0,
  class: "learning-conversation-user"
}, Ko = {
  key: 1,
  class: "learning-turn-recovery"
}, Zo = ["disabled", "onClick"], Jo = ["disabled", "onClick"], Qo = {
  key: 3,
  class: "learning-conversation-tools"
}, Xo = ["disabled"], eu = ["disabled"], tu = {
  key: 1,
  class: "learning-working",
  role: "status"
}, au = {
  key: 2,
  class: "learning-turn-notice is-error",
  role: "status"
}, nu = {
  key: 3,
  class: "learning-conversation-empty"
}, iu = ["disabled"], lu = { class: "learning-composer-surface" }, su = {
  key: 0,
  class: "learning-composer-quote"
}, ru = { class: "learning-composer-row" }, ou = [
  "disabled",
  "maxlength",
  "aria-label",
  "placeholder"
], uu = [
  "type",
  "disabled",
  "aria-label",
  "title"
], du = /* @__PURE__ */ te({
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
    const t = e, u = S(() => t.target === "workbench" ? t.state.workbenchConversation : t.state.conversation), d = S(() => t.target === "workbench" ? t.state.workbenchBusy : t.state.chatBusy), v = S(() => t.target === "workbench" ? t.state.workbenchMessage : t.state.chatMessage), b = S(() => t.target === "workbench" ? t.state.workbenchStorage : t.state.chatStorage), C = S(() => t.target === "workbench" ? t.state.reply : t.state.companionReply), k = S(() => t.target === "workbench" ? X.assistant : t.state.teacher?.name ?? "语伴"), $ = S(() => u.value.turns.map((L, O) => ({
      turn: L,
      index: O
    })).filter(({ turn: L }) => !he({ kind: L.purpose ?? "talk" }) || L.status === "running")), m = {
      conversation: "和语伴聊天",
      history: "更早的聊天已收起",
      empty: "今天想聊什么？",
      select: "先选一位语伴",
      opening: "打个招呼"
    }, y = /* @__PURE__ */ new Set([
      "prepare",
      "complete",
      "grade",
      "revision-review",
      "model-essay",
      "review-prepare",
      "review-assess",
      "companion"
    ]), f = s, w = Ee(), o = t.target === "workbench" ? w.workbenchChat : w.chat, x = (L, O = {}) => f("action", L, {
      ...O,
      target: t.target
    }), N = ke(o, "text"), U = F(null), T = F(null), J = F(null), z = ke(o, "focus");
    let M = null, A = 0;
    function I() {
      const L = J.value;
      L && (o.scroll = L.scrollTop, o.following = L.scrollHeight - L.scrollTop - L.clientHeight < 70);
    }
    async function q() {
      await re(), o.following && J.value && (J.value.scrollTop = J.value.scrollHeight);
    }
    function G() {
      const L = U.value;
      L?.clientWidth && (L.style.height = "auto", L.style.height = `${L.scrollHeight}px`, q());
    }
    K(N, G, { flush: "post" }), K(U, (L) => {
      if (M?.disconnect(), cancelAnimationFrame(A), !L) return;
      let O = 0;
      M = new ResizeObserver(([_]) => {
        _.contentRect.width !== O && (O = _.contentRect.width, cancelAnimationFrame(A), A = requestAnimationFrame(G));
      }), M.observe(L.parentElement);
    }, { flush: "post" }), Re(() => {
      J.value && (J.value.scrollTop = o.scroll), q();
    }), Me(() => {
      J.value && (o.scroll = J.value.scrollTop), M?.disconnect(), cancelAnimationFrame(A);
    });
    function B() {
      if (t.disabled || !N.value.trim()) return;
      const L = N.value.trim();
      o.sent = {
        text: N.value,
        user: z.value?.selection ? `${L}

${z.value.selection.quote}` : L,
        after: u.value.turns.length + u.value.removedTurns
      }, o.following = !0, x("talk", {
        message: L,
        ...z.value ?? o.study ?? {}
      });
    }
    function V(L) {
      L.key !== "Enter" || L.shiftKey || L.isComposing || L.keyCode === 229 || (L.preventDefault(), B());
    }
    K([() => u.value.turns, () => d.value], q);
    function D(L) {
      const O = [t.state.unit, t.state.review].find((_) => _?.id === L.unitId);
      return !!O && (L.kind === "exercise" ? O.exercises : O.materials).some((_) => _.id === L.id);
    }
    const P = S(() => t.state.unit?.id === C.value?.unitId ? t.state.unit : null);
    return c({
      async ask(L, O, _ = t.state.unit?.id) {
        z.value = {
          unitId: _,
          exerciseId: L,
          selection: O,
          help: !!L && !O
        }, o.study = _ ? {
          unitId: _,
          exerciseId: L
        } : null, await re(), U.value?.focus();
      },
      focusHeading: () => T.value?.focus({ preventScroll: !0 })
    }), (L, O) => (a(), i("section", Uo, [
      n("header", jo, [
        n("span", Wo, r(e.target === "workbench" ? "a" : [...k.value][0]), 1),
        n("h1", {
          ref_key: "heading",
          ref: T,
          tabindex: "-1"
        }, r(k.value), 513),
        e.target === "companion" ? (a(), i("button", {
          key: 0,
          type: "button",
          disabled: e.disabled,
          "aria-label": "更换学习语言和语伴",
          onClick: O[0] || (O[0] = (_) => f("profile"))
        }, r(new Intl.DisplayNames(["zh-CN"], { type: "language" }).of(e.state.language)), 9, Go)) : (a(), i("button", {
          key: 1,
          type: "button",
          "aria-label": l(X).closeAssistant,
          onClick: O[1] || (O[1] = (_) => f("close"))
        }, [W(Y, { name: "close" })], 8, Fo))
      ]),
      n("div", {
        ref_key: "scroller",
        ref: J,
        class: "learning-conversation-turns",
        "aria-label": e.target === "workbench" ? l(X).assistant : m.conversation,
        onScroll: I
      }, [
        u.value.removedTurns ? (a(), i("p", zo, r(m.history), 1)) : g("", !0),
        (a(!0), i(E, null, j($.value, ({ turn: _, index: ue }, Ne) => (a(), i("div", {
          key: u.value.removedTurns + ue,
          class: "learning-conversation-turn"
        }, [
          _.user && !l(y).has(_.purpose) && !l(he)({ kind: _.purpose ?? "talk" }) ? (a(), i("p", Yo, r(_.user), 1)) : g("", !0),
          W(Do, {
            turn: _,
            disabled: e.pending,
            onStop: (pe) => x(l(Ze)({ kind: _.purpose ?? "talk" }) ? "cancel-chat" : l(he)({ kind: _.purpose ?? "talk" }) ? "cancel-preparation" : "cancel")
          }, null, 8, [
            "turn",
            "disabled",
            "onStop"
          ]),
          l(Pe)(_, b.value, e.state.storage) || _.retryable ? (a(), i("div", Ko, [l(Pe)(_, b.value, e.state.storage) ? (a(), i("p", {
            key: 0,
            class: se(["learning-turn-notice", { "is-error": _.status === "failed" }]),
            role: "status"
          }, r(l(Pe)(_, b.value, e.state.storage)), 3)) : g("", !0), _.retryable ? (a(), i("button", {
            key: 1,
            type: "button",
            disabled: e.disabled || e.pending,
            onClick: (pe) => x("retry-chat", { id: _.id })
          }, r(l(X).retry), 9, Zo)) : g("", !0)])) : g("", !0),
          _.presentation ? (a(), i("button", {
            key: 2,
            type: "button",
            class: "learning-activity-link",
            disabled: !D(_.presentation),
            onClick: (pe) => f("present", _.presentation)
          }, [
            W(Y, { name: _.presentation.kind === "material" ? "book" : "records" }, null, 8, ["name"]),
            n("span", null, r(_.presentation.title), 1),
            W(Y, { name: "arrow" })
          ], 8, Jo)) : g("", !0),
          Ne === $.value.length - 1 && C.value?.text === _.teacher ? (a(), i("div", Qo, [[..._.teacher].length <= 1e3 ? (a(), i("button", {
            key: 0,
            type: "button",
            disabled: e.disabled,
            onClick: O[2] || (O[2] = (pe) => x("say-reply"))
          }, [W(Y, { name: "sound" }), H(r(l(X).listen), 1)], 8, Xo)) : g("", !0), C.value.exerciseId && P.value && [..._.teacher].length <= 4e3 ? (a(), i("button", {
            key: 1,
            type: "button",
            disabled: e.disabled || P.value.notes.some((pe) => pe.text === _.teacher),
            onClick: O[3] || (O[3] = (pe) => x("save-note", { unitId: P.value.id }))
          }, r(l(X).saveNote), 9, eu)) : g("", !0)])) : g("", !0)
        ]))), 128)),
        d.value && !u.value.turns.some((_) => _.status === "running" && l(Ze)({ kind: _.purpose ?? "talk" })) ? (a(), i("div", tu, [O[9] || (O[9] = n("span", {
          class: "learning-working-dot",
          "aria-hidden": "true"
        }, null, -1)), n("span", null, r(v.value), 1)])) : !d.value && v.value && b.value === "ready" ? (a(), i("p", au, r(v.value), 1)) : g("", !0),
        !$.value.length && !d.value ? (a(), i("div", nu, [
          W(Y, { name: "chat" }),
          n("p", null, r(e.target === "workbench" ? l(X).assistantEmpty : e.state.teacher ? m.empty : m.select), 1),
          e.target === "companion" && !e.state.teacher ? (a(), i("button", {
            key: 0,
            class: "learning-primary",
            type: "button",
            onClick: O[4] || (O[4] = (_) => f("profile"))
          }, r(m.select), 1)) : e.target === "companion" ? (a(), i("button", {
            key: 1,
            type: "button",
            disabled: e.disabled,
            onClick: O[5] || (O[5] = (_) => x("talk", { message: e.state.profile ? l(Vt).returning : l(Vt).initial }))
          }, r(m.opening), 9, iu)) : g("", !0)
        ])) : g("", !0)
      ], 40, Ho),
      e.target === "workbench" || e.state.teacher ? (a(), i("form", {
        key: 0,
        class: "learning-conversation-compose",
        onSubmit: oe(B, ["prevent"])
      }, [n("div", lu, [z.value ? (a(), i("div", su, [n("span", null, r(z.value.selection?.quote ?? "请教这道题"), 1), n("button", {
        type: "button",
        "aria-label": "取消引用",
        onClick: O[6] || (O[6] = (_) => z.value = null)
      }, "×")])) : g("", !0), n("div", ru, [ne(n("textarea", {
        ref_key: "composer",
        ref: U,
        "onUpdate:modelValue": O[7] || (O[7] = (_) => N.value = _),
        rows: "1",
        disabled: b.value !== "ready",
        maxlength: z.value?.selection ? 1800 : z.value?.exerciseId ? 2e3 : 4e3,
        "aria-label": e.target === "workbench" ? l(X).assistantPlaceholder : "和语伴说",
        placeholder: e.target === "workbench" ? l(X).assistantPlaceholder : "和语伴说…",
        onKeydown: V
      }, null, 40, ou), [[ve, N.value], [l(Je), l(o)]]), n("button", {
        type: d.value ? "button" : "submit",
        class: se(d.value ? "learning-composer-stop" : "learning-primary"),
        disabled: d.value ? e.pending : e.disabled || !N.value.trim(),
        "aria-label": d.value ? l(X).stop : l(X).send,
        title: d.value ? l(X).stop : l(X).send,
        onClick: O[8] || (O[8] = oe((_) => d.value ? x("cancel-chat") : B(), ["prevent"]))
      }, [W(Y, { name: d.value ? "stop" : "send" }, null, 8, ["name"])], 10, uu)])])], 32)) : g("", !0)
    ]));
  }
}), _t = du;
function vu(e) {
  const c = ya(structuredClone($a(e.initialState))), s = F(!1), t = F(null), u = S(() => t.value ? Gt[t.value] : ""), d = S(() => t.value === "unknown" || t.value === "rejected");
  let v = !1, b = 0, C = () => {
  };
  const k = (f) => !s.value && fe(f, c.value), $ = S(() => k("submit")), m = S(() => k("talk"));
  async function y(f, w = {}) {
    if (s.value) return;
    if (ut(js(f, w.target), c.value)) {
      t.value = "busy";
      return;
    }
    s.value = !0, t.value = null;
    const o = c.value.chatIdentity, x = b;
    let N = !1;
    try {
      const U = JSON.parse(JSON.stringify({
        chatIdentity: o,
        ...w
      }));
      N = !0;
      const T = await e.bridge.request(`learning/${f}`, U, 35e3);
      return !v || c.value.chatIdentity !== o ? void 0 : (b === x && T.result.state.chatIdentity === o && (c.value = T.result.state), T.result.rejected && (t.value = T.result.rejected), T.result);
    } catch (U) {
      v && c.value.chatIdentity === o && (t.value = !N || U instanceof wa && U.code === "host_request_not_sent" ? "notSent" : U instanceof ka ? "rejected" : "unknown");
    } finally {
      v && (s.value = !1);
    }
  }
  return Re(() => {
    v = !0, C = e.bridge.subscribe((f) => {
      if (f.type === "learning/media") {
        c.value = {
          ...c.value,
          media: f.payload.media
        };
        return;
      }
      if (f.type !== "learning/state") return;
      const w = f.payload.state;
      w.chatIdentity === c.value.chatIdentity && (b++, c.value = w);
    });
  }), Me(() => {
    v = !1, C();
  }), {
    state: c,
    pending: s,
    writable: $,
    canChat: m,
    canRequest: k,
    localIssue: t,
    localMessage: u,
    needsRefresh: d,
    request: y
  };
}
function cu(e = Math.random) {
  return Math.round(3 * 6e4 + Math.min(Math.max(e(), 0), 1) * 9 * 6e4);
}
function gu(e) {
  let c = !1, s, t = 0;
  function u() {
    s !== void 0 && (e.clearTimer(s), s = void 0);
  }
  function d() {
    if (!c) return;
    const v = t;
    s = e.setTimer(() => {
      v === t && (s = void 0, c && (e.opportunity(), d()));
    }, cu(e.random));
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
function pu(e) {
  const c = F(!1), s = F(!1), t = F(!1), u = F(!1), d = F("");
  let v, b;
  const C = S(() => e.preference.enabled && e.reading.value && c.value && !e.blocked.value && !!e.state.value.teacher && e.state.value.storage === "ready"), k = S(() => C.value && !s.value && !t.value && !u.value && !e.pending.value && !e.state.value.busy && !e.state.value.chatBusy && !e.state.value.companionBusy);
  function $() {
    const T = e.root.value?.querySelector(".learning-scroll")?.getBoundingClientRect(), J = T?.top ?? 0, z = [...e.root.value?.querySelectorAll("[data-material-id][data-paragraph-id]") ?? []].find((M) => M.getBoundingClientRect().bottom > J + 60 && M.getBoundingClientRect().top < (T?.bottom ?? 0));
    return z ? {
      materialId: z.dataset.materialId,
      paragraphId: z.dataset.paragraphId
    } : null;
  }
  const m = gu({
    setTimer: (T, J) => setTimeout(T, J),
    clearTimer: (T) => clearTimeout(T),
    opportunity: () => {
      const T = $();
      T && e.request("companion", T);
    }
  });
  K(k, (T) => m.update(T), { immediate: !0 }), K([
    C,
    s,
    t,
    u,
    e.pending,
    () => e.state.value.companionBusy
  ], ([T, J, z, M, A, I]) => {
    I && !A && (!T || J || z || M) && e.request("cancel-companion");
  });
  function y() {
    const T = document.activeElement;
    s.value = T instanceof HTMLElement && !!e.root.value?.contains(T) && T.matches("textarea, input:not([type=checkbox],[type=radio],[type=range]), [contenteditable=true]");
  }
  const f = () => queueMicrotask(y);
  function w() {
    const T = document.getSelection();
    t.value = !!T && !T.isCollapsed && !!e.root.value?.contains(T.anchorNode);
  }
  function o() {
    clearTimeout(v), u.value = !0, v = setTimeout(() => {
      u.value = !1;
    }, 3e4);
  }
  function x(T) {
    !(T.target instanceof HTMLElement) || !T.target.matches("textarea, input:not([type=checkbox],[type=radio],[type=range]), [contenteditable=true]") || o();
  }
  function N() {
    c.value = document.visibilityState === "visible", c.value || (clearTimeout(v), u.value = !1, U()), y();
  }
  function U() {
    clearTimeout(b), d.value = "";
  }
  return K(() => e.state.value.remark?.text ?? "", (T) => {
    U(), T && e.reading.value && c.value && !s.value && !t.value && !u.value && !e.blocked.value && (d.value = T, b = setTimeout(U, 1e4));
  }), K([
    e.reading,
    e.blocked,
    s,
    t,
    u
  ], ([T, J, z, M, A]) => {
    (!T || J || z || M || A) && U();
  }), Re(() => {
    N(), document.addEventListener("visibilitychange", N), document.addEventListener("selectionchange", w), e.root.value?.addEventListener("pointerdown", o), e.root.value?.addEventListener("focusin", f), e.root.value?.addEventListener("focusout", f), e.root.value?.addEventListener("input", x);
  }), Me(() => {
    m.dispose(), clearTimeout(v), U(), document.removeEventListener("visibilitychange", N), document.removeEventListener("selectionchange", w), e.root.value?.removeEventListener("pointerdown", o), e.root.value?.removeEventListener("focusin", f), e.root.value?.removeEventListener("focusout", f), e.root.value?.removeEventListener("input", x);
  }), {
    bubble: d,
    dismiss: U
  };
}
var bu = { class: "learning-toolbar" }, mu = {
  key: 0,
  class: "learning-unread-dot",
  "aria-hidden": "true"
}, fu = {
  key: 1,
  class: "learning-layout-control"
}, ku = ["min", "max"], yu = ["aria-label", "aria-expanded"], hu = { "aria-label": "学习资料与设置" }, $u = { "aria-label": "学习资料与设置" }, wu = ["onClick"], xu = {
  key: 0,
  class: "learning-notice",
  role: "status",
  "aria-live": "polite"
}, Cu = { class: "learning-row" }, Iu = ["disabled"], Lu = ["disabled"], Su = ["disabled"], Au = ["disabled"], Ru = {
  key: 1,
  class: "learning-notice",
  role: "status",
  "aria-live": "polite"
}, Mu = { class: "learning-row" }, Eu = ["disabled"], Tu = ["disabled"], Nu = {
  key: 2,
  class: "learning-notice",
  role: "status"
}, Bu = ["disabled"], Ou = ["disabled"], qu = ["inert", "aria-hidden"], Pu = {
  key: 2,
  class: "learning-working",
  role: "status"
}, Vu = ["disabled"], _u = {
  key: 5,
  class: "learning-materials-page"
}, Du = {
  key: 0,
  class: "learning-empty-note"
}, Uu = { class: "learning-materials-title" }, ju = ["onClick"], Wu = ["onClick"], Gu = {
  key: 0,
  class: "learning-notes"
}, Fu = { key: 0 }, Hu = ["disabled", "onClick"], zu = {
  key: 7,
  class: "learning-harvest-page"
}, Yu = {
  key: 0,
  class: "learning-empty-note"
}, Ku = { key: 0 }, Zu = { class: "learning-muted" }, Ju = ["disabled", "onClick"], Qu = ["disabled"], Xu = ["disabled"], ed = {
  key: 3,
  class: "learning-row"
}, td = ["disabled"], ad = ["disabled"], nd = {
  key: 8,
  class: "learning-settings-page"
}, id = ["value", "disabled"], ld = ["value"], sd = {
  key: 0,
  class: "learning-settings-goal"
}, rd = {
  key: 0,
  class: "learning-muted"
}, od = ["value", "disabled"], ud = ["disabled"], dd = ["disabled"], vd = ["disabled"], cd = ["disabled"], gd = ["disabled"], pd = ["disabled"], bd = ["disabled"], md = ["disabled"], fd = ["inert", "aria-hidden"], kd = ["aria-label"], yd = { class: "learning-person-initial" }, hd = {
  key: 0,
  class: "learning-unread-dot",
  "aria-hidden": "true"
}, $d = ["aria-label"], wd = {
  key: 0,
  class: "learning-unread-dot",
  "aria-hidden": "true"
}, xd = {
  role: "alertdialog",
  "aria-labelledby": "learning-confirm-title",
  class: "learning-confirm"
}, Cd = { id: "learning-confirm-title" }, Id = { class: "learning-row" }, Ld = ["disabled"], Sd = /* @__PURE__ */ te({
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
    }, { state: t, pending: u, writable: d, canChat: v, canRequest: b, localMessage: C, needsRefresh: k, request: $ } = vu(c), m = An(t);
    async function y(R, p = {}, h = !1) {
      if (!h && Sn(m, t.value, R, p)) {
        ce(R, p, R === "teacher" ? $e.companion : $e.context);
        return;
      }
      return $(R, p);
    }
    const f = F(t.value.profile ? "home" : "profile"), w = [], o = F(null), x = F(!1);
    Ke(() => o.value?.open ? (o.value.open = !1, !0) : !1, () => x.value);
    const N = F(null), U = F(null), T = F(!1), J = F(null), z = F(null), M = F(null), A = {}, I = F(null), q = F(0), G = S(() => q.value >= 760 && !!t.value.teacher), B = F("work"), V = F(!0), D = F(!1), P = F(62), L = S(() => Math.max(42, Math.ceil(320 / Math.max(q.value, 1) * 100))), O = S(() => Math.min(68, Math.floor((1 - 320 / Math.max(q.value, 1)) * 100))), _ = S({
      get: () => G.value ? Math.min(O.value, Math.max(L.value, P.value)) : P.value,
      set: (R) => {
        P.value = R;
      }
    }), ue = F(!1);
    let Ne, pe;
    const Qe = () => {
      ue.value = pe?.matches ?? !1;
    };
    Re(() => {
      pe = matchMedia("(prefers-reduced-motion: reduce)"), Qe(), pe.addEventListener("change", Qe), !(!I.value || typeof ResizeObserver > "u") && (Ne = new ResizeObserver(([R]) => {
        q.value = R?.contentRect.width ?? 0;
      }), Ne.observe(I.value));
    }), Me(() => {
      Ne?.disconnect(), pe?.removeEventListener("change", Qe);
    });
    const be = S(() => G.value || B.value === "work"), Ve = S(() => !!t.value.teacher && (G.value || B.value === "chat"));
    K([
      be,
      Ve,
      ue
    ], async ([R, p, h], ae, Fe) => {
      let Oe = !0, It;
      if (Fe(() => {
        Oe = !1, clearTimeout(It);
      }), R && (V.value = !0), p && (D.value = !0), await re(), !Oe) return;
      R && M.value && (M.value.scrollTop = A[f.value] ?? 0);
      const Lt = () => {
        V.value = R, D.value = p;
      };
      G.value || h ? Lt() : It = setTimeout(Lt, 320);
    }, { immediate: !0 });
    function _e() {
      be.value && M.value && !T.value && (A[f.value] = M.value.scrollTop), Be();
    }
    async function Be(R) {
      const p = R?.target instanceof Element ? R.target : null;
      if (await re(), !be.value || f.value !== "home" || !M.value) return;
      const h = M.value.getBoundingClientRect(), ae = p?.closest("[data-learning-unit-id]") ?? [...M.value.querySelectorAll("[data-learning-unit-id]")].find((Fe) => {
        const Oe = Fe.getBoundingClientRect();
        return Oe.bottom > h.top + 48 && Oe.top < h.bottom;
      });
      ae?.dataset.learningUnitId && (m.chat.study = {
        unitId: ae.dataset.learningUnitId,
        exerciseId: ae.dataset.exerciseId
      });
    }
    K([
      M,
      f,
      be
    ], () => {
      Be();
    }, { flush: "post" });
    const Xe = S(() => {
      const { turns: R, removedTurns: p } = t.value.conversation;
      let h = R.length - 1;
      for (; h >= 0 && he({ kind: R[h].purpose ?? "talk" }); ) h--;
      return h < 0 ? 0 : p + h + 1;
    }), et = F(Xe.value);
    K([Xe, Ve], ([R, p]) => {
      (p || R < et.value) && (et.value = R);
    }, { immediate: !0 });
    const ft = S(() => Xe.value > et.value), de = S(() => {
      const R = t.value.workbenchConversation.turns;
      let p = R.length - 1;
      for (; p >= 0 && Ze({ kind: R[p].purpose ?? "talk" }); ) p--;
      let h = R.length - 1;
      for (; h >= 0 && (R[h].status !== "running" || Ze({ kind: R[h].purpose ?? "talk" })); ) h--;
      return h >= 0 && (p = h), p < 0 ? null : {
        turn: t.value.workbenchConversation.turns[p],
        key: `${t.value.chatIdentity}:${t.value.language}:${t.value.workbenchConversation.removedTurns + p}`
      };
    });
    async function kt() {
      t.value.teacher && (await Be(), _e(), B.value = "chat", D.value = !0, await re(), B.value === "chat" && N.value?.focusHeading());
    }
    async function De() {
      V.value = !0, B.value = "work", await re(), M.value && (M.value.scrollTop = A[f.value] ?? 0);
      const R = M.value?.querySelector("h1, h2");
      R && (R.tabIndex = -1, R.focus({ preventScroll: !0 }));
    }
    let yt = 0;
    K(() => !!t.value.record, async (R, p) => {
      f.value !== "books" || R === p || (R && (yt = M.value?.scrollTop ?? 0), await re(), f.value === "books" && M.value && (M.value.scrollTop = R ? 0 : yt));
    });
    const ie = F(null), ht = F(null);
    vt(ht, () => {
      ie.value = null;
    });
    const Ue = F(t.value.profile?.voice?.voiceId ?? t.value.voices.defaultVoice), je = F(t.value.profile?.voice?.language ?? t.value.language), We = F(t.value.profile?.voice?.speed ?? 1), we = F(0), ra = S(() => t.value.completions.slice(we.value * 20, (we.value + 1) * 20));
    K([() => t.value.language, () => t.value.profile?.voice], ([R, p]) => {
      Ue.value = p?.voiceId ?? t.value.voices.defaultVoice, je.value = p?.language ?? R, We.value = p?.speed ?? 1;
    }), K([
      () => t.value.chatIdentity,
      () => t.value.language,
      () => t.value.teacher?.name
    ], () => {
      z.value = null, ie.value = null, we.value = 0;
    }), K(() => !!t.value.teacher, (R) => {
      R || (B.value = "work");
    }), K(() => t.value.currentUnitId, (R) => {
      ie.value?.action === "replace-lesson" && ie.value.input.unitId !== R && (ie.value = null);
    }), K(() => t.value.unit, (R) => {
      const p = z.value;
      p && (R?.id !== p.unitId || !(p.kind === "exercise" ? R.exercises : R.materials).some((h) => h.id === p.id)) && tt();
    });
    for (const R of ["conversation", "workbenchConversation"]) K(() => {
      const p = t.value[R].turns.at(-1)?.presentation;
      return p ? `${t.value[R].turns.length + t.value[R].removedTurns}:${p.unitId}:${p.kind}:${p.id}` : "";
    }, (p) => {
      const h = t.value[R].turns.at(-1)?.presentation;
      p && h && Ie(h, !0);
    });
    const Ce = F(!1);
    K([be, f], ([R, p]) => {
      R && p === "home" && (Ce.value = !1);
    });
    async function Ie(R, p = !1) {
      if (t.value.review?.id === R.unitId) {
        if (p) {
          (!be.value || f.value !== "home") && (Ce.value = !0);
          return;
        }
        const h = m.unit(R.unitId).review;
        R.kind === "exercise" && (h.index = t.value.review.exercises.findIndex((ae) => ae.id === R.id)), h.expanded = !0, await it();
        return;
      }
      if (t.value.unit?.id === R.unitId) {
        if (t.value.unit.kind === "reading-writing") {
          if (p) {
            (!be.value || f.value !== "home") && (Ce.value = !0);
            return;
          }
          m.unit(R.unitId).reading.view = "reading", await me("home");
          const h = R.kind === "exercise" ? `[data-exercise-id="${CSS.escape(R.id)}"]` : `[data-material-id="${CSS.escape(R.id)}"][data-paragraph-id]`;
          M.value?.querySelector(h)?.scrollIntoView({
            block: "start",
            behavior: matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth"
          });
          return;
        }
        z.value = R;
      }
    }
    function tt() {
      z.value = null, y("stop");
    }
    async function at(R, p) {
      T.value || _e(), T.value = !0, await De(), await re(), R ? await U.value?.ask(R, void 0, p) : U.value?.focusHeading();
    }
    async function nt() {
      T.value = !1, await re(), M.value && (M.value.scrollTop = A[f.value] ?? 0), J.value?.focus({ preventScroll: !0 });
    }
    async function $t(R, p, h) {
      if (!t.value.teacher) {
        await at(R, h), p && await U.value?.ask(R, p, h);
        return;
      }
      tt(), _e(), B.value = "chat", D.value = !0, await re(), await N.value?.ask(R, p, h);
    }
    async function me(R, p = !1) {
      if (T.value = !1, R !== f.value && !p) if (R === "home") w.length = 0;
      else {
        const h = w.indexOf(R);
        h >= 0 ? w.splice(h) : w.push(f.value);
      }
      if (M.value && (A[f.value] = M.value.scrollTop), o.value && (o.value.open = !1), f.value = R, await De(), await re(), M.value) {
        M.value.scrollTop = A[R] ?? 0;
        const h = [...M.value.querySelectorAll("h1, h2")].find((ae) => ae.offsetParent !== null);
        h && (h.tabIndex = -1, h.focus({ preventScroll: !0 }));
      }
    }
    function wt() {
      m.setup.step = 0, me("profile");
    }
    async function it() {
      await me("home"), M.value && (M.value.scrollTop = 0);
      const R = M.value?.querySelector("#learning-review-title");
      R && (R.tabIndex = -1, R.focus({ preventScroll: !0 }));
    }
    async function Ge(R, p = {}, h = !1) {
      if (R === "prepare" && !t.value.profile) {
        m.setup.step = 2, await me("profile");
        return;
      }
      R === "start-review" && await it();
      const ae = t.value.unit;
      ae?.kind === "reading-writing" && p.unitId === ae.id && [
        "grade",
        "submit-revision",
        "skip-revision"
      ].includes(R) && (m.unit(ae.id).reading.view = R === "skip-revision" && ae.modelEssay ? "model" : "feedback", await me("home"), M.value && (M.value.scrollTop = 0)), await y(R, p, h);
    }
    K(() => m.settings.submitted, (R, p) => {
      !R && p && !m.settings.open && f.value === "profile" && m.setup.step === 2 && t.value.storage === "ready" && !t.value.busy && t.value.profile && Object.entries(p.value).every(([h, ae]) => t.value.profile.settings[h] === ae) && me("home");
    }), K(() => t.value.busy, (R) => {
      const p = t.value.unit;
      !R && p?.stage.stage === "revising" && m.unit(p.id).reading.view === "model" && (m.unit(p.id).reading.view = "feedback");
    });
    const xt = Ke(() => o.value?.open ? (o.value.open = !1, !0) : T.value && be.value ? (nt(), !0) : !G.value && B.value === "chat" ? (De(), !0) : f.value === "home" || !w.length && f.value === "profile" && !t.value.teacher ? !1 : (me(w.pop() ?? "home", !0), !0));
    function ce(R, p, h) {
      ie.value = {
        action: R,
        input: p,
        text: h
      };
    }
    async function oa(R) {
      await y("records", {
        id: R,
        offset: t.value.records.offset
      }), t.value.record?.id === R && await me("books");
    }
    const { bubble: Ct, dismiss: lt } = pu({
      root: I,
      state: t,
      pending: u,
      preference: m.companion,
      reading: S(() => be.value && f.value === "home" && t.value.unit?.kind === "reading-writing" && [
        "writing",
        "grading",
        "complete"
      ].includes(t.value.unit.stage.stage)),
      blocked: S(() => T.value || !!z.value || !!ie.value || x.value),
      request: y
    });
    async function ua() {
      const R = await y("export");
      if (!R?.document) return;
      const p = URL.createObjectURL(new Blob([JSON.stringify(R.document, null, 2)], { type: "application/json" })), h = document.createElement("a");
      h.href = p, h.download = "LittleWhiteBox_Learning.json", h.click(), setTimeout(() => URL.revokeObjectURL(p), 1e3);
    }
    return (R, p) => (a(), i("section", {
      ref_key: "root",
      ref: I,
      class: "learning-app",
      style: Dt({
        "--learning-switch-ms": `${l(320)}ms`,
        "--learning-work-share": `${_.value}%`
      }),
      "aria-label": "语伴语言学习"
    }, [
      n("header", bu, [
        f.value !== "home" && (l(t).teacher || w.length) && (G.value || B.value === "work") ? (a(), i("button", {
          key: 0,
          type: "button",
          class: "learning-toolbar-back",
          "aria-label": "返回上一页",
          onClick: p[0] || (p[0] = (...h) => l(xt) && l(xt)(...h))
        }, [W(Y, { name: "back" })])) : g("", !0),
        n("button", {
          type: "button",
          class: "learning-wordmark",
          onClick: p[1] || (p[1] = (h) => me("home"))
        }, [
          p[37] || (p[37] = n("span", {
            class: "learning-brand-mark",
            "aria-hidden": "true"
          }, [H("a"), n("span", null, "あ")], -1)),
          p[38] || (p[38] = H("语伴", -1)),
          Ce.value && (G.value || B.value === "work") ? (a(), i("span", mu)) : g("", !0)
        ]),
        G.value && l(t).teacher ? (a(), i("label", fu, [
          W(Y, { name: "workbook" }),
          ne(n("input", {
            "onUpdate:modelValue": p[2] || (p[2] = (h) => _.value = h),
            type: "range",
            min: L.value,
            max: O.value,
            step: "1",
            "aria-label": "阅读区宽度比例"
          }, null, 8, ku), [[
            ve,
            _.value,
            void 0,
            { number: !0 }
          ]]),
          W(Y, { name: "chat" })
        ])) : g("", !0),
        n("button", {
          ref_key: "assistantButton",
          ref: J,
          type: "button",
          class: "learning-assistant-button",
          "aria-label": l(X).assistant,
          "aria-expanded": T.value,
          onClick: p[3] || (p[3] = (h) => T.value ? nt() : at())
        }, [W(Y, { name: "chat" }), n("span", null, r(l(X).assistant), 1)], 8, yu),
        n("details", {
          ref_key: "menu",
          ref: o,
          class: "learning-menu",
          onToggle: p[4] || (p[4] = (h) => x.value = !!o.value?.open),
          onKeydown: p[5] || (p[5] = Se(oe((h) => o.value.open = !1, ["stop", "prevent"]), ["esc"]))
        }, [n("summary", hu, [W(Y, { name: "more" })]), n("nav", $u, [(a(), i(E, null, j([
          ["books", "语法本与生词本"],
          ["materials", "课件与笔记"],
          ["harvest", "我的收获"],
          ["settings", "设置"]
        ], ([h, ae]) => n("button", {
          key: h,
          type: "button",
          onClick: (Fe) => me(h)
        }, r(ae), 9, wu)), 64))])], 544)
      ]),
      l(C) || !l(t).busy && (l(t).message || l(t).storage !== "ready") ? (a(), i("div", xu, [H(r(l(C) || l(t).message || (l(t).storage === "unconfirmed" ? l(rt).unconfirmed : l(t).storage === "conflict" ? l(rt).conflict : l(rt).unloaded)) + " ", 1), n("div", Cu, [
        l(t).storage === "unconfirmed" || l(t).storage === "conflict" ? (a(), i("button", {
          key: 0,
          type: "button",
          disabled: l(u),
          onClick: p[6] || (p[6] = (h) => y("verify"))
        }, r(s.verify), 9, Iu)) : g("", !0),
        l(t).storage === "unconfirmed" ? (a(), i("button", {
          key: 1,
          type: "button",
          disabled: l(u),
          onClick: p[7] || (p[7] = (h) => y("retry-save"))
        }, r(s.retry), 9, Lu)) : g("", !0),
        l(t).storage === "conflict" ? (a(), i("button", {
          key: 2,
          type: "button",
          disabled: l(u),
          onClick: p[8] || (p[8] = (h) => ce("adopt-server", {}, s.adoptWarning))
        }, r(s.adopt), 9, Su)) : g("", !0),
        l(t).storage === "unloaded" || l(k) ? (a(), i("button", {
          key: 3,
          type: "button",
          disabled: l(u),
          onClick: p[9] || (p[9] = (h) => y("read"))
        }, r(l(Gt).refresh), 9, Au)) : g("", !0)
      ])])) : g("", !0),
      [
        "unconfirmed",
        "conflict",
        "failed"
      ].includes(l(t).chatStorage) ? (a(), i("div", Ru, [H(r(l(t).chatStorage === "unconfirmed" ? l(Le).unconfirmed : l(t).chatStorage === "conflict" ? l(Le).conflict : l(Le).failed) + " ", 1), n("div", Mu, [n("button", {
        type: "button",
        disabled: !l(b)("verify-teacher"),
        onClick: p[10] || (p[10] = (h) => y("verify-teacher"))
      }, r(l(Le).verify), 9, Eu), l(t).chatStorage !== "failed" ? (a(), i("button", {
        key: 0,
        type: "button",
        disabled: !l(b)("adopt-teacher"),
        onClick: p[11] || (p[11] = (h) => ce("adopt-teacher", {}, l(Le).adoptWarning))
      }, r(l(Le).adopt), 9, Tu)) : g("", !0)])])) : g("", !0),
      [
        "unconfirmed",
        "conflict",
        "failed"
      ].includes(l(t).workbenchStorage) ? (a(), i("div", Nu, [
        H(r(l(X).assistantStorage) + " ", 1),
        n("button", {
          type: "button",
          disabled: l(u),
          onClick: p[12] || (p[12] = (h) => y("verify-workbench"))
        }, r(l(X).verify), 9, Bu),
        l(t).workbenchStorage === "conflict" ? (a(), i("button", {
          key: 0,
          type: "button",
          disabled: l(u),
          onClick: p[13] || (p[13] = (h) => ce("adopt-workbench", {}, l(X).adoptConfirm))
        }, r(l(X).adopt), 9, Ou)) : g("", !0)
      ])) : g("", !0),
      n("div", { class: se(["learning-stage", {
        "is-wide": G.value,
        "is-chat": !G.value && B.value === "chat"
      }]) }, [
        n("div", {
          class: "learning-pane is-work",
          inert: !be.value,
          "aria-hidden": !be.value
        }, [V.value && T.value ? (a(), Z(_t, {
          key: 0,
          ref_key: "assistant",
          ref: U,
          target: "workbench",
          state: l(t),
          disabled: !l(b)("workbench-talk"),
          pending: l(u),
          onAction: y,
          onPresent: Ie,
          onClose: nt
        }, null, 8, [
          "state",
          "disabled",
          "pending"
        ])) : g("", !0), ne(n("div", {
          ref_key: "scroller",
          ref: M,
          class: "learning-scroll",
          onScrollPassive: _e,
          onClick: Be,
          onFocusin: Be
        }, [V.value && !T.value ? (a(), i(E, { key: 0 }, [
          de.value ? (a(), Z(sa, {
            key: de.value.key,
            turn: de.value.turn,
            stoppable: "",
            disabled: l(u),
            onStop: p[14] || (p[14] = (h) => y(l(he)({ kind: de.value.turn.purpose ?? "talk" }) ? "cancel-preparation" : "cancel"))
          }, va({ _: 2 }, [l(t).storage === "ready" && l(he)({ kind: de.value.turn.purpose ?? "talk" }) && !l(t).preparation?.running && (l(t).preparation || l(t).sourceChoice) ? {
            name: "default",
            fn: Ut(() => [W(dt, {
              state: l(t),
              disabled: !l(d),
              pending: l(u),
              onAction: Ge
            }, null, 8, [
              "state",
              "disabled",
              "pending"
            ])]),
            key: "0"
          } : void 0]), 1032, ["turn", "disabled"])) : g("", !0),
          de.value && !l(he)({ kind: de.value.turn.purpose ?? "talk" }) && l(Pe)(de.value.turn, l(t).workbenchStorage, l(t).storage) ? (a(), i("p", {
            key: 1,
            class: se(["learning-turn-notice", { "is-error": de.value.turn.status === "failed" }]),
            role: "status"
          }, r(l(Pe)(de.value.turn, l(t).workbenchStorage, l(t).storage)), 3)) : g("", !0),
          l(t).busy && de.value?.turn.status !== "running" ? (a(), i("div", Pu, [
            p[39] || (p[39] = n("span", {
              class: "learning-working-dot",
              "aria-hidden": "true"
            }, null, -1)),
            n("span", null, r(l(t).message || s.working), 1),
            n("button", {
              type: "button",
              disabled: l(u),
              onClick: p[15] || (p[15] = (h) => y("cancel"))
            }, "停止", 8, Vu)
          ])) : g("", !0),
          f.value === "home" ? (a(), Z(ho, {
            key: 3,
            state: l(t),
            disabled: !l(d),
            pending: l(u),
            "preparation-in-process": !!de.value && l(he)({ kind: de.value.turn.purpose ?? "talk" }),
            onAction: Ge,
            onConfirm: ce,
            onPresent: Ie,
            onGo: me,
            onAsk: $t,
            onAssistant: at,
            onRecord: oa
          }, null, 8, [
            "state",
            "disabled",
            "pending",
            "preparation-in-process"
          ])) : g("", !0),
          f.value === "profile" ? (a(), Z(wl, {
            key: 4,
            state: l(t),
            disabled: !l(b)("language"),
            onAction: y
          }, null, 8, ["state", "disabled"])) : g("", !0),
          f.value === "materials" ? (a(), i("section", _u, [
            p[40] || (p[40] = n("h1", null, "课件与笔记", -1)),
            l(t).unit ? g("", !0) : (a(), i("p", Du, r(l(t).blockedUnit ? "当前课件在另一个故事中" : "还没有课件"), 1)),
            l(t).unit ? (a(), i(E, { key: 1 }, [
              n("p", Uu, r(l(t).unit.title), 1),
              (a(!0), i(E, null, j(l(t).unit.materials, (h) => (a(), i("button", {
                key: h.id,
                type: "button",
                class: "learning-activity-link",
                onClick: (ae) => Ie({
                  unitId: l(t).unit.id,
                  kind: "material",
                  id: h.id,
                  title: h.title
                })
              }, [
                W(Y, { name: "book" }),
                n("span", null, r(h.title), 1),
                W(Y, { name: "arrow" })
              ], 8, ju))), 128)),
              (a(!0), i(E, null, j(l(t).unit.exercises, (h) => (a(), i("button", {
                key: h.id,
                type: "button",
                class: "learning-activity-link",
                onClick: (ae) => Ie({
                  unitId: l(t).unit.id,
                  kind: "exercise",
                  id: h.id,
                  title: h.prompt
                })
              }, [
                W(Y, { name: "records" }),
                n("span", null, r(h.prompt), 1),
                W(Y, { name: "arrow" })
              ], 8, Wu))), 128)),
              l(t).unit.notes.length ? (a(), i("section", Gu, [(a(!0), i(E, null, j(l(t).unit.notes, (h) => (a(), i("article", { key: h.id }, [
                h.selection ? (a(), i("blockquote", Fu, r(h.selection.quote), 1)) : g("", !0),
                n("p", null, r(h.text), 1),
                n("button", {
                  type: "button",
                  disabled: !l(d),
                  onClick: (ae) => y("delete-note", { id: h.id })
                }, "删除笔记", 8, Hu)
              ]))), 128))])) : g("", !0)
            ], 64)) : g("", !0)
          ])) : g("", !0),
          f.value === "books" ? (a(), Z(Fi, {
            key: 6,
            state: l(t),
            disabled: !l(b)("start-review"),
            onAction: Ge,
            onReview: it,
            onRemove: ce
          }, null, 8, ["state", "disabled"])) : g("", !0),
          f.value === "harvest" ? (a(), i("section", zu, [
            p[42] || (p[42] = n("div", { class: "learning-page-heading" }, [n("h1", null, "我的收获")], -1)),
            l(t).completions.length ? g("", !0) : (a(), i("p", Yu, "还没有完成的课程")),
            (a(!0), i(E, null, j(ra.value, (h) => (a(), i("article", {
              key: h.unitId,
              class: "learning-harvest-entry"
            }, [
              n("small", null, r(new Date(h.completedAt).toLocaleDateString()), 1),
              h.rewardStatus !== "retired" ? (a(), i("h2", Ku, [H(r(h.rewardStatus === "paid" ? "+" : "") + r(h.amount), 1), p[41] || (p[41] = n("span", null, "小白币", -1))])) : g("", !0),
              n("p", null, r(h.summary), 1),
              n("p", Zu, r(h.rewardStatus === "paid" ? l(ge).paid : h.rewardStatus === "retired" ? l(ge).retired : l(ge).pending), 1),
              h.rewardStatus !== "paid" && h.rewardStatus !== "retired" ? (a(), i("button", {
                key: 1,
                type: "button",
                disabled: !l(d) || l(t).walletStorage !== "ready",
                onClick: (ae) => y("reward", {
                  unitId: h.unitId,
                  openWallet: !l(t).walletOpen
                })
              }, r(l(t).walletOpen ? l(ge).claim : l(ge).openWallet), 9, Ju)) : g("", !0)
            ]))), 128)),
            l(t).walletStorage === "unconfirmed" || l(t).walletStorage === "conflict" || l(t).walletStorage === "failed" ? (a(), i("button", {
              key: 1,
              type: "button",
              disabled: l(u) || l(t).busy,
              onClick: p[16] || (p[16] = (h) => y("verify-wallet"))
            }, r(s.verifyWallet), 9, Qu)) : g("", !0),
            l(t).walletStorage === "conflict" ? (a(), i("button", {
              key: 2,
              type: "button",
              disabled: l(u) || l(t).busy,
              onClick: p[17] || (p[17] = (h) => ce("adopt-wallet", {}, s.adoptWalletWarning))
            }, r(s.adoptWallet), 9, Xu)) : g("", !0),
            l(t).completions.length > 20 ? (a(), i("div", ed, [n("button", {
              type: "button",
              disabled: we.value === 0,
              onClick: p[18] || (p[18] = (h) => we.value--)
            }, "上一页", 8, td), n("button", {
              type: "button",
              disabled: (we.value + 1) * 20 >= l(t).completions.length,
              onClick: p[19] || (p[19] = (h) => we.value++)
            }, "下一页", 8, ad)])) : g("", !0)
          ])) : g("", !0),
          f.value === "settings" ? (a(), i("section", nd, [
            p[52] || (p[52] = n("h1", null, "学习设置", -1)),
            n("label", null, [p[43] || (p[43] = H("当前语言", -1)), n("select", {
              value: l(t).language,
              disabled: !l(b)("language"),
              onChange: p[20] || (p[20] = (h) => {
                y("language", { language: h.target.value }), h.target.value = l(t).language;
              })
            }, [(a(!0), i(E, null, j([.../* @__PURE__ */ new Set([l(t).language, ...l(t).languages])], (h) => (a(), i("option", {
              key: h,
              value: h
            }, r(new Intl.DisplayNames(["zh-CN"], { type: "language" }).of(h)), 9, ld))), 128))], 40, id)]),
            n("button", {
              type: "button",
              onClick: wt
            }, "更换语言和语伴 →"),
            W(aa),
            n("section", null, [
              p[44] || (p[44] = n("h2", null, "训练设置", -1)),
              l(t).profile?.goal.description ? (a(), i("p", sd, r(l(t).profile.goal.description), 1)) : g("", !0),
              W(ta, {
                state: l(t),
                disabled: !l(b)("settings"),
                onAction: y
              }, null, 8, ["state", "disabled"])
            ]),
            n("section", null, [
              p[49] || (p[49] = n("h2", null, "语伴的声音", -1)),
              l(t).voices.enabled ? (a(), i("form", {
                key: 1,
                onSubmit: p[24] || (p[24] = oe((h) => y("voice", { voice: {
                  voiceId: Ue.value,
                  language: je.value,
                  speed: Number(We.value)
                } }), ["prevent"]))
              }, [
                n("label", null, [p[45] || (p[45] = H("音色", -1)), ne(n("select", { "onUpdate:modelValue": p[21] || (p[21] = (h) => Ue.value = h) }, [(a(!0), i(E, null, j(l(t).voices.voices, (h) => (a(), i("option", {
                  key: h.id,
                  value: h.id,
                  disabled: !h.available
                }, r(h.name) + r(h.available ? "" : "（暂不可用）"), 9, od))), 128))], 512), [[Ye, Ue.value]])]),
                n("label", null, [p[46] || (p[46] = H("发音语言", -1)), ne(n("input", {
                  "onUpdate:modelValue": p[22] || (p[22] = (h) => je.value = h),
                  type: "text",
                  maxlength: "80",
                  placeholder: "en / ja"
                }, null, 512), [[ve, je.value]])]),
                n("label", null, [p[48] || (p[48] = H("语速", -1)), ne(n("select", { "onUpdate:modelValue": p[23] || (p[23] = (h) => We.value = h) }, [...p[47] || (p[47] = [
                  n("option", { value: 0.75 }, "0.75×", -1),
                  n("option", { value: 1 }, "1×", -1),
                  n("option", { value: 1.25 }, "1.25×", -1)
                ])], 512), [[Ye, We.value]])]),
                n("button", {
                  type: "submit",
                  disabled: !l(b)("voice") || !l(t).profile
                }, "保存声音设置", 8, ud)
              ], 32)) : (a(), i("p", rd, r(s.voiceDisabled), 1)),
              n("button", {
                type: "button",
                onClick: p[25] || (p[25] = (h) => y("tts-settings"))
              }, r(l(t).voices.enabled ? l(ot).settings : l(ot).enable), 1),
              p[50] || (p[50] = n("small", null, "已听过的题保留原声音，新偏好用于之后的题目。", -1))
            ]),
            n("section", null, [
              p[51] || (p[51] = n("h2", null, "学习数据", -1)),
              n("button", {
                type: "button",
                disabled: !l(b)("forget-conversation"),
                onClick: p[26] || (p[26] = (h) => ce("forget-conversation", { target: "companion" }, l(X).clearCompanionConfirm))
              }, r(l(X).clearCompanion), 9, dd),
              n("button", {
                type: "button",
                disabled: !l(b)("forget-conversation"),
                onClick: p[27] || (p[27] = (h) => ce("forget-conversation", { target: "workbench" }, l(X).clearAssistantConfirm))
              }, r(l(X).clearAssistant), 9, vd),
              n("button", {
                type: "button",
                disabled: !l(b)("export"),
                onClick: ua
              }, "导出学习数据", 8, cd),
              n("button", {
                type: "button",
                disabled: !l(b)("read"),
                onClick: p[28] || (p[28] = (h) => y("read"))
              }, "重新加载", 8, gd),
              l(t).unit || l(t).blockedUnit ? (a(), i("button", {
                key: 0,
                type: "button",
                disabled: !l(b)("abandon"),
                onClick: p[29] || (p[29] = (h) => ce("abandon", {}, l($e).lesson))
              }, "放下当前练习", 8, pd)) : g("", !0),
              n("button", {
                type: "button",
                class: "learning-danger",
                disabled: !l(b)("delete-language") || !l(t).profile,
                onClick: p[30] || (p[30] = (h) => ce("delete-language", {}, "删除当前语言的全部学习数据？未领取奖励也将放弃，已到账流水保留。"))
              }, "删除当前语言", 8, bd),
              n("button", {
                type: "button",
                class: "learning-danger",
                disabled: !l(b)("clear"),
                onClick: p[31] || (p[31] = (h) => ce("clear", {}, "清空所有语言的目标、课程和记录？未领取奖励也将放弃。已到账流水不撤销。"))
              }, "清空全部学习数据", 8, md)
            ])
          ])) : g("", !0)
        ], 64)) : g("", !0)], 544), [[fa, !T.value]])], 8, qu),
        l(t).teacher ? (a(), i("div", {
          key: 0,
          class: "learning-pane is-chat",
          inert: !Ve.value,
          "aria-hidden": !Ve.value
        }, [D.value ? (a(), Z(_t, {
          key: 0,
          ref_key: "conversation",
          ref: N,
          target: "companion",
          state: l(t),
          disabled: !l(v),
          pending: l(u),
          onAction: y,
          onPresent: Ie,
          onProfile: wt
        }, null, 8, [
          "state",
          "disabled",
          "pending"
        ])) : g("", !0)], 8, fd)) : g("", !0),
        !G.value && B.value === "work" && l(t).teacher ? (a(), i("button", {
          key: 1,
          type: "button",
          class: "learning-float is-companion",
          "aria-label": ft.value ? `和${l(t).teacher.name}聊天，有新消息` : `和${l(t).teacher.name}聊天`,
          onClick: kt
        }, [n("span", yd, r([...l(t).teacher.name][0]), 1), ft.value ? (a(), i("span", hd)) : g("", !0)], 8, kd)) : g("", !0),
        !G.value && B.value === "chat" ? (a(), i("button", {
          key: 2,
          type: "button",
          class: "learning-float is-workbook",
          "aria-label": Ce.value ? "回到练习本，有新指引" : "回到练习本",
          onClick: De
        }, [W(Y, { name: "workbook" }), Ce.value ? (a(), i("span", wd)) : g("", !0)], 8, $d)) : g("", !0),
        l(Ct) ? (a(), i("aside", {
          key: 3,
          class: se(["learning-companion-bubble", { "is-wide": G.value }]),
          "aria-live": "polite"
        }, [n("button", {
          type: "button",
          onClick: p[32] || (p[32] = (h) => {
            kt(), l(lt)();
          })
        }, r(l(Ct)), 1), n("button", {
          type: "button",
          "aria-label": "收起这句话",
          onClick: p[33] || (p[33] = (...h) => l(lt) && l(lt)(...h))
        }, [W(Y, { name: "close" })])], 2)) : g("", !0)
      ], 2),
      z.value ? g("", !0) : (a(), Z(Yt, {
        key: 3,
        state: l(t),
        onAction: y
      }, null, 8, ["state"])),
      l(t).unit && z.value ? (a(), Z(Yn, {
        key: `${l(t).chatIdentity}:${l(t).language}:${l(t).unit.id}:${z.value.kind}:${z.value.id}`,
        state: l(t),
        target: z.value,
        disabled: !l(d),
        onAction: y,
        onClose: tt,
        onAsk: $t
      }, null, 8, [
        "state",
        "target",
        "disabled"
      ])) : g("", !0),
      l(t).approval ? (a(), Z(ai, {
        key: 5,
        approval: l(t).approval,
        pending: l(u),
        onAction: y
      }, null, 8, ["approval", "pending"])) : ie.value ? (a(), i("div", {
        key: 6,
        ref_key: "confirmLayer",
        ref: ht,
        class: "learning-confirm-shade",
        onKeydown: p[36] || (p[36] = Se(oe((h) => ie.value = null, ["stop", "prevent"]), ["esc"]))
      }, [n("section", xd, [
        n("h2", Cd, r(l(Et)[ie.value.action].title), 1),
        n("p", null, r(ie.value.text), 1),
        n("div", Id, [n("button", {
          autofocus: "",
          type: "button",
          onClick: p[34] || (p[34] = (h) => ie.value = null)
        }, r(["language", "teacher"].includes(ie.value.action) ? l($e).keepEditing : s.cancel), 1), n("button", {
          type: "button",
          class: "learning-primary",
          disabled: !l(b)(ie.value.action),
          onClick: p[35] || (p[35] = (h) => {
            Ge(ie.value.action, ie.value.input, !0), ie.value = null;
          })
        }, r(l(Et)[ie.value.action].accept), 9, Ld)])
      ])], 544)) : g("", !0)
    ], 4));
  }
}), Ed = Sd;
export {
  Ed as default
};
