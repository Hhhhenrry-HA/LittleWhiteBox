import type { MapDomainEdit } from '../../../domains/map/edit.js';
import type { MapActorPosition, MapDomain } from '../../../domains/map/types.js';
import { frameTransform, transformPoint } from '../../../domains/map/space/frames.js';
import { transformGeometry } from '../../../domains/map/space/geometry.js';

export function actorRemovalEdits(domain: MapDomain, actorKey: string): MapDomainEdit[] {
    const edits: MapDomainEdit[] = [];
    for (const scene of Object.values(domain.scenes)) {
        for (const element of scene.elements) {
            if (element.category === 'actor' && element.actorKey === actorKey) {
                edits.push({ op: 'remove-element', sceneKey: scene.key, elementId: element.id });
            }
        }
    }
    edits.push({ op: 'remove-actor-position', actorKey });
    return edits;
}

export function actorMoveEdits(domain: MapDomain, position: MapActorPosition): MapDomainEdit[] {
    const ownerByScene = new Map(domain.atlas.locations
        .filter(location => location.sceneKey)
        .map(location => [location.sceneKey as string, location.key]));
    return [
        ...Object.values(domain.scenes).flatMap(scene => scene.elements
            .filter(element => (
                element.category === 'actor'
                && element.actorKey === position.actorKey
                && ownerByScene.get(scene.key) !== position.locationKey
            ))
            .map(element => ({ op: 'remove-element' as const, sceneKey: scene.key, elementId: element.id }))),
        { op: 'set-actor-position', position },
    ];
}

function descendantLocationKeys(domain: MapDomain, rootKey: string): Set<string> {
    const result = new Set([rootKey]);
    let changed = true;
    while (changed) {
        changed = false;
        for (const location of domain.atlas.locations) {
            if (location.parent && result.has(location.parent) && !result.has(location.key)) {
                result.add(location.key);
                changed = true;
            }
        }
    }
    return result;
}

export function atlasRemovalEdits(domain: MapDomain, removed: { locations: string[]; frames: string[]; features: string[]; links: string[]; actors: string[] }): MapDomainEdit[] {
    const keys = new Set(removed.locations.flatMap(key => [...descendantLocationKeys(domain, key)]));
    const edits: MapDomainEdit[] = [];
    for (const linkId of removed.links) { edits.push({ op: 'remove-link', linkId }); }
    for (const actorKey of removed.actors) { edits.push(...actorRemovalEdits(domain, actorKey)); }
    for (const link of domain.atlas.links) {
        if (keys.has(link.from) || keys.has(link.to)) {edits.push({ op: 'remove-link', linkId: link.id });}
    }
    for (const actor of domain.atlas.actors) {
        if (keys.has(actor.locationKey)) {edits.push(...actorRemovalEdits(domain, actor.actorKey));}
    }
    for (const location of domain.atlas.locations) {
        if (!keys.has(location.key)) {continue;}
        if (location.sceneKey) {edits.push({ op: 'remove-scene', sceneKey: location.sceneKey });}
    }
    edits.push(...spaceRemovalEdits(domain, keys, new Set(removed.frames), new Set(removed.features), new Set(removed.links)));
    [...keys].reverse().forEach(key => edits.push({ op: 'remove-location', locationKey: key }));
    return edits;
}


/** Ownership cascades; destination associations do not. Surviving coordinates are converted, never guessed. */
function spaceRemovalEdits(domain: MapDomain, locations: Set<string>, frameIds: Set<string>, featureIds: Set<string>, links: Set<string>): MapDomainEdit[] {
    const edits: MapDomainEdit[] = [];
    for (const f of domain.atlas.frames) { if (f.owner && locations.has(f.owner)) { frameIds.add(f.id); } }
    for (const f of domain.atlas.features) { if (f.owner && locations.has(f.owner)) { featureIds.add(f.id); } }
    const survivingFrame = (id: string) => {
        let frame = domain.atlas.frames.find(f => f.id === id);
        const seen = new Set<string>();
        while (frame && frameIds.has(frame.id) && frame.mapping && !seen.has(frame.id)) {
            seen.add(frame.id); frame = domain.atlas.frames.find(f => f.id === frame!.mapping!.frame);
        }
        if (!frame || frameIds.has(frame.id)) { throw new Error('space_removal_unmapped_reference'); }
        return frame.id;
    };
    for (const location of domain.atlas.locations) {
        if (locations.has(location.key) || !location.position || !frameIds.has(location.position.frame)) { continue; }
        const frame = survivingFrame(location.position.frame), mapping = frameTransform(domain.atlas.frames, location.position.frame, frame);
        if (!mapping) { throw new Error('space_removal_unmapped_reference'); }
        edits.push({ op: 'upsert-location', location: { ...location, position: { frame, at: transformPoint(location.position.at, mapping) } } });
    }
    for (const frame of domain.atlas.frames) {
        if (frameIds.has(frame.id)) { edits.push({ op: 'remove-frame', frameId: frame.id }); continue; }
        const next = structuredClone(frame);
        if (next.boundary && featureIds.has(next.boundary)) { delete next.boundary; }
        if (next.mapping && frameIds.has(next.mapping.frame)) {
            const target = survivingFrame(next.mapping.frame), mapping = frameTransform(domain.atlas.frames, next.id, target);
            if (!mapping) { throw new Error('space_removal_unmapped_reference'); }
            next.mapping = mapping;
        }
        if (JSON.stringify(next) !== JSON.stringify(frame)) { edits.push({ op: 'upsert-frame', frame: next }); }
    }
    for (const feature of domain.atlas.features) {
        if (featureIds.has(feature.id)) { edits.push({ op: 'remove-feature', featureId: feature.id }); continue; }
        const next = structuredClone(feature);
        if (next.destination && locations.has(next.destination)) {
            const location = domain.atlas.locations.find(l => l.key === next.destination);
            if (location) { next.name = location.name; }
            delete next.destination;
        }
        if (frameIds.has(next.frame)) {
            const target = survivingFrame(next.frame), mapping = frameTransform(domain.atlas.frames, next.frame, target);
            if (!mapping) { throw new Error('space_removal_unmapped_reference'); }
            next.geometry = transformGeometry(next.geometry, mapping); next.frame = target;
        }
        // A deleted support is not repaired by dropping the relationship. Final validation rejects it.
        if (JSON.stringify(next) !== JSON.stringify(feature)) { edits.push({ op: 'upsert-feature', feature: next }); }
    }
    for (const link of domain.atlas.links) {
        if (links.has(link.id) || locations.has(link.from) || locations.has(link.to)) { continue; }
        if (link.feature && featureIds.has(link.feature)) { const next = { ...link }; delete next.feature; edits.push({ op: 'upsert-link', link: next }); }
    }
    return edits;
}
