<script setup lang="ts">
import { MAP_VIEWPORT_COPY } from './map-copy.js';

defineEmits<{ zoom: [factor: number]; reset: [] }>();
</script>
<template>
    <div class="map-viewport-controls" :aria-label="MAP_VIEWPORT_COPY.label">
        <button type="button" :aria-label="MAP_VIEWPORT_COPY.zoomIn" @click="$emit('zoom', .8)">+</button><button type="button" :aria-label="MAP_VIEWPORT_COPY.zoomOut" @click="$emit('zoom', 1.25)">−</button>
        <button type="button" class="map-fit" @click="$emit('reset')">{{ MAP_VIEWPORT_COPY.fit }}</button>
    </div>
</template>
