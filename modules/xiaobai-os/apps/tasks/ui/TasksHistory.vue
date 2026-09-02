<script setup lang="ts">
import type { TaskHistoryPage } from '../types.js';

defineProps<{ history: TaskHistoryPage; loading: boolean }>();
const emit = defineEmits<{ detail: [taskId: string]; loadMore: [] }>();

const statusLabel = { completed: '已完成', failed: '已失败', cancelled: '已撤回' } as const;
</script>

<template>
    <section class="tasks-page">
        <header class="tasks-page-heading"><div><h2>任务历史</h2></div><span class="tasks-count">{{ history.items.length }}</span></header>
        <div v-if="!history.items.length" class="tasks-empty"><h3>还没有历史任务</h3><p>已完成、失败或撤回的任务会保存在这里。</p></div>
        <div v-else class="tasks-history-list">
            <button v-for="task in history.items" :key="task.taskId" type="button" class="tasks-history-row" :data-status="task.status" @click="emit('detail', task.taskId)">
                <span>{{ statusLabel[task.status as keyof typeof statusLabel] }}</span>
                <strong>{{ task.title }}</strong>
                <em>{{ task.resultSummary }}</em>
                <b>¤ {{ task.reward }}</b>
            </button>
            <button v-if="history.hasMore" type="button" class="tasks-load-more" :disabled="loading" @click="emit('loadMore')">{{ loading ? '正在加载…' : '加载更多' }}</button>
        </div>
    </section>
</template>
