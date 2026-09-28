<script setup lang="ts">
import { computed } from 'vue';
import { HOUSES, type HouseKind } from './policy.js';
const props = defineProps<{ kind: HouseKind; direction?: number }>();
const spec = computed(() => HOUSES[props.kind]);
const fill = computed(() => '#' + spec.value.color.toString(16).padStart(6, '0'));
</script>
<template>
    <svg viewBox="-1400 -1350 2900 1550" aria-hidden="true" class="stack-house-icon">
        <g :transform="`scale(${direction ?? 1},1)`">
            <rect :x="-spec.foot / 2" :y="-spec.height" :width="spec.foot" :height="spec.height" rx="100" :fill="fill" />
            <rect v-if="kind === 'balcony'" x="600" y="-850" width="650" height="670" rx="80" fill="#b88ac2" />
            <rect :x="spec.offset - spec.top / 2" :y="-spec.height - 50" :width="spec.top" height="140" rx="50" fill="#fffaf0" />
            <rect x="-360" y="-760" width="260" height="300" rx="40" fill="#fff0b4" /><rect x="100" y="-760" width="260" height="300" rx="40" fill="#fff0b4" />
            <circle :cx="spec.center" cy="-160" r="60" fill="#536f7b" />
        </g>
    </svg>
</template>
