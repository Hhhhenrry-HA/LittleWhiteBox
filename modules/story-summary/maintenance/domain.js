import { EVENT_MEMORY_ROLES } from '../data/events.js';
import { calcAtomQuality } from '../vector/llm/atom-quality.js';
import { RELATION_TRENDS } from '../data/fact-predicates.js';
import { normalizeCharacterAliases, validateAliasGraph } from '../data/character-aliases.js';
import { requireMemory } from './errors.js';

export const MEMORY_COLLECTIONS = Object.freeze(['events', 'facts', 'characters', 'arcs', 'keywords', 'characterAliases', 'anchors']);
const fields = {
    events: ['title', 'timeLabel', 'summary', 'participants', 'causedBy', 'memoryRole'],
    facts: ['s', 'p', 'o', 'since', 'retracted', 'trend', '_isState'],
    characters: ['name'],
    arcs: ['name', 'trajectory', 'progress', 'moments'],
    keywords: ['text', 'weight'],
    characterAliases: ['from', 'to', 'evidence'],
    anchors: ['semantic', 'edges', 'where'],
};
// Memory is JSON: object key order is not content; array order and field presence are.
export function sameMemory(a, b) {
    if (a === b) return true;
    if (a == null || b == null || typeof a !== 'object' || typeof b !== 'object') return false;
    if (Array.isArray(a) !== Array.isArray(b)) return false;
    if (Array.isArray(a)) return a.length === b.length && a.every((item, index) => sameMemory(item, b[index]));
    const keys = Object.keys(a);
    return keys.length === Object.keys(b).length && keys.every(key => Object.hasOwn(b, key) && sameMemory(a[key], b[key]));
}
const text = value => typeof value === 'string' && !!value.trim();
const texts = value => Array.isArray(value) && value.every(text);

export function memoryItems(memory, collection) {
    requireMemory(MEMORY_COLLECTIONS.includes(collection), 'invalid_operation');
    if (collection === 'anchors') return memory.atoms;
    if (collection === 'characters') return memory.json.characters?.main || [];
    return memory.json[collection] || [];
}

function setItems(memory, collection, items) {
    if (collection === 'anchors') memory.atoms = items;
    else if (collection === 'characters') {
        memory.json.characters ||= {};
        memory.json.characters.main = items;
    } else memory.json[collection] = items;
}

export function memoryKey(collection, item) {
    if (collection === 'anchors') return item.atomId;
    if (collection === 'events' || collection === 'facts') return item.id;
    if (collection === 'keywords') return item.text;
    if (collection === 'characterAliases') return item.from;
    return typeof item === 'string' ? item : item.name;
}

export function memoryRecords(memory) {
    return MEMORY_COLLECTIONS.flatMap(collection => memoryItems(memory, collection)
        .map(item => ({ collection, key: memoryKey(collection, item), value: structuredClone(item) })));
}

export function validateRecord(collection, value, cutoff) {
    requireMemory(value && typeof value === 'object' && !Array.isArray(value), 'invalid_record');
    if (collection === 'events') {
        const ranges = [...String(value.summary || '').matchAll(/\(#(\d+)(?:-(\d+))?\)/gu)];
        requireMemory(text(value.id) && text(value.title) && text(value.summary)
            && texts(value.participants) && texts(value.causedBy) && EVENT_MEMORY_ROLES.includes(value.memoryRole), 'invalid_record');
        requireMemory(ranges.length > 0 && ranges.every(match => Number(match[1]) >= 1
            && Number(match[2] || match[1]) >= Number(match[1]) && Number(match[2] || match[1]) <= cutoff + 1), 'source_boundary');
    } else if (collection === 'facts') {
        requireMemory(['id', 's', 'p', 'o'].every(field => text(value[field])), 'invalid_record');
        requireMemory(value.since == null || (Number.isInteger(value.since) && value.since >= 0 && value.since <= cutoff), 'source_boundary');
        requireMemory(value.retracted == null || typeof value.retracted === 'boolean', 'invalid_record');
        requireMemory(value.trend == null || RELATION_TRENDS.includes(value.trend), 'invalid_record');
        requireMemory(value._isState == null || typeof value._isState === 'boolean', 'invalid_record');
    } else if (collection === 'anchors') {
        requireMemory(text(value.semantic) && typeof value.where === 'string' && Array.isArray(value.edges)
            && value.edges.length <= 3 && value.edges.every(edge => ['s', 't', 'r'].every(field => text(edge[field]))
                && Object.keys(edge).every(field => ['s', 't', 'r'].includes(field))), 'invalid_record');
        requireMemory(Number.isInteger(value.floor) && value.floor >= 0 && value.floor <= cutoff, 'source_boundary');
    } else if (collection === 'characters') {
        requireMemory(text(value.name), 'invalid_record');
    } else if (collection === 'arcs') {
        requireMemory(text(value.name) && text(value.trajectory) && Number.isFinite(value.progress)
            && value.progress >= 0 && value.progress <= 1 && Array.isArray(value.moments)
            && value.moments.every(moment => typeof moment === 'string' || text(moment?.text)), 'invalid_record');
    } else if (collection === 'keywords') {
        requireMemory(text(value.text) && ['核心', '重要', '一般'].includes(value.weight), 'invalid_record');
    } else if (collection === 'characterAliases') {
        requireMemory(text(value.from) && text(value.to) && value.from !== value.to
            && typeof value.evidence === 'string' && value.evidence.length <= 120, 'invalid_record');
    }
}

function validateReferences(events) {
    const byId = new Map(events.map(event => [event.id, event]));
    requireMemory(byId.size === events.length, 'invalid_reference');
    const visiting = new Set();
    const done = new Set();
    function visit(id) {
        if (done.has(id)) return;
        requireMemory(!visiting.has(id), 'invalid_reference');
        visiting.add(id);
        const causes = byId.get(id)?.causedBy || [];
        requireMemory(causes.length <= 3, 'cause_limit');
        requireMemory(new Set(causes).size === causes.length, 'invalid_reference');
        for (const cause of causes) {
            requireMemory(cause !== id && byId.has(cause), 'invalid_reference');
            visit(cause);
        }
        visiting.delete(id);
        done.add(id);
    }
    for (const id of byId.keys()) visit(id);
}

function changesBetween(before, after) {
    return MEMORY_COLLECTIONS.flatMap(collection => {
        const previous = memoryItems(before, collection);
        const next = memoryItems(after, collection);
        const keys = new Set([...previous, ...next].map(item => memoryKey(collection, item)));
        return [...keys].flatMap(key => {
            const index = previous.findIndex(item => memoryKey(collection, item) === key);
            const a = previous[index] ?? null;
            const b = next.find(item => memoryKey(collection, item) === key) ?? null;
            return sameMemory(a, b) ? [] : [{ collection, key, index, before: structuredClone(a), after: structuredClone(b) }];
        });
    });
}

/** A command is atomic in memory; receipts own the exact reversible changes. */
export function editMemory(memory, command, cutoff) {
    const draft = structuredClone(memory);
    const { kind, collection, key, patch, removeIds = [] } = command;
    const items = memoryItems(draft, collection);
    const index = items.findIndex(item => memoryKey(collection, item) === key);
    requireMemory(index >= 0, 'record_missing');
    requireMemory(['edit', 'delete', 'merge'].includes(kind), 'invalid_operation');
    if (kind === 'delete') {
        items.splice(index, 1);
        setItems(draft, collection, items);
    } else {
        requireMemory(patch && typeof patch === 'object' && !Array.isArray(patch)
            && Object.keys(patch).every(field => fields[collection].includes(field)), 'invalid_operation');
        const before = items[index];
        let value = { ...(typeof before === 'string' ? { name: before } : before), ...structuredClone(patch) };
        if (collection === 'characterAliases') value = normalizeCharacterAliases([value])[0];
        if (collection === 'anchors') value.quality = calcAtomQuality(value.semantic, value.edges, value.where);
        if (collection === 'arcs' && Object.hasOwn(patch, 'moments')) {
            requireMemory(texts(patch.moments), 'invalid_record');
            value.moments = patch.moments.map(moment => {
                const existing = (before.moments || []).find(item => (typeof item === 'string' ? item : item.text) === moment);
                return existing ?? { text: moment, _addedAt: cutoff };
            });
        }
        if (kind === 'merge') {
            requireMemory(collection === 'events' && removeIds.length > 0 && !removeIds.includes(key)
                && new Set(removeIds).size === removeIds.length, 'invalid_operation');
            for (const id of removeIds) {
                const removed = items.find(item => item.id === id);
                requireMemory(removed, 'record_missing');
                requireMemory((before._addedAt ?? 0) <= (removed._addedAt ?? 0), 'keep_oldest');
                if (before._addedAt === removed._addedAt) requireMemory(index < items.indexOf(removed), 'keep_oldest');
            }
            // Causes are unioned; the model must resolve excessive causes explicitly before a merge.
            value.causedBy = [...new Set([...(value.causedBy || []), ...items.filter(item => removeIds.includes(item.id)).flatMap(item => item.causedBy || [])])]
                .filter(id => id !== key && !removeIds.includes(id));
        }
        validateRecord(collection, value, cutoff);
        items[index] = value;
        setItems(draft, collection, items);
        if (kind === 'merge') {
            draft.json.events = items.filter(item => !removeIds.includes(item.id)).map(event => ({
                ...event,
                causedBy: [...new Set((event.causedBy || []).map(id => removeIds.includes(id) ? key : id))].filter(id => id !== event.id),
            }));
        }
    }
    for (const name of MEMORY_COLLECTIONS) {
        const keys = memoryItems(draft, name).map(item => memoryKey(name, item));
        requireMemory(keys.every(text) && new Set(keys).size === keys.length, 'invalid_record');
    }
    validateReferences(draft.json.events || []);
    try { validateAliasGraph(draft.json.characterAliases || []); }
    catch { requireMemory(false, 'invalid_alias'); }
    return { memory: draft, changes: changesBetween(memory, draft) };
}

export function activeMaintenanceChanges(operations) {
    return operations.flatMap(operation => operation.changes).filter(change => !change.retired);
}

export function maintenanceImpact(operations) {
    const changes = activeMaintenanceChanges(operations);
    return {
        eventIds: [...new Set(changes.filter(change => change.collection === 'events').map(change => change.key))],
        atomIds: [...new Set(changes.filter(change => change.collection === 'anchors').map(change => change.key))],
        floors: [...new Set(changes.filter(change => change.collection === 'anchors').flatMap(change => [change.before?.floor, change.after?.floor]).filter(Number.isInteger))],
        summary: changes.some(change => change.collection !== 'anchors'),
    };
}

export function restoreMaintenance(memory, receipts) {
    const draft = structuredClone(memory);
    for (const receipt of [...receipts].reverse()) {
        for (const operation of [...receipt.operations].reverse()) {
            const groups = new Map();
            for (const change of activeMaintenanceChanges([operation])) {
                const items = memoryItems(draft, change.collection);
                const found = items.find(item => memoryKey(change.collection, item) === change.key) ?? null;
                requireMemory(sameMemory(found, change.after), 'conflict');
                if (!groups.has(change.collection)) groups.set(change.collection, []);
                groups.get(change.collection).push(change);
            }
            for (const [collection, changes] of groups) {
                const keys = new Set(changes.map(change => change.key));
                const restored = memoryItems(draft, collection).filter(item => !keys.has(memoryKey(collection, item)));
                for (const change of changes.filter(change => change.before !== null).sort((a, b) => a.index - b.index)) {
                    restored.splice(change.index, 0, structuredClone(change.before));
                }
                setItems(draft, collection, restored);
            }
        }
    }
    return draft;
}
