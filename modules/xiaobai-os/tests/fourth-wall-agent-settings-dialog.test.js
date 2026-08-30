import assert from 'node:assert/strict';
import test from 'node:test';
import { parseHTML } from 'linkedom';

import { createFourthWallAgentSettingsDialog } from '../apps/fourth-wall/host/agent-settings-dialog.js';

test('closing while the Agent bridge loads prevents stale config work and subscriptions', async () => {
    const { document, window } = parseHTML('<!doctype html><html><body></body></html>');
    let finishBridgeLoad;
    let configLoads = 0;
    let subscriptions = 0;
    const bridge = {
        normalizeAgentConfig: value => value,
        buildAgentSettingsPanelMarkup: () => '',
        createAgentSettingsPanel: () => ({
            syncConfigToForm() {},
            bindSettingsPanelEvents() {},
        }),
    };
    const dialog = createFourthWallAgentSettingsDialog({
        documentTarget: document,
        windowTarget: window,
        loadAgentBridge: () => new Promise(resolve => { finishBridgeLoad = resolve; }),
        loadConfig: async () => {
            configLoads += 1;
            return {};
        },
        saveConfig: async () => ({ ok: true, config: {} }),
        subscribeConfigChanged: () => {
            subscriptions += 1;
            return () => { subscriptions -= 1; };
        },
    });

    const pending = dialog.open();
    assert.ok(document.getElementById('xiaobaix-os-agent-settings'));
    dialog.close();
    finishBridgeLoad(bridge);

    assert.equal(await pending, false);
    assert.equal(configLoads, 0);
    assert.equal(subscriptions, 0);
    assert.equal(document.getElementById('xiaobaix-os-agent-settings'), null);
});

test('an Agent bridge loading failure stays visible and is returned to the caller', async () => {
    const { document, window } = parseHTML('<!doctype html><html><body></body></html>');
    const dialog = createFourthWallAgentSettingsDialog({
        documentTarget: document,
        windowTarget: window,
        loadAgentBridge: async () => {throw new Error('bundle unavailable');},
        loadConfig: async () => ({}),
        saveConfig: async () => ({ ok: true, config: {} }),
    });

    assert.equal(await dialog.open(), false);
    assert.match(document.querySelector('.xiaobaix-os-agent-body').textContent, /bundle unavailable/);
    assert.equal(dialog.isOpen(), true);
    dialog.close();
});
