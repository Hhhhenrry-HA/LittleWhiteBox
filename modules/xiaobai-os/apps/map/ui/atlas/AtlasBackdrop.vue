<script setup lang="ts">
import { computed, useId } from 'vue';
import type { AtlasProjection } from '../../../../domains/map/space/projection.js';
import type { SpaceBounds } from '../../../../domains/map/space/types.js';
import { geometryClosed } from '../../../../domains/map/space/geometry.js';
import { atlasGeometryPath, atlasLineWidth } from './geometry.js';
import { ATLAS_MATERIALS } from './materials.js';

const props = defineProps<{ projection: AtlasProjection; viewport: SpaceBounds; unitScale: number }>();
const id = `atlas-chart-${useId()}`;
const environment = computed(() => {
    const media = props.projection.features.filter(f => f.source.role === 'environment');
    return media.length && media.every(f => f.source.material === media[0].source.material) ? media[0].source.material : undefined;
});
const background = computed(() => environment.value ? ATLAS_MATERIALS[environment.value].base : 'var(--atlas-paper)');
const grid = computed(() => 100 * 2 ** Math.ceil(Math.log2(props.unitScale)));
</script>
<template>
    <g class="map-atlas-backdrop" aria-hidden="true">
        <defs>
            <pattern :id="`${id}-grid`" patternUnits="userSpaceOnUse" :width="grid" :height="grid"><path :d="`M${grid} 0H0V${grid}`" fill="none" :stroke="environment === 'vacuum' ? '#b8d4ed' : '#607b7c'" :stroke-width="unitScale * .6" opacity=".08" /></pattern>
            <pattern :id="`${id}-unknown`" patternUnits="userSpaceOnUse" :width="unitScale * 14" :height="unitScale * 14"><circle :cx="unitScale * 7" :cy="unitScale * 7" :r="unitScale * .55" :fill="environment === 'vacuum' ? '#809bb6' : '#81938e'" opacity=".15" /></pattern>
            <mask :id="`${id}-coverage`" maskUnits="userSpaceOnUse" :x="viewport[0]" :y="viewport[1]" :width="viewport[2]" :height="viewport[3]" style="mask-type: luminance">
                <rect :x="viewport[0]" :y="viewport[1]" :width="viewport[2]" :height="viewport[3]" fill="white" />
                <g :clip-path="projection.clip ? `url(#${id}-region)` : undefined"><path v-for="feature in projection.features" :key="feature.source.id" :d="atlasGeometryPath(feature.geometry)" :fill="geometryClosed(feature.geometry) ? 'black' : 'none'" stroke="black" :stroke-width="atlasLineWidth(feature.geometry)" stroke-linecap="round" /></g>
            </mask>
            <clipPath v-if="projection.clip" :id="`${id}-region`"><path :d="atlasGeometryPath(projection.clip)" /></clipPath>
        </defs>
        <!-- A chart surface, not an extrapolation of unknown geography. -->
        <rect :x="viewport[0]" :y="viewport[1]" :width="viewport[2]" :height="viewport[3]" :fill="background" />
        <rect :x="viewport[0]" :y="viewport[1]" :width="viewport[2]" :height="viewport[3]" :fill="`url(#${id}-grid)`" />
        <rect :x="viewport[0]" :y="viewport[1]" :width="viewport[2]" :height="viewport[3]" :fill="`url(#${id}-unknown)`" :mask="`url(#${id}-coverage)`" />
    </g>
</template>
