<script setup lang="ts">
import { computed, nextTick, ref, watch } from 'vue';
import type { LearningClientState } from '../types.js';
import type { LearningSelection } from '../../../domains/learning/notes.js';
import AnswerInput from './AnswerInput.vue';
import MaterialReader from './MaterialReader.vue';
import AttemptFeedback from './AttemptFeedback.vue';
import LearningIcon from './LearningIcon.vue';
import { learningAnswerText } from './answer-text.js';
import { createLearningAnswerDraft, type LearningAnswerDraft } from './answer-draft.js';
const props = defineProps<{ state: LearningClientState; disabled: boolean }>();
const emit = defineEmits<{ action: [name: string, input?: Record<string, unknown>] }>();
const index = ref(0);
const retry = ref(false);
const ask = ref('');
const selected = ref<LearningSelection | null>(null);
const pane = ref<'material' | 'question'>('material');
const course = ref<HTMLElement | null>(null);
let paneScroll: Partial<Record<typeof pane.value, number>> = {};
const tutorOpen = ref(false);
const tutor = ref<HTMLElement | null>(null);
const question = computed(() => props.state.unit?.exercises[index.value]);
const attempt = computed(() => props.state.unit?.attempts.filter(entry => entry.exerciseId === question.value?.id).at(-1));
const feedback = computed(() => props.state.unit?.assessments.find(entry => entry.attemptId === attempt.value?.id));
const drafts = ref<Record<string, { attemptId: string | undefined; value: LearningAnswerDraft }>>({});
watch([() => question.value?.id, () => attempt.value?.id], ([id, attemptId]) => {
    if (id && (!drafts.value[id] || drafts.value[id].attemptId !== attemptId)) {
        drafts.value[id] = { attemptId, value: createLearningAnswerDraft(question.value!.response) };
    }
}, { immediate: true });
const draft = computed({
    get: () => drafts.value[question.value!.id].value,
    set(value: LearningAnswerDraft) { drafts.value[question.value!.id] = { attemptId: attempt.value?.id, value }; },
});
const materials = computed(() => props.state.unit?.materials.filter(material => question.value?.materialIds.includes(material.id)) ?? []);
const paragraphs = computed(() => materials.value.filter(material => question.value?.response.kind !== 'evidence'
    || material.id === question.value.response.materialId).flatMap(material => material.paragraphs));
const completed = computed(() => props.state.completions.find(entry => entry.unitId === props.state.unit?.id));
const finishedQuestions = computed(() => props.state.unit?.exercises.every(exercise => props.state.unit?.attempts.some(entry => entry.exerciseId === exercise.id)));
watch(() => props.state.unit?.id, () => { index.value = 0; retry.value = false; selected.value = null; ask.value = ''; });
watch(index, () => { retry.value = false; selected.value = null; paneScroll = {}; emit('action', 'stop'); });
watch(selected, async value => { if (value) { tutorOpen.value = true; await nextTick(); tutor.value?.scrollIntoView({ block: 'nearest' }); } });
watch(() => props.state.reply, value => { if (value?.exerciseId === question.value?.id) { tutorOpen.value = true; } });
watch(() => attempt.value?.id, () => { retry.value = false; });
const skills = { reading: '阅读理解', listening: '听力练习', vocabulary: '词汇运用', grammar: '语法练习', writing: '表达练习' };
async function switchPane(next: typeof pane.value) {
    if (pane.value === next) { return; }
    const scroller = course.value?.closest<HTMLElement>('.learning-scroll');
    const start = scroller && course.value ? course.value.getBoundingClientRect().top - scroller.getBoundingClientRect().top + scroller.scrollTop : 0;
    if (scroller) { paneScroll[pane.value] = scroller.scrollTop; }
    pane.value = next;
    await nextTick();
    course.value?.querySelector<HTMLButtonElement>('.learning-pane-nav button[aria-pressed=true]')?.focus({ preventScroll: true });
    if (scroller) { scroller.scrollTop = paneScroll[next] ?? start; }
}
function askTeacher() {
    if (!question.value || !ask.value.trim()) { return; }
    emit('action', 'explain', { exerciseId: question.value.id, message: ask.value, ...(selected.value ? { selection: selected.value } : {}) });
}
</script>

<template>
    <div v-if="state.unit && question" class="learning-classroom">
        <header class="learning-lesson-header">
            <h1>{{ state.unit.title }}</h1><details class="learning-lesson-goal"><summary>本课目标<span><LearningIcon name="reward" />{{ state.unit.reward.amount }} 币</span></summary><p class="learning-muted">{{ state.unit.goal }}</p></details>
            <nav v-if="state.unit.exercises.length > 1" class="learning-question-nav" aria-label="题目导航">
                <button
                    v-for="(exercise, number) in state.unit.exercises" :key="exercise.id" type="button" :disabled="disabled"
                    :aria-current="number === index ? 'step' : undefined" @click="index = number"
                >
                    {{ String(number + 1).padStart(2, '0') }}<LearningIcon v-if="state.unit.attempts.some(entry => entry.exerciseId === exercise.id)" name="check" aria-label="已作答" />
                </button>
            </nav>
        </header>
        <div class="learning-classroom-columns" :class="`learning-pane-${materials.length ? pane : 'question'}`">
            <div ref="course" class="learning-course">
                <nav class="learning-pane-nav" aria-label="课堂内容"><button type="button" :disabled="!materials.length" :aria-pressed="pane === 'material' && !!materials.length" @click="switchPane('material')"><LearningIcon name="book" />材料</button><button type="button" :aria-pressed="pane === 'question' || !materials.length" @click="switchPane('question')"><LearningIcon name="records" />练习</button></nav>
                <div class="learning-materials-pane">
                    <MaterialReader
                        v-for="material in materials" :key="material.id" :material="material" :exercise-id="question.id" :disabled="disabled"
                        @action="(name, input) => emit('action', name, input)" @select="selected = $event"
                    />
                    <button type="button" class="learning-primary learning-start-answer" @click="switchPane('question')">去做这一题<LearningIcon name="arrow" /></button>
                </div>
                <section class="learning-question">
                    <p class="learning-eyebrow">{{ skills[question.skill] }} · {{ index + 1 }} / {{ state.unit.exercises.length }}</p>
                    <h2>{{ question.prompt }}</h2>
                    <div class="learning-help-actions">
                        <button type="button" :disabled="disabled || [...question.prompt].length > 1000" @click="emit('action', 'say-question', { exerciseId: question.id })">听题干</button>
                        <button v-if="question.hasHint" type="button" :disabled="disabled || question.hint !== null" @click="emit('action', 'reveal', { kind: 'hints', id: question.id })">提示</button>
                        <button type="button" :disabled="disabled || question.solution !== null" @click="emit('action', 'reveal', { kind: 'answers', id: question.id })">解答</button>
                    </div>
                    <p v-if="question.hint" class="learning-margin-note">{{ question.hint }}</p>
                    <div v-if="question.solution" class="learning-margin-note">
                        <p v-if="question.solution.kind === 'exact'">{{ learningAnswerText(question.solution.answer, question.response, paragraphs) }}</p>
                        <p v-else-if="question.solution.kind === 'gaps'">{{ question.solution.accepted.map(entry => entry.forms.join(' / ')).join('\n') }}</p>
                        <template v-if="question.solution.kind === 'exact' || question.solution.kind === 'gaps'">{{ question.solution.explanation }}</template>
                        <template v-else>
                            这是一道开放题，老师会根据你的表达评估。
                            <button type="button" :disabled="disabled" @click="emit('action', 'explain', { exerciseId: question.id, message: '请讲解这道题，给我一个适合当前水平的参考表达。' })">请老师示范</button>
                        </template>
                    </div>
                    <AnswerInput
                        v-if="!attempt || retry" :key="question.id" v-model="draft" :response="question.response" :paragraphs="paragraphs" :disabled="disabled"
                        @submit="emit('action', 'submit', { unitId: state.unit!.id, exerciseId: question!.id, answer: $event })"
                    />
                    <AttemptFeedback
                        v-if="attempt" :attempt="attempt" :feedback="feedback" :response="question.response" :paragraphs="paragraphs" :disabled="disabled"
                        @action="(name, input) => emit('action', name, input)"
                    />
                    <div v-if="attempt" class="learning-row">
                        <button type="button" :disabled="disabled" @click="retry = !retry">{{ retry ? '收起再练' : '再试一次' }}</button>
                        <button v-if="index + 1 < state.unit.exercises.length" class="learning-primary" type="button" :disabled="disabled" @click="index++">下一题 →</button>
                        <button v-else-if="!completed && finishedQuestions && !state.busy" type="button" :disabled="disabled" @click="emit('action', 'complete')">请老师结课</button>
                    </div>
                </section>
                <section v-if="completed" class="learning-harvest-inline">
                    <p class="learning-eyebrow">本课已完成</p><p>{{ completed.summary }}</p>
                    <strong>{{ completed.paid ? `+${completed.amount} 小白币 · 已到账` : '学习已完成，到账状态见「收获」' }}</strong>
                </section>
            </div>
            <aside ref="tutor" class="learning-tutor">
                <details :open="tutorOpen" @toggle="tutorOpen = ($event.target as HTMLDetailsElement).open">
                    <summary><span class="learning-tutor-identity"><span class="learning-person-initial">{{ [...(state.teacher?.name ?? '师')][0] }}</span><span>{{ state.teacher?.name }}</span></span><span><LearningIcon name="chat" />问老师</span></summary>
                    <div v-if="selected" class="learning-selection">
                        <blockquote>{{ selected.quote }}</blockquote>
                        <div class="learning-row"><button type="button" @click="selected = null">取消选段</button><button type="button" :disabled="disabled || [...selected.quote].length > 1000" @click="emit('action', 'say', { selection: selected })">朗读选段</button></div>
                    </div>
                    <form @submit.prevent="askTeacher">
                        <label>哪里还不明白？<textarea v-model="ask" rows="3" :maxlength="selected ? 1800 : 2000" placeholder="解释这个用法，或者帮我换个例子…" /></label>
                        <button class="learning-primary" type="submit" :disabled="disabled || !ask.trim()">问老师</button>
                    </form>
                    <small class="learning-muted">提问将调用模型</small>
                    <div v-if="state.reply" class="learning-teacher-reply">
                        <p class="learning-eyebrow">{{ state.teacher?.name }}</p>
                        <p>{{ state.reply.text }}</p>
                        <button v-if="[...state.reply.text].length <= 1000" type="button" :disabled="disabled" @click="emit('action', 'say-reply')">听老师说</button>
                        <button v-if="state.reply.exerciseId" type="button" :disabled="disabled || [...state.reply.text].length > 4000 || state.unit.notes.some(note => note.text === state.reply!.text)" @click="emit('action', 'save-note')">保存笔记</button>
                    </div>
                </details>
                <details v-if="state.unit.notes.length" class="learning-notes">
                    <summary>本课笔记 · {{ state.unit.notes.length }}</summary>
                    <article v-for="note in state.unit.notes" :key="note.id">
                        <blockquote v-if="note.selection">{{ note.selection.quote }}</blockquote><p>{{ note.text }}</p>
                        <button type="button" :disabled="disabled" @click="emit('action', 'delete-note', { id: note.id })">移除笔记</button>
                    </article>
                    <small>随本课保留，换课前可以导出学习数据留存。</small>
                </details>
            </aside>
        </div>
    </div>
</template>
