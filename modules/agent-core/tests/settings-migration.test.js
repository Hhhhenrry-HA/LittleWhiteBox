import assert from 'node:assert/strict';
import test from 'node:test';
import { readFile } from 'node:fs/promises';
import { upgradeAgentSettings } from '../settings-migration.js';
import { loadSharedAgentSettings, saveSharedAgentSettings } from '../settings-repository.js';
import { resolveActiveProviderConfig } from '../provider-resolution.js';
import { AGENT_SETTINGS_CONFIG_VERSION } from '../config.js';
import { loadAssistantPermission, saveAssistantPermission } from '../../assistant/shared/permission-settings.js';
import { applyPresetAction, createPreset, hostPresetOptions, TEXT_API_VERSION } from '../../text-api/model.js';

// Acceptance (lost configuration / wrong credentials): an actual v1 record,
// with credentials/addresses/model names redacted, retains its selected fields;
// reading or failed saving never modifies the source, and reload uses the current
// format. Old discovery defaults switch to Bearer without changing generation.
const frozen = JSON.parse(await readFile(new URL('./fixtures/agent-settings-v1.json', import.meta.url), 'utf8'));
// Captured from the v3 built assistant in a fresh isolated SillyTavern account.
const frozenV3 = JSON.parse(await readFile(new URL('./fixtures/agent-settings-v3.json', import.meta.url), 'utf8'));

function memoryStorage(initial) {
    let disk = structuredClone(initial);
    return {
        snapshot: () => structuredClone(disk),
        async getStrict(key, missing = null) { return structuredClone(disk[key] ?? missing); },
        async updateAndSave(update) {
            const draft = structuredClone(disk);
            await update(draft);
            if (this.fail) return false;
            disk = draft;
            return true;
        },
        setAndSave(key, value) { return this.updateAndSave(draft => { draft[key] = value; }); },
    };
}

// Upgrading preserves the active permission, rather than a different preset's
// permission. Switching permission and saving API settings never rewrite one another.
for (const [version, jsApiPermission, active, expected] of [
    [3, 'deny', 'A', 'default'], [3, 'allow', 'A', 'full'], [4, undefined, 'A', 'full'], [4, undefined, 'B', 'default'],
]) test(`v${version} ${jsApiPermission ?? 'combined'} preset ${active} keeps ${expected} independently of API settings`, async () => {
    const legacy = { ...structuredClone(frozenV3), configVersion: version, jsApiPermission, currentPresetName: active, presets: {
        A: { ...frozenV3.presets['默认'], permissionMode: 'full', apiKey: 'fixture-key', model: 'fixture-model', modelListAuth: 'x-api-key' },
        B: { ...frozenV3.presets['默认'], provider: 'google', permissionMode: 'default' },
    } };
    const storage = memoryStorage({ settings: legacy });
    const permissionStorage = memoryStorage({});
    const readPermission = () => loadAssistantPermission(permissionStorage, () => storage.getStrict('settings'));
    assert.equal(await readPermission(), expected);
    assert.deepEqual(storage.snapshot(), { settings: legacy });
    // First save may happen outside Assistant, including switching the selected preset.
    const saved = await saveSharedAgentSettings({ currentPresetName: active === 'A' ? 'B' : 'A' }, { storage, permissionStorage });
    assert.equal(saved.ok, true);
    assert.equal(await readPermission(), expected);
    assert.equal(saved.config.presets.A.apiKey, legacy.presets.A.apiKey);
    assert.equal(saved.config.presets.A.modelListAuth, 'x-api-key');
    assert.ok(Object.values(saved.config.presets).every(preset => !Object.hasOwn(preset, 'permissionMode')));
    assert.equal(Object.hasOwn(saved.config, 'jsApiPermission'), false);
    const snapshot = storage.snapshot();
    const switched = expected === 'full' ? 'default' : 'full';
    await saveAssistantPermission(permissionStorage, switched);
    assert.deepEqual(storage.snapshot(), snapshot);
    const configured = await saveSharedAgentSettings({ presets: { ...saved.config.presets,
        B: { ...saved.config.presets.B, model: 'new-model' },
    } }, { storage, permissionStorage });
    assert.equal(configured.config.presets.B.model, 'new-model');
    assert.equal(await readPermission(), switched);
});
for (const provider of Object.keys(frozen.presets['captured-preset'].modelConfigs)) {
    test(`v1 ${provider}: preserve the selected record, empty values and independent delegate through save/reload`, async () => {
        const disk = structuredClone(frozen);
        disk.presets['captured-preset'].provider = provider;
        disk.presets.other = { ...structuredClone(disk.presets['captured-preset']), provider: 'anthropic' };
        disk.delegatePresetName = 'other';
        disk.delegateConfig = { provider: 'google', modelConfigs: { google: {
            baseUrl: 'https://delegate.invalid', apiKey: '', model: 'delegate-model', temperature: 0, sendTemperature: false,
        } } };
        const original = structuredClone(disk);
        const storage = memoryStorage({ settings: disk });
        storage.fail = true;
        const loaded = await loadSharedAgentSettings({ storage });
        const active = original.presets['captured-preset'].modelConfigs[provider];
        for (const [key, value] of Object.entries(active)) {
            assert.deepEqual(loaded.presets['captured-preset'][key], key === 'modelListAuth' ? 'bearer' : value);
        }
        assert.equal(loaded.delegateConfig.modelListAuth, 'bearer');
        assert.equal(loaded.delegateConfig.model, 'delegate-model');
        assert.equal(loaded.delegateConfig.apiKey, '');
        assert.equal(loaded.presets.other.apiKey, 'fixture-anthropic');
        assert.equal(JSON.stringify(loaded).includes('modelConfigs'), false);
        assert.deepEqual(storage.snapshot().settings, original);
        loaded.presets['captured-preset'].provider = 'anthropic';
        loaded.presets['captured-preset'].apiKey = 'edited-preset-key';
        assert.equal((await saveSharedAgentSettings(loaded, { storage })).ok, false);
        assert.deepEqual(storage.snapshot().settings, original);
        storage.fail = false;
        assert.equal((await saveSharedAgentSettings(loaded, { storage })).ok, true);
        const restored = await loadSharedAgentSettings({ storage });
        assert.deepEqual(restored.presets, loaded.presets);
        assert.equal(restored.configVersion, AGENT_SETTINGS_CONFIG_VERSION);
        assert.equal(resolveActiveProviderConfig(restored).apiKey, 'edited-preset-key');
        assert.equal(resolveActiveProviderConfig(restored).model, active.model);
        const upgraded = storage.snapshot().settings;
        assert.equal(upgradeAgentSettings(upgraded), upgraded);
    });
}

test('pre-version top-level provider settings convert only at the read boundary', async () => {
    const legacy = { provider: 'sillytavern-claude', modelConfigs: { 'sillytavern-claude': { apiKey: '', model: '' } } };
    const loaded = await loadSharedAgentSettings({ storage: { get: async () => legacy } });
    assert.equal(loaded.presets['默认'].baseUrl, '');
    assert.equal(loaded.presets['默认'].model, '');
    assert.equal(loaded.presets['默认'].apiKey, '');
    assert.equal(loaded.presets['默认'].provider, 'sillytavern-claude');
    assert.ok(legacy.modelConfigs);
});

test('Text API saving another channel retains every field including inactive Vertex options', () => {
    const preset = createPreset('a', 'A', { provider: 'google-vertex', baseUrl: 'https://relay.invalid', apiKey: 'fixture', model: 'alias',
        modelListAuth: 'x-goog-api-key', vertex: { authMode: 'relay', serviceAccountJson: 'fixture-json', streamFunctionCallArguments: false } });
    const state = { version: TEXT_API_VERSION, presets: [preset], bindings: { summary: 'a', planner: 'a', outline: 'a' }, hostPreset: hostPresetOptions() };
    const changed = applyPresetAction(state, 'summary', { type: 'save', id: 'a', preset: { ...preset, provider: 'anthropic' } });
    assert.deepEqual(changed.presets[0], { ...preset, provider: 'anthropic' });
});

// Acceptance (401 / lost settings): every stored preset and the independent
// delegate upgrade once; saving/reloading a later native choice must retain it.
test('v2 presets upgrade discovery once while preserving fields and later manual selections', async () => {
    const disk = { configVersion: 2, currentPresetName: 'claude', delegatePresetName: 'google', delegateConfigured: true,
        presets: {
            claude: { provider: 'anthropic', baseUrl: 'https://relay.invalid/v1', apiKey: 'claude-key', model: 'alias', modelListAuth: 'x-api-key' },
            google: { provider: 'sillytavern-google', baseUrl: 'https://relay.invalid/v3', apiKey: 'google-key', model: 'alias-2', modelListAuth: 'x-goog-api-key' },
        },
        delegateConfig: { provider: 'google', baseUrl: 'https://delegate.invalid', apiKey: 'delegate-key', model: 'alias-3', modelListAuth: 'x-goog-api-key' } };
    const original = structuredClone(disk);
    const storage = memoryStorage({ settings: disk });
    const loaded = await loadSharedAgentSettings({ storage });
    for (const [name, preset] of Object.entries(original.presets)) {
        for (const [key, value] of Object.entries(preset)) assert.equal(loaded.presets[name][key], key === 'modelListAuth' ? 'bearer' : value);
    }
    assert.equal(loaded.delegateConfig.modelListAuth, 'bearer');
    assert.equal(loaded.delegateConfig.apiKey, 'delegate-key');
    assert.deepEqual(storage.snapshot().settings, original);
    assert.equal((await saveSharedAgentSettings(loaded, { storage })).ok, true);
    assert.deepEqual((await loadSharedAgentSettings({ storage })).presets, loaded.presets);
    loaded.presets.claude.modelListAuth = 'x-api-key';
    loaded.presets.google.modelListAuth = loaded.delegateConfig.modelListAuth = 'x-goog-api-key';
    assert.equal((await saveSharedAgentSettings(loaded, { storage })).ok, true);
    const restored = await loadSharedAgentSettings({ storage });
    assert.deepEqual(restored.presets, loaded.presets);
    assert.deepEqual(restored.delegateConfig, loaded.delegateConfig);
});
