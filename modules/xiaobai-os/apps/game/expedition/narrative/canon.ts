import { extensionFolderPath } from '../../../../../../core/constants.js';
import { isPerson, type Participant } from '../content/participants.js';
import { PARLEY_ENEMIES } from '../content/parley.js';
import { fault } from '../random.js';
import { parseStages, type RelationshipStage } from './stages.js';

export interface NarrativeCanon { system: string; world: string; character: string; stages: RelationshipStage[]; opening: { initial: string; returned: string | null } }
export type CanonReader = (name: string, signal: AbortSignal) => Promise<string>;
const readDocument: CanonReader = async (name, signal) => {
    const response = await fetch(`/${extensionFolderPath}/modules/xiaobai-os/docs/expedition-cards/${name}.md`, { signal, cache: 'no-cache' });
    if (!response.ok) { fault('narrative_unavailable'); }
    const text = await response.text();
    if (!text.trim()) { fault('narrative_unavailable'); }
    return text;
};
/** Only this person's card and opening cross the model boundary. Other cards contain private knowledge. */
export async function loadNarrativeCanon(person: Participant, signal: AbortSignal, read: CanonReader = readDocument): Promise<NarrativeCanon> {
    if (!isPerson(person)) {
        const [system, world, document] = await Promise.all(['enemy-system-prompt', 'world', PARLEY_ENEMIES[person].card].map(name => read(name, signal)));
        const block = /<!-- opening:([a-z]+\.initial) -->\s*([\s\S]*?)\s*<!-- \/opening -->/.exec(document);
        if (!block || block[1] !== `${person}.initial`) { fault('narrative_unavailable'); }
        return { system, world, character: document.slice(0, block.index).replace(/# 开场\s*$/, '').trim(), stages: [], opening: { initial: block[2], returned: null } };
    }
    const [system, world, character, openings, stages] = await Promise.all(['system-prompt', 'world', person, 'openings', `${person}-stages`].map(name => read(name, signal)));
    // Explicit authoring protocol IDs, never a display name or heading used as a key.
    const blocks = new Map([...openings.matchAll(/<!-- opening:([a-z]+\.(?:initial|returned)) -->\s*([\s\S]*?)\s*<!-- \/opening -->/g)]
        .map(match => [match[1], match[2].trim()]));
    const initial = blocks.get(`${person}.initial`), returned = blocks.get(`${person}.returned`) ?? null;
    if (!initial || (person === 'anian' || person === 'kouzi') && !returned) { fault('narrative_unavailable'); }
    return { system, world, character, stages: parseStages(stages), opening: { initial, returned } };
}
