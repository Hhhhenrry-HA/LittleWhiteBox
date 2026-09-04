import assert from 'node:assert/strict';
import test from 'node:test';

import { XiaobaiOsPartitionRegistry } from '../kernel/partition-registry.js';
import { createTransactionCoordinator } from '../kernel/transaction-coordinator.js';

const binding = { kind: 'character', ownerLocator: 'avatar.png', chatId: 'chat-a' };

function partition(key, { invalid = false } = {}) {
    return {
        key,
        ownerId: key,
        schemaVersion: 1,
        parse(value) {
            if (invalid || !value || value.schemaVersion !== 1 || typeof value.value !== 'number') {
                return { ok: false, error: { code: 'partition_invalid', message: `${key} is invalid` } };
            }
            return { ok: true, value };
        },
        serialize: value => value,
        createInitial: () => ({ schemaVersion: 1, value: 0 }),
    };
}

function envelope(partitions, revision = 0, commitId = `commit_${revision}`) {
    return { formatVersion: 1, osId: 'os_1', binding, revision, commitId, partitions };
}

function harness(initial = envelope({ good: { schemaVersion: 1, value: 1 } })) {
    const state = {
        capture: {
            identityKey: 'character:avatar.png:chat-a',
            binding,
            reference: { formatVersion: 1, osId: 'os_1' },
        },
        persisted: structuredClone(initial),
        reads: 0,
        writes: 0,
        installs: 0,
        references: [],
        commandIds: 0,
        replace: null,
    };
    const storage = {
        async read(osId) {
            state.reads++;
            assert.equal(osId, state.persisted?.osId ?? 'os_1');
            return structuredClone(state.persisted);
        },
        async replace(input) {
            state.writes++;
            if (state.replace) { return await state.replace(input); }
            state.persisted = structuredClone(input.candidate);
            return { status: 'confirmed' };
        },
        async delete() { return 'deleted'; },
    };
    const chatReferences = {
        capture: () => structuredClone(state.capture),
        isCurrent: captured => captured.identityKey === state.capture.identityKey,
        async install(_captured, reference) {
            state.installs++;
            state.capture.reference = reference;
            return { status: 'confirmed' };
        },
        async recordReference(osId, recordedBinding) {
            state.references.push({ osId, binding: structuredClone(recordedBinding) });
        },
    };
    const registry = new XiaobaiOsPartitionRegistry();
    const ids = ['new_os', 'new_commit_1', 'new_commit_2', 'new_commit_3'];
    const coordinator = createTransactionCoordinator({
        storage,
        partitions: registry,
        chatReferences,
        createId: () => ids.shift() ?? `generated_${++state.commandIds}`,
    });
    return { state, storage, chatReferences, registry, coordinator };
}

test('a malformed unrelated partition is never parsed or normalized by another owner', async () => {
    const badRaw = { malformed: true, nested: ['keep', 1] };
    const testHarness = harness(envelope({
        good: { schemaVersion: 1, value: 1 },
        bad: badRaw,
        unknown: { exact: true },
    }));
    const good = partition('good');
    const bad = partition('bad', { invalid: true });
    testHarness.registry.register(good);
    testHarness.registry.register(bad);
    const goodStore = testHarness.coordinator.createScopedStore(good);

    const result = await goodStore.transact(transaction => {
        transaction.replace({ ...transaction.current, value: 2 });
        return 'updated';
    });

    assert.equal(result.status, 'confirmed');
    assert.equal(testHarness.state.writes, 1);
    assert.deepEqual(testHarness.state.persisted.partitions.bad, badRaw);
    assert.deepEqual(testHarness.state.persisted.partitions.unknown, { exact: true });
    await assert.rejects(testHarness.coordinator.createScopedStore(bad).read(), /bad is invalid/);
});

test('a lifecycle-resolved sidecar installs without a duplicate storage read', async () => {
    const testHarness = harness();
    const good = partition('good');
    testHarness.registry.register(good);
    const store = testHarness.coordinator.createScopedStore(good);

    await testHarness.coordinator.installResolvedEnvelope(structuredClone(testHarness.state.persisted));

    assert.equal(testHarness.state.reads, 0);
    assert.equal(store.peekCurrent().value.value, 1);
    assert.equal(testHarness.coordinator.getFileState(), 'ready');
});

test('an overtaken lifecycle read cannot roll back a newer confirmed projection', async () => {
    const testHarness = harness();
    const good = partition('good');
    testHarness.registry.register(good);
    const store = testHarness.coordinator.createScopedStore(good);
    const stale = structuredClone(testHarness.state.persisted);
    await testHarness.coordinator.installResolvedEnvelope(stale);

    const result = await store.transact(transaction => {
        transaction.replace({ schemaVersion: 1, value: 2 });
    });
    assert.equal(result.status, 'confirmed');
    await testHarness.coordinator.installResolvedEnvelope(stale);

    assert.equal(store.peekCurrent().value.value, 2);
    assert.equal(store.peekCurrent().envelopeRevision, 1);
    assert.equal(testHarness.coordinator.getFileState(), 'ready');
});

test('a lifecycle refresh cannot replace the confirmed projection while a prepared commit is frozen', async () => {
    const testHarness = harness();
    const good = partition('good');
    testHarness.registry.register(good);
    const store = testHarness.coordinator.createScopedStore(good);
    await testHarness.coordinator.installResolvedEnvelope(structuredClone(testHarness.state.persisted));
    testHarness.state.replace = async () => ({
        status: 'unconfirmed',
        observed: structuredClone(testHarness.state.persisted),
    });

    const result = await store.transact(transaction => {
        transaction.replace({ schemaVersion: 1, value: 2 });
    });
    assert.equal(result.status, 'unconfirmed');
    await testHarness.coordinator.installResolvedEnvelope(envelope({
        good: { schemaVersion: 1, value: 99 },
    }, 1, 'unrelated_commit'));

    assert.equal(store.peekCurrent().value.value, 1);
    assert.equal(testHarness.coordinator.getFileState(), 'unconfirmed');
});

test('a lifecycle result that reaches the coordinator after chat switch is discarded quietly', async () => {
    const testHarness = harness();
    const good = partition('good');
    testHarness.registry.register(good);
    const stale = structuredClone(testHarness.state.persisted);

    const installing = testHarness.coordinator.installResolvedEnvelope(stale);
    testHarness.state.capture = {
        identityKey: 'character:avatar.png:chat-b',
        binding: { ...binding, chatId: 'chat-b' },
        reference: null,
    };
    await installing;

    assert.equal(testHarness.coordinator.getFileState(), 'ready');
    assert.equal(testHarness.coordinator.createScopedStore(good).peekCurrent(), null);
});

test('each transaction strongly reads and two queued writes advance from the latest revision', async () => {
    const testHarness = harness();
    const good = partition('good');
    testHarness.registry.register(good);
    const store = testHarness.coordinator.createScopedStore(good);
    const seen = [];

    const first = store.transact(async transaction => {
        seen.push(transaction.current.value);
        await new Promise(resolve => setTimeout(resolve, 5));
        transaction.replace({ schemaVersion: 1, value: transaction.current.value + 1 });
        return 'first';
    });
    const second = store.transact(transaction => {
        seen.push(transaction.current.value);
        transaction.replace({ schemaVersion: 1, value: transaction.current.value + 1 });
        return 'second';
    });

    assert.equal((await first).status, 'confirmed');
    assert.equal((await second).status, 'confirmed');
    assert.deepEqual(seen, [1, 2]);
    assert.equal(testHarness.state.persisted.revision, 2);
    assert.equal(testHarness.state.persisted.partitions.good.value, 3);
    assert.equal(testHarness.state.reads, 2);
    assert.equal(testHarness.state.writes, 2);
});

test('unconfirmed retry reuses the prepared candidate and never executes the command twice', async () => {
    const testHarness = harness();
    const good = partition('good');
    testHarness.registry.register(good);
    const store = testHarness.coordinator.createScopedStore(good);
    let commandRuns = 0;
    let candidate;
    testHarness.state.replace = async input => {
        candidate = structuredClone(input.candidate);
        return { status: 'unconfirmed', observed: structuredClone(testHarness.state.persisted) };
    };

    const result = await store.transact(transaction => {
        commandRuns++;
        transaction.replace({ schemaVersion: 1, value: 9 });
        return { randomResult: 42 };
    });
    assert.equal(result.status, 'unconfirmed');
    assert.equal(commandRuns, 1);
    assert.equal(testHarness.coordinator.getFileState(), 'unconfirmed');

    testHarness.state.replace = async input => {
        assert.deepEqual(input.candidate, candidate);
        testHarness.state.persisted = structuredClone(input.candidate);
        return { status: 'confirmed' };
    };
    assert.deepEqual(await testHarness.coordinator.retryPending(), { status: 'confirmed' });
    assert.equal(commandRuns, 1);
    assert.equal(testHarness.state.persisted.partitions.good.value, 9);
});

test('ordinary reads cannot unlock an unconfirmed write or admit a second transaction', async () => {
    const testHarness = harness();
    const good = partition('good');
    testHarness.registry.register(good);
    const store = testHarness.coordinator.createScopedStore(good);
    testHarness.state.replace = async () => ({
        status: 'unconfirmed',
        observed: structuredClone(testHarness.state.persisted),
    });

    assert.equal((await store.transact(transaction => {
        transaction.replace({ schemaVersion: 1, value: 2 });
        return true;
    })).status, 'unconfirmed');
    assert.equal((await store.read()).value.value, 1);
    await testHarness.coordinator.refresh();
    assert.equal(testHarness.coordinator.getFileState(), 'unconfirmed');

    const blocked = await store.transact(transaction => {
        transaction.replace({ schemaVersion: 1, value: 3 });
        return true;
    });
    assert.equal(blocked.status, 'failed');
    assert.equal(blocked.error.code, 'storage_unconfirmed');
    assert.equal(testHarness.state.writes, 1);
});

test('a partition parse failure stays local and does not mark the sidecar failed', async () => {
    const testHarness = harness(envelope({ bad: { malformed: true } }));
    const bad = partition('bad', { invalid: true });
    testHarness.registry.register(bad);
    await assert.rejects(testHarness.coordinator.createScopedStore(bad).read(), /bad is invalid/);
    assert.equal(testHarness.coordinator.getFileState(), 'ready');
});

test('strong reads reject a sidecar bound to another chat', async () => {
    const foreign = envelope({ good: { schemaVersion: 1, value: 1 } });
    foreign.binding = { ...binding, chatId: 'chat-b' };
    const testHarness = harness(foreign);
    const good = partition('good');
    testHarness.registry.register(good);
    await assert.rejects(
        testHarness.coordinator.createScopedStore(good).read(),
        error => error.failure?.code === 'storage_binding_mismatch',
    );
    assert.equal(testHarness.coordinator.getFileState(), 'failed');
});

test('a first persistent transaction saves the sidecar before installing its reference', async () => {
    const testHarness = harness(null);
    testHarness.state.capture.reference = null;
    const events = [];
    testHarness.storage.read = async () => { throw new Error('no read should occur without a reference'); };
    testHarness.storage.replace = async input => {
        events.push('sidecar');
        testHarness.state.persisted = structuredClone(input.candidate);
        return { status: 'confirmed' };
    };
    testHarness.chatReferences.install = async (_capture, reference) => {
        events.push('reference');
        testHarness.state.capture.reference = reference;
        return { status: 'confirmed' };
    };
    const good = partition('good');
    testHarness.registry.register(good);

    const result = await testHarness.coordinator.createScopedStore(good).transact(transaction => {
        const initial = transaction.currentOrInitial();
        transaction.replace({ ...initial, value: 5 });
        return true;
    });

    assert.equal(result.status, 'confirmed');
    assert.deepEqual(events, ['sidecar', 'reference']);
    assert.equal(testHarness.state.persisted.revision, 0);
    assert.equal(testHarness.state.capture.reference.osId, testHarness.state.persisted.osId);
    assert.deepEqual(testHarness.state.references, [{ osId: 'new_os', binding }]);
});

test('a slow best-effort index cannot delay a confirmed first transaction', async () => {
    const testHarness = harness(null);
    testHarness.state.capture.reference = null;
    testHarness.storage.read = async () => { throw new Error('no read should occur without a reference'); };
    testHarness.chatReferences.recordReference = () => new Promise(() => undefined);
    const good = partition('good');
    testHarness.registry.register(good);

    const transaction = testHarness.coordinator.createScopedStore(good).transact(context => {
        context.replace({ schemaVersion: 1, value: 5 });
        return true;
    });
    const result = await Promise.race([
        transaction,
        new Promise(resolve => setTimeout(() => resolve({ status: 'index-blocked-transaction' }), 100)),
    ]);

    assert.equal(result.status, 'confirmed');
});

test('a retained definite failure freezes writes and retries the exact prepared candidate', async () => {
    const testHarness = harness();
    const good = partition('good');
    testHarness.registry.register(good);
    const store = testHarness.coordinator.createScopedStore(good);
    let commandRuns = 0;
    let candidate;
    testHarness.state.replace = async input => {
        candidate = structuredClone(input.candidate);
        return { status: 'failed', error: { code: 'rejected', message: 'rejected', retryable: true } };
    };

    const failed = await store.transact(transaction => {
        commandRuns += 1;
        transaction.replace({ schemaVersion: 1, value: 8 });
        return 'prepared';
    }, { retainFailedCandidate: true });
    assert.equal(failed.status, 'failed');
    assert.equal(testHarness.coordinator.getFileState(), 'failed');
    assert.equal(testHarness.coordinator.hasPendingCommit(), true);
    assert.equal(testHarness.coordinator.hasPendingCommit('good'), true);
    assert.equal(testHarness.coordinator.hasPendingCommit('another-partition'), false);

    const blocked = await store.transact(transaction => {
        commandRuns += 1;
        transaction.replace({ schemaVersion: 1, value: 9 });
    });
    assert.equal(blocked.status, 'failed');
    assert.equal(blocked.error.code, 'rejected');
    assert.equal(commandRuns, 1);

    testHarness.state.replace = async () => { throw new Error('retry transport failed'); };
    const retryFailure = await testHarness.coordinator.retryPending();
    assert.equal(retryFailure.status, 'failed');
    assert.equal(testHarness.coordinator.getFileState(), 'failed');
    assert.equal(testHarness.coordinator.hasPendingCommit(), true);

    testHarness.state.replace = async input => {
        assert.deepEqual(input.candidate, candidate);
        testHarness.state.persisted = structuredClone(input.candidate);
        return { status: 'confirmed' };
    };
    assert.deepEqual(await testHarness.coordinator.retryPending(), { status: 'confirmed' });
    assert.equal(commandRuns, 1);
    assert.equal(testHarness.coordinator.hasPendingCommit(), false);
    assert.equal(testHarness.state.persisted.partitions.good.value, 8);
});

test('commit guard rejection performs no upload', async () => {
    const testHarness = harness();
    const good = partition('good');
    testHarness.registry.register(good);
    const result = await testHarness.coordinator.createScopedStore(good).transact(transaction => {
        transaction.replace({ schemaVersion: 1, value: 2 });
        return true;
    }, { commitGuard: () => false });
    assert.equal(result.status, 'failed');
    assert.equal(result.error.code, 'commit_guard_rejected');
    assert.equal(testHarness.state.writes, 0);
});
