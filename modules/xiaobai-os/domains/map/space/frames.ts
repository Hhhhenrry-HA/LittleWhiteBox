import { sha256 } from 'js-sha256';
import type { FrameMapping, MapFrame, SpacePoint } from './types.js';

export const ATLAS_FRAME = 'atlas';
export function mapFrameId(owner?: string | null): string { return owner ? `map:${sha256(owner)}` : ATLAS_FRAME; }
export const IDENTITY_MAPPING: Readonly<FrameMapping> = Object.freeze({ frame: ATLAS_FRAME, scale: 1, offset: [0, 0] as SpacePoint });

export function transformPoint(point: readonly [number, number], mapping: Pick<FrameMapping, 'scale' | 'offset'>): SpacePoint {
    return [point[0] * mapping.scale + mapping.offset[0], point[1] * mapping.scale + mapping.offset[1]];
}

/** No path is different from identity. A viewport never participates in this calculation. */
export function frameTransform(frames: readonly MapFrame[], from: string, to: string): FrameMapping | null {
    return createFrameResolver(frames)(from, to);
}

export function createFrameResolver(frames: readonly MapFrame[]): (from: string, to: string) => FrameMapping | null {
    const byId = new Map(frames.map(frame => [frame.id, frame]));
    const cache = new Map<string, Map<string, FrameMapping>>();
    function ancestry(id: string): Map<string, FrameMapping> {
        if (cache.has(id)) { return cache.get(id)!; }
        const sourceId = id;
        const result = new Map<string, FrameMapping>();
        let scale = 1;
        let offset: SpacePoint = [0, 0];
        while (!result.has(id)) {
            result.set(id, { frame: id, scale, offset });
            const mapping = byId.get(id)?.mapping;
            if (!mapping) { break; }
            offset = transformPoint(offset, mapping);
            scale *= mapping.scale;
            id = mapping.frame;
        }
        cache.set(sourceId, result);
        return result;
    }
    return (from, to) => {
        if (!byId.has(from) || !byId.has(to)) { return null; }
        const source = ancestry(from);
        for (const [id, target] of ancestry(to)) {
            const origin = source.get(id);
            if (origin) {
                const scale = origin.scale / target.scale;
                const offset: SpacePoint = [(origin.offset[0] - target.offset[0]) / target.scale, (origin.offset[1] - target.offset[1]) / target.scale];
                if (![scale, ...offset].every(Number.isFinite) || scale <= 0) { return null; }
                return { frame: to, scale, offset };
            }
        }
        return null;
    };
}
