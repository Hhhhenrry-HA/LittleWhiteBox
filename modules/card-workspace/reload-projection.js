import { buildLocalFileRecordFromPath, createEphemeralLocalSourceRecord } from '../assistant/shared/local-workspace-kernel.js';
import { CARD_ROOT } from './paths.js';

// Stage one card projection in one pass. The repository still checks the
// observed tree, validates the result and commits all changes atomically.
export function stageCardProjection(sources, files, scope, removePaths, obsoleteBooks) {
    const source = sources.find(item => item.rootPath === CARD_ROOT);
    const byPath = new Map(source?.files.map(file => [file.path, file]));
    let changed = false;
    for (const path of removePaths) if (byPath.delete(path)) changed = true;
    for (const file of files) {
        const old = byPath.get(file.path);
        if (old?.kind === 'image') throw new Error('unsupported_text_file');
        if (old?.content === file.content && old.originalContent === file.content && old.originalGroupHash === file.originalGroupHash) continue;
        byPath.set(file.path, buildLocalFileRecordFromPath(file.path, file.content, file));
        changed = true;
    }
    let directories = source?.directories || [];
    if (obsoleteBooks.length) {
        const empty = new Set(obsoleteBooks.map(path => path.slice(CARD_ROOT.length)));
        const retainAncestors = relative => {
            for (let i = relative.lastIndexOf('/'); i >= 0; i = relative.lastIndexOf('/')) {
                relative = relative.slice(0, i);
                empty.delete(relative);
            }
        };
        for (const file of byPath.values()) retainAncestors(file.relativePath);
        directories.forEach(retainAncestors);
        directories = directories.filter(dir => !empty.has(dir));
        changed ||= directories.length !== source?.directories.length;
    }
    const cardSync = { scope };
    if (!changed) return { result: { ok: true }, nextSources: sources, filesUnchanged: true, cardSync };
    const updated = { ...(source || createEphemeralLocalSourceRecord('cards', sources, CARD_ROOT)), directories,
        files: [...byPath.values()].sort((a, b) => a.path.localeCompare(b.path, 'zh-CN')) };
    return { result: { ok: true }, nextSources: source ? sources.map(item => item === source ? updated : item) : [...sources, updated], cardSync };
}
