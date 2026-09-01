<script setup lang="ts">
import { computed } from 'vue';
import type { MapAtlas, MapLink, MapLocation } from '../../../domains/map/types.js';
import MapViewport from './MapViewport.vue';
import {
    actorsAtLocation,
    layoutMapAtlas,
    MAP_LINK_LABELS,
    MAP_SCALE_ICONS,
    MAP_SCALE_LABELS,
    type AtlasLayoutNode,
} from './map-presentation.js';

const props = defineProps<{
    atlas: MapAtlas;
    revision: number;
    currentLocationKey: string;
    selectedLocationKey: string;
    symbolsReady: boolean;
}>();

const emit = defineEmits<{
    viewScene: [locationKey: string];
}>();

const layout = computed(() => layoutMapAtlas(props.atlas));
const locationByKey = computed(() => new Map(props.atlas.locations.map(location => [location.key, location])));
const linkById = computed(() => new Map(props.atlas.links.map(link => [link.id, link])));

function locationOf(node: AtlasLayoutNode): MapLocation {
    return locationByKey.value.get(node.key)!;
}

function linkOf(id: string): MapLink {
    return linkById.value.get(id)!;
}

function actorList(locationKey: string) {
    return actorsAtLocation(props.atlas.actors, locationKey);
}

function viewScene(location: MapLocation): void {
    if (location.sceneKey) {emit('viewScene', location.key);}
}

function onNodeKeydown(event: KeyboardEvent, location: MapLocation): void {
    if (!location.sceneKey || (event.key !== 'Enter' && event.key !== ' ')) {return;}
    event.preventDefault();
    viewScene(location);
}
</script>

<template>
    <MapViewport
        class="map-atlas-viewport"
        :view-box="layout.viewBox"
        :reset-key="String(revision)"
        label="世界地点关系图"
    >
        <defs>
            <pattern id="map-atlas-grid" width="28" height="28" patternUnits="userSpaceOnUse">
                <path d="M28 0H0V28" fill="none" stroke="rgba(92, 176, 228, .08)" stroke-width="1" />
            </pattern>
            <marker id="map-atlas-arrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
                <path d="M1 1l8 4-8 4z" fill="#58bce9" />
            </marker>
            <filter id="map-atlas-current-glow" x="-80%" y="-80%" width="260%" height="260%">
                <feGaussianBlur stdDeviation="3" result="blur" />
                <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
            </filter>
        </defs>
        <rect
            :x="layout.viewBox[0]"
            :y="layout.viewBox[1]"
            :width="layout.viewBox[2]"
            :height="layout.viewBox[3]"
            class="map-atlas-background"
        />
        <rect
            :x="layout.viewBox[0]"
            :y="layout.viewBox[1]"
            :width="layout.viewBox[2]"
            :height="layout.viewBox[3]"
            fill="url(#map-atlas-grid)"
        />

        <g class="map-atlas-hierarchy" aria-hidden="true">
            <path v-for="edge in layout.hierarchy" :key="edge.id" :d="edge.path" vector-effect="non-scaling-stroke" />
        </g>
        <g class="map-atlas-routes">
            <g v-for="route in layout.routes" :key="route.id">
                <path
                    :d="route.path"
                    :marker-start="linkOf(route.id).bidirectional ? 'url(#map-atlas-arrow)' : undefined"
                    marker-end="url(#map-atlas-arrow)"
                    vector-effect="non-scaling-stroke"
                />
                <text :x="route.labelX" :y="route.labelY">
                    {{ linkOf(route.id).label || MAP_LINK_LABELS[linkOf(route.id).kind] }}
                </text>
            </g>
        </g>

        <g
            v-for="node in layout.nodes"
            :key="node.key"
            class="map-atlas-node"
            :class="{
                'is-current': node.key === currentLocationKey,
                'is-selected': node.key === selectedLocationKey,
                'is-visited': locationOf(node).status === 'visited',
                'is-clickable': Boolean(locationOf(node).sceneKey),
            }"
            :role="locationOf(node).sceneKey ? 'button' : undefined"
            :tabindex="locationOf(node).sceneKey ? 0 : undefined"
            :aria-label="locationOf(node).sceneKey ? `查看 ${locationOf(node).name} 场景` : locationOf(node).name"
            @click.stop="viewScene(locationOf(node))"
            @keydown="onNodeKeydown($event, locationOf(node))"
        >
            <rect :x="node.x" :y="node.y" :width="node.width" :height="node.height" rx="9" />
            <path
                class="map-atlas-node-cut"
                :d="`M ${node.x + node.width - 24} ${node.y} L ${node.x + node.width} ${node.y + 24}`"
            />
            <circle :cx="node.x + 24" :cy="node.y + 24" r="13" class="map-atlas-node-icon-ring" />
            <text v-if="symbolsReady" :x="node.x + 24" :y="node.y + 24" class="map-material-symbol">
                {{ MAP_SCALE_ICONS[locationOf(node).scale] }}
            </text>
            <text v-else :x="node.x + 24" :y="node.y + 24" class="map-symbol-fallback">
                {{ MAP_SCALE_LABELS[locationOf(node).scale].slice(0, 1) }}
            </text>
            <text :x="node.x + 45" :y="node.y + 23" class="map-atlas-node-name">{{ locationOf(node).name }}</text>
            <text :x="node.x + 45" :y="node.y + 42" class="map-atlas-node-meta">
                {{ MAP_SCALE_LABELS[locationOf(node).scale] }} · {{ locationOf(node).status === 'visited' ? '已到访' : '仅提及' }}
            </text>
            <g v-if="actorList(node.key).length" class="map-atlas-actors">
                <g
                    v-for="(actor, actorIndex) in actorList(node.key).slice(0, 4)"
                    :key="actor.actorKey"
                    :transform="`translate(${node.x + 19 + actorIndex * 18} ${node.y + node.height - 2})`"
                    :class="{ 'is-player': actor.actorKey === 'player' }"
                >
                    <circle r="7" />
                    <text v-if="symbolsReady" class="map-material-symbol">{{ actor.actorKey === 'player' ? 'person_pin_circle' : 'person' }}</text>
                    <text v-else class="map-symbol-fallback">{{ actor.actorKey === 'player' ? 'P' : 'N' }}</text>
                    <title>{{ actor.displayName }}</title>
                </g>
                <text
                    v-if="actorList(node.key).length > 4"
                    :x="node.x + 88"
                    :y="node.y + node.height + 2"
                    class="map-atlas-actor-overflow"
                >
                    +{{ actorList(node.key).length - 4 }}
                </text>
            </g>
            <g v-if="node.key === currentLocationKey" class="map-atlas-current-pin" :transform="`translate(${node.x + node.width - 13} ${node.y + 13})`">
                <circle r="7" />
                <path d="M-3 0l2 2 4-5" />
            </g>
            <title>{{ locationOf(node).brief || locationOf(node).name }}</title>
        </g>
    </MapViewport>
</template>
