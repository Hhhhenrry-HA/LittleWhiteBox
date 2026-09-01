<script setup lang="ts">
import { computed, onBeforeUnmount, ref, watch } from 'vue';

const props = withDefaults(defineProps<{
    viewBox: readonly [number, number, number, number];
    resetKey?: string;
    label: string;
}>(), {
    resetKey: '',
});

const svg = ref<SVGSVGElement | null>(null);
const viewport = ref<[number, number, number, number]>([...props.viewBox]);
let pointerId: number | null = null;
let pointerOrigin: [number, number] = [0, 0];
let viewportOrigin: [number, number] = [0, 0];
let captureTarget: Element | null = null;
let dragged = false;
let suppressClick = false;
let suppressTimer: ReturnType<typeof setTimeout> | null = null;

const viewBoxText = computed(() => viewport.value.join(' '));

function reset(): void {
    const [x, y, width, height] = props.viewBox;
    viewport.value = [x, y, Math.max(1, width), Math.max(1, height)];
}

function screenScale(): number {
    const bounds = svg.value?.getBoundingClientRect();
    if (!bounds?.width || !bounds.height) {return 1;}
    return Math.max(viewport.value[2] / bounds.width, viewport.value[3] / bounds.height);
}

function clientToMap(clientX: number, clientY: number): [number, number] {
    const bounds = svg.value?.getBoundingClientRect();
    if (!bounds?.width || !bounds.height) {
        return [viewport.value[0] + viewport.value[2] / 2, viewport.value[1] + viewport.value[3] / 2];
    }
    const scale = screenScale();
    const drawnWidth = viewport.value[2] / scale;
    const drawnHeight = viewport.value[3] / scale;
    const offsetX = (bounds.width - drawnWidth) / 2;
    const offsetY = (bounds.height - drawnHeight) / 2;
    return [
        viewport.value[0] + (clientX - bounds.left - offsetX) * scale,
        viewport.value[1] + (clientY - bounds.top - offsetY) * scale,
    ];
}

function zoom(factor: number, center?: [number, number]): void {
    const baseWidth = Math.max(1, props.viewBox[2]);
    const nextWidth = Math.min(baseWidth * 5, Math.max(baseWidth * 0.24, viewport.value[2] * factor));
    const appliedFactor = nextWidth / viewport.value[2];
    const nextHeight = viewport.value[3] * appliedFactor;
    const focus = center || [viewport.value[0] + viewport.value[2] / 2, viewport.value[1] + viewport.value[3] / 2];
    const ratioX = (focus[0] - viewport.value[0]) / viewport.value[2];
    const ratioY = (focus[1] - viewport.value[1]) / viewport.value[3];
    viewport.value = [
        focus[0] - nextWidth * ratioX,
        focus[1] - nextHeight * ratioY,
        nextWidth,
        nextHeight,
    ];
}

function onWheel(event: WheelEvent): void {
    zoom(event.deltaY < 0 ? 0.84 : 1.19, clientToMap(event.clientX, event.clientY));
}

function onPointerDown(event: PointerEvent): void {
    if (event.button !== 0 || pointerId !== null) {return;}
    pointerId = event.pointerId;
    pointerOrigin = [event.clientX, event.clientY];
    viewportOrigin = [viewport.value[0], viewport.value[1]];
    dragged = false;
    captureTarget = event.target instanceof Element ? event.target : svg.value;
    captureTarget?.setPointerCapture(event.pointerId);
}

function onPointerMove(event: PointerEvent): void {
    if (event.pointerId !== pointerId) {return;}
    const dx = event.clientX - pointerOrigin[0];
    const dy = event.clientY - pointerOrigin[1];
    if (Math.abs(dx) + Math.abs(dy) > 4) {dragged = true;}
    const scale = screenScale();
    viewport.value = [
        viewportOrigin[0] - dx * scale,
        viewportOrigin[1] - dy * scale,
        viewport.value[2],
        viewport.value[3],
    ];
}

function finishPointer(event: PointerEvent): void {
    if (event.pointerId !== pointerId) {return;}
    if (captureTarget?.hasPointerCapture(event.pointerId)) {captureTarget.releasePointerCapture(event.pointerId);}
    captureTarget = null;
    pointerId = null;
    if (!dragged) {return;}
    suppressClick = true;
    if (suppressTimer) {clearTimeout(suppressTimer);}
    suppressTimer = setTimeout(() => {suppressClick = false;}, 0);
}

function captureClick(event: MouseEvent): void {
    if (!suppressClick) {return;}
    event.preventDefault();
    event.stopPropagation();
}

watch(
    () => [props.viewBox[0], props.viewBox[1], props.viewBox[2], props.viewBox[3], props.resetKey],
    reset,
    { immediate: true },
);

onBeforeUnmount(() => {
    if (suppressTimer) {clearTimeout(suppressTimer);}
});
</script>

<template>
    <div class="map-viewport">
        <svg
            ref="svg"
            class="map-viewport-svg"
            :viewBox="viewBoxText"
            preserveAspectRatio="xMidYMid meet"
            role="img"
            :aria-label="label"
            @wheel.prevent="onWheel"
            @pointerdown="onPointerDown"
            @pointermove="onPointerMove"
            @pointerup="finishPointer"
            @pointercancel="finishPointer"
            @click.capture="captureClick"
        >
            <slot />
        </svg>
        <div class="map-viewport-controls" aria-label="地图缩放控制">
            <button type="button" title="放大" aria-label="放大" @click="zoom(.8)">+</button>
            <button type="button" title="缩小" aria-label="缩小" @click="zoom(1.25)">-</button>
            <button type="button" class="map-viewport-reset" @click="reset">复位</button>
        </div>
    </div>
</template>
