<script setup lang="ts">
import type { TaskRecord } from '../types.js';
import TaskRecordCard from './TaskRecordCard.vue';
import TaskIcon from './TaskIcon.vue';
defineProps<{ records: TaskRecord[] }>();
defineEmits<{ detail: [taskId: string]; discover: [] }>();
</script>
<template>
    <section class="tasks-page">
        <header class="tasks-page-heading"><span class="tasks-eyebrow">由你执行</span><h2>每一步，都算数。</h2><p>在故事中行动，在这里查看已确认的进展。</p></header>
        <div v-if="!records.length" class="tasks-empty"><span class="tasks-empty-mark"><TaskIcon name="compass" /></span><h3>还没有进行中的委托</h3><p>到大厅选一份委托，开启下一段经历。</p><button type="button" class="tasks-primary-button" @click="$emit('discover')">去发现委托</button></div>
        <div v-else class="tasks-record-list"><TaskRecordCard v-for="task in records" :key="task.taskId" :task="task" @open="$emit('detail', task.taskId)" /></div>
    </section>
</template>
