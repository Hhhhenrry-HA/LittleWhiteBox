import type { PartitionRegistration } from '../../kernel/contracts.js';
import { MAP_DOMAIN_SCHEMA_VERSION, parseMapDomain } from '../../domains/map/invariants.js';
import { readMapPartition } from '../../domains/map/upgrades/read.js';
import { createEmptyMapDomain } from '../../domains/map/state.js';
import type { MapDomain } from '../../domains/map/types.js';
import { MAP_APP_DESCRIPTOR } from './descriptor.js';

export const MAP_PARTITION: PartitionRegistration<MapDomain> = Object.freeze({
    key: 'map',
    ownerId: MAP_APP_DESCRIPTOR.id,
    schemaVersion: MAP_DOMAIN_SCHEMA_VERSION,
    parse(value: unknown) {
        try { return { ok: true as const, value: readMapPartition(value, 'partitions.map') }; }
        catch (error) {
            return {
                ok: false as const,
                error: {
                    code: 'partition_invalid' as const,
                    message: error instanceof Error ? error.message : 'Map partition is invalid',
                },
            };
        }
    },
    serialize: (value: MapDomain) => parseMapDomain(value, 'partitions.map'),
    createInitial: createEmptyMapDomain,
});
