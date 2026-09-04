<script setup lang="ts">
import type { MapMaintenanceStatus } from '../types.js';

defineProps<{
    autoMaintenance: boolean;
    busy: boolean;
    autoToggleBusy: boolean;
    disabledReason: string;
    hasMap: boolean;
    maintenanceStatus: MapMaintenanceStatus;
    maintenanceMessage: string;
}>();

defineEmits<{
    close: [];
    setAutoMaintenance: [enabled: boolean];
    maintainOnce: [];
    requestRebuild: [];
}>();
</script>

<template>
    <aside class="map-settings" aria-labelledby="map-settings-title">
        <header>
            <div>
                <span>MAP SYSTEM / CONFIG</span>
                <h2 id="map-settings-title">地图设置</h2>
            </div>
            <button type="button" class="map-icon-button" aria-label="关闭地图设置" @click="$emit('close')">×</button>
        </header>

        <div class="map-settings-body">
            <section class="map-settings-card">
                <div class="map-setting-row">
                    <div>
                        <h3>所有普通聊天自动维护</h3>
                        <p>每次发送新的 User 消息后，让地图维护刚被接受的上一轮空间事实。</p>
                    </div>
                    <button
                        type="button"
                        class="map-switch"
                        role="switch"
                        :aria-checked="autoMaintenance"
                        :aria-label="autoMaintenance ? '关闭所有普通聊天自动维护' : '开启所有普通聊天自动维护'"
                        :disabled="autoToggleBusy"
                        @click="$emit('setAutoMaintenance', !autoMaintenance)"
                    >
                        <span />
                    </button>
                </div>
            </section>

            <section class="map-settings-card">
                <div class="map-settings-action-copy">
                    <h3>增量维护</h3>
                    <p>读取聊天尾部最新完整的 User 与 Assistant 对话，在后台补充地点、路线、人物位置和场景细节。</p>
                </div>
                <button
                    type="button"
                    class="map-action-button"
                    :disabled="busy || Boolean(disabledReason) || !hasMap"
                    :title="!hasMap ? '请先从当前聊天建立地图' : disabledReason"
                    @click="$emit('maintainOnce')"
                >
                    {{ maintenanceStatus === 'maintaining' ? '正在维护…' : '维护一次' }}
                </button>
            </section>

            <section class="map-settings-card is-danger-zone">
                <div class="map-settings-action-copy">
                    <h3>{{ hasMap ? '重建地图' : '建立地图' }}</h3>
                    <p>提交后在后台重新读取当前聊天并生成完整地图。已有地图只会在新地图保存成功后被替换。</p>
                </div>
                <button
                    type="button"
                    class="map-action-button is-strong"
                    :disabled="busy || Boolean(disabledReason)"
                    :title="disabledReason"
                    @click="$emit('requestRebuild')"
                >
                    {{ maintenanceStatus === 'rebuilding' ? '正在重建…' : '从当前聊天建立/重建地图' }}
                </button>
            </section>

            <p v-if="disabledReason" class="map-disabled-reason" role="status">{{ disabledReason }}</p>
            <p v-if="maintenanceMessage" class="map-maintenance-message" role="status">{{ maintenanceMessage }}</p>
        </div>
    </aside>
</template>
