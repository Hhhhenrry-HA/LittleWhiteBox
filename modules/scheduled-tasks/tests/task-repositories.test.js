import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';

import { allocateTaskNamesForDraft, parseTaskImport, prepareTasksForPersistence } from '../task-model.js';
import {
    CharacterTaskRepository,
    commitGlobalTaskRemoval,
    commitTaskMove,
    GlobalTaskRepository,
    PresetTaskRepository,
    ScheduledTaskCatalog,
    withTaskRepositoryReservations,
} from '../task-repositories.js';

const fixture = async (version, name) => JSON.parse(await readFile(
    new URL(`./fixtures/${version}/${name}.json`, import.meta.url),
    'utf8',
));

function repositoriesFromFixtures(globalFixture, characterFixture, presetFixture, loadCommands) {
    const characterTasks = characterFixture.data.extensions['xiaobaix-tasks'].tasks;
    const presetEntry = presetFixture.prompt_order.find(entry => entry.character_id === 100000);
    const presetTasks = presetEntry.xiaobai_ext.scheduledTasks;
    const repositories = [
        new GlobalTaskRepository({
            getTasks: () => globalFixture.settings.globalTasks,
            saveTasks: async () => {},
            loadCommands: loadCommands || (id => globalFixture['LittleWhiteBox_Tasks.json'][id] ?? null),
        }),
        new CharacterTaskRepository({
            getOwner: () => characterFixture.avatar,
            getTasks: () => characterTasks,
            saveTasks: async () => {},
        }),
        new PresetTaskRepository({
            getOwner: () => presetFixture.name,
            getTasks: () => presetTasks,
            saveTasks: async () => {},
        }),
    ];
    return { repositories, characterTasks, presetTasks };
}

for (const version of ['v2.5.0', 'v3.0.6']) {
    test(`${version} global, character and preset persisted shapes resolve without mutation`, async () => {
        const globalFixture = await fixture(version, 'global');
        const characterFixture = await fixture(version, 'character');
        const presetFixture = await fixture(version, 'preset');
        const { repositories, characterTasks, presetTasks } = repositoriesFromFixtures(
            globalFixture, characterFixture, presetFixture,
        );
        const before = structuredClone({ globalFixture, characterTasks, presetTasks });
        const catalog = new ScheduledTaskCatalog({ repositories });
        const records = catalog.records();

        assert.equal(records.length, 3);
        assert.deepEqual(records.map(record => record.ref.scope), ['global', 'character', 'preset']);
        const global = await catalog.resolve(records[0].ref);
        assert.equal(global.definition.commands, globalFixture['LittleWhiteBox_Tasks.json'][records[0].ref.id]);
        assert.deepEqual({ globalFixture, characterTasks, presetTasks }, before);
    });
}

test('strict global command read failures reject instead of becoming an empty script', async () => {
    const globalFixture = await fixture('v3.0.6', 'global');
    const characterFixture = await fixture('v3.0.6', 'character');
    const presetFixture = await fixture('v3.0.6', 'preset');
    const { repositories } = repositoriesFromFixtures(globalFixture, characterFixture, presetFixture, async () => {
        throw new Error('storage offline');
    });
    const catalog = new ScheduledTaskCatalog({ repositories });

    await assert.rejects(catalog.resolve(catalog.records()[0].ref), /storage offline/);

    repositories[0].loadCommands = async () => null;
    await assert.rejects(catalog.resolve(catalog.records()[0].ref), /脚本不存在/);
});

test('catalog resolution releases the caller when a storage read ignores abort', async () => {
    const globalFixture = await fixture('v3.0.6', 'global');
    const characterFixture = await fixture('v3.0.6', 'character');
    const presetFixture = await fixture('v3.0.6', 'preset');
    let settleRead;
    const stuckRead = new Promise(resolve => { settleRead = resolve; });
    const { repositories } = repositoriesFromFixtures(globalFixture, characterFixture, presetFixture, () => stuckRead);
    const catalog = new ScheduledTaskCatalog({ repositories });
    const controller = new AbortController();

    const resolution = catalog.resolve(catalog.records()[0].ref, { signal: controller.signal });
    controller.abort('chat_changed');
    await assert.rejects(resolution, error => error?.name === 'AbortError');

    settleRead('/eventually-finished');
    await new Promise(resolve => setTimeout(resolve, 0));
});

test('same display names remain separate runtime identities while lookup order stays repository order', async () => {
    const first = { id: 'first', name: '重复名', commands: '/first', interval: 1 };
    const second = { id: 'second', name: '重复名', commands: '/second', interval: 1 };
    const repositories = [
        new CharacterTaskRepository({
            getOwner: () => 'character-a', getTasks: () => [first], saveTasks: async () => {},
        }),
        new PresetTaskRepository({
            getOwner: () => 'preset-a', getTasks: () => [second], saveTasks: async () => {},
        }),
    ];
    const catalog = new ScheduledTaskCatalog({ repositories });
    const records = catalog.records();

    assert.notEqual(records[0].key, records[1].key);
    assert.equal(catalog.find(records[0].key).ref.scope, 'character');
    assert.equal(catalog.records().find(record => record.definition.name === '重复名').ref.id, 'first');
});

test('same-owner mutations serialize and each mutation reads the latest committed list', async () => {
    let releaseFirstSave;
    let markFirstSaveStarted;
    const firstSaveStarted = new Promise(resolve => { markFirstSaveStarted = resolve; });
    const firstSaveGate = new Promise(resolve => { releaseFirstSave = resolve; });
    const stores = new Map([['character-a', [{ id: 'base', name: 'base' }]]]);
    let saveCount = 0;
    const repository = new CharacterTaskRepository({
        getOwner: () => 'character-a',
        getTasks: owner => stores.get(owner) || [],
        saveTasks: async (tasks, owner) => {
            saveCount++;
            if (saveCount === 1) {
                markFirstSaveStarted();
                await firstSaveGate;
            }
            const committed = structuredClone(tasks);
            stores.set(owner, committed);
            return committed;
        },
    });

    const first = repository.mutate(draft => { draft.push({ id: 'first', name: 'first' }); });
    await firstSaveStarted;
    const second = repository.mutate(draft => { draft.push({ id: 'second', name: 'second' }); });
    await new Promise(resolve => setTimeout(resolve, 0));
    assert.equal(saveCount, 1);

    releaseFirstSave();
    await Promise.all([first, second]);
    assert.deepEqual(stores.get('character-a').map(task => task.id), ['base', 'first', 'second']);
});

test('mutation queues capture owner at submission and do not block another owner', async () => {
    let currentOwner = 'preset-a';
    let releasePresetA;
    let markPresetAStarted;
    const presetAStarted = new Promise(resolve => { markPresetAStarted = resolve; });
    const presetAGate = new Promise(resolve => { releasePresetA = resolve; });
    const stores = new Map([['preset-a', []], ['preset-b', []]]);
    const repository = new PresetTaskRepository({
        getOwner: () => currentOwner,
        getTasks: owner => stores.get(owner) || [],
        saveTasks: async (tasks, owner) => {
            if (owner === 'preset-a') {
                markPresetAStarted();
                await presetAGate;
            }
            const committed = structuredClone(tasks);
            stores.set(owner, committed);
            return committed;
        },
    });

    const saveA = repository.mutate(draft => { draft.push({ id: 'a' }); });
    await presetAStarted;
    currentOwner = 'preset-b';
    await repository.mutate(draft => { draft.push({ id: 'b' }); });
    assert.deepEqual(stores.get('preset-b').map(task => task.id), ['b']);
    assert.deepEqual(stores.get('preset-a'), []);

    releasePresetA();
    await saveA;
    assert.deepEqual(stores.get('preset-a').map(task => task.id), ['a']);
});

test('a failed mutation leaves committed state intact and does not break the owner queue', async () => {
    let committed = [{ id: 'base' }];
    let saveCount = 0;
    const repository = new GlobalTaskRepository({
        getTasks: () => committed,
        saveTasks: async tasks => {
            saveCount++;
            if (saveCount === 1) throw new Error('server rejected');
            committed = structuredClone(tasks);
            return committed;
        },
        loadCommands: async () => '',
    });

    const failed = repository.mutate(draft => { draft.push({ id: 'discarded' }); });
    const recovered = repository.mutate(draft => { draft.push({ id: 'kept' }); });
    await assert.rejects(failed, /server rejected/);
    await recovered;
    assert.deepEqual(committed.map(task => task.id), ['base', 'kept']);
});

test('cross-repository reservations block later source writes until a move finishes', async () => {
    let releaseTargetSave;
    const targetSaveGate = new Promise(resolve => { releaseTargetSave = resolve; });
    let targetSaveStarted;
    const targetStarted = new Promise(resolve => { targetSaveStarted = resolve; });
    let sourceTasks = [{ id: 'moving', name: 'before' }];
    let targetTasks = [];
    const source = new CharacterTaskRepository({
        getOwner: () => 'character-a',
        getTasks: () => sourceTasks,
        saveTasks: async tasks => { sourceTasks = structuredClone(tasks); return sourceTasks; },
    });
    const target = new PresetTaskRepository({
        getOwner: () => 'preset-a',
        getTasks: () => targetTasks,
        saveTasks: async tasks => {
            targetSaveStarted();
            await targetSaveGate;
            targetTasks = structuredClone(tasks);
            return targetTasks;
        },
    });

    const move = withTaskRepositoryReservations([
        { repository: source, owner: 'character-a' },
        { repository: target, owner: 'preset-a' },
    ], () => commitTaskMove({
        saveTarget: () => target.mutateReserved(draft => { draft.push(structuredClone(sourceTasks[0])); }, { owner: 'preset-a' }),
        deleteSource: () => source.mutateReserved(draft => { draft.splice(0, 1); }, { owner: 'character-a' }),
    }));
    await targetStarted;

    let laterWriteStarted = false;
    const laterWrite = source.mutate(draft => {
        laterWriteStarted = true;
        if (!draft[0]) throw new Error('source moved');
        draft[0].name = 'after';
    }, { owner: 'character-a' });
    await new Promise(resolve => setTimeout(resolve, 0));
    assert.equal(laterWriteStarted, false);

    releaseTargetSave();
    await move;
    await assert.rejects(laterWrite, /source moved/);
    assert.deepEqual(sourceTasks, []);
    assert.deepEqual(targetTasks, [{ id: 'moving', name: 'before' }]);
});

test('tagged import envelopes preserve extension fields and apply one duplicate-name rule', async () => {
    for (const version of ['v2.5.0', 'v3.0.6']) {
        const input = await fixture(version, 'import');
        let sequence = 0;
        const parsed = parseTaskImport(input, {
            createId: () => `new-${++sequence}`,
            now: () => new Date('2026-09-03T00:00:00.000Z'),
            existingNames: ['导入任务'],
        });

        assert.equal(parsed.type, input.type);
        assert.equal(parsed.tasks[0].id, 'new-1');
        assert.equal(parsed.tasks[0].name, '导入任务1');
        assert.deepEqual(parsed.tasks[0].x, input.tasks[0].x);
        assert.deepEqual(parsed.tasks[0].customPayload, input.tasks[0].customPayload);
        assert.equal(parsed.tasks[0].createdAt, input.tasks[0].createdAt);
    }
});

test('final name allocation uses the latest draft and can exclude the task being edited', () => {
    const draft = [{ id: 'a', name: 'Alpha' }, { id: 'b', name: 'Beta' }];
    assert.deepEqual(allocateTaskNamesForDraft([
        { id: 'c', name: 'Alpha' },
        { id: 'd', name: 'Alpha' },
    ], draft).map(task => task.name), ['Alpha1', 'Alpha2']);
    assert.deepEqual(allocateTaskNamesForDraft([
        { id: 'a', name: 'Alpha' },
    ], draft, { existingNames: ['Gamma'], excludedIndexes: [0] }).map(task => task.name), ['Alpha']);
});

test('legacy tasks receive an ID only at the persistence boundary', async () => {
    const character = await fixture('v2.5.0', 'character');
    const legacyTasks = character.data.extensions['xiaobaix-tasks'].tasks;
    assert.equal(legacyTasks[0].id, undefined);

    const persisted = prepareTasksForPersistence(legacyTasks, () => 'assigned-id');
    assert.equal(persisted[0].id, 'assigned-id');
    assert.equal(legacyTasks[0].id, undefined);
    assert.deepEqual(persisted[0].x, legacyTasks[0].x);
});

test('target failure leaves source untouched; source failure retains the committed duplicate', async () => {
    const source = [{ id: 'source', commands: '/keep' }];
    const target = [];
    let deleteCalls = 0;

    await assert.rejects(commitTaskMove({
        saveTarget: async () => { throw new Error('target failed'); },
        deleteSource: async () => { deleteCalls++; source.length = 0; },
    }), /target failed/);
    assert.equal(deleteCalls, 0);
    assert.deepEqual(source, [{ id: 'source', commands: '/keep' }]);
    assert.deepEqual(target, []);

    const result = await commitTaskMove({
        saveTarget: async () => { target.push(structuredClone(source[0])); },
        deleteSource: async () => { throw new Error('source failed'); },
    });
    assert.equal(result.duplicateRetained, true);
    assert.match(result.sourceError.message, /source failed/);
    assert.deepEqual(source, [{ id: 'source', commands: '/keep' }]);
    assert.deepEqual(target, [{ id: 'source', commands: '/keep' }]);
});

test('global removal commits metadata before script cleanup without reviving a deleted task', async () => {
    const operations = [];
    await assert.rejects(commitGlobalTaskRemoval({
        saveMetadata: async () => { operations.push('metadata'); throw new Error('metadata failed'); },
        deleteCommands: async () => { operations.push('commands'); },
    }), /metadata failed/);
    assert.deepEqual(operations, ['metadata']);

    operations.length = 0;
    const cleanupError = new Error('commands failed');
    const result = await commitGlobalTaskRemoval({
        saveMetadata: async () => { operations.push('metadata'); },
        deleteCommands: async () => { operations.push('commands'); throw cleanupError; },
    });
    assert.deepEqual(operations, ['metadata', 'commands']);
    assert.equal(result.removed, true);
    assert.equal(result.cleanupError, cleanupError);
});
