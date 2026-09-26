import { prepareAtlasSurface, renderAtlasTile, type AtlasPreparedSurface, type AtlasSurfaceSource, type AtlasTile, type AtlasTileRect } from './surface.js';

export interface AtlasTileJob { id: string; surfaceKey: string; source: AtlasSurfaceSource; tile: AtlasTile }
export interface AtlasTileResult { id: string; blob?: Blob; rect?: AtlasTileRect; error?: string }

// Prepared surfaces (envelope fields) are reused by the tiles of one feature across views.
const prepared = new Map<string, AtlasPreparedSurface>();
const PREPARED_LIMIT = 64;
export function clearAtlasPreparedSurfaces(): void { prepared.clear(); }
function surfaceFor(job: AtlasTileJob): AtlasPreparedSurface {
    let surface = prepared.get(job.surfaceKey);
    if (surface) { prepared.delete(job.surfaceKey); } else { surface = prepareAtlasSurface(job.source); }
    prepared.set(job.surfaceKey, surface);
    if (prepared.size > PREPARED_LIMIT) { prepared.delete(prepared.keys().next().value!); }
    return surface;
}

const CRC = Array.from({ length: 256 }, (_, n) => { for (let k = 0; k < 8; k++) { n = n & 1 ? 0xedb88320 ^ (n >>> 1) : n >>> 1; } return n >>> 0; });
/** Stored PNG bytes, including row filters, deflate blocks and chunk headers. */
export function atlasPngBytes(width: number, height: number): number {
    const raw = (width * 4 + 1) * height;
    return 63 + raw + Math.max(1, Math.ceil(raw / 65535)) * 5;
}
function crc32(bytes: Uint8Array, start: number, end: number): number {
    let c = ~0;
    for (let i = start; i < end; i++) { c = CRC[(c ^ bytes[i]) & 255] ^ (c >>> 8); }
    return ~c >>> 0;
}
/**
 * Lossless RGBA PNG with stored (uncompressed) deflate blocks. Canvas PNG compression costs more than rendering
 * the tile and gains little on grained texture; the stored bytes are counted in the tile cache budget.
 */
export function encodeAtlasPng(pixels: Uint8Array | Uint8ClampedArray, width: number, height: number): Uint8Array<ArrayBuffer> {
    const row = width * 4 + 1, raw = row * height, blocks = Math.max(1, Math.ceil(raw / 65535));
    const idat = 2 + raw + blocks * 5 + 4, png = new Uint8Array(atlasPngBytes(width, height)), view = new DataView(png.buffer);
    png.set([137, 80, 78, 71, 13, 10, 26, 10]);
    let o = 8;
    const chunk = (type: string, length: number, fill: () => void) => {
        view.setUint32(o, length); for (let i = 0; i < 4; i++) { png[o + 4 + i] = type.charCodeAt(i); }
        const start = o + 4; o += 8; fill(); view.setUint32(o, crc32(png, start, o)); o += 4;
    };
    chunk('IHDR', 13, () => { view.setUint32(o, width); view.setUint32(o + 4, height); png.set([8, 6, 0, 0, 0], o + 8); o += 13; });
    chunk('IDAT', idat, () => {
        // Each row: filter byte 0, then its RGBA bytes.
        const data = new Uint8Array(raw);
        for (let y = 0; y < height; y++) { data.set(pixels.subarray(y * width * 4, (y + 1) * width * 4), y * row + 1); }
        png[o++] = 0x78; png[o++] = 1;
        for (let k = 0, done = 0; k < blocks; k++, done += 65535) {
            const size = Math.min(65535, raw - done);
            png[o] = k === blocks - 1 ? 1 : 0; view.setUint16(o + 1, size, true); view.setUint16(o + 3, ~size & 0xffff, true);
            png.set(data.subarray(done, done + size), o + 5); o += 5 + size;
        }
        let a = 1, b = 0;
        for (let i = 0; i < raw;) {
            for (const end = Math.min(raw, i + 5552); i < end; i++) { a += data[i]; b += a; }
            a %= 65521; b %= 65521;
        }
        view.setUint32(o, ((b << 16) | a) >>> 0); o += 4;
    });
    chunk('IEND', 0, () => {});
    return png;
}
/** Shared by the tile worker and the main-thread fallback. */
export function renderAtlasTileJob(job: AtlasTileJob): AtlasTileResult {
    try {
        const result = renderAtlasTile(surfaceFor(job), job.tile);
        if (!result) { return { id: job.id }; }
        return { id: job.id, rect: result.rect, blob: new Blob([encodeAtlasPng(result.pixels, result.rect[2], result.rect[3])], { type: 'image/png' }) };
    } catch (error) {
        return { id: job.id, error: error instanceof Error ? error.message : String(error) };
    }
}
