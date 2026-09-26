import { MEMORY_COLLECTIONS } from './domain.js';
import { MEMORY_PAGE_SIZE, MEMORY_PAGE_CHARS } from './session.js';
import { SOURCE_PAGE_CHARS } from './evidence.js';
import { EVENT_MEMORY_ROLES } from '../data/events.js';
import { RELATION_TRENDS } from '../data/fact-predicates.js';

const string = { type: 'string' };
const integer = { type: 'integer', minimum: 0 };
const strings = { type: 'array', items: string };
const collection = { type: 'string', enum: MEMORY_COLLECTIONS };
const object = (properties, required = []) => ({ type: 'object', properties, required, additionalProperties: false });
const tool = (name, description, properties, required = []) => ({ type: 'function', function: { name, description, parameters: object(properties, required) } });
const reference = { ...strings, description: 'Passage reference IDs returned by ReadSource.' };
const reason = { ...string, description: 'Semantic reason and remaining uncertainty, in the chat’s language.' };

export const MEMORY_TOOLS = [
    tool('ReadMemory', `Read or search the staged memory. Returns items, total and next entry offset. Default ${MEMORY_PAGE_SIZE} records, maximum ${MEMORY_PAGE_CHARS} characters. A long item returns excerpt and nextTextOffset instead of value; read its continuation before editing.`, {
        collection, key: string, query: string, targetsOnly: { type: 'boolean' }, offset: integer,
        limit: { type: 'integer', minimum: 1, maximum: MEMORY_PAGE_SIZE }, textOffset: integer,
    }),
    tool('SearchSource', 'Find literal text within the fixed source boundary. Returns hits with floor, role, name and excerpt, plus next floor or null. Previews are not citeable evidence.', {
        query: string, from: { type: 'integer', minimum: 1 }, limit: { type: 'integer', minimum: 1, maximum: 20, description: 'Default 20.' },
    }, ['query']),
    tool('ReadSource', `Read one original message, up to ${SOURCE_PAGE_CHARS} characters. Returns floor, role, name, text, reference, complete and next {floor,offset} or null. Offset defaults to zero. Use the next cursor for long messages or the following turn.`, {
        floor: { type: 'integer', minimum: 1 }, offset: integer,
    }, ['floor']),
    tool('EditMemory', 'Stage a record edit, deletion or event merge. Returns status staged with changed identities, or unchanged. Merge keeps key, removes removeIds and redirects event causes. Patch contains only changed business fields; deletion omits patch. Record identities and anchor floors are fixed.', {
        kind: { type: 'string', enum: ['edit', 'delete', 'merge'] }, collection, key: string,
        removeIds: { ...strings, description: 'Other event IDs joined into key; required only for merge.' },
        patch: object({
            title: string, timeLabel: string, summary: string, participants: strings, causedBy: strings,
            memoryRole: { type: 'string', enum: EVENT_MEMORY_ROLES },
            s: string, p: string, o: string, since: { ...integer, description: 'Zero-based floor at which the fact applies.' },
            retracted: { type: 'boolean' }, trend: { type: 'string', enum: RELATION_TRENDS }, isState: { type: 'boolean' },
            name: string, trajectory: string, progress: { type: 'number', minimum: 0, maximum: 1 },
            moments: { type: 'array', items: string, description: 'Arc moments in narrative order; existing details should be preserved.' },
            text: string, weight: { type: 'string', enum: ['核心', '重要', '一般'] },
            from: string, to: string, evidence: { ...string, maxLength: 120 },
            semantic: string, where: string,
            edges: { type: 'array', maxItems: 3, items: object({ s: string, t: string, r: string }, ['s', 't', 'r']) },
        }), reason, references: reference,
    }, ['kind', 'collection', 'key', 'reason', 'references']),
    tool('ReviewMemory', 'Record an explicit semantic check without editing. Returns status recorded. Checked requires source references; unresolved may omit references when evidence cannot be located. Reading by itself does not mark coverage.', {
        collection, key: string, status: { type: 'string', enum: ['checked', 'unresolved'] }, reason, references: reference,
    }, ['collection', 'key', 'status', 'reason']),
    tool('FinishReview', 'Finish the staged review. Returns ready, coverage and summary. The host validates sources, memory and persistence; ready is not a claim that changes have been saved.', {
        summary: { ...string, description: 'Concise outcome and unresolved scope in the chat’s language.' },
    }, ['summary']),
];
