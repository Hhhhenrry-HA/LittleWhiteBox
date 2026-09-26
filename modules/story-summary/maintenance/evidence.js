import { requireMemory } from './errors.js';
import { sameMemory } from './domain.js';

export const SOURCE_PAGE_CHARS = 10000;
const sourceRecord = (message, index) => ({
    floor: index + 1, name: String(message?.name || ''),
    role: message?.is_user ? 'user' : message?.is_system ? 'system' : 'assistant',
    text: String(message?.mes || ''), swipe: message?.swipe_id ?? null,
});

/** Snapshot belongs to one run. Receipts contain passage references, not raw chat copies. */
export function createEvidenceReader(chat, cutoff) {
    requireMemory(Number.isInteger(cutoff) && cutoff >= 0 && cutoff < chat.length, 'source_boundary');
    const snapshot = chat.slice(0, cutoff + 1).map(sourceRecord);
    const read = new Map();
    const searched = new Set();
    return {
        cutoff,
        source: snapshot,
        read({ floor, offset = 0 } = {}) {
            requireMemory(Number.isInteger(floor) && floor >= 1 && floor <= cutoff + 1
                && Number.isInteger(offset) && offset >= 0, 'source_boundary');
            const record = snapshot[floor - 1];
            requireMemory(offset <= record.text.length, 'source_boundary');
            const end = Math.min(record.text.length, offset + SOURCE_PAGE_CHARS);
            const reference = `${floor}:${offset}:${end}`;
            read.set(reference, { floor, start: offset, end });
            return {
                floor, name: record.name, role: record.role, reference,
                text: record.text.slice(offset, end),
                next: end < record.text.length ? { floor, offset: end } : floor < cutoff + 1 ? { floor: floor + 1, offset: 0 } : null,
                complete: end === record.text.length,
            };
        },
        search({ query, from = 1, limit = 20 } = {}) {
            requireMemory(typeof query === 'string' && query.trim() && Number.isInteger(from)
                && from >= 1 && from <= cutoff + 1 && Number.isInteger(limit) && limit >= 1 && limit <= 20, 'invalid_operation');
            const hits = [];
            let floor = from;
            for (; floor <= cutoff + 1; floor++) {
                searched.add(floor);
                const record = snapshot[floor - 1];
                const at = record.text.toLocaleLowerCase().indexOf(query.toLocaleLowerCase());
                if (at >= 0) hits.push({ floor, name: record.name, role: record.role, excerpt: record.text.slice(Math.max(0, at - 80), at + 240) });
                if (hits.length >= limit) { floor++; break; }
            }
            return { hits, next: floor <= cutoff + 1 ? floor : null };
        },
        evidence(references) {
            requireMemory(Array.isArray(references) && references.length > 0 && references.every(reference => read.has(reference)), 'evidence_required');
            return [...new Set(references)].map(reference => ({ reference, ...read.get(reference) }));
        },
        assertCurrent(currentChat) {
            // Search absence and previews also informed decisions, so guard their scanned range.
            const floors = new Set([...searched, ...[...read.values()].map(item => item.floor)]);
            for (const floor of floors) requireMemory(sameMemory(snapshot[floor - 1], sourceRecord(currentChat[floor - 1], floor - 1)), 'conflict');
        },
    };
}
