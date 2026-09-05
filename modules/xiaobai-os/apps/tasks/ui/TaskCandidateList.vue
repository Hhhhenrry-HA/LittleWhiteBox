<script setup lang="ts">
import type { TaskRecord } from '../types.js';
import TaskIcon from './TaskIcon.vue';
defineProps<{ task: TaskRecord; busy: boolean; disabledReason: string }>();
defineEmits<{ assign: [task: TaskRecord, candidateId: string] }>();
</script>
<template>
    <div v-if="task.candidates.length" class="tasks-candidates">
        <article v-for="(candidate, index) in task.candidates" :key="candidate.candidateId" class="tasks-candidate">
            <header><span class="tasks-candidate-avatar" :data-tone="index % 3" aria-hidden="true">{{ Array.from(candidate.name)[0] }}</span><div><h3>{{ candidate.name }}</h3><small>应征者</small></div></header>
            <p class="tasks-candidate-description">{{ candidate.description }}</p><blockquote>“{{ candidate.pitch }}”</blockquote>
            <dl class="tasks-candidate-facts"><div><dt>擅长</dt><dd>{{ candidate.capability }}</dd></div><div><dt>留意</dt><dd>{{ candidate.risk }}</dd></div></dl>
            <button type="button" class="tasks-secondary-button tasks-full-button" :disabled="busy || Boolean(disabledReason)" @click="$emit('assign', task, candidate.candidateId)"><span>委托给 {{ candidate.name }}</span><TaskIcon name="next" /></button>
        </article>
    </div>
    <div v-else class="tasks-empty"><span class="tasks-empty-mark"><TaskIcon name="people" /></span><h3>等一个合适的人</h3><p>发起招募，看看谁愿意接下这份委托。</p></div>
</template>
