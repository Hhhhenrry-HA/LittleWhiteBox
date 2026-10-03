import { packageError } from './package/messages.js';
import { resolvePackageSources } from './package/sources.js';

// The automatic check needs identities and input digests, not embedding arrays.
// Export projects through the same boundary before attaching its binary payload.
export function vectorSourceRecord(record) {
    return {
        chunkId: record.chunkId, atomId: record.atomId, eventId: record.eventId,
        floor: record.floor, fingerprint: record.fingerprint, dims: record.dims,
        sourceHash: record.sourceHash, relationHash: record.relationHash,
        hasRelationVector: Boolean(record.rVector),
    };
}

function storedSource(record, fingerprint, layer) {
    if (record.fingerprint !== fingerprint) throw packageError('invalid_package', { field: 'fingerprint' });
    if (!record.sourceHash) throw packageError('incomplete_cache', { reason: 'missing_source_hash', layer });
    return { sourceHash: record.sourceHash };
}

function buildStoredSourceManifest(cache, { chatId, sources }) {
    const first = cache.chunkVectors[0] || cache.stateVectors[0] || cache.eventVectors[0];
    const fingerprint = first?.fingerprint;
    // Check materials without vectors too. A missing pair must not hide a
    // different stored input that ordinary gap repair would reuse unchanged.
    for (const chunk of cache.chunks) {
        const current = sources.chunks.get(chunk.chunkId)?.chunk;
        if (!current || chunk.text !== current.text || chunk.floor !== current.floor || chunk.chunkIdx !== current.chunkIdx) {
            throw packageError('incomplete_cache', { reason: 'l1_content_mismatch', floor: chunk.floor });
        }
    }
    const data = {
        chatId, fingerprint, dims: first?.dims,
        chunks: cache.chunkVectors.map(record => {
            const chunk = sources.chunks.get(record.chunkId)?.chunk;
            if (!chunk) throw packageError('source_mismatch', { kind: 'chunk', id: record.chunkId });
            return { id: record.chunkId, floor: chunk.floor, index: chunk.chunkIdx, ...storedSource(record, fingerprint, 'l1') };
        }),
        states: cache.stateVectors.map(record => {
            if (record.hasRelationVector && !record.relationHash) throw packageError('incomplete_cache', { reason: 'missing_relation_hash', floor: record.floor });
            return {
                id: record.atomId, floor: record.floor, ...storedSource(record, fingerprint, 'l0'),
                relationHash: record.hasRelationVector ? record.relationHash : null,
            };
        }),
        events: cache.eventVectors.map(record => ({ id: record.eventId, ...storedSource(record, fingerprint, 'l2') })),
        warningCodes: [],
    };
    resolvePackageSources(data, sources);
    return data;
}

// Export still requires each stored vector to have its material. It may export
// a partial chat, but cannot ship an internally unpaired cache.
export function buildCacheSourceManifest(cache, operation) {
    if (!cache.chunkVectors.length && !cache.stateVectors.length && !cache.eventVectors.length) throw packageError('empty_cache');
    const cachedIds = new Set(cache.chunks.map(chunk => chunk.chunkId));
    if (cachedIds.size !== cache.chunkVectors.length) throw packageError('incomplete_cache', { reason: 'l1_count_mismatch' });
    if (cache.chunkVectors.some(record => !cachedIds.has(record.chunkId))) {
        throw packageError('incomplete_cache', { reason: 'l1_content_mismatch' });
    }
    return buildStoredSourceManifest(cache, operation);
}

// Daily maintenance distinguishes recoverable missing pairs from stale inputs.
// Verify every remaining input first, then count unique incomplete floors,
// including holes behind an otherwise complete progress watermark.
export function inspectCacheSourceCoverage(cache, operation) {
    buildStoredSourceManifest(cache, operation);
    const cachedIds = new Set(cache.chunks.map(chunk => chunk.chunkId));
    const vectorIds = new Set(cache.chunkVectors.map(record => record.chunkId));
    const missingFloors = new Set();
    for (const [id, source] of operation.sources.chunks) {
        if (!cachedIds.has(id) || !vectorIds.has(id)) missingFloors.add(source.chunk.floor);
    }
    return { missingChunkFloors: [...missingFloors].sort((a, b) => a - b) };
}

export function isCacheConsistencyFailure(error) {
    return ['incomplete_cache', 'source_mismatch', 'invalid_package'].includes(error?.code);
}
