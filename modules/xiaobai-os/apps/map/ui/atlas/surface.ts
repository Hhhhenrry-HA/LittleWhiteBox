import { geometryBounds, geometryClosed, geometryPoints } from '../../../../domains/map/space/geometry.js';
import type { MapFeature, SpaceBounds } from '../../../../domains/map/space/types.js';
import { ATLAS_MATERIALS } from './materials.js';
import { atlasFractal, atlasNoise, atlasRandom, atlasSeed } from './noise.js';

export interface AtlasSurface { bounds: SpaceBounds; width: number; height: number; pixels: Uint8ClampedArray }
const MAX_TEXTURE_SIDE = 768;
export const MAX_ATLAS_TEXTURE_PIXELS = 1_200_000;
const clamp = (value: number) => Math.min(1, Math.max(0, value));
const rgb = (hex: string) => [1, 3, 5].map(i => parseInt(hex.slice(i, i + 2), 16));

function canopy(x: number, y: number, seed: number): number {
    const spacing = 8, cx = Math.floor(x / spacing), cy = Math.floor(y / spacing);
    let crown = 0;
    for (let row = cy - 1; row <= cy + 1; row++) { for (let col = cx - 1; col <= cx + 1; col++) {
        const r = atlasRandom(col, row, seed), s = atlasRandom(col, row, seed + 53);
        const dx = x - (col + r) * spacing, dy = y - (row + s) * spacing;
        const distance = (dx * dx + dy * dy) / ((3.7 + r * 3.2) ** 2);
        crown = Math.max(crown, Math.max(0, 1 - distance) * (.65 + s * .35));
    } }
    return Math.sqrt(crown);
}

export function atlasSurfaceSize(feature: MapFeature, density = 1): [number, number] {
    const [, , width, height] = geometryBounds(feature.geometry);
    const detail = ['ridge', 'forest', 'blocks', 'compact', 'towers', 'scattered', 'celestial'].includes(feature.form || '') || feature.material === 'forest';
    const step = Math.max(detail ? .7 : 1.8, Math.max(width, height) / (detail ? MAX_TEXTURE_SIDE : 384)) * density;
    return [Math.max(2, Math.floor(width / step)), Math.max(2, Math.floor(height / step))];
}
export function atlasTextureDensity(features: MapFeature[]): number {
    const pixels = features.reduce((sum, feature) => { const [w, h] = atlasSurfaceSize(feature); return sum + w * h; }, 0);
    return Math.max(1, Math.sqrt(pixels / MAX_ATLAS_TEXTURE_PIXELS));
}

/** Approximate inward distance, only for visual relief; the SVG retains the exact authored footprint. */
function reliefEnvelope(feature: MapFeature, width: number, height: number, bounds: SpaceBounds): Float32Array {
    // Outside samples belong in a ghost border, not in the first/last authored pixels.
    const stride = width + 2, field = new Float32Array(stride * (height + 2));
    const points = geometryPoints(feature.geometry);
    for (let y = 0; y < height; y++) {
        const py = bounds[1] + (y + .5) / height * bounds[3], crossings: number[] = [];
        for (let i = 0, j = points.length - 1; i < points.length; j = i++) {
            const a = points[i], b = points[j];
            if ((a[1] > py) !== (b[1] > py)) { crossings.push((a[0] + (py - a[1]) * (b[0] - a[0]) / (b[1] - a[1]) - bounds[0]) / bounds[2] * width); }
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
    const result = new Float32Array(width * height);
    for (let y = 0; y < height; y++) { result.set(field.subarray((y + 1) * stride + 1, (y + 1) * stride + width + 1), y * width); }
    return result;
}

type SurfaceKind = 'ridge' | 'dunes' | 'forest' | 'city' | 'water' | 'space' | 'nebula' | 'planet' | 'cloud' | 'metal' | 'plain';
function surfaceKind(feature: MapFeature): SurfaceKind {
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

/** Cartographic shading, not elevation data or new traversable objects. */
export function createAtlasSurface(feature: MapFeature, density = 1): AtlasSurface {
    const bounds = geometryBounds(feature.geometry), [width, height] = atlasSurfaceSize(feature, density);
    const pixels = new Uint8ClampedArray(width * height * 4), heights = new Float32Array(width * height);
    const kind = surfaceKind(feature), seed = atlasSeed(feature.id), paint = ATLAS_MATERIALS[feature.material];
    const base = rgb(paint.base), light = rgb(paint.light), ink = rgb(paint.ink);
    const stepX = bounds[2] / width, stepY = bounds[3] / height;
    const softEdge = kind === 'ridge' || kind === 'forest' || feature.role === 'environment';
    const envelopeField = (softEdge || kind === 'water') && geometryClosed(feature.geometry) ? reliefEnvelope(feature, width, height, bounds) : undefined;
    const banks = kind === 'water' && !geometryClosed(feature.geometry) ? geometryPoints(feature.geometry) : [];
    const reach = Math.max(12, Math.min(bounds[2], bounds[3]) * .38);
    for (let y = 0; y < height; y++) { for (let x = 0; x < width; x++) {
        const px = bounds[0] + (x + .5) * stepX, py = bounds[1] + (y + .5) * stepY, i = y * width + x;
        const n = atlasFractal(px / 90, py / 90, seed);
        let h = n, tone = (n - .5) * .4, alpha = 1, shade = 1;
        if (kind === 'ridge') {
            const warp = atlasNoise(px / 130, py / 130, seed) * 2.4;
            const ridge = 1 - Math.abs(atlasFractal(px / 62 + warp, py / 45, seed + 19) * 2 - 1);
            const envelope = envelopeField ? Math.pow(clamp(envelopeField[i] * Math.min(stepX, stepY) / reach), .65) : 1;
            h = envelope * (.3 + ridge * ridge * .7);
            tone = h * .8 - .2;
        } else if (kind === 'dunes') {
            const bend = atlasFractal(px / 130, py / 130, seed) * 5;
            const wave = (Math.sin(px / 18 + py / 49 + bend) + 1) / 2;
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
            let distance = envelopeField ? envelopeField[i] * Math.min(stepX, stepY) : Infinity;
            if (banks.length > 1) {
                let nearest = Infinity;
                for (let k = 1; k < banks.length; k++) {
                    const a = banks[k - 1], b = banks[k], dx = b[0] - a[0], dy = b[1] - a[1];
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
            const plume = atlasFractal(px / 70 + n * 3, py / 100, seed + 42);
            alpha = clamp(1 - Math.hypot(u, v)) * clamp((plume - .2) * 2.4);
            h = 0; tone = plume * 1.5 - .4;
        } else if (kind === 'planet') {
            const u = (px - bounds[0]) / Math.max(1, bounds[2]) * 2 - 1, v = (py - bounds[1]) / Math.max(1, bounds[3]) * 2 - 1;
            const z = Math.sqrt(Math.max(0, 1 - u * u - v * v));
            shade = .19 + Math.max(0, -u * .48 - v * .52 + z * .67) * .92;
            h = 0; tone = (atlasFractal(px / 17, py / 17, seed) - .5) * .7;
        } else if (kind === 'cloud') {
            h = n * .3; tone = (n - .4) * .65;
        } else if (kind === 'metal') {
            const seam = Math.abs(px / 64 - Math.round(px / 64)) < .01 || Math.abs(py / 40 - Math.round(py / 40)) < .012;
            h = 0; tone = seam ? -.35 : (n - .5) * .14;
        } else {
            h = n * .15;
            if (feature.material === 'sand') { tone += (atlasNoise(px / 2, py / 2, seed) - .5) * .1; }
            if (feature.material === 'lava' || feature.material === 'rune') { tone += Math.pow(1 - Math.abs(n * 2 - 1), 12) * .8; }
        }
        if (softEdge && envelopeField) {
            const fade = clamp(envelopeField[i] * Math.min(stepX, stepY) / Math.min(18, Math.min(bounds[2], bounds[3]) * .12));
            alpha *= fade * fade * (3 - 2 * fade);
        }
        heights[i] = h;
        const target = tone >= 0 ? light : ink, weight = clamp(Math.abs(tone));
        const grain = (atlasRandom(Math.floor(px * 2), Math.floor(py * 2), seed) - .5) * (kind === 'space' ? 1 : 3);
        for (let c = 0; c < 3; c++) { pixels[i * 4 + c] = (base[c] + (target[c] - base[c]) * weight) * shade + grain; }
        pixels[i * 4 + 3] = alpha * 255;
    } }
    const strength = kind === 'ridge' ? 26 : kind === 'dunes' ? 18 : kind === 'forest' ? 1.8 : 0;
    if (strength) { for (let y = 1; y < height - 1; y++) { for (let x = 1; x < width - 1; x++) {
        const i = y * width + x;
        const dx = (heights[i + 1] - heights[i - 1]) / (2 * stepX) * strength;
        const dy = (heights[i + width] - heights[i - width]) / (2 * stepY) * strength;
        const illumination = (.82 + (dx + dy) * .55) / Math.sqrt(1 + dx * dx + dy * dy);
        const shade = Math.max(.58, Math.min(1.12, .32 + illumination * .82));
        for (let c = 0; c < 3; c++) { pixels[i * 4 + c] *= shade; }
    } } }
    return { bounds, width, height, pixels };
}
