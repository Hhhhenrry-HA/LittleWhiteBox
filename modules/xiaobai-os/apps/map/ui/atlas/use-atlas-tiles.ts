import { computed, inject, onBeforeUnmount, shallowRef, watch } from 'vue';
import type { SpaceBounds } from '../../../../domains/map/space/types.js';
import { atlasFinestLevel, atlasTileRect, ATLAS_TILE_SIZE, ATLAS_TILE_GUTTER, type AtlasTile, type AtlasTileRect } from './surface.js';
import { clearAtlasPreparedSurfaces, renderAtlasTileJob, type AtlasTileJob, type AtlasTileResult } from './tile-render.js';
import { AtlasTileScheduler, ATLAS_WORKER_COUNT, type AtlasTileRenderer } from './tiles.js';
import { atlasTileId, planAtlasTiles, type AtlasTileLayer, type AtlasTilePlan } from './tile-plan.js';
import { ATLAS_TILE_SESSION } from './tile-session.js';

export interface AtlasTilePlacement { x: number; y: number; width: number; height: number }
export interface AtlasTileImage extends AtlasTilePlacement { key: string; href: string; clip: AtlasTilePlacement }
export interface AtlasTileView { images: AtlasTileImage[]; fallbacks: AtlasTileImage[] }
const REQUEST_DELAY = 150;
const place = (rect: AtlasTileRect, level: number, cell = false): AtlasTilePlacement => {
    const unit = 2 ** level, gutter = cell ? ATLAS_TILE_GUTTER : 0;
    return { x: (rect[0] + gutter) * unit, y: (rect[1] + gutter) * unit, width: (rect[2] - 2 * gutter) * unit, height: (rect[3] - 2 * gutter) * unit };
};
const intersect = (a: AtlasTilePlacement, b: AtlasTilePlacement): AtlasTilePlacement => {
    const x = Math.max(a.x, b.x), y = Math.max(a.y, b.y);
    return { x, y, width: Math.max(0, Math.min(a.x + a.width, b.x + b.width) - x), height: Math.max(0, Math.min(a.y + a.height, b.y + b.height) - y) };
};

function workerRenderers(deliver: (result: AtlasTileResult) => void, fail: (renderer: AtlasTileRenderer) => void): AtlasTileRenderer[] {
    if (typeof Worker === 'undefined') { return []; }
    const count = Math.min(ATLAS_WORKER_COUNT, Math.max(1, (navigator.hardwareConcurrency || 2) - 1)), renderers: AtlasTileRenderer[] = [];
    for (let i = 0; i < count; i++) {
        let worker: Worker;
        try { worker = new Worker(new URL('./atlas-tiles.worker.ts', import.meta.url), { type: 'module' }); } catch { break; }
        const renderer: AtlasTileRenderer = { render: job => worker.postMessage(job), dispose: () => worker.terminate() };
        worker.onmessage = (event: MessageEvent<AtlasTileResult>) => deliver(event.data);
        worker.onerror = event => { event.preventDefault(); fail(renderer); };
        renderers.push(renderer);
    }
    return renderers;
}
/** Without module workers, tiles render between frames on the main thread. */
function mainThreadRenderer(deliver: (result: AtlasTileResult) => void): AtlasTileRenderer {
    let timer: ReturnType<typeof setTimeout> | undefined;
    return { render: job => { timer = setTimeout(() => deliver(renderAtlasTileJob(job))); }, dispose: () => { clearTimeout(timer); clearAtlasPreparedSurfaces(); } };
}

/** View-dependent jobs are disposable; decoded images belong to the current chat's session. */
export function useAtlasTiles(layers: () => AtlasTileLayer[], viewport: () => SpaceBounds, unitScale: () => number) {
    const session = inject(ATLAS_TILE_SESSION)!;
    const { cache } = session, version = shallowRef(0);
    let frame = 0;
    const scheduler = new AtlasTileScheduler({
        cache, createUrl: blob => URL.createObjectURL(blob), revokeUrl: url => URL.revokeObjectURL(url),
        decode: async url => { const image = new Image(); image.src = url; await image.decode(); },
        renderers: workerRenderers, fallback: mainThreadRenderer,
        onTile: () => { frame ||= requestAnimationFrame(() => { frame = 0; version.value++; }); },
    });
    // Half the cache is the incoming working set; the other half keeps previous views while replacing them.
    const plans = computed(() => planAtlasTiles(layers(), viewport(), unitScale() / (globalThis.devicePixelRatio || 1), cache.budget / 2));

    function fallbackFor(plan: AtlasTilePlan, tile: AtlasTile) {
        if (tile.level > atlasFinestLevel(plan.source)) {
            const children = [0, 1, 2, 3].map(i => ({ level: tile.level - 1, tx: tile.tx * 2 + (i & 1), ty: tile.ty * 2 + (i >> 1) })).filter(t => atlasTileRect(plan.bounds, t));
            const hits = children.map(t => ({ id: atlasTileId(plan.key, t), level: t.level, entry: cache.get(atlasTileId(plan.key, t)) }));
            if (hits.every(hit => hit.entry)) { return hits; }
        }
        for (let level = tile.level + 1; level <= plan.preview; level++) {
            const d = 2 ** (level - tile.level), id = atlasTileId(plan.key, { level, tx: Math.floor(tile.tx / d), ty: Math.floor(tile.ty / d) }), entry = cache.get(id);
            if (entry) { return [{ id, level, entry }]; }
        }
        return [];
    }

    const tiles = computed(() => {
        void version.value;
        const views = new Map<string, AtlasTileView>();
        for (const plan of plans.value) {
            const view: AtlasTileView = { images: [], fallbacks: [] };
            for (const tile of plan.tiles) {
                const id = atlasTileId(plan.key, tile), exact = cache.get(id), clip = place(atlasTileRect(plan.bounds, tile)!, tile.level, true);
                if (exact) {
                    view.images.push({ key: id, href: exact.url, clip, ...place(exact.rect, tile.level) });
                } else {
                    for (const hit of fallbackFor(plan, tile)) {
                        const entry = hit.entry!;
                        view.fallbacks.push({ key: `${id}<${hit.id}`, href: entry.url, clip: intersect(clip, place(entry.rect, hit.level, true)), ...place(entry.rect, hit.level) });
                    }
                }
            }
            views.set(plan.id, view);
        }
        return views;
    });

    let timer: ReturnType<typeof setTimeout> | undefined, started = false;
    const request = () => {
        timer = undefined;
        if (session.signal.aborted) { return; }
        const view = viewport(), cx = view[0] + view[2] / 2, cy = view[1] + view[3] / 2, previews: AtlasTileJob[] = [], detail: [number, AtlasTileJob][] = [];
        for (const plan of plans.value) {
            const job = (tile: AtlasTile): AtlasTileJob => ({ id: atlasTileId(plan.key, tile), surfaceKey: plan.key, source: plan.source, tile });
            previews.push(...plan.previews.map(job));
            const span = ATLAS_TILE_SIZE * 2 ** plan.level * plan.scale;
            for (const tile of plan.tiles) { detail.push([(plan.offset[0] + (tile.tx + .5) * span - cx) ** 2 + (plan.offset[1] + (tile.ty + .5) * span - cy) ** 2, job(tile)]); }
        }
        const jobs = [...new Map([...previews, ...detail.sort((a, b) => a[0] - b[0]).map(([, job]) => job)].map(job => [job.id, job])).values()];
        // Pin the bounded target, not historical requests. Protected previews prevent eviction from leaving holes.
        scheduler.request(jobs, new Set(jobs.map(job => job.id)));
    };
    watch(plans, () => {
        scheduler.request([], new Set());
        if (!started) { started = true; request(); return; }
        clearTimeout(timer);
        timer = setTimeout(request, REQUEST_DELAY);
    }, { immediate: true });
    const dispose = () => { clearTimeout(timer); cancelAnimationFrame(frame); scheduler.dispose(); };
    session.signal.addEventListener('abort', dispose, { once: true });
    onBeforeUnmount(() => { session.signal.removeEventListener('abort', dispose); dispose(); });
    return { tiles };
}
