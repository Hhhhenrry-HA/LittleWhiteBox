<script setup lang="ts">
import { computed, ref, watch } from 'vue';
import type { LearningClientState } from '../types.js';
import LearningIcon from './LearningIcon.vue';
const props = defineProps<{ state: LearningClientState; disabled: boolean }>();
defineEmits<{ navigate: [page: 'lesson' | 'profile' | 'records' | 'harvest']; prepare: [message: string, short: boolean]; action: [name: string] }>();
const request = ref('');
const preparationOpen = ref(!props.state.unit);
watch(() => props.state.reply, reply => { if (reply?.action === 'prepare') { preparationOpen.value = true; } });
const language = computed(() => new Intl.DisplayNames(['zh-CN'], { type: 'language' }).of(props.state.language));
const answered = computed(() => props.state.unit?.exercises.filter(exercise => props.state.unit!.attempts.some(attempt => attempt.exerciseId === exercise.id)).length ?? 0);
const completed = computed(() => props.state.completions.some(entry => entry.unitId === props.state.unit?.id));
</script>

<template>
    <section class="learning-desk">
        <button class="learning-teacher-line" type="button" @click="$emit('navigate', 'profile')">
            <span class="learning-person-initial">{{ [...(state.teacher?.name ?? '？')][0] }}</span>
            <strong>{{ state.teacher?.name ?? '选择老师' }}</strong>
            <span class="learning-language-badge">{{ language }}<LearningIcon name="arrow" /></span>
        </button>
        <section class="learning-current-course">
            <div class="learning-course-mark" aria-hidden="true"><LearningIcon name="book" /></div>
            <h1>{{ state.unit?.title ?? '准备第一课' }}</h1>
            <p v-if="state.unit" class="learning-course-goal">{{ state.unit.goal }}</p>
            <template v-if="state.unit">
                <div class="learning-course-progress"><span>{{ completed ? '已完成' : `${answered} / ${state.unit.exercises.length} 题` }}</span><span><LearningIcon name="reward" />{{ state.unit.reward.amount }} 币</span></div>
                <progress :value="answered" :max="state.unit.exercises.length" aria-label="本课作答进度" />
                <button type="button" class="learning-primary learning-course-start" @click="$emit('navigate', 'lesson')">{{ completed ? '回顾这一课' : answered ? '继续学习' : '进入课堂' }}<LearningIcon name="arrow" /></button>
            </template>
            <button v-else-if="!state.profile || !state.teacher" type="button" class="learning-primary learning-course-start" @click="$emit('navigate', 'profile')">设置学习目标<LearningIcon name="arrow" /></button>
            <button v-else type="button" class="learning-primary learning-course-start" :disabled="disabled" @click="$emit('prepare', request, false)">请老师备课<LearningIcon name="arrow" /></button>
            <small v-if="!state.unit && state.profile && state.teacher" class="learning-request-cost">备课将调用模型</small>
        </section>
        <p v-if="state.blockedUnit" class="learning-margin-note">上一课属于其他故事。回到原聊天可继续，也可以在这里换一课。</p>
        <template v-if="state.profile && state.teacher">
            <details class="learning-next-lesson">
                <summary>{{ state.unit || state.blockedUnit ? '换一课' : '指定练习内容' }}<span>＋</span></summary>
                <label>练习内容<textarea v-model="request" rows="2" maxlength="2000" placeholder="四级阅读、新闻听力……" /></label>
                <div class="learning-row"><button type="button" class="learning-primary" :disabled="disabled" @click="$emit('prepare', request, false)">准备{{ state.unit ? '新' : '这一' }}课</button><button type="button" :disabled="disabled" @click="$emit('prepare', request, true)">今天轻松一点</button></div>
                <small class="learning-request-cost">备课将调用模型</small>
            </details>
            <details v-if="state.reply?.action === 'prepare'" class="learning-teacher-reply" :open="preparationOpen" @toggle="preparationOpen = ($event.target as HTMLDetailsElement).open"><summary>{{ state.teacher.name }} · 备课留言</summary><p>{{ state.reply.text }}</p><button v-if="[...state.reply.text].length <= 1000" type="button" :disabled="disabled" @click="$emit('action', 'say-reply')"><LearningIcon name="sound" />听老师说</button></details>
        </template>
    </section>
</template>
