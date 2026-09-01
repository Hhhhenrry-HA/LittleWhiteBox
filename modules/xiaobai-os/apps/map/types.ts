import type { XiaobaiOsWriteState } from '../../host/chat-data-store.js';
import type { MapDomainV1 } from '../../domains/map/types.js';

export interface MapSettings {
    enabled: boolean;
    autoMaintenance: boolean;
}

export type MapClientStatus =
    | 'ready'
    | 'loading'
    | 'saving'
    | 'unconfirmed'
    | 'conflict'
    | 'blocked'
    | 'error';

export type MapMaintenanceStatus = 'idle' | 'maintaining' | 'rebuilding' | 'error';

/** Controller-facing state; only MapSettings and domains.map are persisted. */
export interface MapClientState {
    chatIdentity: string;
    map: MapDomainV1 | null;
    writeState: XiaobaiOsWriteState;
    status: MapClientStatus;
    message: string;
    autoMaintenance: boolean;
    maintenanceStatus?: MapMaintenanceStatus;
    maintenanceMessage?: string;
}
