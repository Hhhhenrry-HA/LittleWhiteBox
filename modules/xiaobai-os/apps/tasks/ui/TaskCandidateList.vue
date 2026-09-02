<script setup lang="ts">
import type { TaskRecord } from '../types.js';

defineProps<{
    task: TaskRecord;
    busy: boolean;
    disabledReason: string;
}>();

const emit = defineEmits<{
    assign: [task: TaskRecord, candidateId: string];
}>();
</script>

<template>
    <div v-if="task.candidates.length" class="tasks-candidates">
        <article v-for="candidate in task.candidates" :key="candidate.candidateId" class="tasks-candidate">
            <header><strong>{{ candidate.name }}</strong><span>应征者</span></header>
            <p>{{ candidate.description }}</p>
            <blockquote>“{{ candidate.pitch }}”</blockquote>
            <dl>
                <div><dt>能力</dt><dd>{{ candidate.capability }}</dd></div>
                <div><dt>隐患</dt><dd>{{ candidate.risk }}</dd></div>
            </dl>
            <button
                type="button"
                class="tasks-primary-button"
                :disabled="busy || Boolean(disabledReason)"
                :title="disabledReason"
                @click="emit('assign', task, candidate.candidateId)"
            >
                选择此人
            </button>
        </article>
    </div>
    <p v-else class="tasks-inline-empty">候选席空置。可以发起一次招募，也可以直接撤回托管。</p>
</template>
