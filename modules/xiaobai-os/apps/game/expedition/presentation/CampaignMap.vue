<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref, watch } from 'vue';
import type { Campaign } from '../campaign/types.js';
import { COURTYARD } from '../content/courtyard.js';
import { WORLD_COPY as w } from '../content/world-copy.js';
import { CAMPAIGN_COPY as c } from '../content/campaign-copy.js';
import { campaignInteractions } from '../world/people.js';
import { interactionLabel } from './interaction-copy.js';
import type { CourtyardScene } from '../content/world-types.js';
import { discoveredRoutes, mapMarkers } from './map-projection.js';
const props = defineProps<{ campaign: Campaign }>();
const emit = defineEmits<{ close: [] }>();
const overview = ref(false);
const root = ref<HTMLElement | null>(null), wide = ref(false);
const routeMap = ref<SVGSVGElement | null>(null), mapSize = ref({ width: 400, height: 400 });
const observer = new ResizeObserver(entries => {
    for (const entry of entries) {
        const { width, height } = entry.contentRect;
        if (entry.target === root.value) { wide.value = width > height * 1.55; }
        else { mapSize.value = { width, height }; }
    }
});
watch(routeMap, (next, previous) => { if (previous) { observer.unobserve(previous); } if (next) { observer.observe(next); } });
onMounted(() => { observer.observe(root.value!); });
onBeforeUnmount(() => observer.disconnect());
// Diagram layout only; connections come from the playable scene exits.
const layout: Record<CourtyardScene, [number, number]> = { camp: [52, 89], crossroads: [52, 66], gate: [25, 44], beacon: [25, 22], hall: [52, 10], cells: [79, 32], waterway: [79, 54], roots: [16, 70] };
const discovery = computed(() => discoveredRoutes(props.campaign));
const positions = computed(() => Object.fromEntries(discovery.value.scenes.map(id => {
    const [x, y] = layout[id];
    const { width, height } = mapSize.value;
    return [id, wide.value ? [50 + (104 - y) / 104 * (width - 100), 10 + (x - 10) / 80 * (height - 40)] : [45 + x / 104 * (width - 90), 10 + y / 104 * (height - 40)]];
})) as Record<CourtyardScene, [number, number]>);
const links = computed(() => discovery.value.links);
const scene = computed(() => COURTYARD[props.campaign.location.scene]);
const bounds = computed(() => scene.value.landscape.bounds);
const box = computed(() => `${bounds.value.x - bounds.value.width / 2 - 5} ${bounds.value.z - bounds.value.depth / 2 - 5} ${bounds.value.width + 10} ${bounds.value.depth + 10}`);
const objects = computed(() => campaignInteractions(props.campaign));
const markers = computed(() => {
    const placed = mapMarkers(objects.value.map(item => item.position), bounds.value);
    return objects.value.map((item, index) => ({ ...item, marker: placed[index] }));
});
</script>
<template>
    <div ref="root" class="ember-map" :class="{ 'ember-map-wide': wide, 'ember-map-local': !overview }">
        <div class="ember-map-header"><h2>{{ overview ? c.chapterMap : w.scenes[scene.id] }}</h2><div><button type="button" :aria-pressed="overview" @click="overview = !overview">{{ overview ? c.localMap : c.chapterMap }}</button><button type="button" @click="emit('close')">{{ c.close }}</button></div></div>
        <svg v-if="overview" ref="routeMap" :viewBox="`0 0 ${mapSize.width} ${mapSize.height}`" role="img" :aria-label="c.chapterMap" class="ember-route-map">
            <line v-for="link in links" :key="link.id" :x1="positions[link.from][0]" :y1="positions[link.from][1]" :x2="positions[link.to][0]" :y2="positions[link.to][1]" stroke="#9ab5ae" stroke-width="1.5" :stroke-dasharray="campaign.location.visited.includes(link.from) && campaign.location.visited.includes(link.to) ? undefined : '4 4'" />
            <g v-for="(position, id) in positions" :key="id" :transform="`translate(${position.join(',')})`">
                <circle r="6" :fill="id === scene.id ? '#bf6242' : campaign.location.visited.includes(id) ? '#366678' : '#b6c9c2'" stroke="#fffcef" stroke-width="1.5" />
                <text y="22" text-anchor="middle">{{ campaign.location.visited.includes(id) ? w.scenes[id] : c.unknownArea }}</text><title>{{ campaign.location.visited.includes(id) ? w.scenes[id] : c.unknownArea }}</title>
            </g>
        </svg>
        <svg v-else :viewBox="box" role="img" :aria-label="w.scenes[scene.id]">
            <rect :x="bounds.x - bounds.width / 2" :y="bounds.z - bounds.depth / 2" :width="bounds.width" :height="bounds.depth" rx="2" fill="#d4e5d9" />
            <polyline v-for="(road, i) in scene.landscape.roads" :key="i" :points="road.points.map(p => p.join(',')).join(' ')" fill="none" stroke="#f8f1d9" :stroke-width="road.width" stroke-linejoin="round" />
            <rect v-for="feature in scene.landscape.features" :key="feature.id" :x="feature.footprint.x - feature.footprint.width / 2" :y="feature.footprint.z - feature.footprint.depth / 2" :width="feature.footprint.width" :height="feature.footprint.depth" :fill="feature.kind === 'water' ? '#6eb8c6' : feature.kind === 'tree' || feature.kind === 'thicket' ? '#80a28a' : '#8a9e9f'" rx=".5" />
            <circle :cx="campaign.location.position.x" :cy="campaign.location.position.y" r="3.2" fill="none" stroke="#c84f3c" stroke-width="1"><title>{{ c.here }}</title></circle>
            <g v-for="(item, index) in markers" :key="item.target.id"><line :x1="item.position.x" :y1="item.position.y" :x2="item.marker.x" :y2="item.marker.y" stroke="#a3642a" stroke-width=".5" /><circle :cx="item.marker.x" :cy="item.marker.y" r="2.4" :fill="item.kind === 'exit' ? '#356987' : '#a3642a'" /><text class="ember-map-number" :x="item.marker.x" :y="item.marker.y + 1.1" text-anchor="middle">{{ index + 1 }}</text><title>{{ interactionLabel(item) }}</title></g>
        </svg>
        <p v-if="overview" class="ember-map-key">{{ c.mapKey }}</p>
        <ol v-else class="ember-map-places"><li v-for="item in objects" :key="item.target.id">{{ interactionLabel(item) }}</li></ol>
    </div>
</template>
<style scoped>
.ember-map { display:grid; min-height:0; flex:1; grid-template-rows:auto minmax(0,1fr) auto; gap:8px; }
.ember-map-header { display:flex; justify-content:space-between; align-items:center; gap:12px; }
.ember-map-header h2 { font-size:20px; }
.ember-map-header>div { display:flex; gap:8px; }
.ember-map-header button { flex-shrink:0; }
svg { height:100%; width:100%; min-height:0; }
text { font-size:3.5px; fill:#234958; paint-order:stroke; stroke:#f5f6e8; stroke-width:.65px; stroke-linejoin:round; }
.ember-map-number { fill:#fff; stroke:none; font-weight:650; font-size:3.4px; }
.ember-route-map text { font-size:12px; stroke-width:3px; }
.ember-map-places { display:grid; grid-template-columns:repeat(3,1fr); gap:4px 24px; font-size:13px; color:#35575c; margin:0; padding-left:20px; }
.ember-map-places li::marker { font-weight:700; color:#a3642a; }
.ember-map-key { font-size:12px; color:#567373; text-align:center; }
.ember-map-wide.ember-map-local { grid-template-columns:minmax(0,1fr) minmax(170px,28%); grid-template-rows:auto minmax(0,1fr); }
.ember-map-wide .ember-map-header { grid-column:1/-1; }
.ember-map-wide .ember-map-places { grid-template-columns:1fr; overflow:auto; align-content:start; }
@container (max-width:600px) { .ember-map-places { grid-template-columns:repeat(2,1fr); }.ember-map-header h2 { font-size:18px; } }
</style>
