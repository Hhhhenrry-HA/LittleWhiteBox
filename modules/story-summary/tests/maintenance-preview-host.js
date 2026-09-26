// Browser-only deterministic host fixture. It never calls a model or writes a user chat.
import { maintenanceFixture, joinedEventPatch } from './fixtures/memory-maintenance.js';
import { editMemory } from '../maintenance/domain.js';
import { projectMaintenanceReceipts } from '../maintenance/history.js';
import { isTrustedMessage } from '../../../core/iframe-messaging.js';

const fixture = maintenanceFixture();
const merged = editMemory({ json: fixture.json, atoms: fixture.atoms }, {
    kind: 'merge', collection: 'events', key: 'evt-1', removeIds: ['evt-2'], patch: joinedEventPatch,
}, fixture.cutoff);
const deletedAnchor = editMemory({ json: fixture.json, atoms: fixture.atoms }, {
    kind: 'delete', collection: 'anchors', key: fixture.atoms[0].atomId,
}, fixture.cutoff);
const receipts = Array.from({ length: 12 }, (_, index) => ({
    version: 1, id: `preview-${index}`, cutoff: 24 + index * 20, createdAt: Date.UTC(2026, 8, 26, 9, index), mode: 'manual',
    summary: '跨批次的红山争吵已续接，青山的独立争吵保留。',
    operations: [{ kind: 'merge', collection: 'events', key: 'evt-1', reason: '查阅原文，确认同一场争吵从误会到和解的连续阶段。',
        evidence: [{ floor: 18 }, { floor: 20 }, { floor: 22 }, { floor: 23 }], changes: merged.changes }],
    coverage: { reviewed: [{ collection: 'events', key: 'evt-1', status: 'corrected' }],
        unreviewed: [{ collection: 'facts', key: 'f-3' }], unresolved: [{ collection: 'facts', key: 'f-2', reason: '原文不足以查证更多归属。' }],
        missingAnchors: [{ floor: 18, status: 'missing' }] },
}));
let store = { summaryHistory: [{ endMesId: 243, maintenance: receipts }] };
let config = { memoryMaintenanceEnabled: false };
let state = { status: 'idle' };
let indexState = { status: 'ready' };
const messages = [];
const send = data => document.getElementById('summary').contentWindow.postMessage({ source: 'LittleWhiteBox', ...data }, location.origin);
const results = (offset = 0) => send({ type: 'MEMORY_MAINTENANCE_RESULTS', payload: {
    ...projectMaintenanceReceipts(store, offset), offset, state, index: indexState, chatId: fixture.chatId,
    canReview: state.status !== 'unconfirmed',
} });
window.previewMemory = {
    messages,
    state(status, code) { state = { status, code }; results(); },
    empty() { store = { summaryHistory: [] }; results(); },
    populated() { store = { summaryHistory: [{ endMesId: 243, maintenance: receipts }] }; results(); },
    retired() {
        const receipt = structuredClone(receipts.at(-1));
        receipt.operations.push({ kind: 'delete', collection: 'anchors', key: fixture.atoms[0].atomId,
            reason: '没有原文依据的确定说法。', evidence: [{ floor: 2 }],
            changes: deletedAnchor.changes.map(change => ({ ...change, retired: { reason: 'source_changed', at: Date.now() } })) });
        store = { summaryHistory: [{ endMesId: 243, maintenance: [receipt] }] }; results();
    },
    indexPending() { indexState = { status: 'pending' }; results(); },
};
// eslint-disable-next-line no-restricted-syntax -- isTrustedMessage validates both the preview origin and its only iframe.
window.addEventListener('message', event => {
    if (!isTrustedMessage(event, document.getElementById('summary'))) return;
    const data = event.data;
    messages.push(data);
    if (['FRAME_READY', 'REQUEST_PANEL_CONFIG'].includes(data.type)) {
        send({ type: 'LOAD_PANEL_CONFIG', config });
        send({ type: 'SUMMARY_FULL_DATA', payload: { ...fixture.json, totalFloors: 24, lastSummarizedMesId: 23, chatId: fixture.chatId } });
    }
    if (data.type === 'MEMORY_MAINTENANCE_QUERY') results(data.offset);
    if (data.type === 'MEMORY_MAINTENANCE_REVIEW') { state = { status: 'running' }; results(); }
    if (data.type === 'MEMORY_MAINTENANCE_CANCEL') { state = { status: 'cancelled' }; results(); }
    if (data.type === 'MEMORY_MAINTENANCE_REPAIR') { indexState = { status: 'ready' }; results(); }
    if (data.type === 'SAVE_PANEL_CONFIG') {
        config = data.config;
        send({ type: 'PANEL_CONFIG_SAVE_RESULT', success: true, requestId: data.requestId, config });
    }
});
