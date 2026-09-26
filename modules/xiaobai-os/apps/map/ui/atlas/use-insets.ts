import { onBeforeUnmount, onMounted, ref, watch, type Ref } from 'vue';
import type { AtlasInsets } from './camera.js';

/** Measure floating UI without shrinking the geographic canvas underneath it. */
export function useAtlasInsets(root: Ref<HTMLElement | null>, top: Ref<HTMLElement | null>, bottom: Ref<HTMLElement | null>) {
    const insets = ref<AtlasInsets>([170, 20, 100, 20]);
    let observer: ResizeObserver | undefined;
    const measure = () => {
        const bounds = root.value?.getBoundingClientRect();
        if (!bounds?.height) { return; }
        const panel = bottom.value?.getBoundingClientRect();
        const sidePanel = panel && panel.left >= bounds.left + bounds.width / 2;
        insets.value = [Math.max(0, (top.value?.getBoundingClientRect().bottom || bounds.top) - bounds.top) + 16,
            sidePanel ? bounds.right - panel.left + 16 : 20,
            panel && !sidePanel ? bounds.bottom - panel.top + 16 : 20, 20];
    };
    const observe = () => {
        observer?.disconnect();
        for (const element of [root.value, top.value, bottom.value]) { if (element) { observer?.observe(element); } }
        measure();
    };
    onMounted(() => { observer = new ResizeObserver(measure); observe(); });
    watch([top, bottom], observe, { flush: 'post' });
    onBeforeUnmount(() => observer?.disconnect());
    return { insets, measure };
}
