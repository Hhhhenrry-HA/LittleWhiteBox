// Browser-only deterministic host fixture. It never calls a model or writes a user chat.
import { maintenanceFixture, joinedEventPatch } from './fixtures/memory-maintenance.js';
import { editMemory } from '../maintenance/domain.js';
import { projectMaintenanceReceipts } from '../maintenance/history.js';
import { presentMaintenanceReceipt } from '../maintenance/presentation.js';
import { readMaintenanceSource } from '../maintenance/source-view.js';
import { isTrustedMessage } from '../../../core/iframe-messaging.js';
import { maintenanceRanges } from '../maintenance/ranges.js';

const fixture = maintenanceFixture();
const merged = editMemory({ json: fixture.json, atoms: fixture.atoms }, {
    kind: 'merge', collection: 'events', key: 'evt-1', removeIds: ['evt-2'], patch: joinedEventPatch,
}, fixture.cutoff);
const deletedAnchor = editMemory({ json: fixture.json, atoms: fixture.atoms }, {
    kind: 'delete', collection: 'anchors', key: fixture.atoms[0].atomId,
}, fixture.cutoff);
const factCorrection = editMemory({ json: fixture.json, atoms: fixture.atoms }, {
    kind: 'edit', collection: 'facts', key: 'f-1', patch: { p: '关于回收原因的猜测', o: '夏实听说可能与看到机密有关，尚未确证' },
}, fixture.cutoff);
const anchorCorrection = editMemory({ json: fixture.json, atoms: fixture.atoms }, {
    kind: 'edit', collection: 'anchors', key: fixture.atoms[0].atomId,
    patch: { semantic: '夏实听说自己可能因为看到机密而被回收，但没有确证。', edges: [] },
}, fixture.cutoff);
const receipts = Array.from({ length: 24 }, (_, index) => ({
    version: 2, id: `preview-${index}`, runId: `preview-run-${Math.floor(index / 2)}`, cutoff: 24, createdAt: Date.UTC(2026, 8, 26, 9, index),
    summary: '跨批次的红山争吵已续接，青山的独立争吵保留。',
    operations: index % 2 ? [] : [{ kind: 'merge', collection: 'events', key: 'evt-1', changes: merged.changes }],
    outcome: index % 2 ? { status: 'completed' } : undefined,
    coverage: { supplied: [{ floor: 18, start: 0, end: 10, view: 'story' }],
        missingAnchors: [{ floor: 18, status: 'missing' }] },
}));
receipts.at(-1).operations.push({ kind: 'edit', collection: 'facts', key: 'f-1', changes: factCorrection.changes },
{ kind: 'edit', collection: 'anchors', key: fixture.atoms[0].atomId, changes: anchorCorrection.changes });
let store = { summaryHistory: [{ endMesId: 23, maintenance: receipts }] };
let config = { memoryMaintenanceEnabled: false };
let state = { status: 'idle' };
let indexState = { status: 'ready' };
const messages = [];
const send = data => document.getElementById('summary').contentWindow.postMessage({ source: 'LittleWhiteBox', ...data }, location.origin);
const results = (offset = 0) => {
    const page = projectMaintenanceReceipts(store, offset);
    page.items = page.items.map(receipt => presentMaintenanceReceipt(receipt, fixture));
    send({ type: 'MEMORY_MAINTENANCE_RESULTS', payload: { ...page, offset, state, index: indexState, chatId: fixture.chatId,
        ranges: maintenanceRanges(store.summaryHistory, fixture.cutoff) } });
};
window.previewMemory = {
    messages,
    state(status, code) { state = { status, code, progress: { action: 'reading', saved: 2 } }; results(); },
    compacting() { state = { status: 'running', progress: { action: 'compacting', saved: 2 } }; results(); },
    partial() {
        const completion = { ...structuredClone(receipts.at(-1)), id: 'preview-completion', operations: [],
            outcome: undefined, summary: '', completion: { from: 1, to: 20 } };
        const outcome = { ...structuredClone(receipts.at(-1)), outcome: { status: 'partial' } };
        store = { summaryHistory: [{ endMesId: 23, maintenance: [completion, outcome] }] }; state = { status: 'partial' }; results();
    },
    empty() { store = { summaryHistory: [] }; results(); },
    noChanges() {
        const receipt = structuredClone(receipts.at(-1));
        receipt.operations = []; receipt.summary = '本次没有可确认的错误。';
        store = { summaryHistory: [{ endMesId: 23, maintenance: [receipt] }] }; results();
    },
    longSource() { fixture.chat[17].mes = fixture.chat[17].mes.repeat(600); },
    populated() { store = { summaryHistory: [{ endMesId: 243, maintenance: receipts }] }; results(); },
    retired() {
        const receipt = structuredClone(receipts.at(-1));
        receipt.operations.push({ kind: 'delete', collection: 'anchors', key: fixture.atoms[0].atomId,
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
    if (data.type === 'MEMORY_MAINTENANCE_SOURCE') send({ type: 'MEMORY_MAINTENANCE_SOURCE_RESULT', payload: readMaintenanceSource({ ...fixture, store }, data) });
    if (data.type === 'MEMORY_MAINTENANCE_CANCEL') { state = { status: 'cancelled' }; results(); }
    if (data.type === 'MEMORY_MAINTENANCE_REPAIR') { indexState = { status: 'ready' }; results(); }
    if (data.type === 'SAVE_PANEL_CONFIG') {
        config = data.config;
        send({ type: 'PANEL_CONFIG_SAVE_RESULT', success: true, requestId: data.requestId, config });
    }
});
