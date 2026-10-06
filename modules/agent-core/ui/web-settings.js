import { WEB_PROVIDERS, WEB_SETTINGS_COPY, normalizeWebSettings } from '../web/settings.js';

export function buildWebSettingsMarkup() {
    return `<div class="xb-assistant-web-settings"><label><span>${WEB_SETTINGS_COPY.provider}</span>
        <select id="xb-assistant-web-provider">${WEB_PROVIDERS.map(({ id, label }) => `<option value="${id}">${label}</option>`).join('')}</select>
    </label>${WEB_PROVIDERS.map(({ id, label }) => `<label id="xb-assistant-${id}-key-wrap">
        <span>${label} ${WEB_SETTINGS_COPY.key}</span>
        <div class="xb-assistant-inline-input">
            <input id="xb-assistant-${id}-api-key" type="password" autocomplete="off" />
            <button id="xb-assistant-toggle-${id}-key" type="button" class="secondary ghost">${WEB_SETTINGS_COPY.show}</button>
        </div>
    </label>`).join('')}</div>`;
}

export function readWebSettingsForm(root, draft) {
    return normalizeWebSettings({
        webProvider: root.querySelector('#xb-assistant-web-provider')?.value,
        ...Object.fromEntries(WEB_PROVIDERS.map(({ id }) => [
            `${id}ApiKey`, root.querySelector(`#xb-assistant-${id}-api-key`)?.value,
        ])),
    }, draft);
}

export function syncWebSettingsForm(root, draft) {
    const settings = normalizeWebSettings(draft);
    const select = root.querySelector('#xb-assistant-web-provider');
    if (select) select.value = settings.webProvider;
    for (const { id } of WEB_PROVIDERS) {
        const wrap = root.querySelector(`#xb-assistant-${id}-key-wrap`);
        const input = root.querySelector(`#xb-assistant-${id}-api-key`);
        if (wrap) wrap.style.display = settings.webProvider === id ? '' : 'none';
        if (input) input.value = settings[`${id}ApiKey`];
    }
}
