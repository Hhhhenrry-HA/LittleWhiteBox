<script setup lang="ts">
defineProps<{
    autoMaintenance: boolean;
    settingsBusy: boolean;
    maintenanceBusy: boolean;
    maintenanceMessage: string;
    disabledReason: string;
}>();

const emit = defineEmits<{ update: [enabled: boolean]; maintain: [] }>();
</script>

<template>
    <section class="tasks-page tasks-settings-page">
        <header class="tasks-page-heading"><div><h2>任务设置</h2></div></header>
        <article class="tasks-setting-card">
            <div><h3>自动更新任务进展</h3><p>开启后，每次对话推进时，系统会根据最新剧情更新进行中任务的进展和结果。</p></div>
            <label class="tasks-switch"><input type="checkbox" :checked="autoMaintenance" :disabled="settingsBusy" @change="emit('update', ($event.target as HTMLInputElement).checked)"><span /><em>{{ autoMaintenance ? '开启' : '关闭' }}</em></label>
        </article>
        <article class="tasks-setting-card is-manual">
            <div><h3>立即更新任务</h3><p>根据当前最新剧情，检查所有进行中的任务并更新状态。</p></div>
            <button type="button" :disabled="maintenanceBusy || Boolean(disabledReason)" :title="disabledReason" @click="emit('maintain')">{{ maintenanceBusy ? '正在更新…' : '立即更新' }}</button>
        </article>
        <p v-if="maintenanceMessage" class="tasks-maintenance-message" role="status">{{ maintenanceMessage }}</p>
    </section>
</template>
