/* eslint-disable */
import { $ as r, C as Nt, E as re, F as t, G as X, H as G, I as qt, J as be, L as j, M as pe, O as fe, Q as de, V as Ot, W as Vt, X as Ut, Y as F, Z as Dt, _ as i, a as Se, b as W, c as me, et as ae, g as b, h as Y, i as jt, l as te, m as a, nt as s, o as ne, p as L, tt as vt, u as M, w as _e, x as Q, y as z, z as Wt } from "./xiaobai-os-runtime-dom.esm-bundler-DgjJUtuO.js";
import { n as Ae, r as ct } from "./xiaobai-os-app-navigation-DS43A6sJ.js";
import { t as gt } from "./xiaobai-os-MessageMarkdown-bs_FqyUr.js";
var Oe = /* @__PURE__ */ new WeakMap(), et = [
  "select",
  "input",
  "keyup",
  "pointerup",
  "scroll"
], Re = {
  mounted(e, p) {
    const l = p.value, n = l.cursor, o = () => {
      l.cursor = {
        start: e.selectionStart,
        end: e.selectionEnd,
        direction: e.selectionDirection,
        top: e.scrollTop,
        left: e.scrollLeft
      };
    };
    Oe.set(e, o);
    for (const u of et) e.addEventListener(u, o, { passive: !0 });
    re(() => {
      !e.isConnected || !n || (e.setSelectionRange(n.start, n.end, n.direction), e.scrollTop = n.top, e.scrollLeft = n.left);
    });
  },
  beforeUnmount(e) {
    const p = Oe.get(e);
    if (p) {
      p();
      for (const l of et) e.removeEventListener(l, p);
      Oe.delete(e);
    }
  }
}, Pt = ["disabled"], zt = {
  key: 0,
  class: "learning-choices"
}, Ft = [
  "type",
  "checked",
  "onChange"
], Ht = { class: "learning-option-letter" }, Gt = {
  key: 1,
  class: "learning-order"
}, Kt = [
  "disabled",
  "aria-label",
  "onClick"
], Yt = [
  "disabled",
  "aria-label",
  "onClick"
], Zt = {
  key: 2,
  class: "learning-fields"
}, Jt = ["onUpdate:modelValue"], Qt = ["value"], Xt = {
  key: 3,
  class: "learning-choices"
}, _t = ["checked", "onChange"], ea = {
  key: 0,
  class: "learning-muted"
}, ta = {
  key: 4,
  class: "learning-fields"
}, aa = ["onUpdate:modelValue"], na = {
  key: 5,
  class: "learning-writing"
}, ia = ["disabled"], la = /* @__PURE__ */ Q({
  __name: "AnswerInput",
  props: /* @__PURE__ */ _e({
    response: {},
    paragraphs: {},
    disabled: { type: Boolean }
  }, {
    modelValue: { required: !0 },
    modelModifiers: {}
  }),
  emits: /* @__PURE__ */ _e(["submit"], ["update:modelValue"]),
  setup(e, { emit: p }) {
    const l = e, n = p, o = Ot(e, "modelValue");
    function u(f) {
      l.response.kind === "choice" && !l.response.multiple ? o.value.picked = [f] : o.value.picked = o.value.picked.includes(f) ? o.value.picked.filter((d) => d !== f) : [...o.value.picked, f];
    }
    function v(f, d) {
      const h = [...o.value.order];
      [h[f], h[f + d]] = [h[f + d], h[f]], o.value.order = h;
    }
    const c = L(() => {
      const f = l.response;
      return f.kind === "text" ? !!o.value.text.trim() : f.kind === "gaps" ? f.slots.every((d) => o.value.values[d.id]?.trim()) : f.kind === "match" ? f.left.every((d) => o.value.values[d.id]) : f.kind === "order" ? !0 : o.value.picked.length > 0;
    });
    function $() {
      const f = l.response;
      !c.value || l.disabled || (f.kind === "text" ? n("submit", {
        kind: "text",
        text: o.value.text
      }) : f.kind === "gaps" ? n("submit", {
        kind: "gaps",
        values: f.slots.map((d) => ({
          id: d.id,
          text: o.value.values[d.id]
        }))
      }) : f.kind === "match" ? n("submit", {
        kind: "match",
        pairs: f.left.map((d) => ({
          left: d.id,
          right: o.value.values[d.id]
        }))
      }) : n("submit", {
        kind: f.kind,
        ids: [...f.kind === "order" ? o.value.order : o.value.picked]
      }));
    }
    return (f, d) => (t(), i("form", {
      class: "learning-answer",
      onSubmit: te($, ["prevent"])
    }, [a("fieldset", { disabled: e.disabled }, [
      d[3] || (d[3] = a("legend", { class: "learning-sr-only" }, "你的回答", -1)),
      e.response.kind === "choice" ? (t(), i("div", zt, [(t(!0), i(M, null, j(e.response.options, (h, w) => (t(), i("label", {
        key: h.id,
        class: ae({ selected: o.value.picked.includes(h.id) })
      }, [
        a("input", {
          type: e.response.multiple ? "checkbox" : "radio",
          name: "answer-choice",
          checked: o.value.picked.includes(h.id),
          onChange: (k) => u(h.id)
        }, null, 40, Ft),
        a("span", Ht, s(String.fromCharCode(65 + w)), 1),
        a("span", null, s(h.text), 1)
      ], 2))), 128))])) : e.response.kind === "order" ? (t(), i("ol", Gt, [(t(!0), i(M, null, j(o.value.order, (h, w) => (t(), i("li", { key: h }, [
        a("span", null, s(e.response.options.find((k) => k.id === h)?.text), 1),
        a("button", {
          type: "button",
          disabled: w === 0,
          "aria-label": `上移第 ${w + 1} 项`,
          onClick: (k) => v(w, -1)
        }, "↑", 8, Kt),
        a("button", {
          type: "button",
          disabled: w === o.value.order.length - 1,
          "aria-label": `下移第 ${w + 1} 项`,
          onClick: (k) => v(w, 1)
        }, "↓", 8, Yt)
      ]))), 128))])) : e.response.kind === "match" ? (t(), i("div", Zt, [(t(!0), i(M, null, j(e.response.left, (h) => (t(), i("label", { key: h.id }, [z(s(h.text) + " ", 1), X(a("select", { "onUpdate:modelValue": (w) => o.value.values[h.id] = w }, [d[1] || (d[1] = a("option", { value: "" }, "选择对应项", -1)), (t(!0), i(M, null, j(e.response.right, (w) => (t(), i("option", {
        key: w.id,
        value: w.id
      }, s(w.text), 9, Qt))), 128))], 8, Jt), [[Se, o.value.values[h.id]]])]))), 128))])) : e.response.kind === "evidence" ? (t(), i("div", Xt, [(t(!0), i(M, null, j(e.paragraphs, (h) => (t(), i("label", {
        key: h.id,
        class: ae({ selected: o.value.picked.includes(h.id) })
      }, [a("input", {
        type: "checkbox",
        checked: o.value.picked.includes(h.id),
        onChange: (w) => u(h.id)
      }, null, 40, _t), a("span", null, s(h.text), 1)], 2))), 128)), e.paragraphs.length ? b("", !0) : (t(), i("p", ea, "请先展开相关文稿，再选择原文依据。"))])) : e.response.kind === "gaps" ? (t(), i("div", ta, [(t(!0), i(M, null, j(e.response.slots, (h) => (t(), i("label", { key: h.id }, [z(s(h.text), 1), X(a("input", {
        "onUpdate:modelValue": (w) => o.value.values[h.id] = w,
        type: "text",
        maxlength: "4000",
        autocomplete: "off"
      }, null, 8, aa), [[ne, o.value.values[h.id]]])]))), 128))])) : (t(), i("label", na, [d[2] || (d[2] = a("span", { class: "learning-sr-only" }, "你的回答", -1)), X(a("textarea", {
        "onUpdate:modelValue": d[0] || (d[0] = (h) => o.value.text = h),
        rows: "6",
        maxlength: "4000",
        placeholder: "写下你的回答…"
      }, null, 512), [[ne, o.value.text], [r(Re), o.value]])])),
      a("button", {
        class: "learning-primary",
        type: "submit",
        disabled: !c.value
      }, "交给语伴 →", 8, ia)
    ], 8, Pt)], 32));
  }
}), mt = la, bt = 2e3, sa = ["stroke-width"], ra = ["d"], oa = /* @__PURE__ */ Q({
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
    return (l, n) => (t(), i("svg", {
      class: "learning-icon",
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      "stroke-width": e.name === "more" ? 3.5 : 1.7,
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      "aria-hidden": "true"
    }, [a("path", { d: p[e.name] }, null, 8, ra)], 8, sa));
  }
}), H = oa, we = Object.freeze({
  select: "引用这段",
  ask: "问语伴",
  listen: "朗读",
  dismiss: "取消引用"
});
function ua(e, p, l) {
  if (!l?.rangeCount || l.isCollapsed) return null;
  const n = l.getRangeAt(0), o = n.startContainer, u = (o instanceof Element ? o : o.parentElement)?.closest("[data-learning-text]");
  if (!u || !e.contains(u) || !u.contains(n.endContainer)) return null;
  const v = p.find((h) => h.id === u.dataset.materialId), c = v?.paragraphs.find((h) => h.id === u.dataset.paragraphId);
  if (!v || !c) return null;
  const $ = n.cloneRange();
  $.selectNodeContents(u), $.setEnd(n.startContainer, n.startOffset);
  const f = $.toString().length, d = n.toString();
  return !d.trim() || [...d].length > 2e3 || c.text.slice(f, f + d.length) !== d ? null : {
    materialId: v.id,
    paragraphId: c.id,
    start: f,
    end: f + d.length,
    quote: d
  };
}
function pt(e, p, l) {
  const n = () => {
    if (!e.value) return;
    const o = ua(e.value, p(), window.getSelection());
    o && l(o);
  };
  pe(() => document.addEventListener("selectionchange", n)), fe(() => document.removeEventListener("selectionchange", n));
}
var da = { class: "learning-source" }, va = { key: 0 }, ca = ["href"], ga = {
  key: 0,
  class: "learning-listening-cover"
}, ma = ["disabled"], ba = {
  key: 1,
  class: "learning-material-body"
}, pa = ["data-material-id", "data-paragraph-id"], fa = ["disabled", "onClick"], ya = {
  class: "learning-audio-parts",
  "aria-label": "材料朗读分段"
}, ka = ["disabled", "onClick"], ha = { key: 2 }, $a = /* @__PURE__ */ Q({
  __name: "MaterialReader",
  props: {
    material: {},
    disabled: { type: Boolean },
    exerciseId: {}
  },
  emits: ["action", "select"],
  setup(e, { emit: p }) {
    const l = e, n = p, o = F(null);
    pt(o, () => [l.material], (v) => n("select", v));
    function u(v) {
      n("select", {
        materialId: l.material.id,
        paragraphId: v.id,
        start: 0,
        end: v.text.length,
        quote: v.text
      });
    }
    return (v, c) => (t(), i("article", {
      ref_key: "root",
      ref: o,
      class: "learning-material"
    }, [
      a("h2", null, s(e.material.title), 1),
      a("div", da, [e.material.provenance.kind === "authored" ? (t(), i("span", va, "语伴自编练习")) : (t(), i("a", {
        key: 1,
        href: e.material.provenance.url,
        target: "_blank",
        rel: "noopener noreferrer"
      }, s(e.material.provenance.kind === "original" ? "原文节选" : "改编自") + " · " + s(e.material.provenance.title) + " ↗", 9, ca))]),
      e.material.hidden ? (t(), i("div", ga, [c[1] || (c[1] = a("svg", {
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
        onClick: c[0] || (c[0] = ($) => n("action", "reveal", {
          kind: "transcripts",
          id: e.material.id
        }))
      }, "看文稿", 8, ma)])) : (t(), i("div", ba, [(t(!0), i(M, null, j(e.material.paragraphs, ($) => (t(), i("div", {
        key: $.id,
        class: "learning-paragraph"
      }, [a("p", {
        tabindex: "0",
        "data-learning-text": "",
        "data-material-id": e.material.id,
        "data-paragraph-id": $.id
      }, s($.text), 9, pa), a("button", {
        type: "button",
        disabled: [...$.text].length > r(bt),
        onClick: (f) => u($)
      }, s(r(we).select), 9, fa)]))), 128))])),
      a("div", ya, [(t(!0), i(M, null, j(e.material.parts, ($) => (t(), i("button", {
        key: $.key,
        type: "button",
        disabled: e.disabled,
        onClick: (f) => n("action", "play", {
          materialId: e.material.id,
          partKey: $.key,
          exerciseId: e.exerciseId
        })
      }, [W(H, { name: "play" }), z(s(e.material.parts.length > 1 ? `听第 ${$.number} 段` : "播放朗读"), 1)], 8, ka))), 128))]),
      e.material.parts.length ? (t(), i("small", ha, "TTS 合成朗读")) : b("", !0)
    ], 512));
  }
}), tt = $a;
function De(e, p, l = []) {
  const n = (o) => p.kind === "choice" || p.kind === "order" ? p.options.find((u) => u.id === o)?.text ?? o : l.find((u) => u.id === o)?.text ?? o;
  return e.kind === "text" ? e.text : e.kind === "gaps" ? e.values.map((o) => `${p.kind === "gaps" ? p.slots.find((u) => u.id === o.id)?.text ?? "" : ""} ${o.text}`).join(`
`) : e.kind === "match" ? e.pairs.map((o) => p.kind === "match" ? `${p.left.find((u) => u.id === o.left)?.text} → ${p.right.find((u) => u.id === o.right)?.text}` : "").join(`
`) : e.ids.map(n).join(e.kind === "order" ? " → " : `
`);
}
var wa = { class: "learning-feedback" }, xa = { class: "learning-muted" }, Ca = { key: 0 }, Ia = { key: 1 }, La = { key: 0 }, Sa = { key: 1 }, Aa = { key: 2 }, Ma = {
  key: 3,
  class: "learning-muted"
}, Ra = ["disabled"], Ta = ["disabled"], Ba = /* @__PURE__ */ Q({
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
    return (l, n) => (t(), i("section", wa, [
      n[6] || (n[6] = a("p", { class: "learning-eyebrow" }, "已保存的原答", -1)),
      a("blockquote", null, s(r(De)(e.attempt.answer, e.response, e.paragraphs)), 1),
      a("small", xa, [
        z(s(e.attempt.help.feedback ? "得到反馈后的再练" : e.attempt.help.answer || e.attempt.help.hint || e.attempt.help.transcript ? "这次有辅助" : "未使用答案或提示"), 1),
        e.attempt.help.replays ? (t(), i("span", Ca, " · 重听 " + s(e.attempt.help.replays) + " 次", 1)) : b("", !0),
        e.attempt.help.slowPlayback ? (t(), i("span", Ia, " · 慢放")) : b("", !0)
      ]),
      e.feedback ? (t(), i(M, { key: 0 }, [
        a("h3", null, s(p[e.feedback.verdict]), 1),
        e.feedback.understanding ? (t(), i("p", La, [n[2] || (n[2] = a("b", null, "理解", -1)), z(s(e.feedback.understanding), 1)])) : b("", !0),
        e.feedback.expression ? (t(), i("p", Sa, [n[3] || (n[3] = a("b", null, "表达", -1)), z(s(e.feedback.expression), 1)])) : b("", !0),
        e.feedback.guidance ? (t(), i("p", Aa, [n[4] || (n[4] = a("b", null, "批注", -1)), z(s(e.feedback.guidance), 1)])) : b("", !0),
        e.revised ? (t(), i("small", Ma, "这篇已有修改稿，结果以修改稿的批改为准。")) : (t(), i("button", {
          key: 4,
          type: "button",
          disabled: e.disabled,
          onClick: n[0] || (n[0] = (o) => l.$emit("action", "assess", {
            attemptId: e.attempt.id,
            review: !0,
            message: "请重新审视我的原答与题目。也请考虑其他有效表达，不只对照原来的答案键。"
          }))
        }, s(e.feedback.verdict === "disputed" ? "请语伴复核" : "有疑问，请复核"), 9, Ra))
      ], 64)) : (t(), i(M, { key: 1 }, [n[5] || (n[5] = a("p", null, "原答已保存，等待语伴评估。", -1)), a("button", {
        type: "button",
        disabled: e.disabled,
        onClick: n[1] || (n[1] = (o) => l.$emit("action", "assess", {
          attemptId: e.attempt.id,
          review: !1,
          message: "请评估这条已经保存的原答。"
        }))
      }, "重试评估", 8, Ta)], 64))
    ]));
  }
}), ft = Ba, yt = {
  unassessed: "还没练过",
  review: "待确认",
  independent: "已能独立使用",
  practised: "练过一次",
  strengthen: "再练练"
}, kt = (e) => `${e} 次作答`, ht = (e) => `${e} 个知识点可以温习了`, Ue = {
  settings: "声音设置",
  enable: "开启语音"
}, Z = {
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
}, at = {
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
}, xe = {
  lesson: "本次练习的材料、作答和笔记会删除；已收入学习本的记录和已获得的奖励会保留。",
  review: "这组已答的题会删除，复习时间安排不变。"
}, Ea = {
  key: 0,
  class: "learning-player",
  "aria-label": "课堂朗读"
}, Na = {
  key: 0,
  role: "status"
}, qa = {
  key: 2,
  class: "learning-row"
}, Oa = ["aria-label", "disabled"], Va = ["max", "value"], Ua = /* @__PURE__ */ Q({
  __name: "LearningPlayer",
  props: { state: {} },
  emits: ["action"],
  setup(e, { emit: p }) {
    const l = p;
    function n(o) {
      return `${Math.floor(o / 60)}:${String(Math.floor(o % 60)).padStart(2, "0")}`;
    }
    return (o, u) => e.state.media.status !== "idle" ? (t(), i("section", Ea, [
      e.state.media.message ? (t(), i("p", Na, s(e.state.media.message), 1)) : b("", !0),
      e.state.voices.enabled ? b("", !0) : (t(), i("button", {
        key: 1,
        type: "button",
        onClick: u[0] || (u[0] = (v) => l("action", "tts-settings"))
      }, s(r(Ue).enable), 1)),
      e.state.media.key ? (t(), i("div", qa, [
        W(H, { name: "sound" }),
        a("span", null, s(e.state.media.status === "loading" ? "正在生成声音…" : `${n(e.state.media.position)} / ${n(e.state.media.duration)}`), 1),
        e.state.media.status === "playing" ? (t(), i("button", {
          key: 0,
          type: "button",
          "aria-label": "暂停",
          onClick: u[1] || (u[1] = (v) => l("action", "pause"))
        }, [W(H, { name: "pause" })])) : [
          "paused",
          "ended",
          "blocked"
        ].includes(e.state.media.status) ? (t(), i("button", {
          key: 1,
          type: "button",
          "aria-label": e.state.media.status === "ended" ? "再听一遍" : "继续播放",
          disabled: e.state.busy,
          onClick: u[2] || (u[2] = (v) => l("action", "resume"))
        }, [W(H, { name: "play" })], 8, Oa)) : b("", !0),
        a("button", {
          type: "button",
          "aria-label": "停止",
          onClick: u[3] || (u[3] = (v) => l("action", "stop"))
        }, [W(H, { name: "stop" })]),
        e.state.media.duration ? (t(), i("button", {
          key: 2,
          type: "button",
          onClick: u[4] || (u[4] = (v) => l("action", "rate", { value: e.state.media.rate === 1 ? 0.75 : 1 }))
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
        onChange: u[5] || (u[5] = (v) => l("action", "seek", { value: Number(v.target.value) }))
      }, null, 40, Va)) : b("", !0)
    ])) : b("", !0);
  }
}), $t = Ua, Da = { class: "learning-selection" }, ja = { class: "learning-row" }, Wa = ["disabled"], Pa = /* @__PURE__ */ Q({
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
    return (p, l) => (t(), i("div", Da, [a("blockquote", null, s(e.selection.quote), 1), a("div", ja, [
      a("button", {
        type: "button",
        onClick: l[0] || (l[0] = (n) => p.$emit("ask"))
      }, s(r(we).ask), 1),
      a("button", {
        type: "button",
        disabled: e.disabled || [...e.selection.quote].length > 1e3,
        onClick: l[1] || (l[1] = (n) => p.$emit("say"))
      }, s(r(we).listen), 9, Wa),
      a("button", {
        type: "button",
        onClick: l[2] || (l[2] = (n) => p.$emit("dismiss"))
      }, s(r(we).dismiss), 1)
    ])]));
  }
}), wt = Pa;
function Me(e) {
  return {
    picked: [],
    text: "",
    values: {},
    order: e.kind === "order" ? e.options.map((p) => p.id) : []
  };
}
function nt(e, p) {
  const l = Me(p);
  return !!e.text.trim() || !!e.picked.length || Object.values(e.values).some((n) => !!n.trim()) || e.order.length !== l.order.length || e.order.some((n, o) => n !== l.order[o]);
}
function xt(e) {
  const p = (l) => l.trim() || null;
  return {
    exam: p(e.exam),
    level: p(e.level),
    targetLevel: p(e.targetLevel),
    explanationLanguage: e.explanationLanguage,
    interests: p(e.interests)
  };
}
var it = () => ({
  text: "",
  cursor: void 0,
  focus: null,
  sent: null,
  scroll: 0,
  following: !0
});
function za() {
  const e = be({}), p = be(it()), l = be({
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
    chat: p,
    settings: l,
    companion: n,
    setup: o,
    books: u,
    unit(v) {
      return e[v] ??= {
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
      }, e[v];
    },
    reset(v = !1) {
      for (const c of Object.keys(e)) delete e[c];
      Object.assign(p, it()), l.open = !1, l.submitted = null, n.enabled = !1, v || Object.assign(o, {
        step: 0,
        name: "",
        note: ""
      }), Object.assign(u, {
        tab: "grammar",
        reason: ""
      });
    },
    reconcile(v) {
      const c = l.submitted;
      c && v.storage === "ready" && !v.busy && v.profile && Object.entries(c.value).every(([f, d]) => v.profile.settings[f] === d) && (Object.entries(c.form).every(([f, d]) => l.form[f] === d) && (l.open = !1), l.submitted = null);
      for (const f of Object.keys(e)) {
        const d = [v.unit, v.review].find((w) => w?.id === f);
        if (!d) {
          delete e[f];
          continue;
        }
        for (const [w, k] of Object.entries(e[f].activityDrafts)) {
          const m = d.attempts.filter((g) => g.exerciseId === w).at(-1);
          if (k.submitted && m && m.id !== k.submitted.before) {
            delete e[f].activityDrafts[w];
            const g = e[f].activities[`exercise:${w}`];
            g && (g.retry = !1);
          }
        }
        const h = e[f].selection;
        h && d.materials.find((w) => w.id === h.materialId)?.paragraphs.find((w) => w.id === h.paragraphId)?.text.slice(h.start, h.end) !== h.quote && (e[f].selection = null);
        for (const [w, k] of Object.entries(e[f].writing)) {
          const m = d.attempts.filter((x) => x.exerciseId === w && !x.revisesAttemptId).at(-1), g = k.submitted;
          !g || !m || m.id === g.before || (k.text === g.text && m.answer.kind === "text" && m.answer.text === g.text.trim() ? (k.text = "", k.rewriting = !1) : k.rewriting = !0, k.submitted = null);
        }
      }
      const $ = p.sent;
      $ && v.conversation.turns.some((f, d) => d + v.conversation.removedTurns >= $.after && (f.purpose === "talk" || f.purpose === "explain") && f.user === $.user) && (p.text === $.text && (p.text = "", p.focus = null), p.sent = null);
    }
  };
}
var Ct = /* @__PURE__ */ Symbol("learning-ui-session");
function Fa(e, p) {
  if (e.chat.text.trim() || e.settings.open && Object.entries(xt(e.settings.form)).some(([l, n]) => p.profile?.settings[l] !== n) || e.setup.step === 1 && e.setup.name.trim() && (e.setup.name.trim() !== p.teacher?.name || e.setup.note.trim() !== p.teacher.note)) return !0;
  for (const l of [p.unit, p.review]) {
    const n = l && e.units[l.id];
    if (!(!l || !n)) {
      if (Object.values(n.writing).some((o) => !!o.text.trim()) || l.stage.stage === "revising" && l.assessments.some((o) => o.annotations?.some((u) => n.edits[u.id] && n.edits[u.id].value !== u.quote))) return !0;
      for (const o of l.exercises) {
        const u = n.activityDrafts[o.id]?.value, v = n.review.drafts[o.id];
        if (u && nt(u, o.response) || v && !l.attempts.some((c) => c.exerciseId === o.id) && nt(v, o.response)) return !0;
      }
    }
  }
  return !1;
}
function Ha(e) {
  const p = za();
  return qt(Ct, p), G([
    () => e.value.chatIdentity,
    () => e.value.language,
    () => e.value.teacher?.name
  ], (l, n) => p.reset(l[0] === n[0])), G(() => e.value, (l) => p.reconcile(l), { immediate: !0 }), G(() => e.value.currentUnitId, () => {
    p.chat.focus = null;
  }), G(() => Fa(p, e.value), (l, n, o) => {
    if (!l) return;
    const u = (v) => {
      v.preventDefault(), v.returnValue = "";
    };
    window.addEventListener("beforeunload", u), o(() => window.removeEventListener("beforeunload", u));
  }, { immediate: !0 }), p;
}
function ye() {
  const e = Nt(Ct);
  if (!e) throw new Error("Learning views require their application session");
  return e;
}
function ke(e) {
  const p = ye();
  return L(() => p.unit(e()));
}
var Ga = ["onKeydown"], Ka = {
  role: "dialog",
  "aria-labelledby": "learning-activity-title",
  class: "learning-activity"
}, Ya = { class: "learning-activity-header" }, Za = { id: "learning-activity-title" }, Ja = {
  key: 0,
  "aria-label": "完成本课的固定奖励"
}, Qa = {
  key: 0,
  class: "learning-margin-note",
  role: "status"
}, Xa = ["open"], _a = {
  key: 3,
  class: "learning-question"
}, en = { class: "learning-help-actions" }, tn = ["disabled"], an = ["disabled"], nn = ["disabled"], ln = {
  key: 0,
  class: "learning-margin-note"
}, sn = {
  key: 1,
  class: "learning-margin-note"
}, rn = { key: 0 }, on = { key: 1 }, un = { key: 2 }, dn = ["disabled"], vn = /* @__PURE__ */ Q({
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
    const l = e, n = p, o = F(null), u = ke(() => l.target.unitId), v = L(() => `${l.target.kind}:${l.target.id}`);
    G([u, v], () => {
      u.value.activities[v.value] ??= {
        scroll: 0,
        selected: null,
        retry: !1,
        materialsOpen: !1
      };
    }, { immediate: !0 });
    const c = L(() => u.value.activities[v.value]), $ = F(null), f = L({
      get: () => c.value.retry,
      set: (D) => {
        c.value.retry = D;
      }
    }), d = L({
      get: () => c.value.selected,
      set: (D) => {
        c.value.selected = D;
      }
    }), h = F(null);
    function w() {
      d.value ? d.value = null : f.value ? f.value = !1 : n("close");
    }
    ct(h, w);
    const k = L(() => u.value.activityDrafts);
    let m = null;
    const g = L(() => l.target?.kind === "exercise" ? l.state.unit?.exercises.find((D) => D.id === l.target?.id) : void 0), x = L(() => l.state.unit?.materials.filter((D) => l.target?.kind === "material" ? D.id === l.target.id : g.value?.materialIds.includes(D.id)) ?? []), K = L(() => g.value?.id ?? l.state.unit?.exercises.find((D) => D.skill === "listening" && D.materialIds.includes(l.target?.id ?? ""))?.id ?? l.state.unit?.exercises.find((D) => D.materialIds.includes(l.target?.id ?? ""))?.id), E = L(() => x.value.filter((D) => g.value?.response.kind !== "evidence" || D.id === g.value.response.materialId).flatMap((D) => D.paragraphs)), T = L(() => l.state.unit?.attempts.filter((D) => D.exerciseId === g.value?.id).at(-1)), S = L(() => l.state.unit?.assessments.find((D) => D.attemptId === T.value?.id));
    G(() => g.value, (D) => {
      if (!D) return;
      const N = JSON.stringify(D.response);
      k.value[D.id]?.response !== N && (k.value[D.id] = {
        response: N,
        value: Me(D.response)
      });
    }, { immediate: !0 });
    const O = L({
      get: () => k.value[g.value.id].value,
      set: (D) => {
        k.value[g.value.id].value = D;
      }
    });
    pe(() => {
      $.value?.focus({ preventScroll: !0 }), o.value && (o.value.scrollTop = c.value.scroll);
    }), fe(() => {
      o.value && (c.value.scroll = o.value.scrollTop);
    }), G(() => l.state.unit?.attempts, (D) => {
      if (!m) return;
      const N = D?.filter((P) => P.exerciseId === m.id).at(-1);
      if (N && N.id !== m.before) {
        const P = l.target?.kind === "exercise" && l.target.id === m.id;
        delete k.value[m.id], m = null, P && n("close");
      }
    });
    function U(D) {
      m = {
        id: g.value.id,
        before: T.value?.id
      }, k.value[g.value.id].submitted = { before: T.value?.id }, n("action", "submit", {
        unitId: l.state.unit.id,
        exerciseId: g.value.id,
        answer: D
      });
    }
    return (D, N) => (t(), i("div", {
      ref_key: "layer",
      ref: h,
      class: "learning-activity-shade",
      onKeydown: me(te(w, ["stop", "prevent"]), ["esc"])
    }, [a("section", Ka, [
      a("header", Ya, [
        a("h2", Za, s(g.value ? "练习" : x.value[0]?.title ?? "材料"), 1),
        e.state.unit ? (t(), i("small", Ja, "+" + s(e.state.unit.reward.amount) + " 币", 1)) : b("", !0),
        a("button", {
          ref_key: "closeButton",
          ref: $,
          type: "button",
          "aria-label": "收起课件",
          onClick: N[0] || (N[0] = (P) => n("close"))
        }, [N[18] || (N[18] = z("收起", -1)), W(H, { name: "back" })], 512)
      ]),
      e.state.message && !e.state.busy ? (t(), i("p", Qa, s(e.state.message), 1)) : b("", !0),
      a("div", {
        ref_key: "body",
        ref: o,
        class: "learning-activity-body"
      }, [
        g.value && x.value.length ? (t(), i("details", {
          key: 0,
          class: "learning-activity-materials",
          open: c.value.materialsOpen,
          onToggle: N[3] || (N[3] = (P) => c.value.materialsOpen = P.target.open)
        }, [a("summary", null, "阅读材料 · " + s(x.value.length), 1), (t(!0), i(M, null, j(x.value, (P) => (t(), Y(tt, {
          key: P.id,
          material: P,
          "exercise-id": K.value,
          disabled: e.disabled,
          onAction: N[1] || (N[1] = (q, B) => n("action", q, B)),
          onSelect: N[2] || (N[2] = (q) => d.value = q)
        }, null, 8, [
          "material",
          "exercise-id",
          "disabled"
        ]))), 128))], 40, Xa)) : g.value ? b("", !0) : (t(!0), i(M, { key: 1 }, j(x.value, (P) => (t(), Y(tt, {
          key: P.id,
          material: P,
          "exercise-id": K.value,
          disabled: e.disabled,
          onAction: N[4] || (N[4] = (q, B) => n("action", q, B)),
          onSelect: N[5] || (N[5] = (q) => d.value = q)
        }, null, 8, [
          "material",
          "exercise-id",
          "disabled"
        ]))), 128)),
        d.value ? (t(), Y(wt, {
          key: 2,
          selection: d.value,
          disabled: e.disabled,
          onAsk: N[6] || (N[6] = (P) => n("ask", K.value, d.value)),
          onSay: N[7] || (N[7] = (P) => n("action", "say", { selection: d.value })),
          onDismiss: N[8] || (N[8] = (P) => d.value = null)
        }, null, 8, ["selection", "disabled"])) : b("", !0),
        g.value ? (t(), i("section", _a, [
          a("h2", null, s(g.value.prompt), 1),
          a("div", en, [
            a("button", {
              type: "button",
              disabled: e.disabled || [...g.value.prompt].length > 1e3,
              onClick: N[9] || (N[9] = (P) => n("action", "say-question", { exerciseId: g.value.id }))
            }, "听题干", 8, tn),
            g.value.hasHint ? (t(), i("button", {
              key: 0,
              type: "button",
              disabled: e.disabled || g.value.hint !== null,
              onClick: N[10] || (N[10] = (P) => n("action", "reveal", {
                kind: "hints",
                id: g.value.id
              }))
            }, "提示", 8, an)) : b("", !0),
            a("button", {
              type: "button",
              disabled: e.disabled || g.value.solution !== null,
              onClick: N[11] || (N[11] = (P) => n("action", "reveal", {
                kind: "answers",
                id: g.value.id
              }))
            }, "解答", 8, nn),
            a("button", {
              type: "button",
              onClick: N[12] || (N[12] = (P) => n("ask", g.value.id))
            }, "问语伴")
          ]),
          g.value.hint ? (t(), i("p", ln, s(g.value.hint), 1)) : b("", !0),
          g.value.solution ? (t(), i("div", sn, [g.value.solution.kind === "exact" ? (t(), i("p", rn, s(r(De)(g.value.solution.answer, g.value.response, E.value)), 1)) : g.value.solution.kind === "gaps" ? (t(), i("p", on, s(g.value.solution.accepted.map((P) => P.forms.join(" / ")).join(`
`)), 1)) : b("", !0), g.value.solution.kind !== "semantic" ? (t(), i("p", un, s(g.value.solution.explanation), 1)) : (t(), i("button", {
            key: 3,
            type: "button",
            onClick: N[13] || (N[13] = (P) => n("ask", g.value.id))
          }, "请语伴讲解"))])) : b("", !0),
          (!T.value || f.value) && k.value[g.value.id] ? (t(), Y(mt, {
            key: g.value.id,
            modelValue: O.value,
            "onUpdate:modelValue": N[14] || (N[14] = (P) => O.value = P),
            response: g.value.response,
            paragraphs: E.value,
            disabled: e.disabled,
            onSubmit: U
          }, null, 8, [
            "modelValue",
            "response",
            "paragraphs",
            "disabled"
          ])) : b("", !0),
          T.value ? (t(), Y(ft, {
            key: 3,
            attempt: T.value,
            feedback: S.value,
            response: g.value.response,
            paragraphs: E.value,
            disabled: e.disabled,
            revised: !!e.state.unit?.attempts.some((P) => P.revisesAttemptId === T.value?.id),
            onAction: N[15] || (N[15] = (P, q) => {
              n("action", P, q), n("close");
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
            onClick: N[16] || (N[16] = (P) => {
              f.value = !f.value, k.value[g.value.id] ??= {
                response: JSON.stringify(g.value.response),
                value: r(Me)(g.value.response)
              };
            })
          }, s(f.value ? "收起再练" : "再试一次"), 9, dn)) : b("", !0)
        ])) : b("", !0)
      ], 512),
      W($t, {
        state: e.state,
        onAction: N[17] || (N[17] = (P, q) => n("action", P, q))
      }, null, 8, ["state"])
    ])], 40, Ga));
  }
}), cn = vn, gn = 864e5;
function lt(e, p) {
  return /^(zh|ja|ko)\b/iu.test(p) ? {
    count: [...e.replace(/[\s\p{P}\p{S}]/gu, "")].length,
    unit: "字"
  } : {
    count: e.match(/[\p{L}\p{N}][\p{L}\p{N}\p{M}'’-]*/gu)?.length ?? 0,
    unit: "词"
  };
}
function It(e, p) {
  const l = [], n = /* @__PURE__ */ new Map();
  for (const o of p)
    if (o.quote)
      for (let u = e.indexOf(o.quote); u >= 0; u = e.indexOf(o.quote, u + 1)) {
        const v = u + o.quote.length;
        if (!l.some(([c, $]) => u < $ && c < v)) {
          l.push([u, v]), n.set(o.id, u);
          break;
        }
      }
  return n;
}
function mn(e, p) {
  const l = e.split(/(\r?\n)/u), n = [];
  l.forEach((f, d) => {
    d % 2 === 0 && f.trim() && n.push(d);
  });
  const o = [], u = [], v = /* @__PURE__ */ new Map();
  for (const f of p) v.set(f.paragraphIndex, [...v.get(f.paragraphIndex) ?? [], f]);
  for (const [f, d] of v) {
    const h = n[f];
    if (h === void 0) {
      o.push(...d.map((g) => g.id));
      continue;
    }
    const w = It(l[h], d), k = d.filter((g) => w.has(g.id)).sort((g, x) => w.get(x.id) - w.get(g.id));
    let m = l[h];
    for (const g of k) {
      const x = w.get(g.id);
      m = m.slice(0, x) + g.replacement + m.slice(x + g.quote.length), g.replacement !== g.quote && u.push(g.id);
    }
    l[h] = m, o.push(...d.filter((g) => !w.has(g.id)).map((g) => g.id));
  }
  const c = new Map(p.map((f, d) => [f.id, d])), $ = (f, d) => c.get(f) - c.get(d);
  return {
    text: l.join(""),
    missing: o.sort($),
    applied: u.sort($)
  };
}
function bn(e, p) {
  const l = It(e, p), n = p.filter((v) => l.has(v.id)).map((v) => ({
    id: v.id,
    start: l.get(v.id),
    length: v.quote.length
  })).sort((v, c) => v.start - c.start), o = [];
  let u = 0;
  for (const v of n)
    v.start > u && o.push({ text: e.slice(u, v.start) }), o.push({
      text: e.slice(v.start, v.start + v.length),
      id: v.id
    }), u = v.start + v.length;
  return (u < e.length || !o.length) && o.push({ text: e.slice(u) }), o;
}
function pn(e, p = "xiaobai-learning-seen-units") {
  const l = /* @__PURE__ */ new Set(), n = () => {
    try {
      const o = JSON.parse(e()?.getItem(p) ?? "[]");
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
        e()?.setItem(p, JSON.stringify([.../* @__PURE__ */ new Set([...n(), o])].slice(-50)));
      } catch {
      }
    }
  };
}
var fn = () => {
  try {
    return globalThis.localStorage;
  } catch {
    return null;
  }
}, st = pn(fn);
function je(e, p = Date.now()) {
  const l = new Date(e), n = new Date(p), o = Math.round((Date.UTC(l.getFullYear(), l.getMonth(), l.getDate()) - Date.UTC(n.getFullYear(), n.getMonth(), n.getDate())) / gn);
  return !Number.isFinite(o) || o <= 0 ? "今天复习" : o === 1 ? "明天再见" : `${o} 天后再见`;
}
var yn = { class: "learning-records-page" }, kn = {
  key: 0,
  class: "learning-page-heading"
}, hn = {
  key: 0,
  class: "learning-muted"
}, $n = { class: "learning-muted" }, wn = {
  key: 0,
  class: "learning-muted"
}, xn = ["disabled", "onClick"], Cn = ["disabled"], In = {
  key: 0,
  class: "learning-empty-note"
}, Ln = ["disabled", "onClick"], Sn = ["title"], An = {
  key: 1,
  class: "learning-row"
}, Mn = ["disabled"], Rn = { class: "learning-muted" }, Tn = ["disabled"], Bn = /* @__PURE__ */ Q({
  __name: "LearningRecords",
  props: {
    state: {},
    disabled: { type: Boolean },
    embedded: { type: Boolean }
  },
  emits: ["action", "remove"],
  setup(e, { emit: p }) {
    const l = e, n = p;
    Ae(() => l.state.record ? (n("action", "records", { offset: l.state.records.offset }), !0) : !1);
    const o = {
      deleteAnswer: "删除这次作答",
      deleteRecord: "删除记录",
      answerWarning: "这次作答和对应的反馈会删除，相关知识点的掌握情况会更新。已到账奖励保留。",
      recordWarning: "这条学习记录会删除，仅属于它的历史作答也会删除。当前练习不受影响。",
      hidden: "听力原文暂未显示，下面是你的作答和点评。"
    };
    return (u, v) => (t(), i("section", yn, [!e.embedded || e.state.record ? (t(), i("div", kn, [v[5] || (v[5] = a("h1", null, "学习记录", -1)), e.state.records.total ? (t(), i("span", hn, s(e.state.records.total) + " 项", 1)) : b("", !0)])) : b("", !0), e.state.record ? (t(), i(M, { key: 1 }, [
      a("button", {
        type: "button",
        onClick: v[0] || (v[0] = (c) => u.$emit("action", "records", { offset: e.state.records.offset }))
      }, "‹ 返回记录"),
      a("h2", null, s(e.state.record.label), 1),
      (t(!0), i(M, null, j(e.state.record.evidence, (c) => (t(), i("article", {
        key: c.attempt.id,
        class: "learning-record-evidence"
      }, [
        a("p", $n, s(new Date(c.attempt.submittedAt).toLocaleDateString()), 1),
        a("h3", null, s(c.exercise.prompt), 1),
        (t(!0), i(M, null, j(c.materials, ($) => (t(), i("details", { key: $.id }, [a("summary", null, s($.title), 1), $.hidden ? (t(), i("p", wn, s(o.hidden), 1)) : (t(!0), i(M, { key: 1 }, j($.paragraphs, (f) => (t(), i("p", { key: f.id }, s(f.text), 1))), 128))]))), 128)),
        W(ft, {
          attempt: c.attempt,
          feedback: c.assessment,
          response: c.exercise.response,
          paragraphs: c.materials.flatMap(($) => $.paragraphs),
          disabled: e.disabled,
          revised: !!e.state.unit?.attempts.some(($) => $.revisesAttemptId === c.attempt.id),
          onAction: v[1] || (v[1] = ($, f) => u.$emit("action", $, f))
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
          onClick: ($) => u.$emit("remove", "delete-attempt", { id: c.attempt.id }, o.answerWarning)
        }, s(o.deleteAnswer), 9, xn)
      ]))), 128)),
      a("button", {
        type: "button",
        disabled: e.disabled,
        onClick: v[2] || (v[2] = (c) => u.$emit("remove", "delete-item", { id: e.state.record.id }, o.recordWarning))
      }, s(o.deleteRecord), 9, Cn)
    ], 64)) : (t(), i(M, { key: 2 }, [
      e.state.records.total ? b("", !0) : (t(), i("p", In, "暂无学习记录")),
      (t(!0), i(M, null, j(e.state.records.items, (c) => (t(), i("button", {
        key: c.id,
        class: "learning-record-row",
        type: "button",
        disabled: !c.readable,
        onClick: ($) => u.$emit("action", "records", {
          id: c.id,
          offset: e.state.records.offset
        })
      }, [a("span", null, [a("strong", null, s(c.label), 1), a("small", null, [z(s(r(kt)(c.evidenceCount)), 1), c.nextReviewAt ? (t(), i("span", {
        key: 0,
        title: c.scheduleReason ?? void 0
      }, " · " + s(r(je)(c.nextReviewAt)) + "（" + s(new Date(c.nextReviewAt).toLocaleDateString()) + "）", 9, Sn)) : b("", !0)])]), a("em", null, s(r(yt)[c.state]), 1)], 8, Ln))), 128)),
      e.state.records.total > 30 ? (t(), i("div", An, [
        a("button", {
          type: "button",
          disabled: e.state.records.offset === 0,
          onClick: v[3] || (v[3] = (c) => u.$emit("action", "records", { offset: Math.max(0, e.state.records.offset - 30) }))
        }, "上一页", 8, Mn),
        a("span", Rn, s(e.state.records.total) + " 项", 1),
        a("button", {
          type: "button",
          disabled: e.state.records.offset + 30 >= e.state.records.total,
          onClick: v[4] || (v[4] = (c) => u.$emit("action", "records", { offset: e.state.records.offset + 30 }))
        }, "下一页", 8, Tn)
      ])) : b("", !0)
    ], 64))]));
  }
}), rt = Bn, En = { class: "learning-books-page" }, Nn = { class: "learning-page-heading" }, qn = {
  key: 0,
  class: "learning-due"
}, On = { key: 0 }, Vn = { key: 1 }, Un = ["disabled"], Dn = {
  class: "learning-tabs",
  role: "tablist",
  "aria-label": "学习记录视图"
}, jn = ["aria-selected", "onClick"], Wn = {
  key: 0,
  class: "learning-empty-note"
}, Pn = { class: "learning-book-list" }, zn = ["disabled", "onClick"], Fn = ["aria-expanded", "onClick"], Hn = {
  key: 1,
  class: "learning-chip-reason"
}, Gn = {
  key: 2,
  class: "learning-growth"
}, Kn = {
  key: 0,
  class: "learning-empty-note"
}, Yn = { class: "learning-muted" }, Zn = { key: 0 }, Jn = { key: 0 }, Qn = { key: 1 }, Xn = { key: 2 }, _n = /* @__PURE__ */ Q({
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
    const l = e, n = p, o = ye().books, u = de(o, "tab"), v = [
      ["grammar", "语法本"],
      ["vocabulary", "生词本"],
      ["growth", "成长"],
      ["all", "全部记录"]
    ], c = { title: "学习本" }, $ = de(o, "reason"), f = L(() => u.value === "grammar" || u.value === "vocabulary" ? l.state.books[u.value] : []), d = L(() => l.state.growth), h = L(() => !!l.state.review && l.state.review.stage.stage !== "complete");
    return (w, k) => (t(), i("section", En, [e.state.record ? (t(), Y(rt, {
      key: 0,
      state: e.state,
      disabled: e.disabled,
      onAction: k[0] || (k[0] = (m, g) => n("action", m, g)),
      onRemove: k[1] || (k[1] = (m, g, x) => n("remove", m, g, x))
    }, null, 8, ["state", "disabled"])) : (t(), i(M, { key: 1 }, [
      a("div", Nn, [a("h1", null, s(c.title), 1)]),
      e.state.dueCount || h.value ? (t(), i("div", qn, [e.state.dueCount ? (t(), i("span", On, s(r(ht)(e.state.dueCount)), 1)) : b("", !0), e.state.blockedReview ? (t(), i("small", Vn, "有一组复习在另一个故事中进行，回到学习页可以放下它")) : h.value ? (t(), i("button", {
        key: 3,
        type: "button",
        class: "learning-primary",
        onClick: k[3] || (k[3] = (m) => n("review"))
      }, s(r(Z).resumeReview), 1)) : (t(), i("button", {
        key: 2,
        type: "button",
        class: "learning-primary",
        disabled: e.disabled,
        onClick: k[2] || (k[2] = (m) => n("action", "start-review"))
      }, s(r(Z).review), 9, Un))])) : b("", !0),
      a("div", Dn, [(t(), i(M, null, j(v, ([m, g]) => a("button", {
        key: m,
        type: "button",
        role: "tab",
        "aria-selected": u.value === m,
        onClick: (x) => {
          u.value = m, $.value = "";
        }
      }, s(g), 9, jn)), 64))]),
      u.value === "grammar" || u.value === "vocabulary" ? (t(), i(M, { key: 1 }, [f.value.length ? b("", !0) : (t(), i("p", Wn, s(u.value === "grammar" ? "批改里出现的语法问题会记到这里。" : "批改里的词汇问题、读文章时收藏的词语会记到这里。"), 1)), a("ul", Pn, [(t(!0), i(M, null, j(f.value, (m) => (t(), i("li", { key: m.id }, [
        a("button", {
          type: "button",
          class: "learning-book-item",
          disabled: !m.readable,
          onClick: (g) => n("action", "records", {
            id: m.id,
            offset: e.state.records.offset
          })
        }, [a("strong", null, s(m.label), 1), a("small", null, s(r(yt)[m.state]) + " · " + s(r(kt)(m.evidenceCount)), 1)], 8, zn),
        m.nextReviewAt ? (t(), i("button", {
          key: 0,
          type: "button",
          class: "learning-chip",
          "aria-expanded": $.value === m.id,
          onClick: (g) => $.value = $.value === m.id ? "" : m.id
        }, s(r(je)(m.nextReviewAt)), 9, Fn)) : b("", !0),
        $.value === m.id ? (t(), i("small", Hn, s(m.scheduleReason), 1)) : b("", !0)
      ]))), 128))])], 64)) : u.value === "growth" ? (t(), i("section", Gn, [d.value.enough ? (t(), i(M, { key: 1 }, [
        a("p", Yn, [z("来自 " + s(d.value.evidence) + " 份作答", 1), d.value.completed ? (t(), i("span", Zn, "、" + s(d.value.completed) + " 次完成", 1)) : b("", !0)]),
        d.value.steady.length ? (t(), i("div", Jn, [k[6] || (k[6] = a("h2", null, "已经稳定", -1)), a("p", null, s(d.value.steady.join("、")), 1)])) : b("", !0),
        d.value.practising.length ? (t(), i("div", Qn, [k[7] || (k[7] = a("h2", null, "最近独立做对", -1)), a("p", null, s(d.value.practising.join("、")), 1)])) : b("", !0),
        d.value.struggling.length ? (t(), i("div", Xn, [k[8] || (k[8] = a("h2", null, "还要再练", -1)), a("p", null, s(d.value.struggling.join("、")), 1)])) : b("", !0)
      ], 64)) : (t(), i("p", Kn, "还需要几次练习才看得出"))])) : (t(), Y(rt, {
        key: 3,
        embedded: "",
        state: e.state,
        disabled: e.disabled,
        onAction: k[4] || (k[4] = (m, g) => n("action", m, g)),
        onRemove: k[5] || (k[5] = (m, g, x) => n("remove", m, g, x))
      }, null, 8, ["state", "disabled"]))
    ], 64))]));
  }
}), ei = _n, ti = {
  class: "learning-settings-card",
  "aria-label": "训练设置"
}, ai = { key: 0 }, ni = ["disabled"], ii = ["open"], li = ["value"], si = { class: "learning-row" }, ri = ["disabled"], oi = /* @__PURE__ */ Q({
  __name: "LearningSettingsCard",
  props: {
    state: {},
    disabled: { type: Boolean },
    onboarding: { type: Boolean }
  },
  emits: ["action"],
  setup(e, { emit: p }) {
    const l = e, n = p, o = [
      ["zh-CN", "中文"],
      ["en", "English"],
      ["ja", "日本語"],
      ["ko", "한국어"]
    ], u = L(() => l.state.profile?.settings ?? null), v = ye().settings, c = v.form, $ = de(v, "open");
    function f() {
      Object.assign(c, {
        exam: u.value?.exam ?? "",
        level: u.value?.level ?? "",
        targetLevel: u.value?.targetLevel ?? "",
        explanationLanguage: u.value?.explanationLanguage ?? "zh-CN",
        interests: u.value?.interests ?? ""
      });
    }
    l.onboarding && !v.open && (f(), v.open = !0);
    const d = (m) => o.find(([g]) => g === m)?.[1] ?? new Intl.DisplayNames(["zh-CN"], { type: "language" }).of(m) ?? m, h = L(() => [.../* @__PURE__ */ new Set([...o.map(([m]) => m), u.value?.explanationLanguage ?? "zh-CN"])]), w = L(() => [
      ["考试", u.value?.exam || "不备考"],
      ["水平", u.value?.level || "不确定"],
      ["目标", u.value?.targetLevel || "比现在高一级"],
      ["讲解", d(u.value?.explanationLanguage ?? "zh-CN")],
      ["兴趣", u.value?.interests || "不限"]
    ]);
    function k() {
      const m = xt(c);
      v.submitted = {
        value: m,
        form: { ...c }
      }, n("action", "settings", { value: m });
    }
    return (m, g) => (t(), i("section", ti, [$.value ? b("", !0) : (t(), i("dl", ai, [(t(!0), i(M, null, j(w.value, ([x, K]) => (t(), i("div", { key: x }, [a("dt", null, s(x), 1), a("dd", null, s(K), 1)]))), 128))])), $.value ? (t(), i("form", {
      key: 2,
      class: "learning-fields",
      onSubmit: te(k, ["prevent"])
    }, [
      a("label", null, [g[7] || (g[7] = z("考试", -1)), X(a("input", {
        "onUpdate:modelValue": g[1] || (g[1] = (x) => r(c).exam = x),
        type: "text",
        maxlength: "80",
        placeholder: "不备考（例如 雅思、JLPT N2）"
      }, null, 512), [[ne, r(c).exam]])]),
      a("label", null, [g[8] || (g[8] = z("现在的水平", -1)), X(a("input", {
        "onUpdate:modelValue": g[2] || (g[2] = (x) => r(c).level = x),
        type: "text",
        maxlength: "80",
        placeholder: "不确定"
      }, null, 512), [[ne, r(c).level]])]),
      a("label", null, [g[9] || (g[9] = z("目标", -1)), X(a("input", {
        "onUpdate:modelValue": g[3] || (g[3] = (x) => r(c).targetLevel = x),
        type: "text",
        maxlength: "80",
        placeholder: "比现在高一级"
      }, null, 512), [[ne, r(c).targetLevel]])]),
      a("details", {
        class: "learning-settings-optional",
        open: !e.onboarding
      }, [
        a("summary", null, s(r(Z).optionalSettings), 1),
        a("label", null, [g[10] || (g[10] = z("讲解语言", -1)), X(a("select", { "onUpdate:modelValue": g[4] || (g[4] = (x) => r(c).explanationLanguage = x) }, [(t(!0), i(M, null, j(h.value, (x) => (t(), i("option", {
          key: x,
          value: x
        }, s(d(x)), 9, li))), 128))], 512), [[Se, r(c).explanationLanguage]])]),
        a("label", null, [g[11] || (g[11] = z("感兴趣的话题", -1)), X(a("input", {
          "onUpdate:modelValue": g[5] || (g[5] = (x) => r(c).interests = x),
          type: "text",
          maxlength: "200",
          placeholder: "不限"
        }, null, 512), [[ne, r(c).interests]])])
      ], 8, ii),
      a("div", si, [e.onboarding ? b("", !0) : (t(), i("button", {
        key: 0,
        type: "button",
        onClick: g[6] || (g[6] = (x) => {
          $.value = !1, r(v).submitted = null;
        })
      }, "取消")), a("button", {
        type: "submit",
        class: "learning-primary",
        disabled: e.disabled
      }, s(e.onboarding ? r(Z).setupFinish : r(Z).saveSettings), 9, ri)])
    ], 32)) : (t(), i("button", {
      key: 1,
      type: "button",
      disabled: e.disabled,
      onClick: g[0] || (g[0] = (x) => {
        f(), $.value = !0;
      })
    }, "调整", 8, ni))]));
  }
}), Lt = oi, ui = { class: "learning-profile-page" }, di = { class: "learning-setup-heading" }, vi = { class: "learning-eyebrow" }, ci = { class: "learning-language-options" }, gi = [
  "disabled",
  "aria-pressed",
  "onClick"
], mi = { "aria-hidden": "true" }, bi = ["disabled"], pi = {
  key: 0,
  class: "learning-setup-empty"
}, fi = { class: "learning-teacher-options" }, yi = [
  "disabled",
  "aria-pressed",
  "onClick"
], ki = { class: "learning-person-initial" }, hi = {
  key: 1,
  class: "learning-selected-teacher"
}, $i = { class: "learning-person-initial" }, wi = { key: 0 }, xi = ["open"], Ci = ["disabled"], Ii = ["disabled"], Li = ["disabled"], Si = { class: "learning-setup-actions" }, Ai = ["disabled"], Mi = ["disabled"], Ri = /* @__PURE__ */ Q({
  __name: "LearningSetup",
  props: {
    state: {},
    disabled: { type: Boolean }
  },
  emits: ["action"],
  setup(e, { emit: p }) {
    const l = p, n = ye().setup, o = de(n, "step"), u = F(null), v = de(n, "name"), c = de(n, "note"), $ = [
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
    async function f(d) {
      o.value = d, await re(), u.value?.focus();
    }
    return Ae(() => o.value ? (f(o.value - 1), !0) : !1), (d, h) => (t(), i("section", ui, [a("div", di, [a("p", vi, s(o.value + 1) + " / " + s(r(Z).setupSteps), 1), a("h1", {
      ref_key: "heading",
      ref: u,
      tabindex: "-1"
    }, s(o.value === 0 ? "选择要学习的语言" : o.value === 1 ? "选择语伴" : r(Z).setupTitle), 513)]), o.value === 0 ? (t(), i(M, { key: 0 }, [a("div", ci, [(t(), i(M, null, j($, ([w, k, m]) => a("button", {
      key: w,
      type: "button",
      disabled: e.disabled,
      "aria-pressed": e.state.language === w,
      onClick: (g) => l("action", "language", { language: w })
    }, [
      a("span", mi, s(m), 1),
      a("strong", null, s(k), 1),
      e.state.language === w ? (t(), Y(H, {
        key: 0,
        name: "check"
      })) : b("", !0)
    ], 8, gi)), 64))]), a("button", {
      type: "button",
      class: "learning-primary learning-setup-next",
      disabled: e.disabled,
      onClick: h[0] || (h[0] = (w) => f(1))
    }, [h[7] || (h[7] = z("继续", -1)), W(H, { name: "arrow" })], 8, bi)], 64)) : o.value === 1 ? (t(), i(M, { key: 1 }, [
      e.state.candidates.length ? b("", !0) : (t(), i("p", pi, "当前故事里还没有认识的人物，所以没有可选的语伴。可以在下面手动填一位：名字加一句身份说明。")),
      a("div", fi, [(t(!0), i(M, null, j(e.state.candidates, (w) => (t(), i("button", {
        key: w.name,
        type: "button",
        disabled: e.disabled,
        "aria-pressed": e.state.teacher?.name === w.name,
        onClick: (k) => l("action", "teacher", { teacher: {
          name: w.name,
          note: ""
        } })
      }, [
        a("span", ki, s([...w.name][0]), 1),
        a("strong", null, s(w.name), 1),
        e.state.teacher?.name === w.name ? (t(), Y(H, {
          key: 0,
          name: "check"
        })) : b("", !0)
      ], 8, yi))), 128))]),
      e.state.teacher && !e.state.candidates.some((w) => w.name === e.state.teacher?.name) ? (t(), i("p", hi, [
        a("span", $i, s([...e.state.teacher.name][0]), 1),
        a("span", null, [z(s(e.state.teacher.name), 1), e.state.teacher.note ? (t(), i("small", wi, s(e.state.teacher.note), 1)) : b("", !0)]),
        W(H, { name: "check" })
      ])) : b("", !0),
      a("details", {
        class: "learning-other-teacher",
        open: !e.state.candidates.length
      }, [a("summary", null, s(e.state.candidates.length ? "手动填写其他人物" : "手动填写"), 1), a("form", {
        class: "learning-fields",
        onSubmit: h[3] || (h[3] = te((w) => l("action", "teacher", { teacher: {
          name: v.value.trim(),
          note: c.value.trim()
        } }), ["prevent"]))
      }, [
        a("label", null, [h[8] || (h[8] = z("名字", -1)), X(a("input", {
          "onUpdate:modelValue": h[1] || (h[1] = (w) => v.value = w),
          type: "text",
          maxlength: "80",
          placeholder: "例如 林老师",
          disabled: e.disabled
        }, null, 8, Ci), [[ne, v.value]])]),
        a("label", null, [h[9] || (h[9] = z("一句身份说明", -1)), X(a("input", {
          "onUpdate:modelValue": h[2] || (h[2] = (w) => c.value = w),
          type: "text",
          maxlength: "200",
          placeholder: "例如 在东京长大的大学同学，说话直爽",
          disabled: e.disabled
        }, null, 8, Ii), [[ne, c.value]])]),
        a("button", {
          type: "submit",
          disabled: e.disabled || !v.value.trim()
        }, "选这位", 8, Li)
      ], 32)], 8, xi),
      a("div", Si, [a("button", {
        type: "button",
        disabled: e.disabled,
        onClick: h[4] || (h[4] = (w) => f(0))
      }, "上一步", 8, Ai), a("button", {
        type: "button",
        class: "learning-primary",
        disabled: e.disabled || !e.state.teacher,
        onClick: h[5] || (h[5] = (w) => f(2))
      }, [z(s(r(Z).setupContinue), 1), W(H, { name: "arrow" })], 8, Mi)])
    ], 64)) : (t(), Y(Lt, {
      key: 2,
      onboarding: "",
      state: e.state,
      disabled: e.disabled || !e.state.teacher,
      onAction: h[6] || (h[6] = (w, k) => l("action", w, k ?? {}))
    }, null, 8, ["state", "disabled"]))]));
  }
}), Ti = Ri, Bi = { class: "learning-companion-control" }, Ei = {
  key: 0,
  class: "learning-sr-only"
}, Ni = { class: "learning-companion-options" }, qi = { class: "learning-companion-switch" }, Oi = ["aria-label"], Vi = { class: "learning-cost-note" }, Ui = /* @__PURE__ */ Q({
  __name: "LearningCompanionControl",
  props: { name: {} },
  setup(e) {
    const p = de(ye().companion, "enabled"), l = {
      title: "陪读",
      on: "一起学习中",
      off: "未开启",
      description: "开启后语伴会和你一起学习",
      costTitle: "费用说明",
      cost: "陪读消息和聊天一样，按你所用的 AI 服务计费。"
    };
    return (n, o) => (t(), i("details", Bi, [a("summary", null, [
      a("span", {
        class: ae(["learning-companion-light", { "is-on": p.value }]),
        "aria-hidden": "true"
      }, null, 2),
      z(s(p.value ? e.name ? `${e.name} · ${l.on}` : l.on : l.title), 1),
      p.value ? b("", !0) : (t(), i("span", Ei, s(l.off), 1))
    ]), a("div", Ni, [a("label", qi, [a("span", null, s(l.description), 1), X(a("input", {
      "onUpdate:modelValue": o[0] || (o[0] = (u) => p.value = u),
      type: "checkbox",
      role: "switch",
      "aria-label": l.title
    }, null, 8, Oi), [[jt, p.value]])]), a("details", Vi, [a("summary", null, s(l.costTitle), 1), a("small", null, s(l.cost), 1)])])]));
  }
}), St = Ui, Ve = {
  unconfirmed: "还没确认保存是否成功，请先查看保存结果，不要重复提交。",
  conflict: "发现另一份学习记录，请先核对再继续。",
  unloaded: "暂时打不开学习记录。",
  failed: "这次没能保存，之前保存的内容都还在，请重试。"
}, se = {
  paid: "奖励已到账",
  retired: "钱包已重置，这份奖励不再补发",
  saving: "正在保存学习成果…",
  pending: "学习已完成，奖励待领取",
  needsWallet: "开通钱包后即可领取",
  claim: "领取奖励",
  openWallet: "开通钱包并领取",
  unknown: "学习已完成，奖励到账情况还没确认。请查看钱包状态，不需要重新做练习。"
}, zo = Object.freeze({
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
function ot(e) {
  return e.split(/\r?\n/u).filter((p) => p.trim());
}
var Di = {
  class: "learning-complete",
  role: "status",
  "aria-live": "polite"
}, ji = {
  key: 0,
  class: "learning-complete-burst",
  "aria-hidden": "true"
}, Wi = { class: "learning-complete-title" }, Pi = {
  key: 1,
  class: "learning-complete-amount"
}, zi = ["disabled"], Fi = /* @__PURE__ */ Q({
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
    const l = e, n = p, o = L(() => l.state.completions.find((v) => v.unitId === l.unitId)), u = L(() => {
      const v = o.value?.rewardStatus;
      return v === "paid" ? se.paid : v === "retired" ? se.retired : o.value ? l.state.walletOpen ? se.pending : se.needsWallet : se.saving;
    });
    return (v, c) => (t(), i("section", Di, [
      e.quiet ? b("", !0) : (t(), i("div", ji, [(t(), i(M, null, j(8, ($) => a("span", {
        key: $,
        style: vt({ "--i": $ })
      }, null, 4)), 64))])),
      a("p", Wi, s(e.label), 1),
      o.value?.rewardStatus !== "retired" ? (t(), i("p", Pi, [a("strong", null, s(o.value?.rewardStatus === "paid" ? "+" : "") + s(o.value?.amount ?? e.amount), 1), c[1] || (c[1] = a("span", null, "小白币", -1))])) : b("", !0),
      a("small", null, s(u.value), 1),
      o.value && o.value.rewardStatus !== "paid" && o.value.rewardStatus !== "retired" ? (t(), i("button", {
        key: 2,
        type: "button",
        disabled: e.disabled || e.state.walletStorage !== "ready",
        onClick: c[0] || (c[0] = ($) => n("action", "reward", {
          unitId: e.unitId,
          openWallet: !e.state.walletOpen
        }))
      }, s(e.state.walletOpen ? r(se).claim : r(se).openWallet), 9, zi)) : b("", !0)
    ]));
  }
}), At = Fi, Hi = ["aria-labelledby"], Gi = { id: "learning-grading-title" }, Ki = {
  key: 0,
  class: "learning-grading-actions"
}, Yi = {
  key: 0,
  class: "learning-annotation-missing",
  role: "status"
}, Zi = ["disabled"], Ji = ["disabled"], Qi = ["open", "onToggle"], Xi = {
  key: 0,
  class: "learning-revised-text"
}, _i = { class: "learning-write-saved" }, el = { key: 0 }, tl = {
  key: 1,
  class: "learning-graded-guidance"
}, al = ["open", "onToggle"], nl = { key: 0 }, il = { key: 1 }, ll = { key: 3 }, sl = { class: "learning-graded-text" }, rl = { class: "learning-annotation-fixed" }, ol = {
  key: 0,
  class: "learning-annotation-missing"
}, ul = {
  key: 1,
  class: "learning-annotation-fixed"
}, dl = ["onClick"], vl = { class: "learning-annotation-tag" }, cl = {
  key: 0,
  class: "learning-annotation-suggestion"
}, gl = ["onSubmit"], ml = ["onUpdate:modelValue", "aria-label"], bl = ["disabled"], pl = { key: 2 }, fl = ["onClick"], yl = {
  key: 1,
  class: "learning-working",
  role: "status"
}, kl = ["disabled"], hl = ["disabled"], $l = {
  key: 3,
  class: "learning-model-essay"
}, wl = /* @__PURE__ */ Q({
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
    const l = e, n = p, o = {
      content: "内容",
      grammar: "语法",
      vocabulary: "词汇",
      cohesion: "衔接"
    }, u = {
      error: "需要改",
      improve: "可以更好",
      alternative: "另一种说法"
    }, v = {
      grammar: "语法本",
      vocabulary: "生词本"
    }, c = {
      title: "看看哪里能写得更好",
      unplaced: "这处改动还没写进作文。请调整后再提交，或跳过修改。"
    }, $ = (q) => q.itemId && (q.category === "grammar" || q.category === "vocabulary") ? v[q.category] : null, f = ke(() => l.unit.id), d = L(() => f.value.edits), h = L(() => l.unit.stage.stage), w = L(() => new Map(l.unit.materials.flatMap((q) => q.paragraphs).map((q, B) => [q.id, B + 1]))), k = (q) => q?.answer.kind === "text" ? q.answer.text : "", m = L(() => l.unit.stage.exercises.flatMap((q) => {
      const B = l.unit.exercises.find((_) => _.id === q.exerciseId), I = l.unit.attempts.find((_) => _.id === q.draftAttemptId);
      if (!B || !I) return [];
      const V = l.unit.assessments.find((_) => _.attemptId === I.id), R = l.unit.attempts.find((_) => _.id === q.revisionAttemptId), J = R && l.unit.assessments.find((_) => _.attemptId === R.id), ie = V?.annotations ?? [];
      return [{
        row: q,
        exercise: B,
        draft: I,
        assessment: V,
        revision: R,
        review: J,
        annotations: ie,
        label: B.paragraphId ? `第 ${w.value.get(B.paragraphId) ?? "?"} 段总结` : "作文",
        paragraphs: ot(k(I)).map((_, ve) => ({
          index: ve,
          segments: bn(_, ie.filter((ce) => ce.paragraphIndex === ve)),
          annotations: ie.filter((ce) => ce.paragraphIndex === ve)
        })),
        resolved: new Set(J?.resolvedAnnotationIds ?? [])
      }];
    }).sort((q, B) => +(B.annotations.length > 0) - +(q.annotations.length > 0))), g = (q) => h.value === "revising" && q.row.status === "revising", x = (q, B) => g(q) && B.severity !== "alternative";
    G(m, (q) => {
      for (const B of q.flatMap((I) => I.annotations)) d.value[B.id] ??= {
        value: B.quote,
        done: !1
      };
    }, { immediate: !0 });
    function K(q) {
      const B = d.value[q.id];
      B?.value.trim() && B.value !== q.quote && (B.done = !0);
    }
    const E = L(() => new Map(m.value.filter(g).map((q) => [q.draft.id, mn(k(q.draft), q.annotations.map((B) => ({
      id: B.id,
      paragraphIndex: B.paragraphIndex,
      quote: B.quote,
      replacement: d.value[B.id]?.done ? d.value[B.id].value : B.quote
    })))]))), T = L(() => new Set([...E.value.values()].flatMap((q) => q.missing))), S = L(() => [...E.value.values()].reduce((q, B) => q + B.applied.length, 0)), O = F("");
    G(S, () => {
      O.value = "";
    });
    const U = L(() => m.value.filter(g).flatMap((q) => q.annotations.filter((B) => B.severity !== "alternative")).length), D = (q, B) => {
      const I = q.annotations.find((V) => V.id === B);
      return I ? ["learning-mark", `is-${I.severity}`] : "";
    };
    function N() {
      const q = m.value.filter(g).flatMap((B) => {
        const I = E.value.get(B.draft.id);
        return !I || I.text === k(B.draft) ? [] : [{
          attemptId: B.draft.id,
          text: I.text
        }];
      });
      q.length ? n("action", "submit-revision", {
        unitId: l.unit.id,
        revisions: q
      }) : O.value = c.unplaced;
    }
    const P = L(() => l.state.pending?.unitId === l.unit.id ? l.state.pending.purpose : null);
    return (q, B) => (t(), i("section", {
      class: "learning-grading",
      "aria-labelledby": e.view === "feedback" ? "learning-grading-title" : void 0
    }, [
      e.view === "feedback" ? (t(), i(M, { key: 0 }, [
        a("h2", Gi, s(c.title), 1),
        h.value === "revising" ? (t(), i("div", Ki, [
          a("small", null, "已改 " + s(S.value) + " / " + s(U.value) + " 处", 1),
          O.value ? (t(), i("small", Yi, s(O.value), 1)) : b("", !0),
          a("button", {
            type: "button",
            disabled: e.disabled,
            onClick: B[0] || (B[0] = (I) => n("confirm", "skip-revision", { unitId: e.unit.id }, "跳过这次修改？批注会保留，直接进入范文。"))
          }, "跳过修改", 8, Zi),
          a("button", {
            type: "button",
            class: "learning-primary",
            disabled: e.disabled || !S.value,
            onClick: N
          }, "提交修改", 8, Ji)
        ])) : b("", !0),
        (t(!0), i(M, null, j(m.value, (I) => (t(), i("details", {
          key: I.exercise.id,
          class: "learning-graded",
          open: r(f).expanded[`grading:${I.draft.id}`] ?? I.annotations.length > 0,
          onToggle: (V) => r(f).expanded[`grading:${I.draft.id}`] = V.target.open
        }, [
          a("summary", null, [a("h3", null, s(I.label), 1)]),
          I.revision ? (t(), i("section", Xi, [
            a("h4", null, s(r(Z).revision), 1),
            a("p", _i, s(k(I.revision)), 1),
            I.review?.guidance ? (t(), i("p", el, s(I.review.guidance), 1)) : b("", !0)
          ])) : b("", !0),
          I.assessment?.guidance ? (t(), i("p", tl, s(I.assessment.guidance), 1)) : b("", !0),
          I.assessment && (I.assessment.understanding || I.assessment.expression) ? (t(), i("details", {
            key: 2,
            class: "learning-graded-more",
            open: r(f).expanded[`feedback:${I.draft.id}`],
            onToggle: (V) => r(f).expanded[`feedback:${I.draft.id}`] = V.target.open
          }, [
            B[6] || (B[6] = a("summary", null, "理解与表达点评", -1)),
            I.assessment.understanding ? (t(), i("p", nl, [B[4] || (B[4] = a("b", null, "理解", -1)), z(s(I.assessment.understanding), 1)])) : b("", !0),
            I.assessment.expression ? (t(), i("p", il, [B[5] || (B[5] = a("b", null, "表达", -1)), z(s(I.assessment.expression), 1)])) : b("", !0)
          ], 40, al)) : b("", !0),
          I.revision ? (t(), i("h4", ll, s(r(Z).original), 1)) : b("", !0),
          (t(!0), i(M, null, j(I.paragraphs, (V) => (t(), i("div", {
            key: V.index,
            class: "learning-graded-paragraph"
          }, [a("p", sl, [(t(!0), i(M, null, j(V.segments, (R, J) => (t(), i(M, { key: J }, [R.id ? (t(), i("mark", {
            key: 0,
            class: ae(D(I, R.id))
          }, s(R.text), 3)) : (t(), i(M, { key: 1 }, [z(s(R.text), 1)], 64))], 64))), 128))]), (t(!0), i(M, null, j(V.annotations, (R) => (t(), i("div", {
            key: R.id,
            class: ae(["learning-annotation", [`is-${R.severity}`, {
              "is-fixed": I.resolved.has(R.id),
              "is-edited": d.value[R.id]?.done && g(I)
            }]])
          }, [I.resolved.has(R.id) ? (t(), i(M, { key: 0 }, [a("p", rl, "✓ " + s(r(Z).resolved), 1), a("p", null, s(R.explanation), 1)], 64)) : d.value[R.id]?.done && g(I) ? (t(), i(M, { key: 1 }, [T.value.has(R.id) ? (t(), i("p", ol, "原文里找不到“" + s(R.quote) + "”，这处改动不会写进修改稿。", 1)) : (t(), i("p", ul, "✓ 改为“" + s(d.value[R.id].value) + "”", 1)), a("button", {
            type: "button",
            onClick: (J) => d.value[R.id].done = !1
          }, "再改", 8, dl)], 64)) : (t(), i(M, { key: 2 }, [
            a("p", vl, [a("span", null, s(u[R.severity]), 1), z(s(o[R.category]), 1)]),
            a("p", null, s(R.explanation), 1),
            R.suggestion ? (t(), i("p", cl, "可以写成：" + s(R.suggestion), 1)) : b("", !0),
            x(I, R) && d.value[R.id] ? (t(), i("form", {
              key: 1,
              class: "learning-annotation-edit",
              onSubmit: te((J) => K(R), ["prevent"])
            }, [X(a("textarea", {
              "onUpdate:modelValue": (J) => d.value[R.id].value = J,
              rows: "2",
              "aria-label": `改写：${R.quote}`,
              maxlength: "600"
            }, null, 8, ml), [[ne, d.value[R.id].value], [r(Re), d.value[R.id]]]), a("button", {
              type: "submit",
              disabled: !d.value[R.id].value.trim() || d.value[R.id].value === R.quote
            }, "改好了", 8, bl)], 40, gl)) : I.review && R.severity !== "alternative" ? (t(), i("small", pl, "复核时这里还没改到")) : b("", !0)
          ], 64)), $(R) ? (t(), i("button", {
            key: 3,
            type: "button",
            class: "learning-annotation-book",
            onClick: (J) => n("record", R.itemId)
          }, s($(R)) + " ↗", 9, fl)) : b("", !0)], 2))), 128))]))), 128))
        ], 40, Qi))), 128))
      ], 64)) : b("", !0),
      [
        "grading",
        "reviewing",
        "model"
      ].includes(h.value) ? (t(), i("div", yl, [P.value ? (t(), i(M, { key: 0 }, [
        B[7] || (B[7] = a("span", {
          class: "learning-working-dot",
          "aria-hidden": "true"
        }, null, -1)),
        a("span", null, s(P.value === "grade" ? r(Z).grading : P.value === "revision-review" ? r(Z).reviewing : r(Z).modelling), 1),
        a("button", {
          type: "button",
          disabled: e.pending,
          onClick: B[1] || (B[1] = (I) => n("action", "cancel"))
        }, s(r(Z).stop), 9, kl)
      ], 64)) : (t(), i("button", {
        key: 1,
        type: "button",
        class: "learning-primary",
        disabled: e.disabled,
        onClick: B[2] || (B[2] = (I) => n("action", "grade", { unitId: e.unit.id }))
      }, s(h.value === "grading" ? r(Z).grade : r(Z).continue), 9, hl))])) : b("", !0),
      e.view === "model" && h.value === "complete" ? (t(), Y(At, {
        key: 2,
        state: e.state,
        "unit-id": e.unit.id,
        amount: e.unit.reward.amount,
        label: "本篇完成",
        disabled: e.disabled,
        onAction: B[3] || (B[3] = (I, V) => n("action", I, V))
      }, null, 8, [
        "state",
        "unit-id",
        "amount",
        "disabled"
      ])) : b("", !0),
      e.view === "model" && e.unit.modelEssay ? (t(), i("section", $l, [a("h3", null, [B[8] || (B[8] = z("范文", -1)), a("small", null, s(e.unit.modelEssay.level), 1)]), (t(!0), i(M, null, j(r(ot)(e.unit.modelEssay.text), (I, V) => (t(), i("p", { key: V }, s(I), 1))), 128))])) : b("", !0)
    ], 8, Hi));
  }
}), xl = wl, Cl = ["data-exercise-id"], Il = { class: "learning-write-label" }, Ll = [
  "aria-label",
  "placeholder",
  "rows",
  "onKeydown"
], Sl = { class: "learning-write-foot" }, Al = { "aria-live": "polite" }, Ml = ["disabled"], Rl = { class: "learning-write-saved" }, Tl = { class: "learning-write-foot" }, Bl = ["disabled"], El = /* @__PURE__ */ Q({
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
    const l = e, n = p, o = ke(() => l.unit.id);
    G([o, () => l.exercise.id], () => {
      o.value.writing[l.exercise.id] ??= {
        text: "",
        rewriting: !1,
        submitted: null
      };
    }, { immediate: !0 });
    const u = L(() => o.value.writing[l.exercise.id]), v = L({
      get: () => u.value.text,
      set: (E) => {
        u.value.text = E;
      }
    }), c = L({
      get: () => u.value.rewriting,
      set: (E) => {
        u.value.rewriting = E;
      }
    }), $ = L(() => l.unit.attempts.filter((E) => E.exerciseId === l.exercise.id && E.revisesAttemptId === void 0).at(-1)), f = L(() => l.unit.assessments.some((E) => E.attemptId === $.value?.id && E.verdict !== "disputed")), d = L(() => $.value?.answer.kind === "text" ? $.value.answer.text : ""), h = L(() => !$.value || c.value), w = L(() => ["writing", "grading"].includes(l.unit.stage.stage) && !f.value && !l.state.pending), k = L(() => lt(v.value, l.state.language)), m = L(() => lt(d.value, l.state.language)), g = L(() => l.state.conversation.summaryReviews.find((E) => E.attemptId === $.value?.id)?.text ?? "");
    function x() {
      l.disabled || !v.value.trim() || (u.value.submitted = {
        before: $.value?.id,
        text: v.value
      }, n("action", "submit", {
        unitId: l.unit.id,
        exerciseId: l.exercise.id,
        answer: {
          kind: "text",
          text: v.value.trim()
        }
      }));
    }
    function K() {
      v.value = d.value, c.value = !0;
    }
    return (E, T) => (t(), i("div", {
      class: ae(["learning-write", `is-${e.tone ?? "summary"}`]),
      "data-exercise-id": e.exercise.id
    }, [
      a("p", Il, s(e.label), 1),
      h.value ? (t(), i("form", {
        key: 0,
        onSubmit: te(x, ["prevent"])
      }, [X(a("textarea", {
        "onUpdate:modelValue": T[0] || (T[0] = (S) => v.value = S),
        "aria-label": e.label,
        placeholder: e.placeholder,
        maxlength: "4000",
        rows: e.tone === "essay" ? 8 : 3,
        onKeydown: [me(te(x, ["ctrl", "prevent"]), ["enter"]), me(te(x, ["meta", "prevent"]), ["enter"])]
      }, null, 40, Ll), [[ne, v.value], [r(Re), u.value]]), a("div", Sl, [
        a("small", Al, s(k.value.count) + " " + s(k.value.unit), 1),
        c.value ? (t(), i("button", {
          key: 0,
          type: "button",
          onClick: T[1] || (T[1] = (S) => {
            c.value = !1, v.value = "";
          })
        }, "取消")) : b("", !0),
        a("button", {
          type: "submit",
          class: "learning-primary",
          disabled: e.disabled || !v.value.trim()
        }, s($.value ? "保存新稿" : "提交"), 9, Ml)
      ])], 32)) : $.value ? (t(), i(M, { key: 1 }, [a("p", Rl, s(d.value), 1), a("div", Tl, [a("small", null, "已保存 · " + s(m.value.count) + " " + s(m.value.unit), 1), w.value ? (t(), i("button", {
        key: 0,
        type: "button",
        disabled: e.disabled,
        onClick: K
      }, "重写", 8, Bl)) : b("", !0)])], 64)) : b("", !0),
      g.value ? (t(), Y(gt, {
        key: 2,
        class: "learning-markdown learning-write-reply",
        text: g.value
      }, null, 8, ["text"])) : b("", !0)
    ], 10, Cl));
  }
}), Mt = El, Nl = ["data-paragraph-id", "data-material-id"], ql = { class: "learning-reading-text" }, Ol = {
  class: "learning-reading-number",
  "aria-hidden": "true"
}, Vl = ["data-material-id", "data-paragraph-id"], Ul = ["disabled"], Dl = ["open"], jl = { key: 0 }, Wl = { class: "learning-knowledge-text" }, Pl = {
  key: 0,
  class: "learning-terms"
}, zl = [
  "disabled",
  "aria-pressed",
  "onClick"
], Fl = /* @__PURE__ */ Q({
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
    const l = e, n = p, o = L(() => l.unit.explanations.find((w) => w.materialId === l.materialId && w.paragraphId === l.paragraph.id)), u = L(() => l.unit.exercises.find((w) => w.paragraphId === l.paragraph.id)), v = L(() => new Set(l.state.savedTerms)), c = (w) => v.value.has(w), $ = ke(() => l.unit.id), f = L(() => `knowledge:${l.materialId}:${l.paragraph.id}`), d = L(() => $.value.selection?.materialId === l.materialId && $.value.selection.paragraphId === l.paragraph.id ? $.value.selection : null);
    function h() {
      $.value.selection = {
        materialId: l.materialId,
        paragraphId: l.paragraph.id,
        start: 0,
        end: l.paragraph.text.length,
        quote: l.paragraph.text
      };
    }
    return (w, k) => (t(), i("section", {
      class: "learning-reading-paragraph",
      "data-paragraph-id": e.paragraph.id,
      "data-material-id": e.materialId
    }, [
      a("p", ql, [a("span", Ol, s(e.number), 1), a("span", {
        "data-learning-text": "",
        "data-material-id": e.materialId,
        "data-paragraph-id": e.paragraph.id
      }, s(e.paragraph.text), 9, Vl)]),
      a("button", {
        type: "button",
        class: "learning-paragraph-quote",
        disabled: [...e.paragraph.text].length > r(bt),
        onClick: h
      }, s(r(we).select), 9, Ul),
      d.value ? (t(), Y(wt, {
        key: 0,
        selection: d.value,
        disabled: e.disabled,
        onAsk: k[0] || (k[0] = (m) => n("ask", u.value?.id, d.value)),
        onSay: k[1] || (k[1] = (m) => n("action", "say", { selection: d.value })),
        onDismiss: k[2] || (k[2] = (m) => r($).selection = null)
      }, null, 8, ["selection", "disabled"])) : b("", !0),
      o.value ? (t(), i("details", {
        key: 1,
        class: "learning-knowledge",
        open: r($).expanded[f.value],
        onToggle: k[3] || (k[3] = (m) => r($).expanded[f.value] = m.target.open)
      }, [
        a("summary", null, [k[5] || (k[5] = z("本段知识", -1)), o.value.terms.length ? (t(), i("span", jl, " · " + s(o.value.terms.length) + " 个词语", 1)) : b("", !0)]),
        a("p", Wl, s(o.value.explanation), 1),
        o.value.terms.length ? (t(), i("ul", Pl, [(t(!0), i(M, null, j(o.value.terms, (m) => (t(), i("li", { key: m.text }, [a("span", null, [a("strong", null, s(m.text), 1), a("small", null, s(m.note), 1)]), a("button", {
          type: "button",
          disabled: e.disabled || c(m.text),
          "aria-pressed": c(m.text),
          onClick: (g) => n("action", "bookmark", {
            unitId: e.unit.id,
            materialId: e.materialId,
            paragraphId: e.paragraph.id,
            termText: m.text
          })
        }, s(c(m.text) ? "已收藏" : "收藏"), 9, zl)]))), 128))])) : b("", !0)
      ], 40, Dl)) : b("", !0),
      u.value ? (t(), Y(Mt, {
        key: 2,
        state: e.state,
        unit: e.unit,
        exercise: u.value,
        disabled: e.disabled,
        label: "用你的话概括这一段",
        placeholder: "写下这段的大意，不必逐句翻译",
        onAction: k[4] || (k[4] = (m, g) => n("action", m, g))
      }, null, 8, [
        "state",
        "unit",
        "exercise",
        "disabled"
      ])) : b("", !0)
    ], 8, Nl));
  }
}), Hl = Fl, Gl = ["aria-label"], Kl = [
  "aria-current",
  "disabled",
  "onClick"
], Yl = { class: "learning-reading-head" }, Zl = ["open"], Jl = { key: 0 }, Ql = { class: "learning-source" }, Xl = ["href"], _l = {
  key: 0,
  class: "learning-essay"
}, es = { class: "learning-essay-prompt" }, ts = ["aria-label"], as = ["aria-current"], ns = {
  key: 1,
  class: "learning-stage-bar is-writing"
}, is = {
  key: 2,
  class: "learning-stage-bar"
}, ls = ["disabled"], ss = ["disabled"], rs = /* @__PURE__ */ Q({
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
    const l = e, n = p, o = F(null), u = ke(() => l.unit.id);
    pt(o, () => l.unit.materials, (E) => {
      u.value.selection = E;
    });
    const v = L(() => l.unit.stage.stage), c = L(() => {
      if (v.value === "writing") return "reading";
      const E = u.value.reading.view;
      return E === "model" && ![
        "reviewing",
        "model",
        "complete"
      ].includes(v.value) ? "feedback" : E ?? (v.value === "complete" ? "model" : v.value === "grading" ? "reading" : "feedback");
    }), $ = [
      "reading",
      "feedback",
      "model"
    ];
    async function f(E) {
      const T = o.value?.closest(".learning-scroll");
      T && (u.value.reading.scrolls[c.value] = T.scrollTop), u.value.reading.view = E, await re(), T && (T.scrollTop = u.value.reading.scrolls[E] ?? 0);
    }
    const d = [
      ["writing", "阅读与写作"],
      ["grading", "统一批改"],
      ["revising", "修改"],
      ["model", "范文"],
      ["complete", "完成"]
    ], h = L(() => ({
      writing: 0,
      grading: 1,
      revising: 2,
      reviewing: 3,
      model: 3,
      complete: 4
    })[v.value] ?? 0), w = L(() => l.unit.exercises.find((E) => !E.paragraphId)), k = L(() => l.unit.stage.exercises.filter((E) => E.status === "writing").map((E) => E.exerciseId)), m = {
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
    }, g = L(() => {
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
      v.value !== "writing" ? (t(), i("nav", {
        key: 0,
        class: "learning-reading-nav",
        "aria-label": r(Z).navigation
      }, [(t(), i(M, null, j($, (S) => a("button", {
        key: S,
        type: "button",
        "aria-current": c.value === S ? "page" : void 0,
        disabled: S === "model" && ![
          "reviewing",
          "model",
          "complete"
        ].includes(v.value),
        onClick: (O) => f(S)
      }, s(r(Z)[S]), 9, Kl)), 64))], 8, Gl)) : b("", !0),
      c.value === "reading" ? (t(), i(M, { key: 1 }, [
        a("header", Yl, [a("details", {
          class: "learning-reading-goal",
          open: r(u).expanded.goal,
          onToggle: T[0] || (T[0] = (S) => r(u).expanded.goal = S.target.open)
        }, [
          a("summary", null, s(m.goal), 1),
          a("strong", null, s(e.unit.title), 1),
          e.unit.goal ? (t(), i("p", Jl, s(e.unit.goal), 1)) : b("", !0)
        ], 40, Zl), W(St, { name: e.state.teacher?.name }, null, 8, ["name"])]),
        (t(!0), i(M, null, j(g.value, (S, O) => (t(), i("section", {
          key: S.material.id,
          class: "learning-reading-material"
        }, [
          (t(), Y(Wt(O === 0 ? "h1" : "h2"), { tabindex: "-1" }, {
            default: Vt(() => [z(s(S.material.title), 1)]),
            _: 2
          }, 1024)),
          a("p", Ql, [S.material.provenance.kind === "authored" ? (t(), i(M, { key: 0 }, [z(s(m.authored), 1)], 64)) : (t(), i(M, { key: 1 }, [z(s(S.material.provenance.kind === "adapted" ? m.adapted : m.original) + " ", 1), a("a", {
            href: S.material.provenance.url,
            target: "_blank",
            rel: "noopener noreferrer"
          }, s(S.material.provenance.title), 9, Xl)], 64))]),
          (t(!0), i(M, null, j(S.paragraphs, (U) => (t(), Y(Hl, {
            key: U.paragraph.id,
            state: e.state,
            unit: e.unit,
            "material-id": S.material.id,
            paragraph: U.paragraph,
            number: U.number,
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
        w.value ? (t(), i("section", _l, [
          a("h2", null, s(m.essay), 1),
          a("p", es, s(w.value.prompt), 1),
          W(Mt, {
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
        ])) : b("", !0),
        a("ol", {
          class: "learning-steps",
          "aria-label": m.progress
        }, [(t(), i(M, null, j(d, ([S, O], U) => a("li", {
          key: S,
          class: ae({
            "is-done": U < h.value,
            "is-current": U === h.value
          }),
          "aria-current": U === h.value ? "step" : void 0
        }, s(O), 11, as)), 64))], 8, ts),
        v.value === "writing" ? (t(), i("div", ns, [a("span", null, s(m.written) + " " + s(e.unit.stage.exercises.length - k.value.length) + " / " + s(e.unit.stage.exercises.length), 1), a("button", {
          type: "button",
          onClick: T[2] || (T[2] = (S) => K(k.value[0]))
        }, s(m.next), 1)])) : v.value === "grading" ? (t(), i("div", is, [e.state.pending?.purpose === "grade" ? (t(), i(M, { key: 0 }, [
          T[9] || (T[9] = a("span", {
            class: "learning-working-dot",
            "aria-hidden": "true"
          }, null, -1)),
          a("span", null, s(r(Z).grading), 1),
          a("button", {
            type: "button",
            disabled: e.pending,
            onClick: T[3] || (T[3] = (S) => n("action", "cancel"))
          }, s(r(Z).stop), 9, ls)
        ], 64)) : (t(), i(M, { key: 1 }, [a("span", null, s(r(Z).gradeReady), 1), a("button", {
          type: "button",
          class: "learning-primary",
          disabled: e.disabled,
          onClick: T[4] || (T[4] = (S) => n("action", "grade", { unitId: e.unit.id }))
        }, s(r(Z).grade), 9, ss)], 64))])) : (t(), i("button", {
          key: 3,
          type: "button",
          class: "learning-primary",
          onClick: T[5] || (T[5] = (S) => f("feedback"))
        }, s(r(Z).feedback), 1))
      ], 64)) : (t(), Y(xl, {
        key: 2,
        view: c.value,
        state: e.state,
        unit: e.unit,
        disabled: e.disabled,
        pending: e.pending,
        onAction: x,
        onConfirm: T[6] || (T[6] = (S, O, U) => n("confirm", S, O, U)),
        onRecord: T[7] || (T[7] = (S) => n("record", S))
      }, null, 8, [
        "view",
        "state",
        "unit",
        "disabled",
        "pending"
      ])),
      c.value === "feedback" && v.value === "complete" ? (t(), i("button", {
        key: 3,
        type: "button",
        class: "learning-primary",
        onClick: T[8] || (T[8] = (S) => f("model"))
      }, s(r(Z).viewModel), 1)) : b("", !0)
    ], 512));
  }
}), os = rs, us = {
  class: "learning-review",
  "aria-labelledby": "learning-review-title"
}, ds = { class: "learning-review-head" }, vs = { class: "learning-muted" }, cs = ["disabled"], gs = {
  class: "learning-review-dots",
  "aria-label": "复习卡片"
}, ms = [
  "aria-label",
  "aria-current",
  "onClick"
], bs = { class: "learning-eyebrow" }, ps = { class: "learning-card-verdict" }, fs = { key: 0 }, ys = { key: 1 }, ks = {
  key: 1,
  class: "learning-working",
  role: "status"
}, hs = ["disabled"], $s = ["disabled"], ws = ["disabled"], xs = {
  key: 2,
  class: "learning-row"
}, Cs = { class: "learning-review-results" }, Is = ["aria-expanded", "onClick"], Ls = {
  key: 1,
  class: "learning-chip-reason"
}, Ss = /* @__PURE__ */ Q({
  __name: "LearningReview",
  props: {
    state: {},
    review: {},
    disabled: { type: Boolean },
    pending: { type: Boolean }
  },
  emits: ["action", "confirm"],
  setup(e, { emit: p }) {
    const l = e, n = p, o = {
      correct: "答对了",
      partial: "对了一部分",
      incorrect: "还没想起来",
      disputed: "等待复核"
    }, u = {
      answer: "你的作答",
      saved: "已保存，答完这组再一起看看。",
      ready: "这组答完了",
      grade: "批改这组"
    }, v = L(() => l.review.stage.stage), c = (I) => l.review.attempts.filter((V) => V.exerciseId === I).at(-1), $ = () => Math.max(0, l.review.exercises.findIndex((I) => !c(I.id))), f = ke(() => l.review.id), d = L(() => f.value.review), h = L({
      get: () => d.value.index ?? $(),
      set: (I) => {
        d.value.index = I;
      }
    }), w = L(() => l.review.exercises[h.value]), k = L(() => w.value && c(w.value.id)), m = L(() => l.review.assessments.find((I) => I.attemptId === k.value?.id)), g = L(() => l.review.materials.flatMap((I) => I.paragraphs)), x = L(() => d.value.drafts);
    G(w, (I) => {
      I && !x.value[I.id] && (x.value[I.id] = Me(I.response));
    }, { immediate: !0 });
    const K = L({
      get: () => x.value[w.value.id],
      set: (I) => {
        x.value[w.value.id] = I;
      }
    }), E = L(() => l.review.exercises.filter((I) => c(I.id)).length), T = L({
      get: () => d.value.openReason,
      set: (I) => {
        d.value.openReason = I;
      }
    });
    function S(I) {
      n("action", "submit", {
        unitId: l.review.id,
        exerciseId: w.value.id,
        answer: I
      });
    }
    function O() {
      const I = l.review.exercises.findIndex((V) => !c(V.id));
      I >= 0 && (h.value = I);
    }
    const U = L(() => l.state.completions.find((I) => I.unitId === l.review.id)), D = L(() => U.value?.rewardStatus === "paid" || U.value?.rewardStatus === "retired");
    G(d, (I) => {
      I.seenBefore ??= v.value === "complete" && st.has(l.review.id);
    }, { immediate: !0 });
    const N = L(() => d.value.seenBefore ?? !1), P = L({
      get: () => d.value.expanded,
      set: (I) => {
        d.value.expanded = I;
      }
    });
    G([v, () => l.review.id], ([I, V]) => {
      I === "complete" && st.mark(V);
    }, { immediate: !0 });
    const q = L(() => N.value && D.value && !P.value), B = (I) => [...l.state.books.grammar, ...l.state.books.vocabulary].find((V) => V.id === I);
    return (I, V) => (t(), i("section", us, [
      a("header", ds, [
        V[7] || (V[7] = a("h2", { id: "learning-review-title" }, "今日复习", -1)),
        a("span", vs, s(E.value) + " / " + s(e.review.exercises.length), 1),
        v.value === "answering" ? (t(), i("button", {
          key: 0,
          type: "button",
          disabled: e.disabled,
          onClick: V[0] || (V[0] = (R) => n("confirm", "abandon-review", {}, r(xe).review))
        }, "放下", 8, cs)) : b("", !0)
      ]),
      a("nav", gs, [(t(!0), i(M, null, j(e.review.exercises, (R, J) => (t(), i("button", {
        key: R.id,
        type: "button",
        "aria-label": `第 ${J + 1} 张`,
        "aria-current": J === h.value,
        class: ae({ "is-answered": !!c(R.id) }),
        onClick: (ie) => h.value = J
      }, null, 10, ms))), 128))]),
      v.value !== "complete" && w.value ? (t(), i("div", {
        key: `${w.value.id}:${k.value ? "back" : "front"}`,
        class: ae(["learning-card", { "is-back": !!k.value }])
      }, [
        a("p", bs, s(k.value ? u.answer : `第 ${h.value + 1} 张`), 1),
        a("h3", null, s(w.value.prompt), 1),
        k.value ? (t(), i(M, { key: 1 }, [
          a("blockquote", null, s(r(De)(k.value.answer, w.value.response, g.value)), 1),
          m.value ? (t(), i(M, { key: 0 }, [a("p", ps, s(o[m.value.verdict]), 1), m.value.guidance ? (t(), i("p", fs, s(m.value.guidance), 1)) : b("", !0)], 64)) : (t(), i("small", ys, s(u.saved), 1)),
          E.value < e.review.exercises.length ? (t(), i("button", {
            key: 2,
            type: "button",
            class: "learning-primary",
            onClick: O
          }, "下一张")) : b("", !0)
        ], 64)) : (t(), Y(mt, {
          key: 0,
          modelValue: K.value,
          "onUpdate:modelValue": V[1] || (V[1] = (R) => K.value = R),
          response: w.value.response,
          paragraphs: g.value,
          disabled: e.disabled,
          onSubmit: S
        }, null, 8, [
          "modelValue",
          "response",
          "paragraphs",
          "disabled"
        ]))
      ], 2)) : b("", !0),
      v.value === "grading" ? (t(), i("div", ks, [e.state.pending?.purpose === "review-assess" ? (t(), i(M, { key: 0 }, [
        V[8] || (V[8] = a("span", {
          class: "learning-working-dot",
          "aria-hidden": "true"
        }, null, -1)),
        V[9] || (V[9] = a("span", null, "正在批改这组复习…", -1)),
        a("button", {
          type: "button",
          disabled: e.pending,
          onClick: V[2] || (V[2] = (R) => n("action", "cancel"))
        }, "停止", 8, hs)
      ], 64)) : (t(), i(M, { key: 1 }, [
        a("span", null, s(u.ready), 1),
        a("button", {
          type: "button",
          disabled: e.disabled,
          onClick: V[3] || (V[3] = (R) => n("confirm", "abandon-review", {}, r(xe).review))
        }, "放下", 8, $s),
        a("button", {
          type: "button",
          disabled: e.disabled,
          onClick: V[4] || (V[4] = (R) => n("action", "grade", { unitId: e.review.id }))
        }, s(u.grade), 9, ws)
      ], 64))])) : b("", !0),
      v.value === "complete" && q.value ? (t(), i("div", xs, [V[10] || (V[10] = a("span", { class: "learning-muted" }, "这组复习已完成", -1)), a("button", {
        type: "button",
        "aria-expanded": !1,
        onClick: V[5] || (V[5] = (R) => P.value = !0)
      }, "查看结果")])) : v.value === "complete" ? (t(), i(M, { key: 3 }, [a("ul", Cs, [(t(!0), i(M, null, j(e.review.exercises, (R) => (t(), i("li", { key: R.id }, [
        a("span", null, [a("strong", null, s(B(R.itemId)?.label ?? R.prompt), 1), a("small", null, s(o[e.review.assessments.find((J) => J.attemptId === c(R.id)?.id)?.verdict ?? "disputed"]), 1)]),
        B(R.itemId)?.nextReviewAt ? (t(), i("button", {
          key: 0,
          type: "button",
          class: "learning-chip",
          "aria-expanded": T.value === R.id,
          onClick: (J) => T.value = T.value === R.id ? "" : R.id
        }, s(r(je)(B(R.itemId).nextReviewAt)), 9, Is)) : b("", !0),
        T.value === R.id ? (t(), i("small", Ls, s(B(R.itemId)?.scheduleReason), 1)) : b("", !0)
      ]))), 128))]), W(At, {
        state: e.state,
        "unit-id": e.review.id,
        amount: e.review.reward.amount,
        label: "复习完成",
        disabled: e.disabled,
        quiet: N.value,
        onAction: V[6] || (V[6] = (R, J) => n("action", R, J))
      }, null, 8, [
        "state",
        "unit-id",
        "amount",
        "disabled",
        "quiet"
      ])], 64)) : b("", !0)
    ]));
  }
}), As = Ss, Ms = { class: "learning-workbench" }, Rs = {
  key: 0,
  class: "learning-due"
}, Ts = {
  key: 0,
  class: "learning-working",
  role: "status"
}, Bs = ["disabled"], Es = ["disabled"], Ns = {
  key: 1,
  class: "learning-row"
}, qs = ["disabled"], Os = {
  key: 4,
  class: "learning-lesson"
}, Vs = { class: "learning-eyebrow" }, Us = { tabindex: "-1" }, Ds = {
  key: 0,
  class: "learning-muted"
}, js = ["onClick"], Ws = ["onClick"], Ps = { class: "learning-row" }, zs = ["disabled"], Fs = {
  key: 5,
  class: "learning-start"
}, Hs = ["disabled"], Gs = {
  key: 0,
  tabindex: "-1"
}, Ks = { key: 1 }, Ys = ["aria-label"], Zs = {
  key: 3,
  class: "learning-start-preparing",
  role: "status"
}, Js = ["disabled"], Qs = { class: "learning-start-reading" }, Xs = ["disabled"], _s = ["disabled"], er = /* @__PURE__ */ Q({
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
    const l = e, n = p, o = L(() => !!l.state.review && l.state.review.stage.stage !== "complete"), u = L(() => l.state.unit), v = L(() => l.state.busy && !l.state.pending), c = {
      start: "开始读写",
      reading: "读写练习",
      readingHint: "读一篇文章，写下你的看法",
      lesson: "专项练习",
      lessonHint: "练语法、词汇或听力",
      select: "选择语伴",
      selectFirst: "先选一位语伴",
      next: "接下来",
      preparing: "正在准备学习材料…",
      stop: "停止",
      settings: "学习设置",
      complete: "完成练习",
      notes: "笔记",
      review: "开始复习"
    }, $ = L(() => [
      new Intl.DisplayNames(["zh-CN"], { type: "language" }).of(l.state.language),
      l.state.profile?.settings.exam,
      [l.state.profile?.settings.level, l.state.profile?.settings.targetLevel].filter(Boolean).join(" → ")
    ].filter(Boolean).join(" · "));
    function f(w) {
      n("action", "prepare", {
        kind: w,
        message: w === "reading-writing" ? "请按我的训练设置准备一篇读写训练。" : "请按我现在的情况准备一节专项小课。"
      });
    }
    const d = (w, k) => n("action", w, k), h = (w, k, m) => n("confirm", w, k, m);
    return (w, k) => (t(), i("div", Ms, [
      e.state.dueCount && !o.value ? (t(), i("div", Rs, [a("span", null, s(r(ht)(e.state.dueCount)), 1), e.state.pending?.purpose === "review-prepare" ? (t(), i("span", Ts, [
        k[13] || (k[13] = a("span", {
          class: "learning-working-dot",
          "aria-hidden": "true"
        }, null, -1)),
        k[14] || (k[14] = a("span", null, "正在出题…", -1)),
        a("button", {
          type: "button",
          disabled: e.pending,
          onClick: k[0] || (k[0] = (m) => n("action", "cancel"))
        }, "停止", 8, Bs)
      ])) : e.state.blockedReview ? b("", !0) : (t(), i("button", {
        key: 1,
        type: "button",
        class: "learning-primary",
        disabled: e.disabled,
        onClick: k[1] || (k[1] = (m) => n("action", "start-review"))
      }, s(c.review), 9, Es))])) : b("", !0),
      e.state.blockedReview ? (t(), i("div", Ns, [k[15] || (k[15] = a("p", { class: "learning-muted" }, "有一组复习在另一个故事中进行。回到那个故事可以接着做；也可以放下它，在这里重新出题。", -1)), a("button", {
        type: "button",
        disabled: e.disabled,
        onClick: k[2] || (k[2] = (m) => h("abandon-review", {}, r(xe).review))
      }, "放下", 8, qs)])) : b("", !0),
      e.state.review ? (t(), Y(As, {
        key: 2,
        state: e.state,
        review: e.state.review,
        disabled: e.disabled,
        pending: e.pending,
        onAction: d,
        onConfirm: h
      }, null, 8, [
        "state",
        "review",
        "disabled",
        "pending"
      ])) : b("", !0),
      u.value?.kind === "reading-writing" ? (t(), Y(os, {
        key: 3,
        state: e.state,
        unit: u.value,
        disabled: e.disabled,
        pending: e.pending,
        onAction: d,
        onConfirm: h,
        onAsk: k[3] || (k[3] = (m, g) => n("ask", m, g)),
        onRecord: k[4] || (k[4] = (m) => n("record", m))
      }, null, 8, [
        "state",
        "unit",
        "disabled",
        "pending"
      ])) : u.value ? (t(), i("section", Os, [
        a("p", Vs, "专项小课 · 完成可得 " + s(u.value.reward.amount) + " 小白币", 1),
        a("h1", Us, s(u.value.title), 1),
        u.value.goal ? (t(), i("p", Ds, s(u.value.goal), 1)) : b("", !0),
        (t(!0), i(M, null, j(u.value.materials, (m) => (t(), i("button", {
          key: m.id,
          type: "button",
          class: "learning-activity-link",
          onClick: (g) => n("present", {
            unitId: u.value.id,
            kind: "material",
            id: m.id,
            title: m.title
          })
        }, [
          W(H, { name: "book" }),
          a("span", null, s(m.title), 1),
          W(H, { name: "arrow" })
        ], 8, js))), 128)),
        (t(!0), i(M, null, j(u.value.exercises, (m) => (t(), i("button", {
          key: m.id,
          type: "button",
          class: "learning-activity-link",
          onClick: (g) => n("present", {
            unitId: u.value.id,
            kind: "exercise",
            id: m.id,
            title: m.prompt
          })
        }, [
          W(H, { name: u.value.stage.exercises.find((g) => g.exerciseId === m.id)?.status === "done" ? "check" : "records" }, null, 8, ["name"]),
          a("span", null, s(m.prompt), 1),
          W(H, { name: "arrow" })
        ], 8, Ws))), 128)),
        a("div", Ps, [a("button", {
          type: "button",
          disabled: e.disabled,
          onClick: k[5] || (k[5] = (m) => n("action", "complete"))
        }, s(c.complete), 9, zs), a("button", {
          type: "button",
          onClick: k[6] || (k[6] = (m) => n("go", "materials"))
        }, s(c.notes), 1)])
      ])) : b("", !0),
      !u.value || e.state.completions.some((m) => m.unitId === u.value?.id) ? (t(), i("section", Fs, [e.state.blockedUnit ? (t(), i(M, { key: 0 }, [
        k[16] || (k[16] = a("h1", { tabindex: "-1" }, "当前课件在另一个故事中", -1)),
        k[17] || (k[17] = a("p", { class: "learning-muted" }, "回到那个故事可以继续；也可以放下它，在这里重新开始。", -1)),
        a("button", {
          type: "button",
          disabled: e.disabled,
          onClick: k[7] || (k[7] = (m) => h("abandon", {}, r(xe).lesson))
        }, "放下并重新开始", 8, Hs)
      ], 64)) : (t(), i(M, { key: 1 }, [
        u.value ? (t(), i("h2", Ks, s(c.next), 1)) : (t(), i("h1", Gs, s(e.state.teacher ? c.reading : c.selectFirst), 1)),
        e.state.teacher && !u.value ? (t(), i("button", {
          key: 2,
          type: "button",
          class: "learning-start-preference",
          "aria-label": `${c.settings}：${$.value}`,
          onClick: k[8] || (k[8] = (m) => n("go", "settings"))
        }, [a("span", null, [a("strong", null, s(c.settings), 1), a("small", null, s($.value), 1)]), W(H, { name: "arrow" })], 8, Ys)) : b("", !0),
        v.value ? (t(), i("div", Zs, [
          W(H, { name: "book" }),
          a("span", null, s(e.state.message || c.preparing), 1),
          a("button", {
            type: "button",
            disabled: e.pending,
            onClick: k[9] || (k[9] = (m) => n("action", "cancel"))
          }, s(c.stop), 9, Js)
        ])) : e.state.teacher ? (t(), i(M, { key: 4 }, [a("section", Qs, [
          W(H, { name: "workbook" }),
          a("p", null, s(c.readingHint), 1),
          a("button", {
            type: "button",
            class: "learning-primary",
            disabled: e.disabled,
            onClick: k[10] || (k[10] = (m) => f("reading-writing"))
          }, [z(s(c.start), 1), W(H, { name: "arrow" })], 8, Xs)
        ]), a("button", {
          type: "button",
          class: "learning-start-secondary",
          disabled: e.disabled,
          onClick: k[11] || (k[11] = (m) => f("lesson"))
        }, [
          W(H, { name: "records" }),
          a("span", null, [a("strong", null, s(c.lesson), 1), a("small", null, s(c.lessonHint), 1)]),
          W(H, { name: "arrow" })
        ], 8, _s)], 64)) : (t(), i("button", {
          key: 5,
          type: "button",
          class: "learning-primary",
          onClick: k[12] || (k[12] = (m) => n("go", "profile"))
        }, s(c.select), 1))
      ], 64))])) : b("", !0)
    ]));
  }
}), tr = er, ut = {
  initial: "我想跟你学这门语言，先聊聊吧。",
  returning: "我来继续学语言了，先聊聊今天从哪里开始吧。"
}, ar = { class: "learning-messages" }, nr = {
  key: 0,
  class: "learning-reasoning",
  role: "status"
}, ir = {
  key: 2,
  class: "learning-tool-details",
  role: "status"
}, lr = { class: "learning-tool-name" }, sr = { class: "learning-tool-status" }, rr = /* @__PURE__ */ Q({
  __name: "LearningMessages",
  props: {
    messages: {},
    running: { type: Boolean }
  },
  setup(e) {
    const p = e, l = L(() => {
      const c = [];
      for (const $ of p.messages) $.role === "assistant" ? c.push({
        message: $,
        results: []
      }) : $.role === "tool" && c.at(-1)?.results.push($);
      return c.map(($) => ({
        message: $.message,
        tools: ($.message.toolCalls ?? []).map((f) => {
          const d = $.results.find((h) => h.toolCallId === f.id);
          return {
            call: f,
            result: d,
            status: $.message.streaming ? "generating" : d?.streaming ? "running" : d?.content ? d.error || v(d.content) ? "failed" : "done" : p.running && !$.message.error ? "pending" : "cancelled"
          };
        }).filter((f) => f.status !== "done")
      }));
    }), n = {
      LearningRead: "查看学习记录",
      LearningContextRead: "查看相关资料",
      LearningSearch: "寻找文章",
      LearningExtract: "阅读原文",
      LearningProfileEdit: "调整学习目标",
      LearningLessonEdit: "准备练习",
      LearningRequest: "安排练习",
      LearningModelEssay: "准备范文",
      LearningAssess: "批改作答",
      LearningHelp: "准备讲解",
      LearningPresent: "打开练习",
      LearningComplete: "整理学习收获"
    }, o = {
      generating: "准备中",
      pending: "准备中",
      running: "进行中",
      failed: "未完成",
      cancelled: "已停止"
    }, u = {
      thinking: "正在想…",
      request: "准备学习内容"
    };
    function v(c) {
      try {
        return JSON.parse(c)?.ok === !1;
      } catch {
        return !1;
      }
    }
    return (c, $) => (t(), i("div", ar, [(t(!0), i(M, null, j(l.value, (f, d) => (t(), i(M, { key: d }, [
      f.message.hasReasoning && f.message.streaming && !f.message.content && !f.tools.length ? (t(), i("p", nr, s(u.thinking), 1)) : b("", !0),
      f.message.content ? (t(), i("div", {
        key: 1,
        class: ae(["learning-output", { "is-streaming": f.message.streaming }])
      }, [f.message.content ? (t(), Y(gt, {
        key: 0,
        class: "learning-markdown",
        text: f.message.content
      }, null, 8, ["text"])) : b("", !0)], 2)) : b("", !0),
      f.tools.length ? (t(), i("ul", ir, [(t(!0), i(M, null, j(f.tools, (h) => (t(), i("li", {
        key: h.call.id,
        class: ae({ "is-failed": h.status === "failed" })
      }, [a("span", lr, s(n[h.call.name] || u.request), 1), a("span", sr, s(o[h.status]), 1)], 2))), 128))])) : b("", !0)
    ], 64))), 128))]));
  }
}), or = rr, ur = { class: "learning-conversation" }, dr = { class: "learning-conversation-heading" }, vr = { class: "learning-person-initial" }, cr = ["disabled"], gr = ["aria-label"], mr = {
  key: 0,
  class: "learning-history-notice"
}, br = {
  key: 0,
  class: "learning-conversation-user"
}, pr = ["disabled", "onClick"], fr = {
  key: 3,
  class: "learning-conversation-tools"
}, yr = ["disabled"], kr = ["disabled"], hr = {
  key: 1,
  class: "learning-working",
  role: "status"
}, $r = {
  key: 2,
  class: "learning-turn-notice is-error",
  role: "status"
}, wr = {
  key: 3,
  class: "learning-conversation-empty"
}, xr = ["disabled"], Cr = { class: "learning-composer-surface" }, Ir = {
  key: 0,
  class: "learning-composer-quote"
}, Lr = { class: "learning-composer-row" }, Sr = ["maxlength", "onKeydown"], Ar = [
  "type",
  "disabled",
  "aria-label",
  "title"
], Mr = /* @__PURE__ */ Q({
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
    ]), v = l, c = ye().chat, $ = de(c, "text"), f = F(null), d = F(null), h = F(null), w = de(c, "focus");
    let k = null, m = 0;
    function g() {
      const S = h.value;
      S && (c.scroll = S.scrollTop, c.following = S.scrollHeight - S.scrollTop - S.clientHeight < 70);
    }
    async function x() {
      await re(), c.following && h.value && (h.value.scrollTop = h.value.scrollHeight);
    }
    function K() {
      const S = f.value;
      S?.clientWidth && (S.style.height = "auto", S.style.height = `${S.scrollHeight}px`, x());
    }
    G($, K, { flush: "post" }), G(f, (S) => {
      if (k?.disconnect(), cancelAnimationFrame(m), !S) return;
      let O = 0;
      k = new ResizeObserver(([U]) => {
        U.contentRect.width !== O && (O = U.contentRect.width, cancelAnimationFrame(m), m = requestAnimationFrame(K));
      }), k.observe(S.parentElement);
    }, { flush: "post" }), pe(() => {
      h.value && (h.value.scrollTop = c.scroll), x();
    }), fe(() => {
      h.value && (c.scroll = h.value.scrollTop), k?.disconnect(), cancelAnimationFrame(m);
    });
    function E() {
      if (n.disabled || !$.value.trim()) return;
      const S = $.value.trim();
      c.sent = {
        text: $.value,
        user: w.value?.selection ? `${S}

${w.value.selection.quote}` : S,
        after: n.state.conversation.turns.length + n.state.conversation.removedTurns
      }, c.following = !0, v("action", w.value ? "explain" : "talk", {
        message: S,
        ...w.value ?? {}
      });
    }
    G([() => n.state.conversation.turns, () => n.state.chatBusy], x);
    function T(S) {
      return S.kind === "replacement" ? !n.disabled && n.state.currentUnitId === S.unitId : n.state.unit?.id === S.unitId && (S.kind === "exercise" ? n.state.unit.exercises : n.state.unit.materials).some((O) => O.id === S.id);
    }
    return p({
      async ask(S, O) {
        w.value = {
          exerciseId: S,
          selection: O
        }, await re(), f.value?.focus();
      },
      focusHeading: () => d.value?.focus({ preventScroll: !0 })
    }), (S, O) => (t(), i("section", ur, [
      a("header", dr, [
        a("span", vr, s([...e.state.teacher?.name ?? "伴"][0]), 1),
        a("h1", {
          ref_key: "heading",
          ref: d,
          tabindex: "-1"
        }, s(e.state.teacher?.name ?? "语伴"), 513),
        a("button", {
          type: "button",
          disabled: e.disabled,
          "aria-label": "更换学习语言和语伴",
          onClick: O[0] || (O[0] = (U) => v("profile"))
        }, s(new Intl.DisplayNames(["zh-CN"], { type: "language" }).of(e.state.language)), 9, cr)
      ]),
      a("div", {
        ref_key: "scroller",
        ref: h,
        class: "learning-conversation-turns",
        "aria-label": o.conversation,
        onScroll: g
      }, [
        e.state.conversation.removedTurns ? (t(), i("p", mr, s(o.history), 1)) : b("", !0),
        (t(!0), i(M, null, j(e.state.conversation.turns, (U, D) => (t(), i("div", {
          key: D,
          class: "learning-conversation-turn"
        }, [
          U.user && !r(u).has(U.purpose) ? (t(), i("p", br, s(U.user), 1)) : b("", !0),
          W(or, {
            messages: U.messages,
            running: U.status === "running"
          }, null, 8, ["messages", "running"]),
          U.message ? (t(), i("p", {
            key: 1,
            class: ae(["learning-turn-notice", { "is-error": U.status === "failed" }]),
            role: "status"
          }, s(U.message), 3)) : b("", !0),
          U.presentation ? (t(), i("button", {
            key: 2,
            type: "button",
            class: "learning-activity-link",
            disabled: !T(U.presentation),
            onClick: (N) => v("present", U.presentation)
          }, [
            W(H, { name: U.presentation.kind === "material" ? "book" : "records" }, null, 8, ["name"]),
            a("span", null, s(U.presentation.title), 1),
            W(H, { name: "arrow" })
          ], 8, pr)) : b("", !0),
          D === e.state.conversation.turns.length - 1 && e.state.reply?.text === U.teacher ? (t(), i("div", fr, [[...U.teacher].length <= 1e3 ? (t(), i("button", {
            key: 0,
            type: "button",
            disabled: e.disabled,
            onClick: O[1] || (O[1] = (N) => v("action", "say-reply"))
          }, [W(H, { name: "sound" }), O[8] || (O[8] = z("听语伴说", -1))], 8, yr)) : b("", !0), e.state.reply.exerciseId && [...U.teacher].length <= 4e3 ? (t(), i("button", {
            key: 1,
            type: "button",
            disabled: e.disabled || e.state.unit?.notes.some((N) => N.text === U.teacher),
            onClick: O[2] || (O[2] = (N) => v("action", "save-note"))
          }, "保存笔记", 8, kr)) : b("", !0)])) : b("", !0)
        ]))), 128)),
        e.state.chatBusy ? (t(), i("div", hr, [O[9] || (O[9] = a("span", {
          class: "learning-working-dot",
          "aria-hidden": "true"
        }, null, -1)), a("span", null, s(e.state.chatMessage), 1)])) : e.state.chatMessage ? (t(), i("p", $r, s(e.state.chatMessage), 1)) : b("", !0),
        !e.state.conversation.turns.length && !e.state.chatBusy ? (t(), i("div", wr, [
          W(H, { name: "chat" }),
          a("p", null, s(e.state.teacher ? o.empty : o.select), 1),
          e.state.teacher ? (t(), i("button", {
            key: 1,
            type: "button",
            disabled: e.disabled,
            onClick: O[4] || (O[4] = (U) => v("action", "talk", { message: e.state.profile ? r(ut).returning : r(ut).initial }))
          }, s(o.opening), 9, xr)) : (t(), i("button", {
            key: 0,
            class: "learning-primary",
            type: "button",
            onClick: O[3] || (O[3] = (U) => v("profile"))
          }, s(o.select), 1))
        ])) : b("", !0)
      ], 40, gr),
      e.state.teacher ? (t(), i("form", {
        key: 0,
        class: "learning-conversation-compose",
        onSubmit: te(E, ["prevent"])
      }, [a("div", Cr, [w.value ? (t(), i("div", Ir, [a("span", null, s(w.value.selection?.quote ?? "请教这道题"), 1), a("button", {
        type: "button",
        "aria-label": "取消引用",
        onClick: O[5] || (O[5] = (U) => w.value = null)
      }, "×")])) : b("", !0), a("div", Lr, [X(a("textarea", {
        ref_key: "composer",
        ref: f,
        "onUpdate:modelValue": O[6] || (O[6] = (U) => $.value = U),
        rows: "1",
        maxlength: w.value?.selection ? 1800 : w.value?.exerciseId ? 2e3 : 4e3,
        "aria-label": "和语伴说",
        placeholder: "和语伴说…",
        onKeydown: [me(te(E, ["ctrl", "prevent"]), ["enter"]), me(te(E, ["meta", "prevent"]), ["enter"])]
      }, null, 40, Sr), [[ne, $.value], [r(Re), r(c)]]), a("button", {
        type: e.state.chatBusy ? "button" : "submit",
        class: ae(e.state.chatBusy ? "learning-composer-stop" : "learning-primary"),
        disabled: e.state.chatBusy ? e.pending : e.disabled || !$.value.trim(),
        "aria-label": e.state.chatBusy ? "停止回复" : "发送给语伴",
        title: e.state.chatBusy ? "停止回复" : "发送给语伴",
        onClick: O[7] || (O[7] = te((U) => e.state.chatBusy ? v("action", "cancel-chat") : E(), ["prevent"]))
      }, [W(H, { name: e.state.chatBusy ? "stop" : "send" }, null, 8, ["name"])], 10, Ar)])])], 32)) : b("", !0)
    ]));
  }
}), Rr = Mr, dt = {
  busy: "上一件事还没做完，等它完成后再试一次吧。这次没有开始。",
  unknown: "暂时没收到结果。请先重新加载，确认内容是否已保存，再决定是否重试。"
};
function Tr(e) {
  const p = Ut(structuredClone(Dt(e.initialState))), l = F(!1), n = F("");
  let o = !1, u = 0, v = () => {
  };
  const c = L(() => !l.value && !p.value.busy && p.value.storage === "ready"), $ = L(() => !l.value && !p.value.chatBusy && p.value.storage === "ready");
  async function f(d, h = {}) {
    if (l.value) return;
    l.value = !0, n.value = "";
    const w = p.value.chatIdentity, k = u;
    try {
      const m = await e.bridge.request(`learning/${d}`, {
        chatIdentity: w,
        ...h
      }, 35e3);
      return !o || p.value.chatIdentity !== w ? void 0 : (u === k && m.result.state.chatIdentity === w && (p.value = m.result.state), m.result.rejected && (n.value = dt[m.result.rejected]), m.result);
    } catch {
      o && p.value.chatIdentity === w && (n.value = dt.unknown);
    } finally {
      o && (l.value = !1);
    }
  }
  return pe(() => {
    o = !0, v = e.bridge.subscribe((d) => {
      if (d.type === "learning/media") {
        p.value = {
          ...p.value,
          media: d.payload.media
        };
        return;
      }
      if (d.type !== "learning/state") return;
      const h = d.payload.state;
      h.chatIdentity === p.value.chatIdentity && (u++, p.value = h, n.value = "");
    });
  }), fe(() => {
    o = !1, v();
  }), {
    state: p,
    pending: l,
    writable: c,
    canChat: $,
    localMessage: n,
    request: f
  };
}
function Br(e = Math.random) {
  return Math.round(3 * 6e4 + Math.min(Math.max(e(), 0), 1) * 9 * 6e4);
}
function Er(e) {
  let p = !1, l, n = 0;
  function o() {
    l !== void 0 && (e.clearTimer(l), l = void 0);
  }
  function u() {
    if (!p) return;
    const v = n;
    l = e.setTimer(() => {
      v === n && (l = void 0, p && (e.opportunity(), u()));
    }, Br(e.random));
  }
  return {
    update(v) {
      p !== v && (p = v, n++, o(), u());
    },
    dispose() {
      p = !1, n++, o();
    }
  };
}
function Nr(e) {
  const p = F(!1), l = F(!1), n = F(!1), o = F("");
  let u, v;
  const c = L(() => e.preference.enabled && e.reading.value && p.value && !e.blocked.value && !!e.state.value.teacher && e.state.value.storage === "ready"), $ = L(() => c.value && !l.value && !n.value && !e.pending.value && !e.state.value.busy && !e.state.value.chatBusy && !e.state.value.companionBusy);
  function f() {
    const x = e.root.value?.querySelector(".learning-scroll")?.getBoundingClientRect(), K = x?.top ?? 0, E = [...e.root.value?.querySelectorAll("[data-material-id][data-paragraph-id]") ?? []].find((T) => T.getBoundingClientRect().bottom > K + 60 && T.getBoundingClientRect().top < (x?.bottom ?? 0));
    return E ? {
      materialId: E.dataset.materialId,
      paragraphId: E.dataset.paragraphId
    } : null;
  }
  const d = Er({
    setTimer: (x, K) => setTimeout(x, K),
    clearTimer: (x) => clearTimeout(x),
    opportunity: () => {
      const x = f();
      x && e.request("companion", x);
    }
  });
  G($, (x) => d.update(x), { immediate: !0 }), G([
    c,
    l,
    n,
    e.pending,
    () => e.state.value.companionBusy
  ], ([x, K, E, T, S]) => {
    S && !T && (!x || K || E) && e.request("cancel-companion");
  });
  function h() {
    const x = document.activeElement;
    l.value = x instanceof HTMLElement && !!e.root.value?.contains(x) && x.matches("textarea, input:not([type=checkbox],[type=radio],[type=range]), [contenteditable=true]");
  }
  const w = () => queueMicrotask(h);
  function k(x) {
    !(x.target instanceof HTMLElement) || !x.target.matches("textarea, input:not([type=checkbox],[type=radio],[type=range]), [contenteditable=true]") || (clearTimeout(u), n.value = !0, u = setTimeout(() => {
      n.value = !1;
    }, 3e4));
  }
  function m() {
    p.value = document.visibilityState === "visible", p.value || (clearTimeout(u), n.value = !1, g()), h();
  }
  function g() {
    clearTimeout(v), o.value = "";
  }
  return G(() => e.state.value.remark?.text ?? "", (x) => {
    g(), x && e.reading.value && p.value && !l.value && !e.blocked.value && (o.value = x, v = setTimeout(g, 1e4));
  }), G([
    e.reading,
    e.blocked,
    l
  ], ([x, K, E]) => {
    (!x || K || E) && g();
  }), pe(() => {
    m(), document.addEventListener("visibilitychange", m), e.root.value?.addEventListener("focusin", w), e.root.value?.addEventListener("focusout", w), e.root.value?.addEventListener("input", k);
  }), fe(() => {
    d.dispose(), clearTimeout(u), g(), document.removeEventListener("visibilitychange", m), e.root.value?.removeEventListener("focusin", w), e.root.value?.removeEventListener("focusout", w), e.root.value?.removeEventListener("input", k);
  }), {
    bubble: o,
    dismiss: g
  };
}
var qr = { class: "learning-toolbar" }, Or = {
  key: 0,
  class: "learning-unread-dot",
  "aria-hidden": "true"
}, Vr = {
  key: 1,
  class: "learning-layout-control"
}, Ur = ["min", "max"], Dr = { "aria-label": "学习资料与设置" }, jr = { "aria-label": "学习资料与设置" }, Wr = ["onClick"], Pr = {
  key: 0,
  class: "learning-notice",
  role: "status",
  "aria-live": "polite"
}, zr = { class: "learning-row" }, Fr = ["disabled"], Hr = ["disabled"], Gr = ["disabled"], Kr = ["disabled"], Yr = ["inert", "aria-hidden"], Zr = {
  key: 0,
  class: "learning-working",
  role: "status"
}, Jr = ["disabled"], Qr = {
  key: 3,
  class: "learning-materials-page"
}, Xr = {
  key: 0,
  class: "learning-empty-note"
}, _r = { class: "learning-materials-title" }, eo = ["onClick"], to = ["onClick"], ao = {
  key: 0,
  class: "learning-notes"
}, no = { key: 0 }, io = ["disabled", "onClick"], lo = {
  key: 5,
  class: "learning-harvest-page"
}, so = {
  key: 0,
  class: "learning-empty-note"
}, ro = { key: 0 }, oo = { class: "learning-muted" }, uo = ["disabled", "onClick"], vo = ["disabled"], co = ["disabled"], go = {
  key: 3,
  class: "learning-row"
}, mo = ["disabled"], bo = ["disabled"], po = {
  key: 6,
  class: "learning-settings-page"
}, fo = ["value", "disabled"], yo = ["value"], ko = {
  key: 0,
  class: "learning-settings-goal"
}, ho = {
  key: 0,
  class: "learning-muted"
}, $o = ["value", "disabled"], wo = ["disabled"], xo = ["disabled"], Co = ["disabled"], Io = ["disabled"], Lo = ["disabled"], So = ["disabled"], Ao = ["disabled"], Mo = ["inert", "aria-hidden"], Ro = ["aria-label"], To = { class: "learning-person-initial" }, Bo = {
  key: 0,
  class: "learning-unread-dot",
  "aria-hidden": "true"
}, Eo = ["aria-label"], No = {
  key: 0,
  class: "learning-unread-dot",
  "aria-hidden": "true"
}, qo = {
  role: "alertdialog",
  "aria-labelledby": "learning-confirm-title",
  class: "learning-confirm"
}, Oo = { id: "learning-confirm-title" }, Vo = { class: "learning-row" }, Uo = ["disabled"], Do = /* @__PURE__ */ Q({
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
    }, { state: n, pending: o, writable: u, canChat: v, localMessage: c, request: $ } = Tr(p), f = Ha(n), d = F(n.value.teacher ? "home" : "profile"), h = [], w = F(null), k = F(!1);
    Ae(() => w.value?.open ? (w.value.open = !1, !0) : !1, () => k.value);
    const m = F(null), g = F(null), x = F(null), K = {}, E = F(null), T = F(0), S = L(() => T.value >= 760), O = F("work"), U = F(!0), D = F(!1), N = F(62), P = L(() => Math.max(42, Math.ceil(320 / Math.max(T.value, 1) * 100))), q = L(() => Math.min(68, Math.floor((1 - 320 / Math.max(T.value, 1)) * 100))), B = L({
      get: () => S.value ? Math.min(q.value, Math.max(P.value, N.value)) : N.value,
      set: (A) => {
        N.value = A;
      }
    }), I = F(!1);
    let V, R;
    const J = () => {
      I.value = R?.matches ?? !1;
    };
    pe(() => {
      R = matchMedia("(prefers-reduced-motion: reduce)"), J(), R.addEventListener("change", J), !(!E.value || typeof ResizeObserver > "u") && (V = new ResizeObserver(([A]) => {
        T.value = A?.contentRect.width ?? 0;
      }), V.observe(E.value));
    }), fe(() => {
      V?.disconnect(), R?.removeEventListener("change", J);
    });
    const ie = L(() => S.value || O.value === "work"), _ = L(() => !!n.value.teacher && (S.value || O.value === "chat"));
    G([
      ie,
      _,
      I
    ], async ([A, y, C], oe, Ze) => {
      let Je = !0, Qe;
      if (Ze(() => {
        Je = !1, clearTimeout(Qe);
      }), A && (U.value = !0), y && (D.value = !0), await re(), !Je) return;
      A && x.value && (x.value.scrollTop = K[d.value] ?? 0);
      const Xe = () => {
        U.value = A, D.value = y;
      };
      S.value || C ? Xe() : Qe = setTimeout(Xe, 320);
    }, { immediate: !0 });
    function ve() {
      ie.value && x.value && (K[d.value] = x.value.scrollTop);
    }
    const ce = L(() => n.value.conversation.turns.length + n.value.conversation.removedTurns), Te = F(ce.value);
    G([ce, _], ([A, y]) => {
      (y || A < Te.value) && (Te.value = A);
    }, { immediate: !0 });
    const We = L(() => ce.value > Te.value), Rt = L(() => !n.value.unit || n.value.completions.some((A) => A.unitId === n.value.unit?.id));
    async function Pe() {
      n.value.teacher && (ve(), O.value = "chat", D.value = !0, await re(), O.value === "chat" && m.value?.focusHeading());
    }
    async function Be() {
      U.value = !0, O.value = "work", await re(), x.value && (x.value.scrollTop = K[d.value] ?? 0);
      const A = x.value?.querySelector("h1, h2");
      A && (A.tabIndex = -1, A.focus({ preventScroll: !0 }));
    }
    let ze = 0;
    G(() => !!n.value.record, async (A, y) => {
      d.value !== "books" || A === y || (A && (ze = x.value?.scrollTop ?? 0), await re(), d.value === "books" && x.value && (x.value.scrollTop = A ? 0 : ze));
    });
    const ee = F(null), Fe = F(null);
    ct(Fe, () => {
      ee.value = null;
    });
    const Ce = F(n.value.profile?.voice?.voiceId ?? n.value.voices.defaultVoice), Ie = F(n.value.profile?.voice?.language ?? n.value.language), Le = F(n.value.profile?.voice?.speed ?? 1), ge = F(0), Tt = L(() => n.value.completions.slice(ge.value * 20, (ge.value + 1) * 20));
    G([() => n.value.language, () => n.value.profile?.voice], ([A, y]) => {
      Ce.value = y?.voiceId ?? n.value.voices.defaultVoice, Ie.value = y?.language ?? A, Le.value = y?.speed ?? 1;
    }), G([
      () => n.value.chatIdentity,
      () => n.value.language,
      () => n.value.teacher?.name
    ], () => {
      g.value = null, ee.value = null, ge.value = 0;
    }), G(() => !!n.value.teacher, (A) => {
      A || (O.value = "work");
    }), G(() => n.value.currentUnitId, (A) => {
      ee.value?.action === "replace-lesson" && ee.value.input.unitId !== A && (ee.value = null);
    }), G(() => n.value.unit, (A) => {
      const y = g.value;
      y && (A?.id !== y.unitId || !(y.kind === "exercise" ? A.exercises : A.materials).some((C) => C.id === y.id)) && Ee();
    }), G(() => {
      const A = n.value.conversation.turns.at(-1)?.presentation;
      return A ? `${n.value.conversation.turns.length + n.value.conversation.removedTurns}:${A.unitId}:${A.kind}:${A.id}` : "";
    }, (A) => {
      const y = n.value.conversation.turns.at(-1)?.presentation;
      A && y && $e(y, !0);
    });
    const he = F(!1);
    G([ie, d], ([A, y]) => {
      A && y === "home" && (he.value = !1);
    });
    async function $e(A, y = !1) {
      if (A.kind === "replacement") {
        if (n.value.currentUnitId !== A.unitId || n.value.storage !== "ready") return;
        ue("replace-lesson", {
          unitId: A.unitId,
          message: A.message,
          kind: A.unitKind
        }, l.replaceWarning);
        return;
      }
      if (n.value.unit?.id === A.unitId) {
        if (n.value.unit.kind === "reading-writing") {
          if (y) {
            (!ie.value || d.value !== "home") && (he.value = !0);
            return;
          }
          f.unit(A.unitId).reading.view = "reading", await le("home");
          const C = A.kind === "exercise" ? `[data-exercise-id="${CSS.escape(A.id)}"]` : `[data-material-id="${CSS.escape(A.id)}"][data-paragraph-id]`;
          x.value?.querySelector(C)?.scrollIntoView({
            block: "start",
            behavior: matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth"
          });
          return;
        }
        g.value = A;
      }
    }
    function Ee() {
      g.value = null, $("stop");
    }
    async function He(A, y) {
      Ee(), ve(), O.value = "chat", D.value = !0, await re(), await m.value?.ask(A, y);
    }
    async function le(A, y = !1) {
      if (A !== d.value && !y) if (A === "home") h.length = 0;
      else {
        const C = h.indexOf(A);
        C >= 0 ? h.splice(C) : h.push(d.value);
      }
      if (x.value && (K[d.value] = x.value.scrollTop), w.value && (w.value.open = !1), d.value = A, await Be(), await re(), x.value) {
        x.value.scrollTop = K[A] ?? 0;
        const C = [...x.value.querySelectorAll("h1, h2")].find((oe) => oe.offsetParent !== null);
        C && (C.tabIndex = -1, C.focus({ preventScroll: !0 }));
      }
    }
    async function Ge() {
      await le("home"), x.value && (x.value.scrollTop = 0);
      const A = x.value?.querySelector("#learning-review-title");
      A && (A.tabIndex = -1, A.focus({ preventScroll: !0 }));
    }
    async function Ne(A, y = {}) {
      if (A === "prepare" && !n.value.profile) {
        f.setup.step = n.value.teacher ? 2 : 0, await le("profile");
        return;
      }
      A === "start-review" && await Ge();
      const C = n.value.unit;
      C?.kind === "reading-writing" && y.unitId === C.id && [
        "grade",
        "submit-revision",
        "skip-revision"
      ].includes(A) && (f.unit(C.id).reading.view = A !== "grade" || [
        "reviewing",
        "model",
        "complete"
      ].includes(C.stage.stage) ? "model" : "feedback", await le("home"), x.value && (x.value.scrollTop = 0)), await $(A, y);
    }
    G(() => f.settings.submitted, (A, y) => {
      !A && y && !f.settings.open && d.value === "profile" && f.setup.step === 2 && n.value.storage === "ready" && !n.value.busy && n.value.profile && Object.entries(y.value).every(([C, oe]) => n.value.profile.settings[C] === oe) && le("home");
    }), G(() => n.value.busy, (A) => {
      const y = n.value.unit;
      !A && y?.stage.stage === "revising" && f.unit(y.id).reading.view === "model" && (f.unit(y.id).reading.view = "feedback");
    });
    const Ke = Ae(() => w.value?.open ? (w.value.open = !1, !0) : !S.value && O.value === "chat" ? (Be(), !0) : d.value === "home" || !h.length && d.value === "profile" && !n.value.teacher ? !1 : (le(h.pop() ?? "home", !0), !0));
    function ue(A, y, C) {
      ee.value = {
        action: A,
        input: y,
        text: C
      };
    }
    async function Bt(A) {
      await $("records", {
        id: A,
        offset: n.value.records.offset
      }), n.value.record?.id === A && await le("books");
    }
    const { bubble: Ye, dismiss: qe } = Nr({
      root: E,
      state: n,
      pending: o,
      preference: f.companion,
      reading: L(() => ie.value && d.value === "home" && n.value.unit?.kind === "reading-writing" && [
        "writing",
        "grading",
        "complete"
      ].includes(n.value.unit.stage.stage)),
      blocked: L(() => !!g.value || !!ee.value || k.value),
      request: $
    });
    async function Et() {
      const A = await $("export");
      if (!A?.document) return;
      const y = URL.createObjectURL(new Blob([JSON.stringify(A.document, null, 2)], { type: "application/json" })), C = document.createElement("a");
      C.href = y, C.download = "LittleWhiteBox_Learning.json", C.click(), setTimeout(() => URL.revokeObjectURL(y), 1e3);
    }
    return (A, y) => (t(), i("section", {
      ref_key: "root",
      ref: E,
      class: "learning-app",
      style: vt({
        "--learning-switch-ms": `${r(320)}ms`,
        "--learning-work-share": `${B.value}%`
      }),
      "aria-label": "语伴语言学习"
    }, [
      a("header", qr, [
        d.value !== "home" && (r(n).teacher || h.length) && (S.value || O.value === "work") ? (t(), i("button", {
          key: 0,
          type: "button",
          class: "learning-toolbar-back",
          "aria-label": "返回上一页",
          onClick: y[0] || (y[0] = (...C) => r(Ke) && r(Ke)(...C))
        }, [W(H, { name: "back" })])) : b("", !0),
        a("button", {
          type: "button",
          class: "learning-wordmark",
          onClick: y[1] || (y[1] = (C) => le("home"))
        }, [
          y[32] || (y[32] = a("span", {
            class: "learning-brand-mark",
            "aria-hidden": "true"
          }, [z("a"), a("span", null, "あ")], -1)),
          y[33] || (y[33] = z("语伴", -1)),
          he.value && (S.value || O.value === "work") ? (t(), i("span", Or)) : b("", !0)
        ]),
        S.value && r(n).teacher ? (t(), i("label", Vr, [
          W(H, { name: "workbook" }),
          X(a("input", {
            "onUpdate:modelValue": y[2] || (y[2] = (C) => B.value = C),
            type: "range",
            min: P.value,
            max: q.value,
            step: "1",
            "aria-label": "阅读区宽度比例"
          }, null, 8, Ur), [[
            ne,
            B.value,
            void 0,
            { number: !0 }
          ]]),
          W(H, { name: "chat" })
        ])) : b("", !0),
        a("details", {
          ref_key: "menu",
          ref: w,
          class: "learning-menu",
          onToggle: y[3] || (y[3] = (C) => k.value = !!w.value?.open),
          onKeydown: y[4] || (y[4] = me(te((C) => w.value.open = !1, ["stop", "prevent"]), ["esc"]))
        }, [a("summary", Dr, [W(H, { name: "more" })]), a("nav", jr, [(t(), i(M, null, j([
          ["books", "语法本与生词本"],
          ["materials", "课件与笔记"],
          ["harvest", "我的收获"],
          ["settings", "设置"]
        ], ([C, oe]) => a("button", {
          key: C,
          type: "button",
          onClick: (Ze) => le(C)
        }, s(oe), 9, Wr)), 64))])], 544)
      ]),
      !r(n).busy && (r(n).message || r(c) || r(n).storage !== "ready") ? (t(), i("div", Pr, [z(s(r(c) || r(n).message || (r(n).storage === "unconfirmed" ? r(Ve).unconfirmed : r(n).storage === "conflict" ? r(Ve).conflict : r(Ve).unloaded)) + " ", 1), a("div", zr, [
        r(n).storage === "unconfirmed" || r(n).storage === "conflict" ? (t(), i("button", {
          key: 0,
          type: "button",
          disabled: r(o),
          onClick: y[5] || (y[5] = (C) => r($)("verify"))
        }, s(l.verify), 9, Fr)) : b("", !0),
        r(n).storage === "unconfirmed" ? (t(), i("button", {
          key: 1,
          type: "button",
          disabled: r(o),
          onClick: y[6] || (y[6] = (C) => r($)("retry-save"))
        }, s(l.retry), 9, Hr)) : b("", !0),
        r(n).storage === "conflict" ? (t(), i("button", {
          key: 2,
          type: "button",
          disabled: r(o),
          onClick: y[7] || (y[7] = (C) => ue("adopt-server", {}, l.adoptWarning))
        }, s(l.adopt), 9, Gr)) : b("", !0),
        r(n).storage === "unloaded" || r(c) ? (t(), i("button", {
          key: 3,
          type: "button",
          disabled: r(o),
          onClick: y[8] || (y[8] = (C) => r($)("read"))
        }, "重新加载", 8, Kr)) : b("", !0)
      ])])) : b("", !0),
      a("div", { class: ae(["learning-stage", {
        "is-wide": S.value,
        "is-chat": !S.value && O.value === "chat"
      }]) }, [
        a("div", {
          class: "learning-pane is-work",
          inert: !ie.value,
          "aria-hidden": !ie.value
        }, [a("div", {
          ref_key: "scroller",
          ref: x,
          class: "learning-scroll",
          onScrollPassive: ve
        }, [U.value ? (t(), i(M, { key: 0 }, [
          r(n).busy && (d.value !== "home" || !r(n).pending && !Rt.value) ? (t(), i("div", Zr, [
            y[34] || (y[34] = a("span", {
              class: "learning-working-dot",
              "aria-hidden": "true"
            }, null, -1)),
            a("span", null, s(r(n).message || l.working), 1),
            a("button", {
              type: "button",
              disabled: r(o),
              onClick: y[9] || (y[9] = (C) => r($)("cancel"))
            }, "停止", 8, Jr)
          ])) : b("", !0),
          d.value === "home" ? (t(), Y(tr, {
            key: 1,
            state: r(n),
            disabled: !r(u),
            pending: r(o),
            onAction: Ne,
            onConfirm: ue,
            onPresent: $e,
            onGo: le,
            onAsk: He,
            onRecord: Bt
          }, null, 8, [
            "state",
            "disabled",
            "pending"
          ])) : b("", !0),
          d.value === "profile" ? (t(), Y(Ti, {
            key: 2,
            state: r(n),
            disabled: !r(u),
            onAction: r($)
          }, null, 8, [
            "state",
            "disabled",
            "onAction"
          ])) : b("", !0),
          d.value === "materials" ? (t(), i("section", Qr, [
            y[35] || (y[35] = a("h1", null, "课件与笔记", -1)),
            r(n).unit ? b("", !0) : (t(), i("p", Xr, s(r(n).blockedUnit ? "当前课件在另一个故事中" : "还没有课件"), 1)),
            r(n).unit ? (t(), i(M, { key: 1 }, [
              a("p", _r, s(r(n).unit.title), 1),
              (t(!0), i(M, null, j(r(n).unit.materials, (C) => (t(), i("button", {
                key: C.id,
                type: "button",
                class: "learning-activity-link",
                onClick: (oe) => $e({
                  unitId: r(n).unit.id,
                  kind: "material",
                  id: C.id,
                  title: C.title
                })
              }, [
                W(H, { name: "book" }),
                a("span", null, s(C.title), 1),
                W(H, { name: "arrow" })
              ], 8, eo))), 128)),
              (t(!0), i(M, null, j(r(n).unit.exercises, (C) => (t(), i("button", {
                key: C.id,
                type: "button",
                class: "learning-activity-link",
                onClick: (oe) => $e({
                  unitId: r(n).unit.id,
                  kind: "exercise",
                  id: C.id,
                  title: C.prompt
                })
              }, [
                W(H, { name: "records" }),
                a("span", null, s(C.prompt), 1),
                W(H, { name: "arrow" })
              ], 8, to))), 128)),
              r(n).unit.notes.length ? (t(), i("section", ao, [(t(!0), i(M, null, j(r(n).unit.notes, (C) => (t(), i("article", { key: C.id }, [
                C.selection ? (t(), i("blockquote", no, s(C.selection.quote), 1)) : b("", !0),
                a("p", null, s(C.text), 1),
                a("button", {
                  type: "button",
                  disabled: !r(u),
                  onClick: (oe) => r($)("delete-note", { id: C.id })
                }, "删除笔记", 8, io)
              ]))), 128))])) : b("", !0)
            ], 64)) : b("", !0)
          ])) : b("", !0),
          d.value === "books" ? (t(), Y(ei, {
            key: 4,
            state: r(n),
            disabled: !r(u),
            onAction: Ne,
            onReview: Ge,
            onRemove: ue
          }, null, 8, ["state", "disabled"])) : b("", !0),
          d.value === "harvest" ? (t(), i("section", lo, [
            y[37] || (y[37] = a("div", { class: "learning-page-heading" }, [a("h1", null, "我的收获")], -1)),
            r(n).completions.length ? b("", !0) : (t(), i("p", so, "还没有完成的课程")),
            (t(!0), i(M, null, j(Tt.value, (C) => (t(), i("article", {
              key: C.unitId,
              class: "learning-harvest-entry"
            }, [
              a("small", null, s(new Date(C.completedAt).toLocaleDateString()), 1),
              C.rewardStatus !== "retired" ? (t(), i("h2", ro, [z(s(C.rewardStatus === "paid" ? "+" : "") + s(C.amount), 1), y[36] || (y[36] = a("span", null, "小白币", -1))])) : b("", !0),
              a("p", null, s(C.summary), 1),
              a("p", oo, s(C.rewardStatus === "paid" ? r(se).paid : C.rewardStatus === "retired" ? r(se).retired : r(se).pending), 1),
              C.rewardStatus !== "paid" && C.rewardStatus !== "retired" ? (t(), i("button", {
                key: 1,
                type: "button",
                disabled: !r(u) || r(n).walletStorage !== "ready",
                onClick: (oe) => r($)("reward", {
                  unitId: C.unitId,
                  openWallet: !r(n).walletOpen
                })
              }, s(r(n).walletOpen ? r(se).claim : r(se).openWallet), 9, uo)) : b("", !0)
            ]))), 128)),
            r(n).walletStorage === "unconfirmed" || r(n).walletStorage === "conflict" || r(n).walletStorage === "failed" ? (t(), i("button", {
              key: 1,
              type: "button",
              disabled: r(o) || r(n).busy,
              onClick: y[10] || (y[10] = (C) => r($)("verify-wallet"))
            }, s(l.verifyWallet), 9, vo)) : b("", !0),
            r(n).walletStorage === "conflict" ? (t(), i("button", {
              key: 2,
              type: "button",
              disabled: r(o) || r(n).busy,
              onClick: y[11] || (y[11] = (C) => ue("adopt-wallet", {}, l.adoptWalletWarning))
            }, s(l.adoptWallet), 9, co)) : b("", !0),
            r(n).completions.length > 20 ? (t(), i("div", go, [a("button", {
              type: "button",
              disabled: ge.value === 0,
              onClick: y[12] || (y[12] = (C) => ge.value--)
            }, "上一页", 8, mo), a("button", {
              type: "button",
              disabled: (ge.value + 1) * 20 >= r(n).completions.length,
              onClick: y[13] || (y[13] = (C) => ge.value++)
            }, "下一页", 8, bo)])) : b("", !0)
          ])) : b("", !0),
          d.value === "settings" ? (t(), i("section", po, [
            y[47] || (y[47] = a("h1", null, "学习设置", -1)),
            a("label", null, [y[38] || (y[38] = z("当前语言", -1)), a("select", {
              value: r(n).language,
              disabled: !r(u),
              onChange: y[14] || (y[14] = (C) => r($)("language", { language: C.target.value }))
            }, [(t(!0), i(M, null, j([.../* @__PURE__ */ new Set([r(n).language, ...r(n).languages])], (C) => (t(), i("option", {
              key: C,
              value: C
            }, s(new Intl.DisplayNames(["zh-CN"], { type: "language" }).of(C)), 9, yo))), 128))], 40, fo)]),
            a("button", {
              type: "button",
              onClick: y[15] || (y[15] = (C) => le("profile"))
            }, "更换语言和语伴 →"),
            W(St),
            a("section", null, [
              y[39] || (y[39] = a("h2", null, "训练设置", -1)),
              r(n).profile?.goal.description ? (t(), i("p", ko, s(r(n).profile.goal.description), 1)) : b("", !0),
              W(Lt, {
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
              y[44] || (y[44] = a("h2", null, "语伴的声音", -1)),
              r(n).voices.enabled ? (t(), i("form", {
                key: 1,
                onSubmit: y[19] || (y[19] = te((C) => r($)("voice", { voice: {
                  voiceId: Ce.value,
                  language: Ie.value,
                  speed: Number(Le.value)
                } }), ["prevent"]))
              }, [
                a("label", null, [y[40] || (y[40] = z("音色", -1)), X(a("select", { "onUpdate:modelValue": y[16] || (y[16] = (C) => Ce.value = C) }, [(t(!0), i(M, null, j(r(n).voices.voices, (C) => (t(), i("option", {
                  key: C.id,
                  value: C.id,
                  disabled: !C.available
                }, s(C.name) + s(C.available ? "" : "（暂不可用）"), 9, $o))), 128))], 512), [[Se, Ce.value]])]),
                a("label", null, [y[41] || (y[41] = z("发音语言", -1)), X(a("input", {
                  "onUpdate:modelValue": y[17] || (y[17] = (C) => Ie.value = C),
                  type: "text",
                  maxlength: "80",
                  placeholder: "en / ja"
                }, null, 512), [[ne, Ie.value]])]),
                a("label", null, [y[43] || (y[43] = z("语速", -1)), X(a("select", { "onUpdate:modelValue": y[18] || (y[18] = (C) => Le.value = C) }, [...y[42] || (y[42] = [
                  a("option", { value: 0.75 }, "0.75×", -1),
                  a("option", { value: 1 }, "1×", -1),
                  a("option", { value: 1.25 }, "1.25×", -1)
                ])], 512), [[Se, Le.value]])]),
                a("button", {
                  type: "submit",
                  disabled: !r(u) || !r(n).profile
                }, "保存声音设置", 8, wo)
              ], 32)) : (t(), i("p", ho, s(l.voiceDisabled), 1)),
              a("button", {
                type: "button",
                onClick: y[20] || (y[20] = (C) => r($)("tts-settings"))
              }, s(r(n).voices.enabled ? r(Ue).settings : r(Ue).enable), 1),
              y[45] || (y[45] = a("small", null, "已听过的题保留原声音，新偏好用于之后的题目。", -1))
            ]),
            a("section", null, [
              y[46] || (y[46] = a("h2", null, "学习数据", -1)),
              a("button", {
                type: "button",
                disabled: r(o) || r(n).busy,
                onClick: y[21] || (y[21] = (C) => ue("forget-conversation", {}, "清空和当前语伴的对话？目标、课件、学习记录和奖励都会保留。"))
              }, "清空对话记录", 8, xo),
              a("button", {
                type: "button",
                disabled: !r(u),
                onClick: Et
              }, "导出学习数据", 8, Co),
              a("button", {
                type: "button",
                disabled: r(o) || r(n).busy,
                onClick: y[22] || (y[22] = (C) => r($)("read"))
              }, "重新加载", 8, Io),
              r(n).unit || r(n).blockedUnit ? (t(), i("button", {
                key: 0,
                type: "button",
                disabled: !r(u),
                onClick: y[23] || (y[23] = (C) => ue("abandon", {}, r(xe).lesson))
              }, "放下当前练习", 8, Lo)) : b("", !0),
              a("button", {
                type: "button",
                class: "learning-danger",
                disabled: !r(u) || !r(n).profile,
                onClick: y[24] || (y[24] = (C) => ue("delete-language", {}, "删除当前语言的全部学习数据？未领取奖励也将放弃，已到账流水保留。"))
              }, "删除当前语言", 8, So),
              a("button", {
                type: "button",
                class: "learning-danger",
                disabled: !r(u),
                onClick: y[25] || (y[25] = (C) => ue("clear", {}, "清空所有语言的目标、课程和记录？未领取奖励也将放弃。已到账流水不撤销。"))
              }, "清空全部学习数据", 8, Ao)
            ])
          ])) : b("", !0)
        ], 64)) : b("", !0)], 544)], 8, Yr),
        r(n).teacher ? (t(), i("div", {
          key: 0,
          class: "learning-pane is-chat",
          inert: !_.value,
          "aria-hidden": !_.value
        }, [D.value ? (t(), Y(Rr, {
          key: 0,
          ref_key: "conversation",
          ref: m,
          state: r(n),
          disabled: !r(v),
          pending: r(o),
          onAction: r($),
          onPresent: $e,
          onProfile: y[26] || (y[26] = (C) => le("profile"))
        }, null, 8, [
          "state",
          "disabled",
          "pending",
          "onAction"
        ])) : b("", !0)], 8, Mo)) : b("", !0),
        !S.value && O.value === "work" && r(n).teacher ? (t(), i("button", {
          key: 1,
          type: "button",
          class: "learning-float is-companion",
          "aria-label": We.value ? `和${r(n).teacher.name}聊天，有新消息` : `和${r(n).teacher.name}聊天`,
          onClick: Pe
        }, [a("span", To, s([...r(n).teacher.name][0]), 1), We.value ? (t(), i("span", Bo)) : b("", !0)], 8, Ro)) : b("", !0),
        !S.value && O.value === "chat" ? (t(), i("button", {
          key: 2,
          type: "button",
          class: "learning-float is-workbook",
          "aria-label": he.value ? "回到练习本，有新指引" : "回到练习本",
          onClick: Be
        }, [W(H, { name: "workbook" }), he.value ? (t(), i("span", No)) : b("", !0)], 8, Eo)) : b("", !0),
        r(Ye) ? (t(), i("aside", {
          key: 3,
          class: ae(["learning-companion-bubble", { "is-wide": S.value }]),
          "aria-live": "polite"
        }, [a("button", {
          type: "button",
          onClick: y[27] || (y[27] = (C) => {
            Pe(), r(qe)();
          })
        }, s(r(Ye)), 1), a("button", {
          type: "button",
          "aria-label": "收起这句话",
          onClick: y[28] || (y[28] = (...C) => r(qe) && r(qe)(...C))
        }, [W(H, { name: "close" })])], 2)) : b("", !0)
      ], 2),
      g.value ? b("", !0) : (t(), Y($t, {
        key: 1,
        state: r(n),
        onAction: r($)
      }, null, 8, ["state", "onAction"])),
      r(n).unit && g.value ? (t(), Y(cn, {
        key: `${r(n).chatIdentity}:${r(n).language}:${r(n).unit.id}:${g.value.kind}:${g.value.id}`,
        state: r(n),
        target: g.value,
        disabled: !r(u),
        onAction: r($),
        onClose: Ee,
        onAsk: He
      }, null, 8, [
        "state",
        "target",
        "disabled",
        "onAction"
      ])) : b("", !0),
      ee.value ? (t(), i("div", {
        key: 3,
        ref_key: "confirmLayer",
        ref: Fe,
        class: "learning-confirm-shade",
        onKeydown: y[31] || (y[31] = me(te((C) => ee.value = null, ["stop", "prevent"]), ["esc"]))
      }, [a("section", qo, [
        a("h2", Oo, s(r(at)[ee.value.action].title), 1),
        a("p", null, s(ee.value.text), 1),
        a("div", Vo, [a("button", {
          autofocus: "",
          type: "button",
          onClick: y[29] || (y[29] = (C) => ee.value = null)
        }, s(l.cancel), 1), a("button", {
          type: "button",
          class: "learning-primary",
          disabled: r(o) || r(n).busy,
          onClick: y[30] || (y[30] = (C) => {
            Ne(ee.value.action, ee.value.input), ee.value = null;
          })
        }, s(r(at)[ee.value.action].accept), 9, Uo)])
      ])], 544)) : b("", !0)
    ], 4));
  }
}), Fo = Do;
export {
  Fo as default
};
