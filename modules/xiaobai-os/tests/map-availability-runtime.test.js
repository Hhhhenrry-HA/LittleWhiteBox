import assert from 'node:assert/strict';
import test from 'node:test';

import { createMapAvailabilityRuntime } from '../apps/map/host/availability-runtime.js';

function createHarness(initial = { enabled: false, autoMaintenance: false }) {
    let mapSettings = initial;
    let listener = null;
    let mutationInstalledListener = null;
    const calls = [];
    const settings = {
        read: () => ({ apps: { map: mapSettings } }),
        subscribe(next) {
            listener = next;
            return () => {listener = null;};
        },
        subscribeMutationInstalled(next) {
            mutationInstalledListener = next;
            return () => {mutationInstalledListener = null;};
        },
    };
    const runtime = createMapAvailabilityRuntime({
        settings,
        maintenance: {
            cancelForeground: (id, reason) => calls.push(['cancel-foreground', id, reason]),
            invalidateAutomatic: (id, reason) => calls.push(['invalidate-automatic', id, reason]),
        },
        prompt: {
            startBackground: () => calls.push(['prompt-start']),
            stopBackground: () => calls.push(['prompt-stop']),
            handleChatChanged: () => calls.push(['prompt-chat-changed']),
            cancelAll: reason => calls.push(['prompt-cancel', reason]),
        },
    });
    return {
        calls,
        runtime,
        install(next, enabled = true) {
            mapSettings = next;
            mutationInstalledListener?.({ enabled, apps: { map: next } });
        },
        publish(next) {
            mapSettings = next;
            listener?.({ apps: { map: next } });
        },
    };
}

test('Map availability starts its prompt only while the app is enabled', () => {
    const harness = createHarness();
    harness.runtime.startBackground();
    assert.deepEqual(harness.calls, []);

    harness.publish({ enabled: true, autoMaintenance: false });
    assert.deepEqual(harness.calls, [['prompt-start']]);

    harness.publish({ enabled: true, autoMaintenance: false });
    assert.deepEqual(harness.calls, [['prompt-start']]);

    harness.install({ enabled: false, autoMaintenance: false });
    harness.publish({ enabled: false, autoMaintenance: false });
    assert.deepEqual(harness.calls.slice(-3), [
        ['cancel-foreground', 'map', 'map-disabled'],
        ['invalidate-automatic', 'map', 'map-disabled'],
        ['prompt-stop'],
    ]);
});

test('turning off only automatic maintenance leaves Map and its prompt active', () => {
    const harness = createHarness({ enabled: true, autoMaintenance: true });
    harness.runtime.startBackground();
    harness.install({ enabled: true, autoMaintenance: false });
    harness.publish({ enabled: true, autoMaintenance: false });

    assert.deepEqual(harness.calls, [
        ['prompt-start'],
        ['invalidate-automatic', 'map', 'automatic-disabled'],
    ]);
});

test('an installed disable mutation fences requests before stable settings publish', () => {
    const harness = createHarness({ enabled: true, autoMaintenance: true });
    harness.runtime.startBackground();
    harness.install({ enabled: false, autoMaintenance: false });

    assert.deepEqual(harness.calls, [
        ['prompt-start'],
        ['cancel-foreground', 'map', 'map-disabled'],
        ['invalidate-automatic', 'map', 'map-disabled'],
    ]);

    harness.publish({ enabled: false, autoMaintenance: false });
    assert.deepEqual(harness.calls, [
        ['prompt-start'],
        ['cancel-foreground', 'map', 'map-disabled'],
        ['invalidate-automatic', 'map', 'map-disabled'],
        ['prompt-stop'],
    ]);
});

test('an installed OS disable mutation fences Map even while its own flag remains enabled', () => {
    const harness = createHarness({ enabled: true, autoMaintenance: true });
    harness.runtime.startBackground();
    harness.install({ enabled: true, autoMaintenance: true }, false);

    assert.deepEqual(harness.calls.slice(-2), [
        ['cancel-foreground', 'map', 'os-disabled'],
        ['invalidate-automatic', 'map', 'os-disabled'],
    ]);
});
