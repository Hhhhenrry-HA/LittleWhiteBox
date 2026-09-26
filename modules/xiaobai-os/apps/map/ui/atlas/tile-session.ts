import type { InjectionKey } from 'vue';
import type { XiaobaiOsFrameBridge } from '../../../../shell/app-src/frame-bridge.js';
import { AtlasTileCache, ATLAS_WORKER_COUNT, ATLAS_WORKER_DEPTH } from './tiles.js';
import { ATLAS_TILE_SIZE, ATLAS_TILE_GUTTER } from './surface.js';
import { atlasPngBytes } from './tile-render.js';

export const ATLAS_TILE_BUDGET = 48 * 2 ** 20;
// Decoding happens before cache admission. Reserve space for every in-flight image as well.
const side = ATLAS_TILE_SIZE + 2 * ATLAS_TILE_GUTTER;
const DECODE_RESERVE = ATLAS_WORKER_COUNT * ATLAS_WORKER_DEPTH * (side * side * 4 + atlasPngBytes(side, side));
export interface AtlasTileSession { cache: AtlasTileCache; signal: AbortSignal }
export const ATLAS_TILE_SESSION: InjectionKey<AtlasTileSession> = Symbol('atlas-tiles');
type Bridge = Pick<XiaobaiOsFrameBridge, 'subscribe'>;
const sessions = new WeakMap<Bridge, AtlasTileSession & { identity: string; dispose: () => void }>();

/** One map-owned cache for the current chat in this frame, not one per component mounting. */
export function atlasTileSession(bridge: Bridge, identity: string): AtlasTileSession {
    const previous = sessions.get(bridge);
    if (previous?.identity === identity) { return previous; }
    previous?.dispose();
    const cache = new AtlasTileCache(ATLAS_TILE_BUDGET - DECODE_RESERVE, url => URL.revokeObjectURL(url)), controller = new AbortController();
    const dispose = () => { controller.abort(); cache.clear(); unsubscribe(); sessions.delete(bridge); };
    // Frame reinitialization releases the session even while the map is closed.
    // A chat switch normally destroys the entire frame; a different identity also disposes it above.
    const unsubscribe = bridge.subscribe(message => { if (message.type === 'os/init') { dispose(); } });
    const session = { cache, signal: controller.signal, identity, dispose };
    sessions.set(bridge, session);
    return session;
}
