<script setup lang="ts">
import { reactive } from 'vue';
import type { TaskPublishedForm } from '../types.js';

defineProps<{ balance: number; busy: boolean; disabledReason: string }>();
const emit = defineEmits<{ submit: [form: TaskPublishedForm]; cancel: [] }>();

const form = reactive({ title: '', objective: '', requirements: '', location: '', risk: '', reward: 20 });

function submit(): void {
    emit('submit', {
        title: form.title,
        objective: form.objective,
        ...(form.requirements.trim() ? { requirements: form.requirements } : {}),
        location: form.location,
        risk: form.risk,
        reward: Number(form.reward),
    });
}
</script>

<template>
    <section class="tasks-page tasks-publish-page">
        <header class="tasks-page-heading"><button type="button" class="tasks-back" :disabled="busy" @click="emit('cancel')">← 返回</button><div><small>NEW ESCROW CONTRACT</small><h2>发布任务</h2></div></header>
        <form class="tasks-publish-form" @submit.prevent="submit">
            <aside><small>当前可用余额</small><strong>¤ {{ balance }}</strong><p>确认发布后，报酬会立即锁入该任务的独立托管账户。招募期间可撤回并全额退款；选定执行者进入 active 后不可撤回。</p></aside>
            <label><span>任务标题 <b>*</b></span><input v-model="form.title" required maxlength="120" autocomplete="off" placeholder="一句清楚的合同名称"></label>
            <label><span>唯一完成目标 <b>*</b></span><textarea v-model="form.objective" required maxlength="8000" rows="4" placeholder="只写一个可以明确判定完成的目标" /></label>
            <label><span>执行约束</span><textarea v-model="form.requirements" maxlength="8000" rows="3" placeholder="可空；只约束执行方式，不增加第二目标" /></label>
            <label><span>行动地点 <b>*</b></span><input v-model="form.location" required maxlength="600" autocomplete="off" placeholder="目标行动实际发生的位置"></label>
            <label><span>已知风险</span><textarea v-model="form.risk" maxlength="2000" rows="3" placeholder="可空；写明一个具体坏结果" /></label>
            <label class="tasks-reward-input"><span>托管报酬 <b>*</b></span><div><i>¤</i><input v-model.number="form.reward" type="number" required min="1" step="1"></div><small :class="{ 'is-danger': form.reward > balance }">发布后可用余额：¤ {{ balance - (Number(form.reward) || 0) }}</small></label>
            <footer><button type="button" :disabled="busy" @click="emit('cancel')">取消</button><button type="submit" class="tasks-primary-button" :disabled="busy || Boolean(disabledReason) || form.reward > balance" :title="disabledReason">{{ busy ? '正在保存合同…' : '确认托管并发布' }}</button></footer>
        </form>
    </section>
</template>
