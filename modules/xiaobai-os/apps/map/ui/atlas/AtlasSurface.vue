<script setup lang="ts">
import type { AtlasTextureSheet, AtlasTextureTile } from './texture-sheet.js';
defineProps<{ sheet: AtlasTextureSheet; tile: AtlasTextureTile }>();
</script>
<template>
    <svg class="map-atlas-material" :x="tile.bounds[0]" :y="tile.bounds[1]" :width="tile.bounds[2]" :height="tile.bounds[3]" :viewBox="tile.rect.join(' ')" preserveAspectRatio="none" overflow="hidden">
        <image :width="sheet.width" :height="sheet.height" :href="sheet.href" />
    </svg>
</template>
