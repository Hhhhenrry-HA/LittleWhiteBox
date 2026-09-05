<script setup lang="ts">
import type { TaskRecord } from '../types.js';
import TaskRecordCard from './TaskRecordCard.vue';
import TaskIcon from './TaskIcon.vue';
defineProps<{ records: TaskRecord[]; disabledReason: string }>();
defineEmits<{ open: [task: TaskRecord]; publish: []; history: [] }>();
</script>
<template>
    <section class="tasks-page">
        <div class="tasks-publish-invite"><span class="tasks-invite-mark"><TaskIcon name="send" /></span><span class="tasks-eyebrow">你来委托，让故事里的人行动</span><h2>有件事，想托付。</h2><p>写下目标，设定报酬，再选择合适的执行者。</p><button type="button" class="tasks-primary-button" :disabled="Boolean(disabledReason)" @click="$emit('publish')"><TaskIcon name="plus" />发布一份委托</button></div>
        <p v-if="disabledReason" class="tasks-hint">{{ disabledReason }}</p>
        <header class="tasks-section-heading"><h3>我的委托 <small>{{ records.length }}</small></h3><button type="button" class="tasks-text-button" @click="$emit('history')">已结束<TaskIcon name="next" /></button></header>
        <div v-if="!records.length" class="tasks-inline-empty">你发布的委托会留在这里，直到任务结束。</div>
        <div v-else class="tasks-record-list"><TaskRecordCard v-for="task in records" :key="task.taskId" :task="task" @open="$emit('open', task)" /></div>
    </section>
</template>
