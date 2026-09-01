import { parseMapDomain } from '../../../domains/map/invariants.js';
import type { MapDomainV1 } from '../../../domains/map/types.js';
import type { XiaobaiOsChatData } from '../../../types.js';

export function emptyMapRoot(): XiaobaiOsChatData {
    return { schemaVersion: 2, apps: {}, domains: {} };
}

export function readMapDomain(root: XiaobaiOsChatData | null): MapDomainV1 | null {
    const value = root?.domains.map;
    return value === undefined ? null : parseMapDomain(value);
}
