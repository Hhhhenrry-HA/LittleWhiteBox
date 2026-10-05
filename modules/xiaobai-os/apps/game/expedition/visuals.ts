import type { Relic } from './types.js';

export const CAMERA_EIGHTH_TURNS = 1;

/** Presentation only. Combat distances, damage and rewards never depend on this palette. */
export const PALETTES = [
    { sky: '#bfe3e8', haze: '#d2edef', stone: '#dce1cf', light: '#f2f0dc', floor: '#b8c6b1', tile: '#becab6', seam: '#a0b59f', dark: '#214e54', trim: '#c0a477', accent: '#78baa0', foliage: '#39775f', flower: '#e8b995', water: '#82aeb0' },
    { sky: '#bfcfe9', haze: '#dde5f5', stone: '#dce3ed', light: '#f4f1ff', floor: '#abb6cb', tile: '#b2bcd0', seam: '#93a1bb', dark: '#364869', trim: '#c4bcdf', accent: '#9cbeff', foliage: '#626ca0', flower: '#e0b2dd', water: '#88a0bc' },
    { sky: '#f3d8b0', haze: '#fbebd2', stone: '#f0ddba', light: '#fff4da', floor: '#c9bda5', tile: '#cfc3ac', seam: '#b6a88f', dark: '#5a565d', trim: '#c99249', accent: '#ffd481', foliage: '#b87056', flower: '#ffe2a3', water: '#a6b8b0' },
] as const;
export type Palette = typeof PALETTES[number];
export const CLOAK_COLORS = ['#326d9f', '#278c7f', '#7863b4', '#c59248'];
export const RELIC_TINT: Record<Relic, string> = {
    'storm-step': '#428dad', conductor: '#428dad', momentum: '#428dad', orbit: '#428dad',
    cinder: '#b96839', wildfire: '#b96839', 'blood-price': '#ad5261', frost: '#558eaf', shatter: '#558eaf',
    echo: '#8170ac', focus: '#8170ac', hunter: '#a98243', piercing: '#a98243', execution: '#a98243',
    thorns: '#4e8776', aegis: '#4e8776', siphon: '#ad5261', renewal: '#4e8776',
};
