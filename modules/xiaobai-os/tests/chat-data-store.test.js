import assert from 'node:assert/strict';
import test from 'node:test';

import { createChatDataStore, XiaobaiOsUnconfirmedMutationError } from '../host/chat-data-store.js';

function root(value) {
    return { schemaVersion: 2, apps: {}, domains: { sample: value } };
}

function createHarness(validators = {}) {
    const identity = { key: 'character:1:chat-a', chatId: 'chat-a' };
    const metadata = {};
    const state = {
        identity,
        metadata,
        persisted: undefined,
        save: async transaction => { state.persisted = structuredClone(transaction.xiaobaiOs); },
        read: async () => structuredClone(state.persisted),
    };
    const store = createChatDataStore({
        getChatIdentity: () => state.identity,
        getChatMetadata: current => current?.key === state.identity?.key ? state.metadata : null,
        saveChatMetadata: transaction => state.save(transaction),
        readPersistedXiaobaiOs: () => state.read(),
    }, validators);
    return { state, store };
}

function deferred() {
    let resolve;
    const promise = new Promise(resolvePromise => {resolve = resolvePromise;});
    return { promise, resolve };
}

test('an unconfirmed save freezes later writes until the candidate is confirmed', async () => {
    const { state, store } = createHarness();
    const writeStates = [];
    store.subscribe(change => writeStates.push(change.writeState));
    state.save = async transaction => {
        state.persisted = structuredClone(transaction.xiaobaiOs);
        throw Object.assign(new Error('read-back unavailable'), { code: 'SAVE_UNCONFIRMED', uncertain: true });
    };
    await assert.rejects(
        store.mutateCurrent(() => ({ next: root('candidate'), result: true })),
        error => error instanceof XiaobaiOsUnconfirmedMutationError && error.mutationCommitted === true,
    );
    assert.equal(store.getWriteState(), 'unconfirmed');
    assert.deepEqual(writeStates, ['saving', 'unconfirmed']);
    await assert.rejects(
        store.mutateCurrent(() => ({ next: root('second'), result: true })),
        error => error.code === 'SAVE_UNCONFIRMED',
    );
    assert.deepEqual(await store.confirmPending(), { status: 'confirmed' });
    assert.equal(store.getWriteState(), 'ready');
    assert.deepEqual(writeStates, ['saving', 'unconfirmed', 'ready']);
    assert.equal(store.readCurrent().domains.sample, 'candidate');
});

test('confirmation accepts persisted JSON whose object keys were reordered by the server', async () => {
    const { state, store } = createHarness();
    state.save = async () => {
        state.persisted = {
            domains: { sample: { second: 2, first: 1 } },
            apps: {},
            schemaVersion: 2,
        };
        throw Object.assign(new Error('read-back unavailable'), { code: 'SAVE_UNCONFIRMED', uncertain: true });
    };

    await assert.rejects(
        store.mutateCurrent(() => ({
            next: root({ first: 1, second: 2 }),
            result: true,
        })),
        error => error.code === 'SAVE_UNCONFIRMED',
    );

    assert.deepEqual(await store.confirmPending(), { status: 'confirmed' });
    assert.equal(store.getWriteState(), 'ready');
});

test('confirmation restores the previous root or freezes a third-party conflict', async () => {
    const rejected = createHarness();
    rejected.state.persisted = root('before');
    rejected.state.metadata.extensions = { LittleWhiteBox: { xiaobaiOs: root('before') } };
    rejected.state.save = async () => {
        throw Object.assign(new Error('unknown result'), { code: 'SAVE_UNCONFIRMED', uncertain: true });
    };
    await assert.rejects(rejected.store.mutateCurrent(() => ({ next: root('candidate'), result: true })));
    assert.deepEqual(await rejected.store.confirmPending(), { status: 'rejected' });
    assert.equal(rejected.store.readCurrent().domains.sample, 'before');

    const conflict = createHarness();
    conflict.state.persisted = root('before');
    conflict.state.metadata.extensions = { LittleWhiteBox: { xiaobaiOs: root('before') } };
    conflict.state.save = async () => {
        throw Object.assign(new Error('unknown result'), { code: 'SAVE_UNCONFIRMED', uncertain: true });
    };
    await assert.rejects(conflict.store.mutateCurrent(() => ({ next: root('candidate'), result: true })));
    conflict.state.persisted = root('other-writer');
    assert.deepEqual(await conflict.store.confirmPending(), { status: 'conflict' });
    assert.equal(conflict.store.getWriteState(), 'conflict');
    assert.deepEqual(await conflict.store.adoptServerState(), { status: 'adopted' });
    assert.equal(conflict.store.getWriteState(), 'ready');
    assert.equal(conflict.store.readCurrent().domains.sample, 'other-writer');
});

test('adopting malformed or unreadable server data keeps the conflict frozen', async (t) => {
    t.mock.method(console, 'error', () => undefined);
    const harness = createHarness({
        domains: {
            sample(value) {if (value !== 'before' && value !== 'candidate') {throw new Error('invalid sample');}},
        },
    });
    harness.state.persisted = root('before');
    harness.state.metadata.extensions = { LittleWhiteBox: { xiaobaiOs: root('before') } };
    harness.state.save = async () => {
        throw Object.assign(new Error('unknown result'), { code: 'SAVE_UNCONFIRMED', uncertain: true });
    };
    await assert.rejects(harness.store.mutateCurrent(() => ({ next: root('candidate'), result: true })));
    harness.state.persisted = root('invalid-server');
    assert.deepEqual(await harness.store.confirmPending(), { status: 'conflict' });
    assert.deepEqual(await harness.store.adoptServerState(), { status: 'conflict' });
    assert.equal(harness.store.getWriteState(), 'conflict');
    assert.equal(harness.store.readCurrent().domains.sample, 'candidate');

    harness.state.read = async () => {throw new Error('offline');};
    assert.deepEqual(await harness.store.adoptServerState(), { status: 'conflict' });
    assert.equal(harness.store.getWriteState(), 'conflict');
});

test('server adoption rolls back migration effects only after server data installs', async (t) => {
    t.mock.method(console, 'error', () => undefined);
    const identity = { key: 'character:1:chat-a', chatId: 'chat-a' };
    let rejectInstall = false;
    const littleWhiteBox = new Proxy({ xiaobaiOs: root('before') }, {
        set(target, key, value) {
            if (key === 'xiaobaiOs' && rejectInstall) {throw new Error('install rejected');}
            return Reflect.set(target, key, value);
        },
    });
    const metadata = { legacy: { keep: true }, extensions: { LittleWhiteBox: littleWhiteBox } };
    let persisted = root('server');
    const store = createChatDataStore({
        getChatIdentity: () => identity,
        getChatMetadata: () => metadata,
        saveChatMetadata: async () => {
            throw Object.assign(new Error('unknown result'), { code: 'SAVE_UNCONFIRMED', uncertain: true });
        },
        readPersistedXiaobaiOs: async () => structuredClone(persisted),
    });

    await assert.rejects(store.mutateCurrent(() => ({
        next: root('candidate'),
        result: true,
        metadataEffect: {
            apply() {delete metadata.legacy;},
            rollback() {metadata.legacy = { keep: true };},
        },
    })));
    assert.equal(Object.hasOwn(metadata, 'legacy'), false);

    rejectInstall = true;
    assert.deepEqual(await store.adoptServerState(), { status: 'conflict' });
    assert.equal(store.readCurrent().domains.sample, 'candidate');
    assert.equal(Object.hasOwn(metadata, 'legacy'), false);

    rejectInstall = false;
    assert.deepEqual(await store.adoptServerState(), { status: 'adopted' });
    assert.equal(store.readCurrent().domains.sample, 'server');
    assert.deepEqual(metadata.legacy, { keep: true });
});

test('an explicit save failure restores the previous root and permits a clean retry', async () => {
    const { state, store } = createHarness();
    state.persisted = root('before');
    state.metadata.extensions = { LittleWhiteBox: { xiaobaiOs: root('before') } };
    state.save = async () => {
        throw Object.assign(new Error('save unavailable'), { code: 'SAVE_UNAVAILABLE' });
    };

    await assert.rejects(
        store.mutateCurrent(() => ({ next: root('candidate'), result: true })),
        error => error.code === 'SAVE_UNAVAILABLE',
    );
    assert.equal(store.getWriteState(), 'ready');
    assert.equal(store.readCurrent().domains.sample, 'before');

    state.save = async transaction => { state.persisted = structuredClone(transaction.xiaobaiOs); };
    await store.mutateCurrent(() => ({ next: root('retry'), result: true }));
    assert.equal(store.readCurrent().domains.sample, 'retry');
});

test('queued work captured in one chat cannot mutate the chat opened before it starts', async () => {
    const { state, store } = createHarness();
    const chatAMetadata = state.metadata;
    let releaseFirst;
    state.save = transaction => new Promise(resolve => {
        releaseFirst = () => {
            state.persisted = structuredClone(transaction.xiaobaiOs);
            resolve();
        };
    });
    const first = store.mutateCurrent(() => ({ next: root('chat-a'), result: true }));
    await new Promise(resolve => globalThis.setImmediate(resolve));
    const second = store.mutateCurrent(() => ({ next: root('must-not-reach-chat-b'), result: true }));
    const chatBMetadata = {};
    state.identity = { key: 'character:2:chat-b', chatId: 'chat-b' };
    state.metadata = chatBMetadata;
    const firstRejection = assert.rejects(first, error => (
        error.code === 'CHAT_CHANGED' && error.mutationCommitted === true
    ));
    releaseFirst();

    await firstRejection;
    await assert.rejects(second, error => error.code === 'CHAT_CHANGED');
    assert.equal(chatAMetadata.extensions.LittleWhiteBox.xiaobaiOs.domains.sample, 'chat-a');
    assert.deepEqual(chatBMetadata, {});
});

test('metadata effects roll back when installing the candidate root fails', async () => {
    const identity = { key: 'character:1:chat-a', chatId: 'chat-a' };
    const target = { legacy: { keep: true } };
    const metadata = new Proxy(target, {
        set(object, key, value) {
            if (key === 'extensions') {throw new Error('root installation failed');}
            return Reflect.set(object, key, value);
        },
    });
    const store = createChatDataStore({
        getChatIdentity: () => identity,
        getChatMetadata: () => metadata,
        saveChatMetadata: async () => { throw new Error('save must not run'); },
        readPersistedXiaobaiOs: async () => undefined,
    });

    await assert.rejects(
        store.mutateCurrent((_current, context) => ({
            next: root('candidate'),
            result: true,
            metadataEffect: {
                apply() { delete context.metadata.legacy; },
                rollback() { context.metadata.legacy = { keep: true }; },
            },
        })),
        /root installation failed/,
    );
    assert.deepEqual(target, { legacy: { keep: true } });
});

test('the root store validates registered branches and preserves unowned optional branches', async () => {
    const validators = {
        domains: {
            sample(value, path) {
                if (value !== 'valid' && value !== 'next') {throw new Error(`${path}:invalid`);}
            },
        },
    };
    const { state, store } = createHarness(validators);
    state.metadata.extensions = {
        LittleWhiteBox: {
            xiaobaiOs: {
                schemaVersion: 2,
                apps: { futureApp: { untouched: true } },
                domains: { sample: 'valid', futureDomain: { untouched: true } },
            },
        },
    };

    await store.mutateCurrent(current => {
        const next = structuredClone(current);
        next.domains.sample = 'next';
        return { next, result: true };
    });
    assert.deepEqual(store.readCurrent().apps.futureApp, { untouched: true });
    assert.deepEqual(store.readCurrent().domains.futureDomain, { untouched: true });
    assert.deepEqual(state.persisted.domains.futureDomain, { untouched: true });

    state.metadata.extensions.LittleWhiteBox.xiaobaiOs.domains.sample = 'invalid';
    assert.throws(() => store.readCurrent(), /xiaobaiOs\.domains\.sample:invalid/);
});

test('the root store publishes candidate and terminal write states to transient subscribers', async () => {
    const { state, store } = createHarness();
    const saveGate = deferred();
    const observed = [];
    state.save = async transaction => {
        await saveGate.promise;
        state.persisted = structuredClone(transaction.xiaobaiOs);
    };
    const unsubscribe = store.subscribe(change => {
        observed.push({ ...change, value: store.readCurrent()?.domains.sample });
    });

    const write = store.mutateCurrent(() => ({ next: root('candidate'), result: true }));
    await new Promise(resolve => globalThis.setImmediate(resolve));
    assert.deepEqual(observed, [{
        identityKey: state.identity.key,
        writeState: 'saving',
        value: 'candidate',
    }]);

    saveGate.resolve();
    await write;
    assert.deepEqual(observed.map(item => item.writeState), ['saving', 'ready']);
    assert.equal(observed.at(-1).value, 'candidate');

    unsubscribe();
    await store.mutateCurrent(() => ({ next: root('after-unsubscribe'), result: true }));
    assert.equal(observed.length, 2);
});
