<script setup lang="ts">
import { computed, ref, useId } from 'vue';
import type { MapAtlas } from '../../../domains/map/types.js';
import type { AtlasProjection } from '../../../domains/map/space/projection.js';
import MapViewport from './MapViewport.vue';
import MapIcon from './MapIcon.vue';
import AtlasSpace from './atlas/AtlasSpace.vue';
import AtlasBackdrop from './atlas/AtlasBackdrop.vue';
import { atlasGeometryPath } from './atlas/geometry.js';
import { locationInScope } from './world-map.js';
import { MAP_SPACE_COPY, MAP_VISIT_LABELS } from './map-copy.js';
import type { AtlasInsets } from './atlas/camera.js';

const props = defineProps<{ atlas: MapAtlas; projection: AtlasProjection; label: string; currentLocationKey: string; selectedLocationKey: string; focusKey: string; focusSequence: number; insets: AtlasInsets }>();
defineEmits<{ select: [key: string] }>();
const current = computed(() => locationInScope(props.atlas, props.currentLocationKey, props.projection.scope.locations));
const focus = computed(() => props.projection.nodes.find(node => node.location.key === props.focusKey));
const origin = computed(() => props.projection.nodes.find(node => node.location.key === current.value));
const arrow = 'map-arrow-' + useId();
const camera = ref<InstanceType<typeof MapViewport> | null>(null);
defineExpose({ zoom: (factor: number) => camera.value?.zoom(factor), reset: () => camera.value?.reset() });
function icon(terrain: string | undefined, scale: string): string {
    return terrain === 'water' ? 'water' : terrain === 'forest' ? 'tree' : terrain === 'mountain' ? 'mountain' : ['world', 'region'].includes(scale) ? 'globe' : scale === 'outdoor' ? 'compass' : 'building';
}
</script>
<template>
    <MapViewport ref="camera" v-slot="{ unitScale, viewport }" class="map-atlas-viewport" :controls="false" :view-box="projection.viewBox" :atlas-insets="insets" :initial-overview="!projection.features.length" :initial-point="origin ? [origin.x, origin.y] : undefined" :reset-key="`${projection.scope.kind}:${projection.scope.region?.key || ''}`" :label="label" :focus-point="focus ? [focus.x, focus.y] : undefined" :focus-sequence="focusSequence">
        <AtlasBackdrop :projection="projection" :viewport="viewport" :unit-scale="unitScale" />
        <AtlasSpace :projection="projection" :viewport="viewport" :unit-scale="unitScale" />
        <defs><marker :id="arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="5" markerHeight="5" orient="auto-start-reverse"><path d="M1 1l8 4-8 4z" fill="var(--map-road-ink)" /></marker><clipPath v-if="projection.clip" :id="`${arrow}-clip`"><path :d="atlasGeometryPath(projection.clip)" /></clipPath></defs>
        <g class="map-world-roads" aria-hidden="true" :clip-path="projection.clip ? `url(#${arrow}-clip)` : undefined">
            <g v-for="route in projection.routes" :key="route.link.id">
                <path :d="atlasGeometryPath(route.feature.geometry)" fill="none" stroke="var(--map-road-ink)" :stroke-width="unitScale * .8" :marker-start="route.arrow === 'start' ? `url(#${arrow})` : undefined" :marker-end="route.arrow === 'end' ? `url(#${arrow})` : undefined" />
            </g>
        </g>
        <g v-for="node in projection.nodes" :key="node.location.key" class="map-place" :class="{ 'is-selected': node.location.key === selectedLocationKey, 'is-current': node.location.key === current, 'is-unvisited': node.location.status !== 'visited' }" :transform="`translate(${node.x} ${node.y}) scale(${unitScale * .5})`" role="button" tabindex="0" :aria-label="MAP_SPACE_COPY.placeLabel(node.location.name)" @click.stop="$emit('select', node.location.key)" @keydown.enter.stop="$emit('select', node.location.key)" @keydown.space.stop.prevent="$emit('select', node.location.key)">
            <circle class="map-pin-halo" r="39" /><path class="map-pin-body" d="M0 33C-6 25-26 8-26-6a26 26 0 0 1 52 0C26 8 6 25 0 33Z" />
            <g transform="translate(-14 -20)"><MapIcon :name="icon(node.location.terrain, node.location.scale)" width="28" height="28" /></g>
            <text y="64" class="map-place-name">{{ node.location.name.length > 14 ? node.location.name.slice(0, 13) + '…' : node.location.name }}</text>
            <text v-if="node.location.key === current" y="89" class="map-place-status">{{ MAP_SPACE_COPY.current }}</text>
            <text v-else-if="node.location.status !== 'visited'" y="89" class="map-place-status">{{ MAP_VISIT_LABELS.unvisited }}</text>
            <title>{{ node.location.name }}{{ node.location.brief ? ' · ' + node.location.brief : '' }}</title>
        </g>
    </MapViewport>
</template>
