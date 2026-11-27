import { currentCard, linkedBooks, readCharacter, readBook, readTarget, refreshVariableFiles, saveFile } from './host.js';
import { readFiles, storeFiles, observePaths, observeCardReload, storeItemReceipt } from './workspace.js';
import { cardFiles, locateFile, rootFor, DESIGN_FILE } from './files.js';
import { COPY } from './copy.js';
import { ITEM_KINDS, resolveItemTarget, parseItemDocument } from './item-document.js';
import { cardFileDirectory } from './display.js';
import { readDesign } from './design.js';
import { cardLifecycle } from './lifecycle.js';
import { equalText } from './comparison.js';
import { variableFileGroup, variableGroupChanged } from '../variables/state3/definition/card-files.js';
import { flattenLocalSourceFiles, isLocalSourceFileModified, normalizeLocalSourceFile } from '../assistant/shared/local-workspace-kernel.js';
import { workspaceRepository } from '../assistant/shared/workspace-repository.js';
import { createCardAssetActions } from './asset-actions.js';
import { SET_CARD_AVATAR_ACTION } from './assistant-contract.js';
import { setCardAvatar } from './avatar.js';

function openResult(selected, root, files, reused, warnings = []) {
    const directory = cardFileDirectory(files, { onAssetIssue: issue => warnings.push({ path: issue.taskPath, message: issue.error }) });
    return { root, avatar: selected.avatar, name: selected.name, files: directory, reused, ...(warnings.length ? { warnings } : {}) };
}

export async function handleAssistantCardAssets(args, options = {}) {
    const { avatar } = currentCard();
    const run = createCardAssetActions({ repository: workspaceRepository, readCharacter });
    return cardLifecycle.run([avatar], () => {
        if (currentCard().avatar !== avatar) throw new Error(COPY.changedCard);
        return run(args, avatar, options);
    });
}

export async function runCardFiles(args, options = {}) {
    if (args.action === SET_CARD_AVATAR_ACTION) {
        const { avatar, sourcePath } = args;
        if (typeof avatar !== 'string' || !avatar) throw new Error(COPY.avatarTarget);
        return cardLifecycle.run([avatar], () => setCardAvatar(avatar, sourcePath, options.signal));
    }
    if (args.action === 'open') {
        const selected = currentCard();
        return cardLifecycle.run([selected.avatar], () => openFiles(selected, options.signal));
    }
    if (!['save', 'refresh'].includes(args.action)) throw new Error(COPY.unsupported);
    const paths = selectedPaths(args.paths), avatars = paths.map(path => locateFile(path)?.avatar).filter(Boolean);
    return cardLifecycle.run(avatars, () => args.action === 'save' ? saveFiles(paths, options) : refreshFiles(paths, options.signal));
}

async function openFiles(selected, signal) {
    const avatar = selected.avatar, root = rootFor(avatar);
    const { observed, entry, deleted } = await observeCardReload(root, root + DESIGN_FILE);
    if (observed.find(item => item.scope === 'tree').expected.files?.length || deleted.length) {
        return reuseFiles(selected, root, signal, entry, deleted);
    }
    const { name, files } = await readCardWorkspaceFiles(avatar, signal);
    await storeOpenedFiles(files, { observed, scopeRoot: root });
    return openResult({ avatar, name: name ?? selected.name }, root, files, false);
}

async function readCardWorkspaceFiles(avatar, signal) {
    const card = await readCharacter(avatar, signal), books = [], bookNames = linkedBooks(card);
    for (const name of bookNames) {
        const book = await readBook(name, signal);
        if (book) books.push([name, book]);
    }
    return { name: card.data.name, bookNames, files: cardFiles(avatar, card.data, books, await readDesign(avatar, signal) ?? '') };
}

// A button reload previews one exact replacement. The ordinary tool open still
// reuses workspace drafts. The preview never writes to the card or workspace.
export async function prepareCardReload(signal) {
    const selected = currentCard(), root = rootFor(selected.avatar);
    return cardLifecycle.run([selected.avatar], async () => {
        const { observed, deleted } = await observeCardReload(root);
        const tree = observed.find(item => item.scope === 'tree').expected;
        const present = tree.files ?? [];
        const { name, files, bookNames } = await readCardWorkspaceFiles(selected.avatar, signal);
        signal?.throwIfAborted();
        const incoming = new Map(files.map(file => [file.path, file]));
        const managed = present.filter(file => file.kind !== 'image' && locateFile(file.path));
        const replacedDrafts = managed.filter(file => (file.originalContent === null || isLocalSourceFileModified(file))
            && incoming.get(file.path)?.content !== file.content);
        const presentPaths = new Set(present.map(file => file.path));
        const deletedPaths = new Set(deleted);
        // A matching saved bundle also proves membership for variable files
        // deleted before individual removals were recorded.
        const definition = files.find(file => file.originalGroupHash);
        const sameBundle = definition && present.some(file => file.path === definition.path && file.originalGroupHash === definition.originalGroupHash);
        const restored = files.filter(file => !presentPaths.has(file.path) && (deletedPaths.has(file.path)
            || (sameBundle && locateFile(file.path)?.kind === 'variables')));
        const booksRoot = root + 'world_book/';
        const linked = new Set(bookNames.map(book => booksRoot + encodeURIComponent(book)));
        const obsoleteBooks = (tree.directories || []).filter(path => path.startsWith(booksRoot)
            && !path.slice(booksRoot.length).includes('/') && !linked.has(path));
        return { selected: { avatar: selected.avatar, name: name ?? selected.name }, root, observed, files,
            removePaths: managed.filter(file => !incoming.has(file.path)).map(file => file.path),
            obsoleteBooks, loaded: present.length > 0 || deleted.length > 0, drafts: cardFileDirectory([...replacedDrafts, ...restored]) };
    });
}

export async function applyCardReload(plan, signal) {
    const { selected, root, observed, files, removePaths, obsoleteBooks } = plan;
    return cardLifecycle.run([selected.avatar], async () => {
        if (currentCard().avatar !== selected.avatar) throw new Error(COPY.changedCard);
        const localSources = await storeOpenedFiles(files, { observed, scopeRoot: root, removePaths, obsoleteBooks, signal });
        const present = flattenLocalSourceFiles(localSources).filter(file => file.path.startsWith(root));
        return openResult(selected, root, present, false);
    });
}

async function storeOpenedFiles(files, options) {
    try { return await storeFiles(files, options); } catch (error) {
        if (error.message === 'workspace_conflict') throw new Error(COPY.designWorkspaceChanged);
        throw error;
    }
}

// A clean design follows server updates; a draft keeps its original baseline.
async function reuseFiles(selected, root, signal, observed, deleted) {
    const path = root + DESIGN_FILE;
    const warnings = [];
    const file = observed.find(item => item.path === path)?.expected?.file;
    const content = await readDesign(selected.avatar, signal) ?? '';
    if (file && !equalText(file.content, file.originalContent)) {
        if (equalText(content, file.content)) {
            await storeOpenedFiles([{ path, content }], { observed, baselineOnly: true });
        } else if (!equalText(content, file.originalContent ?? '')) {
            warnings.push({ path, message: COPY.designDraftConflict });
        }
    } else if (file || !deleted.includes(path)) {
        await storeOpenedFiles([{ path, content }], { observed });
    }
    const present = (await readFiles()).filter(file => file.path.startsWith(root));
    return openResult(selected, root, present, true, warnings);
}

function selectedPaths(paths) {
    if (!Array.isArray(paths) || !paths.length) throw new Error(COPY.noFiles);
    return [...new Set(paths)];
}

async function refreshFiles(paths, signal) {
    const requested = selectedPaths(paths), observed = await observePaths(requested), files = [], roots = new Set();
    const current = await readFiles();
    for (const path of requested) {
        let target = locateFile(path);
        if (!target) throw new Error(COPY.unsupported);
        if (ITEM_KINDS[target.kind]) {
            const file = current.find(item => item.path === path);
            if (!file) throw new Error(COPY.missing);
            target = { ...target, id: parseItemDocument(target.kind, file.originalContent ?? file.content).id };
        }
        if (target.kind === 'variables') {
            if (roots.has(target.root)) continue;
            roots.add(target.root);
            await refreshVariableFiles(target, signal);
            continue;
        }
        const content = await readTarget(target, signal);
        if (content === null) throw new Error(`${COPY.missing}: ${path}`);
        files.push({ path, content });
    }
    if (files.length) await storeFiles(files, { observed });
    return { paths: requested, refreshed: true };
}

async function saveFiles(paths, { signal, onWorkspaceObserved }) {
    const files = await readFiles(), groups = new Map(), results = [];
    const observations = [];
    const recordSave = onWorkspaceObserved && ((submitted, stored) => observations.push({
        path: stored.path, scope: 'entry', expected: { kind: 'file', file: normalizeLocalSourceFile(stored) },
        submitted: { path: submitted.path, content: submitted.content },
    }));
    for (const path of selectedPaths(paths)) {
        const file = files.find(item => item.path === path);
        let target = locateFile(path);
        if (!file || !target) { results.push({ path, saved: false, error: !file ? COPY.missing : COPY.unsupported }); continue; }
        try { target = resolveItemTarget(target, file); } catch (error) {
            results.push({ path, saved: false, error: error.message }); continue;
        }
        if (target.kind === 'variables') {
            const key = `${target.root}variables`;
            if (!groups.has(key)) groups.set(key, variableFileGroup(target.root, files, locateFile));
            continue;
        }
        const key = path;
        if (!groups.has(key)) groups.set(key, []);
        groups.get(key).push({ target, file });
    }
    for (const entries of groups.values()) {
        try {
            signal?.throwIfAborted();
            const [first, ...companions] = entries;
            if (ITEM_KINDS[first.target.kind]) {
                const peers = files.filter(file => {
                    const target = locateFile(file.path);
                    if (target?.root !== first.target.root || target?.kind !== first.target.kind || target?.book !== first.target.book) return false;
                    try { return parseItemDocument(target.kind, file.originalContent ?? file.content).id === first.target.id; } catch { return false; }
                });
                if (peers.length > 1) throw new Error(COPY.duplicateIdentity);
            }
            const result = await saveFile(first.target, first.file, signal, companions);
            if (ITEM_KINDS[first.target.kind]) {
                const receipt = await storeItemReceipt(first.file, result.content, first.target.kind, recordSave);
                results.push({ ...receipt, saved: true, unchanged: result.unchanged === true,
                    ...(result.missingActivationConfig ? { missingActivationConfig: true } : {}) });
                continue;
            }
            const receipts = entries.map((item, index) => ({ path: item.file.path, content: result.contents?.[index] ?? result.content,
                ...(result.originalGroupHash && item.target.settings ? { originalGroupHash: result.originalGroupHash } : {}) }));
            const latest = flattenLocalSourceFiles(await storeFiles(receipts, { baselineOnly: true,
                ...(first.target.kind === 'variables' ? { savedGroupScope: first.target.root + 'variables/' } : {}) }));
            const groupChanged = first.target.kind === 'variables' && variableGroupChanged(first.target.root, entries, latest);
            receipts.forEach((item, index) => {
                const submitted = entries[index].file, stored = latest.find(file => file.path === item.path);
                const sameDraft = stored?.content === submitted.content;
                if (sameDraft) recordSave?.(submitted, stored);
                results.push({ path: item.path, saved: true, unchanged: result.unchanged === true,
                    ...(result.missingActivationConfig ? { missingActivationConfig: true } : {}),
                    hasUnsavedEdits: groupChanged || !sameDraft });
            });
        } catch (error) {
            results.push(...entries.map(item => ({ path: item.file.path, saved: false, error: error.message })));
        }
    }
    if (observations.length) onWorkspaceObserved(observations);
    return { ok: results.every(item => item.saved), results };
}
