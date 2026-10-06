/* eslint-disable */
import { B as Re, C as g, D as H, G as _, I as Me, K as da, M as St, O as W, P as re, Q as K, S as Z, T as va, U as t, W as ca, X as ga, Z as pa, _ as E, at as F, b as S, ct as ke, d as ba, dt as Ut, et as _t, f as Ye, ft as r, g as oe, h as Se, it as xe, j as ma, k as ee, lt as l, m as fa, n as ka, o as Ke, ot as ya, p as ve, q as ha, s as vt, st as $a, t as wa, tt as ne, ut as se, w as i, x as n } from "./xiaobai-os-frame-bridge-CrPFvkI3.js";
import { t as ct } from "./xiaobai-os-MessageMarkdown-CFMtVfNA.js";
var st = /* @__PURE__ */ new WeakMap(), At = [
  "select",
  "input",
  "keyup",
  "pointerup",
  "scroll"
], Je = {
  mounted(e, c) {
    const s = c.value, a = s.cursor, u = () => {
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
      !e.isConnected || !a || (e.setSelectionRange(a.start, a.end, a.direction), e.scrollTop = a.top, e.scrollLeft = a.left);
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
}, Oa = ["checked", "onChange"], Ba = {
  key: 0,
  class: "learning-muted"
}, qa = {
  key: 4,
  class: "learning-fields"
}, Pa = ["onUpdate:modelValue"], Va = {
  key: 5,
  class: "learning-writing"
}, Da = ["disabled"], Ua = /* @__PURE__ */ ee({
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
    const s = e, a = c, u = ga(e, "modelValue");
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
      !b.value || s.disabled || (k.kind === "text" ? a("submit", {
        kind: "text",
        text: u.value.text
      }) : k.kind === "gaps" ? a("submit", {
        kind: "gaps",
        values: k.slots.map(($) => ({
          id: $.id,
          text: u.value.values[$.id]
        }))
      }) : k.kind === "match" ? a("submit", {
        kind: "match",
        pairs: k.left.map(($) => ({
          left: $.id,
          right: u.value.values[$.id]
        }))
      }) : a("submit", {
        kind: k.kind,
        ids: [...k.kind === "order" ? u.value.order : u.value.picked]
      }));
    }
    return (k, $) => (t(), i("form", {
      class: "learning-answer",
      onSubmit: oe(C, ["prevent"])
    }, [n("fieldset", { disabled: e.disabled }, [
      $[3] || ($[3] = n("legend", { class: "learning-sr-only" }, "你的回答", -1)),
      e.response.kind === "choice" ? (t(), i("div", Ca, [(t(!0), i(E, null, _(e.response.options, (m, y) => (t(), i("label", {
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
      ], 2))), 128))])) : e.response.kind === "order" ? (t(), i("ol", Sa, [(t(!0), i(E, null, _(u.value.order, (m, y) => (t(), i("li", { key: m }, [
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
      ]))), 128))])) : e.response.kind === "match" ? (t(), i("div", Ma, [(t(!0), i(E, null, _(e.response.left, (m) => (t(), i("label", { key: m.id }, [H(r(m.text) + " ", 1), ne(n("select", { "onUpdate:modelValue": (y) => u.value.values[m.id] = y }, [$[1] || ($[1] = n("option", { value: "" }, "选择对应项", -1)), (t(!0), i(E, null, _(e.response.right, (y) => (t(), i("option", {
        key: y.id,
        value: y.id
      }, r(y.text), 9, Ta))), 128))], 8, Ea), [[Ye, u.value.values[m.id]]])]))), 128))])) : e.response.kind === "evidence" ? (t(), i("div", Na, [(t(!0), i(E, null, _(e.paragraphs, (m) => (t(), i("label", {
        key: m.id,
        class: se({ selected: u.value.picked.includes(m.id) })
      }, [n("input", {
        type: "checkbox",
        checked: u.value.picked.includes(m.id),
        onChange: (y) => d(m.id)
      }, null, 40, Oa), n("span", null, r(m.text), 1)], 2))), 128)), e.paragraphs.length ? g("", !0) : (t(), i("p", Ba, "请先展开相关文稿，再选择原文依据。"))])) : e.response.kind === "gaps" ? (t(), i("div", qa, [(t(!0), i(E, null, _(e.response.slots, (m) => (t(), i("label", { key: m.id }, [H(r(m.text), 1), ne(n("input", {
        "onUpdate:modelValue": (y) => u.value.values[m.id] = y,
        type: "text",
        maxlength: "4000",
        autocomplete: "off"
      }, null, 8, Pa), [[ve, u.value.values[m.id]]])]))), 128))])) : (t(), i("label", Va, [$[2] || ($[2] = n("span", { class: "learning-sr-only" }, "你的回答", -1)), ne(n("textarea", {
        "onUpdate:modelValue": $[0] || ($[0] = (m) => u.value.text = m),
        rows: "6",
        maxlength: "4000",
        placeholder: "写下你的回答…"
      }, null, 512), [[ve, u.value.text], [l(Je), u.value]])])),
      n("button", {
        class: "learning-primary",
        type: "submit",
        disabled: !b.value
      }, "交给语伴 →", 8, Da)
    ], 8, xa)], 32));
  }
}), gt = Ua, jt = 2e3, _a = ["stroke-width"], ja = ["d"], Wa = /* @__PURE__ */ ee({
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
    return (s, a) => (t(), i("svg", {
      class: "learning-icon",
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      "stroke-width": e.name === "more" ? 3.5 : 1.7,
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      "aria-hidden": "true"
    }, [n("path", { d: c[e.name] }, null, 8, ja)], 8, _a));
  }
}), Y = Wa, qe = Object.freeze({
  select: "引用这段",
  ask: "问语伴",
  listen: "朗读",
  dismiss: "取消引用"
});
function Ga(e, c, s) {
  if (!s?.rangeCount || s.isCollapsed) return null;
  const a = s.getRangeAt(0), u = a.startContainer, d = (u instanceof Element ? u : u.parentElement)?.closest("[data-learning-text]");
  if (!d || !e.contains(d) || !d.contains(a.endContainer)) return null;
  const v = c.find((m) => m.id === d.dataset.materialId), b = v?.paragraphs.find((m) => m.id === d.dataset.paragraphId);
  if (!v || !b) return null;
  const C = a.cloneRange();
  C.selectNodeContents(d), C.setEnd(a.startContainer, a.startOffset);
  const k = C.toString().length, $ = a.toString();
  return !$.trim() || [...$].length > 2e3 || b.text.slice(k, k + $.length) !== $ ? null : {
    materialId: v.id,
    paragraphId: b.id,
    start: k,
    end: k + $.length,
    quote: $
  };
}
function Wt(e, c, s) {
  const a = () => {
    if (!e.value) return;
    const u = Ga(e.value, c(), window.getSelection());
    u && s(u);
  };
  Re(() => document.addEventListener("selectionchange", a)), Me(() => document.removeEventListener("selectionchange", a));
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
}, en = ["disabled", "onClick"], tn = { key: 2 }, an = /* @__PURE__ */ ee({
  __name: "MaterialReader",
  props: {
    material: {},
    disabled: { type: Boolean },
    exerciseId: {}
  },
  emits: ["action", "select"],
  setup(e, { emit: c }) {
    const s = e, a = c, u = F(null);
    Wt(u, () => [s.material], (v) => a("select", v));
    function d(v) {
      a("select", {
        materialId: s.material.id,
        paragraphId: v.id,
        start: 0,
        end: v.text.length,
        quote: v.text
      });
    }
    return (v, b) => (t(), i("article", {
      ref_key: "root",
      ref: u,
      class: "learning-material"
    }, [
      n("h2", null, r(e.material.title), 1),
      n("div", Fa, [e.material.provenance.kind === "authored" ? (t(), i("span", Ha, "语伴自编练习")) : (t(), i("a", {
        key: 1,
        href: e.material.provenance.url,
        target: "_blank",
        rel: "noopener noreferrer"
      }, r(e.material.provenance.kind === "original" ? "原文节选" : "改编自") + " · " + r(e.material.provenance.title) + " ↗", 9, za))]),
      e.material.hidden ? (t(), i("div", Ya, [b[1] || (b[1] = n("svg", {
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
        onClick: b[0] || (b[0] = (C) => a("action", "reveal", {
          kind: "transcripts",
          id: e.material.id
        }))
      }, "看文稿", 8, Ka)])) : (t(), i("div", Za, [(t(!0), i(E, null, _(e.material.paragraphs, (C) => (t(), i("div", {
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
      n("div", Xa, [(t(!0), i(E, null, _(e.material.parts, (C) => (t(), i("button", {
        key: C.key,
        type: "button",
        disabled: e.disabled,
        onClick: (k) => a("action", "play", {
          materialId: e.material.id,
          partKey: C.key,
          exerciseId: e.exerciseId
        })
      }, [W(Y, { name: "play" }), H(r(e.material.parts.length > 1 ? `听第 ${C.number} 段` : "播放朗读"), 1)], 8, en))), 128))]),
      e.material.parts.length ? (t(), i("small", tn, "TTS 合成朗读")) : g("", !0)
    ], 512));
  }
}), Rt = an;
function pt(e, c, s = []) {
  const a = (u) => c.kind === "choice" || c.kind === "order" ? c.options.find((d) => d.id === u)?.text ?? u : s.find((d) => d.id === u)?.text ?? u;
  return e.kind === "text" ? e.text : e.kind === "gaps" ? e.values.map((u) => `${c.kind === "gaps" ? c.slots.find((d) => d.id === u.id)?.text ?? "" : ""} ${u.text}`).join(`
`) : e.kind === "match" ? e.pairs.map((u) => c.kind === "match" ? `${c.left.find((d) => d.id === u.left)?.text} → ${c.right.find((d) => d.id === u.right)?.text}` : "").join(`
`) : e.ids.map(a).join(e.kind === "order" ? " → " : `
`);
}
var nn = { class: "learning-feedback" }, ln = { class: "learning-muted" }, sn = { key: 0 }, rn = { key: 1 }, on = { key: 0 }, un = { key: 1 }, dn = { key: 2 }, vn = {
  key: 3,
  class: "learning-muted"
}, cn = ["disabled"], gn = ["disabled"], pn = /* @__PURE__ */ ee({
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
    return (s, a) => (t(), i("section", nn, [
      a[6] || (a[6] = n("p", { class: "learning-eyebrow" }, "已保存的原答", -1)),
      n("blockquote", null, r(l(pt)(e.attempt.answer, e.response, e.paragraphs)), 1),
      n("small", ln, [
        H(r(e.attempt.help.feedback ? "得到反馈后的再练" : e.attempt.help.answer || e.attempt.help.hint || e.attempt.help.transcript ? "这次有辅助" : "未使用答案或提示"), 1),
        e.attempt.help.replays ? (t(), i("span", sn, " · 重听 " + r(e.attempt.help.replays) + " 次", 1)) : g("", !0),
        e.attempt.help.slowPlayback ? (t(), i("span", rn, " · 慢放")) : g("", !0)
      ]),
      e.feedback ? (t(), i(E, { key: 0 }, [
        n("h3", null, r(c[e.feedback.verdict]), 1),
        e.feedback.understanding ? (t(), i("p", on, [a[2] || (a[2] = n("b", null, "理解", -1)), H(r(e.feedback.understanding), 1)])) : g("", !0),
        e.feedback.expression ? (t(), i("p", un, [a[3] || (a[3] = n("b", null, "表达", -1)), H(r(e.feedback.expression), 1)])) : g("", !0),
        e.feedback.guidance ? (t(), i("p", dn, [a[4] || (a[4] = n("b", null, "批注", -1)), H(r(e.feedback.guidance), 1)])) : g("", !0),
        e.revised ? (t(), i("small", vn, "这篇已有修改稿，结果以修改稿的批改为准。")) : (t(), i("button", {
          key: 4,
          type: "button",
          disabled: e.disabled,
          onClick: a[0] || (a[0] = (u) => s.$emit("action", "assess", {
            attemptId: e.attempt.id,
            review: !0,
            message: "请重新审视我的原答与题目。也请考虑其他有效表达，不只对照原来的答案键。"
          }))
        }, r(e.feedback.verdict === "disputed" ? "请语伴复核" : "有疑问，请复核"), 9, cn))
      ], 64)) : (t(), i(E, { key: 1 }, [a[5] || (a[5] = n("p", null, "原答已保存，等待语伴评估。", -1)), n("button", {
        type: "button",
        disabled: e.disabled,
        onClick: a[1] || (a[1] = (u) => s.$emit("action", "assess", {
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
}, te = {
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
}, Ft = {
  unassessed: "还没练过",
  review: "待确认",
  independent: "已能独立使用",
  practised: "练过一次",
  strengthen: "再练练"
}, Ht = (e) => `${e} 次作答`, zt = (e) => `${e} 个知识点可以温习了`, ot = {
  settings: "声音设置",
  enable: "开启语音"
}, X = {
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
}, Q = {
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
}, bn = {
  key: 0,
  class: "learning-player",
  "aria-label": "课堂朗读"
}, mn = {
  key: 0,
  role: "status"
}, fn = {
  key: 2,
  class: "learning-row"
}, kn = ["aria-label", "disabled"], yn = ["max", "value"], hn = /* @__PURE__ */ ee({
  __name: "LearningPlayer",
  props: { state: {} },
  emits: ["action"],
  setup(e, { emit: c }) {
    const s = c;
    function a(u) {
      return `${Math.floor(u / 60)}:${String(Math.floor(u % 60)).padStart(2, "0")}`;
    }
    return (u, d) => e.state.media.status !== "idle" ? (t(), i("section", bn, [
      e.state.media.message ? (t(), i("p", mn, r(e.state.media.message), 1)) : g("", !0),
      e.state.voices.enabled ? g("", !0) : (t(), i("button", {
        key: 1,
        type: "button",
        onClick: d[0] || (d[0] = (v) => s("action", "tts-settings"))
      }, r(l(ot).enable), 1)),
      e.state.media.key ? (t(), i("div", fn, [
        W(Y, { name: "sound" }),
        n("span", null, r(e.state.media.status === "loading" ? "正在生成声音…" : `${a(e.state.media.position)} / ${a(e.state.media.duration)}`), 1),
        e.state.media.status === "playing" ? (t(), i("button", {
          key: 0,
          type: "button",
          "aria-label": "暂停",
          onClick: d[1] || (d[1] = (v) => s("action", "pause"))
        }, [W(Y, { name: "pause" })])) : [
          "paused",
          "ended",
          "blocked"
        ].includes(e.state.media.status) ? (t(), i("button", {
          key: 1,
          type: "button",
          "aria-label": e.state.media.status === "ended" ? "再听一遍" : "继续播放",
          disabled: e.state.busy,
          onClick: d[2] || (d[2] = (v) => s("action", "resume"))
        }, [W(Y, { name: "play" })], 8, kn)) : g("", !0),
        n("button", {
          type: "button",
          "aria-label": "停止",
          onClick: d[3] || (d[3] = (v) => s("action", "stop"))
        }, [W(Y, { name: "stop" })]),
        e.state.media.duration ? (t(), i("button", {
          key: 2,
          type: "button",
          onClick: d[4] || (d[4] = (v) => s("action", "rate", { value: e.state.media.rate === 1 ? 0.75 : 1 }))
        }, r(e.state.media.rate) + "×", 1)) : g("", !0)
      ])) : g("", !0),
      e.state.media.duration ? (t(), i("input", {
        key: 3,
        type: "range",
        min: "0",
        max: e.state.media.duration,
        step: "0.1",
        value: e.state.media.position,
        "aria-label": "当前声音片段播放位置",
        onChange: d[5] || (d[5] = (v) => s("action", "seek", { value: Number(v.target.value) }))
      }, null, 40, yn)) : g("", !0)
    ])) : g("", !0);
  }
}), Yt = hn, $n = { class: "learning-selection" }, wn = { class: "learning-row" }, xn = ["disabled"], Cn = /* @__PURE__ */ ee({
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
    return (c, s) => (t(), i("div", $n, [n("blockquote", null, r(e.selection.quote), 1), n("div", wn, [
      n("button", {
        type: "button",
        onClick: s[0] || (s[0] = (a) => c.$emit("ask"))
      }, r(l(qe).ask), 1),
      n("button", {
        type: "button",
        disabled: e.disabled || [...e.selection.quote].length > 1e3,
        onClick: s[1] || (s[1] = (a) => c.$emit("say"))
      }, r(l(qe).listen), 9, xn),
      n("button", {
        type: "button",
        onClick: s[2] || (s[2] = (a) => c.$emit("dismiss"))
      }, r(l(qe).dismiss), 1)
    ])]));
  }
}), Kt = Cn;
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
  return !!e.text.trim() || !!e.picked.length || Object.values(e.values).some((a) => !!a.trim()) || e.order.length !== s.order.length || e.order.some((a, u) => a !== s.order[u]);
}
function Zt(e) {
  return e.stage.exercises.flatMap((c) => {
    const s = e.exercises.find((C) => C.id === c.exerciseId), a = e.attempts.find((C) => C.id === c.revisionAttemptId), u = a && e.assessments.some((C) => C.attemptId === a.id && C.verdict !== "disputed"), d = u ? a : e.attempts.find((C) => C.id === (a?.revisesAttemptId ?? c.draftAttemptId));
    if (!s || s.response.kind !== "text" || !d) return [];
    const v = e.assessments.find((C) => C.attemptId === d.id), b = u ? void 0 : a;
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
function In() {
  const e = xe({}), c = xe(ze()), s = xe(ze()), a = xe({
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
    settings: a,
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
        a.open = !1, a.submitted = null, Object.assign(s, ze());
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
      const C = a.submitted;
      C && b.storage === "ready" && !b.busy && b.profile && Object.entries(C.value).every(([k, $]) => b.profile.settings[k] === $) && (Object.entries(C.form).every(([k, $]) => a.form[k] === $) && (a.open = !1), a.submitted = null);
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
  if (e.chat.text.trim() || e.workbenchChat.text.trim() || e.settings.open && Object.entries(Jt(e.settings.form)).some(([s, a]) => c.profile?.settings[s] !== a) || e.setup.step === 1 && e.setup.name.trim() && (e.setup.name.trim() !== c.teacher?.name || e.setup.note.trim() !== c.teacher.note)) return !0;
  for (const s of [c.unit, c.review]) {
    const a = s && e.units[s.id];
    if (!(!s || !a)) {
      if (Object.values(a.writing).some((u) => !!u.text.trim()) || Object.keys(a.edits).length && Zt(s).some((u) => u.row.status === "revising" && u.annotations.some((d) => a.edits[d.id] && a.edits[d.id].value !== d.quote))) return !0;
      for (const u of s.exercises) {
        const d = a.activityDrafts[u.id]?.value, v = a.review.drafts[u.id];
        if (d && Tt(d, u.response) || v && (v.retry || !s.attempts.some((b) => b.exerciseId === u.id)) && Tt(v.value, u.response)) return !0;
      }
    }
  }
  return !1;
}
function Ln(e, c, s, a) {
  return s === "teacher" ? a.teacher?.name !== c.teacher?.name && !!e.chat.text.trim() : s === "language" && a.language !== c.language && Xt(e, c);
}
function Sn(e) {
  const c = In();
  return ca(Qt, c), K([
    () => e.value.chatIdentity,
    () => e.value.language,
    () => e.value.companionSessionId
  ], (s, a) => c.reset(s[0] === a[0], s[0] === a[0] && s[1] === a[1])), K(() => e.value, (s) => c.reconcile(s), { immediate: !0 }), K(() => [e.value.unit?.id, e.value.review?.id], (s) => {
    for (const a of [c.chat, c.workbenchChat])
      a.focus?.unitId && !s.includes(a.focus.unitId) && (a.focus = null), a.study && !s.includes(a.study.unitId) && (a.study = null);
  }), K(() => Xt(c, e.value), (s, a, u) => {
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
var An = ["onKeydown"], Rn = {
  role: "dialog",
  "aria-labelledby": "learning-activity-title",
  class: "learning-activity"
}, Mn = { class: "learning-activity-header" }, En = { id: "learning-activity-title" }, Tn = {
  key: 0,
  "aria-label": "完成本课的固定奖励"
}, Nn = {
  key: 0,
  class: "learning-margin-note",
  role: "status"
}, On = ["open"], Bn = {
  key: 3,
  class: "learning-question"
}, qn = { class: "learning-help-actions" }, Pn = ["disabled"], Vn = ["disabled"], Dn = ["disabled"], Un = {
  key: 0,
  class: "learning-margin-note"
}, _n = {
  key: 1,
  class: "learning-margin-note"
}, jn = { key: 0 }, Wn = { key: 1 }, Gn = { key: 2 }, Fn = ["disabled"], Hn = /* @__PURE__ */ ee({
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
    const s = e, a = c, u = F(null), d = Te(() => s.target.unitId), v = S(() => `${s.target.kind}:${s.target.id}`);
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
      $.value ? $.value = null : k.value ? k.value = !1 : a("close");
    }
    vt(m, y);
    const f = S(() => d.value.activityDrafts);
    let w = null;
    const o = S(() => s.target?.kind === "exercise" ? s.state.unit?.exercises.find((A) => A.id === s.target?.id) : void 0), x = S(() => s.state.unit?.materials.filter((A) => s.target?.kind === "material" ? A.id === s.target.id : o.value?.materialIds.includes(A.id)) ?? []), N = S(() => o.value?.id ?? s.state.unit?.exercises.find((A) => A.skill === "listening" && A.materialIds.includes(s.target?.id ?? ""))?.id ?? s.state.unit?.exercises.find((A) => A.materialIds.includes(s.target?.id ?? ""))?.id), j = S(() => x.value.filter((A) => o.value?.response.kind !== "evidence" || A.id === o.value.response.materialId).flatMap((A) => A.paragraphs)), T = S(() => s.state.unit?.attempts.filter((A) => A.exerciseId === o.value?.id).at(-1)), J = S(() => s.state.unit?.assessments.find((A) => A.attemptId === T.value?.id));
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
        delete f.value[w.id], w = null, q && a("close");
      }
    });
    function M(A) {
      w = {
        id: o.value.id,
        before: T.value?.id
      }, f.value[o.value.id].submitted = { before: T.value?.id }, a("action", "submit", {
        unitId: s.state.unit.id,
        exerciseId: o.value.id,
        answer: A
      });
    }
    return (A, I) => (t(), i("div", {
      ref_key: "layer",
      ref: m,
      class: "learning-activity-shade",
      onKeydown: Se(oe(y, ["stop", "prevent"]), ["esc"])
    }, [n("section", Rn, [
      n("header", Mn, [
        n("h2", En, r(o.value ? "练习" : x.value[0]?.title ?? "材料"), 1),
        e.state.unit ? (t(), i("small", Tn, "+" + r(e.state.unit.reward.amount) + " 币", 1)) : g("", !0),
        n("button", {
          ref_key: "closeButton",
          ref: C,
          type: "button",
          "aria-label": "收起课件",
          onClick: I[0] || (I[0] = (q) => a("close"))
        }, [I[18] || (I[18] = H("收起", -1)), W(Y, { name: "back" })], 512)
      ]),
      e.state.message && !e.state.busy ? (t(), i("p", Nn, r(e.state.message), 1)) : g("", !0),
      n("div", {
        ref_key: "body",
        ref: u,
        class: "learning-activity-body"
      }, [
        o.value && x.value.length ? (t(), i("details", {
          key: 0,
          class: "learning-activity-materials",
          open: b.value.materialsOpen,
          onToggle: I[3] || (I[3] = (q) => b.value.materialsOpen = q.target.open)
        }, [n("summary", null, "阅读材料 · " + r(x.value.length), 1), (t(!0), i(E, null, _(x.value, (q) => (t(), Z(Rt, {
          key: q.id,
          material: q,
          "exercise-id": N.value,
          disabled: e.disabled,
          onAction: I[1] || (I[1] = (G, O) => a("action", G, O)),
          onSelect: I[2] || (I[2] = (G) => $.value = G)
        }, null, 8, [
          "material",
          "exercise-id",
          "disabled"
        ]))), 128))], 40, On)) : o.value ? g("", !0) : (t(!0), i(E, { key: 1 }, _(x.value, (q) => (t(), Z(Rt, {
          key: q.id,
          material: q,
          "exercise-id": N.value,
          disabled: e.disabled,
          onAction: I[4] || (I[4] = (G, O) => a("action", G, O)),
          onSelect: I[5] || (I[5] = (G) => $.value = G)
        }, null, 8, [
          "material",
          "exercise-id",
          "disabled"
        ]))), 128)),
        $.value ? (t(), Z(Kt, {
          key: 2,
          selection: $.value,
          disabled: e.disabled,
          onAsk: I[6] || (I[6] = (q) => a("ask", N.value, $.value)),
          onSay: I[7] || (I[7] = (q) => a("action", "say", { selection: $.value })),
          onDismiss: I[8] || (I[8] = (q) => $.value = null)
        }, null, 8, ["selection", "disabled"])) : g("", !0),
        o.value ? (t(), i("section", Bn, [
          n("h2", null, r(o.value.prompt), 1),
          n("div", qn, [
            n("button", {
              type: "button",
              disabled: e.disabled || [...o.value.prompt].length > 1e3,
              onClick: I[9] || (I[9] = (q) => a("action", "say-question", { exerciseId: o.value.id }))
            }, "听题干", 8, Pn),
            o.value.hasHint ? (t(), i("button", {
              key: 0,
              type: "button",
              disabled: e.disabled || o.value.hint !== null,
              onClick: I[10] || (I[10] = (q) => a("action", "reveal", {
                kind: "hints",
                id: o.value.id
              }))
            }, "提示", 8, Vn)) : g("", !0),
            n("button", {
              type: "button",
              disabled: e.disabled || o.value.solution !== null,
              onClick: I[11] || (I[11] = (q) => a("action", "reveal", {
                kind: "answers",
                id: o.value.id
              }))
            }, "解答", 8, Dn),
            n("button", {
              type: "button",
              onClick: I[12] || (I[12] = (q) => a("ask", o.value.id))
            }, "问语伴")
          ]),
          o.value.hint ? (t(), i("p", Un, r(o.value.hint), 1)) : g("", !0),
          o.value.solution ? (t(), i("div", _n, [o.value.solution.kind === "exact" ? (t(), i("p", jn, r(l(pt)(o.value.solution.answer, o.value.response, j.value)), 1)) : o.value.solution.kind === "gaps" ? (t(), i("p", Wn, r(o.value.solution.accepted.map((q) => q.forms.join(" / ")).join(`
`)), 1)) : g("", !0), o.value.solution.kind !== "semantic" ? (t(), i("p", Gn, r(o.value.solution.explanation), 1)) : (t(), i("button", {
            key: 3,
            type: "button",
            onClick: I[13] || (I[13] = (q) => a("ask", o.value.id))
          }, "请语伴讲解"))])) : g("", !0),
          (!T.value || k.value) && f.value[o.value.id] ? (t(), Z(gt, {
            key: o.value.id,
            modelValue: z.value,
            "onUpdate:modelValue": I[14] || (I[14] = (q) => z.value = q),
            response: o.value.response,
            paragraphs: j.value,
            disabled: e.disabled,
            onSubmit: M
          }, null, 8, [
            "modelValue",
            "response",
            "paragraphs",
            "disabled"
          ])) : g("", !0),
          T.value ? (t(), Z(bt, {
            key: 3,
            attempt: T.value,
            feedback: J.value,
            response: o.value.response,
            paragraphs: j.value,
            disabled: e.disabled,
            revised: !!e.state.unit?.attempts.some((q) => q.revisesAttemptId === T.value?.id),
            onAction: I[15] || (I[15] = (q, G) => {
              a("action", q, G), a("close");
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
            onClick: I[16] || (I[16] = (q) => {
              k.value = !k.value, f.value[o.value.id] ??= {
                response: JSON.stringify(o.value.response),
                value: l(Ae)(o.value.response)
              };
            })
          }, r(k.value ? "收起再练" : "再试一次"), 9, Fn)) : g("", !0)
        ])) : g("", !0)
      ], 512),
      W(Yt, {
        state: e.state,
        onAction: I[17] || (I[17] = (q, G) => a("action", q, G))
      }, null, 8, ["state"])
    ])], 40, An));
  }
}), zn = Hn, Yn = {
  role: "alertdialog",
  "aria-labelledby": "learning-approval-title",
  "aria-describedby": "learning-approval-detail",
  class: "learning-confirm"
}, Kn = { id: "learning-approval-title" }, Zn = { id: "learning-approval-detail" }, Jn = { class: "learning-row" }, Qn = ["disabled"], Xn = ["disabled"], ei = /* @__PURE__ */ ee({
  __name: "LearningApproval",
  props: {
    approval: {},
    pending: { type: Boolean }
  },
  emits: ["action"],
  setup(e, { emit: c }) {
    const s = e, a = c, u = F(null), d = (v) => a("action", "approve-operation", {
      id: s.approval.id,
      approved: v
    });
    return vt(u, () => d(!1)), (v, b) => (t(), i("div", {
      ref_key: "layer",
      ref: u,
      class: "learning-confirm-shade",
      onKeydown: b[2] || (b[2] = Se(oe((C) => d(!1), ["stop", "prevent"]), ["esc"]))
    }, [n("section", Yn, [
      n("h2", Kn, r(l(He).title), 1),
      n("p", null, r(e.approval.title), 1),
      n("p", Zn, r(l(He).detail), 1),
      n("div", Jn, [n("button", {
        autofocus: "",
        type: "button",
        disabled: e.pending,
        onClick: b[0] || (b[0] = (C) => d(!1))
      }, r(l(He).decline), 9, Qn), n("button", {
        type: "button",
        class: "learning-primary",
        disabled: e.pending,
        onClick: b[1] || (b[1] = (C) => d(!0))
      }, r(l(He).accept), 9, Xn)])
    ])], 544));
  }
}), ti = ei;
function ai(e, c) {
  return /^(zh|ja|ko)\b/iu.test(c) ? {
    count: [...e.replace(/[\s\p{P}\p{S}]/gu, "")].length,
    unit: "characters"
  } : {
    count: e.match(/[\p{L}\p{N}][\p{L}\p{N}\p{M}'’-]*/gu)?.length ?? 0,
    unit: "words"
  };
}
var ni = 864e5;
function Nt(e, c) {
  const s = ai(e, c);
  return {
    count: s.count,
    unit: s.unit === "characters" ? "字" : "词"
  };
}
function ea(e, c) {
  const s = [], a = /* @__PURE__ */ new Map();
  for (const u of c)
    if (u.quote)
      for (let d = e.indexOf(u.quote); d >= 0; d = e.indexOf(u.quote, d + 1)) {
        const v = d + u.quote.length;
        if (!s.some(([b, C]) => d < C && b < v)) {
          s.push([d, v]), a.set(u.id, d);
          break;
        }
      }
  return a;
}
function ii(e, c) {
  const s = e.split(/(\r?\n)/u), a = [];
  s.forEach((k, $) => {
    $ % 2 === 0 && k.trim() && a.push($);
  });
  const u = [], d = [], v = /* @__PURE__ */ new Map();
  for (const k of c) v.set(k.paragraphIndex, [...v.get(k.paragraphIndex) ?? [], k]);
  for (const [k, $] of v) {
    const m = a[k];
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
function li(e, c) {
  const s = ea(e, c), a = c.filter((v) => s.has(v.id)).map((v) => ({
    id: v.id,
    start: s.get(v.id),
    length: v.quote.length
  })).sort((v, b) => v.start - b.start), u = [];
  let d = 0;
  for (const v of a)
    v.start > d && u.push({ text: e.slice(d, v.start) }), u.push({
      text: e.slice(v.start, v.start + v.length),
      id: v.id
    }), d = v.start + v.length;
  return (d < e.length || !u.length) && u.push({ text: e.slice(d) }), u;
}
function si(e, c = "xiaobai-learning-seen-units") {
  const s = /* @__PURE__ */ new Set(), a = () => {
    try {
      const u = JSON.parse(e()?.getItem(c) ?? "[]");
      return Array.isArray(u) ? u.filter((d) => typeof d == "string") : [];
    } catch {
      return [];
    }
  };
  return {
    has: (u) => s.has(u) || a().includes(u),
    mark(u) {
      s.add(u);
      try {
        e()?.setItem(c, JSON.stringify([.../* @__PURE__ */ new Set([...a(), u])].slice(-50)));
      } catch {
      }
    }
  };
}
var ri = () => {
  try {
    return globalThis.localStorage;
  } catch {
    return null;
  }
}, Ot = si(ri);
function mt(e, c = Date.now()) {
  const s = new Date(e), a = new Date(c), u = Math.round((Date.UTC(s.getFullYear(), s.getMonth(), s.getDate()) - Date.UTC(a.getFullYear(), a.getMonth(), a.getDate())) / ni);
  return !Number.isFinite(u) || u <= 0 ? "今天复习" : u === 1 ? "明天再见" : `${u} 天后再见`;
}
var oi = { class: "learning-records-page" }, ui = {
  key: 0,
  class: "learning-page-heading"
}, di = {
  key: 0,
  class: "learning-muted"
}, vi = { class: "learning-muted" }, ci = {
  key: 0,
  class: "learning-muted"
}, gi = ["disabled", "onClick"], pi = ["disabled"], bi = {
  key: 0,
  class: "learning-empty-note"
}, mi = ["disabled", "onClick"], fi = ["title"], ki = {
  key: 1,
  class: "learning-row"
}, yi = ["disabled"], hi = { class: "learning-muted" }, $i = ["disabled"], wi = /* @__PURE__ */ ee({
  __name: "LearningRecords",
  props: {
    state: {},
    disabled: { type: Boolean },
    embedded: { type: Boolean }
  },
  emits: ["action", "remove"],
  setup(e, { emit: c }) {
    const s = e, a = c;
    Ke(() => s.state.record ? (a("action", "records", { offset: s.state.records.offset }), !0) : !1);
    const u = {
      deleteAnswer: "删除这次作答",
      deleteRecord: "删除记录",
      answerWarning: "这次作答和对应的反馈会删除，相关知识点的掌握情况会更新。已到账奖励保留。",
      recordWarning: "这条学习记录会删除，仅属于它的历史作答也会删除。当前练习不受影响。",
      hidden: "听力原文暂未显示，下面是你的作答和点评。"
    };
    return (d, v) => (t(), i("section", oi, [!e.embedded || e.state.record ? (t(), i("div", ui, [v[5] || (v[5] = n("h1", null, "学习记录", -1)), e.state.records.total ? (t(), i("span", di, r(e.state.records.total) + " 项", 1)) : g("", !0)])) : g("", !0), e.state.record ? (t(), i(E, { key: 1 }, [
      n("button", {
        type: "button",
        onClick: v[0] || (v[0] = (b) => d.$emit("action", "records", { offset: e.state.records.offset }))
      }, "‹ 返回记录"),
      n("h2", null, r(e.state.record.label), 1),
      (t(!0), i(E, null, _(e.state.record.evidence, (b) => (t(), i("article", {
        key: b.attempt.id,
        class: "learning-record-evidence"
      }, [
        n("p", vi, r(new Date(b.attempt.submittedAt).toLocaleDateString()), 1),
        n("h3", null, r(b.exercise.prompt), 1),
        (t(!0), i(E, null, _(b.materials, (C) => (t(), i("details", { key: C.id }, [n("summary", null, r(C.title), 1), C.hidden ? (t(), i("p", ci, r(u.hidden), 1)) : (t(!0), i(E, { key: 1 }, _(C.paragraphs, (k) => (t(), i("p", { key: k.id }, r(k.text), 1))), 128))]))), 128)),
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
        }, r(u.deleteAnswer), 9, gi)
      ]))), 128)),
      n("button", {
        type: "button",
        disabled: e.disabled,
        onClick: v[2] || (v[2] = (b) => d.$emit("remove", "delete-item", { id: e.state.record.id }, u.recordWarning))
      }, r(u.deleteRecord), 9, pi)
    ], 64)) : (t(), i(E, { key: 2 }, [
      e.state.records.total ? g("", !0) : (t(), i("p", bi, "暂无学习记录")),
      (t(!0), i(E, null, _(e.state.records.items, (b) => (t(), i("button", {
        key: b.id,
        class: "learning-record-row",
        type: "button",
        disabled: !b.readable,
        onClick: (C) => d.$emit("action", "records", {
          id: b.id,
          offset: e.state.records.offset
        })
      }, [n("span", null, [n("strong", null, r(b.label), 1), n("small", null, [H(r(l(Ht)(b.evidenceCount)), 1), b.nextReviewAt ? (t(), i("span", {
        key: 0,
        title: b.scheduleReason ?? void 0
      }, " · " + r(l(mt)(b.nextReviewAt)) + "（" + r(new Date(b.nextReviewAt).toLocaleDateString()) + "）", 9, fi)) : g("", !0)])]), n("em", null, r(l(Ft)[b.state]), 1)], 8, mi))), 128)),
      e.state.records.total > 30 ? (t(), i("div", ki, [
        n("button", {
          type: "button",
          disabled: e.state.records.offset === 0,
          onClick: v[3] || (v[3] = (b) => d.$emit("action", "records", { offset: Math.max(0, e.state.records.offset - 30) }))
        }, "上一页", 8, yi),
        n("span", hi, r(e.state.records.total) + " 项", 1),
        n("button", {
          type: "button",
          disabled: e.state.records.offset + 30 >= e.state.records.total,
          onClick: v[4] || (v[4] = (b) => d.$emit("action", "records", { offset: e.state.records.offset + 30 }))
        }, "下一页", 8, $i)
      ])) : g("", !0)
    ], 64))]));
  }
}), Bt = wi, xi = { class: "learning-books-page" }, Ci = { class: "learning-page-heading" }, Ii = {
  key: 0,
  class: "learning-due"
}, Li = { key: 0 }, Si = { key: 1 }, Ai = ["disabled"], Ri = {
  class: "learning-tabs",
  role: "tablist",
  "aria-label": "学习记录视图"
}, Mi = ["aria-selected", "onClick"], Ei = {
  key: 0,
  class: "learning-empty-note"
}, Ti = { class: "learning-book-list" }, Ni = ["disabled", "onClick"], Oi = ["aria-expanded", "onClick"], Bi = {
  key: 1,
  class: "learning-chip-reason"
}, qi = {
  key: 2,
  class: "learning-growth"
}, Pi = {
  key: 0,
  class: "learning-empty-note"
}, Vi = { class: "learning-muted" }, Di = { key: 0 }, Ui = { key: 0 }, _i = { key: 1 }, ji = { key: 2 }, Wi = /* @__PURE__ */ ee({
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
    const s = e, a = c, u = Ee().books, d = ke(u, "tab"), v = [
      ["grammar", "语法本"],
      ["vocabulary", "生词本"],
      ["growth", "成长"],
      ["all", "全部记录"]
    ], b = { title: "学习本" }, C = ke(u, "reason"), k = S(() => d.value === "grammar" || d.value === "vocabulary" ? s.state.books[d.value] : []), $ = S(() => s.state.growth), m = S(() => !!s.state.review && s.state.review.stage.stage !== "complete");
    return (y, f) => (t(), i("section", xi, [e.state.record ? (t(), Z(Bt, {
      key: 0,
      state: e.state,
      disabled: e.disabled,
      onAction: f[0] || (f[0] = (w, o) => a("action", w, o)),
      onRemove: f[1] || (f[1] = (w, o, x) => a("remove", w, o, x))
    }, null, 8, ["state", "disabled"])) : (t(), i(E, { key: 1 }, [
      n("div", Ci, [n("h1", null, r(b.title), 1)]),
      e.state.dueCount || m.value ? (t(), i("div", Ii, [e.state.dueCount ? (t(), i("span", Li, r(l(zt)(e.state.dueCount)), 1)) : g("", !0), e.state.blockedReview ? (t(), i("small", Si, "有一组复习在另一个故事中进行，回到学习页可以放下它")) : m.value ? (t(), i("button", {
        key: 3,
        type: "button",
        class: "learning-primary",
        onClick: f[3] || (f[3] = (w) => a("review"))
      }, r(l(X).resumeReview), 1)) : (t(), i("button", {
        key: 2,
        type: "button",
        class: "learning-primary",
        disabled: e.disabled,
        onClick: f[2] || (f[2] = (w) => a("action", "start-review"))
      }, r(l(X).review), 9, Ai))])) : g("", !0),
      n("div", Ri, [(t(), i(E, null, _(v, ([w, o]) => n("button", {
        key: w,
        type: "button",
        role: "tab",
        "aria-selected": d.value === w,
        onClick: (x) => {
          d.value = w, C.value = "";
        }
      }, r(o), 9, Mi)), 64))]),
      d.value === "grammar" || d.value === "vocabulary" ? (t(), i(E, { key: 1 }, [k.value.length ? g("", !0) : (t(), i("p", Ei, r(d.value === "grammar" ? "批改里出现的语法问题会记到这里。" : "批改里的词汇问题、读文章时收藏的词语会记到这里。"), 1)), n("ul", Ti, [(t(!0), i(E, null, _(k.value, (w) => (t(), i("li", { key: w.id }, [
        n("button", {
          type: "button",
          class: "learning-book-item",
          disabled: !w.readable,
          onClick: (o) => a("action", "records", {
            id: w.id,
            offset: e.state.records.offset
          })
        }, [n("strong", null, r(w.label), 1), n("small", null, r(l(Ft)[w.state]) + " · " + r(l(Ht)(w.evidenceCount)), 1)], 8, Ni),
        w.nextReviewAt ? (t(), i("button", {
          key: 0,
          type: "button",
          class: "learning-chip",
          "aria-expanded": C.value === w.id,
          onClick: (o) => C.value = C.value === w.id ? "" : w.id
        }, r(l(mt)(w.nextReviewAt)), 9, Oi)) : g("", !0),
        C.value === w.id ? (t(), i("small", Bi, r(w.scheduleReason), 1)) : g("", !0)
      ]))), 128))])], 64)) : d.value === "growth" ? (t(), i("section", qi, [$.value.enough ? (t(), i(E, { key: 1 }, [
        n("p", Vi, [H("来自 " + r($.value.evidence) + " 份作答", 1), $.value.completed ? (t(), i("span", Di, "、" + r($.value.completed) + " 次完成", 1)) : g("", !0)]),
        $.value.steady.length ? (t(), i("div", Ui, [f[6] || (f[6] = n("h2", null, "已经稳定", -1)), n("p", null, r($.value.steady.join("、")), 1)])) : g("", !0),
        $.value.practising.length ? (t(), i("div", _i, [f[7] || (f[7] = n("h2", null, "最近独立做对", -1)), n("p", null, r($.value.practising.join("、")), 1)])) : g("", !0),
        $.value.struggling.length ? (t(), i("div", ji, [f[8] || (f[8] = n("h2", null, "还要再练", -1)), n("p", null, r($.value.struggling.join("、")), 1)])) : g("", !0)
      ], 64)) : (t(), i("p", Pi, "还需要几次练习才看得出"))])) : (t(), Z(Bt, {
        key: 3,
        embedded: "",
        state: e.state,
        disabled: e.disabled,
        onAction: f[4] || (f[4] = (w, o) => a("action", w, o)),
        onRemove: f[5] || (f[5] = (w, o, x) => a("remove", w, o, x))
      }, null, 8, ["state", "disabled"]))
    ], 64))]));
  }
}), Gi = Wi, Fi = {
  class: "learning-settings-card",
  "aria-label": "训练设置"
}, Hi = { key: 0 }, zi = ["disabled"], Yi = ["open"], Ki = ["value"], Zi = { class: "learning-row" }, Ji = ["disabled"], Qi = /* @__PURE__ */ ee({
  __name: "LearningSettingsCard",
  props: {
    state: {},
    disabled: { type: Boolean },
    onboarding: { type: Boolean }
  },
  emits: ["action"],
  setup(e, { emit: c }) {
    const s = e, a = c, u = [
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
      }, a("action", "settings", { value: w });
    }
    return (w, o) => (t(), i("section", Fi, [C.value ? g("", !0) : (t(), i("dl", Hi, [(t(!0), i(E, null, _(y.value, ([x, N]) => (t(), i("div", { key: x }, [n("dt", null, r(x), 1), n("dd", null, r(N), 1)]))), 128))])), C.value ? (t(), i("form", {
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
        n("summary", null, r(l(X).optionalSettings), 1),
        n("label", null, [o[10] || (o[10] = H("讲解语言", -1)), ne(n("select", { "onUpdate:modelValue": o[4] || (o[4] = (x) => l(b).explanationLanguage = x) }, [(t(!0), i(E, null, _(m.value, (x) => (t(), i("option", {
          key: x,
          value: x
        }, r($(x)), 9, Ki))), 128))], 512), [[Ye, l(b).explanationLanguage]])]),
        n("label", null, [o[11] || (o[11] = H("感兴趣的话题", -1)), ne(n("input", {
          "onUpdate:modelValue": o[5] || (o[5] = (x) => l(b).interests = x),
          type: "text",
          maxlength: "200",
          placeholder: "不限"
        }, null, 512), [[ve, l(b).interests]])])
      ], 8, Yi),
      n("div", Zi, [e.onboarding ? g("", !0) : (t(), i("button", {
        key: 0,
        type: "button",
        onClick: o[6] || (o[6] = (x) => {
          C.value = !1, l(v).submitted = null;
        })
      }, "取消")), n("button", {
        type: "submit",
        class: "learning-primary",
        disabled: e.disabled
      }, r(e.onboarding ? l(X).setupFinish : l(X).saveSettings), 9, Ji)])
    ], 32)) : (t(), i("button", {
      key: 1,
      type: "button",
      disabled: e.disabled,
      onClick: o[0] || (o[0] = (x) => {
        k(), C.value = !0;
      })
    }, "调整", 8, zi))]));
  }
}), ta = Qi, Xi = { class: "learning-profile-page" }, el = { class: "learning-setup-heading" }, tl = { class: "learning-eyebrow" }, al = { class: "learning-language-options" }, nl = [
  "disabled",
  "aria-pressed",
  "onClick"
], il = { "aria-hidden": "true" }, ll = ["disabled"], sl = {
  key: 0,
  class: "learning-setup-empty"
}, rl = { class: "learning-teacher-options" }, ol = [
  "disabled",
  "aria-pressed",
  "onClick"
], ul = { class: "learning-person-initial" }, dl = {
  key: 1,
  class: "learning-selected-teacher"
}, vl = { class: "learning-person-initial" }, cl = { key: 0 }, gl = ["open"], pl = ["disabled"], bl = ["disabled"], ml = ["disabled"], fl = { class: "learning-setup-actions" }, kl = ["disabled"], yl = ["disabled"], hl = /* @__PURE__ */ ee({
  __name: "LearningSetup",
  props: {
    state: {},
    disabled: { type: Boolean }
  },
  emits: ["action"],
  setup(e, { emit: c }) {
    const s = c, a = Ee().setup, u = ke(a, "step"), d = F(null), v = ke(a, "name"), b = ke(a, "note"), C = [
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
    return Ke(() => u.value ? (k(u.value - 1), !0) : !1), ($, m) => (t(), i("section", Xi, [n("div", el, [n("p", tl, r(u.value + 1) + " / " + r(l(X).setupSteps), 1), n("h1", {
      ref_key: "heading",
      ref: d,
      tabindex: "-1"
    }, r(u.value === 0 ? "选择要学习的语言" : u.value === 1 ? "选择语伴" : l(X).setupTitle), 513)]), u.value === 0 ? (t(), i(E, { key: 0 }, [n("div", al, [(t(), i(E, null, _(C, ([y, f, w]) => n("button", {
      key: y,
      type: "button",
      disabled: e.disabled,
      "aria-pressed": e.state.language === y,
      onClick: (o) => s("action", "language", { language: y })
    }, [
      n("span", il, r(w), 1),
      n("strong", null, r(f), 1),
      e.state.language === y ? (t(), Z(Y, {
        key: 0,
        name: "check"
      })) : g("", !0)
    ], 8, nl)), 64))]), n("button", {
      type: "button",
      class: "learning-primary learning-setup-next",
      disabled: e.disabled,
      onClick: m[0] || (m[0] = (y) => k(1))
    }, [m[7] || (m[7] = H("继续", -1)), W(Y, { name: "arrow" })], 8, ll)], 64)) : u.value === 1 ? (t(), i(E, { key: 1 }, [
      e.state.candidates.length ? g("", !0) : (t(), i("p", sl, "当前故事里还没有认识的人物，所以没有可选的语伴。可以在下面手动填一位：名字加一句身份说明。")),
      n("div", rl, [(t(!0), i(E, null, _(e.state.candidates, (y) => (t(), i("button", {
        key: y.name,
        type: "button",
        disabled: e.disabled,
        "aria-pressed": e.state.teacher?.name === y.name,
        onClick: (f) => s("action", "teacher", { teacher: {
          name: y.name,
          note: ""
        } })
      }, [
        n("span", ul, r([...y.name][0]), 1),
        n("strong", null, r(y.name), 1),
        e.state.teacher?.name === y.name ? (t(), Z(Y, {
          key: 0,
          name: "check"
        })) : g("", !0)
      ], 8, ol))), 128))]),
      e.state.teacher && !e.state.candidates.some((y) => y.name === e.state.teacher?.name) ? (t(), i("p", dl, [
        n("span", vl, r([...e.state.teacher.name][0]), 1),
        n("span", null, [H(r(e.state.teacher.name), 1), e.state.teacher.note ? (t(), i("small", cl, r(e.state.teacher.note), 1)) : g("", !0)]),
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
        }, null, 8, pl), [[ve, v.value]])]),
        n("label", null, [m[9] || (m[9] = H("一句身份说明", -1)), ne(n("input", {
          "onUpdate:modelValue": m[2] || (m[2] = (y) => b.value = y),
          type: "text",
          maxlength: "200",
          placeholder: "例如 在东京长大的邻居，说话直爽",
          disabled: e.disabled
        }, null, 8, bl), [[ve, b.value]])]),
        n("button", {
          type: "submit",
          disabled: e.disabled || !v.value.trim()
        }, "选这位", 8, ml)
      ], 32)], 8, gl),
      n("div", fl, [n("button", {
        type: "button",
        disabled: e.disabled,
        onClick: m[4] || (m[4] = (y) => k(0))
      }, "上一步", 8, kl), n("button", {
        type: "button",
        class: "learning-primary",
        disabled: e.disabled,
        onClick: m[5] || (m[5] = (y) => k(2))
      }, [H(r(e.state.teacher ? l(X).setupContinue : l(Q).skipCompanion), 1), W(Y, { name: "arrow" })], 8, yl)])
    ], 64)) : (t(), Z(ta, {
      key: 2,
      onboarding: "",
      state: e.state,
      disabled: e.disabled,
      onAction: m[6] || (m[6] = (y, f) => s("action", y, f ?? {}))
    }, null, 8, ["state", "disabled"]))]));
  }
}), $l = hl, wl = { class: "learning-companion-control" }, xl = {
  key: 0,
  class: "learning-sr-only"
}, Cl = { class: "learning-companion-options" }, Il = { class: "learning-companion-switch" }, Ll = ["aria-label"], Sl = { class: "learning-cost-note" }, Al = /* @__PURE__ */ ee({
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
    return (a, u) => (t(), i("details", wl, [n("summary", null, [
      n("span", {
        class: se(["learning-companion-light", { "is-on": c.value }]),
        "aria-hidden": "true"
      }, null, 2),
      H(r(c.value ? e.name ? `${e.name} · ${s.on}` : s.on : s.title), 1),
      c.value ? g("", !0) : (t(), i("span", xl, r(s.off), 1))
    ]), n("div", Cl, [n("label", Il, [n("span", null, r(s.description), 1), ne(n("input", {
      "onUpdate:modelValue": u[0] || (u[0] = (d) => c.value = d),
      type: "checkbox",
      role: "switch",
      "aria-label": s.title
    }, null, 8, Ll), [[ba, c.value]])]), n("details", Sl, [n("summary", null, r(s.costTitle), 1), n("small", null, r(s.cost), 1)])])]));
  }
}), aa = Al, rt = {
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
}, Rl = {
  context: "翻看学习资料",
  config: "连接 AI",
  session: "准备学习内容",
  summary: "整理之前聊过的内容",
  provider: "组织回复",
  tools: "整理学习内容",
  save: "保存学习内容",
  action: "准备学习内容"
};
function Ml(e) {
  return `正在${Rl[e.stage]}…`;
}
var Rd = Object.freeze({
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
var El = ["aria-labelledby"], Tl = { id: "learning-grading-title" }, Nl = {
  key: 0,
  class: "learning-grading-actions"
}, Ol = {
  key: 0,
  class: "learning-annotation-missing",
  role: "status"
}, Bl = ["disabled"], ql = ["disabled"], Pl = ["open", "onToggle"], Vl = {
  key: 0,
  class: "learning-revised-text"
}, Dl = { class: "learning-write-saved" }, Ul = { key: 0 }, _l = {
  key: 1,
  class: "learning-graded-guidance"
}, jl = ["onClick"], Wl = ["open", "onToggle"], Gl = { key: 0 }, Fl = { key: 1 }, Hl = { key: 4 }, zl = { class: "learning-graded-text" }, Yl = { class: "learning-annotation-fixed" }, Kl = {
  key: 0,
  class: "learning-annotation-missing"
}, Zl = {
  key: 1,
  class: "learning-annotation-fixed"
}, Jl = ["onClick"], Ql = { class: "learning-annotation-tag" }, Xl = {
  key: 0,
  class: "learning-annotation-suggestion"
}, es = ["onSubmit"], ts = ["onUpdate:modelValue", "aria-label"], as = ["disabled"], ns = { key: 2 }, is = ["onClick"], ls = {
  key: 1,
  class: "learning-working",
  role: "status"
}, ss = ["disabled"], rs = ["disabled"], os = {
  key: 2,
  class: "learning-model-essay"
}, us = /* @__PURE__ */ ee({
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
    const s = e, a = c, u = {
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
    }, C = (O) => O.itemId && (O.category === "grammar" || O.category === "vocabulary") ? v[O.category] : null, k = Te(() => s.unit.id), $ = S(() => k.value.edits), m = S(() => s.unit.stage.stage), y = S(() => new Map(s.unit.materials.flatMap((O) => O.paragraphs).map((O, V) => [O.id, V + 1]))), f = (O) => O?.answer.kind === "text" ? O.answer.text : "", w = S(() => Zt(s.unit).map((O) => {
      const { exercise: V, draft: U, review: P, annotations: L } = O;
      return {
        ...O,
        label: V.paragraphId ? `第 ${y.value.get(V.paragraphId) ?? "?"} 段总结` : V.prompt,
        paragraphs: qt(f(U)).map((B, D) => ({
          index: D,
          segments: li(B, L.filter((ue) => ue.paragraphIndex === D)),
          annotations: L.filter((ue) => ue.paragraphIndex === D)
        })),
        resolved: new Set(P?.resolvedAnnotationIds ?? [])
      };
    }).sort((O, V) => +(V.annotations.length > 0) - +(O.annotations.length > 0))), o = (O) => O.row.status === "revising", x = (O, V) => o(O) && V.severity !== "alternative";
    K(w, (O) => {
      for (const V of O.flatMap((U) => U.annotations)) $.value[V.id] ??= {
        value: V.quote,
        done: !1
      };
    }, { immediate: !0 });
    function N(O) {
      const V = $.value[O.id];
      V?.value.trim() && V.value !== O.quote && (V.done = !0);
    }
    const j = S(() => new Map(w.value.filter(o).map((O) => [O.draft.id, ii(f(O.draft), O.annotations.map((V) => ({
      id: V.id,
      paragraphIndex: V.paragraphIndex,
      quote: V.quote,
      replacement: $.value[V.id]?.done ? $.value[V.id].value : V.quote
    })))]))), T = S(() => new Set([...j.value.values()].flatMap((O) => O.missing))), J = S(() => [...j.value.values()].reduce((O, V) => O + V.applied.length, 0)), z = F("");
    K(J, () => {
      z.value = "";
    });
    const M = S(() => w.value.filter(o).flatMap((O) => O.annotations.filter((V) => V.severity !== "alternative")).length), A = (O, V) => {
      const U = O.annotations.find((P) => P.id === V);
      return U ? ["learning-mark", `is-${U.severity}`] : "";
    };
    function I() {
      const O = w.value.filter(o).flatMap((V) => {
        const U = j.value.get(V.draft.id);
        return !U || U.text === f(V.draft) ? [] : [{
          attemptId: V.draft.id,
          text: U.text
        }];
      });
      O.length ? a("action", "submit-revision", {
        unitId: s.unit.id,
        revisions: O
      }) : z.value = b.unplaced;
    }
    const q = S(() => s.state.pending?.unitId === s.unit.id ? s.state.pending.purpose : null), G = S(() => w.value.some((O) => O.row.status === "grading" || O.row.status === "reviewing"));
    return (O, V) => (t(), i("section", {
      class: "learning-grading",
      "aria-labelledby": e.view === "feedback" ? "learning-grading-title" : void 0
    }, [
      e.view === "feedback" ? (t(), i(E, { key: 0 }, [
        n("h2", Tl, r(b.title), 1),
        w.value.some(o) ? (t(), i("div", Nl, [
          n("small", null, "已改 " + r(J.value) + " / " + r(M.value) + " 处", 1),
          z.value ? (t(), i("small", Ol, r(z.value), 1)) : g("", !0),
          n("button", {
            type: "button",
            disabled: e.disabled,
            onClick: V[0] || (V[0] = (U) => a("confirm", "skip-revision", { unitId: e.unit.id }, "跳过这次修改？批注会保留，直接进入范文。"))
          }, "跳过修改", 8, Bl),
          n("button", {
            type: "button",
            class: "learning-primary",
            disabled: e.disabled || !J.value,
            onClick: I
          }, "提交修改", 8, ql)
        ])) : g("", !0),
        (t(!0), i(E, null, _(w.value, (U) => (t(), i("details", {
          key: U.exercise.id,
          class: "learning-graded",
          open: l(k).expanded[`grading:${U.draft.id}`] ?? U.annotations.length > 0,
          onToggle: (P) => l(k).expanded[`grading:${U.draft.id}`] = P.target.open
        }, [
          n("summary", null, [n("h3", null, r(U.label), 1)]),
          U.revision ? (t(), i("section", Vl, [
            n("h4", null, r(l(X).revision), 1),
            n("p", Dl, r(f(U.revision)), 1),
            U.review?.guidance ? (t(), i("p", Ul, r(U.review.guidance), 1)) : g("", !0)
          ])) : g("", !0),
          U.assessment?.guidance ? (t(), i("p", _l, r(U.assessment.guidance), 1)) : g("", !0),
          U.assessment ? (t(), i("button", {
            key: 2,
            type: "button",
            onClick: (P) => a("ask", U.exercise.id)
          }, r(l(Q).askAssessment), 9, jl)) : g("", !0),
          U.assessment && (U.assessment.understanding || U.assessment.expression) ? (t(), i("details", {
            key: 3,
            class: "learning-graded-more",
            open: l(k).expanded[`feedback:${U.draft.id}`],
            onToggle: (P) => l(k).expanded[`feedback:${U.draft.id}`] = P.target.open
          }, [
            V[5] || (V[5] = n("summary", null, "理解与表达点评", -1)),
            U.assessment.understanding ? (t(), i("p", Gl, [V[3] || (V[3] = n("b", null, "理解", -1)), H(r(U.assessment.understanding), 1)])) : g("", !0),
            U.assessment.expression ? (t(), i("p", Fl, [V[4] || (V[4] = n("b", null, "表达", -1)), H(r(U.assessment.expression), 1)])) : g("", !0)
          ], 40, Wl)) : g("", !0),
          U.revision ? (t(), i("h4", Hl, r(l(X).original), 1)) : g("", !0),
          (t(!0), i(E, null, _(U.paragraphs, (P) => (t(), i("div", {
            key: P.index,
            class: "learning-graded-paragraph"
          }, [n("p", zl, [(t(!0), i(E, null, _(P.segments, (L, B) => (t(), i(E, { key: B }, [L.id ? (t(), i("mark", {
            key: 0,
            class: se(A(U, L.id))
          }, r(L.text), 3)) : (t(), i(E, { key: 1 }, [H(r(L.text), 1)], 64))], 64))), 128))]), (t(!0), i(E, null, _(P.annotations, (L) => (t(), i("div", {
            key: L.id,
            class: se(["learning-annotation", [`is-${L.severity}`, {
              "is-fixed": U.resolved.has(L.id),
              "is-edited": $.value[L.id]?.done && o(U)
            }]])
          }, [U.resolved.has(L.id) ? (t(), i(E, { key: 0 }, [n("p", Yl, "✓ " + r(l(X).resolved), 1), n("p", null, r(L.explanation), 1)], 64)) : $.value[L.id]?.done && o(U) ? (t(), i(E, { key: 1 }, [T.value.has(L.id) ? (t(), i("p", Kl, "原文里找不到“" + r(L.quote) + "”，这处改动不会写进修改稿。", 1)) : (t(), i("p", Zl, "✓ 改为“" + r($.value[L.id].value) + "”", 1)), n("button", {
            type: "button",
            onClick: (B) => $.value[L.id].done = !1
          }, "再改", 8, Jl)], 64)) : (t(), i(E, { key: 2 }, [
            n("p", Ql, [n("span", null, r(d[L.severity]), 1), H(r(u[L.category]), 1)]),
            n("p", null, r(L.explanation), 1),
            L.suggestion ? (t(), i("p", Xl, "可以写成：" + r(L.suggestion), 1)) : g("", !0),
            x(U, L) && $.value[L.id] ? (t(), i("form", {
              key: 1,
              class: "learning-annotation-edit",
              onSubmit: oe((B) => N(L), ["prevent"])
            }, [ne(n("textarea", {
              "onUpdate:modelValue": (B) => $.value[L.id].value = B,
              rows: "2",
              "aria-label": `改写：${L.quote}`,
              maxlength: "600"
            }, null, 8, ts), [[ve, $.value[L.id].value], [l(Je), $.value[L.id]]]), n("button", {
              type: "submit",
              disabled: !$.value[L.id].value.trim() || $.value[L.id].value === L.quote
            }, "改好了", 8, as)], 40, es)) : U.review && L.severity !== "alternative" ? (t(), i("small", ns, "复核时这里还没改到")) : g("", !0)
          ], 64)), C(L) ? (t(), i("button", {
            key: 3,
            type: "button",
            class: "learning-annotation-book",
            onClick: (B) => a("record", L.itemId)
          }, r(C(L)) + " ↗", 9, is)) : g("", !0)], 2))), 128))]))), 128))
        ], 40, Pl))), 128))
      ], 64)) : g("", !0),
      G.value || m.value === "model" ? (t(), i("div", ls, [q.value ? (t(), i(E, { key: 0 }, [
        V[6] || (V[6] = n("span", {
          class: "learning-working-dot",
          "aria-hidden": "true"
        }, null, -1)),
        n("span", null, r(q.value === "grade" ? l(X).grading : q.value === "revision-review" ? l(X).reviewing : l(X).modelling), 1),
        n("button", {
          type: "button",
          disabled: e.pending,
          onClick: V[1] || (V[1] = (U) => a("action", "cancel"))
        }, r(l(X).stop), 9, ss)
      ], 64)) : (t(), i("button", {
        key: 1,
        type: "button",
        class: "learning-primary",
        disabled: e.disabled,
        onClick: V[2] || (V[2] = (U) => a("action", "grade", { unitId: e.unit.id }))
      }, r(m.value === "grading" ? l(X).grade : l(X).continue), 9, rs))])) : g("", !0),
      e.view === "model" && e.unit.modelEssay ? (t(), i("section", os, [n("h3", null, [V[7] || (V[7] = H("范文", -1)), n("small", null, r(e.unit.modelEssay.level), 1)]), (t(!0), i(E, null, _(l(qt)(e.unit.modelEssay.text), (U, P) => (t(), i("p", { key: P }, r(U), 1))), 128))])) : g("", !0)
    ], 8, El));
  }
}), ds = us, vs = {
  class: "learning-complete",
  role: "status",
  "aria-live": "polite"
}, cs = {
  key: 0,
  class: "learning-complete-burst",
  "aria-hidden": "true"
}, gs = { class: "learning-complete-title" }, ps = {
  key: 1,
  class: "learning-complete-amount"
}, bs = ["disabled"], ms = /* @__PURE__ */ ee({
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
    const s = e, a = c, u = S(() => s.state.completions.find((v) => v.unitId === s.unitId)), d = S(() => {
      const v = u.value?.rewardStatus;
      return v === "paid" ? ge.paid : v === "retired" ? ge.retired : u.value ? s.state.walletOpen ? ge.pending : ge.needsWallet : ge.saving;
    });
    return (v, b) => (t(), i("section", vs, [
      e.quiet ? g("", !0) : (t(), i("div", cs, [(t(), i(E, null, _(8, (C) => n("span", {
        key: C,
        style: Ut({ "--i": C })
      }, null, 4)), 64))])),
      n("p", gs, r(e.label), 1),
      u.value?.rewardStatus !== "retired" ? (t(), i("p", ps, [n("strong", null, r(u.value?.rewardStatus === "paid" ? "+" : "") + r(u.value?.amount ?? e.amount), 1), b[1] || (b[1] = n("span", null, "小白币", -1))])) : g("", !0),
      n("small", null, r(d.value), 1),
      u.value && u.value.rewardStatus !== "paid" && u.value.rewardStatus !== "retired" ? (t(), i("button", {
        key: 2,
        type: "button",
        disabled: e.disabled || e.state.walletStorage !== "ready",
        onClick: b[0] || (b[0] = (C) => a("action", "reward", {
          unitId: e.unitId,
          openWallet: !e.state.walletOpen
        }))
      }, r(e.state.walletOpen ? l(ge).claim : l(ge).openWallet), 9, bs)) : g("", !0)
    ]));
  }
}), na = ms, fs = ["data-exercise-id"], ks = { class: "learning-write-label" }, ys = [
  "aria-label",
  "placeholder",
  "rows",
  "onKeydown"
], hs = { class: "learning-write-foot" }, $s = { "aria-live": "polite" }, ws = ["disabled"], xs = { class: "learning-write-saved" }, Cs = { class: "learning-write-foot" }, Is = ["disabled"], Ls = /* @__PURE__ */ ee({
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
    const s = e, a = c, u = Te(() => s.unit.id);
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
      }, a("action", "submit", {
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
    return (x, N) => (t(), i("div", {
      class: se(["learning-write", `is-${e.tone ?? "summary"}`]),
      "data-exercise-id": e.exercise.id
    }, [
      n("p", ks, r(e.label), 1),
      $.value ? (t(), i("form", {
        key: 0,
        onSubmit: oe(w, ["prevent"])
      }, [ne(n("textarea", {
        "onUpdate:modelValue": N[0] || (N[0] = (j) => v.value = j),
        "aria-label": e.label,
        placeholder: e.placeholder,
        maxlength: "4000",
        rows: e.tone === "essay" ? 8 : 3,
        onKeydown: [Se(oe(w, ["ctrl", "prevent"]), ["enter"]), Se(oe(w, ["meta", "prevent"]), ["enter"])]
      }, null, 40, ys), [[ve, v.value], [l(Je), d.value]]), n("div", hs, [
        n("small", $s, r(m.value.count) + " " + r(m.value.unit), 1),
        b.value ? (t(), i("button", {
          key: 0,
          type: "button",
          onClick: N[1] || (N[1] = (j) => {
            b.value = !1, v.value = "";
          })
        }, "取消")) : g("", !0),
        n("button", {
          type: "submit",
          class: "learning-primary",
          disabled: e.disabled || !v.value.trim()
        }, r(C.value ? "保存新稿" : "提交"), 9, ws)
      ])], 32)) : C.value ? (t(), i(E, { key: 1 }, [n("p", xs, r(k.value), 1), n("div", Cs, [n("small", null, "已保存 · " + r(y.value.count) + " " + r(y.value.unit), 1), n("button", {
        type: "button",
        disabled: e.disabled,
        onClick: o
      }, "重写", 8, Is)])], 64)) : g("", !0),
      f.value ? (t(), Z(ct, {
        key: 2,
        class: "learning-markdown learning-write-reply",
        text: f.value
      }, null, 8, ["text"])) : g("", !0)
    ], 10, fs));
  }
}), ia = Ls, le = {
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
}, Ss = "用你的话概括这一段", As = ["data-paragraph-id", "data-material-id"], Rs = { class: "learning-reading-text" }, Ms = {
  class: "learning-reading-number",
  "aria-hidden": "true"
}, Es = ["data-material-id", "data-paragraph-id"], Ts = ["disabled"], Ns = ["open"], Os = { key: 0 }, Bs = { class: "learning-knowledge-text" }, qs = {
  key: 0,
  class: "learning-terms"
}, Ps = [
  "disabled",
  "aria-pressed",
  "onClick"
], Vs = {
  key: 2,
  class: "learning-muted learning-knowledge-pending"
}, Ds = /* @__PURE__ */ ee({
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
    const s = e, a = c, u = S(() => s.unit.explanations.find((y) => y.materialId === s.materialId && y.paragraphId === s.paragraph.id)), d = S(() => s.unit.exercises.find((y) => y.paragraphId === s.paragraph.id)), v = S(() => new Set(s.state.savedTerms)), b = (y) => v.value.has(y), C = Te(() => s.unit.id), k = S(() => `knowledge:${s.materialId}:${s.paragraph.id}`), $ = S(() => C.value.selection?.materialId === s.materialId && C.value.selection.paragraphId === s.paragraph.id ? C.value.selection : null);
    function m() {
      C.value.selection = {
        materialId: s.materialId,
        paragraphId: s.paragraph.id,
        start: 0,
        end: s.paragraph.text.length,
        quote: s.paragraph.text
      };
    }
    return (y, f) => (t(), i("section", {
      class: "learning-reading-paragraph",
      "data-paragraph-id": e.paragraph.id,
      "data-material-id": e.materialId
    }, [
      n("p", Rs, [n("span", Ms, r(e.number), 1), n("span", {
        "data-learning-text": "",
        "data-material-id": e.materialId,
        "data-paragraph-id": e.paragraph.id
      }, r(e.paragraph.text), 9, Es)]),
      n("button", {
        type: "button",
        class: "learning-paragraph-quote",
        disabled: [...e.paragraph.text].length > l(jt),
        onClick: m
      }, r(l(qe).select), 9, Ts),
      $.value ? (t(), Z(Kt, {
        key: 0,
        selection: $.value,
        disabled: e.disabled,
        onAsk: f[0] || (f[0] = (w) => a("ask", d.value?.id, $.value)),
        onSay: f[1] || (f[1] = (w) => a("action", "say", { selection: $.value })),
        onDismiss: f[2] || (f[2] = (w) => l(C).selection = null)
      }, null, 8, ["selection", "disabled"])) : g("", !0),
      u.value ? (t(), i("details", {
        key: 1,
        class: "learning-knowledge",
        open: l(C).expanded[k.value],
        onToggle: f[3] || (f[3] = (w) => l(C).expanded[k.value] = w.target.open)
      }, [
        n("summary", null, [f[5] || (f[5] = H("本段知识", -1)), u.value.terms.length ? (t(), i("span", Os, " · " + r(u.value.terms.length) + " 个词语", 1)) : g("", !0)]),
        n("p", Bs, r(u.value.explanation), 1),
        u.value.terms.length ? (t(), i("ul", qs, [(t(!0), i(E, null, _(u.value.terms, (w) => (t(), i("li", { key: w.text }, [n("span", null, [n("strong", null, r(w.text), 1), n("small", null, r(w.note), 1)]), n("button", {
          type: "button",
          disabled: e.disabled || b(w.text),
          "aria-pressed": b(w.text),
          onClick: (o) => a("action", "bookmark", {
            unitId: e.unit.id,
            materialId: e.materialId,
            paragraphId: e.paragraph.id,
            termText: w.text
          })
        }, r(b(w.text) ? "已收藏" : "收藏"), 9, Ps)]))), 128))])) : g("", !0)
      ], 40, Ns)) : (t(), i("p", Vs, r(e.state.preparation?.running ? l(le).notes : l(le).missingNotes), 1)),
      d.value ? (t(), Z(ia, {
        key: 3,
        state: e.state,
        unit: e.unit,
        exercise: d.value,
        disabled: e.disabled,
        label: l(Ss),
        placeholder: "写下这段的大意，不必逐句翻译",
        onAction: f[4] || (f[4] = (w, o) => a("action", w, o))
      }, null, 8, [
        "state",
        "unit",
        "exercise",
        "disabled",
        "label"
      ])) : g("", !0)
    ], 8, As));
  }
}), Us = Ds;
function _s(e, c) {
  return e === "talk" || e === "retry-chat" ? c === "workbench" ? "workbench-talk" : "talk" : e;
}
var js = /* @__PURE__ */ new Set([
  "language",
  "teacher",
  "forget-conversation",
  "resume",
  "rate",
  "seek",
  "verify-teacher",
  "adopt-teacher"
]), Ws = /* @__PURE__ */ new Set([
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
]), Gs = /* @__PURE__ */ new Set([
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
  return la.has(e) ? !1 : e === "talk" ? c.chatBusy : e === "workbench-talk" ? c.workbenchBusy : js.has(e) ? c.busy || c.chatBusy || c.workbenchBusy || !!c.preparation?.running : c.busy || !!c.preparation?.running && !Ws.has(e);
}
function fe(e, c) {
  return e === "talk" || e === "workbench-talk" ? !ut(e, c) && (e === "talk" ? c.chatStorage : c.workbenchStorage) === "ready" : !ut(e, c) && (la.has(e) || Gs.has(e) || (e === "teacher" ? c.chatStorage === "ready" : c.storage === "ready"));
}
var Fs = ["aria-label"], Hs = [
  "aria-current",
  "disabled",
  "onClick"
], zs = { class: "learning-reading-head" }, Ys = ["open"], Ks = { key: 0 }, Zs = { class: "learning-source" }, Js = ["href"], Qs = { class: "learning-essay-prompt" }, Xs = {
  key: 0,
  class: "learning-essay"
}, er = { class: "learning-muted" }, tr = ["data-exercise-id"], ar = ["aria-label"], nr = ["aria-current"], ir = {
  key: 1,
  class: "learning-stage-bar is-writing"
}, lr = {
  key: 1,
  class: "learning-muted"
}, sr = {
  key: 2,
  class: "learning-stage-bar"
}, rr = ["disabled"], or = ["disabled"], ur = /* @__PURE__ */ ee({
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
    const s = e, a = c, u = F(null), d = Te(() => s.unit.id);
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
    }, j = S(() => {
      let M = 0;
      return s.unit.materials.map((A) => ({
        material: A,
        paragraphs: A.paragraphs.map((I) => ({
          paragraph: I,
          number: ++M
        }))
      }));
    }), T = (M, A) => a("action", M, A);
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
    return (M, A) => (t(), i("article", {
      ref_key: "root",
      ref: u,
      class: "learning-reading"
    }, [
      n("nav", {
        class: "learning-reading-nav",
        "aria-label": l(X).navigation
      }, [(t(), i(E, null, _(C, (I) => n("button", {
        key: I,
        type: "button",
        "aria-current": b.value === I ? "page" : void 0,
        disabled: I === "model" && !e.unit.modelEssay,
        onClick: (q) => k(I)
      }, r(l(X)[I]), 9, Hs)), 64))], 8, Fs),
      e.state.completions.some((I) => I.unitId === e.unit.id) ? (t(), Z(na, {
        key: 0,
        state: e.state,
        "unit-id": e.unit.id,
        amount: e.unit.reward.amount,
        label: l(X).completed,
        disabled: e.disabled,
        onAction: T
      }, null, 8, [
        "state",
        "unit-id",
        "amount",
        "label",
        "disabled"
      ])) : g("", !0),
      b.value === "reading" ? (t(), i(E, { key: 1 }, [
        n("header", zs, [n("details", {
          class: "learning-reading-goal",
          open: l(d).expanded.goal,
          onToggle: A[0] || (A[0] = (I) => l(d).expanded.goal = I.target.open)
        }, [
          n("summary", null, r(N.goal), 1),
          n("strong", null, r(e.unit.title), 1),
          e.unit.goal ? (t(), i("p", Ks, r(e.unit.goal), 1)) : g("", !0)
        ], 40, Ys), W(aa, { name: e.state.teacher?.name }, null, 8, ["name"])]),
        (t(!0), i(E, null, _(j.value, (I, q) => (t(), i("section", {
          key: I.material.id,
          class: "learning-reading-material"
        }, [
          (t(), Z(ha(q === 0 ? "h1" : "h2"), { tabindex: "-1" }, {
            default: _t(() => [H(r(I.material.title), 1)]),
            _: 2
          }, 1024)),
          n("p", Zs, [I.material.provenance.kind === "authored" ? (t(), i(E, { key: 0 }, [H(r(N.authored), 1)], 64)) : (t(), i(E, { key: 1 }, [H(r(I.material.provenance.kind === "adapted" ? N.adapted : N.original) + " ", 1), n("a", {
            href: I.material.provenance.url,
            target: "_blank",
            rel: "noopener noreferrer"
          }, r(I.material.provenance.title), 9, Js)], 64))]),
          (t(!0), i(E, null, _(I.paragraphs, (G) => (t(), Z(Us, {
            key: G.paragraph.id,
            state: e.state,
            unit: e.unit,
            "material-id": I.material.id,
            paragraph: G.paragraph,
            number: G.number,
            disabled: e.disabled,
            onAction: T,
            onAsk: A[1] || (A[1] = (O, V) => a("ask", O, V))
          }, null, 8, [
            "state",
            "unit",
            "material-id",
            "paragraph",
            "number",
            "disabled"
          ]))), 128))
        ]))), 128)),
        (t(!0), i(E, null, _(y.value, (I) => (t(), i("section", {
          key: I.id,
          class: "learning-essay"
        }, [
          n("h2", null, r(N.essay), 1),
          n("p", Qs, r(I.prompt), 1),
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
        y.value.length ? g("", !0) : (t(), i("section", Xs, [n("h2", null, r(N.essay), 1), n("p", er, r(e.state.preparation?.running ? l(le).essay : l(le).missingEssay), 1)])),
        (t(!0), i(E, null, _(f.value, (I) => (t(), i("section", {
          key: I.id,
          class: "learning-essay",
          "data-exercise-id": I.id
        }, [
          n("h2", null, r(I.prompt), 1),
          l(d).activityDrafts[I.id] ? (t(), Z(gt, {
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
          (t(!0), i(E, null, _(w.value.filter((q) => q.exercise.id === I.id), (q) => (t(), Z(bt, {
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
        ], 8, tr))), 128)),
        n("ol", {
          class: "learning-steps",
          "aria-label": N.progress
        }, [(t(), i(E, null, _($, ([I, q], G) => n("li", {
          key: I,
          class: se({
            "is-done": G < m.value,
            "is-current": G === m.value
          }),
          "aria-current": G === m.value ? "step" : void 0
        }, r(q), 11, nr)), 64))], 8, ar),
        v.value === "writing" ? (t(), i("div", ir, [n("span", null, r(N.written) + " " + r(e.unit.stage.exercises.length - x.value.length) + " / " + r(e.unit.stage.exercises.length), 1), x.value.length ? (t(), i("button", {
          key: 0,
          type: "button",
          onClick: A[2] || (A[2] = (I) => z(x.value[0]))
        }, r(N.next), 1)) : (t(), i("span", lr, r(e.unit.preparation.essay ? l(le).missingNotes : l(le).missingEssay), 1))])) : g("", !0),
        o.value ? (t(), i("div", sr, [e.state.pending?.purpose === "grade" ? (t(), i(E, { key: 0 }, [
          A[10] || (A[10] = n("span", {
            class: "learning-working-dot",
            "aria-hidden": "true"
          }, null, -1)),
          n("span", null, r(l(X).grading), 1),
          n("button", {
            type: "button",
            disabled: e.pending,
            onClick: A[3] || (A[3] = (I) => a("action", "cancel"))
          }, r(l(X).stop), 9, rr)
        ], 64)) : (t(), i("button", {
          key: 1,
          type: "button",
          class: "learning-primary",
          disabled: e.disabled || !l(fe)("grade", e.state),
          onClick: A[4] || (A[4] = (I) => a("action", "grade", { unitId: e.unit.id }))
        }, r(l(X).grade), 9, or))])) : e.unit.assessments.length ? (t(), i("button", {
          key: 3,
          type: "button",
          class: "learning-primary",
          onClick: A[5] || (A[5] = (I) => k("feedback"))
        }, r(l(X).feedback), 1)) : g("", !0)
      ], 64)) : (t(), Z(ds, {
        key: 2,
        view: b.value,
        state: e.state,
        unit: e.unit,
        disabled: e.disabled || !l(fe)("grade", e.state),
        pending: e.pending,
        onAsk: A[6] || (A[6] = (I) => a("assistant", I)),
        onAction: T,
        onConfirm: A[7] || (A[7] = (I, q, G) => a("confirm", I, q, G)),
        onRecord: A[8] || (A[8] = (I) => a("record", I))
      }, null, 8, [
        "view",
        "state",
        "unit",
        "disabled",
        "pending"
      ])),
      b.value === "feedback" && v.value === "complete" ? (t(), i("button", {
        key: 3,
        type: "button",
        class: "learning-primary",
        onClick: A[9] || (A[9] = (I) => k("model"))
      }, r(l(X).viewModel), 1)) : g("", !0)
    ], 512));
  }
}), dr = ur, vr = ["data-learning-unit-id", "data-exercise-id"], cr = { class: "learning-review-head" }, gr = { class: "learning-muted" }, pr = ["disabled"], br = {
  class: "learning-review-dots",
  "aria-label": "复习卡片"
}, mr = [
  "aria-label",
  "aria-current",
  "onClick"
], fr = { class: "learning-eyebrow" }, kr = { class: "learning-card-verdict" }, yr = { key: 0 }, hr = { key: 1 }, $r = { key: 2 }, wr = { key: 1 }, xr = ["disabled"], Cr = ["disabled"], Ir = {
  key: 1,
  class: "learning-working",
  role: "status"
}, Lr = ["disabled"], Sr = ["disabled"], Ar = ["disabled"], Rr = {
  key: 2,
  class: "learning-row"
}, Mr = { class: "learning-review-results" }, Er = ["aria-current", "onClick"], Tr = ["aria-expanded", "onClick"], Nr = {
  key: 1,
  class: "learning-chip-reason"
}, Or = /* @__PURE__ */ ee({
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
    const s = e, a = c, u = ye.verdicts, d = S(() => s.review.stage.stage), v = (P) => s.review.attempts.filter((L) => L.exerciseId === P).at(-1), b = () => Math.max(0, s.review.exercises.findIndex((P) => !v(P.id))), C = Te(() => s.review.id), k = S(() => C.value.review), $ = S({
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
    }), N = S(() => !!m.value && !!o.value[m.value.id]?.retry), j = S(() => s.review.exercises.filter((P) => v(P.id)).length), T = S({
      get: () => k.value.openReason,
      set: (P) => {
        k.value.openReason = P;
      }
    });
    function J(P) {
      o.value[m.value.id].submitted = { before: y.value?.id }, a("action", "submit", {
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
      $.value = P, O.value = !0;
    }
    const I = S(() => s.state.completions.find((P) => P.unitId === s.review.id)), q = S(() => I.value?.rewardStatus === "paid" || I.value?.rewardStatus === "retired");
    K(k, (P) => {
      P.seenBefore ??= d.value === "complete" && Ot.has(s.review.id);
    }, { immediate: !0 });
    const G = S(() => k.value.seenBefore ?? !1), O = S({
      get: () => k.value.expanded,
      set: (P) => {
        k.value.expanded = P;
      }
    });
    K([d, () => s.review.id], ([P, L]) => {
      P === "complete" && Ot.mark(L);
    }, { immediate: !0 });
    const V = S(() => G.value && q.value && !O.value), U = (P) => [...s.state.books.grammar, ...s.state.books.vocabulary].find((L) => L.id === P);
    return (P, L) => (t(), i("section", {
      class: "learning-review",
      "data-learning-unit-id": e.review.id,
      "data-exercise-id": m.value?.id,
      "aria-labelledby": "learning-review-title"
    }, [
      n("header", cr, [
        L[8] || (L[8] = n("h2", { id: "learning-review-title" }, "今日复习", -1)),
        n("span", gr, r(j.value) + " / " + r(e.review.exercises.length), 1),
        d.value === "answering" ? (t(), i("button", {
          key: 0,
          type: "button",
          disabled: e.disabled || !l(fe)("abandon-review", e.state),
          onClick: L[0] || (L[0] = (B) => a("confirm", "abandon-review", {}, l($e).review))
        }, "放下", 8, pr)) : g("", !0)
      ]),
      n("nav", br, [(t(!0), i(E, null, _(e.review.exercises, (B, D) => (t(), i("button", {
        key: B.id,
        type: "button",
        "aria-label": `第 ${D + 1} 张`,
        "aria-current": D === $.value,
        class: se({ "is-answered": !!v(B.id) }),
        onClick: (ue) => A(D)
      }, null, 10, mr))), 128))]),
      m.value && !V.value ? (t(), i("div", {
        key: `${m.value.id}:${y.value && !N.value ? "back" : "front"}`,
        class: se(["learning-card", { "is-back": !!y.value && !N.value }])
      }, [
        n("p", fr, r(y.value ? l(ye).answer : `第 ${$.value + 1} 张`), 1),
        n("h3", null, r(m.value.prompt), 1),
        !y.value || N.value ? (t(), Z(gt, {
          key: 0,
          modelValue: x.value,
          "onUpdate:modelValue": L[1] || (L[1] = (B) => x.value = B),
          response: m.value.response,
          paragraphs: w.value,
          disabled: e.disabled || !l(fe)("submit", e.state),
          onSubmit: J
        }, null, 8, [
          "modelValue",
          "response",
          "paragraphs",
          "disabled"
        ])) : (t(), i(E, { key: 1 }, [
          n("blockquote", null, r(l(pt)(y.value.answer, m.value.response, w.value)), 1),
          f.value ? (t(), i(E, { key: 0 }, [
            n("p", kr, r(l(u)[f.value.verdict]), 1),
            f.value.understanding ? (t(), i("p", yr, r(f.value.understanding), 1)) : g("", !0),
            f.value.expression ? (t(), i("p", hr, r(f.value.expression), 1)) : g("", !0),
            f.value.guidance ? (t(), i("p", $r, r(f.value.guidance), 1)) : g("", !0)
          ], 64)) : (t(), i("small", wr, r(l(ye).saved), 1)),
          j.value < e.review.exercises.length ? (t(), i("button", {
            key: 2,
            type: "button",
            class: "learning-primary",
            onClick: M
          }, "下一张")) : g("", !0)
        ], 64)),
        y.value ? (t(), i("button", {
          key: 2,
          type: "button",
          disabled: e.disabled || !l(fe)("submit", e.state),
          onClick: z
        }, r(N.value ? l(ye).cancelRetry : l(ye).retry), 9, xr)) : g("", !0),
        n("button", {
          type: "button",
          class: "learning-review-ask",
          "data-action": "ask",
          disabled: e.pending || !l(fe)("talk", e.state),
          onClick: L[2] || (L[2] = (B) => a("ask", m.value.id, e.review.id))
        }, r(l(ye).ask), 9, Cr)
      ], 2)) : g("", !0),
      d.value === "grading" ? (t(), i("div", Ir, [e.state.pending?.purpose === "review-assess" ? (t(), i(E, { key: 0 }, [
        L[9] || (L[9] = n("span", {
          class: "learning-working-dot",
          "aria-hidden": "true"
        }, null, -1)),
        L[10] || (L[10] = n("span", null, "正在批改这组复习…", -1)),
        n("button", {
          type: "button",
          disabled: e.pending,
          onClick: L[3] || (L[3] = (B) => a("action", "cancel"))
        }, "停止", 8, Lr)
      ], 64)) : (t(), i(E, { key: 1 }, [
        n("span", null, r(l(ye).ready), 1),
        n("button", {
          type: "button",
          disabled: e.disabled || !l(fe)("abandon-review", e.state),
          onClick: L[4] || (L[4] = (B) => a("confirm", "abandon-review", {}, l($e).review))
        }, "放下", 8, Sr),
        n("button", {
          type: "button",
          disabled: e.disabled || !l(fe)("grade", e.state),
          onClick: L[5] || (L[5] = (B) => a("action", "grade", { unitId: e.review.id }))
        }, r(l(ye).grade), 9, Ar)
      ], 64))])) : g("", !0),
      d.value === "complete" && V.value ? (t(), i("div", Rr, [L[11] || (L[11] = n("span", { class: "learning-muted" }, "这组复习已完成", -1)), n("button", {
        type: "button",
        "aria-expanded": !1,
        onClick: L[6] || (L[6] = (B) => O.value = !0)
      }, "查看结果")])) : d.value === "complete" ? (t(), i(E, { key: 3 }, [n("ul", Mr, [(t(!0), i(E, null, _(e.review.exercises, (B, D) => (t(), i("li", { key: B.id }, [
        n("button", {
          type: "button",
          class: "learning-review-result",
          "aria-current": D === $.value,
          onClick: (ue) => A(D)
        }, [n("strong", null, r(U(B.itemId)?.label ?? B.prompt), 1), n("small", null, r(l(u)[e.review.assessments.find((ue) => ue.attemptId === v(B.id)?.id)?.verdict ?? "disputed"]), 1)], 8, Er),
        U(B.itemId)?.nextReviewAt ? (t(), i("button", {
          key: 0,
          type: "button",
          class: "learning-chip",
          "aria-expanded": T.value === B.id,
          onClick: (ue) => T.value = T.value === B.id ? "" : B.id
        }, r(l(mt)(U(B.itemId).nextReviewAt)), 9, Tr)) : g("", !0),
        T.value === B.id ? (t(), i("small", Nr, r(U(B.itemId)?.scheduleReason), 1)) : g("", !0)
      ]))), 128))]), W(na, {
        state: e.state,
        "unit-id": e.review.id,
        amount: e.review.reward.amount,
        label: "复习完成",
        disabled: e.disabled,
        quiet: G.value,
        onAction: L[7] || (L[7] = (B, D) => a("action", B, D))
      }, null, 8, [
        "state",
        "unit-id",
        "amount",
        "disabled",
        "quiet"
      ])], 64)) : g("", !0)
    ], 8, vr));
  }
}), Br = Or, qr = {
  key: 0,
  class: "learning-source-choice",
  "aria-live": "polite"
}, Pr = { class: "learning-row" }, Vr = ["disabled"], Dr = ["disabled"], Ur = ["disabled"], _r = ["disabled"], jr = ["disabled"], Wr = {
  key: 1,
  class: "learning-preparation",
  "aria-live": "polite"
}, Gr = {
  key: 0,
  class: "learning-turn-notice"
}, Fr = { class: "learning-row" }, Hr = ["disabled"], zr = /* @__PURE__ */ ee({
  __name: "LearningPreparation",
  props: {
    state: {},
    disabled: { type: Boolean },
    pending: { type: Boolean }
  },
  emits: ["action"],
  setup(e, { emit: c }) {
    const s = c;
    return (a, u) => e.state.sourceChoice ? (t(), i("section", qr, [
      n("p", null, r(e.state.sourceChoice === "unconfigured" ? l(le).noWeb : e.state.preparation?.message || l(le).unavailable), 1),
      n("div", Pr, [
        e.state.sourceChoice === "unavailable" ? (t(), i("button", {
          key: 0,
          type: "button",
          class: "learning-primary",
          disabled: e.disabled,
          onClick: u[0] || (u[0] = (d) => s("action", "retry-source"))
        }, r(l(le).retry), 9, Vr)) : (t(), i("button", {
          key: 1,
          type: "button",
          class: "learning-primary",
          disabled: e.pending,
          onClick: u[1] || (u[1] = (d) => s("action", "research-settings"))
        }, r(l(le).settings), 9, Dr)),
        e.state.preparation?.source !== "authored" ? (t(), i("button", {
          key: 2,
          type: "button",
          disabled: e.disabled,
          onClick: u[2] || (u[2] = (d) => s("action", "choose-original"))
        }, r(l(le).original), 9, Ur)) : g("", !0),
        n("button", {
          type: "button",
          disabled: e.pending,
          onClick: u[3] || (u[3] = (d) => s("action", "dismiss-source"))
        }, r(e.state.unit ? l(le).existing : l(le).dismiss), 9, _r)
      ]),
      e.state.sourceChoice === "unavailable" && e.state.preparation?.source !== "authored" ? (t(), i("button", {
        key: 0,
        type: "button",
        disabled: e.pending,
        onClick: u[4] || (u[4] = (d) => s("action", "research-settings"))
      }, r(l(le).settings), 9, jr)) : g("", !0)
    ])) : !e.state.preparation?.running && (e.state.preparation || e.state.unit?.kind === "reading-writing" && !e.state.unit.preparation.ready) ? (t(), i("section", Wr, [e.state.preparation?.message ? (t(), i("p", Gr, r(e.state.preparation.message), 1)) : g("", !0), n("div", Fr, [e.state.unit?.kind === "reading-writing" && !e.state.unit.preparation.ready ? (t(), i("button", {
      key: 0,
      type: "button",
      disabled: e.disabled,
      onClick: u[5] || (u[5] = (d) => s("action", "resume-preparation", { unitId: e.state.unit.id }))
    }, r(l(le).resume), 9, Hr)) : g("", !0)])])) : g("", !0);
  }
}), dt = zr, Yr = { class: "learning-workbench" }, Kr = {
  key: 1,
  class: "learning-due"
}, Zr = {
  key: 0,
  class: "learning-working",
  role: "status"
}, Jr = ["disabled"], Qr = ["disabled"], Xr = {
  key: 2,
  class: "learning-row"
}, eo = ["disabled"], to = ["data-learning-unit-id"], ao = { class: "learning-eyebrow" }, no = { tabindex: "-1" }, io = {
  key: 0,
  class: "learning-muted"
}, lo = ["onClick"], so = ["onClick"], ro = { class: "learning-row" }, oo = ["disabled"], uo = {
  key: 6,
  class: "learning-start"
}, vo = ["disabled"], co = {
  key: 0,
  tabindex: "-1"
}, go = { key: 1 }, po = ["aria-label"], bo = { class: "learning-start-reading" }, mo = ["disabled"], fo = ["disabled"], ko = /* @__PURE__ */ ee({
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
    const s = e, a = (w) => s.disabled || !fe(w, s.state), u = c, d = S(() => !!s.state.review && s.state.review.stage.stage !== "complete"), v = S(() => s.state.unit), b = S(() => !v.value || s.state.completions.some((w) => w.unitId === v.value?.id)), C = S(() => s.state.busy && !s.state.pending), k = {
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
    return (w, o) => (t(), i("div", Yr, [
      !e.preparationInProcess && (!e.state.sourceChoice || !b.value) ? (t(), Z(dt, {
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
      e.state.dueCount && !d.value ? (t(), i("div", Kr, [n("span", null, r(l(zt)(e.state.dueCount)), 1), e.state.pending?.purpose === "review-prepare" ? (t(), i("span", Zr, [
        o[13] || (o[13] = n("span", {
          class: "learning-working-dot",
          "aria-hidden": "true"
        }, null, -1)),
        o[14] || (o[14] = n("span", null, "正在出题…", -1)),
        n("button", {
          type: "button",
          disabled: e.pending,
          onClick: o[0] || (o[0] = (x) => u("action", "cancel"))
        }, "停止", 8, Jr)
      ])) : e.state.blockedReview ? g("", !0) : (t(), i("button", {
        key: 1,
        type: "button",
        class: "learning-primary",
        disabled: a("start-review"),
        onClick: o[1] || (o[1] = (x) => u("action", "start-review"))
      }, r(k.review), 9, Qr))])) : g("", !0),
      e.state.blockedReview ? (t(), i("div", Xr, [o[15] || (o[15] = n("p", { class: "learning-muted" }, "有一组复习在另一个故事中进行。回到那个故事可以接着做；也可以放下它，在这里重新出题。", -1)), n("button", {
        type: "button",
        disabled: a("abandon-review"),
        onClick: o[2] || (o[2] = (x) => f("abandon-review", {}, l($e).review))
      }, "放下", 8, eo)])) : g("", !0),
      e.state.review ? (t(), Z(Br, {
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
      v.value?.kind === "reading-writing" ? (t(), Z(dr, {
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
      ])) : v.value ? (t(), i("section", {
        key: 5,
        class: "learning-lesson",
        "data-learning-unit-id": v.value.id
      }, [
        n("p", ao, "专项小课 · 完成可得 " + r(v.value.reward.amount) + " 小白币", 1),
        n("h1", no, r(v.value.title), 1),
        v.value.goal ? (t(), i("p", io, r(v.value.goal), 1)) : g("", !0),
        (t(!0), i(E, null, _(v.value.materials, (x) => (t(), i("button", {
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
        ], 8, lo))), 128)),
        (t(!0), i(E, null, _(v.value.exercises, (x) => (t(), i("button", {
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
        ], 8, so))), 128)),
        n("div", ro, [n("button", {
          type: "button",
          disabled: a("complete"),
          onClick: o[7] || (o[7] = (x) => u("action", "complete"))
        }, r(k.complete), 9, oo), n("button", {
          type: "button",
          onClick: o[8] || (o[8] = (x) => u("go", "materials"))
        }, r(k.notes), 1)])
      ], 8, to)) : g("", !0),
      b.value ? (t(), i("section", uo, [e.state.blockedUnit ? (t(), i(E, { key: 0 }, [
        o[16] || (o[16] = n("h1", { tabindex: "-1" }, "当前课件在另一个故事中", -1)),
        o[17] || (o[17] = n("p", { class: "learning-muted" }, "回到那个故事可以继续；也可以放下它，在这里重新开始。", -1)),
        n("button", {
          type: "button",
          disabled: a("abandon"),
          onClick: o[9] || (o[9] = (x) => f("abandon", {}, l($e).lesson))
        }, "放下并重新开始", 8, vo)
      ], 64)) : (t(), i(E, { key: 1 }, [
        v.value ? (t(), i("h2", go, r(k.next), 1)) : (t(), i("h1", co, r(k.reading), 1)),
        v.value ? g("", !0) : (t(), i("button", {
          key: 2,
          type: "button",
          class: "learning-start-preference",
          "aria-label": `${k.settings}：${$.value}`,
          onClick: o[10] || (o[10] = (x) => u("go", "settings"))
        }, [n("span", null, [n("strong", null, r(k.settings), 1), n("small", null, r($.value), 1)]), W(Y, { name: "arrow" })], 8, po)),
        e.state.sourceChoice && !e.preparationInProcess ? (t(), Z(dt, {
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
        !C.value && !e.state.sourceChoice ? (t(), i(E, { key: 4 }, [n("section", bo, [
          W(Y, { name: "workbook" }),
          n("p", null, r(k.readingHint), 1),
          n("button", {
            type: "button",
            class: "learning-primary",
            disabled: a("prepare"),
            onClick: o[11] || (o[11] = (x) => m("reading-writing"))
          }, [H(r(k.start), 1), W(Y, { name: "arrow" })], 8, mo)
        ]), n("button", {
          type: "button",
          class: "learning-start-secondary",
          disabled: a("prepare"),
          onClick: o[12] || (o[12] = (x) => m("lesson"))
        }, [
          W(Y, { name: "records" }),
          n("span", null, [n("strong", null, r(k.lesson), 1), n("small", null, r(k.lessonHint), 1)]),
          W(Y, { name: "arrow" })
        ], 8, fo)], 64)) : g("", !0)
      ], 64))])) : g("", !0)
    ]));
  }
}), yo = ko;
function Pt(e) {
  try {
    return JSON.parse(e);
  } catch {
    return {};
  }
}
function ho(e) {
  const c = [];
  for (const s of e.messages) s.role === "assistant" ? c.push({
    message: s,
    results: []
  }) : s.role === "tool" && c.at(-1)?.results.push(s);
  return c.map(({ message: s, results: a }, u) => ({
    index: u + 1,
    text: s.toolCalls?.length ? s.content : "",
    receivedChars: s.receivedChars,
    thinking: s.hasReasoning,
    streaming: !!s.streaming,
    tools: (s.toolCalls ?? []).map((d) => {
      const v = a.find(($) => $.toolCallId === d.id), b = Pt(v?.content ?? ""), C = e.status === "running", k = v?.error || b.ok === !1 ? "failed" : v?.content && !v.streaming ? "done" : !C || s.error ? v ? "cancelled" : "not-run" : v?.streaming ? "running" : "preparing";
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
var $o = {
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
function wo(e, c) {
  if (e === "learning_extract_http_failed" || e === "learning_search_failed") {
    if (c === 401) return "联网取材的验证没有通过，请检查联网密钥是否有效。";
    if (c === 403) return "联网服务拒绝了这次请求，请检查账号或接口权限；不一定是密钥填错。";
    if (c === 404 || c === 405) return e === "learning_extract_http_failed" ? "当前联网地址不支持读取正文，请检查联网取材地址，或改读原创文章。" : "当前联网地址不支持搜索，请检查联网取材地址，或改读原创文章。";
    if (c === 429) return "联网服务暂时限制了请求，请稍后重试，并检查剩余额度。";
    if (c && c >= 500) return "联网服务暂时不可用，请稍后重试，或先读原创文章。";
  }
  return $o[e];
}
var xo = ["aria-label"], Co = { class: "learning-process-header" }, Io = ["aria-expanded"], Lo = { "aria-hidden": "true" }, So = ["disabled", "aria-label"], Ao = ["aria-label"], Ro = ["data-status"], Mo = {
  class: "learning-process-dot",
  "aria-hidden": "true"
}, Eo = { key: 0 }, To = { class: "learning-process-result" }, No = {
  key: 1,
  class: "learning-process-status",
  role: "status",
  "aria-live": "polite"
}, Oo = {
  key: 0,
  class: "learning-working-dot",
  "aria-hidden": "true"
}, Bo = {
  key: 2,
  class: "learning-process-recovery"
}, qo = /* @__PURE__ */ ee({
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
    const s = e, a = c, u = S(() => ho(s.turn)), d = S(() => u.value.flatMap((o) => o.tools)), v = S(() => s.turn.status === "running"), b = S(() => le.taskTitles[s.turn.purpose]), C = F(null), k = pa(), $ = S(() => C.value ?? (v.value || s.turn.status === "failed" || !!k.default)), m = F(null), y = S(() => s.turn.progress?.round ?? u.value.at(-1)?.index), f = S(() => {
      if (!v.value) return te.outcomes[s.turn.status];
      const o = u.value.at(-1), x = o?.tools.find((N) => N.status === "running" || N.status === "preparing");
      if (x) return `${te.tools[x.name] ?? te.unknownTool} · ${te[x.status]}`;
      if (s.turn.progress?.stage === "provider" && o?.streaming) {
        if (o.receivedChars) return te.received(o.receivedChars);
        if (o.thinking) return te.thinking;
      }
      return Ml(s.turn.progress ?? { stage: "provider" });
    });
    function w(o) {
      const x = [];
      o.result.error && x.push(wo(o.result.error, o.result.httpStatus));
      const N = o.result.section ?? o.input.section;
      return N && te.sections[N] && x.push(te.sections[N]), o.result.resultsCount !== void 0 && (!o.result.error || o.result.resultsCount > 0) && x.push(o.name === "LearningExtract" ? te.extracted(o.result.resultsCount) : te.results(o.result.resultsCount)), o.result.paragraphCount !== void 0 && x.push(te.paragraphs(o.result.paragraphCount)), o.result.dataCount !== void 0 && x.push(te.entries(o.result.dataCount)), o.result.failedCount && (!o.result.error || o.result.failedCount > 1) && x.push(te.sourcesFailed(o.result.failedCount)), o.name === "LearningLessonEdit" && (o.input.materialsCount && x.push(te.proposedMaterials(o.input.materialsCount)), o.input.exercisesCount && x.push(te.proposedExercises(o.input.exercisesCount))), x.join(" · ");
    }
    return K(v, () => {
      C.value = null;
    }), K(() => s.turn.messages, async () => {
      const o = m.value, x = !o || o.scrollHeight - o.scrollTop - o.clientHeight < 48;
      await re(), x && m.value && (m.value.scrollTop = m.value.scrollHeight);
    }), (o, x) => v.value || d.value.length || o.$slots.default ? (t(), i("section", {
      key: 0,
      class: se(["learning-process", { "is-running": v.value }]),
      "aria-label": l(te).title
    }, [
      n("header", Co, [n("button", {
        type: "button",
        class: "learning-process-toggle",
        "aria-expanded": $.value,
        onClick: x[0] || (x[0] = (N) => C.value = !$.value)
      }, [
        n("span", Lo, r($.value ? "⌄" : "›"), 1),
        n("strong", null, r(b.value ?? l(te).title), 1),
        n("small", null, r(v.value && y.value ? l(te).round(y.value) : l(te).history(d.value.length)), 1)
      ], 8, Io), v.value && e.stoppable ? (t(), i("button", {
        key: 0,
        type: "button",
        class: "learning-process-stop",
        disabled: e.disabled,
        "aria-label": l(te).stop,
        onClick: x[1] || (x[1] = (N) => a("stop"))
      }, "■", 8, So)) : g("", !0)]),
      $.value ? (t(), i("div", {
        key: 0,
        ref_key: "body",
        ref: m,
        class: "learning-process-body"
      }, [(t(!0), i(E, null, _(u.value, (N) => (t(), i(E, { key: N.index }, [N.text ? (t(), Z(ct, {
        key: 0,
        class: "learning-markdown learning-process-narration",
        text: N.text
      }, null, 8, ["text"])) : g("", !0), N.tools.length ? (t(), i("ol", {
        key: 1,
        class: "learning-process-steps",
        "aria-label": l(te).round(N.index)
      }, [(t(!0), i(E, null, _(N.tools, (j) => (t(), i("li", {
        key: j.id,
        "data-status": j.status
      }, [
        n("span", Mo, r(j.status === "done" ? "✓" : j.status === "failed" ? "!" : "·"), 1),
        n("div", null, [
          n("span", null, r(l(te).tools[j.name] ?? l(te).unknownTool), 1),
          w(j) ? (t(), i("small", Eo, r(w(j)), 1)) : g("", !0),
          (t(!0), i(E, null, _(j.result.errors, (T, J) => (t(), i("small", {
            key: J,
            class: "learning-process-error"
          }, r(T.message), 1))), 128))
        ]),
        n("small", To, r(l(te)[j.status]), 1)
      ], 8, Ro))), 128))], 8, Ao)) : g("", !0)], 64))), 128))], 512)) : g("", !0),
      v.value || !o.$slots.default && e.turn.status === "finished" && (!b.value || $.value) ? (t(), i("p", No, [v.value ? (t(), i("span", Oo)) : g("", !0), H(r(f.value), 1)])) : g("", !0),
      o.$slots.default ? (t(), i("div", Bo, [da(o.$slots, "default")])) : g("", !0)
    ], 10, xo)) : g("", !0);
  }
}), sa = qo;
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
}, Po = { class: "learning-messages" }, Vo = /* @__PURE__ */ ee({
  __name: "LearningMessages",
  props: {
    turn: {},
    disabled: { type: Boolean }
  },
  emits: ["stop"],
  setup(e, { emit: c }) {
    const s = e, a = c, u = S(() => s.turn.messages.filter((d) => d.role === "assistant" && !d.toolCalls?.length && d.content));
    return (d, v) => (t(), i("div", Po, [W(sa, {
      turn: e.turn,
      stoppable: "",
      disabled: e.disabled,
      onStop: v[0] || (v[0] = (b) => a("stop"))
    }, null, 8, ["turn", "disabled"]), (t(!0), i(E, null, _(u.value, (b, C) => (t(), i("div", {
      key: C,
      class: se(["learning-output", { "is-streaming": b.streaming }])
    }, [W(ct, {
      class: "learning-markdown",
      text: b.content
    }, null, 8, ["text"])], 2))), 128))]));
  }
}), Do = Vo, Uo = { class: "learning-conversation" }, _o = { class: "learning-conversation-heading" }, jo = {
  class: "learning-person-initial",
  "aria-hidden": "true"
}, Wo = ["disabled"], Go = ["aria-label"], Fo = ["aria-label"], Ho = {
  key: 0,
  class: "learning-history-notice"
}, zo = {
  key: 0,
  class: "learning-conversation-user"
}, Yo = {
  key: 1,
  class: "learning-turn-recovery"
}, Ko = ["disabled", "onClick"], Zo = ["disabled", "onClick"], Jo = {
  key: 3,
  class: "learning-conversation-tools"
}, Qo = ["disabled"], Xo = ["disabled"], eu = {
  key: 1,
  class: "learning-working",
  role: "status"
}, tu = {
  key: 2,
  class: "learning-turn-notice is-error",
  role: "status"
}, au = {
  key: 3,
  class: "learning-conversation-empty"
}, nu = ["disabled"], iu = { class: "learning-composer-surface" }, lu = {
  key: 0,
  class: "learning-composer-quote"
}, su = { class: "learning-composer-row" }, ru = [
  "disabled",
  "maxlength",
  "aria-label",
  "placeholder"
], ou = [
  "type",
  "disabled",
  "aria-label",
  "title"
], uu = /* @__PURE__ */ ee({
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
    const a = e, u = S(() => a.target === "workbench" ? a.state.workbenchConversation : a.state.conversation), d = S(() => a.target === "workbench" ? a.state.workbenchBusy : a.state.chatBusy), v = S(() => a.target === "workbench" ? a.state.workbenchMessage : a.state.chatMessage), b = S(() => a.target === "workbench" ? a.state.workbenchStorage : a.state.chatStorage), C = S(() => a.target === "workbench" ? a.state.reply : a.state.companionReply), k = S(() => a.target === "workbench" ? Q.assistant : a.state.teacher?.name ?? "语伴"), $ = S(() => u.value.turns.map((L, B) => ({
      turn: L,
      index: B
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
    ]), f = s, w = Ee(), o = a.target === "workbench" ? w.workbenchChat : w.chat, x = (L, B = {}) => f("action", L, {
      ...B,
      target: a.target
    }), N = ke(o, "text"), j = F(null), T = F(null), J = F(null), z = ke(o, "focus");
    let M = null, A = 0;
    function I() {
      const L = J.value;
      L && (o.scroll = L.scrollTop, o.following = L.scrollHeight - L.scrollTop - L.clientHeight < 70);
    }
    async function q() {
      await re(), o.following && J.value && (J.value.scrollTop = J.value.scrollHeight);
    }
    function G() {
      const L = j.value;
      L?.clientWidth && (L.style.height = "auto", L.style.height = `${L.scrollHeight}px`, q());
    }
    K(N, G, { flush: "post" }), K(j, (L) => {
      if (M?.disconnect(), cancelAnimationFrame(A), !L) return;
      let B = 0;
      M = new ResizeObserver(([D]) => {
        D.contentRect.width !== B && (B = D.contentRect.width, cancelAnimationFrame(A), A = requestAnimationFrame(G));
      }), M.observe(L.parentElement);
    }, { flush: "post" }), Re(() => {
      J.value && (J.value.scrollTop = o.scroll), q();
    }), Me(() => {
      J.value && (o.scroll = J.value.scrollTop), M?.disconnect(), cancelAnimationFrame(A);
    });
    function O() {
      if (a.disabled || !N.value.trim()) return;
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
      L.key !== "Enter" || L.shiftKey || L.isComposing || L.keyCode === 229 || (L.preventDefault(), O());
    }
    K([() => u.value.turns, () => d.value], q);
    function U(L) {
      const B = [a.state.unit, a.state.review].find((D) => D?.id === L.unitId);
      return !!B && (L.kind === "exercise" ? B.exercises : B.materials).some((D) => D.id === L.id);
    }
    const P = S(() => a.state.unit?.id === C.value?.unitId ? a.state.unit : null);
    return c({
      async ask(L, B, D = a.state.unit?.id) {
        z.value = {
          unitId: D,
          exerciseId: L,
          selection: B,
          help: !!L && !B
        }, o.study = D ? {
          unitId: D,
          exerciseId: L
        } : null, await re(), j.value?.focus();
      },
      focusHeading: () => T.value?.focus({ preventScroll: !0 })
    }), (L, B) => (t(), i("section", Uo, [
      n("header", _o, [
        n("span", jo, r(e.target === "workbench" ? "a" : [...k.value][0]), 1),
        n("h1", {
          ref_key: "heading",
          ref: T,
          tabindex: "-1"
        }, r(k.value), 513),
        e.target === "companion" ? (t(), i("button", {
          key: 0,
          type: "button",
          disabled: e.disabled,
          "aria-label": "更换学习语言和语伴",
          onClick: B[0] || (B[0] = (D) => f("profile"))
        }, r(new Intl.DisplayNames(["zh-CN"], { type: "language" }).of(e.state.language)), 9, Wo)) : (t(), i("button", {
          key: 1,
          type: "button",
          "aria-label": l(Q).closeAssistant,
          onClick: B[1] || (B[1] = (D) => f("close"))
        }, [W(Y, { name: "close" })], 8, Go))
      ]),
      n("div", {
        ref_key: "scroller",
        ref: J,
        class: "learning-conversation-turns",
        "aria-label": e.target === "workbench" ? l(Q).assistant : m.conversation,
        onScroll: I
      }, [
        u.value.removedTurns ? (t(), i("p", Ho, r(m.history), 1)) : g("", !0),
        (t(!0), i(E, null, _($.value, ({ turn: D, index: ue }, Ne) => (t(), i("div", {
          key: u.value.removedTurns + ue,
          class: "learning-conversation-turn"
        }, [
          D.user && !l(y).has(D.purpose) && !l(he)({ kind: D.purpose ?? "talk" }) ? (t(), i("p", zo, r(D.user), 1)) : g("", !0),
          W(Do, {
            turn: D,
            disabled: e.pending,
            onStop: (pe) => x(l(Ze)({ kind: D.purpose ?? "talk" }) ? "cancel-chat" : l(he)({ kind: D.purpose ?? "talk" }) ? "cancel-preparation" : "cancel")
          }, null, 8, [
            "turn",
            "disabled",
            "onStop"
          ]),
          l(Pe)(D, b.value, e.state.storage) || D.retryable ? (t(), i("div", Yo, [l(Pe)(D, b.value, e.state.storage) ? (t(), i("p", {
            key: 0,
            class: se(["learning-turn-notice", { "is-error": D.status === "failed" }]),
            role: "status"
          }, r(l(Pe)(D, b.value, e.state.storage)), 3)) : g("", !0), D.retryable ? (t(), i("button", {
            key: 1,
            type: "button",
            disabled: e.disabled || e.pending,
            onClick: (pe) => x("retry-chat", { id: D.id })
          }, r(l(Q).retry), 9, Ko)) : g("", !0)])) : g("", !0),
          D.presentation ? (t(), i("button", {
            key: 2,
            type: "button",
            class: "learning-activity-link",
            disabled: !U(D.presentation),
            onClick: (pe) => f("present", D.presentation)
          }, [
            W(Y, { name: D.presentation.kind === "material" ? "book" : "records" }, null, 8, ["name"]),
            n("span", null, r(D.presentation.title), 1),
            W(Y, { name: "arrow" })
          ], 8, Zo)) : g("", !0),
          Ne === $.value.length - 1 && C.value?.text === D.teacher ? (t(), i("div", Jo, [[...D.teacher].length <= 1e3 ? (t(), i("button", {
            key: 0,
            type: "button",
            disabled: e.disabled,
            onClick: B[2] || (B[2] = (pe) => x("say-reply"))
          }, [W(Y, { name: "sound" }), H(r(l(Q).listen), 1)], 8, Qo)) : g("", !0), C.value.exerciseId && P.value && [...D.teacher].length <= 4e3 ? (t(), i("button", {
            key: 1,
            type: "button",
            disabled: e.disabled || P.value.notes.some((pe) => pe.text === D.teacher),
            onClick: B[3] || (B[3] = (pe) => x("save-note", { unitId: P.value.id }))
          }, r(l(Q).saveNote), 9, Xo)) : g("", !0)])) : g("", !0)
        ]))), 128)),
        d.value && !u.value.turns.some((D) => D.status === "running" && l(Ze)({ kind: D.purpose ?? "talk" })) ? (t(), i("div", eu, [B[9] || (B[9] = n("span", {
          class: "learning-working-dot",
          "aria-hidden": "true"
        }, null, -1)), n("span", null, r(v.value), 1)])) : !d.value && v.value && b.value === "ready" ? (t(), i("p", tu, r(v.value), 1)) : g("", !0),
        !$.value.length && !d.value ? (t(), i("div", au, [
          W(Y, { name: "chat" }),
          n("p", null, r(e.target === "workbench" ? l(Q).assistantEmpty : e.state.teacher ? m.empty : m.select), 1),
          e.target === "companion" && !e.state.teacher ? (t(), i("button", {
            key: 0,
            class: "learning-primary",
            type: "button",
            onClick: B[4] || (B[4] = (D) => f("profile"))
          }, r(m.select), 1)) : e.target === "companion" ? (t(), i("button", {
            key: 1,
            type: "button",
            disabled: e.disabled,
            onClick: B[5] || (B[5] = (D) => x("talk", { message: e.state.profile ? l(Vt).returning : l(Vt).initial }))
          }, r(m.opening), 9, nu)) : g("", !0)
        ])) : g("", !0)
      ], 40, Fo),
      e.target === "workbench" || e.state.teacher ? (t(), i("form", {
        key: 0,
        class: "learning-conversation-compose",
        onSubmit: oe(O, ["prevent"])
      }, [n("div", iu, [z.value ? (t(), i("div", lu, [n("span", null, r(z.value.selection?.quote ?? "请教这道题"), 1), n("button", {
        type: "button",
        "aria-label": "取消引用",
        onClick: B[6] || (B[6] = (D) => z.value = null)
      }, "×")])) : g("", !0), n("div", su, [ne(n("textarea", {
        ref_key: "composer",
        ref: j,
        "onUpdate:modelValue": B[7] || (B[7] = (D) => N.value = D),
        rows: "1",
        disabled: b.value !== "ready",
        maxlength: z.value?.selection ? 1800 : z.value?.exerciseId ? 2e3 : 4e3,
        "aria-label": e.target === "workbench" ? l(Q).assistantPlaceholder : "和语伴说",
        placeholder: e.target === "workbench" ? l(Q).assistantPlaceholder : "和语伴说…",
        onKeydown: V
      }, null, 40, ru), [[ve, N.value], [l(Je), l(o)]]), n("button", {
        type: d.value ? "button" : "submit",
        class: se(d.value ? "learning-composer-stop" : "learning-primary"),
        disabled: d.value ? e.pending : e.disabled || !N.value.trim(),
        "aria-label": d.value ? l(Q).stop : l(Q).send,
        title: d.value ? l(Q).stop : l(Q).send,
        onClick: B[8] || (B[8] = oe((D) => d.value ? x("cancel-chat") : O(), ["prevent"]))
      }, [W(Y, { name: d.value ? "stop" : "send" }, null, 8, ["name"])], 10, ou)])])], 32)) : g("", !0)
    ]));
  }
}), Dt = uu;
function du(e) {
  const c = ya(structuredClone($a(e.initialState))), s = F(!1), a = F(null), u = S(() => a.value ? Gt[a.value] : ""), d = S(() => a.value === "unknown" || a.value === "rejected");
  let v = !1, b = 0, C = () => {
  };
  const k = (f) => !s.value && fe(f, c.value), $ = S(() => k("submit")), m = S(() => k("talk"));
  async function y(f, w = {}) {
    if (s.value) return;
    if (ut(_s(f, w.target), c.value)) {
      a.value = "busy";
      return;
    }
    s.value = !0, a.value = null;
    const o = c.value.chatIdentity, x = b;
    let N = !1;
    try {
      const j = JSON.parse(JSON.stringify({
        chatIdentity: o,
        ...w
      }));
      N = !0;
      const T = await e.bridge.request(`learning/${f}`, j, 35e3);
      return !v || c.value.chatIdentity !== o ? void 0 : (b === x && T.result.state.chatIdentity === o && (c.value = T.result.state), T.result.rejected && (a.value = T.result.rejected), T.result);
    } catch (j) {
      v && c.value.chatIdentity === o && (a.value = !N || j instanceof wa && j.code === "host_request_not_sent" ? "notSent" : j instanceof ka ? "rejected" : "unknown");
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
    localIssue: a,
    localMessage: u,
    needsRefresh: d,
    request: y
  };
}
function vu(e = Math.random) {
  return Math.round(3 * 6e4 + Math.min(Math.max(e(), 0), 1) * 9 * 6e4);
}
function cu(e) {
  let c = !1, s, a = 0;
  function u() {
    s !== void 0 && (e.clearTimer(s), s = void 0);
  }
  function d() {
    if (!c) return;
    const v = a;
    s = e.setTimer(() => {
      v === a && (s = void 0, c && (e.opportunity(), d()));
    }, vu(e.random));
  }
  return {
    update(v) {
      c !== v && (c = v, a++, u(), d());
    },
    dispose() {
      c = !1, a++, u();
    }
  };
}
function gu(e) {
  const c = F(!1), s = F(!1), a = F(!1), u = F(!1), d = F("");
  let v, b;
  const C = S(() => e.preference.enabled && e.reading.value && c.value && !e.blocked.value && !!e.state.value.teacher && e.state.value.storage === "ready"), k = S(() => C.value && !s.value && !a.value && !u.value && !e.pending.value && !e.state.value.busy && !e.state.value.chatBusy && !e.state.value.companionBusy);
  function $() {
    const T = e.root.value?.querySelector(".learning-scroll")?.getBoundingClientRect(), J = T?.top ?? 0, z = [...e.root.value?.querySelectorAll("[data-material-id][data-paragraph-id]") ?? []].find((M) => M.getBoundingClientRect().bottom > J + 60 && M.getBoundingClientRect().top < (T?.bottom ?? 0));
    return z ? {
      materialId: z.dataset.materialId,
      paragraphId: z.dataset.paragraphId
    } : null;
  }
  const m = cu({
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
    a,
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
    a.value = !!T && !T.isCollapsed && !!e.root.value?.contains(T.anchorNode);
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
    c.value = document.visibilityState === "visible", c.value || (clearTimeout(v), u.value = !1, j()), y();
  }
  function j() {
    clearTimeout(b), d.value = "";
  }
  return K(() => e.state.value.remark?.text ?? "", (T) => {
    j(), T && e.reading.value && c.value && !s.value && !a.value && !u.value && !e.blocked.value && (d.value = T, b = setTimeout(j, 1e4));
  }), K([
    e.reading,
    e.blocked,
    s,
    a,
    u
  ], ([T, J, z, M, A]) => {
    (!T || J || z || M || A) && j();
  }), Re(() => {
    N(), document.addEventListener("visibilitychange", N), document.addEventListener("selectionchange", w), e.root.value?.addEventListener("pointerdown", o), e.root.value?.addEventListener("focusin", f), e.root.value?.addEventListener("focusout", f), e.root.value?.addEventListener("input", x);
  }), Me(() => {
    m.dispose(), clearTimeout(v), j(), document.removeEventListener("visibilitychange", N), document.removeEventListener("selectionchange", w), e.root.value?.removeEventListener("pointerdown", o), e.root.value?.removeEventListener("focusin", f), e.root.value?.removeEventListener("focusout", f), e.root.value?.removeEventListener("input", x);
  }), {
    bubble: d,
    dismiss: j
  };
}
var pu = { class: "learning-toolbar" }, bu = {
  key: 0,
  class: "learning-unread-dot",
  "aria-hidden": "true"
}, mu = {
  key: 1,
  class: "learning-layout-control"
}, fu = ["min", "max"], ku = ["aria-label", "aria-expanded"], yu = { "aria-label": "学习资料与设置" }, hu = { "aria-label": "学习资料与设置" }, $u = ["onClick"], wu = {
  key: 0,
  class: "learning-notice",
  role: "status",
  "aria-live": "polite"
}, xu = { class: "learning-row" }, Cu = ["disabled"], Iu = ["disabled"], Lu = ["disabled"], Su = ["disabled"], Au = {
  key: 1,
  class: "learning-notice",
  role: "status",
  "aria-live": "polite"
}, Ru = { class: "learning-row" }, Mu = ["disabled"], Eu = ["disabled"], Tu = {
  key: 2,
  class: "learning-notice",
  role: "status"
}, Nu = ["disabled"], Ou = ["disabled"], Bu = ["inert", "aria-hidden"], qu = {
  key: 2,
  class: "learning-working",
  role: "status"
}, Pu = ["disabled"], Vu = {
  key: 5,
  class: "learning-materials-page"
}, Du = {
  key: 0,
  class: "learning-empty-note"
}, Uu = { class: "learning-materials-title" }, _u = ["onClick"], ju = ["onClick"], Wu = {
  key: 0,
  class: "learning-notes"
}, Gu = { key: 0 }, Fu = ["disabled", "onClick"], Hu = {
  key: 7,
  class: "learning-harvest-page"
}, zu = {
  key: 0,
  class: "learning-empty-note"
}, Yu = { key: 0 }, Ku = { class: "learning-muted" }, Zu = ["disabled", "onClick"], Ju = ["disabled"], Qu = ["disabled"], Xu = {
  key: 3,
  class: "learning-row"
}, ed = ["disabled"], td = ["disabled"], ad = {
  key: 8,
  class: "learning-settings-page"
}, nd = ["value", "disabled"], id = ["value"], ld = {
  key: 0,
  class: "learning-settings-goal"
}, sd = {
  key: 0,
  class: "learning-muted"
}, rd = ["value", "disabled"], od = ["disabled"], ud = ["disabled"], dd = ["disabled"], vd = ["disabled"], cd = ["disabled"], gd = ["disabled"], pd = ["disabled"], bd = ["disabled"], md = ["inert", "aria-hidden"], fd = ["aria-label"], kd = { class: "learning-person-initial" }, yd = {
  key: 0,
  class: "learning-unread-dot",
  "aria-hidden": "true"
}, hd = ["aria-label"], $d = {
  key: 0,
  class: "learning-unread-dot",
  "aria-hidden": "true"
}, wd = {
  role: "alertdialog",
  "aria-labelledby": "learning-confirm-title",
  class: "learning-confirm"
}, xd = { id: "learning-confirm-title" }, Cd = { class: "learning-row" }, Id = ["disabled"], Ld = /* @__PURE__ */ ee({
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
    }, { state: a, pending: u, writable: d, canChat: v, canRequest: b, localMessage: C, needsRefresh: k, request: $ } = du(c), m = Sn(a);
    async function y(R, p = {}, h = !1) {
      if (!h && Ln(m, a.value, R, p)) {
        ce(R, p, R === "teacher" ? $e.companion : $e.context);
        return;
      }
      return $(R, p);
    }
    const f = F(a.value.profile ? "home" : "profile"), w = [], o = F(null), x = F(!1);
    Ke(() => o.value?.open ? (o.value.open = !1, !0) : !1, () => x.value);
    const N = F(null), j = F(null), T = F(!1), J = F(null), z = F(null), M = F(null), A = {}, I = F(null), q = F(0), G = S(() => q.value >= 760 && !!a.value.teacher), O = F("work"), V = F(!0), U = F(!1), P = F(62), L = S(() => Math.max(42, Math.ceil(320 / Math.max(q.value, 1) * 100))), B = S(() => Math.min(68, Math.floor((1 - 320 / Math.max(q.value, 1)) * 100))), D = S({
      get: () => G.value ? Math.min(B.value, Math.max(L.value, P.value)) : P.value,
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
    const be = S(() => G.value || O.value === "work"), Ve = S(() => !!a.value.teacher && (G.value || O.value === "chat"));
    K([
      be,
      Ve,
      ue
    ], async ([R, p, h], ae, Fe) => {
      let Be = !0, It;
      if (Fe(() => {
        Be = !1, clearTimeout(It);
      }), R && (V.value = !0), p && (U.value = !0), await re(), !Be) return;
      R && M.value && (M.value.scrollTop = A[f.value] ?? 0);
      const Lt = () => {
        V.value = R, U.value = p;
      };
      G.value || h ? Lt() : It = setTimeout(Lt, 320);
    }, { immediate: !0 });
    function De() {
      be.value && M.value && !T.value && (A[f.value] = M.value.scrollTop), Oe();
    }
    async function Oe(R) {
      const p = R?.target instanceof Element ? R.target : null;
      if (await re(), !be.value || f.value !== "home" || !M.value) return;
      const h = M.value.getBoundingClientRect(), ae = p?.closest("[data-learning-unit-id]") ?? [...M.value.querySelectorAll("[data-learning-unit-id]")].find((Fe) => {
        const Be = Fe.getBoundingClientRect();
        return Be.bottom > h.top + 48 && Be.top < h.bottom;
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
      Oe();
    }, { flush: "post" });
    const Xe = S(() => {
      const { turns: R, removedTurns: p } = a.value.conversation;
      let h = R.length - 1;
      for (; h >= 0 && he({ kind: R[h].purpose ?? "talk" }); ) h--;
      return h < 0 ? 0 : p + h + 1;
    }), et = F(Xe.value);
    K([Xe, Ve], ([R, p]) => {
      (p || R < et.value) && (et.value = R);
    }, { immediate: !0 });
    const ft = S(() => Xe.value > et.value), de = S(() => {
      const R = a.value.workbenchConversation.turns;
      let p = R.length - 1;
      for (; p >= 0 && Ze({ kind: R[p].purpose ?? "talk" }); ) p--;
      let h = R.length - 1;
      for (; h >= 0 && (R[h].status !== "running" || Ze({ kind: R[h].purpose ?? "talk" })); ) h--;
      return h >= 0 && (p = h), p < 0 ? null : {
        turn: a.value.workbenchConversation.turns[p],
        key: `${a.value.chatIdentity}:${a.value.language}:${a.value.workbenchConversation.removedTurns + p}`
      };
    });
    async function kt() {
      a.value.teacher && (await Oe(), De(), O.value = "chat", U.value = !0, await re(), O.value === "chat" && N.value?.focusHeading());
    }
    async function Ue() {
      V.value = !0, O.value = "work", await re(), M.value && (M.value.scrollTop = A[f.value] ?? 0);
      const R = M.value?.querySelector("h1, h2");
      R && (R.tabIndex = -1, R.focus({ preventScroll: !0 }));
    }
    let yt = 0;
    K(() => !!a.value.record, async (R, p) => {
      f.value !== "books" || R === p || (R && (yt = M.value?.scrollTop ?? 0), await re(), f.value === "books" && M.value && (M.value.scrollTop = R ? 0 : yt));
    });
    const ie = F(null), ht = F(null);
    vt(ht, () => {
      ie.value = null;
    });
    const _e = F(a.value.profile?.voice?.voiceId ?? a.value.voices.defaultVoice), je = F(a.value.profile?.voice?.language ?? a.value.language), We = F(a.value.profile?.voice?.speed ?? 1), we = F(0), ra = S(() => a.value.completions.slice(we.value * 20, (we.value + 1) * 20));
    K([() => a.value.language, () => a.value.profile?.voice], ([R, p]) => {
      _e.value = p?.voiceId ?? a.value.voices.defaultVoice, je.value = p?.language ?? R, We.value = p?.speed ?? 1;
    }), K([
      () => a.value.chatIdentity,
      () => a.value.language,
      () => a.value.teacher?.name
    ], () => {
      z.value = null, ie.value = null, we.value = 0;
    }), K(() => !!a.value.teacher, (R) => {
      R || (O.value = "work");
    }), K(() => a.value.currentUnitId, (R) => {
      ie.value?.action === "replace-lesson" && ie.value.input.unitId !== R && (ie.value = null);
    }), K(() => a.value.unit, (R) => {
      const p = z.value;
      p && (R?.id !== p.unitId || !(p.kind === "exercise" ? R.exercises : R.materials).some((h) => h.id === p.id)) && tt();
    });
    for (const R of ["conversation", "workbenchConversation"]) K(() => {
      const p = a.value[R].turns.at(-1)?.presentation;
      return p ? `${a.value[R].turns.length + a.value[R].removedTurns}:${p.unitId}:${p.kind}:${p.id}` : "";
    }, (p) => {
      const h = a.value[R].turns.at(-1)?.presentation;
      p && h && Ie(h, !0);
    });
    const Ce = F(!1);
    K([be, f], ([R, p]) => {
      R && p === "home" && (Ce.value = !1);
    });
    async function Ie(R, p = !1) {
      if (a.value.review?.id === R.unitId) {
        if (p) {
          (!be.value || f.value !== "home") && (Ce.value = !0);
          return;
        }
        const h = m.unit(R.unitId).review;
        R.kind === "exercise" && (h.index = a.value.review.exercises.findIndex((ae) => ae.id === R.id)), h.expanded = !0, await it();
        return;
      }
      if (a.value.unit?.id === R.unitId) {
        if (a.value.unit.kind === "reading-writing") {
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
      T.value || De(), T.value = !0, await Ue(), await re(), R ? await j.value?.ask(R, void 0, p) : j.value?.focusHeading();
    }
    async function nt() {
      T.value = !1, await re(), M.value && (M.value.scrollTop = A[f.value] ?? 0), J.value?.focus({ preventScroll: !0 });
    }
    async function $t(R, p, h) {
      if (!a.value.teacher) {
        await at(R, h), p && await j.value?.ask(R, p, h);
        return;
      }
      tt(), De(), O.value = "chat", U.value = !0, await re(), await N.value?.ask(R, p, h);
    }
    async function me(R, p = !1) {
      if (T.value = !1, R !== f.value && !p) if (R === "home") w.length = 0;
      else {
        const h = w.indexOf(R);
        h >= 0 ? w.splice(h) : w.push(f.value);
      }
      if (M.value && (A[f.value] = M.value.scrollTop), o.value && (o.value.open = !1), f.value = R, await Ue(), await re(), M.value) {
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
      if (R === "prepare" && !a.value.profile) {
        m.setup.step = 2, await me("profile");
        return;
      }
      R === "start-review" && await it();
      const ae = a.value.unit;
      ae?.kind === "reading-writing" && p.unitId === ae.id && [
        "grade",
        "submit-revision",
        "skip-revision"
      ].includes(R) && (m.unit(ae.id).reading.view = R === "skip-revision" && ae.modelEssay ? "model" : "feedback", await me("home"), M.value && (M.value.scrollTop = 0)), await y(R, p, h);
    }
    K(() => m.settings.submitted, (R, p) => {
      !R && p && !m.settings.open && f.value === "profile" && m.setup.step === 2 && a.value.storage === "ready" && !a.value.busy && a.value.profile && Object.entries(p.value).every(([h, ae]) => a.value.profile.settings[h] === ae) && me("home");
    }), K(() => a.value.busy, (R) => {
      const p = a.value.unit;
      !R && p?.stage.stage === "revising" && m.unit(p.id).reading.view === "model" && (m.unit(p.id).reading.view = "feedback");
    });
    const xt = Ke(() => o.value?.open ? (o.value.open = !1, !0) : T.value && be.value ? (nt(), !0) : !G.value && O.value === "chat" ? (Ue(), !0) : f.value === "home" || !w.length && f.value === "profile" && !a.value.teacher ? !1 : (me(w.pop() ?? "home", !0), !0));
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
        offset: a.value.records.offset
      }), a.value.record?.id === R && await me("books");
    }
    const { bubble: Ct, dismiss: lt } = gu({
      root: I,
      state: a,
      pending: u,
      preference: m.companion,
      reading: S(() => be.value && f.value === "home" && a.value.unit?.kind === "reading-writing" && [
        "writing",
        "grading",
        "complete"
      ].includes(a.value.unit.stage.stage)),
      blocked: S(() => T.value || !!z.value || !!ie.value || x.value),
      request: y
    });
    async function ua() {
      const R = await y("export");
      if (!R?.document) return;
      const p = URL.createObjectURL(new Blob([JSON.stringify(R.document, null, 2)], { type: "application/json" })), h = document.createElement("a");
      h.href = p, h.download = "LittleWhiteBox_Learning.json", h.click(), setTimeout(() => URL.revokeObjectURL(p), 1e3);
    }
    return (R, p) => (t(), i("section", {
      ref_key: "root",
      ref: I,
      class: "learning-app",
      style: Ut({
        "--learning-switch-ms": `${l(320)}ms`,
        "--learning-work-share": `${D.value}%`
      }),
      "aria-label": "语伴语言学习"
    }, [
      n("header", pu, [
        f.value !== "home" && (l(a).teacher || w.length) && (G.value || O.value === "work") ? (t(), i("button", {
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
          Ce.value && (G.value || O.value === "work") ? (t(), i("span", bu)) : g("", !0)
        ]),
        G.value && l(a).teacher ? (t(), i("label", mu, [
          W(Y, { name: "workbook" }),
          ne(n("input", {
            "onUpdate:modelValue": p[2] || (p[2] = (h) => D.value = h),
            type: "range",
            min: L.value,
            max: B.value,
            step: "1",
            "aria-label": "阅读区宽度比例"
          }, null, 8, fu), [[
            ve,
            D.value,
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
          "aria-label": l(Q).assistant,
          "aria-expanded": T.value,
          onClick: p[3] || (p[3] = (h) => T.value ? nt() : at())
        }, [W(Y, { name: "chat" }), n("span", null, r(l(Q).assistant), 1)], 8, ku),
        n("details", {
          ref_key: "menu",
          ref: o,
          class: "learning-menu",
          onToggle: p[4] || (p[4] = (h) => x.value = !!o.value?.open),
          onKeydown: p[5] || (p[5] = Se(oe((h) => o.value.open = !1, ["stop", "prevent"]), ["esc"]))
        }, [n("summary", yu, [W(Y, { name: "more" })]), n("nav", hu, [(t(), i(E, null, _([
          ["books", "语法本与生词本"],
          ["materials", "课件与笔记"],
          ["harvest", "我的收获"],
          ["settings", "设置"]
        ], ([h, ae]) => n("button", {
          key: h,
          type: "button",
          onClick: (Fe) => me(h)
        }, r(ae), 9, $u)), 64))])], 544)
      ]),
      l(C) || !l(a).busy && (l(a).message || l(a).storage !== "ready") ? (t(), i("div", wu, [H(r(l(C) || l(a).message || (l(a).storage === "unconfirmed" ? l(rt).unconfirmed : l(a).storage === "conflict" ? l(rt).conflict : l(rt).unloaded)) + " ", 1), n("div", xu, [
        l(a).storage === "unconfirmed" || l(a).storage === "conflict" ? (t(), i("button", {
          key: 0,
          type: "button",
          disabled: l(u),
          onClick: p[6] || (p[6] = (h) => y("verify"))
        }, r(s.verify), 9, Cu)) : g("", !0),
        l(a).storage === "unconfirmed" ? (t(), i("button", {
          key: 1,
          type: "button",
          disabled: l(u),
          onClick: p[7] || (p[7] = (h) => y("retry-save"))
        }, r(s.retry), 9, Iu)) : g("", !0),
        l(a).storage === "conflict" ? (t(), i("button", {
          key: 2,
          type: "button",
          disabled: l(u),
          onClick: p[8] || (p[8] = (h) => ce("adopt-server", {}, s.adoptWarning))
        }, r(s.adopt), 9, Lu)) : g("", !0),
        l(a).storage === "unloaded" || l(k) ? (t(), i("button", {
          key: 3,
          type: "button",
          disabled: l(u),
          onClick: p[9] || (p[9] = (h) => y("read"))
        }, r(l(Gt).refresh), 9, Su)) : g("", !0)
      ])])) : g("", !0),
      [
        "unconfirmed",
        "conflict",
        "failed"
      ].includes(l(a).chatStorage) ? (t(), i("div", Au, [H(r(l(a).chatStorage === "unconfirmed" ? l(Le).unconfirmed : l(a).chatStorage === "conflict" ? l(Le).conflict : l(Le).failed) + " ", 1), n("div", Ru, [n("button", {
        type: "button",
        disabled: !l(b)("verify-teacher"),
        onClick: p[10] || (p[10] = (h) => y("verify-teacher"))
      }, r(l(Le).verify), 9, Mu), l(a).chatStorage !== "failed" ? (t(), i("button", {
        key: 0,
        type: "button",
        disabled: !l(b)("adopt-teacher"),
        onClick: p[11] || (p[11] = (h) => ce("adopt-teacher", {}, l(Le).adoptWarning))
      }, r(l(Le).adopt), 9, Eu)) : g("", !0)])])) : g("", !0),
      [
        "unconfirmed",
        "conflict",
        "failed"
      ].includes(l(a).workbenchStorage) ? (t(), i("div", Tu, [
        H(r(l(Q).assistantStorage) + " ", 1),
        n("button", {
          type: "button",
          disabled: l(u),
          onClick: p[12] || (p[12] = (h) => y("verify-workbench"))
        }, r(l(Q).verify), 9, Nu),
        l(a).workbenchStorage === "conflict" ? (t(), i("button", {
          key: 0,
          type: "button",
          disabled: l(u),
          onClick: p[13] || (p[13] = (h) => ce("adopt-workbench", {}, l(Q).adoptConfirm))
        }, r(l(Q).adopt), 9, Ou)) : g("", !0)
      ])) : g("", !0),
      n("div", { class: se(["learning-stage", {
        "is-wide": G.value,
        "is-chat": !G.value && O.value === "chat"
      }]) }, [
        n("div", {
          class: "learning-pane is-work",
          inert: !be.value,
          "aria-hidden": !be.value
        }, [V.value && T.value ? (t(), Z(Dt, {
          key: 0,
          ref_key: "assistant",
          ref: j,
          target: "workbench",
          state: l(a),
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
          onScrollPassive: De,
          onClick: Oe,
          onFocusin: Oe
        }, [V.value && !T.value ? (t(), i(E, { key: 0 }, [
          de.value ? (t(), Z(sa, {
            key: de.value.key,
            turn: de.value.turn,
            stoppable: "",
            disabled: l(u),
            onStop: p[14] || (p[14] = (h) => y(l(he)({ kind: de.value.turn.purpose ?? "talk" }) ? "cancel-preparation" : "cancel"))
          }, va({ _: 2 }, [l(a).storage === "ready" && l(he)({ kind: de.value.turn.purpose ?? "talk" }) && !l(a).preparation?.running && (l(a).preparation || l(a).sourceChoice) ? {
            name: "default",
            fn: _t(() => [W(dt, {
              state: l(a),
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
          de.value && !l(he)({ kind: de.value.turn.purpose ?? "talk" }) && l(Pe)(de.value.turn, l(a).workbenchStorage, l(a).storage) ? (t(), i("p", {
            key: 1,
            class: se(["learning-turn-notice", { "is-error": de.value.turn.status === "failed" }]),
            role: "status"
          }, r(l(Pe)(de.value.turn, l(a).workbenchStorage, l(a).storage)), 3)) : g("", !0),
          l(a).busy && de.value?.turn.status !== "running" ? (t(), i("div", qu, [
            p[39] || (p[39] = n("span", {
              class: "learning-working-dot",
              "aria-hidden": "true"
            }, null, -1)),
            n("span", null, r(l(a).message || s.working), 1),
            n("button", {
              type: "button",
              disabled: l(u),
              onClick: p[15] || (p[15] = (h) => y("cancel"))
            }, "停止", 8, Pu)
          ])) : g("", !0),
          f.value === "home" ? (t(), Z(yo, {
            key: 3,
            state: l(a),
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
          f.value === "profile" ? (t(), Z($l, {
            key: 4,
            state: l(a),
            disabled: !l(b)("language"),
            onAction: y
          }, null, 8, ["state", "disabled"])) : g("", !0),
          f.value === "materials" ? (t(), i("section", Vu, [
            p[40] || (p[40] = n("h1", null, "课件与笔记", -1)),
            l(a).unit ? g("", !0) : (t(), i("p", Du, r(l(a).blockedUnit ? "当前课件在另一个故事中" : "还没有课件"), 1)),
            l(a).unit ? (t(), i(E, { key: 1 }, [
              n("p", Uu, r(l(a).unit.title), 1),
              (t(!0), i(E, null, _(l(a).unit.materials, (h) => (t(), i("button", {
                key: h.id,
                type: "button",
                class: "learning-activity-link",
                onClick: (ae) => Ie({
                  unitId: l(a).unit.id,
                  kind: "material",
                  id: h.id,
                  title: h.title
                })
              }, [
                W(Y, { name: "book" }),
                n("span", null, r(h.title), 1),
                W(Y, { name: "arrow" })
              ], 8, _u))), 128)),
              (t(!0), i(E, null, _(l(a).unit.exercises, (h) => (t(), i("button", {
                key: h.id,
                type: "button",
                class: "learning-activity-link",
                onClick: (ae) => Ie({
                  unitId: l(a).unit.id,
                  kind: "exercise",
                  id: h.id,
                  title: h.prompt
                })
              }, [
                W(Y, { name: "records" }),
                n("span", null, r(h.prompt), 1),
                W(Y, { name: "arrow" })
              ], 8, ju))), 128)),
              l(a).unit.notes.length ? (t(), i("section", Wu, [(t(!0), i(E, null, _(l(a).unit.notes, (h) => (t(), i("article", { key: h.id }, [
                h.selection ? (t(), i("blockquote", Gu, r(h.selection.quote), 1)) : g("", !0),
                n("p", null, r(h.text), 1),
                n("button", {
                  type: "button",
                  disabled: !l(d),
                  onClick: (ae) => y("delete-note", { id: h.id })
                }, "删除笔记", 8, Fu)
              ]))), 128))])) : g("", !0)
            ], 64)) : g("", !0)
          ])) : g("", !0),
          f.value === "books" ? (t(), Z(Gi, {
            key: 6,
            state: l(a),
            disabled: !l(b)("start-review"),
            onAction: Ge,
            onReview: it,
            onRemove: ce
          }, null, 8, ["state", "disabled"])) : g("", !0),
          f.value === "harvest" ? (t(), i("section", Hu, [
            p[42] || (p[42] = n("div", { class: "learning-page-heading" }, [n("h1", null, "我的收获")], -1)),
            l(a).completions.length ? g("", !0) : (t(), i("p", zu, "还没有完成的课程")),
            (t(!0), i(E, null, _(ra.value, (h) => (t(), i("article", {
              key: h.unitId,
              class: "learning-harvest-entry"
            }, [
              n("small", null, r(new Date(h.completedAt).toLocaleDateString()), 1),
              h.rewardStatus !== "retired" ? (t(), i("h2", Yu, [H(r(h.rewardStatus === "paid" ? "+" : "") + r(h.amount), 1), p[41] || (p[41] = n("span", null, "小白币", -1))])) : g("", !0),
              n("p", null, r(h.summary), 1),
              n("p", Ku, r(h.rewardStatus === "paid" ? l(ge).paid : h.rewardStatus === "retired" ? l(ge).retired : l(ge).pending), 1),
              h.rewardStatus !== "paid" && h.rewardStatus !== "retired" ? (t(), i("button", {
                key: 1,
                type: "button",
                disabled: !l(d) || l(a).walletStorage !== "ready",
                onClick: (ae) => y("reward", {
                  unitId: h.unitId,
                  openWallet: !l(a).walletOpen
                })
              }, r(l(a).walletOpen ? l(ge).claim : l(ge).openWallet), 9, Zu)) : g("", !0)
            ]))), 128)),
            l(a).walletStorage === "unconfirmed" || l(a).walletStorage === "conflict" || l(a).walletStorage === "failed" ? (t(), i("button", {
              key: 1,
              type: "button",
              disabled: l(u) || l(a).busy,
              onClick: p[16] || (p[16] = (h) => y("verify-wallet"))
            }, r(s.verifyWallet), 9, Ju)) : g("", !0),
            l(a).walletStorage === "conflict" ? (t(), i("button", {
              key: 2,
              type: "button",
              disabled: l(u) || l(a).busy,
              onClick: p[17] || (p[17] = (h) => ce("adopt-wallet", {}, s.adoptWalletWarning))
            }, r(s.adoptWallet), 9, Qu)) : g("", !0),
            l(a).completions.length > 20 ? (t(), i("div", Xu, [n("button", {
              type: "button",
              disabled: we.value === 0,
              onClick: p[18] || (p[18] = (h) => we.value--)
            }, "上一页", 8, ed), n("button", {
              type: "button",
              disabled: (we.value + 1) * 20 >= l(a).completions.length,
              onClick: p[19] || (p[19] = (h) => we.value++)
            }, "下一页", 8, td)])) : g("", !0)
          ])) : g("", !0),
          f.value === "settings" ? (t(), i("section", ad, [
            p[52] || (p[52] = n("h1", null, "学习设置", -1)),
            n("label", null, [p[43] || (p[43] = H("当前语言", -1)), n("select", {
              value: l(a).language,
              disabled: !l(b)("language"),
              onChange: p[20] || (p[20] = (h) => {
                y("language", { language: h.target.value }), h.target.value = l(a).language;
              })
            }, [(t(!0), i(E, null, _([.../* @__PURE__ */ new Set([l(a).language, ...l(a).languages])], (h) => (t(), i("option", {
              key: h,
              value: h
            }, r(new Intl.DisplayNames(["zh-CN"], { type: "language" }).of(h)), 9, id))), 128))], 40, nd)]),
            n("button", {
              type: "button",
              onClick: wt
            }, "更换语言和语伴 →"),
            W(aa),
            n("section", null, [
              p[44] || (p[44] = n("h2", null, "训练设置", -1)),
              l(a).profile?.goal.description ? (t(), i("p", ld, r(l(a).profile.goal.description), 1)) : g("", !0),
              W(ta, {
                state: l(a),
                disabled: !l(b)("settings"),
                onAction: y
              }, null, 8, ["state", "disabled"])
            ]),
            n("section", null, [
              p[49] || (p[49] = n("h2", null, "语伴的声音", -1)),
              l(a).voices.enabled ? (t(), i("form", {
                key: 1,
                onSubmit: p[24] || (p[24] = oe((h) => y("voice", { voice: {
                  voiceId: _e.value,
                  language: je.value,
                  speed: Number(We.value)
                } }), ["prevent"]))
              }, [
                n("label", null, [p[45] || (p[45] = H("音色", -1)), ne(n("select", { "onUpdate:modelValue": p[21] || (p[21] = (h) => _e.value = h) }, [(t(!0), i(E, null, _(l(a).voices.voices, (h) => (t(), i("option", {
                  key: h.id,
                  value: h.id,
                  disabled: !h.available
                }, r(h.name) + r(h.available ? "" : "（暂不可用）"), 9, rd))), 128))], 512), [[Ye, _e.value]])]),
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
                  disabled: !l(b)("voice") || !l(a).profile
                }, "保存声音设置", 8, od)
              ], 32)) : (t(), i("p", sd, r(s.voiceDisabled), 1)),
              n("button", {
                type: "button",
                onClick: p[25] || (p[25] = (h) => y("tts-settings"))
              }, r(l(a).voices.enabled ? l(ot).settings : l(ot).enable), 1),
              p[50] || (p[50] = n("small", null, "已听过的题保留原声音，新偏好用于之后的题目。", -1))
            ]),
            n("section", null, [
              p[51] || (p[51] = n("h2", null, "学习数据", -1)),
              n("button", {
                type: "button",
                disabled: !l(b)("forget-conversation"),
                onClick: p[26] || (p[26] = (h) => ce("forget-conversation", { target: "companion" }, l(Q).clearCompanionConfirm))
              }, r(l(Q).clearCompanion), 9, ud),
              n("button", {
                type: "button",
                disabled: !l(b)("forget-conversation"),
                onClick: p[27] || (p[27] = (h) => ce("forget-conversation", { target: "workbench" }, l(Q).clearAssistantConfirm))
              }, r(l(Q).clearAssistant), 9, dd),
              n("button", {
                type: "button",
                disabled: !l(b)("export"),
                onClick: ua
              }, "导出学习数据", 8, vd),
              n("button", {
                type: "button",
                disabled: !l(b)("read"),
                onClick: p[28] || (p[28] = (h) => y("read"))
              }, "重新加载", 8, cd),
              l(a).unit || l(a).blockedUnit ? (t(), i("button", {
                key: 0,
                type: "button",
                disabled: !l(b)("abandon"),
                onClick: p[29] || (p[29] = (h) => ce("abandon", {}, l($e).lesson))
              }, "放下当前练习", 8, gd)) : g("", !0),
              n("button", {
                type: "button",
                class: "learning-danger",
                disabled: !l(b)("delete-language") || !l(a).profile,
                onClick: p[30] || (p[30] = (h) => ce("delete-language", {}, "删除当前语言的全部学习数据？未领取奖励也将放弃，已到账流水保留。"))
              }, "删除当前语言", 8, pd),
              n("button", {
                type: "button",
                class: "learning-danger",
                disabled: !l(b)("clear"),
                onClick: p[31] || (p[31] = (h) => ce("clear", {}, "清空所有语言的目标、课程和记录？未领取奖励也将放弃。已到账流水不撤销。"))
              }, "清空全部学习数据", 8, bd)
            ])
          ])) : g("", !0)
        ], 64)) : g("", !0)], 544), [[fa, !T.value]])], 8, Bu),
        l(a).teacher ? (t(), i("div", {
          key: 0,
          class: "learning-pane is-chat",
          inert: !Ve.value,
          "aria-hidden": !Ve.value
        }, [U.value ? (t(), Z(Dt, {
          key: 0,
          ref_key: "conversation",
          ref: N,
          target: "companion",
          state: l(a),
          disabled: !l(v),
          pending: l(u),
          onAction: y,
          onPresent: Ie,
          onProfile: wt
        }, null, 8, [
          "state",
          "disabled",
          "pending"
        ])) : g("", !0)], 8, md)) : g("", !0),
        !G.value && O.value === "work" && l(a).teacher ? (t(), i("button", {
          key: 1,
          type: "button",
          class: "learning-float is-companion",
          "aria-label": ft.value ? `和${l(a).teacher.name}聊天，有新消息` : `和${l(a).teacher.name}聊天`,
          onClick: kt
        }, [n("span", kd, r([...l(a).teacher.name][0]), 1), ft.value ? (t(), i("span", yd)) : g("", !0)], 8, fd)) : g("", !0),
        !G.value && O.value === "chat" ? (t(), i("button", {
          key: 2,
          type: "button",
          class: "learning-float is-workbook",
          "aria-label": Ce.value ? "回到练习本，有新指引" : "回到练习本",
          onClick: Ue
        }, [W(Y, { name: "workbook" }), Ce.value ? (t(), i("span", $d)) : g("", !0)], 8, hd)) : g("", !0),
        l(Ct) ? (t(), i("aside", {
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
      z.value ? g("", !0) : (t(), Z(Yt, {
        key: 3,
        state: l(a),
        onAction: y
      }, null, 8, ["state"])),
      l(a).unit && z.value ? (t(), Z(zn, {
        key: `${l(a).chatIdentity}:${l(a).language}:${l(a).unit.id}:${z.value.kind}:${z.value.id}`,
        state: l(a),
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
      l(a).approval ? (t(), Z(ti, {
        key: 5,
        approval: l(a).approval,
        pending: l(u),
        onAction: y
      }, null, 8, ["approval", "pending"])) : ie.value ? (t(), i("div", {
        key: 6,
        ref_key: "confirmLayer",
        ref: ht,
        class: "learning-confirm-shade",
        onKeydown: p[36] || (p[36] = Se(oe((h) => ie.value = null, ["stop", "prevent"]), ["esc"]))
      }, [n("section", wd, [
        n("h2", xd, r(l(Et)[ie.value.action].title), 1),
        n("p", null, r(ie.value.text), 1),
        n("div", Cd, [n("button", {
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
        }, r(l(Et)[ie.value.action].accept), 9, Id)])
      ])], 544)) : g("", !0)
    ], 4));
  }
}), Md = Ld;
export {
  Md as default
};
