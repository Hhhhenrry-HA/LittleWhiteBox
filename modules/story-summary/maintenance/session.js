import { editMemory, memoryRecords, memoryItems, memoryKey, sameMemory } from './domain.js';
import { createEvidenceReader } from './evidence.js';
import { requireMemory } from './errors.js';

export const MEMORY_PAGE_CHARS = 16000;
export const MEMORY_PAGE_SIZE = 16;
const handle = record => `${record.collection}:${record.key}`;

export function projectMemoryRecord(record) {
    const value = structuredClone(record.value);
    if (value && typeof value === 'object') {
        delete value._addedAt;
        delete value.quality;
        delete value.source;
        delete value.atomId;
        delete value.id;
        if (record.collection === 'anchors') value.floor += 1;
        if (Object.hasOwn(value, '_isState')) {
            value.isState = value._isState;
            delete value._isState;
        }
    }
    return { collection: record.collection, key: record.key, value };
}

export function createMemorySession({ chatId, chat, json, atoms, l0Index, cutoff, start = 0, mode = 'manual' }) {
    const baseline = structuredClone({ json: json || {}, atoms: atoms.filter(atom => atom.floor <= cutoff) });
    let memory = structuredClone(baseline);
    const evidence = createEvidenceReader(chat, cutoff);
    const all = memoryRecords(baseline).filter(record => record.collection !== 'anchors' || record.value.floor <= cutoff);
    const targets = all.filter(record => mode === 'manual' || (record.collection === 'anchors'
        ? record.value.floor >= start : (record.value._addedAt ?? 0) >= start || (record.value.since ?? -1) >= start));
    // Updated old records (arcs, facts, aliases) may retain their original creation floor.
    // Auto still inspects their current values; events/anchors are the bounded bulk of memory.
    for (const record of all.filter(record => !['events', 'anchors'].includes(record.collection))) {
        if (!targets.some(target => handle(target) === handle(record))) targets.push(record);
    }
    const reads = new Set();
    const partialReads = new Map();
    const reviews = new Map();
    const operations = [];
    const missingAnchors = evidence.source.filter(record => record.floor - 1 >= start && record.role === 'assistant'
        && !['ok', 'empty'].includes(l0Index?.byFloor?.[String(record.floor - 1)]?.status)
        && !(baseline.atoms.some(atom => atom.floor === record.floor - 1) && !l0Index?.byFloor?.[String(record.floor - 1)]))
        .map(record => ({ floor: record.floor, status: l0Index?.byFloor?.[String(record.floor - 1)]?.status || 'missing' }));
    let finished = false;

    function readMemory({ collection, key, offset = 0, limit = MEMORY_PAGE_SIZE, textOffset = 0, query = '', targetsOnly = false } = {}) {
        requireMemory(Number.isInteger(offset) && offset >= 0 && Number.isInteger(limit) && limit >= 1 && limit <= MEMORY_PAGE_SIZE
            && Number.isInteger(textOffset) && textOffset >= 0 && typeof query === 'string', 'invalid_operation');
        const records = memoryRecords(memory).filter(record => (!collection || record.collection === collection)
            && (!key || record.key === key) && (record.collection !== 'anchors' || record.value.floor <= cutoff)
            && (!query || JSON.stringify(record.value).toLocaleLowerCase().includes(query.toLocaleLowerCase()))
            && (!targetsOnly || targets.some(target => handle(target) === handle(record))));
        let remaining = MEMORY_PAGE_CHARS;
        const items = [];
        for (const record of records.slice(offset, offset + limit)) {
            const projection = projectMemoryRecord(record);
            const serialized = JSON.stringify(projection.value);
            const begin = key ? textOffset : 0;
            if (items.length && serialized.length > remaining) break;
            const end = Math.min(serialized.length, begin + remaining);
            requireMemory(begin <= serialized.length, 'invalid_operation');
            const id = handle(record);
            const previousEnd = partialReads.get(id) || 0;
            if (begin <= previousEnd) partialReads.set(id, Math.max(previousEnd, end));
            if (partialReads.get(id) >= serialized.length) reads.add(id);
            items.push(end < serialized.length || begin > 0
                ? { collection: record.collection, key: record.key, excerpt: serialized.slice(begin, end), nextTextOffset: end < serialized.length ? end : null }
                : projection);
            remaining -= end - begin;
            if (remaining <= 0) break;
        }
        return { items, total: records.length, next: offset + items.length < records.length ? offset + items.length : null };
    }

    function coverage() {
        return {
            reviewed: [...reviews.values()].filter(review => review.status !== 'unresolved'),
            unresolved: [...reviews.values()].filter(review => review.status === 'unresolved'),
            unreviewed: targets.filter(record => !reviews.has(handle(record))).map(({ collection, key }) => ({ collection, key })),
            missingAnchors,
        };
    }

    function runTool(name, args = {}) {
        requireMemory(!finished, 'invalid_operation');
        requireMemory(args && typeof args === 'object' && !Array.isArray(args), 'invalid_operation');
        if (name === 'ReadMemory') return readMemory(args);
        if (name === 'ReadSource') return evidence.read(args);
        if (name === 'SearchSource') return evidence.search(args);
        if (name === 'EditMemory') {
            const { kind, collection, key, patch, removeIds = [], reason, references } = args;
            requireMemory(Array.isArray(removeIds) && removeIds.every(id => typeof id === 'string'), 'invalid_operation');
            requireMemory(typeof reason === 'string' && reason.trim(), 'invalid_operation');
            for (const id of [key, ...removeIds]) requireMemory(reads.has(handle({ collection, key: id })), 'read_first');
            const cited = evidence.evidence(references);
            if (collection === 'anchors') {
                const atom = memoryItems(memory, collection).find(item => memoryKey(collection, item) === key);
                requireMemory(cited.some(item => item.floor === atom?.floor + 1), 'evidence_required');
            }
            const internalPatch = structuredClone(patch);
            if (collection === 'facts' && Object.hasOwn(internalPatch || {}, 'isState')) {
                internalPatch._isState = internalPatch.isState;
                delete internalPatch.isState;
            }
            const result = editMemory(memory, { kind, collection, key, patch: internalPatch, removeIds }, cutoff);
            if (!result.changes.length) return { status: 'unchanged' };
            memory = result.memory;
            operations.push({ kind, collection, key, reason, evidence: cited, changes: result.changes });
            for (const id of [key, ...removeIds]) reviews.set(handle({ collection, key: id }), { collection, key: id, status: 'corrected' });
            return { status: 'staged', changed: result.changes.map(({ collection: group, key: id }) => ({ collection: group, key: id })) };
        }
        if (name === 'ReviewMemory') {
            const { collection, key, status, reason, references } = args;
            requireMemory(reads.has(handle({ collection, key })), 'read_first');
            requireMemory(['checked', 'unresolved'].includes(status) && typeof reason === 'string' && reason.trim(), 'invalid_operation');
            const cited = status === 'checked' ? evidence.evidence(references) : (references?.length ? evidence.evidence(references) : []);
            reviews.set(handle({ collection, key }), { collection, key, status, reason, evidence: cited });
            return { status: 'recorded' };
        }
        if (name === 'FinishReview') {
            requireMemory(typeof args.summary === 'string' && args.summary.trim(), 'incomplete_finish');
            finished = true;
            return { status: 'ready', coverage: coverage(), summary: args.summary };
        }
        requireMemory(false, 'invalid_operation');
    }

    return {
        chatId, cutoff, start, mode, baseline, evidence,
        get memory() { return structuredClone(memory); },
        get operations() { return structuredClone(operations); },
        get finished() { return finished; },
        coverage, runTool,
        initial() {
            return { chatId, cutoff: cutoff + 1, start: start + 1, mode,
                targetCount: targets.length, targets: targets.slice(0, MEMORY_PAGE_SIZE).map(({ collection, key }) => ({ collection, key })),
                missingAnchorCount: missingAnchors.length, missingAnchors: missingAnchors.slice(0, MEMORY_PAGE_SIZE), memory: readMemory({ targetsOnly: true }) };
        },
        assertCurrent({ chatId: currentId, chat: currentChat, json: currentJson, atoms: currentAtoms, cutoff: currentCutoff }) {
            requireMemory(currentId === chatId && currentCutoff === cutoff && sameMemory(currentJson || {}, baseline.json), 'conflict');
            // New L0 extraction may append records; existing anchors must still match, and are never overwritten wholesale.
            for (const atom of baseline.atoms) requireMemory(sameMemory(atom, currentAtoms.find(item => item.atomId === atom.atomId)), 'conflict');
            evidence.assertCurrent(currentChat);
        },
    };
}
