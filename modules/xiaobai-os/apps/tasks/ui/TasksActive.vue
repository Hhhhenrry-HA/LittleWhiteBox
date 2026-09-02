<script setup lang="ts">
import type { TaskRecord } from '../types.js';

defineProps<{ records: TaskRecord[] }>();
const emit = defineEmits<{ detail: [taskId: string] }>();
</script>

<template>
    <section class="tasks-page">
        <header class="tasks-page-heading"><div><h2>进行中的任务</h2></div><span class="tasks-count">{{ records.length }}</span></header>
        <div v-if="!records.length" class="tasks-empty"><h3>当前没有进行中的任务</h3><p>接取大厅任务，或为自己发布的任务选定执行者后，任务会出现在这里。</p></div>
        <div v-else class="tasks-record-list">
            <button v-for="task in records" :key="task.taskId" type="button" class="tasks-record" @click="emit('detail', task.taskId)">
                <span class="tasks-record-grade">{{ task.grade }}</span>
                <span class="tasks-record-main"><small>{{ task.source === 'received' ? '大厅委托' : '我的委托' }} · {{ task.location }}</small><strong>{{ task.title }}</strong><em>{{ task.progressSummary }}</em></span>
                <span class="tasks-record-aside"><strong>¤ {{ task.reward }}</strong><small>{{ task.assignee?.displayName || '未指派' }}</small></span>
            </button>
        </div>
    </section>
</template>
