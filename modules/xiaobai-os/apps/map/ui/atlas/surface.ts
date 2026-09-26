import { geometryBounds, geometryClosed, geometryPoints } from '../../../../domains/map/space/geometry.js';
import type { MapFeature, SpaceBounds, SpacePoint } from '../../../../domains/map/space/types.js';
import { ATLAS_MATERIALS } from './materials.js';
import { atlasBand, atlasFractal, atlasNoise, atlasRandom, atlasSeed } from './noise.js';

/**
 * Level L samples one texel per 2^L source units on a grid anchored at the source origin, so a
 * texel has the same value in every tile and view. A tile holds ATLAS_TILE_SIZE² texels of that grid.
 */
export const ATLAS_TILE_SIZE = 256;
export const ATLAS_TILE_GUTTER = 1;
export interface AtlasTile { level: number; tx: number; ty: number }
/**
 * Texel rectangle [gx, gy, width, height] with a sampling gutter on all sides. The gutter is not painted
 * as another cell; it supplies filtered samples when a cell edge falls between device pixels.
 */
export type AtlasTileRect = [number, number, number, number];
export interface AtlasTilePixels { rect: AtlasTileRect; pixels: Uint8ClampedArray }
export type AtlasSurfaceSource = Pick<MapFeature, 'id' | 'role' | 'material' | 'form' | 'geometry'>;

const clamp = (value: number) => Math.min(1, Math.max(0, value));
const rgb = (hex: string) => [1, 3, 5].map(i => parseInt(hex.slice(i, i + 2), 16));

/** Finest level: .25 units for authored detail, whose roof ridges and grain are half a unit wide. */
export function atlasFinestLevel(feature: AtlasSurfaceSource): number {
    return ['ridge', 'forest', 'blocks', 'compact', 'towers', 'scattered', 'celestial'].includes(feature.form || '') || feature.material === 'forest' ? -2 : -1;
}
/** At most 2^.25 device pixels per texel; screens finer than the finest level only magnify. */
export function atlasTileLevel(feature: AtlasSurfaceSource, sourceUnitsPerDevicePixel: number): number {
    return Math.max(atlasFinestLevel(feature), Math.floor(Math.log2(Math.max(sourceUnitsPerDevicePixel, 2 ** -30)) + .25));
}
/** The level at which the whole feature fits one tile per axis; the first texture shown while finer tiles render. */
export function atlasPreviewLevel(feature: AtlasSurfaceSource, bounds: SpaceBounds): number {
    return Math.max(atlasFinestLevel(feature), Math.ceil(Math.log2(Math.max(bounds[2], bounds[3], 2 ** -30) / ATLAS_TILE_SIZE)));
}
export function atlasTileRect(bounds: SpaceBounds, { level, tx, ty }: AtlasTile): AtlasTileRect | null {
    const unit = 2 ** level, size = ATLAS_TILE_SIZE;
    const x0 = Math.max(tx * size, Math.floor(bounds[0] / unit)), y0 = Math.max(ty * size, Math.floor(bounds[1] / unit));
    const x1 = Math.min((tx + 1) * size, Math.ceil((bounds[0] + bounds[2]) / unit)), y1 = Math.min((ty + 1) * size, Math.ceil((bounds[1] + bounds[3]) / unit));
    return x1 > x0 && y1 > y0 ? [x0 - ATLAS_TILE_GUTTER, y0 - ATLAS_TILE_GUTTER, x1 - x0 + 2 * ATLAS_TILE_GUTTER, y1 - y0 + 2 * ATLAS_TILE_GUTTER] : null;
}
/** Tiles of bounds within view, nearest the view centre first. */
export function atlasTilesInView(bounds: SpaceBounds, view: SpaceBounds, level: number): AtlasTile[] {
    const span = ATLAS_TILE_SIZE * 2 ** level;
    const x0 = Math.max(bounds[0], view[0]), y0 = Math.max(bounds[1], view[1]);
    const x1 = Math.min(bounds[0] + bounds[2], view[0] + view[2]), y1 = Math.min(bounds[1] + bounds[3], view[1] + view[3]);
    if (x1 < x0 || y1 < y0) { return []; }
    const tiles: AtlasTile[] = [], cx = view[0] + view[2] / 2, cy = view[1] + view[3] / 2;
    for (let ty = Math.floor(y0 / span); ty <= Math.floor(y1 / span); ty++) {
        for (let tx = Math.floor(x0 / span); tx <= Math.floor(x1 / span); tx++) {
            if (atlasTileRect(bounds, { level, tx, ty })) { tiles.push({ level, tx, ty }); }
        }
    }
    const distance = (t: AtlasTile) => ((t.tx + .5) * span - cx) ** 2 + ((t.ty + .5) * span - cy) ** 2;
    return tiles.sort((a, b) => distance(a) - distance(b));
}
/** Texture identity: names, owner and frame never change pixels. */
export function atlasSurfaceKey(feature: AtlasSurfaceSource): string {
    const text = JSON.stringify([feature.role, feature.material, feature.form || '', feature.geometry]);
    return `${feature.id}#${atlasSeed(text).toString(36)}${atlasSeed(`${text}|`).toString(36)}`;
}

// Neighbouring samples share a crown cell; its 3×3 crown randoms are kept until the cell changes.
const crowns = new Float64Array(18);
let crownCell = [NaN, NaN, NaN];
function canopy(x: number, y: number, seed: number): number {
    const spacing = 8, cx = Math.floor(x / spacing), cy = Math.floor(y / spacing);
    if (crownCell[0] !== cx || crownCell[1] !== cy || crownCell[2] !== seed) {
        for (let i = 0; i < 9; i++) { const col = cx - 1 + i % 3, row = cy - 1 + Math.floor(i / 3); crowns[i * 2] = atlasRandom(col, row, seed); crowns[i * 2 + 1] = atlasRandom(col, row, seed + 53); }
        crownCell = [cx, cy, seed];
    }
    let crown = 0;
    for (let row = cy - 1, i = 0; row <= cy + 1; row++) { for (let col = cx - 1; col <= cx + 1; col++, i += 2) {
        const r = crowns[i], s = crowns[i + 1];
        const dx = x - (col + r) * spacing, dy = y - (row + s) * spacing;
        const distance = (dx * dx + dy * dy) / ((3.7 + r * 3.2) ** 2);
        crown = Math.max(crown, Math.max(0, 1 - distance) * (.65 + s * .35));
    } }
    return Math.sqrt(crown);
}

/**
 * Approximate inward distance, only for visual relief; the SVG retains the exact authored footprint.
 * One coarse field per feature keeps tiles consistent; samples near the outline use the exact distance.
 */
interface Envelope { bounds: SpaceBounds; cell: number; width: number; height: number; field: Float32Array; points: SpacePoint[] }
const ENVELOPE_SIDE = 256;
function createEnvelope(points: SpacePoint[], bounds: SpaceBounds): Envelope {
    const cell = Math.max(bounds[2], bounds[3], 2 ** -30) / ENVELOPE_SIDE;
    const width = Math.max(1, Math.ceil(bounds[2] / cell)), height = Math.max(1, Math.ceil(bounds[3] / cell));
    // Outside samples belong in a ghost border, not in the first/last cells.
    const stride = width + 2, field = new Float32Array(stride * (height + 2));
    for (let y = 0; y < height; y++) {
        const py = bounds[1] + (y + .5) * cell, crossings: number[] = [];
        for (let i = 0, j = points.length - 1; i < points.length; j = i++) {
            const a = points[i], b = points[j];
            if ((a[1] > py) !== (b[1] > py)) { crossings.push((a[0] + (py - a[1]) * (b[0] - a[0]) / (b[1] - a[1]) - bounds[0]) / cell); }
        }
        crossings.sort((a, b) => a - b);
        for (let j = 0; j + 1 < crossings.length; j += 2) {
            for (let x = Math.max(0, Math.ceil(crossings[j] - .5)); x < Math.min(width, crossings[j + 1] - .5); x++) {
                field[(y + 1) * stride + x + 1] = Math.min(x + .5 - crossings[j], crossings[j + 1] - x - .5, y + .5, height - y - .5);
            }
        }
    }
    for (let y = 1; y <= height; y++) { for (let x = 1; x <= width; x++) {
        const i = y * stride + x;
        if (field[i]) { field[i] = Math.min(field[i], field[i - 1] + 1, field[i - stride] + 1, field[i - stride - 1] + 1.414, field[i - stride + 1] + 1.414); }
    } }
    for (let y = height; y > 0; y--) { for (let x = width; x > 0; x--) {
        const i = y * stride + x;
        if (field[i]) { field[i] = Math.min(field[i], field[i + 1] + 1, field[i + stride] + 1, field[i + stride + 1] + 1.414, field[i + stride - 1] + 1.414); }
    } }
    return { bounds, cell, width, height, field, points };
}
function insideDistance(points: SpacePoint[], px: number, py: number): number {
    let inside = false, nearest = Infinity;
    for (let i = 0, j = points.length - 1; i < points.length; j = i++) {
        const a = points[i], b = points[j], dx = b[0] - a[0], dy = b[1] - a[1];
        if ((a[1] > py) !== (b[1] > py) && px < a[0] + (py - a[1]) * dx / dy) { inside = !inside; }
        const t = clamp(((px - a[0]) * dx + (py - a[1]) * dy) / (dx * dx + dy * dy || 1));
        nearest = Math.min(nearest, (px - a[0] - dx * t) ** 2 + (py - a[1] - dy * t) ** 2);
    }
    return inside ? Math.sqrt(nearest) : 0;
}
function envelopeAt(e: Envelope, px: number, py: number): number {
    const fx = Math.min(e.width + 1, Math.max(0, (px - e.bounds[0]) / e.cell + .5)), fy = Math.min(e.height + 1, Math.max(0, (py - e.bounds[1]) / e.cell + .5));
    const x = Math.min(e.width, Math.floor(fx)), y = Math.min(e.height, Math.floor(fy)), u = fx - x, v = fy - y, s = e.width + 2, f = e.field, i = y * s + x;
    const coarse = ((f[i] * (1 - u) + f[i + 1] * u) * (1 - v) + (f[i + s] * (1 - u) + f[i + s + 1] * u) * v) * e.cell;
    if (coarse >= e.cell * 2.5) { return coarse; }
    const exact = insideDistance(e.points, px, py);
    return coarse <= e.cell * 1.5 ? exact : exact + (coarse - exact) * (coarse / e.cell - 1.5);
}

type SurfaceKind = 'ridge' | 'dunes' | 'forest' | 'city' | 'water' | 'space' | 'nebula' | 'planet' | 'cloud' | 'metal' | 'plain';
function surfaceKind(feature: AtlasSurfaceSource): SurfaceKind {
    if (feature.form === 'celestial') { return 'planet'; }
    if (feature.form === 'nebula') { return 'nebula'; }
    if (feature.form === 'ridge') { return 'ridge'; }
    if (feature.form === 'dunes') { return 'dunes'; }
    if (feature.form === 'forest' || feature.material === 'forest') { return 'forest'; }
    if (['scattered', 'compact', 'blocks', 'towers'].includes(feature.form || '')) { return 'city'; }
    if (feature.material === 'vacuum') { return 'space'; }
    if (feature.material === 'cloud') { return 'cloud'; }
    if (feature.material === 'water') { return 'water'; }
    if (feature.material === 'metal') { return 'metal'; }
    return 'plain';
}

export interface AtlasPreparedSurface {
    feature: AtlasSurfaceSource; bounds: SpaceBounds; kind: SurfaceKind; seed: number;
    base: number[]; light: number[]; ink: number[]; softEdge: boolean; envelope?: Envelope; banks: SpacePoint[]; reach: number; fade: number;
}
/** Per-feature work shared by all of its tiles. */
export function prepareAtlasSurface(feature: AtlasSurfaceSource): AtlasPreparedSurface {
    const bounds = geometryBounds(feature.geometry), kind = surfaceKind(feature), paint = ATLAS_MATERIALS[feature.material];
    const softEdge = kind === 'ridge' || kind === 'forest' || feature.role === 'environment', closed = geometryClosed(feature.geometry);
    return {
        feature, bounds, kind, seed: atlasSeed(feature.id), base: rgb(paint.base), light: rgb(paint.light), ink: rgb(paint.ink), softEdge,
        envelope: (softEdge || kind === 'water') && closed ? createEnvelope(geometryPoints(feature.geometry), bounds) : undefined,
        banks: kind === 'water' && !closed ? geometryPoints(feature.geometry) : [],
        reach: Math.max(12, Math.min(bounds[2], bounds[3]) * .38), fade: Math.min(18, Math.min(bounds[2], bounds[3]) * .12),
    };
}

// Patterns finer than a texel are area-averaged: city parcels and tree crowns by supersampling,
// noise octaves, dunes and sand by band limiting, and plate seams by their covered fraction.
function subsamples(kind: SurfaceKind, unit: number): number {
    return kind === 'city' ? Math.min(3, Math.ceil(unit / .75)) : kind === 'forest' ? Math.min(3, Math.ceil(unit / 1.5)) : 1;
}
const seam = (value: number, pitch: number, width: number, footprint: number) => Math.abs(value - Math.round(value / pitch) * pitch) < Math.max(width, footprint) / 2 ? Math.min(1, width / footprint) : 0;
const sample = new Float64Array(5);
/** Cartographic shading, not elevation data or new traversable objects. Writes r, g, b, alpha, height into sample. */
function sampleSurface(s: AtlasPreparedSurface, px: number, py: number, footprint: number): void {
    const { feature, kind, seed, bounds } = s;
    // City and planet tones replace the base fractal entirely.
    const n = kind === 'city' || kind === 'planet' ? .5 : atlasFractal(px / 90, py / 90, seed, footprint / 90);
    let h = n, tone = (n - .5) * .4, alpha = 1, shade = 1;
    if (kind === 'ridge') {
        const warp = atlasNoise(px / 130, py / 130, seed) * 2.4;
        const ridge = 1 - Math.abs(atlasFractal(px / 62 + warp, py / 45, seed + 19, footprint / 45) * 2 - 1);
        const envelope = s.envelope ? Math.pow(clamp(envelopeAt(s.envelope, px, py) / s.reach), .65) : 1;
        h = envelope * (.3 + ridge * ridge * .7);
        tone = h * .8 - .2;
    } else if (kind === 'dunes') {
        const bend = atlasFractal(px / 130, py / 130, seed, footprint / 130) * 5;
        const wave = .5 + Math.sin(px / 18 + py / 49 + bend) * .5 * atlasBand(footprint / 113);
        h = Math.pow(wave, .65) * (.65 + n * .35);
        tone = h * .38 - .1;
    } else if (kind === 'forest') {
        const crown = canopy(px, py, seed + 32);
        h = crown * .7 + n * .3;
        tone = (crown - .5) * .6 + (n - .5) * .8;
    } else if (kind === 'city') {
        const pitch = feature.form === 'compact' ? 32 : feature.form === 'towers' ? 38 : 58;
        const col = Math.floor(px / pitch), row = Math.floor(py / pitch), u = px / pitch - col, v = py / pitch - row;
        const r = atlasRandom(col, row, seed), sparse = feature.form === 'scattered' && r > .36;
        const nx = feature.form === 'towers' ? 1 : r < .5 ? 2 : 3, ny = feature.form === 'towers' ? 1 : r < .3 ? 3 : 2;
        const parcelX = Math.floor(u * nx), parcelY = Math.floor(v * ny);
        const a = u * nx - parcelX, b = v * ny - parcelY, parcel = atlasRandom(col * 7 + parcelX, row * 7 + parcelY, seed + 21);
        const gap = .1 + parcel * .09;
        const inside = u > .07 && v > .07 && u < .93 && v < .93;
        const roof = !sparse && inside && a > gap && b > gap && a < .87 && b < .86;
        h = 0;
        tone = roof ? -.06 + parcel * .28 : .6;
        if (!roof && inside && a > gap + .06 && b > gap + .06 && a < .98 && b < .98) { tone = -.32; }
        if (roof) {
            const slope = r < .5 ? a : b;
            tone += slope < .5 ? .08 : -.12;
            if (Math.abs(slope - .5) < .025) { tone += .15; }
            if (parcel > .7 && a > .35 && a < .6 && b > .35 && b < .6) { tone -= .25; }
        }
    } else if (kind === 'water') {
        h = n * .12;
        tone = (n - .5) * .45;
        let distance = s.envelope ? envelopeAt(s.envelope, px, py) : Infinity;
        if (s.banks.length > 1) {
            let nearest = Infinity;
            for (let k = 1; k < s.banks.length; k++) {
                const a = s.banks[k - 1], b = s.banks[k], dx = b[0] - a[0], dy = b[1] - a[1];
                const t = clamp(((px - a[0]) * dx + (py - a[1]) * dy) / (dx * dx + dy * dy || 1));
                nearest = Math.min(nearest, (px - a[0] - dx * t) ** 2 + (py - a[1] - dy * t) ** 2);
            }
            distance = ('width' in feature.geometry ? feature.geometry.width || 1 : 1) / 2 - Math.sqrt(nearest);
        }
        if (feature.role !== 'environment') { tone += .38 * (1 - clamp(distance / 9)) - .1; }
    } else if (kind === 'space') {
        h = 0; tone = (n - .5) * .18;
    } else if (kind === 'nebula') {
        const u = (px - bounds[0]) / Math.max(1, bounds[2]) * 2 - 1, v = (py - bounds[1]) / Math.max(1, bounds[3]) * 2 - 1;
        const plume = atlasFractal(px / 70 + n * 3, py / 100, seed + 42, footprint / 70);
        alpha = clamp(1 - Math.hypot(u, v)) * clamp((plume - .2) * 2.4);
        h = 0; tone = plume * 1.5 - .4;
    } else if (kind === 'planet') {
        const u = (px - bounds[0]) / Math.max(1, bounds[2]) * 2 - 1, v = (py - bounds[1]) / Math.max(1, bounds[3]) * 2 - 1;
        const z = Math.sqrt(Math.max(0, 1 - u * u - v * v));
        shade = .19 + Math.max(0, -u * .48 - v * .52 + z * .67) * .92;
        h = 0; tone = (atlasFractal(px / 17, py / 17, seed, footprint / 17) - .5) * .7;
    } else if (kind === 'cloud') {
        h = n * .3; tone = (n - .4) * .65;
    } else if (kind === 'metal') {
        // Seams are 1.28 and .96 units wide; a coarser texel keeps one seam texel at its covered fraction.
        const cover = Math.max(seam(px, 64, 1.28, footprint), seam(py, 40, .96, footprint));
        h = 0; tone = -.35 * cover + (n - .5) * .14 * (1 - cover);
    } else {
        h = n * .15;
        if (feature.material === 'sand') { tone += (atlasNoise(px / 2, py / 2, seed) - .5) * .1 * atlasBand(footprint / 2); }
        if (feature.material === 'lava' || feature.material === 'rune') { tone += Math.pow(1 - Math.abs(n * 2 - 1), 12) * .8; }
    }
    if (s.softEdge && s.envelope) {
        // The vector mask cuts the exact outline; the fade reaches half a sample outward so a feature
        // narrower than a texel (whose centres may all lie outside it) keeps its material instead of vanishing.
        const fade = clamp((envelopeAt(s.envelope, px, py) + footprint / 2) / Math.max(s.fade, footprint));
        alpha *= fade * fade * (3 - 2 * fade);
    }
    const target = tone >= 0 ? s.light : s.ink, weight = clamp(Math.abs(tone));
    for (let c = 0; c < 3; c++) { sample[c] = (s.base[c] + (target[c] - s.base[c]) * weight) * shade; }
    sample[3] = alpha; sample[4] = h;
}

/** One tile, identical where it overlaps its neighbours: every sample, including hillshade, uses level-grid positions. */
export function renderAtlasTile(s: AtlasPreparedSurface, tile: AtlasTile): AtlasTilePixels | null {
    const rect = atlasTileRect(s.bounds, tile);
    if (!rect) { return null; }
    const [gx, gy, width, height] = rect, unit = 2 ** tile.level, span = width + 2;
    const k = subsamples(s.kind, unit), sub = unit / k;
    // A one-texel apron supplies hillshade neighbours across tile edges.
    const heights = new Float32Array(span * (height + 2)), colors = new Float32Array(width * height * 4);
    for (let y = -1; y <= height; y++) { for (let x = -1; x <= width; x++) {
        const core = x >= 0 && y >= 0 && x < width && y < height;
        let r = 0, g = 0, b = 0, a = 0, h = 0;
        for (let sy = 0; sy < k; sy++) { for (let sx = 0; sx < k; sx++) {
            sampleSurface(s, (gx + x) * unit + (sx + .5) * sub, (gy + y) * unit + (sy + .5) * sub, sub);
            // Colours average premultiplied, so transparent samples do not darken edges.
            r += sample[0] * sample[3]; g += sample[1] * sample[3]; b += sample[2] * sample[3]; a += sample[3]; h += sample[4];
        } }
        heights[(y + 1) * span + x + 1] = h / (k * k);
        if (core) {
            const o = (y * width + x) * 4, alpha = a || 1;
            colors[o] = r / alpha; colors[o + 1] = g / alpha; colors[o + 2] = b / alpha; colors[o + 3] = a / (k * k);
        }
    } }
    const pixels = new Uint8ClampedArray(width * height * 4), grain = Math.max(.5, unit);
    const strength = s.kind === 'ridge' ? 26 : s.kind === 'dunes' ? 18 : s.kind === 'forest' ? 1.8 : 0;
    for (let y = 0; y < height; y++) { for (let x = 0; x < width; x++) {
        const i = (y + 1) * span + x + 1, o = (y * width + x) * 4;
        let light = 1;
        if (strength) {
            const dx = (heights[i + 1] - heights[i - 1]) / (2 * unit) * strength;
            const dy = (heights[i + span] - heights[i - span]) / (2 * unit) * strength;
            const illumination = (.82 + (dx + dy) * .55) / Math.sqrt(1 + dx * dx + dy * dy);
            light = Math.max(.58, Math.min(1.12, .32 + illumination * .82));
        }
        const px = (gx + x + .5) * unit, py = (gy + y + .5) * unit;
        const noise = (atlasRandom(Math.floor(px / grain), Math.floor(py / grain), s.seed) - .5) * (s.kind === 'space' ? 1 : 3);
        for (let c = 0; c < 3; c++) { pixels[o + c] = Math.round(Math.min(255, Math.max(0, colors[o + c] + noise))) * light; }
        pixels[o + 3] = colors[o + 3] * 255;
    } }
    return { rect, pixels };
}
