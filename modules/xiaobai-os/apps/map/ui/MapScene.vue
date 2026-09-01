<script setup lang="ts">
import { computed } from 'vue';
import type {
    CircleGeometry,
    MapElement,
    MapMaterial,
    MapScene,
    PointGeometry,
    RectGeometry,
} from '../../../domains/map/types.js';
import MapViewport from './MapViewport.vue';
import {
    elementPresentation,
    MAP_MATERIAL_COLORS,
    MAP_MOOD_RECIPES,
    sceneElementLabelPoint,
    sceneElementPath,
    sortedSceneElements,
} from './map-presentation.js';
import { MAP_MATERIALS } from '../../../domains/map/semantics.js';

let nextSceneId = 0;

const props = defineProps<{
    scene: MapScene;
    symbolsReady: boolean;
}>();

const patternPrefix = `xiaobai-map-scene-${nextSceneId += 1}`;
const materials: readonly MapMaterial[] = MAP_MATERIALS;
const elements = computed(() => sortedSceneElements(props.scene.elements));
const mood = computed(() => MAP_MOOD_RECIPES[props.scene.mood || 'neutral']);
const canvasStyle = computed(() => ({
    '--map-canvas-bg': mood.value.background,
    '--map-canvas-glow': mood.value.glow,
    '--map-canvas-accent': mood.value.accent,
}));

function rectOf(element: MapElement): RectGeometry {
    return element.geometry as RectGeometry;
}

function circleOf(element: MapElement): CircleGeometry {
    return element.geometry as CircleGeometry;
}

function pointOf(element: MapElement): PointGeometry {
    return element.geometry as PointGeometry;
}
</script>

<template>
    <MapViewport
        class="map-scene-viewport"
        :style="canvasStyle"
        :view-box="scene.viewBox"
        :reset-key="scene.key"
        :label="`${scene.name} 场景地图`"
    >
        <defs>
            <pattern id="map-scene-minor-grid" width="20" height="20" patternUnits="userSpaceOnUse">
                <path d="M20 0H0V20" fill="none" stroke="rgba(102, 181, 231, .08)" stroke-width="1" />
            </pattern>
            <pattern id="map-scene-major-grid" width="100" height="100" patternUnits="userSpaceOnUse">
                <rect width="100" height="100" fill="url(#map-scene-minor-grid)" />
                <path d="M100 0H0V100" fill="none" stroke="rgba(102, 181, 231, .15)" stroke-width="1.4" />
            </pattern>
            <pattern
                v-for="material in materials"
                :id="`${patternPrefix}-material-${material}`"
                :key="material"
                width="24"
                height="24"
                patternUnits="userSpaceOnUse"
                :class="`map-material-pattern is-${material}`"
            >
                <rect width="24" height="24" :fill="MAP_MATERIAL_COLORS[material]" />
                <path v-if="material === 'wood'" d="M0 6H24M0 18H24M7 0V6M17 6V18M10 18V24" />
                <path v-else-if="material === 'stone'" d="M0 8L7 3l8 3 9-4M2 19l8-5 10 4 4-3" />
                <path v-else-if="material === 'tile' || material === 'marble'" d="M0 8H24M0 16H24M8 0v24m8-24v24" />
                <path v-else-if="material === 'water'" d="M-4 6q6-5 12 0t12 0t12 0M-4 17q6-5 12 0t12 0t12 0" />
                <path v-else-if="material === 'grass'" d="M4 20l2-7 2 7M13 13l2-8 2 8M19 23l2-6 2 6" />
                <path v-else-if="material === 'dirt'" d="M3 5h2m8 3h3m3 10h2M7 19h3" />
                <circle v-else-if="material === 'sand'" cx="6" cy="7" r="1.1" /><circle v-if="material === 'sand'" cx="18" cy="16" r="1" />
                <path v-else-if="material === 'snow'" d="M12 3v18M4 7l16 10M20 7L4 17" />
                <path v-else-if="material === 'metal'" d="M0 4h24M0 20h24" /><circle v-if="material === 'metal'" cx="5" cy="12" r="1.2" /><circle v-if="material === 'metal'" cx="19" cy="12" r="1.2" />
                <path v-else-if="material === 'fabric' || material === 'carpet' || material === 'bed-sheet' || material === 'tatami'" d="M0 4q6 4 12 0t12 0M0 16q6 4 12 0t12 0" />
                <path v-else-if="material === 'blood'" d="M0 6l7 5 5-8 5 13 7-5M0 22l8-5 6 4 10-8" />
                <path v-else-if="material === 'rune'" d="M12 2l4 7 6 3-6 4-4 6-4-6-6-4 6-3zM8 9l8 7m0-7l-8 7" />
                <path v-else-if="material === 'warm-light' || material === 'cold-light' || material === 'shadow'" d="M12 2v20M2 12h20M5 5l14 14M19 5L5 19" />
            </pattern>
            <filter id="map-scene-icon-glow" x="-80%" y="-80%" width="260%" height="260%">
                <feGaussianBlur stdDeviation="2.5" result="blur" />
                <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
            </filter>
        </defs>

        <rect
            :x="scene.viewBox[0]"
            :y="scene.viewBox[1]"
            :width="scene.viewBox[2]"
            :height="scene.viewBox[3]"
            fill="var(--map-canvas-bg)"
        />
        <rect
            :x="scene.viewBox[0]"
            :y="scene.viewBox[1]"
            :width="scene.viewBox[2]"
            :height="scene.viewBox[3]"
            fill="url(#map-scene-major-grid)"
        />
        <ellipse
            :cx="scene.viewBox[0] + scene.viewBox[2] / 2"
            :cy="scene.viewBox[1] + scene.viewBox[3] / 2"
            :rx="scene.viewBox[2] * .42"
            :ry="scene.viewBox[3] * .42"
            fill="var(--map-canvas-glow)"
        />

        <g
            v-for="element in elements"
            :key="element.id"
            class="map-scene-element"
            :class="[`is-${element.category}`, `is-${element.certainty || 'confirmed'}`]"
            :opacity="elementPresentation(element, patternPrefix).opacity"
        >
            <rect
                v-if="element.shape === 'rect'"
                :x="rectOf(element).x"
                :y="rectOf(element).y"
                :width="rectOf(element).width"
                :height="rectOf(element).height"
                :fill="elementPresentation(element, patternPrefix).fill"
                :stroke="elementPresentation(element, patternPrefix).stroke"
                :stroke-width="elementPresentation(element, patternPrefix).width"
                :stroke-dasharray="elementPresentation(element, patternPrefix).dash"
                vector-effect="non-scaling-stroke"
            />
            <circle
                v-else-if="element.shape === 'circle'"
                :cx="circleOf(element).x"
                :cy="circleOf(element).y"
                :r="circleOf(element).radius"
                :fill="elementPresentation(element, patternPrefix).fill"
                :stroke="elementPresentation(element, patternPrefix).stroke"
                :stroke-width="elementPresentation(element, patternPrefix).width"
                :stroke-dasharray="elementPresentation(element, patternPrefix).dash"
                vector-effect="non-scaling-stroke"
            />
            <path
                v-else-if="element.shape === 'path' || element.shape === 'curve'"
                :d="sceneElementPath(element)"
                :fill="elementPresentation(element, patternPrefix).fill"
                :stroke="elementPresentation(element, patternPrefix).stroke"
                :stroke-width="elementPresentation(element, patternPrefix).width"
                :stroke-dasharray="elementPresentation(element, patternPrefix).dash"
                stroke-linecap="round"
                stroke-linejoin="round"
                fill-rule="evenodd"
                vector-effect="non-scaling-stroke"
            />
            <g
                v-else-if="element.shape === 'icon'"
                class="map-scene-icon"
                :transform="`translate(${pointOf(element).x} ${pointOf(element).y})`"
            >
                <circle r="11" :stroke="elementPresentation(element, patternPrefix).stroke" />
                <text v-if="symbolsReady" class="map-material-symbol" aria-hidden="true">
                    {{ elementPresentation(element, patternPrefix).icon }}
                </text>
                <text v-else class="map-symbol-fallback" aria-hidden="true">
                    {{ elementPresentation(element, patternPrefix).fallback }}
                </text>
            </g>
            <text
                v-else-if="element.shape === 'label'"
                class="map-scene-label is-primary"
                :x="pointOf(element).x"
                :y="pointOf(element).y"
            >
                {{ element.label || '' }}
            </text>
            <text
                v-if="element.label && element.shape !== 'label'"
                class="map-scene-label"
                :x="sceneElementLabelPoint(element)[0]"
                :y="sceneElementLabelPoint(element)[1]"
            >
                {{ element.label }}
            </text>
        </g>
    </MapViewport>
</template>
