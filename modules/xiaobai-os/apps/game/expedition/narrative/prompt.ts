import type { Campaign, ConversationMemory, ConversationTurn } from '../campaign/types.js';
import { isPerson, participantName, type Participant } from '../content/participants.js';
import { PARLEY_ENEMIES } from '../content/parley.js';
import { FACT_COPY } from '../content/campaign-copy.js';
import { WORLD_COPY } from '../content/world-copy.js';
import { narrativeActions, secretFact } from './actions.js';
import { projectStage, type RelationshipStage } from './stages.js';
import { personMap } from '../world/people.js';
import type { NarrativeCanon } from './canon.js';

export function conversationContext(campaign: Campaign, person: Participant, stages: readonly RelationshipStage[] = []) {
    const actionMeanings = narrativeActions(campaign, person, stages), actions = Object.keys(actionMeanings);
    if (!isPerson(person)) {
        const spec = PARLEY_ENEMIES[person];
        return { person: participantName(person), place: WORLD_COPY.scenes[spec.scene],
            rescued: false, resolved: campaign.facts.includes(spec.complete),
            events: campaign.knowledge[person].map(id => ({ id, event: FACT_COPY[id], source: '亲历' })),
            companions: Object.entries(campaign.people).filter(([, p]) => p.mode === 'follow' && p.scene === spec.scene).map(([id]) => participantName(id as Participant)),
            actions, actionMeanings };
    }
    return { person: WORLD_COPY.people[person], place: WORLD_COPY.scenes[campaign.people[person].scene], map: personMap(campaign, person),
        rescued: campaign.knowledge[person].includes('captives_arrived'),
        events: campaign.knowledge[person].map(id => ({ id, event: FACT_COPY[id], source: '亲历' })),
        affection: campaign.relationships[person].affection, actions, actionMeanings };
}
export function replayTurns(turns: readonly ConversationTurn[]) {
    return turns.filter(t => t.kind !== 'receipt').flatMap(t => t.kind === 'interaction' ? [
        { role: 'user', content: JSON.stringify({ source: '游戏确认的互动结果', player: t.player, action: t.action,
            result: t.reply, place: WORLD_COPY.scenes[t.scene], events: t.facts.map(id => ({ id, event: FACT_COPY[id] })) }) },
    ] : [
        { role: 'user', content: t.player },
        { role: 'assistant', content: JSON.stringify({ reply: t.reply, action: t.action }) },
    ]);
}
export function memoryBoundary(turns: readonly ConversationTurn[], memory: ConversationMemory | null) {
    return memory ? turns.findIndex(turn => turn.id === memory.throughId) + 1 : 0;
}
export function buildConversationPrompt(campaign: Campaign, person: Participant, text: string, canon: NarrativeCanon,
    memory = campaign.memories[person]) {
    const context = conversationContext(campaign, person, canon.stages);
    const secret = isPerson(person) ? secretFact(person) : null;
    const stage = isPerson(person) ? projectStage(canon.stages, campaign.relationships[person], !!secret && campaign.facts.includes(secret)) : null;
    return {
        systemPrompt: [canon.system, canon.world, canon.character].join('\n\n'),
        messages: [
            { role: 'user', content: JSON.stringify({ source: '游戏提供的当前处境与本人亲历', ...context,
                opening: campaign.conversations[person].some(t => t.kind !== 'receipt') || !isPerson(person) && campaign.facts.includes(PARLEY_ENEMIES[person].complete) ? null : context.rescued ? canon.opening.returned : canon.opening.initial,
                stage, memory: memory?.text ?? null }) },
            ...replayTurns(campaign.conversations[person].slice(memoryBoundary(campaign.conversations[person], memory))),
            { role: 'user', content: text },
        ],
    };
}
