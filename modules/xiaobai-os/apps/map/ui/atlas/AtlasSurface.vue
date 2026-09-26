<script setup lang="ts">
import { computed, useId } from 'vue';
import type { SpaceBounds } from '../../../../domains/map/space/types.js';
import type { AtlasTileView } from './use-atlas-tiles.js';
const props = defineProps<{ view?: AtlasTileView; bounds: SpaceBounds }>();
const pending = `atlas-pending-${useId()}`;
const images = computed(() => [...(props.view?.fallbacks || []), ...(props.view?.images || [])]);
const coverage = computed(() => images.value.map(({ clip: c }) => `M${c.x} ${c.y}h${c.width}v${c.height}h${-c.width}Z`).join(''));
</script>
<template>
    <g class="map-atlas-material">
        <defs>
            <mask :id="pending" maskUnits="userSpaceOnUse" :x="bounds[0]" :y="bounds[1]" :width="bounds[2]" :height="bounds[3]" style="mask-type: luminance">
                <rect :x="bounds[0]" :y="bounds[1]" :width="bounds[2]" :height="bounds[3]" fill="white" />
                <path :d="coverage" fill="black" shape-rendering="crispEdges" />
            </mask>
            <pattern v-for="(t, i) in images" :id="`${pending}-${i}`" :key="t.key" patternUnits="userSpaceOnUse" :x="t.x" :y="t.y" :width="t.width" :height="t.height" :viewBox="`${t.x} ${t.y} ${t.width} ${t.height}`">
                <image class="map-atlas-tile" :data-tile="t.key" :x="t.x" :y="t.y" :width="t.width" :height="t.height" :href="t.href" preserveAspectRatio="none" />
            </pattern>
        </defs>
        <g class="map-atlas-placeholder" :mask="`url(#${pending})`"><slot /></g>
        <!-- The extra texel is a sampling gutter, never a second alpha contribution. -->
        <!-- Paint disjoint cells without edge antialiasing; the outer geographic mask still has soft edges. -->
        <rect v-for="(t, i) in images" :key="t.key" class="map-atlas-cell" :class="{ 'map-atlas-fallback': view?.fallbacks.includes(t) }" :data-tile="t.key" :x="t.clip.x" :y="t.clip.y" :width="t.clip.width" :height="t.clip.height" :fill="`url(#${pending}-${i})`" shape-rendering="crispEdges" />
    </g>
</template>
