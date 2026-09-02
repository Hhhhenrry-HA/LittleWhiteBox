<script setup lang="ts">
import type { TaskDetailPresentation } from '../types.js';

defineProps<{ detail: TaskDetailPresentation | null; loading: boolean }>();
const emit = defineEmits<{ back: [] }>();

const statusLabel = {
    recruiting: '招募中', active: '进行中', completed: '已完成', failed: '已失败', cancelled: '已撤回',
} as const;

function dateTime(value: number): string {
    return new Date(value).toLocaleString('zh-CN', { hour12: false });
}
</script>

<template>
    <section class="tasks-page tasks-detail-page">
        <header class="tasks-page-heading"><button type="button" class="tasks-back" @click="emit('back')">← 返回</button><span v-if="detail" class="tasks-detail-status" :data-status="detail.task.status">{{ statusLabel[detail.task.status] }}</span></header>
        <div v-if="loading" class="tasks-empty"><span>READING CONTRACT</span><h3>正在读取合同</h3></div>
        <template v-else-if="detail">
            <article class="tasks-contract-sheet">
                <header><div><small>{{ detail.task.grade }} / {{ detail.task.source === 'received' ? 'WORLD CONTRACT' : 'PLAYER CONTRACT' }}</small><h2>{{ detail.task.title }}</h2></div><strong>¤ {{ detail.task.reward }}</strong></header>
                <div class="tasks-party-line"><span>出资方<strong>{{ detail.task.issuer.displayName }}</strong></span><i>→</i><span>执行方<strong>{{ detail.task.assignee?.displayName || '等待指派' }}</strong></span></div>
                <dl>
                    <div><dt>唯一完成目标</dt><dd>{{ detail.task.objective }}</dd></div>
                    <div><dt>执行约束</dt><dd>{{ detail.task.requirements || '无附加执行约束' }}</dd></div>
                    <div><dt>行动地点</dt><dd>{{ detail.task.location }}</dd></div>
                    <div v-if="detail.task.timing"><dt>时机</dt><dd>{{ detail.task.timing }}</dd></div>
                    <div><dt>合同风险</dt><dd>{{ detail.task.risk || '未注明' }}</dd></div>
                    <div><dt>累计进展</dt><dd>{{ detail.task.progressSummary || '尚无已确认进展' }}</dd></div>
                    <div v-if="detail.task.resultSummary"><dt>最终结果</dt><dd>{{ detail.task.resultSummary }}</dd></div>
                </dl>
            </article>
            <section class="tasks-timeline">
                <h3>合同时间线</h3>
                <ol>
                    <li v-for="item in detail.timeline" :key="item.eventId"><i /><div><small>R{{ item.taskRevision }} · {{ dateTime(item.createdAt) }}</small><p>{{ item.summary }}</p></div></li>
                </ol>
            </section>
        </template>
        <div v-else class="tasks-empty"><span>CONTRACT UNAVAILABLE</span><h3>合同无法读取</h3></div>
    </section>
</template>
