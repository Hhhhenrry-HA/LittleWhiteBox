import { MEMORY_COPY as copy } from './copy.js';

const element = (tag, className, text) => {
    const node = document.createElement(tag);
    if (className) node.className = className;
    if (text != null) node.textContent = text;
    return node;
};

export function createMemoryMaintenancePage(root, send) {
    const authorization = element('label', 'memory-authorization');
    const toggle = element('input');
    toggle.type = 'checkbox';
    toggle.id = 'memory-maintenance-enabled';
    authorization.append(toggle, element('span', '', copy.toggle), element('small', '', copy.scope));
    const behavior = element('p', 'settings-hint', copy.behavior);
    const api = element('p', 'settings-hint', copy.api);
    const toolbar = element('div', 'memory-toolbar');
    const title = element('h3', '', copy.heading);
    const review = element('button', 'btn btn-secondary', copy.review);
    const cancel = element('button', 'btn btn-secondary', copy.cancel);
    const repair = element('button', 'btn btn-secondary', copy.repair);
    for (const button of [review, cancel, repair]) button.type = 'button';
    review.onclick = () => { review.disabled = true; send('MEMORY_MAINTENANCE_REVIEW'); };
    cancel.onclick = () => send('MEMORY_MAINTENANCE_CANCEL');
    repair.onclick = () => { repair.disabled = true; send('MEMORY_MAINTENANCE_REPAIR'); };
    toolbar.append(title, review, cancel);
    const state = element('p', 'memory-state');
    state.setAttribute('role', 'status');
    state.setAttribute('aria-live', 'polite');
    const index = element('div', 'memory-index-state');
    index.append(element('span', '', copy.indexPending), repair);
    const list = element('div', 'memory-results');
    const more = element('button', 'btn btn-secondary memory-more', copy.more);
    more.type = 'button';
    let next = null;
    more.onclick = () => send('MEMORY_MAINTENANCE_QUERY', { offset: next });
    root.append(authorization, behavior, api, toolbar, state, index, list, more);
    cancel.hidden = index.hidden = more.hidden = true;

    function renderReceipt(receipt) {
        const details = element('details', 'memory-receipt');
        details.dataset.receiptId = receipt.id;
        const summary = element('summary');
        const count = receipt.counts;
        summary.append(element('strong', '', copy.boundary(receipt.cutoff)), element('time', '', new Date(receipt.createdAt).toLocaleString()),
            element('span', 'memory-counts', [copy.count(copy.summary, count.summary), copy.count(copy.anchors, count.anchors), copy.count(copy.merges, count.merges)].join(' · ')));
        const content = element('div', 'memory-receipt-body');
        const coverage = receipt.coverage;
        content.append(element('p', '', receipt.summary), element('p', 'memory-coverage', [
            copy.count(copy.reviewed, coverage.reviewed.length), copy.count(copy.unreviewed, coverage.unreviewed.length),
            copy.count(copy.unresolved, coverage.unresolved.length), copy.count(copy.missing, coverage.missingAnchors.length),
        ].join(' · ')));
        for (const [key, items] of [['unreviewed', coverage.unreviewed], ['unresolved', coverage.unresolved], ['missing', coverage.missingAnchors]]) {
            if (!items.length) continue;
            const gaps = element('details', 'memory-gaps');
            gaps.append(element('summary', '', copy.count(copy[key], items.length)), element('p', '', items.map(item => item.floor
                ? `${copy.floor(item.floor)}（${copy.anchorStates[item.status] || item.status}）` : `${copy.collections[item.collection]} ${item.key}${item.reason ? `：${item.reason}` : ''}`).join('；')));
            content.append(gaps);
        }
        if (!receipt.operations.length) content.append(element('p', 'settings-hint', copy.noChanges));
        for (const operation of receipt.operations) {
            const block = element('section', 'memory-operation');
            block.append(element('h4', '', `${operation.kind === 'merge' ? copy.merges : copy.collections[operation.collection]} · ${operation.key}`),
                element('p', '', `${copy.reason}：${operation.reason}`),
                element('p', 'settings-hint', `${copy.evidence}：${[...new Set(operation.evidence.map(item => item.floor))].map(copy.floor).join('、')}`));
            for (const change of operation.changes) {
                if (change.retired) block.append(element('p', 'settings-hint', copy.retired[change.retired.reason]));
                const comparison = element('div', 'memory-comparison');
                for (const [label, value] of [[copy.before, change.before], [copy.after, change.after]]) {
                    const column = element('div');
                    column.append(element('h5', '', label), element('pre', '', value == null ? copy.absent : JSON.stringify(value, null, 2)));
                    comparison.append(column);
                }
                block.append(comparison);
            }
            content.append(block);
        }
        details.append(summary, content);
        return details;
    }

    return {
        setEnabled: enabled => { toggle.checked = enabled === true; },
        getEnabled: () => toggle.checked,
        settingsSaved(success) { state.textContent = success ? copy.settingsSaved : copy.settingsFailed; },
        open() { state.textContent = copy.loading; send('MEMORY_MAINTENANCE_QUERY'); },
        render(data) {
            const running = ['running', 'queued', 'saving', 'indexing'].includes(data.state?.status);
            const code = data.state?.code;
            const blocked = ['unconfirmed', 'source_invalid', 'history_invalid'].includes(data.state?.status);
            state.textContent = [copy.states[data.state?.status] || '', code ? copy.errors[code] || copy.errors.agent_failed : ''].filter(Boolean).join(' · ');
            review.disabled = running || !data.canReview;
            cancel.hidden = !running;
            cancel.disabled = data.state?.status === 'saving' || data.state?.status === 'indexing';
            index.hidden = blocked || data.index?.status !== 'pending';
            repair.disabled = running || blocked;
            const opened = new Set([...list.querySelectorAll('details[open][data-receipt-id]')].map(node => node.dataset.receiptId));
            if (!data.offset) list.replaceChildren();
            for (const receipt of data.items || []) {
                if (list.querySelector(`[data-receipt-id="${CSS.escape(receipt.id)}"]`)) continue;
                const node = renderReceipt(receipt);
                node.open = opened.has(receipt.id);
                list.append(node);
            }
            if (!list.children.length) list.append(element('p', 'memory-empty', copy.empty));
            next = data.next;
            more.hidden = next == null;
        },
    };
}
