<script setup lang="ts">
import { computed } from 'vue';
import { HOUSES, type HouseKind } from './policy.js';
import { PALETTE } from './scene/palette.js';
const props = defineProps<{ kind: HouseKind; direction?: number }>();
const spec = computed(() => HOUSES[props.kind]);
const fill = computed(() => '#' + spec.value.color.toString(16).padStart(6, '0'));
const colors = Object.fromEntries(Object.entries(PALETTE).map(([key, value]) => [key, '#' + value.toString(16).padStart(6, '0')]));
</script>
<template>
    <svg viewBox="-1400 -1350 2900 1550" aria-hidden="true" class="stack-house-icon">
        <g :transform="`scale(${direction ?? 1},1)`">
            <rect :x="-spec.foot / 2" :y="-spec.height * (kind === 'step' ? .59 : 1)" :width="spec.foot" :height="spec.height * (kind === 'step' ? .59 : 1)" rx="75" :fill="colors.milk" :stroke="fill" stroke-width="35" />
            <rect v-if="kind === 'step'" :x="spec.offset - spec.top / 2" :y="-spec.height" :width="spec.top" :height="spec.height * .5" rx="65" :fill="colors.milk" :stroke="fill" stroke-width="35" />
            <rect v-if="kind === 'balcony'" x="510" y="-800" width="680" height="640" rx="65" :fill="fill" />
            <rect :x="spec.offset - spec.top / 2" :y="-spec.height" :width="spec.top" height="120" rx="35" :fill="fill" />
            <rect x="-290" :y="kind === 'step' ? -470 : -760" width="230" height="250" rx="35" :fill="colors.glass" /><rect :x="kind === 'step' ? spec.offset - 100 : 100" y="-760" width="230" height="250" rx="35" :fill="colors.glass" />
            <circle :cx="spec.center" cy="-160" r="60" :fill="colors.steel" />
        </g>
    </svg>
</template>
