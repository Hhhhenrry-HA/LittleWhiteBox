import { CARD_ROOT } from './paths.js';

// Only names of removed, previously backed files survive a page reload. The
// workspace transaction owns their lifetime; no card text or second snapshot.
export function reconcileDeletedCardFiles(previous, before, after, sync = {}) {
    const old = before.find(source => source.rootPath === CARD_ROOT);
    const next = after.find(source => source.rootPath === CARD_ROOT);
    if (!next) return [];
    const kept = new Set(previous);
    const files = new Map(next.files.map(file => [file.path, file]));
    if (sync.move) {
        const { from, to } = sync.move;
        for (const path of previous) if (path.startsWith(from)) {
            kept.delete(path);
            if (to) kept.add(to + path.slice(from.length));
        }
    }
    for (const file of old?.files || []) {
        if (typeof file.originalContent === 'string' && !files.has(file.path)) kept.add(file.path);
    }
    const cardDirs = new Set(next.directories.filter(dir => !dir.includes('/')));
    for (const path of kept) {
        const folder = path.slice(CARD_ROOT.length).split('/')[0];
        if (!cardDirs.has(folder) || typeof files.get(path)?.originalContent === 'string'
            || sync.removed?.has(path) || (sync.scope && path.startsWith(sync.scope) && !sync.stillOnCard?.has(path))) kept.delete(path);
    }
    return [...kept].sort();
}
