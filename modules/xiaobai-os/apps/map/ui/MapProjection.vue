<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from 'vue';
import { createFrameBridge } from '../../../shell/app-src/frame-bridge.js';
import type { MapClientState } from '../types.js';
import MapBrowser from './MapBrowser.vue';
import { MAP_NAV_COPY } from './map-copy.js';

const state = ref<MapClientState | null>(null);
const bridge = createFrameBridge();
const unsubscribe = bridge.subscribe(message => {
    if (message.type !== 'map/projection-state') { return; }
    const payload = message.payload as { state: MapClientState; theme: 'light' | 'dark' };
    document.documentElement.classList.toggle('theme-dark', payload.theme === 'dark');
    state.value = payload.state;
});
onMounted(bridge.start);
onBeforeUnmount(() => { unsubscribe(); bridge.dispose(); });
</script>
<template>
    <MapBrowser v-if="state" class="map-projection-view" :map="state.map" :chat-identity="state.chatIdentity">
        <template #feedback><aside v-if="state.message" class="map-notice" role="status"><p>{{ state.message }}</p></aside></template>
    </MapBrowser>
    <div v-else class="map-projection-loading" role="status">{{ MAP_NAV_COPY.loading }}</div>
</template>
