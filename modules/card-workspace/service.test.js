import 'fake-indexeddb/auto';
import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { runInNewContext } from 'node:vm';
import db from '../assistant/shared/session-db.js';
import * as workspace from './workspace.js';
import * as files from './files.js';
import * as documents from './item-document.js';
import { equalText } from './comparison.js';
import { COPY } from './copy.js';
import { SET_CARD_AVATAR_ACTION } from './assistant-contract.js';
import { cardFileDirectory } from './display.js';
import { ASSET_FIELD } from './asset-task.js';
import { createCardLifecycle } from './lifecycle.js';
import { workspaceRepository } from '../assistant/shared/workspace-repository.js';
import { applyWorkspaceObservations, buildWorkspacePreconditions, findWorkspaceConflicts } from '../assistant/shared/workspace-preconditions.js';
import { createLocalSourceRecord, findLocalDirectoryByPath, flattenLocalSourceFiles, isLocalSourceFileModified, normalizeLocalSourceFile, removeLocalSourcePath, upsertLocalSourceFile } from '../assistant/shared/local-workspace-kernel.js';
import { CARD_EXTENSION, FUNCTION_DIRECTORY } from '../variables/state3/definition/format.js';

const root = files.rootFor('fixture.png'), path = root + files.DESIGN_FILE;
async function edit(content, target = path) {
    const args = { path: target, content };
    await workspaceRepository.commitWorkspaceMutation({ name: 'Write', args,
        preconditions: buildWorkspacePreconditions('Write', args, (await workspaceRepository.readWorkspace()).localSources),
        execute: async sources => ({ result: { ok: true }, nextSources: upsertLocalSourceFile(sources, target, content).nextSources }) });
}
function harness(readDesign, saveFile, data = {}, host = {}) {
    const source = readFileSync(new URL('./service.js', import.meta.url), 'utf8').replace(/^import .*;\r?\n/gm, '').replace(/^export /gm, '');
    return runInNewContext(source + '\nObject.assign(runCardFiles, { prepareCardReload, applyCardReload })', { ...workspace, ...files, ...documents, equalText, COPY, Set, SET_CARD_AVATAR_ACTION,
        saveFile, flattenLocalSourceFiles, isLocalSourceFileModified, normalizeLocalSourceFile,
        currentCard: () => ({ avatar: 'fixture.png', name: 'fixture' }),
        readCharacter: async () => ({ data }), linkedBooks: () => [], readDesign,
        cardFileDirectory, cardLifecycle: createCardLifecycle(), ...host });
}

// Lost work: a deletion survives cancel/reopen, while a newly published
// sibling or a deletion already saved on the card must not be called a draft.
test('reload distinguishes a local deletion from a server addition and keeps unrelated reference folders', async () => {
    await db.delete(); await db.open();
    try {
        const bundle = { definition: {}, functions: { heal: 'old' } };
        const data = { name: 'fixture', extensions: { [CARD_EXTENSION]: bundle } };
        let books = ['Old', 'WithNotes'];
        const run = harness(async () => '', null, data, { linkedBooks: () => books,
            readBook: async () => ({ entries: { 1: { comment: 'entry', content: 'entry' } } }) });
        await run({ action: 'open' });
        const fn = root + FUNCTION_DIRECTORY + 'heal.js', desc = root + 'description.md';
        const remove = async path => {
            const args = { path };
            await workspaceRepository.commitWorkspaceMutation({ name: 'Delete', args, preconditions: await workspace.observeTree(path),
                execute: async sources => ({ result: { ok: true }, nextSources: removeLocalSourcePath(sources, args.path).nextSources }) });
        };
        await remove(fn); await remove(path); await edit('draft', desc);
        await edit('private note', root + 'world_book/WithNotes/notes.txt');
        bundle.functions.newOnServer = 'new'; books = ['New'];
        db.close(); await db.open();
        await run({ action: 'open' });
        assert.equal((await workspace.readFiles()).some(file => file.path === path), false);
        for (let attempt = 0; attempt < 2; attempt++) {
            const plan = await run.prepareCardReload();
            assert.deepEqual(Array.from(plan.drafts, f => f.path).sort(), [fn, path, desc].sort());
            assert.equal((await workspace.readFiles()).some(f => f.path === fn), false);
            if (attempt) await run.applyCardReload(plan);
        }
        const latest = await workspaceRepository.readWorkspace();
        assert.equal(findLocalDirectoryByPath(latest.localSources, root + 'world_book/Old/'), null);
        assert.ok(findLocalDirectoryByPath(latest.localSources, root + 'world_book/WithNotes/'));
        assert.equal(flattenLocalSourceFiles(latest.localSources).find(f => f.path === fn).content, 'old');
        assert.deepEqual(latest.deletedCardFiles ?? [], []);

        await remove(fn); delete bundle.functions.heal;
        const agreed = await run.prepareCardReload();
        assert.equal(agreed.drafts.length, 0);
        await run.applyCardReload(agreed);
        bundle.functions.heal = 'added again';
        assert.equal((await run.prepareCardReload()).drafts.length, 0);
    } finally { await db.delete(); }
});

// Cost: lost work or the model using a stale card. A preview never writes;
// only confirmed reload replaces card files in place and keeps other files.
test('manual reload replaces just the card projection, and identifies drafts it will discard', async () => {
    await db.delete(); await db.open();
    try {
        let data = { name: 'Old name', description: 'old', alternate_greetings: ['old opening'] };
        let book = { entries: { 1: { comment: 'old entry', content: 'old' } } };
        const run = harness(async () => '', null, {}, {
            readCharacter: async () => ({ data }), linkedBooks: () => ['Lore'],
            async readBook() { if (!book) throw new Error('book unavailable'); return book; },
        });
        const initial = await run({ action: 'open' });
        const oldEntry = initial.files.find(file => file.kind === 'world').path;
        const description = root + 'description.md', opening = root + 'message/1.md', newDraft = root + 'world_book/Lore/draft.md';
        const reference = root + 'reference.md', other = files.rootFor('other.png') + 'description.md';
        await edit('draft description', description);
        await edit(documents.serializeItemDocument('world', { comment: 'draft', content: 'draft' }), newDraft);
        await edit('reference material', reference);
        await workspace.storeFiles([{ path: other, content: 'other card' }]);
        data = { name: 'New name', description: 'latest' };
        const before = await workspace.readFiles();
        book = null;
        await assert.rejects(run.prepareCardReload(), /book unavailable/);
        assert.deepEqual(await workspace.readFiles(), before);
        book = { entries: { 2: { comment: 'new entry', content: 'latest lore' } } };
        const preview = await run.prepareCardReload();
        assert.equal(preview.loaded, true);
        assert.equal(preview.selected.name, 'New name');
        assert.deepEqual(Array.from(preview.drafts, file => file.path).sort(), [description, newDraft].sort());
        assert.deepEqual(await workspace.readFiles(), before);
        assert.equal((await run({ action: 'open' })).reused, true);
        assert.deepEqual(await workspace.readFiles(), before);
        const result = await run.applyCardReload(preview);
        assert.equal(result.root, initial.root);
        const current = new Map((await workspace.readFiles()).map(file => [file.path, file]));
        assert.equal(current.get(description).content, 'latest');
        assert.equal(current.get(description).originalContent, 'latest');
        assert.equal(current.get(reference).content, 'reference material');
        assert.equal(current.get(other).content, 'other card');
        for (const removed of [opening, oldEntry, newDraft]) assert.equal(current.has(removed), false);
        const world = result.files.filter(file => file.kind === 'world');
        assert.equal(world.length, 1);
        assert.match(current.get(world[0].path).content, /latest lore/);
    } finally { await db.delete(); }
});

test('first open and reopening a damaged card identify its file and key without exporting the bad payload', async () => {
    await db.delete(); await db.open();
    try {
        const damaged = { key: 'banner', mime: 'image/png', size: 1, base64: 'private-payload' };
        const run = harness(async () => '', null, { description: 'valid', extensions: { 'xiaobaix-tasks': { tasks: [
            { id: 'fixture', name: 'images', commands: '', x: { [ASSET_FIELD]: [damaged] } },
        ] } } });
        for (const reused of [false, true]) {
            const result = await run({ action: 'open' });
            assert.equal(result.reused, reused);
            assert.equal(result.warnings[0].path, root + 'tasks/images.md');
            assert.ok(result.warnings[0].message.includes('banner'));
            const local = await workspace.readFiles();
            assert.equal(local.find(file => file.path.endsWith('/description.md')).content, 'valid');
            assert.ok(!JSON.stringify(local).includes(damaged.base64));
        }
    } finally { await db.delete(); }
});

// A committed tool save permits the next edit without Read; an unseen human draft stays protected.
for (const timing of ['none', 'before', 'during', 'after']) test('same-run CardFiles receipt; editor change: ' + timing, async () => {
    await db.delete(); await db.open();
    try {
        const regex = root + 'regex/rule.md', renamed = root + 'regex/updated.md';
        const document = (name, body) => documents.serializeItemDocument('regex', { id: '1', scriptName: name, replaceString: body });
        await workspace.storeFiles([{ path, content: 'A' }, { path: regex, content: document('rule', 'A') }]);
        await edit('B');
        let baseline = (await workspaceRepository.readWorkspace()).localSources;
        if (timing === 'before') await edit('D');
        const run = harness(null, async (target, file) => {
            if (timing === 'during' && file.path === path) await edit('D');
            return { content: target.kind === 'regex' ? document('updated', 'A') : file.content };
        });
        const result = await run({ action: 'save', paths: [path, regex, root + 'missing.md'] }, {
            onWorkspaceObserved: changes => { baseline = applyWorkspaceObservations(baseline, changes); },
        });
        assert.deepEqual(Array.from(result.results, r => r.saved).sort(), [false, true, true]);
        if (timing === 'after') await edit('D');
        const actual = (await workspaceRepository.readWorkspace()).localSources;
        function conflicts(target) {
            const args = { files: [{ path: target, edits: [{ oldString: 'B', newString: 'C' }] }] };
            return findWorkspaceConflicts('apply_patch', args, buildWorkspacePreconditions('apply_patch', args, baseline), actual);
        }
        assert.deepEqual(conflicts(path), timing === 'none' ? [] : [path]);
        assert.deepEqual(conflicts(renamed), []);
        assert.deepEqual(conflicts(regex), []);
        assert.equal((await workspace.readFiles()).find(f => f.path === path).content, timing === 'none' ? 'B' : 'D');
    } finally { await db.delete(); }
});

test('batched saves advance only known drafts, respecting occupied names and earlier renames', () => {
    const dir = root + 'regex/';
    const file = (name, content) => normalizeLocalSourceFile({ path: dir + name, content, originalContent: null });
    const a = file('a.md', 'A'), b = file('b.md', 'B'), c = file('c.md', 'C');
    const base = [createLocalSourceRecord({ sourceId: 'cards', rootPath: 'local/cards/',
        files: [a, b, c], directories: [dir.slice('local/cards/'.length) + 'occupied.md'] })];
    const receipt = (old, saved) => ({ path: saved.path, scope: 'entry', submitted: old, expected: { kind: 'file', file: saved } });
    const renamed = file('free.md', 'saved B'), reused = file('b.md', 'saved A');
    const updated = { ...c, originalContent: c.content, originalGroupHash: 'saved' };
    const result = applyWorkspaceObservations(base, [
        receipt(a, file('occupied.md', 'blocked by directory')), receipt(a, file('b.md', 'blocked by file')),
        receipt(b, renamed), receipt(a, reused), receipt({ ...renamed, content: 'unseen' }, file('free.md', 'unseen')),
        receipt(c, updated),
    ]);
    const byPath = files => Object.fromEntries(files.map(f => [f.path, f]));
    assert.deepEqual(byPath(result[0].files), byPath([renamed, reused, updated]));
    assert.deepEqual(byPath(base[0].files), byPath([a, b, c]));
});

// Acceptance contracts (cost: invisible draft overwrite or stale design decisions):
// - Opening updates a clean design, preserves a draft, and reports remote conflicts.
// - A create/edit during a remote read is never adopted as permission to overwrite.
test('reopening refreshes clean designs and preserves dirty drafts and their baselines', async () => {
    await db.delete(); await db.open();
    try {
        let remote = 'v1', reads = 0;
        const run = harness(async () => { reads++; return remote; });
        await run({ action: 'open' });
        remote = 'v2';
        await run({ action: 'open' });
        assert.equal((await workspace.readFiles()).find(file => file.path === path).content, 'v2');
        await edit('draft');
        await run({ action: 'open' });
        remote = 'v3';
        const reopened = await run({ action: 'open' });
        assert.equal(reopened.warnings[0].message, COPY.designDraftConflict);
        assert.ok(reopened.files.some(file => file.path === root + 'description.md'));
        const draft = (await workspace.readFiles()).find(file => file.path === path);
        assert.equal(draft.content, 'draft');
        assert.equal(draft.originalContent, 'v2');
        assert.equal(reads, 4);
        remote = null;
        assert.equal((await run({ action: 'open' })).warnings[0].message, COPY.designDraftConflict);
        await workspace.storeFiles([{ path, content: 'v2' }]);
        await run({ action: 'open' });
        assert.equal((await workspace.readFiles()).find(file => file.path === path).content, '');
    } finally { await db.delete(); }
});

test('initial import and existing-folder design reads never overwrite concurrent editor work', async () => {
    for (const existing of [false, true]) {
        await db.delete(); await db.open();
        try {
            if (existing) await workspace.storeFiles([{ path: root + 'description.md', content: 'kept' }]);
            const started = Promise.withResolvers(), release = Promise.withResolvers();
            const run = harness(async () => { started.resolve(); await release.promise; return 'server'; });
            const opening = run({ action: 'open' });
            await started.promise;
            await edit('created during read');
            release.resolve();
            await assert.rejects(opening, { message: COPY.designWorkspaceChanged });
            db.close(); await db.open();
            const draft = (await workspace.readFiles()).find(file => file.path === path);
            assert.equal(draft.content, 'created during read');
            assert.equal(draft.originalContent, null);
        } finally { await db.delete(); }
    }
});
