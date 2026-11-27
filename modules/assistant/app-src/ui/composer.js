import { AGENT_PERMISSION_MODE_OPTIONS, AGENT_PERMISSION_MODE_LABEL, DEFAULT_PERMISSION_MODE } from '../../../agent-core/config.js';
import { COMPOSER_COPY as C } from './composer-copy.js';
import { chromeIcon } from './chrome-icons.js';

export function composerActionsMarkup() {
    return `<div class="xb-assistant-compose-more">
        <button id="xb-assistant-actions-toggle" type="button" class="xb-assistant-compose-control" aria-controls="xb-assistant-actions-menu" aria-expanded="false">${C.actions}${chromeIcon('chevronDown')}</button>
        <div id="xb-assistant-actions-menu" class="xb-assistant-compose-menu" hidden>
            <button type="button" id="xb-assistant-load-card" class="xb-assistant-compose-menu-item">${C.loadCard}</button>
            <button type="button" id="xb-assistant-compact" class="xb-assistant-compose-menu-item">${C.compact}</button>
        </div>
    </div>
    <label class="xb-assistant-compose-permission">
        <select id="xb-assistant-compose-permission" class="xb-assistant-compose-control" aria-label="${AGENT_PERMISSION_MODE_LABEL}">
            ${AGENT_PERMISSION_MODE_OPTIONS.map(({value,label}) => `<option value="${value}">${label}</option>`).join('')}
        </select>
        ${chromeIcon('chevronDown')}
    </label>`;
}

export function bindComposerActions(root, { state, loadCard, compact, changePermission, confirm = text => window.confirm(text) }) {
    const toggle = root.querySelector('#xb-assistant-actions-toggle');
    const menu = root.querySelector('#xb-assistant-actions-menu');
    const close = () => { menu.hidden = true; toggle.setAttribute('aria-expanded', 'false'); };
    toggle.addEventListener('click', () => {
        menu.hidden = !menu.hidden;
        toggle.setAttribute('aria-expanded', String(!menu.hidden));
    });
    root.addEventListener('click', event => { if (!toggle.parentElement.contains(event.target)) close(); });
    root.addEventListener('keydown', event => {
        if (event.key === 'Escape' && !menu.hidden) { close(); toggle.focus(); event.stopPropagation(); }
    });
    for (const [selector, action] of [
        ['#xb-assistant-load-card', loadCard],
        ['#xb-assistant-compact', () => { if (confirm(C.confirmCompact)) void compact(); }],
    ]) root.querySelector(selector).addEventListener('click', () => {
        close();
        if (state.isBusy || state.isPreparingRun || state.isClearingConversation || state.isClosingAssistant) return;
        toggle.focus();
        void action();
    });
    root.querySelector('#xb-assistant-compose-permission').addEventListener('change', event => { void changePermission(event.target.value); });
}

export function renderComposerActions(root, state) {
    const busy = state.isBusy || state.isPreparingRun || state.isClearingConversation || state.isClosingAssistant;
    const toggle = root.querySelector('#xb-assistant-actions-toggle');
    toggle.disabled = !!busy;
    if (busy) {
        root.querySelector('#xb-assistant-actions-menu').hidden = true;
        toggle.setAttribute('aria-expanded', 'false');
    }
    const permission = root.querySelector('#xb-assistant-compose-permission');
    permission.value = state.permissionMode ?? DEFAULT_PERMISSION_MODE;
}

export function cardReloadDialogMarkup() {
    return `<dialog id="xb-assistant-card-reload-dialog" class="xb-assistant-card-reload-dialog" aria-labelledby="xb-assistant-card-reload-title">
        <h2 id="xb-assistant-card-reload-title"></h2>
        <div data-reload-drafts hidden><p>${C.discardedDrafts}</p><ul></ul></div>
        <form method="dialog">
            <button type="submit" value="cancel" autofocus></button>
            <button type="submit" value="reload"></button>
        </form>
    </dialog>`;
}

export function confirmCardReload(dialog, { name, loaded, drafts }, signal) {
    signal.throwIfAborted();
    dialog.querySelector('h2').textContent = loaded ? C.reloadTitle(name) : C.loadTitle(name);
    const draftList = dialog.querySelector('[data-reload-drafts]');
    draftList.hidden = !drafts.length;
    draftList.querySelector('ul').replaceChildren(...drafts.map(file => {
        const item = dialog.ownerDocument.createElement('li');
        item.textContent = file.book ? `${file.book} · ${file.name}` : file.name;
        return item;
    }));
    dialog.querySelector('[value="cancel"]').textContent = drafts.length ? C.keepDrafts : C.cancel;
    dialog.querySelector('[value="reload"]').textContent = drafts.length ? C.confirmDiscard : loaded ? C.confirmReload : C.confirmLoad;
    dialog.returnValue = '';
    dialog.showModal();
    return new Promise(resolve => {
        const cancel = () => dialog.close();
        signal.addEventListener('abort', cancel, { once: true });
        dialog.addEventListener('close', () => {
            signal.removeEventListener('abort', cancel);
            resolve(dialog.returnValue === 'reload' && !signal.aborted);
        }, { once: true });
    });
}
