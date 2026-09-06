<script setup lang="ts">
import { computed, nextTick, ref, watch } from 'vue';
import type { LearningClientState } from '../types.js';
import LearningIcon from './LearningIcon.vue';
const props = defineProps<{ state: LearningClientState; disabled: boolean }>();
const emit = defineEmits<{ action: [name: string, input: Record<string, unknown>] }>();
const step = ref(props.state.profile && props.state.teacher ? 2 : 0);
const heading = ref<HTMLElement | null>(null);
const name = ref('');
const assessment = ref('');
const goal = ref('');
const explanationLanguage = ref('zh-CN');
watch(() => JSON.stringify([props.state.language, props.state.profile && { selfAssessment: props.state.profile.selfAssessment,
    goal: props.state.profile.goal, explanationLanguage: props.state.profile.explanationLanguage }]), () => {
    const profile = props.state.profile;
    assessment.value = profile?.selfAssessment ?? ''; goal.value = profile?.goal.description ?? '';
    explanationLanguage.value = profile?.explanationLanguage ?? 'zh-CN';
}, { immediate: true });
const languages = [['en', '英语', 'Aa'], ['ja', '日语', 'あ'], ['ko', '韩语', '한'], ['fr', '法语', 'Ç'], ['de', '德语', 'ß'], ['es', '西班牙语', 'Ñ'], ['zh-CN', '中文', '文']];
const languageName = computed(() => new Intl.DisplayNames(['zh-CN'], { type: 'language' }).of(props.state.language));
async function go(value: number) { step.value = value; await nextTick(); heading.value?.focus(); }
function save() {
    emit('action', 'profile', { message: JSON.stringify({ language: props.state.language, explanationLanguage: explanationLanguage.value,
        selfAssessment: assessment.value, goal: { description: goal.value } }) });
}
</script>

<template>
    <section class="learning-profile-page">
        <nav class="learning-setup-progress" aria-label="学习设置步骤">
            <button v-for="(label, index) in ['语言', '老师', '目标']" :key="label" type="button" :disabled="disabled || (index === 2 && !state.teacher)" :aria-current="step === index ? 'step' : undefined" @click="go(index)"><span>{{ index + 1 }}</span>{{ label }}</button>
        </nav>
        <div class="learning-setup-heading"><h1 ref="heading" tabindex="-1">{{ ['选择语言', '选择老师', '学习目标'][step] }}</h1></div>
        <template v-if="step === 0">
            <div class="learning-language-options">
                <button v-for="[code, label, glyph] in languages" :key="code" type="button" :disabled="disabled" :aria-pressed="state.language === code" @click="emit('action', 'language', { language: code })"><span aria-hidden="true">{{ glyph }}</span><strong>{{ label }}</strong><LearningIcon v-if="state.language === code" name="check" /></button>
            </div>
            <p v-if="!languages.some(([code]) => code === state.language)" class="learning-muted">当前选择：{{ languageName }}</p>
            <button type="button" class="learning-primary learning-setup-next" :disabled="disabled" @click="go(1)">继续<LearningIcon name="arrow" /></button>
        </template>
        <template v-else-if="step === 1">
            <div class="learning-teacher-options">
                <button v-for="person in state.candidates" :key="person.name" type="button" :disabled="disabled" :aria-pressed="state.teacher?.name === person.name" @click="emit('action', 'teacher', { teacher: { name: person.name, note: '' } })"><span class="learning-person-initial">{{ [...person.name][0] }}</span><strong>{{ person.name }}</strong><LearningIcon v-if="state.teacher?.name === person.name" name="check" /></button>
            </div>
            <p v-if="state.teacher && !state.candidates.some(person => person.name === state.teacher?.name)" class="learning-selected-teacher"><span class="learning-person-initial">{{ [...state.teacher.name][0] }}</span>{{ state.teacher.name }}<LearningIcon name="check" /></p>
            <details class="learning-other-teacher" :open="!state.candidates.length && !state.teacher"><summary>选择其他人物</summary><form class="learning-row" @submit.prevent="emit('action', 'teacher', { teacher: { name: name.trim(), note: '' } })"><input v-model="name" type="text" aria-label="其他人物名字" maxlength="80" placeholder="输入人物名字" :disabled="disabled"><button type="submit" :disabled="disabled || !name.trim()">选这位</button></form></details>
            <div class="learning-setup-actions"><button type="button" :disabled="disabled" @click="go(0)">上一步</button><button type="button" class="learning-primary" :disabled="disabled || !state.teacher" @click="go(2)">继续<LearningIcon name="arrow" /></button></div>
        </template>
        <template v-else>
            <div class="learning-profile-context"><span>{{ languageName }}</span><span>{{ state.teacher?.name ?? '尚未选择老师' }}</span><button type="button" :disabled="disabled" @click="go(0)">更换</button></div>
            <div v-if="state.reply?.action === 'profile'" class="learning-teacher-reply" role="status">
                <strong>{{ state.teacher?.name }}</strong>
                <p>{{ state.reply.text }}</p>
            </div>
            <form class="learning-profile-form" @submit.prevent="save">
                <label><span>目前的水平</span><textarea v-model="assessment" rows="2" maxlength="800" placeholder="例如：有高中基础，阅读还行，听力跟不上。" /></label>
                <label><span>想达到的目标</span><textarea v-model="goal" rows="2" maxlength="800" placeholder="例如：准备英语四级，希望能读懂新闻。" /></label>
                <details class="learning-explanation-language"><summary>讲解语言 · {{ languages.find(([code]) => code === explanationLanguage)?.[1] ?? explanationLanguage }}</summary><label>老师用什么语言讲解<select v-model="explanationLanguage"><option v-for="[code, label] in languages" :key="code" :value="code">{{ label }}</option></select></label></details>
                <div class="learning-setup-actions"><button type="button" :disabled="disabled" @click="go(1)">上一步</button><button type="submit" class="learning-primary" :disabled="disabled || !state.teacher || !assessment.trim() || !goal.trim()">{{ state.message && !state.busy ? '重试保存' : '保存目标' }}<LearningIcon name="arrow" /></button></div>
                <small>保存目标将调用模型</small>
            </form>
        </template>
    </section>
</template>
