import assert from 'node:assert/strict';
import test from 'node:test';
import { Buffer } from 'node:buffer';
import { readFileSync } from 'node:fs';
import { setImmediate } from 'node:timers/promises';
import { fileURLToPath } from 'node:url';
import { build } from 'esbuild';
import { createKernelComposition } from '../host/kernel-composition.ts';
import { createSettingsRepository } from '../host/settings-repository.ts';
import { createAppModuleRegistry } from '../kernel/app-registry.ts';

// Keep the production module, controller and message cleanup. Replace native I/O and inactive UI workers.
const compiled = await build({
    stdin: { contents: `export { createProductionDiceModule } from '../apps/dice/production-module.ts'; export { host } from 'dice-cleanup-host';`,
        resolveDir: fileURLToPath(new URL('.', import.meta.url)) },
    bundle: true, write: false, format: 'esm', platform: 'node', logLevel: 'silent',
    footer: { js: '//# sourceURL=dice-lifecycle-fixture.js' },
    plugins: [{ name: 'dice-cleanup-host', setup(builder) {
        builder.onResolve({ filter: /^js-sha256$/ }, () => ({ path: import.meta.resolve('js-sha256'), external: true }));
        builder.onResolve({ filter: /(?:^dice-cleanup-host$|\/(?:script|group-chats|sillytavern-port|sillytavern-chat-save|generation-adapter|message-display|encounter-runtime|encounter-display)\.js$)/ },
            () => ({ path: 'host', namespace: 'fixture' }));
        builder.onLoad({ filter: /.*/, namespace: 'fixture' }, () => ({ contents: `
            export let is_send_press = false;
            export const is_group_generating = false;
            export const host = { source: null, save: null, editing: -1,
                get busy() { return is_send_press; }, set busy(value) { is_send_press = value; },
                get saving() { return isChatSaving; }, set saving(value) { isChatSaving = value; }, cancelled: false };
            export let isChatSaving = false;
            export const captureDiceChat = () => host.source;
            export const ensureDiceDisplayRule = async () => {};
            export const isDiceMessageBeingEdited = index => host.editing === index;
            export const updateMessageBlock = () => {};
            export const saveSillyTavernChat = guard => host.save(guard);
            export const createDiceGenerationAdapter = (_enabled, frequency) => {
                host.frequency = frequency;
                return { start() { host.actionStarted = true; }, stop() { host.actionStarted = false; }, isBusy: () => host.busy, cancel() { host.cancelled = true; } };
            };
            export const createEncounterRuntime = () => ({ start() { host.encounterStarted = true; }, stop() { host.encounterStarted = false; }, cancel() {} });
            export const createEncounterDisplay = () => ({ start() {}, stop() {}, refresh() {} });
            export const createDiceMessageDisplay = (_runtime, enabled) => {
                const refresh = () => { host.displayEnabled = enabled(); };
                return { start: refresh, stop() {}, refresh };
            };
        ` }));
    } }],
});
// eslint-disable-next-line no-unsanitized/method -- Fixed repository code and test I/O fixture only.
const { createProductionDiceModule, host } = await import(`data:text/javascript;base64,${Buffer.from(compiled.outputFiles[0].text).toString('base64')}`);

const oldCoc = JSON.parse(readFileSync(new URL('./fixtures/dice-coc7-test-9bded7e1.json', import.meta.url), 'utf8'));
async function retirementHarness(t) {
    host.busy = false; host.saving = false; host.editing = -1;
    const root = {};
    const settings = createSettingsRepository({ getExtensionSettings: () => root, saveSettings() {} });
    await settings.prepare();
    await settings.setDiceFeature('actionChecksEnabled', true);
    await settings.setDiceFeature('encountersEnabled', true);
    const registry = createAppModuleRegistry([createProductionDiceModule(settings, async () => ({}), () => false)], {
        createStore() { assert.fail('Dice does not own a partition'); }, hasCapability: () => false,
        requireCapability() { assert.fail('Dice does not use a capability'); }, files: {},
    });
    t.after(async () => { await registry.dispose(); host.busy = false; host.saving = false; host.editing = -1; });
    await registry.installAll();
    return registry;
}

// Exercise deferral at the real production/registry boundary: busy is not an APP failure.
for (const blocker of ['generation', 'save', 'editor']) {
    test(`old CoC retirement waits for ${blocker} without partial mutation or disabling Dice`, async t => {
        t.mock.timers.enable({ apis: ['setTimeout'] });
        const registry = await retirementHarness(t);
        host.source = { key: 'retirement', chat: [structuredClone(oldCoc), structuredClone(oldCoc)] };
        const original = structuredClone(host.source.chat);
        host.busy = blocker === 'generation'; host.saving = blocker === 'save'; host.editing = blocker === 'editor' ? 1 : -1;
        await registry.startBackground();
        assert.equal(registry.status('dice').state, 'ready');
        assert.equal(host.actionStarted, true); assert.equal(host.encounterStarted, true);
        t.mock.timers.runAll(); await setImmediate();
        assert.deepEqual(host.source.chat, original);
        host.busy = false; host.saving = false; host.editing = -1;
        t.mock.timers.runAll(); await setImmediate();
        assert.equal(registry.status('dice').state, 'ready');
        assert.ok(host.source.chat.every(message => !Object.hasOwn(message.extra, 'xiaobaiOsDice')));
        assert.ok(host.source.chat.every(message => message.mes !== oldCoc.mes));
    });
}

test('deferred retirement belongs to its current chat and stops with the module', async t => {
    t.mock.timers.enable({ apis: ['setTimeout'] });
    const registry = await retirementHarness(t);
    const first = { key: 'first', chat: [structuredClone(oldCoc)] };
    host.source = first; host.busy = true;
    await registry.startBackground();
    const second = { key: 'second', chat: [structuredClone(oldCoc)] };
    host.source = second;
    await registry.handleChatChanged();
    host.busy = false;
    t.mock.timers.runAll(); await setImmediate();
    assert.deepEqual(first.chat, [oldCoc], 'the previous chat must not be changed by a late retry');
    assert.equal(Object.hasOwn(second.chat[0].extra, 'xiaobaiOsDice'), false);
    host.source = first; host.busy = true;
    await registry.handleChatChanged();
    await registry.stopBackground();
    host.busy = false;
    t.mock.timers.runAll(); await setImmediate();
    assert.deepEqual(first.chat, [oldCoc], 'stopping cancels all pending removal');
});

test('genuinely invalid old records still report a failure after the busy period', async t => {
    t.mock.method(console, 'error', () => {});
    t.mock.timers.enable({ apis: ['setTimeout'] });
    const registry = await retirementHarness(t);
    host.source = { key: 'broken', chat: [structuredClone(oldCoc), structuredClone(oldCoc)] };
    host.source.chat[1].extra.xiaobaiOsDice.checks[0].id = 'bad id';
    const before = structuredClone(host.source.chat);
    host.busy = true;
    await registry.startBackground();
    assert.equal(registry.status('dice').state, 'ready');
    host.busy = false;
    t.mock.timers.runAll(); await setImmediate();
    assert.equal(registry.status('dice').state, 'failed');
    assert.deepEqual(host.source.chat, before);
});

// Exercise the real module registry and global settings: a native welcome
// screen has no binding, which is normal and must not fail the Dice runtime.
for (const startsWithChat of [false, true]) {
    test(`Dice survives ${startsWithChat ? 'leaving a chat' : 'startup before any chat opens'} and keeps global preferences`, async t => {
        let capture = null;
        let writes = 0;
        host.source = null;
        const root = {};
        const settings = createSettingsRepository({ getExtensionSettings: () => root, saveSettings() {} });
        await settings.prepare();
        await settings.setDiceFeature('actionChecksEnabled', true);
        await settings.setDiceFeature('encountersEnabled', true);
        const kernel = createKernelComposition({
            modules: [createProductionDiceModule(settings, async () => ({world:false,summary:false}), () => false)], capabilities: [],
            storage: {
                async read() { throw new Error('The binding lifecycle already loaded this file'); },
                async replace() { writes++; throw new Error('Lifecycle must not write preferences'); },
            },
            chatReferences: {
                capture: () => capture,
                isCurrent: requested => requested === capture,
            },
        });
        t.after(() => kernel.dispose());
        async function selectChat(chatId, enabled) {
            const binding = { kind: 'character', ownerLocator: 'mira.png', chatId };
            capture = { identityKey: `character:mira.png:${chatId}`, binding, reference: { formatVersion: 1, osId: chatId } };
            host.source = { key: capture.identityKey, chat: [] };
            kernel.transactions.invalidateCurrent();
            // Same boundary used by production's chat binding lifecycle.
            await kernel.transactions.installResolvedEnvelope({
                formatVersion: 1, osId: chatId, binding, revision: 1, commitId: `commit_${chatId}`,
                partitions: { dice: { schemaVersion: 1, actionChecksEnabled: enabled, encountersEnabled: false } },
            });
        }
        if (startsWithChat) { await selectChat('chat-a', true); }
        await kernel.install();
        await kernel.apps.startBackground();
        assert.equal(kernel.apps.status('dice').state, 'ready');
        assert.equal(host.frequency(), 'standard');
        await settings.setDiceActionCheckFrequency('active');
        assert.equal(host.frequency(), 'active', 'production generation reads current global frequency without reinstalling');

        if (!startsWithChat) { await selectChat('chat-a', true); }
        await kernel.apps.handleChatChanged();
        assert.equal(host.displayEnabled, true, 'The display uses global preferences without reopening Dice');
        assert.equal(kernel.apps.status('dice').state, 'ready');
        let state = await kernel.apps.activate('dice', { isCurrent: () => true, post() {} });
        assert.equal(state.actionChecksEnabled, true);

        capture = null; host.source = null;
        kernel.transactions.invalidateCurrent();
        await kernel.apps.handleChatChanged();
        assert.equal(kernel.apps.status('dice').state, 'ready');

        await selectChat('chat-b', false);
        await kernel.apps.handleChatChanged();
        state = await kernel.apps.activate('dice', { isCurrent: () => true, post() {} });
        assert.equal(state.chatIdentity, 'character:mira.png:chat-b');
        assert.equal(state.actionChecksEnabled, true, 'Old chat-local preferences cannot override the global switch');
        assert.equal(state.encountersEnabled, true);
        assert.equal(state.actionCheckFrequency, 'active');
        assert.equal(writes, 0);
    });
}

test('cleanup disables before removing message data and saves once before removing the partition after same-chat confirmation', async () => {
    for (const mode of ['confirmed', 'unconfirmed', 'switched', 'busy']) {
        const userMessage = { is_user: true, mes: 'User prose', extra: { foreign: 1, xiaobaiOsDice: { schemaVersion: 1, encounter: { outcome: 'medium' } } } };
        const message = { mes: 'Narrative', extra: { xiaobaiOsDice: { checks: [] }, other: 'retained' },
            swipes: ['Old', 'Narrative'], swipe_info: [{ extra: { xiaobaiOsDice: {}, reasoning: 'old' } }, { extra: { xiaobaiOsDice: {} } }] };
        host.source = { key: 'chat-a', chat: [userMessage, message] }; host.busy = mode === 'busy'; host.cancelled = false;
        const root = {};
        let persist = () => {};
        const settings = createSettingsRepository({ getExtensionSettings: () => root, saveSettings: () => persist() });
        await settings.prepare();
        await settings.setDiceFeature('actionChecksEnabled', true);
        await settings.setDiceFeature('encountersEnabled', true);
        let writes = 0;
        let removed = false;
        persist = () => {
            assert.ok(message.extra.xiaobaiOsDice, 'message data remains while disabling preferences');
            assert.ok(userMessage.extra.xiaobaiOsDice);
            assert.equal(writes, 0);
        };
        const saving = Promise.withResolvers();
        const confirmation = Promise.withResolvers();
        const module = createProductionDiceModule(settings, async () => ({world:false,summary:false}), () => false);
        await module.install({ execution: { addCleanup() {} } });
        host.save = async guard => {
            saving.resolve();
            writes++;
            assert.equal(guard(), true);
            assert.equal(settings.read().apps.dice.actionChecksEnabled, false);
            assert.equal(settings.read().apps.dice.encountersEnabled, false);
            assert.equal(host.cancelled, true);
            assert.equal(message.extra.xiaobaiOsDice, undefined);
            assert.equal(userMessage.extra.xiaobaiOsDice, undefined);
            return confirmation.promise;
        };
        const operation = module.clearData({ async removePartition(key) {
            assert.equal(key, 'dice'); assert.equal(writes, 1); assert.equal(host.source.key, 'chat-a'); removed = true;
        } });
        const result = operation.then(() => null, error => error);
        if (mode !== 'busy') {
            await saving.promise;
            assert.equal(writes, 1);
            assert.equal(removed, false, 'partition removal must wait for the cleanup save acknowledgement');
            if (mode === 'switched') { host.source = { key: 'chat-b', chat: [] }; }
            confirmation.resolve({ status: mode === 'unconfirmed' ? 'unconfirmed' : 'confirmed' });
        }
        const error = await result;
        assert.equal(writes, mode === 'busy' ? 0 : 1);
        assert.equal(removed, mode === 'confirmed');
        assert.equal(Boolean(error), mode !== 'confirmed');
        assert.equal(message.mes, 'Narrative');
        assert.equal(userMessage.mes, 'User prose');
        assert.equal(userMessage.extra.foreign, 1);
        assert.deepEqual(message.swipes, ['Old', 'Narrative']);
        assert.equal(message.extra.other, 'retained');
        assert.equal(message.swipe_info[0].extra.reasoning, 'old');
        if (mode === 'busy') {
            assert.equal(host.cancelled, false);
            assert.equal(settings.read().apps.dice.actionChecksEnabled, true);
            assert.equal(settings.read().apps.dice.encountersEnabled, true);
            assert.ok(message.extra.xiaobaiOsDice);
            assert.ok(userMessage.extra.xiaobaiOsDice);
            assert.ok(message.swipe_info.every(info => Object.hasOwn(info.extra, 'xiaobaiOsDice')));
        } else { assert.ok(message.swipe_info.every(info => !Object.hasOwn(info.extra, 'xiaobaiOsDice'))); }
    }
});
