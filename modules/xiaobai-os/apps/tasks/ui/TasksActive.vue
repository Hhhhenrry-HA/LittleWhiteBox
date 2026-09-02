<script setup lang="ts">
import type { TaskRecord } from '../types.js';

defineProps<{ records: TaskRecord[] }>();
const emit = defineEmits<{ detail: [taskId: string] }>();
</script>

<template>
    <section class="tasks-page">
        <header class="tasks-page-heading"><div><small>LIVE CONTRACTS</small><h2>进行中的任务</h2></div><span class="tasks-count">{{ records.length }}</span></header>
        <div v-if="!records.length" class="tasks-empty"><span>NO ACTIVE CONTRACT</span><h3>没有进行中的任务</h3><p>从大厅接取任务，或为自己发布的委托选择执行者后，会出现在这里。</p></div>
        <div v-else class="tasks-record-list">
            <button v-for="task in records" :key="task.taskId" type="button" class="tasks-record" @click="emit('detail', task.taskId)">
                <span class="tasks-record-grade">{{ task.grade }}</span>
                <span class="tasks-record-main"><small>{{ task.source === 'received' ? '大厅委托' : '我的委托' }} · {{ task.location }}</small><strong>{{ task.title }}</strong><em>{{ task.progressSummary }}</em></span>
                <span class="tasks-record-aside"><strong>¤ {{ task.reward }}</strong><small>{{ task.assignee?.displayName || '未指派' }}</small></span>
            </button>
        </div>
    </section>
</template>
