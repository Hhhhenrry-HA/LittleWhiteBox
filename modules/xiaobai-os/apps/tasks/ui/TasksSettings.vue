<script setup lang="ts">
defineProps<{
    autoMaintenance: boolean;
    settingsBusy: boolean;
    maintenanceBusy: boolean;
    disabledReason: string;
}>();

const emit = defineEmits<{ update: [enabled: boolean]; maintain: [] }>();
</script>

<template>
    <section class="tasks-page tasks-settings-page">
        <header class="tasks-page-heading"><div><small>AUTOMATION POLICY</small><h2>任务设置</h2></div></header>
        <article class="tasks-setting-card">
            <div><small>ALL STANDARD CHATS</small><h3>所有普通聊天自动维护</h3><p>仅当存在 active 任务，且新接受轮晚于该任务最近状态基线时才会调用 Agent。系统会在下一条 User 消息保存后处理上一轮，不响应 swipe、regenerate、continue 或打开 APP。</p></div>
            <label class="tasks-switch"><input type="checkbox" :checked="autoMaintenance" :disabled="settingsBusy" @change="emit('update', ($event.target as HTMLInputElement).checked)"><span /><em>{{ autoMaintenance ? '开启' : '关闭' }}</em></label>
        </article>
        <article class="tasks-setting-card is-manual">
            <div><small>EXPLICIT AGENT RUN</small><h3>维护一次</h3><p>读取最新完整接受轮，只检查符合基线条件的 active 任务。没有新任务状态时会在调用模型前短路。</p></div>
            <button type="button" class="tasks-agent-button" :disabled="maintenanceBusy || Boolean(disabledReason)" :title="disabledReason" @click="emit('maintain')">{{ maintenanceBusy ? '正在维护…' : '维护一次（使用 Agent）' }}</button>
        </article>
        <aside class="tasks-settings-note"><strong>明确的调用边界</strong><p>刷新大厅、招募候选、维护一次和已开启的自动维护会使用 Agent。查看页面、接取、发布、选人、撤回与切换此开关都不会调用。</p></aside>
    </section>
</template>
