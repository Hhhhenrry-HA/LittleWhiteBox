<script setup lang="ts">
import type { TaskDetailPresentation } from '../types.js';
import TaskIcon from './TaskIcon.vue';
import { taskIssuer, taskMoney, taskStatusLabel } from './task-display.js';
defineProps<{ detail: TaskDetailPresentation | null; loading: boolean }>();
function dateTime(value: number): string {
    return new Date(value).toLocaleString('zh-CN', { month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit', hour12: false });
}
</script>
<template>
    <section class="tasks-page tasks-detail-page">
        <div v-if="loading" class="tasks-empty" role="status"><TaskIcon name="refresh" class="is-spinning" /><h3>正在展开这份委托…</h3></div>
        <template v-else-if="detail">
            <article class="tasks-contract-sheet">
                <header class="tasks-contract-heading"><span class="tasks-status" :data-status="detail.task.status"><i />{{ taskStatusLabel[detail.task.status] }}</span><h2>{{ detail.task.title }}</h2><p v-if="detail.task.hook">{{ detail.task.hook }}</p></header>
                <div class="tasks-contract-reward"><span>委托报酬<strong><small>¤</small> {{ taskMoney(detail.task.reward) }}</strong></span><span class="tasks-seal"><TaskIcon name="ticket" />{{ detail.task.source === 'received' ? '终端委托' : '我的委托' }}</span></div>
                <div class="tasks-party-line"><span>发布者<strong>{{ taskIssuer(detail.task) }}</strong></span><TaskIcon name="next" /><span>执行者<strong>{{ detail.task.assignee?.displayName || '等待选人' }}</strong></span></div>
                <dl class="tasks-facts"><div><dt>完成目标</dt><dd>{{ detail.task.objective }}</dd></div><div v-if="detail.task.requirements"><dt>执行约束</dt><dd>{{ detail.task.requirements }}</dd></div><div><dt>行动地点</dt><dd>{{ detail.task.location }}</dd></div><div v-if="detail.task.timing"><dt>行动时机</dt><dd>{{ detail.task.timing }}</dd></div><div v-if="detail.task.risk" class="is-risk"><dt>留意风险</dt><dd>{{ detail.task.risk }}</dd></div></dl>
            </article>
            <section class="tasks-progress-summary"><span class="tasks-eyebrow">{{ detail.task.resultSummary ? '最终结果' : '当前进展' }}</span><p>{{ detail.task.resultSummary || detail.task.progressSummary || '还没有已确认的进展，下一步在故事中发生。' }}</p></section>
            <section class="tasks-timeline"><h3>一路走来</h3><ol><li v-for="item in detail.timeline" :key="item.eventId"><i /><div><small>{{ dateTime(item.createdAt) }}</small><p>{{ item.summary }}</p></div></li></ol></section>
        </template>
        <div v-else class="tasks-empty"><h3>这份委托暂时无法读取</h3><p>请返回后重试。</p></div>
    </section>
</template>
