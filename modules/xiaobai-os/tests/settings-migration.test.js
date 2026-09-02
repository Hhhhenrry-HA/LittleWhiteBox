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

function createFourthWallSettings() {
    return {
        image: { enablePrompt: true },
        voice: { enabled: false },
        commentary: { enabled: true, probability: 42 },
        promptTemplates: {
            topuser: 'top',
            confirm: 'confirm',
            metaProtocol: 'meta',
            bottom: 'bottom',
        },
    };
}

function deferred() {
    let resolve;
    const promise = new Promise(resolvePromise => {resolve = resolvePromise;});
    return { promise, resolve };
}

test('migrates the frozen upstream settings and removes only legacy fields', async () => {
    const settings = await loadFixture();
    const repository = createSettingsRepository(createAdapter(settings));

    const current = await repository.prepare();

    assert.equal(current.schemaVersion, 3);
    assert.equal(current.enabled, true);
    assert.deepEqual(current.apps.map, { autoMaintenance: false });
    assert.deepEqual(current.apps.tasks, { autoMaintenance: false });
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
    assert.deepEqual(current.apps.map, { autoMaintenance: false });
    assert.deepEqual(current.apps.tasks, { autoMaintenance: false });
});

test('prepare upgrades the frozen schema V1 once and installs only the current model', async () => {
    const settings = {
        xiaobaiOs: {
            schemaVersion: 1,
            enabled: true,
            apps: { fourthWall: createFourthWallSettings() },
        },
    };
    let saves = 0;
    const repository = createSettingsRepository(createAdapter(settings, async () => { saves += 1; }));

    assert.throws(() => repository.read(), error => error.code === 'UNSUPPORTED_SETTINGS_VERSION');
    const current = await repository.prepare();

    assert.equal(saves, 1);
    assert.equal(current.schemaVersion, 3);
    assert.equal(current.enabled, true);
    assert.deepEqual(current.apps.fourthWall, createFourthWallSettings());
    assert.deepEqual(current.apps.map, { autoMaintenance: false });
    assert.deepEqual(current.apps.tasks, { autoMaintenance: false });
    assert.equal(Object.hasOwn(settings.xiaobaiOs.apps.map, 'enabled'), false);
    assert.deepEqual(repository.read(), current);
});

test('prepare normalizes the shipped schema V2 Map settings without a runtime compatibility path', async () => {
    const settings = {
        xiaobaiOs: {
            schemaVersion: 2,
            enabled: true,
            apps: {
                fourthWall: createFourthWallSettings(),
                map: { enabled: true, autoMaintenance: true },
                discardedTestApp: { enabled: true },
            },
        },
    };
    let saves = 0;
    const repository = createSettingsRepository(createAdapter(settings, async () => { saves += 1; }));

    assert.throws(() => repository.read(), error => error.code === 'UNSUPPORTED_SETTINGS_VERSION');
    const current = await repository.prepare();

    assert.equal(saves, 1);
    assert.deepEqual(current.apps.map, { autoMaintenance: true });
    assert.deepEqual(current.apps.tasks, { autoMaintenance: false });
    assert.equal(Object.hasOwn(current.apps, 'discardedTestApp'), false);
    assert.equal(Object.hasOwn(settings.xiaobaiOs.apps.map, 'enabled'), false);
});

test('prepare rejects a fabricated schema V2 shape that omitted Map enabled', async () => {
    const settings = {
        xiaobaiOs: {
            schemaVersion: 2,
            enabled: true,
            apps: {
                fourthWall: createFourthWallSettings(),
                map: { autoMaintenance: true },
            },
        },
    };
    let saves = 0;
    const repository = createSettingsRepository(createAdapter(settings, async () => { saves += 1; }));

    await assert.rejects(repository.prepare(), error => (
        error.code === 'INVALID_LEGACY_DATA'
        && error.path === 'xiaobaiOs.apps.map.enabled'
    ));
    assert.equal(saves, 0);
    assert.equal(settings.xiaobaiOs.schemaVersion, 2);
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

test('restores schema V1 settings when the upgrade save fails', async () => {
    const settings = {
        xiaobaiOs: {
            schemaVersion: 1,
            enabled: true,
            apps: { fourthWall: createFourthWallSettings() },
        },
    };
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

test('keeps a settings candidate whose server save result is unconfirmed', async () => {
    const settings = await loadFixture();
    let unconfirmed = false;
    const repository = createSettingsRepository(createAdapter(settings, async () => {
        if (unconfirmed) {
            throw Object.assign(new Error('read-back failed'), { code: 'SAVE_UNCONFIRMED', uncertain: true });
        }
    }));
    await repository.prepare();
    unconfirmed = true;

    await assert.rejects(repository.setEnabled(false), error => error.code === 'SAVE_UNCONFIRMED');
    assert.equal(repository.read().enabled, false);
});

test('updates the sole Map automatic-maintenance setting atomically', async () => {
    const settings = await loadFixture();
    const repository = createSettingsRepository(createAdapter(settings));
    await repository.prepare();

    const automatic = await repository.setMapAutoMaintenance(true);
    assert.deepEqual(automatic.apps.map, { autoMaintenance: true });
    const manual = await repository.setMapAutoMaintenance(false);
    assert.deepEqual(manual.apps.map, { autoMaintenance: false });
});

test('updates the sole Tasks automatic-maintenance setting atomically', async () => {
    const settings = await loadFixture();
    const repository = createSettingsRepository(createAdapter(settings));
    await repository.prepare();

    const automatic = await repository.setTasksAutoMaintenance(true);
    assert.deepEqual(automatic.apps.tasks, { autoMaintenance: true });
    const manual = await repository.setTasksAutoMaintenance(false);
    assert.deepEqual(manual.apps.tasks, { autoMaintenance: false });
});

test('rejects current settings that still contain the removed Map enabled field', () => {
    const settings = {
        xiaobaiOs: {
            schemaVersion: 3,
            enabled: true,
            apps: {
                fourthWall: createFourthWallSettings(),
                map: { enabled: true, autoMaintenance: false },
                tasks: { autoMaintenance: false },
            },
        },
    };
    const repository = createSettingsRepository(createAdapter(settings));

    assert.throws(() => repository.read(), error => error.code === 'INVALID_CURRENT_DATA');
});

test('rejects current settings that still contain the removed Tasks enabled field', () => {
    const settings = {
        xiaobaiOs: {
            schemaVersion: 3,
            enabled: true,
            apps: {
                fourthWall: createFourthWallSettings(),
                map: { autoMaintenance: false },
                tasks: { enabled: true, autoMaintenance: false },
            },
        },
    };
    const repository = createSettingsRepository(createAdapter(settings));

    assert.throws(() => repository.read(), error => error.code === 'INVALID_CURRENT_DATA');
});

test('publishes retained settings only after successful or unconfirmed saves', async () => {
    const settings = await loadFixture();
    let saveResult = 'success';
    const repository = createSettingsRepository(createAdapter(settings, async () => {
        if (saveResult === 'failure') throw new Error('settings save failed');
        if (saveResult === 'unconfirmed') {
            throw Object.assign(new Error('read-back failed'), { code: 'SAVE_UNCONFIRMED' });
        }
    }));
    await repository.prepare();
    const published = [];
    const unsubscribe = repository.subscribe(current => published.push(current));

    await repository.setMapAutoMaintenance(true);
    assert.equal(published.length, 1);
    assert.deepEqual(published[0].apps.map, { autoMaintenance: true });

    const beforeFailure = repository.read();
    saveResult = 'failure';
    await assert.rejects(repository.setMapAutoMaintenance(false), /settings save failed/);
    assert.equal(published.length, 1);
    assert.deepEqual(repository.read(), beforeFailure);

    saveResult = 'unconfirmed';
    await assert.rejects(repository.setMapAutoMaintenance(false), error => error.code === 'SAVE_UNCONFIRMED');
    assert.equal(published.length, 2);
    assert.deepEqual(published[1].apps.map, { autoMaintenance: false });
    assert.deepEqual(repository.read().apps.map, { autoMaintenance: false });

    unsubscribe();
    saveResult = 'success';
    await repository.setMapAutoMaintenance(true);
    assert.equal(published.length, 2);
});

test('notifies execution fences as soon as a settings mutation is installed', async () => {
    const settings = await loadFixture();
    const saveGate = deferred();
    let blockSave = false;
    const repository = createSettingsRepository(createAdapter(settings, () => (
        blockSave ? saveGate.promise : undefined
    )));
    await repository.prepare();
    blockSave = true;
    const installed = [];
    const published = [];
    repository.subscribeMutationInstalled(current => installed.push(current));
    repository.subscribe(current => published.push(current));

    const write = repository.setMapAutoMaintenance(true);
    await new Promise(resolve => globalThis.setImmediate(resolve));
    assert.deepEqual(installed.map(current => current.apps.map.autoMaintenance), [true]);
    assert.deepEqual(published, []);

    saveGate.resolve();
    await write;
    assert.deepEqual(published.map(current => current.apps.map.autoMaintenance), [true]);
});
