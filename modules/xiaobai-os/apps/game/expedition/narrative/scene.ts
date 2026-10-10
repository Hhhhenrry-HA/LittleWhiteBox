import type { Campaign } from '../campaign/types.js';
import { parleyInteractions, parleyPosition } from '../campaign/parley.js';
import { COURTYARD } from '../content/courtyard.js';
import { PARLEY_ENEMIES } from '../content/parley.js';
import { DESTINATIONS } from '../content/people-places.js';
import { isPerson, participantName, type Participant } from '../content/participants.js';
import { WORLD_COPY } from '../content/world-copy.js';
import { reachablePersonInteractions } from '../world/people.js';
import { sceneSpace } from '../world/exploration.js';
import { worldLineClear } from '../world/geometry.js';

/** Nearby means within the game's talking reach and line of sight, not everyone in the scene. */
export function conversationScene(campaign: Campaign, person: Participant) {
    const facts = new Set(campaign.facts), resident = isPerson(person) ? campaign.people[person] : null;
    const scene = COURTYARD[isPerson(person) ? campaign.people[person].scene : PARLEY_ENEMIES[person].scene];
    const position = isPerson(person) ? campaign.people[person].position : parleyPosition(person, facts);
    const residents = reachablePersonInteractions(scene, position, facts, campaign.people);
    const guards = parleyInteractions(scene.id, position, facts)
        .filter(item => worldLineClear(sceneSpace(scene, facts), position, item.position));
    return { place: WORLD_COPY.scenes[scene.id],
        movement: resident ? { mode: resident.mode, destination: resident.destination ? DESTINATIONS[resident.destination].name : null } : null,
        nearby: [...residents, ...guards].filter(item => item.target.id !== person)
            .map(item => participantName(item.target.id as Participant)) };
}
