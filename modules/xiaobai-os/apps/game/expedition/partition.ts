import type { PartitionRegistration } from '../../../kernel/contracts.js';
import { RELICS, RULES, WEAPON_LIST } from './content.js';
import { awardAmount, awardKeys, emptyExpedition } from './domain.js';
import { EXPEDITION_FORMAT_VERSION, OUTFIT_IDS } from './ids.js';
import { OUTFITS, ownsOutfit } from './outfits.js';
import { validateBattle } from './battle-validation.js';
import { fault } from './random.js';
import { compatibleRelics } from './relics.js';
import type { Command, ExpeditionData, InputSpan, RelicStack } from './types.js';
import { boolean, expeditionId, finite, integer, list, member, object, unique } from './validation.js';
import { COURTYARD } from './content/courtyard.js';
import { FACT_COPY } from './content/campaign-copy.js';
import type { CourtyardFact, CourtyardScene } from './content/world-types.js';
import { canStandInWorld } from './world/geometry.js';
import { sceneSpace } from './world/exploration.js';
import { CAMPAIGN_RULES } from './campaign/rules.js';
import { CAMPAIGN_CHOICES } from './content/campaign-actions.js';
import { relationshipBand, RELATIONSHIP_RULES } from './campaign/relationships.js';
import { DESTINATIONS } from './content/people-places.js';
import { isPerson, PARTICIPANT_IDS } from './content/participants.js';
import { PERSON_IDS } from './content/people.js';
import { PARLEY_IDS, PARLEY_ENEMIES } from './content/parley.js';
export { expeditionId } from './validation.js';

const weapon = (v: unknown) => member(v, WEAPON_LIST);
const relic = (v: unknown) => member(v, RELICS);
const outfit = (v: unknown) => member(v, OUTFIT_IDS);
const scene = (v: unknown) => member(v, Object.keys(COURTYARD) as CourtyardScene[]);
const facts = (v: unknown) => unique(list(v, Object.keys(FACT_COPY).length, f => member(f, Object.keys(FACT_COPY) as CourtyardFact[])));
export function boundedText(v: unknown, max: number): string {
    if (typeof v !== 'string' || !v.trim() || v.length > max) { fault('invalid'); } return v;
}
function stacks(v: unknown, max: number): RelicStack[] {
    const entries = list(v, max, raw => { const r = object(raw); return { id: relic(r.id), rank: integer(r.rank, 1, RULES.maxRelicRank) }; });
    unique(entries.map(r => r.id)); return entries;
}
export function parseCommand(value: unknown): Command {
    const v = object(value);
    switch (v.type) {
        case 'start': case 'restart': return { type: v.type, weapon: weapon(v.weapon), outfit: outfit(v.outfit) };
        case 'purchase': case 'equip': return { type: v.type, id: outfit(v.id) };
        case 'interact': return { type: 'interact', id: expeditionId(v.id) };
        case 'choice': return { type: 'choice', id: member(v.id, CAMPAIGN_CHOICES), person: member(v.person, PERSON_IDS) };
        case 'loadout': return { type: 'loadout', equipped: unique(list(v.equipped, RULES.relicSlots, relic)) };
        case 'input': {
            const spans: InputSpan[] = list(v.spans, RULES.maxInputTicks, raw => {
                const s = object(raw); boolean(s.dash); boolean(s.skill);
                return { move: integer(s.move, 0, 8), dash: s.dash, skill: s.skill, ticks: integer(s.ticks, 1, RULES.maxInputTicks) };
            });
            if (!spans.length || spans.reduce((sum, s) => sum + s.ticks, 0) > RULES.maxInputTicks) { fault('invalid'); }
            return { type: 'input', spans };
        }
        case 'relic': return { type: 'relic', id: relic(v.id) };
        case 'leave': case 'retry': case 'retreat': case 'resolve_parley': return { type: v.type };
        default: return fault('invalid');
    }
}
function validateCampaign(raw: unknown, data: ExpeditionData) {
    const r = object(raw); expeditionId(r.id); integer(r.seed, 0, 0xffffffff); const w = weapon(r.weapon);
    if (!ownsOutfit(data, outfit(r.outfit))) { fault('invalid'); }
    const owned = stacks(r.collection, RELICS.length), equipped = unique(list(r.equipped, RULES.relicSlots, relic)), offered = stacks(r.offers, 3);
    if ([...owned, ...offered].some(s => !compatibleRelics(w).includes(s.id)) || equipped.some(id => !owned.some(s => s.id === id))) { fault('invalid'); }
    for (const offer of offered) { if (offer.rank !== (owned.find(s => s.id === offer.id)?.rank ?? 0) + 1) { fault('invalid'); } }
    const phase = member(r.phase, ['exploration', 'battle', 'reward', 'lost']);
    if ((phase === 'reward') !== !!offered.length) { fault('invalid'); }
    const knownFacts = facts(r.facts), location = object(r.location), id = scene(location.scene), position = object(location.position);
    finite(position.x, -Number.MAX_VALUE, Number.MAX_VALUE); finite(position.y, -Number.MAX_VALUE, Number.MAX_VALUE);
    finite(location.facing, -100, 100); const visited = unique(list(location.visited, Object.keys(COURTYARD).length, scene));
    if (!visited.includes(id) || !canStandInWorld(sceneSpace(COURTYARD[id], new Set(knownFacts)), { x: Number(position.x), y: Number(position.y) }, RULES.playerRadius)) { fault('invalid'); }
    finite(r.hp, 0, RULES.maxHp); integer(r.alarmTicks);
    boolean(object(r.evidence).dispatchNoteSeen);
    if (r.battle !== null) {
        validateBattle(r.battle);
        if (!['battle', 'lost'].includes(phase) || r.battle.player.hp !== r.hp || r.battle.player.x !== position.x || r.battle.player.y !== position.y
            || (phase === 'battle' ? r.battle.status !== 'fighting' : r.battle.status !== 'lost')) { fault('invalid'); }
    } else if (['battle', 'lost'].includes(phase)) { fault('invalid'); }
    if (r.checkpoint !== null) { validateBattle(r.checkpoint); if (!r.battle || r.checkpoint.tick !== 0 || r.checkpoint.status !== 'fighting') { fault('invalid'); } }
    else if (r.battle) { fault('invalid'); }
    const conversations = object(r.conversations), memories = object(r.memories), knowledge = object(r.knowledge), relationships = object(r.relationships), people = object(r.people);
    for (const record of [conversations, memories, knowledge]) {
        if (Object.keys(record).length !== PARTICIPANT_IDS.length || PARTICIPANT_IDS.some(key => !Object.hasOwn(record, key))) { fault('invalid'); }
    }
    for (const record of [relationships, people]) {
        if (Object.keys(record).length !== PERSON_IDS.length || PERSON_IDS.some(key => !Object.hasOwn(record, key))) { fault('invalid'); }
    }
    if (r.pendingParley !== null) {
        const pending = object(r.pendingParley), enemy = member(pending.enemy, PARLEY_IDS), spec = PARLEY_ENEMIES[enemy];
        const decision = member(pending.decision, ['pass', 'attack']);
        if (phase !== 'exploration' || spec.scene !== id || knownFacts.includes(spec.complete) || decision === 'pass' && !knownFacts.includes(spec.intel)) { fault('invalid'); }
    }
    for (const person of PARTICIPANT_IDS) {
        if (isPerson(person)) {
        const resident = object(people[person]), residentScene = scene(resident.scene), point = object(resident.position);
        finite(point.x, -Number.MAX_VALUE, Number.MAX_VALUE); finite(point.y, -Number.MAX_VALUE, Number.MAX_VALUE); finite(resident.facing, -100, 100);
        if (!canStandInWorld(sceneSpace(COURTYARD[residentScene], new Set(knownFacts)), { x: Number(point.x), y: Number(point.y) }, RULES.playerRadius)) { fault('invalid'); }
        const mode = member(resident.mode, ['idle', 'follow', 'travel']);
        if (mode === 'travel') { member(resident.destination, Object.keys(DESTINATIONS)); } else if (resident.destination !== null) { fault('invalid'); }
        if (mode === 'follow' && residentScene !== id) { fault('invalid'); }
        const relation = object(relationships[person]);
        const affection = integer(relation.affection, 0, RELATIONSHIP_RULES.maximum);
        integer(relation.highestBand, relationshipBand(affection), RELATIONSHIP_RULES.bands.length - 1);
        }
        const entries = list(conversations[person], Number.MAX_SAFE_INTEGER, raw => {
            const t = object(raw); const id = boundedText(t.id, 150); boundedText(t.player, CAMPAIGN_RULES.playerTextLimit);
            member(t.kind, ['dialogue', 'interaction', 'receipt']); scene(t.scene);
            if (t.action !== null) { member(t.action, isPerson(person) ? [...CAMPAIGN_CHOICES, 'share_secret', 'follow', 'stay', ...Object.keys(DESTINATIONS).map(id => `go:${id}`)] : ['pass', 'attack']); }
            if (t.affectionDelta !== undefined) { integer(t.affectionDelta, -RELATIONSHIP_RULES.changeMax, RELATIONSHIP_RULES.changeMax); }
            if (t.kind === 'interaction' && t.action === null) { fault('invalid'); }
            if (t.kind === 'receipt') {
                member(t.issue, ['reply_invalid', 'reply_incomplete']);
                if (t.action !== null || t.affectionDelta !== undefined) { fault('invalid'); }
            } else if (t.issue !== undefined && (t.kind !== 'dialogue' || t.issue !== 'action_rejected' || t.action !== null)) { fault('invalid'); }
            boundedText(t.reply, t.kind === 'receipt' ? Number.MAX_SAFE_INTEGER : CAMPAIGN_RULES.replyTextLimit);
            if (facts(t.facts).some(f => !knownFacts.includes(f))) { fault('invalid'); } return id;
        });
        unique(entries);
        if (facts(knowledge[person]).some(f => !knownFacts.includes(f))) { fault('invalid'); }
        if (memories[person] !== null) {
            const memory = object(memories[person]); boundedText(memory.text, Number.MAX_SAFE_INTEGER);
            if (!entries.includes(boundedText(memory.throughId, 150))) { fault('invalid'); }
        }
    }
}
export function validateExpedition(value: unknown): asserts value is ExpeditionData {
    const v = object(value); if (v.formatVersion !== EXPEDITION_FORMAT_VERSION) { fault('invalid'); }
    const revision = integer(v.revision);
    if (v.last === null) { if (revision !== 0) { fault('invalid'); } }
    else {
        const last = object(v.last); expeditionId(last.id); const c = object(last.command);
        if (c.type === 'conversation') { member(c.person, PARTICIPANT_IDS); boundedText(c.text, CAMPAIGN_RULES.playerTextLimit); }
        else if (c.type !== 'rebuild') { parseCommand(c); }
        if (!revision) { fault('invalid'); }
    }
    const keys = awardKeys();
    unique(list(v.awards, keys.length, raw => { const a = object(raw); expeditionId(a.actionId); expeditionId(a.runId); const key = member(a.key, keys); if (integer(a.amount, 1) !== awardAmount(key)) { fault('invalid'); } return key; }));
    unique(list(v.purchases, OUTFIT_IDS.length, raw => {
        const p = object(raw), id = outfit(p.id), spec = OUTFITS[id]; expeditionId(p.actionId);
        if (spec.price <= 0 || spec.achievement !== null || integer(p.amount, 1) !== spec.price) { fault('invalid'); } return id;
    }));
    const data = value as ExpeditionData;
    if (!ownsOutfit(data, outfit(v.equippedOutfit))) { fault('invalid'); }
    if (v.active !== null) { validateCampaign(v.active, data); }
}
export const EXPEDITION_PARTITION: PartitionRegistration<ExpeditionData> = {
    key: 'expedition', ownerId: 'game', storage: 'user', schemaVersion: EXPEDITION_FORMAT_VERSION, createInitial: emptyExpedition,
    parse(raw) {
        try {
            const value = structuredClone(raw);
            validateExpedition(value); return { ok: true, value };
        } catch (error) { return { ok: false, error: { code: 'partition_invalid', message: error instanceof Error ? error.message : 'expedition_invalid' } }; }
    },
    serialize(value) { validateExpedition(value); return structuredClone(value); },
};
