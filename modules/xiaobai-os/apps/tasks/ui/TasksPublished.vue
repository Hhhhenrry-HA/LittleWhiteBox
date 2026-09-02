<script setup lang="ts">
import type { TaskRecord } from '../types.js';
import TaskCandidateList from './TaskCandidateList.vue';

defineProps<{
    records: TaskRecord[];
    candidateBusyTaskId: string;
    writeBusy: boolean;
    disabledReason: string;
}>();

const emit = defineEmits<{
    recruit: [task: TaskRecord];
    assign: [task: TaskRecord, candidateId: string];
    cancel: [task: TaskRecord];
    detail: [taskId: string];
    publish: [];
}>();
</script>

<template>
    <section class="tasks-page">
        <header class="tasks-page-heading">
            <div><small>PLAYER ESCROW DESK</small><h2>我发布的任务</h2></div>
            <button type="button" class="tasks-primary-button" :disabled="Boolean(disabledReason)" :title="disabledReason" @click="emit('publish')">发布新任务</button>
        </header>
        <div v-if="!records.length" class="tasks-empty"><span>NO OPEN RECRUITMENT</span><h3>没有正在招募的委托</h3><p>发布任务会立即从钱包锁定报酬，但不会调用 Agent；招募候选人时才会调用。</p></div>
        <div v-else class="tasks-published-list">
            <article v-for="task in records" :key="task.taskId" class="tasks-published-card">
                <header>
                    <div><small>CUSTOM / ESCROW LOCKED</small><h3>{{ task.title }}</h3></div>
                    <strong>¤ {{ task.reward }}</strong>
                </header>
                <dl>
                    <div><dt>唯一目标</dt><dd>{{ task.objective }}</dd></div>
                    <div v-if="task.requirements"><dt>执行约束</dt><dd>{{ task.requirements }}</dd></div>
                    <div><dt>地点</dt><dd>{{ task.location }}</dd></div>
                    <div v-if="task.risk"><dt>风险</dt><dd>{{ task.risk }}</dd></div>
                </dl>
                <div class="tasks-published-actions">
                    <button type="button" @click="emit('detail', task.taskId)">查看合同</button>
                    <button
                        type="button"
                        class="tasks-agent-button"
                        :disabled="writeBusy || Boolean(candidateBusyTaskId) || Boolean(disabledReason)"
                        :title="disabledReason"
                        @click="emit('recruit', task)"
                    >
                        {{ candidateBusyTaskId === task.taskId ? '正在招募…' : '招募候选人（使用 Agent）' }}
                    </button>
                    <button type="button" class="is-danger" :disabled="writeBusy || Boolean(disabledReason)" :title="disabledReason" @click="emit('cancel', task)">撤回并退款</button>
                </div>
                <TaskCandidateList
                    :task="task"
                    :busy="writeBusy || Boolean(candidateBusyTaskId)"
                    :disabled-reason="disabledReason"
                    @assign="(record, candidateId) => emit('assign', record, candidateId)"
                />
            </article>
        </div>
    </section>
</template>
