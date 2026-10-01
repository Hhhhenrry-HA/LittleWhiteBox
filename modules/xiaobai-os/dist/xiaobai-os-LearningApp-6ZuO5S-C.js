/* eslint-disable */
import { $ as fe, C as ra, E as re, F as a, G as oa, H as ua, I as da, K as ne, L as F, M as Ae, O as Re, Q as va, U as Z, X as z, Y as we, Z as ca, _ as i, a as Ge, b as H, c as Oe, et as l, g, h as J, i as ga, l as de, m as n, nt as qt, o as ue, p as C, rt as r, s as pa, tt as se, u as M, w as wt, x as te, y as Y, z as ma } from "./xiaobai-os-runtime-dom.esm-bundler-BeaorYpU.js";
import { i as Pt, r as Fe } from "./xiaobai-os-app-navigation-C25euSGK.js";
import { n as ba, t as fa } from "./xiaobai-os-frame-bridge-BfVuKvnh.js";
import { t as ut } from "./xiaobai-os-MessageMarkdown-C9TgJeVY.js";
var lt = /* @__PURE__ */ new WeakMap(), xt = [
  "select",
  "input",
  "keyup",
  "pointerup",
  "scroll"
], Ke = {
  mounted(e, p) {
    const s = p.value, t = s.cursor, o = () => {
      s.cursor = {
        start: e.selectionStart,
        end: e.selectionEnd,
        direction: e.selectionDirection,
        top: e.scrollTop,
        left: e.scrollLeft
      };
    };
    lt.set(e, o);
    for (const d of xt) e.addEventListener(d, o, { passive: !0 });
    re(() => {
      !e.isConnected || !t || (e.setSelectionRange(t.start, t.end, t.direction), e.scrollTop = t.top, e.scrollLeft = t.left);
    });
  },
  beforeUnmount(e) {
    const p = lt.get(e);
    if (p) {
      p();
      for (const s of xt) e.removeEventListener(s, p);
      lt.delete(e);
    }
  }
}, ka = ["disabled"], ya = {
  key: 0,
  class: "learning-choices"
}, ha = [
  "type",
  "checked",
  "onChange"
], $a = { class: "learning-option-letter" }, wa = {
  key: 1,
  class: "learning-order"
}, xa = [
  "disabled",
  "aria-label",
  "onClick"
], Ca = [
  "disabled",
  "aria-label",
  "onClick"
], Ia = {
  key: 2,
  class: "learning-fields"
}, La = ["onUpdate:modelValue"], Sa = ["value"], Aa = {
  key: 3,
  class: "learning-choices"
}, Ra = ["checked", "onChange"], Ma = {
  key: 0,
  class: "learning-muted"
}, Ea = {
  key: 4,
  class: "learning-fields"
}, Ta = ["onUpdate:modelValue"], Na = {
  key: 5,
  class: "learning-writing"
}, Ba = ["disabled"], Oa = /* @__PURE__ */ te({
  __name: "AnswerInput",
  props: /* @__PURE__ */ wt({
    response: {},
    paragraphs: {},
    disabled: { type: Boolean }
  }, {
    modelValue: { required: !0 },
    modelModifiers: {}
  }),
  emits: /* @__PURE__ */ wt(["submit"], ["update:modelValue"]),
  setup(e, { emit: p }) {
    const s = e, t = p, o = ua(e, "modelValue");
    function d(f) {
      s.response.kind === "choice" && !s.response.multiple ? o.value.picked = [f] : o.value.picked = o.value.picked.includes(f) ? o.value.picked.filter(($) => $ !== f) : [...o.value.picked, f];
    }
    function v(f, $) {
      const y = [...o.value.order];
      [y[f], y[f + $]] = [y[f + $], y[f]], o.value.order = y;
    }
    const b = C(() => {
      const f = s.response;
      return f.kind === "text" ? !!o.value.text.trim() : f.kind === "gaps" ? f.slots.every(($) => o.value.values[$.id]?.trim()) : f.kind === "match" ? f.left.every(($) => o.value.values[$.id]) : f.kind === "order" ? !0 : o.value.picked.length > 0;
    });
    function I() {
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
      onSubmit: de(I, ["prevent"])
    }, [n("fieldset", { disabled: e.disabled }, [
      $[3] || ($[3] = n("legend", { class: "learning-sr-only" }, "你的回答", -1)),
      e.response.kind === "choice" ? (a(), i("div", ya, [(a(!0), i(M, null, F(e.response.options, (y, w) => (a(), i("label", {
        key: y.id,
        class: se({ selected: o.value.picked.includes(y.id) })
      }, [
        n("input", {
          type: e.response.multiple ? "checkbox" : "radio",
          name: "answer-choice",
          checked: o.value.picked.includes(y.id),
          onChange: (k) => d(y.id)
        }, null, 40, ha),
        n("span", $a, r(String.fromCharCode(65 + w)), 1),
        n("span", null, r(y.text), 1)
      ], 2))), 128))])) : e.response.kind === "order" ? (a(), i("ol", wa, [(a(!0), i(M, null, F(o.value.order, (y, w) => (a(), i("li", { key: y }, [
        n("span", null, r(e.response.options.find((k) => k.id === y)?.text), 1),
        n("button", {
          type: "button",
          disabled: w === 0,
          "aria-label": `上移第 ${w + 1} 项`,
          onClick: (k) => v(w, -1)
        }, "↑", 8, xa),
        n("button", {
          type: "button",
          disabled: w === o.value.order.length - 1,
          "aria-label": `下移第 ${w + 1} 项`,
          onClick: (k) => v(w, 1)
        }, "↓", 8, Ca)
      ]))), 128))])) : e.response.kind === "match" ? (a(), i("div", Ia, [(a(!0), i(M, null, F(e.response.left, (y) => (a(), i("label", { key: y.id }, [Y(r(y.text) + " ", 1), ne(n("select", { "onUpdate:modelValue": (w) => o.value.values[y.id] = w }, [$[1] || ($[1] = n("option", { value: "" }, "选择对应项", -1)), (a(!0), i(M, null, F(e.response.right, (w) => (a(), i("option", {
        key: w.id,
        value: w.id
      }, r(w.text), 9, Sa))), 128))], 8, La), [[Ge, o.value.values[y.id]]])]))), 128))])) : e.response.kind === "evidence" ? (a(), i("div", Aa, [(a(!0), i(M, null, F(e.paragraphs, (y) => (a(), i("label", {
        key: y.id,
        class: se({ selected: o.value.picked.includes(y.id) })
      }, [n("input", {
        type: "checkbox",
        checked: o.value.picked.includes(y.id),
        onChange: (w) => d(y.id)
      }, null, 40, Ra), n("span", null, r(y.text), 1)], 2))), 128)), e.paragraphs.length ? g("", !0) : (a(), i("p", Ma, "请先展开相关文稿，再选择原文依据。"))])) : e.response.kind === "gaps" ? (a(), i("div", Ea, [(a(!0), i(M, null, F(e.response.slots, (y) => (a(), i("label", { key: y.id }, [Y(r(y.text), 1), ne(n("input", {
        "onUpdate:modelValue": (w) => o.value.values[y.id] = w,
        type: "text",
        maxlength: "4000",
        autocomplete: "off"
      }, null, 8, Ta), [[ue, o.value.values[y.id]]])]))), 128))])) : (a(), i("label", Na, [$[2] || ($[2] = n("span", { class: "learning-sr-only" }, "你的回答", -1)), ne(n("textarea", {
        "onUpdate:modelValue": $[0] || ($[0] = (y) => o.value.text = y),
        rows: "6",
        maxlength: "4000",
        placeholder: "写下你的回答…"
      }, null, 512), [[ue, o.value.text], [l(Ke), o.value]])])),
      n("button", {
        class: "learning-primary",
        type: "submit",
        disabled: !b.value
      }, "交给语伴 →", 8, Ba)
    ], 8, ka)], 32));
  }
}), Ut = Oa, Vt = 2e3, qa = ["stroke-width"], Pa = ["d"], Ua = /* @__PURE__ */ te({
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
    return (s, t) => (a(), i("svg", {
      class: "learning-icon",
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      "stroke-width": e.name === "more" ? 3.5 : 1.7,
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      "aria-hidden": "true"
    }, [n("path", { d: p[e.name] }, null, 8, Pa)], 8, qa));
  }
}), K = Ua, Be = Object.freeze({
  select: "引用这段",
  ask: "问语伴",
  listen: "朗读",
  dismiss: "取消引用"
});
function Va(e, p, s) {
  if (!s?.rangeCount || s.isCollapsed) return null;
  const t = s.getRangeAt(0), o = t.startContainer, d = (o instanceof Element ? o : o.parentElement)?.closest("[data-learning-text]");
  if (!d || !e.contains(d) || !d.contains(t.endContainer)) return null;
  const v = p.find((y) => y.id === d.dataset.materialId), b = v?.paragraphs.find((y) => y.id === d.dataset.paragraphId);
  if (!v || !b) return null;
  const I = t.cloneRange();
  I.selectNodeContents(d), I.setEnd(t.startContainer, t.startOffset);
  const f = I.toString().length, $ = t.toString();
  return !$.trim() || [...$].length > 2e3 || b.text.slice(f, f + $.length) !== $ ? null : {
    materialId: v.id,
    paragraphId: b.id,
    start: f,
    end: f + $.length,
    quote: $
  };
}
function Dt(e, p, s) {
  const t = () => {
    if (!e.value) return;
    const o = Va(e.value, p(), window.getSelection());
    o && s(o);
  };
  Ae(() => document.addEventListener("selectionchange", t)), Re(() => document.removeEventListener("selectionchange", t));
}
var Da = { class: "learning-source" }, ja = { key: 0 }, Wa = ["href"], _a = {
  key: 0,
  class: "learning-listening-cover"
}, Ga = ["disabled"], Fa = {
  key: 1,
  class: "learning-material-body"
}, Ha = ["data-material-id", "data-paragraph-id"], za = ["disabled", "onClick"], Ya = {
  class: "learning-audio-parts",
  "aria-label": "材料朗读分段"
}, Ka = ["disabled", "onClick"], Za = { key: 2 }, Ja = /* @__PURE__ */ te({
  __name: "MaterialReader",
  props: {
    material: {},
    disabled: { type: Boolean },
    exerciseId: {}
  },
  emits: ["action", "select"],
  setup(e, { emit: p }) {
    const s = e, t = p, o = z(null);
    Dt(o, () => [s.material], (v) => t("select", v));
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
      ref: o,
      class: "learning-material"
    }, [
      n("h2", null, r(e.material.title), 1),
      n("div", Da, [e.material.provenance.kind === "authored" ? (a(), i("span", ja, "语伴自编练习")) : (a(), i("a", {
        key: 1,
        href: e.material.provenance.url,
        target: "_blank",
        rel: "noopener noreferrer"
      }, r(e.material.provenance.kind === "original" ? "原文节选" : "改编自") + " · " + r(e.material.provenance.title) + " ↗", 9, Wa))]),
      e.material.hidden ? (a(), i("div", _a, [b[1] || (b[1] = n("svg", {
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
      }, "看文稿", 8, Ga)])) : (a(), i("div", Fa, [(a(!0), i(M, null, F(e.material.paragraphs, (I) => (a(), i("div", {
        key: I.id,
        class: "learning-paragraph"
      }, [n("p", {
        tabindex: "0",
        "data-learning-text": "",
        "data-material-id": e.material.id,
        "data-paragraph-id": I.id
      }, r(I.text), 9, Ha), n("button", {
        type: "button",
        disabled: [...I.text].length > l(Vt),
        onClick: (f) => d(I)
      }, r(l(Be).select), 9, za)]))), 128))])),
      n("div", Ya, [(a(!0), i(M, null, F(e.material.parts, (I) => (a(), i("button", {
        key: I.key,
        type: "button",
        disabled: e.disabled,
        onClick: (f) => t("action", "play", {
          materialId: e.material.id,
          partKey: I.key,
          exerciseId: e.exerciseId
        })
      }, [H(K, { name: "play" }), Y(r(e.material.parts.length > 1 ? `听第 ${I.number} 段` : "播放朗读"), 1)], 8, Ka))), 128))]),
      e.material.parts.length ? (a(), i("small", Za, "TTS 合成朗读")) : g("", !0)
    ], 512));
  }
}), Ct = Ja;
function dt(e, p, s = []) {
  const t = (o) => p.kind === "choice" || p.kind === "order" ? p.options.find((d) => d.id === o)?.text ?? o : s.find((d) => d.id === o)?.text ?? o;
  return e.kind === "text" ? e.text : e.kind === "gaps" ? e.values.map((o) => `${p.kind === "gaps" ? p.slots.find((d) => d.id === o.id)?.text ?? "" : ""} ${o.text}`).join(`
`) : e.kind === "match" ? e.pairs.map((o) => p.kind === "match" ? `${p.left.find((d) => d.id === o.left)?.text} → ${p.right.find((d) => d.id === o.right)?.text}` : "").join(`
`) : e.ids.map(t).join(e.kind === "order" ? " → " : `
`);
}
var Qa = { class: "learning-feedback" }, Xa = { class: "learning-muted" }, en = { key: 0 }, tn = { key: 1 }, an = { key: 0 }, nn = { key: 1 }, ln = { key: 2 }, sn = {
  key: 3,
  class: "learning-muted"
}, rn = ["disabled"], on = ["disabled"], un = /* @__PURE__ */ te({
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
    return (s, t) => (a(), i("section", Qa, [
      t[6] || (t[6] = n("p", { class: "learning-eyebrow" }, "已保存的原答", -1)),
      n("blockquote", null, r(l(dt)(e.attempt.answer, e.response, e.paragraphs)), 1),
      n("small", Xa, [
        Y(r(e.attempt.help.feedback ? "得到反馈后的再练" : e.attempt.help.answer || e.attempt.help.hint || e.attempt.help.transcript ? "这次有辅助" : "未使用答案或提示"), 1),
        e.attempt.help.replays ? (a(), i("span", en, " · 重听 " + r(e.attempt.help.replays) + " 次", 1)) : g("", !0),
        e.attempt.help.slowPlayback ? (a(), i("span", tn, " · 慢放")) : g("", !0)
      ]),
      e.feedback ? (a(), i(M, { key: 0 }, [
        n("h3", null, r(p[e.feedback.verdict]), 1),
        e.feedback.understanding ? (a(), i("p", an, [t[2] || (t[2] = n("b", null, "理解", -1)), Y(r(e.feedback.understanding), 1)])) : g("", !0),
        e.feedback.expression ? (a(), i("p", nn, [t[3] || (t[3] = n("b", null, "表达", -1)), Y(r(e.feedback.expression), 1)])) : g("", !0),
        e.feedback.guidance ? (a(), i("p", ln, [t[4] || (t[4] = n("b", null, "批注", -1)), Y(r(e.feedback.guidance), 1)])) : g("", !0),
        e.revised ? (a(), i("small", sn, "这篇已有修改稿，结果以修改稿的批改为准。")) : (a(), i("button", {
          key: 4,
          type: "button",
          disabled: e.disabled,
          onClick: t[0] || (t[0] = (o) => s.$emit("action", "assess", {
            attemptId: e.attempt.id,
            review: !0,
            message: "请重新审视我的原答与题目。也请考虑其他有效表达，不只对照原来的答案键。"
          }))
        }, r(e.feedback.verdict === "disputed" ? "请语伴复核" : "有疑问，请复核"), 9, rn))
      ], 64)) : (a(), i(M, { key: 1 }, [t[5] || (t[5] = n("p", null, "原答已保存，等待语伴评估。", -1)), n("button", {
        type: "button",
        disabled: e.disabled,
        onClick: t[1] || (t[1] = (o) => s.$emit("action", "assess", {
          attemptId: e.attempt.id,
          review: !1,
          message: "请评估这条已经保存的原答。"
        }))
      }, "重试评估", 8, on)], 64))
    ]));
  }
}), jt = un, Wt = {
  busy: "上一件事还没做完，等它完成后再试一次吧。这次没有开始。",
  notSent: "这次没有发出去，输入的内容还在。请再试一次。",
  rejected: "这次操作未能完成，请查看最新状态后再继续。",
  unknown: "还没收到确认，操作可能仍在继续。请先查看最新状态，不要重复发送。",
  refresh: "查看最新状态"
}, Ie = {
  unconfirmed: "搭子的对话与设置尚未确认保存，已收到的回复保留。",
  conflict: "搭子的对话与设置有另一份已保存的版本，请先核对。",
  failed: "暂时没能打开搭子的对话与设置，请检查保存。",
  verify: "检查搭子记录",
  adopt: "使用已保存记录",
  adoptWarning: "放弃尚未确认的对话或设置，使用已保存的搭子记录？文章与作文会保留。"
}, Q = {
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
}, dn = {
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
}, _t = {
  unassessed: "还没练过",
  review: "待确认",
  independent: "已能独立使用",
  practised: "练过一次",
  strengthen: "再练练"
}, Gt = (e) => `${e} 次作答`, Ft = (e) => `${e} 个知识点可以温习了`, rt = {
  settings: "声音设置",
  enable: "开启语音"
}, X = {
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
}, It = {
  title: "还有内容没提交",
  accept: "放弃并切换"
}, Lt = {
  language: It,
  teacher: It,
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
}, ye = {
  context: "切换后，尚未提交的输入会丢失。已提交的作答和学习记录会保留。",
  companion: "切换语伴会清空尚未发送的聊天内容，当前练习和作答会保留。",
  keepEditing: "继续编辑",
  lesson: "本次练习的材料、作答和笔记会删除；已收入学习本的记录和已获得的奖励会保留。",
  review: "这组已答的题会删除，复习时间安排不变。"
}, Le = {
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
}, vn = {
  key: 0,
  class: "learning-player",
  "aria-label": "课堂朗读"
}, cn = {
  key: 0,
  role: "status"
}, gn = {
  key: 2,
  class: "learning-row"
}, pn = ["aria-label", "disabled"], mn = ["max", "value"], bn = /* @__PURE__ */ te({
  __name: "LearningPlayer",
  props: { state: {} },
  emits: ["action"],
  setup(e, { emit: p }) {
    const s = p;
    function t(o) {
      return `${Math.floor(o / 60)}:${String(Math.floor(o % 60)).padStart(2, "0")}`;
    }
    return (o, d) => e.state.media.status !== "idle" ? (a(), i("section", vn, [
      e.state.media.message ? (a(), i("p", cn, r(e.state.media.message), 1)) : g("", !0),
      e.state.voices.enabled ? g("", !0) : (a(), i("button", {
        key: 1,
        type: "button",
        onClick: d[0] || (d[0] = (v) => s("action", "tts-settings"))
      }, r(l(rt).enable), 1)),
      e.state.media.key ? (a(), i("div", gn, [
        H(K, { name: "sound" }),
        n("span", null, r(e.state.media.status === "loading" ? "正在生成声音…" : `${t(e.state.media.position)} / ${t(e.state.media.duration)}`), 1),
        e.state.media.status === "playing" ? (a(), i("button", {
          key: 0,
          type: "button",
          "aria-label": "暂停",
          onClick: d[1] || (d[1] = (v) => s("action", "pause"))
        }, [H(K, { name: "pause" })])) : [
          "paused",
          "ended",
          "blocked"
        ].includes(e.state.media.status) ? (a(), i("button", {
          key: 1,
          type: "button",
          "aria-label": e.state.media.status === "ended" ? "再听一遍" : "继续播放",
          disabled: e.state.busy,
          onClick: d[2] || (d[2] = (v) => s("action", "resume"))
        }, [H(K, { name: "play" })], 8, pn)) : g("", !0),
        n("button", {
          type: "button",
          "aria-label": "停止",
          onClick: d[3] || (d[3] = (v) => s("action", "stop"))
        }, [H(K, { name: "stop" })]),
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
      }, null, 40, mn)) : g("", !0)
    ])) : g("", !0);
  }
}), Ht = bn, fn = { class: "learning-selection" }, kn = { class: "learning-row" }, yn = ["disabled"], hn = /* @__PURE__ */ te({
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
    return (p, s) => (a(), i("div", fn, [n("blockquote", null, r(e.selection.quote), 1), n("div", kn, [
      n("button", {
        type: "button",
        onClick: s[0] || (s[0] = (t) => p.$emit("ask"))
      }, r(l(Be).ask), 1),
      n("button", {
        type: "button",
        disabled: e.disabled || [...e.selection.quote].length > 1e3,
        onClick: s[1] || (s[1] = (t) => p.$emit("say"))
      }, r(l(Be).listen), 9, yn),
      n("button", {
        type: "button",
        onClick: s[2] || (s[2] = (t) => p.$emit("dismiss"))
      }, r(l(Be).dismiss), 1)
    ])]));
  }
}), zt = hn;
function He(e) {
  return {
    picked: [],
    text: "",
    values: {},
    order: e.kind === "order" ? e.options.map((p) => p.id) : []
  };
}
function St(e, p) {
  const s = He(p);
  return !!e.text.trim() || !!e.picked.length || Object.values(e.values).some((t) => !!t.trim()) || e.order.length !== s.order.length || e.order.some((t, o) => t !== s.order[o]);
}
function Yt(e) {
  const p = (s) => s.trim() || null;
  return {
    exam: p(e.exam),
    level: p(e.level),
    targetLevel: p(e.targetLevel),
    explanationLanguage: e.explanationLanguage,
    interests: p(e.interests)
  };
}
var _e = () => ({
  text: "",
  cursor: void 0,
  focus: null,
  study: null,
  sent: null,
  scroll: 0,
  following: !0
});
function $n() {
  const e = we({}), p = we(_e()), s = we(_e()), t = we({
    open: !1,
    form: {
      exam: "",
      level: "",
      targetLevel: "",
      explanationLanguage: "zh-CN",
      interests: ""
    },
    submitted: null
  }), o = we({ enabled: !1 }), d = we({
    step: 0,
    name: "",
    note: ""
  }), v = we({
    tab: "grammar",
    reason: ""
  });
  return {
    units: e,
    chat: p,
    workbenchChat: s,
    settings: t,
    companion: o,
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
        for (const f of Object.keys(e)) delete e[f];
        t.open = !1, t.submitted = null, Object.assign(s, _e());
      }
      Object.assign(p, _e()), o.enabled = !1, b || Object.assign(d, {
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
      I && b.storage === "ready" && !b.busy && b.profile && Object.entries(I.value).every(([f, $]) => b.profile.settings[f] === $) && (Object.entries(I.form).every(([f, $]) => t.form[f] === $) && (t.open = !1), t.submitted = null);
      for (const f of Object.keys(e)) {
        const $ = [b.unit, b.review].find((w) => w?.id === f);
        if (!$) {
          delete e[f];
          continue;
        }
        for (const [w, k] of Object.entries(e[f].activityDrafts)) {
          const m = $.attempts.filter((u) => u.exerciseId === w).at(-1);
          if (k.submitted && m && m.id !== k.submitted.before) {
            delete e[f].activityDrafts[w];
            const u = e[f].activities[`exercise:${w}`];
            u && (u.retry = !1);
          }
        }
        const y = e[f].selection;
        y && $.materials.find((w) => w.id === y.materialId)?.paragraphs.find((w) => w.id === y.paragraphId)?.text.slice(y.start, y.end) !== y.quote && (e[f].selection = null);
        for (const [w, k] of Object.entries(e[f].writing)) {
          const m = $.attempts.filter((x) => x.exerciseId === w && !x.revisesAttemptId).at(-1), u = k.submitted;
          !u || !m || m.id === u.before || (k.text === u.text && m.answer.kind === "text" && m.answer.text === u.text.trim() ? (k.text = "", k.rewriting = !1) : k.rewriting = !0, k.submitted = null);
        }
      }
      for (const [f, $] of [[p, b.conversation], [s, b.workbenchConversation]]) {
        const y = f.sent;
        y && $.turns.some((w, k) => k + $.removedTurns >= y.after && w.purpose === "talk" && w.user === y.user) && (f.text === y.text && (f.text = "", f.focus = null), f.sent = null);
      }
    }
  };
}
var Kt = /* @__PURE__ */ Symbol("learning-ui-session");
function Zt(e, p) {
  if (e.chat.text.trim() || e.workbenchChat.text.trim() || e.settings.open && Object.entries(Yt(e.settings.form)).some(([s, t]) => p.profile?.settings[s] !== t) || e.setup.step === 1 && e.setup.name.trim() && (e.setup.name.trim() !== p.teacher?.name || e.setup.note.trim() !== p.teacher.note)) return !0;
  for (const s of [p.unit, p.review]) {
    const t = s && e.units[s.id];
    if (!(!s || !t)) {
      if (Object.values(t.writing).some((o) => !!o.text.trim()) || s.stage.stage === "revising" && s.assessments.some((o) => o.annotations?.some((d) => t.edits[d.id] && t.edits[d.id].value !== d.quote))) return !0;
      for (const o of s.exercises) {
        const d = t.activityDrafts[o.id]?.value, v = t.review.drafts[o.id];
        if (d && St(d, o.response) || v && !s.attempts.some((b) => b.exerciseId === o.id) && St(v, o.response)) return !0;
      }
    }
  }
  return !1;
}
function wn(e, p, s, t) {
  return s === "teacher" ? t.teacher?.name !== p.teacher?.name && !!e.chat.text.trim() : s === "language" && t.language !== p.language && Zt(e, p);
}
function xn(e) {
  const p = $n();
  return da(Kt, p), Z([
    () => e.value.chatIdentity,
    () => e.value.language,
    () => e.value.companionSessionId
  ], (s, t) => p.reset(s[0] === t[0], s[0] === t[0] && s[1] === t[1])), Z(() => e.value, (s) => p.reconcile(s), { immediate: !0 }), Z(() => [e.value.unit?.id, e.value.review?.id], (s) => {
    for (const t of [p.chat, p.workbenchChat])
      t.focus?.unitId && !s.includes(t.focus.unitId) && (t.focus = null), t.study && !s.includes(t.study.unitId) && (t.study = null);
  }), Z(() => Zt(p, e.value), (s, t, o) => {
    if (!s) return;
    const d = (v) => {
      v.preventDefault(), v.returnValue = "";
    };
    window.addEventListener("beforeunload", d), o(() => window.removeEventListener("beforeunload", d));
  }, { immediate: !0 }), p;
}
function Me() {
  const e = ra(Kt);
  if (!e) throw new Error("Learning views require their application session");
  return e;
}
function Ee(e) {
  const p = Me();
  return C(() => p.unit(e()));
}
var Cn = ["onKeydown"], In = {
  role: "dialog",
  "aria-labelledby": "learning-activity-title",
  class: "learning-activity"
}, Ln = { class: "learning-activity-header" }, Sn = { id: "learning-activity-title" }, An = {
  key: 0,
  "aria-label": "完成本课的固定奖励"
}, Rn = {
  key: 0,
  class: "learning-margin-note",
  role: "status"
}, Mn = ["open"], En = {
  key: 3,
  class: "learning-question"
}, Tn = { class: "learning-help-actions" }, Nn = ["disabled"], Bn = ["disabled"], On = ["disabled"], qn = {
  key: 0,
  class: "learning-margin-note"
}, Pn = {
  key: 1,
  class: "learning-margin-note"
}, Un = { key: 0 }, Vn = { key: 1 }, Dn = { key: 2 }, jn = ["disabled"], Wn = /* @__PURE__ */ te({
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
    const s = e, t = p, o = z(null), d = Ee(() => s.target.unitId), v = C(() => `${s.target.kind}:${s.target.id}`);
    Z([d, v], () => {
      d.value.activities[v.value] ??= {
        scroll: 0,
        selected: null,
        retry: !1,
        materialsOpen: !1
      };
    }, { immediate: !0 });
    const b = C(() => d.value.activities[v.value]), I = z(null), f = C({
      get: () => b.value.retry,
      set: (D) => {
        b.value.retry = D;
      }
    }), $ = C({
      get: () => b.value.selected,
      set: (D) => {
        b.value.selected = D;
      }
    }), y = z(null);
    function w() {
      $.value ? $.value = null : f.value ? f.value = !1 : t("close");
    }
    Pt(y, w);
    const k = C(() => d.value.activityDrafts);
    let m = null;
    const u = C(() => s.target?.kind === "exercise" ? s.state.unit?.exercises.find((D) => D.id === s.target?.id) : void 0), x = C(() => s.state.unit?.materials.filter((D) => s.target?.kind === "material" ? D.id === s.target.id : u.value?.materialIds.includes(D.id)) ?? []), j = C(() => u.value?.id ?? s.state.unit?.exercises.find((D) => D.skill === "listening" && D.materialIds.includes(s.target?.id ?? ""))?.id ?? s.state.unit?.exercises.find((D) => D.materialIds.includes(s.target?.id ?? ""))?.id), N = C(() => x.value.filter((D) => u.value?.response.kind !== "evidence" || D.id === u.value.response.materialId).flatMap((D) => D.paragraphs)), L = C(() => s.state.unit?.attempts.filter((D) => D.exerciseId === u.value?.id).at(-1)), B = C(() => s.state.unit?.assessments.find((D) => D.attemptId === L.value?.id));
    Z(() => u.value, (D) => {
      if (!D) return;
      const q = JSON.stringify(D.response);
      k.value[D.id]?.response !== q && (k.value[D.id] = {
        response: q,
        value: He(D.response)
      });
    }, { immediate: !0 });
    const _ = C({
      get: () => k.value[u.value.id].value,
      set: (D) => {
        k.value[u.value.id].value = D;
      }
    });
    Ae(() => {
      I.value?.focus({ preventScroll: !0 }), o.value && (o.value.scrollTop = b.value.scroll);
    }), Re(() => {
      o.value && (b.value.scroll = o.value.scrollTop);
    }), Z(() => s.state.unit?.attempts, (D) => {
      if (!m) return;
      const q = D?.filter((W) => W.exerciseId === m.id).at(-1);
      if (q && q.id !== m.before) {
        const W = s.target?.kind === "exercise" && s.target.id === m.id;
        delete k.value[m.id], m = null, W && t("close");
      }
    });
    function U(D) {
      m = {
        id: u.value.id,
        before: L.value?.id
      }, k.value[u.value.id].submitted = { before: L.value?.id }, t("action", "submit", {
        unitId: s.state.unit.id,
        exerciseId: u.value.id,
        answer: D
      });
    }
    return (D, q) => (a(), i("div", {
      ref_key: "layer",
      ref: y,
      class: "learning-activity-shade",
      onKeydown: Oe(de(w, ["stop", "prevent"]), ["esc"])
    }, [n("section", In, [
      n("header", Ln, [
        n("h2", Sn, r(u.value ? "练习" : x.value[0]?.title ?? "材料"), 1),
        e.state.unit ? (a(), i("small", An, "+" + r(e.state.unit.reward.amount) + " 币", 1)) : g("", !0),
        n("button", {
          ref_key: "closeButton",
          ref: I,
          type: "button",
          "aria-label": "收起课件",
          onClick: q[0] || (q[0] = (W) => t("close"))
        }, [q[18] || (q[18] = Y("收起", -1)), H(K, { name: "back" })], 512)
      ]),
      e.state.message && !e.state.busy ? (a(), i("p", Rn, r(e.state.message), 1)) : g("", !0),
      n("div", {
        ref_key: "body",
        ref: o,
        class: "learning-activity-body"
      }, [
        u.value && x.value.length ? (a(), i("details", {
          key: 0,
          class: "learning-activity-materials",
          open: b.value.materialsOpen,
          onToggle: q[3] || (q[3] = (W) => b.value.materialsOpen = W.target.open)
        }, [n("summary", null, "阅读材料 · " + r(x.value.length), 1), (a(!0), i(M, null, F(x.value, (W) => (a(), J(Ct, {
          key: W.id,
          material: W,
          "exercise-id": j.value,
          disabled: e.disabled,
          onAction: q[1] || (q[1] = (E, R) => t("action", E, R)),
          onSelect: q[2] || (q[2] = (E) => $.value = E)
        }, null, 8, [
          "material",
          "exercise-id",
          "disabled"
        ]))), 128))], 40, Mn)) : u.value ? g("", !0) : (a(!0), i(M, { key: 1 }, F(x.value, (W) => (a(), J(Ct, {
          key: W.id,
          material: W,
          "exercise-id": j.value,
          disabled: e.disabled,
          onAction: q[4] || (q[4] = (E, R) => t("action", E, R)),
          onSelect: q[5] || (q[5] = (E) => $.value = E)
        }, null, 8, [
          "material",
          "exercise-id",
          "disabled"
        ]))), 128)),
        $.value ? (a(), J(zt, {
          key: 2,
          selection: $.value,
          disabled: e.disabled,
          onAsk: q[6] || (q[6] = (W) => t("ask", j.value, $.value)),
          onSay: q[7] || (q[7] = (W) => t("action", "say", { selection: $.value })),
          onDismiss: q[8] || (q[8] = (W) => $.value = null)
        }, null, 8, ["selection", "disabled"])) : g("", !0),
        u.value ? (a(), i("section", En, [
          n("h2", null, r(u.value.prompt), 1),
          n("div", Tn, [
            n("button", {
              type: "button",
              disabled: e.disabled || [...u.value.prompt].length > 1e3,
              onClick: q[9] || (q[9] = (W) => t("action", "say-question", { exerciseId: u.value.id }))
            }, "听题干", 8, Nn),
            u.value.hasHint ? (a(), i("button", {
              key: 0,
              type: "button",
              disabled: e.disabled || u.value.hint !== null,
              onClick: q[10] || (q[10] = (W) => t("action", "reveal", {
                kind: "hints",
                id: u.value.id
              }))
            }, "提示", 8, Bn)) : g("", !0),
            n("button", {
              type: "button",
              disabled: e.disabled || u.value.solution !== null,
              onClick: q[11] || (q[11] = (W) => t("action", "reveal", {
                kind: "answers",
                id: u.value.id
              }))
            }, "解答", 8, On),
            n("button", {
              type: "button",
              onClick: q[12] || (q[12] = (W) => t("ask", u.value.id))
            }, "问语伴")
          ]),
          u.value.hint ? (a(), i("p", qn, r(u.value.hint), 1)) : g("", !0),
          u.value.solution ? (a(), i("div", Pn, [u.value.solution.kind === "exact" ? (a(), i("p", Un, r(l(dt)(u.value.solution.answer, u.value.response, N.value)), 1)) : u.value.solution.kind === "gaps" ? (a(), i("p", Vn, r(u.value.solution.accepted.map((W) => W.forms.join(" / ")).join(`
`)), 1)) : g("", !0), u.value.solution.kind !== "semantic" ? (a(), i("p", Dn, r(u.value.solution.explanation), 1)) : (a(), i("button", {
            key: 3,
            type: "button",
            onClick: q[13] || (q[13] = (W) => t("ask", u.value.id))
          }, "请语伴讲解"))])) : g("", !0),
          (!L.value || f.value) && k.value[u.value.id] ? (a(), J(Ut, {
            key: u.value.id,
            modelValue: _.value,
            "onUpdate:modelValue": q[14] || (q[14] = (W) => _.value = W),
            response: u.value.response,
            paragraphs: N.value,
            disabled: e.disabled,
            onSubmit: U
          }, null, 8, [
            "modelValue",
            "response",
            "paragraphs",
            "disabled"
          ])) : g("", !0),
          L.value ? (a(), J(jt, {
            key: 3,
            attempt: L.value,
            feedback: B.value,
            response: u.value.response,
            paragraphs: N.value,
            disabled: e.disabled,
            revised: !!e.state.unit?.attempts.some((W) => W.revisesAttemptId === L.value?.id),
            onAction: q[15] || (q[15] = (W, E) => {
              t("action", W, E), t("close");
            })
          }, null, 8, [
            "attempt",
            "feedback",
            "response",
            "paragraphs",
            "disabled",
            "revised"
          ])) : g("", !0),
          L.value ? (a(), i("button", {
            key: 4,
            type: "button",
            disabled: e.disabled,
            onClick: q[16] || (q[16] = (W) => {
              f.value = !f.value, k.value[u.value.id] ??= {
                response: JSON.stringify(u.value.response),
                value: l(He)(u.value.response)
              };
            })
          }, r(f.value ? "收起再练" : "再试一次"), 9, jn)) : g("", !0)
        ])) : g("", !0)
      ], 512),
      H(Ht, {
        state: e.state,
        onAction: q[17] || (q[17] = (W, E) => t("action", W, E))
      }, null, 8, ["state"])
    ])], 40, Cn));
  }
}), _n = Wn, Gn = 864e5;
function At(e, p) {
  return /^(zh|ja|ko)\b/iu.test(p) ? {
    count: [...e.replace(/[\s\p{P}\p{S}]/gu, "")].length,
    unit: "字"
  } : {
    count: e.match(/[\p{L}\p{N}][\p{L}\p{N}\p{M}'’-]*/gu)?.length ?? 0,
    unit: "词"
  };
}
function Jt(e, p) {
  const s = [], t = /* @__PURE__ */ new Map();
  for (const o of p)
    if (o.quote)
      for (let d = e.indexOf(o.quote); d >= 0; d = e.indexOf(o.quote, d + 1)) {
        const v = d + o.quote.length;
        if (!s.some(([b, I]) => d < I && b < v)) {
          s.push([d, v]), t.set(o.id, d);
          break;
        }
      }
  return t;
}
function Fn(e, p) {
  const s = e.split(/(\r?\n)/u), t = [];
  s.forEach((f, $) => {
    $ % 2 === 0 && f.trim() && t.push($);
  });
  const o = [], d = [], v = /* @__PURE__ */ new Map();
  for (const f of p) v.set(f.paragraphIndex, [...v.get(f.paragraphIndex) ?? [], f]);
  for (const [f, $] of v) {
    const y = t[f];
    if (y === void 0) {
      o.push(...$.map((u) => u.id));
      continue;
    }
    const w = Jt(s[y], $), k = $.filter((u) => w.has(u.id)).sort((u, x) => w.get(x.id) - w.get(u.id));
    let m = s[y];
    for (const u of k) {
      const x = w.get(u.id);
      m = m.slice(0, x) + u.replacement + m.slice(x + u.quote.length), u.replacement !== u.quote && d.push(u.id);
    }
    s[y] = m, o.push(...$.filter((u) => !w.has(u.id)).map((u) => u.id));
  }
  const b = new Map(p.map((f, $) => [f.id, $])), I = (f, $) => b.get(f) - b.get($);
  return {
    text: s.join(""),
    missing: o.sort(I),
    applied: d.sort(I)
  };
}
function Hn(e, p) {
  const s = Jt(e, p), t = p.filter((v) => s.has(v.id)).map((v) => ({
    id: v.id,
    start: s.get(v.id),
    length: v.quote.length
  })).sort((v, b) => v.start - b.start), o = [];
  let d = 0;
  for (const v of t)
    v.start > d && o.push({ text: e.slice(d, v.start) }), o.push({
      text: e.slice(v.start, v.start + v.length),
      id: v.id
    }), d = v.start + v.length;
  return (d < e.length || !o.length) && o.push({ text: e.slice(d) }), o;
}
function zn(e, p = "xiaobai-learning-seen-units") {
  const s = /* @__PURE__ */ new Set(), t = () => {
    try {
      const o = JSON.parse(e()?.getItem(p) ?? "[]");
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
        e()?.setItem(p, JSON.stringify([.../* @__PURE__ */ new Set([...t(), o])].slice(-50)));
      } catch {
      }
    }
  };
}
var Yn = () => {
  try {
    return globalThis.localStorage;
  } catch {
    return null;
  }
}, Rt = zn(Yn);
function vt(e, p = Date.now()) {
  const s = new Date(e), t = new Date(p), o = Math.round((Date.UTC(s.getFullYear(), s.getMonth(), s.getDate()) - Date.UTC(t.getFullYear(), t.getMonth(), t.getDate())) / Gn);
  return !Number.isFinite(o) || o <= 0 ? "今天复习" : o === 1 ? "明天再见" : `${o} 天后再见`;
}
var Kn = { class: "learning-records-page" }, Zn = {
  key: 0,
  class: "learning-page-heading"
}, Jn = {
  key: 0,
  class: "learning-muted"
}, Qn = { class: "learning-muted" }, Xn = {
  key: 0,
  class: "learning-muted"
}, ei = ["disabled", "onClick"], ti = ["disabled"], ai = {
  key: 0,
  class: "learning-empty-note"
}, ni = ["disabled", "onClick"], ii = ["title"], li = {
  key: 1,
  class: "learning-row"
}, si = ["disabled"], ri = { class: "learning-muted" }, oi = ["disabled"], ui = /* @__PURE__ */ te({
  __name: "LearningRecords",
  props: {
    state: {},
    disabled: { type: Boolean },
    embedded: { type: Boolean }
  },
  emits: ["action", "remove"],
  setup(e, { emit: p }) {
    const s = e, t = p;
    Fe(() => s.state.record ? (t("action", "records", { offset: s.state.records.offset }), !0) : !1);
    const o = {
      deleteAnswer: "删除这次作答",
      deleteRecord: "删除记录",
      answerWarning: "这次作答和对应的反馈会删除，相关知识点的掌握情况会更新。已到账奖励保留。",
      recordWarning: "这条学习记录会删除，仅属于它的历史作答也会删除。当前练习不受影响。",
      hidden: "听力原文暂未显示，下面是你的作答和点评。"
    };
    return (d, v) => (a(), i("section", Kn, [!e.embedded || e.state.record ? (a(), i("div", Zn, [v[5] || (v[5] = n("h1", null, "学习记录", -1)), e.state.records.total ? (a(), i("span", Jn, r(e.state.records.total) + " 项", 1)) : g("", !0)])) : g("", !0), e.state.record ? (a(), i(M, { key: 1 }, [
      n("button", {
        type: "button",
        onClick: v[0] || (v[0] = (b) => d.$emit("action", "records", { offset: e.state.records.offset }))
      }, "‹ 返回记录"),
      n("h2", null, r(e.state.record.label), 1),
      (a(!0), i(M, null, F(e.state.record.evidence, (b) => (a(), i("article", {
        key: b.attempt.id,
        class: "learning-record-evidence"
      }, [
        n("p", Qn, r(new Date(b.attempt.submittedAt).toLocaleDateString()), 1),
        n("h3", null, r(b.exercise.prompt), 1),
        (a(!0), i(M, null, F(b.materials, (I) => (a(), i("details", { key: I.id }, [n("summary", null, r(I.title), 1), I.hidden ? (a(), i("p", Xn, r(o.hidden), 1)) : (a(!0), i(M, { key: 1 }, F(I.paragraphs, (f) => (a(), i("p", { key: f.id }, r(f.text), 1))), 128))]))), 128)),
        H(jt, {
          attempt: b.attempt,
          feedback: b.assessment,
          response: b.exercise.response,
          paragraphs: b.materials.flatMap((I) => I.paragraphs),
          disabled: e.disabled,
          revised: !!e.state.unit?.attempts.some((I) => I.revisesAttemptId === b.attempt.id),
          onAction: v[1] || (v[1] = (I, f) => d.$emit("action", I, f))
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
          onClick: (I) => d.$emit("remove", "delete-attempt", { id: b.attempt.id }, o.answerWarning)
        }, r(o.deleteAnswer), 9, ei)
      ]))), 128)),
      n("button", {
        type: "button",
        disabled: e.disabled,
        onClick: v[2] || (v[2] = (b) => d.$emit("remove", "delete-item", { id: e.state.record.id }, o.recordWarning))
      }, r(o.deleteRecord), 9, ti)
    ], 64)) : (a(), i(M, { key: 2 }, [
      e.state.records.total ? g("", !0) : (a(), i("p", ai, "暂无学习记录")),
      (a(!0), i(M, null, F(e.state.records.items, (b) => (a(), i("button", {
        key: b.id,
        class: "learning-record-row",
        type: "button",
        disabled: !b.readable,
        onClick: (I) => d.$emit("action", "records", {
          id: b.id,
          offset: e.state.records.offset
        })
      }, [n("span", null, [n("strong", null, r(b.label), 1), n("small", null, [Y(r(l(Gt)(b.evidenceCount)), 1), b.nextReviewAt ? (a(), i("span", {
        key: 0,
        title: b.scheduleReason ?? void 0
      }, " · " + r(l(vt)(b.nextReviewAt)) + "（" + r(new Date(b.nextReviewAt).toLocaleDateString()) + "）", 9, ii)) : g("", !0)])]), n("em", null, r(l(_t)[b.state]), 1)], 8, ni))), 128)),
      e.state.records.total > 30 ? (a(), i("div", li, [
        n("button", {
          type: "button",
          disabled: e.state.records.offset === 0,
          onClick: v[3] || (v[3] = (b) => d.$emit("action", "records", { offset: Math.max(0, e.state.records.offset - 30) }))
        }, "上一页", 8, si),
        n("span", ri, r(e.state.records.total) + " 项", 1),
        n("button", {
          type: "button",
          disabled: e.state.records.offset + 30 >= e.state.records.total,
          onClick: v[4] || (v[4] = (b) => d.$emit("action", "records", { offset: e.state.records.offset + 30 }))
        }, "下一页", 8, oi)
      ])) : g("", !0)
    ], 64))]));
  }
}), Mt = ui, di = { class: "learning-books-page" }, vi = { class: "learning-page-heading" }, ci = {
  key: 0,
  class: "learning-due"
}, gi = { key: 0 }, pi = { key: 1 }, mi = ["disabled"], bi = {
  class: "learning-tabs",
  role: "tablist",
  "aria-label": "学习记录视图"
}, fi = ["aria-selected", "onClick"], ki = {
  key: 0,
  class: "learning-empty-note"
}, yi = { class: "learning-book-list" }, hi = ["disabled", "onClick"], $i = ["aria-expanded", "onClick"], wi = {
  key: 1,
  class: "learning-chip-reason"
}, xi = {
  key: 2,
  class: "learning-growth"
}, Ci = {
  key: 0,
  class: "learning-empty-note"
}, Ii = { class: "learning-muted" }, Li = { key: 0 }, Si = { key: 0 }, Ai = { key: 1 }, Ri = { key: 2 }, Mi = /* @__PURE__ */ te({
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
    const s = e, t = p, o = Me().books, d = fe(o, "tab"), v = [
      ["grammar", "语法本"],
      ["vocabulary", "生词本"],
      ["growth", "成长"],
      ["all", "全部记录"]
    ], b = { title: "学习本" }, I = fe(o, "reason"), f = C(() => d.value === "grammar" || d.value === "vocabulary" ? s.state.books[d.value] : []), $ = C(() => s.state.growth), y = C(() => !!s.state.review && s.state.review.stage.stage !== "complete");
    return (w, k) => (a(), i("section", di, [e.state.record ? (a(), J(Mt, {
      key: 0,
      state: e.state,
      disabled: e.disabled,
      onAction: k[0] || (k[0] = (m, u) => t("action", m, u)),
      onRemove: k[1] || (k[1] = (m, u, x) => t("remove", m, u, x))
    }, null, 8, ["state", "disabled"])) : (a(), i(M, { key: 1 }, [
      n("div", vi, [n("h1", null, r(b.title), 1)]),
      e.state.dueCount || y.value ? (a(), i("div", ci, [e.state.dueCount ? (a(), i("span", gi, r(l(Ft)(e.state.dueCount)), 1)) : g("", !0), e.state.blockedReview ? (a(), i("small", pi, "有一组复习在另一个故事中进行，回到学习页可以放下它")) : y.value ? (a(), i("button", {
        key: 3,
        type: "button",
        class: "learning-primary",
        onClick: k[3] || (k[3] = (m) => t("review"))
      }, r(l(X).resumeReview), 1)) : (a(), i("button", {
        key: 2,
        type: "button",
        class: "learning-primary",
        disabled: e.disabled,
        onClick: k[2] || (k[2] = (m) => t("action", "start-review"))
      }, r(l(X).review), 9, mi))])) : g("", !0),
      n("div", bi, [(a(), i(M, null, F(v, ([m, u]) => n("button", {
        key: m,
        type: "button",
        role: "tab",
        "aria-selected": d.value === m,
        onClick: (x) => {
          d.value = m, I.value = "";
        }
      }, r(u), 9, fi)), 64))]),
      d.value === "grammar" || d.value === "vocabulary" ? (a(), i(M, { key: 1 }, [f.value.length ? g("", !0) : (a(), i("p", ki, r(d.value === "grammar" ? "批改里出现的语法问题会记到这里。" : "批改里的词汇问题、读文章时收藏的词语会记到这里。"), 1)), n("ul", yi, [(a(!0), i(M, null, F(f.value, (m) => (a(), i("li", { key: m.id }, [
        n("button", {
          type: "button",
          class: "learning-book-item",
          disabled: !m.readable,
          onClick: (u) => t("action", "records", {
            id: m.id,
            offset: e.state.records.offset
          })
        }, [n("strong", null, r(m.label), 1), n("small", null, r(l(_t)[m.state]) + " · " + r(l(Gt)(m.evidenceCount)), 1)], 8, hi),
        m.nextReviewAt ? (a(), i("button", {
          key: 0,
          type: "button",
          class: "learning-chip",
          "aria-expanded": I.value === m.id,
          onClick: (u) => I.value = I.value === m.id ? "" : m.id
        }, r(l(vt)(m.nextReviewAt)), 9, $i)) : g("", !0),
        I.value === m.id ? (a(), i("small", wi, r(m.scheduleReason), 1)) : g("", !0)
      ]))), 128))])], 64)) : d.value === "growth" ? (a(), i("section", xi, [$.value.enough ? (a(), i(M, { key: 1 }, [
        n("p", Ii, [Y("来自 " + r($.value.evidence) + " 份作答", 1), $.value.completed ? (a(), i("span", Li, "、" + r($.value.completed) + " 次完成", 1)) : g("", !0)]),
        $.value.steady.length ? (a(), i("div", Si, [k[6] || (k[6] = n("h2", null, "已经稳定", -1)), n("p", null, r($.value.steady.join("、")), 1)])) : g("", !0),
        $.value.practising.length ? (a(), i("div", Ai, [k[7] || (k[7] = n("h2", null, "最近独立做对", -1)), n("p", null, r($.value.practising.join("、")), 1)])) : g("", !0),
        $.value.struggling.length ? (a(), i("div", Ri, [k[8] || (k[8] = n("h2", null, "还要再练", -1)), n("p", null, r($.value.struggling.join("、")), 1)])) : g("", !0)
      ], 64)) : (a(), i("p", Ci, "还需要几次练习才看得出"))])) : (a(), J(Mt, {
        key: 3,
        embedded: "",
        state: e.state,
        disabled: e.disabled,
        onAction: k[4] || (k[4] = (m, u) => t("action", m, u)),
        onRemove: k[5] || (k[5] = (m, u, x) => t("remove", m, u, x))
      }, null, 8, ["state", "disabled"]))
    ], 64))]));
  }
}), Ei = Mi, Ti = {
  class: "learning-settings-card",
  "aria-label": "训练设置"
}, Ni = { key: 0 }, Bi = ["disabled"], Oi = ["open"], qi = ["value"], Pi = { class: "learning-row" }, Ui = ["disabled"], Vi = /* @__PURE__ */ te({
  __name: "LearningSettingsCard",
  props: {
    state: {},
    disabled: { type: Boolean },
    onboarding: { type: Boolean }
  },
  emits: ["action"],
  setup(e, { emit: p }) {
    const s = e, t = p, o = [
      ["zh-CN", "中文"],
      ["en", "English"],
      ["ja", "日本語"],
      ["ko", "한국어"]
    ], d = C(() => s.state.profile?.settings ?? null), v = Me().settings, b = v.form, I = fe(v, "open");
    function f() {
      Object.assign(b, {
        exam: d.value?.exam ?? "",
        level: d.value?.level ?? "",
        targetLevel: d.value?.targetLevel ?? "",
        explanationLanguage: d.value?.explanationLanguage ?? "zh-CN",
        interests: d.value?.interests ?? ""
      });
    }
    s.onboarding && !v.open && (f(), v.open = !0);
    const $ = (m) => o.find(([u]) => u === m)?.[1] ?? new Intl.DisplayNames(["zh-CN"], { type: "language" }).of(m) ?? m, y = C(() => [.../* @__PURE__ */ new Set([...o.map(([m]) => m), d.value?.explanationLanguage ?? "zh-CN"])]), w = C(() => [
      ["考试", d.value?.exam || "不备考"],
      ["水平", d.value?.level || "不确定"],
      ["目标", d.value?.targetLevel || "比现在高一级"],
      ["讲解", $(d.value?.explanationLanguage ?? "zh-CN")],
      ["兴趣", d.value?.interests || "不限"]
    ]);
    function k() {
      const m = Yt(b);
      v.submitted = {
        value: m,
        form: { ...b }
      }, t("action", "settings", { value: m });
    }
    return (m, u) => (a(), i("section", Ti, [I.value ? g("", !0) : (a(), i("dl", Ni, [(a(!0), i(M, null, F(w.value, ([x, j]) => (a(), i("div", { key: x }, [n("dt", null, r(x), 1), n("dd", null, r(j), 1)]))), 128))])), I.value ? (a(), i("form", {
      key: 2,
      class: "learning-fields",
      onSubmit: de(k, ["prevent"])
    }, [
      n("label", null, [u[7] || (u[7] = Y("考试", -1)), ne(n("input", {
        "onUpdate:modelValue": u[1] || (u[1] = (x) => l(b).exam = x),
        type: "text",
        maxlength: "80",
        placeholder: "不备考（例如 雅思、JLPT N2）"
      }, null, 512), [[ue, l(b).exam]])]),
      n("label", null, [u[8] || (u[8] = Y("现在的水平", -1)), ne(n("input", {
        "onUpdate:modelValue": u[2] || (u[2] = (x) => l(b).level = x),
        type: "text",
        maxlength: "80",
        placeholder: "不确定"
      }, null, 512), [[ue, l(b).level]])]),
      n("label", null, [u[9] || (u[9] = Y("目标", -1)), ne(n("input", {
        "onUpdate:modelValue": u[3] || (u[3] = (x) => l(b).targetLevel = x),
        type: "text",
        maxlength: "80",
        placeholder: "比现在高一级"
      }, null, 512), [[ue, l(b).targetLevel]])]),
      n("details", {
        class: "learning-settings-optional",
        open: !e.onboarding
      }, [
        n("summary", null, r(l(X).optionalSettings), 1),
        n("label", null, [u[10] || (u[10] = Y("讲解语言", -1)), ne(n("select", { "onUpdate:modelValue": u[4] || (u[4] = (x) => l(b).explanationLanguage = x) }, [(a(!0), i(M, null, F(y.value, (x) => (a(), i("option", {
          key: x,
          value: x
        }, r($(x)), 9, qi))), 128))], 512), [[Ge, l(b).explanationLanguage]])]),
        n("label", null, [u[11] || (u[11] = Y("感兴趣的话题", -1)), ne(n("input", {
          "onUpdate:modelValue": u[5] || (u[5] = (x) => l(b).interests = x),
          type: "text",
          maxlength: "200",
          placeholder: "不限"
        }, null, 512), [[ue, l(b).interests]])])
      ], 8, Oi),
      n("div", Pi, [e.onboarding ? g("", !0) : (a(), i("button", {
        key: 0,
        type: "button",
        onClick: u[6] || (u[6] = (x) => {
          I.value = !1, l(v).submitted = null;
        })
      }, "取消")), n("button", {
        type: "submit",
        class: "learning-primary",
        disabled: e.disabled
      }, r(e.onboarding ? l(X).setupFinish : l(X).saveSettings), 9, Ui)])
    ], 32)) : (a(), i("button", {
      key: 1,
      type: "button",
      disabled: e.disabled,
      onClick: u[0] || (u[0] = (x) => {
        f(), I.value = !0;
      })
    }, "调整", 8, Bi))]));
  }
}), Qt = Vi, Di = { class: "learning-profile-page" }, ji = { class: "learning-setup-heading" }, Wi = { class: "learning-eyebrow" }, _i = { class: "learning-language-options" }, Gi = [
  "disabled",
  "aria-pressed",
  "onClick"
], Fi = { "aria-hidden": "true" }, Hi = ["disabled"], zi = {
  key: 0,
  class: "learning-setup-empty"
}, Yi = { class: "learning-teacher-options" }, Ki = [
  "disabled",
  "aria-pressed",
  "onClick"
], Zi = { class: "learning-person-initial" }, Ji = {
  key: 1,
  class: "learning-selected-teacher"
}, Qi = { class: "learning-person-initial" }, Xi = { key: 0 }, el = ["open"], tl = ["disabled"], al = ["disabled"], nl = ["disabled"], il = { class: "learning-setup-actions" }, ll = ["disabled"], sl = ["disabled"], rl = /* @__PURE__ */ te({
  __name: "LearningSetup",
  props: {
    state: {},
    disabled: { type: Boolean }
  },
  emits: ["action"],
  setup(e, { emit: p }) {
    const s = p, t = Me().setup, o = fe(t, "step"), d = z(null), v = fe(t, "name"), b = fe(t, "note"), I = [
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
      o.value = $, await re(), d.value?.focus();
    }
    return Fe(() => o.value ? (f(o.value - 1), !0) : !1), ($, y) => (a(), i("section", Di, [n("div", ji, [n("p", Wi, r(o.value + 1) + " / " + r(l(X).setupSteps), 1), n("h1", {
      ref_key: "heading",
      ref: d,
      tabindex: "-1"
    }, r(o.value === 0 ? "选择要学习的语言" : o.value === 1 ? "选择语伴" : l(X).setupTitle), 513)]), o.value === 0 ? (a(), i(M, { key: 0 }, [n("div", _i, [(a(), i(M, null, F(I, ([w, k, m]) => n("button", {
      key: w,
      type: "button",
      disabled: e.disabled,
      "aria-pressed": e.state.language === w,
      onClick: (u) => s("action", "language", { language: w })
    }, [
      n("span", Fi, r(m), 1),
      n("strong", null, r(k), 1),
      e.state.language === w ? (a(), J(K, {
        key: 0,
        name: "check"
      })) : g("", !0)
    ], 8, Gi)), 64))]), n("button", {
      type: "button",
      class: "learning-primary learning-setup-next",
      disabled: e.disabled,
      onClick: y[0] || (y[0] = (w) => f(1))
    }, [y[7] || (y[7] = Y("继续", -1)), H(K, { name: "arrow" })], 8, Hi)], 64)) : o.value === 1 ? (a(), i(M, { key: 1 }, [
      e.state.candidates.length ? g("", !0) : (a(), i("p", zi, "当前故事里还没有认识的人物，所以没有可选的语伴。可以在下面手动填一位：名字加一句身份说明。")),
      n("div", Yi, [(a(!0), i(M, null, F(e.state.candidates, (w) => (a(), i("button", {
        key: w.name,
        type: "button",
        disabled: e.disabled,
        "aria-pressed": e.state.teacher?.name === w.name,
        onClick: (k) => s("action", "teacher", { teacher: {
          name: w.name,
          note: ""
        } })
      }, [
        n("span", Zi, r([...w.name][0]), 1),
        n("strong", null, r(w.name), 1),
        e.state.teacher?.name === w.name ? (a(), J(K, {
          key: 0,
          name: "check"
        })) : g("", !0)
      ], 8, Ki))), 128))]),
      e.state.teacher && !e.state.candidates.some((w) => w.name === e.state.teacher?.name) ? (a(), i("p", Ji, [
        n("span", Qi, r([...e.state.teacher.name][0]), 1),
        n("span", null, [Y(r(e.state.teacher.name), 1), e.state.teacher.note ? (a(), i("small", Xi, r(e.state.teacher.note), 1)) : g("", !0)]),
        H(K, { name: "check" })
      ])) : g("", !0),
      n("details", {
        class: "learning-other-teacher",
        open: !e.state.candidates.length
      }, [n("summary", null, r(e.state.candidates.length ? "手动填写其他人物" : "手动填写"), 1), n("form", {
        class: "learning-fields",
        onSubmit: y[3] || (y[3] = de((w) => s("action", "teacher", { teacher: {
          name: v.value.trim(),
          note: b.value.trim()
        } }), ["prevent"]))
      }, [
        n("label", null, [y[8] || (y[8] = Y("名字", -1)), ne(n("input", {
          "onUpdate:modelValue": y[1] || (y[1] = (w) => v.value = w),
          type: "text",
          maxlength: "80",
          placeholder: "例如 林老师",
          disabled: e.disabled
        }, null, 8, tl), [[ue, v.value]])]),
        n("label", null, [y[9] || (y[9] = Y("一句身份说明", -1)), ne(n("input", {
          "onUpdate:modelValue": y[2] || (y[2] = (w) => b.value = w),
          type: "text",
          maxlength: "200",
          placeholder: "例如 在东京长大的大学同学，说话直爽",
          disabled: e.disabled
        }, null, 8, al), [[ue, b.value]])]),
        n("button", {
          type: "submit",
          disabled: e.disabled || !v.value.trim()
        }, "选这位", 8, nl)
      ], 32)], 8, el),
      n("div", il, [n("button", {
        type: "button",
        disabled: e.disabled,
        onClick: y[4] || (y[4] = (w) => f(0))
      }, "上一步", 8, ll), n("button", {
        type: "button",
        class: "learning-primary",
        disabled: e.disabled,
        onClick: y[5] || (y[5] = (w) => f(2))
      }, [Y(r(e.state.teacher ? l(X).setupContinue : l(ee).skipCompanion), 1), H(K, { name: "arrow" })], 8, sl)])
    ], 64)) : (a(), J(Qt, {
      key: 2,
      onboarding: "",
      state: e.state,
      disabled: e.disabled,
      onAction: y[6] || (y[6] = (w, k) => s("action", w, k ?? {}))
    }, null, 8, ["state", "disabled"]))]));
  }
}), ol = rl, ul = { class: "learning-companion-control" }, dl = {
  key: 0,
  class: "learning-sr-only"
}, vl = { class: "learning-companion-options" }, cl = { class: "learning-companion-switch" }, gl = ["aria-label"], pl = { class: "learning-cost-note" }, ml = /* @__PURE__ */ te({
  __name: "LearningCompanionControl",
  props: { name: {} },
  setup(e) {
    const p = fe(Me().companion, "enabled"), s = {
      title: "陪读",
      on: "一起学习中",
      off: "未开启",
      description: "开启后语伴会和你一起学习",
      costTitle: "费用说明",
      cost: "陪读消息和聊天一样，按你所用的 AI 服务计费。"
    };
    return (t, o) => (a(), i("details", ul, [n("summary", null, [
      n("span", {
        class: se(["learning-companion-light", { "is-on": p.value }]),
        "aria-hidden": "true"
      }, null, 2),
      Y(r(p.value ? e.name ? `${e.name} · ${s.on}` : s.on : s.title), 1),
      p.value ? g("", !0) : (a(), i("span", dl, r(s.off), 1))
    ]), n("div", vl, [n("label", cl, [n("span", null, r(s.description), 1), ne(n("input", {
      "onUpdate:modelValue": o[0] || (o[0] = (d) => p.value = d),
      type: "checkbox",
      role: "switch",
      "aria-label": s.title
    }, null, 8, gl), [[ga, p.value]])]), n("details", pl, [n("summary", null, r(s.costTitle), 1), n("small", null, r(s.cost), 1)])])]));
  }
}), Xt = ml, st = {
  unconfirmed: "还没确认保存是否成功，请先查看保存结果，不要重复提交。",
  conflict: "发现另一份学习记录，请先核对再继续。",
  unloaded: "暂时打不开学习记录。",
  failed: "这次没能保存，之前保存的内容都还在，请重试。"
}, ve = {
  paid: "奖励已到账",
  retired: "钱包已重置，这份奖励不再补发",
  saving: "正在保存学习成果…",
  pending: "学习已完成，奖励待领取",
  needsWallet: "开通钱包后即可领取",
  claim: "领取奖励",
  openWallet: "开通钱包并领取",
  unknown: "学习已完成，奖励到账情况还没确认。请查看钱包状态，不需要重新做练习。"
}, bl = {
  context: "翻看学习资料",
  config: "连接 AI",
  session: "准备学习内容",
  summary: "整理之前聊过的内容",
  provider: "组织回复",
  tools: "整理学习内容",
  save: "保存学习内容",
  action: "准备学习内容"
};
function fl(e) {
  return `正在${bl[e.stage]}…`;
}
var vd = Object.freeze({
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
function Et(e) {
  return e.split(/\r?\n/u).filter((p) => p.trim());
}
var kl = {
  class: "learning-complete",
  role: "status",
  "aria-live": "polite"
}, yl = {
  key: 0,
  class: "learning-complete-burst",
  "aria-hidden": "true"
}, hl = { class: "learning-complete-title" }, $l = {
  key: 1,
  class: "learning-complete-amount"
}, wl = ["disabled"], xl = /* @__PURE__ */ te({
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
    const s = e, t = p, o = C(() => s.state.completions.find((v) => v.unitId === s.unitId)), d = C(() => {
      const v = o.value?.rewardStatus;
      return v === "paid" ? ve.paid : v === "retired" ? ve.retired : o.value ? s.state.walletOpen ? ve.pending : ve.needsWallet : ve.saving;
    });
    return (v, b) => (a(), i("section", kl, [
      e.quiet ? g("", !0) : (a(), i("div", yl, [(a(), i(M, null, F(8, (I) => n("span", {
        key: I,
        style: qt({ "--i": I })
      }, null, 4)), 64))])),
      n("p", hl, r(e.label), 1),
      o.value?.rewardStatus !== "retired" ? (a(), i("p", $l, [n("strong", null, r(o.value?.rewardStatus === "paid" ? "+" : "") + r(o.value?.amount ?? e.amount), 1), b[1] || (b[1] = n("span", null, "小白币", -1))])) : g("", !0),
      n("small", null, r(d.value), 1),
      o.value && o.value.rewardStatus !== "paid" && o.value.rewardStatus !== "retired" ? (a(), i("button", {
        key: 2,
        type: "button",
        disabled: e.disabled || e.state.walletStorage !== "ready",
        onClick: b[0] || (b[0] = (I) => t("action", "reward", {
          unitId: e.unitId,
          openWallet: !e.state.walletOpen
        }))
      }, r(e.state.walletOpen ? l(ve).claim : l(ve).openWallet), 9, wl)) : g("", !0)
    ]));
  }
}), ea = xl, Cl = ["aria-labelledby"], Il = { id: "learning-grading-title" }, Ll = {
  key: 0,
  class: "learning-grading-actions"
}, Sl = {
  key: 0,
  class: "learning-annotation-missing",
  role: "status"
}, Al = ["disabled"], Rl = ["disabled"], Ml = ["open", "onToggle"], El = {
  key: 0,
  class: "learning-revised-text"
}, Tl = { class: "learning-write-saved" }, Nl = { key: 0 }, Bl = {
  key: 1,
  class: "learning-graded-guidance"
}, Ol = ["onClick"], ql = ["open", "onToggle"], Pl = { key: 0 }, Ul = { key: 1 }, Vl = { key: 4 }, Dl = { class: "learning-graded-text" }, jl = { class: "learning-annotation-fixed" }, Wl = {
  key: 0,
  class: "learning-annotation-missing"
}, _l = {
  key: 1,
  class: "learning-annotation-fixed"
}, Gl = ["onClick"], Fl = { class: "learning-annotation-tag" }, Hl = {
  key: 0,
  class: "learning-annotation-suggestion"
}, zl = ["onSubmit"], Yl = ["onUpdate:modelValue", "aria-label"], Kl = ["disabled"], Zl = { key: 2 }, Jl = ["onClick"], Ql = {
  key: 1,
  class: "learning-working",
  role: "status"
}, Xl = ["disabled"], es = ["disabled"], ts = {
  key: 3,
  class: "learning-model-essay"
}, as = /* @__PURE__ */ te({
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
  setup(e, { emit: p }) {
    const s = e, t = p, o = {
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
    }, I = (E) => E.itemId && (E.category === "grammar" || E.category === "vocabulary") ? v[E.category] : null, f = Ee(() => s.unit.id), $ = C(() => f.value.edits), y = C(() => s.unit.stage.stage), w = C(() => new Map(s.unit.materials.flatMap((E) => E.paragraphs).map((E, R) => [E.id, R + 1]))), k = (E) => E?.answer.kind === "text" ? E.answer.text : "", m = C(() => s.unit.stage.exercises.flatMap((E) => {
      const R = s.unit.exercises.find((V) => V.id === E.exerciseId), A = s.unit.attempts.find((V) => V.id === E.draftAttemptId);
      if (!R || !A) return [];
      const P = s.unit.assessments.find((V) => V.attemptId === A.id), T = s.unit.attempts.find((V) => V.id === E.revisionAttemptId), O = T && s.unit.assessments.find((V) => V.attemptId === T.id), G = P?.annotations ?? [];
      return [{
        row: E,
        exercise: R,
        draft: A,
        assessment: P,
        revision: T,
        review: O,
        annotations: G,
        label: R.paragraphId ? `第 ${w.value.get(R.paragraphId) ?? "?"} 段总结` : "作文",
        paragraphs: Et(k(A)).map((V, ke) => ({
          index: ke,
          segments: Hn(V, G.filter((be) => be.paragraphIndex === ke)),
          annotations: G.filter((be) => be.paragraphIndex === ke)
        })),
        resolved: new Set(O?.resolvedAnnotationIds ?? [])
      }];
    }).sort((E, R) => +(R.annotations.length > 0) - +(E.annotations.length > 0))), u = (E) => y.value === "revising" && E.row.status === "revising", x = (E, R) => u(E) && R.severity !== "alternative";
    Z(m, (E) => {
      for (const R of E.flatMap((A) => A.annotations)) $.value[R.id] ??= {
        value: R.quote,
        done: !1
      };
    }, { immediate: !0 });
    function j(E) {
      const R = $.value[E.id];
      R?.value.trim() && R.value !== E.quote && (R.done = !0);
    }
    const N = C(() => new Map(m.value.filter(u).map((E) => [E.draft.id, Fn(k(E.draft), E.annotations.map((R) => ({
      id: R.id,
      paragraphIndex: R.paragraphIndex,
      quote: R.quote,
      replacement: $.value[R.id]?.done ? $.value[R.id].value : R.quote
    })))]))), L = C(() => new Set([...N.value.values()].flatMap((E) => E.missing))), B = C(() => [...N.value.values()].reduce((E, R) => E + R.applied.length, 0)), _ = z("");
    Z(B, () => {
      _.value = "";
    });
    const U = C(() => m.value.filter(u).flatMap((E) => E.annotations.filter((R) => R.severity !== "alternative")).length), D = (E, R) => {
      const A = E.annotations.find((P) => P.id === R);
      return A ? ["learning-mark", `is-${A.severity}`] : "";
    };
    function q() {
      const E = m.value.filter(u).flatMap((R) => {
        const A = N.value.get(R.draft.id);
        return !A || A.text === k(R.draft) ? [] : [{
          attemptId: R.draft.id,
          text: A.text
        }];
      });
      E.length ? t("action", "submit-revision", {
        unitId: s.unit.id,
        revisions: E
      }) : _.value = b.unplaced;
    }
    const W = C(() => s.state.pending?.unitId === s.unit.id ? s.state.pending.purpose : null);
    return (E, R) => (a(), i("section", {
      class: "learning-grading",
      "aria-labelledby": e.view === "feedback" ? "learning-grading-title" : void 0
    }, [
      e.view === "feedback" ? (a(), i(M, { key: 0 }, [
        n("h2", Il, r(b.title), 1),
        y.value === "revising" ? (a(), i("div", Ll, [
          n("small", null, "已改 " + r(B.value) + " / " + r(U.value) + " 处", 1),
          _.value ? (a(), i("small", Sl, r(_.value), 1)) : g("", !0),
          n("button", {
            type: "button",
            disabled: e.disabled,
            onClick: R[0] || (R[0] = (A) => t("confirm", "skip-revision", { unitId: e.unit.id }, "跳过这次修改？批注会保留，直接进入范文。"))
          }, "跳过修改", 8, Al),
          n("button", {
            type: "button",
            class: "learning-primary",
            disabled: e.disabled || !B.value,
            onClick: q
          }, "提交修改", 8, Rl)
        ])) : g("", !0),
        (a(!0), i(M, null, F(m.value, (A) => (a(), i("details", {
          key: A.exercise.id,
          class: "learning-graded",
          open: l(f).expanded[`grading:${A.draft.id}`] ?? A.annotations.length > 0,
          onToggle: (P) => l(f).expanded[`grading:${A.draft.id}`] = P.target.open
        }, [
          n("summary", null, [n("h3", null, r(A.label), 1)]),
          A.revision ? (a(), i("section", El, [
            n("h4", null, r(l(X).revision), 1),
            n("p", Tl, r(k(A.revision)), 1),
            A.review?.guidance ? (a(), i("p", Nl, r(A.review.guidance), 1)) : g("", !0)
          ])) : g("", !0),
          A.assessment?.guidance ? (a(), i("p", Bl, r(A.assessment.guidance), 1)) : g("", !0),
          A.assessment ? (a(), i("button", {
            key: 2,
            type: "button",
            onClick: (P) => t("ask", A.exercise.id)
          }, r(l(ee).askAssessment), 9, Ol)) : g("", !0),
          A.assessment && (A.assessment.understanding || A.assessment.expression) ? (a(), i("details", {
            key: 3,
            class: "learning-graded-more",
            open: l(f).expanded[`feedback:${A.draft.id}`],
            onToggle: (P) => l(f).expanded[`feedback:${A.draft.id}`] = P.target.open
          }, [
            R[6] || (R[6] = n("summary", null, "理解与表达点评", -1)),
            A.assessment.understanding ? (a(), i("p", Pl, [R[4] || (R[4] = n("b", null, "理解", -1)), Y(r(A.assessment.understanding), 1)])) : g("", !0),
            A.assessment.expression ? (a(), i("p", Ul, [R[5] || (R[5] = n("b", null, "表达", -1)), Y(r(A.assessment.expression), 1)])) : g("", !0)
          ], 40, ql)) : g("", !0),
          A.revision ? (a(), i("h4", Vl, r(l(X).original), 1)) : g("", !0),
          (a(!0), i(M, null, F(A.paragraphs, (P) => (a(), i("div", {
            key: P.index,
            class: "learning-graded-paragraph"
          }, [n("p", Dl, [(a(!0), i(M, null, F(P.segments, (T, O) => (a(), i(M, { key: O }, [T.id ? (a(), i("mark", {
            key: 0,
            class: se(D(A, T.id))
          }, r(T.text), 3)) : (a(), i(M, { key: 1 }, [Y(r(T.text), 1)], 64))], 64))), 128))]), (a(!0), i(M, null, F(P.annotations, (T) => (a(), i("div", {
            key: T.id,
            class: se(["learning-annotation", [`is-${T.severity}`, {
              "is-fixed": A.resolved.has(T.id),
              "is-edited": $.value[T.id]?.done && u(A)
            }]])
          }, [A.resolved.has(T.id) ? (a(), i(M, { key: 0 }, [n("p", jl, "✓ " + r(l(X).resolved), 1), n("p", null, r(T.explanation), 1)], 64)) : $.value[T.id]?.done && u(A) ? (a(), i(M, { key: 1 }, [L.value.has(T.id) ? (a(), i("p", Wl, "原文里找不到“" + r(T.quote) + "”，这处改动不会写进修改稿。", 1)) : (a(), i("p", _l, "✓ 改为“" + r($.value[T.id].value) + "”", 1)), n("button", {
            type: "button",
            onClick: (O) => $.value[T.id].done = !1
          }, "再改", 8, Gl)], 64)) : (a(), i(M, { key: 2 }, [
            n("p", Fl, [n("span", null, r(d[T.severity]), 1), Y(r(o[T.category]), 1)]),
            n("p", null, r(T.explanation), 1),
            T.suggestion ? (a(), i("p", Hl, "可以写成：" + r(T.suggestion), 1)) : g("", !0),
            x(A, T) && $.value[T.id] ? (a(), i("form", {
              key: 1,
              class: "learning-annotation-edit",
              onSubmit: de((O) => j(T), ["prevent"])
            }, [ne(n("textarea", {
              "onUpdate:modelValue": (O) => $.value[T.id].value = O,
              rows: "2",
              "aria-label": `改写：${T.quote}`,
              maxlength: "600"
            }, null, 8, Yl), [[ue, $.value[T.id].value], [l(Ke), $.value[T.id]]]), n("button", {
              type: "submit",
              disabled: !$.value[T.id].value.trim() || $.value[T.id].value === T.quote
            }, "改好了", 8, Kl)], 40, zl)) : A.review && T.severity !== "alternative" ? (a(), i("small", Zl, "复核时这里还没改到")) : g("", !0)
          ], 64)), I(T) ? (a(), i("button", {
            key: 3,
            type: "button",
            class: "learning-annotation-book",
            onClick: (O) => t("record", T.itemId)
          }, r(I(T)) + " ↗", 9, Jl)) : g("", !0)], 2))), 128))]))), 128))
        ], 40, Ml))), 128))
      ], 64)) : g("", !0),
      [
        "grading",
        "reviewing",
        "model"
      ].includes(y.value) ? (a(), i("div", Ql, [W.value ? (a(), i(M, { key: 0 }, [
        R[7] || (R[7] = n("span", {
          class: "learning-working-dot",
          "aria-hidden": "true"
        }, null, -1)),
        n("span", null, r(W.value === "grade" ? l(X).grading : W.value === "revision-review" ? l(X).reviewing : l(X).modelling), 1),
        n("button", {
          type: "button",
          disabled: e.pending,
          onClick: R[1] || (R[1] = (A) => t("action", "cancel"))
        }, r(l(X).stop), 9, Xl)
      ], 64)) : (a(), i("button", {
        key: 1,
        type: "button",
        class: "learning-primary",
        disabled: e.disabled,
        onClick: R[2] || (R[2] = (A) => t("action", "grade", { unitId: e.unit.id }))
      }, r(y.value === "grading" ? l(X).grade : l(X).continue), 9, es))])) : g("", !0),
      e.view === "model" && y.value === "complete" ? (a(), J(ea, {
        key: 2,
        state: e.state,
        "unit-id": e.unit.id,
        amount: e.unit.reward.amount,
        label: "本篇完成",
        disabled: e.disabled,
        onAction: R[3] || (R[3] = (A, P) => t("action", A, P))
      }, null, 8, [
        "state",
        "unit-id",
        "amount",
        "disabled"
      ])) : g("", !0),
      e.view === "model" && e.unit.modelEssay ? (a(), i("section", ts, [n("h3", null, [R[8] || (R[8] = Y("范文", -1)), n("small", null, r(e.unit.modelEssay.level), 1)]), (a(!0), i(M, null, F(l(Et)(e.unit.modelEssay.text), (A, P) => (a(), i("p", { key: P }, r(A), 1))), 128))])) : g("", !0)
    ], 8, Cl));
  }
}), ns = as, is = ["data-exercise-id"], ls = { class: "learning-write-label" }, ss = [
  "aria-label",
  "placeholder",
  "rows",
  "onKeydown"
], rs = { class: "learning-write-foot" }, os = { "aria-live": "polite" }, us = ["disabled"], ds = { class: "learning-write-saved" }, vs = { class: "learning-write-foot" }, cs = ["disabled"], gs = /* @__PURE__ */ te({
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
    const s = e, t = p, o = Ee(() => s.unit.id);
    Z([o, () => s.exercise.id], () => {
      o.value.writing[s.exercise.id] ??= {
        text: "",
        rewriting: !1,
        submitted: null
      };
    }, { immediate: !0 });
    const d = C(() => o.value.writing[s.exercise.id]), v = C({
      get: () => d.value.text,
      set: (N) => {
        d.value.text = N;
      }
    }), b = C({
      get: () => d.value.rewriting,
      set: (N) => {
        d.value.rewriting = N;
      }
    }), I = C(() => s.unit.attempts.filter((N) => N.exerciseId === s.exercise.id && N.revisesAttemptId === void 0).at(-1)), f = C(() => s.unit.assessments.some((N) => N.attemptId === I.value?.id && N.verdict !== "disputed")), $ = C(() => I.value?.answer.kind === "text" ? I.value.answer.text : ""), y = C(() => !I.value || b.value), w = C(() => ["writing", "grading"].includes(s.unit.stage.stage) && !f.value && !s.state.pending), k = C(() => At(v.value, s.state.language)), m = C(() => At($.value, s.state.language)), u = C(() => s.state.workbenchConversation.summaryReviews.find((N) => N.attemptId === I.value?.id)?.text ?? "");
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
    function j() {
      v.value = $.value, b.value = !0;
    }
    return (N, L) => (a(), i("div", {
      class: se(["learning-write", `is-${e.tone ?? "summary"}`]),
      "data-exercise-id": e.exercise.id
    }, [
      n("p", ls, r(e.label), 1),
      y.value ? (a(), i("form", {
        key: 0,
        onSubmit: de(x, ["prevent"])
      }, [ne(n("textarea", {
        "onUpdate:modelValue": L[0] || (L[0] = (B) => v.value = B),
        "aria-label": e.label,
        placeholder: e.placeholder,
        maxlength: "4000",
        rows: e.tone === "essay" ? 8 : 3,
        onKeydown: [Oe(de(x, ["ctrl", "prevent"]), ["enter"]), Oe(de(x, ["meta", "prevent"]), ["enter"])]
      }, null, 40, ss), [[ue, v.value], [l(Ke), d.value]]), n("div", rs, [
        n("small", os, r(k.value.count) + " " + r(k.value.unit), 1),
        b.value ? (a(), i("button", {
          key: 0,
          type: "button",
          onClick: L[1] || (L[1] = (B) => {
            b.value = !1, v.value = "";
          })
        }, "取消")) : g("", !0),
        n("button", {
          type: "submit",
          class: "learning-primary",
          disabled: e.disabled || !v.value.trim()
        }, r(I.value ? "保存新稿" : "提交"), 9, us)
      ])], 32)) : I.value ? (a(), i(M, { key: 1 }, [n("p", ds, r($.value), 1), n("div", vs, [n("small", null, "已保存 · " + r(m.value.count) + " " + r(m.value.unit), 1), w.value ? (a(), i("button", {
        key: 0,
        type: "button",
        disabled: e.disabled,
        onClick: j
      }, "重写", 8, cs)) : g("", !0)])], 64)) : g("", !0),
      u.value ? (a(), J(ut, {
        key: 2,
        class: "learning-markdown learning-write-reply",
        text: u.value
      }, null, 8, ["text"])) : g("", !0)
    ], 10, is));
  }
}), ta = gs, le = {
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
}, ps = "用你的话概括这一段", ms = ["data-paragraph-id", "data-material-id"], bs = { class: "learning-reading-text" }, fs = {
  class: "learning-reading-number",
  "aria-hidden": "true"
}, ks = ["data-material-id", "data-paragraph-id"], ys = ["disabled"], hs = ["open"], $s = { key: 0 }, ws = { class: "learning-knowledge-text" }, xs = {
  key: 0,
  class: "learning-terms"
}, Cs = [
  "disabled",
  "aria-pressed",
  "onClick"
], Is = {
  key: 2,
  class: "learning-muted learning-knowledge-pending"
}, Ls = /* @__PURE__ */ te({
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
    const s = e, t = p, o = C(() => s.unit.explanations.find((w) => w.materialId === s.materialId && w.paragraphId === s.paragraph.id)), d = C(() => s.unit.exercises.find((w) => w.paragraphId === s.paragraph.id)), v = C(() => new Set(s.state.savedTerms)), b = (w) => v.value.has(w), I = Ee(() => s.unit.id), f = C(() => `knowledge:${s.materialId}:${s.paragraph.id}`), $ = C(() => I.value.selection?.materialId === s.materialId && I.value.selection.paragraphId === s.paragraph.id ? I.value.selection : null);
    function y() {
      I.value.selection = {
        materialId: s.materialId,
        paragraphId: s.paragraph.id,
        start: 0,
        end: s.paragraph.text.length,
        quote: s.paragraph.text
      };
    }
    return (w, k) => (a(), i("section", {
      class: "learning-reading-paragraph",
      "data-paragraph-id": e.paragraph.id,
      "data-material-id": e.materialId
    }, [
      n("p", bs, [n("span", fs, r(e.number), 1), n("span", {
        "data-learning-text": "",
        "data-material-id": e.materialId,
        "data-paragraph-id": e.paragraph.id
      }, r(e.paragraph.text), 9, ks)]),
      n("button", {
        type: "button",
        class: "learning-paragraph-quote",
        disabled: [...e.paragraph.text].length > l(Vt),
        onClick: y
      }, r(l(Be).select), 9, ys),
      $.value ? (a(), J(zt, {
        key: 0,
        selection: $.value,
        disabled: e.disabled,
        onAsk: k[0] || (k[0] = (m) => t("ask", d.value?.id, $.value)),
        onSay: k[1] || (k[1] = (m) => t("action", "say", { selection: $.value })),
        onDismiss: k[2] || (k[2] = (m) => l(I).selection = null)
      }, null, 8, ["selection", "disabled"])) : g("", !0),
      o.value ? (a(), i("details", {
        key: 1,
        class: "learning-knowledge",
        open: l(I).expanded[f.value],
        onToggle: k[3] || (k[3] = (m) => l(I).expanded[f.value] = m.target.open)
      }, [
        n("summary", null, [k[5] || (k[5] = Y("本段知识", -1)), o.value.terms.length ? (a(), i("span", $s, " · " + r(o.value.terms.length) + " 个词语", 1)) : g("", !0)]),
        n("p", ws, r(o.value.explanation), 1),
        o.value.terms.length ? (a(), i("ul", xs, [(a(!0), i(M, null, F(o.value.terms, (m) => (a(), i("li", { key: m.text }, [n("span", null, [n("strong", null, r(m.text), 1), n("small", null, r(m.note), 1)]), n("button", {
          type: "button",
          disabled: e.disabled || b(m.text),
          "aria-pressed": b(m.text),
          onClick: (u) => t("action", "bookmark", {
            unitId: e.unit.id,
            materialId: e.materialId,
            paragraphId: e.paragraph.id,
            termText: m.text
          })
        }, r(b(m.text) ? "已收藏" : "收藏"), 9, Cs)]))), 128))])) : g("", !0)
      ], 40, hs)) : (a(), i("p", Is, r(e.state.preparation?.running ? l(le).notes : l(le).missingNotes), 1)),
      d.value ? (a(), J(ta, {
        key: 3,
        state: e.state,
        unit: e.unit,
        exercise: d.value,
        disabled: e.disabled,
        label: l(ps),
        placeholder: "写下这段的大意，不必逐句翻译",
        onAction: k[4] || (k[4] = (m, u) => t("action", m, u))
      }, null, 8, [
        "state",
        "unit",
        "exercise",
        "disabled",
        "label"
      ])) : g("", !0)
    ], 8, ms));
  }
}), Ss = Ls, As = /* @__PURE__ */ new Set([
  "language",
  "teacher",
  "forget-conversation",
  "resume",
  "rate",
  "seek",
  "verify-teacher",
  "adopt-teacher"
]), Rs = /* @__PURE__ */ new Set([
  "submit",
  "bookmark",
  "say",
  "play",
  "save-note",
  "delete-note"
]), aa = /* @__PURE__ */ new Set([
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
]), Ms = /* @__PURE__ */ new Set([
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
function ot(e, p) {
  return aa.has(e) ? !1 : e === "talk" ? p.chatBusy : e === "workbench-talk" ? p.workbenchBusy : As.has(e) ? p.busy || p.chatBusy || p.workbenchBusy || !!p.preparation?.running : p.busy || !!p.preparation?.running && !Rs.has(e);
}
function he(e, p) {
  return e === "talk" || e === "workbench-talk" ? !ot(e, p) && (e === "talk" ? p.chatStorage : p.workbenchStorage) === "ready" : !ot(e, p) && (aa.has(e) || Ms.has(e) || (e === "teacher" ? p.chatStorage === "ready" : p.storage === "ready"));
}
var Es = ["aria-label"], Ts = [
  "aria-current",
  "disabled",
  "onClick"
], Ns = { class: "learning-reading-head" }, Bs = ["open"], Os = { key: 0 }, qs = { class: "learning-source" }, Ps = ["href"], Us = {
  key: 0,
  class: "learning-essay"
}, Vs = { class: "learning-essay-prompt" }, Ds = {
  key: 1,
  class: "learning-essay"
}, js = { class: "learning-muted" }, Ws = ["aria-label"], _s = ["aria-current"], Gs = {
  key: 2,
  class: "learning-stage-bar is-writing"
}, Fs = {
  key: 1,
  class: "learning-muted"
}, Hs = {
  key: 3,
  class: "learning-stage-bar"
}, zs = ["disabled"], Ys = ["disabled"], Ks = /* @__PURE__ */ te({
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
  setup(e, { emit: p }) {
    const s = e, t = p, o = z(null), d = Ee(() => s.unit.id);
    Dt(o, () => s.unit.materials, (N) => {
      d.value.selection = N;
    });
    const v = C(() => s.unit.stage.stage), b = C(() => {
      if (v.value === "writing") return "reading";
      const N = d.value.reading.view;
      return N === "model" && ![
        "reviewing",
        "model",
        "complete"
      ].includes(v.value) ? "feedback" : N ?? (v.value === "complete" ? "model" : v.value === "grading" ? "reading" : "feedback");
    }), I = [
      "reading",
      "feedback",
      "model"
    ];
    async function f(N) {
      const L = o.value?.closest(".learning-scroll");
      L && (d.value.reading.scrolls[b.value] = L.scrollTop), d.value.reading.view = N, await re(), L && (L.scrollTop = d.value.reading.scrolls[N] ?? 0);
    }
    const $ = [
      ["writing", "阅读与写作"],
      ["grading", "统一批改"],
      ["revising", "修改"],
      ["model", "范文"],
      ["complete", "完成"]
    ], y = C(() => ({
      writing: 0,
      grading: 1,
      revising: 2,
      reviewing: 3,
      model: 3,
      complete: 4
    })[v.value] ?? 0), w = C(() => s.unit.exercises.find((N) => !N.paragraphId)), k = C(() => s.unit.stage.exercises.filter((N) => N.status === "writing").map((N) => N.exerciseId)), m = {
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
    }, u = C(() => {
      let N = 0;
      return s.unit.materials.map((L) => ({
        material: L,
        paragraphs: L.paragraphs.map((B) => ({
          paragraph: B,
          number: ++N
        }))
      }));
    }), x = (N, L) => t("action", N, L);
    function j(N) {
      const L = o.value?.querySelector(`[data-exercise-id="${CSS.escape(N)}"]`);
      L?.scrollIntoView({
        block: "center",
        behavior: matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth"
      }), L?.querySelector("textarea, button")?.focus({ preventScroll: !0 });
    }
    return (N, L) => (a(), i("article", {
      ref_key: "root",
      ref: o,
      class: "learning-reading"
    }, [
      v.value !== "writing" ? (a(), i("nav", {
        key: 0,
        class: "learning-reading-nav",
        "aria-label": l(X).navigation
      }, [(a(), i(M, null, F(I, (B) => n("button", {
        key: B,
        type: "button",
        "aria-current": b.value === B ? "page" : void 0,
        disabled: B === "model" && ![
          "reviewing",
          "model",
          "complete"
        ].includes(v.value),
        onClick: (_) => f(B)
      }, r(l(X)[B]), 9, Ts)), 64))], 8, Es)) : g("", !0),
      b.value === "reading" ? (a(), i(M, { key: 1 }, [
        n("header", Ns, [n("details", {
          class: "learning-reading-goal",
          open: l(d).expanded.goal,
          onToggle: L[0] || (L[0] = (B) => l(d).expanded.goal = B.target.open)
        }, [
          n("summary", null, r(m.goal), 1),
          n("strong", null, r(e.unit.title), 1),
          e.unit.goal ? (a(), i("p", Os, r(e.unit.goal), 1)) : g("", !0)
        ], 40, Bs), H(Xt, { name: e.state.teacher?.name }, null, 8, ["name"])]),
        (a(!0), i(M, null, F(u.value, (B, _) => (a(), i("section", {
          key: B.material.id,
          class: "learning-reading-material"
        }, [
          (a(), J(ma(_ === 0 ? "h1" : "h2"), { tabindex: "-1" }, {
            default: oa(() => [Y(r(B.material.title), 1)]),
            _: 2
          }, 1024)),
          n("p", qs, [B.material.provenance.kind === "authored" ? (a(), i(M, { key: 0 }, [Y(r(m.authored), 1)], 64)) : (a(), i(M, { key: 1 }, [Y(r(B.material.provenance.kind === "adapted" ? m.adapted : m.original) + " ", 1), n("a", {
            href: B.material.provenance.url,
            target: "_blank",
            rel: "noopener noreferrer"
          }, r(B.material.provenance.title), 9, Ps)], 64))]),
          (a(!0), i(M, null, F(B.paragraphs, (U) => (a(), J(Ss, {
            key: U.paragraph.id,
            state: e.state,
            unit: e.unit,
            "material-id": B.material.id,
            paragraph: U.paragraph,
            number: U.number,
            disabled: e.disabled,
            onAction: x,
            onAsk: L[1] || (L[1] = (D, q) => t("ask", D, q))
          }, null, 8, [
            "state",
            "unit",
            "material-id",
            "paragraph",
            "number",
            "disabled"
          ]))), 128))
        ]))), 128)),
        w.value ? (a(), i("section", Us, [
          n("h2", null, r(m.essay), 1),
          n("p", Vs, r(w.value.prompt), 1),
          H(ta, {
            state: e.state,
            unit: e.unit,
            exercise: w.value,
            disabled: e.disabled,
            label: m.essayLabel,
            placeholder: m.essayPlaceholder,
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
        ])) : (a(), i("section", Ds, [n("h2", null, r(m.essay), 1), n("p", js, r(e.state.preparation?.running ? l(le).essay : l(le).missingEssay), 1)])),
        n("ol", {
          class: "learning-steps",
          "aria-label": m.progress
        }, [(a(), i(M, null, F($, ([B, _], U) => n("li", {
          key: B,
          class: se({
            "is-done": U < y.value,
            "is-current": U === y.value
          }),
          "aria-current": U === y.value ? "step" : void 0
        }, r(_), 11, _s)), 64))], 8, Ws),
        v.value === "writing" ? (a(), i("div", Gs, [n("span", null, r(m.written) + " " + r(e.unit.stage.exercises.length - k.value.length) + " / " + r(e.unit.stage.exercises.length), 1), k.value.length ? (a(), i("button", {
          key: 0,
          type: "button",
          onClick: L[2] || (L[2] = (B) => j(k.value[0]))
        }, r(m.next), 1)) : (a(), i("span", Fs, r(e.unit.preparation.essay ? l(le).missingNotes : l(le).missingEssay), 1))])) : v.value === "grading" ? (a(), i("div", Hs, [e.state.pending?.purpose === "grade" ? (a(), i(M, { key: 0 }, [
          L[10] || (L[10] = n("span", {
            class: "learning-working-dot",
            "aria-hidden": "true"
          }, null, -1)),
          n("span", null, r(l(X).grading), 1),
          n("button", {
            type: "button",
            disabled: e.pending,
            onClick: L[3] || (L[3] = (B) => t("action", "cancel"))
          }, r(l(X).stop), 9, zs)
        ], 64)) : (a(), i(M, { key: 1 }, [n("span", null, r(l(X).gradeReady), 1), n("button", {
          type: "button",
          class: "learning-primary",
          disabled: e.disabled || !l(he)("grade", e.state),
          onClick: L[4] || (L[4] = (B) => t("action", "grade", { unitId: e.unit.id }))
        }, r(l(X).grade), 9, Ys)], 64))])) : (a(), i("button", {
          key: 4,
          type: "button",
          class: "learning-primary",
          onClick: L[5] || (L[5] = (B) => f("feedback"))
        }, r(l(X).feedback), 1))
      ], 64)) : (a(), J(ns, {
        key: 2,
        view: b.value,
        state: e.state,
        unit: e.unit,
        disabled: e.disabled || !l(he)("grade", e.state),
        pending: e.pending,
        onAsk: L[6] || (L[6] = (B) => t("assistant", B)),
        onAction: x,
        onConfirm: L[7] || (L[7] = (B, _, U) => t("confirm", B, _, U)),
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
        onClick: L[9] || (L[9] = (B) => f("model"))
      }, r(l(X).viewModel), 1)) : g("", !0)
    ], 512));
  }
}), Zs = Ks, Js = ["data-learning-unit-id", "data-exercise-id"], Qs = { class: "learning-review-head" }, Xs = { class: "learning-muted" }, er = ["disabled"], tr = {
  class: "learning-review-dots",
  "aria-label": "复习卡片"
}, ar = [
  "aria-label",
  "aria-current",
  "onClick"
], nr = { class: "learning-eyebrow" }, ir = { class: "learning-card-verdict" }, lr = { key: 0 }, sr = { key: 1 }, rr = { key: 2 }, or = { key: 1 }, ur = ["disabled"], dr = {
  key: 1,
  class: "learning-working",
  role: "status"
}, vr = ["disabled"], cr = ["disabled"], gr = ["disabled"], pr = {
  key: 2,
  class: "learning-row"
}, mr = { class: "learning-review-results" }, br = ["aria-current", "onClick"], fr = ["aria-expanded", "onClick"], kr = {
  key: 1,
  class: "learning-chip-reason"
}, yr = /* @__PURE__ */ te({
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
  setup(e, { emit: p }) {
    const s = e, t = p, o = Le.verdicts, d = C(() => s.review.stage.stage), v = (A) => s.review.attempts.filter((P) => P.exerciseId === A).at(-1), b = () => Math.max(0, s.review.exercises.findIndex((A) => !v(A.id))), I = Ee(() => s.review.id), f = C(() => I.value.review), $ = C({
      get: () => f.value.index ?? b(),
      set: (A) => {
        f.value.index = A;
      }
    }), y = C(() => s.review.exercises[$.value]), w = C(() => y.value && v(y.value.id)), k = C(() => s.review.assessments.find((A) => A.attemptId === w.value?.id)), m = C(() => s.review.materials.flatMap((A) => A.paragraphs)), u = C(() => f.value.drafts);
    Z(y, (A) => {
      A && !u.value[A.id] && (u.value[A.id] = He(A.response));
    }, { immediate: !0 });
    const x = C({
      get: () => u.value[y.value.id],
      set: (A) => {
        u.value[y.value.id] = A;
      }
    }), j = C(() => s.review.exercises.filter((A) => v(A.id)).length), N = C({
      get: () => f.value.openReason,
      set: (A) => {
        f.value.openReason = A;
      }
    });
    function L(A) {
      t("action", "submit", {
        unitId: s.review.id,
        exerciseId: y.value.id,
        answer: A
      });
    }
    function B() {
      const A = s.review.exercises.findIndex((P) => !v(P.id));
      A >= 0 && ($.value = A);
    }
    function _(A) {
      $.value = A, W.value = !0;
    }
    const U = C(() => s.state.completions.find((A) => A.unitId === s.review.id)), D = C(() => U.value?.rewardStatus === "paid" || U.value?.rewardStatus === "retired");
    Z(f, (A) => {
      A.seenBefore ??= d.value === "complete" && Rt.has(s.review.id);
    }, { immediate: !0 });
    const q = C(() => f.value.seenBefore ?? !1), W = C({
      get: () => f.value.expanded,
      set: (A) => {
        f.value.expanded = A;
      }
    });
    Z([d, () => s.review.id], ([A, P]) => {
      A === "complete" && Rt.mark(P);
    }, { immediate: !0 });
    const E = C(() => q.value && D.value && !W.value), R = (A) => [...s.state.books.grammar, ...s.state.books.vocabulary].find((P) => P.id === A);
    return (A, P) => (a(), i("section", {
      class: "learning-review",
      "data-learning-unit-id": e.review.id,
      "data-exercise-id": y.value?.id,
      "aria-labelledby": "learning-review-title"
    }, [
      n("header", Qs, [
        P[8] || (P[8] = n("h2", { id: "learning-review-title" }, "今日复习", -1)),
        n("span", Xs, r(j.value) + " / " + r(e.review.exercises.length), 1),
        d.value === "answering" ? (a(), i("button", {
          key: 0,
          type: "button",
          disabled: e.disabled || !l(he)("abandon-review", e.state),
          onClick: P[0] || (P[0] = (T) => t("confirm", "abandon-review", {}, l(ye).review))
        }, "放下", 8, er)) : g("", !0)
      ]),
      n("nav", tr, [(a(!0), i(M, null, F(e.review.exercises, (T, O) => (a(), i("button", {
        key: T.id,
        type: "button",
        "aria-label": `第 ${O + 1} 张`,
        "aria-current": O === $.value,
        class: se({ "is-answered": !!v(T.id) }),
        onClick: (G) => _(O)
      }, null, 10, ar))), 128))]),
      y.value && !E.value ? (a(), i("div", {
        key: `${y.value.id}:${w.value ? "back" : "front"}`,
        class: se(["learning-card", { "is-back": !!w.value }])
      }, [
        n("p", nr, r(w.value ? l(Le).answer : `第 ${$.value + 1} 张`), 1),
        n("h3", null, r(y.value.prompt), 1),
        w.value ? (a(), i(M, { key: 1 }, [
          n("blockquote", null, r(l(dt)(w.value.answer, y.value.response, m.value)), 1),
          k.value ? (a(), i(M, { key: 0 }, [
            n("p", ir, r(l(o)[k.value.verdict]), 1),
            k.value.understanding ? (a(), i("p", lr, r(k.value.understanding), 1)) : g("", !0),
            k.value.expression ? (a(), i("p", sr, r(k.value.expression), 1)) : g("", !0),
            k.value.guidance ? (a(), i("p", rr, r(k.value.guidance), 1)) : g("", !0)
          ], 64)) : (a(), i("small", or, r(l(Le).saved), 1)),
          j.value < e.review.exercises.length ? (a(), i("button", {
            key: 2,
            type: "button",
            class: "learning-primary",
            onClick: B
          }, "下一张")) : g("", !0)
        ], 64)) : (a(), J(Ut, {
          key: 0,
          modelValue: x.value,
          "onUpdate:modelValue": P[1] || (P[1] = (T) => x.value = T),
          response: y.value.response,
          paragraphs: m.value,
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
          disabled: e.pending || !l(he)("talk", e.state),
          onClick: P[2] || (P[2] = (T) => t("ask", y.value.id, e.review.id))
        }, r(l(Le).ask), 9, ur)
      ], 2)) : g("", !0),
      d.value === "grading" ? (a(), i("div", dr, [e.state.pending?.purpose === "review-assess" ? (a(), i(M, { key: 0 }, [
        P[9] || (P[9] = n("span", {
          class: "learning-working-dot",
          "aria-hidden": "true"
        }, null, -1)),
        P[10] || (P[10] = n("span", null, "正在批改这组复习…", -1)),
        n("button", {
          type: "button",
          disabled: e.pending,
          onClick: P[3] || (P[3] = (T) => t("action", "cancel"))
        }, "停止", 8, vr)
      ], 64)) : (a(), i(M, { key: 1 }, [
        n("span", null, r(l(Le).ready), 1),
        n("button", {
          type: "button",
          disabled: e.disabled || !l(he)("abandon-review", e.state),
          onClick: P[4] || (P[4] = (T) => t("confirm", "abandon-review", {}, l(ye).review))
        }, "放下", 8, cr),
        n("button", {
          type: "button",
          disabled: e.disabled || !l(he)("grade", e.state),
          onClick: P[5] || (P[5] = (T) => t("action", "grade", { unitId: e.review.id }))
        }, r(l(Le).grade), 9, gr)
      ], 64))])) : g("", !0),
      d.value === "complete" && E.value ? (a(), i("div", pr, [P[11] || (P[11] = n("span", { class: "learning-muted" }, "这组复习已完成", -1)), n("button", {
        type: "button",
        "aria-expanded": !1,
        onClick: P[6] || (P[6] = (T) => W.value = !0)
      }, "查看结果")])) : d.value === "complete" ? (a(), i(M, { key: 3 }, [n("ul", mr, [(a(!0), i(M, null, F(e.review.exercises, (T, O) => (a(), i("li", { key: T.id }, [
        n("button", {
          type: "button",
          class: "learning-review-result",
          "aria-current": O === $.value,
          onClick: (G) => _(O)
        }, [n("strong", null, r(R(T.itemId)?.label ?? T.prompt), 1), n("small", null, r(l(o)[e.review.assessments.find((G) => G.attemptId === v(T.id)?.id)?.verdict ?? "disputed"]), 1)], 8, br),
        R(T.itemId)?.nextReviewAt ? (a(), i("button", {
          key: 0,
          type: "button",
          class: "learning-chip",
          "aria-expanded": N.value === T.id,
          onClick: (G) => N.value = N.value === T.id ? "" : T.id
        }, r(l(vt)(R(T.itemId).nextReviewAt)), 9, fr)) : g("", !0),
        N.value === T.id ? (a(), i("small", kr, r(R(T.itemId)?.scheduleReason), 1)) : g("", !0)
      ]))), 128))]), H(ea, {
        state: e.state,
        "unit-id": e.review.id,
        amount: e.review.reward.amount,
        label: "复习完成",
        disabled: e.disabled,
        quiet: q.value,
        onAction: P[7] || (P[7] = (T, O) => t("action", T, O))
      }, null, 8, [
        "state",
        "unit-id",
        "amount",
        "disabled",
        "quiet"
      ])], 64)) : g("", !0)
    ], 8, Js));
  }
}), hr = yr, $r = {
  key: 0,
  class: "learning-source-choice",
  "aria-live": "polite"
}, wr = { class: "learning-row" }, xr = ["disabled"], Cr = ["disabled"], Ir = ["disabled"], Lr = ["disabled"], Sr = ["disabled"], Ar = {
  key: 1,
  class: "learning-preparation",
  "aria-live": "polite"
}, Rr = {
  key: 0,
  class: "learning-turn-notice"
}, Mr = { class: "learning-row" }, Er = ["disabled"], Tr = /* @__PURE__ */ te({
  __name: "LearningPreparation",
  props: {
    state: {},
    disabled: { type: Boolean },
    pending: { type: Boolean }
  },
  emits: ["action"],
  setup(e, { emit: p }) {
    const s = p;
    return (t, o) => e.state.sourceChoice ? (a(), i("section", $r, [
      n("p", null, r(e.state.sourceChoice === "unconfigured" ? l(le).noWeb : e.state.preparation?.message || l(le).unavailable), 1),
      n("div", wr, [
        e.state.sourceChoice === "unavailable" ? (a(), i("button", {
          key: 0,
          type: "button",
          class: "learning-primary",
          disabled: e.disabled,
          onClick: o[0] || (o[0] = (d) => s("action", "retry-source"))
        }, r(l(le).retry), 9, xr)) : (a(), i("button", {
          key: 1,
          type: "button",
          class: "learning-primary",
          disabled: e.pending,
          onClick: o[1] || (o[1] = (d) => s("action", "research-settings"))
        }, r(l(le).settings), 9, Cr)),
        n("button", {
          type: "button",
          disabled: e.disabled,
          onClick: o[2] || (o[2] = (d) => s("action", "choose-original"))
        }, r(l(le).original), 9, Ir),
        n("button", {
          type: "button",
          disabled: e.pending,
          onClick: o[3] || (o[3] = (d) => s("action", "dismiss-source"))
        }, r(e.state.unit ? l(le).existing : l(le).dismiss), 9, Lr)
      ]),
      e.state.sourceChoice === "unavailable" ? (a(), i("button", {
        key: 0,
        type: "button",
        disabled: e.pending,
        onClick: o[4] || (o[4] = (d) => s("action", "research-settings"))
      }, r(l(le).settings), 9, Sr)) : g("", !0)
    ])) : !e.state.preparation?.running && (e.state.preparation || e.state.unit?.kind === "reading-writing" && !e.state.unit.preparation.ready) ? (a(), i("section", Ar, [e.state.preparation?.message ? (a(), i("p", Rr, r(e.state.preparation.message), 1)) : g("", !0), n("div", Mr, [e.state.unit?.kind === "reading-writing" && !e.state.unit.preparation.ready ? (a(), i("button", {
      key: 0,
      type: "button",
      disabled: e.disabled,
      onClick: o[5] || (o[5] = (d) => s("action", "resume-preparation", { unitId: e.state.unit.id }))
    }, r(l(le).resume), 9, Er)) : g("", !0)])])) : g("", !0);
  }
}), Tt = Tr, Nr = { class: "learning-workbench" }, Br = {
  key: 1,
  class: "learning-due"
}, Or = {
  key: 0,
  class: "learning-working",
  role: "status"
}, qr = ["disabled"], Pr = ["disabled"], Ur = {
  key: 2,
  class: "learning-row"
}, Vr = ["disabled"], Dr = ["data-learning-unit-id"], jr = { class: "learning-eyebrow" }, Wr = { tabindex: "-1" }, _r = {
  key: 0,
  class: "learning-muted"
}, Gr = ["onClick"], Fr = ["onClick"], Hr = { class: "learning-row" }, zr = ["disabled"], Yr = {
  key: 6,
  class: "learning-start"
}, Kr = ["disabled"], Zr = {
  key: 0,
  tabindex: "-1"
}, Jr = { key: 1 }, Qr = ["aria-label"], Xr = { class: "learning-start-reading" }, eo = ["disabled"], to = ["disabled"], ao = /* @__PURE__ */ te({
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
    "assistant",
    "record"
  ],
  setup(e, { emit: p }) {
    const s = e, t = (m) => s.disabled || !he(m, s.state), o = p, d = C(() => !!s.state.review && s.state.review.stage.stage !== "complete"), v = C(() => s.state.unit), b = C(() => !v.value || s.state.completions.some((m) => m.unitId === v.value?.id)), I = C(() => s.state.busy && !s.state.pending), f = {
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
    }, $ = C(() => [
      new Intl.DisplayNames(["zh-CN"], { type: "language" }).of(s.state.language),
      s.state.profile?.settings.exam,
      [s.state.profile?.settings.level, s.state.profile?.settings.targetLevel].filter(Boolean).join(" → ")
    ].filter(Boolean).join(" · "));
    function y(m) {
      o("action", "prepare", {
        kind: m,
        message: m === "reading-writing" ? "请按我的训练设置准备一篇读写训练。" : "请按我现在的情况准备一节专项小课。"
      });
    }
    const w = (m, u) => o("action", m, u), k = (m, u, x) => o("confirm", m, u, x);
    return (m, u) => (a(), i("div", Nr, [
      !e.state.sourceChoice || !b.value ? (a(), J(Tt, {
        key: 0,
        state: e.state,
        disabled: e.disabled,
        pending: e.pending,
        onAction: w
      }, null, 8, [
        "state",
        "disabled",
        "pending"
      ])) : g("", !0),
      e.state.dueCount && !d.value ? (a(), i("div", Br, [n("span", null, r(l(Ft)(e.state.dueCount)), 1), e.state.pending?.purpose === "review-prepare" ? (a(), i("span", Or, [
        u[13] || (u[13] = n("span", {
          class: "learning-working-dot",
          "aria-hidden": "true"
        }, null, -1)),
        u[14] || (u[14] = n("span", null, "正在出题…", -1)),
        n("button", {
          type: "button",
          disabled: e.pending,
          onClick: u[0] || (u[0] = (x) => o("action", "cancel"))
        }, "停止", 8, qr)
      ])) : e.state.blockedReview ? g("", !0) : (a(), i("button", {
        key: 1,
        type: "button",
        class: "learning-primary",
        disabled: t("start-review"),
        onClick: u[1] || (u[1] = (x) => o("action", "start-review"))
      }, r(f.review), 9, Pr))])) : g("", !0),
      e.state.blockedReview ? (a(), i("div", Ur, [u[15] || (u[15] = n("p", { class: "learning-muted" }, "有一组复习在另一个故事中进行。回到那个故事可以接着做；也可以放下它，在这里重新出题。", -1)), n("button", {
        type: "button",
        disabled: t("abandon-review"),
        onClick: u[2] || (u[2] = (x) => k("abandon-review", {}, l(ye).review))
      }, "放下", 8, Vr)])) : g("", !0),
      e.state.review ? (a(), J(hr, {
        key: 3,
        state: e.state,
        review: e.state.review,
        disabled: e.disabled,
        pending: e.pending,
        onAction: w,
        onConfirm: k,
        onAsk: u[3] || (u[3] = (x, j) => o("ask", x, void 0, j))
      }, null, 8, [
        "state",
        "review",
        "disabled",
        "pending"
      ])) : g("", !0),
      v.value?.kind === "reading-writing" ? (a(), J(Zs, {
        key: 4,
        "data-learning-unit-id": v.value.id,
        state: e.state,
        unit: v.value,
        disabled: e.disabled,
        pending: e.pending,
        onAction: w,
        onConfirm: k,
        onAsk: u[4] || (u[4] = (x, j) => o("ask", x, j, v.value.id)),
        onAssistant: u[5] || (u[5] = (x) => o("assistant", x, v.value.id)),
        onRecord: u[6] || (u[6] = (x) => o("record", x))
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
        n("p", jr, "专项小课 · 完成可得 " + r(v.value.reward.amount) + " 小白币", 1),
        n("h1", Wr, r(v.value.title), 1),
        v.value.goal ? (a(), i("p", _r, r(v.value.goal), 1)) : g("", !0),
        (a(!0), i(M, null, F(v.value.materials, (x) => (a(), i("button", {
          key: x.id,
          type: "button",
          class: "learning-activity-link",
          onClick: (j) => o("present", {
            unitId: v.value.id,
            kind: "material",
            id: x.id,
            title: x.title
          })
        }, [
          H(K, { name: "book" }),
          n("span", null, r(x.title), 1),
          H(K, { name: "arrow" })
        ], 8, Gr))), 128)),
        (a(!0), i(M, null, F(v.value.exercises, (x) => (a(), i("button", {
          key: x.id,
          type: "button",
          class: "learning-activity-link",
          onClick: (j) => o("present", {
            unitId: v.value.id,
            kind: "exercise",
            id: x.id,
            title: x.prompt
          })
        }, [
          H(K, { name: v.value.stage.exercises.find((j) => j.exerciseId === x.id)?.status === "done" ? "check" : "records" }, null, 8, ["name"]),
          n("span", null, r(x.prompt), 1),
          H(K, { name: "arrow" })
        ], 8, Fr))), 128)),
        n("div", Hr, [n("button", {
          type: "button",
          disabled: t("complete"),
          onClick: u[7] || (u[7] = (x) => o("action", "complete"))
        }, r(f.complete), 9, zr), n("button", {
          type: "button",
          onClick: u[8] || (u[8] = (x) => o("go", "materials"))
        }, r(f.notes), 1)])
      ], 8, Dr)) : g("", !0),
      b.value ? (a(), i("section", Yr, [e.state.blockedUnit ? (a(), i(M, { key: 0 }, [
        u[16] || (u[16] = n("h1", { tabindex: "-1" }, "当前课件在另一个故事中", -1)),
        u[17] || (u[17] = n("p", { class: "learning-muted" }, "回到那个故事可以继续；也可以放下它，在这里重新开始。", -1)),
        n("button", {
          type: "button",
          disabled: t("abandon"),
          onClick: u[9] || (u[9] = (x) => k("abandon", {}, l(ye).lesson))
        }, "放下并重新开始", 8, Kr)
      ], 64)) : (a(), i(M, { key: 1 }, [
        v.value ? (a(), i("h2", Jr, r(f.next), 1)) : (a(), i("h1", Zr, r(f.reading), 1)),
        v.value ? g("", !0) : (a(), i("button", {
          key: 2,
          type: "button",
          class: "learning-start-preference",
          "aria-label": `${f.settings}：${$.value}`,
          onClick: u[10] || (u[10] = (x) => o("go", "settings"))
        }, [n("span", null, [n("strong", null, r(f.settings), 1), n("small", null, r($.value), 1)]), H(K, { name: "arrow" })], 8, Qr)),
        e.state.sourceChoice ? (a(), J(Tt, {
          key: 3,
          state: e.state,
          disabled: e.disabled,
          pending: e.pending,
          onAction: w
        }, null, 8, [
          "state",
          "disabled",
          "pending"
        ])) : g("", !0),
        !I.value && !e.state.sourceChoice ? (a(), i(M, { key: 4 }, [n("section", Xr, [
          H(K, { name: "workbook" }),
          n("p", null, r(f.readingHint), 1),
          n("button", {
            type: "button",
            class: "learning-primary",
            disabled: t("prepare"),
            onClick: u[11] || (u[11] = (x) => y("reading-writing"))
          }, [Y(r(f.start), 1), H(K, { name: "arrow" })], 8, eo)
        ]), n("button", {
          type: "button",
          class: "learning-start-secondary",
          disabled: t("prepare"),
          onClick: u[12] || (u[12] = (x) => y("lesson"))
        }, [
          H(K, { name: "records" }),
          n("span", null, [n("strong", null, r(f.lesson), 1), n("small", null, r(f.lessonHint), 1)]),
          H(K, { name: "arrow" })
        ], 8, to)], 64)) : g("", !0)
      ], 64))])) : g("", !0)
    ]));
  }
}), no = ao;
function Nt(e) {
  try {
    return JSON.parse(e);
  } catch {
    return {};
  }
}
function io(e) {
  const p = [];
  for (const s of e.messages) s.role === "assistant" ? p.push({
    message: s,
    results: []
  }) : s.role === "tool" && p.at(-1)?.results.push(s);
  return p.map(({ message: s, results: t }, o) => ({
    index: o + 1,
    text: s.toolCalls?.length ? s.content : "",
    receivedChars: s.receivedChars,
    thinking: s.hasReasoning,
    streaming: !!s.streaming,
    tools: (s.toolCalls ?? []).map((d) => {
      const v = t.find(($) => $.toolCallId === d.id), b = Nt(v?.content ?? ""), I = e.status === "running", f = v?.error || b.ok === !1 ? "failed" : v?.content && !v.streaming ? "done" : !I || s.error ? "cancelled" : v?.streaming ? "running" : "preparing";
      return {
        id: d.id,
        name: d.name,
        status: f,
        input: Nt(d.arguments),
        result: b
      };
    })
  }));
}
var lo = ["aria-label"], so = { class: "learning-process-header" }, ro = ["aria-expanded"], oo = { "aria-hidden": "true" }, uo = ["disabled", "aria-label"], vo = ["aria-label"], co = ["data-status"], go = {
  class: "learning-process-dot",
  "aria-hidden": "true"
}, po = { key: 0 }, mo = { class: "learning-process-result" }, bo = {
  key: 1,
  class: "learning-process-status",
  role: "status",
  "aria-live": "polite"
}, fo = {
  key: 0,
  class: "learning-working-dot",
  "aria-hidden": "true"
}, ko = /* @__PURE__ */ te({
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
    const s = e, t = p, o = C(() => io(s.turn)), d = C(() => o.value.flatMap((m) => m.tools)), v = C(() => s.turn.status === "running"), b = C(() => le.taskTitles[s.turn.purpose]), I = z(null), f = C(() => I.value ?? (v.value || s.turn.status === "failed")), $ = z(null), y = C(() => s.turn.progress?.round ?? o.value.at(-1)?.index), w = C(() => {
      if (!v.value) return Q.outcomes[s.turn.status];
      const m = o.value.at(-1), u = m?.tools.find((x) => x.status === "running" || x.status === "preparing");
      if (u) return `${Q.tools[u.name] ?? Q.title} · ${Q[u.status]}`;
      if (s.turn.progress?.stage === "provider" && m?.streaming) {
        if (m.receivedChars) return Q.received(m.receivedChars);
        if (m.thinking) return Q.thinking;
      }
      return fl(s.turn.progress ?? { stage: "provider" });
    });
    function k(m) {
      const u = [], x = m.result.section ?? m.input.section;
      x && Q.sections[x] && u.push(Q.sections[x]), m.result.resultsCount !== void 0 && u.push(Q.results(m.result.resultsCount)), m.result.paragraphCount !== void 0 && u.push(Q.paragraphs(m.result.paragraphCount)), m.result.dataCount !== void 0 && u.push(Q.entries(m.result.dataCount)), m.result.failedCount && u.push(Q.sourcesFailed(m.result.failedCount)), m.name === "LearningLessonEdit" && (m.input.materialsCount && u.push(Q.proposedMaterials(m.input.materialsCount)), m.input.exercisesCount && u.push(Q.proposedExercises(m.input.exercisesCount))), m.result.errorsCount && u.push(Q.issues(m.result.errorsCount));
      const j = (m.result.errorFields ?? []).map((N) => dn[N]).filter(Boolean);
      return j.length && u.push(Q.checkFields([...new Set(j)].join("、"))), u.join(" · ");
    }
    return Z(v, () => {
      I.value = null;
    }), Z(() => s.turn.messages, async () => {
      const m = $.value, u = !m || m.scrollHeight - m.scrollTop - m.clientHeight < 48;
      await re(), u && $.value && ($.value.scrollTop = $.value.scrollHeight);
    }), (m, u) => v.value || d.value.length ? (a(), i("section", {
      key: 0,
      class: se(["learning-process", { "is-running": v.value }]),
      "aria-label": l(Q).title
    }, [
      n("header", so, [n("button", {
        type: "button",
        class: "learning-process-toggle",
        "aria-expanded": f.value,
        onClick: u[0] || (u[0] = (x) => I.value = !f.value)
      }, [
        n("span", oo, r(f.value ? "⌄" : "›"), 1),
        n("strong", null, r(b.value ?? l(Q).title), 1),
        n("small", null, r(v.value && y.value ? l(Q).round(y.value) : l(Q).history(d.value.length)), 1)
      ], 8, ro), v.value && e.stoppable ? (a(), i("button", {
        key: 0,
        type: "button",
        class: "learning-process-stop",
        disabled: e.disabled,
        "aria-label": l(Q).stop,
        onClick: u[1] || (u[1] = (x) => t("stop"))
      }, "■", 8, uo)) : g("", !0)]),
      f.value ? (a(), i("div", {
        key: 0,
        ref_key: "body",
        ref: $,
        class: "learning-process-body"
      }, [(a(!0), i(M, null, F(o.value, (x) => (a(), i(M, { key: x.index }, [x.text ? (a(), J(ut, {
        key: 0,
        class: "learning-markdown learning-process-narration",
        text: x.text
      }, null, 8, ["text"])) : g("", !0), x.tools.length ? (a(), i("ol", {
        key: 1,
        class: "learning-process-steps",
        "aria-label": l(Q).round(x.index)
      }, [(a(!0), i(M, null, F(x.tools, (j) => (a(), i("li", {
        key: j.id,
        "data-status": j.status
      }, [
        n("span", go, r(j.status === "done" ? "✓" : j.status === "failed" ? "!" : "·"), 1),
        n("div", null, [n("span", null, r(l(Q).tools[j.name] ?? l(Q).title), 1), k(j) ? (a(), i("small", po, r(k(j)), 1)) : g("", !0)]),
        n("small", mo, r(l(Q)[j.status]), 1)
      ], 8, co))), 128))], 8, vo)) : g("", !0)], 64))), 128))], 512)) : g("", !0),
      !b.value || v.value || f.value ? (a(), i("p", bo, [v.value ? (a(), i("span", fo)) : g("", !0), Y(r(w.value), 1)])) : g("", !0)
    ], 10, lo)) : g("", !0);
  }
}), na = ko;
function ze(e, p, s) {
  return e.notice === "history-save" && p !== "ready" || e.notice === "learning-save" && s !== "ready" ? "" : e.message;
}
function Se(e) {
  return e.kind === "reading-article" || e.kind === "reading-notes" || e.kind === "reading-essay";
}
function Ye(e) {
  return e.kind === "talk" || e.kind === "companion";
}
var Bt = {
  initial: "我想跟你学这门语言，先聊聊吧。",
  returning: "我来继续学语言了，先聊聊今天从哪里开始吧。"
}, yo = { class: "learning-messages" }, ho = /* @__PURE__ */ te({
  __name: "LearningMessages",
  props: {
    turn: {},
    disabled: { type: Boolean }
  },
  emits: ["stop"],
  setup(e, { emit: p }) {
    const s = e, t = p, o = C(() => s.turn.messages.filter((d) => d.role === "assistant" && !d.toolCalls?.length && d.content));
    return (d, v) => (a(), i("div", yo, [H(na, {
      turn: e.turn,
      stoppable: "",
      disabled: e.disabled,
      onStop: v[0] || (v[0] = (b) => t("stop"))
    }, null, 8, ["turn", "disabled"]), (a(!0), i(M, null, F(o.value, (b, I) => (a(), i("div", {
      key: I,
      class: se(["learning-output", { "is-streaming": b.streaming }])
    }, [H(ut, {
      class: "learning-markdown",
      text: b.content
    }, null, 8, ["text"])], 2))), 128))]));
  }
}), $o = ho, wo = { class: "learning-conversation" }, xo = { class: "learning-conversation-heading" }, Co = {
  class: "learning-person-initial",
  "aria-hidden": "true"
}, Io = ["disabled"], Lo = ["aria-label"], So = ["aria-label"], Ao = {
  key: 0,
  class: "learning-history-notice"
}, Ro = {
  key: 0,
  class: "learning-conversation-user"
}, Mo = ["disabled", "onClick"], Eo = {
  key: 3,
  class: "learning-conversation-tools"
}, To = ["disabled"], No = ["disabled"], Bo = {
  key: 1,
  class: "learning-working",
  role: "status"
}, Oo = {
  key: 2,
  class: "learning-turn-notice is-error",
  role: "status"
}, qo = {
  key: 3,
  class: "learning-conversation-empty"
}, Po = ["disabled"], Uo = { class: "learning-composer-surface" }, Vo = {
  key: 0,
  class: "learning-composer-quote"
}, Do = { class: "learning-composer-row" }, jo = [
  "disabled",
  "maxlength",
  "aria-label",
  "placeholder"
], Wo = [
  "type",
  "disabled",
  "aria-label",
  "title"
], _o = /* @__PURE__ */ te({
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
  setup(e, { expose: p, emit: s }) {
    const t = e, o = C(() => t.target === "workbench" ? t.state.workbenchConversation : t.state.conversation), d = C(() => t.target === "workbench" ? t.state.workbenchBusy : t.state.chatBusy), v = C(() => t.target === "workbench" ? t.state.workbenchMessage : t.state.chatMessage), b = C(() => t.target === "workbench" ? t.state.workbenchStorage : t.state.chatStorage), I = C(() => t.target === "workbench" ? t.state.reply : t.state.companionReply), f = C(() => t.target === "workbench" ? ee.assistant : t.state.teacher?.name ?? "语伴"), $ = C(() => o.value.turns.map((O, G) => ({
      turn: O,
      index: G
    })).filter(({ turn: O }) => !Se({ kind: O.purpose ?? "talk" }) || O.status === "running")), y = {
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
    ]), k = s, m = Me(), u = t.target === "workbench" ? m.workbenchChat : m.chat, x = (O, G = {}) => k("action", O, {
      ...G,
      target: t.target
    }), j = fe(u, "text"), N = z(null), L = z(null), B = z(null), _ = fe(u, "focus");
    let U = null, D = 0;
    function q() {
      const O = B.value;
      O && (u.scroll = O.scrollTop, u.following = O.scrollHeight - O.scrollTop - O.clientHeight < 70);
    }
    async function W() {
      await re(), u.following && B.value && (B.value.scrollTop = B.value.scrollHeight);
    }
    function E() {
      const O = N.value;
      O?.clientWidth && (O.style.height = "auto", O.style.height = `${O.scrollHeight}px`, W());
    }
    Z(j, E, { flush: "post" }), Z(N, (O) => {
      if (U?.disconnect(), cancelAnimationFrame(D), !O) return;
      let G = 0;
      U = new ResizeObserver(([V]) => {
        V.contentRect.width !== G && (G = V.contentRect.width, cancelAnimationFrame(D), D = requestAnimationFrame(E));
      }), U.observe(O.parentElement);
    }, { flush: "post" }), Ae(() => {
      B.value && (B.value.scrollTop = u.scroll), W();
    }), Re(() => {
      B.value && (u.scroll = B.value.scrollTop), U?.disconnect(), cancelAnimationFrame(D);
    });
    function R() {
      if (t.disabled || !j.value.trim()) return;
      const O = j.value.trim();
      u.sent = {
        text: j.value,
        user: _.value?.selection ? `${O}

${_.value.selection.quote}` : O,
        after: o.value.turns.length + o.value.removedTurns
      }, u.following = !0, x("talk", {
        message: O,
        ..._.value ?? u.study ?? {}
      });
    }
    function A(O) {
      O.key !== "Enter" || O.shiftKey || O.isComposing || O.keyCode === 229 || (O.preventDefault(), R());
    }
    Z([() => o.value.turns, () => d.value], W);
    function P(O) {
      if (O.kind === "replacement") return !t.disabled && t.state.currentUnitId === O.unitId;
      const G = [t.state.unit, t.state.review].find((V) => V?.id === O.unitId);
      return !!G && (O.kind === "exercise" ? G.exercises : G.materials).some((V) => V.id === O.id);
    }
    const T = C(() => t.state.unit?.id === I.value?.unitId ? t.state.unit : null);
    return p({
      async ask(O, G, V = t.state.unit?.id) {
        _.value = {
          unitId: V,
          exerciseId: O,
          selection: G,
          help: !!O && !G
        }, u.study = V ? {
          unitId: V,
          exerciseId: O
        } : null, await re(), N.value?.focus();
      },
      focusHeading: () => L.value?.focus({ preventScroll: !0 })
    }), (O, G) => (a(), i("section", wo, [
      n("header", xo, [
        n("span", Co, r(e.target === "workbench" ? "a" : [...f.value][0]), 1),
        n("h1", {
          ref_key: "heading",
          ref: L,
          tabindex: "-1"
        }, r(f.value), 513),
        e.target === "companion" ? (a(), i("button", {
          key: 0,
          type: "button",
          disabled: e.disabled,
          "aria-label": "更换学习语言和语伴",
          onClick: G[0] || (G[0] = (V) => k("profile"))
        }, r(new Intl.DisplayNames(["zh-CN"], { type: "language" }).of(e.state.language)), 9, Io)) : (a(), i("button", {
          key: 1,
          type: "button",
          "aria-label": l(ee).closeAssistant,
          onClick: G[1] || (G[1] = (V) => k("close"))
        }, [H(K, { name: "close" })], 8, Lo))
      ]),
      n("div", {
        ref_key: "scroller",
        ref: B,
        class: "learning-conversation-turns",
        "aria-label": e.target === "workbench" ? l(ee).assistant : y.conversation,
        onScroll: q
      }, [
        o.value.removedTurns ? (a(), i("p", Ao, r(y.history), 1)) : g("", !0),
        (a(!0), i(M, null, F($.value, ({ turn: V, index: ke }, be) => (a(), i("div", {
          key: o.value.removedTurns + ke,
          class: "learning-conversation-turn"
        }, [
          V.user && !l(w).has(V.purpose) && !l(Se)({ kind: V.purpose ?? "talk" }) ? (a(), i("p", Ro, r(V.user), 1)) : g("", !0),
          H($o, {
            turn: V,
            disabled: e.pending,
            onStop: (pe) => x(l(Ye)({ kind: V.purpose ?? "talk" }) ? "cancel-chat" : l(Se)({ kind: V.purpose ?? "talk" }) ? "cancel-preparation" : "cancel")
          }, null, 8, [
            "turn",
            "disabled",
            "onStop"
          ]),
          l(ze)(V, b.value, e.state.storage) ? (a(), i("p", {
            key: 1,
            class: se(["learning-turn-notice", { "is-error": V.status === "failed" }]),
            role: "status"
          }, r(l(ze)(V, b.value, e.state.storage)), 3)) : g("", !0),
          V.presentation ? (a(), i("button", {
            key: 2,
            type: "button",
            class: "learning-activity-link",
            disabled: !P(V.presentation),
            onClick: (pe) => k("present", V.presentation)
          }, [
            H(K, { name: V.presentation.kind === "material" ? "book" : "records" }, null, 8, ["name"]),
            n("span", null, r(V.presentation.title), 1),
            H(K, { name: "arrow" })
          ], 8, Mo)) : g("", !0),
          be === $.value.length - 1 && I.value?.text === V.teacher ? (a(), i("div", Eo, [[...V.teacher].length <= 1e3 ? (a(), i("button", {
            key: 0,
            type: "button",
            disabled: e.disabled,
            onClick: G[2] || (G[2] = (pe) => x("say-reply"))
          }, [H(K, { name: "sound" }), Y(r(l(ee).listen), 1)], 8, To)) : g("", !0), I.value.exerciseId && T.value && [...V.teacher].length <= 4e3 ? (a(), i("button", {
            key: 1,
            type: "button",
            disabled: e.disabled || T.value.notes.some((pe) => pe.text === V.teacher),
            onClick: G[3] || (G[3] = (pe) => x("save-note", { unitId: T.value.id }))
          }, r(l(ee).saveNote), 9, No)) : g("", !0)])) : g("", !0)
        ]))), 128)),
        d.value && !o.value.turns.some((V) => V.status === "running" && l(Ye)({ kind: V.purpose ?? "talk" })) ? (a(), i("div", Bo, [G[9] || (G[9] = n("span", {
          class: "learning-working-dot",
          "aria-hidden": "true"
        }, null, -1)), n("span", null, r(v.value), 1)])) : !d.value && v.value && b.value === "ready" ? (a(), i("p", Oo, r(v.value), 1)) : g("", !0),
        !$.value.length && !d.value ? (a(), i("div", qo, [
          H(K, { name: "chat" }),
          n("p", null, r(e.target === "workbench" ? l(ee).assistantEmpty : e.state.teacher ? y.empty : y.select), 1),
          e.target === "companion" && !e.state.teacher ? (a(), i("button", {
            key: 0,
            class: "learning-primary",
            type: "button",
            onClick: G[4] || (G[4] = (V) => k("profile"))
          }, r(y.select), 1)) : e.target === "companion" ? (a(), i("button", {
            key: 1,
            type: "button",
            disabled: e.disabled,
            onClick: G[5] || (G[5] = (V) => x("talk", { message: e.state.profile ? l(Bt).returning : l(Bt).initial }))
          }, r(y.opening), 9, Po)) : g("", !0)
        ])) : g("", !0)
      ], 40, So),
      e.target === "workbench" || e.state.teacher ? (a(), i("form", {
        key: 0,
        class: "learning-conversation-compose",
        onSubmit: de(R, ["prevent"])
      }, [n("div", Uo, [_.value ? (a(), i("div", Vo, [n("span", null, r(_.value.selection?.quote ?? "请教这道题"), 1), n("button", {
        type: "button",
        "aria-label": "取消引用",
        onClick: G[6] || (G[6] = (V) => _.value = null)
      }, "×")])) : g("", !0), n("div", Do, [ne(n("textarea", {
        ref_key: "composer",
        ref: N,
        "onUpdate:modelValue": G[7] || (G[7] = (V) => j.value = V),
        rows: "1",
        disabled: b.value !== "ready",
        maxlength: _.value?.selection ? 1800 : _.value?.exerciseId ? 2e3 : 4e3,
        "aria-label": e.target === "workbench" ? l(ee).assistantPlaceholder : "和语伴说",
        placeholder: e.target === "workbench" ? l(ee).assistantPlaceholder : "和语伴说…",
        onKeydown: A
      }, null, 40, jo), [[ue, j.value], [l(Ke), l(u)]]), n("button", {
        type: d.value ? "button" : "submit",
        class: se(d.value ? "learning-composer-stop" : "learning-primary"),
        disabled: d.value ? e.pending : e.disabled || !j.value.trim(),
        "aria-label": d.value ? l(ee).stop : l(ee).send,
        title: d.value ? l(ee).stop : l(ee).send,
        onClick: G[8] || (G[8] = de((V) => d.value ? x("cancel-chat") : R(), ["prevent"]))
      }, [H(K, { name: d.value ? "stop" : "send" }, null, 8, ["name"])], 10, Wo)])])], 32)) : g("", !0)
    ]));
  }
}), Ot = _o;
function Go(e) {
  const p = ca(structuredClone(va(e.initialState))), s = z(!1), t = z(null), o = C(() => t.value ? Wt[t.value] : ""), d = C(() => t.value === "unknown" || t.value === "rejected");
  let v = !1, b = 0, I = () => {
  };
  const f = (k) => !s.value && he(k, p.value), $ = C(() => f("submit")), y = C(() => f("talk"));
  async function w(k, m = {}) {
    if (s.value) return;
    if (ot(k === "talk" && m.target === "workbench" ? "workbench-talk" : k, p.value)) {
      t.value = "busy";
      return;
    }
    s.value = !0, t.value = null;
    const u = p.value.chatIdentity, x = b;
    let j = !1;
    try {
      const N = JSON.parse(JSON.stringify({
        chatIdentity: u,
        ...m
      }));
      j = !0;
      const L = await e.bridge.request(`learning/${k}`, N, 35e3);
      return !v || p.value.chatIdentity !== u ? void 0 : (b === x && L.result.state.chatIdentity === u && (p.value = L.result.state), L.result.rejected && (t.value = L.result.rejected), L.result);
    } catch (N) {
      v && p.value.chatIdentity === u && (t.value = !j || N instanceof fa && N.code === "host_request_not_sent" ? "notSent" : N instanceof ba ? "rejected" : "unknown");
    } finally {
      v && (s.value = !1);
    }
  }
  return Ae(() => {
    v = !0, I = e.bridge.subscribe((k) => {
      if (k.type === "learning/media") {
        p.value = {
          ...p.value,
          media: k.payload.media
        };
        return;
      }
      if (k.type !== "learning/state") return;
      const m = k.payload.state;
      m.chatIdentity === p.value.chatIdentity && (b++, p.value = m);
    });
  }), Re(() => {
    v = !1, I();
  }), {
    state: p,
    pending: s,
    writable: $,
    canChat: y,
    canRequest: f,
    localIssue: t,
    localMessage: o,
    needsRefresh: d,
    request: w
  };
}
function Fo(e = Math.random) {
  return Math.round(3 * 6e4 + Math.min(Math.max(e(), 0), 1) * 9 * 6e4);
}
function Ho(e) {
  let p = !1, s, t = 0;
  function o() {
    s !== void 0 && (e.clearTimer(s), s = void 0);
  }
  function d() {
    if (!p) return;
    const v = t;
    s = e.setTimer(() => {
      v === t && (s = void 0, p && (e.opportunity(), d()));
    }, Fo(e.random));
  }
  return {
    update(v) {
      p !== v && (p = v, t++, o(), d());
    },
    dispose() {
      p = !1, t++, o();
    }
  };
}
function zo(e) {
  const p = z(!1), s = z(!1), t = z(!1), o = z(!1), d = z("");
  let v, b;
  const I = C(() => e.preference.enabled && e.reading.value && p.value && !e.blocked.value && !!e.state.value.teacher && e.state.value.storage === "ready"), f = C(() => I.value && !s.value && !t.value && !o.value && !e.pending.value && !e.state.value.busy && !e.state.value.chatBusy && !e.state.value.companionBusy);
  function $() {
    const L = e.root.value?.querySelector(".learning-scroll")?.getBoundingClientRect(), B = L?.top ?? 0, _ = [...e.root.value?.querySelectorAll("[data-material-id][data-paragraph-id]") ?? []].find((U) => U.getBoundingClientRect().bottom > B + 60 && U.getBoundingClientRect().top < (L?.bottom ?? 0));
    return _ ? {
      materialId: _.dataset.materialId,
      paragraphId: _.dataset.paragraphId
    } : null;
  }
  const y = Ho({
    setTimer: (L, B) => setTimeout(L, B),
    clearTimer: (L) => clearTimeout(L),
    opportunity: () => {
      const L = $();
      L && e.request("companion", L);
    }
  });
  Z(f, (L) => y.update(L), { immediate: !0 }), Z([
    I,
    s,
    t,
    o,
    e.pending,
    () => e.state.value.companionBusy
  ], ([L, B, _, U, D, q]) => {
    q && !D && (!L || B || _ || U) && e.request("cancel-companion");
  });
  function w() {
    const L = document.activeElement;
    s.value = L instanceof HTMLElement && !!e.root.value?.contains(L) && L.matches("textarea, input:not([type=checkbox],[type=radio],[type=range]), [contenteditable=true]");
  }
  const k = () => queueMicrotask(w);
  function m() {
    const L = document.getSelection();
    t.value = !!L && !L.isCollapsed && !!e.root.value?.contains(L.anchorNode);
  }
  function u() {
    clearTimeout(v), o.value = !0, v = setTimeout(() => {
      o.value = !1;
    }, 3e4);
  }
  function x(L) {
    !(L.target instanceof HTMLElement) || !L.target.matches("textarea, input:not([type=checkbox],[type=radio],[type=range]), [contenteditable=true]") || u();
  }
  function j() {
    p.value = document.visibilityState === "visible", p.value || (clearTimeout(v), o.value = !1, N()), w();
  }
  function N() {
    clearTimeout(b), d.value = "";
  }
  return Z(() => e.state.value.remark?.text ?? "", (L) => {
    N(), L && e.reading.value && p.value && !s.value && !t.value && !o.value && !e.blocked.value && (d.value = L, b = setTimeout(N, 1e4));
  }), Z([
    e.reading,
    e.blocked,
    s,
    t,
    o
  ], ([L, B, _, U, D]) => {
    (!L || B || _ || U || D) && N();
  }), Ae(() => {
    j(), document.addEventListener("visibilitychange", j), document.addEventListener("selectionchange", m), e.root.value?.addEventListener("pointerdown", u), e.root.value?.addEventListener("focusin", k), e.root.value?.addEventListener("focusout", k), e.root.value?.addEventListener("input", x);
  }), Re(() => {
    y.dispose(), clearTimeout(v), N(), document.removeEventListener("visibilitychange", j), document.removeEventListener("selectionchange", m), e.root.value?.removeEventListener("pointerdown", u), e.root.value?.removeEventListener("focusin", k), e.root.value?.removeEventListener("focusout", k), e.root.value?.removeEventListener("input", x);
  }), {
    bubble: d,
    dismiss: N
  };
}
var Yo = { class: "learning-toolbar" }, Ko = {
  key: 0,
  class: "learning-unread-dot",
  "aria-hidden": "true"
}, Zo = {
  key: 1,
  class: "learning-layout-control"
}, Jo = ["min", "max"], Qo = ["aria-label", "aria-expanded"], Xo = { "aria-label": "学习资料与设置" }, eu = { "aria-label": "学习资料与设置" }, tu = ["onClick"], au = {
  key: 0,
  class: "learning-notice",
  role: "status",
  "aria-live": "polite"
}, nu = { class: "learning-row" }, iu = ["disabled"], lu = ["disabled"], su = ["disabled"], ru = ["disabled"], ou = {
  key: 1,
  class: "learning-notice",
  role: "status",
  "aria-live": "polite"
}, uu = { class: "learning-row" }, du = ["disabled"], vu = ["disabled"], cu = {
  key: 2,
  class: "learning-notice",
  role: "status"
}, gu = ["disabled"], pu = ["disabled"], mu = ["inert", "aria-hidden"], bu = {
  key: 2,
  class: "learning-working",
  role: "status"
}, fu = ["disabled"], ku = {
  key: 5,
  class: "learning-materials-page"
}, yu = {
  key: 0,
  class: "learning-empty-note"
}, hu = { class: "learning-materials-title" }, $u = ["onClick"], wu = ["onClick"], xu = {
  key: 0,
  class: "learning-notes"
}, Cu = { key: 0 }, Iu = ["disabled", "onClick"], Lu = {
  key: 7,
  class: "learning-harvest-page"
}, Su = {
  key: 0,
  class: "learning-empty-note"
}, Au = { key: 0 }, Ru = { class: "learning-muted" }, Mu = ["disabled", "onClick"], Eu = ["disabled"], Tu = ["disabled"], Nu = {
  key: 3,
  class: "learning-row"
}, Bu = ["disabled"], Ou = ["disabled"], qu = {
  key: 8,
  class: "learning-settings-page"
}, Pu = ["value", "disabled"], Uu = ["value"], Vu = {
  key: 0,
  class: "learning-settings-goal"
}, Du = {
  key: 0,
  class: "learning-muted"
}, ju = ["value", "disabled"], Wu = ["disabled"], _u = ["disabled"], Gu = ["disabled"], Fu = ["disabled"], Hu = ["disabled"], zu = ["disabled"], Yu = ["disabled"], Ku = ["disabled"], Zu = ["inert", "aria-hidden"], Ju = ["aria-label"], Qu = { class: "learning-person-initial" }, Xu = {
  key: 0,
  class: "learning-unread-dot",
  "aria-hidden": "true"
}, ed = ["aria-label"], td = {
  key: 0,
  class: "learning-unread-dot",
  "aria-hidden": "true"
}, ad = {
  role: "alertdialog",
  "aria-labelledby": "learning-confirm-title",
  class: "learning-confirm"
}, nd = { id: "learning-confirm-title" }, id = { class: "learning-row" }, ld = ["disabled"], sd = /* @__PURE__ */ te({
  __name: "LearningApp",
  props: {
    bridge: {},
    initialState: {}
  },
  setup(e) {
    const p = e, s = {
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
    }, { state: t, pending: o, writable: d, canChat: v, canRequest: b, localMessage: I, needsRefresh: f, request: $ } = Go(p), y = xn(t);
    async function w(S, c = {}, h = !1) {
      if (!h && wn(y, t.value, S, c)) {
        oe(S, c, S === "teacher" ? ye.companion : ye.context);
        return;
      }
      return $(S, c);
    }
    const k = z(t.value.profile ? "home" : "profile"), m = [], u = z(null), x = z(!1);
    Fe(() => u.value?.open ? (u.value.open = !1, !0) : !1, () => x.value);
    const j = z(null), N = z(null), L = z(!1), B = z(null), _ = z(null), U = z(null), D = {}, q = z(null), W = z(0), E = C(() => W.value >= 760 && !!t.value.teacher), R = z("work"), A = z(!0), P = z(!1), T = z(62), O = C(() => Math.max(42, Math.ceil(320 / Math.max(W.value, 1) * 100))), G = C(() => Math.min(68, Math.floor((1 - 320 / Math.max(W.value, 1)) * 100))), V = C({
      get: () => E.value ? Math.min(G.value, Math.max(O.value, T.value)) : T.value,
      set: (S) => {
        T.value = S;
      }
    }), ke = z(!1);
    let be, pe;
    const Ze = () => {
      ke.value = pe?.matches ?? !1;
    };
    Ae(() => {
      pe = matchMedia("(prefers-reduced-motion: reduce)"), Ze(), pe.addEventListener("change", Ze), !(!q.value || typeof ResizeObserver > "u") && (be = new ResizeObserver(([S]) => {
        W.value = S?.contentRect.width ?? 0;
      }), be.observe(q.value));
    }), Re(() => {
      be?.disconnect(), pe?.removeEventListener("change", Ze);
    });
    const ce = C(() => E.value || R.value === "work"), qe = C(() => !!t.value.teacher && (E.value || R.value === "chat"));
    Z([
      ce,
      qe,
      ke
    ], async ([S, c, h], ae, We) => {
      let Ne = !0, ht;
      if (We(() => {
        Ne = !1, clearTimeout(ht);
      }), S && (A.value = !0), c && (P.value = !0), await re(), !Ne) return;
      S && U.value && (U.value.scrollTop = D[k.value] ?? 0);
      const $t = () => {
        A.value = S, P.value = c;
      };
      E.value || h ? $t() : ht = setTimeout($t, 320);
    }, { immediate: !0 });
    function Pe() {
      ce.value && U.value && !L.value && (D[k.value] = U.value.scrollTop), Te();
    }
    async function Te(S) {
      const c = S?.target instanceof Element ? S.target : null;
      if (await re(), !ce.value || k.value !== "home" || !U.value) return;
      const h = U.value.getBoundingClientRect(), ae = c?.closest("[data-learning-unit-id]") ?? [...U.value.querySelectorAll("[data-learning-unit-id]")].find((We) => {
        const Ne = We.getBoundingClientRect();
        return Ne.bottom > h.top + 48 && Ne.top < h.bottom;
      });
      ae?.dataset.learningUnitId && (y.chat.study = {
        unitId: ae.dataset.learningUnitId,
        exerciseId: ae.dataset.exerciseId
      });
    }
    Z([
      U,
      k,
      ce
    ], () => {
      Te();
    }, { flush: "post" });
    const Je = C(() => {
      const { turns: S, removedTurns: c } = t.value.conversation;
      let h = S.length - 1;
      for (; h >= 0 && Se({ kind: S[h].purpose ?? "talk" }); ) h--;
      return h < 0 ? 0 : c + h + 1;
    }), Qe = z(Je.value);
    Z([Je, qe], ([S, c]) => {
      (c || S < Qe.value) && (Qe.value = S);
    }, { immediate: !0 });
    const ct = C(() => Je.value > Qe.value), me = C(() => {
      const S = t.value.workbenchConversation.turns;
      let c = S.length - 1;
      for (; c >= 0 && Ye({ kind: S[c].purpose ?? "talk" }); ) c--;
      let h = S.length - 1;
      for (; h >= 0 && (S[h].status !== "running" || Ye({ kind: S[h].purpose ?? "talk" })); ) h--;
      return h >= 0 && (c = h), c < 0 ? null : {
        turn: t.value.workbenchConversation.turns[c],
        key: `${t.value.chatIdentity}:${t.value.language}:${t.value.workbenchConversation.removedTurns + c}`
      };
    });
    async function gt() {
      t.value.teacher && (await Te(), Pe(), R.value = "chat", P.value = !0, await re(), R.value === "chat" && j.value?.focusHeading());
    }
    async function Ue() {
      A.value = !0, R.value = "work", await re(), U.value && (U.value.scrollTop = D[k.value] ?? 0);
      const S = U.value?.querySelector("h1, h2");
      S && (S.tabIndex = -1, S.focus({ preventScroll: !0 }));
    }
    let pt = 0;
    Z(() => !!t.value.record, async (S, c) => {
      k.value !== "books" || S === c || (S && (pt = U.value?.scrollTop ?? 0), await re(), k.value === "books" && U.value && (U.value.scrollTop = S ? 0 : pt));
    });
    const ie = z(null), mt = z(null);
    Pt(mt, () => {
      ie.value = null;
    });
    const Ve = z(t.value.profile?.voice?.voiceId ?? t.value.voices.defaultVoice), De = z(t.value.profile?.voice?.language ?? t.value.language), je = z(t.value.profile?.voice?.speed ?? 1), $e = z(0), ia = C(() => t.value.completions.slice($e.value * 20, ($e.value + 1) * 20));
    Z([() => t.value.language, () => t.value.profile?.voice], ([S, c]) => {
      Ve.value = c?.voiceId ?? t.value.voices.defaultVoice, De.value = c?.language ?? S, je.value = c?.speed ?? 1;
    }), Z([
      () => t.value.chatIdentity,
      () => t.value.language,
      () => t.value.teacher?.name
    ], () => {
      _.value = null, ie.value = null, $e.value = 0;
    }), Z(() => !!t.value.teacher, (S) => {
      S || (R.value = "work");
    }), Z(() => t.value.currentUnitId, (S) => {
      ie.value?.action === "replace-lesson" && ie.value.input.unitId !== S && (ie.value = null);
    }), Z(() => t.value.unit, (S) => {
      const c = _.value;
      c && (S?.id !== c.unitId || !(c.kind === "exercise" ? S.exercises : S.materials).some((h) => h.id === c.id)) && Xe();
    });
    for (const S of ["conversation", "workbenchConversation"]) Z(() => {
      const c = t.value[S].turns.at(-1)?.presentation;
      return c ? `${t.value[S].turns.length + t.value[S].removedTurns}:${c.unitId}:${c.kind}:${c.id}` : "";
    }, (c) => {
      const h = t.value[S].turns.at(-1)?.presentation;
      c && h && Ce(h, !0);
    });
    const xe = z(!1);
    Z([ce, k], ([S, c]) => {
      S && c === "home" && (xe.value = !1);
    });
    async function Ce(S, c = !1) {
      if (S.kind === "replacement") {
        if (t.value.currentUnitId !== S.unitId || t.value.storage !== "ready") return;
        oe("replace-lesson", {
          unitId: S.unitId,
          message: S.message,
          kind: S.unitKind
        }, s.replaceWarning);
        return;
      }
      if (t.value.review?.id === S.unitId) {
        if (c) {
          (!ce.value || k.value !== "home") && (xe.value = !0);
          return;
        }
        const h = y.unit(S.unitId).review;
        S.kind === "exercise" && (h.index = t.value.review.exercises.findIndex((ae) => ae.id === S.id)), h.expanded = !0, await at();
        return;
      }
      if (t.value.unit?.id === S.unitId) {
        if (t.value.unit.kind === "reading-writing") {
          if (c) {
            (!ce.value || k.value !== "home") && (xe.value = !0);
            return;
          }
          y.unit(S.unitId).reading.view = "reading", await ge("home");
          const h = S.kind === "exercise" ? `[data-exercise-id="${CSS.escape(S.id)}"]` : `[data-material-id="${CSS.escape(S.id)}"][data-paragraph-id]`;
          U.value?.querySelector(h)?.scrollIntoView({
            block: "start",
            behavior: matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth"
          });
          return;
        }
        _.value = S;
      }
    }
    function Xe() {
      _.value = null, w("stop");
    }
    async function et(S, c) {
      L.value || Pe(), L.value = !0, await Ue(), await re(), S ? await N.value?.ask(S, void 0, c) : N.value?.focusHeading();
    }
    async function tt() {
      L.value = !1, await re(), U.value && (U.value.scrollTop = D[k.value] ?? 0), B.value?.focus({ preventScroll: !0 });
    }
    async function bt(S, c, h) {
      if (!t.value.teacher) {
        await et(S, h), c && await N.value?.ask(S, c, h);
        return;
      }
      Xe(), Pe(), R.value = "chat", P.value = !0, await re(), await j.value?.ask(S, c, h);
    }
    async function ge(S, c = !1) {
      if (L.value = !1, S !== k.value && !c) if (S === "home") m.length = 0;
      else {
        const h = m.indexOf(S);
        h >= 0 ? m.splice(h) : m.push(k.value);
      }
      if (U.value && (D[k.value] = U.value.scrollTop), u.value && (u.value.open = !1), k.value = S, await Ue(), await re(), U.value) {
        U.value.scrollTop = D[S] ?? 0;
        const h = [...U.value.querySelectorAll("h1, h2")].find((ae) => ae.offsetParent !== null);
        h && (h.tabIndex = -1, h.focus({ preventScroll: !0 }));
      }
    }
    function ft() {
      y.setup.step = 0, ge("profile");
    }
    async function at() {
      await ge("home"), U.value && (U.value.scrollTop = 0);
      const S = U.value?.querySelector("#learning-review-title");
      S && (S.tabIndex = -1, S.focus({ preventScroll: !0 }));
    }
    async function nt(S, c = {}, h = !1) {
      if (S === "prepare" && !t.value.profile) {
        y.setup.step = 2, await ge("profile");
        return;
      }
      S === "start-review" && await at();
      const ae = t.value.unit;
      ae?.kind === "reading-writing" && c.unitId === ae.id && [
        "grade",
        "submit-revision",
        "skip-revision"
      ].includes(S) && (y.unit(ae.id).reading.view = S !== "grade" || [
        "reviewing",
        "model",
        "complete"
      ].includes(ae.stage.stage) ? "model" : "feedback", await ge("home"), U.value && (U.value.scrollTop = 0)), await w(S, c, h);
    }
    Z(() => y.settings.submitted, (S, c) => {
      !S && c && !y.settings.open && k.value === "profile" && y.setup.step === 2 && t.value.storage === "ready" && !t.value.busy && t.value.profile && Object.entries(c.value).every(([h, ae]) => t.value.profile.settings[h] === ae) && ge("home");
    }), Z(() => t.value.busy, (S) => {
      const c = t.value.unit;
      !S && c?.stage.stage === "revising" && y.unit(c.id).reading.view === "model" && (y.unit(c.id).reading.view = "feedback");
    });
    const kt = Fe(() => u.value?.open ? (u.value.open = !1, !0) : L.value && ce.value ? (tt(), !0) : !E.value && R.value === "chat" ? (Ue(), !0) : k.value === "home" || !m.length && k.value === "profile" && !t.value.teacher ? !1 : (ge(m.pop() ?? "home", !0), !0));
    function oe(S, c, h) {
      ie.value = {
        action: S,
        input: c,
        text: h
      };
    }
    async function la(S) {
      await w("records", {
        id: S,
        offset: t.value.records.offset
      }), t.value.record?.id === S && await ge("books");
    }
    const { bubble: yt, dismiss: it } = zo({
      root: q,
      state: t,
      pending: o,
      preference: y.companion,
      reading: C(() => ce.value && k.value === "home" && t.value.unit?.kind === "reading-writing" && [
        "writing",
        "grading",
        "complete"
      ].includes(t.value.unit.stage.stage)),
      blocked: C(() => L.value || !!_.value || !!ie.value || x.value),
      request: w
    });
    async function sa() {
      const S = await w("export");
      if (!S?.document) return;
      const c = URL.createObjectURL(new Blob([JSON.stringify(S.document, null, 2)], { type: "application/json" })), h = document.createElement("a");
      h.href = c, h.download = "LittleWhiteBox_Learning.json", h.click(), setTimeout(() => URL.revokeObjectURL(c), 1e3);
    }
    return (S, c) => (a(), i("section", {
      ref_key: "root",
      ref: q,
      class: "learning-app",
      style: qt({
        "--learning-switch-ms": `${l(320)}ms`,
        "--learning-work-share": `${V.value}%`
      }),
      "aria-label": "语伴语言学习"
    }, [
      n("header", Yo, [
        k.value !== "home" && (l(t).teacher || m.length) && (E.value || R.value === "work") ? (a(), i("button", {
          key: 0,
          type: "button",
          class: "learning-toolbar-back",
          "aria-label": "返回上一页",
          onClick: c[0] || (c[0] = (...h) => l(kt) && l(kt)(...h))
        }, [H(K, { name: "back" })])) : g("", !0),
        n("button", {
          type: "button",
          class: "learning-wordmark",
          onClick: c[1] || (c[1] = (h) => ge("home"))
        }, [
          c[37] || (c[37] = n("span", {
            class: "learning-brand-mark",
            "aria-hidden": "true"
          }, [Y("a"), n("span", null, "あ")], -1)),
          c[38] || (c[38] = Y("语伴", -1)),
          xe.value && (E.value || R.value === "work") ? (a(), i("span", Ko)) : g("", !0)
        ]),
        E.value && l(t).teacher ? (a(), i("label", Zo, [
          H(K, { name: "workbook" }),
          ne(n("input", {
            "onUpdate:modelValue": c[2] || (c[2] = (h) => V.value = h),
            type: "range",
            min: O.value,
            max: G.value,
            step: "1",
            "aria-label": "阅读区宽度比例"
          }, null, 8, Jo), [[
            ue,
            V.value,
            void 0,
            { number: !0 }
          ]]),
          H(K, { name: "chat" })
        ])) : g("", !0),
        n("button", {
          ref_key: "assistantButton",
          ref: B,
          type: "button",
          class: "learning-assistant-button",
          "aria-label": l(ee).assistant,
          "aria-expanded": L.value,
          onClick: c[3] || (c[3] = (h) => L.value ? tt() : et())
        }, [H(K, { name: "chat" }), n("span", null, r(l(ee).assistant), 1)], 8, Qo),
        n("details", {
          ref_key: "menu",
          ref: u,
          class: "learning-menu",
          onToggle: c[4] || (c[4] = (h) => x.value = !!u.value?.open),
          onKeydown: c[5] || (c[5] = Oe(de((h) => u.value.open = !1, ["stop", "prevent"]), ["esc"]))
        }, [n("summary", Xo, [H(K, { name: "more" })]), n("nav", eu, [(a(), i(M, null, F([
          ["books", "语法本与生词本"],
          ["materials", "课件与笔记"],
          ["harvest", "我的收获"],
          ["settings", "设置"]
        ], ([h, ae]) => n("button", {
          key: h,
          type: "button",
          onClick: (We) => ge(h)
        }, r(ae), 9, tu)), 64))])], 544)
      ]),
      l(I) || !l(t).busy && (l(t).message || l(t).storage !== "ready") ? (a(), i("div", au, [Y(r(l(I) || l(t).message || (l(t).storage === "unconfirmed" ? l(st).unconfirmed : l(t).storage === "conflict" ? l(st).conflict : l(st).unloaded)) + " ", 1), n("div", nu, [
        l(t).storage === "unconfirmed" || l(t).storage === "conflict" ? (a(), i("button", {
          key: 0,
          type: "button",
          disabled: l(o),
          onClick: c[6] || (c[6] = (h) => w("verify"))
        }, r(s.verify), 9, iu)) : g("", !0),
        l(t).storage === "unconfirmed" ? (a(), i("button", {
          key: 1,
          type: "button",
          disabled: l(o),
          onClick: c[7] || (c[7] = (h) => w("retry-save"))
        }, r(s.retry), 9, lu)) : g("", !0),
        l(t).storage === "conflict" ? (a(), i("button", {
          key: 2,
          type: "button",
          disabled: l(o),
          onClick: c[8] || (c[8] = (h) => oe("adopt-server", {}, s.adoptWarning))
        }, r(s.adopt), 9, su)) : g("", !0),
        l(t).storage === "unloaded" || l(f) ? (a(), i("button", {
          key: 3,
          type: "button",
          disabled: l(o),
          onClick: c[9] || (c[9] = (h) => w("read"))
        }, r(l(Wt).refresh), 9, ru)) : g("", !0)
      ])])) : g("", !0),
      [
        "unconfirmed",
        "conflict",
        "failed"
      ].includes(l(t).chatStorage) ? (a(), i("div", ou, [Y(r(l(t).chatStorage === "unconfirmed" ? l(Ie).unconfirmed : l(t).chatStorage === "conflict" ? l(Ie).conflict : l(Ie).failed) + " ", 1), n("div", uu, [n("button", {
        type: "button",
        disabled: !l(b)("verify-teacher"),
        onClick: c[10] || (c[10] = (h) => w("verify-teacher"))
      }, r(l(Ie).verify), 9, du), l(t).chatStorage !== "failed" ? (a(), i("button", {
        key: 0,
        type: "button",
        disabled: !l(b)("adopt-teacher"),
        onClick: c[11] || (c[11] = (h) => oe("adopt-teacher", {}, l(Ie).adoptWarning))
      }, r(l(Ie).adopt), 9, vu)) : g("", !0)])])) : g("", !0),
      [
        "unconfirmed",
        "conflict",
        "failed"
      ].includes(l(t).workbenchStorage) ? (a(), i("div", cu, [
        Y(r(l(ee).assistantStorage) + " ", 1),
        n("button", {
          type: "button",
          disabled: l(o),
          onClick: c[12] || (c[12] = (h) => w("verify-workbench"))
        }, r(l(ee).verify), 9, gu),
        l(t).workbenchStorage === "conflict" ? (a(), i("button", {
          key: 0,
          type: "button",
          disabled: l(o),
          onClick: c[13] || (c[13] = (h) => oe("adopt-workbench", {}, l(ee).adoptConfirm))
        }, r(l(ee).adopt), 9, pu)) : g("", !0)
      ])) : g("", !0),
      n("div", { class: se(["learning-stage", {
        "is-wide": E.value,
        "is-chat": !E.value && R.value === "chat"
      }]) }, [
        n("div", {
          class: "learning-pane is-work",
          inert: !ce.value,
          "aria-hidden": !ce.value
        }, [A.value && L.value ? (a(), J(Ot, {
          key: 0,
          ref_key: "assistant",
          ref: N,
          target: "workbench",
          state: l(t),
          disabled: !l(b)("workbench-talk"),
          pending: l(o),
          onAction: w,
          onPresent: Ce,
          onClose: tt
        }, null, 8, [
          "state",
          "disabled",
          "pending"
        ])) : g("", !0), ne(n("div", {
          ref_key: "scroller",
          ref: U,
          class: "learning-scroll",
          onScrollPassive: Pe,
          onClick: Te,
          onFocusin: Te
        }, [A.value && !L.value ? (a(), i(M, { key: 0 }, [
          me.value ? (a(), J(na, {
            key: me.value.key,
            turn: me.value.turn,
            stoppable: "",
            disabled: l(o),
            onStop: c[14] || (c[14] = (h) => w(l(Se)({ kind: me.value.turn.purpose ?? "talk" }) ? "cancel-preparation" : "cancel"))
          }, null, 8, ["turn", "disabled"])) : g("", !0),
          me.value && !l(Se)({ kind: me.value.turn.purpose ?? "talk" }) && l(ze)(me.value.turn, l(t).workbenchStorage, l(t).storage) ? (a(), i("p", {
            key: 1,
            class: se(["learning-turn-notice", { "is-error": me.value.turn.status === "failed" }]),
            role: "status"
          }, r(l(ze)(me.value.turn, l(t).workbenchStorage, l(t).storage)), 3)) : g("", !0),
          l(t).busy && me.value?.turn.status !== "running" ? (a(), i("div", bu, [
            c[39] || (c[39] = n("span", {
              class: "learning-working-dot",
              "aria-hidden": "true"
            }, null, -1)),
            n("span", null, r(l(t).message || s.working), 1),
            n("button", {
              type: "button",
              disabled: l(o),
              onClick: c[15] || (c[15] = (h) => w("cancel"))
            }, "停止", 8, fu)
          ])) : g("", !0),
          k.value === "home" ? (a(), J(no, {
            key: 3,
            state: l(t),
            disabled: !l(d),
            pending: l(o),
            onAction: nt,
            onConfirm: oe,
            onPresent: Ce,
            onGo: ge,
            onAsk: bt,
            onAssistant: et,
            onRecord: la
          }, null, 8, [
            "state",
            "disabled",
            "pending"
          ])) : g("", !0),
          k.value === "profile" ? (a(), J(ol, {
            key: 4,
            state: l(t),
            disabled: !l(b)("language"),
            onAction: w
          }, null, 8, ["state", "disabled"])) : g("", !0),
          k.value === "materials" ? (a(), i("section", ku, [
            c[40] || (c[40] = n("h1", null, "课件与笔记", -1)),
            l(t).unit ? g("", !0) : (a(), i("p", yu, r(l(t).blockedUnit ? "当前课件在另一个故事中" : "还没有课件"), 1)),
            l(t).unit ? (a(), i(M, { key: 1 }, [
              n("p", hu, r(l(t).unit.title), 1),
              (a(!0), i(M, null, F(l(t).unit.materials, (h) => (a(), i("button", {
                key: h.id,
                type: "button",
                class: "learning-activity-link",
                onClick: (ae) => Ce({
                  unitId: l(t).unit.id,
                  kind: "material",
                  id: h.id,
                  title: h.title
                })
              }, [
                H(K, { name: "book" }),
                n("span", null, r(h.title), 1),
                H(K, { name: "arrow" })
              ], 8, $u))), 128)),
              (a(!0), i(M, null, F(l(t).unit.exercises, (h) => (a(), i("button", {
                key: h.id,
                type: "button",
                class: "learning-activity-link",
                onClick: (ae) => Ce({
                  unitId: l(t).unit.id,
                  kind: "exercise",
                  id: h.id,
                  title: h.prompt
                })
              }, [
                H(K, { name: "records" }),
                n("span", null, r(h.prompt), 1),
                H(K, { name: "arrow" })
              ], 8, wu))), 128)),
              l(t).unit.notes.length ? (a(), i("section", xu, [(a(!0), i(M, null, F(l(t).unit.notes, (h) => (a(), i("article", { key: h.id }, [
                h.selection ? (a(), i("blockquote", Cu, r(h.selection.quote), 1)) : g("", !0),
                n("p", null, r(h.text), 1),
                n("button", {
                  type: "button",
                  disabled: !l(d),
                  onClick: (ae) => w("delete-note", { id: h.id })
                }, "删除笔记", 8, Iu)
              ]))), 128))])) : g("", !0)
            ], 64)) : g("", !0)
          ])) : g("", !0),
          k.value === "books" ? (a(), J(Ei, {
            key: 6,
            state: l(t),
            disabled: !l(b)("start-review"),
            onAction: nt,
            onReview: at,
            onRemove: oe
          }, null, 8, ["state", "disabled"])) : g("", !0),
          k.value === "harvest" ? (a(), i("section", Lu, [
            c[42] || (c[42] = n("div", { class: "learning-page-heading" }, [n("h1", null, "我的收获")], -1)),
            l(t).completions.length ? g("", !0) : (a(), i("p", Su, "还没有完成的课程")),
            (a(!0), i(M, null, F(ia.value, (h) => (a(), i("article", {
              key: h.unitId,
              class: "learning-harvest-entry"
            }, [
              n("small", null, r(new Date(h.completedAt).toLocaleDateString()), 1),
              h.rewardStatus !== "retired" ? (a(), i("h2", Au, [Y(r(h.rewardStatus === "paid" ? "+" : "") + r(h.amount), 1), c[41] || (c[41] = n("span", null, "小白币", -1))])) : g("", !0),
              n("p", null, r(h.summary), 1),
              n("p", Ru, r(h.rewardStatus === "paid" ? l(ve).paid : h.rewardStatus === "retired" ? l(ve).retired : l(ve).pending), 1),
              h.rewardStatus !== "paid" && h.rewardStatus !== "retired" ? (a(), i("button", {
                key: 1,
                type: "button",
                disabled: !l(d) || l(t).walletStorage !== "ready",
                onClick: (ae) => w("reward", {
                  unitId: h.unitId,
                  openWallet: !l(t).walletOpen
                })
              }, r(l(t).walletOpen ? l(ve).claim : l(ve).openWallet), 9, Mu)) : g("", !0)
            ]))), 128)),
            l(t).walletStorage === "unconfirmed" || l(t).walletStorage === "conflict" || l(t).walletStorage === "failed" ? (a(), i("button", {
              key: 1,
              type: "button",
              disabled: l(o) || l(t).busy,
              onClick: c[16] || (c[16] = (h) => w("verify-wallet"))
            }, r(s.verifyWallet), 9, Eu)) : g("", !0),
            l(t).walletStorage === "conflict" ? (a(), i("button", {
              key: 2,
              type: "button",
              disabled: l(o) || l(t).busy,
              onClick: c[17] || (c[17] = (h) => oe("adopt-wallet", {}, s.adoptWalletWarning))
            }, r(s.adoptWallet), 9, Tu)) : g("", !0),
            l(t).completions.length > 20 ? (a(), i("div", Nu, [n("button", {
              type: "button",
              disabled: $e.value === 0,
              onClick: c[18] || (c[18] = (h) => $e.value--)
            }, "上一页", 8, Bu), n("button", {
              type: "button",
              disabled: ($e.value + 1) * 20 >= l(t).completions.length,
              onClick: c[19] || (c[19] = (h) => $e.value++)
            }, "下一页", 8, Ou)])) : g("", !0)
          ])) : g("", !0),
          k.value === "settings" ? (a(), i("section", qu, [
            c[52] || (c[52] = n("h1", null, "学习设置", -1)),
            n("label", null, [c[43] || (c[43] = Y("当前语言", -1)), n("select", {
              value: l(t).language,
              disabled: !l(b)("language"),
              onChange: c[20] || (c[20] = (h) => {
                w("language", { language: h.target.value }), h.target.value = l(t).language;
              })
            }, [(a(!0), i(M, null, F([.../* @__PURE__ */ new Set([l(t).language, ...l(t).languages])], (h) => (a(), i("option", {
              key: h,
              value: h
            }, r(new Intl.DisplayNames(["zh-CN"], { type: "language" }).of(h)), 9, Uu))), 128))], 40, Pu)]),
            n("button", {
              type: "button",
              onClick: ft
            }, "更换语言和语伴 →"),
            H(Xt),
            n("section", null, [
              c[44] || (c[44] = n("h2", null, "训练设置", -1)),
              l(t).profile?.goal.description ? (a(), i("p", Vu, r(l(t).profile.goal.description), 1)) : g("", !0),
              H(Qt, {
                state: l(t),
                disabled: !l(b)("settings"),
                onAction: w
              }, null, 8, ["state", "disabled"])
            ]),
            n("section", null, [
              c[49] || (c[49] = n("h2", null, "语伴的声音", -1)),
              l(t).voices.enabled ? (a(), i("form", {
                key: 1,
                onSubmit: c[24] || (c[24] = de((h) => w("voice", { voice: {
                  voiceId: Ve.value,
                  language: De.value,
                  speed: Number(je.value)
                } }), ["prevent"]))
              }, [
                n("label", null, [c[45] || (c[45] = Y("音色", -1)), ne(n("select", { "onUpdate:modelValue": c[21] || (c[21] = (h) => Ve.value = h) }, [(a(!0), i(M, null, F(l(t).voices.voices, (h) => (a(), i("option", {
                  key: h.id,
                  value: h.id,
                  disabled: !h.available
                }, r(h.name) + r(h.available ? "" : "（暂不可用）"), 9, ju))), 128))], 512), [[Ge, Ve.value]])]),
                n("label", null, [c[46] || (c[46] = Y("发音语言", -1)), ne(n("input", {
                  "onUpdate:modelValue": c[22] || (c[22] = (h) => De.value = h),
                  type: "text",
                  maxlength: "80",
                  placeholder: "en / ja"
                }, null, 512), [[ue, De.value]])]),
                n("label", null, [c[48] || (c[48] = Y("语速", -1)), ne(n("select", { "onUpdate:modelValue": c[23] || (c[23] = (h) => je.value = h) }, [...c[47] || (c[47] = [
                  n("option", { value: 0.75 }, "0.75×", -1),
                  n("option", { value: 1 }, "1×", -1),
                  n("option", { value: 1.25 }, "1.25×", -1)
                ])], 512), [[Ge, je.value]])]),
                n("button", {
                  type: "submit",
                  disabled: !l(b)("voice") || !l(t).profile
                }, "保存声音设置", 8, Wu)
              ], 32)) : (a(), i("p", Du, r(s.voiceDisabled), 1)),
              n("button", {
                type: "button",
                onClick: c[25] || (c[25] = (h) => w("tts-settings"))
              }, r(l(t).voices.enabled ? l(rt).settings : l(rt).enable), 1),
              c[50] || (c[50] = n("small", null, "已听过的题保留原声音，新偏好用于之后的题目。", -1))
            ]),
            n("section", null, [
              c[51] || (c[51] = n("h2", null, "学习数据", -1)),
              n("button", {
                type: "button",
                disabled: !l(b)("forget-conversation"),
                onClick: c[26] || (c[26] = (h) => oe("forget-conversation", { target: "companion" }, l(ee).clearCompanionConfirm))
              }, r(l(ee).clearCompanion), 9, _u),
              n("button", {
                type: "button",
                disabled: !l(b)("forget-conversation"),
                onClick: c[27] || (c[27] = (h) => oe("forget-conversation", { target: "workbench" }, l(ee).clearAssistantConfirm))
              }, r(l(ee).clearAssistant), 9, Gu),
              n("button", {
                type: "button",
                disabled: !l(b)("export"),
                onClick: sa
              }, "导出学习数据", 8, Fu),
              n("button", {
                type: "button",
                disabled: !l(b)("read"),
                onClick: c[28] || (c[28] = (h) => w("read"))
              }, "重新加载", 8, Hu),
              l(t).unit || l(t).blockedUnit ? (a(), i("button", {
                key: 0,
                type: "button",
                disabled: !l(b)("abandon"),
                onClick: c[29] || (c[29] = (h) => oe("abandon", {}, l(ye).lesson))
              }, "放下当前练习", 8, zu)) : g("", !0),
              n("button", {
                type: "button",
                class: "learning-danger",
                disabled: !l(b)("delete-language") || !l(t).profile,
                onClick: c[30] || (c[30] = (h) => oe("delete-language", {}, "删除当前语言的全部学习数据？未领取奖励也将放弃，已到账流水保留。"))
              }, "删除当前语言", 8, Yu),
              n("button", {
                type: "button",
                class: "learning-danger",
                disabled: !l(b)("clear"),
                onClick: c[31] || (c[31] = (h) => oe("clear", {}, "清空所有语言的目标、课程和记录？未领取奖励也将放弃。已到账流水不撤销。"))
              }, "清空全部学习数据", 8, Ku)
            ])
          ])) : g("", !0)
        ], 64)) : g("", !0)], 544), [[pa, !L.value]])], 8, mu),
        l(t).teacher ? (a(), i("div", {
          key: 0,
          class: "learning-pane is-chat",
          inert: !qe.value,
          "aria-hidden": !qe.value
        }, [P.value ? (a(), J(Ot, {
          key: 0,
          ref_key: "conversation",
          ref: j,
          target: "companion",
          state: l(t),
          disabled: !l(v),
          pending: l(o),
          onAction: w,
          onPresent: Ce,
          onProfile: ft
        }, null, 8, [
          "state",
          "disabled",
          "pending"
        ])) : g("", !0)], 8, Zu)) : g("", !0),
        !E.value && R.value === "work" && l(t).teacher ? (a(), i("button", {
          key: 1,
          type: "button",
          class: "learning-float is-companion",
          "aria-label": ct.value ? `和${l(t).teacher.name}聊天，有新消息` : `和${l(t).teacher.name}聊天`,
          onClick: gt
        }, [n("span", Qu, r([...l(t).teacher.name][0]), 1), ct.value ? (a(), i("span", Xu)) : g("", !0)], 8, Ju)) : g("", !0),
        !E.value && R.value === "chat" ? (a(), i("button", {
          key: 2,
          type: "button",
          class: "learning-float is-workbook",
          "aria-label": xe.value ? "回到练习本，有新指引" : "回到练习本",
          onClick: Ue
        }, [H(K, { name: "workbook" }), xe.value ? (a(), i("span", td)) : g("", !0)], 8, ed)) : g("", !0),
        l(yt) ? (a(), i("aside", {
          key: 3,
          class: se(["learning-companion-bubble", { "is-wide": E.value }]),
          "aria-live": "polite"
        }, [n("button", {
          type: "button",
          onClick: c[32] || (c[32] = (h) => {
            gt(), l(it)();
          })
        }, r(l(yt)), 1), n("button", {
          type: "button",
          "aria-label": "收起这句话",
          onClick: c[33] || (c[33] = (...h) => l(it) && l(it)(...h))
        }, [H(K, { name: "close" })])], 2)) : g("", !0)
      ], 2),
      _.value ? g("", !0) : (a(), J(Ht, {
        key: 3,
        state: l(t),
        onAction: w
      }, null, 8, ["state"])),
      l(t).unit && _.value ? (a(), J(_n, {
        key: `${l(t).chatIdentity}:${l(t).language}:${l(t).unit.id}:${_.value.kind}:${_.value.id}`,
        state: l(t),
        target: _.value,
        disabled: !l(d),
        onAction: w,
        onClose: Xe,
        onAsk: bt
      }, null, 8, [
        "state",
        "target",
        "disabled"
      ])) : g("", !0),
      ie.value ? (a(), i("div", {
        key: 5,
        ref_key: "confirmLayer",
        ref: mt,
        class: "learning-confirm-shade",
        onKeydown: c[36] || (c[36] = Oe(de((h) => ie.value = null, ["stop", "prevent"]), ["esc"]))
      }, [n("section", ad, [
        n("h2", nd, r(l(Lt)[ie.value.action].title), 1),
        n("p", null, r(ie.value.text), 1),
        n("div", id, [n("button", {
          autofocus: "",
          type: "button",
          onClick: c[34] || (c[34] = (h) => ie.value = null)
        }, r(["language", "teacher"].includes(ie.value.action) ? l(ye).keepEditing : s.cancel), 1), n("button", {
          type: "button",
          class: "learning-primary",
          disabled: !l(b)(ie.value.action),
          onClick: c[35] || (c[35] = (h) => {
            nt(ie.value.action, ie.value.input, !0), ie.value = null;
          })
        }, r(l(Lt)[ie.value.action].accept), 9, ld)])
      ])], 544)) : g("", !0)
    ], 4));
  }
}), cd = sd;
export {
  cd as default
};
