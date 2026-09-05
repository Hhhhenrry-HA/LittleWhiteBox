<script setup lang="ts">
import TaskIcon from './TaskIcon.vue';
defineProps<{ autoMaintenance: boolean; settingsBusy: boolean; maintenanceBusy: boolean; maintenanceMessage: string; disabledReason: string }>();
defineEmits<{ update: [enabled: boolean]; maintain: [] }>();
</script>
<template>
    <section class="tasks-page tasks-settings-page">
        <header class="tasks-page-heading"><span class="tasks-eyebrow">让进展跟上故事</span><h2>任务设置</h2></header>
        <article class="tasks-setting-card"><div class="tasks-setting-row"><span class="tasks-setting-icon"><TaskIcon name="refresh" /></span><h3>自动更新进展</h3><label class="tasks-switch"><input type="checkbox" aria-label="自动更新任务进展" :checked="autoMaintenance" :disabled="settingsBusy" @change="$emit('update', ($event.target as HTMLInputElement).checked)"><span /></label></div><p>开启后，在你发送下一条消息时，根据上一轮已确认的剧情更新任务。此设置适用于所有普通聊天。</p></article>
        <article class="tasks-setting-card"><div class="tasks-setting-row"><span class="tasks-setting-icon"><TaskIcon name="clock" /></span><h3>现在检查一次</h3></div><p>根据当前可用的剧情，检查进行中的任务。检查会调用已配置的 Agent。</p><button type="button" class="tasks-secondary-button tasks-full-button" :disabled="maintenanceBusy || Boolean(disabledReason)" @click="$emit('maintain')"><TaskIcon name="refresh" :class="{ 'is-spinning': maintenanceBusy }" />{{ maintenanceBusy ? '正在更新…' : '更新任务进展' }}</button><p v-if="disabledReason" class="tasks-hint">{{ disabledReason }}</p></article>
        <p v-if="maintenanceMessage" class="tasks-maintenance-message" role="status">{{ maintenanceMessage }}</p>
    </section>
</template>
