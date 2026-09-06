<script setup lang="ts">
import { ref, watch } from 'vue';
import type { LearningClientState } from '../types.js';
const props = defineProps<{ state: LearningClientState; disabled: boolean }>();
const emit = defineEmits<{ action: [name: string, input: Record<string, unknown>] }>();
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
const languages = [['en', '英语'], ['ja', '日语'], ['ko', '韩语'], ['fr', '法语'], ['de', '德语'], ['es', '西班牙语'], ['zh-CN', '中文']];
function save() {
    emit('action', 'profile', { message: JSON.stringify({ language: props.state.language, explanationLanguage: explanationLanguage.value,
        selfAssessment: assessment.value, goal: { description: goal.value } }) });
}
</script>

<template>
    <section class="learning-profile-page">
        <p class="learning-eyebrow">先认识你，再一起学</p><h1>{{ state.profile ? '调整学习方向' : '从你现在的位置开始。' }}</h1>
        <p class="learning-muted">不用准确评定等级。告诉老师你会什么，想做到什么。</p>
        <label class="learning-language-choice">我想学<select :value="state.language" :disabled="disabled" @change="emit('action', 'language', { language: ($event.target as HTMLSelectElement).value })">
            <option v-for="[code, label] in languages" :key="code" :value="code">{{ label }}</option>
            <option v-if="!languages.some(([code]) => code === state.language)" :value="state.language">{{ state.language }}</option>
        </select></label>
        <section class="learning-choose-teacher">
            <h2>谁来陪你学？</h2><p class="learning-muted">{{ state.teacher ? `现在是 ${state.teacher.name}。老师选择只属于当前聊天。` : '从已知人物里选一位老师。' }}</p>
            <div class="learning-teacher-options">
                <button
                    v-for="person in state.candidates" :key="person.name" type="button" :disabled="disabled" :aria-pressed="state.teacher?.name === person.name"
                    @click="emit('action', 'teacher', { teacher: { name: person.name, note: '' } })"
                >
                    <span class="learning-person-initial">{{ [...person.name][0] }}</span>{{ person.name }}
                </button>
            </div>
            <form class="learning-row" @submit.prevent="emit('action', 'teacher', { teacher: { name: name.trim(), note: '' } })">
                <input v-model="name" type="text" aria-label="其他人物名字" maxlength="80" placeholder="名单里没有？填写人物名字" :disabled="disabled"><button type="submit" :disabled="disabled || !name.trim()">选这位</button>
            </form>
        </section>
        <form class="learning-profile-form" @submit.prevent="save">
            <label><span>现在的我</span><textarea v-model="assessment" rows="3" maxlength="800" placeholder="比如：有高中英语基础，阅读还行，听力容易跟不上。" /></label>
            <label><span>我想走到哪里</span><textarea v-model="goal" rows="3" maxlength="800" placeholder="比如：准备英语四级，希望能理解新闻并写出清楚的短文。也可以补充考试日期。" /></label>
            <label>希望老师用什么语言讲解<select v-model="explanationLanguage"><option v-for="[code, label] in languages" :key="code" :value="code">{{ label }}</option></select></label>
            <button type="submit" class="learning-primary" :disabled="disabled || !state.teacher || !assessment.trim() || !goal.trim()">请老师记住我的目标 →</button>
            <small>这一步会使用模型。目标与学习记录跟随用户，不随角色卡丢失。</small>
        </form>
        <div v-if="state.reply" class="learning-teacher-reply"><p class="learning-eyebrow">{{ state.teacher?.name }}</p><p>{{ state.reply.text }}</p></div>
    </section>
</template>
