import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';

import { createSettingsRepository } from '../host/settings-repository.js';

async function loadFixture() {
    const text = await readFile(new URL('./fixtures/upstream-fourth-wall-settings.json', import.meta.url), 'utf8');
    return JSON.parse(text);
}

function createAdapter(settings, saveSettings = async () => {}) {
    return {
        getExtensionSettings: () => settings,
        saveSettings,
    };
}

test('migrates the frozen upstream settings and removes only legacy fields', async () => {
    const settings = await loadFixture();
    const repository = createSettingsRepository(createAdapter(settings));

    const current = await repository.prepare();

    assert.equal(current.schemaVersion, 1);
    assert.equal(current.enabled, true);
    assert.deepEqual(current.apps.fourthWall.image, { enablePrompt: true });
    assert.deepEqual(current.apps.fourthWall.voice, { enabled: true });
    assert.deepEqual(current.apps.fourthWall.commentary, { enabled: true, probability: 73 });
    assert.deepEqual(current.apps.fourthWall.promptTemplates, {
        topuser: 'custom top user',
        confirm: 'custom confirm',
        metaProtocol: 'custom meta protocol',
        bottom: 'custom bottom {{USER_INPUT}}',
    });
    for (const key of repository.legacyKeys) assert.equal(Object.hasOwn(settings, key), false);
    assert.deepEqual(settings.unrelatedSetting, { keep: true });
});

test('uses dynamicPrompt only when fourthWall is absent', async () => {
    const settings = {
        dynamicPrompt: { enabled: true },
    };
    const repository = createSettingsRepository(createAdapter(settings));

    const current = await repository.prepare();

    assert.equal(current.enabled, true);
    assert.equal(Object.hasOwn(settings, 'dynamicPrompt'), false);
});

test('fills only missing legacy settings with frozen upstream defaults', async () => {
    const settings = {
        fourthWall: { enabled: false },
        fourthWallPromptTemplates: { topuser: '' },
    };
    const repository = createSettingsRepository(createAdapter(settings));

    const current = await repository.prepare();

    assert.equal(current.enabled, false);
    assert.equal(current.apps.fourthWall.promptTemplates.topuser, '');
    assert.ok(current.apps.fourthWall.promptTemplates.confirm.length > 0);
    assert.equal(current.apps.fourthWall.commentary.probability, 30);
});

test('rejects an unknown current settings version without changing or saving it', async () => {
    const settings = {
        xiaobaiOs: { schemaVersion: 99, sentinel: 'keep' },
        fourthWall: { enabled: true },
    };
    const before = structuredClone(settings);
    let saves = 0;
    const repository = createSettingsRepository(createAdapter(settings, async () => { saves += 1; }));

    await assert.rejects(repository.prepare(), error => error.code === 'UNSUPPORTED_SETTINGS_VERSION');
    assert.deepEqual(settings, before);
    assert.equal(saves, 0);
});

test('restores every legacy setting when the migration save fails', async () => {
    const settings = await loadFixture();
    const before = structuredClone(settings);
    const repository = createSettingsRepository(createAdapter(settings, async () => {
        throw new Error('settings save failed');
    }));

    await assert.rejects(repository.prepare(), /settings save failed/);
    assert.deepEqual(settings, before);
});

test('does not expose a failed settings mutation', async () => {
    const settings = await loadFixture();
    let fail = false;
    const repository = createSettingsRepository(createAdapter(settings, async () => {
        if (fail) throw new Error('settings save failed');
    }));
    await repository.prepare();
    const before = repository.read();
    fail = true;

    await assert.rejects(repository.setEnabled(false), /settings save failed/);
    assert.deepEqual(repository.read(), before);
});
