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
export function atlasFractal(x: number, y: number, seed: number): number {
    return atlasNoise(x, y, seed) * .55 + atlasNoise(x * 2.07, y * 2.07, seed + 71) * .27
        + atlasNoise(x * 4.13, y * 4.13, seed + 137) * .13 + atlasNoise(x * 8.23, y * 8.23, seed + 211) * .05;
}
