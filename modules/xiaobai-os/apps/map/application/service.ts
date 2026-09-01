import { parseMapDomain } from '../../../domains/map/invariants.js';
import { createEmptyMapDomain } from '../../../domains/map/state.js';
import type { MapDomainV1 } from '../../../domains/map/types.js';
import type {
    ConfirmResult,
    AdoptServerResult,
    RootMutationOptions,
    XiaobaiOsChatDataStore,
    XiaobaiOsWriteState,
} from '../../../host/chat-data-store.js';
import { jsonValuesEqual } from '../../../host/json-values-equal.js';
import type { XiaobaiOsChatData } from '../../../types.js';
import { emptyMapRoot, readMapDomain } from './root-protocol.js';

export interface MapServiceView {
    map: MapDomainV1 | null;
    writeState: XiaobaiOsWriteState;
}

export interface MapMutationOptions extends RootMutationOptions {
    expectedRevision: number;
}

export interface MapService {
    readCurrent: () => MapServiceView;
    replaceCurrent: (
        candidate: unknown,
        options: MapMutationOptions,
    ) => Promise<MapServiceView>;
    confirmPending: () => Promise<ConfirmResult>;
    adoptServerState: () => Promise<AdoptServerResult>;
    getWriteState: () => XiaobaiOsWriteState;
}

export class MapRevisionConflictError extends Error {
    readonly code = 'map_revision_conflict' as const;

    constructor() {
        super('map_revision_conflict');
        this.name = 'MapRevisionConflictError';
    }
}

function sameMapContent(left: MapDomainV1, right: MapDomainV1): boolean {
    return jsonValuesEqual(
        { schemaVersion: left.schemaVersion, atlas: left.atlas, scenes: left.scenes },
        { schemaVersion: right.schemaVersion, atlas: right.atlas, scenes: right.scenes },
    );
}

export function createMapService(store: XiaobaiOsChatDataStore): MapService {
    function buildView(root: XiaobaiOsChatData | null): MapServiceView {
        return {
            map: readMapDomain(root),
            writeState: store.getWriteState(),
        };
    }

    function readCurrent(): MapServiceView {
        return buildView(store.readCurrent());
    }

    function assertRevision(current: MapDomainV1 | null, expectedRevision: number): void {
        if ((current?.revision ?? 0) !== expectedRevision) {
            throw new MapRevisionConflictError();
        }
    }

    function commitMap(
        currentRoot: XiaobaiOsChatData | null,
        candidate: MapDomainV1,
    ): { next: XiaobaiOsChatData; result: MapServiceView } {
        const next = currentRoot ? structuredClone(currentRoot) : emptyMapRoot();
        next.domains.map = candidate;
        return { next, result: buildView(next) };
    }

    async function replaceCurrent(
        candidate: unknown,
        { expectedRevision, beforeCommit }: MapMutationOptions,
    ): Promise<MapServiceView> {
        const replacement = parseMapDomain(candidate);
        return store.mutateCurrent((currentRoot) => {
            const current = readMapDomain(currentRoot);
            assertRevision(current, expectedRevision);
            const base = current || createEmptyMapDomain();
            if (sameMapContent(base, replacement)) {
                return { next: currentRoot, result: buildView(currentRoot) };
            }
            const nextMap = parseMapDomain({
                ...replacement,
                revision: base.revision + 1,
            });
            return commitMap(currentRoot, nextMap);
        }, { beforeCommit });
    }

    return Object.freeze({
        readCurrent,
        replaceCurrent,
        confirmPending: store.confirmPending,
        adoptServerState: store.adoptServerState,
        getWriteState: store.getWriteState,
    });
}
