import type { MapDomain } from '../../../domains/map/types.js';
import { stageMapDomainEdits, type MapDomainEdit } from '../../../domains/map/edit.js';
import { jsonValuesEqual } from '../../../host/json-values-equal.js';
import { mapFrameId } from '../../../domains/map/space/frames.js';
import { atlasDependencyGraph, editTarget } from '../tools/atlas-dependencies.js';

type Kind = 'location' | 'link' | 'actor' | 'scene' | 'frame' | 'feature';
type Reference = { kind: Kind; key: string };
function value(domain: MapDomain, { kind, key }: Reference): unknown {
    if (kind === 'scene') { return domain.scenes[key] ?? null; }
    if (kind === 'location') { return domain.atlas.locations.find(item => item.key === key) ?? null; }
    if (kind === 'link') { return domain.atlas.links.find(item => item.id === key) ?? null; }
    if (kind === 'frame') { return domain.atlas.frames.find(item => item.id === key) ?? null; }
    if (kind === 'feature') { return domain.atlas.features.find(item => item.id === key) ?? null; }
    return domain.atlas.actors.find(item => item.actorKey === key) ?? null;
}
function target(edit: MapDomainEdit): Reference {
    return reference(editTarget(edit));
}
function reference(id: string): Reference {
    const colon = id.indexOf(':');
    return { kind: id.slice(0, colon) as Kind, key: id.slice(colon + 1) };
}

/** Reading one object advances only that object's evidence, never the whole atlas. */
export function createMapReadBaseline(initial: MapDomain) {
    const read = new Map<string, unknown>();
    const id = (ref: Reference) => JSON.stringify([ref.kind, ref.key]);
    const observe = (domain: MapDomain, ref: Reference) => read.set(id(ref), value(domain, ref));
    function check(domain: MapDomain, ref: Reference) {
        const before = read.has(id(ref)) ? read.get(id(ref)) : value(initial, ref);
        if (!jsonValuesEqual(before, value(domain, ref))) { throw new Error('management_request_superseded'); }
    }
    return {
        atlas(domain: MapDomain, data: Record<string, unknown>) {
            const collections = [['locations', 'location', 'key'], ['links', 'link', 'id'], ['actors', 'actor', 'actorKey'], ['features', 'feature', 'id']] as const;
            for (const [collection, kind, key] of collections) {
                for (const item of (data[collection] ?? []) as Record<string, string>[]) { observe(domain, { kind, key: item[key] }); }
            }
            if (data.mode === 'summary') { observe(domain, { kind: 'actor', key: 'player' }); }
            for (const item of (data.maps ?? []) as { map: string | null }[]) { observe(domain, { kind: 'frame', key: mapFrameId(item.map) }); }
        },
        scene(domain: MapDomain, key: string, offset: number) {
            const ref = { kind: 'scene' as const, key };
            if (offset > 0) { check(domain, ref); }
            observe(domain, ref);
            const owner = domain.atlas.locations.find(item => item.sceneKey === key);
            if (owner) {
                const location = { kind: 'location' as const, key: owner.key };
                if (offset > 0) { check(domain, location); }
                observe(domain, location);
            }
        },
        assertEdits(domain: MapDomain, edits: readonly MapDomainEdit[]) {
            const graph = atlasDependencyGraph(domain);
            for (const [key, refs] of atlasDependencyGraph(stageMapDomainEdits(domain, edits))) { graph.set(key, new Set([...(graph.get(key) || []), ...refs])); }
            const pending = new Set(edits.map(editTarget));
            for (const key of pending) {
                check(domain, reference(key));
                for (const dependency of graph.get(key) || []) { pending.add(dependency); }
            }
        },
        saved(domain: MapDomain, edits: readonly MapDomainEdit[]) {
            for (const edit of edits) { observe(domain, target(edit)); }
        },
    };
}
