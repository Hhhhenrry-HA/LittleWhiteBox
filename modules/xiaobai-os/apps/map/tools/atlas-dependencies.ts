import type { MapDomain } from '../../../domains/map/types.js';
import type { MapDomainEdit } from '../../../domains/map/edit.js';
import { spaceSurfaceConflicts, spaceSurfaceTransitionConflicts } from '../../../domains/map/space/surface-conflicts.js';

export function editTarget(edit: MapDomainEdit): string {
    switch (edit.op) {
        case 'upsert-location': return `location:${edit.location.key}`;
        case 'remove-location': return `location:${edit.locationKey}`;
        case 'upsert-link': return `link:${edit.link.id}`;
        case 'remove-link': return `link:${edit.linkId}`;
        case 'set-actor-position': return `actor:${edit.position.actorKey}`;
        case 'remove-actor-position': return `actor:${edit.actorKey}`;
        case 'upsert-frame': return `frame:${edit.frame.id}`;
        case 'remove-frame': return `frame:${edit.frameId}`;
        case 'upsert-feature': return `feature:${edit.feature.id}`;
        case 'remove-feature': return `feature:${edit.featureId}`;
        case 'initialize-scene': return `scene:${edit.scene.key}`;
        default: return `scene:${edit.sceneKey}`;
    }
}
export function atlasDependencyGraph(domain: MapDomain): Map<string, Set<string>> {
    const graph = new Map<string, Set<string>>();
    const add = (id: string, refs: Array<string | undefined>) => graph.set(id, new Set(refs.filter((r): r is string => !!r)));
    for (const l of domain.atlas.locations) { add(`location:${l.key}`, [l.parent && `location:${l.parent}`, l.position && `frame:${l.position.frame}`]); }
    for (const f of domain.atlas.frames) { add(`frame:${f.id}`, [f.owner && `location:${f.owner}`, f.mapping && `frame:${f.mapping.frame}`, f.boundary && `feature:${f.boundary}`]); }
    for (const f of domain.atlas.features) { add(`feature:${f.id}`, [f.owner && `location:${f.owner}`, `frame:${f.frame}`, f.destination && `location:${f.destination}`, f.support && `feature:${f.support}`, ...(Array.isArray(f.crosses) ? f.crosses : []).map(id => `feature:${id}`)]); }
    for (const l of domain.atlas.links) { add(`link:${l.id}`, [`location:${l.from}`, `location:${l.to}`, l.feature && `feature:${l.feature}`]); }
    for (const a of domain.atlas.actors) { add(`actor:${a.actorKey}`, [`location:${a.locationKey}`]); }
    for (const s of Object.values(domain.scenes)) {
        const owner = domain.atlas.locations.find(l => l.sceneKey === s.key);
        add(`scene:${s.key}`, [owner && `location:${owner.key}`]);
    }
    return graph;
}

/** A common unchanged dependency is not a transaction. Edited reachable dependencies are. */
export function atlasEditGroups<T extends { target: string; refs: string[] }>(entries: T[], before: MapDomain, draft: MapDomain): T[][] {
    const graph = atlasDependencyGraph(before);
    for (const [key, refs] of atlasDependencyGraph(draft)) { graph.set(key, new Set([...(graph.get(key) || []), ...refs])); }
    for (const e of entries) { graph.set(e.target, new Set([...(graph.get(e.target) || []), ...e.refs])); }
    const spatialConflicts = [...spaceSurfaceConflicts(draft.atlas.features, draft.atlas.frames), ...spaceSurfaceTransitionConflicts(before.atlas, draft.atlas)];
    for (const [a, b] of spatialConflicts) {
        graph.get(`feature:${a}`)?.add(`feature:${b}`);
        graph.get(`feature:${b}`)?.add(`feature:${a}`);
    }
    const parents = entries.map((_, i) => i);
    const indexes = new Map<string, number[]>();
    entries.forEach((entry, i) => { if (!indexes.has(entry.target)) { indexes.set(entry.target, []); } indexes.get(entry.target)!.push(i); });
    const find = (i: number): number => parents[i] === i ? i : (parents[i] = find(parents[i]));
    // A conflict can be caused solely by edited frames beneath otherwise unchanged
    // surfaces. Start there too, so both edited mappings join the same transaction.
    for (const target of new Set([...indexes.keys(), ...spatialConflicts.flatMap(pair => pair.map(id => `feature:${id}`))])) {
        const visited = new Set<string>();
        const pending = [target];
        let first: number | undefined;
        while (pending.length) {
            const key = pending.pop()!;
            if (visited.has(key)) { continue; }
            visited.add(key);
            for (const j of indexes.get(key) || []) {
                if (first === undefined) { first = j; } else { parents[find(j)] = find(first); }
            }
            pending.push(...(graph.get(key) || []));
        }
    }
    const result = new Map<number, T[]>();
    entries.forEach((entry, i) => { const key = find(i); if (!result.has(key)) { result.set(key, []); } result.get(key)!.push(entry); });
    return [...result.values()];
}
