import type { AtlasTileRect } from './surface.js';
import type { AtlasTileJob, AtlasTileResult } from './tile-render.js';

export interface AtlasCachedTile { url: string; rect: AtlasTileRect; bytes: number }

/** Hard decoded + encoded budget. Admission never discards a pinned image or exceeds the limit. */
export class AtlasTileCache {
    private entries = new Map<string, AtlasCachedTile>();
    bytes = 0;
    constructor(readonly budget: number, private revoke: (url: string) => void) {}
    get size() { return this.entries.size; }
    has(key: string) { return this.entries.has(key); }
    /** Reading a tile marks it recently used. */
    get(key: string): AtlasCachedTile | undefined {
        const entry = this.entries.get(key);
        if (entry) { this.entries.delete(key); this.entries.set(key, entry); }
        return entry;
    }
    set(key: string, url: string, rect: AtlasTileRect, pinned: ReadonlySet<string>, encoded = 0) {
        const bytes = rect[2] * rect[3] * 4 + encoded;
        const protectedBytes = [...this.entries].reduce((sum, [id, entry]) => sum + (id !== key && pinned.has(id) ? entry.bytes : 0), 0);
        if (protectedBytes + bytes > this.budget) { this.revoke(url); return false; }
        this.delete(key);
        for (const id of [...this.entries.keys()]) {
            if (this.bytes + bytes <= this.budget) { break; }
            if (!pinned.has(id)) { this.delete(id); }
        }
        this.entries.set(key, { url, rect, bytes });
        this.bytes += bytes;
        return true;
    }
    clear() { for (const key of [...this.entries.keys()]) { this.delete(key); } }
    retainSurfaceKeys(keys: ReadonlySet<string>) {
        for (const key of [...this.entries.keys()]) { if (!keys.has(key.slice(0, key.lastIndexOf('@')))) { this.delete(key); } }
    }
    private delete(key: string) {
        const entry = this.entries.get(key);
        if (!entry) { return; }
        this.entries.delete(key);
        this.bytes -= entry.bytes;
        this.revoke(entry.url);
    }
}

export interface AtlasTileRenderer { render(job: AtlasTileJob): void; dispose(): void }
export interface AtlasTileSchedulerOptions {
    cache: AtlasTileCache;
    createUrl: (blob: Blob) => string;
    revokeUrl: (url: string) => void;
    decode: (url: string) => Promise<void>;
    /** Renderers deliver results through the callback; a renderer that fails is replaced by the fallback. */
    renderers: (deliver: (result: AtlasTileResult) => void, fail: (renderer: AtlasTileRenderer) => void) => AtlasTileRenderer[];
    fallback: (deliver: (result: AtlasTileResult) => void) => AtlasTileRenderer;
    onTile: () => void;
}

export const ATLAS_WORKER_COUNT = 2;
export const ATLAS_WORKER_DEPTH = 3;
/**
 * Renders requested tiles in order. A new request replaces the queue. Each worker holds a few jobs so it keeps
 * rendering while the main thread is busy receiving results; the main-thread fallback takes one at a time.
 */
export class AtlasTileScheduler {
    private queue: AtlasTileJob[] = [];
    private idle: AtlasTileRenderer[];
    private running = new Map<string, { job: AtlasTileJob; renderer: AtlasTileRenderer }>();
    private failed = new Set<string>();
    private pinned: ReadonlySet<string> = new Set();
    private disposed = false;
    private wanted = new Set<string>();
    constructor(private options: AtlasTileSchedulerOptions) {
        this.idle = options.renderers(result => this.deliver(result), renderer => this.fail(renderer)).flatMap(r => Array<AtlasTileRenderer>(ATLAS_WORKER_DEPTH).fill(r));
        if (!this.idle.length) { this.idle = [options.fallback(result => this.deliver(result))]; }
    }
    get pending() { return this.queue.length + this.running.size; }
    request(jobs: AtlasTileJob[], pinned: ReadonlySet<string>) {
        this.pinned = pinned;
        this.wanted = new Set(jobs.map(job => job.id));
        this.queue = jobs.filter(job => !this.options.cache.has(job.id) && !this.running.has(job.id) && !this.failed.has(job.id));
        this.pump();
    }
    dispose() {
        this.disposed = true;
        this.queue = [];
        for (const renderer of new Set([...this.idle, ...[...this.running.values()].map(r => r.renderer)])) { renderer.dispose(); }
        this.idle = [];
        this.running.clear();
    }
    private pump() {
        while (!this.disposed && this.idle.length && this.queue.length) {
            const job = this.queue.shift()!, renderer = this.idle.shift()!;
            this.running.set(job.id, { job, renderer });
            renderer.render(job);
        }
    }
    private async deliver(result: AtlasTileResult) {
        const run = this.running.get(result.id);
        if (!run || this.disposed) { return; }
        let url: string | undefined;
        try {
            if (!this.wanted.has(result.id)) { return; }
            if (result.error) { throw new Error(result.error); }
            if (!result.blob || !result.rect) { return; }
            url = this.options.createUrl(result.blob);
            // A Blob is not yet a displayable image. Keep the old coverage until decoding succeeds.
            await this.options.decode(url);
            if (this.disposed || this.running.get(result.id) !== run || !this.wanted.has(result.id)) { return; }
            const accepted = this.options.cache.set(result.id, url, result.rect, this.pinned, result.blob.size);
            url = undefined; // Cache owns the URL, including rejected admissions.
            if (accepted) { this.options.onTile(); }
        } catch (error) {
            // A deterministic failure would repeat; the preview or neighbouring level stays visible.
            this.failed.add(result.id);
            console.warn('[map] atlas tile failed', result.id, error);
        } finally {
            if (url) { this.options.revokeUrl(url); }
            if (this.running.get(result.id) === run) {
                this.running.delete(result.id);
                if (!this.disposed) { this.idle.push(run.renderer); this.pump(); }
            }
        }
    }
    private fail(renderer: AtlasTileRenderer) {
        if (this.disposed) { return; }
        renderer.dispose();
        this.idle = this.idle.filter(r => r !== renderer);
        for (const [id, run] of this.running) {
            if (run.renderer === renderer) { this.running.delete(id); if (this.wanted.has(id)) { this.queue.unshift(run.job); } }
        }
        const alive = this.idle.length + new Set([...this.running.values()].map(r => r.renderer)).size;
        if (!alive) { this.idle.push(this.options.fallback(result => this.deliver(result))); }
        this.pump();
    }
}
