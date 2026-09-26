/** Stable source-coordinate fields. Camera, theme and region never enter these functions. */
export function atlasSeed(value: string): number {
    let seed = 2166136261;
    for (let i = 0; i < value.length; i++) { seed = Math.imul(seed ^ value.charCodeAt(i), 16777619); }
    return seed >>> 0;
}
export function atlasRandom(x: number, y: number, seed: number): number {
    let n = Math.imul(x, 374761393) + Math.imul(y, 668265263) + seed;
    n = Math.imul(n ^ (n >>> 13), 1274126177);
    return ((n ^ (n >>> 16)) >>> 0) / 4294967295;
}
export function atlasNoise(x: number, y: number, seed: number): number {
    const ix = Math.floor(x), iy = Math.floor(y), fx = x - ix, fy = y - iy;
    const u = fx * fx * (3 - 2 * fx), v = fy * fy * (3 - 2 * fy);
    const a = atlasRandom(ix, iy, seed), b = atlasRandom(ix + 1, iy, seed);
    const c = atlasRandom(ix, iy + 1, seed), d = atlasRandom(ix + 1, iy + 1, seed);
    return a + (b - a) * u + (c - a) * v + (a - b - c + d) * u * v;
}
/** Fraction of a component kept at this sample spacing: full at four samples per period, gone at Nyquist. */
export function atlasBand(footprintPerPeriod: number): number { return Math.min(1, Math.max(0, 2 - 4 * footprintPerPeriod)); }
/** footprint is the sample spacing in noise units; octaves it cannot resolve settle to their mean instead of aliasing. */
export function atlasFractal(x: number, y: number, seed: number, footprint = 0): number {
    return .5 + octave(x, y, seed, footprint, 1, .55, 0) + octave(x, y, seed, footprint, 2.07, .27, 71)
        + octave(x, y, seed, footprint, 4.13, .13, 137) + octave(x, y, seed, footprint, 8.23, .05, 211);
}
// A module function rather than a per-call closure: the fractal runs for every texel sample.
function octave(x: number, y: number, seed: number, footprint: number, frequency: number, weight: number, offset: number): number {
    const band = atlasBand(frequency * footprint);
    return band ? (atlasNoise(x * frequency, y * frequency, seed + offset) - .5) * weight * band : 0;
}
