<script setup lang="ts">
import { computed } from 'vue';
import type { TaskHistoryPage } from '../types.js';
import TaskRecordCard from './TaskRecordCard.vue';
import TaskIcon from './TaskIcon.vue';
const props = defineProps<{ history: TaskHistoryPage; loading: boolean; source: 'all' | 'received' | 'published' }>();
defineEmits<{ detail: [taskId: string]; loadMore: []; filter: [source: 'all' | 'received' | 'published'] }>();
const records = computed(() => props.history.items.filter(task => props.source === 'all' || task.source === props.source));
</script>
<template>
    <section class="tasks-page">
        <header class="tasks-page-heading"><span class="tasks-eyebrow">每份委托，都有它的结局</span><h2>故事的回执。</h2></header>
        <div class="tasks-filter" aria-label="记录来源"><button v-for="option in [{ id: 'all', label: '全部' }, { id: 'received', label: '我接的' }, { id: 'published', label: '我发布的' }] as const" :key="option.id" type="button" :aria-pressed="source === option.id" @click="$emit('filter', option.id)">{{ option.label }}</button></div>
        <div v-if="!records.length" class="tasks-empty"><span class="tasks-empty-mark"><TaskIcon name="archive" /></span><h3>{{ history.hasMore ? '当前已加载的记录中没有匹配项' : '这里还没有留下记录' }}</h3><p>已完成、未完成和撤回的委托都会保留。</p></div>
        <div v-else class="tasks-record-list"><TaskRecordCard v-for="task in records" :key="task.taskId" :task="task" @open="$emit('detail', task.taskId)" /></div>
        <button v-if="history.hasMore" type="button" class="tasks-load-more tasks-secondary-button" :disabled="loading" @click="$emit('loadMore')">{{ loading ? '正在加载…' : '加载更多记录' }}</button>
    </section>
</template>
