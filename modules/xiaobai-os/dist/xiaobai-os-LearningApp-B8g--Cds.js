/* eslint-disable */
import { $ as oa, B as ua, D as re, G as Z, I as a, J as ne, L as da, N as Ae, Q as z, R as H, S as ae, T as xt, U as va, W as ca, Z as xe, _ as i, a as He, at as r, b as Y, c as qe, et as ga, g as p, h as J, i as pa, it as qt, k as Re, l as ve, m as n, nt as l, o as de, p as C, q as Pt, rt as se, s as ma, tt as ke, u as E, v as ba, w as fa, x as F, z as ka } from "./xiaobai-os-runtime-dom.esm-bundler-C2atLQPd.js";
import { i as _t, r as ze } from "./xiaobai-os-app-navigation-5cBwNoCT.js";
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
}, Pa = ["disabled"], _a = /* @__PURE__ */ ae({
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
      const b = [...u.value.order];
      [b[k], b[k + h]] = [b[k + h], b[k]], u.value.order = b;
    }
    const m = C(() => {
      const k = s.response;
      return k.kind === "text" ? !!u.value.text.trim() : k.kind === "gaps" ? k.slots.every((h) => u.value.values[h.id]?.trim()) : k.kind === "match" ? k.left.every((h) => u.value.values[h.id]) : k.kind === "order" ? !0 : u.value.picked.length > 0;
    });
    function I() {
      const k = s.response;
      !m.value || s.disabled || (k.kind === "text" ? t("submit", {
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
      e.response.kind === "choice" ? (a(), i("div", wa, [(a(!0), i(E, null, H(e.response.options, (b, w) => (a(), i("label", {
        key: b.id,
        class: se({ selected: u.value.picked.includes(b.id) })
      }, [
        n("input", {
          type: e.response.multiple ? "checkbox" : "radio",
          name: "answer-choice",
          checked: u.value.picked.includes(b.id),
          onChange: (f) => d(b.id)
        }, null, 40, xa),
        n("span", Ca, r(String.fromCharCode(65 + w)), 1),
        n("span", null, r(b.text), 1)
      ], 2))), 128))])) : e.response.kind === "order" ? (a(), i("ol", Ia, [(a(!0), i(E, null, H(u.value.order, (b, w) => (a(), i("li", { key: b }, [
        n("span", null, r(e.response.options.find((f) => f.id === b)?.text), 1),
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
      ]))), 128))])) : e.response.kind === "match" ? (a(), i("div", Aa, [(a(!0), i(E, null, H(e.response.left, (b) => (a(), i("label", { key: b.id }, [Y(r(b.text) + " ", 1), ne(n("select", { "onUpdate:modelValue": (w) => u.value.values[b.id] = w }, [h[1] || (h[1] = n("option", { value: "" }, "选择对应项", -1)), (a(!0), i(E, null, H(e.response.right, (w) => (a(), i("option", {
        key: w.id,
        value: w.id
      }, r(w.text), 9, Ma))), 128))], 8, Ra), [[He, u.value.values[b.id]]])]))), 128))])) : e.response.kind === "evidence" ? (a(), i("div", Ea, [(a(!0), i(E, null, H(e.paragraphs, (b) => (a(), i("label", {
        key: b.id,
        class: se({ selected: u.value.picked.includes(b.id) })
      }, [n("input", {
        type: "checkbox",
        checked: u.value.picked.includes(b.id),
        onChange: (w) => d(b.id)
      }, null, 40, Ta), n("span", null, r(b.text), 1)], 2))), 128)), e.paragraphs.length ? p("", !0) : (a(), i("p", Na, "请先展开相关文稿，再选择原文依据。"))])) : e.response.kind === "gaps" ? (a(), i("div", Ba, [(a(!0), i(E, null, H(e.response.slots, (b) => (a(), i("label", { key: b.id }, [Y(r(b.text), 1), ne(n("input", {
        "onUpdate:modelValue": (w) => u.value.values[b.id] = w,
        type: "text",
        maxlength: "4000",
        autocomplete: "off"
      }, null, 8, Oa), [[de, u.value.values[b.id]]])]))), 128))])) : (a(), i("label", qa, [h[2] || (h[2] = n("span", { class: "learning-sr-only" }, "你的回答", -1)), ne(n("textarea", {
        "onUpdate:modelValue": h[0] || (h[0] = (b) => u.value.text = b),
        rows: "6",
        maxlength: "4000",
        placeholder: "写下你的回答…"
      }, null, 512), [[de, u.value.text], [l(Ze), u.value]])])),
      n("button", {
        class: "learning-primary",
        type: "submit",
        disabled: !m.value
      }, "交给语伴 →", 8, Pa)
    ], 8, $a)], 32));
  }
}), Ut = _a, Vt = 2e3, Ua = ["stroke-width"], Va = ["d"], Da = /* @__PURE__ */ ae({
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
    }, [n("path", { d: c[e.name] }, null, 8, Va)], 8, Ua));
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
  const v = c.find((b) => b.id === d.dataset.materialId), m = v?.paragraphs.find((b) => b.id === d.dataset.paragraphId);
  if (!v || !m) return null;
  const I = t.cloneRange();
  I.selectNodeContents(d), I.setEnd(t.startContainer, t.startOffset);
  const k = I.toString().length, h = t.toString();
  return !h.trim() || [...h].length > 2e3 || m.text.slice(k, k + h.length) !== h ? null : {
    materialId: v.id,
    paragraphId: m.id,
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
    return (v, m) => (a(), i("article", {
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
      e.material.hidden ? (a(), i("div", Ha, [m[1] || (m[1] = n("svg", {
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
        onClick: m[0] || (m[0] = (I) => t("action", "reveal", {
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
        disabled: [...I.text].length > l(Vt),
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
}, mn = {
  key: 0,
  role: "status"
}, bn = {
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
      e.state.media.message ? (a(), i("p", mn, r(e.state.media.message), 1)) : p("", !0),
      e.state.voices.enabled ? p("", !0) : (a(), i("button", {
        key: 1,
        type: "button",
        onClick: d[0] || (d[0] = (v) => s("action", "tts-settings"))
      }, r(l(rt).enable), 1)),
      e.state.media.key ? (a(), i("div", bn, [
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
    unit(m) {
      return e[m] ??= {
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
      }, e[m];
    },
    reset(m = !1, I = !1) {
      if (!I) {
        for (const k of Object.keys(e)) delete e[k];
        t.open = !1, t.submitted = null, Object.assign(s, Fe());
      }
      Object.assign(c, Fe()), u.enabled = !1, m || Object.assign(d, {
        step: 0,
        name: "",
        note: ""
      }), Object.assign(v, {
        tab: "grammar",
        reason: ""
      });
    },
    reconcile(m) {
      const I = t.submitted;
      I && m.storage === "ready" && !m.busy && m.profile && Object.entries(I.value).every(([k, h]) => m.profile.settings[k] === h) && (Object.entries(I.form).every(([k, h]) => t.form[k] === h) && (t.open = !1), t.submitted = null);
      for (const k of Object.keys(e)) {
        const h = [m.unit, m.review].find((w) => w?.id === k);
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
        const b = e[k].selection;
        b && h.materials.find((w) => w.id === b.materialId)?.paragraphs.find((w) => w.id === b.paragraphId)?.text.slice(b.start, b.end) !== b.quote && (e[k].selection = null);
        for (const [w, f] of Object.entries(e[k].writing)) {
          const $ = h.attempts.filter((x) => x.exerciseId === w && !x.revisesAttemptId).at(-1), o = f.submitted;
          !o || !$ || $.id === o.before || (f.text === o.text && $.answer.kind === "text" && $.answer.text === o.text.trim() ? (f.text = "", f.rewriting = !1) : f.rewriting = !0, f.submitted = null);
        }
      }
      for (const [k, h] of [[c, m.conversation], [s, m.workbenchConversation]]) {
        const b = k.sent;
        b && h.turns.some((w, f) => f + h.removedTurns >= b.after && w.purpose === "talk" && w.user === b.user) && (k.text === b.text && (k.text = "", k.focus = null), k.sent = null);
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
        if (d && At(d, u.response) || v && !s.attempts.some((m) => m.exerciseId === u.id) && At(v, u.response)) return !0;
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
}, On = { class: "learning-help-actions" }, qn = ["disabled"], Pn = ["disabled"], _n = ["disabled"], Un = {
  key: 0,
  class: "learning-margin-note"
}, Vn = {
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
    const m = C(() => d.value.activities[v.value]), I = z(null), k = C({
      get: () => m.value.retry,
      set: (D) => {
        m.value.retry = D;
      }
    }), h = C({
      get: () => m.value.selected,
      set: (D) => {
        m.value.selected = D;
      }
    }), b = z(null);
    function w() {
      h.value ? h.value = null : k.value ? k.value = !1 : t("close");
    }
    _t(b, w);
    const f = C(() => d.value.activityDrafts);
    let $ = null;
    const o = C(() => s.target?.kind === "exercise" ? s.state.unit?.exercises.find((D) => D.id === s.target?.id) : void 0), x = C(() => s.state.unit?.materials.filter((D) => s.target?.kind === "material" ? D.id === s.target.id : o.value?.materialIds.includes(D.id)) ?? []), U = C(() => o.value?.id ?? s.state.unit?.exercises.find((D) => D.skill === "listening" && D.materialIds.includes(s.target?.id ?? ""))?.id ?? s.state.unit?.exercises.find((D) => D.materialIds.includes(s.target?.id ?? ""))?.id), R = C(() => x.value.filter((D) => o.value?.response.kind !== "evidence" || D.id === o.value.response.materialId).flatMap((D) => D.paragraphs)), L = C(() => s.state.unit?.attempts.filter((D) => D.exerciseId === o.value?.id).at(-1)), B = C(() => s.state.unit?.assessments.find((D) => D.attemptId === L.value?.id));
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
      I.value?.focus({ preventScroll: !0 }), u.value && (u.value.scrollTop = m.value.scroll);
    }), Re(() => {
      u.value && (m.value.scroll = u.value.scrollTop);
    }), Z(() => s.state.unit?.attempts, (D) => {
      if (!$) return;
      const P = D?.filter((j) => j.exerciseId === $.id).at(-1);
      if (P && P.id !== $.before) {
        const j = s.target?.kind === "exercise" && s.target.id === $.id;
        delete f.value[$.id], $ = null, j && t("close");
      }
    });
    function V(D) {
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
      ref: b,
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
          open: m.value.materialsOpen,
          onToggle: P[3] || (P[3] = (j) => m.value.materialsOpen = j.target.open)
        }, [n("summary", null, "阅读材料 · " + r(x.value.length), 1), (a(!0), i(E, null, H(x.value, (j) => (a(), J(It, {
          key: j.id,
          material: j,
          "exercise-id": U.value,
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
          "exercise-id": U.value,
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
          onAsk: P[6] || (P[6] = (j) => t("ask", U.value, h.value)),
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
            }, "解答", 8, _n),
            n("button", {
              type: "button",
              onClick: P[12] || (P[12] = (j) => t("ask", o.value.id))
            }, "问语伴")
          ]),
          o.value.hint ? (a(), i("p", Un, r(o.value.hint), 1)) : p("", !0),
          o.value.solution ? (a(), i("div", Vn, [o.value.solution.kind === "exact" ? (a(), i("p", Dn, r(l(vt)(o.value.solution.answer, o.value.response, R.value)), 1)) : o.value.solution.kind === "gaps" ? (a(), i("p", jn, r(o.value.solution.accepted.map((j) => j.forms.join(" / ")).join(`
`)), 1)) : p("", !0), o.value.solution.kind !== "semantic" ? (a(), i("p", Wn, r(o.value.solution.explanation), 1)) : (a(), i("button", {
            key: 3,
            type: "button",
            onClick: P[13] || (P[13] = (j) => t("ask", o.value.id))
          }, "请语伴讲解"))])) : p("", !0),
          (!L.value || k.value) && f.value[o.value.id] ? (a(), J(Ut, {
            key: o.value.id,
            modelValue: W.value,
            "onUpdate:modelValue": P[14] || (P[14] = (j) => W.value = j),
            response: o.value.response,
            paragraphs: R.value,
            disabled: e.disabled,
            onSubmit: V
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
}), Hn = Fn;
function zn(e, c) {
  return /^(zh|ja|ko)\b/iu.test(c) ? {
    count: [...e.replace(/[\s\p{P}\p{S}]/gu, "")].length,
    unit: "characters"
  } : {
    count: e.match(/[\p{L}\p{N}][\p{L}\p{N}\p{M}'’-]*/gu)?.length ?? 0,
    unit: "words"
  };
}
var Yn = 864e5;
function Rt(e, c) {
  const s = zn(e, c);
  return {
    count: s.count,
    unit: s.unit === "characters" ? "字" : "词"
  };
}
function Qt(e, c) {
  const s = [], t = /* @__PURE__ */ new Map();
  for (const u of c)
    if (u.quote)
      for (let d = e.indexOf(u.quote); d >= 0; d = e.indexOf(u.quote, d + 1)) {
        const v = d + u.quote.length;
        if (!s.some(([m, I]) => d < I && m < v)) {
          s.push([d, v]), t.set(u.id, d);
          break;
        }
      }
  return t;
}
function Kn(e, c) {
  const s = e.split(/(\r?\n)/u), t = [];
  s.forEach((k, h) => {
    h % 2 === 0 && k.trim() && t.push(h);
  });
  const u = [], d = [], v = /* @__PURE__ */ new Map();
  for (const k of c) v.set(k.paragraphIndex, [...v.get(k.paragraphIndex) ?? [], k]);
  for (const [k, h] of v) {
    const b = t[k];
    if (b === void 0) {
      u.push(...h.map((o) => o.id));
      continue;
    }
    const w = Qt(s[b], h), f = h.filter((o) => w.has(o.id)).sort((o, x) => w.get(x.id) - w.get(o.id));
    let $ = s[b];
    for (const o of f) {
      const x = w.get(o.id);
      $ = $.slice(0, x) + o.replacement + $.slice(x + o.quote.length), o.replacement !== o.quote && d.push(o.id);
    }
    s[b] = $, u.push(...h.filter((o) => !w.has(o.id)).map((o) => o.id));
  }
  const m = new Map(c.map((k, h) => [k.id, h])), I = (k, h) => m.get(k) - m.get(h);
  return {
    text: s.join(""),
    missing: u.sort(I),
    applied: d.sort(I)
  };
}
function Zn(e, c) {
  const s = Qt(e, c), t = c.filter((v) => s.has(v.id)).map((v) => ({
    id: v.id,
    start: s.get(v.id),
    length: v.quote.length
  })).sort((v, m) => v.start - m.start), u = [];
  let d = 0;
  for (const v of t)
    v.start > d && u.push({ text: e.slice(d, v.start) }), u.push({
      text: e.slice(v.start, v.start + v.length),
      id: v.id
    }), d = v.start + v.length;
  return (d < e.length || !u.length) && u.push({ text: e.slice(d) }), u;
}
function Jn(e, c = "xiaobai-learning-seen-units") {
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
var Qn = () => {
  try {
    return globalThis.localStorage;
  } catch {
    return null;
  }
}, Mt = Jn(Qn);
function ct(e, c = Date.now()) {
  const s = new Date(e), t = new Date(c), u = Math.round((Date.UTC(s.getFullYear(), s.getMonth(), s.getDate()) - Date.UTC(t.getFullYear(), t.getMonth(), t.getDate())) / Yn);
  return !Number.isFinite(u) || u <= 0 ? "今天复习" : u === 1 ? "明天再见" : `${u} 天后再见`;
}
var Xn = { class: "learning-records-page" }, ei = {
  key: 0,
  class: "learning-page-heading"
}, ti = {
  key: 0,
  class: "learning-muted"
}, ai = { class: "learning-muted" }, ni = {
  key: 0,
  class: "learning-muted"
}, ii = ["disabled", "onClick"], li = ["disabled"], si = {
  key: 0,
  class: "learning-empty-note"
}, ri = ["disabled", "onClick"], oi = ["title"], ui = {
  key: 1,
  class: "learning-row"
}, di = ["disabled"], vi = { class: "learning-muted" }, ci = ["disabled"], gi = /* @__PURE__ */ ae({
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
    return (d, v) => (a(), i("section", Xn, [!e.embedded || e.state.record ? (a(), i("div", ei, [v[5] || (v[5] = n("h1", null, "学习记录", -1)), e.state.records.total ? (a(), i("span", ti, r(e.state.records.total) + " 项", 1)) : p("", !0)])) : p("", !0), e.state.record ? (a(), i(E, { key: 1 }, [
      n("button", {
        type: "button",
        onClick: v[0] || (v[0] = (m) => d.$emit("action", "records", { offset: e.state.records.offset }))
      }, "‹ 返回记录"),
      n("h2", null, r(e.state.record.label), 1),
      (a(!0), i(E, null, H(e.state.record.evidence, (m) => (a(), i("article", {
        key: m.attempt.id,
        class: "learning-record-evidence"
      }, [
        n("p", ai, r(new Date(m.attempt.submittedAt).toLocaleDateString()), 1),
        n("h3", null, r(m.exercise.prompt), 1),
        (a(!0), i(E, null, H(m.materials, (I) => (a(), i("details", { key: I.id }, [n("summary", null, r(I.title), 1), I.hidden ? (a(), i("p", ni, r(u.hidden), 1)) : (a(!0), i(E, { key: 1 }, H(I.paragraphs, (k) => (a(), i("p", { key: k.id }, r(k.text), 1))), 128))]))), 128)),
        F(jt, {
          attempt: m.attempt,
          feedback: m.assessment,
          response: m.exercise.response,
          paragraphs: m.materials.flatMap((I) => I.paragraphs),
          disabled: e.disabled,
          revised: !!e.state.unit?.attempts.some((I) => I.revisesAttemptId === m.attempt.id),
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
          onClick: (I) => d.$emit("remove", "delete-attempt", { id: m.attempt.id }, u.answerWarning)
        }, r(u.deleteAnswer), 9, ii)
      ]))), 128)),
      n("button", {
        type: "button",
        disabled: e.disabled,
        onClick: v[2] || (v[2] = (m) => d.$emit("remove", "delete-item", { id: e.state.record.id }, u.recordWarning))
      }, r(u.deleteRecord), 9, li)
    ], 64)) : (a(), i(E, { key: 2 }, [
      e.state.records.total ? p("", !0) : (a(), i("p", si, "暂无学习记录")),
      (a(!0), i(E, null, H(e.state.records.items, (m) => (a(), i("button", {
        key: m.id,
        class: "learning-record-row",
        type: "button",
        disabled: !m.readable,
        onClick: (I) => d.$emit("action", "records", {
          id: m.id,
          offset: e.state.records.offset
        })
      }, [n("span", null, [n("strong", null, r(m.label), 1), n("small", null, [Y(r(l(Ft)(m.evidenceCount)), 1), m.nextReviewAt ? (a(), i("span", {
        key: 0,
        title: m.scheduleReason ?? void 0
      }, " · " + r(l(ct)(m.nextReviewAt)) + "（" + r(new Date(m.nextReviewAt).toLocaleDateString()) + "）", 9, oi)) : p("", !0)])]), n("em", null, r(l(Gt)[m.state]), 1)], 8, ri))), 128)),
      e.state.records.total > 30 ? (a(), i("div", ui, [
        n("button", {
          type: "button",
          disabled: e.state.records.offset === 0,
          onClick: v[3] || (v[3] = (m) => d.$emit("action", "records", { offset: Math.max(0, e.state.records.offset - 30) }))
        }, "上一页", 8, di),
        n("span", vi, r(e.state.records.total) + " 项", 1),
        n("button", {
          type: "button",
          disabled: e.state.records.offset + 30 >= e.state.records.total,
          onClick: v[4] || (v[4] = (m) => d.$emit("action", "records", { offset: e.state.records.offset + 30 }))
        }, "下一页", 8, ci)
      ])) : p("", !0)
    ], 64))]));
  }
}), Et = gi, pi = { class: "learning-books-page" }, mi = { class: "learning-page-heading" }, bi = {
  key: 0,
  class: "learning-due"
}, fi = { key: 0 }, ki = { key: 1 }, yi = ["disabled"], hi = {
  class: "learning-tabs",
  role: "tablist",
  "aria-label": "学习记录视图"
}, $i = ["aria-selected", "onClick"], wi = {
  key: 0,
  class: "learning-empty-note"
}, xi = { class: "learning-book-list" }, Ci = ["disabled", "onClick"], Ii = ["aria-expanded", "onClick"], Li = {
  key: 1,
  class: "learning-chip-reason"
}, Si = {
  key: 2,
  class: "learning-growth"
}, Ai = {
  key: 0,
  class: "learning-empty-note"
}, Ri = { class: "learning-muted" }, Mi = { key: 0 }, Ei = { key: 0 }, Ti = { key: 1 }, Ni = { key: 2 }, Bi = /* @__PURE__ */ ae({
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
    ], m = { title: "学习本" }, I = ke(u, "reason"), k = C(() => d.value === "grammar" || d.value === "vocabulary" ? s.state.books[d.value] : []), h = C(() => s.state.growth), b = C(() => !!s.state.review && s.state.review.stage.stage !== "complete");
    return (w, f) => (a(), i("section", pi, [e.state.record ? (a(), J(Et, {
      key: 0,
      state: e.state,
      disabled: e.disabled,
      onAction: f[0] || (f[0] = ($, o) => t("action", $, o)),
      onRemove: f[1] || (f[1] = ($, o, x) => t("remove", $, o, x))
    }, null, 8, ["state", "disabled"])) : (a(), i(E, { key: 1 }, [
      n("div", mi, [n("h1", null, r(m.title), 1)]),
      e.state.dueCount || b.value ? (a(), i("div", bi, [e.state.dueCount ? (a(), i("span", fi, r(l(Ht)(e.state.dueCount)), 1)) : p("", !0), e.state.blockedReview ? (a(), i("small", ki, "有一组复习在另一个故事中进行，回到学习页可以放下它")) : b.value ? (a(), i("button", {
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
      }, r(l(te).review), 9, yi))])) : p("", !0),
      n("div", hi, [(a(), i(E, null, H(v, ([$, o]) => n("button", {
        key: $,
        type: "button",
        role: "tab",
        "aria-selected": d.value === $,
        onClick: (x) => {
          d.value = $, I.value = "";
        }
      }, r(o), 9, $i)), 64))]),
      d.value === "grammar" || d.value === "vocabulary" ? (a(), i(E, { key: 1 }, [k.value.length ? p("", !0) : (a(), i("p", wi, r(d.value === "grammar" ? "批改里出现的语法问题会记到这里。" : "批改里的词汇问题、读文章时收藏的词语会记到这里。"), 1)), n("ul", xi, [(a(!0), i(E, null, H(k.value, ($) => (a(), i("li", { key: $.id }, [
        n("button", {
          type: "button",
          class: "learning-book-item",
          disabled: !$.readable,
          onClick: (o) => t("action", "records", {
            id: $.id,
            offset: e.state.records.offset
          })
        }, [n("strong", null, r($.label), 1), n("small", null, r(l(Gt)[$.state]) + " · " + r(l(Ft)($.evidenceCount)), 1)], 8, Ci),
        $.nextReviewAt ? (a(), i("button", {
          key: 0,
          type: "button",
          class: "learning-chip",
          "aria-expanded": I.value === $.id,
          onClick: (o) => I.value = I.value === $.id ? "" : $.id
        }, r(l(ct)($.nextReviewAt)), 9, Ii)) : p("", !0),
        I.value === $.id ? (a(), i("small", Li, r($.scheduleReason), 1)) : p("", !0)
      ]))), 128))])], 64)) : d.value === "growth" ? (a(), i("section", Si, [h.value.enough ? (a(), i(E, { key: 1 }, [
        n("p", Ri, [Y("来自 " + r(h.value.evidence) + " 份作答", 1), h.value.completed ? (a(), i("span", Mi, "、" + r(h.value.completed) + " 次完成", 1)) : p("", !0)]),
        h.value.steady.length ? (a(), i("div", Ei, [f[6] || (f[6] = n("h2", null, "已经稳定", -1)), n("p", null, r(h.value.steady.join("、")), 1)])) : p("", !0),
        h.value.practising.length ? (a(), i("div", Ti, [f[7] || (f[7] = n("h2", null, "最近独立做对", -1)), n("p", null, r(h.value.practising.join("、")), 1)])) : p("", !0),
        h.value.struggling.length ? (a(), i("div", Ni, [f[8] || (f[8] = n("h2", null, "还要再练", -1)), n("p", null, r(h.value.struggling.join("、")), 1)])) : p("", !0)
      ], 64)) : (a(), i("p", Ai, "还需要几次练习才看得出"))])) : (a(), J(Et, {
        key: 3,
        embedded: "",
        state: e.state,
        disabled: e.disabled,
        onAction: f[4] || (f[4] = ($, o) => t("action", $, o)),
        onRemove: f[5] || (f[5] = ($, o, x) => t("remove", $, o, x))
      }, null, 8, ["state", "disabled"]))
    ], 64))]));
  }
}), Oi = Bi, qi = {
  class: "learning-settings-card",
  "aria-label": "训练设置"
}, Pi = { key: 0 }, _i = ["disabled"], Ui = ["open"], Vi = ["value"], Di = { class: "learning-row" }, ji = ["disabled"], Wi = /* @__PURE__ */ ae({
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
    ], d = C(() => s.state.profile?.settings ?? null), v = Me().settings, m = v.form, I = ke(v, "open");
    function k() {
      Object.assign(m, {
        exam: d.value?.exam ?? "",
        level: d.value?.level ?? "",
        targetLevel: d.value?.targetLevel ?? "",
        explanationLanguage: d.value?.explanationLanguage ?? "zh-CN",
        interests: d.value?.interests ?? ""
      });
    }
    s.onboarding && !v.open && (k(), v.open = !0);
    const h = ($) => u.find(([o]) => o === $)?.[1] ?? new Intl.DisplayNames(["zh-CN"], { type: "language" }).of($) ?? $, b = C(() => [.../* @__PURE__ */ new Set([...u.map(([$]) => $), d.value?.explanationLanguage ?? "zh-CN"])]), w = C(() => [
      ["考试", d.value?.exam || "不备考"],
      ["水平", d.value?.level || "不确定"],
      ["目标", d.value?.targetLevel || "比现在高一级"],
      ["讲解", h(d.value?.explanationLanguage ?? "zh-CN")],
      ["兴趣", d.value?.interests || "不限"]
    ]);
    function f() {
      const $ = Kt(m);
      v.submitted = {
        value: $,
        form: { ...m }
      }, t("action", "settings", { value: $ });
    }
    return ($, o) => (a(), i("section", qi, [I.value ? p("", !0) : (a(), i("dl", Pi, [(a(!0), i(E, null, H(w.value, ([x, U]) => (a(), i("div", { key: x }, [n("dt", null, r(x), 1), n("dd", null, r(U), 1)]))), 128))])), I.value ? (a(), i("form", {
      key: 2,
      class: "learning-fields",
      onSubmit: ve(f, ["prevent"])
    }, [
      n("label", null, [o[7] || (o[7] = Y("考试", -1)), ne(n("input", {
        "onUpdate:modelValue": o[1] || (o[1] = (x) => l(m).exam = x),
        type: "text",
        maxlength: "80",
        placeholder: "不备考（例如 雅思、JLPT N2）"
      }, null, 512), [[de, l(m).exam]])]),
      n("label", null, [o[8] || (o[8] = Y("现在的水平", -1)), ne(n("input", {
        "onUpdate:modelValue": o[2] || (o[2] = (x) => l(m).level = x),
        type: "text",
        maxlength: "80",
        placeholder: "不确定"
      }, null, 512), [[de, l(m).level]])]),
      n("label", null, [o[9] || (o[9] = Y("目标", -1)), ne(n("input", {
        "onUpdate:modelValue": o[3] || (o[3] = (x) => l(m).targetLevel = x),
        type: "text",
        maxlength: "80",
        placeholder: "比现在高一级"
      }, null, 512), [[de, l(m).targetLevel]])]),
      n("details", {
        class: "learning-settings-optional",
        open: !e.onboarding
      }, [
        n("summary", null, r(l(te).optionalSettings), 1),
        n("label", null, [o[10] || (o[10] = Y("讲解语言", -1)), ne(n("select", { "onUpdate:modelValue": o[4] || (o[4] = (x) => l(m).explanationLanguage = x) }, [(a(!0), i(E, null, H(b.value, (x) => (a(), i("option", {
          key: x,
          value: x
        }, r(h(x)), 9, Vi))), 128))], 512), [[He, l(m).explanationLanguage]])]),
        n("label", null, [o[11] || (o[11] = Y("感兴趣的话题", -1)), ne(n("input", {
          "onUpdate:modelValue": o[5] || (o[5] = (x) => l(m).interests = x),
          type: "text",
          maxlength: "200",
          placeholder: "不限"
        }, null, 512), [[de, l(m).interests]])])
      ], 8, Ui),
      n("div", Di, [e.onboarding ? p("", !0) : (a(), i("button", {
        key: 0,
        type: "button",
        onClick: o[6] || (o[6] = (x) => {
          I.value = !1, l(v).submitted = null;
        })
      }, "取消")), n("button", {
        type: "submit",
        class: "learning-primary",
        disabled: e.disabled
      }, r(e.onboarding ? l(te).setupFinish : l(te).saveSettings), 9, ji)])
    ], 32)) : (a(), i("button", {
      key: 1,
      type: "button",
      disabled: e.disabled,
      onClick: o[0] || (o[0] = (x) => {
        k(), I.value = !0;
      })
    }, "调整", 8, _i))]));
  }
}), Xt = Wi, Gi = { class: "learning-profile-page" }, Fi = { class: "learning-setup-heading" }, Hi = { class: "learning-eyebrow" }, zi = { class: "learning-language-options" }, Yi = [
  "disabled",
  "aria-pressed",
  "onClick"
], Ki = { "aria-hidden": "true" }, Zi = ["disabled"], Ji = {
  key: 0,
  class: "learning-setup-empty"
}, Qi = { class: "learning-teacher-options" }, Xi = [
  "disabled",
  "aria-pressed",
  "onClick"
], el = { class: "learning-person-initial" }, tl = {
  key: 1,
  class: "learning-selected-teacher"
}, al = { class: "learning-person-initial" }, nl = { key: 0 }, il = ["open"], ll = ["disabled"], sl = ["disabled"], rl = ["disabled"], ol = { class: "learning-setup-actions" }, ul = ["disabled"], dl = ["disabled"], vl = /* @__PURE__ */ ae({
  __name: "LearningSetup",
  props: {
    state: {},
    disabled: { type: Boolean }
  },
  emits: ["action"],
  setup(e, { emit: c }) {
    const s = c, t = Me().setup, u = ke(t, "step"), d = z(null), v = ke(t, "name"), m = ke(t, "note"), I = [
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
    return ze(() => u.value ? (k(u.value - 1), !0) : !1), (h, b) => (a(), i("section", Gi, [n("div", Fi, [n("p", Hi, r(u.value + 1) + " / " + r(l(te).setupSteps), 1), n("h1", {
      ref_key: "heading",
      ref: d,
      tabindex: "-1"
    }, r(u.value === 0 ? "选择要学习的语言" : u.value === 1 ? "选择语伴" : l(te).setupTitle), 513)]), u.value === 0 ? (a(), i(E, { key: 0 }, [n("div", zi, [(a(), i(E, null, H(I, ([w, f, $]) => n("button", {
      key: w,
      type: "button",
      disabled: e.disabled,
      "aria-pressed": e.state.language === w,
      onClick: (o) => s("action", "language", { language: w })
    }, [
      n("span", Ki, r($), 1),
      n("strong", null, r(f), 1),
      e.state.language === w ? (a(), J(K, {
        key: 0,
        name: "check"
      })) : p("", !0)
    ], 8, Yi)), 64))]), n("button", {
      type: "button",
      class: "learning-primary learning-setup-next",
      disabled: e.disabled,
      onClick: b[0] || (b[0] = (w) => k(1))
    }, [b[7] || (b[7] = Y("继续", -1)), F(K, { name: "arrow" })], 8, Zi)], 64)) : u.value === 1 ? (a(), i(E, { key: 1 }, [
      e.state.candidates.length ? p("", !0) : (a(), i("p", Ji, "当前故事里还没有认识的人物，所以没有可选的语伴。可以在下面手动填一位：名字加一句身份说明。")),
      n("div", Qi, [(a(!0), i(E, null, H(e.state.candidates, (w) => (a(), i("button", {
        key: w.name,
        type: "button",
        disabled: e.disabled,
        "aria-pressed": e.state.teacher?.name === w.name,
        onClick: (f) => s("action", "teacher", { teacher: {
          name: w.name,
          note: ""
        } })
      }, [
        n("span", el, r([...w.name][0]), 1),
        n("strong", null, r(w.name), 1),
        e.state.teacher?.name === w.name ? (a(), J(K, {
          key: 0,
          name: "check"
        })) : p("", !0)
      ], 8, Xi))), 128))]),
      e.state.teacher && !e.state.candidates.some((w) => w.name === e.state.teacher?.name) ? (a(), i("p", tl, [
        n("span", al, r([...e.state.teacher.name][0]), 1),
        n("span", null, [Y(r(e.state.teacher.name), 1), e.state.teacher.note ? (a(), i("small", nl, r(e.state.teacher.note), 1)) : p("", !0)]),
        F(K, { name: "check" })
      ])) : p("", !0),
      n("details", {
        class: "learning-other-teacher",
        open: !e.state.candidates.length
      }, [n("summary", null, r(e.state.candidates.length ? "手动填写其他人物" : "手动填写"), 1), n("form", {
        class: "learning-fields",
        onSubmit: b[3] || (b[3] = ve((w) => s("action", "teacher", { teacher: {
          name: v.value.trim(),
          note: m.value.trim()
        } }), ["prevent"]))
      }, [
        n("label", null, [b[8] || (b[8] = Y("名字", -1)), ne(n("input", {
          "onUpdate:modelValue": b[1] || (b[1] = (w) => v.value = w),
          type: "text",
          maxlength: "80",
          placeholder: "例如 林老师",
          disabled: e.disabled
        }, null, 8, ll), [[de, v.value]])]),
        n("label", null, [b[9] || (b[9] = Y("一句身份说明", -1)), ne(n("input", {
          "onUpdate:modelValue": b[2] || (b[2] = (w) => m.value = w),
          type: "text",
          maxlength: "200",
          placeholder: "例如 在东京长大的大学同学，说话直爽",
          disabled: e.disabled
        }, null, 8, sl), [[de, m.value]])]),
        n("button", {
          type: "submit",
          disabled: e.disabled || !v.value.trim()
        }, "选这位", 8, rl)
      ], 32)], 8, il),
      n("div", ol, [n("button", {
        type: "button",
        disabled: e.disabled,
        onClick: b[4] || (b[4] = (w) => k(0))
      }, "上一步", 8, ul), n("button", {
        type: "button",
        class: "learning-primary",
        disabled: e.disabled,
        onClick: b[5] || (b[5] = (w) => k(2))
      }, [Y(r(e.state.teacher ? l(te).setupContinue : l(ee).skipCompanion), 1), F(K, { name: "arrow" })], 8, dl)])
    ], 64)) : (a(), J(Xt, {
      key: 2,
      onboarding: "",
      state: e.state,
      disabled: e.disabled,
      onAction: b[6] || (b[6] = (w, f) => s("action", w, f ?? {}))
    }, null, 8, ["state", "disabled"]))]));
  }
}), cl = vl, gl = { class: "learning-companion-control" }, pl = {
  key: 0,
  class: "learning-sr-only"
}, ml = { class: "learning-companion-options" }, bl = { class: "learning-companion-switch" }, fl = ["aria-label"], kl = { class: "learning-cost-note" }, yl = /* @__PURE__ */ ae({
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
    return (t, u) => (a(), i("details", gl, [n("summary", null, [
      n("span", {
        class: se(["learning-companion-light", { "is-on": c.value }]),
        "aria-hidden": "true"
      }, null, 2),
      Y(r(c.value ? e.name ? `${e.name} · ${s.on}` : s.on : s.title), 1),
      c.value ? p("", !0) : (a(), i("span", pl, r(s.off), 1))
    ]), n("div", ml, [n("label", bl, [n("span", null, r(s.description), 1), ne(n("input", {
      "onUpdate:modelValue": u[0] || (u[0] = (d) => c.value = d),
      type: "checkbox",
      role: "switch",
      "aria-label": s.title
    }, null, 8, fl), [[pa, c.value]])]), n("details", kl, [n("summary", null, r(s.costTitle), 1), n("small", null, r(s.cost), 1)])])]));
  }
}), ea = yl, st = {
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
}, hl = {
  context: "翻看学习资料",
  config: "连接 AI",
  session: "准备学习内容",
  summary: "整理之前聊过的内容",
  provider: "组织回复",
  tools: "整理学习内容",
  save: "保存学习内容",
  action: "准备学习内容"
};
function $l(e) {
  return `正在${hl[e.stage]}…`;
}
var $d = Object.freeze({
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
var wl = {
  class: "learning-complete",
  role: "status",
  "aria-live": "polite"
}, xl = {
  key: 0,
  class: "learning-complete-burst",
  "aria-hidden": "true"
}, Cl = { class: "learning-complete-title" }, Il = {
  key: 1,
  class: "learning-complete-amount"
}, Ll = ["disabled"], Sl = /* @__PURE__ */ ae({
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
    return (v, m) => (a(), i("section", wl, [
      e.quiet ? p("", !0) : (a(), i("div", xl, [(a(), i(E, null, H(8, (I) => n("span", {
        key: I,
        style: qt({ "--i": I })
      }, null, 4)), 64))])),
      n("p", Cl, r(e.label), 1),
      u.value?.rewardStatus !== "retired" ? (a(), i("p", Il, [n("strong", null, r(u.value?.rewardStatus === "paid" ? "+" : "") + r(u.value?.amount ?? e.amount), 1), m[1] || (m[1] = n("span", null, "小白币", -1))])) : p("", !0),
      n("small", null, r(d.value), 1),
      u.value && u.value.rewardStatus !== "paid" && u.value.rewardStatus !== "retired" ? (a(), i("button", {
        key: 2,
        type: "button",
        disabled: e.disabled || e.state.walletStorage !== "ready",
        onClick: m[0] || (m[0] = (I) => t("action", "reward", {
          unitId: e.unitId,
          openWallet: !e.state.walletOpen
        }))
      }, r(e.state.walletOpen ? l(ce).claim : l(ce).openWallet), 9, Ll)) : p("", !0)
    ]));
  }
}), ta = Sl, Al = ["aria-labelledby"], Rl = { id: "learning-grading-title" }, Ml = {
  key: 0,
  class: "learning-grading-actions"
}, El = {
  key: 0,
  class: "learning-annotation-missing",
  role: "status"
}, Tl = ["disabled"], Nl = ["disabled"], Bl = ["open", "onToggle"], Ol = {
  key: 0,
  class: "learning-revised-text"
}, ql = { class: "learning-write-saved" }, Pl = { key: 0 }, _l = {
  key: 1,
  class: "learning-graded-guidance"
}, Ul = ["onClick"], Vl = ["open", "onToggle"], Dl = { key: 0 }, jl = { key: 1 }, Wl = { key: 4 }, Gl = { class: "learning-graded-text" }, Fl = { class: "learning-annotation-fixed" }, Hl = {
  key: 0,
  class: "learning-annotation-missing"
}, zl = {
  key: 1,
  class: "learning-annotation-fixed"
}, Yl = ["onClick"], Kl = { class: "learning-annotation-tag" }, Zl = {
  key: 0,
  class: "learning-annotation-suggestion"
}, Jl = ["onSubmit"], Ql = ["onUpdate:modelValue", "aria-label"], Xl = ["disabled"], es = { key: 2 }, ts = ["onClick"], as = {
  key: 1,
  class: "learning-working",
  role: "status"
}, ns = ["disabled"], is = ["disabled"], ls = {
  key: 3,
  class: "learning-model-essay"
}, ss = /* @__PURE__ */ ae({
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
    }, m = {
      title: "看看哪里能写得更好",
      unplaced: "这处改动还没写进作文。请调整后再提交，或跳过修改。"
    }, I = (T) => T.itemId && (T.category === "grammar" || T.category === "vocabulary") ? v[T.category] : null, k = Ee(() => s.unit.id), h = C(() => k.value.edits), b = C(() => s.unit.stage.stage), w = C(() => new Map(s.unit.materials.flatMap((T) => T.paragraphs).map((T, M) => [T.id, M + 1]))), f = (T) => T?.answer.kind === "text" ? T.answer.text : "", $ = C(() => s.unit.stage.exercises.flatMap((T) => {
      const M = s.unit.exercises.find((q) => q.id === T.exerciseId), A = s.unit.attempts.find((q) => q.id === T.draftAttemptId);
      if (!M || !A) return [];
      const _ = s.unit.assessments.find((q) => q.attemptId === A.id), N = s.unit.attempts.find((q) => q.id === T.revisionAttemptId), O = N && s.unit.assessments.find((q) => q.attemptId === N.id), G = _?.annotations ?? [];
      return [{
        row: T,
        exercise: M,
        draft: A,
        assessment: _,
        revision: N,
        review: O,
        annotations: G,
        label: M.paragraphId ? `第 ${w.value.get(M.paragraphId) ?? "?"} 段总结` : "作文",
        paragraphs: Tt(f(A)).map((q, ye) => ({
          index: ye,
          segments: Zn(q, G.filter((be) => be.paragraphIndex === ye)),
          annotations: G.filter((be) => be.paragraphIndex === ye)
        })),
        resolved: new Set(O?.resolvedAnnotationIds ?? [])
      }];
    }).sort((T, M) => +(M.annotations.length > 0) - +(T.annotations.length > 0))), o = (T) => b.value === "revising" && T.row.status === "revising", x = (T, M) => o(T) && M.severity !== "alternative";
    Z($, (T) => {
      for (const M of T.flatMap((A) => A.annotations)) h.value[M.id] ??= {
        value: M.quote,
        done: !1
      };
    }, { immediate: !0 });
    function U(T) {
      const M = h.value[T.id];
      M?.value.trim() && M.value !== T.quote && (M.done = !0);
    }
    const R = C(() => new Map($.value.filter(o).map((T) => [T.draft.id, Kn(f(T.draft), T.annotations.map((M) => ({
      id: M.id,
      paragraphIndex: M.paragraphIndex,
      quote: M.quote,
      replacement: h.value[M.id]?.done ? h.value[M.id].value : M.quote
    })))]))), L = C(() => new Set([...R.value.values()].flatMap((T) => T.missing))), B = C(() => [...R.value.values()].reduce((T, M) => T + M.applied.length, 0)), W = z("");
    Z(B, () => {
      W.value = "";
    });
    const V = C(() => $.value.filter(o).flatMap((T) => T.annotations.filter((M) => M.severity !== "alternative")).length), D = (T, M) => {
      const A = T.annotations.find((_) => _.id === M);
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
      }) : W.value = m.unplaced;
    }
    const j = C(() => s.state.pending?.unitId === s.unit.id ? s.state.pending.purpose : null);
    return (T, M) => (a(), i("section", {
      class: "learning-grading",
      "aria-labelledby": e.view === "feedback" ? "learning-grading-title" : void 0
    }, [
      e.view === "feedback" ? (a(), i(E, { key: 0 }, [
        n("h2", Rl, r(m.title), 1),
        b.value === "revising" ? (a(), i("div", Ml, [
          n("small", null, "已改 " + r(B.value) + " / " + r(V.value) + " 处", 1),
          W.value ? (a(), i("small", El, r(W.value), 1)) : p("", !0),
          n("button", {
            type: "button",
            disabled: e.disabled,
            onClick: M[0] || (M[0] = (A) => t("confirm", "skip-revision", { unitId: e.unit.id }, "跳过这次修改？批注会保留，直接进入范文。"))
          }, "跳过修改", 8, Tl),
          n("button", {
            type: "button",
            class: "learning-primary",
            disabled: e.disabled || !B.value,
            onClick: P
          }, "提交修改", 8, Nl)
        ])) : p("", !0),
        (a(!0), i(E, null, H($.value, (A) => (a(), i("details", {
          key: A.exercise.id,
          class: "learning-graded",
          open: l(k).expanded[`grading:${A.draft.id}`] ?? A.annotations.length > 0,
          onToggle: (_) => l(k).expanded[`grading:${A.draft.id}`] = _.target.open
        }, [
          n("summary", null, [n("h3", null, r(A.label), 1)]),
          A.revision ? (a(), i("section", Ol, [
            n("h4", null, r(l(te).revision), 1),
            n("p", ql, r(f(A.revision)), 1),
            A.review?.guidance ? (a(), i("p", Pl, r(A.review.guidance), 1)) : p("", !0)
          ])) : p("", !0),
          A.assessment?.guidance ? (a(), i("p", _l, r(A.assessment.guidance), 1)) : p("", !0),
          A.assessment ? (a(), i("button", {
            key: 2,
            type: "button",
            onClick: (_) => t("ask", A.exercise.id)
          }, r(l(ee).askAssessment), 9, Ul)) : p("", !0),
          A.assessment && (A.assessment.understanding || A.assessment.expression) ? (a(), i("details", {
            key: 3,
            class: "learning-graded-more",
            open: l(k).expanded[`feedback:${A.draft.id}`],
            onToggle: (_) => l(k).expanded[`feedback:${A.draft.id}`] = _.target.open
          }, [
            M[6] || (M[6] = n("summary", null, "理解与表达点评", -1)),
            A.assessment.understanding ? (a(), i("p", Dl, [M[4] || (M[4] = n("b", null, "理解", -1)), Y(r(A.assessment.understanding), 1)])) : p("", !0),
            A.assessment.expression ? (a(), i("p", jl, [M[5] || (M[5] = n("b", null, "表达", -1)), Y(r(A.assessment.expression), 1)])) : p("", !0)
          ], 40, Vl)) : p("", !0),
          A.revision ? (a(), i("h4", Wl, r(l(te).original), 1)) : p("", !0),
          (a(!0), i(E, null, H(A.paragraphs, (_) => (a(), i("div", {
            key: _.index,
            class: "learning-graded-paragraph"
          }, [n("p", Gl, [(a(!0), i(E, null, H(_.segments, (N, O) => (a(), i(E, { key: O }, [N.id ? (a(), i("mark", {
            key: 0,
            class: se(D(A, N.id))
          }, r(N.text), 3)) : (a(), i(E, { key: 1 }, [Y(r(N.text), 1)], 64))], 64))), 128))]), (a(!0), i(E, null, H(_.annotations, (N) => (a(), i("div", {
            key: N.id,
            class: se(["learning-annotation", [`is-${N.severity}`, {
              "is-fixed": A.resolved.has(N.id),
              "is-edited": h.value[N.id]?.done && o(A)
            }]])
          }, [A.resolved.has(N.id) ? (a(), i(E, { key: 0 }, [n("p", Fl, "✓ " + r(l(te).resolved), 1), n("p", null, r(N.explanation), 1)], 64)) : h.value[N.id]?.done && o(A) ? (a(), i(E, { key: 1 }, [L.value.has(N.id) ? (a(), i("p", Hl, "原文里找不到“" + r(N.quote) + "”，这处改动不会写进修改稿。", 1)) : (a(), i("p", zl, "✓ 改为“" + r(h.value[N.id].value) + "”", 1)), n("button", {
            type: "button",
            onClick: (O) => h.value[N.id].done = !1
          }, "再改", 8, Yl)], 64)) : (a(), i(E, { key: 2 }, [
            n("p", Kl, [n("span", null, r(d[N.severity]), 1), Y(r(u[N.category]), 1)]),
            n("p", null, r(N.explanation), 1),
            N.suggestion ? (a(), i("p", Zl, "可以写成：" + r(N.suggestion), 1)) : p("", !0),
            x(A, N) && h.value[N.id] ? (a(), i("form", {
              key: 1,
              class: "learning-annotation-edit",
              onSubmit: ve((O) => U(N), ["prevent"])
            }, [ne(n("textarea", {
              "onUpdate:modelValue": (O) => h.value[N.id].value = O,
              rows: "2",
              "aria-label": `改写：${N.quote}`,
              maxlength: "600"
            }, null, 8, Ql), [[de, h.value[N.id].value], [l(Ze), h.value[N.id]]]), n("button", {
              type: "submit",
              disabled: !h.value[N.id].value.trim() || h.value[N.id].value === N.quote
            }, "改好了", 8, Xl)], 40, Jl)) : A.review && N.severity !== "alternative" ? (a(), i("small", es, "复核时这里还没改到")) : p("", !0)
          ], 64)), I(N) ? (a(), i("button", {
            key: 3,
            type: "button",
            class: "learning-annotation-book",
            onClick: (O) => t("record", N.itemId)
          }, r(I(N)) + " ↗", 9, ts)) : p("", !0)], 2))), 128))]))), 128))
        ], 40, Bl))), 128))
      ], 64)) : p("", !0),
      [
        "grading",
        "reviewing",
        "model"
      ].includes(b.value) ? (a(), i("div", as, [j.value ? (a(), i(E, { key: 0 }, [
        M[7] || (M[7] = n("span", {
          class: "learning-working-dot",
          "aria-hidden": "true"
        }, null, -1)),
        n("span", null, r(j.value === "grade" ? l(te).grading : j.value === "revision-review" ? l(te).reviewing : l(te).modelling), 1),
        n("button", {
          type: "button",
          disabled: e.pending,
          onClick: M[1] || (M[1] = (A) => t("action", "cancel"))
        }, r(l(te).stop), 9, ns)
      ], 64)) : (a(), i("button", {
        key: 1,
        type: "button",
        class: "learning-primary",
        disabled: e.disabled,
        onClick: M[2] || (M[2] = (A) => t("action", "grade", { unitId: e.unit.id }))
      }, r(b.value === "grading" ? l(te).grade : l(te).continue), 9, is))])) : p("", !0),
      e.view === "model" && b.value === "complete" ? (a(), J(ta, {
        key: 2,
        state: e.state,
        "unit-id": e.unit.id,
        amount: e.unit.reward.amount,
        label: "本篇完成",
        disabled: e.disabled,
        onAction: M[3] || (M[3] = (A, _) => t("action", A, _))
      }, null, 8, [
        "state",
        "unit-id",
        "amount",
        "disabled"
      ])) : p("", !0),
      e.view === "model" && e.unit.modelEssay ? (a(), i("section", ls, [n("h3", null, [M[8] || (M[8] = Y("范文", -1)), n("small", null, r(e.unit.modelEssay.level), 1)]), (a(!0), i(E, null, H(l(Tt)(e.unit.modelEssay.text), (A, _) => (a(), i("p", { key: _ }, r(A), 1))), 128))])) : p("", !0)
    ], 8, Al));
  }
}), rs = ss, os = ["data-exercise-id"], us = { class: "learning-write-label" }, ds = [
  "aria-label",
  "placeholder",
  "rows",
  "onKeydown"
], vs = { class: "learning-write-foot" }, cs = { "aria-live": "polite" }, gs = ["disabled"], ps = { class: "learning-write-saved" }, ms = { class: "learning-write-foot" }, bs = ["disabled"], fs = /* @__PURE__ */ ae({
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
    }), m = C({
      get: () => d.value.rewriting,
      set: (R) => {
        d.value.rewriting = R;
      }
    }), I = C(() => s.unit.attempts.filter((R) => R.exerciseId === s.exercise.id && R.revisesAttemptId === void 0).at(-1)), k = C(() => s.unit.assessments.some((R) => R.attemptId === I.value?.id && R.verdict !== "disputed")), h = C(() => I.value?.answer.kind === "text" ? I.value.answer.text : ""), b = C(() => !I.value || m.value), w = C(() => ["writing", "grading"].includes(s.unit.stage.stage) && !k.value && !s.state.pending), f = C(() => Rt(v.value, s.state.language)), $ = C(() => Rt(h.value, s.state.language)), o = C(() => s.state.workbenchConversation.summaryReviews.find((R) => R.attemptId === I.value?.id)?.text ?? "");
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
    function U() {
      v.value = h.value, m.value = !0;
    }
    return (R, L) => (a(), i("div", {
      class: se(["learning-write", `is-${e.tone ?? "summary"}`]),
      "data-exercise-id": e.exercise.id
    }, [
      n("p", us, r(e.label), 1),
      b.value ? (a(), i("form", {
        key: 0,
        onSubmit: ve(x, ["prevent"])
      }, [ne(n("textarea", {
        "onUpdate:modelValue": L[0] || (L[0] = (B) => v.value = B),
        "aria-label": e.label,
        placeholder: e.placeholder,
        maxlength: "4000",
        rows: e.tone === "essay" ? 8 : 3,
        onKeydown: [qe(ve(x, ["ctrl", "prevent"]), ["enter"]), qe(ve(x, ["meta", "prevent"]), ["enter"])]
      }, null, 40, ds), [[de, v.value], [l(Ze), d.value]]), n("div", vs, [
        n("small", cs, r(f.value.count) + " " + r(f.value.unit), 1),
        m.value ? (a(), i("button", {
          key: 0,
          type: "button",
          onClick: L[1] || (L[1] = (B) => {
            m.value = !1, v.value = "";
          })
        }, "取消")) : p("", !0),
        n("button", {
          type: "submit",
          class: "learning-primary",
          disabled: e.disabled || !v.value.trim()
        }, r(I.value ? "保存新稿" : "提交"), 9, gs)
      ])], 32)) : I.value ? (a(), i(E, { key: 1 }, [n("p", ps, r(h.value), 1), n("div", ms, [n("small", null, "已保存 · " + r($.value.count) + " " + r($.value.unit), 1), w.value ? (a(), i("button", {
        key: 0,
        type: "button",
        disabled: e.disabled,
        onClick: U
      }, "重写", 8, bs)) : p("", !0)])], 64)) : p("", !0),
      o.value ? (a(), J(dt, {
        key: 2,
        class: "learning-markdown learning-write-reply",
        text: o.value
      }, null, 8, ["text"])) : p("", !0)
    ], 10, os));
  }
}), aa = fs, le = {
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
}, ks = "用你的话概括这一段", ys = ["data-paragraph-id", "data-material-id"], hs = { class: "learning-reading-text" }, $s = {
  class: "learning-reading-number",
  "aria-hidden": "true"
}, ws = ["data-material-id", "data-paragraph-id"], xs = ["disabled"], Cs = ["open"], Is = { key: 0 }, Ls = { class: "learning-knowledge-text" }, Ss = {
  key: 0,
  class: "learning-terms"
}, As = [
  "disabled",
  "aria-pressed",
  "onClick"
], Rs = {
  key: 2,
  class: "learning-muted learning-knowledge-pending"
}, Ms = /* @__PURE__ */ ae({
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
    const s = e, t = c, u = C(() => s.unit.explanations.find((w) => w.materialId === s.materialId && w.paragraphId === s.paragraph.id)), d = C(() => s.unit.exercises.find((w) => w.paragraphId === s.paragraph.id)), v = C(() => new Set(s.state.savedTerms)), m = (w) => v.value.has(w), I = Ee(() => s.unit.id), k = C(() => `knowledge:${s.materialId}:${s.paragraph.id}`), h = C(() => I.value.selection?.materialId === s.materialId && I.value.selection.paragraphId === s.paragraph.id ? I.value.selection : null);
    function b() {
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
      n("p", hs, [n("span", $s, r(e.number), 1), n("span", {
        "data-learning-text": "",
        "data-material-id": e.materialId,
        "data-paragraph-id": e.paragraph.id
      }, r(e.paragraph.text), 9, ws)]),
      n("button", {
        type: "button",
        class: "learning-paragraph-quote",
        disabled: [...e.paragraph.text].length > l(Vt),
        onClick: b
      }, r(l(Be).select), 9, xs),
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
        n("summary", null, [f[5] || (f[5] = Y("本段知识", -1)), u.value.terms.length ? (a(), i("span", Is, " · " + r(u.value.terms.length) + " 个词语", 1)) : p("", !0)]),
        n("p", Ls, r(u.value.explanation), 1),
        u.value.terms.length ? (a(), i("ul", Ss, [(a(!0), i(E, null, H(u.value.terms, ($) => (a(), i("li", { key: $.text }, [n("span", null, [n("strong", null, r($.text), 1), n("small", null, r($.note), 1)]), n("button", {
          type: "button",
          disabled: e.disabled || m($.text),
          "aria-pressed": m($.text),
          onClick: (o) => t("action", "bookmark", {
            unitId: e.unit.id,
            materialId: e.materialId,
            paragraphId: e.paragraph.id,
            termText: $.text
          })
        }, r(m($.text) ? "已收藏" : "收藏"), 9, As)]))), 128))])) : p("", !0)
      ], 40, Cs)) : (a(), i("p", Rs, r(e.state.preparation?.running ? l(le).notes : l(le).missingNotes), 1)),
      d.value ? (a(), J(aa, {
        key: 3,
        state: e.state,
        unit: e.unit,
        exercise: d.value,
        disabled: e.disabled,
        label: l(ks),
        placeholder: "写下这段的大意，不必逐句翻译",
        onAction: f[4] || (f[4] = ($, o) => t("action", $, o))
      }, null, 8, [
        "state",
        "unit",
        "exercise",
        "disabled",
        "label"
      ])) : p("", !0)
    ], 8, ys));
  }
}), Es = Ms;
function Ts(e, c) {
  return e === "talk" || e === "retry-chat" ? c === "workbench" ? "workbench-talk" : "talk" : e;
}
var Ns = /* @__PURE__ */ new Set([
  "language",
  "teacher",
  "forget-conversation",
  "resume",
  "rate",
  "seek",
  "verify-teacher",
  "adopt-teacher"
]), Bs = /* @__PURE__ */ new Set([
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
]), Os = /* @__PURE__ */ new Set([
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
  return na.has(e) ? !1 : e === "talk" ? c.chatBusy : e === "workbench-talk" ? c.workbenchBusy : Ns.has(e) ? c.busy || c.chatBusy || c.workbenchBusy || !!c.preparation?.running : c.busy || !!c.preparation?.running && !Bs.has(e);
}
function $e(e, c) {
  return e === "talk" || e === "workbench-talk" ? !ot(e, c) && (e === "talk" ? c.chatStorage : c.workbenchStorage) === "ready" : !ot(e, c) && (na.has(e) || Os.has(e) || (e === "teacher" ? c.chatStorage === "ready" : c.storage === "ready"));
}
var qs = ["aria-label"], Ps = [
  "aria-current",
  "disabled",
  "onClick"
], _s = { class: "learning-reading-head" }, Us = ["open"], Vs = { key: 0 }, Ds = { class: "learning-source" }, js = ["href"], Ws = {
  key: 0,
  class: "learning-essay"
}, Gs = { class: "learning-essay-prompt" }, Fs = {
  key: 1,
  class: "learning-essay"
}, Hs = { class: "learning-muted" }, zs = ["aria-label"], Ys = ["aria-current"], Ks = {
  key: 2,
  class: "learning-stage-bar is-writing"
}, Zs = {
  key: 1,
  class: "learning-muted"
}, Js = {
  key: 3,
  class: "learning-stage-bar"
}, Qs = ["disabled"], Xs = ["disabled"], er = /* @__PURE__ */ ae({
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
    const v = C(() => s.unit.stage.stage), m = C(() => {
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
      L && (d.value.reading.scrolls[m.value] = L.scrollTop), d.value.reading.view = R, await re(), L && (L.scrollTop = d.value.reading.scrolls[R] ?? 0);
    }
    const h = [
      ["writing", "阅读与写作"],
      ["grading", "统一批改"],
      ["revising", "修改"],
      ["model", "范文"],
      ["complete", "完成"]
    ], b = C(() => ({
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
    function U(R) {
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
        "aria-current": m.value === B ? "page" : void 0,
        disabled: B === "model" && ![
          "reviewing",
          "model",
          "complete"
        ].includes(v.value),
        onClick: (W) => k(B)
      }, r(l(te)[B]), 9, Ps)), 64))], 8, qs)) : p("", !0),
      m.value === "reading" ? (a(), i(E, { key: 1 }, [
        n("header", _s, [n("details", {
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
          n("p", Ds, [B.material.provenance.kind === "authored" ? (a(), i(E, { key: 0 }, [Y(r($.authored), 1)], 64)) : (a(), i(E, { key: 1 }, [Y(r(B.material.provenance.kind === "adapted" ? $.adapted : $.original) + " ", 1), n("a", {
            href: B.material.provenance.url,
            target: "_blank",
            rel: "noopener noreferrer"
          }, r(B.material.provenance.title), 9, js)], 64))]),
          (a(!0), i(E, null, H(B.paragraphs, (V) => (a(), J(Es, {
            key: V.paragraph.id,
            state: e.state,
            unit: e.unit,
            "material-id": B.material.id,
            paragraph: V.paragraph,
            number: V.number,
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
        w.value ? (a(), i("section", Ws, [
          n("h2", null, r($.essay), 1),
          n("p", Gs, r(w.value.prompt), 1),
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
        ])) : (a(), i("section", Fs, [n("h2", null, r($.essay), 1), n("p", Hs, r(e.state.preparation?.running ? l(le).essay : l(le).missingEssay), 1)])),
        n("ol", {
          class: "learning-steps",
          "aria-label": $.progress
        }, [(a(), i(E, null, H(h, ([B, W], V) => n("li", {
          key: B,
          class: se({
            "is-done": V < b.value,
            "is-current": V === b.value
          }),
          "aria-current": V === b.value ? "step" : void 0
        }, r(W), 11, Ys)), 64))], 8, zs),
        v.value === "writing" ? (a(), i("div", Ks, [n("span", null, r($.written) + " " + r(e.unit.stage.exercises.length - f.value.length) + " / " + r(e.unit.stage.exercises.length), 1), f.value.length ? (a(), i("button", {
          key: 0,
          type: "button",
          onClick: L[2] || (L[2] = (B) => U(f.value[0]))
        }, r($.next), 1)) : (a(), i("span", Zs, r(e.unit.preparation.essay ? l(le).missingNotes : l(le).missingEssay), 1))])) : v.value === "grading" ? (a(), i("div", Js, [e.state.pending?.purpose === "grade" ? (a(), i(E, { key: 0 }, [
          L[10] || (L[10] = n("span", {
            class: "learning-working-dot",
            "aria-hidden": "true"
          }, null, -1)),
          n("span", null, r(l(te).grading), 1),
          n("button", {
            type: "button",
            disabled: e.pending,
            onClick: L[3] || (L[3] = (B) => t("action", "cancel"))
          }, r(l(te).stop), 9, Qs)
        ], 64)) : (a(), i(E, { key: 1 }, [n("span", null, r(l(te).gradeReady), 1), n("button", {
          type: "button",
          class: "learning-primary",
          disabled: e.disabled || !l($e)("grade", e.state),
          onClick: L[4] || (L[4] = (B) => t("action", "grade", { unitId: e.unit.id }))
        }, r(l(te).grade), 9, Xs)], 64))])) : (a(), i("button", {
          key: 4,
          type: "button",
          class: "learning-primary",
          onClick: L[5] || (L[5] = (B) => k("feedback"))
        }, r(l(te).feedback), 1))
      ], 64)) : (a(), J(rs, {
        key: 2,
        view: m.value,
        state: e.state,
        unit: e.unit,
        disabled: e.disabled || !l($e)("grade", e.state),
        pending: e.pending,
        onAsk: L[6] || (L[6] = (B) => t("assistant", B)),
        onAction: x,
        onConfirm: L[7] || (L[7] = (B, W, V) => t("confirm", B, W, V)),
        onRecord: L[8] || (L[8] = (B) => t("record", B))
      }, null, 8, [
        "view",
        "state",
        "unit",
        "disabled",
        "pending"
      ])),
      m.value === "feedback" && v.value === "complete" ? (a(), i("button", {
        key: 3,
        type: "button",
        class: "learning-primary",
        onClick: L[9] || (L[9] = (B) => k("model"))
      }, r(l(te).viewModel), 1)) : p("", !0)
    ], 512));
  }
}), tr = er, ar = ["data-learning-unit-id", "data-exercise-id"], nr = { class: "learning-review-head" }, ir = { class: "learning-muted" }, lr = ["disabled"], sr = {
  class: "learning-review-dots",
  "aria-label": "复习卡片"
}, rr = [
  "aria-label",
  "aria-current",
  "onClick"
], or = { class: "learning-eyebrow" }, ur = { class: "learning-card-verdict" }, dr = { key: 0 }, vr = { key: 1 }, cr = { key: 2 }, gr = { key: 1 }, pr = ["disabled"], mr = {
  key: 1,
  class: "learning-working",
  role: "status"
}, br = ["disabled"], fr = ["disabled"], kr = ["disabled"], yr = {
  key: 2,
  class: "learning-row"
}, hr = { class: "learning-review-results" }, $r = ["aria-current", "onClick"], wr = ["aria-expanded", "onClick"], xr = {
  key: 1,
  class: "learning-chip-reason"
}, Cr = /* @__PURE__ */ ae({
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
    const s = e, t = c, u = Se.verdicts, d = C(() => s.review.stage.stage), v = (A) => s.review.attempts.filter((_) => _.exerciseId === A).at(-1), m = () => Math.max(0, s.review.exercises.findIndex((A) => !v(A.id))), I = Ee(() => s.review.id), k = C(() => I.value.review), h = C({
      get: () => k.value.index ?? m(),
      set: (A) => {
        k.value.index = A;
      }
    }), b = C(() => s.review.exercises[h.value]), w = C(() => b.value && v(b.value.id)), f = C(() => s.review.assessments.find((A) => A.attemptId === w.value?.id)), $ = C(() => s.review.materials.flatMap((A) => A.paragraphs)), o = C(() => k.value.drafts);
    Z(b, (A) => {
      A && !o.value[A.id] && (o.value[A.id] = Ye(A.response));
    }, { immediate: !0 });
    const x = C({
      get: () => o.value[b.value.id],
      set: (A) => {
        o.value[b.value.id] = A;
      }
    }), U = C(() => s.review.exercises.filter((A) => v(A.id)).length), R = C({
      get: () => k.value.openReason,
      set: (A) => {
        k.value.openReason = A;
      }
    });
    function L(A) {
      t("action", "submit", {
        unitId: s.review.id,
        exerciseId: b.value.id,
        answer: A
      });
    }
    function B() {
      const A = s.review.exercises.findIndex((_) => !v(_.id));
      A >= 0 && (h.value = A);
    }
    function W(A) {
      h.value = A, j.value = !0;
    }
    const V = C(() => s.state.completions.find((A) => A.unitId === s.review.id)), D = C(() => V.value?.rewardStatus === "paid" || V.value?.rewardStatus === "retired");
    Z(k, (A) => {
      A.seenBefore ??= d.value === "complete" && Mt.has(s.review.id);
    }, { immediate: !0 });
    const P = C(() => k.value.seenBefore ?? !1), j = C({
      get: () => k.value.expanded,
      set: (A) => {
        k.value.expanded = A;
      }
    });
    Z([d, () => s.review.id], ([A, _]) => {
      A === "complete" && Mt.mark(_);
    }, { immediate: !0 });
    const T = C(() => P.value && D.value && !j.value), M = (A) => [...s.state.books.grammar, ...s.state.books.vocabulary].find((_) => _.id === A);
    return (A, _) => (a(), i("section", {
      class: "learning-review",
      "data-learning-unit-id": e.review.id,
      "data-exercise-id": b.value?.id,
      "aria-labelledby": "learning-review-title"
    }, [
      n("header", nr, [
        _[8] || (_[8] = n("h2", { id: "learning-review-title" }, "今日复习", -1)),
        n("span", ir, r(U.value) + " / " + r(e.review.exercises.length), 1),
        d.value === "answering" ? (a(), i("button", {
          key: 0,
          type: "button",
          disabled: e.disabled || !l($e)("abandon-review", e.state),
          onClick: _[0] || (_[0] = (N) => t("confirm", "abandon-review", {}, l(he).review))
        }, "放下", 8, lr)) : p("", !0)
      ]),
      n("nav", sr, [(a(!0), i(E, null, H(e.review.exercises, (N, O) => (a(), i("button", {
        key: N.id,
        type: "button",
        "aria-label": `第 ${O + 1} 张`,
        "aria-current": O === h.value,
        class: se({ "is-answered": !!v(N.id) }),
        onClick: (G) => W(O)
      }, null, 10, rr))), 128))]),
      b.value && !T.value ? (a(), i("div", {
        key: `${b.value.id}:${w.value ? "back" : "front"}`,
        class: se(["learning-card", { "is-back": !!w.value }])
      }, [
        n("p", or, r(w.value ? l(Se).answer : `第 ${h.value + 1} 张`), 1),
        n("h3", null, r(b.value.prompt), 1),
        w.value ? (a(), i(E, { key: 1 }, [
          n("blockquote", null, r(l(vt)(w.value.answer, b.value.response, $.value)), 1),
          f.value ? (a(), i(E, { key: 0 }, [
            n("p", ur, r(l(u)[f.value.verdict]), 1),
            f.value.understanding ? (a(), i("p", dr, r(f.value.understanding), 1)) : p("", !0),
            f.value.expression ? (a(), i("p", vr, r(f.value.expression), 1)) : p("", !0),
            f.value.guidance ? (a(), i("p", cr, r(f.value.guidance), 1)) : p("", !0)
          ], 64)) : (a(), i("small", gr, r(l(Se).saved), 1)),
          U.value < e.review.exercises.length ? (a(), i("button", {
            key: 2,
            type: "button",
            class: "learning-primary",
            onClick: B
          }, "下一张")) : p("", !0)
        ], 64)) : (a(), J(Ut, {
          key: 0,
          modelValue: x.value,
          "onUpdate:modelValue": _[1] || (_[1] = (N) => x.value = N),
          response: b.value.response,
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
          onClick: _[2] || (_[2] = (N) => t("ask", b.value.id, e.review.id))
        }, r(l(Se).ask), 9, pr)
      ], 2)) : p("", !0),
      d.value === "grading" ? (a(), i("div", mr, [e.state.pending?.purpose === "review-assess" ? (a(), i(E, { key: 0 }, [
        _[9] || (_[9] = n("span", {
          class: "learning-working-dot",
          "aria-hidden": "true"
        }, null, -1)),
        _[10] || (_[10] = n("span", null, "正在批改这组复习…", -1)),
        n("button", {
          type: "button",
          disabled: e.pending,
          onClick: _[3] || (_[3] = (N) => t("action", "cancel"))
        }, "停止", 8, br)
      ], 64)) : (a(), i(E, { key: 1 }, [
        n("span", null, r(l(Se).ready), 1),
        n("button", {
          type: "button",
          disabled: e.disabled || !l($e)("abandon-review", e.state),
          onClick: _[4] || (_[4] = (N) => t("confirm", "abandon-review", {}, l(he).review))
        }, "放下", 8, fr),
        n("button", {
          type: "button",
          disabled: e.disabled || !l($e)("grade", e.state),
          onClick: _[5] || (_[5] = (N) => t("action", "grade", { unitId: e.review.id }))
        }, r(l(Se).grade), 9, kr)
      ], 64))])) : p("", !0),
      d.value === "complete" && T.value ? (a(), i("div", yr, [_[11] || (_[11] = n("span", { class: "learning-muted" }, "这组复习已完成", -1)), n("button", {
        type: "button",
        "aria-expanded": !1,
        onClick: _[6] || (_[6] = (N) => j.value = !0)
      }, "查看结果")])) : d.value === "complete" ? (a(), i(E, { key: 3 }, [n("ul", hr, [(a(!0), i(E, null, H(e.review.exercises, (N, O) => (a(), i("li", { key: N.id }, [
        n("button", {
          type: "button",
          class: "learning-review-result",
          "aria-current": O === h.value,
          onClick: (G) => W(O)
        }, [n("strong", null, r(M(N.itemId)?.label ?? N.prompt), 1), n("small", null, r(l(u)[e.review.assessments.find((G) => G.attemptId === v(N.id)?.id)?.verdict ?? "disputed"]), 1)], 8, $r),
        M(N.itemId)?.nextReviewAt ? (a(), i("button", {
          key: 0,
          type: "button",
          class: "learning-chip",
          "aria-expanded": R.value === N.id,
          onClick: (G) => R.value = R.value === N.id ? "" : N.id
        }, r(l(ct)(M(N.itemId).nextReviewAt)), 9, wr)) : p("", !0),
        R.value === N.id ? (a(), i("small", xr, r(M(N.itemId)?.scheduleReason), 1)) : p("", !0)
      ]))), 128))]), F(ta, {
        state: e.state,
        "unit-id": e.review.id,
        amount: e.review.reward.amount,
        label: "复习完成",
        disabled: e.disabled,
        quiet: P.value,
        onAction: _[7] || (_[7] = (N, O) => t("action", N, O))
      }, null, 8, [
        "state",
        "unit-id",
        "amount",
        "disabled",
        "quiet"
      ])], 64)) : p("", !0)
    ], 8, ar));
  }
}), Ir = Cr, Lr = {
  key: 0,
  class: "learning-source-choice",
  "aria-live": "polite"
}, Sr = { class: "learning-row" }, Ar = ["disabled"], Rr = ["disabled"], Mr = ["disabled"], Er = ["disabled"], Tr = ["disabled"], Nr = {
  key: 1,
  class: "learning-preparation",
  "aria-live": "polite"
}, Br = {
  key: 0,
  class: "learning-turn-notice"
}, Or = { class: "learning-row" }, qr = ["disabled"], Pr = /* @__PURE__ */ ae({
  __name: "LearningPreparation",
  props: {
    state: {},
    disabled: { type: Boolean },
    pending: { type: Boolean }
  },
  emits: ["action"],
  setup(e, { emit: c }) {
    const s = c;
    return (t, u) => e.state.sourceChoice ? (a(), i("section", Lr, [
      n("p", null, r(e.state.sourceChoice === "unconfigured" ? l(le).noWeb : e.state.preparation?.message || l(le).unavailable), 1),
      n("div", Sr, [
        e.state.sourceChoice === "unavailable" ? (a(), i("button", {
          key: 0,
          type: "button",
          class: "learning-primary",
          disabled: e.disabled,
          onClick: u[0] || (u[0] = (d) => s("action", "retry-source"))
        }, r(l(le).retry), 9, Ar)) : (a(), i("button", {
          key: 1,
          type: "button",
          class: "learning-primary",
          disabled: e.pending,
          onClick: u[1] || (u[1] = (d) => s("action", "research-settings"))
        }, r(l(le).settings), 9, Rr)),
        e.state.preparation?.source !== "authored" ? (a(), i("button", {
          key: 2,
          type: "button",
          disabled: e.disabled,
          onClick: u[2] || (u[2] = (d) => s("action", "choose-original"))
        }, r(l(le).original), 9, Mr)) : p("", !0),
        n("button", {
          type: "button",
          disabled: e.pending,
          onClick: u[3] || (u[3] = (d) => s("action", "dismiss-source"))
        }, r(e.state.unit ? l(le).existing : l(le).dismiss), 9, Er)
      ]),
      e.state.sourceChoice === "unavailable" && e.state.preparation?.source !== "authored" ? (a(), i("button", {
        key: 0,
        type: "button",
        disabled: e.pending,
        onClick: u[4] || (u[4] = (d) => s("action", "research-settings"))
      }, r(l(le).settings), 9, Tr)) : p("", !0)
    ])) : !e.state.preparation?.running && (e.state.preparation || e.state.unit?.kind === "reading-writing" && !e.state.unit.preparation.ready) ? (a(), i("section", Nr, [e.state.preparation?.message ? (a(), i("p", Br, r(e.state.preparation.message), 1)) : p("", !0), n("div", Or, [e.state.unit?.kind === "reading-writing" && !e.state.unit.preparation.ready ? (a(), i("button", {
      key: 0,
      type: "button",
      disabled: e.disabled,
      onClick: u[5] || (u[5] = (d) => s("action", "resume-preparation", { unitId: e.state.unit.id }))
    }, r(l(le).resume), 9, qr)) : p("", !0)])])) : p("", !0);
  }
}), ut = Pr, _r = { class: "learning-workbench" }, Ur = {
  key: 1,
  class: "learning-due"
}, Vr = {
  key: 0,
  class: "learning-working",
  role: "status"
}, Dr = ["disabled"], jr = ["disabled"], Wr = {
  key: 2,
  class: "learning-row"
}, Gr = ["disabled"], Fr = ["data-learning-unit-id"], Hr = { class: "learning-eyebrow" }, zr = { tabindex: "-1" }, Yr = {
  key: 0,
  class: "learning-muted"
}, Kr = ["onClick"], Zr = ["onClick"], Jr = { class: "learning-row" }, Qr = ["disabled"], Xr = {
  key: 6,
  class: "learning-start"
}, eo = ["disabled"], to = {
  key: 0,
  tabindex: "-1"
}, ao = { key: 1 }, no = ["aria-label"], io = { class: "learning-start-reading" }, lo = ["disabled"], so = ["disabled"], ro = /* @__PURE__ */ ae({
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
    const s = e, t = ($) => s.disabled || !$e($, s.state), u = c, d = C(() => !!s.state.review && s.state.review.stage.stage !== "complete"), v = C(() => s.state.unit), m = C(() => !v.value || s.state.completions.some(($) => $.unitId === v.value?.id)), I = C(() => s.state.busy && !s.state.pending), k = {
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
    function b($) {
      u("action", "prepare", {
        kind: $,
        message: $ === "reading-writing" ? "请按我的训练设置准备一篇读写训练。" : "请按我现在的情况准备一节专项小课。"
      });
    }
    const w = ($, o) => u("action", $, o), f = ($, o, x) => u("confirm", $, o, x);
    return ($, o) => (a(), i("div", _r, [
      !e.preparationInProcess && (!e.state.sourceChoice || !m.value) ? (a(), J(ut, {
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
        }, "停止", 8, Dr)
      ])) : e.state.blockedReview ? p("", !0) : (a(), i("button", {
        key: 1,
        type: "button",
        class: "learning-primary",
        disabled: t("start-review"),
        onClick: o[1] || (o[1] = (x) => u("action", "start-review"))
      }, r(k.review), 9, jr))])) : p("", !0),
      e.state.blockedReview ? (a(), i("div", Wr, [o[15] || (o[15] = n("p", { class: "learning-muted" }, "有一组复习在另一个故事中进行。回到那个故事可以接着做；也可以放下它，在这里重新出题。", -1)), n("button", {
        type: "button",
        disabled: t("abandon-review"),
        onClick: o[2] || (o[2] = (x) => f("abandon-review", {}, l(he).review))
      }, "放下", 8, Gr)])) : p("", !0),
      e.state.review ? (a(), J(Ir, {
        key: 3,
        state: e.state,
        review: e.state.review,
        disabled: e.disabled,
        pending: e.pending,
        onAction: w,
        onConfirm: f,
        onAsk: o[3] || (o[3] = (x, U) => u("ask", x, void 0, U))
      }, null, 8, [
        "state",
        "review",
        "disabled",
        "pending"
      ])) : p("", !0),
      v.value?.kind === "reading-writing" ? (a(), J(tr, {
        key: 4,
        "data-learning-unit-id": v.value.id,
        state: e.state,
        unit: v.value,
        disabled: e.disabled,
        pending: e.pending,
        onAction: w,
        onConfirm: f,
        onAsk: o[4] || (o[4] = (x, U) => u("ask", x, U, v.value.id)),
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
        n("p", Hr, "专项小课 · 完成可得 " + r(v.value.reward.amount) + " 小白币", 1),
        n("h1", zr, r(v.value.title), 1),
        v.value.goal ? (a(), i("p", Yr, r(v.value.goal), 1)) : p("", !0),
        (a(!0), i(E, null, H(v.value.materials, (x) => (a(), i("button", {
          key: x.id,
          type: "button",
          class: "learning-activity-link",
          onClick: (U) => u("present", {
            unitId: v.value.id,
            kind: "material",
            id: x.id,
            title: x.title
          })
        }, [
          F(K, { name: "book" }),
          n("span", null, r(x.title), 1),
          F(K, { name: "arrow" })
        ], 8, Kr))), 128)),
        (a(!0), i(E, null, H(v.value.exercises, (x) => (a(), i("button", {
          key: x.id,
          type: "button",
          class: "learning-activity-link",
          onClick: (U) => u("present", {
            unitId: v.value.id,
            kind: "exercise",
            id: x.id,
            title: x.prompt
          })
        }, [
          F(K, { name: v.value.stage.exercises.find((U) => U.exerciseId === x.id)?.status === "done" ? "check" : "records" }, null, 8, ["name"]),
          n("span", null, r(x.prompt), 1),
          F(K, { name: "arrow" })
        ], 8, Zr))), 128)),
        n("div", Jr, [n("button", {
          type: "button",
          disabled: t("complete"),
          onClick: o[7] || (o[7] = (x) => u("action", "complete"))
        }, r(k.complete), 9, Qr), n("button", {
          type: "button",
          onClick: o[8] || (o[8] = (x) => u("go", "materials"))
        }, r(k.notes), 1)])
      ], 8, Fr)) : p("", !0),
      m.value ? (a(), i("section", Xr, [e.state.blockedUnit ? (a(), i(E, { key: 0 }, [
        o[16] || (o[16] = n("h1", { tabindex: "-1" }, "当前课件在另一个故事中", -1)),
        o[17] || (o[17] = n("p", { class: "learning-muted" }, "回到那个故事可以继续；也可以放下它，在这里重新开始。", -1)),
        n("button", {
          type: "button",
          disabled: t("abandon"),
          onClick: o[9] || (o[9] = (x) => f("abandon", {}, l(he).lesson))
        }, "放下并重新开始", 8, eo)
      ], 64)) : (a(), i(E, { key: 1 }, [
        v.value ? (a(), i("h2", ao, r(k.next), 1)) : (a(), i("h1", to, r(k.reading), 1)),
        v.value ? p("", !0) : (a(), i("button", {
          key: 2,
          type: "button",
          class: "learning-start-preference",
          "aria-label": `${k.settings}：${h.value}`,
          onClick: o[10] || (o[10] = (x) => u("go", "settings"))
        }, [n("span", null, [n("strong", null, r(k.settings), 1), n("small", null, r(h.value), 1)]), F(K, { name: "arrow" })], 8, no)),
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
        !I.value && !e.state.sourceChoice ? (a(), i(E, { key: 4 }, [n("section", io, [
          F(K, { name: "workbook" }),
          n("p", null, r(k.readingHint), 1),
          n("button", {
            type: "button",
            class: "learning-primary",
            disabled: t("prepare"),
            onClick: o[11] || (o[11] = (x) => b("reading-writing"))
          }, [Y(r(k.start), 1), F(K, { name: "arrow" })], 8, lo)
        ]), n("button", {
          type: "button",
          class: "learning-start-secondary",
          disabled: t("prepare"),
          onClick: o[12] || (o[12] = (x) => b("lesson"))
        }, [
          F(K, { name: "records" }),
          n("span", null, [n("strong", null, r(k.lesson), 1), n("small", null, r(k.lessonHint), 1)]),
          F(K, { name: "arrow" })
        ], 8, so)], 64)) : p("", !0)
      ], 64))])) : p("", !0)
    ]));
  }
}), oo = ro;
function Nt(e) {
  try {
    return JSON.parse(e);
  } catch {
    return {};
  }
}
function uo(e) {
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
      const v = t.find((h) => h.toolCallId === d.id), m = Nt(v?.content ?? ""), I = e.status === "running", k = v?.error || m.ok === !1 ? "failed" : v?.content && !v.streaming ? "done" : !I || s.error ? v ? "cancelled" : "not-run" : v?.streaming ? "running" : "preparing";
      return {
        id: d.id,
        name: d.name,
        status: k,
        input: Nt(d.arguments),
        result: m
      };
    })
  }));
}
var vo = {
  invalid_arguments: "这次没能正确选择或读取文章来源，可以重试准备。",
  learning_search_failed: "暂时连不上搜索服务，请检查联网取材设置后重试。",
  learning_search_timeout: "搜索文章等了太久，可以重试或先读原创文章。",
  learning_search_not_configured: "还没连接联网取材，请先设置，或改读原创文章。",
  learning_extract_http_failed: "联网服务没能读取正文，请检查联网取材设置后重试。",
  learning_extract_timeout: "读取正文等了太久，可以重试或改读原创文章。",
  learning_extract_failed: "读取正文时连接中断，请检查联网取材连接后重试。",
  learning_extract_invalid_response: "联网服务返回的内容无法作为正文读取，可以重试或改读原创文章。",
  learning_source_unavailable: "这个网页没有读到可用正文，可以换一个来源或改读原创文章。",
  learning_source_incomplete: "这个网页取回的文字太少，还不够准备整篇读写练习，需要换一个来源。",
  learning_article_incomplete: "这次整理的文章太短，还不够做整篇读写练习，尚未保存。",
  learning_source_too_large: "这个网页内容太多，未能读入。可以换一个来源或改读原创文章。",
  learning_research_failed: "这次联网取材没有完成，可以重试或改读原创文章。"
};
function co(e, c) {
  if (e === "learning_extract_http_failed" || e === "learning_search_failed") {
    if (c === 401) return "联网取材的验证没有通过，请检查联网密钥是否有效。";
    if (c === 403) return "联网服务拒绝了这次请求，请检查账号或接口权限；不一定是密钥填错。";
    if (c === 404 || c === 405) return e === "learning_extract_http_failed" ? "当前联网地址不支持读取正文，请检查联网取材地址，或改读原创文章。" : "当前联网地址不支持搜索，请检查联网取材地址，或改读原创文章。";
    if (c === 429) return "联网服务暂时限制了请求，请稍后重试，并检查剩余额度。";
    if (c && c >= 500) return "联网服务暂时不可用，请稍后重试，或先读原创文章。";
  }
  return vo[e];
}
var go = ["aria-label"], po = { class: "learning-process-header" }, mo = ["aria-expanded"], bo = { "aria-hidden": "true" }, fo = ["disabled", "aria-label"], ko = ["aria-label"], yo = ["data-status"], ho = {
  class: "learning-process-dot",
  "aria-hidden": "true"
}, $o = { key: 0 }, wo = { class: "learning-process-result" }, xo = {
  key: 1,
  class: "learning-process-status",
  role: "status",
  "aria-live": "polite"
}, Co = {
  key: 0,
  class: "learning-working-dot",
  "aria-hidden": "true"
}, Io = {
  key: 2,
  class: "learning-process-recovery"
}, Lo = /* @__PURE__ */ ae({
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
    const s = e, t = c, u = C(() => uo(s.turn)), d = C(() => u.value.flatMap((o) => o.tools)), v = C(() => s.turn.status === "running"), m = C(() => le.taskTitles[s.turn.purpose]), I = z(null), k = ca(), h = C(() => I.value ?? (v.value || s.turn.status === "failed" || !!k.default)), b = z(null), w = C(() => s.turn.progress?.round ?? u.value.at(-1)?.index), f = C(() => {
      if (!v.value) return X.outcomes[s.turn.status];
      const o = u.value.at(-1), x = o?.tools.find((U) => U.status === "running" || U.status === "preparing");
      if (x) return `${X.tools[x.name] ?? X.unknownTool} · ${X[x.status]}`;
      if (s.turn.progress?.stage === "provider" && o?.streaming) {
        if (o.receivedChars) return X.received(o.receivedChars);
        if (o.thinking) return X.thinking;
      }
      return $l(s.turn.progress ?? { stage: "provider" });
    });
    function $(o) {
      const x = [];
      o.result.error && x.push(co(o.result.error, o.result.httpStatus));
      const U = o.result.section ?? o.input.section;
      U && X.sections[U] && x.push(X.sections[U]), o.result.resultsCount !== void 0 && (!o.result.error || o.result.resultsCount > 0) && x.push(o.name === "LearningExtract" ? X.extracted(o.result.resultsCount) : X.results(o.result.resultsCount)), o.result.paragraphCount !== void 0 && x.push(X.paragraphs(o.result.paragraphCount)), o.result.dataCount !== void 0 && x.push(X.entries(o.result.dataCount)), o.result.failedCount && (!o.result.error || o.result.failedCount > 1) && x.push(X.sourcesFailed(o.result.failedCount)), o.name === "LearningLessonEdit" && (o.input.materialsCount && x.push(X.proposedMaterials(o.input.materialsCount)), o.input.exercisesCount && x.push(X.proposedExercises(o.input.exercisesCount))), o.result.errorsCount && x.push(X.issues(o.result.errorsCount));
      const R = (o.result.errorFields ?? []).map((L) => gn[L]).filter(Boolean);
      return R.length && x.push(X.checkFields([...new Set(R)].join("、"))), x.join(" · ");
    }
    return Z(v, () => {
      I.value = null;
    }), Z(() => s.turn.messages, async () => {
      const o = b.value, x = !o || o.scrollHeight - o.scrollTop - o.clientHeight < 48;
      await re(), x && b.value && (b.value.scrollTop = b.value.scrollHeight);
    }), (o, x) => v.value || d.value.length || o.$slots.default ? (a(), i("section", {
      key: 0,
      class: se(["learning-process", { "is-running": v.value }]),
      "aria-label": l(X).title
    }, [
      n("header", po, [n("button", {
        type: "button",
        class: "learning-process-toggle",
        "aria-expanded": h.value,
        onClick: x[0] || (x[0] = (U) => I.value = !h.value)
      }, [
        n("span", bo, r(h.value ? "⌄" : "›"), 1),
        n("strong", null, r(m.value ?? l(X).title), 1),
        n("small", null, r(v.value && w.value ? l(X).round(w.value) : l(X).history(d.value.length)), 1)
      ], 8, mo), v.value && e.stoppable ? (a(), i("button", {
        key: 0,
        type: "button",
        class: "learning-process-stop",
        disabled: e.disabled,
        "aria-label": l(X).stop,
        onClick: x[1] || (x[1] = (U) => t("stop"))
      }, "■", 8, fo)) : p("", !0)]),
      h.value ? (a(), i("div", {
        key: 0,
        ref_key: "body",
        ref: b,
        class: "learning-process-body"
      }, [(a(!0), i(E, null, H(u.value, (U) => (a(), i(E, { key: U.index }, [U.text ? (a(), J(dt, {
        key: 0,
        class: "learning-markdown learning-process-narration",
        text: U.text
      }, null, 8, ["text"])) : p("", !0), U.tools.length ? (a(), i("ol", {
        key: 1,
        class: "learning-process-steps",
        "aria-label": l(X).round(U.index)
      }, [(a(!0), i(E, null, H(U.tools, (R) => (a(), i("li", {
        key: R.id,
        "data-status": R.status
      }, [
        n("span", ho, r(R.status === "done" ? "✓" : R.status === "failed" ? "!" : "·"), 1),
        n("div", null, [n("span", null, r(l(X).tools[R.name] ?? l(X).unknownTool), 1), $(R) ? (a(), i("small", $o, r($(R)), 1)) : p("", !0)]),
        n("small", wo, r(l(X)[R.status]), 1)
      ], 8, yo))), 128))], 8, ko)) : p("", !0)], 64))), 128))], 512)) : p("", !0),
      v.value || !o.$slots.default && e.turn.status === "finished" && (!m.value || h.value) ? (a(), i("p", xo, [v.value ? (a(), i("span", Co)) : p("", !0), Y(r(f.value), 1)])) : p("", !0),
      o.$slots.default ? (a(), i("div", Io, [ka(o.$slots, "default")])) : p("", !0)
    ], 10, go)) : p("", !0);
  }
}), ia = Lo;
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
}, So = { class: "learning-messages" }, Ao = /* @__PURE__ */ ae({
  __name: "LearningMessages",
  props: {
    turn: {},
    disabled: { type: Boolean }
  },
  emits: ["stop"],
  setup(e, { emit: c }) {
    const s = e, t = c, u = C(() => s.turn.messages.filter((d) => d.role === "assistant" && !d.toolCalls?.length && d.content));
    return (d, v) => (a(), i("div", So, [F(ia, {
      turn: e.turn,
      stoppable: "",
      disabled: e.disabled,
      onStop: v[0] || (v[0] = (m) => t("stop"))
    }, null, 8, ["turn", "disabled"]), (a(!0), i(E, null, H(u.value, (m, I) => (a(), i("div", {
      key: I,
      class: se(["learning-output", { "is-streaming": m.streaming }])
    }, [F(dt, {
      class: "learning-markdown",
      text: m.content
    }, null, 8, ["text"])], 2))), 128))]));
  }
}), Ro = Ao, Mo = { class: "learning-conversation" }, Eo = { class: "learning-conversation-heading" }, To = {
  class: "learning-person-initial",
  "aria-hidden": "true"
}, No = ["disabled"], Bo = ["aria-label"], Oo = ["aria-label"], qo = {
  key: 0,
  class: "learning-history-notice"
}, Po = {
  key: 0,
  class: "learning-conversation-user"
}, _o = {
  key: 1,
  class: "learning-turn-recovery"
}, Uo = ["disabled", "onClick"], Vo = ["disabled", "onClick"], Do = {
  key: 3,
  class: "learning-conversation-tools"
}, jo = ["disabled"], Wo = ["disabled"], Go = {
  key: 1,
  class: "learning-working",
  role: "status"
}, Fo = {
  key: 2,
  class: "learning-turn-notice is-error",
  role: "status"
}, Ho = {
  key: 3,
  class: "learning-conversation-empty"
}, zo = ["disabled"], Yo = { class: "learning-composer-surface" }, Ko = {
  key: 0,
  class: "learning-composer-quote"
}, Zo = { class: "learning-composer-row" }, Jo = [
  "disabled",
  "maxlength",
  "aria-label",
  "placeholder"
], Qo = [
  "type",
  "disabled",
  "aria-label",
  "title"
], Xo = /* @__PURE__ */ ae({
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
    const t = e, u = C(() => t.target === "workbench" ? t.state.workbenchConversation : t.state.conversation), d = C(() => t.target === "workbench" ? t.state.workbenchBusy : t.state.chatBusy), v = C(() => t.target === "workbench" ? t.state.workbenchMessage : t.state.chatMessage), m = C(() => t.target === "workbench" ? t.state.workbenchStorage : t.state.chatStorage), I = C(() => t.target === "workbench" ? t.state.reply : t.state.companionReply), k = C(() => t.target === "workbench" ? ee.assistant : t.state.teacher?.name ?? "语伴"), h = C(() => u.value.turns.map((O, G) => ({
      turn: O,
      index: G
    })).filter(({ turn: O }) => !fe({ kind: O.purpose ?? "talk" }) || O.status === "running")), b = {
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
    }), U = ke(o, "text"), R = z(null), L = z(null), B = z(null), W = ke(o, "focus");
    let V = null, D = 0;
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
    Z(U, T, { flush: "post" }), Z(R, (O) => {
      if (V?.disconnect(), cancelAnimationFrame(D), !O) return;
      let G = 0;
      V = new ResizeObserver(([q]) => {
        q.contentRect.width !== G && (G = q.contentRect.width, cancelAnimationFrame(D), D = requestAnimationFrame(T));
      }), V.observe(O.parentElement);
    }, { flush: "post" }), Ae(() => {
      B.value && (B.value.scrollTop = o.scroll), j();
    }), Re(() => {
      B.value && (o.scroll = B.value.scrollTop), V?.disconnect(), cancelAnimationFrame(D);
    });
    function M() {
      if (t.disabled || !U.value.trim()) return;
      const O = U.value.trim();
      o.sent = {
        text: U.value,
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
    function _(O) {
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
    }), (O, G) => (a(), i("section", Mo, [
      n("header", Eo, [
        n("span", To, r(e.target === "workbench" ? "a" : [...k.value][0]), 1),
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
        }, r(new Intl.DisplayNames(["zh-CN"], { type: "language" }).of(e.state.language)), 9, No)) : (a(), i("button", {
          key: 1,
          type: "button",
          "aria-label": l(ee).closeAssistant,
          onClick: G[1] || (G[1] = (q) => f("close"))
        }, [F(K, { name: "close" })], 8, Bo))
      ]),
      n("div", {
        ref_key: "scroller",
        ref: B,
        class: "learning-conversation-turns",
        "aria-label": e.target === "workbench" ? l(ee).assistant : b.conversation,
        onScroll: P
      }, [
        u.value.removedTurns ? (a(), i("p", qo, r(b.history), 1)) : p("", !0),
        (a(!0), i(E, null, H(h.value, ({ turn: q, index: ye }, be) => (a(), i("div", {
          key: u.value.removedTurns + ye,
          class: "learning-conversation-turn"
        }, [
          q.user && !l(w).has(q.purpose) && !l(fe)({ kind: q.purpose ?? "talk" }) ? (a(), i("p", Po, r(q.user), 1)) : p("", !0),
          F(Ro, {
            turn: q,
            disabled: e.pending,
            onStop: (ge) => x(l(Ke)({ kind: q.purpose ?? "talk" }) ? "cancel-chat" : l(fe)({ kind: q.purpose ?? "talk" }) ? "cancel-preparation" : "cancel")
          }, null, 8, [
            "turn",
            "disabled",
            "onStop"
          ]),
          l(Oe)(q, m.value, e.state.storage) || q.retryable ? (a(), i("div", _o, [l(Oe)(q, m.value, e.state.storage) ? (a(), i("p", {
            key: 0,
            class: se(["learning-turn-notice", { "is-error": q.status === "failed" }]),
            role: "status"
          }, r(l(Oe)(q, m.value, e.state.storage)), 3)) : p("", !0), q.retryable ? (a(), i("button", {
            key: 1,
            type: "button",
            disabled: e.disabled || e.pending,
            onClick: (ge) => x("retry-chat", { id: q.id })
          }, r(l(ee).retry), 9, Uo)) : p("", !0)])) : p("", !0),
          q.presentation ? (a(), i("button", {
            key: 2,
            type: "button",
            class: "learning-activity-link",
            disabled: !_(q.presentation),
            onClick: (ge) => f("present", q.presentation)
          }, [
            F(K, { name: q.presentation.kind === "material" ? "book" : "records" }, null, 8, ["name"]),
            n("span", null, r(q.presentation.title), 1),
            F(K, { name: "arrow" })
          ], 8, Vo)) : p("", !0),
          be === h.value.length - 1 && I.value?.text === q.teacher ? (a(), i("div", Do, [[...q.teacher].length <= 1e3 ? (a(), i("button", {
            key: 0,
            type: "button",
            disabled: e.disabled,
            onClick: G[2] || (G[2] = (ge) => x("say-reply"))
          }, [F(K, { name: "sound" }), Y(r(l(ee).listen), 1)], 8, jo)) : p("", !0), I.value.exerciseId && N.value && [...q.teacher].length <= 4e3 ? (a(), i("button", {
            key: 1,
            type: "button",
            disabled: e.disabled || N.value.notes.some((ge) => ge.text === q.teacher),
            onClick: G[3] || (G[3] = (ge) => x("save-note", { unitId: N.value.id }))
          }, r(l(ee).saveNote), 9, Wo)) : p("", !0)])) : p("", !0)
        ]))), 128)),
        d.value && !u.value.turns.some((q) => q.status === "running" && l(Ke)({ kind: q.purpose ?? "talk" })) ? (a(), i("div", Go, [G[9] || (G[9] = n("span", {
          class: "learning-working-dot",
          "aria-hidden": "true"
        }, null, -1)), n("span", null, r(v.value), 1)])) : !d.value && v.value && m.value === "ready" ? (a(), i("p", Fo, r(v.value), 1)) : p("", !0),
        !h.value.length && !d.value ? (a(), i("div", Ho, [
          F(K, { name: "chat" }),
          n("p", null, r(e.target === "workbench" ? l(ee).assistantEmpty : e.state.teacher ? b.empty : b.select), 1),
          e.target === "companion" && !e.state.teacher ? (a(), i("button", {
            key: 0,
            class: "learning-primary",
            type: "button",
            onClick: G[4] || (G[4] = (q) => f("profile"))
          }, r(b.select), 1)) : e.target === "companion" ? (a(), i("button", {
            key: 1,
            type: "button",
            disabled: e.disabled,
            onClick: G[5] || (G[5] = (q) => x("talk", { message: e.state.profile ? l(Bt).returning : l(Bt).initial }))
          }, r(b.opening), 9, zo)) : p("", !0)
        ])) : p("", !0)
      ], 40, Oo),
      e.target === "workbench" || e.state.teacher ? (a(), i("form", {
        key: 0,
        class: "learning-conversation-compose",
        onSubmit: ve(M, ["prevent"])
      }, [n("div", Yo, [W.value ? (a(), i("div", Ko, [n("span", null, r(W.value.selection?.quote ?? "请教这道题"), 1), n("button", {
        type: "button",
        "aria-label": "取消引用",
        onClick: G[6] || (G[6] = (q) => W.value = null)
      }, "×")])) : p("", !0), n("div", Zo, [ne(n("textarea", {
        ref_key: "composer",
        ref: R,
        "onUpdate:modelValue": G[7] || (G[7] = (q) => U.value = q),
        rows: "1",
        disabled: m.value !== "ready",
        maxlength: W.value?.selection ? 1800 : W.value?.exerciseId ? 2e3 : 4e3,
        "aria-label": e.target === "workbench" ? l(ee).assistantPlaceholder : "和语伴说",
        placeholder: e.target === "workbench" ? l(ee).assistantPlaceholder : "和语伴说…",
        onKeydown: A
      }, null, 40, Jo), [[de, U.value], [l(Ze), l(o)]]), n("button", {
        type: d.value ? "button" : "submit",
        class: se(d.value ? "learning-composer-stop" : "learning-primary"),
        disabled: d.value ? e.pending : e.disabled || !U.value.trim(),
        "aria-label": d.value ? l(ee).stop : l(ee).send,
        title: d.value ? l(ee).stop : l(ee).send,
        onClick: G[8] || (G[8] = ve((q) => d.value ? x("cancel-chat") : M(), ["prevent"]))
      }, [F(K, { name: d.value ? "stop" : "send" }, null, 8, ["name"])], 10, Qo)])])], 32)) : p("", !0)
    ]));
  }
}), Ot = Xo;
function eu(e) {
  const c = oa(structuredClone(ga(e.initialState))), s = z(!1), t = z(null), u = C(() => t.value ? Wt[t.value] : ""), d = C(() => t.value === "unknown" || t.value === "rejected");
  let v = !1, m = 0, I = () => {
  };
  const k = (f) => !s.value && $e(f, c.value), h = C(() => k("submit")), b = C(() => k("talk"));
  async function w(f, $ = {}) {
    if (s.value) return;
    if (ot(Ts(f, $.target), c.value)) {
      t.value = "busy";
      return;
    }
    s.value = !0, t.value = null;
    const o = c.value.chatIdentity, x = m;
    let U = !1;
    try {
      const R = JSON.parse(JSON.stringify({
        chatIdentity: o,
        ...$
      }));
      U = !0;
      const L = await e.bridge.request(`learning/${f}`, R, 35e3);
      return !v || c.value.chatIdentity !== o ? void 0 : (m === x && L.result.state.chatIdentity === o && (c.value = L.result.state), L.result.rejected && (t.value = L.result.rejected), L.result);
    } catch (R) {
      v && c.value.chatIdentity === o && (t.value = !U || R instanceof ha && R.code === "host_request_not_sent" ? "notSent" : R instanceof ya ? "rejected" : "unknown");
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
      $.chatIdentity === c.value.chatIdentity && (m++, c.value = $);
    });
  }), Re(() => {
    v = !1, I();
  }), {
    state: c,
    pending: s,
    writable: h,
    canChat: b,
    canRequest: k,
    localIssue: t,
    localMessage: u,
    needsRefresh: d,
    request: w
  };
}
function tu(e = Math.random) {
  return Math.round(3 * 6e4 + Math.min(Math.max(e(), 0), 1) * 9 * 6e4);
}
function au(e) {
  let c = !1, s, t = 0;
  function u() {
    s !== void 0 && (e.clearTimer(s), s = void 0);
  }
  function d() {
    if (!c) return;
    const v = t;
    s = e.setTimer(() => {
      v === t && (s = void 0, c && (e.opportunity(), d()));
    }, tu(e.random));
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
function nu(e) {
  const c = z(!1), s = z(!1), t = z(!1), u = z(!1), d = z("");
  let v, m;
  const I = C(() => e.preference.enabled && e.reading.value && c.value && !e.blocked.value && !!e.state.value.teacher && e.state.value.storage === "ready"), k = C(() => I.value && !s.value && !t.value && !u.value && !e.pending.value && !e.state.value.busy && !e.state.value.chatBusy && !e.state.value.companionBusy);
  function h() {
    const L = e.root.value?.querySelector(".learning-scroll")?.getBoundingClientRect(), B = L?.top ?? 0, W = [...e.root.value?.querySelectorAll("[data-material-id][data-paragraph-id]") ?? []].find((V) => V.getBoundingClientRect().bottom > B + 60 && V.getBoundingClientRect().top < (L?.bottom ?? 0));
    return W ? {
      materialId: W.dataset.materialId,
      paragraphId: W.dataset.paragraphId
    } : null;
  }
  const b = au({
    setTimer: (L, B) => setTimeout(L, B),
    clearTimer: (L) => clearTimeout(L),
    opportunity: () => {
      const L = h();
      L && e.request("companion", L);
    }
  });
  Z(k, (L) => b.update(L), { immediate: !0 }), Z([
    I,
    s,
    t,
    u,
    e.pending,
    () => e.state.value.companionBusy
  ], ([L, B, W, V, D, P]) => {
    P && !D && (!L || B || W || V) && e.request("cancel-companion");
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
  function U() {
    c.value = document.visibilityState === "visible", c.value || (clearTimeout(v), u.value = !1, R()), w();
  }
  function R() {
    clearTimeout(m), d.value = "";
  }
  return Z(() => e.state.value.remark?.text ?? "", (L) => {
    R(), L && e.reading.value && c.value && !s.value && !t.value && !u.value && !e.blocked.value && (d.value = L, m = setTimeout(R, 1e4));
  }), Z([
    e.reading,
    e.blocked,
    s,
    t,
    u
  ], ([L, B, W, V, D]) => {
    (!L || B || W || V || D) && R();
  }), Ae(() => {
    U(), document.addEventListener("visibilitychange", U), document.addEventListener("selectionchange", $), e.root.value?.addEventListener("pointerdown", o), e.root.value?.addEventListener("focusin", f), e.root.value?.addEventListener("focusout", f), e.root.value?.addEventListener("input", x);
  }), Re(() => {
    b.dispose(), clearTimeout(v), R(), document.removeEventListener("visibilitychange", U), document.removeEventListener("selectionchange", $), e.root.value?.removeEventListener("pointerdown", o), e.root.value?.removeEventListener("focusin", f), e.root.value?.removeEventListener("focusout", f), e.root.value?.removeEventListener("input", x);
  }), {
    bubble: d,
    dismiss: R
  };
}
var iu = { class: "learning-toolbar" }, lu = {
  key: 0,
  class: "learning-unread-dot",
  "aria-hidden": "true"
}, su = {
  key: 1,
  class: "learning-layout-control"
}, ru = ["min", "max"], ou = ["aria-label", "aria-expanded"], uu = { "aria-label": "学习资料与设置" }, du = { "aria-label": "学习资料与设置" }, vu = ["onClick"], cu = {
  key: 0,
  class: "learning-notice",
  role: "status",
  "aria-live": "polite"
}, gu = { class: "learning-row" }, pu = ["disabled"], mu = ["disabled"], bu = ["disabled"], fu = ["disabled"], ku = {
  key: 1,
  class: "learning-notice",
  role: "status",
  "aria-live": "polite"
}, yu = { class: "learning-row" }, hu = ["disabled"], $u = ["disabled"], wu = {
  key: 2,
  class: "learning-notice",
  role: "status"
}, xu = ["disabled"], Cu = ["disabled"], Iu = ["inert", "aria-hidden"], Lu = {
  key: 2,
  class: "learning-working",
  role: "status"
}, Su = ["disabled"], Au = {
  key: 5,
  class: "learning-materials-page"
}, Ru = {
  key: 0,
  class: "learning-empty-note"
}, Mu = { class: "learning-materials-title" }, Eu = ["onClick"], Tu = ["onClick"], Nu = {
  key: 0,
  class: "learning-notes"
}, Bu = { key: 0 }, Ou = ["disabled", "onClick"], qu = {
  key: 7,
  class: "learning-harvest-page"
}, Pu = {
  key: 0,
  class: "learning-empty-note"
}, _u = { key: 0 }, Uu = { class: "learning-muted" }, Vu = ["disabled", "onClick"], Du = ["disabled"], ju = ["disabled"], Wu = {
  key: 3,
  class: "learning-row"
}, Gu = ["disabled"], Fu = ["disabled"], Hu = {
  key: 8,
  class: "learning-settings-page"
}, zu = ["value", "disabled"], Yu = ["value"], Ku = {
  key: 0,
  class: "learning-settings-goal"
}, Zu = {
  key: 0,
  class: "learning-muted"
}, Ju = ["value", "disabled"], Qu = ["disabled"], Xu = ["disabled"], ed = ["disabled"], td = ["disabled"], ad = ["disabled"], nd = ["disabled"], id = ["disabled"], ld = ["disabled"], sd = ["inert", "aria-hidden"], rd = ["aria-label"], od = { class: "learning-person-initial" }, ud = {
  key: 0,
  class: "learning-unread-dot",
  "aria-hidden": "true"
}, dd = ["aria-label"], vd = {
  key: 0,
  class: "learning-unread-dot",
  "aria-hidden": "true"
}, cd = {
  role: "alertdialog",
  "aria-labelledby": "learning-confirm-title",
  class: "learning-confirm"
}, gd = { id: "learning-confirm-title" }, pd = { class: "learning-row" }, md = ["disabled"], bd = /* @__PURE__ */ ae({
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
    }, { state: t, pending: u, writable: d, canChat: v, canRequest: m, localMessage: I, needsRefresh: k, request: h } = eu(c), b = Ln(t);
    async function w(S, g = {}, y = !1) {
      if (!y && In(b, t.value, S, g)) {
        ue(S, g, S === "teacher" ? he.companion : he.context);
        return;
      }
      return h(S, g);
    }
    const f = z(t.value.profile ? "home" : "profile"), $ = [], o = z(null), x = z(!1);
    ze(() => o.value?.open ? (o.value.open = !1, !0) : !1, () => x.value);
    const U = z(null), R = z(null), L = z(!1), B = z(null), W = z(null), V = z(null), D = {}, P = z(null), j = z(0), T = C(() => j.value >= 760 && !!t.value.teacher), M = z("work"), A = z(!0), _ = z(!1), N = z(62), O = C(() => Math.max(42, Math.ceil(320 / Math.max(j.value, 1) * 100))), G = C(() => Math.min(68, Math.floor((1 - 320 / Math.max(j.value, 1)) * 100))), q = C({
      get: () => T.value ? Math.min(G.value, Math.max(O.value, N.value)) : N.value,
      set: (S) => {
        N.value = S;
      }
    }), ye = z(!1);
    let be, ge;
    const Je = () => {
      ye.value = ge?.matches ?? !1;
    };
    Ae(() => {
      ge = matchMedia("(prefers-reduced-motion: reduce)"), Je(), ge.addEventListener("change", Je), !(!P.value || typeof ResizeObserver > "u") && (be = new ResizeObserver(([S]) => {
        j.value = S?.contentRect.width ?? 0;
      }), be.observe(P.value));
    }), Re(() => {
      be?.disconnect(), ge?.removeEventListener("change", Je);
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
      }), S && (A.value = !0), g && (_.value = !0), await re(), !Ne) return;
      S && V.value && (V.value.scrollTop = D[f.value] ?? 0);
      const wt = () => {
        A.value = S, _.value = g;
      };
      T.value || y ? wt() : $t = setTimeout(wt, 320);
    }, { immediate: !0 });
    function _e() {
      pe.value && V.value && !L.value && (D[f.value] = V.value.scrollTop), Te();
    }
    async function Te(S) {
      const g = S?.target instanceof Element ? S.target : null;
      if (await re(), !pe.value || f.value !== "home" || !V.value) return;
      const y = V.value.getBoundingClientRect(), Q = g?.closest("[data-learning-unit-id]") ?? [...V.value.querySelectorAll("[data-learning-unit-id]")].find((Ge) => {
        const Ne = Ge.getBoundingClientRect();
        return Ne.bottom > y.top + 48 && Ne.top < y.bottom;
      });
      Q?.dataset.learningUnitId && (b.chat.study = {
        unitId: Q.dataset.learningUnitId,
        exerciseId: Q.dataset.exerciseId
      });
    }
    Z([
      V,
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
      t.value.teacher && (await Te(), _e(), M.value = "chat", _.value = !0, await re(), M.value === "chat" && U.value?.focusHeading());
    }
    async function Ue() {
      A.value = !0, M.value = "work", await re(), V.value && (V.value.scrollTop = D[f.value] ?? 0);
      const S = V.value?.querySelector("h1, h2");
      S && (S.tabIndex = -1, S.focus({ preventScroll: !0 }));
    }
    let mt = 0;
    Z(() => !!t.value.record, async (S, g) => {
      f.value !== "books" || S === g || (S && (mt = V.value?.scrollTop ?? 0), await re(), f.value === "books" && V.value && (V.value.scrollTop = S ? 0 : mt));
    });
    const ie = z(null), bt = z(null);
    _t(bt, () => {
      ie.value = null;
    });
    const Ve = z(t.value.profile?.voice?.voiceId ?? t.value.voices.defaultVoice), De = z(t.value.profile?.voice?.language ?? t.value.language), je = z(t.value.profile?.voice?.speed ?? 1), we = z(0), la = C(() => t.value.completions.slice(we.value * 20, (we.value + 1) * 20));
    Z([() => t.value.language, () => t.value.profile?.voice], ([S, g]) => {
      Ve.value = g?.voiceId ?? t.value.voices.defaultVoice, De.value = g?.language ?? S, je.value = g?.speed ?? 1;
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
        const y = b.unit(S.unitId).review;
        S.kind === "exercise" && (y.index = t.value.review.exercises.findIndex((Q) => Q.id === S.id)), y.expanded = !0, await nt();
        return;
      }
      if (t.value.unit?.id === S.unitId) {
        if (t.value.unit.kind === "reading-writing") {
          if (g) {
            (!pe.value || f.value !== "home") && (Ce.value = !0);
            return;
          }
          b.unit(S.unitId).reading.view = "reading", await me("home");
          const y = S.kind === "exercise" ? `[data-exercise-id="${CSS.escape(S.id)}"]` : `[data-material-id="${CSS.escape(S.id)}"][data-paragraph-id]`;
          V.value?.querySelector(y)?.scrollIntoView({
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
      L.value || _e(), L.value = !0, await Ue(), await re(), S ? await R.value?.ask(S, void 0, g) : R.value?.focusHeading();
    }
    async function at() {
      L.value = !1, await re(), V.value && (V.value.scrollTop = D[f.value] ?? 0), B.value?.focus({ preventScroll: !0 });
    }
    async function ft(S, g, y) {
      if (!t.value.teacher) {
        await tt(S, y), g && await R.value?.ask(S, g, y);
        return;
      }
      et(), _e(), M.value = "chat", _.value = !0, await re(), await U.value?.ask(S, g, y);
    }
    async function me(S, g = !1) {
      if (L.value = !1, S !== f.value && !g) if (S === "home") $.length = 0;
      else {
        const y = $.indexOf(S);
        y >= 0 ? $.splice(y) : $.push(f.value);
      }
      if (V.value && (D[f.value] = V.value.scrollTop), o.value && (o.value.open = !1), f.value = S, await Ue(), await re(), V.value) {
        V.value.scrollTop = D[S] ?? 0;
        const y = [...V.value.querySelectorAll("h1, h2")].find((Q) => Q.offsetParent !== null);
        y && (y.tabIndex = -1, y.focus({ preventScroll: !0 }));
      }
    }
    function kt() {
      b.setup.step = 0, me("profile");
    }
    async function nt() {
      await me("home"), V.value && (V.value.scrollTop = 0);
      const S = V.value?.querySelector("#learning-review-title");
      S && (S.tabIndex = -1, S.focus({ preventScroll: !0 }));
    }
    async function We(S, g = {}, y = !1) {
      if (S === "prepare" && !t.value.profile) {
        b.setup.step = 2, await me("profile");
        return;
      }
      S === "start-review" && await nt();
      const Q = t.value.unit;
      Q?.kind === "reading-writing" && g.unitId === Q.id && [
        "grade",
        "submit-revision",
        "skip-revision"
      ].includes(S) && (b.unit(Q.id).reading.view = S !== "grade" || [
        "reviewing",
        "model",
        "complete"
      ].includes(Q.stage.stage) ? "model" : "feedback", await me("home"), V.value && (V.value.scrollTop = 0)), await w(S, g, y);
    }
    Z(() => b.settings.submitted, (S, g) => {
      !S && g && !b.settings.open && f.value === "profile" && b.setup.step === 2 && t.value.storage === "ready" && !t.value.busy && t.value.profile && Object.entries(g.value).every(([y, Q]) => t.value.profile.settings[y] === Q) && me("home");
    }), Z(() => t.value.busy, (S) => {
      const g = t.value.unit;
      !S && g?.stage.stage === "revising" && b.unit(g.id).reading.view === "model" && (b.unit(g.id).reading.view = "feedback");
    });
    const yt = ze(() => o.value?.open ? (o.value.open = !1, !0) : L.value && pe.value ? (at(), !0) : !T.value && M.value === "chat" ? (Ue(), !0) : f.value === "home" || !$.length && f.value === "profile" && !t.value.teacher ? !1 : (me($.pop() ?? "home", !0), !0));
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
      }), t.value.record?.id === S && await me("books");
    }
    const { bubble: ht, dismiss: it } = nu({
      root: P,
      state: t,
      pending: u,
      preference: b.companion,
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
      n("header", iu, [
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
          onClick: g[1] || (g[1] = (y) => me("home"))
        }, [
          g[37] || (g[37] = n("span", {
            class: "learning-brand-mark",
            "aria-hidden": "true"
          }, [Y("a"), n("span", null, "あ")], -1)),
          g[38] || (g[38] = Y("语伴", -1)),
          Ce.value && (T.value || M.value === "work") ? (a(), i("span", lu)) : p("", !0)
        ]),
        T.value && l(t).teacher ? (a(), i("label", su, [
          F(K, { name: "workbook" }),
          ne(n("input", {
            "onUpdate:modelValue": g[2] || (g[2] = (y) => q.value = y),
            type: "range",
            min: O.value,
            max: G.value,
            step: "1",
            "aria-label": "阅读区宽度比例"
          }, null, 8, ru), [[
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
        }, [F(K, { name: "chat" }), n("span", null, r(l(ee).assistant), 1)], 8, ou),
        n("details", {
          ref_key: "menu",
          ref: o,
          class: "learning-menu",
          onToggle: g[4] || (g[4] = (y) => x.value = !!o.value?.open),
          onKeydown: g[5] || (g[5] = qe(ve((y) => o.value.open = !1, ["stop", "prevent"]), ["esc"]))
        }, [n("summary", uu, [F(K, { name: "more" })]), n("nav", du, [(a(), i(E, null, H([
          ["books", "语法本与生词本"],
          ["materials", "课件与笔记"],
          ["harvest", "我的收获"],
          ["settings", "设置"]
        ], ([y, Q]) => n("button", {
          key: y,
          type: "button",
          onClick: (Ge) => me(y)
        }, r(Q), 9, vu)), 64))])], 544)
      ]),
      l(I) || !l(t).busy && (l(t).message || l(t).storage !== "ready") ? (a(), i("div", cu, [Y(r(l(I) || l(t).message || (l(t).storage === "unconfirmed" ? l(st).unconfirmed : l(t).storage === "conflict" ? l(st).conflict : l(st).unloaded)) + " ", 1), n("div", gu, [
        l(t).storage === "unconfirmed" || l(t).storage === "conflict" ? (a(), i("button", {
          key: 0,
          type: "button",
          disabled: l(u),
          onClick: g[6] || (g[6] = (y) => w("verify"))
        }, r(s.verify), 9, pu)) : p("", !0),
        l(t).storage === "unconfirmed" ? (a(), i("button", {
          key: 1,
          type: "button",
          disabled: l(u),
          onClick: g[7] || (g[7] = (y) => w("retry-save"))
        }, r(s.retry), 9, mu)) : p("", !0),
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
        }, r(l(Wt).refresh), 9, fu)) : p("", !0)
      ])])) : p("", !0),
      [
        "unconfirmed",
        "conflict",
        "failed"
      ].includes(l(t).chatStorage) ? (a(), i("div", ku, [Y(r(l(t).chatStorage === "unconfirmed" ? l(Le).unconfirmed : l(t).chatStorage === "conflict" ? l(Le).conflict : l(Le).failed) + " ", 1), n("div", yu, [n("button", {
        type: "button",
        disabled: !l(m)("verify-teacher"),
        onClick: g[10] || (g[10] = (y) => w("verify-teacher"))
      }, r(l(Le).verify), 9, hu), l(t).chatStorage !== "failed" ? (a(), i("button", {
        key: 0,
        type: "button",
        disabled: !l(m)("adopt-teacher"),
        onClick: g[11] || (g[11] = (y) => ue("adopt-teacher", {}, l(Le).adoptWarning))
      }, r(l(Le).adopt), 9, $u)) : p("", !0)])])) : p("", !0),
      [
        "unconfirmed",
        "conflict",
        "failed"
      ].includes(l(t).workbenchStorage) ? (a(), i("div", wu, [
        Y(r(l(ee).assistantStorage) + " ", 1),
        n("button", {
          type: "button",
          disabled: l(u),
          onClick: g[12] || (g[12] = (y) => w("verify-workbench"))
        }, r(l(ee).verify), 9, xu),
        l(t).workbenchStorage === "conflict" ? (a(), i("button", {
          key: 0,
          type: "button",
          disabled: l(u),
          onClick: g[13] || (g[13] = (y) => ue("adopt-workbench", {}, l(ee).adoptConfirm))
        }, r(l(ee).adopt), 9, Cu)) : p("", !0)
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
          disabled: !l(m)("workbench-talk"),
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
          ref: V,
          class: "learning-scroll",
          onScrollPassive: _e,
          onClick: Te,
          onFocusin: Te
        }, [A.value && !L.value ? (a(), i(E, { key: 0 }, [
          oe.value ? (a(), J(ia, {
            key: oe.value.key,
            turn: oe.value.turn,
            stoppable: "",
            disabled: l(u),
            onStop: g[14] || (g[14] = (y) => w(l(fe)({ kind: oe.value.turn.purpose ?? "talk" }) ? "cancel-preparation" : "cancel"))
          }, ba({ _: 2 }, [l(t).storage === "ready" && l(fe)({ kind: oe.value.turn.purpose ?? "talk" }) && !l(t).preparation?.running && (l(t).preparation || l(t).sourceChoice) ? {
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
          l(t).busy && oe.value?.turn.status !== "running" ? (a(), i("div", Lu, [
            g[39] || (g[39] = n("span", {
              class: "learning-working-dot",
              "aria-hidden": "true"
            }, null, -1)),
            n("span", null, r(l(t).message || s.working), 1),
            n("button", {
              type: "button",
              disabled: l(u),
              onClick: g[15] || (g[15] = (y) => w("cancel"))
            }, "停止", 8, Su)
          ])) : p("", !0),
          f.value === "home" ? (a(), J(oo, {
            key: 3,
            state: l(t),
            disabled: !l(d),
            pending: l(u),
            "preparation-in-process": !!oe.value && l(fe)({ kind: oe.value.turn.purpose ?? "talk" }),
            onAction: We,
            onConfirm: ue,
            onPresent: Ie,
            onGo: me,
            onAsk: ft,
            onAssistant: tt,
            onRecord: sa
          }, null, 8, [
            "state",
            "disabled",
            "pending",
            "preparation-in-process"
          ])) : p("", !0),
          f.value === "profile" ? (a(), J(cl, {
            key: 4,
            state: l(t),
            disabled: !l(m)("language"),
            onAction: w
          }, null, 8, ["state", "disabled"])) : p("", !0),
          f.value === "materials" ? (a(), i("section", Au, [
            g[40] || (g[40] = n("h1", null, "课件与笔记", -1)),
            l(t).unit ? p("", !0) : (a(), i("p", Ru, r(l(t).blockedUnit ? "当前课件在另一个故事中" : "还没有课件"), 1)),
            l(t).unit ? (a(), i(E, { key: 1 }, [
              n("p", Mu, r(l(t).unit.title), 1),
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
              ], 8, Eu))), 128)),
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
              ], 8, Tu))), 128)),
              l(t).unit.notes.length ? (a(), i("section", Nu, [(a(!0), i(E, null, H(l(t).unit.notes, (y) => (a(), i("article", { key: y.id }, [
                y.selection ? (a(), i("blockquote", Bu, r(y.selection.quote), 1)) : p("", !0),
                n("p", null, r(y.text), 1),
                n("button", {
                  type: "button",
                  disabled: !l(d),
                  onClick: (Q) => w("delete-note", { id: y.id })
                }, "删除笔记", 8, Ou)
              ]))), 128))])) : p("", !0)
            ], 64)) : p("", !0)
          ])) : p("", !0),
          f.value === "books" ? (a(), J(Oi, {
            key: 6,
            state: l(t),
            disabled: !l(m)("start-review"),
            onAction: We,
            onReview: nt,
            onRemove: ue
          }, null, 8, ["state", "disabled"])) : p("", !0),
          f.value === "harvest" ? (a(), i("section", qu, [
            g[42] || (g[42] = n("div", { class: "learning-page-heading" }, [n("h1", null, "我的收获")], -1)),
            l(t).completions.length ? p("", !0) : (a(), i("p", Pu, "还没有完成的课程")),
            (a(!0), i(E, null, H(la.value, (y) => (a(), i("article", {
              key: y.unitId,
              class: "learning-harvest-entry"
            }, [
              n("small", null, r(new Date(y.completedAt).toLocaleDateString()), 1),
              y.rewardStatus !== "retired" ? (a(), i("h2", _u, [Y(r(y.rewardStatus === "paid" ? "+" : "") + r(y.amount), 1), g[41] || (g[41] = n("span", null, "小白币", -1))])) : p("", !0),
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
            }, r(s.verifyWallet), 9, Du)) : p("", !0),
            l(t).walletStorage === "conflict" ? (a(), i("button", {
              key: 2,
              type: "button",
              disabled: l(u) || l(t).busy,
              onClick: g[17] || (g[17] = (y) => ue("adopt-wallet", {}, s.adoptWalletWarning))
            }, r(s.adoptWallet), 9, ju)) : p("", !0),
            l(t).completions.length > 20 ? (a(), i("div", Wu, [n("button", {
              type: "button",
              disabled: we.value === 0,
              onClick: g[18] || (g[18] = (y) => we.value--)
            }, "上一页", 8, Gu), n("button", {
              type: "button",
              disabled: (we.value + 1) * 20 >= l(t).completions.length,
              onClick: g[19] || (g[19] = (y) => we.value++)
            }, "下一页", 8, Fu)])) : p("", !0)
          ])) : p("", !0),
          f.value === "settings" ? (a(), i("section", Hu, [
            g[52] || (g[52] = n("h1", null, "学习设置", -1)),
            n("label", null, [g[43] || (g[43] = Y("当前语言", -1)), n("select", {
              value: l(t).language,
              disabled: !l(m)("language"),
              onChange: g[20] || (g[20] = (y) => {
                w("language", { language: y.target.value }), y.target.value = l(t).language;
              })
            }, [(a(!0), i(E, null, H([.../* @__PURE__ */ new Set([l(t).language, ...l(t).languages])], (y) => (a(), i("option", {
              key: y,
              value: y
            }, r(new Intl.DisplayNames(["zh-CN"], { type: "language" }).of(y)), 9, Yu))), 128))], 40, zu)]),
            n("button", {
              type: "button",
              onClick: kt
            }, "更换语言和语伴 →"),
            F(ea),
            n("section", null, [
              g[44] || (g[44] = n("h2", null, "训练设置", -1)),
              l(t).profile?.goal.description ? (a(), i("p", Ku, r(l(t).profile.goal.description), 1)) : p("", !0),
              F(Xt, {
                state: l(t),
                disabled: !l(m)("settings"),
                onAction: w
              }, null, 8, ["state", "disabled"])
            ]),
            n("section", null, [
              g[49] || (g[49] = n("h2", null, "语伴的声音", -1)),
              l(t).voices.enabled ? (a(), i("form", {
                key: 1,
                onSubmit: g[24] || (g[24] = ve((y) => w("voice", { voice: {
                  voiceId: Ve.value,
                  language: De.value,
                  speed: Number(je.value)
                } }), ["prevent"]))
              }, [
                n("label", null, [g[45] || (g[45] = Y("音色", -1)), ne(n("select", { "onUpdate:modelValue": g[21] || (g[21] = (y) => Ve.value = y) }, [(a(!0), i(E, null, H(l(t).voices.voices, (y) => (a(), i("option", {
                  key: y.id,
                  value: y.id,
                  disabled: !y.available
                }, r(y.name) + r(y.available ? "" : "（暂不可用）"), 9, Ju))), 128))], 512), [[He, Ve.value]])]),
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
                  disabled: !l(m)("voice") || !l(t).profile
                }, "保存声音设置", 8, Qu)
              ], 32)) : (a(), i("p", Zu, r(s.voiceDisabled), 1)),
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
                disabled: !l(m)("forget-conversation"),
                onClick: g[26] || (g[26] = (y) => ue("forget-conversation", { target: "companion" }, l(ee).clearCompanionConfirm))
              }, r(l(ee).clearCompanion), 9, Xu),
              n("button", {
                type: "button",
                disabled: !l(m)("forget-conversation"),
                onClick: g[27] || (g[27] = (y) => ue("forget-conversation", { target: "workbench" }, l(ee).clearAssistantConfirm))
              }, r(l(ee).clearAssistant), 9, ed),
              n("button", {
                type: "button",
                disabled: !l(m)("export"),
                onClick: ra
              }, "导出学习数据", 8, td),
              n("button", {
                type: "button",
                disabled: !l(m)("read"),
                onClick: g[28] || (g[28] = (y) => w("read"))
              }, "重新加载", 8, ad),
              l(t).unit || l(t).blockedUnit ? (a(), i("button", {
                key: 0,
                type: "button",
                disabled: !l(m)("abandon"),
                onClick: g[29] || (g[29] = (y) => ue("abandon", {}, l(he).lesson))
              }, "放下当前练习", 8, nd)) : p("", !0),
              n("button", {
                type: "button",
                class: "learning-danger",
                disabled: !l(m)("delete-language") || !l(t).profile,
                onClick: g[30] || (g[30] = (y) => ue("delete-language", {}, "删除当前语言的全部学习数据？未领取奖励也将放弃，已到账流水保留。"))
              }, "删除当前语言", 8, id),
              n("button", {
                type: "button",
                class: "learning-danger",
                disabled: !l(m)("clear"),
                onClick: g[31] || (g[31] = (y) => ue("clear", {}, "清空所有语言的目标、课程和记录？未领取奖励也将放弃。已到账流水不撤销。"))
              }, "清空全部学习数据", 8, ld)
            ])
          ])) : p("", !0)
        ], 64)) : p("", !0)], 544), [[ma, !L.value]])], 8, Iu),
        l(t).teacher ? (a(), i("div", {
          key: 0,
          class: "learning-pane is-chat",
          inert: !Pe.value,
          "aria-hidden": !Pe.value
        }, [_.value ? (a(), J(Ot, {
          key: 0,
          ref_key: "conversation",
          ref: U,
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
        ])) : p("", !0)], 8, sd)) : p("", !0),
        !T.value && M.value === "work" && l(t).teacher ? (a(), i("button", {
          key: 1,
          type: "button",
          class: "learning-float is-companion",
          "aria-label": gt.value ? `和${l(t).teacher.name}聊天，有新消息` : `和${l(t).teacher.name}聊天`,
          onClick: pt
        }, [n("span", od, r([...l(t).teacher.name][0]), 1), gt.value ? (a(), i("span", ud)) : p("", !0)], 8, rd)) : p("", !0),
        !T.value && M.value === "chat" ? (a(), i("button", {
          key: 2,
          type: "button",
          class: "learning-float is-workbook",
          "aria-label": Ce.value ? "回到练习本，有新指引" : "回到练习本",
          onClick: Ue
        }, [F(K, { name: "workbook" }), Ce.value ? (a(), i("span", vd)) : p("", !0)], 8, dd)) : p("", !0),
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
        ref: bt,
        class: "learning-confirm-shade",
        onKeydown: g[36] || (g[36] = qe(ve((y) => ie.value = null, ["stop", "prevent"]), ["esc"]))
      }, [n("section", cd, [
        n("h2", gd, r(l(St)[ie.value.action].title), 1),
        n("p", null, r(ie.value.text), 1),
        n("div", pd, [n("button", {
          autofocus: "",
          type: "button",
          onClick: g[34] || (g[34] = (y) => ie.value = null)
        }, r(["language", "teacher"].includes(ie.value.action) ? l(he).keepEditing : s.cancel), 1), n("button", {
          type: "button",
          class: "learning-primary",
          disabled: !l(m)(ie.value.action),
          onClick: g[35] || (g[35] = (y) => {
            We(ie.value.action, ie.value.input, !0), ie.value = null;
          })
        }, r(l(St)[ie.value.action].accept), 9, md)])
      ])], 544)) : p("", !0)
    ], 4));
  }
}), wd = bd;
export {
  wd as default
};
