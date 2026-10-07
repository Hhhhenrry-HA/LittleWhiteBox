/* eslint-disable */
import { B as Me, C as g, D as z, G as j, I as Ee, K as ga, M as At, O as F, P as de, Q as J, S as Q, T as pa, U as a, W as ba, X as ma, Z as fa, _ as M, at as H, b as L, ct as ke, d as ka, dt as jt, et as Wt, f as Je, ft as r, g as ve, h as Ae, it as Ie, j as ya, k as X, lt as l, m as ha, n as $a, o as Ze, ot as wa, p as ge, q as xa, s as ct, st as Ca, t as Ia, tt as se, ut as ue, w as i, x as n } from "./xiaobai-os-frame-bridge-CrPFvkI3.js";
import { t as gt } from "./xiaobai-os-MessageMarkdown-CFMtVfNA.js";
var st = /* @__PURE__ */ new WeakMap(), Rt = [
  "select",
  "input",
  "keyup",
  "pointerup",
  "scroll"
], Xe = {
  mounted(e, v) {
    const s = v.value, t = s.cursor, o = () => {
      s.cursor = {
        start: e.selectionStart,
        end: e.selectionEnd,
        direction: e.selectionDirection,
        top: e.scrollTop,
        left: e.scrollLeft
      };
    };
    st.set(e, o);
    for (const d of Rt) e.addEventListener(d, o, { passive: !0 });
    de(() => {
      !e.isConnected || !t || (e.setSelectionRange(t.start, t.end, t.direction), e.scrollTop = t.top, e.scrollLeft = t.left);
    });
  },
  beforeUnmount(e) {
    const v = st.get(e);
    if (v) {
      v();
      for (const s of Rt) e.removeEventListener(s, v);
      st.delete(e);
    }
  }
}, La = ["disabled"], Sa = {
  key: 0,
  class: "learning-choices"
}, Aa = [
  "type",
  "checked",
  "onChange"
], Ra = { class: "learning-option-letter" }, Ma = {
  key: 1,
  class: "learning-order"
}, Ea = [
  "disabled",
  "aria-label",
  "onClick"
], Na = [
  "disabled",
  "aria-label",
  "onClick"
], Ta = {
  key: 2,
  class: "learning-fields"
}, Oa = ["onUpdate:modelValue"], Ba = ["value"], qa = {
  key: 3,
  class: "learning-choices"
}, Pa = ["checked", "onChange"], _a = {
  key: 0,
  class: "learning-muted"
}, Va = {
  key: 4,
  class: "learning-fields"
}, Ua = ["onUpdate:modelValue"], Da = {
  key: 5,
  class: "learning-writing"
}, ja = ["disabled"], Wa = /* @__PURE__ */ X({
  __name: "AnswerInput",
  props: /* @__PURE__ */ At({
    response: {},
    paragraphs: {},
    disabled: { type: Boolean }
  }, {
    modelValue: { required: !0 },
    modelModifiers: {}
  }),
  emits: /* @__PURE__ */ At(["submit"], ["update:modelValue"]),
  setup(e, { emit: v }) {
    const s = e, t = v, o = ma(e, "modelValue");
    function d(f) {
      s.response.kind === "choice" && !s.response.multiple ? o.value.picked = [f] : o.value.picked = o.value.picked.includes(f) ? o.value.picked.filter(($) => $ !== f) : [...o.value.picked, f];
    }
    function c(f, $) {
      const m = [...o.value.order];
      [m[f], m[f + $]] = [m[f + $], m[f]], o.value.order = m;
    }
    const b = L(() => {
      const f = s.response;
      return f.kind === "text" ? !!o.value.text.trim() : f.kind === "gaps" ? f.slots.every(($) => o.value.values[$.id]?.trim()) : f.kind === "match" ? f.left.every(($) => o.value.values[$.id]) : f.kind === "order" ? !0 : o.value.picked.length > 0;
    });
    function C() {
      const f = s.response;
      !b.value || s.disabled || (f.kind === "text" ? t("submit", {
        kind: "text",
        text: o.value.text
      }) : f.kind === "gaps" ? t("submit", {
        kind: "gaps",
        values: f.slots.map(($) => ({
          id: $.id,
          text: o.value.values[$.id]
        }))
      }) : f.kind === "match" ? t("submit", {
        kind: "match",
        pairs: f.left.map(($) => ({
          left: $.id,
          right: o.value.values[$.id]
        }))
      }) : t("submit", {
        kind: f.kind,
        ids: [...f.kind === "order" ? o.value.order : o.value.picked]
      }));
    }
    return (f, $) => (a(), i("form", {
      class: "learning-answer",
      onSubmit: ve(C, ["prevent"])
    }, [n("fieldset", { disabled: e.disabled }, [
      $[3] || ($[3] = n("legend", { class: "learning-sr-only" }, "你的回答", -1)),
      e.response.kind === "choice" ? (a(), i("div", Sa, [(a(!0), i(M, null, j(e.response.options, (m, k) => (a(), i("label", {
        key: m.id,
        class: ue({ selected: o.value.picked.includes(m.id) })
      }, [
        n("input", {
          type: e.response.multiple ? "checkbox" : "radio",
          name: "answer-choice",
          checked: o.value.picked.includes(m.id),
          onChange: (y) => d(m.id)
        }, null, 40, Aa),
        n("span", Ra, r(String.fromCharCode(65 + k)), 1),
        n("span", null, r(m.text), 1)
      ], 2))), 128))])) : e.response.kind === "order" ? (a(), i("ol", Ma, [(a(!0), i(M, null, j(o.value.order, (m, k) => (a(), i("li", { key: m }, [
        n("span", null, r(e.response.options.find((y) => y.id === m)?.text), 1),
        n("button", {
          type: "button",
          disabled: k === 0,
          "aria-label": `上移第 ${k + 1} 项`,
          onClick: (y) => c(k, -1)
        }, "↑", 8, Ea),
        n("button", {
          type: "button",
          disabled: k === o.value.order.length - 1,
          "aria-label": `下移第 ${k + 1} 项`,
          onClick: (y) => c(k, 1)
        }, "↓", 8, Na)
      ]))), 128))])) : e.response.kind === "match" ? (a(), i("div", Ta, [(a(!0), i(M, null, j(e.response.left, (m) => (a(), i("label", { key: m.id }, [z(r(m.text) + " ", 1), se(n("select", { "onUpdate:modelValue": (k) => o.value.values[m.id] = k }, [$[1] || ($[1] = n("option", { value: "" }, "选择对应项", -1)), (a(!0), i(M, null, j(e.response.right, (k) => (a(), i("option", {
        key: k.id,
        value: k.id
      }, r(k.text), 9, Ba))), 128))], 8, Oa), [[Je, o.value.values[m.id]]])]))), 128))])) : e.response.kind === "evidence" ? (a(), i("div", qa, [(a(!0), i(M, null, j(e.paragraphs, (m) => (a(), i("label", {
        key: m.id,
        class: ue({ selected: o.value.picked.includes(m.id) })
      }, [n("input", {
        type: "checkbox",
        checked: o.value.picked.includes(m.id),
        onChange: (k) => d(m.id)
      }, null, 40, Pa), n("span", null, r(m.text), 1)], 2))), 128)), e.paragraphs.length ? g("", !0) : (a(), i("p", _a, "请先展开相关文稿，再选择原文依据。"))])) : e.response.kind === "gaps" ? (a(), i("div", Va, [(a(!0), i(M, null, j(e.response.slots, (m) => (a(), i("label", { key: m.id }, [z(r(m.text), 1), se(n("input", {
        "onUpdate:modelValue": (k) => o.value.values[m.id] = k,
        type: "text",
        maxlength: "4000",
        autocomplete: "off"
      }, null, 8, Ua), [[ge, o.value.values[m.id]]])]))), 128))])) : (a(), i("label", Da, [$[2] || ($[2] = n("span", { class: "learning-sr-only" }, "你的回答", -1)), se(n("textarea", {
        "onUpdate:modelValue": $[0] || ($[0] = (m) => o.value.text = m),
        rows: "6",
        maxlength: "4000",
        placeholder: "写下你的回答…"
      }, null, 512), [[ge, o.value.text], [l(Xe), o.value]])])),
      n("button", {
        class: "learning-primary",
        type: "submit",
        disabled: !b.value
      }, "交给语伴 →", 8, ja)
    ], 8, La)], 32));
  }
}), pt = Wa, Gt = 2e3, Ga = ["stroke-width"], Fa = ["d"], Ha = /* @__PURE__ */ X({
  __name: "LearningIcon",
  props: { name: {} },
  setup(e) {
    const v = {
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
    }, [n("path", { d: v[e.name] }, null, 8, Fa)], 8, Ga));
  }
}), Z = Ha, Ve = Object.freeze({
  select: "引用这段",
  ask: "问语伴",
  listen: "朗读",
  dismiss: "取消引用"
});
function za(e, v, s) {
  if (!s?.rangeCount || s.isCollapsed) return null;
  const t = s.getRangeAt(0), o = t.startContainer, d = (o instanceof Element ? o : o.parentElement)?.closest("[data-learning-text]");
  if (!d || !e.contains(d) || !d.contains(t.endContainer)) return null;
  const c = v.find((m) => m.id === d.dataset.materialId), b = c?.paragraphs.find((m) => m.id === d.dataset.paragraphId);
  if (!c || !b) return null;
  const C = t.cloneRange();
  C.selectNodeContents(d), C.setEnd(t.startContainer, t.startOffset);
  const f = C.toString().length, $ = t.toString();
  return !$.trim() || [...$].length > 2e3 || b.text.slice(f, f + $.length) !== $ ? null : {
    materialId: c.id,
    paragraphId: b.id,
    start: f,
    end: f + $.length,
    quote: $
  };
}
function Ft(e, v, s) {
  const t = () => {
    if (!e.value) return;
    const o = za(e.value, v(), window.getSelection());
    o && s(o);
  };
  Me(() => document.addEventListener("selectionchange", t)), Ee(() => document.removeEventListener("selectionchange", t));
}
var Ya = { class: "learning-source" }, Ka = { key: 0 }, Ja = ["href"], Za = {
  key: 0,
  class: "learning-listening-cover"
}, Qa = ["disabled"], Xa = {
  key: 1,
  class: "learning-material-body"
}, en = ["data-material-id", "data-paragraph-id"], tn = ["disabled", "onClick"], an = {
  class: "learning-audio-parts",
  "aria-label": "材料朗读分段"
}, nn = ["disabled", "onClick"], ln = { key: 2 }, sn = /* @__PURE__ */ X({
  __name: "MaterialReader",
  props: {
    material: {},
    disabled: { type: Boolean },
    exerciseId: {}
  },
  emits: ["action", "select"],
  setup(e, { emit: v }) {
    const s = e, t = v, o = H(null);
    Ft(o, () => [s.material], (c) => t("select", c));
    function d(c) {
      t("select", {
        materialId: s.material.id,
        paragraphId: c.id,
        start: 0,
        end: c.text.length,
        quote: c.text
      });
    }
    return (c, b) => (a(), i("article", {
      ref_key: "root",
      ref: o,
      class: "learning-material"
    }, [
      n("h2", null, r(e.material.title), 1),
      n("div", Ya, [e.material.provenance.kind === "authored" ? (a(), i("span", Ka, "语伴自编练习")) : (a(), i("a", {
        key: 1,
        href: e.material.provenance.url,
        target: "_blank",
        rel: "noopener noreferrer"
      }, r(e.material.provenance.kind === "original" ? "原文节选" : "改编自") + " · " + r(e.material.provenance.title) + " ↗", 9, Ja))]),
      e.material.hidden ? (a(), i("div", Za, [b[1] || (b[1] = n("svg", {
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
      }, "看文稿", 8, Qa)])) : (a(), i("div", Xa, [(a(!0), i(M, null, j(e.material.paragraphs, (C) => (a(), i("div", {
        key: C.id,
        class: "learning-paragraph"
      }, [n("p", {
        tabindex: "0",
        "data-learning-text": "",
        "data-material-id": e.material.id,
        "data-paragraph-id": C.id
      }, r(C.text), 9, en), n("button", {
        type: "button",
        disabled: [...C.text].length > l(Gt),
        onClick: (f) => d(C)
      }, r(l(Ve).select), 9, tn)]))), 128))])),
      n("div", an, [(a(!0), i(M, null, j(e.material.parts, (C) => (a(), i("button", {
        key: C.key,
        type: "button",
        disabled: e.disabled,
        onClick: (f) => t("action", "play", {
          materialId: e.material.id,
          partKey: C.key,
          exerciseId: e.exerciseId
        })
      }, [F(Z, { name: "play" }), z(r(e.material.parts.length > 1 ? `听第 ${C.number} 段` : "播放朗读"), 1)], 8, nn))), 128))]),
      e.material.parts.length ? (a(), i("small", ln, "TTS 合成朗读")) : g("", !0)
    ], 512));
  }
}), Mt = sn;
function bt(e, v, s = []) {
  const t = (o) => v.kind === "choice" || v.kind === "order" ? v.options.find((d) => d.id === o)?.text ?? o : s.find((d) => d.id === o)?.text ?? o;
  return e.kind === "text" ? e.text : e.kind === "gaps" ? e.values.map((o) => `${v.kind === "gaps" ? v.slots.find((d) => d.id === o.id)?.text ?? "" : ""} ${o.text}`).join(`
`) : e.kind === "match" ? e.pairs.map((o) => v.kind === "match" ? `${v.left.find((d) => d.id === o.left)?.text} → ${v.right.find((d) => d.id === o.right)?.text}` : "").join(`
`) : e.ids.map(t).join(e.kind === "order" ? " → " : `
`);
}
var jd = Object.freeze({
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
}), Ht = {
  unavailable: "Select work available in this story",
  feedbackRequired: "Select saved feedback to review",
  revised: "这篇已有修改稿，结果以修改稿的批改为准；请对修改稿的反馈申请复核。",
  hiddenRevisions: "这次作答关联其他故事中的修改稿，不能在这里一并删除。"
}, rn = { class: "learning-feedback" }, on = { class: "learning-muted" }, un = { key: 0 }, dn = { key: 1 }, vn = { key: 0 }, cn = { key: 1 }, gn = { key: 2 }, pn = {
  key: 3,
  class: "learning-muted"
}, bn = ["disabled"], mn = ["disabled"], fn = /* @__PURE__ */ X({
  __name: "AttemptFeedback",
  props: {
    attempt: {},
    feedback: {},
    response: {},
    paragraphs: {},
    disabled: { type: Boolean },
    reviewable: { type: Boolean }
  },
  emits: ["action"],
  setup(e) {
    const v = {
      correct: "答对了",
      partial: "已经掌握一部分",
      incorrect: "一起把这里弄懂",
      disputed: "这处还需复核"
    };
    return (s, t) => (a(), i("section", rn, [
      t[6] || (t[6] = n("p", { class: "learning-eyebrow" }, "已保存的原答", -1)),
      n("blockquote", null, r(l(bt)(e.attempt.answer, e.response, e.paragraphs)), 1),
      n("small", on, [
        z(r(e.attempt.help.feedback ? "得到反馈后的再练" : e.attempt.help.answer || e.attempt.help.hint || e.attempt.help.transcript ? "这次有辅助" : "未使用答案或提示"), 1),
        e.attempt.help.replays ? (a(), i("span", un, " · 重听 " + r(e.attempt.help.replays) + " 次", 1)) : g("", !0),
        e.attempt.help.slowPlayback ? (a(), i("span", dn, " · 慢放")) : g("", !0)
      ]),
      e.feedback ? (a(), i(M, { key: 0 }, [
        n("h3", null, r(v[e.feedback.verdict]), 1),
        e.feedback.understanding ? (a(), i("p", vn, [t[2] || (t[2] = n("b", null, "理解", -1)), z(r(e.feedback.understanding), 1)])) : g("", !0),
        e.feedback.expression ? (a(), i("p", cn, [t[3] || (t[3] = n("b", null, "表达", -1)), z(r(e.feedback.expression), 1)])) : g("", !0),
        e.feedback.guidance ? (a(), i("p", gn, [t[4] || (t[4] = n("b", null, "批注", -1)), z(r(e.feedback.guidance), 1)])) : g("", !0),
        e.reviewable ? (a(), i("button", {
          key: 4,
          type: "button",
          disabled: e.disabled,
          onClick: t[0] || (t[0] = (o) => s.$emit("action", "assess", {
            attemptId: e.attempt.id,
            review: !0,
            message: "请重新审视我的原答与题目。也请考虑其他有效表达，不只对照原来的答案键。"
          }))
        }, r(e.feedback.verdict === "disputed" ? "请语伴复核" : "有疑问，请复核"), 9, bn)) : (a(), i("small", pn, r(l(Ht).revised), 1))
      ], 64)) : (a(), i(M, { key: 1 }, [t[5] || (t[5] = n("p", null, "原答已保存，等待语伴评估。", -1)), n("button", {
        type: "button",
        disabled: e.disabled,
        onClick: t[1] || (t[1] = (o) => s.$emit("action", "assess", {
          attemptId: e.attempt.id,
          review: !1,
          message: "请评估这条已经保存的原答。"
        }))
      }, "重试评估", 8, mn)], 64))
    ]));
  }
}), mt = fn, zt = {
  busy: "上一件事还没做完，等它完成后再试一次吧。这次没有开始。",
  notSent: "这次没有发出去，输入的内容还在。请再试一次。",
  rejected: "这次操作未能完成，请查看最新状态后再继续。",
  unknown: "还没收到确认，操作可能仍在继续。请先查看最新状态，不要重复发送。",
  refresh: "查看最新状态"
}, Se = {
  unconfirmed: "搭子的对话与设置尚未确认保存，已收到的回复保留。",
  conflict: "搭子的对话与设置有另一份已保存的版本，请先核对。",
  failed: "暂时没能打开搭子的对话与设置，请检查保存。",
  verify: "检查搭子记录",
  adopt: "使用已保存记录",
  adoptWarning: "放弃尚未确认的对话或设置，使用已保存的搭子记录？文章与作文会保留。"
}, ne = {
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
}, Yt = {
  unassessed: "还没练过",
  review: "待确认",
  independent: "已能独立使用",
  practised: "练过一次",
  strengthen: "再练练"
}, Kt = (e) => `${e} 次作答`, Jt = (e) => `${e} 个知识点可以温习了`, ut = {
  settings: "声音设置",
  enable: "开启语音"
}, ae = {
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
}, Et = {
  title: "还有内容没提交",
  accept: "放弃并切换"
}, Nt = {
  "share-course": {
    title: "允许这份课件跨故事使用？",
    accept: "允许跨故事使用"
  },
  language: Et,
  teacher: Et,
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
}, rt = {
  private: "仅当前故事",
  action: "跨故事使用",
  confirm: "这份课件、参考答案、讲解和笔记将可用于你的其他故事，里面可能有当前剧情。语伴私聊和原有作答不公开。"
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
}, te = {
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
}, Ye = {
  title: "替换当前练习？",
  detail: "新内容保存成功后，替换这份课件、作答和笔记。学习本中的记录和已获得的奖励保留。",
  decline: "保留当前练习",
  accept: "替换并继续"
}, kn = {
  key: 0,
  class: "learning-player",
  "aria-label": "课堂朗读"
}, yn = {
  key: 0,
  role: "status"
}, hn = {
  key: 2,
  class: "learning-row"
}, $n = ["aria-label", "disabled"], wn = ["max", "value"], xn = /* @__PURE__ */ X({
  __name: "LearningPlayer",
  props: { state: {} },
  emits: ["action"],
  setup(e, { emit: v }) {
    const s = v;
    function t(o) {
      return `${Math.floor(o / 60)}:${String(Math.floor(o % 60)).padStart(2, "0")}`;
    }
    return (o, d) => e.state.media.status !== "idle" ? (a(), i("section", kn, [
      e.state.media.message ? (a(), i("p", yn, r(e.state.media.message), 1)) : g("", !0),
      e.state.voices.enabled ? g("", !0) : (a(), i("button", {
        key: 1,
        type: "button",
        onClick: d[0] || (d[0] = (c) => s("action", "tts-settings"))
      }, r(l(ut).enable), 1)),
      e.state.media.key ? (a(), i("div", hn, [
        F(Z, { name: "sound" }),
        n("span", null, r(e.state.media.status === "loading" ? "正在生成声音…" : `${t(e.state.media.position)} / ${t(e.state.media.duration)}`), 1),
        e.state.media.status === "playing" ? (a(), i("button", {
          key: 0,
          type: "button",
          "aria-label": "暂停",
          onClick: d[1] || (d[1] = (c) => s("action", "pause"))
        }, [F(Z, { name: "pause" })])) : [
          "paused",
          "ended",
          "blocked"
        ].includes(e.state.media.status) ? (a(), i("button", {
          key: 1,
          type: "button",
          "aria-label": e.state.media.status === "ended" ? "再听一遍" : "继续播放",
          disabled: e.state.busy,
          onClick: d[2] || (d[2] = (c) => s("action", "resume"))
        }, [F(Z, { name: "play" })], 8, $n)) : g("", !0),
        n("button", {
          type: "button",
          "aria-label": "停止",
          onClick: d[3] || (d[3] = (c) => s("action", "stop"))
        }, [F(Z, { name: "stop" })]),
        e.state.media.duration ? (a(), i("button", {
          key: 2,
          type: "button",
          onClick: d[4] || (d[4] = (c) => s("action", "rate", { value: e.state.media.rate === 1 ? 0.75 : 1 }))
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
        onChange: d[5] || (d[5] = (c) => s("action", "seek", { value: Number(c.target.value) }))
      }, null, 40, wn)) : g("", !0)
    ])) : g("", !0);
  }
}), Zt = xn, Cn = { class: "learning-selection" }, In = { class: "learning-row" }, Ln = ["disabled"], Sn = /* @__PURE__ */ X({
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
    return (v, s) => (a(), i("div", Cn, [n("blockquote", null, r(e.selection.quote), 1), n("div", In, [
      n("button", {
        type: "button",
        onClick: s[0] || (s[0] = (t) => v.$emit("ask"))
      }, r(l(Ve).ask), 1),
      n("button", {
        type: "button",
        disabled: e.disabled || [...e.selection.quote].length > 1e3,
        onClick: s[1] || (s[1] = (t) => v.$emit("say"))
      }, r(l(Ve).listen), 9, Ln),
      n("button", {
        type: "button",
        onClick: s[2] || (s[2] = (t) => v.$emit("dismiss"))
      }, r(l(Ve).dismiss), 1)
    ])]));
  }
}), Qt = Sn;
function Re(e) {
  return {
    picked: [],
    text: "",
    values: {},
    order: e.kind === "order" ? e.options.map((v) => v.id) : []
  };
}
function Tt(e, v) {
  const s = Re(v);
  return !!e.text.trim() || !!e.picked.length || Object.values(e.values).some((t) => !!t.trim()) || e.order.length !== s.order.length || e.order.some((t, o) => t !== s.order[o]);
}
function Xt(e) {
  return e.stage.exercises.flatMap((v) => {
    const s = e.exercises.find((C) => C.id === v.exerciseId), t = e.attempts.find((C) => C.id === v.revisionAttemptId), o = t && e.assessments.some((C) => C.attemptId === t.id && C.verdict !== "disputed"), d = o ? t : e.attempts.find((C) => C.id === (t?.revisesAttemptId ?? v.draftAttemptId));
    if (!s || s.response.kind !== "text" || !d) return [];
    const c = e.assessments.find((C) => C.attemptId === d.id), b = o ? void 0 : t;
    return [{
      row: v,
      exercise: s,
      draft: d,
      assessment: c,
      revision: b,
      review: b && e.assessments.find((C) => C.attemptId === b.id),
      annotations: c?.annotations ?? []
    }];
  });
}
function ea(e) {
  const v = (s) => s.trim() || null;
  return {
    exam: v(e.exam),
    level: v(e.level),
    targetLevel: v(e.targetLevel),
    explanationLanguage: e.explanationLanguage,
    interests: v(e.interests)
  };
}
var Ke = () => ({
  text: "",
  cursor: void 0,
  focus: null,
  study: null,
  sent: null,
  scroll: 0,
  following: !0
});
function An() {
  const e = Ie({}), v = Ie(Ke()), s = Ie(Ke()), t = Ie({
    open: !1,
    form: {
      exam: "",
      level: "",
      targetLevel: "",
      explanationLanguage: "zh-CN",
      interests: ""
    },
    submitted: null
  }), o = Ie({ enabled: !1 }), d = Ie({
    step: 0,
    name: "",
    note: ""
  }), c = Ie({
    tab: "grammar",
    reason: ""
  });
  return {
    units: e,
    chat: v,
    workbenchChat: s,
    settings: t,
    companion: o,
    setup: d,
    books: c,
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
        for (const f of Object.keys(e)) delete e[f];
        t.open = !1, t.submitted = null, Object.assign(s, Ke());
      }
      Object.assign(v, Ke()), o.enabled = !1, b || Object.assign(d, {
        step: 0,
        name: "",
        note: ""
      }), Object.assign(c, {
        tab: "grammar",
        reason: ""
      });
    },
    reconcile(b) {
      const C = t.submitted;
      C && b.storage === "ready" && !b.busy && b.profile && Object.entries(C.value).every(([f, $]) => b.profile.settings[f] === $) && (Object.entries(C.form).every(([f, $]) => t.form[f] === $) && (t.open = !1), t.submitted = null);
      for (const f of Object.keys(e)) {
        const $ = [b.unit, b.review].find((k) => k?.id === f);
        if (!$) {
          delete e[f];
          continue;
        }
        for (const [k, y] of Object.entries(e[f].review.drafts)) {
          const w = $.attempts.filter((u) => u.exerciseId === k).at(-1);
          y.submitted && w && w.id !== y.submitted.before && delete e[f].review.drafts[k];
        }
        for (const [k, y] of Object.entries(e[f].activityDrafts)) {
          const w = $.attempts.filter((u) => u.exerciseId === k).at(-1);
          if (y.submitted && w && w.id !== y.submitted.before) {
            delete e[f].activityDrafts[k];
            const u = e[f].activities[`exercise:${k}`];
            u && (u.retry = !1);
          }
        }
        const m = e[f].selection;
        m && $.materials.find((k) => k.id === m.materialId)?.paragraphs.find((k) => k.id === m.paragraphId)?.text.slice(m.start, m.end) !== m.quote && (e[f].selection = null);
        for (const [k, y] of Object.entries(e[f].writing)) {
          const w = $.attempts.filter((x) => x.exerciseId === k && !x.revisesAttemptId).at(-1), u = y.submitted;
          !u || !w || w.id === u.before || (y.text === u.text && w.answer.kind === "text" && w.answer.text === u.text.trim() ? (y.text = "", y.rewriting = !1) : y.rewriting = !0, y.submitted = null);
        }
      }
      for (const [f, $] of [[v, b.conversation], [s, b.workbenchConversation]]) {
        const m = f.sent;
        m && $.turns.some((k, y) => y + $.removedTurns >= m.after && k.purpose === "talk" && k.user === m.user) && (f.text === m.text && (f.text = "", f.focus = null), f.sent = null);
      }
    }
  };
}
var ta = /* @__PURE__ */ Symbol("learning-ui-session");
function aa(e, v) {
  if (e.chat.text.trim() || e.workbenchChat.text.trim() || e.settings.open && Object.entries(ea(e.settings.form)).some(([s, t]) => v.profile?.settings[s] !== t) || e.setup.step === 1 && e.setup.name.trim() && (e.setup.name.trim() !== v.teacher?.name || e.setup.note.trim() !== v.teacher.note)) return !0;
  for (const s of [v.unit, v.review]) {
    const t = s && e.units[s.id];
    if (!(!s || !t)) {
      if (Object.values(t.writing).some((o) => !!o.text.trim()) || Object.keys(t.edits).length && Xt(s).some((o) => o.row.status === "revising" && o.annotations.some((d) => t.edits[d.id] && t.edits[d.id].value !== d.quote))) return !0;
      for (const o of s.exercises) {
        const d = t.activityDrafts[o.id]?.value, c = t.review.drafts[o.id];
        if (d && Tt(d, o.response) || c && (c.retry || !s.attempts.some((b) => b.exerciseId === o.id)) && Tt(c.value, o.response)) return !0;
      }
    }
  }
  return !1;
}
function Rn(e, v, s, t) {
  return s === "teacher" ? t.teacher?.name !== v.teacher?.name && !!e.chat.text.trim() : s === "language" && t.language !== v.language && aa(e, v);
}
function Mn(e) {
  const v = An();
  return ba(ta, v), J([
    () => e.value.chatIdentity,
    () => e.value.language,
    () => e.value.companionSessionId
  ], (s, t) => v.reset(s[0] === t[0], s[0] === t[0] && s[1] === t[1])), J(() => e.value, (s) => v.reconcile(s), { immediate: !0 }), J(() => [e.value.unit?.id, e.value.review?.id], (s) => {
    for (const t of [v.chat, v.workbenchChat])
      t.focus?.unitId && !s.includes(t.focus.unitId) && (t.focus = null), t.study && !s.includes(t.study.unitId) && (t.study = null);
  }), J(() => aa(v, e.value), (s, t, o) => {
    if (!s) return;
    const d = (c) => {
      c.preventDefault(), c.returnValue = "";
    };
    window.addEventListener("beforeunload", d), o(() => window.removeEventListener("beforeunload", d));
  }, { immediate: !0 }), v;
}
function Ne() {
  const e = ya(ta);
  if (!e) throw new Error("Learning views require their application session");
  return e;
}
function Te(e) {
  const v = Ne();
  return L(() => v.unit(e()));
}
var En = ["onKeydown"], Nn = {
  role: "dialog",
  "aria-labelledby": "learning-activity-title",
  class: "learning-activity"
}, Tn = { class: "learning-activity-header" }, On = { id: "learning-activity-title" }, Bn = {
  key: 0,
  "aria-label": "完成本课的固定奖励"
}, qn = {
  key: 0,
  class: "learning-margin-note",
  role: "status"
}, Pn = ["open"], _n = {
  key: 3,
  class: "learning-question"
}, Vn = { class: "learning-help-actions" }, Un = ["disabled"], Dn = ["disabled"], jn = ["disabled"], Wn = {
  key: 0,
  class: "learning-margin-note"
}, Gn = {
  key: 1,
  class: "learning-margin-note"
}, Fn = { key: 0 }, Hn = { key: 1 }, zn = { key: 2 }, Yn = ["disabled"], Kn = /* @__PURE__ */ X({
  __name: "LearningActivity",
  props: {
    state: {},
    target: {},
    active: { type: Boolean },
    disabled: { type: Boolean }
  },
  emits: [
    "action",
    "close",
    "ask"
  ],
  setup(e, { emit: v }) {
    const s = e, t = v, o = H(null), d = Te(() => s.target.unitId), c = L(() => `${s.target.kind}:${s.target.id}`);
    J([d, c], () => {
      d.value.activities[c.value] ??= {
        scroll: 0,
        selected: null,
        retry: !1,
        materialsOpen: !1
      };
    }, { immediate: !0 });
    const b = L(() => d.value.activities[c.value]), C = H(null), f = L({
      get: () => b.value.retry,
      set: (S) => {
        b.value.retry = S;
      }
    }), $ = L({
      get: () => b.value.selected,
      set: (S) => {
        b.value.selected = S;
      }
    }), m = H(null);
    function k() {
      $.value ? $.value = null : f.value ? f.value = !1 : t("close");
    }
    ct(L(() => s.active ? m.value : null), k, () => !1);
    const y = L(() => d.value.activityDrafts);
    let w = null;
    const u = L(() => s.target?.kind === "exercise" ? s.state.unit?.exercises.find((S) => S.id === s.target?.id) : void 0), x = L(() => s.state.unit?.materials.filter((S) => s.target?.kind === "material" ? S.id === s.target.id : u.value?.materialIds.includes(S.id)) ?? []), T = L(() => u.value?.id ?? s.state.unit?.exercises.find((S) => S.skill === "listening" && S.materialIds.includes(s.target?.id ?? ""))?.id ?? s.state.unit?.exercises.find((S) => S.materialIds.includes(s.target?.id ?? ""))?.id), D = L(() => x.value.filter((S) => u.value?.response.kind !== "evidence" || S.id === u.value.response.materialId).flatMap((S) => S.paragraphs)), E = L(() => s.state.unit?.attempts.filter((S) => S.exerciseId === u.value?.id).at(-1)), ee = L(() => s.state.unit?.assessments.find((S) => S.attemptId === E.value?.id));
    J(() => u.value, (S) => {
      if (!S) return;
      const I = JSON.stringify(S.response);
      y.value[S.id]?.response !== I && (y.value[S.id] = {
        response: I,
        value: Re(S.response)
      });
    }, { immediate: !0 });
    const W = L({
      get: () => y.value[u.value.id].value,
      set: (S) => {
        y.value[u.value.id].value = S;
      }
    });
    J([() => s.active, C], ([S, I]) => {
      S && I?.focus({ preventScroll: !0 });
    }, { flush: "post" }), Me(() => {
      o.value && (o.value.scrollTop = b.value.scroll);
    }), Ee(() => {
      o.value && (b.value.scroll = o.value.scrollTop);
    }), J(() => s.state.unit?.attempts, (S) => {
      if (!w) return;
      const I = S?.filter((q) => q.exerciseId === w.id).at(-1);
      if (I && I.id !== w.before) {
        const q = s.target?.kind === "exercise" && s.target.id === w.id;
        delete y.value[w.id], w = null, q && t("close");
      }
    });
    function R(S) {
      w = {
        id: u.value.id,
        before: E.value?.id
      }, y.value[u.value.id].submitted = { before: E.value?.id }, t("action", "submit", {
        unitId: s.state.unit.id,
        exerciseId: u.value.id,
        answer: S
      });
    }
    return (S, I) => (a(), i("div", {
      ref_key: "layer",
      ref: m,
      class: "learning-activity-shade",
      onKeydown: Ae(ve(k, ["stop", "prevent"]), ["esc"])
    }, [n("section", Nn, [
      n("header", Tn, [
        n("h2", On, r(u.value ? "练习" : x.value[0]?.title ?? "材料"), 1),
        e.state.unit ? (a(), i("small", Bn, "+" + r(e.state.unit.reward.amount) + " 币", 1)) : g("", !0),
        n("button", {
          ref_key: "closeButton",
          ref: C,
          type: "button",
          "aria-label": "收起课件",
          onClick: I[0] || (I[0] = (q) => t("close"))
        }, [I[18] || (I[18] = z("收起", -1)), F(Z, { name: "back" })], 512)
      ]),
      e.state.message && !e.state.busy ? (a(), i("p", qn, r(e.state.message), 1)) : g("", !0),
      n("div", {
        ref_key: "body",
        ref: o,
        class: "learning-activity-body"
      }, [
        u.value && x.value.length ? (a(), i("details", {
          key: 0,
          class: "learning-activity-materials",
          open: b.value.materialsOpen,
          onToggle: I[3] || (I[3] = (q) => b.value.materialsOpen = q.target.open)
        }, [n("summary", null, "阅读材料 · " + r(x.value.length), 1), (a(!0), i(M, null, j(x.value, (q) => (a(), Q(Mt, {
          key: q.id,
          material: q,
          "exercise-id": T.value,
          disabled: e.disabled,
          onAction: I[1] || (I[1] = (G, O) => t("action", G, O)),
          onSelect: I[2] || (I[2] = (G) => $.value = G)
        }, null, 8, [
          "material",
          "exercise-id",
          "disabled"
        ]))), 128))], 40, Pn)) : u.value ? g("", !0) : (a(!0), i(M, { key: 1 }, j(x.value, (q) => (a(), Q(Mt, {
          key: q.id,
          material: q,
          "exercise-id": T.value,
          disabled: e.disabled,
          onAction: I[4] || (I[4] = (G, O) => t("action", G, O)),
          onSelect: I[5] || (I[5] = (G) => $.value = G)
        }, null, 8, [
          "material",
          "exercise-id",
          "disabled"
        ]))), 128)),
        $.value ? (a(), Q(Qt, {
          key: 2,
          selection: $.value,
          disabled: e.disabled,
          onAsk: I[6] || (I[6] = (q) => t("ask", T.value, $.value)),
          onSay: I[7] || (I[7] = (q) => t("action", "say", { selection: $.value })),
          onDismiss: I[8] || (I[8] = (q) => $.value = null)
        }, null, 8, ["selection", "disabled"])) : g("", !0),
        u.value ? (a(), i("section", _n, [
          n("h2", null, r(u.value.prompt), 1),
          n("div", Vn, [
            n("button", {
              type: "button",
              disabled: e.disabled || [...u.value.prompt].length > 1e3,
              onClick: I[9] || (I[9] = (q) => t("action", "say-question", { exerciseId: u.value.id }))
            }, "听题干", 8, Un),
            u.value.hasHint ? (a(), i("button", {
              key: 0,
              type: "button",
              disabled: e.disabled || u.value.hint !== null,
              onClick: I[10] || (I[10] = (q) => t("action", "reveal", {
                kind: "hints",
                id: u.value.id
              }))
            }, "提示", 8, Dn)) : g("", !0),
            n("button", {
              type: "button",
              disabled: e.disabled || u.value.solution !== null,
              onClick: I[11] || (I[11] = (q) => t("action", "reveal", {
                kind: "answers",
                id: u.value.id
              }))
            }, "解答", 8, jn),
            n("button", {
              type: "button",
              onClick: I[12] || (I[12] = (q) => t("ask", u.value.id))
            }, "问语伴")
          ]),
          u.value.hint ? (a(), i("p", Wn, r(u.value.hint), 1)) : g("", !0),
          u.value.solution ? (a(), i("div", Gn, [u.value.solution.kind === "exact" ? (a(), i("p", Fn, r(l(bt)(u.value.solution.answer, u.value.response, D.value)), 1)) : u.value.solution.kind === "gaps" ? (a(), i("p", Hn, r(u.value.solution.accepted.map((q) => q.forms.join(" / ")).join(`
`)), 1)) : g("", !0), u.value.solution.kind !== "semantic" ? (a(), i("p", zn, r(u.value.solution.explanation), 1)) : (a(), i("button", {
            key: 3,
            type: "button",
            onClick: I[13] || (I[13] = (q) => t("ask", u.value.id))
          }, "请语伴讲解"))])) : g("", !0),
          (!E.value || f.value) && y.value[u.value.id] ? (a(), Q(pt, {
            key: u.value.id,
            modelValue: W.value,
            "onUpdate:modelValue": I[14] || (I[14] = (q) => W.value = q),
            response: u.value.response,
            paragraphs: D.value,
            disabled: e.disabled,
            onSubmit: R
          }, null, 8, [
            "modelValue",
            "response",
            "paragraphs",
            "disabled"
          ])) : g("", !0),
          E.value ? (a(), Q(mt, {
            key: 3,
            attempt: E.value,
            feedback: ee.value,
            response: u.value.response,
            paragraphs: D.value,
            disabled: e.disabled,
            reviewable: e.state.unit.attemptActions[E.value.id].review,
            onAction: I[15] || (I[15] = (q, G) => {
              t("action", q, G), t("close");
            })
          }, null, 8, [
            "attempt",
            "feedback",
            "response",
            "paragraphs",
            "disabled",
            "reviewable"
          ])) : g("", !0),
          E.value ? (a(), i("button", {
            key: 4,
            type: "button",
            disabled: e.disabled,
            onClick: I[16] || (I[16] = (q) => {
              f.value = !f.value, y.value[u.value.id] ??= {
                response: JSON.stringify(u.value.response),
                value: l(Re)(u.value.response)
              };
            })
          }, r(f.value ? "收起再练" : "再试一次"), 9, Yn)) : g("", !0)
        ])) : g("", !0)
      ], 512),
      F(Zt, {
        state: e.state,
        onAction: I[17] || (I[17] = (q, G) => t("action", q, G))
      }, null, 8, ["state"])
    ])], 40, En));
  }
}), Jn = Kn, Zn = {
  role: "alertdialog",
  "aria-labelledby": "learning-approval-title",
  "aria-describedby": "learning-approval-detail",
  class: "learning-confirm"
}, Qn = { id: "learning-approval-title" }, Xn = { id: "learning-approval-detail" }, ei = { class: "learning-row" }, ti = ["disabled"], ai = ["disabled"], ni = /* @__PURE__ */ X({
  __name: "LearningApproval",
  props: {
    approval: {},
    pending: { type: Boolean }
  },
  emits: ["action"],
  setup(e, { emit: v }) {
    const s = e, t = v, o = H(null), d = (c) => t("action", "approve-operation", {
      id: s.approval.id,
      approved: c
    });
    return ct(o, () => d(!1)), (c, b) => (a(), i("div", {
      ref_key: "layer",
      ref: o,
      class: "learning-confirm-shade",
      onKeydown: b[2] || (b[2] = Ae(ve((C) => d(!1), ["stop", "prevent"]), ["esc"]))
    }, [n("section", Zn, [
      n("h2", Qn, r(l(Ye).title), 1),
      n("p", null, r(e.approval.title), 1),
      n("p", Xn, r(l(Ye).detail), 1),
      n("div", ei, [n("button", {
        autofocus: "",
        type: "button",
        disabled: e.pending,
        onClick: b[0] || (b[0] = (C) => d(!1))
      }, r(l(Ye).decline), 9, ti), n("button", {
        type: "button",
        class: "learning-primary",
        disabled: e.pending,
        onClick: b[1] || (b[1] = (C) => d(!0))
      }, r(l(Ye).accept), 9, ai)])
    ])], 544));
  }
}), ii = ni;
function li(e, v) {
  return /^(zh|ja|ko)\b/iu.test(v) ? {
    count: [...e.replace(/[\s\p{P}\p{S}]/gu, "")].length,
    unit: "characters"
  } : {
    count: e.match(/[\p{L}\p{N}][\p{L}\p{N}\p{M}'’-]*/gu)?.length ?? 0,
    unit: "words"
  };
}
var si = 864e5;
function Ot(e, v) {
  const s = li(e, v);
  return {
    count: s.count,
    unit: s.unit === "characters" ? "字" : "词"
  };
}
function na(e, v) {
  const s = [], t = /* @__PURE__ */ new Map();
  for (const o of v)
    if (o.quote)
      for (let d = e.indexOf(o.quote); d >= 0; d = e.indexOf(o.quote, d + 1)) {
        const c = d + o.quote.length;
        if (!s.some(([b, C]) => d < C && b < c)) {
          s.push([d, c]), t.set(o.id, d);
          break;
        }
      }
  return t;
}
function ri(e, v) {
  const s = e.split(/(\r?\n)/u), t = [];
  s.forEach((f, $) => {
    $ % 2 === 0 && f.trim() && t.push($);
  });
  const o = [], d = [], c = /* @__PURE__ */ new Map();
  for (const f of v) c.set(f.paragraphIndex, [...c.get(f.paragraphIndex) ?? [], f]);
  for (const [f, $] of c) {
    const m = t[f];
    if (m === void 0) {
      o.push(...$.map((u) => u.id));
      continue;
    }
    const k = na(s[m], $), y = $.filter((u) => k.has(u.id)).sort((u, x) => k.get(x.id) - k.get(u.id));
    let w = s[m];
    for (const u of y) {
      const x = k.get(u.id);
      w = w.slice(0, x) + u.replacement + w.slice(x + u.quote.length), u.replacement !== u.quote && d.push(u.id);
    }
    s[m] = w, o.push(...$.filter((u) => !k.has(u.id)).map((u) => u.id));
  }
  const b = new Map(v.map((f, $) => [f.id, $])), C = (f, $) => b.get(f) - b.get($);
  return {
    text: s.join(""),
    missing: o.sort(C),
    applied: d.sort(C)
  };
}
function oi(e, v) {
  const s = na(e, v), t = v.filter((c) => s.has(c.id)).map((c) => ({
    id: c.id,
    start: s.get(c.id),
    length: c.quote.length
  })).sort((c, b) => c.start - b.start), o = [];
  let d = 0;
  for (const c of t)
    c.start > d && o.push({ text: e.slice(d, c.start) }), o.push({
      text: e.slice(c.start, c.start + c.length),
      id: c.id
    }), d = c.start + c.length;
  return (d < e.length || !o.length) && o.push({ text: e.slice(d) }), o;
}
function ui(e, v = "xiaobai-learning-seen-units") {
  const s = /* @__PURE__ */ new Set(), t = () => {
    try {
      const o = JSON.parse(e()?.getItem(v) ?? "[]");
      return Array.isArray(o) ? o.filter((d) => typeof d == "string") : [];
    } catch {
      return [];
    }
  };
  return {
    has: (o) => s.has(o) || t().includes(o),
    mark(o) {
      s.add(o);
      try {
        e()?.setItem(v, JSON.stringify([.../* @__PURE__ */ new Set([...t(), o])].slice(-50)));
      } catch {
      }
    }
  };
}
var di = () => {
  try {
    return globalThis.localStorage;
  } catch {
    return null;
  }
}, Bt = ui(di);
function ft(e, v = Date.now()) {
  const s = new Date(e), t = new Date(v), o = Math.round((Date.UTC(s.getFullYear(), s.getMonth(), s.getDate()) - Date.UTC(t.getFullYear(), t.getMonth(), t.getDate())) / si);
  return !Number.isFinite(o) || o <= 0 ? "今天复习" : o === 1 ? "明天再见" : `${o} 天后再见`;
}
var vi = { class: "learning-records-page" }, ci = {
  key: 0,
  class: "learning-page-heading"
}, gi = {
  key: 0,
  class: "learning-muted"
}, pi = { class: "learning-muted" }, bi = {
  key: 0,
  class: "learning-muted"
}, mi = ["disabled", "onClick"], fi = {
  key: 0,
  class: "learning-muted"
}, ki = ["disabled"], yi = {
  key: 0,
  class: "learning-empty-note"
}, hi = ["disabled", "onClick"], $i = ["title"], wi = {
  key: 1,
  class: "learning-row"
}, xi = ["disabled"], Ci = { class: "learning-muted" }, Ii = ["disabled"], Li = /* @__PURE__ */ X({
  __name: "LearningRecords",
  props: {
    state: {},
    disabled: { type: Boolean },
    embedded: { type: Boolean }
  },
  emits: ["action", "remove"],
  setup(e, { emit: v }) {
    const s = e, t = v;
    Ze(() => s.state.record ? (t("action", "records", { offset: s.state.records.offset }), !0) : !1);
    const o = {
      deleteAnswer: "删除这次作答",
      deleteRecord: "删除记录",
      answerWarning: "这次作答和对应的反馈会删除，相关知识点的掌握情况会更新。已到账奖励保留。",
      recordWarning: "这条学习记录会删除，仅属于它的历史作答也会删除。当前练习不受影响。",
      hidden: "听力原文暂未显示，下面是你的作答和点评。"
    };
    return (d, c) => (a(), i("section", vi, [!e.embedded || e.state.record ? (a(), i("div", ci, [c[5] || (c[5] = n("h1", null, "学习记录", -1)), e.state.records.total ? (a(), i("span", gi, r(e.state.records.total) + " 项", 1)) : g("", !0)])) : g("", !0), e.state.record ? (a(), i(M, { key: 1 }, [
      n("button", {
        type: "button",
        onClick: c[0] || (c[0] = (b) => d.$emit("action", "records", { offset: e.state.records.offset }))
      }, "‹ 返回记录"),
      n("h2", null, r(e.state.record.label), 1),
      (a(!0), i(M, null, j(e.state.record.evidence, (b) => (a(), i("article", {
        key: b.attempt.id,
        class: "learning-record-evidence"
      }, [
        n("p", pi, r(new Date(b.attempt.submittedAt).toLocaleDateString()), 1),
        n("h3", null, r(b.exercise.prompt), 1),
        (a(!0), i(M, null, j(b.materials, (C) => (a(), i("details", { key: C.id }, [n("summary", null, r(C.title), 1), C.hidden ? (a(), i("p", bi, r(o.hidden), 1)) : (a(!0), i(M, { key: 1 }, j(C.paragraphs, (f) => (a(), i("p", { key: f.id }, r(f.text), 1))), 128))]))), 128)),
        F(mt, {
          attempt: b.attempt,
          feedback: b.assessment,
          response: b.exercise.response,
          paragraphs: b.materials.flatMap((C) => C.paragraphs),
          disabled: e.disabled,
          reviewable: b.actions.review,
          onAction: c[1] || (c[1] = (C, f) => d.$emit("action", C, f))
        }, null, 8, [
          "attempt",
          "feedback",
          "response",
          "paragraphs",
          "disabled",
          "reviewable"
        ]),
        n("button", {
          type: "button",
          disabled: e.disabled || !b.actions.remove,
          onClick: (C) => d.$emit("remove", "delete-attempt", { id: b.attempt.id }, o.answerWarning)
        }, r(o.deleteAnswer), 9, mi),
        b.actions.remove ? g("", !0) : (a(), i("p", fi, r(l(Ht).hiddenRevisions), 1))
      ]))), 128)),
      n("button", {
        type: "button",
        disabled: e.disabled,
        onClick: c[2] || (c[2] = (b) => d.$emit("remove", "delete-item", { id: e.state.record.id }, o.recordWarning))
      }, r(o.deleteRecord), 9, ki)
    ], 64)) : (a(), i(M, { key: 2 }, [
      e.state.records.total ? g("", !0) : (a(), i("p", yi, "暂无学习记录")),
      (a(!0), i(M, null, j(e.state.records.items, (b) => (a(), i("button", {
        key: b.id,
        class: "learning-record-row",
        type: "button",
        disabled: !b.readable,
        onClick: (C) => d.$emit("action", "records", {
          id: b.id,
          offset: e.state.records.offset
        })
      }, [n("span", null, [n("strong", null, r(b.label), 1), n("small", null, [z(r(l(Kt)(b.evidenceCount)), 1), b.nextReviewAt ? (a(), i("span", {
        key: 0,
        title: b.scheduleReason ?? void 0
      }, " · " + r(l(ft)(b.nextReviewAt)) + "（" + r(new Date(b.nextReviewAt).toLocaleDateString()) + "）", 9, $i)) : g("", !0)])]), n("em", null, r(l(Yt)[b.state]), 1)], 8, hi))), 128)),
      e.state.records.total > 30 ? (a(), i("div", wi, [
        n("button", {
          type: "button",
          disabled: e.state.records.offset === 0,
          onClick: c[3] || (c[3] = (b) => d.$emit("action", "records", { offset: Math.max(0, e.state.records.offset - 30) }))
        }, "上一页", 8, xi),
        n("span", Ci, r(e.state.records.total) + " 项", 1),
        n("button", {
          type: "button",
          disabled: e.state.records.offset + 30 >= e.state.records.total,
          onClick: c[4] || (c[4] = (b) => d.$emit("action", "records", { offset: e.state.records.offset + 30 }))
        }, "下一页", 8, Ii)
      ])) : g("", !0)
    ], 64))]));
  }
}), qt = Li, Si = { class: "learning-books-page" }, Ai = { class: "learning-page-heading" }, Ri = {
  key: 0,
  class: "learning-due"
}, Mi = { key: 0 }, Ei = { key: 1 }, Ni = ["disabled"], Ti = {
  class: "learning-tabs",
  role: "tablist",
  "aria-label": "学习记录视图"
}, Oi = ["aria-selected", "onClick"], Bi = {
  key: 0,
  class: "learning-empty-note"
}, qi = { class: "learning-book-list" }, Pi = ["disabled", "onClick"], _i = ["aria-expanded", "onClick"], Vi = {
  key: 1,
  class: "learning-chip-reason"
}, Ui = {
  key: 2,
  class: "learning-growth"
}, Di = {
  key: 0,
  class: "learning-empty-note"
}, ji = { class: "learning-muted" }, Wi = { key: 0 }, Gi = { key: 0 }, Fi = { key: 1 }, Hi = { key: 2 }, zi = /* @__PURE__ */ X({
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
  setup(e, { emit: v }) {
    const s = e, t = v, o = Ne().books, d = ke(o, "tab"), c = [
      ["grammar", "语法本"],
      ["vocabulary", "生词本"],
      ["growth", "成长"],
      ["all", "全部记录"]
    ], b = { title: "学习本" }, C = ke(o, "reason"), f = L(() => d.value === "grammar" || d.value === "vocabulary" ? s.state.books[d.value] : []), $ = L(() => s.state.growth), m = L(() => !!s.state.review && s.state.review.stage.stage !== "complete");
    return (k, y) => (a(), i("section", Si, [e.state.record ? (a(), Q(qt, {
      key: 0,
      state: e.state,
      disabled: e.disabled,
      onAction: y[0] || (y[0] = (w, u) => t("action", w, u)),
      onRemove: y[1] || (y[1] = (w, u, x) => t("remove", w, u, x))
    }, null, 8, ["state", "disabled"])) : (a(), i(M, { key: 1 }, [
      n("div", Ai, [n("h1", null, r(b.title), 1)]),
      e.state.dueCount || m.value ? (a(), i("div", Ri, [e.state.dueCount ? (a(), i("span", Mi, r(l(Jt)(e.state.dueCount)), 1)) : g("", !0), e.state.blockedReview ? (a(), i("small", Ei, "有一组复习在另一个故事中进行，回到学习页可以放下它")) : m.value ? (a(), i("button", {
        key: 3,
        type: "button",
        class: "learning-primary",
        onClick: y[3] || (y[3] = (w) => t("review"))
      }, r(l(ae).resumeReview), 1)) : (a(), i("button", {
        key: 2,
        type: "button",
        class: "learning-primary",
        disabled: e.disabled,
        onClick: y[2] || (y[2] = (w) => t("action", "start-review"))
      }, r(l(ae).review), 9, Ni))])) : g("", !0),
      n("div", Ti, [(a(), i(M, null, j(c, ([w, u]) => n("button", {
        key: w,
        type: "button",
        role: "tab",
        "aria-selected": d.value === w,
        onClick: (x) => {
          d.value = w, C.value = "";
        }
      }, r(u), 9, Oi)), 64))]),
      d.value === "grammar" || d.value === "vocabulary" ? (a(), i(M, { key: 1 }, [f.value.length ? g("", !0) : (a(), i("p", Bi, r(d.value === "grammar" ? "批改里出现的语法问题会记到这里。" : "批改里的词汇问题、读文章时收藏的词语会记到这里。"), 1)), n("ul", qi, [(a(!0), i(M, null, j(f.value, (w) => (a(), i("li", { key: w.id }, [
        n("button", {
          type: "button",
          class: "learning-book-item",
          disabled: !w.readable,
          onClick: (u) => t("action", "records", {
            id: w.id,
            offset: e.state.records.offset
          })
        }, [n("strong", null, r(w.label), 1), n("small", null, r(l(Yt)[w.state]) + " · " + r(l(Kt)(w.evidenceCount)), 1)], 8, Pi),
        w.nextReviewAt ? (a(), i("button", {
          key: 0,
          type: "button",
          class: "learning-chip",
          "aria-expanded": C.value === w.id,
          onClick: (u) => C.value = C.value === w.id ? "" : w.id
        }, r(l(ft)(w.nextReviewAt)), 9, _i)) : g("", !0),
        C.value === w.id ? (a(), i("small", Vi, r(w.scheduleReason), 1)) : g("", !0)
      ]))), 128))])], 64)) : d.value === "growth" ? (a(), i("section", Ui, [$.value.enough ? (a(), i(M, { key: 1 }, [
        n("p", ji, [z("来自 " + r($.value.evidence) + " 份作答", 1), $.value.completed ? (a(), i("span", Wi, "、" + r($.value.completed) + " 次完成", 1)) : g("", !0)]),
        $.value.steady.length ? (a(), i("div", Gi, [y[6] || (y[6] = n("h2", null, "已经稳定", -1)), n("p", null, r($.value.steady.join("、")), 1)])) : g("", !0),
        $.value.practising.length ? (a(), i("div", Fi, [y[7] || (y[7] = n("h2", null, "最近独立做对", -1)), n("p", null, r($.value.practising.join("、")), 1)])) : g("", !0),
        $.value.struggling.length ? (a(), i("div", Hi, [y[8] || (y[8] = n("h2", null, "还要再练", -1)), n("p", null, r($.value.struggling.join("、")), 1)])) : g("", !0)
      ], 64)) : (a(), i("p", Di, "还需要几次练习才看得出"))])) : (a(), Q(qt, {
        key: 3,
        embedded: "",
        state: e.state,
        disabled: e.disabled,
        onAction: y[4] || (y[4] = (w, u) => t("action", w, u)),
        onRemove: y[5] || (y[5] = (w, u, x) => t("remove", w, u, x))
      }, null, 8, ["state", "disabled"]))
    ], 64))]));
  }
}), Yi = zi, Ki = {
  class: "learning-settings-card",
  "aria-label": "训练设置"
}, Ji = { key: 0 }, Zi = ["disabled"], Qi = ["open"], Xi = ["value"], el = { class: "learning-row" }, tl = ["disabled"], al = /* @__PURE__ */ X({
  __name: "LearningSettingsCard",
  props: {
    state: {},
    disabled: { type: Boolean },
    onboarding: { type: Boolean }
  },
  emits: ["action"],
  setup(e, { emit: v }) {
    const s = e, t = v, o = [
      ["zh-CN", "中文"],
      ["en", "English"],
      ["ja", "日本語"],
      ["ko", "한국어"]
    ], d = L(() => s.state.profile?.settings ?? null), c = Ne().settings, b = c.form, C = ke(c, "open");
    function f() {
      Object.assign(b, {
        exam: d.value?.exam ?? "",
        level: d.value?.level ?? "",
        targetLevel: d.value?.targetLevel ?? "",
        explanationLanguage: d.value?.explanationLanguage ?? "zh-CN",
        interests: d.value?.interests ?? ""
      });
    }
    s.onboarding && !c.open && (f(), c.open = !0);
    const $ = (w) => o.find(([u]) => u === w)?.[1] ?? new Intl.DisplayNames(["zh-CN"], { type: "language" }).of(w) ?? w, m = L(() => [.../* @__PURE__ */ new Set([...o.map(([w]) => w), d.value?.explanationLanguage ?? "zh-CN"])]), k = L(() => [
      ["考试", d.value?.exam || "不备考"],
      ["水平", d.value?.level || "不确定"],
      ["目标", d.value?.targetLevel || "比现在高一级"],
      ["讲解", $(d.value?.explanationLanguage ?? "zh-CN")],
      ["兴趣", d.value?.interests || "不限"]
    ]);
    function y() {
      const w = ea(b);
      c.submitted = {
        value: w,
        form: { ...b }
      }, t("action", "settings", { value: w });
    }
    return (w, u) => (a(), i("section", Ki, [C.value ? g("", !0) : (a(), i("dl", Ji, [(a(!0), i(M, null, j(k.value, ([x, T]) => (a(), i("div", { key: x }, [n("dt", null, r(x), 1), n("dd", null, r(T), 1)]))), 128))])), C.value ? (a(), i("form", {
      key: 2,
      class: "learning-fields",
      onSubmit: ve(y, ["prevent"])
    }, [
      n("label", null, [u[7] || (u[7] = z("考试", -1)), se(n("input", {
        "onUpdate:modelValue": u[1] || (u[1] = (x) => l(b).exam = x),
        type: "text",
        maxlength: "80",
        placeholder: "不备考（例如 雅思、JLPT N2）"
      }, null, 512), [[ge, l(b).exam]])]),
      n("label", null, [u[8] || (u[8] = z("现在的水平", -1)), se(n("input", {
        "onUpdate:modelValue": u[2] || (u[2] = (x) => l(b).level = x),
        type: "text",
        maxlength: "80",
        placeholder: "不确定"
      }, null, 512), [[ge, l(b).level]])]),
      n("label", null, [u[9] || (u[9] = z("目标", -1)), se(n("input", {
        "onUpdate:modelValue": u[3] || (u[3] = (x) => l(b).targetLevel = x),
        type: "text",
        maxlength: "80",
        placeholder: "比现在高一级"
      }, null, 512), [[ge, l(b).targetLevel]])]),
      n("details", {
        class: "learning-settings-optional",
        open: !e.onboarding
      }, [
        n("summary", null, r(l(ae).optionalSettings), 1),
        n("label", null, [u[10] || (u[10] = z("讲解语言", -1)), se(n("select", { "onUpdate:modelValue": u[4] || (u[4] = (x) => l(b).explanationLanguage = x) }, [(a(!0), i(M, null, j(m.value, (x) => (a(), i("option", {
          key: x,
          value: x
        }, r($(x)), 9, Xi))), 128))], 512), [[Je, l(b).explanationLanguage]])]),
        n("label", null, [u[11] || (u[11] = z("感兴趣的话题", -1)), se(n("input", {
          "onUpdate:modelValue": u[5] || (u[5] = (x) => l(b).interests = x),
          type: "text",
          maxlength: "200",
          placeholder: "不限"
        }, null, 512), [[ge, l(b).interests]])])
      ], 8, Qi),
      n("div", el, [e.onboarding ? g("", !0) : (a(), i("button", {
        key: 0,
        type: "button",
        onClick: u[6] || (u[6] = (x) => {
          C.value = !1, l(c).submitted = null;
        })
      }, "取消")), n("button", {
        type: "submit",
        class: "learning-primary",
        disabled: e.disabled
      }, r(e.onboarding ? l(ae).setupFinish : l(ae).saveSettings), 9, tl)])
    ], 32)) : (a(), i("button", {
      key: 1,
      type: "button",
      disabled: e.disabled,
      onClick: u[0] || (u[0] = (x) => {
        f(), C.value = !0;
      })
    }, "调整", 8, Zi))]));
  }
}), ia = al, nl = { class: "learning-profile-page" }, il = { class: "learning-setup-heading" }, ll = { class: "learning-eyebrow" }, sl = { class: "learning-language-options" }, rl = [
  "disabled",
  "aria-pressed",
  "onClick"
], ol = { "aria-hidden": "true" }, ul = ["disabled"], dl = {
  key: 0,
  class: "learning-setup-empty"
}, vl = { class: "learning-teacher-options" }, cl = [
  "disabled",
  "aria-pressed",
  "onClick"
], gl = { class: "learning-person-initial" }, pl = {
  key: 1,
  class: "learning-selected-teacher"
}, bl = { class: "learning-person-initial" }, ml = { key: 0 }, fl = ["open"], kl = ["disabled"], yl = ["disabled"], hl = ["disabled"], $l = { class: "learning-setup-actions" }, wl = ["disabled"], xl = ["disabled"], Cl = /* @__PURE__ */ X({
  __name: "LearningSetup",
  props: {
    state: {},
    disabled: { type: Boolean }
  },
  emits: ["action"],
  setup(e, { emit: v }) {
    const s = v, t = Ne().setup, o = ke(t, "step"), d = H(null), c = ke(t, "name"), b = ke(t, "note"), C = [
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
    async function f($) {
      o.value = $, await de(), d.value?.focus();
    }
    return Ze(() => o.value ? (f(o.value - 1), !0) : !1), ($, m) => (a(), i("section", nl, [n("div", il, [n("p", ll, r(o.value + 1) + " / " + r(l(ae).setupSteps), 1), n("h1", {
      ref_key: "heading",
      ref: d,
      tabindex: "-1"
    }, r(o.value === 0 ? "选择要学习的语言" : o.value === 1 ? "选择语伴" : l(ae).setupTitle), 513)]), o.value === 0 ? (a(), i(M, { key: 0 }, [n("div", sl, [(a(), i(M, null, j(C, ([k, y, w]) => n("button", {
      key: k,
      type: "button",
      disabled: e.disabled,
      "aria-pressed": e.state.language === k,
      onClick: (u) => s("action", "language", { language: k })
    }, [
      n("span", ol, r(w), 1),
      n("strong", null, r(y), 1),
      e.state.language === k ? (a(), Q(Z, {
        key: 0,
        name: "check"
      })) : g("", !0)
    ], 8, rl)), 64))]), n("button", {
      type: "button",
      class: "learning-primary learning-setup-next",
      disabled: e.disabled,
      onClick: m[0] || (m[0] = (k) => f(1))
    }, [m[7] || (m[7] = z("继续", -1)), F(Z, { name: "arrow" })], 8, ul)], 64)) : o.value === 1 ? (a(), i(M, { key: 1 }, [
      e.state.candidates.length ? g("", !0) : (a(), i("p", dl, "当前故事里还没有认识的人物，所以没有可选的语伴。可以在下面手动填一位：名字加一句身份说明。")),
      n("div", vl, [(a(!0), i(M, null, j(e.state.candidates, (k) => (a(), i("button", {
        key: k.name,
        type: "button",
        disabled: e.disabled,
        "aria-pressed": e.state.teacher?.name === k.name,
        onClick: (y) => s("action", "teacher", { teacher: {
          name: k.name,
          note: ""
        } })
      }, [
        n("span", gl, r([...k.name][0]), 1),
        n("strong", null, r(k.name), 1),
        e.state.teacher?.name === k.name ? (a(), Q(Z, {
          key: 0,
          name: "check"
        })) : g("", !0)
      ], 8, cl))), 128))]),
      e.state.teacher && !e.state.candidates.some((k) => k.name === e.state.teacher?.name) ? (a(), i("p", pl, [
        n("span", bl, r([...e.state.teacher.name][0]), 1),
        n("span", null, [z(r(e.state.teacher.name), 1), e.state.teacher.note ? (a(), i("small", ml, r(e.state.teacher.note), 1)) : g("", !0)]),
        F(Z, { name: "check" })
      ])) : g("", !0),
      n("details", {
        class: "learning-other-teacher",
        open: !e.state.candidates.length
      }, [n("summary", null, r(e.state.candidates.length ? "手动填写其他人物" : "手动填写"), 1), n("form", {
        class: "learning-fields",
        onSubmit: m[3] || (m[3] = ve((k) => s("action", "teacher", { teacher: {
          name: c.value.trim(),
          note: b.value.trim()
        } }), ["prevent"]))
      }, [
        n("label", null, [m[8] || (m[8] = z("名字", -1)), se(n("input", {
          "onUpdate:modelValue": m[1] || (m[1] = (k) => c.value = k),
          type: "text",
          maxlength: "80",
          placeholder: "例如 林老师",
          disabled: e.disabled
        }, null, 8, kl), [[ge, c.value]])]),
        n("label", null, [m[9] || (m[9] = z("一句身份说明", -1)), se(n("input", {
          "onUpdate:modelValue": m[2] || (m[2] = (k) => b.value = k),
          type: "text",
          maxlength: "200",
          placeholder: "例如 在东京长大的邻居，说话直爽",
          disabled: e.disabled
        }, null, 8, yl), [[ge, b.value]])]),
        n("button", {
          type: "submit",
          disabled: e.disabled || !c.value.trim()
        }, "选这位", 8, hl)
      ], 32)], 8, fl),
      n("div", $l, [n("button", {
        type: "button",
        disabled: e.disabled,
        onClick: m[4] || (m[4] = (k) => f(0))
      }, "上一步", 8, wl), n("button", {
        type: "button",
        class: "learning-primary",
        disabled: e.disabled,
        onClick: m[5] || (m[5] = (k) => f(2))
      }, [z(r(e.state.teacher ? l(ae).setupContinue : l(te).skipCompanion), 1), F(Z, { name: "arrow" })], 8, xl)])
    ], 64)) : (a(), Q(ia, {
      key: 2,
      onboarding: "",
      state: e.state,
      disabled: e.disabled,
      onAction: m[6] || (m[6] = (k, y) => s("action", k, y ?? {}))
    }, null, 8, ["state", "disabled"]))]));
  }
}), Il = Cl, Ll = { class: "learning-companion-control" }, Sl = {
  key: 0,
  class: "learning-sr-only"
}, Al = { class: "learning-companion-options" }, Rl = { class: "learning-companion-switch" }, Ml = ["aria-label"], El = { class: "learning-cost-note" }, Nl = /* @__PURE__ */ X({
  __name: "LearningCompanionControl",
  props: { name: {} },
  setup(e) {
    const v = ke(Ne().companion, "enabled"), s = {
      title: "陪读",
      on: "陪你学习中",
      off: "未开启",
      description: "开启后，你安静阅读时语伴会偶尔搭句话",
      costTitle: "费用说明",
      cost: "陪读消息和聊天一样，按你所用的 AI 服务计费。"
    };
    return (t, o) => (a(), i("details", Ll, [n("summary", null, [
      n("span", {
        class: ue(["learning-companion-light", { "is-on": v.value }]),
        "aria-hidden": "true"
      }, null, 2),
      z(r(v.value ? e.name ? `${e.name} · ${s.on}` : s.on : s.title), 1),
      v.value ? g("", !0) : (a(), i("span", Sl, r(s.off), 1))
    ]), n("div", Al, [n("label", Rl, [n("span", null, r(s.description), 1), se(n("input", {
      "onUpdate:modelValue": o[0] || (o[0] = (d) => v.value = d),
      type: "checkbox",
      role: "switch",
      "aria-label": s.title
    }, null, 8, Ml), [[ka, v.value]])]), n("details", El, [n("summary", null, r(s.costTitle), 1), n("small", null, r(s.cost), 1)])])]));
  }
}), la = Nl, ot = {
  unconfirmed: "还没确认保存是否成功，请先查看保存结果，不要重复提交。",
  conflict: "发现另一份学习记录，请先核对再继续。",
  unloaded: "暂时打不开学习记录。",
  failed: "这次没能保存，之前保存的内容都还在，请重试。"
}, be = {
  paid: "奖励已到账",
  retired: "钱包已重置，这份奖励不再补发",
  saving: "正在保存学习成果…",
  pending: "学习已完成，奖励待领取",
  needsWallet: "开通钱包后即可领取",
  claim: "领取奖励",
  openWallet: "开通钱包并领取",
  unknown: "学习已完成，奖励到账情况还没确认。请查看钱包状态，不需要重新做练习。"
}, Tl = {
  context: "翻看学习资料",
  config: "连接 AI",
  session: "准备学习内容",
  summary: "整理之前聊过的内容",
  provider: "组织回复",
  tools: "整理学习内容",
  save: "保存学习内容",
  action: "准备学习内容"
};
function Ol(e) {
  return `正在${Tl[e.stage]}…`;
}
function Pt(e) {
  return e.split(/\r?\n/u).filter((v) => v.trim());
}
var Bl = ["aria-labelledby"], ql = { id: "learning-grading-title" }, Pl = {
  key: 0,
  class: "learning-grading-actions"
}, _l = {
  key: 0,
  class: "learning-annotation-missing",
  role: "status"
}, Vl = ["disabled"], Ul = ["disabled"], Dl = ["open", "onToggle"], jl = {
  key: 0,
  class: "learning-revised-text"
}, Wl = { class: "learning-write-saved" }, Gl = { key: 0 }, Fl = {
  key: 1,
  class: "learning-graded-guidance"
}, Hl = ["onClick"], zl = ["open", "onToggle"], Yl = { key: 0 }, Kl = { key: 1 }, Jl = { key: 4 }, Zl = { class: "learning-graded-text" }, Ql = { class: "learning-annotation-fixed" }, Xl = {
  key: 0,
  class: "learning-annotation-missing"
}, es = {
  key: 1,
  class: "learning-annotation-fixed"
}, ts = ["onClick"], as = { class: "learning-annotation-tag" }, ns = {
  key: 0,
  class: "learning-annotation-suggestion"
}, is = ["onSubmit"], ls = ["onUpdate:modelValue", "aria-label"], ss = ["disabled"], rs = { key: 2 }, os = ["onClick"], us = {
  key: 1,
  class: "learning-working",
  role: "status"
}, ds = ["disabled"], vs = ["disabled"], cs = {
  key: 2,
  class: "learning-model-essay"
}, gs = /* @__PURE__ */ X({
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
  setup(e, { emit: v }) {
    const s = e, t = v, o = {
      content: "内容",
      grammar: "语法",
      vocabulary: "词汇",
      cohesion: "衔接"
    }, d = {
      error: "需要改",
      improve: "可以更好",
      alternative: "另一种说法"
    }, c = {
      grammar: "语法本",
      vocabulary: "生词本"
    }, b = {
      title: "看看哪里能写得更好",
      unplaced: "这处改动还没写进作文。请调整后再提交，或跳过修改。"
    }, C = (O) => O.itemId && (O.category === "grammar" || O.category === "vocabulary") ? c[O.category] : null, f = Te(() => s.unit.id), $ = L(() => f.value.edits), m = L(() => s.unit.stage.stage), k = L(() => new Map(s.unit.materials.flatMap((O) => O.paragraphs).map((O, B) => [O.id, B + 1]))), y = (O) => O?.answer.kind === "text" ? O.answer.text : "", w = L(() => Xt(s.unit).map((O) => {
      const { exercise: B, draft: _, review: P, annotations: N } = O;
      return {
        ...O,
        label: B.paragraphId ? `第 ${k.value.get(B.paragraphId) ?? "?"} 段总结` : B.prompt,
        paragraphs: Pt(y(_)).map((K, V) => ({
          index: V,
          segments: oi(K, N.filter((Y) => Y.paragraphIndex === V)),
          annotations: N.filter((Y) => Y.paragraphIndex === V)
        })),
        resolved: new Set(P?.resolvedAnnotationIds ?? [])
      };
    }).sort((O, B) => +(B.annotations.length > 0) - +(O.annotations.length > 0))), u = (O) => O.row.status === "revising", x = (O, B) => u(O) && B.severity !== "alternative";
    J(w, (O) => {
      for (const B of O.flatMap((_) => _.annotations)) $.value[B.id] ??= {
        value: B.quote,
        done: !1
      };
    }, { immediate: !0 });
    function T(O) {
      const B = $.value[O.id];
      B?.value.trim() && B.value !== O.quote && (B.done = !0);
    }
    const D = L(() => new Map(w.value.filter(u).map((O) => [O.draft.id, ri(y(O.draft), O.annotations.map((B) => ({
      id: B.id,
      paragraphIndex: B.paragraphIndex,
      quote: B.quote,
      replacement: $.value[B.id]?.done ? $.value[B.id].value : B.quote
    })))]))), E = L(() => new Set([...D.value.values()].flatMap((O) => O.missing))), ee = L(() => [...D.value.values()].reduce((O, B) => O + B.applied.length, 0)), W = H("");
    J(ee, () => {
      W.value = "";
    });
    const R = L(() => w.value.filter(u).flatMap((O) => O.annotations.filter((B) => B.severity !== "alternative")).length), S = (O, B) => {
      const _ = O.annotations.find((P) => P.id === B);
      return _ ? ["learning-mark", `is-${_.severity}`] : "";
    };
    function I() {
      const O = w.value.filter(u).flatMap((B) => {
        const _ = D.value.get(B.draft.id);
        return !_ || _.text === y(B.draft) ? [] : [{
          attemptId: B.draft.id,
          text: _.text
        }];
      });
      O.length ? t("action", "submit-revision", {
        unitId: s.unit.id,
        revisions: O
      }) : W.value = b.unplaced;
    }
    const q = L(() => s.state.pending?.unitId === s.unit.id ? s.state.pending.purpose : null), G = L(() => w.value.some((O) => O.row.status === "grading" || O.row.status === "reviewing"));
    return (O, B) => (a(), i("section", {
      class: "learning-grading",
      "aria-labelledby": e.view === "feedback" ? "learning-grading-title" : void 0
    }, [
      e.view === "feedback" ? (a(), i(M, { key: 0 }, [
        n("h2", ql, r(b.title), 1),
        w.value.some(u) ? (a(), i("div", Pl, [
          n("small", null, "已改 " + r(ee.value) + " / " + r(R.value) + " 处", 1),
          W.value ? (a(), i("small", _l, r(W.value), 1)) : g("", !0),
          n("button", {
            type: "button",
            disabled: e.disabled,
            onClick: B[0] || (B[0] = (_) => t("confirm", "skip-revision", { unitId: e.unit.id }, "跳过这次修改？批注会保留，直接进入范文。"))
          }, "跳过修改", 8, Vl),
          n("button", {
            type: "button",
            class: "learning-primary",
            disabled: e.disabled || !ee.value,
            onClick: I
          }, "提交修改", 8, Ul)
        ])) : g("", !0),
        (a(!0), i(M, null, j(w.value, (_) => (a(), i("details", {
          key: _.exercise.id,
          class: "learning-graded",
          open: l(f).expanded[`grading:${_.draft.id}`] ?? _.annotations.length > 0,
          onToggle: (P) => l(f).expanded[`grading:${_.draft.id}`] = P.target.open
        }, [
          n("summary", null, [n("h3", null, r(_.label), 1)]),
          _.revision ? (a(), i("section", jl, [
            n("h4", null, r(l(ae).revision), 1),
            n("p", Wl, r(y(_.revision)), 1),
            _.review?.guidance ? (a(), i("p", Gl, r(_.review.guidance), 1)) : g("", !0)
          ])) : g("", !0),
          _.assessment?.guidance ? (a(), i("p", Fl, r(_.assessment.guidance), 1)) : g("", !0),
          _.assessment ? (a(), i("button", {
            key: 2,
            type: "button",
            onClick: (P) => t("ask", _.exercise.id)
          }, r(l(te).askAssessment), 9, Hl)) : g("", !0),
          _.assessment && (_.assessment.understanding || _.assessment.expression) ? (a(), i("details", {
            key: 3,
            class: "learning-graded-more",
            open: l(f).expanded[`feedback:${_.draft.id}`],
            onToggle: (P) => l(f).expanded[`feedback:${_.draft.id}`] = P.target.open
          }, [
            B[5] || (B[5] = n("summary", null, "理解与表达点评", -1)),
            _.assessment.understanding ? (a(), i("p", Yl, [B[3] || (B[3] = n("b", null, "理解", -1)), z(r(_.assessment.understanding), 1)])) : g("", !0),
            _.assessment.expression ? (a(), i("p", Kl, [B[4] || (B[4] = n("b", null, "表达", -1)), z(r(_.assessment.expression), 1)])) : g("", !0)
          ], 40, zl)) : g("", !0),
          _.revision ? (a(), i("h4", Jl, r(l(ae).original), 1)) : g("", !0),
          (a(!0), i(M, null, j(_.paragraphs, (P) => (a(), i("div", {
            key: P.index,
            class: "learning-graded-paragraph"
          }, [n("p", Zl, [(a(!0), i(M, null, j(P.segments, (N, K) => (a(), i(M, { key: K }, [N.id ? (a(), i("mark", {
            key: 0,
            class: ue(S(_, N.id))
          }, r(N.text), 3)) : (a(), i(M, { key: 1 }, [z(r(N.text), 1)], 64))], 64))), 128))]), (a(!0), i(M, null, j(P.annotations, (N) => (a(), i("div", {
            key: N.id,
            class: ue(["learning-annotation", [`is-${N.severity}`, {
              "is-fixed": _.resolved.has(N.id),
              "is-edited": $.value[N.id]?.done && u(_)
            }]])
          }, [_.resolved.has(N.id) ? (a(), i(M, { key: 0 }, [n("p", Ql, "✓ " + r(l(ae).resolved), 1), n("p", null, r(N.explanation), 1)], 64)) : $.value[N.id]?.done && u(_) ? (a(), i(M, { key: 1 }, [E.value.has(N.id) ? (a(), i("p", Xl, "原文里找不到“" + r(N.quote) + "”，这处改动不会写进修改稿。", 1)) : (a(), i("p", es, "✓ 改为“" + r($.value[N.id].value) + "”", 1)), n("button", {
            type: "button",
            onClick: (K) => $.value[N.id].done = !1
          }, "再改", 8, ts)], 64)) : (a(), i(M, { key: 2 }, [
            n("p", as, [n("span", null, r(d[N.severity]), 1), z(r(o[N.category]), 1)]),
            n("p", null, r(N.explanation), 1),
            N.suggestion ? (a(), i("p", ns, "可以写成：" + r(N.suggestion), 1)) : g("", !0),
            x(_, N) && $.value[N.id] ? (a(), i("form", {
              key: 1,
              class: "learning-annotation-edit",
              onSubmit: ve((K) => T(N), ["prevent"])
            }, [se(n("textarea", {
              "onUpdate:modelValue": (K) => $.value[N.id].value = K,
              rows: "2",
              "aria-label": `改写：${N.quote}`,
              maxlength: "600"
            }, null, 8, ls), [[ge, $.value[N.id].value], [l(Xe), $.value[N.id]]]), n("button", {
              type: "submit",
              disabled: !$.value[N.id].value.trim() || $.value[N.id].value === N.quote
            }, "改好了", 8, ss)], 40, is)) : _.review && N.severity !== "alternative" ? (a(), i("small", rs, "复核时这里还没改到")) : g("", !0)
          ], 64)), C(N) ? (a(), i("button", {
            key: 3,
            type: "button",
            class: "learning-annotation-book",
            onClick: (K) => t("record", N.itemId)
          }, r(C(N)) + " ↗", 9, os)) : g("", !0)], 2))), 128))]))), 128))
        ], 40, Dl))), 128))
      ], 64)) : g("", !0),
      G.value || m.value === "model" ? (a(), i("div", us, [q.value ? (a(), i(M, { key: 0 }, [
        B[6] || (B[6] = n("span", {
          class: "learning-working-dot",
          "aria-hidden": "true"
        }, null, -1)),
        n("span", null, r(q.value === "grade" ? l(ae).grading : q.value === "revision-review" ? l(ae).reviewing : l(ae).modelling), 1),
        n("button", {
          type: "button",
          disabled: e.pending,
          onClick: B[1] || (B[1] = (_) => t("action", "cancel"))
        }, r(l(ae).stop), 9, ds)
      ], 64)) : (a(), i("button", {
        key: 1,
        type: "button",
        class: "learning-primary",
        disabled: e.disabled,
        onClick: B[2] || (B[2] = (_) => t("action", "grade", { unitId: e.unit.id }))
      }, r(m.value === "grading" ? l(ae).grade : l(ae).continue), 9, vs))])) : g("", !0),
      e.view === "model" && e.unit.modelEssay ? (a(), i("section", cs, [n("h3", null, [B[7] || (B[7] = z("范文", -1)), n("small", null, r(e.unit.modelEssay.level), 1)]), (a(!0), i(M, null, j(l(Pt)(e.unit.modelEssay.text), (_, P) => (a(), i("p", { key: P }, r(_), 1))), 128))])) : g("", !0)
    ], 8, Bl));
  }
}), ps = gs, bs = {
  class: "learning-complete",
  role: "status",
  "aria-live": "polite"
}, ms = {
  key: 0,
  class: "learning-complete-burst",
  "aria-hidden": "true"
}, fs = { class: "learning-complete-title" }, ks = {
  key: 1,
  class: "learning-complete-amount"
}, ys = ["disabled"], hs = /* @__PURE__ */ X({
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
  setup(e, { emit: v }) {
    const s = e, t = v, o = L(() => s.state.completions.find((c) => c.unitId === s.unitId)), d = L(() => {
      const c = o.value?.rewardStatus;
      return c === "paid" ? be.paid : c === "retired" ? be.retired : o.value ? s.state.walletOpen ? be.pending : be.needsWallet : be.saving;
    });
    return (c, b) => (a(), i("section", bs, [
      e.quiet ? g("", !0) : (a(), i("div", ms, [(a(), i(M, null, j(8, (C) => n("span", {
        key: C,
        style: jt({ "--i": C })
      }, null, 4)), 64))])),
      n("p", fs, r(e.label), 1),
      o.value?.rewardStatus !== "retired" ? (a(), i("p", ks, [n("strong", null, r(o.value?.rewardStatus === "paid" ? "+" : "") + r(o.value?.amount ?? e.amount), 1), b[1] || (b[1] = n("span", null, "小白币", -1))])) : g("", !0),
      n("small", null, r(d.value), 1),
      o.value && o.value.rewardStatus !== "paid" && o.value.rewardStatus !== "retired" ? (a(), i("button", {
        key: 2,
        type: "button",
        disabled: e.disabled || e.state.walletStorage !== "ready",
        onClick: b[0] || (b[0] = (C) => t("action", "reward", {
          unitId: e.unitId,
          openWallet: !e.state.walletOpen
        }))
      }, r(e.state.walletOpen ? l(be).claim : l(be).openWallet), 9, ys)) : g("", !0)
    ]));
  }
}), sa = hs, $s = ["data-exercise-id"], ws = { class: "learning-write-label" }, xs = [
  "aria-label",
  "placeholder",
  "rows",
  "onKeydown"
], Cs = { class: "learning-write-foot" }, Is = { "aria-live": "polite" }, Ls = ["disabled"], Ss = { class: "learning-write-saved" }, As = { class: "learning-write-foot" }, Rs = ["disabled"], Ms = /* @__PURE__ */ X({
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
  setup(e, { emit: v }) {
    const s = e, t = v, o = Te(() => s.unit.id);
    J([o, () => s.exercise.id], () => {
      o.value.writing[s.exercise.id] ??= {
        text: "",
        rewriting: !1,
        submitted: null
      };
    }, { immediate: !0 });
    const d = L(() => o.value.writing[s.exercise.id]), c = L({
      get: () => d.value.text,
      set: (x) => {
        d.value.text = x;
      }
    }), b = L({
      get: () => d.value.rewriting,
      set: (x) => {
        d.value.rewriting = x;
      }
    }), C = L(() => s.unit.attempts.filter((x) => x.exerciseId === s.exercise.id && x.revisesAttemptId === void 0).at(-1)), f = L(() => C.value?.answer.kind === "text" ? C.value.answer.text : ""), $ = L(() => !C.value || b.value), m = L(() => Ot(c.value, s.state.language)), k = L(() => Ot(f.value, s.state.language)), y = L(() => s.state.workbenchConversation.summaryReviews.find((x) => x.attemptId === C.value?.id)?.text ?? "");
    function w() {
      s.disabled || !c.value.trim() || (d.value.submitted = {
        before: C.value?.id,
        text: c.value
      }, t("action", "submit", {
        unitId: s.unit.id,
        exerciseId: s.exercise.id,
        answer: {
          kind: "text",
          text: c.value.trim()
        }
      }));
    }
    function u() {
      c.value = f.value, b.value = !0;
    }
    return (x, T) => (a(), i("div", {
      class: ue(["learning-write", `is-${e.tone ?? "summary"}`]),
      "data-exercise-id": e.exercise.id
    }, [
      n("p", ws, r(e.label), 1),
      $.value ? (a(), i("form", {
        key: 0,
        onSubmit: ve(w, ["prevent"])
      }, [se(n("textarea", {
        "onUpdate:modelValue": T[0] || (T[0] = (D) => c.value = D),
        "aria-label": e.label,
        placeholder: e.placeholder,
        maxlength: "4000",
        rows: e.tone === "essay" ? 8 : 3,
        onKeydown: [Ae(ve(w, ["ctrl", "prevent"]), ["enter"]), Ae(ve(w, ["meta", "prevent"]), ["enter"])]
      }, null, 40, xs), [[ge, c.value], [l(Xe), d.value]]), n("div", Cs, [
        n("small", Is, r(m.value.count) + " " + r(m.value.unit), 1),
        b.value ? (a(), i("button", {
          key: 0,
          type: "button",
          onClick: T[1] || (T[1] = (D) => {
            b.value = !1, c.value = "";
          })
        }, "取消")) : g("", !0),
        n("button", {
          type: "submit",
          class: "learning-primary",
          disabled: e.disabled || !c.value.trim()
        }, r(C.value ? "保存新稿" : "提交"), 9, Ls)
      ])], 32)) : C.value ? (a(), i(M, { key: 1 }, [n("p", Ss, r(f.value), 1), n("div", As, [n("small", null, "已保存 · " + r(k.value.count) + " " + r(k.value.unit), 1), n("button", {
        type: "button",
        disabled: e.disabled,
        onClick: u
      }, "重写", 8, Rs)])], 64)) : g("", !0),
      y.value ? (a(), Q(gt, {
        key: 2,
        class: "learning-markdown learning-write-reply",
        text: y.value
      }, null, 8, ["text"])) : g("", !0)
    ], 10, $s));
  }
}), ra = Ms, oe = {
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
}, Es = "用你的话概括这一段", Ns = ["data-paragraph-id", "data-material-id"], Ts = { class: "learning-reading-text" }, Os = {
  class: "learning-reading-number",
  "aria-hidden": "true"
}, Bs = ["data-material-id", "data-paragraph-id"], qs = ["disabled"], Ps = ["open"], _s = { key: 0 }, Vs = { class: "learning-knowledge-text" }, Us = {
  key: 0,
  class: "learning-terms"
}, Ds = [
  "disabled",
  "aria-pressed",
  "onClick"
], js = {
  key: 2,
  class: "learning-muted learning-knowledge-pending"
}, Ws = /* @__PURE__ */ X({
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
  setup(e, { emit: v }) {
    const s = e, t = v, o = L(() => s.unit.explanations.find((k) => k.materialId === s.materialId && k.paragraphId === s.paragraph.id)), d = L(() => s.unit.exercises.find((k) => k.paragraphId === s.paragraph.id)), c = L(() => new Set(s.state.savedTerms)), b = (k) => c.value.has(k), C = Te(() => s.unit.id), f = L(() => `knowledge:${s.materialId}:${s.paragraph.id}`), $ = L(() => C.value.selection?.materialId === s.materialId && C.value.selection.paragraphId === s.paragraph.id ? C.value.selection : null);
    function m() {
      C.value.selection = {
        materialId: s.materialId,
        paragraphId: s.paragraph.id,
        start: 0,
        end: s.paragraph.text.length,
        quote: s.paragraph.text
      };
    }
    return (k, y) => (a(), i("section", {
      class: "learning-reading-paragraph",
      "data-paragraph-id": e.paragraph.id,
      "data-material-id": e.materialId
    }, [
      n("p", Ts, [n("span", Os, r(e.number), 1), n("span", {
        "data-learning-text": "",
        "data-material-id": e.materialId,
        "data-paragraph-id": e.paragraph.id
      }, r(e.paragraph.text), 9, Bs)]),
      n("button", {
        type: "button",
        class: "learning-paragraph-quote",
        disabled: [...e.paragraph.text].length > l(Gt),
        onClick: m
      }, r(l(Ve).select), 9, qs),
      $.value ? (a(), Q(Qt, {
        key: 0,
        selection: $.value,
        disabled: e.disabled,
        onAsk: y[0] || (y[0] = (w) => t("ask", d.value?.id, $.value)),
        onSay: y[1] || (y[1] = (w) => t("action", "say", { selection: $.value })),
        onDismiss: y[2] || (y[2] = (w) => l(C).selection = null)
      }, null, 8, ["selection", "disabled"])) : g("", !0),
      o.value ? (a(), i("details", {
        key: 1,
        class: "learning-knowledge",
        open: l(C).expanded[f.value],
        onToggle: y[3] || (y[3] = (w) => l(C).expanded[f.value] = w.target.open)
      }, [
        n("summary", null, [y[5] || (y[5] = z("本段知识", -1)), o.value.terms.length ? (a(), i("span", _s, " · " + r(o.value.terms.length) + " 个词语", 1)) : g("", !0)]),
        n("p", Vs, r(o.value.explanation), 1),
        o.value.terms.length ? (a(), i("ul", Us, [(a(!0), i(M, null, j(o.value.terms, (w) => (a(), i("li", { key: w.text }, [n("span", null, [n("strong", null, r(w.text), 1), n("small", null, r(w.note), 1)]), n("button", {
          type: "button",
          disabled: e.disabled || b(w.text),
          "aria-pressed": b(w.text),
          onClick: (u) => t("action", "bookmark", {
            unitId: e.unit.id,
            materialId: e.materialId,
            paragraphId: e.paragraph.id,
            termText: w.text
          })
        }, r(b(w.text) ? "已收藏" : "收藏"), 9, Ds)]))), 128))])) : g("", !0)
      ], 40, Ps)) : (a(), i("p", js, r(e.state.preparation?.running ? l(oe).notes : l(oe).missingNotes), 1)),
      d.value ? (a(), Q(ra, {
        key: 3,
        state: e.state,
        unit: e.unit,
        exercise: d.value,
        disabled: e.disabled,
        label: l(Es),
        placeholder: "写下这段的大意，不必逐句翻译",
        onAction: y[4] || (y[4] = (w, u) => t("action", w, u))
      }, null, 8, [
        "state",
        "unit",
        "exercise",
        "disabled",
        "label"
      ])) : g("", !0)
    ], 8, Ns));
  }
}), Gs = Ws;
function Fs(e, v) {
  return e === "talk" || e === "retry-chat" ? v === "workbench" ? "workbench-talk" : "talk" : e;
}
var Hs = /* @__PURE__ */ new Set([
  "language",
  "teacher",
  "forget-conversation",
  "resume",
  "rate",
  "seek",
  "verify-teacher",
  "adopt-teacher",
  "share-course"
]), zs = /* @__PURE__ */ new Set([
  "submit",
  "bookmark",
  "say",
  "play",
  "save-note",
  "delete-note"
]), oa = /* @__PURE__ */ new Set([
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
]), Ys = /* @__PURE__ */ new Set([
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
function dt(e, v) {
  return oa.has(e) ? !1 : e === "talk" || e === "retry-notification" ? v.chatBusy : e === "workbench-talk" ? v.workbenchBusy : Hs.has(e) ? v.busy || v.chatBusy || v.workbenchBusy || !!v.preparation?.running : v.busy || !!v.preparation?.running && !zs.has(e);
}
function fe(e, v) {
  return e === "talk" || e === "workbench-talk" ? !dt(e, v) && (e === "talk" ? v.chatStorage : v.workbenchStorage) === "ready" : !dt(e, v) && (oa.has(e) || Ys.has(e) || (e === "teacher" ? v.chatStorage === "ready" : v.storage === "ready"));
}
var Ks = ["aria-label"], Js = [
  "aria-current",
  "disabled",
  "onClick"
], Zs = { class: "learning-reading-head" }, Qs = ["open"], Xs = { key: 0 }, er = { class: "learning-source" }, tr = ["href"], ar = { class: "learning-essay-prompt" }, nr = {
  key: 0,
  class: "learning-essay"
}, ir = { class: "learning-muted" }, lr = ["data-exercise-id"], sr = ["aria-label"], rr = ["aria-current"], or = {
  key: 1,
  class: "learning-stage-bar is-writing"
}, ur = {
  key: 1,
  class: "learning-muted"
}, dr = {
  key: 2,
  class: "learning-stage-bar"
}, vr = ["disabled"], cr = ["disabled"], gr = /* @__PURE__ */ X({
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
  setup(e, { emit: v }) {
    const s = e, t = v, o = H(null), d = Te(() => s.unit.id);
    Ft(o, () => s.unit.materials, (R) => {
      d.value.selection = R;
    });
    const c = L(() => s.unit.stage.stage), b = L(() => d.value.reading.view ?? (c.value === "complete" ? "model" : ["writing", "grading"].includes(c.value) ? "reading" : "feedback")), C = [
      "reading",
      "feedback",
      "model"
    ];
    async function f(R) {
      const S = o.value?.closest(".learning-scroll");
      S && (d.value.reading.scrolls[b.value] = S.scrollTop), d.value.reading.view = R, await de(), S && (S.scrollTop = d.value.reading.scrolls[R] ?? 0);
    }
    const $ = [
      ["writing", "阅读与写作"],
      ["grading", "统一批改"],
      ["revising", "修改"],
      ["model", "范文"],
      ["complete", "完成"]
    ], m = L(() => ({
      writing: 0,
      grading: 1,
      revising: 2,
      reviewing: 3,
      model: 3,
      complete: 4
    })[c.value] ?? 0), k = L(() => s.unit.exercises.filter((R) => !R.paragraphId && R.skill === "writing" && R.response.kind === "text")), y = L(() => s.unit.exercises.filter((R) => !R.paragraphId && !k.value.includes(R)));
    J([y, () => y.value.map((R) => d.value.activityDrafts[R.id])], ([R]) => {
      for (const S of R) {
        const I = JSON.stringify(S.response);
        d.value.activityDrafts[S.id]?.response !== I && (d.value.activityDrafts[S.id] = {
          response: I,
          value: Re(S.response)
        });
      }
    }, { immediate: !0 });
    const w = L(() => y.value.flatMap((R) => {
      const S = s.unit.attempts.filter((I) => I.exerciseId === R.id).at(-1);
      return S ? [{
        exercise: R,
        attempt: S,
        feedback: s.unit.assessments.find((I) => I.attemptId === S.id)
      }] : [];
    })), u = L(() => s.unit.stage.exercises.some((R) => R.status === "grading" || R.status === "reviewing")), x = L(() => s.unit.stage.exercises.filter((R) => R.status === "writing").map((R) => R.exerciseId)), T = {
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
    }, D = L(() => {
      let R = 0;
      return s.unit.materials.map((S) => ({
        material: S,
        paragraphs: S.paragraphs.map((I) => ({
          paragraph: I,
          number: ++R
        }))
      }));
    }), E = (R, S) => t("action", R, S);
    function ee(R, S) {
      d.value.activityDrafts[R].submitted = { before: s.unit.attempts.filter((I) => I.exerciseId === R).at(-1)?.id }, E("submit", {
        unitId: s.unit.id,
        exerciseId: R,
        answer: S
      });
    }
    function W(R) {
      const S = o.value?.querySelector(`[data-exercise-id="${CSS.escape(R)}"]`);
      S?.scrollIntoView({
        block: "center",
        behavior: matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth"
      }), S?.querySelector("textarea, button")?.focus({ preventScroll: !0 });
    }
    return (R, S) => (a(), i("article", {
      ref_key: "root",
      ref: o,
      class: "learning-reading"
    }, [
      n("nav", {
        class: "learning-reading-nav",
        "aria-label": l(ae).navigation
      }, [(a(), i(M, null, j(C, (I) => n("button", {
        key: I,
        type: "button",
        "aria-current": b.value === I ? "page" : void 0,
        disabled: I === "model" && !e.unit.modelEssay,
        onClick: (q) => f(I)
      }, r(l(ae)[I]), 9, Js)), 64))], 8, Ks),
      e.state.completions.some((I) => I.unitId === e.unit.id) ? (a(), Q(sa, {
        key: 0,
        state: e.state,
        "unit-id": e.unit.id,
        amount: e.unit.reward.amount,
        label: l(ae).completed,
        disabled: e.disabled,
        onAction: E
      }, null, 8, [
        "state",
        "unit-id",
        "amount",
        "label",
        "disabled"
      ])) : g("", !0),
      b.value === "reading" ? (a(), i(M, { key: 1 }, [
        n("header", Zs, [n("details", {
          class: "learning-reading-goal",
          open: l(d).expanded.goal,
          onToggle: S[0] || (S[0] = (I) => l(d).expanded.goal = I.target.open)
        }, [
          n("summary", null, r(T.goal), 1),
          n("strong", null, r(e.unit.title), 1),
          e.unit.goal ? (a(), i("p", Xs, r(e.unit.goal), 1)) : g("", !0)
        ], 40, Qs), F(la, { name: e.state.teacher?.name }, null, 8, ["name"])]),
        (a(!0), i(M, null, j(D.value, (I, q) => (a(), i("section", {
          key: I.material.id,
          class: "learning-reading-material"
        }, [
          (a(), Q(xa(q === 0 ? "h1" : "h2"), { tabindex: "-1" }, {
            default: Wt(() => [z(r(I.material.title), 1)]),
            _: 2
          }, 1024)),
          n("p", er, [I.material.provenance.kind === "authored" ? (a(), i(M, { key: 0 }, [z(r(T.authored), 1)], 64)) : (a(), i(M, { key: 1 }, [z(r(I.material.provenance.kind === "adapted" ? T.adapted : T.original) + " ", 1), n("a", {
            href: I.material.provenance.url,
            target: "_blank",
            rel: "noopener noreferrer"
          }, r(I.material.provenance.title), 9, tr)], 64))]),
          (a(!0), i(M, null, j(I.paragraphs, (G) => (a(), Q(Gs, {
            key: G.paragraph.id,
            state: e.state,
            unit: e.unit,
            "material-id": I.material.id,
            paragraph: G.paragraph,
            number: G.number,
            disabled: e.disabled,
            onAction: E,
            onAsk: S[1] || (S[1] = (O, B) => t("ask", O, B))
          }, null, 8, [
            "state",
            "unit",
            "material-id",
            "paragraph",
            "number",
            "disabled"
          ]))), 128))
        ]))), 128)),
        (a(!0), i(M, null, j(k.value, (I) => (a(), i("section", {
          key: I.id,
          class: "learning-essay"
        }, [
          n("h2", null, r(T.essay), 1),
          n("p", ar, r(I.prompt), 1),
          F(ra, {
            state: e.state,
            unit: e.unit,
            exercise: I,
            disabled: e.disabled,
            label: T.essayLabel,
            placeholder: T.essayPlaceholder,
            tone: "essay",
            onAction: E
          }, null, 8, [
            "state",
            "unit",
            "exercise",
            "disabled",
            "label",
            "placeholder"
          ])
        ]))), 128)),
        k.value.length ? g("", !0) : (a(), i("section", nr, [n("h2", null, r(T.essay), 1), n("p", ir, r(e.state.preparation?.running ? l(oe).essay : l(oe).missingEssay), 1)])),
        (a(!0), i(M, null, j(y.value, (I) => (a(), i("section", {
          key: I.id,
          class: "learning-essay",
          "data-exercise-id": I.id
        }, [
          n("h2", null, r(I.prompt), 1),
          l(d).activityDrafts[I.id] ? (a(), Q(pt, {
            key: 0,
            modelValue: l(d).activityDrafts[I.id].value,
            "onUpdate:modelValue": (q) => l(d).activityDrafts[I.id].value = q,
            response: I.response,
            paragraphs: e.unit.materials.filter((q) => I.materialIds.includes(q.id)).flatMap((q) => q.paragraphs),
            disabled: e.disabled,
            onSubmit: (q) => ee(I.id, q)
          }, null, 8, [
            "modelValue",
            "onUpdate:modelValue",
            "response",
            "paragraphs",
            "disabled",
            "onSubmit"
          ])) : g("", !0),
          (a(!0), i(M, null, j(w.value.filter((q) => q.exercise.id === I.id), (q) => (a(), Q(mt, {
            key: q.attempt.id,
            attempt: q.attempt,
            feedback: q.feedback,
            response: I.response,
            paragraphs: e.unit.materials.flatMap((G) => G.paragraphs),
            disabled: e.disabled,
            reviewable: e.unit.attemptActions[q.attempt.id].review,
            onAction: E
          }, null, 8, [
            "attempt",
            "feedback",
            "response",
            "paragraphs",
            "disabled",
            "reviewable"
          ]))), 128))
        ], 8, lr))), 128)),
        n("ol", {
          class: "learning-steps",
          "aria-label": T.progress
        }, [(a(), i(M, null, j($, ([I, q], G) => n("li", {
          key: I,
          class: ue({
            "is-done": G < m.value,
            "is-current": G === m.value
          }),
          "aria-current": G === m.value ? "step" : void 0
        }, r(q), 11, rr)), 64))], 8, sr),
        c.value === "writing" ? (a(), i("div", or, [n("span", null, r(T.written) + " " + r(e.unit.stage.exercises.length - x.value.length) + " / " + r(e.unit.stage.exercises.length), 1), x.value.length ? (a(), i("button", {
          key: 0,
          type: "button",
          onClick: S[2] || (S[2] = (I) => W(x.value[0]))
        }, r(T.next), 1)) : (a(), i("span", ur, r(e.unit.preparation.essay ? l(oe).missingNotes : l(oe).missingEssay), 1))])) : g("", !0),
        u.value ? (a(), i("div", dr, [e.state.pending?.purpose === "grade" ? (a(), i(M, { key: 0 }, [
          S[10] || (S[10] = n("span", {
            class: "learning-working-dot",
            "aria-hidden": "true"
          }, null, -1)),
          n("span", null, r(l(ae).grading), 1),
          n("button", {
            type: "button",
            disabled: e.pending,
            onClick: S[3] || (S[3] = (I) => t("action", "cancel"))
          }, r(l(ae).stop), 9, vr)
        ], 64)) : (a(), i("button", {
          key: 1,
          type: "button",
          class: "learning-primary",
          disabled: e.disabled || !l(fe)("grade", e.state),
          onClick: S[4] || (S[4] = (I) => t("action", "grade", { unitId: e.unit.id }))
        }, r(l(ae).grade), 9, cr))])) : e.unit.assessments.length ? (a(), i("button", {
          key: 3,
          type: "button",
          class: "learning-primary",
          onClick: S[5] || (S[5] = (I) => f("feedback"))
        }, r(l(ae).feedback), 1)) : g("", !0)
      ], 64)) : (a(), Q(ps, {
        key: 2,
        view: b.value,
        state: e.state,
        unit: e.unit,
        disabled: e.disabled || !l(fe)("grade", e.state),
        pending: e.pending,
        onAsk: S[6] || (S[6] = (I) => t("assistant", I)),
        onAction: E,
        onConfirm: S[7] || (S[7] = (I, q, G) => t("confirm", I, q, G)),
        onRecord: S[8] || (S[8] = (I) => t("record", I))
      }, null, 8, [
        "view",
        "state",
        "unit",
        "disabled",
        "pending"
      ])),
      b.value === "feedback" && c.value === "complete" ? (a(), i("button", {
        key: 3,
        type: "button",
        class: "learning-primary",
        onClick: S[9] || (S[9] = (I) => f("model"))
      }, r(l(ae).viewModel), 1)) : g("", !0)
    ], 512));
  }
}), pr = gr, br = ["data-learning-unit-id", "data-exercise-id"], mr = { class: "learning-review-head" }, fr = { class: "learning-muted" }, kr = ["disabled"], yr = {
  class: "learning-review-dots",
  "aria-label": "复习卡片"
}, hr = [
  "aria-label",
  "aria-current",
  "onClick"
], $r = { class: "learning-eyebrow" }, wr = { class: "learning-card-verdict" }, xr = { key: 0 }, Cr = { key: 1 }, Ir = { key: 2 }, Lr = { key: 1 }, Sr = ["disabled"], Ar = ["disabled"], Rr = {
  key: 1,
  class: "learning-working",
  role: "status"
}, Mr = ["disabled"], Er = ["disabled"], Nr = ["disabled"], Tr = {
  key: 2,
  class: "learning-row"
}, Or = { class: "learning-review-results" }, Br = ["aria-current", "onClick"], qr = ["aria-expanded", "onClick"], Pr = {
  key: 1,
  class: "learning-chip-reason"
}, _r = /* @__PURE__ */ X({
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
  setup(e, { emit: v }) {
    const s = e, t = v, o = ye.verdicts, d = L(() => s.review.stage.stage), c = (P) => s.review.attempts.filter((N) => N.exerciseId === P).at(-1), b = () => Math.max(0, s.review.exercises.findIndex((P) => !c(P.id))), C = Te(() => s.review.id), f = L(() => C.value.review), $ = L({
      get: () => f.value.index ?? b(),
      set: (P) => {
        f.value.index = P;
      }
    }), m = L(() => s.review.exercises[$.value]), k = L(() => m.value && c(m.value.id)), y = L(() => s.review.assessments.find((P) => P.attemptId === k.value?.id)), w = L(() => s.review.materials.flatMap((P) => P.paragraphs)), u = L(() => f.value.drafts);
    J([m, () => m.value && u.value[m.value.id]], ([P]) => {
      P && !u.value[P.id] && (u.value[P.id] = {
        value: Re(P.response),
        retry: !1
      });
    }, { immediate: !0 });
    const x = L({
      get: () => u.value[m.value.id].value,
      set: (P) => {
        u.value[m.value.id].value = P;
      }
    }), T = L(() => !!m.value && !!u.value[m.value.id]?.retry), D = L(() => s.review.exercises.filter((P) => c(P.id)).length), E = L({
      get: () => f.value.openReason,
      set: (P) => {
        f.value.openReason = P;
      }
    });
    function ee(P) {
      u.value[m.value.id].submitted = { before: k.value?.id }, t("action", "submit", {
        unitId: s.review.id,
        exerciseId: m.value.id,
        answer: P
      });
    }
    function W() {
      const P = m.value;
      u.value[P.id] = {
        value: Re(P.response),
        retry: !T.value
      };
    }
    function R() {
      const P = s.review.exercises.findIndex((N) => !c(N.id));
      P >= 0 && ($.value = P);
    }
    function S(P) {
      $.value = P, O.value = !0;
    }
    const I = L(() => s.state.completions.find((P) => P.unitId === s.review.id)), q = L(() => I.value?.rewardStatus === "paid" || I.value?.rewardStatus === "retired");
    J(f, (P) => {
      P.seenBefore ??= d.value === "complete" && Bt.has(s.review.id);
    }, { immediate: !0 });
    const G = L(() => f.value.seenBefore ?? !1), O = L({
      get: () => f.value.expanded,
      set: (P) => {
        f.value.expanded = P;
      }
    });
    J([d, () => s.review.id], ([P, N]) => {
      P === "complete" && Bt.mark(N);
    }, { immediate: !0 });
    const B = L(() => G.value && q.value && !O.value), _ = (P) => [...s.state.books.grammar, ...s.state.books.vocabulary].find((N) => N.id === P);
    return (P, N) => (a(), i("section", {
      class: "learning-review",
      "data-learning-unit-id": e.review.id,
      "data-exercise-id": m.value?.id,
      "aria-labelledby": "learning-review-title"
    }, [
      n("header", mr, [
        N[8] || (N[8] = n("h2", { id: "learning-review-title" }, "今日复习", -1)),
        n("span", fr, r(D.value) + " / " + r(e.review.exercises.length), 1),
        d.value === "answering" ? (a(), i("button", {
          key: 0,
          type: "button",
          disabled: e.disabled || !l(fe)("abandon-review", e.state),
          onClick: N[0] || (N[0] = (K) => t("confirm", "abandon-review", {}, l($e).review))
        }, "放下", 8, kr)) : g("", !0)
      ]),
      n("nav", yr, [(a(!0), i(M, null, j(e.review.exercises, (K, V) => (a(), i("button", {
        key: K.id,
        type: "button",
        "aria-label": `第 ${V + 1} 张`,
        "aria-current": V === $.value,
        class: ue({ "is-answered": !!c(K.id) }),
        onClick: (Y) => S(V)
      }, null, 10, hr))), 128))]),
      m.value && !B.value ? (a(), i("div", {
        key: `${m.value.id}:${k.value && !T.value ? "back" : "front"}`,
        class: ue(["learning-card", { "is-back": !!k.value && !T.value }])
      }, [
        n("p", $r, r(k.value ? l(ye).answer : `第 ${$.value + 1} 张`), 1),
        n("h3", null, r(m.value.prompt), 1),
        !k.value || T.value ? (a(), Q(pt, {
          key: 0,
          modelValue: x.value,
          "onUpdate:modelValue": N[1] || (N[1] = (K) => x.value = K),
          response: m.value.response,
          paragraphs: w.value,
          disabled: e.disabled || !l(fe)("submit", e.state),
          onSubmit: ee
        }, null, 8, [
          "modelValue",
          "response",
          "paragraphs",
          "disabled"
        ])) : (a(), i(M, { key: 1 }, [
          n("blockquote", null, r(l(bt)(k.value.answer, m.value.response, w.value)), 1),
          y.value ? (a(), i(M, { key: 0 }, [
            n("p", wr, r(l(o)[y.value.verdict]), 1),
            y.value.understanding ? (a(), i("p", xr, r(y.value.understanding), 1)) : g("", !0),
            y.value.expression ? (a(), i("p", Cr, r(y.value.expression), 1)) : g("", !0),
            y.value.guidance ? (a(), i("p", Ir, r(y.value.guidance), 1)) : g("", !0)
          ], 64)) : (a(), i("small", Lr, r(l(ye).saved), 1)),
          D.value < e.review.exercises.length ? (a(), i("button", {
            key: 2,
            type: "button",
            class: "learning-primary",
            onClick: R
          }, "下一张")) : g("", !0)
        ], 64)),
        k.value ? (a(), i("button", {
          key: 2,
          type: "button",
          disabled: e.disabled || !l(fe)("submit", e.state),
          onClick: W
        }, r(T.value ? l(ye).cancelRetry : l(ye).retry), 9, Sr)) : g("", !0),
        n("button", {
          type: "button",
          class: "learning-review-ask",
          "data-action": "ask",
          disabled: e.pending || !l(fe)("talk", e.state),
          onClick: N[2] || (N[2] = (K) => t("ask", m.value.id, e.review.id))
        }, r(l(ye).ask), 9, Ar)
      ], 2)) : g("", !0),
      d.value === "grading" ? (a(), i("div", Rr, [e.state.pending?.purpose === "review-assess" ? (a(), i(M, { key: 0 }, [
        N[9] || (N[9] = n("span", {
          class: "learning-working-dot",
          "aria-hidden": "true"
        }, null, -1)),
        N[10] || (N[10] = n("span", null, "正在批改这组复习…", -1)),
        n("button", {
          type: "button",
          disabled: e.pending,
          onClick: N[3] || (N[3] = (K) => t("action", "cancel"))
        }, "停止", 8, Mr)
      ], 64)) : (a(), i(M, { key: 1 }, [
        n("span", null, r(l(ye).ready), 1),
        n("button", {
          type: "button",
          disabled: e.disabled || !l(fe)("abandon-review", e.state),
          onClick: N[4] || (N[4] = (K) => t("confirm", "abandon-review", {}, l($e).review))
        }, "放下", 8, Er),
        n("button", {
          type: "button",
          disabled: e.disabled || !l(fe)("grade", e.state),
          onClick: N[5] || (N[5] = (K) => t("action", "grade", { unitId: e.review.id }))
        }, r(l(ye).grade), 9, Nr)
      ], 64))])) : g("", !0),
      d.value === "complete" && B.value ? (a(), i("div", Tr, [N[11] || (N[11] = n("span", { class: "learning-muted" }, "这组复习已完成", -1)), n("button", {
        type: "button",
        "aria-expanded": !1,
        onClick: N[6] || (N[6] = (K) => O.value = !0)
      }, "查看结果")])) : d.value === "complete" ? (a(), i(M, { key: 3 }, [n("ul", Or, [(a(!0), i(M, null, j(e.review.exercises, (K, V) => (a(), i("li", { key: K.id }, [
        n("button", {
          type: "button",
          class: "learning-review-result",
          "aria-current": V === $.value,
          onClick: (Y) => S(V)
        }, [n("strong", null, r(_(K.itemId)?.label ?? K.prompt), 1), n("small", null, r(l(o)[e.review.assessments.find((Y) => Y.attemptId === c(K.id)?.id)?.verdict ?? "disputed"]), 1)], 8, Br),
        _(K.itemId)?.nextReviewAt ? (a(), i("button", {
          key: 0,
          type: "button",
          class: "learning-chip",
          "aria-expanded": E.value === K.id,
          onClick: (Y) => E.value = E.value === K.id ? "" : K.id
        }, r(l(ft)(_(K.itemId).nextReviewAt)), 9, qr)) : g("", !0),
        E.value === K.id ? (a(), i("small", Pr, r(_(K.itemId)?.scheduleReason), 1)) : g("", !0)
      ]))), 128))]), F(sa, {
        state: e.state,
        "unit-id": e.review.id,
        amount: e.review.reward.amount,
        label: "复习完成",
        disabled: e.disabled,
        quiet: G.value,
        onAction: N[7] || (N[7] = (K, V) => t("action", K, V))
      }, null, 8, [
        "state",
        "unit-id",
        "amount",
        "disabled",
        "quiet"
      ])], 64)) : g("", !0)
    ], 8, br));
  }
}), Vr = _r, Ur = {
  key: 0,
  class: "learning-source-choice",
  "aria-live": "polite"
}, Dr = { class: "learning-row" }, jr = ["disabled"], Wr = ["disabled"], Gr = ["disabled"], Fr = ["disabled"], Hr = ["disabled"], zr = {
  key: 1,
  class: "learning-preparation",
  "aria-live": "polite"
}, Yr = {
  key: 0,
  class: "learning-turn-notice"
}, Kr = { class: "learning-row" }, Jr = ["disabled"], Zr = /* @__PURE__ */ X({
  __name: "LearningPreparation",
  props: {
    state: {},
    disabled: { type: Boolean },
    pending: { type: Boolean }
  },
  emits: ["action"],
  setup(e, { emit: v }) {
    const s = v;
    return (t, o) => e.state.sourceChoice ? (a(), i("section", Ur, [
      n("p", null, r(e.state.sourceChoice === "unconfigured" ? l(oe).noWeb : e.state.preparation?.message || l(oe).unavailable), 1),
      n("div", Dr, [
        e.state.sourceChoice === "unavailable" ? (a(), i("button", {
          key: 0,
          type: "button",
          class: "learning-primary",
          disabled: e.disabled,
          onClick: o[0] || (o[0] = (d) => s("action", "retry-source"))
        }, r(l(oe).retry), 9, jr)) : (a(), i("button", {
          key: 1,
          type: "button",
          class: "learning-primary",
          disabled: e.pending,
          onClick: o[1] || (o[1] = (d) => s("action", "research-settings"))
        }, r(l(oe).settings), 9, Wr)),
        e.state.preparation?.source !== "authored" ? (a(), i("button", {
          key: 2,
          type: "button",
          disabled: e.disabled,
          onClick: o[2] || (o[2] = (d) => s("action", "choose-original"))
        }, r(l(oe).original), 9, Gr)) : g("", !0),
        n("button", {
          type: "button",
          disabled: e.pending,
          onClick: o[3] || (o[3] = (d) => s("action", "dismiss-source"))
        }, r(e.state.unit ? l(oe).existing : l(oe).dismiss), 9, Fr)
      ]),
      e.state.sourceChoice === "unavailable" && e.state.preparation?.source !== "authored" ? (a(), i("button", {
        key: 0,
        type: "button",
        disabled: e.pending,
        onClick: o[4] || (o[4] = (d) => s("action", "research-settings"))
      }, r(l(oe).settings), 9, Hr)) : g("", !0)
    ])) : !e.state.preparation?.running && (e.state.preparation || e.state.unit?.kind === "reading-writing" && !e.state.unit.preparation.ready) ? (a(), i("section", zr, [e.state.preparation?.message ? (a(), i("p", Yr, r(e.state.preparation.message), 1)) : g("", !0), n("div", Kr, [e.state.unit?.kind === "reading-writing" && !e.state.unit.preparation.ready ? (a(), i("button", {
      key: 0,
      type: "button",
      disabled: e.disabled,
      onClick: o[5] || (o[5] = (d) => s("action", "resume-preparation", { unitId: e.state.unit.id }))
    }, r(l(oe).resume), 9, Jr)) : g("", !0)])])) : g("", !0);
  }
}), vt = Zr, Qr = {
  key: 0,
  class: "learning-row"
}, Xr = { class: "learning-muted" }, eo = ["disabled"], to = /* @__PURE__ */ X({
  __name: "LearningCourseSharing",
  props: {
    state: {},
    unit: {},
    disabled: { type: Boolean }
  },
  emits: ["confirm"],
  setup(e, { emit: v }) {
    const s = e, t = v;
    function o() {
      t("confirm", "share-course", {
        unitId: s.unit.id,
        commitId: s.state.commitId,
        approved: !0
      }, rt.confirm);
    }
    return (d, c) => e.unit.shared === !1 ? (a(), i("div", Qr, [n("span", Xr, r(l(rt).private), 1), n("button", {
      type: "button",
      disabled: e.disabled || !e.state.commitId || !l(fe)("share-course", e.state),
      onClick: o
    }, r(l(rt).action), 9, eo)])) : g("", !0);
  }
}), _t = to, ao = { class: "learning-workbench" }, no = {
  key: 1,
  class: "learning-due"
}, io = {
  key: 0,
  class: "learning-working",
  role: "status"
}, lo = ["disabled"], so = ["disabled"], ro = {
  key: 2,
  class: "learning-row"
}, oo = ["disabled"], uo = ["data-learning-unit-id"], vo = { class: "learning-eyebrow" }, co = { tabindex: "-1" }, go = {
  key: 0,
  class: "learning-muted"
}, po = ["onClick"], bo = ["onClick"], mo = { class: "learning-row" }, fo = ["disabled"], ko = {
  key: 8,
  class: "learning-start"
}, yo = ["disabled"], ho = {
  key: 0,
  tabindex: "-1"
}, $o = { key: 1 }, wo = ["aria-label"], xo = { class: "learning-start-reading" }, Co = ["disabled"], Io = ["disabled"], Lo = /* @__PURE__ */ X({
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
  setup(e, { emit: v }) {
    const s = e, t = (w) => s.disabled || !fe(w, s.state), o = v, d = L(() => !!s.state.review && s.state.review.stage.stage !== "complete"), c = L(() => s.state.unit), b = L(() => !c.value || s.state.completions.some((w) => w.unitId === c.value?.id)), C = L(() => s.state.busy && !s.state.pending), f = {
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
    }, $ = L(() => [
      new Intl.DisplayNames(["zh-CN"], { type: "language" }).of(s.state.language),
      s.state.profile?.settings.exam,
      [s.state.profile?.settings.level, s.state.profile?.settings.targetLevel].filter(Boolean).join(" → ")
    ].filter(Boolean).join(" · "));
    function m(w) {
      o("action", "prepare", {
        kind: w,
        message: w === "reading-writing" ? "请按我的训练设置准备一篇读写训练。" : "请按我现在的情况准备一节专项小课。"
      });
    }
    const k = (w, u) => o("action", w, u), y = (w, u, x) => o("confirm", w, u, x);
    return (w, u) => (a(), i("div", ao, [
      !e.preparationInProcess && (!e.state.sourceChoice || !b.value) ? (a(), Q(vt, {
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
      e.state.dueCount && !d.value ? (a(), i("div", no, [n("span", null, r(l(Jt)(e.state.dueCount)), 1), e.state.pending?.purpose === "review-prepare" ? (a(), i("span", io, [
        u[13] || (u[13] = n("span", {
          class: "learning-working-dot",
          "aria-hidden": "true"
        }, null, -1)),
        u[14] || (u[14] = n("span", null, "正在出题…", -1)),
        n("button", {
          type: "button",
          disabled: e.pending,
          onClick: u[0] || (u[0] = (x) => o("action", "cancel"))
        }, "停止", 8, lo)
      ])) : e.state.blockedReview ? g("", !0) : (a(), i("button", {
        key: 1,
        type: "button",
        class: "learning-primary",
        disabled: t("start-review"),
        onClick: u[1] || (u[1] = (x) => o("action", "start-review"))
      }, r(f.review), 9, so))])) : g("", !0),
      e.state.blockedReview ? (a(), i("div", ro, [u[15] || (u[15] = n("p", { class: "learning-muted" }, "有一组复习在另一个故事中进行。回到那个故事可以接着做；也可以放下它，在这里重新出题。", -1)), n("button", {
        type: "button",
        disabled: t("abandon-review"),
        onClick: u[2] || (u[2] = (x) => y("abandon-review", {}, l($e).review))
      }, "放下", 8, oo)])) : g("", !0),
      e.state.review ? (a(), Q(_t, {
        key: 3,
        state: e.state,
        unit: e.state.review,
        disabled: e.disabled,
        onConfirm: y
      }, null, 8, [
        "state",
        "unit",
        "disabled"
      ])) : g("", !0),
      e.state.review ? (a(), Q(Vr, {
        key: 4,
        state: e.state,
        review: e.state.review,
        disabled: e.disabled,
        pending: e.pending,
        onAction: k,
        onConfirm: y,
        onAsk: u[3] || (u[3] = (x, T) => o("ask", x, void 0, T))
      }, null, 8, [
        "state",
        "review",
        "disabled",
        "pending"
      ])) : g("", !0),
      c.value ? (a(), Q(_t, {
        key: 5,
        state: e.state,
        unit: c.value,
        disabled: e.disabled,
        onConfirm: y
      }, null, 8, [
        "state",
        "unit",
        "disabled"
      ])) : g("", !0),
      c.value?.kind === "reading-writing" ? (a(), Q(pr, {
        key: 6,
        "data-learning-unit-id": c.value.id,
        state: e.state,
        unit: c.value,
        disabled: e.disabled,
        pending: e.pending,
        onAction: k,
        onConfirm: y,
        onAsk: u[4] || (u[4] = (x, T) => o("ask", x, T, c.value.id)),
        onAssistant: u[5] || (u[5] = (x) => o("assistant", x, c.value.id)),
        onRecord: u[6] || (u[6] = (x) => o("record", x))
      }, null, 8, [
        "data-learning-unit-id",
        "state",
        "unit",
        "disabled",
        "pending"
      ])) : c.value ? (a(), i("section", {
        key: 7,
        class: "learning-lesson",
        "data-learning-unit-id": c.value.id
      }, [
        n("p", vo, "专项小课 · 完成可得 " + r(c.value.reward.amount) + " 小白币", 1),
        n("h1", co, r(c.value.title), 1),
        c.value.goal ? (a(), i("p", go, r(c.value.goal), 1)) : g("", !0),
        (a(!0), i(M, null, j(c.value.materials, (x) => (a(), i("button", {
          key: x.id,
          type: "button",
          class: "learning-activity-link",
          onClick: (T) => o("present", {
            unitId: c.value.id,
            kind: "material",
            id: x.id,
            title: x.title
          })
        }, [
          F(Z, { name: "book" }),
          n("span", null, r(x.title), 1),
          F(Z, { name: "arrow" })
        ], 8, po))), 128)),
        (a(!0), i(M, null, j(c.value.exercises, (x) => (a(), i("button", {
          key: x.id,
          type: "button",
          class: "learning-activity-link",
          onClick: (T) => o("present", {
            unitId: c.value.id,
            kind: "exercise",
            id: x.id,
            title: x.prompt
          })
        }, [
          F(Z, { name: c.value.stage.exercises.find((T) => T.exerciseId === x.id)?.status === "done" ? "check" : "records" }, null, 8, ["name"]),
          n("span", null, r(x.prompt), 1),
          F(Z, { name: "arrow" })
        ], 8, bo))), 128)),
        n("div", mo, [n("button", {
          type: "button",
          disabled: t("complete"),
          onClick: u[7] || (u[7] = (x) => o("action", "complete"))
        }, r(f.complete), 9, fo), n("button", {
          type: "button",
          onClick: u[8] || (u[8] = (x) => o("go", "materials"))
        }, r(f.notes), 1)])
      ], 8, uo)) : g("", !0),
      b.value ? (a(), i("section", ko, [e.state.blockedUnit ? (a(), i(M, { key: 0 }, [
        u[16] || (u[16] = n("h1", { tabindex: "-1" }, "当前课件在另一个故事中", -1)),
        u[17] || (u[17] = n("p", { class: "learning-muted" }, "回到那个故事可以继续；也可以放下它，在这里重新开始。", -1)),
        n("button", {
          type: "button",
          disabled: t("abandon"),
          onClick: u[9] || (u[9] = (x) => y("abandon", {}, l($e).lesson))
        }, "放下并重新开始", 8, yo)
      ], 64)) : (a(), i(M, { key: 1 }, [
        c.value ? (a(), i("h2", $o, r(f.next), 1)) : (a(), i("h1", ho, r(f.reading), 1)),
        c.value ? g("", !0) : (a(), i("button", {
          key: 2,
          type: "button",
          class: "learning-start-preference",
          "aria-label": `${f.settings}：${$.value}`,
          onClick: u[10] || (u[10] = (x) => o("go", "settings"))
        }, [n("span", null, [n("strong", null, r(f.settings), 1), n("small", null, r($.value), 1)]), F(Z, { name: "arrow" })], 8, wo)),
        e.state.sourceChoice && !e.preparationInProcess ? (a(), Q(vt, {
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
        !C.value && !e.state.sourceChoice ? (a(), i(M, { key: 4 }, [n("section", xo, [
          F(Z, { name: "workbook" }),
          n("p", null, r(f.readingHint), 1),
          n("button", {
            type: "button",
            class: "learning-primary",
            disabled: t("prepare"),
            onClick: u[11] || (u[11] = (x) => m("reading-writing"))
          }, [z(r(f.start), 1), F(Z, { name: "arrow" })], 8, Co)
        ]), n("button", {
          type: "button",
          class: "learning-start-secondary",
          disabled: t("prepare"),
          onClick: u[12] || (u[12] = (x) => m("lesson"))
        }, [
          F(Z, { name: "records" }),
          n("span", null, [n("strong", null, r(f.lesson), 1), n("small", null, r(f.lessonHint), 1)]),
          F(Z, { name: "arrow" })
        ], 8, Io)], 64)) : g("", !0)
      ], 64))])) : g("", !0)
    ]));
  }
}), So = Lo;
function Vt(e) {
  try {
    return JSON.parse(e);
  } catch {
    return {};
  }
}
function Ao(e) {
  const v = [];
  for (const s of e.messages) s.role === "assistant" ? v.push({
    message: s,
    results: []
  }) : s.role === "tool" && v.at(-1)?.results.push(s);
  return v.map(({ message: s, results: t }, o) => ({
    index: o + 1,
    text: s.toolCalls?.length ? s.content : "",
    receivedChars: s.receivedChars,
    thinking: s.hasReasoning,
    streaming: !!s.streaming,
    tools: (s.toolCalls ?? []).map((d) => {
      const c = t.find(($) => $.toolCallId === d.id), b = Vt(c?.content ?? ""), C = e.status === "running", f = c?.error || b.ok === !1 ? "failed" : c?.content && !c.streaming ? "done" : !C || s.error ? c ? "cancelled" : "not-run" : c?.streaming ? "running" : "preparing";
      return {
        id: d.id,
        name: d.name,
        status: f,
        input: Vt(d.arguments),
        result: b
      };
    })
  }));
}
var Ro = {
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
function Mo(e, v) {
  if (e === "learning_extract_http_failed" || e === "learning_search_failed") {
    if (v === 401) return "联网取材的验证没有通过，请检查联网密钥是否有效。";
    if (v === 403) return "联网服务拒绝了这次请求，请检查账号或接口权限；不一定是密钥填错。";
    if (v === 404 || v === 405) return e === "learning_extract_http_failed" ? "当前联网地址不支持读取正文，请检查联网取材地址，或改读原创文章。" : "当前联网地址不支持搜索，请检查联网取材地址，或改读原创文章。";
    if (v === 429) return "联网服务暂时限制了请求，请稍后重试，并检查剩余额度。";
    if (v && v >= 500) return "联网服务暂时不可用，请稍后重试，或先读原创文章。";
  }
  return Ro[e];
}
var Eo = ["aria-label"], No = { class: "learning-process-header" }, To = ["aria-expanded"], Oo = { "aria-hidden": "true" }, Bo = ["disabled", "aria-label"], qo = ["aria-label"], Po = ["data-status"], _o = {
  class: "learning-process-dot",
  "aria-hidden": "true"
}, Vo = { key: 0 }, Uo = { class: "learning-process-result" }, Do = {
  key: 1,
  class: "learning-process-status",
  role: "status",
  "aria-live": "polite"
}, jo = {
  key: 0,
  class: "learning-working-dot",
  "aria-hidden": "true"
}, Wo = {
  key: 2,
  class: "learning-process-recovery"
}, Go = /* @__PURE__ */ X({
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
  setup(e, { emit: v }) {
    const s = e, t = v, o = L(() => Ao(s.turn)), d = L(() => o.value.flatMap((u) => u.tools)), c = L(() => s.turn.status === "running"), b = L(() => oe.taskTitles[s.turn.purpose]), C = H(null), f = fa(), $ = L(() => C.value ?? (c.value || s.turn.status === "failed" || !!f.default)), m = H(null), k = L(() => s.turn.progress?.round ?? o.value.at(-1)?.index), y = L(() => {
      if (!c.value) return ne.outcomes[s.turn.status];
      const u = o.value.at(-1), x = u?.tools.find((T) => T.status === "running" || T.status === "preparing");
      if (x) return `${ne.tools[x.name] ?? ne.unknownTool} · ${ne[x.status]}`;
      if (s.turn.progress?.stage === "provider" && u?.streaming) {
        if (u.receivedChars) return ne.received(u.receivedChars);
        if (u.thinking) return ne.thinking;
      }
      return Ol(s.turn.progress ?? { stage: "provider" });
    });
    function w(u) {
      const x = [];
      u.result.error && x.push(Mo(u.result.error, u.result.httpStatus));
      const T = u.result.section ?? u.input.section;
      return T && ne.sections[T] && x.push(ne.sections[T]), u.result.resultsCount !== void 0 && (!u.result.error || u.result.resultsCount > 0) && x.push(u.name === "LearningExtract" ? ne.extracted(u.result.resultsCount) : ne.results(u.result.resultsCount)), u.result.paragraphCount !== void 0 && x.push(ne.paragraphs(u.result.paragraphCount)), u.result.dataCount !== void 0 && x.push(ne.entries(u.result.dataCount)), u.result.failedCount && (!u.result.error || u.result.failedCount > 1) && x.push(ne.sourcesFailed(u.result.failedCount)), u.name === "LearningLessonEdit" && (u.input.materialsCount && x.push(ne.proposedMaterials(u.input.materialsCount)), u.input.exercisesCount && x.push(ne.proposedExercises(u.input.exercisesCount))), x.join(" · ");
    }
    return J(c, () => {
      C.value = null;
    }), J(() => s.turn.messages, async () => {
      const u = m.value, x = !u || u.scrollHeight - u.scrollTop - u.clientHeight < 48;
      await de(), x && m.value && (m.value.scrollTop = m.value.scrollHeight);
    }), (u, x) => c.value || d.value.length || u.$slots.default ? (a(), i("section", {
      key: 0,
      class: ue(["learning-process", { "is-running": c.value }]),
      "aria-label": l(ne).title
    }, [
      n("header", No, [n("button", {
        type: "button",
        class: "learning-process-toggle",
        "aria-expanded": $.value,
        onClick: x[0] || (x[0] = (T) => C.value = !$.value)
      }, [
        n("span", Oo, r($.value ? "⌄" : "›"), 1),
        n("strong", null, r(b.value ?? l(ne).title), 1),
        n("small", null, r(c.value && k.value ? l(ne).round(k.value) : l(ne).history(d.value.length)), 1)
      ], 8, To), c.value && e.stoppable ? (a(), i("button", {
        key: 0,
        type: "button",
        class: "learning-process-stop",
        disabled: e.disabled,
        "aria-label": l(ne).stop,
        onClick: x[1] || (x[1] = (T) => t("stop"))
      }, "■", 8, Bo)) : g("", !0)]),
      $.value ? (a(), i("div", {
        key: 0,
        ref_key: "body",
        ref: m,
        class: "learning-process-body"
      }, [(a(!0), i(M, null, j(o.value, (T) => (a(), i(M, { key: T.index }, [T.text ? (a(), Q(gt, {
        key: 0,
        class: "learning-markdown learning-process-narration",
        text: T.text
      }, null, 8, ["text"])) : g("", !0), T.tools.length ? (a(), i("ol", {
        key: 1,
        class: "learning-process-steps",
        "aria-label": l(ne).round(T.index)
      }, [(a(!0), i(M, null, j(T.tools, (D) => (a(), i("li", {
        key: D.id,
        "data-status": D.status
      }, [
        n("span", _o, r(D.status === "done" ? "✓" : D.status === "failed" ? "!" : "·"), 1),
        n("div", null, [
          n("span", null, r(l(ne).tools[D.name] ?? l(ne).unknownTool), 1),
          w(D) ? (a(), i("small", Vo, r(w(D)), 1)) : g("", !0),
          (a(!0), i(M, null, j(D.result.errors, (E, ee) => (a(), i("small", {
            key: ee,
            class: "learning-process-error"
          }, r(E.message), 1))), 128))
        ]),
        n("small", Uo, r(l(ne)[D.status]), 1)
      ], 8, Po))), 128))], 8, qo)) : g("", !0)], 64))), 128))], 512)) : g("", !0),
      c.value || !u.$slots.default && e.turn.status === "finished" && (!b.value || $.value) ? (a(), i("p", Do, [c.value ? (a(), i("span", jo)) : g("", !0), z(r(y.value), 1)])) : g("", !0),
      u.$slots.default ? (a(), i("div", Wo, [ga(u.$slots, "default")])) : g("", !0)
    ], 10, Eo)) : g("", !0);
  }
}), ua = Go;
function Ue(e, v, s) {
  return e.notice === "history-save" && v !== "ready" || e.notice === "learning-save" && s !== "ready" ? "" : e.message;
}
function he(e) {
  return e.kind === "prepare";
}
function Qe(e) {
  return e.kind === "talk" || e.kind === "companion" || e.kind === "task-result";
}
var Ut = {
  initial: "我想跟你学这门语言，先聊聊吧。",
  returning: "我来继续学语言了，先聊聊今天从哪里开始吧。"
}, Fo = { class: "learning-messages" }, Ho = /* @__PURE__ */ X({
  __name: "LearningMessages",
  props: {
    turn: {},
    disabled: { type: Boolean }
  },
  emits: ["stop"],
  setup(e, { emit: v }) {
    const s = e, t = v, o = L(() => s.turn.messages.filter((d) => d.role === "assistant" && !d.toolCalls?.length && d.content));
    return (d, c) => (a(), i("div", Fo, [F(ua, {
      turn: e.turn,
      stoppable: "",
      disabled: e.disabled,
      onStop: c[0] || (c[0] = (b) => t("stop"))
    }, null, 8, ["turn", "disabled"]), (a(!0), i(M, null, j(o.value, (b, C) => (a(), i("div", {
      key: C,
      class: ue(["learning-output", { "is-streaming": b.streaming }])
    }, [F(gt, {
      class: "learning-markdown",
      text: b.content
    }, null, 8, ["text"])], 2))), 128))]));
  }
}), zo = Ho, Yo = {
  workbench: "学习助手",
  companion: "语伴",
  historyLoadFailed: "暂时没能打开对话记录，请重新加载。学习内容保留。",
  historySaveFailed: "回复已收到，但这段对话还没有保存。请检查保存状态，回复不需要重新生成。",
  stopped: "已停止回复，已收到的内容保留。",
  retryUnavailable: "这条消息已不能重试，请先检查保存状态，或在当前对话里重新提问。",
  workStopped: "已停止。已保存的学习内容保留。",
  changed: "学习内容已变化，这次操作没有继续。",
  delegatedBusy: "当前训练操作尚未完成，这次委托没有执行。",
  notificationFailed: "工作台的结果已保留，但语伴还没收到。可以重试通知，不会重新执行任务。",
  notificationRetry: "重试通知",
  memoryClearFailed: "对话记录尚未确认清理，请检查保存状态。",
  learningSaveUnconfirmed: "学习修改尚未确认保存，请检查保存。",
  learningSaveConflict: "学习记录有冲突，请检查保存。",
  learningSaveRecovered: "已确认刚才的修改保存成功。这次工作中途停下了，可以接着提出未完成的要求。"
};
function Ko(e, v) {
  if (!e || e.id !== v?.unitId || !v.exerciseId || !e.exercises.some((t) => t.id === v.exerciseId)) return null;
  const s = {
    exerciseId: v.exerciseId,
    text: v.text,
    selection: v.selection ?? null
  };
  return {
    note: s,
    saved: e.notes?.some((t) => t.exerciseId === s.exerciseId && t.text === s.text && JSON.stringify(t.selection) === JSON.stringify(s.selection)) ?? !1
  };
}
var Jo = { class: "learning-conversation" }, Zo = { class: "learning-conversation-heading" }, Qo = {
  class: "learning-person-initial",
  "aria-hidden": "true"
}, Xo = ["disabled"], eu = ["aria-label"], tu = ["aria-label"], au = {
  key: 0,
  class: "learning-history-notice"
}, nu = {
  key: 0,
  class: "learning-conversation-user"
}, iu = {
  key: 1,
  class: "learning-turn-recovery"
}, lu = ["disabled", "onClick"], su = ["disabled", "onClick"], ru = {
  key: 3,
  class: "learning-conversation-tools"
}, ou = ["disabled", "onClick"], uu = ["disabled", "onClick"], du = {
  key: 1,
  class: "learning-working",
  role: "status"
}, vu = {
  key: 2,
  class: "learning-turn-notice is-error",
  role: "status"
}, cu = {
  class: "learning-turn-notice is-error",
  role: "status"
}, gu = ["disabled", "onClick"], pu = {
  key: 3,
  class: "learning-conversation-empty"
}, bu = ["disabled"], mu = { class: "learning-composer-surface" }, fu = {
  key: 0,
  class: "learning-composer-quote"
}, ku = { class: "learning-composer-row" }, yu = [
  "disabled",
  "maxlength",
  "aria-label",
  "placeholder"
], hu = [
  "type",
  "disabled",
  "aria-label",
  "title"
], $u = /* @__PURE__ */ X({
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
  setup(e, { expose: v, emit: s }) {
    const t = e, o = L(() => t.target === "workbench" ? t.state.workbenchConversation : t.state.conversation), d = L(() => t.target === "workbench" ? t.state.workbenchBusy : t.state.chatBusy), c = L(() => t.target === "workbench" ? t.state.workbenchMessage : t.state.chatMessage), b = L(() => t.target === "companion" ? t.state.delegatedTasks.filter((V) => V.notification === "failed") : []), C = L(() => t.target === "workbench" ? t.state.workbenchStorage : t.state.chatStorage), f = L(() => t.target === "workbench" ? t.state.reply : t.state.companionReply), $ = L(() => t.target === "workbench" ? te.assistant : t.state.teacher?.name ?? "语伴"), m = L(() => o.value.turns.map((V, Y) => ({
      turn: V,
      index: Y
    })).filter(({ turn: V }) => !he({ kind: V.purpose ?? "talk" }) || V.status === "running")), k = {
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
    ]), w = s, u = Ne(), x = t.target === "workbench" ? u.workbenchChat : u.chat, T = (V, Y = {}) => w("action", V, {
      ...Y,
      target: t.target
    }), D = ke(x, "text"), E = H(null), ee = H(null), W = H(null), R = ke(x, "focus");
    let S = null, I = 0;
    function q() {
      const V = W.value;
      V && (x.scroll = V.scrollTop, x.following = V.scrollHeight - V.scrollTop - V.clientHeight < 70);
    }
    async function G() {
      await de(), x.following && W.value && (W.value.scrollTop = W.value.scrollHeight);
    }
    function O() {
      const V = E.value;
      V?.clientWidth && (V.style.height = "auto", V.style.height = `${V.scrollHeight}px`, G());
    }
    J(D, O, { flush: "post" }), J(E, (V) => {
      if (S?.disconnect(), cancelAnimationFrame(I), !V) return;
      let Y = 0;
      S = new ResizeObserver(([U]) => {
        U.contentRect.width !== Y && (Y = U.contentRect.width, cancelAnimationFrame(I), I = requestAnimationFrame(O));
      }), S.observe(V.parentElement);
    }, { flush: "post" }), Me(() => {
      W.value && (W.value.scrollTop = x.scroll), G();
    }), Ee(() => {
      W.value && (x.scroll = W.value.scrollTop), S?.disconnect(), cancelAnimationFrame(I);
    });
    function B() {
      if (t.disabled || !D.value.trim()) return;
      const V = D.value.trim();
      x.sent = {
        text: D.value,
        user: R.value?.selection ? `${V}

${R.value.selection.quote}` : V,
        after: o.value.turns.length + o.value.removedTurns
      }, x.following = !0, T("talk", {
        message: V,
        ...R.value ?? x.study ?? {}
      });
    }
    function _(V) {
      V.key !== "Enter" || V.shiftKey || V.isComposing || V.keyCode === 229 || (V.preventDefault(), B());
    }
    J([() => o.value.turns, () => d.value], G);
    function P(V) {
      const Y = [t.state.unit, t.state.review].find((U) => U?.id === V.unitId);
      return !!Y && (V.kind === "exercise" ? Y.exercises : Y.materials).some((U) => U.id === V.id);
    }
    const N = L(() => t.state.unit?.id === f.value?.unitId ? t.state.unit : null), K = L(() => Ko(N.value, f.value));
    return v({
      async ask(V, Y, U = t.state.unit?.id) {
        R.value = {
          unitId: U,
          exerciseId: V,
          selection: Y,
          help: !!V && !Y
        }, x.study = U ? {
          unitId: U,
          exerciseId: V
        } : null, await de(), E.value?.focus();
      },
      focusHeading: () => ee.value?.focus({ preventScroll: !0 })
    }), (V, Y) => (a(), i("section", Jo, [
      n("header", Zo, [
        n("span", Qo, r(e.target === "workbench" ? "a" : [...$.value][0]), 1),
        n("h1", {
          ref_key: "heading",
          ref: ee,
          tabindex: "-1"
        }, r($.value), 513),
        e.target === "companion" ? (a(), i("button", {
          key: 0,
          type: "button",
          disabled: e.disabled,
          "aria-label": "更换学习语言和语伴",
          onClick: Y[0] || (Y[0] = (U) => w("profile"))
        }, r(new Intl.DisplayNames(["zh-CN"], { type: "language" }).of(e.state.language)), 9, Xo)) : (a(), i("button", {
          key: 1,
          type: "button",
          "aria-label": l(te).closeAssistant,
          onClick: Y[1] || (Y[1] = (U) => w("close"))
        }, [F(Z, { name: "close" })], 8, eu))
      ]),
      n("div", {
        ref_key: "scroller",
        ref: W,
        class: "learning-conversation-turns",
        "aria-label": e.target === "workbench" ? l(te).assistant : k.conversation,
        onScroll: q
      }, [
        o.value.removedTurns ? (a(), i("p", au, r(k.history), 1)) : g("", !0),
        (a(!0), i(M, null, j(m.value, ({ turn: U, index: we }, Oe) => (a(), i("div", {
          key: o.value.removedTurns + we,
          class: "learning-conversation-turn"
        }, [
          U.user && !l(y).has(U.purpose) && !l(he)({ kind: U.purpose ?? "talk" }) ? (a(), i("p", nu, r(U.user), 1)) : g("", !0),
          F(zo, {
            turn: U,
            disabled: e.pending,
            onStop: (le) => T(l(Qe)({ kind: U.purpose ?? "talk" }) ? "cancel-chat" : l(he)({ kind: U.purpose ?? "talk" }) ? "cancel-preparation" : "cancel")
          }, null, 8, [
            "turn",
            "disabled",
            "onStop"
          ]),
          U.purpose !== "task-result" && (l(Ue)(U, C.value, e.state.storage) || U.retryable) ? (a(), i("div", iu, [l(Ue)(U, C.value, e.state.storage) ? (a(), i("p", {
            key: 0,
            class: ue(["learning-turn-notice", { "is-error": U.status === "failed" }]),
            role: "status"
          }, r(l(Ue)(U, C.value, e.state.storage)), 3)) : g("", !0), U.retryable ? (a(), i("button", {
            key: 1,
            type: "button",
            disabled: e.disabled || e.pending,
            onClick: (le) => T("retry-chat", { id: U.id })
          }, r(l(te).retry), 9, lu)) : g("", !0)])) : g("", !0),
          U.presentation ? (a(), i("button", {
            key: 2,
            type: "button",
            class: "learning-activity-link",
            disabled: !P(U.presentation),
            onClick: (le) => w("present", U.presentation)
          }, [
            F(Z, { name: U.presentation.kind === "material" ? "book" : "records" }, null, 8, ["name"]),
            n("span", null, r(U.presentation.title), 1),
            F(Z, { name: "arrow" })
          ], 8, su)) : g("", !0),
          Oe === m.value.length - 1 && f.value && f.value.id === U.id ? (a(), i("div", ru, [[...U.teacher].length <= 1e3 ? (a(), i("button", {
            key: 0,
            type: "button",
            disabled: e.disabled,
            onClick: (le) => T("say-reply", { id: U.id })
          }, [F(Z, { name: "sound" }), z(r(l(te).listen), 1)], 8, ou)) : g("", !0), K.value && N.value && [...U.teacher].length <= 4e3 ? (a(), i("button", {
            key: 1,
            type: "button",
            disabled: e.disabled || K.value.saved,
            onClick: (le) => T("save-note", {
              id: U.id,
              unitId: N.value.id
            })
          }, r(l(te).saveNote), 9, uu)) : g("", !0)])) : g("", !0)
        ]))), 128)),
        d.value && !o.value.turns.some((U) => U.status === "running" && l(Qe)({ kind: U.purpose ?? "talk" })) ? (a(), i("div", du, [Y[7] || (Y[7] = n("span", {
          class: "learning-working-dot",
          "aria-hidden": "true"
        }, null, -1)), n("span", null, r(c.value), 1)])) : !d.value && c.value && C.value === "ready" ? (a(), i("p", vu, r(c.value), 1)) : g("", !0),
        (a(!0), i(M, null, j(b.value, (U) => (a(), i("div", {
          key: U.taskId,
          class: "learning-turn-recovery"
        }, [n("p", cu, r(U.notificationError), 1), n("button", {
          type: "button",
          disabled: e.pending || e.state.chatBusy || !["ready", "unconfirmed"].includes(C.value),
          onClick: (we) => T("retry-notification", { id: U.taskId })
        }, r(l(Yo).notificationRetry), 9, gu)]))), 128)),
        !m.value.length && !d.value ? (a(), i("div", pu, [
          F(Z, { name: "chat" }),
          n("p", null, r(e.target === "workbench" ? l(te).assistantEmpty : e.state.teacher ? k.empty : k.select), 1),
          e.target === "companion" && !e.state.teacher ? (a(), i("button", {
            key: 0,
            class: "learning-primary",
            type: "button",
            onClick: Y[2] || (Y[2] = (U) => w("profile"))
          }, r(k.select), 1)) : e.target === "companion" ? (a(), i("button", {
            key: 1,
            type: "button",
            disabled: e.disabled,
            onClick: Y[3] || (Y[3] = (U) => T("talk", { message: e.state.profile ? l(Ut).returning : l(Ut).initial }))
          }, r(k.opening), 9, bu)) : g("", !0)
        ])) : g("", !0)
      ], 40, tu),
      e.target === "workbench" || e.state.teacher ? (a(), i("form", {
        key: 0,
        class: "learning-conversation-compose",
        onSubmit: ve(B, ["prevent"])
      }, [n("div", mu, [R.value ? (a(), i("div", fu, [n("span", null, r(R.value.selection?.quote ?? "请教这道题"), 1), n("button", {
        type: "button",
        "aria-label": "取消引用",
        onClick: Y[4] || (Y[4] = (U) => R.value = null)
      }, "×")])) : g("", !0), n("div", ku, [se(n("textarea", {
        ref_key: "composer",
        ref: E,
        "onUpdate:modelValue": Y[5] || (Y[5] = (U) => D.value = U),
        rows: "1",
        disabled: C.value !== "ready",
        maxlength: R.value?.selection ? 1800 : R.value?.exerciseId ? 2e3 : 4e3,
        "aria-label": e.target === "workbench" ? l(te).assistantPlaceholder : "和语伴说",
        placeholder: e.target === "workbench" ? l(te).assistantPlaceholder : "和语伴说…",
        onKeydown: _
      }, null, 40, yu), [[ge, D.value], [l(Xe), l(x)]]), n("button", {
        type: d.value ? "button" : "submit",
        class: ue(d.value ? "learning-composer-stop" : "learning-primary"),
        disabled: d.value ? e.pending : e.disabled || !D.value.trim(),
        "aria-label": d.value ? l(te).stop : l(te).send,
        title: d.value ? l(te).stop : l(te).send,
        onClick: Y[6] || (Y[6] = ve((U) => d.value ? T("cancel-chat") : B(), ["prevent"]))
      }, [F(Z, { name: d.value ? "stop" : "send" }, null, 8, ["name"])], 10, hu)])])], 32)) : g("", !0)
    ]));
  }
}), Dt = $u;
function wu(e) {
  const v = wa(structuredClone(Ca(e.initialState))), s = H(!1), t = H(null), o = L(() => t.value ? zt[t.value] : ""), d = L(() => t.value === "unknown" || t.value === "rejected");
  let c = !1, b = 0, C = () => {
  };
  const f = (y) => !s.value && fe(y, v.value), $ = L(() => f("submit")), m = L(() => f("talk"));
  async function k(y, w = {}) {
    if (s.value) return;
    if (dt(Fs(y, w.target), v.value)) {
      t.value = "busy";
      return;
    }
    s.value = !0, t.value = null;
    const u = v.value.chatIdentity, x = b;
    let T = !1;
    try {
      const D = JSON.parse(JSON.stringify({
        chatIdentity: u,
        ...w
      }));
      T = !0;
      const E = await e.bridge.request(`learning/${y}`, D, 35e3);
      return !c || v.value.chatIdentity !== u ? void 0 : (b === x && E.result.state.chatIdentity === u && (v.value = E.result.state), E.result.rejected && (t.value = E.result.rejected), E.result);
    } catch (D) {
      c && v.value.chatIdentity === u && (t.value = !T || D instanceof Ia && D.code === "host_request_not_sent" ? "notSent" : D instanceof $a ? "rejected" : "unknown");
    } finally {
      c && (s.value = !1);
    }
  }
  return Me(() => {
    c = !0, C = e.bridge.subscribe((y) => {
      if (y.type === "learning/media") {
        v.value = {
          ...v.value,
          media: y.payload.media
        };
        return;
      }
      if (y.type !== "learning/state") return;
      const w = y.payload.state;
      w.chatIdentity === v.value.chatIdentity && (b++, v.value = w);
    });
  }), Ee(() => {
    c = !1, C();
  }), {
    state: v,
    pending: s,
    writable: $,
    canChat: m,
    canRequest: f,
    localIssue: t,
    localMessage: o,
    needsRefresh: d,
    request: k
  };
}
function xu(e = Math.random) {
  return Math.round(3 * 6e4 + Math.min(Math.max(e(), 0), 1) * 9 * 6e4);
}
function Cu(e) {
  let v = !1, s, t = 0;
  function o() {
    s !== void 0 && (e.clearTimer(s), s = void 0);
  }
  function d() {
    if (!v) return;
    const c = t;
    s = e.setTimer(() => {
      c === t && (s = void 0, v && (e.opportunity(), d()));
    }, xu(e.random));
  }
  return {
    update(c) {
      v !== c && (v = c, t++, o(), d());
    },
    dispose() {
      v = !1, t++, o();
    }
  };
}
function Iu(e) {
  const v = H(!1), s = H(!1), t = H(!1), o = H(!1), d = H("");
  let c, b;
  const C = L(() => e.preference.enabled && e.reading.value && v.value && !e.blocked.value && !!e.state.value.teacher && e.state.value.storage === "ready"), f = L(() => C.value && !s.value && !t.value && !o.value && !e.pending.value && !e.state.value.busy && !e.state.value.chatBusy && !e.state.value.companionBusy);
  function $() {
    const E = e.root.value?.querySelector(".learning-scroll")?.getBoundingClientRect(), ee = E?.top ?? 0, W = [...e.root.value?.querySelectorAll("[data-material-id][data-paragraph-id]") ?? []].find((R) => R.getBoundingClientRect().bottom > ee + 60 && R.getBoundingClientRect().top < (E?.bottom ?? 0));
    return W ? {
      materialId: W.dataset.materialId,
      paragraphId: W.dataset.paragraphId
    } : null;
  }
  const m = Cu({
    setTimer: (E, ee) => setTimeout(E, ee),
    clearTimer: (E) => clearTimeout(E),
    opportunity: () => {
      const E = $();
      E && e.request("companion", E);
    }
  });
  J(f, (E) => m.update(E), { immediate: !0 }), J([
    C,
    s,
    t,
    o,
    e.pending,
    () => e.state.value.companionBusy
  ], ([E, ee, W, R, S, I]) => {
    I && !S && (!E || ee || W || R) && e.request("cancel-companion");
  });
  function k() {
    const E = document.activeElement;
    s.value = E instanceof HTMLElement && !!e.root.value?.contains(E) && E.matches("textarea, input:not([type=checkbox],[type=radio],[type=range]), [contenteditable=true]");
  }
  const y = () => queueMicrotask(k);
  function w() {
    const E = document.getSelection();
    t.value = !!E && !E.isCollapsed && !!e.root.value?.contains(E.anchorNode);
  }
  function u() {
    clearTimeout(c), o.value = !0, c = setTimeout(() => {
      o.value = !1;
    }, 3e4);
  }
  function x(E) {
    !(E.target instanceof HTMLElement) || !E.target.matches("textarea, input:not([type=checkbox],[type=radio],[type=range]), [contenteditable=true]") || u();
  }
  function T() {
    v.value = document.visibilityState === "visible", v.value || (clearTimeout(c), o.value = !1, D()), k();
  }
  function D() {
    clearTimeout(b), d.value = "";
  }
  return J(() => e.state.value.remark?.text ?? "", (E) => {
    D(), E && e.reading.value && v.value && !s.value && !t.value && !o.value && !e.blocked.value && (d.value = E, b = setTimeout(D, 1e4));
  }), J([
    e.reading,
    e.blocked,
    s,
    t,
    o
  ], ([E, ee, W, R, S]) => {
    (!E || ee || W || R || S) && D();
  }), Me(() => {
    T(), document.addEventListener("visibilitychange", T), document.addEventListener("selectionchange", w), e.root.value?.addEventListener("pointerdown", u), e.root.value?.addEventListener("focusin", y), e.root.value?.addEventListener("focusout", y), e.root.value?.addEventListener("input", x);
  }), Ee(() => {
    m.dispose(), clearTimeout(c), D(), document.removeEventListener("visibilitychange", T), document.removeEventListener("selectionchange", w), e.root.value?.removeEventListener("pointerdown", u), e.root.value?.removeEventListener("focusin", y), e.root.value?.removeEventListener("focusout", y), e.root.value?.removeEventListener("input", x);
  }), {
    bubble: d,
    dismiss: D
  };
}
var Lu = { class: "learning-toolbar" }, Su = {
  key: 0,
  class: "learning-unread-dot",
  "aria-hidden": "true"
}, Au = {
  key: 1,
  class: "learning-layout-control"
}, Ru = ["min", "max"], Mu = ["aria-label", "aria-expanded"], Eu = { "aria-label": "学习资料与设置" }, Nu = { "aria-label": "学习资料与设置" }, Tu = ["onClick"], Ou = {
  key: 0,
  class: "learning-notice",
  role: "status",
  "aria-live": "polite"
}, Bu = { class: "learning-row" }, qu = ["disabled"], Pu = ["disabled"], _u = ["disabled"], Vu = ["disabled"], Uu = {
  key: 1,
  class: "learning-notice",
  role: "status",
  "aria-live": "polite"
}, Du = { class: "learning-row" }, ju = ["disabled"], Wu = ["disabled"], Gu = {
  key: 2,
  class: "learning-notice",
  role: "status"
}, Fu = ["disabled"], Hu = ["disabled"], zu = ["inert", "aria-hidden"], Yu = ["inert", "aria-hidden"], Ku = {
  key: 2,
  class: "learning-working",
  role: "status"
}, Ju = ["disabled"], Zu = {
  key: 5,
  class: "learning-materials-page"
}, Qu = {
  key: 0,
  class: "learning-empty-note"
}, Xu = { class: "learning-materials-title" }, ed = ["onClick"], td = ["onClick"], ad = {
  key: 0,
  class: "learning-notes"
}, nd = { key: 0 }, id = ["disabled", "onClick"], ld = {
  key: 7,
  class: "learning-harvest-page"
}, sd = {
  key: 0,
  class: "learning-empty-note"
}, rd = { key: 0 }, od = { class: "learning-muted" }, ud = ["disabled", "onClick"], dd = ["disabled"], vd = ["disabled"], cd = {
  key: 3,
  class: "learning-row"
}, gd = ["disabled"], pd = ["disabled"], bd = {
  key: 8,
  class: "learning-settings-page"
}, md = ["value", "disabled"], fd = ["value"], kd = {
  key: 0,
  class: "learning-settings-goal"
}, yd = {
  key: 0,
  class: "learning-muted"
}, hd = ["value", "disabled"], $d = ["disabled"], wd = ["disabled"], xd = ["disabled"], Cd = ["disabled"], Id = ["disabled"], Ld = ["disabled"], Sd = ["disabled"], Ad = ["disabled"], Rd = ["inert", "aria-hidden"], Md = ["aria-label"], Ed = { class: "learning-person-initial" }, Nd = {
  key: 0,
  class: "learning-unread-dot",
  "aria-hidden": "true"
}, Td = ["aria-label"], Od = {
  key: 0,
  class: "learning-unread-dot",
  "aria-hidden": "true"
}, Bd = {
  role: "alertdialog",
  "aria-labelledby": "learning-confirm-title",
  class: "learning-confirm"
}, qd = { id: "learning-confirm-title" }, Pd = { class: "learning-row" }, _d = ["disabled"], Vd = /* @__PURE__ */ X({
  __name: "LearningApp",
  props: {
    bridge: {},
    initialState: {}
  },
  setup(e) {
    const v = e, s = {
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
    }, { state: t, pending: o, writable: d, canChat: c, canRequest: b, localMessage: C, needsRefresh: f, request: $ } = wu(v), m = Mn(t);
    async function k(A, p = {}, h = !1) {
      if (!h && Rn(m, t.value, A, p)) {
        pe(A, p, A === "teacher" ? $e.companion : $e.context);
        return;
      }
      return $(A, p);
    }
    const y = H(t.value.profile ? "home" : "profile"), w = [], u = H(null), x = H(!1);
    Ze(() => u.value?.open ? (u.value.open = !1, !0) : !1, () => x.value);
    const T = H(null), D = H(null), E = H(!1), ee = H(null), W = H(null), R = H(null), S = {}, I = H(null), q = H(0), G = L(() => q.value >= 760 && !!t.value.teacher), O = H("work"), B = H(!0), _ = H(!1), P = H(62), N = L(() => Math.max(42, Math.ceil(320 / Math.max(q.value, 1) * 100))), K = L(() => Math.min(68, Math.floor((1 - 320 / Math.max(q.value, 1)) * 100))), V = L({
      get: () => G.value ? Math.min(K.value, Math.max(N.value, P.value)) : P.value,
      set: (A) => {
        P.value = A;
      }
    }), Y = H(!1);
    let U, we;
    const Oe = () => {
      Y.value = we?.matches ?? !1;
    };
    Me(() => {
      we = matchMedia("(prefers-reduced-motion: reduce)"), Oe(), we.addEventListener("change", Oe), !(!I.value || typeof ResizeObserver > "u") && (U = new ResizeObserver(([A]) => {
        q.value = A?.contentRect.width ?? 0;
      }), U.observe(I.value));
    }), Ee(() => {
      U?.disconnect(), we?.removeEventListener("change", Oe);
    });
    const le = L(() => G.value || O.value === "work"), De = L(() => !!t.value.teacher && (G.value || O.value === "chat"));
    J([
      le,
      De,
      Y
    ], async ([A, p, h], ie, ze) => {
      let _e = !0, Lt;
      if (ze(() => {
        _e = !1, clearTimeout(Lt);
      }), A && (B.value = !0), p && (_.value = !0), await de(), !_e) return;
      A && R.value && (R.value.scrollTop = S[y.value] ?? 0);
      const St = () => {
        B.value = A, _.value = p;
      };
      G.value || h ? St() : Lt = setTimeout(St, 320);
    }, { immediate: !0 });
    function je() {
      le.value && R.value && !E.value && (S[y.value] = R.value.scrollTop), Be();
    }
    async function Be(A) {
      const p = A?.target instanceof Element ? A.target : null;
      if (await de(), le.value && W.value) {
        m.chat.study = {
          unitId: W.value.unitId,
          exerciseId: W.value.kind === "exercise" ? W.value.id : void 0
        };
        return;
      }
      if (!le.value || y.value !== "home" || !R.value) return;
      const h = R.value.getBoundingClientRect(), ie = p?.closest("[data-learning-unit-id]") ?? [...R.value.querySelectorAll("[data-learning-unit-id]")].find((ze) => {
        const _e = ze.getBoundingClientRect();
        return _e.bottom > h.top + 48 && _e.top < h.bottom;
      });
      ie?.dataset.learningUnitId && (m.chat.study = {
        unitId: ie.dataset.learningUnitId,
        exerciseId: ie.dataset.exerciseId
      });
    }
    J([
      R,
      y,
      le
    ], () => {
      Be();
    }, { flush: "post" });
    const et = L(() => {
      const { turns: A, removedTurns: p } = t.value.conversation;
      let h = A.length - 1;
      for (; h >= 0 && he({ kind: A[h].purpose ?? "talk" }); ) h--;
      return h < 0 ? 0 : p + h + 1;
    }), tt = H(et.value);
    J([et, De], ([A, p]) => {
      (p || A < tt.value) && (tt.value = A);
    }, { immediate: !0 });
    const kt = L(() => et.value > tt.value), ce = L(() => {
      const A = t.value.workbenchConversation.turns;
      let p = A.length - 1;
      for (; p >= 0 && Qe({ kind: A[p].purpose ?? "talk" }); ) p--;
      let h = A.length - 1;
      for (; h >= 0 && (A[h].status !== "running" || Qe({ kind: A[h].purpose ?? "talk" })); ) h--;
      return h >= 0 && (p = h), p < 0 ? null : {
        turn: t.value.workbenchConversation.turns[p],
        key: `${t.value.chatIdentity}:${t.value.language}:${t.value.workbenchConversation.removedTurns + p}`
      };
    });
    async function yt() {
      t.value.teacher && (await Be(), je(), O.value = "chat", _.value = !0, await de(), O.value === "chat" && T.value?.focusHeading());
    }
    async function qe() {
      if (B.value = !0, O.value = "work", await de(), R.value && (R.value.scrollTop = S[y.value] ?? 0), W.value) return;
      const A = R.value?.querySelector("h1, h2");
      A && (A.tabIndex = -1, A.focus({ preventScroll: !0 }));
    }
    let ht = 0;
    J(() => !!t.value.record, async (A, p) => {
      y.value !== "books" || A === p || (A && (ht = R.value?.scrollTop ?? 0), await de(), y.value === "books" && R.value && (R.value.scrollTop = A ? 0 : ht));
    });
    const re = H(null), $t = H(null);
    ct($t, () => {
      re.value = null;
    });
    const We = H(t.value.profile?.voice?.voiceId ?? t.value.voices.defaultVoice), Ge = H(t.value.profile?.voice?.language ?? t.value.language), Fe = H(t.value.profile?.voice?.speed ?? 1), xe = H(0), da = L(() => t.value.completions.slice(xe.value * 20, (xe.value + 1) * 20));
    J([() => t.value.language, () => t.value.profile?.voice], ([A, p]) => {
      We.value = p?.voiceId ?? t.value.voices.defaultVoice, Ge.value = p?.language ?? A, Fe.value = p?.speed ?? 1;
    }), J([
      () => t.value.chatIdentity,
      () => t.value.language,
      () => t.value.teacher?.name
    ], () => {
      W.value = null, re.value = null, xe.value = 0;
    }), J(() => !!t.value.teacher, (A) => {
      A || (O.value = "work");
    }), J(() => t.value.currentUnitId, (A) => {
      re.value?.action === "replace-lesson" && re.value.input.unitId !== A && (re.value = null);
    }), J(() => t.value.unit, (A) => {
      const p = W.value;
      p && (A?.id !== p.unitId || !(p.kind === "exercise" ? A.exercises : A.materials).some((h) => h.id === p.id)) && Pe();
    });
    for (const A of ["conversation", "workbenchConversation"]) J(() => {
      const p = t.value[A].turns.at(-1)?.presentation;
      return p ? `${t.value[A].turns.length + t.value[A].removedTurns}:${p.unitId}:${p.kind}:${p.id}` : "";
    }, (p) => {
      const h = t.value[A].turns.at(-1)?.presentation;
      p && h && Le(h, !0);
    });
    const Ce = H(!1);
    J([le, y], ([A, p]) => {
      A && p === "home" && (Ce.value = !1);
    });
    async function Le(A, p = !1) {
      if (t.value.review?.id === A.unitId) {
        if (p) {
          (!le.value || y.value !== "home") && (Ce.value = !0);
          return;
        }
        const h = m.unit(A.unitId).review;
        A.kind === "exercise" && (h.index = t.value.review.exercises.findIndex((ie) => ie.id === A.id)), h.expanded = !0, await it();
        return;
      }
      if (t.value.unit?.id === A.unitId) {
        if (t.value.unit.kind === "reading-writing") {
          if (p) {
            (!le.value || y.value !== "home") && (Ce.value = !0);
            return;
          }
          m.unit(A.unitId).reading.view = "reading", await me("home");
          const h = A.kind === "exercise" ? `[data-exercise-id="${CSS.escape(A.id)}"]` : `[data-material-id="${CSS.escape(A.id)}"][data-paragraph-id]`;
          R.value?.querySelector(h)?.scrollIntoView({
            block: "start",
            behavior: matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth"
          });
          return;
        }
        W.value = A, p ? le.value || (Ce.value = !0) : await qe();
      }
    }
    function Pe() {
      W.value = null, k("stop");
    }
    async function at(A, p) {
      W.value && Pe(), E.value || je(), E.value = !0, await qe(), await de(), A ? await D.value?.ask(A, void 0, p) : D.value?.focusHeading();
    }
    async function nt() {
      E.value = !1, await de(), R.value && (R.value.scrollTop = S[y.value] ?? 0), ee.value?.focus({ preventScroll: !0 });
    }
    async function wt(A, p, h) {
      if (!t.value.teacher) {
        await at(A, h), p && await D.value?.ask(A, p, h);
        return;
      }
      Pe(), je(), O.value = "chat", _.value = !0, await de(), await T.value?.ask(A, p, h);
    }
    async function me(A, p = !1) {
      if (W.value && Pe(), E.value = !1, A !== y.value && !p) if (A === "home") w.length = 0;
      else {
        const h = w.indexOf(A);
        h >= 0 ? w.splice(h) : w.push(y.value);
      }
      if (R.value && (S[y.value] = R.value.scrollTop), u.value && (u.value.open = !1), y.value = A, await qe(), await de(), R.value) {
        R.value.scrollTop = S[A] ?? 0;
        const h = [...R.value.querySelectorAll("h1, h2")].find((ie) => ie.offsetParent !== null);
        h && (h.tabIndex = -1, h.focus({ preventScroll: !0 }));
      }
    }
    function xt() {
      m.setup.step = 0, me("profile");
    }
    async function it() {
      await me("home"), R.value && (R.value.scrollTop = 0);
      const A = R.value?.querySelector("#learning-review-title");
      A && (A.tabIndex = -1, A.focus({ preventScroll: !0 }));
    }
    async function He(A, p = {}, h = !1) {
      if (A === "prepare" && !t.value.profile) {
        m.setup.step = 2, await me("profile");
        return;
      }
      A === "start-review" && await it();
      const ie = t.value.unit;
      ie?.kind === "reading-writing" && p.unitId === ie.id && [
        "grade",
        "submit-revision",
        "skip-revision"
      ].includes(A) && (m.unit(ie.id).reading.view = A === "skip-revision" && ie.modelEssay ? "model" : "feedback", await me("home"), R.value && (R.value.scrollTop = 0)), await k(A, p, h);
    }
    J(() => m.settings.submitted, (A, p) => {
      !A && p && !m.settings.open && y.value === "profile" && m.setup.step === 2 && t.value.storage === "ready" && !t.value.busy && t.value.profile && Object.entries(p.value).every(([h, ie]) => t.value.profile.settings[h] === ie) && me("home");
    }), J(() => t.value.busy, (A) => {
      const p = t.value.unit;
      !A && p?.stage.stage === "revising" && m.unit(p.id).reading.view === "model" && (m.unit(p.id).reading.view = "feedback");
    });
    const Ct = Ze(() => u.value?.open ? (u.value.open = !1, !0) : E.value && le.value ? (nt(), !0) : !G.value && O.value === "chat" ? (qe(), !0) : y.value === "home" || !w.length && y.value === "profile" && !t.value.teacher ? !1 : (me(w.pop() ?? "home", !0), !0));
    function pe(A, p, h) {
      re.value = {
        action: A,
        input: p,
        text: h
      };
    }
    async function va(A) {
      await k("records", {
        id: A,
        offset: t.value.records.offset
      }), t.value.record?.id === A && await me("books");
    }
    const { bubble: It, dismiss: lt } = Iu({
      root: I,
      state: t,
      pending: o,
      preference: m.companion,
      reading: L(() => le.value && y.value === "home" && t.value.unit?.kind === "reading-writing" && [
        "writing",
        "grading",
        "complete"
      ].includes(t.value.unit.stage.stage)),
      blocked: L(() => E.value || !!W.value || !!re.value || x.value),
      request: k
    });
    async function ca() {
      const A = await k("export");
      if (!A?.document) return;
      const p = URL.createObjectURL(new Blob([JSON.stringify(A.document, null, 2)], { type: "application/json" })), h = document.createElement("a");
      h.href = p, h.download = "LittleWhiteBox_Learning.json", h.click(), setTimeout(() => URL.revokeObjectURL(p), 1e3);
    }
    return (A, p) => (a(), i("section", {
      ref_key: "root",
      ref: I,
      class: "learning-app",
      style: jt({
        "--learning-switch-ms": `${l(320)}ms`,
        "--learning-work-share": `${V.value}%`
      }),
      "aria-label": "语伴语言学习"
    }, [
      n("header", Lu, [
        y.value !== "home" && (l(t).teacher || w.length) && (G.value || O.value === "work") ? (a(), i("button", {
          key: 0,
          type: "button",
          class: "learning-toolbar-back",
          "aria-label": "返回上一页",
          onClick: p[0] || (p[0] = (...h) => l(Ct) && l(Ct)(...h))
        }, [F(Z, { name: "back" })])) : g("", !0),
        n("button", {
          type: "button",
          class: "learning-wordmark",
          onClick: p[1] || (p[1] = (h) => me("home"))
        }, [
          p[37] || (p[37] = n("span", {
            class: "learning-brand-mark",
            "aria-hidden": "true"
          }, [z("a"), n("span", null, "あ")], -1)),
          p[38] || (p[38] = z("语伴", -1)),
          Ce.value && (G.value || O.value === "work") ? (a(), i("span", Su)) : g("", !0)
        ]),
        G.value && l(t).teacher ? (a(), i("label", Au, [
          F(Z, { name: "workbook" }),
          se(n("input", {
            "onUpdate:modelValue": p[2] || (p[2] = (h) => V.value = h),
            type: "range",
            min: N.value,
            max: K.value,
            step: "1",
            "aria-label": "阅读区宽度比例"
          }, null, 8, Ru), [[
            ge,
            V.value,
            void 0,
            { number: !0 }
          ]]),
          F(Z, { name: "chat" })
        ])) : g("", !0),
        n("button", {
          ref_key: "assistantButton",
          ref: ee,
          type: "button",
          class: "learning-assistant-button",
          "aria-label": l(te).assistant,
          "aria-expanded": E.value,
          onClick: p[3] || (p[3] = (h) => E.value ? nt() : at())
        }, [F(Z, { name: "chat" }), n("span", null, r(l(te).assistant), 1)], 8, Mu),
        n("details", {
          ref_key: "menu",
          ref: u,
          class: "learning-menu",
          onToggle: p[4] || (p[4] = (h) => x.value = !!u.value?.open),
          onKeydown: p[5] || (p[5] = Ae(ve((h) => u.value.open = !1, ["stop", "prevent"]), ["esc"]))
        }, [n("summary", Eu, [F(Z, { name: "more" })]), n("nav", Nu, [(a(), i(M, null, j([
          ["books", "语法本与生词本"],
          ["materials", "课件与笔记"],
          ["harvest", "我的收获"],
          ["settings", "设置"]
        ], ([h, ie]) => n("button", {
          key: h,
          type: "button",
          onClick: (ze) => me(h)
        }, r(ie), 9, Tu)), 64))])], 544)
      ]),
      l(C) || !l(t).busy && (l(t).message || l(t).storage !== "ready") ? (a(), i("div", Ou, [z(r(l(C) || l(t).message || (l(t).storage === "unconfirmed" ? l(ot).unconfirmed : l(t).storage === "conflict" ? l(ot).conflict : l(ot).unloaded)) + " ", 1), n("div", Bu, [
        l(t).storage === "unconfirmed" || l(t).storage === "conflict" ? (a(), i("button", {
          key: 0,
          type: "button",
          disabled: l(o),
          onClick: p[6] || (p[6] = (h) => k("verify"))
        }, r(s.verify), 9, qu)) : g("", !0),
        l(t).storage === "unconfirmed" ? (a(), i("button", {
          key: 1,
          type: "button",
          disabled: l(o),
          onClick: p[7] || (p[7] = (h) => k("retry-save"))
        }, r(s.retry), 9, Pu)) : g("", !0),
        l(t).storage === "conflict" ? (a(), i("button", {
          key: 2,
          type: "button",
          disabled: l(o),
          onClick: p[8] || (p[8] = (h) => pe("adopt-server", {}, s.adoptWarning))
        }, r(s.adopt), 9, _u)) : g("", !0),
        l(t).storage === "unloaded" || l(f) ? (a(), i("button", {
          key: 3,
          type: "button",
          disabled: l(o),
          onClick: p[9] || (p[9] = (h) => k("read"))
        }, r(l(zt).refresh), 9, Vu)) : g("", !0)
      ])])) : g("", !0),
      [
        "unconfirmed",
        "conflict",
        "failed"
      ].includes(l(t).chatStorage) ? (a(), i("div", Uu, [z(r(l(t).chatStorage === "unconfirmed" ? l(Se).unconfirmed : l(t).chatStorage === "conflict" ? l(Se).conflict : l(Se).failed) + " ", 1), n("div", Du, [n("button", {
        type: "button",
        disabled: !l(b)("verify-teacher"),
        onClick: p[10] || (p[10] = (h) => k("verify-teacher"))
      }, r(l(Se).verify), 9, ju), l(t).chatStorage !== "failed" ? (a(), i("button", {
        key: 0,
        type: "button",
        disabled: !l(b)("adopt-teacher"),
        onClick: p[11] || (p[11] = (h) => pe("adopt-teacher", {}, l(Se).adoptWarning))
      }, r(l(Se).adopt), 9, Wu)) : g("", !0)])])) : g("", !0),
      [
        "unconfirmed",
        "conflict",
        "failed"
      ].includes(l(t).workbenchStorage) ? (a(), i("div", Gu, [
        z(r(l(te).assistantStorage) + " ", 1),
        n("button", {
          type: "button",
          disabled: l(o),
          onClick: p[12] || (p[12] = (h) => k("verify-workbench"))
        }, r(l(te).verify), 9, Fu),
        l(t).workbenchStorage === "conflict" ? (a(), i("button", {
          key: 0,
          type: "button",
          disabled: l(o),
          onClick: p[13] || (p[13] = (h) => pe("adopt-workbench", {}, l(te).adoptConfirm))
        }, r(l(te).adopt), 9, Hu)) : g("", !0)
      ])) : g("", !0),
      n("div", { class: ue(["learning-stage", {
        "is-wide": G.value,
        "is-chat": !G.value && O.value === "chat"
      }]) }, [
        n("div", {
          class: "learning-pane is-work",
          inert: !le.value,
          "aria-hidden": !le.value
        }, [n("div", {
          class: "learning-work-surface",
          inert: !!W.value,
          "aria-hidden": !!W.value
        }, [B.value && E.value ? (a(), Q(Dt, {
          key: 0,
          ref_key: "assistant",
          ref: D,
          target: "workbench",
          state: l(t),
          disabled: !l(b)("workbench-talk"),
          pending: l(o),
          onAction: k,
          onPresent: Le,
          onClose: nt
        }, null, 8, [
          "state",
          "disabled",
          "pending"
        ])) : g("", !0), se(n("div", {
          ref_key: "scroller",
          ref: R,
          class: "learning-scroll",
          onScrollPassive: je,
          onClick: Be,
          onFocusin: Be
        }, [B.value && !E.value ? (a(), i(M, { key: 0 }, [
          ce.value ? (a(), Q(ua, {
            key: ce.value.key,
            turn: ce.value.turn,
            stoppable: "",
            disabled: l(o),
            onStop: p[14] || (p[14] = (h) => k(l(he)({ kind: ce.value.turn.purpose ?? "talk" }) ? "cancel-preparation" : "cancel"))
          }, pa({ _: 2 }, [l(t).storage === "ready" && l(he)({ kind: ce.value.turn.purpose ?? "talk" }) && !l(t).preparation?.running && (l(t).preparation || l(t).sourceChoice) ? {
            name: "default",
            fn: Wt(() => [F(vt, {
              state: l(t),
              disabled: !l(d),
              pending: l(o),
              onAction: He
            }, null, 8, [
              "state",
              "disabled",
              "pending"
            ])]),
            key: "0"
          } : void 0]), 1032, ["turn", "disabled"])) : g("", !0),
          ce.value && !l(he)({ kind: ce.value.turn.purpose ?? "talk" }) && l(Ue)(ce.value.turn, l(t).workbenchStorage, l(t).storage) ? (a(), i("p", {
            key: 1,
            class: ue(["learning-turn-notice", { "is-error": ce.value.turn.status === "failed" }]),
            role: "status"
          }, r(l(Ue)(ce.value.turn, l(t).workbenchStorage, l(t).storage)), 3)) : g("", !0),
          l(t).busy && ce.value?.turn.status !== "running" ? (a(), i("div", Ku, [
            p[39] || (p[39] = n("span", {
              class: "learning-working-dot",
              "aria-hidden": "true"
            }, null, -1)),
            n("span", null, r(l(t).message || s.working), 1),
            n("button", {
              type: "button",
              disabled: l(o),
              onClick: p[15] || (p[15] = (h) => k("cancel"))
            }, "停止", 8, Ju)
          ])) : g("", !0),
          y.value === "home" ? (a(), Q(So, {
            key: 3,
            state: l(t),
            disabled: !l(d),
            pending: l(o),
            "preparation-in-process": !!ce.value && l(he)({ kind: ce.value.turn.purpose ?? "talk" }),
            onAction: He,
            onConfirm: pe,
            onPresent: Le,
            onGo: me,
            onAsk: wt,
            onAssistant: at,
            onRecord: va
          }, null, 8, [
            "state",
            "disabled",
            "pending",
            "preparation-in-process"
          ])) : g("", !0),
          y.value === "profile" ? (a(), Q(Il, {
            key: 4,
            state: l(t),
            disabled: !l(b)("language"),
            onAction: k
          }, null, 8, ["state", "disabled"])) : g("", !0),
          y.value === "materials" ? (a(), i("section", Zu, [
            p[40] || (p[40] = n("h1", null, "课件与笔记", -1)),
            l(t).unit ? g("", !0) : (a(), i("p", Qu, r(l(t).blockedUnit ? "当前课件在另一个故事中" : "还没有课件"), 1)),
            l(t).unit ? (a(), i(M, { key: 1 }, [
              n("p", Xu, r(l(t).unit.title), 1),
              (a(!0), i(M, null, j(l(t).unit.materials, (h) => (a(), i("button", {
                key: h.id,
                type: "button",
                class: "learning-activity-link",
                onClick: (ie) => Le({
                  unitId: l(t).unit.id,
                  kind: "material",
                  id: h.id,
                  title: h.title
                })
              }, [
                F(Z, { name: "book" }),
                n("span", null, r(h.title), 1),
                F(Z, { name: "arrow" })
              ], 8, ed))), 128)),
              (a(!0), i(M, null, j(l(t).unit.exercises, (h) => (a(), i("button", {
                key: h.id,
                type: "button",
                class: "learning-activity-link",
                onClick: (ie) => Le({
                  unitId: l(t).unit.id,
                  kind: "exercise",
                  id: h.id,
                  title: h.prompt
                })
              }, [
                F(Z, { name: "records" }),
                n("span", null, r(h.prompt), 1),
                F(Z, { name: "arrow" })
              ], 8, td))), 128)),
              l(t).unit.notes.length ? (a(), i("section", ad, [(a(!0), i(M, null, j(l(t).unit.notes, (h) => (a(), i("article", { key: h.id }, [
                h.selection ? (a(), i("blockquote", nd, r(h.selection.quote), 1)) : g("", !0),
                n("p", null, r(h.text), 1),
                n("button", {
                  type: "button",
                  disabled: !l(d),
                  onClick: (ie) => k("delete-note", { id: h.id })
                }, "删除笔记", 8, id)
              ]))), 128))])) : g("", !0)
            ], 64)) : g("", !0)
          ])) : g("", !0),
          y.value === "books" ? (a(), Q(Yi, {
            key: 6,
            state: l(t),
            disabled: !l(b)("start-review"),
            onAction: He,
            onReview: it,
            onRemove: pe
          }, null, 8, ["state", "disabled"])) : g("", !0),
          y.value === "harvest" ? (a(), i("section", ld, [
            p[42] || (p[42] = n("div", { class: "learning-page-heading" }, [n("h1", null, "我的收获")], -1)),
            l(t).completions.length ? g("", !0) : (a(), i("p", sd, "还没有完成的课程")),
            (a(!0), i(M, null, j(da.value, (h) => (a(), i("article", {
              key: h.unitId,
              class: "learning-harvest-entry"
            }, [
              n("small", null, r(new Date(h.completedAt).toLocaleDateString()), 1),
              h.rewardStatus !== "retired" ? (a(), i("h2", rd, [z(r(h.rewardStatus === "paid" ? "+" : "") + r(h.amount), 1), p[41] || (p[41] = n("span", null, "小白币", -1))])) : g("", !0),
              n("p", null, r(h.summary), 1),
              n("p", od, r(h.rewardStatus === "paid" ? l(be).paid : h.rewardStatus === "retired" ? l(be).retired : l(be).pending), 1),
              h.rewardStatus !== "paid" && h.rewardStatus !== "retired" ? (a(), i("button", {
                key: 1,
                type: "button",
                disabled: !l(d) || l(t).walletStorage !== "ready",
                onClick: (ie) => k("reward", {
                  unitId: h.unitId,
                  openWallet: !l(t).walletOpen
                })
              }, r(l(t).walletOpen ? l(be).claim : l(be).openWallet), 9, ud)) : g("", !0)
            ]))), 128)),
            l(t).walletStorage === "unconfirmed" || l(t).walletStorage === "conflict" || l(t).walletStorage === "failed" ? (a(), i("button", {
              key: 1,
              type: "button",
              disabled: l(o) || l(t).busy,
              onClick: p[16] || (p[16] = (h) => k("verify-wallet"))
            }, r(s.verifyWallet), 9, dd)) : g("", !0),
            l(t).walletStorage === "conflict" ? (a(), i("button", {
              key: 2,
              type: "button",
              disabled: l(o) || l(t).busy,
              onClick: p[17] || (p[17] = (h) => pe("adopt-wallet", {}, s.adoptWalletWarning))
            }, r(s.adoptWallet), 9, vd)) : g("", !0),
            l(t).completions.length > 20 ? (a(), i("div", cd, [n("button", {
              type: "button",
              disabled: xe.value === 0,
              onClick: p[18] || (p[18] = (h) => xe.value--)
            }, "上一页", 8, gd), n("button", {
              type: "button",
              disabled: (xe.value + 1) * 20 >= l(t).completions.length,
              onClick: p[19] || (p[19] = (h) => xe.value++)
            }, "下一页", 8, pd)])) : g("", !0)
          ])) : g("", !0),
          y.value === "settings" ? (a(), i("section", bd, [
            p[52] || (p[52] = n("h1", null, "学习设置", -1)),
            n("label", null, [p[43] || (p[43] = z("当前语言", -1)), n("select", {
              value: l(t).language,
              disabled: !l(b)("language"),
              onChange: p[20] || (p[20] = (h) => {
                k("language", { language: h.target.value }), h.target.value = l(t).language;
              })
            }, [(a(!0), i(M, null, j([.../* @__PURE__ */ new Set([l(t).language, ...l(t).languages])], (h) => (a(), i("option", {
              key: h,
              value: h
            }, r(new Intl.DisplayNames(["zh-CN"], { type: "language" }).of(h)), 9, fd))), 128))], 40, md)]),
            n("button", {
              type: "button",
              onClick: xt
            }, "更换语言和语伴 →"),
            F(la),
            n("section", null, [
              p[44] || (p[44] = n("h2", null, "训练设置", -1)),
              l(t).profile?.goal.description ? (a(), i("p", kd, r(l(t).profile.goal.description), 1)) : g("", !0),
              F(ia, {
                state: l(t),
                disabled: !l(b)("settings"),
                onAction: k
              }, null, 8, ["state", "disabled"])
            ]),
            n("section", null, [
              p[49] || (p[49] = n("h2", null, "语伴的声音", -1)),
              l(t).voices.enabled ? (a(), i("form", {
                key: 1,
                onSubmit: p[24] || (p[24] = ve((h) => k("voice", { voice: {
                  voiceId: We.value,
                  language: Ge.value,
                  speed: Number(Fe.value)
                } }), ["prevent"]))
              }, [
                n("label", null, [p[45] || (p[45] = z("音色", -1)), se(n("select", { "onUpdate:modelValue": p[21] || (p[21] = (h) => We.value = h) }, [(a(!0), i(M, null, j(l(t).voices.voices, (h) => (a(), i("option", {
                  key: h.id,
                  value: h.id,
                  disabled: !h.available
                }, r(h.name) + r(h.available ? "" : "（暂不可用）"), 9, hd))), 128))], 512), [[Je, We.value]])]),
                n("label", null, [p[46] || (p[46] = z("发音语言", -1)), se(n("input", {
                  "onUpdate:modelValue": p[22] || (p[22] = (h) => Ge.value = h),
                  type: "text",
                  maxlength: "80",
                  placeholder: "en / ja"
                }, null, 512), [[ge, Ge.value]])]),
                n("label", null, [p[48] || (p[48] = z("语速", -1)), se(n("select", { "onUpdate:modelValue": p[23] || (p[23] = (h) => Fe.value = h) }, [...p[47] || (p[47] = [
                  n("option", { value: 0.75 }, "0.75×", -1),
                  n("option", { value: 1 }, "1×", -1),
                  n("option", { value: 1.25 }, "1.25×", -1)
                ])], 512), [[Je, Fe.value]])]),
                n("button", {
                  type: "submit",
                  disabled: !l(b)("voice") || !l(t).profile
                }, "保存声音设置", 8, $d)
              ], 32)) : (a(), i("p", yd, r(s.voiceDisabled), 1)),
              n("button", {
                type: "button",
                onClick: p[25] || (p[25] = (h) => k("tts-settings"))
              }, r(l(t).voices.enabled ? l(ut).settings : l(ut).enable), 1),
              p[50] || (p[50] = n("small", null, "已听过的题保留原声音，新偏好用于之后的题目。", -1))
            ]),
            n("section", null, [
              p[51] || (p[51] = n("h2", null, "学习数据", -1)),
              n("button", {
                type: "button",
                disabled: !l(b)("forget-conversation"),
                onClick: p[26] || (p[26] = (h) => pe("forget-conversation", { target: "companion" }, l(te).clearCompanionConfirm))
              }, r(l(te).clearCompanion), 9, wd),
              n("button", {
                type: "button",
                disabled: !l(b)("forget-conversation"),
                onClick: p[27] || (p[27] = (h) => pe("forget-conversation", { target: "workbench" }, l(te).clearAssistantConfirm))
              }, r(l(te).clearAssistant), 9, xd),
              n("button", {
                type: "button",
                disabled: !l(b)("export"),
                onClick: ca
              }, "导出学习数据", 8, Cd),
              n("button", {
                type: "button",
                disabled: !l(b)("read"),
                onClick: p[28] || (p[28] = (h) => k("read"))
              }, "重新加载", 8, Id),
              l(t).unit || l(t).blockedUnit ? (a(), i("button", {
                key: 0,
                type: "button",
                disabled: !l(b)("abandon"),
                onClick: p[29] || (p[29] = (h) => pe("abandon", {}, l($e).lesson))
              }, "放下当前练习", 8, Ld)) : g("", !0),
              n("button", {
                type: "button",
                class: "learning-danger",
                disabled: !l(b)("delete-language") || !l(t).profile,
                onClick: p[30] || (p[30] = (h) => pe("delete-language", {}, "删除当前语言的全部学习数据？未领取奖励也将放弃，已到账流水保留。"))
              }, "删除当前语言", 8, Sd),
              n("button", {
                type: "button",
                class: "learning-danger",
                disabled: !l(b)("clear"),
                onClick: p[31] || (p[31] = (h) => pe("clear", {}, "清空所有语言的目标、课程和记录？未领取奖励也将放弃。已到账流水不撤销。"))
              }, "清空全部学习数据", 8, Ad)
            ])
          ])) : g("", !0)
        ], 64)) : g("", !0)], 544), [[ha, !E.value]])], 8, Yu), B.value && l(t).unit && W.value ? (a(), Q(Jn, {
          key: `${l(t).chatIdentity}:${l(t).language}:${l(t).unit.id}:${W.value.kind}:${W.value.id}`,
          state: l(t),
          target: W.value,
          active: le.value,
          disabled: !l(d),
          onAction: k,
          onClose: Pe,
          onAsk: wt
        }, null, 8, [
          "state",
          "target",
          "active",
          "disabled"
        ])) : g("", !0)], 8, zu),
        l(t).teacher ? (a(), i("div", {
          key: 0,
          class: "learning-pane is-chat",
          inert: !De.value,
          "aria-hidden": !De.value
        }, [_.value ? (a(), Q(Dt, {
          key: 0,
          ref_key: "conversation",
          ref: T,
          target: "companion",
          state: l(t),
          disabled: !l(c),
          pending: l(o),
          onAction: k,
          onPresent: Le,
          onProfile: xt
        }, null, 8, [
          "state",
          "disabled",
          "pending"
        ])) : g("", !0)], 8, Rd)) : g("", !0),
        !G.value && O.value === "work" && l(t).teacher ? (a(), i("button", {
          key: 1,
          type: "button",
          class: "learning-float is-companion",
          "aria-label": kt.value ? `和${l(t).teacher.name}聊天，有新消息` : `和${l(t).teacher.name}聊天`,
          onClick: yt
        }, [n("span", Ed, r([...l(t).teacher.name][0]), 1), kt.value ? (a(), i("span", Nd)) : g("", !0)], 8, Md)) : g("", !0),
        !G.value && O.value === "chat" ? (a(), i("button", {
          key: 2,
          type: "button",
          class: "learning-float is-workbook",
          "aria-label": Ce.value ? "回到练习本，有新指引" : "回到练习本",
          onClick: qe
        }, [F(Z, { name: "workbook" }), Ce.value ? (a(), i("span", Od)) : g("", !0)], 8, Td)) : g("", !0),
        l(It) ? (a(), i("aside", {
          key: 3,
          class: ue(["learning-companion-bubble", { "is-wide": G.value }]),
          "aria-live": "polite"
        }, [n("button", {
          type: "button",
          onClick: p[32] || (p[32] = (h) => {
            yt(), l(lt)();
          })
        }, r(l(It)), 1), n("button", {
          type: "button",
          "aria-label": "收起这句话",
          onClick: p[33] || (p[33] = (...h) => l(lt) && l(lt)(...h))
        }, [F(Z, { name: "close" })])], 2)) : g("", !0)
      ], 2),
      !W.value || !le.value ? (a(), Q(Zt, {
        key: 3,
        state: l(t),
        onAction: k
      }, null, 8, ["state"])) : g("", !0),
      l(t).approval ? (a(), Q(ii, {
        key: 4,
        approval: l(t).approval,
        pending: l(o),
        onAction: k
      }, null, 8, ["approval", "pending"])) : re.value ? (a(), i("div", {
        key: 5,
        ref_key: "confirmLayer",
        ref: $t,
        class: "learning-confirm-shade",
        onKeydown: p[36] || (p[36] = Ae(ve((h) => re.value = null, ["stop", "prevent"]), ["esc"]))
      }, [n("section", Bd, [
        n("h2", qd, r(l(Nt)[re.value.action].title), 1),
        n("p", null, r(re.value.text), 1),
        n("div", Pd, [n("button", {
          autofocus: "",
          type: "button",
          onClick: p[34] || (p[34] = (h) => re.value = null)
        }, r(["language", "teacher"].includes(re.value.action) ? l($e).keepEditing : s.cancel), 1), n("button", {
          type: "button",
          class: "learning-primary",
          disabled: !l(b)(re.value.action),
          onClick: p[35] || (p[35] = (h) => {
            He(re.value.action, re.value.input, !0), re.value = null;
          })
        }, r(l(Nt)[re.value.action].accept), 9, _d)])
      ])], 544)) : g("", !0)
    ], 4));
  }
}), Wd = Vd;
export {
  Wd as default
};
