import type { MapMaterial } from '../types.js';

export type SpacePoint = [number, number];
export type SpaceBounds = [number, number, number, number];
export interface MapPosition { frame: string; at: SpacePoint }
export interface FrameMapping { frame: string; scale: number; offset: SpacePoint }
export interface MapFrame { id: string; owner?: string; mapping?: FrameMapping; boundary?: string }
export type SpaceGeometry =
    | { shape: 'rect'; x: number; y: number; width: number; height: number }
    | { shape: 'circle'; x: number; y: number; radius: number }
    | { shape: 'point'; x: number; y: number }
    | { shape: 'path' | 'curve'; points: SpacePoint[]; closed?: boolean; width?: number };
export const SPACE_ROLES = ['environment', 'surface', 'cover', 'relief', 'structure', 'channel', 'landmark', 'zone', 'boundary'] as const;
export const SPACE_FORMS = ['plain', 'forest', 'ridge', 'dunes', 'scattered', 'compact', 'blocks', 'towers', 'celestial', 'asteroids', 'nebula'] as const;
export const SPACE_EXTRA_MATERIALS = ['vacuum', 'rock', 'ice', 'cloud', 'lava'] as const;
export type SpaceMaterial = MapMaterial | typeof SPACE_EXTRA_MATERIALS[number];
export interface MapFeature {
    id: string;
    owner?: string;
    frame: string;
    role: typeof SPACE_ROLES[number];
    material: SpaceMaterial;
    geometry: SpaceGeometry;
    name?: string;
    form?: typeof SPACE_FORMS[number];
    destination?: string;
    support?: string;
    crosses?: string[];
}

export const MAX_MAP_FRAMES = 513;
export const MAX_MAP_FEATURES = 256;
export const MAX_SPACE_DETAILS = 192;
export const SPACE_CURVE_STEPS = 8;
